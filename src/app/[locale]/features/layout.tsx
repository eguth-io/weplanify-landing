import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { NAV_CONTENT, getFooterContent } from "@/lib/site-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function FeaturesLayout({ children, params }: Props) {
  const { locale } = await params;

  const navData = NAV_CONTENT;
  const footerData = getFooterContent(locale);

  return (
    <div className="features-page">
      {/* Navigation */}
      <Nav navData={navData} />

      {/* Page Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer footerData={footerData} />
    </div>
  );
}
