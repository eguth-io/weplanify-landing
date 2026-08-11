"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import CountryFilter from "@/components/destinations/CountryFilter";
import { normalizeText } from "@/lib/normalize-text";

export type ExplorerItem = {
  /** Unique key and search target. */
  id: string;
  href: string;
  city: string;
  /** Null for the editorial regions (Tuscany, Andalusia) — they span cities. */
  country: string | null;
  flag: string | null;
  tagline: string | null;
  image: string | null;
  imageAlt: string;
  /** Extra pills on the card, e.g. "7 days" or the use case. */
  badges: string[];
  /** Headline budget, when we have one: shown as a figure, not a pill. */
  budget: { amount: string; caption: string } | null;
  /** Filter keys this item matches — API tags and/or a use case. */
  tags: string[];
  /** Link wording: a curated itinerary and a city guide promise different things. */
  cta: string;
};

export type ExplorerLabels = {
  searchPlaceholder: string;
  allCountries: string;
  /**
   * Result noun per CLDR plural category ("one", "few", "other"…). The count is
   * only known in the browser, so the page cannot pick the form for us, and
   * shipping the whole namespace to the client just for this would cost more
   * than the catalogue this page deliberately keeps server-side.
   */
  results: Record<string, string>;
  countryEmpty: string;
  noResults: string;
  noResultsBody: string;
  reset: string;
};

type Props = {
  items: ExplorerItem[];
  /** Chips to offer, in display order. Labels are already translated. */
  tagOptions: Array<{ key: string; label: string }>;
  locale: string;
  labels: ExplorerLabels;
};

/**
 * The whole destinations index: search, country and tag filters over one grid.
 *
 * The page used to be four editorial rails followed by a hundred-plus card
 * grid — several screens of scrolling with no way to reach a given place. Both
 * sources now feed this one list, so the curated itineraries stay linked from
 * the index (they carry their use case as a chip) instead of being dropped.
 *
 * Filtering happens in the browser on the already-loaded list: it keeps every
 * card in the server HTML — so all the guide links stay crawlable — and reacts
 * instantly, which a server round trip per keystroke would not.
 */
export default function DestinationExplorer({
  items,
  tagOptions,
  locale,
  labels,
}: Props) {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  // Countries actually present, alphabetical, with how many cities each holds.
  const countries = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      if (!item.country) continue;
      counts.set(item.country, (counts.get(item.country) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) =>
      a[0].localeCompare(b[0], locale),
    );
  }, [items, locale]);

  const filtered = useMemo(() => {
    const needle = normalizeText(query.trim());
    return items.filter((item) => {
      if (country && item.country !== country) return false;
      // Every selected tag must match: chips narrow the list rather than widen it.
      if (tags.length > 0 && !tags.every((tag) => item.tags.includes(tag))) {
        return false;
      }
      if (!needle) return true;
      const haystack = normalizeText(
        [item.city, item.country ?? "", item.tagline ?? ""].join(" "),
      );
      return haystack.includes(needle);
    });
  }, [items, query, country, tags]);

  const hasFilters = query !== "" || country !== "" || tags.length > 0;

  const resultsLabel = useMemo(() => {
    const category = new Intl.PluralRules(locale).select(filtered.length);
    return labels.results[category] ?? labels.results.other;
  }, [filtered.length, labels.results, locale]);

  function toggleTag(tag: string) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );
  }

  function reset() {
    setQuery("");
    setCountry("");
    setTags([]);
  }

  return (
    <div>
      {/* Filter bar — sticks under the nav so it stays reachable while scrolling */}
      <div className="sticky top-[78px] lg:top-[98px] z-30 mb-8">
        <div className="bg-white/95 backdrop-blur-sm border border-[#001E13]/10 rounded-3xl shadow-sm p-4">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
            <label className="flex-1 relative">
              <span className="sr-only">{labels.searchPlaceholder}</span>
              <span
                aria-hidden="true"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#001E13]/40"
              >
                ⌕
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={labels.searchPlaceholder}
                className="w-full font-karla text-base bg-white border border-[#001E13]/15 rounded-full pl-10 pr-4 py-2.5 text-[#001E13] placeholder:text-[#001E13]/40 focus:outline-none focus:border-[#F6391A]"
              />
            </label>

            <CountryFilter
              countries={countries}
              value={country}
              onChange={setCountry}
              labels={{ all: labels.allCountries, empty: labels.countryEmpty }}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {tagOptions.map(({ key, label }) => {
              const active = tags.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => toggleTag(key)}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full text-xs font-karla font-bold border transition-colors ${
                    active
                      ? "bg-[#001E13] text-[#FFFBF5] border-[#001E13]"
                      : "bg-white text-[#001E13] border-[#001E13]/15 hover:border-[#001E13]/40"
                  }`}
                >
                  {label}
                </button>
              );
            })}

            <span className="ml-auto flex items-center gap-3 text-sm font-karla text-[#001E13]/60">
              <span aria-live="polite">
                {filtered.length} {resultsLabel}
              </span>
              {hasFilters && (
                <button
                  type="button"
                  onClick={reset}
                  className="font-bold text-[#F6391A] hover:underline"
                >
                  {labels.reset}
                </button>
              )}
            </span>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl font-londrina-solid text-[#001E13] mb-2">
            {labels.noResults}
          </p>
          <p className="font-karla text-[#001E13]/60 mb-6">
            {labels.noResultsBody}
          </p>
          <button
            type="button"
            onClick={reset}
            className="font-karla font-bold text-[#F6391A] hover:underline"
          >
            {labels.reset}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <Link key={item.id} href={item.href} className="group">
              <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 h-full flex flex-col">
                {item.image && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {item.country && (
                      <span className="bg-[#EEF899] text-[#001E13] px-3 py-1 rounded-full text-xs font-karla font-bold">
                        {item.flag ? `${item.flag} ` : ""}
                        {item.country}
                      </span>
                    )}
                    {item.badges.map((badge) => (
                      <span
                        key={badge}
                        className="bg-[#001E13]/5 text-[#001E13] px-3 py-1 rounded-full text-xs font-karla"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-londrina-solid text-[#001E13] mb-2">
                    {item.city}
                  </h3>
                  {item.tagline && (
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                      {item.tagline}
                    </p>
                  )}
                  <div className="mt-auto">
                    {item.budget && (
                      <div className="flex items-baseline gap-2 pt-4 mb-3 border-t border-[#001E13]/10">
                        <span className="text-2xl font-londrina-solid text-[#001E13] leading-none">
                          {item.budget.amount}
                        </span>
                        <span className="font-karla text-xs text-[#001E13]/55">
                          {item.budget.caption}
                        </span>
                      </div>
                    )}
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                      {item.cta}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
