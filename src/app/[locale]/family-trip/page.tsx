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

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/family-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "familyTrip" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    ...metadata,
    title,
    description,
    authors: [{ name: "Alex Martin" }],
    openGraph: { ...metadata.openGraph, type: "article", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: {
      canonical: currentUrl,
      languages: { en: `${SITE_URL}/en${PATHNAME}`, fr: `${SITE_URL}/fr${PATHNAME}`, "x-default": `${SITE_URL}/en${PATHNAME}` },
    },
  };
}

export default async function FamilyTripPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("familyTrip");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const byAgeItems = t.raw("byAge.items") as { age: string; title: string; text: string; color: string }[];
  const howHelpsItems = t.raw("howHelps.items") as { title: string; desc: string; link: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("jsonld.articleHeadline"),
    author: { "@type": "Person", name: "Alex Martin", jobTitle: "Travel Editor" },
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    datePublished: "2026-03-19",
    dateModified: "2026-03-31",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
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
              {t("hero.intro")}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">
              {t("hero.readTime")}
            </p>
            <AuthorBio locale={locale} publishedDate="2026-03-19" modifiedDate="2026-03-31" />
          </div>
        </section>

        {/* ━━━ THE CHALLENGE ━━━ */}
        <section className="pb-16 lg:pb-24 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {t("challenge.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {t("challenge.p2")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("challenge.p3")}
            </p>
            <p className="text-[#001E13]/70 text-base font-karla leading-[1.8] mt-6">
              {isEn ? (
                <>Need a structured approach? Our <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] hover:underline underline-offset-4">step-by-step guide to planning a group trip</Link> covers the full process from first idea to departure day.</>
              ) : (
                <>Besoin d&apos;une méthode structurée ? Notre <Link href={`/${locale}/guides/plan-group-trip`} className="text-[#F6391A] hover:underline underline-offset-4">guide étape par étape pour organiser un voyage de groupe</Link> couvre tout le processus, de la première idée au jour du départ.</>
              )}
            </p>
          </div>
        </section>

        {/* ━━━ TABLE OF CONTENTS ━━━ */}
        <section className="px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <ArticleTOC
              title={t("toc.title")}
              items={[
                { id: "by-age", label: t("toc.byAge") },
                { id: "how-weplanify-helps", label: t("toc.howHelps") },
                { id: "destination", label: t("toc.destination") },
                { id: "budget", label: t("toc.budget") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ PLANNING BY AGE GROUP ━━━ */}
        <FadeIn>
          <section id="by-age" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-12 lg:mb-16">
                {t("byAge.title")}
              </h2>
              <div className="space-y-10 lg:space-y-14">
                {byAgeItems.map((group, i) => (
                  <div key={i} className="flex gap-5 lg:gap-8 items-start">
                    <div className={`${group.color} w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <span className="text-[#001E13] text-sm lg:text-base font-londrina-solid">{group.age}</span>
                    </div>
                    <div>
                      <h3 className="text-[#FFFBF5] text-xl lg:text-2xl font-londrina-solid mb-2">{group.title}</h3>
                      <p className="text-[#FFFBF5]/60 text-sm lg:text-base font-karla leading-[1.8]">{group.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ HOW WEPLANIFY HELPS ━━━ */}
        <section id="how-weplanify-helps" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {t("howHelps.title")}
            </h2>
            <div className="space-y-6">
              {howHelpsItems.map((item, i) => (
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

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#EEF899] py-16 lg:py-24 px-6 lg:px-12">
          <div className="max-w-[1000px] mx-auto">
            <p className="text-[#001E13] text-[24px] lg:text-[44px] font-londrina-solid leading-[1.12]">
              {t("pullQuote")}
            </p>
          </div>
        </section>

        {/* ━━━ CHOOSING THE RIGHT DESTINATION ━━━ */}
        <section id="destination" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {t("destination.title")}
            </h2>
            <div className="space-y-6">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("destination.p1")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("destination.p2")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("destination.p3")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {isEn ? (
                  <>Finally, prioritize destinations that offer activities for all ages. A beach resort with nearby hiking trails, cultural sites, and a town centre gives everyone options without requiring a car for every outing. When the destination itself is versatile, the <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline underline-offset-4">day-by-day planning</Link> becomes much easier — and there are fewer arguments about what to do. If you can&apos;t agree on the destination itself, <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">group polls</Link> take the pressure off and let everyone weigh in fairly.</>
                ) : (
                  <>Enfin, privilégiez les destinations qui proposent des activités pour tous les âges. Une station balnéaire avec des sentiers de randonnée à proximité, des sites culturels et un centre-ville offre des options à chacun sans nécessiter une voiture pour chaque sortie. Quand la destination elle-même est polyvalente, la <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline underline-offset-4">planification jour par jour</Link> devient bien plus simple — et il y a moins de disputes sur le programme. Si vous n&apos;arrivez pas à vous mettre d&apos;accord sur la destination, les <Link href={`/${locale}/features/polls`} className="text-[#F6391A] hover:underline underline-offset-4">sondages de groupe</Link> désamorcent la pression et permettent à chacun de s&apos;exprimer.</>
                )}
              </p>
            </div>
          </div>
        </section>

        {/* ━━━ BUDGETING A MULTI-GENERATIONAL TRIP ━━━ */}
        <FadeIn>
          <section id="budget" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
                {t("budget.title")}
              </h2>
              <div className="space-y-6">
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {t("budget.p1")}
                </p>
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn ? (
                    <>Start by separating shared costs from personal ones. Accommodation and transport are usually split equally (or proportionally by household size). Meals can go either way — some families prefer a shared food kitty, others pay separately. Activities should be opt-in: don&apos;t force the grandparents to pay for the zip-lining they&apos;ll never do. A <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">shared budget tracker</Link> makes these splits transparent and avoids the dreaded end-of-trip reckoning.</>
                  ) : (
                    <>Commencez par séparer les frais communs des dépenses personnelles. L&apos;hébergement et le transport se partagent généralement à parts égales (ou proportionnellement à la taille du foyer). Les repas, ça dépend — certaines familles préfèrent une cagnotte commune, d&apos;autres paient séparément. Les activités devraient être optionnelles : n&apos;obligez pas les grands-parents à payer la tyrolienne qu&apos;ils ne feront jamais. Un <Link href={`/${locale}/features/budget`} className="text-[#F6391A] hover:underline underline-offset-4">suivi de budget partagé</Link> rend ces répartitions transparentes et évite le règlement de comptes redouté en fin de voyage.</>
                  )}
                </p>
                <p className="text-[#FFFBF5]/70 text-lg lg:text-[22px] font-karla leading-[1.8]">
                  {isEn ? (
                    <>One approach that works well for multi-generational trips: let each household set their own comfort level, then find overlap. If grandparents want a nicer room, they pay the difference. If parents want to cook half the meals to save money, build that into the itinerary. The goal isn&apos;t to make everyone spend the same — it&apos;s to make sure nobody feels resentful. For a deeper look at how other groups handle this, check out our article on the <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline underline-offset-4">best apps for group travel planning</Link>.</>
                  ) : (
                    <>Une approche qui fonctionne bien pour les voyages multi-générations : laissez chaque foyer définir son niveau de confort, puis trouvez le terrain d&apos;entente. Si les grands-parents veulent une plus belle chambre, ils paient la différence. Si les parents veulent cuisiner la moitié des repas pour économiser, intégrez ça dans le programme. L&apos;objectif n&apos;est pas que tout le monde dépense pareil — c&apos;est que personne ne se sente lésé. Pour aller plus loin sur la façon dont d&apos;autres groupes gèrent ça, consultez notre article sur les <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline underline-offset-4">meilleures applications de voyage en groupe</Link>.</>
                  )}
                </p>
              </div>
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
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {t("discover.title")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.tripWithFriends.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.tripWithFriends.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.tripWithFriends.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/road-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.roadTrip.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.roadTrip.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.roadTrip.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">{t("discover.groupGuide.title")}</h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">{t("discover.groupGuide.desc")}</p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">{t("discover.groupGuide.cta")}</span>
                </div>
              </Link>
              <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8 hover:shadow-lg transition-shadow duration-300 h-full">
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
