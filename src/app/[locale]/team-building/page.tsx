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
  const metadata = await generateMetadataFromSanity(locale, "/team-building");

  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Team Building Trip — Corporate Retreat Planner | WePlanify"
    : "Séminaire d'Entreprise — Planificateur Team Building | WePlanify";
  const description = isEn
    ? "Organize your next team offsite with WePlanify. Vote on activities, manage budgets, and plan the perfect retreat — free."
    : "Organisez votre prochain séminaire avec WePlanify. Votez sur les activités, gérez le budget et planifiez le séjour parfait.";
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
    heroTag: "Team Building, Organized",
    heroTitle: "Plan a Team Building Trip\nYour Team Will Remember",
    heroDescription:
      "Corporate retreats and team offsites shouldn't be a logistical nightmare. WePlanify gives organizers and teams a shared space to plan activities, vote on options, and track the budget — without the spreadsheet chaos.",
    heroCta: "Start planning for free",
    painPointsTitle: "Corporate Trip Struggles",
    painPointsSubtitle:
      "Organizing a company offsite is rewarding — but the logistics can be overwhelming.",
    painPoints: [
      {
        icon: "📊",
        title: "Spreadsheet Overload",
        description:
          "Managing RSVPs, preferences, dietary restrictions, room assignments, and activities across multiple spreadsheets is a full-time job nobody signed up for.",
      },
      {
        icon: "🤷",
        title: "Low Engagement",
        description:
          "Team members don't feel invested in activities they didn't choose. Without input, retreats feel like mandatory fun rather than genuine bonding.",
      },
      {
        icon: "💼",
        title: "Budget Accountability",
        description:
          "Company money means company accountability. Tracking every expense across multiple vendors and getting approvals is tedious but necessary.",
      },
      {
        icon: "📧",
        title: "Email Thread Hell",
        description:
          "Important decisions buried in 47-reply email chains. Attachments lost, conflicting information, and half the team hasn't even read it.",
      },
    ],

    solutionTitle: "How WePlanify Makes Team Building Easy",
    solutionSubtitle:
      "Give your team a voice in planning and give yourself the tools to organize it all.",
    solutions: [
      {
        title: "Shared Trip Workspace",
        description:
          "One central hub for your entire offsite. Everyone sees the schedule, knows what's planned, and can contribute ideas — from day one.",
        link: "/features/planning",
        linkText: "Learn about planning",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Team Polls & Voting",
        description:
          "Let the team vote on activities, restaurants, and free-time options. Engagement goes up when people have a say in what happens.",
        link: "/features/polls",
        linkText: "Discover polls",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Transparent Budget Tracking",
        description:
          "Track every line item in real time. Share the budget breakdown with stakeholders and keep spending on track — no surprises when the invoice comes.",
        link: "/features/budget",
        linkText: "Explore budget tools",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Packing & Logistics Checklists",
        description:
          "Share what to bring, dress codes, travel documents needed, and logistics details. Everyone arrives prepared.",
        link: "/features/packing",
        linkText: "See packing lists",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Steps to Plan Your Team Offsite",
    stepsSubtitle:
      "From budget approval to post-retreat high-fives — streamlined.",
    steps: [
      {
        step: "1",
        title: "Create Your Event",
        description:
          "Set up your team retreat, add dates and location, and invite the team with a single link. Everyone joins instantly.",
      },
      {
        step: "2",
        title: "Plan Collaboratively",
        description:
          "Let the team vote on activities, build the schedule together, assign logistics, and track the company budget in real time.",
      },
      {
        step: "3",
        title: "Execute Flawlessly",
        description:
          "Share final logistics, packing checklists, and the complete itinerary. Everyone shows up prepared and excited.",
      },
    ],

    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "Is WePlanify suitable for corporate events?",
        a: "Yes. WePlanify works for teams of any size — from a 5-person startup offsite to a 50-person company retreat. The collaborative features (polls, budgets, shared itineraries) are designed for group coordination.",
      },
      {
        q: "Can I control the budget visibility?",
        a: "The budget tracker lets you share or keep certain expenses visible to the team. As an organizer, you maintain full control over what's shared.",
      },
      {
        q: "Is there a cost for companies?",
        a: "WePlanify is completely free — no enterprise pricing, no per-seat fees, no hidden costs. All features are available at no charge.",
      },
    ],

    ctaTitle: "Your Next Team Retreat Starts Here",
    ctaDescription:
      "Join companies that use WePlanify to organize engaging team building trips. It's free, collaborative, and your team will actually enjoy the planning process.",
    ctaButton: "Start planning your retreat",
  },
  fr: {
    heroTag: "Team Building, Bien Organisé",
    heroTitle: "Organisez un Séminaire\nDont Votre Équipe Se Souviendra",
    heroDescription:
      "Les séminaires d'entreprise et voyages team building ne devraient pas être un cauchemar logistique. WePlanify offre aux organisateurs et aux équipes un espace partagé pour planifier les activités, voter et suivre le budget — sans le chaos des tableurs.",
    heroCta: "Commencer gratuitement",
    painPointsTitle: "Les Galères du Séminaire d'Entreprise",
    painPointsSubtitle:
      "Organiser un séjour d'entreprise est gratifiant — mais la logistique peut être accablante.",
    painPoints: [
      {
        icon: "📊",
        title: "Overdose de Tableurs",
        description:
          "Gérer les inscriptions, préférences, restrictions alimentaires, attributions de chambres et activités dans plusieurs tableurs est un travail à plein temps pour lequel personne ne s'est porté volontaire.",
      },
      {
        icon: "🤷",
        title: "Engagement Faible",
        description:
          "Les membres de l'équipe ne se sentent pas investis dans des activités qu'ils n'ont pas choisies. Sans participation, les séminaires ressemblent à du fun obligatoire plutôt qu'à du vrai team building.",
      },
      {
        icon: "💼",
        title: "Responsabilité Budgétaire",
        description:
          "L'argent de l'entreprise implique des comptes à rendre. Suivre chaque dépense auprès de multiples prestataires et obtenir les validations est fastidieux mais nécessaire.",
      },
      {
        icon: "📧",
        title: "Enfer des Mails",
        description:
          "Les décisions importantes noyées dans des fils de 47 réponses. Pièces jointes perdues, informations contradictoires, et la moitié de l'équipe n'a même pas lu.",
      },
    ],

    solutionTitle: "Comment WePlanify Facilite le Team Building",
    solutionSubtitle:
      "Donnez une voix à votre équipe dans la planification et donnez-vous les outils pour tout organiser.",
    solutions: [
      {
        title: "Espace de Travail Partagé",
        description:
          "Un hub central pour tout votre séjour. Tout le monde voit le programme, sait ce qui est prévu et peut contribuer des idées — dès le premier jour.",
        link: "/features/planning",
        linkText: "Découvrir la planification",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Sondages & Votes d'Équipe",
        description:
          "Laissez l'équipe voter sur les activités, les restaurants et les options de temps libre. L'engagement monte quand les gens ont leur mot à dire.",
        link: "/features/polls",
        linkText: "Découvrir les sondages",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Suivi de Budget Transparent",
        description:
          "Suivez chaque poste de dépense en temps réel. Partagez le détail du budget avec les décideurs et gardez les dépenses sous contrôle.",
        link: "/features/budget",
        linkText: "Explorer le budget",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Checklists Logistique & Bagages",
        description:
          "Partagez quoi apporter, les codes vestimentaires, les documents de voyage nécessaires et les détails logistiques. Tout le monde arrive préparé.",
        link: "/features/packing",
        linkText: "Voir les listes",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    stepsTitle: "3 Étapes pour Organiser Votre Séminaire",
    stepsSubtitle:
      "De la validation du budget aux high-fives post-séminaire — simplifié.",
    steps: [
      {
        step: "1",
        title: "Créez Votre Événement",
        description:
          "Configurez votre séminaire, ajoutez les dates et le lieu, et invitez l'équipe avec un seul lien. Tout le monde rejoint instantanément.",
      },
      {
        step: "2",
        title: "Planifiez Ensemble",
        description:
          "Laissez l'équipe voter sur les activités, construisez le programme ensemble, assignez la logistique et suivez le budget en temps réel.",
      },
      {
        step: "3",
        title: "Exécutez Sans Accroc",
        description:
          "Partagez la logistique finale, les checklists et l'itinéraire complet. Tout le monde arrive préparé et motivé.",
      },
    ],

    faqTitle: "Questions Fréquemment Posées",
    faqItems: [
      {
        q: "WePlanify est-il adapté aux événements d'entreprise ?",
        a: "Oui. WePlanify fonctionne pour les équipes de toutes tailles — d'un séjour startup de 5 personnes à un séminaire de 50 collaborateurs. Les fonctionnalités collaboratives (sondages, budgets, itinéraires partagés) sont conçues pour la coordination de groupe.",
      },
      {
        q: "Puis-je contrôler la visibilité du budget ?",
        a: "Le suivi de budget vous permet de partager ou garder certaines dépenses visibles pour l'équipe. En tant qu'organisateur, vous gardez le contrôle total sur ce qui est partagé.",
      },
      {
        q: "Y a-t-il un coût pour les entreprises ?",
        a: "WePlanify est entièrement gratuit — pas de tarif entreprise, pas de frais par utilisateur, pas de coûts cachés. Toutes les fonctionnalités sont disponibles gratuitement.",
      },
    ],

    ctaTitle: "Votre Prochain Séminaire Commence Ici",
    ctaDescription:
      "Rejoignez les entreprises qui utilisent WePlanify pour organiser des séjours team building engageants. C'est gratuit, collaboratif, et votre équipe appréciera le processus de planification.",
    ctaButton: "Commencer à planifier",
  },
};

export default async function TeamBuildingPage({ params }: Props) {
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
        name: locale === "fr" ? "Team Building" : "Team Building",
        item: `https://www.weplanify.com/${locale}/team-building`,
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
                  { label: "Team Building" },
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
              {locale === "fr" ? "Découvrir aussi" : "Discover More"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Guide : Organiser un Voyage de Groupe" : "Guide: How to Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet étape par étape pour organiser un voyage de groupe réussi, de la première idée au dernier jour."
                      : "The complete step-by-step guide to planning a successful group trip, from first idea to last day."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Lire le guide →" : "Read the guide →"}
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
                      ? "Tout ce qu'il faut pour organiser un voyage entre amis — itinéraires, sondages, budgets et plus encore."
                      : "Everything you need to coordinate a trip with your friend group — itineraries, polls, budgets, and more."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "En savoir plus →" : "Read more →"}
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
