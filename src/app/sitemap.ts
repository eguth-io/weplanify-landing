import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";
import { destinations } from "@/lib/destinations/data";
import { countryGuides } from "@/lib/travel-guides/data";
import { routing } from "@/i18n/routing";

// Derive sitemap locales from the routing config so adding a language is one place.
const locales = routing.locales;
const xDefaultLocale = routing.defaultLocale;
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

type EntryMeta = Pick<
  MetadataRoute.Sitemap[number],
  "lastModified" | "changeFrequency" | "priority"
>;

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

    // Emit one <url> per locale, each carrying the full hreflang cluster
    // (every locale + x-default) via alternates.languages. This lets Google
    // process the whole language set straight from the sitemap instead of
    // crawling each page first — the lever for the "Discovered, not indexed"
    // backlog on the translated pages.
    // `pathFor` returns the path after siteUrl (with leading slash + locale),
    // so localized slugs (destinations/guides) can vary per locale.
    const pushLocalized = (
      pathFor: (locale: string) => string,
      meta: EntryMeta
    ) => {
      const languages: Record<string, string> = {};
      for (const locale of locales) {
        languages[locale] = `${siteUrl}${pathFor(locale)}`;
      }
      languages["x-default"] = `${siteUrl}${pathFor(xDefaultLocale)}`;

      for (const locale of locales) {
        entries.push({
          url: `${siteUrl}${pathFor(locale)}`,
          ...meta,
          alternates: { languages },
        });
      }
    };

    // Homepage
    pushLocalized((locale) => `/${locale}`, {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    });

    // Use case pages
    const useCasePages = ["trip-with-friends", "bachelorette-trip", "birthday-trip", "family-trip", "road-trip", "team-building", "school-trip", "events", "world-cup-2026-trip-planner", "champions-league-final-2026-psg-arsenal", "hellfest-2026-trip-planner", "tomorrowland-2026-trip-planner", "solar-eclipse-2026-trip-planner", "ultra-europe-2026-trip-planner", "alternatives", "alternatives/wanderlog", "alternatives/squadtrip", "alternatives/tripit", "alternatives/cruzmi", "alternatives/best-group-trip-planner-apps", "alternatives/stippl"];
    for (const page of useCasePages) {
      pushLocalized((locale) => `/${locale}/${page}`, {
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }

    // Guide & hardcoded blog pages
    const guidePages = [
      "guides/plan-group-trip",
      "blog/organiser-evjf",
      "blog/group-trip-budget",
    ];
    for (const page of guidePages) {
      pushLocalized((locale) => `/${locale}/${page}`, {
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // Static pages
    const staticPages = ["blog", "faq", "contact", "partnership", "about", "privacy-policy"];
    for (const page of staticPages) {
      pushLocalized((locale) => `/${locale}/${page}`, {
        lastModified: new Date(),
        changeFrequency: page === "blog" ? "weekly" : "monthly",
        priority: page === "blog" ? 0.8 : 0.7,
      });
    }

    // Feature pages
    for (const slug of featureSlugs) {
      pushLocalized((locale) => `/${locale}/features/${slug}`, {
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // Blog posts
    for (const post of blogPosts) {
      pushLocalized((locale) => `/${locale}/blog/${post.slug}`, {
        lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }

    // Destination/guide content (and their localized slugs) only exist in en/fr;
    // other locales render the en fallback, so they reuse the en slug.
    const contentLocaleFor = (locale: string) => (locale === "fr" ? "fr" : "en");

    // Destinations: index + one entry per localized slug.
    pushLocalized((locale) => `/${locale}/destinations`, {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
    for (const d of destinations) {
      pushLocalized(
        (locale) => `/${locale}/destinations/${d.slug[contentLocaleFor(locale)]}`,
        {
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.85,
        }
      );
    }

    // Travel guides: index + one entry per localized country slug.
    pushLocalized((locale) => `/${locale}/travel-guides`, {
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    });
    for (const g of countryGuides) {
      pushLocalized(
        (locale) => `/${locale}/travel-guides/${g.slug[contentLocaleFor(locale)]}`,
        {
          lastModified: new Date(),
          changeFrequency: "monthly",
          priority: 0.85,
        }
      );
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
