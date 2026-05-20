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
  countryGuides,
  findGuideByLocalizedSlug,
  continentLabel,
  specialtyCategoryLabel,
  type Locale,
} from "@/lib/travel-guides/data";

const SITE_URL = "https://www.weplanify.com";

type Props = {
  params: Promise<{ locale: string; country: string }>;
};

export function generateStaticParams() {
  const params: Array<{ locale: string; country: string }> = [];
  for (const g of countryGuides) {
    params.push({ locale: "en", country: g.slug.en });
    params.push({ locale: "fr", country: g.slug.fr });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, country } = await params;
  const loc: Locale = locale === "fr" ? "fr" : "en";
  const guide = findGuideByLocalizedSlug(country, loc);
  if (!guide) return {};

  const baseMetadata = await generateMetadataFromSanity(
    locale,
    `/travel-guides/${country}`
  );
  const title = guide.meta.title[loc];
  const description = guide.meta.description[loc];
  const currentUrl = `${SITE_URL}/${locale}/travel-guides/${country}`;

  const enUrl = `${SITE_URL}/en/travel-guides/${guide.slug.en}`;
  const frUrl = `${SITE_URL}/fr/travel-guides/${guide.slug.fr}`;

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
          url: guide.hero.image,
          width: 1600,
          height: 900,
          alt: guide.hero.imageAlt[loc],
        },
      ],
    },
    twitter: {
      ...baseMetadata.twitter,
      title,
      description,
      images: [guide.hero.image],
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

export default async function TravelGuidePage({ params }: Props) {
  const { locale, country } = await params;
  setRequestLocale(locale);

  const loc: Locale = locale === "fr" ? "fr" : "en";
  const guide = findGuideByLocalizedSlug(country, loc);
  if (!guide) notFound();

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

  const currentUrl = `${SITE_URL}/${locale}/travel-guides/${country}`;
  const countryLabel = guide.country[loc];

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
        name: locale === "fr" ? "Guides voyage" : "Travel guides",
        item: `${SITE_URL}/${locale}/travel-guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: countryLabel,
        item: currentUrl,
      },
    ],
  };

  const touristDestinationLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    name: countryLabel,
    description: guide.meta.description[loc],
    image: guide.hero.image,
    touristType:
      locale === "fr"
        ? "Voyageur loisirs"
        : "Leisure traveler",
    includesAttraction: guide.mustSee.map((poi) => ({
      "@type": "TouristAttraction",
      name: poi.name,
      description: poi.description[loc],
      image: poi.image,
    })),
    mainEntityOfPage: { "@type": "WebPage", "@id": currentUrl },
  };

  const signupHref = `https://app.weplanify.com/${locale}/register?template=${guide.slug.en}&utm_source=landing&utm_medium=travel-guide&utm_campaign=${guide.slug.en}`;

  const currencyDisplay =
    guide.budget.currency === "USD" ? "$" : "€";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(touristDestinationLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
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
                    label: locale === "fr" ? "Guides voyage" : "Travel guides",
                    href: `/${locale}/travel-guides`,
                  },
                  { label: countryLabel },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-5">
                  {guide.hero.tag[loc]}
                </span>
                <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-[1.05] mb-5">
                  {countryLabel}
                  <br />
                  <span className="text-[#F6391A]">
                    {locale === "fr" ? "guide voyage" : "travel guide"}
                  </span>
                </h1>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/75 leading-relaxed mb-6 max-w-xl">
                  {guide.meta.description[loc]}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {continentLabel(guide.continent, loc)}
                  </span>
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {guide.quickFacts.currency.code}
                  </span>
                  <span className="bg-white border border-[#001E13]/10 text-[#001E13] px-4 py-1.5 rounded-full text-sm font-karla">
                    {currencyDisplay}
                    {guide.budget.tiers[0].perDay}–{currencyDisplay}
                    {guide.budget.tiers[guide.budget.tiers.length - 1].perDay}
                    {locale === "fr" ? " /jour" : " /day"}
                  </span>
                </div>

                <Link href={signupHref}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {locale === "fr"
                      ? "Planifier mon voyage"
                      : "Plan my trip"}
                  </PulsatingButton>
                </Link>
                <p className="text-xs font-karla text-[#001E13]/50 mt-3">
                  {locale === "fr"
                    ? "Crée ton itinéraire avec ton groupe — gratuit, 30 secondes."
                    : "Build your itinerary with your group — free, 30 seconds."}
                </p>
              </div>

              <div className="relative aspect-[4/5] lg:aspect-[5/6] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src={guide.hero.image}
                  alt={guide.hero.imageAlt[loc]}
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
              {guide.intro[loc].map((p, i) => (
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

        {/* Quick facts */}
        <FadeIn>
          <section className="py-12 lg:py-16 px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
                {locale === "fr" ? "L'essentiel" : "Quick facts"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
                {[
                  {
                    label: locale === "fr" ? "Capitale" : "Capital",
                    value: guide.quickFacts.capital[loc],
                  },
                  {
                    label: locale === "fr" ? "Langue" : "Language",
                    value: guide.quickFacts.language[loc],
                  },
                  {
                    label: locale === "fr" ? "Monnaie" : "Currency",
                    value: `${guide.quickFacts.currency.code} ${guide.quickFacts.currency.symbol}`,
                  },
                  {
                    label: locale === "fr" ? "Fuseau" : "Timezone",
                    value: guide.quickFacts.timezone,
                  },
                  {
                    label: locale === "fr" ? "Prise" : "Plug",
                    value: guide.quickFacts.plug,
                  },
                  {
                    label: locale === "fr" ? "Conduite" : "Driving",
                    value:
                      guide.quickFacts.driveSide === "left"
                        ? locale === "fr"
                          ? "À gauche"
                          : "Left"
                        : locale === "fr"
                          ? "À droite"
                          : "Right",
                  },
                ].map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-4 lg:p-5"
                  >
                    <span className="block text-xs font-karla font-bold text-[#001E13]/50 uppercase tracking-wide mb-1.5">
                      {fact.label}
                    </span>
                    <span className="block text-sm lg:text-base font-karla text-[#001E13] font-bold leading-tight">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-[#EEF899] border border-[#001E13]/10 rounded-2xl p-5 lg:p-6 max-w-3xl mx-auto">
                <span className="block text-xs font-karla font-bold text-[#001E13]/60 uppercase tracking-wide mb-2">
                  {locale === "fr" ? "Visa" : "Visa"}
                </span>
                <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed">
                  {guide.quickFacts.visa[loc]}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Best season */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-3">
                  {locale === "fr" ? "Quand y aller" : "When to go"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Trois fenêtres à connaître : la meilleure, l'intermédiaire, celle à éviter."
                    : "Three windows to know: best, shoulder, and the one to avoid."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {[
                  {
                    season: guide.bestSeason.best,
                    tone: "best" as const,
                    label: locale === "fr" ? "Meilleur moment" : "Best window",
                  },
                  {
                    season: guide.bestSeason.shoulder,
                    tone: "shoulder" as const,
                    label: locale === "fr" ? "Saison intermédiaire" : "Shoulder",
                  },
                  {
                    season: guide.bestSeason.avoid,
                    tone: "avoid" as const,
                    label: locale === "fr" ? "À éviter" : "Avoid",
                  },
                ].map(({ season, tone, label }) => (
                  <div
                    key={label}
                    className={`rounded-3xl p-6 lg:p-7 border ${
                      tone === "best"
                        ? "bg-[#EEF899] border-[#EEF899]"
                        : tone === "shoulder"
                          ? "bg-[#FFFBF5]/5 border-[#FFFBF5]/15"
                          : "bg-[#F6391A]/15 border-[#F6391A]/30"
                    }`}
                  >
                    <span
                      className={`block text-xs font-karla font-bold uppercase tracking-wide mb-2 ${
                        tone === "best"
                          ? "text-[#001E13]/70"
                          : tone === "shoulder"
                            ? "text-[#EEF899]"
                            : "text-[#F6391A]"
                      }`}
                    >
                      {label}
                    </span>
                    <h3
                      className={`text-lg lg:text-xl font-londrina-solid mb-3 leading-tight ${
                        tone === "best"
                          ? "text-[#001E13]"
                          : "text-[#FFFBF5]"
                      }`}
                    >
                      {season.months[loc]}
                    </h3>
                    <p
                      className={`font-karla text-sm lg:text-base leading-relaxed ${
                        tone === "best"
                          ? "text-[#001E13]/80"
                          : "text-[#FFFBF5]/80"
                      }`}
                    >
                      {season.description[loc]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Must-see */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr"
                    ? "Les incontournables"
                    : "Must-see places"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Les lieux qui justifient le voyage. Cliquez pour ouvrir dans Maps."
                    : "Spots that justify the trip on their own. Tap to open in Maps."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {guide.mustSee.map((poi) => (
                  <a
                    key={poi.name}
                    href={poi.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white rounded-3xl overflow-hidden border border-[#001E13]/10 hover:shadow-lg hover:border-[#F6391A]/30 transition-all duration-300 block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={poi.image}
                        alt={poi.imageAlt[loc]}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 lg:p-6">
                      <span className="block text-xs font-karla font-bold text-[#F6391A] uppercase tracking-wide mb-1.5">
                        {poi.region[loc]}
                      </span>
                      <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] leading-tight mb-2">
                        {poi.name}
                      </h3>
                      <p className="font-karla text-sm lg:text-base text-[#001E13]/70 leading-relaxed">
                        {poi.description[loc]}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Specialties */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr"
                    ? "Spécialités à goûter"
                    : "Specialties worth trying"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Cuisine, boissons et expériences que le pays fait mieux que personne."
                    : "Food, drinks, and experiences this country does better than anywhere else."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {guide.specialties.map((s) => (
                  <article
                    key={s.name.en}
                    className="bg-white rounded-3xl overflow-hidden border border-[#001E13]/10"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={s.image}
                        alt={s.imageAlt[loc]}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 bg-[#001E13]/85 backdrop-blur-sm text-[#FFFBF5] px-3 py-1 rounded-full text-xs font-karla font-bold">
                        {specialtyCategoryLabel(s.category, loc)}
                      </span>
                    </div>
                    <div className="p-5 lg:p-6">
                      <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] leading-tight mb-2">
                        {s.name[loc]}
                      </h3>
                      <p className="font-karla text-sm lg:text-base text-[#001E13]/70 leading-relaxed">
                        {s.description[loc]}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Regions */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr"
                    ? "Les régions à connaître"
                    : "Regions to know"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Pour cadrer votre itinéraire selon le temps disponible et l'envie."
                    : "To frame your trip by what you have time for and what you're after."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {guide.regions.map((r) => (
                  <article
                    key={r.name.en}
                    className="bg-white rounded-3xl p-6 lg:p-7 border border-[#001E13]/10"
                  >
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] leading-tight mb-2">
                      {r.name[loc]}
                    </h3>
                    <p className="font-karla text-xs lg:text-sm text-[#F6391A] font-bold mb-3">
                      {r.highlights[loc]}
                    </p>
                    <p className="font-karla text-sm lg:text-base text-[#001E13]/75 leading-relaxed">
                      {r.description[loc]}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Itineraries */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-3">
                  {locale === "fr"
                    ? "Itinéraires types"
                    : "Suggested itineraries"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Trois formats selon le temps disponible. À forker dans WePlanify."
                    : "Three lengths, depending on time. Fork any of them into WePlanify."}
                </p>
              </div>

              <div className="space-y-6">
                {guide.itineraries.map((it) => (
                  <article
                    key={it.days}
                    className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8"
                  >
                    <div className="flex items-baseline gap-4 mb-4 flex-wrap">
                      <span className="font-londrina-solid text-3xl lg:text-4xl text-[#EEF899]">
                        {it.days}
                        {locale === "fr" ? "j" : "d"}
                      </span>
                      <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5]">
                        {it.title[loc]}
                      </h3>
                    </div>
                    <p className="font-karla text-[#FFFBF5]/80 text-sm lg:text-base mb-5 leading-relaxed">
                      {it.summary[loc]}
                    </p>
                    <ul className="space-y-2">
                      {it.stops[loc].map((stop, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-karla text-[#FFFBF5]/85 text-sm lg:text-base leading-relaxed"
                        >
                          <span className="text-[#EEF899] flex-shrink-0 mt-0.5">
                            →
                          </span>
                          <span>{stop}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Budget */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr" ? "Budget par jour" : "Daily budget"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Par personne, hors vols. Trois niveaux de confort."
                    : "Per person, excluding flights. Three comfort tiers."}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-6">
                {guide.budget.tiers.map((tier, i) => (
                  <div
                    key={tier.label.en}
                    className={`rounded-3xl p-6 lg:p-7 border ${
                      i === 1
                        ? "bg-[#F6391A] border-[#F6391A] text-[#FFFBF5]"
                        : "bg-white border-[#001E13]/10 text-[#001E13]"
                    }`}
                  >
                    <span
                      className={`block text-xs font-karla font-bold uppercase tracking-wide mb-2 ${
                        i === 1 ? "text-[#FFFBF5]/80" : "text-[#001E13]/50"
                      }`}
                    >
                      {tier.label[loc]}
                    </span>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="font-londrina-solid text-3xl lg:text-4xl">
                        {currencyDisplay}
                        {tier.perDay}
                      </span>
                      <span
                        className={`font-karla text-sm ${
                          i === 1 ? "text-[#FFFBF5]/70" : "text-[#001E13]/50"
                        }`}
                      >
                        {locale === "fr" ? "/jour" : "/day"}
                      </span>
                    </div>
                    <p
                      className={`font-karla text-sm lg:text-base leading-relaxed ${
                        i === 1 ? "text-[#FFFBF5]/90" : "text-[#001E13]/75"
                      }`}
                    >
                      {tier.description[loc]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-[#EEF899] border border-[#001E13]/10 rounded-2xl p-5 lg:p-6">
                <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed">
                  {guide.budget.note[loc]}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Tips do/don't */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-3">
                  {locale === "fr"
                    ? "Codes culturels"
                    : "Cultural do's & don'ts"}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {locale === "fr"
                    ? "Les petits gestes qui font la différence — et ceux qui mettent mal à l'aise."
                    : "Small moves that matter — and the ones that make everyone uncomfortable."}
                </p>
              </div>

              <ul className="space-y-3">
                {guide.tips.map((tip, i) => (
                  <li
                    key={i}
                    className={`flex items-start gap-4 rounded-2xl p-5 lg:p-6 border ${
                      tip.do
                        ? "bg-white border-[#001E13]/10"
                        : "bg-[#F6391A]/5 border-[#F6391A]/20"
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-karla font-bold text-sm ${
                        tip.do
                          ? "bg-[#EEF899] text-[#001E13]"
                          : "bg-[#F6391A] text-[#FFFBF5]"
                      }`}
                    >
                      {tip.do ? "✓" : "✗"}
                    </span>
                    <p className="font-karla text-[#001E13]/85 text-sm lg:text-base leading-relaxed pt-0.5">
                      {tip.text[loc]}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeIn>

        {/* Final CTA */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {locale === "fr"
                  ? `Planifie ton voyage au ${countryLabel} avec ta team`
                  : `Plan your ${countryLabel} trip with your crew`}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {locale === "fr"
                  ? "Importe cet itinéraire dans WePlanify, invite ton groupe, et organisez le voyage ensemble. Carte partagée, sondages, budget commun — gratuit."
                  : "Bring this guide into WePlanify, invite the group, and build the trip together. Shared map, polls, shared budget — all free."}
              </p>
              <div className="flex justify-center">
                <Link href={signupHref}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {locale === "fr"
                      ? "Commencer — gratuit"
                      : "Start planning — free"}
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
