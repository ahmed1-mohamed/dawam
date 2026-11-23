#!/usr/bin/env node
/**
 * One-command performance audit:  npm run perf  [-- [pages...] [--no-build] [--desktop] [--port=3005]]
 *
 *   npm run perf                      # build + audit /ar and /en (mobile)
 *   npm run perf -- ar en/login       # choose pages
 *   npm run perf -- --no-build        # re-audit the last build
 *   npm run perf -- --desktop         # desktop preset instead of mobile
 *
 * - Builds a PRODUCTION copy into `.next-perf`, so a running `npm run dev`
 *   (which uses `.next`) is never touched.
 * - Serves it on a free port and runs Lighthouse with flags that work reliably
 *   on Windows + recent Chrome, retrying the intermittent NO_NAVSTART error.
 * - Saves HTML + JSON reports in reports/lighthouse/ and prints a summary.
 */
import { spawn, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import process from "node:process";

const LIGHTHOUSE = "lighthouse@12.6.0";
const CHROME_FLAGS = "--headless --disable-gpu --no-sandbox --disable-dev-shm-usage";
const MAX_TRIES = 4;

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const portArg = args.find((a) => a.startsWith("--port="));
const PORT = Number(portArg?.split("=")[1] ?? 3005);
const pages = args.filter((a) => !a.startsWith("--"));
if (pages.length === 0) pages.push("ar", "en");

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const reportsDir = path.join(root, "reports", "lighthouse");
/** Prefer an installed stable Chrome/Edge (set CHROME_PATH to override). */
function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const candidates =
    process.platform === "win32"
      ? [
          path.join(process.env["PROGRAMFILES"] ?? "C:/Program Files", "Google", "Chrome", "Application", "chrome.exe"),
          path.join(process.env["PROGRAMFILES(X86)"] ?? "C:/Program Files (x86)", "Google", "Chrome", "Application", "chrome.exe"),
          path.join(process.env["LOCALAPPDATA"] ?? "", "Google", "Chrome", "Application", "chrome.exe"),
          path.join(process.env["PROGRAMFILES(X86)"] ?? "C:/Program Files (x86)", "Microsoft", "Edge", "Application", "msedge.exe"),
        ]
      : process.platform === "darwin"
        ? ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"]
        : ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium"];
  return candidates.find((p) => p && existsSync(p));
}

const chromePath = findChrome();
const env = {
  ...process.env,
  ...(chromePath ? { CHROME_PATH: chromePath } : {}),
  NEXT_DIST_DIR: ".next-perf",
  NEXT_PUBLIC_APP_URL: `http://localhost:${PORT}`,
  NEXT_TELEMETRY_DISABLED: "1",
};

const log = (msg) => console.log(`\x1b[36m[perf]\x1b[0m ${msg}`);
const fail = (msg) => {
  console.error(`\x1b[31m[perf] ${msg}\x1b[0m`);
  process.exit(1);
};

async function isUp(url) {
  try {
    const res = await fetch(url, { redirect: "manual" });
    return res.status < 500;
  } catch {
    return false;
  }
}

