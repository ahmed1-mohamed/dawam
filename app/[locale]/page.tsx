import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { LandingPage } from "@/features/landing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "landing.meta" });
  return {
    title: { absolute: t("title") },
    description: t("description"),
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <LandingPage />;
}
