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

type Translator = Awaited<ReturnType<typeof getTranslations>>;

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
  const t = await getTranslations({ locale, namespace: "altTripit" });
  const pathname = "/alternatives/tripit";
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
// Data types
// ---------------------------------------------------------------------------

type ComparisonRow = {
  key: string;
  label: string;
  weplanify: string | boolean;
  tripit: string | boolean;
};

type Point = {
  title: string;
  desc: string;
};

type Faq = {
  q: string;
  a: string;
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
  t,
}: {
  value: string | boolean;
  t: Translator;
}) {
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "limited")
    return (
      <span className="text-xs font-karla font-semibold text-amber-600 bg-amber-50 rounded-full px-2 py-0.5">
        {t("limited")}
      </span>
    );
  if (value === "core")
    return (
      <span className="text-xs font-karla font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
        {t("core")}
      </span>
    );
  if (value === "pro")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("pro")}
      </span>
    );
  if (value === "freemium")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("freemium")}
      </span>
    );
  if (value === "web_app")
    return (
      <span className="text-xs font-karla font-semibold text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
        {t("webApp")}
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

  const t = await getTranslations("altTripit");

  const rows = t.raw("rows") as ComparisonRow[];
  const tripitShinesPoints = t.raw("tripitShinesPoints") as Point[];
  const weplanifyWinsPoints = t.raw("weplanifyWinsPoints") as Point[];
  const faqs = t.raw("faqs") as Faq[];

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
    mainEntity: faqs.map((faq) => ({
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
          <div className="max-w-4xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: "Alternatives", href: `/${locale}/alternatives` },
                  { label: "vs TripIt" },
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

        {/* -------------------------------------------------------------- */}
        {/* 2. Quick verdict                                                */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border-2 border-[#EEF899] bg-[#EEF899]/20 p-6 lg:p-8">
              <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl mb-3">
                {t("verdictTitle")}
              </h2>
              <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed">
                {t("verdict")}
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
              {t("comparisonTitle")}
            </h2>

            {/* ---------- Desktop table ---------- */}
            <div className="hidden lg:block overflow-x-auto rounded-2xl border border-[#001E13]/10 shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#001E13]">
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm min-w-[220px]">
                      {t("featureLabel")}
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
                        {row.label}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-emerald-50/40">
                        <CellValue value={row.weplanify} t={t} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={row.tripit} t={t} />
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
                          {row.label}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={row[app.field]} t={t} />
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
          <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="text-[#F6391A] font-karla font-bold hover:underline">
            {t("midCtaLink")}
          </Link>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* 4a. Where TripIt shines                                         */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("tripitShinesTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {tripitShinesPoints.map((point, i) => (
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
              {t("weplanifyWinsTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* -------------------------------------------------------------- */}
        {/* 4c. Who should choose which                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("whoShouldTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#001E13]/10 p-6 lg:p-8 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-3">
                  TripIt
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t("whoTripit")}
                </p>
              </div>
              <div className="rounded-2xl border-2 border-[#F6391A]/20 p-6 lg:p-8 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
                <h3 className="font-londrina-solid text-[#F6391A] text-xl mb-3">
                  WePlanify
                </h3>
                <p className="font-karla text-sm text-[#001E13]/75 leading-relaxed">
                  {t("whoWeplanify")}
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
              {t("faqTitle")}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
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

        {/* -------------------------------------------------------------- */}
        {/* Cross-links                                                     */}
        {/* -------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl text-center mb-8">
              {t("crossLinksTitle")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href={`/${locale}/alternatives`}
                className="group rounded-2xl border border-[#001E13]/10 bg-white p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-londrina-solid text-[#001E13] text-lg mb-1">
                  {t("crossLinks.comparison.title")}
                </h3>
                <p className="font-karla text-sm text-[#001E13]/70">
                  {t("crossLinks.comparison.desc")}
                </p>
                <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-2 inline-block">
                  {t("crossLinks.comparison.cta")}{" "}
                  &rarr;
                </span>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group rounded-2xl border border-[#001E13]/10 bg-white p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-londrina-solid text-[#001E13] text-lg mb-1">
                  {t("crossLinks.guide.title")}
                </h3>
                <p className="font-karla text-sm text-[#001E13]/70">
                  {t("crossLinks.guide.desc")}
                </p>
                <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-2 inline-block">
                  {t("crossLinks.guide.cta")} &rarr;
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
