import { SEO_SETTINGS } from "@/lib/site-content";
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
    // The CMS document always existed, so the old `|| fallbackSettings`
    // branch was dead — including its Instagram/TikTok links, which were
    // therefore never emitted. Behaviour preserved: no `sameAs` for now.
    const settings = SEO_SETTINGS;

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
