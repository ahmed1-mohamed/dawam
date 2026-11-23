"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { siteSettingsService } from "../services/site-settings-service";
import { FALLBACK_SITE_SETTINGS } from "../constants";
import { landingKeys } from "./query-keys";

/** Site settings with safe fallbacks so the page renders without the API. */
export function useSiteSettings() {
  const locale = useLocale();
  const query = useQuery({
    queryKey: landingKeys.settings(locale),
    queryFn: siteSettingsService.get,
    staleTime: 30 * 60 * 1000,
  });

  return { ...query, settings: { ...FALLBACK_SITE_SETTINGS, ...query.data } };
}
