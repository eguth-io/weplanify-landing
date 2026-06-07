import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { AuthorBio, AuthorJsonLd } from "@/components/AuthorBio";

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const SITE_URL = "https://www.weplanify.com";
const PATHNAME_EN = "/blog/group-trip-budget";
const PATHNAME_FR = "/blog/budget-voyage-groupe";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogGroupTripBudget" });
  const pathname = locale === "fr" ? PATHNAME_FR : PATHNAME_EN;
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;
  const title = t("meta.title");
  const description = t("meta.description");

  return {
    title,
    description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${PATHNAME_EN}`,
        fr: `${SITE_URL}/fr${PATHNAME_FR}`,
        "x-default": `${SITE_URL}/en${PATHNAME_EN}`,
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Content types
// ---------------------------------------------------------------------------

type TocItem = { id: string; label: string };
type Section = { id: string; title: string; paragraphs: string[] };
type Category = { title: string; items: string[] };
type FaqItem = { q: string; a: string };

// ---------------------------------------------------------------------------
// JSON-LD Schemas
// ---------------------------------------------------------------------------

async function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blogGroupTripBudget" });
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("breadcrumb.home"),
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/${locale}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: t("breadcrumb.current"),
        item: `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function FaqJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blogGroupTripBudget" });
  const items = t.raw("faq.items") as FaqItem[];
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

async function ArticleJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blogGroupTripBudget" });
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: t("h1"),
    description: t("meta.description"),
    author: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "WePlanify",
      url: SITE_URL,
    },
    datePublished: "2026-04-15",
    dateModified: "2026-04-15",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}${locale === "fr" ? PATHNAME_FR : PATHNAME_EN}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default async function GroupTripBudgetPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogGroupTripBudget");

  const toc = t.raw("toc") as TocItem[];
  const moneyMess = t.raw("sections.moneyMess") as Section;
  const setBudgetEarly = t.raw("sections.setBudgetEarly") as Section;
  const splitByCategory = t.raw("sections.splitByCategory") as Section & {
    categories: Category[];
  };
  const onePayerSystem = t.raw("sections.onePayerSystem") as Section;
  const trackRealTime = t.raw("sections.trackRealTime") as Section;
  const unequalBudgets = t.raw("sections.unequalBudgets") as Section;
  const settlingUp = t.raw("sections.settlingUp") as Section;
  const faqItems = t.raw("faq.items") as FaqItem[];

  const [navData, navigationData, footerData]: [
    NavType,
    Navigation | null,
    FooterType | null,
  ] = await Promise.all([
    sanityFetch<NavType>({
      query: navQuery,
      params: { locale },
      tags: ["nav"],
    }),
    sanityFetch<Navigation>({
      query: navigationQuery,
      params: { locale },
      tags: ["navigation"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      params: { locale },
      tags: ["footer"],
    }),
  ]);

  return (
    <>
      <AuthorJsonLd />
      <BreadcrumbJsonLd locale={locale} />
      <FaqJsonLd locale={locale} />
      <ArticleJsonLd locale={locale} />

      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <header className="pt-[120px] lg:pt-[140px] pb-12 lg:pb-16 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="hidden lg:block mb-6">
              <Breadcrumb
                items={[
                  {
                    label: t("breadcrumb.home"),
                    href: `/${locale}`,
                  },
                  {
                    label: "Blog",
                    href: `/${locale}/blog`,
                  },
                  {
                    label: t("breadcrumb.current"),
                  },
                ]}
              />
            </div>
            <span className="inline-block bg-[#EEF899] text-[#001E13] text-sm font-karla font-semibold px-4 py-1.5 rounded-full mb-6">
              {t("heroTag")}
            </span>
            <h1 className="text-[#001E13] text-3xl lg:text-[44px] font-londrina-solid leading-tight mb-4">
              {t("h1")}
            </h1>
            <p className="text-[#001E13]/60 text-sm font-karla mb-6">
              {t("readTime")}
            </p>
            <p className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
              {t("intro")}
            </p>
          </div>
        </header>

        {/* Author */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <AuthorBio
            locale={locale}
            publishedDate="2026-04-15"
            modifiedDate="2026-04-15"
          />
        </div>

        {/* Table of Contents */}
        <nav aria-label={t("tocTitle")} className="py-10 lg:py-12 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-5">
              {t("tocTitle")}
            </h2>
            <ol className="space-y-2">
              {toc.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[#001E13]/70 hover:text-[#F6391A] font-karla text-sm lg:text-base transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* Article Sections */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">

            {/* Section 1: Why it gets messy */}
            <section id={moneyMess.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {moneyMess.title}
              </h2>
              <div className="space-y-4">
                {moneyMess.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2: Set budget early */}
            <section id={setBudgetEarly.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {setBudgetEarly.title}
              </h2>
              <div className="space-y-4">
                {setBudgetEarly.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 bg-[#EEF899]/40 border border-[#EEF899] rounded-2xl p-5">
                <p className="text-[#001E13]/80 text-sm font-karla leading-relaxed">
                  {t("pollsTip.text")}{" "}
                  <Link
                    href={`/${locale}/features/polls`}
                    className="text-[#F6391A] font-semibold hover:underline"
                  >
                    {t("pollsTip.link")} →
                  </Link>
                </p>
              </div>
            </section>

            {/* Section 3: Split by category */}
            <section id={splitByCategory.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {splitByCategory.title}
              </h2>
              <div className="space-y-4 mb-8">
                {splitByCategory.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {splitByCategory.categories.map((cat, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-base font-londrina-solid mb-4">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2">
                      {cat.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm font-karla leading-relaxed flex items-start gap-2"
                        >
                          <span className={`mt-0.5 flex-shrink-0 font-bold ${i === 0 ? "text-green-600" : "text-[#F6391A]"}`}>
                            {i === 0 ? "+" : "−"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: One-payer system */}
            <section id={onePayerSystem.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {onePayerSystem.title}
              </h2>
              <div className="space-y-4">
                {onePayerSystem.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 5: Track in real time */}
            <section id={trackRealTime.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {trackRealTime.title}
              </h2>
              <div className="space-y-4">
                {trackRealTime.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-6 bg-white border border-[#001E13]/10 rounded-2xl p-5">
                <p className="text-[#001E13]/80 text-sm font-karla leading-relaxed">
                  {t("trackerBox.text")}{" "}
                  <Link
                    href={`/${locale}/features/budget`}
                    className="text-[#F6391A] font-semibold hover:underline"
                  >
                    {t("trackerBox.link")} →
                  </Link>
                </p>
              </div>
            </section>

            {/* Section 6: Unequal budgets */}
            <section id={unequalBudgets.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {unequalBudgets.title}
              </h2>
              <div className="space-y-4">
                {unequalBudgets.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 7: Settling up */}
            <section id={settlingUp.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {settlingUp.title}
              </h2>
              <div className="space-y-4">
                {settlingUp.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

          </div>
        </article>

        {/* Divider */}
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* FAQ */}
        <section id="faq" className="py-12 lg:py-16 px-4 lg:px-8 bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid mb-8">
              {t("faq.title")}
            </h2>
            <div className="space-y-6">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="group border-b border-[#001E13]/10 pb-5"
                >
                  <summary className="flex items-start justify-between cursor-pointer list-none font-karla font-semibold text-[#001E13] text-base lg:text-lg">
                    <span className="pr-4">{item.q}</span>
                    <span className="text-[#F6391A] text-xl leading-none mt-0.5 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Discover More */}
        <section className="py-16 lg:py-20 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid text-center mb-10">
              {t("discoverMore.heading")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href={`/${locale}/features/budget`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.budget.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.budget.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("discoverMore.budget.link")} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.friends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.friends.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("readMore")} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/guides/plan-group-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.guide.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("readMore")} →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/alternatives/best-group-trip-planner-apps`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("discoverMore.apps.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("discoverMore.apps.text")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {t("readMore")} →
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-20 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="bg-[#F6391A] rounded-3xl p-8 lg:p-14">
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl font-londrina-solid mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-[#FFFBF5]/90 text-sm lg:text-base font-karla leading-relaxed mb-8 max-w-xl mx-auto">
                {t("cta.text")}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#001E13] hover:bg-[#001E13]/85 text-[#FFFBF5] font-karla font-bold text-sm lg:text-base px-8 py-3.5 rounded-full transition-colors"
              >
                {t("cta.button")}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
