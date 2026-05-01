'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Sparkles, Loader2, MapPin, Utensils, Calendar, RotateCcw } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';

type UnsplashPhoto = {
  id: string;
  description?: string | null;
  urls: { thumb: string | null; small: string | null; regular: string | null; full?: string | null };
  user: { name: string | null; username: string | null };
  color?: string | null;
};

type ItineraryStop = {
  name: string;
  country: string | null;
  country_code: string | null;
  latitude: number | null;
  longitude: number | null;
  nights: number;
  why: string;
};

type TripPreview = {
  destination: string;
  country: string | null;
  tagline: string;
  best_time: string | null;
  highlights: { title: string; description: string }[];
  specialties: { name: string; description: string }[];
  cover: UnsplashPhoto | null;
  gallery: UnsplashPhoto[];
  itinerary?: ItineraryStop[];
  locale?: string;
};

type Lang = 'en' | 'fr';

type Copy = {
  affiliateTag: string;
  h1: string;
  placeholder: string;
  submit: string;
  submitting: string;
  cta: string;
  ctaNote: string;
  retry: string;
  errorGeneric: string;
  errorRateLimit: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    affiliateTag: 'Your turn, dream it up',
    h1: 'Tell us your dream trip.\nWe\'ll turn it into a plan.',
    placeholder: 'I want to chill on a Mexican beach with ruins nearby...',
    submit: 'Imagine it',
    submitting: 'Crafting your trip...',
    cta: 'Plan this trip',
    ctaNote: 'Dates, stops, everything stays editable after signup',
    retry: 'Another pitch',
    errorGeneric: 'Something went wrong. Please try again.',
    errorRateLimit: 'Too many tries. Please wait a minute.',
  },
  fr: {
    affiliateTag: 'À toi — raconte ton voyage rêvé',
    h1: 'Raconte ton voyage rêvé.\nOn en fait un vrai plan.',
    placeholder: 'Je veux chiller sur une plage mexicaine avec des ruines...',
    submit: 'Imagine-le',
    submitting: 'On prépare ton voyage...',
    cta: 'Planifier ce voyage',
    ctaNote: 'Dates, étapes, tout reste modifiable après inscription',
    retry: 'Un autre pitch',
    errorGeneric: 'Une erreur est survenue. Réessaie.',
    errorRateLimit: 'Trop de tentatives. Attends une minute.',
  },
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.weplanify.com';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://app.weplanify.com';

const STORAGE_KEY = 'weplanify.trip-preview.token.v2';
const LEGACY_STORAGE_KEYS = ['weplanify.trip-preview.v1'];

type Bubble = {
  text: string;
  color: 'lime' | 'cream' | 'orange' | 'white';
  /** Percent of container width for horizontal anchor */
  x: number;
  /** Percent of container height for vertical anchor */
  y: number;
  rotate: number;
  delay: number;
  /** Hide on small screens to avoid clutter */
  desktopOnly?: boolean;
};

const BUBBLES: Record<Lang, Bubble[]> = {
  en: [
    { text: 'Somewhere warm in March with 4 friends', color: 'lime', x: 6, y: 18, rotate: -4, delay: 0 },
    { text: 'Honeymoon without the crowds', color: 'cream', x: 78, y: 14, rotate: 3, delay: 0.6 },
    { text: 'Japan with kids, not exhausting', color: 'orange', x: 82, y: 58, rotate: -2, delay: 1.2, desktopOnly: true },
    { text: 'Bachelorette in Lisbon, 3 days max', color: 'white', x: 4, y: 62, rotate: 2, delay: 0.3, desktopOnly: true },
    { text: 'Road trip to see the auroras', color: 'lime', x: 70, y: 80, rotate: -3, delay: 1.6, desktopOnly: true },
    { text: 'Change of scenery, close by, November', color: 'cream', x: 10, y: 84, rotate: 4, delay: 0.9, desktopOnly: true },
  ],
  fr: [
    { text: 'Un truc chaud en mars avec 4 potes', color: 'lime', x: 6, y: 18, rotate: -4, delay: 0 },
    { text: 'Honeymoon sans les touristes', color: 'cream', x: 78, y: 14, rotate: 3, delay: 0.6 },
    { text: 'Japon en famille, pas crevé', color: 'orange', x: 82, y: 58, rotate: -2, delay: 1.2, desktopOnly: true },
    { text: 'EVJF à Lisbonne, 3 jours max', color: 'white', x: 4, y: 62, rotate: 2, delay: 0.3, desktopOnly: true },
    { text: 'Road trip voir les aurores', color: 'lime', x: 70, y: 80, rotate: -3, delay: 1.6, desktopOnly: true },
    { text: 'Dépaysement en novembre, pas loin', color: 'cream', x: 10, y: 84, rotate: 4, delay: 0.9, desktopOnly: true },
  ],
};

