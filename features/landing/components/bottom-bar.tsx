"use client";

import { useTranslations } from "next-intl";
import { DEMO_ANCHOR_ID } from "@/features/demo-request";
import { useSiteSettings } from "../hooks/use-site-settings";
import { useBottomBarVisibility } from "../hooks/use-bottom-bar-visibility";
import { DirArrow } from "./dir-arrow";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.43 9.43 0 0 1-1.45-5.03c0-5.2 4.24-9.44 9.45-9.44a9.4 9.4 0 0 1 9.44 9.45c0 5.21-4.24 9.44-9.45 9.44M20.08 3.9A11.33 11.33 0 0 0 12.05.58C5.79.58.7 5.67.7 11.92c0 2 .52 3.95 1.52 5.67L.6 23.42l5.97-1.57a11.3 11.3 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.34 0-3.03-1.18-5.88-3.32-8.02" />
    </svg>
  );
}

/**
 * Free-trial bar fixed to the bottom of the viewport. Slides in after the
 * hero and hides again at the end of the page (CSS transition on `.on`).
 */
export function BottomBar() {
  const t = useTranslations("landing.bottomBar");
  const { settings } = useSiteSettings();
  const visible = useBottomBarVisibility();

  return (
    <div
      className={`bbar${visible ? " on" : ""}`}
      role="region"
      aria-label={t("label")}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="bbar-in">
        <div className="bbar-tx">
          <span className="live" />
          <b>{t("title", { days: settings.trialDays })}</b>
          <span className="bbar-sub">{t("sub")}</span>
        </div>
        <div className="bbar-acts">
          <a
            className="bbar-wa"
            href={`https://wa.me/${settings.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("whatsapp")}
          >
            <WhatsAppIcon />
            <span className="ltr">{settings.whatsappDisplay ?? `+${settings.whatsappNumber}`}</span>
          </a>
          <a className="btn btn-p bbar-cta" href={`#${DEMO_ANCHOR_ID}`}>
            {t("cta")} <DirArrow />
          </a>
        </div>
      </div>
    </div>
  );
}
