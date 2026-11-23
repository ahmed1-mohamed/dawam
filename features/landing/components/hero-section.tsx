"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { DemoRequestForm, DEMO_ANCHOR_ID } from "@/features/demo-request";
import { HERO_TRUST_KEYS } from "../constants";
import { DirArrow } from "./dir-arrow";

/** Splits a sentence into word spans for the staggered title animation. */
function Words({ text }: { text: string }) {
  const words = text.split(" ").filter(Boolean);
  return (
    <>
      {words.map((word, i) => (
        <React.Fragment key={`${word}-${i}`}>
          <span className="w">{word}</span>
          {i < words.length - 1 ? " " : null}
        </React.Fragment>
      ))}
    </>
  );
}

export function HeroSection() {
  const t = useTranslations("landing.hero");
  const scope = React.useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("h1 .w", { yPercent: 60, opacity: 0, rotate: -3, duration: 0.9, stagger: 0.07 })
        .from(".hero-in", { y: 22, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=.55")
        .from(
          "[data-hero-browser]",
          { y: 50, opacity: 0, rotateX: 8, transformPerspective: 1200, transformOrigin: "50% 100%", duration: 1.1 },
          "-=.8"
        );
    },
    { scope }
  );

  return (
    <header className="hero" id="top" ref={scope}>
      <div className="wrap hero-cols">
        <div>
          <span className="badge hero-in">
            <span className="live" />
            {t("badge")}
          </span>
          <h1>
            <Words text={t("titleLine1")} />
            <br />
            <Words text={t("titleLine2")} />{" "}
            <span className="w">
              <em>{t("titleEmphasis")}</em>
            </span>
          </h1>
          <p className="lead hero-in">{t("lead")}</p>
          <div className="ctas hero-in">
            <a href={`#${DEMO_ANCHOR_ID}`} className="btn btn-p">
              {t("primaryCta")} <DirArrow />
            </a>
            <a href="#tracking" className="btn btn-g">
              {t("secondaryCta")}
            </a>
          </div>
          <div className="trust hero-in">
            {HERO_TRUST_KEYS.map((key) => (
              <span key={key}>
                <Check strokeWidth={2.4} />
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
