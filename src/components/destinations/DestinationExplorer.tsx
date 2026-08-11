"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { DestinationListItem } from "@/lib/destinations/api";

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
  noResults: string;
  noResultsBody: string;
  reset: string;
  cardCta: string;
};

type Props = {
  items: DestinationListItem[];
  locale: string;
  labels: ExplorerLabels;
};

/** Lowercase and strip accents so "malaga" matches "Málaga". */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Browsable list of the API destinations: search, country and tag filters.
 *
 * The list grew past a hundred cities, which as a plain grid was several
 * screens of scrolling with no way to get to a given place. Filtering happens
 * in the browser on the already-loaded list: it keeps every card in the server
 * HTML — so all the guide links stay crawlable — and reacts instantly, which a
 * server round trip per keystroke would not.
 */
export default function DestinationExplorer({ items, locale, labels }: Props) {
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
    return [...counts.entries()].sort((a, b) => a[0].localeCompare(b[0], locale));
  }, [items, locale]);

  // Tags come from the API already translated; keep the key for the filter and
  // the label for the chip. Most common first — that is the useful order here.
  const availableTags = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>();
    for (const item of items) {
      item.tags?.forEach((tag, index) => {
        const existing = counts.get(tag);
        if (existing) {
          existing.count += 1;
        } else {
          counts.set(tag, { label: item.tag_labels?.[index] ?? tag, count: 1 });
        }
      });
    }
    return [...counts.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([tag, { label }]) => ({ tag, label }));
  }, [items]);

  const filtered = useMemo(() => {
    const needle = normalize(query.trim());
    return items.filter((item) => {
      if (country && item.country !== country) return false;
      // Every selected tag must match: chips narrow the list rather than widen it.
      if (tags.length > 0 && !tags.every((tag) => item.tags?.includes(tag))) {
        return false;
      }
      if (!needle) return true;
      const haystack = normalize(
        [item.city, item.country ?? "", item.tagline ?? ""].join(" ")
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
        : [...current, tag]
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
      <div className="sticky top-[72px] z-20 -mx-4 lg:-mx-8 px-4 lg:px-8 py-4 bg-[#FFFBF5]/95 backdrop-blur-sm border-b border-[#001E13]/10 mb-8">
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

          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            aria-label={labels.allCountries}
            className="font-karla text-base bg-white border border-[#001E13]/15 rounded-full px-4 py-2.5 text-[#001E13] focus:outline-none focus:border-[#F6391A] lg:w-64"
          >
            <option value="">{labels.allCountries}</option>
            {countries.map(([name, count]) => (
              <option key={name} value={name}>
                {name} ({count})
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {availableTags.map(({ tag, label }) => {
            const active = tags.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
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
            <Link
              key={item.id}
              href={`/${locale}/destinations/${item.id}`}
              className="group"
            >
              <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 h-full flex flex-col">
                {item.cover && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={item.cover.url}
                      alt={item.city}
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
                  </div>
                  <h3 className="text-2xl font-londrina-solid text-[#001E13] mb-2">
                    {item.city}
                  </h3>
                  {item.tagline && (
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                      {item.tagline}
                    </p>
                  )}
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-auto">
                    {labels.cardCta}
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
