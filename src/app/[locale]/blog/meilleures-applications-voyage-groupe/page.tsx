import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const SITE_URL = "https://www.weplanify.com";
const PATHNAME_FR = "/blog/meilleures-applications-voyage-groupe";
const PATHNAME_EN = "/blog/best-group-trip-planner-apps-comparison";

const meta = {
  en: {
    title:
      "Best Apps to Plan a Trip with Friends — Honest Comparison (2026)",
    description:
      "We tested the most popular group travel apps. Find out which one to pick based on your needs: itinerary, budget, polls, packing lists.",
  },
  fr: {
    title:
      "Les Meilleures Applis pour Organiser un Voyage entre Amis (2026)",
    description:
      "On a testé les applis de voyage de groupe les plus populaires. Découvrez laquelle choisir selon vos besoins : itinéraire, budget, sondages, bagages.",
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? meta.fr : meta.en;
  const pathname = locale === "fr" ? PATHNAME_FR : PATHNAME_EN;
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  return {
    title: l.title,
    description: l.description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: l.title,
      description: l.description,
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description: l.description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${PATHNAME_EN}`,
        fr: `${SITE_URL}/fr${PATHNAME_FR}`,
        "x-default": `${SITE_URL}/en${PATHNAME_EN}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

type AppCard = {
  name: string;
  description: string;
  bestFor: string;
  pros: string[];
  cons: string[];
};

type ComparisonRow = {
  app: string;
  itinerary: string;
  polls: string;
  budget: string;
  packing: string;
  multilingual: string;
};

type ContentLocale = {
  readTime: string;
  heroTag: string;
  h1: string;
  intro: string;
  tocTitle: string;
  toc: { id: string; label: string }[];
  sections: {
    whyDedicatedApp: {
      id: string;
      title: string;
      paragraphs: string[];
    };
    whatToLookFor: {
      id: string;
      title: string;
      intro: string;
      criteria: { title: string; text: string }[];
    };
    appsTested: {
      id: string;
      title: string;
      intro: string;
      apps: AppCard[];
    };
    verdict: {
      id: string;
      title: string;
      intro: string;
      tableHeaders: string[];
      tableRows: ComparisonRow[];
      recommendations: { useCase: string; recommendation: string }[];
      outro: string;
    };
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    text: string;
    button: string;
  };
  discoverMore: string;
  readMore: string;
};

const content: { en: ContentLocale; fr: ContentLocale } = {
  en: {
    readTime: "8 min read",
    heroTag: "2026 Comparison",
    h1: "Best Apps to Plan a Trip with Friends — Honest Comparison (2026)",
    intro:
      "We have all been there: a group chat that starts with excitement and slowly devolves into a mess of conflicting screenshots, half-baked spreadsheets, and unanswered polls. Planning a trip with friends should be fun, not a part-time job. So we tested six of the most popular group travel apps to find out which ones actually deliver — and which ones just look good on the App Store.",

    tocTitle: "Table of Contents",
    toc: [
      { id: "why-dedicated-app", label: "Why You Need a Dedicated App" },
      { id: "what-to-look-for", label: "What to Look for in a Group Trip App" },
      { id: "apps-tested", label: "The Apps We Tested" },
      { id: "verdict", label: "Our Verdict" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      whyDedicatedApp: {
        id: "why-dedicated-app",
        title: "Why You Need a Dedicated App",
        paragraphs: [
          "Group chats become chaos fast. What starts as a focused conversation about flights and dates quickly gets buried under memes, voice notes, and tangents about restaurant recommendations from someone's cousin. Within a week, nobody can find the hotel link or remember what dates were agreed on. Important decisions disappear in the scroll.",
          "Spreadsheets do not scale either. Sure, a shared Google Sheet works for two people splitting a weekend cabin. But when you have eight friends trying to plan a ten-day trip across three countries, the spreadsheet becomes a monster. Tabs multiply, formulas break, and half the group never even opens it because it looks overwhelming on their phone.",
          "A dedicated group trip planning tool solves these problems by giving every decision — destinations, dates, activities, budget, packing — its own structured space. No messages to scroll through, no cells to accidentally overwrite. Everyone sees the same information, contributes in their own time, and stays aligned without daily follow-ups. It saves real time and prevents the kind of small misunderstandings that can turn into real conflicts on the road.",
        ],
      },
      whatToLookFor: {
        id: "what-to-look-for",
        title: "What to Look for in a Group Trip App",
        intro:
          "Not all trip planning apps are created equal, especially when a group is involved. Here are the features that actually matter when more than two people need to agree on something:",
        criteria: [
          {
            title: "Collaborative itinerary building",
            text: "Everyone should be able to add suggestions, rearrange days, and see the plan evolve in real time. If only the trip organizer can edit the itinerary, you are back to a dictatorship — not a group trip.",
          },
          {
            title: "Group decision-making tools",
            text: "Polls and votes are essential. Choosing between Lisbon and Barcelona should not take seventeen messages and a passive-aggressive emoji. A simple poll settles it in minutes and gives everyone an equal voice.",
          },
          {
            title: "Shared budget tracking",
            text: "Knowing who paid for what, who owes whom, and how much the trip is costing in real time is non-negotiable for groups. It prevents awkward money conversations and keeps things fair.",
          },
          {
            title: "Packing coordination",
            text: "Shared packing lists prevent the classic scenario where five people bring a speaker and nobody brings sunscreen. Assigning group items to specific people is a small feature with a big impact.",
          },
          {
            title: "Multi-language support",
            text: "If your friend group spans more than one country or language, an app that only works in English is already leaving people out. A bilingual or multilingual interface makes collaboration smoother.",
          },
        ],
      },
      appsTested: {
        id: "apps-tested",
        title: "The Apps We Tested",
        intro:
          "We put each of these apps through a real planning scenario: a week-long trip for six friends, including destination voting, itinerary building, expense tracking, and packing coordination. Here is what we found.",
        apps: [
          {
            name: "WePlanify",
            description:
              "WePlanify is built specifically for group trip planning. The interface walks your group through every stage: choosing a destination via polls, building a collaborative itinerary day by day, tracking shared expenses, and coordinating packing lists. It also includes an AI-powered discovery tool that suggests activities based on your destination and group interests. Available in both English and French, it is one of the few apps that treats multilingual groups as a first-class use case.",
            bestFor: "Groups that want everything in one place — especially bilingual friend groups.",
            pros: [
              "All-in-one: itinerary, polls, budget, and packing lists",
              "Bilingual interface (English and French)",
              "AI-powered activity suggestions",
              "Designed for groups from the ground up",
            ],
            cons: [
              "Newer platform, smaller community than established tools",
              "Mobile app coming soon (responsive web app available now)",
            ],
          },
          {
            name: "Wanderlog",
            description:
              "Wanderlog shines as a map-based itinerary builder. You can pin locations, organize them by day, and visualize your trip on a beautiful interactive map. It is especially satisfying for visual planners who think in terms of geography rather than lists. However, it lacks group decision-making tools like polls, and there is no built-in budget sharing feature. It works best as a personal planner that you can share with others rather than a truly collaborative group tool.",
            bestFor: "Visual planners who want a map-centric itinerary builder.",
            pros: [
              "Excellent map-based interface",
              "Auto-suggestions for nearby attractions",
              "Offline access on mobile",
            ],
            cons: [
              "No polls or group voting",
              "No shared budget tracking",
              "Collaboration feels bolted on, not native",
            ],
          },
          {
            name: "TripIt",
            description:
              "TripIt excels at organizing existing bookings. Forward your confirmation emails and it automatically creates a timeline of flights, hotels, and reservations. For solo travelers and business trips, it is excellent. But it is not designed for group collaboration — there is no way to vote on destinations, build a shared itinerary, or split expenses. Think of it as a personal travel organizer rather than a group planning tool.",
            bestFor: "Organizing booking confirmations for solo or business travel.",
            pros: [
              "Automatic itinerary from forwarded emails",
              "Clean, professional interface",
              "Good for frequent travelers",
            ],
            cons: [
              "Not built for group collaboration",
              "No polls, no budget splitting",
              "Premium features require a subscription",
            ],
          },
          {
            name: "SquadTrip",
            description:
              "SquadTrip takes an interesting approach by positioning itself as a tool for trip hosts. If one person is organizing the trip and others are joining, it works well — you can create a landing page for your trip, collect RSVPs, and even handle payments. But it assumes a host-guest dynamic rather than equal collaboration. If you want everyone to participate equally in planning, it can feel a bit one-directional.",
            bestFor: "Organized hosts managing group signups and payments.",
            pros: [
              "Integrated payment collection",
              "Nice trip landing pages for sharing",
              "Good for structured group events",
            ],
            cons: [
              "Host-centric, less collaborative",
              "No collaborative itinerary building",
              "More suited to organized tours than friend trips",
            ],
          },
          {
            name: "Splitwise",
            description:
              "Splitwise is the gold standard for splitting expenses, and not just for trips. It handles complex splits, different currencies, and uneven shares gracefully. If expense management is your biggest pain point, Splitwise does it better than anyone. But it is not a trip planner — there is no itinerary, no packing list, no destination voting. You will likely use it alongside another tool rather than as your only group trip app.",
            bestFor: "Groups that need bulletproof expense splitting (use it alongside a planner).",
            pros: [
              "Best-in-class expense splitting",
              "Handles multiple currencies beautifully",
              "Works for all kinds of shared expenses, not just travel",
            ],
            cons: [
              "Not a trip planner at all",
              "No itinerary, polls, or packing features",
              "You still need another app for actual trip planning",
            ],
          },
          {
            name: "Cruzmi",
            description:
              "Cruzmi is a French-only mobile app focused on group trip coordination. It covers the basics — suggesting destinations, organizing activities, and managing participants. The interface is clean and mobile-first, which is a plus. However, it is only available in French, which limits its usefulness for international friend groups. The feature set is more basic than some competitors, but for French-speaking groups who want something simple, it does the job.",
            bestFor: "French-speaking groups looking for a simple, mobile-first planning tool.",
            pros: [
              "Clean, mobile-first interface",
              "Made for the French market",
              "Simple and easy to get started",
            ],
            cons: [
              "French only — no English or other languages",
              "Feature set is more limited",
              "Less suited for complex multi-destination trips",
            ],
          },
        ],
      },
      verdict: {
        id: "verdict",
        title: "Our Verdict",
        intro:
          "Here is how the apps stack up across the features that matter most for group trip planning:",
        tableHeaders: ["App", "Itinerary", "Polls", "Budget", "Packing", "Multilingual"],
        tableRows: [
          { app: "WePlanify", itinerary: "Yes", polls: "Yes", budget: "Yes", packing: "Yes", multilingual: "EN + FR" },
          { app: "Wanderlog", itinerary: "Yes", polls: "No", budget: "No", packing: "No", multilingual: "EN" },
          { app: "TripIt", itinerary: "Partial", polls: "No", budget: "No", packing: "No", multilingual: "EN" },
          { app: "SquadTrip", itinerary: "No", polls: "No", budget: "Payments", packing: "No", multilingual: "EN" },
          { app: "Splitwise", itinerary: "No", polls: "No", budget: "Yes", packing: "No", multilingual: "Multi" },
          { app: "Cruzmi", itinerary: "Basic", polls: "Basic", budget: "No", packing: "No", multilingual: "FR" },
        ],
        recommendations: [
          {
            useCase: "You want one tool for everything",
            recommendation: "WePlanify covers itinerary, polls, budget, and packing in a single platform.",
          },
          {
            useCase: "You are a visual, map-first planner",
            recommendation: "Wanderlog is the best itinerary builder for map lovers, but you will need separate tools for budget and decisions.",
          },
          {
            useCase: "You just need expense splitting",
            recommendation: "Splitwise is unbeatable for money management. Pair it with a planning app.",
          },
          {
            useCase: "One person is organizing everything",
            recommendation: "SquadTrip works well when there is a clear host managing the trip.",
          },
        ],
        outro:
          "No single app is perfect for every group. The best choice depends on how your group works — and whether you value simplicity, collaboration, or feature depth. That said, if you want the most complete group planning experience without juggling multiple tools, WePlanify is the strongest option in 2026.",
      },
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the best free app for planning a group trip?",
          a: "It depends on what you need. For an all-in-one solution covering itinerary building, group polls, budget tracking, and packing lists, WePlanify offers the most complete feature set. If you only need expense splitting, Splitwise is excellent. For map-based itineraries, Wanderlog has a generous free tier. The best approach is to pick one primary tool that handles your biggest pain point — usually coordinating decisions and sharing costs.",
        },
        {
          q: "How do you plan a trip with friends without stress?",
          a: "The biggest sources of stress are unclear decisions, money disagreements, and communication overload. Use a dedicated planning app instead of group chats so that every decision has its own space. Vote on destinations and activities using polls so no one feels steamrolled. Track shared expenses in real time so there are no surprises at the end. And build in buffer time — over-planning is as stressful as no planning at all.",
        },
        {
          q: "How do you split costs on a group trip?",
          a: "The fairest approach is to track expenses as they happen rather than trying to reconcile at the end. Use Splitwise or a built-in budget tracker like WePlanify to log every shared expense — accommodations, meals, taxis, activities — with who paid and who participated. At the end of the trip, the app calculates the simplest way to settle up so you are not passing money around for weeks afterward.",
        },
        {
          q: "Is there a group travel app available in French?",
          a: "Yes. WePlanify offers a full bilingual experience in English and French, which makes it ideal for friend groups that span both languages. Cruzmi is a French-only app for more basic group coordination. Most other popular trip planning apps like Wanderlog and TripIt are English-only or have limited localization.",
        },
      ],
    },

    cta: {
      title: "Ready to Plan Your Next Group Trip?",
      text: "Stop juggling five different apps and a chaotic group chat. WePlanify brings itinerary building, group polls, budget tracking, and packing lists into one collaborative space — so your group can actually agree on something.",
      button: "Start Planning Together",
    },

    discoverMore: "Discover More",
    readMore: "Read more",
  },

  fr: {
    readTime: "8 min de lecture",
    heroTag: "Comparatif 2026",
    h1: "Les Meilleures Applis pour Organiser un Voyage entre Amis (2026)",
    intro:
      "On est tous passés par là : un groupe WhatsApp qui commence dans l'euphorie et qui finit en capharnaüm de captures d'écran contradictoires, de tableurs jamais ouverts et de sondages restés sans réponse. Organiser un voyage entre amis devrait être un plaisir, pas un second boulot. Alors on a testé six des applications de voyage de groupe les plus populaires pour voir lesquelles tiennent vraiment leurs promesses — et lesquelles se contentent d'une belle fiche sur l'App Store.",

    tocTitle: "Sommaire",
    toc: [
      { id: "why-dedicated-app", label: "Pourquoi utiliser une appli dédiée" },
      { id: "what-to-look-for", label: "Ce qu'il faut chercher dans une appli de voyage de groupe" },
      { id: "apps-tested", label: "Les applis qu'on a testées" },
      { id: "verdict", label: "Notre verdict" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      whyDedicatedApp: {
        id: "why-dedicated-app",
        title: "Pourquoi utiliser une appli dédiée",
        paragraphs: [
          "Les conversations de groupe virent au chaos en quelques jours. Ce qui démarre comme une discussion sérieuse sur les dates et les vols se retrouve noyé sous les memes, les vocaux de trois minutes et les recommandations de restos du cousin de quelqu'un. En une semaine, plus personne ne retrouve le lien de l'hôtel ni ne se souvient des dates validées. Les décisions importantes disparaissent dans le scroll.",
          "Les tableurs ne passent pas à l'échelle non plus. Un Google Sheet partagé, ça marche pour deux personnes qui se partagent un chalet le temps d'un week-end. Mais quand vous êtes huit potes à planifier dix jours à travers trois pays, le tableur devient un monstre. Les onglets se multiplient, les formules cassent, et la moitié du groupe ne l'ouvre jamais parce que c'est illisible sur mobile.",
          "Une application dédiée à la planification de voyage de groupe résout ces problèmes en donnant à chaque décision — destinations, dates, activités, budget, bagages — son propre espace structuré. Pas de messages à remonter, pas de cellules à écraser par erreur. Tout le monde voit les mêmes informations, contribue à son rythme et reste aligné sans relances quotidiennes. Ça fait gagner un temps réel et ça évite les petits malentendus qui peuvent devenir de vrais conflits une fois sur place.",
        ],
      },
      whatToLookFor: {
        id: "what-to-look-for",
        title: "Ce qu'il faut chercher dans une appli de voyage de groupe",
        intro:
          "Toutes les applis de planification de voyage ne se valent pas, surtout quand un groupe est impliqué. Voici les fonctionnalités qui comptent vraiment quand plus de deux personnes doivent se mettre d'accord :",
        criteria: [
          {
            title: "Construction collaborative de l'itinéraire",
            text: "Tout le monde devrait pouvoir ajouter des suggestions, réorganiser les journées et voir le plan évoluer en temps réel. Si seul l'organisateur peut modifier l'itinéraire, on retombe dans la dictature — pas dans le voyage de groupe.",
          },
          {
            title: "Outils de décision de groupe",
            text: "Les sondages et les votes sont essentiels. Choisir entre Lisbonne et Barcelone ne devrait pas prendre dix-sept messages et un emoji passif-agressif. Un simple sondage tranche la question en quelques minutes et donne une voix égale à chacun.",
          },
          {
            title: "Suivi de budget partagé",
            text: "Savoir qui a payé quoi, qui doit combien à qui et combien le voyage coûte en temps réel est non négociable pour un groupe. Ça évite les conversations gênantes sur l'argent et ça maintient l'équité.",
          },
          {
            title: "Coordination des bagages",
            text: "Les listes de bagages partagées évitent le scénario classique où cinq personnes ramènent une enceinte et personne n'a pensé à la crème solaire. Assigner les objets communs à des personnes spécifiques, c'est une petite fonctionnalité avec un gros impact.",
          },
          {
            title: "Support multilingue",
            text: "Si votre groupe d'amis s'étend sur plusieurs pays ou langues, une appli uniquement en anglais exclut déjà des gens. Une interface bilingue ou multilingue rend la collaboration plus fluide pour tout le monde.",
          },
        ],
      },
      appsTested: {
        id: "apps-tested",
        title: "Les applis qu'on a testées",
        intro:
          "On a soumis chaque application à un scénario de planification réel : un voyage d'une semaine pour six amis, incluant le vote de destination, la construction d'itinéraire, le suivi des dépenses et la coordination des bagages. Voici ce qu'on a trouvé.",
        apps: [
          {
            name: "WePlanify",
            description:
              "WePlanify est conçu spécifiquement pour la planification de voyage de groupe. L'interface guide votre groupe à chaque étape : choisir une destination via des sondages, construire un itinéraire collaboratif jour par jour, suivre les dépenses partagées et coordonner les listes de bagages. L'appli inclut aussi un outil de découverte alimenté par l'IA qui suggère des activités en fonction de votre destination et des intérêts du groupe. Disponible en français et en anglais, c'est l'une des rares applis qui traite les groupes multilingues comme un cas d'usage de premier plan.",
            bestFor: "Les groupes qui veulent tout au même endroit — surtout les bandes d'amis bilingues.",
            pros: [
              "Tout-en-un : itinéraire, sondages, budget et listes de bagages",
              "Interface bilingue (français et anglais)",
              "Suggestions d'activités par IA",
              "Pensé pour les groupes dès la conception",
            ],
            cons: [
              "Plateforme plus récente, communauté plus petite que les outils établis",
              "Appli mobile en cours de développement (webapp responsive disponible)",
            ],
          },
          {
            name: "Wanderlog",
            description:
              "Wanderlog brille comme constructeur d'itinéraire basé sur une carte. On peut épingler des lieux, les organiser par jour et visualiser son voyage sur une belle carte interactive. C'est particulièrement satisfaisant pour les planificateurs visuels qui raisonnent en termes de géographie plutôt que de listes. En revanche, il manque les outils de décision de groupe comme les sondages, et il n'y a pas de suivi de budget partagé intégré. Ça fonctionne mieux comme planificateur personnel qu'on partage avec les autres plutôt que comme un vrai outil collaboratif.",
            bestFor: "Les planificateurs visuels qui veulent un itinéraire centré sur la carte.",
            pros: [
              "Excellente interface cartographique",
              "Suggestions automatiques d'attractions à proximité",
              "Accès hors ligne sur mobile",
            ],
            cons: [
              "Pas de sondages ni de votes de groupe",
              "Pas de suivi de budget partagé",
              "La collaboration semble ajoutée après coup, pas native",
            ],
          },
          {
            name: "TripIt",
            description:
              "TripIt excelle dans l'organisation des réservations existantes. Transférez vos emails de confirmation et il crée automatiquement une chronologie de vols, d'hôtels et de réservations. Pour les voyageurs solo et les déplacements professionnels, c'est excellent. Mais ce n'est pas conçu pour la collaboration de groupe — pas moyen de voter sur les destinations, de construire un itinéraire partagé ou de partager les dépenses. Voyez-le comme un organisateur de voyage personnel plutôt qu'un outil de planification de groupe.",
            bestFor: "Organiser ses confirmations de réservation pour les voyages solo ou pro.",
            pros: [
              "Itinéraire automatique à partir des emails transférés",
              "Interface propre et professionnelle",
              "Bien pour les voyageurs fréquents",
            ],
            cons: [
              "Pas conçu pour la collaboration de groupe",
              "Pas de sondages, pas de partage de budget",
              "Les fonctionnalités premium nécessitent un abonnement",
            ],
          },
          {
            name: "SquadTrip",
            description:
              "SquadTrip prend une approche intéressante en se positionnant comme un outil pour les organisateurs de voyage. Si une personne organise le voyage et que les autres rejoignent, ça fonctionne bien — on peut créer une page de présentation du voyage, collecter les inscriptions et même gérer les paiements. Mais ça suppose une dynamique organisateur/participant plutôt qu'une collaboration entre égaux. Si vous voulez que tout le monde participe à la planification, ça peut sembler un peu à sens unique.",
            bestFor: "Les organisateurs qui gèrent les inscriptions et les paiements d'un groupe.",
            pros: [
              "Collecte de paiement intégrée",
              "Belles pages de présentation de voyage",
              "Bien pour les événements de groupe structurés",
            ],
            cons: [
              "Centré sur l'organisateur, moins collaboratif",
              "Pas de construction d'itinéraire collaborative",
              "Plus adapté aux voyages organisés qu'aux trips entre amis",
            ],
          },
          {
            name: "Splitwise",
            description:
              "Splitwise est la référence absolue pour le partage de dépenses, et pas seulement pour les voyages. Il gère les répartitions complexes, les différentes devises et les parts inégales avec élégance. Si la gestion des dépenses est votre plus gros point de douleur, Splitwise le fait mieux que quiconque. Mais ce n'est pas un planificateur de voyage — pas d'itinéraire, pas de liste de bagages, pas de vote de destination. Vous l'utiliserez probablement en complément d'un autre outil plutôt que comme votre unique appli de voyage de groupe.",
            bestFor: "Les groupes qui ont besoin d'un partage de dépenses béton (à utiliser en complément d'un planificateur).",
            pros: [
              "Meilleur outil de partage de dépenses du marché",
              "Gère plusieurs devises parfaitement",
              "Fonctionne pour tout type de dépenses partagées, pas seulement le voyage",
            ],
            cons: [
              "Ce n'est pas du tout un planificateur de voyage",
              "Pas d'itinéraire, de sondages ou de fonctionnalités bagages",
              "Il faut quand même une autre appli pour la planification",
            ],
          },
          {
            name: "Cruzmi",
            description:
              "Cruzmi est une application mobile française dédiée à la coordination de voyages de groupe. Elle couvre les bases — suggérer des destinations, organiser des activités et gérer les participants. L'interface est propre et pensée mobile-first, ce qui est un plus. Cependant, elle n'est disponible qu'en français, ce qui limite son utilité pour les groupes d'amis internationaux. Le panel de fonctionnalités est plus basique que certains concurrents, mais pour les groupes francophones qui veulent quelque chose de simple, ça fait le travail.",
            bestFor: "Les groupes francophones qui cherchent un outil simple et mobile-first.",
            pros: [
              "Interface propre, pensée mobile-first",
              "Faite pour le marché français",
              "Simple et rapide à prendre en main",
            ],
            cons: [
              "Uniquement en français — pas d'anglais ni d'autres langues",
              "Panel de fonctionnalités plus limité",
              "Moins adapté aux voyages complexes multi-destinations",
            ],
          },
        ],
      },
      verdict: {
        id: "verdict",
        title: "Notre verdict",
        intro:
          "Voici comment les applis se positionnent sur les fonctionnalités qui comptent le plus pour la planification de voyage de groupe :",
        tableHeaders: ["Appli", "Itinéraire", "Sondages", "Budget", "Bagages", "Multilingue"],
        tableRows: [
          { app: "WePlanify", itinerary: "Oui", polls: "Oui", budget: "Oui", packing: "Oui", multilingual: "EN + FR" },
          { app: "Wanderlog", itinerary: "Oui", polls: "Non", budget: "Non", packing: "Non", multilingual: "EN" },
          { app: "TripIt", itinerary: "Partiel", polls: "Non", budget: "Non", packing: "Non", multilingual: "EN" },
          { app: "SquadTrip", itinerary: "Non", polls: "Non", budget: "Paiements", packing: "Non", multilingual: "EN" },
          { app: "Splitwise", itinerary: "Non", polls: "Non", budget: "Oui", packing: "Non", multilingual: "Multi" },
          { app: "Cruzmi", itinerary: "Basique", polls: "Basique", budget: "Non", packing: "Non", multilingual: "FR" },
        ],
        recommendations: [
          {
            useCase: "Vous voulez un seul outil pour tout",
            recommendation: "WePlanify couvre itinéraire, sondages, budget et bagages sur une seule plateforme.",
          },
          {
            useCase: "Vous êtes un planificateur visuel, carte en main",
            recommendation: "Wanderlog est le meilleur constructeur d'itinéraire pour les amoureux des cartes, mais il vous faudra d'autres outils pour le budget et les décisions.",
          },
          {
            useCase: "Vous avez juste besoin de partager les frais",
            recommendation: "Splitwise est imbattable pour la gestion des dépenses. Combinez-le avec une appli de planification.",
          },
          {
            useCase: "Une seule personne organise tout",
            recommendation: "SquadTrip fonctionne bien quand il y a un organisateur clairement identifié qui gère le voyage.",
          },
        ],
        outro:
          "Aucune appli n'est parfaite pour tous les groupes. Le meilleur choix dépend de comment votre groupe fonctionne — et de si vous privilégiez la simplicité, la collaboration ou la profondeur fonctionnelle. Cela dit, si vous voulez l'expérience de planification de groupe la plus complète sans jongler entre plusieurs outils, WePlanify est l'option la plus solide en 2026.",
      },
    },

    faq: {
      title: "Questions Fréquentes",
      items: [
        {
          q: "Quelle est la meilleure application gratuite pour organiser un voyage de groupe ?",
          a: "Ça dépend de vos besoins. Pour une solution tout-en-un couvrant l'itinéraire, les sondages de groupe, le suivi de budget et les listes de bagages, WePlanify offre le panel de fonctionnalités le plus complet. Si vous n'avez besoin que du partage de dépenses, Splitwise est excellent. Pour un itinéraire visuel sur carte, Wanderlog propose un niveau gratuit généreux. Le mieux est de choisir un outil principal qui répond à votre plus gros besoin — souvent la coordination des décisions et le partage des frais.",
        },
        {
          q: "Comment organiser un voyage entre amis sans prise de tête ?",
          a: "Les plus grosses sources de stress sont les décisions floues, les désaccords d'argent et la surcharge de messages. Utilisez une appli de planification dédiée plutôt que les conversations de groupe pour que chaque décision ait son espace propre. Votez sur les destinations et les activités via des sondages pour que personne ne se sente mis de côté. Suivez les dépenses partagées en temps réel pour éviter les surprises à la fin. Et prévoyez du temps tampon — trop planifier est aussi stressant que ne rien planifier du tout.",
        },
        {
          q: "Comment partager les frais d'un voyage de groupe ?",
          a: "L'approche la plus juste est de suivre les dépenses au fil de l'eau plutôt que d'essayer de tout réconcilier à la fin. Utilisez Splitwise ou un suivi de budget intégré comme celui de WePlanify pour enregistrer chaque dépense partagée — hébergement, repas, taxis, activités — en notant qui a payé et qui a participé. À la fin du voyage, l'appli calcule la manière la plus simple de se rembourser pour éviter de se passer de l'argent pendant des semaines.",
        },
        {
          q: "Existe-t-il une appli de voyage de groupe en français ?",
          a: "Oui. WePlanify propose une expérience entièrement bilingue français-anglais, ce qui en fait un choix idéal pour les groupes d'amis qui parlent les deux langues. Cruzmi est une appli uniquement en français pour une coordination de groupe plus basique. La plupart des autres applis populaires comme Wanderlog et TripIt sont uniquement en anglais ou ont une localisation limitée.",
        },
      ],
    },

    cta: {
      title: "Prêt à organiser votre prochain voyage de groupe ?",
      text: "Arrêtez de jongler entre cinq applis différentes et un groupe WhatsApp chaotique. WePlanify réunit itinéraire, sondages, budget et listes de bagages dans un seul espace collaboratif — pour que votre groupe puisse enfin se mettre d'accord.",
      button: "Commencer à planifier ensemble",
    },

    discoverMore: "Découvrir aussi",
    readMore: "En savoir plus",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD Schemas
// ---------------------------------------------------------------------------

function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "fr"
            ? "Meilleures applis voyage de groupe"
            : "Best group trip planner apps",
        item: `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqJsonLd({ locale }: { locale: string }) {
  const c = locale === "fr" ? content.fr : content.en;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleJsonLd({ locale }: { locale: string }) {
  const c = locale === "fr" ? content.fr : content.en;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: locale === "fr" ? meta.fr.description : meta.en.description,
    author: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    datePublished: "2026-03-31",
    dateModified: "2026-03-31",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function BestGroupTripAppsComparisonPage({
  params,
}: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = locale === "fr" ? content.fr : content.en;

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null,
  ] = await Promise.all([
    sanityFetch<NavType>({
      query: navQuery,
      params: { locale },
      tags: ["nav"],
    }),
    sanityFetch<Navigation>({
      query: navigationQuery,
      params: { locale },
      tags: ["navigation"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      params: { locale },
      tags: ["footer"],
    }),
  ]);

  return (
    <>
      <AuthorJsonLd />
      <BreadcrumbJsonLd locale={locale} />
      <FaqJsonLd locale={locale} />
      <ArticleJsonLd locale={locale} />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  {
                    label: locale === "fr" ? "Accueil" : "Home",
                    href: `/${locale}`,
                  },
                  {
                    label: "Blog",
                    href: `/${locale}/blog`,
                  },
                  {
                    label:
                      locale === "fr"
                        ? "Meilleures applis voyage de groupe"
                        : "Best group trip planner apps",
                  },
                ]}
              />
            </div>
            <span className="inline-block bg-[#EEF899] text-[#001E13] text-sm font-karla font-semibold px-4 py-1.5 rounded-full mb-6">
              {c.heroTag}
            </span>
            <h1 className="text-[#001E13] text-3xl lg:text-[44px] font-londrina-solid leading-tight mb-4">
              {c.h1}
            </h1>
            <p className="text-[#001E13]/60 text-sm font-karla mb-6">
              {c.readTime}
            </p>
            <p className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
              {c.intro}
            </p>
          </div>
        </header>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <AuthorBio
            locale={locale}
            publishedDate="2026-03-31"
            modifiedDate="2026-03-31"
          />
        </div>

        {/* Table of Contents */}
        <nav aria-label={c.tocTitle} className="py-10 lg:py-12 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-5">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2">
              {c.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[#001E13]/70 hover:text-[#F6391A] font-karla text-sm lg:text-base transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Section: Why You Need a Dedicated App */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">
            <section id={c.sections.whyDedicatedApp.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.whyDedicatedApp.title}
              </h2>
              <div className="space-y-4">
                {c.sections.whyDedicatedApp.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section: What to Look For */}
            <section id={c.sections.whatToLookFor.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.whatToLookFor.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.whatToLookFor.intro}
              </p>
              <div className="grid gap-4">
                {c.sections.whatToLookFor.criteria.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Apps Tested */}
            <section id={c.sections.appsTested.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.appsTested.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.appsTested.intro}
              </p>
              <div className="space-y-6">
                {c.sections.appsTested.apps.map((app, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8"
                  >
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-3">
                      {app.name}
                    </h3>
                    <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-4">
                      {app.description}
                    </p>
                    <p className="text-[#F6391A] font-karla font-bold text-sm mb-4">
                      {locale === "fr" ? "Idéal pour : " : "Best for: "}
                      <span className="text-[#001E13]/70 font-normal">
                        {app.bestFor}
                      </span>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="font-karla font-semibold text-[#001E13] text-sm mb-2">
                          {locale === "fr" ? "Points forts" : "Pros"}
                        </p>
                        <ul className="space-y-1">
                          {app.pros.map((pro, j) => (
                            <li
                              key={j}
                              className="text-[#001E13]/70 text-sm font-karla flex items-start gap-2"
                            >
                              <span className="text-green-600 mt-0.5 flex-shrink-0">
                                +
                              </span>
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="font-karla font-semibold text-[#001E13] text-sm mb-2">
                          {locale === "fr" ? "Points faibles" : "Cons"}
                        </p>
                        <ul className="space-y-1">
                          {app.cons.map((con, j) => (
                            <li
                              key={j}
                              className="text-[#001E13]/70 text-sm font-karla flex items-start gap-2"
                            >
                              <span className="text-[#F6391A] mt-0.5 flex-shrink-0">
                                -
                              </span>
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Verdict */}
            <section id={c.sections.verdict.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.verdict.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.verdict.intro}
              </p>

              {/* Comparison table */}
              <div className="overflow-x-auto mb-10">
                <table className="w-full text-sm font-karla border-collapse">
                  <thead>
                    <tr className="bg-[#001E13] text-[#FFFBF5]">
                      {c.sections.verdict.tableHeaders.map((header, i) => (
                        <th
                          key={i}
                          className="px-4 py-3 text-left font-semibold first:rounded-tl-xl last:rounded-tr-xl"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {c.sections.verdict.tableRows.map((row, i) => (
                      <tr
                        key={i}
                        className={`border-b border-[#001E13]/10 ${
                          i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"
                        }`}
                      >
                        <td className="px-4 py-3 font-semibold text-[#001E13]">
                          {row.app}
                        </td>
                        <td className="px-4 py-3 text-[#001E13]/70">
                          {row.itinerary}
                        </td>
                        <td className="px-4 py-3 text-[#001E13]/70">
                          {row.polls}
                        </td>
                        <td className="px-4 py-3 text-[#001E13]/70">
                          {row.budget}
                        </td>
                        <td className="px-4 py-3 text-[#001E13]/70">
                          {row.packing}
                        </td>
                        <td className="px-4 py-3 text-[#001E13]/70">
                          {row.multilingual}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recommendations */}
              <div className="grid gap-4 mb-8">
                {c.sections.verdict.recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-5"
                  >
                    <p className="font-karla font-bold text-[#001E13] text-sm mb-1">
                      {rec.useCase}
                    </p>
                    <p className="text-[#001E13]/70 text-sm font-karla leading-relaxed">
                      {rec.recommendation}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed">
                {c.sections.verdict.outro}
              </p>
            </section>
          </div>
        </article>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* FAQ */}
        <section id="faq" className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-8">
              {c.faq.title}
            </h2>
            <div className="space-y-6">
              {c.faq.items.map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-[#001E13]/10 pb-5"
                >
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Discover More */}
        <section className="py-16 lg:py-20 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {c.discoverMore}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                href={`/${locale}/alternatives/best-group-trip-planner-apps`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Comparatif Détaillé"
                      : "Detailed Comparison"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Un comparatif approfondi des meilleures applications de planification de voyage de groupe."
                      : "An in-depth comparison of the best group trip planner apps on the market."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir le comparatif" : "View comparison"}{" "}
                    →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Guide Complet"
                      : "Complete Guide"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comment organiser un voyage de groupe de A à Z, étape par étape."
                      : "How to plan a group trip from start to finish, step by step."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Voyage entre Amis"
                      : "Trip with Friends"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Organisez un voyage de groupe entre amis facilement avec WePlanify."
                      : "Plan a group trip with friends effortlessly using WePlanify."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#F6391A] rounded-3xl p-8 lg:p-14">
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl font-londrina-solid mb-4">
                {c.cta.title}
              </h2>
              <p className="text-[#FFFBF5]/90 text-sm lg:text-base font-karla leading-relaxed mb-8 max-w-xl mx-auto">
                {c.cta.text}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#001E13] hover:bg-[#001E13]/85 text-[#FFFBF5] font-karla font-bold text-sm lg:text-base px-8 py-3.5 rounded-full transition-colors"
              >
                {c.cta.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
