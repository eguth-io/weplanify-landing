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

type ComparisonRow = {
  key: string;
  en: string;
  fr: string;
  weplanify: string;
  cruzmi: string;
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
  const pathname = "/alternatives/cruzmi";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "WePlanify vs Cruzmi — Best French Group Trip Planner? (2026)",
      description:
        "WePlanify vs Cruzmi: honest comparison of two French-speaking group trip planning apps. Compare features, itineraries, polls, budgets and more.",
      keywords: [
        "weplanify vs cruzmi",
        "cruzmi alternative",
        "french group trip planner",
      ],
    },
    fr: {
      title:
        "WePlanify vs Cruzmi — Meilleur Organisateur de Voyage de Groupe Français ? (2026)",
      description:
        "WePlanify vs Cruzmi : comparatif honnête de deux applications francophones pour organiser un voyage de groupe. Fonctionnalités, itinéraires, sondages, budgets et plus.",
      keywords: [
        "alternative cruzmi",
        "cruzmi ou weplanify",
        "application voyage groupe français",
        "comparatif cruzmi weplanify",
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

const comparisonRows: ComparisonRow[] = [
  {
    key: "collab_itinerary",
    en: "Collaborative itinerary",
    fr: "Itinéraire collaboratif",
    weplanify: "yes",
    cruzmi: "limited",
  },
  {
    key: "polls",
    en: "Group polls / voting",
    fr: "Sondages / votes de groupe",
    weplanify: "yes",
    cruzmi: "basic",
  },
  {
    key: "budget",
    en: "Shared budget tracker",
    fr: "Suivi de budget partagé",
    weplanify: "yes",
    cruzmi: "yes",
  },
  {
    key: "packing",
    en: "Packing lists",
    fr: "Listes de bagages",
    weplanify: "yes",
    cruzmi: "no",
  },
  {
    key: "discovery",
    en: "Activity discovery",
    fr: "Découverte d'activités",
    weplanify: "yes",
    cruzmi: "no",
  },
  {
    key: "day_by_day",
    en: "Day-by-day planning",
    fr: "Planning jour par jour",
    weplanify: "yes",
    cruzmi: "no",
  },
  {
    key: "events",
    en: "Event organization (non-travel)",
    fr: "Organisation d'événements (hors voyage)",
    weplanify: "no",
    cruzmi: "yes_broad",
  },
  {
    key: "french",
    en: "French language",
    fr: "Langue française",
    weplanify: "yes",
    cruzmi: "yes",
  },
  {
    key: "english",
    en: "English language",
    fr: "Langue anglaise",
    weplanify: "yes",
    cruzmi: "no",
  },
  {
    key: "free",
    en: "Free",
    fr: "Gratuit",
    weplanify: "yes",
    cruzmi: "yes",
  },
  {
    key: "mobile",
    en: "Mobile app",
    fr: "Application mobile",
    weplanify: "web_app",
    cruzmi: "yes_mobile",
  },
  {
    key: "web",
    en: "Web access",
    fr: "Accès web",
    weplanify: "yes",
    cruzmi: "limited",
  },
];

const content = {
  en: {
    heroSubtitle: "Comparison for the French market",
    heroTitle: "WePlanify vs Cruzmi — Best French Group Trip Planner?",
    heroIntro:
      "Looking for a group trip planner that speaks French? Cruzmi and WePlanify are two of the only apps that fully support French-speaking travellers. We put them side by side so you can decide which one fits your next trip.",
    verdictTitle: "Quick Verdict",
    verdictText:
      "Cruzmi is a French mobile app for group event organization. WePlanify is a bilingual web app focused specifically on travel planning with collaborative itineraries, group polls, shared budgets, and packing lists. Both speak French, but WePlanify is more travel-focused.",
    comparisonTitle: "Feature Comparison",
    cruzmiShinesTitle: "Where Cruzmi Shines",
    cruzmiShinesPoints: [
      {
        title: "French-only focus",
        desc: "Cruzmi is designed for the French market. The entire experience — interface, support, community — is in French with no translation compromises.",
      },
      {
        title: "Mobile-first design",
        desc: "Built as a mobile app from day one, Cruzmi offers a smooth native experience on iOS and Android for quick event coordination on the go.",
      },
      {
        title: "Broader event scope",
        desc: "Beyond travel, Cruzmi handles group events like parties, outings and dinners. If you need an all-purpose group organizer, it covers more ground.",
      },
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      {
        title: "Travel-specific features",
        desc: "WePlanify is purpose-built for travel: day-by-day itineraries, activity discovery, packing lists, and shared budget tracking designed for trips, not just events.",
      },
      {
        title: "Bilingual (EN / FR)",
        desc: "Fully available in both English and French — ideal for international friend groups or mixed-language families planning a trip together.",
      },
      {
        title: "Web-based flexibility",
        desc: "No app store download required. WePlanify works in any browser on desktop, tablet, or mobile — share a link and everyone can join instantly.",
      },
      {
        title: "Collaborative itineraries",
        desc: "Build a real day-by-day trip plan together with polls, comments, and real-time updates. Cruzmi focuses more on event logistics than detailed trip planning.",
      },
    ],
    whoTitle: "Who Should Choose Which?",
    whoCruzmi:
      "Choose Cruzmi if you are organizing a French-speaking group event that is not necessarily a trip — a birthday party, a weekend outing, or a dinner with friends. Its mobile app makes quick coordination easy.",
    whoWeplanify:
      "Choose WePlanify if you are planning a real trip — whether a weekend getaway or a two-week adventure — and you want structured itineraries, budget tracking, packing lists, and activity discovery. Especially useful for bilingual groups.",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Is Cruzmi better for non-travel events?",
        a: "Yes. Cruzmi has a broader scope that includes parties, outings, and group dinners. If your main goal is not travel planning but general event organization among French-speaking friends, Cruzmi is a solid choice.",
      },
      {
        q: "Does WePlanify work on mobile?",
        a: "Yes. WePlanify is a responsive web application that works in any mobile browser. There is no native app to download — just open the link and start planning. A dedicated mobile app is on the roadmap.",
      },
      {
        q: "Which app is best for a trip with friends?",
        a: "For a trip specifically, WePlanify offers more travel-focused features: collaborative day-by-day itineraries, activity discovery, packing lists, and shared budgets. It is also bilingual, making it ideal for mixed English/French groups.",
      },
    ],
    ctaTitle: "Ready to plan your next group trip?",
    ctaButton: "Get started for free",
    ctaSub: "Free forever. No credit card required.",
    crossLinksTitle: "Compare with Other Apps",
    backToAlternatives: "View all comparisons",
  },
  fr: {
    heroSubtitle: "Comparatif pour le marché français",
    heroTitle: "WePlanify vs Cruzmi — Meilleur Organisateur de Voyage de Groupe Français ?",
    heroIntro:
      "Vous cherchez une application de voyage de groupe en français ? Cruzmi et WePlanify sont parmi les seules applications qui prennent en charge les voyageurs francophones. Nous les avons comparées côte à côte pour vous aider à choisir.",
    verdictTitle: "Verdict Rapide",
    verdictText:
      "Cruzmi est une application mobile française pour l'organisation d'événements de groupe. WePlanify est une application web bilingue axée spécifiquement sur la planification de voyage avec des itinéraires collaboratifs, des sondages de groupe, des budgets partagés et des listes de bagages. Les deux parlent français, mais WePlanify est davantage orienté voyage.",
    comparisonTitle: "Comparatif des Fonctionnalités",
    cruzmiShinesTitle: "Là où Cruzmi Excelle",
    cruzmiShinesPoints: [
      {
        title: "Focus 100 % français",
        desc: "Cruzmi est conçu pour le marché français. L'ensemble de l'expérience — interface, support, communauté — est en français sans compromis de traduction.",
      },
      {
        title: "Conçu pour le mobile",
        desc: "Développé comme application mobile dès le départ, Cruzmi offre une expérience native fluide sur iOS et Android pour coordonner rapidement en déplacement.",
      },
      {
        title: "Portée événementielle plus large",
        desc: "Au-delà du voyage, Cruzmi gère les événements de groupe comme les fêtes, les sorties et les dîners. Si vous avez besoin d'un organisateur de groupe polyvalent, il couvre plus de terrain.",
      },
    ],
    weplanifyWinsTitle: "Là où WePlanify Gagne",
    weplanifyWinsPoints: [
      {
        title: "Fonctionnalités spécifiques au voyage",
        desc: "WePlanify est conçu pour le voyage : itinéraires jour par jour, découverte d'activités, listes de bagages et suivi de budget partagé pensés pour les voyages, pas seulement les événements.",
      },
      {
        title: "Bilingue (EN / FR)",
        desc: "Entièrement disponible en anglais et en français — idéal pour les groupes d'amis internationaux ou les familles multilingues qui planifient un voyage ensemble.",
      },
      {
        title: "Flexibilité web",
        desc: "Aucun téléchargement requis. WePlanify fonctionne dans n'importe quel navigateur sur ordinateur, tablette ou mobile — partagez un lien et tout le monde peut participer instantanément.",
      },
      {
        title: "Itinéraires collaboratifs",
        desc: "Construisez ensemble un vrai planning de voyage jour par jour avec des sondages, des commentaires et des mises à jour en temps réel. Cruzmi se concentre davantage sur la logistique événementielle que sur la planification détaillée de voyage.",
      },
    ],
    whoTitle: "Pour Qui Choisir Quoi ?",
    whoCruzmi:
      "Choisissez Cruzmi si vous organisez un événement de groupe francophone qui n'est pas forcément un voyage — un anniversaire, une sortie le week-end ou un dîner entre amis. Son application mobile rend la coordination rapide et facile.",
    whoWeplanify:
      "Choisissez WePlanify si vous planifiez un vrai voyage — qu'il s'agisse d'un week-end ou d'une aventure de deux semaines — et que vous voulez des itinéraires structurés, un suivi de budget, des listes de bagages et la découverte d'activités. Particulièrement utile pour les groupes bilingues.",
    faqTitle: "Questions Fréquentes",
    faq: [
      {
        q: "Cruzmi est-il mieux pour les événements non-voyage ?",
        a: "Oui. Cruzmi a une portée plus large qui inclut les fêtes, les sorties et les dîners de groupe. Si votre objectif principal n'est pas la planification de voyage mais l'organisation d'événements entre amis francophones, Cruzmi est un choix solide.",
      },
      {
        q: "WePlanify fonctionne-t-il sur mobile ?",
        a: "Oui. WePlanify est une application web responsive qui fonctionne dans n'importe quel navigateur mobile. Il n'y a pas d'application native à télécharger — ouvrez le lien et commencez à planifier. Une application mobile dédiée est prévue.",
      },
      {
        q: "Quelle application est la meilleure pour un voyage entre amis ?",
        a: "Pour un voyage spécifiquement, WePlanify offre plus de fonctionnalités orientées voyage : itinéraires collaboratifs jour par jour, découverte d'activités, listes de bagages et budgets partagés. Il est aussi bilingue, ce qui le rend idéal pour les groupes mixtes anglais/français.",
      },
    ],
    ctaTitle: "Prêt à planifier votre prochain voyage de groupe ?",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de crédit requise.",
    crossLinksTitle: "Comparer avec d'Autres Applications",
    backToAlternatives: "Voir tous les comparatifs",
  },
};

