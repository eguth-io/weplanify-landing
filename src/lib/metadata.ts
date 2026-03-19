import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

const SITE_URL = "https://www.weplanify.com";

const localizedDefaults: Record<string, { title: string; description: string; keywords: string[] }> = {
  en: {
    title: "WePlanify — Free Group Trip Planner | Plan Together",
    description:
      "Plan group trips together with WePlanify. Collaborative itinerary builder, shared budget tracker, group polls & packing lists. Free group travel planning app.",
    keywords: [
      "group trip planner",
      "plan trip with friends",
      "collaborative travel app",
      "group travel itinerary",
      "travel planning app",
      "group vacation planner",
      "shared trip planner",
      "trip planner for groups",
    ],
  },
  fr: {
    title: "WePlanify — Organisateur de Voyage de Groupe Gratuit | Planifiez Ensemble",
    description:
      "Organisez vos voyages de groupe avec WePlanify. Itinéraire collaboratif, budget partagé, sondages de groupe et listes de bagages. Application gratuite de planification de voyage.",
    keywords: [
      "organisateur voyage groupe",
      "planifier voyage entre amis",
      "application voyage collaboratif",
      "itinéraire voyage groupe",
      "planification voyage",
      "organiser voyage groupe",
      "planificateur voyage partagé",
      "voyage entre amis",
    ],
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
      keywords: localized.keywords,
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
        locale: locale === "fr" ? "fr_FR" : "en_US",
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
        languages: {
          en: `${baseUrl}/en${pathname}`,
          fr: `${baseUrl}/fr${pathname}`,
          "x-default": `${baseUrl}/en${pathname}`,
        },
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
    keywords: localized.keywords,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
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
      languages: {
        en: `${SITE_URL}/en${pathname}`,
        fr: `${SITE_URL}/fr${pathname}`,
        "x-default": `${SITE_URL}/en${pathname}`,
      },
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
    sameAs: seoSettings.organizationSocialLinks?.map((link) => link.url) || [],
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
