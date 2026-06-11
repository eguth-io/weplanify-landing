import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Breadcrumb from "@/components/Breadcrumb";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";

import { generateMetadataFromSanity, hreflangLanguages } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import {
  destinations,
  getUseCaseLabel,
  type Locale,
  type DestinationUseCase,
} from "@/lib/destinations/data";

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/destinations";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "destinationsIndex" });
  const baseMetadata = await generateMetadataFromSanity(locale, PATHNAME);
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...baseMetadata,
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      ...baseMetadata.openGraph,
      type: "website",
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
      languages: hreflangLanguages(SITE_URL, PATHNAME),
    },
  };
}

export default async function DestinationsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations("destinationsIndex");
  const filters = t.raw("filters") as Record<string, string>;

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null,
  ] = await Promise.all([
    sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
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

  // Group destinations by use case for the "by intent" sections.
  const useCases: DestinationUseCase[] = ["bachelorette", "road-trip", "with-friends"];

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
        name: t("breadcrumb.destinations"),
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("meta.title"),
    description: t("meta.description"),
    url: `${SITE_URL}/${locale}${PATHNAME}`,
    hasPart: destinations.map((d) => ({
      "@type": "TouristTrip",
      name: d.meta.title[loc],
      description: d.meta.description[loc],
      image: d.hero.image,
      duration: `P${d.days}D`,
      url: `${SITE_URL}/${locale}/destinations/${d.slug[loc]}`,
    })),
  };

  const signupHref = `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=destinations_index`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-12 lg:pb-16 px-4 lg:px-8 overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.destinations") },
                ]}
              />
            </div>
            <div className="text-center">
              <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-5">
                {t("eyebrow")}
              </span>
              <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-[1.05] mb-6 whitespace-pre-line">
                {t("title")}
              </h1>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/75 max-w-2xl mx-auto leading-relaxed">
                {t("intro")}
              </p>
            </div>
          </div>
        </section>

        {/* Sections grouped by use case */}
        {useCases.map((useCase) => {
          const items = destinations.filter((d) => d.useCase === useCase);
          if (items.length === 0) return null;

          return (
            <FadeIn key={useCase}>
              <section className="py-12 lg:py-16 px-4 lg:px-8">
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-end justify-between gap-4 mb-8">
                    <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13]">
                      {filters[useCase]}
                    </h2>
                    <span className="text-sm lg:text-base font-karla text-[#001E13]/50">
                      {items.length}{" "}
                      {t("destinationsCount", { count: items.length })}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((d) => {
                      const currencySymbol =
                        d.budget.perPerson.currency === "USD" ? "$" : "€";
                      return (
                        <Link
                          key={d.slug.en}
                          href={`/${locale}/destinations/${d.slug[loc]}`}
                          className="group"
                        >
                          <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 h-full flex flex-col">
                            <div className="relative aspect-[4/3] overflow-hidden">
                              <Image
                                src={d.hero.image}
                                alt={d.hero.imageAlt[loc]}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                              <div className="flex gap-2 mb-3 flex-wrap">
                                <span className="bg-[#EEF899] text-[#001E13] px-3 py-1 rounded-full text-xs font-karla font-bold">
                                  {getUseCaseLabel(d.useCase, loc)}
                                </span>
                                <span className="bg-[#001E13]/5 text-[#001E13] px-3 py-1 rounded-full text-xs font-karla">
                                  {d.days} {t("days")}
                                </span>
                                <span className="bg-[#001E13]/5 text-[#001E13] px-3 py-1 rounded-full text-xs font-karla">
                                  {currencySymbol}
                                  {d.budget.perPerson.low}–{currencySymbol}
                                  {d.budget.perPerson.high}
                                </span>
                              </div>
                              <h3 className="text-2xl font-londrina-solid text-[#001E13] mb-2">
                                {d.city[loc]}
                              </h3>
                              <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                                {d.meta.description[loc]}
                              </p>
                              <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-auto">
                                {t("cardCta")}
                              </span>
                            </div>
                          </article>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>
            </FadeIn>
          );
        })}

        {/* CTA */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#001E13] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {t("ctaTitle")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/80 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("ctaBody")}
              </p>
              <div className="flex justify-center">
                <Link href={signupHref}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
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
