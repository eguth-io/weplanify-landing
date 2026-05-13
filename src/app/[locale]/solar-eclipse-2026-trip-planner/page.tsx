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
const PATHNAME = "/solar-eclipse-2026-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const isEn = locale === "en";
  const title = isEn
    ? "Total Solar Eclipse 12 Aug 2026: Spain & Iceland Trip Planner"
    : "Éclipse 12 août 2026 : Voyage Espagne, Islande et France";
  const description = isEn
    ? "Everything for the 12 August 2026 total solar eclipse: path of totality across Iceland and northern Spain, when and where the totality is longest, ISO 12312-2 glasses, cruise options, and how to plan the trip from France with a group."
    : "Tout sur l'éclipse solaire totale du 12 août 2026 : trajectoire de la totalité en Islande et dans le nord de l'Espagne, où la totalité est la plus longue, lunettes ISO 12312-2, croisières, et comment organiser le voyage depuis la France à plusieurs.";
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  const ogImage = `${SITE_URL}/events/solar-eclipse-2026.png`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl, images: [{ url: ogImage, width: 1456, height: 816, alt: title }] },
    twitter: { ...metadata.twitter, title, description, images: [ogImage] },
    alternates: { canonical: currentUrl, languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` } },
  };
}

export default async function SolarEclipse2026Page({ params }: Props) {
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
      { "@type": "ListItem", position: 2, name: isEn ? "Solar Eclipse 2026 Trip Planner" : "Voyage Éclipse 2026", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: isEn ? "Total Solar Eclipse 12 August 2026: Trip Planner for Iceland & Spain" : "Éclipse Solaire Totale du 12 août 2026 : Guide Voyage Islande & Espagne",
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-13", dateModified: "2026-05-13",
    image: [`${SITE_URL}/events/solar-eclipse-2026.png`],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: isEn ? "Total Solar Eclipse of 12 August 2026" : "Éclipse Solaire Totale du 12 août 2026",
    description: isEn
      ? "Total solar eclipse on Wednesday 12 August 2026. Path of totality crosses eastern Greenland, western Iceland and northern Spain. Maximum totality 2 minutes 18 seconds off the Icelandic coast. First total solar eclipse visible from mainland Europe since 11 August 1999."
      : "Éclipse solaire totale le mercredi 12 août 2026. La trajectoire de la totalité traverse l'est du Groenland, l'ouest de l'Islande et le nord de l'Espagne. Totalité maximale de 2 minutes 18 secondes au large de la côte islandaise. Première éclipse totale visible depuis l'Europe continentale depuis le 11 août 1999.",
    image: [`${SITE_URL}/events/solar-eclipse-2026.png`],
    startDate: "2026-08-12T17:43:00+00:00",
    endDate: "2026-08-12T18:35:00+00:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: [
      { "@type": "Place", name: "Iceland (Westfjords, Snæfellsnes, Reykjavík)", address: { "@type": "PostalAddress", addressCountry: "IS" } },
      { "@type": "Place", name: "Spain (Galicia, Asturias, Castilla y León, Aragón, Valencia, Balearic Islands)", address: { "@type": "PostalAddress", addressCountry: "ES" } },
    ],
  };

  const faqItems = isEn
    ? [
        { q: "When and where can I see the 12 August 2026 total solar eclipse?", a: "Wednesday 12 August 2026. The path of totality crosses eastern Greenland, western Iceland (including the Westfjords, Snæfellsnes peninsula and Reykjavík) and a wide band across northern Spain (Galicia, Asturias, Cantabria, Castilla y León, the Ebro Valley, Valencia and Mallorca). Maximum totality is 2 minutes 18 seconds — but that maximum is over open ocean ~45 km west of Látrabjarg, Iceland. Inhabited locations get shorter totality: Reykjavík ~1 minute, Zaragoza ~1 min 25 s, Palma de Mallorca ~1 min 36 s, Bilbao ~30 seconds. Madrid and Barcelona are NOT in totality." },
        { q: "Will France see the total eclipse?", a: "No. Mainland France only sees a partial eclipse — but it's deep. Paris reaches 92.2% obscuration, Marseille and Nice around 95%, and Biarritz, the closest French city to the path, gets up to 99.5%. The partial phase runs from ~19:30 to ~20:30 Paris time. Without totality you never get the corona, the darkness or the safe naked-eye window — and the sun stays dangerous to look at the entire time. To see the total eclipse you have to cross into Spain or fly to Iceland." },
        { q: "Iceland or Spain — which is the better trip?", a: "Statistically, inland northern Spain (Ebro Valley, Huesca, Zaragoza) has the best August cloud-cover odds along the entire path — roughly 35% chance of clouds in the right zones. Iceland averages closer to 70-85% cloud cover even in August. The Spanish trade-off: the sun is very low (4-11° above the horizon — only ~1 hour before sunset), so you need a clear western view (the sea, or a plain, never a city street). Iceland's trade-off: cloudier and more expensive, but the sun is higher (~24° in Reykjavík) and the totality experience is more isolated and dramatic." },
        { q: "What about an eclipse cruise?", a: "Several cruise lines have positioned ships in the western Mediterranean and around Mallorca to give passengers the freedom to move under clearer sky on the day. Costa Cruises runs a 7-night eclipse cruise from ~€450 per person. The French line CFC has positioned its 'Renaissance' between the Balearics and Sardinia, 6 nights from Marseille, from around €1,279. Princess Cruises and Holland America also have eclipse-themed itineraries. The advantage is meteorological flexibility; the downside is that a slow-moving ship can't always escape a cloud bank in time." },
        { q: "What kind of glasses do I need?", a: "ISO 12312-2:2015 certified solar viewing glasses, with the CE marking. Regular sunglasses are not safe — even the darkest ones let through enough infrared and visible light to cause solar retinopathy. ISO 12312-2 glasses are sold at French pharmacies (advance sales typically open in June), Bresser.fr, Astronome.fr, Stelvision (Soleils Noirs), and through MyEclipseGlasses on Amazon. Buy one pair per person, check the date stamp (glasses older than 3 years should be replaced) and store them flat. During totality only — and only if you're actually IN totality — you can look with the naked eye." },
        { q: "Have hotels already sold out?", a: "Many of the high-leverage spots have, yes. Hotels.com reported a 445% surge in searches for eclipse destinations. Palencia rooms have been listed up to €1,095 per night (about 10× normal). Mallorca rates have roughly tripled for the night of 11-12 August. The Reykjavik Edition has been quoted at $4,399/night. Tour operators booked Zaragoza, Valencia and Bilbao 18+ months in advance. If you're starting now, look slightly outside the headline cities — smaller towns inside the path are still bookable." },
        { q: "How do you organise an eclipse trip with a group of friends?", a: "Eclipses are short — 30 seconds to 2 minutes depending on where you are — so the logistics matter more than for any normal trip. Decide as a group whether you optimise for cloud odds (Ebro Valley, inland Spain), totality duration (Mallorca), or experience (Iceland). Lock the location, the transport (flight to Bilbao or Reykjavík, or train + drive), and the exact observation spot before booking accommodation. WePlanify keeps the destination poll, the budget and the timeline for the day itself all in one shared place." },
      ]
    : [
        { q: "Quand et où peut-on voir l'éclipse totale du 12 août 2026 ?", a: "Mercredi 12 août 2026. La trajectoire de la totalité traverse l'est du Groenland, l'ouest de l'Islande (dont les Westfjords, la péninsule de Snæfellsnes et Reykjavík) et une large bande dans le nord de l'Espagne (Galice, Asturies, Cantabrie, Castille-et-León, vallée de l'Èbre, Valence et Majorque). Totalité maximale de 2 minutes 18 secondes — mais ce maximum est en pleine mer à ~45 km à l'ouest de Látrabjarg, en Islande. Les lieux habités ont une totalité plus courte : Reykjavík ~1 min, Saragosse ~1 min 25 s, Palma de Majorque ~1 min 36 s, Bilbao ~30 secondes. Madrid et Barcelone NE SONT PAS dans la totalité." },
        { q: "La France verra-t-elle la totalité ?", a: "Non. La France métropolitaine ne voit qu'une éclipse partielle — mais profonde. Paris atteint 92,2 % d'obscurcissement, Marseille et Nice environ 95 %, et Biarritz, la ville française la plus proche de la trajectoire, monte à 99,5 %. La phase partielle se déroule de ~19h30 à ~20h30 heure de Paris. Sans totalité on n'a jamais la couronne, l'obscurité ni la fenêtre où l'œil nu est sans danger — et le soleil reste dangereux à regarder pendant toute la durée. Pour voir l'éclipse totale, il faut passer la frontière espagnole ou aller en Islande." },
        { q: "Islande ou Espagne — quel est le meilleur voyage ?", a: "Statistiquement, l'intérieur du nord de l'Espagne (vallée de l'Èbre, Huesca, Saragosse) a les meilleures probabilités de ciel dégagé en août sur toute la trajectoire — environ 35 % de risque de nuages dans les bonnes zones. L'Islande tourne plutôt à 70-85 % de couverture nuageuse même en août. Le trade-off espagnol : le soleil est très bas (4-11° au-dessus de l'horizon — environ 1 h avant le coucher), il faut un horizon ouest dégagé (la mer, une plaine, jamais une rue urbaine). Trade-off islandais : plus nuageux et plus cher, mais le soleil est plus haut (~24° à Reykjavík) et l'expérience de la totalité est plus isolée et plus spectaculaire." },
        { q: "Et la croisière éclipse, ça vaut le coup ?", a: "Plusieurs compagnies ont positionné des navires en Méditerranée occidentale et autour de Majorque pour laisser aux passagers la liberté de bouger sous un ciel plus clair le jour J. Costa Croisières propose une croisière 7 nuits dès ~450 € par personne. La française CFC positionne son « Renaissance » entre Baléares et Sardaigne, 6 nuits depuis Marseille, dès 1 279 €. Princess Cruises et Holland America ont aussi des itinéraires éclipse. L'avantage, c'est la flexibilité météo ; l'inconvénient, c'est qu'un navire lent ne peut pas toujours échapper à un banc de nuages à temps." },
        { q: "Quelles lunettes utiliser ?", a: "Des lunettes éclipse certifiées ISO 12312-2:2015, avec marquage CE. Les lunettes de soleil ordinaires sont dangereuses — même les plus foncées laissent passer suffisamment d'infrarouge et de lumière visible pour causer une rétinopathie solaire. On en trouve en pharmacie en France (préventes habituellement ouvertes en juin), sur Bresser.fr, Astronome.fr, Stelvision (Soleils Noirs), ou via MyEclipseGlasses sur Amazon. Prévoyez une paire par personne, vérifiez la date imprimée (à remplacer après 3 ans) et conservez-les à plat. Pendant la totalité uniquement — et uniquement si vous êtes physiquement DANS la totalité — vous pouvez regarder à l'œil nu." },
        { q: "Les hôtels sont-ils déjà sold out ?", a: "Beaucoup de spots à fort effet de levier, oui. Hotels.com a rapporté +445 % de recherches sur les destinations éclipse. Des chambres à Palencia ont été affichées jusqu'à 1 095 € la nuit (environ 10× le tarif normal). Les tarifs majorquins ont roughly triplé pour la nuit du 11-12 août. Le Reykjavik Edition a été annoncé à 4 399 $/nuit. Les tour-opérateurs ont bloqué Saragosse, Valence et Bilbao 18 mois en amont. Si vous démarrez maintenant, sortez légèrement des villes vedettes — de plus petites villes dans la bande restent réservables." },
        { q: "Comment organiser un voyage éclipse à plusieurs ?", a: "Les éclipses sont courtes — 30 secondes à 2 minutes selon le lieu — donc la logistique pèse plus que pour n'importe quel voyage normal. Décidez en groupe si vous optimisez pour la météo (vallée de l'Èbre, Espagne intérieure), pour la durée (Majorque), ou pour l'expérience (Islande). Verrouillez le lieu, le transport (vol vers Bilbao ou Reykjavík, ou train + voiture) et le point d'observation exact avant de réserver l'hébergement. WePlanify garde le sondage destination, le budget et la timeline du jour J au même endroit partagé." },
      ];

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: isEn ? "How to plan a total solar eclipse 2026 trip" : "Comment organiser un voyage pour l'éclipse totale 2026",
    description: isEn
      ? "Three months out, here is how to lock the trip: pick your location (cloud odds vs duration vs experience), book travel and accommodation before the next price hike, get ISO 12312-2 glasses, and plan the actual observation hour."
      : "À trois mois, voici comment verrouiller le voyage : choisir le lieu (météo vs durée vs expérience), réserver transport et hébergement avant la prochaine hausse, acheter des lunettes ISO 12312-2, et planifier l'heure d'observation.",
    totalTime: "PT60M",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: isEn ? "Pick your location — and align the group on it" : "Choisir le lieu — et aligner le groupe dessus",
        text: isEn
          ? "The three honest options are inland Spain (Ebro Valley, ~35% cloud risk, short totality), Mallorca (longer totality but sun very low, needs sea horizon), and Iceland (high cloud risk but dramatic experience). Run a group poll before booking anything — the trade-offs split families in real life."
          : "Les trois vraies options sont l'Espagne intérieure (vallée de l'Èbre, ~35 % de risque de nuages, totalité courte), Majorque (totalité plus longue mais soleil très bas, horizon mer indispensable), et l'Islande (forte couverture nuageuse mais expérience spectaculaire). Lancez un sondage de groupe avant de réserver — les trade-offs divisent vraiment les familles.",
        url: `${SITE_URL}/${locale}/features/polls`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: isEn ? "Book transport and accommodation before the next hike" : "Réserver transport et hébergement avant la prochaine hausse",
        text: isEn
          ? "Paris-Reykjavík takes ~3h30 with Icelandair or easyJet from CDG. Paris-Bilbao is a short flight or a long train (14-15h via Hendaye). Accommodation in headline cities (Zaragoza, Reykjavík, Palma) is largely gone — look at smaller towns inside the path, or a serviced apartment for the group."
          : "Paris-Reykjavík fait ~3h30 avec Icelandair ou easyJet depuis CDG. Paris-Bilbao, c'est un court vol ou un long train (14-15h via Hendaye). L'hébergement dans les villes vedettes (Saragosse, Reykjavík, Palma) est largement parti — regardez les plus petites villes de la bande, ou un appartement partagé pour le groupe.",
        url: `${SITE_URL}/${locale}/features/itinerary`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: isEn ? "Order ISO 12312-2 glasses and the safety kit" : "Commander des lunettes ISO 12312-2 et le kit sécurité",
        text: isEn
          ? "One certified pair per person, ordered before the June rush. Add a smartphone solar filter if anyone wants to shoot the eclipse — regular phone optics are also unsafe pointed at the sun without filtering. Pack a backup pair per group of four: glasses get dropped."
          : "Une paire certifiée par personne, commandée avant la cohue de juin. Ajoutez un filtre solaire smartphone si quelqu'un veut filmer — l'optique du téléphone est aussi à risque sans filtre. Prévoyez une paire de secours par groupe de quatre : ça se casse.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: isEn ? "Plan the observation hour by hour" : "Planifier l'observation heure par heure",
        text: isEn
          ? "Be at your spot at least 2 hours before totality. In Spain, totality lands around 20:27-20:32 CEST with the sun very low — practice locating it from your spot the day before. Block a clear meeting point in case the group splits, and time the drive back to accommodation: roads from observation spots clog within minutes of totality ending."
          : "Soyez sur votre point au moins 2 heures avant la totalité. En Espagne, la totalité arrive autour de 20h27-20h32 CEST avec le soleil très bas — repérez l'angle depuis votre spot la veille. Définissez un point de rendez-vous clair en cas de séparation du groupe, et anticipez le trajet retour : les routes se bouchent en minutes après la fin de la totalité.",
        url: `${SITE_URL}/${locale}/features/budget`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: isEn ? "Home" : "Accueil", href: `/${locale}` },
                { label: isEn ? "Solar Eclipse 2026 Trip Planner" : "Voyage Éclipse 2026" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {isEn ? "Astrotourism guide & trip planner · August 2026" : "Astrotourisme & guide voyage · Août 2026"}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {isEn
                ? "Total Solar Eclipse, 12 August 2026: Iceland & Spain Trip Planner"
                : "Éclipse Solaire Totale du 12 août 2026 : Le Guide Voyage Islande & Espagne"}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>Wednesday 12 August 2026. The first total solar eclipse visible from mainland Europe since 11 August 1999. The shadow lands on Greenland, sweeps across western Iceland, and crosses northern Spain at sunset — Galicia, the Ebro Valley, Valencia and Mallorca. Maximum totality is 2 minutes 18 seconds; in Spain&apos;s observable cities you&apos;ll get between 30 seconds and ~1 min 36 s. Mainland France only sees a deep partial (92.2% in Paris, 99.5% in Biarritz) — no totality. This is the complete guide to picking the right spot, getting there, the safety equipment, and planning the trip with a group. If you&apos;re still picking your tools, see our <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Mercredi 12 août 2026. La première éclipse totale visible depuis l&apos;Europe continentale depuis le 11 août 1999. L&apos;ombre touche le Groenland, balaie l&apos;ouest de l&apos;Islande, et traverse le nord de l&apos;Espagne au crépuscule — Galice, vallée de l&apos;Èbre, Valence et Majorque. La totalité maximale est de 2 minutes 18 secondes ; dans les villes espagnoles observables, vous aurez entre 30 secondes et ~1 min 36 s. La France métropolitaine ne voit qu&apos;une partielle profonde (92,2 % à Paris, 99,5 % à Biarritz) — pas de totalité. Voici le guide complet pour choisir le bon spot, s&apos;y rendre, s&apos;équiper, et organiser le voyage à plusieurs. Si vous hésitez encore entre les outils, jetez un œil à notre <Link href={`/${locale}/blog/meilleures-applications-voyage-groupe`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{isEn ? "10 min read" : "10 min de lecture"}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-13" modifiedDate="2026-05-13" />
            <div className="mt-10 lg:mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026&placement=hero`}>
                <PulsatingButton className="font-karla font-bold">{isEn ? "Plan our eclipse trip" : "Cadre le voyage éclipse"}</PulsatingButton>
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
                src="/events/solar-eclipse-2026.png"
                alt={isEn ? "Total solar eclipse of 12 August 2026 — eclipse glasses held up to the corona over a Spanish wheat field" : "Éclipse solaire totale du 12 août 2026 — des lunettes ISO tenues face à la couronne au-dessus d'un champ espagnol"}
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
                {isEn ? "Eclipse facts" : "Les chiffres de l'éclipse"}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Date" : "Date"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{isEn ? "Wed 12 Aug" : "Mer. 12 août"}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Max totality" : "Totalité max"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">2 min 18 s</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "off Iceland" : "au large d'Islande"}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Path" : "Trajectoire"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">IS · ES</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "+ Greenland" : "+ Groenland"}</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{isEn ? "Last in Europe" : "Dernière en Europe"}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">1999</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{isEn ? "27 years ago" : "il y a 27 ans"}</p>
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
                ? "Total solar eclipses visible from mainland Europe happen roughly once a generation. The last one was 11 August 1999, when an enormous swathe of France went dark for about two minutes in the middle of summer. The 2026 eclipse skips France entirely — its path of totality crosses eastern Greenland, west and south Iceland, then sweeps across northern Spain at sunset before ending in the Mediterranean. France, despite being so close, only sees a partial eclipse: deep (92-99.5%) but no corona, no darkness, and the sun stays unsafe to look at for the entire phase. To witness the actual total eclipse — and the silent, unforgettable corona — you have to cross into the Spanish path or fly north to Iceland. Two more total eclipses cross Spain after this one (2 August 2027, then an annular on 26 January 2028), making 2026-2028 the unique 'Spanish triple' of European astrotourism."
                : "Les éclipses totales visibles depuis l'Europe continentale arrivent environ une fois par génération. La précédente, c'était le 11 août 1999, quand une grande partie de la France a basculé dans le noir pendant deux minutes en plein été. L'éclipse 2026 saute complètement la France — sa trajectoire de totalité traverse l'est du Groenland, l'ouest et le sud de l'Islande, puis balaie le nord de l'Espagne au crépuscule avant de finir en Méditerranée. La France, pourtant si proche, ne voit qu'une partielle : profonde (92-99,5 %) mais sans couronne, sans obscurité, et le soleil reste dangereux à regarder sur toute la phase. Pour assister à la vraie totalité — et à la couronne silencieuse, inoubliable — il faut passer dans la bande espagnole ou s'envoler vers l'Islande. Deux autres éclipses totales traverseront l'Espagne après celle-ci (2 août 2027, puis une annulaire le 26 janvier 2028), ce qui fait de 2026-2028 le « triplé espagnol » unique de l'astrotourisme européen."}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {isEn
                ? "WePlanify is the free shared command center for groups chasing the eclipse — location poll, flight or train, accommodation, the day-J observation timeline, and shared budget in one place, in English or French."
                : "WePlanify, c'est le poste de commandement gratuit et partagé pour les groupes qui chassent l'éclipse — sondage destination, vol ou train, hébergement, timeline d'observation du jour J et budget partagé au même endroit, en français ou anglais."}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={isEn ? "On this page" : "Sur cette page"}
              items={[
                { id: "path", label: isEn ? "The path of totality" : "La trajectoire de la totalité" },
                { id: "france", label: isEn ? "Will France see the eclipse?" : "Voir l'éclipse depuis la France ?" },
                { id: "spain-vs-iceland", label: isEn ? "Spain vs Iceland vs cruise" : "Espagne vs Islande vs croisière" },
                { id: "safety", label: isEn ? "Safety & glasses" : "Sécurité & lunettes" },
                { id: "logistics", label: isEn ? "Travel & accommodation" : "Transport & hébergement" },
                { id: "planning", label: isEn ? "Planning the trip with the crew" : "Organiser le voyage entre potes" },
                { id: "budget", label: isEn ? "Budget tips" : "Astuces budget" },
                { id: "faq", label: isEn ? "Frequently asked questions" : "Questions fréquentes" },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE PATH ━━━ */}
        <FadeIn>
          <section id="path" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "The Path of Totality" : "La Trajectoire de la Totalité"}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {isEn
                  ? "From Greenland's eastern fjords to the Mediterranean, in roughly 50 minutes. The duration varies wildly by where you stand."
                  : "Des fjords de l'est du Groenland à la Méditerranée, en environ 50 minutes. La durée varie énormément selon où vous êtes."}
              </p>

              <div className="space-y-0">
                {(isEn
                  ? [
                      { stop: "Greenland — eastern fjords", desc: "The shadow first touches Earth over the Blosseville Coast and crosses Scoresby Sound, with about 1 min 45 s of totality. The only village in the region, Ittoqqortoormiit, sits ~50 km south of the centerline and stays outside totality. Practical travel access is limited — this leg is for specialists." },
                      { stop: "Iceland — Westfjords, Snæfellsnes, Reykjavík", desc: "The shadow makes landfall at the Straumnes lighthouse in the Westfjords at 17:43:28 UTC. Látrabjarg gets 2 min 13 s. The Snæfellsnes peninsula, including the iconic Kirkjufell mountain, sits in the path. Reykjavík sees totality start at 17:48:12 UTC for about 1 minute, with the sun ~24.5° above the western horizon. Iceland's total in-shadow time is 6 min 48 s." },
                      { stop: "Spain — Galicia to Mallorca", desc: "The shadow reaches A Coruña around 20:26 CEST (sun ~11° high), Bilbao at 20:27 (~30 s of totality, sun ~8°), Zaragoza around the same window (~1 min 25 s), Valencia from 20:32 (~1 minute), and Palma de Mallorca at 20:31-20:32 (~1 min 36 s, sun ~4° above the horizon, roughly 10 minutes before sunset). Madrid and Barcelona sit just outside the band — they do not get totality." },
                      { stop: "Inside the band but easy to miss", desc: "Santander, Burgos, Valladolid, Palencia and León are all in the totality band. The further north and west you are, the slightly higher the sun — but the cloudier the climatology. The Ebro Valley (Huesca, Zaragoza) sits at the statistical sweet spot for August cloud cover and a flat western horizon." },
                      { stop: "Greatest duration is over open ocean", desc: "The point of greatest duration — 2 minutes 18.2 seconds — is roughly 45 km west of Látrabjarg, in open sea. No island, no port. The only ways to be there are an eclipse cruise or a chartered flight." },
                    ]
                  : [
                      { stop: "Groenland — fjords de l'est", desc: "L'ombre touche d'abord la Terre au-dessus de la Blosseville Coast et traverse Scoresby Sund, avec environ 1 min 45 s de totalité. Le seul village de la région, Ittoqqortoormiit, se situe ~50 km au sud de la ligne centrale et reste hors totalité. L'accès touristique est limité — cette portion est pour spécialistes." },
                      { stop: "Islande — Westfjords, Snæfellsnes, Reykjavík", desc: "L'ombre touche terre au phare de Straumnes dans les Westfjords à 17h43:28 UTC. Látrabjarg reçoit 2 min 13 s. La péninsule de Snæfellsnes, dont la mythique montagne Kirkjufell, est dans la bande. Reykjavík voit la totalité commencer à 17h48:12 UTC pour environ 1 minute, avec le soleil à ~24,5° au-dessus de l'horizon ouest. Le temps total d'ombre sur l'Islande est de 6 min 48 s." },
                      { stop: "Espagne — de la Galice à Majorque", desc: "L'ombre atteint A Coruña vers 20h26 CEST (soleil ~11° de hauteur), Bilbao à 20h27 (~30 s de totalité, soleil ~8°), Saragosse à peu près au même créneau (~1 min 25 s), Valence à partir de 20h32 (~1 minute), et Palma de Majorque à 20h31-20h32 (~1 min 36 s, soleil ~4° au-dessus de l'horizon, environ 10 minutes avant le coucher). Madrid et Barcelone sont juste hors bande — pas de totalité." },
                      { stop: "Dans la bande mais facile à oublier", desc: "Santander, Burgos, Valladolid, Palencia et León sont aussi dans la bande de totalité. Plus on est au nord et à l'ouest, plus le soleil est légèrement haut — mais plus la climatologie est nuageuse. La vallée de l'Èbre (Huesca, Saragosse) se situe au point statistiquement idéal pour la couverture nuageuse d'août et offre un horizon ouest plat." },
                      { stop: "La durée maximale est en pleine mer", desc: "Le point de durée maximale — 2 minutes 18,2 secondes — se trouve à environ 45 km à l'ouest de Látrabjarg, en pleine mer. Pas d'île, pas de port. Les seules façons d'y être : croisière éclipse ou vol charter." },
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

        {/* ━━━ WHAT FRANCE SEES ━━━ */}
        <FadeIn>
          <section id="france" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Will France See the Eclipse?" : "Peut-on Voir l'Éclipse Totale Depuis la France ?"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "A deep partial — but not a total. Important to be clear on this with the group, especially anyone who remembers the 1999 eclipse from France."
                  : "Non, seulement une éclipse partielle profonde — pas la totalité. Important de bien clarifier dans le groupe, surtout les personnes qui ont vu la totalité de 1999 depuis la France."}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Partial obscuration" : "Obscurcissement partiel"}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "City by city" : "Ville par ville"}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Biarritz: up to 99.5% (closest to the path)" : "→ Biarritz : jusqu'à 99,5 % (le plus proche de la bande)"}</li>
                    <li>{isEn ? "→ Marseille / Nice: ~95%" : "→ Marseille / Nice : ~95 %"}</li>
                    <li>{isEn ? "→ Bordeaux / Toulouse: ~96-97%" : "→ Bordeaux / Toulouse : ~96-97 %"}</li>
                    <li>{isEn ? "→ Paris: 92.2%" : "→ Paris : 92,2 %"}</li>
                    <li>{isEn ? "→ Timing: ~19:30 to ~20:30 Paris time, low sun" : "→ Horaire : ~19h30 à ~20h30 heure de Paris, soleil bas"}</li>
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Why 99% is not 100%" : "Pourquoi 99 % n'est pas 100 %"}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "What you miss" : "Ce que vous ratez"}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ The corona — only visible when the sun is 100% covered" : "→ La couronne — visible uniquement à 100 % de couverture"}</li>
                    <li>{isEn ? "→ The darkness — night does not actually fall at 99%" : "→ L'obscurité — la nuit ne tombe pas vraiment à 99 %"}</li>
                    <li>{isEn ? "→ The naked-eye safe window — never at partial, always wear glasses" : "→ La fenêtre œil-nu — jamais en partielle, lunettes obligatoires"}</li>
                    <li>{isEn ? "→ The temperature drop and the bird silence" : "→ La baisse de température et le silence des oiseaux"}</li>
                    <li>{isEn ? "→ The 360° sunset effect on the horizon" : "→ L'effet coucher de soleil 360° sur l'horizon"}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ SPAIN VS ICELAND VS CRUISE ━━━ */}
        <section id="spain-vs-iceland" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Spain vs Iceland vs Cruise" : "Espagne vs Islande vs Croisière"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Three honest options, each with a real trade-off. The right one depends on what you optimise for — clear sky odds, totality duration, or experience."
                : "Trois options honnêtes, chacune avec un vrai trade-off. Le bon choix dépend de ce que vous optimisez — probabilité de ciel clair, durée de la totalité, ou expérience."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 1" : "Option 1"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Inland northern Spain" : "Nord de l'Espagne intérieur"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "The Ebro Valley, Huesca, Zaragoza and the plains around them — best August cloud-cover statistics on the entire path (~35% cloud risk). Flat western horizon, easy road access, mid-range hotels. Trade-off: totality is short (~1-1.5 min) and the sun is low (8-11°)." : "La vallée de l'Èbre, Huesca, Saragosse et les plaines autour — meilleures statistiques nuages d'août sur toute la trajectoire (~35 % de risque). Horizon ouest plat, accès route facile, hôtels milieu de gamme. Trade-off : la totalité est courte (~1-1,5 min) et le soleil bas (8-11°)."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 2" : "Option 2"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Mallorca" : "Majorque"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Palma sees ~1 min 36 s of totality, the longest of any easily reachable city. Beach setting with a clear western sea horizon. Trade-off: the sun is very low (~4°), ~10 min before sunset, so any cliff or building to the west kills the view. Hotel rates have already roughly tripled for the night of 11-12 August." : "Palma voit ~1 min 36 s de totalité, la plus longue parmi les villes facilement accessibles. Cadre balnéaire avec horizon mer ouest dégagé. Trade-off : le soleil est très bas (~4°), à ~10 min du coucher, donc toute falaise ou bâtiment à l'ouest tue la vue. Les hôtels ont déjà roughly triplé sur la nuit du 11-12 août."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Option 3" : "Option 3"}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{isEn ? "Iceland or cruise" : "Islande ou croisière"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {isEn ? "Iceland gives the most dramatic experience and the highest sun (~24° in Reykjavík) but pays in cloud risk (70-85% average August cover). A Mediterranean eclipse cruise (Costa from ~€450, CFC Renaissance from €1,279, Princess, Holland America) trades a fixed spot for meteorological flexibility on the day." : "L'Islande offre l'expérience la plus spectaculaire et le soleil le plus haut (~24° à Reykjavík) mais paie en risque nuage (70-85 % de couverture moyenne en août). Une croisière éclipse en Méditerranée (Costa dès ~450 €, CFC Renaissance dès 1 279 €, Princess, Holland America) échange un point fixe contre la flexibilité météo du jour J."}
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
                  {isEn ? "Spain, Mallorca or Iceland?" : "Espagne, Majorque ou Islande ?"}
                </p>
                <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base">
                  {isEn ? "Run the destination poll with the crew, then pre-fill flights and accommodation." : "Lance le sondage destination avec la bande, puis pré-remplis vols et hébergement."}
                </p>
              </div>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026&placement=mid-options`} className="shrink-0">
                <button className="bg-[#FFFBF5] text-[#001E13] font-karla font-bold rounded-full px-6 py-3 text-sm lg:text-base hover:bg-[#FFFBF5]/90 transition-colors">
                  {isEn ? "Run the poll" : "Lance le sondage"}
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ SAFETY ━━━ */}
        <section id="safety" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {isEn ? "Safety & ISO 12312-2 Glasses" : "Sécurité & Lunettes ISO 12312-2"}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {isEn
                ? "Solar retinopathy is silent — you don't feel the damage until it's done. Get the right glasses early and bring spares."
                : "La rétinopathie solaire est silencieuse — on ne sent rien jusqu'à ce que le dommage soit fait. Achetez les bonnes lunettes tôt et prévoyez des paires de secours."}
            </p>

            <div className="space-y-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "The certification to look for" : "La certification à vérifier"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {isEn
                    ? "ISO 12312-2:2015 — printed on the inside of the glasses — plus the CE marking for Europe. Anything without both is unsafe, including very dark welder's glass below shade 14, X-ray film, smoked glass, fully exposed photographic negatives, or stacked sunglasses. Glasses older than three years should be replaced; the filter degrades."
                    : "ISO 12312-2:2015 — imprimé à l'intérieur des lunettes — plus le marquage CE pour l'Europe. Sans ces deux mentions, c'est dangereux : verre de soudeur inférieur à teinte 14, film X, verre fumé, négatif photo exposé, lunettes de soleil empilées. À remplacer après trois ans : le filtre se dégrade."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Where to buy in France" : "Où en acheter en France"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {isEn
                    ? "Pharmacies (advance sales typically open in June), Bresser.fr, Astronome.fr, Stelvision (Soleils Noirs), and MyEclipseGlasses or VOLTNGO on Amazon. Order before the June rush — supply gets tight in July as media coverage ramps up. One pair per person, plus a backup pair per group of four."
                    : "Pharmacies (préventes habituellement en juin), Bresser.fr, Astronome.fr, Stelvision (Soleils Noirs), et MyEclipseGlasses ou VOLTNGO sur Amazon. Commandez avant la cohue de juin — la disponibilité se tend en juillet quand la couverture médiatique monte. Une paire par personne, plus une paire de secours par groupe de quatre."}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6 lg:p-8">
                <h3 className="text-[#001E13] font-londrina-solid text-xl lg:text-2xl mb-3">{isEn ? "Smartphone & camera" : "Smartphone & appareil photo"}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.8]">
                  {isEn
                    ? "Pointing a phone camera at the partial eclipse without a solar filter can damage the sensor and is not safe through the screen either. Use a screw-on or magnetic solar filter, or accept that the eclipse is one of the few events where keeping the phone in your pocket is the right call. During totality only (in the totality band) you can look at the sun and shoot freely."
                    : "Pointer un téléphone vers la partielle sans filtre solaire peut endommager le capteur et l'écran n'est pas un compromis sûr non plus. Utilisez un filtre solaire vissable ou magnétique, ou acceptez que l'éclipse est un des rares événements où ranger le téléphone est la bonne décision. Pendant la totalité uniquement (et uniquement dans la bande), vous pouvez regarder le soleil et photographier librement."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ LOGISTICS ━━━ */}
        <FadeIn>
          <section id="logistics" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {isEn ? "Travel & Accommodation" : "Transport & Hébergement"}
              </h2>
              <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
                {isEn
                  ? "Headline cities are largely booked. The play is either to widen the search to smaller towns inside the path, or to accept a longer drive on the day."
                  : "Les villes vedettes sont largement réservées. Le bon coup, c'est soit d'élargir la recherche aux plus petites villes dans la bande, soit d'accepter un trajet plus long le jour J."}
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
                <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Spain" : "Espagne"}</p>
                  <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "Getting there" : "Comment y aller"}</h3>
                  <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Paris → Bilbao: short direct flight, ~1h50" : "→ Paris → Bilbao : vol direct court, ~1h50"}</li>
                    <li>{isEn ? "→ Paris → Bilbao by train: ~14-15h via Hendaye" : "→ Paris → Bilbao en train : ~14-15h via Hendaye"}</li>
                    <li>{isEn ? "→ Paris → Zaragoza / Valencia / Palma: direct flights from CDG/ORY" : "→ Paris → Saragosse / Valence / Palma : vols directs depuis CDG/ORY"}</li>
                    <li>{isEn ? "→ Drive from southwest France to Bilbao or Pamplona: ~3-5 h" : "→ Voiture depuis le sud-ouest vers Bilbao ou Pampelune : ~3-5 h"}</li>
                    <li>{isEn ? "→ Headline cities (Zaragoza, Valencia, Palma): hotels mostly gone — try Logroño, Tudela, Castellón" : "→ Villes vedettes (Saragosse, Valence, Palma) : hôtels largement partis — essayez Logroño, Tudela, Castellón"}</li>
                  </ul>
                </div>

                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                  <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{isEn ? "Iceland & cruise" : "Islande & croisière"}</p>
                  <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">{isEn ? "Getting there" : "Comment y aller"}</h3>
                  <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                    <li>{isEn ? "→ Paris CDG → Reykjavík (KEF): ~3h30 direct, Icelandair (~16 flights/week) and easyJet" : "→ Paris CDG → Reykjavík (KEF) : ~3h30 direct, Icelandair (~16 vols/semaine) et easyJet"}</li>
                    <li>{isEn ? "→ Rent a car at KEF to reach Snæfellsnes (~2h30 drive)" : "→ Voiture de location à KEF pour rejoindre Snæfellsnes (~2h30 de route)"}</li>
                    <li>{isEn ? "→ Reykjavík hotels: mostly sold out, Reykjavik Edition listed at $4,399/night" : "→ Hôtels de Reykjavík : largement sold out, le Reykjavik Edition annoncé à 4 399 $/nuit"}</li>
                    <li>{isEn ? "→ Costa Cruises eclipse cruise: 7 nights from ~€450/pers" : "→ Croisière éclipse Costa : 7 nuits dès ~450 €/pers"}</li>
                    <li>{isEn ? "→ CFC Renaissance: 6 nights from Marseille, from €1,279/pers" : "→ CFC Renaissance : 6 nuits depuis Marseille, dès 1 279 €/pers"}</li>
                  </ul>
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
                ? <>An eclipse trip has a brutal forcing function: 30 seconds to 2 minutes of payoff in a single moment, after months of planning. The destination call is the hardest — Iceland enthusiasts and Mediterranean enthusiasts often want very different trips. Run a <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">group poll</Link> early on the three real options (inland Spain, Mallorca, Iceland), with each person ranking by what they actually optimise for — clear-sky odds, totality duration, or experience. The poll is the smallest piece of work that prevents an entire trip from drifting toward the loudest voice.</>
                : <>Un voyage éclipse a une contrainte brutale : 30 secondes à 2 minutes de récompense en un seul instant, après des mois de préparation. Le choix de la destination est la décision la plus dure — les amoureux d&apos;Islande et ceux de Méditerranée veulent souvent des voyages très différents. Lancez un <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">sondage de groupe</Link> tôt sur les trois vraies options (Espagne intérieure, Majorque, Islande), avec chaque personne qui classe selon ce qu&apos;elle optimise vraiment — probabilité de ciel clair, durée de la totalité, ou expérience. Le sondage, c&apos;est le plus petit travail qui empêche un voyage entier de glisser vers la voix la plus forte.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>The day-J <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> is non-negotiable. Block: arrival at the observation spot at least 2 hours before totality, glasses-on for the partial phase, the totality window (minute by minute), the post-totality partial (still dangerous, glasses back on), and the drive back. The hours after totality are when roads clog and cellular networks die — agree on a meeting point and a fallback channel before the partial even starts.</>
                : <>L&apos;<Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> du jour J n&apos;est pas négociable. Bloquez : arrivée sur le spot au moins 2 heures avant la totalité, lunettes en partielle, fenêtre de totalité (minute par minute), partielle post-totalité (toujours dangereuse, lunettes remises), et le trajet retour. Les heures après la totalité, c&apos;est routes bouchées et réseau mort — convenez d&apos;un point de rendez-vous et d&apos;un canal de secours avant même le début de la partielle.</>}
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
                  ? <>Eclipse trips skew the normal budget pattern: accommodation prices on 11-12 August are the dominant line, often 3-10× normal rates, while transport is closer to typical August prices. Hotels.com reported a 445% surge in eclipse-destination searches, and Palencia rooms have appeared at €1,095/night. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with the night of 11-12 August explicitly carved out as a separate line, and decide as a group whether the headline city is worth the premium or whether a 30-minute drive to a smaller town is the better trade.</>
                  : <>Les voyages éclipse déforment le pattern budget habituel : les prix d&apos;hébergement la nuit du 11-12 août dominent la ligne, souvent 3-10× le tarif normal, tandis que le transport reste proche d&apos;août classique. Hotels.com a rapporté +445 % de recherches sur destinations éclipse, et des chambres à Palencia sont apparues à 1 095 €/nuit. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec la nuit du 11-12 août en ligne séparée explicite, et décidez en groupe si la ville vedette vaut le premium ou si 30 minutes de route vers une petite ville est le meilleur trade.</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "A serviced apartment for 4-6 people in a smaller town inside the totality band (Logroño, Tudela, Castellón on the Spanish side; Borgarnes or Stykkishólmur on the Snæfellsnes peninsula in Iceland) routinely beats hotel rooms in headline cities by 40-60%, while keeping you fully inside totality. The trade-off is that the dinner options narrow — book restaurants for 13 August now, not on the day."
                  : "Un appartement partagé à 4-6 dans une plus petite ville de la bande (Logroño, Tudela, Castellón côté Espagne ; Borgarnes ou Stykkishólmur sur la péninsule de Snæfellsnes en Islande) bat régulièrement les chambres d'hôtel des villes vedettes de 40-60 %, tout en restant pleinement dans la totalité. Trade-off : l'offre restauration se réduit — réservez les restos du 13 août maintenant, pas le jour même."}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? "Don't skimp on the glasses. A €5-15 ISO 12312-2 pair per person plus a backup is one of the smallest lines in the entire budget, and it's the only line where shortcutting can actually injure someone in the group."
                  : "Pas de compromis sur les lunettes. 5-15 € de lunettes ISO 12312-2 par personne plus une de secours, c'est l'une des plus petites lignes du budget, et la seule où un raccourci peut vraiment blesser quelqu'un dans le groupe."}
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
              <Link href={`/${locale}/tomorrowland-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{isEn ? "Tomorrowland 2026 Trip Planner" : "Voyage Tomorrowland 2026"}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{isEn ? "Two weekends in Boom, Belgium." : "Deux week-ends à Boom, Belgique."}</p>
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
                {isEn ? "Build Your Eclipse Trip" : "Construisez Votre Voyage Éclipse"}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {isEn ? "Destination poll, flights or train, accommodation in the totality band, day-J timeline, shared budget — one plan, your whole crew on the same page." : "Sondage destination, vols ou train, hébergement dans la bande, timeline du jour J, budget partagé — un seul plan, toute votre bande alignée."}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=solar-eclipse-2026&template=solar-eclipse-2026`}>
                  <PulsatingButton className="font-karla font-bold">{isEn ? "Run the Spain vs Iceland poll" : "Lance le sondage Espagne vs Islande"}</PulsatingButton>
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
