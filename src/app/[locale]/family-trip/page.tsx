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
  const metadata = await generateMetadataFromSanity(locale, "/family-trip");

  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Family Trip — Stress-Free Family Vacation Planner | WePlanify"
    : "Organiser un Voyage en Famille — Planificateur de Vacances Familiales | WePlanify";
  const description = isEn
    ? "Plan your next family trip with ease. WePlanify helps families coordinate schedules, manage budgets, vote on destinations, and keep everyone — kids included — on the same page."
    : "Organisez votre prochain voyage en famille sans stress. WePlanify aide les familles à coordonner les emplois du temps, gérer le budget, voter pour les destinations et garder tout le monde sur la même page.";
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
    heroTag: "Family Travel, Simplified",
    heroTitle: "Plan a Family Trip\nEveryone Will Love",
    heroDescription:
      "From grandparents to toddlers, family trips mean different needs, different budgets, and different ideas of fun. WePlanify brings everyone together in one place to plan a vacation the whole family will enjoy.",
    heroCta: "Start planning for free",
    painPointsTitle: "Family Trip Struggles",
    painPointsSubtitle:
      "Organizing a family vacation sounds fun — until you try to make everyone happy at once.",
    painPoints: [
      {
        icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
        title: "Too Many Opinions",
        description:
          "Dad wants hiking, Mom wants the beach, the kids want a water park. Finding common ground across generations feels impossible.",
      },
      {
        icon: "\u{1F4B3}",
        title: "Budget Juggling",
        description:
          "Between flights, hotels, activities, and meals for the whole family, costs add up fast. Nobody wants to be the one tracking every expense.",
      },
      {
        icon: "\u{1F4C5}",
        title: "Schedule Chaos",
        description:
          "Coordinating school holidays, work PTO, and grandparent availability across multiple households is a puzzle in itself.",
      },
      {
        icon: "\u{1F9F3}",
        title: "Packing for Everyone",
        description:
          "Diapers, sunscreen, chargers, medications — packing for a family means managing everyone's needs without forgetting essentials.",
      },
    ],

    solutionTitle: "How WePlanify Makes Family Trips Easy",
    solutionSubtitle:
      "Everything your family needs to plan, agree on, and organize your next vacation — all in one app.",
    solutions: [
      {
        title: "Collaborative Itinerary",
        description:
          "Build a day-by-day plan that balances adult activities with kid-friendly fun. Everyone can suggest ideas, and the whole family sees the final plan.",
        link: "/features/planning",
        linkText: "Learn about planning",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Family Polls",
        description:
          "Beach or mountains? Camping or hotel? Let every family member vote — even the kids. Fair decisions, no arguments.",
        link: "/features/polls",
        linkText: "Discover polls",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Shared Family Budget",
        description:
          "Track expenses across the whole trip. Split costs between households, keep tabs on who paid what, and avoid money awkwardness at Thanksgiving.",
        link: "/features/budget",
        linkText: "Explore budget tools",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Smart Packing Lists",
        description:
          "AI-generated packing lists adapted to your destination, weather, and family members' ages. Share with the family so nothing gets forgotten.",
        link: "/features/packing",
        linkText: "See packing lists",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Steps to Plan Your Family Vacation",
    stepsSubtitle:
      "From first idea to packed bags in minutes — not months.",
    steps: [
      {
        step: "1",
        title: "Create Your Trip",
        description:
          "Name your trip, set the dates, and invite family members with a simple link. Everyone joins instantly — even Grandma.",
      },
      {
        step: "2",
        title: "Plan Together",
        description:
          "Vote on destinations, build your itinerary, track your family budget, and assign packing lists — all in one place.",
      },
      {
        step: "3",
        title: "Pack & Go",
        description:
          "Get personalized packing lists for each family member, finalize your plans, and head out for an unforgettable family adventure.",
      },
    ],

    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "Is WePlanify good for families with kids?",
        a: "Absolutely. WePlanify is designed for groups of all kinds — including families with children. The voting feature makes it fun for kids to participate, and the shared packing lists ensure nothing gets forgotten.",
      },
      {
        q: "Can different households share costs?",
        a: "Yes. The shared budget tracker lets you split costs between multiple households. Track who paid for what and settle up easily after the trip.",
      },
      {
        q: "Do I need to download an app?",
        a: "No download needed. WePlanify works directly in your browser on any device — phone, tablet, or computer. Just open the link and start planning.",
      },
    ],

    ctaTitle: "Your Next Family Adventure Starts Here",
    ctaDescription:
      "Join thousands of families who plan their vacations with WePlanify. It's free, it's easy, and it keeps everyone happy.",
    ctaButton: "Start planning your trip",
  },
  fr: {
    heroTag: "Voyage en Famille, Simplifi\u00e9",
    heroTitle: "Organisez un Voyage en Famille\nQue Tout le Monde Adorera",
    heroDescription:
      "Des grands-parents aux tout-petits, un voyage en famille signifie des besoins diff\u00e9rents, des budgets diff\u00e9rents et des id\u00e9es diff\u00e9rentes de ce qui est fun. WePlanify r\u00e9unit tout le monde pour planifier des vacances que toute la famille appr\u00e9ciera.",
    heroCta: "Commencer gratuitement",
    painPointsTitle: "Les Gal\u00e8res du Voyage en Famille",
    painPointsSubtitle:
      "Organiser des vacances en famille, \u00e7a semble amusant — jusqu'\u00e0 ce qu'il faille satisfaire tout le monde en m\u00eame temps.",
    painPoints: [
      {
        icon: "\u{1F468}\u200D\u{1F469}\u200D\u{1F467}\u200D\u{1F466}",
        title: "Trop d'Avis Diff\u00e9rents",
        description:
          "Papa veut de la rando, Maman veut la plage, les enfants veulent un parc aquatique. Trouver un terrain d'entente entre g\u00e9n\u00e9rations semble impossible.",
      },
      {
        icon: "\u{1F4B3}",
        title: "Budget \u00e0 G\u00e9rer",
        description:
          "Entre les vols, l'h\u00e9bergement, les activit\u00e9s et les repas pour toute la famille, les co\u00fbts explosent vite. Personne ne veut \u00eatre celui qui suit chaque d\u00e9pense.",
      },
      {
        icon: "\u{1F4C5}",
        title: "Calendriers Incompatibles",
        description:
          "Coordonner les vacances scolaires, les cong\u00e9s et la disponibilit\u00e9 des grands-parents entre plusieurs foyers est un casse-t\u00eate en soi.",
      },
      {
        icon: "\u{1F9F3}",
        title: "Bagages pour Tout le Monde",
        description:
          "Couches, cr\u00e8me solaire, chargeurs, m\u00e9dicaments — faire les valises pour une famille signifie g\u00e9rer les besoins de chacun sans rien oublier.",
      },
    ],

    solutionTitle: "Comment WePlanify Facilite les Voyages en Famille",
    solutionSubtitle:
      "Tout ce dont votre famille a besoin pour planifier, d\u00e9cider et organiser vos prochaines vacances — dans une seule application.",
    solutions: [
      {
        title: "Itin\u00e9raire Collaboratif",
        description:
          "Construisez un programme jour par jour qui \u00e9quilibre activit\u00e9s adultes et sorties adapt\u00e9es aux enfants. Chacun peut proposer des id\u00e9es et toute la famille voit le plan final.",
        link: "/features/planning",
        linkText: "D\u00e9couvrir la planification",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Sondages Familiaux",
        description:
          "Plage ou montagne ? Camping ou h\u00f4tel ? Laissez chaque membre de la famille voter — m\u00eame les enfants. Des d\u00e9cisions justes, sans disputes.",
        link: "/features/polls",
        linkText: "D\u00e9couvrir les sondages",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Budget Familial Partag\u00e9",
        description:
          "Suivez les d\u00e9penses sur tout le voyage. Partagez les co\u00fbts entre foyers, gardez une trace de qui a pay\u00e9 quoi et \u00e9vitez les situations g\u00eanantes.",
        link: "/features/budget",
        linkText: "Explorer le budget",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Listes de Bagages Intelligentes",
        description:
          "Des listes de bagages g\u00e9n\u00e9r\u00e9es par IA adapt\u00e9es \u00e0 votre destination, la m\u00e9t\u00e9o et l'\u00e2ge de chaque membre. Partagez avec la famille pour ne rien oublier.",
        link: "/features/packing",
        linkText: "Voir les listes",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 \u00c9tapes pour Organiser Vos Vacances en Famille",
    stepsSubtitle:
      "De la premi\u00e8re id\u00e9e aux valises boucl\u00e9es en quelques minutes — pas en mois.",
    steps: [
      {
        step: "1",
        title: "Cr\u00e9ez Votre Voyage",
        description:
          "Nommez votre voyage, fixez les dates et invitez les membres de la famille avec un simple lien. Tout le monde rejoint instantan\u00e9ment — m\u00eame Mamie.",
      },
      {
        step: "2",
        title: "Planifiez Ensemble",
        description:
          "Votez pour les destinations, construisez votre itin\u00e9raire, suivez le budget familial et assignez les listes de bagages — le tout au m\u00eame endroit.",
      },
      {
        step: "3",
        title: "Pr\u00e9parez & Partez",
        description:
          "Obtenez des listes de bagages personnalis\u00e9es pour chaque membre de la famille, finalisez vos plans et partez pour une aventure familiale inoubliable.",
      },
    ],

    faqTitle: "Questions Fr\u00e9quemment Pos\u00e9es",
    faqItems: [
      {
        q: "WePlanify est-il adapt\u00e9 aux familles avec enfants ?",
        a: "Absolument. WePlanify est con\u00e7u pour les groupes de toutes sortes — y compris les familles avec enfants. La fonctionnalit\u00e9 de vote rend la participation amusante pour les enfants, et les listes de bagages partag\u00e9es garantissent que rien n'est oubli\u00e9.",
      },
      {
        q: "Plusieurs foyers peuvent-ils partager les co\u00fbts ?",
        a: "Oui. Le suivi de budget partag\u00e9 permet de r\u00e9partir les co\u00fbts entre plusieurs foyers. Suivez qui a pay\u00e9 quoi et r\u00e9glez facilement apr\u00e8s le voyage.",
      },
      {
        q: "Dois-je t\u00e9l\u00e9charger une application ?",
        a: "Aucun t\u00e9l\u00e9chargement n\u00e9cessaire. WePlanify fonctionne directement dans votre navigateur sur n'importe quel appareil — t\u00e9l\u00e9phone, tablette ou ordinateur. Ouvrez le lien et commencez \u00e0 planifier.",
      },
    ],

    ctaTitle: "Votre Prochaine Aventure Familiale Commence Ici",
    ctaDescription:
      "Rejoignez des milliers de familles qui planifient leurs vacances avec WePlanify. C'est gratuit, c'est simple, et \u00e7a rend tout le monde content.",
    ctaButton: "Commencer \u00e0 planifier",
  },
};

export default async function FamilyTripPage({ params }: Props) {
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
        name: locale === "fr" ? "Voyage en Famille" : "Family Trip",
        item: `https://www.weplanify.com/${locale}/family-trip`,
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
                  { label: locale === "fr" ? "Voyage en famille" : "Family Trip" },
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
                      ? "Tout ce qu'il faut pour organiser un voyage entre amis — itin\u00e9raires, sondages, budgets et plus encore."
                      : "Everything you need to coordinate a trip with your friend group — itineraries, polls, budgets, and more."}
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
