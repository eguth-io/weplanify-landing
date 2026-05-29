import { Metadata } from "next";
import Image from "next/image";
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
const PATHNAME = "/tomorrowland-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Tomorrowland 2026: Trip Planner — Tickets, DreamVille, Pearls"
    : "Tomorrowland 2026 : Voyage Boom — Billets, DreamVille, Pearls";
  const description = isEn
    ? "Everything for Tomorrowland 2026 in Boom (17-19 & 24-26 July): Global Journey sold out, Eurostar from Paris, DreamVille tiers, Antwerp hotels, the Pearl cashless system and shared group budget for the Consciencia weekends."
    : "Tout sur Tomorrowland 2026 à Boom (17-19 et 24-26 juillet) : Global Journey sold out, Eurostar depuis Paris, niveaux DreamVille, hôtels à Anvers, le cashless Pearl et le budget partagé pour les week-ends Consciencia.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/tomorrowland-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function Tomorrowland2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "Tomorrowland 2026 Trip Planner" : "Voyage Tomorrowland 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Tomorrowland 2026: The Trip Planner" : "Tomorrowland 2026 : Le Guide Voyage",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-13", dateModified: "2026-05-13",
    image: [`${SITE_URL}/events/tomorrowland-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const musicEventLd = {
    "@context": "https://schema.org",
    "@type": "MusicFestival",
    name: "Tomorrowland Belgium 2026 — Consciencia",
    description: isEn
      ? "Tomorrowland Belgium 2026, the two-weekend electronic music festival at De Schorre in Boom, on 17-19 July and 24-26 July 2026. 500+ artists across 16 stages, theme 'Consciencia', headlined by Calvin Harris (Tomorrowland Belgium debut), David Guetta, Martin Garrix and Armin van Buuren."
      : "Tomorrowland Belgium 2026, le festival électronique deux week-ends à De Schorre à Boom, les 17-19 juillet et 24-26 juillet 2026. Plus de 500 artistes sur 16 scènes, thème « Consciencia », têtes d'affiche Calvin Harris (première au Tomorrowland Belgium), David Guetta, Martin Garrix et Armin van Buuren.",
    image: [`${SITE_URL}/events/tomorrowland-2026.png`],
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: "Tomorrowland", url: "https://www.tomorrowland.com" },
    offers: {
      "@type": "Offer",
      url: "https://www.tomorrowland.com",
      availability: "https://schema.org/SoldOut",
      validFrom: "2025-12-08",
    },
    location: {
      "@type": "Place",
      name: "De Schorre",
      address: { "@type": "PostalAddress", addressLocality: "Boom", addressRegion: "Antwerp Province", addressCountry: "BE" },
    },
    subEvent: [
      {
        "@type": "MusicEvent",
        name: "Tomorrowland 2026 — Weekend 1",
        startDate: "2026-07-17",
        endDate: "2026-07-19",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: "De Schorre", address: { "@type": "PostalAddress", addressLocality: "Boom", addressCountry: "BE" } },
      },
      {
        "@type": "MusicEvent",
        name: "Tomorrowland 2026 — Weekend 2",
        startDate: "2026-07-24",
        endDate: "2026-07-26",
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: { "@type": "Place", name: "De Schorre", address: { "@type": "PostalAddress", addressLocality: "Boom", addressCountry: "BE" } },
      },
    ],
  };

  const faqItems = isEn
    ? [
        { q: "When and where is Tomorrowland 2026?", a: "Two weekends at De Schorre in Boom, Belgium, between Antwerp and Brussels. Weekend 1 runs Friday 17 to Sunday 19 July 2026; Weekend 2 runs Friday 24 to Sunday 26 July 2026. The festival is strictly 18+ (you must be born in 2008 or earlier) and the 2026 theme is 'Consciencia'. 16 stages, 500+ artists across both weekends, around 70,000 attendees per day for a total of ~400,000 over the eleven festival days." },
        { q: "Is Tomorrowland 2026 sold out?", a: "Effectively yes. Global Journey travel packages sold out worldwide on 17 January 2026, the Belgian sale on 24 January and the worldwide sale on 31 January typically clear in under an hour. The only path forward is official resale on the Tomorrowland platform — listings appear when other fans cancel, sometimes daily, sometimes only days before the gates open. Tickets bought outside the official channels (Telegram, Vinted, Facebook marketplace) are routinely refused at the gate scan, so don't gamble." },
        { q: "How do I get to Boom from Paris, Lille or London?", a: "From Paris-Nord, Eurostar (which absorbed Thalys in 2023) reaches Brussels-Midi in about 1h22, from around €30 if booked ahead. From Lille-Europe count around 35-50 min. From London St Pancras direct trains take ~1h55. From Brussels-Midi or Antwerp-Centraal, SNCB trains run every ~30 min to Boom (~32 min, €6-10), then a free festival shuttle runs from Boom station to the gates. By plane, Brussels Zaventem (BRU) is 33 km / 20 min by road; Antwerp Airport is closer but has fewer connections." },
        { q: "What are the DreamVille camping tiers?", a: "DreamVille is the on-site camping village, open 5 days from Thursday around 11:00 to Monday. New for 2026, the Solara tier comes with power outlets — a meaningful upgrade for anyone who has spent a festival hunting a charging station. Marivela offers A/C and private bathrooms. Magnificent Greens is the BYO-tent option, Easy Tent and Spectacular are pre-pitched, Relax and Cabana sit in the middle. Premium tiers start around €2,700 per person for the weekend; specific tier pricing varies year to year." },
        { q: "How does the Pearl cashless system work?", a: "On-site, the only currency is the Pearl. €20 buys 11 Pearls (about €1.82 each). Top up online before the festival — every €100 in online top-up earns a 2-Pearl bonus, and the unspent balance is auto-refunded after the festival. On-site top-ups are also possible but the unspent balance needs to be manually claimed before the announced deadline. Bring a backup top-up plan in case the on-site network is slow — it routinely is around peak hours." },
        { q: "Where should I stay if I missed Global Journey?", a: "Three honest options. DreamVille on the festival grounds (walking distance to gates, the full festival experience), Antwerp city centre (~20 km north, 30 min by train, hotels €150-400/night during the festival, good restaurants and bars), or Brussels (~30 km south, broader hotel inventory but a longer commute). A serviced apartment split between 4-6 friends in Antwerp typically beats hotel rooms by 30-50% on price." },
        { q: "What is the price of a Tomorrowland 2026 ticket?", a: "2026 pre-sale prices: Day Pass from €138, Full Madness weekend pass from €304 in pre-sale and €365 at worldwide sale, DreamVille Weekend from €410. Global Journey packages (flight or train + hotel + Full Madness pass + shuttle) ran around €2,000 for typical European cities — sold out worldwide on 17 January 2026. Premium DreamVille tiers (Solara, Marivela) start around €2,700 per person. Resale tickets via the official platform keep close to the original price; everything outside that channel is a scam risk." },
        { q: "How do you organise a Tomorrowland trip with a group of friends?", a: "Tickets and packages are individual — keep them out of the shared pool. The shared pool is for transport (Eurostar, shuttle, taxi), accommodation, group meals before and after, and the on-site Pearl float. Set categories from day one (transport, hotel, food, Pearls) so the math doesn't collapse on the way home. WePlanify keeps each category clean across the two weekends if your group is splitting, and rotates who fronts each expense." },
      ]
    : [
        { q: "Quand et où se tient Tomorrowland 2026 ?", a: "Deux week-ends à De Schorre à Boom, en Belgique, entre Anvers et Bruxelles. Week-end 1 du vendredi 17 au dimanche 19 juillet 2026 ; week-end 2 du vendredi 24 au dimanche 26 juillet 2026. Le festival est strictement +18 (né en 2008 ou avant) et le thème 2026 est « Consciencia ». 16 scènes, plus de 500 artistes sur les deux week-ends, environ 70 000 personnes par jour pour un total d'environ 400 000 sur les onze jours de festival." },
        { q: "Tomorrowland 2026 est-il sold out ?", a: "Concrètement oui. Les Global Journey ont été sold out dans le monde entier le 17 janvier 2026, la vente belge le 24 janvier et la vente mondiale du 31 janvier partent habituellement en moins d'une heure. Le seul chemin restant, c'est la revente officielle sur la plateforme Tomorrowland — des billets réapparaissent quand des festivaliers annulent, parfois chaque jour, parfois quelques jours seulement avant l'ouverture. Les billets achetés hors canaux officiels (Telegram, Vinted, Marketplace) sont régulièrement refusés au scan, donc ne jouez pas avec le feu." },
        { q: "Comment rejoindre Boom depuis Paris, Lille ou Londres ?", a: "Depuis Paris-Nord, Eurostar (qui a absorbé Thalys en 2023) rejoint Bruxelles-Midi en 1h22 environ, à partir de 30 € en réservant à l'avance. Depuis Lille-Europe, comptez 35 à 50 min. Depuis Londres St Pancras, train direct en ~1h55. De Bruxelles-Midi ou Anvers-Centraal, les trains SNCB partent toutes les ~30 min vers Boom (~32 min, 6-10 €), puis une navette festival gratuite relie la gare de Boom aux portes. En avion, Bruxelles-Zaventem (BRU) est à 33 km / 20 min ; l'aéroport d'Anvers est plus proche mais moins desservi." },
        { q: "Quels sont les niveaux de camping DreamVille ?", a: "DreamVille, c'est le village de camping sur site, ouvert 5 jours du jeudi vers 11h au lundi. Nouveauté 2026, le tier Solara intègre des prises électriques — un vrai upgrade pour qui a déjà passé un festival à chasser une borne de charge. Marivela propose climatisation et salle de bain privée. Magnificent Greens, c'est l'option tente personnelle ; Easy Tent et Spectacular sont des tentes prémontées ; Relax et Cabana se situent entre les deux. Les tiers premium commencent autour de 2 700 € par personne pour le week-end ; la grille tarifaire varie d'une année sur l'autre." },
        { q: "Comment fonctionne le cashless Pearl ?", a: "Sur site, la seule monnaie c'est le Pearl. 20 € achètent 11 Pearls (environ 1,82 € l'unité). Rechargez en ligne avant le festival — chaque 100 € rechargé en ligne donne un bonus de 2 Pearls, et le solde non utilisé est remboursé automatiquement après le festival. Le rechargement sur site est possible mais le solde non utilisé doit être réclamé manuellement avant la deadline annoncée. Prévoyez un plan B au rechargement, le réseau sur place rame souvent aux heures de pointe." },
        { q: "Où dormir si on n'a pas eu de Global Journey ?", a: "Trois options honnêtes. DreamVille sur le site du festival (à pied des portes, l'expérience festival complète), Anvers centre (~20 km au nord, 30 min en train, hôtels 150-400 €/nuit sur le festival, beaux restos et bars), ou Bruxelles (~30 km au sud, offre hôtelière plus large mais trajet plus long). Un appartement partagé entre 4-6 potes à Anvers bat souvent les chambres d'hôtel de 30-50 %." },
        { q: "Quel est le prix d'un billet Tomorrowland 2026 ?", a: "Tarifs pré-vente 2026 : Day Pass à partir de 138 €, pass week-end Full Madness à partir de 304 € en pré-vente et 365 € en vente mondiale, DreamVille Weekend à partir de 410 €. Les packages Global Journey (vol ou train + hôtel + pass Full Madness + navette) tournaient autour de 2 000 € pour les villes européennes — sold out mondialement le 17 janvier 2026. Les tiers DreamVille premium (Solara, Marivela) démarrent autour de 2 700 € par personne. Les billets sur la revente officielle restent proches du prix d'origine ; tout ce qui sort de ce canal est un risque d'arnaque." },
        { q: "Comment organiser un Tomorrowland entre potes ?", a: "Les billets et packages sont individuels — gardez-les hors du pot commun. Le pot commun, c'est pour le transport (Eurostar, navette, taxi), l'hébergement, les restos avant et après, et le float Pearl sur place. Posez les catégories dès le départ (transport, hôtel, restos, Pearls) pour ne pas finir le calcul au retour. WePlanify garde chaque catégorie au propre sur les deux week-ends si votre groupe se sépare, et fait tourner les avances dans la bande." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a Tomorrowland 2026 trip to Boom" : "Comment organiser un voyage à Tomorrowland 2026 à Boom",
    description: isEn
      ? "Two months out, here is how to lock the trip: official resale watch, Eurostar from Paris, DreamVille vs Antwerp, Pearl float and group budget setup."
      : "À deux mois, voici comment verrouiller le voyage : veille revente officielle, Eurostar depuis Paris, DreamVille vs Anvers, float Pearl et budget partagé.",
    totalTime: "PT45M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Map who has a pass and who is still hunting" : "Identifier qui a un pass et qui en cherche encore",
        text: isEn
          ? "Global Journey is sold out and the regular Worldwide sale closed in minutes — run a quick poll in the group to flag who is confirmed, who is on the official resale, and which weekend (W1 17-19 or W2 24-26 July) each person is targeting. Splitting across weekends changes everything: transport, accommodation, and whether you travel together at all."
          : "Le Global Journey est sold out et la vente mondiale a fermé en minutes — lancez un sondage dans le groupe pour distinguer qui est confirmé, qui est sur la revente officielle, et quel week-end (W1 17-19 ou W2 24-26 juillet) chacun cible. Se répartir sur les deux week-ends change tout : transport, hébergement, et si vous partez ensemble ou non.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Book Eurostar and accommodation before the next hike" : "Réserver Eurostar et hébergement avant la prochaine hausse",
        text: isEn
          ? "Paris-Brussels Eurostar at €30 advance creeps toward €100-150 on the festival Friday/Saturday and Monday return. Lock one outbound and one return for the whole crew, plus DreamVille if you have it or an Antwerp apartment within walking distance of Antwerpen-Centraal."
          : "L'Eurostar Paris-Bruxelles à 30 € en avance grimpe vers 100-150 € sur le vendredi/samedi du festival et le retour du lundi. Verrouillez un même aller et un même retour pour la bande, plus DreamVille si vous l'avez ou un appartement à Anvers à pied d'Antwerpen-Centraal.",
        url: `${SITE_URL}/${locale}/features/itinerary`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Top up the Pearl float online and set a shared budget" : "Recharger le float Pearl en ligne et poser un budget partagé",
        text: isEn
          ? "Tickets and packages stay individual. Everything else (Eurostar, accommodation, taxis, restaurants in Antwerp before and after, Pearl top-ups) goes into a shared pool. Top up Pearls online to grab the 2-Pearl bonus per €100 and to skip the on-site queue."
          : "Les billets et packages restent individuels. Le reste (Eurostar, hébergement, taxis, restos à Anvers avant et après, rechargements Pearl) va dans un pot commun. Rechargez vos Pearls en ligne pour récupérer le bonus de 2 Pearls par 100 € et éviter la file sur place.",
        url: `${SITE_URL}/${locale}/features/budget`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Plan the three days stage by stage" : "Planifier les trois jours scène par scène",
        text: isEn
          ? "16 stages, 500+ artists, clashes everywhere — share the schedule in advance so the group knows who is at the Mainstage for the closing set vs who is at Atmosphere or Core. Block transport-back-to-Antwerp into the timeline too: the last shuttles fill up fast after the closing acts."
          : "16 scènes, plus de 500 artistes, des clashs partout — partagez la grille à l'avance pour que le groupe sache qui est à la Mainstage pour le closing vs qui est à Atmosphere ou Core. Bloquez aussi le retour vers Anvers dans la timeline : les dernières navettes se remplissent vite après les sets de fin.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(musicEventLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
                { label: isEn ? "Tomorrowland 2026 Trip Planner" : "Voyage Tomorrowland 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Festival guide & trip planner · Boom 2026" : "Guide du festival & planificateur · Boom 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Tomorrowland 2026: Your Trip Planner to Boom"
                : "Tomorrowland 2026 : Le Guide Voyage à Boom"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>Two weekends at De Schorre — 17 to 19 and 24 to 26 July 2026 — under the &apos;Consciencia&apos; banner. 500+ artists on 16 stages, with Calvin Harris making his Tomorrowland Belgium debut, plus David Guetta, Martin Garrix, Armin van Buuren and Hardwell. Global Journey is sold out worldwide and the regular sale cleared in under an hour — but the trip plan, the Antwerp apartment and the Pearl float are still yours to build. This is the complete guide to getting to Boom, where to sleep, how Pearls work, and how to keep the crew aligned across the festival days. If you&apos;re still picking your tools, see our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Deux week-ends à De Schorre — du 17 au 19 et du 24 au 26 juillet 2026 — sous la bannière « Consciencia ». Plus de 500 artistes sur 16 scènes, avec Calvin Harris pour ses débuts à Tomorrowland Belgium, plus David Guetta, Martin Garrix, Armin van Buuren et Hardwell. Le Global Journey est sold out mondialement et la vente classique a fermé en moins d&apos;une heure — mais le plan voyage, l&apos;appartement à Anvers et le float Pearl restent à construire. Voici le guide complet pour rejoindre Boom, où dormir, comment marchent les Pearls, et comment garder la bande alignée pendant les jours de festival. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "9 min read" : "9 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=tomorrowland-2026&template=tomorrowland-2026&placement=hero`}>
                <PulsatingButton className="font-karla font-bold">{isEn ? "Build our Tomorrowland weekend" : "Cadre le Tomorrowland entre potes"}</PulsatingButton>
              </Link>
              <p className="text-[#001E13]/55 text-xs lg:text-sm font-karla">{isEn ? "Free · built for groups · EN/FR" : "Gratuit · pensé pour le groupe · FR/EN"}</p>
            </div>
          </div>
        </section>

        {/* ━━━ HERO VISUAL ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative aspect-[3/2] lg:aspect-[16/9] w-full rounded-[24px] lg:rounded-[32px] overflow-hidden">
              <Image
                src="/events/tomorrowland-2026.png"
                alt={isEn ? "Tomorrowland 2026 — fans in front of the ornate Mainstage with pyrotechnics in the Belgian forest at twilight" : "Tomorrowland 2026 — des fans devant la Mainstage ornée avec pyrotechnies dans la forêt belge au crépuscule"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* ━━━ KEY FACTS BOX ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border border-[#001E13]/8 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10">
              <h2 className="text-[#001E13]/40 font-karla text-xs lg:text-sm uppercase tracking-[0.2em] mb-6">
                {isEn ? "Festival facts" : "Les chiffres du festival"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Weekends" : "Week-ends"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{isEn ? "17-19 & 24-26 Jul" : "17-19 & 24-26 juil"}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Site" : "Site"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">De Schorre</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Boom, BE</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Stages" : "Scènes"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">16</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "500+ artists" : "500+ artistes"}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Attendance" : "Affluence"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">~400k</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "total" : "total"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ THE STAKES ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Two weekends of the most over-produced electronic festival on the planet, in a 75-hectare provincial park between Antwerp and Brussels. Tomorrowland 2026 lands under the 'Consciencia' theme — a meditative narrative that, in true Tomorrowland fashion, is mostly an excuse for an even more ambitious Mainstage. Calvin Harris makes his Tomorrowland Belgium debut, joining David Guetta, Martin Garrix, Armin van Buuren, Hardwell, the Chainsmokers, FISHER, John Summit and Sara Landry across 16 stages. The festival is strictly 18+, and the operation around the music — the Eurostar from Paris-Nord, the Pearl wristband, the DreamVille tent shared with five mates, the shuttle queue back to Antwerp at 4am — is what 70,000 people per day actually plan around."
                : "Deux week-ends du festival électronique le plus over-produit de la planète, dans un parc provincial de 75 hectares entre Anvers et Bruxelles. Tomorrowland 2026 arrive sous le thème « Consciencia » — une narration méditative qui, fidèle à la maison, est surtout l'excuse à une Mainstage encore plus ambitieuse. Calvin Harris fait ses débuts au Tomorrowland Belgium, aux côtés de David Guetta, Martin Garrix, Armin van Buuren, Hardwell, des Chainsmokers, FISHER, John Summit et Sara Landry sur 16 scènes. Le festival est strictement +18, et l'opération autour de la musique — l'Eurostar depuis Paris-Nord, le bracelet Pearl, la tente DreamVille partagée à cinq, la file de navette retour à Anvers à 4h du matin — c'est autour de ça que 70 000 personnes par jour s'organisent vraiment."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for fans heading to Boom — Eurostar, DreamVille or Antwerp apartment, Pearl float, festival schedule and budget in one place, in English or French."
                : "WePlanify, c'est le poste de commandement gratuit et partagé pour les fans qui descendent à Boom — Eurostar, DreamVille ou appartement à Anvers, float Pearl, grille du festival et budget au même endroit, en français ou anglais."}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={isEn ? "On this page" : "Sur cette page"}
              items={[
                { id: "the-lineup", label: isEn ? "The 2026 lineup" : "L'affiche 2026" },
                { id: "tickets", label: isEn ? "Tickets, Global Journey & resale" : "Billetterie, Global Journey & revente" },
                { id: "getting-there", label: isEn ? "Getting to Boom" : "Rejoindre Boom" },
                { id: "sleeping", label: isEn ? "DreamVille vs Antwerp vs Brussels" : "DreamVille vs Anvers vs Bruxelles" },
                { id: "pearls", label: isEn ? "Pearls & on-site practicalities" : "Pearls & pratique sur site" },
                { id: "planning", label: isEn ? "Planning the trip with the crew" : "Organiser le voyage entre potes" },
                { id: "budget", label: isEn ? "Budget tips" : "Astuces budget" },
                { id: "faq", label: isEn ? "Frequently asked questions" : "Questions fréquentes" },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE LINEUP ━━━ */}
        <FadeIn>
          <section id="the-lineup" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "The 2026 Lineup" : "L'Affiche 2026"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {isEn
                  ? "16 stages, 500+ artists, two weekends. The headline arc and the names worth crossing a country for."
                  : "16 scènes, plus de 500 artistes, deux week-ends. La ligne directrice des têtes d'affiche et les noms qui valent un voyage."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "Calvin Harris — Tomorrowland Belgium debut", desc: "The biggest announcement of the 2026 cycle. Calvin Harris has played the Brasil edition before but never Belgium — the Mainstage slot is the one the entire crowd will be in front of, no matter what is happening on the other 15 stages at the same time." },
                      { stop: "The mainstream pillars", desc: "David Guetta, Martin Garrix, Armin van Buuren, Hardwell, The Chainsmokers, Dimitri Vegas & Like Mike — the festival's regulars. Predictable, but on Tomorrowland's Mainstage production, even the most-played sets look new again. Sebastian Ingrosso is also on the lineup, often Tomorrowland's preferred vehicle for an unofficial Swedish House Mafia moment." },
                      { stop: "The techno and dubstep names", desc: "Sara Landry, REZZ, Subtronics, ILLENIUM, Miss Monique, Indira Paganotto. The Core, Atmosphere and other secondary stages run at a level that often outpunches the Mainstage on quality — the Tomorrowland trick is being willing to leave the headliner for these." },
                      { stop: "The future and house anchors", desc: "FISHER, John Summit, NERVO, Marlon Hoffstadt, Chase & Status. The slots that fill the early evenings and define the energy curve of the day — arriving late means missing them and burning your peak window on the wrong set." },
                      { stop: "The two weekends are not identical", desc: "Most headliners play both weekends, but secondary names and B2B sets often differ. Check the schedule per weekend before you finalise which one you target — Weekend 1 (17-19 July) and Weekend 2 (24-26 July) are not perfect copies of each other." },
                    ]
                  : [
                      { stop: "Calvin Harris — premier Tomorrowland Belgium", desc: "La plus grosse annonce du cycle 2026. Calvin Harris a déjà joué l'édition Brasil mais jamais la Belgique — le créneau Mainstage, c'est celui devant lequel toute la foule sera, peu importe ce qu'il se passe sur les 15 autres scènes à la même heure." },
                      { stop: "Les piliers grand public", desc: "David Guetta, Martin Garrix, Armin van Buuren, Hardwell, The Chainsmokers, Dimitri Vegas & Like Mike — les habitués de la maison. Prévisibles, mais sur la production Mainstage de Tomorrowland, même les sets les plus joués reprennent un coup de neuf. Sebastian Ingrosso est aussi à l'affiche, souvent le véhicule favori du festival pour un moment Swedish House Mafia officieux." },
                      { stop: "Les pointures techno et dubstep", desc: "Sara Landry, REZZ, Subtronics, ILLENIUM, Miss Monique, Indira Paganotto. Le Core, Atmosphere et autres scènes secondaires tournent à un niveau qui dépasse souvent la Mainstage en qualité — la mécanique Tomorrowland, c'est accepter de quitter la tête d'affiche pour ces créneaux-là." },
                      { stop: "Les ancrages future et house", desc: "FISHER, John Summit, NERVO, Marlon Hoffstadt, Chase & Status. Les créneaux qui remplissent les débuts de soirée et définissent la courbe d'énergie de la journée — arriver tard, c'est les rater et brûler son pic sur le mauvais set." },
                      { stop: "Les deux week-ends ne sont pas identiques", desc: "La plupart des têtes d'affiche jouent les deux week-ends, mais les noms secondaires et les B2B diffèrent souvent. Vérifiez la grille par week-end avant de finaliser celui que vous visez — Week-end 1 (17-19 juillet) et Week-end 2 (24-26 juillet) ne sont pas des copies parfaites l'un de l'autre." },
                    ]
                ).map((item, i) => (
                  <div key={i} className="flex gap-6 lg:gap-8">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <div className="w-4 h-4 bg-[#F6391A] rounded-full" />
                      {i < 4 && <div className="w-0.5 flex-1 bg-[#FFFBF5]/10" />}
                    </div>
                    <div className="pb-12 lg:pb-16">
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">{item.stop}</h3>
                      <p className="text-[#FFFBF5]/55 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ TICKETS, GJ & RESALE ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Tickets, Global Journey & Official Resale" : "Billetterie, Global Journey & Revente Officielle"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "The sale calendar already happened — the only path forward is the official resale platform. Everything else is a refused gate scan."
                : "Le calendrier de vente est passé — le seul chemin restant, c'est la plateforme de revente officielle. Le reste, c'est un scan d'entrée refusé."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 1" : "Canal 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Global Journey (sold out)" : "Global Journey (sold out)"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Bundles flight or train, hotel in Brussels or Antwerp, festival pass and daily shuttle. Sold out worldwide on 17 January 2026 — the only return path is people cancelling, and there is no public waiting list. Watch the official portal." : "Bundle vol ou train, hôtel à Bruxelles ou Anvers, pass festival et navette quotidienne. Sold out mondialement le 17 janvier 2026 — le seul retour, c'est des annulations, et il n'y a pas de liste d'attente publique. Surveillez le portail officiel."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 2" : "Canal 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Official ticket resale" : "Revente billet officielle"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Day passes (from €138) and Full Madness weekend passes (from €304 pre-sale, €365 worldwide) — the regular sales closed late January. The Tomorrowland official resale platform is the only legitimate secondary market. Listings appear sporadically, including the week of the festival." : "Pass jour (à partir de 138 €) et Full Madness week-end (à partir de 304 € pré-vente, 365 € vente mondiale) — les ventes classiques ont fermé fin janvier. La plateforme officielle de revente Tomorrowland est le seul marché secondaire légitime. Des annonces apparaissent ponctuellement, y compris la semaine du festival."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "What to avoid" : "À éviter"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Unofficial resale" : "Revente parallèle"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Telegram, Facebook marketplace, Vinted, Viagogo: counterfeit passes are routine and the Tomorrowland gate scan is strict. Tickets are nominative and tied to your name on the wristband — you cannot legally transfer outside the official channel." : "Telegram, Marketplace Facebook, Vinted, Viagogo : les faux pass sont monnaie courante et le scan d'entrée Tomorrowland est strict. Les billets sont nominatifs et liés à votre nom sur le bracelet — vous ne pouvez pas transférer légalement en dehors du canal officiel."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ GETTING THERE ━━━ */}
        <FadeIn>
          <section id="getting-there" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Getting to Boom" : "Rejoindre Boom"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "Eurostar to Brussels-Midi, then SNCB train to Boom, then a free festival shuttle to the gates. Rail is the obvious choice from Paris, Lille and London."
                  : "Eurostar jusqu'à Bruxelles-Midi, puis train SNCB jusqu'à Boom, puis navette festival gratuite jusqu'aux portes. Le train est l'évidence depuis Paris, Lille et Londres."}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "From Paris" : "Depuis Paris"}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris → Brussels → Boom</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Eurostar (ex-Thalys) from Paris-Nord to Brussels-Midi" : "→ Eurostar (ex-Thalys) depuis Paris-Nord vers Bruxelles-Midi"}</li>
                    <li>{isEn ? "→ ~1h22 to Brussels-Midi, from ~€30 advance" : "→ ~1h22 jusqu'à Bruxelles-Midi, à partir de ~30 € en avance"}</li>
                    <li>{isEn ? "→ SNCB train to Boom: every ~30 min, ~32 min ride, €6-10" : "→ Train SNCB vers Boom : toutes les ~30 min, ~32 min, 6-10 €"}</li>
                    <li>{isEn ? "→ De Lijn bus from Antwerp Groenplaats: ~47 min, ~€4" : "→ Bus De Lijn depuis Antwerp Groenplaats : ~47 min, ~4 €"}</li>
                    <li>{isEn ? "→ Free festival shuttle from Boom station to the gates" : "→ Navette festival gratuite de la gare de Boom aux portes"}</li>
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "From Lille, London or by plane" : "Depuis Lille, Londres ou en avion"}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "Other routes" : "Autres routes"}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Lille-Europe → Brussels-Midi: 35-50 min by Eurostar" : "→ Lille-Europe → Bruxelles-Midi : 35-50 min en Eurostar"}</li>
                    <li>{isEn ? "→ London St Pancras → Brussels-Midi: ~1h55 direct" : "→ Londres St Pancras → Bruxelles-Midi : ~1h55 direct"}</li>
                    <li>{isEn ? "→ Brussels Zaventem (BRU): 33 km / ~20 min by road" : "→ Bruxelles-Zaventem (BRU) : 33 km / ~20 min par la route"}</li>
                    <li>{isEn ? "→ Antwerp Airport (ANR): closer but fewer connections" : "→ Aéroport d'Anvers (ANR) : plus proche mais moins desservi"}</li>
                    <li>{isEn ? "→ Last trains from Boom end before the closing set — plan a hotel near the festival or a taxi" : "→ Les derniers trains depuis Boom partent avant le set de clôture — prévoyez hôtel proche ou taxi"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ WHERE TO SLEEP ━━━ */}
        <section id="sleeping" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "DreamVille vs Antwerp vs Brussels" : "DreamVille vs Anvers vs Bruxelles"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three real options once Global Journey is off the table. The right one depends on whether you trade comfort for proximity."
                : "Trois vraies options une fois le Global Journey hors jeu. La bonne dépend de si vous échangez confort contre proximité."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 1" : "Option 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">DreamVille</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "On-site, walking distance to the gates, open 5 days from Thursday ~11:00 to Monday. Tiers from Magnificent Greens BYO tent to Solara (new 2026, with power outlets) and Marivela (A/C + private bathroom) above €2,700 per person. The actual Tomorrowland experience — if you can still find a slot through resale." : "Sur le site, à pied des portes, ouvert 5 jours du jeudi vers 11h au lundi. Niveaux de Magnificent Greens (tente perso) à Solara (nouveauté 2026, avec prises) et Marivela (clim + salle de bain privée) au-dessus de 2 700 € par personne. L'expérience Tomorrowland authentique — si vous trouvez encore un créneau sur la revente."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 2" : "Option 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Antwerp" : "Anvers"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "20 km north, 30 min train to Boom, hotels €150-400/night during festival weekends. The best base if you want real food, real bars and a shower that works after each day. Book within walking distance of Antwerpen-Centraal — the 6am train back from Boom is not a pleasant taxi negotiation." : "20 km au nord, 30 min de train jusqu'à Boom, hôtels 150-400 €/nuit sur les week-ends festival. La meilleure base si vous voulez vraie bouffe, vrais bars et une douche qui marche après chaque journée. Réservez à pied d'Antwerpen-Centraal — le train de 6h depuis Boom n'est pas une négociation taxi agréable."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 3" : "Option 3"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Brussels" : "Bruxelles"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "30 km south, broader hotel inventory and better airport connections (BRU is 20 min from Brussels). The commute to Boom is longer (~45 min) but Brussels often has rooms when Antwerp is fully booked. Worth checking if your flight lands at BRU." : "30 km au sud, offre hôtelière plus large et meilleures connexions aéroport (BRU à 20 min de Bruxelles). Le trajet vers Boom est plus long (~45 min) mais Bruxelles a souvent des chambres quand Anvers est complet. À vérifier si votre vol atterrit à BRU."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ MID-PAGE CTA ━━━ */}
        <section className="px-6 lg:px-12 -mt-8 mb-4">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex-1">
                <p className="text-[#FFFBF5] font-londrina-solid text-xl lg:text-2xl mb-1">
                  {isEn ? "Picked DreamVille or Antwerp?" : "DreamVille ou Anvers, vous avez tranché ?"}
                </p>
                <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base">
                  {isEn ? "Lock the Eurostar, the accommodation and the Pearl float in one shared plan." : "Verrouille l'Eurostar, l'hébergement et le float Pearl dans un plan partagé."}
                </p>
              </div>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=tomorrowland-2026&template=tomorrowland-2026&placement=mid-sleep`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {isEn ? "Start the plan" : "Lance le plan"}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ PEARLS & PRACTICALITIES ━━━ */}
        <FadeIn>
          <section id="pearls" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Pearls & On-Site Practicalities" : "Pearls & Pratique sur Site"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "Tomorrowland's currency is the Pearl — €1.82 each, only sold by the festival, only spent on the festival. Plan the float in advance or the queue eats your set."
                  : "La monnaie Tomorrowland, c'est le Pearl — 1,82 € l'unité, vendu uniquement par le festival, dépensé uniquement au festival. Anticipez le float ou la file mangera votre set."}
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "How the Pearl system works" : "Comment marche le Pearl"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "€20 buys 11 Pearls — about €1.82 each. Top up online before arriving: every €100 in online top-up earns a 2-Pearl bonus, and unspent Pearls are auto-refunded after the festival. On-site top-ups work too, but the unspent balance has to be claimed manually before the announced deadline. Keep one person in the group in charge of the Pearl float and rotate the rounds."
                      : "20 € achètent 11 Pearls — environ 1,82 € l'unité. Rechargez en ligne avant d'arriver : chaque 100 € en ligne donne un bonus de 2 Pearls, et le solde non utilisé est remboursé automatiquement après. Le rechargement sur place marche aussi, mais le solde non utilisé doit être réclamé manuellement avant la deadline. Désignez une personne du groupe responsable du float Pearl et faites tourner les tournées."}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Banned items & DreamVille rules" : "Interdictions & règles DreamVille"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "No glass, no weapons, no drugs, no pets, no fire-starting items, no outside food or drink on the main grounds. DreamVille is more permissive: each camper can bring 12 beers, 12 soft drinks, 12 bottles of water and non-perishable food. Check the latest list on the official site before packing — the rules tighten year by year."
                      : "Pas de verre, pas d'armes, pas de drogue, pas d'animaux, pas d'objets feu, pas de bouffe ou boisson extérieure sur les zones principales. DreamVille est plus permissif : chaque campeur peut amener 12 bières, 12 sodas, 12 bouteilles d'eau et de la bouffe non périssable. Vérifiez la dernière liste sur le site officiel avant de faire le sac — les règles se durcissent d'année en année."}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Weather late July in Boom" : "Météo fin juillet à Boom"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "Average high 23°C, low 15°C. Rain falls on roughly 12 days per month — a ~27% daily chance during the festival. Belgian summer flips between heatwave and downpour from one day to the next, so pack both a sunscreen kit and a rain poncho. Sturdy waterproof shoes for the DreamVille mud after a heavy shower."
                      : "Maxi moyen 23°C, mini 15°C. Il pleut environ 12 jours par mois — ~27 % de chance quotidienne pendant le festival. L'été belge oscille entre canicule et averse d'un jour à l'autre, donc emportez à la fois crème solaire et poncho. Des chaussures imperméables solides pour la boue DreamVille après une grosse pluie."}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PLANNING THE TRIP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08]">
              {isEn ? "Planning the Trip with the Crew" : "Organiser le Voyage entre Potes"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The two-weekend split makes Tomorrowland trickier than a single-weekend festival: half the group might end up on Weekend 1, the other half on Weekend 2, with different transport, different accommodation, sometimes different stages. Run a quick <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early to lock who is on which weekend, who is at DreamVille vs Antwerp, and who is taking the Eurostar together. The poll is the smallest piece of work that prevents 80% of the festival arguments.</>
                : <>La répartition deux week-ends rend Tomorrowland plus délicat qu&apos;un festival sur un seul week-end : la moitié du groupe peut finir sur le Week-end 1, l&apos;autre sur le Week-end 2, avec transports différents, hébergements différents, parfois scènes différentes. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt pour caler qui est sur quel week-end, qui dort à DreamVille vs Anvers, et qui prend l&apos;Eurostar ensemble. Le sondage, c&apos;est le plus petit travail qui évite 80 % des engueulades du festival.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is where the band clashes live. Pin the must-sees (Calvin Harris on Mainstage, the closing set you cannot miss) and let the group fork on the others — Tomorrowland is built so that nobody should feel guilty for leaving the Mainstage for Core or Atmosphere. The itinerary also stores the meeting points (Mainstage flag pole, food hall entrance, DreamVille section name) when the network drops.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link>, c&apos;est là que vivent les clashs entre groupes. Épinglez les indispensables (Calvin Harris à la Mainstage, le set de clôture à ne pas rater) et laissez le groupe se diviser sur le reste — Tomorrowland est conçu pour que personne ne culpabilise de quitter la Mainstage pour Core ou Atmosphere. L&apos;itinéraire stocke aussi les points de rendez-vous (mât drapeau Mainstage, entrée food hall, nom de secteur DreamVille) quand le réseau lâche.</>}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET TIPS ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Budget Tips" : "Astuces Budget"}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Tickets, DreamVille and Global Journey packages are individual — keep them out of the shared pool. The shared pool is for transport (Eurostar, SNCB, shuttle), accommodation outside DreamVille, restaurants in Antwerp before and after, and the on-site Pearl float. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and add an explicit &apos;Pearl float&apos; line so the bar and food rounds don&apos;t disappear into a generic &apos;misc&apos; column.</>
                  : <>Les billets, DreamVille et packages Global Journey sont individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour le transport (Eurostar, SNCB, navette), l&apos;hébergement hors DreamVille, les restos à Anvers avant et après, et le float Pearl sur place. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et ajoutez une ligne explicite « float Pearl » pour que les tournées et la bouffe ne se perdent pas dans une colonne « divers ».</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Eurostar prices climb fast on the Friday outbound and Sunday/Monday return. Off-peak windows (very early morning Friday departure, mid-Monday return) are still bookable at advance fares. Booking the full crew on the same train trims both cost and chaos at Brussels-Midi when the SNCB connection is only minutes away."
                  : "Les prix Eurostar grimpent vite sur le vendredi aller et le dimanche/lundi retour. Les créneaux off-peak (très tôt le vendredi matin, milieu de lundi pour le retour) restent réservables aux tarifs avancés. Réserver toute la bande sur le même train fait économiser à la fois en argent et en chaos à Bruxelles-Midi quand la correspondance SNCB est à quelques minutes seulement."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "On-site Pearls are the silent budget killer. Bar rounds, food, merch — a typical Tomorrowland day ends around €80-120 per person on the wristband even on a moderate run. Top up online to grab the 2-Pearl bonus per €100 and skip the on-site queue, but top up €30 less than you think you need: an extra reload mid-festival takes 10 minutes, while a giant post-festival refund is money you didn't have during the weekend."
                  : "Le Pearl sur place, c'est le tueur silencieux du budget. Tournées, bouffe, merch — une journée Tomorrowland moyenne sort à 80-120 € par personne sur le bracelet même sur un rythme tranquille. Rechargez en ligne pour récupérer le bonus de 2 Pearls par 100 € et éviter la file sur place, mais rechargez 30 € de moins que ce que vous estimez : un rechargement à mi-parcours prend 10 minutes, alors qu'un gros remboursement post-festival, c'est de l'argent que vous n'aviez pas pendant le week-end."}
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
              <Link href={`/${locale}/hellfest-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Hellfest 2026 Trip Planner" : "Voyage Hellfest 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Four days of metal in Clisson, France." : "Quatre jours de metal à Clisson."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/champions-league-final-2026-psg-arsenal`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Champions League Final" : "Finale Ligue des Champions"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "PSG vs Arsenal in Budapest." : "PSG vs Arsenal à Budapest."}</p>
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
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {isEn ? "Build Your Tomorrowland Trip" : "Construisez Votre Voyage Tomorrowland"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Eurostar, DreamVille or Antwerp apartment, Pearl float, festival schedule, shared budget — one plan, your whole crew on the same page. Pick your weekend below." : "Eurostar, DreamVille ou appartement à Anvers, float Pearl, grille du festival, budget partagé — un seul plan, toute votre bande alignée. Choisissez votre week-end ci-dessous."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=tomorrowland-2026&template=tomorrowland-2026&placement=bottom-w1`}>
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Plan Weekend 1 (17–19 Jul)" : "Cadre le Week-end 1 (17-19 juil)"}</PulsatingButton>
                </Link>
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=tomorrowland-2026-w2&template=tomorrowland-2026-w2&placement=bottom-w2`} className="text-[#FFFBF5] font-karla font-bold text-sm lg:text-base hover:underline border border-[#FFFBF5]/40 hover:border-[#FFFBF5] rounded-full px-6 py-3 transition-colors">
                  {isEn ? "Or Weekend 2 (24–26 Jul) →" : "Ou Week-end 2 (24-26 juil) →"}
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
