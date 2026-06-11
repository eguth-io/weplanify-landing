import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";
import { destinations } from "@/lib/destinations/data";
import { countryGuides } from "@/lib/travel-guides/data";
// WP-92: the sitemap only submits en/fr. The other 6 locales are served and
// hreflang'd, but submitting all 8 (512 URLs) buried the en/fr pages Google
// should crawl first (61 of them stuck in "Discovered - currently not
// indexed"). Re-add a locale here once it has its own long-form content.
const locales = ["en", "fr"] as const;

// Stable fallback for pages without a real modification date. A `new Date()`
// lastmod on every entry made the field meaningless to Google; bump this when
// shipping a sweeping content change.
const STATIC_LAST_MODIFIED = new Date("2026-06-11");
const featureSlugs = [
  "planning",
  "budget",
  "collaboration",
  "explore",
  "itinerary",
  "packing",
  "polls",
  "transport",
  "memories",
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
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 1,
      });
    }

    // Use case pages for each locale
    const useCasePages = ["trip-with-friends", "bachelorette-trip", "birthday-trip", "family-trip", "road-trip", "team-building", "school-trip", "events", "world-cup-2026-trip-planner", "champions-league-final-2026-psg-arsenal", "hellfest-2026-trip-planner", "tomorrowland-2026-trip-planner", "solar-eclipse-2026-trip-planner", "ultra-europe-2026-trip-planner", "alternatives", "alternatives/wanderlog", "alternatives/squadtrip", "alternatives/tripit", "alternatives/cruzmi", "alternatives/best-group-trip-planner-apps", "alternatives/stippl"];
    for (const locale of locales) {
      for (const page of useCasePages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.9,
        });
      }
    }

    // Guide & hardcoded blog pages for each locale
    const guidePages = [
      "guides/plan-group-trip",
      "blog/organiser-evjf",
      "blog/group-trip-budget",
    ];
    for (const locale of locales) {
      for (const page of guidePages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.8,
        });
      }
    }

    // Static pages for each locale
    const staticPages = ["blog", "faq", "contact", "partnership", "about", "privacy-policy"];
    for (const locale of locales) {
      for (const page of staticPages) {
        entries.push({
          url: `${siteUrl}/${locale}/${page}`,
          lastModified: STATIC_LAST_MODIFIED,
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
          lastModified: STATIC_LAST_MODIFIED,
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
          lastModified: post.publishedAt ? new Date(post.publishedAt) : STATIC_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }

    // Destinations: index + one entry per (locale, localized slug).
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/destinations`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.85,
      });
      // Destination/guide content (and their localized slugs) only exist in en/fr;
      // other locales render the en fallback, so they reuse the en slug.
      const contentLocale = locale === "fr" ? "fr" : "en";
      for (const d of destinations) {
        entries.push({
          url: `${siteUrl}/${locale}/destinations/${d.slug[contentLocale]}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.85,
        });
      }
    }

    // Travel guides: index + one entry per (locale, localized country slug).
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}/travel-guides`,
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.85,
      });
      const contentLocale = locale === "fr" ? "fr" : "en";
      for (const g of countryGuides) {
        entries.push({
          url: `${siteUrl}/${locale}/travel-guides/${g.slug[contentLocale]}`,
          lastModified: STATIC_LAST_MODIFIED,
          changeFrequency: "monthly",
          priority: 0.85,
        });
      }
    }

    return entries;
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return [
      {
        url: "https://www.weplanify.com/en",
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://www.weplanify.com/fr",
        lastModified: STATIC_LAST_MODIFIED,
        changeFrequency: "weekly",
        priority: 1,
      },
    ];
  }
}
