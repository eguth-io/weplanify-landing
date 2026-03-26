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
const PATHNAME = "/bachelorette-trip";

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
    readTime: "10 min read",
    hero: {
      tag: "Bachelorette Trip Planner",
      title: "Plan the Ultimate\nBachelorette Trip",
      description:
        "She said yes — now it's your turn to plan an unforgettable bachelorette party trip. WePlanify is the free bachelorette weekend organizer that keeps the surprise alive and the planning stress-free.",
      cta: "Start planning for free",
    },

    guideIntro: {
      title: "The Ultimate Bachelorette Trip Planning Guide",
      paragraphs: [
        "A great bachelorette trip is more than a night out — it is a multi-day celebration of friendship, adventure, and the bride-to-be's journey into married life. Whether you are planning a relaxing spa weekend, a wild city adventure, or a sun-soaked beach getaway, the magic is in the details. And getting those details right with a group of 6 to 15 people is where things get complicated.",
        "The best bachelorette trips share three things: they match the bride's personality, they are inclusive of everyone's budget, and they are organized enough that the maid of honor is not having a breakdown behind the scenes. The secret is not to over-plan every minute — it is to have a system that lets everyone contribute while keeping one person in the driver's seat.",
        "That is exactly what WePlanify was built for. A single shared space where the planning crew can vote on activities, track the shared kitty, build a day-by-day itinerary, and coordinate packing — all without the bride ever seeing it. No more secret WhatsApp groups with confusing thread branches. Just one clean, organized planning hub.",
      ],
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
            "Trying to plan an epic surprise while coordinating 12 people on a group chat the bride can't see? Absolute nightmare. Someone always accidentally messages the main group instead of the secret one. Or the bride sees a notification preview on someone's phone. With WePlanify, the entire planning happens in a private trip space — no rogue group chats, no accidental spoilers.",
        },
        {
          emoji: "📅",
          title: "Herding Schedules",
          description:
            "Between work, kids, vacations, and 'let me check with my partner' — finding one weekend that works for everyone feels impossible. You send a message asking about dates and half the group responds a week later. The window for booking affordable accommodation keeps shrinking while you wait. WePlanify's date polls give everyone a clear deadline to vote, and results are instant.",
        },
        {
          emoji: "💸",
          title: "The Money Talk",
          description:
            "Who's paying for the Airbnb? How do you split the bride's share? Venmo requests flying everywhere. Awkward. Some people overpay, others underpay, and nobody knows the real total until weeks after the trip when someone finally sits down with a calculator. The shared budget tracker in WePlanify handles all of this in real time — contributions, expenses, and who owes what.",
        },
        {
          emoji: "🎉",
          title: "Activity Overload",
          description:
            "Spa day or wine tour? Beach or city? Everyone has opinions but nobody wants to be the one who decides for the group. The result is either a stalemate where nothing gets booked, or one person makes all the decisions and secretly resents doing all the work. Group polls solve this instantly — put three options up, let everyone vote, and book the winner. Democracy at its finest.",
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
            "Create a secret planning space without the bride. Invite the crew, discuss ideas, and keep the surprise intact — no rogue group chat needed. Everyone in the planning group can see the itinerary, budget, and packing list, but the bride-to-be has zero access. You control who joins, and you can add the bride after the surprise reveal if you want her to see the trip details.",
        },
        {
          emoji: "🗳️",
          title: "Polls for Activities & Dates",
          description:
            "Can't agree on a date or activity? Let the group vote. Polls make it easy to find what works for everyone — no endless back-and-forth. Create polls for everything: which weekend works best, what restaurant for the group dinner, spa or boat trip on Saturday afternoon. Anonymous voting means even the shy friends get a real say. Results are clear, fast, and final.",
        },
        {
          emoji: "💰",
          title: "Shared Budget & Kitty",
          description:
            "Set a shared budget, track contributions, and split costs fairly. No more awkward money conversations or spreadsheet nightmares. Decide upfront whether the bride pays for herself or the group covers her share. Log every expense as it happens — the Airbnb deposit, the restaurant reservation, the matching t-shirts — and WePlanify calculates who owes what automatically.",
        },
        {
          emoji: "🗓️",
          title: "Day-by-Day Itinerary",
          description:
            "Build a detailed schedule for the whole weekend. From the welcome drinks to the final brunch — everyone knows what's happening and when. Add times, locations, notes, and links for each activity. Share the itinerary with the full group (minus the bride) so everyone knows the plan. On the day, the itinerary is your single source of truth — no more frantic texts asking 'where are we meeting?'",
        },
      ],
    },

    tripIdeas: {
      title: "Bachelorette Trip Ideas by Style",
      subtitle: "Not sure what type of bachelorette to plan? Here are five popular styles to inspire you.",
      items: [
        {
          emoji: "🧖",
          title: "Relaxing Spa Retreat",
          description:
            "Book a spa hotel or wellness resort for a weekend of massages, facials, hot tubs, and slow mornings. Perfect for brides who want to decompress before the wedding chaos. Add a group cooking class or a wine tasting to break up the relaxation. Budget-friendly tip: rent an Airbnb with a hot tub and book mobile spa treatments to come to you.",
        },
        {
          emoji: "🌃",
          title: "City Adventure",
          description:
            "Pick a vibrant city — think Barcelona, Austin, Montreal, or Lisbon — and pack the weekend with rooftop bars, street food tours, shopping, and nightlife. City trips work great because everyone can split off for a few hours and reconnect for group dinners. Use WePlanify's itinerary to map out the must-do activities and leave room for spontaneous exploration.",
        },
        {
          emoji: "🏖️",
          title: "Beach Getaway",
          description:
            "Sun, sand, and matching swimsuits. A beach bachelorette is a classic for a reason. Book a beachfront rental, plan a boat day, and schedule sunset cocktails on the shore. For destinations, think Tulum, the Greek islands, Bali, or the south of France. The shared packing list is essential here — coordinate who brings the floaties, the cooler, and the Bluetooth speaker.",
        },
        {
          emoji: "🍷",
          title: "Wine Country Escape",
          description:
            "Napa, Bordeaux, Mendoza, Tuscany — any wine region makes for a sophisticated and memorable bachelorette. Book a vineyard tour, organize a private tasting, and end the evening with a long dinner. Wine country trips can get expensive quickly, so the shared budget tracker is your best friend. Log tastings, meals, and transport costs so everyone stays on the same page.",
        },
        {
          emoji: "🏔️",
          title: "Active & Outdoor",
          description:
            "For the adventurous bride: hiking, kayaking, surfing, or skiing. Book a cabin in the mountains or a lodge near a national park. Plan one big group activity per day (like a guided hike or a rafting trip) and leave evenings for cozy dinners and games. The packing list is critical for outdoor trips — make sure everyone has the right gear and knows what the group is sharing.",
        },
      ],
    },

    timeline: {
      title: "When to Start Planning",
      subtitle: "A simple timeline to keep you on track.",
      milestones: [
        {
          time: "6 months before",
          title: "Lock the Date & Guest List",
          description: "Poll the group for available weekends. Finalize who is coming. Create your WePlanify trip and invite everyone.",
        },
        {
          time: "3 months before",
          title: "Book Accommodation & Transport",
          description: "Vote on destination and accommodation style. Book flights or organize carpools. Set up the shared budget.",
        },
        {
          time: "1 month before",
          title: "Plan Activities & Build Itinerary",
          description: "Poll for activities. Build the day-by-day schedule. Start the packing list. Order any matching gear or decorations.",
        },
        {
          time: "1 week before",
          title: "Final Check & Get Excited",
          description: "Confirm all reservations. Review the packing list. Settle any outstanding budget items. Send the final itinerary to the group.",
        },
      ],
    },

    checklist: {
      title: "Bachelorette Planning Checklist",
      items: [
        "Set a date that works for the most people",
        "Create a private planning group (without the bride)",
        "Decide on a destination and accommodation",
        "Set and agree on a shared budget",
        "Book accommodation and transport",
        "Plan activities and build a day-by-day itinerary",
        "Order matching outfits, decorations, or gifts",
        "Create a shared packing list",
        "Confirm all reservations one week before",
        "Settle the budget and celebrate",
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
          a: "Yes, 100% free — even for secret planning. Create a private group without the bride, run polls, build the itinerary, and track the shared kitty at no cost. Once the surprise is revealed, you can even add the bride-to-be so she can see the full plan. No trial period, no credit card, no hidden fees.",
        },
        {
          q: "How far in advance should we start planning?",
          a: "Ideally six months before the wedding for destination trips, three months for local getaways. The sooner you lock the date and guest list, the easier everything else becomes. Start a WePlanify trip as soon as the idea forms — even if details are not finalized yet.",
        },
        {
          q: "What is a good budget for a bachelorette trip?",
          a: "Budgets vary widely depending on the destination and style. A local spa weekend might cost 200 to 400 per person, while a destination trip can run 800 to 1500 or more. The key is to agree on a budget early and use a shared tracker so everyone knows the total before committing.",
        },
        {
          q: "How do we decide on activities as a group?",
          a: "Use polls. Create a poll with three to five activity options, let everyone vote, and go with the winner. This avoids the one-person-decides problem and makes everyone feel included. You can run separate polls for each day or time slot.",
        },
        {
          q: "What if some bridesmaids can't make it to the whole weekend?",
          a: "That happens all the time — and WePlanify handles it gracefully. You can build a flexible itinerary where some people join only for Saturday night or the final brunch. Budget splits adjust too: just mark who is in for which activities, and the shared tracker recalculates each person's share. No awkward conversations about someone paying for a day they missed.",
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
    readTime: "10 min de lecture",
    hero: {
      tag: "Application pour organiser un EVJF",
      title: "Organisez l'EVJF\nParfait",
      description:
        "Elle a dit oui — maintenant c'est à vous d'organiser un enterrement de vie de jeune fille inoubliable. WePlanify est l'application gratuite pour planifier un week-end EVJF sans stress et en gardant la surprise.",
      cta: "Commencer gratuitement",
    },

    guideIntro: {
      title: "Le Guide Ultime pour Organiser un EVJF",
      paragraphs: [
        "Un bon EVJF, c'est bien plus qu'une soirée — c'est une célébration sur plusieurs jours de l'amitié, de l'aventure et du passage de la future mariée vers la vie à deux. Que vous planifiiez un week-end spa relaxant, une aventure urbaine effrénée ou une escapade plage ensoleillée, la magie est dans les détails. Et réussir ces détails avec un groupe de 6 à 15 personnes, c'est là que ça se complique.",
        "Les meilleurs EVJF partagent trois points communs : ils correspondent à la personnalité de la mariée, ils respectent le budget de chacune, et ils sont suffisamment organisés pour que la témoin ne fasse pas une crise de nerfs en coulisses. Le secret n'est pas de planifier chaque minute — c'est d'avoir un système qui permet à chacune de contribuer tout en gardant une personne aux commandes.",
        "C'est exactement pour ça que WePlanify a été créé. Un seul espace partagé où l'équipe d'organisation peut voter pour les activités, suivre la cagnotte commune, construire un programme jour par jour et coordonner les bagages — le tout sans que la mariée ne voie quoi que ce soit. Fini les groupes WhatsApp secrets avec des fils de discussion confus. Juste un hub d'organisation propre et efficace.",
      ],
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
            "Essayer d'organiser une surprise épique en coordonnant 12 personnes sur un groupe que la mariée ne doit pas voir ? Un vrai cauchemar. Quelqu'un envoie toujours un message dans le mauvais groupe par accident. Ou la mariée aperçoit une notification sur le téléphone de quelqu'un. Avec WePlanify, toute la planification se passe dans un espace privé — pas de groupes risqués, pas de spoilers accidentels.",
        },
        {
          emoji: "📅",
          title: "Trouver LA Date",
          description:
            "Entre le boulot, les enfants, les vacances et les « je vérifie avec mon copain » — trouver un week-end qui convient à tout le monde relève de l'exploit. Vous envoyez un message pour les dates et la moitié du groupe répond une semaine plus tard. La fenêtre pour réserver un hébergement abordable se réduit pendant que vous attendez. Les sondages de dates WePlanify donnent à chacune un délai clair pour voter.",
        },
        {
          emoji: "💸",
          title: "La Question du Budget",
          description:
            "Qui paie l'hébergement ? Comment on répartit la part de la mariée ? Les demandes de virement fusent de partout. Gênant. Certaines paient trop, d'autres pas assez, et personne ne connaît le vrai total avant des semaines après l'EVJF quand quelqu'un sort enfin la calculatrice. Le suivi de budget partagé de WePlanify gère tout ça en temps réel — contributions, dépenses et qui doit quoi.",
        },
        {
          emoji: "🎉",
          title: "Trop d'Idées, Zéro Décision",
          description:
            "Spa ou dégustation de vin ? Plage ou ville ? Tout le monde a un avis mais personne ne veut trancher pour le groupe. Résultat : soit un blocage où rien n'est réservé, soit une personne prend toutes les décisions et en veut secrètement au reste. Les sondages de groupe règlent ça instantanément — proposez trois options, laissez tout le monde voter et réservez la gagnante.",
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
            "Créez un espace secret sans la mariée. Invitez la team, discutez des idées et gardez la surprise intacte — fini les groupes WhatsApp risqués. Tout le monde dans le groupe de planification peut voir l'itinéraire, le budget et la liste de bagages, mais la future mariée n'a aucun accès. Vous contrôlez qui rejoint, et vous pouvez ajouter la mariée après la révélation si vous voulez qu'elle voie les détails.",
        },
        {
          emoji: "🗳️",
          title: "Sondages pour les Activités & Dates",
          description:
            "Impossible de se mettre d'accord ? Laissez le groupe voter. Les sondages permettent de trouver ce qui convient à tout le monde — sans discussions interminables. Créez des sondages pour tout : quel week-end convient, quel restaurant pour le dîner, spa ou bateau le samedi après-midi. Le vote anonyme permet même aux plus timides de s'exprimer. Les résultats sont clairs, rapides et définitifs.",
        },
        {
          emoji: "💰",
          title: "Cagnotte & Budget Partagé",
          description:
            "Définissez un budget commun, suivez les contributions et répartissez les frais équitablement. Plus de conversations gênantes sur l'argent. Décidez dès le départ si la mariée paie sa part ou si le groupe la couvre. Enregistrez chaque dépense au fur et à mesure — l'acompte Airbnb, la réservation du restaurant, les t-shirts assortis — et WePlanify calcule qui doit quoi automatiquement.",
        },
        {
          emoji: "🗓️",
          title: "Programme Jour par Jour",
          description:
            "Construisez un planning détaillé pour tout le week-end. Du cocktail de bienvenue au brunch final — tout le monde sait ce qui est prévu et quand. Ajoutez horaires, lieux, notes et liens pour chaque activité. Partagez l'itinéraire avec tout le groupe (sauf la mariée) pour que chacune connaisse le plan. Le jour J, l'itinéraire est votre source unique de vérité.",
        },
      ],
    },

    tripIdeas: {
      title: "Idées d'EVJF par Style",
      subtitle: "Pas sûre du type d'EVJF à organiser ? Voici cinq styles populaires pour vous inspirer.",
      items: [
        {
          emoji: "🧖",
          title: "Retraite Spa Relaxante",
          description:
            "Réservez un hôtel spa ou un resort bien-être pour un week-end de massages, soins du visage, jacuzzi et grasses matinées. Parfait pour les mariées qui veulent décompresser avant le chaos du mariage. Ajoutez un cours de cuisine ou une dégustation de vins pour varier. Astuce budget : louez un Airbnb avec jacuzzi et réservez des soins à domicile.",
        },
        {
          emoji: "🌃",
          title: "Aventure Urbaine",
          description:
            "Choisissez une ville vibrante — Barcelone, Lisbonne, Montréal ou Amsterdam — et remplissez le week-end de rooftops, food tours, shopping et vie nocturne. Les city trips fonctionnent bien car chacune peut se séparer quelques heures et se retrouver pour les dîners. Utilisez l'itinéraire WePlanify pour mapper les incontournables et laisser de la place à l'exploration spontanée.",
        },
        {
          emoji: "🏖️",
          title: "Escapade Plage",
          description:
            "Soleil, sable et maillots assortis. L'EVJF plage est un classique pour une bonne raison. Réservez une location en bord de mer, prévoyez une journée bateau et planifiez des cocktails au coucher du soleil. Pour les destinations : Tulum, les îles grecques, Bali ou le sud de la France. La liste de bagages partagée est essentielle — coordonnez qui apporte les bouées, la glacière et l'enceinte.",
        },
        {
          emoji: "🍷",
          title: "Escapade Vignoble",
          description:
            "Bordeaux, la Toscane, la Bourgogne — toute région viticole fait un EVJF sophistiqué et mémorable. Réservez une visite de vignoble, organisez une dégustation privée et terminez par un long dîner. Les escapades vignobles peuvent vite coûter cher, donc le suivi de budget est votre meilleur allié. Enregistrez dégustations, repas et transports pour que chacune reste sur la même longueur d'onde.",
        },
        {
          emoji: "🏔️",
          title: "Active & Nature",
          description:
            "Pour la mariée aventurière : randonnée, kayak, surf ou ski. Réservez un chalet en montagne ou un lodge près d'un parc national. Prévoyez une grande activité de groupe par jour (randonnée guidée, rafting) et gardez les soirées pour les dîners et les jeux. La liste de bagages est cruciale pour les EVJF outdoor — assurez-vous que tout le monde a le bon équipement.",
        },
      ],
    },

    timeline: {
      title: "Quand Commencer à Planifier",
      subtitle: "Un calendrier simple pour rester sur les rails.",
      milestones: [
        {
          time: "6 mois avant",
          title: "Fixer la Date & la Liste d'Invitées",
          description: "Sondez le groupe pour les week-ends disponibles. Finalisez qui vient. Créez votre voyage WePlanify et invitez tout le monde.",
        },
        {
          time: "3 mois avant",
          title: "Réserver Hébergement & Transport",
          description: "Votez pour la destination et le style d'hébergement. Réservez les vols ou organisez le covoiturage. Mettez en place le budget partagé.",
        },
        {
          time: "1 mois avant",
          title: "Planifier les Activités & Construire le Programme",
          description: "Sondez pour les activités. Construisez le planning jour par jour. Commencez la liste de bagages. Commandez les tenues ou décorations assorties.",
        },
        {
          time: "1 semaine avant",
          title: "Vérification Finale & Excitation",
          description: "Confirmez toutes les réservations. Revoyez la liste de bagages. Réglez les derniers points de budget. Envoyez l'itinéraire final au groupe.",
        },
      ],
    },

    checklist: {
      title: "Checklist d'Organisation d'EVJF",
      items: [
        "Fixer une date qui convient au plus grand nombre",
        "Créer un groupe de planification privé (sans la mariée)",
        "Choisir une destination et un hébergement",
        "Définir et valider un budget partagé",
        "Réserver l'hébergement et le transport",
        "Planifier les activités et créer un programme jour par jour",
        "Commander les tenues, décorations ou cadeaux assortis",
        "Créer une liste de bagages partagée",
        "Confirmer toutes les réservations une semaine avant",
        "Solder le budget et célébrer",
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
          a: "Oui, 100% gratuit — même pour la planification secrète. Créez un groupe privé sans la mariée, lancez des sondages, construisez le programme et suivez la cagnotte commune sans aucun coût. Une fois la surprise dévoilée, vous pouvez même ajouter la future mariée pour qu'elle voie tout le plan. Pas de période d'essai, pas de carte bancaire, pas de frais cachés.",
        },
        {
          q: "Combien de temps à l'avance faut-il commencer à planifier ?",
          a: "Idéalement six mois avant le mariage pour les EVJF avec voyage, trois mois pour les week-ends locaux. Plus tôt vous fixez la date et la liste des invitées, plus tout le reste devient facile. Créez un voyage WePlanify dès que l'idée germe — même si les détails ne sont pas encore finalisés.",
        },
        {
          q: "Quel budget prévoir pour un EVJF ?",
          a: "Les budgets varient énormément selon la destination et le style. Un week-end spa local peut coûter 200 à 400 euros par personne, tandis qu'un EVJF avec voyage peut aller de 800 à 1500 euros ou plus. L'essentiel est de se mettre d'accord sur un budget tôt et d'utiliser un suivi partagé pour que chacune connaisse le total avant de s'engager.",
        },
        {
          q: "Comment décider des activités en groupe ?",
          a: "Utilisez les sondages. Créez un sondage avec trois à cinq options d'activités, laissez tout le monde voter et réservez la gagnante. Ça évite le problème de la personne-qui-décide-tout et fait que chacune se sent incluse. Vous pouvez lancer des sondages séparés pour chaque jour ou créneau horaire.",
        },
        {
          q: "Et si certaines copines ne peuvent pas venir tout le week-end ?",
          a: "C'est super courant — et WePlanify gère ça sans problème. Vous pouvez construire un programme flexible où certaines ne rejoignent que le samedi soir ou le brunch final. Le partage des frais s'adapte aussi : indiquez qui participe à quelles activités, et le suivi de budget recalcule la part de chacune. Pas de conversations gênantes pour faire payer quelqu'un qui a raté une journée.",
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
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "fr" ? "EVJF" : "Bachelorette Trip",
        item: `${SITE_URL}/${locale}/bachelorette-trip`,
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
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-londrina-solid text-[#001E13] leading-tight mb-4 whitespace-pre-line">
              {t.hero.title}
            </h1>
            <p className="text-sm font-karla text-[#001E13]/50 mb-4">{t.readTime}</p>
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

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8 pt-2">
          <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-26" />
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
                  "Polls for Activities & Dates": "/features/polls",
                  "Sondages pour les Activités & Dates": "/features/polls",
                  "Shared Budget & Kitty": "/features/budget",
                  "Cagnotte & Budget Partagé": "/features/budget",
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
