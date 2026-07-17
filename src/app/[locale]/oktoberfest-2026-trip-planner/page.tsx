import { Metadata } from "next";
import { ReactNode } from "react";
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
const PATHNAME = "/oktoberfest-2026-trip-planner";
const PUBLISHED_DATE = "2026-07-16";
const UTM = "utm_source=landing&utm_campaign=oktoberfest-2026&template=oktoberfest-2026";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "oktoberfest2026" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  // Declare every supported locale, not just en/fr — all 8 are built and indexable.
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${PATHNAME}`]),
  );
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: {
      canonical: currentUrl,
      languages: { ...languages, "x-default": `${SITE_URL}/en${PATHNAME}` },
    },
  };
}

export default async function Oktoberfest2026Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("oktoberfest2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const howItWorksItems = t.raw("howItWorks.items") as { stop: string; desc: string; link: string }[];
  const reservedItems = t.raw("reservations.reservedItems") as string[];
  const walkInItems = t.raw("reservations.walkInItems") as string[];
  const transportItems = t.raw("logistics.transportItems") as string[];
  const stayItems = t.raw("logistics.stayItems") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls: (string | null)[] = [
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/itinerary`,
    `${SITE_URL}/${locale}${PATHNAME}#reservations`,
    `${SITE_URL}/${locale}${PATHNAME}#logistics`,
    `${SITE_URL}/${locale}/features/budget`,
  ];

  // Inline-link chunks for t.rich() paragraphs — keeps every locale on the same
  // markup instead of hardcoding one language per branch.
  const inlineLink = (href: string, className: string) =>
    function LinkChunk(chunks: ReactNode) {
      return (
        <Link href={href} className={className}>{chunks}</Link>
      );
    };
  const lightLink = "text-[#F6391A] hover:underline font-semibold";
  const darkLink = "text-[#EEF899] hover:underline font-semibold";

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const eventImage = `${SITE_URL}/header-bg.webp`;

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: PUBLISHED_DATE, dateModified: PUBLISHED_DATE,
    image: [eventImage],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: t("jsonld.eventName"),
    description: t("jsonld.eventDescription"),
    image: [eventImage],
    startDate: "2026-09-19",
    endDate: "2026-10-04",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    isAccessibleForFree: true,
    organizer: { "@type": "Organization", name: "Landeshauptstadt München", url: "https://www.muenchen.de/en/events/oktoberfest" },
    location: {
      "@type": "Place",
      name: "Theresienwiese",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Theresienwiese",
        addressLocality: "München",
        addressRegion: "Bayern",
        postalCode: "80336",
        addressCountry: "DE",
      },
    },
  };

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("jsonld.howToName"),
    description: t("jsonld.howToDescription"),
    totalTime: "PT1H",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(howToStepUrls[i] ? { url: howToStepUrls[i] } : {}),
    })),
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
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
                apps: inlineLink(`/${locale}/alternatives/best-group-trip-planner-apps`, lightLink),
              })}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate={PUBLISHED_DATE} modifiedDate={PUBLISHED_DATE} />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?${UTM}&placement=hero`}>
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
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.datesLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.datesValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.datesSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.priceLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.priceValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.priceSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.tentsLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.tentsValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.tentsSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.entryLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.entryValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.entrySub")}</p>
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
                { id: "how-it-works", label: t("toc.howItWorks") },
                { id: "reservations", label: t("toc.reservations") },
                { id: "logistics", label: t("toc.logistics") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ HOW THE WIESN WORKS ━━━ */}
        <FadeIn>
          <section id="how-it-works" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("howItWorks.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("howItWorks.subtitle")}
              </p>

              <div className="space-y-0">
                {howItWorksItems.map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < howItWorksItems.length - 1 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
                    <div className="pb-12 lg:pb-16">
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">
                        <Link href={`/${locale}${item.link}`} className="text-[#FFFBF5] hover:text-[#EEF899] transition-colors no-underline">{item.stop}</Link>
                      </h3>
                      <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ RESERVE VS WALK-IN ━━━ */}
        <FadeIn>
          <section id="reservations" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("reservations.title")}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {t("reservations.subtitle")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("reservations.reservedLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("reservations.reservedTitle")}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {reservedItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("reservations.walkInLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("reservations.walkInTitle")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {walkInItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ MID-PAGE CTA ━━━ */}
        <section className="px-6 lg:px-12 mb-4">
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
              <Link href={`https://app.weplanify.com/${locale}/register?${UTM}&placement=mid`} className="shrink-0">
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
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.transportLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.transportTitle")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {transportItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.stayLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.stayTitle")}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {stayItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PLANNING WITH THE GROUP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08]">
              {t("planning.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p1", {
                polls: inlineLink(`/${locale}/features/polls`, lightLink),
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p2", {
                itinerary: inlineLink(`/${locale}/features/itinerary`, lightLink),
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p3", {
                guide: inlineLink(`/${locale}/guides/plan-group-trip`, lightLink),
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p4")}
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
                  budget: inlineLink(`/${locale}/features/budget`, darkLink),
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
              <Link href={`/${locale}/tomorrowland-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tomorrowland.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tomorrowland.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tomorrowland.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/hellfest-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.hellfest.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.hellfest.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.hellfest.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.bestApps.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.bestApps.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.bestApps.cta")}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
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
                <Link href={`https://app.weplanify.com/${locale}/register?${UTM}&placement=footer`}>
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
