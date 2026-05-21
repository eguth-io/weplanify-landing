/**
 * Destinations content — SEO long-tail pages for /destinations/[slug]
 *
 * Each destination has bilingual (en/fr) content written natively per locale
 * (not a translation). Slugs are localized too: e.g. `budapest-bachelorette`
 * (EN) and `budapest-evjf` (FR).
 *
 * POIs reference real, well-known places. Mid-range 2026 budgets, on-the-ground
 * only (no flights). Hero images via Unsplash — IDs picked from popular,
 * stable photos for each city. If a photo ever 404s, swap via unsplash.com.
 */

export type Locale = "en" | "fr";

export type LocalizedString = { en: string; fr: string };

export type DestinationUseCase = "bachelorette" | "road-trip" | "with-friends";

export type DestinationPoi = {
  name: string;
  type: "restaurant" | "bar" | "club" | "activity" | "landmark" | "neighborhood";
  description: LocalizedString;
  mapsUrl: string;
};

export type DestinationItineraryDay = {
  day: number;
  title: LocalizedString;
  morning: LocalizedString;
  afternoon: LocalizedString;
  evening: LocalizedString;
};

export type DestinationBudgetItem = {
  category: LocalizedString;
  amount: number; // per person for the whole trip
};

export type Destination = {
  /** Localized slug. Each destination is reachable under /[locale]/destinations/[slug] */
  slug: { en: string; fr: string };
  useCase: DestinationUseCase;
  days: number;
  /** Localized human-readable city/region name (e.g. "Budapest" / "Budapest") */
  city: LocalizedString;
  /** Localized country (e.g. "Hungary" / "Hongrie") */
  country: LocalizedString;
  hero: {
    image: string;
    imageAlt: LocalizedString;
    /** Short eyebrow tag rendered above the H1 */
    tag: LocalizedString;
  };
  meta: {
    title: LocalizedString;
    description: LocalizedString;
  };
  intro: { en: string[]; fr: string[] };
  itinerary: DestinationItineraryDay[];
  pois: DestinationPoi[];
  budget: {
    perPerson: { low: number; high: number; currency: "EUR" | "USD" };
    breakdown: DestinationBudgetItem[];
    /** Short note shown below the breakdown */
    note: LocalizedString;
  };
  packing: { en: string[]; fr: string[] };
  bestSeason: LocalizedString;
  /** Slugs (en) of related destinations — resolved against this file at render */
  related: string[];
};

// ---------------------------------------------------------------------------
// 1. Budapest — Bachelorette / EVJF — 3 days
// ---------------------------------------------------------------------------
const budapest: Destination = {
  slug: { en: "budapest-bachelorette", fr: "budapest-evjf" },
  useCase: "bachelorette",
  days: 3,
  city: { en: "Budapest", fr: "Budapest" },
  country: { en: "Hungary", fr: "Hongrie" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1541849546-216549ae216d?w=1600&q=80",
    imageAlt: {
      en: "Hungarian Parliament Building lit up at night along the Danube in Budapest",
      fr: "Le Parlement hongrois illuminé la nuit le long du Danube à Budapest",
    },
    tag: {
      en: "Bachelorette · 3-day weekend",
      fr: "EVJF · Week-end de 3 jours",
    },
  },
  meta: {
    title: {
      en: "Budapest Bachelorette Weekend — 3-Day Itinerary, Budget & Tips",
      fr: "EVJF à Budapest — Itinéraire 3 jours, budget et bonnes adresses",
    },
    description: {
      en: "A real 3-day Budapest bachelorette itinerary: thermal baths, ruin bars, Danube cruise. Honest budget, real spots, and a free planner to fork the trip.",
      fr: "Un vrai itinéraire EVJF à Budapest sur 3 jours : bains thermaux, ruin bars, croisière sur le Danube. Budget honnête, bonnes adresses et planificateur gratuit.",
    },
  },
  intro: {
    en: [
      "Budapest is the bachelorette capital of Europe for a reason: cheap flights from anywhere, baths that look like a Wes Anderson film, ruin bars built inside abandoned tenements, and dinners that cost half of what they would in Paris or London. You land Friday morning, you leave Sunday night, and you go home with the group chat full of photos no one will ever forget.",
      "The vibe here is loud and a little chaotic — in the best way. Expect a Saturday afternoon in Szechenyi Baths with spa cocktails, a long Hungarian dinner with wine, and a ruin bar crawl that ends somewhere you didn't plan. The bride wears a sash, the photos are great, the budget stays sane.",
      "Three days is the sweet spot. Long enough for a full Saturday bath day and a proper night out, short enough that nobody runs out of energy or annual leave. This itinerary keeps the group on the Pest side most of the time — that's where the bars, restaurants and baths are — with one half-day on the Buda side for views and the castle.",
    ],
    fr: [
      "Budapest est devenue THE destination EVJF européenne, et pour de bonnes raisons : des vols pas chers depuis partout, des bains qui ressemblent à un film de Wes Anderson, des ruin bars dans d'anciens immeubles abandonnés, et des dîners qui coûtent la moitié de Paris. Vous atterrissez le vendredi matin, vous repartez le dimanche soir, et vous rentrez avec une galerie photo dont la mariée parlera pendant des années.",
      "L'ambiance est festive sans être bling-bling. Au programme : un samedi après-midi aux bains Széchenyi avec des cocktails au bord du bassin, un grand dîner hongrois bien arrosé, et une tournée des ruin bars qui se termine forcément quelque part qu'on n'avait pas prévu. La mariée a son écharpe, les photos sont superbes, le budget reste maîtrisé.",
      "Trois jours, c'est le format idéal. Assez pour une vraie journée bains le samedi et une vraie soirée, assez court pour que personne ne lâche niveau énergie ou jours de congés. Cet itinéraire vous garde côté Pest la plupart du temps — c'est là que tout se passe — avec une demi-journée côté Buda pour la vue et le château.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Arrival, late lunch on Gozsdu, golden-hour cruise",
        fr: "Arrivée, déjeuner tardif Gozsdu, croisière au coucher de soleil",
      },
      morning: {
        en: "Land at Liszt Ferenc Airport. Grab a 100E shuttle bus or a miniBUD shared van straight to the hotel/Airbnb in District VII (the Jewish Quarter) — that's the bachelorette base camp. Drop bags, freshen up.",
        fr: "Atterrissage à l'aéroport Liszt Ferenc. Prenez le bus 100E ou un miniBUD partagé jusqu'à l'hôtel/Airbnb dans le quartier VII (quartier juif) — c'est votre QG EVJF. Posez les bagages, douche rapide.",
      },
      afternoon: {
        en: "Late lunch on Gozsdu Udvar — the covered courtyard packed with restaurants. Spago or Mazel Tov work for a relaxed group meal. Walk it off along Király utca, peek into Dohány Street Synagogue, grab a coffee at Madal.",
        fr: "Déjeuner tardif à Gozsdu Udvar — la cour couverte pleine de restos. Spago ou Mazel Tov pour un repas de groupe sans prise de tête. Balade digestive le long de Király utca, petit coup d'œil à la Synagogue Dohány, café chez Madal.",
      },
      evening: {
        en: "Sunset Danube cruise (Legenda or Silverline, ~22 EUR with a drink). Hop off, dinner at Mazel Tov for the courtyard lights, then warm-up drinks at Szimpla Kert — Budapest's original ruin bar. Pace yourselves: Saturday is the big one.",
        fr: "Croisière sur le Danube au coucher de soleil (Legenda ou Silverline, ~22 € avec une boisson). Descente, dîner chez Mazel Tov pour les lumières de la cour, puis premier verre à Szimpla Kert — le ruin bar originel. Restez sages : c'est le samedi qui sera intense.",
      },
    },
    {
      day: 2,
      title: {
        en: "Spa day at Szechenyi, Hungarian feast, ruin bar crawl",
        fr: "Journée spa à Széchenyi, festin hongrois, tournée des ruin bars",
      },
      morning: {
        en: "Brunch at Stika or Lumen Coffee. Pre-book a Szechenyi Baths VIP cabin for the group — saves an hour of locker chaos. Bring waterproof phone pouches if you want pool photos.",
        fr: "Brunch chez Stika ou Lumen Coffee. Réservez à l'avance une cabine VIP aux bains Széchenyi pour le groupe — ça épargne une heure de chaos vestiaire. Pensez à une pochette étanche si vous voulez des photos dans les bassins.",
      },
      afternoon: {
        en: "Szechenyi Baths from 1pm. 18 pools, outdoor thermal baths in a yellow palace — peak Instagram. Stay 3-4 hours. Quick coffee at the New York Café on the way back (touristy but the ceiling is unreal).",
        fr: "Bains Széchenyi à partir de 13h. 18 bassins, thermes en plein air dans un palais jaune — pic Instagram. Comptez 3 à 4 heures. Café rapide au New York Café au retour (très touristique mais les plafonds valent le coup).",
      },
      evening: {
        en: "Group dinner at Borkonyha (one Michelin star, surprisingly affordable, book 6+ weeks ahead) OR Kispiac for a more raucous Hungarian tavern vibe. Then full ruin-bar crawl: Szimpla → Instant-Fogas → Doboz. End at Pontoon or A38 if anyone's still standing.",
        fr: "Dîner de groupe au Borkonyha (une étoile Michelin, étonnamment abordable, réservez 6 semaines avant) OU au Kispiac pour une taverne hongroise plus bruyante. Puis tournée complète des ruin bars : Szimpla → Instant-Fogas → Doboz. Fin de soirée au Pontoon ou A38 si vous tenez encore debout.",
      },
    },
    {
      day: 3,
      title: {
        en: "Buda side, Fisherman's Bastion brunch, fly home",
        fr: "Côté Buda, brunch au Bastion des Pêcheurs, retour",
      },
      morning: {
        en: "Slow brunch at Liberté or Fekete. Cross the Chain Bridge on foot for the postcard shot. Take the funicular up to Buda Castle (skip the queue with a pre-bought ticket).",
        fr: "Brunch tranquille chez Liberté ou Fekete. Traversée du Pont des Chaînes à pied pour la photo carte postale. Funiculaire jusqu'au Château de Buda (achetez le ticket en avance pour éviter la queue).",
      },
      afternoon: {
        en: "Walk along Fisherman's Bastion — best skyline view in the city. Quick stop at Matthias Church. Grab a langos at the castle district market, then back to the hotel to repack.",
        fr: "Promenade le long du Bastion des Pêcheurs — la plus belle vue sur la ville. Petit arrêt à l'église Mathias. Langos au marché du quartier du château, puis retour à l'hôtel pour refaire les valises.",
      },
      evening: {
        en: "Light early dinner — Mazel Tov again if you loved it, or a quick goulash at Belvárosi Lugas. Shuttle to the airport. The post-trip group chat is going to be active for weeks.",
        fr: "Dîner léger et tôt — Mazel Tov à nouveau si vous avez aimé, ou un goulash rapide au Belvárosi Lugas. Navette pour l'aéroport. Le groupe WhatsApp va clignoter pendant des semaines.",
      },
    },
  ],
  pois: [
    {
      name: "Szechenyi Thermal Baths",
      type: "activity",
      description: {
        en: "The iconic yellow neo-baroque bath complex. 18 pools, indoor and outdoor, open until late. Book a VIP cabin online to skip locker chaos.",
        fr: "Le complexe thermal néo-baroque jaune iconique. 18 bassins, intérieur et extérieur, ouvert tard. Réservez une cabine VIP en ligne pour éviter le chaos des vestiaires.",
      },
      mapsUrl: "https://maps.google.com/?q=Szechenyi+Thermal+Bath+Budapest",
    },
    {
      name: "Szimpla Kert",
      type: "bar",
      description: {
        en: "The original ruin bar — a maze of mismatched chairs, neon, and cheap palinka. Touristy at this point but still essential.",
        fr: "Le ruin bar originel — un labyrinthe de chaises dépareillées, de néons et de palinka pas chère. Touristique maintenant, mais incontournable.",
      },
      mapsUrl: "https://maps.google.com/?q=Szimpla+Kert+Budapest",
    },
    {
      name: "Instant-Fogas",
      type: "bar",
      description: {
        en: "Two ruin bars merged into one mega-complex. Multiple dance floors, different music in each room. Saturday peak: pure chaos.",
        fr: "Deux ruin bars fusionnés en un méga-complexe. Plusieurs pistes de danse, musique différente dans chaque salle. Le samedi soir, c'est le chaos total.",
      },
      mapsUrl: "https://maps.google.com/?q=Instant+Fogas+Budapest",
    },
    {
      name: "Mazel Tov",
      type: "restaurant",
      description: {
        en: "Mediterranean-Israeli food in a romantic courtyard wrapped in fairy lights. Books up fast on Saturdays — reserve a week ahead.",
        fr: "Cuisine méditerranéenne-israélienne dans une cour romantique sous les guirlandes lumineuses. Complet vite le samedi — réservez une semaine à l'avance.",
      },
      mapsUrl: "https://maps.google.com/?q=Mazel+Tov+Budapest",
    },
    {
      name: "Borkonyha Winekitchen",
      type: "restaurant",
      description: {
        en: "Hungarian fine dining with one Michelin star at half the price of Paris. Worth one big-night booking — but book 6+ weeks ahead.",
        fr: "Gastronomie hongroise étoilée Michelin à moitié prix par rapport à Paris. Vaut une grosse soirée — mais réservez 6 semaines à l'avance.",
      },
      mapsUrl: "https://maps.google.com/?q=Borkonyha+Winekitchen+Budapest",
    },
    {
      name: "Fisherman's Bastion",
      type: "landmark",
      description: {
        en: "Fairy-tale white turrets on the Buda side with the best view of the Parliament across the river. Free to walk, panoramic terrace charges a small fee.",
        fr: "Tourelles blanches de conte de fées côté Buda avec la meilleure vue sur le Parlement de l'autre côté du fleuve. Promenade gratuite, terrasse panoramique avec petit ticket.",
      },
      mapsUrl: "https://maps.google.com/?q=Fishermans+Bastion+Budapest",
    },
    {
      name: "Gozsdu Udvar",
      type: "neighborhood",
      description: {
        en: "Covered courtyard in District VII packed with restaurants, bars and stalls. Your default 'we can't decide where to eat' answer.",
        fr: "Cour couverte du quartier VII pleine de restos, bars et stands. Votre réponse par défaut quand personne ne sait où dîner.",
      },
      mapsUrl: "https://maps.google.com/?q=Gozsdu+Udvar+Budapest",
    },
    {
      name: "New York Café",
      type: "restaurant",
      description: {
        en: "The 'most beautiful café in the world' — gilded ceilings, marble columns. Drinks are overpriced and queues are long, but the photos are non-negotiable.",
        fr: "Le « plus beau café du monde » — plafonds dorés, colonnes de marbre. Les boissons sont chères et la queue est longue, mais les photos sont non négociables.",
      },
      mapsUrl: "https://maps.google.com/?q=New+York+Cafe+Budapest",
    },
  ],
  budget: {
    perPerson: { low: 320, high: 520, currency: "EUR" },
    breakdown: [
      {
        category: { en: "Accommodation (Airbnb, 2 nights, shared)", fr: "Hébergement (Airbnb, 2 nuits, partagé)" },
        amount: 90,
      },
      { category: { en: "Food & restaurants", fr: "Repas & restaurants" }, amount: 110 },
      { category: { en: "Bars & nightlife", fr: "Bars & vie nocturne" }, amount: 70 },
      { category: { en: "Szechenyi Baths + cabin", fr: "Bains Széchenyi + cabine" }, amount: 35 },
      { category: { en: "Danube cruise + transit", fr: "Croisière Danube + transports" }, amount: 35 },
      { category: { en: "Bride's share (split by group)", fr: "Part de la mariée (répartie)" }, amount: 25 },
    ],
    note: {
      en: "Flights not included. Range reflects mid-range vs splurge choices (dinner at Borkonyha pushes the high end).",
      fr: "Vols non inclus. La fourchette dépend des choix (un dîner au Borkonyha fait grimper la note).",
    },
  },
  packing: {
    en: [
      "Swimsuit + flip-flops (mandatory for Szechenyi)",
      "Quick-dry towel and waterproof phone pouch",
      "One 'nice' outfit for the Michelin dinner",
      "Comfortable shoes — Pest is cobblestoned",
      "Light jacket (Danube nights are breezy even in summer)",
      "Bride sash + sashes for the squad",
      "Power bank (long nights = dead batteries)",
    ],
    fr: [
      "Maillot de bain + tongs (obligatoire pour Széchenyi)",
      "Serviette microfibre et pochette téléphone étanche",
      "Une tenue 'habillée' pour le dîner étoilé",
      "Chaussures confortables — Pest est pavé",
      "Petite veste (le Danube est frais même en été)",
      "Écharpe pour la mariée + écharpes pour la team",
      "Batterie externe (longues soirées = batteries vides)",
    ],
  },
  bestSeason: {
    en: "May–September is the sweet spot. Outdoor baths and Danube cruises hit different in shorts weather. Avoid July if you hate crowds. Late September is the secret best week: warm enough, half the tourists.",
    fr: "Mai à septembre est la meilleure fenêtre. Les bains en plein air et les croisières sur le Danube prennent tout leur sens en short. Évitez juillet si vous fuyez les foules. Fin septembre est la semaine secrète : il fait encore bon, moitié moins de touristes.",
  },
  related: ["lisbon-with-friends", "marrakech-bachelorette", "nashville-bachelorette"],
};

