/** Public site settings from `GET /landing/settings`. */
export interface SiteSettings {
  contactEmail: string;
  /** International format, digits only (used for wa.me links). */
  whatsappNumber: string;
  /** Human-readable phone number shown in the UI. */
  whatsappDisplay?: string;
  /** Length of the free trial, in days. */
  trialDays: number;
  privacyUrl?: string;
  deleteAccountUrl?: string;
}

export interface NavLink {
  key: "tracking" | "features" | "who" | "why" | "faq";
  href: `#${string}`;
}
