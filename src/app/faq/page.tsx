import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, faqQuery } from "@/sanity/lib/query";
import { NavType, FAQType } from "@/sanity/lib/type";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Link from "next/link";

export default async function FAQPage() {
  const [navData, faqData]: [NavType, FAQType] = await Promise.all([
    sanityFetch<NavType>({
      query: navQuery,
      tags: ["nav"],
    }),
    sanityFetch<FAQType>({
      query: faqQuery,
      tags: ["faq"],
    }),
  ]);

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen">
        {/* FAQ Section */}
        <section className="relative pt-[40px] lg:pt-[80px] pb-16 lg:pb-20">
          <div className="container mx-auto px-4 lg:px-0">
            <div className="max-w-4xl mx-auto">
              {/* Title and Description */}
              <div className="text-center mb-12 lg:mb-16">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                  FAQ
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Trouvez rapidement les réponses à vos questions les plus fréquentes
                </p>
              </div>

              {/* FAQ List */}
              {faqData && faqData.items && faqData.items.length > 0 ? (
                <div className="space-y-6 mb-12">
                  {faqData.items.map((item, index) => (
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
                  <p className="text-gray-500 text-lg">Aucune FAQ disponible pour le moment.</p>
                </div>
              )}

              {/* CTA */}
              <div className="text-center bg-gradient-to-r from-orange/5 to-orange/10 rounded-3xl p-8 lg:p-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  Toujours des questions ?
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  Notre équipe est là pour vous aider à planifier votre voyage parfait
                </p>
                <div className="flex justify-center">
                  <Link href="/contact">
                    <PulsatingButton className="w-full sm:w-auto">
                      Nous contacter
                    </PulsatingButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer variant="contact" />
    </>
  );
}
