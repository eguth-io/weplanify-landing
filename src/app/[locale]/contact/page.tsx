import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, navigationQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Navigation, Footer as FooterType } from "@/sanity/lib/type";
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

const SITE_URL = "https://www.weplanify.com";

const contactMeta = {
  en: {
    title: "Contact WePlanify — Get in Touch With Our Team",
    description:
      "Have a question about WePlanify? Need help planning your group trip? Reach out to our team — we typically respond within 24 hours.",
  },
  fr: {
    title: "Contactez WePlanify — Écrivez-nous",
    description:
      "Une question sur WePlanify ? Besoin d'aide pour organiser votre voyage de groupe ? Contactez notre équipe — nous répondons généralement sous 24 heures.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const l = locale === "fr" ? contactMeta.fr : contactMeta.en;
  const currentUrl = `${SITE_URL}/${locale}/contact`;

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
        en: `${SITE_URL}/en/contact`,
        fr: `${SITE_URL}/fr/contact`,
        "x-default": `${SITE_URL}/en/contact`,
      },
    },
  };
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

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
        {/* Contact Form Section */}
        <section className="relative pt-[40px] lg:pt-[80px] pb-12">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-xl mx-auto">
              {/* Title and Description */}
              <div className="text-center mb-6 mt-4 md:mt-0">
                <h2 className="text-2xl lg:text-3xl font-unbounded font-bold text-black mb-1">
                  Send us a message
                </h2>
                <p className="text-gray-600 text-sm">
                  Our team will get back to you as soon as possible
                </p>
              </div>
              
              {/* Contact Form */}
              <ContactForm />

            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <Footer footerData={footerData} />
    </>
  );
}