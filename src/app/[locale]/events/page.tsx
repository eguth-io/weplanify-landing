import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale } from "next-intl/server";
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

type EventEntry = {
  slug: string;
  emoji: string;
  title: { en: string; fr: string };
  date: { en: string; fr: string };
  location: { en: string; fr: string };
  description: { en: string; fr: string };
};

const events: EventEntry[] = [
  {
    slug: "world-cup-2026-trip-planner",
    emoji: "⚽",
    title: { en: "FIFA World Cup 2026", fr: "Coupe du Monde 2026" },
    date: { en: "Jun 11 – Jul 19, 2026", fr: "11 juin – 19 juillet 2026" },
    location: { en: "USA · Canada · Mexico", fr: "USA · Canada · Mexique" },
    description: {
      en: "16 host cities across three countries. Plan your multi-city route, split costs by category, and coordinate the fan group across borders.",
      fr: "16 villes hôtes sur trois pays. Planifie ton itinéraire multi-villes, partage les frais par catégorie et coordonne la team de fans à travers les frontières.",
    },
  },
  {
    slug: "champions-league-final-2026-psg-arsenal",
    emoji: "🏆",
    title: { en: "Champions League Final 2026", fr: "Finale Ligue des Champions 2026" },
    date: { en: "May 30, 2026", fr: "30 mai 2026" },
    location: { en: "Budapest, Hungary", fr: "Budapest, Hongrie" },
    description: {
      en: "The biggest club final of the year at the Puskás Aréna. Plan transport, hotel and pre-match meetup for the squad.",
      fr: "La plus grande finale de club de l'année à la Puskás Aréna. Plan transport, hôtel et apéro pré-match pour la team.",
    },
  },
  {
    slug: "hellfest-2026-trip-planner",
    emoji: "🤘",
    title: { en: "Hellfest 2026", fr: "Hellfest 2026" },
    date: { en: "Jun 19 – 22, 2026", fr: "19 – 22 juin 2026" },
    location: { en: "Clisson, France", fr: "Clisson, France" },
    description: {
      en: "Four days of metal in Clisson. Camping logistics, carpool, and the lineup-to-stage spreadsheet — all in one shared plan.",
      fr: "Quatre jours de métal à Clisson. Logistique camping, covoiturage et le tableur lineup-to-stage — tout dans un plan partagé.",
    },
  },
  {
    slug: "tomorrowland-2026-trip-planner",
    emoji: "🎶",
    title: { en: "Tomorrowland 2026", fr: "Tomorrowland 2026" },
    date: { en: "Jul 17 – 26, 2026", fr: "17 – 26 juillet 2026" },
    location: { en: "Boom, Belgium", fr: "Boom, Belgique" },
    description: {
      en: "DreamVille tickets, festival passes, train logistics. Coordinate the squad and the shared kitty so nobody chases anyone for €40 the week after.",
      fr: "Billets DreamVille, pass festival, logistique train. Coordonne la team et la cagnotte pour que personne ne court après 40 € la semaine d'après.",
    },
  },
  {
    slug: "solar-eclipse-2026-trip-planner",
    emoji: "🌑",
    title: { en: "Total Solar Eclipse — Aug 12, 2026", fr: "Éclipse Solaire Totale — 12 août 2026" },
    date: { en: "August 12, 2026", fr: "12 août 2026" },
    location: { en: "Iceland · Spain · Greenland", fr: "Islande · Espagne · Groenland" },
    description: {
      en: "The once-a-decade trip to totality. Best viewing spots, weather contingencies, accommodation that gets booked out 18 months ahead.",
      fr: "Le voyage rare vers la totalité. Meilleurs spots, plans de secours météo, hébergement qui se réserve 18 mois à l'avance.",
    },
  },
  {
    slug: "ultra-europe-2026-trip-planner",
    emoji: "🎉",
    title: { en: "Ultra Europe 2026", fr: "Ultra Europe 2026" },
    date: { en: "Jul 10 – 12, 2026", fr: "10 – 12 juillet 2026" },
    location: { en: "Split, Croatia", fr: "Split, Croatie" },
    description: {
      en: "Three days on the Adriatic. Hotel vs Airbnb, festival pass logistics, and side trips around Dalmatia — for the squad that wants more than just the main stage.",
      fr: "Trois jours sur l'Adriatique. Hôtel vs Airbnb, logistique pass festival et escapades autour de la Dalmatie — pour la team qui veut plus que la mainstage.",
    },
  },
];

