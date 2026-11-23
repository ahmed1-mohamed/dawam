import { useLocale, useTranslations } from "next-intl";
import { FAQ_KEYS } from "@/features/faq/constants";
import { SITE_URL, localizedUrl } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { SITE_SETTINGS } from "../constants";

/**
 * Structured data (schema.org JSON-LD) for search engines: the organization,
 * the website, the product, and the FAQ — all in the page's language.
 * Server Component: rendered into the HTML, no client JS.
 */
export function LandingJsonLd() {
  const locale = useLocale() as Locale;
  const tSeo = useTranslations("seo");
  const tFaq = useTranslations("landing.faq.items");
  const tMeta = useTranslations("landing.meta");

  const orgId = `${SITE_URL}/#organization`;
  const graph = [
    {
      "@type": "Organization",
      "@id": orgId,
      name: tSeo("siteName"),
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512.png`,
      email: SITE_SETTINGS.contactEmail,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: `+${SITE_SETTINGS.whatsappNumber}`,
        email: SITE_SETTINGS.contactEmail,
        availableLanguage: ["ar", "en"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: localizedUrl(locale),
      name: tSeo("siteName"),
      inLanguage: locale,
      publisher: { "@id": orgId },
    },
    {
      "@type": "SoftwareApplication",
      name: tSeo("siteName"),
      description: tMeta("description"),
      applicationCategory: "BusinessApplication",
      operatingSystem: "Android, iOS, Web",
      url: localizedUrl(locale),
      inLanguage: ["ar", "en"],
      publisher: { "@id": orgId },
    },
    {
      "@type": "FAQPage",
      inLanguage: locale,
      mainEntity: FAQ_KEYS.map((key) => ({
        "@type": "Question",
        name: tFaq(`${key}.question`),
        acceptedAnswer: { "@type": "Answer", text: tFaq(`${key}.answer`) },
      })),
    },
  ];

  // Escape "<" so the JSON can never close the <script> tag early
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
