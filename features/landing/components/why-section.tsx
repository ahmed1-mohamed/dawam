"use client";

import { useTranslations } from "next-intl";
import { DEMO_ANCHOR_ID } from "@/features/demo-request";
import { WHY_KEYS } from "../constants";
import { DirArrow } from "./dir-arrow";

export function WhySection() {
  const t = useTranslations("landing.why");

  return (
    <section className="sheet s-why light" id="why">
      <div className="wrap why2">
        <div className="why2-h">
          <div className="eyebrow reveal">{t("eyebrow")}</div>
          <h2 className="h2 reveal">{t("title")}</h2>
          <a href={`#${DEMO_ANCHOR_ID}`} className="btn btn-p reveal">
            {t("cta")} <DirArrow />
          </a>
        </div>
        <ol className="why2-l">
          {WHY_KEYS.map((key, i) => (
            <li key={key} className="reveal">
              <span className="why2-n">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{t(`items.${key}.title`)}</h3>
                <p>{t(`items.${key}.body`)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
