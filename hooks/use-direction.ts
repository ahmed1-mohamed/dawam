"use client";

import { useLocale } from "next-intl";

/**
 * Returns the text direction ('rtl' | 'ltr') and boolean helpers based on active locale.
 */
export function useDirection() {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const direction: "rtl" | "ltr" = isRtl ? "rtl" : "ltr";

  return {
    direction,
    isRtl,
    isLtr: !isRtl,
    locale,
  };
}
