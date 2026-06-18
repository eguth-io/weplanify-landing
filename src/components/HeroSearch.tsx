'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  MapPin,
  CalendarDays,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { trackEvent } from '@/lib/tracking';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.weplanify.com';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.weplanify.com';
// Public Mapbox token (pk.*, exposed client-side). Hardcoded fallback because
// NEXT_PUBLIC_MAPBOX_TOKEN is only set in Vercel's Development env — same
// convention as APP_URL/API_URL above.
const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN ||
  'pk.eyJ1IjoidGhlb2d1IiwiYSI6ImNtOWVxMXpzNzBxNjcycXM1eDhxMm03bmcifQ.GOt3xdrm4HGPX4ArqJGoRg';

interface HeroData {
  affiliateTag?: string | null;
  backgroundImage?: string | null;
}

interface Props {
  hero: HeroData;
  locale: string;
  variant: 'ai' | 'search';
}

interface Suggestion {
  id: string;
  name: string;
  context: string;
  latitude: number | null;
  longitude: number | null;
  country: string | null;
  countryCode: string | null;
}

interface MapboxFeature {
  id: string;
  text: string;
  place_name: string;
  center?: [number, number];
  properties?: { short_code?: string };
  context?: { id: string; text: string; short_code?: string }[];
}

// BCP-47 locales for date formatting (calendar month names + range).
const INTL_LOCALES: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  de: 'de-DE',
  es: 'es-ES',
  it: 'it-IT',
  pl: 'pl-PL',
  pt: 'pt-PT',
  zh: 'zh-CN',
};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

