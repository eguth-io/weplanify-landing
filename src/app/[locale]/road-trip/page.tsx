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
import { setRequestLocale } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, "/road-trip");

  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Road Trip with Friends — Route Planner for Groups | WePlanify"
    : "Organiser un Road Trip entre Amis — Planificateur d'Itin\u00e9raire de Groupe | WePlanify";
  const description = isEn
    ? "Plan the ultimate road trip with your crew. WePlanify helps groups plan routes, vote on stops, split gas and hotel costs, and build a day-by-day itinerary together."
    : "Organisez le road trip ultime avec votre bande. WePlanify aide les groupes \u00e0 planifier les routes, voter sur les arr\u00eats, partager les frais d'essence et d'h\u00f4tel, et construire un itin\u00e9raire jour par jour ensemble.";
  return {
    ...metadata,
    title,
    description,
    openGraph: {
      ...metadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
    },
  };
}

const content = {
  en: {
    heroTag: "Road Trip, Your Way",
    heroTitle: "Plan a Road Trip\nWith Your Crew",
    heroDescription:
      "The open road, your best friends, and zero stress. WePlanify helps your group plan the perfect road trip \u2014 from route stops to gas money, everyone stays in the loop.",
    heroCta: "Start planning for free",
    painPointsTitle: "Road Trip Headaches",
    painPointsSubtitle:
      "A road trip with friends is the dream \u2014 until someone has to be the organizer.",
    painPoints: [
      {
        icon: "\ud83d\uddfa\ufe0f",
        title: "Route Arguments",
        description:
          "Everyone wants to stop at different places. Without a shared plan, you end up driving past the best spots or adding hours of detours.",
      },
      {
        icon: "\u26fd",
        title: "Gas & Cost Splitting",
        description:
          "Who\u2019s paying for gas? Who booked the motel? Tracking shared expenses across 5+ stops over several days gets messy fast.",
      },
      {
        icon: "\ud83d\udd50",
        title: "Timing Disasters",
        description:
          "Someone wants to spend 3 hours at every viewpoint while others want to keep driving. Without alignment, road trips turn into arguments.",
      },
      {
        icon: "\ud83c\udf92",
        title: "Car Space is Limited",
        description:
          "Five people, one trunk. Without coordinating who brings what, you end up with three portable speakers and no cooler.",
      },
    ],

    solutionTitle: "How WePlanify Makes Road Trips Easy",
    solutionSubtitle:
      "Everything your road trip crew needs to plan stops, split costs, and stay organized on the road.",
    solutions: [
      {
        title: "Collaborative Route Planning",
        description:
          "Build your road trip itinerary together. Add stops, plan overnight stays, and create a day-by-day schedule the whole car agrees on.",
        link: "/features/planning",
        linkText: "Learn about planning",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Vote on Every Stop",
        description:
          "National park or roadside diner? Scenic route or highway? Let everyone vote on stops and detours \u2014 no more driver-dictator energy.",
        link: "/features/polls",
        linkText: "Discover polls",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Split Gas & Expenses",
        description:
          "Track gas, food, tolls, accommodations, and everything in between. See who owes what in real time \u2014 settle up at the end, not at every stop.",
        link: "/features/budget",
        linkText: "Explore budget tools",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Shared Packing Lists",
        description:
          "Coordinate what each person brings for the car. Avoid duplicates, assign group items (cooler, aux cable, snacks), and make sure nothing critical is forgotten.",
        link: "/features/packing",
        linkText: "See packing lists",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Steps to Plan Your Road Trip",
    stepsSubtitle:
      "From \u2018let\u2019s do a road trip\u2019 to \u2018we\u2019re on the road\u2019 \u2014 in minutes.",
    steps: [
      {
        step: "1",
        title: "Create Your Trip",
        description:
          "Name your road trip, set start/end dates, and invite your crew with a simple link. Everyone joins instantly.",
      },
      {
        step: "2",
        title: "Plan the Route Together",
        description:
          "Add stops, vote on detours, build a day-by-day plan, and track your shared gas fund \u2014 all in one place.",
      },
      {
        step: "3",
        title: "Hit the Road",
        description:
          "Get coordinated packing lists for the car, finalize your route, and hit the open road with your crew.",
      },
    ],

    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "Can I plan multi-day road trips?",
        a: "Yes. WePlanify supports multi-day itineraries with different stops, overnights, and activities for each day. Perfect for cross-country road trips or weekend getaways.",
      },
      {
        q: "How does the expense splitting work for road trips?",
        a: "Add expenses as you go \u2014 gas, food, tolls, hotels. The shared budget tracker calculates who owes what automatically. Settle up at the end of the trip with a clear breakdown.",
      },
      {
        q: "Do I need to download an app?",
        a: "No download needed. WePlanify works directly in your browser on any device \u2014 phone, tablet, or computer. Perfect for checking the plan from the passenger seat.",
      },
    ],

    ctaTitle: "Your Next Road Trip Starts Here",
    ctaDescription:
      "Join thousands of road trip crews who plan their adventures with WePlanify. It\u2019s free, it\u2019s collaborative, and it keeps everyone on the same route.",
    ctaButton: "Start planning your road trip",
  },
  fr: {
    heroTag: "Road Trip, \u00c0 Votre Fa\u00e7on",
    heroTitle: "Organisez un Road Trip\nAvec Votre Bande",
    heroDescription:
      "La route ouverte, vos meilleurs amis, et z\u00e9ro stress. WePlanify aide votre groupe \u00e0 planifier le road trip parfait \u2014 des arr\u00eats aux frais d\u2019essence, tout le monde reste dans la boucle.",
    heroCta: "Commencer gratuitement",
    painPointsTitle: "Les Gal\u00e8res du Road Trip",
    painPointsSubtitle:
      "Un road trip entre amis, c\u2019est le r\u00eave \u2014 jusqu\u2019\u00e0 ce que quelqu\u2019un doive tout organiser.",
    painPoints: [
      {
        icon: "\ud83d\uddfa\ufe0f",
        title: "Disputes sur l\u2019Itin\u00e9raire",
        description:
          "Tout le monde veut s\u2019arr\u00eater \u00e0 des endroits diff\u00e9rents. Sans plan partag\u00e9, vous ratez les meilleurs spots ou ajoutez des heures de d\u00e9tour.",
      },
      {
        icon: "\u26fd",
        title: "Partage des Frais",
        description:
          "Qui paie l\u2019essence ? Qui a r\u00e9serv\u00e9 le motel ? Suivre les d\u00e9penses partag\u00e9es sur 5+ arr\u00eats pendant plusieurs jours, \u00e7a devient vite le bazar.",
      },
      {
        icon: "\ud83d\udd50",
        title: "Probl\u00e8mes de Timing",
        description:
          "L\u2019un veut passer 3 heures \u00e0 chaque point de vue pendant que les autres veulent continuer \u00e0 rouler. Sans alignement, le road trip tourne au clash.",
      },
      {
        icon: "\ud83c\udf92",
        title: "L\u2019Espace dans la Voiture est Limit\u00e9",
        description:
          "Cinq personnes, un coffre. Sans coordination sur qui apporte quoi, vous vous retrouvez avec trois enceintes portables et pas de glaci\u00e8re.",
      },
    ],

    solutionTitle: "Comment WePlanify Facilite les Road Trips",
    solutionSubtitle:
      "Tout ce dont votre \u00e9quipage a besoin pour planifier les arr\u00eats, partager les frais et rester organis\u00e9 sur la route.",
    solutions: [
      {
        title: "Planification d\u2019Itin\u00e9raire Collaborative",
        description:
          "Construisez votre itin\u00e9raire de road trip ensemble. Ajoutez des arr\u00eats, planifiez les nuits et cr\u00e9ez un programme jour par jour sur lequel toute la voiture s\u2019accorde.",
        link: "/features/planning",
        linkText: "D\u00e9couvrir la planification",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Votez sur Chaque Arr\u00eat",
        description:
          "Parc national ou resto de bord de route ? Route panoramique ou autoroute ? Laissez tout le monde voter sur les arr\u00eats et d\u00e9tours.",
        link: "/features/polls",
        linkText: "D\u00e9couvrir les sondages",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Partagez Essence & D\u00e9penses",
        description:
          "Suivez l\u2019essence, la nourriture, les p\u00e9ages, l\u2019h\u00e9bergement et tout le reste. Voyez qui doit quoi en temps r\u00e9el \u2014 r\u00e9glez \u00e0 la fin, pas \u00e0 chaque arr\u00eat.",
        link: "/features/budget",
        linkText: "Explorer le budget",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Listes de Bagages Partag\u00e9es",
        description:
          "Coordonnez ce que chaque personne apporte pour la voiture. \u00c9vitez les doublons, assignez les objets collectifs (glaci\u00e8re, c\u00e2ble aux, snacks) et n\u2019oubliez rien d\u2019essentiel.",
        link: "/features/packing",
        linkText: "Voir les listes",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 \u00c9tapes pour Organiser Votre Road Trip",
    stepsSubtitle:
      "De \u2018on fait un road trip\u2019 \u00e0 \u2018on est sur la route\u2019 \u2014 en quelques minutes.",
    steps: [
      {
        step: "1",
        title: "Cr\u00e9ez Votre Trip",
        description:
          "Nommez votre road trip, fixez les dates de d\u00e9part/arriv\u00e9e et invitez votre bande avec un simple lien. Tout le monde rejoint instantan\u00e9ment.",
      },
      {
        step: "2",
        title: "Planifiez l\u2019Itin\u00e9raire Ensemble",
        description:
          "Ajoutez des arr\u00eats, votez sur les d\u00e9tours, construisez un plan jour par jour et suivez votre cagnotte essence \u2014 le tout au m\u00eame endroit.",
      },
      {
        step: "3",
        title: "En Route",
        description:
          "Obtenez des listes de bagages coordonn\u00e9es pour la voiture, finalisez votre itin\u00e9raire et prenez la route avec votre bande.",
      },
    ],

    faqTitle: "Questions Fr\u00e9quemment Pos\u00e9es",
    faqItems: [
      {
        q: "Peut-on planifier des road trips de plusieurs jours ?",
        a: "Oui. WePlanify g\u00e8re les itin\u00e9raires multi-jours avec des arr\u00eats, des nuits et des activit\u00e9s diff\u00e9rentes chaque jour. Parfait pour les road trips cross-country ou les escapades de week-end.",
      },
      {
        q: "Comment fonctionne le partage des frais pour les road trips ?",
        a: "Ajoutez les d\u00e9penses au fur et \u00e0 mesure \u2014 essence, nourriture, p\u00e9ages, h\u00f4tels. Le suivi de budget partag\u00e9 calcule automatiquement qui doit quoi. R\u00e9glez \u00e0 la fin du voyage avec un r\u00e9capitulatif clair.",
      },
      {
        q: "Dois-je t\u00e9l\u00e9charger une application ?",
        a: "Aucun t\u00e9l\u00e9chargement n\u00e9cessaire. WePlanify fonctionne directement dans votre navigateur sur n\u2019importe quel appareil \u2014 t\u00e9l\u00e9phone, tablette ou ordinateur. Parfait pour consulter le plan depuis le si\u00e8ge passager.",
      },
    ],

    ctaTitle: "Votre Prochain Road Trip Commence Ici",
    ctaDescription:
      "Rejoignez des milliers d\u2019\u00e9quipages qui planifient leurs aventures avec WePlanify. C\u2019est gratuit, c\u2019est collaboratif, et \u00e7a garde tout le monde sur la m\u00eame route.",
    ctaButton: "Commencer \u00e0 planifier",
  },
};

export default async function RoadTripPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = locale === "fr" ? content.fr : content.en;

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
        name: locale === "fr" ? "Accueil" : "Home",
        item: `https://www.weplanify.com/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Road Trip",
        item: `https://www.weplanify.com/${locale}/road-trip`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[140px] pb-8 lg:pb-10 px-4 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                  { label: "Road Trip" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-[1536px] mx-auto">
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] bg-[#001E13]">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#001E13] via-[#001E13] to-[#0a3d2a] opacity-100" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#61DBD5]/10 to-transparent" />

              <div className="relative z-10 px-6 lg:px-16 xl:px-20 py-16 lg:py-24 xl:py-32 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                <div className="text-center lg:text-left lg:w-1/2">
                  <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
                    {t.heroTag}
                  </span>

                  <h1 className="text-[#FFFBF5] text-3xl lg:text-5xl xl:text-[56px] font-londrina-solid leading-tight mb-6 whitespace-pre-line">
                    {t.heroTitle}
                  </h1>

                  <p className="text-[#FFFBF5]/85 text-base lg:text-lg font-karla leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                    {t.heroDescription}
                  </p>

                  <div className="flex flex-col gap-2 items-center lg:items-start">
                    <Link href="https://app.weplanify.com/register">
                      <PulsatingButton className="font-karla font-bold">
                        {t.heroCta}
                      </PulsatingButton>
                    </Link>
                  </div>
                </div>

                {/* Floating UI cards animation */}
                <div className="hidden lg:block lg:w-1/2 relative">
                  <FloatingCards />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="pt-10 lg:pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t.painPointsTitle}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t.painPointsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {t.painPoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-[#FFFBF5] border border-[#001E13]/10 rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-3xl lg:text-4xl mb-4 block">
                    {point.icon}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                    {point.title}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-relaxed">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t.solutionTitle}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t.solutionSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {t.solutions.map((solution, index) => (
                <div
                  key={index}
                  className={`${solution.color} rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[240px]`}
                >
                  <div>
                    <h3
                      className={`text-xl lg:text-2xl font-londrina-solid ${solution.textColor} mb-3`}
                    >
                      <Link href={`/${locale}${solution.link}`} className={`${solution.textColor} font-londrina-solid no-underline hover:underline underline-offset-4`}>
                        {solution.title}
                      </Link>
                    </h3>
                    <p
                      className={`${solution.textColor} opacity-80 font-karla text-sm lg:text-base leading-relaxed mb-6`}
                    >
                      {solution.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={`/${locale}${solution.link}`}
                      className={`${solution.textColor} font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70 transition-opacity`}
                    >
                      {solution.linkText} &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t.stepsTitle}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t.stepsSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {t.steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F6391A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-[#FFFBF5] text-2xl lg:text-3xl font-londrina-solid">
                      {step.step}
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
              {t.faqTitle}
            </h2>
            <div className="space-y-6">
              {t.faqItems.map((item, i) => (
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

        {/* Discover More Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {locale === "fr" ? "D\u00e9couvrir aussi" : "Discover More"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Guide : Organiser un Voyage de Groupe" : "Guide: How to Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet \u00e9tape par \u00e9tape pour organiser un voyage de groupe r\u00e9ussi, de la premi\u00e8re id\u00e9e au dernier jour."
                      : "The complete step-by-step guide to planning a successful group trip, from first idea to last day."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide \u2192" : "Read the guide \u2192"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Voyage entre Amis" : "Plan a Trip with Friends"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Tout ce qu\u2019il faut pour organiser un voyage entre amis \u2014 itin\u00e9raires, sondages, budgets et plus encore."
                      : "Everything you need to coordinate a trip with your friend group \u2014 itineraries, polls, budgets, and more."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "En savoir plus \u2192" : "Read more \u2192"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Comparatif des Applications" : "App Comparison"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comparez WePlanify avec les autres applications de planification de voyage de groupe en 2026."
                      : "See how WePlanify compares to other group trip planning apps in 2026."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir le comparatif \u2192" : "View comparison \u2192"}
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
                {t.ctaTitle}
              </h2>
              <p className="text-[#FFFBF5]/85 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t.ctaDescription}
              </p>
              <div className="flex flex-col gap-2 items-center">
                <Link href="https://app.weplanify.com/register">
                  <PulsatingButton className="font-karla font-bold">
                    {t.ctaButton}
                  </PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer footerData={footerData} />
    </>
  );
}
