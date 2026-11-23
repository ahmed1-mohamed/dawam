import type { NavLink, SiteSettings } from "./types";

export const NAV_LINKS: NavLink[] = [
  { key: "tracking", href: "#tracking" },
  { key: "features", href: "#features" },
  { key: "who", href: "#who" },
  { key: "why", href: "#why" },
  { key: "faq", href: "#faq" },
];

/** Static site details (contact, WhatsApp, trial length, legal links). */
export const SITE_SETTINGS: SiteSettings = {
  contactEmail: "m.salman@dawam.net",
  whatsappNumber: "201000000000",
  whatsappDisplay: "+20 100 000 0000",
  trialDays: 14,
  privacyUrl: "/privacy",
  deleteAccountUrl: "/delete-account",
};

export const WHY_KEYS = ["tamperProof", "fullPicture", "arabicFirst", "payroll"] as const;
export const STEP_KEYS = ["request", "setup", "start"] as const;
export const HERO_TRUST_KEYS = ["teams", "arabic", "support"] as const;

export const CTA_IMAGE = "/images/landing/tasks.png";
