import { Metadata } from "next";
import { notFound } from "next/navigation";
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
import {
  destinations,
  findDestinationByLocalizedSlug,
  poiTypeLabel,
  getUseCaseLabel,
  type Locale,
} from "@/lib/destinations/data";

const SITE_URL = "https://www.weplanify.com";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  // Build-time generation of every locale × slug combination.
  const params: Array<{ locale: string; slug: string }> = [];
  for (const d of destinations) {
    params.push({ locale: "en", slug: d.slug.en });
    params.push({ locale: "fr", slug: d.slug.fr });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const loc: Locale = locale === "fr" ? "fr" : "en";
  const destination = findDestinationByLocalizedSlug(slug, loc);
  if (!destination) return {};

  const baseMetadata = await generateMetadataFromSanity(
    locale,
    `/destinations/${slug}`
  );
  const title = destination.meta.title[loc];
  const description = destination.meta.description[loc];
  const currentUrl = `${SITE_URL}/${locale}/destinations/${slug}`;

  // Hreflang must point at each locale's own slug.
  const enUrl = `${SITE_URL}/en/destinations/${destination.slug.en}`;
  const frUrl = `${SITE_URL}/fr/destinations/${destination.slug.fr}`;

  return {
    ...baseMetadata,
    title,
    description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
      title,
      description,
      url: currentUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      images: [
        {
          url: destination.hero.image,
          width: 1600,
          height: 900,
          alt: destination.hero.imageAlt[loc],
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: [destination.hero.image],
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: enUrl,
        fr: frUrl,
        "x-default": enUrl,
      },
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === "fr" ? "fr" : "en";
  const destination = findDestinationByLocalizedSlug(slug, loc);
  if (!destination) notFound();

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

  const currentUrl = `${SITE_URL}/${locale}/destinations/${slug}`;
  const cityLabel = destination.city[loc];
  const countryLabel = destination.country[loc];

  // ----- JSON-LD -----
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
        name: locale === "fr" ? "Destinations" : "Destinations",
        item: `${SITE_URL}/${locale}/destinations`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: cityLabel,
        item: currentUrl,
      },
    ],
  };

  const touristTripLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: destination.meta.title[loc],
    description: destination.meta.description[loc],
    image: destination.hero.image,
    touristType:
      locale === "fr"
        ? getUseCaseLabel(destination.useCase, "fr")
        : getUseCaseLabel(destination.useCase, "en"),
    itinerary: destination.itinerary.map((day) => ({
      "@type": "ItemList",
      name: `${locale === "fr" ? "Jour" : "Day"} ${day.day}: ${day.title[loc]}`,
      itemListElement: [day.morning[loc], day.afternoon[loc], day.evening[loc]].map(
        (text, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: text,
        })
      ),
    })),
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: destination.budget.perPerson.currency,
      minValue: destination.budget.perPerson.low,
      maxValue: destination.budget.perPerson.high,
    },
    duration: `P${destination.days}D`,
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl },
  };

  const currencySymbol =
    destination.budget.perPerson.currency === "USD" ? "$" : "€";

  // Group POIs by type for the map/POI section.
  const poisByType = destination.pois.reduce<
    Record<string, typeof destination.pois>
  >((acc, poi) => {
    if (!acc[poi.type]) acc[poi.type] = [];
    acc[poi.type].push(poi);
    return acc;
  }, {});

  // Related destinations: resolve slugs against the EN slug catalog.
  const relatedDestinations = destination.related
    .map((relatedSlug) => destinations.find((d) => d.slug.en === relatedSlug))
    .filter((d): d is NonNullable<typeof d> => Boolean(d));

  // App signup link with destination ref for GA attribution.
  const signupHref = `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=destination&utm_campaign=${destination.slug.en}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristTripLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero with full-bleed image */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-20 px-4 lg:px-8 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  {
                    label: locale === "fr" ? "Accueil" : "Home",
                    href: `/${locale}`,
                  },
                  {
                    label: locale === "fr" ? "Destinations" : "Destinations",
                    href: `/${locale}/destinations`,
                  },
                  { label: cityLabel },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-5">
                  {destination.hero.tag[loc]}
                </span>
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-[1.05] mb-5">
                  {cityLabel}
                  <br />
                  <span className="text-[#F6391A]">
                    {getUseCaseLabel(destination.useCase, loc).toLowerCase()}
                  </span>
                </h1>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/75 leading-relaxed mb-6 max-w-xl">
                  {destination.meta.description[loc]}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {destination.days} {locale === "fr" ? "jours" : "days"}
                  </span>
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {countryLabel}
                  </span>
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {currencySymbol}
                    {destination.budget.perPerson.low}–{currencySymbol}
                    {destination.budget.perPerson.high}{" "}
                    {locale === "fr" ? "/ pers." : "/ pp"}
                  </span>
                </div>

                <Link href={signupHref}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {locale === "fr"
                      ? "Reprendre ce voyage"
                      : "Fork this trip"}
                  </PulsatingButton>
                </Link>
                <p className="text-xs font-karla text-[#001E13]/50 mt-3">
                  {locale === "fr"
                    ? "Crée ton voyage à partir de cet itinéraire — gratuit, 30 secondes."
                    : "Start your own trip from this itinerary — free, 30 seconds."}
                </p>
              </div>

              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={destination.hero.image}
                  alt={destination.hero.imageAlt[loc]}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Intro */}
        <FadeIn>
          <section className="py-12 lg:py-16 px-4 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-5">
              {destination.intro[loc].map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </section>
        </FadeIn>

        {/* Itinerary */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-3">
                  {locale === "fr"
                    ? "Itinéraire jour par jour"
                    : "Day-by-day itinerary"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? `${destination.days} jours, du matin au soir. Pensé pour un groupe, mais flexible.`
                    : `${destination.days} days, morning to night. Built for a group, easy to bend.`}
                </p>
              </div>

              <div className="space-y-6">
                {destination.itinerary.map((day) => (
                  <article
                    key={day.day}
                    className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8"
                  >
                    <div className="flex items-baseline gap-4 mb-5">
                      <span className="font-londrina-solid text-3xl lg:text-4xl text-[#EEF899]">
                        {(locale === "fr" ? "J" : "D")}
                        {day.day}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5]">
                        {day.title[loc]}
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                      {(
                        [
                          { label: locale === "fr" ? "Matin" : "Morning", text: day.morning[loc] },
                          { label: locale === "fr" ? "Après-midi" : "Afternoon", text: day.afternoon[loc] },
                          { label: locale === "fr" ? "Soir" : "Evening", text: day.evening[loc] },
                        ] as const
                      ).map((slot) => (
                        <div
                          key={slot.label}
                          className="bg-[#FFFBF5]/5 rounded-xl p-4 lg:p-5 border border-[#FFFBF5]/5"
                        >
                          <span className="block text-[#EEF899] font-karla font-bold text-xs uppercase tracking-wide mb-2">
                            {slot.label}
                          </span>
                          <p className="text-[#FFFBF5]/80 font-karla text-sm leading-relaxed">
                            {slot.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* POIs grouped */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr"
                    ? "Les bonnes adresses"
                    : "Where to go"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Spots réels, vérifiés, repérés. Cliquez pour ouvrir dans Maps."
                    : "Real, vetted spots. Click any to open in Maps."}
                </p>
              </div>

              <div className="space-y-10">
                {Object.entries(poisByType).map(([type, pois]) => (
                  <div key={type}>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-5">
                      {poiTypeLabel(type as typeof pois[0]["type"], loc)}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      {pois.map((poi) => (
                        <a
                          key={poi.name}
                          href={poi.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white rounded-2xl p-5 lg:p-6 border border-[#001E13]/10 hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 block"
                        >
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h4 className="text-lg font-londrina-solid text-[#001E13] leading-tight">
                              {poi.name}
                            </h4>
                            <svg
                              className="w-4 h-4 text-[#001E13]/40 group-hover:text-[#F6391A] flex-shrink-0 mt-1 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </div>
                          <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                            {poi.description[loc]}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Budget */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr" ? "Budget par personne" : "Budget per person"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? `Estimation honnête au sol — ${destination.days} jours.`
                    : `Honest on-the-ground estimate — ${destination.days} days.`}
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 lg:p-10 border border-[#001E13]/10">
                <div className="flex items-baseline justify-between gap-4 pb-6 mb-6 border-b border-[#001E13]/10">
                  <span className="font-karla font-bold text-[#001E13] text-base lg:text-lg">
                    {locale === "fr" ? "Total estimé" : "Estimated total"}
                  </span>
                  <span className="font-londrina-solid text-3xl lg:text-4xl text-[#F6391A]">
                    {currencySymbol}
                    {destination.budget.perPerson.low}–{currencySymbol}
                    {destination.budget.perPerson.high}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {destination.budget.breakdown.map((item, i) => (
                    <li
                      key={i}
                      className="flex justify-between items-center font-karla text-[#001E13]/80 text-sm lg:text-base"
                    >
                      <span>{item.category[loc]}</span>
                      <span className="font-bold tabular-nums">
                        ~{currencySymbol}
                        {item.amount}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs lg:text-sm font-karla text-[#001E13]/60 leading-relaxed border-t border-[#001E13]/10 pt-5">
                  {destination.budget.note[loc]}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Packing + best season side by side */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-[#001E13]/10">
                <h2 className="text-2xl lg:text-3xl font-londrina-solid text-[#001E13] mb-5">
                  {locale === "fr" ? "À ne pas oublier" : "Packing essentials"}
                </h2>
                <ul className="space-y-3">
                  {destination.packing[loc].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 font-karla text-[#001E13]/80 text-sm lg:text-base"
                    >
                      <span className="text-[#F6391A] flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#EEF899] rounded-3xl p-8 border border-[#001E13]/10">
                <h2 className="text-2xl lg:text-3xl font-londrina-solid text-[#001E13] mb-5">
                  {locale === "fr" ? "Quand y aller" : "When to go"}
                </h2>
                <p className="font-karla text-[#001E13]/85 text-base lg:text-lg leading-relaxed">
                  {destination.bestSeason[loc]}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Related destinations */}
        {relatedDestinations.length > 0 && (
          <FadeIn>
            <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
                  {locale === "fr"
                    ? "D'autres destinations à explorer"
                    : "Other destinations to explore"}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedDestinations.map((rel) => (
                    <Link
                      key={rel.slug.en}
                      href={`/${locale}/destinations/${rel.slug[loc]}`}
                      className="group"
                    >
                      <article className="bg-white border border-[#001E13]/10 rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={rel.hero.image}
                            alt={rel.hero.imageAlt[loc]}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <div className="flex gap-2 mb-3 flex-wrap">
                            <span className="bg-[#EEF899] text-[#001E13] px-3 py-1 rounded-full text-xs font-karla font-bold">
                              {getUseCaseLabel(rel.useCase, loc)}
                            </span>
                            <span className="bg-[#001E13]/5 text-[#001E13] px-3 py-1 rounded-full text-xs font-karla">
                              {rel.days} {locale === "fr" ? "j" : "d"}
                            </span>
                          </div>
                          <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">
                            {rel.city[loc]}
                          </h3>
                          <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4 flex-1">
                            {rel.meta.description[loc]}
                          </p>
                          <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline mt-auto">
                            {locale === "fr"
                              ? "Voir l'itinéraire →"
                              : "See the itinerary →"}
                          </span>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>
        )}

        {/* Final CTA */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {locale === "fr"
                  ? `Pars à ${cityLabel} avec ta team`
                  : `Take ${cityLabel} on with your crew`}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {locale === "fr"
                  ? "Reprends cet itinéraire dans WePlanify, invite ton groupe, et bosse le voyage à plusieurs. Itinéraire partagé, sondages, budget commun — gratuit."
                  : "Fork this itinerary into WePlanify, invite the group, and plan the trip together. Shared itinerary, polls, shared budget — all free."}
              </p>
              <div className="flex justify-center">
                <Link href={signupHref}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {locale === "fr"
                      ? "Reprendre ce voyage — gratuit"
                      : "Fork this trip — free"}
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
