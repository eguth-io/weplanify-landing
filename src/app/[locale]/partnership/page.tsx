import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PartnershipForm from "@/components/PartnershipForm";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { NAV_CONTENT, getFooterContent } from "@/lib/site-content";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "partnershipPage" });
  const title = t("meta.title");
  const description = t("meta.description");
  const currentUrl = `${SITE_URL}/${locale}/partnership`;

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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `${SITE_URL}/${l}/partnership`])
        ),
        "x-default": `${SITE_URL}/en/partnership`,
      },
    },
  };
}

export default async function PartnershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("partnershipPage");

  const navData = NAV_CONTENT;
  const navigationData = null;
  const footerData = getFooterContent(locale);

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        <section className="relative pt-[40px] lg:pt-[80px] pb-12">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6 mt-4 md:mt-0">
                <h1 className="text-2xl lg:text-3xl font-unbounded font-bold text-black mb-2">
                  {t("hero.h1")}
                </h1>
                <p className="text-gray-600 text-sm">{t("hero.subtitle")}</p>
              </div>

              <PartnershipForm />
            </div>
          </div>
        </section>
      </main>

      <Footer footerData={footerData} />
    </>
  );
}
