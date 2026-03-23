import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import FadeIn from "@/components/FadeIn";
import Confetti from "@/components/Confetti";
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

const content = {
  en: {
    meta: {
      title: "Plan a Bachelorette Trip — Organize the Perfect Party | WePlanify",
      description:
        "Plan the ultimate bachelorette trip with WePlanify. Coordinate schedules, vote on activities, manage a shared budget, and build a day-by-day itinerary — all in one free bachelorette weekend organizer.",
    },
    hero: {
      tag: "Bachelorette Trip Planner",
      title: "Plan the Ultimate\nBachelorette Trip",
      description:
        "She said yes — now it's your turn to plan an unforgettable bachelorette party trip. WePlanify is the free bachelorette weekend organizer that keeps the surprise alive and the planning stress-free.",
      cta: "Start planning for free",
    },
    painPoints: {
      title: "Why Planning a Bachelorette Trip Is Pure Chaos",
      subtitle:
        "You love the bride-to-be, but organizing her big weekend? That's a whole different story.",
      items: [
        {
          emoji: "🤫",
          title: "Keeping It a Secret",
          description:
            "Trying to plan an epic surprise while coordinating 12 people on a group chat the bride can't see? Absolute nightmare.",
        },
        {
          emoji: "📅",
          title: "Herding Schedules",
          description:
            "Between work, kids, vacations, and \"let me check with my partner\" — finding one weekend that works for everyone feels impossible.",
        },
        {
          emoji: "💸",
          title: "The Money Talk",
          description:
            "Who's paying for the Airbnb? How do you split the bride's share? Venmo requests flying everywhere. Awkward.",
        },
        {
          emoji: "🎉",
          title: "Activity Overload",
          description:
            "Spa day or wine tour? Beach or city? Everyone has opinions but nobody wants to be the one who decides for the group.",
        },
      ],
    },
    features: {
      title: "WePlanify Makes Bachelorette Planning Easy",
      subtitle:
        "Everything you need to plan a bachelorette party trip — in one place, with zero stress.",
      items: [
        {
          emoji: "🔒",
          title: "Private Planning Group",
          description:
            "Create a secret planning space without the bride. Invite the crew, discuss ideas, and keep the surprise intact — no rogue group chat needed.",
          link: null,
        },
        {
          emoji: "🗳️",
          title: "Polls for Activities & Dates",
          description:
            "Can't agree on a date or activity? Let the group vote. Polls make it easy to find what works for everyone — no endless back-and-forth.",
          link: "/features/polls",
        },
        {
          emoji: "💰",
          title: "Shared Budget & Kitty",
          description:
            "Set a shared budget, track contributions, and split costs fairly. No more awkward money conversations or spreadsheet nightmares.",
          link: "/features/budget",
        },
        {
          emoji: "🗓️",
          title: "Day-by-Day Itinerary",
          description:
            "Build a detailed schedule for the whole weekend. From the welcome drinks to the final brunch — everyone knows what's happening and when.",
          link: "/features/planning",
        },
      ],
    },
    steps: {
      title: "Plan Your Bachelorette in 3 Simple Steps",
      items: [
        {
          step: "1",
          title: "Create Your Trip",
          description:
            "Set the destination, dates, and create your secret bachelorette planning group. Invite the bridesmaids in seconds.",
        },
        {
          step: "2",
          title: "Plan Together",
          description:
            "Vote on activities, set the budget, and build the itinerary collaboratively. Everyone gets a say, nobody gets left out.",
        },
        {
          step: "3",
          title: "Celebrate!",
          description:
            "Everything's planned, everyone's aligned. All that's left is to show up and give her the best bachelorette party ever.",
        },
      ],
    },
    testimonial: {
      quote:
        "Honestly we were a mess trying to plan Jen's bachelorette on WhatsApp. Someone suggested WePlanify and it just... worked? We voted on everything, the budget was clear, and nobody had to chase anyone for money. 10/10 would plan again.",
      author: "Emma R.",
      role: "Bridesmaid, NYC",
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Can I plan without the bride seeing?",
          a: "Absolutely. WePlanify lets you create a private planning group that the bride-to-be never sees. Invite only the bridesmaids and organizers — keep the surprise completely intact.",
        },
        {
          q: "How do we manage the shared budget?",
          a: "WePlanify includes a built-in shared budget tracker. Set the total budget, log every expense, split costs evenly or custom, and see who owes what in real time. No spreadsheets needed.",
        },
        {
          q: "Is WePlanify free for bachelorette planning?",
          a: "Yes, 100% free. All features — polls, itineraries, budgets, and private groups — are included at no cost. No trial, no credit card, no hidden fees.",
        },
      ],
    },
    cta: {
      title: "Ready to Plan the Best Bachelorette Ever?",
      description:
        "Join thousands of bridesmaids who use WePlanify to organize stress-free bachelorette trips. It's free, it's fun, and it actually works.",
      button: "Get started — it's free",
    },
  },
  fr: {
    meta: {
      title:
        "Organiser un EVJF — Planifiez l'Enterrement de Vie de Jeune Fille Parfait | WePlanify",
      description:
        "Organisez l'EVJF parfait avec WePlanify. Coordonnez les emplois du temps, votez pour les activités, gérez une cagnotte commune et créez un programme jour par jour — le tout dans une application EVJF gratuite.",
    },
    hero: {
      tag: "Application pour organiser un EVJF",
      title: "Organisez l'EVJF\nParfait",
      description:
        "Elle a dit oui — maintenant c'est à vous d'organiser un enterrement de vie de jeune fille inoubliable. WePlanify est l'application gratuite pour planifier un week-end EVJF sans stress et en gardant la surprise.",
      cta: "Commencer gratuitement",
    },
    painPoints: {
      title: "Pourquoi Organiser un EVJF, C'est le Chaos Total",
      subtitle:
        "Vous adorez la future mariée, mais organiser son grand week-end ? C'est une autre histoire.",
      items: [
        {
          emoji: "🤫",
          title: "Garder le Secret",
          description:
            "Essayer d'organiser une surprise épique en coordonnant 12 personnes sur un groupe que la mariée ne doit pas voir ? Un vrai cauchemar.",
        },
        {
          emoji: "📅",
          title: "Trouver LA Date",
          description:
            "Entre le boulot, les enfants, les vacances et les « je vérifie avec mon copain » — trouver un week-end qui convient à tout le monde relève de l'exploit.",
        },
        {
          emoji: "💸",
          title: "La Question du Budget",
          description:
            "Qui paie l'hébergement ? Comment on répartit la part de la mariée ? Les demandes de virement fusent de partout. Gênant.",
        },
        {
          emoji: "🎉",
          title: "Trop d'Idées, Zéro Décision",
          description:
            "Spa ou dégustation de vin ? Plage ou ville ? Tout le monde a un avis mais personne ne veut trancher pour le groupe.",
        },
      ],
    },
    features: {
      title: "WePlanify Simplifie l'Organisation de Votre EVJF",
      subtitle:
        "Tout ce qu'il faut pour planifier un week-end EVJF — au même endroit, sans prise de tête.",
      items: [
        {
          emoji: "🔒",
          title: "Groupe de Planification Privé",
          description:
            "Créez un espace secret sans la mariée. Invitez la team, discutez des idées et gardez la surprise intacte — fini les groupes WhatsApp risqués.",
          link: null,
        },
        {
          emoji: "🗳️",
          title: "Sondages pour les Activités & Dates",
          description:
            "Impossible de se mettre d'accord ? Laissez le groupe voter. Les sondages permettent de trouver ce qui convient à tout le monde — sans discussions interminables.",
          link: "/features/polls",
        },
        {
          emoji: "💰",
          title: "Cagnotte & Budget Partagé",
          description:
            "Définissez un budget commun, suivez les contributions et répartissez les frais équitablement. Plus de conversations gênantes sur l'argent.",
          link: "/features/budget",
        },
        {
          emoji: "🗓️",
          title: "Programme Jour par Jour",
          description:
            "Construisez un planning détaillé pour tout le week-end. Du cocktail de bienvenue au brunch final — tout le monde sait ce qui est prévu et quand.",
          link: "/features/planning",
        },
      ],
    },
    steps: {
      title: "Organisez Votre EVJF en 3 Étapes Simples",
      items: [
        {
          step: "1",
          title: "Créez Votre Voyage",
          description:
            "Choisissez la destination, les dates et créez votre groupe secret d'organisation. Invitez les copines en quelques secondes.",
        },
        {
          step: "2",
          title: "Planifiez Ensemble",
          description:
            "Votez pour les activités, définissez le budget et construisez le programme ensemble. Chacune a son mot à dire.",
        },
        {
          step: "3",
          title: "Célébrez !",
          description:
            "Tout est planifié, tout le monde est au courant. Il ne reste plus qu'à offrir à la future mariée le meilleur EVJF de sa vie.",
        },
      ],
    },
    testimonial: {
      quote:
        "On était complètement perdues pour organiser l'EVJF de Claire sur WhatsApp. Quelqu'un a proposé WePlanify et franchement ça a tout changé. On a voté pour chaque activité, le budget était clair, et personne n'a eu à courir après les remboursements. Je recommande les yeux fermés.",
      author: "Emma R.",
      role: "Demoiselle d'honneur, Paris",
    },
    faq: {
      title: "Questions Fréquemment Posées",
      items: [
        {
          q: "Puis-je organiser sans que la mariée voie ?",
          a: "Absolument. WePlanify vous permet de créer un groupe de planification privé que la future mariée ne voit jamais. Invitez uniquement les demoiselles d'honneur et les organisatrices — la surprise reste totale.",
        },
        {
          q: "Comment gérer le budget commun ?",
          a: "WePlanify inclut un suivi de budget partagé intégré. Définissez le budget total, enregistrez chaque dépense, répartissez les coûts à parts égales ou personnalisées, et voyez qui doit quoi en temps réel. Aucun tableur nécessaire.",
        },
        {
          q: "WePlanify est-il gratuit pour organiser un EVJF ?",
          a: "Oui, 100% gratuit. Toutes les fonctionnalités — sondages, itinéraires, budgets et groupes privés — sont incluses sans aucun coût. Pas d'essai, pas de carte bancaire, pas de frais cachés.",
        },
      ],
    },
    cta: {
      title: "Prête à Organiser le Meilleur EVJF ?",
      description:
        "Rejoignez des milliers de témoins qui utilisent WePlanify pour organiser des EVJF sans stress. C'est gratuit, c'est fun, et ça marche vraiment.",
      button: "Commencer — c'est gratuit",
    },
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseMetadata = await generateMetadataFromSanity(
    locale,
    "/bachelorette-trip"
  );
  const t = content[locale as keyof typeof content] || content.en;

  return {
    ...baseMetadata,
    title: t.meta.title,
    description: t.meta.description,
    keywords:
      locale === "fr"
        ? [
            "organiser evjf",
            "planifier enterrement vie jeune fille",
            "application evjf",
            "organiser week-end evjf",
            "evjf entre copines",
            "idées evjf",
            "budget evjf",
            "programme evjf",
          ]
        : [
            "bachelorette trip planner",
            "plan bachelorette party trip",
            "bachelorette weekend organizer",
            "bachelorette party ideas",
            "bachelorette trip budget",
            "bachelorette itinerary planner",
            "group trip planner bachelorette",
          ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export default async function BacheloretteTrip({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = content[locale as keyof typeof content] || content.en;

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null,
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
        name: locale === "fr" ? "EVJF" : "Bachelorette Trip",
        item: `https://www.weplanify.com/${locale}/bachelorette-trip`,
      },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
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
      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-24 px-4 lg:px-8 overflow-hidden">
          <Confetti />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                  { label: locale === "fr" ? "EVJF" : "Bachelorette Trip" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-6 whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center gap-2">
              <Link href="https://app.weplanify.com/register">
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t.hero.cta}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Pain Points Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {t.painPoints.title}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                {t.painPoints.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {t.painPoints.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:bg-[#FFFBF5]/10 transition-colors duration-300"
                >
                  <span className="text-3xl lg:text-4xl mb-4 block">
                    {item.emoji}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#FFFBF5]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </FadeIn>

        {/* Features Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t.features.title}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t.features.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {t.features.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-[#001E13]/5 hover:shadow-md hover:border-[#F6391A]/20 transition-all duration-300"
                >
                  <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#EEF899] rounded-2xl flex items-center justify-center mb-5">
                    <span className="text-2xl lg:text-3xl">{item.emoji}</span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                    {item.link ? (
                      <Link href={`/${locale}${item.link}`} className="text-[#001E13] font-londrina-solid hover:underline underline-offset-4 no-underline">
                        {item.title}
                      </Link>
                    ) : (
                      item.title
                    )}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </FadeIn>

        {/* Steps Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#61DBD5]/15">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight">
                {t.steps.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {t.steps.items.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 lg:w-20 lg:h-20 bg-[#F6391A] rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5]">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        </FadeIn>

        {/* Testimonial Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#EEF899] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 relative">
              <svg
                className="w-10 h-10 lg:w-14 lg:h-14 text-[#001E13]/15 mx-auto mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
              </svg>
              <blockquote className="text-lg lg:text-xl xl:text-2xl font-karla text-[#001E13] leading-relaxed mb-6 italic">
                &ldquo;{t.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-londrina-solid text-lg lg:text-xl text-[#001E13]">
                  {t.testimonial.author}
                </p>
                <p className="font-nanum-pen text-base lg:text-lg text-[#001E13]/60">
                  {t.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>

        </FadeIn>

        {/* FAQ Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-6">
              {t.faq.items.map((item, i) => (
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

        </FadeIn>

        {/* Discover More Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {locale === "fr" ? "Découvrir aussi" : "Discover More"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Voyage entre Amis" : "Trip with Friends"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Organisez un voyage de groupe entre amis facilement avec WePlanify."
                      : "Plan a group trip with friends effortlessly using WePlanify."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "En savoir plus →" : "Read more →"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Guide : Organiser un Voyage de Groupe" : "Guide: How to Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet étape par étape pour organiser un voyage de groupe réussi."
                      : "The complete step-by-step guide to planning a successful group trip."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide →" : "Read the guide →"}
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
                    {locale === "fr" ? "Voir le comparatif →" : "View comparison →"}
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
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
                <Link href="https://app.weplanify.com/register">
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
