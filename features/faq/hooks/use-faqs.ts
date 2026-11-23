"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { faqService } from "../services/faq-service";
import { faqKeys } from "./query-keys";
import { FALLBACK_FAQ_KEYS } from "../constants";
import type { FaqItem } from "../types";

/**
 * FAQs from the backend, with the bundled translations as a fallback so the
 * section always renders (API down, not deployed yet, or still loading).
 */
export function useFaqs() {
  const locale = useLocale();
  const t = useTranslations("landing.faq.items");

  const query = useQuery({
    queryKey: faqKeys.list(locale),
    queryFn: faqService.getAll,
    staleTime: 10 * 60 * 1000,
  });

  const fallback: FaqItem[] = FALLBACK_FAQ_KEYS.map((key) => ({
    id: key,
    question: t(`${key}.question`),
    answer: t(`${key}.answer`),
  }));

  const items = query.data && query.data.length > 0 ? query.data : fallback;

  return { ...query, items, isFallback: items === fallback };
}