// ---------------------------------------------------------------------------
// 2. Marrakech — Bachelorette / EVJF — 4 days
// ---------------------------------------------------------------------------
const marrakech: Destination = {
  slug: { en: "marrakech-bachelorette", fr: "marrakech-evjf" },
  useCase: "bachelorette",
  days: 4,
  city: { en: "Marrakech", fr: "Marrakech" },
  country: { en: "Morocco", fr: "Maroc" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1600&q=80",
    imageAlt: {
      en: "Pink walls and lanterns of a Marrakech riad courtyard at sunset",
      fr: "Murs roses et lanternes d'un riad de Marrakech au coucher du soleil",
    },
    tag: {
      en: "Bachelorette · 4 days",
      fr: "EVJF · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Marrakech Bachelorette — 4-Day Riad, Hammam & Desert Itinerary",
      fr: "EVJF à Marrakech — Itinéraire 4 jours, riad, hammam et désert",
    },
    description: {
      en: "Plan a 4-day Marrakech bachelorette: private riad, hammam ritual, desert day, rooftop dinners. Real budget, real spots, free planner to fork the trip.",
      fr: "Organisez un EVJF Marrakech 4 jours : riad privatisé, hammam, journée désert, rooftops. Budget honnête, vraies adresses, planificateur gratuit.",
    },
  },
  intro: {
    en: [
      "Marrakech is what happens when you want a bachelorette that feels miles away from a hen night at home. You sleep inside a riad — a courtyard house with zellige tiles and a plunge pool — you spend an afternoon in a hammam getting scrubbed within an inch of your life, and you eat dinner on a rooftop watching the call to prayer ring out over the medina. It's three flights from most of Europe and it costs less than Lisbon.",
      "The trick is private. Don't book individual rooms in a big hotel — privatise an entire riad for the group. A small 5-bedroom riad inside the medina runs about 350-500 EUR per night total in 2026, and includes breakfast on the terrace. You get a dedicated cook, a roof terrace for sunset drinks, and total privacy for the bride.",
      "Four days is exactly right for a Thursday-to-Sunday trip. One arrival day to settle into the riad, one for the medina chaos and a proper hammam ritual, one for a desert/Atlas escape, and one slow day before the flight. The pace is the opposite of Budapest — less club nights, more long lunches and one perfect dinner. Different vibe, same unforgettable trip.",
    ],
    fr: [
      "Marrakech, c'est l'EVJF qui dépayse vraiment. Vous dormez dans un riad — une maison à patio avec zellige et bassin — vous passez un après-midi au hammam à être gommée comme jamais, et vous dînez sur un rooftop pendant que l'appel à la prière résonne sur la médina. Trois heures de vol depuis la France, et c'est moins cher que Lisbonne.",
      "L'astuce : privatiser. Ne réservez pas des chambres individuelles dans un grand hôtel — privatisez un riad entier pour le groupe. Un petit riad 5 chambres dans la médina coûte environ 350-500 € la nuit en 2026, petit-déjeuner sur la terrasse inclus. Vous avez une cuisinière dédiée, une terrasse pour les apéros au coucher de soleil, et une intimité totale pour la mariée.",
      "Quatre jours, c'est le format parfait pour partir jeudi et revenir dimanche. Un jour pour atterrir et s'installer, un pour la médina et un vrai hammam, un pour s'évader dans le désert ou l'Atlas, un dernier jour tranquille avant le vol. L'ambiance est l'inverse de Budapest — moins de soirées club, plus de longs déjeuners et un dîner parfait. Autre style, EVJF tout aussi inoubliable.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Arrival, riad welcome, rooftop sunset",
        fr: "Arrivée, accueil au riad, coucher de soleil rooftop",
      },
      morning: {
        en: "Land at Menara Airport. Pre-book a riad transfer (cars can't enter the medina — last 200 metres are on foot with porters). Check in, mint tea on the terrace, brief everyone on medina etiquette.",
        fr: "Atterrissage à l'aéroport Menara. Réservez le transfert via le riad (les voitures n'entrent pas dans la médina — derniers 200 mètres à pied avec porteurs). Check-in, thé à la menthe sur la terrasse, briefing sur les codes de la médina.",
      },
      afternoon: {
        en: "Slow afternoon in the riad — pool, repacking, getting your bearings. If you have energy, a 30-minute walk to Le Jardin Majorelle and Musée Yves Saint Laurent (book the combined ticket online).",
        fr: "Après-midi tranquille au riad — piscine, déballage, on prend ses repères. Si vous avez l'énergie, 30 minutes à pied jusqu'au Jardin Majorelle et au Musée Yves Saint Laurent (achetez le billet combiné en ligne).",
      },
      evening: {
        en: "Sunset cocktails on the riad rooftop. Welcome dinner the riad's cook prepares for the whole group — couscous and tagines, mint tea poured from a height. Early night to recover from travel.",
        fr: "Apéro sur le rooftop du riad. Dîner d'accueil préparé par la cuisinière du riad pour tout le groupe — couscous et tajines, thé à la menthe versé de haut. Couchée tôt pour récupérer du voyage.",
      },
    },
    {
      day: 2,
      title: {
        en: "Medina, souks, full hammam ritual",
        fr: "Médina, souks, rituel hammam complet",
      },
      morning: {
        en: "Hire a licensed guide for a 3-hour medina walk (40-50 EUR for the whole group). Without one you'll get lost and pay tourist prices. End at the Ben Youssef Madrasa and Photography Museum (free rooftop view).",
        fr: "Engagez un guide officiel pour une visite de 3h de la médina (40-50 € pour le groupe entier). Sans guide vous vous perdez et payez les prix touristes. Terminez à la madrasa Ben Youssef et au Musée de la Photographie (rooftop gratuit).",
      },
      afternoon: {
        en: "Long lunch at Nomad — three rooftop levels, modern Moroccan, great for groups. Then the hammam. Book the full Royal Mansour or Les Bains de Marrakech ritual: steam, gommage, rhassoul clay, oil massage. 90 minutes, you'll feel reborn.",
        fr: "Déjeuner long chez Nomad — trois niveaux de rooftop, cuisine marocaine moderne, parfait pour les groupes. Puis le hammam. Réservez le rituel complet aux Bains de Marrakech (ou Royal Mansour) : vapeur, gommage, rhassoul, massage à l'huile. 90 minutes, vous renaissez.",
      },
      evening: {
        en: "Henna in the riad before dinner — book the artist through the riad. Dinner at Le Salama (Moroccan trio playing live, two rooftops, fun for groups). End with mint tea on the riad terrace.",
        fr: "Henné au riad avant le dîner — réservez l'artiste via le riad. Dîner au Salama (trio marocain live, deux rooftops, parfait en groupe). Conclusion avec un thé à la menthe sur la terrasse du riad.",
      },
    },
    {
      day: 3,
      title: {
        en: "Day trip: Agafay desert sunset",
        fr: "Excursion : coucher de soleil dans le désert d'Agafay",
      },
      morning: {
        en: "Slow morning — breakfast in pyjamas on the terrace, a couple of hours by the pool. Book the Agafay desert excursion (45 min drive) starting at lunch.",
        fr: "Matinée tranquille — petit-déj en pyjama sur la terrasse, deux heures à la piscine. Réservez l'excursion désert d'Agafay (45 min de route) avec départ vers midi.",
      },
      afternoon: {
        en: "Agafay is a stony, lunar-looking desert 45 minutes from town. Camel ride or quad bike (vote in the group), Berber lunch in a Bedouin tent, sunset over the Atlas. The whole group goes — minivan transfer included.",
        fr: "L'Agafay est un désert minéral à 45 minutes de Marrakech. Dromadaire ou quad (sondage dans le groupe), déjeuner berbère sous tente, coucher de soleil sur l'Atlas. Tout le monde y va — transfert minivan inclus.",
      },
      evening: {
        en: "Dinner in the desert under the stars (if your excursion includes it) OR back to town for a late dinner at La Mamounia's Italian restaurant for the splurge night.",
        fr: "Dîner dans le désert sous les étoiles (si inclus dans l'excursion) OU retour en ville pour un dîner tardif au restaurant italien de La Mamounia pour la soirée splurge.",
      },
    },
    {
      day: 4,
      title: {
        en: "Slow morning, Jemaa el-Fnaa, fly home",
        fr: "Matinée slow, Jemaa el-Fna, retour",
      },
      morning: {
        en: "Last breakfast on the terrace. Quick shopping run in the souks — leather goods, lanterns, argan oil. Tip: agree on a max budget per person beforehand, ask the riad staff what fair prices are.",
        fr: "Dernier petit-déj sur la terrasse. Petit run shopping dans les souks — cuir, lanternes, huile d'argan. Astuce : fixez un budget max par personne en amont, demandez au personnel du riad les prix justes.",
      },
      afternoon: {
        en: "Late lunch at Café Clock (camel burger optional, juices excellent). Pack, mint tea, head to the airport. The medina at midday on a Sunday is its quietest moment of the week — perfect for one last walk.",
        fr: "Déjeuner tardif au Café Clock (burger au chameau optionnel, jus excellents). Bagages, thé à la menthe, direction l'aéroport. La médina un dimanche midi, c'est son moment le plus calme — parfait pour une dernière balade.",
      },
      evening: {
        en: "Evening flight home — Marrakech is well-connected to Europe, most flights are under 4 hours. The bride will already be planning her return trip.",
        fr: "Vol retour en soirée — Marrakech est bien connectée à l'Europe, la plupart des vols font moins de 4h. La mariée planifie déjà son prochain voyage.",
      },
    },
  ],
  pois: [
    {
      name: "Le Jardin Majorelle & Musée YSL",
      type: "landmark",
      description: {
        en: "Yves Saint Laurent's electric-blue garden and his namesake museum next door. Book a combined ticket online — the on-site queue is brutal.",
        fr: "Le jardin bleu cobalt d'Yves Saint Laurent et le musée à son nom juste à côté. Achetez le billet combiné en ligne — la queue sur place est terrible.",
      },
      mapsUrl: "https://maps.google.com/?q=Jardin+Majorelle+Marrakech",
    },
    {
      name: "Les Bains de Marrakech",
      type: "activity",
      description: {
        en: "Group-friendly hammam — book the 'Royal Ritual' for the bride, the 'Bain Vapeur + Gommage' for the rest of the squad. Hidden in a riad in the kasbah.",
        fr: "Hammam parfait en groupe — réservez le Rituel Royal pour la mariée, le Bain Vapeur + Gommage pour le reste de la team. Caché dans un riad de la kasbah.",
      },
      mapsUrl: "https://maps.google.com/?q=Les+Bains+de+Marrakech",
    },
    {
      name: "Nomad",
      type: "restaurant",
      description: {
        en: "Three-level rooftop in the heart of the medina, modern Moroccan menu. Book the top terrace for sunset. Lunch is more relaxed than dinner.",
        fr: "Rooftop sur trois niveaux au cœur de la médina, carte marocaine moderne. Réservez la terrasse du haut pour le coucher de soleil. Le déjeuner est plus tranquille que le dîner.",
      },
      mapsUrl: "https://maps.google.com/?q=Nomad+Restaurant+Marrakech",
    },
    {
      name: "Le Salama",
      type: "restaurant",
      description: {
        en: "Two rooftops, live Moroccan band, big group portions of tagines and pastilla. The 'group dinner' default — book the upper terrace.",
        fr: "Deux rooftops, groupe marocain en live, grandes portions de tajines et pastilla. Le dîner de groupe par défaut — réservez la terrasse du haut.",
      },
      mapsUrl: "https://maps.google.com/?q=Le+Salama+Marrakech",
    },
    {
      name: "Jemaa el-Fnaa",
      type: "landmark",
      description: {
        en: "The main medina square. Best seen from a rooftop café at dusk when storytellers, snake charmers and food stalls come to life. Don't eat at the stalls if you have a flight the next day.",
        fr: "La place principale de la médina. À voir depuis un rooftop café au crépuscule, quand conteurs, charmeurs de serpents et stands de nourriture s'animent. Évitez les stands si vous avez un vol le lendemain.",
      },
      mapsUrl: "https://maps.google.com/?q=Jemaa+el-Fnaa+Marrakech",
    },
    {
      name: "Agafay Desert",
      type: "activity",
      description: {
        en: "Rocky lunar desert 45 min from Marrakech — not Sahara dunes, but you get the silence, the sunsets, and a real-feel-Morocco day without an overnight trip.",
        fr: "Désert rocailleux lunaire à 45 min de Marrakech — ce ne sont pas les dunes du Sahara, mais vous avez le silence, les couchers de soleil et une journée Maroc authentique sans nuit en bivouac.",
      },
      mapsUrl: "https://maps.google.com/?q=Agafay+Desert+Marrakech",
    },
    {
      name: "Ben Youssef Madrasa",
      type: "landmark",
      description: {
        en: "16th-century Quranic school, recently restored. The most photogenic courtyard in the medina. Quick visit, big visual payoff.",
        fr: "École coranique du XVIe siècle, récemment restaurée. La cour la plus photogénique de la médina. Visite rapide, gros impact visuel.",
      },
      mapsUrl: "https://maps.google.com/?q=Ben+Youssef+Madrasa",
    },
    {
      name: "La Mamounia",
      type: "restaurant",
      description: {
        en: "Iconic palace hotel. You probably can't afford to sleep here but you can absolutely afford an aperitivo at the bar or dinner at L'Italien — and the gardens are worth the visit alone.",
        fr: "Palace iconique. Vous ne pouvez probablement pas dormir là, mais largement vous payer un apéritif au bar ou un dîner à L'Italien — et les jardins valent la visite à eux seuls.",
      },
      mapsUrl: "https://maps.google.com/?q=La+Mamounia+Marrakech",
    },
  ],
  budget: {
    perPerson: { low: 380, high: 620, currency: "EUR" },
    breakdown: [
      {
        category: { en: "Private riad (3 nights, shared 5-6 ppl)", fr: "Riad privatisé (3 nuits, partagé 5-6 pers.)" },
        amount: 180,
      },
      { category: { en: "Food, restaurants & riad meals", fr: "Repas, restos et dîners au riad" }, amount: 120 },
      { category: { en: "Hammam ritual", fr: "Rituel hammam" }, amount: 55 },
      { category: { en: "Agafay desert excursion", fr: "Excursion désert d'Agafay" }, amount: 60 },
      { category: { en: "Souks & shopping budget", fr: "Budget souks & shopping" }, amount: 50 },
      { category: { en: "Transfers, guide, tips", fr: "Transferts, guide, pourboires" }, amount: 35 },
    ],
    note: {
      en: "Flights not included. Cash (dirhams) needed for the souks and tips — bring 100-150 EUR worth per person. Bargain politely, never angrily.",
      fr: "Vols non inclus. Du cash (dirhams) est nécessaire pour les souks et pourboires — prévoyez 100-150 € par personne. Négociez avec le sourire, jamais avec agacement.",
    },
  },
  packing: {
    en: [
      "Modest layers for the medina (shoulders/knees covered helps)",
      "One rooftop-dinner outfit",
      "Swimsuit for the riad pool",
      "Comfortable walking shoes (medina = uneven stone)",
      "Sunglasses, hat, high SPF",
      "Light scarf (sun + entering mosques/holy sites)",
      "Cash belt or zipped bag for the souks",
    ],
    fr: [
      "Couches modestes pour la médina (épaules/genoux couverts c'est mieux)",
      "Une tenue pour le dîner rooftop",
      "Maillot pour la piscine du riad",
      "Chaussures de marche confortables (médina = pavés inégaux)",
      "Lunettes, chapeau, crème solaire haute protection",
      "Foulard léger (soleil + entrée de certains lieux)",
      "Ceinture porte-monnaie ou sac zippé pour les souks",
    ],
  },
  bestSeason: {
    en: "March-May and October-November are the dream windows. December-February is cool (15°C, sweater weather, riad pools chilly). Avoid July-August — daytime hits 42°C and Agafay becomes a furnace.",
    fr: "Mars-mai et octobre-novembre sont les meilleures fenêtres. Décembre-février c'est frais (15°C, pull obligatoire, piscine du riad gelée). Évitez juillet-août — 42°C en journée et l'Agafay devient une fournaise.",
  },
  related: ["budapest-bachelorette", "lisbon-with-friends", "tuscany-road-trip"],
};

