"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Page-wide scroll effects: fade-up for `.reveal` elements and the "sheet"
 * sections that widen to full width as they scroll through (as in the design).
 *
 * Performance: the sheet effect scrubs two CSS variables that clip the
 * section's ::before surface (paint only, no layout), and reveal triggers are
 * one-shot so they are removed after playing.
 */
export function useLandingAnimations(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, {
          y: 30,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        })
      );

      const inset = () => `${Math.min(window.innerWidth * 0.05, 64)}px`;
      const insetOut = () => `${Math.min(window.innerWidth * 0.05, 64) * 0.6}px`;

      gsap.utils.toArray<HTMLElement>(".sheet").forEach((sheet) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: sheet, start: "top bottom", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true },
          })
          .fromTo(
            sheet,
            { "--sheet-i": inset, "--sheet-r": "40px" },
            { "--sheet-i": "0px", "--sheet-r": "28px", ease: "power2.out", duration: 0.35 }
          )
          .to(sheet, { "--sheet-i": "0px", duration: 0.3 })
          .to(sheet, { "--sheet-i": insetOut, ease: "power2.in", duration: 0.35 });
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) =>
        gsap.to(el, { y: -12, rotation: 2, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 })
      );
    },
    { scope }
  );
}
