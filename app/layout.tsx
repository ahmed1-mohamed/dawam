import type { ReactNode } from "react";

/**
 * Root layout required by Next.js for root-level files such as `app/not-found.tsx`.
 * It only passes children through: `<html lang dir>` is rendered by
 * `app/[locale]/layout.tsx` so it can follow the active locale (next-intl pattern).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
