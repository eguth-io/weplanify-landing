import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ArticleTOC from "@/components/ArticleTOC";
import { setRequestLocale } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/world-cup-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "World Cup 2026 Trip Planner — Free, for Groups | WePlanify"
    : "Coupe du Monde 2026 entre Potes — Planificateur Gratuit | WePlanify";
  const description = isEn
    ? "Free World Cup 2026 trip planner for groups of fans. Build your multi-city route across the USA, Canada and Mexico, split costs by category, and coordinate logistics across the 16 host cities — no agency, no subscription."
    : "Planificateur gratuit Coupe du Monde 2026 entre potes. Pas une agence, votre plan à vous : itinéraire multi-villes USA / Canada / Mexique, budget partagé par catégorie et logistique des 16 villes hôtes — sans pack tout fait, sans abonnement.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function WorldCup2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "World Cup 2026 Trip Planner" : "Planificateur Coupe du Monde 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "World Cup 2026 Trip Planner: Follow Your Team Across 3 Countries" : "Coupe du Monde 2026 entre Potes : Votre Itinéraire, Pas un Pack Agence",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-07", dateModified: "2026-05-07",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const sportsEventLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: isEn ? "FIFA World Cup 2026" : "Coupe du Monde de la FIFA 2026",
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Association football",
    organizer: { "@type": "Organization", name: "FIFA", url: "https://www.fifa.com" },
    location: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Mexico" },
    ],
    subEvent: [
      { "@type": "SportsEvent", name: "World Cup 2026 Atlanta matches", location: { "@type": "Place", name: "Atlanta", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Boston matches", location: { "@type": "Place", name: "Boston", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Dallas matches", location: { "@type": "Place", name: "Dallas", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Houston matches", location: { "@type": "Place", name: "Houston", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Kansas City matches", location: { "@type": "Place", name: "Kansas City", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Los Angeles matches", location: { "@type": "Place", name: "Los Angeles", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Miami matches", location: { "@type": "Place", name: "Miami", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 New York / New Jersey matches", location: { "@type": "Place", name: "East Rutherford", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Philadelphia matches", location: { "@type": "Place", name: "Philadelphia", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 San Francisco Bay Area matches", location: { "@type": "Place", name: "Santa Clara", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Seattle matches", location: { "@type": "Place", name: "Seattle", address: { "@type": "PostalAddress", addressCountry: "US" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Toronto matches", location: { "@type": "Place", name: "Toronto", address: { "@type": "PostalAddress", addressCountry: "CA" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Vancouver matches", location: { "@type": "Place", name: "Vancouver", address: { "@type": "PostalAddress", addressCountry: "CA" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Guadalajara matches", location: { "@type": "Place", name: "Guadalajara", address: { "@type": "PostalAddress", addressCountry: "MX" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Mexico City matches", location: { "@type": "Place", name: "Mexico City", address: { "@type": "PostalAddress", addressCountry: "MX" } } },
      { "@type": "SportsEvent", name: "World Cup 2026 Monterrey matches", location: { "@type": "Place", name: "Monterrey", address: { "@type": "PostalAddress", addressCountry: "MX" } } },
    ],
  };

  const faqItems = isEn
    ? [
        { q: "Do I need a visa to attend the World Cup 2026?", a: "It depends on your nationality and which host country you visit. The USA requires an ESTA (visa-waiver) or B-2 visa, Canada requires an eTA or visa, Mexico typically allows visa-free entry for most Western passports up to 180 days. If your team plays across all three countries, check each country's requirements separately — being valid for one doesn't grant entry to another. Apply early; processing slows down as June approaches." },
        { q: "How do I plan a trip if my team's group hasn't been drawn yet?", a: "Build a flexible base — book refundable flights into a major hub (NYC, LA, Mexico City) and lock down accommodation only for the first match window. Once the draw fixes the cities, finalize the rest. WePlanify lets you sketch multiple scenario itineraries side by side and pick the one that matches the actual fixtures." },
        { q: "What's the cheapest way to travel between host cities?", a: "Within the US, domestic flights are usually cheaper and faster than driving for distances over 600 miles. For shorter hops (e.g. Boston to NYC), Amtrak or buses can beat flying once you factor in airport time. Crossing borders to Canada or Mexico almost always means flying — book those legs early as fan demand will spike prices." },
        { q: "How many matches should I realistically try to attend?", a: "Most fans following one team manage 3 group-stage matches plus a knockout if their team advances. Stadium-to-stadium travel eats more time than people expect — plan for at least one full travel day between non-adjacent cities. Build buffer days for jet lag, queue times at security, and the unmissable fan zones." },
        { q: "How do you split costs when traveling with a group of fans?", a: "Use a shared budget tracker from day one. World Cup trips have unusual cost structures — match tickets paid by individuals via FIFA, hotels split by room, transport split by group, food split per meal. WePlanify separates these categories so each person sees exactly what they owe and to whom, with no end-of-trip math marathon." },
        { q: "When should I book accommodation in host cities?", a: "Now, if you can. Host city hotels in Miami, NYC, LA, Toronto and Mexico City started filling for match dates in early 2026 and prices are already 3-5x normal levels. Look outside official zones (Airbnbs in suburbs, neighboring cities with rail links) and reserve refundable options if your team's path isn't fixed yet." },
        { q: "Are fan zones worth visiting if I don't have a match ticket?", a: "Yes. Every host city has an official FIFA Fan Festival with big-screen broadcasts, food, and live entertainment, plus the unofficial neighborhood gatherings that often have better atmosphere. They're free to enter and can be the highlight for fans who couldn't get match tickets. Add them to your itinerary as backup plans." },
      ]
    : [
        { q: "Faut-il un visa pour assister à la Coupe du Monde 2026 ?", a: "Ça dépend de votre nationalité et du pays hôte. Les USA exigent un ESTA ou un visa B-2, le Canada un AVE ou un visa, le Mexique autorise généralement l'entrée sans visa jusqu'à 180 jours pour la plupart des passeports occidentaux. Si votre équipe joue dans les trois pays, vérifiez chaque pays séparément — être valide pour l'un ne donne pas accès à l'autre. Faites les démarches tôt, les délais s'allongent à l'approche de juin." },
        { q: "Comment planifier si le groupe de mon équipe n'est pas encore tiré ?", a: "Construisez une base flexible — réservez des vols remboursables vers un hub majeur (New York, Los Angeles, Mexico) et bloquez l'hébergement uniquement pour la fenêtre du premier match. Une fois le tirage fixé, finalisez le reste. WePlanify permet d'esquisser plusieurs scénarios d'itinéraire en parallèle et de choisir celui qui correspond aux vrais matchs." },
        { q: "Quel est le moyen le moins cher de voyager entre les villes hôtes ?", a: "Aux USA, les vols intérieurs sont généralement plus rapides et moins chers que la voiture au-delà de 1000 km. Pour les trajets courts (ex. Boston-NYC), Amtrak ou les bus peuvent battre l'avion une fois le temps d'aéroport pris en compte. Traverser vers le Canada ou le Mexique implique presque toujours de voler — réservez ces tronçons tôt, la demande des fans va faire grimper les prix." },
        { q: "Combien de matchs peut-on raisonnablement enchaîner ?", a: "La plupart des fans qui suivent une équipe arrivent à enchaîner 3 matchs de poule plus un huitième si l'équipe se qualifie. Les déplacements stade à stade prennent plus de temps que prévu — comptez au moins une journée pleine de transport entre deux villes non adjacentes. Prévoyez des jours tampons pour le décalage horaire, les files d'attente sécurité et les fan zones incontournables." },
        { q: "Comment partager les frais à plusieurs supporters ?", a: "Utilisez un suivi de budget partagé dès le départ. Un voyage Coupe du Monde a une structure de coûts inhabituelle — billets de match payés individuellement via la FIFA, hôtels partagés par chambre, transport partagé par groupe, restos partagés par repas. WePlanify sépare ces catégories pour que chacun voie exactement ce qu'il doit, sans marathon de calculs en fin de voyage." },
        { q: "Quand faut-il réserver l'hébergement dans les villes hôtes ?", a: "Maintenant, si possible. Les hôtels à Miami, NYC, LA, Toronto et Mexico ont commencé à se remplir dès début 2026 et les prix sont déjà 3 à 5 fois supérieurs à la normale sur les dates de matchs. Cherchez en dehors des zones officielles (Airbnb en banlieue, villes voisines reliées par train) et réservez en remboursable si le parcours de votre équipe n'est pas encore fixé." },
        { q: "Les fan zones valent-elles le détour sans billet de match ?", a: "Oui. Chaque ville hôte a une FIFA Fan Festival officielle avec retransmission géante, food et animations, plus les rassemblements de quartier non officiels qui ont souvent une meilleure ambiance. L'entrée est gratuite et c'est souvent le temps fort pour les fans sans billet. Ajoutez-les à votre itinéraire comme plans B." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a World Cup 2026 trip following your team" : "Comment planifier un voyage Coupe du Monde 2026 en suivant son équipe",
    description: isEn
      ? "Lock the matches, build the multi-city route, split the costs, sort the visas and leave room for the unplanned moments that make a World Cup trip."
      : "Verrouillez les matchs, construisez l'itinéraire multi-villes, partagez les frais, gérez les visas et gardez de la marge pour l'imprévu qui fait un voyage de Coupe du Monde.",
    totalTime: "PT1H",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Anchor the trip on your team's fixtures" : "Caler le voyage sur les matchs de votre équipe",
        text: isEn
          ? "Start with the three group-stage matches. Lock the cities and dates, then map the gaps between matches as travel days. Plan only the group stage in detail — the knockout cities depend on results."
          : "Commencez par les trois matchs de poule. Verrouillez les villes et les dates, puis cartographiez les intervalles comme journées de transport. Planifiez en détail uniquement la phase de groupes — les villes des éliminatoires dépendent des résultats.",
        url: `${SITE_URL}/${locale}${PATHNAME}#anatomy`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Decide the group's level of commitment with a poll" : "Trancher le niveau d'engagement du groupe par sondage",
        text: isEn
          ? "Not everyone has the same budget or time. Run a poll to figure out who's in for the full group stage, who's joining for one match, and who only commits if the team advances. The result drives flight bookings and accommodation splits."
          : "Tout le monde n'a pas le même budget ni le même temps. Lancez un sondage pour savoir qui est partant pour toute la phase de groupes, qui ne vient qu'à un match, et qui ne s'engage que si l'équipe passe. Le résultat dicte les réservations de vols et les répartitions d'hébergement.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Split costs across categories from day one" : "Répartir les frais par catégorie dès le départ",
        text: isEn
          ? "Match tickets, inter-city flights, host-city hotels, ground transport and food don't split the same way. Set up a shared budget with a category for each so the math stays clean even when the trip lasts three weeks."
          : "Billets de match, vols inter-villes, hôtels en ville hôte, transport local et restos ne se répartissent pas de la même façon. Mettez en place un budget partagé avec une catégorie pour chacun, pour que les comptes restent clairs même sur trois semaines.",
        url: `${SITE_URL}/${locale}/features/budget`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Build buffer days between cities" : "Prévoir des jours tampons entre les villes",
        text: isEn
          ? "Stadium-to-stadium travel, jet lag, security queues and border crossings eat real time. Plan at least one full buffer day between non-adjacent host cities and one rest day before each match — your future self will thank you."
          : "Trajets stade à stade, décalage horaire, files de sécurité et passages de frontière prennent du temps réel. Comptez au moins une journée tampon entre deux villes non adjacentes et un jour de repos avant chaque match — votre vous futur vous remerciera.",
      },
    ],
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(sportsEventLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
                { label: isEn ? "World Cup 2026 Trip Planner" : "Planificateur Coupe du Monde 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Free trip planner · World Cup 2026" : "Planificateur gratuit · Coupe du Monde 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "World Cup 2026 Trip Planner: Follow Your Team Across 3 Countries"
                : "Coupe du Monde 2026 entre Potes : Votre Itinéraire, Pas un Pack Agence"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>This is a free World Cup 2026 trip planner for groups of fans — 16 host cities, 3 countries, 104 matches over 39 days. Following a team isn&apos;t a vacation, it&apos;s a logistics operation. Here&apos;s how to build the multi-city route with your crew without spending half the trip on a group chat. If you&apos;re still picking your tools, see our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Voici un planificateur gratuit pour la Coupe du Monde 2026 entre potes — 16 villes hôtes, 3 pays, 104 matchs sur 39 jours. Pas une agence, pas un pack tout fait : c&apos;est votre plan, partagé en temps réel avec votre bande. Voici comment construire l&apos;itinéraire multi-villes sans passer la moitié du voyage sur la conversation de groupe. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "8 min read" : "8 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-07" modifiedDate="2026-05-07" />
          </div>
        </section>

        {/* ━━━ THE REAL PROBLEM ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "A World Cup with friends sounds like a dream — until you start sketching it on the back of a napkin. Three group-stage matches in three different cities, possibly two different countries. Knockouts you can't book until results land. Visas, ESTAs, eTAs. Inter-city flights that double in price the week of a match. Six fans, six budgets, six tolerance levels for an early flight. Travel agencies sell you a package and call it a day. The fans who really want the trip end up building their own — and they need a plan everyone can see."
                : "Une Coupe du Monde entre potes, ça fait rêver — jusqu'à ce que vous commenciez à griffonner ça au dos d'une serviette. Trois matchs de poule dans trois villes différentes, peut-être deux pays différents. Des éliminatoires impossibles à réserver avant les résultats. Visas, ESTA, AVE. Vols inter-villes qui doublent de prix la semaine d'un match. Six supporters, six budgets, six tolérances pour un vol matinal. Les agences vous vendent un pack à 4 000 € la place et basta. Mais les vrais fans veulent choisir leur ville, leur hôtel, leur rythme — pas suivre un car de touristes. Le DIY revient bien moins cher et beaucoup plus libre — à condition d'avoir un plan que toute la bande peut voir."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for World Cup 2026 trips — fixtures, flights, hotels, budget and packing in one place, in English or French."
                : "WePlanify, c'est le poste de commandement partagé et gratuit pour la Coupe du Monde 2026 — matchs, vols, hôtels, budget et bagages au même endroit. L'alternative DIY aux packs d'agence."}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={isEn ? "On this page" : "Sur cette page"}
              items={[
                { id: "anatomy", label: isEn ? "Anatomy of a World Cup trip" : "Anatomie d'un voyage Coupe du Monde" },
                { id: "host-cities", label: isEn ? "The 16 host cities" : "Les 16 villes hôtes" },
                { id: "planning-route", label: isEn ? "Planning your route step by step" : "Planifier votre itinéraire étape par étape" },
                { id: "budget", label: isEn ? "Budget tips for fans" : "Astuces budget pour les fans" },
                { id: "faq", label: isEn ? "Frequently asked questions" : "Questions fréquentes" },
              ]}
            />
          </div>
        </section>

        {/* ━━━ ANATOMY OF A WORLD CUP TRIP ━━━ */}
        <FadeIn>
          <section id="anatomy" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Anatomy of a World Cup Trip" : "Anatomie d'un Voyage Coupe du Monde"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {isEn
                  ? "Five moving parts every group misses on the first try. Get them right and the trip flows."
                  : "Cinq éléments que chaque groupe oublie au premier essai. Maîtrisez-les et le voyage se déroule sans accroc."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "The Fixtures", desc: "Your team plays three group matches across three potential cities, then knockouts you can't predict yet. Lock the group stage in your itinerary as fixed anchors. Flag the knockout dates as placeholders — when the bracket fills, you'll know which city to add. Don't book non-refundable knockout flights before the round of 16.", link: "/features/itinerary" },
                      { stop: "The Crew", desc: "Six fans rarely have the same plan. Some take all 39 days off, others can only swing one match. Use a poll to lock who's in for which leg before booking anything — you'll save four arguments and one canceled flight.", link: "/features/polls" },
                      { stop: "The Borders", desc: "USA, Canada, Mexico are three immigration regimes. ESTA / B-2 for the US, eTA / visa for Canada, FMM tourist card for Mexico. Each fan handles their own paperwork, but the group needs one shared checklist with deadlines so nobody shows up at the airport without a valid ESTA.", link: "/features/planning" },
                      { stop: "The Money", desc: "Match tickets paid individually via FIFA. Hotels split by room. Inter-city flights split by traveler. Food split per meal. Five categories that don't reconcile by themselves. A shared budget with categories from day one beats a chaotic spreadsheet on day 38.", link: "/features/budget" },
                      { stop: "The Bags", desc: "Three weeks across summer USA, summer Canada, summer Mexico — and a stadium dress code. Pack light enough for budget-airline weight limits, but with everyone's jersey, scarf, flag and sunscreen accounted for. A shared list with assigned shared items prevents three flags and zero portable chargers.", link: "/features/packing" },
                    ]
                  : [
                      { stop: "Les Matchs", desc: "Votre équipe joue trois matchs de poule dans trois villes potentielles, puis des éliminatoires imprévisibles. Verrouillez la phase de groupes dans votre itinéraire comme points d'ancrage fixes. Mettez les dates d'éliminatoires en placeholders — une fois le tableau rempli, vous saurez quelle ville ajouter. Ne réservez pas de vols non-remboursables au-delà des huitièmes avant les résultats.", link: "/features/itinerary" },
                      { stop: "La Bande", desc: "Six supporters ont rarement le même plan. Certains prennent les 39 jours de congé, d'autres ne viennent qu'à un match. Utilisez un sondage pour figer qui fait quel tronçon avant de réserver — ça vous évite quatre disputes et un vol annulé.", link: "/features/polls" },
                      { stop: "Les Frontières", desc: "USA, Canada, Mexique : trois régimes d'immigration. ESTA / visa B-2 pour les USA, AVE / visa pour le Canada, carte FMM pour le Mexique. Chaque fan gère sa paperasse, mais le groupe a besoin d'une checklist partagée avec les deadlines pour que personne ne se pointe à l'aéroport sans ESTA valide.", link: "/features/planning" },
                      { stop: "L'Argent", desc: "Billets de match payés individuellement via la FIFA. Hôtels partagés par chambre. Vols inter-villes partagés par voyageur. Restos partagés par repas. Cinq catégories qui ne se réconcilient pas toutes seules. Un budget partagé avec catégories dès le jour 1, c'est mieux qu'un tableur chaotique au jour 38.", link: "/features/budget" },
                      { stop: "Les Sacs", desc: "Trois semaines entre été USA, été Canada, été Mexique — et un dress code stade. Faites léger pour respecter les franchises low-cost, mais avec maillots, écharpes, drapeaux et crème solaire de tout le monde. Une liste partagée avec objets communs assignés évite les trois drapeaux et zéro batterie externe.", link: "/features/packing" },
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < 4 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
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

        {/* ━━━ HOST CITIES ━━━ */}
        <section id="host-cities" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "The 16 Host Cities" : "Les 16 Villes Hôtes"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Eleven cities in the USA, three in Mexico, two in Canada. Build your route knowing which clusters travel well together — and which require a flight."
                : "Onze villes aux USA, trois au Mexique, deux au Canada. Construisez votre itinéraire en sachant quelles villes se relient bien — et lesquelles imposent un vol."}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                { city: "Atlanta", country: "USA" },
                { city: "Boston", country: "USA" },
                { city: "Dallas", country: "USA" },
                { city: "Houston", country: "USA" },
                { city: "Kansas City", country: "USA" },
                { city: "Los Angeles", country: "USA" },
                { city: "Miami", country: "USA" },
                { city: "New York / NJ", country: "USA" },
                { city: "Philadelphia", country: "USA" },
                { city: "San Francisco", country: "USA" },
                { city: "Seattle", country: "USA" },
                { city: "Toronto", country: "Canada" },
                { city: "Vancouver", country: "Canada" },
                { city: "Guadalajara", country: "Mexico" },
                { city: "Mexico City", country: "Mexico" },
                { city: "Monterrey", country: "Mexico" },
              ].map((item, i) => (
                <div key={i} className="bg-white border border-[#001E13]/8 rounded-2xl px-4 py-3">
                  <p className="text-[#001E13] font-karla font-semibold text-sm lg:text-base">{item.city}</p>
                  <p className="text-[#001E13]/50 font-karla text-xs">{item.country}</p>
                </div>
              ))}
            </div>

            {/* Travel matrix between common host city pairs */}
            <div className="mt-14">
              <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                {isEn ? "Travel Time Between Host Cities" : "Temps de Trajet entre Villes Hôtes"}
              </h3>
              <p className="text-[#001E13]/55 font-karla text-sm lg:text-base mb-6 max-w-[700px]">
                {isEn
                  ? "Indicative one-way travel times for the most common fan routes. Flight times exclude airport transit (add ~3h). Use these to size buffer days between matches."
                  : "Temps de trajet aller indicatifs pour les routes fans les plus courantes. Les temps de vol excluent le transit aéroport (ajoutez ~3h). Utilisez-les pour dimensionner vos jours tampons entre matchs."}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-karla text-sm lg:text-base">
                  <thead>
                    <tr className="border-b-2 border-[#001E13]/15">
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{isEn ? "Route" : "Trajet"}</th>
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{isEn ? "Mode" : "Mode"}</th>
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{isEn ? "Time" : "Temps"}</th>
                      <th className="py-2 text-[#001E13] font-semibold">{isEn ? "Notes" : "Notes"}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#001E13]/75">
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Boston ↔ NYC</td><td className="py-2 pr-4">{isEn ? "Train (Acela)" : "Train (Acela)"}</td><td className="py-2 pr-4">~3h30</td><td className="py-2">{isEn ? "Door-to-door beats flying" : "Porte-à-porte plus rapide que l'avion"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">NYC ↔ Philadelphia</td><td className="py-2 pr-4">{isEn ? "Train / Bus" : "Train / Bus"}</td><td className="py-2 pr-4">~1h30</td><td className="py-2">{isEn ? "Easiest cluster" : "Cluster le plus simple"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">NYC ↔ Toronto</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~1h30</td><td className="py-2">{isEn ? "Border crossing — eTA needed" : "Passage de frontière — AVE requis"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Atlanta ↔ Miami</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~2h</td><td className="py-2">{isEn ? "Driving is 10h+, not viable" : "10h+ en voiture, pas viable"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Dallas ↔ Houston</td><td className="py-2 pr-4">{isEn ? "Flight / Drive" : "Vol / Voiture"}</td><td className="py-2 pr-4">~1h / 4h</td><td className="py-2">{isEn ? "Drive if more than 2 fans" : "Voiture rentable à 2+"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">LA ↔ San Francisco</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~1h30</td><td className="py-2">{isEn ? "Cheapest US route to fly" : "Route US la moins chère en avion"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">LA ↔ Seattle</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~3h</td><td className="py-2">{isEn ? "Book early — fan demand" : "Réserver tôt — demande fans"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Seattle ↔ Vancouver</td><td className="py-2 pr-4">{isEn ? "Drive / Train" : "Voiture / Train"}</td><td className="py-2 pr-4">~3h-4h</td><td className="py-2">{isEn ? "Border by land — quickest crossing" : "Frontière terrestre — passage rapide"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Toronto ↔ Vancouver</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~5h</td><td className="py-2">{isEn ? "Longest domestic Canada flight" : "Plus long vol intérieur Canada"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Dallas ↔ Mexico City</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~2h30</td><td className="py-2">{isEn ? "Best US→MX gateway" : "Meilleure porte d'entrée USA→MX"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Mexico City ↔ Guadalajara</td><td className="py-2 pr-4">{isEn ? "Flight / Bus" : "Vol / Bus"}</td><td className="py-2 pr-4">~1h30 / 7h</td><td className="py-2">{isEn ? "Bus is night-friendly + cheap" : "Bus de nuit, économique"}</td></tr>
                    <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4">Mexico City ↔ Monterrey</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~1h30</td><td className="py-2">{isEn ? "10+ daily flights" : "10+ vols par jour"}</td></tr>
                    <tr><td className="py-2 pr-4">LA ↔ Miami</td><td className="py-2 pr-4">{isEn ? "Flight" : "Vol"}</td><td className="py-2 pr-4">~5h</td><td className="py-2">{isEn ? "Coast-to-coast — pricey" : "Coast-to-coast — cher"}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ FAN ESSENTIALS CHECKLIST ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Fan Trip Essentials Checklist" : "Checklist Essentiels Voyage Fan"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10">
              {isEn
                ? "The things groups always forget. Assign each to a person in your WePlanify packing list."
                : "Les choses que les groupes oublient toujours. Assignez chacune à une personne dans votre liste WePlanify."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {(isEn
                ? [
                    "Match tickets (printed + FIFA app backup)",
                    "Valid passport (6+ months past July 2026)",
                    "ESTA, eTA or visa for each border",
                    "Travel insurance covering all three countries",
                    "Team jersey, scarf, flag",
                    "Stadium-approved clear bag",
                    "Portable charger (multi-port for the group)",
                    "International data plan or local eSIM",
                    "Sunscreen + cap (June heat is real)",
                    "Reusable water bottle (allowed in stadiums)",
                    "Cash in USD / CAD / MXN for small expenses",
                    "Earplugs (for after the celebration)",
                  ]
                : [
                    "Billets de match (imprimés + sauvegarde dans l'appli FIFA)",
                    "Passeport valide (6+ mois après juillet 2026)",
                    "ESTA, AVE ou visa pour chaque frontière",
                    "Assurance voyage couvrant les trois pays",
                    "Maillot, écharpe, drapeau",
                    "Sac transparent conforme stade",
                    "Batterie externe (multi-ports pour le groupe)",
                    "Forfait data international ou eSIM locale",
                    "Crème solaire + casquette (la chaleur de juin est réelle)",
                    "Gourde réutilisable (autorisée en stade)",
                    "Cash en USD / CAD / MXN pour les petits frais",
                    "Bouchons d'oreille (pour après les célébrations)",
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
                ? "A World Cup trip isn't a vacation — it's a 39-day operation. Treat the planning like the team treats the prep, and the rest takes care of itself."
                : "Un voyage Coupe du Monde, ce n'est pas des vacances — c'est une opération de 39 jours. Traitez la préparation comme l'équipe traite la sienne, le reste suit tout seul."}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING YOUR ROUTE ━━━ */}
        <section id="planning-route" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Planning Your Route: Step by Step" : "Planifier Votre Itinéraire : Étape par Étape"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Start with the fixtures. The group draw fixes the city of each match — that's your skeleton. Place the three group matches as anchors in the itinerary, then add a rest day on each side. Stadium-to-stadium travel through immigration eats more time than people expect; never schedule a match the day after a long-haul flight."
                : "Commencez par les matchs. Le tirage au sort fixe la ville de chaque match — c'est votre squelette. Placez les trois matchs de poule comme points d'ancrage dans l'itinéraire, puis ajoutez un jour de repos de chaque côté. Les déplacements stade à stade avec passage de frontière prennent plus de temps que prévu ; ne planifiez jamais un match le lendemain d'un vol long-courrier."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>For the gaps between matches, decide as a group whether you want a fan-tourism mode (explore the host cities, hit fan zones, watch other matches in bars) or a recovery mode (downtime, cheaper accommodation between hubs). <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">Run a poll</Link> — the choice changes which neighborhoods you stay in and what you book.</>
                : <>Pour les intervalles entre matchs, décidez en groupe si vous voulez un mode fan-touriste (explorer les villes hôtes, profiter des fan zones, regarder les autres matchs en bar) ou un mode récupération (temps mort, hébergement moins cher entre deux hubs). <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">Lancez un sondage</Link> — le choix change le quartier où vous logez et ce que vous réservez.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Don&apos;t over-plan the knockout phase. Block tentative dates in your <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> for the round of 16, quarters and semis, but only book transport once the bracket fills. Buy refundable flights and reservable hotels for these legs — the few extra dollars are insurance against a group-stage exit.</>
                : <>Ne sur-planifiez pas la phase à élimination directe. Bloquez des dates indicatives dans votre <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> pour les huitièmes, quarts et demi, mais ne réservez le transport qu&apos;une fois le tableau rempli. Prenez du remboursable pour ces tronçons — les quelques euros de plus sont une assurance contre une élimination en poules.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Set deadlines for the group, not just for the trip. ESTAs and eTAs take days to be approved at peak. International data plans need to be sorted before departure. Hotel cancellation windows close earlier than people remember. A shared task list with deadlines, visible to everyone, keeps the trip from collapsing under bureaucracy a week before kickoff."
                : "Fixez des deadlines au groupe, pas seulement au voyage. ESTA et AVE prennent plusieurs jours en pleine charge. Les forfaits data doivent être réglés avant le départ. Les fenêtres d'annulation des hôtels se referment plus tôt qu'on ne croit. Une liste de tâches partagée avec deadlines, visible par tous, évite que le voyage s'effondre sous la paperasse une semaine avant le coup d'envoi."}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET TIPS ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Budget Tips for Fan Trips" : "Astuces Budget pour Voyages de Supporters"}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Match tickets are the single biggest line item and they&apos;re paid by each fan individually through FIFA — keep them out of the shared pool entirely. The shared pool is for hotels, inter-city transport, group dinners, ride shares and fan-zone food. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and rotate who fronts each expense so the burden stays even.</>
                  : <>Les billets de match sont la plus grosse ligne et chaque fan les paie individuellement via la FIFA — gardez-les hors du pot commun. Le pot commun, c&apos;est pour les hôtels, le transport inter-villes, les dîners de groupe, les VTC et la bouffe en fan zone. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et faites tourner qui avance chaque frais pour que la charge reste équilibrée.</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Inter-city transport is where the budget really opens or closes. Domestic US flights between distant host cities (LA → Miami, Boston → Dallas) average $250-400 if booked early, double that the week of a match. For shorter hops along the Northeast (Boston → NYC → Philly), Amtrak Acela is faster door-to-door and often cheaper. Crossing into Canada or Mexico almost always means flying — book those legs as soon as the fixtures are confirmed."
                  : "Le transport inter-villes, c'est là que le budget se joue. Les vols intérieurs aux USA entre villes éloignées (LA → Miami, Boston → Dallas) sont à 250-400 € en réservant tôt, le double la semaine d'un match. Pour les trajets courts au Nord-Est (Boston → NYC → Philly), l'Amtrak Acela est plus rapide porte-à-porte et souvent moins cher. Traverser vers le Canada ou le Mexique implique presque toujours un vol — réservez dès que les matchs sont confirmés."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Accommodation is the second-biggest cost and the easiest to optimize. Host city hotels triple their prices on match dates — book outside the official zone. A three-bedroom Airbnb 30 minutes from the stadium, split four or five ways, often beats individual hotel rooms by 40%. Look at neighboring cities with rail or short-flight links: staying in Newark instead of Manhattan, in Anaheim instead of LA, in Mississauga instead of central Toronto."
                  : "L'hébergement est le deuxième poste et le plus facile à optimiser. Les hôtels en ville hôte triplent leurs prix les jours de match — logez hors zone officielle. Un Airbnb trois chambres à 30 minutes du stade, partagé à quatre ou cinq, bat souvent les chambres d'hôtel individuelles de 40%. Regardez les villes voisines reliées par train ou vol court : Newark plutôt que Manhattan, Anaheim plutôt que LA, Mississauga plutôt que Toronto centre."}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ FAQ ━━━ */}
        <section id="faq" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
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
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Road Trip" : "Road Trip"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Plan a multi-stop drive with the crew." : "Organisez un road trip multi-étapes avec votre bande."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
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
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {isEn ? "Build Your World Cup 2026 Trip" : "Construisez Votre Voyage Coupe du Monde 2026"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Fixtures, flights, hotels, budget — one shared plan, your whole crew on the same page." : "Matchs, vols, hôtels, budget — un seul plan partagé, toute votre bande alignée."}
              </p>
              <div className="flex justify-center">
                <Link href="https://app.weplanify.com/register?utm_source=landing&utm_campaign=world-cup-2026&template=world-cup-2026">
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
