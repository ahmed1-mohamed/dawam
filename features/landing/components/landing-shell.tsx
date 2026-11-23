"use client";

import * as React from "react";
import { useSmoothAnchors } from "@/hooks/use-smooth-anchors";
import { useLandingAnimations } from "../hooks/use-landing-animations";

/**
 * The only page-level client component: it owns the root element so it can
 * attach scroll effects and smooth in-page anchors. Sections are passed in as
 * children, so static ones stay Server Components (no hydration cost).
 */
export function LandingShell({
  dir,
  className,
  children,
}: {
  dir: "rtl" | "ltr";
  className: string;
  children: React.ReactNode;
}) {
  const scope = React.useRef<HTMLDivElement>(null);
  useLandingAnimations(scope);
  useSmoothAnchors(scope);

  return (
    <div ref={scope} dir={dir} className={className}>
      {children}
    </div>
  );
}