const content = {
  en: {
    meta: {
      title: "2026 Event Trip Planners — Free, for Groups | WePlanify",
      description:
        "Plan your 2026 event trip with WePlanify. Dedicated free planners for the FIFA World Cup, Champions League Final, Tomorrowland, Hellfest, Ultra Europe and the total solar eclipse — built for groups of fans who travel together.",
    },
    hero: {
      tag: "2026 Event Trip Planners",
      title: "Plan your 2026\nevent trip — together",
      description:
        "Six dedicated planners for the year's biggest events. Pick yours, build a shared itinerary, split costs and coordinate the squad — all free.",
      cta: "Start planning for free",
    },
    intro: {
      title: "One planner per event, built for groups",
      body:
        "Big events bring big logistics: matches across host cities, festival passes for a 12-person crew, camping permits, last-minute date clashes. Each of our 2026 event pages is built for that specific event — host-city tables, real schedules, the gotchas only fans hit. Pick yours below.",
    },
    cardCta: "Open the planner →",
    cta: {
      title: "Not heading to one of these? Plan your own group trip.",
      description:
        "WePlanify works for any group trip — bachelorette, birthday, family, road trip, anything else. Same shared kitty, itinerary, polls and packing list.",
      button: "Start a free trip",
    },
  },
  fr: {
    meta: {
      title: "Planificateurs Voyage Événement 2026 — Gratuit, pour les Groupes | WePlanify",
      description:
        "Planifie ton voyage événement 2026 avec WePlanify. Planificateurs gratuits dédiés pour la Coupe du Monde FIFA, la finale Ligue des Champions, Tomorrowland, Hellfest, Ultra Europe et l'éclipse solaire totale — conçus pour les groupes de fans qui voyagent ensemble.",
    },
    hero: {
      tag: "Planificateurs Événements 2026",
      title: "Planifie ton voyage\névénement 2026 — à plusieurs",
      description:
        "Six planificateurs dédiés pour les plus gros événements de l'année. Choisis le tien, construis un itinéraire partagé, splitte les frais et coordonne la team — c'est gratuit.",
      cta: "Commencer gratuitement",
    },
    intro: {
      title: "Un planificateur par événement, pensé groupe",
      body:
        "Les gros événements c'est de la grosse logistique : matchs entre villes hôtes, pass festival pour 12, permis camping, dates qui clashent au dernier moment. Chacune de nos pages 2026 est construite pour son événement — tableaux des villes hôtes, vrais calendriers, les pièges que seuls les fans connaissent. Choisis le tien ci-dessous.",
    },
    cardCta: "Ouvrir le planificateur →",
    cta: {
      title: "Tu ne pars pas pour un de ces événements ? Planifie ton propre voyage de groupe.",
      description:
        "WePlanify marche pour n'importe quel voyage de groupe — EVJF, anniversaire, famille, road trip, autre. Même cagnotte partagée, itinéraire, sondages et liste de bagages.",
      button: "Commencer un voyage gratuit",
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseMetadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = content[locale as keyof typeof content] || content.en;
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...baseMetadata,
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      ...baseMetadata.openGraph,
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      url: currentUrl,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t.meta.title,
      description: t.meta.description,
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
  const lang: "en" | "fr" = locale === "fr" ? "fr" : "en";
  const t = content[lang];

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
        name: lang === "fr" ? "Accueil" : "Home",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: lang === "fr" ? "Événements 2026" : "2026 Events",
        item: `${SITE_URL}/${locale}${PATHNAME}`,
      },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: events.map((event, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: event.title[lang],
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
                  { label: lang === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                  { label: lang === "fr" ? "Événements 2026" : "2026 Events" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center">
            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-4 whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.hero.description}
            </p>
            <div className="flex justify-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t.hero.cta}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="px-4 lg:px-8 pb-12 lg:pb-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
              {t.intro.title}
            </h2>
            <p className="text-[#001E13]/75 text-base lg:text-lg font-karla leading-relaxed">
              {t.intro.body}
            </p>
          </div>
        </section>

        {/* Events grid */}
        <section className="px-4 lg:px-8 pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/${locale}/${event.slug}`}
                    className="group flex h-full flex-col rounded-2xl lg:rounded-3xl border border-[#001E13]/10 bg-white p-6 lg:p-7 hover:shadow-lg hover:border-[#F6391A]/30 transition-all"
                  >
                    <span className="text-3xl mb-4 block" aria-hidden="true">
                      {event.emoji}
                    </span>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-2">
                      {event.title[lang]}
                    </h3>
                    <div className="font-nanum-pen text-[#F6391A] text-base lg:text-lg leading-none mb-3">
                      {event.date[lang]} · {event.location[lang]}
                    </div>
                    <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-relaxed mb-5 flex-1">
                      {event.description[lang]}
                    </p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline underline-offset-4">
                      {t.cardCta}
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
                {t.cta.title}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t.cta.description}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                  <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                    {t.cta.button}
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
