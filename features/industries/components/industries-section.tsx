"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useAutoRotate } from "@/hooks/use-auto-rotate";
import { DirArrow } from "@/features/landing/components/dir-arrow";
import { CHIP_ICONS, INDUSTRIES, INDUSTRY_ROTATE_SECONDS } from "../constants";

export function IndustriesSection() {
  const t = useTranslations("landing.industries");
  const scope = React.useRef<HTMLDivElement>(null);

  const { active, select } = useAutoRotate({
    count: INDUSTRIES.length,
    duration: INDUSTRY_ROTATE_SECONDS,
    scope,
    barSelector: (i) => `[data-tab="${i}"] .ind2-bar i`,
    allBarsSelector: ".ind2-bar i",
  });

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const pane = `[data-panel="${active}"]`;
      gsap.fromTo(`${pane} .ind2-big`, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" });
      gsap.fromTo(`${pane} .ind-tx > *`, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" });
      gsap.fromTo(`${pane} .ind2-chip`, { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, delay: 0.15, ease: "power3.out" });
    },
    { scope, dependencies: [active] }
  );

  const industry = INDUSTRIES[active];
  const Icon = industry.icon;
  const num = (i: number) => String(i + 1).padStart(2, "0");

  return (
    <section className="sheet s-who light" id="who">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <div className="eyebrow reveal">{t("eyebrow")}</div>
            <h2 className="h2 reveal">{t("title")}</h2>
          </div>
          <p className="desc reveal">{t("desc")}</p>
        </div>

        <div className="ind2 reveal" ref={scope}>
          <div className="ind2-list" role="tablist" aria-label={t("eyebrow")}>
            {INDUSTRIES.map((item, i) => (
              <button
                key={item.key}
                type="button"
                role="tab"
                id={`ind-tab-${item.key}`}
                aria-selected={i === active}
                aria-controls="ind-panel"
                className="ind-t"
                data-tab={i}
                onClick={() => select(i)}
              >
                <span className="ind2-n">{num(i)}</span>
                <span className="ind2-t">{t(`items.${item.key}.title`)}</span>
                <span className="ind2-arr">
                  <DirArrow />
                </span>
                <span className="ind2-bar">
                  <i />
                </span>
              </button>
            ))}
          </div>

          <div className="ind-stage">
            <div
              key={industry.key}
              className="ind-p on"
              id="ind-panel"
              role="tabpanel"
              aria-labelledby={`ind-tab-${industry.key}`}
              data-panel={active}
            >
              <span className="ind2-big" aria-hidden="true">
                {num(active)}
              </span>
              <div className="ind-tx">
                <span className="ind2-ic">
                  <Icon strokeWidth={1.8} />
                </span>
                <h3>{t(`items.${industry.key}.title`)}</h3>
                <p>{t(`items.${industry.key}.body`)}</p>
              </div>
              <div className="ind-use">
                <span>{t("mostUsed")}</span>
                <div className="ind2-chips">
                  {industry.chips.map((chip) => {
                    const ChipIcon = CHIP_ICONS[chip];
                    return (
                      <span key={chip} className="ind2-chip">
                        <i>
                          <ChipIcon strokeWidth={2} />
                        </i>
                        {t(`chips.${chip}`)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
