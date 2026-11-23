"use client";

import * as React from "react";
import type { RefObject } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import { useLazyAnimation } from "@/hooks/use-lazy-animation";

/**
 * Page-wide scroll effects.
 *
 * - `.reveal` fade-ups use ONE IntersectionObserver + CSS transitions
 *   (landing.css). No per-element ScrollTriggers, so no layout reads at startup.
 * - "Sheet" sections widen as they scroll (GSAP — loaded lazily — scrubs two CSS variables that
 *   clip the section's ::before surface — paint only, no layout).
 * - The steps connector line fills on scroll; `[data-float]` icons bob.
 */
export function useLandingAnimations(scope: RefObject<HTMLElement | null>) {
  // Reveals: mark the root as JS-ready (enables the hidden start state), then reveal on intersect
  React.useEffect(() => {
    const root = scope.current;
    if (!root || prefersReducedMotion()) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    root.setAttribute("data-reveal", "");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.classList.add("is-in");
          io.unobserve(el);
          // Drop the long reveal transition afterwards so hover transitions work normally
          el.addEventListener("transitionend", () => el.classList.add("is-done"), { once: true });
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    items.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.removeAttribute("data-reveal");
    };
  }, [scope]);

  useLazyAnimation(
    ({ gsap }) => {
      if (prefersReducedMotion()) {
        gsap.set(".u-line i", { scaleX: 1 });
        return;
      }

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

      const steps = scope.current?.querySelector("[data-steps]");
      if (steps) {
        gsap.to(".u-line i", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: steps, start: "top 75%", end: "top 35%", scrub: 0.5 },
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-float]").forEach((el) =>
        gsap.to(el, { y: -12, rotation: 2, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 })
      );
    },
    { scope }
  );
}
