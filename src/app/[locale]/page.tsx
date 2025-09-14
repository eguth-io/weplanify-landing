import Avis from "@/components/Avis";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import OrganizationSection from "@/components/OrganizationSection";
import IASection from "@/components/IASection";
import LogicielSection from "@/components/LogicielSection";
import CTASection from "@/components/CTASection";
import Nav from "@/components/Nav";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  avisQuery,
  ctaQuery,
  faqQuery,
  featuresQuery,
  footerQuery,
  homeQuery,
  iaQuery,
  logicielQuery,
  navQuery,
  organizationQuery,
} from "@/sanity/lib/query";
import {
  AvisType,
  CtaType,
  FAQType,
  Features,
  FooterType,
  Home,
  IA,
  Logiciel,
  NavType,
  Organization,
} from "@/sanity/lib/type";
import CloudEffects from "@/components/CloudEffects";

export default async function HomePage() {
  const ctaData: CtaType = await sanityFetch({
    query: ctaQuery,
    tags: ["nav"],
  });

  const home: Home = await sanityFetch({
    query: homeQuery,
    tags: ["home"],
  });

  const navData: NavType = await sanityFetch({
    query: navQuery,
    tags: ["nav"],
  });

  const features: Features = await sanityFetch({
    query: featuresQuery,
    tags: ["features"],
  });

  const organization: Organization = await sanityFetch({
    query: organizationQuery,
    tags: ["organization"],
  });

  const ia: IA = await sanityFetch({
    query: iaQuery,
    tags: ["ia"],
  });


  const logiciel: Logiciel = await sanityFetch({
    query: logicielQuery,
    tags: ["logiciel"],
  });

  const avis: AvisType = await sanityFetch({
    query: avisQuery,
    tags: ["avis"],
  });

  const faq: FAQType = await sanityFetch({
    query: faqQuery,
    tags: ["faq"],
  });

  const footer: FooterType = await sanityFetch({
    query: footerQuery,
    tags: ["footer"],
  });

  return (
    <>
      <CloudEffects />
      <Nav navData={navData} />

      <main>
        <HeroSection home={home} ctaData={ctaData} />

        <OrganizationSection organization={organization} ctaData={ctaData} />

        {/* <MobileCTASection ctaData={ctaData} organization={organization} /> */}

        {/* Avis Trips Section */}
        {/* <section aria-labelledby="avis-trips-title">
          <AvisTrips trips={trips} />
        </section> */}

        <LogicielSection logiciel={logiciel} features={features} />

        {/* Avis Section */}
        <section id="avis" aria-labelledby="avis-title">
          <Avis data={avis} />
        </section>

        <IASection ia={ia} />

        {/* FAQ Section */}
        <section aria-labelledby="faq-title">
          <FAQ faq={faq} />
        </section>

        <CTASection footer={footer} ctaData={ctaData} />

        {/* Footer */}
        <Footer variant="home" />
      </main>
    </>
  );
}
