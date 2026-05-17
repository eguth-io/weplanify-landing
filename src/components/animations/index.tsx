'use client';

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';

// ============================================================================
// DESIGN SYSTEM - Weplanify Brand Colors
// ============================================================================
const colors = {
  primary: '#F6391A',
  primaryLight: '#FF6B4A',
  cream: '#FFFBF5',
  dark: '#001E13',
  mint: '#61DBD5',
  mintDark: '#4D9F79',
  yellow: '#EEF899',
  poll: '#8B5CF6',
  participant: '#4ECDC4',
  packing: '#E91E63',
  budget: '#FFB800',
  transport: '#00695C',
  sleeping: '#26A69A',
  food: '#FF8A50',
  activities: '#ADA800',
};

// ============================================================================
// ICONS (inline SVGs to avoid lucide dependency in landing)
// ============================================================================
interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

const Icons = {
  MapPin: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Plane: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  ),
  Sparkles: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  ),
  Send: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
    </svg>
  ),
  Check: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Vote: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 12 2 2 4-4" />
      <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z" />
      <path d="M22 19H2" />
    </svg>
  ),
  Luggage: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0" />
      <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
      <path d="M10 20h4" />
      <circle cx="16" cy="20" r="2" /><circle cx="8" cy="20" r="2" />
    </svg>
  ),
  CreditCard: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  Users: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Heart: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  Utensils: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  Bed: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" />
    </svg>
  ),
  Train: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="16" x="4" y="3" rx="2" />
      <path d="M4 11h16" /><path d="M12 3v8" />
      <path d="m8 19-2 3" /><path d="m18 22-2-3" />
      <path d="M8 15h0" /><path d="M16 15h0" />
    </svg>
  ),
  Globe: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Calendar: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  ),
  Shirt: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
    </svg>
  ),
  Camera: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Sunglasses: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="15" r="4" /><circle cx="18" cy="15" r="4" />
      <path d="M14 15a2 2 0 0 0-4 0" /><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2" /><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2" />
    </svg>
  ),
  X: ({ className, style }: IconProps) => (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" /><path d="m6 6 12 12" />
    </svg>
  ),
};

// ============================================================================
// 1. EXPLORER CARDS — mirrors the real Explorer module: filter chips drive a
// card grid, each card has a thumbnail / rating / price / add-to-trip button,
// and a Mapbox-like globe shows the matching pin.
// ============================================================================
type ExplorerCategoryKey = 'activity' | 'restaurant' | 'hotel' | 'transport';

interface ExplorerCardData {
  title: string;
  city: string;
  price: string;
  rating: number | null;
  emoji: string;
  gradient: string;
  pin: { x: number; y: number };
}

interface ExplorerFilterDef {
  key: ExplorerCategoryKey;
  label: Record<'en' | 'fr', string>;
  icon: keyof typeof Icons;
}

const EXPLORER_FILTERS: ExplorerFilterDef[] = [
  { key: 'activity', label: { en: 'Activities', fr: 'Activités' }, icon: 'Camera' },
  { key: 'restaurant', label: { en: 'Restaurants', fr: 'Restaurants' }, icon: 'Utensils' },
  { key: 'hotel', label: { en: 'Hotels', fr: 'Hébergement' }, icon: 'Bed' },
  { key: 'transport', label: { en: 'Transport', fr: 'Transport' }, icon: 'Train' },
];

const EXPLORER_FILTER_KEYS: ExplorerCategoryKey[] = EXPLORER_FILTERS.map((f) => f.key);

const EXPLORER_ADDED_LABEL: Record<'en' | 'fr', string> = {
  en: 'Added to itinerary',
  fr: 'Ajouté à l’itinéraire',
};

const EXPLORER_CARDS: Record<ExplorerCategoryKey, ExplorerCardData> = {
  activity: {
    title: 'Eiffel Tower visit',
    city: 'Paris',
    price: '32€',
    rating: 4.8,
    emoji: '🗼',
    gradient: 'from-amber-500 via-orange-500 to-pink-500',
    pin: { x: 48, y: 38 },
  },
  restaurant: {
    title: 'Le Petit Bistrot',
    city: 'Paris',
    price: '€€',
    rating: 4.6,
    emoji: '🍝',
    gradient: 'from-rose-500 via-red-500 to-amber-500',
    pin: { x: 49, y: 39 },
  },
  hotel: {
    title: 'Hôtel du Louvre',
    city: 'Paris',
    price: '180€',
    rating: 4.4,
    emoji: '🏨',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    pin: { x: 47, y: 38 },
  },
  transport: {
    title: 'Eurostar Paris–London',
    city: '2h 16min',
    price: '95€',
    rating: null,
    emoji: '🚆',
    gradient: 'from-teal-500 via-cyan-500 to-blue-500',
    pin: { x: 35, y: 35 },
  },
};

