import * as React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { DemoRequestForm, DEMO_ANCHOR_ID } from "@/features/demo-request";
import { HERO_TRUST_KEYS } from "../constants";
import { DirArrow } from "./dir-arrow";

type Indexed = React.CSSProperties & { "--i": number };
const idx = (i: number): Indexed => ({ "--i": i });

/** Splits a sentence into word spans for the staggered title animation. */
function Words({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="w" style={idx(offset + i)}>
            {word}
          </span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

/**
 * Server Component. The entrance animation is pure CSS (landing.css), so it
 * starts on first paint without waiting for JavaScript — good for LCP.
 */
export function HeroSection() {
  const t = useTranslations("landing.hero");
  const line1 = t("titleLine1");
  const line2 = t("titleLine2");
  const line1Count = line1.split(" ").filter(Boolean).length;
  const line2Count = line2.split(" ").filter(Boolean).length;

  return (
    <header className="hero" id="top">
      <div className="wrap hero-cols">
        <div>
          <span className="badge hero-in" style={idx(0)}>
            <span className="live" />
            {t("badge")}
          </span>
          <h1>
            <Words text={line1} />
            <br />
            <Words text={line2} offset={line1Count} />{" "}
            <span className="w" style={idx(line1Count + line2Count)}>
              <em>{t("titleEmphasis")}</em>
            </span>
          </h1>
          {/* No entrance animation: this paragraph is the LCP element, so it paints immediately */}
          <p className="lead">{t("lead")}</p>
          <div className="ctas hero-in" style={idx(2)}>
            <a href={`#${DEMO_ANCHOR_ID}`} className="btn btn-p">
              {t("primaryCta")} <DirArrow />
            </a>
            <a href="#tracking" className="btn btn-g">
              {t("secondaryCta")}
            </a>
          </div>
          <div className="trust hero-in" style={idx(3)}>
            {HERO_TRUST_KEYS.map((key) => (
              <span key={key}>
                <Check strokeWidth={2.4} aria-hidden="true" />
                {t(`trust.${key}`)}
              </span>
            ))}
          </div>
        </div>

        <DemoRequestForm />
      </div>
    </header>
  );
}