// ---------------------------------------------------------------------------
// Cell label helpers
// ---------------------------------------------------------------------------

function cellLabel(value: string, locale: string): { type: "check" | "cross" | "badge"; label?: string; color?: string } {
  const t = locale === "fr" ? "fr" : "en";
  switch (value) {
    case "yes":
      return { type: "check" };
    case "no":
      return { type: "cross" };
    case "limited":
      return {
        type: "badge",
        label: t === "fr" ? "Limité" : "Limited",
        color: "text-amber-700 bg-amber-50",
      };
    case "basic":
      return {
        type: "badge",
        label: t === "fr" ? "Basique" : "Basic",
        color: "text-amber-700 bg-amber-50",
      };
    case "yes_broad":
      return {
        type: "badge",
        label: t === "fr" ? "Oui (portée large)" : "Yes (broader scope)",
        color: "text-emerald-700 bg-emerald-50",
      };
    case "yes_mobile":
      return {
        type: "badge",
        label: t === "fr" ? "Oui (mobile-first)" : "Yes (mobile-first)",
        color: "text-emerald-700 bg-emerald-50",
      };
    case "web_app":
      return {
        type: "badge",
        label: t === "fr" ? "App web" : "Web app",
        color: "text-sky-700 bg-sky-50",
      };
    default:
      return { type: "cross" };
  }
}

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

