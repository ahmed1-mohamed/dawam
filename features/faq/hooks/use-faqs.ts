"use client";

import { useTranslations } from "next-intl";
import { FAQ_KEYS } from "../constants";
import type { FaqItem } from "../types";

/** Static, translated FAQ entries (no network). */
export function useFaqs(): FaqItem[] {
  const t = useTranslations("landing.faq.items");
  return FAQ_KEYS.map((key) => ({
    id: key,
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }));
}
