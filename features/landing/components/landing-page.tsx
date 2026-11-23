"use client";

import * as React from "react";
import { useDirection } from "@/hooks/use-direction";
import { TrackingSection } from "@/features/tracking";
import { ToolsSection } from "@/features/tools";
import { IndustriesSection } from "@/features/industries";
import { DashboardPreviewSection } from "@/features/dashboard-preview";
import { FaqSection } from "@/features/faq";
import { useLandingAnimations } from "../hooks/use-landing-animations";
import { plexArabic, plexMono } from "../fonts";
import { LandingNav } from "./landing-nav";
import { HeroSection } from "./hero-section";
import { WhySection } from "./why-section";
import { StepsSection } from "./steps-section";
import { CtaSection } from "./cta-section";
import { LandingFooter } from "./landing-footer";
import { BottomBar } from "./bottom-bar";
import "../styles/landing.css";

export function LandingPage() {
  const { direction } = useDirection();
  const scope = React.useRef<HTMLDivElement>(null);
  useLandingAnimations(scope);

  return (
    <div ref={scope} dir={direction} className={`dawam ${plexArabic.variable} ${plexMono.variable}`}>
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
    </div>
  );
}
