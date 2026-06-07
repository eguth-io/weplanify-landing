import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, faqQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, FAQType, Footer as FooterType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { generateMetadataFromSanity } from "@/lib/metadata";
import Breadcrumb from "@/components/Breadcrumb";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const metadata = await generateMetadataFromSanity(locale, "/faq");
  const t = await getTranslations({ locale, namespace: "faqPage" });
  return {
    ...metadata,
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default async function FAQPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [navData, navigationData, faqData, footerData]: [NavType, Navigation | null, FAQType, FooterType | null] = await Promise.all([
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
    sanityFetch<FAQType>({
      query: faqQuery,
      params: { locale },
      tags: ["faq"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      params: { locale },
      tags: ["footer"],
    }),
  ]);

  const t = await getTranslations("faqPage");
  // Use localized default if Sanity is empty
  const faq = faqData || (t.raw("defaultFaq") as FAQType);

  const SITE_URL = "https://www.weplanify.com";

  const faqPageLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: "FAQ", item: `${SITE_URL}/${locale}/faq` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        {/* FAQ Section */}
        <section className="relative pt-[128px] lg:pt-[180px] pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-4xl mx-auto">
              <div className="hidden lg:block mb-8">
                <Breadcrumb
                  items={[
                    { label: t("breadcrumb.home"), href: `/${locale}` },
                    { label: "FAQ" },
                  ]}
                />
              </div>
              {/* Title and Description */}
              <div className="text-center mb-12 lg:mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  FAQ
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  {t("subtitle")}
                </p>
              </div>

              {/* FAQ List */}
              {faq && faq.items && faq.items.length > 0 ? (
                <div className="space-y-6 mb-12">
                  {faq.items.map((item, index) => (
                    <div key={index} className="group">
                      <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gray-100 hover:shadow-sm hover:border-orange/20 transition-all duration-300">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-all duration-300 ease-in-out transform group-hover:scale-105">
                            <span className="text-red-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange transition-colors">
                              {item.question}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">{t("empty")}</p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center bg-gradient-to-r from-orange/5 to-orange/10 rounded-3xl p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {t("ctaTitle")}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {t("ctaSubtitle")}
                </p>
                <div className="flex justify-center">
                  <Link href={`/${locale}/contact`}>
                    <PulsatingButton className="w-full sm:w-auto">
                      {t("ctaButton")}
                    </PulsatingButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer footerData={footerData} />
    </>
  );
}
