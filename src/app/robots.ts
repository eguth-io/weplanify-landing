import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

/**
 * Génère le robots.txt dynamiquement depuis Sanity
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

    const allowIndexing = seoSettings?.robotsSettings?.allowIndexing ?? true;
    const siteUrl = seoSettings?.siteUrl || "https://weplanify.com";

    return {
      rules: {
        userAgent: "*",
        allow: allowIndexing ? "/" : undefined,
        disallow: allowIndexing ? undefined : "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    // Fallback robots.txt
    return {
      rules: {
        userAgent: "*",
        allow: "/",
      },
      sitemap: "https://weplanify.com/sitemap.xml",
    };
  }
}
