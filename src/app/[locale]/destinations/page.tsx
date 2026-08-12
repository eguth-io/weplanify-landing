import { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import FadeIn from "@/components/FadeIn";
import Breadcrumb from "@/components/Breadcrumb";
import DestinationExplorer, {
  type ExplorerItem,
} from "@/components/destinations/DestinationExplorer";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import {
  destinations,
  getUseCaseLabel,
  type Locale,
  type DestinationUseCase,
} from "@/lib/destinations/data";
import { fetchPublishedDestinations } from "@/lib/destinations/api";
import { NAV_CONTENT, getFooterContent } from "@/lib/site-content";

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
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}${PATHNAME}`]),
        ),
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

export default async function DestinationsIndexPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === "fr" ? "fr" : "en";
  const t = await getTranslations("destinationsIndex");
  const filters = t.raw("filters") as Record<string, string>;

  // API-driven destinations (city mini-guides). Resilient to an empty list.
  const apiDestinations = await fetchPublishedDestinations(locale);

  const navData = NAV_CONTENT;
  const navigationData = null;
  const footerData = getFooterContent(locale);

  const useCases: DestinationUseCase[] = [
    "trip-planner",
    "bachelorette",
    "road-trip",
    "with-friends",
  ];

  // Both catalogues feed one grid. The curated itineraries keep their use case
  // as a filter key so the index still links to them and they stay reachable.
  const editorialItems: ExplorerItem[] = destinations.map((d) => {
    const symbol = d.budget.perPerson.currency === "USD" ? "$" : "€";
    return {
      id: `editorial-${d.slug.en}`,
      href: `/${locale}/destinations/${d.slug[loc]}`,
      city: d.city[loc],
      country: null,
      flag: null,
      tagline: d.meta.description[loc],
      image: d.hero.image,
      imageAlt: d.hero.imageAlt[loc],
      badges: [getUseCaseLabel(d.useCase, loc), `${d.days} ${t("days")}`],
      cta: t("cardCta"),
      budget: {
        amount: `${symbol}${d.budget.perPerson.low}–${symbol}${d.budget.perPerson.high}`,
        caption: t("explorer.budgetCaption"),
      },
      tags: [d.useCase],
    };
  });

  const apiItems: ExplorerItem[] = apiDestinations.map((item) => ({
    id: item.id,
    href: `/${locale}/destinations/${item.id}`,
    city: item.city,
    country: item.country,
    flag: item.flag,
    tagline: item.tagline,
    image: item.cover?.url ?? null,
    imageAlt: item.city,
    badges: [],
    // The list endpoint carries no budget; only the guide itself has one.
    budget: null,
    cta: t("explorer.cardCtaGuide"),
    tags: item.tags ?? [],
  }));

  const explorerItems = [...editorialItems, ...apiItems];

  // Use cases first — they are the editorial angles we rank on — then the
  // vibe tags the API already returns translated, most common first.
  const apiTagCounts = new Map<string, { label: string; count: number }>();
  for (const item of apiDestinations) {
    item.tags?.forEach((tag, index) => {
      const existing = apiTagCounts.get(tag);
      if (existing) existing.count += 1;
      else
        apiTagCounts.set(tag, {
          label: item.tag_labels?.[index] ?? tag,
          count: 1,
        });
    });
  }
  const tagOptions = [
    ...useCases
      .filter((useCase) => destinations.some((d) => d.useCase === useCase))
      .map((useCase) => ({ key: useCase, label: filters[useCase] })),
    ...[...apiTagCounts.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .map(([key, { label }]) => ({ key, label })),
  ];

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
    hasPart: [
      ...destinations.map((d) => ({
        "@type": "TouristTrip",
        name: d.meta.title[loc],
        description: d.meta.description[loc],
        image: d.hero.image,
        duration: `P${d.days}D`,
        url: `${SITE_URL}/${locale}/destinations/${d.slug[loc]}`,
      })),
      ...apiDestinations.map((d) => ({
        "@type": "TouristTrip",
        name: d.city,
        ...(d.tagline ? { description: d.tagline } : {}),
        ...(d.cover ? { image: d.cover.url } : {}),
        url: `${SITE_URL}/${locale}/destinations/${d.id}`,
      })),
    ],
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
                {t("intro", { count: explorerItems.length })}
              </p>
            </div>
          </div>
        </section>

        {/* Everything the index links to, in one browsable grid: the curated
            itineraries and the API city guides share the same filters */}
        <FadeIn>
          <section className="pb-12 lg:pb-16 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <DestinationExplorer
                items={explorerItems}
                tagOptions={tagOptions}
                locale={locale}
                labels={{
                  searchPlaceholder: t("explorer.searchPlaceholder"),
                  allCountries: t("explorer.allCountries"),
                  countryEmpty: t("explorer.countryEmpty"),
                  results: t.raw("explorer.results") as Record<string, string>,
                  noResults: t("explorer.noResults"),
                  noResultsBody: t("explorer.noResultsBody"),
                  reset: t("explorer.reset"),
                }}
              />
            </div>
          </section>
        </FadeIn>

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
