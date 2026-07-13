/**
 * Public destinations API client.
 *
 * The backend exposes a read-only public endpoint returning destination
 * "mini-guides" in the 8 content locales. Content is fetched server-side at
 * build / ISR time (24h revalidate). Every function degrades to empty/null on
 * error so `next build` never fails when the API is briefly down.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "https://api.weplanify.com";

// One day, in seconds — pages are statically generated and revalidated daily.
const REVALIDATE_SECONDS = 86400;

export type DestinationImage = {
  url: string;
  thumb_url: string | null;
  attribution: {
    name: string | null;
    username: string | null;
  };
};

export type DestinationListItem = {
  /** Slug — the id used in the URL. */
  id: string;
  city: string;
  country: string | null;
  country_alpha2: string | null;
  flag: string | null;
  tagline: string | null;
  badge: string | null;
  badge_label: string | null;
  tags: string[];
  tag_labels: string[];
  latitude: number | null;
  longitude: number | null;
  cover: DestinationImage | null;
};

export type DestinationHighlight = {
  title: string;
  description: string;
  category: string | null;
  category_label: string | null;
  emoji: string | null;
  image: DestinationImage | null;
};

export type DestinationSection = {
  title: string;
  description: string;
};

export type DestinationItineraryDay = {
  day: number;
  title: string;
  description: string;
};

export type DestinationFacts = {
  currency_code: string | null;
  currency_symbol: string | null;
  languages: string[];
  plug_types: string[];
  voltage: string | null;
  driving_side: string | null;
  emergency_number: string | null;
};

/**
 * AI-estimated per-person, per-day budget in three tiers (local currency).
 * Covers accommodation, food, local transport and activities — not flights.
 * Null when the backend hasn't generated it yet for this locale.
 */
export type DestinationEstimatedBudget = {
  currency: string | null;
  currency_symbol: string | null;
  per_day: {
    budget: number;
    mid: number;
    comfort: number;
  };
  note: string | null;
};

export type DestinationGuide = DestinationListItem & {
  description: string | null;
  highlights: DestinationHighlight[];
  neighbourhoods: DestinationSection[];
  food: DestinationSection[];
  best_time: string | null;
  getting_around: string | null;
  itinerary: DestinationItineraryDay[];
  local_tips: string[];
  facts: DestinationFacts;
  estimated_budget: DestinationEstimatedBudget | null;
};

/**
 * Fetch the published destinations list for a given locale.
 * Returns [] on any error (never throws).
 */
export async function fetchPublishedDestinations(
  locale: string
): Promise<DestinationListItem[]> {
  try {
    const res = await fetch(`${API_BASE}/api/public/destinations`, {
      headers: { "X-Locale": locale, Accept: "application/json" },
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: DestinationListItem[] };
    return json.data ?? [];
  } catch {
    return [];
  }
}

/**
 * Fetch a single destination guide by slug for a given locale.
 * Returns null on 404 or any error (never throws).
 */
export async function fetchDestinationGuide(
  slug: string,
  locale: string
): Promise<DestinationGuide | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/public/destinations/${encodeURIComponent(slug)}`,
      {
        headers: { "X-Locale": locale, Accept: "application/json" },
        next: { revalidate: REVALIDATE_SECONDS },
      }
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { data?: DestinationGuide };
    return json.data ?? null;
  } catch {
    return null;
  }
}

/**
 * Slugs to statically generate — derived from the EN list.
 * Returns [] on error (never throws).
 */
export async function fetchAllDestinationSlugs(): Promise<string[]> {
  const items = await fetchPublishedDestinations("en");
  return items.map((item) => item.id);
}
