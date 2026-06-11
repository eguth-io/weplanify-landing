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

type ComparisonRow = {
  key: string;
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
  const t = await getTranslations({ locale, namespace: "altCruzmi" });
  const pathname = "/alternatives/cruzmi";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

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

const comparisonRows: ComparisonRow[] = [
  { key: "collab_itinerary", weplanify: "yes", cruzmi: "limited" },
  { key: "polls", weplanify: "yes", cruzmi: "basic" },
  { key: "budget", weplanify: "yes", cruzmi: "yes" },
  { key: "packing", weplanify: "yes", cruzmi: "no" },
  { key: "discovery", weplanify: "yes", cruzmi: "no" },
  { key: "day_by_day", weplanify: "yes", cruzmi: "no" },
  { key: "events", weplanify: "no", cruzmi: "yes_broad" },
  { key: "french", weplanify: "yes", cruzmi: "yes" },
  { key: "english", weplanify: "yes", cruzmi: "no" },
  { key: "free", weplanify: "yes", cruzmi: "yes" },
  { key: "mobile", weplanify: "web_app", cruzmi: "yes_mobile" },
  { key: "web", weplanify: "yes", cruzmi: "limited" },
];

type Badges = {
  limited: string;
  basic: string;
  yesBroad: string;
  yesMobile: string;
  webApp: string;
};

// ---------------------------------------------------------------------------
// Cell label helpers
// ---------------------------------------------------------------------------

function cellLabel(value: string, badges: Badges): { type: "check" | "cross" | "badge"; label?: string; color?: string } {
  switch (value) {
    case "yes":
      return { type: "check" };
    case "no":
      return { type: "cross" };
    case "limited":
      return {
        type: "badge",
        label: badges.limited,
        color: "text-amber-700 bg-amber-50",
      };
    case "basic":
      return {
        type: "badge",
        label: badges.basic,
        color: "text-amber-700 bg-amber-50",
      };
    case "yes_broad":
      return {
        type: "badge",
        label: badges.yesBroad,
        color: "text-emerald-700 bg-emerald-50",
      };
    case "yes_mobile":
      return {
        type: "badge",
        label: badges.yesMobile,
        color: "text-emerald-700 bg-emerald-50",
      };
    case "web_app":
      return {
        type: "badge",
        label: badges.webApp,
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

function CellValue({ value, badges }: { value: string; badges: Badges }) {
  const cell = cellLabel(value, badges);
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

  const t = await getTranslations("altCruzmi");

  const badges = t.raw("comparison.badges") as Badges;
  const rowLabels = t.raw("comparison.rows") as Record<string, string>;
  const cruzmiShinesPoints = t.raw("cruzmiShines.points") as {
    title: string;
    desc: string;
  }[];
  const weplanifyWinsPoints = t.raw("weplanifyWins.points") as {
    title: string;
    desc: string;
  }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

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
        name: t("breadcrumb.home"),
        item: `https://www.weplanify.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.alternatives"),
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
    mainEntity: faqItems.map((item) => ({
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
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: "Alternatives", href: `/${locale}/alternatives` },
                  { label: "vs Cruzmi" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-3">
              {t("hero.subtitle")}
            </p>
            <h1 className="font-londrina-solid text-[#001E13] text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight mb-6">
              {t("hero.title")}
            </h1>
            <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
              {t("hero.intro")}
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
                {t("verdict.title")}
              </h2>
              <p className="font-karla text-[#001E13]/80 text-sm lg:text-base leading-relaxed">
                {t("verdict.text")}
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
              {t("comparison.title")}
            </h2>

            {/* Desktop table */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm min-w-[240px]">
                      {t("comparison.featureHeader")}
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
                        {rowLabels[row.key]}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-emerald-50/40">
                        <CellValue value={row.weplanify} badges={badges} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={row.cruzmi} badges={badges} />
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
                          {rowLabels[row.key]}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={row[app.dataKey]} badges={badges} />
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
          <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="text-[#F6391A] font-karla font-bold hover:underline">
            {t("midCta")}
          </Link>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* 4a. Where Cruzmi Shines                                          */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("cruzmiShines.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {cruzmiShinesPoints.map((point, i) => (
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
              {t("weplanifyWins.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {weplanifyWinsPoints.map((point, i) => (
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
              {t("who.title")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#001E13]/10 p-6 lg:p-8 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-3">
                  Cruzmi
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t("who.cruzmi")}
                </p>
              </div>
              <div className="rounded-2xl border border-[#F6391A]/20 p-6 lg:p-8 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
                <h3 className="font-londrina-solid text-[#F6391A] text-xl mb-3">
                  WePlanify
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t("who.weplanify")}
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
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
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
              {t("cta.title")}
            </h2>
            <Link
              href="https://app.weplanify.com"
              className="inline-block mt-4 px-8 py-3 bg-[#FFFBF5] text-[#F6391A] font-karla font-bold rounded-full text-base lg:text-lg hover:shadow-lg transition-shadow"
            >
              {t("cta.button")}
            </Link>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* Cross-links                                                      */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl mb-6">
              {t("crossLinks.title")}
            </h2>
            <Link
              href={`/${locale}/alternatives`}
              className="inline-block font-karla font-bold text-[#F6391A] text-sm lg:text-base hover:underline"
            >
              {t("crossLinks.back")} &rarr;
            </Link>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
