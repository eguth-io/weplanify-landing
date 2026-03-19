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
  wanderlog: string | boolean;
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
  const pathname = "/alternatives/wanderlog";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "WePlanify vs Wanderlog \u2014 Which Group Trip Planner Is Better? (2026)",
      description:
        "Detailed comparison of WePlanify and Wanderlog for group trip planning. Features, pricing, and which app is best for your travel group.",
      keywords: [
        "weplanify vs wanderlog",
        "wanderlog alternative",
        "wanderlog vs weplanify group trip",
      ],
    },
    fr: {
      title:
        "WePlanify vs Wanderlog \u2014 Quel Planificateur de Voyage de Groupe Choisir ? (2026)",
      description:
        "Comparaison d\u00e9taill\u00e9e entre WePlanify et Wanderlog pour organiser un voyage de groupe. Fonctionnalit\u00e9s, prix et quelle application choisir.",
      keywords: [
        "alternative wanderlog",
        "wanderlog ou weplanify",
        "comparatif wanderlog",
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
    fr: "Itin\u00e9raire collaboratif",
    weplanify: true,
    wanderlog: true,
  },
  {
    key: "polls",
    en: "Group polls / voting",
    fr: "Sondages / votes de groupe",
    weplanify: true,
    wanderlog: false,
  },
  {
    key: "budget",
    en: "Shared budget tracker",
    fr: "Suivi de budget partag\u00e9",
    weplanify: true,
    wanderlog: "basic",
  },
  {
    key: "packing",
    en: "Packing lists",
    fr: "Listes de bagages",
    weplanify: true,
    wanderlog: false,
  },
  {
    key: "map",
    en: "Map integration",
    fr: "Int\u00e9gration cartographique",
    weplanify: false,
    wanderlog: true,
  },
  {
    key: "discovery",
    en: "Activity discovery",
    fr: "D\u00e9couverte d\u2019activit\u00e9s",
    weplanify: true,
    wanderlog: true,
  },
  {
    key: "offline",
    en: "Offline access",
    fr: "Acc\u00e8s hors ligne",
    weplanify: false,
    wanderlog: true,
  },
  {
    key: "mobile",
    en: "Mobile app",
    fr: "Application mobile",
    weplanify: "web_app",
    wanderlog: true,
  },
  {
    key: "free",
    en: "Free plan",
    fr: "Plan gratuit",
    weplanify: true,
    wanderlog: true,
  },
  {
    key: "french",
    en: "French language",
    fr: "Disponible en fran\u00e7ais",
    weplanify: true,
    wanderlog: false,
  },
  {
    key: "realtime",
    en: "Real-time collaboration",
    fr: "Collaboration en temps r\u00e9el",
    weplanify: true,
    wanderlog: true,
  },
];

