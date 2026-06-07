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
const PATHNAME_FR = "/blog/organiser-evjf";
const PATHNAME_EN = "/blog/how-to-plan-bachelorette-party";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blogOrganiserEvjf" });
  const l = t.raw("meta") as { title: string; description: string };
  const pathname = locale === "fr" ? PATHNAME_FR : PATHNAME_EN;
  const currentUrl = `${SITE_URL}/${locale}${pathname}`;

  return {
    title: l.title,
    description: l.description,
    authors: [{ name: "WePlanify" }],
    openGraph: {
      type: "article",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title: l.title,
      description: l.description,
    },
    twitter: {
      card: "summary_large_image",
      title: l.title,
      description: l.description,
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
// Content
// ---------------------------------------------------------------------------

type ContentLocale = {
  readTime: string;
  heroTag: string;
  h1: string;
  intro: string;
  tocTitle: string;
  toc: { id: string; label: string }[];
  sections: {
    whyHard: {
      id: string;
      title: string;
      paragraphs: string[];
    };
    fourQuestions: {
      id: string;
      title: string;
      intro: string;
      questions: { title: string; text: string }[];
    };
    destinationTypes: {
      id: string;
      title: string;
      intro: string;
      types: { title: string; text: string; bestFor: string }[];
    };
    budgetConversation: {
      id: string;
      title: string;
      paragraphs: string[];
      tips: { title: string; text: string }[];
    };
    timeline: {
      id: string;
      title: string;
      intro: string;
      steps: { when: string; tasks: string[] }[];
    };
    activities: {
      id: string;
      title: string;
      paragraphs: string[];
      ideas: { category: string; items: string[] }[];
      outro: string;
    };
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
  cta: {
    title: string;
    text: string;
    button: string;
  };
  discoverMore: string;
  readMore: string;
};

// ---------------------------------------------------------------------------
// JSON-LD Schemas
// ---------------------------------------------------------------------------

async function BreadcrumbJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blogOrganiserEvjf" });
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
  const t = await getTranslations({ locale, namespace: "blogOrganiserEvjf" });
  const c = t.raw("content") as ContentLocale;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.items.map((item) => ({
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
  const t = await getTranslations({ locale, namespace: "blogOrganiserEvjf" });
  const c = t.raw("content") as ContentLocale;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.h1,
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

export default async function OrganiserEvjfPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("blogOrganiserEvjf");
  const c = t.raw("content") as ContentLocale;

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
              {c.heroTag}
            </span>
            <h1 className="text-[#001E13] text-3xl lg:text-[44px] font-londrina-solid leading-tight mb-4">
              {c.h1}
            </h1>
            <p className="text-[#001E13]/60 text-sm font-karla mb-6">
              {c.readTime}
            </p>
            <p className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
              {c.intro}
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
        <nav aria-label={c.tocTitle} className="py-10 lg:py-12 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-5">
              {c.tocTitle}
            </h2>
            <ol className="space-y-2">
              {c.toc.map((item) => (
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

        {/* Article body */}
        <article className="py-10 lg:py-14 px-4 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-16 lg:space-y-20">

            {/* Section 1: Why Hard */}
            <section id={c.sections.whyHard.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.whyHard.title}
              </h2>
              <div className="space-y-4">
                {c.sections.whyHard.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </section>

            {/* Section 2: Four Questions */}
            <section id={c.sections.fourQuestions.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.fourQuestions.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.fourQuestions.intro}
              </p>
              <div className="grid gap-4">
                {c.sections.fourQuestions.questions.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {t("links.fourQuestions.before")}
                <Link
                  href={`/${locale}/features/polls`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {t("links.fourQuestions.linkText")}
                </Link>
                {t("links.fourQuestions.after")}
              </p>
            </section>

            {/* Section 3: Destination Types */}
            <section id={c.sections.destinationTypes.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.destinationTypes.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.destinationTypes.intro}
              </p>
              <div className="space-y-6">
                {c.sections.destinationTypes.types.map((type, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8"
                  >
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-3">
                      {type.title}
                    </h3>
                    <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-4">
                      {type.text}
                    </p>
                    <p className="text-[#F6391A] font-karla font-bold text-sm">
                      {t("destinationBestForLabel")}
                      <span className="text-[#001E13]/70 font-normal">
                        {type.bestFor}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {t("links.destinationTypes.before")}
                <Link
                  href={`/${locale}/bachelorette-trip`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {t("links.destinationTypes.linkText")}
                </Link>
                {t("links.destinationTypes.after")}
              </p>
            </section>

            {/* Section 4: Budget */}
            <section id={c.sections.budgetConversation.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.budgetConversation.title}
              </h2>
              <div className="space-y-4 mb-8">
                {c.sections.budgetConversation.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid gap-4">
                {c.sections.budgetConversation.tips.map((tip, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-[#001E13]/70 text-sm lg:text-base font-karla leading-relaxed">
                      {tip.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {t("links.budget.before")}
                <Link
                  href={`/${locale}/features/budget`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {t("links.budget.linkText")}
                </Link>
                {t("links.budget.after")}
              </p>
            </section>

            {/* Section 5: Timeline */}
            <section id={c.sections.timeline.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.timeline.title}
              </h2>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed mb-8">
                {c.sections.timeline.intro}
              </p>
              <div className="space-y-6">
                {c.sections.timeline.steps.map((step, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 lg:p-8"
                  >
                    <h3 className="text-[#001E13] text-xl font-londrina-solid mb-4">
                      {step.when}
                    </h3>
                    <ul className="space-y-2">
                      {step.tasks.map((task, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm lg:text-base font-karla flex items-start gap-3"
                        >
                          <span className="text-[#F6391A] mt-0.5 flex-shrink-0 font-bold">
                            ·
                          </span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 6: Activities */}
            <section id={c.sections.activities.id}>
              <h2 className="text-[#001E13] text-2xl lg:text-3xl font-londrina-solid leading-tight mb-6">
                {c.sections.activities.title}
              </h2>
              <div className="space-y-4 mb-8">
                {c.sections.activities.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className="text-[#001E13]/80 text-base font-karla leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {c.sections.activities.ideas.map((category, i) => (
                  <div
                    key={i}
                    className="bg-white border border-[#001E13]/10 rounded-2xl p-6"
                  >
                    <h3 className="text-[#001E13] text-lg font-londrina-solid mb-4">
                      {category.category}
                    </h3>
                    <ul className="space-y-2">
                      {category.items.map((item, j) => (
                        <li
                          key={j}
                          className="text-[#001E13]/70 text-sm font-karla flex items-start gap-2"
                        >
                          <span className="text-[#F6391A] mt-0.5 flex-shrink-0">
                            +
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-[#001E13]/80 text-base font-karla leading-relaxed">
                {c.sections.activities.outro}
              </p>
              <p className="mt-4 text-[#001E13]/70 text-sm font-karla leading-relaxed">
                {t("links.activities.before")}
                <Link
                  href={`/${locale}/features/packing`}
                  className="text-[#F6391A] font-semibold hover:underline"
                >
                  {t("links.activities.linkText")}
                </Link>
                {t("links.activities.after")}
              </p>
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
              {c.faq.title}
            </h2>
            <div className="space-y-6">
              {c.faq.items.map((item, i) => (
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
              {c.discoverMore}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href={`/${locale}/bachelorette-trip`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("cards.bachelorette.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("cards.bachelorette.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link href={`/${locale}/trip-with-friends`} className="group">
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("cards.friends.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("cards.friends.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/guides/plan-group-trip`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("cards.guide.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("cards.guide.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
                  </span>
                </div>
              </Link>
              <Link
                href={`/${locale}/alternatives/best-group-trip-planner-apps`}
                className="group"
              >
                <div className="bg-white border border-[#001E13]/10 rounded-[24px] p-6 hover:shadow-lg transition-shadow duration-300 h-full">
                  <h3 className="text-lg font-londrina-solid text-[#001E13] mb-2">
                    {t("cards.alternatives.title")}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm leading-relaxed mb-4">
                    {t("cards.alternatives.desc")}
                  </p>
                  <span className="text-[#F6391A] font-karla font-bold text-sm group-hover:underline">
                    {c.readMore} →
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
                {c.cta.title}
              </h2>
              <p className="text-[#FFFBF5]/90 text-sm lg:text-base font-karla leading-relaxed mb-8 max-w-xl mx-auto">
                {c.cta.text}
              </p>
              <Link
                href="https://app.weplanify.com"
                className="inline-block bg-[#001E13] hover:bg-[#001E13]/85 text-[#FFFBF5] font-karla font-bold text-sm lg:text-base px-8 py-3.5 rounded-full transition-colors"
              >
                {c.cta.button}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
