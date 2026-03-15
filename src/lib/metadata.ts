import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

/**
 * Génère les metadata Next.js depuis les SEO Settings de Sanity
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

    const baseUrl = seoSettings.siteUrl || "https://weplanify.com";
    const currentUrl = `${baseUrl}/${locale}${pathname}`;

    const metadata: Metadata = {
      title: {
        default: seoSettings.defaultTitle || "WePlanify",
        template: seoSettings.titleTemplate || "%s | WePlanify",
      },
      description: seoSettings.defaultDescription || "",
      keywords: seoSettings.keywords || [],
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
        title: seoSettings.defaultTitle || "WePlanify",
        description: seoSettings.defaultDescription || "",
        images: seoSettings.ogImage
          ? [
              {
                url: seoSettings.ogImage,
                width: 1200,
                height: 630,
                alt: seoSettings.defaultTitle || "WePlanify",
              },
            ]
          : [],
      },

      // Twitter
      twitter: {
        card: seoSettings.twitterCard || "summary_large_image",
        site: seoSettings.twitterHandle || undefined,
        creator: seoSettings.twitterHandle || undefined,
        title: seoSettings.defaultTitle || "WePlanify",
        description: seoSettings.defaultDescription || "",
        images: seoSettings.ogImage ? [seoSettings.ogImage] : [],
      },

      // Icons
      icons: {
        icon: seoSettings.favicon || "/icon.svg",
        apple: seoSettings.appleTouchIcon || "/apple-icon.png",
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
 * Metadata par défaut en cas d'erreur
 */
function getDefaultMetadata(locale: string = "en", pathname: string = ""): Metadata {
  const baseUrl = "https://weplanify.com";
  const currentUrl = `${baseUrl}/${locale}${pathname}`;

  return {
    title: {
      default: "WePlanify — Free Group Trip Planner | Plan Together",
      template: "%s | WePlanify",
    },
    description:
      "Plan group trips together with WePlanify. Collaborative itinerary builder, shared budget tracker, group polls & packing lists. Free group travel planning app.",
    keywords: ["group trip planner", "plan trip with friends", "collaborative travel app", "group travel itinerary", "travel planning app", "group vacation planner", "shared trip planner", "trip planner for groups"],
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: "WePlanify — Free Group Trip Planner | Plan Together",
      description:
        "Plan group trips together with WePlanify. Collaborative itinerary builder, shared budget tracker, group polls & packing lists. Free group travel planning app.",
    },
    twitter: {
      card: "summary_large_image",
      title: "WePlanify — Free Group Trip Planner | Plan Together",
      description:
        "Plan group trips together with WePlanify. Collaborative itinerary builder, shared budget tracker, group polls & packing lists. Free group travel planning app.",
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en${pathname}`,
        fr: `${baseUrl}/fr${pathname}`,
        "x-default": `${baseUrl}/en${pathname}`,
      },
    },
  };
}

/**
 * Génère le JSON-LD pour les données structurées Organization
 */
export function generateOrganizationSchema(seoSettings: SeoSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: seoSettings.organizationName,
    url: seoSettings.organizationUrl,
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
 * Génère le JSON-LD pour les données structurées Website
 */
export function generateWebsiteSchema(seoSettings: SeoSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seoSettings.siteName,
    url: seoSettings.siteUrl,
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