// ---------------------------------------------------------------------------
// 3. Nashville — Bachelorette / EVJF — 4 days
// ---------------------------------------------------------------------------
const nashville: Destination = {
  slug: { en: "nashville-bachelorette", fr: "nashville-evjf" },
  useCase: "bachelorette",
  days: 4,
  city: { en: "Nashville", fr: "Nashville" },
  country: { en: "United States", fr: "États-Unis" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1545419913-775e3e82c7db?w=1600&q=80",
    imageAlt: {
      en: "Neon signs of honky-tonk bars on Broadway in downtown Nashville at night",
      fr: "Enseignes au néon des honky-tonks sur Broadway dans le centre de Nashville la nuit",
    },
    tag: {
      en: "Bachelorette · 4 days · USA",
      fr: "EVJF · 4 jours · USA",
    },
  },
  meta: {
    title: {
      en: "Nashville Bachelorette — 4-Day Honky-Tonk Itinerary & Real Budget",
      fr: "EVJF à Nashville — Itinéraire 4 jours, honky-tonks et budget réel",
    },
    description: {
      en: "The bachelorette capital of the US: 4-day Nashville itinerary with Broadway honky-tonks, brunch crawls, party bikes, real budget and group-trip planner.",
      fr: "La capitale américaine de l'EVJF : itinéraire Nashville 4 jours avec honky-tonks de Broadway, brunchs, party bikes, budget réel et planificateur de groupe.",
    },
  },
  intro: {
    en: [
      "Nashville is the official US bachelorette capital — and it knows it. Every weekend, dozens of bridal groups in matching outfits roll down Broadway on pedal taverns, blasting Shania Twain. It's wonderfully ridiculous, the locals are friendly about it, and the city is built for the format: walkable downtown, live music in every bar at every hour, brunch spots designed for 12-person tables.",
      "What sets it apart from a European bachelorette is the scale. Groups are usually bigger here — 8 to 14 people is normal — and the activities go bigger too. A pedal tavern down Broadway, a honky-tonk crawl in cowgirl boots, a private chef in the Airbnb, line dancing class. The matching outfits are not optional. They're part of the contract.",
      "Four days, Thursday to Sunday, is the standard. Land Thursday afternoon, settle into a big Airbnb in The Gulch or Germantown, and don't leave until Sunday's flight. The itinerary below covers the must-do (Broadway, brunch, party bike), the photogenic (murals, Bicentennial Capitol Mall), and the surprisingly memorable (live recording session at a Music Row studio).",
    ],
    fr: [
      "Nashville est officiellement la capitale américaine de l'EVJF — et la ville l'assume complètement. Chaque week-end, des dizaines de groupes de futures mariées en tenues assorties descendent Broadway sur des pedal taverns en hurlant du Shania Twain. C'est merveilleusement ridicule, les locaux jouent le jeu, et la ville est faite pour le format : centre piéton, musique live partout, brunchs pensés pour des tables de 12.",
      "Ce qui change d'un EVJF européen, c'est l'échelle. Les groupes sont souvent plus gros ici — 8 à 14 personnes c'est normal — et les activités vont plus loin. Pedal tavern sur Broadway, tournée des honky-tonks en bottes de cowgirl, chef privé dans l'Airbnb, cours de line dancing. Les tenues assorties ne sont pas optionnelles. Elles font partie du contrat.",
      "Quatre jours, du jeudi au dimanche, c'est le format standard. Arrivée jeudi après-midi, installation dans un gros Airbnb à The Gulch ou Germantown, et on ne ressort qu'au vol du dimanche. L'itinéraire ci-dessous couvre les incontournables (Broadway, brunch, party bike), le photogénique (murs peints, Bicentennial Capitol Mall) et l'inattendu (session d'enregistrement dans un studio de Music Row).",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Arrival, Airbnb settle-in, low-key Broadway taster",
        fr: "Arrivée, installation Airbnb, première vraie soirée Broadway light",
      },
      morning: {
        en: "Land at BNA. Uber XL or party shuttle to the Airbnb. Aim for The Gulch (walkable to Broadway), Germantown (more chilled, great brunch) or a big house in 12 South (residential, charming).",
        fr: "Atterrissage à BNA. Uber XL ou navette party jusqu'à l'Airbnb. Visez The Gulch (à pied de Broadway), Germantown (plus calme, top pour le brunch) ou une grande maison à 12 South (résidentiel, charmant).",
      },
      afternoon: {
        en: "Group photo session in front of the 'I Believe in Nashville' mural in 12 South. Frothy Monkey for late lunch and coffee. Quick stroll to Reese Witherspoon's Draper James store for a few souvenir runs.",
        fr: "Photo de groupe devant le mur peint « I Believe in Nashville » à 12 South. Déjeuner tardif et café au Frothy Monkey. Petit tour à la boutique Draper James de Reese Witherspoon pour quelques souvenirs.",
      },
      evening: {
        en: "Easy night to acclimate: dinner at Husk (Southern fine dining, book 3-4 weeks ahead) or The Continental in the Grand Hyatt. Two-bar warm-up on Broadway — Tootsie's and Robert's Western World are the classics. Home by 1am, save the legs.",
        fr: "Soirée tranquille pour s'acclimater : dîner chez Husk (gastronomie sudiste, réservez 3-4 semaines avant) ou The Continental au Grand Hyatt. Deux bars en chauffe sur Broadway — Tootsie's et Robert's Western World sont les classiques. Rentrée à 1h, on garde les jambes pour samedi.",
      },
    },
    {
      day: 2,
      title: {
        en: "Brunch crawl, pedal tavern, big honky-tonk night",
        fr: "Brunch crawl, pedal tavern, grosse soirée honky-tonks",
      },
      morning: {
        en: "Bottomless mimosa brunch at Biscuit Love (queue early — they don't take reservations) or Pinewood Social (which does). This is the photo brunch — wear the matching sashes.",
        fr: "Brunch mimosas à volonté chez Biscuit Love (faites la queue tôt — pas de réservation) ou Pinewood Social (qui prend les réservations). C'est le brunch photos — sortez les écharpes assorties.",
      },
      afternoon: {
        en: "Pedal tavern (Nashville Pedal Tavern, Sprocket Rocket, or similar). 90 minutes, BYOB, two-bar route. The single most bachelorette thing you can do in Nashville. Pre-book, peak slot is 2pm Saturday.",
        fr: "Pedal tavern (Nashville Pedal Tavern, Sprocket Rocket, etc.). 90 minutes, on apporte ses boissons, deux bars sur la route. L'activité EVJF Nashville par excellence. Réservez avant, créneau idéal samedi 14h.",
      },
      evening: {
        en: "Group dinner at The Mockingbird (cocktails are the headline) or Adele's (Jonathan Waxman's place). Then the real night out: Broadway honky-tonks. Kid Rock's, AJ's Good Time Bar, Honky Tonk Central — three floors, three live bands at each. Pace yourselves.",
        fr: "Dîner de groupe au Mockingbird (les cocktails sont une dinguerie) ou Adele's (la table de Jonathan Waxman). Puis vraie soirée : honky-tonks de Broadway. Kid Rock's, AJ's Good Time Bar, Honky Tonk Central — trois étages, trois groupes live dans chaque. Pace yourself.",
      },
    },
    {
      day: 3,
      title: {
        en: "Recovery brunch, Belle Meade, group studio session",
        fr: "Brunch récup, Belle Meade, session studio",
      },
      morning: {
        en: "Slow brunch at Loveless Cafe (15 min drive — biscuits and country ham, worth it) or Henrietta Red in Germantown (oysters and Bloody Marys). Designate one driver if you go to Loveless.",
        fr: "Brunch tranquille chez Loveless Cafe (15 min de route — biscuits et jambon de pays, ça vaut le détour) ou Henrietta Red à Germantown (huîtres et Bloody Marys). Désignez un conducteur si vous allez chez Loveless.",
      },
      afternoon: {
        en: "Option A: Belle Meade Plantation wine tour and grounds (touristy but elegant). Option B: Bachelorette-style recording session — book a Music Row studio for an hour, record a song together. The MP3 is the bride's gift. Cheesy but iconic.",
        fr: "Option A : visite et dégustation à Belle Meade Plantation (touristique mais élégant). Option B : session studio EVJF — réservez un studio de Music Row pour une heure, enregistrez une chanson ensemble. Le MP3 devient le cadeau de la mariée. Kitsch mais iconique.",
      },
      evening: {
        en: "Private chef dinner at the Airbnb (book through Take A Chef or hireachef.com — much cheaper than 14 covers at a restaurant). Pajama night, gifts for the bride, the slideshow someone made on Canva. The night everyone secretly likes best.",
        fr: "Dîner chef privé à l'Airbnb (réservez via Take A Chef ou hireachef.com — beaucoup moins cher que 14 couverts au resto). Soirée pyjama, cadeaux pour la mariée, diaporama Canva. La soirée que tout le monde préfère secrètement.",
      },
    },
    {
      day: 4,
      title: {
        en: "Brunch, Country Music Hall of Fame, fly home",
        fr: "Brunch, Country Music Hall of Fame, retour",
      },
      morning: {
        en: "Final brunch at Milk & Honey or Café Roze. Slow morning — everyone needs it. Pack, group photo on the Airbnb porch.",
        fr: "Dernier brunch chez Milk & Honey ou Café Roze. Matinée lente — tout le monde en a besoin. Bagages, photo de groupe sur la véranda de l'Airbnb.",
      },
      afternoon: {
        en: "Country Music Hall of Fame for an hour (skip-the-line ticket pre-booked) — even non-country-fans get something out of it. Then a quick walk through the Bicentennial Capitol Mall for the photo wall and a Goo Goo Cluster from the original shop.",
        fr: "Country Music Hall of Fame pendant une heure (billet coupe-file en avance) — même les non-fans de country en tirent quelque chose. Puis petite balade dans le Bicentennial Capitol Mall pour le mur photo et un Goo Goo Cluster dans la boutique d'origine.",
      },
      evening: {
        en: "Sunday flights typically leave 5-9pm. Get to BNA two hours early — Sunday afternoon is its peak. Bride's flight tracker is everyone's group-chat homework for the next hour.",
        fr: "Les vols du dimanche partent typiquement entre 17h et 21h. Soyez à BNA deux heures avant — dimanche après-midi c'est le pic. Tout le monde refait sa valise et suit le vol de la mariée dans le groupe.",
      },
    },
  ],
  pois: [
    {
      name: "Broadway Honky-Tonk Strip",
      type: "neighborhood",
      description: {
        en: "Five blocks of multi-story bars with free live music in every room from 11am to 3am. Tootsie's, Kid Rock's, AJ's, Honky Tonk Central — pick three, rotate.",
        fr: "Cinq pâtés de maisons de bars à plusieurs étages avec musique live gratuite dans chaque salle, de 11h à 3h. Tootsie's, Kid Rock's, AJ's, Honky Tonk Central — choisissez-en trois.",
      },
      mapsUrl: "https://maps.google.com/?q=Broadway+Nashville",
    },
    {
      name: "Pedal Tavern (Nashville)",
      type: "activity",
      description: {
        en: "16-person pedal-powered bar bike. Two-stop bar route, BYOB on the bike, you do the pedaling. The most-photographed activity in town for bachelorettes.",
        fr: "Vélo-bar à propulsion humaine pour 16 personnes. Tournée de deux bars, on apporte ses boissons, on pédale. L'activité EVJF la plus photographiée de la ville.",
      },
      mapsUrl: "https://maps.google.com/?q=Nashville+Pedal+Tavern",
    },
    {
      name: "Biscuit Love (The Gulch)",
      type: "restaurant",
      description: {
        en: "Southern brunch institution. No reservations, queues from 9am. The 'Bonuts' (sweet biscuit donuts) are the must-order. Worth the wait once.",
        fr: "Institution du brunch sudiste. Pas de réservations, queues à partir de 9h. Les Bonuts (donuts à base de biscuit) sont l'incontournable. Une fois dans la vie, ça vaut le coup.",
      },
      mapsUrl: "https://maps.google.com/?q=Biscuit+Love+The+Gulch+Nashville",
    },
    {
      name: "The Mockingbird",
      type: "restaurant",
      description: {
        en: "Eclectic global food, jaw-dropping cocktails, downtown location. The dinner that people Instagram. Reserve 3+ weeks ahead for a Saturday group of 8+.",
        fr: "Cuisine internationale éclectique, cocktails démentiels, en plein centre. Le dîner qu'on poste sur Instagram. Réservez 3 semaines avant pour un groupe de 8+ le samedi.",
      },
      mapsUrl: "https://maps.google.com/?q=The+Mockingbird+Nashville",
    },
    {
      name: "Husk Nashville",
      type: "restaurant",
      description: {
        en: "Sean Brock's Southern restaurant in a restored Victorian house. Higher-end, but a quieter group dinner option. Book the upstairs room for privacy.",
        fr: "Le restaurant sudiste de Sean Brock dans une maison victorienne restaurée. Plus haut de gamme, mais une option de dîner plus calme. Réservez la salle de l'étage pour l'intimité.",
      },
      mapsUrl: "https://maps.google.com/?q=Husk+Nashville",
    },
    {
      name: "Country Music Hall of Fame",
      type: "landmark",
      description: {
        en: "The definitive country music museum. Even bachelorettes who came for the bars enjoy 60-90 minutes here. Pre-book online to skip the queue.",
        fr: "Le musée de référence sur la country. Même les EVJF venues pour les bars passent 60-90 minutes agréables ici. Réservez en ligne pour éviter la queue.",
      },
      mapsUrl: "https://maps.google.com/?q=Country+Music+Hall+of+Fame+Nashville",
    },
    {
      name: "12 South Murals",
      type: "landmark",
      description: {
        en: "The 'I Believe in Nashville' mural and the giant 'Make Music Not War' wings — every bachelorette group's photo backdrop. Best light is morning.",
        fr: "Le mur « I Believe in Nashville » et les ailes géantes « Make Music Not War » — le fond photo de toutes les EVJF. Meilleure lumière le matin.",
      },
      mapsUrl: "https://maps.google.com/?q=I+Believe+in+Nashville+mural+12South",
    },
    {
      name: "Loveless Cafe",
      type: "restaurant",
      description: {
        en: "15-min drive out of town, but the most legitimate biscuits-and-ham brunch in Tennessee. Wait can be 60+ min on weekends — call ahead to join the list.",
        fr: "15 min hors de la ville, mais le brunch biscuits-jambon le plus légitime du Tennessee. Attente possible de 60 min+ le week-end — appelez en avance pour vous inscrire.",
      },
      mapsUrl: "https://maps.google.com/?q=Loveless+Cafe+Nashville",
    },
  ],
  budget: {
    perPerson: { low: 550, high: 850, currency: "USD" },
    breakdown: [
      {
        category: { en: "Airbnb (3 nights, shared 8-10 ppl)", fr: "Airbnb (3 nuits, partagé 8-10 pers.)" },
        amount: 180,
      },
      { category: { en: "Food & restaurants", fr: "Repas & restaurants" }, amount: 220 },
      { category: { en: "Bars, drinks, honky-tonks", fr: "Bars, boissons, honky-tonks" }, amount: 150 },
      { category: { en: "Pedal tavern + activities", fr: "Pedal tavern + activités" }, amount: 80 },
      { category: { en: "Private chef night (split)", fr: "Soirée chef privé (répartie)" }, amount: 65 },
      { category: { en: "Ubers + airport transfers", fr: "Ubers + transferts aéroport" }, amount: 55 },
    ],
    note: {
      en: "Flights not included. USD prices. Nashville is more expensive than people expect on weekends — Airbnb prices for big houses surge hard. Lock dates 3-4 months out.",
      fr: "Vols non inclus. Prix en USD. Nashville coûte plus cher qu'on imagine le week-end — les prix Airbnb pour grandes maisons explosent. Bloquez les dates 3-4 mois à l'avance.",
    },
  },
  packing: {
    en: [
      "Cowgirl boots (yes, really — buy them on day 1 if not)",
      "Matching shirts/sashes for the squad",
      "One 'going out' outfit + one brunch outfit",
      "Comfortable shoes for the pedal tavern",
      "Denim jacket (Nashville evenings can dip)",
      "Sunglasses + portable phone charger",
      "Pre-printed itinerary card (people lose service in venues)",
    ],
    fr: [
      "Bottes de cowgirl (oui, vraiment — achetez-les sur place jour 1 si besoin)",
      "T-shirts/écharpes assortis pour la team",
      "Une tenue de sortie + une tenue de brunch",
      "Chaussures confortables pour le pedal tavern",
      "Veste en jean (les soirées peuvent être fraîches)",
      "Lunettes + batterie externe",
      "Carte itinéraire imprimée (le réseau coupe dans les bars)",
    ],
  },
  bestSeason: {
    en: "April-June and September-October are perfect: warm days, cool nights, lower hotel prices. July-August is sweltering (32°C, humid). December-February can be chilly but Christmas-lit Broadway is its own vibe.",
    fr: "Avril-juin et septembre-octobre sont parfaits : journées chaudes, soirées fraîches, prix d'hôtels plus bas. Juillet-août c'est étouffant (32°C, humide). Décembre-février peut être froid mais Broadway illuminée pour Noël a son charme.",
  },
  related: ["las-vegas-bachelorette", "budapest-bachelorette", "marrakech-bachelorette"],
};

