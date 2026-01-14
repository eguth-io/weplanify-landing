import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

/**
 * Génère le sitemap.xml dynamiquement
 * Tu pourras ajouter d'autres pages dynamiquement plus tard (blog, destinations, etc.)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);
    const siteUrl = seoSettings?.siteUrl || "https://weplanify.com";

    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      // Tu peux ajouter d'autres pages ici plus tard
      // Par exemple, si tu as un blog ou des pages de destinations :
      // {
      //   url: `${siteUrl}/about`,
      //   lastModified: new Date(),
      //   changeFrequency: "monthly",
      //   priority: 0.8,
      // },
    ];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: "https://weplanify.com",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