export default function HeroSearch({ hero, locale, variant }: Props) {
  const t = useTranslations('heroSearch');
  const intlLocale = INTL_LOCALES[locale] ?? 'en-US';

  // --- Destinations (multi-stop / road trip) ---
  const [query, setQuery] = useState('');
  // Single-trip destination kept in the bar; chips (`destinations`) only appear
  // once the user explicitly turns it into a road trip via "+".
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [destinations, setDestinations] = useState<Suggestion[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [destOpen, setDestOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const destRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Skip the next autocomplete fetch — set when we fill the bar programmatically
  // (picking a destination) so it doesn't re-search the chosen name and reopen.
  const skipSearch = useRef(false);

  // --- Date range ---
  const today = useMemo(() => startOfDay(new Date()), []);
  const [start, setStart] = useState<Date | null>(null);
  const [end, setEnd] = useState<Date | null>(null);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateFocus, setDateFocus] = useState<'start' | 'end'>('start');
  const [viewMonth, setViewMonth] = useState<Date>(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const dateRef = useRef<HTMLDivElement>(null);

  function openDates(focus: 'start' | 'end') {
    setDateFocus(focus === 'end' && !start ? 'start' : focus);
    setDateOpen(true);
  }

  // Close popovers on outside click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (destRef.current && !destRef.current.contains(e.target as Node)) setDestOpen(false);
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) setDateOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Debounced Mapbox geocoding autocomplete.
  useEffect(() => {
    if (skipSearch.current) {
      skipSearch.current = false;
      setSuggestions([]);
      setDestOpen(false);
      return;
    }
    const q = query.trim();
    if (q.length < 2 || !MAPBOX_TOKEN) {
      setSuggestions([]);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const url =
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json` +
          `?types=place,region,country&limit=5&language=${locale}&access_token=${MAPBOX_TOKEN}`;
        const res = await fetch(url);
        const data = await res.json();
        if (cancelled) return;
        const items: Suggestion[] = (data.features || []).map((f: MapboxFeature) => {
          // For a country result the feature itself carries the code; for a
          // city/region it's in the `country.*` context entry.
          const countryCtx = f.id.startsWith('country.')
            ? { text: f.text, short_code: f.properties?.short_code }
            : f.context?.find((c) => c.id.startsWith('country.'));
          return {
            id: f.id,
            name: f.text,
            context: f.place_name,
            latitude: Array.isArray(f.center) ? f.center[1] : null,
            longitude: Array.isArray(f.center) ? f.center[0] : null,
            country: countryCtx?.text ?? null,
            countryCode: countryCtx?.short_code ? countryCtx.short_code.toUpperCase() : null,
          };
        });
        setSuggestions(items);
        setDestOpen(items.length > 0);
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 250);
    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [query, locale]);

  // Picking a destination: in single-trip mode it just fills the bar (no chip);
  // once it's already a road trip, each pick appends as the next stop.
  function addPlace(s: Suggestion) {
    setSuggestions([]);
    setDestOpen(false);
    if (destinations.length > 0) {
      setDestinations((prev) => (prev.some((p) => p.id === s.id) ? prev : [...prev, s]));
      setQuery('');
      inputRef.current?.focus();
    } else {
      skipSearch.current = true;
      setSelected(s);
      setQuery(s.name);
    }
  }

  // "+" — promote the single chosen destination to the first stop of a road trip.
  function promoteToRoadTrip() {
    if (!selected) return;
    setDestinations([selected]);
    setSelected(null);
    setQuery('');
    setSuggestions([]);
    setDestOpen(false);
    inputRef.current?.focus();
  }

  function removePlace(id: string) {
    setDestinations((prev) => prev.filter((p) => p.id !== id));
  }

  // Calendar grid for the displayed month (week starts Monday).
  const grid = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Mon=0
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < firstWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d));
    return cells;
  }, [viewMonth]);

  // Calendar navigation — never let the view land before the current month.
  const monthFloor = new Date(today.getFullYear(), today.getMonth(), 1);
  const atFloor = viewMonth.getTime() === monthFloor.getTime();
  function shiftView(months: number) {
    setViewMonth((m) => {
      const next = new Date(m.getFullYear(), m.getMonth() + months, 1);
      return next < monthFloor ? monthFloor : next;
    });
  }

  function pickDay(d: Date) {
    if (dateFocus === 'start') {
      setStart(d);
      if (end && d >= end) setEnd(null);
      setDateFocus('end');
    } else if (!start || d < start) {
      // Picking an "end" earlier than start re-anchors the start instead.
      setStart(d);
      setEnd(null);
      setDateFocus('end');
    } else {
      setEnd(d);
      setDateFocus('start');
      setDateOpen(false);
    }
  }

  const fmt = (d: Date) => d.toLocaleDateString(intlLocale, { day: 'numeric', month: 'short' });

  const inRange = (d: Date) => Boolean(start && end && d >= start && d <= end);
  const isEdge = (d: Date) =>
    Boolean((start && d.getTime() === start.getTime()) || (end && d.getTime() === end.getTime()));

  async function submit() {
    if (submitting) return;

    // Road trip → the chips; single trip → the destination in the bar.
    const picked = destinations.length > 0 ? destinations : selected ? [selected] : [];
    const stops = picked.map((d) => ({
      name: d.name,
      latitude: d.latitude,
      longitude: d.longitude,
      country: d.country,
      country_code: d.countryCode,
    }));
    const trailing = query.trim();
    if (trailing && !stops.some((s) => s.name === trailing)) {
      stops.push({ name: trailing, latitude: null, longitude: null, country: null, country_code: null });
    }
    if (stops.length === 0) {
      inputRef.current?.focus();
      return;
    }

    trackEvent('hero_search_submit', {
      destination: stops.map((s) => s.name).join(' → '),
      stops: stops.length,
      hasDates: Boolean(start && end),
      locale: locale,
    });

    const startISO = start ? toISO(start) : null;
    const endISO = end ? toISO(end) : null;
    setSubmitting(true);

    try {
      const res = await fetch(`${API_URL}/api/public/trip-preview/from-search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ destinations: stops, start: startISO, end: endISO, locale: locale }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const token = (await res.json())?.token as string | undefined;
      const params = new URLSearchParams({ utm_source: 'hero_search', hero_variant: variant });
      if (token) params.set('pitch', token);
      window.location.href = `${APP_URL}/register?${params.toString()}`;
    } catch {
      // Never leave the click as a dead end: if the preview API is unreachable,
      // fall back to register with the raw destinations as query params.
      const params = new URLSearchParams({ utm_source: 'hero_search', hero_variant: variant });
      stops.forEach((s) => params.append('destination', s.name));
      if (startISO) params.set('start', startISO);
      if (endISO) params.set('end', endISO);
      window.location.href = `${APP_URL}/register?${params.toString()}`;
    }
  }

  return (
    <div id="hero" className="pt-[100px] lg:pt-[120px] px-4 lg:px-8 pb-4 lg:pb-6">
      <div className="max-w-[1536px] mx-auto">
        {/* No overflow-hidden here: the date/destination popovers must escape the
            hero bounds. The rounded image is clipped by its own layer below. */}
        <section className="relative rounded-[24px] lg:rounded-[40px]">
          <div className="absolute inset-0 z-0 overflow-hidden rounded-[24px] lg:rounded-[40px]">
            <Image
              src="/header-bg-mobile.webp"
              alt={t('title')}
              fill
              sizes="100vw"
              className="object-cover lg:hidden"
              priority
              fetchPriority="high"
            />
            <Image
              src={hero.backgroundImage || '/header-bg.webp'}
              alt={t('title')}
              fill
              sizes="100vw"
              className="object-cover hidden lg:block"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 w-full min-h-[480px] lg:min-h-[600px] flex flex-col items-center justify-center text-center px-4 lg:px-8 py-12 lg:py-16">
            <div className="font-nanum-pen text-[#EEF899] text-xl lg:text-2xl mb-3 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
              {t('affiliate')}
            </div>
            <h1 className="text-[#FFFBF5] text-4xl lg:text-6xl xl:text-[64px] font-londrina-solid leading-[1.05] max-w-4xl mb-4 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
              {t('title')}
            </h1>
            <p className="text-[#FFFBF5]/90 font-karla text-base lg:text-lg leading-relaxed max-w-2xl mb-8 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
              {t('subtitle')}
            </p>

            {/* Search card */}
            <div className="w-full max-w-4xl bg-[#FFFBF5] rounded-3xl lg:rounded-full shadow-2xl p-2 flex flex-col lg:flex-row items-stretch gap-1">
              {/* Destination */}
              <div ref={destRef} className="relative flex-[1.3] min-w-0">
                <div className="flex items-center gap-3 px-5 py-3 rounded-2xl lg:rounded-full hover:bg-black/[0.03] transition-colors h-full">
                  <MapPin className="w-5 h-5 text-orange shrink-0" />
                  <div className="flex flex-col items-start text-left w-full min-w-0">
                    <span className="text-[10px] font-karla font-bold uppercase tracking-[0.12em] text-[#001E13]/45">
                      {t('destinationLabel')}
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                        setSelected(null);
                      }}
                      onFocus={() => suggestions.length > 0 && setDestOpen(true)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && suggestions[0]) {
                          e.preventDefault();
                          addPlace(suggestions[0]);
                        }
                      }}
                      placeholder={destinations.length ? t('addStopPlaceholder') : t('destinationPlaceholder')}
                      className="w-full bg-transparent outline-none font-karla font-semibold text-[#001E13] placeholder:font-normal placeholder:text-[#001E13]/40 text-sm lg:text-base truncate"
                    />
                  </div>
                  {loading && <Loader2 className="w-4 h-4 text-[#001E13]/40 animate-spin shrink-0" />}
                </div>

                {destOpen && suggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 top-full mt-3 lg:top-auto lg:bottom-full lg:mt-0 lg:mb-3 w-[min(360px,90vw)] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-black/5 overflow-hidden text-left py-1.5">
                    {suggestions.map((s) => (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => addPlace(s)}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-[#EEF899]/30 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-orange shrink-0" />
                          <span className="flex flex-col items-start min-w-0 text-left">
                            <span className="font-karla font-bold text-sm text-[#001E13] truncate max-w-full">
                              {s.name}
                            </span>
                            <span className="font-karla text-xs text-[#001E13]/50 truncate max-w-full">
                              {s.context}
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="hidden lg:block w-px bg-black/10 my-2.5" />

              {/* Dates — explicit From / To so the range reads at a glance. */}
              <div ref={dateRef} className="relative flex-[1.4] min-w-0 flex items-stretch">
                {/* From */}
                <button
                  type="button"
                  onClick={() => openDates('start')}
                  className={`flex-1 min-w-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl lg:rounded-full transition-colors text-left ${
                    dateOpen && dateFocus === 'start' ? 'bg-black/[0.05]' : 'hover:bg-black/[0.03]'
                  }`}
                >
                  <CalendarDays className="w-5 h-5 text-orange shrink-0" />
                  <span className="flex flex-col items-start min-w-0">
                    <span className="text-[10px] font-karla font-bold uppercase tracking-[0.12em] text-[#001E13]/45">
                      {t('fromLabel')}
                    </span>
                    <span
                      className={`font-karla text-sm lg:text-base truncate ${
                        start ? 'font-semibold text-[#001E13]' : 'text-[#001E13]/40'
                      }`}
                    >
                      {start ? fmt(start) : t('addDate')}
                    </span>
                  </span>
                </button>

                <div className="w-px bg-black/10 my-2.5" />

                {/* To */}
                <button
                  type="button"
                  onClick={() => openDates('end')}
                  className={`flex-1 min-w-0 flex items-center gap-2.5 px-5 py-3 rounded-2xl lg:rounded-full transition-colors text-left ${
                    dateOpen && dateFocus === 'end' ? 'bg-black/[0.05]' : 'hover:bg-black/[0.03]'
                  }`}
                >
                  <span className="flex flex-col items-start min-w-0">
                    <span className="text-[10px] font-karla font-bold uppercase tracking-[0.12em] text-[#001E13]/45">
                      {t('toLabel')}
                    </span>
                    <span
                      className={`font-karla text-sm lg:text-base truncate ${
                        end ? 'font-semibold text-[#001E13]' : 'text-[#001E13]/40'
                      }`}
                    >
                      {end ? fmt(end) : t('addDate')}
                    </span>
                  </span>
                </button>

                {dateOpen && (
                  <div className="absolute z-50 left-0 lg:left-auto lg:right-0 top-full mt-3 lg:top-auto lg:bottom-full lg:mt-0 lg:mb-3 w-[320px] max-w-[90vw] bg-white rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] border border-black/5 p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          aria-label="Previous year"
                          onClick={() => shiftView(-12)}
                          disabled={atFloor}
                          className="p-1.5 rounded-full hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronsLeft className="w-4 h-4 text-[#001E13]" />
                        </button>
                        <button
                          type="button"
                          aria-label="Previous month"
                          onClick={() => shiftView(-1)}
                          disabled={atFloor}
                          className="p-1.5 rounded-full hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4 text-[#001E13]" />
                        </button>
                      </div>
                      <span className="font-karla font-bold text-sm text-[#001E13] capitalize">
                        {viewMonth.toLocaleDateString(intlLocale, { month: 'long', year: 'numeric' })}
                      </span>
                      <div className="flex items-center gap-0.5">
                        <button
                          type="button"
                          aria-label="Next month"
                          onClick={() => shiftView(1)}
                          className="p-1.5 rounded-full hover:bg-black/5"
                        >
                          <ChevronRight className="w-4 h-4 text-[#001E13]" />
                        </button>
                        <button
                          type="button"
                          aria-label="Next year"
                          onClick={() => shiftView(12)}
                          className="p-1.5 rounded-full hover:bg-black/5"
                        >
                          <ChevronsRight className="w-4 h-4 text-[#001E13]" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-y-1 mb-1">
                      {(t.raw('weekdays') as string[]).map((w) => (
                        <span key={w} className="text-center text-[11px] font-karla font-bold text-[#001E13]/40">
                          {w}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-1">
                      {grid.map((d, i) => {
                        if (!d) return <span key={`b${i}`} />;
                        const past = d < today;
                        const edge = isEdge(d);
                        const range = inRange(d) && !edge;
                        return (
                          <button
                            key={toISO(d)}
                            type="button"
                            disabled={past}
                            onClick={() => pickDay(d)}
                            className={[
                              'h-9 w-9 mx-auto flex items-center justify-center text-sm font-karla rounded-full transition-colors',
                              past ? 'text-[#001E13]/25 cursor-not-allowed' : 'text-[#001E13] hover:bg-[#EEF899]/50',
                              edge ? 'bg-orange text-white hover:bg-orange font-bold' : '',
                              range ? 'bg-[#EEF899]/60 rounded-none' : '',
                            ].join(' ')}
                          >
                            {d.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA */}
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl lg:rounded-full bg-orange hover:bg-orange/90 disabled:opacity-70 disabled:cursor-wait text-white font-karla font-bold text-base lg:text-lg transition-colors shrink-0"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4 lg:hidden" />
                    {t('cta')}
                    <ArrowRight className="w-4 h-4 hidden lg:block" />
                  </>
                )}
              </button>
            </div>

            {/* Road trip → numbered stop chips; single trip with a destination
                chosen → a "+" to turn it into the first stop of a road trip. */}
            {destinations.length > 0 ? (
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                {destinations.map((d, i) => (
                  <span
                    key={d.id}
                    className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1.5 rounded-full bg-[#FFFBF5] text-[#001E13] font-karla font-semibold text-sm shadow-lg"
                  >
                    <span className="text-orange font-bold">{i + 1}</span>
                    {d.name}
                    <button
                      type="button"
                      onClick={() => removePlace(d.id)}
                      aria-label={`Remove ${d.name}`}
                      className="rounded-full hover:bg-black/10 p-0.5 transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            ) : selected ? (
              <div className="mt-4 flex justify-center">
                <button
                  type="button"
                  onClick={promoteToRoadTrip}
                  className="inline-flex items-center rounded-full bg-[#FFFBF5]/10 backdrop-blur-sm border border-[#FFFBF5]/30 px-4 py-1.5 font-karla font-semibold text-sm text-[#FFFBF5] hover:bg-[#FFFBF5]/20 transition-colors"
                >
                  {t('addStop')}
                </button>
              </div>
            ) : null}

            <p className="mt-4 font-nanum-pen text-[#FFFBF5]/75 text-base lg:text-lg">{t('note')}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
