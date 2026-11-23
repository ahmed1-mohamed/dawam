import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { AppProviders } from "@/components/providers/app-providers";
import "@/app/globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    title: {
      default: isArabic
        ? "قالب البداية الحديث لـ Next.js"
        : "Modern Next.js Frontend Starter Template",
      template: isArabic ? "%s | قالب البداية" : "%s | Next.js Starter",
    },
    description: isArabic
      ? "قالب بداية عصري وقابل للتوسع ومجهز للإنتاج مبني بواسطة Next.js 15 و TypeScript و Tailwind CSS و shadcn/ui."
      : "A modern, scalable, production-ready Frontend Starter Template built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.",
    metadataBase: new URL("https://example.com"),
    alternates: {
      languages: {
        en: "/en",
        ar: "/ar",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_SA" : "en_US",
      siteName: isArabic ? "قالب Next.js" : "Next.js Starter",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
