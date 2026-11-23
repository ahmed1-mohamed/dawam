"use client";

import * as React from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

interface Options {
  count: number;
  /** Seconds each item stays active. */
  duration: number;
  /** Container observed for visibility (rotation pauses off-screen). */
  scope: React.RefObject<HTMLElement | null>;
  /** CSS selector (inside scope) of the progress bar fill for item `i`. */
  barSelector: (index: number) => string;
  /** Selector matching every progress fill, reset on change. */
  allBarsSelector: string;
  /** Visibility threshold for the IntersectionObserver. */
  threshold?: number;
}

/**
 * Cycles through `count` items with an animated progress bar, like a carousel.
 * Pauses while the container is off-screen and when reduced motion is preferred.
 */
export function useAutoRotate({ count, duration, scope, barSelector, allBarsSelector, threshold = 0.3 }: Options) {
  const [active, setActive] = React.useState(0);
  const tween = React.useRef<gsap.core.Tween | null>(null);
  const visible = React.useRef(false);

  React.useEffect(() => {
    const el = scope.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (visible.current) tween.current?.resume();
        else tween.current?.pause();
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [scope, threshold]);

  useGSAP(
    () => {
      gsap.set(allBarsSelector, { scaleX: 0 });
      if (prefersReducedMotion() || count < 2) return;
      tween.current = gsap.to(barSelector(active), {
        scaleX: 1,
        duration,
        ease: "none",
        onComplete: () => setActive((i) => (i + 1) % count),
      });
      if (!visible.current) tween.current.pause();
    },
    { scope, dependencies: [active, count], revertOnUpdate: true }
  );

  return { active, select: setActive };
}
