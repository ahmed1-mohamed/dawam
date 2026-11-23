"use client";

import * as React from "react";

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Animated scroll to `targetY`. Runs in JS (requestAnimationFrame) so it is
 * smooth in every browser regardless of OS/browser smooth-scroll settings.
 * Stops early if the user scrolls manually (wheel / touch / keys).
 */
function animateScrollTo(targetY: number, onDone?: () => void) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) {
    onDone?.();
    return () => {};
  }
  // ~0.5s for short hops, up to ~1.1s across the whole page
  const duration = Math.min(1100, Math.max(500, Math.abs(distance) * 0.35));
  let frame = 0;
  let start: number | null = null;

  const cancel = () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel", cancel);
    window.removeEventListener("touchstart", cancel);
    window.removeEventListener("keydown", cancel);
  };

  const step = (now: number) => {
    if (start === null) start = now;
    const t = Math.min(1, (now - start) / duration);
    window.scrollTo(0, startY + distance * easeInOutCubic(t));
    if (t < 1) frame = requestAnimationFrame(step);
    else {
      cancel();
      onDone?.();
    }
  };

  window.addEventListener("wheel", cancel, { passive: true });
  window.addEventListener("touchstart", cancel, { passive: true });
  window.addEventListener("keydown", cancel);
  frame = requestAnimationFrame(step);
  return cancel;
}

/**
 * Smoothly scrolls to in-page targets for every `<a href="#id">` inside `scope`
 * (one delegated listener). Updates the URL hash without jumping and moves
 * focus to the target for keyboard / screen-reader users.
 */
export function useSmoothAnchors(scope: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;
    let cancelCurrent: (() => void) | null = null;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || !root.contains(link)) return;

      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      cancelCurrent?.();

      const marginTop = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(maxY, Math.max(0, target.getBoundingClientRect().top + window.scrollY - marginTop));

      history.replaceState(null, "", `#${id}`);
      cancelCurrent = animateScrollTo(y, () => {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    };

    root.addEventListener("click", onClick);
    return () => {
      root.removeEventListener("click", onClick);
      cancelCurrent?.();
    };
  }, [scope]);
}
