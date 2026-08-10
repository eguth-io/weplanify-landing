import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleTOC from "@/components/ArticleTOC";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";
import { NAV_CONTENT, getFooterContent } from "@/lib/site-content";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/rugby-world-cup-2027-trip-planner";
const PUBLISHED = "2026-07-16";
const TICKETS_URL = "https://www.rugbyworldcup.com/2027/en/tickets";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "rugbyWorldCup2027" });
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

export default async function RugbyWorldCup2027Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("rugbyWorldCup2027");

  const navData = NAV_CONTENT;
  const navigationData = null;
  const footerData = getFooterContent(locale);

  const cityItems = t.raw("hostCities.items") as {
    city: string;
    state: string;
    stadium: string;
    note: string;
  }[];
  const followPros = t.raw("route.followPros") as string[];
  const followCons = t.raw("route.followCons") as string[];
  const basePros = t.raw("route.basePros") as string[];
  const baseCons = t.raw("route.baseCons") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls = [
    `${SITE_URL}/${locale}${PATHNAME}#route`,
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/itinerary`,
    `${SITE_URL}/${locale}/features/budget`,
  ];

  const registerUrl = (placement: "hero" | "mid" | "footer") =>
    `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=rugby-world-cup-2027&template=rugby-world-cup-2027&placement=${placement}`;

  // Shared rich-text chunk renderers: inline links inside translated paragraphs.
  const inlineLink = (href: string, className: string) =>
    function LinkChunk(chunks: React.ReactNode) {
      return (
        <Link href={href} className={className}>
          {chunks}
        </Link>
      );
    };
  const accentLink = (href: string) => inlineLink(href, "text-[#F6391A] hover:underline font-semibold");
  const lightLink = (href: string) => inlineLink(href, "text-[#EEF899] hover:underline font-semibold");

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
    headline: t("hero.title"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const eventImage = `${SITE_URL}/header-bg.webp`;

  // Seven host cities across Australia; Sydney carries two of the eight venues.
  const hostCityPlaces: Array<{ name: string; locality: string; region: string }> = [
    { name: "Stadium Australia", locality: "Sydney", region: "NSW" },
    { name: "Sydney Football Stadium", locality: "Sydney", region: "NSW" },
    { name: "Docklands Stadium", locality: "Melbourne", region: "VIC" },
    { name: "Brisbane Stadium", locality: "Brisbane", region: "QLD" },
    { name: "Perth Stadium", locality: "Perth", region: "WA" },
    { name: "Adelaide Oval", locality: "Adelaide", region: "SA" },
    { name: "Newcastle Stadium", locality: "Newcastle", region: "NSW" },
    { name: "North Queensland Stadium", locality: "Townsville", region: "QLD" },
  ];

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: t("jsonld.eventName"),
    description: t("jsonld.eventDescription"),
    image: [eventImage],
    startDate: "2027-10-01",
    endDate: "2027-11-13",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Rugby union",
    organizer: { "@type": "Organization", name: "World Rugby", url: "https://www.world.rugby" },
    performer: { "@type": "PerformingGroup", name: t("jsonld.performer") },
    offers: {
      "@type": "Offer",
      url: TICKETS_URL,
      availability: "https://schema.org/PreOrder",
      validFrom: "2026-10-01",
    },
    location: hostCityPlaces.map((place) => ({
      "@type": "Place",
      name: place.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: place.locality,
        addressRegion: place.region,
        addressCountry: "AU",
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
    totalTime: "PT1H",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(howToStepUrls[i] ? { url: howToStepUrls[i] } : {}),
    })),
  };

  const facts = [
    { label: t("facts.datesLabel"), value: t("facts.datesValue"), note: t("facts.datesNote") },
    { label: t("facts.teamsLabel"), value: t("facts.teamsValue"), note: t("facts.teamsNote") },
    { label: t("facts.citiesLabel"), value: t("facts.citiesValue"), note: t("facts.citiesNote") },
    { label: t("facts.finalLabel"), value: t("facts.finalValue"), note: t("facts.finalNote") },
  ];

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
              {t.rich("heroBody", {
                link: accentLink(`/${locale}/alternatives/best-group-trip-planner-apps`),
              })}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <div className="mb-8">
              <Link href={registerUrl("hero")}>
                <PulsatingButton className="font-karla font-bold">{t("cta.button")}</PulsatingButton>
              </Link>
            </div>
            <AuthorBio locale={locale} publishedDate={PUBLISHED} modifiedDate={PUBLISHED} />
          </div>
        </section>

        {/* ━━━ KEY FACTS ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[22px] lg:text-[28px] font-londrina-solid mb-6">
              {t("facts.title")}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {facts.map((fact, i) => (
                <div key={i} className="bg-white border border-[#001E13]/8 rounded-2xl p-5 lg:p-6">
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wide mb-2">{fact.label}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-[32px] leading-[1.1] mb-2">{fact.value}</p>
                  <p className="text-[#001E13]/55 font-karla text-xs lg:text-sm leading-snug">{fact.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ THE STAKES ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("problem.p1")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("problem.p2")}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "host-cities", label: t("toc.hostCities") },
                { id: "route", label: t("toc.route") },
                { id: "tickets", label: t("toc.tickets") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ HOST CITIES ━━━ */}
        <FadeIn>
          <section id="host-cities" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("hostCities.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("hostCities.subtitle")}
              </p>

              <div className="space-y-0">
                {cityItems.map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < cityItems.length - 1 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
                    <div className="pb-10 lg:pb-14">
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-1">
                        {item.city}
                        <span className="text-[#FFFBF5]/40 text-sm lg:text-base font-karla ml-3">{item.state}</span>
                      </h3>
                      <p className="text-[#61DBD5] font-karla text-xs lg:text-sm mb-2">
                        {t("hostCities.stadiumLabel")}: {item.stadium}
                      </p>
                      <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ ROUTE DECISION ━━━ */}
        <section id="route" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("route.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
              {t("route.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A — follow the team */}
              <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8">
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                  {t("route.followTitle")}
                </h3>
                <p className="text-[#001E13]/60 font-karla text-sm mb-6">{t("route.followSubtitle")}</p>
                <ul className="space-y-2 mb-5">
                  {followPros.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#61DBD5] text-base leading-tight mt-0.5">&#x2713;</span>
                      <span className="text-[#001E13]/75 font-karla text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 mb-6">
                  {followCons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#F6391A] text-base leading-tight mt-0.5">&#x2715;</span>
                      <span className="text-[#001E13]/60 font-karla text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#001E13] font-karla text-sm font-semibold border-t border-[#001E13]/8 pt-4">
                  {t("route.followVerdict")}
                </p>
              </div>

              {/* Option B — base in one city */}
              <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8">
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                  {t("route.baseTitle")}
                </h3>
                <p className="text-[#001E13]/60 font-karla text-sm mb-6">{t("route.baseSubtitle")}</p>
                <ul className="space-y-2 mb-5">
                  {basePros.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#61DBD5] text-base leading-tight mt-0.5">&#x2713;</span>
                      <span className="text-[#001E13]/75 font-karla text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 mb-6">
                  {baseCons.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#F6391A] text-base leading-tight mt-0.5">&#x2715;</span>
                      <span className="text-[#001E13]/60 font-karla text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[#001E13] font-karla text-sm font-semibold border-t border-[#001E13]/8 pt-4">
                  {t("route.baseVerdict")}
                </p>
              </div>
            </div>

            <div className="mt-8 bg-[#EEF899] rounded-[24px] p-6 lg:p-8">
              <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-3">
                {t("route.hybridTitle")}
              </h3>
              <p className="text-[#001E13]/75 font-karla text-sm lg:text-base leading-[1.8]">
                {t("route.hybridBody")}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ MID-PAGE CTA ━━━ */}
        <section className="pb-20 lg:pb-28 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-[#61DBD5] rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 text-center">
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] mb-3">
                {t("midCta.title")}
              </h2>
              <p className="text-[#001E13]/70 font-karla text-base max-w-xl mx-auto mb-7 leading-relaxed">
                {t("midCta.subtitle")}
              </p>
              <div className="flex justify-center">
                <Link href={registerUrl("mid")}>
                  <PulsatingButton className="font-karla font-bold">{t("midCta.button")}</PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ TICKETS & LOGISTICS ━━━ */}
        <section id="tickets" className="pb-20 lg:pb-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("tickets.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("tickets.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("tickets.p2")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("tickets.p3", {
                ticketLink: function TicketChunk(chunks: React.ReactNode) {
                  return (
                    <a
                      href={TICKETS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F6391A] hover:underline font-semibold"
                    >
                      {chunks}
                    </a>
                  );
                },
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("tickets.p4")}
            </p>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#61DBD5] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {t("pullQuote")}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING WITH A GROUP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("planning.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p2", {
                itineraryLink: accentLink(`/${locale}/features/itinerary`),
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p3", {
                pollsLink: accentLink(`/${locale}/features/polls`),
              })}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t.rich("planning.p4", {
                guideLink: accentLink(`/${locale}/guides/plan-group-trip`),
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
                {t("budget.p1")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p2")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t.rich("budget.p3", {
                  budgetLink: lightLink(`/${locale}/features/budget`),
                })}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p4")}
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
              <Link href={`/${locale}/world-cup-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.worldCup.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.worldCup.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.worldCup.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.groupGuide.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.groupGuide.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.groupGuide.cta")}</span>
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
                <Link href={registerUrl("footer")}>
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