export function ExplorerCards({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang: 'en' | 'fr' = locale === 'fr' ? 'fr' : 'en';
  const [activeFilter, setActiveFilter] = useState<ExplorerCategoryKey>(EXPLORER_FILTER_KEYS[0]);
  const [added, setAdded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  useEffect(() => {
    setIsPlaying(autoPlay);
  }, [autoPlay]);

  useEffect(() => {
    if (!isPlaying) return;
    // Each cycle: show card for 1.6s, animate add → check, hold 0.6s, then advance filter.
    const addTimer = setTimeout(() => setAdded(true), 1600);
    const nextTimer = setTimeout(() => {
      setAdded(false);
      setActiveFilter((prev) => {
        const i = EXPLORER_FILTER_KEYS.indexOf(prev);
        return EXPLORER_FILTER_KEYS[(i + 1) % EXPLORER_FILTER_KEYS.length];
      });
    }, 2400);
    return () => {
      clearTimeout(addTimer);
      clearTimeout(nextTimer);
    };
  }, [activeFilter, isPlaying]);

  const card = EXPLORER_CARDS[activeFilter];

  return (
    <div
      className="relative min-h-[280px] lg:min-h-[350px] h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 p-4 lg:p-5"
      onMouseEnter={() => setIsPlaying(true)}
    >
      {/* Filter chips — mirror the Explorer's type switcher tabs */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5 mb-3 lg:mb-4">
        {EXPLORER_FILTERS.map((f) => {
          const Icon = Icons[f.icon];
          const isActive = f.key === activeFilter;
          return (
            <motion.div
              key={f.key}
              animate={{
                backgroundColor: isActive ? colors.primary : 'rgba(255,255,255,0.06)',
                scale: isActive ? 1.04 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 backdrop-blur"
            >
              <Icon className="w-3 h-3 text-white" />
              <span className="text-[11px] font-medium text-white">{f.label[lang]}</span>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-3 lg:gap-4 items-stretch">
        {/* Card — mirrors explorer-item-card.tsx visual contract */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="rounded-2xl overflow-hidden bg-white shadow-xl"
          >
            {/* Thumbnail with badges */}
            <div className={`relative h-24 lg:h-32 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
              <span className="text-4xl lg:text-5xl drop-shadow-lg">{card.emoji}</span>

              {/* Rating badge (top-left) */}
              {card.rating != null && (
                <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-2 py-0.5">
                  <span className="text-[10px]">⭐</span>
                  <span className="text-[10px] font-semibold text-white">{card.rating}</span>
                </div>
              )}

              {/* Add / Added button (top-right) — the headline interaction */}
              <motion.div
                key={`btn-${activeFilter}-${added}`}
                initial={{ scale: 1 }}
                animate={added ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="absolute top-2 right-2"
              >
                <div
                  className="flex w-7 h-7 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
                  style={{
                    backgroundColor: added ? colors.mintDark : 'rgba(0,0,0,0.4)',
                  }}
                >
                  {added ? (
                    <Icons.Check className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="12" x2="12" y1="5" y2="19" />
                      <line x1="5" x2="19" y1="12" y2="12" />
                    </svg>
                  )}
                </div>
              </motion.div>

              {/* Map-pin shortcut (bottom-right) — present on the real card */}
              <div className="absolute bottom-2 right-2 flex w-6 h-6 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                <Icons.MapPin className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Card content */}
            <div className="px-3 py-2.5">
              <p className="text-[13px] font-semibold text-slate-900 truncate">{card.title}</p>
              <div className="mt-1 flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 truncate">{card.city}</span>
                <span className="text-[12px] font-bold text-slate-900">{card.price}</span>
              </div>
              <AnimatePresence>
                {added && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 flex items-center gap-1 text-[10px] font-medium overflow-hidden"
                    style={{ color: colors.mintDark }}
                  >
                    <Icons.Check className="w-3 h-3" />
                    <span>{EXPLORER_ADDED_LABEL[lang]}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Mini globe — represents the Mapbox panel that sits right of the cards */}
        <div className="relative flex flex-col items-center justify-center rounded-2xl bg-black/30 backdrop-blur-sm border border-white/10 p-2">
          <div
            className="relative w-24 h-24 lg:w-28 lg:h-28 rounded-full"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${colors.mint}50, ${colors.mintDark}30, ${colors.dark}80)`,
              boxShadow: `inset -15px -15px 35px rgba(0,0,0,0.5), 0 0 40px ${colors.mint}30`,
            }}
          >
            {[25, 50, 75].map((pos) => (
              <div key={pos} className="absolute left-[5%] h-px w-[90%] bg-white/10" style={{ top: `${pos}%` }} />
            ))}

            <motion.div
              key={`pin-${activeFilter}`}
              className="absolute"
              style={{ left: `${card.pin.x}%`, top: `${card.pin.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            >
              <motion.div
                className="absolute -inset-2 rounded-full"
                animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <div className="w-full h-full rounded-full border-2" style={{ borderColor: colors.primary }} />
              </motion.div>
              <div
                className="flex w-5 h-5 items-center justify-center rounded-full shadow-lg"
                style={{ backgroundColor: colors.primary }}
              >
                <Icons.MapPin className="w-3 h-3 text-white" />
              </div>
            </motion.div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[10px] text-white/70">
            <Icons.Globe className="w-3 h-3" />
            <span>{card.city}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Back-compat alias: StackingCards still imports AiGlobeJourney by name.
export const AiGlobeJourney = ExplorerCards;

// ============================================================================
// 2. LIVE VOTING
// ============================================================================
export function LiveVoting({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const t = lang === 'fr'
    ? { question: 'On va où demain ?', votes: 'votes', live: 'En direct', winner: 'Kyoto gagne !' }
    : { question: 'Where to go tomorrow?', votes: 'votes', live: 'Live', winner: 'Kyoto wins!' };
  const [votes, setVotes] = useState([0, 0, 0]);
  const [voters, setVoters] = useState<Array<{ id: number; option: number; avatar: string }>>([]);
  const options = ['Kyoto', 'Osaka', 'Nara'];

  useEffect(() => {
    if (!autoPlay) return;

    const intervals = [
      setTimeout(() => { setVotes([1, 0, 0]); setVoters([{ id: 1, option: 0, avatar: 'M' }]); }, 500),
      setTimeout(() => { setVotes([2, 0, 0]); setVoters((v) => [...v, { id: 2, option: 0, avatar: 'A' }]); }, 1000),
      setTimeout(() => { setVotes([2, 1, 0]); setVoters((v) => [...v, { id: 3, option: 1, avatar: 'S' }]); }, 1500),
      setTimeout(() => { setVotes([3, 1, 0]); setVoters((v) => [...v, { id: 4, option: 0, avatar: 'L' }]); }, 2000),
      setTimeout(() => { setVotes([3, 1, 1]); setVoters((v) => [...v, { id: 5, option: 2, avatar: 'J' }]); }, 2500),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [autoPlay]);

  const total = votes.reduce((a, b) => a + b, 0) || 1;
  const winner = votes.indexOf(Math.max(...votes));

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 to-purple-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.poll }}>
            <Icons.Vote className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">{t.question}</div>
            <div className="text-xs text-slate-500">{total} {t.votes}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 rounded-full bg-red-500/10 px-2 py-1">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <span className="text-xs font-medium text-red-600">{t.live}</span>
        </div>
      </div>

      <div className="space-y-3">
        {options.map((opt, i) => {
          const percentage = Math.round((votes[i] / total) * 100);
          const optionVoters = voters.filter((v) => v.option === i);

          return (
            <motion.div
              key={opt}
              className={`relative overflow-hidden rounded-xl border-2 bg-white p-3 transition-all ${
                winner === i && total > 1 ? 'border-violet-400 shadow-lg shadow-violet-200' : 'border-slate-200'
              }`}
            >
              <motion.div
                className="absolute inset-y-0 left-0 rounded-xl"
                style={{ backgroundColor: `${colors.poll}15` }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
              />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-slate-700">{opt}</span>
                  <div className="flex -space-x-2">
                    <AnimatePresence>
                      {optionVoters.map((voter) => (
                        <motion.div
                          key={voter.id}
                          initial={{ scale: 0, x: -20 }}
                          animate={{ scale: 1, x: 0 }}
                          className="flex w-6 h-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                          style={{ backgroundColor: colors.participant }}
                        >
                          {voter.avatar}
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
                <span className="text-sm font-bold" style={{ color: colors.poll }}>{percentage}%</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {total >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: colors.poll }}
          >
            <span>🎉</span> {t.winner}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 3. PACKING SUITCASE
// ============================================================================
export function PackingSuitcase({ autoPlay = true }: { autoPlay?: boolean }) {
  const items = [
    { Icon: Icons.Shirt, name: 'T-shirts', color: '#4ECDC4', startX: -60, startY: -40 },
    { Icon: Icons.Sunglasses, name: 'Lunettes', color: '#FF6B6B', startX: 80, startY: -30 },
    { Icon: Icons.Camera, name: 'Appareil', color: '#45B7D1', startX: -50, startY: 60 },
    { Icon: Icons.Utensils, name: 'Snacks', color: '#96CEB4', startX: 70, startY: 50 },
  ];
  const [packedItems, setPackedItems] = useState<number[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    const timers = items.map((_, i) =>
      setTimeout(() => setPackedItems((prev) => [...prev, i]), 600 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoPlay, items.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 to-rose-100 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.packing }}>
            <Icons.Luggage className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-800">My packing list</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-20 overflow-hidden rounded-full bg-slate-200">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: colors.packing }}
              animate={{ width: `${(packedItems.length / items.length) * 100}%` }}
            />
          </div>
          <span className="text-xs font-medium text-slate-600">{packedItems.length}/{items.length}</span>
        </div>
      </div>

      <div className="relative mx-auto mt-8 flex h-36 w-48 items-center justify-center">
        <motion.div
          className="absolute inset-0 rounded-2xl border-4"
          style={{ borderColor: colors.packing, backgroundColor: `${colors.packing}15` }}
          animate={packedItems.length === items.length ? { scale: [1, 1.05, 1] } : {}}
        >
          <div
            className="absolute -top-3 left-1/2 h-3 w-16 -translate-x-1/2 rounded-t-lg"
            style={{ backgroundColor: colors.packing }}
          />
          <div className="absolute left-4 right-4 top-1/2 h-0.5 -translate-y-1/2 bg-slate-300" />
        </motion.div>

        {items.map((item, i) => {
          const isPacked = packedItems.includes(i);
          return (
            <motion.div
              key={item.name}
              className="absolute flex w-12 h-12 items-center justify-center rounded-xl shadow-lg"
              style={{ backgroundColor: item.color }}
              initial={{ x: item.startX, y: item.startY, opacity: 0 }}
              animate={{
                x: isPacked ? 0 : item.startX,
                y: isPacked ? 0 : item.startY,
                scale: isPacked ? 0.6 : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.5 }}
            >
              <item.Icon className="w-6 h-6 text-white" />
            </motion.div>
          );
        })}

        <AnimatePresence>
          {packedItems.length === items.length && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -right-2 -top-2 flex w-8 h-8 items-center justify-center rounded-full bg-green-500 shadow-lg"
            >
              <Icons.Check className="w-5 h-5 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <motion.div
            key={item.name}
            className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs transition-all ${
              packedItems.includes(i) ? 'bg-green-100 text-green-700' : 'bg-white/60 text-slate-500'
            }`}
            animate={{ scale: packedItems.includes(i) ? [1, 1.1, 1] : 1 }}
          >
            {packedItems.includes(i) && <Icons.Check className="w-3 h-3" />}
            {item.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 4. BUDGET SPLIT
// ============================================================================
export function BudgetSplit({ autoPlay = true }: { autoPlay?: boolean }) {
  const friends = [
    { name: 'Marie', avatar: 'M', color: '#FF6B6B' },
    { name: 'Alex', avatar: 'A', color: '#4ECDC4' },
    { name: 'Sam', avatar: 'S', color: '#45B7D1' },
  ];
  const [showSplit, setShowSplit] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;
    const t1 = setTimeout(() => setShowSplit(true), 800);
    const t2 = setTimeout(() => setShowResult(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [autoPlay]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-amber-50 to-yellow-50 p-5">
      <div className="mb-6 flex items-center gap-2">
        <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.budget }}>
          <Icons.CreditCard className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-slate-800">Expense Splitting</span>
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6 text-center"
      >
        <div className="text-3xl font-bold" style={{ color: colors.budget }}>450€</div>
        <div className="text-xs text-slate-500">Restaurant dinner</div>
      </motion.div>

      <div className="relative flex items-center justify-center">
        <AnimatePresence>
          {!showSplit && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="flex w-16 h-16 items-center justify-center rounded-full shadow-xl"
              style={{ backgroundColor: colors.budget }}
            >
              <span className="text-xl font-bold text-white">€</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-8">
          {friends.map((friend, i) => (
            <motion.div
              key={friend.name}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={showSplit ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.2 }}
            >
              <motion.div
                initial={{ y: -40, opacity: 0, scale: 0 }}
                animate={showSplit ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.15, type: 'spring' }}
                className="rounded-full px-3 py-1 text-sm font-bold text-white shadow-lg"
                style={{ backgroundColor: colors.budget }}
              >
                150€
              </motion.div>
              <div
                className="flex w-12 h-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg"
                style={{ backgroundColor: friend.color }}
              >
                {friend.avatar}
              </div>
              <span className="text-xs text-slate-600">{friend.name}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: colors.budget }}
          >
            <Icons.Check className="w-4 h-4" />
            150€ each
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// 5. SWIPE EXPLORER
// ============================================================================
export function SwipeExplorer({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const headerLabel = lang === 'fr' ? 'Découvre Tokyo' : 'Explore Tokyo';
  const places = [
    { name: 'Senso-ji Temple', type: 'activity', rating: 4.9, color: colors.activities },
    { name: 'Ichiran Ramen', type: 'food', rating: 4.8, color: colors.food },
    { name: 'Park Hyatt Tokyo', type: 'hotel', rating: 4.7, color: colors.sleeping },
    { name: 'Shibuya Crossing', type: 'activity', rating: 4.6, color: colors.activities },
    { name: 'Tsukiji Market', type: 'food', rating: 4.9, color: colors.food },
    { name: 'Aman Tokyo', type: 'hotel', rating: 4.9, color: colors.sleeping },
  ];
  const [currentCard, setCurrentCard] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [cycle, setCycle] = useState(0);
  const swipeCountRef = React.useRef(0);

  // Continuous looping animation
  useEffect(() => {
    if (!autoPlay) return;

    // Reset to start
    setCurrentCard(0);
    setSwipeDirection(null);
    swipeCountRef.current = 0;

    // Deterministic pattern: right, right, left, right, right, right (repeats)
    const directions: Array<'right' | 'left'> = ['right', 'right', 'left', 'right', 'right', 'right'];

    const swipeInterval = setInterval(() => {
      const dir = directions[swipeCountRef.current % directions.length];
      swipeCountRef.current += 1;
      setSwipeDirection(dir);

      setTimeout(() => {
        setCurrentCard((prev) => {
          // Reset to 0 when all cards are swiped
          if (prev >= places.length - 1) {
            setCycle((c) => c + 1);
            return 0;
          }
          return prev + 1;
        });
        setSwipeDirection(null);
      }, 300);
    }, 1200);

    return () => clearInterval(swipeInterval);
  }, [autoPlay, places.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.primary }}>
          <Icons.MapPin className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-slate-800">{headerLabel}</span>
      </div>

      <div className="relative mx-auto h-40 w-full max-w-[200px]">
        {places.map((place, i) => {
          if (i < currentCard) return null;
          const isTop = i === currentCard;

          return (
            <motion.div
              key={`${cycle}-${place.name}`}
              className="absolute inset-0 overflow-hidden rounded-2xl bg-white shadow-xl"
              style={{ zIndex: places.length - i }}
              initial={{ scale: 1 - i * 0.05, y: i * 8 }}
              animate={{
                scale: 1 - (i - currentCard) * 0.05,
                y: (i - currentCard) * 8,
                x: isTop && swipeDirection === 'right' ? 200 : isTop && swipeDirection === 'left' ? -200 : 0,
                rotate: isTop && swipeDirection === 'right' ? 20 : isTop && swipeDirection === 'left' ? -20 : 0,
                opacity: isTop && swipeDirection ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-24 w-full flex items-center justify-center" style={{ backgroundColor: place.color }}>
                {place.type === 'activity' && <Icons.Heart className="w-10 h-10 text-white/60" />}
                {place.type === 'food' && <Icons.Utensils className="w-10 h-10 text-white/60" />}
                {place.type === 'hotel' && <Icons.Bed className="w-10 h-10 text-white/60" />}
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-800">{place.name}</span>
                <span className="text-xs text-slate-500">★ {place.rating}</span>
              </div>

              {isTop && swipeDirection === 'right' && (
                <div className="absolute left-4 top-4 rounded-lg border-2 border-green-500 bg-green-500/20 px-3 py-1">
                  <span className="font-bold text-green-600">LIKE</span>
                </div>
              )}
              {isTop && swipeDirection === 'left' && (
                <div className="absolute right-4 top-4 rounded-lg border-2 border-red-500 bg-red-500/20 px-3 py-1">
                  <span className="font-bold text-red-600">NOPE</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-6">
        <div className="flex w-12 h-12 items-center justify-center rounded-full border-2 border-red-300 bg-white shadow-lg">
          <Icons.X className="w-6 h-6 text-red-500" />
        </div>
        <div className="flex w-12 h-12 items-center justify-center rounded-full border-2 border-green-300 bg-white shadow-lg">
          <Icons.Heart className="w-6 h-6 text-green-500" />
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. TIMELINE CALENDAR
// ============================================================================
export function TimelineCalendar({ autoPlay = true }: { autoPlay?: boolean }) {
  const hours = ['09:00', '12:00', '15:00', '19:00'];
  const items = [
    { time: 0, name: 'Hotel checkout', Icon: Icons.Bed, color: colors.sleeping, duration: 1 },
    { time: 1, name: 'Ramen lunch', Icon: Icons.Utensils, color: colors.food, duration: 1 },
    { time: 2, name: 'Temple visit', Icon: Icons.Heart, color: colors.activities, duration: 2 },
  ];
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleItems((prev) => [...prev, i]), 600 + i * 600),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoPlay, items.length]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex w-7 h-7 items-center justify-center rounded-lg" style={{ backgroundColor: colors.primary }}>
            <span className="text-xs font-bold text-white">J3</span>
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-800">Mercredi 15</div>
            <div className="text-xs text-slate-500">Tokyo</div>
          </div>
        </div>
      </div>

      <div className="relative flex h-40">
        <div className="flex w-12 flex-col justify-between text-right">
          {hours.map((hour) => (
            <span key={hour} className="text-[10px] text-slate-400">{hour}</span>
          ))}
        </div>

        <div className="relative ml-2 flex-1 border-l border-slate-200">
          {hours.map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-dashed border-slate-100"
              style={{ top: `${(i / (hours.length - 1)) * 100}%` }}
            />
          ))}

          {items.map((item, i) => {
            const isVisible = visibleItems.includes(i);
            const top = (item.time / (hours.length - 1)) * 100;
            const height = (item.duration / (hours.length - 1)) * 100;

            return (
              <motion.div
                key={item.name}
                className="absolute left-2 right-2 overflow-hidden rounded-lg border-l-4"
                style={{
                  top: `${top}%`,
                  height: `${height}%`,
                  borderLeftColor: item.color,
                  backgroundColor: `${item.color}15`,
                }}
                initial={{ y: -50, opacity: 0, scale: 0.8 }}
                animate={isVisible ? { y: 0, opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', damping: 15 }}
              >
                <div className="flex h-full items-center gap-2 px-2">
                  <item.Icon className="w-4 h-4" style={{ color: item.color }} />
                  <span className="text-xs font-medium text-slate-700">{item.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 7. LIVE COLLABORATION
// ============================================================================
export function LiveCollaboration({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang = locale === 'fr' ? 'fr' : 'en';
  const t = lang === 'fr'
    ? {
        title: 'Collaboration en direct',
        typing: (name: string) => `${name} écrit`,
        added: (name: string, item: string) => `${name} a ajouté « ${item} »`,
        voted: (name: string, item: string) => `${name} a voté pour ${item}`,
      }
    : {
        title: 'Live Collaboration',
        typing: (name: string) => `${name} is typing`,
        added: (name: string, item: string) => `${name} added "${item}"`,
        voted: (name: string, item: string) => `${name} voted for ${item}`,
      };
  const users = [
    { name: 'Marie', color: '#FF6B6B', cursor: { x: 30, y: 40 } },
    { name: 'Alex', color: '#4ECDC4', cursor: { x: 70, y: 60 } },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-sky-50 to-cyan-50 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.participant }}>
            <Icons.Users className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-semibold text-slate-800">{t.title}</span>
        </div>
        <div className="flex -space-x-2">
          {users.map((user, i) => (
            <motion.div
              key={user.name}
              animate={autoPlay ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="flex w-7 h-7 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
              style={{ backgroundColor: user.color }}
            >
              {user.name[0]}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="relative h-32 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded bg-slate-200" />
          <div className="h-2 w-1/2 rounded bg-slate-200" />
          <div className="h-2 w-5/6 rounded bg-slate-200" />
          <div className="h-2 w-2/3 rounded bg-slate-200" />
        </div>

        {autoPlay && users.map((user, i) => (
          <motion.div
            key={user.name}
            className="absolute"
            style={{ left: `${user.cursor.x}%`, top: `${user.cursor.y}%` }}
            animate={{
              x: [0, 20 * (i === 0 ? 1 : -1), 0],
              y: [0, 15 * (i === 0 ? -1 : 1), 0],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
          >
            <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
              <path
                d="M1 1L1 15.5L5.5 11L10 19L12.5 17.5L8 9.5L14 8L1 1Z"
                fill={user.color}
                stroke="white"
                strokeWidth="1.5"
              />
            </svg>
            <div
              className="ml-3 mt-1 rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: user.color }}
            >
              {user.name}
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {autoPlay && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-slate-100 px-2 py-1"
            >
              <span className="text-[10px] text-slate-500">{t.typing(users[0].name)}</span>
              <div className="flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-1 rounded-full bg-slate-400"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 space-y-2">
        <AnimatePresence>
          {autoPlay && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: users[0].color }} />
                <span>{t.added(users[0].name, 'Senso-ji Temple')}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2 }}
                className="flex items-center gap-2 text-xs text-slate-500"
              >
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: users[1].color }} />
                <span>{t.voted(users[1].name, 'Kyoto')}</span>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ============================================================================
// 8. AI CHAT
// ============================================================================
export function AiChat({ autoPlay = true }: { autoPlay?: boolean }) {
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'ai'; text: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!autoPlay) return;

    const flow = [
      { delay: 500, action: () => setMessages([{ type: 'user', text: 'Find me a restaurant in Tokyo' }]) },
      { delay: 1200, action: () => setIsTyping(true) },
      { delay: 2800, action: () => { setIsTyping(false); setMessages((m) => [...m, { type: 'ai', text: 'I found 3 perfect restaurants for you! 🍜' }]); }},
    ];

    const timers = flow.map((step) => setTimeout(step.action, step.delay));
    return () => timers.forEach(clearTimeout);
  }, [autoPlay]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white">
      <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
        <div className="flex w-9 h-9 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
          <Icons.Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-800">Assistant IA</div>
          <div className="flex items-center gap-1">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-green-500"
            />
            <span className="text-xs text-slate-500">En ligne</span>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-hidden p-4">
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.type === 'ai' && (
                <div className="mr-2 flex w-7 h-7 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                  <Icons.Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                  msg.type === 'user' ? 'rounded-br-sm text-white' : 'rounded-bl-sm bg-slate-100 text-slate-700'
                }`}
                style={msg.type === 'user' ? { backgroundColor: colors.primary } : {}}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-2"
            >
              <div className="flex w-7 h-7 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
                <Icons.Sparkles className="w-4 h-4 text-white" />
              </div>
              <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-4 py-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-slate-400"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5">
          <span className="flex-1 text-sm text-slate-400">Message...</span>
          <div className="flex w-7 h-7 items-center justify-center rounded-full" style={{ backgroundColor: colors.primary }}>
            <Icons.Send className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 9. TRANSPORT JOURNEY
// ============================================================================
export function TransportJourney({ autoPlay = true }: { autoPlay?: boolean }) {
  const controls = useAnimation();

  useEffect(() => {
    if (autoPlay) {
      controls.start({
        x: [0, 180],
        transition: { duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 },
      });
    }
  }, [autoPlay, controls]);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 to-teal-800 p-5">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex w-8 h-8 items-center justify-center rounded-xl" style={{ backgroundColor: colors.transport }}>
          <Icons.Train className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="text-sm font-semibold text-white">Tokyo → Kyoto</div>
          <div className="text-xs text-white/60">Shinkansen · 2h15</div>
        </div>
      </div>

      <div className="relative mt-8 flex items-center justify-between px-4">
        <div className="flex flex-col items-center">
          <div className="flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-lg">🗼</span>
          </div>
          <span className="mt-2 text-xs font-medium text-white">Tokyo</span>
        </div>

        <div className="absolute left-16 right-16 top-5">
          <div className="h-1 w-full rounded-full bg-white/20" />
          <motion.div
            className="absolute left-0 top-0 h-1 rounded-full"
            style={{ backgroundColor: colors.mint }}
            animate={autoPlay ? { width: ['0%', '100%'] } : {}}
            transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1 }}
          />
          <motion.div animate={controls} className="absolute -top-3 left-0">
            <div className="flex w-8 h-8 items-center justify-center rounded-lg bg-white shadow-lg">
              <Icons.Train className="w-5 h-5" style={{ color: colors.transport }} />
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center">
          <div className="flex w-10 h-10 items-center justify-center rounded-full bg-white shadow-lg">
            <span className="text-lg">⛩️</span>
          </div>
          <span className="mt-2 text-xs font-medium text-white">Kyoto</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={autoPlay ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-10 flex justify-center gap-6"
      >
        <div className="text-center">
          <div className="text-lg font-bold text-white">14:30</div>
          <div className="text-xs text-white/60">Departure</div>
        </div>
        <div className="flex items-center gap-1 text-white/40">
          <div className="h-px w-8 bg-white/40" />
          <span className="text-xs">2h15</span>
          <div className="h-px w-8 bg-white/40" />
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-white">16:45</div>
          <div className="text-xs text-white/60">Arrival</div>
        </div>
      </motion.div>
    </div>
  );
}

// ============================================================================
// 10. HERO PULSE CTA
// ============================================================================
export function HeroPulseCta({ autoPlay = true }: { autoPlay?: boolean }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-3xl" style={{ backgroundColor: colors.dark }}>
      <motion.div
        animate={autoPlay ? { x: [0, 15, 0], y: [0, -10, 0], scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute -left-10 top-5 w-28 h-28 rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.primary}40` }}
      />
      <motion.div
        animate={autoPlay ? { x: [0, -10, 0], y: [0, 15, 0] } : {}}
        transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
        className="absolute -right-10 bottom-10 w-24 h-24 rounded-full blur-3xl"
        style={{ backgroundColor: `${colors.mint}40` }}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={autoPlay ? { scale: 1, rotate: 0 } : {}}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          className="mb-5 flex w-14 h-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: colors.primary }}
        >
          <Icons.Globe className="w-7 h-7 text-white" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={autoPlay ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-xl font-bold font-unbounded" style={{ color: colors.cream }}>
            Plan together
          </h2>
          <p className="mt-1 text-sm" style={{ color: `${colors.cream}70` }}>
            Travel stress-free
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={autoPlay ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1 }}
          className="relative mt-6"
        >
          <motion.div
            animate={autoPlay ? { scale: [1, 1.5], opacity: [0.4, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <motion.div
            animate={autoPlay ? { scale: [1, 1.8], opacity: [0.3, 0] } : {}}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
            className="absolute inset-0 rounded-full"
            style={{ backgroundColor: colors.primary }}
          />
          <button
            className="relative rounded-full px-6 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: colors.primary, color: colors.cream }}
          >
            Get started free
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================
export const FeatureAnimations = {
  AiGlobeJourney,
  LiveVoting,
  PackingSuitcase,
  BudgetSplit,
  SwipeExplorer,
  TimelineCalendar,
  LiveCollaboration,
  AiChat,
  TransportJourney,
  HeroPulseCta,
};

export default FeatureAnimations;
