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
  const pathname = "/alternatives/tripit";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "WePlanify vs TripIt — Best Group Trip Organizer? (2026)",
      description:
        "Detailed comparison of WePlanify and TripIt for group travel planning. See how collaborative polls, shared budgets, and real-time planning stack up against TripIt's booking import and flight alerts.",
      keywords: [
        "weplanify vs tripit",
        "tripit alternative for groups",
        "tripit group travel",
        "tripit vs weplanify comparison",
        "best group trip organizer",
      ],
    },
    fr: {
      title:
        "WePlanify vs TripIt — Meilleur Organisateur de Voyage de Groupe ? (2026)",
      description:
        "Comparatif détaillé entre WePlanify et TripIt pour organiser un voyage de groupe. Découvrez les différences entre sondages collaboratifs, budgets partagés et les alertes de vol de TripIt.",
      keywords: [
        "alternative tripit",
        "tripit pour groupe",
        "comparatif tripit",
        "tripit vs weplanify",
        "organisateur voyage groupe",
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

type ComparisonRow = {
  key: string;
  en: string;
  fr: string;
  weplanify: string | boolean;
  tripit: string | boolean;
};

const rows: ComparisonRow[] = [
  {
    key: "collab_itinerary",
    en: "Collaborative itinerary",
    fr: "Itinéraire collaboratif",
    weplanify: true,
    tripit: "limited",
  },
  {
    key: "polls",
    en: "Group polls / voting",
    fr: "Sondages / votes de groupe",
    weplanify: true,
    tripit: false,
  },
  {
    key: "budget",
    en: "Shared budget tracker",
    fr: "Suivi de budget partagé",
    weplanify: true,
    tripit: false,
  },
  {
    key: "booking_import",
    en: "Booking import (email)",
    fr: "Import de réservations (e-mail)",
    weplanify: false,
    tripit: "core",
  },
  {
    key: "packing",
    en: "Packing lists",
    fr: "Listes de bagages",
    weplanify: true,
    tripit: false,
  },
  {
    key: "flight_alerts",
    en: "Airport / flight alerts",
    fr: "Alertes aéroport / vol",
    weplanify: false,
    tripit: "pro",
  },
  {
    key: "discovery",
    en: "Activity discovery",
    fr: "Découverte d'activités",
    weplanify: true,
    tripit: false,
  },
  {
    key: "free",
    en: "Free",
    fr: "Gratuit",
    weplanify: true,
    tripit: "freemium",
  },
  {
    key: "french",
    en: "French language",
    fr: "Disponible en français",
    weplanify: true,
    tripit: false,
  },
  {
    key: "mobile",
    en: "Mobile app",
    fr: "Application mobile",
    weplanify: "web_app",
    tripit: true,
  },
  {
    key: "realtime",
    en: "Real-time collaboration",
    fr: "Collaboration en temps réel",
    weplanify: true,
    tripit: false,
  },
];

const content = {
  en: {
    heroTitle: "WePlanify vs TripIt",
    heroSubtitle: "Best Group Trip Organizer? (2026)",
    heroIntro:
      "TripIt and WePlanify both help you plan trips, but they solve very different problems. TripIt organizes booking confirmations into a personal itinerary. WePlanify is built from the ground up for group collaboration. Here is how they compare.",
    verdictTitle: "TL;DR",
    verdict:
      "TripIt focuses on organizing travel confirmations and personal itineraries. WePlanify is built for group collaboration — polls, shared budgets, and planning together. TripIt is solo-first, WePlanify is group-first.",
    comparisonTitle: "Feature-by-Feature Comparison",
    tripitShinesTitle: "Where TripIt Shines",
    tripitShinesPoints: [
      {
        title: "Automatic booking import",
        desc: "Forward your confirmation emails and TripIt builds your itinerary automatically. Flights, hotels, car rentals — organized in one timeline.",
      },
      {
        title: "Flight and airport alerts",
        desc: "TripIt Pro sends gate changes, delay notifications, and alternative flight suggestions. Useful for frequent flyers who need real-time updates.",
      },
      {
        title: "Mobile app with offline access",
        desc: "TripIt offers a native mobile app with offline access to your itinerary, which can be useful when traveling internationally without data.",
      },
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      {
        title: "Real group collaboration",
        desc: "Everyone in the group can add destinations, suggest activities, and edit the itinerary in real time. TripIt only lets you share a read-only view.",
      },
      {
        title: "Polls and voting",
        desc: "Can not decide between Barcelona and Lisbon? Create a poll and let the group vote. TripIt has no voting feature.",
      },
      {
        title: "Shared budget tracker",
        desc: "Track group expenses, split costs, and keep everyone on the same page financially. TripIt does not track budgets.",
      },
      {
        title: "Activity discovery",
        desc: "Browse and add activities, restaurants, and experiences directly inside WePlanify. TripIt focuses on logistics, not discovery.",
      },
      {
        title: "Free and bilingual",
        desc: "WePlanify is completely free and available in both English and French. TripIt charges $49/year for its most useful features.",
      },
    ],
    whoShouldTitle: "Who Should Choose Which?",
    whoTripit:
      "Choose TripIt if you are a solo business traveler who wants to automatically organize flight confirmations, get gate-change alerts, and keep a personal itinerary with offline access.",
    whoWeplanify:
      "Choose WePlanify if you are planning a trip with friends or family and need everyone to collaborate on the itinerary, vote on destinations, and track shared expenses — all for free.",
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Why switch from TripIt to WePlanify?",
        a: "TripIt is designed for individual travelers managing bookings. It does not support group polls, shared budgets, collaborative packing lists, or real-time group editing. If you are planning with others, WePlanify provides all the coordination tools TripIt lacks — completely free.",
      },
      {
        q: "What does TripIt lack for group trips?",
        a: "TripIt does not offer group voting, shared expense tracking, collaborative itinerary editing, packing lists, or activity discovery. Its sharing is limited to read-only views. WePlanify is built entirely around group collaboration.",
      },
      {
        q: "Is WePlanify really free?",
        a: "Yes. All core features — collaborative itinerary, polls, budget tracker, packing lists, and activity discovery — are free with no trial limits or hidden paywalls. TripIt charges $49/year for its most useful features like flight alerts.",
      },
    ],
    ctaTitle: "Ready to plan your next group trip?",
    ctaButton: "Get started for free",
    ctaSub: "Free forever. No credit card required.",
    featureLabel: "Feature",
    limited: "Shared view only",
    core: "Core feature",
    pro: "Pro ($49/yr)",
    freemium: "Freemium ($49/yr Pro)",
    webApp: "Web app",
    crossLinksTitle: "Compare Other Alternatives",
  },
  fr: {
    heroTitle: "WePlanify vs TripIt",
    heroSubtitle: "Meilleur Organisateur de Voyage de Groupe ? (2026)",
    heroIntro:
      "TripIt et WePlanify vous aident tous les deux \u00e0 planifier des voyages, mais ils r\u00e9solvent des probl\u00e8mes tr\u00e8s diff\u00e9rents. TripIt organise les confirmations de r\u00e9servation en un itin\u00e9raire personnel. WePlanify est con\u00e7u de A \u00e0 Z pour la collaboration de groupe. Voici comment ils se comparent.",
    verdictTitle: "En bref",
    verdict:
      "TripIt se concentre sur l\u2019organisation des confirmations de voyage et les itin\u00e9raires personnels. WePlanify est con\u00e7u pour la collaboration de groupe \u2014 sondages, budgets partag\u00e9s et planification ensemble. TripIt est orient\u00e9 solo, WePlanify est orient\u00e9 groupe.",
    comparisonTitle: "Comparatif Fonctionnalité par Fonctionnalité",
    tripitShinesTitle: "L\u00e0 o\u00f9 TripIt se distingue",
    tripitShinesPoints: [
      {
        title: "Import automatique des r\u00e9servations",
        desc: "Transf\u00e9rez vos e-mails de confirmation et TripIt construit votre itin\u00e9raire automatiquement. Vols, h\u00f4tels, locations de voiture \u2014 organis\u00e9s dans une seule chronologie.",
      },
      {
        title: "Alertes vol et a\u00e9roport",
        desc: "TripIt Pro envoie les changements de porte, les notifications de retard et les suggestions de vols alternatifs. Utile pour les voyageurs fr\u00e9quents qui ont besoin de mises \u00e0 jour en temps r\u00e9el.",
      },
      {
        title: "Application mobile avec acc\u00e8s hors ligne",
        desc: "TripIt propose une application mobile native avec acc\u00e8s hors ligne \u00e0 votre itin\u00e9raire, ce qui peut \u00eatre utile lors de voyages internationaux sans donn\u00e9es.",
      },
    ],
    weplanifyWinsTitle: "Là où WePlanify gagne",
    weplanifyWinsPoints: [
      {
        title: "Vraie collaboration de groupe",
        desc: "Tout le monde dans le groupe peut ajouter des destinations, suggérer des activités et modifier l'itinéraire en temps réel. TripIt ne permet que de partager une vue en lecture seule.",
      },
      {
        title: "Sondages et votes",
        desc: "Impossible de choisir entre Barcelone et Lisbonne ? Créez un sondage et laissez le groupe voter. TripIt n'a aucune fonction de vote.",
      },
      {
        title: "Suivi de budget partagé",
        desc: "Suivez les dépenses du groupe, partagez les coûts et gardez tout le monde sur la même page financièrement. TripIt ne suit pas les budgets.",
      },
      {
        title: "Découverte d'activités",
        desc: "Parcourez et ajoutez des activités, restaurants et expériences directement dans WePlanify. TripIt se concentre sur la logistique, pas la découverte.",
      },
      {
        title: "Gratuit et bilingue",
        desc: "WePlanify est entièrement gratuit et disponible en anglais et en français. TripIt facture 49 $/an pour ses fonctionnalités les plus utiles.",
      },
    ],
    whoShouldTitle: "Qui devrait choisir quoi ?",
    whoTripit:
      "Choisissez TripIt si vous êtes un voyageur d'affaires solo qui veut organiser automatiquement les confirmations de vol, recevoir des alertes de changement de porte et garder un itinéraire personnel avec accès hors ligne.",
    whoWeplanify:
      "Choisissez WePlanify si vous planifiez un voyage entre amis ou en famille et avez besoin que tout le monde collabore sur l'itinéraire, vote sur les destinations et suive les dépenses partagées — le tout gratuitement.",
    faqTitle: "Questions Fréquentes",
    faqs: [
      {
        q: "Pourquoi passer de TripIt \u00e0 WePlanify ?",
        a: "TripIt est con\u00e7u pour les voyageurs individuels qui g\u00e8rent leurs r\u00e9servations. Il ne propose pas de sondages de groupe, de budgets partag\u00e9s, de listes de bagages collaboratives ni d\u2019\u00e9dition de groupe en temps r\u00e9el. Si vous planifiez \u00e0 plusieurs, WePlanify fournit tous les outils de coordination qui manquent \u00e0 TripIt \u2014 enti\u00e8rement gratuitement.",
      },
      {
        q: "Que manque-t-il \u00e0 TripIt pour les voyages de groupe ?",
        a: "TripIt ne propose pas de votes de groupe, de suivi de d\u00e9penses partag\u00e9es, d\u2019\u00e9dition collaborative d\u2019itin\u00e9raire, de listes de bagages ni de d\u00e9couverte d\u2019activit\u00e9s. Son partage se limite \u00e0 des vues en lecture seule. WePlanify est enti\u00e8rement construit autour de la collaboration de groupe.",
      },
      {
        q: "WePlanify est-il vraiment gratuit ?",
        a: "Oui. Toutes les fonctionnalit\u00e9s principales \u2014 itin\u00e9raire collaboratif, sondages, suivi de budget, listes de bagages et d\u00e9couverte d\u2019activit\u00e9s \u2014 sont gratuites sans limite d\u2019essai ni mur payant cach\u00e9. TripIt facture 49 $/an pour ses fonctionnalit\u00e9s les plus utiles comme les alertes de vol.",
      },
    ],
    ctaTitle: "Prêt à planifier votre prochain voyage de groupe ?",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de crédit requise.",
    featureLabel: "Fonctionnalité",
    limited: "Vue partagée uniquement",
    core: "Fonction principale",
    pro: "Pro (49 $/an)",
    freemium: "Freemium (49 $/an Pro)",
    webApp: "App web",
    crossLinksTitle: "Comparer d'autres alternatives",
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
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
  if (value === "limited")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {t.limited}
      </span>
    );
  if (value === "core")
    return (
      <span className="text-xs font-karla font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
        {t.core}
      </span>
    );
  if (value === "pro")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.pro}
      </span>
    );
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.freemium}
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

