/** Locale is part of every key so switching language refetches localized data. */
export const faqKeys = {
  all: ["faqs"] as const,
  list: (locale: string) => [...faqKeys.all, "list", locale] as const,
};
