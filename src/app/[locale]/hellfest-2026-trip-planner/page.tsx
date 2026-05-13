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
const PATHNAME = "/hellfest-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Hellfest 2026: Trip Planner — Travel, Camping & Prices"
    : "Hellfest 2026 : Voyage à Clisson — TGV, Camping, Prix";
  const description = isEn
    ? "Everything for Hellfest 2026 (18–21 June, Clisson): sold-out resale plan, TGV from Paris/Brussels, Clisson shuttles, camping vs Nantes hotels, cashless system and shared group budget for the metal pilgrimage."
    : "Tout sur le Hellfest 2026 (18-21 juin, Clisson) : plan revente sur la billetterie sold out, TGV depuis Paris/Bruxelles, navettes Clisson, camping vs hôtels Nantes, cashless et budget partagé pour le pèlerinage metal entre potes.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/hellfest-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function Hellfest2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "Hellfest 2026 Trip Planner" : "Voyage Hellfest 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Hellfest 2026: The Trip Planner for Clisson" : "Hellfest 2026 : Le Guide Voyage à Clisson",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-13", dateModified: "2026-05-13",
    image: [`${SITE_URL}/events/hellfest-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const musicEventLd = {
    "@context": "https://schema.org",
    "@type": "MusicFestival",
    name: "Hellfest Open Air Festival 2026",
    description: isEn
      ? "Hellfest 2026, the four-day metal and rock festival at the Val de Moine in Clisson, France, from 18 to 21 June 2026. 183 artists across 6 stages, headlined by Bring Me The Horizon, Iron Maiden, Limp Bizkit and The Offspring."
      : "Hellfest 2026, le festival metal et rock de quatre jours au Val de Moine à Clisson, France, du 18 au 21 juin 2026. 183 artistes sur 6 scènes, têtes d'affiche Bring Me The Horizon, Iron Maiden, Limp Bizkit et The Offspring.",
    image: [`${SITE_URL}/events/hellfest-2026.png`],
    startDate: "2026-06-18",
    endDate: "2026-06-21",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: "Hellfest Productions", url: "https://hellfest.fr" },
    offers: {
      "@type": "Offer",
      url: "https://tickets.hellfest.fr",
      availability: "https://schema.org/SoldOut",
      validFrom: "2025-10-01",
    },
    location: {
      "@type": "Place",
      name: "Val de Moine",
      address: { "@type": "PostalAddress", addressLocality: "Clisson", addressRegion: "Pays de la Loire", addressCountry: "FR" },
    },
  };

  const faqItems = isEn
    ? [
        { q: "When and where is Hellfest 2026?", a: "Thursday 18 to Sunday 21 June 2026 at the Val de Moine in Clisson, a small wine-growing town in Loire-Atlantique, about 30 km southeast of Nantes. The site covers 21 hectares and runs 6 stages with 183 artists over the four days. Longest daylight of the year — the sun sets close to 22:00 local time, perfect for the late-night main-stage closers." },
        { q: "Is Hellfest 2026 sold out and how do I still get a ticket?", a: "Yes. Both the 4-day passes and the single-day passes are sold out, and the premium Easy Camp accommodation is also gone. The only legitimate way to find a ticket now is the official resale platform on tickets.hellfest.fr — listings appear when other fans cancel, sometimes daily, sometimes only days before the festival. Avoid Telegram groups, Facebook marketplace and Vinted: counterfeit tickets are widely reported and won't pass the gate scan." },
        { q: "How do I get to Clisson from Paris, Lille or Brussels?", a: "The fastest route is TGV INOUI or Ouigo from Paris-Montparnasse to Nantes — 2h00 to 2h26, fares from around €16 on Ouigo if booked early, €40-90 closer to the date. From Lille, count on a direct TGV in about 4h. From Brussels, one direct TGV per day, around 4h47. From Nantes you then take a regional TER to Clisson — every hour, 16-30 minutes — and during the festival a special 'Live' ticket caps any Pays de la Loire TER trip to/from Clisson at €5." },
        { q: "Where should I stay around the festival?", a: "Three options. Camping classique is included in the 4-day pass — basic but the heart of the Hellfest experience. Premium Easy Camp (tipis, chalets, tiny rooms) is sold out for 2026. Off-site, Nantes hotels (30 km away) average around €130-180/night during festival weekend, up 20-60% from normal rates, and you'll need to factor in transport time both ways. A serviced apartment split with the crew often comes out best on price." },
        { q: "How does the Hellfest cashless system work?", a: "The site is 100% cashless and the only payment method is your festival wristband. Top it up online at cashless.hellfest.fr (no fee on top-ups after the first) or at on-site banks. The first activation costs €1.50. There are very few ATMs on-site — Hell City Square and the Clisson supermarket — and queues are long, so top up before you arrive. Unspent balance is refundable after the festival within the announced window." },
        { q: "What's the weather like in Clisson in mid-June?", a: "Warm days around 22-24°C, cool nights around 12-13°C, with roughly 11 rainy days across the month so a light rain jacket is non-negotiable. The site is open with little shade — bring sunscreen, a refillable water bottle and a hat. The longest days of the year mean ~16 hours of daylight, perfect for the festival rhythm but rough on phone batteries." },
        { q: "What is the price of a Hellfest 2026 pass?", a: "Hellfest 2026 4-day passes were sold at around €369 in pre-sale and €389 standard before going sold out. Single-day passes sat around €99 (also sold out). On the official resale platform on tickets.hellfest.fr, sellers can re-list at the original price only — no legal markup, so a resale 4-day pass is still ~€389. Add ~€132/night for a Nantes hotel base (with festival surge), ~€16-90 for a Paris-Nantes TGV, and €150-200 of on-site cashless per person to get a realistic total budget around €700-1,000 for the four days." },
        { q: "How do you organise a Hellfest trip with a group of friends?", a: "Resale tickets are individual — keep them out of the shared pool. The shared pool is for the TGV, hotel or apartment, on-site cashless top-ups, group meals in Nantes before or after, and the rental car or shuttle. Set categories from day one (transport, accommodation, food, cashless float) so the math doesn't collapse on the way home. WePlanify keeps each category clean and lets the group front expenses by rotation." },
      ]
    : [
        { q: "Quand et où se tient le Hellfest 2026 ?", a: "Du jeudi 18 au dimanche 21 juin 2026 au Val de Moine à Clisson, une petite ville viticole de Loire-Atlantique, à environ 30 km au sud-est de Nantes. Le site fait 21 hectares avec 6 scènes et 183 artistes sur les quatre jours. C'est la période la plus longue de l'année en lumière du jour — le soleil se couche autour de 22h, idéal pour les concerts de tête d'affiche en plein air." },
        { q: "Le Hellfest 2026 est-il sold out, comment trouver un billet ?", a: "Oui. Les pass 4 jours et les pass 1 jour sont sold out, et l'hébergement premium Easy Camp aussi. La seule façon légitime d'avoir un billet maintenant, c'est la billetterie officielle de revente sur tickets.hellfest.fr — des billets réapparaissent quand des festivaliers annulent, parfois quotidiennement, parfois quelques jours avant l'événement. Évitez Telegram, Marketplace et Vinted : les faux billets sont massifs et ne passent pas le scan d'entrée." },
        { q: "Comment rejoindre Clisson depuis Paris, Lille ou Bruxelles ?", a: "Le plus rapide, c'est TGV INOUI ou Ouigo depuis Paris-Montparnasse jusqu'à Nantes — 2h00 à 2h26, prix à partir de 16 € sur Ouigo en s'y prenant tôt, 40-90 € à l'approche. Depuis Lille, comptez un TGV direct en 4h environ. Depuis Bruxelles, un seul TGV direct par jour, environ 4h47. De Nantes vous prenez ensuite un TER jusqu'à Clisson — toutes les heures, 16 à 30 minutes — et pendant le festival un billet spécial 'Live' plafonne tout trajet TER Pays de la Loire vers/depuis Clisson à 5 €." },
        { q: "Où dormir autour du festival ?", a: "Trois options. Le camping classique est inclus dans le pass 4 jours — basique mais c'est le cœur de l'expérience Hellfest. L'Easy Camp premium (tipis, chalets, tiny rooms) est sold out pour 2026. Hors site, les hôtels nantais (30 km) tournent autour de 130-180 €/nuit sur le week-end, soit +20 à 60 % par rapport au tarif normal, et il faut compter le trajet aller-retour. Un appartement partagé entre potes ressort souvent comme la meilleure option budget." },
        { q: "Comment fonctionne le cashless du Hellfest ?", a: "Le site est 100 % cashless, le seul moyen de paiement c'est votre bracelet. Vous le rechargez sur cashless.hellfest.fr (pas de frais sur les rechargements suivants) ou aux banques cashless sur place. Première activation à 1,50 €. Très peu de DAB sur le site — Hell City Square et le supermarché de Clisson — et les files sont longues, donc rechargez avant d'arriver. Le solde non utilisé est remboursable après le festival dans la fenêtre annoncée." },
        { q: "Quelle météo prévoir à Clisson mi-juin ?", a: "Journées douces autour de 22-24°C, nuits fraîches autour de 12-13°C, et environ 11 jours de pluie sur le mois donc un coupe-vent imperméable est indispensable. Le site est ouvert avec peu d'ombre — crème solaire, gourde et casquette obligatoires. Les journées les plus longues de l'année (~16 h de jour) rythment bien le festival mais épuisent les batteries de téléphone." },
        { q: "Quel est le prix du Hellfest 2026 ?", a: "Le pass 4 jours Hellfest 2026 s'est vendu autour de 369 € en pré-vente et 389 € en tarif standard avant de partir sold out. Le pass 1 jour tournait autour de 99 € (aussi sold out). Sur la revente officielle tickets.hellfest.fr, les vendeurs ne peuvent pas légalement majorer — un pass 4 jours en revente reste donc à ~389 €. Ajoutez ~132 €/nuit pour un hôtel à Nantes (avec la surchauffe festival), 16-90 € pour le TGV Paris-Nantes, et 150-200 € de cashless sur place par personne pour un budget réaliste autour de 700-1 000 € sur les quatre jours." },
        { q: "Comment organiser un Hellfest entre potes ?", a: "Les billets de revente sont individuels — gardez-les hors du pot commun. Le pot commun, c'est pour le TGV, l'hôtel ou l'appartement, les rechargements cashless, les restos à Nantes avant et après, et la voiture de location ou la navette. Posez les catégories dès le départ (transport, hébergement, restos, float cashless) pour ne pas finir le calcul au retour. WePlanify garde chaque catégorie au propre et permet de faire tourner les avances dans le groupe." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a Hellfest 2026 trip to Clisson" : "Comment organiser un voyage au Hellfest 2026 à Clisson",
    description: isEn
      ? "Five weeks out, here is how to lock the trip: ticket-resale watch, TGV from Paris, Clisson logistics, group budget setup and a cashless float plan."
      : "À cinq semaines, voici comment verrouiller le voyage : veille billetterie revente, TGV depuis Paris, logistique Clisson, budget partagé et float cashless.",
    totalTime: "PT45M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Map who has a ticket and who is still hunting" : "Identifier qui a un billet et qui en cherche encore",
        text: isEn
          ? "Hellfest is sold out — run a quick poll in the group to flag who is confirmed, who is waiting on the official resale, and who is going regardless to camp and enjoy the village. The answer drives flights, room split and rental car size."
          : "Hellfest est sold out — lancez un sondage rapide dans le groupe pour distinguer qui est confirmé, qui attend un billet sur la revente officielle, et qui descend de toute façon pour camper et profiter du village. La réponse pilote tout : transport, chambres, taille de la voiture.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Book TGV and accommodation before they slip" : "Réserver TGV et hébergement avant qu'ils ne s'envolent",
        text: isEn
          ? "Paris–Nantes Ouigo and TGV INOUI are still bookable but climb fast on the Wed/Thu departures and the Sun/Mon returns. Lock one outbound and one return for the whole crew, plus a Nantes apartment or hotel block within 30 minutes of the TER to Clisson."
          : "Les Paris-Nantes Ouigo et TGV INOUI sont encore réservables mais grimpent vite sur les départs mer/jeu et les retours dim/lun. Verrouillez un même aller et un même retour pour toute la bande, plus un appartement ou un bloc d'hôtel à Nantes à moins de 30 minutes du TER vers Clisson.",
        url: `${SITE_URL}/${locale}/features/itinerary`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Set a shared budget with a cashless float category" : "Mettre en place un budget partagé avec une catégorie float cashless",
        text: isEn
          ? "Resale tickets stay individual. Everything else (TGV, hotel, apartment, rental car, food, on-site cashless top-ups) goes into a shared pool with categories. Add a dedicated 'cashless float' line so the merch and bar rounds don't disappear into a giant 'misc' column."
          : "Les billets de revente restent individuels. Le reste (TGV, hôtel, appartement, voiture, restos, rechargements cashless) va dans un pot commun avec catégories. Ajoutez une ligne 'float cashless' dédiée pour que le merch et les tournées au bar ne se perdent pas dans une colonne 'divers'.",
        url: `${SITE_URL}/${locale}/features/budget`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Plan the four days stage by stage" : "Planifier les quatre jours scène par scène",
        text: isEn
          ? "Six stages, 183 artists, clashes everywhere — share the schedule in advance so the group knows who is at Mainstage 1 for Iron Maiden vs who is staying at the Altar for Cult of Luna. Block water and food breaks into the timeline, not just the bands."
          : "Six scènes, 183 artistes, des clashs partout — partagez la grille à l'avance pour savoir qui est à Mainstage 1 pour Iron Maiden vs qui reste à l'Altar pour Cult of Luna. Bloquez les pauses eau et nourriture dans la timeline, pas seulement les groupes.",
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
                { label: isEn ? "Hellfest 2026 Trip Planner" : "Voyage Hellfest 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Festival guide & trip planner · Clisson 2026" : "Guide du festival & planificateur · Clisson 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Hellfest 2026: Your Trip Planner to Clisson"
                : "Hellfest 2026 : Le Guide Voyage à Clisson"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>18 to 21 June 2026, Val de Moine, Clisson. 183 artists across six stages, Iron Maiden running their 50-year anniversary tour, Bring Me The Horizon opening, Limp Bizkit and The Offspring closing the weekend. The festival is sold out — the trip is not. This is the complete guide to getting to Clisson, where to sleep, how the cashless works, and how to keep the crew aligned on budget and schedule across four very long days. If you&apos;re still picking your tools, see our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Du 18 au 21 juin 2026, Val de Moine, Clisson. 183 artistes sur six scènes, Iron Maiden en pleine tournée des 50 ans, Bring Me The Horizon en ouverture, Limp Bizkit et The Offspring pour clôturer. Le festival est sold out — le voyage, lui, ne l&apos;est pas. Voici le guide complet pour rejoindre Clisson, où dormir, comment marche le cashless, et comment garder toute la bande alignée sur le budget et la grille pendant quatre jours intenses. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "9 min read" : "9 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=hellfest-2026&template=hellfest-2026&placement=hero`}>
                <PulsatingButton className="font-karla font-bold">{isEn ? "Plan our Hellfest crew" : "Cadre le Hellfest entre potes"}</PulsatingButton>
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
                src="/events/hellfest-2026.png"
                alt={isEn ? "Hellfest 2026 — friends watching the sunset over Clisson vineyards and the festival site" : "Hellfest 2026 — des potes au coucher de soleil au-dessus des vignobles de Clisson et du site du festival"}
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
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Dates" : "Dates"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{isEn ? "18–21 Jun" : "18-21 juin"}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Site" : "Site"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">Val de Moine</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Clisson, FR</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Stages" : "Scènes"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">6</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "183 artists" : "183 artistes"}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Capacity" : "Capacité"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">~60k</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "per day" : "par jour"}</p>
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
                ? "A four-day pilgrimage to a wine-growing town of 7,000 people that turns into the loudest place in Europe. The headliners cover the full spectrum the festival is built on: a metalcore generation opener with Bring Me The Horizon, a heritage night with Iron Maiden on the road for their 50 Years tour, a nu-metal Saturday with Limp Bizkit, and a punk-rock Sunday closer with The Offspring. Underneath, 179 other bands across six stages, 85 of them at Hellfest for the first time. The festival is sold out — but the operation around it is what most fans will actually remember: the TGV from Montparnasse, the apartment shared with six mates in Nantes, the cashless wristband that runs out at midnight on the Saturday, the TER back to Clisson at 11am on Sunday before the Mainstage 1 closer."
                : "Quatre jours de pèlerinage dans une ville viticole de 7 000 habitants qui devient l'endroit le plus bruyant d'Europe. Les têtes d'affiche couvrent tout le spectre du festival : ouverture metalcore avec Bring Me The Horizon, soirée patrimoine avec Iron Maiden en tournée des 50 ans, nu-metal le samedi avec Limp Bizkit, et clôture punk-rock le dimanche avec The Offspring. En dessous, 179 autres groupes sur six scènes, dont 85 pour la première fois au Hellfest. Le festival est sold out — mais ce que la plupart des fans retiendront, c'est l'opération autour : le TGV à Montparnasse, l'appartement partagé à six potes à Nantes, le bracelet cashless en rade à minuit le samedi, le TER pour Clisson à 11h le dimanche avant la clôture Mainstage 1."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for fans heading to Clisson — TGV, apartment, cashless float, four-day schedule and budget in one place, in English or French."
                : "WePlanify, c'est le poste de commandement gratuit et partagé pour les fans qui descendent à Clisson — TGV, appartement, float cashless, grille des quatre jours et budget au même endroit, en français ou anglais."}
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
                { id: "tickets", label: isEn ? "Tickets & official resale" : "Billetterie & revente officielle" },
                { id: "getting-there", label: isEn ? "Getting to Clisson" : "Rejoindre Clisson" },
                { id: "sleeping", label: isEn ? "Where to sleep" : "Où dormir" },
                { id: "cashless", label: isEn ? "Cashless & on-site practicalities" : "Cashless & pratique sur site" },
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
                  ? "Four headline nights, six stages, 183 artists. The clashes you'll need to negotiate inside the group before you even buy the TGV ticket."
                  : "Quatre soirées en tête d'affiche, six scènes, 183 artistes. Les clashs à négocier dans le groupe avant même de réserver le TGV."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "Thursday — Bring Me The Horizon", desc: "The opener is the modern-metal anchor of the weekend. BMTH on the Mainstage signals where the festival is going generationally — broader than the old underground core, still loud enough to satisfy it. Expect a high-production show and a much younger crowd up front than the rest of the weekend." },
                      { stop: "Friday — Iron Maiden 'Run For Your Lives'", desc: "Maiden's 50-year anniversary tour stops at Clisson. The setlist on this run leans heavily on the first decade catalogue, which is exactly what most of the crowd has been waiting for since the announcement. Plan to be in the photo pit zone early — Friday is the night Mainstage 1 will be hardest to leave once you're in." },
                      { stop: "Saturday — Limp Bizkit", desc: "The nu-metal comeback that nobody saw landing in 2026. Limp Bizkit on the Mainstage on a Saturday night is a nostalgia bomb for one half of the crowd and a curiosity show for the other. Either way, the singalongs travel further into the camping zones than the actual amps." },
                      { stop: "Sunday — The Offspring", desc: "Closing the weekend on Mainstage 1, The Offspring brings the punk-rock catalog that ages stupidly well in a tired Sunday-night crowd. The slot is also the most painful clash window of the festival — A Perfect Circle, Behemoth and others fight for the same hour." },
                      { stop: "Underneath the headliners", desc: "183 artists across 6 stages, 85 at Hellfest for the first time. Names to keep on your radar: A Perfect Circle, Breaking Benjamin, Volbeat, Behemoth, Cult of Luna, Amenra, Igorrr, Kadavar, Ultra Vomit. Share the full schedule inside the group early — clashes are constant and the call to skip the headliner for the Altar slot is the most divisive in any festival weekend." },
                    ]
                  : [
                      { stop: "Jeudi — Bring Me The Horizon", desc: "L'ouverture, c'est l'ancrage metal moderne du week-end. BMTH en Mainstage indique où le festival va générationnellement — plus large que le noyau underground historique, encore assez bruyant pour ne pas le perdre. Attendez-vous à un show ultra-produit et à un public devant scène nettement plus jeune que le reste du week-end." },
                      { stop: "Vendredi — Iron Maiden 'Run For Your Lives'", desc: "La tournée des 50 ans de Maiden passe par Clisson. La setlist de ce run pioche très largement dans la première décennie du groupe, ce que la moitié de la foule attendait depuis l'annonce. Visez le pit photo tôt — vendredi sera la soirée où Mainstage 1 sera la plus difficile à quitter une fois rentrés." },
                      { stop: "Samedi — Limp Bizkit", desc: "Le retour nu-metal que personne n'avait vu venir en 2026. Limp Bizkit en Mainstage un samedi soir, c'est une bombe nostalgie pour la moitié du public et une curiosité pour l'autre. Dans tous les cas, les refrains portent jusqu'aux zones de camping bien au-delà des enceintes." },
                      { stop: "Dimanche — The Offspring", desc: "Clôture Mainstage 1 avec The Offspring : un catalogue punk-rock qui vieillit incroyablement bien sur un public de fin de festival. Le créneau, c'est aussi le clash le plus douloureux du week-end — A Perfect Circle, Behemoth et d'autres se battent pour la même heure." },
                      { stop: "Sous les têtes d'affiche", desc: "183 artistes sur 6 scènes, dont 85 au Hellfest pour la première fois. Noms à garder dans le radar : A Perfect Circle, Breaking Benjamin, Volbeat, Behemoth, Cult of Luna, Amenra, Igorrr, Kadavar, Ultra Vomit. Partagez la grille complète tôt dans le groupe — les clashs sont permanents, et la décision de zapper la tête d'affiche pour un créneau Altar est la plus clivante de tout week-end festival." },
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

        {/* ━━━ TICKETS & RESALE ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Tickets & Official Resale" : "Billetterie & Revente Officielle"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Sold out everywhere — and the only path forward is one verified resale platform. Everything else is a counterfeit risk."
                : "Sold out partout — et le seul chemin restant, c'est une seule plateforme de revente vérifiée. Tout le reste est un risque de faux billet."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 1" : "Canal 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Official resale" : "Revente officielle"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "tickets.hellfest.fr is the only legitimate channel. Listings appear when other fans cancel — sometimes daily, sometimes only the week of. Check several times a day and have payment ready, listings disappear in minutes." : "tickets.hellfest.fr, c'est le seul canal légitime. Des annonces apparaissent quand des festivaliers annulent — parfois chaque jour, parfois seulement la semaine du festival. Refresh plusieurs fois par jour, paiement prêt, les billets partent en minutes."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 2" : "Canal 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Daily passes (sold out)" : "Pass jour (sold out)"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Single-day passes also sold out for 2026. They reappear sporadically on the official resale alongside the 4-day passes. If only one of you needs a single day, it's actually easier to find than a full pass." : "Les pass 1 jour aussi sont sold out pour 2026. Ils réapparaissent ponctuellement sur la revente officielle aux côtés des pass 4 jours. Si une seule personne du groupe a besoin d'une seule journée, c'est en pratique plus facile à trouver qu'un pass complet."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "What to avoid" : "À éviter"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Unofficial resale" : "Revente parallèle"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Telegram groups, Facebook marketplace, Vinted, Leboncoin: counterfeit tickets are widely reported and won't pass the gate scan. The wristband is nominative — you can't legally transfer outside the official channel." : "Groupes Telegram, Marketplace Facebook, Vinted, Leboncoin : les faux billets sont massivement signalés et ne passent pas le scan d'entrée. Le bracelet est nominatif — vous ne pouvez pas transférer légalement en dehors du canal officiel."}
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
                {isEn ? "Getting to Clisson" : "Rejoindre Clisson"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "TGV to Nantes, TER to Clisson — the rail route is faster and cheaper than driving for almost every European starting point. The €5 'Live' ticket inside the region is the best deal in the entire trip."
                  : "TGV jusqu'à Nantes, TER jusqu'à Clisson — l'itinéraire ferroviaire est plus rapide et moins cher que la voiture pour presque tous les points de départ européens. Le billet 'Live' à 5 € dans la région est la meilleure affaire de tout le voyage."}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "From Paris" : "Depuis Paris"}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris → Nantes → Clisson</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ TGV INOUI or Ouigo from Paris-Montparnasse" : "→ TGV INOUI ou Ouigo depuis Paris-Montparnasse"}</li>
                    <li>{isEn ? "→ 2h00 to 2h26 to Nantes" : "→ 2h00 à 2h26 jusqu'à Nantes"}</li>
                    <li>{isEn ? "→ From ~€16 (Ouigo, booked early) to €40-90 last-minute" : "→ À partir de ~16 € (Ouigo réservé tôt) à 40-90 € de dernière minute"}</li>
                    <li>{isEn ? "→ TER Nantes–Clisson: hourly, 16-30 min, €5 with the 'Live' ticket" : "→ TER Nantes-Clisson : toutes les heures, 16-30 min, 5 € avec le billet 'Live'"}</li>
                    <li>{isEn ? "→ Clisson station to site: 20 min walk or short paid shuttle" : "→ Gare de Clisson au site : 20 min à pied ou navette payante"}</li>
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "From Lille, Brussels, by car or by plane" : "Depuis Lille, Bruxelles, en voiture ou en avion"}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "Other routes" : "Autres routes"}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Lille → Nantes direct TGV in ~4h, from ~€37" : "→ Lille → Nantes TGV direct en ~4h, à partir de ~37 €"}</li>
                    <li>{isEn ? "→ Brussels → Nantes one direct TGV/day, ~4h47, from ~€20" : "→ Bruxelles → Nantes un TGV direct/jour, ~4h47, à partir de ~20 €"}</li>
                    <li>{isEn ? "→ Car: free East/West parkings with free shuttles to the site" : "→ Voiture : parkings gratuits Est/Ouest avec navettes gratuites vers le site"}</li>
                    <li>{isEn ? "→ Airport: Nantes-Atlantique (NTE), festival shuttle available from the airport" : "→ Avion : Nantes-Atlantique (NTE), navette festival depuis l'aéroport"}</li>
                    <li>{isEn ? "→ Driving from Paris: ~4h30 without traffic, more on Wednesday and Sunday" : "→ Voiture depuis Paris : ~4h30 sans bouchon, plus le mercredi et le dimanche"}</li>
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
              {isEn ? "Where to Sleep" : "Où Dormir"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three honest options. Camping is the experience; Nantes apartments are the budget play; premium Easy Camp is gone for 2026."
                : "Trois options honnêtes. Le camping, c'est l'expérience ; l'appartement à Nantes, c'est le bon plan budget ; l'Easy Camp premium est parti pour 2026."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 1" : "Option 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Classic camping" : "Camping classique"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Included in the 4-day pass. Basic, loud, communal — the actual heart of the Hellfest experience. Bring earplugs if you ever want to sleep before 4am. Pack a tent that survives wind, not just sun." : "Inclus dans le pass 4 jours. Basique, bruyant, communautaire — le cœur réel de l'expérience Hellfest. Prévoyez des bouchons d'oreilles si vous comptez dormir avant 4h. Choisissez une tente qui tient le vent, pas seulement le soleil."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 2" : "Option 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Nantes apartment" : "Appartement à Nantes"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "30 km away, 30-45 min by TER or car. A 3-4 bedroom apartment split between 4-6 friends typically beats hotel rooms by 30-50%. Trade-off: you lose the camping vibe but gain showers, a real bed and a way to recover." : "À 30 km, 30-45 min en TER ou en voiture. Un appartement 3-4 chambres partagé à 4-6 bat souvent les chambres d'hôtel de 30-50 %. Trade-off : on perd l'ambiance camping mais on gagne douche, vrai lit et capacité de récupération."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 3" : "Option 3"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Nantes hotels" : "Hôtels à Nantes"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Average around €130-180/night on festival weekend, 20-60% above normal rates. Book early near a tram line to the station — the morning TER to Clisson fills up fast and you don't want a 6am taxi battle." : "Autour de 130-180 €/nuit sur le week-end festival, +20 à 60 % par rapport au tarif normal. Réservez tôt près d'une ligne de tram menant à la gare — le TER du matin pour Clisson se remplit vite et personne ne veut se battre pour un taxi à 6h."}
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
                  {isEn ? "Decided where to sleep?" : "Tu sais où vous dormez ?"}
                </p>
                <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base">
                  {isEn ? "Lock the apartment, the TGV split and the cashless float in one shared plan." : "Verrouille l'appart, la répartition TGV et le float cashless dans un plan partagé."}
                </p>
              </div>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=hellfest-2026&template=hellfest-2026&placement=mid-sleep`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {isEn ? "Start the plan" : "Lance le plan"}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CASHLESS & PRACTICALITIES ━━━ */}
        <FadeIn>
          <section id="cashless" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Cashless & On-Site Practicalities" : "Cashless & Pratique sur Site"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "The site is 100% cashless via the festival wristband. Plan the float in advance — the on-site top-up queues will eat your Iron Maiden time."
                  : "Le site est 100 % cashless via le bracelet. Anticipez le float — les files de recharge sur place mangeront votre créneau Iron Maiden."}
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "How the wristband works" : "Comment marche le bracelet"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "First activation costs €1.50. Top up online at cashless.hellfest.fr or via the Hellfest app — no fee on subsequent top-ups. Cash is accepted only at on-site cashless banks, never at bars or food stands. Unspent balance is refundable through the official portal within the post-festival window."
                      : "Première activation à 1,50 €. Rechargez en ligne sur cashless.hellfest.fr ou via l'app Hellfest — pas de frais sur les rechargements suivants. Le cash n'est accepté qu'aux banques cashless sur site, jamais aux bars ni aux stands de bouffe. Le solde non utilisé est remboursable via le portail officiel dans la fenêtre annoncée après le festival."}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "What slows everyone down" : "Ce qui ralentit tout le monde"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "Phone charging stations cap at 30 minutes and the queues are constant — bring a 20,000mAh power bank per group, charged twice. ATMs are scarce (Hell City Square and Clisson supermarket only) and slow. Mobile network saturates with 60k+ attendees: agree on a meeting point per stage in advance because group chats will not deliver in real time."
                      : "Les stations de charge téléphone sont plafonnées à 30 minutes, files permanentes — prévoyez une batterie externe 20 000 mAh par groupe, chargée deux fois. Les DAB sont rares (uniquement Hell City Square et le supermarché de Clisson) et lents. Le réseau mobile sature avec 60 000 personnes : convenez d'un point de rendez-vous par scène à l'avance, les messages de groupe ne passent pas en temps réel."}
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
                ? <>The four-day festival rhythm makes group coordination harder than a weekend city break. People arrive on different days, leave at different times, and some lose their phone by Saturday. The crew aligns when the schedule, the budget and the meeting points live in one shared place. Run a quick <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early to lock who is camping vs hotel-ing, who lands when, and who is taking the rental car. The poll is the smallest piece of work that prevents 80% of the festival arguments.</>
                : <>Le rythme quatre jours rend la coordination de groupe bien plus dure qu&apos;un city break de week-end. Tout le monde arrive à des jours différents, repart à des heures différentes, et certains ont perdu leur téléphone le samedi. La bande s&apos;aligne quand la grille, le budget et les points de rendez-vous vivent au même endroit partagé. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt pour caler qui campe vs qui prend l&apos;hôtel, qui arrive quand, qui prend la voiture. Le sondage, c&apos;est le plus petit travail qui évite 80 % des engueulades du festival.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The four-day <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is where the band clashes live. Pin the must-sees (Iron Maiden Friday night, Limp Bizkit Saturday) and let the group fork on the others — nobody should feel guilty for ducking out of the headliner to catch Cult of Luna at the Altar. The same itinerary doubles as the meeting-point map: stage entrance, food stall, camping pole.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> sur les quatre jours, c&apos;est là que vivent les clashs entre groupes. Épinglez les indispensables (Iron Maiden vendredi soir, Limp Bizkit samedi) et laissez le groupe se diviser sur le reste — personne ne doit culpabiliser de zapper la tête d&apos;affiche pour aller voir Cult of Luna à l&apos;Altar. Le même itinéraire fait office de carte des points de rendez-vous : entrée de scène, stand bouffe, mât du camping.</>}
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
                  ? <>Resale tickets are bought individually and stay individual — keep them out of the shared pool entirely. The shared pool is for TGV, accommodation, rental car, restaurants in Nantes before and after, and the on-site cashless float. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and add an explicit &apos;cashless float&apos; line so the beer rounds and merch don&apos;t disappear into a generic &apos;misc&apos; column.</>
                  : <>Les billets de revente sont achetés individuellement et restent individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour le TGV, l&apos;hébergement, la voiture de location, les restos à Nantes avant et après, et le float cashless sur place. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et ajoutez une ligne explicite « float cashless » pour que les tournées de bière et le merch ne se perdent pas dans une colonne « divers ».</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "TGV prices have already moved. Paris–Nantes Ouigo at €16 in winter now sits around €40-70 on the Wed/Thu departures and €60-90 on the Sun/Mon returns. Two saves to know: very early morning departures (06:30-07:30) are still the cheapest slot, and booking the full crew on the same train shaves both cost and stress at arrival in Nantes."
                  : "Les prix du TGV ont déjà bougé. Le Paris-Nantes Ouigo à 16 € en hiver tourne maintenant autour de 40-70 € sur les départs mer/jeu et 60-90 € sur les retours dim/lun. Deux astuces : les départs très matinaux (6h30-7h30) restent le créneau le moins cher, et réserver toute la bande sur le même train fait économiser à la fois en argent et en stress à l'arrivée à Nantes."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "On-site cashless is the silent budget killer. Beer rounds, food, merch — a typical Hellfest weekend ends around €150-200 per person on the wristband even on a moderate run. Top up €50 less than you think you need on day one: an extra reload mid-festival takes 10 minutes, but a €200 surprise refund six weeks later is just lost money during the weekend."
                  : "Le cashless sur place, c'est le tueur silencieux du budget. Tournées, bouffe, merch — un week-end Hellfest moyen sort à 150-200 € par personne sur le bracelet même sur un rythme tranquille. Rechargez 50 € de moins que ce que vous estimez nécessaire le premier jour : un rechargement à mi-parcours prend 10 minutes, mais une surprise de 200 € de remboursement six semaines plus tard, c'est juste de l'argent perdu pendant le week-end."}
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
              <Link href={`/${locale}/champions-league-final-2026-psg-arsenal`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Champions League Final" : "Finale Ligue des Champions"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "PSG vs Arsenal in Budapest, the complete guide." : "PSG vs Arsenal à Budapest, le guide complet."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/world-cup-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "World Cup 2026 Trip Planner" : "Planificateur Coupe du Monde 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Follow your team across the USA, Canada and Mexico." : "Suivez votre équipe à travers USA, Canada et Mexique."}</p>
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
                {isEn ? "Build Your Hellfest Trip" : "Construisez Votre Voyage Hellfest"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "TGV, apartment, cashless float, four-day schedule, shared budget — one plan, your whole crew on the same page." : "TGV, appartement, float cashless, grille des quatre jours, budget partagé — un seul plan, toute votre bande alignée."}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=hellfest-2026&template=hellfest-2026`}>
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Set up the cashless float + TGV split" : "Cale le float cashless + TGV"}</PulsatingButton>
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
