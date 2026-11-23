"use client";

/**
 * Lazy GSAP loader.
 *
 * GSAP + ScrollTrigger are NOT part of the initial bundle: they're fetched as a
 * separate chunk the first time an animation needs them (normally once the
 * browser is idle after the page became interactive). This keeps ~70 KB of
 * script evaluation off the critical path. Above-the-fold entrance animations
 * are pure CSS, so nothing visible waits for this.
 */
export interface GsapApi {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}

let loaded: GsapApi | null = null;
let pending: Promise<GsapApi> | null = null;

export function loadGsap(): Promise<GsapApi> {
  if (loaded) return Promise.resolve(loaded);
  if (!pending) {
    pending = Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, st]) => {
      g.gsap.registerPlugin(st.ScrollTrigger);
      loaded = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger };
      return loaded;
    });
  }
  return pending;
}

/** GSAP if it has already loaded (for event handlers), otherwise null. */
export function getLoadedGsap(): GsapApi | null {
  return loaded;
}

/** Runs `cb` when the main thread is idle (or after `timeout` ms at the latest). Returns a cancel function. */
export function whenIdle(cb: () => void, timeout = 2000): () => void {
  if (typeof window === "undefined") return () => {};
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(cb, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(cb, 200);
  return () => clearTimeout(id);
}

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
