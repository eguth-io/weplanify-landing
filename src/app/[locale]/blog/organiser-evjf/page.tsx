import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const SITE_URL = "https://www.weplanify.com";
const PATHNAME_FR = "/blog/organiser-evjf";
const PATHNAME_EN = "/blog/how-to-plan-bachelorette-party";

const meta = {
  en: {
    title: "How to Plan a Bachelorette Party — Complete Guide 2026",
    description:
      "Everything you need to plan the perfect bachelorette trip: destination ideas, budget splitting, activities, and keeping everyone happy.",
  },
  fr: {
    title: "Comment Organiser un EVJF : Guide Complet 2026",
    description:
      "Tout ce qu'il faut savoir pour organiser un EVJF réussi : destination, budget partagé, idées d'activités et coordination du groupe.",
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? meta.fr : meta.en;
  const pathname = locale === "fr" ? PATHNAME_FR : PATHNAME_EN;
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  return {
    title: l.title,
    description: l.description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: l.title,
      description: l.description,
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description: l.description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${PATHNAME_EN}`,
        fr: `${SITE_URL}/fr${PATHNAME_FR}`,
        "x-default": `${SITE_URL}/en${PATHNAME_EN}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

type ContentLocale = {
  readTime: string;
  heroTag: string;
  h1: string;
  intro: string;
  tocTitle: string;
  toc: { id: string; label: string }[];
  sections: {
    whyHard: {
      id: string;
      title: string;
      paragraphs: string[];
    };
    fourQuestions: {
      id: string;
      title: string;
      intro: string;
      questions: { title: string; text: string }[];
    };
    destinationTypes: {
      id: string;
      title: string;
      intro: string;
      types: { title: string; text: string; bestFor: string }[];
    };
    budgetConversation: {
      id: string;
      title: string;
      paragraphs: string[];
      tips: { title: string; text: string }[];
    };
    timeline: {
      id: string;
      title: string;
      intro: string;
      steps: { when: string; tasks: string[] }[];
    };
    activities: {
      id: string;
      title: string;
      paragraphs: string[];
      ideas: { category: string; items: string[] }[];
      outro: string;
    };
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    text: string;
    button: string;
  };
  discoverMore: string;
  readMore: string;
};

const content: { en: ContentLocale; fr: ContentLocale } = {
  en: {
    readTime: "9 min read",
    heroTag: "Complete Guide 2026",
    h1: "How to Plan a Bachelorette Party — Complete Guide 2026",
    intro:
      "On paper, a bachelorette party sounds straightforward: gather the bride's closest friends, pick a destination, have a great time. In practice, you are coordinating six to twelve people with wildly different schedules, budgets, tastes, and opinions on what counts as a good time — all while trying to keep the bride blissfully unaware of the behind-the-scenes chaos. This guide cuts through the noise and gives you a real framework for planning a bachelorette trip that people will actually enjoy, not just survive.",

    tocTitle: "Table of Contents",
    toc: [
      { id: "why-hard", label: "Why Bachelorette Planning Is Harder Than It Looks" },
      { id: "four-questions", label: "The Four Questions to Settle First" },
      { id: "destination-types", label: "Destination Types" },
      { id: "budget-conversation", label: "The Budget Conversation Nobody Wants to Have" },
      { id: "timeline", label: "Planning Timeline" },
      { id: "activities", label: "Activities" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      whyHard: {
        id: "why-hard",
        title: "Why Bachelorette Planning Is Harder Than It Looks",
        paragraphs: [
          "The problem is not logistics — it is people. A bachelorette party brings together women who may barely know each other, united only by their connection to the bride. There is the maid of honor who has strong opinions about everything, the college friend who is on a tight budget and too embarrassed to say so, the work colleague who just found out she is pregnant, and the sister who lives in a different time zone and always replies late to group messages. Managing that social matrix while also booking hotels, planning activities, and chasing down deposits is genuinely exhausting.",
          "There is also the pressure of perfection. Unlike a regular trip with friends, a bachelorette carries emotional weight. It is supposed to be a milestone, a last hurrah, a memory the bride cherishes forever. That pressure turns minor hiccups — a restaurant that is fully booked, a rainy afternoon, a disagreement about where to eat — into disproportionate stressors. The organizer ends up carrying a load that nobody signed up for.",
          "The third layer is social dynamics. Pinterest has created an arms race of elaborate bachelorette aesthetics — matching sashes, coordinated pastel outfits, carefully curated itineraries full of instagrammable moments. Not every bride wants this. Not every group can afford it. And sometimes the gap between the Instagram version of the bachelorette and what people actually want to do causes real friction. The fix is brutally honest early conversations — and the right tools to keep the group aligned without turning the planning process itself into a source of conflict.",
        ],
      },
      fourQuestions: {
        id: "four-questions",
        title: "Start Here: The Four Questions to Settle First",
        intro:
          "Before you look at a single hotel or activity, answer these four questions as a group. They will save you weeks of back-and-forth.",
        questions: [
          {
            title: "Who is actually in the group?",
            text: "Get the final guest list confirmed before you plan anything else. Every person added after the fact changes the budget math, the accommodation options, and the activity logistics. Be realistic: not everyone who says 'yes' in the initial excitement will follow through. Build a firm deadline for RSVPs — two weeks is plenty — and plan around whoever committed by that date.",
          },
          {
            title: "What is the honest budget range?",
            text: "Do not set a budget based on what you wish everyone could spend. Ask each person privately what they are comfortable with, find the median, and plan around that number. If there is a wide spread, consider a tiered model: a core itinerary everyone can afford, with optional add-ons for those who want more. Use a shared budget tracker from day one so there are no surprises about what the total will look like per person.",
          },
          {
            title: "What does the bride actually want?",
            text: "Not what Pinterest says she should want. Not what you would want in her position. Ask her directly, or ask the person who knows her best. Some brides want a wild weekend in Ibiza; others genuinely want a cozy spa retreat with their five closest friends and no sashes in sight. You cannot plan a great bachelorette without knowing this, and assuming you know is the most common mistake organizers make.",
          },
          {
            title: "Weekend or longer?",
            text: "A three-day weekend is the sweet spot for most groups: long enough to feel like a real trip, short enough that everyone can take time off work and afford it. Five to seven days works for groups with flexible schedules and higher budgets — but more days means more coordination, more meals to plan, and more opportunities for the group dynamic to fray. Unless the bride specifically wants an extended trip, keep it tight.",
          },
        ],
      },
      destinationTypes: {
        id: "destination-types",
        title: "Destination Types",
        intro:
          "The destination sets the tone for everything else. Here are the four main categories, what they deliver, and which type of bride each suits best.",
        types: [
          {
            title: "City Break",
            text: "A long weekend in a vibrant city — Paris, Barcelona, Amsterdam, Lisbon, Nashville, New Orleans — gives the group maximum flexibility. Day activities, nightlife, restaurant options, and cultural experiences are all within reach. City breaks suit groups with mixed tastes because there is always something for everyone. The challenge is that the best cities for bachelorettes are expensive, especially for accommodation with a large group. Book a self-catered apartment rather than multiple hotel rooms — it is cheaper, more sociable, and gives you a base to pre-drink before nights out.",
            bestFor: "Mixed groups, brides who love culture and nightlife, first-time travelers",
          },
          {
            title: "Beach Escape",
            text: "Sun, a pool or beach, a villa or hotel. The beach escape is the classic bachelorette format for a reason: it is low-planning-effort, high-enjoyment. The days organize themselves around the pool, meals are easy, and nights can be as relaxed or as lively as the group wants. The Algarve, Mallorca, Mykonos, and the Croatian coast are European favourites. For US groups, Nashville beats Miami on value, but the Florida Keys are hard to beat for a small, close-knit group. The main risk is that beach trips can get repetitive after day two — make sure you have one or two structured activities to anchor the schedule.",
            bestFor: "Brides who want to relax, sun-loving groups, long weekends",
          },
          {
            title: "Spa Retreat",
            text: "Not every bachelorette wants a raucous weekend. Some brides genuinely want a spa retreat: massages, infrared saunas, thermal pools, good food, and early nights. This format works brilliantly for smaller, closer groups — four to six people rather than twelve. It is also more budget-predictable than a city break because you are largely staying in one place. The challenge is it requires buy-in from the whole group; if half the guests expect clubs and the other half expect silence, nobody has a good time.",
            bestFor: "Introverted brides, wellness-focused groups, smaller intimate gatherings",
          },
          {
            title: "Adventure Trip",
            text: "Surfing in the Basque Country, hiking in Slovenia, a cycling weekend in Tuscany, glamping in Wales. Adventure bachelorettes are growing in popularity because they create shared experiences that bond the group in a way that nightlife rarely does. The stories from the day you all fell off the paddleboards are better than any club night. The catch: adventure trips require more physical planning, insurance considerations, and honest conversations about fitness levels. Do not book a challenging hike and hope everyone can manage it.",
            bestFor: "Active brides, groups who already spend time outdoors together",
          },
        ],
      },
      budgetConversation: {
        id: "budget-conversation",
        title: "The Budget Conversation Nobody Wants to Have",
        paragraphs: [
          "Money is where bachelorette plans fall apart. Not because people are malicious — because organizers often delay the real budget conversation until deposits are due and flights are booked, at which point the person who cannot actually afford it feels trapped and resentful. Having the budget conversation early and explicitly, before any commitments are made, is the single most important thing you can do for the group dynamic.",
          "The bride traditionally does not pay her share of accommodation and activities — that cost gets split among the guests. Make sure everyone in the group understands this before costs are finalized. On a trip for eight people where the accommodation is €1,500, that is €215 per person rather than €187. Not a lot in absolute terms, but worth being explicit about from the start.",
          "Centralize what you can. Pre-book accommodation, transfers, and group activities through one person or a shared planning tool so money flows clearly and nobody is left out of pocket for weeks. Use a shared budget tracker so everyone can see the running total — groups that track spending as they go avoid the uncomfortable end-of-trip reconciliation that can sour the last day.",
        ],
        tips: [
          {
            title: "Set a per-person budget, not a total budget",
            text: "A total budget of €3,000 sounds manageable until you realise the group is fifteen people and that covers less than €200 each. Always think in per-person terms from the start.",
          },
          {
            title: "Separate must-haves from nice-to-haves",
            text: "Accommodation and a couple of key activities are non-negotiable. Matching outfits, custom decorations, and elaborate gift bags are optional. Know the difference before you start spending.",
          },
          {
            title: "Handle unequal incomes gracefully",
            text: "If someone in the group is on a tighter budget, let them contribute differently — hosting a dinner, coordinating logistics, picking up smaller costs — rather than stretching beyond their means or feeling excluded. Generosity works better than awkward subsidy conversations.",
          },
          {
            title: "Use a shared budget tracker from day one",
            text: "Tools like WePlanify's built-in budget tracker let everyone see what has been paid, what is owed, and what the final per-person cost will be — without anyone having to chase spreadsheets or Venmo requests at the end of the trip.",
          },
        ],
      },
      timeline: {
        id: "timeline",
        title: "Planning Timeline",
        intro:
          "Bachelorette planning has a way of expanding to fill whatever time you give it — or compressing into a stressful last-minute scramble if you leave it too late. Here is a realistic timeline that keeps things moving without the chaos.",
        steps: [
          {
            when: "3 months out",
            tasks: [
              "Confirm the guest list and get firm RSVPs",
              "Have the honest budget conversation with the group",
              "Agree on dates — use a poll to find when everyone is free",
              "Choose a destination type based on the bride's actual preferences",
              "Book accommodation (this locks in everything else)",
              "Start a shared planning space so everyone can see the plan",
            ],
          },
          {
            when: "6 weeks out",
            tasks: [
              "Book transport — flights, train, or group transfer",
              "Research and shortlist activities — use a group poll to narrow it down",
              "Book any must-do activities that require advance reservations",
              "Set up a shared budget tracker and log deposits as they go",
              "Confirm dietary restrictions and accessibility needs for every guest",
            ],
          },
          {
            when: "2 weeks out",
            tasks: [
              "Send the final itinerary to the group — one clean document, not a thread of messages",
              "Book restaurants for group dinners",
              "Buy any decorations or personalised items (sashes, etc.) if using them",
              "Assign a shared packing list so everyone knows what communal items are covered",
              "Chase any outstanding payments or RSVPs",
            ],
          },
          {
            when: "Day before",
            tasks: [
              "Confirm accommodation check-in details and share with the group",
              "Pack a small emergency kit: plasters, painkillers, phone charger, snacks",
              "Have the budget tracker open and up to date",
              "Get a good night's sleep — you are going to need it",
            ],
          },
        ],
      },
      activities: {
        id: "activities",
        title: "Activities",
        paragraphs: [
          "The best bachelorette itinerary has a clear structure but plenty of breathing room. Overscheduled trips feel like a school trip; underscheduled ones drift into arguments about what to do next. Aim for one or two anchoring activities per day, with free time built in for spontaneity.",
          "The golden rule: make sure at least one activity is specifically chosen because the bride loves it, not because it is standard bachelorette fare. If she hates cocktail-making classes but loves pottery, book pottery. If she has never liked club nights but lives for a long, boozy dinner with her favourite people, prioritise that. The Instagram version of the bachelorette is not the point.",
          "Avoid forced fun. Matching outfits, sashes, and L-plates are fine if the bride is into it — but if she has already mentioned she would be mortified, do not do it. Same with strippers, scavenger hunts, and games based on embarrassing the bride. Fun that requires everyone to perform happiness tends to fall flat.",
        ],
        ideas: [
          {
            category: "Daytime",
            items: [
              "Private sailing or boat trip",
              "Wine or cocktail tasting (book a private session, not the tourist tour)",
              "Spa morning with individual treatments",
              "Pottery, glassblowing, or art workshop",
              "Paddleboarding, surfing lesson, or kayaking",
              "Cooking class with a local chef",
              "Vintage shopping day in a new city",
            ],
          },
          {
            category: "Evening",
            items: [
              "Private chef dinner at your accommodation",
              "Reservation at the restaurant the bride has been wanting to try",
              "Cocktail-making class (but only if she actually wants this)",
              "Karaoke — genuinely underrated for mixed groups",
              "Night at the opera, jazz club, or a stand-up show",
              "Casino night (low-stakes, high entertainment value)",
            ],
          },
          {
            category: "Low-key",
            items: [
              "Movie night in the villa with film of the bride's choice",
              "Board game evening with good wine",
              "Sunset walk followed by a long dinner",
              "Morning yoga or pilates session",
              "Farmers' market brunch",
            ],
          },
        ],
        outro:
          "Vote on activities using a group poll before you book anything — it prevents the classic situation where the organizer books something expensive and two people hate it. WePlanify's polls feature takes thirty seconds to set up and gives everyone an equal voice without a sixty-message debate in the group chat.",
      },
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How far in advance should you plan a bachelorette party?",
          a: "For a weekend trip, three months is comfortable — it gives you enough time to get everyone's dates aligned, book accommodation before prices jump, and organize activities without rush. If you are planning something more elaborate (international flights, villa rental, high-demand destinations), four to five months is safer. For a local night out or a simple staycation, six weeks is usually fine. The biggest mistake is waiting until two months before the wedding, when everyone's schedule is already packed with dress fittings and other wedding events.",
        },
        {
          q: "How do you handle different budgets in the group?",
          a: "Have the conversation early and privately. Ask each person individually what they are comfortable spending — not in a group message where social pressure skews the answers. Find the median and plan around it. Offer optional add-ons for people who want to spend more, rather than planning an expensive trip and hoping everyone finds a way to manage. If someone genuinely cannot afford the trip as planned, let them contribute differently — coordinating logistics, handling communication, covering a smaller cost — rather than asking them to stretch beyond their means.",
        },
        {
          q: "What is a good bachelorette trip budget per person?",
          a: "For a UK or European city break, £300 to £600 per person for a three-night trip covers transport, accommodation, and a couple of activities if you are smart about it. Beach or villa trips in southern Europe run €400 to €800 per person for a long weekend. US domestic trips vary wildly — Nashville, Miami, and New York weekends can run $500 to $1,200 per person depending on the group size and accommodation type. Remember: the bride traditionally does not pay her share, so factor that cost into your per-person calculation from the start.",
        },
        {
          q: "How many people is too many for a bachelorette trip?",
          a: "Eight to ten people is the practical upper limit for a cohesive trip. Above that, restaurant reservations become a nightmare, activities require booking out entire venues, and the group inevitably fragments. Large groups also mean more logistical overhead — more people to coordinate, more variables to manage, more chances for someone to drop out last minute and throw the budget off. If the guest list is genuinely fifteen-plus, consider splitting into two groups with separate trips, or choosing a format that works for large groups by design — a villa with a private chef, a hired boat, a full venue buyout.",
        },
        {
          q: "What if the bride doesn't want a traditional bachelorette?",
          a: "Plan what she actually wants. There is no rule that says a bachelorette has to involve sashes, strippers, or a club night. If she wants a quiet spa weekend with three friends, that is the bachelorette. If she wants a hiking trip in the mountains, that is the bachelorette. The best way to find out is to ask her directly — or ask her closest friend or sister. The worst bachelorettes are the ones where the organizer planned the trip they wanted to go on rather than what the bride actually cares about.",
        },
        {
          q: "How do you keep everyone happy on a bachelorette trip?",
          a: "You will not — and trying to will exhaust you. Aim for everyone having a good time most of the time, not universal happiness at every moment. Build variety into the schedule: active and relaxed, group and free time, early nights and later ones. Use polls to make group decisions so nobody feels steamrolled. Set clear expectations upfront about budget, formality, and what is and is not planned. And accept that some people will be harder to please than others — that is true of every group trip, not just bachelorettes.",
        },
      ],
    },

    cta: {
      title: "Ready to Plan the Perfect Bachelorette Trip?",
      text: "WePlanify brings your whole group into one place — destination polls, shared itinerary, budget tracker, and packing lists. Stop managing the chaos in a group chat and start actually planning together.",
      button: "Plan the Bachelorette",
    },

    discoverMore: "Discover More",
    readMore: "Read more",
  },

  fr: {
    readTime: "9 min de lecture",
    heroTag: "Guide Complet 2026",
    h1: "Comment Organiser un EVJF : Guide Complet 2026",
    intro:
      "Sur le papier, organiser un EVJF semble simple : réunir les amies proches de la future mariée, choisir une destination, passer un bon moment. En pratique, vous coordonnez six à douze personnes avec des emplois du temps, des budgets, des goûts et des idées du bon temps radicalement différents — tout en essayant que la mariée ne voit rien du chaos qui se passe dans les coulisses. Ce guide va droit au but et vous donne un cadre concret pour organiser un EVJF que tout le monde appréciera vraiment, pas juste endurera.",

    tocTitle: "Sommaire",
    toc: [
      { id: "why-hard", label: "Pourquoi Organiser un EVJF est plus Compliqué qu'il n'y Paraît" },
      { id: "four-questions", label: "Les Quatre Questions à Trancher en Premier" },
      { id: "destination-types", label: "Types d'EVJF" },
      { id: "budget-conversation", label: "La Conversation Budget qu'on Évite Toujours" },
      { id: "timeline", label: "Planning : de l'Idée à la Soirée" },
      { id: "activities", label: "Les Activités" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      whyHard: {
        id: "why-hard",
        title: "Pourquoi Organiser un EVJF est plus Compliqué qu'il n'y Paraît",
        paragraphs: [
          "Le problème, ce n'est pas la logistique — c'est les gens. Un EVJF réunit des femmes qui se connaissent parfois à peine, unies uniquement par leur lien avec la future mariée. Il y a la témoin qui a un avis sur tout, la copine d'enfance avec un budget serré qu'elle n'osera jamais mentionner, la collègue qui vient d'apprendre qu'elle est enceinte, et la sœur qui habite dans un autre fuseau horaire et répond toujours au dernier moment aux messages de groupe. Gérer cette dynamique sociale tout en réservant des hôtels, planifiant des activités et relançant les acomptes, c'est épuisant.",
          "S'ajoute à ça la pression de la perfection. Contrairement à un voyage ordinaire entre amies, l'EVJF a un poids émotionnel particulier. C'est censé être un moment marquant, une dernière grande sortie, un souvenir que la mariée chérira toute sa vie. Cette pression transforme les petits imprévus — un restaurant complet, une après-midi pluvieuse, un désaccord sur le dîner — en sources de stress disproportionnées. L'organisatrice porte une charge dont personne ne lui avait parlé.",
          "La troisième dimension, c'est la pression sociale. Pinterest a créé une surenchère d'esthétiques EVJF élaborées — écharpes coordonnées, tenues pastel assorties, itinéraires instagrammables soigneusement orchestrés. Toutes les futures mariées ne veulent pas ça. Tous les groupes ne peuvent pas se le permettre. Et parfois le fossé entre la version Instagram de l'EVJF et ce que les gens veulent vraiment faire crée de vraies tensions. La solution ? Des conversations honnêtes dès le départ — et les bons outils pour garder le groupe aligné sans que la planification elle-même devienne une source de conflit.",
        ],
      },
      fourQuestions: {
        id: "four-questions",
        title: "Les Quatre Questions à Trancher en Premier",
        intro:
          "Avant de regarder un seul hôtel ou une seule activité, répondez à ces quatre questions en groupe. Elles vous économiseront des semaines d'allers-retours.",
        questions: [
          {
            title: "Qui est vraiment dans le groupe ?",
            text: "Confirmez la liste définitive des participantes avant de planifier quoi que ce soit d'autre. Chaque personne ajoutée après coup change le calcul du budget, les options d'hébergement et la logistique des activités. Soyons réalistes : toutes celles qui disent 'oui' dans l'enthousiasme du premier moment ne vont pas nécessairement suivre. Fixez une date limite ferme pour les confirmations — deux semaines, c'est largement suffisant — et planifiez avec celles qui se sont engagées dans ce délai.",
          },
          {
            title: "Quel est le budget honnête de chacune ?",
            text: "Ne fixez pas un budget basé sur ce que vous aimeriez que tout le monde puisse dépenser. Demandez à chaque personne en privé ce qu'elle est à l'aise de dépenser, trouvez la médiane et planifiez autour de ce chiffre. Si les écarts sont importants, envisagez un modèle modulaire : un programme de base accessible à toutes, avec des options payantes pour celles qui veulent plus. Utilisez un suivi de budget partagé dès le départ pour qu'il n'y ait pas de mauvaises surprises sur le coût total par personne.",
          },
          {
            title: "Ce que la future mariée veut vraiment ?",
            text: "Pas ce que Pinterest dit qu'elle devrait vouloir. Pas ce que vous voudriez à sa place. Demandez-lui directement, ou demandez à la personne qui la connaît le mieux. Certaines futures mariées veulent un week-end de folie à Ibiza ; d'autres veulent sincèrement un week-end spa tranquille avec leurs cinq amies les plus proches, sans écharpe en vue. On ne peut pas organiser un super EVJF sans connaître sa réponse, et supposer qu'on la connaît est l'erreur la plus courante des organisatrices.",
          },
          {
            title: "Week-end ou plus long ?",
            text: "Un week-end de trois jours est le format idéal pour la plupart des groupes : assez long pour avoir l'impression d'un vrai voyage, assez court pour que tout le monde puisse poser des congés et se le permettre. Cinq à sept jours peut fonctionner pour les groupes avec des agendas flexibles et des budgets plus importants — mais plus de jours signifie plus de coordination, plus de repas à prévoir et plus d'opportunités pour la dynamique de groupe de se fragiliser. Sauf si la mariée veut spécifiquement un voyage long, restez sur un format court.",
          },
        ],
      },
      destinationTypes: {
        id: "destination-types",
        title: "Types d'EVJF",
        intro:
          "La destination donne le ton à tout le reste. Voici les quatre grandes catégories, ce qu'elles apportent, et quel type de future mariée convient à chacune.",
        types: [
          {
            title: "City Break",
            text: "Un long week-end dans une ville vibrante — Paris, Barcelone, Amsterdam, Lisbonne, Séville — donne au groupe un maximum de flexibilité. Activités de journée, vie nocturne, options de restaurants et expériences culturelles sont toutes à portée de main. Les city breaks conviennent aux groupes aux goûts variés parce qu'il y a toujours quelque chose pour tout le monde. L'enjeu : les meilleures villes pour les EVJF sont chères, surtout en hébergement pour un grand groupe. Réservez un appartement en location entière plutôt que plusieurs chambres d'hôtel — c'est moins cher, plus convivial et vous avez une base pour se préparer ensemble.",
            bestFor: "Groupes mixtes, futures mariées qui aiment la culture et la vie nocturne",
          },
          {
            title: "Plage",
            text: "Soleil, piscine ou plage, villa ou hôtel. L'EVJF plage est le format classique pour une bonne raison : il demande peu de planification et délivre beaucoup de plaisir. Les journées s'organisent naturellement autour de la piscine, les repas sont simples, et les soirées peuvent être aussi relaxées ou animées que le groupe le souhaite. L'Algarve, Majorque, Mykonos et la côte croate sont les destinations européennes favorites. Le principal risque avec un séjour plage, c'est la répétition à partir du deuxième jour — prévoyez une ou deux activités structurées pour ancrer le programme.",
            bestFor: "Futures mariées qui veulent se détendre, groupes amateurs de soleil, week-ends",
          },
          {
            title: "Spa & Bien-être",
            text: "Toutes les futures mariées ne veulent pas un week-end agité. Certaines veulent sincèrement un séjour spa : massages, saunas infrarouges, piscines thermales, bonne cuisine et couchers tôt. Ce format fonctionne parfaitement pour les groupes plus petits et soudés — quatre à six personnes plutôt que douze. Il est aussi plus prévisible sur le plan budgétaire qu'un city break, car on reste principalement au même endroit. L'enjeu : il faut l'adhésion de tout le groupe ; si la moitié s'attend à des clubs et l'autre à du silence, personne ne passe une bonne soirée.",
            bestFor: "Futures mariées introverties, groupes axés bien-être, petits rassemblements",
          },
          {
            title: "Aventure",
            text: "Surf au Pays Basque, randonnée en Slovénie, week-end vélo en Toscane, glamping en Bretagne. Les EVJF aventure gagnent en popularité parce qu'ils créent des expériences partagées qui soudent le groupe d'une façon que la vie nocturne offre rarement. Les histoires du jour où vous êtes toutes tombées du paddleboard valent mieux qu'une nuit en boîte. L'enjeu : les séjours aventure demandent une planification physique plus approfondie et des conversations honnêtes sur les niveaux de forme. Ne réservez pas une randonnée technique en espérant que tout le monde suivra.",
            bestFor: "Futures mariées actives, groupes qui passent déjà du temps en plein air",
          },
        ],
      },
      budgetConversation: {
        id: "budget-conversation",
        title: "La Conversation Budget qu'on Évite Toujours",
        paragraphs: [
          "C'est là que les projets d'EVJF s'effondrent. Non par mauvaise volonté — mais parce que les organisatrices reportent souvent la vraie conversation budget jusqu'à ce que les acomptes soient dus et les vols réservés, moment auquel la personne qui ne peut pas vraiment se le permettre se sent coincée et commence à en vouloir aux autres. Avoir cette conversation tôt et explicitement, avant tout engagement, est la chose la plus importante que vous puissiez faire pour la dynamique du groupe.",
          "La future mariée ne paie traditionnellement pas sa part d'hébergement et d'activités — ce coût est réparti entre les participantes. Assurez-vous que tout le monde dans le groupe comprend cela avant que les coûts ne soient finalisés. Pour un voyage à huit où l'hébergement coûte 1 500 €, c'est 215 € par personne et non 187 €. Pas grand-chose en valeur absolue, mais autant être explicite dès le départ.",
          "Centralisez ce que vous pouvez. Réservez l'hébergement, les transferts et les activités de groupe via une seule personne ou un outil de planification partagé pour que les flux d'argent soient clairs et que personne ne reste en avance de frais pendant des semaines. Utilisez un suivi de budget partagé pour que tout le monde voie le total courant — les groupes qui suivent les dépenses au fil de l'eau évitent la réconciliation financière inconfortable en fin de voyage.",
        ],
        tips: [
          {
            title: "Fixez un budget par personne, pas un budget total",
            text: "Un budget total de 3 000 € semble gérable jusqu'à ce qu'on réalise que le groupe est de quinze personnes et que ça représente moins de 200 € chacune. Pensez toujours en termes de coût par personne dès le départ.",
          },
          {
            title: "Distinguez l'indispensable du facultatif",
            text: "L'hébergement et une ou deux activités clés sont non négociables. Les tenues assorties, les décorations personnalisées et les cadeaux élaborés sont optionnels. Sachez faire la différence avant de commencer à dépenser.",
          },
          {
            title: "Gérez les inégalités de revenus avec tact",
            text: "Si quelqu'un dans le groupe a un budget plus serré, laissez-la contribuer différemment — organiser un dîner, coordonner la logistique, prendre en charge des petits frais — plutôt que de la mettre dans l'embarras ou de la laisser se sentir exclue. La générosité fonctionne mieux que les conversations de subsides maladroites.",
          },
          {
            title: "Utilisez un suivi de budget partagé dès le premier jour",
            text: "Des outils comme le suivi de budget intégré de WePlanify permettent à tout le monde de voir ce qui a été payé, ce qui est dû et quel sera le coût final par personne — sans que personne n'ait à chasser des tableurs ou des demandes de remboursement en fin de voyage.",
          },
        ],
      },
      timeline: {
        id: "timeline",
        title: "Planning : de l'Idée à la Soirée",
        intro:
          "La planification d'un EVJF a tendance à s'étirer pour remplir le temps qu'on lui donne — ou à se comprimer en une course contre la montre stressante si on s'y prend trop tard. Voici un planning réaliste qui fait avancer les choses sans le chaos.",
        steps: [
          {
            when: "3 mois avant",
            tasks: [
              "Confirmer la liste des participantes et obtenir des confirmations fermes",
              "Avoir la vraie conversation budget avec le groupe",
              "Se mettre d'accord sur les dates — utiliser un sondage pour trouver quand tout le monde est disponible",
              "Choisir le type de destination selon les vraies préférences de la mariée",
              "Réserver l'hébergement (c'est ce qui fixe tout le reste)",
              "Créer un espace de planification partagé pour que tout le monde suive l'avancement",
            ],
          },
          {
            when: "6 semaines avant",
            tasks: [
              "Réserver les transports — vols, train ou transfert de groupe",
              "Rechercher et présélectionner les activités — utiliser un sondage pour affiner",
              "Réserver les activités incontournables qui nécessitent une réservation anticipée",
              "Paramétrer un suivi de budget partagé et enregistrer les acomptes au fur et à mesure",
              "Confirmer les restrictions alimentaires et besoins d'accessibilité de chaque participante",
            ],
          },
          {
            when: "2 semaines avant",
            tasks: [
              "Envoyer l'itinéraire final au groupe — un seul document propre, pas un fil de messages",
              "Réserver les restaurants pour les dîners de groupe",
              "Acheter les décorations ou objets personnalisés (écharpes, etc.) si vous en utilisez",
              "Créer une liste de bagages partagée pour que chacune sache qui apporte quoi en commun",
              "Relancer les paiements en attente ou les confirmations manquantes",
            ],
          },
          {
            when: "La veille",
            tasks: [
              "Confirmer les détails d'arrivée à l'hébergement et les partager avec le groupe",
              "Préparer une petite trousse d'urgence : pansements, ibuprofène, chargeur, snacks",
              "Avoir le suivi de budget ouvert et à jour",
              "Bien dormir — vous en aurez besoin",
            ],
          },
        ],
      },
      activities: {
        id: "activities",
        title: "Les Activités",
        paragraphs: [
          "Le meilleur programme d'EVJF a une structure claire mais beaucoup d'espace pour respirer. Les voyages trop chargés ressemblent à des sorties scolaires ; les voyages trop vides dérivent vers des disputes sur quoi faire ensuite. Visez une ou deux activités phares par jour, avec du temps libre intégré pour l'improvisation.",
          "La règle d'or : assurez-vous qu'au moins une activité est choisie parce que la mariée l'aime vraiment, pas parce que c'est un classique de l'EVJF. Si elle déteste les ateliers cocktails mais adore la poterie, réservez la poterie. Si elle n'a jamais aimé les boîtes de nuit mais rêve d'un long dîner festif avec ses personnes préférées, donnez la priorité à ça. La version Instagram de l'EVJF n'est pas l'objectif.",
          "Évitez le fun forcé. Les tenues assorties, les écharpes et les voiles sont bien si la mariée est partante — mais si elle a déjà mentionné que ça la mettrait mal à l'aise, ne le faites pas. Idem pour les jeux qui visent à embarrasser la mariée ou les activités qui nécessitent que tout le monde performe son bonheur. Le fun qui demande à chacune de simuler de s'amuser tombe toujours à plat.",
        ],
        ideas: [
          {
            category: "En journée",
            items: [
              "Location de voilier ou balade en bateau privé",
              "Dégustation de vins ou de cocktails (session privée, pas le circuit touristique)",
              "Matinée spa avec soins individuels",
              "Atelier poterie, soufflage de verre ou peinture",
              "Cours de paddle, surf ou kayak",
              "Cours de cuisine avec un chef local",
              "Journée chinage dans une nouvelle ville",
            ],
          },
          {
            category: "En soirée",
            items: [
              "Chef à domicile dans votre hébergement",
              "Réservation dans le restaurant que la mariée voulait tester depuis longtemps",
              "Atelier cocktails (seulement si elle le veut vraiment)",
              "Karaoké — vraiment sous-estimé pour les groupes mixtes",
              "Soirée à l'opéra, dans un club de jazz ou à un spectacle d'humour",
              "Soirée casino basse mise, haute valeur divertissement",
            ],
          },
          {
            category: "Version tranquille",
            items: [
              "Soirée cinéma dans la villa avec le film préféré de la mariée",
              "Soirée jeux de société avec un bon vin",
              "Balade au coucher du soleil suivie d'un long dîner",
              "Séance yoga ou pilates le matin",
              "Brunch au marché local",
            ],
          },
        ],
        outro:
          "Votez sur les activités via un sondage de groupe avant de réserver quoi que ce soit — ça évite le classique où l'organisatrice réserve quelque chose d'onéreux et deux personnes détestent ça. La fonctionnalité sondages de WePlanify prend trente secondes à configurer et donne une voix égale à chacune, sans débat de soixante messages dans le groupe.",
      },
    },

    faq: {
      title: "Questions Fréquentes",
      items: [
        {
          q: "Combien de temps à l'avance faut-il organiser un EVJF ?",
          a: "Pour un week-end en voyage, trois mois c'est confortable — ça laisse le temps d'aligner les agendas de tout le monde, de réserver l'hébergement avant que les prix s'envolent et d'organiser les activités sans se précipiter. Si vous planifiez quelque chose de plus ambitieux (vols internationaux, location de villa, destinations à forte demande), prévoyez quatre à cinq mois. Pour une soirée locale ou un staycation simple, six semaines suffisent généralement. La plus grosse erreur, c'est d'attendre deux mois avant le mariage, quand l'agenda de tout le monde est déjà bloqué par les essayages de robes et les autres événements du mariage.",
        },
        {
          q: "Comment gérer les budgets différents dans le groupe ?",
          a: "Abordez le sujet tôt et en privé. Demandez à chaque personne individuellement ce qu'elle est à l'aise de dépenser — pas dans un message de groupe où la pression sociale fausse les réponses. Trouvez la médiane et planifiez autour. Proposez des options supplémentaires payantes pour celles qui veulent dépenser plus, plutôt que de planifier un voyage cher en espérant que tout le monde se débrouille. Si quelqu'un ne peut vraiment pas se permettre le voyage tel qu'il est planifié, laissez-la contribuer différemment — coordonner la logistique, gérer la communication, prendre en charge un coût plus modeste — plutôt que de la mettre dans une situation inconfortable.",
        },
        {
          q: "Quel est un bon budget par personne pour un EVJF ?",
          a: "Pour un city break en Europe, comptez entre 300 et 600 € par personne pour un séjour de trois nuits incluant transport, hébergement et quelques activités en optimisant les dépenses. Les séjours plage ou villa en Europe du Sud tournent entre 400 et 800 € par personne pour un long week-end. Les destinations de bord de mer françaises (Biarritz, Côte d'Azur, Bretagne) varient beaucoup selon la saison et la taille du groupe. N'oubliez pas : la future mariée ne paie traditionnellement pas sa part, donc intégrez ce coût dans votre calcul par personne dès le départ.",
        },
        {
          q: "Combien de personnes pour un EVJF ?",
          a: "Huit à dix personnes, c'est la limite pratique supérieure pour un voyage cohésif. Au-delà, les réservations au restaurant deviennent un cauchemar, les activités nécessitent de privatiser des espaces entiers et le groupe se fragmente inévitablement. Les grands groupes impliquent aussi plus de charge logistique — plus de personnes à coordonner, plus de variables à gérer, plus de risques que quelqu'un se désiste à la dernière minute et déséquilibre le budget. Si la liste des invitées est vraiment de quinze personnes ou plus, envisagez de diviser en deux groupes avec deux séjours distincts, ou choisissez un format pensé pour les grands groupes — villa avec chef, bateau privatisé, lieu entièrement loué.",
        },
        {
          q: "Et si la future mariée ne veut pas d'EVJF traditionnel ?",
          a: "Organisez ce qu'elle veut vraiment. Il n'y a aucune règle qui dit qu'un EVJF doit inclure des écharpes, des animations paillettes ou une soirée en boîte. Si elle veut un week-end spa tranquille avec trois amies, c'est ça l'EVJF. Si elle veut un séjour rando en montagne, c'est ça l'EVJF. Le mieux c'est de lui demander directement — ou de demander à son amie ou sa sœur la plus proche. Les pires EVJF sont ceux où l'organisatrice a planifié le voyage qu'elle-même voulait faire plutôt que ce qui compte vraiment pour la mariée.",
        },
        {
          q: "Comment garder tout le monde contente ?",
          a: "Vous n'y arriverez pas complètement — et essayer vous épuisera. Visez que tout le monde passe un bon moment la plupart du temps, pas le bonheur universel à chaque instant. Intégrez de la variété dans le programme : actif et relaxant, activités de groupe et temps libre, couchers tôt et soirées plus tardives. Utilisez des sondages pour les décisions collectives pour que personne ne se sente imposé quelque chose. Fixez des attentes claires dès le départ sur le budget, le niveau de formalité et ce qui est ou non prévu. Et acceptez que certaines personnes soient plus difficiles à contenter que d'autres — c'est vrai de tous les voyages de groupe, pas seulement des EVJF.",
        },
      ],
    },

    cta: {
      title: "Prêt à Organiser l'EVJF Parfait ?",
      text: "WePlanify réunit tout votre groupe au même endroit — sondages de destination, itinéraire partagé, suivi de budget et listes de bagages. Arrêtez de gérer le chaos dans un groupe WhatsApp et commencez vraiment à planifier ensemble.",
      button: "Organiser l'EVJF",
    },

    discoverMore: "Découvrir aussi",
    readMore: "En savoir plus",
  },
};

// ---------------------------------------------------------------------------
// JSON-LD Schemas
// ---------------------------------------------------------------------------

function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const schema = {
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
        name: "Blog",
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name:
          locale === "fr"
            ? "Organiser un EVJF"
            : "How to Plan a Bachelorette Party",
        item: `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function FaqJsonLd({ locale }: { locale: string }) {
  const c = locale === "fr" ? content.fr : content.en;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

function ArticleJsonLd({ locale }: { locale: string }) {
  const c = locale === "fr" ? content.fr : content.en;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
    description: locale === "fr" ? meta.fr.description : meta.en.description,
    author: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    datePublished: "2026-04-15",
    dateModified: "2026-04-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function OrganiserEvjfPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const c = locale === "fr" ? content.fr : content.en;

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

  return (
    <>
      <AuthorJsonLd />
      <BreadcrumbJsonLd locale={locale} />
      <FaqJsonLd locale={locale} />
      <ArticleJsonLd locale={locale} />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  {
                    label: locale === "fr" ? "Accueil" : "Home",
                    href: `/${locale}`,
                  },
                  {
                    label: "Blog",
                    href: `/${locale}/blog`,
                  },
                  {
                    label:
                      locale === "fr"
                        ? "Organiser un EVJF"
                        : "How to Plan a Bachelorette Party",
                  },
                ]}
              />
            </div>
            <span className="inline-block bg-[#EEF899] text-[#001E13] text-sm font-karla font-semibold px-4 py-1.5 rounded-full mb-6">
              {c.heroTag}
            </span>
            <h1 className="text-[#001E13] text-3xl lg:text-[44px] font-londrina-solid leading-tight mb-4">
              {c.h1}
            </h1>
            <p className="text-[#001E13]/60 text-sm font-karla mb-6">
              {c.readTime}
            </p>
            <p className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
              {c.intro}
            </p>
          </div>
        </header>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <AuthorBio
            locale={locale}
            publishedDate="2026-04-15"
            modifiedDate="2026-04-15"
          />
        </div>

        {/* Table of Contents */}
        <nav aria-label={c.tocTitle} className="py-10 lg:py-12 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-5">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2">
              {c.toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[#001E13]/70 hover:text-[#F6391A] font-karla text-sm lg:text-base transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Article body */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">

            {/* Section 1: Why Hard */}
            <section id={c.sections.whyHard.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.whyHard.title}
              </h2>
              <div className="space-y-4">
                {c.sections.whyHard.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2: Four Questions */}
            <section id={c.sections.fourQuestions.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.fourQuestions.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.fourQuestions.intro}
              </p>
              <div className="grid gap-4">
                {c.sections.fourQuestions.questions.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {locale === "fr"
                  ? "Besoin d'un sondage pour aligner les dates ou les préférences de destination ? "
                  : "Need a poll to align on dates or destination preferences? "}
                <Link
                  href={`/${locale}/features/polls`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {locale === "fr"
                    ? "La fonction sondages de WePlanify"
                    : "WePlanify's polls feature"}
                </Link>
                {locale === "fr"
                  ? " règle ça en trente secondes."
                  : " settles it in thirty seconds."}
              </p>
            </section>

            {/* Section 3: Destination Types */}
            <section id={c.sections.destinationTypes.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.destinationTypes.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.destinationTypes.intro}
              </p>
              <div className="space-y-6">
                {c.sections.destinationTypes.types.map((type, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8"
                  >
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-3">
                      {type.title}
                    </h3>
                    <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-4">
                      {type.text}
                    </p>
                    <p className="text-[#F6391A] font-karla font-bold text-sm">
                      {locale === "fr" ? "Idéal pour : " : "Best for: "}
                      <span className="text-[#001E13]/70 font-normal">
                        {type.bestFor}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {locale === "fr"
                  ? "Vous organisez un EVJF ? "
                  : "Planning a bachelorette trip? "}
                <Link
                  href={`/${locale}/bachelorette-trip`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {locale === "fr"
                    ? "Découvrez comment WePlanify simplifie l'EVJF de bout en bout"
                    : "See how WePlanify simplifies the whole bachelorette from start to finish"}
                </Link>
                {locale === "fr" ? "." : "."}
              </p>
            </section>

            {/* Section 4: Budget */}
            <section id={c.sections.budgetConversation.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.budgetConversation.title}
              </h2>
              <div className="space-y-4 mb-8">
                {c.sections.budgetConversation.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid gap-4">
                {c.sections.budgetConversation.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {locale === "fr"
                  ? "Le suivi de budget partagé de WePlanify est disponible ici : "
                  : "WePlanify's shared budget tracker is available here: "}
                <Link
                  href={`/${locale}/features/budget`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {locale === "fr"
                    ? "Budget partagé"
                    : "Shared budget"}
                </Link>
                {locale === "fr"
                  ? " — suivi en temps réel, calcul automatique des remboursements."
                  : " — real-time tracking, automatic reimbursement calculation."}
              </p>
            </section>

            {/* Section 5: Timeline */}
            <section id={c.sections.timeline.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.timeline.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.timeline.intro}
              </p>
              <div className="space-y-6">
                {c.sections.timeline.steps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8"
                  >
                    <h3 className="text-[#001E13] text-xl font-londrina-solid mb-4">
                      {step.when}
                    </h3>
                    <ul className="space-y-2">
                      {step.tasks.map((task, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm lg:text-base font-karla flex items-start gap-3"
                        >
                          <span className="text-[#F6391A] mt-0.5 flex-shrink-0 font-bold">
                            ·
                          </span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Activities */}
            <section id={c.sections.activities.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.activities.title}
              </h2>
              <div className="space-y-4 mb-8">
                {c.sections.activities.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {c.sections.activities.ideas.map((category, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-4">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm font-karla flex items-start gap-2"
                        >
                          <span className="text-[#F6391A] mt-0.5 flex-shrink-0">
                            +
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed">
                {c.sections.activities.outro}
              </p>
              <p className="mt-4 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {locale === "fr"
                  ? "Coordonnez aussi les bagages du groupe avec "
                  : "Coordinate group packing too with "}
                <Link
                  href={`/${locale}/features/packing`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {locale === "fr"
                    ? "les listes de bagages partagées de WePlanify"
                    : "WePlanify's shared packing lists"}
                </Link>
                {locale === "fr"
                  ? " — fini les doublons et les oublis."
                  : " — no more duplicates or forgotten items."}
              </p>
            </section>
          </div>
        </article>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* FAQ */}
        <section id="faq" className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-8">
              {c.faq.title}
            </h2>
            <div className="space-y-6">
              {c.faq.items.map((item, i) => (
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

        {/* Discover More */}
        <section className="py-16 lg:py-20 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {c.discoverMore}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Planificateur EVJF"
                      : "Bachelorette Trip Planner"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Tout ce qu'il faut pour organiser votre EVJF avec WePlanify : sondages, budget partagé et itinéraire collaboratif."
                      : "Everything you need to plan your bachelorette trip with WePlanify: polls, shared budget, and collaborative itinerary."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Voyage entre Amis"
                      : "Trip with Friends"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Organisez un voyage de groupe entre amis facilement avec WePlanify."
                      : "Plan a group trip with friends effortlessly using WePlanify."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Guide Voyage de Groupe"
                      : "Group Trip Planning Guide"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comment organiser un voyage de groupe de A à Z, étape par étape."
                      : "How to plan a group trip from start to finish, step by step."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/blog/meilleures-applications-voyage-groupe`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr"
                      ? "Meilleures Applis Voyage de Groupe"
                      : "Best Group Trip Planner Apps"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Comparatif honnête des meilleures applications pour voyager en groupe en 2026."
                      : "An honest comparison of the best apps for planning a group trip in 2026."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#F6391A] rounded-3xl p-8 lg:p-14">
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl font-londrina-solid mb-4">
                {c.cta.title}
              </h2>
              <p className="text-[#FFFBF5]/90 text-sm lg:text-base font-karla leading-relaxed mb-8 max-w-xl mx-auto">
                {c.cta.text}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#001E13] hover:bg-[#001E13]/85 text-[#FFFBF5] font-karla font-bold text-sm lg:text-base px-8 py-3.5 rounded-full transition-colors"
              >
                {c.cta.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
