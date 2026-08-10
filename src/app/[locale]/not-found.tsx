import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { NAV_CONTENT, getFooterContent } from "@/lib/site-content";

export default async function NotFound() {
  // Not-found pages don't have access to params, default to 'en'
  const locale = 'en';

  const navData = NAV_CONTENT;
  const navigationData = null;
  const footerData = getFooterContent(locale);

  return (
    <>
      <Nav navData={navData} navigationData={navigationData} />
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 mb-4">
              404
            </h1>
                        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-6">
                          Page not found
                        </h2>
                        <p className="text-lg text-gray-600 mb-8">
                          Oops! It seems you got lost in the clouds. This page doesn&apos;t exist.
                        </p>
            <div className="flex justify-center">
              <Link href="/">
                <PulsatingButton className="w-full sm:w-auto">
                  Back to home
                </PulsatingButton>
              </Link>
            </div>
          </div>
        </div>

      </main>
      <Footer footerData={footerData} />
    </>
  );
}