// ---------------------------------------------------------------------------
// 4. Tuscany — Road trip with friends — 7 days
// ---------------------------------------------------------------------------
const tuscany: Destination = {
  slug: { en: "tuscany-road-trip", fr: "toscane-road-trip" },
  useCase: "road-trip",
  days: 7,
  city: { en: "Tuscany", fr: "Toscane" },
  country: { en: "Italy", fr: "Italie" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1774348120811-0b32140e8a92?w=1600&q=80",
    imageAlt: {
      en: "A winding cypress-lined road through the rolling hills of Val d'Orcia, Tuscany",
      fr: "Une route sinueuse bordée de cyprès dans les collines du Val d'Orcia, Toscane",
    },
    tag: {
      en: "Road trip · 7 days · 4-6 friends",
      fr: "Road trip · 7 jours · 4-6 amis",
    },
  },
  meta: {
    title: {
      en: "Tuscany Road Trip with Friends — 7-Day Itinerary, Stops & Budget",
      fr: "Road Trip en Toscane entre Amis — Itinéraire 7 jours, étapes et budget",
    },
    description: {
      en: "A 7-day Tuscany road trip itinerary for 4-6 friends: Florence, Siena, Val d'Orcia, Cinque Terre option. Real driving times, wineries, agriturismi, budget.",
      fr: "Un road trip 7 jours en Toscane pour 4 à 6 amis : Florence, Sienne, Val d'Orcia, option Cinque Terre. Temps de trajet réels, domaines, agriturismi, budget.",
    },
  },
  intro: {
    en: [
      "A Tuscany road trip is the European trip people remember 20 years later. You land in Florence on a Saturday, you spend two days walking the city, and then you pick up a rental car and disappear into the hills. By Wednesday you're at a winery in Montalcino sharing a bottle of Brunello someone bought 'just to try.' By Saturday you're back in Florence with a phone full of photos and a group chat that won't stop quoting jokes from the road.",
      "Seven days hits the sweet spot. Enough for Florence's main museums, two nights in Siena or the Val d'Orcia, a day around Pisa and Lucca, and one wildcard — either a Cinque Terre detour for the dramatic coast or a Chianti winery day. Less than that and you skim. More than that and the group dynamic starts to crack on the third 'where do we eat tonight?'",
      "The format works best with 4 to 6 people in one rental car (or 7-8 in a minivan). Smaller than that and the budget per head climbs; larger and you need two cars and the dynamic splinters. Most days you'll drive 60-90 minutes between stops — manageable, scenic, you'll want to stop every 30 minutes for a photo of cypress trees or a sunflower field. Build that in.",
    ],
    fr: [
      "Un road trip en Toscane, c'est LE voyage européen dont on parle encore 20 ans plus tard. Vous atterrissez à Florence un samedi, vous passez deux jours à arpenter la ville, puis vous prenez une voiture de location et vous disparaissez dans les collines. Mercredi vous êtes dans un domaine à Montalcino à partager une bouteille de Brunello que quelqu'un a achetée « juste pour goûter ». Samedi vous êtes de retour à Florence avec un téléphone plein de photos et un groupe WhatsApp qui ne s'arrête plus de citer des private jokes de la route.",
      "Sept jours, c'est le bon format. Assez pour les musées de Florence, deux nuits à Sienne ou dans le Val d'Orcia, une journée Pise-Lucques, et une carte joker — soit un détour Cinque Terre pour la côte spectaculaire, soit une journée vignobles en Chianti. Moins, vous survolez. Plus, et la dynamique de groupe commence à craquer au troisième « on mange où ce soir ? ».",
      "Le format marche à 4-6 personnes dans une voiture de location (ou 7-8 dans un minivan). Moins et le coût par personne grimpe ; plus et il faut deux voitures, la dynamique se fragmente. Comptez 60-90 minutes de route entre étapes — gérable, panoramique, vous voudrez vous arrêter toutes les 30 minutes pour photographier des cyprès ou un champ de tournesols. Prévoyez ce temps.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: { en: "Arrival in Florence", fr: "Arrivée à Florence" },
      morning: {
        en: "Land at Florence Peretola or Pisa. Drop bags at the Airbnb in Oltrarno (cheaper, quieter side of the river) or Santa Croce (more central). DO NOT rent the car yet — you don't need it until Day 3.",
        fr: "Atterrissage à Florence Peretola ou à Pise. Dépôt des bagages à l'Airbnb à Oltrarno (moins cher, plus calme, côté sud du fleuve) ou Santa Croce (plus central). NE PAS prendre la voiture maintenant — vous n'en avez pas besoin avant le jour 3.",
      },
      afternoon: {
        en: "Walk along the Arno, cross the Ponte Vecchio at golden hour, climb up to Piazzale Michelangelo for the postcard view. Stop at Gelateria della Passera on the way.",
        fr: "Balade le long de l'Arno, traversée du Ponte Vecchio à l'heure dorée, montée au Piazzale Michelangelo pour la vue carte postale. Arrêt à la Gelateria della Passera sur le chemin.",
      },
      evening: {
        en: "Aperitivo at Le Volpi e l'Uva (tiny wine bar in Oltrarno, friendly to non-Italians). Dinner at Trattoria Cammillo or Il Santo Bevitore. Limoncello, then home — tomorrow is big.",
        fr: "Aperitivo chez Le Volpi e l'Uva (minuscule bar à vin à Oltrarno, accueillant pour les non-italiens). Dîner à la Trattoria Cammillo ou Il Santo Bevitore. Limoncello, puis dodo — demain c'est grosse journée.",
      },
    },
    {
      day: 2,
      title: { en: "Florence — Duomo, Uffizi, Boboli", fr: "Florence — Duomo, Offices, Boboli" },
      morning: {
        en: "Pre-booked Uffizi entry at 8:30am (essential — walk-up is 2-3 hours of queue). 2-3 hours is enough. Coffee and pastry at Caffè Gilli.",
        fr: "Office des Offices réservé pour 8h30 (impératif — sans réservation c'est 2-3h de queue). 2-3h sur place suffisent. Café et pâtisserie au Caffè Gilli.",
      },
      afternoon: {
        en: "Climb the Duomo dome (book the combo ticket with the baptistery). Late lunch at All'Antico Vinaio (panini institution — split four panini between six and you've eaten well).",
        fr: "Montée à la coupole du Duomo (achetez le billet combiné avec le baptistère). Déjeuner tardif chez All'Antico Vinaio (panini institution — quatre panini partagés entre six = bien rassasiés).",
      },
      evening: {
        en: "Bistecca alla Fiorentina at Trattoria Mario (lunch only, go on day 3) — OR — Trattoria Sostanza for a smaller-group steak. Walk it off along the Arno, gelato, in bed by midnight.",
        fr: "Bistecca alla Fiorentina à la Trattoria Mario (uniquement le midi, à faire jour 3) — OU — Trattoria Sostanza pour une steak en plus petit comité. Digestion le long de l'Arno, gelato, dodo avant minuit.",
      },
    },
    {
      day: 3,
      title: {
        en: "Pick up car, drive to Siena via Chianti",
        fr: "On prend la voiture, route vers Sienne via le Chianti",
      },
      morning: {
        en: "Quick Florence morning — Mercato Centrale for breakfast and food shopping. Pick up the rental car at 10am from a downtown location (NOT the airport — saves a transfer).",
        fr: "Petite matinée Florence — Mercato Centrale pour le petit-déj et un peu de marché. Voiture de location à 10h dans un point en centre-ville (PAS à l'aéroport — gain de temps).",
      },
      afternoon: {
        en: "Drive south through Chianti. Stop at Castello di Verrazzano for a winery lunch + tasting (book in advance). Optional second stop at Greve in Chianti for the main square.",
        fr: "Route vers le sud à travers le Chianti. Arrêt au Castello di Verrazzano pour un déjeuner-dégustation (sur réservation). Arrêt optionnel à Greve in Chianti pour la place principale.",
      },
      evening: {
        en: "Arrive Siena late afternoon. Check into the agriturismo or Airbnb. Walk into the Piazza del Campo at sunset — one of the great Italian piazzas. Dinner at La Taverna di San Giuseppe or Osteria Le Logge.",
        fr: "Arrivée Sienne en fin d'après-midi. Check-in à l'agriturismo ou Airbnb. Marche jusqu'au Piazza del Campo au coucher de soleil — une des plus belles places d'Italie. Dîner à La Taverna di San Giuseppe ou Osteria Le Logge.",
      },
    },
    {
      day: 4,
      title: { en: "Siena + San Gimignano half-day", fr: "Sienne + demi-journée à San Gimignano" },
      morning: {
        en: "Slow Siena morning. Climb the Torre del Mangia (free if you're under 70kg lol — kidding, 10 EUR, worth it). Visit the cathedral.",
        fr: "Matinée tranquille à Sienne. Montée à la Torre del Mangia (10 € pour la vue). Visite du Duomo.",
      },
      afternoon: {
        en: "45-min drive to San Gimignano. The 'medieval Manhattan' — 14 surviving towers. Touristy but unmissable. Climb the Torre Grossa, gelato at Dondoli (multiple world-champion gelatiers).",
        fr: "45 min de route jusqu'à San Gimignano. Le « Manhattan médiéval » — 14 tours subsistantes. Très touristique mais incontournable. Montée à la Torre Grossa, gelato chez Dondoli (plusieurs fois champion du monde).",
      },
      evening: {
        en: "Drive back to Siena. Aperitivo on Piazza del Campo (overpriced but the view is the view). Cheaper dinner at Trattoria Papei or pizza at Pizzeria Le Logge.",
        fr: "Retour à Sienne. Aperitivo sur le Piazza del Campo (cher mais la vue c'est la vue). Dîner moins cher à la Trattoria Papei ou pizza à la Pizzeria Le Logge.",
      },
    },
    {
      day: 5,
      title: { en: "Val d'Orcia — Pienza, Montepulciano", fr: "Val d'Orcia — Pienza, Montepulciano" },
      morning: {
        en: "Drive 1h south into the Val d'Orcia — UNESCO landscape, cypress-lined roads, the photo you've seen 100 times. Stop at the famous 'Gladiator road' near San Quirico for the group photo.",
        fr: "Route vers le sud, 1h jusqu'au Val d'Orcia — paysage UNESCO, routes bordées de cyprès, la photo qu'on a vue 100 fois. Arrêt à la « route Gladiator » près de San Quirico pour la photo de groupe.",
      },
      afternoon: {
        en: "Pienza for lunch — try the pecorino at any cheese shop, the town smells like it. Then Montepulciano in the afternoon for Vino Nobile tastings at Avignonesi or De' Ricci.",
        fr: "Pienza pour le déjeuner — goûtez le pecorino dans n'importe quelle fromagerie, la ville sent ça. Puis Montepulciano l'après-midi pour des dégustations de Vino Nobile chez Avignonesi ou De' Ricci.",
      },
      evening: {
        en: "Optional: drive to Bagno Vignoni for a soak in the open-air thermal baths at sunset. Dinner back at your agriturismo (most have an in-house restaurant — book the night before).",
        fr: "En option : route jusqu'à Bagno Vignoni pour un bain dans les thermes en plein air au coucher de soleil. Dîner de retour à l'agriturismo (la plupart ont un restaurant interne — réservez la veille).",
      },
    },
    {
      day: 6,
      title: { en: "Montalcino winery day, drive back north", fr: "Journée vignobles à Montalcino, remontée nord" },
      morning: {
        en: "Drive to Montalcino. Brunello tasting day. Book ONE serious winery (Casanova di Neri, Argiano, Il Poggione) and ONE casual stop. Don't try to do four — the roads are winding and the wines are 14%+.",
        fr: "Route vers Montalcino. Journée Brunello. Réservez UN domaine sérieux (Casanova di Neri, Argiano, Il Poggione) et UNE étape plus décontractée. N'essayez pas d'en faire quatre — les routes tournent et les vins sont à 14%+.",
      },
      afternoon: {
        en: "Long lunch at the winery or at Re di Macchia in Montalcino town. Designate a driver! Or split costs of a private driver-guide for the day (~250 EUR, well worth it for a group of 6).",
        fr: "Long déjeuner au domaine ou chez Re di Macchia à Montalcino. Désignez un conducteur ! Ou partagez les frais d'un chauffeur-guide privé pour la journée (~250 €, vaut le coup à 6).",
      },
      evening: {
        en: "Drive 2h back toward Florence. Stop in Lucca for dinner — the perfect Tuscan small town. Walk the city walls at dusk. Sleep in Lucca or push the last 30 minutes to a hotel near Pisa airport for tomorrow.",
        fr: "Route 2h direction Florence. Arrêt à Lucques pour le dîner — la petite ville toscane parfaite. Marche sur les remparts au crépuscule. Dodo à Lucques ou continuez 30 min jusqu'à un hôtel près de l'aéroport de Pise pour demain.",
      },
    },
    {
      day: 7,
      title: { en: "Pisa, return car, fly home", fr: "Pise, retour de la voiture, vol retour" },
      morning: {
        en: "Pisa for the Leaning Tower — yes you do the photo, no judgment. 90 minutes is enough. Coffee on Piazza dei Cavalieri.",
        fr: "Pise pour la Tour Penchée — oui vous faites la photo, sans jugement. 90 minutes suffisent. Café sur la Piazza dei Cavalieri.",
      },
      afternoon: {
        en: "Return the rental car at Pisa airport (avoids Florence city return fees). Late lunch at the airport or in Pisa centre. Flights typically afternoon/evening.",
        fr: "Retour de la voiture à l'aéroport de Pise (évite les frais de restitution en ville à Florence). Déjeuner tardif à l'aéroport ou en centre-ville. Vols généralement après-midi/soir.",
      },
      evening: {
        en: "Fly home. The group chat will be 80% photos of food and 20% 'when's the next one' for the next two months.",
        fr: "Vol retour. Le groupe WhatsApp va être à 80% photos de bouffe et 20% « on refait quand » pendant deux mois.",
      },
    },
  ],
  pois: [
    {
      name: "Uffizi Gallery",
      type: "landmark",
      description: {
        en: "One of the world's great museums. Pre-book online — never queue on the day. 2-3 hours is enough for the Botticellis, Leonardo, Caravaggio.",
        fr: "Un des plus grands musées du monde. Réservez en ligne — ne faites jamais la queue sur place. 2-3h suffisent pour les Botticelli, Léonard, Caravage.",
      },
      mapsUrl: "https://maps.google.com/?q=Uffizi+Gallery+Florence",
    },
    {
      name: "Piazza del Campo",
      type: "landmark",
      description: {
        en: "Siena's shell-shaped main square. Climb the Torre del Mangia for the view, lounge on the brick paving in the late afternoon. Where the Palio horse race runs.",
        fr: "La place principale de Sienne, en forme de coquillage. Montez à la Torre del Mangia pour la vue, allongez-vous sur le pavage en fin d'après-midi. C'est ici que court le Palio.",
      },
      mapsUrl: "https://maps.google.com/?q=Piazza+del+Campo+Siena",
    },
    {
      name: "Val d'Orcia (San Quirico area)",
      type: "neighborhood",
      description: {
        en: "UNESCO landscape of cypress-lined hills, perfect rolling fields, and the road from Gladiator. Drive slowly, pull over often. Best light is golden hour.",
        fr: "Paysage UNESCO de collines bordées de cyprès, champs ondulés parfaits, la route du film Gladiator. Conduisez lentement, arrêtez-vous souvent. Meilleure lumière à l'heure dorée.",
      },
      mapsUrl: "https://maps.google.com/?q=Val+dOrcia+San+Quirico",
    },
    {
      name: "Montalcino (Brunello wineries)",
      type: "activity",
      description: {
        en: "The hilltop town of Brunello wine. Book one serious cellar visit (Casanova di Neri, Il Poggione) ahead — most don't take walk-ins. Designate a driver.",
        fr: "Le village perché du Brunello. Réservez une vraie visite de cave (Casanova di Neri, Il Poggione) en avance — la plupart ne prennent pas les visites spontanées. Désignez un conducteur.",
      },
      mapsUrl: "https://maps.google.com/?q=Montalcino+Tuscany",
    },
    {
      name: "San Gimignano",
      type: "landmark",
      description: {
        en: "The 'medieval Manhattan' — 14 surviving stone towers visible from miles away. Get there early or late to dodge the day-tripper crowds. Climb the Torre Grossa.",
        fr: "Le « Manhattan médiéval » — 14 tours en pierre visibles de loin. Allez-y tôt ou tard pour éviter la foule des excursionnistes. Montez à la Torre Grossa.",
      },
      mapsUrl: "https://maps.google.com/?q=San+Gimignano+Tuscany",
    },
    {
      name: "Pienza",
      type: "neighborhood",
      description: {
        en: "Renaissance ideal-town. Buy pecorino at any shop, walk the panoramic alley behind the cathedral, lunch with a view. 90-minute stop.",
        fr: "Ville idéale de la Renaissance. Achetez du pecorino dans n'importe quelle boutique, parcourez la ruelle panoramique derrière la cathédrale, déjeuner avec vue. Arrêt de 90 min.",
      },
      mapsUrl: "https://maps.google.com/?q=Pienza+Tuscany",
    },
    {
      name: "Bagno Vignoni",
      type: "activity",
      description: {
        en: "A village built around a thermal pool in its main square. Soak at sunset at the public Parco dei Mulini hot pools (free), or the spa hotel pools (paid).",
        fr: "Un village construit autour d'un bassin thermal sur sa place principale. Bain au coucher de soleil aux sources publiques du Parco dei Mulini (gratuit) ou aux piscines du spa-hôtel (payant).",
      },
      mapsUrl: "https://maps.google.com/?q=Bagno+Vignoni",
    },
    {
      name: "Lucca",
      type: "neighborhood",
      description: {
        en: "Walled Renaissance town between Florence and Pisa. Walk the 4km wall, rent bikes for a loop, dinner on Piazza dell'Anfiteatro. Underrated last stop.",
        fr: "Petite ville Renaissance fortifiée entre Florence et Pise. Marche sur les 4 km de remparts, vélo en boucle, dîner sur la Piazza dell'Anfiteatro. Étape finale sous-estimée.",
      },
      mapsUrl: "https://maps.google.com/?q=Lucca+Italy",
    },
  ],
  budget: {
    perPerson: { low: 720, high: 1100, currency: "EUR" },
    breakdown: [
      {
        category: { en: "Accommodation (6 nights, mix Airbnb + agriturismo)", fr: "Hébergement (6 nuits, mix Airbnb + agriturismo)" },
        amount: 280,
      },
      { category: { en: "Rental car + fuel + tolls (split)", fr: "Voiture de location + carburant + péages (partagés)" }, amount: 110 },
      { category: { en: "Food & restaurants", fr: "Repas & restaurants" }, amount: 220 },
      { category: { en: "Wineries & tastings", fr: "Vignobles & dégustations" }, amount: 90 },
      { category: { en: "Museums (Uffizi, Duomo, towers)", fr: "Musées (Offices, Duomo, tours)" }, amount: 55 },
      { category: { en: "ZTL fines buffer + parking", fr: "Buffer amendes ZTL + parking" }, amount: 25 },
    ],
    note: {
      en: "Flights not included. WARNING: Italian historic centres are 'ZTL' zones — drive into one and you'll get a 100+ EUR fine in the post 6 months later. Park outside and walk in.",
      fr: "Vols non inclus. ATTENTION : les centres historiques italiens sont des zones ZTL — y entrer en voiture = amende de 100€+ par la poste 6 mois plus tard. Garez-vous à l'extérieur et entrez à pied.",
    },
  },
  packing: {
    en: [
      "One nice dinner outfit (Italians dress up for dinner)",
      "Comfortable walking shoes — every town is uphill cobblestone",
      "Light layers (Tuscan evenings cool quickly)",
      "Reusable water bottle (free fountains everywhere)",
      "Cooler bag for winery purchases on the drive",
      "Cash for small towns (cards still patchy in agriturismi)",
      "International driving permit (mandatory for non-EU drivers)",
    ],
    fr: [
      "Une tenue habillée pour les dîners (les Italiens s'habillent le soir)",
      "Chaussures de marche confortables — chaque village monte en pavés",
      "Couches légères (les soirées toscanes refroidissent vite)",
      "Gourde réutilisable (fontaines partout)",
      "Sac glacière pour les achats vignobles dans la voiture",
      "Du cash pour les petits villages (CB encore aléatoire en agriturismi)",
      "Permis international (obligatoire pour les conducteurs hors UE)",
    ],
  },
  bestSeason: {
    en: "Mid-April to mid-June and September to mid-October are the dream windows. Hills are green, vineyards are open, restaurants aren't packed. July-August is hot (35°C+) and Florence becomes unbearable.",
    fr: "Mi-avril à mi-juin et septembre à mi-octobre sont les meilleures fenêtres. Collines vertes, domaines ouverts, restaurants pas blindés. Juillet-août c'est chaud (35°C+) et Florence devient invivable.",
  },
  related: ["andalusia-road-trip", "lisbon-with-friends", "marrakech-bachelorette"],
};

