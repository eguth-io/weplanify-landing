import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

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
        "WePlanify vs Cruzmi: detailed comparison of two French-speaking group trip planning apps. Compare features, itineraries, polls, budgets and more.",
    },
    fr: {
      title:
        "WePlanify vs Cruzmi — Meilleur Organisateur de Voyage de Groupe Français ? (2026)",
      description:
        "WePlanify vs Cruzmi : comparatif complet de deux applications francophones pour organiser un voyage de groupe. Fonctionnalités, itinéraires, sondages, budgets et plus.",
    },
  };

  const loc = meta[locale as keyof typeof meta] ?? meta.en;

  return {
    title: loc.title,
    description: loc.description,
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
      "Looking for a group trip planner that speaks French? Cruzmi is a French-language mobile app for organizing group events, but it was not designed specifically for travel. WePlanify is a bilingual web app built from the ground up for trip planning. Here is how they compare.",
    verdictTitle: "Quick Verdict",
    verdictText:
      "Cruzmi is a French mobile app for general group event coordination. It lacks day-by-day itineraries, activity discovery, and packing lists. WePlanify is a bilingual web app purpose-built for travel planning with collaborative itineraries, group polls, shared budgets, and packing lists.",
    comparisonTitle: "Feature Comparison",
    cruzmiShinesTitle: "Where Cruzmi Shines",
    cruzmiShinesPoints: [
      {
        title: "French-only focus",
        desc: "Cruzmi targets the French market. The interface and support are in French only, which means no English option for international groups.",
      },
      {
        title: "Mobile app available",
        desc: "Cruzmi has a native mobile app on iOS and Android. However, its web access is limited, which can be a constraint for desktop planning sessions.",
      },
      {
        title: "Broader event scope",
        desc: "Cruzmi handles group events like parties, outings, and dinners. This generalist approach means travel-specific features like day-by-day itineraries and activity discovery are absent.",
      },
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      {
        title: "Purpose-built for travel",
        desc: "Unlike Cruzmi's generalist event approach, WePlanify is designed exclusively for trip planning: day-by-day itineraries, activity discovery, packing lists, and shared budget tracking all come built-in.",
      },
      {
        title: "Bilingual (EN / FR)",
        desc: "Fully available in both English and French — perfect for international friend groups or mixed-language families. Cruzmi only supports French, leaving English-speaking members behind.",
      },
      {
        title: "Instant web access",
        desc: "No app store download required. WePlanify works in any browser on desktop, tablet, or mobile — share a link and everyone can join in seconds, no matter what device they use.",
      },
      {
        title: "Real collaborative itineraries",
        desc: "Build a detailed day-by-day trip plan together with polls, comments, and real-time updates. Everyone contributes, everyone votes, and the group reaches decisions faster.",
      },
    ],
    whoTitle: "Who Should Choose Which?",
    whoCruzmi:
      "Choose Cruzmi if you are organizing a French-speaking group event that is not a trip — a birthday party, a weekend outing, or a dinner with friends. It is a general-purpose event tool, not a travel planner.",
    whoWeplanify:
      "Choose WePlanify if you are planning an actual trip — whether a weekend getaway or a two-week adventure — and you need structured day-by-day itineraries, budget tracking, packing lists, activity discovery, and group polls. Especially valuable for bilingual groups that need both English and French.",
    faqTitle: "Frequently Asked Questions",
    faq: [
      {
        q: "Is Cruzmi better for non-travel events?",
        a: "Cruzmi has a broader scope that includes parties, outings, and group dinners. If your main goal is general event organization among French-speaking friends rather than travel planning, Cruzmi covers that use case.",
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
    crossLinksTitle: "Compare with Other Apps",
    backToAlternatives: "View all comparisons",
  },
  fr: {
    heroSubtitle: "Comparatif pour le marché français",
    heroTitle: "WePlanify vs Cruzmi — Meilleur Organisateur de Voyage de Groupe Français ?",
    heroIntro:
      "Vous cherchez une application de voyage de groupe en français ? Cruzmi est une application mobile francophone pour organiser des événements de groupe, mais elle n'a pas été conçue spécifiquement pour le voyage. WePlanify est une application web bilingue construite de A à Z pour la planification de voyage. Voici comment elles se comparent.",
    verdictTitle: "Verdict Rapide",
    verdictText:
      "Cruzmi est une application mobile française pour la coordination d'événements de groupe en général. Elle ne propose pas d'itinéraires jour par jour, de découverte d'activités, ni de listes de bagages. WePlanify est une application web bilingue conçue spécifiquement pour la planification de voyage avec des itinéraires collaboratifs, des sondages de groupe, des budgets partagés et des listes de bagages.",
    comparisonTitle: "Comparatif des Fonctionnalités",
    cruzmiShinesTitle: "Là où Cruzmi se Démarque",
    cruzmiShinesPoints: [
      {
        title: "Focus 100 % français",
        desc: "Cruzmi cible le marché français. L'interface et le support sont en français uniquement, ce qui signifie aucune option anglaise pour les groupes internationaux.",
      },
      {
        title: "Application mobile disponible",
        desc: "Cruzmi propose une application native sur iOS et Android. Cependant, son accès web est limité, ce qui peut être contraignant pour la planification sur ordinateur.",
      },
      {
        title: "Portée événementielle plus large",
        desc: "Cruzmi gère les événements de groupe comme les fêtes, les sorties et les dîners. Cette approche généraliste implique l'absence de fonctionnalités spécifiques au voyage comme les itinéraires jour par jour et la découverte d'activités.",
      },
    ],
    weplanifyWinsTitle: "Là où WePlanify Gagne",
    weplanifyWinsPoints: [
      {
        title: "Conçu pour le voyage",
        desc: "Contrairement à l'approche généraliste de Cruzmi, WePlanify est conçu exclusivement pour la planification de voyage : itinéraires jour par jour, découverte d'activités, listes de bagages et suivi de budget partagé sont tous intégrés.",
      },
      {
        title: "Bilingue (EN / FR)",
        desc: "Entièrement disponible en anglais et en français — parfait pour les groupes d'amis internationaux ou les familles multilingues. Cruzmi ne supporte que le français, laissant les membres anglophones de côté.",
      },
      {
        title: "Accès web instantané",
        desc: "Aucun téléchargement requis. WePlanify fonctionne dans n'importe quel navigateur sur ordinateur, tablette ou mobile — partagez un lien et tout le monde peut participer en quelques secondes, quel que soit l'appareil.",
      },
      {
        title: "Vrais itinéraires collaboratifs",
        desc: "Construisez ensemble un planning de voyage détaillé jour par jour avec des sondages, des commentaires et des mises à jour en temps réel. Tout le monde contribue, tout le monde vote, et le groupe prend ses décisions plus rapidement.",
      },
    ],
    whoTitle: "Pour Qui Choisir Quoi ?",
    whoCruzmi:
      "Choisissez Cruzmi si vous organisez un événement de groupe francophone qui n'est pas un voyage — un anniversaire, une sortie le week-end ou un dîner entre amis. C'est un outil d'événements généraliste, pas un planificateur de voyage.",
    whoWeplanify:
      "Choisissez WePlanify si vous planifiez un vrai voyage — qu'il s'agisse d'un week-end ou d'une aventure de deux semaines — et que vous avez besoin d'itinéraires structurés jour par jour, d'un suivi de budget, de listes de bagages, de découverte d'activités et de sondages de groupe. Particulièrement précieux pour les groupes bilingues qui ont besoin du français et de l'anglais.",
    faqTitle: "Questions Fréquentes",
    faq: [
      {
        q: "Cruzmi est-il mieux pour les événements non-voyage ?",
        a: "Cruzmi a une portée plus large qui inclut les fêtes, les sorties et les dîners de groupe. Si votre objectif principal est l'organisation d'événements entre amis francophones plutôt que la planification de voyage, Cruzmi couvre ce cas d'usage.",
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
          <div className="max-w-4xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                  { label: "Alternatives", href: `/${locale}/alternatives` },
                  { label: "vs Cruzmi" },
                ]}
              />
            </div>
          </div>
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
        {/* Mid-page CTA                                                     */}
        {/* ---------------------------------------------------------------- */}
        <div className="text-center py-8">
          <Link href="https://app.weplanify.com/register" className="text-[#F6391A] font-karla font-bold hover:underline">
            {locale === "fr" ? "Essayer WePlanify gratuitement →" : "Try WePlanify free →"}
          </Link>
        </div>

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
