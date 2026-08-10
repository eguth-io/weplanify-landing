import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { generateMetadataFromSanity } from "@/lib/metadata";
import { routing } from "@/i18n/routing";
import FadeIn from "@/components/FadeIn";
import ItineraryPreview from "@/components/ai-trip-planner/ItineraryPreview";

type Props = { params: Promise<{ locale: string }> };
const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/ai-trip-planner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, PATHNAME);
  const t = await getTranslations({ locale, namespace: "aiTripPlanner" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;
  return {
    ...metadata,
    title,
    description,
    openGraph: { ...metadata.openGraph, type: "website", title, description, url: currentUrl },
    twitter: { ...metadata.twitter, title, description },
    alternates: {
      canonical: currentUrl,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `${SITE_URL}/${l}${PATHNAME}`])),
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

export default async function AiTripPlannerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aiTripPlanner");

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const steps = t.raw("how.steps") as { title: string; body: string }[];
  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.current"), item: `${SITE_URL}/${locale}${PATHNAME}` },
    ],
  };

  // WebPage, not Article: this is a product page, and marking it up as an
  // authored article means claiming a byline it doesn't have.
  const pageLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("meta.title"),
    description: t("meta.description"),
    url: `${SITE_URL}/${locale}${PATHNAME}`,
    publisher: { "@type": "Organization", name: "WePlanify", url: SITE_URL },
    inLanguage: locale,
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

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t("how.title"),
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.body,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">
        {/* Hero — the copy claims the planner turns a sentence into a day-by-day
            itinerary, so the itinerary sits right next to the claim. */}
        <section className="pt-[140px] lg:pt-[180px] pb-10 lg:pb-14 px-6 lg:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="hidden lg:block mb-8">
              <Breadcrumb
                items={[
                  { label: t("breadcrumb.home"), href: `/${locale}` },
                  { label: t("breadcrumb.current") },
                ]}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-14 items-center">
              <div>
                <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-3">{t("hero.tag")}</p>
                <h1 className="font-londrina-solid text-[#001E13] text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-tight mb-5 whitespace-pre-line">
                  {t("hero.title")}
                </h1>
                <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed mb-8">
                  {t("hero.subtitle")}
                </p>
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                  <PulsatingButton className="font-karla font-bold">{t("hero.cta")}</PulsatingButton>
                </Link>
              </div>

              <ItineraryPreview />
            </div>
          </div>
        </section>

        {/* Quick answer — self-contained, extractable, ahead of the narrative (WP-137). */}
        <section className="max-w-3xl mx-auto px-6 lg:px-12 pt-8">
          <div className="rounded-2xl border border-[#001E13]/10 bg-white p-6 lg:p-8">
            <h2 className="font-londrina-solid text-[#001E13] text-xl lg:text-2xl mb-3">
              {t("quickAnswer.heading")}
            </h2>
            <p className="font-karla text-[#001E13]/85 text-base lg:text-lg leading-relaxed">
              {t("quickAnswer.body")}
            </p>
          </div>
        </section>

        {/* How it works */}
        <FadeIn>
          <section className="py-14 lg:py-20 px-6 lg:px-12">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-4xl mb-10 text-center">
                {t("how.title")}
              </h2>
              {/* Three abreast rather than a stacked list: the steps are short,
                  and side by side they read as one flow instead of three walls. */}
              <ol className="grid gap-5 md:grid-cols-3">
                {steps.map((step, i) => (
                  <li
                    key={i}
                    className="rounded-2xl border border-[#001E13]/10 bg-white p-6 flex flex-col"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#F6391A] text-[#FFFBF5] font-karla font-bold flex items-center justify-center mb-4">
                      {i + 1}
                    </span>
                    <h3 className="font-karla font-bold text-[#001E13] text-lg mb-2">{step.title}</h3>
                    <p className="font-karla text-[#001E13]/80 text-base leading-relaxed">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </FadeIn>

        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <hr className="border-[#001E13]/10" />
        </div>

        {/* The differentiator: generation is the easy half, coordination is the hard one. */}
        <FadeIn>
          <section className="py-14 lg:py-20 px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-4xl mb-6">
                {t("groups.title")}
              </h2>
              <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed">
                {t("groups.body")}
              </p>
              <p className="mt-6">
                <Link
                  href={`/${locale}/trip-with-friends`}
                  className="font-karla font-semibold text-[#F6391A] underline underline-offset-4 hover:no-underline"
                >
                  {t("discover.friends.title")} →
                </Link>
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Being concrete about where generation ends is what makes the rest
            credible and quotable — framed as the product's division of labour,
            not as a caveat about our own AI. */}
        <FadeIn>
          <section className="pb-14 lg:pb-20 px-6 lg:px-12">
            <div className="max-w-3xl mx-auto rounded-2xl bg-[#001E13] p-6 lg:p-10 text-[#FFFBF5]">
              <h2 className="font-londrina-solid text-2xl lg:text-3xl mb-4">
                {t("handover.title")}
              </h2>
              <p className="font-karla text-[#FFFBF5]/85 text-base lg:text-lg leading-relaxed">
                {t("handover.body")}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* FAQ */}
        <FadeIn>
          <section className="pb-14 lg:pb-20 px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-4xl mb-10 text-center">
                {t("faq.title")}
              </h2>
              <div className="space-y-6">
                {faqItems.map((item, i) => (
                  <div key={i}>
                    <h3 className="font-karla font-bold text-[#001E13] text-lg mb-2">{item.q}</h3>
                    <p className="font-karla text-[#001E13]/80 text-base lg:text-lg leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Discover more */}
        <FadeIn>
          <section className="pb-14 lg:pb-20 px-6 lg:px-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-3xl mb-8 text-center">
                {t("discover.title")}
              </h2>
              <div className="grid gap-5 sm:grid-cols-3">
                {[
                  { key: "friends", href: `/${locale}/trip-with-friends` },
                  { key: "comparison", href: `/${locale}/alternatives/best-group-trip-planner-apps` },
                  { key: "guide", href: `/${locale}/guides/plan-group-trip` },
                ].map(({ key, href }) => (
                  <Link
                    key={key}
                    href={href}
                    className="rounded-2xl border border-[#001E13]/10 bg-white p-5 hover:border-[#F6391A] transition-colors"
                  >
                    <h3 className="font-karla font-bold text-[#001E13] mb-1">
                      {t(`discover.${key}.title`)}
                    </h3>
                    <p className="font-karla text-[#001E13]/70 text-sm leading-relaxed">
                      {t(`discover.${key}.desc`)}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* CTA */}
        <section className="pb-20 lg:pb-28 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-londrina-solid text-[#001E13] text-2xl lg:text-4xl mb-6">
              {t("cta.title")}
            </h2>
            <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
              <PulsatingButton className="font-karla font-bold">{t("cta.button")}</PulsatingButton>
            </Link>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