// ---------------------------------------------------------------------------
// 5. Lisbon — Weekend with friends — 4 days
// ---------------------------------------------------------------------------
const lisbon: Destination = {
  slug: { en: "lisbon-with-friends", fr: "lisbonne-entre-amis" },
  useCase: "with-friends",
  days: 4,
  city: { en: "Lisbon", fr: "Lisbonne" },
  country: { en: "Portugal", fr: "Portugal" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1753366400921-f75a179058e4?w=1600&q=80",
    imageAlt: {
      en: "Iconic yellow tram on a steep cobblestone street in Lisbon at sunset",
      fr: "Tramway jaune iconique sur une rue pavée en pente à Lisbonne au coucher du soleil",
    },
    tag: {
      en: "Weekend with friends · 4 days",
      fr: "Week-end entre amis · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Lisbon with Friends — 4-Day Itinerary, Tasca Dinners & Real Budget",
      fr: "Lisbonne entre Amis — Itinéraire 4 jours, tascas et budget réel",
    },
    description: {
      en: "A 4-day Lisbon weekend itinerary for friends: miradouros, Time Out Market, fado, Sintra day, real spots and a free planner to fork the trip.",
      fr: "Itinéraire week-end de 4 jours à Lisbonne entre amis : miradouros, Time Out Market, fado, journée Sintra, vraies adresses et planificateur gratuit.",
    },
  },
  intro: {
    en: [
      "Lisbon is the European weekend that delivers more than it promises. You go thinking 'long weekend, eat some custard tarts' and you come home talking about the light, the tile, the food, the price. It's the cheapest capital in Western Europe, the food is better than it has any right to be, and the city is the perfect size for a group: small enough to walk in a day, big enough to keep finding new corners.",
      "The trick to Lisbon with friends is simple: don't overplan. The miradouros (viewpoints) are free, the trams are scenic, the wine is 4 EUR a glass. You need 2-3 reservations for the headline meals and one Sintra day — everything else can be improvised on the day. Friday morning to Monday evening is the perfect window. Anything longer and you'll start considering moving there (you might anyway).",
      "This itinerary works for 4-8 friends, mixed ages, mixed energy levels. There's a big night in Bairro Alto for the going-out crowd, a slow Sunday in Alfama for the slow-morning crowd, and a Sintra day where Pena Palace and Cabo da Roca will reset everyone's emotional baseline.",
    ],
    fr: [
      "Lisbonne, c'est le week-end européen qui surpasse ses propres promesses. On y va en se disant « long week-end, on bouffera des pastéis » et on rentre en parlant de la lumière, des azulejos, de la bouffe, des prix. C'est la capitale d'Europe de l'Ouest la moins chère, la cuisine est meilleure qu'elle n'a le droit, et la ville est la taille idéale pour un groupe : assez petite pour la traverser à pied en une journée, assez grande pour continuer à découvrir des recoins.",
      "L'astuce pour Lisbonne entre amis : ne sur-planifiez pas. Les miradouros (points de vue) sont gratuits, les tramways sont pittoresques, le verre de vin est à 4 €. Il vous faut 2-3 réservations pour les gros restaurants et une journée Sintra — le reste s'improvise. Du vendredi matin au lundi soir, c'est la fenêtre parfaite. Plus long et vous envisagez sérieusement d'y déménager (ce qui arrivera peut-être quand même).",
      "Cet itinéraire fonctionne pour 4-8 amis, âges et énergies mélangés. Une grosse soirée à Bairro Alto pour ceux qui sortent, un dimanche tranquille à Alfama pour ceux du brunch lent, et une journée à Sintra où le palais de Pena et le Cabo da Roca vont remettre tout le monde à zéro émotionnellement.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: { en: "Arrival, Time Out Market, sunset miradouro", fr: "Arrivée, Time Out Market, miradouro au coucher de soleil" },
      morning: {
        en: "Land at Humberto Delgado. Metro red line to Aeroporto → São Sebastião → Baixa-Chiado, or split an Uber XL for the group (~12 EUR). Check into the Airbnb in Chiado, Príncipe Real or Alfama.",
        fr: "Atterrissage à Humberto Delgado. Métro ligne rouge Aeroporto → São Sebastião → Baixa-Chiado, ou un Uber XL pour le groupe (~12 €). Check-in Airbnb à Chiado, Príncipe Real ou Alfama.",
      },
      afternoon: {
        en: "Walk to the Time Out Market (Mercado da Ribeira). It's touristy but it's the easiest 'everyone picks what they want' lunch in town. Split a few dishes. Then walk up to Miradouro de Santa Catarina.",
        fr: "Marche jusqu'au Time Out Market (Mercado da Ribeira). Touristique mais c'est le déjeuner « chacun choisit son truc » le plus simple de la ville. Partagez quelques plats. Puis montée jusqu'au Miradouro de Santa Catarina.",
      },
      evening: {
        en: "Sunset at Miradouro de São Pedro de Alcântara. Beers in plastic cups from the kiosk. Dinner at Taberna da Rua das Flores (no reservations — turn up at 7pm sharp). Drink one ginjinha in A Ginjinha do Rossio for tradition.",
        fr: "Coucher de soleil au Miradouro de São Pedro de Alcântara. Bières en gobelet plastique du kiosque. Dîner à la Taberna da Rua das Flores (pas de résa — venez à 19h pile). Une ginjinha à A Ginjinha do Rossio pour la tradition.",
      },
    },
    {
      day: 2,
      title: { en: "Alfama, tram 28, fado night", fr: "Alfama, tram 28, soirée fado" },
      morning: {
        en: "Slow breakfast at Dear Breakfast or Hello, Kristof. Walk into Alfama — the old Moorish quarter. Get lost on purpose. Castle of São Jorge if anyone wants it (entry ~15 EUR, decent view).",
        fr: "Petit-déj tranquille chez Dear Breakfast ou Hello, Kristof. Direction Alfama — le vieux quartier mauresque. Perdez-vous exprès. Château São Jorge si quelqu'un insiste (entrée ~15 €, vue correcte).",
      },
      afternoon: {
        en: "Ride tram 28 for one segment (full route = pickpocket roulette + 2-hour queue). Lunch at Cervejaria Ramiro — go-to for shellfish, expect a queue but it moves. Order ameijoas, garlic prawns, the steak sandwich for dessert.",
        fr: "Tram 28 sur un segment seulement (la ligne complète = pickpocket roulette + 2h de queue). Déjeuner à la Cervejaria Ramiro — référence pour les fruits de mer, queue importante mais ça va vite. Commandez palourdes, gambas à l'ail, sandwich au steak en dessert.",
      },
      evening: {
        en: "Fado dinner at Mesa de Frades (tiny tile-clad chapel, book 2+ weeks ahead) or A Tasca do Chico (more casual, walk-in). After: drinks on the street in Bairro Alto — the whole neighbourhood spills out, bars give you cups to take outside.",
        fr: "Dîner fado à Mesa de Frades (minuscule chapelle azulejos, réservez 2 semaines avant) ou A Tasca do Chico (plus décontracté, sans résa). Ensuite : verres dans la rue à Bairro Alto — tout le quartier sort, les bars te donnent des gobelets à emporter.",
      },
    },
    {
      day: 3,
      title: { en: "Sintra day trip", fr: "Excursion à Sintra" },
      morning: {
        en: "8am train from Rossio to Sintra (40 min, ~5 EUR round-trip). Pre-book Pena Palace entry online for 10am. Tuk-tuk or local bus 434 up to the palace from the train station.",
        fr: "Train de 8h à Rossio direction Sintra (40 min, ~5 € aller-retour). Réservez l'entrée au Palais de Pena en ligne pour 10h. Tuk-tuk ou bus local 434 depuis la gare jusqu'au palais.",
      },
      afternoon: {
        en: "Quinta da Regaleira after Pena (initiation well, gardens — book online too). Lunch at Tascantiga in Sintra town. Optional: Uber to Cabo da Roca, the westernmost point of continental Europe, for the windswept cliff photos.",
        fr: "Quinta da Regaleira après Pena (puits initiatique, jardins — réservez aussi en ligne). Déjeuner à Tascantiga dans le village. En option : Uber jusqu'au Cabo da Roca, le point le plus à l'ouest de l'Europe continentale, pour les photos de falaise battue par les vents.",
      },
      evening: {
        en: "Train back to Lisbon late afternoon. Easy group dinner at Taberna Tosca or Pizzeria O Pizzaiolo in Príncipe Real. Drinks at Pavilhão Chinês — bizarre lamp museum that's secretly a cocktail bar.",
        fr: "Train retour pour Lisbonne en fin d'après-midi. Dîner de groupe facile à la Taberna Tosca ou Pizzeria O Pizzaiolo à Príncipe Real. Verres au Pavilhão Chinês — musée de lampes bizarre qui est secrètement un bar à cocktails.",
      },
    },
    {
      day: 4,
      title: { en: "Belém, pastéis, fly home", fr: "Belém, pastéis, retour" },
      morning: {
        en: "Bus 728 or tram 15 to Belém. Pastéis de Belém — yes the original — queue is 30 min but moves fast. Eat them warm with cinnamon.",
        fr: "Bus 728 ou tram 15 jusqu'à Belém. Pastéis de Belém — oui les originaux — 30 min de queue mais ça file. Mangez-les tièdes avec de la cannelle.",
      },
      afternoon: {
        en: "Walk along the river: Jerónimos Monastery (exterior is enough), Padrão dos Descobrimentos, the Belém Tower. MAAT museum if anyone's into architecture (free first Sunday of the month). Late lunch at Taberna de Belém.",
        fr: "Balade le long du fleuve : Monastère des Jerónimos (l'extérieur suffit), Padrão dos Descobrimentos, Tour de Belém. MAAT si quelqu'un aime l'architecture (gratuit le 1er dimanche). Déjeuner tardif à la Taberna de Belém.",
      },
      evening: {
        en: "Back to the Airbnb, repack, sunset beers on the doorstep, Uber to the airport. Half the group will be back here within 12 months.",
        fr: "Retour Airbnb, bagages, bières du coucher de soleil sur le pas de la porte, Uber pour l'aéroport. La moitié du groupe va revenir dans les 12 mois.",
      },
    },
  ],
  pois: [
    {
      name: "Time Out Market",
      type: "restaurant",
      description: {
        en: "Curated food hall in the old Mercado da Ribeira. 30+ stalls from Lisbon's best chefs, one shared seating area. Lunch is calmer than dinner.",
        fr: "Food hall sélectionné dans l'ancien Mercado da Ribeira. 30+ stands des meilleurs chefs de Lisbonne, une grande salle commune. Plus calme au déjeuner qu'au dîner.",
      },
      mapsUrl: "https://maps.google.com/?q=Time+Out+Market+Lisbon",
    },
    {
      name: "Miradouro de São Pedro de Alcântara",
      type: "landmark",
      description: {
        en: "Two-level viewpoint above Bairro Alto. The classic Lisbon sunset shot — castle, river, tiled rooftops all in frame. Kiosk does cheap beers.",
        fr: "Belvédère sur deux niveaux au-dessus de Bairro Alto. La photo lisboète classique — château, fleuve, toits d'azulejos dans le cadre. Le kiosque sert des bières pas chères.",
      },
      mapsUrl: "https://maps.google.com/?q=Miradouro+Sao+Pedro+de+Alcantara",
    },
    {
      name: "Cervejaria Ramiro",
      type: "restaurant",
      description: {
        en: "The shellfish institution. Queue is part of the ritual. Order ameijoas à Bulhão Pato, garlic prawns, the prego no pão (steak sandwich) as 'dessert'.",
        fr: "L'institution fruits de mer. La queue fait partie du rituel. Commandez ameijoas à Bulhão Pato, gambas à l'ail, et le prego no pão (sandwich steak) en « dessert ».",
      },
      mapsUrl: "https://maps.google.com/?q=Cervejaria+Ramiro+Lisbon",
    },
    {
      name: "Mesa de Frades",
      type: "restaurant",
      description: {
        en: "Fado dinner inside a tiny tiled chapel in Alfama. 30 covers, two singing sets, book 2+ weeks ahead. The intimate fado experience.",
        fr: "Dîner fado dans une minuscule chapelle d'azulejos à Alfama. 30 couverts, deux sets de chant, réservez 2 semaines à l'avance. L'expérience fado intime.",
      },
      mapsUrl: "https://maps.google.com/?q=Mesa+de+Frades+Lisbon",
    },
    {
      name: "Pena Palace (Sintra)",
      type: "landmark",
      description: {
        en: "Yellow-and-red fairy-tale palace on a Sintra hilltop. Book online for the timed entry — walk-up queue can be 2 hours. Combine with Quinta da Regaleira.",
        fr: "Palais jaune et rouge de conte de fées sur une colline de Sintra. Réservez en ligne pour l'entrée à heure fixe — file sur place jusqu'à 2h. À combiner avec la Quinta da Regaleira.",
      },
      mapsUrl: "https://maps.google.com/?q=Pena+Palace+Sintra",
    },
    {
      name: "Pastéis de Belém",
      type: "restaurant",
      description: {
        en: "The original 1837 bakery, the only one allowed to call them 'pastéis de Belém' (everyone else makes 'pastéis de nata'). Worth the 30-min queue once.",
        fr: "La boulangerie originale de 1837, la seule autorisée à les appeler « pastéis de Belém » (les autres font des « pastéis de nata »). 30 min de queue, à faire une fois.",
      },
      mapsUrl: "https://maps.google.com/?q=Pasteis+de+Belem",
    },
    {
      name: "Bairro Alto",
      type: "neighborhood",
      description: {
        en: "The going-out neighbourhood. Bars are tiny and the action spills into the streets — buy from a bar, take it outside, find your friends in the crowd. Peak from 11pm.",
        fr: "Le quartier des sorties. Les bars sont minuscules et l'ambiance déborde dans les rues — on achète au bar, on sort, on retrouve ses potes dans la foule. Pic à partir de 23h.",
      },
      mapsUrl: "https://maps.google.com/?q=Bairro+Alto+Lisbon",
    },
    {
      name: "Cabo da Roca",
      type: "landmark",
      description: {
        en: "The westernmost point of mainland Europe. Wind-blasted cliff, lighthouse, the certificate kiosk. 40 min from Sintra by Uber, easy add-on to the day trip.",
        fr: "Le point le plus à l'ouest de l'Europe continentale. Falaise battue par les vents, phare, kiosque à certificats. 40 min de Sintra en Uber, bon complément à l'excursion.",
      },
      mapsUrl: "https://maps.google.com/?q=Cabo+da+Roca",
    },
  ],
  budget: {
    perPerson: { low: 360, high: 580, currency: "EUR" },
    breakdown: [
      {
        category: { en: "Accommodation (Airbnb, 3 nights, shared)", fr: "Hébergement (Airbnb, 3 nuits, partagé)" },
        amount: 130,
      },
      { category: { en: "Food & restaurants", fr: "Repas & restaurants" }, amount: 130 },
      { category: { en: "Drinks & nightlife", fr: "Boissons & sorties" }, amount: 70 },
      { category: { en: "Sintra day (train + entries + transport)", fr: "Journée Sintra (train + entrées + transports)" }, amount: 45 },
      { category: { en: "Public transit + Ubers", fr: "Transports + Ubers" }, amount: 25 },
      { category: { en: "Pastéis tax (you'll buy too many)", fr: "Taxe pastéis (vous en achèterez trop)" }, amount: 15 },
    ],
    note: {
      en: "Flights not included. Lisbon is one of the cheapest European capitals — that's exactly why it's good for a group of friends. A nice dinner with wine for 6 still rarely tops 30 EUR per head.",
      fr: "Vols non inclus. Lisbonne est une des capitales européennes les moins chères — c'est exactement pour ça que c'est bon entre amis. Un beau dîner avec vin à 6 dépasse rarement 30 € par personne.",
    },
  },
  packing: {
    en: [
      "Shoes with grip — Lisbon's calçada cobblestones are slippery when wet",
      "Light layers — Atlantic breeze in the evening",
      "One smart-casual outfit for fado dinner",
      "Swimwear if you go in summer (Cascais beaches are 30 min away)",
      "Reusable water bottle",
      "Power bank (lots of walking, GPS-heavy)",
      "Cash for the ginjinha kiosk and small tascas",
    ],
    fr: [
      "Chaussures à bonne adhérence — la calçada lisboète glisse quand il pleut",
      "Couches légères — brise atlantique en soirée",
      "Une tenue smart-casual pour le fado",
      "Maillot si vous y allez l'été (les plages de Cascais sont à 30 min)",
      "Gourde réutilisable",
      "Batterie externe (beaucoup de marche, GPS gourmand)",
      "Du cash pour le kiosque à ginjinha et les petites tascas",
    ],
  },
  bestSeason: {
    en: "April-June and September-October are the sweet spots: 20-25°C, low rain, manageable crowds. July-August is hot but the Atlantic keeps it bearable. December-February is mild (15°C) but rainy.",
    fr: "Avril-juin et septembre-octobre sont les meilleures fenêtres : 20-25°C, peu de pluie, foules gérables. Juillet-août c'est chaud mais l'Atlantique tempère. Décembre-février est doux (15°C) mais pluvieux.",
  },
  related: ["tuscany-road-trip", "budapest-bachelorette", "marrakech-bachelorette"],
};

