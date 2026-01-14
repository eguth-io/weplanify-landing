import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/sanity/lib/fetch";
import { navQuery, footerQuery } from "@/sanity/lib/query";
import { NavType, Footer as FooterType } from "@/sanity/lib/type";
import Link from "next/link";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

export default async function NotFound() {
  const [navData, footerData]: [NavType, FooterType | null] = await Promise.all([
    sanityFetch<NavType>({
      query: navQuery,
      tags: ["nav"],
    }),
    sanityFetch<FooterType>({
      query: footerQuery,
      tags: ["footer"],
    }),
  ]);

  return (
    <>
      <Nav navData={navData} />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
              404
            </h1>
                        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                          Page non trouvée
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                          Oups ! Il semble que vous vous soyez égaré dans les nuages. Cette page n&apos;existe pas.
                        </p>
            <div className="flex justify-center">
              <Link href="/">
                <PulsatingButton className="w-full sm:w-auto">
                  Retour à l&apos;accueil
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer variant="home" footerData={footerData} />
    </>
  );
}
