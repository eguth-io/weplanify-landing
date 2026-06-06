import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import Link from "next/link";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";
const PATHNAME = "/about";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}${PATHNAME}`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: currentUrl,
      siteName: "WePlanify",
      title,
      description,
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${SITE_URL}/en${PATHNAME}`,
        fr: `${SITE_URL}/fr${PATHNAME}`,
        "x-default": `${SITE_URL}/en${PATHNAME}`,
      },
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("aboutPage");

  const whatWeDoItems = t.raw("whatWeDo.items") as [string, string][];

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] =
    await Promise.all([
      sanityFetch<NavType>({ query: navQuery, params: { locale }, tags: ["nav"] }),
      sanityFetch<Navigation>({ query: navigationQuery, params: { locale }, tags: ["navigation"] }),
      sanityFetch<FooterType>({ query: footerQuery, params: { locale }, tags: ["footer"] }),
    ]);

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WePlanify",
    url: SITE_URL,
    description: t("meta.description"),
    foundingDate: "2025",
    founder: { "@type": "Person", name: "WePlanify Team" },
    sameAs: [
      "https://www.instagram.com/weplanify",
      "https://www.tiktok.com/@weplanify",
    ],
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t("breadcrumb.home"), item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: t("breadcrumb.about"), item: `${SITE_URL}/${locale}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <Nav navData={navData} navigationData={navigationData} />

      <main className="min-h-screen bg-[#FFFBF5]">

        {/* ━━━ OPENING ━━━ */}
        <section className="pt-[140px] lg:pt-[200px] pb-24 lg:pb-40 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="font-nanum-pen text-[#F6391A] text-lg lg:text-xl mb-8">
              {t("hero.tag")}
            </p>
            <h1 className="text-[#001E13] text-[40px] lg:text-[72px] xl:text-[88px] font-londrina-solid leading-[1.0] mb-0">
              {t("hero.h1")}
            </h1>
          </div>
        </section>

        {/* ━━━ THE FRUSTRATION ━━━ */}
        <section className="pb-20 lg:pb-32 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {t("frustration.p1")}
            </p>
            <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8] mb-8">
              {t("frustration.p2")}
            </p>
            <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
              {t("frustration.p3")}
            </p>
          </div>
        </section>

        {/* ━━━ PULL QUOTE ━━━ */}
        <section className="bg-[#001E13] py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[1100px] mx-auto">
            <p className="text-[#EEF899] text-[32px] lg:text-[56px] xl:text-[68px] font-londrina-solid leading-[1.08]">
              {t("pullQuote")}
            </p>
          </div>
        </section>

        {/* ━━━ WHAT WE DO ━━━ */}
        <section className="py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[32px] lg:text-[52px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {t("whatWeDo.heading")}
            </h2>
            <div className="space-y-6">
              {whatWeDoItems.map(([title, desc], i) => (
                <div key={i} className="flex gap-5 lg:gap-8 items-baseline">
                  <span className="text-[#F6391A] font-londrina-solid text-[28px] lg:text-[36px] leading-none flex-shrink-0 w-8 lg:w-10 text-right">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="border-t border-[#001E13]/10 pt-5 flex-1">
                    <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-1.5">
                      {title}
                    </h3>
                    <p className="text-[#001E13]/65 text-base lg:text-lg font-karla leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ━━━ LANGUAGES STRIP ━━━ */}
        <section className="bg-[#61DBD5] py-10 lg:py-12 px-6 lg:px-12">
          <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-center gap-6 lg:gap-14">
            {[
              { flag: "🇬🇧", name: "English" },
              { flag: "🇫🇷", name: "Français" },
              { flag: "🇪🇸", name: "Español" },
              { flag: "🇮🇹", name: "Italiano" },
            ].map((lang) => (
              <span key={lang.name} className="flex items-center gap-2.5">
                <span className="text-2xl lg:text-3xl">{lang.flag}</span>
                <span className="text-[#001E13] font-karla font-bold text-base lg:text-lg">
                  {lang.name}
                </span>
              </span>
            ))}
          </div>
        </section>

        {/* ━━━ WHY NOT THE OTHERS ━━━ */}
        <section className="py-24 lg:py-36 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto">
            <h2 className="text-[#001E13] text-[32px] lg:text-[52px] font-londrina-solid leading-[1.08] mb-10 lg:mb-14">
              {t("whyNot.heading")}
            </h2>
            <div className="space-y-8">
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("whyNot.p1")}
              </p>
              <p className="text-[#001E13]/75 text-lg lg:text-[22px] font-karla leading-[1.8]">
                {t("whyNot.p2")}
              </p>
              <p className="text-[#001E13] text-lg lg:text-[22px] font-karla font-bold leading-[1.8]">
                {t("whyNot.p3")}
              </p>
            </div>
          </div>
        </section>


        {/* ━━━ CTA ━━━ */}
        <section className="py-28 lg:py-40 px-6 lg:px-12">
          <div className="max-w-[900px] mx-auto text-center">
            <h2 className="text-[#001E13] text-[36px] lg:text-[60px] font-londrina-solid leading-[1.05] mb-6">
              {t("cta.heading")}
            </h2>
            <p className="text-[#001E13]/60 text-base lg:text-lg font-karla leading-relaxed mb-10 max-w-[500px] mx-auto">
              {t("cta.subtitle")}
            </p>
            <div className="flex justify-center">
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`}>
                <PulsatingButton className="font-karla font-bold text-base lg:text-lg px-10 py-3.5">
                  {t("cta.button")}
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer footerData={footerData} />
    </>
  );
}
