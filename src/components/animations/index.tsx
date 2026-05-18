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

// Same provider keys as POLL_PROVIDER_LOGO + the transport-specific
// partners from frontend/components/affiliation-partner.tsx partnersMap.
type ExplorerProvider = 'booking' | 'airbnb' | 'getyourguide' | 'viator' | 'eurostar' | 'sncf' | 'airfrance' | 'custom';

// Provider logos — `src` points to the actual /affiliates/ assets shipped on
// the live app. For providers without a logo file (eurostar, sncf), we fall
// back to a brand-colored circle so nothing ever renders as a broken image.
interface ExplorerProviderBadge {
  src?: string;
  name: string;
  bg: string;
  fg: string;
  abbr: string;
}

const EXPLORER_PROVIDER_LOGO: Record<ExplorerProvider, ExplorerProviderBadge> = {
  booking: { src: '/affiliates/booking-logo.svg', name: 'Booking.com', bg: '#003B95', fg: '#FFFFFF', abbr: 'B.' },
  airbnb: { src: '/affiliates/airbnb-logo.webp', name: 'Airbnb', bg: '#FF385C', fg: '#FFFFFF', abbr: 'A' },
  getyourguide: { src: '/affiliates/getyourguide.png', name: 'GetYourGuide', bg: '#F8A800', fg: '#FFFFFF', abbr: 'GYG' },
  viator: { src: '/affiliates/viator.png', name: 'Viator', bg: '#3CB6A2', fg: '#FFFFFF', abbr: 'V' },
  // Eurostar + SNCF: no logo file shipped on the app side, brand-colored circle
  eurostar: { name: 'Eurostar', bg: '#FFD200', fg: '#0F172A', abbr: 'ES' },
  sncf: { name: 'SNCF', bg: '#1E2D75', fg: '#FFFFFF', abbr: 'SNCF' },
  airfrance: { src: '/affiliates/airfrance-logo.webp', name: 'Air France', bg: '#002157', fg: '#FFFFFF', abbr: 'AF' },
  custom: { src: '/logo.webp', name: 'WePlanify', bg: '#F6391A', fg: '#FFFFFF', abbr: 'W' },
};

interface ExplorerSuggestion {
  title: string;
  city: string;
  price: string;
  rating: number | null;
  // Real photo (Unsplash) — mirrors the actual Explorer card thumbnail.
  image: string;
  imageAlt: string;
  // Real affiliate provider — same set the live explorer-item-card uses.
  provider: ExplorerProvider;
  // Optional badges mirroring is_selected (dates pill, z-20) and is_booked
  // (green pill, top-left) on the live explorer-item-card.tsx.
  selectedDates?: string;
  booked?: boolean;
  // Real-world coordinates so the right-side Mapbox tile can drop one pin
  // per item, like the live explorer.desktop.view.tsx map pane.
  lon: number;
  lat: number;
}

