import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery } from "@/sanity/lib/query";
import { NavType } from "@/sanity/lib/type";

export default async function ContactPage() {
  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });


  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        {/* Contact Form Section */}
        <section className="relative pt-[40px] lg:pt-[80px] pb-12">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-xl mx-auto">
              {/* Title and Description */}
              <div className="text-center mb-6 mt-4 md:mt-0">
                <h2 className="text-2xl lg:text-3xl font-unbounded font-bold text-black mb-1">
                  Envoyez-nous un message
                </h2>
                <p className="text-gray-600 text-sm">
                  Notre équipe vous répondra dans les plus brefs délais
                </p>
              </div>
              
              {/* Contact Form */}
              <ContactForm />

            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <Footer variant="contact" />
    </>
  );
}