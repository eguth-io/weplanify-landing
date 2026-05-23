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
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/birthday-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const content = {
  en: {
    meta: {
      title: "Birthday Trip Planner — Plan the Ultimate Birthday Getaway | WePlanify",
      description:
        "Plan your birthday trip with WePlanify, the free birthday trip planner. Coordinate dates with your friends, vote on the destination, split the budget, and build a day-by-day itinerary — perfect for 30th, 40th, 50th milestones or any birthday getaway.",
    },
    readTime: "9 min read",
    hero: {
      tag: "Birthday Trip Planner",
      title: "Plan the Ultimate\nBirthday Trip",
      description:
        "Turning 30, 40, 50 — or just want to spend your birthday somewhere unforgettable? WePlanify is the free birthday trip planner that turns 'we should totally go away for your birthday' into an actual booked trip.",
      cta: "Start planning for free",
    },

    guideIntro: {
      title: "The Ultimate Birthday Trip Planning Guide",
      paragraphs: [
        "A birthday trip is one of the best gifts you can give yourself — or someone you love. Whether it's a milestone birthday (30th, 40th, 50th, 60th) or just a weekend escape to mark another year, getting away with the people who matter beats any party at home. But organizing a birthday trip for a group of 4 to 15 friends comes with its own quiet chaos: finding a date that works, agreeing on a destination, picking an Airbnb everyone can afford, and figuring out who's actually going to book the dinner reservations.",
        "The best birthday trips share three things: they reflect the birthday person's actual taste (not what the group thinks they should want), they respect everyone's budget so nobody drops out the week before, and they have just enough structure that the group isn't standing on a street corner at 8pm arguing about where to eat. The goal isn't to plan every hour — it's to remove the friction so the actual trip can be spontaneous.",
        "That's exactly what WePlanify was built for. One shared space where your crew can vote on the destination, lock in a date, track a shared kitty, and build a day-by-day itinerary together. Whether the birthday person is organizing their own trip with friends or a partner is secretly planning a surprise getaway, everything lives in one place — no scattered WhatsApp threads, no spreadsheets, no chasing people for €40 three weeks later.",
      ],
    },

    painPoints: {
      title: "Why Planning a Birthday Trip Always Slips",
      subtitle:
        "You said it months ago: 'let's go away for your 30th.' It's now three weeks away and nothing is booked.",
      items: [
        {
          emoji: "📅",
          title: "Nobody Commits to a Date",
          description:
            "You float a weekend in October. Three friends say 'maybe', two say 'let me check', and one ghosts entirely. By the time everyone replies, the flights have doubled and your favorite Airbnb is gone. WePlanify's date polls give the group a clear deadline to vote, and the result is instant — no chasing, no follow-up DMs, just a date everyone agreed on.",
        },
        {
          emoji: "🗺️",
          title: "Endless Destination Debate",
          description:
            "Lisbon? Marrakech? A cabin two hours away? Everyone has an opinion and the group chat becomes a stream of TikToks and Instagram reels. Two weeks pass and you still don't have a destination. Run a single poll with three to five real options, let everyone vote, and book the winner. Decision made in 48 hours instead of a month.",
        },
        {
          emoji: "💸",
          title: "Awkward Money Conversations",
          description:
            "Does the birthday person pay? Do we split their share? Who's covering the dinner? One friend Venmos €120, another pays the Airbnb deposit, a third buys the cake — and three weeks after the trip you're still trying to reconcile who owes what. The shared kitty in WePlanify logs every expense in real time and tells you instantly who owes whom.",
        },
        {
          emoji: "🍽️",
          title: "Day-Of Chaos",
          description:
            "You arrive Friday night with no dinner reservation. Saturday afternoon nobody knows what time the boat leaves. By Sunday brunch half the group is hungover and the other half wants to do the hike you didn't book. A shared day-by-day itinerary means everyone wakes up knowing the plan — and you can still leave white space for spontaneity.",
        },
      ],
    },

    features: {
      title: "WePlanify Makes Birthday Trip Planning Effortless",
      subtitle:
        "Everything you need to plan a birthday getaway with friends — in one place, with zero stress.",
      items: [
        {
          emoji: "🗳️",
          title: "Polls for Dates & Destinations",
          description:
            "Stop the endless 'when works for everyone' loop. Create a poll with the three weekends that could work, share it with the group, and watch the answers roll in. Same for the destination — three to five options, one clear winner. Anonymous voting means even the quiet friends weigh in. The group's actual preferences, not just the loudest voice in the chat.",
        },
        {
          emoji: "💰",
          title: "Shared Birthday Kitty",
          description:
            "Set a shared budget, log every expense as it happens, and let WePlanify calculate who owes what. Decide upfront whether the birthday person pays for themselves or the group covers their share — both work. The Airbnb deposit, the restaurant bill, the cake, the bottle of champagne: all tracked, all settled in one tap at the end of the trip.",
        },
        {
          emoji: "🗓️",
          title: "Day-by-Day Itinerary",
          description:
            "Build a shared schedule for the whole weekend — Friday dinner, Saturday brunch, the boat trip, the surprise restaurant, Sunday morning hike. Add times, locations, notes, links. Everyone wakes up knowing what's next, but nothing is locked in stone — drag and drop if plans change. The itinerary is the single source of truth so nobody is asking 'wait, where are we meeting again?'",
        },
        {
          emoji: "🎁",
          title: "Private Mode for Surprises",
          description:
            "Planning a surprise birthday trip for your partner, parent, or best friend? Create a private planning group without them. Coordinate dates, book the Airbnb, plan activities — all completely hidden from the birthday person. When you're ready, reveal the trip and add them to the space so they can see everything that's been organized for them.",
        },
      ],
    },

    tripIdeas: {
      title: "Birthday Trip Ideas by Style",
      subtitle: "Five birthday getaway styles to match the birthday person — and the budget.",
      items: [
        {
          emoji: "🌆",
          title: "City Break with Friends",
          description:
            "Lisbon, Barcelona, Copenhagen, Mexico City — pick a city with great food, walkable neighborhoods, and a few rooftop bars. Perfect for a 30th birthday weekend with 6 to 10 friends. Book a central apartment, plan two big group dinners, and leave afternoons free for whatever the group wants. Easy logistics, high-energy, photo-friendly.",
        },
        {
          emoji: "🏖️",
          title: "Beach & Pool House",
          description:
            "Rent a villa with a pool in the south of France, Costa Brava, Tulum, or Puglia. Lazy mornings, long lunches, sunset cocktails. This works for any age but is especially good for 35th-50th birthdays where the group wants to relax more than party. Hire a private chef one night to make it feel like a proper celebration.",
        },
        {
          emoji: "🍷",
          title: "Wine Country Weekend",
          description:
            "Tuscany, Bordeaux, the Douro Valley, Napa, Mendoza — a wine country trip is the classic 40th birthday move. Stay in an agriturismo or boutique vineyard, book one tasting per day, and eat long dinners. Smaller groups (4 to 8) work best. Use the shared kitty for tastings and dinners since the bills add up fast.",
        },
        {
          emoji: "🏔️",
          title: "Adventure Escape",
          description:
            "Hiking in the Dolomites, a road trip through Iceland, skiing in Chamonix, surfing in Portugal. For the active birthday person who would rather summit a peak than blow out candles. Pick one signature challenge for the trip — a multi-day trek, a heli-ski day, a surf camp — and build the rest of the weekend around recovery and good meals.",
        },
        {
          emoji: "🎲",
          title: "Vegas / Big City Bash",
          description:
            "Las Vegas, Miami, Ibiza, Berlin — the 'go big' birthday trip. Nightclubs, dayclubs, fancy dinners, late nights. Works best for 21st, 25th, and 30th birthdays, or any milestone where the group is up for a proper blowout. Pre-book everything (tables, transfers, the suite) because day-of logistics in a big-city party town will eat you alive.",
        },
      ],
    },

    timeline: {
      title: "When to Start Planning",
      subtitle: "A simple timeline to lock in your birthday trip without last-minute panic.",
      milestones: [
        {
          time: "4 to 6 months before",
          title: "Lock the Date & Guest List",
          description: "Poll the group for available weekends. Finalize who's in. Create your WePlanify trip and invite everyone — including the birthday person if it's not a surprise.",
        },
        {
          time: "3 months before",
          title: "Pick the Destination & Book",
          description: "Vote on the destination. Book flights and accommodation while prices are still reasonable. Set up the shared kitty with the initial deposits.",
        },
        {
          time: "1 month before",
          title: "Plan Activities & Reservations",
          description: "Run polls for activities. Book restaurants (especially the big birthday dinner). Build the day-by-day itinerary. Order any decorations, gifts, or matching outfits.",
        },
        {
          time: "1 week before",
          title: "Confirm Everything",
          description: "Re-confirm all reservations. Settle outstanding kitty contributions. Share the final itinerary with the group. Make sure someone is bringing candles.",
        },
      ],
    },

    checklist: {
      title: "Birthday Trip Planning Checklist",
      items: [
        "Confirm the date with the birthday person (or keep it secret if it's a surprise)",
        "Poll the group for available weekends",
        "Vote on a destination everyone can afford",
        "Book accommodation and transport",
        "Set a shared kitty and agree how the birthday person's share is handled",
        "Reserve the big birthday dinner well in advance",
        "Plan one or two signature activities (boat, spa, tasting, hike)",
        "Build the day-by-day itinerary in WePlanify",
        "Order the cake, candles, or any small surprises",
        "Confirm everything one week before and share the final plan",
      ],
    },

    testimonial: {
      quote:
        "I turned 40 last spring and a group of us went to Tuscany for the weekend. Booking the villa, splitting the wine tour, the dinner kitty, the airport transfers — we did it all in WePlanify and nobody had to chase money afterward. Way better than the WhatsApp chaos of every previous birthday weekend.",
      author: "Sophie L.",
      role: "Birthday trip organizer, London",
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "Is WePlanify free for planning a birthday trip?",
          a: "Yes, 100% free. Create a trip, invite the group, run polls, build the itinerary, track the shared kitty — no trial period, no credit card, no hidden fees. The whole birthday trip planner works without paying anything.",
        },
        {
          q: "Can I plan a surprise birthday trip without the birthday person seeing?",
          a: "Yes. Create a private planning group and don't invite the birthday person. Coordinate dates, vote on the destination, book the Airbnb, and plan activities — all completely hidden. When you're ready to reveal, you can add them to the trip so they see the full itinerary and what's been planned for them.",
        },
        {
          q: "How far in advance should we start planning a birthday trip?",
          a: "Four to six months is ideal for milestone birthdays (30th, 40th, 50th) where you want a real destination. Two to three months works for local weekends. The sooner the date is locked, the cheaper the flights and the better the accommodation options. Start a WePlanify trip as soon as the idea forms — even if details are vague.",
        },
        {
          q: "What's a good budget for a birthday trip?",
          a: "It depends on the destination and the group. A weekend in a European city is typically €250 to €500 per person all in. A villa in Tuscany or the south of France for a 40th can run €600 to €1200 per person. The key is to agree on a target budget upfront so nobody is surprised — the shared kitty in WePlanify keeps everyone honest as expenses come in.",
        },
        {
          q: "Should the birthday person pay for themselves?",
          a: "Both work and it's a group decision. Many groups cover the birthday person's share of the Airbnb and the big dinner as a gift; the birthday person pays for their own flight and casual meals. WePlanify lets you mark individual expenses as 'group covers' or 'individual pays' so the split is automatic. Whatever you decide, agree on it early — awkward mid-trip money conversations are the worst.",
        },
        {
          q: "How do we decide on activities when everyone wants something different?",
          a: "Run a poll with three to five concrete options for each big slot (Saturday afternoon, Sunday morning, etc.). Let the group vote and book the winner. This avoids both the stalemate problem (nobody decides) and the resentment problem (one person decides everything). It also gives the quieter friends a real say.",
        },
        {
          q: "What if some friends can only join for part of the trip?",
          a: "Totally fine — and WePlanify handles it cleanly. Mark each participant's actual dates, and when you log expenses you can specify who participated. The shared kitty automatically recalculates so people only pay for the nights and activities they were actually there for. No spreadsheet, no awkward 'I wasn't there for the dinner' negotiations.",
        },
      ],
    },

    cta: {
      title: "Ready to Plan the Best Birthday Trip Ever?",
      description:
        "Stop letting birthday trips slip from 'we should totally do this' into nothing. Start your WePlanify trip in 30 seconds — it's free.",
      button: "Start planning — it's free",
    },
  },
  fr: {
    meta: {
      title: "Voyage Anniversaire — Organisez un Anniversaire Inoubliable | WePlanify",
      description:
        "Organisez votre voyage anniversaire avec WePlanify, l'application gratuite pour planifier un week-end anniversaire entre amis. Coordonnez les dates, votez pour la destination, gérez la cagnotte commune et créez un programme jour par jour — idéal pour les 30, 40, 50 ans ou n'importe quel anniversaire à fêter ailleurs.",
    },
    readTime: "9 min de lecture",
    hero: {
      tag: "Voyage anniversaire",
      title: "Organisez le Voyage\nAnniversaire Parfait",
      description:
        "30, 40, 50 ans — ou juste envie de fêter votre anniversaire ailleurs ? WePlanify est l'application gratuite qui transforme « il faudrait qu'on parte fêter ton anniv » en voyage vraiment réservé.",
      cta: "Commencer gratuitement",
    },

    guideIntro: {
      title: "Le Guide Ultime pour Organiser un Voyage Anniversaire",
      paragraphs: [
        "Un voyage anniversaire est l'un des meilleurs cadeaux qu'on puisse se faire — ou faire à quelqu'un qu'on aime. Anniversaire-clé (30, 40, 50, 60 ans) ou simple week-end pour marquer le coup, partir avec les bonnes personnes vaut largement la fête à la maison. Mais organiser un voyage anniversaire pour un groupe de 4 à 15 amis vient avec son lot de chaos discret : trouver une date qui convient, se mettre d'accord sur la destination, choisir un Airbnb que tout le monde peut se payer, et déterminer qui va vraiment réserver le restaurant.",
        "Les meilleurs voyages anniversaire partagent trois choses : ils reflètent les goûts réels de la personne fêtée (pas ce que le groupe croit qu'elle devrait vouloir), ils respectent le budget de chacun pour que personne ne se désiste à la dernière minute, et ils ont juste assez de structure pour éviter qu'on se retrouve à 20h au coin d'une rue à débattre de l'endroit où manger. L'objectif n'est pas de planifier chaque heure — c'est d'enlever les frictions pour que le voyage lui-même reste spontané.",
        "C'est exactement pour ça que WePlanify a été conçu. Un seul espace partagé où votre groupe peut voter pour la destination, fixer une date, suivre une cagnotte commune et construire un programme jour par jour. Que la personne fêtée organise son propre voyage avec ses amis ou qu'un conjoint planifie une surprise en secret, tout vit au même endroit — pas de discussions éparpillées sur WhatsApp, pas de tableurs, pas besoin de courir après 40 € trois semaines plus tard.",
      ],
    },

    painPoints: {
      title: "Pourquoi les Voyages Anniversaire Finissent Toujours Aux Oubliettes",
      subtitle:
        "Vous en parlez depuis des mois : « on part pour tes 30 ans ». Il reste trois semaines et rien n'est réservé.",
      items: [
        {
          emoji: "📅",
          title: "Personne ne S'engage sur une Date",
          description:
            "Vous proposez un week-end en octobre. Trois amis répondent « peut-être », deux disent « je vérifie » et un disparaît. Le temps que tout le monde réponde, les vols ont doublé et votre Airbnb préféré est parti. Les sondages de dates WePlanify donnent au groupe un délai clair pour voter, et le résultat est instantané — fini les relances et les MP pour rappeler.",
        },
        {
          emoji: "🗺️",
          title: "Débat Sans Fin sur la Destination",
          description:
            "Lisbonne ? Marrakech ? Une maison à deux heures de route ? Tout le monde a un avis et le groupe se transforme en flux de TikToks et de reels Instagram. Deux semaines passent et il n'y a toujours pas de destination. Lancez un seul sondage avec trois à cinq vraies options, laissez tout le monde voter, et réservez la gagnante. Décision prise en 48h au lieu d'un mois.",
        },
        {
          emoji: "💸",
          title: "Les Conversations Gênantes sur l'Argent",
          description:
            "Est-ce que la personne fêtée paie ? On lui offre sa part ? Qui couvre le dîner ? Un ami Lydia 120 €, un autre paie l'acompte Airbnb, un troisième achète le gâteau — et trois semaines après le voyage vous essayez encore de réconcilier qui doit quoi. La cagnotte partagée WePlanify enregistre chaque dépense en temps réel et calcule instantanément qui doit combien à qui.",
        },
        {
          emoji: "🍽️",
          title: "Le Chaos du Jour J",
          description:
            "Vous arrivez vendredi soir sans réservation pour le dîner. Samedi après-midi personne ne sait à quelle heure part le bateau. Dimanche au brunch la moitié du groupe a la gueule de bois et l'autre veut faire la randonnée que vous n'avez pas réservée. Un programme partagé jour par jour permet à tout le monde de se réveiller en sachant ce qui est prévu — tout en gardant de la place pour l'imprévu.",
        },
      ],
    },

    features: {
      title: "WePlanify Simplifie l'Organisation d'un Voyage Anniversaire",
      subtitle:
        "Tout ce qu'il faut pour planifier un week-end anniversaire entre amis — au même endroit, sans prise de tête.",
      items: [
        {
          emoji: "🗳️",
          title: "Sondages pour Dates & Destinations",
          description:
            "Mettez fin à la boucle infinie du « ça arrange tout le monde ? ». Créez un sondage avec les trois week-ends possibles, partagez-le au groupe et regardez les réponses arriver. Pareil pour la destination — trois à cinq options, un seul vainqueur. Le vote anonyme permet même aux plus discrets de s'exprimer. Les vraies préférences du groupe, pas juste la voix la plus forte du chat.",
        },
        {
          emoji: "💰",
          title: "Cagnotte d'Anniversaire Partagée",
          description:
            "Définissez un budget commun, enregistrez chaque dépense au fur et à mesure, et laissez WePlanify calculer qui doit quoi. Décidez dès le départ si la personne fêtée paie sa part ou si le groupe la couvre — les deux fonctionnent. L'acompte Airbnb, l'addition du restaurant, le gâteau, la bouteille de champagne : tout est tracké, tout est soldé en un tap à la fin du voyage.",
        },
        {
          emoji: "🗓️",
          title: "Programme Jour par Jour",
          description:
            "Construisez un planning partagé pour tout le week-end — dîner vendredi, brunch samedi, sortie bateau, restaurant surprise, randonnée du dimanche matin. Ajoutez horaires, lieux, notes, liens. Tout le monde se réveille en sachant la suite, mais rien n'est figé — glissez-déposez si les plans changent. L'itinéraire est la source unique de vérité, plus de « attends, on se retrouve où déjà ? ».",
        },
        {
          emoji: "🎁",
          title: "Mode Privé pour les Surprises",
          description:
            "Vous organisez un voyage surprise pour votre conjoint, un parent ou votre meilleur ami ? Créez un groupe de planification privé sans eux. Coordonnez les dates, réservez l'Airbnb, planifiez les activités — tout reste invisible pour la personne fêtée. Quand vous êtes prêts, révélez le voyage et ajoutez-la à l'espace pour qu'elle voie tout ce qui a été organisé.",
        },
      ],
    },

    tripIdeas: {
      title: "Idées de Voyage Anniversaire par Style",
      subtitle: "Cinq styles de voyage anniversaire pour coller à la personne fêtée — et au budget.",
      items: [
        {
          emoji: "🌆",
          title: "City Break Entre Amis",
          description:
            "Lisbonne, Barcelone, Copenhague, Mexico — choisissez une ville avec une bonne scène food, des quartiers à explorer à pied et quelques rooftops. Parfait pour un week-end 30 ans avec 6 à 10 amis. Réservez un appart central, planifiez deux gros dîners de groupe et laissez les après-midis libres. Logistique simple, ambiance haute, idéal pour les photos.",
        },
        {
          emoji: "🏖️",
          title: "Villa avec Piscine",
          description:
            "Louez une villa avec piscine dans le sud de la France, en Costa Brava, à Tulum ou dans les Pouilles. Matinées lentes, longs déjeuners, cocktails au coucher du soleil. Ça marche à tout âge mais c'est particulièrement bien pour les 35-50 ans où le groupe veut plus se détendre que faire la fête. Privatisez un chef à domicile une soirée pour que ça ait l'air d'une vraie célébration.",
        },
        {
          emoji: "🍷",
          title: "Week-end Vignobles",
          description:
            "Toscane, Bordeaux, vallée du Douro, Napa, Mendoza — le voyage vignobles est le grand classique des 40 ans. Logez dans un agriturismo ou un domaine boutique, réservez une dégustation par jour et faites des dîners qui s'éternisent. Les petits groupes (4 à 8) marchent mieux. Servez-vous de la cagnotte partagée pour les dégustations et les dîners, parce que ça monte vite.",
        },
        {
          emoji: "🏔️",
          title: "Échappée Aventure",
          description:
            "Randonnée dans les Dolomites, road trip en Islande, ski à Chamonix, surf au Portugal. Pour la personne fêtée active qui préfère gravir un sommet que souffler des bougies. Choisissez un défi signature pour le voyage — trek de plusieurs jours, journée d'héliski, camp de surf — et construisez le reste du week-end autour de la récup et des bons repas.",
        },
        {
          emoji: "🎲",
          title: "Vegas / Grande Ville Festive",
          description:
            "Las Vegas, Miami, Ibiza, Berlin — le voyage anniversaire « gros plan ». Clubs, dayclubs, dîners chics, nuits tardives. Surtout pour les 21, 25 et 30 ans, ou n'importe quel anniversaire où le groupe est partant pour un vrai défoulement. Pré-réservez tout (tables, transferts, suite) parce que la logistique du jour J dans une ville festive vous bouffe vivants.",
        },
      ],
    },

    timeline: {
      title: "Quand Commencer à Planifier",
      subtitle: "Un calendrier simple pour caler votre voyage anniversaire sans panique de dernière minute.",
      milestones: [
        {
          time: "4 à 6 mois avant",
          title: "Fixer la Date & la Liste",
          description: "Sondez le groupe pour les week-ends disponibles. Finalisez qui vient. Créez votre voyage WePlanify et invitez tout le monde — y compris la personne fêtée si ce n'est pas une surprise.",
        },
        {
          time: "3 mois avant",
          title: "Choisir la Destination & Réserver",
          description: "Votez pour la destination. Réservez les vols et l'hébergement pendant que les prix restent raisonnables. Mettez en place la cagnotte partagée avec les premiers acomptes.",
        },
        {
          time: "1 mois avant",
          title: "Planifier Activités & Réservations",
          description: "Lancez les sondages pour les activités. Réservez les restaurants (surtout le grand dîner d'anniversaire). Construisez le programme jour par jour. Commandez décos, cadeaux ou tenues assorties.",
        },
        {
          time: "1 semaine avant",
          title: "Tout Reconfirmer",
          description: "Reconfirmez toutes les réservations. Soldez les contributions cagnotte en attente. Partagez l'itinéraire final. Vérifiez que quelqu'un apporte les bougies.",
        },
      ],
    },

    checklist: {
      title: "Checklist Voyage Anniversaire",
      items: [
        "Confirmer la date avec la personne fêtée (ou la garder secrète si c'est une surprise)",
        "Sonder le groupe pour les week-ends disponibles",
        "Voter pour une destination que tout le monde peut se payer",
        "Réserver l'hébergement et le transport",
        "Définir une cagnotte partagée et décider comment la part de la personne fêtée est gérée",
        "Réserver le grand dîner d'anniversaire bien à l'avance",
        "Planifier une ou deux activités signatures (bateau, spa, dégustation, randonnée)",
        "Construire le programme jour par jour dans WePlanify",
        "Commander le gâteau, les bougies ou les petites surprises",
        "Tout reconfirmer une semaine avant et partager le plan final",
      ],
    },

    testimonial: {
      quote:
        "J'ai eu 40 ans au printemps et on est partis en Toscane le temps d'un week-end avec un groupe d'amis. La villa, le partage de la dégustation, la cagnotte du dîner, les transferts aéroport — on a tout fait dans WePlanify et personne n'a eu à courir après l'argent ensuite. Mille fois mieux que le chaos WhatsApp de tous les anniversaires précédents.",
      author: "Sophie L.",
      role: "Organisatrice voyage anniversaire, Paris",
    },

    faq: {
      title: "Questions Fréquemment Posées",
      items: [
        {
          q: "WePlanify est-il gratuit pour organiser un voyage anniversaire ?",
          a: "Oui, 100% gratuit. Créez un voyage, invitez le groupe, lancez des sondages, construisez l'itinéraire, suivez la cagnotte partagée — pas de période d'essai, pas de carte bancaire, pas de frais cachés. Toute l'application voyage anniversaire fonctionne sans payer.",
        },
        {
          q: "Puis-je organiser un voyage anniversaire surprise sans que la personne le voie ?",
          a: "Oui. Créez un groupe de planification privé et n'y invitez pas la personne fêtée. Coordonnez les dates, votez pour la destination, réservez l'Airbnb, planifiez les activités — tout reste invisible. Au moment de la révélation, vous pouvez l'ajouter au voyage pour qu'elle voie l'itinéraire complet et tout ce qui a été organisé.",
        },
        {
          q: "Combien de temps à l'avance commencer à planifier un voyage anniversaire ?",
          a: "Quatre à six mois est idéal pour les anniversaires-clés (30, 40, 50 ans) où vous visez une vraie destination. Deux à trois mois suffisent pour les week-ends locaux. Plus la date est fixée tôt, moins les vols coûtent cher et meilleur le choix d'hébergement. Créez un voyage WePlanify dès que l'idée germe — même si les détails sont flous.",
        },
        {
          q: "Quel budget prévoir pour un voyage anniversaire ?",
          a: "Ça dépend de la destination et du groupe. Un week-end dans une ville européenne coûte typiquement 250 à 500 € par personne tout compris. Une villa en Toscane ou dans le sud de la France pour des 40 ans peut monter à 600-1200 € par personne. L'essentiel est de se mettre d'accord sur un budget cible dès le départ — la cagnotte partagée WePlanify garde tout le monde honnête au fil des dépenses.",
        },
        {
          q: "Est-ce que la personne fêtée doit payer pour elle ?",
          a: "Les deux marchent et c'est une décision de groupe. Beaucoup de groupes offrent la part Airbnb et le grand dîner à la personne fêtée en cadeau ; elle paie son vol et ses repas perso. WePlanify permet de marquer une dépense « le groupe couvre » ou « individuel » pour que la répartition soit automatique. Quelle que soit votre décision, mettez-vous d'accord tôt — les discussions argent en plein voyage, c'est le pire.",
        },
        {
          q: "Comment décider des activités quand tout le monde veut autre chose ?",
          a: "Lancez un sondage avec trois à cinq options concrètes pour chaque gros créneau (samedi après-midi, dimanche matin, etc.). Laissez voter, réservez la gagnante. Ça évite à la fois le blocage (personne ne décide) et la rancœur (une seule personne décide tout). Et ça donne enfin la parole aux plus discrets.",
        },
        {
          q: "Et si certains amis ne peuvent venir que sur une partie du voyage ?",
          a: "Pas de souci — et WePlanify le gère proprement. Indiquez les dates réelles de chaque participant, et quand vous enregistrez une dépense vous précisez qui y a participé. La cagnotte partagée recalcule automatiquement pour que chacun ne paie que pour les nuits et activités où il était. Pas de tableur, pas de négociation gênante du type « j'étais pas là pour le dîner ».",
        },
      ],
    },

    cta: {
      title: "Prêt à Organiser le Meilleur Voyage Anniversaire ?",
      description:
        "Arrêtez de laisser les voyages anniversaire glisser de « il faut absolument qu'on le fasse » à rien du tout. Créez votre voyage WePlanify en 30 secondes — c'est gratuit.",
      button: "Commencer — c'est gratuit",
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
    authors: [{ name: "WePlanify" }],
    openGraph: {
      ...baseMetadata.openGraph,
      type: "article",
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

export default async function BirthdayTrip({ params }: Props) {
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
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "Voyage anniversaire" : "Birthday Trip",
        item: `${SITE_URL}/${locale}/birthday-trip`,
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

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t.meta.title,
    description: t.meta.description,
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor", url: SITE_URL },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-24",
    dateModified: "2026-05-24",
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
      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero Section */}
        <section className="relative pt-[120px] lg:pt-[160px] pb-16 lg:pb-24 px-4 lg:px-8 overflow-hidden">
          <Confetti />
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: locale === "fr" ? "Accueil" : "Home", href: `/${locale}` },
                  { label: locale === "fr" ? "Voyage anniversaire" : "Birthday Trip" },
                ]}
              />
            </div>
          </div>
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <span className="inline-block bg-[#EEF899] text-[#001E13] px-5 py-1.5 rounded-full text-sm lg:text-base font-nanum-pen mb-6">
              {t.hero.tag}
            </span>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-4 whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-sm font-karla text-[#001E13]/50 mb-4">{t.readTime}</p>
            <p className="text-base lg:text-lg font-karla text-[#001E13]/80 max-w-2xl mx-auto leading-relaxed mb-8">
              {t.hero.description}
            </p>
            <div className="flex flex-col items-center gap-2">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-8 py-3">
                  {t.hero.cta}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-2">
          <AuthorBio locale={locale} publishedDate="2026-05-24" modifiedDate="2026-05-24" />
        </div>

        {/* Guide Intro Section */}
        <section className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] mb-8 text-center">
              {t.guideIntro.title}
            </h2>
            <div className="space-y-5">
              {t.guideIntro.paragraphs.map((p, i) => (
                <p key={i} className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 text-center">
              <p className="text-[#001E13]/60 font-karla text-sm">
                {locale === "fr" ? (
                  <>Besoin d&apos;un guide plus général ? Consultez notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">guide complet pour organiser un voyage de groupe</Link>.</>
                ) : (
                  <>Need a more general guide? Check out our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] underline underline-offset-4 hover:opacity-70">complete group trip planning guide</Link>.</>
                )}
              </p>
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
              {t.features.items.map((item, index) => {
                const featureLinks: Record<string, string> = {
                  "Polls for Dates & Destinations": "/features/polls",
                  "Sondages pour Dates & Destinations": "/features/polls",
                  "Shared Birthday Kitty": "/features/budget",
                  "Cagnotte d'Anniversaire Partagée": "/features/budget",
                  "Day-by-Day Itinerary": "/features/planning",
                  "Programme Jour par Jour": "/features/planning",
                };
                const featureLink = featureLinks[item.title];

                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-[#001E13]/5 hover:shadow-md hover:border-[#F6391A]/20 transition-all duration-300"
                  >
                    <div className="w-14 h-14 lg:w-16 lg:h-16 bg-[#EEF899] rounded-2xl flex items-center justify-center mb-5">
                      <span className="text-2xl lg:text-3xl">{item.emoji}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3">
                      {featureLink ? (
                        <Link href={`/${locale}${featureLink}`} className="text-[#001E13] font-londrina-solid hover:underline underline-offset-4 no-underline">
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
                );
              })}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Trip Ideas Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t.tripIdeas.title}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t.tripIdeas.subtitle}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.tripIdeas.items.map((idea, index) => (
                <div
                  key={index}
                  className="bg-white border border-[#001E13]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <span className="text-3xl mb-4 block">{idea.emoji}</span>
                  <h3 className="text-xl font-londrina-solid text-[#001E13] mb-3">
                    {idea.title}
                  </h3>
                  <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                    {idea.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Timeline Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                {t.timeline.title}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                {t.timeline.subtitle}
              </p>
            </div>
            <div className="space-y-8">
              {t.timeline.milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 bg-[#F6391A] rounded-full flex-shrink-0" />
                    {index < t.timeline.milestones.length - 1 && (
                      <div className="w-0.5 h-full bg-[#F6391A]/20 mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <span className="text-[#F6391A] font-karla font-bold text-sm uppercase tracking-wide">
                      {milestone.time}
                    </span>
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mt-1 mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-sm lg:text-base font-karla text-[#001E13]/70 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        </FadeIn>

        {/* Checklist Section */}
        <FadeIn>
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] text-center mb-12">
              {t.checklist.title}
            </h2>
            <div className="space-y-4">
              {t.checklist.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-[#FFFBF5]/5 border border-[#FFFBF5]/10 rounded-xl p-4"
                >
                  <span className="text-[#EEF899] font-londrina-solid text-lg flex-shrink-0 w-8">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="text-[#FFFBF5]/90 font-karla text-sm lg:text-base">
                    {item}
                  </span>
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

        {/* Destinations cross-link */}
        <FadeIn>
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-[#EEF899] text-[#001E13] px-4 py-1 rounded-full text-sm font-nanum-pen mb-3">
                {locale === "fr" ? "Inspiration destinations" : "Destination inspiration"}
              </span>
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13]">
                {locale === "fr"
                  ? "Des destinations qui font un super voyage anniversaire"
                  : "Destinations that make a great birthday trip"}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  slug: locale === "fr" ? "toscane-road-trip" : "tuscany-road-trip",
                  title: locale === "fr" ? "Toscane · 5 jours" : "Tuscany · 5 days",
                  desc:
                    locale === "fr"
                      ? "Le classique 40 ans. Villa avec piscine, dégustations, dîners qui durent. Petit groupe, grosse ambiance."
                      : "The classic 40th. Villa with a pool, wine tastings, dinners that last for hours. Small group, big atmosphere.",
                },
                {
                  slug: locale === "fr" ? "lisbonne-entre-amis" : "lisbon-with-friends",
                  title: locale === "fr" ? "Lisbonne · 3 jours" : "Lisbon · 3 days",
                  desc:
                    locale === "fr"
                      ? "Parfait pour un 30 ans. Rooftops, food tours, quartiers à pied, vie nocturne sans être Vegas."
                      : "Perfect for a 30th. Rooftops, food tours, walkable neighborhoods, nightlife without the Vegas overkill.",
                },
                {
                  slug: locale === "fr" ? "andalousie-road-trip" : "andalusia-road-trip",
                  title: locale === "fr" ? "Andalousie · 6 jours" : "Andalusia · 6 days",
                  desc:
                    locale === "fr"
                      ? "Séville, Grenade, Cordoue. Patios, flamenco, tapas tardifs. Idéal pour un 50 ans avec un peu de culture."
                      : "Seville, Granada, Córdoba. Patios, flamenco, late tapas. A great 50th with a bit of culture baked in.",
                },
              ].map((card) => (
                <Link key={card.slug} href={`/${locale}/destinations/${card.slug}`} className="group">
                  <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg hover:border-[#F6391A]/30 transition-all h-full">
                    <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                      {card.desc}
                    </p>
                    <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                      {locale === "fr" ? "Voir l'itinéraire →" : "See the itinerary →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                href={`/${locale}/destinations`}
                className="text-[#F6391A] font-karla font-bold text-sm lg:text-base underline underline-offset-4 hover:opacity-70"
              >
                {locale === "fr"
                  ? "Voir toutes les destinations →"
                  : "See all destinations →"}
              </Link>
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
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                    {locale === "fr" ? "EVJF / Bachelorette" : "Bachelorette / EVJF"}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {locale === "fr"
                      ? "Organiser un EVJF surprise sans que la mariée voie rien."
                      : "Plan a surprise bachelorette without the bride seeing a thing."}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {locale === "fr" ? "Voir la page →" : "See the page →"}
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