interface ExplorerCategoryData {
  suggestions: ExplorerSuggestion[];
  // Mapbox tile center for the category — same for all 3 suggestions in it.
  map: { lon: number; lat: number; zoom: number };
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

const EXPLORER_PHOTO = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=480&h=320&q=70&auto=format&fit=crop`;

// 4 items per category — values trimmed to ones that match a typical
// Booking / GetYourGuide / Viator / Google Places listing in Paris. The
// first hotel carries a Selected-dates pill and the second is marked
// Booked, mirroring how the real list looks once a trip is being built.
const EXPLORER_CARDS: Record<ExplorerCategoryKey, ExplorerCategoryData> = {
  activity: {
    suggestions: [
      { title: 'Tour Eiffel — billet 2e étage', city: 'Paris 7e', price: '29€', rating: 4.8, image: EXPLORER_PHOTO('1502602898657-3e91760cbb34'), imageAlt: 'Eiffel Tower', provider: 'getyourguide', lon: 2.2945, lat: 48.8584 },
      { title: 'Musée du Louvre — billet daté', city: 'Paris 1er', price: '22€', rating: 4.7, image: EXPLORER_PHOTO('1565967511849-76a60a516170'), imageAlt: 'Louvre museum', provider: 'viator', lon: 2.3376, lat: 48.8606 },
      { title: 'Croisière commentée sur la Seine', city: 'Bateaux Parisiens', price: '15€', rating: 4.5, image: EXPLORER_PHOTO('1564501049412-61c2a3083791'), imageAlt: 'Seine river cruise', provider: 'getyourguide', lon: 2.3027, lat: 48.8614 },
      { title: 'Sainte-Chapelle — billet daté', city: 'Île de la Cité', price: '13€', rating: 4.6, image: EXPLORER_PHOTO('1499856871958-5b9627545d1a'), imageAlt: 'Sainte Chapelle', provider: 'getyourguide', lon: 2.3450, lat: 48.8554 },
    ],
    map: { lon: 2.3404, lat: 48.8584, zoom: 12 },
  },
  restaurant: {
    suggestions: [
      { title: 'L’Ambroisie', city: 'Le Marais · gastronomique', price: '€€€', rating: 4.9, image: EXPLORER_PHOTO('1551218808-94e220e084d2'), imageAlt: 'Fine dining', provider: 'custom', lon: 2.3622, lat: 48.8552 },
      { title: 'Le Petit Bistrot', city: 'Paris 11e · français', price: '€€', rating: 4.6, image: EXPLORER_PHOTO('1414235077428-338989a2e8c0'), imageAlt: 'Bistrot', provider: 'custom', lon: 2.3747, lat: 48.8636 },
      { title: 'Marché des Enfants Rouges', city: 'Paris 3e · marché couvert', price: '€', rating: 4.5, image: EXPLORER_PHOTO('1517248135467-4c7edcad34c4'), imageAlt: 'Market food', provider: 'custom', lon: 2.3613, lat: 48.8639 },
      { title: 'Du Pain et des Idées', city: 'Paris 10e · boulangerie', price: '€', rating: 4.8, image: EXPLORER_PHOTO('1543353071-873f17a7a088'), imageAlt: 'Bakery', provider: 'custom', lon: 2.3636, lat: 48.8694 },
    ],
    map: { lon: 2.3645, lat: 48.8615, zoom: 13 },
  },
  hotel: {
    suggestions: [
      { title: 'Hôtel du Louvre', city: 'Paris 1er · 5★', price: '180€/n', rating: 4.4, image: EXPLORER_PHOTO('1611892440504-42a792e24d32'), imageAlt: 'Hotel room', provider: 'booking', selectedDates: '15 → 17 mai', lon: 2.3376, lat: 48.8627 },
      { title: 'Hôtel Particulier Montmartre', city: 'Paris 18e · boutique', price: '320€/n', rating: 4.7, image: EXPLORER_PHOTO('1551836022-d5d88e9218df'), imageAlt: 'Boutique hotel', provider: 'booking', booked: true, lon: 2.3401, lat: 48.8852 },
      { title: 'Loft Canal Saint-Martin', city: 'Paris 10e · entier', price: '120€/n', rating: 4.5, image: EXPLORER_PHOTO('1606046604972-77cc76aee944'), imageAlt: 'Loft', provider: 'airbnb', lon: 2.3667, lat: 48.8744 },
      { title: 'Generator Paris', city: 'Paris 10e · auberge', price: '45€/n', rating: 4.0, image: EXPLORER_PHOTO('1568084680786-a84f91d1153c'), imageAlt: 'Hostel', provider: 'booking', lon: 2.3603, lat: 48.8826 },
    ],
    map: { lon: 2.3376, lat: 48.8627, zoom: 12 },
  },
  transport: {
    suggestions: [
      { title: 'Eurostar Paris → London', city: '2h 16min · Gare du Nord', price: '95€', rating: null, image: EXPLORER_PHOTO('1474487548417-781cb71495f3'), imageAlt: 'Eurostar train', provider: 'eurostar', lon: 2.3553, lat: 48.8809 },
      { title: 'TGV INOUI Paris → Lyon', city: '1h 56min · Gare de Lyon', price: '45€', rating: null, image: EXPLORER_PHOTO('1543339308-43e59d6b73a6'), imageAlt: 'TGV train', provider: 'sncf', lon: 2.3733, lat: 48.8444 },
      { title: 'Air France Paris → Nice', city: '1h 35min · CDG → NCE', price: '78€', rating: null, image: EXPLORER_PHOTO('1542314831-068cd1dbfeeb'), imageAlt: 'Air France plane', provider: 'airfrance', lon: 2.5479, lat: 49.0097 },
      { title: 'Carnet 10 tickets t+', city: 'Paris · RATP', price: '17,35€', rating: null, image: EXPLORER_PHOTO('1551183053-bf91a1d81141'), imageAlt: 'Paris métro', provider: 'custom', lon: 2.3470, lat: 48.8584 },
    ],
    // Pin centered on Paris with CDG visible northeast for the Air France item.
    map: { lon: 2.4500, lat: 48.9100, zoom: 9 },
  },
};

const MAPBOX_STATIC_URL = (
  pins: { lon: number; lat: number }[],
  center: { lon: number; lat: number; zoom: number },
  width = 320,
  height = 240,
) => {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '';
  // Multi-pin overlay: one f6391a marker per suggestion, mirroring the real
  // explorer.desktop.view.tsx Mapbox pane which renders an item per pin.
  const pinStr = pins.map((p) => `pin-s+f6391a(${p.lon},${p.lat})`).join(',');
  return `https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/${pinStr}/${center.lon},${center.lat},${center.zoom},0/${width}x${height}@2x?access_token=${token}`;
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
    // Each cycle: ~4s per filter — long enough to read all 4 cards.
    const addTimer = setTimeout(() => setAdded(true), 2800);
    const nextTimer = setTimeout(() => {
      setAdded(false);
      setActiveFilter((prev) => {
        const i = EXPLORER_FILTER_KEYS.indexOf(prev);
        return EXPLORER_FILTER_KEYS[(i + 1) % EXPLORER_FILTER_KEYS.length];
      });
    }, 4200);
    return () => {
      clearTimeout(addTimer);
      clearTimeout(nextTimer);
    };
  }, [activeFilter, isPlaying]);

  const category = EXPLORER_CARDS[activeFilter];

  return (
    <div
      className="relative min-h-[280px] lg:min-h-[420px] h-full w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-white p-4 lg:p-5 border border-slate-200/60"
      onMouseEnter={() => setIsPlaying(true)}
    >
      {/* Preload every suggestion thumbnail so cycle frames don't flash empty. */}
      <div aria-hidden className="hidden">
        {EXPLORER_FILTER_KEYS.flatMap((k) =>
          EXPLORER_CARDS[k].suggestions.map((s, i) => (
            <img key={`${k}-${i}`} src={s.image} alt="" loading="eager" />
          ))
        )}
      </div>

      {/* Type switcher — pill-rounded tabs (rounded-full container + items)
          mirroring the real Explorer's Tabs component. */}
      <div className="relative z-10 mb-3 lg:mb-4 inline-flex items-center gap-0.5 rounded-full bg-slate-100 p-1">
        {EXPLORER_FILTERS.map((f) => {
          const Icon = Icons[f.icon];
          const isActive = f.key === activeFilter;
          return (
            <motion.div
              key={f.key}
              animate={{ backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0)' }}
              transition={{ duration: 0.2 }}
              className={`flex items-center gap-1.5 rounded-full px-2 lg:px-3 py-1 transition-shadow ${
                isActive ? 'shadow-sm' : ''
              }`}
            >
              <Icon className={`w-3 h-3 ${isActive ? 'text-slate-900' : 'text-slate-500'}`} />
              <span className={`text-[11px] font-medium ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                {f.label[lang]}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-3 lg:gap-4 items-stretch">
        {/* Suggestion grid — mirrors explorer.desktop.view.tsx's
            sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 vertical-card layout.
            Each card is image-top / content-below like explorer-item-card.tsx. */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="grid grid-cols-2 gap-2 lg:gap-2.5 content-start"
          >
            {category.suggestions.map((sugg, idx) => {
              // Only the headliner (first card) plays the +→✓ animation.
              const isHeadliner = idx === 0;
              const showAdded = isHeadliner && added;
              const providerLogo = EXPLORER_PROVIDER_LOGO[sugg.provider];
              return (
                <motion.div
                  key={`${activeFilter}-${idx}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, type: 'spring', stiffness: 320, damping: 28 }}
                  className={`flex flex-col rounded-3xl overflow-hidden bg-white shadow-sm transition-all duration-200 border ${
                    sugg.booked
                      ? 'border-emerald-500/40'
                      : isHeadliner
                        ? 'border-slate-200'
                        : 'border-slate-200'
                  }`}
                >
                  {/* Thumbnail — rounded-t-3xl, taller h-28 lg:h-32, badges
                      overlaid per explorer-item-card.tsx (z layers preserved). */}
                  <div className="relative h-28 lg:h-32 bg-slate-100">
                    <img
                      src={sugg.image}
                      alt={sugg.imageAlt}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="eager"
                      decoding="async"
                    />

                    {/* Selected-dates pill (z-20, top-left) — appears when an
                        explorer item is locked onto specific event days. */}
                    {sugg.selectedDates && (
                      <div className="absolute top-1.5 left-1.5 z-20 flex items-center gap-0.5 rounded-full bg-black/65 backdrop-blur-sm px-1.5 py-0.5">
                        <Icons.Calendar className="w-2.5 h-2.5 text-white" />
                        <span className="text-[9px] font-semibold text-white">{sugg.selectedDates}</span>
                      </div>
                    )}

                    {/* Booked pill (top-left) — green success badge from is_booked */}
                    {sugg.booked && (
                      <div className="absolute top-1.5 left-1.5 z-10 flex items-center gap-0.5 rounded-full bg-emerald-500/85 px-1.5 py-0.5">
                        <Icons.Check className="w-2.5 h-2.5 text-white" />
                        <span className="text-[9px] font-semibold text-white">{lang === 'fr' ? 'Réservé' : 'Booked'}</span>
                      </div>
                    )}

                    {/* Rating badge (top-left, stacks below dates if both present) */}
                    {sugg.rating != null && !sugg.booked && !sugg.selectedDates && (
                      <div className="absolute top-1.5 left-1.5 flex items-center gap-0.5 rounded-full bg-black/45 backdrop-blur-sm px-1.5 py-0.5">
                        <span className="text-[8px]">⭐</span>
                        <span className="text-[9px] font-semibold text-white">{sugg.rating}</span>
                      </div>
                    )}

                    {/* +/check button top-right (z-30 like the live card) */}
                    <motion.div
                      key={`btn-${activeFilter}-${idx}-${showAdded}`}
                      animate={showAdded || sugg.booked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute top-1.5 right-1.5 z-30"
                    >
                      <div
                        className="flex w-6 h-6 items-center justify-center rounded-full backdrop-blur-sm transition-colors"
                        style={{
                          backgroundColor: sugg.booked
                            ? 'rgba(16,185,129,0.85)'
                            : showAdded
                              ? colors.mintDark
                              : 'rgba(0,0,0,0.45)',
                        }}
                      >
                        {sugg.booked || showAdded ? (
                          <Icons.Check className="w-3 h-3 text-white" />
                        ) : (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" x2="12" y1="5" y2="19" />
                            <line x1="5" x2="19" y1="12" y2="12" />
                          </svg>
                        )}
                      </div>
                    </motion.div>

                    {/* Provider affiliate badge bottom-left (z-20) — real
                        WrapperAffiliationPartner min variant: black/50 pill
                        wrapping a circular logo, with a brand-colored circle
                        fallback for partners without a logo file shipped. */}
                    <div className="absolute bottom-1.5 left-1.5 z-20">
                      <span className="inline-flex items-center rounded-full bg-black/55 p-0.5 ring-1 ring-white/10">
                        {providerLogo.src ? (
                          <img
                            src={providerLogo.src}
                            alt={providerLogo.name}
                            className="w-4 h-4 rounded-full object-cover bg-white"
                            loading="eager"
                          />
                        ) : (
                          <span
                            className="flex w-4 h-4 items-center justify-center rounded-full text-[7px] font-bold leading-none"
                            style={{ backgroundColor: providerLogo.bg, color: providerLogo.fg }}
                            aria-label={providerLogo.name}
                          >
                            {providerLogo.abbr}
                          </span>
                        )}
                      </span>
                    </div>

                    {/* Fly-to map button bottom-right (z-30) */}
                    <div className="absolute bottom-1.5 right-1.5 z-30 flex w-5 h-5 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm">
                      <Icons.MapPin className="w-2.5 h-2.5 text-white" />
                    </div>
                  </div>

                  {/* Content below image */}
                  <div className="px-2 py-1.5 lg:px-2.5 lg:py-2">
                    <p className="text-[11px] lg:text-[12px] font-semibold text-slate-900 truncate leading-tight">
                      {sugg.title}
                    </p>
                    <div className="mt-0.5 flex items-center justify-between gap-1">
                      <span className="text-[9px] lg:text-[10px] text-slate-500 truncate">{sugg.city}</span>
                      <span className="text-[10px] lg:text-[11px] font-bold text-slate-900 shrink-0">{sugg.price}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Mapbox dark-v11 panel — real static tiles, mirroring the real
            Explorer's light-list / dark-map split. */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg bg-slate-900 min-h-[200px] lg:min-h-0">
          {/* Preload all 4 map tiles so cycle frames swap instantly. */}
          <div aria-hidden className="hidden">
            {EXPLORER_FILTER_KEYS.map((k) => {
              const cat = EXPLORER_CARDS[k];
              return <img key={k} src={MAPBOX_STATIC_URL(cat.suggestions, cat.map)} alt="" loading="eager" />;
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.img
              key={activeFilter}
              src={MAPBOX_STATIC_URL(category.suggestions, category.map)}
              alt={`Map — ${activeFilter}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Suggestion count label (mirrors the real Explorer's '(N) results' label) */}
          <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-sm px-2 py-0.5">
            <Icons.MapPin className="w-3 h-3 text-white" />
            <span className="text-[10px] font-medium text-white">{category.suggestions.length} {EXPLORER_FILTERS.find(f => f.key === activeFilter)?.label[lang]}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Back-compat alias: StackingCards still imports AiGlobeJourney by name.
export const AiGlobeJourney = ExplorerCards;

// ============================================================================
// 2. LIVE VOTING — faithful reproduction of polls.view.tsx article + the
// EventItemChoiceOption default variant + the footer action row, matching
// the real app's spacing, colors and badge contracts.
// ============================================================================
type PollProvider = 'booking' | 'airbnb' | 'getyourguide' | 'viator' | 'custom';

interface PollChoice {
  title: string;
  description: string;
  city: string;
  rating: number;
  price: string;
  provider: PollProvider;
  image: string;
  isUserVote?: boolean;
}

// Mirrors partnersMap in frontend/components/affiliation-partner.tsx — same
// real provider logos served from /affiliates/, same circular-min layout.
const POLL_PROVIDER_LOGO: Record<PollProvider, { src: string; name: string }> = {
  booking: { src: '/affiliates/booking-logo.svg', name: 'Booking.com' },
  airbnb: { src: '/affiliates/airbnb-logo.webp', name: 'Airbnb' },
  getyourguide: { src: '/affiliates/getyourguide.png', name: 'GetYourGuide' },
  viator: { src: '/affiliates/viator.png', name: 'Viator' },
  custom: { src: '/logo.webp', name: 'WePlanify' },
};

// Real theme colors from globals.css → reused so the mockup carries the same
// surfaces as the live app (sleeping = teal, amber for vote-now, etc.).
const SLEEPING_COLOR = '#14B8A6';
const AMBER_COLOR = '#D97706';

const POLL_CHOICES_FR: PollChoice[] = [
  { title: 'Hôtel Bairro Alto', description: 'Boutique hotel · vue ville', city: 'Lisbonne', rating: 4.6, price: '145€/nuit', provider: 'booking', image: EXPLORER_PHOTO('1611892440504-42a792e24d32'), isUserVote: true },
  { title: 'Príncipe Real Loft', description: 'Appartement entier · 4 voyageurs', city: 'Lisbonne', rating: 4.4, price: '95€/nuit', provider: 'airbnb', image: EXPLORER_PHOTO('1551776235-dde6d482980b') },
  { title: 'Lisbon Lounge Hostel', description: 'Auberge · centre-ville', city: 'Lisbonne', rating: 4.0, price: '35€/nuit', provider: 'booking', image: EXPLORER_PHOTO('1568084680786-a84f91d1153c') },
];

const POLL_CHOICES_EN: PollChoice[] = [
  { title: 'Hôtel Bairro Alto', description: 'Boutique hotel · city view', city: 'Lisbon', rating: 4.6, price: '$145/night', provider: 'booking', image: EXPLORER_PHOTO('1611892440504-42a792e24d32'), isUserVote: true },
  { title: 'Príncipe Real Loft', description: 'Entire apartment · 4 travellers', city: 'Lisbon', rating: 4.4, price: '$95/night', provider: 'airbnb', image: EXPLORER_PHOTO('1551776235-dde6d482980b') },
  { title: 'Lisbon Lounge Hostel', description: 'Hostel · downtown', city: 'Lisbon', rating: 4.0, price: '$35/night', provider: 'booking', image: EXPLORER_PHOTO('1568084680786-a84f91d1153c') },
];

interface PollVoter { id: number; option: number; }
const POLL_VOTERS_SCRIPT: PollVoter[] = [
  { id: 1, option: 0 },
  { id: 2, option: 0 },
  { id: 3, option: 1 },
  { id: 4, option: 0 },
  { id: 5, option: 1 },
];

export function LiveVoting({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang: 'en' | 'fr' = locale === 'fr' ? 'fr' : 'en';
  const t = lang === 'fr'
    ? {
        question: 'Où dormir à Lisbonne ?',
        category: 'Hébergement',
        creator: 'Marie',
        createdLabel: 'Créé le',
        endsLabel: 'Termine le',
        createdDate: '14 mai',
        endsDate: '20 mai',
        dayRange: '15 → 17 mai',
        status: 'Voter maintenant',
        single: 'Choix unique',
        options: 'options',
        yourVote: 'Votre vote',
        votes: 'votes',
        vote: 'vote',
        sendReminders: 'Rappels',
        seeOnTimeline: 'Timeline',
        comments: 'Commentaires',
        details: 'Détails',
      }
    : {
        question: 'Where to stay in Lisbon?',
        category: 'Accommodation',
        creator: 'Marie',
        createdLabel: 'Created on',
        endsLabel: 'Ends on',
        createdDate: 'May 14',
        endsDate: 'May 20',
        dayRange: 'May 15 → 17',
        status: 'Vote now',
        single: 'Single choice',
        options: 'options',
        yourVote: 'Your vote',
        votes: 'votes',
        vote: 'vote',
        sendReminders: 'Reminders',
        seeOnTimeline: 'Timeline',
        comments: 'Comments',
        details: 'Details',
      };

  const choices = lang === 'fr' ? POLL_CHOICES_FR : POLL_CHOICES_EN;
  const [voters, setVoters] = useState<PollVoter[]>([]);

  useEffect(() => {
    if (!autoPlay) return;
    const timers = POLL_VOTERS_SCRIPT.map((v, i) =>
      setTimeout(() => {
        setVoters((prev) => (prev.find((p) => p.id === v.id) ? prev : [...prev, v]));
      }, 500 + i * 500),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoPlay]);

  const totalVotes = voters.length;
  const totalParticipants = 5;
  const denominator = totalVotes || 1;
  const votesByOption = choices.map((_, i) => voters.filter((v) => v.option === i).length);

  return (
    // Article wrapper — bg-card, rounded-3xl, border, shadow-xs hover:shadow-md
    <div className="relative h-full min-h-[280px] lg:min-h-[460px] w-full overflow-hidden rounded-3xl bg-white border border-slate-200/80 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      {/* Header — px-5 pt-5, avatar + creator info + badges row */}
      <div className="flex items-start justify-between px-4 lg:px-5 pt-4 lg:pt-5">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar h-10 w-10 ring-2 ring-background — real Avatar + AvatarImage from the app */}
          <div className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&q=80&fit=crop"
              alt={t.creator}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-[13px] font-semibold text-slate-900 truncate">{t.creator}</p>
            {/* Created · Ends · Day range row */}
            <div className="flex items-center gap-1.5 text-[10px] text-slate-500 mt-0.5 flex-wrap">
              <Icons.Calendar className="w-2.5 h-2.5 shrink-0" />
              <span>{t.createdLabel} {t.createdDate}</span>
              <span className="text-slate-300">•</span>
              <span>{t.endsLabel} {t.endsDate}</span>
              <span className="text-slate-300">•</span>
              {/* Day-range badge — primary color, only renders when the poll is linked to event days */}
              <span className="font-medium" style={{ color: colors.primary }}>{t.dayRange}</span>
            </div>
          </div>
        </div>

        {/* Right badges: category + status + menu */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Category badge — sleeping color */}
          <span
            className="inline-flex items-center gap-1 rounded-full border px-1.5 lg:px-2 py-0.5 text-[10px] font-medium"
            style={{ borderColor: `${SLEEPING_COLOR}4D`, backgroundColor: `${SLEEPING_COLOR}1A`, color: SLEEPING_COLOR }}
          >
            <Icons.Bed className="w-2.5 h-2.5" />
            <span className="hidden lg:inline">{t.category}</span>
          </span>
          {/* Status badge — amber "Vote now" with AlertCircle */}
          <span
            className="inline-flex items-center gap-1 rounded-full border px-1.5 lg:px-2 py-0.5 text-[10px] font-medium"
            style={{ borderColor: `${AMBER_COLOR}4D`, backgroundColor: `${AMBER_COLOR}1A`, color: AMBER_COLOR }}
          >
            <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{t.status}</span>
          </span>
          {/* 3-dots menu */}
          <button className="flex w-6 h-6 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100" aria-label="More">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="5" r="1.5" />
              <circle cx="12" cy="12" r="1.5" />
              <circle cx="12" cy="19" r="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Question section — px-5 py-4 */}
      <div className="px-4 lg:px-5 py-3">
        <h3 className="text-[15px] lg:text-base font-semibold text-slate-900 leading-snug">{t.question}</h3>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {t.single}
          </span>
          <span className="text-[10px] text-slate-500">{choices.length} {t.options}</span>
        </div>
      </div>

      {/* Choices section — px-5 stacked */}
      <div className="px-4 lg:px-5 space-y-2">
        {choices.map((choice, i) => {
          const votesForChoice = votesByOption[i];
          const percentage = Math.round((votesForChoice / denominator) * 100);
          const providerLogo = POLL_PROVIDER_LOGO[choice.provider];
          const isUserVote = !!choice.isUserVote;

          return (
            <div
              key={choice.title}
              className="relative overflow-hidden rounded-xl border bg-white"
              style={{ borderColor: isUserVote ? `${colors.poll}80` : '#E2E8F0', borderWidth: isUserVote ? '2px' : '1px' }}
            >
              {/* Choice body */}
              <div className="flex gap-2.5 p-2.5">
                {/* Checkbox */}
                <div className="pt-1 shrink-0">
                  <div
                    className="flex w-4 h-4 items-center justify-center rounded-full border-[1.5px] transition-colors"
                    style={{
                      backgroundColor: isUserVote ? colors.poll : 'transparent',
                      borderColor: isUserVote ? colors.poll : 'rgba(100,116,139,0.4)',
                    }}
                  >
                    {isUserVote && <Icons.Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                </div>

                {/* Wide landscape thumbnail h-16 lg:h-20 w-24 lg:w-28 */}
                <div className="relative h-16 lg:h-20 w-20 lg:w-28 shrink-0 rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5">
                  <img src={choice.image} alt={choice.title} className="absolute inset-0 w-full h-full object-cover" loading="eager" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h4 className="text-[12px] font-semibold text-slate-900 truncate leading-tight">{choice.title}</h4>
                    {isUserVote && (
                      <span className="text-[9px] font-medium" style={{ color: `${colors.poll}B3` }}>
                        {t.yourVote}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] italic text-slate-500 line-clamp-1">{choice.description}</p>

                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-0.5 text-slate-600">
                      <Icons.MapPin className="w-3 h-3 text-slate-400" />
                      <span>{choice.city}</span>
                    </div>
                    <div className="flex items-center gap-0.5">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="#FACC15" stroke="#FACC15" strokeWidth="1">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="font-medium text-slate-700">{choice.rating}/5</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    {/* Provider logo — real WrapperAffiliationPartner min variant: black/50 pill with circular logo */}
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/60 pl-0 pr-2 py-0">
                      <img
                        src={providerLogo.src}
                        alt={providerLogo.name}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-white/20"
                        loading="eager"
                      />
                      <span className="text-[8px] font-medium text-white leading-none">{providerLogo.name}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600">{choice.price}</span>
                  </div>
                </div>

                {/* Right: percentage + vote count */}
                <div className="flex flex-col items-end shrink-0 ml-2">
                  <span className="text-[14px] font-bold leading-none" style={{ color: isUserVote ? colors.poll : '#0F172A' }}>
                    {percentage}%
                  </span>
                  <span className="text-[9px] text-slate-500 mt-1">
                    {votesForChoice} {votesForChoice === 1 ? t.vote : t.votes}
                  </span>
                </div>
              </div>

              {/* Padded bottom progress bar — px-3 pb-2.5, h-1.5 in rounded muted container */}
              <div className="px-3 pb-2.5">
                <div className="h-1.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: 'rgba(148,163,184,0.2)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isUserVote ? colors.poll : 'rgba(100,116,139,0.4)' }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer — border-t, px-5 py-3, votes count left + action buttons right */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 px-4 lg:px-5 py-2.5">
        <span className="flex items-center gap-1 text-[11px] text-slate-500">
          <Icons.Users className="w-3.5 h-3.5" />
          <span className="font-medium text-slate-700">{totalVotes}</span>
          <span className="text-slate-300">/</span>
          <span>{totalParticipants}</span>
          <span>{totalVotes !== 1 ? t.votes : t.vote}</span>
        </span>
        <div className="flex items-center gap-0.5">
          {/* Send Reminders */}
          <button className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] text-slate-600 hover:bg-slate-100" aria-label={t.sendReminders}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="hidden lg:inline">{t.sendReminders}</span>
          </button>
          {/* Timeline */}
          <button className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] text-slate-600 hover:bg-slate-100" aria-label={t.seeOnTimeline}>
            <Icons.Calendar className="w-3 h-3" />
            <span className="hidden lg:inline">{t.seeOnTimeline}</span>
          </button>
          {/* Comments with unread badge */}
          <button className="relative flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] text-slate-600 hover:bg-slate-100" aria-label={t.comments}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="hidden lg:inline">{t.comments}</span>
            <span className="absolute -top-0.5 -right-0.5 flex h-3 min-w-3 items-center justify-center rounded-full px-0.5 text-[8px] font-bold text-white" style={{ backgroundColor: colors.primary }}>
              2
            </span>
          </button>
          {/* Details */}
          <button className="flex h-6 items-center gap-1 rounded-md px-1.5 text-[10px] text-slate-600 hover:bg-slate-100" aria-label={t.details}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6" />
              <line x1="8" y1="12" x2="21" y2="12" />
              <line x1="8" y1="18" x2="21" y2="18" />
              <line x1="3" y1="6" x2="3.01" y2="6" />
              <line x1="3" y1="12" x2="3.01" y2="12" />
              <line x1="3" y1="18" x2="3.01" y2="18" />
            </svg>
            <span className="hidden lg:inline">{t.details}</span>
          </button>
        </div>
      </div>
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
// 7. ITINERARY DAY — mirrors the real day-by-day-calendar:
// day-nav header → hour rail on the left → color-coded item cards positioned
// vertically by time, each with the same accent-border + icon contract as the
// app's timeline-items (activity / food / sleeping / transport).
// Exported as LiveCollaboration for backwards compat with StackingCards.
// ============================================================================
type ItineraryKind = 'transport' | 'activity' | 'food' | 'sleeping';

interface ItineraryItem {
  kind: ItineraryKind;
  title: string;
  subtitle?: string;
  startHour: number;
  endHour: number;
  participants: string[];
  booked?: boolean;
}

const ITINERARY_KIND_STYLE: Record<ItineraryKind, { color: string; bg: string; icon: keyof typeof Icons }> = {
  transport: { color: '#0EA5E9', bg: '#E0F2FE', icon: 'Train' },
  activity: { color: '#F59E0B', bg: '#FEF3C7', icon: 'Camera' },
  food: { color: '#F97316', bg: '#FFEDD5', icon: 'Utensils' },
  sleeping: { color: '#14B8A6', bg: '#CCFBF1', icon: 'Bed' },
};

const ITINERARY_ITEMS_EN: ItineraryItem[] = [
  { kind: 'transport', title: 'Eurostar arrival', subtitle: 'St Pancras → Gare du Nord', startHour: 9, endHour: 11, participants: ['👩‍🎨', '🧔'] },
  { kind: 'activity', title: 'Eiffel Tower visit', subtitle: '2nd floor + lift', startHour: 11.5, endHour: 13.5, participants: ['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻'], booked: true },
  { kind: 'food', title: 'Le Petit Bistrot', subtitle: 'Lunch · French', startHour: 14, endHour: 15.5, participants: ['👩‍🎨', '🧔', '👱‍♀️'] },
  { kind: 'activity', title: 'Louvre Museum', subtitle: 'Guided tour', startHour: 16, endHour: 18, participants: ['👱‍♀️', '🧑‍💻'] },
  { kind: 'sleeping', title: 'Hôtel du Louvre', subtitle: 'Check-in', startHour: 19, endHour: 20, participants: ['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻'], booked: true },
];

const ITINERARY_ITEMS_FR: ItineraryItem[] = [
  { kind: 'transport', title: 'Arrivée Eurostar', subtitle: 'St Pancras → Gare du Nord', startHour: 9, endHour: 11, participants: ['👩‍🎨', '🧔'] },
  { kind: 'activity', title: 'Tour Eiffel', subtitle: '2e étage + ascenseur', startHour: 11.5, endHour: 13.5, participants: ['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻'], booked: true },
  { kind: 'food', title: 'Le Petit Bistrot', subtitle: 'Déjeuner · français', startHour: 14, endHour: 15.5, participants: ['👩‍🎨', '🧔', '👱‍♀️'] },
  { kind: 'activity', title: 'Musée du Louvre', subtitle: 'Visite guidée', startHour: 16, endHour: 18, participants: ['👱‍♀️', '🧑‍💻'] },
  { kind: 'sleeping', title: 'Hôtel du Louvre', subtitle: 'Check-in', startHour: 19, endHour: 20, participants: ['👩‍🎨', '🧔', '👱‍♀️', '🧑‍💻'], booked: true },
];

function fmtHour(h: number): string {
  const hh = Math.floor(h);
  const mm = Math.round((h - hh) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

export function LiveCollaboration({ autoPlay = true, locale = 'en' }: { autoPlay?: boolean; locale?: string }) {
  const lang: 'en' | 'fr' = locale === 'fr' ? 'fr' : 'en';
  const t = lang === 'fr'
    ? { dayOf: 'Jour 2 sur 5', date: 'Mer. 15 mai', city: 'Paris', booked: 'Réservé' }
    : { dayOf: 'Day 2 of 5', date: 'Wed, May 15', city: 'Paris', booked: 'Booked' };

  const items = lang === 'fr' ? ITINERARY_ITEMS_FR : ITINERARY_ITEMS_EN;
  const [visibleCount, setVisibleCount] = useState(autoPlay ? 0 : items.length);

  useEffect(() => {
    if (!autoPlay) {
      setVisibleCount(items.length);
      return;
    }
    setVisibleCount(0);
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), 400 + i * 450),
    );
    return () => timers.forEach(clearTimeout);
  }, [autoPlay, items.length]);

  const hourStart = 9;
  const hourEnd = 21;
  const hourSpan = hourEnd - hourStart;
  const rowHeightPct = (h: number) => ((h - hourStart) / hourSpan) * 100;

  return (
    <div className="relative h-full min-h-[280px] lg:min-h-[420px] w-full overflow-hidden rounded-3xl bg-white p-4 lg:p-5 shadow-sm border border-slate-200/70">
      {/* Day navigation header — mirrors day-navigation.tsx */}
      <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
        <button className="flex w-6 h-6 items-center justify-center rounded-full hover:bg-slate-100" aria-label="Previous day">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="text-center leading-tight">
          <div className="text-[10px] uppercase tracking-wide text-slate-400 font-medium">{t.dayOf}</div>
          <div className="text-[13px] font-semibold text-slate-900">{t.date}</div>
          <div className="text-[10px] text-slate-500">{t.city}</div>
        </div>
        <button className="flex w-6 h-6 items-center justify-center rounded-full hover:bg-slate-100" aria-label="Next day">
          <svg className="w-3.5 h-3.5 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Hour rail + items grid */}
      <div className="relative flex" style={{ height: 'calc(100% - 72px)', minHeight: '320px' }}>
        {/* Hour labels on the left */}
        <div className="relative w-9 shrink-0">
          {Array.from({ length: hourSpan + 1 }).map((_, i) => {
            const hour = hourStart + i;
            const showLabel = i % 3 === 0 || i === hourSpan;
            return (
              <div
                key={hour}
                className="absolute left-0 right-1 text-right text-[10px] text-slate-400 font-medium leading-none"
                style={{ top: `${(i / hourSpan) * 100}%`, transform: 'translateY(-50%)' }}
              >
                {showLabel ? fmtHour(hour) : ''}
              </div>
            );
          })}
        </div>

        {/* Item area */}
        <div className="relative flex-1 border-l border-slate-200">
          {/* Hour grid lines (every 3h) */}
          {Array.from({ length: Math.floor(hourSpan / 3) + 1 }).map((_, i) => (
            <div
              key={i}
              className="absolute left-0 right-0 border-t border-dashed border-slate-100"
              style={{ top: `${((i * 3) / hourSpan) * 100}%` }}
            />
          ))}

          {items.map((item, idx) => {
            const style = ITINERARY_KIND_STYLE[item.kind];
            const Icon = Icons[style.icon];
            const top = rowHeightPct(item.startHour);
            const height = rowHeightPct(item.endHour) - top;
            const isVisible = idx < visibleCount;
            return (
              <motion.div
                key={`${item.kind}-${idx}`}
                initial={{ opacity: 0, x: -8, scale: 0.97 }}
                animate={{
                  opacity: isVisible ? 1 : 0,
                  x: isVisible ? 0 : -8,
                  scale: isVisible ? 1 : 0.97,
                }}
                transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                className="absolute left-1.5 right-1.5 rounded-lg overflow-hidden shadow-sm"
                style={{
                  top: `${top}%`,
                  height: `${height}%`,
                  backgroundColor: style.bg,
                  borderLeft: `3px solid ${style.color}`,
                }}
              >
                <div className="flex flex-col h-full px-2 py-1.5">
                  <div className="flex items-center gap-1.5">
                    <Icon className="w-3 h-3 shrink-0" style={{ color: style.color }} />
                    <span className="text-[11px] font-semibold text-slate-900 truncate leading-tight">{item.title}</span>
                    {item.booked && (
                      <span className="ml-auto flex items-center gap-0.5 rounded-full bg-emerald-100 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-700">
                        <Icons.Check className="w-2 h-2" />
                        {t.booked}
                      </span>
                    )}
                  </div>
                  <div className="text-[9px] text-slate-600 mt-0.5 truncate">
                    {fmtHour(item.startHour)} – {fmtHour(item.endHour)}
                    {item.subtitle ? ` · ${item.subtitle}` : ''}
                  </div>
                  {height > 8 && (
                    <div className="mt-auto flex items-center gap-1">
                      <div className="flex -space-x-1">
                        {item.participants.slice(0, 3).map((p, i) => (
                          <div key={i} className="flex w-4 h-4 items-center justify-center rounded-full bg-white text-[9px] ring-1 ring-slate-200">
                            {p}
                          </div>
                        ))}
                      </div>
                      {item.participants.length > 3 && (
                        <span className="text-[9px] text-slate-500 font-medium">+{item.participants.length - 3}</span>
                      )}
                    </div>
                  )}
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
