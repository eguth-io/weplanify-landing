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

    if (!seoSettings) {
      return null;
    }

    const organizationSchema = generateOrganizationSchema(seoSettings);
    const websiteSchema = generateWebsiteSchema(seoSettings);

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
