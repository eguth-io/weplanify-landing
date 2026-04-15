import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/road-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "How to Plan a Road Trip With Friends — Group Route Planner | WePlanify"
    : "Organiser un Road Trip entre Amis — Planificateur d'Itinéraire de Groupe | WePlanify";
  const description = isEn
    ? "Plan your group road trip with WePlanify. Collaborative route planning, shared gas budgets, packing coordination, and group polls for every stop along the way."
    : "Organisez votre road trip de groupe avec WePlanify. Planification d'itinéraire collaborative, budget essence partagé, coordination des bagages et sondages pour chaque étape.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function RoadTripPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Accueil", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Road Trip", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Plan a Road Trip With Your Crew" : "Organiser un Road Trip entre Amis",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19", dateModified: "2026-04-15",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqItems = isEn
    ? [
        { q: "How do you split gas costs fairly on a road trip?", a: "Log every fill-up in WePlanify's shared budget tracker — who paid, how much, which car. At the end of the trip, the app calculates who owes what. For multi-car trips, track each vehicle separately. No more Venmo guesswork." },
        { q: "How many stops should a road trip have per day?", a: "Two to three intentional stops per day is the sweet spot. More than that and you spend the whole trip getting in and out of the car. Build one 'must-see' stop and one or two flexible ones into each day's itinerary. Leave room for spontaneous discoveries." },
        { q: "What if we have different driving preferences?", a: "Use polls to decide the big routing questions (coastal vs. inland, fast highways vs. scenic routes). For daily driving duties, set up a rotation in the itinerary. WePlanify's shared plan keeps everyone aligned on who's driving when." },
        { q: "How do you coordinate packing for a road trip?", a: "Car space is limited. Create a shared packing list with two sections: personal items and shared gear (cooler, camping equipment, tools, first-aid kit, speaker). Assign shared items to specific people so you don't end up with three portable chargers and no jumper cables." },
        { q: "Can WePlanify work offline during a road trip?", a: "WePlanify works in your browser on any device. While you need an internet connection to sync changes, you can save key details (addresses, reservation codes) in the trip notes before hitting a dead zone. Most of your route will have coverage." },
        { q: "How far ahead should we plan a road trip?", a: "Two to four weeks is usually enough for domestic road trips. Book accommodation for key overnight stops early — popular spots fill up fast, especially on weekends. Leave the route flexible but lock in the places you'll sleep. Start a WePlanify trip as soon as the idea forms." },
      ]
    : [
        { q: "Comment répartir les frais d'essence équitablement ?", a: "Enregistrez chaque plein dans le suivi de budget WePlanify — qui a payé, combien, quelle voiture. À la fin du voyage, l'appli calcule qui doit quoi. Pour les voyages multi-voitures, suivez chaque véhicule séparément." },
        { q: "Combien d'arrêts prévoir par jour ?", a: "Deux à trois arrêts intentionnels par jour, c'est le bon ratio. Plus et vous passez le voyage à monter et descendre de voiture. Prévoyez un arrêt 'incontournable' et un ou deux flexibles dans l'itinéraire de chaque jour. Laissez de la place pour les découvertes spontanées." },
        { q: "Et si on a des préférences de conduite différentes ?", a: "Utilisez les sondages pour les grandes questions d'itinéraire (côte vs. intérieur, autoroute vs. route panoramique). Pour la conduite quotidienne, organisez une rotation dans l'itinéraire. Le plan partagé WePlanify garde tout le monde aligné sur qui conduit quand." },
        { q: "Comment coordonner les bagages pour un road trip ?", a: "L'espace dans la voiture est limité. Créez une liste partagée avec deux sections : affaires personnelles et équipement commun (glacière, matériel de camping, outils, trousse de secours, enceinte). Assignez les objets communs pour éviter trois chargeurs et zéro câbles de démarrage." },
        { q: "WePlanify fonctionne-t-il hors ligne en road trip ?", a: "WePlanify fonctionne dans votre navigateur sur n'importe quel appareil. Vous avez besoin d'une connexion pour synchroniser, mais vous pouvez sauvegarder les détails clés (adresses, codes de réservation) dans les notes avant les zones blanches." },
        { q: "Combien de temps avant faut-il planifier un road trip ?", a: "Deux à quatre semaines suffisent pour les road trips nationaux. Réservez l'hébergement pour les étapes clés tôt — les spots populaires se remplissent vite, surtout les week-ends. Gardez l'itinéraire flexible mais verrouillez les endroits où vous dormirez." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
                { label: "Road Trip" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              Road Trip
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "The Open Road, Your Crew, Zero Stress"
                : "La Route, Votre Bande, Zéro Stress"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>A road trip with friends is the ultimate freedom — until someone has to be the one who plans the route, tracks the gas money, and figures out where everyone&apos;s sleeping. Here&apos;s how to share the load. If you&apos;re still comparing tools, check out our take on the <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">best group travel apps</Link>.</>
                : <>Un road trip entre potes, c&apos;est la liberté absolue — jusqu&apos;à ce que quelqu&apos;un doive planifier l&apos;itinéraire, suivre les frais d&apos;essence et trouver où tout le monde dort. Voici comment partager la charge. Si vous hésitez encore entre les outils, jetez un œil à notre comparatif des <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">meilleures applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "7 min read" : "7 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-31" />
          </div>
        </section>

        {/* ━━━ THE REAL PROBLEM ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Road trips sound simple — just get in the car and drive. But with a group, every decision multiplies. Which route? How many stops? Who's driving when? Where do we sleep? Who's paying for gas? Who brings the cooler? By the time you've coordinated five people across six days, you've sent 300 messages and nobody's sure what the plan is."
                : "Les road trips ont l'air simples — on monte en voiture et on roule. Mais en groupe, chaque décision se multiplie. Quel itinéraire ? Combien d'arrêts ? Qui conduit quand ? Où dort-on ? Qui paie l'essence ? Qui apporte la glacière ? Quand vous avez coordonné cinq personnes sur six jours, vous avez envoyé 300 messages et personne ne sait quel est le plan."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify turns the chaos into a shared roadmap — one place for the route, the budget, and the packing list."
                : "WePlanify transforme le chaos en feuille de route partagée — un seul endroit pour l'itinéraire, le budget et les bagages."}
            </p>
          </div>
        </section>

        {/* ━━━ ANATOMY OF A ROAD TRIP ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Anatomy of a Group Road Trip" : "Anatomie d'un Road Trip de Groupe"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {isEn
                  ? "Every road trip has the same building blocks. Here's how to get each one right with a group."
                  : "Chaque road trip a les mêmes composantes. Voici comment réussir chacune en groupe."}
              </p>

              {/* Route visual - vertical stops */}
              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "The Route", desc: "Vote on the big decision first: scenic or fast? Coastal or inland? Create a poll, settle it, and build the route in a shared itinerary where everyone can add stop suggestions. Lock the overnight points early — the road between them stays flexible.", link: "/features/polls" },
                      { stop: "The Stops", desc: "This is where road trips become memorable. Let everyone suggest their must-see stops, then curate together. The 70/30 rule works perfectly here: 70% planned stops, 30% spontaneous. Add each stop to the shared itinerary with addresses and notes so the driver isn't fumbling with a phone.", link: "/features/planning" },
                      { stop: "The Money", desc: "Gas, tolls, food, accommodation, activities. On a multi-day road trip, expenses add up fast and across many categories. Log every expense in real time — who paid, how much, for what. WePlanify calculates balances automatically so you settle up once at the end, not after every gas station.", link: "/features/budget" },
                      { stop: "The Car", desc: "Five people, one trunk. Space is the ultimate constraint. A shared packing list with assigned items prevents the classic road trip mistake: three Bluetooth speakers, no bottle opener, and zero jumper cables. Mark what goes in which car if you're taking multiple vehicles.", link: "/features/packing" },
                    ]
                  : [
                      { stop: "L'Itinéraire", desc: "Votez d'abord sur la grande question : panoramique ou rapide ? Côte ou intérieur ? Créez un sondage, tranchez, et construisez la route dans un itinéraire partagé où chacun peut ajouter des suggestions d'arrêts. Verrouillez les points de nuit tôt — la route entre eux reste flexible.", link: "/features/polls" },
                      { stop: "Les Arrêts", desc: "C'est là que les road trips deviennent mémorables. Laissez chacun proposer ses arrêts incontournables, puis sélectionnez ensemble. La règle du 70/30 fonctionne parfaitement ici : 70% planifié, 30% spontané. Ajoutez chaque arrêt à l'itinéraire partagé avec adresses et notes.", link: "/features/planning" },
                      { stop: "L'Argent", desc: "Essence, péages, nourriture, hébergement, activités. Sur un road trip de plusieurs jours, les dépenses s'accumulent vite. Enregistrez chaque dépense en temps réel — qui a payé, combien, pour quoi. WePlanify calcule les soldes automatiquement pour régler une seule fois à la fin.", link: "/features/budget" },
                      { stop: "La Voiture", desc: "Cinq personnes, un coffre. L'espace est la contrainte ultime. Une liste de bagages partagée avec des objets assignés évite l'erreur classique : trois enceintes Bluetooth, pas de décapsuleur et zéro câbles de démarrage. Marquez ce qui va dans quelle voiture si vous en prenez plusieurs.", link: "/features/packing" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    {/* Vertical line + dot */}
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < 3 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
                    {/* Content */}
                    <div className="pb-12 lg:pb-16">
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">
                        <Link href={`/${locale}${item.link}`} className="text-[#FFFBF5] hover:text-[#EEF899] transition-colors no-underline">{item.stop}</Link>
                      </h3>
                      <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ CAR ESSENTIALS CHECKLIST ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Road Trip Essentials Checklist" : "Checklist Essentiels Road Trip"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10">
              {isEn
                ? "The things groups always forget. Assign each to a person in your WePlanify packing list."
                : "Les choses que les groupes oublient toujours. Assignez chacune à une personne dans votre liste WePlanify."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {(isEn
                ? [
                    "Phone mounts & chargers for the driver",
                    "Aux cable or Bluetooth FM transmitter",
                    "Cooler with ice packs",
                    "First-aid kit",
                    "Jumper cables / portable jump starter",
                    "Paper maps (for dead zones)",
                    "Reusable water bottles",
                    "Trash bags for the car",
                    "Blankets & pillows for passengers",
                    "Shared snack stash",
                    "Tire pressure gauge",
                    "Portable phone battery pack",
                  ]
                : [
                    "Supports téléphone & chargeurs pour le conducteur",
                    "Câble aux ou transmetteur Bluetooth FM",
                    "Glacière avec pains de glace",
                    "Trousse de premiers secours",
                    "Câbles de démarrage / booster portable",
                    "Cartes papier (pour les zones blanches)",
                    "Bouteilles d'eau réutilisables",
                    "Sacs poubelle pour la voiture",
                    "Couvertures & oreillers pour les passagers",
                    "Stock de snacks partagé",
                    "Jauge de pression des pneus",
                    "Batterie externe téléphone",
                  ]
              ).map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-[#001E13]/6">
                  <span className="text-[#61DBD5] text-lg">&#x2713;</span>
                  <span className="text-[#001E13]/75 font-karla text-sm lg:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#61DBD5] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {isEn
                ? "The best road trips aren't about the destination — they're about what happens between the stops. Make sure the planning doesn't kill the vibe before you even leave."
                : "Les meilleurs road trips ne sont pas une question de destination — c'est ce qui se passe entre les étapes qui compte. Faites en sorte que la planification ne tue pas l'ambiance avant même de partir."}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING YOUR ROUTE ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Planning Your Route: Step by Step" : "Planifier Votre Itinéraire : Étape par Étape"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Start with the anchors — the places you absolutely want to visit — and build the route around them. Before drawing a line on the map, agree on the trip's rhythm: how many hours of driving per day feels right for your group? Four to five hours is a realistic max before fatigue sets in. Once you have the anchors, connect them with stretches that balance highway efficiency and scenic value."
                : "Commencez par les points d'ancrage — les endroits que vous voulez absolument voir — et construisez l'itinéraire autour d'eux. Avant de tracer un trait sur la carte, mettez-vous d'accord sur le rythme du voyage : combien d'heures de route par jour sont supportables pour votre groupe ? Quatre à cinq heures, c'est un maximum réaliste avant que la fatigue s'installe. Une fois les points d'ancrage définis, reliez-les en équilibrant efficacité autoroutière et intérêt panoramique."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>When the group can&apos;t agree on which stops to prioritize, <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">run a quick poll</Link> — everyone ranks their top three, and the results settle the debate without drama. This works especially well for the scenic-detour-vs-highway question: some people want the Instagram-worthy coastal road, others just want to get there. A vote makes it fair.</>
                : <>Quand le groupe n&apos;arrive pas à se mettre d&apos;accord sur les arrêts prioritaires, <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">lancez un sondage rapide</Link> — chacun classe ses trois favoris, et les résultats tranchent sans drama. Ça fonctionne particulièrement bien pour le dilemme route panoramique vs autoroute : certains veulent la route côtière instagrammable, d&apos;autres veulent juste arriver. Un vote, et c&apos;est réglé.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Driving shifts matter more than you think. Assign them in advance so the same person isn&apos;t stuck behind the wheel every morning. Alternate between drivers every two to three hours, and schedule real rest breaks — not just gas station stops. A 20-minute break at a viewpoint beats a 5-minute stop at a highway rest area. Build all of this into your <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> so the plan is visible to everyone, not just the organizer.</>
                : <>Les relais de conduite comptent plus qu&apos;on ne le pense. Définissez-les à l&apos;avance pour que la même personne ne se retrouve pas au volant chaque matin. Alternez entre conducteurs toutes les deux à trois heures, et prévoyez de vraies pauses — pas juste des arrêts station-service. Vingt minutes à un point de vue valent mieux que cinq minutes sur une aire d&apos;autoroute. Intégrez tout ça dans votre <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> pour que le plan soit visible par tous, pas seulement l&apos;organisateur.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Leave buffer time in the schedule — at least an hour of slack per day. Road trips never go exactly to plan. A farmer's market you didn't know about, a detour because of construction, a restaurant someone spotted from the highway. The buffer is what lets you say yes to these moments instead of stressing about being behind schedule."
                : "Gardez du temps tampon dans le planning — au moins une heure de marge par jour. Les road trips ne se passent jamais exactement comme prévu. Un marché local que vous ne connaissiez pas, un détour à cause de travaux, un resto repéré depuis l'autoroute. C'est cette marge qui vous permet de dire oui à ces moments au lieu de stresser parce que vous êtes en retard sur le programme."}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET TIPS ━━━ */}
        <FadeIn>
          <section className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Budget Tips for Group Road Trips" : "Astuces Budget pour un Road Trip de Groupe"}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Gas is the obvious cost, but it adds up fast alongside tolls, parking, accommodation, and roadside food. The simplest approach: one person pays at the pump and logs it in a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link>. Rotate who pays so the burden is spread throughout the trip, and let the app sort out the math at the end. For multi-car convoys, track each vehicle separately — fuel economy varies, and it&apos;s not fair to average a sedan with an SUV.</>
                  : <>L&apos;essence est la dépense évidente, mais elle s&apos;accumule vite avec les péages, le stationnement, l&apos;hébergement et la nourriture en route. L&apos;approche la plus simple : une personne paie à la pompe et l&apos;enregistre dans un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link>. Faites tourner qui paie pour répartir la charge tout au long du voyage, et laissez l&apos;appli s&apos;occuper des calculs à la fin. Pour les convois multi-voitures, suivez chaque véhicule séparément — la consommation varie, et ce n&apos;est pas juste de faire la moyenne entre une berline et un SUV.</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "If you're renting a car, sort out who's on the insurance and who's listed as an additional driver before you leave. Rental companies charge per extra driver — factor that into the split. Tolls are another sneaky cost: on some routes, they can rival the gas budget. Check toll calculators for your route in advance and decide as a group whether to take the toll road or save money with the slower alternative."
                  : "Si vous louez une voiture, réglez la question de l'assurance et des conducteurs additionnels avant de partir. Les loueurs facturent par conducteur supplémentaire — intégrez ça dans la répartition. Les péages sont un autre coût sournois : sur certains itinéraires, ils peuvent rivaliser avec le budget essence. Vérifiez les calculateurs de péage pour votre trajet à l'avance et décidez ensemble si vous prenez l'autoroute à péage ou si vous économisez avec l'alternative plus lente."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "For accommodation, mixing it up keeps costs manageable. Alternate between campgrounds, hostels, and Airbnbs depending on where you stop. Splitting a three-bedroom rental five ways is almost always cheaper than individual hotel rooms, and it doubles as a hangout spot. Log every shared expense as it happens — waiting until the end of the trip to sort out who owes what is a recipe for forgotten charges and awkward conversations."
                  : "Côté hébergement, varier les options garde le budget sous contrôle. Alternez entre campings, auberges et locations selon vos étapes. Partager un logement à trois chambres à cinq revient presque toujours moins cher que des chambres d'hôtel individuelles, et ça fait un lieu de vie commun. Enregistrez chaque dépense partagée au moment où elle arrive — attendre la fin du voyage pour démêler qui doit quoi, c'est la recette pour des oublis et des conversations gênantes."}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ FAQ ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {isEn ? "Frequently Asked Questions" : "Questions Fréquemment Posées"}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details key={i} className="group border-b border-[#001E13]/10 pb-5">
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DISCOVER MORE ━━━ */}
        <section className="py-12 lg:py-16 px-6 lg:px-12 bg-[#FFFBF5]">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">{isEn ? "Discover More" : "Découvrir aussi"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Trip with Friends" : "Voyage entre Amis"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan any group trip effortlessly." : "Organisez n'importe quel voyage de groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Group Trip Guide" : "Guide Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "The complete step-by-step guide." : "Le guide complet étape par étape."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read the guide →" : "Lire le guide →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Best Group Travel Apps" : "Meilleures Applis Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Our comparison of the top tools for group trips." : "Notre comparatif des meilleurs outils pour voyager en groupe."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read the article →" : "Lire l'article →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/family-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Family Trip" : "Voyage en Famille"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a multi-generational family vacation." : "Organisez des vacances familiales multi-générations."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {isEn ? "Hit the Road Together" : "Prenez la Route Ensemble"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Plan the route, split the costs, pack the car — all in one place." : "Planifiez la route, partagez les frais, préparez la voiture — le tout au même endroit."}
              </p>
              <div className="flex justify-center">
                <Link href="https://app.weplanify.com/register">
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Start planning" : "Commencer"}</PulsatingButton>
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
