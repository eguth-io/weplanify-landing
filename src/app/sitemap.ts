import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

const locales = ["en", "fr"];
const featureSlugs = [
  "planning",
  "budget",
  "collaboration",
  "explore",
  "itinerary",
  "packing",
  "polls",
  "transport",
];

/**
 * Génère le sitemap.xml dynamiquement avec support i18n
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);
    const siteUrl = seoSettings?.siteUrl || "https://www.weplanify.com";

    // Fetch blog post slugs for sitemap
    const blogPosts: { slug: string; publishedAt: string }[] = await client.fetch(
      `*[_type == "blogPost"]{ "slug": slug.current, publishedAt }`
    );

    const entries: MetadataRoute.Sitemap = [];

    // Homepage for each locale
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    // Use case pages for each locale
    const useCasePages = ["trip-with-friends", "bachelorette-trip", "alternatives", "alternatives/wanderlog", "alternatives/squadtrip", "alternatives/tripit", "alternatives/cruzmi", "alternatives/best-group-trip-planner-apps", "alternatives/stippl"];
    for (const locale of locales) {
      for (const page of useCasePages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.9,
        });
      }
    }

    // Guide pages for each locale
    const guidePages = ["guides/plan-group-trip"];
    for (const locale of locales) {
      for (const page of guidePages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }

    // Static pages for each locale
    const staticPages = ["blog", "faq", "contact"];
    for (const locale of locales) {
      for (const page of staticPages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: new Date(),
          changeFrequency: page === "blog" ? "weekly" : "monthly",
          priority: page === "blog" ? 0.8 : 0.7,
        });
      }
    }

    // Feature pages for each locale
    for (const locale of locales) {
      for (const slug of featureSlugs) {
        entries.push({
          url: `${siteUrl}/${locale}/features/${slug}`,
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }

    // Blog posts for each locale
    for (const locale of locales) {
      for (const post of blogPosts) {
        entries.push({
          url: `${siteUrl}/${locale}/blog/${post.slug}`,
          lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }

    return entries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: "https://www.weplanify.com/en",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://www.weplanify.com/fr",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
