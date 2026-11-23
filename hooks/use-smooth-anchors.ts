"use client";

import * as React from "react";

/**
 * Smoothly scrolls to in-page targets for every `<a href="#id">` inside `scope`
 * (one delegated listener). Updates the URL hash without jumping, moves focus
 * to the target for keyboard/screen-reader users, and respects reduced motion.
 */
export function useSmoothAnchors(scope: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const root = scope.current;
    if (!root) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link || !root.contains(link)) return;

      const id = decodeURIComponent(link.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);

      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, [scope]);
}
