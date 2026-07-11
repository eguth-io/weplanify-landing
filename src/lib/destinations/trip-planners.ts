/**
 * Trip-planner destinations — SEO long-tail pages for /destinations/[slug]
 *
 * These target the "[city] trip planner" (EN) / "que faire à [ville]" (FR)
 * intent: high-volume city-break searches with tool intent that maps directly
 * to the product. Content is written natively per locale (not translated),
 * 4-day itineraries with real POIs, honest mid-range 2026 budgets (on the
 * ground, no flights). Hero images are stable Unsplash photos.
 *
 * Kept in a separate module from data.ts to avoid const-name collisions with
 * the use-case destinations (e.g. the existing `lisbon` with-friends entry).
 */

import type { Destination } from "./data";

const paris: Destination = {
  slug: { en: "paris-trip-planner", fr: "paris-que-faire" },
  useCase: "trip-planner",
  days: 4,
  city: { en: "Paris", fr: "Paris" },
  country: { en: "France", fr: "France" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&q=80",
    imageAlt: {
      en: "The Eiffel Tower glowing at dusk above the Seine and Haussmann rooftops",
      fr: "La tour Eiffel illuminée au crépuscule au-dessus de la Seine et des toits haussmanniens",
    },
    tag: {
      en: "Trip planner · 4-day city break",
      fr: "Que faire · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Paris Trip Planner: 4-Day Itinerary & Budget",
      fr: "Que faire à Paris : itinéraire & budget de 4 jours",
    },
    description: {
      en: "An honest 4-day Paris itinerary with neighbourhoods, food, real budget and packing tips. Copy the whole trip into a free planner and make it yours.",
      fr: "Un itinéraire de 4 jours à Paris : quartiers, bonnes tables, budget réel et valise. Copie le trip entier dans un planificateur gratuit et adapte-le.",
    },
  },
  intro: {
    en: [
      "Paris rewards people who slow down. Four days is the sweet spot: enough to tick off the Louvre and the Eiffel Tower without rushing, and still have a full day to wander a neighbourhood with no agenda and a coffee going cold in your hand. Try to do it in two and you'll spend the trip in queues; stretch it to a week and you'll want a local's routine, which is a different holiday entirely.",
      "This itinerary is built around walkable clusters rather than a scattered wishlist. Each day anchors on one part of the city, so you're not crossing the whole map twice a day. The métro is there for the long hops, but Paris is genuinely a walking city, and half the good stuff happens between the landmarks.",
      "We've paced it for real humans: big-hitters in the morning when the light and the crowds are kindest, long lunches, and evenings left loose for the Marais, a canal-side apéro, or whatever the day turns into. Treat it as a spine, not a script.",
    ],
    fr: [
      "Paris se mérite quand tu ralentis. Quatre jours, c'est le bon tempo : assez pour cocher le Louvre et la tour Eiffel sans courir, et garder une journée entière à flâner dans un quartier sans programme, un café qui refroidit à la main. Essaie de tout faire en deux jours et tu passeras ton séjour dans les files ; étale sur une semaine et il te faudra une routine de Parisien, ce qui est un tout autre voyage.",
      "Cet itinéraire s'organise en zones qui se font à pied, pas en liste de courses éparpillée. Chaque journée tient sur un coin de la ville, histoire de ne pas traverser deux fois la carte dans la même journée. Le métro reste là pour les grands sauts, mais Paris se vit vraiment à pied, et la moitié des bons moments se passent entre les monuments.",
      "On a calé le rythme pour de vrais humains : les incontournables le matin quand la lumière et les files sont clémentes, des déjeuners qui traînent, et des soirées laissées libres pour le Marais, un apéro au bord du canal, ou ce que la journée décide. Prends-le comme une colonne vertébrale, pas comme un script.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Islands, Left Bank & the classic Paris",
        fr: "Les îles, la Rive gauche et le Paris carte postale",
      },
      morning: {
        en: "Start on the Île de la Cité with Sainte-Chapelle's stained glass before the tour groups land, then cross to the Île Saint-Louis for a Berthillon ice cream and the quietest streets in central Paris.",
        fr: "Commence sur l'Île de la Cité avec les vitraux de la Sainte-Chapelle avant les groupes, puis passe sur l'Île Saint-Louis pour une glace Berthillon et les rues les plus calmes du centre.",
      },
      afternoon: {
        en: "Wander the Latin Quarter: the Panthéon, the Shakespeare and Company bookshop, and lunch on a terrace around Rue Mouffetard. Leave time for the Jardin du Luxembourg to sit with a coffee like everyone else.",
        fr: "Balade dans le Quartier latin : le Panthéon, la librairie Shakespeare and Company, et un déjeuner en terrasse du côté de la rue Mouffetard. Garde du temps pour le jardin du Luxembourg, à s'asseoir avec un café comme tout le monde.",
      },
      evening: {
        en: "Dinner in Saint-Germain-des-Prés, then walk the Seine at dusk toward Pont Neuf. The riverside quays fill up with picnics and buskers when the weather plays along.",
        fr: "Dîner à Saint-Germain-des-Prés, puis longe la Seine au crépuscule vers le Pont Neuf. Les quais se remplissent de pique-niques et de musiciens dès que la météo suit.",
      },
    },
    {
      day: 2,
      title: {
        en: "Louvre, gardens & the grand axis",
        fr: "Louvre, jardins et l'axe royal",
      },
      morning: {
        en: "Book the Louvre for opening and go straight for what you actually care about, not the whole thing — an hour with the Mona Lisa crowd behind you and you've earned the Tuileries next door.",
        fr: "Réserve le Louvre à l'ouverture et fonce sur ce qui te touche vraiment, pas sur tout — une heure, la foule de la Joconde derrière toi, et tu as mérité les Tuileries juste à côté.",
      },
      afternoon: {
        en: "Cross the Tuileries to Place de la Concorde, then decide: the Impressionists at the Musée d'Orsay, or the walk up the Champs-Élysées to the Arc de Triomphe. Both are good; doing both is a lot.",
        fr: "Traverse les Tuileries jusqu'à la place de la Concorde, puis choisis : les impressionnistes au musée d'Orsay, ou la montée des Champs-Élysées jusqu'à l'Arc de Triomphe. Les deux sont bien ; les deux à la suite, c'est beaucoup.",
      },
      evening: {
        en: "End at the Eiffel Tower for the hourly sparkle — from the Trocadéro terrace for the postcard shot, or up top if you booked ahead. A bistro dinner in the 7th closes it out.",
        fr: "Termine à la tour Eiffel pour le scintillement de chaque heure — depuis le parvis du Trocadéro pour la photo carte postale, ou au sommet si tu as réservé. Un dîner de bistrot dans le 7e pour finir.",
      },
    },
    {
      day: 3,
      title: {
        en: "Montmartre & the northern hills",
        fr: "Montmartre et les hauteurs du nord",
      },
      morning: {
        en: "Get to the Sacré-Cœur early, before the steps fill, for the whole city laid out below. Then lose the crowd in the back streets — Rue de l'Abreuvoir, Place Dalida, the last vineyard in Paris.",
        fr: "Monte tôt au Sacré-Cœur, avant que les marches se remplissent, pour la ville entière étalée en contrebas. Puis sème la foule dans les ruelles — rue de l'Abreuvoir, place Dalida, la dernière vigne de Paris.",
      },
      afternoon: {
        en: "Drop down to South Pigalle (SoPi) for lunch and independent shops, then swing east to the Canal Saint-Martin — iron footbridges, cafés spilling onto the water, exactly the Paris that doesn't make the guidebook covers.",
        fr: "Redescends vers South Pigalle (SoPi) pour déjeuner et chiner dans les boutiques indépendantes, puis file à l'est vers le canal Saint-Martin — passerelles en fer, cafés débordant sur l'eau, le Paris qui n'est pas en couverture des guides.",
      },
      evening: {
        en: "Apéro along the canal with a bottle and a baguette like the locals, then dinner in the 10th or 11th — République and Oberkampf are where the city goes out on a normal night.",
        fr: "Apéro au bord du canal avec une bouteille et une baguette comme les habitants, puis dîner dans le 10e ou le 11e — République et Oberkampf, c'est là que la ville sort un soir ordinaire.",
      },
    },
    {
      day: 4,
      title: {
        en: "Le Marais, markets & your Paris",
        fr: "Le Marais, les marchés et ton Paris",
      },
      morning: {
        en: "Slow morning in the Marais: Place des Vosges, the Musée Picasso if you're in the mood, and the best falafel queue in the city on Rue des Rosiers. This is the neighbourhood to just drift through.",
        fr: "Matinée tranquille dans le Marais : place des Vosges, le musée Picasso si l'envie est là, et la meilleure file à falafels de la ville rue des Rosiers. Le quartier parfait pour se laisser porter.",
      },
      afternoon: {
        en: "Pick your own ending: browse the Marché des Enfants Rouges, climb the Centre Pompidou for the view, or cross to the Bastille and its Sunday market. This is the day to book nothing and follow your feet.",
        fr: "Choisis ta fin : le marché des Enfants Rouges, le Centre Pompidou pour la vue, ou un saut vers la Bastille et son marché du dimanche. La journée où tu ne réserves rien et suis tes pieds.",
      },
      evening: {
        en: "A last wine bar in the Marais or a rooftop for the skyline, then a slow walk back along the Seine. Four days in, you'll have your own version of Paris to leave on — which is the whole point.",
        fr: "Un dernier bar à vin dans le Marais ou un rooftop pour la skyline, puis un retour tranquille le long de la Seine. Après quatre jours, tu repars avec ta version de Paris — c'est tout l'intérêt.",
      },
    },
  ],
  pois: [
    {
      name: "Eiffel Tower",
      type: "landmark",
      description: {
        en: "The one you came for. Book a timed slot to skip the worst queues, or just watch it sparkle on the hour from the Trocadéro.",
        fr: "Celle pour laquelle tu es venu. Réserve un créneau pour éviter les pires files, ou regarde-la scintiller chaque heure depuis le Trocadéro.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Eiffel+Tower+Paris",
    },
    {
      name: "Louvre Museum",
      type: "landmark",
      description: {
        en: "The world's most-visited museum. Go early, pick a wing, and accept you can't see it all in one visit.",
        fr: "Le musée le plus visité au monde. Vas-y tôt, choisis une aile et accepte que tu ne verras pas tout en une visite.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Louvre+Museum+Paris",
    },
    {
      name: "Musee d Orsay",
      type: "landmark",
      description: {
        en: "Impressionists in a former railway station. Smaller and more digestible than the Louvre, and many people's favourite.",
        fr: "Les impressionnistes dans une ancienne gare. Plus petit et plus digeste que le Louvre, et le préféré de beaucoup.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Musee+d+Orsay+Paris",
    },
    {
      name: "Sacre-Coeur",
      type: "landmark",
      description: {
        en: "The white basilica crowning Montmartre, with the best free panorama in Paris from its steps.",
        fr: "La basilique blanche qui couronne Montmartre, avec le plus beau panorama gratuit de Paris depuis ses marches.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sacre+Coeur+Paris",
    },
    {
      name: "Le Marais",
      type: "neighborhood",
      description: {
        en: "Medieval streets, boutiques, galleries and the best falafel in town. The neighbourhood to wander without a plan.",
        fr: "Rues médiévales, boutiques, galeries et les meilleurs falafels de la ville. Le quartier à arpenter sans plan.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Le+Marais+Paris",
    },
    {
      name: "Canal Saint-Martin",
      type: "neighborhood",
      description: {
        en: "Iron footbridges, tree-lined quays and canal-side cafés. Bring a bottle at golden hour and join the locals.",
        fr: "Passerelles en fer, quais bordés d'arbres et cafés au bord de l'eau. Ramène une bouteille au coucher du soleil et rejoins les habitants.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Canal+Saint+Martin+Paris",
    },
    {
      name: "Jardin du Luxembourg",
      type: "activity",
      description: {
        en: "The city's most beloved park. Grab one of the green chairs by the fountain and do nothing, expertly.",
        fr: "Le parc le plus aimé de la ville. Prends une des chaises vertes près du bassin et ne fais rien, avec talent.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jardin+du+Luxembourg+Paris",
    },
    {
      name: "Marche des Enfants Rouges",
      type: "restaurant",
      description: {
        en: "Paris's oldest covered market, now a buzzing food court in the Marais — Moroccan, Japanese, Italian, all in one hall.",
        fr: "Le plus vieux marché couvert de Paris, devenu un food court animé dans le Marais — marocain, japonais, italien, tout sous une halle.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Marche+des+Enfants+Rouges+Paris",
    },
    {
      name: "Shakespeare and Company",
      type: "activity",
      description: {
        en: "The famous English-language bookshop facing Notre-Dame. Creaky, crammed and worth the detour.",
        fr: "La célèbre librairie anglophone face à Notre-Dame. Grinçante, bondée et qui vaut le détour.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Shakespeare+and+Company+Paris",
    },
    {
      name: "Le Comptoir du Relais",
      type: "restaurant",
      description: {
        en: "A Saint-Germain bistro institution for classic French plates. No reservations at lunch — come early or wait.",
        fr: "Une institution bistrot de Saint-Germain pour la cuisine française classique. Sans réservation au déjeuner — arrive tôt ou patiente.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Le+Comptoir+du+Relais+Paris",
    },
    {
      name: "Little Red Door",
      type: "bar",
      description: {
        en: "A regular on the world's-best-bars lists, tucked in the Marais. Inventive cocktails, book a table.",
        fr: "Un habitué des classements des meilleurs bars du monde, niché dans le Marais. Cocktails inventifs, réserve une table.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Little+Red+Door+Paris",
    },
    {
      name: "Rue Oberkampf",
      type: "bar",
      description: {
        en: "The 11th's nightlife spine — packed bars, cheap pints and where Parisians actually go out on a normal night.",
        fr: "L'artère nocturne du 11e — bars bondés, pintes pas chères, là où les Parisiens sortent vraiment un soir ordinaire.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rue+Oberkampf+Paris",
    },
  ],
  budget: {
    perPerson: { low: 480, high: 780, currency: "EUR" },
    breakdown: [
      { category: { en: "Accommodation (3 nights)", fr: "Hébergement (3 nuits)" }, amount: 300 },
      { category: { en: "Food & drink", fr: "Repas & boissons" }, amount: 200 },
      { category: { en: "Attractions & museums", fr: "Visites & musées" }, amount: 80 },
      { category: { en: "Transport (métro & passes)", fr: "Transport (métro & pass)" }, amount: 40 },
      { category: { en: "Extras & souvenirs", fr: "Extras & souvenirs" }, amount: 60 },
    ],
    note: {
      en: "Mid-range and per person, sharing a room — accommodation is the big variable, and a central studio in high season can eat the whole budget on its own.",
      fr: "Milieu de gamme et par personne, en chambre partagée — l'hébergement est la grande variable, et un studio central en haute saison peut à lui seul engloutir le budget.",
    },
  },
  packing: {
    en: [
      "Genuinely comfortable walking shoes — you'll clock 15,000+ steps a day on cobbles",
      "A compact umbrella and a light rain jacket; Paris drizzles year-round",
      "A crossbody bag that zips shut, for busy métros and tourist crowds",
      "One smart-casual outfit for nicer restaurants and wine bars",
      "A refillable water bottle for the city's Wallace fountains",
      "Layers for spring/autumn — mornings are cool, afternoons warm up",
      "A European plug adapter (Type C/E) if you're coming from abroad",
    ],
    fr: [
      "Des chaussures de marche vraiment confortables — 15 000 pas par jour sur les pavés",
      "Un parapluie compact et un coupe-vent léger ; Paris bruine toute l'année",
      "Un sac en bandoulière qui se ferme, pour les métros bondés et la foule",
      "Une tenue un peu habillée pour les bonnes tables et les bars à vin",
      "Une gourde réutilisable pour les fontaines Wallace de la ville",
      "Des couches pour le printemps/automne — matins frais, après-midis plus doux",
      "Un adaptateur de prise européen (type C/E) si tu viens de l'étranger",
    ],
  },
  bestSeason: {
    en: "Late spring (May–June) and early autumn (September–October) are the sweet spot: mild days, long light and gardens at their best. July–August is warm but half the city is on holiday and queues are brutal; winter is grey and quiet but magic around the holidays.",
    fr: "La fin du printemps (mai-juin) et le début de l'automne (septembre-octobre) sont le meilleur moment : jours doux, longue lumière et jardins au top. Juillet-août est chaud mais la moitié de la ville est en vacances et les files sont brutales ; l'hiver est gris et calme, mais magique autour des fêtes.",
  },
  related: ["barcelona-trip-planner", "rome-trip-planner", "amsterdam-trip-planner"],
};

const barcelona: Destination = {
  slug: { en: "barcelona-trip-planner", fr: "barcelone-que-faire" },
  useCase: "trip-planner",
  days: 4,
  city: { en: "Barcelona", fr: "Barcelone" },
  country: { en: "Spain", fr: "Espagne" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&q=80",
    imageAlt: {
      en: "The spires of Gaudí's Sagrada Família rising above Barcelona's rooftops at golden hour",
      fr: "Les flèches de la Sagrada Família de Gaudí au-dessus des toits de Barcelone au coucher du soleil",
    },
    tag: {
      en: "Trip planner · 4-day city break",
      fr: "Que faire · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Barcelona Trip Planner: 4-Day Itinerary & Budget",
      fr: "Que faire à Barcelone : itinéraire 4 jours & budget",
    },
    description: {
      en: "A real 4-day Barcelona itinerary — Gaudí, the Gothic Quarter, Barceloneta and where to eat — with a per-person budget and a free planner to fork.",
      fr: "Un vrai itinéraire de 4 jours à Barcelone — Gaudí, quartier gothique, Barceloneta, où manger — avec un budget par personne et un planificateur gratuit à copier.",
    },
  },
  intro: {
    en: [
      "Barcelona is the rare city that delivers on every cliché and still surprises you. In four days you can climb through Gaudí's fever-dream architecture, get pleasantly lost in the medieval Gothic Quarter, eat your body weight in tapas, and finish the afternoon with your feet in the Mediterranean. It's compact, walkable, and built for wandering.",
      "The catch: the best spots book out. Sagrada Família and Park Güell sell timed tickets weeks ahead, and turning up on the day usually means a wasted morning. A little planning is the difference between a smooth trip and queuing in 30°C heat while the group argues about lunch.",
      "This is an honest 4-day plan that balances the big hitters with the neighbourhoods locals actually hang out in — Gràcia, El Born, Poble Sec. Use it as a starting point, drag things around, and make it yours.",
    ],
    fr: [
      "Barcelone, c'est cette ville rare qui coche tous les clichés et te surprend quand même. En quatre jours, tu grimpes dans l'architecture délirante de Gaudí, tu te perds avec plaisir dans le quartier gothique médiéval, tu manges des tapas jusqu'à plus faim, et tu finis l'après-midi les pieds dans la Méditerranée. C'est compact, ça se fait à pied, c'est fait pour flâner.",
      "Le piège : les meilleurs spots se remplissent. La Sagrada Família et le Park Güell vendent des billets horodatés des semaines à l'avance, et débarquer sans réserver, c'est souvent une matinée perdue. Un peu d'organisation, c'est la différence entre un séjour fluide et une file d'attente sous 30°C pendant que le groupe se dispute sur le déjeuner.",
      "Voici un vrai plan de 4 jours qui équilibre les incontournables et les quartiers où les locaux traînent vraiment — Gràcia, El Born, Poble Sec. Prends-le comme point de départ, déplace les choses, et fais-en ton itinéraire.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Gothic heart & the old city",
        fr: "Cœur gothique & vieille ville",
      },
      morning: {
        en: "Ease in with a slow wander through the Barri Gòtic — Plaça Reial, the cathedral, and the narrow lanes off Carrer del Bisbe. Grab a coffee and pastry standing at a bar counter like a local.",
        fr: "Démarre en douceur avec une balade dans le Barri Gòtic — la Plaça Reial, la cathédrale et les ruelles étroites autour du Carrer del Bisbe. Prends un café et une pâtisserie debout au comptoir, comme un local.",
      },
      afternoon: {
        en: "Walk down La Rambla to reach La Boqueria market for lunch — fresh juice, jamón, a plate at one of the counter bars at the back where it's cheaper. Then stroll to the waterfront at Port Vell.",
        fr: "Descends La Rambla jusqu'au marché de La Boqueria pour déjeuner — jus frais, jamón, une assiette dans un des bars du fond, moins chers. Puis rejoins le front de mer au Port Vell.",
      },
      evening: {
        en: "Cross into El Born for dinner — this is tapas territory. Aperitif at a wine bar, then bar-hop around Passeig del Born. Finish with a nightcap in a candlelit courtyard bar.",
        fr: "Passe dans El Born pour dîner — c'est le royaume des tapas. Apéro dans un bar à vin, puis tournée des bars autour du Passeig del Born. Termine par un dernier verre dans une cour éclairée à la bougie.",
      },
    },
    {
      day: 2,
      title: {
        en: "Gaudí day: Sagrada Família & Park Güell",
        fr: "Journée Gaudí : Sagrada Família & Park Güell",
      },
      morning: {
        en: "Book the earliest Sagrada Família slot you can. Go inside — the stained-glass light is the whole point, not just the façade. Pay the extra for a tower if you want the view.",
        fr: "Réserve le créneau le plus tôt possible à la Sagrada Família. Entre à l'intérieur — c'est la lumière des vitraux qui compte, pas seulement la façade. Paie le supplément tour si tu veux la vue.",
      },
      afternoon: {
        en: "Head up to Park Güell (timed ticket required for the Monumental Zone). The mosaic terrace and city panorama are worth the climb. Take a cab back down if legs are tired.",
        fr: "Monte au Park Güell (billet horodaté obligatoire pour la zone monumentale). La terrasse en mosaïque et le panorama sur la ville valent la grimpette. Redescends en taxi si les jambes fatiguent.",
      },
      evening: {
        en: "Dinner in Gràcia — the old village-turned-neighbourhood full of leafy plazas. Eat outdoors on Plaça del Sol, then drift between the low-key bars the area is loved for.",
        fr: "Dîner à Gràcia — l'ancien village devenu quartier, plein de placettes ombragées. Mange en terrasse sur la Plaça del Sol, puis navigue entre les bars tranquilles qui font la réputation du coin.",
      },
    },
    {
      day: 3,
      title: {
        en: "Montjuïc, views & the beach",
        fr: "Montjuïc, panoramas & la plage",
      },
      morning: {
        en: "Take the cable car or funicular up Montjuïc. Explore the castle ramparts, the gardens, and the sweeping views over the port. Culture fans can swap in the Joan Miró Foundation.",
        fr: "Prends le téléphérique ou le funiculaire jusqu'à Montjuïc. Explore les remparts du château, les jardins et la vue plongeante sur le port. Les amateurs d'art peuvent troquer ça contre la Fondation Joan Miró.",
      },
      afternoon: {
        en: "Down to Barceloneta for beach time — swim, nap, or just people-watch on the sand. Late lunch of paella or grilled fish at a beachfront chiringuito.",
        fr: "Descends à la Barceloneta pour la plage — baignade, sieste, ou juste observer les gens sur le sable. Déjeuner tardif de paella ou de poisson grillé dans un chiringuito en bord de mer.",
      },
      evening: {
        en: "Vermouth hour is sacred here — do it properly in Poble Sec, then dinner along Carrer de Blai, a street of pintxos bars where each little bite costs a euro or two.",
        fr: "L'heure du vermouth est sacrée ici — fais-la bien dans le Poble Sec, puis dîner le long du Carrer de Blai, une rue de bars à pintxos où chaque bouchée coûte un ou deux euros.",
      },
    },
    {
      day: 4,
      title: {
        en: "Modernisme, shopping & one last plaza",
        fr: "Modernisme, shopping & une dernière place",
      },
      morning: {
        en: "Walk Passeig de Gràcia to see Gaudí's Casa Batlló and La Pedrera from the outside (book ahead if you want to go in). This is also the street for window-shopping and design stores.",
        fr: "Remonte le Passeig de Gràcia pour voir la Casa Batlló et La Pedrera de Gaudí depuis l'extérieur (réserve si tu veux entrer). C'est aussi la rue du lèche-vitrines et des boutiques de design.",
      },
      afternoon: {
        en: "Loop back through El Raval for the contemporary art museum (MACBA) and its skater-filled plaza, or dip into the Picasso Museum in El Born if you skipped it. Last-minute souvenirs at Mercat de Santa Caterina.",
        fr: "Reviens par El Raval pour le musée d'art contemporain (MACBA) et sa place remplie de skateurs, ou file au musée Picasso dans El Born si tu l'as zappé. Derniers souvenirs au Mercat de Santa Caterina.",
      },
      evening: {
        en: "Send off the trip with a proper long Spanish dinner — order too much, share everything, and toast on a rooftop terrace with the city lit up below.",
        fr: "Clôture le séjour par un vrai dîner espagnol qui s'étire — commande trop, partage tout, et trinque sur un rooftop avec la ville illuminée en dessous.",
      },
    },
  ],
  pois: [
    {
      name: "Sagrada Família",
      type: "landmark",
      description: {
        en: "Gaudí's unfinished basilica and the city's icon — book a timed entry and go inside for the light.",
        fr: "La basilique inachevée de Gaudí, icône de la ville — réserve une entrée horodatée et entre pour la lumière.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Sagrada+Familia+Barcelona",
    },
    {
      name: "Park Güell",
      type: "landmark",
      description: {
        en: "Gaudí's mosaic-tiled hillside park with the postcard city view. Monumental Zone needs a ticket.",
        fr: "Le parc de colline en mosaïque de Gaudí avec la vue carte postale. La zone monumentale demande un billet.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Park+Guell+Barcelona",
    },
    {
      name: "Gothic Quarter (Barri Gòtic)",
      type: "neighborhood",
      description: {
        en: "The medieval maze at the city's core — cathedral, hidden plazas and narrow stone lanes.",
        fr: "Le labyrinthe médiéval au cœur de la ville — cathédrale, placettes cachées et ruelles de pierre.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Gothic+Quarter+Barcelona",
    },
    {
      name: "La Boqueria",
      type: "landmark",
      description: {
        en: "The famous covered market off La Rambla — fresh juice, jamón, and counter bars at the back for lunch.",
        fr: "Le célèbre marché couvert qui donne sur La Rambla — jus frais, jamón et bars du fond pour déjeuner.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=La+Boqueria+Barcelona",
    },
    {
      name: "El Born",
      type: "neighborhood",
      description: {
        en: "Barcelona's tapas-and-wine heartland, home to the Picasso Museum and Santa Maria del Mar.",
        fr: "Le cœur tapas et vin de Barcelone, avec le musée Picasso et Santa Maria del Mar.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=El+Born+Barcelona",
    },
    {
      name: "Barceloneta Beach",
      type: "landmark",
      description: {
        en: "The city beach — swim, sunbathe, and eat paella at a beachfront chiringuito.",
        fr: "La plage de la ville — baignade, bronzette et paella dans un chiringuito en bord de mer.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Barceloneta+Beach+Barcelona",
    },
    {
      name: "Montjuïc Castle",
      type: "landmark",
      description: {
        en: "Hilltop fortress with gardens and the best sweeping views over the port and city.",
        fr: "Forteresse perchée avec jardins et la plus belle vue panoramique sur le port et la ville.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Montjuic+Castle+Barcelona",
    },
    {
      name: "Plaça del Sol",
      type: "neighborhood",
      description: {
        en: "The lively heart of Gràcia — leafy square lined with terraces, best in the early evening.",
        fr: "Le cœur animé de Gràcia — place ombragée bordée de terrasses, parfaite en début de soirée.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Placa+del+Sol+Barcelona",
    },
    {
      name: "Carrer de Blai",
      type: "restaurant",
      description: {
        en: "Poble Sec's pintxos street — hop bar to bar, one or two euros a bite, keep your toothpicks to tally up.",
        fr: "La rue à pintxos du Poble Sec — de bar en bar, un ou deux euros la bouchée, garde tes pics pour compter.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Carrer+de+Blai+Barcelona",
    },
    {
      name: "Bar Marsella",
      type: "bar",
      description: {
        en: "El Raval's ancient absinthe bar, all peeling mirrors and history — a proper old-Barcelona nightcap.",
        fr: "Le vieux bar à absinthe d'El Raval, miroirs écaillés et histoire — un dernier verre à l'ancienne.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bar+Marsella+Barcelona",
    },
    {
      name: "Casa Batlló",
      type: "landmark",
      description: {
        en: "Gaudí's wave-fronted masterpiece on Passeig de Gràcia — stunning even just from the pavement.",
        fr: "Le chef-d'œuvre ondulé de Gaudí sur le Passeig de Gràcia — superbe même depuis le trottoir.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Casa+Batllo+Barcelona",
    },
    {
      name: "Paradiso",
      type: "club",
      description: {
        en: "El Born's speakeasy cocktail bar hidden behind a pastrami shop — theatrical drinks, arrive early.",
        fr: "Le bar à cocktails clandestin d'El Born caché derrière une sandwicherie — cocktails spectaculaires, viens tôt.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Paradiso+Barcelona",
    },
  ],
  budget: {
    perPerson: { low: 380, high: 640, currency: "EUR" },
    breakdown: [
      { category: { en: "Accommodation (3 nights, shared mid-range)", fr: "Hébergement (3 nuits, milieu de gamme partagé)" }, amount: 210 },
      { category: { en: "Food & drink", fr: "Nourriture & boissons" }, amount: 160 },
      { category: { en: "Attractions & tickets", fr: "Visites & billets" }, amount: 85 },
      { category: { en: "Local transport", fr: "Transports locaux" }, amount: 30 },
      { category: { en: "Nightlife & extras", fr: "Sorties & extras" }, amount: 65 },
    ],
    note: {
      en: "Mid-range on-the-ground costs per person, flights excluded — go lower with hostels and market lunches, higher if you eat out big and hit the clubs.",
      fr: "Coûts sur place milieu de gamme par personne, vols non compris — moins cher en auberge et déjeuners au marché, plus cher si tu dînes grand et enchaînes les clubs.",
    },
  },
  packing: {
    en: [
      "Comfortable trainers — you'll walk 15,000+ steps a day on stone streets",
      "A light layer for cooler evenings, even in summer",
      "Swimwear and a quick-dry towel for Barceloneta",
      "Sunscreen and sunglasses — the sun is strong from spring on",
      "A crossbody bag that zips shut (pickpockets work the tourist zones)",
      "Refillable water bottle for the street fountains",
      "One smart-casual outfit for a nicer dinner or rooftop bar",
    ],
    fr: [
      "Des baskets confortables — tu marcheras 15 000 pas et plus par jour sur les pavés",
      "Une couche légère pour les soirées plus fraîches, même en été",
      "Maillot de bain et serviette qui sèche vite pour la Barceloneta",
      "Crème solaire et lunettes — le soleil tape fort dès le printemps",
      "Un sac bandoulière qui se ferme (les pickpockets bossent les zones touristiques)",
      "Une gourde réutilisable pour les fontaines de rue",
      "Une tenue un peu habillée pour un dîner ou un rooftop",
    ],
  },
  bestSeason: {
    en: "May–June and September–October hit the sweet spot: warm sea, long days, fewer crowds. July and August are hot, packed and pricey, while winter is mild and quiet if you don't mind skipping the beach.",
    fr: "Mai-juin et septembre-octobre sont le bon compromis : mer chaude, longues journées, moins de monde. Juillet-août, c'est chaud, bondé et cher, tandis que l'hiver est doux et calme si tu acceptes de zapper la plage.",
  },
  related: ["paris-trip-planner", "lisbon-trip-planner", "rome-trip-planner"],
};

const rome: Destination = {
  slug: { en: "rome-trip-planner", fr: "rome-que-faire" },
  useCase: "trip-planner",
  days: 4,
  city: { en: "Rome", fr: "Rome" },
  country: { en: "Italy", fr: "Italie" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1600&q=80",
    imageAlt: {
      en: "The Colosseum lit gold at dusk with cobbled Roman streets in the foreground",
      fr: "Le Colisée illuminé au crépuscule, avec les pavés romains au premier plan",
    },
    tag: {
      en: "Trip planner · 4-day city break",
      fr: "Que faire · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Rome Trip Planner: 4-Day Itinerary, Map & Budget",
      fr: "Que faire à Rome : itinéraire 4 jours, carte & budget",
    },
    description: {
      en: "An honest 4-day Rome itinerary: Colosseum, Vatican, Trastevere, real budget and map. Copy the whole trip into a free planner and tweak it with your group.",
      fr: "Un itinéraire honnête de 4 jours à Rome : Colisée, Vatican, Trastevere, budget réel et carte. Copie tout le voyage dans un planner gratuit et ajuste-le à ton groupe.",
    },
  },
  intro: {
    en: [
      "Rome rewards people who plan a little and wander a lot. Four days is the sweet spot: enough to cover the big three — ancient Rome, the Vatican, and the historic centre — without turning your holiday into a forced march past every ruin in the guidebook. This planner keeps each day tight geographically so you walk less and linger more.",
      "The city is bigger and hillier than it looks on a map, and the cobblestones are merciless on tired feet. We've grouped sights by neighbourhood, front-loaded the ticketed heavyweights (Colosseum, Vatican Museums) for the mornings, and left evenings for aperitivo, long dinners and aimless piazza-hopping — which is honestly where Rome is at its best.",
      "Prices below are real mid-range 2026 figures for what you'll spend on the ground, not glossy averages. Book the Colosseum and Vatican slots ahead, wear shoes you'd trust on wet marble, and treat this itinerary as a starting point — copy it into a free planner and reshuffle it with whoever you're travelling with.",
    ],
    fr: [
      "Rome récompense ceux qui planifient un peu et flânent beaucoup. Quatre jours, c'est le bon tempo : de quoi voir les trois incontournables — la Rome antique, le Vatican et le centre historique — sans transformer tes vacances en marche forcée devant chaque ruine du guide. Ce planner garde chaque journée compacte géographiquement, pour marcher moins et savourer plus.",
      "La ville est plus grande et plus vallonnée qu'elle n'en a l'air sur une carte, et les pavés sont impitoyables pour les pieds fatigués. On a regroupé les visites par quartier, calé les gros morceaux à billet (Colisée, musées du Vatican) le matin, et laissé les soirées pour l'apéro, les longs dîners et le vagabondage de piazza en piazza — franchement, c'est là que Rome est la plus belle.",
      "Les prix ci-dessous sont des vrais tarifs milieu de gamme 2026 pour ce que tu dépenseras sur place, pas des moyennes vendeuses. Réserve tes créneaux Colisée et Vatican à l'avance, mets des chaussures qui tiennent sur le marbre mouillé, et prends cet itinéraire comme un point de départ : copie-le dans un planner gratuit et remanie-le avec ceux qui voyagent avec toi.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: { en: "Ancient Rome, on foot", fr: "La Rome antique, à pied" },
      morning: {
        en: "Start at the Colosseum with a pre-booked timed ticket to skip the worst of the queue. Go early, when the light is soft and the crowds thinner, then take your time reading the arena floor and the upper tiers.",
        fr: "Commence au Colisée avec un billet horodaté réservé à l'avance pour éviter le gros de la file. Vas-y tôt, quand la lumière est douce et la foule plus légère, puis prends le temps de lire l'arène et les gradins supérieurs.",
      },
      afternoon: {
        en: "The same ticket covers the Roman Forum and Palatine Hill next door — wander the old Via Sacra, climb the Palatine for the view over the Forum, and grab a light lunch around Monti before your feet give out.",
        fr: "Le même billet couvre le Forum romain et le Palatin juste à côté : arpente la Via Sacra, monte sur le Palatin pour la vue sur le Forum, et cale un déjeuner léger du côté de Monti avant que tes pieds ne lâchent.",
      },
      evening: {
        en: "Stay in Monti, Rome's oldest and coolest quarter. Aperitivo on a quiet piazza, then a proper Roman dinner — cacio e pepe or carbonara — in one of the trattorias off the main drag.",
        fr: "Reste à Monti, le plus vieux et le plus cool des quartiers romains. Apéro sur une petite piazza, puis un vrai dîner romain — cacio e pepe ou carbonara — dans une trattoria à l'écart de la rue principale.",
      },
    },
    {
      day: 2,
      title: { en: "Vatican & St. Peter's", fr: "Vatican & Saint-Pierre" },
      morning: {
        en: "Hit the Vatican Museums at opening with a reserved slot. Follow the crowd toward the Sistine Chapel but stop for the Raphael Rooms and the map gallery — the parts most people rush past.",
        fr: "Attaque les musées du Vatican à l'ouverture avec un créneau réservé. Suis le flux vers la chapelle Sixtine mais arrête-toi aux chambres de Raphaël et à la galerie des cartes — ce que la plupart des gens zappent.",
      },
      afternoon: {
        en: "Cross to St. Peter's Basilica (free, but expect a security line) and, if legs allow, climb the dome for the best panorama in the city. Refuel with lunch in the Borgo or Prati.",
        fr: "Passe à la basilique Saint-Pierre (gratuite, mais prévois la file de sécurité) et, si les jambes suivent, monte à la coupole pour le plus beau panorama de la ville. Recharge avec un déjeuner dans le Borgo ou à Prati.",
      },
      evening: {
        en: "Walk down to the river and cross to Castel Sant'Angelo for golden hour on the bridge, then dinner in Prati where locals eat and prices are gentler than around the Vatican gates.",
        fr: "Descends vers le fleuve et rejoins le Castel Sant'Angelo pour l'heure dorée sur le pont, puis dîne à Prati où mangent les locaux et où les prix sont plus doux qu'aux abords du Vatican.",
      },
    },
    {
      day: 3,
      title: { en: "The historic centre", fr: "Le centre historique" },
      morning: {
        en: "Do the classic centro storico loop on foot: the Pantheon (free, and still jaw-dropping), Piazza Navona and its fountains, then espresso standing at the bar like a Roman.",
        fr: "Fais la boucle classique du centro storico à pied : le Panthéon (gratuit, et toujours bluffant), la Piazza Navona et ses fontaines, puis un espresso debout au comptoir comme un Romain.",
      },
      afternoon: {
        en: "Toss a coin at the Trevi Fountain, climb the Spanish Steps, and browse the lanes between them. Duck into Campo de' Fiori's market for a snack and some people-watching.",
        fr: "Lance une pièce à la fontaine de Trevi, grimpe les marches de la place d'Espagne, et flâne dans les ruelles entre les deux. Fais un crochet par le marché de Campo de' Fiori pour un en-cas et observer les passants.",
      },
      evening: {
        en: "Cross the river to Trastevere as the lamps come on. Aperitivo on the cobbles, dinner in an ivy-draped trattoria, then a nightcap — this is the neighbourhood everyone falls for.",
        fr: "Traverse le fleuve vers Trastevere quand les lampes s'allument. Apéro sur les pavés, dîner dans une trattoria couverte de lierre, puis un dernier verre — c'est le quartier dont tout le monde tombe amoureux.",
      },
    },
    {
      day: 4,
      title: { en: "Parks, views & slow morning", fr: "Parcs, panoramas & matinée douce" },
      morning: {
        en: "Ease into the last day at Villa Borghese. Book the Galleria Borghese in advance for its Bernini and Caravaggio, or just rent a bike and roll through the gardens.",
        fr: "Démarre en douceur la dernière journée à la Villa Borghese. Réserve la Galleria Borghese à l'avance pour ses Bernin et Caravage, ou loue simplement un vélo et roule à travers les jardins.",
      },
      afternoon: {
        en: "Walk to the Pincio terrace for a last sweeping view over Piazza del Popolo and the rooftops, then drift down for lunch and any shopping or sight you skipped earlier.",
        fr: "Marche jusqu'à la terrasse du Pincio pour une dernière vue plongeante sur la Piazza del Popolo et les toits, puis redescends pour déjeuner et rattraper une boutique ou une visite que tu avais sautée.",
      },
      evening: {
        en: "Round it off in the Jewish Ghetto: order fried artichokes (carciofi alla giudia), wander past the Portico d'Ottavia, and toast the trip on a warm, atmospheric last night.",
        fr: "Termine dans le Ghetto juif : commande des artichauts frits (carciofi alla giudia), passe devant le Portique d'Octavie, et trinque au voyage pour une dernière soirée chaleureuse et pleine d'ambiance.",
      },
    },
  ],
  pois: [
    {
      name: "Colosseum",
      type: "landmark",
      description: {
        en: "The 2,000-year-old amphitheatre and Rome's icon — book a timed entry and go early.",
        fr: "L'amphithéâtre vieux de 2 000 ans, icône de Rome — réserve un créneau et vas-y tôt.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Colosseo+Rome",
    },
    {
      name: "Roman Forum",
      type: "landmark",
      description: {
        en: "The ruined heart of ancient Rome, walkable on the same ticket as the Colosseum.",
        fr: "Le cœur en ruines de la Rome antique, accessible avec le même billet que le Colisée.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Roman+Forum+Rome",
    },
    {
      name: "Vatican Museums",
      type: "landmark",
      description: {
        en: "Miles of art ending at the Sistine Chapel; a reserved slot is essential.",
        fr: "Des kilomètres d'art jusqu'à la chapelle Sixtine ; un créneau réservé est indispensable.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vatican+Museums+Rome",
    },
    {
      name: "St. Peter's Basilica",
      type: "landmark",
      description: {
        en: "Free to enter, staggering inside — climb the dome for the top view of Rome.",
        fr: "Entrée gratuite, intérieur vertigineux — monte à la coupole pour la plus belle vue de Rome.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=St+Peter%27s+Basilica+Rome",
    },
    {
      name: "Pantheon",
      type: "landmark",
      description: {
        en: "The best-preserved ancient building in Rome, with its famous open oculus.",
        fr: "Le monument antique le mieux conservé de Rome, avec son célèbre oculus ouvert.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pantheon+Rome",
    },
    {
      name: "Trevi Fountain",
      type: "landmark",
      description: {
        en: "Baroque showstopper — throw a coin, then escape the crowds down a side street.",
        fr: "Chef-d'œuvre baroque — lance une pièce, puis fuis la foule par une ruelle.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trevi+Fountain+Rome",
    },
    {
      name: "Piazza Navona",
      type: "landmark",
      description: {
        en: "Elegant oval square built over a Roman stadium, ringed with Bernini fountains.",
        fr: "Élégante place ovale bâtie sur un stade romain, cernée de fontaines du Bernin.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Piazza+Navona+Rome",
    },
    {
      name: "Trastevere",
      type: "neighborhood",
      description: {
        en: "Cobbled, ivy-clad and lively after dark — Rome's favourite dinner-and-drinks quarter.",
        fr: "Pavé, couvert de lierre et vivant la nuit — le quartier dîner-et-verres préféré de Rome.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Trastevere+Rome",
    },
    {
      name: "Villa Borghese",
      type: "activity",
      description: {
        en: "Rome's big central park with a world-class gallery, gardens and bike rentals.",
        fr: "Le grand parc central de Rome, avec une galerie de premier plan, des jardins et des vélos.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Villa+Borghese+Rome",
    },
    {
      name: "Campo de' Fiori",
      type: "neighborhood",
      description: {
        en: "Morning market square that flips into a busy nightlife hub after dark.",
        fr: "Place-marché le matin qui se mue en pôle de vie nocturne animé le soir.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Campo+de%27+Fiori+Rome",
    },
    {
      name: "Roscioli",
      type: "restaurant",
      description: {
        en: "Deli-slash-trattoria famous for its carbonara and cured meats — book ahead.",
        fr: "Épicerie-trattoria célèbre pour sa carbonara et sa charcuterie — réserve à l'avance.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Roscioli+Rome",
    },
    {
      name: "Freni e Frizioni",
      type: "bar",
      description: {
        en: "Trastevere cocktail bar with a generous aperitivo buffet and a lively terrace.",
        fr: "Bar à cocktails de Trastevere avec un généreux buffet d'apéro et une terrasse animée.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Freni+e+Frizioni+Rome",
    },
  ],
  budget: {
    perPerson: { low: 380, high: 620, currency: "EUR" },
    breakdown: [
      { category: { en: "Accommodation (4 nights, mid-range share)", fr: "Hébergement (4 nuits, milieu de gamme partagé)" }, amount: 220 },
      { category: { en: "Food & drink", fr: "Repas & boissons" }, amount: 160 },
      { category: { en: "Attractions & tickets", fr: "Visites & billets" }, amount: 80 },
      { category: { en: "Local transport & transfers", fr: "Transports locaux & transferts" }, amount: 40 },
      { category: { en: "Coffee, gelato & extras", fr: "Café, glaces & extras" }, amount: 40 },
    ],
    note: {
      en: "Sharing a mid-range room and eating at trattorias rather than tourist-strip spots keeps you near the low end; central hotels and guided tours push you toward the high end.",
      fr: "Partager une chambre milieu de gamme et manger en trattoria plutôt que sur les axes touristiques te garde près du bas de la fourchette ; hôtels centraux et visites guidées te poussent vers le haut.",
    },
  },
  packing: {
    en: [
      "Comfortable, broken-in shoes with grip — Rome's cobblestones are relentless",
      "Shoulder-and-knee cover for churches (Vatican and St. Peter's enforce it)",
      "A refillable water bottle for the free nasoni street fountains",
      "A light layer for cool evenings, even in summer",
      "Sunscreen and a hat — shade is scarce at midday",
      "A crossbody bag that zips shut against pickpockets in crowds",
      "A power adapter for Italian sockets (Type F/L)",
    ],
    fr: [
      "Des chaussures confortables et déjà faites, à bonne adhérence — les pavés romains ne pardonnent pas",
      "De quoi couvrir épaules et genoux pour les églises (Vatican et Saint-Pierre l'exigent)",
      "Une gourde à remplir aux nasoni, les fontaines de rue gratuites",
      "Une couche légère pour les soirées fraîches, même en été",
      "Crème solaire et chapeau — l'ombre est rare à midi",
      "Un sac en bandoulière qui se ferme, contre les pickpockets dans la foule",
      "Un adaptateur de prise pour les fiches italiennes (type F/L)",
    ],
  },
  bestSeason: {
    en: "April to June and late September to October are the sweet spots — warm, walkable and lively without the peak crush. July and August are brutally hot and crowded; if you must go then, start early and rest through the afternoon.",
    fr: "D'avril à juin et de fin septembre à octobre, c'est le meilleur moment — chaud, agréable à pied et animé sans la cohue de pointe. Juillet et août sont écrasants de chaleur et bondés ; si tu n'as pas le choix, pars tôt et repose-toi l'après-midi.",
  },
  related: ["paris-trip-planner", "barcelona-trip-planner", "lisbon-trip-planner"],
};

const lisbon: Destination = {
  slug: { en: "lisbon-trip-planner", fr: "lisbonne-que-faire" },
  useCase: "trip-planner",
  days: 4,
  city: { en: "Lisbon", fr: "Lisbonne" },
  country: { en: "Portugal", fr: "Portugal" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1600&q=80",
    imageAlt: {
      en: "Yellow Tram 28 climbing a steep cobbled street through the Alfama district in Lisbon",
      fr: "Le tram 28 jaune grimpant une ruelle pavée en pente dans le quartier de l'Alfama à Lisbonne",
    },
    tag: {
      en: "Trip planner · 4-day city break",
      fr: "Que faire · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Lisbon Trip Planner — 4-Day Itinerary, Budget & Map",
      fr: "Que faire à Lisbonne — Itinéraire 4 jours, budget et carte",
    },
    description: {
      en: "A real 4-day Lisbon itinerary: Alfama, Belém, Sintra and Bairro Alto. Honest mid-range budget, real spots on a map, and a free planner to fork the trip.",
      fr: "Un vrai itinéraire de 4 jours à Lisbonne : Alfama, Belém, Sintra et Bairro Alto. Budget honnête, bonnes adresses sur une carte et un planificateur gratuit à dupliquer.",
    },
  },
  intro: {
    en: [
      "Lisbon rewards people who plan a little and wander a lot. It's a city of seven hills stacked with tiled facades, rattling yellow trams, viewpoints that appear out of nowhere, and a river so wide it feels like the sea. Four days is enough to see the big three — Alfama, Belém, Bairro Alto — without speed-walking, and still keep a full day for a Sintra escape.",
      "It's also one of Western Europe's better-value capitals. A plate of grilled fish and a glass of vinho verde won't wreck the budget, the metro is cheap and clean, and most of the best things — the miradouros, the sunset over the Tagus, getting lost in Alfama's stairways — cost nothing at all. Save the money for pastéis de nata and a rooftop or two.",
      "This plan is built for a group that wants a proper city break, not a checklist sprint. Expect real Lisbon distances (everything is uphill), honest opening realities (Belém queues, Sintra crowds), and evenings that lean into the fado houses and Bairro Alto bars. Fork it, swap what you don't like, and split the planning with your friends.",
    ],
    fr: [
      "Lisbonne récompense ceux qui planifient un peu et flânent beaucoup. C'est une ville de sept collines couvertes de façades en azulejos, de trams jaunes qui grincent, de belvédères qui surgissent au détour d'une ruelle, et d'un fleuve si large qu'on le prend pour la mer. Quatre jours suffisent pour voir le trio Alfama-Belém-Bairro Alto sans courir, et garder une journée entière pour une escapade à Sintra.",
      "C'est aussi l'une des capitales les plus abordables d'Europe de l'Ouest. Un poisson grillé avec un verre de vinho verde ne plombe pas le budget, le métro est propre et pas cher, et le meilleur de la ville — les miradouros, le coucher de soleil sur le Tage, se perdre dans les escaliers de l'Alfama — ne coûte rien. Garde l'argent pour les pastéis de nata et un ou deux rooftops.",
      "Ce programme est pensé pour un groupe qui veut un vrai city break, pas une course à la checklist. Prévois les vraies distances lisboètes (tout monte), les réalités du terrain (files à Belém, foule à Sintra) et des soirées entre maisons de fado et bars du Bairro Alto. Duplique-le, change ce qui ne te plaît pas, et répartis l'organisation avec tes potes.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Alfama, Tram 28 and the first sunset viewpoint",
        fr: "Alfama, tram 28 et premier coucher de soleil",
      },
      morning: {
        en: "Ease in with a stroll through Baixa and up to the Sé Cathedral, then let the neighbourhood pull you into Alfama's tangle of stairways. Coffee and a first pastel de nata at a corner café while you find your legs.",
        fr: "Mets-toi en jambes par une balade dans la Baixa jusqu'à la cathédrale (Sé), puis laisse-toi happer par le dédale d'escaliers de l'Alfama. Café et premier pastel de nata au coin d'une rue pour t'acclimater.",
      },
      afternoon: {
        en: "Catch the iconic Tram 28 for the ride up through Graça (board early to get a seat), then walk down to São Jorge Castle for the ramparts and the panorama over the red rooftops. Take it slow — it's all cobbles and slopes.",
        fr: "Attrape le mythique tram 28 pour grimper jusqu'à Graça (monte à un terminus pour avoir une place assise), puis redescends au château São Jorge pour les remparts et le panorama sur les toits rouges. Vas-y tranquille : c'est pavé et ça monte.",
      },
      evening: {
        en: "Sunset drinks at Miradouro das Portas do Sol, then dinner in Alfama followed by a fado house — book ahead, the good ones fill up. Nightcap on the way back down toward the river.",
        fr: "Apéro coucher de soleil au Miradouro das Portas do Sol, puis dîner dans l'Alfama suivi d'une maison de fado — réserve, les bonnes affichent vite complet. Dernier verre en redescendant vers le fleuve.",
      },
    },
    {
      day: 2,
      title: {
        en: "Belém, monuments and the original pastéis",
        fr: "Belém, monuments et les pastéis d'origine",
      },
      morning: {
        en: "Head west to Belém early to beat the queues at the Jerónimos Monastery — go straight there when it opens. Then walk the waterfront to the Belém Tower and the Monument to the Discoveries.",
        fr: "File à Belém tôt le matin pour éviter la file au monastère des Hiéronymites — vas-y dès l'ouverture. Ensuite, longe les quais jusqu'à la tour de Belém et le monument des Découvertes.",
      },
      afternoon: {
        en: "The non-negotiable stop: warm custard tarts at Pastéis de Belém, straight from the oven. Then choose your museum — the MAAT for architecture and the river, or the Coach Museum if the group prefers indoors.",
        fr: "L'arrêt obligatoire : les pastéis tièdes tout juste sortis du four chez Pastéis de Belém. Ensuite, choisis ton musée — le MAAT pour l'archi et la vue sur le fleuve, ou le musée des Carrosses si le groupe préfère l'intérieur.",
      },
      evening: {
        en: "Tram or Uber back east to LX Factory, a converted industrial complex under the 25 de Abril bridge. Dinner among the warehouses, browse Ler Devagar bookstore, and stay for the buzzy bar scene.",
        fr: "Tram ou Uber pour remonter vers l'est jusqu'à la LX Factory, une ancienne friche industrielle sous le pont du 25 avril. Dîner entre les hangars, un tour à la librairie Ler Devagar, et on reste pour l'ambiance des bars.",
      },
    },
    {
      day: 3,
      title: {
        en: "Sintra day-trip: palaces in the hills",
        fr: "Escapade à Sintra : les palais dans les collines",
      },
      morning: {
        en: "Train from Rossio station to Sintra (about 40 minutes) — leave early, this is the day the crowds matter most. Book Pena Palace tickets in advance and go there first while it's quietest.",
        fr: "Train depuis la gare du Rossio jusqu'à Sintra (environ 40 minutes) — pars tôt, c'est le jour où la foule compte le plus. Réserve le palais de Pena à l'avance et commence par lui, tant que c'est calme.",
      },
      afternoon: {
        en: "Wander the fairy-tale gardens and initiation well at Quinta da Regaleira, then a lunch of pastries and a browse through Sintra's historic centre. Skip a third site — two done well beats three rushed.",
        fr: "Explore les jardins féeriques et le puits initiatique de la Quinta da Regaleira, puis déjeune de douceurs locales et flâne dans le centre historique de Sintra. Zappe un troisième site — deux bien vus valent mieux que trois expédiés.",
      },
      evening: {
        en: "Back in Lisbon, regroup and eat where the locals do — a tasca in Cais do Sodré or the tapas-style stalls nearby. Early-ish night; you've earned it after all those steps.",
        fr: "De retour à Lisbonne, on se retrouve et on mange comme les locaux — une tasca à Cais do Sodré ou les étals façon tapas juste à côté. Soirée plutôt calme : tu l'as bien méritée après tous ces escaliers.",
      },
    },
    {
      day: 4,
      title: {
        en: "Time Out Market, Chiado and a big last night",
        fr: "Time Out Market, Chiado et une dernière grosse soirée",
      },
      morning: {
        en: "Slow start in Chiado — coffee at A Brasileira, browse the boutiques, and take the Santa Justa Lift or the free walk-up behind it for the view over Baixa. Grab any souvenirs now.",
        fr: "Réveil tranquille au Chiado — café à A Brasileira, lèche-vitrine dans les boutiques, et prends l'ascenseur de Santa Justa (ou le passage gratuit derrière) pour la vue sur la Baixa. C'est le moment pour les souvenirs.",
      },
      afternoon: {
        en: "Lunch at the Time Out Market — dozens of Lisbon's best kitchens under one roof, so everyone gets what they want. Then wander down to the river at Cais do Sodré or ride the tram to Estrela for the garden.",
        fr: "Déjeuner au Time Out Market — des dizaines des meilleures cuisines de Lisbonne sous un même toit, chacun y trouve son bonheur. Ensuite, descends vers le fleuve à Cais do Sodré ou file en tram jusqu'à Estrela pour le jardin.",
      },
      evening: {
        en: "Sundowners at Miradouro de São Pedro de Alcântara, then dinner and the classic Bairro Alto crawl — narrow streets, tiny bars, drinks spilling onto the pavement. Send the trip off properly.",
        fr: "Verre au soleil couchant au Miradouro de São Pedro de Alcântara, puis dîner et la tournée classique du Bairro Alto — ruelles étroites, minuscules bars, verres qui débordent sur le trottoir. La bonne façon de clore le séjour.",
      },
    },
  ],
  pois: [
    {
      name: "Torre de Belém",
      type: "landmark",
      description: {
        en: "The 16th-century Manueline tower on the Tagus, Lisbon's most photographed monument. Queues are long — go early or admire it from the outside.",
        fr: "La tour manuéline du XVIe siècle sur le Tage, le monument le plus photographié de Lisbonne. La file est longue — vas-y tôt ou admire-la de l'extérieur.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Torre+de+Belem+Lisbon",
    },
    {
      name: "Mosteiro dos Jerónimos",
      type: "landmark",
      description: {
        en: "A vast, ornate monastery and UNESCO site in Belém. The cloister is the highlight — book ahead and arrive at opening to skip the worst of the line.",
        fr: "Un vaste monastère ouvragé, classé à l'UNESCO, à Belém. Le cloître est le clou de la visite — réserve et arrive à l'ouverture pour éviter la grosse file.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Mosteiro+dos+Jeronimos+Lisbon",
    },
    {
      name: "Castelo de São Jorge",
      type: "landmark",
      description: {
        en: "Hilltop Moorish castle above Alfama with the best all-round view of the city and river. Great at golden hour; wear proper shoes for the ramparts.",
        fr: "Château maure perché au-dessus de l'Alfama, avec la plus belle vue d'ensemble sur la ville et le fleuve. Superbe à l'heure dorée ; prévois de bonnes chaussures pour les remparts.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Castelo+de+Sao+Jorge+Lisbon",
    },
    {
      name: "Alfama",
      type: "neighborhood",
      description: {
        en: "Lisbon's oldest quarter: a maze of stairways, laundry lines and fado bars that survived the 1755 earthquake. Made for aimless wandering.",
        fr: "Le plus vieux quartier de Lisbonne : un labyrinthe d'escaliers, de linge suspendu et de bars à fado qui ont survécu au séisme de 1755. Fait pour se perdre sans but.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Alfama+Lisbon",
    },
    {
      name: "Miradouro das Portas do Sol",
      type: "landmark",
      description: {
        en: "The postcard viewpoint over Alfama's rooftops down to the Tagus. Prime sunset spot — there's a kiosk café for a drink while you wait for the light.",
        fr: "Le belvédère carte postale sur les toits de l'Alfama jusqu'au Tage. Spot de coucher de soleil idéal — un kiosque-café sert à boire en attendant la lumière.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Miradouro+das+Portas+do+Sol+Lisbon",
    },
    {
      name: "Time Out Market",
      type: "restaurant",
      description: {
        en: "A curated food hall in Mercado da Ribeira gathering many of Lisbon's top chefs and stalls. Busy at peak hours but unbeatable for a mixed group.",
        fr: "Une halle gastronomique choisie dans le Mercado da Ribeira, qui réunit nombre des meilleurs chefs et étals de Lisbonne. Bondée aux heures de pointe mais imbattable pour un groupe aux goûts variés.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Time+Out+Market+Lisbon",
    },
    {
      name: "Pastéis de Belém",
      type: "restaurant",
      description: {
        en: "The original pastel de nata since 1837, still made to a secret recipe. Eat them warm with cinnamon; the takeaway queue moves faster than it looks.",
        fr: "Le pastel de nata originel depuis 1837, toujours fait selon une recette secrète. Mange-les tièdes avec de la cannelle ; la file à emporter avance plus vite qu'elle n'en a l'air.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pasteis+de+Belem+Lisbon",
    },
    {
      name: "LX Factory",
      type: "neighborhood",
      description: {
        en: "A former industrial site under the 25 de Abril bridge, now full of restaurants, bars, shops and street art. Best in the evening for dinner and drinks.",
        fr: "Une ancienne friche industrielle sous le pont du 25 avril, aujourd'hui pleine de restos, bars, boutiques et street art. À faire le soir pour dîner et boire un verre.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=LX+Factory+Lisbon",
    },
    {
      name: "Bairro Alto",
      type: "bar",
      description: {
        en: "Lisbon's nightlife heart: dozens of tiny bars packed into narrow streets where the party spills outdoors. Quiet by day, chaos after 11pm.",
        fr: "Le cœur de la vie nocturne lisboète : des dizaines de minuscules bars dans des ruelles étroites où la fête déborde dehors. Calme le jour, chaos après 23 h.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Bairro+Alto+Lisbon",
    },
    {
      name: "Pink Street (Rua Nova do Carvalho)",
      type: "club",
      description: {
        en: "A former red-light lane in Cais do Sodré painted pink, now lined with clubs and late bars. Where the night usually ends up.",
        fr: "Une ancienne rue chaude de Cais do Sodré peinte en rose, désormais bordée de clubs et de bars de nuit. C'est là que la soirée finit souvent.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pink+Street+Rua+Nova+do+Carvalho+Lisbon",
    },
    {
      name: "Palácio da Pena",
      type: "activity",
      description: {
        en: "The candy-coloured romantic palace crowning the Sintra hills. Book timed tickets in advance and go first thing — it gets swamped by midday.",
        fr: "Le palais romantique aux couleurs bonbon qui couronne les collines de Sintra. Réserve un créneau à l'avance et vas-y en premier — c'est pris d'assaut dès midi.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Palacio+da+Pena+Sintra",
    },
    {
      name: "Quinta da Regaleira",
      type: "activity",
      description: {
        en: "A whimsical Sintra estate famous for its spiral initiation well and hidden tunnels. Less overwhelming than Pena and endlessly fun to explore.",
        fr: "Un domaine fantasque de Sintra célèbre pour son puits initiatique en spirale et ses tunnels cachés. Moins écrasant que Pena et un vrai plaisir à explorer.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Quinta+da+Regaleira+Sintra",
    },
  ],
  budget: {
    perPerson: { low: 320, high: 540, currency: "EUR" },
    breakdown: [
      { category: { en: "Accommodation (3 nights, shared)", fr: "Hébergement (3 nuits, partagé)" }, amount: 165 },
      { category: { en: "Food & drink", fr: "Repas et boissons" }, amount: 155 },
      { category: { en: "Attractions & Sintra day-trip", fr: "Visites et escapade à Sintra" }, amount: 75 },
      { category: { en: "Local transport & trams", fr: "Transports locaux et trams" }, amount: 35 },
      { category: { en: "Nights out", fr: "Sorties du soir" }, amount: 60 },
    ],
    note: {
      en: "Per person for 4 days, on the ground only (no flights) — Lisbon runs noticeably cheaper than Paris or Rome, but rooftop bars and a big last night push the top of the range.",
      fr: "Par personne pour 4 jours, hors vols — Lisbonne revient nettement moins cher que Paris ou Rome, mais les rooftops et une grosse dernière soirée font grimper le haut de la fourchette.",
    },
  },
  packing: {
    en: [
      "Comfortable trainers with grip — the cobbles are steep and polished slick",
      "Layers: warm sunny days, cool breezy evenings off the river",
      "A light rain jacket outside high summer",
      "Sunglasses and sunscreen — the Atlantic light is strong year-round",
      "A refillable water bottle for the uphill days",
      "A small day bag for the Sintra train trip",
      "A dressier top for rooftop bars and fado houses",
    ],
    fr: [
      "Des baskets confortables et antidérapantes — les pavés sont pentus et lisses comme du savon",
      "Des couches : journées chaudes et ensoleillées, soirées fraîches et venteuses près du fleuve",
      "Un coupe-vent léger hors plein été",
      "Lunettes de soleil et crème solaire — la lumière atlantique tape toute l'année",
      "Une gourde pour les journées qui montent",
      "Un petit sac à dos pour l'excursion en train à Sintra",
      "Un haut un peu habillé pour les rooftops et les maisons de fado",
    ],
  },
  bestSeason: {
    en: "Late spring (May–June) and early autumn (September–October) are ideal: warm, long days without July–August's heat and crowds. Winters are mild but wetter, and many terraces go quiet.",
    fr: "La fin du printemps (mai-juin) et le début de l'automne (septembre-octobre) sont parfaits : chaud, longues journées, sans la chaleur et la foule de juillet-août. Les hivers sont doux mais plus pluvieux, et beaucoup de terrasses tournent au ralenti.",
  },
  related: ["barcelona-trip-planner", "paris-trip-planner", "rome-trip-planner"],
};

const amsterdam: Destination = {
  slug: { en: "amsterdam-trip-planner", fr: "amsterdam-que-faire" },
  useCase: "trip-planner",
  days: 4,
  city: { en: "Amsterdam", fr: "Amsterdam" },
  country: { en: "Netherlands", fr: "Pays-Bas" },
  hero: {
    image:
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1600&q=80",
    imageAlt: {
      en: "Amsterdam canal at golden hour with narrow gabled houses, houseboats and a bicycle leaning on the bridge railing",
      fr: "Canal d'Amsterdam à l'heure dorée avec maisons à pignons étroites, péniches et un vélo appuyé sur le parapet du pont",
    },
    tag: {
      en: "Trip planner · 4-day city break",
      fr: "Que faire · 4 jours",
    },
  },
  meta: {
    title: {
      en: "Amsterdam Trip Planner: 4-Day Itinerary & Budget",
      fr: "Que faire à Amsterdam : itinéraire 4 jours & budget",
    },
    description: {
      en: "An honest 4-day Amsterdam itinerary: canals, Rijksmuseum, Jordaan, De Pijp and Noord, with real prices and a packing list. Fork it into a free planner and make it yours.",
      fr: "Un itinéraire honnête de 4 jours à Amsterdam : canaux, Rijksmuseum, Jordaan, De Pijp et Noord, avec vrais prix et checklist. Copie-le dans un planner gratuit et adapte-le.",
    },
  },
  intro: {
    en: [
      "Amsterdam is small enough to walk end to end, but that's exactly the trap: you can burn a whole trip drifting between canals and never quite decide what you came for. Four days is the sweet spot — long enough for two big museums, the Jordaan, a night out and a ferry to Noord, without turning the weekend into a checklist you resent.",
      "This plan keeps the famous stuff (Rijksmuseum, Van Gogh, Anne Frank House) but spaces it out so you're not queuing on empty legs. It also pushes you past the postcard center into De Pijp for food and NDSM across the water, where the city actually feels lived-in rather than staged for tourists.",
      "Prices here climb fast — a canal-side beer, a museum ticket and a decent dinner add up quicker than you'd think. We've kept the budget honest and mid-range. Grab the itinerary, then fork it into a free planner so your group can swap the bits they don't care about and lock the reservations that actually need booking.",
    ],
    fr: [
      "Amsterdam est assez petite pour la traverser à pied, et c'est justement le piège : tu peux cramer tout un week-end à flâner le long des canaux sans jamais vraiment décider ce que tu es venu voir. Quatre jours, c'est le bon dosage — de quoi caser deux gros musées, le Jordaan, une soirée et un ferry vers Noord, sans transformer le séjour en to-do list qui te gonfle.",
      "Ce plan garde les incontournables (Rijksmuseum, Van Gogh, Maison d'Anne Frank) mais les espace pour t'éviter les files interminables aux mauvais moments. Il te pousse aussi au-delà du centre carte postale : De Pijp pour bien manger, NDSM de l'autre côté de l'eau, là où la ville respire vraiment au lieu de jouer les décors à touristes.",
      "Ici les prix grimpent vite — une bière au bord d'un canal, un billet de musée et un dîner correct, ça chiffre plus vite que prévu. On a gardé un budget honnête, milieu de gamme. Prends l'itinéraire, puis copie-le dans un planner gratuit pour que ta bande vire ce qui l'intéresse pas et bloque les résas qui doivent vraiment être réservées.",
    ],
  },
  itinerary: [
    {
      day: 1,
      title: {
        en: "Canals, the old center and first bites",
        fr: "Canaux, vieux centre et premières bouchées",
      },
      morning: {
        en: "Land, drop the bags and walk into the Nine Streets (De 9 Straatjes) — the prettiest stretch of canal ring, packed with small shops and coffee. Get your bearings on foot before the city fills up.",
        fr: "Arrivée, tu poses les sacs et tu files dans les Neuf Rues (De 9 Straatjes), le plus joli morceau de la ceinture de canaux, plein de petites boutiques et de cafés. Prends tes repères à pied avant que ça se remplisse.",
      },
      afternoon: {
        en: "Do a canal cruise from near Anne Frankhuis to see the ring from the water, then wander to Dam Square and the Begijnhof courtyard. Keep it loose — no museum today, you just arrived.",
        fr: "Fais une croisière sur les canaux depuis les environs de l'Anne Frankhuis pour voir la ceinture depuis l'eau, puis balade-toi jusqu'à la place du Dam et la cour du Begijnhof. Reste tranquille — pas de musée aujourd'hui, tu viens d'arriver.",
      },
      evening: {
        en: "Dinner around the Jordaan, then drinks at a brown café like Café Chris or Café 't Smalle for the low-key local version of a night out. Early night — day 2 is heavy.",
        fr: "Dîner du côté du Jordaan, puis un verre dans un brown café comme le Café Chris ou le Café 't Smalle pour la version locale et tranquille de la soirée. Couche-toi tôt — la journée 2 est chargée.",
      },
    },
    {
      day: 2,
      title: {
        en: "Museum Quarter and Vondelpark",
        fr: "Quartier des musées et Vondelpark",
      },
      morning: {
        en: "Rijksmuseum at opening with a pre-booked ticket — head straight to the Gallery of Honour and Rembrandt's Night Watch before the crowds land. Two focused hours beats three exhausted ones.",
        fr: "Rijksmuseum à l'ouverture avec un billet réservé à l'avance — fonce direct à la Galerie d'honneur et à la Ronde de nuit de Rembrandt avant l'arrivée de la foule. Deux heures concentrées valent mieux que trois épuisantes.",
      },
      afternoon: {
        en: "Cross Museumplein to the Van Gogh Museum (also timed-entry). After, decompress in Vondelpark — grab a coffee, watch the bikes and joggers, and let your feet recover.",
        fr: "Traverse le Museumplein jusqu'au Van Gogh Museum (billet horodaté aussi). Ensuite, souffle au Vondelpark — un café, les vélos et les joggeurs qui défilent, et tu laisses tes jambes récupérer.",
      },
      evening: {
        en: "Head to De Pijp for dinner — the neighborhood is the city's best-value eating strip. Finish with cocktails or a rooftop drink; it's your one properly late night.",
        fr: "Direction De Pijp pour dîner — c'est le meilleur quartier de la ville question rapport qualité-prix. Termine par des cocktails ou un verre en rooftop ; c'est ta seule vraie soirée tardive.",
      },
    },
    {
      day: 3,
      title: {
        en: "Anne Frank, the Jordaan and markets",
        fr: "Anne Frank, le Jordaan et les marchés",
      },
      morning: {
        en: "Anne Frank House with a ticket booked weeks ahead (it sells out — there's no walk-in). It's sobering and slow; don't schedule anything demanding right after.",
        fr: "Maison d'Anne Frank avec un billet réservé des semaines à l'avance (ça part vite — pas d'entrée sans résa). C'est bouleversant et lent ; ne cale rien d'exigeant juste après.",
      },
      afternoon: {
        en: "Lose the afternoon in the Jordaan's side streets and, if it's Saturday, the Noordermarkt and Lindengracht market. Coffee and a slice of appeltaart at Winkel 43 is basically mandatory.",
        fr: "Perds ton après-midi dans les ruelles du Jordaan et, si c'est samedi, au Noordermarkt et au marché du Lindengracht. Un café et une part d'appeltaart au Winkel 43, c'est quasi obligatoire.",
      },
      evening: {
        en: "Casual dinner near Haarlemmerdijk, then a quiet drink. You've done the big three museums and the two best neighborhoods — tomorrow is the fun contrast across the water.",
        fr: "Dîner décontracté vers le Haarlemmerdijk, puis un verre tranquille. Tu as fait les trois gros musées et les deux meilleurs quartiers — demain, place au contraste marrant de l'autre rive.",
      },
    },
    {
      day: 4,
      title: {
        en: "Noord, NDSM and last canals",
        fr: "Noord, NDSM et derniers canaux",
      },
      morning: {
        en: "Take the free ferry behind Centraal to NDSM Wharf — old shipyard turned street-art and warehouse-culture playground. It's raw, industrial and the opposite of the postcard center.",
        fr: "Prends le ferry gratuit derrière Centraal jusqu'au NDSM Wharf — ancien chantier naval devenu terrain de jeu de street-art et de culture d'entrepôt. C'est brut, industriel, tout l'inverse du centre carte postale.",
      },
      afternoon: {
        en: "Ferry back and go up A'DAM Lookout for the skyline (and the swing if you're brave), or hit the EYE Filmmuseum next door. Then a last slow loop of the canal ring on foot.",
        fr: "Reprends le ferry et monte à l'A'DAM Lookout pour la vue sur la skyline (et la balançoire si tu es cran), ou file au EYE Filmmuseum juste à côté. Ensuite, une dernière boucle tranquille de la ceinture de canaux à pied.",
      },
      evening: {
        en: "Final dinner back in the center or the Nine Streets, a last brown-café beer, and one more bridge at dusk before you pack. Amsterdam is best goodbye'd on foot.",
        fr: "Dernier dîner au centre ou dans les Neuf Rues, une ultime bière en brown café, et un dernier pont au crépuscule avant de faire les valises. Amsterdam, on lui dit au revoir à pied.",
      },
    },
  ],
  pois: [
    {
      name: "Rijksmuseum",
      type: "landmark",
      description: {
        en: "The national museum: Rembrandt, Vermeer and the Dutch Golden Age. Book a timed ticket and go at opening.",
        fr: "Le musée national : Rembrandt, Vermeer et l'âge d'or hollandais. Réserve un billet horodaté et vas-y à l'ouverture.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Rijksmuseum+Amsterdam",
    },
    {
      name: "Van Gogh Museum",
      type: "landmark",
      description: {
        en: "The world's largest Van Gogh collection, laid out chronologically. Timed entry only — no walk-ins.",
        fr: "La plus grande collection de Van Gogh au monde, présentée chronologiquement. Billet horodaté uniquement — pas d'entrée sans résa.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Van+Gogh+Museum+Amsterdam",
    },
    {
      name: "Anne Frank House",
      type: "landmark",
      description: {
        en: "The canal-house annex where Anne Frank hid and wrote her diary. Tickets sell out weeks ahead; book online.",
        fr: "L'annexe de la maison sur canal où Anne Frank s'est cachée et a écrit son journal. Les billets partent des semaines à l'avance ; réserve en ligne.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Anne+Frank+House+Amsterdam",
    },
    {
      name: "Jordaan",
      type: "neighborhood",
      description: {
        en: "The prettiest neighborhood: narrow canals, indie shops, brown cafés and Saturday markets. Ideal for aimless wandering.",
        fr: "Le plus joli quartier : canaux étroits, boutiques indépendantes, brown cafés et marchés du samedi. Parfait pour flâner sans but.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Jordaan+Amsterdam",
    },
    {
      name: "De Pijp",
      type: "neighborhood",
      description: {
        en: "Buzzy, multicultural food district home to the Albert Cuyp market and the city's best-value dinners.",
        fr: "Quartier gastronomique animé et multiculturel, avec le marché Albert Cuyp et les meilleurs dîners rapport qualité-prix de la ville.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=De+Pijp+Amsterdam",
    },
    {
      name: "Vondelpark",
      type: "activity",
      description: {
        en: "The big central park behind the museums — grass, ponds and bikes. Perfect for a coffee and a mid-trip breather.",
        fr: "Le grand parc central derrière les musées — pelouses, étangs et vélos. Idéal pour un café et une pause au milieu du séjour.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Vondelpark+Amsterdam",
    },
    {
      name: "NDSM Wharf",
      type: "neighborhood",
      description: {
        en: "Former shipyard in Noord, now a street-art and warehouse-culture hub. Reach it by free ferry from Centraal.",
        fr: "Ancien chantier naval de Noord, devenu pôle de street-art et de culture d'entrepôt. On y va en ferry gratuit depuis Centraal.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=NDSM+Wharf+Amsterdam",
    },
    {
      name: "A'DAM Lookout",
      type: "landmark",
      description: {
        en: "Rooftop deck across the water with the best 360° skyline view — and Europe's highest swing if you dare.",
        fr: "Terrasse en hauteur de l'autre côté de l'eau, avec la meilleure vue 360° sur la skyline — et la plus haute balançoire d'Europe si tu oses.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=A'DAM+Lookout+Amsterdam",
    },
    {
      name: "Albert Cuyp Market",
      type: "activity",
      description: {
        en: "Long daily street market in De Pijp: stroopwafels made fresh, cheese, snacks and cheap eats.",
        fr: "Long marché de rue quotidien à De Pijp : stroopwafels faits minute, fromages, snacks et bons plans à manger.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Albert+Cuyp+Market+Amsterdam",
    },
    {
      name: "Café 't Smalle",
      type: "bar",
      description: {
        en: "Classic 18th-century brown café on a Jordaan canal, with a tiny waterside terrace. The archetypal Amsterdam drink.",
        fr: "Brown café classique du XVIIIe siècle sur un canal du Jordaan, avec une petite terrasse au bord de l'eau. Le verre amstellodamois par excellence.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Cafe+t+Smalle+Amsterdam",
    },
    {
      name: "Winkel 43",
      type: "restaurant",
      description: {
        en: "Corner café by the Noordermarkt famous for its apple pie (appeltaart). Best on Saturday market mornings.",
        fr: "Café de coin près du Noordermarkt, célèbre pour sa tarte aux pommes (appeltaart). Le mieux, c'est le samedi matin, jour de marché.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=Winkel+43+Amsterdam",
    },
    {
      name: "EYE Filmmuseum",
      type: "activity",
      description: {
        en: "Striking waterfront film museum in Noord, worth it for the building and the cafe view even if you skip a screening.",
        fr: "Musée du cinéma spectaculaire au bord de l'eau à Noord, qui vaut le coup pour le bâtiment et la vue du café, même sans séance.",
      },
      mapsUrl: "https://www.google.com/maps/search/?api=1&query=EYE+Filmmuseum+Amsterdam",
    },
  ],
  budget: {
    perPerson: { low: 470, high: 740, currency: "EUR" },
    breakdown: [
      { category: { en: "Accommodation (3 nights, mid-range share)", fr: "Hébergement (3 nuits, milieu de gamme partagé)" }, amount: 300 },
      { category: { en: "Food & drink", fr: "Nourriture & boissons" }, amount: 180 },
      { category: { en: "Museums & attractions", fr: "Musées & attractions" }, amount: 75 },
      { category: { en: "Local transport & ferries", fr: "Transports locaux & ferries" }, amount: 40 },
      { category: { en: "Canal cruise & extras", fr: "Croisière sur les canaux & extras" }, amount: 50 },
    ],
    note: {
      en: "Excludes flights; accommodation is the swing factor — central canal hotels can double this on peak weekends.",
      fr: "Vols non compris ; l'hébergement fait toute la différence — les hôtels centraux sur les canaux peuvent doubler l'addition les week-ends de pointe.",
    },
  },
  packing: {
    en: [
      "A properly waterproof jacket — Amsterdam rain arrives sideways and without warning",
      "Comfortable, grippy walking shoes for cobbles and bridges",
      "Layers: mornings and canal-side evenings run cold even in summer",
      "A compact umbrella (though wind will fight you for it)",
      "A day bag small enough for museum cloakroom rules",
      "A refillable water bottle — tap water is excellent and free",
      "Pre-booked museum and Anne Frank House tickets saved offline on your phone",
      "A contactless card for trams, ferries and shops (cash is rarely needed)",
    ],
    fr: [
      "Une veste vraiment imperméable — la pluie d'Amsterdam arrive de côté et sans prévenir",
      "Des chaussures de marche confortables et antidérapantes pour les pavés et les ponts",
      "Des couches : les matins et les soirées au bord des canaux sont fraîches, même l'été",
      "Un parapluie compact (même si le vent te le disputera)",
      "Un petit sac assez compact pour les règles de vestiaire des musées",
      "Une gourde réutilisable — l'eau du robinet est excellente et gratuite",
      "Tes billets de musée et Maison d'Anne Frank réservés à l'avance, enregistrés hors ligne sur le téléphone",
      "Une carte sans contact pour les trams, ferries et boutiques (le cash sert rarement)",
    ],
  },
  bestSeason: {
    en: "Late April to June is the sweet spot — tulips, long light and gentle weather before the summer crush. July and August are warm but rammed and pricey; expect rain in any season, so pack for it.",
    fr: "De fin avril à juin, c'est le bon moment — tulipes, longues journées et météo douce avant la cohue estivale. Juillet-août sont chauds mais bondés et chers ; attends-toi à la pluie en toute saison, alors prévois en conséquence.",
  },
  related: ["paris-trip-planner", "barcelona-trip-planner", "rome-trip-planner"],
};

export const tripPlannerDestinations: Destination[] = [
  paris,
  barcelona,
  rome,
  lisbon,
  amsterdam,
];
