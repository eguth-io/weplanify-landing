import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/events";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Structural (non-translatable) event data; localized copy lives in messages
// and is merged by index via t.raw("events").
const eventMeta = [
  { slug: "world-cup-2026-trip-planner", emoji: "⚽" },
  { slug: "champions-league-final-2026-psg-arsenal", emoji: "🏆" },
  { slug: "hellfest-2026-trip-planner", emoji: "🤘" },
  { slug: "tomorrowland-2026-trip-planner", emoji: "🎶" },
  { slug: "solar-eclipse-2026-trip-planner", emoji: "🌑" },
  { slug: "ultra-europe-2026-trip-planner", emoji: "🎉" },
];

type EventCopy = {
  title: string;
  date: string;
  location: string;
  description: string;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseMetadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "eventsIndex" });
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
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

export default async function EventsHub({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("eventsIndex");
  const eventCopy = t.raw("events") as EventCopy[];

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null,
  ] = await Promise.all([
    sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
    sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
    sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
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
        name: t("breadcrumb.events"),
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: eventMeta.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: eventCopy[i].title,
      url: `${SITE_URL}/${locale}/${event.slug}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.events") },
                ]}
              />
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
              {t("hero.tag")}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-4 whitespace-pre-line">
              {t("hero.title")}
            </h1>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t("hero.description")}
            </p>
            <div className="flex justify-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t("hero.cta")}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 lg:px-8 pb-12 lg:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
              {t("intro.title")}
            </h2>
            <p className="text-[#001E13]/75 text-base lg:text-lg font-karla leading-relaxed">
              {t("intro.body")}
            </p>
          </div>
        </section>

        {/* Events grid */}
        <section className="px-4 lg:px-8 pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventMeta.map((event, i) => (
                <li key={event.slug}>
                  <Link
                    href={`/${locale}/${event.slug}`}
                    className="group flex h-full flex-col rounded-2xl lg:rounded-3xl border border-[#001E13]/10 bg-white p-6 lg:p-7 hover:shadow-lg hover:border-[#F6391A]/30 transition-all"
                  >
                    <span className="text-3xl mb-4 block" aria-hidden="true">
                      {event.emoji}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-2">
                      {eventCopy[i].title}
                    </h3>
                    <div className="font-nanum-pen text-[#F6391A] text-base lg:text-lg leading-none mb-3">
                      {eventCopy[i].date} · {eventCopy[i].location}
                    </div>
                    <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-relaxed mb-5 flex-1">
                      {eventCopy[i].description}
                    </p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline underline-offset-4">
                      {t("cardCta")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
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
