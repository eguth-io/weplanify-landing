import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PartnershipForm from "@/components/PartnershipForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";

const partnershipMeta = {
  en: {
    title: "Partner with WePlanify — Partnership Opportunities",
    description:
      "Work with WePlanify. Whether you're a travel provider, media partner, creator, or building an integration — tell us about your project and our team will get back to you.",
    h1: "Let's build something together",
    subtitle:
      "Tell us about your project. Affiliates, media, travel providers, creators, integrations — we're open.",
  },
  fr: {
    title: "Partenariat WePlanify — Devenir Partenaire",
    description:
      "Travaillez avec WePlanify. Que vous soyez un acteur du voyage, un média, un créateur ou que vous souhaitiez intégrer notre produit — parlez-nous de votre projet.",
    h1: "Construisons quelque chose ensemble",
    subtitle:
      "Parlez-nous de votre projet. Affiliation, média, acteurs du voyage, créateurs, intégrations — on est ouverts.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? partnershipMeta.fr : partnershipMeta.en;
  const currentUrl = `${SITE_URL}/${locale}/partnership`;

  return {
    title: l.title,
    description: l.description,
    openGraph: {
      type: "website",
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
        en: `${SITE_URL}/en/partnership`,
        fr: `${SITE_URL}/fr/partnership`,
        "x-default": `${SITE_URL}/en/partnership`,
      },
    },
  };
}

export default async function PartnershipPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const l = locale === "fr" ? partnershipMeta.fr : partnershipMeta.en;

  const [navData, navigationData, footerData]: [NavType, Navigation | null, FooterType | null] = await Promise.all([
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
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen">
        <section className="relative pt-[128px] lg:pt-[180px] pb-12">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6 mt-4 md:mt-0">
                <h1 className="text-2xl lg:text-3xl font-unbounded font-bold text-black mb-2">
                  {l.h1}
                </h1>
                <p className="text-gray-600 text-sm">{l.subtitle}</p>
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
