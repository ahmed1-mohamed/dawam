import type { Metadata } from "next";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Public origin of the site, used for canonical URLs, hreflang, sitemap and
 * Open Graph. Set NEXT_PUBLIC_APP_URL to the production domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(/\/+$/, "");

export const OG_LOCALES: Record<Locale, string> = { ar: "ar_EG", en: "en_US" };

/** Absolute URL for a locale-prefixed path, e.g. `localizedUrl("ar", "/login")`. */
export function localizedUrl(locale: Locale, path = "") {
  return `${SITE_URL}/${locale}${path === "/" ? "" : path}`;
}

/**
 * Canonical + hreflang alternates for a path that exists in every locale.
 * `x-default` points at the default locale.
 */
export function localeAlternates(locale: Locale, path = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = localizedUrl(l, path);
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return { canonical: localizedUrl(locale, path), languages };
}

/** Pages that must not appear in search results (auth, private app screens). */
export const NO_INDEX: Metadata["robots"] = { index: false, follow: false };
