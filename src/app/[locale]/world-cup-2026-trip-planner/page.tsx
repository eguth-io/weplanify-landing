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
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity, hreflangLanguages } from "@/lib/metadata";
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
  const t = await getTranslations({ locale, namespace: "worldCup2026" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata, title, description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: { canonical: currentUrl, languages: hreflangLanguages(SITE_URL, PATHNAME) },
  };
}

export default async function WorldCup2026Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("worldCup2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const anatomyItems = t.raw("anatomy.items") as { stop: string; desc: string; link: string }[];
  const matrixRows = t.raw("matrix.rows") as { route: string; mode: string; time: string; note: string }[];
  const checklistItems = t.raw("checklist.items") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls = [
    `${SITE_URL}/${locale}${PATHNAME}#anatomy`,
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/budget`,
  ];

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: t("hero.title"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-07", dateModified: "2026-05-07",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const fifaTicketsUrl = "https://www.fifa.com/fifaplus/en/tickets";
  const eventImage = `${SITE_URL}/header-bg.webp`;
  const eventDescription = t("jsonld.eventDescription");
  const fifaPerformer = { "@type": "PerformingGroup", name: t("jsonld.fifaPerformer") };
  const fifaOrganizer = { "@type": "Organization", name: "FIFA", url: "https://www.fifa.com" };
  const fifaOffers = {
    "@type": "Offer",
    url: fifaTicketsUrl,
    availability: "https://schema.org/InStock",
    validFrom: "2025-09-10",
  };

  const hostCities: Array<{ name: string; locality: string; country: "US" | "CA" | "MX" }> = [
    { name: "Atlanta", locality: "Atlanta", country: "US" },
    { name: "Boston", locality: "Foxborough", country: "US" },
    { name: "Dallas", locality: "Arlington", country: "US" },
    { name: "Houston", locality: "Houston", country: "US" },
    { name: "Kansas City", locality: "Kansas City", country: "US" },
    { name: "Los Angeles", locality: "Inglewood", country: "US" },
    { name: "Miami", locality: "Miami Gardens", country: "US" },
    { name: "New York / New Jersey", locality: "East Rutherford", country: "US" },
    { name: "Philadelphia", locality: "Philadelphia", country: "US" },
    { name: "San Francisco Bay Area", locality: "Santa Clara", country: "US" },
    { name: "Seattle", locality: "Seattle", country: "US" },
    { name: "Toronto", locality: "Toronto", country: "CA" },
    { name: "Vancouver", locality: "Vancouver", country: "CA" },
    { name: "Guadalajara", locality: "Zapopan", country: "MX" },
    { name: "Mexico City", locality: "Mexico City", country: "MX" },
    { name: "Monterrey", locality: "Guadalupe", country: "MX" },
  ];

  const sportsEventLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: t("jsonld.eventName"),
    description: eventDescription,
    image: [eventImage],
    startDate: "2026-06-11",
    endDate: "2026-07-19",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Association football",
    organizer: fifaOrganizer,
    performer: fifaPerformer,
    offers: fifaOffers,
    location: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
      { "@type": "Country", name: "Mexico" },
    ],
    subEvent: hostCities.map((city) => ({
      "@type": "SportsEvent",
      name: t("jsonld.subEventName", { city: city.name }),
      description: t("jsonld.subEventDescription", { city: city.name }),
      image: [eventImage],
      startDate: "2026-06-11",
      endDate: "2026-07-19",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      sport: "Association football",
      organizer: fifaOrganizer,
      performer: fifaPerformer,
      offers: { ...fifaOffers },
      location: { "@type": "Place", name: city.name, address: { "@type": "PostalAddress", addressLocality: city.locality, addressCountry: city.country } },
    })),
  };

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("jsonld.howToName"),
    description: t("jsonld.howToDescription"),
    totalTime: "PT1H",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      ...(howToStepUrls[i] ? { url: howToStepUrls[i] } : {}),
    })),
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
                { label: t("breadcrumb.home"), href: `/${locale}` },
                { label: t("breadcrumb.current") },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {t("hero.tag")}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {isEn
                ? <>This is a free World Cup 2026 trip planner for groups of fans — 16 host cities, 3 countries, 104 matches over 39 days. Following a team isn&apos;t a vacation, it&apos;s a logistics operation. Here&apos;s how to build the multi-city route with your crew without spending half the trip on a group chat. If you&apos;re still picking your tools, see our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Voici un planificateur gratuit pour la Coupe du Monde 2026 entre potes — 16 villes hôtes, 3 pays, 104 matchs sur 39 jours. Pas une agence, pas un pack tout fait : c&apos;est ton plan, partagé en temps réel avec ta bande. Voici comment construire l&apos;itinéraire multi-villes sans passer la moitié du voyage sur la conversation de groupe. Si tu hésites encore entre les outils, jette un œil à notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-07" modifiedDate="2026-05-07" />
          </div>
        </section>

        {/* ━━━ THE REAL PROBLEM ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("problem.p1")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("problem.p2")}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "anatomy", label: t("toc.anatomy") },
                { id: "host-cities", label: t("toc.hostCities") },
                { id: "planning-route", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ ANATOMY OF A WORLD CUP TRIP ━━━ */}
        <FadeIn>
          <section id="anatomy" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("anatomy.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {t("anatomy.subtitle")}
              </p>

              <div className="space-y-0">
                {anatomyItems.map((item, i) => (
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
              {t("hostCities.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("hostCities.subtitle")}
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
                {t("matrix.title")}
              </h3>
              <p className="text-[#001E13]/55 font-karla text-sm lg:text-base mb-6 max-w-[700px]">
                {t("matrix.subtitle")}
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-left font-karla text-sm lg:text-base">
                  <thead>
                    <tr className="border-b-2 border-[#001E13]/15">
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{t("matrix.route")}</th>
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{t("matrix.mode")}</th>
                      <th className="py-2 pr-4 text-[#001E13] font-semibold">{t("matrix.time")}</th>
                      <th className="py-2 text-[#001E13] font-semibold">{t("matrix.notes")}</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#001E13]/75">
                    {matrixRows.map((row, i) => (
                      <tr key={i} className={i < matrixRows.length - 1 ? "border-b border-[#001E13]/8" : undefined}>
                        <td className="py-2 pr-4">{row.route}</td>
                        <td className="py-2 pr-4">{row.mode}</td>
                        <td className="py-2 pr-4">{row.time}</td>
                        <td className="py-2">{row.note}</td>
                      </tr>
                    ))}
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
              {t("checklist.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10">
              {t("checklist.subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {checklistItems.map((item, i) => (
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
              {t("pullQuote")}
            </p>
          </div>
        </section>

        {/* ━━━ PLANNING YOUR ROUTE ━━━ */}
        <section id="planning-route" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("planning.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>For the gaps between matches, decide as a group whether you want a fan-tourism mode (explore the host cities, hit fan zones, watch other matches in bars) or a recovery mode (downtime, cheaper accommodation between hubs). <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">Run a poll</Link> — the choice changes which neighborhoods you stay in and what you book.</>
                : <>Pour les intervalles entre matchs, décide en groupe si tu veux un mode fan-touriste (explorer les villes hôtes, profiter des fan zones, regarder les autres matchs en bar) ou un mode récupération (temps mort, hébergement moins cher entre deux hubs). <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline font-semibold">Lance un sondage</Link> — le choix change le quartier où tu loges et ce que tu réserves.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Don&apos;t over-plan the knockout phase. Block tentative dates in your <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> for the round of 16, quarters and semis, but only book transport once the bracket fills. Buy refundable flights and reservable hotels for these legs — the few extra dollars are insurance against a group-stage exit.</>
                : <>Ne sur-planifie pas la phase à élimination directe. Bloque des dates indicatives dans ton <Link href={`/${locale}/features/itinerary`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> pour les huitièmes, quarts et demi, mais ne réserve le transport qu&apos;une fois le tableau rempli. Prends du remboursable pour ces tronçons — les quelques euros de plus sont une assurance contre une élimination en poules.</>}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p4")}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET TIPS ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("budget.title")}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Match tickets are the single biggest line item and they&apos;re paid by each fan individually through FIFA — keep them out of the shared pool entirely. The shared pool is for hotels, inter-city transport, group dinners, ride shares and fan-zone food. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and rotate who fronts each expense so the burden stays even.</>
                  : <>Les billets de match sont la plus grosse ligne et chaque fan les paie individuellement via la FIFA — garde-les hors du pot commun. Le pot commun, c&apos;est pour les hôtels, le transport inter-villes, les dîners de groupe, les VTC et la bouffe en fan zone. Mets en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et fais tourner qui avance chaque frais pour que la charge reste équilibrée.</>}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p2")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("budget.p3")}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ FAQ ━━━ */}
        <section id="faq" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[800px] mx-auto">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-10 text-center">
              {t("faq.title")}
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
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">{t("discover.title")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.roadTrip.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.roadTrip.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.roadTrip.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.groupGuide.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.groupGuide.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.groupGuide.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.bestApps.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.bestApps.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.bestApps.cta")}</span>
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
                {t("cta.title")}
              </h2>
              <p className="text-[#FFFBF5]/80 font-karla text-base lg:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("cta.subtitle")}
              </p>
              <div className="flex justify-center">
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=world-cup-2026&template=world-cup-2026`}>
                  <PulsatingButton className="font-karla font-bold">{t("cta.button")}</PulsatingButton>
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
