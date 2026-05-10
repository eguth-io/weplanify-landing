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
const PATHNAME = "/champions-league-final-2026-psg-arsenal";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Champions League Final 2026: PSG vs Arsenal in Budapest — Complete Guide | WePlanify"
    : "Finale Ligue des Champions 2026 : PSG-Arsenal à Budapest — Le Guide | WePlanify";
  const description = isEn
    ? "Everything for the PSG vs Arsenal Champions League final on Saturday May 30, 2026 at the Puskás Aréna, Budapest: kickoff time, tickets, fan zones, travel, accommodation and shared budget for fans heading to Hungary."
    : "Tout sur la finale PSG-Arsenal du samedi 30 mai 2026 à la Puskás Aréna de Budapest : horaire 18h, billetterie, fan zones, voyage, hébergement et budget partagé pour partir entre potes en Hongrie.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function ChampionsLeagueFinal2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "Champions League Final 2026" : "Finale Ligue des Champions 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Champions League Final 2026: PSG vs Arsenal in Budapest — Complete Guide" : "Finale Ligue des Champions 2026 : PSG-Arsenal à Budapest — Le Guide Complet",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-10", dateModified: "2026-05-10",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const sportsEventLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: isEn ? "UEFA Champions League Final 2026: PSG vs Arsenal" : "Finale UEFA Champions League 2026 : PSG vs Arsenal",
    startDate: "2026-05-30T18:00+02:00",
    endDate: "2026-05-30T20:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Association football",
    organizer: { "@type": "Organization", name: "UEFA", url: "https://www.uefa.com" },
    location: {
      "@type": "Place",
      name: "Puskás Aréna",
      address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" },
    },
    competitor: [
      { "@type": "SportsTeam", name: "Paris Saint-Germain", url: "https://www.psg.fr" },
      { "@type": "SportsTeam", name: "Arsenal FC", url: "https://www.arsenal.com" },
    ],
  };

  const faqItems = isEn
    ? [
        { q: "When and where is the Champions League final 2026?", a: "Saturday 30 May 2026 at the Puskás Aréna in Budapest, Hungary. Kickoff is at 18:00 CET — earlier than the usual 21:00 slot, so plan your travel and viewing parties accordingly. The stadium holds around 67,000 spectators." },
        { q: "Do I need a visa to travel to Budapest for the final?", a: "Hungary has been part of the Schengen Area since 2007, so EU and EEA passport holders can travel without a visa. UK travellers do not need a visa for stays under 90 days but their passport must be valid at least 3 months past their planned departure date. US, Canadian and most other Western passport holders also benefit from visa-free entry up to 90 days. Check your passport expiry now — Hungarian border police are strict on the 3-month rule." },
        { q: "How do I get a ticket for PSG vs Arsenal?", a: "Tickets are allocated by UEFA through three channels: a public ballot (closed earlier in the spring), club allocations to PSG and Arsenal members and season ticket holders, and the UEFA Hospitality programme. With three weeks to go, the realistic options are official resale on the UEFA ticket portal, club-managed waiting lists, and verified secondary marketplaces — never buy from someone in a Telegram group. If you don't have a ticket, the Budapest fan zones and screenings in Paris and London are excellent fallbacks." },
        { q: "How do I get to Budapest from Paris or London?", a: "Direct flights from Paris (CDG, ORY, BVA) take roughly 2h15 and are operated by Air France, Wizz Air, Ryanair and Transavia. From London (LHR, LGW, LTN, STN), flights are around 2h30 with British Airways, Wizz Air, Ryanair and easyJet. Prices have already climbed sharply for the May 29-31 window — book the same day if you're still hesitating. Trains are not realistic: a Paris-Budapest rail trip with connections takes 18+ hours." },
        { q: "Where should I stay in Budapest?", a: "District V (Belváros) and District VII (the Jewish Quarter, with the famous ruin bars) are the obvious choices for fans — central, walkable, full of restaurants and bars. Hotels there have already tripled their normal rates. For better value, look at District VIII or District IX (still close to the centre, much cheaper) or take a serviced apartment with friends. The Puskás Aréna is in District XIV but well connected by metro M2 and M4." },
        { q: "How is the match televised in France and the UK?", a: "In France, the final is broadcast on Canal+ (subscribers) with a free-to-air option on M6 still being negotiated at the time of writing — check the latest schedule a few days before. In the UK, TNT Sports and discovery+ hold the rights, with a free public stream typically opened on UEFA.tv for the final only. Both broadcasters open coverage from around 17:00 CET / 16:00 UK time." },
        { q: "How do you split costs when traveling with a group of fans?", a: "Match tickets are bought individually through UEFA / club channels and stay individual. The shared pool is for flights, accommodation, ground transport, group meals and fan zone food. Set up categories from day one: hotels split by room, flights split by traveller, dinners split per meal. WePlanify keeps each category clean so the math doesn't pile up at the end of the trip." },
      ]
    : [
        { q: "Quand et où se joue la finale de la Ligue des Champions 2026 ?", a: "Samedi 30 mai 2026 à la Puskás Aréna de Budapest, en Hongrie. Coup d'envoi à 18h00 (heure de Paris) — plus tôt que l'horaire habituel de 21h, à prendre en compte pour le voyage et les soirées match. Le stade peut accueillir environ 67 000 spectateurs." },
        { q: "Faut-il un visa pour aller à Budapest ?", a: "La Hongrie est membre de l'espace Schengen depuis 2007, donc les ressortissants UE et EEE n'ont besoin d'aucun visa. Carte d'identité ou passeport en cours de validité suffisent. Pour les voyageurs hors UE (US, Canada, etc.) l'entrée est sans visa jusqu'à 90 jours, avec un passeport valide au moins 3 mois après la date de départ prévue. Vérifiez la validité de votre passeport tout de suite — la police hongroise est stricte sur cette règle." },
        { q: "Comment obtenir un billet PSG-Arsenal ?", a: "Les billets sont distribués par l'UEFA via trois canaux : tirage au sort grand public (clos au printemps), allocations clubs (PSG et Arsenal, prioritaires aux abonnés et membres) et programme Hospitalité UEFA. À trois semaines de l'événement, les options réalistes sont la revente officielle sur le portail UEFA, les listes d'attente clubs, et les marketplaces vérifiées — jamais d'achat sur Telegram ou en main propre. Sans billet, les fan zones de Budapest et les retransmissions à Paris et Londres sont d'excellents plans B." },
        { q: "Comment rejoindre Budapest depuis Paris ou Bruxelles ?", a: "Vols directs depuis Paris (CDG, ORY, BVA) en 2h15 environ avec Air France, Wizz Air, Ryanair et Transavia. Depuis Bruxelles, comptez 2h avec Brussels Airlines, Wizz Air et Ryanair. Les prix ont déjà fortement grimpé sur la fenêtre 29-31 mai — réservez le jour même si vous hésitez encore. Le train n'est pas une option viable : Paris-Budapest avec correspondances dépasse 18h." },
        { q: "Où loger à Budapest pour la finale ?", a: "Le District V (Belváros, le centre historique) et le District VII (quartier juif, célèbre pour ses ruin bars) sont les choix évidents pour les fans — centraux, à pied, pleins de bars et restaurants. Les hôtels y ont déjà triplé leurs prix. Pour un meilleur rapport qualité-prix, regardez le District VIII ou IX (toujours proches, bien moins chers) ou un appartement à plusieurs entre potes. La Puskás Aréna est en District XIV, bien desservie par les métros M2 et M4." },
        { q: "Comment regarder le match en France ?", a: "La finale est diffusée sur Canal+ (abonnés). Une diffusion en clair sur M6 est habituelle pour les finales avec un club français mais reste à confirmer — vérifiez le programme TV quelques jours avant. La couverture commence vers 17h00 CET. Pour les fans à Paris ou en région, comptez aussi sur les fan zones officielles et les principaux bars sportifs (Le Maracanã, Café Oz, etc.)." },
        { q: "Comment partager les frais à plusieurs supporters ?", a: "Les billets de match sont achetés individuellement via UEFA ou les clubs et restent individuels. Le pot commun, c'est pour les vols, l'hébergement, le transport sur place, les restaurants de groupe et la fan zone. Posez les catégories dès le départ : hôtels partagés par chambre, vols par voyageur, dîners par repas. WePlanify garde chaque catégorie au propre pour éviter le marathon de calculs en fin de voyage." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a Champions League final trip to Budapest" : "Comment organiser un voyage à Budapest pour la finale de la Ligue des Champions",
    description: isEn
      ? "Twenty days out, here is how to lock the trip: ticket plan, flights, accommodation, group budget, and fan-zone backup if you don't have a seat at the Puskás."
      : "À vingt jours du coup d'envoi, voici comment verrouiller le voyage : plan billetterie, vols, hébergement, budget partagé et plan B fan zone si vous n'avez pas de place au Puskás.",
    totalTime: "PT45M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Confirm who's going and who's covering the ticket gap" : "Confirmer qui part et qui prend le risque du billet",
        text: isEn
          ? "Run a quick poll inside the group: who has a ticket, who is hunting one, who comes to Budapest regardless. The answer changes everything — flight count, room split, fan zone plan B."
          : "Lancez un sondage rapide dans le groupe : qui a un billet, qui en cherche un, qui descend à Budapest sans billet. La réponse change tout — nombre de vols, répartition des chambres, fan zone en plan B.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Book flights and hotel before the next price hike" : "Réserver vols et hôtel avant la prochaine hausse",
        text: isEn
          ? "Direct Paris–Budapest flights are still bookable but go up daily. Lock a single inbound and outbound for the whole crew, plus accommodation in District V or VII near public transport to the Puskás Aréna."
          : "Les vols directs Paris-Budapest sont encore disponibles mais grimpent chaque jour. Verrouillez un même vol aller et un même vol retour pour toute la bande, plus l'hébergement en District V ou VII proche des transports vers la Puskás Aréna.",
        url: `${SITE_URL}/${locale}/features/itinerary`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Set up a shared budget with categories" : "Mettre en place un budget partagé par catégorie",
        text: isEn
          ? "Tickets stay individual. Everything else (flights, hotels, transfers, dinners, fan zone food) goes into a shared pool with categories so you don't reconcile a chaotic spreadsheet on the way home."
          : "Les billets restent individuels. Le reste (vols, hôtels, transferts, dîners, fan zone) va dans un pot commun avec catégories pour éviter le tableur chaotique au retour.",
        url: `${SITE_URL}/${locale}/features/budget`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Plan match day hour by hour" : "Planifier le jour J heure par heure",
        text: isEn
          ? "Kickoff at 18:00 means an early arrival at the stadium (gates open ~3h before). Pre-match drinks, transport to the Puskás by metro M2/M4, security queues, post-match celebration plan — block them in the shared itinerary so nobody loses the group at the after-party."
          : "Coup d'envoi à 18h, donc arrivée tôt au stade (portes ~3h avant). Apéro d'avant-match, métro M2/M4 jusqu'à la Puskás, files de sécurité, plan de célébration post-match — bloquez tout dans l'itinéraire partagé pour ne perdre personne à l'after.",
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
                { label: isEn ? "Champions League Final 2026" : "Finale Ligue des Champions 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Match guide & trip planner · Budapest 2026" : "Guide du match & planificateur · Budapest 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Champions League Final 2026: PSG vs Arsenal in Budapest"
                : "Finale Ligue des Champions 2026 : PSG-Arsenal à Budapest"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>Saturday 30 May 2026, 18:00 CET, Puskás Aréna. PSG defending its first European crown after eliminating Bayern Munich. Arsenal in its first Champions League final since 2006 after topping the league phase with 24 points out of 24. This is the complete guide to the match, the venue, the journey to Budapest, and how to organise the trip with your crew without losing the group at the after-party. If you&apos;re still picking your tools, see our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Samedi 30 mai 2026, 18h00, Puskás Aréna. Le PSG défend son premier titre européen après avoir éliminé le Bayern Munich. Arsenal joue sa première finale de C1 depuis 2006 après avoir terminé premier de la phase de ligue avec 24 points sur 24. Voici le guide complet du match, du stade, du voyage à Budapest et de l&apos;organisation entre potes — pour ne perdre personne à l&apos;after. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "9 min read" : "9 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-10" modifiedDate="2026-05-10" />
          </div>
        </section>

        {/* ━━━ KEY FACTS BOX ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border border-[#001E13]/8 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10">
              <h2 className="text-[#001E13]/40 font-karla text-xs lg:text-sm uppercase tracking-[0.2em] mb-6">
                {isEn ? "Match facts" : "Les chiffres du match"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Date" : "Date"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{isEn ? "Sat 30 May" : "Sam. 30 mai"}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Kickoff" : "Coup d'envoi"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">18:00</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">CET / Paris</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Venue" : "Stade"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">Puskás Aréna</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Budapest, HU</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Capacity" : "Capacité"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">~67k</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "seats" : "places"}</p>
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
                ? "Two clubs that haven't shared a final before. PSG arrives as the reigning European champion, second consecutive final, with a squad that's already lifted the trophy and knows exactly what the night feels like. Arsenal arrives off a near-perfect campaign — eight league-phase wins out of eight, the only side to finish on a clean 24 points — chasing a first European Cup the club has never won. The narrative is simple: title defence vs first time. Beyond the football, the operation around it is what most fans will actually remember — the flights booked at midnight, the room shared with five mates, the fan zone in Budapest that ran out of beer at half-time, the metro back to the apartment after extra time."
                : "Deux clubs qui ne s'étaient jamais croisés en finale. Le PSG arrive en tenant du titre européen, deuxième finale consécutive, avec un effectif qui a déjà soulevé la coupe et connaît exactement la sensation. Arsenal arrive après une campagne quasi parfaite — huit victoires sur huit en phase de ligue, le seul club à terminer à 24 points sur 24 — pour aller chercher un trophée que le club n'a jamais gagné. Le scénario est simple : défense du titre contre première fois. Mais au-delà du football, ce que la plupart des fans retiendront, c'est l'opération autour : les vols réservés à minuit, la chambre partagée à cinq, la fan zone à Budapest en rupture de bière à la mi-temps, le métro retour à l'appartement après les prolongations."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for fans heading to Budapest — flights, hotel, ticket plan, budget and match-day timeline in one place, in English or French."
                : "WePlanify, c'est le poste de commandement gratuit et partagé pour les fans qui descendent à Budapest — vols, hôtel, plan billetterie, budget et timeline du jour J au même endroit, en français ou anglais."}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={isEn ? "On this page" : "Sur cette page"}
              items={[
                { id: "the-match", label: isEn ? "The match: date, kickoff, venue" : "Le match : date, horaire, stade" },
                { id: "roads-to-final", label: isEn ? "Both teams' roads to the final" : "Les parcours des deux équipes" },
                { id: "tickets", label: isEn ? "Tickets and the fan-zone backup" : "Billetterie et le plan B fan zone" },
                { id: "budapest", label: isEn ? "Budapest practical guide" : "Budapest, guide pratique" },
                { id: "planning", label: isEn ? "Planning the trip with the crew" : "Organiser le voyage entre potes" },
                { id: "budget", label: isEn ? "Budget tips" : "Astuces budget" },
                { id: "faq", label: isEn ? "Frequently asked questions" : "Questions fréquentes" },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE MATCH ━━━ */}
        <FadeIn>
          <section id="the-match" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "The Match" : "Le Match"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {isEn
                  ? "Five things every traveller and viewing-party host needs to know before the bus leaves."
                  : "Cinq choses à savoir avant le départ du bus, que vous descendiez à Budapest ou organisiez l'apéro à la maison."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "Earlier kickoff than usual", desc: "18:00 Central European Time, not the traditional 21:00 slot. That's 17:00 in London, 12:00 in New York, 09:00 on the US West Coast. Block time-zone-aware viewing parties in advance — your London cousin needs to be off work by 16:30 to make kickoff." },
                      { stop: "Puskás Aréna, Budapest", desc: "67,000-seat national stadium of Hungary, opened in 2019 on the footprint of the historic Ferenc Puskás stadium. UEFA category 4 (top tier), already hosted Europa League and Super Cup finals. Connected to Budapest centre by metro lines M2 and M4 — twenty minutes door to door from District V." },
                      { stop: "Title holder vs newcomer", desc: "PSG enters as the defending European champion, hunting a back-to-back. Arsenal hasn't reached this stage since 2006 (lost to Barcelona in Paris) and has never won the trophy. Two very different psychological setups — read the press conferences, not just the form tables." },
                      { stop: "Broadcast and free options", desc: "Canal+ holds exclusive subscriber rights in France; M6 free-to-air for the final remains the default for matches with a French finalist but should be checked the day of. In the UK, TNT Sports covers the match, with UEFA.tv historically opening a free public stream for the final only." },
                      { stop: "Match day timing", desc: "Stadium gates open 3 hours before kickoff. Plan to be in the security perimeter by 16:30 at the latest — Hungarian police runs tight stewarding for UEFA finals. Public transport to the Puskás gets saturated 2 hours before; budget for a 30-40 minute door-to-stadium total from the centre." },
                    ]
                  : [
                      { stop: "Coup d'envoi avancé", desc: "18h00 heure de Paris, pas le créneau habituel de 21h. Soit 17h à Londres, 12h à New York, 9h sur la côte ouest US. Préparez les soirées match en tenant compte des fuseaux — votre cousin londonien doit être parti du bureau à 16h30 pour avoir le coup d'envoi." },
                      { stop: "Puskás Aréna, Budapest", desc: "Stade national hongrois de 67 000 places, inauguré en 2019 sur l'emprise de l'ancien stade Ferenc Puskás. Classé UEFA catégorie 4 (la plus haute), il a déjà accueilli des finales d'Europa League et de Supercoupe. Relié au centre de Budapest par les métros M2 et M4 — vingt minutes porte à porte depuis le District V." },
                      { stop: "Tenant du titre vs prétendant", desc: "Le PSG arrive en champion d'Europe en titre, en quête d'un doublé historique. Arsenal n'avait plus atteint ce stade depuis 2006 (défaite face à Barcelone, à Paris) et n'a jamais gagné le trophée. Deux contextes psychologiques opposés — autant lire les conférences de presse que les tableaux de forme." },
                      { stop: "Diffusion et options gratuites", desc: "Canal+ détient les droits abonnés en France ; une diffusion en clair sur M6 reste l'usage habituel quand un club français est en finale, à vérifier le jour J. Au Royaume-Uni, TNT Sports diffuse, et UEFA.tv ouvre traditionnellement un flux public gratuit uniquement pour la finale." },
                      { stop: "Le timing du jour J", desc: "Les portes du stade ouvrent 3h avant le coup d'envoi. Prévoyez d'être dans le périmètre de sécurité à 16h30 au plus tard — la police hongroise encadre serré les finales UEFA. Les transports vers la Puskás saturent 2h avant ; comptez 30 à 40 minutes porte-stade depuis le centre." },
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

        {/* ━━━ ROADS TO THE FINAL ━━━ */}
        <section id="roads-to-final" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Roads to the Final" : "Les Parcours en Finale"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
              {isEn
                ? "How both clubs got to Budapest — the form lines that matter and the moments fans will replay all summer."
                : "Comment les deux clubs sont arrivés à Budapest — les courbes de forme qui comptent et les moments que les fans rejoueront tout l'été."}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* PSG card */}
              <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Title holder" : "Tenant du titre"}</p>
                <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris Saint-Germain</h3>
                <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                  <li>{isEn ? "→ Reigning European champion (2024-25)" : "→ Champion d'Europe en titre (2024-25)"}</li>
                  <li>{isEn ? "→ Second consecutive Champions League final" : "→ Deuxième finale de Ligue des Champions consécutive"}</li>
                  <li>{isEn ? "→ Eliminated Bayern Munich in the semi-finals" : "→ A éliminé le Bayern Munich en demi-finale"}</li>
                  <li>{isEn ? "→ Squad core retained from last year's winning campaign" : "→ Ossature de l'effectif vainqueur conservée"}</li>
                  <li>{isEn ? "→ Coming off a Ligue 1 title race" : "→ Au sortir d'une lutte pour le titre de Ligue 1"}</li>
                </ul>
              </div>

              {/* Arsenal card */}
              <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "First final since 2006" : "Première finale depuis 2006"}</p>
                <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">Arsenal FC</h3>
                <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                  <li>{isEn ? "→ First Champions League final since 2006" : "→ Première finale de Ligue des Champions depuis 2006"}</li>
                  <li>{isEn ? "→ Has never won the European Cup" : "→ N'a jamais gagné la coupe d'Europe"}</li>
                  <li>{isEn ? "→ Topped the league phase: 8 wins from 8, 24 points" : "→ Premier de la phase de ligue : 8 victoires sur 8, 24 points"}</li>
                  <li>{isEn ? "→ Only club with a perfect league-phase record" : "→ Seul club avec un sans-faute en phase de ligue"}</li>
                  <li>{isEn ? "→ Arrives off a deep Premier League title push" : "→ Arrive après une lutte serrée pour le titre de Premier League"}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ TICKETS & FAN ZONE ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Tickets & The Fan-Zone Backup" : "Billetterie & Le Plan B Fan Zone"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three weeks out, the realistic ticket options are narrow — and the fan-zone fallback is genuinely worth flying for."
                : "À trois semaines, les options billetterie réalistes sont limitées — et le plan B fan zone vaut vraiment le déplacement."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 1" : "Canal 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "UEFA public ballot" : "Tirage au sort UEFA"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Closed in early spring 2026. If you applied and got a ticket, the e-ticket lands in the UEFA app a few days before. No more applications possible at this point." : "Clos au début du printemps 2026. Si vous avez postulé et obtenu un billet, le e-ticket arrive dans l'app UEFA quelques jours avant. Plus de candidatures possibles à ce stade."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 2" : "Canal 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Club allocations" : "Allocations clubs"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "PSG and Arsenal each receive a club quota for season-ticket holders and members in good standing. Both clubs run their own ballots — check your account daily, allocations are still being processed." : "PSG et Arsenal reçoivent chacun un quota club, prioritaire aux abonnés et membres. Les deux clubs gèrent leur propre tirage — vérifiez votre compte chaque jour, les allocations sont encore en cours."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Channel 3" : "Canal 3"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Official resale" : "Revente officielle"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "UEFA's resale portal goes live closer to the match for tickets returned by ballot winners who can't attend. It's the only secondary channel that's safe — anything on Telegram, classifieds or street resale carries a real risk of stadium denial." : "Le portail de revente UEFA s'ouvre proche du match pour les billets retournés par les gagnants empêchés. C'est le seul canal secondaire sûr — Telegram, petites annonces et revente en main propre comportent un vrai risque de refus à l'entrée."}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-[#EEF899] rounded-[24px] p-6 lg:p-10">
              <h3 className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl mb-3">
                {isEn ? "No ticket? Budapest is still worth it." : "Pas de billet ? Budapest vaut quand même le détour."}
              </h3>
              <p className="text-[#001E13]/80 font-karla text-base lg:text-lg leading-[1.7]">
                {isEn
                  ? "UEFA traditionally sets up an official Champions Festival in Budapest with big-screen broadcasts, food and live entertainment, and the city's ruin bars and squares run unofficial fan zones that often have better atmosphere than the inside of the stadium. Flights and accommodation are the same whether you have a seat or not — the trip is the trip. Build the rest with the crew, hold the ticket spot as a bonus, not the centerpiece."
                  : "L'UEFA installe traditionnellement un Champions Festival officiel à Budapest avec écrans géants, restauration et animations, et les ruin bars et places de la ville accueillent des fan zones non officielles qui ont souvent une ambiance supérieure à l'intérieur du stade. Vols et hébergement sont les mêmes avec ou sans billet — le voyage reste le voyage. Construisez le reste avec la bande et gardez la place de match comme un bonus, pas comme le centre de gravité."}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ BUDAPEST PRACTICAL ━━━ */}
        <section id="budapest" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Budapest, Practical Guide" : "Budapest, Guide Pratique"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "What you actually need to know about the city — visas, money, transport, neighbourhoods. Hungary is in Schengen, so the trip is simpler than most fans expect."
                : "Ce qu'il faut vraiment savoir sur la ville — visa, monnaie, transports, quartiers. La Hongrie est dans Schengen, donc le voyage est plus simple qu'on ne le pense."}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-karla text-sm lg:text-base">
                <thead>
                  <tr className="border-b-2 border-[#001E13]/15">
                    <th className="py-2 pr-4 text-[#001E13] font-semibold">{isEn ? "Topic" : "Sujet"}</th>
                    <th className="py-2 text-[#001E13] font-semibold">{isEn ? "What you need to know" : "À savoir"}</th>
                  </tr>
                </thead>
                <tbody className="text-[#001E13]/75">
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Visa" : "Visa"}</td><td className="py-2">{isEn ? "Schengen — none for EU/EEA. Visa-free 90 days for UK, US, Canada (passport valid 3+ months past departure)." : "Schengen — aucun pour UE/EEE. Sans visa 90 jours pour UK, US, Canada (passeport valide 3+ mois après le départ)."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Currency" : "Monnaie"}</td><td className="py-2">{isEn ? "Hungarian forint (HUF), not euro. Euros accepted in some tourist spots at poor rates — pull HUF from an ATM in town, not at the airport." : "Forint hongrois (HUF), pas l'euro. Euros acceptés à mauvais taux dans certains lieux touristiques — retirez en HUF en ville, pas à l'aéroport."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Time zone" : "Fuseau"}</td><td className="py-2">{isEn ? "CET — same as Paris, Brussels, Amsterdam, Berlin. No jet lag for Western European fans." : "CET — identique Paris, Bruxelles, Amsterdam, Berlin. Aucun décalage pour les fans d'Europe de l'Ouest."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Airport" : "Aéroport"}</td><td className="py-2">{isEn ? "Ferenc Liszt International (BUD), 16 km from centre. Bus 100E direct to Deák Ferenc tér in 40 min — cheaper than taxi, runs every 10 min." : "Ferenc Liszt International (BUD), à 16 km du centre. Bus 100E direct jusqu'à Deák Ferenc tér en 40 min — moins cher que le taxi, toutes les 10 min."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Stadium transit" : "Transport stade"}</td><td className="py-2">{isEn ? "Metro M2 (red) or M4 (green) to Puskás Ferenc Stadion / Stadionok station. ~20 min from District V. Buy a 24h pass." : "Métro M2 (rouge) ou M4 (verte) jusqu'à la station Puskás Ferenc Stadion / Stadionok. ~20 min depuis le District V. Prenez un pass 24h."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Best neighbourhoods" : "Meilleurs quartiers"}</td><td className="py-2">{isEn ? "District V (Belváros, central), VII (ruin bars, nightlife), VIII / IX (cheaper, still walkable to centre)." : "District V (Belváros, central), VII (ruin bars, vie nocturne), VIII / IX (moins chers, toujours à pied du centre)."}</td></tr>
                  <tr className="border-b border-[#001E13]/8"><td className="py-2 pr-4 font-semibold">{isEn ? "Direct flights" : "Vols directs"}</td><td className="py-2">{isEn ? "Paris ~2h15 (AF, Wizz, Ryanair, Transavia). London ~2h30 (BA, Wizz, Ryanair, easyJet). Brussels ~2h. Madrid ~3h." : "Paris ~2h15 (AF, Wizz, Ryanair, Transavia). Londres ~2h30 (BA, Wizz, Ryanair, easyJet). Bruxelles ~2h. Madrid ~3h."}</td></tr>
                  <tr><td className="py-2 pr-4 font-semibold">{isEn ? "Language" : "Langue"}</td><td className="py-2">{isEn ? "Hungarian. English widely spoken in tourist areas, less so in taxis and outside the centre. A few words of köszönöm (thank you) go a long way." : "Hongrois. Anglais courant dans les zones touristiques, moins en taxi et hors centre. Un petit köszönöm (merci) est apprécié."}</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ━━━ MATCH DAY CHECKLIST ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Match Day Checklist" : "Checklist Jour J"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10">
              {isEn
                ? "What every fan in the group needs to have on May 30. Assign each item to a person in your shared packing list so nothing gets forgotten in the rush to the airport."
                : "Ce que chaque fan du groupe doit avoir le 30 mai. Assignez chaque item à une personne dans votre liste partagée pour éviter l'oubli dans la précipitation."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {(isEn
                ? [
                    "Match ticket (UEFA app + printed backup)",
                    "ID or passport (Schengen ID for EU, passport for non-EU)",
                    "Travel insurance covering Hungary",
                    "Club jersey, scarf, flag",
                    "Stadium-approved clear bag (UEFA rules)",
                    "Portable charger (cable for everyone)",
                    "Hungarian forint cash (HUF) for small purchases",
                    "Local SIM or eU roaming plan",
                    "Light jacket — Budapest evenings can dip",
                    "Reusable water bottle (allowed in stadium)",
                    "Group meet-up plan if mobile signal drops",
                    "Hotel address written on paper for the taxi back",
                  ]
                : [
                    "Billet de match (app UEFA + sauvegarde imprimée)",
                    "Pièce d'identité ou passeport (CNI Schengen pour UE, passeport hors UE)",
                    "Assurance voyage couvrant la Hongrie",
                    "Maillot, écharpe, drapeau du club",
                    "Sac transparent conforme stade (règles UEFA)",
                    "Batterie externe (un câble par personne)",
                    "Cash en forint hongrois (HUF) pour les petits achats",
                    "SIM locale ou forfait UE en roaming",
                    "Petite veste — les soirées à Budapest peuvent fraîchir",
                    "Gourde réutilisable (autorisée au stade)",
                    "Point de RDV de secours si le réseau saute",
                    "Adresse de l'hôtel sur papier pour le taxi retour",
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
                ? "A Champions League final isn't a 90-minute trip. It's three days, six fans, one match — and the planning is the part that decides whether the night is unforgettable or just expensive."
                : "Une finale de Ligue des Champions, ce n'est pas un voyage de 90 minutes. C'est trois jours, six potes, un match — et l'organisation décide si la soirée est inoubliable ou juste chère."}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING THE TRIP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Planning the Trip With the Crew" : "Organiser le Voyage Entre Potes"}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Start with the people, not the spreadsheet. Run a quick <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">poll</Link>: who has a ticket, who is hunting one, who comes to Budapest regardless of the seat. The answer drives every other decision — flight count, room split, whether you build the trip around the stadium or around the fan zone. Don&apos;t book anything before this question is settled.</>
                : <>Commencez par les gens, pas par le tableur. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage</Link> rapide : qui a un billet, qui en cherche un, qui descend à Budapest sans place. La réponse pilote tout le reste — nombre de vols, répartition des chambres, voyage construit autour du stade ou de la fan zone. Ne réservez rien avant d&apos;avoir tranché.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Lock the inbound and outbound flights together for the whole crew. Direct Paris-Budapest is around 2h15 and London-Budapest around 2h30; the May 29 outbound and May 31 return are the two days you cannot afford to be split across. Block the trip in your <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> with everyone visible — when one friend bails at the last minute, the rest of the booking doesn&apos;t collapse.</>
                : <>Verrouillez les vols aller et retour ensemble pour toute la bande. Paris-Budapest direct, c&apos;est ~2h15, et Londres-Budapest ~2h30 ; les 29 mai (aller) et 31 mai (retour) sont les deux jours sur lesquels vous ne pouvez pas être éclatés. Posez le voyage dans votre <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> avec tout le monde visible — quand un pote lâche à la dernière minute, le reste ne s&apos;effondre pas.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Match day itself needs hour-by-hour planning, not a vibes-based approach. Kickoff at 18:00 means stadium gates open around 15:00, security saturates 16:00-17:00, public transport runs at peak from 16:00. Build a meet-up point near the metro M2/M4 stadium exit at 15:30 with a fallback time and a fallback bar in case half the group misses the meet. Add a post-match plan too: where you go if Paris wins, where you go if Arsenal wins, and where you find each other if mobile networks collapse — they often do at full-time."
                : "Le jour J lui-même demande un plan heure par heure, pas une approche au feeling. Coup d'envoi à 18h, donc portes du stade vers 15h, files de sécurité saturées 16h-17h, transports en charge dès 16h. Posez un point de RDV près de la sortie métro M2/M4 du stade à 15h30 avec un horaire et un bar de repli au cas où la moitié du groupe rate le RDV. Prévoyez aussi un plan d'après-match : où on va si Paris gagne, où on va si Arsenal gagne, où on se retrouve si le réseau mobile saute — ce qui arrive régulièrement à la fin du temps réglementaire."}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? "Set deadlines for the group, not just for the trip. Hotel cancellation windows close earlier than people remember. International data plans need to be sorted before departure. ID or passport validity needs to be checked the moment you decide to go. A shared task list with deadlines, visible to everyone, is the difference between a clean week and a panic on May 28."
                : "Fixez des deadlines au groupe, pas seulement au voyage. Les fenêtres d'annulation des hôtels se referment plus tôt qu'on ne croit. Les forfaits data doivent être réglés avant le départ. La validité de la pièce d'identité doit être vérifiée dès la décision. Une liste de tâches partagée avec deadlines, visible par tous, c'est la différence entre une semaine propre et une panique le 28 mai."}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Budget Tips" : "Astuces Budget"}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Match tickets are bought individually through UEFA or the clubs and stay individual — keep them out of the shared pool entirely. The shared pool is for flights, hotel, ground transport, group dinners and fan-zone food. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and rotate who fronts each expense so nobody ends up the de-facto group treasurer.</>
                  : <>Les billets de match sont achetés individuellement via UEFA ou les clubs et restent individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour les vols, l&apos;hôtel, le transport sur place, les dîners de groupe et la fan zone. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et faites tourner qui avance chaque frais pour que personne ne devienne le trésorier de fait du groupe.</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Flights have already moved. Direct returns from Paris that were €150 in March now sit around €350-450 for the May 29-31 window and will tick up daily. The same is true from London. Two saves to know about: morning departures on May 29 are still the cheapest slot, and connecting via Vienna or Munich on a single ticket can come in 30% cheaper if your group can absorb the extra hour."
                  : "Les prix des vols ont déjà bougé. Les allers-retours directs depuis Paris qui étaient à 150 € en mars tournent maintenant autour de 350-450 € sur la fenêtre 29-31 mai et grimpent chaque jour. Idem depuis Londres. Deux astuces : les départs en matinée du 29 mai restent le créneau le moins cher, et passer par Vienne ou Munich sur un seul billet peut sortir 30 % moins cher si le groupe accepte l'heure supplémentaire."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Accommodation is where the budget really opens. Central Budapest hotels (Districts V, VII) have multiplied their rates by 3-4x for the match weekend. A three- or four-bedroom apartment in District VIII or IX, fifteen minutes by metro from the centre, split four or five ways, often beats individual hotel rooms by 50%. Always read the cancellation policy before booking — flexible rates are worth the small premium."
                  : "L'hébergement, c'est là que le budget se joue vraiment. Les hôtels du centre de Budapest (Districts V, VII) ont multiplié par 3 à 4 leurs tarifs sur le week-end du match. Un appartement trois ou quatre chambres en District VIII ou IX, à quinze minutes de métro du centre, partagé à quatre ou cinq, bat souvent les chambres d'hôtel individuelles de 50 %. Lisez toujours la politique d'annulation avant de réserver — un tarif flexible vaut le petit surcoût."}
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
              <Link href={`/${locale}/blog/group-trip-budget`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Group Trip Budget" : "Budget Voyage de Groupe"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "How to split costs without arguments." : "Comment partager les frais sans dispute."}</p>
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
                {isEn ? "Build Your Budapest Trip" : "Construisez Votre Voyage à Budapest"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Flights, hotel, match-day timeline, shared budget — one plan, your whole crew on the same page." : "Vols, hôtel, planning du jour J, budget partagé — un seul plan, toute votre bande alignée."}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=ucl-final-2026&template=ucl-final-2026`}>
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
