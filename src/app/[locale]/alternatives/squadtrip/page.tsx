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
  squadtrip: string | boolean;
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
  const pathname = "/alternatives/squadtrip";
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  const t = await getTranslations({ locale, namespace: "altSquadtrip" });

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
  { key: "collab_itinerary", weplanify: true, squadtrip: true },
  { key: "polls", weplanify: true, squadtrip: false },
  { key: "budget", weplanify: true, squadtrip: "payment_collection" },
  { key: "payment", weplanify: false, squadtrip: "core_feature" },
  { key: "packing", weplanify: true, squadtrip: false },
  { key: "guest_mgmt", weplanify: "basic", squadtrip: "advanced" },
  { key: "discovery", weplanify: true, squadtrip: false },
  { key: "free", weplanify: "free_100", squadtrip: "partial_fees" },
  { key: "french", weplanify: true, squadtrip: false },
  { key: "mobile", weplanify: "web_app", squadtrip: "web_app" },
  { key: "realtime", weplanify: true, squadtrip: true },
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

async function CellValue({
  value,
  locale,
}: {
  value: string | boolean;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "altSquadtrip" });
  if (value === true) return <CheckIcon />;
  if (value === false) return <CrossIcon />;
  if (value === "free_100")
    return (
      <span className="text-xs font-karla font-semibold text-emerald-700 bg-emerald-50 rounded-full px-2 py-0.5">
        {t("badges.free100")}
      </span>
    );
  if (value === "partial_fees")
    return (
      <span className="text-xs font-karla font-semibold text-amber-700 bg-amber-50 rounded-full px-2 py-0.5">
        {t("badges.partialFees")}
      </span>
    );
  if (value === "payment_collection")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("badges.paymentCollection")}
      </span>
    );
  if (value === "core_feature")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("badges.coreFeature")}
      </span>
    );
  if (value === "basic")
    return (
      <span className="text-xs font-karla font-semibold text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
        {t("badges.basic")}
      </span>
    );
  if (value === "advanced")
    return (
      <span className="text-xs font-karla font-semibold text-sky-700 bg-sky-50 rounded-full px-2 py-0.5">
        {t("badges.advanced")}
      </span>
    );
  if (value === "web_app")
    return (
      <span className="text-xs font-karla font-semibold text-gray-600 bg-gray-100 rounded-full px-2 py-0.5">
        {t("badges.webApp")}
      </span>
    );
  return <span className="text-xs font-karla text-gray-500">{value}</span>;
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function SquadTripComparisonPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("altSquadtrip");

  const squadtripShinesPoints = t.raw("squadtripShinesPoints") as {
    title: string;
    desc: string;
  }[];
  const weplanifyWinsPoints = t.raw("weplanifyWinsPoints") as {
    title: string;
    desc: string;
  }[];
  const chooseSquadtripPoints = t.raw("chooseSquadtripPoints") as string[];
  const chooseWeplanifyPoints = t.raw("chooseWeplanifyPoints") as string[];
  const faqs = t.raw("faqs") as { q: string; a: string }[];

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

  // ---- JSON-LD: BreadcrumbList ----
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("breadcrumb.alternatives"),
        item: `${SITE_URL}/${locale}/alternatives`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("jsonld.breadcrumbCurrent"),
        item: `${SITE_URL}/${locale}/alternatives/squadtrip`,
      },
    ],
  };

  // ---- JSON-LD: FAQPage ----
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
                  { label: "vs SquadTrip" },
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
        {/* 2. Quick Verdict                                                 */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-[#F6391A]/20 bg-white p-6 lg:p-8 shadow-sm">
              <h2 className="font-londrina-solid text-[#F6391A] text-xl lg:text-2xl mb-3">
                {t("verdictTitle")}
              </h2>
              <p className="font-karla text-[#001E13]/80 text-sm lg:text-base leading-relaxed">
                {t("verdict")}
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* 3. Comparison table                                              */}
        {/* ---------------------------------------------------------------- */}
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
                    <th className="font-karla font-bold text-[#FFFBF5] px-6 py-4 text-sm sticky left-0 bg-[#001E13] z-10 min-w-[220px]">
                      {t("featureHeader")}
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm min-w-[160px] text-[#EEF899]">
                      WePlanify
                    </th>
                    <th className="font-karla font-bold text-center px-6 py-4 text-sm min-w-[160px] text-[#FFFBF5]">
                      SquadTrip
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, i) => (
                    <tr
                      key={feature.key}
                      className={i % 2 === 0 ? "bg-white" : "bg-[#FFFBF5]"}
                    >
                      <td className="font-karla text-sm text-[#001E13] px-6 py-3.5 sticky left-0 z-10 bg-inherit">
                        {t(`features.${feature.key}`)}
                      </td>
                      <td className="px-6 py-3.5 text-center bg-emerald-50/40">
                        <CellValue value={feature.weplanify} locale={locale} />
                      </td>
                      <td className="px-6 py-3.5 text-center">
                        <CellValue value={feature.squadtrip} locale={locale} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ---------- Mobile cards ---------- */}
            <div className="lg:hidden space-y-6">
              {[
                { name: "WePlanify", getVal: (f: Feature) => f.weplanify, highlight: true },
                { name: "SquadTrip", getVal: (f: Feature) => f.squadtrip, highlight: false },
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
                    {features.map((feature) => (
                      <li
                        key={feature.key}
                        className="flex items-center justify-between text-sm font-karla"
                      >
                        <span className="text-[#001E13]/80">
                          {t(`features.${feature.key}`)}
                        </span>
                        <span className="ml-3 shrink-0">
                          <CellValue value={app.getVal(feature)} locale={locale} />
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
        {/* 4a. Where SquadTrip Shines                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("squadtripShinesTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {squadtripShinesPoints.map((point, i) => (
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
              {t("weplanifyWinsTitle")}
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
        {/* 4c. Who Should Choose Each                                       */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto pt-16 lg:pt-20">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("whoShouldTitle")}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* SquadTrip column */}
              <div className="rounded-2xl border border-[#001E13]/10 p-6 bg-[#FFFBF5]">
                <h3 className="font-londrina-solid text-[#001E13] text-xl mb-4">
                  {t("chooseSquadtrip")}
                </h3>
                <ul className="space-y-3">
                  {chooseSquadtripPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 font-karla text-sm text-[#001E13]/80">
                      <span className="text-sky-600 mt-0.5 shrink-0">&#x2022;</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* WePlanify column */}
              <div className="rounded-2xl border border-[#F6391A]/20 p-6 bg-[#FFFBF5] ring-2 ring-[#F6391A]/10">
                <h3 className="font-londrina-solid text-[#F6391A] text-xl mb-4">
                  {t("chooseWeplanify")}
                </h3>
                <ul className="space-y-3">
                  {chooseWeplanifyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 font-karla text-sm text-[#001E13]/80">
                      <span className="text-emerald-600 mt-0.5 shrink-0">&#x2713;</span>
                      {point}
                    </li>
                  ))}
                </ul>
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
              {t("faqTitle")}
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-[#001E13]/10 bg-white overflow-hidden"
                >
                  <summary className="cursor-pointer px-6 py-4 font-karla font-bold text-[#001E13] text-sm lg:text-base flex items-center justify-between">
                    {faq.q}
                    <span className="ml-4 text-[#F6391A] transition-transform group-open:rotate-45 text-xl leading-none">
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

        {/* ---------------------------------------------------------------- */}
        {/* 6a. CTA banner                                                   */}
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

        {/* ---------------------------------------------------------------- */}
        {/* 6b. Cross-links                                                  */}
        {/* ---------------------------------------------------------------- */}
        <section className="pb-16 lg:pb-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto pt-8 lg:pt-12">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl text-center mb-10">
              {t("crossLinksTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.fullComparison.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.fullComparison.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.fullComparison.link")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.tripWithFriends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.tripWithFriends.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.tripWithFriends.link")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("crossLinks.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("crossLinks.guide.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("crossLinks.guide.link")}
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
