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

type Feature = {
  key: string;
  weplanify: string | boolean;
  splitwise: string | boolean;
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
  const t = await getTranslations({ locale, namespace: "altSplitwise" });
  const pathname = "/alternatives/splitwise";
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
  { key: "trip_planning", weplanify: true, splitwise: false },
  { key: "collab_itinerary", weplanify: true, splitwise: false },
  { key: "polls", weplanify: true, splitwise: false },
  { key: "expense_split", weplanify: true, splitwise: true },
  { key: "settle_up", weplanify: true, splitwise: true },
  { key: "budget_ahead", weplanify: true, splitwise: false },
  { key: "multi_currency", weplanify: true, splitwise: true },
  { key: "packing", weplanify: true, splitwise: false },
  { key: "discovery", weplanify: true, splitwise: false },
  { key: "free", weplanify: true, splitwise: true },
  { key: "realtime", weplanify: true, splitwise: true },
];

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
  basicLabel,
  webAppLabel,
}: {
  value: string | boolean;
  basicLabel: string;
  webAppLabel: string;
}) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "basic")
    return (
      <span className="text-xs font-karla font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
        {basicLabel}
      </span>
    );
  if (value === "web_app")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {webAppLabel}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SplitwiseComparisonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("altSplitwise");
  const basicLabel = t("cell.basic");
  const webAppLabel = t("cell.webApp");
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const splitwiseShinesPoints = t.raw("splitwiseShines.points") as string[];
  const weplanifyWinsPoints = t.raw("weplanifyWins.points") as string[];
  const chooseSplitwisePoints = t.raw("chooseSplitwise.points") as string[];
  const chooseWeplanifyPoints = t.raw("chooseWeplanify.points") as string[];

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
        name: t("jsonld.breadcrumbAlternatives"),
        item: `https://www.weplanify.com/${locale}/alternatives`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "vs Splitwise",
        item: `https://www.weplanify.com/${locale}/alternatives/splitwise`,
      },
    ],
  };

  // -----------------------------------------------------------------------
  // JSON-LD: FAQPage
  // -----------------------------------------------------------------------
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: "https://www.weplanify.com" },
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://www.weplanify.com/${locale}/alternatives/splitwise` },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* -------------------------------------------------------------- */}
        {/* 1. Hero                                                        */}
        {/* -------------------------------------------------------------- */}
        <section className="pt-[120px] lg:pt-[150px] pb-12 lg:pb-20 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: "Alternatives", href: `/${locale}/alternatives` },
                  { label: "vs Splitwise" },
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

        {/* -------------------------------------------------------------- */}
        {/* 2. Quick verdict box                                           */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border-2 border-[#EEF899] bg-[#EEF899]/20 p-6 lg:p-8">
              <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl mb-3">
                {t("verdict.title")}
              </h2>
              <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed">
                {t("verdict.body")}
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
              {t("comparison.title")}
            </h2>

            {/* ---------- Desktop table ---------- */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm min-w-[220px]">
                      {t("comparison.featureHeader")}
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#EEF899] min-w-[160px]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm text-[#FFFBF5] min-w-[160px]">
                      Splitwise
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
                        {t(`features.${feature.key}`)}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-[#EEF899]/10">
                        <CellValue value={feature.weplanify} basicLabel={basicLabel} webAppLabel={webAppLabel} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={feature.splitwise} basicLabel={basicLabel} webAppLabel={webAppLabel} />
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
                        {t(`features.${feature.key}`)}
                      </span>
                      <span className="ml-3 shrink-0">
                        <CellValue value={feature.weplanify} basicLabel={basicLabel} webAppLabel={webAppLabel} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Splitwise card */}
              <div className="rounded-2xl border border-[#001E13]/10 bg-white p-5">
                <h3 className="font-londrina-solid text-xl mb-4 text-[#001E13]">
                  Splitwise
                </h3>
                <ul className="space-y-2.5">
                  {features.map((feature) => (
                    <li
                      key={feature.key}
                      className="flex items-center justify-between text-sm font-karla"
                    >
                      <span className="text-[#001E13]/80">
                        {t(`features.${feature.key}`)}
                      </span>
                      <span className="ml-3 shrink-0">
                        <CellValue value={feature.splitwise} basicLabel={basicLabel} webAppLabel={webAppLabel} />
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
          <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="text-[#F6391A] font-karla font-bold hover:underline">
            {t("midCta")}
          </Link>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 4. Detailed sections                                           */}
        {/* -------------------------------------------------------------- */}

        {/* Where Splitwise shines */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("splitwiseShines.title")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {splitwiseShinesPoints.map((point, i) => (
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
              {t("weplanifyWins.title")}
            </h2>
            <div className="grid gap-5 sm:grid-cols-2">
              {weplanifyWinsPoints.map((point, i) => (
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

        {/* Who should choose Splitwise */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-8">
              {t("chooseSplitwise.title")}
            </h2>
            <ul className="space-y-4">
              {chooseSplitwisePoints.map((point, i) => (
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
              {t("chooseWeplanify.title")}
            </h2>
            <ul className="space-y-4">
              {chooseWeplanifyPoints.map((point, i) => (
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
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((faq, i) => (
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

        {/* -------------------------------------------------------------- */}
        {/* 7. Cross-links                                                 */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("crossLinks.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.all.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.all.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.all.cta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.friends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.friends.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.friends.cta")}
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.guide.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.guide.cta")}
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
