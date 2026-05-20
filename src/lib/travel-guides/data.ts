/**
 * Travel guides — SEO long-tail country pages for /travel-guides/[country]
 *
 * Each guide has bilingual (en/fr) content written natively per locale.
 * Slugs are localized: e.g. `japan` (EN) / `japon` (FR).
 *
 * Hero & POI images are self-hosted under /public/travel-guides/[country]/.
 * To swap a photo, drop a new JPG with the same filename in that folder.
 *
 * Content is human-reviewed AI-assisted: facts, prices, and cultural notes are
 * checked but should still be verified before any major rewrite.
 */

export type Locale = "en" | "fr";
export type LocalizedString = { en: string; fr: string };
export type LocalizedStringArray = { en: string[]; fr: string[] };

export type TravelGuideContinent =
  | "europe"
  | "asia"
  | "africa"
  | "north-america"
  | "south-america"
  | "oceania"
  | "middle-east";

export type TravelGuideQuickFacts = {
  capital: LocalizedString;
  language: LocalizedString;
  currency: { code: string; symbol: string };
  timezone: string;
  visa: LocalizedString;
  plug: string;
  driveSide: "left" | "right";
  population: string;
};

export type TravelGuidePoi = {
  name: string;
  region: LocalizedString;
  description: LocalizedString;
  image: string;
  imageAlt: LocalizedString;
  mapsUrl: string;
};

export type TravelGuideSpecialtyCategory =
  | "food"
  | "drink"
  | "experience"
  | "craft"
  | "art";

export type TravelGuideSpecialty = {
  name: LocalizedString;
  category: TravelGuideSpecialtyCategory;
  description: LocalizedString;
  image: string;
  imageAlt: LocalizedString;
};

export type TravelGuideRegion = {
  name: LocalizedString;
  highlights: LocalizedString;
  description: LocalizedString;
};

export type TravelGuideItinerary = {
  days: number;
  title: LocalizedString;
  summary: LocalizedString;
  stops: LocalizedStringArray;
};

export type TravelGuideBudgetTier = {
  label: LocalizedString;
  perDay: number;
  description: LocalizedString;
};

export type TravelGuideSeasonNote = {
  months: LocalizedString;
  description: LocalizedString;
};

export type TravelGuideTip = {
  do: boolean;
  text: LocalizedString;
};

export type CountryGuide = {
  slug: { en: string; fr: string };
  country: LocalizedString;
  continent: TravelGuideContinent;
  hero: {
    image: string;
    imageAlt: LocalizedString;
    tag: LocalizedString;
  };
  meta: {
    title: LocalizedString;
    description: LocalizedString;
  };
  intro: LocalizedStringArray;
  quickFacts: TravelGuideQuickFacts;
  bestSeason: {
    best: TravelGuideSeasonNote;
    shoulder: TravelGuideSeasonNote;
    avoid: TravelGuideSeasonNote;
  };
  mustSee: TravelGuidePoi[];
  specialties: TravelGuideSpecialty[];
  regions: TravelGuideRegion[];
  itineraries: TravelGuideItinerary[];
  budget: {
    currency: "EUR" | "USD";
    tiers: TravelGuideBudgetTier[];
    note: LocalizedString;
  };
  tips: TravelGuideTip[];
  /** EN slugs of related country guides */
  related: string[];
  /** EN slugs of related /destinations entries */
  relatedDestinations: string[];
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

export const continentLabel = (
  c: TravelGuideContinent,
  loc: Locale
): string => {
  const labels: Record<TravelGuideContinent, LocalizedString> = {
    europe: { en: "Europe", fr: "Europe" },
    asia: { en: "Asia", fr: "Asie" },
    africa: { en: "Africa", fr: "Afrique" },
    "north-america": { en: "North America", fr: "Amérique du Nord" },
    "south-america": { en: "South America", fr: "Amérique du Sud" },
    oceania: { en: "Oceania", fr: "Océanie" },
    "middle-east": { en: "Middle East", fr: "Moyen-Orient" },
  };
  return labels[c][loc];
};

export const specialtyCategoryLabel = (
  c: TravelGuideSpecialtyCategory,
  loc: Locale
): string => {
  const labels: Record<TravelGuideSpecialtyCategory, LocalizedString> = {
    food: { en: "Food", fr: "Cuisine" },
    drink: { en: "Drink", fr: "Boisson" },
    experience: { en: "Experience", fr: "Expérience" },
    craft: { en: "Craft", fr: "Artisanat" },
    art: { en: "Art", fr: "Art" },
  };
  return labels[c][loc];
};

// ---------------------------------------------------------------------------
// 1. Japan — pilot
// ---------------------------------------------------------------------------
const japan: CountryGuide = {
  slug: { en: "japan", fr: "japon" },
  country: { en: "Japan", fr: "Japon" },
  continent: "asia",
  hero: {
    image:
      "/travel-guides/japan/hero.jpg",
    imageAlt: {
      en: "Mount Fuji at sunrise with cherry blossoms in the foreground",
      fr: "Le mont Fuji au lever du soleil avec des cerisiers en fleurs au premier plan",
    },
    tag: {
      en: "Country guide · Asia",
      fr: "Guide pays · Asie",
    },
  },
  meta: {
    title: {
      en: "Japan Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Japon 2026 — Que voir, que manger, comment partir",
    },
    description: {
      en: "Opinionated Japan travel guide for 2026: best season, the Golden Route, regional food, honest budgets, cultural do's and don'ts. For first and repeat trips.",
      fr: "Guide voyage Japon 2026, sans bla-bla : meilleure saison, Golden Route, cuisine par région, budget honnête, codes culturels. Pour la 1re fois ou les habitués.",
    },
  },
  intro: {
    en: [
      "Japan rewards first-timers more than almost any country in the world. Trains run to the second. Convenience stores serve genuinely good food at 3am. A 1,000-yen bowl of ramen beats most restaurants you'll eat at back home this year. And the country is so layered — Tokyo neon, Kyoto temples, Hokkaido snow, Okinawa beaches — that two weeks barely scratches the surface.",
      "First trip, almost everyone follows what locals call the Golden Route: Tokyo, Hakone or Fuji, Kyoto, Nara, Osaka. It's popular because it works — bullet train links it all in under three hours, and the contrast between Tokyo's density and Kyoto's slowness is the trip in miniature. Second trip, you go further: Kanazawa, Hiroshima, Mt Koya, the Japan Alps, the Setouchi islands.",
      "Two practical things to know before you book. Cherry blossom (late March to early April) and autumn foliage (mid-November) are spectacular but require booking accommodation three to six months ahead — Japan is now one of the most over-booked countries on earth in those windows. And nothing here is improvised: restaurants take reservations, museums sell timed tickets, the Shinkansen requires seat assignments. Plan or pay the queue tax.",
    ],
    fr: [
      "Le Japon est sans doute le pays qui récompense le plus une première visite. Les trains arrivent à la seconde. Les konbini (supérettes ouvertes 24h/24) servent des plats étonnamment bons à 3h du matin. Un bol de ramen à 1 000 yens y bat la plupart des restos où vous mangez chez vous. Et le pays est tellement contrasté — néons de Tokyo, temples de Kyoto, neige d'Hokkaido, plages d'Okinawa — que deux semaines effleurent à peine la surface.",
      "Pour une première fois, tout le monde fait la Golden Route : Tokyo, Hakone ou le Fuji, Kyoto, Nara, Osaka. C'est populaire parce que ça marche — le Shinkansen relie tout en moins de trois heures, et le contraste entre la densité de Tokyo et la lenteur de Kyoto résume le voyage en miniature. Pour un deuxième séjour, on pousse plus loin : Kanazawa, Hiroshima, le mont Koya, les Alpes japonaises, les îles de Setouchi.",
      "Deux infos pratiques avant de réserver. Les cerisiers en fleurs (fin mars-début avril) et les couleurs d'automne (mi-novembre) sont spectaculaires mais imposent de réserver l'hébergement 3 à 6 mois à l'avance — le Japon est devenu un des pays les plus saturés au monde sur ces créneaux. Et rien ici ne s'improvise : les restos prennent les réservations, les musées vendent des billets horodatés, le Shinkansen exige une place attribuée. Soit vous planifiez, soit vous faites la queue.",
    ],
  },
  quickFacts: {
    capital: { en: "Tokyo", fr: "Tokyo" },
    language: { en: "Japanese", fr: "Japonais" },
    currency: { code: "JPY", symbol: "¥" },
    timezone: "JST (UTC+9)",
    visa: {
      en: "Visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type A · 100V",
    driveSide: "left",
    population: "~124M",
  },
  bestSeason: {
    best: {
      months: {
        en: "Late March – early April · mid-October – late November",
        fr: "Fin mars – début avril · mi-octobre – fin novembre",
      },
      description: {
        en: "Cherry blossoms in spring and red-orange foliage in autumn are the marquee seasons. Mild weather, long days, postcard light. Book lodging 4–6 months ahead — these are the most crowded windows of the year.",
        fr: "Cerisiers au printemps, érables rouge-orangé en automne : les deux saisons emblématiques. Climat doux, journées longues, lumière de carte postale. Réservez l'hébergement 4 à 6 mois avant — ce sont les périodes les plus saturées de l'année.",
      },
    },
    shoulder: {
      months: {
        en: "Mid-May – June · December – February",
        fr: "Mi-mai – juin · décembre – février",
      },
      description: {
        en: "Late May avoids both cherry-blossom crowds and the June rainy season. Winter is dry and clear in Tokyo/Kyoto, perfect for snow trips to Hokkaido or onsen towns — but Hokkaido itself can be -10°C.",
        fr: "Fin mai évite à la fois la cohue des cerisiers et la saison des pluies de juin. L'hiver est sec et lumineux à Tokyo/Kyoto, idéal pour la neige à Hokkaido ou les villes thermales — mais Hokkaido peut descendre à -10°C.",
      },
    },
    avoid: {
      months: {
        en: "Mid-July – August · Golden Week (late April – early May)",
        fr: "Mi-juillet – août · Golden Week (fin avril – début mai)",
      },
      description: {
        en: "Summer is brutally humid and 35°C+ in cities — only worth it for festivals (Kyoto's Gion Matsuri) or the Japan Alps. Golden Week is a domestic-travel tsunami: trains and hotels sell out months in advance at peak prices.",
        fr: "L'été est étouffant et au-dessus de 35°C en ville — à ne tenter que pour les festivals (Gion Matsuri à Kyoto) ou les Alpes japonaises. La Golden Week est un raz-de-marée touristique domestique : trains et hôtels sont saturés des mois à l'avance, à prix maxi.",
      },
    },
  },
  mustSee: [
    {
      name: "Fushimi Inari-taisha",
      region: { en: "Kyoto, Kansai", fr: "Kyoto, Kansai" },
      description: {
        en: "Ten thousand vermilion torii gates climb a forested mountain south of Kyoto. Go at 7am to walk the upper paths alone — by 10am the lower section is a queue.",
        fr: "Dix mille torii vermillon grimpent une montagne boisée au sud de Kyoto. Allez-y à 7h pour avoir les chemins du haut pour vous seul — à 10h, la partie basse est une file d'attente.",
      },
      image:
        "/travel-guides/japan/fushimi-inari.jpg",
      imageAlt: {
        en: "Tunnel of vermilion torii gates at Fushimi Inari shrine",
        fr: "Tunnel de torii vermillon au sanctuaire Fushimi Inari",
      },
      mapsUrl: "https://maps.app.goo.gl/Bk5wDqHnVMjk2Yps9",
    },
    {
      name: "Mount Fuji & Lake Kawaguchi",
      region: { en: "Yamanashi, Chubu", fr: "Yamanashi, Chubu" },
      description: {
        en: "The classic view is from Lake Kawaguchi or Chureito Pagoda at sunrise. Fuji is shy — clear sightings are most common Nov–Feb when winter air is dry.",
        fr: "La vue classique se prend depuis le lac Kawaguchi ou la pagode Chureito au lever du soleil. Le Fuji est timide — il se découvre surtout de nov. à fév., quand l'air d'hiver est sec.",
      },
      image:
        "/travel-guides/japan/mount-fuji.jpg",
      imageAlt: {
        en: "Mount Fuji reflected in Lake Kawaguchi with autumn leaves",
        fr: "Le mont Fuji reflété dans le lac Kawaguchi avec les couleurs d'automne",
      },
      mapsUrl: "https://maps.app.goo.gl/3v8jqfQpL8r9k7sQ8",
    },
    {
      name: "Arashiyama Bamboo Grove",
      region: { en: "Kyoto, Kansai", fr: "Kyoto, Kansai" },
      description: {
        en: "A 500-metre path through bamboo so dense the light turns green. Combine with Tenryu-ji temple next door and lunch in the village — go before 8am.",
        fr: "Un chemin de 500 mètres dans une bambouseraie si dense que la lumière vire au vert. À combiner avec le temple Tenryu-ji juste à côté et un déjeuner au village — venez avant 8h.",
      },
      image:
        "/travel-guides/japan/arashiyama-bamboo.jpg",
      imageAlt: {
        en: "Path through tall green bamboo grove in Arashiyama, Kyoto",
        fr: "Chemin à travers la haute bambouseraie verte d'Arashiyama, Kyoto",
      },
      mapsUrl: "https://maps.app.goo.gl/2qpHk5gXa9G3K3kEA",
    },
    {
      name: "Senso-ji & Asakusa",
      region: { en: "Tokyo, Kanto", fr: "Tokyo, Kanto" },
      description: {
        en: "Tokyo's oldest temple, with Nakamise-dori — a 200-metre street of senbei, ningyo-yaki, and souvenirs leading to the main hall. Lit up at night, almost empty.",
        fr: "Le plus vieux temple de Tokyo, précédé de Nakamise-dori — 200 mètres de stands de senbei, ningyo-yaki et souvenirs qui mènent à la salle principale. Illuminé la nuit, presque désert.",
      },
      image:
        "/travel-guides/japan/senso-ji.jpg",
      imageAlt: {
        en: "Lit-up Senso-ji temple gate with five-story pagoda at dusk",
        fr: "Porte du temple Senso-ji illuminée avec la pagode à cinq étages au crépuscule",
      },
      mapsUrl: "https://maps.app.goo.gl/zJ8gFv7GqV8L3kxs7",
    },
    {
      name: "Nara Park",
      region: { en: "Nara, Kansai", fr: "Nara, Kansai" },
      description: {
        en: "A 45-minute train from Kyoto. Free-roaming sika deer that bow for senbei crackers, plus Todai-ji's 15-metre bronze Buddha. Half-day, easy.",
        fr: "À 45 minutes de train de Kyoto. Cerfs sika en liberté qui s'inclinent pour des biscuits senbei, et le Bouddha de bronze de 15 mètres du Todai-ji. Une demi-journée tranquille.",
      },
      image:
        "/travel-guides/japan/nara-park.jpg",
      imageAlt: {
        en: "Sika deer in front of a temple gate in Nara Park",
        fr: "Cerf sika devant une porte de temple à Nara",
      },
      mapsUrl: "https://maps.app.goo.gl/eR3FpTjnf7QvK3sH9",
    },
    {
      name: "Shibuya Crossing & Shinjuku",
      region: { en: "Tokyo, Kanto", fr: "Tokyo, Kanto" },
      description: {
        en: "Shibuya's scramble crossing is the postcard, but the real Tokyo is in the side streets: Nonbei Yokocho (drinking alley), Golden Gai in Shinjuku, Omoide Yokocho yakitori stalls.",
        fr: "Le scramble de Shibuya, c'est la carte postale, mais le vrai Tokyo est dans les ruelles : Nonbei Yokocho (ruelle des buveurs), Golden Gai à Shinjuku, les yakitoris d'Omoide Yokocho.",
      },
      image:
        "/travel-guides/japan/shibuya.jpg",
      imageAlt: {
        en: "Shibuya scramble crossing at night with neon billboards",
        fr: "Le carrefour de Shibuya la nuit avec ses panneaux néon",
      },
      mapsUrl: "https://maps.app.goo.gl/4Zk8j6X6c4MqkdYG8",
    },
    {
      name: "Hiroshima Peace Memorial",
      region: { en: "Hiroshima, Chugoku", fr: "Hiroshima, Chugoku" },
      description: {
        en: "Heavy and necessary. The museum is rigorous, not graphic — allow two hours minimum. Combine with the ferry to Itsukushima's floating torii in the afternoon.",
        fr: "Lourd et nécessaire. Le musée est rigoureux, pas sensationnaliste — comptez deux heures minimum. À combiner avec le ferry pour le torii flottant d'Itsukushima l'après-midi.",
      },
      image:
        "/travel-guides/japan/hiroshima.jpg",
      imageAlt: {
        en: "Atomic Bomb Dome reflected in the river in Hiroshima",
        fr: "Le Dôme de la bombe atomique se reflétant dans la rivière à Hiroshima",
      },
      mapsUrl: "https://maps.app.goo.gl/N4qXyfqVjg4jYz5J6",
    },
    {
      name: "Kanazawa & Kenroku-en",
      region: { en: "Ishikawa, Chubu", fr: "Ishikawa, Chubu" },
      description: {
        en: "Often called 'Little Kyoto' but quieter and cheaper. Kenroku-en is one of Japan's three great gardens; nearby Higashi Chaya is a preserved geisha district that still works.",
        fr: "Souvent surnommée « la petite Kyoto », mais plus calme et moins chère. Kenroku-en est l'un des trois grands jardins du Japon ; le quartier voisin de Higashi Chaya est un district de geishas préservé et encore en activité.",
      },
      image:
        "/travel-guides/japan/kanazawa.jpg",
      imageAlt: {
        en: "Stone lantern over pond in Kenroku-en garden, Kanazawa",
        fr: "Lanterne de pierre au-dessus d'un étang du jardin Kenroku-en, Kanazawa",
      },
      mapsUrl: "https://maps.app.goo.gl/5T6kPqzZ8f5cR7gC8",
    },
    {
      name: "Hakone & the onsen route",
      region: { en: "Kanagawa, Kanto", fr: "Kanagawa, Kanto" },
      description: {
        en: "The closest serious onsen experience to Tokyo (90 min). Stay one night in a ryokan, do the cable-car loop, hope for Fuji views from Lake Ashi.",
        fr: "L'expérience onsen sérieuse la plus proche de Tokyo (1h30). Passez une nuit en ryokan, faites la boucle en téléphérique, croisez les doigts pour voir le Fuji depuis le lac Ashi.",
      },
      image:
        "/travel-guides/japan/hakone.jpg",
      imageAlt: {
        en: "Outdoor hot spring bath with mountain view in Hakone",
        fr: "Bain thermal en plein air avec vue sur la montagne à Hakone",
      },
      mapsUrl: "https://maps.app.goo.gl/Hk3JqXfQ2v8K5zJP9",
    },
    {
      name: "Osaka Dotonbori",
      region: { en: "Osaka, Kansai", fr: "Osaka, Kansai" },
      description: {
        en: "Loud, edible, neon. Takoyaki, kushikatsu, okonomiyaki, the Glico runner sign. Osaka eats louder and faster than Kyoto — go hungry, in trainers.",
        fr: "Bruyant, comestible, néon. Takoyaki, kushikatsu, okonomiyaki, l'enseigne du coureur Glico. Osaka mange plus fort et plus vite que Kyoto — venez en baskets et le ventre vide.",
      },
      image:
        "/travel-guides/japan/osaka-dotonbori.jpg",
      imageAlt: {
        en: "Dotonbori canal at night with neon signs and crowds",
        fr: "Le canal de Dotonbori la nuit, avec ses néons et la foule",
      },
      mapsUrl: "https://maps.app.goo.gl/aN6sR4kPqL3MtJ2x7",
    },
    {
      name: "Mt Koya (Koyasan)",
      region: { en: "Wakayama, Kansai", fr: "Wakayama, Kansai" },
      description: {
        en: "A working monastic town at 800m. Sleep in a temple (shukubo), eat shojin-ryori (Buddhist vegan), walk the Okunoin cemetery at night. Two hours from Osaka, completely different planet.",
        fr: "Un village monastique en activité, à 800m d'altitude. Dormez dans un temple (shukubo), mangez shojin-ryori (cuisine bouddhiste végane), arpentez le cimetière d'Okunoin la nuit. À deux heures d'Osaka, une autre planète.",
      },
      image:
        "/travel-guides/japan/mt-koya.jpg",
      imageAlt: {
        en: "Stone lanterns and cedar trees in Okunoin cemetery, Mt Koya",
        fr: "Lanternes de pierre et cèdres au cimetière d'Okunoin, mont Koya",
      },
      mapsUrl: "https://maps.app.goo.gl/Pq8nT6hRm3WjB9zN7",
    },
    {
      name: "Itsukushima Floating Torii",
      region: { en: "Miyajima, Chugoku", fr: "Miyajima, Chugoku" },
      description: {
        en: "The torii standing in the sea at high tide is the postcard, but stay overnight: when the day-trippers leave, the island returns to wild deer, glowing lanterns, and silence.",
        fr: "Le torii dans la mer à marée haute, c'est la carte postale, mais restez la nuit : quand les visiteurs d'un jour partent, l'île redevient cerfs sauvages, lanternes allumées et silence.",
      },
      image:
        "/travel-guides/japan/itsukushima.jpg",
      imageAlt: {
        en: "Floating red torii gate of Itsukushima shrine at high tide",
        fr: "Le torii flottant rouge du sanctuaire Itsukushima à marée haute",
      },
      mapsUrl: "https://maps.app.goo.gl/sM9rXqLk7Nv4Wd5J6",
    },
  ],
  specialties: [
    {
      name: { en: "Ramen", fr: "Ramen" },
      category: "food",
      description: {
        en: "Every region has its own broth: Tokyo shoyu (soy), Sapporo miso, Hakata tonkotsu (pork bone), Hakodate shio (salt). Order at the vending machine, slurp loudly — it's not rude, it's expected.",
        fr: "Chaque région a son bouillon : shoyu (soja) à Tokyo, miso à Sapporo, tonkotsu (os de porc) à Hakata, shio (sel) à Hakodate. On commande au distributeur, on aspire bruyamment — ce n'est pas grossier, c'est attendu.",
      },
      image:
        "/travel-guides/japan/ramen.jpg",
      imageAlt: {
        en: "Bowl of tonkotsu ramen with chashu pork and soft-boiled egg",
        fr: "Bol de ramen tonkotsu avec porc chashu et œuf mollet",
      },
    },
    {
      name: { en: "Sushi & sashimi", fr: "Sushi & sashimi" },
      category: "food",
      description: {
        en: "Skip kaiten (conveyor belt) at least once: a 15-seat omakase counter from 6,000 yen will reset your idea of what fish can be. Toyosu market in Tokyo, Nishiki market in Kyoto for the casual version.",
        fr: "Évitez les kaiten (sushis sur tapis) au moins une fois : un comptoir omakase de 15 places à partir de 6 000 yens vous fera reconsidérer ce que peut être le poisson. Marché de Toyosu à Tokyo, Nishiki à Kyoto pour la version décontractée.",
      },
      image:
        "/travel-guides/japan/sushi.jpg",
      imageAlt: {
        en: "Nigiri sushi platter on a wooden board",
        fr: "Plateau de nigiri sushi sur planche en bois",
      },
    },
    {
      name: { en: "Kaiseki", fr: "Kaiseki" },
      category: "food",
      description: {
        en: "Traditional multi-course tasting menu — 8 to 14 small dishes following strict seasonal rules. Kyoto is the home of it. Expect 12,000–25,000 yen for a serious one; cheaper kappo versions exist.",
        fr: "Menu dégustation traditionnel en plusieurs services — 8 à 14 petits plats suivant des règles saisonnières strictes. Kyoto en est le berceau. Comptez 12 000–25 000 yens pour un sérieux ; les versions kappo, moins chères, existent.",
      },
      image:
        "/travel-guides/japan/kaiseki.jpg",
      imageAlt: {
        en: "Traditional kaiseki meal with multiple small dishes",
        fr: "Repas kaiseki traditionnel avec plusieurs petits plats",
      },
    },
    {
      name: { en: "Onsen", fr: "Onsen" },
      category: "experience",
      description: {
        en: "Volcanic hot-spring baths. The rules are non-negotiable: scrub fully clean at the seated showers first, bathe naked, no towel in the water, tattoos may bar you (cover-ups help). Hakone, Beppu, Kusatsu, Kinosaki are the classic onsen towns.",
        fr: "Bains thermaux d'origine volcanique. Les règles sont non négociables : douche assise rigoureuse avant, on entre nu, pas de serviette dans l'eau, les tatouages peuvent vous être refusés (des cache-tatouages aident). Hakone, Beppu, Kusatsu, Kinosaki sont les villes thermales classiques.",
      },
      image:
        "/travel-guides/japan/onsen.jpg",
      imageAlt: {
        en: "Outdoor wooden hot spring tub in a Japanese onsen",
        fr: "Bain extérieur en bois dans un onsen japonais",
      },
    },
    {
      name: { en: "Sake & whisky", fr: "Saké & whisky" },
      category: "drink",
      description: {
        en: "Sake regions: Niigata (clean), Hyogo (bold), Hiroshima (sweet). Japanese whisky from Yamazaki, Hakushu, Yoichi is now worth more at auction than scotch — for cheaper bottles try Nikka From the Barrel.",
        fr: "Régions du saké : Niigata (sec), Hyogo (corsé), Hiroshima (doux). Les whiskies japonais (Yamazaki, Hakushu, Yoichi) valent désormais plus en enchère que les scotch — pour des bouteilles plus abordables, essayez le Nikka From the Barrel.",
      },
      image:
        "/travel-guides/japan/sake.jpg",
      imageAlt: {
        en: "Row of sake bottles on a wooden bar",
        fr: "Rangée de bouteilles de saké sur un bar en bois",
      },
    },
    {
      name: { en: "Tea ceremony", fr: "Cérémonie du thé" },
      category: "experience",
      description: {
        en: "Chanoyu is choreographed slowness. Uji (south of Kyoto) is matcha's epicentre; Kyoto teahouses offer 45-minute beginner sessions for around 3,000 yen — book ahead.",
        fr: "Le chanoyu, c'est une lenteur chorégraphiée. Uji (au sud de Kyoto) est l'épicentre du matcha ; les maisons de thé de Kyoto proposent des sessions d'initiation de 45 minutes autour de 3 000 yens — sur réservation.",
      },
      image:
        "/travel-guides/japan/tea-ceremony.jpg",
      imageAlt: {
        en: "Whisked matcha tea in a ceramic bowl",
        fr: "Matcha fouetté dans un bol en céramique",
      },
    },
    {
      name: { en: "Anime & manga culture", fr: "Culture anime & manga" },
      category: "art",
      description: {
        en: "Akihabara (Tokyo) for electronics and otaku culture; Nakano Broadway for vintage manga; Kyoto International Manga Museum if you want the academic angle. Ghibli Museum (Mitaka) tickets release on the 10th of each month — set an alarm.",
        fr: "Akihabara (Tokyo) pour l'électronique et la culture otaku ; Nakano Broadway pour les mangas vintage ; le Kyoto International Manga Museum pour l'angle plus académique. Les billets du musée Ghibli (Mitaka) sortent le 10 de chaque mois — mettez une alarme.",
      },
      image:
        "/travel-guides/japan/anime-manga.jpg",
      imageAlt: {
        en: "Neon-lit Akihabara electronics district in Tokyo at night",
        fr: "Le quartier électronique d'Akihabara illuminé de néons, la nuit à Tokyo",
      },
    },
  ],
  regions: [
    {
      name: { en: "Kanto (Tokyo)", fr: "Kanto (Tokyo)" },
      highlights: {
        en: "Tokyo, Yokohama, Hakone, Nikko, Kamakura",
        fr: "Tokyo, Yokohama, Hakone, Nikko, Kamakura",
      },
      description: {
        en: "The flat eastern plain around Tokyo. Most international flights land at Haneda or Narita; almost every trip starts and ends here. Day trips to Hakone (onsen), Nikko (shrines + waterfalls), Kamakura (Great Buddha) are easy.",
        fr: "La grande plaine de l'est, autour de Tokyo. La majorité des vols internationaux atterrissent à Haneda ou Narita ; presque chaque voyage commence et finit ici. Excursions d'une journée faciles à Hakone (onsen), Nikko (sanctuaires et cascades), Kamakura (Grand Bouddha).",
      },
    },
    {
      name: { en: "Kansai (Kyoto / Osaka)", fr: "Kansai (Kyoto / Osaka)" },
      highlights: {
        en: "Kyoto, Osaka, Nara, Kobe, Mt Koya, Himeji",
        fr: "Kyoto, Osaka, Nara, Kobe, mont Koya, Himeji",
      },
      description: {
        en: "Cultural heartland. Kyoto for temples and slowness, Osaka for food and humour, Nara for deer and the great Buddha, Himeji for the iconic white castle. The Kansai Thru Pass covers buses + private rail across the region.",
        fr: "Le cœur culturel du pays. Kyoto pour les temples et la lenteur, Osaka pour la nourriture et l'humour, Nara pour les cerfs et le grand Bouddha, Himeji pour son château blanc iconique. Le Kansai Thru Pass couvre bus + lignes privées de la région.",
      },
    },
    {
      name: { en: "Chubu (Japan Alps)", fr: "Chubu (Alpes japonaises)" },
      highlights: {
        en: "Kanazawa, Takayama, Shirakawa-go, Matsumoto, Nagoya",
        fr: "Kanazawa, Takayama, Shirakawa-go, Matsumoto, Nagoya",
      },
      description: {
        en: "Mountains, traditional villages, the best castles. Shirakawa-go's thatched gassho-zukuri farmhouses look unreal under snow. The Tateyama-Kurobe Alpine Route (mid-Apr–Nov) walks the Yuki-no-Otani snow corridor — a 15-metre-plus wall of plowed snow that lasts into June.",
        fr: "Montagnes, villages traditionnels, les plus beaux châteaux. Les fermes au toit de chaume gassho-zukuri de Shirakawa-go ont l'air irréelles sous la neige. La route alpine Tateyama-Kurobe (mi-avril à novembre) longe le couloir Yuki-no-Otani — un mur de neige damée de plus de 15 mètres qui tient jusqu'en juin.",
      },
    },
    {
      name: { en: "Tohoku & Hokkaido", fr: "Tohoku & Hokkaido" },
      highlights: {
        en: "Sapporo, Niseko, Aomori, Sendai, Hakodate",
        fr: "Sapporo, Niseko, Aomori, Sendai, Hakodate",
      },
      description: {
        en: "The north. Niseko has the deepest powder in Asia (Dec–Feb). Tohoku is rural Japan — quiet temples, hot springs in the snow, the most underrated foliage in October. Add at least 5 extra days if you go.",
        fr: "Le nord. Niseko offre la meilleure poudreuse d'Asie (déc.-fév.). Le Tohoku, c'est le Japon rural — temples calmes, sources chaudes sous la neige, le feuillage d'automne le plus sous-coté du pays en octobre. Comptez au moins 5 jours en plus si vous y allez.",
      },
    },
    {
      name: { en: "Chugoku & Shikoku", fr: "Chugoku & Shikoku" },
      highlights: {
        en: "Hiroshima, Miyajima, Naoshima, Onomichi, Matsuyama",
        fr: "Hiroshima, Miyajima, Naoshima, Onomichi, Matsuyama",
      },
      description: {
        en: "The Seto Inland Sea. Naoshima and the Setouchi art islands (Tadao Ando, Yayoi Kusama) are a destination on their own. Onomichi-to-Imabari by bike on the Shimanami Kaido — 70km across six bridges — is one of Asia's great rides.",
        fr: "La mer intérieure de Seto. Naoshima et les îles d'art de Setouchi (Tadao Ando, Yayoi Kusama) valent le détour à elles seules. Onomichi-Imabari à vélo via le Shimanami Kaido — 70 km, six ponts — est l'un des plus beaux itinéraires cyclo d'Asie.",
      },
    },
    {
      name: { en: "Kyushu & Okinawa", fr: "Kyushu & Okinawa" },
      highlights: {
        en: "Fukuoka, Beppu, Kagoshima, Yakushima, Okinawa beaches",
        fr: "Fukuoka, Beppu, Kagoshima, Yakushima, plages d'Okinawa",
      },
      description: {
        en: "The south. Active volcanoes (Sakurajima), Japan's most aggressive onsen (Beppu's hells), millennium-old cedar forests (Yakushima — yes, this is the Princess Mononoke forest), and tropical beaches in Okinawa.",
        fr: "Le sud. Volcans actifs (Sakurajima), les onsen les plus extrêmes du Japon (les « enfers » de Beppu), forêts de cèdres millénaires (Yakushima — oui, la forêt de Princesse Mononoke), et plages tropicales à Okinawa.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "The Golden Route — 7 days",
        fr: "La Golden Route — 7 jours",
      },
      summary: {
        en: "The canonical first trip. Tokyo–Hakone–Kyoto–Nara–Osaka. Bullet train, JR Pass pays off.",
        fr: "Le voyage canonique pour une première fois. Tokyo–Hakone–Kyoto–Nara–Osaka. Shinkansen, le JR Pass est rentable.",
      },
      stops: {
        en: [
          "Day 1–3: Tokyo (Asakusa, Shibuya, Shinjuku, Tsukiji breakfast)",
          "Day 4: Hakone (ryokan + onsen, Lake Ashi cable car)",
          "Day 5–6: Kyoto (Fushimi Inari at sunrise, Arashiyama, Gion at dusk)",
          "Day 7: Nara day-trip + evening in Osaka Dotonbori → fly home from Kansai (KIX)",
        ],
        fr: [
          "Jour 1-3 : Tokyo (Asakusa, Shibuya, Shinjuku, petit-déj à Tsukiji)",
          "Jour 4 : Hakone (ryokan + onsen, téléphérique du lac Ashi)",
          "Jour 5-6 : Kyoto (Fushimi Inari au lever du soleil, Arashiyama, Gion à la nuit tombée)",
          "Jour 7 : journée à Nara + soir à Dotonbori (Osaka) → vol retour depuis Kansai (KIX)",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Golden Route + Hiroshima — 10 days",
        fr: "Golden Route + Hiroshima — 10 jours",
      },
      summary: {
        en: "Add Hiroshima, Miyajima, and an extra day each in Tokyo and Kyoto. The sweet-spot itinerary if you have the time.",
        fr: "Ajoutez Hiroshima, Miyajima et un jour de plus à Tokyo et Kyoto. L'itinéraire idéal si vous avez le temps.",
      },
      stops: {
        en: [
          "Day 1–4: Tokyo + day trip to Nikko",
          "Day 5: Hakone overnight",
          "Day 6–8: Kyoto + Nara day trip",
          "Day 9: Hiroshima + Miyajima overnight",
          "Day 10: Osaka, fly home",
        ],
        fr: [
          "Jour 1-4 : Tokyo + journée à Nikko",
          "Jour 5 : Hakone, une nuit",
          "Jour 6-8 : Kyoto + journée à Nara",
          "Jour 9 : Hiroshima + Miyajima, une nuit",
          "Jour 10 : Osaka, vol retour",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full circuit — 14 days",
        fr: "Le grand tour — 14 jours",
      },
      summary: {
        en: "Adds the Japan Alps (Kanazawa, Takayama, Shirakawa-go) and Mt Koya. Pace is faster but you see four faces of the country.",
        fr: "Ajoute les Alpes japonaises (Kanazawa, Takayama, Shirakawa-go) et le mont Koya. Rythme plus soutenu, mais quatre visages du pays en une fois.",
      },
      stops: {
        en: [
          "Day 1–4: Tokyo + Nikko or Kamakura day trip",
          "Day 5–6: Kanazawa + Shirakawa-go",
          "Day 7: Takayama → bus to Matsumoto",
          "Day 8–10: Kyoto + Nara",
          "Day 11: Mt Koya overnight in a temple",
          "Day 12: Hiroshima + Miyajima",
          "Day 13: Naoshima art island (sleep in Okayama)",
          "Day 14: Osaka, fly home",
        ],
        fr: [
          "Jour 1-4 : Tokyo + Nikko ou Kamakura en journée",
          "Jour 5-6 : Kanazawa + Shirakawa-go",
          "Jour 7 : Takayama → bus pour Matsumoto",
          "Jour 8-10 : Kyoto + Nara",
          "Jour 11 : mont Koya, nuit dans un temple",
          "Jour 12 : Hiroshima + Miyajima",
          "Jour 13 : île d'art de Naoshima (nuit à Okayama)",
          "Jour 14 : Osaka, vol retour",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 70,
        description: {
          en: "Hostel dorm or capsule (€25), konbini + ramen meals (€20), local trains and walking (€10), one paid attraction (€15). Doable, fun, you eat well.",
          fr: "Dortoir d'auberge ou capsule (25 €), repas konbini + ramen (20 €), trains locaux et marche (10 €), une attraction payante (15 €). Faisable, fun, on mange bien.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 160,
        description: {
          en: "3-star business hotel or guesthouse (€90), one sit-down dinner + casual lunch (€45), Shinkansen segments (€20 averaged), entries (€10). The sweet spot.",
          fr: "Hôtel 3 étoiles ou guesthouse (90 €), un dîner attablé + déjeuner décontracté (45 €), trajets Shinkansen (20 € lissés), entrées (10 €). Le bon équilibre.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 320,
        description: {
          en: "Ryokan or 4-star (€180), one omakase or kaiseki dinner (€100), reserved Shinkansen (€25), private experience or guide (€20). Honeymoon, milestone trip, or treat-yourself tier.",
          fr: "Ryokan ou 4 étoiles (180 €), un dîner omakase ou kaiseki (100 €), Shinkansen en réservé (25 €), expérience privée ou guide (20 €). Pour une lune de miel, une grande occasion ou s'offrir le voyage.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. The 7-day JR Pass is now ¥50,000 (~€290–320) since the late-2023 price hike — only worth it if you do Tokyo–Kyoto–Hiroshima round-trip; otherwise pay-as-you-go is cheaper. Cash still rules in small towns; carry ¥20,000 in notes.",
      fr: "Par personne, hors vol international. Le JR Pass 7 jours coûte désormais 50 000 ¥ (~290-320 €) depuis la hausse de fin 2023 — rentable seulement si vous faites Tokyo–Kyoto–Hiroshima aller-retour ; sinon, payez à l'unité, c'est moins cher. Le cash reste roi dans les petites villes ; gardez 20 000 ¥ en billets sur vous.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Carry cash. Konbini ATMs (7-Eleven, Lawson) take foreign cards 24/7. Many small restaurants, temples, and rural buses are still cash-only.",
        fr: "Ayez du cash. Les distributeurs des konbini (7-Eleven, Lawson) acceptent les cartes étrangères 24h/24. Beaucoup de petits restos, temples et bus ruraux n'acceptent que les espèces.",
      },
    },
    {
      do: true,
      text: {
        en: "Get a Suica or Pasmo IC card on arrival (or on your phone via Apple Wallet). Works on every train, bus and konbini in major cities.",
        fr: "Procurez-vous une carte IC Suica ou Pasmo à l'arrivée (ou sur votre téléphone via Apple Wallet). Fonctionne dans tous les trains, bus et konbini des grandes villes.",
      },
    },
    {
      do: true,
      text: {
        en: "Reserve big-ticket restaurants 1–3 months ahead (TableCheck, Pocket Concierge). Walk-ins exist but the best places are full.",
        fr: "Réservez les restos courus 1 à 3 mois à l'avance (TableCheck, Pocket Concierge). Le sans-réservation existe, mais les meilleures tables sont complètes.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't tip. Anywhere. It's confusing or mildly insulting. Service is included and pride-of-craft does the rest.",
        fr: "Ne laissez pas de pourboire. Nulle part. C'est embarrassant, voire vexant. Le service est compris et la fierté du métier fait le reste.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't eat or talk loudly on trains. Phone calls are a hard no. Eating is fine on Shinkansen, not on local commuter lines.",
        fr: "Ne mangez pas et ne parlez pas fort dans les trains. Les appels téléphoniques sont strictement proscrits. Manger est OK dans le Shinkansen, pas dans les trains de banlieue.",
      },
    },
    {
      do: true,
      text: {
        en: "Take off shoes wherever you see a step-up and slippers — temples, ryokans, some restaurants, fitting rooms. Wear easy-off shoes for the trip.",
        fr: "Enlevez vos chaussures dès que vous voyez une marche et des chaussons — temples, ryokans, certains restos, cabines d'essayage. Prenez des chaussures faciles à enlever pour le voyage.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't stand on the wrong side of the escalator. Left in Tokyo and most of east Japan, right in Osaka/Kansai. Watch the locals for two seconds before stepping on.",
        fr: "Ne vous trompez pas de côté sur l'escalator. Gauche à Tokyo et dans l'est, droite à Osaka/Kansai. Observez les locaux deux secondes avant de monter.",
      },
    },
    {
      do: true,
      text: {
        en: "Tattoos: many onsen and pools refuse them. Cover-up patches work for small ones; bigger ones, book a private ryokan bath (kashikiri buro) or look for 'tattoo-friendly' onsen lists online.",
        fr: "Tatouages : beaucoup d'onsen et piscines les refusent. Des patchs cache-tatouage fonctionnent pour les petits ; pour les grands, réservez un bain privé en ryokan (kashikiri buro) ou cherchez les listes d'onsen « tattoo-friendly » en ligne.",
      },
    },
  ],
  related: ["thailand"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 2. Italy
// ---------------------------------------------------------------------------
const italy: CountryGuide = {
  slug: { en: "italy", fr: "italie" },
  country: { en: "Italy", fr: "Italie" },
  continent: "europe",
  hero: {
    image: "/travel-guides/italy/hero.jpg",
    imageAlt: {
      en: "The Colosseum at sunset in Rome",
      fr: "Le Colisée au coucher du soleil à Rome",
    },
    tag: {
      en: "Country guide · Europe",
      fr: "Guide pays · Europe",
    },
  },
  meta: {
    title: {
      en: "Italy Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Italie 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Opinionated Italy travel guide for 2026: best season, the grand tour, regional food, honest budgets, cultural do's and don'ts. For first and repeat trips.",
      fr: "Guide voyage Italie 2026, sans bla-bla : meilleure saison, grand tour, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Italy isn't one country, it's twenty. Rome shouts, Florence whispers, Venice melts. The food changes every fifty kilometres. A house-wine carafe at lunch costs less than a Coke. Even a 'bad' cappuccino is better than the best one in most other countries you'll travel to.",
      "First trip: the grand tour — Rome, Florence, Venice — by high-speed train in seven days. Second trip: pick a coast (Amalfi south, Cinque Terre north-west) or Sicily, a world entirely of its own. Third trip: rural — Tuscan hill towns, the Dolomites, baroque inland Sicily. Don't try to 'do' Italy in 10 days; pick three places and breathe.",
      "Two things to know before booking. Book the major sites — Vatican, Uffizi, Colosseum — four to eight weeks ahead; walk-up queues now run two hours in summer. And August is a trap: Italians flee inland for ferragosto, half the city restaurants shutter, prices spike on the coast. Late May or September is the sweet spot — long days, warm seas, no school groups.",
    ],
    fr: [
      "L'Italie n'est pas un pays mais vingt. Rome crie, Florence chuchote, Venise fond. La cuisine change tous les cinquante kilomètres. Un pichet de vin maison au déjeuner coûte moins cher qu'un Coca. Et même un « mauvais » cappuccino bat le meilleur de la plupart des autres pays.",
      "Première fois : le grand tour — Rome, Florence, Venise — en train à grande vitesse sur sept jours. Deuxième fois : choisissez une côte (Amalfi au sud, Cinque Terre au nord-ouest) ou la Sicile, un monde à part entière. Troisième fois : la campagne — villages perchés toscans, Dolomites, Sicile baroque intérieure. N'essayez pas de « faire » l'Italie en 10 jours ; choisissez trois lieux et respirez.",
      "Deux trucs à savoir avant de réserver. Réservez les sites majeurs — Vatican, Offices, Colisée — 4 à 8 semaines à l'avance ; sinon, comptez 2 h de queue l'été. Et août est un piège : les Italiens fuient pour ferragosto, la moitié des restos de ville ferment, les prix explosent sur la côte. Fin mai ou septembre, c'est le sweet spot — longues journées, mer tiède, pas de groupes scolaires.",
    ],
  },
  quickFacts: {
    capital: { en: "Rome", fr: "Rome" },
    language: { en: "Italian", fr: "Italien" },
    currency: { code: "EUR", symbol: "€" },
    timezone: "CET (UTC+1)",
    visa: {
      en: "Schengen — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Schengen — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~59M",
  },
  bestSeason: {
    best: {
      months: {
        en: "Mid-May – June · September – mid-October",
        fr: "Mi-mai – juin · septembre – mi-octobre",
      },
      description: {
        en: "Warm without being brutal, sea is swimmable, light is golden, and the school groups have left. Coastal rooms still book up — secure Cinque Terre and Amalfi 2–3 months ahead.",
        fr: "Chaud sans être étouffant, mer baignable, lumière dorée, et les groupes scolaires sont rentrés. Les hôtels du littoral saturent — réservez Cinque Terre et la côte amalfitaine 2-3 mois à l'avance.",
      },
    },
    shoulder: {
      months: {
        en: "April · late October – early November · March",
        fr: "Avril · fin octobre – début novembre · mars",
      },
      description: {
        en: "Mild, occasional rain, very few crowds. Tuscany and Rome are at their most photogenic. Some coastal hotels still closed in March and November.",
        fr: "Doux, pluie possible, très peu de monde. La Toscane et Rome n'ont jamais été aussi photogéniques. Une partie des hôtels côtiers est encore fermée en mars et novembre.",
      },
    },
    avoid: {
      months: {
        en: "Mid-July – August (especially Ferragosto, Aug 15)",
        fr: "Mi-juillet – août (surtout Ferragosto, le 15 août)",
      },
      description: {
        en: "35–40°C in southern cities, peak prices on the coast, half the urban restaurants closed for the owner's holiday. Rome and Florence become unwalkable midday.",
        fr: "35-40°C dans les villes du sud, prix maxi sur la côte, la moitié des restos urbains ferment pour les congés du patron. Rome et Florence deviennent impraticables à midi.",
      },
    },
  },
  mustSee: [
    {
      name: "Colosseum & Roman Forum",
      region: { en: "Rome, Lazio", fr: "Rome, Latium" },
      description: {
        en: "Book the combo ticket (Colosseum + Forum + Palatine) online for around €18. Hit it at opening (8:30am) or last entry to skip the worst of the queues.",
        fr: "Réservez en ligne le combo Colisée + Forum + Palatin pour ~18 €. Allez-y à l'ouverture (8h30) ou à la dernière entrée pour éviter le pire de la queue.",
      },
      image: "/travel-guides/italy/colosseum-forum.jpg",
      imageAlt: {
        en: "Roman Colosseum exterior with arches at golden hour",
        fr: "Extérieur du Colisée romain avec ses arches à l'heure dorée",
      },
      mapsUrl: "https://maps.app.goo.gl/U3JN2QJ4Yhqv7L9D9",
    },
    {
      name: "Vatican Museums & Sistine Chapel",
      region: { en: "Vatican City, Rome", fr: "Cité du Vatican, Rome" },
      description: {
        en: "The Friday-evening opening (around €25, summer only, 7pm–10pm) is the only way to see the Sistine Chapel without a wall of people. Walk through to St Peter's after — also free, also stunning.",
        fr: "L'ouverture du vendredi soir (~25 €, été uniquement, 19h-22h) est la seule façon de voir la Sixtine sans un mur de gens. Enchaînez sur Saint-Pierre — gratuit, et magnifique.",
      },
      image: "/travel-guides/italy/vatican-sistine.jpg",
      imageAlt: {
        en: "St Peter's Basilica dome from St Peter's Square in Vatican City",
        fr: "Dôme de la basilique Saint-Pierre depuis la place Saint-Pierre, Cité du Vatican",
      },
      mapsUrl: "https://maps.app.goo.gl/HhVRgFc8YjkpKpD86",
    },
    {
      name: "Florence Duomo & Uffizi",
      region: { en: "Florence, Tuscany", fr: "Florence, Toscane" },
      description: {
        en: "Climb Brunelleschi's dome (booked, 463 steps) at sunset. The Uffizi requires a timed ticket; allow 3 hours minimum — it's the world's deepest Renaissance collection.",
        fr: "Grimpez le dôme de Brunelleschi (réservé, 463 marches) au coucher du soleil. Les Offices se visitent sur créneau ; comptez 3h minimum — c'est la plus grande collection Renaissance au monde.",
      },
      image: "/travel-guides/italy/florence-duomo.jpg",
      imageAlt: {
        en: "Florence Cathedral with Brunelleschi's terracotta dome",
        fr: "Cathédrale de Florence avec le dôme en terre cuite de Brunelleschi",
      },
      mapsUrl: "https://maps.app.goo.gl/56kqkAGgkPVy9hUu5",
    },
    {
      name: "Venice canals & St Mark's",
      region: { en: "Venice, Veneto", fr: "Venise, Vénétie" },
      description: {
        en: "Get lost in Cannaregio and Castello, not San Marco. Take vaporetto line 1 down the Grand Canal at dusk — about €9.50 and the best 45-minute cruise of your life.",
        fr: "Perdez-vous dans le Cannaregio et le Castello, pas autour de Saint-Marc. Prenez le vaporetto 1 sur le Grand Canal au crépuscule — ~9,50 € pour la plus belle croisière de 45 minutes de votre vie.",
      },
      image: "/travel-guides/italy/venice-canal.jpg",
      imageAlt: {
        en: "Gondolas on a Venice canal with historic buildings",
        fr: "Gondoles sur un canal de Venise avec ses bâtiments historiques",
      },
      mapsUrl: "https://maps.app.goo.gl/RpJU1k7CXgB6cQqd6",
    },
    {
      name: "Cinque Terre",
      region: { en: "Liguria", fr: "Ligurie" },
      description: {
        en: "Five cliffside villages connected by trails and the regional train. Hike Monterosso to Vernazza early (3hr, real climb). Sleep in Vernazza or Monterosso, not Riomaggiore (more crowded, less charm).",
        fr: "Cinq villages perchés reliés par sentiers et train régional. Faites Monterosso – Vernazza tôt le matin (3h, vraie grimpette). Dormez à Vernazza ou Monterosso, pas Riomaggiore (plus bondé, moins charmant).",
      },
      image: "/travel-guides/italy/cinque-terre.jpg",
      imageAlt: {
        en: "Colorful houses of a Cinque Terre village on a cliff above the sea",
        fr: "Maisons colorées d'un village des Cinque Terre sur une falaise au-dessus de la mer",
      },
      mapsUrl: "https://maps.app.goo.gl/RskdJBuJUbjkXqqq6",
    },
    {
      name: "Amalfi Coast & Positano",
      region: { en: "Campania", fr: "Campanie" },
      description: {
        en: "The SITA bus along the corniche is the most beautiful — and most terrifying — ride in Europe. Stay in Praiano (quieter, cheaper) and day-trip to Positano and Amalfi town.",
        fr: "Le bus SITA sur la corniche est le trajet le plus beau — et le plus terrifiant — d'Europe. Posez vos valises à Praiano (plus calme, moins cher) et faites Positano et Amalfi en journée.",
      },
      image: "/travel-guides/italy/amalfi-positano.jpg",
      imageAlt: {
        en: "Positano pastel houses cascading down the Amalfi cliffs",
        fr: "Les maisons pastel de Positano cascadant sur les falaises de la côte amalfitaine",
      },
      mapsUrl: "https://maps.app.goo.gl/p6jhDjYRfSWnrtho6",
    },
    {
      name: "Pompeii & Herculaneum",
      region: { en: "Naples area, Campania", fr: "Région de Naples, Campanie" },
      description: {
        en: "Pompeii is huge — hire a guide for €25 or you'll miss the best frescoes and the brothel mosaics. Herculaneum is smaller, better-preserved, less crowded. Both in one day via the Circumvesuviana train.",
        fr: "Pompéi est immense — prenez un guide à 25 € ou vous raterez les meilleures fresques et les mosaïques du lupanar. Herculanum est plus petit, mieux conservé, moins bondé. Les deux en une journée via le train Circumvesuviana.",
      },
      image: "/travel-guides/italy/pompeii.jpg",
      imageAlt: {
        en: "Ancient Pompeii ruins with Mount Vesuvius in the background",
        fr: "Ruines antiques de Pompéi avec le Vésuve en arrière-plan",
      },
      mapsUrl: "https://maps.app.goo.gl/aZGTr5j7c7DvpEjJ7",
    },
    {
      name: "Pantheon & Trastevere",
      region: { en: "Rome, Lazio", fr: "Rome, Latium" },
      description: {
        en: "The Pantheon is 2,000 years old and still has the world's largest unreinforced concrete dome. Entry is now €5 (free until 2023). Walk across the river to Trastevere afterward for dinner.",
        fr: "Le Panthéon a 2 000 ans et abrite encore le plus grand dôme en béton non armé du monde. L'entrée est passée à 5 € (gratuit jusqu'en 2023). Traversez le fleuve vers le Trastevere pour le dîner.",
      },
      image: "/travel-guides/italy/pantheon-trastevere.jpg",
      imageAlt: {
        en: "Pantheon facade with portico columns in central Rome",
        fr: "Façade du Panthéon avec ses colonnes du portique, dans le centre de Rome",
      },
      mapsUrl: "https://maps.app.goo.gl/qHYxgsTrhuC4qN5BA",
    },
    {
      name: "Lake Como",
      region: { en: "Lombardy", fr: "Lombardie" },
      description: {
        en: "Bellagio and Varenna are the postcard towns; ferry-hop between them. Day-trippable from Milan (1hr train to Varenna), but one overnight on the lake is the move.",
        fr: "Bellagio et Varenna sont les villages carte postale ; alternez en ferry. Faisable en journée depuis Milan (1h de train pour Varenna), mais une nuit sur le lac est l'option qui vaut le coup.",
      },
      image: "/travel-guides/italy/lake-como.jpg",
      imageAlt: {
        en: "Lake Como with mountains and a lakeside village",
        fr: "Le lac de Côme avec ses montagnes et un village au bord de l'eau",
      },
      mapsUrl: "https://maps.app.goo.gl/Z5jBmGydzMx1Q5tL9",
    },
    {
      name: "Sicily — Taormina & Mt Etna",
      region: { en: "Sicily", fr: "Sicile" },
      description: {
        en: "Taormina has the Greek theatre with Etna smoking behind it (yes, the White Lotus one). Climb Etna by cable car + jeep for around €70 — active volcano, summit. Palermo street food deserves its own trip.",
        fr: "Taormina abrite le théâtre grec avec l'Etna fumant en arrière-plan (oui, celui de White Lotus). Montez l'Etna en téléphérique + jeep pour ~70 € — volcan actif jusqu'au sommet. La street food de Palerme mérite à elle seule un voyage.",
      },
      image: "/travel-guides/italy/sicily-etna.jpg",
      imageAlt: {
        en: "Taormina ancient Greek theatre with Mount Etna in the distance",
        fr: "Théâtre grec antique de Taormina avec l'Etna au loin",
      },
      mapsUrl: "https://maps.app.goo.gl/L7tD1nQ5K8XmK9Br9",
    },
    {
      name: "Tuscan hill towns",
      region: { en: "Tuscany", fr: "Toscane" },
      description: {
        en: "Siena, San Gimignano, Montepulciano, Pienza. Drive between them — train doesn't reach the best ones. Stop at every cantina (wine cellar) along the SR2 — that's the actual point.",
        fr: "Sienne, San Gimignano, Montepulciano, Pienza. Roulez entre les villages — le train ne dessert pas les plus beaux. Arrêtez-vous à chaque cantina (cave) sur la SR2 — c'est l'intérêt même de la route.",
      },
      image: "/travel-guides/italy/tuscany-hill-towns.jpg",
      imageAlt: {
        en: "Tuscan countryside with cypress-lined road and rolling hills",
        fr: "Campagne toscane avec une route bordée de cyprès et des collines vallonnées",
      },
      mapsUrl: "https://maps.app.goo.gl/QXJG4pdY7Dr3RhMG8",
    },
    {
      name: "Dolomites",
      region: { en: "Trentino-Alto Adige", fr: "Trentin-Haut-Adige" },
      description: {
        en: "Sharp limestone peaks, glacial lakes (Lago di Braies), the best summer hiking in Europe. Cortina d'Ampezzo is the base. Add a refugio overnight for the full experience.",
        fr: "Pics calcaires acérés, lacs glaciaires (Lago di Braies), les plus belles randos d'été d'Europe. Cortina d'Ampezzo sert de camp de base. Ajoutez une nuit en refuge pour l'expérience complète.",
      },
      image: "/travel-guides/italy/dolomites.jpg",
      imageAlt: {
        en: "Dolomites peaks reflected in an alpine lake",
        fr: "Pics des Dolomites reflétés dans un lac alpin",
      },
      mapsUrl: "https://maps.app.goo.gl/Ks1F3jWXKuY5HrTM7",
    },
  ],
  specialties: [
    {
      name: { en: "Pasta", fr: "Pâtes" },
      category: "food",
      description: {
        en: "Every region has its own. Carbonara is Roman (NO cream — guanciale, egg, pecorino, pepper). Bolognese (ragù) is from Bologna and almost never served with spaghetti — it's tagliatelle. Pesto is Genoese, orecchiette is Pugliese. Order regional in the city it was invented in.",
        fr: "Chaque région a la sienne. La carbonara est romaine (PAS de crème — guanciale, œuf, pecorino, poivre). Le ragù alla bolognese vient de Bologne, presque jamais servi avec des spaghettis — c'est avec des tagliatelles. Le pesto est génois, les orecchiette des Pouilles. Commandez la spécialité dans sa ville d'origine.",
      },
      image: "/travel-guides/italy/pasta.jpg",
      imageAlt: {
        en: "Plate of fresh Italian pasta with sauce",
        fr: "Assiette de pâtes fraîches italiennes avec sauce",
      },
    },
    {
      name: { en: "Pizza", fr: "Pizza" },
      category: "food",
      description: {
        en: "Naples is the original. Thin chewy base, wood-fired in 90 seconds, blistered crust, San Marzano tomato, mozzarella di bufala. Roman pizza al taglio (rectangular, by the slice) is cheaper, faster, also great. Skip the gimmicky toppings.",
        fr: "Naples est l'originale. Pâte fine et moelleuse, cuite au feu de bois en 90 secondes, croûte boursouflée, tomate San Marzano, mozzarella di bufala. La pizza romaine al taglio (rectangulaire, à la coupe) est moins chère, plus rapide, aussi très bonne. Évitez les garnitures gadgets.",
      },
      image: "/travel-guides/italy/pizza.jpg",
      imageAlt: {
        en: "Neapolitan margherita pizza with blistered crust",
        fr: "Pizza margherita napolitaine avec sa croûte boursouflée",
      },
    },
    {
      name: { en: "Gelato", fr: "Gelato" },
      category: "food",
      description: {
        en: "Real gelato is dense, low-air, store-front colors muted. If banana is bright yellow or pistachio is neon green, walk past. Look for 'gelato artigianale' and tubs that are covered or only gently mounded, not towering pyramids.",
        fr: "Le vrai gelato est dense, peu aéré, ses couleurs sont assez sourdes en vitrine. Si la banane est jaune vif ou la pistache vert fluo, passez votre chemin. Cherchez « gelato artigianale » et des bacs couverts ou à peine bombés, jamais en pyramides.",
      },
      image: "/travel-guides/italy/gelato.jpg",
      imageAlt: {
        en: "Display of colorful Italian gelato in a gelateria",
        fr: "Vitrine de gelato italien coloré dans une gelateria",
      },
    },
    {
      name: { en: "Espresso & coffee", fr: "Espresso & café" },
      category: "drink",
      description: {
        en: "Italians take espresso standing at the bar (cheaper than sitting). One shot, drink in two sips, leave 80 cents. Cappuccino is breakfast only — ordering one after 11am will get you a polite pity look. Order like a local and the barista warms up immediately.",
        fr: "Les Italiens prennent l'espresso debout au comptoir (moins cher qu'attablé). Un shot, deux gorgées, 80 centimes. Le cappuccino, c'est le petit-déjeuner uniquement — en commander un après 11h vous vaudra un regard poliment apitoyé. Commandez comme un local et le barista vous adopte.",
      },
      image: "/travel-guides/italy/espresso.jpg",
      imageAlt: {
        en: "Italian espresso shot in a small white cup on a bar counter",
        fr: "Espresso italien dans une petite tasse blanche sur un comptoir de bar",
      },
    },
    {
      name: { en: "Aperitivo", fr: "Aperitivo" },
      category: "drink",
      description: {
        en: "The 6–8pm pre-dinner ritual. An Aperol Spritz, Negroni, or Campari soda, usually with free snacks — cicchetti in Venice, taglieri in Milan, fritti in Rome. Cheap (€8–12), social, the best three hours of any Italian day.",
        fr: "Le rituel d'avant-dîner, de 18h à 20h. Un Aperol Spritz, Negroni ou Campari soda, en général avec snacks offerts — cicchetti à Venise, taglieri à Milan, fritti à Rome. Pas cher (8-12 €), convivial, les trois plus belles heures de la journée italienne.",
      },
      image: "/travel-guides/italy/aperitivo.jpg",
      imageAlt: {
        en: "Aperol Spritz cocktails on a wooden table",
        fr: "Cocktails Aperol Spritz sur une table en bois",
      },
    },
    {
      name: { en: "Italian wine", fr: "Vin italien" },
      category: "drink",
      description: {
        en: "Chianti and Brunello (Tuscany), Barolo and Barbera (Piedmont), Prosecco and Amarone (Veneto), Nero d'Avola and Etna (Sicily). House wine ('vino della casa') in any honest trattoria is shockingly good — €5 for a half-litre is normal.",
        fr: "Chianti et Brunello (Toscane), Barolo et Barbera (Piémont), Prosecco et Amarone (Vénétie), Nero d'Avola et Etna (Sicile). Le vin maison (« vino della casa ») dans une trattoria honnête est étonnamment bon — 5 € le demi-litre, c'est la norme.",
      },
      image: "/travel-guides/italy/wine.jpg",
      imageAlt: {
        en: "Glass of Italian red wine in a vineyard at sunset",
        fr: "Verre de vin rouge italien dans un vignoble au coucher du soleil",
      },
    },
    {
      name: { en: "Renaissance art & opera", fr: "Art Renaissance & opéra" },
      category: "art",
      description: {
        en: "Uffizi (Florence), Vatican Museums (Rome), Galleria Borghese (Rome), Accademia (Florence, for the David) for the masterpieces. La Scala (Milan), La Fenice (Venice), and the open-air Arena di Verona (June–Aug) for opera — book Verona months ahead.",
        fr: "Les Offices (Florence), les Musées du Vatican (Rome), la Galerie Borghese (Rome), l'Accademia (Florence, pour le David) pour les chefs-d'œuvre. La Scala (Milan), la Fenice (Venise) et les Arènes de Vérone en plein air (juin-août) pour l'opéra — réservez Vérone des mois à l'avance.",
      },
      image: "/travel-guides/italy/renaissance-art.jpg",
      imageAlt: {
        en: "Italian Renaissance marble sculpture in a museum gallery",
        fr: "Sculpture en marbre de la Renaissance italienne dans une galerie de musée",
      },
    },
  ],
  regions: [
    {
      name: { en: "Lazio (Rome)", fr: "Latium (Rome)" },
      highlights: {
        en: "Rome, Tivoli, Ostia Antica, Castelli Romani",
        fr: "Rome, Tivoli, Ostia Antica, Castelli Romani",
      },
      description: {
        en: "The eternal city plus easy day trips: Tivoli for the villas, Ostia Antica for Pompeii's underrated cousin. Most international flights land at Fiumicino. Three days minimum just for Rome itself.",
        fr: "La ville éternelle et ses excursions faciles : Tivoli pour ses villas, Ostia Antica, le « cousin » sous-estimé de Pompéi. La plupart des vols internationaux atterrissent à Fiumicino. Trois jours minimum rien que pour Rome.",
      },
    },
    {
      name: { en: "Tuscany", fr: "Toscane" },
      highlights: {
        en: "Florence, Siena, San Gimignano, Chianti, Pisa, Lucca",
        fr: "Florence, Sienne, San Gimignano, Chianti, Pise, Lucques",
      },
      description: {
        en: "Florence as base, then hill towns and Chianti wineries by car. Lucca's intact Renaissance walls, Pisa's tower (90 seconds and you're done — don't sleep there). The most photographed countryside in Europe.",
        fr: "Florence comme camp de base, puis villages perchés et caves du Chianti en voiture. Les remparts Renaissance intacts de Lucques, la tour de Pise (90 secondes suffisent — n'y dormez pas). La campagne la plus photographiée d'Europe.",
      },
    },
    {
      name: { en: "Veneto (Venice)", fr: "Vénétie (Venise)" },
      highlights: {
        en: "Venice, Verona, Padua, Vicenza, Dolomites nearby",
        fr: "Venise, Vérone, Padoue, Vicence, Dolomites à proximité",
      },
      description: {
        en: "Venice itself plus day trips: Verona (Romeo & Juliet, summer opera), Padua (the Scrovegni Chapel — Giotto's frescoes), Vicenza (Palladian villas). The Dolomites are two hours north by train.",
        fr: "Venise et ses excursions : Vérone (Roméo et Juliette, opéra estival), Padoue (chapelle des Scrovegni, fresques de Giotto), Vicence (villas palladiennes). Les Dolomites sont à deux heures de train au nord.",
      },
    },
    {
      name: { en: "Liguria & Lombardy", fr: "Ligurie & Lombardie" },
      highlights: {
        en: "Cinque Terre, Portofino, Genoa, Milan, Lake Como, Bergamo",
        fr: "Cinque Terre, Portofino, Gênes, Milan, lac de Côme, Bergame",
      },
      description: {
        en: "Italy's wealthier, faster half. Cinque Terre and Portofino for the coast, Genoa for the underrated old port. Milan for fashion + food + Brera, Lake Como and Bergamo for the calmer alternative.",
        fr: "La moitié plus riche et plus rapide du pays. Cinque Terre et Portofino pour la côte, Gênes pour son vieux port sous-coté. Milan pour la mode, la cuisine et le quartier de Brera, le lac de Côme et Bergame pour l'alternative plus calme.",
      },
    },
    {
      name: { en: "Campania (Naples)", fr: "Campanie (Naples)" },
      highlights: {
        en: "Naples, Amalfi Coast, Capri, Pompeii, Paestum",
        fr: "Naples, côte amalfitaine, Capri, Pompéi, Paestum",
      },
      description: {
        en: "Pizza birthplace, ancient Rome (Pompeii, Herculaneum), the Amalfi Coast, Capri's grottoes, the Greek temples of Paestum. Loud, intense, magnificent — and Italy's most affordable south.",
        fr: "Berceau de la pizza, Rome antique (Pompéi, Herculanum), la côte amalfitaine, les grottes de Capri, les temples grecs de Paestum. Bruyant, intense, magnifique — et le sud le plus abordable d'Italie.",
      },
    },
    {
      name: { en: "Sicily", fr: "Sicile" },
      highlights: {
        en: "Palermo, Catania, Mt Etna, Taormina, Agrigento, Noto",
        fr: "Palerme, Catane, Etna, Taormine, Agrigente, Noto",
      },
      description: {
        en: "An entire-trip-on-its-own region. Palermo and Catania for street food, Etna for the volcano, Taormina for the Greek theatre, Agrigento for the temples, Noto and Ragusa for Baroque hill towns. Feels closer to North Africa than Milan.",
        fr: "Une région qui mérite son propre voyage. Palerme et Catane pour la street food, l'Etna pour le volcan, Taormine pour le théâtre grec, Agrigente pour les temples, Noto et Raguse pour les villes baroques. On se sent plus proche de l'Afrique du Nord que de Milan.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "The Grand Tour — 7 days",
        fr: "Le grand tour — 7 jours",
      },
      summary: {
        en: "Rome–Florence–Venice by high-speed train. The canonical first trip. Tight but doable.",
        fr: "Rome–Florence–Venise en train à grande vitesse. Le voyage canonique pour une première fois. Soutenu mais faisable.",
      },
      stops: {
        en: [
          "Day 1–3: Rome (Colosseum, Vatican, Pantheon, Trastevere)",
          "Day 4–5: Florence (Duomo, Uffizi, Oltrarno, sunset on Piazzale Michelangelo)",
          "Day 6–7: Venice (Cannaregio, Grand Canal at dusk, day trip to Burano) → fly home from Venice (VCE)",
        ],
        fr: [
          "Jour 1-3 : Rome (Colisée, Vatican, Panthéon, Trastevere)",
          "Jour 4-5 : Florence (Duomo, Offices, Oltrarno, coucher du soleil au Piazzale Michelangelo)",
          "Jour 6-7 : Venise (Cannaregio, Grand Canal au crépuscule, journée à Burano) → vol retour depuis Venise (VCE)",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Grand Tour + South — 10 days",
        fr: "Grand tour + sud — 10 jours",
      },
      summary: {
        en: "Add Naples, Pompeii, and the Amalfi Coast. The sweet-spot itinerary if you have the time.",
        fr: "Ajoutez Naples, Pompéi et la côte amalfitaine. L'itinéraire idéal si vous avez le temps.",
      },
      stops: {
        en: [
          "Day 1–3: Rome",
          "Day 4: Pompeii + train to Naples",
          "Day 5–6: Amalfi Coast (sleep in Praiano, day-trip Positano)",
          "Day 7–8: Florence",
          "Day 9–10: Venice, fly home",
        ],
        fr: [
          "Jour 1-3 : Rome",
          "Jour 4 : Pompéi + train pour Naples",
          "Jour 5-6 : Côte amalfitaine (nuit à Praiano, Positano en journée)",
          "Jour 7-8 : Florence",
          "Jour 9-10 : Venise, vol retour",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full Italy — 14 days",
        fr: "L'Italie en grand — 14 jours",
      },
      summary: {
        en: "Add Cinque Terre, Tuscan hill towns, and Sicily. Faster pace but four faces of the country in one trip.",
        fr: "Ajoute les Cinque Terre, les villages toscans et la Sicile. Rythme plus soutenu, mais quatre visages du pays en un seul voyage.",
      },
      stops: {
        en: [
          "Day 1–3: Rome",
          "Day 4–5: Naples + Amalfi Coast",
          "Day 6–8: Florence + day trip Siena & San Gimignano",
          "Day 9–10: Cinque Terre (sleep in Vernazza)",
          "Day 11–12: Venice + Verona day trip",
          "Day 13–14: Sicily (fly to Catania, Taormina + Etna)",
        ],
        fr: [
          "Jour 1-3 : Rome",
          "Jour 4-5 : Naples + côte amalfitaine",
          "Jour 6-8 : Florence + journée Sienne & San Gimignano",
          "Jour 9-10 : Cinque Terre (nuit à Vernazza)",
          "Jour 11-12 : Venise + Vérone en journée",
          "Jour 13-14 : Sicile (vol pour Catane, Taormine + Etna)",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 90,
        description: {
          en: "Hostel dorm or small Airbnb (€35), trattoria lunches + supermarket dinners (€25), regional trains and walking (€10), one paid site (€20). Italy is still doable on the cheap if you avoid the obvious coastal traps.",
          fr: "Dortoir d'auberge ou petit Airbnb (35 €), déjeuners en trattoria + dîners au super (25 €), trains régionaux et marche (10 €), un site payant (20 €). L'Italie reste faisable petit budget si on évite les pièges côtiers évidents.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 180,
        description: {
          en: "3-star hotel or B&B (€110), one full sit-down dinner + casual lunch (€45), reserved high-speed train or rental car (€15 averaged), entries (€10). The right tier for most travelers.",
          fr: "Hôtel 3 étoiles ou B&B (110 €), un dîner attablé + déjeuner décontracté (45 €), train à grande vitesse réservé ou voiture (15 € lissés), entrées (10 €). Le bon équilibre pour la plupart des voyageurs.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 380,
        description: {
          en: "Boutique hotel or design B&B (€230), one Michelin-bib or full-tasting dinner (€110), train first class or hire car (€25), private guide one day (€15 averaged). Honeymoon or milestone-trip tier.",
          fr: "Hôtel de charme ou B&B design (230 €), un dîner Bib Gourmand ou tasting (110 €), train en première ou voiture avec chauffeur (25 €), guide privé une journée (15 € lissés). Territoire lune de miel ou voyage exceptionnel.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. Trenitalia/Italo high-speed tickets drop 50% if you book 1–2 months ahead. Cash still rules in small towns and family trattorias — carry €100–200 in mixed notes.",
      fr: "Par personne, hors vol international. Les billets Trenitalia/Italo à grande vitesse baissent de 50 % réservés 1 à 2 mois avant. Le cash reste roi dans les petites villes et les trattorias familiales — gardez 100-200 € en billets sur vous.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Carry cash. Many small trattorias, family-run B&Bs, taxi drivers, and rural petrol stations are still cash-only or 'card-machine-broken'. Carry €100–200 in mixed notes.",
        fr: "Ayez du cash. Beaucoup de petites trattorias, B&B familiaux, taxis et stations-service rurales sont encore cash-only ou « machine cassée ». Gardez 100-200 € en billets variés.",
      },
    },
    {
      do: true,
      text: {
        en: "Book Vatican, Uffizi, Colosseum, Last Supper, and the Borghese 4–8 weeks ahead. Walk-ups now mean 2-hour queues in high season; some sites are flat-out sold out.",
        fr: "Réservez Vatican, Offices, Colisée, Cène et Borghese 4 à 8 semaines à l'avance. Sans résa, c'est 2 h de queue en haute saison ; certains sites sont carrément complets.",
      },
    },
    {
      do: true,
      text: {
        en: "Validate regional paper train tickets in the green/yellow machine on the platform before boarding. Forget once = €50 fine, no warnings.",
        fr: "Compostez vos billets papier de train régional dans la machine verte/jaune du quai avant de monter. Oublier une fois = 50 € d'amende, sans avertissement.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't tip in restaurants. Service is included; the 'coperto' (€2–4 per person) is the table fee, not tip. Round up at the bar for excellent service, that's it.",
        fr: "Ne laissez pas de pourboire au restaurant. Le service est compris ; le « coperto » (2-4 € par personne) est la couverture, pas un pourboire. Arrondissez au comptoir pour un service excellent, c'est tout.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't drive into a ZTL (limited traffic zone). Cameras photograph plates and fines arrive at your home address months later. Park outside the historic center and walk in.",
        fr: "Ne rentrez pas en voiture dans une ZTL (zone à trafic limité). Les caméras lisent les plaques et l'amende arrive à votre domicile des mois plus tard. Garez-vous en dehors du centre historique et entrez à pied.",
      },
    },
    {
      do: true,
      text: {
        en: "Dress code at churches: covered shoulders and knees, both genders. St Peter's, the Sistine, and the Duomo will turn you away. Pack a light scarf to throw on.",
        fr: "Code vestimentaire dans les églises : épaules et genoux couverts, hommes comme femmes. Saint-Pierre, la Sixtine et le Duomo vous refoulent sans hésiter. Glissez une écharpe légère dans le sac.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't order cappuccino after 11am. It's a breakfast drink; ordering one after lunch will get you a pity look. Espresso is the all-day default — standing at the bar (cheaper than sitting).",
        fr: "Ne commandez pas de cappuccino après 11h. C'est une boisson de petit-déjeuner ; en commander un après le déjeuner vous vaudra un regard navré. L'espresso est la valeur sûre toute la journée — debout au comptoir (moins cher qu'attablé).",
      },
    },
    {
      do: true,
      text: {
        en: "Watch pickpockets at Rome Termini, Florence near the Duomo and SMN station, Venice between Rialto and St Mark's, and on Naples metro lines. Crossbody bag in front, not a backpack.",
        fr: "Méfiez-vous des pickpockets à Rome Termini, Florence autour du Duomo et de SMN, Venise entre Rialto et Saint-Marc, et dans le métro de Naples. Sac en bandoulière devant, pas un sac à dos.",
      },
    },
  ],
  related: ["spain"],
  relatedDestinations: ["tuscany-road-trip"],
};

// ---------------------------------------------------------------------------
// 3. Spain
// ---------------------------------------------------------------------------
const spain: CountryGuide = {
  slug: { en: "spain", fr: "espagne" },
  country: { en: "Spain", fr: "Espagne" },
  continent: "europe",
  hero: {
    image: "/travel-guides/spain/hero.jpg",
    imageAlt: {
      en: "Tibidabo basilica above Barcelona at sunset",
      fr: "La basilique du Tibidabo dominant Barcelone au coucher du soleil",
    },
    tag: {
      en: "Country guide · Europe",
      fr: "Guide pays · Europe",
    },
  },
  meta: {
    title: {
      en: "Spain Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Espagne 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Opinionated Spain travel guide for 2026: best season, Barcelona to Sevilla, regional food, honest budgets, cultural do's and don'ts. For first and repeat trips.",
      fr: "Guide voyage Espagne 2026, sans bla-bla : meilleure saison, Barcelone à Séville, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Spain is way more regional than people expect. Catalonia, the Basque Country, Andalusia, Galicia — different languages, different food, different identities under one passport. 'Tapas' in Madrid mean something different from 'pintxos' in San Sebastian, and paella isn't really a Madrid thing at all (it's Valencian).",
      "First trip: Madrid, Barcelona, maybe Sevilla — high-speed train (AVE) links them in 2–3 hours. Second trip: the Andalusia loop — Sevilla, Cordoba, Granada, Ronda — for the Moorish history and white hill towns. Third trip: the north — San Sebastian for the food, Bilbao for the Guggenheim, the Camino de Santiago for the long walk.",
      "Two practical things. Dinner is at 9–11pm, lunch at 2–4pm. Restaurants outside tourist zones are closed 4–8pm; show up at 7pm and you'll be eating alone with other tourists. And the south is brutal in summer — Sevilla and Cordoba sit at 40°C through July and August. October is the secret best month: warm, calm, cheap.",
    ],
    fr: [
      "L'Espagne est bien plus régionale qu'on ne le croit. Catalogne, Pays basque, Andalousie, Galice — langues différentes, cuisines différentes, identités différentes sous un seul passeport. Les « tapas » à Madrid ne sont pas les mêmes que les « pintxos » à San Sebastián, et la paella n'est pas vraiment madrilène (elle est valencienne).",
      "Première fois : Madrid, Barcelone, peut-être Séville — l'AVE (TGV espagnol) les relie en 2-3 heures. Deuxième fois : la boucle andalouse — Séville, Cordoue, Grenade, Ronda — pour l'héritage maure et les villages blancs. Troisième fois : le nord — San Sebastián pour la cuisine, Bilbao pour le Guggenheim, le chemin de Saint-Jacques pour la longue marche.",
      "Deux trucs pratiques. Le dîner est à 21h-23h, le déjeuner à 14h-16h. Les restos hors zones touristiques ferment de 16h à 20h ; arrivez à 19h et vous mangerez seul avec d'autres touristes. Et le sud est brutal l'été — Séville et Cordoue tournent à 40°C en juillet-août. Octobre est le mois secret : doux, calme, moins cher.",
    ],
  },
  quickFacts: {
    capital: { en: "Madrid", fr: "Madrid" },
    language: {
      en: "Spanish (Castilian) · Catalan / Basque / Galician regionally",
      fr: "Espagnol (castillan) · catalan / basque / galicien selon les régions",
    },
    currency: { code: "EUR", symbol: "€" },
    timezone: "CET (UTC+1)",
    visa: {
      en: "Schengen — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Schengen — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~48M",
  },
  bestSeason: {
    best: {
      months: {
        en: "April – June · September – October",
        fr: "Avril – juin · septembre – octobre",
      },
      description: {
        en: "Warm without being punishing, the sea is swimmable from mid-May, and the post-Easter / pre-school-break windows are the calmest. Spring fiestas (Sevilla's Feria de Abril, Valencia's Las Fallas) fall in here — book months ahead if you want to align.",
        fr: "Chaud sans être étouffant, mer baignable dès la mi-mai, et les créneaux post-Pâques / pré-rentrée sont les plus calmes. Les fêtes de printemps (Feria de Abril à Séville, Las Fallas à Valence) tombent ici — réservez des mois à l'avance si vous voulez les caler.",
      },
    },
    shoulder: {
      months: {
        en: "March · November – early December",
        fr: "Mars · novembre – début décembre",
      },
      description: {
        en: "Mild in Andalusia (15–20°C), cool in Madrid and the north. Very few crowds, lower prices, restaurants take you seriously. Beach towns largely shut.",
        fr: "Doux en Andalousie (15-20°C), frais à Madrid et au nord. Très peu de monde, prix plus bas, les restos vous traitent en habitué. Les stations balnéaires sont quasi fermées.",
      },
    },
    avoid: {
      months: {
        en: "Mid-July – August · Christmas / New Year",
        fr: "Mi-juillet – août · Noël / Nouvel An",
      },
      description: {
        en: "Sevilla and Cordoba sit at 40°C+ through summer; locals leave. Coastal resorts triple-price. Christmas in Madrid and Barcelona is packed, hotels at peak; the same in Sevilla for Semana Santa (movable, usually March/April).",
        fr: "Séville et Cordoue plafonnent à 40°C tout l'été ; les locaux partent. Les stations triplent les prix. Noël à Madrid et Barcelone est bondé, les hôtels au tarif fort ; idem à Séville pour la Semana Santa (variable, souvent mars/avril).",
      },
    },
  },
  mustSee: [
    {
      name: "Sagrada Familia",
      region: { en: "Barcelona, Catalonia", fr: "Barcelone, Catalogne" },
      description: {
        en: "Gaudí's unfinished basilica is the visit that justifies the trip. Book online 2–4 weeks ahead with the tower-access add-on for the Nativity facade — the view down into the nave through the stained glass is the moment.",
        fr: "La basilique inachevée de Gaudí justifie à elle seule le voyage. Réservez en ligne 2 à 4 semaines avant, option accès tour côté Nativité — la plongée sur la nef à travers les vitraux, c'est LE moment.",
      },
      image: "/travel-guides/spain/sagrada-familia.jpg",
      imageAlt: {
        en: "Sagrada Familia exterior with Gaudí's organic spires",
        fr: "Extérieur de la Sagrada Familia avec les flèches organiques de Gaudí",
      },
      mapsUrl: "https://maps.app.goo.gl/PrEZ8s44Y7P7y1aBA",
    },
    {
      name: "Park Güell",
      region: { en: "Barcelona, Catalonia", fr: "Barcelone, Catalogne" },
      description: {
        en: "The Monumental Zone (with the mosaic dragon and serpent bench) requires a timed ticket — book a week ahead. Arrive at the 8am slot for the view down to the sea without the crowd.",
        fr: "La Zone monumentale (avec le dragon en mosaïque et le banc serpent) demande un billet horodaté — réservez une semaine avant. Le créneau de 8h offre la vue plongeante sur la mer sans la foule.",
      },
      image: "/travel-guides/spain/park-guell.jpg",
      imageAlt: {
        en: "Gaudí's mosaic serpent bench at Park Güell with city view",
        fr: "Banc serpent en mosaïque de Gaudí au Park Güell, vue sur la ville",
      },
      mapsUrl: "https://maps.app.goo.gl/UoXFFmKqWhGRPMrk6",
    },
    {
      name: "Alhambra & Generalife",
      region: { en: "Granada, Andalusia", fr: "Grenade, Andalousie" },
      description: {
        en: "The Nasrid Palaces sell out 2+ months ahead in high season — the moment they release tickets at 8am Granada time, buy. Twilight visit (the last entry) is the best light, fewest people.",
        fr: "Les palais nasrides sont complets 2 mois à l'avance en haute saison — dès l'ouverture de la billetterie à 8h heure de Grenade, achetez. La visite au crépuscule (dernière entrée) offre la meilleure lumière et le moins de monde.",
      },
      image: "/travel-guides/spain/alhambra.jpg",
      imageAlt: {
        en: "Alhambra palace overlooking Granada at sunset",
        fr: "Palais de l'Alhambra surplombant Grenade au coucher du soleil",
      },
      mapsUrl: "https://maps.app.goo.gl/wXKjxL9YPC7TyVf66",
    },
    {
      name: "Mezquita-Cathedral of Córdoba",
      region: { en: "Córdoba, Andalusia", fr: "Cordoue, Andalousie" },
      description: {
        en: "856 red-and-white horseshoe arches inside a mosque inside a cathedral — the most visually surreal religious building in Europe. Free entry between 8:30 and 9:30am Mon–Sat; full ticket the rest of the day.",
        fr: "856 arcs en fer à cheval rouges et blancs dans une mosquée dans une cathédrale — l'édifice religieux le plus surréaliste d'Europe. Entrée gratuite de 8h30 à 9h30 du lundi au samedi ; billet plein le reste de la journée.",
      },
      image: "/travel-guides/spain/mezquita-cordoba.jpg",
      imageAlt: {
        en: "Horseshoe arches of the Mezquita-Cathedral in Córdoba",
        fr: "Arcs en fer à cheval de la Mosquée-Cathédrale de Cordoue",
      },
      mapsUrl: "https://maps.app.goo.gl/9SR1mqMkH3wzkYC7A",
    },
    {
      name: "Plaza de España & Real Alcázar",
      region: { en: "Sevilla, Andalusia", fr: "Séville, Andalousie" },
      description: {
        en: "Plaza de España is free and was Naboo in Star Wars Episode II. The Alcázar nearby is Game of Thrones' Dorne (Sunspear). Pair them with the Cathedral's Giralda tower climb for a half-day Sevilla classic.",
        fr: "La Plaza de España est gratuite et a servi de planète Naboo dans Star Wars Épisode II. L'Alcázar voisin est devenu Dorne (Lancehélion) dans Game of Thrones. À combiner avec la montée à la Giralda pour une demi-journée Séville classique.",
      },
      image: "/travel-guides/spain/plaza-espana-sevilla.jpg",
      imageAlt: {
        en: "Tiled bridge and curved colonnade of Plaza de España in Sevilla",
        fr: "Pont en céramique et colonnade courbe de la Plaza de España à Séville",
      },
      mapsUrl: "https://maps.app.goo.gl/SbgwBuRBb4WTBdAa6",
    },
    {
      name: "Madrid — Prado, Royal Palace, Retiro",
      region: { en: "Madrid", fr: "Madrid" },
      description: {
        en: "The Prado for the Velázquez and Goya rooms (free 6–8pm weekdays, 5–7pm Sunday). Royal Palace second-largest in Europe by floor space. Walk the Retiro at dusk like every madrileño does.",
        fr: "Le Prado pour les salles Vélasquez et Goya (gratuit 18h-20h en semaine, 17h-19h dimanche). Le Palais royal, deuxième plus grand d'Europe en surface. Marchez le Retiro au crépuscule comme tout Madrilène.",
      },
      image: "/travel-guides/spain/madrid.jpg",
      imageAlt: {
        en: "Madrid Royal Palace facade with cathedral in the foreground",
        fr: "Façade du Palais royal de Madrid avec la cathédrale au premier plan",
      },
      mapsUrl: "https://maps.app.goo.gl/jp9yJpz4nF4j2QY27",
    },
    {
      name: "Toledo",
      region: { en: "Castilla-La Mancha", fr: "Castille-La Manche" },
      description: {
        en: "30-minute AVE from Madrid — the day trip almost everyone underestimates. Three cultures (Christian, Jewish, Moorish) layered on a hilltop. Stay one night to see it empty after the day-trippers leave.",
        fr: "30 minutes en AVE depuis Madrid — l'excursion d'une journée que tout le monde sous-estime. Trois cultures (chrétienne, juive, mauresque) superposées sur une butte. Dormez une nuit pour voir la ville vide après le départ des excursionnistes.",
      },
      image: "/travel-guides/spain/toledo.jpg",
      imageAlt: {
        en: "Medieval Toledo cityscape with cathedral and Alcázar on a hill",
        fr: "Vue de Tolède médiévale avec sa cathédrale et son Alcázar sur la colline",
      },
      mapsUrl: "https://maps.app.goo.gl/Ng7L1JeQ5UNgFkR58",
    },
    {
      name: "San Sebastián (Donostia)",
      region: { en: "Basque Country", fr: "Pays basque" },
      description: {
        en: "La Concha is one of Europe's most perfect city beaches; Parte Vieja has the densest pintxo crawl on earth (Bar Goiz Argi, Borda Berri, La Cuchara de San Telmo). Three Michelin three-stars within an hour — the world's highest density.",
        fr: "La Concha est l'une des plus belles plages urbaines d'Europe ; la Parte Vieja concentre la plus dense tournée de pintxos au monde (Bar Goiz Argi, Borda Berri, La Cuchara de San Telmo). Trois trois-étoiles Michelin à une heure — densité mondiale record.",
      },
      image: "/travel-guides/spain/san-sebastian.jpg",
      imageAlt: {
        en: "La Concha bay in San Sebastián with golden sand and surrounding hills",
        fr: "Baie de La Concha à San Sebastián, sable doré et collines environnantes",
      },
      mapsUrl: "https://maps.app.goo.gl/8mABquUkX8VfjsuM7",
    },
    {
      name: "Mallorca",
      region: { en: "Balearic Islands", fr: "Îles Baléares" },
      description: {
        en: "Skip the package-holiday south coast — go for the Tramuntana mountains (Deià, Sóller, Pollença) or the calas (turquoise coves) of the east. Best in May–June or September.",
        fr: "Évitez la côte sud des vacances en club — allez sur la sierra de Tramuntana (Deià, Sóller, Pollença) ou les calas (criques turquoise) de l'est. Idéal en mai-juin ou septembre.",
      },
      image: "/travel-guides/spain/mallorca.jpg",
      imageAlt: {
        en: "Turquoise cove on the Mallorca coast with limestone cliffs",
        fr: "Crique turquoise sur la côte de Majorque avec falaises calcaires",
      },
      mapsUrl: "https://maps.app.goo.gl/Yro6cgZ7yEwTM2km6",
    },
    {
      name: "Ronda",
      region: { en: "Málaga, Andalusia", fr: "Málaga, Andalousie" },
      description: {
        en: "A white town on a cliff split by the Puente Nuevo — a 120m bridge spanning the El Tajo gorge. Half-day from Sevilla or Málaga, but stay overnight to see the bridge lit and empty.",
        fr: "Un village blanc sur une falaise coupée par le Puente Nuevo — un pont de 120 m enjambant les gorges d'El Tajo. Demi-journée depuis Séville ou Málaga, mais restez une nuit pour voir le pont éclairé et désert.",
      },
      image: "/travel-guides/spain/ronda.jpg",
      imageAlt: {
        en: "Puente Nuevo bridge over El Tajo gorge in Ronda",
        fr: "Le Puente Nuevo sur les gorges d'El Tajo à Ronda",
      },
      mapsUrl: "https://maps.app.goo.gl/EhcG4z2EeR3M59As9",
    },
    {
      name: "Pueblos Blancos (white villages)",
      region: { en: "Cádiz / Málaga, Andalusia", fr: "Cadix / Málaga, Andalousie" },
      description: {
        en: "A chain of whitewashed villages from Arcos de la Frontera to Grazalema and Setenil de las Bodegas (built into a rock overhang). Best done by rental car, 2 days, stopping for sherry tastings in Jerez en route.",
        fr: "Une chaîne de villages blanchis à la chaux, d'Arcos de la Frontera à Grazalema et Setenil de las Bodegas (encastré dans un rocher). Idéal en voiture sur 2 jours, avec arrêts dégustation de xérès à Jerez sur la route.",
      },
      image: "/travel-guides/spain/pueblos-blancos.jpg",
      imageAlt: {
        en: "Whitewashed Andalusian village on a hillside",
        fr: "Village blanc andalou perché à flanc de colline",
      },
      mapsUrl: "https://maps.app.goo.gl/9PJ5wKgcwTL1aXjj8",
    },
    {
      name: "Santiago de Compostela",
      region: { en: "Galicia", fr: "Galice" },
      description: {
        en: "End point of the Camino — the cathedral's Pórtico de la Gloria is a Romanesque masterpiece, the pilgrim mass at noon swings a 53kg incense burner across the nave. Walk the last 100km from Sarria to qualify for the Compostela certificate.",
        fr: "Terminus du Chemin — le Pórtico de la Gloria de la cathédrale est un chef-d'œuvre roman, et la messe des pèlerins à midi voit un encensoir de 53 kg balancé en travers de la nef. Marchez les 100 derniers km depuis Sarria pour obtenir la Compostela.",
      },
      image: "/travel-guides/spain/santiago-cathedral.jpg",
      imageAlt: {
        en: "Santiago de Compostela cathedral facade in Galicia",
        fr: "Façade de la cathédrale de Saint-Jacques-de-Compostelle en Galice",
      },
      mapsUrl: "https://maps.app.goo.gl/Y5p2L8jzKtAhYqzG6",
    },
  ],
  specialties: [
    {
      name: { en: "Paella", fr: "Paella" },
      category: "food",
      description: {
        en: "Paella is Valencian, not Spanish-everywhere. The original is rabbit + chicken + green beans, no seafood. Seafood paella exists (it's called paella de marisco) and is excellent on the coast. The 'mixed' tourist version with chorizo and prawns is the dish locals warn each other about.",
        fr: "La paella est valencienne, pas espagnole partout. L'originale, c'est lapin + poulet + haricots verts, sans fruits de mer. La paella de fruits de mer existe (paella de marisco) et est excellente sur la côte. La version « mixte » avec chorizo et crevettes, c'est le plat dont les locaux se moquent entre eux.",
      },
      image: "/travel-guides/spain/paella.jpg",
      imageAlt: {
        en: "Seafood paella in a large traditional pan",
        fr: "Paella aux fruits de mer dans une grande poêle traditionnelle",
      },
    },
    {
      name: { en: "Tapas & pintxos", fr: "Tapas & pintxos" },
      category: "food",
      description: {
        en: "Tapas are small plates ordered from a menu; pintxos (Basque) are individual bites speared on a slice of bread, sitting on the bar — you grab them, count toothpicks at the end, pay. Sevilla and Granada still give free tapas with drinks; Madrid almost never does.",
        fr: "Les tapas sont des petites assiettes à commander à la carte ; les pintxos (basques) sont des bouchées individuelles plantées sur une tranche de pain, posées sur le comptoir — vous vous servez, on compte les pics à la fin, vous payez. Séville et Grenade offrent encore les tapas avec la boisson ; Madrid plus du tout.",
      },
      image: "/travel-guides/spain/tapas.jpg",
      imageAlt: {
        en: "Spanish pintxos lined up on a bar counter",
        fr: "Pintxos espagnols alignés sur un comptoir de bar",
      },
    },
    {
      name: { en: "Jamón ibérico", fr: "Jamón ibérico" },
      category: "food",
      description: {
        en: "Aged hams from black-hoof Iberian pigs, the finest fed exclusively on acorns (jamón ibérico de bellota). A good plate runs €20–35; the price gap between bellota and serrano is real. Sliced paper-thin, served at room temperature, eaten with the fingers.",
        fr: "Jambons affinés de porcs ibériques pata negra, les meilleurs nourris exclusivement aux glands (jamón ibérico de bellota). Une bonne assiette coûte 20-35 € ; la différence avec le serrano se sent en bouche. Coupé en tranches fines, servi à température, mangé avec les doigts.",
      },
      image: "/travel-guides/spain/jamon-iberico.jpg",
      imageAlt: {
        en: "Sliced jamón ibérico on a wooden board",
        fr: "Tranches de jamón ibérico sur une planche en bois",
      },
    },
    {
      name: { en: "Sangria & Spanish wine", fr: "Sangria & vin espagnol" },
      category: "drink",
      description: {
        en: "Sangria is touristy in most cities; locals drink tinto de verano (red wine + lemon Fanta + ice). Real Spanish wine: Rioja and Ribera del Duero for red, Albariño from Galicia for white, Cava from Catalonia for sparkling. House wine in a taberna is shockingly drinkable for €3 a glass.",
        fr: "La sangria est très touristique dans la plupart des villes ; les locaux boivent le tinto de verano (vin rouge + soda citron + glace). Les vrais vins espagnols : Rioja et Ribera del Duero en rouge, Albariño de Galice en blanc, Cava de Catalogne pour le pétillant. Le vin maison en taberna est étonnamment bon pour 3 € le verre.",
      },
      image: "/travel-guides/spain/sangria-wine.jpg",
      imageAlt: {
        en: "Pitcher of sangria with fruit and wine glasses",
        fr: "Pichet de sangria avec fruits et verres de vin",
      },
    },
    {
      name: { en: "Flamenco", fr: "Flamenco" },
      category: "art",
      description: {
        en: "Born in Andalusia. Sevilla, Jerez, and Granada are the home cities; small tablaos (intimate venues, 40–60 seats) beat the big tourist shows. Casa de la Memoria in Sevilla and La Chumbera in Granada are the safe locals' picks. Allow 60–90 minutes for a real show.",
        fr: "Né en Andalousie. Séville, Jerez et Grenade sont les villes du genre ; les petits tablaos (lieux intimes, 40-60 places) valent largement mieux que les grands spectacles touristiques. Casa de la Memoria à Séville et La Chumbera à Grenade sont les valeurs sûres des locaux. Comptez 60-90 minutes pour un vrai show.",
      },
      image: "/travel-guides/spain/flamenco.jpg",
      imageAlt: {
        en: "Flamenco dancer in red dress mid-performance",
        fr: "Danseuse de flamenco en robe rouge en pleine performance",
      },
    },
    {
      name: { en: "Churros con chocolate", fr: "Churros con chocolate" },
      category: "food",
      description: {
        en: "Long fried-dough sticks dunked in thick hot chocolate (more like pudding than cocoa). Breakfast or 4am after a night out — Chocolatería San Ginés in Madrid is open 24h and has been since 1894. Porras are the fatter version; equally good.",
        fr: "Longues baguettes de pâte frite trempées dans un chocolat chaud épais (plus crème que cacao). Petit-déjeuner ou 4h du matin après une sortie — la Chocolatería San Ginés à Madrid est ouverte 24h/24 depuis 1894. Les porras sont la version plus large ; aussi bonnes.",
      },
      image: "/travel-guides/spain/churros.jpg",
      imageAlt: {
        en: "Churros next to a cup of thick hot chocolate",
        fr: "Churros à côté d'une tasse de chocolat chaud épais",
      },
    },
    {
      name: { en: "Festivals & nightlife", fr: "Fêtes & nuit espagnole" },
      category: "experience",
      description: {
        en: "Spain runs on festivals: Las Fallas (Valencia, March), Semana Santa (everywhere, April), Feria de Abril (Sevilla, April-May), San Fermín (Pamplona, July), La Tomatina (Buñol, August). Outside that, Madrid and Barcelona don't really sleep — Spanish clubs open at 1am and close at 6am.",
        fr: "L'Espagne carbure aux fêtes : Las Fallas (Valence, mars), Semana Santa (partout, avril), Feria de Abril (Séville, avril-mai), San Fermín (Pampelune, juillet), La Tomatina (Buñol, août). En dehors, Madrid et Barcelone ne dorment pas vraiment — les clubs espagnols ouvrent à 1h et ferment à 6h.",
      },
      image: "/travel-guides/spain/festivals.jpg",
      imageAlt: {
        en: "Colorful Spanish street festival decorations",
        fr: "Décorations colorées d'une fête de rue espagnole",
      },
    },
  ],
  regions: [
    {
      name: { en: "Madrid & Castilla", fr: "Madrid & Castille" },
      highlights: {
        en: "Madrid, Toledo, Segovia, Salamanca, Ávila",
        fr: "Madrid, Tolède, Ségovie, Salamanque, Ávila",
      },
      description: {
        en: "The center. Madrid for the museums and the nightlife, day-trippable hilltop cities (Toledo, Segovia's Roman aqueduct, Salamanca's golden sandstone university). Cold in winter, brutal in July-August.",
        fr: "Le centre. Madrid pour les musées et la vie nocturne, et les villes perchées accessibles en journée (Tolède, l'aqueduc romain de Ségovie, l'université dorée de Salamanque). Froid en hiver, brutal en juillet-août.",
      },
    },
    {
      name: { en: "Catalonia", fr: "Catalogne" },
      highlights: {
        en: "Barcelona, Girona, Costa Brava, Montserrat",
        fr: "Barcelone, Gérone, Costa Brava, Montserrat",
      },
      description: {
        en: "Barcelona as base, Gaudí (Sagrada Familia, Park Güell, Casa Batlló) as the trip's spine. Day trips: Girona (Game of Thrones), the Costa Brava coves, Montserrat's sawtooth mountain monastery. Catalan is the working language.",
        fr: "Barcelone comme camp de base, Gaudí (Sagrada Familia, Park Güell, Casa Batlló) comme colonne vertébrale du voyage. Excursions : Gérone (Game of Thrones), les criques de la Costa Brava, le monastère de Montserrat sur sa montagne en dents de scie. Le catalan est la langue de travail.",
      },
    },
    {
      name: { en: "Andalusia", fr: "Andalousie" },
      highlights: {
        en: "Sevilla, Granada, Córdoba, Ronda, Málaga, Cádiz",
        fr: "Séville, Grenade, Cordoue, Ronda, Málaga, Cadix",
      },
      description: {
        en: "The Moorish south — Alhambra, Mezquita, the Alcázar, white hill towns, flamenco, sherry country (Jerez). Hottest summers in Europe; visit April–June or October. Best done with a rental car for the pueblos blancos.",
        fr: "Le sud mauresque — Alhambra, Mezquita, Alcázar, villages blancs, flamenco, terroir du xérès (Jerez). Les étés les plus chauds d'Europe ; visitez en avril-juin ou octobre. Idéal en voiture pour les pueblos blancos.",
      },
    },
    {
      name: { en: "Basque Country", fr: "Pays basque" },
      highlights: {
        en: "San Sebastián, Bilbao, Vitoria, the Basque coast",
        fr: "San Sebastián, Bilbao, Vitoria, la côte basque",
      },
      description: {
        en: "The food capital of Spain — and arguably of Europe. San Sebastián for pintxos, Bilbao for the Guggenheim, both for cider houses (sidrerías). Cooler, wetter, greener than the rest of Spain; feels like a different country.",
        fr: "La capitale gastronomique d'Espagne — et sans doute d'Europe. San Sebastián pour les pintxos, Bilbao pour le Guggenheim, les deux pour les cidreries (sidrerías). Plus frais, plus humide, plus vert que le reste de l'Espagne ; on dirait un autre pays.",
      },
    },
    {
      name: { en: "Galicia & the north", fr: "Galice & le nord" },
      highlights: {
        en: "Santiago de Compostela, Asturias coast, Picos de Europa",
        fr: "Saint-Jacques-de-Compostelle, côte des Asturies, Picos de Europa",
      },
      description: {
        en: "Atlantic Spain. Santiago de Compostela cathedral, the Camino routes, the dramatic Asturian coast, hiking in the Picos de Europa mountains. Seafood (octopus, percebes barnacles) at world-class level. Rains often — pack a layer.",
        fr: "L'Espagne atlantique. Cathédrale de Saint-Jacques-de-Compostelle, chemins de Saint-Jacques, côte des Asturies dramatique, randos dans les Picos de Europa. Fruits de mer (poulpe, percebes) de niveau mondial. Il pleut souvent — prévoyez une couche.",
      },
    },
    {
      name: { en: "Balearics & Canaries", fr: "Baléares & Canaries" },
      highlights: {
        en: "Mallorca, Ibiza, Menorca, Tenerife, Gran Canaria",
        fr: "Majorque, Ibiza, Minorque, Tenerife, Gran Canaria",
      },
      description: {
        en: "Balearics for Mediterranean coves and party towns (Ibiza); Canaries off the African coast for volcanic landscapes and year-round 22°C. Different climate, different feel — pick one trip at a time.",
        fr: "Baléares pour les criques méditerranéennes et la fête (Ibiza) ; Canaries au large de l'Afrique pour des paysages volcaniques et 22°C toute l'année. Climat et ambiance différents — un voyage par archipel.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "Madrid + Barcelona — 7 days",
        fr: "Madrid + Barcelone — 7 jours",
      },
      summary: {
        en: "The classic first trip. AVE high-speed train links the two in under 3 hours, plus a Toledo day trip.",
        fr: "Le voyage classique d'initiation. L'AVE relie les deux en moins de 3 heures, plus une journée à Tolède.",
      },
      stops: {
        en: [
          "Day 1–3: Madrid (Prado, Royal Palace, Retiro, tapas crawl in La Latina)",
          "Day 4: Toledo day trip",
          "Day 5–7: Barcelona (Sagrada Familia, Park Güell, Gothic Quarter, Barceloneta) → fly home from BCN",
        ],
        fr: [
          "Jour 1-3 : Madrid (Prado, Palais royal, Retiro, tournée de tapas dans La Latina)",
          "Jour 4 : Tolède en journée",
          "Jour 5-7 : Barcelone (Sagrada Familia, Park Güell, quartier gothique, Barceloneta) → vol retour BCN",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Grand Tour + Andalusia — 10 days",
        fr: "Grand tour + Andalousie — 10 jours",
      },
      summary: {
        en: "Add Sevilla and Granada to the Madrid-Barcelona spine. The sweet spot if you have the time.",
        fr: "Ajoutez Séville et Grenade au tronc Madrid-Barcelone. L'idéal si vous avez le temps.",
      },
      stops: {
        en: [
          "Day 1–3: Madrid + Toledo day trip",
          "Day 4–5: Sevilla (Alcázar, Cathedral, flamenco)",
          "Day 6–7: Granada (Alhambra, Albayzín)",
          "Day 8–10: Barcelona, fly home",
        ],
        fr: [
          "Jour 1-3 : Madrid + journée Tolède",
          "Jour 4-5 : Séville (Alcázar, cathédrale, flamenco)",
          "Jour 6-7 : Grenade (Alhambra, Albayzín)",
          "Jour 8-10 : Barcelone, vol retour",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full circuit — 14 days",
        fr: "Le grand tour — 14 jours",
      },
      summary: {
        en: "Adds Cordoba, Ronda, the Pueblos Blancos, and a stop in San Sebastián. Faster pace but the most complete picture of Spain.",
        fr: "Ajoute Cordoue, Ronda, les Pueblos Blancos et une escale à San Sebastián. Rythme plus soutenu, mais le portrait le plus complet du pays.",
      },
      stops: {
        en: [
          "Day 1–3: Madrid + Toledo",
          "Day 4–5: Sevilla",
          "Day 6: Cordoba day trip → Granada",
          "Day 7–8: Granada + Ronda en route",
          "Day 9: Pueblos Blancos (rental car)",
          "Day 10–12: Barcelona",
          "Day 13–14: San Sebastián, fly home from Bilbao (BIO) or Biarritz (BIQ)",
        ],
        fr: [
          "Jour 1-3 : Madrid + Tolède",
          "Jour 4-5 : Séville",
          "Jour 6 : journée à Cordoue → Grenade",
          "Jour 7-8 : Grenade + Ronda en chemin",
          "Jour 9 : Pueblos Blancos (en voiture)",
          "Jour 10-12 : Barcelone",
          "Jour 13-14 : San Sebastián, vol retour depuis Bilbao (BIO) ou Biarritz (BIQ)",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 80,
        description: {
          en: "Hostel dorm or small Airbnb (€30), menú del día lunch + tapas dinner (€25), regional trains and walking (€10), one paid site (€15). Spain is still one of Europe's best-value destinations on a low budget.",
          fr: "Dortoir d'auberge ou petit Airbnb (30 €), menú del día + tapas en dîner (25 €), trains régionaux et marche (10 €), un site payant (15 €). L'Espagne reste l'une des meilleures destinations européennes petit budget.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 160,
        description: {
          en: "3-star hotel or boutique B&B (€100), one sit-down dinner + tapas-bar lunch (€40), AVE high-speed train or rental car (€10 averaged), entries (€10). The right tier for most travelers.",
          fr: "Hôtel 3 étoiles ou B&B de charme (100 €), un dîner attablé + déjeuner en bar à tapas (40 €), AVE ou voiture (10 € lissés), entrées (10 €). Le bon équilibre pour la plupart des voyageurs.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 340,
        description: {
          en: "Paradores (state-run historic hotels) or boutique 4-star (€210), one Michelin-bib or chef's menu (€100), AVE preferente class (€20), private guide one day (€10 averaged). Honeymoon or anniversary tier.",
          fr: "Paradores (hôtels d'État dans des monuments historiques) ou 4 étoiles de charme (210 €), un dîner Bib Gourmand ou menu signature (100 €), AVE en preferente (20 €), guide privé une journée (10 € lissés). Lune de miel ou anniversaire.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. The menú del día (€12–18 fixed-price lunch) is the single best deal in European travel — 3 courses + wine + bread + coffee. Cash useful but cards work everywhere; tipping is round-up only.",
      fr: "Par personne, hors vol international. Le menú del día (12-18 € midi à prix fixe) est le meilleur deal du voyage européen — 3 services + vin + pain + café. Le cash est utile mais la carte passe partout ; pourboire = arrondi, pas plus.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Eat on Spanish time. Lunch 2–4pm, dinner 9–11pm. Showing up at 7pm in a non-touristy place means a closed kitchen or eating alone with other foreigners.",
        fr: "Mangez aux horaires espagnols. Déjeuner 14h-16h, dîner 21h-23h. Arriver à 19h dans un resto hors zone touristique, c'est cuisine fermée ou table de touristes esseulés.",
      },
    },
    {
      do: true,
      text: {
        en: "Order the menú del día for lunch — €12–18 in most cities for 3 courses + wine + bread + coffee. It's the single best food deal in Europe and you'll eat what locals eat.",
        fr: "Commandez le menú del día au déjeuner — 12-18 € dans la plupart des villes pour 3 services + vin + pain + café. C'est le meilleur deal gastro d'Europe, et vous mangez ce que mangent les locaux.",
      },
    },
    {
      do: true,
      text: {
        en: "Ask for 'una caña' not 'una cerveza' at the bar. A caña is a small draft beer (200ml-ish), drunk in 10 minutes, ordered three or four times across a tapas crawl. That's the local rhythm.",
        fr: "Demandez « una caña » plutôt que « una cerveza » au bar. Une caña, c'est une petite bière pression (~200 ml), bue en 10 minutes, qu'on commande 3 ou 4 fois sur une tournée de tapas. C'est le tempo local.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't expect free tapas everywhere. In Granada and parts of Sevilla you still get one with each drink; in Madrid, Barcelona, San Sebastián almost never. Don't argue if it's not offered.",
        fr: "Ne vous attendez pas à des tapas offertes partout. À Grenade et dans certaines parties de Séville, oui, avec chaque boisson ; à Madrid, Barcelone, San Sebastián, quasiment jamais. Ne discutez pas si rien n'arrive.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't tip like an American. Service is included; rounding up to the nearest euro at the bar or leaving €1–2 after a sit-down meal is plenty. Bigger tips are awkward, not generous.",
        fr: "N'oubliez pas que la pourboire à l'américaine n'est pas pratiqué. Le service est compris ; arrondir à l'euro supérieur au comptoir ou laisser 1-2 € après un repas attablé suffit. Plus, c'est gênant, pas généreux.",
      },
    },
    {
      do: true,
      text: {
        en: "Watch pickpockets on Las Ramblas and Barcelona metro, Madrid metro near Gran Vía and Sol, and any crowded plaza in Sevilla during Semana Santa or Feria. Crossbody bag in front.",
        fr: "Méfiez-vous des pickpockets sur Las Ramblas et dans le métro de Barcelone, dans le métro madrilène autour de Gran Vía et Sol, et sur toute place bondée à Séville pendant la Semana Santa ou la Feria. Sac en bandoulière devant.",
      },
    },
    {
      do: true,
      text: {
        en: "Learn 5 phrases in the local language. Catalan in Barcelona ('bon dia'), Basque in San Sebastián ('kaixo'), Galician in Santiago ('boas tardes'). It's not Spanish to them — using their words wins instant goodwill.",
        fr: "Apprenez 5 phrases dans la langue locale. Le catalan à Barcelone (« bon dia »), le basque à San Sebastián (« kaixo »), le galicien à Saint-Jacques (« boas tardes »). Ce n'est pas de l'espagnol à leurs oreilles — utiliser leurs mots gagne immédiatement de la sympathie.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't book a flamenco show in a 200-seat venue with dinner. The real ones are small (40–60 seats), no dinner, ticket-only, 60–90 minutes. Casa de la Memoria (Sevilla), La Chumbera (Granada), Casa Patas (Madrid).",
        fr: "Ne réservez pas un flamenco dans une salle de 200 places avec dîner inclus. Les vrais shows sont petits (40-60 places), sans dîner, billet seul, 60-90 minutes. Casa de la Memoria (Séville), La Chumbera (Grenade), Casa Patas (Madrid).",
      },
    },
  ],
  related: ["italy", "portugal"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 4. Thailand
// ---------------------------------------------------------------------------
const thailand: CountryGuide = {
  slug: { en: "thailand", fr: "thailande" },
  country: { en: "Thailand", fr: "Thaïlande" },
  continent: "asia",
  hero: {
    image: "/travel-guides/thailand/hero.jpg",
    imageAlt: {
      en: "Thai longtail boats on turquoise water at Railay beach, Krabi",
      fr: "Longtail boats thaïlandais sur l'eau turquoise de Railay, Krabi",
    },
    tag: {
      en: "Country guide · Asia",
      fr: "Guide pays · Asie",
    },
  },
  meta: {
    title: {
      en: "Thailand Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Thaïlande 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Real Thailand travel guide for 2026: best season, Bangkok to the islands, regional food, honest budgets, temple etiquette. First and repeat trips.",
      fr: "Guide voyage Thaïlande 2026, sans bla-bla : meilleure saison, Bangkok aux îles, cuisine, budget honnête, codes du temple. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Thailand is the cheapest country on earth where everything still works. Trains run (mostly on time), food is genuinely great at any price point, the south has some of Asia's best beaches, the north has temples and jungle. Most travelers come for two weeks; a lot extend to three.",
      "Two-trip framework. First trip: Bangkok (3 days) + Chiang Mai (3–4 days) + a south island block (4–7 days). Second trip: go deeper north (Pai, Mae Hong Son, Chiang Rai) or east into Isaan, the rural northeast almost no tourist sees. Skip the Phuket-Patong tourist strip; go Krabi or Ko Lanta instead — same coast, half the cost, twice the soul.",
      "Two things to know. The cool-dry season is November–February — perfect everywhere, but book accommodation 2–4 months ahead. The Andaman coast (Phuket, Krabi, Phi Phi) has its monsoon May–October; the Gulf coast (Samui, Phangan, Tao) has its monsoon October–December. You can swap coasts mid-trip to chase dry weather.",
    ],
    fr: [
      "La Thaïlande est le pays le moins cher de la planète où tout fonctionne encore. Les trains roulent (en gros à l'heure), la cuisine est excellente à tous les prix, le sud abrite quelques-unes des plus belles plages d'Asie, le nord les temples et la jungle. La plupart des voyageurs viennent deux semaines ; beaucoup prolongent à trois.",
      "Le cadre en deux voyages. Premier : Bangkok (3 jours) + Chiang Mai (3-4 jours) + un bloc d'îles au sud (4-7 jours). Deuxième : plus profond au nord (Pai, Mae Hong Son, Chiang Rai) ou à l'est dans l'Isaan, le nord-est rural que presque aucun touriste ne voit. Évitez la zone Phuket-Patong ; allez à Krabi ou Ko Lanta — même côte, moitié prix, deux fois plus d'âme.",
      "Deux trucs à savoir. La saison sèche-fraîche, c'est novembre-février — parfaite partout, mais à réserver 2 à 4 mois à l'avance. La côte Andaman (Phuket, Krabi, Phi Phi) a sa mousson de mai à octobre ; la côte du Golfe (Samui, Phangan, Tao), d'octobre à décembre. Vous pouvez changer de côte en cours de voyage pour suivre le beau temps.",
    ],
  },
  quickFacts: {
    capital: { en: "Bangkok", fr: "Bangkok" },
    language: { en: "Thai", fr: "Thaï" },
    currency: { code: "THB", symbol: "฿" },
    timezone: "ICT (UTC+7)",
    visa: {
      en: "60-day visa exemption since July 2024 for EU, UK, US, Canada, Australia passports. Extendable +30 days at any immigration office.",
      fr: "Exemption de visa 60 jours depuis juillet 2024 pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie. Prolongeable de 30 jours dans n'importe quel bureau d'immigration.",
    },
    plug: "Type A / B / C · 220V",
    driveSide: "left",
    population: "~71M",
  },
  bestSeason: {
    best: {
      months: {
        en: "November – February",
        fr: "Novembre – février",
      },
      description: {
        en: "The cool-dry season. 25–30°C in the south, cool nights up north (10°C in Chiang Rai mountains). Perfect everywhere — and the entire planet knows it. Book 2–4 months ahead, especially Krabi, Phi Phi, Pai.",
        fr: "La saison sèche-fraîche. 25-30°C au sud, nuits fraîches au nord (10°C dans les montagnes de Chiang Rai). Parfait partout — et la planète entière le sait. Réservez 2 à 4 mois à l'avance, surtout Krabi, Phi Phi, Pai.",
      },
    },
    shoulder: {
      months: {
        en: "March · October",
        fr: "Mars · octobre",
      },
      description: {
        en: "March is hot (35–38°C) but dry and quieter. October is the end of the Andaman monsoon — rain ebbing, prices still low, fewer travelers. Both work if you're willing to time it.",
        fr: "Mars est chaud (35-38°C) mais sec et plus calme. Octobre marque la fin de la mousson Andaman — la pluie se calme, les prix sont encore bas, moins de monde. Les deux fonctionnent si vous êtes prêt à jouer le timing.",
      },
    },
    avoid: {
      months: {
        en: "April · Mid-May – September",
        fr: "Avril · mi-mai – septembre",
      },
      description: {
        en: "April is 40°C+ and includes Songkran (April 13–15), the country-wide water-fight new year — fun if you plan around it, brutal if you don't. May–September is monsoon on the Andaman side, with the Phi Phi/Krabi islands often inaccessible. The Gulf islands (Samui side) are fine through August.",
        fr: "Avril dépasse les 40°C et tombe pendant Songkran (13-15 avril), la bataille d'eau nationale du Nouvel An — sympa si vous calez le voyage autour, brutal sinon. De mai à septembre, c'est la mousson Andaman, avec Phi Phi/Krabi souvent inaccessibles. Les îles du Golfe (côté Samui) restent OK jusqu'en août.",
      },
    },
  },
  mustSee: [
    {
      name: "Grand Palace & Wat Phra Kaew",
      region: { en: "Bangkok, Central", fr: "Bangkok, Centre" },
      description: {
        en: "The royal complex with the Emerald Buddha. Arrive at 8am opening to beat the heat and the tour groups. Strict dress code — shoulders and knees covered, no leggings, no ripped jeans. They rent sarongs at the entrance if you're underdressed.",
        fr: "Le complexe royal avec le Bouddha d'Émeraude. Arrivez à l'ouverture (8h) pour devancer la chaleur et les groupes. Code vestimentaire strict — épaules et genoux couverts, pas de leggings, pas de jean troué. Sarongs en location à l'entrée si vous êtes mal habillé.",
      },
      image: "/travel-guides/thailand/grand-palace.jpg",
      imageAlt: {
        en: "Golden spires of Bangkok's Grand Palace and Wat Phra Kaew",
        fr: "Flèches dorées du Grand Palais de Bangkok et du Wat Phra Kaew",
      },
      mapsUrl: "https://maps.app.goo.gl/UYW8w1Vqp9pSCBBE9",
    },
    {
      name: "Wat Pho & the Reclining Buddha",
      region: { en: "Bangkok, Central", fr: "Bangkok, Centre" },
      description: {
        en: "A 46-metre gold-leaf Buddha lying on his side, with mother-of-pearl-inlaid feet. Also the birthplace of traditional Thai massage — the on-site training centre offers 60-minute sessions for around 600 baht. Combine with the Grand Palace next door.",
        fr: "Un Bouddha de 46 mètres recouvert d'or, allongé sur le côté, pieds incrustés de nacre. Aussi le berceau du massage thaï traditionnel — l'école sur place propose des sessions de 60 minutes pour ~600 bahts. À combiner avec le Grand Palais juste à côté.",
      },
      image: "/travel-guides/thailand/wat-pho.jpg",
      imageAlt: {
        en: "The 46-metre golden reclining Buddha statue at Wat Pho",
        fr: "Le Bouddha couché doré de 46 mètres au Wat Pho",
      },
      mapsUrl: "https://maps.app.goo.gl/2dNgKqQHYpzx8mZx5",
    },
    {
      name: "Wat Arun",
      region: { en: "Bangkok, Central", fr: "Bangkok, Centre" },
      description: {
        en: "The Temple of Dawn, named ironically — it's the best sunset spot in Bangkok. Climb the central prang's steep steps, then watch the spires turn pink across the Chao Phraya from a riverside bar in Thonburi.",
        fr: "Le Temple de l'Aube, ironiquement nommé — c'est le meilleur spot coucher de soleil de Bangkok. Grimpez les marches raides du prang central, puis observez les flèches virer au rose depuis un bar au bord du fleuve à Thonburi.",
      },
      image: "/travel-guides/thailand/wat-arun.jpg",
      imageAlt: {
        en: "Wat Arun temple's central prang against the Chao Phraya river at sunset",
        fr: "Le prang central du Wat Arun face au fleuve Chao Phraya au coucher du soleil",
      },
      mapsUrl: "https://maps.app.goo.gl/iqcfwbE91WSpcs4D7",
    },
    {
      name: "Chiang Mai Old City",
      region: { en: "Chiang Mai, North", fr: "Chiang Mai, Nord" },
      description: {
        en: "A square moat enclosing 30+ temples — Wat Phra Singh, Wat Chedi Luang, Wat Phan Tao. Sunday Walking Street (Ratchadamnoen Road, 4pm–10pm) is the best street market in Thailand. Stay inside the moat for the cleanest, walkable base.",
        fr: "Des douves carrées enserrant 30+ temples — Wat Phra Singh, Wat Chedi Luang, Wat Phan Tao. Le Sunday Walking Street (Ratchadamnoen Road, 16h-22h) est le meilleur marché de rue de Thaïlande. Dormez à l'intérieur des douves pour une base propre et accessible à pied.",
      },
      image: "/travel-guides/thailand/chiang-mai.jpg",
      imageAlt: {
        en: "Buddha statue inside a Chiang Mai temple",
        fr: "Statue de Bouddha dans un temple de Chiang Mai",
      },
      mapsUrl: "https://maps.app.goo.gl/q5jfFEqkF8w2g3xt8",
    },
    {
      name: "Doi Suthep",
      region: { en: "Chiang Mai, North", fr: "Chiang Mai, Nord" },
      description: {
        en: "A hilltop temple 15km from Chiang Mai, reached by a 309-step naga staircase or a tram. Best at sunset for the panorama over the city. Rent a scooter or grab a red songthaew for around 100 baht round-trip.",
        fr: "Un temple perché à 15 km de Chiang Mai, accessible par 309 marches de naga ou par tram. Idéal au coucher du soleil pour le panorama sur la ville. Louez un scooter ou prenez un songthaew rouge pour ~100 bahts aller-retour.",
      },
      image: "/travel-guides/thailand/doi-suthep.jpg",
      imageAlt: {
        en: "Golden chedi of Doi Suthep temple on a forested mountain",
        fr: "Chedi doré du temple Doi Suthep sur une montagne boisée",
      },
      mapsUrl: "https://maps.app.goo.gl/Y8Lt9q5HmSyV4LDx5",
    },
    {
      name: "Ayutthaya Historical Park",
      region: { en: "Central Thailand", fr: "Thaïlande centrale" },
      description: {
        en: "The 14th-century capital sacked by the Burmese in 1767 — UNESCO ruins of stupas and headless Buddhas, plus a famous Buddha head wrapped in tree roots at Wat Mahathat. 90 minutes from Bangkok by train. Rent a bike, ride between sites.",
        fr: "L'ancienne capitale du XIVe siècle, pillée par les Birmans en 1767 — ruines UNESCO de stupas et bouddhas décapités, plus une fameuse tête de Bouddha enserrée dans des racines au Wat Mahathat. À 90 minutes de Bangkok en train. Louez un vélo et roulez entre les sites.",
      },
      image: "/travel-guides/thailand/ayutthaya.jpg",
      imageAlt: {
        en: "Ancient stupas of Ayutthaya historical park at golden hour",
        fr: "Stupas antiques du parc historique d'Ayutthaya à l'heure dorée",
      },
      mapsUrl: "https://maps.app.goo.gl/cUcmEEsKqQ2nfYyG9",
    },
    {
      name: "Phi Phi Islands & Maya Bay",
      region: { en: "Krabi, Andaman", fr: "Krabi, Andaman" },
      description: {
        en: "Limestone karsts in turquoise sea. Maya Bay reopened in 2022 with strict daily limits and no overnight stays — book the morning slot. Sleep on Phi Phi Don for the nightlife or day-trip from Krabi/Phuket for the day version.",
        fr: "Karsts calcaires sur mer turquoise. Maya Bay a rouvert en 2022 avec quotas journaliers stricts et pas de nuit sur place — réservez le créneau du matin. Dormez à Phi Phi Don pour la vie nocturne, ou venez en journée depuis Krabi/Phuket.",
      },
      image: "/travel-guides/thailand/phi-phi.jpg",
      imageAlt: {
        en: "Maya Bay with limestone cliffs and turquoise water",
        fr: "Maya Bay avec ses falaises calcaires et son eau turquoise",
      },
      mapsUrl: "https://maps.app.goo.gl/ETKpVgK6mDgrhSPK6",
    },
    {
      name: "Railay & Krabi",
      region: { en: "Krabi, Andaman", fr: "Krabi, Andaman" },
      description: {
        en: "A peninsula on the Krabi mainland accessible only by longtail boat — no roads in. Phra Nang Cave Beach is the iconic shot. Climbers come for some of Asia's best limestone routes; non-climbers come for the beaches.",
        fr: "Une péninsule sur le continent de Krabi accessible uniquement en longtail — aucune route. La plage de Phra Nang Cave est la carte postale. Les grimpeurs viennent pour certaines des plus belles voies calcaires d'Asie ; les autres pour les plages.",
      },
      image: "/travel-guides/thailand/railay-krabi.jpg",
      imageAlt: {
        en: "Longtail boat on turquoise water below limestone cliffs at Railay",
        fr: "Longtail boat sur eau turquoise sous les falaises calcaires de Railay",
      },
      mapsUrl: "https://maps.app.goo.gl/k7K7nQ8C3WgQxz5p7",
    },
    {
      name: "Ko Samui, Phangan, Tao",
      region: { en: "Gulf Islands", fr: "Îles du Golfe" },
      description: {
        en: "The three Gulf islands. Ko Tao for diving (cheapest open-water certification in the world, around 10,000 baht). Ko Phangan for the monthly Full Moon Party at Haad Rin. Ko Samui for the comfort tier — direct flights, real resorts.",
        fr: "Les trois îles du Golfe. Ko Tao pour la plongée (la certification Open Water la moins chère au monde, ~10 000 bahts). Ko Phangan pour la Full Moon Party mensuelle à Haad Rin. Ko Samui pour le tier confort — vols directs, vrais resorts.",
      },
      image: "/travel-guides/thailand/ko-samui.jpg",
      imageAlt: {
        en: "Tropical beach with palm trees and turquoise sea on Ko Samui",
        fr: "Plage tropicale avec cocotiers et mer turquoise à Ko Samui",
      },
      mapsUrl: "https://maps.app.goo.gl/L9JpfeyU6mB1qVNF7",
    },
    {
      name: "Sukhothai Historical Park",
      region: { en: "North-Central Thailand", fr: "Centre-Nord de la Thaïlande" },
      description: {
        en: "Older than Ayutthaya (13th–14th century) and even more atmospheric — fewer tourists, biking trails through ruins, big seated Buddhas in lotus position. 7 hours by overnight bus from Bangkok or short flight to Sukhothai airport.",
        fr: "Plus ancien qu'Ayutthaya (XIIIe-XIVe siècle) et encore plus envoûtant — moins de touristes, sentiers à vélo entre les ruines, grands bouddhas assis en lotus. 7 heures en bus de nuit depuis Bangkok ou court vol jusqu'à l'aéroport de Sukhothai.",
      },
      image: "/travel-guides/thailand/sukhothai.jpg",
      imageAlt: {
        en: "Large seated Buddha at Sukhothai historical park",
        fr: "Grand Bouddha assis au parc historique de Sukhothai",
      },
      mapsUrl: "https://maps.app.goo.gl/8RxFqLoJ5gLcGgkY7",
    },
    {
      name: "Wat Rong Khun (White Temple)",
      region: { en: "Chiang Rai, North", fr: "Chiang Rai, Nord" },
      description: {
        en: "A modernist Buddhist temple built since 1997 by artist Chalermchai Kositpipat — all-white plaster, mirror-tile facets, hands reaching up out of the ground. Includes a Predator and a Hello Kitty mural inside. 3 hours by bus from Chiang Mai.",
        fr: "Un temple bouddhiste moderniste construit depuis 1997 par l'artiste Chalermchai Kositpipat — plâtre blanc, mosaïques miroirs, mains tendues sortant du sol. À l'intérieur, fresques avec Predator et Hello Kitty. 3 heures de bus depuis Chiang Mai.",
      },
      image: "/travel-guides/thailand/white-temple.jpg",
      imageAlt: {
        en: "White Temple Wat Rong Khun with mirror-tile decorations",
        fr: "Wat Rong Khun, le Temple blanc, avec ses mosaïques miroirs",
      },
      mapsUrl: "https://maps.app.goo.gl/3aFvRTtLkj7gRJrk6",
    },
    {
      name: "Khao Sok National Park",
      region: { en: "Surat Thani, South", fr: "Surat Thani, Sud" },
      description: {
        en: "180-million-year-old rainforest with limestone karsts rising out of Cheow Lan Lake. Sleep in floating raft bungalows, hear gibbons at dawn, kayak between cliffs. The wildest accessible jungle in Thailand. 2–3 days minimum.",
        fr: "Forêt tropicale de 180 millions d'années avec karsts calcaires émergeant du lac Cheow Lan. Dormez dans des bungalows flottants, écoutez les gibbons à l'aube, kayakez entre les falaises. La jungle accessible la plus sauvage du pays. 2-3 jours minimum.",
      },
      image: "/travel-guides/thailand/khao-sok.jpg",
      imageAlt: {
        en: "Limestone karsts rising from Cheow Lan Lake in Khao Sok National Park",
        fr: "Karsts calcaires émergeant du lac Cheow Lan, parc national de Khao Sok",
      },
      mapsUrl: "https://maps.app.goo.gl/G7HfM9YywQYBpRYL7",
    },
  ],
  specialties: [
    {
      name: { en: "Pad Thai & noodle dishes", fr: "Pad Thaï & plats de nouilles" },
      category: "food",
      description: {
        en: "Pad Thai is the gateway, not the destination. The real range: khao soi (northern curry noodle soup, Chiang Mai), boat noodles (small bowls, intense broth, Bangkok), pad see ew, kway teow, drunken noodles. Order whatever the locals are eating at the cart with the longest queue.",
        fr: "Le Pad Thaï est la porte d'entrée, pas la destination. La vraie palette : khao soi (soupe de nouilles au curry du Nord, Chiang Mai), boat noodles (petits bols, bouillon intense, Bangkok), pad see ew, kway teow, nouilles « ivres ». Commandez ce que mangent les locaux au stand avec la plus longue file.",
      },
      image: "/travel-guides/thailand/pad-thai.jpg",
      imageAlt: {
        en: "Plate of pad thai noodles with shrimp and lime",
        fr: "Assiette de pad thaï avec crevettes et citron vert",
      },
    },
    {
      name: { en: "Tom Yum & curries", fr: "Tom Yum & curries" },
      category: "food",
      description: {
        en: "Tom yum goong (hot-sour shrimp soup with lemongrass + galangal + lime) is the iconic Thai soup. Tom kha is the milder coconut version. Gaeng dang (red curry), gaeng khiao wan (green curry), massaman (Indian-influenced) round out the canon. Order 'mai phet' (not spicy) if you're new — they'll still make it spicy.",
        fr: "Le tom yum goong (soupe pimentée et acide aux crevettes, citronnelle, galanga, citron vert) est la soupe iconique. Le tom kha est la version plus douce au lait de coco. Gaeng dang (curry rouge), gaeng khiao wan (curry vert), massaman (curry à influence indienne) complètent le canon. Demandez « mai phet » (pas pimenté) si vous débutez — ce sera quand même pimenté.",
      },
      image: "/travel-guides/thailand/tom-yum.jpg",
      imageAlt: {
        en: "Bowl of tom yum goong soup with shrimp and herbs",
        fr: "Bol de tom yum goong aux crevettes et aux herbes",
      },
    },
    {
      name: { en: "Street food", fr: "Street food" },
      category: "food",
      description: {
        en: "Thailand's street food is one of the world's great cuisines. Bangkok's Yaowarat (Chinatown) at night, Or Tor Kor market for produce + cooked stalls, Chiang Mai's Sunday Walking Street. Look for stalls with locals eating — empty stalls are empty for a reason.",
        fr: "La street food thaï est l'une des grandes cuisines du monde. Yaowarat (Chinatown) à Bangkok le soir, le marché Or Tor Kor pour le frais + les stands cuisinés, le Sunday Walking Street à Chiang Mai. Cherchez les stands où mangent les locaux — les stands vides le sont pour une raison.",
      },
      image: "/travel-guides/thailand/street-food.jpg",
      imageAlt: {
        en: "Bangkok street food stall at night with neon lights",
        fr: "Stand de street food à Bangkok la nuit, sous les néons",
      },
    },
    {
      name: { en: "Thai massage", fr: "Massage thaï" },
      category: "experience",
      description: {
        en: "A two-person yoga — practitioner pushes, pulls, and stretches you. 250–400 baht for 60 minutes at a real shop. Wat Pho's school is the temple of the discipline. Pad Thai Sai-aroon-style 'oil massage' is the gentler tourist version. Both worth it.",
        fr: "Un yoga à deux — la praticienne vous pousse, tire et étire. 250 à 400 bahts pour 60 minutes dans une vraie boutique. L'école du Wat Pho est le temple de la discipline. Le « oil massage » à la huile est la version plus douce orientée touristes. Les deux valent le détour.",
      },
      image: "/travel-guides/thailand/thai-massage.jpg",
      imageAlt: {
        en: "Traditional Thai massage with herbal compresses",
        fr: "Massage thaï traditionnel avec compresses aux herbes",
      },
    },
    {
      name: { en: "Thai tea & local drinks", fr: "Thé thaï & boissons locales" },
      category: "drink",
      description: {
        en: "Cha yen — bright-orange iced tea with sweetened condensed milk — is the Thailand drink. Singha and Chang are the dominant beers; Leo if you want cheap. Coconut water from a fresh young coconut at any roadside stall, 30–50 baht. Fruit-shake culture is everywhere.",
        fr: "Le cha yen — thé glacé orange vif au lait concentré sucré — est LA boisson thaïlandaise. Singha et Chang dominent côté bière ; Leo si vous voulez du pas cher. Eau de coco fraîche dans une jeune noix au bord de la route, 30-50 bahts. La culture du fruit-shake est partout.",
      },
      image: "/travel-guides/thailand/thai-tea.jpg",
      imageAlt: {
        en: "Glass of bright-orange Thai iced tea with milk",
        fr: "Verre de thé thaï glacé orange vif au lait",
      },
    },
    {
      name: { en: "Buddhism & temple culture", fr: "Bouddhisme & culture des temples" },
      category: "experience",
      description: {
        en: "95% Theravada Buddhist. Morning alms procession (saffron-robed monks accepting food from kneeling locals) starts around 6am — Chiang Mai's old city is the easy spot to witness it. Most boys ordain as monks for at least a few weeks of their life.",
        fr: "95 % bouddhistes Theravada. La procession matinale d'aumônes (moines en safran recevant la nourriture des locaux agenouillés) commence vers 6h — le vieux Chiang Mai est l'endroit le plus facile pour l'observer. Presque tous les garçons prennent l'habit de moine au moins quelques semaines dans leur vie.",
      },
      image: "/travel-guides/thailand/buddhism.jpg",
      imageAlt: {
        en: "Buddhist monks in orange robes at a Thai temple",
        fr: "Moines bouddhistes en robe safran dans un temple thaïlandais",
      },
    },
    {
      name: { en: "Muay Thai", fr: "Muay Thaï" },
      category: "experience",
      description: {
        en: "The national sport — knees, elbows, shins, fists. Bangkok's Rajadamnoen and Lumpinee stadiums are the major-league venues, 1,500–2,000 baht for tourist seats. Smaller fights happen everywhere; tourist gyms in Chiang Mai and Phuket offer week-long training camps.",
        fr: "Le sport national — genoux, coudes, tibias, poings. Les stades Rajadamnoen et Lumpinee à Bangkok sont les grandes scènes, 1 500-2 000 bahts en places touristes. Des combats plus petits ont lieu partout ; les salles touristiques de Chiang Mai et Phuket proposent des stages d'une semaine.",
      },
      image: "/travel-guides/thailand/muay-thai.jpg",
      imageAlt: {
        en: "Muay Thai fighter mid-kick in a boxing ring",
        fr: "Combattant de Muay Thaï en pleine frappe sur le ring",
      },
    },
  ],
  regions: [
    {
      name: { en: "Bangkok & Central", fr: "Bangkok & Centre" },
      highlights: {
        en: "Bangkok, Ayutthaya, Kanchanaburi, Khao Yai",
        fr: "Bangkok, Ayutthaya, Kanchanaburi, Khao Yai",
      },
      description: {
        en: "Bangkok as gateway — most flights land at Suvarnabhumi (BKK). Day trips: Ayutthaya (UNESCO ruins), Kanchanaburi (Bridge over the River Kwai + Erawan Falls), Khao Yai national park (oldest in Thailand, monkeys + waterfalls).",
        fr: "Bangkok comme porte d'entrée — la plupart des vols atterrissent à Suvarnabhumi (BKK). Excursions : Ayutthaya (ruines UNESCO), Kanchanaburi (Pont de la rivière Kwaï + chutes d'Erawan), parc national de Khao Yai (le plus ancien du pays, singes et cascades).",
      },
    },
    {
      name: { en: "The North", fr: "Le Nord" },
      highlights: {
        en: "Chiang Mai, Chiang Rai, Pai, Mae Hong Son",
        fr: "Chiang Mai, Chiang Rai, Pai, Mae Hong Son",
      },
      description: {
        en: "Cooler, mountainous, temple-dense. Chiang Mai as base, then Chiang Rai (White Temple, Blue Temple), Pai (hippie town in a valley), Mae Hong Son (remote loop with elephant sanctuaries — go to ethical ones only). Best November–February.",
        fr: "Plus frais, montagneux, dense en temples. Chiang Mai comme camp de base, puis Chiang Rai (Temple blanc, Temple bleu), Pai (village hippie dans une vallée), Mae Hong Son (boucle reculée avec refuges d'éléphants — n'allez que dans les éthiques). Idéal de novembre à février.",
      },
    },
    {
      name: { en: "South Andaman", fr: "Sud Andaman" },
      highlights: {
        en: "Phuket, Krabi, Phi Phi, Ko Lanta, Khao Lak",
        fr: "Phuket, Krabi, Phi Phi, Ko Lanta, Khao Lak",
      },
      description: {
        en: "The famous coast — limestone karsts, turquoise water, the postcard Thailand. Best November–April; rough seas and closed boats May–October. Skip Patong (Phuket's tourist strip) for Krabi or Ko Lanta unless you want the party.",
        fr: "La côte célèbre — karsts calcaires, eau turquoise, la carte postale Thaïlande. Idéal de novembre à avril ; mer agitée et bateaux fermés de mai à octobre. Évitez Patong (la zone touristique de Phuket) au profit de Krabi ou Ko Lanta, sauf si vous voulez la fête.",
      },
    },
    {
      name: { en: "South Gulf", fr: "Sud du Golfe" },
      highlights: {
        en: "Ko Samui, Ko Phangan, Ko Tao",
        fr: "Ko Samui, Ko Phangan, Ko Tao",
      },
      description: {
        en: "Opposite monsoon timing to the Andaman — best January–August. Ko Tao for cheap diving, Ko Phangan for the Full Moon Party (and a quieter west coast), Ko Samui for the comfort tier with direct international flights.",
        fr: "Mousson inversée par rapport à l'Andaman — idéal de janvier à août. Ko Tao pour la plongée pas chère, Ko Phangan pour la Full Moon Party (et une côte ouest plus calme), Ko Samui pour le tier confort avec vols internationaux directs.",
      },
    },
    {
      name: { en: "Isaan (Northeast)", fr: "Isaan (Nord-Est)" },
      highlights: {
        en: "Khon Kaen, Ubon Ratchathani, Khmer ruins, rural Thailand",
        fr: "Khon Kaen, Ubon Ratchathani, ruines khmères, Thaïlande rurale",
      },
      description: {
        en: "The Thailand no one visits. Khmer ruins (Phimai, Phanom Rung — Angkor's cousins), spicy Isaan food (som tam, larb, sticky rice), almost no tourists. Add 3–5 days to a longer trip; not a fit for the first visit.",
        fr: "La Thaïlande que personne ne visite. Ruines khmères (Phimai, Phanom Rung — cousines d'Angkor), cuisine épicée de l'Isaan (som tam, larb, riz gluant), quasi aucun touriste. À ajouter 3-5 jours sur un long voyage ; pas pour une première fois.",
      },
    },
    {
      name: { en: "Western & Khao Sok", fr: "Ouest & Khao Sok" },
      highlights: {
        en: "Khao Sok, Cheow Lan Lake, Erawan Falls",
        fr: "Khao Sok, lac Cheow Lan, chutes d'Erawan",
      },
      description: {
        en: "The wildest jungle south of Bangkok. Khao Sok's floating raft bungalows on Cheow Lan Lake are a bucket-list overnight. Erawan Falls (7-tier turquoise pools) is in Kanchanaburi province — easy day or overnight from Bangkok.",
        fr: "La jungle la plus sauvage au sud de Bangkok. Les bungalows flottants de Khao Sok sur le lac Cheow Lan sont une expérience de référence. Les chutes d'Erawan (7 niveaux de bassins turquoise) sont dans la province de Kanchanaburi — journée facile ou nuit depuis Bangkok.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "Bangkok + Chiang Mai — 7 days",
        fr: "Bangkok + Chiang Mai — 7 jours",
      },
      summary: {
        en: "The temples + culture short trip. Skip the beaches; cover Bangkok and the north in a week. Internal flights are 800–1,500 baht.",
        fr: "Le voyage court culture + temples. Sautez les plages ; couvrez Bangkok et le nord en une semaine. Vols intérieurs à 800-1 500 bahts.",
      },
      stops: {
        en: [
          "Day 1–3: Bangkok (Grand Palace, Wat Pho, Wat Arun, Chinatown street food)",
          "Day 4: Ayutthaya day trip by train",
          "Day 5–7: Chiang Mai (Old City temples, Doi Suthep, Sunday Walking Street) → fly home from CNX",
        ],
        fr: [
          "Jour 1-3 : Bangkok (Grand Palais, Wat Pho, Wat Arun, street food de Chinatown)",
          "Jour 4 : Ayutthaya en train, journée",
          "Jour 5-7 : Chiang Mai (temples du vieux centre, Doi Suthep, Sunday Walking Street) → vol retour depuis CNX",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Bangkok + North + Islands — 10 days",
        fr: "Bangkok + Nord + îles — 10 jours",
      },
      summary: {
        en: "Add a south island block. The most common first-trip itinerary. Two domestic flights; book the Bangkok-Krabi leg in advance.",
        fr: "Ajoutez un bloc d'îles au sud. L'itinéraire le plus courant pour une première fois. Deux vols intérieurs ; réservez le Bangkok-Krabi à l'avance.",
      },
      stops: {
        en: [
          "Day 1–3: Bangkok",
          "Day 4–6: Chiang Mai",
          "Day 7–10: Krabi + Railay + Phi Phi day trip (fly home from KBV or back via BKK)",
        ],
        fr: [
          "Jour 1-3 : Bangkok",
          "Jour 4-6 : Chiang Mai",
          "Jour 7-10 : Krabi + Railay + journée Phi Phi (vol retour depuis KBV ou via BKK)",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full Thailand — 14 days",
        fr: "Thaïlande au complet — 14 jours",
      },
      summary: {
        en: "Add Pai for the north loop and stretch the islands. Faster pace, but you get the three faces of Thailand: capital, mountains, sea.",
        fr: "Ajoute Pai pour la boucle nord et étire le bloc îles. Rythme plus soutenu, mais on a les trois visages : capitale, montagnes, mer.",
      },
      stops: {
        en: [
          "Day 1–3: Bangkok + Ayutthaya day trip",
          "Day 4–6: Chiang Mai",
          "Day 7–8: Pai (scooter loop, hot springs)",
          "Day 9–10: Chiang Rai (White Temple) → fly south",
          "Day 11–14: Krabi + Phi Phi or Ko Samui block",
        ],
        fr: [
          "Jour 1-3 : Bangkok + journée Ayutthaya",
          "Jour 4-6 : Chiang Mai",
          "Jour 7-8 : Pai (boucle en scooter, sources chaudes)",
          "Jour 9-10 : Chiang Rai (Temple blanc) → vol vers le sud",
          "Jour 11-14 : Krabi + Phi Phi ou bloc Ko Samui",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 40,
        description: {
          en: "Hostel dorm or fan bungalow (€10), street food + one cooked meal (€10), local buses, songthaew, walking (€5), one paid temple or activity (€15). Thailand on a backpacker budget is still one of the best value trips on earth.",
          fr: "Dortoir d'auberge ou bungalow avec ventilo (10 €), street food + un repas chaud (10 €), bus locaux, songthaew, marche (5 €), un temple ou une activité payante (15 €). La Thaïlande petit budget reste un des meilleurs rapports qualité/prix de voyage au monde.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 100,
        description: {
          en: "Air-con 3-star hotel or pool guesthouse (€55), one sit-down dinner + casual meals (€25), domestic flight averaged (€10), entries + one activity (€10). The right tier — Thailand mid-range is what Europe budget would be.",
          fr: "Hôtel 3 étoiles climatisé ou guesthouse avec piscine (55 €), un dîner attablé + repas décontractés (25 €), vol intérieur lissé (10 €), entrées + une activité (10 €). Le bon équilibre — le moyen-de-gamme thaï équivaut au routard européen.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 240,
        description: {
          en: "Resort or beach villa (€150), one upscale dinner + great meals (€55), private transfers / business-class domestic (€20), guide / activity (€15). Honeymoon and resort-trip tier.",
          fr: "Resort ou villa pied-dans-l'eau (150 €), un dîner haut de gamme + bons repas (55 €), transferts privés / classe affaires en interne (20 €), guide / activité (15 €). Tier lune de miel ou resort-vacances.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. Domestic flights AirAsia / Thai Lion Air run 800–2,500 baht (€20–65) if booked 1–2 months ahead. Cash is king outside cities — ATM withdrawal fees are 220 baht per transaction so take out big amounts at once.",
      fr: "Par personne, hors vol international. Les vols intérieurs AirAsia / Thai Lion Air coûtent 800-2 500 bahts (20-65 €) réservés 1 à 2 mois avant. Le cash règne hors des villes — les frais de retrait au DAB sont de 220 bahts par transaction, donc retirez de grosses sommes en une fois.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Dress for temples — shoulders and knees covered, both genders. No shorts, no leggings, no tank tops, no ripped jeans. Sarongs are often rented at major sites if you forget; carry a light scarf either way.",
        fr: "Habillez-vous pour les temples — épaules et genoux couverts, hommes comme femmes. Pas de shorts, pas de leggings, pas de débardeurs, pas de jeans troués. Sarongs en location dans les grands sites ; gardez une écharpe légère dans tous les cas.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't touch a Thai person's head, don't point your feet at people or at Buddha statues, don't sit with feet pointing at a shrine. The head is sacred, the feet are profane — it's the single biggest non-verbal rule.",
        fr: "Ne touchez pas la tête d'un Thaïlandais, ne pointez pas vos pieds vers les gens ou les statues de Bouddha, ne vous asseyez pas pieds dirigés vers un autel. La tête est sacrée, les pieds sont profanes — c'est la règle non-verbale numéro un.",
      },
    },
    {
      do: true,
      text: {
        en: "Use Bolt or Grab for taxis in Bangkok and Chiang Mai. Metered taxis often refuse short trips or quote inflated flat rates. Tuk-tuks are fun but always overpriced for tourists — agree the price before you sit down.",
        fr: "Utilisez Bolt ou Grab pour les taxis à Bangkok et Chiang Mai. Les taxis au compteur refusent souvent les courts trajets ou proposent un forfait gonflé. Les tuk-tuks sont sympas mais toujours surfacturés aux touristes — fixez le prix avant de monter.",
      },
    },
    {
      do: true,
      text: {
        en: "Bargain at markets, but politely. Start around 60% of the asking price and meet near 70–80%. Don't haggle over 20 baht (50 cents) — you're rich by local standards and that's the dignity line.",
        fr: "Marchandez au marché, mais poliment. Commencez à ~60 % du prix demandé pour conclure vers 70-80 %. Ne marchandez pas pour 20 bahts (50 centimes) — vous êtes riche par rapport au standard local et c'est la ligne de la dignité.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't criticize the royal family or display the king's image disrespectfully. Lèse-majesté laws carry up to 15 years per offence and are enforced — including against tourists. It's the one topic you don't joke about.",
        fr: "Ne critiquez pas la famille royale et ne maltraitez pas une image du roi. Les lois de lèse-majesté prévoient jusqu'à 15 ans de prison par infraction et sont appliquées — y compris contre les touristes. C'est LE sujet sur lequel on ne plaisante pas.",
      },
    },
    {
      do: true,
      text: {
        en: "Carry small notes (20–100 baht). Street stalls, tuk-tuks, songthaews, and small shops often can't break a 1,000-baht note. ATMs dispense 1,000s — break them at 7-Eleven by buying water.",
        fr: "Gardez des petites coupures (20-100 bahts) sur vous. Les stands de rue, tuk-tuks, songthaews et petits commerces ne peuvent souvent pas rendre la monnaie sur un billet de 1 000. Les DAB sortent des 1 000 — cassez-les chez 7-Eleven en achetant de l'eau.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't drink tap water anywhere except in very high-end hotels. Bottled water is 7–15 baht everywhere, ice in restaurants is generally safe (made from purified water in commercial machines).",
        fr: "Ne buvez l'eau du robinet nulle part sauf dans les hôtels haut de gamme. L'eau en bouteille coûte 7-15 bahts partout, les glaçons en restaurant sont en général sûrs (faits avec de l'eau purifiée par des machines commerciales).",
      },
    },
    {
      do: true,
      text: {
        en: "Say 'mai phet' (not spicy) if you're not Thai-spice trained. It will still be spicy by Western standards, but won't blow your sinuses. Order one truly spicy dish per meal as a calibration — Thai people are kind about it.",
        fr: "Dites « mai phet » (pas pimenté) si vous n'avez pas l'entraînement local. Ce sera quand même pimenté pour un palais occidental, mais ça ne décollera pas les sinus. Commandez un plat vraiment pimenté par repas pour calibrer — les Thaïlandais sont bienveillants là-dessus.",
      },
    },
  ],
  related: ["japan"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 5. Portugal
// ---------------------------------------------------------------------------
const portugal: CountryGuide = {
  slug: { en: "portugal", fr: "portugal" },
  country: { en: "Portugal", fr: "Portugal" },
  continent: "europe",
  hero: {
    image: "/travel-guides/portugal/hero.jpg",
    imageAlt: {
      en: "Iconic yellow tram on a hilly Lisbon street",
      fr: "Le tram jaune iconique dans une rue en pente de Lisbonne",
    },
    tag: {
      en: "Country guide · Europe",
      fr: "Guide pays · Europe",
    },
  },
  meta: {
    title: {
      en: "Portugal Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Portugal 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Real Portugal travel guide for 2026: best season, Lisbon to the Algarve, port wine and pastéis, honest budgets, cultural do's and don'ts.",
      fr: "Guide voyage Portugal 2026, sans bla-bla : meilleure saison, Lisbonne à l'Algarve, porto et pastéis, budget honnête, codes culturels.",
    },
  },
  intro: {
    en: [
      "Portugal is the Mediterranean-meets-Atlantic country that flew under the radar until about 2018 and is now everyone's 'find'. Lisbon and Porto are walkable, food is exceptional and still cheap by European standards, the Algarve has Europe's most photographed cliffs, and the Atlantic surf is world-class. The catch: the secret is out — book Lisbon and Porto 2–4 months ahead in summer.",
      "First trip: Lisbon (3 days) + a Sintra day trip + Porto (2 days) + the Algarve (2–3 days). Second trip: the Douro Valley for wine, Madeira island for hiking the levada channels, the Azores for volcanic crater lakes. Skip the British-tourist Algarve high-rise strip (Albufeira, Praia da Rocha); head to Sagres or Aljezur on the west coast for wild Atlantic vibe.",
      "Two things to know. Lisbon and Porto are seriously hilly — pack proper walking shoes and skip the rolling luggage. And Portuguese is NOT Spanish, despite what your phone keeps insisting. Locals notice and appreciate 'bom dia' / 'obrigado' / 'obrigada' (men say obrigado, women obrigada) much more than the Spanish equivalents — a tiny effort that buys real warmth.",
    ],
    fr: [
      "Le Portugal, c'est le pays méditerranéo-atlantique passé sous les radars jusqu'en 2018 et que tout le monde « découvre » maintenant. Lisbonne et Porto sont accessibles à pied, la cuisine est excellente et encore bon marché aux standards européens, l'Algarve abrite les falaises les plus photographiées d'Europe, et le surf atlantique est de classe mondiale. Le piège : le secret n'en est plus un — réservez Lisbonne et Porto 2 à 4 mois avant l'été.",
      "Première fois : Lisbonne (3 jours) + journée à Sintra + Porto (2 jours) + Algarve (2-3 jours). Deuxième fois : la vallée du Douro pour le vin, Madère pour les levadas, les Açores pour les lacs de cratère. Évitez la portion Algarve à barres d'immeubles (Albufeira, Praia da Rocha) ; allez à Sagres ou Aljezur sur la côte ouest pour l'ambiance atlantique sauvage.",
      "Deux trucs à savoir. Lisbonne et Porto sont sérieusement vallonnées — chaussures de marche obligatoires et exit la valise à roulettes. Et le portugais N'EST PAS de l'espagnol, malgré ce qu'insiste votre téléphone. Les locaux apprécient « bom dia » / « obrigado » (hommes) / « obrigada » (femmes) bien plus que leur équivalent espagnol — un effort minime qui ouvre des portes.",
    ],
  },
  quickFacts: {
    capital: { en: "Lisbon", fr: "Lisbonne" },
    language: { en: "Portuguese", fr: "Portugais" },
    currency: { code: "EUR", symbol: "€" },
    timezone: "WET (UTC+0) · 1h behind Spain",
    visa: {
      en: "Schengen — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Schengen — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~10M",
  },
  bestSeason: {
    best: {
      months: {
        en: "April – June · September – October",
        fr: "Avril – juin · septembre – octobre",
      },
      description: {
        en: "Mild, fewer crowds, ocean swimmable from late May. Lisbon and Porto are at their best; the Algarve is warm without being a sun-lounger battle. Book accommodation 2–4 months ahead for these windows.",
        fr: "Doux, peu de monde, mer baignable dès fin mai. Lisbonne et Porto sont à leur meilleur ; l'Algarve est chaude sans être une bataille de transats. Réservez 2 à 4 mois à l'avance pour ces créneaux.",
      },
    },
    shoulder: {
      months: {
        en: "March · November",
        fr: "Mars · novembre",
      },
      description: {
        en: "Cool, occasional rain, very few tourists. Restaurants take you seriously, hotels are 40–50% cheaper. Algarve beaches are quiet but cold; perfect for hiking and city visits.",
        fr: "Frais, pluie possible, très peu de touristes. Les restos vous traitent en habitué, les hôtels sont 40-50 % moins chers. Plages d'Algarve calmes mais froides ; parfait pour la rando et les visites de ville.",
      },
    },
    avoid: {
      months: {
        en: "July – August (Algarve) · December – February (north)",
        fr: "Juillet – août (Algarve) · décembre – février (nord)",
      },
      description: {
        en: "Algarve coast triples in price and packs out (largely with British and German families). North Portugal in winter is wet and cold; Porto's old town is beautiful but bleak. Lisbon stays mild year-round.",
        fr: "La côte de l'Algarve triple ses prix et sature (surtout familles britanniques et allemandes). Le nord du Portugal en hiver est humide et froid ; le vieux Porto est beau mais maussade. Lisbonne reste douce toute l'année.",
      },
    },
  },
  mustSee: [
    {
      name: "Belém Tower & Jerónimos Monastery",
      region: { en: "Lisbon", fr: "Lisbonne" },
      description: {
        en: "Both UNESCO, both Manueline (Portugal's age-of-discoveries Gothic), both in the Belém district 6km west of central Lisbon. Pair with Pastéis de Belém — the original pastel de nata bakery since 1837 — five minutes' walk away. Skip-the-line tickets help.",
        fr: "Tous deux UNESCO, tous deux de style manuélin (le gothique portugais de l'époque des grandes découvertes), dans le quartier de Belém à 6 km à l'ouest du centre de Lisbonne. À combiner avec Pastéis de Belém — la pâtisserie originelle du pastel de nata depuis 1837 — à 5 minutes à pied. Le coupe-file vaut le coup.",
      },
      image: "/travel-guides/portugal/belem-tower.jpg",
      imageAlt: {
        en: "Manueline Belém Tower on the Tagus river in Lisbon",
        fr: "La tour de Belém de style manuélin sur le Tage, à Lisbonne",
      },
      mapsUrl: "https://maps.app.goo.gl/sVm5VkjJJzfXfXdK6",
    },
    {
      name: "Alfama & Tram 28",
      region: { en: "Lisbon", fr: "Lisbonne" },
      description: {
        en: "The oldest neighborhood — narrow alleys, washing on lines, fado bars at night. Tram 28 climbs through it from Martim Moniz to Estrela — board at the start of the line in the morning to get a seat (and avoid the pickpocket-heavy crowd).",
        fr: "Le plus vieux quartier — ruelles étroites, linge aux fenêtres, bars à fado le soir. Le tram 28 le traverse de Martim Moniz à Estrela — montez à l'arrêt de départ le matin pour avoir une place assise (et éviter la foule qui attire les pickpockets).",
      },
      image: "/travel-guides/portugal/lisbon-alfama.jpg",
      imageAlt: {
        en: "Yellow Lisbon tram climbing a narrow Alfama street",
        fr: "Le tram jaune de Lisbonne grimpant une ruelle de l'Alfama",
      },
      mapsUrl: "https://maps.app.goo.gl/A89PZ7tjQ5JhUWqJ7",
    },
    {
      name: "Porto Ribeira & Dom Luís I Bridge",
      region: { en: "Porto", fr: "Porto" },
      description: {
        en: "The waterfront UNESCO old town facing the port-wine cellars of Vila Nova de Gaia across the Douro. Cross the upper deck of the Eiffel-designed Dom Luís I bridge at sunset for the cliché-perfect shot. Cellar tours start at €15.",
        fr: "Le vieux centre UNESCO en bord de fleuve, face aux caves de porto de Vila Nova de Gaia, de l'autre côté du Douro. Traversez le tablier supérieur du pont Dom Luís I (conçu par un collaborateur d'Eiffel) au coucher du soleil pour le cliché parfait. Visites de cave à partir de 15 €.",
      },
      image: "/travel-guides/portugal/porto.jpg",
      imageAlt: {
        en: "Porto Ribeira waterfront and Dom Luís I bridge over the Douro",
        fr: "La Ribeira de Porto et le pont Dom Luís I sur le Douro",
      },
      mapsUrl: "https://maps.app.goo.gl/h2VpJpDEnUaWuRwGA",
    },
    {
      name: "Sintra & Pena Palace",
      region: { en: "Lisbon area", fr: "Région de Lisbonne" },
      description: {
        en: "A 40-minute train from Lisbon-Rossio. Pena Palace is the loud yellow-and-red Romanticist castle on top of the hill; Quinta da Regaleira has the spiral 'initiation well'. Book Pena online — walk-ups can wait 2 hours. End the day at Cabo da Roca, mainland Europe's westernmost point.",
        fr: "À 40 minutes de train de Lisbonne-Rossio. Le palais de Pena est le château romantique jaune et rouge perché ; la Quinta da Regaleira abrite le « puits initiatique » en spirale. Réservez Pena en ligne — sans résa, c'est 2h d'attente. Terminez à Cabo da Roca, le point le plus à l'ouest du continent européen.",
      },
      image: "/travel-guides/portugal/sintra.jpg",
      imageAlt: {
        en: "Colorful Pena Palace in Sintra above forested hills",
        fr: "Le palais de Pena coloré à Sintra, au-dessus des collines boisées",
      },
      mapsUrl: "https://maps.app.goo.gl/UVCYqEdc6gN91s2y6",
    },
    {
      name: "Algarve coast & Benagil Cave",
      region: { en: "Algarve", fr: "Algarve" },
      description: {
        en: "Limestone cliffs in 50 shades of orange; the Benagil Sea Cave with its natural skylight is the postcard. Kayak or paddleboard tours (€25–40) are the only way in — boat tours can't dock anymore. Lagos for cliff hikes (Ponta da Piedade), Tavira for the calmer, more local east end.",
        fr: "Falaises calcaires en 50 nuances d'orange ; la grotte marine de Benagil et son puits de lumière naturel sont la carte postale. Kayak ou paddle (25-40 €) sont la seule manière d'y entrer — les bateaux n'accostent plus. Lagos pour les randos sur falaise (Ponta da Piedade), Tavira pour l'est plus calme et plus local.",
      },
      image: "/travel-guides/portugal/algarve.jpg",
      imageAlt: {
        en: "Orange limestone cliffs and turquoise sea on the Algarve coast",
        fr: "Falaises calcaires orange et mer turquoise sur la côte de l'Algarve",
      },
      mapsUrl: "https://maps.app.goo.gl/q57uMQ3xMUTjmAhE9",
    },
    {
      name: "Évora & the Alentejo",
      region: { en: "Alentejo", fr: "Alentejo" },
      description: {
        en: "A UNESCO walled town in the cork-tree plains — Roman temple, white-and-yellow alleys, the eerie Capela dos Ossos (chapel built from 5,000 human bones, with the inscription 'we await yours'). Best done with a rental car for the Alentejo wineries en route.",
        fr: "Une ville fortifiée UNESCO au milieu des plaines de chênes-lièges — temple romain, ruelles blanches et jaunes, et la troublante Capela dos Ossos (chapelle construite avec 5 000 os humains, inscription « nous attendons les vôtres »). Idéal en voiture, avec arrêts dans les bodegas de l'Alentejo en chemin.",
      },
      image: "/travel-guides/portugal/evora.jpg",
      imageAlt: {
        en: "Roman temple of Diana in Évora, Alentejo region",
        fr: "Temple romain de Diane à Évora, région de l'Alentejo",
      },
      mapsUrl: "https://maps.app.goo.gl/eUYy55QPLNc6ofPV6",
    },
    {
      name: "Douro Valley",
      region: { en: "Norte", fr: "Nord" },
      description: {
        en: "The world's oldest demarcated wine region — terraced vineyards down to the Douro river. Take the train from Porto to Pinhão (2.5hr, the river-hugging stretch is one of Europe's most scenic train rides). Stay at a quinta (wine estate), drink, hike, repeat.",
        fr: "La plus ancienne région viticole délimitée au monde — vignobles en terrasses jusqu'au Douro. Prenez le train depuis Porto jusqu'à Pinhão (2h30, la portion qui longe le fleuve est l'un des plus beaux trajets ferroviaires d'Europe). Dormez dans une quinta (domaine), buvez, randonnez, recommencez.",
      },
      image: "/travel-guides/portugal/douro.jpg",
      imageAlt: {
        en: "Terraced vineyards above the Douro river in Portugal",
        fr: "Vignobles en terrasses au-dessus du Douro, au Portugal",
      },
      mapsUrl: "https://maps.app.goo.gl/p1XKxw7gxFFw8zfg9",
    },
    {
      name: "Madeira",
      region: { en: "Madeira island", fr: "Île de Madère" },
      description: {
        en: "A subtropical island 1,000km southwest of Lisbon. Hike the levada channels through laurel forest, climb Pico Ruivo (1,861m) for the cloud-line sunrise, swim at natural pools at Porto Moniz. 90-minute flight from Lisbon; doable as a 5-day add-on.",
        fr: "Une île subtropicale à 1 000 km au sud-ouest de Lisbonne. Randos le long des levadas dans la forêt de lauriers, ascension du Pico Ruivo (1 861 m) pour le lever de soleil au-dessus des nuages, baignade dans les piscines naturelles de Porto Moniz. 1h30 de vol depuis Lisbonne ; faisable en extension de 5 jours.",
      },
      image: "/travel-guides/portugal/madeira.jpg",
      imageAlt: {
        en: "Coastal cliffs and lush green hills of Madeira island",
        fr: "Falaises côtières et collines verdoyantes de l'île de Madère",
      },
      mapsUrl: "https://maps.app.goo.gl/3a92dKa3FXDXGqsi8",
    },
    {
      name: "Azores — São Miguel & Sete Cidades",
      region: { en: "Azores islands", fr: "Açores" },
      description: {
        en: "Nine volcanic islands in the mid-Atlantic. São Miguel for first-timers: Sete Cidades twin crater lakes (one blue, one green), Furnas hot springs, whale watching offshore. Cooler than the mainland, often rainy; pack for four seasons in one day.",
        fr: "Neuf îles volcaniques en plein Atlantique. São Miguel pour une première fois : les lacs jumeaux de Sete Cidades (un bleu, un vert), les sources chaudes de Furnas, observation des baleines au large. Plus frais que le continent, souvent pluvieux ; prévoyez les quatre saisons en une journée.",
      },
      image: "/travel-guides/portugal/azores.jpg",
      imageAlt: {
        en: "Twin crater lakes of Sete Cidades on São Miguel, Azores",
        fr: "Les lacs jumeaux du cratère de Sete Cidades à São Miguel, Açores",
      },
      mapsUrl: "https://maps.app.goo.gl/jKepLpEGHvWWVRD56",
    },
    {
      name: "Óbidos",
      region: { en: "Lisbon area", fr: "Région de Lisbonne" },
      description: {
        en: "A medieval walled town 1hr north of Lisbon, whitewashed alleys, intact castle walls you can walk. Try ginja (sour cherry liqueur) served in a chocolate cup — €1.50 from any street corner. Crowds peak midday; arrive before 10am or after 5pm.",
        fr: "Un village fortifié médiéval à 1h au nord de Lisbonne, ruelles blanchies à la chaux, remparts intacts qu'on peut arpenter. Goûtez le ginja (liqueur de cerise) servi dans un godet en chocolat — 1,50 € à n'importe quel coin de rue. Pic d'affluence à midi ; venez avant 10h ou après 17h.",
      },
      image: "/travel-guides/portugal/obidos.jpg",
      imageAlt: {
        en: "Whitewashed houses and medieval walls of Óbidos",
        fr: "Maisons blanchies à la chaux et remparts médiévaux d'Óbidos",
      },
      mapsUrl: "https://maps.app.goo.gl/F9KMfQ22z9HyzbCS6",
    },
    {
      name: "Aveiro & the moliceiro boats",
      region: { en: "Centro", fr: "Centre" },
      description: {
        en: "The 'Portuguese Venice' — colorful moliceiro boats on a network of canals between the city and the coastal dunes. Costa Nova nearby has the iconic striped beach houses. Half-day trip from Porto by train (40 minutes).",
        fr: "La « Venise portugaise » — barques moliceiros colorées sur un réseau de canaux entre la ville et les dunes côtières. La Costa Nova voisine abrite les célèbres cabanes de plage rayées. Une demi-journée en train depuis Porto (40 minutes).",
      },
      image: "/travel-guides/portugal/aveiro.jpg",
      imageAlt: {
        en: "Colorful moliceiro boats on a canal in Aveiro",
        fr: "Barques moliceiros colorées sur un canal d'Aveiro",
      },
      mapsUrl: "https://maps.app.goo.gl/Eu2czh1F1jWPxg5w8",
    },
    {
      name: "Nazaré — giant waves",
      region: { en: "Centro", fr: "Centre" },
      description: {
        en: "A fishing town that became the planet's biggest-wave surf spot — Praia do Norte hits 20–30m waves October–March, when the Atlantic swell aligns with an underwater canyon. Pros tow in; you watch from the lighthouse. Outside winter, it's a calm beach town with octopus restaurants.",
        fr: "Une ville de pêcheurs devenue le spot de plus grosses vagues du monde — Praia do Norte voit 20-30 m d'octobre à mars, quand la houle atlantique s'aligne avec un canyon sous-marin. Les pros se font tracter ; vous, vous regardez depuis le phare. Hors hiver, c'est un village balnéaire calme avec des restos de poulpe.",
      },
      image: "/travel-guides/portugal/nazare.jpg",
      imageAlt: {
        en: "Giant wave breaking at Praia do Norte in Nazaré",
        fr: "Vague géante déferlant sur Praia do Norte à Nazaré",
      },
      mapsUrl: "https://maps.app.goo.gl/HMM7BKDYknjnAjBHA",
    },
  ],
  specialties: [
    {
      name: { en: "Pastel de nata", fr: "Pastel de nata" },
      category: "food",
      description: {
        en: "Egg-custard tart in a flaky pastry shell, dusted with cinnamon and sugar. Pastéis de Belém in Lisbon (since 1837) is the original; Manteigaria in Lisbon and Porto is the modern challenger. €1.20–2 a piece, eaten standing at the counter — they're best 5 minutes out of the oven.",
        fr: "Tartelette à la crème pâtissière dans une pâte feuilletée, saupoudrée de cannelle et de sucre. Pastéis de Belém à Lisbonne (depuis 1837) est l'originale ; Manteigaria à Lisbonne et Porto est le challenger moderne. 1,20-2 € la pièce, mangé debout au comptoir — au mieux 5 minutes sorti du four.",
      },
      image: "/travel-guides/portugal/pastel-de-nata.jpg",
      imageAlt: {
        en: "Pastel de nata tarts dusted with cinnamon",
        fr: "Pastéis de nata saupoudrés de cannelle",
      },
    },
    {
      name: { en: "Bacalhau", fr: "Bacalhau (morue)" },
      category: "food",
      description: {
        en: "Salt cod, supposedly cooked 365 different ways. Bacalhau à brás (shredded with eggs and matchstick potatoes), bacalhau com natas (cream-baked), and pastéis de bacalhau (fried cod fritters) are the entry points. National obsession — the Portuguese eat more cod than Norwegians, despite living a thousand miles from the fish.",
        fr: "Morue salée, qu'on dit cuisinée de 365 façons différentes. Bacalhau à brás (effiloché aux œufs et pommes paille), bacalhau com natas (gratin à la crème) et pastéis de bacalhau (croquettes de morue) sont les portes d'entrée. Obsession nationale — les Portugais mangent plus de morue que les Norvégiens, alors que le poisson vient de 1 600 km plus au nord.",
      },
      image: "/travel-guides/portugal/bacalhau.jpg",
      imageAlt: {
        en: "Plate of Portuguese bacalhau cod dish",
        fr: "Assiette de bacalhau portugais",
      },
    },
    {
      name: { en: "Sardines & grilled fish", fr: "Sardines & poisson grillé" },
      category: "food",
      description: {
        en: "Whole sardines grilled over charcoal, eaten with bread and olive oil, especially in June during the Festas de Lisboa — the entire city smells of grilled fish. Year-round, look for restaurants advertising 'peixe grelhado' with charcoal smoke pouring onto the street.",
        fr: "Sardines entières grillées au charbon, mangées avec pain et huile d'olive, surtout en juin pendant les Festas de Lisboa — toute la ville sent le poisson grillé. Toute l'année, cherchez les restos qui affichent « peixe grelhado » avec la fumée de charbon qui sort sur la rue.",
      },
      image: "/travel-guides/portugal/sardines.jpg",
      imageAlt: {
        en: "Grilled Portuguese sardines on a plate",
        fr: "Sardines portugaises grillées",
      },
    },
    {
      name: { en: "Port wine", fr: "Vin de Porto" },
      category: "drink",
      description: {
        en: "Fortified wine from the Douro Valley, aged in oak barrels across the river in Vila Nova de Gaia. Four styles: ruby (young, fruity), tawny (oak-aged, nutty), white (apéritif, served chilled), vintage (single-year, age-worthy). Cellar tour + tasting €15–25 in Porto.",
        fr: "Vin muté du Douro, vieilli en fûts de chêne de l'autre côté du fleuve à Vila Nova de Gaia. Quatre styles : ruby (jeune, fruité), tawny (vieilli en fût, noisette), blanc (apéritif, frais), vintage (millésime, à garder). Visite de cave + dégustation 15-25 € à Porto.",
      },
      image: "/travel-guides/portugal/port-wine.jpg",
      imageAlt: {
        en: "Glass of ruby port wine in a cellar",
        fr: "Verre de porto ruby dans une cave",
      },
    },
    {
      name: { en: "Fado", fr: "Fado" },
      category: "art",
      description: {
        en: "The Portuguese blues. A solo singer in black with two guitarists (acoustic + Portuguese pear-shaped guitar), singing about loss, sea, and saudade (a word with no clean translation — longing for something gone). Listen in a small Alfama 'casa de fado' — A Severa, Tasca do Chico, or Mesa de Frades.",
        fr: "Le blues portugais. Une chanteuse en noir avec deux guitaristes (guitare acoustique + guitare portugaise en forme de poire), qui chante la perte, la mer et la saudade (mot intraduisible — un manque d'absolu). Écoutez dans une petite « casa de fado » de l'Alfama : A Severa, Tasca do Chico ou Mesa de Frades.",
      },
      image: "/travel-guides/portugal/fado-guitar.jpg",
      imageAlt: {
        en: "Portuguese guitar player performing fado",
        fr: "Joueur de guitare portugaise interprétant du fado",
      },
    },
    {
      name: { en: "Azulejos", fr: "Azulejos" },
      category: "craft" as const,
      description: {
        en: "Painted ceramic tiles — usually blue and white — covering entire facades, church interiors, and Lisbon metro stations. Visit the Museu Nacional do Azulejo (Lisbon) for the canonical version; spend an afternoon just photographing facades in Alfama and Porto's Capela das Almas.",
        fr: "Carreaux de céramique peints — souvent bleus et blancs — qui recouvrent des façades entières, des intérieurs d'églises et des stations de métro de Lisbonne. Visitez le Museu Nacional do Azulejo (Lisbonne) pour la référence ; passez un après-midi à photographier les façades de l'Alfama et la Capela das Almas à Porto.",
      },
      image: "/travel-guides/portugal/azulejo.jpg",
      imageAlt: {
        en: "Blue and white azulejo tile facade in Portugal",
        fr: "Façade en azulejos bleu et blanc au Portugal",
      },
    },
    {
      name: { en: "Atlantic surf", fr: "Surf atlantique" },
      category: "experience",
      description: {
        en: "Portugal has Europe's most consistent Atlantic swell. Beginner lessons in Costa da Caparica (Lisbon), Ericeira (a World Surfing Reserve), Peniche, Sagres. Big-wave watching in Nazaré winter. 1-hour beginner group lesson runs €30–45 including board and wetsuit.",
        fr: "Le Portugal a la houle atlantique la plus régulière d'Europe. Cours débutant à Costa da Caparica (Lisbonne), Ericeira (réserve mondiale du surf), Peniche, Sagres. Observation des grosses vagues à Nazaré en hiver. Cours collectif débutant d'une heure 30-45 € planche et combi inclus.",
      },
      image: "/travel-guides/portugal/surf.jpg",
      imageAlt: {
        en: "Surfer riding a wave on the Portuguese Atlantic coast",
        fr: "Surfeur prenant une vague sur la côte atlantique portugaise",
      },
    },
  ],
  regions: [
    {
      name: { en: "Lisbon & Centro", fr: "Lisbonne & Centre" },
      highlights: {
        en: "Lisbon, Sintra, Cascais, Óbidos, Nazaré, Aveiro",
        fr: "Lisbonne, Sintra, Cascais, Óbidos, Nazaré, Aveiro",
      },
      description: {
        en: "Most flights land at Humberto Delgado (LIS). Use Lisbon as the base — Sintra (30 min by train), Cascais beach (40 min), Óbidos (1hr), Nazaré (1h30) are all day-trippable. Walkable, scooter-rental easy, public transit excellent.",
        fr: "La plupart des vols atterrissent à Humberto Delgado (LIS). Utilisez Lisbonne comme base — Sintra (30 min en train), la plage de Cascais (40 min), Óbidos (1h), Nazaré (1h30) sont toutes des excursions journée. Marche facile, location de scooter fluide, transports excellents.",
      },
    },
    {
      name: { en: "Porto & Norte", fr: "Porto & Nord" },
      highlights: {
        en: "Porto, Douro Valley, Braga, Guimarães",
        fr: "Porto, vallée du Douro, Braga, Guimarães",
      },
      description: {
        en: "Porto as base. The Douro Valley wine country starts 90 minutes east — train to Pinhão, sleep at a quinta, take a Rabelo boat down the river. Braga has Portugal's oldest cathedral; Guimarães is the birthplace of the country.",
        fr: "Porto comme camp de base. La vallée du Douro commence à 1h30 à l'est — train pour Pinhão, nuit dans une quinta, descente en barque rabelo. Braga possède la plus vieille cathédrale du pays ; Guimarães est le berceau du Portugal.",
      },
    },
    {
      name: { en: "Algarve", fr: "Algarve" },
      highlights: {
        en: "Lagos, Tavira, Sagres, Aljezur, Benagil",
        fr: "Lagos, Tavira, Sagres, Aljezur, Benagil",
      },
      description: {
        en: "Southern coast. Lagos for cliff hikes (Ponta da Piedade), Benagil for the sea cave, Tavira for the calmer east. The west coast (Sagres, Aljezur, Carrapateira) is the wild, surf-and-cliff side — far better than the British-tourist resort strip in the centre.",
        fr: "La côte sud. Lagos pour les randos en falaise (Ponta da Piedade), Benagil pour la grotte marine, Tavira pour l'est plus calme. La côte ouest (Sagres, Aljezur, Carrapateira) est le côté sauvage, surf et falaises — bien mieux que la zone resort touristique au centre.",
      },
    },
    {
      name: { en: "Alentejo", fr: "Alentejo" },
      highlights: {
        en: "Évora, Monsaraz, Elvas, cork-tree plains",
        fr: "Évora, Monsaraz, Elvas, plaines de chênes-lièges",
      },
      description: {
        en: "The empty middle. Hour-after-hour of cork trees, olive groves, and whitewashed walled villages. Évora is the only town with a real tourist scene; the rest is for road-trippers and people who want wine and quiet. Best in spring (wildflowers) and autumn.",
        fr: "Le centre vide. Heure après heure de chênes-lièges, oliviers et villages blancs fortifiés. Évora est la seule ville à vraie ambiance touristique ; le reste, c'est pour les road-trippeurs et ceux qui veulent du vin et du calme. Idéal au printemps (fleurs sauvages) et en automne.",
      },
    },
    {
      name: { en: "Madeira", fr: "Madère" },
      highlights: {
        en: "Funchal, Pico Ruivo, levadas, Porto Moniz",
        fr: "Funchal, Pico Ruivo, levadas, Porto Moniz",
      },
      description: {
        en: "Volcanic island 1,000km southwest of Lisbon. Funchal as base. Levada hikes (along ancient irrigation channels), the Pico Ruivo cloud-line sunrise hike, the natural lava pools at Porto Moniz. 5 days is the right add-on.",
        fr: "Île volcanique à 1 000 km au sud-ouest de Lisbonne. Funchal comme camp de base. Randos sur les levadas (anciens canaux d'irrigation), lever de soleil au-dessus des nuages au Pico Ruivo, piscines naturelles de lave à Porto Moniz. 5 jours, c'est le bon format en extension.",
      },
    },
    {
      name: { en: "Azores", fr: "Açores" },
      highlights: {
        en: "São Miguel, Pico, Faial, Terceira",
        fr: "São Miguel, Pico, Faial, Terceira",
      },
      description: {
        en: "Nine mid-Atlantic islands. São Miguel for the first visit (crater lakes, whale-watching). Pico for the climb of Portugal's highest peak (2,351m). Faial for the blue hydrangeas and the Horta marina (Atlantic crossing checkpoint). Weather changes every 20 minutes.",
        fr: "Neuf îles au milieu de l'Atlantique. São Miguel pour une première visite (lacs de cratère, baleines). Pico pour l'ascension du plus haut sommet du Portugal (2 351 m). Faial pour les hortensias bleus et la marina de Horta (étape des traversées de l'Atlantique). Le temps change toutes les 20 minutes.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "Lisbon + Porto + Algarve — 7 days",
        fr: "Lisbonne + Porto + Algarve — 7 jours",
      },
      summary: {
        en: "The classic first trip. Train Lisbon-Porto, fly or drive to the Algarve at the end.",
        fr: "Le voyage classique d'initiation. Train Lisbonne-Porto, vol ou voiture pour l'Algarve à la fin.",
      },
      stops: {
        en: [
          "Day 1–3: Lisbon (Alfama, Belém, Bairro Alto + Sintra day trip)",
          "Day 4–5: Porto (Ribeira, Dom Luís bridge, port-cellar tour)",
          "Day 6–7: Lagos & Benagil (Algarve) — fly home from Faro (FAO) or back via LIS",
        ],
        fr: [
          "Jour 1-3 : Lisbonne (Alfama, Belém, Bairro Alto + journée Sintra)",
          "Jour 4-5 : Porto (Ribeira, pont Dom Luís, visite cave de porto)",
          "Jour 6-7 : Lagos & Benagil (Algarve) — vol retour depuis Faro (FAO) ou via LIS",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Add the Douro & Alentejo — 10 days",
        fr: "Ajouter le Douro & l'Alentejo — 10 jours",
      },
      summary: {
        en: "Slow the pace. Add the Douro Valley wine country and the Alentejo plains. Requires a rental car for the Alentejo leg.",
        fr: "Ralentissez. Ajoutez le Douro et les plaines de l'Alentejo. Voiture nécessaire pour le segment Alentejo.",
      },
      stops: {
        en: [
          "Day 1–3: Lisbon + Sintra",
          "Day 4: Évora (Alentejo) overnight",
          "Day 5–6: Porto",
          "Day 7: Pinhão / Douro Valley overnight at a quinta",
          "Day 8–10: Algarve (Lagos + Benagil + Tavira)",
        ],
        fr: [
          "Jour 1-3 : Lisbonne + Sintra",
          "Jour 4 : Évora (Alentejo), une nuit",
          "Jour 5-6 : Porto",
          "Jour 7 : Pinhão / vallée du Douro, nuit dans une quinta",
          "Jour 8-10 : Algarve (Lagos + Benagil + Tavira)",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full Portugal — 14 days",
        fr: "Le Portugal au complet — 14 jours",
      },
      summary: {
        en: "Mainland + a Madeira or Azores extension. Two domestic flights — book TAP / SATA in advance.",
        fr: "Continent + extension Madère ou Açores. Deux vols intérieurs — réservez TAP / SATA à l'avance.",
      },
      stops: {
        en: [
          "Day 1–3: Lisbon + Sintra",
          "Day 4–5: Porto + Douro Valley",
          "Day 6: Coimbra + Aveiro",
          "Day 7–8: Algarve (Lagos, Benagil, Sagres)",
          "Day 9: Évora (Alentejo)",
          "Day 10–14: Fly to Madeira (Funchal base, levada hikes, Pico Ruivo) OR Azores (São Miguel)",
        ],
        fr: [
          "Jour 1-3 : Lisbonne + Sintra",
          "Jour 4-5 : Porto + vallée du Douro",
          "Jour 6 : Coimbra + Aveiro",
          "Jour 7-8 : Algarve (Lagos, Benagil, Sagres)",
          "Jour 9 : Évora (Alentejo)",
          "Jour 10-14 : Vol pour Madère (base Funchal, randos levadas, Pico Ruivo) OU Açores (São Miguel)",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 70,
        description: {
          en: "Hostel dorm or small Airbnb (€25), prato do dia lunch + tasca dinner (€20), regional trains and walking (€10), one paid attraction (€15). Portugal is the best-value Western European country on the cheap.",
          fr: "Dortoir d'auberge ou petit Airbnb (25 €), prato do dia + dîner en tasca (20 €), trains régionaux et marche (10 €), une attraction payante (15 €). Le Portugal reste le meilleur rapport qualité-prix d'Europe de l'Ouest en petit budget.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 140,
        description: {
          en: "3-star hotel or boutique guesthouse (€90), one sit-down dinner + casual lunch (€35), Comboios train or rental car (€10 averaged), entries (€5). The right tier.",
          fr: "Hôtel 3 étoiles ou guesthouse de charme (90 €), un dîner attablé + déjeuner décontracté (35 €), train Comboios ou voiture (10 € lissés), entrées (5 €). Le bon équilibre.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 300,
        description: {
          en: "Pousada or design hotel (€190), one fine-dining or chef's-counter dinner (€80), AP train first class or driver-included transfers (€20), guide or activity (€10). Honeymoon or anniversary tier.",
          fr: "Pousada (hôtel d'État) ou hôtel design (190 €), un dîner fine-dining ou comptoir-chef (80 €), train AP en première ou transfert avec chauffeur (20 €), guide ou activité (10 €). Tier lune de miel ou anniversaire.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. AP / Alfa Pendular high-speed train Lisbon-Porto is 3hr and ~€32 in 2nd class if booked 1–2 weeks ahead. Cash useful in tascas and small Algarve restaurants; cards otherwise universal.",
      fr: "Par personne, hors vol international. L'AP / Alfa Pendular (TGV portugais) Lisbonne-Porto fait 3h et ~32 € en 2nde classe réservé 1-2 semaines avant. Cash utile dans les tascas et petits restos d'Algarve ; la carte passe partout ailleurs.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Pack proper walking shoes. Lisbon and Porto are seriously hilly — cobblestones are slippery in rain. Skip rolling luggage; carry a backpack or pay for taxis.",
        fr: "Prenez de vraies chaussures de marche. Lisbonne et Porto sont sérieusement vallonnées — les pavés glissent sous la pluie. Évitez la valise à roulettes ; sac à dos ou taxis.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't speak Spanish. Portuguese is its own language; using Spanish reads as either ignorant or arrogant. Learn 5 phrases: bom dia, boa tarde, obrigado/obrigada, por favor, com licença. Locals warm up immediately.",
        fr: "Ne parlez pas espagnol. Le portugais est sa propre langue ; utiliser l'espagnol passe pour ignorant ou arrogant. Apprenez 5 phrases : bom dia, boa tarde, obrigado/obrigada, por favor, com licença. Les locaux s'adoucissent immédiatement.",
      },
    },
    {
      do: true,
      text: {
        en: "Order the prato do dia at lunch (€8–14 for a soup + main + drink + coffee). The single best food deal in Western Europe and the locals' default.",
        fr: "Prenez le prato do dia au déjeuner (8-14 € pour soupe + plat + boisson + café). Le meilleur deal gastro d'Europe de l'Ouest, et le menu par défaut des locaux.",
      },
    },
    {
      do: true,
      text: {
        en: "Drink vinho verde in summer. Slightly sparkling, low-alcohol (9–11%), citrus-y white wine from northern Portugal, served chilled. Pairs with everything seafood and costs €3–5 a glass.",
        fr: "Buvez le vinho verde l'été. Légèrement perlant, faible alcool (9-11 %), blanc citronné du nord du Portugal, servi frais. S'accorde avec tous les fruits de mer, 3-5 € le verre.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't accept the 'couvert' (bread + olives + cheese placed on the table at restaurants) without checking — it's not free, usually €2–6 per person. Decline if you don't want it; no one's offended.",
        fr: "Ne mangez pas du « couvert » (pain + olives + fromage posés sur la table au resto) sans vérifier — ce n'est pas offert, en général 2-6 € par personne. Refusez si vous n'en voulez pas, personne n'est vexé.",
      },
    },
    {
      do: true,
      text: {
        en: "Watch pickpockets on Tram 28 and at Praça Martim Moniz boarding it. Same risk at Lisbon Santa Apolónia station and Porto's São Bento. Crossbody bag in front.",
        fr: "Méfiez-vous des pickpockets dans le tram 28 et à l'embarquement Praça Martim Moniz. Même risque à la gare Lisbonne Santa Apolónia et à São Bento à Porto. Sac en bandoulière devant.",
      },
    },
    {
      do: true,
      text: {
        en: "Get a Viva Viagem card in Lisbon, Andante in Porto. Both reload at metro stations; both cover metro + bus + tram. Beats buying single tickets each time and saves the queue.",
        fr: "Prenez une carte Viva Viagem à Lisbonne, Andante à Porto. Toutes deux rechargeables au métro, toutes deux couvrent métro + bus + tram. Mieux qu'acheter à l'unité et ça évite la file.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't drive into central Lisbon or Porto. The historic centers have restricted-traffic zones, parking is brutal, and trams have right-of-way over cars on tight streets. Park outside and take public transport in.",
        fr: "Ne conduisez pas dans le centre de Lisbonne ou Porto. Les centres historiques ont des zones à trafic restreint, le stationnement est brutal, et les trams ont la priorité sur les rues étroites. Garez-vous en dehors, transports en commun ensuite.",
      },
    },
  ],
  related: ["spain", "italy", "greece"],
  relatedDestinations: ["lisbon-with-friends"],
};

// ---------------------------------------------------------------------------
// 6. Greece
// ---------------------------------------------------------------------------
const greece: CountryGuide = {
  slug: { en: "greece", fr: "grece" },
  country: { en: "Greece", fr: "Grèce" },
  continent: "europe",
  hero: {
    image: "/travel-guides/greece/hero.jpg",
    imageAlt: {
      en: "Whitewashed houses and blue domes of Oia, Santorini at sunset",
      fr: "Maisons blanchies à la chaux et dômes bleus d'Oia, Santorin au coucher du soleil",
    },
    tag: {
      en: "Country guide · Europe",
      fr: "Guide pays · Europe",
    },
  },
  meta: {
    title: {
      en: "Greece Travel Guide 2026 — Athens, Islands & How to Plan",
      fr: "Guide voyage Grèce 2026 — Athènes, îles & comment partir",
    },
    description: {
      en: "Real Greece travel guide for 2026: best season, Athens and the islands, regional food, honest budgets, cultural do's and don'ts. First and repeat trips.",
      fr: "Guide voyage Grèce 2026, sans bla-bla : meilleure saison, Athènes et les îles, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Greece is a thousand islands you can't see in three lifetimes, plus a mainland with 5,000 years of history under every olive tree. Athens is intense, underrated, and bouncing back after a rough decade. Santorini is overpriced but worth it once. Crete is its own country. Everywhere, the produce is incredibly fresh, the sea is always close, and dinner is a social ritual that starts at 9pm and ends with everyone arguing.",
      "First trip: Athens (2–3 days) + one Cycladic island (Santorini, Mykonos, Naxos, or Milos) + one slower island (Folegandros, Hydra, or Crete west). Second trip: the mainland — Meteora monasteries, Delphi, Peloponnese road trip — plus the Ionian side (Corfu, Lefkada, Zakynthos). Third trip: deep into Crete or the Dodecanese (Rhodes, Karpathos, Symi).",
      "Two things to know. Greek islands are not interchangeable — Santorini is honeymoon-luxury-Instagram, Mykonos is party-with-yachts, Crete has 8,500 years of history and four mountain ranges, the small Cyclades (Folegandros, Sikinos) are how Greece felt in 1985. Pick by vibe, not by Instagram fame. And ferries are how you move — book Blue Star, Seajet, or Hellenic 4–6 weeks ahead in summer.",
    ],
    fr: [
      "La Grèce, c'est mille îles qu'on ne verra pas en trois vies, plus un continent avec 5 000 ans d'histoire sous chaque olivier. Athènes est intense, sous-cotée, et se relève après une décennie difficile. Santorin est trop chère mais à faire une fois. La Crète est un pays à elle seule. Partout, les produits sont d'une fraîcheur folle, la mer est proche, et le dîner est un rituel social qui commence à 21h et finit quand tout le monde s'engueule.",
      "Première fois : Athènes (2-3 jours) + une île des Cyclades (Santorin, Mykonos, Naxos ou Milos) + une île plus lente (Folegandros, Hydra ou ouest de la Crète). Deuxième fois : le continent — monastères des Météores, Delphes, road trip dans le Péloponnèse — plus la côte ionienne (Corfou, Leucade, Zante). Troisième fois : à fond dans la Crète ou le Dodécanèse (Rhodes, Karpathos, Symi).",
      "Deux trucs à savoir. Les îles grecques ne sont pas interchangeables — Santorin c'est lune-de-miel-luxe-Instagram, Mykonos c'est fête-avec-yachts, la Crète a 8 500 ans d'histoire et quatre chaînes de montagnes, les petites Cyclades (Folegandros, Sikinos) sont la Grèce de 1985. Choisissez par ambiance, pas par notoriété Instagram. Et les ferries sont le mode de déplacement — réservez Blue Star, Seajet ou Hellenic 4 à 6 semaines à l'avance en été.",
    ],
  },
  quickFacts: {
    capital: { en: "Athens", fr: "Athènes" },
    language: { en: "Greek", fr: "Grec" },
    currency: { code: "EUR", symbol: "€" },
    timezone: "EET (UTC+2) · 1h ahead of CET",
    visa: {
      en: "Schengen — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Schengen — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~10.4M",
  },
  bestSeason: {
    best: {
      months: {
        en: "Mid-May – June · September – early October",
        fr: "Mi-mai – juin · septembre – début octobre",
      },
      description: {
        en: "Warm sea (22–25°C), long days, light crowds, prices not yet at peak. Santorini and Mykonos are still expensive but reachable; the smaller islands feel near-empty. Book 2–3 months ahead.",
        fr: "Mer chaude (22-25°C), longues journées, peu de monde, prix pas encore au sommet. Santorin et Mykonos restent chères mais accessibles ; les plus petites îles sont presque désertes. Réservez 2-3 mois à l'avance.",
      },
    },
    shoulder: {
      months: {
        en: "April · Late October – early November",
        fr: "Avril · fin octobre – début novembre",
      },
      description: {
        en: "Athens and the mainland are at their best — cool, green, archaeological sites empty. Many island hotels and restaurants close late October to mid-April; Crete and Rhodes stay partly open.",
        fr: "Athènes et le continent sont à leur meilleur — frais, vert, sites archéos déserts. Beaucoup d'hôtels et restos d'îles ferment de fin octobre à mi-avril ; la Crète et Rhodes restent partiellement ouvertes.",
      },
    },
    avoid: {
      months: {
        en: "Mid-July – August",
        fr: "Mi-juillet – août",
      },
      description: {
        en: "Peak everything — 38°C in Athens, 35°C on the islands, Santorini and Mykonos absolutely packed, prices double, ferries sold out. The meltemi wind also picks up August on the Aegean, making ferries rough and rocking small islands for days.",
        fr: "Tout au maxi — 38°C à Athènes, 35°C sur les îles, Santorin et Mykonos bondées, prix doublés, ferries complets. Le vent meltemi se lève aussi en août sur l'Égée, rend les ferries chahutés et secoue les petites îles pendant des jours.",
      },
    },
  },
  mustSee: [
    {
      name: "Acropolis & Parthenon",
      region: { en: "Athens, Attica", fr: "Athènes, Attique" },
      description: {
        en: "Climb at 8am opening to beat the heat and the cruise crowds — or buy the late-afternoon timed ticket for the golden-light shot. The combined ticket (€30) covers the Acropolis + Roman Agora + Ancient Agora + 4 more sites for 5 days. Plaka district below for dinner.",
        fr: "Montez à l'ouverture (8h) pour éviter la chaleur et les groupes de croisières — ou prenez le créneau de fin d'après-midi pour la lumière dorée. Le billet combiné (30 €) couvre Acropole + Agora romaine + Agora antique + 4 autres sites sur 5 jours. Dînez ensuite dans le quartier de Plaka, juste en dessous.",
      },
      image: "/travel-guides/greece/acropolis.jpg",
      imageAlt: {
        en: "The Parthenon temple on the Acropolis of Athens",
        fr: "Le Parthénon sur l'Acropole d'Athènes",
      },
      mapsUrl: "https://maps.app.goo.gl/Bd5UpwLwk8gxd3Ld8",
    },
    {
      name: "Santorini — Oia & the caldera",
      region: { en: "Cyclades", fr: "Cyclades" },
      description: {
        en: "The cliffside village at the north tip — white-cubic houses, blue domes, the sunset view that broke Instagram. Stay in Imerovigli for the same caldera with half the crowd. Visit the Akrotiri Minoan ruins south (the 'Greek Pompeii' — pre-volcanic eruption).",
        fr: "Le village perché à la pointe nord — maisons cubiques blanches, dômes bleus, le coucher de soleil qui a cassé Instagram. Logez à Imerovigli pour la même caldeira avec moitié moins de monde. Visitez les ruines minoennes d'Akrotiri au sud (la « Pompéi grecque », d'avant l'éruption).",
      },
      image: "/travel-guides/greece/santorini-oia.jpg",
      imageAlt: {
        en: "Whitewashed houses cascading down the Santorini caldera",
        fr: "Maisons blanchies cascadant le long de la caldeira de Santorin",
      },
      mapsUrl: "https://maps.app.goo.gl/wHxK6vDxKbXFncwL9",
    },
    {
      name: "Mykonos windmills & Little Venice",
      region: { en: "Cyclades", fr: "Cyclades" },
      description: {
        en: "The 16th-century Kato Mili windmills above town, the Little Venice waterfront with sea-spray on your table at dinner, and the southern beaches (Paradise, Super Paradise) for the party scene. Yacht-tourist energy; not the place for quiet.",
        fr: "Les moulins Kato Mili du XVIe siècle au-dessus de la ville, le front de mer de Little Venice avec les embruns sur la table au dîner, et les plages sud (Paradise, Super Paradise) pour la fête. Ambiance yacht-touriste ; pas l'endroit pour le calme.",
      },
      image: "/travel-guides/greece/mykonos.jpg",
      imageAlt: {
        en: "Mykonos windmills above white houses by the sea",
        fr: "Moulins de Mykonos au-dessus des maisons blanches en bord de mer",
      },
      mapsUrl: "https://maps.app.goo.gl/3prL5MR9JncgUFEX9",
    },
    {
      name: "Meteora monasteries",
      region: { en: "Thessaly, Central", fr: "Thessalie, Centre" },
      description: {
        en: "Six functioning Orthodox monasteries on top of 400-metre rock pillars in central Greece — built when the only access was rope ladders. Reachable by train from Athens (5hr to Kalambaka). Visit at least 3 of the 6; closed on rotating days, check ahead.",
        fr: "Six monastères orthodoxes en activité au sommet de piliers rocheux de 400 mètres en Grèce centrale — construits à une époque où on n'y accédait qu'à l'échelle de corde. Train depuis Athènes (5h jusqu'à Kalambaka). Visitez-en au moins 3 sur 6 ; ils ferment par roulement, vérifiez avant.",
      },
      image: "/travel-guides/greece/meteora.jpg",
      imageAlt: {
        en: "Orthodox monastery perched on a rock pillar at Meteora",
        fr: "Monastère orthodoxe perché sur un pilier rocheux à Météores",
      },
      mapsUrl: "https://maps.app.goo.gl/MWLnZ8q1iSY56AnY9",
    },
    {
      name: "Delphi",
      region: { en: "Phocis, Central", fr: "Phocide, Centre" },
      description: {
        en: "The ancient sanctuary of Apollo on the slopes of Mount Parnassus — where every Greek city-state sent emissaries to the oracle for guidance. The on-site museum has the bronze Charioteer of Delphi (5th c. BCE), one of antiquity's best surviving sculptures. 3 hours from Athens; easy day trip or overnight.",
        fr: "Le sanctuaire antique d'Apollon sur les pentes du Parnasse — où toutes les cités grecques envoyaient des émissaires consulter l'oracle. Le musée sur place abrite l'Aurige de Delphes en bronze (Ve siècle av. J.-C.), l'une des plus belles sculptures de l'Antiquité. À 3h d'Athènes ; journée facile ou nuit sur place.",
      },
      image: "/travel-guides/greece/delphi.jpg",
      imageAlt: {
        en: "Ancient ruins of Delphi on a mountain slope",
        fr: "Ruines antiques de Delphes à flanc de montagne",
      },
      mapsUrl: "https://maps.app.goo.gl/HBHk5cYQu8KqQGTk6",
    },
    {
      name: "Crete — Chania, Knossos, Balos",
      region: { en: "Crete", fr: "Crète" },
      description: {
        en: "Greece's largest island, its own region. Chania for the Venetian harbour and old town, Knossos for the Minoan palace (the actual labyrinth of myth), Balos and Elafonissi for pink-sand beaches, the Samaria Gorge for a serious day hike. A week minimum.",
        fr: "La plus grande île grecque, sa propre région. Chania pour le port vénitien et la vieille ville, Knossos pour le palais minoen (le labyrinthe du mythe), Balos et Elafonissi pour les plages au sable rose, les gorges de Samaria pour une vraie journée de rando. Une semaine minimum.",
      },
      image: "/travel-guides/greece/crete.jpg",
      imageAlt: {
        en: "Venetian harbor of Chania, Crete at sunset",
        fr: "Port vénitien de Chania, Crète au coucher du soleil",
      },
      mapsUrl: "https://maps.app.goo.gl/q5q3UWGuWALo9SyT7",
    },
    {
      name: "Corfu & the Ionian",
      region: { en: "Ionian Islands", fr: "Îles Ioniennes" },
      description: {
        en: "Greener, cooler, more Italian-influenced than the Aegean (Venetian rule for 400 years). Corfu Town's old fortresses, Paleokastritsa beaches, and the Achilleion palace. Pair with Lefkada (Porto Katsiki beach) and Zakynthos (Navagio shipwreck cove) — all reachable without ferries via the road bridge to Lefkada.",
        fr: "Plus verte, plus fraîche, plus influencée par l'Italie que l'Égée (400 ans de domination vénitienne). Les forteresses de Corfou-ville, les plages de Paleokastritsa, le palais Achilleion. À combiner avec Leucade (plage Porto Katsiki) et Zante (anse de Navagio) — toutes accessibles sans ferry via le pont routier de Leucade.",
      },
      image: "/travel-guides/greece/corfu.jpg",
      imageAlt: {
        en: "Turquoise water and cliff at Paleokastritsa, Corfu",
        fr: "Eau turquoise et falaise à Paleokastritsa, Corfou",
      },
      mapsUrl: "https://maps.app.goo.gl/A2NaztgGcdGgzWy66",
    },
    {
      name: "Rhodes old town & Lindos",
      region: { en: "Dodecanese", fr: "Dodécanèse" },
      description: {
        en: "The largest medieval town in Europe still inhabited — built by the Knights Hospitaller in the 14th century, UNESCO-listed. Lindos to the south is the Cycladic-white village under an ancient Greek acropolis (rare combo). Rhodes is easy from Athens (50-min flight) and bigger than people expect.",
        fr: "La plus grande ville médiévale d'Europe encore habitée — construite par les Hospitaliers au XIVe siècle, UNESCO. Lindos, au sud, est le village blanc cycladique sous une acropole grecque antique (combo rare). Rhodes est accessible depuis Athènes (50 min de vol) et plus grande qu'on ne le croit.",
      },
      image: "/travel-guides/greece/rhodes.jpg",
      imageAlt: {
        en: "Medieval streets of Rhodes old town",
        fr: "Ruelles médiévales de la vieille ville de Rhodes",
      },
      mapsUrl: "https://maps.app.goo.gl/8m1q9p1uVxF8vEAA9",
    },
    {
      name: "Nafplio & the Peloponnese",
      region: { en: "Peloponnese", fr: "Péloponnèse" },
      description: {
        en: "The first capital of independent Greece (1828–34). Bourtzi fortress in the bay, Venetian old town on a peninsula. Use it as base for the Peloponnese loop — Mycenae, Epidaurus theatre, ancient Olympia, Mystras Byzantine ruins. The mainland trip almost no one does.",
        fr: "La première capitale de la Grèce indépendante (1828-1834). La forteresse Bourtzi dans la baie, la vieille ville vénitienne sur une presqu'île. À utiliser comme base pour la boucle péloponnésienne — Mycènes, théâtre d'Épidaure, Olympie antique, ruines byzantines de Mystras. Le voyage continental que quasiment personne ne fait.",
      },
      image: "/travel-guides/greece/nafplio.jpg",
      imageAlt: {
        en: "Bourtzi fortress in the bay of Nafplio, Peloponnese",
        fr: "Forteresse Bourtzi dans la baie de Nauplie, Péloponnèse",
      },
      mapsUrl: "https://maps.app.goo.gl/J5kxhYxe9p8tEoSb9",
    },
    {
      name: "Thessaloniki",
      region: { en: "Macedonia, North", fr: "Macédoine, Nord" },
      description: {
        en: "Greece's second city — the food capital, the nightlife capital, the city with the best Byzantine churches and a Roman rotunda older than the Pantheon. Direct trains from Athens (4hr). Skip if you only have a week; essential if you have two.",
        fr: "La deuxième ville du pays — capitale gastro, capitale nocturne, ville avec les meilleures églises byzantines et une rotonde romaine plus ancienne que le Panthéon. Trains directs depuis Athènes (4h). Sautez si vous n'avez qu'une semaine ; essentiel sur deux.",
      },
      image: "/travel-guides/greece/thessaloniki.jpg",
      imageAlt: {
        en: "Thessaloniki waterfront with the White Tower",
        fr: "Front de mer de Thessalonique avec la Tour blanche",
      },
      mapsUrl: "https://maps.app.goo.gl/qbnNm9JhGePD3HHQA",
    },
    {
      name: "Milos — Sarakiniko & Kleftiko",
      region: { en: "Cyclades", fr: "Cyclades" },
      description: {
        en: "The Cycladic island most travelers haven't heard of — yet. Sarakiniko's white volcanic-rock 'moonscape', Kleftiko's sea caves (kayak or boat tour only), 70-odd beaches, fewer than Santorini's hotels. 3-hour ferry from Piraeus or 30-min flight.",
        fr: "L'île des Cyclades dont personne n'a (encore) entendu parler. Le « paysage lunaire » de roche volcanique blanche de Sarakiniko, les grottes marines de Kleftiko (kayak ou bateau uniquement), 70 plages, moins d'hôtels que Santorin. Ferry de 3h depuis Le Pirée ou vol de 30 min.",
      },
      image: "/travel-guides/greece/milos.jpg",
      imageAlt: {
        en: "White volcanic moon-rocks of Sarakiniko beach on Milos",
        fr: "Roches volcaniques blanches de la plage de Sarakiniko à Milos",
      },
      mapsUrl: "https://maps.app.goo.gl/uYn5j6sJgVqDcGGT9",
    },
    {
      name: "Naxos & Paros",
      region: { en: "Cyclades", fr: "Cyclades" },
      description: {
        en: "The grown-up Cyclades. Naxos is the largest of the group — mountains, hill villages (Apeiranthos), the Portara (a giant marble doorway from an unfinished 6th-c. BCE temple). Paros has Naoussa's harbor restaurants and Antiparos for the chill day trip. Both 4 hours from Athens by ferry.",
        fr: "Les Cyclades pour adultes. Naxos est la plus grande du groupe — montagnes, villages perchés (Apeiranthos), la Portara (immense porte de marbre d'un temple inachevé du VIe siècle av. J.-C.). Paros a les restos du port de Naoussa et Antiparos pour l'escapade tranquille. Toutes deux à 4h d'Athènes en ferry.",
      },
      image: "/travel-guides/greece/naxos.jpg",
      imageAlt: {
        en: "Whitewashed Naxos village street with bougainvillea",
        fr: "Ruelle blanche de Naxos avec bougainvilliers",
      },
      mapsUrl: "https://maps.app.goo.gl/h7jq8u5JpAdQy7Hi9",
    },
  ],
  specialties: [
    {
      name: { en: "Souvlaki & gyros", fr: "Souvlaki & gyros" },
      category: "food",
      description: {
        en: "Souvlaki = skewers of grilled meat; gyros = the rotisserie cone, sliced into pita with tzatziki, tomato, onion, and fries (yes, fries inside the wrap — it's correct). Costas to Kostas the corner takeaway is €4 a wrap and beats most sit-down restaurants. The Athenian classic.",
        fr: "Souvlaki = brochettes de viande grillée ; gyros = la broche rôtissoire, tranchée dans un pita avec tzatzíki, tomate, oignon et frites (oui, frites dans le wrap — c'est correct). À 4 € le wrap chez n'importe quel Costas du coin, c'est meilleur que la plupart des restos attablés. Le classique athénien.",
      },
      image: "/travel-guides/greece/souvlaki.jpg",
      imageAlt: {
        en: "Greek pork souvlaki skewers grilling",
        fr: "Brochettes de souvlaki de porc grec sur le grill",
      },
    },
    {
      name: { en: "Moussaka & oven dishes", fr: "Moussaka & plats au four" },
      category: "food",
      description: {
        en: "Layered eggplant + minced meat + béchamel, baked. Pastitsio is the pasta version (Greek lasagna). Stifado is slow-cooked beef with pearl onions. These are 'mageirefta' — the comfort dishes Greek families eat at home; tavernas list them on the daily board.",
        fr: "Couches d'aubergines + viande hachée + béchamel, gratinées. Le pastitsio est la version pâtes (lasagne grecque). Le stifado est un ragoût de bœuf aux petits oignons. C'est de la « mageirefta » — les plats réconfort que les familles grecques font à la maison ; les tavernes les affichent sur l'ardoise du jour.",
      },
      image: "/travel-guides/greece/moussaka.jpg",
      imageAlt: {
        en: "Plate of Greek moussaka with béchamel",
        fr: "Assiette de moussaka grecque avec béchamel",
      },
    },
    {
      name: { en: "Greek salad & mezze", fr: "Salade grecque & mezze" },
      category: "food",
      description: {
        en: "A real horiatiki has NO lettuce. Tomato, cucumber, red onion, green pepper, kalamata olives, a slab of feta (not crumbled), oregano, olive oil. €6–9 in any village taverna. Mezze culture: order 5–7 small plates instead of a main, share, drink ouzo, take 3 hours.",
        fr: "Une vraie horiatiki ne contient PAS de salade verte. Tomate, concombre, oignon rouge, poivron vert, olives kalamata, un pavé de feta (pas émiettée), origan, huile d'olive. 6-9 € dans n'importe quelle taverne. Culture des mezze : commandez 5-7 petites assiettes à partager, buvez de l'ouzo, prenez 3 heures.",
      },
      image: "/travel-guides/greece/greek-salad.jpg",
      imageAlt: {
        en: "Traditional Greek salad with feta and olives",
        fr: "Salade grecque traditionnelle avec feta et olives",
      },
    },
    {
      name: { en: "Ouzo & raki", fr: "Ouzo & raki" },
      category: "drink",
      description: {
        en: "Ouzo: anise spirit served with water and ice (turns cloudy white), traditionally with mezze. Raki / tsipouro: grappa-style spirit, served small, neat, often with dessert (and free, on the house). Tsikoudia is the Cretan version, often offered the moment you sit at a table.",
        fr: "Ouzo : spiritueux anisé servi avec eau et glace (vire blanc opaque), traditionnellement avec les mezze. Raki / tsipouro : eau-de-vie type grappa, servie en petit verre, sec, souvent avec le dessert (et offerte). La tsikoudia est la version crétoise, souvent offerte dès que vous vous attablez.",
      },
      image: "/travel-guides/greece/ouzo.jpg",
      imageAlt: {
        en: "Glass of ouzo turning milky white with water",
        fr: "Verre d'ouzo devenant blanc laiteux avec de l'eau",
      },
    },
    {
      name: { en: "Olive oil & olives", fr: "Huile d'olive & olives" },
      category: "food",
      description: {
        en: "Greece produces some of the world's best olive oil — Crete and Kalamata in particular. Pour it on bread, salad, yogurt, everything. Kalamata olives are the famous purple-black variety; throumba (Thassos) is the wrinkled cured one. Pick up a litre to take home from a village press.",
        fr: "La Grèce produit certaines des meilleures huiles d'olive du monde — Crète et Kalamata notamment. À verser sur le pain, la salade, le yaourt, tout. Les olives Kalamata sont la fameuse variété violet-noir ; les throumba (Thassos) sont les ridées séchées au sel. Repartez avec un litre d'un pressoir de village.",
      },
      image: "/travel-guides/greece/olive-oil.jpg",
      imageAlt: {
        en: "Greek olives and olive oil",
        fr: "Olives grecques et huile d'olive",
      },
    },
    {
      name: { en: "Ancient art & museums", fr: "Art antique & musées" },
      category: "art",
      description: {
        en: "The Acropolis Museum (Athens) for the Parthenon frieze and Caryatids. The National Archaeological Museum for the bronze of Poseidon, the Mask of Agamemnon, the Antikythera mechanism. Heraklion (Crete) for Minoan frescoes. Olympia for the Hermes of Praxiteles. World-class even by world-class standards.",
        fr: "Le musée de l'Acropole (Athènes) pour la frise du Parthénon et les Caryatides. Le Musée archéologique national pour le Poséidon de bronze, le Masque d'Agamemnon, la machine d'Anticythère. Héraklion (Crète) pour les fresques minoennes. Olympie pour l'Hermès de Praxitèle. De niveau mondial selon n'importe quel standard.",
      },
      image: "/travel-guides/greece/mythology-art.jpg",
      imageAlt: {
        en: "Ancient Greek marble statue in a museum",
        fr: "Statue antique en marbre dans un musée grec",
      },
    },
    {
      name: { en: "Island life & sunsets", fr: "Vie insulaire & couchers de soleil" },
      category: "experience",
      description: {
        en: "The Greek-island sunset is a ritual, not a moment. Drinks at 7pm, dinner at 9:30pm by the water, ouzo and gossip until midnight. On Santorini, the Oia sunset spot fills 2 hours ahead — Imerovigli or the boat from Athinios are quieter alternatives.",
        fr: "Le coucher de soleil dans les îles grecques est un rituel, pas un moment. Apéro à 19h, dîner à 21h30 au bord de l'eau, ouzo et ragots jusqu'à minuit. À Santorin, le spot d'Oia se remplit 2 heures avant — Imerovigli ou le bateau depuis Athinios sont les alternatives plus calmes.",
      },
      image: "/travel-guides/greece/island-life.jpg",
      imageAlt: {
        en: "Sunset over the Aegean Sea from a Greek island",
        fr: "Coucher de soleil sur la mer Égée depuis une île grecque",
      },
    },
  ],
  regions: [
    {
      name: { en: "Attica & Athens", fr: "Attique & Athènes" },
      highlights: {
        en: "Athens, Sounion (Poseidon temple), Aegina, Hydra",
        fr: "Athènes, Sounion (temple de Poséidon), Égine, Hydra",
      },
      description: {
        en: "The capital region. Most international flights land at Eleftherios Venizelos (ATH). Day trips: Sounion at the cape for sunset, the nearby Saronic islands (Aegina, Hydra, Spetses) for a no-ferry-needed island taste.",
        fr: "La région capitale. La majorité des vols internationaux atterrissent à Eleftherios Venizelos (ATH). Excursions : Sounion sur le cap pour le coucher de soleil, les îles Saroniques voisines (Égine, Hydra, Spetses) pour une dose d'île sans long ferry.",
      },
    },
    {
      name: { en: "Cyclades", fr: "Cyclades" },
      highlights: {
        en: "Santorini, Mykonos, Naxos, Paros, Milos, Folegandros",
        fr: "Santorin, Mykonos, Naxos, Paros, Milos, Folegandros",
      },
      description: {
        en: "The white-and-blue archipelago in the central Aegean. Most ferries leave from Piraeus (Athens). High-speed ferries chain Mykonos-Paros-Naxos-Santorini in ~5 hours; Blue Star slow ferries are cheaper and overnight-friendly.",
        fr: "L'archipel blanc et bleu au centre de la mer Égée. La plupart des ferries partent du Pirée (Athènes). Les ferries rapides enchaînent Mykonos-Paros-Naxos-Santorin en ~5 heures ; les Blue Star sont moins chers et OK pour la nuit.",
      },
    },
    {
      name: { en: "Crete", fr: "Crète" },
      highlights: {
        en: "Heraklion, Chania, Knossos, Samaria Gorge, Balos, Elafonissi",
        fr: "Héraklion, Chania, Knossos, gorges de Samaria, Balos, Elafonissi",
      },
      description: {
        en: "An island that's its own country — 8,500 years of continuous habitation, four mountain ranges, dozens of microclimates. Heraklion + Knossos + the east; Chania + Balos + the west. Drive between — public transport is limited. Three weeks is not too long here.",
        fr: "Une île qui est un pays — 8 500 ans d'occupation continue, quatre chaînes de montagnes, des dizaines de micro-climats. Héraklion + Knossos + l'est ; Chania + Balos + l'ouest. Roulez entre les deux — les transports publics sont limités. Trois semaines ne sont pas trop.",
      },
    },
    {
      name: { en: "Peloponnese & mainland", fr: "Péloponnèse & continent" },
      highlights: {
        en: "Nafplio, Mycenae, Olympia, Mystras, Meteora, Delphi",
        fr: "Nauplie, Mycènes, Olympie, Mystras, Météores, Delphes",
      },
      description: {
        en: "The history backbone. Nafplio as base for the Peloponnese loop, Meteora and Delphi as standalone day or two-day trips from Athens. Best done with a rental car. Underrated and largely tourist-free outside the marquee sites.",
        fr: "L'épine dorsale historique. Nauplie comme base pour la boucle péloponnésienne, Météores et Delphes en journées ou deux jours autonomes depuis Athènes. Idéal en voiture. Sous-coté et quasi sans touristes en dehors des sites célèbres.",
      },
    },
    {
      name: { en: "Ionian Islands", fr: "Îles Ioniennes" },
      highlights: {
        en: "Corfu, Lefkada, Kefalonia, Zakynthos, Ithaca",
        fr: "Corfou, Leucade, Céphalonie, Zante, Ithaque",
      },
      description: {
        en: "West coast, Adriatic-facing — greener, cooler, more Italian-influenced (400 years of Venetian rule). Corfu has the densest cultural mix. Lefkada is the only one reachable by road bridge — no ferry needed. Zakynthos has the Navagio shipwreck cove that broke Instagram.",
        fr: "La côte ouest, face à l'Adriatique — plus verte, plus fraîche, plus marquée par l'Italie (400 ans de domination vénitienne). Corfou a le mélange culturel le plus dense. Leucade est la seule accessible par pont routier — pas besoin de ferry. Zante abrite la crique du Navagio qui a cassé Instagram.",
      },
    },
    {
      name: { en: "Dodecanese & North", fr: "Dodécanèse & Nord" },
      highlights: {
        en: "Rhodes, Kos, Patmos, Symi, Lesvos, Chios",
        fr: "Rhodes, Kos, Patmos, Symi, Lesvos, Chios",
      },
      description: {
        en: "Eastern Aegean, close to Turkey. Rhodes is the largest and easiest (medieval old town); Symi is the postcard pastel harbor; Patmos has the cave where John wrote Revelation. Lesvos and Chios further north are larger, quieter, mostly Greek visitors.",
        fr: "Égée orientale, près de la Turquie. Rhodes est la plus grande et la plus accessible (vieille ville médiévale) ; Symi est le port pastel carte postale ; Patmos abrite la grotte où Jean a écrit l'Apocalypse. Lesvos et Chios, plus au nord, sont plus grandes, plus calmes, surtout fréquentées par les Grecs.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "Athens + 2 Cyclades — 7 days",
        fr: "Athènes + 2 Cyclades — 7 jours",
      },
      summary: {
        en: "The classic first trip. Fly into Athens, ferry-hop two Cycladic islands, fly home from Santorini.",
        fr: "Le voyage classique d'initiation. Vol pour Athènes, ferries entre deux îles des Cyclades, vol retour depuis Santorin.",
      },
      stops: {
        en: [
          "Day 1–2: Athens (Acropolis, Plaka, Anafiotika)",
          "Day 3–5: Mykonos OR Naxos (ferry from Piraeus)",
          "Day 6–7: Santorini → fly home from JTR",
        ],
        fr: [
          "Jour 1-2 : Athènes (Acropole, Plaka, Anafiotika)",
          "Jour 3-5 : Mykonos OU Naxos (ferry depuis Le Pirée)",
          "Jour 6-7 : Santorin → vol retour depuis JTR",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Athens + island hopping — 10 days",
        fr: "Athènes + ferries entre îles — 10 jours",
      },
      summary: {
        en: "Add Milos as the underrated stop, plus a small slow island. Three islands in 7 days is fast — pace it.",
        fr: "Ajoutez Milos pour la perle méconnue, plus une petite île lente. Trois îles en 7 jours c'est rapide — calez le rythme.",
      },
      stops: {
        en: [
          "Day 1–2: Athens",
          "Day 3–4: Milos (Sarakiniko, Kleftiko boat)",
          "Day 5–6: Naxos (mountain villages, beaches)",
          "Day 7–9: Santorini",
          "Day 10: Athens for the flight home",
        ],
        fr: [
          "Jour 1-2 : Athènes",
          "Jour 3-4 : Milos (Sarakiniko, bateau Kleftiko)",
          "Jour 5-6 : Naxos (villages de montagne, plages)",
          "Jour 7-9 : Santorin",
          "Jour 10 : Athènes pour le vol retour",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Mainland + Crete — 14 days",
        fr: "Continent + Crète — 14 jours",
      },
      summary: {
        en: "The deep version. Athens + Meteora + Peloponnese road trip + a week in Crete. No Cyclades, but the most complete view of the country.",
        fr: "La version profonde. Athènes + Météores + road trip péloponnésien + une semaine en Crète. Pas de Cyclades, mais la vision la plus complète du pays.",
      },
      stops: {
        en: [
          "Day 1–2: Athens",
          "Day 3: Meteora (train Athens-Kalambaka, overnight)",
          "Day 4: Delphi en route to Nafplio",
          "Day 5–6: Nafplio + Mycenae + Epidaurus",
          "Day 7: Olympia + ferry to Crete",
          "Day 8–13: Crete (Chania, Knossos, Samaria Gorge, Elafonissi)",
          "Day 14: Fly Athens, then home",
        ],
        fr: [
          "Jour 1-2 : Athènes",
          "Jour 3 : Météores (train Athènes-Kalambaka, nuit sur place)",
          "Jour 4 : Delphes en route vers Nauplie",
          "Jour 5-6 : Nauplie + Mycènes + Épidaure",
          "Jour 7 : Olympie + ferry pour la Crète",
          "Jour 8-13 : Crète (Chania, Knossos, gorges de Samaria, Elafonissi)",
          "Jour 14 : Vol Athènes, puis retour",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 80,
        description: {
          en: "Hostel dorm or small island room (€30), gyros + taverna lunch (€20), ferries + walking (€15), one paid site (€15). Mainland Greece is cheaper than the Cyclades — Athens, Crete, the Peloponnese are 30% less than Santorini.",
          fr: "Dortoir d'auberge ou petite chambre d'île (30 €), gyros + déjeuner en taverne (20 €), ferries + marche (15 €), un site payant (15 €). La Grèce continentale est moins chère que les Cyclades — Athènes, la Crète, le Péloponnèse sont 30 % moins chers que Santorin.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 170,
        description: {
          en: "3-star hotel or boutique B&B (€110), one sit-down dinner + casual meals (€40), high-speed ferry or rental car (€10 averaged), entries (€10). Santorini and Mykonos can push this to €230+; mainland sits comfortably here.",
          fr: "Hôtel 3 étoiles ou B&B de charme (110 €), un dîner attablé + repas décontractés (40 €), ferry rapide ou voiture (10 € lissés), entrées (10 €). Santorin et Mykonos peuvent pousser à 230 € + ; le continent tient confortablement ce niveau.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 380,
        description: {
          en: "Cave-hotel in Imerovigli, design hotel in Athens (€240), one fine-dining sunset dinner (€100), private transfer + Blue Star Sea Jets first class (€25), private boat or guide (€15). Honeymoon and milestone-trip tier.",
          fr: "Cave-hotel à Imerovigli, hôtel design à Athènes (240 €), un dîner fine-dining au coucher du soleil (100 €), transfert privé + Blue Star Sea Jets en première (25 €), bateau privé ou guide (15 €). Tier lune de miel et anniversaire.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. Book ferries on ferryhopper.com 4–6 weeks ahead in summer — Blue Star is slower / cheaper, Seajets and Hellenic are faster / pricier. Cash is preferred in small island tavernas; cards otherwise everywhere.",
      fr: "Par personne, hors vol international. Réservez les ferries sur ferryhopper.com 4 à 6 semaines avant en été — Blue Star est plus lent / moins cher, Seajets et Hellenic plus rapides / plus chers. Cash préféré dans les petites tavernes d'îles ; carte sinon partout.",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Book ferries 4–6 weeks ahead in summer on ferryhopper.com. Routes from Piraeus to Santorini / Mykonos sell out in July–August. Add 30 minutes for the port check-in if you have a car.",
        fr: "Réservez les ferries 4 à 6 semaines avant en été sur ferryhopper.com. Les lignes du Pirée vers Santorin / Mykonos sont complètes en juillet-août. Ajoutez 30 minutes pour l'enregistrement portuaire si vous avez une voiture.",
      },
    },
    {
      do: true,
      text: {
        en: "Eat at tavernas with no laminated menu and a daily board outside. The dishes that change daily are the mageirefta (oven-baked house specialties) — the food Greeks actually eat. Avoid restaurants with greeters trying to pull you in.",
        fr: "Mangez dans les tavernes sans menu plastifié, avec une ardoise quotidienne dehors. Les plats qui changent chaque jour sont les mageirefta (spécialités maison au four) — la vraie cuisine grecque. Évitez les restos avec rabatteur à l'entrée.",
      },
    },
    {
      do: true,
      text: {
        en: "Carry cash on islands. Many small tavernas, kafenions, and beach tents are cash-only or 'card-machine-broken'. ATM fees on islands are 3–4 € per withdrawal — take out €200+ at a time.",
        fr: "Ayez du cash sur les îles. Beaucoup de petites tavernes, kafenions et paillotes sont cash-only ou « machine cassée ». Les DAB d'îles facturent 3-4 € par retrait — sortez 200 € minimum à chaque fois.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't book Santorini in August unless someone else is paying. Hotels run €400–800/night, the Oia sunset spot is a queue, and the daytime cliff walk is unwalkable in 36°C. May–June or late September is the same beauty for half the price.",
        fr: "Ne réservez pas Santorin en août sauf si quelqu'un d'autre paie. Les hôtels tournent à 400-800 € la nuit, le spot du coucher d'Oia est une file d'attente, et la marche sur la caldeira est impraticable par 36°C. Mai-juin ou fin septembre offrent la même beauté à moitié prix.",
      },
    },
    {
      do: true,
      text: {
        en: "Order Greek salad without lettuce. If they bring lettuce, it's a tourist version. A real horiatiki has tomato, cucumber, red onion, pepper, olives, oregano, slab of feta, olive oil. Period.",
        fr: "Demandez la salade grecque sans laitue. Si on vous apporte de la salade verte, c'est la version touriste. Une vraie horiatiki contient tomate, concombre, oignon rouge, poivron, olives, origan, pavé de feta, huile d'olive. Point.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't wear bikinis or shirtless walking through island towns. It's fine on the beach, side-eye-inducing in the village 100m back. Cover up before walking into a taverna.",
        fr: "Ne vous baladez pas en maillot ou torse nu dans les villages d'îles. C'est OK sur la plage, mais ça attire les regards dès 100 m plus loin. Couvrez-vous avant d'entrer dans une taverne.",
      },
    },
    {
      do: true,
      text: {
        en: "Tip round-up at tavernas — €1–2 on a €30 bill is generous. Service is included; bigger tips are awkward. Coffee at the kafenion: leave the coins.",
        fr: "Pourboire en arrondi à la taverne — 1-2 € sur 30 € est généreux. Le service est inclus ; plus, c'est gênant. Café au kafenion : laissez la monnaie.",
      },
    },
    {
      do: true,
      text: {
        en: "Visit at least one mainland site (Meteora, Delphi, Nafplio). The mainland is where the actual ancient Greece is — and where you'll see almost no other tourists. The islands get all the fame; the mainland gets the depth.",
        fr: "Visitez au moins un site continental (Météores, Delphes, Nauplie). C'est sur le continent qu'est la vraie Grèce antique — et là où vous ne croiserez quasiment aucun autre touriste. Les îles ont la gloire ; le continent a la profondeur.",
      },
    },
  ],
  related: ["italy", "spain", "portugal"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 7. Morocco
// ---------------------------------------------------------------------------
const morocco: CountryGuide = {
  slug: { en: "morocco", fr: "maroc" },
  country: { en: "Morocco", fr: "Maroc" },
  continent: "africa",
  hero: {
    image: "/travel-guides/morocco/hero.jpg",
    imageAlt: {
      en: "Camel caravan crossing Sahara dunes at golden hour",
      fr: "Caravane de chameaux traversant les dunes du Sahara à l'heure dorée",
    },
    tag: {
      en: "Country guide · Africa",
      fr: "Guide pays · Afrique",
    },
  },
  meta: {
    title: {
      en: "Morocco Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Maroc 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Real Morocco travel guide for 2026: best season, Marrakech to the Sahara, regional food, honest budgets, cultural do's and don'ts. First and repeat trips.",
      fr: "Guide voyage Maroc 2026, sans bla-bla : meilleure saison, Marrakech au Sahara, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Morocco is the closest 'completely different world' from Europe — a 2.5-hour flight from Paris or Madrid, but a thousand years of history, a different alphabet, four languages (Arabic, Berber, French, Spanish), and a sensory overload that takes a day to recalibrate. The medinas are alive, the food is generous, the desert is real, and the kindness of strangers is constant — even through the hustle.",
      "First trip: Marrakech (3 days) + a Sahara overnight + Fes (2 days) + Chefchaouen or Essaouira (2 days). Second trip: the Atlas mountains hiking, Atlantic coast surfing (Taghazout, Imsouane), the deep south (Tafraoute, Agadir). Skip Casablanca as a destination — it's where you land, not where you stay.",
      "Two things to know. The medinas are designed to disorient — accept getting lost; that's the experience. Use Google Maps offline + your hotel's WhatsApp for when you really can't find the way back. And Ramadan (variable, March–April in 2026 / 2027) reshapes everything: most restaurants closed during the day, but the after-iftar evenings are magical if you respect the rhythm.",
    ],
    fr: [
      "Le Maroc, c'est le « monde complètement différent » le plus proche de l'Europe — 2h30 de vol depuis Paris ou Madrid, mais mille ans d'histoire, un autre alphabet, quatre langues (arabe, berbère, français, espagnol), et une surcharge sensorielle qu'on met une journée à recalibrer. Les médinas sont vivantes, la cuisine est généreuse, le désert est réel, et la gentillesse des inconnus est constante — même à travers l'arnaque.",
      "Première fois : Marrakech (3 jours) + une nuit au Sahara + Fès (2 jours) + Chefchaouen ou Essaouira (2 jours). Deuxième fois : la rando dans l'Atlas, le surf sur la côte atlantique (Taghazout, Imsouane), le grand sud (Tafraoute, Agadir). Évitez Casablanca comme destination — c'est là qu'on atterrit, pas là qu'on dort.",
      "Deux trucs à savoir. Les médinas sont conçues pour vous perdre — acceptez de l'être, c'est ça l'expérience. Utilisez Google Maps en hors-ligne + le WhatsApp de votre hôtel quand vraiment vous ne retrouvez plus la sortie. Et le Ramadan (variable, mars-avril en 2026 / 2027) change tout : la plupart des restos sont fermés en journée, mais les soirées d'après-iftar sont magiques si vous respectez le rythme.",
    ],
  },
  quickFacts: {
    capital: { en: "Rabat", fr: "Rabat" },
    language: { en: "Arabic · Berber · French widely spoken", fr: "Arabe · Berbère · Français très répandu" },
    currency: { code: "MAD", symbol: "د.م" },
    timezone: "WEST (UTC+1) · same as Europe in winter, 1h behind in summer",
    visa: {
      en: "Visa-free up to 90 days for EU, UK, US, Canada, Australia passports.",
      fr: "Sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie.",
    },
    plug: "Type C / E · 220V",
    driveSide: "right",
    population: "~37M",
  },
  bestSeason: {
    best: {
      months: {
        en: "March – May · September – November",
        fr: "Mars – mai · septembre – novembre",
      },
      description: {
        en: "Warm days, cool evenings, the Sahara still doable (40°C+ in midsummer is brutal). Spring brings desert wildflowers; autumn the olive harvest. Avoid Ramadan if you want full restaurant access — check the dates each year (it shifts ~11 days earlier annually).",
        fr: "Journées chaudes, soirées fraîches, le Sahara encore faisable (les 40°C+ d'été sont brutaux). Le printemps amène les fleurs du désert ; l'automne les olives. Évitez le Ramadan si vous voulez les restos ouverts en journée — vérifiez les dates (il avance d'environ 11 jours par an).",
      },
    },
    shoulder: {
      months: {
        en: "December – February",
        fr: "Décembre – février",
      },
      description: {
        en: "Mild in Marrakech (15–20°C day, 5°C night), cold in Fes and the mountains. Atlas peaks get snow. Sahara nights drop below freezing. Tourist density is lowest — and prices in riads are 30–40% off.",
        fr: "Doux à Marrakech (15-20°C le jour, 5°C la nuit), froid à Fès et en montagne. Les sommets de l'Atlas sont enneigés. Les nuits au Sahara passent sous zéro. La densité touristique est au plus bas — et les riads cassent leurs prix de 30 à 40 %.",
      },
    },
    avoid: {
      months: {
        en: "June – August",
        fr: "Juin – août",
      },
      description: {
        en: "Marrakech and Fes hit 45°C; the Sahara is unsafe in daytime. The Atlantic coast (Essaouira, Taghazout) stays mild thanks to the trade winds — that's where Moroccans themselves escape. If you must go in summer, stay coastal or high in the Atlas.",
        fr: "Marrakech et Fès atteignent 45°C ; le Sahara est dangereux en pleine journée. La côte atlantique (Essaouira, Taghazout) reste douce grâce aux alizés — c'est là que les Marocains eux-mêmes s'échappent. Si vous devez venir l'été, restez côte ou haut dans l'Atlas.",
      },
    },
  },
  mustSee: [
    {
      name: "Marrakech medina & Jemaa el-Fna",
      region: { en: "Marrakech-Safi", fr: "Marrakech-Safi" },
      description: {
        en: "The walled old city — Koutoubia minaret, Ben Youssef Madrasa, the souks (slipper makers, dyers, spice sellers), and Jemaa el-Fna square at dusk: snake charmers, storytellers, food stalls, an unbroken 1,000-year-old spectacle. Stay in a riad in the medina for the full immersion.",
        fr: "La vieille ville fortifiée — minaret de la Koutoubia, médersa Ben Youssef, les souks (babouchiers, teinturiers, marchands d'épices), et la place Jemaa el-Fna au crépuscule : charmeurs de serpents, conteurs, échoppes de bouffe, un spectacle ininterrompu depuis 1 000 ans. Dormez dans un riad de la médina pour l'immersion complète.",
      },
      image: "/travel-guides/morocco/marrakech-medina.jpg",
      imageAlt: {
        en: "Marrakech medina rooftops with the Koutoubia minaret",
        fr: "Toits de la médina de Marrakech avec le minaret de la Koutoubia",
      },
      mapsUrl: "https://maps.app.goo.gl/Xkr6JxF1Z3Hk4ZYZA",
    },
    {
      name: "Fes el-Bali medina & Chouara tannery",
      region: { en: "Fes-Meknes", fr: "Fès-Meknès" },
      description: {
        en: "The largest car-free urban area in the world — 9,000 narrow streets, donkeys still doing the deliveries. Chouara tannery is the 11th-century leather-dyeing operation you smell before you see; balconies above sell you sandals while you watch. Hire a guide for half a day or you will get lost (everyone does).",
        fr: "La plus grande zone urbaine sans voiture au monde — 9 000 ruelles, les ânes assurent encore les livraisons. La tannerie Chouara est l'usine de tannage de cuir du XIe siècle qu'on sent avant de la voir ; les balcons d'en haut vendent des babouches pendant que vous regardez. Prenez un guide une demi-journée ou vous vous perdrez (tout le monde se perd).",
      },
      image: "/travel-guides/morocco/fes-medina.jpg",
      imageAlt: {
        en: "Narrow alley of the Fes el-Bali medina",
        fr: "Ruelle étroite de la médina de Fès el-Bali",
      },
      mapsUrl: "https://maps.app.goo.gl/yYJqV9VnLmZNa3CN9",
    },
    {
      name: "Chefchaouen — the blue city",
      region: { en: "Tanger-Tétouan-Al Hoceïma", fr: "Tanger-Tétouan-Al Hoceïma" },
      description: {
        en: "A mountain town painted entirely in shades of blue. Easy 2-day stop from Fes (4hr by bus or grand taxi) or Tangier (2hr). Walk at sunrise before the day-trippers arrive — the blue glows. The Spanish Mosque hilltop sunset is the postcard.",
        fr: "Une ville de montagne entièrement peinte en bleu. Étape facile de 2 jours depuis Fès (4h en bus ou grand taxi) ou Tanger (2h). Arpentez-la au lever du soleil avant l'arrivée des excursionnistes — le bleu rayonne. Le coucher de soleil depuis la mosquée espagnole sur la colline est la carte postale.",
      },
      image: "/travel-guides/morocco/chefchaouen.jpg",
      imageAlt: {
        en: "Blue-painted alley in Chefchaouen Morocco",
        fr: "Ruelle peinte en bleu à Chefchaouen, Maroc",
      },
      mapsUrl: "https://maps.app.goo.gl/yKb8DkXdVQwTBy7n6",
    },
    {
      name: "Sahara — Erg Chebbi & Merzouga",
      region: { en: "Drâa-Tafilalet", fr: "Drâa-Tafilalet" },
      description: {
        en: "The dunes of postcards — 150m high, golden-orange at sunrise. 8-hour drive from Marrakech via Aït Benhaddou and the Dadès Gorges. Sleep in a desert camp (camel ride out at sunset, Berber dinner, stars), drive or 4x4 back. Two days minimum; three is right.",
        fr: "Les dunes de carte postale — 150 m de haut, orange dorées au lever du soleil. 8h de route depuis Marrakech via Aït Benhaddou et les gorges du Dadès. Nuit en bivouac (chameaux au coucher du soleil, dîner berbère, étoiles), retour en voiture ou 4x4. Deux jours minimum ; trois c'est le bon format.",
      },
      image: "/travel-guides/morocco/sahara.jpg",
      imageAlt: {
        en: "Camel caravan crossing the dunes of Erg Chebbi at sunset",
        fr: "Caravane de chameaux traversant les dunes de l'Erg Chebbi au coucher du soleil",
      },
      mapsUrl: "https://maps.app.goo.gl/jr1u5DsR6YxAvVKD9",
    },
    {
      name: "High Atlas — Imlil & Toubkal",
      region: { en: "Marrakech-Safi", fr: "Marrakech-Safi" },
      description: {
        en: "90 minutes from Marrakech to Imlil — the trailhead village for Mt Toubkal (4,167m, North Africa's highest). Day hikes to Berber villages, the Three Valleys, waterfalls. Toubkal summit is a 2-day guided climb; the views from the refuge alone justify the trip.",
        fr: "1h30 de Marrakech à Imlil — le village de départ pour le Toubkal (4 167 m, le plus haut sommet d'Afrique du Nord). Randos en journée vers les villages berbères, les Trois Vallées, les cascades. L'ascension du Toubkal se fait en 2 jours avec guide ; rien que la vue depuis le refuge justifie le voyage.",
      },
      image: "/travel-guides/morocco/atlas.jpg",
      imageAlt: {
        en: "Snow-capped Atlas mountains above a Berber village",
        fr: "Sommets enneigés de l'Atlas au-dessus d'un village berbère",
      },
      mapsUrl: "https://maps.app.goo.gl/4kQGYzcuG8q9CYrr5",
    },
    {
      name: "Essaouira",
      region: { en: "Marrakech-Safi", fr: "Marrakech-Safi" },
      description: {
        en: "Coastal Morocco's calmest spot — Portuguese ramparts, blue fishing boats, trade-winds keep it 22°C while Marrakech bakes at 40°C. Walk the medina (UNESCO), eat grilled sardines at the port, kitesurf or windsurf the bay. 3 hours from Marrakech by bus.",
        fr: "L'endroit le plus calme de la côte marocaine — remparts portugais, barques bleues de pêcheurs, les alizés maintiennent 22°C quand Marrakech cuit à 40°C. Arpentez la médina (UNESCO), mangez les sardines grillées au port, faites du kite ou de la planche dans la baie. 3h de Marrakech en bus.",
      },
      image: "/travel-guides/morocco/essaouira.jpg",
      imageAlt: {
        en: "Blue fishing boats in the Essaouira harbor",
        fr: "Barques bleues de pêcheurs dans le port d'Essaouira",
      },
      mapsUrl: "https://maps.app.goo.gl/eUL5gQrSEyJ6tKVE6",
    },
    {
      name: "Casablanca — Hassan II Mosque",
      region: { en: "Casablanca-Settat", fr: "Casablanca-Settat" },
      description: {
        en: "The second-largest mosque in the world after Mecca, half its 210m minaret sitting on a rocky outcrop in the Atlantic. One of the few mosques in Morocco non-Muslims can enter (guided tours: 9am, 10am, 11am, 2pm). Otherwise, Casablanca is a layover, not a stay.",
        fr: "La deuxième plus grande mosquée du monde après La Mecque, la moitié de son minaret de 210 m posée sur un rocher dans l'Atlantique. L'une des rares mosquées du Maroc accessibles aux non-musulmans (visites guidées : 9h, 10h, 11h, 14h). Sinon, Casablanca est une escale, pas une étape.",
      },
      image: "/travel-guides/morocco/hassan-mosque.jpg",
      imageAlt: {
        en: "Hassan II Mosque minaret on the Atlantic coast in Casablanca",
        fr: "Minaret de la mosquée Hassan II sur la côte atlantique à Casablanca",
      },
      mapsUrl: "https://maps.app.goo.gl/RVbeVeQUMRvmrxc59",
    },
    {
      name: "Aït Benhaddou & the kasbahs",
      region: { en: "Drâa-Tafilalet", fr: "Drâa-Tafilalet" },
      description: {
        en: "A fortified clay city on the old caravan road, UNESCO-listed, used as a film set for Gladiator and Game of Thrones. Stop here on the Marrakech-to-Sahara drive. Stay one night to see it at sunset and sunrise without other tourists.",
        fr: "Une cité fortifiée en pisé sur l'ancienne route caravanière, UNESCO, plateau de tournage pour Gladiator et Game of Thrones. À faire en escale sur la route Marrakech-Sahara. Restez une nuit pour la voir au coucher et lever du soleil sans autre touriste.",
      },
      image: "/travel-guides/morocco/ait-benhaddou.jpg",
      imageAlt: {
        en: "Clay kasbah of Aït Benhaddou with palm trees",
        fr: "Kasbah en pisé d'Aït Benhaddou avec palmiers",
      },
      mapsUrl: "https://maps.app.goo.gl/MqQ45zCN6SXCpAuw7",
    },
    {
      name: "Jardin Majorelle & YSL Museum",
      region: { en: "Marrakech", fr: "Marrakech" },
      description: {
        en: "The cobalt-blue villa and exotic garden Yves Saint Laurent bought and saved from demolition in the 1980s. Next door, the YSL Museum tells the story of his Morocco love affair. Book Majorelle online — the queue without ticket is 90 minutes.",
        fr: "La villa bleu cobalt et le jardin exotique qu'Yves Saint Laurent a rachetés pour les sauver de la démolition dans les années 80. À côté, le musée YSL raconte sa relation au Maroc. Réservez Majorelle en ligne — la file sans billet, c'est 1h30.",
      },
      image: "/travel-guides/morocco/jardin-majorelle.jpg",
      imageAlt: {
        en: "Cobalt blue walls and cacti at Jardin Majorelle, Marrakech",
        fr: "Murs bleu cobalt et cactus au Jardin Majorelle, Marrakech",
      },
      mapsUrl: "https://maps.app.goo.gl/Jc8Pkjkrk2KAACES7",
    },
    {
      name: "Volubilis & Meknes",
      region: { en: "Fes-Meknes", fr: "Fès-Meknès" },
      description: {
        en: "Roman ruins from the 1st century BCE — mosaics still in place, columns standing, capital of the Roman province of Mauretania. 1 hour from Fes; pair with imperial Meknes (Bab Mansour gate, Moulay Ismail mausoleum). The Roman side of Morocco no one expects.",
        fr: "Des ruines romaines du Ier siècle av. J.-C. — mosaïques encore en place, colonnes debout, capitale de la province romaine de Maurétanie. 1h de Fès ; à combiner avec Meknès impériale (porte Bab Mansour, mausolée Moulay Ismaïl). La face romaine du Maroc qu'on n'attend pas.",
      },
      image: "/travel-guides/morocco/volubilis.jpg",
      imageAlt: {
        en: "Roman ruins of Volubilis in Morocco",
        fr: "Ruines romaines de Volubilis au Maroc",
      },
      mapsUrl: "https://maps.app.goo.gl/jbBtCNkVAuhBRWyq6",
    },
    {
      name: "Ouzoud Falls",
      region: { en: "Béni Mellal-Khénifra", fr: "Béni Mellal-Khénifra" },
      description: {
        en: "110-metre triple-tier waterfalls in the Middle Atlas, often with rainbows in the spray. Wild Barbary macaques in the surrounding forest. Day trip from Marrakech (3 hours each way) or stay overnight in a family-run guesthouse for the dawn view.",
        fr: "Trois cascades de 110 mètres dans le Moyen Atlas, souvent avec arcs-en-ciel dans les embruns. Macaques de Barbarie en liberté dans la forêt alentour. Journée depuis Marrakech (3h aller, 3h retour) ou nuit dans une guesthouse familiale pour la vue à l'aube.",
      },
      image: "/travel-guides/morocco/ouzoud.jpg",
      imageAlt: {
        en: "Triple-tier waterfalls of Ouzoud in the Middle Atlas",
        fr: "Cascades à trois niveaux d'Ouzoud dans le Moyen Atlas",
      },
      mapsUrl: "https://maps.app.goo.gl/Wmcco8RuJKLcQ4DC9",
    },
    {
      name: "Legzira & the Atlantic south",
      region: { en: "Souss-Massa", fr: "Souss-Massa" },
      description: {
        en: "Red sandstone arches over an empty Atlantic beach, 2 hours south of Agadir. One arch collapsed in 2016; another still stands. Combine with Taghazout (surf town) or Tafraoute (Anti-Atlas red rocks). The Morocco no tour bus shows you.",
        fr: "Des arches de grès rouge au-dessus d'une plage atlantique déserte, à 2h au sud d'Agadir. Une arche s'est effondrée en 2016 ; une autre tient encore. À combiner avec Taghazout (village de surf) ou Tafraoute (rochers rouges de l'Anti-Atlas). Le Maroc qu'aucun bus touristique ne vous montre.",
      },
      image: "/travel-guides/morocco/legzira.jpg",
      imageAlt: {
        en: "Red sandstone arch over Legzira beach on the Atlantic coast",
        fr: "Arche de grès rouge au-dessus de la plage de Legzira sur la côte atlantique",
      },
      mapsUrl: "https://maps.app.goo.gl/zBJ3z2J3xDRcGzPK6",
    },
  ],
  specialties: [
    {
      name: { en: "Tagine", fr: "Tajine" },
      category: "food",
      description: {
        en: "Slow-cooked stew in a conical clay pot. Chicken with preserved lemon and olives, lamb with prunes and almonds, kefta (meatballs) with egg, vegetable tagine. Eaten with bread (no cutlery, traditional). The pot itself does the work — every house has at least three.",
        fr: "Ragoût mijoté dans un pot conique en terre cuite. Poulet au citron confit et olives, agneau aux pruneaux et amandes, kefta (boulettes) à l'œuf, tajine de légumes. Mangé avec du pain (pas de couverts, à la berbère). Le plat lui-même fait le travail — chaque foyer en a au moins trois.",
      },
      image: "/travel-guides/morocco/tagine.jpg",
      imageAlt: {
        en: "Moroccan tagine clay pot with cooked stew",
        fr: "Tajine marocain en terre cuite avec son ragoût",
      },
    },
    {
      name: { en: "Couscous", fr: "Couscous" },
      category: "food",
      description: {
        en: "The Friday national dish — steamed three times over a stew of seven vegetables and lamb or chicken. The hand-rolled real version takes 4 hours to make and is unrecognizable from the boxed European version. Eat it Friday lunch at a Moroccan family riad if at all possible.",
        fr: "Le plat national du vendredi — semoule cuite à la vapeur trois fois au-dessus d'un ragoût de sept légumes et d'agneau ou de poulet. La vraie version roulée à la main demande 4 heures de préparation et n'a rien à voir avec celle en boîte qu'on trouve en Europe. Mangez-le un vendredi midi dans un riad familial si possible.",
      },
      image: "/travel-guides/morocco/couscous.jpg",
      imageAlt: {
        en: "Moroccan couscous with vegetables and lamb",
        fr: "Couscous marocain aux légumes et à l'agneau",
      },
    },
    {
      name: { en: "Mint tea", fr: "Thé à la menthe" },
      category: "drink",
      description: {
        en: "The 'Berber whisky' — green tea, fresh mint, a lot of sugar, poured from waist height to create the foam (and aerate it). Offered everywhere, at every transaction, three glasses each: the first bitter as life, the second sweet as love, the third gentle as death. Refusing is rude.",
        fr: "Le « whisky berbère » — thé vert, menthe fraîche, beaucoup de sucre, versé depuis la taille pour créer la mousse (et l'aérer). Offert partout, à chaque transaction, trois verres : le premier amer comme la vie, le deuxième doux comme l'amour, le troisième suave comme la mort. Refuser est impoli.",
      },
      image: "/travel-guides/morocco/mint-tea.jpg",
      imageAlt: {
        en: "Moroccan mint tea poured from height into glasses",
        fr: "Thé à la menthe marocain versé en hauteur dans des verres",
      },
    },
    {
      name: { en: "Spice markets", fr: "Souks aux épices" },
      category: "food",
      description: {
        en: "Mounds of saffron, cumin, ras el hanout (the 'top of the shop' 30-ingredient blend), preserved lemons, dried roses, argan oil. Marrakech's Rahba Kedima square and the spice corner of Fes el-Attarine are the canonical ones. Buy whole spices not ground — they last and they're real.",
        fr: "Pyramides de safran, cumin, ras el hanout (le mélange « tête de gondole » à 30 ingrédients), citrons confits, roses séchées, huile d'argan. La place Rahba Kedima à Marrakech et le coin des épices de Fès el-Attarine sont les références. Achetez des épices entières, pas moulues — elles tiennent et elles sont vraies.",
      },
      image: "/travel-guides/morocco/spice-market.jpg",
      imageAlt: {
        en: "Colorful piles of spices in a Moroccan souk",
        fr: "Pyramides d'épices colorées dans un souk marocain",
      },
    },
    {
      name: { en: "Riad & zellige craft", fr: "Riad & art du zellige" },
      category: "craft",
      description: {
        en: "Sleeping in a riad is half the trip. Traditional houses built around a central courtyard with fountain and orange trees, walls covered in zellige (hand-cut geometric ceramic tiles), carved cedar, painted plaster. From €40 to €400 a night depending on the level.",
        fr: "Dormir en riad fait la moitié du voyage. Maisons traditionnelles bâties autour d'un patio central avec fontaine et orangers, murs recouverts de zellige (mosaïques de céramique taillée à la main), bois de cèdre sculpté, stuc peint. De 40 à 400 € la nuit selon le standing.",
      },
      image: "/travel-guides/morocco/riad-zellige.jpg",
      imageAlt: {
        en: "Zellige-tiled courtyard of a Moroccan riad",
        fr: "Patio en zellige d'un riad marocain",
      },
    },
    {
      name: { en: "Berber rugs & crafts", fr: "Tapis berbères & artisanat" },
      category: "craft",
      description: {
        en: "Beni Ourain rugs (cream wool, black diamonds), kilims, leather pouf chairs, brass lanterns, blue Fes pottery. The Marrakech and Fes souks have it all; the Atlas village cooperatives (around Ouirgane, Asni) have it cheaper and more authentic. Always bargain to 50–60% of the asking price.",
        fr: "Tapis Beni Ouarain (laine crème, losanges noirs), kilims, poufs en cuir, lanternes en laiton, poterie bleue de Fès. Les souks de Marrakech et Fès ont tout ; les coopératives des villages de l'Atlas (autour d'Ouirgane, Asni) ont la même chose moins chère et plus authentique. Marchandez toujours à 50-60 % du prix demandé.",
      },
      image: "/travel-guides/morocco/berber-rugs.jpg",
      imageAlt: {
        en: "Berber rugs and Moroccan textiles in a workshop",
        fr: "Tapis berbères et textiles marocains dans un atelier",
      },
    },
    {
      name: { en: "Leather & tanneries", fr: "Cuir & tanneries" },
      category: "craft",
      description: {
        en: "Fes's Chouara tannery (11th century, still operating) and Marrakech's smaller tanneries make the leather babouches, bags, and poufs you see everywhere. The hides are dyed in pigeon-droppings-and-quicklime pits; the smell is real but the leather is good. Buy from cooperative shops, not pushy guides.",
        fr: "La tannerie Chouara à Fès (XIe siècle, encore en activité) et les plus petites de Marrakech fabriquent les babouches, sacs et poufs qu'on voit partout. Les peaux sont teintes dans des bassins de fiente de pigeon et de chaux ; l'odeur est réelle mais le cuir est bon. Achetez en coopératives, pas chez les rabatteurs.",
      },
      image: "/travel-guides/morocco/leather-tannery.jpg",
      imageAlt: {
        en: "Colored dye pits of the Chouara tannery in Fes",
        fr: "Bassins de teinture colorés de la tannerie Chouara à Fès",
      },
    },
  ],
  regions: [
    {
      name: { en: "Marrakech & Central", fr: "Marrakech & Centre" },
      highlights: {
        en: "Marrakech, Ouzoud, High Atlas, Aït Benhaddou",
        fr: "Marrakech, Ouzoud, Haut Atlas, Aït Benhaddou",
      },
      description: {
        en: "Most international flights land at Marrakech-Menara (RAK). Use Marrakech as the base for everything south and west: day trips to the High Atlas, Ouzoud Falls, Essaouira; longer trips to Aït Benhaddou and the Sahara.",
        fr: "La plupart des vols internationaux atterrissent à Marrakech-Menara (RAK). Utilisez Marrakech comme base pour tout ce qui est au sud et à l'ouest : journées dans le Haut Atlas, à Ouzoud, à Essaouira ; voyages plus longs vers Aït Benhaddou et le Sahara.",
      },
    },
    {
      name: { en: "Fes & Meknes (Imperial cities)", fr: "Fès & Meknès (villes impériales)" },
      highlights: {
        en: "Fes, Meknes, Volubilis, Middle Atlas, Ifrane",
        fr: "Fès, Meknès, Volubilis, Moyen Atlas, Ifrane",
      },
      description: {
        en: "The historical heart. Fes for the most authentic medina, Meknes for the imperial gates and walls, Volubilis for the Roman ruins. Day trips to the cedar forests of Ifrane (the 'Switzerland of Morocco') and the Middle Atlas Berber villages.",
        fr: "Le cœur historique. Fès pour la médina la plus authentique, Meknès pour les portes et remparts impériaux, Volubilis pour les ruines romaines. Excursions vers les forêts de cèdres d'Ifrane (« la Suisse marocaine ») et les villages berbères du Moyen Atlas.",
      },
    },
    {
      name: { en: "Sahara & the south", fr: "Sahara & le sud" },
      highlights: {
        en: "Merzouga, Erg Chebbi, Zagora, Dadès & Todra gorges",
        fr: "Merzouga, Erg Chebbi, Zagora, gorges du Dadès & du Todra",
      },
      description: {
        en: "The desert south. Erg Chebbi (Merzouga) is the big-dune Sahara; Erg Chigaga (Zagora) is more remote and quieter. The drive from Marrakech via Aït Benhaddou + the Dadès gorges + the Todra gorge is one of the world's great road trips. 4–5 days minimum.",
        fr: "Le sud désertique. L'Erg Chebbi (Merzouga) est le Sahara à grandes dunes ; l'Erg Chigaga (Zagora) est plus reculé et calme. La route depuis Marrakech via Aït Benhaddou + les gorges du Dadès + celle du Todra est l'un des grands road trips du monde. 4-5 jours minimum.",
      },
    },
    {
      name: { en: "Atlantic coast", fr: "Côte atlantique" },
      highlights: {
        en: "Essaouira, Casablanca, Rabat, Taghazout, Agadir, Legzira",
        fr: "Essaouira, Casablanca, Rabat, Taghazout, Agadir, Legzira",
      },
      description: {
        en: "Cooler, breezier, fish-heavy. Essaouira for the medina + wind, Taghazout for the surf, Legzira and the south for the empty wild beaches. Casablanca is the airline hub but not a destination; Rabat the political capital, walkable and quiet.",
        fr: "Plus frais, plus venté, plus poissonneux. Essaouira pour la médina et le vent, Taghazout pour le surf, Legzira et le sud pour les plages sauvages désertes. Casablanca est le hub aérien mais pas une destination ; Rabat la capitale politique, calme et marchable.",
      },
    },
    {
      name: { en: "Rif & north (Chefchaouen)", fr: "Rif & nord (Chefchaouen)" },
      highlights: {
        en: "Chefchaouen, Tangier, Tétouan, Cap Spartel",
        fr: "Chefchaouen, Tanger, Tétouan, Cap Spartel",
      },
      description: {
        en: "Mountainous, cooler, Spanish-influenced (Tétouan was the Spanish protectorate capital). Chefchaouen as base; Tangier as the ferry-to-Spain point. The least Arabic-feeling part of Morocco — Berber and Spanish dominate.",
        fr: "Montagneux, plus frais, marqué par l'Espagne (Tétouan était la capitale du protectorat espagnol). Chefchaouen comme base ; Tanger comme point de ferry vers l'Espagne. La partie du Maroc qui se sent le moins « arabe » — berbère et espagnol dominent.",
      },
    },
    {
      name: { en: "Anti-Atlas & deep south", fr: "Anti-Atlas & grand sud" },
      highlights: {
        en: "Tafraoute, Anti-Atlas, Western Sahara, Dakhla",
        fr: "Tafraoute, Anti-Atlas, Sahara occidental, Dakhla",
      },
      description: {
        en: "The Morocco for second and third trips. Tafraoute for red-rock landscapes and almond groves. Dakhla in the Western Sahara for kitesurfing on a 40km lagoon. Empty, quiet, technically Morocco but a planet apart.",
        fr: "Le Maroc des deuxième et troisième visites. Tafraoute pour les paysages rouges et les amandiers. Dakhla au Sahara occidental pour le kite sur une lagune de 40 km. Vide, calme, techniquement marocain mais à des kilomètres de tout.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: {
        en: "Marrakech + Sahara — 7 days",
        fr: "Marrakech + Sahara — 7 jours",
      },
      summary: {
        en: "The classic first trip — souks of Marrakech, drive south to the desert, sleep one night in a camp.",
        fr: "Le voyage classique — souks de Marrakech, descente vers le désert, une nuit en bivouac.",
      },
      stops: {
        en: [
          "Day 1–3: Marrakech (medina, Jemaa el-Fna, Jardin Majorelle, hammam)",
          "Day 4: Drive Marrakech → Aït Benhaddou → Dadès gorges (sleep en route)",
          "Day 5: Dadès → Todra gorges → Merzouga / Sahara camp",
          "Day 6: Sahara sunrise → drive back to Marrakech (long day)",
          "Day 7: Marrakech buffer + fly home from RAK",
        ],
        fr: [
          "Jour 1-3 : Marrakech (médina, Jemaa el-Fna, Jardin Majorelle, hammam)",
          "Jour 4 : Route Marrakech → Aït Benhaddou → gorges du Dadès (nuit sur la route)",
          "Jour 5 : Dadès → gorges du Todra → Merzouga / bivouac Sahara",
          "Jour 6 : Lever de soleil au Sahara → retour Marrakech (longue journée)",
          "Jour 7 : Marrakech tampon + vol retour depuis RAK",
        ],
      },
    },
    {
      days: 10,
      title: {
        en: "Marrakech + Sahara + Fes — 10 days",
        fr: "Marrakech + Sahara + Fès — 10 jours",
      },
      summary: {
        en: "Add the imperial north. Internal flight Marrakech-Fes or a long drive via Meknes.",
        fr: "Ajoutez le nord impérial. Vol intérieur Marrakech-Fès ou longue route via Meknès.",
      },
      stops: {
        en: [
          "Day 1–3: Marrakech",
          "Day 4–5: Drive south, Aït Benhaddou + Sahara camp",
          "Day 6: Drive back to Marrakech, fly to Fes",
          "Day 7–8: Fes medina + Volubilis day trip",
          "Day 9: Chefchaouen overnight (bus or grand taxi)",
          "Day 10: Fly home from Fes (FEZ) or back to Casablanca (CMN)",
        ],
        fr: [
          "Jour 1-3 : Marrakech",
          "Jour 4-5 : Route sud, Aït Benhaddou + bivouac Sahara",
          "Jour 6 : Retour Marrakech, vol pour Fès",
          "Jour 7-8 : Médina de Fès + journée Volubilis",
          "Jour 9 : Chefchaouen, une nuit (bus ou grand taxi)",
          "Jour 10 : Vol retour depuis Fès (FEZ) ou Casablanca (CMN)",
        ],
      },
    },
    {
      days: 14,
      title: {
        en: "Full Morocco — 14 days",
        fr: "Le Maroc en grand — 14 jours",
      },
      summary: {
        en: "Add the coast and the Atlas. Rental car recommended for the south + coast leg.",
        fr: "Ajoute la côte et l'Atlas. Voiture recommandée pour la portion sud + côte.",
      },
      stops: {
        en: [
          "Day 1–3: Marrakech",
          "Day 4: Imlil + High Atlas day hike",
          "Day 5–7: Sahara loop via Aït Benhaddou + Merzouga",
          "Day 8: Drive back via Ouzoud Falls",
          "Day 9–10: Essaouira (relax, eat, surf)",
          "Day 11: Fly to Fes",
          "Day 12–13: Fes medina + Volubilis + Meknes",
          "Day 14: Chefchaouen overnight, fly home from Fes",
        ],
        fr: [
          "Jour 1-3 : Marrakech",
          "Jour 4 : Imlil + rando journée dans le Haut Atlas",
          "Jour 5-7 : Boucle Sahara via Aït Benhaddou + Merzouga",
          "Jour 8 : Retour via les cascades d'Ouzoud",
          "Jour 9-10 : Essaouira (détente, manger, surf)",
          "Jour 11 : Vol pour Fès",
          "Jour 12-13 : Médina de Fès + Volubilis + Meknès",
          "Jour 14 : Chefchaouen, une nuit, vol retour depuis Fès",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 35,
        description: {
          en: "Hostel dorm or basic riad (€15), tagine + street food (€10), grands taxis and walking (€5), one paid attraction (€5). Morocco on the cheap is one of the world's best values — every meal under €5, transportation cheap, accommodation generous.",
          fr: "Dortoir d'auberge ou riad simple (15 €), tajine + street food (10 €), grands taxis et marche (5 €), une attraction payante (5 €). Le Maroc petit budget est un des meilleurs rapports qualité-prix du monde — repas à moins de 5 €, transport pas cher, hébergement généreux.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 90,
        description: {
          en: "Mid-range riad with breakfast (€50), one sit-down dinner + casual lunch (€20), private transfer or rental car (€15 averaged), entries + guide (€5). The right tier — riad living is Morocco's signature experience and worth paying up.",
          fr: "Riad moyen avec petit-déj (50 €), un dîner attablé + déjeuner décontracté (20 €), transfert privé ou voiture (15 € lissés), entrées + guide (5 €). Le bon équilibre — dormir en riad fait partie de l'expérience marocaine et vaut le coup.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 230,
        description: {
          en: "5-star riad or design hotel (€150), one fine-dining or Atlas resort dinner (€55), private driver (€20), guided desert experience (€5). Honeymoon and royal-style tier — Morocco does luxury very well.",
          fr: "Riad 5 étoiles ou hôtel design (150 €), un dîner gastronomique ou en resort de l'Atlas (55 €), chauffeur privé (20 €), expérience désert encadrée (5 €). Tier lune de miel ou royal — le Maroc fait très bien le luxe.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. The dirham (MAD) is a closed currency — change at the airport or banks, never on the street. Cash is dominant; ATMs are everywhere in cities. Bargaining is expected at souks (start at 30%, settle at 50–60% of the asking price).",
      fr: "Par personne, hors vol international. Le dirham (MAD) est une monnaie fermée — change à l'aéroport ou en banque, jamais dans la rue. Le cash domine ; les DAB sont partout en ville. Marchandage attendu dans les souks (commencez à 30 %, concluez à 50-60 % du prix demandé).",
    },
  },
  tips: [
    {
      do: true,
      text: {
        en: "Dress modestly — covered shoulders and knees in medinas, especially for women. Shorts and tank tops are fine on the coast (Essaouira, Taghazout) but draw constant attention in Marrakech or Fes. A scarf is a useful all-purpose layer.",
        fr: "Habillez-vous sobrement — épaules et genoux couverts dans les médinas, surtout pour les femmes. Short et débardeur passent à la côte (Essaouira, Taghazout) mais attirent l'attention permanente à Marrakech ou Fès. Un foulard est une couche multi-usage utile.",
      },
    },
    {
      do: true,
      text: {
        en: "Bargain at souks, but stay friendly. Start at 30% of the asking price; settle at 50–60%. If you can't agree, walk away calmly — half the time you're called back. Don't bargain over fruit or food: those prices are fixed.",
        fr: "Marchandez dans les souks, mais restez sympa. Commencez à 30 % du prix annoncé ; concluez à 50-60 %. Si vous ne tombez pas d'accord, partez tranquillement — la moitié du temps on vous rappelle. Ne marchandez pas sur les fruits ou la nourriture : leurs prix sont fixes.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't follow random 'helpful' people offering to guide you in the medina. Most are touts paid by carpet shops or tanneries to bring you in. If you need a guide, hire an official one through your riad — they wear a badge and cost €20–30 a half-day.",
        fr: "Ne suivez pas les inconnus « serviables » qui proposent de vous guider dans la médina. Ce sont en majorité des rabatteurs payés par les magasins de tapis ou tanneries pour vous y amener. Si vous voulez un guide, prenez un officiel via votre riad — badge officiel, 20-30 € la demi-journée.",
      },
    },
    {
      do: true,
      text: {
        en: "Carry small notes (10–50 MAD). Taxis, tea sellers, and small souk vendors rarely have change for 200 MAD notes. Tip 5–10 MAD for help with bags, taxi drivers who don't try to rip you off, and the hammam attendant.",
        fr: "Ayez de petites coupures (10-50 MAD) sur vous. Taxis, marchands de thé et petits vendeurs du souk n'ont rarement de quoi rendre sur 200 MAD. Pourboire 5-10 MAD pour l'aide aux bagages, les taxis honnêtes, et le rajel du hammam.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't photograph people without asking. It's polite, often returned with a smile and yes — and refusing a child's request for money after taking their photo is awkward. In tannery viewing balconies, the shop owners expect you to buy if you photograph.",
        fr: "Ne photographiez pas les gens sans demander. C'est poli, souvent retourné par un sourire et un oui — et refuser de l'argent à un enfant après l'avoir photographié devient gênant. Sur les balcons des tanneries, les commerçants attendent un achat si vous prenez la photo.",
      },
    },
    {
      do: true,
      text: {
        en: "Use Inwi or Maroc Telecom prepaid SIM (50–100 MAD for 10GB, sold at the airport). Google Maps offline + WhatsApp covers 95% of navigation and communication needs. Wi-Fi is everywhere but spotty.",
        fr: "Utilisez une SIM prépayée Inwi ou Maroc Telecom (50-100 MAD pour 10 Go, à l'aéroport). Google Maps en hors-ligne + WhatsApp couvrent 95 % des besoins. Le Wi-Fi est partout mais instable.",
      },
    },
    {
      do: false,
      text: {
        en: "Don't drink tap water. Bottled water is 5–10 MAD a bottle everywhere. Ice in upscale restaurants is fine; avoid in roadside stalls. Cooked food and freshly boiled mint tea are always safe.",
        fr: "Ne buvez pas l'eau du robinet. La bouteille coûte 5-10 MAD partout. Les glaçons dans les restos haut de gamme sont OK ; évitez dans les stands de rue. La nourriture cuite et le thé à la menthe bouillant sont toujours sûrs.",
      },
    },
    {
      do: true,
      text: {
        en: "Plan around Ramadan if possible. In 2026 it falls February 17 – March 18; in 2027 February 6 – March 7. Restaurants in tourist zones stay open in daytime, but most local places close. Evenings (post-iftar) are alive and beautiful; daytime is quiet and respectful.",
        fr: "Plannifiez autour du Ramadan si vous pouvez. En 2026 : du 17 février au 18 mars ; en 2027 : du 6 février au 7 mars. Les restos des zones touristiques restent ouverts en journée, mais la plupart des places locales ferment. Les soirées (après l'iftar) sont vivantes et belles ; le jour est calme et respectueux.",
      },
    },
  ],
  related: ["spain", "portugal"],
  relatedDestinations: ["marrakech-bachelorette"],
};

// ---------------------------------------------------------------------------
// 8. Vietnam
// ---------------------------------------------------------------------------
const vietnam: CountryGuide = {
  slug: { en: "vietnam", fr: "vietnam" },
  country: { en: "Vietnam", fr: "Vietnam" },
  continent: "asia",
  hero: {
    image: "/travel-guides/vietnam/hero.jpg",
    imageAlt: {
      en: "Limestone karsts and traditional junk boats in Halong Bay",
      fr: "Karsts calcaires et jonques traditionnelles dans la baie d'Halong",
    },
    tag: {
      en: "Country guide · Asia",
      fr: "Guide pays · Asie",
    },
  },
  meta: {
    title: {
      en: "Vietnam Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Vietnam 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Real Vietnam travel guide for 2026: best season, Hanoi to the Mekong, regional food, honest budgets, cultural do's and don'ts. First and repeat trips.",
      fr: "Guide voyage Vietnam 2026, sans bla-bla : meilleure saison, de Hanoï au Mékong, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Vietnam is a 1,650km strip of country with three weathers happening at once. The north (Hanoi, Halong, Sapa) has four real seasons. The center (Hoi An, Hue, Da Nang) has a wet and a dry. The south (Saigon, Mekong) is hot year-round with a monsoon. Pho costs €2, the coffee is among the world's best, and you'll cross a Saigon street through 5,000 scooters and somehow not die.",
      "First trip: top-to-bottom in 2–3 weeks. Hanoi (2 days) + Halong Bay cruise (2 days) + Sapa or Ninh Binh (2 days) + flight to Hoi An (3 days) + Hue (1 day) + flight to Saigon (3 days) + Mekong Delta (1–2 days). Second trip: Phu Quoc beaches, the central highlands, the far north (Ha Giang loop by motorbike).",
      "Two things to know. The country runs on motorbikes — 45 million of them. Crossing Saigon traffic on foot is a meditation: walk slow and steady, never stop, never run; they part around you. And the SIM-card 4G data plan is essential — Grab (Uber for taxis and motorbikes) is how you move anywhere, and Google Translate's camera mode is how you read menus.",
    ],
    fr: [
      "Le Vietnam est une bande de pays de 1 650 km qui héberge trois climats en même temps. Le nord (Hanoï, Halong, Sapa) a quatre vraies saisons. Le centre (Hoi An, Hue, Da Nang) a une saison sèche et une saison humide. Le sud (Saigon, Mékong) est chaud toute l'année, avec une mousson. Le pho coûte 2 €, le café est parmi les meilleurs du monde, et vous traverserez une rue de Saigon à travers 5 000 scooters sans mourir, on ne sait comment.",
      "Première fois : du nord au sud sur 2 à 3 semaines. Hanoï (2 jours) + croisière Halong (2 jours) + Sapa ou Ninh Binh (2 jours) + vol pour Hoi An (3 jours) + Hue (1 jour) + vol pour Saigon (3 jours) + delta du Mékong (1-2 jours). Deuxième fois : les plages de Phu Quoc, les hauts plateaux du centre, la boucle Ha Giang à moto au nord profond.",
      "Deux trucs à savoir. Le pays carbure aux scooters — 45 millions d'unités. Traverser le trafic de Saigon à pied est une méditation : marchez lentement et régulièrement, ne vous arrêtez jamais, ne courez jamais ; ils se séparent autour de vous. Et la carte SIM 4G est indispensable — Grab (l'Uber des taxis et des motos) est le mode de déplacement par défaut, et l'appareil photo de Google Translate, c'est comme ça qu'on lit les menus.",
    ],
  },
  quickFacts: {
    capital: { en: "Hanoi", fr: "Hanoï" },
    language: { en: "Vietnamese", fr: "Vietnamien" },
    currency: { code: "VND", symbol: "₫" },
    timezone: "ICT (UTC+7)",
    visa: {
      en: "E-visa (90 days, single or multi-entry) for most Western passports — apply online 3–5 days ahead at evisa.xuatnhapcanh.gov.vn. About US$25.",
      fr: "E-visa (90 jours, simple ou multiple entrée) pour la plupart des passeports occidentaux — demande en ligne 3 à 5 jours avant sur evisa.xuatnhapcanh.gov.vn. ~25 US$.",
    },
    plug: "Type A / C · 220V",
    driveSide: "right",
    population: "~100M",
  },
  bestSeason: {
    best: {
      months: {
        en: "March – April · October – November",
        fr: "Mars – avril · octobre – novembre",
      },
      description: {
        en: "Mild and dry across the entire country — a rare window. Halong Bay calm seas, Hoi An lantern festivals, Mekong rivers full but not flooding. Book Halong cruises 3–4 weeks ahead.",
        fr: "Doux et sec sur tout le pays — une fenêtre rare. Mer calme dans la baie d'Halong, festivals de lanternes à Hoi An, fleuves du Mékong pleins sans déborder. Réservez les croisières Halong 3 à 4 semaines à l'avance.",
      },
    },
    shoulder: {
      months: {
        en: "December – February",
        fr: "Décembre – février",
      },
      description: {
        en: "Cool in the north (10°C in Hanoi, snow in Sapa), perfect dry in the south. Christmas-New Year is busy in Saigon and Hoi An; Tet (Vietnamese New Year, late Jan – mid Feb) shuts everything for 5+ days — book around it carefully.",
        fr: "Frais au nord (10°C à Hanoï, neige à Sapa), parfait sec au sud. Noël-Nouvel An sont chargés à Saigon et Hoi An ; le Tết (Nouvel An vietnamien, fin janvier – mi-février) met le pays à l'arrêt pendant 5+ jours — calez le voyage autour, prudemment.",
      },
    },
    avoid: {
      months: {
        en: "May – September (south + center) · July – August (north)",
        fr: "Mai – septembre (sud + centre) · juillet – août (nord)",
      },
      description: {
        en: "Monsoon in the south and center, with daily downpours and occasional typhoons (Hoi An sometimes floods). The north is humid and 35°C+ in July-August. If you must go in summer, stay in the cooler highlands (Sapa, Da Lat).",
        fr: "Mousson au sud et au centre, avec averses quotidiennes et typhons occasionnels (Hoi An est parfois inondée). Le nord est humide et au-dessus de 35°C en juillet-août. Si vous devez y aller l'été, restez sur les hauts plateaux plus frais (Sapa, Đà Lạt).",
      },
    },
  },
  mustSee: [
    {
      name: "Halong Bay",
      region: { en: "Quang Ninh, North", fr: "Quang Ninh, Nord" },
      description: {
        en: "1,600 limestone karsts rising out of emerald sea — UNESCO since 1994. Take an overnight cruise (not a day trip; the day trip skips the best spots). Better yet, go to Bai Tu Long Bay or Lan Ha Bay just south — same scenery, a tenth of the boats.",
        fr: "1 600 karsts calcaires émergeant d'une mer émeraude — UNESCO depuis 1994. Faites une croisière de nuit (pas une journée ; la journée saute les meilleurs spots). Mieux : allez à Bai Tu Long ou Lan Ha, juste au sud — même décor, dix fois moins de bateaux.",
      },
      image: "/travel-guides/vietnam/halong-bay.jpg",
      imageAlt: { en: "Junk boats among limestone karsts in Halong Bay", fr: "Jonques entre les karsts calcaires de la baie d'Halong" },
      mapsUrl: "https://maps.app.goo.gl/m1FQQTLP4nNwCSY99",
    },
    {
      name: "Hoi An ancient town",
      region: { en: "Quang Nam, Centre", fr: "Quang Nam, Centre" },
      description: {
        en: "A perfectly preserved 16th-century trading port — UNESCO, lantern-lit, motorbike-restricted in the old quarter. Get a custom-made suit or áo dài (24-hour turnaround, €60–150). Take a cooking class in the morning, cycle to An Bang beach in the afternoon.",
        fr: "Un port commerçant du XVIe siècle parfaitement préservé — UNESCO, illuminé aux lanternes, scooters interdits dans le vieux quartier. Faites-vous faire un costume sur mesure ou un áo dài (24h, 60-150 €). Cours de cuisine le matin, vélo jusqu'à la plage d'An Bang l'après-midi.",
      },
      image: "/travel-guides/vietnam/hoi-an.jpg",
      imageAlt: { en: "Lit-up lanterns reflecting on the river in Hoi An", fr: "Lanternes illuminées se reflétant sur la rivière à Hoi An" },
      mapsUrl: "https://maps.app.goo.gl/L1aZBL2Sk5Tn3Lkh9",
    },
    {
      name: "Sapa & the rice terraces",
      region: { en: "Lao Cai, North", fr: "Lao Cai, Nord" },
      description: {
        en: "Mountain town in the far north, surrounded by terraced rice paddies of the Hmong and Dao ethnic minorities. Trek between villages with a local Hmong guide (€20/day). Best in September (rice golden before harvest) or May (paddies flooded, mirror-like).",
        fr: "Ville de montagne du nord profond, entourée des rizières en terrasses des Hmong et Dao. Trekkez entre villages avec une guide hmong locale (~20 € la journée). Idéal en septembre (riz doré avant la récolte) ou mai (rizières inondées, en miroir).",
      },
      image: "/travel-guides/vietnam/sapa.jpg",
      imageAlt: { en: "Terraced rice paddies in Sapa, Vietnam", fr: "Rizières en terrasses à Sapa, Vietnam" },
      mapsUrl: "https://maps.app.goo.gl/2bXLBcG2gAW7nM6t8",
    },
    {
      name: "Hanoi Old Quarter",
      region: { en: "Hanoi", fr: "Hanoï" },
      description: {
        en: "36 streets, each historically named for a craft (Silk Street, Silver Street, Conical Hat Street). Walk it on foot — no point with a car. Egg coffee at Cafe Giang (the original, since 1946), bún chả on plastic stools (Obama and Anthony Bourdain ate at Bun Cha Huong Lien, May 2016).",
        fr: "36 rues, chacune historiquement nommée pour un métier (rue de la Soie, rue de l'Argent, rue des Chapeaux coniques). À pied uniquement — la voiture n'a pas de sens. Café à l'œuf au Café Giang (l'original, depuis 1946), bún chả sur tabourets en plastique (Obama et Anthony Bourdain ont mangé chez Bun Cha Huong Lien, mai 2016).",
      },
      image: "/travel-guides/vietnam/hanoi-old-quarter.jpg",
      imageAlt: { en: "Street scene in Hanoi's Old Quarter with scooters", fr: "Scène de rue dans le vieux quartier de Hanoï avec scooters" },
      mapsUrl: "https://maps.app.goo.gl/RxJF7d8hCMfaFFu27",
    },
    {
      name: "Saigon (Ho Chi Minh City)",
      region: { en: "South", fr: "Sud" },
      description: {
        en: "Vietnam's economic engine — chaotic, ambitious, capitalist. War Remnants Museum (heavy but essential), the Reunification Palace (where the tanks came in 1975), Notre-Dame Saigon (French colonial). Cu Chi Tunnels day trip 60km north. Eat on plastic stools everywhere.",
        fr: "Le moteur économique du pays — chaotique, ambitieux, capitaliste. Musée des vestiges de la guerre (lourd mais essentiel), Palais de la Réunification (où les tanks sont entrés en 1975), Notre-Dame de Saigon (colonial français). Tunnels de Cu Chi en journée à 60 km au nord. Mangez sur tabourets en plastique partout.",
      },
      image: "/travel-guides/vietnam/saigon.jpg",
      imageAlt: { en: "Saigon street scene with dense motorbike traffic", fr: "Scène de rue à Saigon avec trafic dense de scooters" },
      mapsUrl: "https://maps.app.goo.gl/EAfHBKAfQk4ujBwx7",
    },
    {
      name: "Mekong Delta",
      region: { en: "South", fr: "Sud" },
      description: {
        en: "The 'rice basket of Vietnam' — a flat, lush, water-everywhere region southwest of Saigon. Cai Rang floating market at dawn (Can Tho is the base). Day trips are touristy; stay overnight in a Ben Tre homestay for the real version. Coconut candy factories, sampan rides, river-life.",
        fr: "Le « grenier à riz du Vietnam » — région plate, luxuriante, où l'eau est partout, au sud-ouest de Saigon. Marché flottant de Cai Rang à l'aube (Can Tho comme base). Les journées sont touristiques ; passez une nuit dans un homestay à Ben Tre pour la vraie version. Usines de bonbons à la noix de coco, balades en sampan, vie au bord de l'eau.",
      },
      image: "/travel-guides/vietnam/mekong.jpg",
      imageAlt: { en: "Boats at a floating market in the Mekong Delta", fr: "Bateaux dans un marché flottant du delta du Mékong" },
      mapsUrl: "https://maps.app.goo.gl/W2pKpcrwK4ANYqkN6",
    },
    {
      name: "Ninh Binh — Tam Coc & Trang An",
      region: { en: "Ninh Binh, North", fr: "Ninh Binh, Nord" },
      description: {
        en: "The 'Halong Bay on land' — limestone karsts, but instead of sea, rice paddies and a river. Take a 2-hour rowboat through caves at Tam Coc, climb Hang Mua's 500 steps for the postcard view. 2 hours by train from Hanoi; do as a day trip or overnight.",
        fr: "« La baie d'Halong sur terre » — karsts calcaires, mais à la place de la mer, des rizières et une rivière. Faites 2 heures de barque à travers les grottes à Tam Coc, montez les 500 marches de Hang Mua pour la vue carte postale. À 2h de train de Hanoï ; faisable en journée ou avec une nuit.",
      },
      image: "/travel-guides/vietnam/ninh-binh.jpg",
      imageAlt: { en: "Limestone karsts and river boats at Ninh Binh", fr: "Karsts calcaires et bateaux sur la rivière à Ninh Binh" },
      mapsUrl: "https://maps.app.goo.gl/HKZ6gpFAdsKMQzAk9",
    },
    {
      name: "Hue Imperial City",
      region: { en: "Thua Thien-Hue, Centre", fr: "Thua Thien-Huế, Centre" },
      description: {
        en: "The walled Imperial Citadel of the Nguyen dynasty (1802–1945) — heavily damaged by US bombing, partially restored, still huge. Pair with the royal tombs scattered along the Perfume River south of the city (best by motorbike or hired car).",
        fr: "La citadelle impériale fortifiée de la dynastie Nguyen (1802-1945) — gravement endommagée par les bombardements américains, partiellement restaurée, mais encore immense. À combiner avec les tombeaux royaux disséminés le long de la rivière des Parfums au sud de la ville (idéal en scooter ou voiture avec chauffeur).",
      },
      image: "/travel-guides/vietnam/hue.jpg",
      imageAlt: { en: "Imperial gate of Hue citadel in central Vietnam", fr: "Porte impériale de la citadelle de Hué au centre du Vietnam" },
      mapsUrl: "https://maps.app.goo.gl/eFmKbR9BV6vBgGRR8",
    },
    {
      name: "Phong Nha caves",
      region: { en: "Quang Binh, Centre", fr: "Quang Binh, Centre" },
      description: {
        en: "The world's largest cave system — Hang Son Doong, big enough to fit a 747, requires a €3,000 4-day permit. For mortals: Paradise Cave (31km, easy walkway) and Hang Va (camp inside, 2-day adventure). Phong Nha town is rough-edged but charming, and largely untouched by tourists.",
        fr: "Le plus grand système de grottes du monde — Hang Son Doong, assez grande pour un 747, demande un permis de 4 jours à 3 000 €. Pour le commun des mortels : Paradise Cave (31 km, passerelle facile) et Hang Va (bivouac à l'intérieur, aventure de 2 jours). La ville de Phong Nha est brute mais charmante, et largement préservée du tourisme.",
      },
      image: "/travel-guides/vietnam/phong-nha.jpg",
      imageAlt: { en: "Interior of Phong Nha cave with stalactites", fr: "Intérieur de la grotte de Phong Nha avec stalactites" },
      mapsUrl: "https://maps.app.goo.gl/dRGCsBaCFu9X1xrx8",
    },
    {
      name: "Phu Quoc",
      region: { en: "Kien Giang, South", fr: "Kien Giang, Sud" },
      description: {
        en: "Vietnam's largest island, off the south coast in the Gulf of Thailand. White-sand beaches, fish-sauce factories (Phu Quoc nuoc mam is the premium grade), the Vinpearl resort empire on the north tip. Best November–April. Skip if you have only 10 days; great for a final wind-down.",
        fr: "La plus grande île du Vietnam, au large du sud dans le golfe de Thaïlande. Plages de sable blanc, usines de nuoc mam (le Phu Quoc est la qualité premium), l'empire Vinpearl sur la pointe nord. Idéal de novembre à avril. À éviter si vous n'avez que 10 jours ; super pour terminer en mode décompression.",
      },
      image: "/travel-guides/vietnam/phu-quoc.jpg",
      imageAlt: { en: "Tropical beach with palm trees on Phu Quoc island", fr: "Plage tropicale avec cocotiers à Phu Quoc" },
      mapsUrl: "https://maps.app.goo.gl/u4iLqXJpaC4j2c8e7",
    },
    {
      name: "Golden Bridge (Cau Vang)",
      region: { en: "Da Nang", fr: "Đà Nẵng" },
      description: {
        en: "The 150-metre pedestrian bridge held up by two giant stone hands, at the Ba Na Hills resort outside Da Nang. Built in 2018, instant Instagram star. The cable car ride up is the longest in Asia (5km). Touristy, photogenic, worth the half-day from Da Nang or Hoi An.",
        fr: "Pont piéton de 150 m soutenu par deux mains de pierre géantes, au Ba Na Hills resort à l'extérieur de Đà Nẵng. Construit en 2018, star Instagram instantanée. Le téléphérique pour y monter est le plus long d'Asie (5 km). Touristique, photogénique, vaut la demi-journée depuis Đà Nẵng ou Hoi An.",
      },
      image: "/travel-guides/vietnam/golden-bridge.jpg",
      imageAlt: { en: "Golden Bridge held up by giant stone hands at Ba Na Hills", fr: "Pont d'or soutenu par des mains de pierre géantes à Ba Na Hills" },
      mapsUrl: "https://maps.app.goo.gl/zsKx5jKD2nrtgrJa6",
    },
    {
      name: "My Son sanctuary",
      region: { en: "Quang Nam, Centre", fr: "Quang Nam, Centre" },
      description: {
        en: "Hindu Cham temple ruins from 4th–14th century, 40km from Hoi An. UNESCO, ruined by American bombing in the war but still atmospheric — red-brick towers in jungle. Best at sunrise (open 6am) before the tour buses arrive at 9.",
        fr: "Ruines de temples hindous chams du IVe au XIVe siècle, à 40 km de Hoi An. UNESCO, abîmées par les bombardements américains pendant la guerre, mais encore envoûtantes — tours en brique rouge dans la jungle. Idéal au lever du soleil (ouverture à 6h) avant l'arrivée des bus à 9h.",
      },
      image: "/travel-guides/vietnam/my-son.jpg",
      imageAlt: { en: "Ancient red-brick Cham towers at My Son sanctuary", fr: "Anciennes tours cham en brique rouge au sanctuaire de Mỹ Sơn" },
      mapsUrl: "https://maps.app.goo.gl/zsKHpgEjBJZ2NfcM8",
    },
  ],
  specialties: [
    {
      name: { en: "Pho", fr: "Pho" },
      category: "food",
      description: {
        en: "The national dish. Beef or chicken broth simmered 8+ hours with star anise and cinnamon, flat rice noodles, fresh herbs piled on top (basil, cilantro, lime, chili). Best in the north (pho bac is the original — clearer, less sweet). 30,000–60,000 VND (€1.20–2.50) at any street stall.",
        fr: "Le plat national. Bouillon de bœuf ou poulet mijoté 8h+ avec anis étoilé et cannelle, nouilles de riz plates, herbes fraîches en montagne (basilic, coriandre, citron vert, piment). Meilleur dans le nord (pho bac est l'original — plus clair, moins sucré). 30 000-60 000 VND (1,20-2,50 €) dans n'importe quel stand de rue.",
      },
      image: "/travel-guides/vietnam/pho.jpg",
      imageAlt: { en: "Bowl of Vietnamese pho with beef and herbs", fr: "Bol de pho vietnamien au bœuf et aux herbes" },
    },
    {
      name: { en: "Banh mi", fr: "Bánh mì" },
      category: "food",
      description: {
        en: "The colonial French baguette adopted, lightened, and stuffed: pâté + cold cuts or grilled meat + pickled daikon and carrot + cucumber + cilantro + chili + Maggi sauce. Saigon's Banh Mi Huynh Hoa is the holy grail (€2). Hoi An's Banh Mi Phuong was Bourdain's pick. Either is a religious experience.",
        fr: "La baguette française coloniale adoptée, allégée, fourrée : pâté + charcuterie ou viande grillée + radis blanc et carotte au vinaigre + concombre + coriandre + piment + sauce Maggi. Banh Mi Huynh Hoa à Saigon est le Saint-Graal (2 €). Banh Mi Phuong à Hoi An était le choix de Bourdain. L'un ou l'autre, c'est une expérience religieuse.",
      },
      image: "/travel-guides/vietnam/banh-mi.jpg",
      imageAlt: { en: "Vietnamese banh mi sandwich filled with grilled meat and herbs", fr: "Bánh mì vietnamien garni de viande grillée et d'herbes" },
    },
    {
      name: { en: "Fresh spring rolls", fr: "Rouleaux de printemps frais" },
      category: "food",
      description: {
        en: "Goi cuon — rice paper rolls with shrimp, pork, vermicelli, lettuce, mint — eaten cold, dipped in peanut sauce. Distinct from the fried cha gio (egg-roll style). The cheapest, lightest, freshest €1.50 meal on earth.",
        fr: "Goi cuon — feuilles de riz roulées avec crevettes, porc, vermicelles, salade, menthe — mangées froides, trempées dans une sauce cacahuète. À ne pas confondre avec les cha gio frits. Le repas le moins cher, le plus léger, le plus frais à 1,50 € sur Terre.",
      },
      image: "/travel-guides/vietnam/spring-rolls.jpg",
      imageAlt: { en: "Vietnamese fresh spring rolls with peanut dipping sauce", fr: "Rouleaux de printemps vietnamiens avec sauce cacahuète" },
    },
    {
      name: { en: "Bun cha & noodle bowls", fr: "Bún chả & bols de nouilles" },
      category: "food",
      description: {
        en: "Bun cha is Hanoi's signature — grilled pork patties + cold rice vermicelli + dipping broth with carrots and herbs. Cao lau is Hoi An's (noodles served only there, made with water from a specific well). Mi quang is Da Nang's. Every region has its own.",
        fr: "Le bún chả est la spécialité de Hanoï — boulettes de porc grillées + vermicelles de riz froids + bouillon trempette aux carottes et herbes. Le cao lau est de Hoi An (nouilles servies uniquement là, faites avec l'eau d'un puits précis). Le mì quảng vient de Đà Nẵng. Chaque région a la sienne.",
      },
      image: "/travel-guides/vietnam/bun-cha.jpg",
      imageAlt: { en: "Bowl of Vietnamese bun cha with grilled pork", fr: "Bol de bún chả vietnamien avec porc grillé" },
    },
    {
      name: { en: "Vietnamese coffee", fr: "Café vietnamien" },
      category: "drink",
      description: {
        en: "World's second-largest coffee producer (robusta). Cà phê sữa đá: dark drip-coffee + condensed milk + ice = jet fuel. Egg coffee (Hanoi): cà phê + whipped egg yolk + sugar = liquid tiramisu. Coconut coffee (Saigon): cà phê + coconut milk + ice. The whole country runs on it.",
        fr: "Deuxième producteur mondial de café (robusta). Cà phê sữa đá : café filtre fort + lait concentré + glace = kérosène. Café à l'œuf (Hanoï) : cà phê + jaune d'œuf fouetté + sucre = tiramisu liquide. Café à la noix de coco (Saigon) : cà phê + lait de coco + glace. Tout le pays carbure à ça.",
      },
      image: "/travel-guides/vietnam/coffee.jpg",
      imageAlt: { en: "Vietnamese iced coffee in a glass", fr: "Café glacé vietnamien dans un verre" },
    },
    {
      name: { en: "Motorbike culture", fr: "Culture des deux-roues" },
      category: "experience",
      description: {
        en: "45 million scooters for 100 million people. Crossing Saigon traffic on foot is a Zen exercise — walk steady, don't stop, don't run; the bikes flow around you. For more, rent one (€8/day) and do the Hai Van Pass between Da Nang and Hue, or the Ha Giang loop in the far north (4 days).",
        fr: "45 millions de scooters pour 100 millions d'habitants. Traverser le trafic de Saigon à pied est un exercice zen — marchez régulier, ne vous arrêtez pas, ne courez pas ; les motos s'écoulent autour de vous. Pour plus, louez-en un (8 €/jour) et faites le col de Hai Van entre Đà Nẵng et Hué, ou la boucle Ha Giang au nord profond (4 jours).",
      },
      image: "/travel-guides/vietnam/motorbike.jpg",
      imageAlt: { en: "Dense Vietnamese motorbike traffic in a city street", fr: "Trafic dense de scooters vietnamiens dans une rue" },
    },
    {
      name: { en: "Ao dai & silk", fr: "Áo dài & soie" },
      category: "craft",
      description: {
        en: "The áo dài is the silk tunic-and-pants worn over silk trousers — Vietnam's national dress, formal but not fussy. Hoi An is the tailoring capital: 200+ shops will custom-make one in 24 hours (€60–150 for silk; €100–250 for a suit). Yaly, BeBe, A Dong are the higher-end picks.",
        fr: "L'áo dài est la tunique en soie portée par-dessus un pantalon en soie — le costume national vietnamien, élégant sans être contraignant. Hoi An est la capitale de la couture : 200+ boutiques en font un sur mesure en 24h (60-150 € pour la soie ; 100-250 € pour un costume). Yaly, BeBe, A Dong sont les références.",
      },
      image: "/travel-guides/vietnam/ao-dai.jpg",
      imageAlt: { en: "Vietnamese woman in traditional ao dai with conical hat", fr: "Vietnamienne en áo dài traditionnel avec chapeau conique" },
    },
  ],
  regions: [
    {
      name: { en: "North (Hanoi, Halong, Sapa)", fr: "Nord (Hanoï, Halong, Sapa)" },
      highlights: { en: "Hanoi, Halong Bay, Sapa, Ninh Binh, Ha Giang loop", fr: "Hanoï, baie d'Halong, Sapa, Ninh Binh, boucle Ha Giang" },
      description: {
        en: "Most flights from Europe and Asia land at Hanoi (HAN) or Saigon (SGN). The north has four real seasons — autumn (Oct–Nov) is the prettiest. Halong, Sapa, and Ninh Binh are all within 2–6 hours by bus or train from Hanoi.",
        fr: "La plupart des vols depuis l'Europe et l'Asie atterrissent à Hanoï (HAN) ou Saigon (SGN). Le nord a quatre vraies saisons — l'automne (oct.-nov.) est la plus belle. Halong, Sapa et Ninh Binh sont tous à 2-6h de bus ou train de Hanoï.",
      },
    },
    {
      name: { en: "Centre (Hoi An, Hue, Da Nang)", fr: "Centre (Hoi An, Hué, Đà Nẵng)" },
      highlights: { en: "Hoi An, Hue, Da Nang, Phong Nha", fr: "Hoi An, Hué, Đà Nẵng, Phong Nha" },
      description: {
        en: "The country's tightest tourist zone — Hoi An (lanterns + tailoring), Hue (imperial), Da Nang (beach + bridges + airport), Phong Nha (caves). Fly into Da Nang (DAD) for direct access. April–August is the dry window; September–November can flood.",
        fr: "La zone touristique la plus dense du pays — Hoi An (lanternes + couture), Hué (impérial), Đà Nẵng (plage + ponts + aéroport), Phong Nha (grottes). Atterrissez à Đà Nẵng (DAD) pour un accès direct. Avril-août est la fenêtre sèche ; septembre-novembre peut inonder.",
      },
    },
    {
      name: { en: "South (Saigon, Mekong)", fr: "Sud (Saigon, Mékong)" },
      highlights: { en: "Ho Chi Minh City, Mekong Delta, Cu Chi tunnels, Vung Tau", fr: "Hô Chi Minh-Ville, delta du Mékong, tunnels de Cu Chi, Vung Tau" },
      description: {
        en: "Tropical year-round, with a May–September monsoon. Saigon (HCMC) as base. Day trips to Cu Chi tunnels (90 min north) and the Mekong Delta (1–3 days southwest). Cooler in the central highlands (Da Lat) 6 hours northeast.",
        fr: "Tropical toute l'année, avec une mousson de mai à septembre. Saigon (HCMC) comme base. Excursions aux tunnels de Cu Chi (1h30 au nord) et au delta du Mékong (1-3 jours au sud-ouest). Plus frais sur les hauts plateaux du centre (Đà Lạt) à 6h au nord-est.",
      },
    },
    {
      name: { en: "Central highlands", fr: "Hauts plateaux du centre" },
      highlights: { en: "Da Lat, Kontum, Pleiku, coffee plantations", fr: "Đà Lạt, Kontum, Pleiku, plantations de café" },
      description: {
        en: "Cooler, mountainous, the source of most of Vietnam's coffee. Da Lat is a French-built hill station with pine forests and waterfalls. Off the standard tourist circuit — best for a second trip or a slow extension.",
        fr: "Plus frais, montagneux, l'origine du café vietnamien. Đà Lạt est une station de montagne construite par les Français, avec forêts de pins et cascades. Hors du circuit touristique standard — idéal pour une deuxième visite ou une extension lente.",
      },
    },
    {
      name: { en: "Phu Quoc & islands", fr: "Phu Quoc & îles" },
      highlights: { en: "Phu Quoc, Con Dao, Nam Du", fr: "Phu Quoc, Con Dao, Nam Du" },
      description: {
        en: "Phu Quoc is the biggest and easiest (direct flights, resorts, beaches). Con Dao is the off-the-radar one — former prison island, now a marine reserve. Best November–April; closed-feeling May–October.",
        fr: "Phu Quoc est la plus grande et la plus accessible (vols directs, resorts, plages). Con Dao est l'option hors radar — ancienne île-prison, devenue réserve marine. Idéal de novembre à avril ; ambiance morte de mai à octobre.",
      },
    },
    {
      name: { en: "Far north (Ha Giang loop)", fr: "Nord profond (boucle Ha Giang)" },
      highlights: { en: "Ha Giang, Dong Van karst plateau, Meo Vac", fr: "Ha Giang, plateau karstique de Dong Van, Meo Vac" },
      description: {
        en: "A 350km motorbike loop on the Chinese border — limestone karsts, Hmong markets, hairpin passes. Done in 3–5 days, usually with an Easy Rider (local biker who drives you). Cooler year-round, snow in winter. The Vietnam few tourists ever see.",
        fr: "Une boucle de 350 km en moto le long de la frontière chinoise — karsts calcaires, marchés hmong, virages en épingle. 3 à 5 jours, en général avec un Easy Rider (motard local qui conduit). Plus frais toute l'année, neige en hiver. Le Vietnam que peu de touristes voient.",
      },
    },
  ],
  itineraries: [
    {
      days: 7,
      title: { en: "North highlights — 7 days", fr: "Le nord en 7 jours" },
      summary: {
        en: "Hanoi + Halong + Sapa OR Ninh Binh. Tight but doable if you don't add the south.",
        fr: "Hanoï + Halong + Sapa OU Ninh Binh. Soutenu mais faisable si on n'ajoute pas le sud.",
      },
      stops: {
        en: ["Day 1–2: Hanoi (Old Quarter, egg coffee, bun cha)", "Day 3–4: Halong Bay overnight cruise", "Day 5–7: Sapa OR Ninh Binh (trekking or boats), back to Hanoi"],
        fr: ["Jour 1-2 : Hanoï (vieux quartier, café à l'œuf, bún chả)", "Jour 3-4 : croisière nuit à Halong", "Jour 5-7 : Sapa OU Ninh Binh (trek ou bateaux), retour Hanoï"],
      },
    },
    {
      days: 14,
      title: { en: "Full Vietnam top-to-bottom — 14 days", fr: "Vietnam nord-sud — 14 jours" },
      summary: {
        en: "Two internal flights (HAN → DAD, DAD → SGN). The canonical first-trip itinerary.",
        fr: "Deux vols intérieurs (HAN → DAD, DAD → SGN). L'itinéraire canonique pour une première fois.",
      },
      stops: {
        en: [
          "Day 1–2: Hanoi",
          "Day 3–4: Halong Bay overnight cruise",
          "Day 5–6: Ninh Binh",
          "Day 7: Fly Hanoi → Da Nang",
          "Day 8–10: Hoi An (lanterns, tailor, beach, cooking class)",
          "Day 11: Hue or Golden Bridge day trip",
          "Day 12: Fly Da Nang → Saigon",
          "Day 13: Saigon + Cu Chi tunnels",
          "Day 14: Mekong Delta day trip, fly home from SGN",
        ],
        fr: [
          "Jour 1-2 : Hanoï",
          "Jour 3-4 : croisière nuit à Halong",
          "Jour 5-6 : Ninh Binh",
          "Jour 7 : vol Hanoï → Đà Nẵng",
          "Jour 8-10 : Hoi An (lanternes, couturier, plage, cours de cuisine)",
          "Jour 11 : Hué ou Pont d'or en journée",
          "Jour 12 : vol Đà Nẵng → Saigon",
          "Jour 13 : Saigon + tunnels de Cu Chi",
          "Jour 14 : Mékong en journée, vol retour depuis SGN",
        ],
      },
    },
    {
      days: 21,
      title: { en: "Vietnam deep — 21 days", fr: "Vietnam à fond — 21 jours" },
      summary: {
        en: "Add Sapa, Phong Nha, and Phu Quoc to the 14-day frame. Three weeks is the right format for the country.",
        fr: "Ajoute Sapa, Phong Nha et Phu Quoc au cadre 14 jours. Trois semaines, c'est le bon format.",
      },
      stops: {
        en: [
          "Day 1–3: Hanoi + day trip",
          "Day 4–5: Sapa (overnight train from Hanoi, trekking)",
          "Day 6–7: Halong Bay cruise",
          "Day 8–9: Ninh Binh",
          "Day 10–11: Phong Nha (caves)",
          "Day 12–14: Hoi An + Hue",
          "Day 15–16: Saigon",
          "Day 17: Mekong Delta",
          "Day 18–21: Phu Quoc",
        ],
        fr: [
          "Jour 1-3 : Hanoï + une excursion",
          "Jour 4-5 : Sapa (train de nuit depuis Hanoï, trek)",
          "Jour 6-7 : croisière Halong",
          "Jour 8-9 : Ninh Binh",
          "Jour 10-11 : Phong Nha (grottes)",
          "Jour 12-14 : Hoi An + Hué",
          "Jour 15-16 : Saigon",
          "Jour 17 : delta du Mékong",
          "Jour 18-21 : Phu Quoc",
        ],
      },
    },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      {
        label: { en: "Backpacker", fr: "Routard" },
        perDay: 30,
        description: {
          en: "Hostel dorm or basic hotel (€8), street food (€8), local buses + Grab bike (€5), one paid activity (€9). Vietnam on a backpacker budget is one of Asia's biggest bargains — pho for €2, hotels for €8.",
          fr: "Dortoir d'auberge ou hôtel simple (8 €), street food (8 €), bus locaux + Grab à moto (5 €), une activité payante (9 €). Le Vietnam petit budget est l'un des meilleurs deals d'Asie — pho à 2 €, hôtels à 8 €.",
        },
      },
      {
        label: { en: "Mid-range", fr: "Moyen" },
        perDay: 80,
        description: {
          en: "Boutique hotel or 4-star (€45), one sit-down dinner + casual meals (€20), domestic flights averaged + Grab (€10), entries + activities (€5). The right tier — Vietnam mid-range is what European budget would be.",
          fr: "Hôtel de charme ou 4 étoiles (45 €), un dîner attablé + repas décontractés (20 €), vols intérieurs lissés + Grab (10 €), entrées + activités (5 €). Le bon équilibre — le moyen-de-gamme vietnamien équivaut au budget européen.",
        },
      },
      {
        label: { en: "Comfortable", fr: "Confortable" },
        perDay: 200,
        description: {
          en: "Resort or luxury heritage hotel (€130), one fine-dining dinner (€50), private driver + business-class domestic (€15), guide / private boat (€5). Honeymoon and resort-trip tier.",
          fr: "Resort ou hôtel patrimonial de luxe (130 €), un dîner gastronomique (50 €), chauffeur privé + classe affaires interne (15 €), guide / bateau privé (5 €). Tier lune de miel et resort.",
        },
      },
    ],
    note: {
      en: "Per person, excluding international flights. The dong (VND) has many zeros (24,000+ to €1) — easy to miscount. ATMs everywhere; cards work in cities, cash for street food and rural areas. Vietjet and Bamboo Airways internal flights run €25–70 booked 2–4 weeks ahead.",
      fr: "Par personne, hors vol international. Le dong (VND) a beaucoup de zéros (24 000+ pour 1 €) — facile de se planter. DAB partout ; carte en ville, cash pour la street food et la campagne. Vols Vietjet et Bamboo Airways en interne : 25-70 € réservés 2 à 4 semaines à l'avance.",
    },
  },
  tips: [
    { do: true, text: { en: "Get the e-visa online 3–5 days before your trip at evisa.xuatnhapcanh.gov.vn. About US$25; e-visas are now 90 days, single or multi-entry. The visa-on-arrival scheme still exists but is slower and only saves you a few dollars.", fr: "Demandez l'e-visa en ligne 3 à 5 jours avant le voyage sur evisa.xuatnhapcanh.gov.vn. ~25 US$ ; l'e-visa est désormais valable 90 jours, simple ou multiple entrée. Le visa à l'arrivée existe encore mais est plus lent et économise à peine quelques dollars." } },
    { do: true, text: { en: "Get a SIM card on arrival (Viettel or Mobifone, 100,000–200,000 VND for 30 days unlimited). Grab (the regional Uber) needs a working number to verify; it's the only way to move around cities reliably.", fr: "Prenez une SIM à l'arrivée (Viettel ou Mobifone, 100 000-200 000 VND pour 30 jours illimités). Grab (l'Uber local) demande un numéro qui marche pour vérifier ; c'est le seul moyen fiable de bouger en ville." } },
    { do: true, text: { en: "Walk slowly across Saigon and Hanoi traffic. Don't stop, don't run, don't change pace. The bikes are looking for your trajectory and will go around you. Hesitating is what gets people hit.", fr: "Marchez lentement dans le trafic de Saigon et Hanoï. Ne vous arrêtez pas, ne courez pas, ne changez pas de rythme. Les motos cherchent votre trajectoire et se séparent autour. C'est l'hésitation qui fait les accidents." } },
    { do: false, text: { en: "Don't take a metered taxi without explicitly using Vinasun or Mai Linh in the south, or G7 / Taxi Group in the north. Other 'metered' cars run rigged meters. Grab is safer end-to-end — fixed price, no haggling, no rip-offs.", fr: "Ne prenez pas de taxi au compteur sans demander explicitement Vinasun ou Mai Linh au sud, ou G7 / Taxi Group au nord. Les autres « compteurs » sont trafiqués. Grab est sûr de bout en bout — prix fixe, pas de marchandage, pas d'arnaque." } },
    { do: true, text: { en: "Carry cash. Street food, small hotels, taxis, and rural Vietnam are all cash-only. ATMs are everywhere in cities but charge 30,000–55,000 VND per withdrawal — take out the max (3M VND) at once.", fr: "Ayez du cash. La street food, les petits hôtels, les taxis, et tout le Vietnam rural fonctionnent au cash. DAB partout en ville mais 30 000-55 000 VND par retrait — sortez le max (3 M VND) à chaque fois." } },
    { do: false, text: { en: "Don't drink tap water. Bottled water is 5,000–10,000 VND a bottle everywhere. Ice in proper restaurants is safe (commercial machines); street-stall ice is questionable in rural areas.", fr: "Ne buvez pas l'eau du robinet. L'eau en bouteille coûte 5 000-10 000 VND partout. Les glaçons des restos corrects sont sûrs (machines commerciales) ; ceux des stands ruraux le sont moins." } },
    { do: true, text: { en: "Eat where the plastic stools are full. Empty street-stalls are empty for a reason. Vietnamese street food is one of the world's safest — hot, just-cooked, turnover is high.", fr: "Mangez là où les tabourets en plastique sont pleins. Un stand vide l'est pour une raison. La street food vietnamienne est une des plus sûres du monde — chaude, fraîchement cuite, rotation rapide." } },
    { do: false, text: { en: "Don't book a Halong Bay day trip. It's the most rushed, least scenic version of the experience. Overnight cruises (€80–200/person) include meals, kayaking, cave visits, sunset and sunrise on the water. The day trip is regret.", fr: "Ne réservez pas une journée à Halong. C'est la version la plus rushée et la moins belle. Les croisières de nuit (80-200 €/pers.) incluent repas, kayak, visites de grottes, lever et coucher de soleil sur l'eau. La journée, c'est du regret." } },
  ],
  related: ["thailand", "japan"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 9. Mexico
// ---------------------------------------------------------------------------
const mexico: CountryGuide = {
  slug: { en: "mexico", fr: "mexique" },
  country: { en: "Mexico", fr: "Mexique" },
  continent: "north-america",
  hero: {
    image: "/travel-guides/mexico/hero.jpg",
    imageAlt: { en: "El Castillo pyramid at Chichen Itza", fr: "Pyramide El Castillo à Chichen Itza" },
    tag: { en: "Country guide · North America", fr: "Guide pays · Amérique du Nord" },
  },
  meta: {
    title: {
      en: "Mexico Travel Guide 2026 — Where to Go, Eat & How to Plan",
      fr: "Guide voyage Mexique 2026 — Que voir, manger, comment partir",
    },
    description: {
      en: "Real Mexico travel guide for 2026: best season, Mexico City to Yucatan, regional food, honest budgets, cultural do's and don'ts. First and repeat trips.",
      fr: "Guide voyage Mexique 2026, sans bla-bla : meilleure saison, Mexico à Yucatan, cuisine par région, budget honnête, codes culturels. 1re fois ou habitués.",
    },
  },
  intro: {
    en: [
      "Mexico is dozens of countries pretending to be one. The Yucatán is Caribbean and ruined-Mayan. Mexico City (CDMX) is sophisticated, food-obsessed, and the largest Spanish-speaking city in the world. Oaxaca is mountains, mole, and mezcal. The Pacific coast is surf and fishing villages. Half the world treats it as a beach resort; the country itself is a thousand times bigger than that.",
      "First trip: Mexico City (3–4 days) + Oaxaca (3 days) + Yucatán (Mérida + Tulum + Chichén Itzá, 4–5 days). Second trip: the colonial Bajío (San Miguel de Allende, Guanajuato, Querétaro), the Pacific coast (Puerto Escondido, Oaxaca coast), or Baja California. Skip Cancun's hotel zone unless you want all-inclusive — the real Yucatán starts five minutes inland.",
      "Two things to know. Mexico City is at 2,240m — altitude affects you for the first 2 days (slow alcohol, lots of water). And news of cartel violence is region-specific: tourist routes are very safe; the violence is concentrated in border states, mining towns, and parts of Sinaloa/Guerrero — places not on any normal itinerary. Check the US State Department map by state, not by country.",
    ],
    fr: [
      "Le Mexique, c'est des dizaines de pays qui prétendent être un seul. Le Yucatán est caribéen et ruiné-maya. Mexico (CDMX) est sophistiquée, obsédée par la cuisine, et la plus grande ville hispanophone du monde. Oaxaca, ce sont les montagnes, le mole et le mezcal. La côte Pacifique, c'est le surf et les villages de pêcheurs. La moitié du monde le voit comme un resort de plage ; le pays lui-même est mille fois plus grand que ça.",
      "Première fois : Mexico (3-4 jours) + Oaxaca (3 jours) + Yucatán (Mérida + Tulum + Chichén Itzá, 4-5 jours). Deuxième fois : le Bajío colonial (San Miguel de Allende, Guanajuato, Querétaro), la côte Pacifique (Puerto Escondido, côte d'Oaxaca), ou la Basse-Californie. Évitez la zone hôtelière de Cancún sauf pour le all-inclusive — le vrai Yucatán commence cinq minutes à l'intérieur des terres.",
      "Deux trucs à savoir. Mexico se trouve à 2 240 m — l'altitude se fait sentir les 2 premiers jours (alcool ralenti, beaucoup d'eau). Et les nouvelles de violence des cartels sont régionales : les routes touristiques sont très sûres ; la violence est concentrée dans les États frontaliers, les villes minières et certaines parties du Sinaloa/Guerrero — des zones absentes de tout itinéraire normal. Consultez la carte du State Department par État, pas par pays.",
    ],
  },
  quickFacts: {
    capital: { en: "Mexico City (CDMX)", fr: "Mexico (CDMX)" },
    language: { en: "Spanish · 68 indigenous languages", fr: "Espagnol · 68 langues indigènes" },
    currency: { code: "MXN", symbol: "$" },
    timezone: "CST (UTC-6) · most of country",
    visa: {
      en: "Visa-free up to 180 days for EU, UK, US, Canada, Australia passports. Tourist card (FMM) issued on arrival.",
      fr: "Sans visa jusqu'à 180 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie. Carte touristique (FMM) délivrée à l'arrivée.",
    },
    plug: "Type A / B · 127V",
    driveSide: "right",
    population: "~129M",
  },
  bestSeason: {
    best: {
      months: { en: "November – April", fr: "Novembre – avril" },
      description: {
        en: "Dry season. Cool nights at altitude (CDMX, Oaxaca, San Miguel), warm sunny days. Yucatán is perfect — 25–28°C, low humidity. Whale watching in Baja Jan–March. Day of the Dead (Oct 31 – Nov 2) is the high point of the cultural year — book months ahead.",
        fr: "Saison sèche. Nuits fraîches en altitude (CDMX, Oaxaca, San Miguel), journées chaudes et ensoleillées. Le Yucatán est parfait — 25-28°C, peu d'humidité. Observation des baleines en Basse-Californie de janvier à mars. Día de los Muertos (31 oct. – 2 nov.) est le grand temps culturel — à réserver des mois à l'avance.",
      },
    },
    shoulder: {
      months: { en: "May · October", fr: "Mai · octobre" },
      description: {
        en: "May: hot in the south (35°C), still dry, lower prices. October: end of rainy season, lush and green, very few tourists before Day of the Dead. Both are sweet spots if you can time them.",
        fr: "Mai : chaud au sud (35°C), encore sec, prix plus bas. Octobre : fin de saison des pluies, luxuriant et vert, très peu de touristes avant Día de los Muertos. Les deux sont des fenêtres idéales si vous savez les saisir.",
      },
    },
    avoid: {
      months: { en: "June – September", fr: "Juin – septembre" },
      description: {
        en: "Hurricane season on both coasts (Yucatán especially in August–September). Daily afternoon downpours, humidity peaks. Inland (CDMX, Oaxaca, San Miguel) stays mild because of altitude but afternoon storms are constant. Sargassum seaweed peaks May–August on Yucatán beaches.",
        fr: "Saison des ouragans sur les deux côtes (Yucatán surtout août-septembre). Averses quotidiennes l'après-midi, humidité au max. L'intérieur (CDMX, Oaxaca, San Miguel) reste doux grâce à l'altitude mais les orages d'après-midi sont constants. La sargasse pollue les plages du Yucatán surtout de mai à août.",
      },
    },
  },
  mustSee: [
    {
      name: "Chichén Itzá",
      region: { en: "Yucatán", fr: "Yucatán" },
      description: {
        en: "The most famous Mayan site — El Castillo pyramid, the Great Ball Court, the Sacred Cenote. 2-hour drive from Mérida or Tulum. Arrive at 8am opening to beat the cruise-ship crowds; combine with a cenote swim on the way back.",
        fr: "Le site maya le plus célèbre — la pyramide d'El Castillo, le grand Jeu de balle, le cénote sacré. À 2h de route de Mérida ou Tulum. Arrivez à l'ouverture (8h) pour devancer les groupes de croisières ; combinez avec un cénote au retour.",
      },
      image: "/travel-guides/mexico/chichen-itza.jpg",
      imageAlt: { en: "El Castillo pyramid at Chichén Itzá", fr: "Pyramide El Castillo à Chichén Itzá" },
      mapsUrl: "https://maps.app.goo.gl/UYZWXLnZpJghLwz58",
    },
    {
      name: "Tulum",
      region: { en: "Quintana Roo, Yucatán", fr: "Quintana Roo, Yucatán" },
      description: {
        en: "Mayan ruins on a cliff above the Caribbean — the only major coastal Mayan site. The town itself has become a fashionable yoga-and-cenote scene with €15 smoothie bowls. Go for sunrise at the ruins, leave by lunch.",
        fr: "Ruines mayas sur une falaise au-dessus des Caraïbes — le seul grand site maya côtier. La ville est devenue un truc à la mode yoga-cénotes avec des smoothie bowls à 15 €. Allez aux ruines au lever du soleil, repartez avant midi.",
      },
      image: "/travel-guides/mexico/tulum.jpg",
      imageAlt: { en: "Tulum Mayan ruins overlooking the Caribbean", fr: "Ruines mayas de Tulum surplombant la mer des Caraïbes" },
      mapsUrl: "https://maps.app.goo.gl/sQGWLEMJfBjxPKEN8",
    },
    {
      name: "Cenotes of Yucatán",
      region: { en: "Yucatán", fr: "Yucatán" },
      description: {
        en: "Freshwater sinkholes — natural pools in jungle caves. Cenote Ik Kil (near Chichén), Gran Cenote (Tulum), Cenote Suytun for the iconic light beam. Rent a car and chain 3–4 in a day; entry €5–15 each.",
        fr: "Cénotes d'eau douce — piscines naturelles dans des grottes de jungle. Cenote Ik Kil (près de Chichén), Gran Cenote (Tulum), Cenote Suytun pour le fameux rayon de lumière. Louez une voiture et enchaînez-en 3-4 dans la journée ; entrée 5-15 € chacun.",
      },
      image: "/travel-guides/mexico/cenotes.jpg",
      imageAlt: { en: "Light beam in a Yucatán cenote", fr: "Rayon de lumière dans un cénote du Yucatán" },
      mapsUrl: "https://maps.app.goo.gl/U9bk7CmZ3xPyVDJM6",
    },
    {
      name: "Mexico City — Zócalo & Centro",
      region: { en: "Mexico City (CDMX)", fr: "Mexico (CDMX)" },
      description: {
        en: "The historic centre — Catedral Metropolitana, Templo Mayor Aztec ruins right next to it, Palacio Nacional with the Diego Rivera murals (free). Walk to Madero and Bellas Artes. Allow a full day.",
        fr: "Le centre historique — Catedral Metropolitana, ruines aztèques du Templo Mayor juste à côté, Palacio Nacional avec les fresques de Diego Rivera (gratuit). Continuez vers Madero et Bellas Artes. Comptez une journée pleine.",
      },
      image: "/travel-guides/mexico/cdmx-zocalo.jpg",
      imageAlt: { en: "Mexico City Cathedral on the Zócalo at sunset", fr: "Cathédrale de Mexico sur le Zócalo au coucher du soleil" },
      mapsUrl: "https://maps.app.goo.gl/oNHKfECTHzqGAa4n6",
    },
    {
      name: "Teotihuacán pyramids",
      region: { en: "Estado de México", fr: "État de Mexico" },
      description: {
        en: "Pre-Aztec city 50km north of CDMX — built 100 BCE to 250 CE, abandoned 600 years before the Aztecs arrived. Climb the Pyramid of the Sun (216 steps, 65m). Hot-air-balloon flights at sunrise: €100–150, the photo of the trip.",
        fr: "Cité préaztèque à 50 km au nord de Mexico — bâtie de 100 av. J.-C. à 250 apr. J.-C., abandonnée 600 ans avant l'arrivée des Aztèques. Grimpez la Pyramide du Soleil (216 marches, 65 m). Vol en montgolfière au lever du soleil : 100-150 €, la photo du voyage.",
      },
      image: "/travel-guides/mexico/teotihuacan.jpg",
      imageAlt: { en: "Pyramid of the Sun at Teotihuacán", fr: "Pyramide du Soleil à Teotihuacán" },
      mapsUrl: "https://maps.app.goo.gl/r2BTcQfgJk8KhqAY8",
    },
    {
      name: "Oaxaca city",
      region: { en: "Oaxaca", fr: "Oaxaca" },
      description: {
        en: "The food capital of Mexico. UNESCO old town, the Mercado 20 de Noviembre's grilled-meat aisle, mole tasting at any restaurant, mezcal palenques nearby. Combine with Monte Albán (Zapotec ruins on a hilltop, 20 min) and Hierve el Agua (petrified waterfalls, 1.5hr drive).",
        fr: "La capitale gastronomique du pays. Vieux centre UNESCO, le couloir des grillades du Mercado 20 de Noviembre, dégustation de mole dans n'importe quel resto, palenques de mezcal à proximité. Combinez avec Monte Albán (ruines zapotèques sur un sommet, 20 min) et Hierve el Agua (cascades pétrifiées, 1h30 de route).",
      },
      image: "/travel-guides/mexico/oaxaca.jpg",
      imageAlt: { en: "Colorful colonial buildings in Oaxaca city", fr: "Bâtiments coloniaux colorés à Oaxaca" },
      mapsUrl: "https://maps.app.goo.gl/PWxnQiNAr5xqDuDp8",
    },
    {
      name: "Guanajuato",
      region: { en: "Guanajuato", fr: "Guanajuato" },
      description: {
        en: "A silver-mining city built into a ravine — pastel buildings stacked on top of each other, tunnels for cars under the streets. Diego Rivera's birthplace (small museum). The Callejón del Beso ('alley of the kiss' — narrow enough to kiss from facing balconies). UNESCO, underrated.",
        fr: "Une ville minière d'argent construite dans un ravin — bâtiments pastel empilés, tunnels pour voitures sous les rues. Lieu de naissance de Diego Rivera (petit musée). Le Callejón del Beso (« ruelle du baiser » — assez étroite pour s'embrasser de balcon à balcon). UNESCO, sous-coté.",
      },
      image: "/travel-guides/mexico/guanajuato.jpg",
      imageAlt: { en: "Colorful houses stacked in the ravine of Guanajuato", fr: "Maisons colorées empilées dans le ravin de Guanajuato" },
      mapsUrl: "https://maps.app.goo.gl/h7tWvD3Tc1bk9HBz6",
    },
    {
      name: "San Miguel de Allende",
      region: { en: "Guanajuato", fr: "Guanajuato" },
      description: {
        en: "Cobblestoned UNESCO colonial town, popular with American expats but still beautiful. The pink-stone Parroquia is the postcard. Hot air balloons at sunrise, mezcal bars in the evening. 1 hour from Guanajuato — pair the two.",
        fr: "Ville coloniale pavée UNESCO, prisée des expats américains mais encore belle. La Parroquia en pierre rose est la carte postale. Montgolfières au lever du soleil, bars à mezcal le soir. 1h de Guanajuato — associez les deux.",
      },
      image: "/travel-guides/mexico/san-miguel.jpg",
      imageAlt: { en: "Pink Parroquia church in San Miguel de Allende", fr: "Église rose Parroquia à San Miguel de Allende" },
      mapsUrl: "https://maps.app.goo.gl/jY1CGzkxFcwgxukL6",
    },
    {
      name: "Frida Kahlo's Casa Azul & CDMX museums",
      region: { en: "Mexico City", fr: "Mexico" },
      description: {
        en: "Casa Azul in Coyoacán is Frida's family home — book tickets online weeks ahead. Pair with Museo Nacional de Antropología (the world's best pre-Columbian collection), Soumaya (private Carlos Slim museum, free), Diego Rivera murals at Palacio Nacional.",
        fr: "La Casa Azul à Coyoacán est la maison de famille de Frida — réservez les billets en ligne des semaines avant. À combiner avec le Museo Nacional de Antropología (la meilleure collection précolombienne du monde), Soumaya (musée privé de Carlos Slim, gratuit), les fresques de Diego Rivera au Palacio Nacional.",
      },
      image: "/travel-guides/mexico/frida-art.jpg",
      imageAlt: { en: "Frida Kahlo style portrait and Mexican folk art", fr: "Portrait style Frida Kahlo et art populaire mexicain" },
      mapsUrl: "https://maps.app.goo.gl/zCRghQuhWnQjF1eu8",
    },
    {
      name: "Playa del Carmen & Caribbean coast",
      region: { en: "Quintana Roo", fr: "Quintana Roo" },
      description: {
        en: "The Riviera Maya — 130km of white-sand Caribbean beach. Skip Cancún hotel zone for Playa del Carmen (livelier, walkable) or Akumal (turtles snorkeling). Cozumel offshore for diving — Mesoamerican Reef, world's second-largest.",
        fr: "La Riviera Maya — 130 km de plage caraïbe au sable blanc. Évitez la zone hôtelière de Cancún pour Playa del Carmen (plus animée, marchable) ou Akumal (tortues en snorkeling). Cozumel au large pour la plongée — la barrière mésoaméricaine, deuxième du monde.",
      },
      image: "/travel-guides/mexico/playa-del-carmen.jpg",
      imageAlt: { en: "White-sand Caribbean beach in Playa del Carmen", fr: "Plage caraïbe au sable blanc à Playa del Carmen" },
      mapsUrl: "https://maps.app.goo.gl/aXvKqM2sUFTfV44z9",
    },
    {
      name: "Copper Canyon (Barrancas del Cobre)",
      region: { en: "Chihuahua, North", fr: "Chihuahua, Nord" },
      description: {
        en: "Six interconnected canyons four times the size of the Grand Canyon. The Chepe train runs Los Mochis to Chihuahua (16hr) — one of the world's great rail journeys. Stop at Divisadero, hike with Rarámuri guides. Off the beaten path; for a second-trip-or-deeper traveler.",
        fr: "Six canyons interconnectés, quatre fois la taille du Grand Canyon. Le train Chepe relie Los Mochis à Chihuahua (16h) — l'un des grands voyages ferroviaires du monde. Arrêt à Divisadero, randos avec des guides rarámuris. Hors des sentiers ; pour un voyageur de deuxième visite ou de niveau profond.",
      },
      image: "/travel-guides/mexico/copper-canyon.jpg",
      imageAlt: { en: "Copper Canyon viewed from a clifftop in Chihuahua", fr: "Le Cañon du Cuivre vu d'une falaise dans le Chihuahua" },
      mapsUrl: "https://maps.app.goo.gl/MFY8r2Whg2Fcg8mU8",
    },
    {
      name: "Puerto Escondido & Oaxaca coast",
      region: { en: "Oaxaca", fr: "Oaxaca" },
      description: {
        en: "Pacific surf-town that went from secret to busy in the last 5 years. Zicatela beach for the experienced (massive waves), La Punta for surfers, Carrizalillo for swimming. Mazunte and Zipolite further south for the laid-back hippie vibe.",
        fr: "Spot de surf Pacifique passé de secret à très fréquenté ces 5 dernières années. Plage Zicatela pour les confirmés (grosses vagues), La Punta pour les surfeurs, Carrizalillo pour la baignade. Mazunte et Zipolite plus au sud pour l'ambiance hippie tranquille.",
      },
      image: "/travel-guides/mexico/puerto-escondido.jpg",
      imageAlt: { en: "Pacific surf beach at Puerto Escondido", fr: "Plage de surf Pacifique à Puerto Escondido" },
      mapsUrl: "https://maps.app.goo.gl/Y4MsKQ8mCxRZ1Zen8",
    },
  ],
  specialties: [
    { name: { en: "Tacos & street food", fr: "Tacos & street food" }, category: "food",
      description: { en: "Tacos al pastor (marinated pork on a vertical spit + pineapple), tacos de carnitas (slow-braised pork), tacos de pescado (Baja-style battered fish), tacos arabes (Lebanese-influenced). Eat at the busiest taquería on the corner. 15–30 pesos (€0.75–1.50) per taco.", fr: "Tacos al pastor (porc mariné sur broche verticale + ananas), tacos de carnitas (porc confit), tacos de pescado (poisson en beignets style Baja), tacos arabes (influence libanaise). Mangez à la taquería la plus blindée du coin. 15-30 pesos (0,75-1,50 €) par taco." },
      image: "/travel-guides/mexico/tacos.jpg",
      imageAlt: { en: "Street tacos al pastor with pineapple", fr: "Tacos al pastor de rue avec ananas" }
    },
    { name: { en: "Mole & Oaxacan cuisine", fr: "Mole & cuisine d'Oaxaca" }, category: "food",
      description: { en: "Mole is a sauce — Oaxaca alone has seven: negro (chocolate, chiles, 30+ ingredients), rojo, amarillo, verde, manchamantel, chichilo, coloradito. Eaten over chicken or turkey. Tlayudas (giant crispy tortilla with everything), chapulines (toasted grasshoppers), quesillo (Oaxacan string cheese).", fr: "Le mole est une sauce — Oaxaca en a sept à elle seule : negro (chocolat, piments, 30+ ingrédients), rojo, amarillo, verde, manchamantel, chichilo, coloradito. Sur poulet ou dinde. Tlayudas (tortilla géante croustillante avec tout), chapulines (sauterelles grillées), quesillo (mozzarella oaxaqueña filée)." },
      image: "/travel-guides/mexico/mole.jpg",
      imageAlt: { en: "Plate of Mexican mole with chicken", fr: "Assiette de mole mexicain au poulet" }
    },
    { name: { en: "Mezcal & tequila", fr: "Mezcal & tequila" }, category: "drink",
      description: { en: "Tequila is mezcal from blue agave in the Tequila region. Mezcal can be from any of 40+ agave varieties — espadín is the common one, tobalá and madrecuixe are wilder and finer. Drunk neat with orange slices and sal de gusano (worm salt) in Oaxaca. Skip the worm-in-the-bottle stuff — that's marketing.", fr: "La tequila est un mezcal d'agave bleue de la région de Tequila. Le mezcal peut venir de 40+ variétés d'agave — l'espadín est la plus courante, le tobalá et le madrecuixe sont plus sauvages et plus fins. Bu sec avec des tranches d'orange et du sal de gusano (sel au ver) à Oaxaca. Évitez les bouteilles avec un ver dedans — c'est du marketing." },
      image: "/travel-guides/mexico/mezcal.jpg",
      imageAlt: { en: "Mezcal bottle and shot glasses", fr: "Bouteille de mezcal et verres à shot" }
    },
    { name: { en: "Day of the Dead", fr: "Día de los Muertos" }, category: "experience",
      description: { en: "October 31 – November 2. The most important holiday — families build ofrendas (altars) for the dead with marigolds, sugar skulls, photos, the deceased's favorite food. Oaxaca, Pátzcuaro (Janitzio island), Mixquic (Mexico City) host the biggest celebrations. Book accommodation 4–6 months ahead.", fr: "31 octobre – 2 novembre. La fête la plus importante — les familles construisent des ofrendas (autels) pour les morts, avec soucis (cempasúchil), crânes en sucre, photos, plats préférés du défunt. Oaxaca, Pátzcuaro (île de Janitzio), Mixquic (Mexico) accueillent les plus grandes célébrations. Réservez l'hébergement 4 à 6 mois à l'avance." },
      image: "/travel-guides/mexico/day-of-dead.jpg",
      imageAlt: { en: "Day of the Dead altar with marigolds and sugar skulls", fr: "Autel du Día de los Muertos avec soucis et crânes en sucre" }
    },
    { name: { en: "Lucha libre", fr: "Lucha libre" }, category: "experience",
      description: { en: "Mexican wrestling — masked superhero characters, soap-opera storylines, 4-tier ticket prices in pesos. Arena México (CDMX, Tuesday and Friday nights) is the cathedral. Cheap seats (€8) are the right experience; sit close to the action and join the chanting.", fr: "Le catch mexicain — héros masqués, intrigues de telenovela, 4 niveaux de tarif en pesos. L'Arena México (CDMX, mardi et vendredi soir) est la cathédrale. Les places les moins chères (8 €) sont la vraie expérience ; placez-vous près du ring et joignez-vous aux chants." },
      image: "/travel-guides/mexico/lucha-libre.jpg",
      imageAlt: { en: "Lucha libre masked wrestlers in the ring", fr: "Lutteurs masqués de lucha libre sur le ring" }
    },
    { name: { en: "Mariachi", fr: "Mariachi" }, category: "art",
      description: { en: "Originally from Jalisco, now national. Plaza Garibaldi (CDMX) is the open-air mariachi market — hire one for 30 minutes (around €25–35) to play at your table. Tequila town has the Mariachi Museum. The classic song requests: 'Cielito Lindo', 'El Rey', 'México Lindo'.", fr: "Originaire du Jalisco, désormais national. Plaza Garibaldi (CDMX) est le marché ouvert des mariachis — engagez-en un pour 30 minutes (25-35 €) à votre table. La ville de Tequila a son musée du mariachi. Les classiques à demander : « Cielito Lindo », « El Rey », « México Lindo »." },
      image: "/travel-guides/mexico/mariachi.jpg",
      imageAlt: { en: "Mariachi band performing in Mexico", fr: "Groupe de mariachis en concert au Mexique" }
    },
    { name: { en: "Folk art & textiles", fr: "Artisanat & textiles" }, category: "craft",
      description: { en: "Oaxaca for hand-woven wool rugs (Teotitlán del Valle) and alebrijes (carved wooden creatures, San Martín Tilcajete). Michoacán for copper. Yucatán for hammocks and Panama hats. Watch for the 'hecho a mano' (handmade) label — most of what's in Cancún souvenir shops is mass-produced from China.", fr: "Oaxaca pour les tapis de laine tissés à la main (Teotitlán del Valle) et les alebrijes (créatures en bois sculpté, San Martín Tilcajete). Michoacán pour le cuivre. Yucatán pour les hamacs et les chapeaux panama. Cherchez l'étiquette « hecho a mano » (fait main) — la plupart des souvenirs de Cancún viennent de Chine." },
      image: "/travel-guides/mexico/textiles.jpg",
      imageAlt: { en: "Colorful Mexican textiles", fr: "Textiles mexicains colorés" }
    },
  ],
  regions: [
    { name: { en: "Mexico City & Central", fr: "Mexico & Centre" }, highlights: { en: "Mexico City (CDMX), Teotihuacán, Puebla", fr: "Mexico (CDMX), Teotihuacán, Puebla" },
      description: { en: "Most international flights land at AICM (MEX) or AIFA. CDMX as base — Roma Norte and Condesa are the neighborhoods to stay. Day trips: Teotihuacán pyramids (1hr north), Puebla (talavera tiles, 2hr southeast). Use Uber heavily; it's safer and cheaper than taxis.", fr: "La plupart des vols atterrissent à l'AICM (MEX) ou AIFA. CDMX comme base — Roma Norte et Condesa sont les quartiers où dormir. Excursions : pyramides de Teotihuacán (1h au nord), Puebla (azulejos talavera, 2h au sud-est). Utilisez Uber massivement ; plus sûr et moins cher que les taxis." }
    },
    { name: { en: "Yucatán Peninsula", fr: "Péninsule du Yucatán" }, highlights: { en: "Mérida, Tulum, Chichén Itzá, cenotes, Playa del Carmen", fr: "Mérida, Tulum, Chichén Itzá, cénotes, Playa del Carmen" },
      description: { en: "Three states (Yucatán, Quintana Roo, Campeche), one big tourist circuit. Mérida as colonial base, Tulum for the beach version, cenotes everywhere in between. Rent a car — public transport is patchy. Cancún airport (CUN) is the gateway.", fr: "Trois États (Yucatán, Quintana Roo, Campeche), un grand circuit touristique. Mérida comme base coloniale, Tulum pour la version balnéaire, cénotes partout entre les deux. Louez une voiture — les transports publics sont irréguliers. L'aéroport de Cancún (CUN) est la porte d'entrée." }
    },
    { name: { en: "Oaxaca", fr: "Oaxaca" }, highlights: { en: "Oaxaca city, Monte Albán, Hierve el Agua, Pacific coast (Puerto Escondido, Mazunte)", fr: "Oaxaca, Monte Albán, Hierve el Agua, côte Pacifique (Puerto Escondido, Mazunte)" },
      description: { en: "Mexico's most distinct state — 16 indigenous languages, 7 moles, the country's best mezcal. Oaxaca city + the Sierra + the Pacific coast is a state-on-its-own trip (5–7 days). Fly to OAX from CDMX (1hr).", fr: "L'État le plus distinct du pays — 16 langues indigènes, 7 moles, le meilleur mezcal du Mexique. Oaxaca + la Sierra + la côte Pacifique fait un voyage en soi (5-7 jours). Vol OAX depuis CDMX (1h)." }
    },
    { name: { en: "Bajío (colonial cities)", fr: "Bajío (villes coloniales)" }, highlights: { en: "Guanajuato, San Miguel de Allende, Querétaro", fr: "Guanajuato, San Miguel de Allende, Querétaro" },
      description: { en: "The silver-mining belt north of CDMX. UNESCO old towns, cobblestoned streets, mariachi in plazas. The Mexico that postcards used to show. 4–5 days to do all three; rental car or first-class buses (ETN, Primera Plus).", fr: "La ceinture minière d'argent au nord de Mexico. Centres anciens UNESCO, rues pavées, mariachis sur les places. Le Mexique des cartes postales d'antan. 4-5 jours pour faire les trois ; voiture ou bus première classe (ETN, Primera Plus)." }
    },
    { name: { en: "Pacific coast", fr: "Côte Pacifique" }, highlights: { en: "Puerto Vallarta, Sayulita, Puerto Escondido, Mazunte", fr: "Puerto Vallarta, Sayulita, Puerto Escondido, Mazunte" },
      description: { en: "Surf villages and resort towns on the Pacific. Puerto Vallarta for the established beach holiday, Sayulita for surf-and-yoga vibe, Puerto Escondido and Mazunte for the deeper south Pacific. Best November–April.", fr: "Villages de surf et stations sur le Pacifique. Puerto Vallarta pour les vacances balnéaires classiques, Sayulita pour l'ambiance surf-yoga, Puerto Escondido et Mazunte pour le Pacifique plus au sud. Idéal de novembre à avril." }
    },
    { name: { en: "Baja California", fr: "Basse-Californie" }, highlights: { en: "Cabo San Lucas, La Paz, Loreto, whale watching", fr: "Cabo San Lucas, La Paz, Loreto, observation des baleines" },
      description: { en: "Long peninsula on the Pacific side. Cabo for the touristic south, La Paz for the calmer middle (whale-shark snorkeling), Loreto and Bahía Concepción for empty beaches. Whales February–April (greys at San Ignacio Lagoon; rare bucket-list experience).", fr: "Longue péninsule côté Pacifique. Cabo pour le sud touristique, La Paz pour le milieu plus calme (snorkeling avec requins-baleines), Loreto et Bahía Concepción pour les plages désertes. Baleines de février à avril (les grises de la lagune San Ignacio ; expérience rare)." }
    },
  ],
  itineraries: [
    { days: 7, title: { en: "Yucatán quick — 7 days", fr: "Yucatán express — 7 jours" }, summary: { en: "Beach + ruins + cenotes. The package-trip favorite, done independently.", fr: "Plage + ruines + cénotes. La version voyage organisé, faite en indépendant." }, stops: { en: ["Day 1–3: Tulum (ruins, cenotes, beach)", "Day 4: Chichén Itzá + cenote on the way", "Day 5–7: Mérida (colonial old town, day trip to Uxmal pyramid)"], fr: ["Jour 1-3 : Tulum (ruines, cénotes, plage)", "Jour 4 : Chichén Itzá + cénote en chemin", "Jour 5-7 : Mérida (centre colonial, journée à la pyramide d'Uxmal)"] } },
    { days: 10, title: { en: "CDMX + Yucatán — 10 days", fr: "CDMX + Yucatán — 10 jours" }, summary: { en: "Add Mexico City and Teotihuacán. The sweet-spot first trip.", fr: "Ajoute Mexico et Teotihuacán. L'idéal pour une première fois." }, stops: { en: ["Day 1–4: Mexico City (Centro, Coyoacán, Roma/Condesa, Teotihuacán day trip)", "Day 5: Fly to Mérida or Cancún", "Day 6–10: Yucatán loop — Mérida + Chichén Itzá + Tulum + cenotes"], fr: ["Jour 1-4 : Mexico (Centro, Coyoacán, Roma/Condesa, journée Teotihuacán)", "Jour 5 : vol pour Mérida ou Cancún", "Jour 6-10 : boucle Yucatán — Mérida + Chichén Itzá + Tulum + cénotes"] } },
    { days: 14, title: { en: "CDMX + Oaxaca + Yucatán — 14 days", fr: "CDMX + Oaxaca + Yucatán — 14 jours" }, summary: { en: "Three regions, three flights. The most complete first-trip itinerary.", fr: "Trois régions, trois vols. L'itinéraire le plus complet pour une première fois." }, stops: { en: ["Day 1–4: Mexico City", "Day 5–7: Oaxaca (mezcal, mole, Monte Albán)", "Day 8: Fly to Mérida or Cancún", "Day 9–14: Yucatán — Mérida, Chichén Itzá, Tulum, cenotes, Playa del Carmen wrap-up"], fr: ["Jour 1-4 : Mexico", "Jour 5-7 : Oaxaca (mezcal, mole, Monte Albán)", "Jour 8 : vol pour Mérida ou Cancún", "Jour 9-14 : Yucatán — Mérida, Chichén Itzá, Tulum, cénotes, fin à Playa del Carmen"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 50, description: { en: "Hostel dorm or small Airbnb (€20), tacos and tortas (€12), local buses + colectivos (€8), one paid attraction (€10). Mexico on a budget is genuinely cheap; CDMX is the priciest, Yucatán and Oaxaca much less.", fr: "Dortoir d'auberge ou petit Airbnb (20 €), tacos et tortas (12 €), bus locaux + colectivos (8 €), une attraction payante (10 €). Le Mexique petit budget est vraiment bon marché ; CDMX est le plus cher, Yucatán et Oaxaca beaucoup moins." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 110, description: { en: "Boutique hotel or design Airbnb (€65), one sit-down dinner + casual meals (€30), Uber + rental car days (€10), entries + activities (€5). The right tier — Mexico mid-range stretches further than European budget.", fr: "Hôtel de charme ou Airbnb design (65 €), un dîner attablé + repas décontractés (30 €), Uber + voiture quelques jours (10 €), entrées + activités (5 €). Le bon équilibre — le moyen-de-gamme mexicain va plus loin que le budget européen." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 260, description: { en: "Boutique hotel or all-inclusive resort (€170), Pujol-tier dinner or chef's tasting menu (€60), private transfers (€20), guide / private cenote tour (€10). Honeymoon and milestone-trip tier.", fr: "Hôtel de charme ou resort all-inclusive (170 €), dîner type Pujol ou menu dégustation (60 €), transferts privés (20 €), guide / cénote privé (10 €). Tier lune de miel et anniversaire." } },
    ],
    note: { en: "Per person, excluding international flights. Cards work in cities; cash in markets, street stalls, and rural areas. ATMs everywhere but check fees (Citibanamex is reasonable, BBVA can hit €5 per withdrawal). Tipping is 10–15% at restaurants — locals do it.", fr: "Par personne, hors vol international. Carte acceptée en ville ; cash sur les marchés, les stands de rue et en zone rurale. DAB partout mais vérifiez les frais (Citibanamex correct, BBVA peut prélever 5 €/retrait). Pourboire 10-15 % au resto — les locaux le font." },
  },
  tips: [
    { do: true, text: { en: "Use Uber and Didi in CDMX and big cities. Both work end-to-end (fixed price, GPS, rating, no negotiation). Don't take random street taxis — express kidnappings (less common now but still happen) target tourists in unmarked cabs.", fr: "Utilisez Uber et Didi à CDMX et dans les grandes villes. Les deux fonctionnent de bout en bout (prix fixe, GPS, notation, pas de marchandage). Ne prenez pas un taxi au hasard dans la rue — les enlèvements express (moins fréquents mais encore réels) visent les touristes dans des taxis non identifiés." } },
    { do: true, text: { en: "Drink bottled or purified water. Tap water carries bacteria foreign stomachs don't handle. Even in fancy restaurants, ask if the ice and washed salads use purified water (the answer is usually yes; phrasing the question is polite).", fr: "Buvez de l'eau en bouteille ou purifiée. L'eau du robinet contient des bactéries que les estomacs étrangers ne gèrent pas. Même en bon restaurant, demandez si les glaçons et la salade lavée utilisent de l'eau purifiée (en général oui ; la question est polie)." } },
    { do: false, text: { en: "Don't book the Cancún hotel zone if you want real Mexico. The zone is a Vegas-Strip-of-Caribbean: all-inclusive resorts, manicured beach, no local life. Stay in downtown Cancún, Playa del Carmen centro, or Tulum pueblo (not the beach zone) for the actual country.", fr: "Ne réservez pas la zone hôtelière de Cancún si vous voulez le vrai Mexique. La zone est le Las Vegas Strip des Caraïbes : resorts all-inclusive, plage manucurée, zéro vie locale. Logez à Cancún centro, Playa del Carmen centro ou Tulum pueblo (pas la zone plage) pour le pays réel." } },
    { do: true, text: { en: "Tip 10–15% at restaurants. It's expected and necessary — restaurant staff are poorly paid otherwise. Add the tip to the credit-card slip or leave cash. Bell-staff and housekeepers: 30–50 pesos per day / per bag.", fr: "Pourboire 10-15 % au resto. C'est attendu et nécessaire — sinon le personnel est mal payé. Ajoutez-le sur la facturette de carte ou laissez en cash. Bagagistes et femmes de chambre : 30-50 pesos par jour / par bagage." } },
    { do: true, text: { en: "Learn 5 phrases of Spanish. English coverage in tourist zones is fine; outside (markets, smaller towns, anywhere local), Spanish is the only way. 'Buenos días', 'gracias', 'la cuenta por favor', 'no entiendo', 'cuánto cuesta' will carry you remarkably far.", fr: "Apprenez 5 phrases d'espagnol. L'anglais passe en zone touristique ; en dehors (marchés, petites villes, partout local), l'espagnol est la seule clé. « Buenos días », « gracias », « la cuenta por favor », « no entiendo », « cuánto cuesta » vont étonnamment loin." } },
    { do: false, text: { en: "Don't share your cartel takes loudly. Mexicans don't joke about it, and bringing it up makes people uncomfortable in a country still living through it. If they want to discuss politics, follow their lead.", fr: "Ne lâchez pas vos théories sur les cartels en public. Les Mexicains n'en plaisantent pas, et le sujet met mal à l'aise dans un pays qui le vit encore. Si vos interlocuteurs veulent parler politique, laissez-les mener." } },
    { do: true, text: { en: "Check the US State Department travel advisory by state, not by country. Yucatán is Level 1 (safe). Quintana Roo is Level 2 (exercise caution — Tulum had drug-related shootings 2021–2023 but tourist zones stay safe). Sinaloa, Tamaulipas, Guerrero, Michoacán: Level 4 (do not travel). Use it to plan.", fr: "Consultez l'alerte voyageurs du State Department US par État, pas par pays. Le Yucatán est en niveau 1 (sûr). Quintana Roo en niveau 2 (vigilance — Tulum a eu des incidents de drogue 2021-2023 mais les zones touristiques restent sûres). Sinaloa, Tamaulipas, Guerrero, Michoacán : niveau 4 (ne pas voyager). À utiliser pour planifier." } },
    { do: true, text: { en: "Acclimate to altitude in Mexico City. The first 24–48 hours, alcohol hits harder, breathing climbing stairs feels weird, sleep can be off. Drink water, go easy on mezcal night one. By day 3 you're fine.", fr: "Acclimatez-vous à l'altitude à Mexico. Les 24-48 premières heures, l'alcool tape plus fort, respirer en montant des marches paraît bizarre, le sommeil peut être perturbé. Buvez de l'eau, allez-y mollo sur le mezcal le premier soir. Au jour 3, c'est OK." } },
  ],
  related: ["thailand", "vietnam"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 10. Indonesia
// ---------------------------------------------------------------------------
const indonesia: CountryGuide = {
  slug: { en: "indonesia", fr: "indonesie" },
  country: { en: "Indonesia", fr: "Indonésie" },
  continent: "asia",
  hero: {
    image: "/travel-guides/indonesia/hero.jpg",
    imageAlt: { en: "Uluwatu cliff temple at sunset, Bali", fr: "Temple d'Uluwatu sur sa falaise au coucher du soleil, Bali" },
    tag: { en: "Country guide · Asia", fr: "Guide pays · Asie" },
  },
  meta: {
    title: { en: "Indonesia Travel Guide 2026 — Bali, Java & How to Plan", fr: "Guide voyage Indonésie 2026 — Bali, Java & comment partir" },
    description: { en: "Real Indonesia travel guide for 2026: best season, Bali to Java to Komodo, regional food, honest budgets, cultural do's and don'ts.", fr: "Guide voyage Indonésie 2026, sans bla-bla : meilleure saison, Bali à Java à Komodo, cuisine, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "Indonesia is 17,000 islands across three time zones — the world's largest archipelago, the world's largest Muslim-majority country (except Hindu Bali), and one of the most biodiverse places on earth. Most tourists see only Bali, missing what locals do: Java's volcanoes and temples, Lombok's beaches, Komodo's dragons, Sumatra's orangutans, Raja Ampat's reefs.",
      "First trip: Bali (7–10 days) + Gili Islands or Lombok (3–4 days) or Java (Borobudur + Mt Bromo, 4–5 days). Second trip: Komodo + Flores boat trip (4 days), Raja Ampat diving (week-plus), Sumatra wildlife. Three weeks is the right format for the country if you go beyond Bali.",
      "Two things to know. Bali is overdeveloped in the south (Kuta, Seminyak, parts of Canggu) — head to Ubud or the east coast (Sidemen, Amed) for the version that still feels like Bali. And inter-island travel runs on small flights, slow ferries, and the occasional fast boat — pad your schedule, things move on island time.",
    ],
    fr: [
      "L'Indonésie, c'est 17 000 îles sur trois fuseaux horaires — le plus grand archipel du monde, le pays à majorité musulmane le plus peuplé (sauf Bali, hindoue), et l'un des endroits les plus biodivers de la planète. La plupart des touristes ne voient que Bali, ratant ce que font les locaux : les volcans et temples de Java, les plages de Lombok, les dragons de Komodo, les orangs-outans de Sumatra, les récifs de Raja Ampat.",
      "Première fois : Bali (7-10 jours) + îles Gili ou Lombok (3-4 jours) ou Java (Borobudur + Mt Bromo, 4-5 jours). Deuxième fois : Komodo + bateau jusqu'à Flores (4 jours), plongée à Raja Ampat (semaine et plus), faune de Sumatra. Trois semaines, c'est le bon format si on dépasse Bali.",
      "Deux trucs à savoir. Bali est surdéveloppée au sud (Kuta, Seminyak, une partie de Canggu) — allez à Ubud ou sur la côte est (Sidemen, Amed) pour la version qui ressemble encore à Bali. Et le voyage entre îles se fait en petits vols, ferries lents et fast boats occasionnels — gardez de la marge, les choses bougent à l'heure de l'île.",
    ],
  },
  quickFacts: {
    capital: { en: "Jakarta (Nusantara from 2027)", fr: "Jakarta (Nusantara à partir de 2027)" },
    language: { en: "Indonesian (Bahasa) · 700+ regional languages", fr: "Indonésien (Bahasa) · 700+ langues régionales" },
    currency: { code: "IDR", symbol: "Rp" },
    timezone: "WIB (UTC+7) Java/Bali · WITA (UTC+8) Sulawesi · WIT (UTC+9) Papua",
    visa: { en: "Visa-on-arrival (60 days, extendable) for most Western passports — US$35 at airport, e-VOA online cheaper.", fr: "Visa à l'arrivée (60 jours, prolongeable) pour la plupart des passeports occidentaux — 35 US$ à l'aéroport, e-VOA en ligne moins cher." },
    plug: "Type C / F · 230V",
    driveSide: "left",
    population: "~280M",
  },
  bestSeason: {
    best: { months: { en: "May – September", fr: "Mai – septembre" }, description: { en: "Dry season. Bali, Java, Komodo all at their best — sunny days, low humidity, calm seas. July–August is peak (and most expensive); May–June and September are the sweet spot.", fr: "Saison sèche. Bali, Java, Komodo au meilleur — soleil, peu d'humidité, mer calme. Juillet-août au sommet (et plus chers) ; mai-juin et septembre sont l'idéal." } },
    shoulder: { months: { en: "April · October", fr: "Avril · octobre" }, description: { en: "Transition months — occasional showers, fewer crowds, lower prices. Still beautiful weather most days. Sumatra and Borneo can stay wet on either side.", fr: "Mois de transition — averses occasionnelles, moins de monde, prix plus bas. La météo reste belle la plupart du temps. Sumatra et Bornéo peuvent rester humides des deux côtés." } },
    avoid: { months: { en: "November – March (rainy)", fr: "Novembre – mars (saison des pluies)" }, description: { en: "Wet season — daily afternoon downpours, occasional days washed out, rough seas affecting boat trips (Komodo can be canceled). Inland Bali is still doable; Komodo and dive trips are not.", fr: "Saison humide — averses quotidiennes l'après-midi, journées parfois noyées, mer agitée affectant les bateaux (Komodo peut être annulé). L'intérieur de Bali reste faisable ; pas Komodo ni les sorties plongée." } },
  },
  mustSee: [
    { name: "Ubud & rice terraces", region: { en: "Bali", fr: "Bali" }, description: { en: "Bali's cultural heart — Tegalalang rice terraces, the Monkey Forest, traditional dance shows at Ubud Palace, yoga and detox retreats. Stay in town not in a resort to feel it. The traffic on Hanoman/Jalan Raya Ubud is heavy now; rent a scooter only if confident.", fr: "Le cœur culturel de Bali — rizières de Tegalalang, Monkey Forest, spectacles de danse traditionnelle au palais d'Ubud, retraites yoga et détox. Logez en ville, pas dans un resort. Le trafic sur Hanoman/Jalan Raya Ubud est dense ; ne louez un scooter que si vous êtes à l'aise." }, image: "/travel-guides/indonesia/ubud.jpg", imageAlt: { en: "Tegalalang rice terraces near Ubud, Bali", fr: "Rizières de Tegalalang près d'Ubud, Bali" }, mapsUrl: "https://maps.app.goo.gl/jZNb5RmCJ8nMjAEN8" },
    { name: "Uluwatu cliff temple", region: { en: "Bali", fr: "Bali" }, description: { en: "A 12th-century sea temple perched 70m above the Indian Ocean. Sunset kecak fire dance at 6pm (book ahead). Cliff bars (Single Fin, Sundays Beach Club) for sundowners. Watch monkeys — they steal sunglasses and phones, no joke.", fr: "Un temple marin du XIIe siècle perché à 70 m au-dessus de l'océan Indien. Danse du feu kecak à 18h (à réserver). Bars sur la falaise (Single Fin, Sundays Beach Club) pour l'apéro. Attention aux singes — ils volent lunettes et téléphones, vraiment." }, image: "/travel-guides/indonesia/uluwatu.jpg", imageAlt: { en: "Uluwatu cliff temple above the ocean", fr: "Temple d'Uluwatu sur la falaise au-dessus de l'océan" }, mapsUrl: "https://maps.app.goo.gl/dPmYUkB8E2P3T1Hs8" },
    { name: "Tanah Lot", region: { en: "Bali", fr: "Bali" }, description: { en: "Bali's other iconic sea temple — sitting on a rock offshore, accessible only at low tide. Touristy at sunset; arrive 90 minutes ahead for parking. Combine with Pura Ulun Danu Bratan (lake temple) in the highlands.", fr: "L'autre temple marin emblématique — posé sur un rocher au large, accessible uniquement à marée basse. Touristique au coucher du soleil ; arrivez 1h30 avant pour le parking. À combiner avec le Pura Ulun Danu Bratan (temple du lac) dans les hauteurs." }, image: "/travel-guides/indonesia/tanah-lot.jpg", imageAlt: { en: "Tanah Lot sea temple on a rock at sunset", fr: "Temple Tanah Lot sur son rocher au coucher du soleil" }, mapsUrl: "https://maps.app.goo.gl/zJK2qCq3wPnXq7He7" },
    { name: "Mt Batur sunrise hike", region: { en: "Bali", fr: "Bali" }, description: { en: "1,717m volcano in the highlands — start the hike at 3:30am, summit by 5:30am, watch the sun rise over Mt Agung and the caldera lake. Guided only (mandatory, around €25). Breakfast eggs cooked on volcanic steam at the top.", fr: "Volcan de 1 717 m dans les hauteurs — départ à 3h30, sommet à 5h30, lever du soleil sur le Mt Agung et le lac de la caldeira. Guide obligatoire (~25 €). Œufs du petit-déj cuits à la vapeur volcanique au sommet." }, image: "/travel-guides/indonesia/mt-batur.jpg", imageAlt: { en: "Sunrise from Mt Batur summit", fr: "Lever du soleil au sommet du Mt Batur" }, mapsUrl: "https://maps.app.goo.gl/F2cnFP6xCJG8bGyR9" },
    { name: "Nusa Penida", region: { en: "Bali offshore", fr: "Au large de Bali" }, description: { en: "Island 30 minutes by fast boat from Sanur — Kelingking Beach (the T-rex-shaped cliff), Crystal Bay snorkeling with manta rays, Diamond Beach. Day-trip works but stay overnight to see it without the day-tour crowds.", fr: "Île à 30 min en fast boat depuis Sanur — plage Kelingking (la falaise en forme de T-Rex), snorkeling à Crystal Bay avec raies mantas, plage Diamond. La journée fonctionne mais restez la nuit pour échapper aux groupes." }, image: "/travel-guides/indonesia/nusa-penida.jpg", imageAlt: { en: "Kelingking Beach T-rex cliff on Nusa Penida", fr: "Falaise en forme de T-Rex de la plage Kelingking, Nusa Penida" }, mapsUrl: "https://maps.app.goo.gl/jcGqe8WUmYrM2hPm6" },
    { name: "Gili Islands (Lombok)", region: { en: "Lombok", fr: "Lombok" }, description: { en: "Three car-free islands off Lombok. Gili Trawangan for nightlife, Gili Air for laid-back, Gili Meno for honeymoon-quiet. Snorkel with sea turtles right off the beach. Fast boat from Bali takes 2.5hr; turbulent in rainy season.", fr: "Trois îles sans voiture au large de Lombok. Gili Trawangan pour la fête, Gili Air pour le tranquille, Gili Meno pour lune de miel. Snorkeling avec tortues marines depuis la plage. Fast boat depuis Bali, 2h30 ; agité en saison des pluies." }, image: "/travel-guides/indonesia/gili-islands.jpg", imageAlt: { en: "Turquoise water and beach on Gili Trawangan", fr: "Eau turquoise et plage à Gili Trawangan" }, mapsUrl: "https://maps.app.goo.gl/SBnzpYTFLDRTNb8C7" },
    { name: "Borobudur", region: { en: "Central Java", fr: "Java central" }, description: { en: "The world's largest Buddhist monument, 9th century, UNESCO. 2,672 carved relief panels, 504 Buddha statues, all on a single stepped pyramid. Sunrise visit from inside the complex (€60+ ticket) or from Setumbu Hill nearby (€10). 90 minutes from Yogyakarta.", fr: "Le plus grand monument bouddhiste du monde, IXe siècle, UNESCO. 2 672 bas-reliefs sculptés, 504 statues de Bouddha, sur une unique pyramide à degrés. Visite au lever du soleil depuis l'enceinte (billet à 60 €+) ou depuis la colline Setumbu en face (10 €). 1h30 de Yogyakarta." }, image: "/travel-guides/indonesia/borobudur.jpg", imageAlt: { en: "Borobudur temple with stupas at sunrise", fr: "Temple de Borobudur avec ses stupas au lever du soleil" }, mapsUrl: "https://maps.app.goo.gl/p7L9DnHHnaP6ueGM9" },
    { name: "Mt Bromo sunrise", region: { en: "East Java", fr: "Java oriental" }, description: { en: "Active volcano in a sea of black sand inside an old caldera. Pre-dawn jeep ride to King Kong Hill viewpoint, then walk across the ash to climb Bromo itself (250 stairs). Surreal lunar landscape. Combine with Ijen blue-flame crater hike (4 hours east).", fr: "Volcan actif au milieu d'une mer de sable noir, dans une ancienne caldeira. Jeep avant l'aube jusqu'au King Kong Hill, puis traversée des cendres pour grimper le Bromo (250 marches). Paysage lunaire surréel. À combiner avec la rando du cratère bleu de l'Ijen (4h à l'est)." }, image: "/travel-guides/indonesia/mt-bromo.jpg", imageAlt: { en: "Mt Bromo volcano with caldera at sunrise", fr: "Volcan Bromo avec sa caldeira au lever du soleil" }, mapsUrl: "https://maps.app.goo.gl/CSXBjwBn5cTwLwzo9" },
    { name: "Yogyakarta", region: { en: "Central Java", fr: "Java central" }, description: { en: "Java's cultural capital — the Sultan's Palace (Kraton), Prambanan Hindu temples (UNESCO, dance show under floodlights), Malioboro Street food and batik. Base here to do Borobudur, Prambanan, and Mt Merapi day trips. 8-hour overnight train from Jakarta.", fr: "La capitale culturelle de Java — le Kraton (palais du sultan), les temples hindous de Prambanan (UNESCO, danse sous éclairage), Malioboro Street pour la bouffe et le batik. Camp de base pour Borobudur, Prambanan et le Mt Merapi en excursion. 8h en train de nuit depuis Jakarta." }, image: "/travel-guides/indonesia/yogyakarta.jpg", imageAlt: { en: "Prambanan Hindu temple complex in Yogyakarta", fr: "Complexe hindou de Prambanan à Yogyakarta" }, mapsUrl: "https://maps.app.goo.gl/y9XmZ7v1Vpa6XLh28" },
    { name: "Komodo National Park", region: { en: "Flores", fr: "Flores" }, description: { en: "Three islands with the world's largest lizards (Komodo dragons, up to 3m and 70kg, mildly venomous). 3–4-day boat trip from Labuan Bajo (Flores) hits Komodo, Rinca, Padar (the postcard viewpoint), Pink Beach, and manta-ray snorkeling at Manta Point. Best April–October.", fr: "Trois îles avec les plus grands lézards du monde (les dragons de Komodo, jusqu'à 3 m et 70 kg, légèrement venimeux). Sortie en bateau 3-4 jours depuis Labuan Bajo (Flores) couvrant Komodo, Rinca, Padar (le point de vue carte postale), Pink Beach et le snorkeling avec raies mantas à Manta Point. Idéal d'avril à octobre." }, image: "/travel-guides/indonesia/komodo.jpg", imageAlt: { en: "Padar island viewpoint in Komodo National Park", fr: "Vue depuis l'île Padar, parc national de Komodo" }, mapsUrl: "https://maps.app.goo.gl/qpz1U6L9Y3KGQuKK6" },
    { name: "Canggu & south Bali surf", region: { en: "Bali", fr: "Bali" }, description: { en: "The digital-nomad capital of Asia — Canggu has cafés with desks, surf schools, and rice paddies between villas. Echo Beach, Berawa for surf, Petitenget for sunset bars. Skip Kuta (overdeveloped, party-British-tourist) for Canggu or Seminyak's calmer end.", fr: "La capitale des digital nomads d'Asie — Canggu a des cafés avec bureaux, écoles de surf, rizières entre les villas. Echo Beach, Berawa pour le surf, Petitenget pour les bars du coucher de soleil. Évitez Kuta (surdéveloppée, fêtes britanniques) pour Canggu ou le bout calme de Seminyak." }, image: "/travel-guides/indonesia/canggu.jpg", imageAlt: { en: "Canggu surf beach at sunset, Bali", fr: "Plage de surf à Canggu au coucher du soleil, Bali" }, mapsUrl: "https://maps.app.goo.gl/wKn4qx5g6dx7p4cb6" },
    { name: "Bali waterfalls", region: { en: "Bali", fr: "Bali" }, description: { en: "Sekumpul (7 falls in a valley, 90-min hike), Tibumana (easy access, photogenic), Tegenungan (touristy but close to Ubud), Aling-Aling for the natural waterslides. Most charge 10,000–30,000 IDR (€0.60–2). Best in dry season; rainy-season flow is impressive but unsafe.", fr: "Sekumpul (7 cascades dans une vallée, 1h30 de marche), Tibumana (accès facile, photogénique), Tegenungan (touristique mais près d'Ubud), Aling-Aling pour les toboggans naturels. La plupart facturent 10 000-30 000 IDR (0,60-2 €). Idéal en saison sèche ; le débit en saison des pluies est impressionnant mais dangereux." }, image: "/travel-guides/indonesia/waterfall.jpg", imageAlt: { en: "Jungle waterfall in Bali", fr: "Cascade en pleine jungle, Bali" }, mapsUrl: "https://maps.app.goo.gl/x1AnYrh6q7VfvKQk9" },
  ],
  specialties: [
    { name: { en: "Nasi goreng & rice dishes", fr: "Nasi goreng & plats de riz" }, category: "food", description: { en: "Nasi goreng (fried rice with sweet soy, fried egg on top, krupuk crackers) is the national dish. Mie goreng is the noodle version. Nasi campur is a 'mixed plate' — rice with 5–8 small sides. €1.50–4 at any warung (family-run street eatery).", fr: "Le nasi goreng (riz sauté à la sauce soja sucrée, œuf au plat dessus, krupuk) est le plat national. Le mie goreng en est la version nouilles. Le nasi campur est une « assiette mélangée » — riz avec 5-8 petits accompagnements. 1,50-4 € dans n'importe quel warung (resto familial de rue)." }, image: "/travel-guides/indonesia/nasi-goreng.jpg", imageAlt: { en: "Indonesian nasi goreng fried rice", fr: "Nasi goreng indonésien" } },
    { name: { en: "Satay & grilled skewers", fr: "Satay & brochettes" }, category: "food", description: { en: "Sate ayam (chicken), sate kambing (goat), sate lilit (Balinese minced-fish on lemongrass skewers) — grilled over coconut shells, served with peanut sauce and rice cakes. Eat at street stalls in the evening; smell the smoke a block away.", fr: "Sate ayam (poulet), sate kambing (chèvre), sate lilit (poisson haché balinais sur brochettes de citronnelle) — grillées sur coques de noix de coco, servies avec sauce cacahuète et galettes de riz. À manger dans les stands le soir ; on sent la fumée à un bloc de distance." }, image: "/travel-guides/indonesia/satay.jpg", imageAlt: { en: "Indonesian satay skewers with peanut sauce", fr: "Brochettes satay indonésiennes avec sauce cacahuète" } },
    { name: { en: "Balinese ceremonies", fr: "Cérémonies balinaises" }, category: "experience", description: { en: "Bali is 87% Hindu — daily canang sari offerings (little baskets of flowers and incense) on every doorstep, monthly temple festivals (odalan), and the silent Nyepi day of meditation (March) when the airport closes and lights stay off. Witnessing, not participating, is the right posture.", fr: "Bali est à 87 % hindoue — offrandes quotidiennes canang sari (petits paniers de fleurs et d'encens) sur chaque seuil, fêtes mensuelles au temple (odalan), et le silencieux Nyepi (mars), jour de méditation où l'aéroport ferme et les lumières restent éteintes. Observer, pas participer, c'est la bonne posture." }, image: "/travel-guides/indonesia/ceremony.jpg", imageAlt: { en: "Balinese ceremony with women in traditional dress", fr: "Cérémonie balinaise avec femmes en habit traditionnel" } },
    { name: { en: "Yoga & wellness", fr: "Yoga & bien-être" }, category: "experience", description: { en: "Bali — Ubud especially — is the wellness capital of Asia. Yoga Barn for drop-in classes, weeklong silent retreats, Ayurveda treatments. Canggu has gym-and-açai-bowl cafés on every corner. Cheap by Western standards (€8–15 a yoga class).", fr: "Bali — Ubud surtout — est la capitale wellness d'Asie. Yoga Barn pour les cours en drop-in, retraites silencieuses d'une semaine, soins ayurvédiques. Canggu a un café gym-et-açai-bowl à chaque coin. Bon marché aux standards occidentaux (8-15 € le cours de yoga)." }, image: "/travel-guides/indonesia/yoga.jpg", imageAlt: { en: "Yoga session in a Bali studio", fr: "Séance de yoga dans un studio à Bali" } },
    { name: { en: "Batik & craft", fr: "Batik & artisanat" }, category: "craft", description: { en: "Wax-resist-dyed textiles, UNESCO Intangible Heritage. Yogyakarta is the batik capital — workshops where you can make your own (€20–30, half a day). Bali has its own wood-carving and silver-jewelry traditions (Celuk for silver, Mas for wood).", fr: "Tissus teints par réserve à la cire, patrimoine culturel UNESCO. Yogyakarta est la capitale du batik — ateliers pour fabriquer le sien (20-30 €, une demi-journée). Bali a ses propres traditions de sculpture sur bois et de bijouterie en argent (Celuk pour l'argent, Mas pour le bois)." }, image: "/travel-guides/indonesia/batik.jpg", imageAlt: { en: "Indonesian batik fabric pattern", fr: "Motif de batik indonésien" } },
    { name: { en: "Tropical breakfast & juices", fr: "Petit-déj tropical & jus" }, category: "food", description: { en: "Acai bowls, dragon fruit, fresh young coconut, jamu (turmeric-ginger drink), kopi tubruk (Indonesian coffee, grounds-in-the-cup style). Smoothie bowls in Canggu are €5–8 — the Bali staple. Skip 'luwak coffee' tourist farms (coffee from caged civet droppings is animal cruelty).", fr: "Açai bowls, fruit du dragon, jeune noix de coco fraîche, jamu (boisson curcuma-gingembre), kopi tubruk (café indonésien, marc dans la tasse). Smoothie bowls à Canggu : 5-8 € — le classique balinais. Évitez les fermes touristiques de « luwak coffee » (café tiré des excréments de civettes en cage, c'est de la maltraitance animale)." }, image: "/travel-guides/indonesia/coconut.jpg", imageAlt: { en: "Fresh coconut and tropical fruit smoothie bowl in Bali", fr: "Noix de coco fraîche et smoothie bowl tropical, Bali" } },
    { name: { en: "Surf & ocean culture", fr: "Surf & culture océan" }, category: "experience", description: { en: "Bali was the surf-pioneer scene of the 70s and remains world-class. Uluwatu and Padang Padang for advanced, Canggu (Echo, Berawa) for intermediate, Kuta and Seminyak for beginners. Board rental €5/day, group lesson €30–45.", fr: "Bali a été la scène pionnière du surf des années 70 et reste de niveau mondial. Uluwatu et Padang Padang pour les confirmés, Canggu (Echo, Berawa) pour les intermédiaires, Kuta et Seminyak pour les débutants. Location de planche 5 €/jour, cours collectif 30-45 €." }, image: "/travel-guides/indonesia/surf.jpg", imageAlt: { en: "Surfer riding a wave in Bali", fr: "Surfeur sur une vague à Bali" } },
  ],
  regions: [
    { name: { en: "Bali", fr: "Bali" }, highlights: { en: "Ubud, Uluwatu, Canggu, Sidemen, Lovina, Amed", fr: "Ubud, Uluwatu, Canggu, Sidemen, Lovina, Amed" }, description: { en: "The tourist heart — Hindu majority in a Muslim country, distinct culture. South (Canggu, Seminyak, Uluwatu) is the developed coast. Center (Ubud, Sidemen) is rice-paddy and culture. North (Lovina, Munduk) is volcanic and untouristed.", fr: "Le cœur touristique — majorité hindoue dans un pays musulman, culture à part. Le sud (Canggu, Seminyak, Uluwatu) est la côte développée. Le centre (Ubud, Sidemen) est rizières et culture. Le nord (Lovina, Munduk), volcanique et peu touristique." } },
    { name: { en: "Java", fr: "Java" }, highlights: { en: "Jakarta, Yogyakarta, Borobudur, Mt Bromo, Ijen", fr: "Jakarta, Yogyakarta, Borobudur, Mt Bromo, Ijen" }, description: { en: "The country's main island (60% of the population). Skip Jakarta unless transiting. Yogyakarta as cultural base for the temples; the volcanoes (Bromo, Ijen) on the east. 5–7 days adds the country's depth.", fr: "L'île principale (60 % de la population). Évitez Jakarta sauf transit. Yogyakarta comme base culturelle pour les temples ; les volcans (Bromo, Ijen) à l'est. 5-7 jours pour ajouter la profondeur du pays." } },
    { name: { en: "Lombok & Gili", fr: "Lombok & Gili" }, highlights: { en: "Gili Islands, Senggigi, Mt Rinjani, Kuta Lombok", fr: "Îles Gili, Senggigi, Mt Rinjani, Kuta Lombok" }, description: { en: "Bali's quieter neighbor — Muslim majority, less developed, equally beautiful. Mt Rinjani is a 2-day climb (3,726m, second-highest volcano in Indonesia). Kuta Lombok for surf without the crowd.", fr: "La voisine plus calme de Bali — majorité musulmane, moins développée, aussi belle. Le Mt Rinjani est une ascension de 2 jours (3 726 m, deuxième volcan d'Indonésie). Kuta Lombok pour le surf sans la foule." } },
    { name: { en: "Flores & Komodo", fr: "Flores & Komodo" }, highlights: { en: "Labuan Bajo, Komodo NP, Padar, Pink Beach, Wae Rebo", fr: "Labuan Bajo, parc Komodo, Padar, Pink Beach, Wae Rebo" }, description: { en: "Eastern, drier, more rugged — Komodo dragons, the Pink Beach, the Manggarai villages of the interior. 3–4 days minimum, ideally a multi-day boat trip from Labuan Bajo.", fr: "Plus à l'est, plus sec, plus accidenté — dragons de Komodo, Pink Beach, villages manggarai de l'intérieur. 3-4 jours minimum, idéalement un bateau de plusieurs jours depuis Labuan Bajo." } },
    { name: { en: "Sumatra", fr: "Sumatra" }, highlights: { en: "Bukit Lawang (orangutans), Lake Toba, Padang surf", fr: "Bukit Lawang (orangs-outans), lac Toba, surf de Padang" }, description: { en: "The 6th-largest island — wild jungle, orangutans in Bukit Lawang, the world's largest volcanic crater lake (Lake Toba), and the Mentawai surf islands. Second-trip destination; demands time.", fr: "La 6e plus grande île — jungle sauvage, orangs-outans à Bukit Lawang, le plus grand lac de cratère volcanique du monde (lac Toba), et les îles de surf Mentawai. Destination pour une deuxième visite ; demande du temps." } },
    { name: { en: "Raja Ampat & Papua", fr: "Raja Ampat & Papouasie" }, highlights: { en: "Raja Ampat karst archipelago, Sorong, Wayag", fr: "Archipel karstique de Raja Ampat, Sorong, Wayag" }, description: { en: "World's most biodiverse marine area — the diving bucket list. €1,500+ per week on a liveaboard or land-based lodge. Hard to get to (multiple flights, then boats); worth the effort for divers.", fr: "La zone marine la plus biodiverse au monde — la destination plongée ultime. 1 500 €+/semaine en croisière ou lodge. Difficile d'accès (plusieurs vols, puis bateaux) ; ça vaut l'effort pour les plongeurs." } },
  ],
  itineraries: [
    { days: 7, title: { en: "Bali highlights — 7 days", fr: "Bali en 7 jours" }, summary: { en: "South Bali + Ubud + a day trip. The Bali quick package.", fr: "Sud de Bali + Ubud + une excursion. La version courte de Bali." }, stops: { en: ["Day 1–3: Canggu or Seminyak (surf, beach clubs, food)", "Day 4–5: Ubud (rice terraces, monkey forest, yoga)", "Day 6: Mt Batur sunrise + waterfalls", "Day 7: Uluwatu temple + sunset → fly home from DPS"], fr: ["Jour 1-3 : Canggu ou Seminyak (surf, beach clubs, cuisine)", "Jour 4-5 : Ubud (rizières, Monkey Forest, yoga)", "Jour 6 : lever de soleil au Batur + cascades", "Jour 7 : temple d'Uluwatu + coucher de soleil → vol retour DPS"] } },
    { days: 14, title: { en: "Bali + Java — 14 days", fr: "Bali + Java — 14 jours" }, summary: { en: "Add Yogyakarta + the Java volcanoes. Two domestic flights.", fr: "Ajoute Yogyakarta + les volcans de Java. Deux vols intérieurs." }, stops: { en: ["Day 1–4: Bali south (Canggu + Uluwatu)", "Day 5–7: Ubud + Mt Batur", "Day 8: Fly to Yogyakarta", "Day 9–10: Borobudur + Prambanan", "Day 11–12: Mt Bromo + Ijen volcano tour", "Day 13: Fly back to Bali for last beach day", "Day 14: Fly home from DPS"], fr: ["Jour 1-4 : sud de Bali (Canggu + Uluwatu)", "Jour 5-7 : Ubud + Mt Batur", "Jour 8 : vol pour Yogyakarta", "Jour 9-10 : Borobudur + Prambanan", "Jour 11-12 : Mt Bromo + cratère de l'Ijen", "Jour 13 : retour à Bali pour une dernière journée plage", "Jour 14 : vol retour DPS"] } },
    { days: 21, title: { en: "Indonesia deep — 21 days", fr: "Indonésie à fond — 21 jours" }, summary: { en: "Add Lombok/Gili and Komodo. The complete Indonesia for first-timers.", fr: "Ajoute Lombok/Gili et Komodo. L'Indonésie complète pour une première visite." }, stops: { en: ["Day 1–5: Bali south + Ubud", "Day 6–9: Java (Yogyakarta + Bromo)", "Day 10: Back to Bali", "Day 11–14: Gili Islands + Lombok", "Day 15–18: Flores + Komodo boat trip from Labuan Bajo", "Day 19–21: Bali wrap-up + fly home"], fr: ["Jour 1-5 : sud de Bali + Ubud", "Jour 6-9 : Java (Yogyakarta + Bromo)", "Jour 10 : retour Bali", "Jour 11-14 : Îles Gili + Lombok", "Jour 15-18 : Flores + sortie bateau Komodo depuis Labuan Bajo", "Jour 19-21 : fin à Bali + vol retour"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 35, description: { en: "Hostel dorm or homestay (€10), warung meals (€8), scooter rental + ferries (€10), one paid attraction (€7). Indonesia is genuinely cheap once you're past the Bali tourist core.", fr: "Dortoir d'auberge ou homestay (10 €), repas en warung (8 €), location de scooter + ferries (10 €), une attraction payante (7 €). L'Indonésie est vraiment bon marché dès qu'on sort du cœur touristique balinais." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 90, description: { en: "Boutique villa with pool (€50), one full restaurant dinner + casual meals (€20), domestic flights averaged + Gojek (€10), tours and entries (€10). The right tier — Bali villa-living is the signature experience.", fr: "Villa de charme avec piscine (50 €), un dîner attablé + repas décontractés (20 €), vols intérieurs lissés + Gojek (10 €), tours et entrées (10 €). Le bon équilibre — la villa balinaise fait l'expérience." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 220, description: { en: "Cliffside resort or luxury riverside villa (€140), fine-dining beach club dinner (€55), private driver (€15), guided experience or boat charter (€10). Honeymoon and milestone-trip tier.", fr: "Resort sur falaise ou villa de luxe en bord de rivière (140 €), dîner gastronomique en beach club (55 €), chauffeur privé (15 €), expérience guidée ou bateau privé (10 €). Tier lune de miel et anniversaire." } },
    ],
    note: { en: "Per person, excluding international flights. Cards work in tourist zones; cash in warungs and rural areas. ATMs everywhere but limit 2,500,000 IDR (€140) per withdrawal. Gojek and Grab apps cover ride-hailing and food delivery; vastly easier than haggling with taxis.", fr: "Par personne, hors vol international. Carte acceptée en zone touristique ; cash en warungs et en zone rurale. DAB partout mais limite 2 500 000 IDR (140 €) par retrait. Les apps Gojek et Grab couvrent VTC et livraison ; bien plus simple que marchander avec un taxi." },
  },
  tips: [
    { do: true, text: { en: "Get the e-VOA online before arrival (US$35) — saves you the airport queue. Print or screenshot the QR code; immigration will scan it. Valid for 30 days, extendable to 60 once inside the country.", fr: "Prenez l'e-VOA en ligne avant l'arrivée (35 US$) — vous évitez la file de l'aéroport. Imprimez ou screenshotez le QR code ; l'immigration le scanne. Valable 30 jours, prolongeable à 60 sur place." } },
    { do: true, text: { en: "Use Gojek and Grab apps. They cover scooter taxis, car taxis, food delivery, even massage delivery. Fixed price, GPS, in-app communication. Indonesia's tourist economy runs on these — they replaced street negotiation.", fr: "Utilisez les apps Gojek et Grab. Elles couvrent taxis-scooters, taxis voiture, livraison de repas, même livraison de masseur. Prix fixe, GPS, communication en-app. L'économie touristique indonésienne tourne là-dessus — exit le marchandage de rue." } },
    { do: false, text: { en: "Don't rent a scooter without an International Driving Permit. Police roadblocks in Bali specifically target tourists without IDP — €10–20 'fine' on the spot. Even bigger problem: hospital costs and travel insurance void if you crash without it.", fr: "Ne louez pas de scooter sans permis international. Les contrôles à Bali ciblent spécifiquement les touristes sans permis — « amende » de 10-20 € sur place. Pire : les coûts d'hôpital et l'assurance voyage sont annulés si vous avez un accident sans le permis." } },
    { do: false, text: { en: "Don't book luwak coffee tours that show caged civets. Civets pooping coffee beans is a natural process when wild; the caged-civet farms in Ubud are animal-cruelty industries. Wild luwak coffee is real and ethical (€10–15 a cup) but rare.", fr: "Ne réservez pas de tour « luwak coffee » qui montre des civettes en cage. La civette qui mange les grains et les rejette est un processus naturel à l'état sauvage ; les fermes de civettes en cage à Ubud sont des industries de cruauté animale. Le café luwak sauvage existe et est éthique (10-15 € la tasse) mais reste rare." } },
    { do: true, text: { en: "Respect temple dress code. Sarong required (often provided) and a sash around the waist. Women on their period are technically forbidden in some temples — informal rule, not enforced for tourists, but worth knowing.", fr: "Respectez le code vestimentaire des temples. Sarong obligatoire (souvent fourni) et une écharpe à la taille. Les femmes en période de règles sont techniquement interdites dans certains temples — règle informelle, pas appliquée aux touristes, mais bon à savoir." } },
    { do: true, text: { en: "Carry small notes. Warungs, scooter rental, and rural Indonesia work in 10,000–50,000 IDR notes (€0.60–3). ATMs spit out 100,000s (€6) — break them at minimarts (Indomaret, Alfamart) by buying water.", fr: "Ayez de petites coupures. Warungs, location de scooter et zones rurales fonctionnent en billets de 10 000-50 000 IDR (0,60-3 €). Les DAB sortent du 100 000 (6 €) — cassez-les chez les minimarts (Indomaret, Alfamart) en achetant de l'eau." } },
    { do: false, text: { en: "Don't drink tap water. Bottled or refillable filtered water is everywhere (5,000–15,000 IDR). Ice in restaurants and bars in tourist zones is fine (made from purified water); avoid in roadside stalls.", fr: "Ne buvez pas l'eau du robinet. L'eau en bouteille ou à recharger est partout (5 000-15 000 IDR). Les glaçons des restos et bars touristiques sont OK (eau purifiée) ; évitez dans les stands de rue." } },
    { do: true, text: { en: "Schedule around Nyepi (Balinese Day of Silence, usually March). The airport closes, lights stay off, no one leaves their hotel — it's beautiful but be deliberate about it. If you arrive that day, you're not landing.", fr: "Planifiez autour de Nyepi (Jour du silence balinais, en général en mars). L'aéroport ferme, les lumières restent éteintes, personne ne sort de l'hôtel — c'est beau mais à choisir consciemment. Si vous arrivez ce jour-là, vous n'atterrissez pas." } },
  ],
  related: ["thailand", "vietnam"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 11. Croatia
// ---------------------------------------------------------------------------
const croatia: CountryGuide = {
  slug: { en: "croatia", fr: "croatie" },
  country: { en: "Croatia", fr: "Croatie" },
  continent: "europe",
  hero: {
    image: "/travel-guides/croatia/hero.jpg",
    imageAlt: { en: "Dubrovnik's terracotta-roofed old town from above", fr: "La vieille ville de Dubrovnik aux toits terracotta vue d'en haut" },
    tag: { en: "Country guide · Europe", fr: "Guide pays · Europe" },
  },
  meta: {
    title: { en: "Croatia Travel Guide 2026 — Dalmatia, Islands & How to Plan", fr: "Guide voyage Croatie 2026 — Dalmatie, îles & comment partir" },
    description: { en: "Real Croatia travel guide for 2026: best season, Dubrovnik to Istria, regional food, honest budgets, cultural do's and don'ts.", fr: "Guide voyage Croatie 2026, sans bla-bla : meilleure saison, Dubrovnik à l'Istrie, cuisine, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "Croatia is 1,800km of Adriatic coastline + 1,200 islands + national parks of impossible green and turquoise. It's the most Mediterranean country no one expected — Italian-influenced food, Slavic stubbornness, prices that used to be cheap and are now European. Game of Thrones used Dubrovnik as King's Landing; that's where the tourist tsunami started.",
      "First trip: the Dalmatian coast — Split (3 days) + Hvar or Brač (2 days) + Dubrovnik (3 days) + Plitvice or Krka national park (1 day). Second trip: Istria (Rovinj, Pula, truffles) and the islands not on cruise routes (Vis, Lastovo). Third trip: inland — Zagreb, Slavonia wine country, the Plitvice region in winter.",
      "Two things to know. The coast is split (no pun intended) into Dalmatia (south, Italian-influenced, blue islands) and Istria (north, peninsula, French/Italian feel, truffles). They're 7-hour drives apart — pick one for a week-long trip. And summer (July–August) is brutally crowded; mid-May to June and September are the sweet spots for cheaper, calmer, still-warm-sea travel.",
    ],
    fr: [
      "La Croatie, c'est 1 800 km de côte adriatique + 1 200 îles + des parcs nationaux d'un vert et turquoise impossibles. C'est le pays le plus méditerranéen auquel personne ne s'attendait — cuisine influencée italienne, têtitude slave, prix qui étaient pas chers et qui sont devenus européens. Game of Thrones a utilisé Dubrovnik en Port-Réal ; c'est là qu'a démarré le tsunami touristique.",
      "Première fois : la côte dalmate — Split (3 jours) + Hvar ou Brač (2 jours) + Dubrovnik (3 jours) + Plitvice ou Krka (1 journée). Deuxième fois : l'Istrie (Rovinj, Pula, truffes) et les îles hors circuit croisière (Vis, Lastovo). Troisième fois : l'intérieur — Zagreb, vignobles de Slavonie, Plitvice en hiver.",
      "Deux trucs à savoir. La côte est coupée entre Dalmatie (sud, influences italiennes, îles bleues) et Istrie (nord, péninsule, ambiance franco-italienne, truffes). 7h de route entre les deux — choisissez-en une pour un voyage d'une semaine. Et l'été (juillet-août) est saturé ; mi-mai à juin et septembre sont les fenêtres parfaites pour moins cher, plus calme, mer encore chaude.",
    ],
  },
  quickFacts: {
    capital: { en: "Zagreb", fr: "Zagreb" },
    language: { en: "Croatian · English widely spoken", fr: "Croate · anglais très répandu" },
    currency: { code: "EUR", symbol: "€" },
    timezone: "CET (UTC+1)",
    visa: { en: "Schengen since 2023 — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.", fr: "Schengen depuis 2023 — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie." },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~3.9M",
  },
  bestSeason: {
    best: { months: { en: "Mid-May – June · September", fr: "Mi-mai – juin · septembre" }, description: { en: "Warm sea (22–25°C), long days, prices not yet at peak. Hvar and Dubrovnik manageable, Plitvice green and lush. Book 2–3 months ahead for these windows — Croatia got expensive after the EU/Schengen accession.", fr: "Mer chaude (22-25°C), longues journées, prix pas encore au sommet. Hvar et Dubrovnik gérables, Plitvice verte et luxuriante. Réservez 2-3 mois à l'avance — la Croatie a pris cher après l'entrée dans l'UE et Schengen." } },
    shoulder: { months: { en: "April · October", fr: "Avril · octobre" }, description: { en: "Cool but pleasant for cities and parks. Islands have most restaurants and hotels closed, ferry schedules are reduced. Plitvice is dramatic in autumn colours. Half the tourist density of summer.", fr: "Frais mais agréable pour les villes et les parcs. Les îles ont la plupart des restos et hôtels fermés, les horaires de ferry sont réduits. Plitvice est spectaculaire dans les couleurs d'automne. Moitié de la densité touristique de l'été." } },
    avoid: { months: { en: "July – August", fr: "Juillet – août" }, description: { en: "Peak everything. Cruise ships dump 8,000 people on Dubrovnik's old town daily; Hvar's restaurants are unbookable; Plitvice queues are 2 hours. Prices double from June. Locals leave the cities.", fr: "Tout au maxi. Les croisières déversent 8 000 personnes par jour dans le vieux Dubrovnik ; les restos de Hvar sont incrésevables ; les files de Plitvice sont de 2h. Les prix doublent par rapport à juin. Les locaux fuient les villes." } },
  },
  mustSee: [
    { name: "Dubrovnik old town", region: { en: "Dalmatia", fr: "Dalmatie" }, description: { en: "Walled city on a peninsula — UNESCO since 1979, King's Landing in Game of Thrones. Walk the 2km city walls at 8am opening (€35, expensive but the canonical experience). Stay in the old town for one night to see it after the cruise crowds leave.", fr: "Cité fortifiée sur une presqu'île — UNESCO depuis 1979, Port-Réal dans Game of Thrones. Faites les 2 km de remparts à l'ouverture (8h, 35 €, cher mais incontournable). Dormez dans le vieux centre une nuit pour la voir après le départ des croisières." }, image: "/travel-guides/croatia/dubrovnik.jpg", imageAlt: { en: "Dubrovnik old town from Mount Srdj", fr: "Vieille ville de Dubrovnik vue du mont Srdj" }, mapsUrl: "https://maps.app.goo.gl/W4uHHvVQzbcZTQte9" },
    { name: "Plitvice Lakes", region: { en: "Lika-Senj", fr: "Lika-Senj" }, description: { en: "16 terraced lakes connected by waterfalls, UNESCO. 8-hour boardwalk circuit through impossible-looking turquoise water. Best at opening (7am) to avoid the tour buses. 2.5hr drive from Zagreb or Split.", fr: "16 lacs en terrasses reliés par des cascades, UNESCO. Boucle de 8h sur passerelles dans une eau turquoise irréelle. Idéal à l'ouverture (7h) pour éviter les bus de tour. À 2h30 de route de Zagreb ou Split." }, image: "/travel-guides/croatia/plitvice.jpg", imageAlt: { en: "Boardwalk over Plitvice lakes and waterfalls", fr: "Passerelle au-dessus des lacs et cascades de Plitvice" }, mapsUrl: "https://maps.app.goo.gl/JwBhTGGz5xkYZHFn8" },
    { name: "Split & Diocletian's Palace", region: { en: "Dalmatia", fr: "Dalmatie" }, description: { en: "A Roman imperial palace (built 305 CE) that turned into the city centre — people still live inside the 1,700-year-old walls. Climb the bell tower for the panorama, dinner in the Peristyle Square at sunset. Ferry hub for the Dalmatian islands.", fr: "Un palais impérial romain (bâti en 305) devenu centre-ville — des gens habitent encore dans les remparts vieux de 1 700 ans. Grimpez le clocher pour le panorama, dînez sur la place du Péristyle au coucher du soleil. Hub ferry pour les îles dalmates." }, image: "/travel-guides/croatia/split.jpg", imageAlt: { en: "Diocletian's Palace waterfront in Split", fr: "Front de mer du palais de Dioclétien à Split" }, mapsUrl: "https://maps.app.goo.gl/oJxXc4NkpUkXuLg17" },
    { name: "Hvar island", region: { en: "Dalmatia islands", fr: "Îles dalmates" }, description: { en: "The party-and-yacht island. Hvar town's Renaissance harbor + the Pakleni Islands (boat-taxi day trip for swimming). For quieter: Stari Grad on the north side, or the lavender-field interior. Ferry from Split (1hr).", fr: "L'île de la fête et des yachts. Le port Renaissance de la ville de Hvar + les îles Pakleni (taxi-bateau pour la journée baignade). Pour plus calme : Stari Grad au nord, ou l'intérieur lavandé. Ferry de Split (1h)." }, image: "/travel-guides/croatia/hvar.jpg", imageAlt: { en: "Hvar harbor with sailing boats", fr: "Port de Hvar avec voiliers" }, mapsUrl: "https://maps.app.goo.gl/y4DKBd7epVz4LphR8" },
    { name: "Rovinj", region: { en: "Istria", fr: "Istrie" }, description: { en: "Italian-feeling Venetian harbor town on the Istrian coast — pastel facades, narrow alleys, a bell tower on top of an island that became a peninsula. The most photogenic single street is Grisia, climbing to St Euphemia's. Less crowded than the Dalmatian coast.", fr: "Ville-port vénitienne aux allures italiennes sur la côte d'Istrie — façades pastel, ruelles étroites, un clocher au sommet d'une ancienne île devenue presqu'île. La rue la plus photogénique est Grisia, qui monte vers Sainte-Euphémie. Moins fréquentée que la côte dalmate." }, image: "/travel-guides/croatia/rovinj.jpg", imageAlt: { en: "Pastel houses of Rovinj harbor", fr: "Maisons pastel du port de Rovinj" }, mapsUrl: "https://maps.app.goo.gl/RsvHRWPALdJBV9Lt7" },
    { name: "Zagreb", region: { en: "Continental", fr: "Continentale" }, description: { en: "Croatia's underrated capital — Austro-Hungarian baroque, the funicular up to the Upper Town, St Mark's tile-roof church, the world's only Museum of Broken Relationships. 2 days is right; pair with Plitvice on the way south.", fr: "La capitale sous-cotée du pays — baroque austro-hongrois, funiculaire vers la Ville Haute, l'église Saint-Marc au toit en tuiles, l'unique Musée des Relations brisées du monde. 2 jours suffisent ; à combiner avec Plitvice en descendant vers le sud." }, image: "/travel-guides/croatia/zagreb.jpg", imageAlt: { en: "St Mark's church tile roof in Zagreb upper town", fr: "Toit en tuiles de l'église Saint-Marc dans la ville haute de Zagreb" }, mapsUrl: "https://maps.app.goo.gl/m8U6E1jW6Bcry7TC9" },
    { name: "Krka waterfalls", region: { en: "Šibenik-Knin", fr: "Šibenik-Knin" }, description: { en: "Plitvice's smaller cousin — fewer lakes, more swimmable waterfalls (until 2021 you could swim at Skradinski Buk; now banned but the lower lakes still allow). Half-day from Split or Šibenik. 90 minutes by car.", fr: "Le petit cousin de Plitvice — moins de lacs, plus de cascades baignables (jusqu'en 2021 on pouvait nager à Skradinski Buk ; désormais interdit mais les lacs en aval restent ouverts). Demi-journée depuis Split ou Šibenik. 1h30 en voiture." }, image: "/travel-guides/croatia/krka.jpg", imageAlt: { en: "Waterfalls and pools at Krka national park", fr: "Cascades et bassins du parc national de Krka" }, mapsUrl: "https://maps.app.goo.gl/PsuFcGsTKfLkA59U6" },
    { name: "Pula amphitheater", region: { en: "Istria", fr: "Istrie" }, description: { en: "One of the six largest Roman amphitheaters still standing — built in the 1st century AD, holds 23,000, hosted gladiator fights, now hosts the Pula Film Festival (July). The most intact in the world after the Colosseum.", fr: "L'un des six plus grands amphithéâtres romains encore debout — bâti au Ier siècle, 23 000 places, accueillait des combats de gladiateurs, abrite désormais le Festival du film de Pula (juillet). Le plus intact au monde après le Colisée." }, image: "/travel-guides/croatia/pula.jpg", imageAlt: { en: "Roman amphitheater in Pula, Croatia", fr: "Amphithéâtre romain de Pula, Croatie" }, mapsUrl: "https://maps.app.goo.gl/oNi8oZUmddBSn5pa9" },
    { name: "Zadar — sea organ & sunset", region: { en: "Dalmatia", fr: "Dalmatie" }, description: { en: "A sea-front sculpture (the Sea Organ) makes music from waves. Next to it, the Greeting to the Sun, a solar-powered light installation. Alfred Hitchcock called Zadar's sunsets 'the most beautiful in the world'. Underrated city-stop between Plitvice and Split.", fr: "Une sculpture en bord de mer (l'Orgue marin) joue de la musique avec les vagues. À côté, la Salutation au Soleil, installation lumineuse solaire. Hitchcock a qualifié les couchers de soleil de Zadar de « plus beaux du monde ». Étape sous-cotée entre Plitvice et Split." }, image: "/travel-guides/croatia/zadar.jpg", imageAlt: { en: "Zadar waterfront at sunset", fr: "Front de mer de Zadar au coucher du soleil" }, mapsUrl: "https://maps.app.goo.gl/u5UnTW3wfLpA2KcL9" },
    { name: "Korčula", region: { en: "Dalmatia islands", fr: "Îles dalmates" }, description: { en: "Marco Polo's (claimed) birthplace — a medieval walled town on the south coast of the island. Quieter alternative to Hvar; same Adriatic-blue water. 3 hours from Split by catamaran. Wineries inland (Pošip and Grk grapes are local).", fr: "Lieu de naissance (revendiqué) de Marco Polo — un bourg fortifié médiéval sur la côte sud de l'île. Alternative plus calme à Hvar ; même eau bleu adriatique. 3h en catamaran depuis Split. Caves à l'intérieur (cépages Pošip et Grk locaux)." }, image: "/travel-guides/croatia/korcula.jpg", imageAlt: { en: "Korčula old town walls and Adriatic sea", fr: "Remparts du vieux Korčula et mer Adriatique" }, mapsUrl: "https://maps.app.goo.gl/GjL6FXkrK7Y2YjE26" },
    { name: "Mljet & national parks", region: { en: "Dalmatia islands", fr: "Îles dalmates" }, description: { en: "Mljet is 70% national park — saltwater lakes with a Benedictine monastery on an island in a lake on an island in the sea. Walking and cycling only; perfect off-the-radar day. Combine with Korčula or Dubrovnik by catamaran.", fr: "Mljet est à 70 % parc national — lacs d'eau salée avec un monastère bénédictin sur une île, dans un lac, sur une île, en mer. Marche et vélo uniquement ; journée parfaitement hors-radar. À combiner avec Korčula ou Dubrovnik en catamaran." }, image: "/travel-guides/croatia/mljet-islands.jpg", imageAlt: { en: "Wooded coast of Mljet island Croatia", fr: "Côte boisée de l'île de Mljet, Croatie" }, mapsUrl: "https://maps.app.goo.gl/2HFy7B3VCBxbXqyz9" },
    { name: "Adriatic sailing route", region: { en: "Coast", fr: "Côte" }, description: { en: "Croatia is one of the world's great sailing destinations — sheltered, island-dense, predictable winds. Charter a skippered or bareboat yacht from Split or Trogir for €1,500–3,500/week per person (mid-range, sharing). Brač + Hvar + Vis + Korčula is the classic 7-day loop.", fr: "La Croatie est l'une des grandes destinations voile du monde — abritée, îles denses, vents prévisibles. Affrétez un voilier avec ou sans skipper depuis Split ou Trogir, 1 500-3 500 €/semaine par personne (moyen-de-gamme, en partagé). Brač + Hvar + Vis + Korčula est la boucle classique de 7 jours." }, image: "/travel-guides/croatia/sailing-route.jpg", imageAlt: { en: "Sailing yacht on the Croatian Adriatic", fr: "Voilier sur l'Adriatique croate" }, mapsUrl: "https://maps.app.goo.gl/zSm5dANThFq3kJBu7" },
  ],
  specialties: [
    { name: { en: "Adriatic seafood & peka", fr: "Fruits de mer & peka" }, category: "food", description: { en: "Grilled octopus, black risotto (with squid ink), brodet (fisherman's stew), and peka — meat or octopus slow-baked under a bell-shaped iron lid covered in coals. Order peka 2–3 hours in advance at any konoba (traditional tavern).", fr: "Poulpe grillé, risotto noir (à l'encre de seiche), brodet (ragoût de pêcheur) et peka — viande ou poulpe cuit lentement sous une cloche en fonte recouverte de braises. Commandez la peka 2-3 heures à l'avance dans n'importe quelle konoba." }, image: "/travel-guides/croatia/seafood.jpg", imageAlt: { en: "Grilled Adriatic seafood platter in Croatia", fr: "Plateau de fruits de mer adriatiques grillés en Croatie" } },
    { name: { en: "Istrian truffles", fr: "Truffes d'Istrie" }, category: "food", description: { en: "Istria's interior produces some of Europe's best white truffles (October–December) and black truffles (year-round). Motovun and Buzet are the truffle-hunting towns; Karlić Tartufi is the established producer. Truffle pasta in any tavern is €15–25.", fr: "L'intérieur de l'Istrie produit certaines des meilleures truffes blanches d'Europe (octobre-décembre) et noires (toute l'année). Motovun et Buzet sont les villages de la trouve ; Karlić Tartufi est le producteur de référence. Les pâtes à la truffe en taverne : 15-25 €." }, image: "/travel-guides/croatia/truffles.jpg", imageAlt: { en: "Fresh black truffles on a wooden board", fr: "Truffes noires fraîches sur planche en bois" } },
    { name: { en: "Olive oil & Mediterranean produce", fr: "Huile d'olive & produits méditerranéens" }, category: "food", description: { en: "Croatian olive oil regularly wins international competitions — Istrian and Dalmatian extra-virgin oils are at the level of the best in Italy and Spain. Buy from cooperative pressings; €15–30 for a 500ml bottle direct from the producer.", fr: "Les huiles d'olive croates gagnent régulièrement des concours internationaux — les extra-vierge d'Istrie et de Dalmatie sont au niveau des meilleures d'Italie ou d'Espagne. Achetez en pressoir coopératif ; 15-30 € la bouteille de 500 ml direct producteur." }, image: "/travel-guides/croatia/olive-oil.jpg", imageAlt: { en: "Croatian olive oil and Mediterranean produce", fr: "Huile d'olive croate et produits méditerranéens" } },
    { name: { en: "Croatian wine", fr: "Vin croate" }, category: "drink", description: { en: "Pošip (Korčula white), Plavac Mali (Pelješac red — ancestor of Zinfandel), Malvazija (Istrian white), Teran (Istrian red). House wine in any island konoba is €4–7 a half-litre and shockingly drinkable. Visit Pelješac's wineries by rental car.", fr: "Pošip (blanc de Korčula), Plavac Mali (rouge de Pelješac — ancêtre du Zinfandel), Malvazija (blanc d'Istrie), Teran (rouge d'Istrie). Le vin maison en konoba d'île coûte 4-7 € le demi-litre et est étonnamment bon. Visitez les caves de Pelješac en voiture." }, image: "/travel-guides/croatia/wine.jpg", imageAlt: { en: "Croatian wine in a glass on a Dalmatian terrace", fr: "Vin croate dans un verre sur une terrasse dalmate" } },
    { name: { en: "Sailing & island-hopping", fr: "Voile & îles" }, category: "experience", description: { en: "The Croatian coast is the world's most beginner-friendly sailing area — short hops between safe harbors, no big tides, predictable wind. Yacht week is a famous flotilla (Aug). Or hire a private skipper for €150/day on top of a charter.", fr: "La côte croate est la zone de voile la plus accessible aux débutants — courtes étapes entre ports sûrs, peu de marées, vent prévisible. Yacht Week est une flottille connue (août). Ou prenez un skipper privé à 150 €/jour en plus du charter." }, image: "/travel-guides/croatia/sailing-culture.jpg", imageAlt: { en: "Sailing yacht on the Adriatic with islands behind", fr: "Voilier sur l'Adriatique avec des îles en arrière-plan" } },
    { name: { en: "Game of Thrones tourism", fr: "Tourisme Game of Thrones" }, category: "experience", description: { en: "Dubrovnik = King's Landing. Walking tours hit the Iron Throne fountain, the Walk of Shame steps (Jesuit church), the Red Keep (Lovrijenac fortress). 2 hours, around €25. Tour the Trsteno Arboretum (10km north of Dubrovnik) for the King's Landing gardens.", fr: "Dubrovnik = Port-Réal. Les visites guidées passent par la fontaine du Trône de fer, les marches de la Marche de l'Expiation (église des jésuites), le Donjon Rouge (forteresse Lovrijenac). 2 heures, environ 25 €. Visitez l'arboretum de Trsteno (10 km au nord de Dubrovnik) pour les jardins de Port-Réal." }, image: "/travel-guides/croatia/game-of-thrones.jpg", imageAlt: { en: "Dubrovnik medieval walls used as King's Landing in Game of Thrones", fr: "Remparts médiévaux de Dubrovnik utilisés en Port-Réal dans Game of Thrones" } },
  ],
  regions: [
    { name: { en: "Dalmatia (Split, Dubrovnik)", fr: "Dalmatie (Split, Dubrovnik)" }, highlights: { en: "Split, Dubrovnik, Hvar, Korčula, Mljet, Brač", fr: "Split, Dubrovnik, Hvar, Korčula, Mljet, Brač" }, description: { en: "The classic Croatia — central and south coast. Most flights land at Split (SPU) or Dubrovnik (DBV). Ferry hub at Split connects all the major Dalmatian islands. Sailing capital of the country.", fr: "La Croatie classique — côte centrale et sud. La plupart des vols atterrissent à Split (SPU) ou Dubrovnik (DBV). Le hub ferry de Split relie toutes les grandes îles dalmates. Capitale de la voile du pays." } },
    { name: { en: "Istria", fr: "Istrie" }, highlights: { en: "Rovinj, Pula, Motovun, Poreč, Opatija", fr: "Rovinj, Pula, Motovun, Poreč, Opatija" }, description: { en: "The northern peninsula. Italian-feeling (was Venetian and later Italian until WWII), bilingual in places, truffles + olive oil + wine country. Pula airport (PUY) or fly into Trieste (TRS, Italy) — closer to Istria than Zagreb is.", fr: "La péninsule du nord. Ambiance italienne (vénitienne puis italienne jusqu'à la WWII), bilingue par endroits, pays des truffes + huile d'olive + vins. Aéroport de Pula (PUY) ou Trieste (TRS, Italie) — plus proche de l'Istrie que ne l'est Zagreb." } },
    { name: { en: "Zagreb & continental", fr: "Zagreb & continentale" }, highlights: { en: "Zagreb, Plitvice, Samobor, Varaždin", fr: "Zagreb, Plitvice, Samobor, Varaždin" }, description: { en: "Inland Croatia. Zagreb as base, day trip to Plitvice (2hr south), Samobor for weekend wine. Cooler year-round, snow in winter. Most travelers skip; the depth is in the hills.", fr: "L'intérieur du pays. Zagreb comme base, journée à Plitvice (2h au sud), Samobor pour le vin du week-end. Plus frais toute l'année, neige en hiver. La plupart des voyageurs zappent ; la profondeur est dans les collines." } },
    { name: { en: "Kvarner (Rijeka, Krk)", fr: "Kvarner (Rijeka, Krk)" }, highlights: { en: "Rijeka, Opatija, Krk island, Cres", fr: "Rijeka, Opatija, île de Krk, Cres" }, description: { en: "Between Istria and Dalmatia. Belle Époque Austro-Hungarian coastal towns (Opatija was the imperial getaway), large islands (Krk, Cres, Rab) reachable by bridge or short ferry. Often skipped — underrated.", fr: "Entre Istrie et Dalmatie. Stations balnéaires Belle Époque austro-hongroises (Opatija était la villégiature impériale), grandes îles (Krk, Cres, Rab) accessibles par pont ou ferry court. Souvent oubliée — sous-cotée." } },
    { name: { en: "Slavonia", fr: "Slavonie" }, highlights: { en: "Osijek, Vukovar, Đakovo, Kopački Rit", fr: "Osijek, Vukovar, Đakovo, Kopački Rit" }, description: { en: "Far east, on the Danube and Drava plains. Wine country (Graševina, Frankovka), wetlands wildlife (Kopački Rit nature park), heavy WWII and Yugoslav-wars history. Slow-travel territory; no coast.", fr: "Tout à l'est, dans la plaine du Danube et de la Drave. Région viticole (Graševina, Frankovka), faune des marais (parc naturel de Kopački Rit), histoire chargée WWII et guerres yougoslaves. Territoire de voyage lent ; pas de mer." } },
    { name: { en: "Inland mountains", fr: "Montagnes intérieures" }, highlights: { en: "Velebit, Risnjak, Paklenica climbing", fr: "Velebit, Risnjak, escalade à Paklenica" }, description: { en: "The karst limestone mountains that run parallel to the coast. Paklenica is Europe's main winter rock-climbing destination (December–March); Velebit national park is the deepest trekking area. Day-trippable from Zadar.", fr: "Les montagnes calcaires qui longent la côte. Paklenica est la principale destination européenne d'escalade hivernale (déc.-mars) ; le parc national de Velebit est la zone la plus profonde pour le trek. Accessible en journée depuis Zadar." } },
  ],
  itineraries: [
    { days: 7, title: { en: "Dalmatian coast — 7 days", fr: "Côte dalmate — 7 jours" }, summary: { en: "Split + Hvar + Dubrovnik + Plitvice on the way south.", fr: "Split + Hvar + Dubrovnik + Plitvice sur la route du sud." }, stops: { en: ["Day 1–3: Split + Diocletian's Palace + Krka day trip", "Day 4: Hvar (ferry from Split)", "Day 5–7: Dubrovnik (3 nights, walls walk, Mljet day trip)"], fr: ["Jour 1-3 : Split + palais de Dioclétien + journée Krka", "Jour 4 : Hvar (ferry depuis Split)", "Jour 5-7 : Dubrovnik (3 nuits, tour des remparts, journée Mljet)"] } },
    { days: 10, title: { en: "Plitvice + coast — 10 days", fr: "Plitvice + côte — 10 jours" }, summary: { en: "Add Plitvice and Zadar to the south coast loop.", fr: "Ajoute Plitvice et Zadar à la boucle côte sud." }, stops: { en: ["Day 1: Zagreb", "Day 2: Plitvice Lakes (drive from Zagreb)", "Day 3: Zadar (sunset at the sea organ)", "Day 4–6: Split + islands", "Day 7–10: Dubrovnik + Mljet + Korčula day trips"], fr: ["Jour 1 : Zagreb", "Jour 2 : lacs de Plitvice (depuis Zagreb)", "Jour 3 : Zadar (coucher de soleil à l'orgue marin)", "Jour 4-6 : Split + îles", "Jour 7-10 : Dubrovnik + journées Mljet et Korčula"] } },
    { days: 14, title: { en: "Coast + Istria — 14 days", fr: "Côte + Istrie — 14 jours" }, summary: { en: "Add the Istrian peninsula. Different feel; rental car needed for the loop.", fr: "Ajoute la péninsule d'Istrie. Ambiance différente ; voiture nécessaire pour la boucle." }, stops: { en: ["Day 1–2: Zagreb", "Day 3–5: Istria (Rovinj base, Pula day trip, Motovun truffle hunt)", "Day 6: Drive to Plitvice + overnight", "Day 7: Zadar", "Day 8–10: Split + Hvar", "Day 11–14: Dubrovnik + islands"], fr: ["Jour 1-2 : Zagreb", "Jour 3-5 : Istrie (base à Rovinj, journée Pula, chasse aux truffes à Motovun)", "Jour 6 : route pour Plitvice + nuit sur place", "Jour 7 : Zadar", "Jour 8-10 : Split + Hvar", "Jour 11-14 : Dubrovnik + îles"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 80, description: { en: "Hostel dorm or sobe (private room in a local home) (€30), konoba lunch + supermarket dinner (€20), buses + ferries (€15), park entry or boat trip (€15). Croatia got expensive post-Schengen — Slovenia and Albania are cheaper backpacker alternatives.", fr: "Dortoir d'auberge ou sobe (chambre chez l'habitant) (30 €), déjeuner en konoba + dîner au supermarché (20 €), bus + ferries (15 €), entrée de parc ou bateau (15 €). La Croatie est devenue chère après Schengen — la Slovénie et l'Albanie sont des alternatives plus accessibles." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 170, description: { en: "Boutique B&B or 3-star hotel (€110), one full sit-down dinner + casual lunch (€40), rental car or fast catamaran (€15), entries + day trips (€5). The right tier — Croatia mid-range has caught up with Italy.", fr: "B&B de charme ou hôtel 3 étoiles (110 €), un dîner attablé + déjeuner décontracté (40 €), voiture ou catamaran rapide (15 €), entrées + journées (5 €). Le bon équilibre — le moyen-de-gamme croate a rattrapé l'italien." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 360, description: { en: "Luxury boutique hotel in Dubrovnik old town or Hvar (€230), one fine-dining or chef's-counter dinner (€100), private transfer or hired skipper (€20), private boat day or guide (€10). Honeymoon and milestone-trip tier.", fr: "Hôtel boutique de luxe dans le vieux Dubrovnik ou à Hvar (230 €), un dîner gastronomique ou comptoir-chef (100 €), transfert privé ou skipper (20 €), bateau ou guide en journée (10 €). Tier lune de miel et anniversaire." } },
    ],
    note: { en: "Per person, excluding international flights. Euro since 2023 — no more kuna. Cards work everywhere; cash useful in konobas and rural areas. Ferries on Jadrolinija and Krilo; book online in summer 4–6 weeks ahead, especially the catamaran routes from Split.", fr: "Par personne, hors vol international. Euro depuis 2023 — adieu le kuna. Carte partout ; cash utile en konobas et zones rurales. Ferries Jadrolinija et Krilo ; en été, réservez en ligne 4 à 6 semaines à l'avance, surtout pour les catamarans depuis Split." },
  },
  tips: [
    { do: true, text: { en: "Book Plitvice and Krka tickets online with timed entry. Both parks now cap daily visitors; walk-ups can be denied entry on busy days. Plitvice opens at 7am — the first slot is the best for empty boardwalks.", fr: "Réservez Plitvice et Krka en ligne avec créneau horaire. Les deux parcs plafonnent désormais le nombre quotidien ; sans résa, l'entrée peut être refusée. Plitvice ouvre à 7h — le premier créneau est le mieux pour des passerelles vides." } },
    { do: true, text: { en: "Stay in old-town apartments (Dubrovnik, Hvar town, Trogir). Hotels are 30–50% more expensive and farther out. Try Airbnb, Booking, or local agencies — sobe ('rooms') signs in windows are the local equivalent of B&Bs and often cheaper.", fr: "Logez dans les apparts en vieille ville (Dubrovnik, Hvar, Trogir). Les hôtels sont 30-50 % plus chers et plus loin. Essayez Airbnb, Booking ou les agences locales — les panneaux « sobe » (chambres) aux fenêtres sont l'équivalent des B&B et souvent moins chers." } },
    { do: false, text: { en: "Don't visit Dubrovnik in July–August unless you're willing to leave the old town by 9am and not come back until after 7pm. Cruise ships dock 2–4 a day, releasing 6,000–10,000 day-trippers at once. Stay outside the walls (Lapad or Pile area) and enter on cruise-free days.", fr: "Ne visitez pas Dubrovnik en juillet-août sauf si vous êtes prêt à quitter le vieux centre avant 9h et n'y revenir qu'après 19h. Les croisières débarquent 2-4 par jour, lâchant 6 000-10 000 touristes journée en même temps. Logez hors des remparts (Lapad ou Pile) et entrez les jours sans croisière." } },
    { do: true, text: { en: "Take the catamaran (Krilo, TP Line) over the slower car ferry (Jadrolinija) for island hops if you don't have a car. 1.5hr Split-Hvar by catamaran vs 2hr car ferry — and the catamaran lands you in Hvar town, the car ferry in Stari Grad (1hr from town).", fr: "Prenez le catamaran (Krilo, TP Line) plutôt que le ferry voiture (Jadrolinija) pour les îles si vous n'avez pas de voiture. 1h30 Split-Hvar en catamaran vs 2h en ferry voiture — et le catamaran vous dépose à Hvar ville, le ferry à Stari Grad (1h de la ville)." } },
    { do: false, text: { en: "Don't book a Game of Thrones tour from a cruise-ship pier. They're rushed and expensive. Walking tours from Pile Gate (€20–25) with a local guide are smaller, more thorough, and you'll actually hear the guide.", fr: "Ne réservez pas un tour Game of Thrones depuis un quai de croisière. Ils sont rushés et chers. Les visites guidées depuis la Porte Pile (20-25 €) avec un guide local sont plus petites, plus complètes, et on entend le guide." } },
    { do: true, text: { en: "Drink the tap water. Croatia has excellent water quality, especially in the karst regions; locals drink it everywhere. Saves €5–10/day on bottled water.", fr: "Buvez l'eau du robinet. Croatie a une excellente qualité d'eau, surtout dans les régions karstiques ; les locaux la boivent partout. Économie de 5-10 €/jour sur les bouteilles." } },
    { do: true, text: { en: "Tip 10% at restaurants — appreciated but not mandatory. Service is included; rounding up to the next 5 euros is the local norm. Bars and casual cafés: round up only.", fr: "Pourboire 10 % au resto — apprécié mais pas obligatoire. Le service est inclus ; arrondir au 5 € suivant est la norme locale. Bars et cafés décontractés : arrondi seul." } },
    { do: false, text: { en: "Don't drive into Dubrovnik or Split old towns. They're pedestrian; the few cars allowed are residents. Park at Pile Gate (Dubrovnik) or in one of Split's underground lots and walk in.", fr: "Ne conduisez pas dans les vieux centres de Dubrovnik ou Split. Ils sont piétons ; les rares voitures sont celles des résidents. Garez-vous à la Porte Pile (Dubrovnik) ou dans un parking souterrain de Split et entrez à pied." } },
  ],
  related: ["italy", "greece"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 12. Turkey
// ---------------------------------------------------------------------------
const turkey: CountryGuide = {
  slug: { en: "turkey", fr: "turquie" },
  country: { en: "Turkey", fr: "Turquie" },
  continent: "middle-east",
  hero: {
    image: "/travel-guides/turkey/hero.jpg",
    imageAlt: { en: "Hot-air balloons over Cappadocia fairy chimneys at sunrise", fr: "Montgolfières au-dessus des cheminées de fée de Cappadoce au lever du soleil" },
    tag: { en: "Country guide · Middle East", fr: "Guide pays · Moyen-Orient" },
  },
  meta: {
    title: { en: "Turkey Travel Guide 2026 — Istanbul, Cappadocia & How to Plan", fr: "Guide voyage Turquie 2026 — Istanbul, Cappadoce & comment partir" },
    description: { en: "Real Turkey travel guide for 2026: best season, Istanbul to Cappadocia, regional food, honest budgets, cultural do's and don'ts.", fr: "Guide voyage Turquie 2026, sans bla-bla : meilleure saison, Istanbul à Cappadoce, cuisine, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "Turkey is two continents under one flag. Istanbul straddles them — Asian side, European side, the Bosphorus between. Cappadocia's stone valleys look like a Mars colony. Ephesus is the most intact Roman city outside Italy. Pamukkale's white travertine pools look photoshopped. The Mediterranean coast (the 'Turkish Riviera') runs from Antalya to Bodrum.",
      "First trip: Istanbul (4 days) + Cappadocia (3 days, including a balloon flight) + Ephesus or Pamukkale (2 days). Second trip: the south coast (Antalya, Olympos, Fethiye), the southeast (Mardin, Gaziantep, Mt Nemrut), or a deeper Cappadocia.",
      "Two things to know. Turkey has been struggling with inflation since 2021 — prices in lira look terrifying but are still affordable in euros. And the post-2016 political climate means a few topics (Erdoğan, Kurds, Cyprus, the Armenian genocide) are sensitive — don't open them with strangers. Tourist infrastructure is excellent and very safe.",
    ],
    fr: [
      "La Turquie, c'est deux continents sous un même drapeau. Istanbul les chevauche — côté asiatique, côté européen, le Bosphore entre. Les vallées de pierre de Cappadoce ressemblent à une colonie martienne. Éphèse est la cité romaine la plus intacte hors d'Italie. Les bassins en travertin blanc de Pamukkale paraissent photoshoppés. La côte méditerranéenne (la « Riviera turque ») court d'Antalya à Bodrum.",
      "Première fois : Istanbul (4 jours) + Cappadoce (3 jours, montgolfière incluse) + Éphèse ou Pamukkale (2 jours). Deuxième fois : la côte sud (Antalya, Olympos, Fethiye), le sud-est (Mardin, Gaziantep, Mt Nemrut), ou une Cappadoce plus en profondeur.",
      "Deux trucs à savoir. La Turquie traverse une crise inflationniste depuis 2021 — les prix en lira font peur mais restent abordables en euros. Et le climat politique post-2016 rend quelques sujets (Erdoğan, Kurdes, Chypre, génocide arménien) sensibles — ne les abordez pas avec des inconnus. L'infrastructure touristique est excellente et très sûre.",
    ],
  },
  quickFacts: {
    capital: { en: "Ankara (Istanbul is the largest city)", fr: "Ankara (Istanbul est la plus grande ville)" },
    language: { en: "Turkish · English in tourist zones", fr: "Turc · anglais en zone touristique" },
    currency: { code: "TRY", symbol: "₺" },
    timezone: "TRT (UTC+3)",
    visa: { en: "E-visa or visa-free depending on nationality — EU passports visa-free 90 days; UK/US/Canada/Australia need e-visa (US$50 online, 5 minutes).", fr: "E-visa ou sans visa selon la nationalité — UE sans visa 90 jours ; Royaume-Uni/États-Unis/Canada/Australie ont besoin d'un e-visa (50 US$ en ligne, 5 minutes)." },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~85M",
  },
  bestSeason: {
    best: { months: { en: "April – May · September – October", fr: "Avril – mai · septembre – octobre" }, description: { en: "Mild everywhere — Istanbul 20°C, Cappadocia 15–22°C, Mediterranean coast 22–28°C. Cappadocia balloons fly nearly every day. Crowds manageable; prices off-peak.", fr: "Doux partout — Istanbul 20°C, Cappadoce 15-22°C, côte méditerranéenne 22-28°C. Les montgolfières de Cappadoce volent presque tous les jours. Affluence gérable ; prix hors saison." } },
    shoulder: { months: { en: "March · November", fr: "Mars · novembre" }, description: { en: "Cool in Istanbul (10–15°C), cold and snowy in Cappadocia (which is also beautiful), coast still mild. Half the tourist density of summer.", fr: "Frais à Istanbul (10-15°C), froid et neigeux en Cappadoce (qui est aussi superbe), côte encore douce. Moitié de la densité touristique de l'été." } },
    avoid: { months: { en: "July – August", fr: "Juillet – août" }, description: { en: "Brutally hot inland (40°C+ in Cappadocia), beach towns triple-priced, Hagia Sophia queues 90+ minutes. Coast still functional but packed.", fr: "Brutalement chaud à l'intérieur (40°C+ en Cappadoce), stations balnéaires aux prix triplés, files de Sainte-Sophie à 1h30+. La côte reste fonctionnelle mais saturée." } },
  },
  mustSee: [
    { name: "Cappadocia — Göreme & balloons", region: { en: "Central Anatolia", fr: "Anatolie centrale" }, description: { en: "Fairy-chimney rock formations carved into cave hotels, ancient cave churches with Byzantine frescoes. The 30-minute hot-air balloon flight at sunrise (€150–200) is the bucket-list experience — book 2–4 weeks ahead. 1-hour flight to Kayseri (ASR) or Nevşehir (NAV) from Istanbul.", fr: "Formations rocheuses en cheminées de fée creusées en hôtels-cavernes, anciennes églises rupestres aux fresques byzantines. Le vol en montgolfière de 30 minutes au lever du soleil (150-200 €) est l'expérience-référence — à réserver 2-4 semaines à l'avance. 1h de vol pour Kayseri (ASR) ou Nevşehir (NAV) depuis Istanbul." }, image: "/travel-guides/turkey/cappadocia.jpg", imageAlt: { en: "Hot-air balloons over Cappadocia fairy chimneys", fr: "Montgolfières au-dessus des cheminées de fée de Cappadoce" }, mapsUrl: "https://maps.app.goo.gl/Lwn6BqJzJxGcVHbLA" },
    { name: "Hagia Sophia", region: { en: "Istanbul", fr: "Istanbul" }, description: { en: "Byzantine cathedral (537) → mosque → museum → mosque again (2020). The most architecturally significant building in Turkey. Entry is free for the mosque part but the upper gallery (Christian mosaics) now requires a separate €25 ticket. Visit between prayer times.", fr: "Cathédrale byzantine (537) → mosquée → musée → mosquée à nouveau (2020). Le bâtiment le plus significatif architecturalement du pays. La salle de prière est gratuite mais la galerie supérieure (mosaïques chrétiennes) demande désormais un billet séparé à 25 €. Visitez entre les prières." }, image: "/travel-guides/turkey/hagia-sophia.jpg", imageAlt: { en: "Hagia Sophia exterior at sunset, Istanbul", fr: "Extérieur de Sainte-Sophie au coucher du soleil, Istanbul" }, mapsUrl: "https://maps.app.goo.gl/CkrAaQB9pVtJfpyL9" },
    { name: "Blue Mosque (Sultan Ahmed)", region: { en: "Istanbul", fr: "Istanbul" }, description: { en: "Six minarets, blue Iznik tiles, an active mosque open to non-Muslims outside prayer. Across the Hippodrome from Hagia Sophia — visit both in a day. Free entry; dress modestly (scarves provided for women).", fr: "Six minarets, carreaux d'Iznik bleus, mosquée active ouverte aux non-musulmans hors prière. En face de Sainte-Sophie, de l'autre côté de l'Hippodrome — à faire dans la journée. Entrée libre ; tenue sobre (foulards fournis pour les femmes)." }, image: "/travel-guides/turkey/blue-mosque.jpg", imageAlt: { en: "Six minarets of the Blue Mosque in Istanbul", fr: "Six minarets de la Mosquée bleue d'Istanbul" }, mapsUrl: "https://maps.app.goo.gl/h2VKVPzZqGn5tYZ4A" },
    { name: "Pamukkale", region: { en: "Aegean Region", fr: "Région égéenne" }, description: { en: "White travertine terraces of warm mineral pools cascading down a hillside — UNESCO. Hierapolis ancient city ruins on top. Walk barefoot only (mandatory) to protect the calcium. Best at sunset; pair with Ephesus 2 hours away.", fr: "Terrasses en travertin blanc, bassins d'eau minérale tiède en cascade — UNESCO. Les ruines de Hierapolis au sommet. Marche pieds nus obligatoire pour protéger le calcaire. Idéal au coucher du soleil ; à combiner avec Éphèse à 2h." }, image: "/travel-guides/turkey/pamukkale.jpg", imageAlt: { en: "White travertine terraces of Pamukkale", fr: "Terrasses en travertin blanc de Pamukkale" }, mapsUrl: "https://maps.app.goo.gl/EXAKxZjmczswSdcKA" },
    { name: "Ephesus", region: { en: "Aegean Region", fr: "Région égéenne" }, description: { en: "The Library of Celsus, the Great Theatre (24,000 seats), terraced houses with mosaics — one of the largest preserved Roman cities outside Italy. 1.5hr drive from Izmir airport. Combine with the House of the Virgin Mary on the hilltop above.", fr: "La Bibliothèque de Celsus, le Grand Théâtre (24 000 places), maisons en terrasses aux mosaïques — l'une des plus grandes cités romaines préservées hors d'Italie. À 1h30 de l'aéroport d'Izmir. À combiner avec la Maison de la Vierge Marie sur la colline au-dessus." }, image: "/travel-guides/turkey/ephesus.jpg", imageAlt: { en: "Library of Celsus facade at Ephesus", fr: "Façade de la Bibliothèque de Celsus à Éphèse" }, mapsUrl: "https://maps.app.goo.gl/sLB2QXxgK6Ds2k4Q6" },
    { name: "Bosphorus & Galata", region: { en: "Istanbul", fr: "Istanbul" }, description: { en: "Take a 2-hour Bosphorus cruise from Eminönü dock — pass the Dolmabahçe Palace, the Bosphorus Bridge between Europe and Asia, the Anadolu Hisarı fortress. Sunset trip is the move. Galata Tower (climb or watch from below) closes the night.", fr: "Prenez une croisière de 2h sur le Bosphore depuis Eminönü — vous passerez le palais Dolmabahçe, le pont du Bosphore entre Europe et Asie, la forteresse d'Anadolu Hisarı. Au coucher du soleil, c'est mieux. La tour de Galata (à grimper ou observer d'en bas) clôture la soirée." }, image: "/travel-guides/turkey/bosphorus.jpg", imageAlt: { en: "Bosphorus strait with Galata Tower in Istanbul", fr: "Détroit du Bosphore avec la tour de Galata, Istanbul" }, mapsUrl: "https://maps.app.goo.gl/yexbXyykcRhBmGzn8" },
    { name: "Antalya old town (Kaleici)", region: { en: "Mediterranean", fr: "Méditerranée" }, description: { en: "The Mediterranean coast hub. Roman Hadrian's Gate, Ottoman wooden houses, a marina with restaurants. Day trips: ancient Termessos in the mountains, Düden waterfalls, Phaselis ruins on the coast. 1-hour flight from Istanbul.", fr: "Le hub de la côte méditerranéenne. Porte d'Hadrien romaine, maisons en bois ottomanes, marina avec restaurants. Excursions : Termessos antique dans les montagnes, cascades de Düden, ruines de Phaselis sur la côte. 1h de vol d'Istanbul." }, image: "/travel-guides/turkey/antalya.jpg", imageAlt: { en: "Antalya old town with marina and cliffs", fr: "Vieille ville d'Antalya avec marina et falaises" }, mapsUrl: "https://maps.app.goo.gl/v5pPoyURTUNUYqMS6" },
    { name: "Grand Bazaar & Spice Market", region: { en: "Istanbul", fr: "Istanbul" }, description: { en: "4,000 shops in 61 covered streets — opened 1455, the world's first and biggest covered market. The Spice Bazaar (Mısır Çarşısı) 10 minutes away is smaller and more navigable. Bargain hard; tea is offered if they like you.", fr: "4 000 boutiques sur 61 rues couvertes — ouvert depuis 1455, le premier et le plus grand marché couvert du monde. Le marché aux Épices (Mısır Çarşısı) à 10 minutes est plus petit et plus navigable. Marchandez ferme ; le thé est offert quand vous leur plaisez." }, image: "/travel-guides/turkey/grand-bazaar.jpg", imageAlt: { en: "Glass lanterns at the Grand Bazaar Istanbul", fr: "Lanternes en verre au Grand Bazar d'Istanbul" }, mapsUrl: "https://maps.app.goo.gl/dXJsZQKkXcYpPdcF8" },
    { name: "Topkapi Palace", region: { en: "Istanbul", fr: "Istanbul" }, description: { en: "The Ottoman sultans' residence for 400 years. Four courtyards, the imperial Harem (separate ticket, worth it), the Treasury with the Topkapi Dagger and the 86-carat Spoonmaker's Diamond. Allow 3 hours minimum.", fr: "La résidence des sultans ottomans pendant 400 ans. Quatre cours, le Harem impérial (billet séparé, ça vaut le coup), le Trésor avec le Poignard de Topkapi et le diamant de l'Orfèvre (86 carats). Comptez 3h minimum." }, image: "/travel-guides/turkey/topkapi.jpg", imageAlt: { en: "Topkapi Palace tiled interior", fr: "Intérieur en faïence du palais de Topkapi" }, mapsUrl: "https://maps.app.goo.gl/SqXjmkERsfBcuyEW8" },
    { name: "Mt Nemrut stone heads", region: { en: "Southeast Anatolia", fr: "Anatolie du Sud-Est" }, description: { en: "Giant stone heads on a mountain summit — built by King Antiochus I in 62 BCE as a tomb-sanctuary, UNESCO. Visit at sunrise or sunset for the postcard light. Hard to reach (overnight bus from Cappadocia or fly to Adıyaman); for second-trip travelers.", fr: "Têtes de pierre géantes au sommet d'une montagne — construites par le roi Antiochos Ier en 62 av. J.-C. comme tombeau-sanctuaire, UNESCO. À voir au lever ou coucher du soleil pour la lumière carte postale. Difficile d'accès (bus de nuit depuis la Cappadoce ou vol pour Adıyaman) ; pour les voyageurs d'une deuxième fois." }, image: "/travel-guides/turkey/mt-nemrut.jpg", imageAlt: { en: "Giant stone heads at Mt Nemrut summit", fr: "Têtes de pierre géantes au sommet du mont Nemrut" }, mapsUrl: "https://maps.app.goo.gl/EzJ4uvjwd6yzJq6F7" },
    { name: "Fethiye, Ölüdeniz, Lycian Way", region: { en: "Mediterranean coast", fr: "Côte méditerranéenne" }, description: { en: "Turquoise Mediterranean coast — Ölüdeniz lagoon (the iconic blue-lagoon-with-paragliders shot), Butterfly Valley accessible only by boat, the 540km Lycian Way hiking trail starting nearby. Best May–June and September.", fr: "Côte méditerranéenne turquoise — lagon d'Ölüdeniz (la photo emblématique du lagon bleu avec les parapentes), la vallée des Papillons accessible seulement en bateau, le sentier de la Voie lycienne de 540 km qui part juste à côté. Idéal mai-juin et septembre." }, image: "/travel-guides/turkey/fethiye-coast.jpg", imageAlt: { en: "Turquoise lagoon of Ölüdeniz with paragliders", fr: "Lagon turquoise d'Ölüdeniz avec parapentes" }, mapsUrl: "https://maps.app.goo.gl/8FXEpQXspSqQHK1L9" },
    { name: "Underground cities (Derinkuyu)", region: { en: "Cappadocia", fr: "Cappadoce" }, description: { en: "Derinkuyu is 8 levels underground, could shelter 20,000 people — used by early Christians to hide from Roman persecution. Open to visit; not for the claustrophobic. 40 minutes from Göreme.", fr: "Derinkuyu compte 8 niveaux souterrains, pouvait abriter 20 000 personnes — utilisée par les premiers chrétiens pour échapper aux persécutions romaines. Ouverte à la visite ; pas pour les claustrophobes. À 40 minutes de Göreme." }, image: "/travel-guides/turkey/topkapi.jpg", imageAlt: { en: "Underground city tunnels in Cappadocia", fr: "Tunnels d'une cité souterraine en Cappadoce" }, mapsUrl: "https://maps.app.goo.gl/k6CYV81DyKsMYAen8" },
  ],
  specialties: [
    { name: { en: "Kebabs & grilled meats", fr: "Kebabs & grillades" }, category: "food", description: { en: "Adana kebab (spicy minced lamb on a sword skewer), Iskender kebab (lamb shavings on bread with yogurt and butter, invented in Bursa), shish kebab (cubes on skewers), döner (rotating spit, sliced into bread). Every region has its own variant.", fr: "Adana kebab (agneau haché épicé sur brochette-épée), Iskender kebab (lamelles d'agneau sur pain avec yaourt et beurre, inventé à Bursa), shish kebab (cubes sur brochettes), döner (broche rotative tranchée dans le pain). Chaque région a sa variante." }, image: "/travel-guides/turkey/kebab.jpg", imageAlt: { en: "Turkish kebab platter with grilled meats", fr: "Plateau de kebabs turcs avec grillades" } },
    { name: { en: "Baklava & Turkish sweets", fr: "Baklava & douceurs turques" }, category: "food", description: { en: "Layers of phyllo + pistachios + honey syrup. Gaziantep in the southeast is the baklava world capital — Imam Çağdaş is the pilgrimage shop. Locum (Turkish delight), kunefe (stretchy cheese soaked in syrup), dondurma (chewy goat-milk ice cream) round out the sweets.", fr: "Couches de pâte filo + pistaches + sirop au miel. Gaziantep au sud-est est la capitale mondiale du baklava — Imam Çağdaş est la boutique-pélerinage. Le loukoum, le künefe (fromage filant noyé de sirop), la dondurma (glace au lait de chèvre élastique) complètent les douceurs." }, image: "/travel-guides/turkey/baklava.jpg", imageAlt: { en: "Tray of Turkish baklava with pistachios", fr: "Plateau de baklava turc aux pistaches" } },
    { name: { en: "Çay (Turkish tea)", fr: "Çay (thé turc)" }, category: "drink", description: { en: "Black tea grown on the Black Sea coast, brewed strong in a two-tier kettle, served scalding hot in tulip-shaped glasses with sugar cubes. Drunk all day, everywhere, free in carpet shops. Average Turk drinks 3kg of tea per year — the world's highest per capita.", fr: "Thé noir cultivé sur la côte de la mer Noire, infusé fort dans une théière à deux étages, servi brûlant dans des verres tulipe avec des sucres. Bu toute la journée, partout, offert dans les magasins de tapis. Le Turc moyen consomme 3 kg de thé par an — le plus haut au monde." }, image: "/travel-guides/turkey/turkish-tea.jpg", imageAlt: { en: "Turkish çay in tulip-shaped glasses", fr: "Çay turc dans des verres tulipe" } },
    { name: { en: "Turkish coffee", fr: "Café turc" }, category: "drink", description: { en: "Unfiltered, finely ground coffee boiled in a copper cezve, served in tiny cups with the grounds settled at the bottom (UNESCO heritage). Drunk slowly, traditionally followed by reading the grounds for fortune-telling. Order az şekerli (lightly sweet) or orta (medium).", fr: "Café non filtré, finement moulu, bouilli dans un cezve en cuivre, servi en petite tasse avec le marc au fond (patrimoine UNESCO). Bu lentement, suivi traditionnellement de la lecture du marc pour la bonne aventure. Commandez az şekerli (peu sucré) ou orta (moyen)." }, image: "/travel-guides/turkey/turkish-coffee.jpg", imageAlt: { en: "Turkish coffee in copper cezve", fr: "Café turc dans un cezve en cuivre" } },
    { name: { en: "Hammam", fr: "Hammam" }, category: "experience", description: { en: "The Turkish bath — a centuries-old ritual. Marble hot room, body scrub with kese mitt, foam massage. Çemberlitaş (1584) and Cağaloğlu (1741) in Istanbul are the historic ones (€40–80). Lighter, gentler tourist hammams in modern hotels.", fr: "Le bain turc — rituel séculaire. Salle chaude en marbre, gommage au gant kese, massage à la mousse. Çemberlitaş (1584) et Cağaloğlu (1741) à Istanbul sont les historiques (40-80 €). Hammams touristiques plus doux dans les hôtels modernes." }, image: "/travel-guides/turkey/hammam.jpg", imageAlt: { en: "Marble interior of a Turkish hammam", fr: "Intérieur en marbre d'un hammam turc" } },
    { name: { en: "Whirling dervishes (Sufi sema)", fr: "Derviches tourneurs (sema soufi)" }, category: "art", description: { en: "Ritual dance of Mevlevi Sufi order — dervishes spin to reach divine ecstasy. The original 700-year-old ceremony is in Konya (Rumi's tomb) every December. Year-round tourist-friendly performances in Istanbul (Galata Mevlevi House, Sirkeci train station) for €25–40.", fr: "Danse rituelle de l'ordre soufi mevlevi — les derviches tournent pour atteindre l'extase divine. La cérémonie originelle, vieille de 700 ans, a lieu à Konya (tombeau de Rumi) chaque décembre. Spectacles touristiques toute l'année à Istanbul (maison mevlevi de Galata, gare de Sirkeci) pour 25-40 €." }, image: "/travel-guides/turkey/dervishes.jpg", imageAlt: { en: "Whirling dervish performing the Sufi sema", fr: "Derviche tourneur exécutant le sema soufi" } },
    { name: { en: "Carpets & Iznik tiles", fr: "Tapis & faïences d'Iznik" }, category: "craft", description: { en: "Hand-knotted carpets and kilims are everywhere — Cappadocia and Konya are major regions. Expect long, theatrical sales sessions with apple tea. Iznik tiles (cobalt blue, turquoise, coral red) decorate every mosque interior; small workshops in Iznik town (2hr from Istanbul) still produce them.", fr: "Tapis et kilims noués à la main partout — Cappadoce et Konya sont les grandes régions. Préparez-vous à de longues sessions de vente théâtrales arrosées de thé à la pomme. Les carreaux d'Iznik (bleu cobalt, turquoise, rouge corail) décorent l'intérieur de chaque mosquée ; des ateliers à Iznik (2h d'Istanbul) en produisent encore." }, image: "/travel-guides/turkey/carpets.jpg", imageAlt: { en: "Hand-knotted Turkish carpets in a shop", fr: "Tapis turcs noués à la main dans une boutique" } },
  ],
  regions: [
    { name: { en: "Istanbul & Marmara", fr: "Istanbul & Marmara" }, highlights: { en: "Istanbul, Bursa, Edirne", fr: "Istanbul, Bursa, Edirne" }, description: { en: "The gateway. Most flights land at Istanbul Airport (IST) or Sabiha Gökçen (SAW, Asian side). Stay in Sultanahmet for the monument core, or in Beyoğlu/Karaköy for trendy old buildings. The Marmara region also includes Bursa (early Ottoman capital) and Edirne (Ottoman architecture).", fr: "La porte d'entrée. La plupart des vols atterrissent à Istanbul Airport (IST) ou Sabiha Gökçen (SAW, côté asiatique). Logez à Sultanahmet pour le cœur monumental, ou à Beyoğlu/Karaköy pour les bâtiments anciens branchés. La région Marmara inclut aussi Bursa (première capitale ottomane) et Edirne (architecture ottomane)." } },
    { name: { en: "Cappadocia & Central Anatolia", fr: "Cappadoce & Anatolie centrale" }, highlights: { en: "Göreme, Üçhisar, Konya, underground cities", fr: "Göreme, Üçhisar, Konya, cités souterraines" }, description: { en: "The 'Mars on Earth' interior. Göreme as base for the hot-air-balloon scene and cave hotels. Konya 3hr south for Sufi heritage. Fly to Kayseri (ASR) or Nevşehir (NAV) from Istanbul (1hr).", fr: "L'intérieur « Mars sur Terre ». Göreme comme base pour les montgolfières et les hôtels-cavernes. Konya à 3h au sud pour l'héritage soufi. Vol pour Kayseri (ASR) ou Nevşehir (NAV) depuis Istanbul (1h)." } },
    { name: { en: "Aegean coast", fr: "Côte égéenne" }, highlights: { en: "Izmir, Ephesus, Pamukkale, Bodrum, Çeşme", fr: "Izmir, Éphèse, Pamukkale, Bodrum, Çeşme" }, description: { en: "Greek-feeling: Greek-speaking before 1923, lots of ancient Greek ruins. Izmir (IZM) is the airline hub. Pair Ephesus + Pamukkale + a coastal beach (Çeşme or Alaçatı) over 3–4 days.", fr: "Ambiance grecque : on parlait grec avant 1923, beaucoup de ruines grecques antiques. Izmir (IZM) est le hub aérien. Combinez Éphèse + Pamukkale + une plage (Çeşme ou Alaçatı) sur 3-4 jours." } },
    { name: { en: "Mediterranean (Turkish Riviera)", fr: "Méditerranée (Riviera turque)" }, highlights: { en: "Antalya, Olympos, Fethiye, Ölüdeniz, Kalkan, Lycian Way", fr: "Antalya, Olympos, Fethiye, Ölüdeniz, Kalkan, Voie lycienne" }, description: { en: "Beach, ancient ruins, hiking. Antalya (AYT) airport is the gateway. The Lycian Way is the long-distance hiking dream (540km, weeks); for day-hikers, day sections from Kabak or Kaş.", fr: "Plage, ruines antiques, randonnée. L'aéroport d'Antalya (AYT) est la porte d'entrée. La Voie lycienne est le rêve du randonneur (540 km, des semaines) ; pour les randos d'une journée, des tronçons depuis Kabak ou Kaş." } },
    { name: { en: "Black Sea", fr: "Mer Noire" }, highlights: { en: "Trabzon, Sumela Monastery, Rize tea hills", fr: "Trabzon, monastère de Sumela, collines à thé de Rize" }, description: { en: "Northeastern coast — cooler, wetter, greener than the rest of Turkey. Sumela Monastery clings to a cliff. Rize is the tea-growing region. Mostly Turkish tourists; few internationals.", fr: "Côte nord-est — plus frais, plus humide, plus vert que le reste. Le monastère de Sumela s'accroche à une falaise. Rize est la région de culture du thé. Surtout des touristes turcs ; peu d'étrangers." } },
    { name: { en: "Southeast (Gaziantep, Mardin)", fr: "Sud-Est (Gaziantep, Mardin)" }, highlights: { en: "Gaziantep, Mardin, Mt Nemrut, Şanlıurfa, Göbekli Tepe", fr: "Gaziantep, Mardin, Mont Nemrut, Şanlıurfa, Göbekli Tepe" }, description: { en: "Where Turkey starts looking like Mesopotamia. Gaziantep for food (baklava capital + pistachios), Mardin's stone old city overlooking the Mesopotamian plain, Göbekli Tepe (11,000 years old, oldest known temple). Less touristed; for second-trip travelers.", fr: "Là où la Turquie commence à ressembler à la Mésopotamie. Gaziantep pour la cuisine (capitale du baklava + pistaches), la vieille ville de pierre de Mardin surplombant la plaine mésopotamienne, Göbekli Tepe (11 000 ans, le plus ancien temple connu). Moins touristique ; pour une deuxième visite." } },
  ],
  itineraries: [
    { days: 7, title: { en: "Istanbul + Cappadocia — 7 days", fr: "Istanbul + Cappadoce — 7 jours" }, summary: { en: "The two-city classic. 1-hour flight between them.", fr: "Le classique deux villes. 1h de vol entre les deux." }, stops: { en: ["Day 1–4: Istanbul (Sultanahmet monuments, Grand Bazaar, Bosphorus cruise)", "Day 5–7: Cappadocia (Göreme, balloon flight, Devrent Valley, Derinkuyu)"], fr: ["Jour 1-4 : Istanbul (monuments de Sultanahmet, Grand Bazar, croisière sur le Bosphore)", "Jour 5-7 : Cappadoce (Göreme, vol en montgolfière, vallée Devrent, Derinkuyu)"] } },
    { days: 10, title: { en: "Istanbul + Cappadocia + coast — 10 days", fr: "Istanbul + Cappadoce + côte — 10 jours" }, summary: { en: "Add Ephesus and Pamukkale.", fr: "Ajoute Éphèse et Pamukkale." }, stops: { en: ["Day 1–3: Istanbul", "Day 4–5: Cappadocia + balloon", "Day 6: Fly to Izmir", "Day 7: Ephesus + House of Mary", "Day 8: Pamukkale", "Day 9–10: Antalya or Bodrum beach"], fr: ["Jour 1-3 : Istanbul", "Jour 4-5 : Cappadoce + montgolfière", "Jour 6 : vol pour Izmir", "Jour 7 : Éphèse + Maison de la Vierge", "Jour 8 : Pamukkale", "Jour 9-10 : plage à Antalya ou Bodrum"] } },
    { days: 14, title: { en: "Full Turkey — 14 days", fr: "Turquie au complet — 14 jours" }, summary: { en: "Add the southeast for food and Mesopotamia.", fr: "Ajoute le sud-est pour la cuisine et la Mésopotamie." }, stops: { en: ["Day 1–4: Istanbul", "Day 5–7: Cappadocia", "Day 8–9: Gaziantep (food capital) + Mt Nemrut", "Day 10: Mardin", "Day 11–12: Fly to Izmir, Ephesus + Pamukkale", "Day 13–14: Antalya coast"], fr: ["Jour 1-4 : Istanbul", "Jour 5-7 : Cappadoce", "Jour 8-9 : Gaziantep (capitale gastro) + Mt Nemrut", "Jour 10 : Mardin", "Jour 11-12 : vol pour Izmir, Éphèse + Pamukkale", "Jour 13-14 : côte d'Antalya"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 50, description: { en: "Hostel dorm or cave-room in Göreme (€20), kebab + simit + lokanta meals (€15), local buses + Istanbul tram (€5), one attraction (€10). Turkey on a backpacker budget is one of Europe's biggest bargains — inflation has hurt locals but tourists win.", fr: "Dortoir d'auberge ou cave-room à Göreme (20 €), kebab + simit + repas en lokanta (15 €), bus locaux + tram Istanbul (5 €), une attraction (10 €). La Turquie petit budget est l'une des meilleures affaires européennes — l'inflation fait mal aux locaux mais les touristes y gagnent." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 130, description: { en: "Boutique hotel or 4-star (€80), one sit-down dinner + casual lunch (€30), domestic flight averaged + taxis (€10), entries + balloon ride averaged (€10). The right tier — a cave hotel + balloon is the signature experience.", fr: "Hôtel de charme ou 4 étoiles (80 €), un dîner attablé + déjeuner décontracté (30 €), vol intérieur lissé + taxis (10 €), entrées + montgolfière lissées (10 €). Le bon équilibre — cave hôtel + montgolfière fait l'expérience." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 280, description: { en: "Luxury cave hotel (€180) or boutique Sultanahmet hotel, one fine-dining or sky-lounge dinner (€60), private transfer + balloon (€30), guided private tour (€10). Honeymoon and milestone-trip tier.", fr: "Cave hotel de luxe (180 €) ou hôtel de charme à Sultanahmet, dîner gastronomique ou sky-lounge (60 €), transfert privé + montgolfière (30 €), visite guidée privée (10 €). Tier lune de miel et anniversaire." } },
    ],
    note: { en: "Per person, excluding international flights. The lira is volatile (high inflation since 2021) — pay in lira at the moment, not pre-pay in foreign currency. Cards work everywhere; cash useful in bazaars and rural areas. Tipping is 10% at restaurants.", fr: "Par personne, hors vol international. La lira est volatile (forte inflation depuis 2021) — payez en lira sur place, pas d'avance en devise. Carte partout ; cash utile au bazar et en zone rurale. Pourboire 10 % au resto." },
  },
  tips: [
    { do: true, text: { en: "Book the Cappadocia balloon 2–4 weeks ahead, especially April–May and September–October. Reputable operators: Royal Balloon, Kapadokya Balloons, Voyager. €150–220 for the 60-minute flight including transport and champagne breakfast.", fr: "Réservez la montgolfière en Cappadoce 2-4 semaines à l'avance, surtout avril-mai et septembre-octobre. Opérateurs réputés : Royal Balloon, Kapadokya Balloons, Voyager. 150-220 € pour le vol d'1h, transport et petit-déj champagne inclus." } },
    { do: true, text: { en: "Get an Istanbulkart at the airport. Covers metro, tram, bus, ferry — Istanbul transport is excellent and the card cuts costs by 60% vs single tickets. Top up at any kiosk.", fr: "Achetez une Istanbulkart à l'aéroport. Couvre métro, tram, bus, ferry — les transports d'Istanbul sont excellents et la carte réduit les coûts de 60 % vs les billets unitaires. Rechargeable dans n'importe quel kiosque." } },
    { do: false, text: { en: "Don't book Hagia Sophia tours; entry is free now. Just queue (10–30 min outside prayer times). The upper gallery (Christian mosaics) does require a separate paid ticket — buy online to skip that queue.", fr: "Ne réservez pas de tour pour Sainte-Sophie ; l'entrée est désormais libre. Faites simplement la file (10-30 min hors prière). La galerie supérieure (mosaïques chrétiennes) demande un billet payant séparé — achetez-le en ligne pour éviter la file." } },
    { do: true, text: { en: "Dress modestly at mosques. Shoulders and knees covered; women cover hair (scarves provided). Take off shoes at the entrance. Avoid prayer times (5 a day, especially Friday midday).", fr: "Tenue sobre dans les mosquées. Épaules et genoux couverts ; les femmes se couvrent les cheveux (foulards fournis). Chaussures enlevées à l'entrée. Évitez les heures de prière (5 par jour, surtout vendredi midi)." } },
    { do: false, text: { en: "Don't take a taxi without checking the meter is on (the 'taksimetri'). The most common scam in Istanbul: switching the meter from 'gece' (night, double rate) to a long route. BiTaksi app is the local Uber — fixed price, no debate.", fr: "Ne montez pas dans un taxi sans vérifier que le compteur tourne (« taksimetri »). L'arnaque la plus courante à Istanbul : le compteur en « gece » (nuit, double tarif) ou un long détour. L'app BiTaksi est l'Uber local — prix fixe, sans débat." } },
    { do: true, text: { en: "Bargain at the Grand Bazaar but enjoy the theater. Start at 30% of the asked price, drink tea, work to 50–60%. The interaction is the point. Carpets and lamps are the things to actually buy — kitchen knives and 'antique' coins are usually not what they claim.", fr: "Marchandez au Grand Bazar mais profitez du théâtre. Commencez à 30 % du prix demandé, buvez le thé, montez à 50-60 %. L'interaction fait partie de l'expérience. Tapis et lampes sont les vraies bonnes affaires — couteaux et pièces « anciennes » sont rarement ce qu'on prétend." } },
    { do: true, text: { en: "Tip 10% at restaurants. Round up at bars and cafés. The hammam attendant who scrubs you expects 50–100 lira (€1.50–3).", fr: "Pourboire 10 % au resto. Arrondi aux bars et cafés. Le baigneur du hammam qui vous gomme attend 50-100 lira (1,50-3 €)." } },
    { do: false, text: { en: "Don't bring up domestic politics, the Kurds, Cyprus, or the 1915 Armenian genocide with strangers. Tourist hospitality is genuine; these topics make people nervous and laws against 'insulting Turkishness' technically exist.", fr: "Évitez la politique intérieure, les Kurdes, Chypre ou le génocide arménien de 1915 avec des inconnus. L'accueil touristique est sincère ; ces sujets mettent mal à l'aise et les lois contre l'« insulte à la turcité » existent encore techniquement." } },
  ],
  related: ["greece", "morocco"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 13. Iceland
// ---------------------------------------------------------------------------
const iceland: CountryGuide = {
  slug: { en: "iceland", fr: "islande" },
  country: { en: "Iceland", fr: "Islande" },
  continent: "europe",
  hero: {
    image: "/travel-guides/iceland/hero.jpg",
    imageAlt: { en: "Northern lights over Icelandic mountains", fr: "Aurores boréales au-dessus des montagnes islandaises" },
    tag: { en: "Country guide · Europe", fr: "Guide pays · Europe" },
  },
  meta: {
    title: { en: "Iceland Travel Guide 2026 — Ring Road, Aurora & How to Plan", fr: "Guide voyage Islande 2026 — Ring Road, aurores & comment partir" },
    description: { en: "Real Iceland travel guide for 2026: best season, Ring Road, glaciers, hot springs, honest budgets, cultural do's and don'ts.", fr: "Guide voyage Islande 2026, sans bla-bla : meilleure saison, Ring Road, glaciers, sources chaudes, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "Iceland is a 103,000 km² volcanic rock floating where the Atlantic gets cold. 400,000 people, 1,500 active hot springs, a single ring road (Route 1) that does the whole country in 8 days at a reasonable pace. Waterfalls every 10km. Glaciers calving icebergs into black-sand beaches. The Aurora Borealis September through March. Everything looks photoshopped.",
      "First trip: South Coast (Reykjavik → Vík → Jökulsárlón → Höfn, 4–5 days) covers 80% of the icons. Bigger trip: full Ring Road counter-clockwise (8–10 days). Adventurous trip: Westfjords + Highlands (only July–August accessible).",
      "Two things to know. Iceland is expensive — a casual restaurant dinner runs €40–60, a beer €10–14, the Blue Lagoon €70+. Plan accordingly or self-cater from Bonus (the cheap supermarket). And the weather changes every 20 minutes year-round — layer, waterproof everything, and never trust a forecast for more than 3 hours.",
    ],
    fr: [
      "L'Islande, c'est 103 000 km² de roche volcanique flottant là où l'Atlantique devient froid. 400 000 habitants, 1 500 sources chaudes actives, une unique route (la Route 1, ou Ring Road) qui fait le tour du pays en 8 jours à rythme raisonnable. Une cascade tous les 10 km. Des glaciers qui vêlent des icebergs sur des plages de sable noir. Les aurores boréales de septembre à mars. Tout a l'air photoshoppé.",
      "Première fois : la côte sud (Reykjavik → Vík → Jökulsárlón → Höfn, 4-5 jours) couvre 80 % des icônes. Plus grand voyage : la Ring Road complète en sens anti-horaire (8-10 jours). Voyage aventure : Westfjords + Highlands (accessibles uniquement en juillet-août).",
      "Deux trucs à savoir. L'Islande coûte cher — un dîner dans un resto décontracté tourne à 40-60 €, une bière 10-14 €, le Blue Lagoon 70 €+. Prévoyez en conséquence ou cuisinez vous-même depuis Bonus (le super pas cher). Et la météo change toutes les 20 minutes toute l'année — multicouche, imperméable partout, et ne faites jamais confiance à une prévision au-delà de 3 heures.",
    ],
  },
  quickFacts: {
    capital: { en: "Reykjavík", fr: "Reykjavík" },
    language: { en: "Icelandic · English universally spoken", fr: "Islandais · anglais parlé partout" },
    currency: { code: "ISK", symbol: "kr" },
    timezone: "GMT (UTC+0) · no DST",
    visa: { en: "Schengen — visa-free up to 90 days for EU, UK, US, Canada, Australia passports.", fr: "Schengen — sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie." },
    plug: "Type C / F · 230V",
    driveSide: "right",
    population: "~400K",
  },
  bestSeason: {
    best: { months: { en: "June – August (summer) · February – March (aurora)", fr: "Juin – août (été) · février – mars (aurores)" }, description: { en: "Summer: 24-hour daylight, all roads open (including Highlands and Westfjords), 10–15°C. Late-winter: long nights for aurora, snow on the South Coast, manageable cold (-5 to 5°C). Different trips for different purposes.", fr: "Été : jour 24h/24, toutes les routes ouvertes (Highlands et Westfjords inclus), 10-15°C. Fin d'hiver : nuits longues pour les aurores, neige sur la côte sud, froid gérable (-5 à 5°C). Deux voyages différents selon l'objectif." } },
    shoulder: { months: { en: "May · September – October", fr: "Mai · septembre – octobre" }, description: { en: "May: spring snow melt, fewer tourists, waterfalls thundering, but Highland roads still closed. September–October: aurora starts again, autumn light, foliage. Best value windows.", fr: "Mai : fonte des neiges, moins de touristes, cascades à plein débit, mais les routes des Highlands encore fermées. Septembre-octobre : les aurores reprennent, lumière d'automne, couleurs. Les meilleures fenêtres rapport qualité-prix." } },
    avoid: { months: { en: "November – January (limited daylight)", fr: "Novembre – janvier (peu de lumière)" }, description: { en: "Only 4–5 hours of daylight, roads can close from storms, the Ring Road becomes risky. Aurora is good but you're limited to the South Coast for safety. Christmas-New Year is also crowded with northern-lights tourists.", fr: "Seulement 4-5h de jour, les routes peuvent fermer à cause des tempêtes, la Ring Road devient risquée. Les aurores sont bonnes mais on se limite à la côte sud par sécurité. Noël-Nouvel An sont aussi saturés par les chasseurs d'aurores." } },
  },
  mustSee: [
    { name: "Northern Lights (Aurora Borealis)", region: { en: "Whole country, Sept–March", fr: "Tout le pays, sept.-mars" }, description: { en: "Solar particles colliding with atmosphere = the most photographed phenomenon on earth. Best chances: September–March, dark sky away from cities, KP index 3+. Check aurora.is forecast. Stay in a glass-roof bungalow at Hotel Ranga or just chase them by car from Vík.", fr: "Particules solaires qui percutent l'atmosphère = le phénomène le plus photographié au monde. Meilleures chances : septembre-mars, ciel sombre loin des villes, indice KP 3+. Vérifiez les prévisions sur aurora.is. Dormez dans un bungalow au toit en verre à l'Hotel Ranga ou chassez-les en voiture depuis Vík." }, image: "/travel-guides/iceland/northern-lights.jpg", imageAlt: { en: "Green aurora borealis over Icelandic landscape", fr: "Aurore boréale verte au-dessus d'un paysage islandais" }, mapsUrl: "https://maps.app.goo.gl/q3F1aMpL2C8jJ4UM7" },
    { name: "Blue Lagoon", region: { en: "Reykjanes peninsula", fr: "Péninsule de Reykjanes" }, description: { en: "The iconic milky-blue geothermal spa, 15 min from the airport. €70+ entry. Recent volcanic activity nearby (Grindavík) has occasionally closed it — check status before booking. Less-touristy alternative: Sky Lagoon in Reykjavik or Mývatn Nature Baths in the north.", fr: "Le spa géothermique bleu laiteux iconique, à 15 min de l'aéroport. 70 €+ d'entrée. L'activité volcanique récente à proximité (Grindavík) l'a parfois fermé — vérifiez le statut avant de réserver. Alternatives moins touristiques : Sky Lagoon à Reykjavik ou les bains nature de Mývatn au nord." }, image: "/travel-guides/iceland/blue-lagoon.jpg", imageAlt: { en: "Milky-blue Blue Lagoon geothermal spa Iceland", fr: "Spa géothermique bleu laiteux du Blue Lagoon, Islande" }, mapsUrl: "https://maps.app.goo.gl/Sbq5GfeRz1QGz9p38" },
    { name: "Golden Circle — Gullfoss", region: { en: "South Iceland", fr: "Sud de l'Islande" }, description: { en: "The classic day trip from Reykjavik: Þingvellir (tectonic plate rift + viking parliament site), Geysir (the geyser that named all the others), Gullfoss waterfall (32m double cascade). 6 hours self-drive; or join a Reykjavik-based tour for €80.", fr: "L'excursion classique depuis Reykjavik : Þingvellir (faille entre plaques tectoniques + site du premier parlement viking), Geysir (le geyser qui a donné son nom à tous les autres), la cascade de Gullfoss (32 m en deux paliers). 6h en autotour ; ou tour organisé depuis Reykjavik à 80 €." }, image: "/travel-guides/iceland/gullfoss.jpg", imageAlt: { en: "Gullfoss waterfall on the Golden Circle", fr: "Cascade de Gullfoss sur le Cercle d'Or" }, mapsUrl: "https://maps.app.goo.gl/2WkJEXRyMt3rGwQk7" },
    { name: "Jökulsárlón glacier lagoon & Diamond Beach", region: { en: "Southeast", fr: "Sud-Est" }, description: { en: "A glacial lagoon filled with icebergs that drift to the sea via a 500m channel — washing up on the black volcanic sand of Diamond Beach as crystal-clear ice. 5-hour drive from Reykjavik. Take an amphibious boat tour for €60 to be among the bergs.", fr: "Un lac glaciaire rempli d'icebergs qui dérivent vers la mer par un canal de 500 m — pour s'échouer sur le sable volcanique noir de Diamond Beach en glace cristal. À 5h de route de Reykjavik. Tour en bateau amphibie à 60 € pour être au milieu des icebergs." }, image: "/travel-guides/iceland/jokulsarlon.jpg", imageAlt: { en: "Icebergs in Jökulsárlón glacier lagoon", fr: "Icebergs dans le lac glaciaire de Jökulsárlón" }, mapsUrl: "https://maps.app.goo.gl/NL2yo4LGqxCYsxKW9" },
    { name: "Seljalandsfoss & Skógafoss", region: { en: "South Coast", fr: "Côte sud" }, description: { en: "Two of the South Coast's iconic waterfalls — Seljalandsfoss you can walk behind, Skógafoss is the perfect rectangular wall of water. Both visible from Route 1, both free. Climb the 527 steps next to Skógafoss for the panorama.", fr: "Deux des cascades emblématiques de la côte sud — on peut passer derrière Seljalandsfoss, Skógafoss est un mur d'eau rectangulaire parfait. Toutes deux visibles depuis la Route 1, toutes deux gratuites. Montez les 527 marches à côté de Skógafoss pour le panorama." }, image: "/travel-guides/iceland/seljalandsfoss.jpg", imageAlt: { en: "Seljalandsfoss waterfall on the South Coast of Iceland", fr: "Cascade de Seljalandsfoss sur la côte sud de l'Islande" }, mapsUrl: "https://maps.app.goo.gl/ZL3UWVjwsuPxFyVe8" },
    { name: "Reykjavik & Hallgrímskirkja", region: { en: "Capital region", fr: "Région capitale" }, description: { en: "The world's northernmost capital — 130,000 people, walkable in a day. Hallgrímskirkja (the basalt-column-inspired Lutheran church, climb the tower for the panorama), Harpa concert hall, Laugavegur street for design shops and bars. Skip if you're tight on time; the country is the trip, not the city.", fr: "La capitale la plus septentrionale du monde — 130 000 habitants, faisable à pied dans la journée. Hallgrímskirkja (l'église luthérienne inspirée des colonnes basaltiques, tour à grimper pour le panorama), salle de concert Harpa, rue Laugavegur pour les boutiques design et bars. À sauter si vous êtes serré en temps ; le pays est le voyage, pas la ville." }, image: "/travel-guides/iceland/reykjavik.jpg", imageAlt: { en: "Hallgrímskirkja church in Reykjavik", fr: "Église Hallgrímskirkja à Reykjavik" }, mapsUrl: "https://maps.app.goo.gl/B8tWzgsZBgyAYzLY7" },
    { name: "Vík & Reynisfjara black-sand beach", region: { en: "South Coast", fr: "Côte sud" }, description: { en: "Black volcanic sand, basalt columns (Reynisdrangar sea stacks), brutal Atlantic surf — sneaker waves drown 1–2 tourists a year, stay 30m back from the water. Vík village (300 people) is the dramatic Bronze-Age-looking ash-and-cliff backdrop.", fr: "Sable volcanique noir, colonnes de basalte (cheminées marines de Reynisdrangar), houle atlantique brutale — les « sneaker waves » noient 1-2 touristes par an, restez à 30 m de l'eau. Le village de Vík (300 habitants) est la toile de fond cendre-et-falaises façon âge de bronze." }, image: "/travel-guides/iceland/vik-reynisfjara.jpg", imageAlt: { en: "Black-sand beach and basalt columns at Reynisfjara", fr: "Plage de sable noir et colonnes de basalte à Reynisfjara" }, mapsUrl: "https://maps.app.goo.gl/9Y28v8svUiKWQjJN6" },
    { name: "Kirkjufell & Snæfellsnes peninsula", region: { en: "West", fr: "Ouest" }, description: { en: "Kirkjufell ('Church Mountain') is the conical peak you've seen on every Iceland travel brochure. The Snæfellsnes peninsula (2 hours from Reykjavik) is the country in miniature — black-sand beaches, lava fields, fishing villages, the Snæfellsjökull glacier. Underrated overnight.", fr: "Kirkjufell (« montagne-église ») est le pic conique vu sur toutes les brochures sur l'Islande. La péninsule de Snæfellsnes (2h de Reykjavik) est le pays en miniature — plages de sable noir, champs de lave, villages de pêcheurs, glacier Snæfellsjökull. Une nuit sous-cotée." }, image: "/travel-guides/iceland/kirkjufell.jpg", imageAlt: { en: "Kirkjufell mountain and waterfall, Snæfellsnes", fr: "Mont Kirkjufell et sa cascade, Snæfellsnes" }, mapsUrl: "https://maps.app.goo.gl/qbWxXXfA3z9PYANEA" },
    { name: "Landmannalaugar (Highlands)", region: { en: "Central Highlands, summer only", fr: "Highlands centraux, été uniquement" }, description: { en: "Multicoloured rhyolite mountains, geothermal hot springs, the starting point of the Laugavegur trek (Iceland's most famous trail). Only accessible mid-June to mid-September, 4x4 required (river crossings). Multi-day or long day from Reykjavik.", fr: "Montagnes de rhyolite multicolores, sources chaudes géothermiques, point de départ du Laugavegur trek (le sentier le plus célèbre d'Islande). Accessible uniquement de mi-juin à mi-septembre, 4x4 obligatoire (traversées de rivières). Multi-jours ou longue journée depuis Reykjavik." }, image: "/travel-guides/iceland/landmannalaugar.jpg", imageAlt: { en: "Multicoloured rhyolite mountains at Landmannalaugar", fr: "Montagnes de rhyolite multicolores à Landmannalaugar" }, mapsUrl: "https://maps.app.goo.gl/yhi8a4hCqDB3eaXz9" },
    { name: "Puffins & Westfjords", region: { en: "Northwest", fr: "Nord-Ouest" }, description: { en: "Iceland has 60% of the world's Atlantic puffins (May–August). Closest viewing: Vestmannaeyjar islands (ferry from south coast) or Látrabjarg cliffs in the Westfjords (the remote northwest, hard to reach but the wildest landscape in the country).", fr: "L'Islande abrite 60 % des macareux moines du monde (mai-août). Plus proche : les îles Vestmannaeyjar (ferry depuis la côte sud) ou les falaises de Látrabjarg dans les Westfjords (nord-ouest reculé, difficile d'accès mais le paysage le plus sauvage du pays)." }, image: "/travel-guides/iceland/puffins.jpg", imageAlt: { en: "Atlantic puffin on Icelandic cliffs", fr: "Macareux moine sur les falaises islandaises" }, mapsUrl: "https://maps.app.goo.gl/QcSWzN3vbxbBxQfa9" },
    { name: "Þingvellir & Silfra", region: { en: "Southwest", fr: "Sud-Ouest" }, description: { en: "Where the North American and Eurasian tectonic plates meet — you can walk between two continents. Silfra is a fissure in glacial water at 2°C with 100m visibility; you can snorkel or dive between the plates (€100–200). Also where Iceland's first parliament met in 930 CE.", fr: "Là où les plaques tectoniques nord-américaine et eurasienne se rencontrent — on marche entre deux continents. Silfra est une faille à 2°C dans l'eau glaciaire avec 100 m de visibilité ; on peut faire du snorkeling ou de la plongée entre les plaques (100-200 €). C'est aussi là que le premier parlement islandais s'est réuni en 930." }, image: "/travel-guides/iceland/thingvellir.jpg", imageAlt: { en: "Rift valley between tectonic plates at Þingvellir", fr: "Vallée de faille entre plaques tectoniques à Þingvellir" }, mapsUrl: "https://maps.app.goo.gl/L8N1c4XzfvXkrW3i8" },
    { name: "Active volcanoes (Fagradalsfjall)", region: { en: "Reykjanes peninsula", fr: "Péninsule de Reykjanes" }, description: { en: "Iceland is the most volcanically active country in Europe. Since 2021, the Reykjanes peninsula has been erupting in cycles — when active, you can drive to a viewpoint within hours. Check icelandmonitor.mbl.is for current status; the eruptions are unpredictable but jaw-dropping when on.", fr: "L'Islande est le pays le plus volcaniquement actif d'Europe. Depuis 2021, la péninsule de Reykjanes connaît des cycles d'éruptions — quand c'est actif, on peut rejoindre un point de vue en quelques heures. Vérifiez icelandmonitor.mbl.is pour le statut ; les éruptions sont imprévisibles mais bluffantes quand elles ont lieu." }, image: "/travel-guides/iceland/volcano.jpg", imageAlt: { en: "Active volcanic eruption in Iceland", fr: "Éruption volcanique active en Islande" }, mapsUrl: "https://maps.app.goo.gl/4McyJsXLkfTRJJ778" },
  ],
  specialties: [
    { name: { en: "Skyr & lamb", fr: "Skyr & agneau" }, category: "food", description: { en: "Skyr is the national yogurt — strained, high-protein, eaten with berries for breakfast. Lamb is the year-round protein (sheep outnumber humans 2:1, free-roaming on moss and herbs gives the meat a wild flavor). Smoked lamb (hangikjöt) is the Christmas dish.", fr: "Le skyr est le yaourt national — égoutté, riche en protéines, mangé aux fruits rouges au petit-déj. L'agneau est la protéine de l'année (les moutons sont deux fois plus nombreux que les humains, en liberté sur la mousse et les herbes, ce qui donne un goût sauvage). L'agneau fumé (hangikjöt) est le plat de Noël." }, image: "/travel-guides/iceland/food.jpg", imageAlt: { en: "Icelandic skyr with berries", fr: "Skyr islandais aux fruits rouges" } },
    { name: { en: "Hot springs & geothermal", fr: "Sources chaudes & géothermie" }, category: "experience", description: { en: "Iceland has 800+ public hot springs and pools. Every village has a heated outdoor pool (€5–8); locals socialise in them daily. Natural wild springs (Reykjadalur valley, Hrunalaug) are free and reach via 1–3hr hikes. Strictly shower naked before entering — this is non-negotiable.", fr: "L'Islande compte 800+ sources chaudes et piscines publiques. Chaque village a sa piscine extérieure chauffée (5-8 €) ; les locaux s'y retrouvent tous les jours. Sources naturelles sauvages (vallée de Reykjadalur, Hrunalaug), gratuites, accessibles par 1-3h de marche. Douche nu obligatoire avant d'entrer — pas négociable." }, image: "/travel-guides/iceland/hot-spring.jpg", imageAlt: { en: "Steam rising from an Icelandic geothermal hot spring", fr: "Vapeur s'élevant d'une source chaude géothermique islandaise" } },
    { name: { en: "Icelandic horse", fr: "Cheval islandais" }, category: "experience", description: { en: "A small, sturdy breed with five gaits (most horses have three). Bred in Iceland for 1,100 years and isolated — once a horse leaves the country, it can't return. Easy riding tours from Reykjavik for €100–150 (1–2hr).", fr: "Petite race robuste à cinq allures (la plupart des chevaux en ont trois). Élevée en Islande depuis 1 100 ans et isolée — un cheval qui quitte le pays ne peut plus y revenir. Sorties équestres faciles depuis Reykjavik à 100-150 € (1-2h)." }, image: "/travel-guides/iceland/icelandic-horse.jpg", imageAlt: { en: "Icelandic horse in a green field", fr: "Cheval islandais dans un champ vert" } },
    { name: { en: "Glacier hiking & ice caves", fr: "Glaciers & grottes de glace" }, category: "experience", description: { en: "Iceland's glaciers cover 11% of the country. Vatnajökull is the largest in Europe. Guided glacier hikes (crampons + ice axe, €120–180) from Skaftafell. Ice caves open November–March only — book ahead, the cave shape changes every year.", fr: "Les glaciers couvrent 11 % du pays. Le Vatnajökull est le plus grand d'Europe. Randos guidées sur glacier (crampons + piolet, 120-180 €) depuis Skaftafell. Grottes de glace accessibles uniquement de novembre à mars — réservez à l'avance, leur forme change chaque année." }, image: "/travel-guides/iceland/glacier.jpg", imageAlt: { en: "Glacier ice cave with blue ice in Iceland", fr: "Grotte de glace bleue dans un glacier d'Islande" } },
    { name: { en: "Geothermal energy & geysers", fr: "Géothermie & geysers" }, category: "experience", description: { en: "Iceland gets 85% of its energy from renewable sources (mostly geothermal + hydro). Hot tap water often smells of sulfur — that's normal. Geysir geyser (where the name comes from) is dormant; its neighbor Strokkur erupts every 5–10 minutes.", fr: "L'Islande tire 85 % de son énergie de sources renouvelables (surtout géothermique + hydroélectrique). L'eau chaude du robinet sent souvent le soufre — normal. Le geyser Geysir (qui a donné son nom à tous) est dormant ; son voisin Strokkur entre en éruption toutes les 5-10 minutes." }, image: "/travel-guides/iceland/geothermal.jpg", imageAlt: { en: "Strokkur geyser erupting in Iceland", fr: "Geyser Strokkur en éruption en Islande" } },
    { name: { en: "Waterfall hunting", fr: "Chasse aux cascades" }, category: "experience", description: { en: "There are over 10,000 named waterfalls. South Coast has the famous ones (Seljalandsfoss, Skógafoss, Svartifoss). The north and east have hidden ones with no tourists. Dynjandi in the Westfjords is the country's most beautiful (and least visited).", fr: "Plus de 10 000 cascades nommées. La côte sud a les célèbres (Seljalandsfoss, Skógafoss, Svartifoss). Le nord et l'est en ont des cachées sans touristes. Dynjandi dans les Westfjords est la plus belle (et la moins visitée) du pays." }, image: "/travel-guides/iceland/skogafoss.jpg", imageAlt: { en: "Skógafoss waterfall in southern Iceland", fr: "Cascade de Skógafoss au sud de l'Islande" } },
    { name: { en: "Puffin & bird watching", fr: "Observation des macareux et oiseaux" }, category: "experience", description: { en: "8–10 million puffins breed in Iceland from May to August — the world's largest population. Best viewing at Látrabjarg cliffs (Westfjords) and Borgarfjörður Eystri in the east — birds nest within meters of you, unafraid. Free, no tours needed.", fr: "8 à 10 millions de macareux nichent en Islande de mai à août — la plus grande population au monde. Meilleure observation aux falaises de Látrabjarg (Westfjords) et à Borgarfjörður Eystri à l'est — les oiseaux nichent à quelques mètres de vous, sans crainte. Gratuit, aucun tour nécessaire." }, image: "/travel-guides/iceland/puffin-cliffs.jpg", imageAlt: { en: "Atlantic puffins on Icelandic sea cliffs", fr: "Macareux moines sur des falaises maritimes d'Islande" } },
  ],
  regions: [
    { name: { en: "Reykjavik & Reykjanes", fr: "Reykjavik & Reykjanes" }, highlights: { en: "Reykjavik, Blue Lagoon, Reykjanes peninsula volcanoes", fr: "Reykjavik, Blue Lagoon, volcans de la péninsule de Reykjanes" }, description: { en: "The capital + the airport region. All international flights land at Keflavík (KEF, 50min from Reykjavik). Use Reykjavik as base for day trips, or grab a rental car immediately and start the Ring Road.", fr: "La capitale + la région aéroport. Tous les vols internationaux atterrissent à Keflavík (KEF, 50 min de Reykjavik). Utilisez Reykjavik comme base pour les excursions, ou louez une voiture dès l'arrivée et lancez-vous sur la Ring Road." } },
    { name: { en: "South Coast", fr: "Côte sud" }, highlights: { en: "Golden Circle, Seljalandsfoss, Skógafoss, Vík, Jökulsárlón, Diamond Beach", fr: "Cercle d'Or, Seljalandsfoss, Skógafoss, Vík, Jökulsárlón, Diamond Beach" }, description: { en: "The iconic strip. 80% of Iceland's bucket-list sites are on or just off Route 1 between Reykjavik and Höfn. Doable as a 4–5 day out-and-back if you don't have time for the full Ring Road.", fr: "La bande emblématique. 80 % des spots iconiques du pays sont sur ou juste à côté de la Route 1 entre Reykjavik et Höfn. Faisable en aller-retour de 4-5 jours si vous n'avez pas le temps pour la Ring Road complète." } },
    { name: { en: "North & East", fr: "Nord & Est" }, highlights: { en: "Akureyri, Mývatn, Húsavík (whale watching), Goðafoss, Dettifoss", fr: "Akureyri, Mývatn, Húsavík (baleines), Goðafoss, Dettifoss" }, description: { en: "Iceland's quieter half. Akureyri is the 'capital of the north' (20,000 people). Mývatn area has another set of waterfalls, lava fields, the Nature Baths. Húsavík for whale watching (best Apr–Sept). Add 3–4 days if you do the full Ring Road.", fr: "La moitié plus calme du pays. Akureyri est la « capitale du nord » (20 000 habitants). La région de Mývatn a un autre lot de cascades, champs de lave, ses bains nature. Húsavík pour les baleines (idéal avr.-sept.). Ajoutez 3-4 jours pour la Ring Road complète." } },
    { name: { en: "Westfjords", fr: "Westfjords" }, highlights: { en: "Ísafjörður, Látrabjarg, Dynjandi, Hornstrandir reserve", fr: "Ísafjörður, Látrabjarg, Dynjandi, réserve de Hornstrandir" }, description: { en: "The remote northwest peninsula. 1/3 of the country, 7,000 people, the wildest landscape. Dynjandi waterfall, Látrabjarg cliffs (puffins). Mostly accessible only June–September; takes 2–3 days to fit in.", fr: "La péninsule nord-ouest reculée. Un tiers du pays, 7 000 habitants, le paysage le plus sauvage. Cascade de Dynjandi, falaises de Látrabjarg (macareux). Accessible surtout de juin à septembre ; demande 2-3 jours." } },
    { name: { en: "Highlands (Hálendi)", fr: "Highlands (Hálendi)" }, highlights: { en: "Landmannalaugar, Þórsmörk, Askja, Kerlingarfjöll", fr: "Landmannalaugar, Þórsmörk, Askja, Kerlingarfjöll" }, description: { en: "Iceland's interior — uninhabited, lunar, only open mid-June to mid-September. 4x4 mandatory; F-roads require river crossings. Where the Laugavegur trek (55km, 4 days) and Apollo astronauts trained for the moon. Adventure-tier travel.", fr: "L'intérieur du pays — inhabité, lunaire, ouvert seulement de mi-juin à mi-septembre. 4x4 obligatoire ; les F-roads imposent des traversées de rivières. Là où se fait le trek Laugavegur (55 km, 4 jours) et où les astronautes d'Apollo s'entraînaient pour la Lune. Voyage tier aventure." } },
    { name: { en: "Snæfellsnes peninsula", fr: "Péninsule de Snæfellsnes" }, highlights: { en: "Kirkjufell, Snæfellsjökull glacier, Búðir black church, Arnarstapi", fr: "Kirkjufell, glacier Snæfellsjökull, église noire de Búðir, Arnarstapi" }, description: { en: "Iceland in miniature, 2 hours from Reykjavik. Doable as an overnight loop — black-sand beaches, lava fields, Snæfellsjökull glacier (Jules Verne's Journey to the Center of the Earth). Worth a day or two even on a short trip.", fr: "L'Islande en miniature, à 2h de Reykjavik. Faisable en boucle d'une nuit — plages de sable noir, champs de lave, glacier Snæfellsjökull (Voyage au centre de la Terre de Jules Verne). Vaut une journée ou deux même sur un voyage court." } },
  ],
  itineraries: [
    { days: 5, title: { en: "South Coast quick — 5 days", fr: "Côte sud express — 5 jours" }, summary: { en: "Reykjavik + Golden Circle + Vík + Jökulsárlón. The icon-strip done fast.", fr: "Reykjavik + Cercle d'Or + Vík + Jökulsárlón. Les icônes en mode rapide." }, stops: { en: ["Day 1: Arrive Reykjavik, Blue Lagoon en route", "Day 2: Golden Circle (Þingvellir, Geysir, Gullfoss)", "Day 3: Seljalandsfoss, Skógafoss, Vík", "Day 4: Jökulsárlón + Diamond Beach (long drive)", "Day 5: Back to Reykjavik, fly home"], fr: ["Jour 1 : arrivée Reykjavik, Blue Lagoon en chemin", "Jour 2 : Cercle d'Or (Þingvellir, Geysir, Gullfoss)", "Jour 3 : Seljalandsfoss, Skógafoss, Vík", "Jour 4 : Jökulsárlón + Diamond Beach (longue route)", "Jour 5 : retour Reykjavik, vol retour"] } },
    { days: 8, title: { en: "Ring Road — 8 days", fr: "Ring Road — 8 jours" }, summary: { en: "The full loop of Iceland counter-clockwise. Self-drive with overnight stops.", fr: "Le tour complet du pays en sens antihoraire. Autotour avec étapes d'une nuit." }, stops: { en: ["Day 1: Reykjavik + Golden Circle", "Day 2: South Coast (Vík)", "Day 3: Jökulsárlón + Höfn", "Day 4: East fjords → Egilsstaðir", "Day 5: Mývatn + Goðafoss", "Day 6: Akureyri (north)", "Day 7: Snæfellsnes peninsula", "Day 8: Reykjavik, fly home"], fr: ["Jour 1 : Reykjavik + Cercle d'Or", "Jour 2 : côte sud (Vík)", "Jour 3 : Jökulsárlón + Höfn", "Jour 4 : fjords de l'est → Egilsstaðir", "Jour 5 : Mývatn + Goðafoss", "Jour 6 : Akureyri (nord)", "Jour 7 : péninsule de Snæfellsnes", "Jour 8 : Reykjavik, vol retour"] } },
    { days: 12, title: { en: "Ring Road + Westfjords — 12 days", fr: "Ring Road + Westfjords — 12 jours" }, summary: { en: "Add the wild Westfjords. Summer only. The deepest Iceland for first-timers.", fr: "Ajoute les Westfjords sauvages. Été uniquement. L'Islande la plus profonde pour une première fois." }, stops: { en: ["Day 1: Reykjavik", "Day 2–3: Snæfellsnes", "Day 4–5: Westfjords (Ísafjörður, Látrabjarg)", "Day 6: Akureyri", "Day 7: Mývatn", "Day 8–9: East fjords + Jökulsárlón", "Day 10: Vík", "Day 11–12: Golden Circle + Reykjavik wrap-up"], fr: ["Jour 1 : Reykjavik", "Jour 2-3 : Snæfellsnes", "Jour 4-5 : Westfjords (Ísafjörður, Látrabjarg)", "Jour 6 : Akureyri", "Jour 7 : Mývatn", "Jour 8-9 : fjords de l'est + Jökulsárlón", "Jour 10 : Vík", "Jour 11-12 : Cercle d'Or + Reykjavik pour finir"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 130, description: { en: "Hostel dorm or campervan (€60), supermarket meals + one cooked meal a day (€40), rental car split or campervan fuel (€20), one paid attraction every 2 days (€10). Iceland is brutal on a backpacker budget; camping is the only way to get under €100/day.", fr: "Dortoir d'auberge ou camping-car (60 €), repas au super + un repas chaud/jour (40 €), location voiture partagée ou essence du van (20 €), une attraction payante tous les 2 jours (10 €). L'Islande est brutale petit budget ; le camping est la seule manière de passer sous 100 €/jour." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 260, description: { en: "Guesthouse or 3-star hotel (€160), one restaurant dinner + sandwiches (€60), rental car + fuel (€30), entries + Blue Lagoon-type attraction (€10). The right tier for self-drive Iceland.", fr: "Guesthouse ou 3 étoiles (160 €), un dîner au resto + sandwichs (60 €), voiture + essence (30 €), entrées + Blue Lagoon (10 €). Le bon équilibre pour un autotour en Islande." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 500, description: { en: "Boutique hotel or design farm-stay (€320), fine-dining dinner with Icelandic tasting menu (€130), 4x4 rental + fuel (€40), private guide or super-jeep tour (€10). Honeymoon and aurora-chasing tier.", fr: "Hôtel de charme ou ferme-design (320 €), dîner gastro avec menu dégustation islandais (130 €), 4x4 + essence (40 €), guide privé ou tour en super-jeep (10 €). Tier lune de miel et chasse aux aurores." } },
    ],
    note: { en: "Per person, excluding international flights. Iceland is genuinely expensive — alcohol is the worst (a beer is €10–14 in restaurants, half that at the airport duty-free which everyone uses to stock up). Most visitors self-drive; manual cars are 30% cheaper than automatics.", fr: "Par personne, hors vol international. L'Islande est vraiment chère — l'alcool est le pire (une bière 10-14 € en resto, moitié moins au duty-free de l'aéroport où tout le monde s'approvisionne). La plupart des visiteurs roulent eux-mêmes ; les boîtes manuelles sont 30 % moins chères que les automatiques." },
  },
  tips: [
    { do: true, text: { en: "Rent a 4x4 only if you're going into the Highlands or in winter. Otherwise a small 2WD is fine on Route 1, costs half. Mandatory winter tires October–April; the rental includes them.", fr: "Louez un 4x4 seulement pour les Highlands ou en hiver. Sinon, une petite 2 roues motrices suffit sur la Route 1 et coûte moitié moins. Pneus hiver obligatoires d'octobre à avril ; inclus dans la location." } },
    { do: true, text: { en: "Buy food at Bonus or Krónan supermarkets (the cheap ones — Bonus has a pink pig logo). Cook in your accommodation or campervan. Restaurant prices triple supermarket prices. Hot dogs (pylsa) from gas stations are the local quick lunch — €4 each.", fr: "Achetez à manger chez Bonus ou Krónan (les supermarchés pas chers — Bonus a un logo de cochon rose). Cuisinez à l'hébergement ou au van. Les prix resto sont 3x ceux du super. Les hot dogs (pylsa) des stations-service sont le déjeuner rapide local — 4 € pièce." } },
    { do: false, text: { en: "Don't walk on closed/marked-off areas at geothermal sites. The mud and water can be at 100°C; tourists have died. Likewise, don't approach black-sand beach water — sneaker waves drown 1–2 people a year at Reynisfjara.", fr: "Ne marchez pas dans les zones balisées ou fermées sur les sites géothermiques. La boue et l'eau peuvent atteindre 100°C ; des touristes en sont morts. Idem, ne vous approchez pas de la mer sur les plages de sable noir — les sneaker waves noient 1-2 personnes par an à Reynisfjara." } },
    { do: true, text: { en: "Shower naked, with soap, before entering ANY pool or hot spring. This is the law and locals will tell you off if you don't. It's never weird; everyone does it. The locker rooms have private shower stalls if you really need them.", fr: "Douchez-vous nu, avec savon, avant d'entrer dans TOUTE piscine ou source chaude. C'est la loi et les locaux vous reprennent si vous ne le faites pas. Personne ne juge ; tout le monde le fait. Les vestiaires ont des cabines de douche privées si vraiment vous en avez besoin." } },
    { do: false, text: { en: "Don't trust GPS in remote areas. Mountain roads (F-roads) and Westfjords routes can be miscalculated as faster than they actually are. Use vegagerdin.is for real road conditions and safetravel.is to file a travel plan in winter or when going to the Highlands.", fr: "Ne faites pas confiance au GPS dans les zones reculées. Les routes de montagne (F-roads) et celles des Westfjords sont parfois sous-estimées en temps. Utilisez vegagerdin.is pour les conditions réelles et safetravel.is pour déposer un plan de voyage en hiver ou pour les Highlands." } },
    { do: true, text: { en: "Drink tap water everywhere. Iceland's cold tap water is glacial — possibly the best drinking water on earth. Hot tap water smells of sulfur because it comes from geothermal sources; that's normal, drink the cold.", fr: "Buvez l'eau du robinet partout. L'eau froide islandaise vient des glaciers — sans doute la meilleure du monde. L'eau chaude sent le soufre parce qu'elle vient de la géothermie ; normal, buvez la froide." } },
    { do: true, text: { en: "Layer with merino wool. Iceland's weather is dramatically variable — 5°C and rainy in summer, 0°C and clear-sky in winter. Waterproof shell over wool/fleece is the only system that works.", fr: "Multicouchez en laine mérinos. Le temps en Islande est dramatiquement variable — 5°C et pluvieux l'été, 0°C et ciel clair l'hiver. Coque imperméable par-dessus laine/polaire est le seul système qui tient." } },
    { do: false, text: { en: "Don't camp wild outside designated sites. Wild camping has been illegal since 2015 because of how many tourists were doing it. Campsites are €10–20/night, well-equipped, and everywhere along Route 1.", fr: "Ne campez pas sauvage hors des sites désignés. Le camping sauvage est illégal depuis 2015 à cause du nombre de touristes qui le faisaient. Les campings coûtent 10-20 €/nuit, sont bien équipés, et il y en a partout le long de la Route 1." } },
  ],
  related: ["portugal"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 14. Costa Rica
// ---------------------------------------------------------------------------
const costaRica: CountryGuide = {
  slug: { en: "costa-rica", fr: "costa-rica" },
  country: { en: "Costa Rica", fr: "Costa Rica" },
  continent: "north-america",
  hero: {
    image: "/travel-guides/costa-rica/hero.jpg",
    imageAlt: { en: "Arenal volcano rising above the rainforest in Costa Rica", fr: "Le volcan Arenal au-dessus de la forêt tropicale, Costa Rica" },
    tag: { en: "Country guide · Central America", fr: "Guide pays · Amérique centrale" },
  },
  meta: {
    title: { en: "Costa Rica Travel Guide 2026 — Volcanoes, Wildlife & Pura Vida", fr: "Guide voyage Costa Rica 2026 — Volcans, faune & pura vida" },
    description: { en: "Real Costa Rica travel guide for 2026: best season, volcanoes, rainforests, beaches, wildlife, honest budgets, cultural do's and don'ts.", fr: "Guide voyage Costa Rica 2026, sans bla-bla : meilleure saison, volcans, forêts, plages, faune, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "Costa Rica is the Central American country that abolished its army in 1948 and put the money into education and conservation. The result: 25% of the country is protected forest, 5% of the world's biodiversity on 0.03% of the land, and a tourism industry that genuinely works around the wildlife. 'Pura vida' is the national mantra — used as hello, goodbye, thanks, you're welcome, life is good.",
      "First trip: Arenal (3 days) + Monteverde (2 days) + Manuel Antonio or Tamarindo (3 days). Second trip: Osa peninsula (Corcovado, the wildest rainforest), Caribbean coast (Cahuita, Puerto Viejo), Nicoya peninsula (the Blue Zone, Nosara surf).",
      "Two things to know. The country is small but slow — only 320km tip-to-tip but the windy mountain roads mean Arenal to Monteverde is 4 hours despite being 60km apart as the crow flies. And the dry season (December–April) doubles the prices but actually has the best weather; green season (May–November) is rainier but cheaper, lusher, and wildlife is more active.",
    ],
    fr: [
      "Le Costa Rica est le pays d'Amérique centrale qui a aboli son armée en 1948 et a réinvesti l'argent dans l'éducation et la conservation. Résultat : 25 % du pays est protégé, 5 % de la biodiversité mondiale sur 0,03 % de la surface, et une industrie touristique qui s'organise vraiment autour de la faune. « Pura vida » est le mantra national — utilisé comme bonjour, au revoir, merci, de rien, la vie est belle.",
      "Première fois : Arenal (3 jours) + Monteverde (2 jours) + Manuel Antonio ou Tamarindo (3 jours). Deuxième fois : la péninsule d'Osa (Corcovado, la forêt la plus sauvage), la côte caraïbe (Cahuita, Puerto Viejo), la péninsule de Nicoya (la Blue Zone, le surf à Nosara).",
      "Deux trucs à savoir. Le pays est petit mais lent — 320 km bout à bout, mais les routes de montagne sinueuses font qu'Arenal-Monteverde prend 4h alors qu'il n'y a que 60 km à vol d'oiseau. Et la saison sèche (décembre-avril) double les prix mais a la meilleure météo ; la saison verte (mai-novembre) est plus pluvieuse mais moins chère, plus luxuriante, et la faune est plus active.",
    ],
  },
  quickFacts: {
    capital: { en: "San José", fr: "San José" },
    language: { en: "Spanish · English widely spoken in tourism", fr: "Espagnol · anglais répandu dans le tourisme" },
    currency: { code: "CRC", symbol: "₡" },
    timezone: "CST (UTC-6) · no DST",
    visa: { en: "Visa-free up to 90 days for EU, UK, US, Canada, Australia passports. Onward ticket sometimes asked at immigration.", fr: "Sans visa jusqu'à 90 jours pour les passeports UE, Royaume-Uni, États-Unis, Canada, Australie. Billet de sortie parfois demandé à l'immigration." },
    plug: "Type A / B · 120V",
    driveSide: "right",
    population: "~5.2M",
  },
  bestSeason: {
    best: { months: { en: "December – April (dry)", fr: "Décembre – avril (saison sèche)" }, description: { en: "Sunny, hot, the Pacific side is dry while the Caribbean stays humid. Prices peak in late December–February (Christmas, US winter break). Book accommodation 2–4 months ahead, especially Manuel Antonio and Arenal.", fr: "Ensoleillé, chaud, le Pacifique est sec, la côte caraïbe reste humide. Les prix culminent fin décembre-février (Noël, vacances d'hiver US). Réservez 2-4 mois à l'avance, surtout Manuel Antonio et Arenal." } },
    shoulder: { months: { en: "May · November", fr: "Mai · novembre" }, description: { en: "Light afternoon showers, lush green forests, prices drop 20–40%. Wildlife is more active in the rain. The sweet-spot months — green-season landscape at dry-season prices.", fr: "Averses légères l'après-midi, forêts luxuriantes, prix en baisse de 20-40 %. La faune est plus active sous la pluie. Les mois idéaux — paysage verdoyant aux prix de saison sèche." } },
    avoid: { months: { en: "September – October (peak rain)", fr: "Septembre – octobre (pic de pluie)" }, description: { en: "Heaviest rain on the Pacific side. Some lodges close. Caribbean coast (Cahuita) is actually drier these months — unusual reverse pattern. Cheap if you can deal with daily downpours.", fr: "Pluies les plus fortes sur le Pacifique. Certaines lodges ferment. La côte caraïbe (Cahuita) est en fait plus sèche ces mois-là — schéma inversé. Pas cher si on accepte des averses quotidiennes." } },
  },
  mustSee: [
    { name: "Arenal Volcano & La Fortuna", region: { en: "Alajuela", fr: "Alajuela" }, description: { en: "The perfect-cone volcano (last erupted 2010, dormant now) with hot springs at its base — Tabacón (luxury, €100+) or Free Hot Springs (the river behind Tabacón, free). La Fortuna town is the activity hub: hanging bridges, La Fortuna waterfall, white-water rafting.", fr: "Le cône parfait (dernière éruption en 2010, dormant maintenant) avec ses sources chaudes au pied — Tabacón (luxe, 100 €+) ou les Free Hot Springs (la rivière derrière Tabacón, gratuit). La Fortuna est le hub des activités : ponts suspendus, cascade de La Fortuna, rafting." }, image: "/travel-guides/costa-rica/arenal.jpg", imageAlt: { en: "Arenal Volcano with rainforest", fr: "Le volcan Arenal et la forêt tropicale" }, mapsUrl: "https://maps.app.goo.gl/CGN6r9Yd1cP9HRWMA" },
    { name: "Monteverde Cloud Forest", region: { en: "Puntarenas", fr: "Puntarenas" }, description: { en: "A misty rainforest at 1,400m altitude — quetzals, hummingbirds, the resplendent quetzal (the bird that named the currency in Guatemala). Hanging-bridge canopy walks, zip-line tours. 4 hours from Arenal via the Lake Arenal road or 30 min by speedboat-jeep combo.", fr: "Une forêt nuageuse à 1 400 m d'altitude — quetzals, colibris, le resplendissant quetzal (l'oiseau qui a donné son nom à la monnaie guatémaltèque). Marches sur ponts suspendus, tyroliennes. À 4h d'Arenal par la route du lac Arenal ou 30 min en combo speedboat-jeep." }, image: "/travel-guides/costa-rica/monteverde.jpg", imageAlt: { en: "Hanging bridge in Monteverde cloud forest", fr: "Pont suspendu dans la forêt nuageuse de Monteverde" }, mapsUrl: "https://maps.app.goo.gl/4ZQk4qaR8Dvgs81GA" },
    { name: "Manuel Antonio National Park", region: { en: "Puntarenas Pacific", fr: "Pacifique de Puntarenas" }, description: { en: "Small but iconic Pacific-side park — white-sand beaches inside a jungle full of sloths, capuchin and squirrel monkeys, iguanas. The most-visited national park; arrive at opening (7am) to see wildlife before crowds. Tuesdays closed.", fr: "Petit parc emblématique côté Pacifique — plages de sable blanc dans une jungle pleine de paresseux, capucins, singes-écureuils, iguanes. Le parc le plus visité ; arrivez à l'ouverture (7h) pour la faune avant la foule. Fermé le mardi." }, image: "/travel-guides/costa-rica/manuel-antonio.jpg", imageAlt: { en: "White sand beach at Manuel Antonio with palm trees", fr: "Plage de sable blanc et palmiers à Manuel Antonio" }, mapsUrl: "https://maps.app.goo.gl/dB3jzpQrJwbb1RH56" },
    { name: "Sloths & wildlife", region: { en: "Whole country", fr: "Tout le pays" }, description: { en: "Costa Rica has both two-toed and three-toed sloths, plus capuchin/howler/spider/squirrel monkeys, anteaters, peccaries, ocelots. The Sloth Sanctuary near Cahuita is a rescue centre with educational tours. Pretty much anywhere with rainforest, you'll see at least one sloth.", fr: "Le Costa Rica a les paresseux à 2 et à 3 doigts, plus les singes capucins/hurleurs/araignées/écureuils, fourmiliers, pécaris, ocelots. Le Sloth Sanctuary près de Cahuita est un centre de sauvetage avec visites pédagogiques. Quasi partout en forêt, vous verrez au moins un paresseux." }, image: "/travel-guides/costa-rica/sloth.jpg", imageAlt: { en: "Three-toed sloth hanging in a Costa Rican tree", fr: "Paresseux à trois doigts accroché à un arbre, Costa Rica" }, mapsUrl: "https://maps.app.goo.gl/Eq8wPSXqU6FFLP1c7" },
    { name: "Tortuguero National Park", region: { en: "Limón Caribbean", fr: "Limón Caraïbe" }, description: { en: "Caribbean-side canal-and-jungle park — accessible only by boat or small plane. Green sea turtles nest July–October (the name 'Tortuguero' means turtle catcher). Caimans, sloths, monkeys, the world's most accessible jaguar-watching after Pantanal. 3 days minimum.", fr: "Parc de canaux et de jungle côté caraïbe — accessible uniquement en bateau ou en petit avion. Les tortues vertes pondent de juillet à octobre (le nom « Tortuguero » signifie « attrapeur de tortues »). Caïmans, paresseux, singes, le meilleur spot pour voir des jaguars après le Pantanal. 3 jours minimum." }, image: "/travel-guides/costa-rica/tortuguero.jpg", imageAlt: { en: "Jungle canals of Tortuguero National Park", fr: "Canaux dans la jungle du parc national de Tortuguero" }, mapsUrl: "https://maps.app.goo.gl/MaTeMaeNZuKvJM1u9" },
    { name: "Tamarindo & Nicoya Pacific", region: { en: "Guanacaste", fr: "Guanacaste" }, description: { en: "The Pacific surf coast. Tamarindo for beginners + nightlife, Nosara for yoga + intermediate surf, Santa Teresa for the chill end-of-the-road vibe. 4-hour drive from San José; or fly into Liberia (LIR) which is 1 hour from the coast.", fr: "La côte surf Pacifique. Tamarindo pour les débutants + la vie nocturne, Nosara pour le yoga + le surf intermédiaire, Santa Teresa pour l'ambiance « bout du monde » tranquille. À 4h de San José en voiture ; ou vol pour Liberia (LIR), à 1h de la côte." }, image: "/travel-guides/costa-rica/tamarindo.jpg", imageAlt: { en: "Tamarindo beach with surfers and palms", fr: "Plage de Tamarindo avec surfeurs et palmiers" }, mapsUrl: "https://maps.app.goo.gl/v2RnyZ8gKB7BBQch9" },
    { name: "La Fortuna Waterfall & Rio Celeste", region: { en: "Alajuela", fr: "Alajuela" }, description: { en: "La Fortuna Waterfall is a 75m drop in primary rainforest — climb down 500 steps for the swimming hole. Rio Celeste (1.5hr north) is a sky-blue river caused by volcanic minerals merging two clear streams. Both stunning, both better in dry season.", fr: "La cascade de La Fortuna est une chute de 75 m en forêt primaire — descendez 500 marches pour le bassin. Le Río Celeste (1h30 au nord) est une rivière bleu ciel due à des minéraux volcaniques qui se mélangent à la confluence de deux courants. Spectaculaires, et mieux en saison sèche." }, image: "/travel-guides/costa-rica/la-fortuna.jpg", imageAlt: { en: "La Fortuna waterfall in Costa Rica rainforest", fr: "Cascade de La Fortuna dans la forêt costaricaine" }, mapsUrl: "https://maps.app.goo.gl/wMcQTtsiBJxHmTAa9" },
    { name: "Corcovado (Osa Peninsula)", region: { en: "Puntarenas south", fr: "Sud de Puntarenas" }, description: { en: "National Geographic called it 'the most biologically intense place on earth'. The wildest jungle in Central America — jaguars, tapirs, all four monkey species, scarlet macaws. Mandatory guide. Get there via Drake Bay or Puerto Jiménez; small-plane flight from San José is the smart play.", fr: "National Geographic l'a qualifié de « lieu biologiquement le plus intense de la planète ». La jungle la plus sauvage d'Amérique centrale — jaguars, tapirs, les quatre espèces de singes, aras rouges. Guide obligatoire. On y accède via Drake Bay ou Puerto Jiménez ; le petit avion depuis San José est l'option intelligente." }, image: "/travel-guides/costa-rica/corcovado.jpg", imageAlt: { en: "Dense rainforest of Corcovado National Park", fr: "Forêt tropicale dense du parc national de Corcovado" }, mapsUrl: "https://maps.app.goo.gl/9j2yu2Nt6Vy2kXBn7" },
    { name: "Poás Volcano", region: { en: "Alajuela", fr: "Alajuela" }, description: { en: "The most accessible active volcano — 1 hour from San José, drive almost to the crater rim (320m wide, 300m deep, turquoise sulfurous lake). Visits limited to 20 minutes due to gas levels; closes during eruption cycles. Pair with the Doka coffee plantation tour below.", fr: "Le volcan actif le plus accessible — 1h de San José, on roule presque jusqu'au bord du cratère (320 m de large, 300 m de profond, lac sulfureux turquoise). Visite limitée à 20 minutes à cause des gaz ; ferme pendant les cycles éruptifs. À combiner avec la plantation de café Doka en bas." }, image: "/travel-guides/costa-rica/poas.jpg", imageAlt: { en: "Turquoise crater lake of Poás Volcano", fr: "Lac turquoise du cratère du volcan Poás" }, mapsUrl: "https://maps.app.goo.gl/wTeMNc9ahLftakKj9" },
    { name: "Caribbean coast (Puerto Viejo)", region: { en: "Limón", fr: "Limón" }, description: { en: "Costa Rica's Afro-Caribbean side — reggae, rondón fish stew, jerk chicken. Puerto Viejo de Talamanca beach village + Cahuita National Park (free entry, sloths and monkeys). Cooler vibe than the Pacific. Dryer in September-October than the rest of the country.", fr: "Le côté afro-caribéen du Costa Rica — reggae, rondón (ragoût de poisson), poulet jerk. Le village balnéaire de Puerto Viejo de Talamanca + le parc national de Cahuita (entrée libre, paresseux et singes). Ambiance plus cool que le Pacifique. Plus sec en septembre-octobre que le reste du pays." }, image: "/travel-guides/costa-rica/caribbean-coast.jpg", imageAlt: { en: "Caribbean coast beach with palm trees in Costa Rica", fr: "Plage des Caraïbes avec palmiers, Costa Rica" }, mapsUrl: "https://maps.app.goo.gl/jJUUycBLnYBpDp5MA" },
    { name: "Hanging bridges & canopy", region: { en: "Multiple regions", fr: "Plusieurs régions" }, description: { en: "Suspension bridges over the rainforest canopy — Mistico Hanging Bridges (Arenal) is the original, Selvatura Park (Monteverde) is the longest. Walk it slowly: you'll see things from 30m up you'd never see from the ground. Half-day, €30–50.", fr: "Ponts suspendus au-dessus de la canopée — Mistico Hanging Bridges (Arenal) est l'original, Selvatura Park (Monteverde) le plus long. À faire lentement : on voit à 30 m de haut des choses qu'on ne verrait jamais du sol. Demi-journée, 30-50 €." }, image: "/travel-guides/costa-rica/hanging-bridges.jpg", imageAlt: { en: "Suspended bridge over rainforest canopy in Costa Rica", fr: "Pont suspendu au-dessus de la canopée, Costa Rica" }, mapsUrl: "https://maps.app.goo.gl/EVqJoFp4Vp1KbpwR8" },
    { name: "Birdwatching (toucans, quetzals)", region: { en: "Cloud forest + lowlands", fr: "Forêt nuageuse + plaines" }, description: { en: "900+ bird species — more than US + Canada combined. The resplendent quetzal is the bucket-list bird (Monteverde and San Gerardo de Dota, dry season). Toucans (keel-billed, chestnut-mandibled) are common across all lowland forest. Bring binoculars; guides spot 3x what you would.", fr: "900+ espèces d'oiseaux — plus que les États-Unis et le Canada réunis. Le resplendissant quetzal est l'oiseau-objectif (Monteverde et San Gerardo de Dota, saison sèche). Les toucans (toucan à carène, à mandibule châtaigne) sont communs partout en plaine forestière. Apportez des jumelles ; les guides repèrent 3x plus que vous." }, image: "/travel-guides/costa-rica/toucan.jpg", imageAlt: { en: "Keel-billed toucan in Costa Rica rainforest", fr: "Toucan à carène dans la forêt tropicale du Costa Rica" }, mapsUrl: "https://maps.app.goo.gl/4Z9p5RuPCxAQYBnp9" },
  ],
  specialties: [
    { name: { en: "Gallo pinto", fr: "Gallo pinto" }, category: "food", description: { en: "Rice + black beans + onions + cilantro + Salsa Lizano (the national condiment) — eaten for breakfast with eggs, cheese, sour cream, and fried plantain. The casado lunch plate is similar (with meat + salad). Costa Rican comfort food, €4–6 anywhere.", fr: "Riz + haricots noirs + oignons + coriandre + Salsa Lizano (le condiment national) — pris au petit-déjeuner avec œufs, fromage, crème aigre et banane plantain frite. Le casado (plat du midi) suit le même schéma avec viande + salade. Comfort food costaricaine, 4-6 € partout." }, image: "/travel-guides/costa-rica/gallo-pinto.jpg", imageAlt: { en: "Gallo pinto with fried eggs and plantain", fr: "Gallo pinto avec œufs au plat et plantain" } },
    { name: { en: "Costa Rican coffee", fr: "Café costaricain" }, category: "drink", description: { en: "Volcanic-soil arabica from the Central Valley (Tarrazú is the premium region). Plantation tours (Doka, Britt, Hacienda Alsacia) walk you through bean-to-cup for €30. Coffee comes in a chorreador (cloth filter) — sweet, smooth, never bitter.", fr: "Arabica de sol volcanique de la Vallée Centrale (Tarrazú est la région premium). Les visites de plantation (Doka, Britt, Hacienda Alsacia) font le tour du grain à la tasse pour 30 €. Le café passe par un chorreador (filtre en tissu) — doux, rond, jamais amer." }, image: "/travel-guides/costa-rica/coffee.jpg", imageAlt: { en: "Costa Rican coffee plantation beans", fr: "Grains de café d'une plantation costaricaine" } },
    { name: { en: "Pacific surf", fr: "Surf Pacifique" }, category: "experience", description: { en: "Year-round, beginner-to-expert. Tamarindo for lessons, Playa Avellanas for intermediate point breaks, Playa Hermosa (Jacó) for advanced, Witch's Rock (Ollie's Point, only by boat) for the legends. Group lessons €40–60, board rental €15/day.", fr: "Toute l'année, du débutant à l'expert. Tamarindo pour les cours, Playa Avellanas pour les pointbreaks intermédiaires, Playa Hermosa (Jacó) pour les confirmés, Witch's Rock (Ollie's Point, en bateau uniquement) pour les légendes. Cours collectifs 40-60 €, location de planche 15 €/jour." }, image: "/travel-guides/costa-rica/surf-pacific.jpg", imageAlt: { en: "Surfer on a Costa Rican Pacific beach", fr: "Surfeur sur une plage Pacifique du Costa Rica" } },
    { name: { en: "Zipline & canopy", fr: "Tyrolienne & canopée" }, category: "experience", description: { en: "Costa Rica invented commercial zip-line tourism in 1994. Modern courses have 8–12 cables totaling 2–5km, some 200m above the canopy. Monteverde, Arenal, Manuel Antonio all have multiple operators (€60–100). Mistico, Sky Adventures, Selvatura are well-rated.", fr: "Le Costa Rica a inventé la tyrolienne touristique commerciale en 1994. Les parcours modernes ont 8-12 câbles totalisant 2-5 km, certains à 200 m au-dessus de la canopée. Monteverde, Arenal, Manuel Antonio ont plusieurs opérateurs (60-100 €). Mistico, Sky Adventures, Selvatura sont bien notés." }, image: "/travel-guides/costa-rica/zipline.jpg", imageAlt: { en: "Canopy walkway in Costa Rica rainforest", fr: "Passerelle dans la canopée d'une forêt costaricaine" } },
    { name: { en: "Hot springs", fr: "Sources chaudes" }, category: "experience", description: { en: "Volcanic activity = free hot springs everywhere. La Fortuna (Arenal area) has Tabacón (luxury) and free riverside hot springs (just behind it). Rincón de la Vieja (north Pacific) has rough wild springs. The thermal-spa-and-cocktail experience or the wade-into-jungle-river version — both excellent.", fr: "Activité volcanique = sources chaudes partout. La Fortuna (zone Arenal) a Tabacón (luxe) et des sources chaudes gratuites au bord de la rivière (juste derrière). Rincón de la Vieja (Pacifique nord) a des sources sauvages rugueuses. L'expérience spa thermal-cocktail ou la version randonnée-dans-la-rivière de jungle — toutes deux excellentes." }, image: "/travel-guides/costa-rica/quetzal.jpg", imageAlt: { en: "Quetzal in a Costa Rican cloud forest tree", fr: "Quetzal sur un arbre de forêt nuageuse, Costa Rica" } },
    { name: { en: "Pura vida culture", fr: "Culture pura vida" }, category: "experience", description: { en: "More than a slogan — Costa Rica is the 'happiest country on earth' in repeat Gallup polls, has the world's longest-living men (Nicoya peninsula is one of five Blue Zones). The vibe is low-stress, take-your-time, no military, no income tax. Lean into it.", fr: "Plus qu'un slogan — le Costa Rica est le « pays le plus heureux du monde » selon les sondages Gallup récurrents, abrite les hommes les plus longévifs du monde (la péninsule de Nicoya est l'une des 5 Blue Zones). L'ambiance est sans stress, sans armée, sans impôt sur le revenu. Lâchez prise." }, image: "/travel-guides/costa-rica/puerto-viejo.jpg", imageAlt: { en: "Tropical beach with palms on the Costa Rican coast", fr: "Plage tropicale avec palmiers sur la côte costaricaine" } },
    { name: { en: "Rio Celeste & natural blues", fr: "Río Celeste & bleus naturels" }, category: "experience", description: { en: "The Rio Celeste's sky-blue color comes from volcanic aluminosilicates that scatter light — National Geographic-level phenomenon. Tenorio National Park, 2hr from La Fortuna. The waterfall at the source of the color is the postcard. Best after rainless days; muddy after storms.", fr: "La couleur bleu ciel du Río Celeste vient d'aluminosilicates volcaniques qui diffractent la lumière — phénomène digne de National Geographic. Parc national Tenorio, à 2h de La Fortuna. La cascade au point d'origine de la couleur est la carte postale. Idéal après des jours sans pluie ; boueux après les orages." }, image: "/travel-guides/costa-rica/rio-celeste.jpg", imageAlt: { en: "Sky-blue Rio Celeste waterfall in Tenorio", fr: "Cascade du Río Celeste bleu ciel à Tenorio" } },
  ],
  regions: [
    { name: { en: "Central Valley & San José", fr: "Vallée Centrale & San José" }, highlights: { en: "San José, Poás, Irazú, Doka coffee tour", fr: "San José, Poás, Irazú, plantation Doka" }, description: { en: "Where you land (SJO airport) and not much else. Poás volcano is 1hr north, Doka coffee is on the way. San José city has the Pre-Columbian Gold Museum but isn't a destination — most travelers leave for Arenal or the coast within hours.", fr: "Là où on atterrit (aéroport SJO) et pas grand-chose d'autre. Le volcan Poás est à 1h au nord, la plantation Doka sur le chemin. La ville de San José a son musée de l'Or précolombien mais n'est pas une destination — la plupart des voyageurs partent vers Arenal ou la côte dans la journée." } },
    { name: { en: "Arenal & northern lowlands", fr: "Arenal & basses terres du nord" }, highlights: { en: "Arenal Volcano, La Fortuna, Caño Negro wetlands", fr: "Volcan Arenal, La Fortuna, marais de Caño Negro" }, description: { en: "The activity capital — volcano + hot springs + waterfalls + zip-lines + hanging bridges + rafting. La Fortuna town has the densest concentration. 3 days minimum.", fr: "La capitale des activités — volcan + sources chaudes + cascades + tyroliennes + ponts suspendus + rafting. La ville de La Fortuna concentre tout. 3 jours minimum." } },
    { name: { en: "Monteverde & cloud forests", fr: "Monteverde & forêts nuageuses" }, highlights: { en: "Monteverde Cloud Forest, Santa Elena, hummingbirds", fr: "Forêt nuageuse de Monteverde, Santa Elena, colibris" }, description: { en: "High-altitude misty forests, cooler temperatures (15–22°C), best birding. The road from Arenal is famously rough (3–4 hours of dirt road); some take the boat-jeep-boat shortcut. 2 days is right.", fr: "Forêts brumeuses d'altitude, températures plus fraîches (15-22°C), meilleur birding. La route depuis Arenal est connue pour être chaotique (3-4h de piste) ; certains prennent le raccourci bateau-jeep-bateau. 2 jours suffisent." } },
    { name: { en: "Pacific Coast (Manuel Antonio, Nicoya)", fr: "Côte Pacifique (Manuel Antonio, Nicoya)" }, highlights: { en: "Manuel Antonio, Jacó, Tamarindo, Nosara, Santa Teresa", fr: "Manuel Antonio, Jacó, Tamarindo, Nosara, Santa Teresa" }, description: { en: "The beach circuit. Manuel Antonio for the postcard small park + beach. Nicoya peninsula for surf and Blue-Zone-yoga vibe. Liberia airport (LIR) is the gateway for Guanacaste; SJO works for Manuel Antonio.", fr: "Le circuit balnéaire. Manuel Antonio pour le petit parc carte postale + plage. La péninsule de Nicoya pour le surf et l'ambiance Blue Zone yoga. L'aéroport de Liberia (LIR) est la porte du Guanacaste ; SJO marche pour Manuel Antonio." } },
    { name: { en: "Caribbean coast (Limón)", fr: "Côte Caraïbe (Limón)" }, highlights: { en: "Tortuguero, Cahuita, Puerto Viejo, Manzanillo", fr: "Tortuguero, Cahuita, Puerto Viejo, Manzanillo" }, description: { en: "Afro-Caribbean culture, reggae, slower pace, jerk chicken and rondón stew. Tortuguero north for turtle nesting; Cahuita and Puerto Viejo south for beach-town reggae vibe. Different country, basically.", fr: "Culture afro-caribéenne, reggae, rythme plus lent, poulet jerk et ragoût rondón. Tortuguero au nord pour la ponte des tortues ; Cahuita et Puerto Viejo au sud pour l'ambiance reggae village. Un autre pays, en gros." } },
    { name: { en: "Osa Peninsula (Corcovado)", fr: "Péninsule d'Osa (Corcovado)" }, highlights: { en: "Corcovado, Drake Bay, Puerto Jiménez, Cocos Island offshore", fr: "Corcovado, Drake Bay, Puerto Jiménez, île Coco au large" }, description: { en: "The wildest part of the country — primary rainforest, all four monkey species, scarlet macaws, the elusive jaguar. Hard to reach (small plane from SJO recommended), expensive lodges, mandatory guides in Corcovado. Worth the effort for a second trip.", fr: "La partie la plus sauvage du pays — forêt primaire, les 4 espèces de singes, aras rouges, le jaguar insaisissable. Difficile d'accès (petit avion depuis SJO recommandé), lodges chers, guides obligatoires à Corcovado. Vaut l'effort pour une deuxième visite." } },
  ],
  itineraries: [
    { days: 7, title: { en: "Classic loop — 7 days", fr: "Boucle classique — 7 jours" }, summary: { en: "Arenal + Manuel Antonio + day trip to a coffee plantation.", fr: "Arenal + Manuel Antonio + journée en plantation de café." }, stops: { en: ["Day 1: Arrive SJO, drive to La Fortuna", "Day 2–3: Arenal (volcano, hot springs, hanging bridges, La Fortuna falls)", "Day 4: Drive to Manuel Antonio (5hr)", "Day 5–6: Manuel Antonio (park + beach)", "Day 7: Drive back, fly home"], fr: ["Jour 1 : arrivée SJO, route pour La Fortuna", "Jour 2-3 : Arenal (volcan, sources chaudes, ponts suspendus, cascade de La Fortuna)", "Jour 4 : route pour Manuel Antonio (5h)", "Jour 5-6 : Manuel Antonio (parc + plage)", "Jour 7 : retour, vol"] } },
    { days: 10, title: { en: "Volcanoes + cloud forest + coast — 10 days", fr: "Volcans + forêt nuageuse + côte — 10 jours" }, summary: { en: "Add Monteverde for the highland piece.", fr: "Ajoute Monteverde pour la partie altitude." }, stops: { en: ["Day 1: SJO → La Fortuna", "Day 2–4: Arenal", "Day 5: Drive to Monteverde", "Day 6–7: Monteverde (hanging bridges, zip-line, quetzal hunt)", "Day 8: Drive to Manuel Antonio", "Day 9–10: Manuel Antonio + back to SJO"], fr: ["Jour 1 : SJO → La Fortuna", "Jour 2-4 : Arenal", "Jour 5 : route pour Monteverde", "Jour 6-7 : Monteverde (ponts suspendus, tyrolienne, chasse au quetzal)", "Jour 8 : route pour Manuel Antonio", "Jour 9-10 : Manuel Antonio + retour SJO"] } },
    { days: 14, title: { en: "Both coasts — 14 days", fr: "Deux côtes — 14 jours" }, summary: { en: "Add the Caribbean side. Different vibe entirely.", fr: "Ajoute la côte caraïbe. Ambiance totalement différente." }, stops: { en: ["Day 1: SJO + Poás Volcano", "Day 2–4: Arenal", "Day 5–6: Monteverde", "Day 7–8: Manuel Antonio", "Day 9–10: Nicoya peninsula surf town", "Day 11–13: Caribbean side — Tortuguero + Puerto Viejo", "Day 14: Back to SJO, fly home"], fr: ["Jour 1 : SJO + volcan Poás", "Jour 2-4 : Arenal", "Jour 5-6 : Monteverde", "Jour 7-8 : Manuel Antonio", "Jour 9-10 : village de surf de la péninsule Nicoya", "Jour 11-13 : côte caraïbe — Tortuguero + Puerto Viejo", "Jour 14 : retour SJO, vol retour"] } },
  ],
  budget: {
    currency: "EUR",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 60, description: { en: "Hostel dorm or basic cabina (€20), soda lunches + market dinners (€15), buses + shared shuttles (€15), one paid activity (€10). Costa Rica isn't cheap by Central American standards — it's the most expensive country in the region.", fr: "Dortoir d'auberge ou cabina simple (20 €), déjeuners en soda + dîners au marché (15 €), bus + navettes partagées (15 €), une activité payante (10 €). Le Costa Rica n'est pas bon marché aux standards d'Amérique centrale — c'est le pays le plus cher de la région." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 150, description: { en: "Eco-lodge or 3-star with breakfast (€90), one sit-down dinner + casual lunch (€30), rental car or private shuttle (€20), entries and activities (€10). The right tier — eco-lodges are part of the experience.", fr: "Eco-lodge ou 3 étoiles avec petit-déj (90 €), un dîner attablé + déjeuner décontracté (30 €), voiture ou navette privée (20 €), entrées et activités (10 €). Le bon équilibre — les eco-lodges font partie de l'expérience." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 350, description: { en: "Luxury eco-lodge with private guide (€220), fine-dining or chef-prepared meal (€80), 4x4 rental + transfers (€30), private nature guide (€20). Honeymoon and Pacific-resort tier.", fr: "Eco-lodge de luxe avec guide privé (220 €), dîner gastronomique ou repas signature (80 €), 4x4 + transferts (30 €), guide nature privé (20 €). Tier lune de miel et resort Pacifique." } },
    ],
    note: { en: "Per person, excluding international flights. The country uses both colones and US dollars interchangeably — tourist places quote in USD. Tip 10% at restaurants (usually included as 'servicio' on the bill, so an additional tip is optional). Cards work in most places; cash for small soda restaurants and rural areas.", fr: "Par personne, hors vol international. Le pays utilise colones et dollars américains de manière interchangeable — les lieux touristiques affichent en USD. Pourboire 10 % au resto (souvent déjà inclus en « servicio » sur l'addition, donc un pourboire en plus est optionnel). Carte partout ou presque ; cash dans les petits sodas et zones rurales." },
  },
  tips: [
    { do: true, text: { en: "Rent a 4x4 if you're going beyond Arenal and Manuel Antonio. Many smaller roads and beach access tracks need clearance and traction. Insurance is mandatory through the rental — full coverage is around €25/day extra and worth it on Costa Rica's pothole-ridden roads.", fr: "Louez un 4x4 dès que vous sortez d'Arenal et Manuel Antonio. Beaucoup de petites routes et d'accès aux plages demandent garde au sol et traction. L'assurance est obligatoire chez le loueur — la couverture totale coûte 25 €/jour de plus et vaut le coup sur les routes en nid de poule du pays." } },
    { do: true, text: { en: "Book Manuel Antonio National Park tickets online — they cap daily visitors. Same for Corcovado (mandatory guide + permit). Arenal, Monteverde, and Tortuguero don't require advance tickets, but lodge accommodation should be booked 2–4 months ahead in dry season.", fr: "Réservez les billets du parc Manuel Antonio en ligne — quota journalier. Idem pour Corcovado (guide + permis obligatoires). Arenal, Monteverde et Tortuguero ne demandent pas de billets à l'avance, mais l'hébergement en lodge doit se réserver 2-4 mois avant en saison sèche." } },
    { do: false, text: { en: "Don't feed monkeys or any wildlife. Tourists who feed capuchins make them aggressive and they're now banned from many beaches. Fines exist for park visitors caught feeding animals — and the monkeys carry diseases anyway.", fr: "Ne nourrissez ni les singes ni aucune faune sauvage. Les touristes qui nourrissent les capucins les rendent agressifs — ils sont désormais interdits sur beaucoup de plages. Les visiteurs des parcs surpris à nourrir les animaux s'exposent à des amendes — et les singes transmettent des maladies de toute façon." } },
    { do: true, text: { en: "Drive only in daylight when possible. Mountain roads, no streetlights, poor signage, wandering wildlife (and farm animals). Arrival at your lodge by 5pm is the rule for first-time visitors.", fr: "Roulez en plein jour dès que possible. Routes de montagne, pas d'éclairage, signalisation faible, faune (et animaux de ferme) qui traverse. Arrivée au lodge avant 17h, c'est la règle pour une première visite." } },
    { do: false, text: { en: "Don't visit during US winter break (Dec 20 – Jan 5) unless you've booked 6 months ahead. Prices double, the best lodges sell out, restaurants are packed. Same for Easter week (Semana Santa).", fr: "Évitez les vacances d'hiver américaines (20 déc. – 5 janv.) sauf si vous avez réservé 6 mois avant. Prix doublés, les meilleurs lodges complets, restos saturés. Idem pour la Semana Santa (semaine de Pâques)." } },
    { do: true, text: { en: "Drink tap water in cities and most towns. Costa Rica has Latin America's best municipal water. Be careful in remote rural areas (Osa, Caribbean coast); bottled water there.", fr: "Buvez l'eau du robinet en ville et dans la plupart des villes. Le Costa Rica a la meilleure eau municipale d'Amérique latine. Prudence dans les zones rurales reculées (Osa, côte caraïbe) ; bouteille là-bas." } },
    { do: true, text: { en: "Pack quick-dry clothes and rain gear regardless of season. Even dry season has 20-minute downpours; green season is daily. Hiking sandals (Tevas, Chacos) are the universal Costa Rica shoe.", fr: "Prévoyez des vêtements à séchage rapide et une couche imperméable, quelle que soit la saison. Même la saison sèche a ses averses de 20 minutes ; la saison verte, c'est tous les jours. Les sandales de rando (Tevas, Chacos) sont la chaussure universelle du Costa Rica." } },
    { do: false, text: { en: "Don't underestimate the heat in lowlands (32–35°C + humidity). Cloud forest stays cool (15–22°C); beach Pacific lowlands and the Caribbean are brutal midday. Plan activities for dawn and late afternoon.", fr: "Ne sous-estimez pas la chaleur en plaine (32-35°C + humidité). La forêt nuageuse reste fraîche (15-22°C) ; la plaine Pacifique et la côte caraïbe sont brutales à midi. Calez les activités à l'aube et en fin d'après-midi." } },
  ],
  related: ["mexico"],
  relatedDestinations: [],
};

// ---------------------------------------------------------------------------
// 15. USA
// ---------------------------------------------------------------------------
const usa: CountryGuide = {
  slug: { en: "usa", fr: "etats-unis" },
  country: { en: "USA", fr: "États-Unis" },
  continent: "north-america",
  hero: {
    image: "/travel-guides/usa/hero.jpg",
    imageAlt: { en: "New York City Manhattan skyline at sunset", fr: "La skyline de Manhattan, New York au coucher du soleil" },
    tag: { en: "Country guide · North America", fr: "Guide pays · Amérique du Nord" },
  },
  meta: {
    title: { en: "USA Travel Guide 2026 — Where to Go, Eat & How to Plan", fr: "Guide voyage USA 2026 — Que voir, manger, comment partir" },
    description: { en: "Real USA travel guide for 2026: New York to the Grand Canyon, national parks, regional food, honest budgets, cultural do's and don'ts.", fr: "Guide voyage USA 2026, sans bla-bla : New York au Grand Canyon, parcs nationaux, cuisine, budget honnête, codes culturels." },
  },
  intro: {
    en: [
      "The USA is not one country, it's fifty — different climates, accents, food, even alcohol laws. The Northeast is Europe-meets-density. The South is BBQ, blues, hospitality. The Midwest is friendly, flat, and surprising. The West is national parks, deserts, and Pacific. Hawaii and Alaska are their own worlds. Pick one or two regions per trip; don't try to do it all.",
      "First trip pattern: New York + Las Vegas + Grand Canyon + San Francisco (the classic 'East-and-West' loop, 14 days, internal flight included). Or East-coast triangle: NYC + Washington DC + maybe Boston or Miami (10 days, train/short flights). Second trip: National parks Southwest loop (Vegas-Zion-Bryce-Grand Canyon-Sedona, road trip). Third: Pacific Northwest or the South.",
      "Two things to know. Distances are continental — coast-to-coast is 5 days driving, NYC to LA is 6 hours by plane. Internal flights are cheap (€80–200) and essential. And tipping is brutal — 18–22% expected at sit-down restaurants, $1–2 per drink at bars, $2 per bag for porters. Budget 15% extra everywhere over the menu price.",
    ],
    fr: [
      "Les États-Unis, ce n'est pas un pays mais cinquante — climats, accents, cuisines, lois sur l'alcool tous différents. Le Nord-Est ressemble à l'Europe en plus dense. Le Sud, c'est le BBQ, le blues, l'hospitalité. Le Midwest est sympa, plat, surprenant. L'Ouest, ce sont les parcs nationaux, les déserts et le Pacifique. Hawaï et l'Alaska sont des mondes à part. Choisissez une ou deux régions par voyage ; n'essayez pas de tout faire.",
      "Schéma première fois : New York + Las Vegas + Grand Canyon + San Francisco (le classique « Est-Ouest », 14 jours, vol intérieur inclus). Ou triangle côte est : NYC + Washington DC + Boston ou Miami (10 jours, train/vols courts). Deuxième fois : boucle parcs du Sud-Ouest (Vegas-Zion-Bryce-Grand Canyon-Sedona, road trip). Troisième : Pacific Northwest ou le Sud.",
      "Deux trucs à savoir. Les distances sont continentales — d'une côte à l'autre, c'est 5 jours en voiture, NYC-LA c'est 6h en avion. Les vols intérieurs sont pas chers (80-200 €) et indispensables. Et le pourboire est brutal — 18-22 % attendus en resto attablé, 1-2 $ par verre au bar, 2 $ par bagage pour les bagagistes. Budgétez 15 % en plus partout au-dessus du prix affiché.",
    ],
  },
  quickFacts: {
    capital: { en: "Washington, DC", fr: "Washington, DC" },
    language: { en: "English (no official federal language)", fr: "Anglais (pas de langue officielle fédérale)" },
    currency: { code: "USD", symbol: "$" },
    timezone: "6 time zones from East (UTC-5) to Hawaii (UTC-10)",
    visa: { en: "ESTA visa-waiver for EU, UK, Australia (online, US$21, 90 days). Canadians visa-free. Apply 3+ days before travel.", fr: "ESTA (visa-waiver) pour UE, Royaume-Uni, Australie (en ligne, 21 US$, 90 jours). Canadiens sans visa. À demander 3+ jours avant le départ." },
    plug: "Type A / B · 120V",
    driveSide: "right",
    population: "~334M",
  },
  bestSeason: {
    best: { months: { en: "May – June · September – October", fr: "Mai – juin · septembre – octobre" }, description: { en: "Spring and fall — mild weather across most of the country, shoulder-season prices, fall foliage in the Northeast and Midwest. National parks at their best before the summer crush. Best general windows; specific regions have their own micro-seasons.", fr: "Printemps et automne — temps doux sur l'essentiel du pays, prix d'épaule, couleurs d'automne dans le Nord-Est et le Midwest. Parcs nationaux à leur meilleur avant la cohue de l'été. Les meilleures fenêtres générales ; les régions ont leurs propres micro-saisons." } },
    shoulder: { months: { en: "March – April · November", fr: "Mars – avril · novembre" }, description: { en: "Mild south (Florida, southwest, Hawaii), still cold in the north. Cherry blossoms in DC late March. Spring break crowds (March) at Florida and ski resorts. Thanksgiving (4th Thursday of November) — domestic travel chaos, many things close.", fr: "Doux au sud (Floride, sud-ouest, Hawaï), encore froid au nord. Cerisiers en fleurs à Washington fin mars. Foule du spring break (mars) en Floride et stations de ski. Thanksgiving (4e jeudi de novembre) — chaos sur les voyages intérieurs, beaucoup de choses ferment." } },
    avoid: { months: { en: "July – August (national parks, big cities)", fr: "Juillet – août (parcs nationaux, grandes villes)" }, description: { en: "Peak everything — Yellowstone, Yosemite, Grand Canyon all packed and pricey. NYC is 35°C and humid. Phoenix and Las Vegas hit 45°C. National-park lodges sell out 6+ months ahead. Hawaii's only OK time year-round.", fr: "Tout au max — Yellowstone, Yosemite, Grand Canyon saturés et chers. NYC à 35°C et humide. Phoenix et Las Vegas à 45°C. Les lodges des parcs sont complets 6 mois à l'avance. Hawaï reste l'unique destination correcte toute l'année." } },
  },
  mustSee: [
    { name: "New York City", region: { en: "New York", fr: "New York" }, description: { en: "The most photographed city on earth. Central Park, the Met, the High Line, Brooklyn Bridge at sunset, $1 pizza slices, the subway. Stay in Manhattan for first trip (Midtown or Lower East Side); cross to Brooklyn or Queens for eating. Minimum 3 days; 5 is right.", fr: "La ville la plus photographiée au monde. Central Park, le Met, la High Line, le pont de Brooklyn au coucher du soleil, la pizza à 1 $ la part, le métro. Logez à Manhattan pour une première fois (Midtown ou Lower East Side) ; traversez à Brooklyn ou Queens pour manger. 3 jours minimum ; 5, c'est l'idéal." }, image: "/travel-guides/usa/nyc.jpg", imageAlt: { en: "Manhattan skyline from Brooklyn Bridge Park", fr: "Skyline de Manhattan depuis Brooklyn Bridge Park" }, mapsUrl: "https://maps.app.goo.gl/9HuMv2yvSJfd2hgU8" },
    { name: "Grand Canyon", region: { en: "Arizona", fr: "Arizona" }, description: { en: "1.6km deep, 446km long, layers of rock 1.8 billion years old. South Rim is the year-round, accessible side (open all year); North Rim is the seasonal, quieter side (closed in winter). Sunset at Mather Point is a religious experience. 4-hour drive from Las Vegas.", fr: "1,6 km de profondeur, 446 km de long, des couches rocheuses vieilles de 1,8 milliard d'années. La rive sud est l'accessible toute l'année ; la rive nord, saisonnière et plus calme (fermée en hiver). Le coucher de soleil à Mather Point est une expérience religieuse. À 4h de route de Las Vegas." }, image: "/travel-guides/usa/grand-canyon.jpg", imageAlt: { en: "Grand Canyon viewed from the South Rim at sunset", fr: "Le Grand Canyon vu de la rive sud au coucher du soleil" }, mapsUrl: "https://maps.app.goo.gl/UMFEUWZkn4MnskNa6" },
    { name: "Yellowstone & Grand Teton", region: { en: "Wyoming/Montana/Idaho", fr: "Wyoming/Montana/Idaho" }, description: { en: "America's first national park (1872). Grand Prismatic Spring (the iconic rainbow pool), Old Faithful geyser (every 90 minutes), the Lower Falls, wildlife (bison, wolves, bears). Add Grand Teton next door for the dramatic mountains. 5–7 days minimum.", fr: "Premier parc national d'Amérique (1872). Grand Prismatic Spring (la mare arc-en-ciel iconique), le geyser Old Faithful (toutes les 90 min), les Lower Falls, la faune (bisons, loups, ours). Ajoutez Grand Teton voisin pour les montagnes dramatiques. 5-7 jours minimum." }, image: "/travel-guides/usa/yellowstone.jpg", imageAlt: { en: "Grand Prismatic Spring in Yellowstone", fr: "Grand Prismatic Spring à Yellowstone" }, mapsUrl: "https://maps.app.goo.gl/Xpw8MaeDmFmpRk5p7" },
    { name: "San Francisco — Golden Gate", region: { en: "California", fr: "Californie" }, description: { en: "The Golden Gate Bridge, Alcatraz, the cable cars on the hills, sourdough bread, Chinatown (oldest in North America). The fog rolls in afternoon — wear a layer year-round. Pair with Napa Valley (wine, 1hr north) or the coast drive to Big Sur (4hr south).", fr: "Le Golden Gate Bridge, Alcatraz, les cable cars dans les collines, le pain au levain, Chinatown (le plus ancien d'Amérique du Nord). Le brouillard arrive l'après-midi — prévoyez une couche toute l'année. À combiner avec Napa Valley (vin, 1h au nord) ou la route côtière jusqu'à Big Sur (4h au sud)." }, image: "/travel-guides/usa/golden-gate.jpg", imageAlt: { en: "Golden Gate Bridge from Marin Headlands", fr: "Golden Gate Bridge vu des Marin Headlands" }, mapsUrl: "https://maps.app.goo.gl/r2HVT8oHJFnUKE8Y6" },
    { name: "Las Vegas Strip", region: { en: "Nevada", fr: "Nevada" }, description: { en: "The world capital of artificial fun. The Strip is 6km of mega-casinos with themed architecture — Eiffel Tower (Paris), Venice canals (Venetian), Sphinx (Luxor). Shows (Cirque du Soleil, residencies), buffets, pool parties, gambling. Use Vegas as a 2-night stop and base for Grand Canyon/Zion road trips.", fr: "La capitale mondiale du divertissement artificiel. Le Strip, c'est 6 km de méga-casinos à architecture thématique — Tour Eiffel (Paris), canaux de Venise (Venetian), Sphinx (Luxor). Spectacles (Cirque du Soleil, résidences), buffets, pool parties, casino. Utilisez Vegas en escale de 2 nuits et base pour les road trips Grand Canyon/Zion." }, image: "/travel-guides/usa/las-vegas.jpg", imageAlt: { en: "Las Vegas Strip neon lights at night", fr: "Néons du Strip de Las Vegas la nuit" }, mapsUrl: "https://maps.app.goo.gl/D1y9N4hKDvbDxKNg7" },
    { name: "Yosemite National Park", region: { en: "California", fr: "Californie" }, description: { en: "The temple of American climbing — Half Dome, El Capitan, Yosemite Falls (highest in North America, May–June only). Glacier Point view of the valley. Drive 3hr from San Francisco. Reservations required to enter the park April–October.", fr: "Le temple de l'escalade américaine — Half Dome, El Capitan, Yosemite Falls (la plus haute chute d'Amérique du Nord, mai-juin uniquement). Le panorama Glacier Point sur la vallée. À 3h de route de San Francisco. Réservation obligatoire pour entrer dans le parc d'avril à octobre." }, image: "/travel-guides/usa/yosemite.jpg", imageAlt: { en: "Yosemite Valley with Half Dome", fr: "Vallée de Yosemite avec Half Dome" }, mapsUrl: "https://maps.app.goo.gl/cDkmQHcWNd9LF7yE7" },
    { name: "New Orleans French Quarter", region: { en: "Louisiana", fr: "Louisiane" }, description: { en: "America's most European-feeling city — French/Spanish/Creole/Cajun fused. Bourbon Street is the touristy one; Frenchmen Street is where the actual jazz happens. Beignets at Café du Monde (open 24/7), gumbo and étouffée everywhere. Mardi Gras (Feb–Mar) is the chaos peak.", fr: "La ville américaine la plus européenne — française/espagnole/créole/cajun fusionnées. Bourbon Street est touristique ; Frenchmen Street, c'est là où le vrai jazz se joue. Beignets au Café du Monde (ouvert 24/7), gumbo et étouffée partout. Mardi gras (fév.-mars) est le pic de chaos." }, image: "/travel-guides/usa/new-orleans.jpg", imageAlt: { en: "New Orleans French Quarter balcony with wrought iron", fr: "Balcon en fer forgé du French Quarter, New Orleans" }, mapsUrl: "https://maps.app.goo.gl/aRrJoxqsd6vCv7vw7" },
    { name: "Hawaii — Big Island & Maui", region: { en: "Hawaii", fr: "Hawaï" }, description: { en: "Volcanoes, beaches, jungle, all-year warm. Big Island has active volcanoes (Kīlauea, sometimes erupting) and black-sand beaches. Maui has Road to Hana (jungle waterfalls) and Haleakalā sunrise. Oahu (where Honolulu is) for the urban version; Kauai for the wildest. Fly into HNL.", fr: "Volcans, plages, jungle, chaud toute l'année. Big Island a des volcans actifs (Kīlauea, parfois en éruption) et des plages de sable noir. Maui offre la Road to Hana (cascades de jungle) et le lever du soleil à Haleakalā. Oahu (où se trouve Honolulu) pour la version urbaine ; Kauai pour la plus sauvage. Vol pour HNL." }, image: "/travel-guides/usa/hawaii.jpg", imageAlt: { en: "Hawaiian beach with lava rocks and palm trees", fr: "Plage hawaïenne avec rochers de lave et cocotiers" }, mapsUrl: "https://maps.app.goo.gl/jK1ALdfn2vTPnDYa8" },
    { name: "Miami & Florida Keys", region: { en: "Florida", fr: "Floride" }, description: { en: "South Beach art deco hotels, Cuban food in Little Havana, Wynwood street art. The Florida Keys are a 200km island chain south — drive the Overseas Highway to Key West (Hemingway's house). Best November–April; summer is 35°C and hurricane risk.", fr: "Les hôtels Art déco de South Beach, la cuisine cubaine de Little Havana, le street art de Wynwood. Les Florida Keys sont une chaîne d'îles de 200 km au sud — la Overseas Highway jusqu'à Key West (maison d'Hemingway). Idéal de novembre à avril ; l'été c'est 35°C et risque d'ouragan." }, image: "/travel-guides/usa/miami.jpg", imageAlt: { en: "Art deco hotels along Miami South Beach", fr: "Hôtels Art déco de South Beach, Miami" }, mapsUrl: "https://maps.app.goo.gl/p15Z9ZsBLGyL3GFv7" },
    { name: "Chicago", region: { en: "Illinois", fr: "Illinois" }, description: { en: "America's underrated big city. Architecture (the city invented the skyscraper), deep-dish pizza, blues bars on the South Side, Cloud Gate ('the Bean') in Millennium Park, the lakefront trail. Architecture boat tour on the river is the best $50 you'll spend.", fr: "La grande ville américaine sous-cotée. Architecture (la ville a inventé le gratte-ciel), pizza deep-dish, bars de blues dans le South Side, Cloud Gate (« le Bean ») dans Millennium Park, la promenade au bord du lac. Le tour en bateau d'architecture sur la rivière vaut largement ses 50 $." }, image: "/travel-guides/usa/chicago.jpg", imageAlt: { en: "Chicago skyline at sunset", fr: "Skyline de Chicago au coucher du soleil" }, mapsUrl: "https://maps.app.goo.gl/8vAGUL4qHGTbHmFh9" },
    { name: "Washington, DC", region: { en: "District of Columbia", fr: "District de Columbia" }, description: { en: "Capitol Hill, Lincoln Memorial, White House (Pennsylvania Ave view only since 2001), the Smithsonian museums (19 of them, all free). Cherry blossoms late March-early April. 4-hour train from NYC ($50 Amtrak) — easy 2-3 day add-on.", fr: "Capitol Hill, Lincoln Memorial, White House (vue Pennsylvania Avenue uniquement depuis 2001), les musées Smithsonian (19, tous gratuits). Cerisiers en fleurs fin mars-début avril. 4h de train depuis NYC (50 $ avec Amtrak) — extension facile de 2-3 jours." }, image: "/travel-guides/usa/washington-dc.jpg", imageAlt: { en: "Washington Monument reflected in the Reflecting Pool", fr: "Washington Monument reflété dans le Reflecting Pool" }, mapsUrl: "https://maps.app.goo.gl/V81ahHcF4qFCEMcq9" },
    { name: "Southwest road trip (Zion, Bryce, Sedona)", region: { en: "Utah / Arizona", fr: "Utah / Arizona" }, description: { en: "The greatest concentration of national parks in North America. Vegas → Zion → Bryce Canyon → Capitol Reef → Arches/Canyonlands → Sedona → Grand Canyon → back to Vegas. 7–10 days, rental car mandatory, otherworldly red-rock landscapes the whole way.", fr: "La plus grande concentration de parcs nationaux d'Amérique du Nord. Vegas → Zion → Bryce Canyon → Capitol Reef → Arches/Canyonlands → Sedona → Grand Canyon → retour Vegas. 7-10 jours, voiture obligatoire, paysages rouges irréels du début à la fin." }, image: "/travel-guides/usa/zion-bryce.jpg", imageAlt: { en: "Red rock formations of Zion National Park", fr: "Formations de roche rouge du parc de Zion" }, mapsUrl: "https://maps.app.goo.gl/4P4q9pCNVrA5gB1U9" },
  ],
  specialties: [
    { name: { en: "Burgers, BBQ & American cooking", fr: "Burgers, BBQ & cuisine américaine" }, category: "food", description: { en: "Burgers everywhere; the best are at smash-burger places (Shake Shack, In-N-Out, regional spots). BBQ has 4 styles: Texas (brisket), Kansas City (sweet sauce), Carolina (vinegar pulled-pork), Memphis (dry-rub ribs). Pick the regional one when traveling.", fr: "Les burgers partout ; les meilleurs sont les smash-burgers (Shake Shack, In-N-Out, adresses régionales). Le BBQ a 4 styles : Texas (brisket), Kansas City (sauce sucrée), Caroline (porc effiloché au vinaigre), Memphis (côtes au rub sec). Choisissez le régional là où vous êtes." }, image: "/travel-guides/usa/burger.jpg", imageAlt: { en: "Classic American cheeseburger with fries", fr: "Cheeseburger américain classique avec frites" } },
    { name: { en: "Diner breakfast", fr: "Petit-déj diner" }, category: "food", description: { en: "Pancakes, bacon, eggs, biscuits and gravy, hash browns, bottomless coffee. The 24-hour diner is an American institution — Waffle House (South), Denny's (everywhere), local greasy-spoons (Northeast). $10–18 for a heart-attack breakfast, 1980s vibe included.", fr: "Pancakes, bacon, œufs, biscuits and gravy, hash browns, café à volonté. Le diner 24/7 est une institution — Waffle House (Sud), Denny's (partout), les greasy spoons locaux (Nord-Est). 10-18 $ pour un petit-déj « crise cardiaque », ambiance années 80 incluse." }, image: "/travel-guides/usa/pancakes.jpg", imageAlt: { en: "Stack of American pancakes with syrup", fr: "Pile de pancakes américains avec sirop d'érable" } },
    { name: { en: "Craft beer & bourbon", fr: "Bière artisanale & bourbon" }, category: "drink", description: { en: "America has 9,500+ craft breweries (more than wineries). Every city has a brewery scene. Bourbon is the native spirit (Kentucky, where 95% is made — Buffalo Trace, Maker's Mark, Wild Turkey, Woodford distilleries open for tours). California, Oregon, New York for wine.", fr: "L'Amérique compte 9 500+ brasseries artisanales (plus que de domaines viticoles). Chaque ville a sa scène brassicole. Le bourbon est le spiritueux natif (Kentucky, où 95 % est produit — distilleries Buffalo Trace, Maker's Mark, Wild Turkey, Woodford ouvertes en visite). Californie, Oregon, New York pour le vin." }, image: "/travel-guides/usa/craft-beer.jpg", imageAlt: { en: "Craft beer flight in an American brewery", fr: "Dégustation de bières artisanales dans une brasserie américaine" } },
    { name: { en: "Live music — jazz, blues, country", fr: "Musique live — jazz, blues, country" }, category: "art", description: { en: "New Orleans for jazz (Preservation Hall is the institution, $25 cover), Memphis for blues (Beale Street), Nashville for country (Bluebird Cafe, the Grand Ole Opry), Austin for everything (live-music capital of the world). Every Tuesday night has a venue somewhere worth visiting.", fr: "New Orleans pour le jazz (Preservation Hall est l'institution, 25 $ d'entrée), Memphis pour le blues (Beale Street), Nashville pour le country (Bluebird Cafe, le Grand Ole Opry), Austin pour tout (capitale mondiale de la musique live). Chaque mardi soir, un endroit vaut le détour quelque part." }, image: "/travel-guides/usa/jazz-music.jpg", imageAlt: { en: "Jazz musician performing in a New Orleans bar", fr: "Musicien de jazz en concert dans un bar de la Nouvelle-Orléans" } },
    { name: { en: "Sports — baseball, football, basketball", fr: "Sports — baseball, football, basket" }, category: "experience", description: { en: "A US baseball game is the most American afternoon possible — 3 hours, beer, hot dogs, Cracker Jacks, 7th-inning stretch. NFL is bigger but tickets are pricier ($150+ vs $25 for baseball). NBA games are loud, fast, indoor. Tickets via Vivid Seats / SeatGeek; buy day-of for cheap.", fr: "Un match de baseball est l'après-midi le plus américain qui soit — 3 heures, bière, hot dogs, Cracker Jacks, 7th-inning stretch. La NFL est plus grosse mais plus chère (150 $+ contre 25 $ au baseball). Les matchs de NBA sont bruyants, rapides, en salle. Billets via Vivid Seats / SeatGeek ; le jour même c'est moins cher." }, image: "/travel-guides/usa/baseball.jpg", imageAlt: { en: "American baseball stadium with fans", fr: "Stade de baseball américain avec spectateurs" } },
    { name: { en: "National parks", fr: "Parcs nationaux" }, category: "experience", description: { en: "63 official national parks — the world's first park system (Yellowstone, 1872). The annual pass (€80) covers all of them and pays for itself in 3–4 visits. Most-visited: Great Smoky Mountains, Grand Canyon, Zion, Yellowstone, Yosemite. The crown jewels are concentrated in the West.", fr: "63 parcs nationaux officiels — le premier système de parcs au monde (Yellowstone, 1872). Le pass annuel (80 €) couvre tout et est rentabilisé en 3-4 visites. Les plus visités : Great Smoky Mountains, Grand Canyon, Zion, Yellowstone, Yosemite. Les joyaux sont concentrés dans l'Ouest." }, image: "/travel-guides/usa/zion-bryce.jpg", imageAlt: { en: "Hiker in Zion National Park", fr: "Randonneur dans le parc national de Zion" } },
    { name: { en: "Road trip culture", fr: "Culture road trip" }, category: "experience", description: { en: "The American road trip is the national mythology. Route 66 (Chicago to Santa Monica, 4,000km of decommissioned highway, 2-week drive), Pacific Coast Highway (SF to LA, 600km, 3 days), the Great River Road (Mississippi from Minnesota to Louisiana). Rental cars are cheap ($30–60/day), gas is half European prices, distances make it the point.", fr: "Le road trip américain est la mythologie nationale. La Route 66 (Chicago à Santa Monica, 4 000 km d'autoroute déclassée, 2 semaines de route), la Pacific Coast Highway (SF à LA, 600 km, 3 jours), la Great River Road (Mississippi du Minnesota à la Louisiane). Les voitures en location sont pas chères (30-60 $/jour), l'essence à moitié prix de l'Europe, et la distance est l'objectif." }, image: "/travel-guides/usa/road-trip.jpg", imageAlt: { en: "Open American highway through the desert", fr: "Autoroute américaine désertique" } },
  ],
  regions: [
    { name: { en: "Northeast (NYC, Boston, DC)", fr: "Nord-Est (NYC, Boston, DC)" }, highlights: { en: "New York City, Boston, Washington DC, Philadelphia, Niagara Falls", fr: "New York, Boston, Washington DC, Philadelphie, chutes du Niagara" }, description: { en: "Dense, walkable, train-connected (Amtrak Boston-NYC-DC). The most European-feeling region. Best weather May–June and September–October; brutal humid summers, snowy winters. NYC + DC + Boston in 10 days is the classic East-Coast trip.", fr: "Dense, marchable, relié par train (Amtrak Boston-NYC-DC). La région la plus européenne. Meilleur temps mai-juin et sept.-oct. ; étés humides brutaux, hivers neigeux. NYC + DC + Boston en 10 jours est le classique côte est." } },
    { name: { en: "Southwest (Vegas, Grand Canyon, Sedona)", fr: "Sud-Ouest (Vegas, Grand Canyon, Sedona)" }, highlights: { en: "Las Vegas, Grand Canyon, Zion, Bryce, Antelope Canyon, Sedona, Monument Valley", fr: "Las Vegas, Grand Canyon, Zion, Bryce, Antelope Canyon, Sedona, Monument Valley" }, description: { en: "Red rock + desert landscape = the most photographable region. Fly into Las Vegas (LAS), rent a car, do a 7–10-day national parks loop. Best March–May and September–November; brutal 45°C heat in summer at low elevations.", fr: "Roche rouge + désert = la région la plus photogénique. Vol pour Las Vegas (LAS), location de voiture, boucle de 7-10 jours dans les parcs. Idéal mars-mai et sept.-nov. ; chaleur brutale de 45°C l'été en plaine." } },
    { name: { en: "West Coast (California)", fr: "Côte Ouest (Californie)" }, highlights: { en: "San Francisco, Yosemite, Big Sur, LA, San Diego, Napa", fr: "San Francisco, Yosemite, Big Sur, LA, San Diego, Napa" }, description: { en: "Pacific Coast Highway is the spine — drive SF to LA over 3 days. Yosemite 3 hours east of SF. Napa Valley 1hr north for wine. Year-round mild; cool foggy summer mornings in SF, hot dry in the LA area.", fr: "La Pacific Coast Highway en est l'épine — SF à LA en 3 jours. Yosemite à 3h à l'est de SF. Napa Valley à 1h au nord pour le vin. Doux toute l'année ; matinées d'été fraîches et brumeuses à SF, chaud et sec dans la région LA." } },
    { name: { en: "Pacific Northwest", fr: "Pacific Northwest" }, highlights: { en: "Seattle, Portland, Mount Rainier, Olympic NP, Crater Lake", fr: "Seattle, Portland, Mount Rainier, Olympic NP, Crater Lake" }, description: { en: "Rainy, green, mountains-and-coast. Seattle (Pike Place Market, Space Needle), Portland (food carts, breweries), Mount Rainier glaciers, Olympic rainforest. Best June–September; rain other 9 months. Coffee culture is the densest in the country.", fr: "Pluvieux, vert, montagnes et côte. Seattle (Pike Place Market, Space Needle), Portland (food trucks, brasseries), glaciers du Mount Rainier, forêt humide olympique. Idéal juin-sept. ; pluie les 9 autres mois. La culture café est la plus dense du pays." } },
    { name: { en: "South (New Orleans, Nashville)", fr: "Sud (New Orleans, Nashville)" }, highlights: { en: "New Orleans, Nashville, Memphis, Charleston, Savannah, Atlanta", fr: "New Orleans, Nashville, Memphis, Charleston, Savannah, Atlanta" }, description: { en: "Music + food + history. New Orleans for jazz and Creole; Nashville for country; Memphis for blues and barbecue; Charleston and Savannah for antebellum-era cobblestone old towns. Hot humid summers; perfect spring and fall.", fr: "Musique + cuisine + histoire. New Orleans pour le jazz et le créole ; Nashville pour le country ; Memphis pour le blues et le BBQ ; Charleston et Savannah pour les vieux centres pavés d'avant-guerre. Étés chauds humides ; printemps et automne parfaits." } },
    { name: { en: "Hawaii & Alaska (off-grid)", fr: "Hawaï & Alaska (hors-grille)" }, highlights: { en: "Maui, Oahu, Big Island, Kauai · Anchorage, Denali, Juneau", fr: "Maui, Oahu, Big Island, Kauai · Anchorage, Denali, Juneau" }, description: { en: "Detached from the mainland (5-hour flight from West Coast). Hawaii is tropical, year-round-warm, multi-island. Alaska is wild, glaciers + grizzlies + Denali, only viable May–September. Both are separate trips, not add-ons.", fr: "Détachés du continent (5h de vol depuis la côte ouest). Hawaï est tropical, chaud toute l'année, multi-îles. L'Alaska est sauvage, glaciers + grizzlies + Denali, faisable uniquement de mai à septembre. Tous deux sont des voyages séparés, pas des extensions." } },
  ],
  itineraries: [
    { days: 10, title: { en: "East Coast triangle — 10 days", fr: "Triangle côte est — 10 jours" }, summary: { en: "NYC + DC + Boston or Niagara Falls. Train-connected; no rental car needed.", fr: "NYC + DC + Boston ou chutes du Niagara. Relié par train, aucune voiture nécessaire." }, stops: { en: ["Day 1–4: New York City", "Day 5–6: Washington DC (Amtrak from NYC, 4hr)", "Day 7–8: Boston OR Philadelphia", "Day 9–10: Back to NYC + day in Brooklyn or Coney Island, fly home"], fr: ["Jour 1-4 : New York", "Jour 5-6 : Washington DC (Amtrak depuis NYC, 4h)", "Jour 7-8 : Boston OU Philadelphie", "Jour 9-10 : retour NYC + journée à Brooklyn ou Coney Island, vol retour"] } },
    { days: 14, title: { en: "East + West Coast — 14 days", fr: "Côte est + côte ouest — 14 jours" }, summary: { en: "The 'do America' tour. NYC + Vegas + Grand Canyon + San Francisco.", fr: "Le tour « faire l'Amérique ». NYC + Vegas + Grand Canyon + San Francisco." }, stops: { en: ["Day 1–4: New York City", "Day 5: Fly to Las Vegas", "Day 6: Vegas Strip + show", "Day 7–9: Grand Canyon + Antelope Canyon + Horseshoe Bend road trip", "Day 10: Fly Vegas → San Francisco", "Day 11–13: San Francisco + Yosemite day trip", "Day 14: Fly home from SFO"], fr: ["Jour 1-4 : New York", "Jour 5 : vol pour Las Vegas", "Jour 6 : Strip de Vegas + spectacle", "Jour 7-9 : road trip Grand Canyon + Antelope Canyon + Horseshoe Bend", "Jour 10 : vol Vegas → San Francisco", "Jour 11-13 : San Francisco + journée Yosemite", "Jour 14 : vol retour depuis SFO"] } },
    { days: 14, title: { en: "Southwest national parks — 14 days", fr: "Parcs du Sud-Ouest — 14 jours" }, summary: { en: "The road-trip version. Fly into Vegas, rental car, loop through all the parks.", fr: "Version road trip. Vol pour Vegas, voiture, boucle dans tous les parcs." }, stops: { en: ["Day 1: Las Vegas", "Day 2–3: Zion National Park", "Day 4: Bryce Canyon", "Day 5–6: Moab (Arches + Canyonlands)", "Day 7: Capitol Reef + drive to Sedona", "Day 8–9: Sedona (red rocks, vortex hikes)", "Day 10: Antelope Canyon + Horseshoe Bend", "Day 11–12: Grand Canyon South Rim", "Day 13: Back to Vegas", "Day 14: Fly home"], fr: ["Jour 1 : Las Vegas", "Jour 2-3 : parc national de Zion", "Jour 4 : Bryce Canyon", "Jour 5-6 : Moab (Arches + Canyonlands)", "Jour 7 : Capitol Reef + route vers Sedona", "Jour 8-9 : Sedona (roches rouges, randos énergétiques)", "Jour 10 : Antelope Canyon + Horseshoe Bend", "Jour 11-12 : rive sud du Grand Canyon", "Jour 13 : retour Vegas", "Jour 14 : vol retour"] } },
  ],
  budget: {
    currency: "USD",
    tiers: [
      { label: { en: "Backpacker", fr: "Routard" }, perDay: 100, description: { en: "Hostel bunk or shared Airbnb ($40), supermarket + diner meals ($30), Greyhound buses + occasional Lyft ($15), one paid attraction ($15). USA is hard on backpacker budgets; bigger cities (NYC, SF) push this to $120+.", fr: "Lit en dortoir ou Airbnb partagé (40 $), supermarché + diners ($30), bus Greyhound + Lyft occasionnel (15 $), une attraction payante (15 $). Les USA sont durs petit budget ; les grandes villes (NYC, SF) poussent à 120 $+." } },
      { label: { en: "Mid-range", fr: "Moyen" }, perDay: 240, description: { en: "Mid-range hotel or quality Airbnb ($140), one sit-down dinner + casual meals + tip ($60), rental car + gas or Uber + Amtrak ($25), entries and activities ($15). The right tier; tipping adds 20% across food and bars.", fr: "Hôtel moyen ou Airbnb de qualité (140 $), un dîner attablé + repas décontractés + pourboire (60 $), voiture + essence ou Uber + Amtrak (25 $), entrées et activités (15 $). Le bon équilibre ; le pourboire ajoute 20 % sur la bouffe et les bars." } },
      { label: { en: "Comfortable", fr: "Confortable" }, perDay: 500, description: { en: "Boutique 4-star or design hotel ($320), one Michelin or chef's tasting menu ($130), Uber XL + valet ($30), guided tour or private guide ($20). Honeymoon and milestone-trip tier.", fr: "Hôtel 4 étoiles de charme ou design (320 $), un dîner Michelin ou menu dégustation chef (130 $), Uber XL + voiturier (30 $), tour guidé ou guide privé (20 $). Tier lune de miel et anniversaire." } },
    ],
    note: { en: "Per person, excluding international flights. Sales tax is added at the register (5–10% varies by state), not in displayed prices. Tipping: 18–22% at sit-down restaurants, $1–2 per drink at bars, $2 per bag, 15–20% to Lyft/Uber drivers. Budget 25% above menu prices to account for tax + tip.", fr: "Par personne, hors vol international. La taxe de vente s'ajoute à la caisse (5-10 % selon l'État), pas dans les prix affichés. Pourboire : 18-22 % au restaurant attablé, 1-2 $ par verre au bar, 2 $ par bagage, 15-20 % aux chauffeurs Lyft/Uber. Budgétez 25 % de plus que le prix affiché pour la taxe + pourboire." },
  },
  tips: [
    { do: true, text: { en: "Apply for ESTA online 3+ days before flying (esta.cbp.dhs.gov). US$21, 90-day stay, multi-entry within 2 years. Do NOT use third-party sites (they charge €50+ for the same form).", fr: "Demandez l'ESTA en ligne 3+ jours avant le vol (esta.cbp.dhs.gov). 21 US$, séjour de 90 jours, entrées multiples sur 2 ans. N'utilisez PAS les sites tiers (ils facturent 50 €+ pour le même formulaire)." } },
    { do: true, text: { en: "Tip 18–22% at sit-down restaurants. Service is included in the menu price in name only — server wages depend on tips. Round up at bars ($1–2 per drink), 15–20% for Lyft/Uber, $2 per bag for porters, $5 per night for housekeeping.", fr: "Pourboire 18-22 % au resto attablé. Le service est inclus de nom uniquement — les serveurs vivent du pourboire. Arrondi au bar (1-2 $ par verre), 15-20 % à Lyft/Uber, 2 $ par bagage pour les bagagistes, 5 $ par nuit pour les femmes de chambre." } },
    { do: false, text: { en: "Don't underestimate distances. NYC to LA is the same as Madrid to Moscow. Driving across Texas takes 12 hours. Internal flights ($80–250) and Amtrak (East Coast only) are usually faster than road trips outside scenic loops.", fr: "Ne sous-estimez pas les distances. NYC-LA, c'est Madrid-Moscou. Traverser le Texas en voiture prend 12h. Les vols intérieurs (80-250 $) et Amtrak (côte est uniquement) sont en général plus rapides que la route en dehors des boucles scéniques." } },
    { do: true, text: { en: "Get an America the Beautiful annual pass ($80) if you're visiting 3+ national parks. Covers entry fees for the entire family/car. Buy at the first park entrance or online at usparkpass.com. Pays for itself fast.", fr: "Prenez le pass annuel America the Beautiful (80 $) si vous visitez 3+ parcs nationaux. Couvre l'entrée pour toute la famille/voiture. À l'entrée du premier parc ou en ligne sur usparkpass.com. Rentabilisé vite." } },
    { do: false, text: { en: "Don't fly in/out of LaGuardia (LGA) if you can avoid it. NYC's worst airport — try JFK or Newark (EWR). Same for Boston (use Logan only), Chicago (O'Hare for international, Midway for budget), LA (use LAX, accept the traffic).", fr: "Évitez d'arriver/partir par LaGuardia (LGA) si possible. Le pire aéroport de NYC — préférez JFK ou Newark (EWR). Idem pour Boston (uniquement Logan), Chicago (O'Hare pour l'international, Midway pour les low cost), LA (LAX, acceptez le trafic)." } },
    { do: true, text: { en: "Book national-park lodges 6+ months in advance — they sell out fast. Lodges inside Yellowstone, Yosemite, Grand Canyon (Bright Angel, El Tovar) are gold dust. If they're booked, look at park-edge towns: West Yellowstone (MT), Springdale (UT for Zion), Tusayan (AZ for Grand Canyon).", fr: "Réservez les lodges dans les parcs 6+ mois à l'avance — ils sont vite complets. Les lodges intérieurs à Yellowstone, Yosemite, Grand Canyon (Bright Angel, El Tovar) sont des perles. Sinon, regardez les villes en lisière : West Yellowstone (MT), Springdale (UT pour Zion), Tusayan (AZ pour Grand Canyon)." } },
    { do: true, text: { en: "Use the National Park Service app — it has trail maps, ranger schedules, current conditions, alerts. Offline-capable. Cell service is non-existent in most parks; download maps before you go.", fr: "Utilisez l'app National Park Service — cartes de sentiers, programmes des rangers, conditions actuelles, alertes. Fonctionne hors-ligne. Le réseau mobile est inexistant dans la plupart des parcs ; téléchargez les cartes avant." } },
    { do: false, text: { en: "Don't be alone at gas stations or rest stops late at night in certain regions (rural South, parts of the Southwest, central LA). The US is safe in tourist zones; specific situations and neighborhoods are not. Trust the local advice your hotel gives.", fr: "Ne restez pas seul dans les stations-service ou aires de repos tard la nuit dans certaines régions (Sud rural, parties du Sud-Ouest, certains coins de LA). Les USA sont sûrs en zone touristique ; certaines situations et quartiers ne le sont pas. Faites confiance aux conseils de votre hôtel." } },
  ],
  related: ["mexico", "costa-rica"],
  relatedDestinations: ["nashville-bachelorette"],
};

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export const countryGuides: CountryGuide[] = [japan, italy, spain, thailand, portugal, greece, morocco, vietnam, mexico, indonesia, croatia, turkey, iceland, costaRica, usa];

export const findGuideByLocalizedSlug = (
  slug: string,
  loc: Locale
): CountryGuide | undefined =>
  countryGuides.find((g) => g.slug[loc] === slug);
