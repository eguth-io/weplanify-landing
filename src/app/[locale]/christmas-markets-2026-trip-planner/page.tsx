import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleTOC from "@/components/ArticleTOC";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/christmas-markets-2026-trip-planner";
const PUBLISHED = "2026-07-16";
const CAMPAIGN = "christmas-markets-2026";

const registerUrl = (locale: string, placement: string) =>
  `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=${CAMPAIGN}&template=${CAMPAIGN}&placement=${placement}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "christmasMarkets2026" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata,
    title,
    description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: {
      canonical: currentUrl,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${PATHNAME}`])),
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

/**
 * Factual data for the featured markets, kept in code because dates and country
 * codes are locale-independent. Index-aligned with the `markets.items` array in
 * `messages/<locale>/christmasMarkets2026.json`.
 *
 * `startDate` / `endDate` are only set for markets whose 2026 dates were verified
 * against the official organiser (checked July 2026). Markets without them
 * (Strasbourg, Budapest) had not published their 2026 dates and are therefore
 * excluded from the Event JSON-LD rather than given invented dates.
 */
const MARKETS: Array<{
  locality: string;
  country: "FR" | "DE" | "AT" | "CZ" | "HU" | "BE";
  startDate?: string;
  endDate?: string;
}> = [
  { locality: "Colmar", country: "FR", startDate: "2026-11-23", endDate: "2026-12-29" },
  { locality: "Strasbourg", country: "FR" },
  { locality: "Nuremberg", country: "DE", startDate: "2026-11-27", endDate: "2026-12-24" },
  { locality: "Cologne", country: "DE", startDate: "2026-11-16", endDate: "2026-12-23" },
  { locality: "Vienna", country: "AT", startDate: "2026-11-13", endDate: "2026-12-26" },
  { locality: "Prague", country: "CZ", startDate: "2026-11-28", endDate: "2027-01-06" },
  { locality: "Budapest", country: "HU" },
  { locality: "Brussels", country: "BE", startDate: "2026-11-27", endDate: "2027-01-03" },
];

