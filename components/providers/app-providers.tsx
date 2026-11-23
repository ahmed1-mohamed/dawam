"use client";

import * as React from "react";
import { ThemeProvider } from "./theme-provider";

/**
 * Providers needed on EVERY page (including the public landing page).
 * Keep this minimal: anything here ships to every visitor.
 * App-only providers (React Query, tooltips, toasts, auth) live in
 * `AppAreaProviders`, used by app/[locale]/(app)/layout.tsx.
 */
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
