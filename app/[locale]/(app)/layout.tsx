import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { APP_NAMESPACES, pickMessages } from "@/i18n/messages";
import { AppAreaProviders } from "@/components/providers/app-area-providers";
import { NO_INDEX } from "@/lib/seo";

/** Private app screens (login, dashboard, showcase): never indexed. */
export const metadata: Metadata = { robots: NO_INDEX };

/**
 * Layout for the authenticated app area. NextAuth, React Query, tooltips and
 * toasts live here (AppAreaProviders), so the public landing page doesn't load them.
 */
export default async function AppAreaLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={pickMessages(messages, APP_NAMESPACES)}>
      <AppAreaProviders>{children}</AppAreaProviders>
    </NextIntlClientProvider>
  );
}