// ---------------------------------------------------------------------------
// 6. Las Vegas — Bachelorette / EVJF — 3 days
// ---------------------------------------------------------------------------
const lasVegas: Destination = {
  slug: { en: "las-vegas-bachelorette", fr: "las-vegas-evjf" },
  useCase: "bachelorette",
  days: 3,
  city: { en: "Las Vegas", fr: "Las Vegas" },
  country: { en: "United States", fr: "États-Unis" },
  hero: {
    // TODO: replace image — search Unsplash for "las vegas strip neon night"
    image:
      "https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?w=1600&q=80",
    imageAlt: {
      en: "Neon lights of the Las Vegas Strip at night with hotel towers in the background",
      fr: "Néons du Strip de Las Vegas la nuit avec les tours des hôtels en arrière-plan",
    },
    tag: {
      en: "Bachelorette · 3-day weekend · USA",
      fr: "EVJF · Week-end de 3 jours · USA",
    },
  },
  meta: {
    title: {
      en: "Las Vegas Bachelorette — 3-Day Pool, Dayclub & Strip Itinerary",
      fr: "EVJF à Las Vegas — Itinéraire 3 jours, dayclubs, pool et Strip",
    },
    description: {
      en: "The #1 US bachelorette weekend: 3 days in Vegas with pool parties, dayclubs, rooftop dinners, a Cirque show and Sunday brunch. Real spots, real budget.",
      fr: "L'EVJF américain par excellence : 3 jours à Vegas avec pool parties, dayclubs, dîners rooftop, show Cirque et brunch dominical. Vraies adresses, budget réel.",
    },
  },
  intro: {
    en: [
      "Las Vegas is the bachelorette weekend other US cities are trying to imitate. It exists for this exact use case: a group of 8 to 12 women flying in Friday morning, taking over a Strip suite, hitting a dayclub on Saturday, putting on something sequined for dinner, and stumbling into Sunday brunch with stories nobody else will ever understand. Every part of the city — the hotels, the restaurants, the pools, the shows — is built around it.",
      "What separates Vegas from a European bachelorette is the scale of everything. The pools are nightclubs. Dinners come with sparkler bottle service. The cocktails are taller than your forearm. The 'mariage à l'américaine' aesthetic is real, and it peaks in Vegas — matching outfits, custom sashes, professional photographer at the pool, the whole machine. Lean in. The bride will love the photos.",
      "Three days is the sweet spot — Friday to Sunday. Any longer and the wallets and the livers start to file complaints. This itinerary covers the canonical Vegas bachelorette: one Strip dinner + rooftop, one full dayclub day with a Cirque show chaser, and a Sunday brunch + slow exit. Stay on the Strip — preferably The Cosmopolitan, Wynn, or Resorts World — and you can walk or grab a quick rideshare to everything below.",
    ],
    fr: [
      "Las Vegas, c'est l'EVJF que toutes les autres villes américaines tentent d'imiter. La ville existe pour ce format précis : un groupe de 8 à 12 copines qui débarque le vendredi matin, prend possession d'une suite sur le Strip, enchaîne un dayclub le samedi, sort la robe à paillettes pour le dîner, et titube jusqu'au brunch dominical avec des histoires que personne d'autre ne comprendra. Tout est conçu pour ça — hôtels, restaurants, piscines, spectacles.",
      "Ce qui distingue Vegas d'un EVJF européen, c'est l'échelle. Les piscines sont des boîtes de nuit. Les dîners arrivent avec des bouteilles à étincelles. Les cocktails dépassent l'avant-bras. C'est le mariage à l'américaine version XXL — tenues assorties, écharpes custom, photographe pro au bord de la piscine, toute la machinerie. Acceptez-le, foncez : la mariée adorera les photos.",
      "Trois jours, c'est le format idéal — du vendredi au dimanche. Plus long et les portefeuilles comme les foies commencent à protester. Cet itinéraire couvre l'EVJF Vegas canonique : un dîner + rooftop sur le Strip, une vraie journée dayclub suivie d'un show du Cirque, puis brunch dominical et sortie en douceur. Restez sur le Strip — idéalement au Cosmopolitan, au Wynn ou à Resorts World — vous allez à pied ou en quick rideshare à tout ce qui suit.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Arrival, suite check-in, Strip dinner & rooftop",
        fr: "Arrivée, suite, dîner sur le Strip et rooftop",
      },
      morning: {
        en: "Land at Harry Reid International (LAS). It's 10 minutes to the Strip — pre-book a party shuttle or split an Uber XL. Aim to be checked in by noon: The Cosmopolitan's Wraparound Terrace Suite is the bachelorette default, Wynn Tower Suites or Resorts World are quieter alternatives.",
        fr: "Atterrissage à Harry Reid International (LAS). 10 minutes du Strip — réservez une navette party ou prenez un Uber XL en groupe. Visez le check-in à midi : la Wraparound Terrace Suite du Cosmopolitan est l'option EVJF par défaut, le Wynn Tower Suites ou Resorts World sont plus calmes.",
      },
      afternoon: {
        en: "Drop bags, change into pool-deck outfits, then a chilled afternoon at the hotel pool (Cosmopolitan's Boulevard Pool or Wynn's European Pool — both quieter on Friday). Late lunch poolside, group photo, save the dayclub energy for tomorrow.",
        fr: "Bagages posés, on enfile les tenues piscine, après-midi tranquille à la piscine de l'hôtel (Boulevard Pool du Cosmopolitan ou European Pool du Wynn — toutes deux plus calmes le vendredi). Déjeuner tardif au bord du bassin, photo de groupe, on garde l'énergie dayclub pour demain.",
      },
      evening: {
        en: "Steakhouse opening dinner at Bavette's (Park MGM) — the bachelorette steak choice, book 4-6 weeks ahead for a Friday 8pm slot. Or Eataly's rooftop Pizza & Pasta for a lighter group meal. Then rooftop drinks at Skyfall Lounge (Delano, 64th floor) or Foundation Room (Mandalay Bay). Easy night — nobody wants to peak Friday.",
        fr: "Dîner d'ouverture au steakhouse Bavette's (Park MGM) — la table EVJF par excellence, réservez 4-6 semaines à l'avance pour un samedi 20h. Sinon le rooftop Pizza & Pasta d'Eataly pour un dîner de groupe plus léger. Puis verres en hauteur au Skyfall Lounge (Delano, 64e étage) ou au Foundation Room (Mandalay Bay). Soirée easy — personne ne veut peaker le vendredi.",
      },
    },
    {
      day: 2,
      title: {
        en: "Dayclub, Strip dinner, Cirque show, club night",
        fr: "Dayclub, dîner Strip, show du Cirque, club",
      },
      morning: {
        en: "Brunch at Sadelle's (Bellagio) or Bouchon (Venetian) — both reservation-only, both photogenic. Hydrate hard. The dayclub will not be kind to dehydrated bodies.",
        fr: "Brunch au Sadelle's (Bellagio) ou au Bouchon (Venetian) — résa obligatoire dans les deux, hyper photogéniques. Hydratez-vous sérieusement. Le dayclub ne pardonne pas les corps déshydratés.",
      },
      afternoon: {
        en: "Dayclub. This is the bachelorette centrepiece. Encore Beach Club (the classic), Wet Republic at MGM Grand (most central), or Marquee Dayclub at The Cosmopolitan (the rooftop one). Book a daybed for the group — splits to ~$80-120 per head for the day, comes with bottle service. Doors at 11am, peak is 2-5pm, headline DJ from 4pm. Tip your server well.",
        fr: "Dayclub. C'est le cœur de l'EVJF Vegas. Encore Beach Club (le classique), Wet Republic au MGM Grand (le plus central) ou Marquee Dayclub au Cosmopolitan (le rooftop). Réservez un daybed pour le groupe — ça se partage à ~80-120 $ par tête pour la journée, bottle service inclus. Ouverture à 11h, peak 14h-17h, DJ tête d'affiche à partir de 16h. Tip généreux pour le serveur.",
      },
      evening: {
        en: "Quick suite reset, big dinner outfits. Group dinner at Beauty & Essex (The Cosmopolitan) — moody, dramatic, group-friendly menu. 9:30pm Cirque show — 'O' at Bellagio is the bachelorette favourite, or 'Mystère' at Treasure Island for a cheaper option. After: club night at Omnia (Caesars), XS (Encore) or Hakkasan (MGM). Bottle table if budget allows, otherwise GA line — wear something sparkly, get in by midnight.",
        fr: "Petit reset dans la suite, on sort les robes du dîner. Dîner de groupe au Beauty & Essex (Cosmopolitan) — ambiance dramatique, menu pensé pour les groupes. Show du Cirque à 21h30 — « O » au Bellagio est le préféré des EVJF, ou « Mystère » à Treasure Island en option moins chère. Ensuite : club à l'Omnia (Caesars), XS (Encore) ou Hakkasan (MGM). Table bottle si le budget passe, sinon file GA — paillettes obligatoires, entrée avant minuit.",
      },
    },
    {
      day: 3,
      title: {
        en: "Bottomless brunch, slow Strip walk, fly home",
        fr: "Brunch à volonté, balade Strip tranquille, retour",
      },
      morning: {
        en: "Late bottomless mimosa brunch at Eggslut (slow line but it moves), Tableau at Wynn (more upscale), or Yardbird (Venetian) for the indulgent Southern brunch with watermelon-and-vodka pitchers. The hangover-recovery meal of the trip.",
        fr: "Brunch tardif à volonté chez Eggslut (file lente mais qui avance), au Tableau du Wynn (plus chic) ou au Yardbird (Venetian) pour le brunch sudiste opulent avec ses pichets pastèque-vodka. Le repas de récupération du voyage.",
      },
      afternoon: {
        en: "Slow Strip stroll. Bellagio fountains every 30 min, mandatory Flamingo flamingo selfie, quick stop at the Wynn flower atrium and the Venetian canals. Optional gift-of-self at the Bellagio Conservatory (free) or the Cosmopolitan's wallpaper bathroom for the iconic group photo.",
        fr: "Balade tranquille sur le Strip. Fontaines du Bellagio toutes les 30 min, selfie obligatoire avec les flamants roses du Flamingo, petit tour à l'atrium fleuri du Wynn et aux canaux du Venetian. En option : le Conservatoire du Bellagio (gratuit) ou les toilettes au papier peint iconique du Cosmopolitan pour la photo de groupe.",
      },
      evening: {
        en: "Pack, late check-out (most Strip hotels offer 2pm — ask at the desk on arrival). Light dinner at Yardbird again if Sunday's bottomless slot is gone, or a slice at Secret Pizza inside The Cosmopolitan. Uber XL to the airport — Sunday evening at LAS is busy, give yourself 2.5 hours.",
        fr: "Bagages, late check-out (la plupart des hôtels du Strip proposent 14h — demandez à l'arrivée). Dîner léger encore au Yardbird si le créneau brunch est passé, ou une part chez Secret Pizza dans le Cosmopolitan. Uber XL pour l'aéroport — LAS le dimanche soir c'est intense, prévoyez 2h30.",
      },
    },
  ],
  pois: [
    {
      name: "Encore Beach Club (Wynn)",
      type: "club",
      description: {
        en: "The original Strip dayclub: three-tiered pool, lazy river, headline-DJ residencies. Book a daybed for groups of 6+; otherwise the GA line on Saturday is brutal.",
        fr: "Le dayclub originel du Strip : piscine sur trois niveaux, lazy river, DJ résidents. Réservez un daybed pour les groupes de 6+ ; sinon la file GA du samedi est brutale.",
      },
      mapsUrl: "https://maps.google.com/?q=Encore+Beach+Club+Las+Vegas",
    },
    {
      name: "Marquee Dayclub (The Cosmopolitan)",
      type: "club",
      description: {
        en: "Rooftop dayclub on the Strip with infinity pool views and a covered Library room for the shaded crowd. Bachelorette-friendly, daybed packages start around $1,500 split 8 ways.",
        fr: "Dayclub rooftop sur le Strip avec piscine à débordement et salon Library couvert pour les fans d'ombre. EVJF-friendly, les packages daybed démarrent à ~1 500 $ partagés à 8.",
      },
      mapsUrl: "https://maps.google.com/?q=Marquee+Dayclub+Las+Vegas",
    },
    {
      name: "Wet Republic (MGM Grand)",
      type: "club",
      description: {
        en: "Most central Strip dayclub, two saltwater pools, weekly resident DJs. The 'we can't decide which dayclub' default — easy walking from most Strip hotels.",
        fr: "Le dayclub le plus central du Strip, deux piscines à l'eau salée, DJ résidents toutes les semaines. L'option par défaut quand le groupe n'arrive pas à choisir — accessible à pied depuis la plupart des hôtels.",
      },
      mapsUrl: "https://maps.google.com/?q=Wet+Republic+Las+Vegas",
    },
    {
      name: "Bavette's Steakhouse (Park MGM)",
      type: "restaurant",
      description: {
        en: "1940s-jazz-club aesthetic, dim lighting, group-friendly steak menu. Vegas's bachelorette steakhouse — book 4-6 weeks ahead, request the round corner booth.",
        fr: "Esthétique club de jazz années 1940, lumière tamisée, carte steakhouse pensée pour les groupes. Le steakhouse EVJF de Vegas — réservez 4-6 semaines avant, demandez la banquette d'angle ronde.",
      },
      mapsUrl: "https://maps.google.com/?q=Bavettes+Steakhouse+Park+MGM",
    },
    {
      name: "Beauty & Essex (The Cosmopolitan)",
      type: "restaurant",
      description: {
        en: "Hidden behind a pawn-shop front, the Vegas outpost of NYC's group-dinner staple. Shareable plates, signature champagne tower moment, sparkler service is on the menu.",
        fr: "Caché derrière une vitrine de prêteur sur gages, l'antenne Vegas de l'institution new-yorkaise du dîner de groupe. Plats à partager, tour de champagne signature, service avec étincelles à la carte.",
      },
      mapsUrl: "https://maps.google.com/?q=Beauty+and+Essex+Cosmopolitan+Las+Vegas",
    },
    {
      name: "Skyfall Lounge (Delano)",
      type: "bar",
      description: {
        en: "64th-floor rooftop lounge with 360° Strip views. Cocktails are pricey but the photos are the kind the bride will frame. Sunset slot books up fastest.",
        fr: "Rooftop au 64e étage avec vue 360° sur le Strip. Cocktails chers mais les photos vont finir encadrées chez la mariée. Le créneau coucher de soleil se remplit le plus vite.",
      },
      mapsUrl: "https://maps.google.com/?q=Skyfall+Lounge+Delano+Las+Vegas",
    },
    {
      name: "Omnia Nightclub (Caesars)",
      type: "club",
      description: {
        en: "Multi-room mega-club: main floor for big-room DJs, Heart of Omnia for hip-hop, rooftop terrace for breathing room. Get there by 11:30pm or the GA queue eats your night.",
        fr: "Méga-club multi-salles : grande salle pour les DJ big-room, Heart of Omnia pour le hip-hop, terrasse rooftop pour respirer. Arrivez avant 23h30 sinon la file GA bouffe votre soirée.",
      },
      mapsUrl: "https://maps.google.com/?q=Omnia+Nightclub+Caesars+Palace",
    },
    {
      name: "Cirque du Soleil 'O' (Bellagio)",
      type: "activity",
      description: {
        en: "The water-stage Cirque show, in residence at the Bellagio since 1998. Pre-bachelorette-dinner timing usually works (7pm) — but the 9:30pm slot leaves the night fully open.",
        fr: "Le show aquatique du Cirque, en résidence au Bellagio depuis 1998. La séance pré-dîner (19h) marche souvent — mais le créneau 21h30 laisse la soirée totalement ouverte après.",
      },
      mapsUrl: "https://maps.google.com/?q=Cirque+du+Soleil+O+Bellagio",
    },
    {
      name: "Yardbird (Venetian)",
      type: "restaurant",
      description: {
        en: "Southern brunch institution with pitchers of watermelon mojito or peach-tea bourbon. The Sunday-brunch bachelorette finale — book 3 weeks ahead.",
        fr: "Institution du brunch sudiste, pichets de mojito-pastèque ou bourbon-thé pêche. Le brunch finale EVJF dominical — réservez 3 semaines avant.",
      },
      mapsUrl: "https://maps.google.com/?q=Yardbird+Venetian+Las+Vegas",
    },
    {
      name: "The Strip (Las Vegas Boulevard)",
      type: "neighborhood",
      description: {
        en: "The 4-mile stretch of casino-hotels and lights from Mandalay Bay to Stratosphere. Everything here is walkable but distances are deceptively long — use the monorail or Uber for hops over a mile.",
        fr: "Les 6 km de casino-hôtels et de néons de Mandalay Bay au Stratosphere. Tout est à pied mais les distances sont trompeuses — monorail ou Uber dès qu'on dépasse 1,5 km.",
      },
      mapsUrl: "https://maps.google.com/?q=Las+Vegas+Strip",
    },
  ],
  budget: {
    perPerson: { low: 900, high: 1500, currency: "USD" },
    breakdown: [
      {
        category: { en: "Strip suite (2 nights, shared 8-10 ppl)", fr: "Suite sur le Strip (2 nuits, partagée 8-10 pers.)" },
        amount: 240,
      },
      { category: { en: "Dayclub daybed + drinks (split)", fr: "Daybed dayclub + boissons (partagés)" }, amount: 180 },
      { category: { en: "Strip dinners (Bavette's + Beauty & Essex)", fr: "Dîners Strip (Bavette's + Beauty & Essex)" }, amount: 220 },
      { category: { en: "Cirque show ticket", fr: "Place show du Cirque" }, amount: 130 },
      { category: { en: "Nightclub cover + bottle share", fr: "Entrée club + part bottle service" }, amount: 140 },
      { category: { en: "Brunches, rooftop drinks, Ubers", fr: "Brunchs, verres rooftop, Ubers" }, amount: 130 },
      { category: { en: "Bride's share (split by group)", fr: "Part de la mariée (répartie)" }, amount: 60 },
    ],
    note: {
      en: "Flights not included. Vegas bachelorette is expensive — accept it. USD prices, on the ground only. The single biggest variable is the dayclub bottle minimum: skip it (GA line) and you save $200/head; commit to it and you save your sanity.",
      fr: "Vols non inclus. L'EVJF Vegas coûte cher — accepter c'est gagner. Prix en USD, au sol uniquement. Le poste de dépense le plus variable c'est la bottle minimum du dayclub : skippez (file GA) et vous économisez 200 $/tête ; engagez-vous et vous gagnez en sérénité.",
    },
  },
  packing: {
    en: [
      "Pool-deck outfits + cover-up (you'll change between pool and lunch)",
      "One 'going out' sparkly dress + heels you can actually walk in",
      "Cowgirl boots or sneakers — the Strip is longer than it looks",
      "Bride sash + custom sashes for the squad (Etsy in advance)",
      "Reef-safe SPF 50 — Nevada sun at 5pm still bites",
      "Portable phone charger + waterproof phone pouch for the pool",
      "ID — clubs check, no exceptions, even at 38",
      "Cash for tips (bellhops, dayclub servers, club hosts)",
    ],
    fr: [
      "Tenues piscine + paréo (vous changerez entre piscine et déjeuner)",
      "Une robe à paillettes pour la soirée + talons réellement marchables",
      "Bottes de cowgirl ou baskets — le Strip est plus long qu'on le pense",
      "Écharpe mariée + écharpes custom pour la team (Etsy en amont)",
      "Crème solaire SPF 50 reef-safe — le soleil du Nevada tape encore à 17h",
      "Batterie externe + pochette téléphone étanche pour la piscine",
      "Pièce d'identité — les clubs vérifient, sans exception, même à 38 ans",
      "Du cash pour les pourboires (bagagistes, serveurs dayclub, hôtes club)",
    ],
  },
  bestSeason: {
    en: "March-May and September-October are the dream windows: 24-30°C, dayclubs are full but not unbearable. June-August hits 40°C+ — the pools are essential and the asphalt becomes a hazard. November-February is mild (15°C days, cold nights) and dayclubs close — go only if your group is club-focused, not pool-focused.",
    fr: "Mars-mai et septembre-octobre sont les meilleures fenêtres : 24-30°C, dayclubs pleins mais supportables. Juin-août monte à 40°C+ — les piscines deviennent indispensables et l'asphalte un danger. Novembre-février c'est doux (15°C en journée, frais le soir) et les dayclubs ferment — à viser seulement si votre groupe est club, pas pool.",
  },
  related: ["nashville-bachelorette", "marrakech-bachelorette", "budapest-bachelorette"],
};

