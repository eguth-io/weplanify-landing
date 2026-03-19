import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
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
  const metadata = await generateMetadataFromSanity(locale, "/trip-with-friends");

  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Trip with Friends — Group Travel Made Easy | WePlanify"
    : "Organiser un Voyage entre Amis — Planification de Groupe Facile | WePlanify";
  const description = isEn
    ? "Plan a trip with friends effortlessly. WePlanify is the group trip planner app with collaborative itineraries, group polls, shared budgets, and packing lists. Free to use."
    : "Organisez un voyage entre amis sans effort. WePlanify est l'application de planification de voyage de groupe avec itinéraires collaboratifs, sondages, budgets partagés et listes de bagages. Gratuit.";
  const keywords = isEn
    ? [
        "plan trip with friends",
        "group trip with friends app",
        "travel with friends planner",
        "group travel planning",
        "trip planner for friends",
        "collaborative trip planning",
        "group vacation planner",
      ]
    : [
        "organiser voyage entre amis",
        "planifier voyage amis",
        "application voyage groupe amis",
        "planification voyage groupe",
        "organiser voyage groupe amis",
        "voyage collaboratif entre amis",
        "planificateur voyage amis",
      ];

  return {
    ...metadata,
    title,
    description,
    keywords,
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
    heroTag: "Group Travel, Simplified",
    heroTitle: "Plan a Trip with Friends\nWithout the Chaos",
    heroDescription:
      "Stop juggling WhatsApp threads, spreadsheets, and guesswork. WePlanify brings your entire group together in one place to plan the perfect trip — from destination to departure.",
    heroCta: "Start planning for free",
    heroCtaSub: "Free forever. No credit card required.",

    painPointsTitle: "Sound Familiar?",
    painPointsSubtitle:
      "Planning a group trip with friends is exciting — until it isn't. Here are the headaches WePlanify eliminates.",
    painPoints: [
      {
        icon: "💬",
        title: "Scattered Conversations",
        description:
          "Important decisions buried in endless WhatsApp threads. Someone always misses the message. Nobody knows what was decided.",
      },
      {
        icon: "🗺️",
        title: "Can't Agree on a Destination",
        description:
          "Half the group wants beach, the other half wants mountains. Without a fair way to decide, the trip stalls before it even starts.",
      },
      {
        icon: "💸",
        title: "Budget Confusion",
        description:
          "Who paid for the Airbnb? Who owes what? Tracking shared expenses across a group trip quickly becomes a nightmare.",
      },
      {
        icon: "📋",
        title: "Nobody Knows What to Pack",
        description:
          "Three people bring hairdryers, nobody brings a first-aid kit. Without coordination, packing becomes a guessing game.",
      },
    ],

    solutionTitle: "How WePlanify Makes Group Trips Easy",
    solutionSubtitle:
      "Everything your friend group needs to plan, decide, and organize — all in one beautiful app.",
    solutions: [
      {
        title: "Collaborative Itinerary",
        description:
          "Build your trip itinerary together in real time. Everyone can suggest activities, vote on ideas, and see the final plan — no more back-and-forth.",
        link: "/features/planning",
        linkText: "Learn about planning",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Group Polls & Voting",
        description:
          "Can't decide between Barcelona and Bali? Create a poll, let everyone vote, and settle it democratically. No more endless debates.",
        link: "/features/polls",
        linkText: "Discover polls",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Shared Budget Tracker",
        description:
          "Track every expense, split costs fairly, and see who owes what — all updated in real time. No more awkward money conversations.",
        link: "/features/budget",
        linkText: "Explore budget tools",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Smart Packing Lists",
        description:
          "AI-powered packing lists tailored to your destination, weather, and activities. Share with the group so nothing gets forgotten or duplicated.",
        link: "/features/packing",
        linkText: "See packing lists",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Steps to Plan Your Trip with Friends",
    stepsSubtitle:
      "From idea to itinerary in minutes — not weeks.",
    steps: [
      {
        step: "1",
        title: "Create Your Trip",
        description:
          "Name your trip, pick your dates, and invite your friends with a simple link. Everyone joins instantly.",
      },
      {
        step: "2",
        title: "Plan Together",
        description:
          "Suggest destinations, vote on activities, build your itinerary, and track your shared budget — all in one place.",
      },
      {
        step: "3",
        title: "Pack & Go",
        description:
          "Get personalized packing lists, finalize your plans, and head out on the adventure of a lifetime with your crew.",
      },
    ],

    ctaTitle: "Your Next Adventure Starts Here",
    ctaDescription:
      "Join thousands of friend groups who plan their trips with WePlanify. It's free, it's fun, and it actually works.",
    ctaButton: "Start planning your trip",
    ctaSub: "Free forever. No credit card required.",
  },
  fr: {
    heroTag: "Voyage de Groupe, Simplifié",
    heroTitle: "Organisez un Voyage entre Amis\nSans le Chaos",
    heroDescription:
      "Arrêtez de jongler entre les fils WhatsApp, les tableurs et les suppositions. WePlanify réunit tout votre groupe au même endroit pour planifier le voyage parfait — de la destination au départ.",
    heroCta: "Commencer gratuitement",
    heroCtaSub: "Gratuit pour toujours. Aucune carte bancaire requise.",

    painPointsTitle: "Ça vous dit quelque chose ?",
    painPointsSubtitle:
      "Organiser un voyage entre amis, c'est excitant — jusqu'à ce que ça ne le soit plus. Voici les casse-têtes que WePlanify élimine.",
    painPoints: [
      {
        icon: "💬",
        title: "Conversations Éparpillées",
        description:
          "Les décisions importantes noyées dans des fils WhatsApp interminables. Quelqu'un rate toujours le message. Personne ne sait ce qui a été décidé.",
      },
      {
        icon: "🗺️",
        title: "Impossible de Choisir une Destination",
        description:
          "La moitié du groupe veut la plage, l'autre la montagne. Sans un moyen juste de décider, le voyage stagne avant même de commencer.",
      },
      {
        icon: "💸",
        title: "Confusion Budgétaire",
        description:
          "Qui a payé l'Airbnb ? Qui doit quoi ? Suivre les dépenses partagées d'un voyage de groupe devient vite un cauchemar.",
      },
      {
        icon: "📋",
        title: "Personne ne Sait Quoi Emporter",
        description:
          "Trois personnes apportent un sèche-cheveux, personne n'apporte de trousse de secours. Sans coordination, faire ses valises devient un jeu de devinettes.",
      },
    ],

    solutionTitle: "Comment WePlanify Facilite les Voyages de Groupe",
    solutionSubtitle:
      "Tout ce dont votre groupe d'amis a besoin pour planifier, décider et organiser — dans une seule application.",
    solutions: [
      {
        title: "Itinéraire Collaboratif",
        description:
          "Construisez votre itinéraire de voyage ensemble en temps réel. Chacun peut proposer des activités, voter sur les idées et voir le plan final — fini les allers-retours.",
        link: "/features/planning",
        linkText: "Découvrir la planification",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Sondages & Votes de Groupe",
        description:
          "Impossible de choisir entre Barcelone et Bali ? Créez un sondage, laissez tout le monde voter et réglez ça démocratiquement. Fini les débats sans fin.",
        link: "/features/polls",
        linkText: "Découvrir les sondages",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Budget Partagé",
        description:
          "Suivez chaque dépense, partagez les coûts équitablement et voyez qui doit quoi — le tout mis à jour en temps réel. Fini les conversations gênantes sur l'argent.",
        link: "/features/budget",
        linkText: "Explorer le budget",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Listes de Bagages Intelligentes",
        description:
          "Des listes de bagages générées par IA adaptées à votre destination, la météo et vos activités. Partagez avec le groupe pour ne rien oublier ni dupliquer.",
        link: "/features/packing",
        linkText: "Voir les listes",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Étapes pour Organiser Votre Voyage entre Amis",
    stepsSubtitle:
      "De l'idée à l'itinéraire en quelques minutes — pas en semaines.",
    steps: [
      {
        step: "1",
        title: "Créez Votre Voyage",
        description:
          "Nommez votre voyage, choisissez vos dates et invitez vos amis avec un simple lien. Tout le monde rejoint instantanément.",
      },
      {
        step: "2",
        title: "Planifiez Ensemble",
        description:
          "Proposez des destinations, votez sur les activités, construisez votre itinéraire et suivez votre budget partagé — le tout au même endroit.",
      },
      {
        step: "3",
        title: "Préparez & Partez",
        description:
          "Obtenez des listes de bagages personnalisées, finalisez vos plans et partez pour l'aventure de votre vie avec votre bande.",
      },
    ],

    ctaTitle: "Votre Prochaine Aventure Commence Ici",
    ctaDescription:
      "Rejoignez des milliers de groupes d'amis qui planifient leurs voyages avec WePlanify. C'est gratuit, c'est fun, et ça marche vraiment.",
    ctaButton: "Commencer à planifier",
    ctaSub: "Gratuit pour toujours. Aucune carte bancaire requise.",
  },
};

export default async function TripWithFriendsPage({ params }: Props) {
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

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[1536px] mx-auto">
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] bg-[#001E13]">
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#001E13] via-[#001E13] to-[#0a3d2a] opacity-100" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#61DBD5]/10 to-transparent" />

              <div className="relative z-10 px-6 lg:px-16 xl:px-20 py-16 lg:py-24 xl:py-32 text-center lg:text-left max-w-4xl">
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
                  <PulsatingButton className="font-karla font-bold">
                    {t.heroCta}
                  </PulsatingButton>
                  <p className="text-[#FFFBF5]/60 text-xs lg:text-sm font-karla">
                    {t.heroCtaSub}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
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
                      {solution.title}
                    </h3>
                    <p
                      className={`${solution.textColor} opacity-80 font-karla text-sm lg:text-base leading-relaxed mb-6`}
                    >
                      {solution.description}
                    </p>
                  </div>
                  <div>
                    <Link
                      href={solution.link}
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
                <PulsatingButton className="font-karla font-bold">
                  {t.ctaButton}
                </PulsatingButton>
                <p className="text-[#FFFBF5]/60 text-xs lg:text-sm font-karla">
                  {t.ctaSub}
                </p>
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
