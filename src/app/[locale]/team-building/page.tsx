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
const PATHNAME = "/team-building";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "teamBuilding" });
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

export default async function TeamBuildingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("teamBuilding");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const typesItems = t.raw("types.items") as { title: string; desc: string; color: string }[];
  const helpsItems = t.raw("weplanifyHelps.items") as { title: string; desc: string; link: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];

  const breadcrumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "Team Building", item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19", dateModified: "2026-04-15",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })),
  };

  const howToLd = {
    "@context": "https://schema.org", "@type": "HowTo",
    name: t("jsonld.howToName"),
    description: t("jsonld.howToDescription"),
    totalTime: "PT90D",
    step: howToSteps.map((s, i) => ({
      "@type": "HowToStep",
      name: s.name,
      text: s.text,
      position: i + 1,
    })),
  };

  return (
    <>
      <AuthorJsonLd />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ HERO ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb items={[
                { label: t("breadcrumb.home"), href: `/${locale}` },
                { label: "Team Building" },
              ]} />
            </div>
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-6">
              {t("hero.tag")}
            </p>
            <h1 className="text-[#001E13] text-[38px] lg:text-[72px] font-londrina-solid leading-[1.02] mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-[#001E13]/70 text-lg lg:text-[22px] font-karla leading-[1.8] mb-6">
              {t("hero.intro")}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-31" />
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12 pb-8">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "why-fail", label: t("toc.whyFail") },
                { id: "types", label: t("toc.types") },
                { id: "pitch", label: t("toc.pitch") },
                { id: "weplanify-helps", label: t("toc.weplanifyHelps") },
                { id: "timeline", label: t("toc.timeline") },
                { id: "roi", label: t("toc.roi") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ WHY MOST TEAM TRIPS FAIL ━━━ */}
        <section id="why-fail" className="pb-16 lg:pb-24 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-8">
              {t("whyFail.title")}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("whyFail.p1")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>The fix isn&apos;t better activities — it&apos;s better process. When people <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">have a say</Link> in where they go and what they do, they show up with energy instead of obligation. When expenses are tracked transparently, there are no awkward reimbursement conversations. When the <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">schedule is visible to everyone</Link>, nobody shows up to the wrong lobby at the wrong time.</>
                  : <>La solution, ce n&apos;est pas de meilleures activités — c&apos;est un meilleur processus. Quand les gens <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">ont leur mot à dire</Link> sur où ils vont et ce qu&apos;ils font, ils arrivent avec de l&apos;énergie au lieu de l&apos;obligation. Quand les dépenses sont suivies de manière transparente, il n&apos;y a pas de conversations gênantes sur les remboursements. Quand le <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">planning est visible par tous</Link>, personne ne se trompe de hall d&apos;hôtel.</>}
              </p>
              <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
                {t("whyFail.p3")}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ TYPES OF TEAM TRIPS ━━━ */}
        <FadeIn>
          <section id="types" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("types.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {t("types.subtitle")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                {typesItems.map((type, i) => {
                  const isDark = type.color === "bg-[#F6391A]";
                  const isWhite = type.color === "bg-white";
                  const textColor = isDark ? "text-[#FFFBF5]" : "text-[#001E13]";
                  const descColor = isDark ? "text-[#FFFBF5]/70" : isWhite ? "text-[#001E13]/65" : "text-[#001E13]/70";
                  return (
                    <div key={i} className={`${type.color} rounded-[20px] lg:rounded-[28px] p-6 lg:p-8 ${isWhite ? "border border-[#001E13]/10" : ""}`}>
                      <h3 className={`${textColor} text-xl lg:text-2xl font-londrina-solid mb-3`}>{type.title}</h3>
                      <p className={`${descColor} text-sm lg:text-base font-karla leading-[1.8]`}>{type.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ HOW TO PITCH IT ━━━ */}
        <section id="pitch" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
              {t("pitch.title")}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("pitch.p1")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Come with a budget breakdown, not just a vague ask. Use WePlanify&apos;s <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">budget tracker</Link> to model costs per person across accommodation, transport, activities, and meals. Showing a transparent, itemized plan is infinitely more convincing than &quot;it&apos;ll cost around €500 per person, probably.&quot;</>
                  : <>Venez avec un budget détaillé, pas une demande vague. Utilisez le <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">suivi de budget</Link> WePlanify pour modéliser les coûts par personne (hébergement, transport, activités, repas). Montrer un plan transparent et détaillé est infiniment plus convaincant que « ça coûtera environ 500€ par personne, à peu près ».</>}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#EEF899] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {t("pullQuote")}
            </p>
          </div>
        </section>

        {/* ━━━ HOW WEPLANIFY HELPS ━━━ */}
        <section id="weplanify-helps" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {t("weplanifyHelps.title")}
            </h2>
            <div className="space-y-6">
              {helpsItems.map((item, i) => (
                <div key={i} className="flex gap-5 lg:gap-8 items-baseline">
                  <span className="text-[#F6391A] font-londrina-solid text-[28px] lg:text-[36px] leading-none flex-shrink-0 w-8 lg:w-10 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#001E13]/10 pt-5 flex-1">
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-1.5">
                      <Link href={`/${locale}${item.link}`} className="text-[#001E13] hover:underline underline-offset-4 no-underline">{item.title}</Link>
                    </h3>
                    <p className="text-[#001E13]/65 text-sm lg:text-base font-karla leading-[1.8]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ PLANNING TIMELINE ━━━ */}
        <FadeIn>
          <section id="timeline" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
                {t("timeline.title")}
              </h2>
              <div className="space-y-8">
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? <>Three months before the trip, start with the fundamentals: define the goals (is this about bonding, strategy, or celebrating?), set a rough budget range, and shortlist two or three destination ideas. Create a trip on WePlanify and invite the core organizers. Use <Link href={`/${locale}/features/polls`} className="text-[#EEF899] hover:underline underline-offset-4">polls</Link> to let the broader team weigh in on destination preferences early — this avoids the classic mistake of announcing a location nobody wanted.</>
                    : <>Trois mois avant le départ, posez les fondations : définissez les objectifs (cohésion, stratégie, célébration ?), fixez une fourchette de budget et présélectionnez deux ou trois idées de destinations. Créez un voyage sur WePlanify et invitez les organisateurs. Utilisez les <Link href={`/${locale}/features/polls`} className="text-[#EEF899] hover:underline underline-offset-4">sondages</Link> pour que l&apos;équipe donne son avis sur la destination dès le départ — vous éviterez ainsi l&apos;erreur classique d&apos;annoncer un lieu que personne ne voulait.</>}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn
                    ? <>One month out, lock in the big decisions: book accommodation, reserve group activities, and finalize travel logistics. Build the <Link href={`/${locale}/features/planning`} className="text-[#EEF899] hover:underline underline-offset-4">shared itinerary</Link> so everyone can see the day-by-day plan taking shape. This is also the time to gather dietary restrictions, accessibility needs, and travel preferences. The more you plan collaboratively now, the fewer fires you&apos;ll fight later. For a step-by-step approach, our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#EEF899] hover:underline underline-offset-4">group trip planning guide</Link> covers the full process.</>
                    : <>Un mois avant, verrouillez les grandes décisions : réservez l&apos;hébergement, bloquez les activités de groupe, finalisez la logistique transport. Construisez l&apos;<Link href={`/${locale}/features/planning`} className="text-[#EEF899] hover:underline underline-offset-4">itinéraire partagé</Link> pour que tout le monde voie le programme jour par jour prendre forme. C&apos;est aussi le moment de recueillir les régimes alimentaires, besoins d&apos;accessibilité et préférences de voyage. Plus vous planifiez à plusieurs maintenant, moins vous aurez de problèmes plus tard. Pour une approche détaillée, notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#EEF899] hover:underline underline-offset-4">guide d&apos;organisation de voyage de groupe</Link> couvre tout le processus.</>}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {t("timeline.p3")}
                </p>
                <p className="text-[#FFFBF5]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {t("timeline.p4")}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ MEASURING ROI ━━━ */}
        <section id="roi" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10">
              {t("roi.title")}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>The biggest blocker for team retreats isn&apos;t logistics — it&apos;s justifying the cost. To make a compelling case, measure what matters. Send a short team satisfaction survey before and after the retreat: rate your sense of connection with colleagues, cross-team <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">collaboration</Link> quality, and overall morale. The delta between those two snapshots is your clearest proof of impact.</>
                  : <>Le plus grand frein aux séminaires, ce n&apos;est pas la logistique — c&apos;est justifier le coût. Pour construire un argumentaire solide, mesurez ce qui compte. Envoyez un court sondage de satisfaction avant et après le séminaire : évaluez le sentiment de connexion entre collègues, la qualité de la <Link href={`/${locale}/features/collaboration`} className="text-[#F6391A] hover:underline underline-offset-4">collaboration</Link> inter-équipes et le moral général. L&apos;écart entre ces deux snapshots est votre preuve d&apos;impact la plus claire.</>}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Track collaboration metrics in the weeks that follow: are cross-team Slack threads more active? Are people scheduling more one-on-ones with colleagues they met at the retreat? Companies that measure retention rates find that teams with regular offsites have 15-25% lower voluntary turnover. That alone can offset the entire <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">cost of the trip</Link>.</>
                  : <>Suivez les métriques de collaboration dans les semaines qui suivent : les fils Slack inter-équipes sont-ils plus actifs ? Les gens prennent-ils plus de one-on-ones avec les collègues rencontrés au séminaire ? Les entreprises qui mesurent la rétention constatent que les équipes avec des offsites réguliers ont 15 à 25% de turnover volontaire en moins. Cela seul peut compenser la totalité du <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">coût du séminaire</Link>.</>}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn
                  ? <>Finally, document what worked and what didn&apos;t while it&apos;s fresh. Which activities sparked real conversation? Which felt forced? This post-retreat debrief becomes your playbook for next time — and strong evidence for leadership that the investment paid off. For inspiration on how other groups handle planning, check out our <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline underline-offset-4">roundup of the best group travel apps</Link>.</>
                  : <>Enfin, documentez ce qui a fonctionné et ce qui n&apos;a pas marché tant que c&apos;est frais. Quelles activités ont généré de vraies conversations ? Lesquelles semblaient forcées ? Ce débrief post-séminaire devient votre guide pour la prochaine fois — et une preuve solide pour la direction que l&apos;investissement a porté ses fruits. Pour voir comment d&apos;autres groupes gèrent leur organisation, consultez notre <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline underline-offset-4">comparatif des meilleures applis de voyage de groupe</Link>.</>}
              </p>
            </div>
          </div>
        </section>

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
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.roadTrip.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.roadTrip.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.roadTrip.cta")}</span>
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
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
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
