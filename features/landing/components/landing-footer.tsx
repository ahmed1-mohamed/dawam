"use client";

import { useTranslations } from "next-intl";
import { useSiteSettings } from "../hooks/use-site-settings";

export function LandingFooter() {
  const t = useTranslations("landing.footer");
  const { settings } = useSiteSettings();

  return (
    <footer className="footer">
      <div className="wrap">
        <span>{t("legal")}</span>
        <span className="f-links">
          <a href={`mailto:${settings.contactEmail}`} className="ltr">
            {settings.contactEmail}
          </a>
          <i>·</i>
          <a href={settings.privacyUrl}>{t("privacy")}</a>
          <i>·</i>
          <a href={settings.deleteAccountUrl}>{t("deleteAccount")}</a>
        </span>
      </div>
    </footer>
  );
}
