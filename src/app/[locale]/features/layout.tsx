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

  // Fetch navigation and footer data from Sanity with locale filter.
  // Sanity content is authored in en/fr; other locales fall back to en.
  const [navRaw, footerRaw] = await Promise.all([
    client.fetch<Navigation>(navigationQuery, { locale }),
    client.fetch<FooterType>(footerQuery, { locale }),
  ]);
  const [navigationData, footerData] =
    locale === "en"
      ? [navRaw, footerRaw]
      : await Promise.all([
          navRaw ?? client.fetch<Navigation>(navigationQuery, { locale: "en" }),
          footerRaw ?? client.fetch<FooterType>(footerQuery, { locale: "en" }),
        ]);

  return (
    <div className="features-page">
      {/* Navigation */}
      <Nav
        navData={{
          logo: navigationData?.logo || "/logo.webp",
          logoMobile: navigationData?.logo || "/logo.webp",
          connexionLink: navigationData?.connectionButton?.url || "/connexion",
          ctaButton: navigationData?.ctaButton?.text || "Plan my trip free",
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
