import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";

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
const PATHNAME = "/guides/plan-group-trip";

const meta = {
  en: {
    title:
      "How to Plan a Group Trip: The Complete Step-by-Step Guide (2026)",
    description:
      "Learn how to plan a group trip from start to finish. This step-by-step guide covers destination voting, budgeting, itinerary building, logistics and more — with tools to make group travel easy.",
    keywords: [
      "how to plan a group trip",
      "group trip planning guide",
      "organize group travel step by step",
      "plan trip with friends",
      "group vacation planning",
    ],
  },
  fr: {
    title:
      "Comment Organiser un Voyage de Groupe : Le Guide Complet Etape par Etape (2026)",
    description:
      "Decouvrez comment organiser un voyage de groupe de A a Z. Ce guide etape par etape couvre le choix de destination, le budget, l'itineraire, la logistique et bien plus.",
    keywords: [
      "comment organiser voyage groupe",
      "guide planification voyage groupe",
      "organiser voyage collectif etapes",
      "planifier voyage entre amis",
      "voyage de groupe organisation",
    ],
  },
};

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? meta.fr : meta.en;
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    title: l.title,
    description: l.description,
    keywords: l.keywords,
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
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Content
// ---------------------------------------------------------------------------

const content = {
  en: {
    readTime: "12 min read",
    heroTag: "Complete Guide",
    h1: "How to Plan a Group Trip: The Complete Step-by-Step Guide (2026)",
    intro:
      "Planning a group trip is one of the most rewarding experiences you can share with friends, family, or colleagues — but it can also be one of the most chaotic. Between aligning schedules, managing budgets, and keeping everyone happy, group travel planning quickly becomes overwhelming. This guide walks you through every step of organizing a successful group trip, from the very first conversation to your last day on the road.",

    tocTitle: "Table of Contents",
    toc: [
      { id: "define-group", label: "Step 1: Define the Group & Set Expectations" },
      { id: "choose-destination", label: "Step 2: Choose a Destination Together" },
      { id: "set-budget", label: "Step 3: Set a Budget & Split Costs Fairly" },
      { id: "build-itinerary", label: "Step 4: Build Your Itinerary Collaboratively" },
      { id: "coordinate-logistics", label: "Step 5: Coordinate Logistics" },
      { id: "pack-smart", label: "Step 6: Pack Smart with Shared Lists" },
      { id: "stay-organized", label: "Step 7: Stay Organized During the Trip" },
      { id: "pro-tips", label: "Pro Tips from Experienced Group Travelers" },
    ],

    steps: [
      {
        id: "define-group",
        number: "01",
        title: "Define the Group & Set Expectations",
        paragraphs: [
          "Before you start researching flights or dreaming about destinations, take a step back and think about who you are traveling with. The composition of your group fundamentally shapes every decision that follows. A weekend away with four close friends requires a completely different approach than a two-week reunion trip with twelve extended family members.",
          "Start by deciding on the ideal group size. Smaller groups (4-6 people) are easier to coordinate and tend to be more flexible, while larger groups (8+) bring more energy but require stronger organization. Be honest about who works well together — mixing incompatible travel styles is a recipe for tension.",
          "Once you have your crew, have an open conversation about expectations early. Discuss travel pace (packed itinerary vs. relaxed exploration), accommodation preferences (hostels, Airbnbs, or hotels), and how much solo time versus group activities people want. Setting these expectations upfront prevents the most common group trip conflicts.",
          "With WePlanify, you can create a shared trip space where every member can join and voice their preferences from day one — no more endless group chat threads getting buried under memes.",
        ],
      },
      {
        id: "choose-destination",
        number: "02",
        title: "Choose a Destination Together",
        paragraphs: [
          "Choosing where to go as a group is often the first real test of group dynamics. Everyone has their dream destination, and finding common ground takes diplomacy. The key is to use a structured process rather than letting the loudest voice win.",
          "Start by having everyone suggest two or three destinations. Compile the list and then narrow it down based on practical criteria: visa requirements for all members, travel time, seasonal weather, and overall cost. A destination that sounds amazing but requires half the group to apply for a visa months in advance might not be practical.",
          "Once you have a shortlist of three to five options, put it to a vote. Anonymous polls work surprisingly well because they remove social pressure — people vote for what they actually want, not what they think they should want. The majority rules, and everyone agrees to commit to the winning choice.",
          "WePlanify's built-in group polls make this process seamless. Create a poll, share it with your group, and let everyone vote on their phone. Results are instant, transparent, and settle the debate quickly so you can move on to the fun part — planning the details.",
        ],
      },
      {
        id: "set-budget",
        number: "03",
        title: "Set a Budget & Split Costs Fairly",
        paragraphs: [
          "Money is the number one source of tension on group trips, and the best way to defuse it is radical transparency. Not everyone in your group will have the same budget, and that is perfectly okay — what matters is that everyone agrees on shared costs and understands what is covered versus what is optional.",
          "Begin by estimating the major expense categories: flights, accommodation, transport, food, activities, and a contingency fund. For shared expenses like accommodation and rental cars, decide early how costs will be split. Will it be an even split, or will people who get the master bedroom pay a little more? These conversations are awkward but essential.",
          "Create a shared budget tracker that everyone can see and update. Track who has paid for what in real time so there are no surprises at the end of the trip. For daily expenses, consider appointing a daily treasurer or using a simple rotation for picking up group tabs (like dinners or taxis).",
          "WePlanify includes a collaborative budget tracker where every group member can log expenses, see running totals, and know exactly where the money is going. No more spreadsheets, no more awkward 'you owe me' conversations at the end of the trip. Everything is transparent from day one.",
        ],
      },
      {
        id: "build-itinerary",
        number: "04",
        title: "Build Your Itinerary Collaboratively",
        paragraphs: [
          "The itinerary is where your group trip transforms from a vague idea into a real adventure. But building a day-by-day plan that satisfies everyone requires balance — too rigid and people feel controlled, too loose and you waste time deciding what to do each morning.",
          "Start with the non-negotiables: the experiences that would make or break the trip for specific members. Maybe someone has always wanted to visit a particular museum, or the whole point of the trip is a specific festival. Lock those in first. Then fill in around them with a mix of group activities and free time blocks.",
          "A proven structure is the 70/30 rule — plan roughly 70% of each day and leave 30% unstructured. This gives the group a clear direction while leaving room for spontaneity, rest, or those unexpected discoveries that become the best memories. Build in at least one full rest day for longer trips; travel fatigue is real and compounding.",
          "With WePlanify's collaborative itinerary builder, every group member can suggest activities, vote on options, and see the evolving plan in real time. The AI trip assistant can even recommend activities based on your destination, group size, and interests — saving hours of research.",
        ],
      },
      {
        id: "coordinate-logistics",
        number: "05",
        title: "Coordinate Logistics",
        paragraphs: [
          "Logistics are where group trips live or die. Flights, accommodation, and ground transport need to be booked with everyone's needs in mind, and the window for good prices does not wait for stragglers.",
          "For flights, decide early whether everyone will book independently or if one person will coordinate a group booking. If people are flying from different cities, set a hard deadline for everyone to have their flights booked — ideally eight to twelve weeks before departure for international trips. Share flight details in a central place so the group can plan airport pickups and adjust the itinerary based on arrival times.",
          "Accommodation for groups often works best as entire homes or apartments rather than individual hotel rooms. Platforms like Airbnb and Vrbo are ideal, but book early — properties that sleep six or more disappear fast in popular destinations. Make sure everyone agrees on the accommodation style and understands the cancellation policy before anyone puts down a deposit.",
          "For ground transport, research whether renting one or two cars, using rideshares, or relying on public transit makes more sense given your group size and destination. In many cities, a transit pass for everyone is cheaper and less stressful than parking multiple rental cars.",
          "WePlanify lets you centralize all your booking confirmations, flight details, and accommodation information in one shared trip dashboard. Everyone has access to the latest information — no more digging through emails or asking 'what is the address again?' in the group chat.",
        ],
      },
      {
        id: "pack-smart",
        number: "06",
        title: "Pack Smart with Shared Lists",
        paragraphs: [
          "Packing for a group trip is an opportunity most people miss. Instead of everyone independently packing every possible item, coordinate and share. You do not need five people bringing full-size sunscreen bottles, three first-aid kits, or four portable phone chargers.",
          "Create a shared packing list with two sections: personal essentials (things everyone needs their own of) and group items (things only one or two people need to bring for everyone). Common group items include a first-aid kit, power strips, card games, a portable speaker, basic cooking supplies if you are renting a kitchen, and specific gear for planned activities.",
          "For destination-specific packing, research the weather and cultural norms as a group. If you are going somewhere with modest dress codes, make sure everyone knows. If rain is likely, coordinate who brings a compact umbrella versus who relies on a rain jacket. Small details like these prevent headaches during the trip.",
          "WePlanify's shared packing lists let you assign group items to specific people, check off items as you pack, and make sure nothing essential falls through the cracks. You can even create packing list templates for different trip types to speed up future planning.",
        ],
      },
      {
        id: "stay-organized",
        number: "07",
        title: "Stay Organized During the Trip",
        paragraphs: [
          "All your careful planning means nothing if the group falls apart once the trip starts. Staying organized on the road is about communication, flexibility, and having a single source of truth that everyone can reference.",
          "Designate a daily point person on a rotating basis. This person is not the boss — they are simply the one who keeps things moving for the day, makes the restaurant reservation, checks the itinerary timing, and nudges people when it is time to leave. Rotating this role prevents burnout and spreads the mental load.",
          "Build in daily check-ins, even if they are casual. A quick five-minute chat over morning coffee about the day's plan keeps everyone aligned. This is also the time to surface any issues — if someone is feeling tired or wants to skip an activity, it is better to know early than to have them silently resent the pace.",
          "Be prepared to adapt. Weather changes, places are closed unexpectedly, or someone gets sick. Groups that have a backup plan for key activities and an attitude of flexibility have better trips than those rigidly attached to the original plan.",
          "WePlanify keeps your itinerary, budget, and logistics accessible to everyone in real time, even offline. Need to change plans? Update the itinerary and the whole group sees it instantly — no need to repeat yourself across multiple messages.",
        ],
      },
    ],

    proTips: {
      title: "Pro Tips from Experienced Group Travelers",
      tips: [
        {
          title: "Create a shared photo album from day one",
          text: "Use a shared Google Photos album, iCloud Shared Library, or similar service. Add photos throughout the trip so everyone goes home with hundreds of memories, not just their own perspective.",
        },
        {
          title: "Agree on a group communication channel",
          text: "Pick one platform — WhatsApp, Telegram, or a dedicated WePlanify trip chat — and keep all trip communication there. Side conversations are fine, but logistics should live in one place.",
        },
        {
          title: "Build in solo time without guilt",
          text: "Even the closest groups need breathing room. Normalize splitting up for a few hours. Some people recharge by exploring alone, visiting a museum, or just sitting in a cafe. The group will be stronger for it.",
        },
        {
          title: "Do a pre-trip meetup or video call",
          text: "Two weeks before departure, gather (virtually or in person) to review the itinerary, confirm logistics, and get excited together. This is the time to catch last-minute issues like expired passports or missing vaccinations.",
        },
      ],
    },

    cta: {
      title: "Ready to Plan Your Group Trip?",
      text: "Stop juggling spreadsheets, group chats, and email threads. WePlanify brings your entire group into one collaborative space — with itinerary planning, budget tracking, group polls, packing lists, and AI-powered recommendations. Free forever, no credit card required.",
      button: "Start Planning for Free",
    },

    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          q: "What is the ideal group size for a group trip?",
          a: "The sweet spot is 4 to 8 people. This size is large enough to create great group energy and split costs effectively, but small enough to coordinate logistics, agree on activities, and find accommodation easily. Groups larger than 10 often benefit from splitting into sub-groups for certain activities.",
        },
        {
          q: "How far in advance should we start planning a group trip?",
          a: "For domestic trips, start planning 2 to 3 months ahead. For international trips, give yourselves 4 to 6 months. This allows time for everyone to request time off work, save money, obtain any required visas, and book flights and accommodation at reasonable prices.",
        },
        {
          q: "How do you split costs fairly on a group trip?",
          a: "The fairest approach is to separate shared expenses (accommodation, rental car, group meals) from personal expenses (souvenirs, individual activities). Use a shared expense tracker like WePlanify to log who pays for what in real time. At the end of the trip, the app calculates who owes whom — no spreadsheets required.",
        },
        {
          q: "What if some group members have very different budgets?",
          a: "Acknowledge budget differences openly and without judgment. Offer tiered options where possible — for example, a group dinner at a mid-range restaurant with the option to upgrade individually. For accommodation, mixing room types or choosing a rental property with different-sized rooms allows flexibility without excluding anyone.",
        },
        {
          q: "How do you handle disagreements during group trip planning?",
          a: "Use democratic decision-making tools like polls and votes for major decisions (destination, accommodation style, key activities). For smaller decisions, rotate who gets the final say each day. The most important thing is to set expectations early — agree on a decision-making process before conflicts arise, not after.",
        },
      ],
    },
  },

  fr: {
    readTime: "12 min de lecture",
    heroTag: "Guide Complet",
    h1: "Comment Organiser un Voyage de Groupe : Le Guide Complet Etape par Etape (2026)",
    intro:
      "Organiser un voyage de groupe est l'une des experiences les plus enrichissantes que vous puissiez partager avec vos amis, votre famille ou vos collegues — mais cela peut aussi etre l'une des plus chaotiques. Entre l'alignement des agendas, la gestion des budgets et la satisfaction de chacun, la planification d'un voyage de groupe devient vite ecrasante. Ce guide vous accompagne a chaque etape de l'organisation d'un voyage de groupe reussi, de la toute premiere conversation jusqu'a votre dernier jour sur la route.",

    tocTitle: "Sommaire",
    toc: [
      { id: "define-group", label: "Etape 1 : Definir le Groupe et les Attentes" },
      { id: "choose-destination", label: "Etape 2 : Choisir une Destination Ensemble" },
      { id: "set-budget", label: "Etape 3 : Fixer un Budget et Partager les Frais" },
      { id: "build-itinerary", label: "Etape 4 : Construire un Itineraire Collaboratif" },
      { id: "coordinate-logistics", label: "Etape 5 : Coordonner la Logistique" },
      { id: "pack-smart", label: "Etape 6 : Faire ses Bagages avec des Listes Partagees" },
      { id: "stay-organized", label: "Etape 7 : Rester Organise Pendant le Voyage" },
      { id: "pro-tips", label: "Conseils de Voyageurs de Groupe Experimentes" },
    ],

    steps: [
      {
        id: "define-group",
        number: "01",
        title: "Definir le Groupe et les Attentes",
        paragraphs: [
          "Avant de commencer a rechercher des vols ou de rever de destinations, prenez du recul et reflechissez a avec qui vous voyagez. La composition de votre groupe influence fondamentalement chaque decision qui suit. Un week-end entre quatre amis proches necessite une approche completement differente d'un voyage de retrouvailles de deux semaines avec douze membres de la famille elargie.",
          "Commencez par definir la taille ideale du groupe. Les petits groupes (4 a 6 personnes) sont plus faciles a coordonner et ont tendance a etre plus flexibles, tandis que les grands groupes (8+) apportent plus d'energie mais necessitent une organisation plus solide. Soyez honnete sur qui voyage bien ensemble — melanger des styles de voyage incompatibles est une recette pour les tensions.",
          "Une fois votre equipe constituee, ayez une conversation ouverte sur les attentes des le depart. Discutez du rythme de voyage (itineraire charge vs. exploration detendue), des preferences d'hebergement (auberges, Airbnbs ou hotels) et du temps que chacun souhaite passer seul ou en groupe. Etablir ces attentes des le depart previent les conflits les plus courants en voyage de groupe.",
          "Avec WePlanify, vous pouvez creer un espace de voyage partage ou chaque membre peut rejoindre et exprimer ses preferences des le premier jour — plus besoin de fils de discussion interminables dans le chat de groupe.",
        ],
      },
      {
        id: "choose-destination",
        number: "02",
        title: "Choisir une Destination Ensemble",
        paragraphs: [
          "Choisir ou aller en groupe est souvent le premier vrai test de la dynamique de groupe. Chacun a sa destination de reve, et trouver un terrain d'entente demande de la diplomatie. La cle est d'utiliser un processus structure plutot que de laisser la voix la plus forte l'emporter.",
          "Commencez par demander a chacun de suggerer deux ou trois destinations. Compilez la liste puis reduisez-la en fonction de criteres pratiques : exigences de visa pour tous les membres, temps de trajet, meteo saisonniere et cout global. Une destination qui semble incroyable mais qui necessite que la moitie du groupe fasse une demande de visa des mois a l'avance n'est peut-etre pas pratique.",
          "Une fois que vous avez une liste restreinte de trois a cinq options, mettez-la au vote. Les sondages anonymes fonctionnent etonnamment bien car ils suppriment la pression sociale — les gens votent pour ce qu'ils veulent vraiment, pas pour ce qu'ils pensent devoir vouloir. La majorite l'emporte, et tout le monde s'engage a accepter le choix gagnant.",
          "Les sondages de groupe integres a WePlanify rendent ce processus fluide. Creez un sondage, partagez-le avec votre groupe et laissez chacun voter sur son telephone. Les resultats sont instantanes, transparents et reglent le debat rapidement pour que vous puissiez passer a la partie amusante — planifier les details.",
        ],
      },
      {
        id: "set-budget",
        number: "03",
        title: "Fixer un Budget et Partager les Frais Equitablement",
        paragraphs: [
          "L'argent est la source numero un de tensions lors des voyages de groupe, et la meilleure facon de la desamorcer est la transparence totale. Tout le monde dans votre groupe n'aura pas le meme budget, et c'est parfaitement normal — ce qui compte, c'est que chacun soit d'accord sur les frais partages et comprenne ce qui est couvert par rapport a ce qui est optionnel.",
          "Commencez par estimer les principales categories de depenses : vols, hebergement, transport, nourriture, activites et un fonds de contingence. Pour les depenses partagees comme l'hebergement et les voitures de location, decidez tot comment les couts seront repartis. Est-ce un partage egal, ou les personnes qui obtiennent la chambre principale paient-elles un peu plus ? Ces conversations sont delicates mais essentielles.",
          "Creez un suivi de budget partage que tout le monde peut voir et mettre a jour. Suivez qui a paye quoi en temps reel pour qu'il n'y ait pas de surprises a la fin du voyage. Pour les depenses quotidiennes, envisagez de nommer un tresorier du jour ou d'utiliser une simple rotation pour regler les additions du groupe (comme les diners ou les taxis).",
          "WePlanify inclut un suivi de budget collaboratif ou chaque membre du groupe peut enregistrer les depenses, voir les totaux en cours et savoir exactement ou va l'argent. Plus de tableurs, plus de conversations genantes 'tu me dois' a la fin du voyage. Tout est transparent des le premier jour.",
        ],
      },
      {
        id: "build-itinerary",
        number: "04",
        title: "Construire Votre Itineraire de Maniere Collaborative",
        paragraphs: [
          "L'itineraire est l'endroit ou votre voyage de groupe passe d'une idee vague a une veritable aventure. Mais construire un plan jour par jour qui satisfait tout le monde demande de l'equilibre — trop rigide et les gens se sentent controles, trop lache et vous perdez du temps chaque matin a decider quoi faire.",
          "Commencez par les incontournables : les experiences qui feraient ou defairaient le voyage pour certains membres. Peut-etre que quelqu'un a toujours voulu visiter un musee particulier, ou que le but meme du voyage est un festival specifique. Bloquez-les en premier. Puis remplissez autour avec un melange d'activites de groupe et de plages de temps libre.",
          "Une structure eprouvee est la regle du 70/30 — planifiez environ 70 % de chaque journee et laissez 30 % non structure. Cela donne au groupe une direction claire tout en laissant place a la spontaneite, au repos ou a ces decouvertes inattendues qui deviennent les meilleurs souvenirs. Prevoyez au moins une journee de repos complete pour les voyages plus longs ; la fatigue du voyage est reelle et cumulative.",
          "Avec le planificateur d'itineraire collaboratif de WePlanify, chaque membre du groupe peut suggerer des activites, voter sur les options et voir le plan evoluer en temps reel. L'assistant de voyage IA peut meme recommander des activites en fonction de votre destination, de la taille du groupe et des centres d'interet — vous faisant gagner des heures de recherche.",
        ],
      },
      {
        id: "coordinate-logistics",
        number: "05",
        title: "Coordonner la Logistique",
        paragraphs: [
          "La logistique est ce qui fait la reussite ou l'echec des voyages de groupe. Les vols, l'hebergement et le transport terrestre doivent etre reserves en tenant compte des besoins de chacun, et la fenetre pour de bons prix n'attend pas les retardataires.",
          "Pour les vols, decidez tot si chacun reservera independamment ou si une personne coordonnera une reservation de groupe. Si les gens partent de differentes villes, fixez une date limite ferme pour que tout le monde ait reserve ses vols — idealement huit a douze semaines avant le depart pour les voyages internationaux. Partagez les details des vols dans un endroit centralise pour que le groupe puisse planifier les transferts aeroport et ajuster l'itineraire en fonction des heures d'arrivee.",
          "L'hebergement pour les groupes fonctionne souvent mieux sous forme de maisons ou appartements entiers plutot que de chambres d'hotel individuelles. Les plateformes comme Airbnb et Vrbo sont ideales, mais reservez tot — les proprietes qui accueillent six personnes ou plus disparaissent vite dans les destinations populaires. Assurez-vous que tout le monde est d'accord sur le style d'hebergement et comprend la politique d'annulation avant que quiconque ne verse un acompte.",
          "Pour le transport terrestre, recherchez si louer une ou deux voitures, utiliser des VTC ou compter sur les transports en commun est plus logique compte tenu de la taille de votre groupe et de votre destination. Dans de nombreuses villes, un pass transport pour tout le monde est moins cher et moins stressant que de garer plusieurs voitures de location.",
          "WePlanify vous permet de centraliser toutes vos confirmations de reservation, details de vol et informations d'hebergement dans un tableau de bord de voyage partage. Tout le monde a acces aux dernieres informations — plus besoin de fouiller dans les emails ou de demander 'c'est quoi l'adresse deja ?' dans le chat de groupe.",
        ],
      },
      {
        id: "pack-smart",
        number: "06",
        title: "Faire ses Bagages Intelligemment avec des Listes Partagees",
        paragraphs: [
          "Faire ses bagages pour un voyage de groupe est une opportunite que la plupart des gens ratent. Au lieu que chacun emballe independamment chaque objet possible, coordonnez-vous et partagez. Vous n'avez pas besoin de cinq personnes apportant des bouteilles de creme solaire grand format, trois trousses de premiers soins ou quatre chargeurs de telephone portables.",
          "Creez une liste de bagages partagee avec deux sections : les essentiels personnels (choses dont chacun a besoin de sa propre version) et les objets de groupe (choses qu'une ou deux personnes doivent apporter pour tout le monde). Les objets de groupe courants incluent une trousse de premiers soins, des multiprises, des jeux de cartes, une enceinte portable, des fournitures de cuisine de base si vous louez un logement avec cuisine et du materiel specifique pour les activites prevues.",
          "Pour les bagages specifiques a la destination, renseignez-vous ensemble sur la meteo et les normes culturelles. Si vous allez dans un endroit avec des codes vestimentaires modestes, assurez-vous que tout le monde le sait. Si la pluie est probable, coordonnez qui apporte un parapluie compact ou qui compte sur un imper. Ces petits details evitent les maux de tete pendant le voyage.",
          "Les listes de bagages partagees de WePlanify vous permettent d'attribuer des objets de groupe a des personnes specifiques, de cocher les objets au fur et a mesure que vous les emballez et de vous assurer que rien d'essentiel ne passe entre les mailles du filet. Vous pouvez meme creer des modeles de listes de bagages pour differents types de voyages afin d'accelerer la planification future.",
        ],
      },
      {
        id: "stay-organized",
        number: "07",
        title: "Rester Organise Pendant le Voyage",
        paragraphs: [
          "Toute votre planification minutieuse ne sert a rien si le groupe se desorganise une fois le voyage commence. Rester organise sur la route est une question de communication, de flexibilite et d'avoir une source unique de verite que chacun peut consulter.",
          "Designez un responsable du jour sur une base tournante. Cette personne n'est pas le chef — elle est simplement celle qui maintient le rythme de la journee, fait la reservation au restaurant, verifie le timing de l'itineraire et rappelle aux gens quand il est temps de partir. Alterner ce role previent l'epuisement et repartit la charge mentale.",
          "Prevoyez des points quotidiens, meme s'ils sont informels. Une rapide discussion de cinq minutes autour du cafe du matin sur le programme de la journee garde tout le monde aligne. C'est aussi le moment de soulever les problemes — si quelqu'un est fatigue ou veut sauter une activite, il vaut mieux le savoir tot que de le voir silencieusement en vouloir au rythme.",
          "Soyez pret a vous adapter. La meteo change, des endroits sont fermes de maniere inattendue ou quelqu'un tombe malade. Les groupes qui ont un plan B pour les activites cles et une attitude de flexibilite passent de meilleurs voyages que ceux rigidement attaches au plan initial.",
          "WePlanify garde votre itineraire, budget et logistique accessibles a tous en temps reel, meme hors ligne. Besoin de changer les plans ? Mettez a jour l'itineraire et tout le groupe le voit instantanement — pas besoin de vous repeter dans plusieurs messages.",
        ],
      },
    ],

    proTips: {
      title: "Conseils de Voyageurs de Groupe Experimentes",
      tips: [
        {
          title: "Creez un album photo partage des le premier jour",
          text: "Utilisez un album Google Photos partage, une bibliotheque iCloud partagee ou un service similaire. Ajoutez des photos tout au long du voyage pour que chacun reparte avec des centaines de souvenirs, pas seulement sa propre perspective.",
        },
        {
          title: "Convenez d'un canal de communication de groupe",
          text: "Choisissez une plateforme — WhatsApp, Telegram ou un chat de voyage WePlanify dedie — et gardez toute la communication du voyage la-bas. Les conversations paralleles sont acceptables, mais la logistique doit etre centralisee.",
        },
        {
          title: "Integrez du temps solo sans culpabilite",
          text: "Meme les groupes les plus soudes ont besoin d'espace. Normalisez le fait de se separer pendant quelques heures. Certaines personnes se ressourcent en explorant seules, en visitant un musee ou simplement en s'asseyant dans un cafe. Le groupe en sortira renforce.",
        },
        {
          title: "Faites une reunion pre-voyage",
          text: "Deux semaines avant le depart, reunissez-vous (virtuellement ou en personne) pour revoir l'itineraire, confirmer la logistique et partager l'excitation. C'est le moment de reperer les problemes de derniere minute comme les passeports expires ou les vaccinations manquantes.",
        },
      ],
    },

    cta: {
      title: "Pret a Organiser Votre Voyage de Groupe ?",
      text: "Arretez de jongler entre tableurs, chats de groupe et fils d'emails. WePlanify reunit tout votre groupe dans un seul espace collaboratif — avec planification d'itineraire, suivi de budget, sondages de groupe, listes de bagages et recommandations alimentees par l'IA. Gratuit pour toujours, sans carte de credit.",
      button: "Commencer a Planifier Gratuitement",
    },

    faq: {
      title: "Questions Frequemment Posees",
      items: [
        {
          q: "Quelle est la taille ideale pour un voyage de groupe ?",
          a: "Le nombre ideal est de 4 a 8 personnes. Cette taille est suffisamment grande pour creer une belle dynamique de groupe et partager les couts efficacement, mais suffisamment petite pour coordonner la logistique, se mettre d'accord sur les activites et trouver un hebergement facilement. Les groupes de plus de 10 personnes beneficient souvent de se diviser en sous-groupes pour certaines activites.",
        },
        {
          q: "Combien de temps a l'avance faut-il commencer a planifier un voyage de groupe ?",
          a: "Pour les voyages nationaux, commencez a planifier 2 a 3 mois a l'avance. Pour les voyages internationaux, accordez-vous 4 a 6 mois. Cela laisse le temps a chacun de demander des conges, d'economiser, d'obtenir les visas necessaires et de reserver vols et hebergement a des prix raisonnables.",
        },
        {
          q: "Comment repartir les frais equitablement lors d'un voyage de groupe ?",
          a: "L'approche la plus equitable est de separer les depenses partagees (hebergement, voiture de location, repas de groupe) des depenses personnelles (souvenirs, activites individuelles). Utilisez un outil de suivi des depenses partage comme WePlanify pour enregistrer qui paie quoi en temps reel. A la fin du voyage, l'application calcule qui doit combien a qui — sans tableur necessaire.",
        },
        {
          q: "Que faire si certains membres du groupe ont des budgets tres differents ?",
          a: "Reconnaissez les differences de budget ouvertement et sans jugement. Proposez des options a plusieurs niveaux quand c'est possible — par exemple, un diner de groupe dans un restaurant de gamme moyenne avec la possibilite d'upgrader individuellement. Pour l'hebergement, mixer les types de chambres ou choisir une location avec des chambres de tailles differentes permet de la flexibilite sans exclure personne.",
        },
        {
          q: "Comment gerer les desaccords pendant la planification d'un voyage de groupe ?",
          a: "Utilisez des outils de prise de decision democratique comme les sondages et les votes pour les decisions majeures (destination, style d'hebergement, activites cles). Pour les decisions mineures, alternez qui a le dernier mot chaque jour. Le plus important est d'etablir les attentes tot — convenez d'un processus de prise de decision avant que les conflits ne surgissent, pas apres.",
        },
      ],
    },
  },
};

