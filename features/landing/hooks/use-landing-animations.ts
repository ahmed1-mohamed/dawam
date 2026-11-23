"use client";

import type { RefObject } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Page-wide scroll effects: fade-up for `.reveal` elements and the
 * "sheet" sections that widen to full width as they scroll through.
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
          scrollTrigger: { trigger: el, start: "top 88%" },
        })
      );

      const inset = () => Math.min(window.innerWidth * 0.05, 64);
      gsap.utils.toArray<HTMLElement>(".sheet").forEach((sheet) => {
        gsap
          .timeline({
            scrollTrigger: { trigger: sheet, start: "top bottom", end: "bottom top", scrub: 0.5, invalidateOnRefresh: true },
          })
          .fromTo(
            sheet,
            { marginLeft: inset, marginRight: inset, borderRadius: "40px 40px 0 0" },
            { marginLeft: 0, marginRight: 0, borderRadius: "28px 28px 0 0", ease: "power2.out", duration: 0.35 }
          )
          .to(sheet, { marginLeft: 0, duration: 0.3 })
          .to(sheet, { marginLeft: () => inset() * 0.6, marginRight: () => inset() * 0.6, ease: "power2.in", duration: 0.35 });
      });

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) =>
        gsap.to(el, { y: -12, rotation: 2, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 })
      );
    },
    { scope }
  );
}
