import { MetadataRoute } from "next";
import { SEO_SETTINGS } from "@/lib/site-content";
import { destinations } from "@/lib/destinations/data";
import { fetchAllDestinationSlugs } from "@/lib/destinations/api";
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
    const seoSettings = SEO_SETTINGS;
    const siteUrl = seoSettings?.siteUrl || "https://www.weplanify.com";

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
    const useCasePages = ["trip-with-friends", "ai-trip-planner", "bachelorette-trip", "birthday-trip", "family-trip", "road-trip", "team-building", "school-trip", "events", "oktoberfest-2026-trip-planner", "christmas-markets-2026-trip-planner", "ski-season-2027-trip-planner", "solar-eclipse-2027-trip-planner", "rugby-world-cup-2027-trip-planner", "world-cup-2026-trip-planner", "champions-league-final-2026-psg-arsenal", "hellfest-2026-trip-planner", "tomorrowland-2026-trip-planner", "solar-eclipse-2026-trip-planner", "ultra-europe-2026-trip-planner", "alternatives", "alternatives/wanderlog", "alternatives/squadtrip", "alternatives/tripit", "alternatives/cruzmi", "alternatives/best-group-trip-planner-apps", "alternatives/stippl", "alternatives/splitwise"];
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

    // API-driven destination mini-guides: one slug shared across all 8 locales
    // (no localized slug), so the whole hreflang cluster is the same URL path.
    // Degrades to [] when the backend is unreachable, so the sitemap never
    // fails. Skip any slug already covered by a hardcoded destination above to
    // avoid duplicate <url> entries.
    const hardcodedSlugs = new Set(
      destinations.flatMap((d) => [d.slug.en, d.slug.fr])
    );
    const apiSlugs = await fetchAllDestinationSlugs();
    for (const slug of apiSlugs) {
      if (hardcodedSlugs.has(slug)) continue;
      pushLocalized((locale) => `/${locale}/destinations/${slug}`, {
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.85,
      });
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