// ---------------------------------------------------------------------------
// JSON-LD FAQ Schema
// ---------------------------------------------------------------------------

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
    datePublished: "2026-03-19",
    dateModified: "2026-03-19",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${PATHNAME}`,
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

export default async function PlanGroupTripGuidePage({ params }: Props) {
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
      <FaqJsonLd locale={locale} />
      <ArticleJsonLd locale={locale} />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
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

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Table of Contents */}
        <nav
          aria-label={c.tocTitle}
          className="py-10 lg:py-12 px-4 lg:px-8"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-5">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2">
              {c.toc.map((item, i) => (
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

        {/* Steps */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">
            {c.steps.map((step) => (
              <section key={step.id} id={step.id}>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-[#F6391A] text-4xl lg:text-5xl font-londrina-solid leading-none">
                    {step.number}
                  </span>
                  <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight">
                    {step.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {step.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </article>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Pro Tips */}
        <section id="pro-tips" className="py-12 lg:py-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-8">
              {c.proTips.title}
            </h2>
            <div className="grid gap-6">
              {c.proTips.tips.map((tip, i) => (
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
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
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

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#001E13] rounded-3xl p-8 lg:p-14">
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl font-londrina-solid mb-4">
                {c.cta.title}
              </h2>
              <p className="text-[#FFFBF5]/80 text-sm lg:text-base font-karla leading-relaxed mb-8 max-w-xl mx-auto">
                {c.cta.text}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#F6391A] hover:bg-[#d42d10] text-[#FFFBF5] font-karla font-bold text-sm lg:text-base px-8 py-3.5 rounded-full transition-colors"
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
