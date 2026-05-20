import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Breadcrumb from "@/components/Breadcrumb";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";

import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import {
  countryGuides,
  continentLabel,
  type Locale,
  type TravelGuideContinent,
} from "@/lib/travel-guides/data";

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/travel-guides";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const indexContent = {
  en: {
    eyebrow: "Travel guides",
    title: "Country guides,\nbuilt to plan from.",
    intro:
      "Opinionated, on-the-ground country guides: where to go, when to go, what to eat, honest budget, cultural do's and don'ts. Pick a country, build the trip with your group in WePlanify.",
    metaTitle:
      "Travel Guides — Country-by-Country Itineraries & Tips | WePlanify",
    metaDescription:
      "Real travel guides for every country we cover: best season, must-see places, regional food, honest 2026 budgets, cultural tips. Built for planning real trips, not Pinterest boards.",
    cta: "Start a trip",
    seeGuide: "Read the guide →",
  },
  fr: {
    eyebrow: "Guides voyage",
    title: "Des guides pays,\npour planifier vraiment.",
    intro:
      "Des guides pays sans bla-bla : où aller, quand y aller, quoi manger, budget honnête, codes culturels. Choisissez un pays, construisez le voyage avec votre groupe dans WePlanify.",
    metaTitle:
      "Guides voyage — Itinéraires et conseils pays par pays | WePlanify",
    metaDescription:
      "De vrais guides voyage pays par pays : meilleure saison, incontournables, cuisine régionale, budget 2026 honnête, codes culturels. Pensé pour planifier de vrais voyages, pas des moodboards.",
    cta: "Commencer un voyage",
    seeGuide: "Lire le guide →",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = locale === "fr" ? "fr" : "en";
  const c = indexContent[loc];
  const baseMetadata = await generateMetadataFromSanity(locale, PATHNAME);
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...baseMetadata,
    title: c.metaTitle,
    description: c.metaDescription,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...baseMetadata.openGraph,
      title: c.metaTitle,
      description: c.metaDescription,
      url: currentUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: c.metaTitle,
      description: c.metaDescription,
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

export default async function TravelGuidesIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === "fr" ? "fr" : "en";
  const c = indexContent[loc];

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

  // Group guides by continent for future-proofing
  const guidesByContinent = countryGuides.reduce<
    Record<TravelGuideContinent, typeof countryGuides>
  >(
    (acc, g) => {
      if (!acc[g.continent]) acc[g.continent] = [];
      acc[g.continent].push(g);
      return acc;
    },
    {} as Record<TravelGuideContinent, typeof countryGuides>
  );

  const signupHref = `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=travel-guides-index`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "fr" ? "Accueil" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: c.eyebrow,
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="pt-[120px] lg:pt-[160px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  {
                    label: locale === "fr" ? "Accueil" : "Home",
                    href: `/${locale}`,
                  },
                  { label: c.eyebrow },
                ]}
              />
            </div>

            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-5">
              {c.eyebrow}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-[1.05] mb-6 whitespace-pre-line">
              {c.title}
            </h1>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/75 leading-relaxed max-w-2xl mb-8">
              {c.intro}
            </p>
            <Link href={signupHref}>
              <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                {c.cta}
              </PulsatingButton>
            </Link>
          </div>
        </section>

        {/* Guides grid */}
        <FadeIn>
          <section className="pb-20 lg:pb-28 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto space-y-16">
              {(
                Object.entries(guidesByContinent) as [
                  TravelGuideContinent,
                  typeof countryGuides,
                ][]
              ).map(([continent, guides]) => (
                <div key={continent}>
                  <h2 className="text-2xl lg:text-3xl font-londrina-solid text-[#001E13] mb-6">
                    {continentLabel(continent, loc)}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {guides.map((g) => (
                      <Link
                        key={g.slug.en}
                        href={`/${locale}/travel-guides/${g.slug[loc]}`}
                        className="group"
                      >
                        <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 h-full flex flex-col">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={g.hero.image}
                              alt={g.hero.imageAlt[loc]}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-2xl font-londrina-solid text-[#001E13] mb-3">
                              {g.country[loc]}
                            </h3>
                            <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                              {g.meta.description[loc]}
                            </p>
                            <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-auto">
                              {c.seeGuide}
                            </span>
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
