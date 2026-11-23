/** Locale is part of the key so switching language refetches localized data. */
export const landingKeys = {
  all: ["landing"] as const,
  settings: (locale: string) => [...landingKeys.all, "settings", locale] as const,
};