const BUBBLE_CLASSES: Record<Bubble['color'], string> = {
  lime: 'bg-[#EEF899] text-[#001E13]',
  cream: 'bg-[#FFFBF5] text-[#001E13]',
  orange: 'bg-orange/90 text-white',
  white: 'bg-white/95 text-[#001E13]',
};

interface HeroData {
  affiliateTag?: string | null;
  title?: string | null;
  description?: string | null;
  backgroundImage?: string | null;
}

interface Props {
  locale?: string;
  hero: HeroData;
}

export default function HeroPitchWall({ locale = 'en', hero }: Props) {
  const lang: Lang = locale === 'fr' ? 'fr' : 'en';
  const copy = COPY[lang];

  const [pitch, setPitchValue] = useState('');
  const [travelMonth, setTravelMonth] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<TripPreview | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [clarification, setClarification] = useState<{ question: string; suggestions: string[] } | null>(null);

  useEffect(() => {
    LEGACY_STORAGE_KEYS.forEach((k) => {
      try { localStorage.removeItem(k); } catch {}
    });

    let cancelled = false;
    const stored = (() => {
      try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
    })();
    if (!stored) return;

    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/public/trip-preview/${encodeURIComponent(stored)}`, {
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }
        const data = await res.json();
        const preview = data?.preview as TripPreview | undefined;
        if (!preview) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }
        if (preview.locale && preview.locale !== lang) {
          localStorage.removeItem(STORAGE_KEY);
          return;
        }
        if (cancelled) return;
        setPreview(preview);
        setToken(stored);
        setStatus('success');
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    })();

    return () => { cancelled = true; };
  }, [lang]);

  const bubbles = useMemo(() => BUBBLES[lang], [lang]);

  const monthOptions = useMemo(() => {
    const now = new Date();
    return Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const label = d.toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-US', { month: 'short' });
      return { value, label: label.charAt(0).toUpperCase() + label.slice(1).replace('.', '') };
    });
  }, [lang]);

  const submit = async () => {
    const trimmed = pitch.trim();
    if (trimmed.length < 3 || status === 'loading') return;

    setStatus('loading');
    setError(null);
    trackEvent('hero_pitch_submit', { length: trimmed.length, locale: lang });

    try {
      const res = await fetch(`${API_URL}/api/public/trip-preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ pitch: trimmed, locale: lang, travel_month: travelMonth }),
      });
      if (res.status === 429) {
        setError(copy.errorRateLimit);
        setStatus('error');
        return;
      }
      if (!res.ok) {
        setError(copy.errorGeneric);
        setStatus('error');
        return;
      }
      const data = await res.json();
      if (data?.needs_clarification) {
        setClarification({
          question: data.question ?? '',
          suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
        });
        setStatus('idle');
        trackEvent('hero_pitch_needs_clarification', { locale: lang });
        return;
      }
      const preview = data.preview as TripPreview;
      setPreview(preview);
      setToken(data.token);
      setStatus('success');
      setClarification(null);
      try {
        localStorage.setItem(STORAGE_KEY, data.token);
      } catch {}
      trackEvent('hero_pitch_success', { destination: preview.destination });
    } catch {
      setError(copy.errorGeneric);
      setStatus('error');
    }
  };

  const reset = () => {
    setStatus('idle');
    setPreview(null);
    setToken(null);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  const converging = status === 'loading' || status === 'success';

  return (
    <div id="hero" className="pt-[100px] lg:pt-[120px] px-4 lg:px-8 pb-4 lg:pb-6">
      <div className="max-w-[1536px] mx-auto">
        <section className="relative overflow-hidden rounded-[24px] lg:rounded-[40px]">
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.backgroundImage || '/header-bg.webp'}
              alt={hero.title || 'Hero'}
              fill
              sizes="100vw"
              className="object-cover"
              priority
              fetchPriority="high"
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>

          <div className="relative z-10 w-full min-h-[640px] lg:min-h-[680px] flex flex-col items-center justify-center px-4 lg:px-8 py-10 lg:py-14">
            {bubbles.map((b, i) => (
              <PitchBubble key={i} bubble={b} converging={converging} />
            ))}

            <div className="relative z-20 w-full flex flex-col items-center text-center">
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full max-w-6xl"
                  >
                    <LoadingDeck pitch={pitch} travelMonth={travelMonth} lang={lang} months={monthOptions} />
                  </motion.div>
                ) : status !== 'success' ? (
                  <motion.div
                    key="composer"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="w-full"
                  >
                    <span className="inline-block text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-base font-nanum-pen mb-4 shadow-sm">
                      {hero.affiliateTag || copy.affiliateTag}
                    </span>
                    <h1 className="text-[#FFFBF5] text-3xl lg:text-5xl xl:text-[56px] font-londrina-solid leading-[1.05] whitespace-pre-line mb-6 drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)]">
                      {copy.h1}
                    </h1>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        submit();
                      }}
                      className="w-full max-w-2xl mx-auto"
                    >
                      <div className="relative rounded-[28px] lg:rounded-[36px] bg-[#FFFBF5] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] ring-1 ring-white/60">
                        <textarea
                          value={pitch}
                          onChange={(e) => setPitchValue(e.target.value)}
                          placeholder={copy.placeholder}
                          maxLength={500}
                          rows={3}
                          className="w-full resize-none rounded-[28px] lg:rounded-[36px] px-5 pt-5 pb-16 bg-transparent outline-none placeholder-gray-500 text-[#001E13] text-base lg:text-lg font-karla"
                        />
                        <div className="absolute bottom-3 left-5 right-3 flex items-center justify-between">
                          <span className="text-xs text-gray-400 font-karla">{pitch.length}/500</span>
                          <button
                            type="submit"
                            disabled={pitch.trim().length < 3}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange hover:bg-orange/90 text-white font-karla font-bold text-sm lg:text-base transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange/30"
                          >
                            <Sparkles className="w-4 h-4" />
                            {copy.submit}
                          </button>
                        </div>
                      </div>
                      <MonthPicker
                        lang={lang}
                        value={travelMonth}
                        onChange={setTravelMonth}
                        months={monthOptions}
                        disabled={false}
                      />
                      {error && (
                        <p className="mt-3 text-sm text-red-200 bg-red-900/40 border border-red-400/30 rounded-xl px-4 py-2" role="alert">
                          {error}
                        </p>
                      )}
                      {clarification && (
                        <div className="mt-4 rounded-2xl bg-[#FFFBF5]/10 backdrop-blur-sm border border-white/25 px-4 py-3 text-left">
                          <p className="text-[#FFFBF5] font-karla font-semibold text-sm lg:text-base mb-2">
                            {clarification.question}
                          </p>
                          {clarification.suggestions.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {clarification.suggestions.map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => {
                                    setPitchValue((prev) => {
                                      const trimmed = prev.trim();
                                      const connector = lang === 'fr' ? ' — plutôt ' : ' — more like ';
                                      return trimmed ? `${trimmed}${connector}${s}` : s;
                                    });
                                    setClarification(null);
                                  }}
                                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#EEF899] text-[#001E13] font-karla font-bold text-xs lg:text-sm hover:brightness-95 transition"
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.45, delay: 0.2 }}
                    className="w-full max-w-6xl"
                  >
                    {preview && (
                      <PolaroidDeckCard
                        preview={preview}
                        token={token}
                        copy={copy}
                        lang={lang}
                        onReset={reset}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function MonthPicker({
  lang,
  value,
  onChange,
  months,
  disabled,
}: {
  lang: Lang;
  value: string | null;
  onChange: (v: string | null) => void;
  months: { value: string; label: string }[];
  disabled: boolean;
}) {
  const label = lang === 'fr' ? 'Quand ?' : 'When?';
  const unknown = lang === 'fr' ? 'Je sais pas' : 'Not sure';

  const base =
    'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-karla font-bold transition-colors border';
  const activeCls = 'bg-[#FFFBF5] text-[#001E13] border-[#FFFBF5]';
  const idleCls = 'bg-white/10 text-[#FFFBF5] border-white/25 hover:bg-white/20';

  return (
    <div className="mt-3 flex items-center gap-2">
      <span className="text-[#FFFBF5]/80 font-karla font-semibold text-sm flex-shrink-0 inline-flex items-center gap-1.5">
        <Calendar className="w-3.5 h-3.5" />
        {label}
      </span>
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1 -mb-1">
        <button
          type="button"
          disabled={disabled}
          onClick={() => onChange(null)}
          className={`${base} ${value === null ? activeCls : idleCls}`}
        >
          {unknown}
        </button>
        {months.map((m) => (
          <button
            key={m.value}
            type="button"
            disabled={disabled}
            onClick={() => onChange(m.value)}
            className={`${base} ${value === m.value ? activeCls : idleCls}`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const LOADING_STEPS: Record<Lang, string[]> = {
  en: [
    'Reading your dream',
    'Picking the perfect spot',
    'Snapshotting the landscape',
    'Uncovering local flavors',
  ],
  fr: [
    'On capte ton rêve',
    'On trouve le lieu parfait',
    'On photographie le paysage',
    'On déniche les spécialités',
  ],
};

function LoadingDeck({
  pitch,
  travelMonth,
  lang,
  months,
}: {
  pitch: string;
  travelMonth: string | null;
  lang: Lang;
  months: { value: string; label: string }[];
}) {
  const monthLabel = travelMonth ? months.find((m) => m.value === travelMonth)?.label : null;
  const overline = lang === 'fr' ? 'On cherche…' : 'Looking for…';
  const dreamLabel = lang === 'fr' ? 'Ton rêve' : 'Your dream';

  return (
    <div className="grid lg:grid-cols-[minmax(0,460px)_1fr] gap-8 lg:gap-14 items-center text-left">
      <div className="relative w-full max-w-[340px] lg:max-w-none mx-auto h-[300px] lg:h-[380px] flex items-center justify-center">
        <GhostPolaroid
          className="absolute left-0 top-0 w-20 lg:w-44 lg:left-0 lg:top-[2%]"
          rotate={-12}
          delay={0.45}
          zIndex={15}
        />
        <GhostPolaroid
          className="absolute right-0 bottom-0 w-20 lg:w-44 lg:right-[2%] lg:bottom-[4%]"
          rotate={10}
          delay={0.55}
          zIndex={20}
        />
        <GhostPolaroid
          className="relative w-32 lg:w-64 lg:mt-8"
          rotate={-3}
          delay={0.25}
          zIndex={30}
          withTape
        />
      </div>

      <div className="text-center lg:text-left w-full">
        <div className="font-nanum-pen text-[#EEF899] text-xl lg:text-2xl mb-0">{overline}</div>
        <div className="mb-3 inline-flex items-center gap-3">
          <Loader2 className="w-7 h-7 lg:w-10 lg:h-10 animate-spin text-orange" />
          <ShimmerBar className="h-10 lg:h-16 w-[180px] lg:w-[320px] rounded-md" />
        </div>
        <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
          <ShimmerBar className="h-3 w-24 rounded-full" />
          {monthLabel && (
            <>
              <span className="text-[#FFFBF5]/40">·</span>
              <span className="inline-flex items-center gap-1.5 text-xs font-karla font-bold text-[#FFFBF5]/80">
                <Calendar className="w-3.5 h-3.5" />
                {monthLabel}
              </span>
            </>
          )}
        </div>

        <div className="relative inline-block max-w-full mb-5 rotate-[-1deg] mx-auto lg:mx-0">
          <div className="bg-[#FFFBF5] text-[#001E13] px-4 py-3 rounded-sm shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)]">
            <div className="font-nanum-pen text-orange text-sm leading-none mb-1">{dreamLabel}</div>
            <p className="font-karla text-sm lg:text-base italic leading-snug max-w-[420px]">“{pitch}”</p>
          </div>
        </div>

        <LoadingSteps lang={lang} />
      </div>
    </div>
  );
}

function ShimmerBar({ className = '' }: { className?: string }) {
  return (
    <span
      className={`block bg-[#FFFBF5]/15 overflow-hidden relative ${className}`}
    >
      <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </span>
  );
}

function GhostPolaroid({
  className = '',
  rotate = 0,
  delay = 0,
  zIndex = 10,
  withTape = false,
}: {
  className?: string;
  rotate?: number;
  delay?: number;
  zIndex?: number;
  withTape?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate }}
      transition={{ delay, type: 'spring', stiffness: 150, damping: 16 }}
      style={{ zIndex }}
      className={`${className} bg-white p-2.5 pb-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-sm`}
    >
      {withTape && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EEF899]/80 rotate-[-4deg] shadow-sm" />
      )}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-br from-[#EEF0F2] to-[#D9DEE3]">
        <span className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </div>
      <div className="absolute bottom-2 left-0 right-0 flex justify-center">
        <ShimmerBar className="h-2 w-1/2 rounded-full !bg-[#001E13]/10" />
      </div>
    </motion.div>
  );
}

function LoadingSteps({ lang }: { lang: Lang }) {
  const steps = LOADING_STEPS[lang];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => Math.min(i + 1, steps.length - 1));
    }, 1300);
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="space-y-2 text-left"
    >
      {steps.map((step, i) => {
        const state: 'done' | 'active' | 'pending' =
          i < activeIndex ? 'done' : i === activeIndex ? 'active' : 'pending';
        return (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: state === 'pending' ? 0.35 : 1, x: 0 }}
            transition={{ delay: i * 0.08, duration: 0.25 }}
            className="flex items-center gap-3 text-[#FFFBF5] font-karla font-semibold text-sm drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]"
          >
            <span className="relative flex items-center justify-center w-5 h-5 flex-shrink-0">
              {state === 'done' && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#EEF899] text-[#001E13] text-[11px] font-bold"
                >
                  ✓
                </motion.span>
              )}
              {state === 'active' && (
                <>
                  <span className="absolute inline-flex h-full w-full rounded-full bg-orange/40 animate-ping" />
                  <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-orange" />
                </>
              )}
              {state === 'pending' && (
                <span className="inline-flex w-2 h-2 rounded-full bg-[#FFFBF5]/40" />
              )}
            </span>
            <span className={state === 'pending' ? 'opacity-60' : ''}>{step}…</span>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

function PitchBubble({ bubble, converging }: { bubble: Bubble; converging: boolean }) {
  const toCenterX = `calc(50% - ${bubble.x}% - 80px)`;
  const toCenterY = `calc(50% - ${bubble.y}% - 20px)`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={
        converging
          ? {
              opacity: 0,
              scale: 0.2,
              x: toCenterX,
              y: toCenterY,
              rotate: 0,
              transition: { duration: 0.55, ease: [0.6, -0.05, 0.01, 0.99], delay: bubble.delay * 0.15 },
            }
          : {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              rotate: bubble.rotate,
              transition: { duration: 0.6, delay: bubble.delay, ease: 'easeOut' },
            }
      }
      style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
      className={`pointer-events-none absolute z-10 ${bubble.desktopOnly ? 'hidden lg:block' : ''}`}
    >
      <motion.div
        animate={
          converging
            ? undefined
            : {
                y: [0, -8, 0],
                transition: { duration: 6 + bubble.delay, repeat: Infinity, ease: 'easeInOut', delay: bubble.delay },
              }
        }
        className={`${BUBBLE_CLASSES[bubble.color]} font-karla font-semibold text-xs lg:text-sm px-3.5 py-2 lg:px-4 lg:py-2.5 rounded-2xl shadow-lg max-w-[240px] lg:max-w-[280px] leading-snug`}
        style={{ transform: `rotate(${bubble.rotate}deg)` }}
      >
        “{bubble.text}”
      </motion.div>
    </motion.div>
  );
}

const STICKY_TAGS: Record<Lang, string[]> = {
  en: ['must-see!', 'love this', 'on the list'],
  fr: ['à voir!', 'coup de cœur', 'à goûter!'],
};

function PolaroidDeckCard({
  preview,
  token,
  copy,
  lang,
  onReset,
}: {
  preview: TripPreview;
  token: string | null;
  copy: Copy;
  lang: Lang;
  onReset: () => void;
}) {
  const signupUrl = token ? `${APP_URL}/register?pitch=${token}` : `${APP_URL}/register`;
  const tags = STICKY_TAGS[lang];

  const cover = preview.cover;
  const g1 = preview.gallery[0] ?? null;
  const g2 = preview.gallery[1] ?? null;

  return (
    <div className="grid lg:grid-cols-[minmax(0,460px)_1fr] gap-8 lg:gap-14 items-center text-left">
      <motion.div
        initial="rest"
        animate="rest"
        whileHover="hovered"
        className="relative w-full max-w-[340px] lg:max-w-none mx-auto h-[300px] lg:h-[380px] flex items-center justify-center"
      >
        {g1 && (
          <Polaroid
            photo={g1}
            caption={preview.destination}
            className="absolute left-0 top-0 w-20 lg:w-44 lg:left-0 lg:top-[2%]"
            rotate={-12}
            delay={0.45}
            zIndex={15}
            captionStyle="pen"
            hoverX={-100}
            hoverY={-40}
            hoverRotate={-24}
          />
        )}
        {g2 && (
          <Polaroid
            photo={g2}
            caption={preview.destination}
            className="absolute right-0 bottom-0 w-20 lg:w-44 lg:right-[2%] lg:bottom-[4%]"
            rotate={10}
            delay={0.55}
            zIndex={20}
            captionStyle="pen"
            hoverX={100}
            hoverY={60}
            hoverRotate={22}
          />
        )}
        {cover && (
          <Polaroid
            photo={cover}
            caption={`${preview.destination} · ${preview.country ?? ''}`}
            className="relative w-32 lg:w-64 lg:mt-8"
            rotate={-3}
            delay={0.25}
            zIndex={30}
            captionStyle="typed"
            withTape
            hoverY={10}
            hoverRotate={-1}
          />
        )}
        <motion.span
          initial={{ opacity: 0, rotate: 0, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 14, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 160, damping: 12 }}
          className="absolute top-[2%] right-[4%] lg:right-[2%] font-nanum-pen text-2xl lg:text-3xl text-orange drop-shadow-[0_1px_0_rgba(255,251,245,0.6)] z-40 pointer-events-none"
        >
          {tags[0]}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, rotate: 0, scale: 0.6 }}
          animate={{ opacity: 1, rotate: -8, scale: 1 }}
          transition={{ delay: 1.05, type: 'spring', stiffness: 160, damping: 12 }}
          className="absolute bottom-[8%] left-[2%] font-nanum-pen text-xl lg:text-2xl text-[#EEF899] drop-shadow-[0_1px_0_rgba(0,0,0,0.4)] z-40 pointer-events-none"
        >
          {tags[2]}
        </motion.span>
      </motion.div>

      <div className="text-center lg:text-left w-full">
        <div className="font-nanum-pen text-[#EEF899] text-xl lg:text-2xl mb-0">
          {lang === 'fr' ? 'Et si tu allais à…' : 'What about…'}
        </div>
        <h2 className="font-londrina-solid text-[#FFFBF5] text-5xl lg:text-[88px] xl:text-[104px] leading-[0.9] mb-2 drop-shadow-[0_4px_28px_rgba(0,0,0,0.55)] break-words">
          {preview.destination}
        </h2>
        <div className="flex items-center gap-3 text-[#FFFBF5]/90 font-karla font-semibold text-sm lg:text-base mb-3 justify-center lg:justify-start flex-wrap">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            {preview.country}
          </span>
          {preview.best_time && (
            <>
              <span className="opacity-50">·</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {preview.best_time}
              </span>
            </>
          )}
        </div>
        <p className="text-[#FFFBF5] font-karla font-semibold text-lg lg:text-xl xl:text-2xl mb-4 leading-snug">
          {preview.tagline}
        </p>
        <ul className="flex flex-wrap gap-2 mb-4 justify-center lg:justify-start">
          {preview.highlights.map((h, i) => {
            const palette = [
              'bg-[#FFFBF5] text-[#001E13]',
              'bg-[#EEF899] text-[#001E13]',
              'bg-orange text-white',
              'bg-[#FFFBF5] text-[#001E13]',
            ];
            const tilt = [-2, 1.5, -1, 2];
            return (
              <li
                key={h.title}
                title={h.description}
                style={{ transform: `rotate(${tilt[i % tilt.length]}deg)` }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-nanum-pen text-lg lg:text-xl leading-none shadow-[0_4px_10px_-2px_rgba(0,0,0,0.3)] ${palette[i % palette.length]}`}
              >
                <MapPin className="w-3.5 h-3.5 opacity-70" />
                {h.title}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-1.5 text-[#FFFBF5]/90 text-xs lg:text-sm mb-6 flex-wrap justify-center lg:justify-start font-karla">
          <Utensils className="w-4 h-4 opacity-80" />
          {preview.specialties.map((s, i) => (
            <span key={s.name}>
              <span className="font-bold text-[#FFFBF5]">{s.name}</span>
              {i < preview.specialties.length - 1 && <span className="opacity-40 mx-1.5">·</span>}
            </span>
          ))}
        </div>
        {preview.itinerary && preview.itinerary.length > 1 && (
          <ItineraryTimeline itinerary={preview.itinerary} lang={lang} />
        )}
        <div className="flex items-center gap-3 lg:gap-4 lg:flex-wrap lg:justify-start justify-center">
          <Link
            href={signupUrl}
            onClick={() => trackEvent('hero_pitch_cta_click', { destination: preview.destination })}
            className="inline-flex flex-1 max-w-[280px] lg:max-w-none lg:flex-none items-center justify-center gap-2 px-6 py-3 rounded-full bg-orange hover:bg-orange/90 text-white font-karla font-bold text-base lg:text-lg transition-colors shadow-xl shadow-orange/40"
            rel="nofollow"
          >
            {copy.cta}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            type="button"
            onClick={onReset}
            aria-label={copy.retry}
            className="inline-flex items-center justify-center gap-1.5 text-[#FFFBF5]/90 hover:text-white font-karla font-semibold text-sm lg:underline lg:underline-offset-4 flex-shrink-0"
          >
            <RotateCcw className="w-5 h-5 lg:w-4 lg:h-4" />
            <span className="hidden lg:inline">{copy.retry}</span>
          </button>
        </div>
        <p className="mt-3 font-nanum-pen text-[#FFFBF5]/75 text-base lg:text-lg text-center lg:text-left">
          {copy.ctaNote}
        </p>
      </div>
    </div>
  );
}

function Polaroid({
  photo,
  caption,
  className = '',
  rotate = 0,
  delay = 0,
  zIndex = 10,
  captionStyle = 'typed',
  withTape = false,
  hoverX = 0,
  hoverY = 0,
  hoverRotate,
}: {
  photo: UnsplashPhoto;
  caption: string;
  className?: string;
  rotate?: number;
  delay?: number;
  zIndex?: number;
  captionStyle?: 'typed' | 'pen';
  withTape?: boolean;
  hoverX?: number;
  hoverY?: number;
  hoverRotate?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, rotate: 0, y: 30, scale: 0.9 }}
      variants={{
        rest: { opacity: 1, scale: 1, rotate, x: 0, y: 0 },
        hovered: { opacity: 1, scale: 1, rotate: hoverRotate ?? rotate, x: hoverX, y: hoverY },
      }}
      transition={{ delay, type: 'spring', stiffness: 150, damping: 16 }}
      style={{ zIndex }}
      className={`${className} bg-white p-2.5 pb-10 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] rounded-sm will-change-transform`}
    >
      {withTape && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#EEF899]/80 rotate-[-4deg] shadow-sm" />
      )}
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
        {photo.urls.full || photo.urls.regular || photo.urls.small ? (
          <Image
            src={(photo.urls.full || photo.urls.regular || photo.urls.small) as string}
            alt={photo.description || caption}
            fill
            sizes="(max-width: 1024px) 400px, 640px"
            quality={95}
            className="object-cover"
          />
        ) : null}
      </div>
      <div
        className={`absolute bottom-2 left-0 right-0 text-center text-[#001E13] ${
          captionStyle === 'pen'
            ? 'font-nanum-pen text-lg leading-none'
            : 'font-londrina-solid text-xs tracking-[0.18em] uppercase'
        }`}
      >
        {caption}
      </div>
    </motion.div>
  );
}

function ItineraryTimeline({ itinerary, lang }: { itinerary: ItineraryStop[]; lang: Lang }) {
  const label = lang === 'fr' ? 'Une piste d\'itinéraire' : 'An itinerary idea';
  const nightLabel = (n: number) =>
    lang === 'fr' ? `${n} ${n > 1 ? 'nuits' : 'nuit'}` : `${n} ${n > 1 ? 'nights' : 'night'}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="mb-8 lg:mb-10"
    >
      <div className="font-nanum-pen text-[#EEF899] text-lg lg:text-xl mb-2 text-center lg:text-left">
        {label}
      </div>
      <ol className="flex flex-wrap items-stretch gap-2 lg:gap-3 justify-center lg:justify-start">
        {itinerary.map((stop, i) => (
          <li
            key={`${stop.name}-${i}`}
            className="relative flex items-center gap-2 rounded-full bg-[#FFFBF5]/10 backdrop-blur-sm border border-white/25 px-3 py-2 text-[#FFFBF5] font-karla"
          >
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#EEF899] text-[#001E13] font-bold text-xs flex-shrink-0">
              {i + 1}
            </span>
            <div className="leading-tight">
              <div className="font-bold text-sm lg:text-base">{stop.name}</div>
              <div className="text-[11px] lg:text-xs opacity-80">{nightLabel(stop.nights)}</div>
            </div>
            {i < itinerary.length - 1 && (
              <ArrowRight className="w-3.5 h-3.5 text-[#FFFBF5]/50 ml-1 hidden lg:inline-block" />
            )}
          </li>
        ))}
      </ol>
    </motion.div>
  );
}

