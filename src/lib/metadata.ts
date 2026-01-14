import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

/**
 * Génère les metadata Next.js depuis les SEO Settings de Sanity
 */
export async function generateMetadataFromSanity(): Promise<Metadata> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

    if (!seoSettings) {
      console.warn("SEO Settings not found in Sanity, using defaults");
      return getDefaultMetadata();
    }

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
        locale: seoSettings.language || "fr_FR",
        url: seoSettings.siteUrl || "https://weplanify.com",
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
        icon: seoSettings.favicon || "/favicon.ico",
        apple: seoSettings.appleTouchIcon || "/apple-touch-icon.png",
      },

      // Manifest
      manifest: "/manifest.json",

      // Theme Color
      themeColor: seoSettings.manifest?.themeColor || "#f6391a",

      // Verification (si tu as des codes de vérification Google/Bing)
      // verification: {
      //   google: "your-google-verification-code",
      //   yandex: "your-yandex-verification-code",
      // },

      // Alternate languages (si tu as plusieurs langues)
      alternates: {
        canonical: seoSettings.siteUrl || "https://weplanify.com",
      },

      // App Links (si tu as une app mobile)
      // appLinks: {
      //   ios: {
      //     url: "https://apps.apple.com/app/weplanify",
      //     app_store_id: "app-store-id",
      //   },
      //   android: {
      //     package: "com.weplanify.app",
      //     url: "https://play.google.com/store/apps/details?id=com.weplanify.app",
      //   },
      // },
    };

    return metadata;
  } catch (error) {
    console.error("Error fetching SEO settings from Sanity:", error);
    return getDefaultMetadata();
  }
}

/**
 * Metadata par défaut en cas d'erreur
 */
function getDefaultMetadata(): Metadata {
  return {
    title: {
      default: "WePlanify - Votre assistant voyage IA",
      template: "%s | WePlanify",
    },
    description:
      "Planifiez vos voyages en toute simplicité avec WePlanify, votre assistant personnel alimenté par l'IA.",
    keywords: ["voyage", "planification", "IA", "assistant voyage", "itinéraire"],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "WePlanify",
      title: "WePlanify - Votre assistant voyage IA",
      description:
        "Planifiez vos voyages en toute simplicité avec WePlanify, votre assistant personnel alimenté par l'IA.",
    },
    twitter: {
      card: "summary_large_image",
      title: "WePlanify - Votre assistant voyage IA",
      description:
        "Planifiez vos voyages en toute simplicité avec WePlanify, votre assistant personnel alimenté par l'IA.",
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
