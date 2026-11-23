/**
 * Keys of the bundled FAQ entries in `messages/*.json` (landing.faq.items.<key>).
 * Used as a fallback while the API loads or when it is unavailable.
 */
export const FALLBACK_FAQ_KEYS = ["remote", "tracking", "devices", "offline", "payroll", "setup"] as const;
