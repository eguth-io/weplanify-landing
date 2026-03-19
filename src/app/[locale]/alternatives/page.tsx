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

type Feature = {
  key: string;
  en: string;
  fr: string;
};

type AppColumn = {
  name: string;
  features: Record<string, string | boolean>;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const pathname = "/alternatives";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "Best Group Trip Planner Apps 2026 — Complete Comparison | WePlanify",
      description:
        "Compare the best group trip planner apps of 2026. See how WePlanify stacks up against Wanderlog, SquadTrip, Troupe, TripIt and Splitwise for collaborative travel planning.",
      keywords: [
        "best group trip planner app",
        "group travel app comparison",
        "wanderlog alternative",
        "squadtrip alternative",
        "splitwise alternative",
        "group trip planning tools 2026",
      ],
    },
    fr: {
      title:
        "Meilleures Applications Voyage de Groupe 2026 — Comparatif Complet | WePlanify",
      description:
        "Comparez les meilleures applications de voyage de groupe en 2026. Découvrez comment WePlanify se compare à Wanderlog, SquadTrip, Troupe, TripIt et Splitwise.",
      keywords: [
        "meilleure application voyage groupe",
        "comparatif application voyage groupe",
        "alternative cruzmi",
        "planificateur voyage groupe 2026",
      ],
    },
  };

  const loc = meta[locale as keyof typeof meta] ?? meta.en;

  return {
    title: loc.title,
    description: loc.description,
    keywords: loc.keywords,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: loc.title,
      description: loc.description,
    },
    twitter: {
      card: "summary_large_image",
      title: loc.title,
      description: loc.description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${pathname}`,
        fr: `${SITE_URL}/fr${pathname}`,
        "x-default": `${SITE_URL}/en${pathname}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const features: Feature[] = [
  { key: "collab_itinerary", en: "Collaborative itinerary", fr: "Itinéraire collaboratif" },
  { key: "polls", en: "Group polls / voting", fr: "Sondages / votes de groupe" },
  { key: "budget", en: "Shared budget tracker", fr: "Suivi de budget partagé" },
  { key: "packing", en: "Packing lists", fr: "Listes de bagages" },
  { key: "discovery", en: "Activity discovery", fr: "Découverte d'activités" },
  { key: "free", en: "Free plan", fr: "Plan gratuit" },
  { key: "french", en: "Available in French", fr: "Disponible en français" },
  { key: "realtime", en: "Real-time collaboration", fr: "Collaboration en temps réel" },
  { key: "mobile", en: "Mobile app", fr: "Application mobile" },
];

const apps: AppColumn[] = [
  {
    name: "WePlanify",
    features: {
      collab_itinerary: true,
      polls: true,
      budget: true,
      packing: true,
      discovery: true,
      free: true,
      french: true,
      realtime: true,
      mobile: "coming_soon",
    },
  },
  {
    name: "Wanderlog",
    features: {
      collab_itinerary: true,
      polls: false,
      budget: false,
      packing: true,
      discovery: true,
      free: true,
      french: false,
      realtime: true,
      mobile: true,
    },
  },
  {
    name: "SquadTrip",
    features: {
      collab_itinerary: true,
      polls: true,
      budget: true,
      packing: false,
      discovery: false,
      free: true,
      french: false,
      realtime: true,
      mobile: false,
    },
  },
  {
    name: "Troupe",
    features: {
      collab_itinerary: true,
      polls: true,
      budget: false,
      packing: false,
      discovery: true,
      free: true,
      french: false,
      realtime: true,
      mobile: true,
    },
  },
  {
    name: "TripIt",
    features: {
      collab_itinerary: true,
      polls: false,
      budget: false,
      packing: false,
      discovery: false,
      free: "freemium",
      french: false,
      realtime: false,
      mobile: true,
    },
  },
  {
    name: "Splitwise",
    features: {
      collab_itinerary: false,
      polls: false,
      budget: true,
      packing: false,
      discovery: false,
      free: "freemium",
      french: true,
      realtime: true,
      mobile: true,
    },
  },
  {
    name: "Stippl",
    features: {
      collab_itinerary: true,
      polls: false,
      budget: false,
      packing: true,
      discovery: true,
      free: true,
      french: false,
      realtime: true,
      mobile: true,
    },
  },
];

const competitorDetails = {
  en: [
    {
      name: "Wanderlog",
      text: "Wanderlog is a map-based itinerary builder with route visualization. It lacks group polls, shared budget tracking, and French language support — features that are essential for group trip planning.",
    },
    {
      name: "SquadTrip",
      text: "SquadTrip handles group payments and RSVP management. It does not include packing lists, activity discovery, or French language support, so groups still need additional tools to plan the full trip.",
    },
    {
      name: "Troupe",
      text: "Troupe lets groups vote on activity suggestions. It covers only the decision phase — there is no budget tracking, no packing lists, and no French support, leaving most trip logistics unaddressed.",
    },
    {
      name: "TripIt",
      text: "TripIt assembles itineraries from forwarded booking emails. It is designed for solo travelers — group collaboration, polls, and shared budgets are not available, and most features require a paid Pro subscription.",
    },
    {
      name: "Splitwise",
      text: "Splitwise tracks shared expenses across a group. It has no trip planning features — no itinerary, no polls, no packing lists — so most groups need a second app alongside it. WePlanify includes built-in budget tracking along with every other planning tool.",
    },
    {
      name: "Stippl",
      text: "Stippl is a visual travel planner with community-shared itineraries and photo journals. It lacks group polls, shared budget tracking, and French language support — making it more suited for solo travelers than for coordinating a group trip.",
    },
  ],
  fr: [
    {
      name: "Wanderlog",
      text: "Wanderlog est un créateur d'itinéraires basé sur la carte avec visualisation de parcours. Il ne propose ni sondages de groupe, ni suivi de budget partagé, ni support du français — des fonctionnalités essentielles pour planifier un voyage de groupe.",
    },
    {
      name: "SquadTrip",
      text: "SquadTrip gère les paiements de groupe et les confirmations de présence. Il n'inclut pas de listes de bagages, de découverte d'activités ni de support du français, ce qui oblige les groupes à utiliser d'autres outils pour planifier le reste du voyage.",
    },
    {
      name: "Troupe",
      text: "Troupe permet aux groupes de voter sur des suggestions d'activités. Il ne couvre que la phase de décision — pas de suivi de budget, pas de listes de bagages et pas de support du français, laissant la majorité de la logistique du voyage sans solution.",
    },
    {
      name: "TripIt",
      text: "TripIt crée des itinéraires à partir d'e-mails de réservation transférés. Il est conçu pour les voyageurs solo — la collaboration de groupe, les sondages et les budgets partagés ne sont pas disponibles, et la plupart des fonctions nécessitent un abonnement Pro payant.",
    },
    {
      name: "Splitwise",
      text: "Splitwise permet de suivre les dépenses partagées au sein d'un groupe. Il n'a aucune fonctionnalité de planification de voyage — pas d'itinéraire, pas de sondages, pas de listes de bagages — ce qui oblige la plupart des groupes à utiliser une deuxième application. WePlanify intègre le suivi de budget avec tous les autres outils de planification.",
    },
    {
      name: "Stippl",
      text: "Stippl est un planificateur de voyage visuel avec des itinéraires partagés par la communauté et des carnets photo. Il ne propose ni sondages de groupe, ni suivi de budget partagé, ni support du français — ce qui le rend plus adapté aux voyageurs solo qu'à la coordination d'un voyage de groupe.",
    },
  ],
};

const content = {
  en: {
    heroTitle: "Best Group Trip Planner Apps in 2026",
    heroSubtitle: "A complete, side-by-side comparison",
    heroIntro:
      "Planning a trip with friends or family should be exciting, not stressful. We compared the most popular group travel apps so you can pick the right tool for your next adventure. Features, pricing, and everything you need to decide.",
    comparisonTitle: "Feature Comparison",
    competitorsTitle: "A Closer Look at Each App",
    whyTitle: "Why Choose WePlanify?",
    whyPoints: [
      {
        title: "All-in-one platform",
        desc: "Itinerary, budget, polls, packing lists and activity discovery in a single app. No need to juggle three different tools.",
      },
      {
        title: "Free forever",
        desc: "Every core feature is free with no hidden paywalls or trial limits. Plan as many trips as you want.",
      },
      {
        title: "Bilingual (EN / FR)",
        desc: "Fully available in English and French — a rare find among travel planning apps.",
      },
      {
        title: "Built for group decisions",
        desc: "Polls, voting, and real-time collaboration ensure everyone has a say in the plan.",
      },
    ],
    ctaTitle: "Ready to plan your next group trip?",
    ctaButton: "Get started for free",
    ctaSub: "Free forever. No credit card required.",
    comingSoon: "Coming soon",
    freemium: "Freemium",
    webApp: "Web app",
  },
  fr: {
    heroTitle: "Meilleures Applications de Voyage de Groupe en 2026",
    heroSubtitle: "Comparatif complet, côte à côte",
    heroIntro:
      "Planifier un voyage entre amis ou en famille devrait être excitant, pas stressant. Nous avons comparé les applications de voyage de groupe les plus populaires pour vous aider à choisir le bon outil pour votre prochaine aventure. Pas de blabla — juste les faits.",
    comparisonTitle: "Comparatif des Fonctionnalités",
    competitorsTitle: "Un Regard Plus Proche sur Chaque Application",
    whyTitle: "Pourquoi Choisir WePlanify ?",
    whyPoints: [
      {
        title: "Plateforme tout-en-un",
        desc: "Itinéraire, budget, sondages, listes de bagages et découverte d'activités dans une seule application. Pas besoin de jongler entre trois outils différents.",
      },
      {
        title: "Gratuit pour toujours",
        desc: "Toutes les fonctionnalités principales sont gratuites, sans mur payant caché ni limite d'essai. Planifiez autant de voyages que vous voulez.",
      },
      {
        title: "Bilingue (EN / FR)",
        desc: "Entièrement disponible en anglais et en français — une rareté parmi les applications de planification de voyage.",
      },
      {
        title: "Conçu pour les décisions de groupe",
        desc: "Sondages, votes et collaboration en temps réel pour que chacun ait son mot à dire.",
      },
    ],
    ctaTitle: "Prêt à planifier votre prochain voyage de groupe ?",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de crédit requise.",
    comingSoon: "Bientôt",
    freemium: "Freemium",
    webApp: "App web",
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

function CellValue({
  value,
  locale,
}: {
  value: string | boolean;
  locale: string;
}) {
  const t = content[locale as keyof typeof content] ?? content.en;
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "coming_soon")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {t.comingSoon}
      </span>
    );
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.freemium}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function AlternativesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = content[locale as keyof typeof content] ?? content.en;
  const details =
    competitorDetails[locale as keyof typeof competitorDetails] ??
    competitorDetails.en;

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
        item: `https://www.weplanify.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Comparatif" : "Alternatives",
        item: `https://www.weplanify.com/${locale}/alternatives`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "fr"
      ? "Meilleures Applications de Voyage de Groupe 2026"
      : "Best Group Trip Planner Apps 2026",
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: app.name,
      url:
        app.name === "WePlanify"
          ? "https://www.weplanify.com"
          : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* ---------------------------------------------------------------- */}
        {/* 1. Hero                                                          */}
        {/* ---------------------------------------------------------------- */}
        <section className="pt-[120px] lg:pt-[150px] pb-12 lg:pb-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-3">
              {t.heroSubtitle}
            </p>
            <h1 className="font-londrina-solid text-[#001E13] text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight mb-6">
              {t.heroTitle}
            </h1>
            <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              {t.heroIntro}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. Comparison table (desktop) / cards (mobile)                   */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.comparisonTitle}
            </h2>

            {/* ---------- Desktop table ---------- */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[200px]">
                      {locale === "fr" ? "Fonctionnalité" : "Feature"}
                    </th>
                    {apps.map((app) => (
                      <th
                        key={app.name}
                        className={`font-karla font-bold text-center px-4 py-4 text-sm min-w-[130px] ${
                          app.name === "WePlanify"
                            ? "text-[#EEF899]"
                            : "text-[#FFFBF5]"
                        }`}
                      >
                        {app.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.key}
                      className={
                        i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"
                      }
                    >
                      <td className="font-karla text-sm text-[#001E13] px-6 py-3.5 sticky left-0 z-10 bg-inherit">
                        {locale === "fr" ? feature.fr : feature.en}
                      </td>
                      {apps.map((app) => (
                        <td
                          key={`${feature.key}-${app.name}`}
                          className={`px-4 py-3.5 text-center ${
                            app.name === "WePlanify"
                              ? "bg-emerald-50/40"
                              : ""
                          }`}
                        >
                          <CellValue
                            value={app.features[feature.key]}
                            locale={locale}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- Mobile cards ---------- */}
            <div className="lg:hidden space-y-6">
              {apps.map((app) => (
                <div
                  key={app.name}
                  className={`rounded-2xl border p-5 ${
                    app.name === "WePlanify"
                      ? "border-[#F6391A]/30 bg-white shadow-md ring-2 ring-[#F6391A]/10"
                      : "border-[#001E13]/10 bg-white"
                  }`}
                >
                  <h3
                    className={`font-londrina-solid text-xl mb-4 ${
                      app.name === "WePlanify"
                        ? "text-[#F6391A]"
                        : "text-[#001E13]"
                    }`}
                  >
                    {app.name}
                  </h3>
                  <ul className="space-y-2.5">
                    {features.map((feature) => {
                      const val = app.features[feature.key];
                      return (
                        <li
                          key={feature.key}
                          className="flex items-center justify-between text-sm font-karla"
                        >
                          <span className="text-[#001E13]/80">
                            {locale === "fr" ? feature.fr : feature.en}
                          </span>
                          <span className="ml-3 shrink-0">
                            <CellValue value={val} locale={locale} />
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Competitor details                                            */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.competitorsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {details.map((comp) => (
                <article
                  key={comp.name}
                  className="rounded-2xl border border-[#001E13]/10 p-6 bg-[#FFFBF5]"
                >
                  <h3 className="font-londrina-solid text-[#001E13] text-xl mb-3">
                    {comp.name}
                  </h3>
                  <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                    {comp.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4. Why WePlanify                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-12">
              {t.whyTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.whyPoints.map((point, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#001E13] p-6 lg:p-8 text-[#FFFBF5]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#EEF899] text-[#001E13] font-londrina-solid text-lg">
                      {i + 1}
                    </span>
                    <h3 className="font-londrina-solid text-lg lg:text-xl">
                      {point.title}
                    </h3>
                  </div>
                  <p className="font-karla text-sm text-[#FFFBF5]/80 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Discover More                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {locale === "fr" ? "Découvrir aussi" : "Discover More"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Voyage entre Amis" : "Trip with Friends"}
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
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Organiser un EVJF" : "Plan a Bachelorette Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Tout ce qu'il faut pour planifier un enterrement de vie de jeune fille inoubliable sans stress."
                      : "Everything you need to plan an unforgettable bachelorette party trip, stress-free."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "En savoir plus →" : "Read more →"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Guide : Organiser un Voyage de Groupe" : "Guide: How to Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet étape par étape pour organiser un voyage de groupe réussi."
                      : "The complete step-by-step guide to planning a successful group trip."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide →" : "Read the guide →"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. CTA banner                                                    */}
        {/* ---------------------------------------------------------------- */}
        <section className="px-4 lg:px-8 pb-12 lg:pb-20">
          <div className="max-w-4xl mx-auto rounded-[24px] lg:rounded-[32px] bg-[#F6391A] px-8 py-12 lg:py-16 text-center">
            <h2 className="font-londrina-solid text-[#FFFBF5] text-2xl lg:text-4xl mb-4">
              {t.ctaTitle}
            </h2>
            <Link
              href="https://app.weplanify.com"
              className="inline-block mt-4 px-8 py-3 bg-[#FFFBF5] text-[#F6391A] font-karla font-bold rounded-full text-base lg:text-lg hover:shadow-lg transition-shadow"
            >
              {t.ctaButton}
            </Link>
            <p className="font-karla text-[#FFFBF5]/80 text-xs lg:text-sm mt-4">
              {t.ctaSub}
            </p>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
