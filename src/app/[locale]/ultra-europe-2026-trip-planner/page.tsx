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
const PATHNAME = "/ultra-europe-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Ultra Europe 2026: Trip Planner — Split, Flights, Tickets"
    : "Ultra Europe 2026 : Voyage Split — Billets, Vols, Hôtels";
  const description = isEn
    ? "Everything for Ultra Europe 2026 (10–12 July, Split, Croatia): tickets and Destination Ultra packages, direct flights from Paris, where to stay, the Hvar/Brač/Vis island week, and shared group budget."
    : "Tout sur Ultra Europe 2026 (10-12 juillet, Split, Croatie) : billets et packages Destination Ultra, vols directs depuis Paris, où dormir, la semaine d'island hopping Hvar/Brač/Vis, et budget partagé entre potes.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/ultra-europe-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function UltraEurope2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "Ultra Europe 2026 Trip Planner" : "Voyage Ultra Europe 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Ultra Europe 2026: Trip Planner for Split, Croatia" : "Ultra Europe 2026 : Voyage à Split, Croatie",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-13", dateModified: "2026-05-13",
    image: [`${SITE_URL}/events/ultra-europe-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const musicEventLd = {
    "@context": "https://schema.org",
    "@type": "MusicFestival",
    name: "Ultra Europe 2026",
    description: isEn
      ? "Ultra Europe 2026, the three-day electronic music festival at Stadion Park Mladeži in Split, Croatia, from 10 to 12 July 2026. Four stages, ~55,000 fans per day, headlined by Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer and Steve Aoki."
      : "Ultra Europe 2026, le festival électronique trois jours au Stadion Park Mladeži à Split, Croatie, du 10 au 12 juillet 2026. Quatre scènes, ~55 000 personnes par jour, têtes d'affiche Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer et Steve Aoki.",
    image: [`${SITE_URL}/events/ultra-europe-2026.png`],
    startDate: "2026-07-10",
    endDate: "2026-07-12",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: { "@type": "Organization", name: "Ultra Worldwide", url: "https://ultraeurope.com" },
    offers: {
      "@type": "Offer",
      url: "https://ultraeurope.com/tickets/festival/",
      availability: "https://schema.org/InStock",
      price: "149",
      priceCurrency: "EUR",
      validFrom: "2026-03-14",
    },
    location: {
      "@type": "Place",
      name: "Stadion Park Mladeži",
      address: { "@type": "PostalAddress", addressLocality: "Split", addressCountry: "HR" },
    },
  };

  const faqItems = isEn
    ? [
        { q: "When and where is Ultra Europe 2026?", a: "Friday 10 to Sunday 12 July 2026 at Stadion Park Mladeži in Split, Croatia. The festival site holds around 55,000 fans per day on a build-out of the Brodarica stadium, with four stages: Main Stage, RESISTANCE, Arcadia Afterburner and UMF Radio. Gates open Friday at 19:00 and Saturday/Sunday at 20:00, with shows running until 05:00 each night." },
        { q: "What is the price of an Ultra Europe 2026 ticket?", a: "Official 2026 pricing via the LIVE IT platform: 1-Day General Admission Fan Pit at €149, 1-Day VIP Premium at €199, 3-Day VIP Premium at €449, 1-Day VIP ULTRA at €249, and the 7-Day General Admission Destination Ultra pass (covering the festival plus the island parties on Brač, Hvar and Vis) at €369. The 7-day VIP tier sits at €669. The official 7-Day Cruise Package — Tier 1 sold out at €2,499 — is now at €2,999 for Tier 2. Buy through ultraeurope.com only; secondary listings on Telegram or Vinted carry refusal risk at the gate." },
        { q: "What is the Destination Ultra week?", a: "Destination Ultra is Ultra Europe's signature week of side events around the main festival. The format (from prior editions): a Day 1 opening party in Split, three festival nights at Park Mladeži (Days 2-4), a Yacht Regatta to Zlatni Rat beach on Brač (Day 5), Ultra Beach at the Amfora resort in Hvar (Day 6, ~5,000 capacity), and a RESISTANCE closing party on the island of Vis (Day 7). The exact 2026 calendar around 7-13 July is unconfirmed at the time of writing — check the official site before booking ferries." },
        { q: "How do I get to Split from Paris?", a: "Direct flights from Paris CDG to Split (SPU) take about 2h05, operated by Croatia Airlines, easyJet and Air France with around seven weekly departures in summer. Advance fares start €40-80; closer to the festival expect €150-300. Paris-Orly also runs seasonal direct services. The drive is ~1,500 km / 15h via Milan-Trieste-Rijeka and only makes sense if you plan a longer road trip down the Dalmatian coast. The train route via Munich and Zagreb is over 24 hours — not realistic." },
        { q: "Where should I stay in Split?", a: "Three useful zones. Diocletian's Palace and the old town centre, walkable to everything (boutique hotels and apartments, premium pricing in July). Bačvice beach area, ~10 minutes' walk from the old town, ~14% above city average — the natural base for festival nights. And the residential streets between the centre and Park Mladeži (the festival venue), ~2 km on foot. Split city averages around €110-120/night in July; 4-star starts ~€250+, 5-star €900+. Many hotels filled 6+ months ago — apartment rentals split between 4-6 friends typically beat hotel rooms by 30-50%." },
        { q: "How does the Aircash cashless system work?", a: "Ultra Europe uses Aircash wristbands as the primary on-site payment. Top up the wristband via the Aircash app or with a card before arrival to skip on-site queues. Main payment booths also accept cards. Cash is not accepted inside the festival site. Top up less than you think you need on day one — extra reloads mid-festival are quick, but unspent refunds run on a manual claim window after the festival." },
        { q: "How do you organise an Ultra Europe trip with a group of friends?", a: "Tickets and packages are individual — keep them out of the shared pool. The shared pool is for the Paris-Split flight, accommodation in Split, ferry tickets if you extend to the islands, taxis to and from Park Mladeži, restaurants in the old town, and the on-site Aircash float. Set categories from day one so the math doesn't collapse on the way home. WePlanify keeps each category clean across the festival days and the optional island week, and rotates who fronts each expense." },
      ]
    : [
        { q: "Quand et où se tient Ultra Europe 2026 ?", a: "Du vendredi 10 au dimanche 12 juillet 2026 au Stadion Park Mladeži à Split, en Croatie. Le site accueille environ 55 000 personnes par jour sur une extension du stade de Brodarica, avec quatre scènes : Main Stage, RESISTANCE, Arcadia Afterburner et UMF Radio. Ouverture des portes vendredi à 19h, samedi/dimanche à 20h, sets jusqu'à 5h du matin." },
        { q: "Quel est le prix d'un billet Ultra Europe 2026 ?", a: "Tarifs officiels 2026 via la plateforme LIVE IT : pass 1 jour General Admission Fan Pit à 149 €, pass 1 jour VIP Premium à 199 €, pass 3 jours VIP Premium à 449 €, pass 1 jour VIP ULTRA à 249 €, et pass 7 jours General Admission Destination Ultra (festival + soirées îles Brač, Hvar et Vis) à 369 €. Le tier 7 jours VIP est à 669 €. Le package officiel 7-Day Cruise — Tier 1 sold out à 2 499 € — est désormais à 2 999 € pour le Tier 2. Achetez uniquement via ultraeurope.com ; les annonces parallèles (Telegram, Vinted) sont refusées au scan." },
        { q: "C'est quoi la semaine Destination Ultra ?", a: "Destination Ultra, c'est la semaine de soirées satellites autour du festival principal. Le format (édition précédente) : soirée d'ouverture à Split le Jour 1, trois nuits de festival à Park Mladeži (Jours 2-4), Yacht Regatta vers la plage Zlatni Rat sur Brač (Jour 5), Ultra Beach au resort Amfora à Hvar (Jour 6, ~5 000 personnes), et closing RESISTANCE sur l'île de Vis (Jour 7). Le calendrier exact 2026 autour du 7-13 juillet n'est pas encore confirmé — vérifiez le site officiel avant de réserver vos ferries." },
        { q: "Comment rejoindre Split depuis Paris ?", a: "Vols directs Paris CDG → Split (SPU) en 2h05 environ, avec Croatia Airlines, easyJet et Air France — environ 7 départs par semaine en été. Tarifs avancés à partir de 40-80 €, à l'approche comptez 150-300 €. Paris-Orly assure aussi des liaisons directes saisonnières. Voiture : ~1 500 km / 15h par Milan-Trieste-Rijeka, intéressant uniquement dans le cadre d'un road trip plus long sur la côte dalmate. Le train via Munich et Zagreb dépasse 24h — pas une option viable." },
        { q: "Où dormir à Split ?", a: "Trois zones utiles. Le palais de Dioclétien et le vieux centre, à pied de tout (hôtels boutique et appartements, tarifs premium en juillet). La plage Bačvice à 10 minutes à pied du vieux centre, ~14 % au-dessus de la moyenne ville — base naturelle pour les nuits festival. Et les rues résidentielles entre le centre et Park Mladeži (lieu du festival), à 2 km à pied. Split tourne autour de 110-120 €/nuit en juillet ; les 4 étoiles démarrent à ~250 €+, les 5 étoiles à 900 €+. Beaucoup d'hôtels sont remplis depuis 6 mois — un appartement partagé à 4-6 potes bat souvent les chambres d'hôtel de 30-50 %." },
        { q: "Comment fonctionne le cashless Aircash ?", a: "Ultra Europe utilise les bracelets Aircash comme moyen de paiement principal sur site. Rechargez via l'app Aircash ou par carte avant d'arriver pour éviter les files. Les guichets principaux acceptent aussi la carte. Le cash n'est pas accepté à l'intérieur du festival. Rechargez moins que ce que vous estimez le premier jour — un rechargement à mi-parcours est rapide, mais les remboursements de solde non utilisé passent par une fenêtre manuelle après le festival." },
        { q: "Comment organiser un Ultra Europe entre potes ?", a: "Les billets et packages sont individuels — gardez-les hors du pot commun. Le pot commun, c'est pour le vol Paris-Split, l'hébergement à Split, les ferries vers les îles si vous prolongez, les taxis vers Park Mladeži, les restos du vieux centre, et le float Aircash sur place. Posez les catégories dès le départ pour ne pas finir le calcul au retour. WePlanify garde chaque catégorie au propre sur les jours festival et la semaine îles optionnelle, et fait tourner les avances dans la bande." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan an Ultra Europe 2026 trip to Split" : "Comment organiser un voyage à Ultra Europe 2026 à Split",
    description: isEn
      ? "Two months out, here is how to lock the trip: pick festival-only vs Destination Ultra week, book flights and Split accommodation before the next hike, top up Aircash, and plan the four daytime/nighttime energy curves."
      : "À deux mois, voici comment verrouiller le voyage : choisir festival seul ou semaine Destination Ultra, réserver vols et hébergement Split avant la prochaine hausse, recharger Aircash, et planifier les courbes d'énergie jour/nuit.",
    totalTime: "PT45M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Festival-only or full Destination Ultra week — poll the group" : "Festival seul ou semaine Destination Ultra complète — sondage du groupe",
        text: isEn
          ? "Three festival days vs seven days with the Brač/Hvar/Vis island parties is a very different trip in budget, logistics and stamina. Run a quick poll early so you book the right flights (Sunday return vs the following Tuesday) and the right accommodation (Split only vs Split + island hop)."
          : "Trois jours festival vs sept jours avec les soirées îles Brač/Hvar/Vis, ce sont deux voyages très différents en budget, logistique et endurance. Lancez un sondage rapide pour réserver les bons vols (retour dimanche vs mardi suivant) et le bon hébergement (Split seul vs Split + îles).",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Book Paris-Split direct flights and Split accommodation before the next hike" : "Réserver les vols directs Paris-Split et l'hébergement avant la prochaine hausse",
        text: isEn
          ? "Direct CDG-SPU runs ~2h05 with Croatia Airlines, easyJet and Air France. Advance fares were €40-80, peak summer pushes €150-300. Lock one outbound and one return for the whole crew, plus a Split apartment between the old town and Park Mladeži within walking distance of both."
          : "Le CDG-SPU direct fait ~2h05 avec Croatia Airlines, easyJet et Air France. Les tarifs avancés étaient à 40-80 €, en pleine saison ça monte à 150-300 €. Verrouillez un même aller et un même retour pour la bande, plus un appartement à Split entre le vieux centre et Park Mladeži, à pied des deux.",
        url: `${SITE_URL}/${locale}/features/itinerary`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Top up Aircash online and set a shared budget" : "Recharger Aircash en ligne et poser un budget partagé",
        text: isEn
          ? "Tickets and packages stay individual. Everything else (Paris-Split flight, Split apartment, ferries to Hvar/Brač if extending, taxis, old-town dinners, Aircash float) goes into a shared pool with categories. Top Aircash up via the app to skip the on-site queue."
          : "Les billets et packages restent individuels. Le reste (vol Paris-Split, appartement Split, ferries vers Hvar/Brač si vous prolongez, taxis, restos du vieux centre, float Aircash) va dans un pot commun avec catégories. Rechargez Aircash via l'app pour éviter la file sur place.",
        url: `${SITE_URL}/${locale}/features/budget`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Plan day vs night energy curves" : "Planifier les courbes d'énergie jour vs nuit",
        text: isEn
          ? "Ultra runs nighttime (Friday 19:00–05:00, Sat/Sun 20:00–05:00), Destination Ultra runs daytime (yacht regatta, beach parties). July in Split sits at 30°C with strong sun — block the daytime stops with shade, water and sunscreen, then nap before the festival. Share the meeting point per stage in advance; the network gets crushed when 55,000 people land at once."
          : "Ultra tourne en nocturne (vendredi 19h-5h, sam/dim 20h-5h), Destination Ultra en diurne (yacht regatta, beach parties). Split en juillet, c'est 30°C avec un soleil dur — bloquez les étapes diurnes avec ombre, eau et crème solaire, puis sieste avant le festival. Partagez le point de rendez-vous par scène à l'avance, le réseau sature quand 55 000 personnes arrivent en même temps.",
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
                { label: isEn ? "Ultra Europe 2026 Trip Planner" : "Voyage Ultra Europe 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Festival guide & trip planner · Split 2026" : "Guide du festival & planificateur · Split 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Ultra Europe 2026: Your Trip Planner to Split"
                : "Ultra Europe 2026 : Le Guide Voyage à Split"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>10 to 12 July 2026, Stadion Park Mladeži, Split, Croatia. ~55,000 fans per day on four stages, headlined by Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer and Steve Aoki. The festival is the anchor — but most fans extend it with the Destination Ultra week of island parties on Brač, Hvar and Vis. This is the complete guide to flights from Paris, where to stay in Split, the Aircash cashless float, and how to keep the crew aligned across three festival nights and the island days that follow. If you&apos;re still picking your tools, see our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Du 10 au 12 juillet 2026, Stadion Park Mladeži, Split, Croatie. ~55 000 personnes par jour sur quatre scènes, têtes d&apos;affiche Carl Cox, Eric Prydz, Hardwell, Armin van Buuren, DJ Snake, John Summit, ILLENIUM, Major Lazer et Steve Aoki. Le festival est l&apos;ancrage — mais la plupart des fans le prolongent avec la semaine Destination Ultra et ses soirées sur les îles de Brač, Hvar et Vis. Voici le guide complet : vols depuis Paris, où dormir à Split, le float cashless Aircash, et comment garder la bande alignée sur trois nuits festival et les jours îles qui suivent. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "9 min read" : "9 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=hero`}>
                <PulsatingButton className="font-karla font-bold">{isEn ? "Plan our Ultra Europe trip" : "Cadre Ultra Europe entre potes"}</PulsatingButton>
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
                src="/events/ultra-europe-2026.png"
                alt={isEn ? "Ultra Europe 2026 — friends at an infinity pool party with the EDM stage and the Croatian Adriatic in the background" : "Ultra Europe 2026 — des potes à une soirée piscine à débordement avec la scène EDM et l'Adriatique croate au fond"}
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
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{isEn ? "10–12 Jul" : "10-12 juil"}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Site" : "Site"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">Park Mladeži</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Split, HR</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Stages" : "Scènes"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">4</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "Main · RESISTANCE · Arcadia · UMF Radio" : "Main · RESISTANCE · Arcadia · UMF Radio"}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Capacity" : "Capacité"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">~55k</p>
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
                ? "Three nights of EDM in a Roman city of 200,000 people, then a week of boat parties between four Adriatic islands. Ultra Europe lands on the Croatian summer at peak heat (30°C average) and peak tourist density — Split, Hvar and Brač collectively triple in population through July. The Phase 1 lineup is the broadest in years: Carl Cox and Sasha & John Digweed for the techno purists, Eric Prydz and Boris Brejcha for the melodic side, DJ Snake and Major Lazer for the mainstream peak hours, ILLENIUM and Excision for bass, Hardwell and Armin van Buuren for the trance legacy slots, plus a Sebastian Ingrosso B2B Steve Angello slot that signals an unofficial Swedish House Mafia moment. Underneath the lineup, the trip itself is the harder problem — Paris flight at midnight, apartment in Split shared with five mates, ferry to Hvar at 7am with a hangover, last shuttle from Park Mladeži at 5:30am."
                : "Trois nuits d'EDM dans une ville romaine de 200 000 habitants, puis une semaine de soirées bateaux entre quatre îles adriatiques. Ultra Europe tombe en plein été croate à pic de chaleur (30°C de moyenne) et à pic touristique — Split, Hvar et Brač triplent collectivement de population en juillet. L'affiche Phase 1 est la plus large depuis des années : Carl Cox et Sasha & John Digweed pour les puristes techno, Eric Prydz et Boris Brejcha côté mélodique, DJ Snake et Major Lazer pour les peak hours grand public, ILLENIUM et Excision pour la bass, Hardwell et Armin van Buuren pour les créneaux trance historiques, plus un B2B Sebastian Ingrosso × Steve Angello qui sent le Swedish House Mafia officieux. En dessous de l'affiche, le voyage en lui-même est le vrai sujet — vol Paris à minuit, appartement à Split partagé à six, ferry pour Hvar à 7h en gueule de bois, dernière navette de Park Mladeži à 5h30."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for fans heading to Split — flights, Split apartment, Aircash float, festival nights and the optional island week in one place, in English or French."
                : "WePlanify, c'est le poste de commandement gratuit et partagé pour les fans qui descendent à Split — vols, appartement, float Aircash, nuits festival et semaine îles optionnelle au même endroit, en français ou anglais."}
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
                { id: "tickets", label: isEn ? "Tickets, prices & Destination Ultra" : "Billets, prix & Destination Ultra" },
                { id: "getting-there", label: isEn ? "Getting to Split" : "Rejoindre Split" },
                { id: "sleeping", label: isEn ? "Where to sleep in Split" : "Où dormir à Split" },
                { id: "destination-ultra", label: isEn ? "The island week (Brač, Hvar, Vis)" : "La semaine îles (Brač, Hvar, Vis)" },
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
                  ? "Four stages, the broadest spectrum in years. The names worth flying to Split for."
                  : "Quatre scènes, le spectre le plus large depuis des années. Les noms qui valent le voyage à Split."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "The mainstage anchors", desc: "Hardwell, Armin van Buuren, DJ Snake, Steve Aoki, Major Lazer, Sebastian Ingrosso B2B Steve Angello. The peak-hour Main Stage hitters that pack the field. The Ingrosso × Angello slot is the moment everyone will be there for — unofficial Swedish House Mafia territory." },
                      { stop: "RESISTANCE techno heavyweights", desc: "Carl Cox, Eric Prydz, Sasha & John Digweed, Boris Brejcha, Adriatique, The Martinez Brothers, Miss Monique. Ultra's techno arena has become the festival's quiet headline — Cox returning, Prydz back on the Croatian circuit, Sasha & John Digweed as a heritage pairing." },
                      { stop: "Bass and dubstep", desc: "Excision, ILLENIUM, ISOXO. Heavier slots on the Arcadia Afterburner stage, the loudest of the four. ILLENIUM in particular pulls the dual-crowd that comes for both melodic and bass — the slot worth not missing if you toggle." },
                      { stop: "House and emerging names", desc: "John Summit, Marlon Hoffstadt, Vintage Culture, Eli Brown, Sara Landry's Hekate label takeover (techno), Dirty Workz label takeover (hardstyle). The early-evening curve where the day actually starts — arriving late means burning your peak on the wrong slot." },
                      { stop: "The shape of the schedule", desc: "Festival hours run Friday 19:00 to 05:00, Saturday and Sunday 20:00 to 05:00. The four stages overlap heavily — clashes are non-stop. Share the schedule inside the group early, especially around the Cox / Prydz / Ingrosso conflict windows." },
                    ]
                  : [
                      { stop: "Les ancres Mainstage", desc: "Hardwell, Armin van Buuren, DJ Snake, Steve Aoki, Major Lazer, Sebastian Ingrosso B2B Steve Angello. Les frappes peak-hour qui remplissent la plaine. Le créneau Ingrosso × Angello, c'est le moment où tout le monde sera devant — territoire Swedish House Mafia officieux." },
                      { stop: "Les poids lourds RESISTANCE techno", desc: "Carl Cox, Eric Prydz, Sasha & John Digweed, Boris Brejcha, Adriatique, The Martinez Brothers, Miss Monique. L'arène techno d'Ultra est devenue la vraie tête d'affiche silencieuse — Cox de retour, Prydz à nouveau sur le circuit croate, Sasha & John Digweed en duo patrimoine." },
                      { stop: "Bass et dubstep", desc: "Excision, ILLENIUM, ISOXO. Créneaux plus lourds sur la scène Arcadia Afterburner, la plus forte des quatre. ILLENIUM en particulier attire le double public mélodique/bass — le créneau à ne pas rater si vous switchez." },
                      { stop: "House et émergents", desc: "John Summit, Marlon Hoffstadt, Vintage Culture, Eli Brown, takeover du label Hekate de Sara Landry (techno), takeover Dirty Workz (hardstyle). La courbe début de soirée où la journée commence vraiment — arriver tard, c'est brûler son pic sur le mauvais créneau." },
                      { stop: "La forme du planning", desc: "Horaires festival : vendredi 19h-5h, samedi et dimanche 20h-5h. Les quatre scènes se chevauchent fortement — les clashs sont non-stop. Partagez la grille tôt dans le groupe, surtout autour des conflits Cox / Prydz / Ingrosso." },
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

        {/* ━━━ TICKETS & PRICES ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Tickets, Prices & Destination Ultra" : "Billets, Prix & Destination Ultra"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three tiers, two formats — festival weekend or the full island week. The Cruise Tier 1 is gone, the rest is still bookable on the official portal."
                : "Trois niveaux, deux formats — week-end festival seul ou semaine îles complète. Le Cruise Tier 1 est parti, le reste est toujours réservable sur le portail officiel."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Festival weekend" : "Week-end festival"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "1- and 3-day passes" : "Pass 1 et 3 jours"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "1-Day GA Fan Pit at €149, 1-Day VIP Premium at €199, 3-Day VIP Premium at €449, 1-Day VIP ULTRA at €249. Buy on ultraeurope.com only — secondary listings are routinely refused at the gate scan." : "Pass 1 jour GA Fan Pit à 149 €, 1 jour VIP Premium à 199 €, 3 jours VIP Premium à 449 €, 1 jour VIP ULTRA à 249 €. Achetez uniquement sur ultraeurope.com — la revente parallèle est régulièrement refusée au scan."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Destination Ultra" : "Destination Ultra"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "7-day island pass" : "Pass 7 jours îles"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "€369 General Admission, €669 VIP. Covers the festival plus the side events: Brač yacht regatta, Ultra Beach at the Amfora resort on Hvar (~5,000 cap), and the RESISTANCE closing party on the island of Vis. Best value for fans coming from Paris if you can afford the extra days." : "369 € General Admission, 669 € VIP. Couvre le festival plus les soirées satellites : yacht regatta à Brač, Ultra Beach au resort Amfora à Hvar (~5 000 places), et closing RESISTANCE sur l'île de Vis. Meilleur rapport pour les fans de Paris qui peuvent tenir les jours supplémentaires."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Cruise package" : "Package croisière"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "7-day cruise (Tier 1 sold out)" : "Croisière 7 jours (Tier 1 sold out)"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Tier 1 at €2,499 sold out. Tier 2 at €2,999 still available, all-inclusive: cabin, festival pass, all the island events, transfers. The premium choice if you want zero logistics — but it kills the budget by half." : "Tier 1 à 2 499 € sold out. Tier 2 à 2 999 € encore disponible, tout inclus : cabine, pass festival, toutes les soirées îles, transferts. Le choix premium pour zéro logistique — mais ça mange la moitié du budget."}
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
                {isEn ? "Getting to Split" : "Rejoindre Split"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "Direct flight from Paris is the only sensible option. Train and car are not realistic. Croatia has been in Schengen and the eurozone since January 2023, so no border or currency friction from the EU."
                  : "Le vol direct depuis Paris est la seule option raisonnable. Train et voiture ne sont pas viables. La Croatie est dans Schengen et la zone euro depuis janvier 2023, donc aucune friction frontalière ni de devise depuis l'UE."}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "From Paris" : "Depuis Paris"}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris → Split (SPU)</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Direct flight CDG → SPU in ~2h05" : "→ Vol direct CDG → SPU en ~2h05"}</li>
                    <li>{isEn ? "→ Croatia Airlines, easyJet, Air France" : "→ Croatia Airlines, easyJet, Air France"}</li>
                    <li>{isEn ? "→ ~7 weekly departures in summer" : "→ ~7 vols hebdomadaires en été"}</li>
                    <li>{isEn ? "→ Advance fares €40-80, peak summer €150-300" : "→ Tarifs avancés 40-80 €, à l'approche 150-300 €"}</li>
                    <li>{isEn ? "→ Paris-Orly also runs seasonal direct services" : "→ Paris-Orly assure aussi des liaisons saisonnières directes"}</li>
                    <li>{isEn ? "→ SPU to Split centre: ~25 km, ~30 min by taxi or shuttle" : "→ SPU au centre de Split : ~25 km, ~30 min en taxi ou navette"}</li>
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Other routes & visa" : "Autres routes & visa"}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "What you need to know" : "Ce qu'il faut savoir"}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Train Paris → Split: 24h+ via Munich/Vienna/Zagreb — not realistic" : "→ Train Paris → Split : 24h+ via Munich/Vienne/Zagreb — pas viable"}</li>
                    <li>{isEn ? "→ Drive: ~1,500 km / ~15h via Milan-Trieste-Rijeka — only for a longer Dalmatian road trip" : "→ Voiture : ~1 500 km / ~15h par Milan-Trieste-Rijeka — uniquement pour un road trip dalmate plus long"}</li>
                    <li>{isEn ? "→ Schengen since 1 January 2023: no border check from the EU" : "→ Schengen depuis le 1er janvier 2023 : pas de contrôle frontalier depuis l'UE"}</li>
                    <li>{isEn ? "→ Euro since 1 January 2023: no currency exchange" : "→ Euro depuis le 1er janvier 2023 : aucune conversion devise"}</li>
                    <li>{isEn ? "→ UK / US: visa-free Schengen short stay (90/180)" : "→ Royaume-Uni / États-Unis : Schengen sans visa pour court séjour (90/180)"}</li>
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
              {isEn ? "Where to Sleep in Split" : "Où Dormir à Split"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three useful zones, all walkable to either the old town or the festival site. Many hotels filled six months ago — the apartment route is now the smarter call."
                : "Trois zones utiles, toutes à pied du vieux centre ou du site festival. Beaucoup d'hôtels sont remplis depuis six mois — l'option appartement est désormais le meilleur choix."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Zone 1" : "Zone 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Diocletian's Palace & old town" : "Palais de Dioclétien & vieux centre"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Walkable to everything (restaurants, bars, ferry port), the most atmospheric base. Boutique hotels and apartments, premium pricing in July. ~2 km on foot or 5 min taxi to Park Mladeži." : "À pied de tout (restos, bars, port ferry), la base la plus atmosphérique. Hôtels boutique et appartements, tarifs premium en juillet. ~2 km à pied ou 5 min en taxi de Park Mladeži."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Zone 2" : "Zone 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Bačvice beach" : "Plage Bačvice"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "10 min walk from the old town, ~14% above Split city average. The natural base for festival nights — sea five minutes from the apartment, beach bars open late, on the route to Park Mladeži." : "10 min à pied du vieux centre, ~14 % au-dessus de la moyenne ville. Base naturelle pour les nuits festival — mer à 5 minutes, beach bars ouverts tard, sur la route de Park Mladeži."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Zone 3" : "Zone 3"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Apartment between centre and Park Mladeži" : "Appartement entre centre et Park Mladeži"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Residential streets ~2 km from the centre, walkable to both directions. A 3-4 bedroom apartment split between 4-6 friends typically beats hotel rooms by 30-50% in July, and you save the post-festival taxi war at 5am." : "Rues résidentielles à ~2 km du centre, à pied dans les deux directions. Un appartement 3-4 chambres partagé à 4-6 bat les chambres d'hôtel de 30-50 % en juillet, et vous économisez la bataille taxi post-festival à 5h."}
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
                  {isEn ? "Festival only or full island week?" : "Festival seul ou semaine îles complète ?"}
                </p>
                <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base">
                  {isEn ? "Run the poll, lock the Paris-Split flight and the Aircash float in one shared plan." : "Lance le sondage, verrouille le vol Paris-Split et le float Aircash dans un plan partagé."}
                </p>
              </div>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=mid-sleep`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {isEn ? "Start the plan" : "Lance le plan"}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ DESTINATION ULTRA ━━━ */}
        <FadeIn>
          <section id="destination-ultra" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "The Island Week — Brač, Hvar, Vis" : "La Semaine Îles — Brač, Hvar, Vis"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "What separates Ultra Europe from every other festival on the calendar: the week of boat parties on the Adriatic that wraps around the main weekend."
                  : "Ce qui distingue Ultra Europe de tous les autres festivals : la semaine de soirées bateau sur l'Adriatique qui enveloppe le week-end principal."}
              </p>

              <div className="space-y-6">
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Day 5 — Yacht Regatta on Brač" : "Jour 5 — Yacht Regatta à Brač"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "Boat departures from Split harbour to Zlatni Rat beach on Brač — one of the most photographed beaches in the Mediterranean. Daytime, full sun, swim breaks between sets. Ferry alternatives: Jadrolinija and Krilo run Split → Bol (Brač) several times a day, book in advance during Ultra week."
                      : "Départs bateau du port de Split vers la plage Zlatni Rat sur Brač — l'une des plages les plus photographiées de la Méditerranée. En journée, plein soleil, pauses baignade entre les sets. Alternatives ferry : Jadrolinija et Krilo assurent Split → Bol (Brač) plusieurs fois par jour, à réserver à l'avance pendant la semaine Ultra."}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Day 6 — Ultra Beach at Amfora, Hvar" : "Jour 6 — Ultra Beach à Amfora, Hvar"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "The flagship side event. Ultra Beach takes over the Amfora Grand Beach Resort pool on Hvar with a ~5,000 capacity poolside crowd. Daytime party rolling into sunset. Hvar town itself is a 10 min walk from the resort — book accommodation there or stay on the boat for the trip back."
                      : "Le side event phare. Ultra Beach prend possession de la piscine du resort Amfora Grand Beach sur Hvar pour une jauge ~5 000 places en poolside. Soirée en journée qui s'étire jusqu'au coucher de soleil. La ville de Hvar est à 10 min à pied du resort — réservez sur place ou restez sur le bateau pour le retour."}
                  </p>
                </div>
                <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                  <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Day 7 — RESISTANCE Closing on Vis" : "Jour 7 — Closing RESISTANCE sur Vis"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                    {isEn
                      ? "The most remote and intimate stop. Vis is the furthest of the four islands from Split — quieter, less developed, the techno-only closing party that wraps the week. Ferry once or twice a day, book very early. The Tier 2 Cruise package handles all transfers automatically."
                      : "L'étape la plus reculée et la plus intimiste. Vis est la plus éloignée des quatre îles depuis Split — plus calme, moins développée, la soirée techno-only qui clôt la semaine. Ferry une à deux fois par jour, réservation très en amont. Le package Tier 2 Cruise gère tous les transferts automatiquement."}
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
                ? <>The festival-only vs full-week question splits more groups than the lineup itself. Three nights of EDM in Split is a 4-day trip; the full Destination Ultra week is an 8-day commitment with island ferries, different accommodation, and roughly double the budget. Run a quick <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early — get a count of who is on the 3-day pass vs the 7-day pass before any flight is booked. The poll is the smallest piece of work that prevents 80% of the trip arguments.</>
                : <>La question festival seul vs semaine complète divise plus les groupes que l&apos;affiche elle-même. Trois nuits d&apos;EDM à Split, c&apos;est un voyage de 4 jours ; la semaine Destination Ultra complète, c&apos;est 8 jours avec ferries vers les îles, hébergement différent, et environ le double de budget. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt — comptez qui est sur le pass 3 jours vs 7 jours avant de réserver le moindre vol. Le sondage, c&apos;est le plus petit travail qui évite 80 % des engueulades du voyage.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is where day-vs-night logic lives. Ultra is nocturnal (19:00-05:00), Destination Ultra side events are diurnal — back-to-back days at 30°C burn through stamina. Block daytime stops with sleep, water and a designated meeting point per stage. The mobile network at Park Mladeži crashes when 55,000 people land at once; the itinerary doubles as the offline coordination layer.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link>, c&apos;est là que vit la logique jour vs nuit. Ultra est nocturne (19h-5h), les side events Destination Ultra sont diurnes — des journées enchaînées à 30°C cassent vite l&apos;endurance. Bloquez les étapes diurnes avec sieste, eau et un point de rendez-vous par scène. Le réseau mobile à Park Mladeži s&apos;effondre quand 55 000 personnes arrivent en même temps ; l&apos;itinéraire devient la couche de coordination offline.</>}
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
                  ? <>Tickets, VIP tiers and Cruise packages are individual — keep them out of the shared pool. The shared pool is for the Paris-Split flight, the Split apartment, the ferries to Hvar/Brač/Vis if you extend, taxis to Park Mladeži, restaurants in the old town, and the on-site Aircash float. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and add a dedicated &apos;Aircash float&apos; line so bar rounds and food don&apos;t disappear into a generic &apos;misc&apos; column.</>
                  : <>Les billets, VIP et packages Cruise sont individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour le vol Paris-Split, l&apos;appartement, les ferries vers Hvar/Brač/Vis si vous prolongez, les taxis vers Park Mladeži, les restos du vieux centre, et le float Aircash sur place. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et ajoutez une ligne « float Aircash » dédiée pour que les tournées et la bouffe ne se perdent pas dans une colonne « divers ».</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Flight prices have already moved. CDG-SPU at €40-80 in winter now sits around €120-180 for early July departures and €200-300 closer to the date. The Sunday return is the most expensive slot — a Monday or Tuesday return after the island events is often cheaper and lines up naturally with Destination Ultra."
                  : "Les prix des vols ont déjà bougé. Le CDG-SPU à 40-80 € en hiver tourne maintenant autour de 120-180 € sur les départs début juillet et 200-300 € à l'approche. Le retour du dimanche est le créneau le plus cher — un retour lundi ou mardi après les soirées îles est souvent moins cher et s'aligne naturellement avec Destination Ultra."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Accommodation in Split has roughly doubled for Ultra week vs an ordinary July weekend. A 3-4 bedroom apartment between Bačvice and Park Mladeži, split between 4-6 friends, typically beats hotel rooms by 30-50% and keeps you walking distance from both the festival and the ferry port. Many central apartments filled six months ago — widen the search to the eastern districts beyond Bačvice."
                  : "L'hébergement à Split a roughly doublé sur la semaine Ultra par rapport à un week-end de juillet ordinaire. Un appartement 3-4 chambres entre Bačvice et Park Mladeži, partagé à 4-6, bat souvent les chambres d'hôtel de 30-50 % et garde à pied du festival et du port ferry. Beaucoup d'apparts centraux sont remplis depuis six mois — élargissez la recherche aux quartiers est au-delà de Bačvice."}
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
              <Link href={`/${locale}/tomorrowland-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Tomorrowland 2026 Trip Planner" : "Voyage Tomorrowland 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Two weekends in Boom, Belgium." : "Deux week-ends à Boom, Belgique."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/hellfest-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Hellfest 2026 Trip Planner" : "Voyage Hellfest 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Four days of metal in Clisson, France." : "Quatre jours de metal à Clisson."}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{isEn ? "Read more →" : "En savoir plus →"}</span>
                </div>
              </Link>
              <Link href={`/${locale}/solar-eclipse-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Solar Eclipse 12 Aug 2026" : "Éclipse 12 août 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Spain, Iceland or cruise — the August eclipse." : "Espagne, Islande ou croisière — l'éclipse d'août."}</p>
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
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-gradient-to-br from-[#F6391A] to-[#d42d10] rounded-[24px] lg:rounded-[40px] p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
                {isEn ? "Build Your Ultra Europe Trip" : "Construisez Votre Voyage Ultra Europe"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Paris-Split flight, Split apartment, Aircash float, festival nights, optional island week — one plan, your whole crew on the same page." : "Vol Paris-Split, appartement à Split, float Aircash, nuits festival, semaine îles optionnelle — un seul plan, toute votre bande alignée."}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ultra-europe-2026&template=ultra-europe-2026&placement=bottom`}>
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Pre-fill the Aircash float + Split apartment" : "Pré-remplis le float Aircash + appart Split"}</PulsatingButton>
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
