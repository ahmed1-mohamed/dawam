import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { LANDING_NAMESPACES, pickMessages } from "@/i18n/messages";
import { TrackingSection } from "@/features/tracking";
import { ToolsSection } from "@/features/tools";
import { IndustriesSection } from "@/features/industries";
import { DashboardPreviewSection } from "@/features/dashboard-preview";
import { FaqSection } from "@/features/faq";
import { plexArabic, plexMono } from "../fonts";
import { LandingShell } from "./landing-shell";
import { LandingNav } from "./landing-nav";
import { HeroSection } from "./hero-section";
import { WhySection } from "./why-section";
import { StepsSection } from "./steps-section";
import { CtaSection } from "./cta-section";
import { LandingFooter } from "./landing-footer";
import { BottomBar } from "./bottom-bar";
import { LandingJsonLd } from "./landing-json-ld";
import "../styles/landing.css";

/**
 * Server Component. Static sections (hero copy, why, steps, CTA, footer)
 * render on the server only; interactive ones are client islands.
 * The nested provider ships only the landing translations to the browser.
 */
export async function LandingPage() {
  const locale = await getLocale();
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={pickMessages(messages, LANDING_NAMESPACES)}>
      <LandingJsonLd />
      <LandingShell dir={dir} className={`dawam ${plexArabic.variable} ${plexMono.variable}`}>
        <LandingNav />
        <main>
          <HeroSection />
          <TrackingSection />
          <ToolsSection />
          <IndustriesSection />
          <DashboardPreviewSection />
          <WhySection />
          <StepsSection />
          <FaqSection />
          <CtaSection />
        </main>
        <LandingFooter />
        <BottomBar />
      </LandingShell>
    </NextIntlClientProvider>
  );
}
