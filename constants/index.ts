export const APP_CONFIG = {
  name: "Next.js Starter Template",
  version: "1.0.0",
  defaultLocale: "en" as const,
  locales: ["en", "ar"] as const,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com/v1",
  themeStorageKey: "app-theme",
} as const;

export const NAV_ITEMS = [
  {
    key: "overview",
    href: "/dashboard",
    icon: "LayoutDashboard",
  },
  {
    key: "showcase",
    href: "/components-showcase",
    icon: "Boxes",
  },
] as const;

export const LOCALE_NAMES: Record<string, { label: string; dir: "ltr" | "rtl"; flag: string }> = {
  en: { label: "English", dir: "ltr", flag: "🇺🇸" },
  ar: { label: "العربية", dir: "rtl", flag: "🇸🇦" },
};