const content = {
  en: {
    heroTitle: "WePlanify vs Wanderlog",
    heroSubtitle: "Complete comparison \u2014 2026",
    heroIntro:
      "Wanderlog and WePlanify both help you plan trips, but they solve different problems. Wanderlog is an itinerary builder oriented toward solo and couple travel. WePlanify is designed from the ground up for groups. Here is an objective, side-by-side look at both apps so you can decide which one fits your next trip.",
    verdictTitle: "TL;DR",
    verdict:
      "Wanderlog focuses on solo/couple travel with map-based planning. WePlanify is built specifically for groups with polls, shared budgets, and collaborative decision-making. Both are free.",
    comparisonTitle: "Head-to-Head Comparison",
    wanderlogShinesTitle: "Where Wanderlog Shines",
    wanderlogShinesPoints: [
      "Map integration \u2014 plot your route on an interactive map with driving/walking directions between stops.",
      "Offline access \u2014 download your itinerary and maps for use without an internet connection.",
      "Mobile apps \u2014 native iOS and Android apps available for on-the-go access.",
      "Restaurant and hotel search \u2014 search, save, and organize places to eat and stay within the app.",
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      "Group polls and voting \u2014 let everyone vote on destinations, dates, and activities so no one feels left out.",
      "Shared budget tracker \u2014 track group expenses, split costs, and keep everyone on the same financial page.",
      "Packing lists \u2014 collaborative packing lists ensure nothing gets forgotten and items are not duplicated.",
      "Bilingual (EN/FR) \u2014 fully available in English and French, a rare feature among travel planning apps.",
    ],
    chooseWanderlogTitle: "Who Should Choose Wanderlog?",
    chooseWanderlogPoints: [
      "Solo travellers or couples who want a visual, map-first planning experience.",
      "Road trip planners who need offline maps and driving directions.",
      "Travellers who prefer native mobile apps over web-based tools.",
      "People focused on discovering restaurants and hotels within the planning tool.",
    ],
    chooseWeplanifyTitle: "Who Should Choose WePlanify?",
    chooseWeplanifyPoints: [
      "Friend groups of 4 or more who need to coordinate schedules, preferences, and budgets.",
      "Bachelorette or bachelor party planners juggling opinions from a large group.",
      "Anyone who wants built-in group decision tools like polls and shared task lists.",
      "Francophone travellers who need a fully French-language experience.",
    ],
    faqTitle: "Frequently Asked Questions",
    faqs: [
      {
        q: "Can I switch from Wanderlog to WePlanify?",
        a: "Yes! You can start a new trip on WePlanify in minutes. While there is no automated import, WePlanify\u2019s simple interface makes it fast to recreate your itinerary \u2014 and you will immediately gain access to group features like polls and shared budgets that Wanderlog does not offer.",
      },
      {
        q: "Why switch from Wanderlog to WePlanify?",
        a: "If you are planning a trip with a group, Wanderlog lacks polls, shared budgets, and collaborative packing lists. WePlanify provides all of these tools out of the box, making group coordination seamless instead of scattered across multiple apps.",
      },
      {
        q: "What does Wanderlog lack for group trips?",
        a: "Wanderlog does not offer group voting, shared expense tracking, or collaborative packing lists. Its collaboration features are limited to sharing an itinerary, but decision-making tools for groups are absent. WePlanify fills that gap entirely.",
      },
      {
        q: "Which app is better for large groups?",
        a: "WePlanify is the clear winner for large groups. Features like group polls, shared budgets, and collaborative packing lists are specifically designed to handle the complexity of coordinating multiple travellers. Wanderlog\u2019s collaboration features work for small groups but lack the decision-making tools larger groups need.",
      },
    ],
    ctaTitle: "Try WePlanify free \u2014 built for groups",
    ctaButton: "Get started for free",
    crossLinksTitle: "Explore More",
    basic: "Basic",
    webApp: "Web app",
  },
  fr: {
    heroTitle: "WePlanify vs Wanderlog",
    heroSubtitle: "Comparaison compl\u00e8te \u2014 2026",
    heroIntro:
      "Wanderlog et WePlanify vous aident tous deux \u00e0 planifier des voyages, mais ils r\u00e9pondent \u00e0 des besoins diff\u00e9rents. Wanderlog est un cr\u00e9ateur d\u2019itin\u00e9raires orient\u00e9 vers les voyages en solo ou en couple. WePlanify est con\u00e7u de A \u00e0 Z pour les groupes. Voici un comparatif objectif des deux applications pour vous aider \u00e0 choisir celle qui convient \u00e0 votre prochain voyage.",
    verdictTitle: "En bref",
    verdict:
      "Wanderlog se concentre sur les voyages solo/couple avec sa planification bas\u00e9e sur les cartes. WePlanify est con\u00e7u sp\u00e9cifiquement pour les groupes avec des sondages, des budgets partag\u00e9s et une prise de d\u00e9cision collaborative. Les deux sont gratuits.",
    comparisonTitle: "Comparatif Face \u00e0 Face",
    wanderlogShinesTitle: "L\u00e0 o\u00f9 Wanderlog Brille",
    wanderlogShinesPoints: [
      "Int\u00e9gration cartographique \u2014 tracez votre itin\u00e9raire sur une carte interactive avec les directions entre chaque \u00e9tape.",
      "Acc\u00e8s hors ligne \u2014 t\u00e9l\u00e9chargez votre itin\u00e9raire et vos cartes pour les utiliser sans connexion internet.",
      "Applications mobiles \u2014 applications natives iOS et Android disponibles pour un acc\u00e8s en d\u00e9placement.",
      "Recherche de restaurants et h\u00f4tels \u2014 cherchez, enregistrez et organisez les lieux o\u00f9 manger et dormir dans l\u2019application.",
    ],
    weplanifyWinsTitle: "L\u00e0 o\u00f9 WePlanify Gagne",
    weplanifyWinsPoints: [
      "Sondages et votes de groupe \u2014 laissez chacun voter sur les destinations, les dates et les activit\u00e9s pour que personne ne se sente exclu.",
      "Suivi de budget partag\u00e9 \u2014 suivez les d\u00e9penses du groupe, r\u00e9partissez les co\u00fbts et gardez tout le monde align\u00e9 financi\u00e8rement.",
      "Listes de bagages \u2014 des listes collaboratives pour ne rien oublier et \u00e9viter les doublons.",
      "Bilingue (EN/FR) \u2014 enti\u00e8rement disponible en anglais et en fran\u00e7ais, une fonctionnalit\u00e9 rare parmi les applications de voyage.",
    ],
    chooseWanderlogTitle: "Qui devrait choisir Wanderlog ?",
    chooseWanderlogPoints: [
      "Les voyageurs solo ou les couples qui veulent une exp\u00e9rience de planification visuelle centr\u00e9e sur la carte.",
      "Les planificateurs de road trips qui ont besoin de cartes hors ligne et d\u2019itin\u00e9raires routiers.",
      "Les voyageurs qui pr\u00e9f\u00e8rent les applications mobiles natives aux outils web.",
      "Ceux qui veulent d\u00e9couvrir restaurants et h\u00f4tels directement dans l\u2019outil de planification.",
    ],
    chooseWeplanifyTitle: "Qui devrait choisir WePlanify ?",
    chooseWeplanifyPoints: [
      "Les groupes d\u2019amis de 4 personnes ou plus qui doivent coordonner emplois du temps, pr\u00e9f\u00e9rences et budgets.",
      "Les organisateurs d\u2019EVJF ou d\u2019EVG qui jonglent avec les avis d\u2019un grand groupe.",
      "Tous ceux qui veulent des outils de d\u00e9cision de groupe int\u00e9gr\u00e9s comme les sondages et les listes de t\u00e2ches partag\u00e9es.",
      "Les voyageurs francophones qui ont besoin d\u2019une exp\u00e9rience enti\u00e8rement en fran\u00e7ais.",
    ],
    faqTitle: "Questions Fr\u00e9quentes",
    faqs: [
      {
        q: "Peut-on passer de Wanderlog \u00e0 WePlanify ?",
        a: "Oui ! Vous pouvez cr\u00e9er un nouveau voyage sur WePlanify en quelques minutes. Bien qu\u2019il n\u2019y ait pas d\u2019import automatis\u00e9, l\u2019interface simple de WePlanify permet de recr\u00e9er rapidement votre itin\u00e9raire \u2014 et vous aurez imm\u00e9diatement acc\u00e8s aux fonctionnalit\u00e9s de groupe comme les sondages et les budgets partag\u00e9s que Wanderlog ne propose pas.",
      },
      {
        q: "Pourquoi passer de Wanderlog \u00e0 WePlanify ?",
        a: "Si vous planifiez un voyage en groupe, Wanderlog ne propose ni sondages, ni budgets partag\u00e9s, ni listes de bagages collaboratives. WePlanify offre tous ces outils nativement, rendant la coordination de groupe fluide au lieu d\u2019\u00eatre dispers\u00e9e sur plusieurs applications.",
      },
      {
        q: "Que manque-t-il \u00e0 Wanderlog pour les voyages de groupe ?",
        a: "Wanderlog ne propose pas de votes de groupe, de suivi de d\u00e9penses partag\u00e9es ni de listes de bagages collaboratives. Ses fonctionnalit\u00e9s de collaboration se limitent au partage d\u2019un itin\u00e9raire, mais les outils de prise de d\u00e9cision pour les groupes sont absents. WePlanify comble enti\u00e8rement cette lacune.",
      },
      {
        q: "Quelle application est meilleure pour les grands groupes ?",
        a: "WePlanify est le grand gagnant pour les grands groupes. Les sondages de groupe, les budgets partag\u00e9s et les listes de bagages collaboratives sont sp\u00e9cifiquement con\u00e7us pour g\u00e9rer la complexit\u00e9 de la coordination de plusieurs voyageurs. Les fonctionnalit\u00e9s de collaboration de Wanderlog fonctionnent pour les petits groupes, mais manquent d\u2019outils de prise de d\u00e9cision dont les grands groupes ont besoin.",
      },
    ],
    ctaTitle: "Essayez WePlanify gratuitement \u2014 con\u00e7u pour les groupes",
    ctaButton: "Commencer gratuitement",
    crossLinksTitle: "D\u00e9couvrir aussi",
    basic: "Basique",
    webApp: "App web",
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 mx-auto"
      style={{ color: "#001E13" }}
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
      className="w-5 h-5 mx-auto"
      style={{ color: "#F6391A" }}
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
  if (value === "basic")
    return (
      <span className="text-xs font-karla font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
        {t.basic}
      </span>
    );
  if (value === "web_app")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t.webApp}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function WanderlogComparisonPage({ params }: Props) {
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
        name: "vs Wanderlog",
        item: `https://www.weplanify.com/${locale}/alternatives/wanderlog`,
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
        {/* 1. Hero                                                        */}
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
        {/* 2. Quick verdict box                                           */}
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
        {/* 3. Head-to-head comparison table / cards                       */}
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
                      {locale === "fr" ? "Fonctionnalit\u00e9" : "Feature"}
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#EEF899] min-w-[160px]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#FFFBF5] min-w-[160px]">
                      Wanderlog
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.key}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"}
                    >
                      <td className="font-karla text-sm text-[#001E13] px-6 py-3.5">
                        {locale === "fr" ? feature.fr : feature.en}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-[#EEF899]/10">
                        <CellValue value={feature.weplanify} locale={locale} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={feature.wanderlog} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- Mobile cards ---------- */}
            <div className="lg:hidden space-y-6">
              {/* WePlanify card */}
              <div className="rounded-2xl border border-[#F6391A]/30 bg-white shadow-md ring-2 ring-[#F6391A]/10 p-5">
                <h3 className="font-londrina-solid text-xl mb-4 text-[#F6391A]">
                  WePlanify
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
                        <CellValue value={feature.weplanify} locale={locale} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Wanderlog card */}
              <div className="rounded-2xl border border-[#001E13]/10 bg-white p-5">
                <h3 className="font-londrina-solid text-xl mb-4 text-[#001E13]">
                  Wanderlog
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
                        <CellValue value={feature.wanderlog} locale={locale} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* Mid-page CTA                                                   */}
        {/* -------------------------------------------------------------- */}
        <div className="text-center py-8">
          <Link href="https://app.weplanify.com/register" className="text-[#F6391A] font-karla font-bold hover:underline">
            {locale === "fr" ? "Essayez WePlanify gratuitement \u2192" : "Try WePlanify free \u2192"}
          </Link>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 4. Detailed sections                                           */}
        {/* -------------------------------------------------------------- */}

        {/* Where Wanderlog shines */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.wanderlogShinesTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.wanderlogShinesPoints.map((point, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#001E13]/10 bg-[#FFFBF5] p-6"
                >
                  <p className="font-karla text-sm text-[#001E13]/80 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where WePlanify wins */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.weplanifyWinsTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.weplanifyWinsPoints.map((point, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-[#001E13] p-6"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[#EEF899] text-[#001E13] font-londrina-solid text-sm">
                      {i + 1}
                    </span>
                  </div>
                  <p className="font-karla text-sm text-[#FFFBF5]/85 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who should choose Wanderlog */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-8">
              {t.chooseWanderlogTitle}
            </h2>
            <ul className="space-y-4">
              {t.chooseWanderlogPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-karla text-sm text-[#001E13]/80 leading-relaxed"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#61DBD5]/30 flex items-center justify-center text-[#001E13] text-xs font-bold">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Who should choose WePlanify */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-8">
              {t.chooseWeplanifyTitle}
            </h2>
            <ul className="space-y-4">
              {t.chooseWeplanifyPoints.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 font-karla text-sm text-[#001E13]/80 leading-relaxed"
                >
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-[#F6391A]/15 flex items-center justify-center text-[#F6391A] text-xs font-bold">
                    {i + 1}
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 5. FAQ                                                         */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {t.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#001E13]/10 bg-[#FFFBF5] p-6"
                >
                  <h3 className="font-londrina-solid text-[#001E13] text-lg mb-3">
                    {faq.q}
                  </h3>
                  <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 6. CTA                                                         */}
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
          </div>
        </section>

        {/* -------------------------------------------------------------- */}
        {/* 7. Cross-links                                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.crossLinksTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Toutes les Alternatives"
                      : "All Alternatives"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comparez WePlanify avec toutes les applications de voyage de groupe populaires."
                      : "Compare WePlanify with all popular group trip planning apps."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir le comparatif \u2192" : "See comparison \u2192"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
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
                    {locale === "fr" ? "En savoir plus \u2192" : "Read more \u2192"}
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Guide : Organiser un Voyage de Groupe"
                      : "Guide: How to Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet \u00e9tape par \u00e9tape pour organiser un voyage de groupe r\u00e9ussi."
                      : "The complete step-by-step guide to planning a successful group trip."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide \u2192" : "Read the guide \u2192"}
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