// ---------------------------------------------------------------------------
// 7. Andalusia — Road trip with friends — 7 days
// ---------------------------------------------------------------------------
const andalusia: Destination = {
  slug: { en: "andalusia-road-trip", fr: "andalousie-road-trip" },
  useCase: "road-trip",
  days: 7,
  city: { en: "Andalusia", fr: "Andalousie" },
  country: { en: "Spain", fr: "Espagne" },
  hero: {
    // TODO: replace image — search Unsplash for "alhambra granada sunset"
    image:
      "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1600&q=80",
    imageAlt: {
      en: "The Alhambra palace at sunset overlooking Granada and the Sierra Nevada mountains",
      fr: "Le palais de l'Alhambra au coucher de soleil dominant Grenade et la Sierra Nevada",
    },
    tag: {
      en: "Road trip · 7 days · 4-6 friends",
      fr: "Road trip · 7 jours · 4-6 amis",
    },
  },
  meta: {
    title: {
      en: "Andalusia Road Trip — 7-Day Itinerary: Seville, Granada, Ronda & Coast",
      fr: "Road Trip en Andalousie — Itinéraire 7 jours : Séville, Grenade, Ronda, côte",
    },
    description: {
      en: "A 7-day Andalusia road trip with friends: Seville, Córdoba, Granada (with Alhambra booking advice), Ronda, Tarifa coast. Real driving times, tapas spots, budget.",
      fr: "Road trip 7 jours en Andalousie entre amis : Séville, Cordoue, Grenade (avec conseil résa Alhambra), Ronda, Tarifa. Temps de trajet réels, bonnes tables et budget.",
    },
  },
  intro: {
    en: [
      "An Andalusia road trip is the rare European loop that delivers on every cliché it advertises. You drink Cruzcampo on a Seville rooftop, you get lost in Córdoba's Mezquita and don't want to come out, you stand inside the Alhambra and understand why people cried writing about it 800 years ago, and you finish on a Tarifa cliff with Africa visible across the strait. Seven days, one rental car, and a country that pours wine until 1am.",
      "The standard loop is Seville → Córdoba → Granada → Ronda → coastal stop (Tarifa or Cádiz) → back to Seville. It's roughly 900 km of driving spread across the week, never more than 2.5 hours behind the wheel on any single day, with motorways that are good, free, and empty compared to France or Italy. Most days you'll pick up the car at lunch, drive an hour or two, check into the next hotel by 4pm.",
      "Two things to get right before you leave. First, the Alhambra: book Nasrid Palaces tickets the moment dates are set — they release 90 days out and they DO sell out, especially the morning slots between April and October. No ticket, no Alhambra, no exceptions. Second, season: April to June and September to early October are the only sane windows. August in Seville hits 45°C and the city visibly closes. May is the sweet spot — Feria de Abril in Seville, jacarandas in bloom, beach water just warm enough.",
    ],
    fr: [
      "Un road trip en Andalousie, c'est la rare boucle européenne qui tient toutes les promesses qu'elle écrit en gras. Vous buvez une Cruzcampo sur un rooftop sévillan, vous vous perdez dans la Mezquita de Cordoue sans vouloir en ressortir, vous pénétrez dans l'Alhambra et vous comprenez pourquoi on en pleurait dans des textes vieux de 800 ans, vous terminez sur une falaise de Tarifa avec l'Afrique visible en face. Sept jours, une voiture de location, un pays qui sert du vin jusqu'à 1h du matin.",
      "Le tracé standard : Séville → Cordoue → Grenade → Ronda → étape côtière (Tarifa ou Cadix) → retour à Séville. Environ 900 km étalés sur la semaine, jamais plus de 2h30 de route sur une seule journée, avec des autoroutes en bon état, gratuites, et vides comparé à la France ou l'Italie. Vous prenez la voiture après le déjeuner, vous roulez une à deux heures, vous arrivez à l'hôtel suivant vers 16h.",
      "Deux choses à anticiper. Un : l'Alhambra. Réservez les Palais Nasrides DÈS que les dates sont fixées — la billetterie ouvre 90 jours avant et les créneaux du matin partent vite entre avril et octobre. Pas de billet, pas d'Alhambra, sans exception. Deux : la saison. Avril-juin et septembre à début octobre sont les seules fenêtres raisonnables. En août, Séville monte à 45°C et la ville ferme à vue d'œil. Mai est le sweet spot — Feria de Abril, jacarandas en fleurs, mer juste assez tiède.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: { en: "Arrival in Seville", fr: "Arrivée à Séville" },
      morning: {
        en: "Land at Seville SVQ (direct from most European hubs) or Málaga AGP (cheaper, 2h drive). Pick up the rental car ONLY if landing at Málaga — in Seville, do not collect the car until Day 3. Drop bags in Santa Cruz or Triana; both are walkable to everything.",
        fr: "Atterrissage à Séville SVQ (direct depuis la plupart des hubs européens) ou Málaga AGP (moins cher, 2h de route). Prenez la voiture de location SEULEMENT si vous arrivez à Málaga — à Séville, ne prenez pas la voiture avant le jour 3. Dépôt des bagages à Santa Cruz ou Triana ; les deux sont à pied de tout.",
      },
      afternoon: {
        en: "Slow afternoon. Plaza de España (free, ridiculous, the Star Wars filming location), then through the Jardines de Murillo into the Santa Cruz quarter — get lost in the narrow streets. Late-afternoon snack at Bodega Santa Cruz (Las Columnas) — order a montadito and a Cruzcampo, eat standing up.",
        fr: "Après-midi tranquille. Plaza de España (gratuit, démentiel, lieu de tournage Star Wars), puis traversée des Jardines de Murillo jusqu'au quartier Santa Cruz — perdez-vous dans les ruelles. Goûter à la Bodega Santa Cruz (Las Columnas) — commandez un montadito et une Cruzcampo, mangez debout.",
      },
      evening: {
        en: "Sunset on the rooftop of Hotel EME (across from the Cathedral) or the cheaper Setas de Sevilla viewpoint. Late dinner — Spain eats at 10pm — at Bodeguita Romero or Casa Morales for old-school tapas. One flamenco show as a primer at La Carbonería (free entry, drinks expected) — the deep stuff comes later in Granada.",
        fr: "Coucher de soleil sur le rooftop de l'hôtel EME (en face de la Cathédrale) ou au belvédère plus accessible des Setas de Sevilla. Dîner tardif — on mange à 22h en Espagne — à la Bodeguita Romero ou Casa Morales pour des tapas à l'ancienne. Première initiation flamenco à La Carbonería (entrée gratuite, boisson attendue) — le vrai flamenco viendra à Grenade.",
      },
    },
    {
      day: 2,
      title: { en: "Seville — Alcázar, Cathedral, Triana night", fr: "Séville — Alcázar, Cathédrale, soirée à Triana" },
      morning: {
        en: "Pre-booked Real Alcázar entry at 9:30am (essential — walk-up is 90+ min queue in May). Allow 2 hours. The Game of Thrones water gardens are the highlight; the Mudéjar palace ceilings are the surprise.",
        fr: "Entrée au Real Alcázar réservée pour 9h30 (impératif — file sans résa à 1h30+ en mai). Comptez 2h. Les jardins d'eau (Game of Thrones) sont le clou, mais les plafonds mudéjars du palais sont la vraie surprise.",
      },
      afternoon: {
        en: "Seville Cathedral and the Giralda climb (combined ticket online). Lunch in the shade at Bar Alfalfa or El Rinconcillo (1670 — Spain's oldest tapas bar, allegedly). Then cross the Puente de Isabel II into Triana — the gypsy quarter, ceramics tiles, riverside bars.",
        fr: "Cathédrale de Séville et montée à la Giralda (billet combiné en ligne). Déjeuner à l'ombre au Bar Alfalfa ou El Rinconcillo (1670 — le plus vieux bar à tapas d'Espagne, en théorie). Puis traversée du Puente de Isabel II direction Triana — quartier gitan, azulejos, bars en bord de fleuve.",
      },
      evening: {
        en: "Triana tapas crawl: start at Casa Cuesta, move to Las Golondrinas, finish at Bar Las Columnas back across the river. Drinks on the Triana riverbank watching the Torre del Oro light up. Bed by 1am — tomorrow is the drive to Córdoba.",
        fr: "Tournée tapas à Triana : démarrez chez Casa Cuesta, enchaînez Las Golondrinas, finissez au Bar Las Columnas de l'autre côté. Verres sur la rive de Triana en regardant la Torre del Oro s'illuminer. Dodo vers 1h — demain c'est la route pour Cordoue.",
      },
    },
    {
      day: 3,
      title: {
        en: "Pick up car, drive to Córdoba (140 km, 1h30)",
        fr: "Récupération de la voiture, route pour Cordoue (140 km, 1h30)",
      },
      morning: {
        en: "Quick Seville morning — coffee and a tostada at Bar Eslava. Pick up the rental car from a city-centre location (Plaza de Armas works well). Drive the A-4 motorway northeast — flat olive groves the whole way, easy 1h30 drive at 120 km/h.",
        fr: "Petite matinée Séville — café et tostada au Bar Eslava. Récupération de la voiture en centre-ville (Plaza de Armas marche bien). Direction nord-est par l'A-4 — oliveraies plates tout du long, 1h30 tranquille à 120 km/h.",
      },
      afternoon: {
        en: "Arrive Córdoba lunchtime. Mezquita-Catedral immediately (the queue calms down after 2pm). Pre-book the timed ticket online for 3pm — give yourself 90 min inside. The 856 columns and red-and-white arches are the trip's first 'I wasn't ready' moment.",
        fr: "Arrivée à Cordoue à l'heure du déjeuner. Mezquita-Catedral direct (la file se calme après 14h). Réservez l'horaire en ligne pour 15h — comptez 1h30 à l'intérieur. Les 856 colonnes et les arcs rouge et blanc sont le premier moment « j'étais pas prêt » du voyage.",
      },
      evening: {
        en: "Walk the Judería (Jewish quarter) — Calle de las Flores for the photo, Sinagoga for context. Dinner at Bodegas Mezquita (do the tasting menu — flamenquín, salmorejo, oxtail stew) or Casa Pepe de la Judería. Stay one night in Córdoba (the city empties at night — magical).",
        fr: "Balade dans la Judería — la Calle de las Flores pour la photo, la Sinagoga pour le contexte. Dîner aux Bodegas Mezquita (menu dégustation — flamenquín, salmorejo, ragoût de queue de bœuf) ou à la Casa Pepe de la Judería. Une nuit à Cordoue (la ville se vide le soir — magique).",
      },
    },
    {
      day: 4,
      title: { en: "Drive to Granada (200 km, 2h15) — first Alhambra view", fr: "Route pour Grenade (200 km, 2h15) — première vue Alhambra" },
      morning: {
        en: "Slow morning. Salmorejo and a coffee at La Bicicleta. Pick up the car, A-45/A-92 motorway southeast toward Granada — the landscape shifts from olive flats to Sierra Nevada in your windscreen. 2h15 drive, easy.",
        fr: "Matinée tranquille. Salmorejo et café à La Bicicleta. Récupération de la voiture, A-45/A-92 direction sud-est vers Grenade — le paysage passe des oliveraies plates à la Sierra Nevada dans le pare-brise. 2h15 de route, facile.",
      },
      afternoon: {
        en: "Park at the hotel and DO NOT use the car again until Day 6 — Granada's centre is a labyrinth of pedestrian streets. Walk up to the Albaicín quarter, the old Moorish town. Late lunch at Bar Aliatar — order the free tapa that comes with every drink (a real Granada thing).",
        fr: "Garez la voiture à l'hôtel et N'Y TOUCHEZ PLUS avant le jour 6 — le centre de Grenade est un labyrinthe piéton. Montée à l'Albaicín, la vieille ville mauresque. Déjeuner tardif au Bar Aliatar — commandez la tapa offerte avec chaque boisson (la spécialité granadine).",
      },
      evening: {
        en: "Sunset at the Mirador de San Nicolás — the postcard view of the Alhambra glowing pink across the valley with the Sierra Nevada behind. Get there 45 min early. Dinner at Bodegas Castañeda (chaotic, perfect) or El Trillo (more elegant). Late drink in the Sacromonte caves at Cueva la Rocío.",
        fr: "Coucher de soleil au Mirador de San Nicolás — la vue carte postale, Alhambra qui rosit au-dessus de la vallée avec la Sierra Nevada derrière. Arrivez 45 min avant. Dîner aux Bodegas Castañeda (chaos parfait) ou El Trillo (plus élégant). Verre tardif dans les grottes du Sacromonte chez Cueva la Rocío.",
      },
    },
    {
      day: 5,
      title: { en: "Alhambra morning, Sacromonte flamenco night", fr: "Matinée Alhambra, flamenco au Sacromonte le soir" },
      morning: {
        en: "Pre-booked Alhambra ticket — Nasrid Palaces timed slot around 9:30am (the earliest are coolest in summer and least crowded). Allow 3.5 hours: Nasrid Palaces (your slot is fixed), Generalife gardens (any time), Alcazaba ramparts (any time). Bring water — there's no shade between sections.",
        fr: "Billet Alhambra réservé en amont — créneau Palais Nasrides vers 9h30 (les plus tôt sont les plus fraîches en été et les moins blindées). Comptez 3h30 : Palais Nasrides (horaire fixe), jardins du Generalife (libre), Alcazaba (libre). Apportez de l'eau — pas d'ombre entre les sections.",
      },
      afternoon: {
        en: "Long siesta-style lunch back in town at Carmela (modernised Andalusian classics) or Los Diamantes (peak free-tapas, no reservations). 45-min nap. Optional: hammam at Hammam Al Ándalus — book the 90-min ritual, restorative after the Alhambra walk.",
        fr: "Long déjeuner sieste en ville chez Carmela (classiques andalous modernisés) ou Los Diamantes (tapas offertes au top, pas de résa). 45 min de sieste. Option : hammam à Hammam Al Ándalus — réservez le rituel de 90 min, parfaite récup après l'Alhambra.",
      },
      evening: {
        en: "Real flamenco — cave-zambra in the Sacromonte. Cuevas Los Tarantos or Venta El Gallo are the legit ones; book ahead. Late dinner after the show at Restaurante FM (Granada's best new wave) or back to Bodegas Castañeda for one more round. Bed late.",
        fr: "Vrai flamenco — zambra-grotte au Sacromonte. Cuevas Los Tarantos ou Venta El Gallo sont les vrais, réservez. Dîner après le show au Restaurante FM (la nouvelle vague granadine) ou retour à Bodegas Castañeda pour un dernier verre. Couchée tard.",
      },
    },
    {
      day: 6,
      title: { en: "Drive to Ronda + the Pueblos Blancos (190 km, 2h45)", fr: "Route pour Ronda + Pueblos Blancos (190 km, 2h45)" },
      morning: {
        en: "Pick up the car. Drive west across the Sierra de Loja — the most scenic stretch of the week. Stop in Antequera for an early lunch (Plaza del Coso Viejo) or push through to Ronda. Roads narrow after Antequera — keep speed at 80 km/h on the mountain section.",
        fr: "Récupération de la voiture. Direction ouest à travers la Sierra de Loja — le tronçon le plus panoramique de la semaine. Arrêt à Antequera pour un déjeuner précoce (Plaza del Coso Viejo) ou direct sur Ronda. Les routes se rétrécissent après Antequera — restez à 80 km/h sur la section montagne.",
      },
      afternoon: {
        en: "Arrive Ronda mid-afternoon. The Puente Nuevo bridge over the Tajo gorge is the photo you've seen a hundred times — and it still hits. Walk both sides, take the cliff path down for the underneath view. Plaza de Toros (Spain's oldest bullring) is a 30-min visit.",
        fr: "Arrivée à Ronda en milieu d'après-midi. Le Puente Nuevo au-dessus de la gorge du Tajo, c'est la photo qu'on a vue 100 fois — et ça frappe quand même. Faites les deux rives, descendez par le sentier de falaise pour la vue de dessous. La Plaza de Toros (plus ancienne arène d'Espagne) se visite en 30 min.",
      },
      evening: {
        en: "Sunset drinks at Bar Maestro on the cliff edge — get there 6:30pm. Dinner at Bardal (Michelin two-star splurge, book a month ahead) or Tropicana for a casual Ronda classic. Sleep in Ronda — the village empties of day-trippers after 7pm and the silence is unreal.",
        fr: "Verres au coucher de soleil au Bar Maestro sur la falaise — arrivez à 18h30. Dîner chez Bardal (deux étoiles Michelin, splurge, réservez un mois avant) ou Tropicana pour un classique de Ronda. Dodo à Ronda — le village se vide des excursionnistes après 19h et le silence est dingue.",
      },
    },
    {
      day: 7,
      title: { en: "Tarifa coast finale, return car, fly home (210 km, 2h15)", fr: "Final côtier à Tarifa, retour voiture, vol (210 km, 2h15)" },
      morning: {
        en: "Drive south through the Pueblos Blancos — Zahara de la Sierra and Grazalema make a 90-min worthy detour. Then drop south to Tarifa, the windsurfing town at the southernmost point of continental Europe, looking straight at Morocco across the strait.",
        fr: "Route vers le sud à travers les Pueblos Blancos — Zahara de la Sierra et Grazalema valent un détour de 90 min. Puis descente vers Tarifa, la ville windsurf au point le plus austral de l'Europe continentale, face au Maroc de l'autre côté du détroit.",
      },
      afternoon: {
        en: "Long lunch at Chiringuito El Tesoro or Tumbao on the Valdevaqueros beach — fresh fish, feet in the sand, 30 EUR a head with wine. The Atlantic side has the wind and the surfers; the Mediterranean side (Playa Chica) is calmer for one last swim.",
        fr: "Long déjeuner au Chiringuito El Tesoro ou au Tumbao sur la plage de Valdevaqueros — poisson frais, pieds dans le sable, 30 € la tête avec vin. Le côté Atlantique a le vent et les surfeurs ; le côté Méditerranée (Playa Chica) est plus calme pour une dernière baignade.",
      },
      evening: {
        en: "Return the car at Málaga airport (1h30 drive east — the easiest return, plenty of car-rental desks). Light dinner at the airport or in Tarifa before leaving. Sunday-night flights typically leave Málaga 8-10pm — give yourself a 2h buffer.",
        fr: "Retour de la voiture à l'aéroport de Málaga (1h30 vers l'est — le rendu le plus simple, beaucoup de comptoirs). Dîner léger à l'aéroport ou à Tarifa avant de partir. Les vols dominicaux quittent généralement Málaga entre 20h et 22h — prévoyez 2h de marge.",
      },
    },
  ],
  pois: [
    {
      name: "Real Alcázar (Seville)",
      type: "landmark",
      description: {
        en: "The royal palace where the Catholic kings hosted Columbus. Mudéjar tilework, Game of Thrones water gardens. Pre-book online — walk-up queue is 90+ min in season.",
        fr: "Le palais royal où les rois catholiques recevaient Colomb. Azulejos mudéjars, jardins d'eau Game of Thrones. Résa en ligne — file sans résa à 1h30+ en saison.",
      },
      mapsUrl: "https://maps.google.com/?q=Real+Alcazar+Sevilla",
    },
    {
      name: "Mezquita-Catedral (Córdoba)",
      type: "landmark",
      description: {
        en: "A 10th-century mosque with a 16th-century cathedral built INSIDE it. 856 columns, red-and-white double arches. One of the most surreal buildings in Europe. Pre-book a 3pm slot to dodge the morning crowds.",
        fr: "Une mosquée du Xe siècle avec une cathédrale du XVIe construite À L'INTÉRIEUR. 856 colonnes, doubles arcs rouge et blanc. Un des bâtiments les plus surréalistes d'Europe. Réservez un créneau 15h pour éviter la foule du matin.",
      },
      mapsUrl: "https://maps.google.com/?q=Mezquita+Catedral+Cordoba",
    },
    {
      name: "Alhambra (Granada)",
      type: "landmark",
      description: {
        en: "The 13th-century Nasrid palace complex. BOOK 60-90 DAYS AHEAD — the Nasrid Palaces sell out and there is no walk-up. Allow 3.5 hours on site. The Generalife gardens and the Alcazaba are included.",
        fr: "Le complexe palatial nasride du XIIIe siècle. RÉSERVEZ 60-90 JOURS AVANT — les Palais Nasrides sont saturés, aucune entrée spontanée. Comptez 3h30 sur place. Jardins du Generalife et Alcazaba inclus.",
      },
      mapsUrl: "https://maps.google.com/?q=Alhambra+Granada",
    },
    {
      name: "Mirador de San Nicolás (Granada)",
      type: "landmark",
      description: {
        en: "The Albaicín viewpoint with the most-photographed Alhambra panorama in the world. Free, packed at sunset — arrive 45 min early. Buskers play, it actually works.",
        fr: "Le belvédère de l'Albaicín avec la vue Alhambra la plus photographiée au monde. Gratuit, blindé au coucher de soleil — arrivez 45 min avant. Musiciens de rue, ça fonctionne.",
      },
      mapsUrl: "https://maps.google.com/?q=Mirador+San+Nicolas+Granada",
    },
    {
      name: "Plaza de Toros (Ronda)",
      type: "landmark",
      description: {
        en: "Spain's oldest still-active bullring (1785), a perfect circle of white stone. 30-min visit including the small bullfighting museum. The architecture matters even if you skip the ethics of the sport.",
        fr: "La plus ancienne arène encore en activité d'Espagne (1785), un cercle parfait en pierre blanche. Visite de 30 min avec le petit musée tauromachique. L'architecture vaut le coup même si vous passez sur l'éthique.",
      },
      mapsUrl: "https://maps.google.com/?q=Plaza+de+Toros+Ronda",
    },
    {
      name: "Sacromonte (Granada)",
      type: "neighborhood",
      description: {
        en: "Granada's gypsy quarter, built into the hillside opposite the Alhambra. Whitewashed cave houses, real flamenco zambras at Los Tarantos or Venta El Gallo — book ahead.",
        fr: "Le quartier gitan de Grenade, creusé dans la colline en face de l'Alhambra. Maisons-grottes blanchies, vrais flamencos zambras chez Los Tarantos ou Venta El Gallo — réservez en amont.",
      },
      mapsUrl: "https://maps.google.com/?q=Sacromonte+Granada",
    },
    {
      name: "Pueblos Blancos (Zahara, Grazalema)",
      type: "neighborhood",
      description: {
        en: "Chain of whitewashed mountain villages between Ronda and the coast. Zahara de la Sierra has the photogenic reservoir; Grazalema is the food stop. 30-60 min each, drive through with two stops.",
        fr: "Chapelet de villages blancs en montagne entre Ronda et la côte. Zahara de la Sierra a le lac photogénique ; Grazalema est l'étape gastronomique. 30-60 min chacun, à enchaîner en voiture.",
      },
      mapsUrl: "https://maps.google.com/?q=Pueblos+Blancos+Andalusia",
    },
    {
      name: "Bodegas Castañeda (Granada)",
      type: "restaurant",
      description: {
        en: "Granada's most loved old-school tapas bar. Free tapa with every drink, hams hanging from the ceiling, no reservations — turn up, fight for a spot at the bar, eat well.",
        fr: "Le bar à tapas à l'ancienne le plus aimé de Grenade. Tapa offerte avec chaque verre, jambons suspendus au plafond, pas de résa — débarquez, jouez des coudes au comptoir, mangez bien.",
      },
      mapsUrl: "https://maps.google.com/?q=Bodegas+Castaneda+Granada",
    },
    {
      name: "Tarifa & Valdevaqueros beach",
      type: "neighborhood",
      description: {
        en: "Europe's southernmost town, looking across the Strait of Gibraltar at Morocco. Wind-whipped Atlantic beaches, chiringuitos serving fresh fish, surfer-relaxed vibe. The perfect finale.",
        fr: "La ville la plus au sud d'Europe, face au Maroc de l'autre côté du détroit de Gibraltar. Plages atlantiques ventées, chiringuitos au poisson frais, ambiance surf détendue. Le final parfait.",
      },
      mapsUrl: "https://maps.google.com/?q=Tarifa+Valdevaqueros+beach",
    },
  ],
  budget: {
    perPerson: { low: 580, high: 880, currency: "EUR" },
    breakdown: [
      {
        category: { en: "Accommodation (6 nights, mix of hotels + apartments)", fr: "Hébergement (6 nuits, mix hôtels + apparts)" },
        amount: 240,
      },
      { category: { en: "Rental car + fuel + tolls (split 4-6 ppl)", fr: "Voiture de location + carburant + péages (partagés 4-6 pers.)" }, amount: 90 },
      { category: { en: "Food & tapas crawls", fr: "Repas & tournées tapas" }, amount: 180 },
      { category: { en: "Alhambra + Alcázar + Mezquita tickets", fr: "Billets Alhambra + Alcázar + Mezquita" }, amount: 55 },
      { category: { en: "Flamenco show + hammam", fr: "Show flamenco + hammam" }, amount: 70 },
      { category: { en: "Wine, sherry, beach lunches", fr: "Vin, xérès, déjeuners de plage" }, amount: 50 },
    ],
    note: {
      en: "Flights not included. Andalusia is the cheapest serious road trip in Western Europe — a full sit-down lunch with wine is 15-20 EUR a head outside Seville centre. Biggest swing: the Bardal Michelin dinner in Ronda pushes the high end alone.",
      fr: "Vols non inclus. L'Andalousie est le road trip sérieux le moins cher d'Europe de l'Ouest — un déjeuner complet avec vin coûte 15-20 € par tête hors centre de Séville. Le plus gros écart : le dîner Bardal étoilé Michelin à Ronda fait grimper le haut de fourchette à lui seul.",
    },
  },
  packing: {
    en: [
      "Light layers — Andalusian shade is cool, sun is brutal",
      "Comfortable walking shoes (Granada's Albaicín is steep cobblestone)",
      "One smart-casual outfit (the flamenco show + Ronda dinner)",
      "Swimwear + sandals for the Tarifa finale",
      "Sun hat + SPF 50 (May-October especially)",
      "Reusable water bottle (free fountains in every plaza)",
      "Cash for small village bars (cards spotty in Pueblos Blancos)",
      "International driving permit (mandatory for non-EU drivers)",
    ],
    fr: [
      "Couches légères — l'ombre andalouse est fraîche, le soleil est brutal",
      "Chaussures de marche confortables (l'Albaicín de Grenade c'est du pavé en pente)",
      "Une tenue smart-casual (flamenco + dîner à Ronda)",
      "Maillot + sandales pour le final Tarifa",
      "Chapeau + SPF 50 (mai-octobre surtout)",
      "Gourde réutilisable (fontaines gratuites sur chaque plaza)",
      "Du cash pour les bars de village (CB aléatoire dans les Pueblos Blancos)",
      "Permis international (obligatoire pour conducteurs hors UE)",
    ],
  },
  bestSeason: {
    en: "April-June and mid-September to mid-October are the only sane windows. May is the absolute sweet spot — 22-28°C, jacarandas in bloom, beach water just warm enough. AVOID July-August: Seville and Córdoba hit 45°C and the cities visibly close. November-March is mild (15°C) but rainy and most beach chiringuitos shut.",
    fr: "Avril-juin et mi-septembre à mi-octobre sont les seules fenêtres raisonnables. Mai est le sweet spot absolu — 22-28°C, jacarandas en fleurs, mer juste assez tiède. ÉVITEZ juillet-août : Séville et Cordoue montent à 45°C et les villes ferment à vue d'œil. Novembre-mars c'est doux (15°C) mais pluvieux et la plupart des chiringuitos sont fermés.",
  },
  related: ["tuscany-road-trip", "lisbon-with-friends", "marrakech-bachelorette"],
};

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export const destinations: Destination[] = [
  budapest,
  marrakech,
  nashville,
  tuscany,
  lisbon,
  lasVegas,
  andalusia,
];

