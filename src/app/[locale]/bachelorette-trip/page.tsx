import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import FadeIn from "@/components/FadeIn";
import Confetti from "@/components/Confetti";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/bachelorette-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseMetadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "bacheloretteTrip" });
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...baseMetadata,
    title: t("meta.title"),
    description: t("meta.description"),
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      title: t("meta.title"),
      description: t("meta.description"),
      url: currentUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t("meta.title"),
      description: t("meta.description"),
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

export default async function BacheloretteTrip({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("bacheloretteTrip");

  const guideParagraphs = t.raw("guideIntro.paragraphs") as string[];
  const painItems = t.raw("painPoints.items") as {
    emoji: string;
    title: string;
    description: string;
  }[];
  const featureItems = t.raw("features.items") as {
    emoji: string;
    title: string;
    description: string;
  }[];
  const tripIdeaItems = t.raw("tripIdeas.items") as {
    emoji: string;
    title: string;
    description: string;
  }[];
  const milestones = t.raw("timeline.milestones") as {
    time: string;
    title: string;
    description: string;
  }[];
  const checklistItems = t.raw("checklist.items") as string[];
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
        name: t("breadcrumb.bachelorette"),
        item: `${SITE_URL}/${locale}/bachelorette-trip`,
      },
    ],
  };

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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("meta.title"),
    description: t("meta.description"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor", url: SITE_URL },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19",
    dateModified: "2026-03-26",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${PATHNAME}`,
    },
  };

  return (
    <>
      <AuthorJsonLd />
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
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-24 px-4 lg:px-8 overflow-hidden">
          <Confetti />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.bachelorette") },
                ]}
              />
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
              {t("hero.tag")}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-4 whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="text-sm font-karla text-[#001E13]/50 mb-4">{t("readTime")}</p>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t("hero.description")}
            </p>
            <div className="flex flex-col items-center gap-2">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t("hero.cta")}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-2">
          <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-26" />
        </div>

        {/* Guide Intro Section */}
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] mb-8 text-center">
              {t("guideIntro.title")}
            </h2>
            <div className="space-y-5">
              {guideParagraphs.map((p, i) => (
                <p key={i} className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-[#001E13]/60 font-karla text-sm">
                {locale === "fr" ? (
                  <>Besoin d&apos;un guide plus général ? Consultez notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">guide complet pour organiser un voyage de groupe</Link>.</>
                ) : (
                  <>Need a more general guide? Check out our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">complete group trip planning guide</Link>.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {t("painPoints.title")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                {t("painPoints.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {painItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:bg-[#FFFBF5]/10 transition-colors duration-300"
                >
                  <span className="text-3xl lg:text-4xl mb-4 block">
                    {item.emoji}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#FFFBF5]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Features Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t("features.title")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t("features.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {featureItems.map((item, index) => {
                const featureLinks: Record<string, string> = {
                  "Polls for Activities & Dates": "/features/polls",
                  "Sondages pour les Activités & Dates": "/features/polls",
                  "Shared Budget & Kitty": "/features/budget",
                  "Cagnotte & Budget Partagé": "/features/budget",
                  "Day-by-Day Itinerary": "/features/planning",
                  "Programme Jour par Jour": "/features/planning",
                };
                const featureLink = featureLinks[item.title];

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-[#001E13]/5 hover:shadow-md hover:border-[#F6391A]/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#EEF899] rounded-2xl flex items-center justify-center mb-5">
                      <span className="text-2xl lg:text-3xl">{item.emoji}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                      {featureLink ? (
                        <Link href={`/${locale}${featureLink}`} className="text-[#001E13] font-londrina-solid hover:underline underline-offset-4 no-underline">
                          {item.title}
                        </Link>
                      ) : (
                        item.title
                      )}
                    </h3>
                    <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Trip Ideas Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t("tripIdeas.title")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t("tripIdeas.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tripIdeaItems.map((idea, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#001E13]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-3xl mb-4 block">{idea.emoji}</span>
                  <h3 className="text-xl font-londrina-solid text-[#001E13] mb-3">
                    {idea.title}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Timeline Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t("timeline.title")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t("timeline.subtitle")}
              </p>
            </div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#F6391A] rounded-full flex-shrink-0" />
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-[#F6391A]/20 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-[#F6391A] font-karla font-bold text-sm uppercase tracking-wide">
                      {milestone.time}
                    </span>
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Checklist Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] text-center mb-12">
              {t("checklist.title")}
            </h2>
            <div className="space-y-4">
              {checklistItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-[#FFFBF5]/5 border border-[#FFFBF5]/10 rounded-xl p-4"
                >
                  <span className="text-[#EEF899] font-londrina-solid text-lg flex-shrink-0 w-8">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[#FFFBF5]/90 font-karla text-sm lg:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Testimonial Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#EEF899] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 relative">
              <svg
                className="w-10 h-10 lg:w-14 lg:h-14 text-[#001E13]/15 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
              </svg>
              <blockquote className="text-lg lg:text-xl xl:text-2xl font-karla text-[#001E13] leading-relaxed mb-6 italic">
                &ldquo;{t("testimonial.quote")}&rdquo;
              </blockquote>
              <div>
                <p className="font-londrina-solid text-lg lg:text-xl text-[#001E13]">
                  {t("testimonial.author")}
                </p>
                <p className="font-nanum-pen text-base lg:text-lg text-[#001E13]/60">
                  {t("testimonial.role")}
                </p>
              </div>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* FAQ Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-[#001E13]/10 pb-5"
                >
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Destinations cross-link */}
        <FadeIn>
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1 rounded-full text-sm font-nanum-pen mb-3">
                {t("destinations.tag")}
              </span>
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13]">
                {t("destinations.heading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  slug: locale === "fr" ? "las-vegas-evjf" : "las-vegas-bachelorette",
                  key: "lasVegas",
                },
                {
                  slug: locale === "fr" ? "nashville-evjf" : "nashville-bachelorette",
                  key: "nashville",
                },
                {
                  slug: locale === "fr" ? "budapest-evjf" : "budapest-bachelorette",
                  key: "budapest",
                },
                {
                  slug: locale === "fr" ? "marrakech-evjf" : "marrakech-bachelorette",
                  key: "marrakech",
                },
              ].map((card) => (
                <Link key={card.slug} href={`/${locale}/destinations/${card.slug}`} className="group">
                  <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg hover:border-[#F6391A]/30 transition-all h-full">
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                      {t(`destinations.cards.${card.key}.title`)}
                    </h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                      {t(`destinations.cards.${card.key}.desc`)}
                    </p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                      {t("destinations.seeItinerary")}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/destinations`}
                className="text-[#F6391A] font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70"
              >
                {t("destinations.seeAll")}
              </Link>
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Discover More Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {t("discover.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.tripWithFriends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.tripWithFriends.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.tripWithFriends.cta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.guide.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.guide.cta")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.comparison.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.comparison.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.comparison.cta")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("cta.description")}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {t("cta.button")}
                  </PulsatingButton>
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
