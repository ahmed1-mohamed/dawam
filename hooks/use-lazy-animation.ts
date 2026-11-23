"use client";

import * as React from "react";
import { getLoadedGsap, loadGsap, whenIdle, type GsapApi } from "@/lib/gsap";

type Setup = (api: GsapApi) => void | (() => void);

interface Options {
  /** Element that scopes selector text (like useGSAP's `scope`). */
  scope?: React.RefObject<HTMLElement | null>;
  /** Re-run (reverting the previous run) when these change. */
  dependencies?: React.DependencyList;
}

/**
 * Drop-in replacement for `useGSAP` that loads GSAP lazily.
 *
 * The first animations wait for the browser to be idle, then load GSAP and
 * run `setup` inside a `gsap.context` (selectors scoped to `scope`). Later
 * runs (dependency changes, other components) start immediately because GSAP
 * is already loaded. Everything created in the context is reverted on
 * unmount / before re-running, and a function returned by `setup` is called too.
 */
export function useLazyAnimation(setup: Setup, { scope, dependencies = [] }: Options = {}) {
  const setupRef = React.useRef(setup);
  setupRef.current = setup;

  React.useEffect(() => {
    let cancelled = false;
    let ctx: gsap.Context | undefined;

    const start = (api: GsapApi) => {
      if (cancelled) return;
      ctx = api.gsap.context(() => setupRef.current(api), scope?.current ?? undefined);
    };

    const ready = getLoadedGsap();
    let cancelIdle = () => {};
    if (ready) start(ready);
    else cancelIdle = whenIdle(() => void loadGsap().then(start));

    return () => {
      cancelled = true;
      cancelIdle();
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}
