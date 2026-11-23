"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

/** Light ⇄ dark toggle. `mounted` is false during SSR to avoid hydration mismatch. */
export function useThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === "dark";

  return {
    mounted,
    isDark,
    toggle: () => setTheme(isDark ? "light" : "dark"),
  };
}