function CellValue({ value, locale }: { value: string; locale: string }) {
  const cell = cellLabel(value, locale);
  if (cell.type === "check") return <CheckIcon />;
  if (cell.type === "cross") return <CrossIcon />;
  return (
    <span className={`text-xs font-karla font-semibold rounded-full px-2 py-0.5 ${cell.color}`}>
      {cell.label}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CruzmiComparisonPage({ params }: Props) {
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
        name: "vs Cruzmi",
        item: `https://www.weplanify.com/${locale}/alternatives/cruzmi`,
      },
    ],
  };

  // -----------------------------------------------------------------------
  // JSON-LD: FAQPage
  // -----------------------------------------------------------------------
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
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
                {t.verdictText}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Comparison Table                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.comparisonTitle}
            </h2>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm min-w-[240px]">
                      {locale === "fr" ? "Fonctionnalité" : "Feature"}
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#EEF899] min-w-[160px]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#FFFBF5] min-w-[160px]">
                      Cruzmi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
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
                        <CellValue value={row.cruzmi} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="lg:hidden space-y-6">
              {[
                { name: "WePlanify", dataKey: "weplanify" as const, highlight: true },
                { name: "Cruzmi", dataKey: "cruzmi" as const, highlight: false },
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
                    {comparisonRows.map((row) => (
                      <li
                        key={row.key}
                        className="flex items-center justify-between text-sm font-karla"
                      >
                        <span className="text-[#001E13]/80">
                          {locale === "fr" ? row.fr : row.en}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={row[app.dataKey]} locale={locale} />
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
        {/* 4a. Where Cruzmi Shines                                          */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.cruzmiShinesTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {t.cruzmiShinesPoints.map((point, i) => (
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
        {/* 4c. Who Should Choose Which                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.whoTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#001E13]/10 p-6 lg:p-8 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-3">
                  Cruzmi
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t.whoCruzmi}
                </p>
              </div>
              <div className="rounded-2xl border border-[#F6391A]/20 p-6 lg:p-8 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
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

        {/* ---------------------------------------------------------------- */}
        {/* 5. FAQ                                                           */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {t.faq.map((item, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[#001E13]/10 bg-white overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-5 font-karla font-bold text-[#001E13] text-sm lg:text-base flex items-center justify-between">
                    {item.q}
                    <span className="ml-4 shrink-0 text-[#F6391A] transition-transform group-open:rotate-45 text-xl leading-none">
                      +
                    </span>
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 6. CTA                                                           */}
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
        {/* Cross-links                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl mb-6">
              {t.crossLinksTitle}
            </h2>
            <Link
              href={`/${locale}/alternatives`}
              className="inline-block font-karla font-bold text-[#F6391A] text-sm lg:text-base hover:underline"
            >
              {t.backToAlternatives} &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
