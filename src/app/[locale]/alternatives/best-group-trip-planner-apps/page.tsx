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

type Pick = {
  label: string;
  app: string;
  anchor: string;
};

type Criterion = {
  title: string;
  desc: string;
};

type SummaryRow = {
  name: string;
  values: (string | boolean)[];
};

type FaqItem = {
  question: string;
  answer: string;
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "alternativesBest" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    title,
    description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      type: "article",
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
      languages: {
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
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

async function SummaryCellValue({
  value,
  locale,
}: {
  value: string | boolean;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "alternativesBest" });
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("freemium")}
      </span>
    );
  if (value === "diy")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {t("diy")}
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

  const t = await getTranslations({ locale, namespace: "alternativesBest" });

  const picks = t.raw("quickVerdict.picks") as Pick[];
  const rankingCriteria = t.raw("rankingCriteria") as Criterion[];
  const apps = t.raw("apps") as AppEntry[];
  const summaryFeatures = t.raw("summaryFeatures") as string[];
  const summaryData = t.raw("summaryData") as SummaryRow[];
  const faqItems = t.raw("faqItems") as FaqItem[];

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
        name: t("jsonld.breadcrumb.home"),
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("jsonld.breadcrumb.alternatives"),
        item: `${SITE_URL}/${locale}/alternatives`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("jsonld.breadcrumb.current"),
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
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
    dateModified: "2026-05-05",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${PATHNAME}`,
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  // Ranked ItemList of the compared apps — the semantically-correct type for a
  // "best apps" roundup, so search engines can read the ranking directly.
  // Every listed app has a free tier (price 0 = free to start).
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("h1"),
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: apps.length,
    itemListElement: apps.map((app, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: app.name,
        applicationCategory: "TravelApplication",
        operatingSystem: "Web, iOS, Android",
        description: app.tagline,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* ---------------------------------------------------------------- */}
        {/* Hero                                                             */}
        {/* ---------------------------------------------------------------- */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: "Alternatives", href: `/${locale}/alternatives` },
                  { label: t("breadcrumb.top10") },
                ]}
              />
            </div>
            <span className="inline-block bg-[#EEF899] text-[#001E13] text-sm font-karla font-semibold px-4 py-1.5 rounded-full mb-6">
              {t("heroTag")}
            </span>
            <h1 className="text-[#001E13] text-3xl lg:text-[44px] font-londrina-solid leading-tight mb-4">
              {t("h1")}
            </h1>
            <p className="text-[#001E13]/60 text-sm font-karla mb-6">
              {t("readTime")}
              <span className="mx-2">·</span>
              <time dateTime="2026-05-05">
                {t("updated")}
              </time>
            </p>
            <p className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
              {t("intro")}
            </p>

            {/* Answer-first verdict — optimized for featured snippets & AI Overviews */}
            <div className="mt-8 rounded-2xl border border-[#F6391A]/20 bg-[#FFF6F4] p-6 lg:p-7">
              <p className="text-[#F6391A] font-londrina-solid text-lg lg:text-xl mb-2">
                {t("quickVerdict.heading")}
              </p>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-4">
                {t("quickVerdict.lead")}
              </p>
              <ul className="space-y-2">
                {picks.map((pick) => (
                  <li
                    key={pick.app}
                    className="flex flex-wrap items-baseline gap-x-2 text-sm font-karla"
                  >
                    <span className="text-[#001E13]/60">{pick.label} :</span>
                    <a
                      href={`#${pick.anchor}`}
                      className="font-bold text-[#001E13] hover:text-[#F6391A] transition-colors"
                    >
                      {pick.app}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
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
            {apps.map((app, index) => (
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
                      {t("bestForLabel")}
                    </span>
                    <span className="text-[#001E13]/80">{app.bestFor}</span>
                  </p>
                </div>

                {/* Strengths & Limitations */}
                <div className="grid gap-4 sm:grid-cols-2 mb-4">
                  <div>
                    <h3 className="font-karla font-bold text-sm text-emerald-700 mb-2">
                      {t("strengthsLabel")}
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
                      {t("limitationsLabel")}
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
                      {t("priceLabel")}
                    </span>
                    {app.price}
                  </p>
                  {app.isWePlanify && (
                    <Link
                      href="https://app.weplanify.com"
                      className="inline-block bg-[#F6391A] hover:bg-[#d42d10] text-[#FFFBF5] font-karla font-bold text-sm px-5 py-2 rounded-full transition-colors"
                    >
                      {t("tryFree")}
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
              {t("rankingTitle")}
            </h2>
            <p className="font-karla text-base text-[#001E13]/80 leading-relaxed mb-8">
              {t("rankingIntro")}
            </p>
            <div className="grid gap-4">
              {rankingCriteria.map((criterion, i) => (
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
              {t("summaryTitle")}
            </h2>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-5 py-3.5 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[140px]">
                      App
                    </th>
                    {summaryFeatures.map((f) => (
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
                  {summaryData.map((row, i) => (
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
              {summaryData.map((row) => (
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
                    {summaryFeatures.map((feature, j) => (
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
              {t("discover.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.comparisonTitle")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.comparisonDesc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.comparisonCta")}
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.guideTitle")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.guideDesc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.guideCta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.friendsTitle")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.friendsDesc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.friendsCta")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* FAQ                                                              */}
        {/* ---------------------------------------------------------------- */}
        <section className="py-16 lg:py-20 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {t("faqTitle")}
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group bg-white border border-[#001E13]/10 rounded-2xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-karla font-bold text-[#001E13] text-base lg:text-lg list-none">
                    {item.question}
                    <svg
                      className="w-5 h-5 text-[#001E13]/40 group-open:rotate-180 transition-transform shrink-0 ml-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-5 font-karla text-[#001E13]/70 text-sm lg:text-base leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
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
                {t("ctaTitle")}
              </h2>
              <p className="font-karla text-[#FFFBF5]/80 text-sm lg:text-base leading-relaxed mb-8 max-w-xl mx-auto">
                {t("ctaText")}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#FFFBF5] text-[#F6391A] font-karla font-bold text-base lg:text-lg px-8 py-3 rounded-full hover:shadow-lg transition-shadow"
              >
                {t("ctaButton")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
