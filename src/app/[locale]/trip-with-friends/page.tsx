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
import { ReactNode } from "react";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/trip-with-friends";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);

  const isEn = locale === "en";
  const title = isEn
    ? "Plan a Trip with Friends — Group Travel Made Easy | WePlanify"
    : "Organiser un Voyage entre Amis — Planification de Groupe Facile | WePlanify";
  const description = isEn
    ? "Plan a trip with friends effortlessly. WePlanify is the group trip planner app with collaborative itineraries, group polls, shared budgets, and packing lists. Free to use."
    : "Organisez un voyage entre amis sans effort. WePlanify est l'application de planification de voyage de groupe avec itinéraires collaboratifs, sondages, budgets partagés et listes de bagages. Gratuit.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...metadata,
    title,
    description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      title,
      description,
      url: currentUrl,
      locale: isEn ? "en_US" : "fr_FR",
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
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

const content = {
  en: {
    readTime: "8 min read",
    heroTag: "Group Travel, Simplified",
    heroTitle: "Plan a Trip with Friends\nWithout the Chaos",
    heroDescription:
      "Stop juggling WhatsApp threads, spreadsheets, and guesswork. WePlanify brings your entire group together in one place to plan the perfect trip — from destination to departure.",
    heroCta: "Start planning for free",

    whyTitle: "Why Plan a Group Trip with Friends?",
    whyParagraphs: [
      "Traveling with friends is one of life's greatest experiences. There is something irreplaceable about exploring a new city with your closest people, sharing meals in places you have never been, and creating stories you will retell for decades. Studies consistently show that shared travel experiences strengthen friendships and create deeper bonds than almost any other activity.",
      "But here is the reality: the planning phase is where most group trips fall apart. What starts as an exciting idea in a group chat quickly devolves into unanswered messages, conflicting opinions, and that one friend who never commits. The bigger the group, the harder it gets — and the more likely someone ends up doing all the work while everyone else just shows up.",
      "That is exactly why WePlanify exists. Instead of scattering your planning across WhatsApp, Google Docs, Splitwise, and a dozen browser tabs, you get one collaborative space where everyone can contribute, vote, and stay aligned. The result? Less stress for the organizer, more excitement for the group, and a trip that actually happens.",
    ],

    painPointsTitle: "Sound Familiar?",
    painPointsSubtitle:
      "Planning a group trip with friends is exciting — until it isn't. Here are the headaches WePlanify eliminates.",
    painPointsParagraphs: [
      "It always starts the same way. Someone drops the idea in the group chat — \"We should do a trip this summer\" — and within minutes, everyone is hyped. But then the real planning begins, and that is where things fall apart. Important decisions get buried in endless WhatsApp threads. You scroll back through 200 messages trying to find that restaurant recommendation from Tuesday, and it is gone — buried under memes and side conversations. Someone always misses the message. Nobody knows what was actually decided. Critical details like check-in times, addresses, and booking confirmations vanish into the noise.",
      "Then comes the destination debate. Half the group wants the beach, the other half wants mountains. Without a fair way to decide, the loudest voice in the chat ends up choosing while three people silently resent the decision. Or worse — the debate drags on for so long that flight prices double and everyone loses motivation entirely. Meanwhile, the budget situation is a mess. One person fronts the accommodation, another covers the car rental, someone keeps buying group dinners, and by the end of the trip nobody can remember who owes how much to whom. That awkward money conversation can sour an otherwise perfect trip.",
      "And then there is packing. Three people bring hairdryers, nobody brings a first-aid kit. For trips with specific activities — hiking, snorkeling, skiing — the lack of coordination means someone always shows up without essential gear. When you are sharing a rental, nobody thinks to bring the basics like a corkscrew, power strips, or card games until it is too late. Every one of these problems is solvable — but only if your group has a single place to plan, decide, and organize together.",
    ],

    solutionTitle: "How WePlanify Makes Group Trips Easy",
    solutionSubtitle:
      "Everything your friend group needs to plan, decide, and organize — all in one beautiful app.",
    solutions: [
      {
        title: "Collaborative Itinerary",
        description:
          "Build your trip itinerary together in real time. Everyone can suggest activities, vote on ideas, and see the final plan — no more back-and-forth. Drag and drop activities into your day-by-day schedule, add notes and links for each stop, and watch the trip take shape as your whole group contributes. Changes sync instantly so everyone is always looking at the latest version.",
        link: "/features/planning",
        linkText: "Learn about planning",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Group Polls & Voting",
        description:
          "Can't decide between Barcelona and Bali? Create a poll, let everyone vote, and settle it democratically. No more endless debates. Polls work for everything — destinations, dates, restaurants, activities, even what to cook for dinner at the Airbnb. Anonymous voting removes social pressure so people pick what they actually want, not what they think the group expects.",
        link: "/features/polls",
        linkText: "Discover polls",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Shared Budget Tracker",
        description:
          "Track every expense, split costs fairly, and see who owes what — all updated in real time. No more awkward money conversations. Log expenses on the go, assign them to individuals or the whole group, and let WePlanify calculate the final balances automatically. At the end of the trip, everyone knows exactly what they owe — no spreadsheets, no arguments, no lingering debts.",
        link: "/features/budget",
        linkText: "Explore budget tools",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Smart Packing Lists",
        description:
          "AI-powered packing lists tailored to your destination, weather, and activities. Share with the group so nothing gets forgotten or duplicated. Assign shared items to specific people — one person brings the first-aid kit, another handles the Bluetooth speaker. Check items off as you pack and see the group's progress in real time so you know everything is covered before you leave.",
        link: "/features/packing",
        linkText: "See packing lists",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    scenariosTitle: "Real-World Scenarios",
    scenariosSubtitle:
      "See how friend groups like yours use WePlanify for every type of trip.",
    scenarios: [
      {
        icon: "🏖️",
        title: "The Weekend Getaway",
        description:
          "Five friends, a long weekend, and a beach house two hours away. You create the trip on Monday, everyone votes on the house by Wednesday, and the packing list is shared by Friday. Budget tracking means the person who booked the house gets paid back automatically — no chasing anyone for money. Simple, fast, and stress-free.",
      },
      {
        icon: "✈️",
        title: "The International Adventure",
        description:
          "Eight friends scattered across three cities, planning two weeks in Southeast Asia. With WePlanify, everyone contributes destination ideas, votes on the route, and collaborates on a detailed day-by-day itinerary. The shared budget tracker handles multiple currencies, and the packing list ensures nobody forgets their visa documents or travel adapter.",
      },
      {
        icon: "🎵",
        title: "The Festival Trip",
        description:
          "A group of twelve heading to a music festival. Coordinating tickets, camping gear, rides, and food for that many people would be chaos without a central hub. WePlanify keeps the itinerary (set times, meetup spots), the budget (shared groceries, gas money), and the packing list (who brings the tent, who brings the cooler) all in one place.",
      },
    ],

    vsTitle: "Why WePlanify vs. Other Tools?",
    vsSubtitle:
      "You might be wondering: do I really need a dedicated tool? Can't I just use what I already have?",
    vsParagraphs: [
      "WhatsApp and iMessage are great for chatting, but terrible for planning. Important decisions get buried, links get lost, and there is no way to track budgets, build itineraries, or run polls. By the time your trip arrives, half the group is confused about the plans because they missed a message three weeks ago.",
      "Google Sheets and Notion are powerful but overkill for a trip. They require someone to build and maintain the structure, and most friends just never open them. The organizer ends up doing all the work alone — which is exactly the problem you were trying to solve.",
      "Solo travel apps like TripIt or Google Trips are designed for individual travelers. They do not support group collaboration, shared budgets, or group decision-making. WePlanify was built from the ground up for groups — every feature is designed around the reality that planning with multiple people is fundamentally different from planning alone.",
    ],

    stepsTitle: "3 Steps to Plan Your Trip with Friends",
    stepsSubtitle: "From idea to itinerary in minutes — not weeks.",
    steps: [
      {
        step: "1",
        title: "Create Your Trip",
        description:
          "Name your trip, pick your dates, and invite your friends with a simple link. Everyone joins instantly — no downloads, no sign-ups required.",
      },
      {
        step: "2",
        title: "Plan Together",
        description:
          "Suggest destinations, vote on activities, build your itinerary, and track your shared budget — all in one place, updated in real time.",
      },
      {
        step: "3",
        title: "Pack & Go",
        description:
          "Get personalized packing lists, finalize your plans, and head out on the adventure of a lifetime with your crew.",
      },
    ],

    faqTitle: "Frequently Asked Questions",
    faqItems: [
      {
        q: "Is WePlanify really free?",
        a: "Yes, 100%. WePlanify is free forever — no hidden fees, no trial limits, no credit card required. All core features (itineraries, polls, budgets, packing lists) are included at no cost.",
      },
      {
        q: "How many friends can I invite?",
        a: "There is no limit. Whether your group is 3 or 30, everyone can join with a simple invite link and collaborate in real time on the same trip.",
      },
      {
        q: "Can different friend groups collaborate on the same trip?",
        a: "Yes! WePlanify supports sub-groups within a single trip. If your trip involves multiple friend circles — say your college friends and your work friends — each sub-group can have their own private planning sections while still sharing the main itinerary, budget, and packing list. Everyone stays aligned without cluttering each other's conversations.",
      },
      {
        q: "What if friends have very different budgets?",
        a: "WePlanify's budget tracker lets you split costs flexibly. You can split evenly, by percentage, or assign specific expenses to specific people. This way, friends with tighter budgets can opt out of expensive optional activities while still participating in shared costs like accommodation.",
      },
      {
        q: "What happens if someone drops out mid-planning?",
        a: "No problem — WePlanify handles group changes gracefully. You can remove a member at any point, and the shared budget automatically recalculates so everyone's balances stay accurate. Any tasks or items assigned to that person get flagged for reassignment, and the rest of the group continues planning without missing a beat.",
      },
      {
        q: "How do group polls work?",
        a: "Create a poll with any question — destination, dates, restaurants, activities — and share it with your group. Everyone votes from their device, and results update in real time. You can set deadlines, allow multiple choices, and make votes anonymous to avoid social pressure.",
      },
    ],

    ctaTitle: "Your Next Adventure Starts Here",
    ctaDescription:
      "Join thousands of friend groups who plan their trips with WePlanify. It's free, it's fun, and it actually works.",
    ctaButton: "Start planning your trip",
  },
  fr: {
    readTime: "8 min de lecture",
    heroTag: "Voyage de Groupe, Simplifié",
    heroTitle: "Organisez un Voyage entre Amis\nSans le Chaos",
    heroDescription:
      "Arrêtez de jongler entre les fils WhatsApp, les tableurs et les suppositions. WePlanify réunit tout votre groupe au même endroit pour planifier le voyage parfait — de la destination au départ.",
    heroCta: "Commencer gratuitement",

    whyTitle: "Pourquoi Organiser un Voyage entre Amis ?",
    whyParagraphs: [
      "Voyager avec ses amis est l'une des plus belles expériences de la vie. Il y a quelque chose d'irremplaçable dans le fait d'explorer une nouvelle ville avec ses proches, de partager des repas dans des endroits inconnus et de créer des souvenirs qu'on racontera pendant des décennies. Les études montrent régulièrement que les expériences de voyage partagées renforcent les amitiés et créent des liens plus profonds que presque toute autre activité.",
      "Mais voici la réalité : c'est la phase de planification qui fait capoter la plupart des voyages de groupe. Ce qui commence comme une idée excitante dans un chat de groupe se transforme vite en messages sans réponse, opinions contradictoires et cet ami qui ne s'engage jamais. Plus le groupe est grand, plus c'est difficile — et plus il est probable qu'une seule personne finisse par tout organiser pendant que les autres se contentent de débarquer.",
      "C'est exactement pour ça que WePlanify existe. Au lieu d'éparpiller votre planification entre WhatsApp, Google Docs, Splitwise et une douzaine d'onglets de navigateur, vous avez un seul espace collaboratif où chacun peut contribuer, voter et rester aligné. Le résultat ? Moins de stress pour l'organisateur, plus d'excitation pour le groupe, et un voyage qui se concrétise vraiment.",
    ],

    painPointsTitle: "Ça vous dit quelque chose ?",
    painPointsSubtitle:
      "Organiser un voyage entre amis, c'est excitant — jusqu'à ce que ça ne le soit plus. Voici les casse-têtes que WePlanify élimine.",
    painPointsParagraphs: [
      "Ça commence toujours pareil. Quelqu'un lance l'idée dans le chat de groupe — « On devrait partir cet été » — et en quelques minutes, tout le monde est emballé. Mais ensuite, la vraie planification commence, et c'est là que tout dérape. Les décisions importantes se noient dans des fils WhatsApp interminables. Vous scrollez 200 messages en arrière pour retrouver la recommandation de restaurant de mardi, et elle a disparu — enterrée sous les memes et les conversations parallèles. Quelqu'un rate toujours le message. Personne ne sait ce qui a été vraiment décidé. Les détails critiques comme les heures de check-in, les adresses et les confirmations de réservation se perdent dans le bruit.",
      "Puis vient le débat sur la destination. La moitié du groupe veut la plage, l'autre la montagne. Sans un moyen juste de décider, la personne la plus vocale du chat finit par choisir pendant que trois autres ruminent en silence. Ou pire — le débat dure tellement longtemps que les prix des vols doublent et que tout le monde perd sa motivation. Pendant ce temps, le budget est un vrai bazar. Une personne avance l'hébergement, une autre la voiture, quelqu'un paie les dîners de groupe, et à la fin du voyage plus personne ne sait qui doit combien à qui. Cette conversation gênante sur l'argent peut gâcher un voyage autrement parfait.",
      "Et puis il y a les valises. Trois personnes apportent un sèche-cheveux, personne n'apporte de trousse de secours. Pour les voyages avec des activités spécifiques — randonnée, plongée, ski — l'absence de coordination fait que quelqu'un arrive toujours sans l'équipement essentiel. Quand vous partagez un logement, personne ne pense aux basiques comme un tire-bouchon, des multiprises ou des jeux de cartes. Chacun de ces problèmes a une solution — mais seulement si votre groupe dispose d'un seul endroit pour planifier, décider et s'organiser ensemble.",
    ],

    solutionTitle: "Comment WePlanify Facilite les Voyages de Groupe",
    solutionSubtitle:
      "Tout ce dont votre groupe d'amis a besoin pour planifier, décider et organiser — dans une seule application.",
    solutions: [
      {
        title: "Itinéraire Collaboratif",
        description:
          "Construisez votre itinéraire de voyage ensemble en temps réel. Chacun peut proposer des activités, voter sur les idées et voir le plan final — fini les allers-retours. Glissez-déposez les activités dans votre programme jour par jour, ajoutez des notes et des liens pour chaque étape, et regardez le voyage prendre forme au fur et à mesure que tout le groupe contribue. Les modifications se synchronisent instantanément.",
        link: "/features/planning",
        linkText: "Découvrir la planification",
        color: "bg-[#EEF899]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Sondages & Votes de Groupe",
        description:
          "Impossible de choisir entre Barcelone et Bali ? Créez un sondage, laissez tout le monde voter et réglez ça démocratiquement. Fini les débats sans fin. Les sondages fonctionnent pour tout — destinations, dates, restaurants, activités, même le menu du dîner à l'Airbnb. Le vote anonyme supprime la pression sociale pour que chacun choisisse ce qu'il veut vraiment.",
        link: "/features/polls",
        linkText: "Découvrir les sondages",
        color: "bg-[#61DBD5]",
        textColor: "text-[#001E13]",
      },
      {
        title: "Budget Partagé",
        description:
          "Suivez chaque dépense, partagez les coûts équitablement et voyez qui doit quoi — le tout mis à jour en temps réel. Fini les conversations gênantes sur l'argent. Enregistrez les dépenses en déplacement, assignez-les à des individus ou au groupe entier, et laissez WePlanify calculer les soldes automatiquement. À la fin du voyage, chacun sait exactement ce qu'il doit.",
        link: "/features/budget",
        linkText: "Explorer le budget",
        color: "bg-[#001E13]",
        textColor: "text-[#FFFBF5]",
      },
      {
        title: "Listes de Bagages Intelligentes",
        description:
          "Des listes de bagages générées par IA adaptées à votre destination, la météo et vos activités. Partagez avec le groupe pour ne rien oublier ni dupliquer. Assignez les objets partagés à des personnes spécifiques — quelqu'un apporte la trousse de secours, un autre l'enceinte Bluetooth. Cochez les articles au fur et à mesure et suivez la progression du groupe en temps réel.",
        link: "/features/packing",
        linkText: "Voir les listes",
        color: "bg-[#F6391A]",
        textColor: "text-[#FFFBF5]",
      },
    ],

    scenariosTitle: "Scénarios Concrets",
    scenariosSubtitle:
      "Découvrez comment des groupes d'amis comme le vôtre utilisent WePlanify pour chaque type de voyage.",
    scenarios: [
      {
        icon: "🏖️",
        title: "Le Week-end entre Potes",
        description:
          "Cinq amis, un long week-end et une maison en bord de mer à deux heures de route. Vous créez le voyage lundi, tout le monde vote pour la maison mercredi, et la liste de bagages est partagée vendredi. Le suivi des dépenses fait que celui qui a réservé la maison est remboursé automatiquement — plus besoin de courir après personne.",
      },
      {
        icon: "✈️",
        title: "L'Aventure Internationale",
        description:
          "Huit amis éparpillés dans trois villes, qui planifient deux semaines en Asie du Sud-Est. Avec WePlanify, chacun propose des destinations, vote sur l'itinéraire et collabore sur un planning jour par jour. Le suivi de budget gère plusieurs devises, et la liste de bagages garantit que personne n'oublie ses documents de visa ou son adaptateur.",
      },
      {
        icon: "🎵",
        title: "Le Voyage Festival",
        description:
          "Un groupe de douze qui part à un festival de musique. Coordonner les billets, le matériel de camping, les trajets et la nourriture pour autant de personnes serait chaotique sans un hub central. WePlanify centralise l'itinéraire (horaires des concerts, points de rendez-vous), le budget (courses partagées, essence) et la liste de bagages (qui apporte la tente, qui apporte la glacière).",
      },
    ],

    vsTitle: "Pourquoi WePlanify plutôt qu'autre chose ?",
    vsSubtitle:
      "Vous vous demandez peut-être : ai-je vraiment besoin d'un outil dédié ? Je ne peux pas juste utiliser ce que j'ai déjà ?",
    vsParagraphs: [
      "WhatsApp et iMessage sont parfaits pour discuter, mais catastrophiques pour planifier. Les décisions importantes se perdent, les liens disparaissent, et il n'y a aucun moyen de suivre un budget, construire un itinéraire ou lancer des sondages. Quand le voyage arrive, la moitié du groupe est perdue parce qu'elle a raté un message il y a trois semaines.",
      "Google Sheets et Notion sont puissants mais disproportionnés pour un voyage. Ils demandent que quelqu'un construise et maintienne la structure, et la plupart de vos amis ne les ouvriront tout simplement jamais. L'organisateur finit par tout faire seul — exactement le problème qu'on essayait de résoudre.",
      "Les applications de voyage solo comme TripIt ou Google Trips sont conçues pour les voyageurs individuels. Elles ne supportent pas la collaboration de groupe, les budgets partagés ou la prise de décision collective. WePlanify a été construit de zéro pour les groupes — chaque fonctionnalité est pensée autour de la réalité que planifier à plusieurs est fondamentalement différent de planifier seul.",
    ],

    stepsTitle: "3 Étapes pour Organiser Votre Voyage entre Amis",
    stepsSubtitle:
      "De l'idée à l'itinéraire en quelques minutes — pas en semaines.",
    steps: [
      {
        step: "1",
        title: "Créez Votre Voyage",
        description:
          "Nommez votre voyage, choisissez vos dates et invitez vos amis avec un simple lien. Tout le monde rejoint instantanément — pas de téléchargement, pas d'inscription requise.",
      },
      {
        step: "2",
        title: "Planifiez Ensemble",
        description:
          "Proposez des destinations, votez sur les activités, construisez votre itinéraire et suivez votre budget partagé — le tout au même endroit, mis à jour en temps réel.",
      },
      {
        step: "3",
        title: "Préparez & Partez",
        description:
          "Obtenez des listes de bagages personnalisées, finalisez vos plans et partez pour l'aventure de votre vie avec votre bande.",
      },
    ],

    faqTitle: "Questions Fréquemment Posées",
    faqItems: [
      {
        q: "Est-ce que WePlanify est vraiment gratuit ?",
        a: "Oui, à 100%. WePlanify est gratuit pour toujours — pas de frais cachés, pas de limites d'essai, pas de carte bancaire requise. Toutes les fonctionnalités principales (itinéraires, sondages, budgets, listes de bagages) sont incluses sans aucun coût.",
      },
      {
        q: "Combien d'amis puis-je inviter ?",
        a: "Il n'y a aucune limite. Que votre groupe soit de 3 ou 30 personnes, tout le monde peut rejoindre avec un simple lien d'invitation et collaborer en temps réel sur le même voyage.",
      },
      {
        q: "Plusieurs groupes d'amis peuvent-ils collaborer sur le même voyage ?",
        a: "Oui ! WePlanify supporte les sous-groupes au sein d'un même voyage. Si votre voyage réunit plusieurs cercles d'amis — par exemple vos amis de fac et vos collègues — chaque sous-groupe peut avoir ses propres sections de planification privées tout en partageant l'itinéraire principal, le budget et la liste de bagages. Tout le monde reste aligné sans encombrer les conversations des autres.",
      },
      {
        q: "Et si mes amis ont des budgets très différents ?",
        a: "Le suivi de budget de WePlanify permet de répartir les coûts de manière flexible. Vous pouvez diviser à parts égales, par pourcentage, ou assigner des dépenses spécifiques à des personnes précises. Ainsi, les amis avec un budget serré peuvent ne pas participer aux activités optionnelles coûteuses tout en partageant les frais communs comme l'hébergement.",
      },
      {
        q: "Que se passe-t-il si quelqu'un se désiste en cours de planification ?",
        a: "Aucun problème — WePlanify gère les changements de groupe en douceur. Vous pouvez retirer un membre à tout moment, et le budget partagé se recalcule automatiquement pour que les soldes de chacun restent exacts. Les tâches ou objets assignés à cette personne sont signalés pour réassignation, et le reste du groupe continue à planifier sans perdre le fil.",
      },
      {
        q: "Comment fonctionnent les sondages de groupe ?",
        a: "Créez un sondage sur n'importe quel sujet — destination, dates, restaurants, activités — et partagez-le avec votre groupe. Chacun vote depuis son appareil, et les résultats se mettent à jour en temps réel. Vous pouvez fixer des dates limites, autoriser les choix multiples et rendre les votes anonymes pour éviter la pression sociale.",
      },
    ],

    ctaTitle: "Votre Prochaine Aventure Commence Ici",
    ctaDescription:
      "Rejoignez des milliers de groupes d'amis qui planifient leurs voyages avec WePlanify. C'est gratuit, c'est fun, et ça marche vraiment.",
    ctaButton: "Commencer à planifier",
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
        name: locale === "fr" ? "Voyage entre Amis" : "Trip with Friends",
        item: `${SITE_URL}/${locale}/trip-with-friends`,
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: locale === "fr"
      ? "Organiser un Voyage entre Amis — Guide Complet"
      : "Plan a Trip with Friends — Complete Guide",
    description: locale === "fr"
      ? content.fr.heroDescription
      : content.en.heroDescription,
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor", url: SITE_URL },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19",
    dateModified: "2026-03-26",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${PATHNAME}`,
    },
  };

  return (
    <>
      <AuthorJsonLd />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
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
                  { label: locale === "fr" ? "Voyage entre amis" : "Trip with Friends" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-[1536px] mx-auto">
            <div className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] bg-[#001E13]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#001E13] via-[#001E13] to-[#0a3d2a] opacity-100" />
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#61DBD5]/10 to-transparent" />

              <div className="relative z-10 px-6 lg:px-16 xl:px-20 py-16 lg:py-24 xl:py-32 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-0">
                <div className="text-center lg:text-left lg:w-1/2">
                  <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
                    {t.heroTag}
                  </span>

                  <h1 className="text-[#FFFBF5] text-3xl lg:text-5xl xl:text-[56px] font-londrina-solid leading-tight mb-4 whitespace-pre-line">
                    {t.heroTitle}
                  </h1>

                  <p className="text-[#FFFBF5]/50 text-sm font-karla mb-4">
                    {t.readTime}
                  </p>

                  <p className="text-[#FFFBF5]/85 text-base lg:text-lg font-karla leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                    {t.heroDescription}{" "}
                    <Link
                      href={`/${locale}/guides/plan-group-trip`}
                      className="text-[#EEF899] underline underline-offset-4 hover:opacity-80"
                    >
                      {locale === "fr" ? "Lire notre guide complet" : "Read our complete guide"}
                    </Link>
                    .
                  </p>

                  <div className="flex flex-col gap-2 items-center lg:items-start">
                    <Link href="https://app.weplanify.com/register">
                      <PulsatingButton className="font-karla font-bold">
                        {t.heroCta}
                      </PulsatingButton>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block lg:w-1/2 relative">
                  <FloatingCards />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Author */}
        <div className="max-w-[900px] mx-auto px-4 lg:px-8 pt-4">
          <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-26" />
        </div>

        {/* Why Section */}
        <section className="pt-10 lg:pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-8 text-center">
              {t.whyTitle}
            </h2>
            <div className="space-y-5">
              {t.whyParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="max-w-[900px] mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Pain Points Section */}
        <section className="pt-10 lg:pt-14 pb-16 lg:pb-24 px-4 lg:px-8">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4 text-center">
              {t.painPointsTitle}
            </h2>
            <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed text-center mb-8">
              {t.painPointsSubtitle}
            </p>
            <div className="space-y-5">
              {t.painPointsParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
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
                  className={`${solution.color} rounded-[20px] lg:rounded-[24px] p-6 lg:p-8 flex flex-col justify-between min-h-[280px]`}
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

        {/* Real-World Scenarios Section */}
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t.scenariosTitle}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t.scenariosSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {t.scenarios.map((scenario, index) => (
                <div
                  key={index}
                  className="bg-[#001E13] rounded-[20px] lg:rounded-[24px] p-6 lg:p-8"
                >
                  <span className="text-3xl lg:text-4xl mb-4 block">
                    {scenario.icon}
                  </span>
                  <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3">
                    {scenario.title}
                  </h3>
                  <p className="text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-relaxed">
                    {scenario.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-[#001E13]/60 font-karla text-sm">
                {locale === "fr" ? (
                  <>Vous organisez un EVJF ? Découvrez notre <Link href={`/${locale}/bachelorette-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">guide dédié à l&apos;organisation d&apos;EVJF</Link>.</>
                ) : (
                  <>Planning a bachelorette? Check out our <Link href={`/${locale}/bachelorette-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">dedicated bachelorette trip planning guide</Link>.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* Why WePlanify vs Other Tools */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10 lg:mb-14">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">
                {t.vsTitle}
              </h2>
              <p className="text-[#001E13]/70 text-base lg:text-lg font-karla max-w-2xl mx-auto leading-relaxed">
                {t.vsSubtitle}
              </p>
            </div>
            <div className="space-y-5">
              {t.vsParagraphs.map((p, i) => (
                <p
                  key={i}
                  className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/alternatives/best-group-trip-planner-apps`}
                className="text-[#F6391A] font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70"
              >
                {locale === "fr"
                  ? "Voir le comparatif complet des applications →"
                  : "See the full app comparison →"}
              </Link>
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
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Organiser un EVJF" : "Plan a Bachelorette Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Tout ce qu'il faut pour planifier un enterrement de vie de jeune fille inoubliable sans stress."
                      : "Everything you need to plan an unforgettable bachelorette party trip, stress-free."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "En savoir plus →" : "Read more →"}
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
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

      <Footer footerData={footerData} />
    </>
  );
}