export default async function ChristmasMarkets2026Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("christmasMarkets2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const marketItems = t.raw("markets.items") as { name: string; dates: string; desc: string }[];
  const westItems = t.raw("logistics.westItems") as string[];
  const eastItems = t.raw("logistics.eastItems") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls: (string | null)[] = [
    `${SITE_URL}/${locale}/features/polls`,
    null,
    `${SITE_URL}/${locale}/features/itinerary`,
    `${SITE_URL}/${locale}/features/budget`,
  ];

  const eventImage = `${SITE_URL}/header-bg.webp`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    image: [eventImage],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  // One Event node per market with verified 2026 dates. No umbrella Event: these
  // are separate events on separate calendars, not sub-events of one thing.
  const verifiedMarkets = MARKETS.map((market, i) => ({ ...market, content: marketItems[i] })).filter(
    (market) => Boolean(market.startDate && market.endDate)
  );

  const eventListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("markets.title"),
    itemListElement: verifiedMarkets.map((market, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Event",
        name: market.content.name,
        description: market.content.desc,
        image: [eventImage],
        startDate: market.startDate,
        endDate: market.endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: market.content.name,
          address: {
            "@type": "PostalAddress",
            addressLocality: market.locality,
            addressCountry: market.country,
          },
        },
      },
    })),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("jsonld.howToName"),
    description: t("jsonld.howToDescription"),
    totalTime: "PT45M",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(howToStepUrls[i] ? { url: howToStepUrls[i] } : {}),
    })),
  };

  const linkClass = "text-[#F6391A] hover:underline font-semibold";

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventListLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: t("breadcrumb.home"), href: `/${locale}` },
                { label: t("breadcrumb.current") },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {t("hero.tag")}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {t.rich("hero.intro", {
                link: (chunks) => (
                  <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className={linkClass}>{chunks}</Link>
                ),
              })}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate={PUBLISHED} modifiedDate={PUBLISHED} />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={registerUrl(locale, "hero")}>
                <PulsatingButton className="font-karla font-bold">{t("hero.ctaButton")}</PulsatingButton>
              </Link>
              <p className="text-[#001E13]/55 text-xs lg:text-sm font-karla">{t("hero.ctaNote")}</p>
            </div>
          </div>
        </section>

        {/* ━━━ KEY FACTS BOX ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border border-[#001E13]/8 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10">
              <h2 className="text-[#001E13]/40 font-karla text-xs lg:text-sm uppercase tracking-[0.2em] mb-6">
                {t("facts.heading")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.windowLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.windowValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.windowSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.marketsLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.marketsValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.marketsSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.bookLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.bookValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.bookSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.modeLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.modeValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.modeSub")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ THE STAKES ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("stakes.p1")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("stakes.p2")}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "markets", label: t("toc.markets") },
                { id: "routes", label: t("toc.routes") },
                { id: "logistics", label: t("toc.logistics") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE MARKETS AND THEIR DATES (centrepiece) ━━━ */}
        <FadeIn>
          <section id="markets" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("markets.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("markets.subtitle")}
              </p>

              <div className="space-y-0">
                {marketItems.map((item, i) => {
                  const isVerified = Boolean(MARKETS[i]?.startDate);
                  return (
                    <div key={i} className="flex gap-6 lg:gap-8">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`w-4 h-4 rounded-full ${isVerified ? "bg-[#F6391A]" : "bg-[#FFFBF5]/25"}`} />
                        {i < marketItems.length - 1 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                      </div>
                      <div className="pb-12 lg:pb-16">
                        <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">{item.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-[#EEF899] font-karla font-bold text-sm lg:text-base">{item.dates}</span>
                          <span className={`font-karla text-[11px] uppercase tracking-wider rounded-full px-3 py-1 ${isVerified ? "bg-[#61DBD5]/15 text-[#61DBD5]" : "bg-[#FFFBF5]/10 text-[#FFFBF5]/50"}`}>
                            {isVerified ? t("markets.confirmedLabel") : t("markets.typicalLabel")}
                          </span>
                        </div>
                        <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-[#FFFBF5]/40 font-karla text-sm lg:text-base leading-[1.8] max-w-[700px] border-t border-[#FFFBF5]/10 pt-8">
                {t("markets.note")}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ ONE CITY VS MULTI-CITY ━━━ */}
        <section id="routes" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("routes.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("routes.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(["option1", "option2", "option3"] as const).map((key) => (
                <div key={key} className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t(`routes.${key}.tag`)}</p>
                  <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t(`routes.${key}.title`)}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">{t(`routes.${key}.desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ MID-PAGE CTA ━━━ */}
        <section className="px-6 lg:px-12 -mt-8 mb-4">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-[#FFFBF5] font-londrina-solid text-xl lg:text-2xl mb-1">
                  {t("midCta.title")}
                </p>
                <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base">
                  {t("midCta.subtitle")}
                </p>
              </div>
              <Link href={registerUrl(locale, "mid")} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {t("midCta.button")}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ LOGISTICS ━━━ */}
        <FadeIn>
          <section id="logistics" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("logistics.title")}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {t("logistics.subtitle")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.westLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.gettingThere")}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {westItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.eastLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.gettingThere")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {eastItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PLANNING WITH A GROUP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08]">
              {t("planning.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p1", {
                pollLink: (chunks) => <Link href={`/${locale}/features/polls`} className={linkClass}>{chunks}</Link>,
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p2")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p3", {
                itineraryLink: (chunks) => <Link href={`/${locale}/features/itinerary`} className={linkClass}>{chunks}</Link>,
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p4", {
                guideLink: (chunks) => <Link href={`/${locale}/guides/plan-group-trip`} className={linkClass}>{chunks}</Link>,
              })}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("budget.title")}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t.rich("budget.p1", {
                  budgetLink: (chunks) => (
                    <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">{chunks}</Link>
                  ),
                })}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p2")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p3")}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ FAQ ━━━ */}
        <section id="faq" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-[#001E13]/10 pb-5">
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DISCOVER MORE ━━━ */}
        <section className="py-12 lg:py-16 px-6 lg:px-12 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">{t("discover.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: `/${locale}/trip-with-friends`, key: "tripWithFriends" },
                { href: `/${locale}/family-trip`, key: "familyTrip" },
                { href: `/${locale}/guides/plan-group-trip`, key: "groupGuide" },
                { href: `/${locale}/alternatives/best-group-trip-planner-apps`, key: "bestApps" },
              ].map(({ href, key }) => (
                <Link key={key} href={href} className="group">
                  <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t(`discover.${key}.title`)}</h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t(`discover.${key}.desc`)}</p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t(`discover.${key}.cta`)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ FINAL CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <div className="flex justify-center">
                <Link href={registerUrl(locale, "footer")}>
                  <PulsatingButton className="font-karla font-bold">{t("cta.button")}</PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer footerData={footerData} />
    </>
  );
}
