import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import FloatingCards from "@/components/FloatingCards";
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
const PATHNAME = "/trip-with-friends";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "tripWithFriends" });

  const isEn = locale === "en";
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...metadata,
    title,
    description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      title,
      description,
      url: currentUrl,
      locale: isEn ? "en_US" : "fr_FR",
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
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

export default async function TripWithFriendsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("tripWithFriends");

  const whyParagraphs = t.raw("whyParagraphs") as string[];
  const painPointsParagraphs = t.raw("painPointsParagraphs") as string[];
  const vsParagraphs = t.raw("vsParagraphs") as string[];
  const solutions = t.raw("solutions") as {
    title: string;
    description: string;
    linkText: string;
  }[];
  const scenarios = t.raw("scenarios") as {
    title: string;
    description: string;
  }[];
  const steps = t.raw("steps") as { title: string; description: string }[];
  const faqItems = t.raw("faqItems") as { q: string; a: string }[];
  const destinationCards = t.raw("destinations.cards") as {
    title: string;
    desc: string;
  }[];

  // Structural (non-translatable) data merged by index with the localized text.
  const solutionMeta = [
    { link: "/features/planning", color: "bg-[#EEF899]", textColor: "text-[#001E13]" },
    { link: "/features/polls", color: "bg-[#61DBD5]", textColor: "text-[#001E13]" },
    { link: "/features/budget", color: "bg-[#001E13]", textColor: "text-[#FFFBF5]" },
    { link: "/features/packing", color: "bg-[#F6391A]", textColor: "text-[#FFFBF5]" },
  ];
  const scenarioIcons = ["🏖️", "✈️", "🎵"];
  const destinationSlugs = [
    locale === "fr" ? "lisbonne-entre-amis" : "lisbon-with-friends",
    locale === "fr" ? "toscane-road-trip" : "tuscany-road-trip",
    locale === "fr" ? "budapest-evjf" : "budapest-bachelorette",
  ];

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null
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
        name: t("breadcrumb.currentLd"),
        item: `${SITE_URL}/${locale}/trip-with-friends`,
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
    headline: t("jsonld.articleHeadline"),
    description: t("heroDescription"),
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
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[140px] pb-8 lg:pb-10 px-4 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.currentNav") },
                ]}
              />
            </div>
          </div>
          <div className="max-w-[1536px] mx-auto">
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] bg-[#001E13]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#001E13] via-[#001E13] to-[#0a3d2a] opacity-100" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#61DBD5]/10 to-transparent" />

              <div className="relative z-10 px-6 lg:px-16 xl:px-20 py-16 lg:py-24 xl:py-32 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                <div className="text-center lg:text-left lg:w-1/2">
                  <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
                    {t("heroTag")}
                  </span>

                  <h1 className="text-[#FFFBF5] text-3xl lg:text-5xl xl:text-[56px] font-londrina-solid leading-tight mb-4 whitespace-pre-line">
                    {t("heroTitle")}
                  </h1>

                  <p className="text-[#FFFBF5]/50 text-sm font-karla mb-4">
                    {t("readTime")}
                  </p>

                  <p className="text-[#FFFBF5]/85 text-base lg:text-lg font-karla leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                    {t("heroDescription")}{" "}
                    <Link
                      href={`/${locale}/guides/plan-group-trip`}
                      className="text-[#EEF899] underline underline-offset-4 hover:opacity-80"
                    >
                      {t("heroGuideLink")}
                    </Link>
                    .
                  </p>

                  <div className="flex flex-col gap-2 items-center lg:items-start">
                    <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                      <PulsatingButton className="font-karla font-bold">
                        {t("heroCta")}
                      </PulsatingButton>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/2 relative">
                  <FloatingCards />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author */}
        <div className="max-w-[900px] mx-auto px-4 lg:px-8 pt-4">
          <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-26" />
        </div>

        {/* Why Section */}
        <section className="pt-10 lg:pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-8 text-center">
              {t("whyTitle")}
            </h2>
            <div className="space-y-5">
              {whyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Pain Points Section */}
        <section className="pt-10 lg:pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4 text-center">
              {t("painPointsTitle")}
            </h2>
            <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed text-center mb-8">
              {t("painPointsSubtitle")}
            </p>
            <div className="space-y-5">
              {painPointsParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t("solutionTitle")}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t("solutionSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {solutions.map((solution, index) => {
                const meta = solutionMeta[index];
                return (
                <div
                  key={index}
                  className={`${meta.color} rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[280px]`}
                >
                  <div>
                    <h3
                      className={`text-xl lg:text-2xl font-londrina-solid ${meta.textColor} mb-3`}
                    >
                      <Link href={`/${locale}${meta.link}`} className={`${meta.textColor} font-londrina-solid no-underline hover:underline underline-offset-4`}>
                        {solution.title}
                      </Link>
                    </h3>
                    <p
                      className={`${meta.textColor} opacity-80 font-karla text-sm lg:text-base leading-relaxed mb-6`}
                    >
                      {solution.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/${locale}${meta.link}`}
                      className={`${meta.textColor} font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70 transition-opacity`}
                    >
                      {solution.linkText} &rarr;
                    </Link>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Real-World Scenarios Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t("scenariosTitle")}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t("scenariosSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="bg-[#001E13] rounded-[20px] lg:rounded-[24px] p-6 lg:p-8"
                >
                  <span className="text-3xl lg:text-4xl mb-4 block">
                    {scenarioIcons[index]}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3">
                    {scenario.title}
                  </h3>
                  <p className="text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#001E13]/60 font-karla text-sm">
                {locale === "fr" ? (
                  <>Vous organisez un EVJF ? Découvrez notre <Link href={`/${locale}/bachelorette-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">guide dédié à l&apos;organisation d&apos;EVJF</Link>.</>
                ) : (
                  <>Planning a bachelorette? Check out our <Link href={`/${locale}/bachelorette-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">dedicated bachelorette trip planning guide</Link>.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Why WePlanify vs Other Tools */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10 lg:mb-14">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t("vsTitle")}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t("vsSubtitle")}
              </p>
            </div>
            <div className="space-y-5">
              {vsParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/alternatives/best-group-trip-planner-apps`}
                className="text-[#F6391A] font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70"
              >
                {t("vsComparisonLink")}
              </Link>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t("stepsTitle")}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t("stepsSubtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F6391A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#FFFBF5] text-2xl lg:text-3xl font-londrina-solid">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {t("faqTitle")}
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

        {/* Destinations cross-link */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1 rounded-full text-sm font-nanum-pen mb-3">
                {t("destinations.tag")}
              </span>
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13]">
                {t("destinations.heading")}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {destinationCards.map((card, index) => {
                const slug = destinationSlugs[index];
                return (
                <Link key={slug} href={`/${locale}/destinations/${slug}`} className="group">
                  <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg hover:border-[#F6391A]/30 transition-all h-full">
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                      {card.desc}
                    </p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                      {t("destinations.cardLink")}
                    </span>
                  </div>
                </Link>
                );
              })}
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

        {/* Discover More Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {t("discover.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.guide.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.guide.link")}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/world-cup-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {t("discover.worldCup.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discover.worldCup.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discover.worldCup.link")}
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
                    {t("discover.comparison.link")}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-[#FFFBF5]/85 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("ctaDescription")}
              </p>
              <div className="flex flex-col gap-2 items-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                  <PulsatingButton className="font-karla font-bold">
                    {t("ctaButton")}
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
