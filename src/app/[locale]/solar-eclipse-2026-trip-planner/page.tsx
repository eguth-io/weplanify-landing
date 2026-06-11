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
const PATHNAME = "/solar-eclipse-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "solarEclipse2026" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/solar-eclipse-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: hreflangLanguages(SITE_URL, PATHNAME) },
  };
}

export default async function SolarEclipse2026Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("solarEclipse2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const pathItems = t.raw("path.items") as { stop: string; desc: string }[];
  const partialItems = t.raw("france.partialItems") as string[];
  const missItems = t.raw("france.missItems") as string[];
  const spainItems = t.raw("logistics.spainItems") as string[];
  const icelandItems = t.raw("logistics.icelandItems") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls: (string | null)[] = [
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/itinerary`,
    null,
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
    image: [`${SITE_URL}/events/solar-eclipse-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: t("jsonld.eventName"),
    description: t("jsonld.eventDescription"),
    image: [`${SITE_URL}/events/solar-eclipse-2026.png`],
    startDate: "2026-08-12T17:43:00+00:00",
    endDate: "2026-08-12T18:35:00+00:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: [
      { "@type": "Place", name: "Iceland (Westfjords, Snæfellsnes, Reykjavík)", address: { "@type": "PostalAddress", addressCountry: "IS" } },
      { "@type": "Place", name: "Spain (Galicia, Asturias, Castilla y León, Aragón, Valencia, Balearic Islands)", address: { "@type": "PostalAddress", addressCountry: "ES" } },
    ],
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
    totalTime: "PT60M",
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
              {isEn
                ? <>Wednesday 12 August 2026. The first total solar eclipse visible from mainland Europe since 11 August 1999. The shadow lands on Greenland, sweeps across western Iceland, and crosses northern Spain at sunset — Galicia, the Ebro Valley, Valencia and Mallorca. Maximum totality is 2 minutes 18 seconds; in Spain&apos;s observable cities you&apos;ll get between 30 seconds and ~1 min 36 s. Mainland France only sees a deep partial (92.2% in Paris, 99.5% in Biarritz) — no totality. This is the complete guide to picking the right spot, getting there, the safety equipment, and planning the trip with a group. If you&apos;re still picking your tools, see our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Mercredi 12 août 2026. La première éclipse totale visible depuis l&apos;Europe continentale depuis le 11 août 1999. L&apos;ombre touche le Groenland, balaie l&apos;ouest de l&apos;Islande, et traverse le nord de l&apos;Espagne au crépuscule — Galice, vallée de l&apos;Èbre, Valence et Majorque. La totalité maximale est de 2 minutes 18 secondes ; dans les villes espagnoles observables, vous aurez entre 30 secondes et ~1 min 36 s. La France métropolitaine ne voit qu&apos;une partielle profonde (92,2 % à Paris, 99,5 % à Biarritz) — pas de totalité. Voici le guide complet pour choisir le bon spot, s&apos;y rendre, s&apos;équiper, et organiser le voyage à plusieurs. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026&placement=hero`}>
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
                src="/events/solar-eclipse-2026.png"
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
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.dateLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.dateValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.totalityLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">2 min 18 s</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.totalitySub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.pathLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">IS · ES</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.pathSub")}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.lastLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">1999</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.lastSub")}</p>
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
                { id: "path", label: t("toc.path") },
                { id: "france", label: t("toc.france") },
                { id: "spain-vs-iceland", label: t("toc.spainVsIceland") },
                { id: "safety", label: t("toc.safety") },
                { id: "logistics", label: t("toc.logistics") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE PATH ━━━ */}
        <FadeIn>
          <section id="path" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("path.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("path.subtitle")}
              </p>

              <div className="space-y-0">
                {pathItems.map((item, i) => (
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

        {/* ━━━ WHAT FRANCE SEES ━━━ */}
        <FadeIn>
          <section id="france" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("france.title")}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {t("france.subtitle")}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("france.partialLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("france.partialTitle")}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {partialItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("france.missLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("france.missTitle")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {missItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ SPAIN VS ICELAND VS CRUISE ━━━ */}
        <section id="spain-vs-iceland" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("spainVsIceland.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("spainVsIceland.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("spainVsIceland.option1.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("spainVsIceland.option1.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("spainVsIceland.option1.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("spainVsIceland.option2.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("spainVsIceland.option2.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("spainVsIceland.option2.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("spainVsIceland.option3.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("spainVsIceland.option3.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("spainVsIceland.option3.desc")}
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
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026&placement=mid-options`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {t("midCta.button")}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ SAFETY ━━━ */}
        <section id="safety" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("safety.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("safety.subtitle")}
            </p>

            <div className="space-y-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("safety.card1.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {t("safety.card1.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("safety.card2.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {t("safety.card2.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{t("safety.card3.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {t("safety.card3.desc")}
                </p>
              </div>
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
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.spainLabel")}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.gettingThere")}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {spainItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("logistics.icelandLabel")}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{t("logistics.gettingThere")}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    {icelandItems.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
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
                ? <>An eclipse trip has a brutal forcing function: 30 seconds to 2 minutes of payoff in a single moment, after months of planning. The destination call is the hardest — Iceland enthusiasts and Mediterranean enthusiasts often want very different trips. Run a <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early on the three real options (inland Spain, Mallorca, Iceland), with each person ranking by what they actually optimise for — clear-sky odds, totality duration, or experience. The poll is the smallest piece of work that prevents an entire trip from drifting toward the loudest voice.</>
                : <>Un voyage éclipse a une contrainte brutale : 30 secondes à 2 minutes de récompense en un seul instant, après des mois de préparation. Le choix de la destination est la décision la plus dure — les amoureux d&apos;Islande et ceux de Méditerranée veulent souvent des voyages très différents. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt sur les trois vraies options (Espagne intérieure, Majorque, Islande), avec chaque personne qui classe selon ce qu&apos;elle optimise vraiment — probabilité de ciel clair, durée de la totalité, ou expérience. Le sondage, c&apos;est le plus petit travail qui empêche un voyage entier de glisser vers la voix la plus forte.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The day-J <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is non-negotiable. Block: arrival at the observation spot at least 2 hours before totality, glasses-on for the partial phase, the totality window (minute by minute), the post-totality partial (still dangerous, glasses back on), and the drive back. The hours after totality are when roads clog and cellular networks die — agree on a meeting point and a fallback channel before the partial even starts.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> du jour J n&apos;est pas négociable. Bloquez : arrivée sur le spot au moins 2 heures avant la totalité, lunettes en partielle, fenêtre de totalité (minute par minute), partielle post-totalité (toujours dangereuse, lunettes remises), et le trajet retour. Les heures après la totalité, c&apos;est routes bouchées et réseau mort — convenez d&apos;un point de rendez-vous et d&apos;un canal de secours avant même le début de la partielle.</>}
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
                  ? <>Eclipse trips skew the normal budget pattern: accommodation prices on 11-12 August are the dominant line, often 3-10× normal rates, while transport is closer to typical August prices. Hotels.com reported a 445% surge in eclipse-destination searches, and Palencia rooms have appeared at €1,095/night. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with the night of 11-12 August explicitly carved out as a separate line, and decide as a group whether the headline city is worth the premium or whether a 30-minute drive to a smaller town is the better trade.</>
                  : <>Les voyages éclipse déforment le pattern budget habituel : les prix d&apos;hébergement la nuit du 11-12 août dominent la ligne, souvent 3-10× le tarif normal, tandis que le transport reste proche d&apos;août classique. Hotels.com a rapporté +445 % de recherches sur destinations éclipse, et des chambres à Palencia sont apparues à 1 095 €/nuit. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec la nuit du 11-12 août en ligne séparée explicite, et décidez en groupe si la ville vedette vaut le premium ou si 30 minutes de route vers une petite ville est le meilleur trade.</>}
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
              <Link href={`/${locale}/hellfest-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.hellfest.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.hellfest.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.hellfest.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/tomorrowland-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tomorrowland.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tomorrowland.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tomorrowland.cta")}</span>
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
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026`}>
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
