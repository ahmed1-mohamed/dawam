"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { STEP_KEYS } from "../constants";

export function StepsSection() {
  const t = useTranslations("landing.steps");
  const scope = React.useRef<HTMLDivElement>(null);

  // Progress line connecting the steps fills while scrolling
  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(".u-line i", { scaleX: 1 });
        return;
      }
      gsap.to(".u-line i", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { trigger: scope.current, start: "top 75%", end: "top 35%", scrub: 0.5 },
      });
    },
    { scope }
  );

  return (
    <section className="sheet s-steps" id="how">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="h2 reveal">{t("title")}</h2>
          </div>
        </div>
        <div className="u-grid u-steps" ref={scope}>
          <span className="u-line" aria-hidden="true">
            <i />
          </span>
          {STEP_KEYS.map((key, i) => (
            <article key={key} className="u-card reveal">
              <span className="u-k">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t(`items.${key}.title`)}</h3>
              <p>{t(`items.${key}.body`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
