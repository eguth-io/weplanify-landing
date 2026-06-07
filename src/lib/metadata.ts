import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://www.weplanify.com";

// Open Graph locale codes per supported locale.
const OG_LOCALES: Record<string, string> = {
  en: "en_US",
  es: "es_ES",
  fr: "fr_FR",
  it: "it_IT",
  zh: "zh_CN",
  de: "de_DE",
  pt: "pt_PT",
  pl: "pl_PL",
};

// Builds the hreflang `languages` map for every supported locale + x-default (en).
function hreflangLanguages(baseUrl: string, pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of routing.locales) {
    languages[locale] = `${baseUrl}/${locale}${pathname}`;
  }
  languages["x-default"] = `${baseUrl}/${routing.defaultLocale}${pathname}`;
  return languages;
}

const localizedDefaults: Record<string, { title: string; description: string }> = {
  en: {
    title: "WePlanify — Free Group Trip Planner App for Friends",
    description:
      "The collaborative group trip planner app: shared itinerary, group polls, shared budget and packing lists. Free, bilingual, built for trips with friends.",
  },
  fr: {
    title: "WePlanify — L'appli gratuite pour planifier un voyage de groupe",
    description:
      "L'appli collaborative pour vos voyages entre amis : itinéraire partagé, sondages, budget commun, listes de bagages. Gratuite, en français.",
  },
};

/**
 * Generates Next.js metadata from Sanity SEO Settings with locale support
 * @param locale - Current locale (en, fr)
 * @param pathname - Current pathname without locale prefix (e.g., "/blog", "/contact")
 */
export async function generateMetadataFromSanity(
  locale: string = "en",
  pathname: string = ""
): Promise<Metadata> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

    if (!seoSettings) {
      console.warn("SEO Settings not found in Sanity, using defaults");
      return getDefaultMetadata(locale, pathname);
    }

    const baseUrl = normalizeUrl(seoSettings.siteUrl || SITE_URL);
    const currentUrl = `${baseUrl}/${locale}${pathname}`;
    const localized = localizedDefaults[locale] || localizedDefaults.en;

    const title = localized.title;
    const description = localized.description;

    const metadata: Metadata = {
      title: {
        default: title,
        template: seoSettings.titleTemplate || "%s | WePlanify",
      },
      description,
      authors: [{ name: seoSettings.organizationName || "WePlanify" }],
      creator: seoSettings.organizationName || "WePlanify",
      publisher: seoSettings.organizationName || "WePlanify",

      // Robots
      robots: {
        index: seoSettings.robotsSettings?.allowIndexing ?? true,
        follow: seoSettings.robotsSettings?.allowIndexing ?? true,
        googleBot: {
          index: seoSettings.robotsSettings?.allowIndexing ?? true,
          follow: seoSettings.robotsSettings?.allowIndexing ?? true,
        },
      },

      // Open Graph
      openGraph: {
        type: seoSettings.ogType || "website",
        locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
        url: currentUrl,
        siteName: seoSettings.siteName || "WePlanify",
        title,
        description,
        images: seoSettings.ogImage
          ? [
              {
                url: seoSettings.ogImage,
                width: 1200,
                height: 630,
                alt: title,
              },
            ]
          : [],
      },

      // Twitter
      twitter: {
        card: seoSettings.twitterCard || "summary_large_image",
        site: seoSettings.twitterHandle || undefined,
        creator: seoSettings.twitterHandle || undefined,
        title,
        description,
        images: seoSettings.ogImage ? [seoSettings.ogImage] : [],
      },

      // Icons
      icons: {
        icon: [
          { url: "/favicon.ico", sizes: "any" },
          { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
          { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        ],
        apple: "/apple-touch-icon.png",
      },

      // Manifest
      manifest: "/manifest.json",

      // Theme Color
      themeColor: seoSettings.manifest?.themeColor || "#D42D10",

      // Hreflang + Canonical
      alternates: {
        canonical: currentUrl,
        languages: hreflangLanguages(baseUrl, pathname),
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error fetching SEO settings from Sanity:", error);
    return getDefaultMetadata(locale, pathname);
  }
}

/**
 * Default metadata when Sanity is unavailable
 */
function getDefaultMetadata(locale: string = "en", pathname: string = ""): Metadata {
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;
  const localized = localizedDefaults[locale] || localizedDefaults.en;

  return {
    title: {
      default: localized.title,
      template: "%s | WePlanify",
    },
    description: localized.description,
    openGraph: {
      type: "website",
      locale: OG_LOCALES[locale] ?? OG_LOCALES.en,
      url: currentUrl,
      siteName: "WePlanify",
      title: localized.title,
      description: localized.description,
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
    },
    alternates: {
      canonical: currentUrl,
      languages: hreflangLanguages(SITE_URL, pathname),
    },
  };
}

/**
 * Normalize URL to always use www prefix
 */
function normalizeUrl(url: string): string {
  return url.replace("https://weplanify.com", SITE_URL);
}

/**
 * Organization JSON-LD schema
 */
export function generateOrganizationSchema(seoSettings: SeoSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoSettings.organizationName,
    url: normalizeUrl(seoSettings.organizationUrl),
    logo: seoSettings.organizationLogo,
    contactPoint: {
      "@type": "ContactPoint",
      email: seoSettings.contactEmail,
      telephone: seoSettings.contactPhone,
      contactType: "customer service",
    },
    sameAs: seoSettings.organizationSocialLinks?.length
      ? seoSettings.organizationSocialLinks.map((link) => link.url)
      : [
          "https://www.instagram.com/weplanify",
          "https://www.tiktok.com/@weplanify",
        ],
  };
}

/**
 * Website JSON-LD schema
 */
export function generateWebsiteSchema(seoSettings: SeoSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoSettings.siteName,
    url: normalizeUrl(seoSettings.siteUrl),
    description: seoSettings.defaultDescription,
    publisher: {
      "@type": "Organization",
      name: seoSettings.organizationName,
      logo: {
        "@type": "ImageObject",
        url: seoSettings.organizationLogo,
      },
    },
  };
}
