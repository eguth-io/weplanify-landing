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
  weplanify: string | boolean;
  squadtrip: string | boolean;
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
  const pathname = "/alternatives/squadtrip";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "WePlanify vs SquadTrip — Best Free Group Trip Planner? (2026)",
      description:
        "Detailed comparison of WePlanify and SquadTrip for group trip planning. See which free group travel app offers the best collaborative features, polls, budgets, and more.",
      keywords: [
        "weplanify vs squadtrip",
        "squadtrip alternative",
        "squadtrip free alternative",
        "group trip planner comparison",
        "best group trip app 2026",
      ],
    },
    fr: {
      title:
        "WePlanify vs SquadTrip — Meilleur Organisateur de Voyage de Groupe Gratuit ? (2026)",
      description:
        "Comparatif détaillé entre WePlanify et SquadTrip pour organiser un voyage de groupe. Découvrez quelle application gratuite offre les meilleures fonctionnalités collaboratives.",
      keywords: [
        "alternative squadtrip",
        "squadtrip gratuit",
        "comparatif squadtrip",
        "organisateur voyage groupe gratuit",
        "weplanify vs squadtrip",
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
  {
    key: "collab_itinerary",
    en: "Collaborative itinerary",
    fr: "Itinéraire collaboratif",
    weplanify: true,
    squadtrip: true,
  },
  {
    key: "polls",
    en: "Group polls / voting",
    fr: "Sondages / votes de groupe",
    weplanify: true,
    squadtrip: false,
  },
  {
    key: "budget",
    en: "Shared budget tracker",
    fr: "Suivi de budget partagé",
    weplanify: true,
    squadtrip: "payment_collection",
  },
  {
    key: "payment",
    en: "Payment processing",
    fr: "Traitement des paiements",
    weplanify: false,
    squadtrip: "core_feature",
  },
  {
    key: "packing",
    en: "Packing lists",
    fr: "Listes de bagages",
    weplanify: true,
    squadtrip: false,
  },
  {
    key: "guest_mgmt",
    en: "Guest management",
    fr: "Gestion des invités",
    weplanify: "basic",
    squadtrip: "advanced",
  },
  {
    key: "discovery",
    en: "Activity discovery",
    fr: "Découverte d'activités",
    weplanify: true,
    squadtrip: false,
  },
  {
    key: "free",
    en: "Free",
    fr: "Gratuit",
    weplanify: "free_100",
    squadtrip: "partial_fees",
  },
  {
    key: "french",
    en: "French language",
    fr: "Disponible en français",
    weplanify: true,
    squadtrip: false,
  },
  {
    key: "mobile",
    en: "Mobile app",
    fr: "Application mobile",
    weplanify: "web_app",
    squadtrip: "web_app",
  },
  {
    key: "realtime",
    en: "Real-time collaboration",
    fr: "Collaboration en temps réel",
    weplanify: true,
    squadtrip: true,
  },
];

const content = {
  en: {
    heroTitle: "WePlanify vs SquadTrip",
    heroSubtitle: "Best Free Group Trip Planner? (2026)",
    heroIntro:
      "Both WePlanify and SquadTrip help groups organize travel together, but they solve different problems. SquadTrip is built around payment collection and guest logistics. WePlanify is an all-in-one collaborative planner with polls, shared budgets, and itineraries — completely free.",
    verdictTitle: "Quick Verdict",
    verdict:
      "SquadTrip is powerful for trip organizers managing payments and guest logistics. WePlanify focuses on collaborative planning with polls, shared budgets, and itineraries — completely free, no payment processing fees.",
    comparisonTitle: "Feature-by-Feature Comparison",
    squadtripShinesTitle: "Where SquadTrip Shines",
    squadtripShinesPoints: [
      {
        title: "Payment collection",
        desc: "SquadTrip's strongest feature is its ability to collect payments from trip participants. If your group trip involves collecting deposits, splitting costs for accommodation, or managing waivers, SquadTrip handles that out of the box.",
      },
      {
        title: "Guest forms and waivers",
        desc: "Need participants to sign waivers, fill out dietary preferences, or submit passport details? SquadTrip provides structured forms and guest management tools that go beyond simple invite links.",
      },
      {
        title: "Professional trip organizing",
        desc: "If you run a travel business or organize group trips professionally, SquadTrip's payment and logistics features are purpose-built for that use case.",
      },
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      {
        title: "Group decision-making",
        desc: "WePlanify offers built-in polls and voting so your group can decide on destinations, dates, and activities together. No more endless WhatsApp threads — everyone votes, the group decides.",
      },
      {
        title: "100% free, no hidden fees",
        desc: "Every core feature in WePlanify is free. No payment processing fees, no premium tiers for essential tools. Plan unlimited trips at zero cost.",
      },
      {
        title: "Complete planning toolkit",
        desc: "Packing lists, activity discovery, shared budgets, and collaborative itineraries — all in one place. SquadTrip focuses on logistics while WePlanify covers the entire planning journey.",
      },
      {
        title: "Bilingual support",
        desc: "WePlanify is fully available in English and French. SquadTrip is English-only, which can be a dealbreaker for francophone groups.",
      },
    ],
    whoShouldTitle: "Who Should Choose Each?",
    chooseSquadtrip: "Choose SquadTrip if",
    chooseSquadtripPoints: [
      "You need to collect payments from trip participants",
      "You organize trips professionally and need guest forms/waivers",
      "Payment logistics are your biggest planning headache",
    ],
    chooseWeplanify: "Choose WePlanify if",
    chooseWeplanifyPoints: [
      "You want your whole group to plan together collaboratively",
      "You need polls, shared budgets, and packing lists in one app",
      "You want a completely free solution with no fees",
      "Your group includes French-speaking members",
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Is SquadTrip really free?",
        a: "SquadTrip offers free trip pages, but its core value is payment collection, which involves processing fees. WePlanify is 100% free with no transaction fees — every feature is included at no cost.",
      },
      {
        q: "Can I use WePlanify instead of SquadTrip for group trips?",
        a: "Yes, if your main need is collaborative planning — itineraries, polls, shared budgets, and packing lists. However, if you specifically need to collect payments from participants, SquadTrip is better suited for that. WePlanify focuses on the planning experience, not payment processing.",
      },
      {
        q: "Does WePlanify have a mobile app?",
        a: "WePlanify is currently a responsive web application that works great on all mobile browsers. A dedicated mobile app is on the roadmap. SquadTrip is also a web-based platform.",
      },
    ],
    ctaTitle: "Ready to plan your next group trip?",
    ctaButton: "Get started for free",
    ctaSub: "Free forever. No credit card required.",
    crossLinksTitle: "Discover More",
    free100: "100% free",
    partialFees: "Fees on payments",
    paymentCollection: "With payment collection",
    coreFeature: "Core feature",
    basic: "Basic",
    advanced: "Forms, waivers",
    webApp: "Web app",
  },
  fr: {
    heroTitle: "WePlanify vs SquadTrip",
    heroSubtitle: "Meilleur Organisateur de Voyage de Groupe Gratuit ? (2026)",
    heroIntro:
      "WePlanify et SquadTrip aident tous deux les groupes à organiser leurs voyages, mais ils résolvent des problèmes différents. SquadTrip est centré sur la collecte de paiements et la logistique des invités. WePlanify est un planificateur collaboratif complet avec sondages, budgets partagés et itinéraires — entièrement gratuit.",
    verdictTitle: "Verdict Rapide",
    verdict:
      "SquadTrip est puissant pour les organisateurs de voyages qui gèrent les paiements et la logistique des invités. WePlanify se concentre sur la planification collaborative avec sondages, budgets partagés et itinéraires — entièrement gratuit, sans frais de traitement de paiement.",
    comparisonTitle: "Comparatif Fonctionnalité par Fonctionnalité",
    squadtripShinesTitle: "Les Points Forts de SquadTrip",
    squadtripShinesPoints: [
      {
        title: "Collecte de paiements",
        desc: "La fonctionnalité phare de SquadTrip est sa capacité à collecter les paiements des participants. Si votre voyage de groupe implique de collecter des acomptes, répartir les coûts d'hébergement ou gérer des décharges, SquadTrip gère tout cela nativement.",
      },
      {
        title: "Formulaires et décharges",
        desc: "Besoin que les participants signent des décharges, renseignent leurs préférences alimentaires ou soumettent leurs informations de passeport ? SquadTrip fournit des formulaires structurés et des outils de gestion des invités qui vont au-delà de simples liens d'invitation.",
      },
      {
        title: "Organisation professionnelle de voyages",
        desc: "Si vous gérez une agence de voyage ou organisez des voyages de groupe professionnellement, les fonctionnalités de paiement et de logistique de SquadTrip sont conçues pour cet usage.",
      },
    ],
    weplanifyWinsTitle: "Les Avantages de WePlanify",
    weplanifyWinsPoints: [
      {
        title: "Prise de décision en groupe",
        desc: "WePlanify propose des sondages et votes intégrés pour que votre groupe puisse décider ensemble des destinations, dates et activités. Fini les discussions interminables sur WhatsApp — tout le monde vote, le groupe décide.",
      },
      {
        title: "100% gratuit, sans frais cachés",
        desc: "Toutes les fonctionnalités principales de WePlanify sont gratuites. Pas de frais de traitement de paiement, pas de niveaux premium pour les outils essentiels. Planifiez des voyages illimités à coût zéro.",
      },
      {
        title: "Boîte à outils de planification complète",
        desc: "Listes de bagages, découverte d'activités, budgets partagés et itinéraires collaboratifs — tout au même endroit. SquadTrip se concentre sur la logistique tandis que WePlanify couvre tout le parcours de planification.",
      },
      {
        title: "Support bilingue",
        desc: "WePlanify est entièrement disponible en anglais et en français. SquadTrip est uniquement en anglais, ce qui peut être un obstacle pour les groupes francophones.",
      },
    ],
    whoShouldTitle: "Qui Devrait Choisir Quoi ?",
    chooseSquadtrip: "Choisissez SquadTrip si",
    chooseSquadtripPoints: [
      "Vous devez collecter des paiements auprès des participants",
      "Vous organisez des voyages professionnellement et avez besoin de formulaires/décharges",
      "La logistique de paiement est votre plus grand casse-tête de planification",
    ],
    chooseWeplanify: "Choisissez WePlanify si",
    chooseWeplanifyPoints: [
      "Vous voulez que tout votre groupe planifie ensemble de manière collaborative",
      "Vous avez besoin de sondages, budgets partagés et listes de bagages dans une seule application",
      "Vous voulez une solution entièrement gratuite sans frais",
      "Votre groupe comprend des membres francophones",
    ],
    faqTitle: "Questions Fréquentes",
    faqs: [
      {
        q: "SquadTrip est-il vraiment gratuit ?",
        a: "SquadTrip propose des pages de voyage gratuites, mais sa valeur principale est la collecte de paiements, qui implique des frais de traitement. WePlanify est 100% gratuit sans frais de transaction — toutes les fonctionnalités sont incluses sans coût.",
      },
      {
        q: "Puis-je utiliser WePlanify au lieu de SquadTrip pour les voyages de groupe ?",
        a: "Oui, si votre besoin principal est la planification collaborative — itinéraires, sondages, budgets partagés et listes de bagages. Cependant, si vous devez spécifiquement collecter des paiements auprès des participants, SquadTrip est mieux adapté. WePlanify se concentre sur l'expérience de planification, pas sur le traitement des paiements.",
      },
      {
        q: "WePlanify a-t-il une application mobile ?",
        a: "WePlanify est actuellement une application web responsive qui fonctionne parfaitement sur tous les navigateurs mobiles. Une application mobile dédiée est prévue. SquadTrip est également une plateforme web.",
      },
    ],
    ctaTitle: "Prêt à planifier votre prochain voyage de groupe ?",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de crédit requise.",
    crossLinksTitle: "Découvrir Aussi",
    free100: "100% gratuit",
    partialFees: "Frais sur les paiements",
    paymentCollection: "Avec collecte de paiements",
    coreFeature: "Fonctionnalité principale",
    basic: "Basique",
    advanced: "Formulaires, décharges",
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
  if (value === "free_100")
    return (
      <span className="text-xs font-karla font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
        {t.free100}
      </span>
    );
  if (value === "partial_fees")
    return (
      <span className="text-xs font-karla font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
        {t.partialFees}
      </span>
    );
  if (value === "payment_collection")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.paymentCollection}
      </span>
    );
  if (value === "core_feature")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.coreFeature}
      </span>
    );
  if (value === "basic")
    return (
      <span className="text-xs font-karla font-semibold text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
        {t.basic}
      </span>
    );
  if (value === "advanced")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.advanced}
      </span>
    );
  if (value === "web_app")
    return (
      <span className="text-xs font-karla font-semibold text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
        {t.webApp}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SquadTripComparisonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = content[locale as keyof typeof content] ?? content.en;

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

  // ---- JSON-LD: BreadcrumbList ----
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
        name: "WePlanify vs SquadTrip",
        item: `${SITE_URL}/${locale}/alternatives/squadtrip`,
      },
    ],
  };

  // ---- JSON-LD: FAQPage ----
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
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
        {/* 2. Quick Verdict                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-[#F6391A]/20 bg-white p-6 lg:p-8 shadow-sm">
              <h2 className="font-londrina-solid text-[#F6391A] text-xl lg:text-2xl mb-3">
                {t.verdictTitle}
              </h2>
              <p className="font-karla text-[#001E13]/80 text-sm lg:text-base leading-relaxed">
                {t.verdict}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Comparison table                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.comparisonTitle}
            </h2>

            {/* ---------- Desktop table ---------- */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[220px]">
                      {locale === "fr" ? "Fonctionnalité" : "Feature"}
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm min-w-[160px] text-[#EEF899]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm min-w-[160px] text-[#FFFBF5]">
                      SquadTrip
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.key}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"}
                    >
                      <td className="font-karla text-sm text-[#001E13] px-6 py-3.5 sticky left-0 z-10 bg-inherit">
                        {locale === "fr" ? feature.fr : feature.en}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-emerald-50/40">
                        <CellValue value={feature.weplanify} locale={locale} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={feature.squadtrip} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- Mobile cards ---------- */}
            <div className="lg:hidden space-y-6">
              {[
                { name: "WePlanify", getVal: (f: Feature) => f.weplanify, highlight: true },
                { name: "SquadTrip", getVal: (f: Feature) => f.squadtrip, highlight: false },
              ].map((app) => (
                <div
                  key={app.name}
                  className={`rounded-2xl border p-5 ${
                    app.highlight
                      ? "border-[#F6391A]/30 bg-white shadow-md ring-2 ring-[#F6391A]/10"
                      : "border-[#001E13]/10 bg-white"
                  }`}
                >
                  <h3
                    className={`font-londrina-solid text-xl mb-4 ${
                      app.highlight ? "text-[#F6391A]" : "text-[#001E13]"
                    }`}
                  >
                    {app.name}
                  </h3>
                  <ul className="space-y-2.5">
                    {features.map((feature) => (
                      <li
                        key={feature.key}
                        className="flex items-center justify-between text-sm font-karla"
                      >
                        <span className="text-[#001E13]/80">
                          {locale === "fr" ? feature.fr : feature.en}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={app.getVal(feature)} locale={locale} />
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
        {/* 4a. Where SquadTrip Shines                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.squadtripShinesTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {t.squadtripShinesPoints.map((point, i) => (
                <article
                  key={i}
                  className="rounded-2xl border border-[#001E13]/10 p-6 bg-[#FFFBF5]"
                >
                  <h3 className="font-londrina-solid text-[#001E13] text-lg mb-3">
                    {point.title}
                  </h3>
                  <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                    {point.desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 4b. Where WePlanify Wins                                         */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-12">
              {t.weplanifyWinsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.weplanifyWinsPoints.map((point, i) => (
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
        {/* 4c. Who Should Choose Each                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.whoShouldTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* SquadTrip column */}
              <div className="rounded-2xl border border-[#001E13]/10 p-6 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-4">
                  {t.chooseSquadtrip}
                </h3>
                <ul className="space-y-3">
                  {t.chooseSquadtripPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 font-karla text-sm text-[#001E13]/80">
                      <span className="text-sky-600 mt-0.5 shrink-0">&#x2022;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WePlanify column */}
              <div className="rounded-2xl border border-[#F6391A]/20 p-6 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
                <h3 className="font-londrina-solid text-[#F6391A] text-xl mb-4">
                  {t.chooseWeplanify}
                </h3>
                <ul className="space-y-3">
                  {t.chooseWeplanifyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 font-karla text-sm text-[#001E13]/80">
                      <span className="text-emerald-600 mt-0.5 shrink-0">&#x2713;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 5. FAQ                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {t.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[#001E13]/10 bg-white overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-4 font-karla font-bold text-[#001E13] text-sm lg:text-base flex items-center justify-between">
                    {faq.q}
                    <span className="ml-4 text-[#F6391A] transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6a. CTA banner                                                   */}
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

        {/* ---------------------------------------------------------------- */}
        {/* 6b. Cross-links                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto pt-8 lg:pt-12">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.crossLinksTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Comparatif Complet"
                      : "Full Comparison"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comparez WePlanify avec Wanderlog, SquadTrip, Troupe et TripIt dans notre comparatif complet."
                      : "Compare WePlanify with Wanderlog, SquadTrip, Troupe and TripIt in our full comparison."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir le comparatif →" : "View comparison →"}
                  </span>
                </div>
              </Link>
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
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Guide : Organiser un Voyage de Groupe"
                      : "Guide: How to Plan a Group Trip"}
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
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
