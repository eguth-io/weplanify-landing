import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
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
      <main className="min-h-screen bg-white">
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
              <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg hover:shadow-md transition-all duration-300 mb-8 border border-gray-100">
                
                    <form className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                        Prénom
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
                        style={{ borderRadius: '8px' }}
                        placeholder="Votre prénom"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                        Nom
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
                        style={{ borderRadius: '8px' }}
                        placeholder="Votre nom"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
                      style={{ borderRadius: '8px' }}
                      placeholder="votre@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white"
                      style={{ borderRadius: '8px' }}
                      placeholder="Sujet de votre message"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange focus:border-orange outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                      style={{ borderRadius: '8px' }}
                      placeholder="Décrivez votre question ou votre demande..."
                    />
                  </div>
                  
                  <div className="pt-2 flex justify-center">
                    <PulsatingButton className="w-full lg:w-64">
                      Envoyer le message
                    </PulsatingButton>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <Footer variant="contact" />
    </>
  );
}