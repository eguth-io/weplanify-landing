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