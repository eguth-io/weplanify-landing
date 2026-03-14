import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { navigationQuery, footerQuery } from "@/sanity/lib/query";
import { Navigation, Footer as FooterType } from "@/sanity/lib/type";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function FeaturesLayout({ children, params }: Props) {
  const { locale } = await params;

  // Fetch navigation and footer data from Sanity with locale filter
  const [navigationData, footerData] = await Promise.all([
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<FooterType>(footerQuery, { locale }),
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
      <Footer footerData={footerData} />
    </div>
  );
}