export default async function TripItComparisonPage({ params }: Props) {
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

  // -----------------------------------------------------------------------
  // JSON-LD: BreadcrumbList
  // -----------------------------------------------------------------------
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
      {
        "@type": "ListItem",
        position: 3,
        name: "WePlanify vs TripIt",
        item: `https://www.weplanify.com/${locale}/alternatives/tripit`,
      },
    ],
  };

  // -----------------------------------------------------------------------
  // JSON-LD: FAQPage
  // -----------------------------------------------------------------------
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
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                         */}
        {/* -------------------------------------------------------------- */}
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

        {/* -------------------------------------------------------------- */}
        {/* 2. Quick verdict                                                */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border-2 border-[#EEF899] bg-[#EEF899]/20 p-6 lg:p-8">
              <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl mb-3">
                {t.verdictTitle}
              </h2>
              <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed">
                {t.verdict}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 3. Comparison table                                             */}
        {/* -------------------------------------------------------------- */}
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
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm min-w-[220px]">
                      {t.featureLabel}
                    </th>
                    <th className="font-karla font-bold text-[#EEF899] text-center px-6 py-4 text-sm min-w-[180px]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-[#FFFBF5] text-center px-6 py-4 text-sm min-w-[180px]">
                      TripIt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.key}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"}
                    >
                      <td className="font-karla text-sm text-[#001E13] px-6 py-3.5">
                        {locale === "fr" ? row.fr : row.en}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-emerald-50/40">
                        <CellValue value={row.weplanify} locale={locale} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={row.tripit} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- Mobile cards ---------- */}
            <div className="lg:hidden space-y-6">
              {[
                { name: "WePlanify", field: "weplanify" as const, highlight: true },
                { name: "TripIt", field: "tripit" as const, highlight: false },
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
                    {rows.map((row) => (
                      <li
                        key={row.key}
                        className="flex items-center justify-between text-sm font-karla"
                      >
                        <span className="text-[#001E13]/80">
                          {locale === "fr" ? row.fr : row.en}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={row[app.field]} locale={locale} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Mid-page CTA                                                    */}
        {/* -------------------------------------------------------------- */}
        <div className="text-center py-8">
          <Link href="https://app.weplanify.com/register" className="text-[#F6391A] font-karla font-bold hover:underline">
            {locale === "fr" ? "Essayez WePlanify gratuitement \u2192" : "Try WePlanify free \u2192"}
          </Link>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 4a. Where TripIt shines                                         */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.tripitShinesTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {t.tripitShinesPoints.map((point, i) => (
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

        {/* -------------------------------------------------------------- */}
        {/* 4b. Where WePlanify wins                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-12">
              {t.weplanifyWinsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* -------------------------------------------------------------- */}
        {/* 4c. Who should choose which                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.whoShouldTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#001E13]/10 p-6 lg:p-8 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-3">
                  TripIt
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t.whoTripit}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#F6391A]/20 p-6 lg:p-8 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
                <h3 className="font-londrina-solid text-[#F6391A] text-xl mb-3">
                  WePlanify
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t.whoWeplanify}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. FAQ                                                          */}
        {/* -------------------------------------------------------------- */}
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
                  <summary className="cursor-pointer list-none px-6 py-5 font-karla font-bold text-[#001E13] text-sm lg:text-base flex items-center justify-between">
                    {faq.q}
                    <span className="ml-4 shrink-0 text-[#001E13]/40 group-open:rotate-45 transition-transform duration-200 text-xl leading-none">
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

        {/* -------------------------------------------------------------- */}
        {/* 6. CTA                                                          */}
        {/* -------------------------------------------------------------- */}
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

        {/* -------------------------------------------------------------- */}
        {/* Cross-links                                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl text-center mb-8">
              {t.crossLinksTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/${locale}/alternatives`}
                className="group rounded-2xl border border-[#001E13]/10 bg-white p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-londrina-solid text-[#001E13] text-lg mb-1">
                  {locale === "fr"
                    ? "Comparatif Complet 2026"
                    : "Full 2026 Comparison"}
                </h3>
                <p className="font-karla text-sm text-[#001E13]/70">
                  {locale === "fr"
                    ? "Voir toutes les alternatives comparées"
                    : "See all alternatives compared"}
                </p>
                <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-2 inline-block">
                  {locale === "fr" ? "Voir le comparatif" : "View comparison"}{" "}
                  &rarr;
                </span>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group rounded-2xl border border-[#001E13]/10 bg-white p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-londrina-solid text-[#001E13] text-lg mb-1">
                  {locale === "fr"
                    ? "Guide : Organiser un Voyage de Groupe"
                    : "Guide: Plan a Group Trip"}
                </h3>
                <p className="font-karla text-sm text-[#001E13]/70">
                  {locale === "fr"
                    ? "Le guide complet étape par étape"
                    : "The complete step-by-step guide"}
                </p>
                <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-2 inline-block">
                  {locale === "fr" ? "Lire le guide" : "Read the guide"} &rarr;
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
