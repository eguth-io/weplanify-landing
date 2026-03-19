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
  stippl: string | boolean;
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
  const pathname = "/alternatives/stippl";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const meta = {
    en: {
      title:
        "WePlanify vs Stippl \u2014 Which Travel Planner Is Best for Groups? (2026)",
      description:
        "Honest comparison of WePlanify and Stippl for group trip planning. Features, pricing, and which travel planner is best for your group.",
      keywords: [
        "weplanify vs stippl",
        "stippl alternative",
        "stippl vs weplanify group travel",
      ],
    },
    fr: {
      title:
        "WePlanify vs Stippl \u2014 Quel Planificateur de Voyage Choisir pour un Groupe ? (2026)",
      description:
        "Comparaison honn\u00eate entre WePlanify et Stippl pour organiser un voyage de groupe. Fonctionnalit\u00e9s, prix et quel planificateur choisir.",
      keywords: [
        "alternative stippl",
        "stippl ou weplanify",
        "comparatif stippl",
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
    stippl: true,
  },
  {
    key: "polls",
    en: "Group polls / voting",
    fr: "Sondages / votes de groupe",
    weplanify: true,
    stippl: false,
  },
  {
    key: "budget",
    en: "Shared budget tracker",
    fr: "Suivi de budget partag\u00e9",
    weplanify: true,
    stippl: false,
  },
  {
    key: "packing",
    en: "Packing lists",
    fr: "Listes de bagages",
    weplanify: true,
    stippl: true,
  },
  {
    key: "map",
    en: "Map integration",
    fr: "Int\u00e9gration cartographique",
    weplanify: "basic",
    stippl: true,
  },
  {
    key: "discovery",
    en: "Activity discovery",
    fr: "D\u00e9couverte d\u2019activit\u00e9s",
    weplanify: true,
    stippl: true,
  },
  {
    key: "journal",
    en: "Travel journal / reels",
    fr: "Carnet de voyage / reels",
    weplanify: false,
    stippl: true,
  },
  {
    key: "community",
    en: "Community itineraries",
    fr: "Itin\u00e9raires communautaires",
    weplanify: false,
    stippl: true,
  },
  {
    key: "free",
    en: "Free plan",
    fr: "Plan gratuit",
    weplanify: true,
    stippl: true,
  },
  {
    key: "french",
    en: "French language",
    fr: "Disponible en fran\u00e7ais",
    weplanify: true,
    stippl: false,
  },
  {
    key: "mobile",
    en: "Mobile app",
    fr: "Application mobile",
    weplanify: "web_app",
    stippl: true,
  },
  {
    key: "realtime",
    en: "Real-time collaboration",
    fr: "Collaboration en temps r\u00e9el",
    weplanify: true,
    stippl: true,
  },
];

const content = {
  en: {
    heroTitle: "WePlanify vs Stippl",
    heroSubtitle: "Honest comparison \u2014 2026 edition",
    heroIntro:
      "Stippl is a mobile-first travel planner with journals, automatic reels, and community-shared itineraries. WePlanify is designed from the ground up for group decision-making with polls, shared budgets, and collaborative planning. Here is a side-by-side look at both apps.",
    verdictTitle: "TL;DR",
    verdict:
      "Stippl offers visual trip planning with travel journals, automatic reels, and community-shared itineraries. However, it lacks group polls, shared budget tracking, and French language support. WePlanify is built for group decision-making with polls, shared budgets, and collaborative planning. Choose Stippl for solo documentation, WePlanify for group coordination.",
    comparisonTitle: "Head-to-Head Comparison",
    stipplShinesTitle: "Where Stippl Shines",
    stipplShinesPoints: [
      "Night-to-day planning engine \u2014 an approach that connects accommodations with nearby activities for day-by-day planning. It does not include group polls or budget tracking.",
      "Travel journals and automatic reels \u2014 document your trip with photos and the app generates reels. This is a post-trip feature, not a planning tool.",
      "Community itineraries \u2014 browse and clone itineraries shared by other travellers. Useful for solo inspiration, less so for group decision-making.",
      "Mobile-first experience \u2014 native iOS and Android apps for on-the-go planning. No French language support and no web-based desktop access.",
    ],
    weplanifyWinsTitle: "Where WePlanify Wins",
    weplanifyWinsPoints: [
      "Group polls and voting \u2014 let everyone vote on destinations, dates, and activities so no one feels left out. Stippl has no equivalent feature for group decisions.",
      "Shared budget tracker \u2014 track group expenses, split costs, and keep everyone aligned financially throughout the trip. This is a feature Stippl does not offer.",
      "Packing lists \u2014 collaborative packing lists ensure nothing gets forgotten and items are not duplicated across the group. A key advantage for group travel.",
      "Bilingual (EN/FR) \u2014 fully available in English and French, making WePlanify accessible to francophone travellers who are underserved by English-only apps like Stippl.",
    ],
    chooseStipplTitle: "Who Should Choose Stippl?",
    chooseStipplPoints: [
      "Solo travellers or couples who want to document their trips with journals and reels.",
      "Visual planners who prefer a mobile-first, map-based planning experience.",
      "Travellers who want to discover and clone community-shared itineraries for inspiration.",
      "People who value trip documentation and sharing as much as the planning itself.",
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
        q: "Can I use Stippl for group trips?",
        a: "Stippl supports collaborative itineraries and real-time collaboration, so multiple people can work on the same trip. However, it lacks group-specific features like polls, voting, and shared budget tracking that make coordinating opinions and expenses in larger groups much easier. For groups of 4 or more, WePlanify is the better choice.",
      },
      {
        q: "Is Stippl free?",
        a: "Yes, Stippl offers a free plan that includes its core features like itinerary planning, travel journals, and community itineraries. WePlanify is also free forever with no hidden paywalls or feature restrictions.",
      },
      {
        q: "Which app is better for trip documentation?",
        a: "Stippl has travel journal and automatic reel features for capturing trip memories. WePlanify focuses on the planning and coordination phase rather than post-trip documentation. If documentation is your priority over group planning tools, Stippl covers that use case.",
      },
    ],
    ctaTitle: "Try WePlanify free \u2014 built for groups",
    ctaButton: "Get started for free",
    ctaSub: "Free forever. No credit card required.",
    crossLinksTitle: "Explore More",
    basic: "Basic",
    webApp: "Web app",
  },
  fr: {
    heroTitle: "WePlanify vs Stippl",
    heroSubtitle: "Comparaison honn\u00eate \u2014 \u00e9dition 2026",
    heroIntro:
      "Stippl est un planificateur de voyage visuel, mobile-first, avec des carnets de voyage, des reels automatiques et des itin\u00e9raires partag\u00e9s par la communaut\u00e9. WePlanify est con\u00e7u de A \u00e0 Z pour la prise de d\u00e9cision en groupe avec des sondages, des budgets partag\u00e9s et une planification collaborative. Voici un comparatif des deux applications.",
    verdictTitle: "En bref",
    verdict:
      "Stippl propose une planification visuelle avec des carnets de voyage, des reels automatiques et des itin\u00e9raires communautaires. Cependant, il ne propose pas de sondages de groupe, de suivi de budget partag\u00e9, ni de support en fran\u00e7ais. WePlanify est con\u00e7u pour la prise de d\u00e9cision en groupe avec des sondages, des budgets partag\u00e9s et une planification collaborative. Choisissez Stippl pour la documentation solo, WePlanify pour la coordination de groupe.",
    comparisonTitle: "Comparatif Face \u00e0 Face",
    stipplShinesTitle: "L\u00e0 o\u00f9 Stippl se D\u00e9marque",
    stipplShinesPoints: [
      "Moteur de planification nuit-jour \u2014 une approche qui relie les h\u00e9bergements aux activit\u00e9s \u00e0 proximit\u00e9 pour la planification jour par jour. Ne comprend pas de sondages de groupe ni de suivi de budget.",
      "Carnets de voyage et reels automatiques \u2014 documentez votre voyage en photos et l\u2019application g\u00e9n\u00e8re des reels. C\u2019est une fonctionnalit\u00e9 post-voyage, pas un outil de planification.",
      "Itin\u00e9raires communautaires \u2014 parcourez et clonez les itin\u00e9raires partag\u00e9s par d\u2019autres voyageurs. Utile pour l\u2019inspiration solo, moins pour la prise de d\u00e9cision en groupe.",
      "Exp\u00e9rience mobile-first \u2014 applications natives iOS et Android pour planifier en d\u00e9placement. Pas de support en fran\u00e7ais et pas d\u2019acc\u00e8s web sur ordinateur.",
    ],
    weplanifyWinsTitle: "L\u00e0 o\u00f9 WePlanify Gagne",
    weplanifyWinsPoints: [
      "Sondages et votes de groupe \u2014 laissez chacun voter sur les destinations, les dates et les activit\u00e9s pour que personne ne se sente exclu. Stippl ne propose pas d\u2019\u00e9quivalent pour les d\u00e9cisions de groupe.",
      "Suivi de budget partag\u00e9 \u2014 suivez les d\u00e9penses du groupe, r\u00e9partissez les co\u00fbts et gardez tout le monde align\u00e9 financi\u00e8rement. Une fonctionnalit\u00e9 que Stippl ne propose pas.",
      "Listes de bagages \u2014 des listes collaboratives pour ne rien oublier et \u00e9viter les doublons au sein du groupe. Un avantage cl\u00e9 pour les voyages de groupe.",
      "Bilingue (EN/FR) \u2014 enti\u00e8rement disponible en anglais et en fran\u00e7ais, rendant WePlanify accessible aux voyageurs francophones mal desservis par les applications anglophones comme Stippl.",
    ],
    chooseStipplTitle: "Qui devrait choisir Stippl ?",
    chooseStipplPoints: [
      "Les voyageurs solo ou les couples qui veulent documenter leurs voyages avec des carnets et des reels.",
      "Les planificateurs visuels qui pr\u00e9f\u00e8rent une exp\u00e9rience mobile-first centr\u00e9e sur la carte.",
      "Les voyageurs qui veulent d\u00e9couvrir et cloner des itin\u00e9raires communautaires pour s\u2019inspirer.",
      "Ceux qui accordent autant d\u2019importance \u00e0 la documentation du voyage qu\u2019\u00e0 la planification elle-m\u00eame.",
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
        q: "Peut-on utiliser Stippl pour les voyages de groupe ?",
        a: "Stippl prend en charge les itin\u00e9raires collaboratifs et la collaboration en temps r\u00e9el, permettant \u00e0 plusieurs personnes de travailler sur le m\u00eame voyage. Cependant, il manque de fonctionnalit\u00e9s sp\u00e9cifiques au groupe comme les sondages, les votes et le suivi de budget partag\u00e9 qui facilitent grandement la coordination des avis et des d\u00e9penses dans les grands groupes. Pour les groupes de 4 personnes ou plus, WePlanify est le meilleur choix.",
      },
      {
        q: "Stippl est-il gratuit ?",
        a: "Oui, Stippl propose un plan gratuit qui inclut ses fonctionnalit\u00e9s principales comme la planification d\u2019itin\u00e9raires, les carnets de voyage et les itin\u00e9raires communautaires. WePlanify est \u00e9galement gratuit pour toujours, sans mur payant cach\u00e9 ni restriction de fonctionnalit\u00e9s.",
      },
      {
        q: "Quelle application est meilleure pour documenter un voyage ?",
        a: "Stippl propose des carnets de voyage et des reels automatiques pour capturer vos souvenirs. WePlanify se concentre sur la phase de planification et de coordination plut\u00f4t que sur la documentation post-voyage. Si la documentation est votre priorit\u00e9 plut\u00f4t que les outils de planification de groupe, Stippl couvre ce cas d\u2019usage.",
      },
    ],
    ctaTitle: "Essayez WePlanify gratuitement \u2014 con\u00e7u pour les groupes",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de cr\u00e9dit requise.",
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

export default async function StipplComparisonPage({ params }: Props) {
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
        name: "vs Stippl",
        item: `https://www.weplanify.com/${locale}/alternatives/stippl`,
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
                      Stippl
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
                        <CellValue value={feature.stippl} locale={locale} />
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
              {/* Stippl card */}
              <div className="rounded-2xl border border-[#001E13]/10 bg-white p-5">
                <h3 className="font-londrina-solid text-xl mb-4 text-[#001E13]">
                  Stippl
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
                        <CellValue value={feature.stippl} locale={locale} />
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
            {locale === "fr" ? "Essayer WePlanify gratuitement →" : "Try WePlanify free →"}
          </Link>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 4. Detailed sections                                           */}
        {/* -------------------------------------------------------------- */}

        {/* Where Stippl shines */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t.stipplShinesTitle}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {t.stipplShinesPoints.map((point, i) => (
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

        {/* Who should choose Stippl */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-8">
              {t.chooseStipplTitle}
            </h2>
            <ul className="space-y-4">
              {t.chooseStipplPoints.map((point, i) => (
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
            <p className="font-karla text-[#FFFBF5]/80 text-xs lg:text-sm mt-4">
              {t.ctaSub}
            </p>
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
              <Link href={`/${locale}/alternatives/wanderlog`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "WePlanify vs Wanderlog"
                      : "WePlanify vs Wanderlog"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comparaison d\u00e9taill\u00e9e entre WePlanify et Wanderlog pour les voyages de groupe."
                      : "Detailed comparison between WePlanify and Wanderlog for group travel."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir le comparatif \u2192" : "See comparison \u2192"}
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
