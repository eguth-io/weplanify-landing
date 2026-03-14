import Nav from "@/components/Nav";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { navigationQuery, footerQuery } from "@/sanity/lib/query";
import { Navigation, Footer } from "@/sanity/lib/type";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function FeaturesLayout({ children, params }: Props) {
  const { locale } = await params;

  // Fetch navigation and footer data from Sanity with locale filter
  const [navigationData, footerData] = await Promise.all([
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<Footer>(footerQuery, { locale }),
  ]);

  return (
    <div className="features-page">
      {/* Navigation */}
      <Nav
        navData={{
          logo: navigationData?.logo || "/logo.webp",
          logoMobile: navigationData?.logo || "/logo.webp",
          connexionLink: navigationData?.connectionButton?.url || "/connexion",
          ctaButton: navigationData?.ctaButton?.text || "Get started",
          ctaLink: navigationData?.ctaButton?.url || "/contact",
        }}
        navigationData={navigationData}
      />

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      {footerData && (
        <footer className="bg-[#FFFBF5] px-4 lg:px-8 py-8 lg:py-12">
          <div className="max-w-[1536px] mx-auto">
            {/* Main Footer Content */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Logo and Social Links */}
              <div className="flex items-center gap-6 order-2 md:order-1">
                <Link href="/" className="font-londrina-solid text-2xl text-[#001E13]">
                  Weplanify
                </Link>
                {footerData.socialLinks && footerData.socialLinks.length > 0 && (
                  <div className="flex items-center gap-4">
                    {footerData.socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#001E13]/60 hover:text-[#F6391A] transition-colors"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Legal Links */}
              {footerData.legalLinks && footerData.legalLinks.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 order-1 md:order-2">
                  {footerData.legalLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.url || "#"}
                      className="text-[#001E13] text-sm font-karla hover:underline"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Copyright */}
            {footerData.copyrightText && (
              <div className="text-center mt-8">
                <p className="text-[#001E13]/60 text-sm font-karla">
                  {footerData.copyrightText}
                </p>
              </div>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
