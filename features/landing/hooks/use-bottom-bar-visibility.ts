"use client";

import * as React from "react";

/**
 * True once the visitor has scrolled past the hero, and false again when the
 * footer (end of the page) comes into view.
 */
export function useBottomBarVisibility({
  heroSelector = ".dawam .hero",
  endSelector = ".dawam .footer",
  /** Fraction of the viewport the hero's bottom must pass before showing. */
  heroThreshold = 0.7,
}: { heroSelector?: string; endSelector?: string; heroThreshold?: number } = {}) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const hero = document.querySelector(heroSelector);
      const end = document.querySelector(endSelector);
      const vh = window.innerHeight;
      const pastHero = hero ? hero.getBoundingClientRect().bottom < vh * heroThreshold : false;
      const atEnd = end ? end.getBoundingClientRect().top < vh : false;
      setVisible(pastHero && !atEnd);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [heroSelector, endSelector, heroThreshold]);

  return visible;
}
