import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
} from "@/lib/metadata";

/**
 * Composant StructuredData - Ajoute les données structurées JSON-LD pour le SEO
 * Génère les schémas Organization et Website automatiquement depuis Sanity
 */
export async function StructuredData() {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

    const fallbackSettings: SeoSettings = {
      siteName: "WePlanify",
      defaultTitle: "WePlanify — Free Group Trip Planner | Plan Together",
      titleTemplate: "%s | WePlanify",
      defaultDescription: "Free collaborative group trip planner. Plan itineraries together, vote with group polls, track shared budgets.",
      keywords: ["group trip planner", "collaborative travel app"],
      language: "en",
      ogImage: "",
      ogType: "website",
      twitterCard: "summary_large_image",
      organizationName: "WePlanify",
      organizationLogo: "https://www.weplanify.com/logo.svg",
      organizationUrl: "https://www.weplanify.com",
      organizationSocialLinks: [],
      siteUrl: "https://www.weplanify.com",
      robotsSettings: { allowIndexing: true },
      favicon: "/favicon.ico",
      appleTouchIcon: "/apple-touch-icon.png",
      manifest: { themeColor: "#f6391a", backgroundColor: "#ffffff" },
    } as SeoSettings;

    const settings = seoSettings || fallbackSettings;

    const organizationSchema = generateOrganizationSchema(settings);
    const websiteSchema = generateWebsiteSchema(settings);

    return (
      <>
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </>
    );
  } catch (error) {
    console.error("Error generating structured data:", error);
    return null;
  }
}
