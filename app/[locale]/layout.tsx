import type { Metadata, Viewport } from "next";
import { Cairo, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { BASE_NAMESPACES, pickMessages } from "@/i18n/messages";
import { AppProviders } from "@/components/providers/app-providers";
import { OG_LOCALES, SITE_URL } from "@/lib/seo";
import "@/app/globals.css";

/*
 * App-wide fonts (dashboard, login, ...). Self-hosted by next/font, so no
 * render-blocking request to Google. `preload: false` keeps them off the
 * landing page, which uses its own IBM Plex fonts; browsers only download a
 * font file when text on the page actually uses it.
 */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap", preload: false });
const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap", preload: false });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0c0c" },
  ],
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: t("siteName"),
    title: { default: t("defaultTitle"), template: t("titleTemplate") },
    description: t("description"),
    formatDetection: { telephone: false, email: false, address: false },
    openGraph: {
      type: "website",
      siteName: t("siteName"),
      locale: OG_LOCALES[locale as Locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
      images: [{ url: `/images/og/og-${locale}.png`, width: 1200, height: 630, alt: t("ogImageAlt") }],
    },
    twitter: { card: "summary_large_image", images: [`/images/og/og-${locale}.png`] },
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
    <html lang={locale} dir={dir} suppressHydrationWarning className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col">
        <NextIntlClientProvider locale={locale} messages={pickMessages(messages, BASE_NAMESPACES)}>
          <AppProviders>{children}</AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
