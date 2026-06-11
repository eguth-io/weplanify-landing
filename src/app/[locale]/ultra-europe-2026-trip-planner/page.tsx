import { Metadata } from "next";
import Image from "next/image";
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
import { generateMetadataFromSanity, hreflangLanguages } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/ultra-europe-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "ultraEurope2026" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/ultra-europe-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: hreflangLanguages(SITE_URL, PATHNAME) },
  };
}

export default async function UltraEurope2026Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("ultraEurope2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const lineupItems = t.raw("lineup.items") as { stop: string; desc: string }[];
  const parisItems = t.raw("gettingThere.parisItems") as string[];
  const otherItems = t.raw("gettingThere.otherItems") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls = [
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/itinerary`,
    `${SITE_URL}/${locale}/features/budget`,
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-13", dateModified: "2026-05-13",
    image: [`${SITE_URL}/events/ultra-europe-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const musicEventLd = {
    "@context": "https://schema.org",
    "@type": "MusicFestival",
    name: "Ultra Europe 2026",
    description: t("jsonld.eventDescription"),
    image: [`${SITE_URL}/events/ultra-europe-2026.png`],
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: "Ultra Worldwide", url: "https://ultraeurope.com" },
    offers: {
      "@type": "Offer",
      url: "https://ultraeurope.com/tickets/festival/",
      availability: "https://schema.org/InStock",
      price: "149",
      priceCurrency: "EUR",
      validFrom: "2026-03-14",
    },
    location: {
      "@type": "Place",
      name: "Stadion Park Mladeži",
      address: { "@type": "PostalAddress", addressLocality: "Split", addressCountry: "HR" },
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
    totalTime: "PT45M",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(musicEventLd) }} />
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
              {isEn
                ? <>10 to 12 July 2026, Stadion Park Mladeži, Split, Croatia. ~55,000 fans per day on four stages, headlined by Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer and Steve Aoki. The festival is the anchor — but most fans extend it with the Destination Ultra week of island parties on Brač, Hvar and Vis. This is the complete guide to flights from Paris, where to stay in Split, the Aircash cashless float, and how to keep the crew aligned across three festival nights and the island days that follow. If you&apos;re still picking your tools, see our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Du 10 au 12 juillet 2026, Stadion Park Mladeži, Split, Croatie. ~55 000 personnes par jour sur quatre scènes, têtes d&apos;affiche Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer et Steve Aoki. Le festival est l&apos;ancrage — mais la plupart des fans le prolongent avec la semaine Destination Ultra et ses soirées sur les îles de Brač, Hvar et Vis. Voici le guide complet : vols depuis Paris, où dormir à Split, le float cashless Aircash, et comment garder la bande alignée sur trois nuits festival et les jours îles qui suivent. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=hero`}>
                <PulsatingButton className="font-karla font-bold">{t("hero.ctaButton")}</PulsatingButton>
              </Link>
              <p className="text-[#001E13]/55 text-xs lg:text-sm font-karla">{t("hero.ctaNote")}</p>
            </div>
          </div>
        </section>

        {/* ━━━ HERO VISUAL ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative aspect-[3/2] lg:aspect-[16/9] w-full rounded-[24px] lg:rounded-[32px] overflow-hidden">
              <Image
                src="/events/ultra-europe-2026.png"
                alt={t("hero.imageAlt")}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
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
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.siteLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">Park Mladeži</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Split, HR</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.stagesLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">4</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.stagesValue")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.capacityLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">~55k</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.capacityPerDay")}</p>
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
                { id: "the-lineup", label: t("toc.lineup") },
                { id: "tickets", label: t("toc.tickets") },
                { id: "getting-there", label: t("toc.gettingThere") },
                { id: "sleeping", label: t("toc.sleeping") },
                { id: "destination-ultra", label: t("toc.destinationUltra") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE LINEUP ━━━ */}
        <FadeIn>
          <section id="the-lineup" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("lineup.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("lineup.subtitle")}
              </p>

              <div className="space-y-0">
                {lineupItems.map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < 4 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
                    <div className="pb-12 lg:pb-16">
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">{item.stop}</h3>
                      <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ TICKETS & PRICES ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("tickets.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("tickets.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.card1.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.card1.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.card1.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.card2.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.card2.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.card2.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.card3.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.card3.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.card3.desc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ GETTING THERE ━━━ */}
        <FadeIn>
          <section id="getting-there" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("gettingThere.title")}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {t("gettingThere.subtitle")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("gettingThere.parisLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris → Split (SPU)</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {parisItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("gettingThere.otherLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("gettingThere.otherTitle")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {otherItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ WHERE TO SLEEP ━━━ */}
        <section id="sleeping" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("sleeping.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("sleeping.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("sleeping.zone1.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("sleeping.zone1.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("sleeping.zone1.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("sleeping.zone2.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("sleeping.zone2.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("sleeping.zone2.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("sleeping.zone3.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("sleeping.zone3.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("sleeping.zone3.desc")}
                </p>
              </div>
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
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=mid-sleep`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {t("midCta.button")}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ DESTINATION ULTRA ━━━ */}
        <FadeIn>
          <section id="destination-ultra" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("destinationUltra.title")}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {t("destinationUltra.subtitle")}
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("destinationUltra.day5.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {t("destinationUltra.day5.desc")}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("destinationUltra.day6.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {t("destinationUltra.day6.desc")}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("destinationUltra.day7.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {t("destinationUltra.day7.desc")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PLANNING THE TRIP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08]">
              {t("planning.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The festival-only vs full-week question splits more groups than the lineup itself. Three nights of EDM in Split is a 4-day trip; the full Destination Ultra week is an 8-day commitment with island ferries, different accommodation, and roughly double the budget. Run a quick <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early — get a count of who is on the 3-day pass vs the 7-day pass before any flight is booked. The poll is the smallest piece of work that prevents 80% of the trip arguments.</>
                : <>La question festival seul vs semaine complète divise plus les groupes que l&apos;affiche elle-même. Trois nuits d&apos;EDM à Split, c&apos;est un voyage de 4 jours ; la semaine Destination Ultra complète, c&apos;est 8 jours avec ferries vers les îles, hébergement différent, et environ le double de budget. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt — comptez qui est sur le pass 3 jours vs 7 jours avant de réserver le moindre vol. Le sondage, c&apos;est le plus petit travail qui évite 80 % des engueulades du voyage.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is where day-vs-night logic lives. Ultra is nocturnal (19:00-05:00), Destination Ultra side events are diurnal — back-to-back days at 30°C burn through stamina. Block daytime stops with sleep, water and a designated meeting point per stage. The mobile network at Park Mladeži crashes when 55,000 people land at once; the itinerary doubles as the offline coordination layer.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link>, c&apos;est là que vit la logique jour vs nuit. Ultra est nocturne (19h-5h), les side events Destination Ultra sont diurnes — des journées enchaînées à 30°C cassent vite l&apos;endurance. Bloquez les étapes diurnes avec sieste, eau et un point de rendez-vous par scène. Le réseau mobile à Park Mladeži s&apos;effondre quand 55 000 personnes arrivent en même temps ; l&apos;itinéraire devient la couche de coordination offline.</>}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET TIPS ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("budget.title")}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Tickets, VIP tiers and Cruise packages are individual — keep them out of the shared pool. The shared pool is for the Paris-Split flight, the Split apartment, the ferries to Hvar/Brač/Vis if you extend, taxis to Park Mladeži, restaurants in the old town, and the on-site Aircash float. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and add a dedicated &apos;Aircash float&apos; line so bar rounds and food don&apos;t disappear into a generic &apos;misc&apos; column.</>
                  : <>Les billets, VIP et packages Cruise sont individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour le vol Paris-Split, l&apos;appartement, les ferries vers Hvar/Brač/Vis si vous prolongez, les taxis vers Park Mladeži, les restos du vieux centre, et le float Aircash sur place. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et ajoutez une ligne « float Aircash » dédiée pour que les tournées et la bouffe ne se perdent pas dans une colonne « divers ».</>}
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
              <Link href={`/${locale}/solar-eclipse-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.eclipse.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.eclipse.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.eclipse.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
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
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=bottom`}>
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
