"use client";

import * as React from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useAutoRotate } from "@/hooks/use-auto-rotate";
import { TOOLS, TOOL_ROTATE_SECONDS } from "../constants";

export function ToolsSection() {
  const t = useTranslations("landing.tools");
  const accRef = React.useRef<HTMLDivElement>(null);

  const { active, select } = useAutoRotate({
    count: TOOLS.length,
    duration: TOOL_ROTATE_SECONDS,
    scope: accRef,
    barSelector: (i) => `[data-acc="${i}"] .acc-bar i`,
    allBarsSelector: ".acc-bar i",
    threshold: 0.25,
  });

  // Entrance + icon pop when a panel opens
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".acc-p", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: accRef.current, start: "top 85%" },
      });
    },
    { scope: accRef }
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        `[data-acc="${active}"] .acc-ic img`,
        { rotate: -8, scale: 1.2 },
        { rotate: 0, scale: 1.4, duration: 0.9, ease: "back.out(1.8)" }
      );
    },
    { scope: accRef, dependencies: [active] }
  );

  const onHover = (i: number) => {
    if (i !== active && window.matchMedia("(min-width:961px)").matches) select(i);
  };

  return (
    <section className="sheet s-feat" id="features">
      <div className="wrap">
        <div className="eyebrow reveal">{t("eyebrow")}</div>
        <h2 className="h2 reveal">{t("title")}</h2>
        <p className="desc reveal">{t("desc")}</p>

        <div className="acc" ref={accRef}>
          {TOOLS.map((tool, i) => {
            const isOn = i === active;
            return (
              <button
                key={tool.key}
                type="button"
                data-acc={i}
                className={`acc-p${isOn ? " on" : ""}`}
                aria-expanded={isOn}
                onClick={() => select(i)}
                onMouseEnter={() => onHover(i)}
              >
                <span className="acc-n">{String(i + 1).padStart(2, "0")}</span>
                <span className="acc-ic">
                  <Image src={tool.image} alt="" width={340} height={340} sizes="170px" />
                </span>
                <span className="acc-v">{t(`items.${tool.key}.title`)}</span>
                <span className="acc-body">
                  <b>{t(`items.${tool.key}.title`)}</b>
                  <span>{t(`items.${tool.key}.body`)}</span>
                </span>
                <span className="acc-bar">
                  <i />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
