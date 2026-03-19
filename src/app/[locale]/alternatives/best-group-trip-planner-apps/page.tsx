import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = {
  params: Promise<{ locale: string }>;
};

type AppEntry = {
  name: string;
  tagline: string;
  description: string;
  bestFor: string;
  strengths: string[];
  limitations: string[];
  price: string;
  isWePlanify?: boolean;
};

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
const PATHNAME = "/alternatives/best-group-trip-planner-apps";

const meta = {
  en: {
    title: "10 Best Group Trip Planner Apps in 2026 — Complete Guide",
    description:
      "Discover the 10 best group trip planner apps in 2026. Compare features, pricing, and find the perfect tool to plan your next group adventure with friends or family.",
    keywords: [
      "best group trip planner apps",
      "best group travel apps 2026",
      "top trip planning apps for groups",
      "group trip planning tools",
      "collaborative travel planning apps",
    ],
  },
  fr: {
    title:
      "Les 10 Meilleures Applications pour Organiser un Voyage de Groupe en 2026",
    description:
      "Découvrez les 10 meilleures applications pour planifier un voyage de groupe en 2026. Comparez les fonctionnalités, les prix et trouvez l'outil parfait pour organiser votre prochaine aventure entre amis ou en famille.",
    keywords: [
      "meilleures applications voyage groupe",
      "top applications planification voyage 2026",
      "applications organiser voyage groupe",
      "outils planification voyage collectif",
      "applications voyage collaboratif",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? meta.fr : meta.en;
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    title: l.title,
    description: l.description,
    keywords: l.keywords,
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
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const content = {
  en: {
    heroTag: "Complete Guide",
    readTime: "10 min read",
    h1: "10 Best Group Trip Planner Apps in 2026",
    intro:
      "Planning a group trip is notoriously difficult. Between coordinating schedules, splitting costs, voting on destinations, and building an itinerary that works for everyone, you need the right tools. We tested and compared the most popular group travel planning apps available in 2026 to help you pick the one that fits your crew. Here are our top 10, ranked by overall usefulness for group travel.",

    rankingTitle: "How We Ranked These Apps",
    rankingIntro:
      "We evaluated each app across five criteria that matter most for group travel planning:",
    rankingCriteria: [
      {
        title: "Feature completeness",
        desc: "Does the app cover itinerary building, budgeting, polls, packing lists, and activity discovery — or only one or two of these?",
      },
      {
        title: "Group-specific tools",
        desc: "Does it offer voting, real-time collaboration, shared expense tracking, and other features designed for multiple people planning together?",
      },
      {
        title: "Pricing",
        desc: "Is the app free or freemium? Are the most useful features locked behind a paywall?",
      },
      {
        title: "Ease of use",
        desc: "Can a non-technical person set up a trip and invite friends in under five minutes?",
      },
      {
        title: "Language support",
        desc: "Is the app available in multiple languages, including French?",
      },
    ],

    apps: [
      {
        name: "WePlanify",
        tagline: "All-in-one free group trip planner",
        description:
          "WePlanify is the most complete free tool for planning group trips. It combines itinerary building, group polls, shared budget tracking, packing lists, and AI-powered activity discovery in a single collaborative platform. Every feature is free with no hidden paywalls or trial limits.",
        bestFor: "Friend groups wanting everything in one place",
        strengths: [
          "All-in-one: itinerary, polls, budget, packing lists, and activity discovery",
          "Free forever with no feature restrictions",
          "Fully bilingual (English and French)",
        ],
        limitations: [
          "Mobile app coming soon (currently a responsive web app)",
        ],
        price: "Free",
        isWePlanify: true,
      },
      {
        name: "Wanderlog",
        tagline: "Map-based itinerary builder with collaboration",
        description:
          "Wanderlog offers a beautifully designed, map-centric itinerary builder that makes visualizing your route easy. It supports collaboration so multiple people can edit the trip plan, and it has a well-regarded mobile app. It is strongest for visual planners who want to see their trip on a map.",
        bestFor: "Visual planners and road trips",
        strengths: [
          "Excellent map integration and route visualization",
          "Polished mobile app for iOS and Android",
          "Good restaurant and attraction recommendations",
        ],
        limitations: [
          "No group polls or voting features",
          "No shared budget tracking — only available in English",
        ],
        price: "Free with Pro at $8/month",
      },
      {
        name: "SquadTrip",
        tagline: "Payment collection and guest management",
        description:
          "SquadTrip is designed specifically for group trip organizers who need to collect money from participants and manage RSVPs. It includes voting features, budget splitting, and a clean guest management dashboard. It is particularly strong for the organizational side of group travel.",
        bestFor: "Trip organizers handling money",
        strengths: [
          "Built-in payment collection from group members",
          "Guest management with RSVP tracking",
          "Group voting on itinerary options",
        ],
        limitations: [
          "No packing lists or activity discovery",
          "English only",
        ],
        price: "Free with paid features for organizers",
      },
      {
        name: "TripIt",
        tagline: "Auto-import bookings from email",
        description:
          "TripIt has been around for years and excels at one thing: turning confirmation emails into an organized itinerary. Forward your booking emails and TripIt assembles a clean timeline. The Pro plan adds real-time flight alerts, seat tracking, and alternative flight notifications.",
        bestFor: "Business travelers and solo organizers",
        strengths: [
          "Automatic itinerary creation from forwarded emails",
          "Excellent for managing complex multi-leg trips",
          "Real-time flight status alerts (Pro)",
        ],
        limitations: [
          "Limited group collaboration features",
          "Most useful features require Pro subscription ($49/year)",
        ],
        price: "Free basic, Pro at $49/year",
      },
      {
        name: "Splitwise",
        tagline: "Expense splitting gold standard",
        description:
          "Splitwise is not a trip planner — it is the best app for tracking shared expenses. Most group travelers end up using it alongside their planning tool to keep track of who owes what. It handles complex splits, multiple currencies, and group balances with ease.",
        bestFor: "Tracking who owes what",
        strengths: [
          "Best-in-class expense splitting with complex split options",
          "Multi-currency support",
          "Widely adopted — most people already have it",
        ],
        limitations: [
          "Not a trip planner — no itinerary, polls, or packing features",
          "Pro required ($4.99/mo) for receipt scanning and charts",
        ],
        price: "Free, Pro at $4.99/month",
      },
      {
        name: "Troupe",
        tagline: "Group decision-making with ranked voting",
        description:
          "Troupe focuses on the hardest part of group travel: making decisions together. It lets groups suggest, discuss, and vote on activities using ranked voting. It also offers activity discovery with local recommendations. Think of it as a decision-making tool that happens to be built for trips.",
        bestFor: "Groups who can't agree on anything",
        strengths: [
          "Ranked voting system for group decisions",
          "Activity discovery with local recommendations",
          "Clean mobile app experience",
        ],
        limitations: [
          "No budget tracking or packing lists",
          "English only",
        ],
        price: "Free",
      },
      {
        name: "AvoSquado",
        tagline: "Bedroom assignments and bookable activities",
        description:
          "AvoSquado is a newer player that tackles a unique niche: managing large vacation rentals with bedroom assignments, and offering bookable group activities. If your group trip revolves around a big house and you need to coordinate who sleeps where and what to do nearby, it is a specialized but useful tool.",
        bestFor: "Large vacation rentals with many guests",
        strengths: [
          "Unique bedroom assignment feature",
          "Bookable activities integrated into planning",
          "Purpose-built for large group stays",
        ],
        limitations: [
          "Narrow focus — not a full trip planner",
          "Smaller user base means less community content",
        ],
        price: "Free",
      },
      {
        name: "Cruzmi",
        tagline: "French collaborative event organizer",
        description:
          "Cruzmi is a French-first collaborative planning tool that works well for organizing events and group outings. It supports polls, shared to-do lists, and budget tracking. It is best suited for French-speaking groups who want a simple, no-fuss planning experience.",
        bestFor: "French-speaking groups planning events",
        strengths: [
          "Native French-language experience",
          "Simple polls and shared to-do lists",
          "Clean, straightforward interface",
        ],
        limitations: [
          "Limited itinerary building features",
          "Smaller feature set compared to dedicated trip planners",
        ],
        price: "Free",
      },
      {
        name: "Let's Jetty",
        tagline: "Delightful itinerary maker for friends",
        description:
          "Let's Jetty brings a fresh, visually appealing approach to group itinerary planning. It focuses on making the planning experience itself fun, with a clean interface and smooth collaboration. It is ideal for smaller friend groups who value aesthetics and simplicity over feature depth.",
        bestFor: "Small friend groups wanting a clean experience",
        strengths: [
          "Beautiful, intuitive design",
          "Smooth real-time collaboration",
          "Focus on making planning enjoyable",
        ],
        limitations: [
          "Fewer features than all-in-one platforms",
          "No budget tracking or polls",
        ],
        price: "Free",
      },
      {
        name: "Google Sheets",
        tagline: "The DIY approach that never dies",
        description:
          "Let's be honest — plenty of groups still plan their trips in a shared Google Sheet. It is infinitely customizable, everyone already knows how to use it, and it costs nothing. The trade-off is that you are building everything from scratch: budget formulas, itinerary layouts, and packing checklists. No automation, no travel-specific features, just raw spreadsheet power.",
        bestFor: "Control freaks with spreadsheet skills",
        strengths: [
          "Infinitely flexible and customizable",
          "Free and universally accessible",
          "No learning curve for most people",
        ],
        limitations: [
          "No travel-specific features — you build everything yourself",
          "No mobile-friendly experience for trip viewing",
        ],
        price: "Free",
      },
    ] as AppEntry[],

    summaryTitle: "Comparison Summary",
    summaryFeatures: [
      "Itinerary",
      "Polls",
      "Budget",
      "Packing",
      "Free",
      "French",
    ],
    summaryData: [
      { name: "WePlanify", values: [true, true, true, true, true, true] },
      { name: "Wanderlog", values: [true, false, false, true, true, false] },
      { name: "SquadTrip", values: [true, true, true, false, true, false] },
      { name: "TripIt", values: [true, false, false, false, "freemium", false] },
      { name: "Splitwise", values: [false, false, true, false, "freemium", true] },
      { name: "Troupe", values: [true, true, false, false, true, false] },
      { name: "AvoSquado", values: [false, false, false, false, true, false] },
      { name: "Cruzmi", values: [false, true, true, false, true, true] },
      { name: "Let's Jetty", values: [true, false, false, false, true, false] },
      { name: "Google Sheets", values: ["diy", "diy", "diy", "diy", true, true] },
    ],

    ctaTitle: "Ready to plan your next group trip?",
    ctaText:
      "Stop juggling multiple apps and spreadsheets. WePlanify brings itinerary planning, group polls, budget tracking, packing lists, and AI-powered recommendations into one free platform.",
    ctaButton: "Start planning for free",
    ctaSub: "Free forever. No credit card required.",

    diy: "DIY",
    freemium: "Freemium",
  },

  fr: {
    heroTag: "Guide Complet",
    readTime: "10 min de lecture",
    h1: "Les 10 Meilleures Applications pour Organiser un Voyage de Groupe en 2026",
    intro:
      "Organiser un voyage de groupe est notoirement difficile. Entre la coordination des agendas, le partage des frais, le vote sur les destinations et la construction d'un itinéraire qui convient à tout le monde, il vous faut les bons outils. Nous avons testé et comparé les applications de planification de voyage de groupe les plus populaires disponibles en 2026 pour vous aider à choisir celle qui convient à votre groupe. Voici notre top 10, classé par utilité globale pour les voyages de groupe.",

    rankingTitle: "Comment Nous Avons Classé Ces Applications",
    rankingIntro:
      "Nous avons évalué chaque application selon cinq critères essentiels pour la planification de voyages de groupe :",
    rankingCriteria: [
      {
        title: "Complétude des fonctionnalités",
        desc: "L'application couvre-t-elle la création d'itinéraires, la gestion du budget, les sondages, les listes de bagages et la découverte d'activités — ou seulement un ou deux de ces aspects ?",
      },
      {
        title: "Outils spécifiques au groupe",
        desc: "Offre-t-elle le vote, la collaboration en temps réel, le suivi des dépenses partagées et d'autres fonctionnalités conçues pour planifier à plusieurs ?",
      },
      {
        title: "Tarification",
        desc: "L'application est-elle gratuite ou freemium ? Les fonctionnalités les plus utiles sont-elles verrouillées derrière un mur payant ?",
      },
      {
        title: "Facilité d'utilisation",
        desc: "Une personne non technique peut-elle créer un voyage et inviter des amis en moins de cinq minutes ?",
      },
      {
        title: "Support linguistique",
        desc: "L'application est-elle disponible en plusieurs langues, dont le français ?",
      },
    ],

    apps: [
      {
        name: "WePlanify",
        tagline: "Planificateur de voyage de groupe tout-en-un et gratuit",
        description:
          "WePlanify est l'outil gratuit le plus complet pour planifier des voyages de groupe. Il combine la création d'itinéraires, les sondages de groupe, le suivi de budget partagé, les listes de bagages et la découverte d'activités alimentée par l'IA dans une seule plateforme collaborative. Toutes les fonctionnalités sont gratuites, sans mur payant caché ni limite d'essai.",
        bestFor: "Les groupes d'amis qui veulent tout au même endroit",
        strengths: [
          "Tout-en-un : itinéraire, sondages, budget, listes de bagages et découverte d'activités",
          "Gratuit pour toujours, sans restriction de fonctionnalités",
          "Entièrement bilingue (anglais et français)",
        ],
        limitations: [
          "Application mobile bientôt disponible (actuellement une application web responsive)",
        ],
        price: "Gratuit",
        isWePlanify: true,
      },
      {
        name: "Wanderlog",
        tagline: "Créateur d'itinéraires basé sur la carte avec collaboration",
        description:
          "Wanderlog propose un créateur d'itinéraires magnifiquement conçu, centré sur la carte, qui facilite la visualisation de votre parcours. Il prend en charge la collaboration pour que plusieurs personnes puissent éditer le plan de voyage, et il dispose d'une application mobile reconnue. Il excelle pour les planificateurs visuels qui veulent voir leur voyage sur une carte.",
        bestFor: "Les planificateurs visuels et les road trips",
        strengths: [
          "Excellente intégration cartographique et visualisation d'itinéraire",
          "Application mobile soignée pour iOS et Android",
          "Bonnes recommandations de restaurants et d'attractions",
        ],
        limitations: [
          "Pas de sondages de groupe ni de fonctions de vote",
          "Pas de suivi de budget partagé — disponible uniquement en anglais",
        ],
        price: "Gratuit avec Pro à 8 $/mois",
      },
      {
        name: "SquadTrip",
        tagline: "Collecte de paiements et gestion des participants",
        description:
          "SquadTrip est conçu spécifiquement pour les organisateurs de voyages de groupe qui doivent collecter de l'argent auprès des participants et gérer les confirmations de présence. Il inclut des fonctions de vote, de partage de budget et un tableau de bord de gestion des invités. Il est particulièrement fort côté organisation du voyage de groupe.",
        bestFor: "Les organisateurs de voyage qui gèrent l'argent",
        strengths: [
          "Collecte de paiements intégrée auprès des membres du groupe",
          "Gestion des invités avec suivi des confirmations",
          "Vote de groupe sur les options d'itinéraire",
        ],
        limitations: [
          "Pas de listes de bagages ni de découverte d'activités",
          "Anglais uniquement",
        ],
        price: "Gratuit avec fonctionnalités payantes pour les organisateurs",
      },
      {
        name: "TripIt",
        tagline: "Importation automatique des réservations depuis les e-mails",
        description:
          "TripIt existe depuis des années et excelle dans un domaine : transformer les e-mails de confirmation en itinéraire organisé. Transférez vos e-mails de réservation et TripIt assemble un calendrier clair. Le plan Pro ajoute des alertes de vol en temps réel, le suivi des sièges et des notifications de vols alternatifs.",
        bestFor: "Les voyageurs d'affaires et les organisateurs solo",
        strengths: [
          "Création automatique d'itinéraire à partir d'e-mails transférés",
          "Excellent pour gérer des voyages multi-étapes complexes",
          "Alertes de statut de vol en temps réel (Pro)",
        ],
        limitations: [
          "Fonctionnalités de collaboration de groupe limitées",
          "La plupart des fonctions utiles nécessitent l'abonnement Pro (49 $/an)",
        ],
        price: "Basique gratuit, Pro à 49 $/an",
      },
      {
        name: "Splitwise",
        tagline: "La référence absolue du partage de dépenses",
        description:
          "Splitwise n'est pas un planificateur de voyage — c'est la meilleure application pour suivre les dépenses partagées. La plupart des voyageurs en groupe finissent par l'utiliser en complément de leur outil de planification pour garder une trace de qui doit quoi. Il gère les partages complexes, les devises multiples et les soldes de groupe avec facilité.",
        bestFor: "Suivre qui doit quoi à qui",
        strengths: [
          "Partage de dépenses de référence avec options de partage complexes",
          "Support multi-devises",
          "Largement adopté — la plupart des gens l'ont déjà",
        ],
        limitations: [
          "Pas un planificateur de voyage — pas d'itinéraire, de sondages ni de bagages",
          "Pro requis (4,99 $/mois) pour les reçus et graphiques",
        ],
        price: "Gratuit, Pro à 4,99 $/mois",
      },
      {
        name: "Troupe",
        tagline: "Prise de décision en groupe avec vote par classement",
        description:
          "Troupe se concentre sur la partie la plus difficile du voyage de groupe : prendre des décisions ensemble. Il permet aux groupes de suggérer, discuter et voter sur des activités grâce au vote par classement. Il propose aussi la découverte d'activités avec des recommandations locales. Considérez-le comme un outil de prise de décision conçu pour les voyages.",
        bestFor: "Les groupes qui n'arrivent pas à se mettre d'accord",
        strengths: [
          "Système de vote par classement pour les décisions de groupe",
          "Découverte d'activités avec recommandations locales",
          "Expérience mobile agréable",
        ],
        limitations: [
          "Pas de suivi de budget ni de listes de bagages",
          "Anglais uniquement",
        ],
        price: "Gratuit",
      },
      {
        name: "AvoSquado",
        tagline: "Attribution des chambres et activités réservables",
        description:
          "AvoSquado est un acteur plus récent qui s'attaque à un créneau unique : la gestion de grandes locations de vacances avec attribution des chambres et des activités de groupe réservables. Si votre voyage de groupe tourne autour d'une grande maison et que vous devez coordonner qui dort où et quoi faire aux alentours, c'est un outil spécialisé mais utile.",
        bestFor: "Les grandes locations de vacances avec beaucoup d'invités",
        strengths: [
          "Fonctionnalité unique d'attribution des chambres",
          "Activités réservables intégrées à la planification",
          "Conçu spécifiquement pour les séjours en grand groupe",
        ],
        limitations: [
          "Focus étroit — pas un planificateur de voyage complet",
          "Base d'utilisateurs plus petite, moins de contenu communautaire",
        ],
        price: "Gratuit",
      },
      {
        name: "Cruzmi",
        tagline: "Organisateur collaboratif d'événements français",
        description:
          "Cruzmi est un outil de planification collaboratif français qui fonctionne bien pour organiser des événements et des sorties de groupe. Il prend en charge les sondages, les listes de tâches partagées et le suivi de budget. Il convient parfaitement aux groupes francophones qui veulent une expérience de planification simple et sans chichis.",
        bestFor: "Les groupes francophones qui organisent des événements",
        strengths: [
          "Expérience native en français",
          "Sondages simples et listes de tâches partagées",
          "Interface claire et directe",
        ],
        limitations: [
          "Fonctionnalités de création d'itinéraire limitées",
          "Jeu de fonctionnalités plus restreint que les planificateurs de voyage dédiés",
        ],
        price: "Gratuit",
      },
      {
        name: "Let's Jetty",
        tagline: "Créateur d'itinéraires élégant entre amis",
        description:
          "Let's Jetty apporte une approche fraîche et visuellement séduisante à la planification d'itinéraires de groupe. Il se concentre sur rendre l'expérience de planification elle-même agréable, avec une interface soignée et une collaboration fluide. Idéal pour les petits groupes d'amis qui apprécient l'esthétique et la simplicité plutôt que la profondeur fonctionnelle.",
        bestFor: "Les petits groupes d'amis qui veulent une expérience soignée",
        strengths: [
          "Design beau et intuitif",
          "Collaboration en temps réel fluide",
          "Accent sur le plaisir de planifier",
        ],
        limitations: [
          "Moins de fonctionnalités que les plateformes tout-en-un",
          "Pas de suivi de budget ni de sondages",
        ],
        price: "Gratuit",
      },
      {
        name: "Google Sheets",
        tagline: "L'approche DIY qui ne meurt jamais",
        description:
          "Soyons honnêtes — beaucoup de groupes planifient encore leurs voyages dans un Google Sheet partagé. C'est infiniment personnalisable, tout le monde sait déjà l'utiliser, et ça ne coûte rien. Le compromis, c'est que vous construisez tout de zéro : formules de budget, mises en page d'itinéraire et listes de bagages. Pas d'automatisation, pas de fonctionnalités spécifiques au voyage, juste la puissance brute du tableur.",
        bestFor: "Les maniaques du contrôle avec des talents de tableur",
        strengths: [
          "Infiniment flexible et personnalisable",
          "Gratuit et universellement accessible",
          "Pas de courbe d'apprentissage pour la plupart des gens",
        ],
        limitations: [
          "Pas de fonctionnalités spécifiques au voyage — vous construisez tout vous-même",
          "Pas d'expérience mobile adaptée pour consulter le voyage",
        ],
        price: "Gratuit",
      },
    ] as AppEntry[],

    summaryTitle: "Résumé Comparatif",
    summaryFeatures: [
      "Itinéraire",
      "Sondages",
      "Budget",
      "Bagages",
      "Gratuit",
      "Français",
    ],
    summaryData: [
      { name: "WePlanify", values: [true, true, true, true, true, true] },
      { name: "Wanderlog", values: [true, false, false, true, true, false] },
      { name: "SquadTrip", values: [true, true, true, false, true, false] },
      { name: "TripIt", values: [true, false, false, false, "freemium", false] },
      { name: "Splitwise", values: [false, false, true, false, "freemium", true] },
      { name: "Troupe", values: [true, true, false, false, true, false] },
      { name: "AvoSquado", values: [false, false, false, false, true, false] },
      { name: "Cruzmi", values: [false, true, true, false, true, true] },
      { name: "Let's Jetty", values: [true, false, false, false, true, false] },
      { name: "Google Sheets", values: ["diy", "diy", "diy", "diy", true, true] },
    ],

    ctaTitle: "Prêt à planifier votre prochain voyage de groupe ?",
    ctaText:
      "Arrêtez de jongler entre plusieurs applications et tableurs. WePlanify réunit planification d'itinéraire, sondages de groupe, suivi de budget, listes de bagages et recommandations alimentées par l'IA dans une seule plateforme gratuite.",
    ctaButton: "Commencer à planifier gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de crédit requise.",

    diy: "DIY",
    freemium: "Freemium",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-emerald-600 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-5 h-5 text-red-400/70 mx-auto"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function SummaryCellValue({
  value,
  locale,
}: {
  value: string | boolean;
  locale: string;
}) {
  const t = content[locale as keyof typeof content] ?? content.en;
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.freemium}
      </span>
    );
  if (value === "diy")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {t.diy}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BestGroupTripPlannerAppsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = content[locale as keyof typeof content] ?? content.en;

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

  const breadcrumbLd = {
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
        name: locale === "fr" ? "Comparatif" : "Alternatives",
        item: `${SITE_URL}/${locale}/alternatives`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "fr"
            ? "Meilleures Applications Voyage de Groupe"
            : "Best Group Trip Planner Apps",
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "fr" ? meta.fr.title : meta.en.title,
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
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${PATHNAME}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
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

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* App entries                                                      */}
        {/* ---------------------------------------------------------------- */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-10 lg:space-y-12">
            {c.apps.map((app, index) => (
              <section
                key={app.name}
                id={app.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                className={`rounded-2xl border p-6 lg:p-8 ${
                  app.isWePlanify
                    ? "border-[#F6391A]/30 bg-white shadow-md ring-2 ring-[#F6391A]/10"
                    : "border-[#001E13]/10 bg-white"
                }`}
              >
                {/* Number + Name + Tagline */}
                <div className="flex items-baseline gap-3 mb-1">
                  <span
                    className={`text-3xl lg:text-4xl font-londrina-solid leading-none ${
                      app.isWePlanify ? "text-[#F6391A]" : "text-[#001E13]/20"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className={`text-xl lg:text-2xl font-londrina-solid leading-tight ${
                      app.isWePlanify ? "text-[#F6391A]" : "text-[#001E13]"
                    }`}
                  >
                    {app.name}
                  </h2>
                </div>
                <p className="font-karla text-sm text-[#001E13]/50 mb-4 ml-0 lg:ml-[52px]">
                  {app.tagline}
                </p>

                {/* Description */}
                <p className="font-karla text-base text-[#001E13]/80 leading-relaxed mb-5">
                  {app.description}
                </p>

                {/* Best for */}
                <div className="bg-[#EEF899]/40 rounded-xl px-4 py-3 mb-5">
                  <p className="font-karla text-sm">
                    <span className="font-bold text-[#001E13]">
                      {locale === "fr" ? "Idéal pour : " : "Best for: "}
                    </span>
                    <span className="text-[#001E13]/80">{app.bestFor}</span>
                  </p>
                </div>

                {/* Strengths & Limitations */}
                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <h3 className="font-karla font-bold text-sm text-emerald-700 mb-2">
                      {locale === "fr" ? "Points forts" : "Strengths"}
                    </h3>
                    <ul className="space-y-1.5">
                      {app.strengths.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-karla text-sm text-[#001E13]/75"
                        >
                          <span className="text-emerald-600 mt-0.5 shrink-0">
                            +
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-karla font-bold text-sm text-red-500 mb-2">
                      {locale === "fr" ? "Limites" : "Limitations"}
                    </h3>
                    <ul className="space-y-1.5">
                      {app.limitations.map((l, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-karla text-sm text-[#001E13]/75"
                        >
                          <span className="text-red-400 mt-0.5 shrink-0">
                            -
                          </span>
                          {l}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Price + CTA for WePlanify */}
                <div className="flex items-center justify-between pt-3 border-t border-[#001E13]/10">
                  <p className="font-karla text-sm text-[#001E13]/60">
                    <span className="font-semibold text-[#001E13]">
                      {locale === "fr" ? "Prix : " : "Price: "}
                    </span>
                    {app.price}
                  </p>
                  {app.isWePlanify && (
                    <Link
                      href="https://app.weplanify.com"
                      className="inline-block bg-[#F6391A] hover:bg-[#d42d10] text-[#FFFBF5] font-karla font-bold text-sm px-5 py-2 rounded-full transition-colors"
                    >
                      {locale === "fr"
                        ? "Essayer gratuitement"
                        : "Try it free"}
                    </Link>
                  )}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* How We Ranked                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-4">
              {c.rankingTitle}
            </h2>
            <p className="font-karla text-base text-[#001E13]/80 leading-relaxed mb-8">
              {c.rankingIntro}
            </p>
            <div className="grid gap-4">
              {c.rankingCriteria.map((criterion, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#001E13]/10 rounded-2xl p-5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#001E13] text-[#EEF899] font-londrina-solid text-sm">
                      {i + 1}
                    </span>
                    <h3 className="font-londrina-solid text-[#001E13] text-lg">
                      {criterion.title}
                    </h3>
                  </div>
                  <p className="font-karla text-sm text-[#001E13]/70 leading-relaxed ml-10">
                    {criterion.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* Comparison summary table                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {c.summaryTitle}
            </h2>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-5 py-3.5 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[140px]">
                      App
                    </th>
                    {c.summaryFeatures.map((f) => (
                      <th
                        key={f}
                        className="font-karla font-bold text-[#FFFBF5] text-center px-3 py-3.5 text-sm min-w-[90px]"
                      >
                        {f}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.summaryData.map((row, i) => (
                    <tr
                      key={row.name}
                      className={
                        i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"
                      }
                    >
                      <td
                        className={`font-karla text-sm px-5 py-3 sticky left-0 z-10 bg-inherit ${
                          row.name === "WePlanify"
                            ? "font-bold text-[#F6391A]"
                            : "text-[#001E13]"
                        }`}
                      >
                        {row.name}
                      </td>
                      {row.values.map((val, j) => (
                        <td
                          key={j}
                          className={`px-3 py-3 text-center ${
                            row.name === "WePlanify"
                              ? "bg-emerald-50/40"
                              : ""
                          }`}
                        >
                          <SummaryCellValue value={val} locale={locale} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-4">
              {c.summaryData.map((row) => (
                <div
                  key={row.name}
                  className={`rounded-2xl border p-4 ${
                    row.name === "WePlanify"
                      ? "border-[#F6391A]/30 bg-white shadow-md ring-2 ring-[#F6391A]/10"
                      : "border-[#001E13]/10 bg-white"
                  }`}
                >
                  <h3
                    className={`font-londrina-solid text-lg mb-3 ${
                      row.name === "WePlanify"
                        ? "text-[#F6391A]"
                        : "text-[#001E13]"
                    }`}
                  >
                    {row.name}
                  </h3>
                  <ul className="space-y-2">
                    {c.summaryFeatures.map((feature, j) => (
                      <li
                        key={feature}
                        className="flex items-center justify-between text-sm font-karla"
                      >
                        <span className="text-[#001E13]/80">{feature}</span>
                        <span className="ml-3 shrink-0">
                          <SummaryCellValue
                            value={row.values[j]}
                            locale={locale}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Discover More                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-16 lg:py-20 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {locale === "fr" ? "Découvrir aussi" : "Discover More"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Comparatif des Applications"
                      : "App Comparison"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Tableau comparatif détaillé côte à côte de toutes les applications."
                      : "Detailed side-by-side comparison table of all apps."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr"
                      ? "Voir le comparatif →"
                      : "View comparison →"}
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Guide : Organiser un Voyage de Groupe"
                      : "Guide: Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet étape par étape pour un voyage de groupe réussi."
                      : "The complete step-by-step guide to a successful group trip."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide →" : "Read the guide →"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
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
                    {locale === "fr" ? "En savoir plus →" : "Read more →"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* CTA                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="rounded-[24px] lg:rounded-[32px] bg-[#F6391A] px-8 py-12 lg:py-16">
              <h2 className="font-londrina-solid text-[#FFFBF5] text-2xl lg:text-4xl mb-4">
                {c.ctaTitle}
              </h2>
              <p className="font-karla text-[#FFFBF5]/80 text-sm lg:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                {c.ctaText}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#FFFBF5] text-[#F6391A] font-karla font-bold text-base lg:text-lg px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                {c.ctaButton}
              </Link>
              <p className="font-karla text-[#FFFBF5]/80 text-xs lg:text-sm mt-4">
                {c.ctaSub}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
