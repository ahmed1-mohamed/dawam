"use client";

import * as React from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, routing, type Locale } from "@/i18n/routing";
import { LOCALE_NAMES } from "@/constants";

/**
 * Switches between the app locales (en ⇄ ar). Direction (ltr/rtl) follows
 * automatically: the [locale] layout sets <html lang dir> from the locale.
 */
export function useLocaleToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = React.useTransition();

  const nextLocale = (routing.locales.find((l) => l !== locale) ?? routing.defaultLocale) as Locale;

  const toggle = React.useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale, scroll: false });
    });
  }, [router, pathname, nextLocale]);

  return {
    locale,
    nextLocale,
    nextLabel: LOCALE_NAMES[nextLocale]?.label ?? nextLocale,
    nextDir: LOCALE_NAMES[nextLocale]?.dir ?? "ltr",
    toggle,
    isPending,
  };
}
