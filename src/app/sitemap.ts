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

    // Fetch blog post slugs for sitemap
    const blogPosts: { slug: string; publishedAt: string }[] = await client.fetch(
      `*[_type == "blogPost"]{ "slug": slug.current, publishedAt }`
    );

    const blogEntries = blogPosts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

    return [
      {
        url: siteUrl,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}/blog`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${siteUrl}/faq`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      },
      {
        url: `${siteUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      ...blogEntries,
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
