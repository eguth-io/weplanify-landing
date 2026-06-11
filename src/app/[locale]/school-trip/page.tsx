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
const PATHNAME = "/school-trip";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "schoolTrip" });
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

export default async function SchoolTripPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === "en";
  const t = await getTranslations("schoolTrip");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const anatomyItems = t.raw("anatomy.items") as { stop: string; desc: string; link: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];
  const howToSteps = t.raw("jsonld.howToSteps") as { name: string; text: string }[];
  const howToStepUrls: (string | null)[] = [
    `${SITE_URL}/${locale}${PATHNAME}#approval`,
    `${SITE_URL}/${locale}/features/planning`,
    null,
    `${SITE_URL}/${locale}/features/polls`,
    `${SITE_URL}/${locale}/features/packing`,
    null,
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
    datePublished: "2026-05-05", dateModified: "2026-05-05",
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/${locale}${PATHNAME}` },
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
    totalTime: "PT60M",
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
                ? <>Permission slips. Dietary needs. Emergency contacts. Headcounts. Three different parent emails about the same activity. Organizing a school trip turns one teacher into a part-time logistics manager — and the spreadsheet always lags reality. There&apos;s a better way to coordinate it. If you&apos;re also weighing tools, see our take on the <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">best group travel apps</Link>.</>
                : <>Autorisations parentales. Régimes alimentaires. Contacts d&apos;urgence. Effectifs. Trois mails de parents différents sur la même activité. Organiser un voyage scolaire transforme un enseignant en logisticien à temps partiel — et le tableur retarde toujours sur la réalité. Il existe une meilleure façon de coordonner tout ça. Si vous comparez aussi les outils, voyez notre avis sur les <Link href={`/${locale}/alternatives/best-group-trip-planner-apps`} className="text-[#F6391A] hover:underline font-semibold">meilleures applis de voyage en groupe</Link>.</>}
            </p>
            <p className="text-[#001E13]/50 text-sm font-karla mb-6">{t("hero.readTime")}</p>
            <AuthorBio locale={locale} publishedDate="2026-05-05" modifiedDate="2026-05-05" />
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
                { id: "approval", label: t("toc.approval") },
                { id: "logistics", label: t("toc.logistics") },
                { id: "parent-comms", label: t("toc.parentComms") },
                { id: "safety", label: t("toc.safety") },
                { id: "faq", label: t("toc.faq") },
              ]}
            />
          </div>
        </section>

        {/* ━━━ APPROVAL ━━━ */}
        <section id="approval" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("approval.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("approval.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {isEn
                ? <>Once approval is in hand, build the trip in a <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">shared itinerary</Link> immediately — even before the booking is confirmed. Treat it as a living document. As you lock in transport, accommodation and activities, the plan fills in. The day approval lands in your inbox is the day the trip stops being a vague idea and starts being an organized object.</>
                : <>Une fois l&apos;autorisation obtenue, construisez le voyage dans un <Link href={`/${locale}/features/planning`} className="text-[#F6391A] hover:underline font-semibold">itinéraire partagé</Link> immédiatement — même avant que les réservations soient confirmées. Traitez-le comme un document vivant. Au fur et à mesure que vous bloquez transport, hébergement et activités, le plan se remplit. Le jour où l&apos;autorisation tombe dans votre boîte est le jour où le voyage cesse d&apos;être une idée vague pour devenir un objet organisé.</>}
            </p>
          </div>
        </section>

        {/* ━━━ ANATOMY ━━━ */}
        <FadeIn>
          <section id="logistics" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[1000px] mx-auto">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("anatomy.title")}
              </h2>
              <p className="text-[#FFFBF5]/50 font-karla text-base lg:text-lg mb-14 max-w-[600px]">
                {t("anatomy.subtitle")}
              </p>
              <div className="space-y-12">
                {anatomyItems.map((item, i) => (
                  <div key={i} className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 items-start">
                    <h3 className="text-[#EEF899] text-2xl lg:text-3xl font-londrina-solid">
                      {String(i + 1).padStart(2, "0")} — {item.stop}
                    </h3>
                    <p className="text-[#FFFBF5]/75 text-lg font-karla leading-[1.8]">
                      {item.desc}{" "}
                      <Link href={`/${locale}${item.link}`} className="text-[#EEF899] hover:underline font-semibold">
                        {t("anatomy.learnMore")}
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ━━━ PARENT COMMS ━━━ */}
        <section id="parent-comms" className="py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
          <div className="max-w-[900px] mx-auto space-y-8">
            <h2 className="text-[#001E13] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
              {t("parentComms.title")}
            </h2>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("parentComms.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
              {t("parentComms.p2")}
            </p>
          </div>
        </section>

        {/* ━━━ SAFETY ━━━ */}
        <FadeIn>
          <section id="safety" className="bg-[#001E13] py-20 lg:py-28 px-6 lg:px-12 scroll-mt-24">
            <div className="max-w-[900px] mx-auto space-y-8">
              <h2 className="text-[#FFFBF5] text-[28px] lg:text-[48px] font-londrina-solid leading-[1.08] mb-4">
                {t("safety.title")}
              </h2>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("safety.p1")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("safety.p2")}
              </p>
              <p className="text-[#FFFBF5]/65 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("safety.p3")}
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
                <details key={i} className="group bg-[#FFFBF5] border border-[#001E13]/10 rounded-2xl px-6 py-4">
                  <summary className="cursor-pointer list-none flex justify-between items-start gap-4">
                    <span className="text-[#001E13] font-londrina-solid text-lg lg:text-xl">{item.q}</span>
                    <span className="text-[#F6391A] text-2xl flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="text-[#001E13]/75 font-karla text-base lg:text-lg leading-[1.7] mt-4">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ DISCOVER MORE ━━━ */}
        <section className="py-20 lg:py-28 px-6 lg:px-12 bg-[#FFFBF5]">
          <div className="max-w-[1100px] mx-auto">
            <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-10">
              {t("discover.title")}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href={`/${locale}/team-building`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {t("discover.teamBuilding.title")}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{t("discover.teamBuilding.desc")}</p>
              </Link>
              <Link href={`/${locale}/family-trip`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {t("discover.familyTrip.title")}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{t("discover.familyTrip.desc")}</p>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {t("discover.groupGuide.title")}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{t("discover.groupGuide.desc")}</p>
              </Link>
              <Link href={`/${locale}/alternatives`} className="bg-white border border-[#001E13]/10 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg lg:text-xl font-londrina-solid text-[#001E13] mb-2">
                  {t("discover.appComparison.title")}
                </h3>
                <p className="text-[#001E13]/70 font-karla text-sm">{t("discover.appComparison.desc")}</p>
              </Link>
            </div>
          </div>
        </section>

        {/* ━━━ CTA ━━━ */}
        <section className="bg-[#F6391A] py-20 lg:py-28 px-6 lg:px-12 mx-3 lg:mx-[60px] rounded-[24px] lg:rounded-[40px] mb-6">
          <div className="max-w-[800px] mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-[#FFFBF5]/90 font-karla text-base lg:text-lg mb-8">
              {t("cta.subtitle")}
            </p>
            <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} rel="nofollow">
              <PulsatingButton className="font-karla font-bold">
                {t("cta.button")}
              </PulsatingButton>
            </Link>
          </div>
        </section>

      </main>

      <Footer footerData={footerData} />
    </>
  );
}
