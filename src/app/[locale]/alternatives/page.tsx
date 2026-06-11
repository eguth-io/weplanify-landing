import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { hreflangLanguages } from "@/lib/metadata";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Props = {
  params: Promise<{ locale: string }>;
};

type Feature = {
  key: string;
  label: string;
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
  const t = await getTranslations({ locale, namespace: "alternativesIndex" });

  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: currentUrl,
      languages: hreflangLanguages(SITE_URL, "${pathname}"),
    },
  };
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

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
  comingSoon,
  freemium,
}: {
  value: string | boolean;
  comingSoon: string;
  freemium: string;
}) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "coming_soon")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {comingSoon}
      </span>
    );
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {freemium}
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

  const t = await getTranslations("alternativesIndex");
  const features = t.raw("features") as Feature[];
  const details = t.raw("competitorDetails") as {
    name: string;
    text: string;
  }[];
  const whyPoints = t.raw("whyPoints") as { title: string; desc: string }[];
  const comingSoon = t("comingSoon");
  const freemium = t("freemium");

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
        name: t("breadcrumb.home"),
        item: `https://www.weplanify.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.currentLd"),
        item: `https://www.weplanify.com/${locale}/alternatives`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("jsonld.itemListName"),
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
          <div className="max-w-4xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.currentNav") },
                ]}
              />
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-3">
              {t("heroSubtitle")}
            </p>
            <h1 className="font-londrina-solid text-[#001E13] text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              {t("heroIntro")}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 2. Comparison table (desktop) / cards (mobile)                   */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("comparisonTitle")}
            </h2>

            {/* ---------- Desktop table ---------- */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[200px]">
                      {t("featureColumnHeading")}
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
                        {feature.label}
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
                            comingSoon={comingSoon}
                            freemium={freemium}
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
                            {feature.label}
                          </span>
                          <span className="ml-3 shrink-0">
                            <CellValue
                              value={val}
                              comingSoon={comingSoon}
                              freemium={freemium}
                            />
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
              {t("competitorsTitle")}
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
              {t("whyTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {whyPoints.map((point, i) => (
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
              {t("discoverMore.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.cards.friends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.cards.friends.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discoverMore.cards.friends.cta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.cards.bachelorette.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.cards.bachelorette.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discoverMore.cards.bachelorette.cta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.cards.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.cards.guide.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discoverMore.cards.guide.cta")}
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
              {t("ctaTitle")}
            </h2>
            <Link
              href="https://app.weplanify.com"
              className="inline-block mt-4 px-8 py-3 bg-[#FFFBF5] text-[#F6391A] font-karla font-bold rounded-full text-base lg:text-lg hover:shadow-lg transition-shadow"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
