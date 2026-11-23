"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Languages, Menu, Moon, Sun, X } from "lucide-react";
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
      // Badge is drawn by CSS (::after) so it isn't counted as the button's visible label
      data-loc={nextLocale.toUpperCase()}
    >
      <Languages aria-hidden="true" />
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
  const [open, setOpen] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  // Close the mobile menu on Escape, outside click, or when resized to desktop
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onPointer = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 961px)");
    const onDesktop = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [open]);

  const linkItems = (withIndex: boolean) =>
    NAV_LINKS.map((link, i) => (
      <a
        key={link.key}
        href={link.href}
        onClick={() => setOpen(false)}
        style={withIndex ? ({ "--i": i } as React.CSSProperties) : undefined}
      >
        {t(`links.${link.key}`)}
      </a>
    ));

  return (
    <nav className={`nav${open ? " open" : ""}`} aria-label={t("label")} ref={navRef}>
      <div className="nav-in">
        <a href="#top" className="logo">
          <b>{t("logoMark")}</b>
          {t("brand")}
        </a>
        <div className="nav-links">{linkItems(false)}</div>
        <div className="nav-acts">
          <LocaleIconButton />
          <ThemeIconButton />
          <a href={`#${DEMO_ANCHOR_ID}`} className="nav-cta">
            {t("cta")}
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-expanded={open}
            aria-controls="landing-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {/* both icons stay mounted so CSS can morph ☰ ⇄ ✕ */}
            <Menu className="mi-open" aria-hidden="true" />
            <X className="mi-close" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Always mounted so it can animate open and closed; inert while closed */}
      <div className="nav-menu" id="landing-menu" aria-hidden={!open} inert={!open}>
        <div className="nav-menu-inner">
          <div className="nav-menu-links">{linkItems(true)}</div>
          <a
            href={`#${DEMO_ANCHOR_ID}`}
            className="btn btn-p nav-menu-cta"
            onClick={() => setOpen(false)}
            style={{ "--i": NAV_LINKS.length } as React.CSSProperties}
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </nav>
  );
}
