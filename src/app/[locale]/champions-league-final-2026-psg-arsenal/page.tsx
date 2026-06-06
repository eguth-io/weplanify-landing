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
  const t = await getTranslations({ locale, namespace: "championsLeague2026" });
  const title = t("meta.title");
  const description = t("meta.description");
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
  const t = await getTranslations("championsLeague2026");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const matchItems = t.raw("theMatch.items") as { stop: string; desc: string }[];
  const psgItems = t.raw("roads.psgItems") as string[];
  const arsenalItems = t.raw("roads.arsenalItems") as string[];
  const budapestRows = t.raw("budapest.rows") as { topic: string; info: string }[];
  const matchDayItems = t.raw("matchDay.items") as string[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls = [
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/itinerary`,
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
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-05-10", dateModified: "2026-06-02",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const teams = [
    { "@type": "SportsTeam", name: "Paris Saint-Germain", url: "https://www.psg.fr" },
    { "@type": "SportsTeam", name: "Arsenal FC", url: "https://www.arsenal.com" },
  ];
  const sportsEventLd = {
    "@context": "https://schema.org",
    "@type": "SportsEvent",
    name: t("jsonld.eventName"),
    description: t("jsonld.eventDescription"),
    image: [`${SITE_URL}/header-bg.webp`],
    startDate: "2026-05-30T18:00+02:00",
    endDate: "2026-05-30T20:00+02:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    sport: "Association football",
    organizer: { "@type": "Organization", name: "UEFA", url: "https://www.uefa.com" },
    performer: teams,
    competitor: teams,
    location: {
      "@type": "Place",
      name: "Puskás Aréna",
      address: { "@type": "PostalAddress", addressLocality: "Budapest", addressCountry: "HU" },
    },
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
    totalTime: "PT45M",
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

        {/* ━━━ RESULT BANNER (post-match) ━━━ */}
        <section className="pt-[96px] lg:pt-[120px] px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-[#001E13] rounded-[20px] lg:rounded-[24px] px-5 py-4 lg:px-8 lg:py-5 flex items-start gap-3">
              <span className="text-[#61DBD5] text-lg lg:text-xl leading-none mt-0.5">&#x2713;</span>
              <p className="text-[#FFFBF5]/85 font-karla text-sm lg:text-base leading-[1.7]">
                {isEn
                  ? <><span className="font-bold text-[#FFFBF5]">Played — Saturday 30 May 2026.</span> PSG retained the title, beating Arsenal 1–1 (4–3 on penalties after extra time) at the Puskás Aréna. We&apos;re keeping this guide online as a reusable playbook — the Budapest, budget and group-logistics tips below still apply to your next match-day trip.</>
                  : <><span className="font-bold text-[#FFFBF5]">Joué — samedi 30 mai 2026.</span> Le PSG a conservé son titre en battant Arsenal 1–1 (4–3 aux tirs au but après prolongation) à la Puskás Aréna. On garde ce guide en ligne comme playbook réutilisable — les conseils Budapest, budget et logistique de groupe ci-dessous restent valables pour votre prochain déplacement.</>}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ HERO ━━━ */}
        <section className="pt-10 lg:pt-16 pb-16 lg:pb-24 px-6 lg:px-12">
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
                ? <>Saturday 30 May 2026, 18:00 CET, Puskás Aréna. PSG retained its European crown, beating Arsenal 1–1 (4–3 on penalties after extra time): Kai Havertz struck early for Arsenal, Ousmane Dembélé levelled from the spot, and Gabriel Magalhães saw the decisive penalty saved. Arsenal&apos;s first Champions League final since 2006 ended in heartbreak. This guide stays up as the complete playbook — the match, the venue, the journey to Budapest, and how to organise a football trip with your crew without losing the group at the after-party. Picking your tools for the next one? See our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparison of group travel apps</Link>.</>
                : <>Samedi 30 mai 2026, 18h00, Puskás Aréna. Le PSG a conservé son titre européen en battant Arsenal 1–1 (4–3 aux tirs au but après prolongation) : Kai Havertz a ouvert tôt le score pour Arsenal, Ousmane Dembélé a égalisé sur pénalty, et Gabriel Magalhães a vu son tir au but décisif arrêté. La première finale de C1 d&apos;Arsenal depuis 2006 s&apos;est terminée dans la douleur. Ce guide reste en ligne comme playbook complet — le match, le stade, le voyage à Budapest et l&apos;organisation entre potes, pour ne perdre personne à l&apos;after. Vous préparez le prochain déplacement ? Jetez un œil à notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">comparatif d&apos;applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-10" modifiedDate="2026-05-10" />
          </div>
        </section>

        {/* ━━━ KEY FACTS BOX ━━━ */}
        <section className="pb-16 lg:pb-20 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <div className="bg-white border border-[#001E13]/8 rounded-[24px] lg:rounded-[32px] p-6 lg:p-10">
              <h2 className="text-[#001E13]/40 font-karla text-xs lg:text-sm uppercase tracking-[0.2em] mb-6">
                {t("facts.heading")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.dateLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">{t("facts.dateValue")}</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">2026</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.kickoffLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">18:00</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">CET / Paris</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.venueLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">Puskás Aréna</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">Budapest, HU</p>
                </div>
                <div>
                  <p className="text-[#001E13]/50 font-karla text-xs uppercase tracking-wider mb-1">{t("facts.resultLabel")}</p>
                  <p className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl">1–1</p>
                  <p className="text-[#001E13]/60 font-karla text-sm">{t("facts.resultSub")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ THE STAKES ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto space-y-8">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("stakes.p1")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("stakes.p2")}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "the-match", label: t("toc.theMatch") },
                { id: "roads-to-final", label: t("toc.roads") },
                { id: "tickets", label: t("toc.tickets") },
                { id: "budapest", label: t("toc.budapest") },
                { id: "planning", label: t("toc.planning") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ THE MATCH ━━━ */}
        <FadeIn>
          <section id="the-match" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("theMatch.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[700px]">
                {t("theMatch.subtitle")}
              </p>

              <div className="space-y-0">
                {matchItems.map((item, i) => (
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
              {t("roads.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-12 max-w-[700px]">
              {t("roads.subtitle")}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              {/* PSG card */}
              <div className="bg-[#001E13] rounded-[24px] p-8 lg:p-10">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("roads.psgLabel")}</p>
                <h3 className="text-[#FFFBF5] text-3xl lg:text-4xl font-londrina-solid mb-6">Paris Saint-Germain</h3>
                <ul className="space-y-3 text-[#FFFBF5]/70 font-karla text-sm lg:text-base leading-[1.7]">
                  {psgItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Arsenal card */}
              <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-8 lg:p-10">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("roads.arsenalLabel")}</p>
                <h3 className="text-[#001E13] text-3xl lg:text-4xl font-londrina-solid mb-6">Arsenal FC</h3>
                <ul className="space-y-3 text-[#001E13]/70 font-karla text-sm lg:text-base leading-[1.7]">
                  {arsenalItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ━━━ TICKETS & FAN ZONE ━━━ */}
        <section id="tickets" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24 bg-[#FFFBF5]">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("tickets.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("tickets.subtitle")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.channel1.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.channel1.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.channel1.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.channel2.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.channel2.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.channel2.desc")}
                </p>
              </div>
              <div className="bg-white border border-[#001E13]/10 rounded-2xl p-6">
                <p className="font-nanum-pen text-[#F6391A] text-base mb-2">{t("tickets.channel3.tag")}</p>
                <h3 className="text-[#001E13] font-londrina-solid text-xl mb-3">{t("tickets.channel3.title")}</h3>
                <p className="text-[#001E13]/70 font-karla text-sm leading-[1.7]">
                  {t("tickets.channel3.desc")}
                </p>
              </div>
            </div>

            <div className="mt-12 bg-[#EEF899] rounded-[24px] p-6 lg:p-10">
              <h3 className="text-[#001E13] font-londrina-solid text-2xl lg:text-3xl mb-3">
                {t("tickets.noTicketTitle")}
              </h3>
              <p className="text-[#001E13]/80 font-karla text-base lg:text-lg leading-[1.7]">
                {t("tickets.noTicketDesc")}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ BUDAPEST PRACTICAL ━━━ */}
        <section id="budapest" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[1000px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("budapest.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10 max-w-[700px]">
              {t("budapest.subtitle")}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left font-karla text-sm lg:text-base">
                <thead>
                  <tr className="border-b-2 border-[#001E13]/15">
                    <th className="py-2 pr-4 text-[#001E13] font-semibold">{t("budapest.topicHeader")}</th>
                    <th className="py-2 text-[#001E13] font-semibold">{t("budapest.infoHeader")}</th>
                  </tr>
                </thead>
                <tbody className="text-[#001E13]/75">
                  {budapestRows.map((row, i) => (
                    <tr key={i} className={i < budapestRows.length - 1 ? "border-b border-[#001E13]/8" : undefined}>
                      <td className="py-2 pr-4 font-semibold">{row.topic}</td>
                      <td className="py-2">{row.info}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ━━━ MATCH DAY CHECKLIST ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("matchDay.title")}
            </h2>
            <p className="text-[#001E13]/60 font-karla text-base lg:text-lg mb-10">
              {t("matchDay.subtitle")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {matchDayItems.map((item, i) => (
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

        {/* ━━━ PLANNING THE TRIP ━━━ */}
        <section id="planning" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("planning.title")}
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
              {t("planning.p3")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("planning.p4")}
            </p>
          </div>
        </section>

        {/* ━━━ BUDGET ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("budget.title")}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Match tickets are bought individually through UEFA or the clubs and stay individual — keep them out of the shared pool entirely. The shared pool is for flights, hotel, ground transport, group dinners and fan-zone food. Set up a <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">shared budget tracker</Link> with one category per cost type, and rotate who fronts each expense so nobody ends up the de-facto group treasurer.</>
                  : <>Les billets de match sont achetés individuellement via UEFA ou les clubs et restent individuels — gardez-les hors du pot commun. Le pot commun, c&apos;est pour les vols, l&apos;hôtel, le transport sur place, les dîners de groupe et la fan zone. Mettez en place un <Link href={`/${locale}/features/budget`} className="text-[#EEF899] hover:underline font-semibold">suivi de budget partagé</Link> avec une catégorie par type de dépense, et faites tourner qui avance chaque frais pour que personne ne devienne le trésorier de fait du groupe.</>}
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
              <Link href={`/${locale}/world-cup-2026-trip-planner`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.worldCup.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.worldCup.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.worldCup.cta")}</span>
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
              <Link href={`/${locale}/blog/group-trip-budget`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.groupBudget.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.groupBudget.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.groupBudget.cta")}</span>
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
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=event-archive&utm_campaign=ucl-final-2026`}>
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
