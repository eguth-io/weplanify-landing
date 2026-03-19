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
        "Best Group Trip Planner Apps 2026 — Honest Comparison | WePlanify",
      description:
        "Compare the best group trip planner apps of 2026. See how WePlanify stacks up against Wanderlog, SquadTrip, Troupe and TripIt for collaborative travel planning.",
      keywords: [
        "best group trip planner app",
        "group travel app comparison",
        "wanderlog alternative",
        "squadtrip alternative",
        "group trip planning tools 2026",
      ],
    },
    fr: {
      title:
        "Meilleures Applications Voyage de Groupe 2026 — Comparatif Honnete | WePlanify",
      description:
        "Comparez les meilleures applications de voyage de groupe en 2026. Decouvrez comment WePlanify se compare a Wanderlog, SquadTrip, Troupe et TripIt.",
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
  { key: "collab_itinerary", en: "Collaborative itinerary", fr: "Itineraire collaboratif" },
  { key: "polls", en: "Group polls / voting", fr: "Sondages / votes de groupe" },
  { key: "budget", en: "Shared budget tracker", fr: "Suivi de budget partage" },
  { key: "packing", en: "Packing lists", fr: "Listes de bagages" },
  { key: "discovery", en: "Activity discovery", fr: "Decouverte d'activites" },
  { key: "free", en: "Free plan", fr: "Plan gratuit" },
  { key: "french", en: "Available in French", fr: "Disponible en francais" },
  { key: "realtime", en: "Real-time collaboration", fr: "Collaboration en temps reel" },
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
];

const competitorDetails = {
  en: [
    {
      name: "Wanderlog",
      text: "Wanderlog is a strong itinerary builder with excellent map integration and a polished mobile experience. It shines for solo or couple travel planning. However, it lacks group-specific features like polls and shared budget tracking, and it is only available in English.",
    },
    {
      name: "SquadTrip",
      text: "SquadTrip is purpose-built for group trips and includes voting and budget-splitting features. It is a solid choice for coordinating small groups. That said, it does not yet offer packing lists or activity discovery, and there is no French-language support.",
    },
    {
      name: "Troupe",
      text: "Troupe makes it easy to suggest and vote on activities with friends, and it has a clean mobile app. It focuses more on the discovery and decision phase than on full trip logistics. Budget tracking and packing lists are not part of its current feature set.",
    },
    {
      name: "TripIt",
      text: "TripIt excels at organizing travel confirmations and forwarding booking emails into a clean itinerary. It is ideal for frequent business travellers. However, its collaboration features are limited, and most useful functionality requires a paid Pro subscription.",
    },
  ],
  fr: [
    {
      name: "Wanderlog",
      text: "Wanderlog est un excellent createur d'itineraires avec une integration cartographique soignee et une belle application mobile. Il excelle pour les voyages en solo ou en couple. Cependant, il ne dispose pas de fonctionnalites de groupe comme les sondages ou le suivi de budget partage, et il n'est disponible qu'en anglais.",
    },
    {
      name: "SquadTrip",
      text: "SquadTrip est concu specialement pour les voyages de groupe et inclut des fonctions de vote et de partage de budget. C'est un choix solide pour coordonner de petits groupes. Neanmoins, il ne propose pas encore de listes de bagages ni de decouverte d'activites, et il n'est pas disponible en francais.",
    },
    {
      name: "Troupe",
      text: "Troupe facilite la suggestion et le vote d'activites entre amis, avec une application mobile bien concue. Il se concentre davantage sur la phase de decouverte et de decision que sur la logistique complete du voyage. Le suivi de budget et les listes de bagages ne font pas partie de ses fonctionnalites actuelles.",
    },
    {
      name: "TripIt",
      text: "TripIt excelle dans l'organisation des confirmations de voyage en transformant les e-mails de reservation en itineraire clair. Il est ideal pour les voyageurs d'affaires frequents. Cependant, ses fonctionnalites de collaboration sont limitees et la plupart des options utiles necessitent un abonnement Pro payant.",
    },
  ],
};

const content = {
  en: {
    heroTitle: "Best Group Trip Planner Apps in 2026",
    heroSubtitle: "An honest, side-by-side comparison",
    heroIntro:
      "Planning a trip with friends or family should be exciting, not stressful. We compared the most popular group travel apps so you can pick the right tool for your next adventure. No fluff — just the facts.",
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
    heroSubtitle: "Un comparatif honnete, cote a cote",
    heroIntro:
      "Planifier un voyage entre amis ou en famille devrait etre excitant, pas stressant. Nous avons compare les applications de voyage de groupe les plus populaires pour vous aider a choisir le bon outil pour votre prochaine aventure. Pas de blabla — juste les faits.",
    comparisonTitle: "Comparatif des Fonctionnalites",
    competitorsTitle: "Un Regard Plus Proche sur Chaque Application",
    whyTitle: "Pourquoi Choisir WePlanify ?",
    whyPoints: [
      {
        title: "Plateforme tout-en-un",
        desc: "Itineraire, budget, sondages, listes de bagages et decouverte d'activites dans une seule application. Pas besoin de jongler entre trois outils differents.",
      },
      {
        title: "Gratuit pour toujours",
        desc: "Toutes les fonctionnalites principales sont gratuites, sans mur payant cache ni limite d'essai. Planifiez autant de voyages que vous voulez.",
      },
      {
        title: "Bilingue (EN / FR)",
        desc: "Entierement disponible en anglais et en francais — une rarete parmi les applications de planification de voyage.",
      },
      {
        title: "Concu pour les decisions de groupe",
        desc: "Sondages, votes et collaboration en temps reel pour que chacun ait son mot a dire.",
      },
    ],
    ctaTitle: "Pret a planifier votre prochain voyage de groupe ?",
    ctaButton: "Commencer gratuitement",
    ctaSub: "Gratuit pour toujours. Aucune carte de credit requise.",
    comingSoon: "Bientot",
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

  return (
    <>
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
                      {locale === "fr" ? "Fonctionnalite" : "Feature"}
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
