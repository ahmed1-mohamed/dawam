"use client";

import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import { Languages, Moon, Sun } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocaleToggle } from "@/hooks/use-locale-toggle";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { DEMO_ANCHOR_ID } from "@/features/demo-request";
import { NAV_LINKS } from "../constants";

function LocaleIconButton() {
  const t = useTranslations("landing.nav");
  const { nextLocale, nextLabel, toggle, isPending } = useLocaleToggle();
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      disabled={isPending}
      aria-label={t("switchLanguage", { language: nextLabel })}
      title={nextLabel}
    >
      <Languages />
      <span className="loc" aria-hidden="true">
        {nextLocale.toUpperCase()}
      </span>
    </button>
  );
}

function ThemeIconButton() {
  const t = useTranslations("landing.nav");
  const { mounted, isDark, toggle } = useThemeToggle();
  const label = isDark ? t("lightMode") : t("darkMode");
  return (
    <button type="button" className="icon-btn" onClick={toggle} aria-label={label} title={label}>
      {/* Render a stable icon on the server, real state after mount */}
      {!mounted ? <Moon /> : isDark ? <Sun /> : <Moon />}
    </button>
  );
}

export function LandingNav() {
  const t = useTranslations("landing.nav");
  const tCommon = useTranslations("common");
  const { status } = useSession();

  return (
    <nav className="nav" aria-label={t("label")}>
      <div className="nav-in">
        <a href="#top" className="logo">
          <b>{t("logoMark")}</b>
          {t("brand")}
        </a>
        <div className="nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.key} href={link.href}>
              {t(`links.${link.key}`)}
            </a>
          ))}
        </div>
        <div className="nav-acts">
          <LocaleIconButton />
          <ThemeIconButton />
          {status === "authenticated" ? (
            <Link href="/dashboard" className="nav-login">
              {tCommon("dashboard")}
            </Link>
          ) : (
            <Link href="/login" className="nav-login">
              {t("login")}
            </Link>
          )}
          <a href={`#${DEMO_ANCHOR_ID}`} className="nav-cta">
            {t("cta")}
          </a>
        </div>
      </div>
    </nav>
  );
}