/**
 * Find a destination by its slug in any locale.
 */
export function findDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find(
    (d) => d.slug.en === slug || d.slug.fr === slug
  );
}

/**
 * Find a destination by its slug, scoped to a specific locale (slug must match
 * that locale's version exactly).
 */
export function findDestinationByLocalizedSlug(
  slug: string,
  locale: Locale
): Destination | undefined {
  return destinations.find((d) => d.slug[locale] === slug);
}

/**
 * All (locale, slug) pairs — for generateStaticParams.
 */
export function allDestinationParams(): Array<{ locale: Locale; slug: string }> {
  const params: Array<{ locale: Locale; slug: string }> = [];
  for (const d of destinations) {
    params.push({ locale: "en", slug: d.slug.en });
    params.push({ locale: "fr", slug: d.slug.fr });
  }
  return params;
}

/**
 * Return localized labels for each use case (used on the index and cards).
 */
export function getUseCaseLabel(useCase: DestinationUseCase, locale: Locale): string {
  const labels: Record<DestinationUseCase, LocalizedString> = {
    bachelorette: { en: "Bachelorette", fr: "EVJF" },
    "road-trip": { en: "Road trip", fr: "Road trip" },
    "with-friends": { en: "With friends", fr: "Entre amis" },
  };
  return labels[useCase][locale];
}

/**
 * Localized label for a POI type.
 */
export function poiTypeLabel(type: DestinationPoi["type"], locale: Locale): string {
  const labels: Record<DestinationPoi["type"], LocalizedString> = {
    restaurant: { en: "Restaurant", fr: "Restaurant" },
    bar: { en: "Bar", fr: "Bar" },
    club: { en: "Club & dayclub", fr: "Club & dayclub" },
    activity: { en: "Activity", fr: "Activité" },
    landmark: { en: "Landmark", fr: "Lieu emblématique" },
    neighborhood: { en: "Neighborhood", fr: "Quartier" },
  };
  return labels[type][locale];
}