async function main() {
  if (!existsSync(nextBin)) fail("Next.js not found. Run `npm install` first.");
  const base = `http://localhost:${PORT}`;
  if (await isUp(`${base}/`)) fail(`Port ${PORT} is already in use. Stop that server or pass --port=<other>.`);

  // 1. Production build (separate folder)
  if (!flag("no-build")) {
    log("Building production bundle into .next-perf …");
    const build = spawnSync(process.execPath, [nextBin, "build"], { stdio: "inherit", env });
    if (build.status !== 0) fail("Build failed.");
  } else if (!existsSync(path.join(root, ".next-perf"))) {
    fail("No previous build in .next-perf — run without --no-build.");
  }

  // 2. Start server
  log(`Browser: ${chromePath ?? "auto-detected by Lighthouse"}`);
  log(`Starting production server on ${base} …`);
  const server = spawn(process.execPath, [nextBin, "start", "-p", String(PORT)], { env, stdio: "ignore" });
  const stop = () => {
    if (!server.killed) server.kill();
  };
  process.on("SIGINT", () => {
    stop();
    process.exit(130);
  });

  try {
    const deadline = Date.now() + 60_000;
    while (!(await isUp(`${base}/${pages[0]}`))) {
      if (Date.now() > deadline) throw new Error("Server did not start within 60s.");
      await new Promise((r) => setTimeout(r, 1000));
    }

    // 3. Lighthouse, with retries for flaky trace recording
    mkdirSync(reportsDir, { recursive: true });
    // Run Lighthouse from a temp folder (outside cloud-synced project folders like
    // OneDrive, whose syncing skewed timings) and copy the reports in afterwards.
    const workDir = mkdtempSync(path.join(os.tmpdir(), "dawam-lh-"));
    // Run npx through Node itself (no shell): a shell would split the space-separated
    // --chrome-flags value, so Chrome silently lost flags like --disable-gpu.
    const npxCli = path.join(path.dirname(process.execPath), "node_modules", "npm", "bin", "npx-cli.js");
    const runNpx = (npxArgs, opts) =>
      existsSync(npxCli)
        ? spawnSync(process.execPath, [npxCli, ...npxArgs], opts)
        : spawnSync(process.platform === "win32" ? "npx.cmd" : "npx", npxArgs.map((a) => (/\s/.test(a) ? `"${a}"` : a)), {
            ...opts,
            shell: process.platform === "win32",
          });
    const rows = [];

    for (const page of pages) {
      const name = page.replace(/[\\/]+/g, "_") || "home";
      const outBase = path.join(workDir, name);
      let result = null;

      for (let attempt = 1; attempt <= MAX_TRIES && !result; attempt++) {
        log(`Auditing /${page} (attempt ${attempt}/${MAX_TRIES}) …`);
        const lhArgs = [
          "--yes",
          LIGHTHOUSE,
          `${base}/${page}`,
          "--quiet",
          `--chrome-flags=${CHROME_FLAGS}`,
          "--output=json",
          "--output=html",
          `--output-path=${outBase}`,
          ...(flag("desktop") ? ["--preset=desktop"] : []),
        ];
        runNpx(lhArgs, { stdio: "ignore", env, cwd: workDir });
        try {
          const report = JSON.parse(readFileSync(`${outBase}.report.json`, "utf8"));
          if (report.categories?.performance?.score != null) result = report;
        } catch {
          /* missing/partial report → retry */
        }
      }

      for (const ext of ["report.json", "report.html"]) {
        if (existsSync(`${outBase}.${ext}`)) copyFileSync(`${outBase}.${ext}`, path.join(reportsDir, `${name}.${ext}`));
      }
      if (!result) {
        rows.push({ page: `/${page}`, note: "Lighthouse failed to record a trace (retry later)" });
        continue;
      }
      const c = result.categories;
      const a = result.audits;
      const pct = (k) => (c[k]?.score == null ? "–" : Math.round(c[k].score * 100));
      rows.push({
        page: `/${page}`,
        performance: pct("performance"),
        accessibility: pct("accessibility"),
        "best-practices": pct("best-practices"),
        seo: pct("seo"),
        LCP: a["largest-contentful-paint"]?.displayValue,
        TBT: a["total-blocking-time"]?.displayValue,
        CLS: a["cumulative-layout-shift"]?.displayValue,
      });
    }

    rmSync(workDir, { recursive: true, force: true });

    // 4. Summary
    console.log("");
    console.table(rows);
    log(`HTML reports: ${path.relative(root, reportsDir)}${path.sep}<page>.report.html`);
    log("Scores vary by a few points between runs; compare several runs before drawing conclusions.");
  } finally {
    stop();
  }
}

main().catch((err) => fail(err.message));
