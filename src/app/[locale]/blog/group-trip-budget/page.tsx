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
const PATHNAME_EN = "/blog/group-trip-budget";
const PATHNAME_FR = "/blog/budget-voyage-groupe";

const meta = {
  en: {
    title: "Group Trip Budget: How to Split Costs Without the Drama",
    description:
      "The complete guide to managing money on a group trip — setting a budget everyone agrees on, splitting costs fairly, and settling up cleanly at the end.",
  },
  fr: {
    title: "Budget Voyage de Groupe : Comment Partager les Frais Sans Galère",
    description:
      "Le guide complet pour gérer l'argent en voyage de groupe — fixer un budget, répartir les frais équitablement et solder les comptes proprement.",
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

type Section = {
  id: string;
  title: string;
  paragraphs: string[];
};

type ContentLocale = {
  readTime: string;
  heroTag: string;
  h1: string;
  intro: string;
  tocTitle: string;
  toc: { id: string; label: string }[];
  sections: {
    moneyMess: Section;
    setBudgetEarly: Section;
    splitByCategory: Section & { categories: { title: string; items: string[] }[] };
    onePayerSystem: Section;
    trackRealTime: Section;
    unequalBudgets: Section;
    settlingUp: Section;
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
    heroTag: "Money & Travel 2026",
    h1: "Group Trip Budget: How to Split Costs Without the Drama",
    intro:
      "Ask anyone who has ever traveled with a group of four or more people what the hardest part was, and money will come up within the first three answers. Not the flights, not the accommodation — money. Who paid for dinner, who still owes fifty dollars, why one person keeps ordering expensive cocktails while everyone else is splitting the tab. Group trip budgeting does not have to be a source of conflict. With the right system in place before you leave, it becomes almost invisible. This guide covers everything: setting a realistic budget, splitting costs in a way that feels fair, tracking expenses in real time, and settling up cleanly when the trip is over.",

    tocTitle: "Table of Contents",
    toc: [
      { id: "money-mess", label: "Why Group Trip Money Always Gets Messy" },
      { id: "set-budget-early", label: "Set the Budget Before You Book Anything" },
      { id: "split-by-category", label: "Split by Category, Not by Everything" },
      { id: "one-payer-system", label: "The One-Payer System" },
      { id: "track-real-time", label: "Track in Real Time, Not at the End" },
      { id: "unequal-budgets", label: "Handling Unequal Budgets in the Group" },
      { id: "settling-up", label: "Settling Up: The Clean Way" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      moneyMess: {
        id: "money-mess",
        title: "Why Group Trip Money Always Gets Messy",
        paragraphs: [
          "It starts innocently. Someone books the Airbnb because they have the card with the highest limit. Someone else buys the group train tickets to save time. A third person covers dinner because the restaurant only accepted a single payment. Before the trip is even over, one person has fronted $800 and has no idea how to ask for it back without sounding petty.",
          "The root problem is that group trips involve people with different incomes, different spending habits, and wildly different ideas of what 'reasonable' means. For one friend, $30 for a museum entry is nothing. For another, it is a significant chunk of their daily budget. Nobody talks about this before leaving, so every spending decision becomes a silent negotiation where someone always ends up feeling either guilty or resentful.",
          "Then there is the tracking problem. Nobody wants to be the person furiously typing expenses into a spreadsheet while everyone else is enjoying the sunset. So nothing gets recorded. By the last day, half the transactions are forgotten and the other half are disputed. Settling up turns into an hour-long archaeology project — and the exact moment when perfectly pleasant trips go sideways.",
          "The solution is not a complicated accounting system. It is a simple shared agreement, made before departure, on three things: how much to spend per person, which costs to split and which to pay individually, and how to log everything as it happens. Get those three things right and money stops being a source of tension.",
        ],
      },

      setBudgetEarly: {
        id: "set-budget-early",
        title: "Set the Budget Before You Book Anything",
        paragraphs: [
          "The money conversation needs to happen before you book a single thing — before the Airbnb, before the flights, before anyone buys train tickets or starts comparing restaurant menus. Once money has been spent, the budget is no longer theoretical. Real numbers create real pressure, and people who would have spoken up in a planning conversation start staying quiet to avoid conflict.",
          "The easiest way to open the conversation is with brackets. Instead of asking \"how much do you want to spend?\", which forces people to state a number and feel judged, present three options: a lean trip ($800–$1,000 per person all-in), a comfortable trip ($1,200–$1,600 per person), and a generous trip ($2,000+ per person). Ask everyone to privately pick which bracket works for them. If the group clusters around one bracket, you have your budget. If there is a wide spread, that is an important signal to address early — not on day three when someone orders a $45 main course.",
          "Once you have a rough per-person total, break it down by category. A realistic breakdown for a 7-day trip might look like: accommodation (30–35% of the budget), transportation including flights and local (30–40%), food and drinks (20–25%), activities and experiences (10–15%), and a buffer for unexpected costs (5–10%). Having these categories in writing, even in a shared note, means everyone is calibrating against the same expectations.",
          "Use WePlanify's group polls feature to vote on accommodation options and activities before committing. When the whole group decides together what to include in the budget, there is no one person to blame if something turns out to be expensive — and everyone feels ownership over the plan. Decisions made democratically are accepted more easily, including the financial ones.",
        ],
      },

      splitByCategory: {
        id: "split-by-category",
        title: "Split by Category, Not by Everything",
        paragraphs: [
          "One of the most common mistakes groups make is trying to split absolutely every expense equally — or, conversely, having everyone pay for themselves all the time. Both extremes create friction. The first leads to resentment when consumption is unequal. The second makes every meal feel like a transaction and defeats the point of traveling together.",
          "The smarter approach is to split by category. Some costs are genuinely shared and should be split equally. Others are personal and should be paid individually. Drawing this line clearly before the trip starts removes 90% of the awkward conversations.",
          "The categories below are a proven starting framework. Adjust them to fit your group, but the key is to agree on them before you leave.",
        ],
        categories: [
          {
            title: "Split equally (shared costs)",
            items: [
              "Accommodation — Airbnb, hotel, hostel dorms. Everyone benefits equally regardless of the size of their room.",
              "Group transport — rental car, train tickets booked together, airport transfers for the whole group.",
              "Group activities — tours, museum entries, tickets for experiences the whole group attends.",
              "Groceries for shared meals — if the group cooks together, split the shopping bill.",
            ],
          },
          {
            title: "Pay individually (personal costs)",
            items: [
              "Personal meals when the group eats at different restaurants or orders different things.",
              "Personal drinks — especially alcohol, where consumption varies enormously.",
              "Souvenirs, personal shopping, and anything that only benefits one person.",
              "Personal transport — taxis to a separate activity, solo day trips.",
            ],
          },
        ],
      },

      onePayerSystem: {
        id: "one-payer-system",
        title: "The One-Payer System",
        paragraphs: [
          "Splitting the bill at the moment of payment — everyone fumbling for cards while the waiter waits — is slow, awkward, and error-prone. A much cleaner approach is the one-payer system: one person pays for a shared expense, logs it immediately in a shared tracker, and the group settles up at the end of the trip.",
          "The key word is 'immediately.' The system only works if the person who pays logs it on the spot, before anyone has moved on or forgotten the amount. This means having a shared budget tracker open and accessible at all times — not a mental note to add it to the spreadsheet later. WePlanify's shared budget tracker is built for exactly this: one tap to log a new expense, select who paid and who it was for, and everyone sees it instantly.",
          "To keep things fair, rotate who pays over the course of the trip. One person covers dinner, another covers the next activity, a third covers the museum tickets. If the amounts are logged accurately, the imbalances will even out by the end — and if they do not, the final settlement will be a handful of transfers rather than a forensic accounting exercise.",
          "A simple rule: if you pay for something shared and do not log it within five minutes, you have probably lost it. Build the habit early, on day one, so it becomes automatic.",
        ],
      },

      trackRealTime: {
        id: "track-real-time",
        title: "Track in Real Time, Not at the End",
        paragraphs: [
          "Every group that has waited until the last night to 'figure out the money' has regretted it. Memories are unreliable, amounts get rounded, and one person always feels like they contributed more than the numbers show. The last evening of a trip is the worst possible time to have a financial reconciliation — everyone is tired, some people are already calculating their flights, and the emotional goodwill of the trip is at its most fragile.",
          "Real-time tracking solves this completely. When every expense is logged as it happens, there is no reconciliation to do at the end. The numbers are already there. Everyone has been watching the running total throughout the trip, so nothing comes as a surprise. The final settlement is a formality, not a negotiation.",
          "The practical requirement is a tracker that everyone can see and contribute to from their phone. A shared spreadsheet technically works but requires a level of discipline and mobile usability that most groups do not maintain. Dedicated tools like WePlanify's budget tracker are designed for this: add an expense in ten seconds, see who owes what in real time, get a settlement summary at any point. It removes the friction that causes people to stop tracking in the first place.",
          "Set a daily or two-day check-in habit where someone looks at the running totals and flags any expenses that were missed. On a 7-day trip, a two-minute review every other day catches any gaps and keeps everyone aligned. It also builds a shared sense of where the trip stands financially — so nobody gets a shock at the end.",
          "For road trips specifically, track fuel and tolls as a shared expense from the start. Gas costs can add up to $200–$400 for a week-long road trip and are easy to forget if the driver keeps paying and assuming they will get reimbursed later. Log every fill-up immediately. Check out our road trip planning guide for more specific tips on managing shared costs on the road.",
        ],
      },

      unequalBudgets: {
        id: "unequal-budgets",
        title: "Handling Unequal Budgets in the Group",
        paragraphs: [
          "Almost every friend group has at least one person who is in a different financial situation than the others. Maybe they are between jobs, saving for something big, or simply earn less. This is normal, and it does not have to mean they get left out — but it does require a bit of intentional design in how you structure the trip.",
          "The first rule is to make space for the conversation before the trip, not during it. If you know someone in the group has a tighter budget, reach out privately and ask what range feels comfortable for them. This is not charity — it is good group dynamics. A trip where one person is stressed about money the whole time is worse for everyone.",
          "For accommodation, look for options where cost does not vary by individual. Renting a house or large Airbnb and splitting it equally is often cheaper per person than individual hotel rooms, and it means no one is paying more than anyone else for their sleeping situation. When everyone is in the same space, there is no visible tier system.",
          "For meals and activities, design a mix. Plan some group meals at mid-range restaurants where the bill splits easily, and make individual payment the default for anything higher-end. If the group wants to do an expensive activity — a cooking class, a boat trip, a Michelin-starred dinner — make it optional and have an equally good alternative for those who pass. This structure means no one has to explain themselves or feel the spotlight.",
          "One practical technique: at the start of the trip, agree on a daily shared expenses cap per person. Something like $50/day covers accommodation share, shared transport, and one group meal. Anything above that is individual choice and individual cost. This cap creates a predictable floor that everyone can commit to, while leaving room for those who want to spend more to do so freely.",
        ],
      },

      settlingUp: {
        id: "settling-up",
        title: "Settling Up: The Clean Way",
        paragraphs: [
          "The ideal time to settle up is before you leave for the airport or the day after you get back — while the trip is still fresh, the numbers are still visible, and the goodwill is still intact. Waiting a week or more creates friction: people get busy, memories fade, and a $45 debt starts to feel either too small to bring up or too large to ignore.",
          "The goal of settling up is to minimize the number of transfers. If six people each owe different amounts to different people, the naive approach would require up to fifteen separate transactions. A smart tracker calculates the minimum number of transfers needed to bring everyone to zero — usually two or three per person for a typical group trip.",
          "Here is how to read the final settlement: the tracker shows a net balance for each person — positive means they are owed money, negative means they owe. The settlement algorithm then finds the most efficient path from every negative balance to every positive one. Person A owes $85 and Person B is owed $90, so A pays B $85. Done. Person C is owed $40, Person D owes $15, Person E owes $25: D pays C $15, E pays C $25. Three transactions instead of a tangled web.",
          "The settlement works best when everyone confirms receipt of their transfer on the day it happens. A simple message in the group chat — 'sent $85, done' — closes the loop publicly and prevents anyone from wondering if they need to follow up. Within 48 hours of the trip ending, every balance should be zero.",
          "One final note: do the settlement before the memories of who paid what start to drift. Financial clarity at the end of a trip is what makes you actually want to travel with these people again.",
        ],
      },
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "How do you split trip costs fairly between friends?",
          a: "The fairest approach is to split shared costs (accommodation, group transport, group activities) equally, and let everyone pay individually for personal expenses like individual meals and drinks. Agree on these categories before the trip starts, log every shared expense as it happens using a shared tracker, and settle up at the end based on who paid what. This avoids the two extremes of splitting everything equally (which penalizes light spenders) or everyone paying for themselves (which makes the trip feel transactional).",
        },
        {
          q: "What's the best app to track group trip expenses?",
          a: "For a dedicated group trip experience, WePlanify's built-in budget tracker is designed specifically for travel groups — it logs expenses in real time, tracks who paid and who participated, and calculates a settlement at the end. Splitwise is the best pure expense-splitting tool and handles multiple currencies well. The key is to use something everyone in the group will actually open on their phone. A tool that three out of six people use is worse than a simpler one that all six use consistently.",
        },
        {
          q: "Should everyone pay the same amount on a group trip?",
          a: "For shared costs like accommodation and group transport, yes — splitting equally is fairest because everyone benefits the same. For personal spending like individual meals, drinks, and activities, no — people should pay their own way. The practical solution is to track shared expenses in a pool and let personal spending be individual. If there are meaningful income differences in the group, set a daily cap for shared expenses that everyone can comfortably meet, and let higher-spending individuals cover their extras themselves.",
        },
        {
          q: "How do you handle someone who doesn't pay their share?",
          a: "Prevention is better than cure: use a shared tracker that everyone can see so balances are transparent throughout the trip, not just at the end. When someone can see in real time that they owe $200, they are more likely to address it before it becomes a bigger number. If someone genuinely cannot pay after the trip, address it privately and directly — not in the group chat. Set a specific deadline ('can you send this by Sunday?') rather than a vague 'whenever you can.' For future trips, some groups ask everyone to contribute to a shared trip fund before departure, so there is no settling up at the end.",
        },
        {
          q: "What costs should you split equally vs. individually?",
          a: "Split equally: accommodation, rental cars, group transport (trains, airport transfers), shared groceries for group meals, and any activity the whole group does together. Pay individually: personal restaurant meals, alcoholic drinks, souvenirs, personal transport (a solo taxi, an extra activity), and anything that only benefits one person. The general rule is: if it would be weird for one person to not participate in it, split it. If it is a personal choice, pay for it yourself.",
        },
        {
          q: "When should you settle up on a group trip?",
          a: "Ideally on the last day of the trip or within 24–48 hours of returning home, while everything is still fresh and the goodwill of the trip is intact. Use a shared tracker that calculates the minimum number of transfers needed — this keeps it fast and painless. Confirm each payment in the group chat so everyone knows when their balance is cleared. Waiting longer than a week makes the conversation harder and the numbers murkier. Set a firm deadline as a group before you leave.",
        },
      ],
    },

    cta: {
      title: "Ready to Take the Stress Out of Group Trip Money?",
      text: "WePlanify's shared budget tracker lets your group log expenses in real time, see who owes what, and settle up cleanly at the end — all in the same app where you build your itinerary, run polls, and coordinate packing.",
      button: "Start Tracking Together",
    },

    discoverMore: "Discover More",
    readMore: "Read more",
  },

  fr: {
    readTime: "9 min de lecture",
    heroTag: "Argent & Voyage 2026",
    h1: "Budget Voyage de Groupe : Comment Partager les Frais Sans Galère",
    intro:
      "Demandez à quelqu'un qui a voyagé en groupe de quatre personnes ou plus quelle a été la partie la plus difficile, et l'argent ressortira dans les trois premières réponses. Pas les vols, pas l'hébergement — l'argent. Qui a payé le dîner, qui doit encore quarante euros, pourquoi quelqu'un commande des cocktails à douze euros alors que les autres divisent l'addition. Le budget d'un voyage de groupe n'a pas à être une source de conflit. Avec un bon système en place avant le départ, ça devient presque invisible. Ce guide couvre tout : fixer un budget réaliste, répartir les frais de manière équitable, suivre les dépenses en temps réel, et solder les comptes proprement à la fin du voyage.",

    tocTitle: "Sommaire",
    toc: [
      { id: "money-mess", label: "Pourquoi l'argent tourne toujours au chaos" },
      { id: "set-budget-early", label: "Fixer le budget avant de réserver quoi que ce soit" },
      { id: "split-by-category", label: "Diviser par catégorie, pas par tout" },
      { id: "one-payer-system", label: "Le système du payeur tournant" },
      { id: "track-real-time", label: "Suivre en temps réel, pas à la fin" },
      { id: "unequal-budgets", label: "Gérer les budgets inégaux dans le groupe" },
      { id: "settling-up", label: "Solder les comptes : la méthode propre" },
      { id: "faq", label: "FAQ" },
    ],

    sections: {
      moneyMess: {
        id: "money-mess",
        title: "Pourquoi l'Argent en Voyage de Groupe Tourne Toujours au Chaos",
        paragraphs: [
          "Ça commence innocemment. Quelqu'un réserve l'Airbnb parce qu'il a la carte avec le meilleur plafond. Un autre achète les billets de train du groupe pour gagner du temps. Un troisième règle le dîner parce que le restaurant n'acceptait qu'un seul paiement. Avant même la fin du voyage, une personne a avancé 700 € et ne sait pas comment demander à se faire rembourser sans passer pour radine.",
          "Le problème de fond, c'est que les voyages de groupe impliquent des gens avec des revenus différents, des habitudes de dépense différentes, et des idées radicalement différentes de ce que signifie « raisonnable ». Pour un ami, 30 € l'entrée de musée, c'est rien. Pour un autre, c'est une part significative de son budget journalier. Personne n'en parle avant le départ, alors chaque décision de dépense devient une négociation silencieuse où quelqu'un finit toujours par se sentir coupable ou frustré.",
          "Ensuite, il y a le problème du suivi. Personne ne veut être la personne qui tape furieusement des dépenses dans un tableur pendant que tout le monde profite du coucher de soleil. Alors rien n'est enregistré. Le dernier jour, la moitié des transactions sont oubliées et l'autre moitié sont contestées. Solder les comptes devient un exercice archéologique d'une heure — et c'est exactement le moment où les voyages parfaitement agréables tournent mal.",
          "La solution n'est pas un système comptable compliqué. C'est un accord simple, pris avant le départ, sur trois choses : combien dépenser par personne, quels frais partager et lesquels payer individuellement, et comment tout enregistrer au fil de l'eau. Ces trois choses bien faites, et l'argent cesse d'être une source de tension.",
        ],
      },

      setBudgetEarly: {
        id: "set-budget-early",
        title: "Fixer le Budget Avant de Réserver Quoi Que Ce Soit",
        paragraphs: [
          "La conversation sur l'argent doit avoir lieu avant de réserver quoi que ce soit — avant l'Airbnb, avant les vols, avant que quelqu'un achète des billets de train ou commence à comparer des menus de restaurant. Une fois que l'argent est dépensé, le budget n'est plus théorique. Les chiffres réels créent une pression réelle, et les gens qui auraient parlé en phase de planification commencent à se taire pour éviter le conflit.",
          "La façon la plus simple d'ouvrir la conversation, c'est par des fourchettes. Plutôt que de demander « combien tu veux dépenser ? », ce qui force les gens à annoncer un chiffre et à se sentir jugés, présentez trois options : un voyage léger (600–900 € par personne tout compris), un voyage confortable (1 000–1 400 €), un voyage généreux (1 800 € et plus). Demandez à chacun de choisir en privé la fourchette qui lui convient. Si le groupe se concentre autour d'une fourchette, vous avez votre budget. S'il y a un grand écart, c'est un signal important à traiter tôt — pas le troisième jour quand quelqu'un commande un plat à 38 €.",
          "Une fois que vous avez un total approximatif par personne, décomposez-le par catégorie. Une répartition réaliste pour 7 jours pourrait ressembler à : hébergement (30–35 % du budget), transport incluant avions et déplacements locaux (30–40 %), nourriture et boissons (20–25 %), activités et expériences (10–15 %), et une marge pour les imprévus (5–10 %). Avoir ces catégories par écrit, même dans une note partagée, signifie que tout le monde calibre ses attentes sur les mêmes bases.",
          "Utilisez la fonctionnalité de sondages de groupe de WePlanify pour voter sur les options d'hébergement et les activités avant de vous engager. Quand tout le groupe décide ensemble ce qu'il faut inclure dans le budget, il n'y a pas une seule personne à blâmer si quelque chose s'avère cher — et tout le monde se sent propriétaire du plan. Les décisions prises démocratiquement sont plus facilement acceptées, y compris les financières.",
        ],
      },

      splitByCategory: {
        id: "split-by-category",
        title: "Diviser par Catégorie, Pas par Tout",
        paragraphs: [
          "Une des erreurs les plus courantes des groupes est d'essayer de partager absolument toutes les dépenses à égalité — ou, à l'inverse, que chacun paie pour lui-même tout le temps. Les deux extrêmes créent des frictions. Le premier mène au ressentiment quand la consommation est inégale. Le second donne à chaque repas l'impression d'une transaction et va à l'encontre de l'intérêt de voyager ensemble.",
          "L'approche plus intelligente consiste à diviser par catégorie. Certains frais sont genuinement partagés et doivent être divisés à égalité. D'autres sont personnels et doivent être payés individuellement. Tracer cette ligne clairement avant le voyage supprime 90 % des conversations gênantes.",
          "Les catégories ci-dessous constituent un cadre de départ éprouvé. Adaptez-les à votre groupe, mais l'essentiel est de les convenir avant de partir.",
        ],
        categories: [
          {
            title: "À diviser à égalité (frais partagés)",
            items: [
              "Hébergement — Airbnb, hôtel, dortoir d'auberge. Tout le monde en bénéficie de la même façon quelle que soit la taille de la chambre.",
              "Transport de groupe — voiture de location, billets de train réservés ensemble, transferts aéroport pour tout le groupe.",
              "Activités de groupe — visites guidées, entrées de musée, billets pour des expériences auxquelles tout le groupe participe.",
              "Courses pour les repas partagés — si le groupe cuisine ensemble, divisez la note du supermarché.",
            ],
          },
          {
            title: "À payer individuellement (frais personnels)",
            items: [
              "Repas personnels quand le groupe mange dans des restaurants différents ou commande des choses différentes.",
              "Boissons personnelles — surtout l'alcool, dont la consommation varie énormément.",
              "Souvenirs, achats personnels, et tout ce qui ne bénéficie qu'à une seule personne.",
              "Transport personnel — taxis pour une activité séparée, excursions en solo.",
            ],
          },
        ],
      },

      onePayerSystem: {
        id: "one-payer-system",
        title: "Le Système du Payeur Tournant",
        paragraphs: [
          "Diviser l'addition au moment du paiement — tout le monde fouillant ses poches pendant que le serveur attend — c'est lent, gênant et source d'erreurs. Une approche bien plus propre est le système du payeur tournant : une personne paie pour une dépense partagée, l'enregistre immédiatement dans un suivi partagé, et le groupe solde les comptes à la fin du voyage.",
          "Le mot clé, c'est « immédiatement ». Le système ne fonctionne que si la personne qui paie l'enregistre sur le moment, avant que quiconque soit passé à autre chose ou ait oublié le montant. Cela signifie avoir un outil de suivi de budget partagé ouvert et accessible en permanence — pas une note mentale pour l'ajouter au tableur plus tard. Le suivi de budget partagé de WePlanify est conçu exactement pour ça : une pression pour enregistrer une nouvelle dépense, sélectionner qui a payé et pour qui, et tout le monde le voit instantanément.",
          "Pour que les choses restent équitables, faites tourner qui paie au fil du voyage. Une personne couvre le dîner, une autre couvre l'activité suivante, une troisième couvre les billets de musée. Si les montants sont enregistrés avec précision, les déséquilibres s'équilibreront à la fin — et s'ils ne le font pas, le règlement final sera quelques virements plutôt qu'un exercice comptable forensique.",
          "Une règle simple : si vous payez quelque chose de partagé et ne l'enregistrez pas dans les cinq minutes, vous l'avez probablement perdu. Établissez cette habitude tôt, dès le premier jour, pour qu'elle devienne automatique.",
        ],
      },

      trackRealTime: {
        id: "track-real-time",
        title: "Suivre en Temps Réel, Pas à la Fin",
        paragraphs: [
          "Chaque groupe qui a attendu la dernière nuit pour « régler l'argent » l'a regretté. Les souvenirs sont peu fiables, les montants sont arrondis, et quelqu'un finit toujours par avoir l'impression d'avoir plus contribué que ce que les chiffres montrent. La dernière soirée d'un voyage est le pire moment pour une réconciliation financière — tout le monde est fatigué, certains calculent déjà leur vol, et la bonne volonté émotionnelle du voyage est à son plus fragile.",
          "Le suivi en temps réel résout cela complètement. Quand chaque dépense est enregistrée au moment où elle se produit, il n'y a pas de réconciliation à faire à la fin. Les chiffres sont déjà là. Tout le monde a suivi le total courant tout au long du voyage, donc rien n'est une surprise. Le règlement final est une formalité, pas une négociation.",
          "La contrainte pratique est un outil de suivi que tout le monde peut voir et alimenter depuis son téléphone. Un tableur partagé fonctionne techniquement mais nécessite un niveau de discipline et de convivialité mobile que la plupart des groupes ne maintiennent pas. Des outils dédiés comme le suivi de budget de WePlanify sont conçus pour ça : ajouter une dépense en dix secondes, voir qui doit quoi en temps réel, obtenir un résumé de règlement à tout moment. Ça supprime le frottement qui pousse les gens à arrêter de suivre.",
          "Prenez l'habitude d'un bilan quotidien ou tous les deux jours où quelqu'un regarde les totaux en cours et signale les dépenses manquantes. Sur un voyage de 7 jours, une révision de deux minutes tous les deux jours comble les lacunes et maintient tout le monde aligné. Ça construit aussi une conscience collective de la situation financière du voyage — pour que personne ne soit surpris à la fin.",
          "Pour les road trips en particulier, enregistrez le carburant et les péages comme une dépense partagée dès le début. Les frais d'essence peuvent atteindre 200–400 € pour un road trip d'une semaine et sont faciles à oublier si le conducteur continue de payer en supposant qu'il sera remboursé plus tard. Enregistrez chaque plein immédiatement. Consultez notre guide de planification de road trip pour des conseils plus spécifiques sur la gestion des frais partagés sur la route.",
        ],
      },

      unequalBudgets: {
        id: "unequal-budgets",
        title: "Gérer les Budgets Inégaux dans le Groupe",
        paragraphs: [
          "Presque chaque groupe d'amis a au moins une personne dans une situation financière différente des autres. Peut-être qu'elle est entre deux emplois, qu'elle économise pour quelque chose d'important, ou qu'elle gagne simplement moins. C'est normal, et ça ne veut pas dire qu'elle doit être exclue — mais ça demande un peu de conception intentionnelle dans la structure du voyage.",
          "La première règle est de créer l'espace pour cette conversation avant le voyage, pas pendant. Si vous savez que quelqu'un dans le groupe a un budget plus serré, contactez-le en privé et demandez quelle fourchette lui convient. Ce n'est pas de la charité — c'est une bonne dynamique de groupe. Un voyage où une personne est stressée par l'argent en permanence est pire pour tout le monde.",
          "Pour l'hébergement, cherchez des options où le coût ne varie pas selon les individus. Louer une maison ou un grand Airbnb et le diviser à égalité est souvent moins cher par personne que des chambres d'hôtel individuelles, et ça signifie que personne ne paie plus qu'un autre pour sa situation de sommeil. Quand tout le monde est dans le même espace, il n'y a pas de système de niveaux visible.",
          "Pour les repas et les activités, concevez un mélange. Planifiez des repas de groupe dans des restaurants de gamme moyenne où l'addition se divise facilement, et faites du paiement individuel la norme pour tout ce qui est plus haut de gamme. Si le groupe veut faire une activité chère — un cours de cuisine, une sortie en bateau, un dîner gastronomique — rendez-la optionnelle et prévoyez une alternative tout aussi bonne pour ceux qui passent. Cette structure signifie que personne ne doit se justifier ou se sentir dans le collimateur.",
          "Une technique pratique : au début du voyage, convenez d'un plafond de dépenses partagées journalier par personne. Quelque chose comme 50 €/jour couvre la part d'hébergement, le transport partagé et un repas de groupe. Tout ce qui dépasse est un choix individuel et un coût individuel. Ce plafond crée un plancher prévisible auquel tout le monde peut s'engager, tout en laissant de la place à ceux qui veulent dépenser plus de le faire librement.",
        ],
      },

      settlingUp: {
        id: "settling-up",
        title: "Solder les Comptes : la Méthode Propre",
        paragraphs: [
          "Le moment idéal pour solder les comptes, c'est avant de partir pour l'aéroport ou le lendemain du retour — pendant que le voyage est encore frais, que les chiffres sont encore visibles, et que la bonne volonté est encore intacte. Attendre une semaine ou plus crée des frictions : les gens s'occupent, les souvenirs s'estompent, et une dette de 40 € commence à sembler soit trop petite pour en parler, soit trop grande pour l'ignorer.",
          "L'objectif du règlement est de minimiser le nombre de virements. Si six personnes doivent des montants différents à des personnes différentes, l'approche naïve nécessiterait jusqu'à quinze transactions séparées. Un outil de suivi intelligent calcule le nombre minimum de virements nécessaires pour ramener tout le monde à zéro — généralement deux ou trois par personne pour un voyage de groupe classique.",
          "Voici comment lire le règlement final : l'outil affiche un solde net pour chaque personne — positif signifie qu'on lui doit de l'argent, négatif signifie qu'elle en doit. L'algorithme de règlement trouve ensuite le chemin le plus efficace de chaque solde négatif vers chaque solde positif. La personne A doit 85 € et la personne B est créancière de 90 € : A paie B 85 €. Terminé. La personne C est créancière de 40 €, la personne D doit 15 €, la personne E doit 25 € : D paie C 15 €, E paie C 25 €. Trois transactions au lieu d'un enchevêtrement.",
          "Le règlement fonctionne mieux quand chacun confirme la réception de son virement le jour même. Un simple message dans le groupe — « viré 85 €, c'est bon » — clôture la boucle publiquement et évite à quiconque de se demander s'il faut relancer. Dans les 48 heures suivant la fin du voyage, chaque solde devrait être à zéro.",
          "Une dernière note : faites le règlement avant que les souvenirs de qui a payé quoi ne commencent à s'estomper. La clarté financière à la fin d'un voyage, c'est ce qui vous donne vraiment envie de repartir avec ces personnes.",
        ],
      },
    },

    faq: {
      title: "Questions Fréquentes",
      items: [
        {
          q: "Comment répartir les frais de voyage équitablement entre amis ?",
          a: "L'approche la plus équitable est de diviser les frais partagés (hébergement, transport de groupe, activités collectives) à égalité, et de laisser chacun payer individuellement ses dépenses personnelles comme les repas individuels et les boissons. Convenez de ces catégories avant le voyage, enregistrez chaque dépense partagée au fil de l'eau avec un outil partagé, et soldez les comptes à la fin selon qui a payé quoi. Cela évite les deux extrêmes : tout diviser à égalité (ce qui pénalise les petits consommateurs) ou chacun pour soi (ce qui donne une impression de transaction permanente).",
        },
        {
          q: "Quelle est la meilleure appli pour suivre les dépenses en groupe ?",
          a: "Pour une expérience de voyage de groupe complète, le suivi de budget intégré de WePlanify est conçu spécifiquement pour les groupes de voyageurs — il enregistre les dépenses en temps réel, suit qui a payé et qui a participé, et calcule un règlement à la fin. Splitwise est le meilleur outil de partage de dépenses pur et gère bien les devises multiples. L'essentiel est d'utiliser quelque chose que tout le monde dans le groupe ouvrira vraiment sur son téléphone. Un outil que trois personnes sur six utilisent est pire qu'un outil plus simple que les six utilisent régulièrement.",
        },
        {
          q: "Tout le monde doit-il payer la même chose en voyage de groupe ?",
          a: "Pour les frais partagés comme l'hébergement et le transport de groupe, oui — diviser à égalité est le plus juste parce que tout le monde en bénéficie de la même façon. Pour les dépenses personnelles comme les repas individuels, les boissons et les activités, non — chacun doit payer pour lui-même. La solution pratique est de suivre les dépenses partagées dans une cagnotte commune et de laisser les dépenses personnelles être individuelles. S'il y a des différences de revenus significatives dans le groupe, fixez un plafond journalier pour les dépenses partagées que tout le monde peut confortablement assumer, et laissez les individus qui dépensent plus couvrir leurs extras eux-mêmes.",
        },
        {
          q: "Comment gérer quelqu'un qui ne rembourse pas sa part ?",
          a: "La prévention vaut mieux que la guérison : utilisez un outil de suivi partagé que tout le monde peut voir pour que les soldes soient transparents tout au long du voyage, pas seulement à la fin. Quand quelqu'un peut voir en temps réel qu'il doit 150 €, il est plus susceptible d'agir avant que ça devienne un montant plus important. Si quelqu'un ne peut vraiment pas payer après le voyage, abordez-le en privé et directement — pas dans le groupe. Fixez une échéance précise (« tu peux envoyer ça d'ici dimanche ? ») plutôt qu'un vague « quand tu peux ». Pour les voyages futurs, certains groupes demandent à chacun de contribuer à une cagnotte commune avant le départ, ce qui évite tout règlement à la fin.",
        },
        {
          q: "Quels frais partager à égalité et lesquels payer individuellement ?",
          a: "À partager à égalité : hébergement, voitures de location, transport de groupe (trains, transferts aéroport), courses pour les repas collectifs, et toute activité à laquelle tout le groupe participe ensemble. À payer individuellement : repas personnels au restaurant, boissons alcoolisées, souvenirs, transport personnel (un taxi solo, une activité supplémentaire), et tout ce qui ne bénéficie qu'à une seule personne. La règle générale : si ce serait bizarre qu'une personne n'y participe pas, divisez. Si c'est un choix personnel, payez-le vous-même.",
        },
        {
          q: "Quand solder les comptes en voyage de groupe ?",
          a: "Idéalement le dernier jour du voyage ou dans les 24 à 48 heures suivant le retour, pendant que tout est encore frais et que la bonne volonté du voyage est intacte. Utilisez un outil de suivi qui calcule le nombre minimum de virements nécessaires — ça garde les choses rapides et indolores. Confirmez chaque paiement dans le groupe pour que tout le monde sache quand son solde est soldé. Attendre plus d'une semaine rend la conversation plus difficile et les chiffres plus flous. Fixez une échéance ferme en groupe avant de partir.",
        },
      ],
    },

    cta: {
      title: "Prêt à gérer le budget de votre voyage sans stress ?",
      text: "Le suivi de budget partagé de WePlanify permet à votre groupe d'enregistrer les dépenses en temps réel, de voir qui doit quoi, et de solder les comptes proprement — le tout dans la même appli où vous construisez votre itinéraire, lancez des sondages et coordonnez les bagages.",
      button: "Commencer à suivre ensemble",
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
            ? "Budget voyage de groupe"
            : "Group trip budget",
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

export default async function GroupTripBudgetPage({ params }: Props) {
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
                        ? "Budget voyage de groupe"
                        : "Group trip budget",
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

        {/* Article Sections */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">

            {/* Section 1: Why it gets messy */}
            <section id={c.sections.moneyMess.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.moneyMess.title}
              </h2>
              <div className="space-y-4">
                {c.sections.moneyMess.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2: Set budget early */}
            <section id={c.sections.setBudgetEarly.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.setBudgetEarly.title}
              </h2>
              <div className="space-y-4">
                {c.sections.setBudgetEarly.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 bg-[#EEF899]/40 border border-[#EEF899] rounded-2xl p-5">
                <p className="text-[#001E13]/80 text-sm font-karla leading-relaxed">
                  {locale === "fr"
                    ? "Conseil : utilisez les sondages de groupe de WePlanify pour voter sur les destinations et les activités et aligner les attentes avant de vous engager sur quoi que ce soit."
                    : "Tip: use WePlanify's group polls to vote on destinations and activities and align expectations before committing to anything."}{" "}
                  <Link
                    href={`/${locale}/features/polls`}
                    className="text-[#F6391A] font-semibold hover:underline"
                  >
                    {locale === "fr" ? "Essayer les sondages" : "Try group polls"} →
                  </Link>
                </p>
              </div>
            </section>

            {/* Section 3: Split by category */}
            <section id={c.sections.splitByCategory.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.splitByCategory.title}
              </h2>
              <div className="space-y-4 mb-8">
                {c.sections.splitByCategory.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {c.sections.splitByCategory.categories.map((cat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-base font-londrina-solid mb-4">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2">
                      {cat.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm font-karla leading-relaxed flex items-start gap-2"
                        >
                          <span className={`mt-0.5 flex-shrink-0 font-bold ${i === 0 ? "text-green-600" : "text-[#F6391A]"}`}>
                            {i === 0 ? "+" : "−"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: One-payer system */}
            <section id={c.sections.onePayerSystem.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.onePayerSystem.title}
              </h2>
              <div className="space-y-4">
                {c.sections.onePayerSystem.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 5: Track in real time */}
            <section id={c.sections.trackRealTime.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.trackRealTime.title}
              </h2>
              <div className="space-y-4">
                {c.sections.trackRealTime.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 bg-white border border-[#001E13]/10 rounded-2xl p-5">
                <p className="text-[#001E13]/80 text-sm font-karla leading-relaxed">
                  {locale === "fr"
                    ? "Le suivi de budget partagé de WePlanify permet à chaque membre du groupe d'ajouter des dépenses en quelques secondes, depuis n'importe quel appareil."
                    : "WePlanify's shared budget tracker lets every group member add expenses in seconds, from any device."}{" "}
                  <Link
                    href={`/${locale}/features/budget`}
                    className="text-[#F6391A] font-semibold hover:underline"
                  >
                    {locale === "fr" ? "Voir le suivi de budget" : "See the budget tracker"} →
                  </Link>
                </p>
              </div>
            </section>

            {/* Section 6: Unequal budgets */}
            <section id={c.sections.unequalBudgets.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.unequalBudgets.title}
              </h2>
              <div className="space-y-4">
                {c.sections.unequalBudgets.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 7: Settling up */}
            <section id={c.sections.settlingUp.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.settlingUp.title}
              </h2>
              <div className="space-y-4">
                {c.sections.settlingUp.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
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
              <Link href={`/${locale}/features/budget`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Suivi de Budget Partagé" : "Shared Budget Tracker"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Enregistrez les dépenses en temps réel, voyez qui doit quoi, et soldez les comptes proprement avec WePlanify."
                      : "Log expenses in real time, see who owes what, and settle up cleanly with WePlanify's group budget tracker."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Découvrir le tracker" : "Explore the tracker"} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Voyage entre Amis" : "Trip with Friends"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Organisez un voyage de groupe entre amis facilement — itinéraire, sondages, budget et bagages au même endroit."
                      : "Plan a group trip with friends effortlessly — itinerary, polls, budget, and packing all in one place."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "Guide : Organiser un Voyage de Groupe" : "Guide: Plan a Group Trip"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Le guide complet pour organiser un voyage de groupe de A à Z, de la destination au départ."
                      : "The complete guide to planning a group trip from destination choice to departure day."}
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
                      ? "Comparatif honnête des meilleures applications pour planifier un voyage de groupe en 2026."
                      : "An honest comparison of the best apps to plan a group trip in 2026."}
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
