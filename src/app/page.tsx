import Avis from "@/components/Avis";
import AvisTrips from "@/components/AvisTrips";
import Devices from "@/components/Devices";
import FAQ from "@/components/FAQ";
import FAQStructuredData from "@/components/FAQStructuredData";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { PulsatingButtonWhite } from "@/components/magicui/pulsating-button-white";
import Nav from "@/components/Nav";
import Org from "@/components/Org";
import Trips from "@/components/Trips";
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
  tripsQuery,
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
  TripsType,
} from "@/sanity/lib/type";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { Safari } from "@/components/magicui/safari";
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

  const trips: TripsType = await sanityFetch({
    query: tripsQuery,
    tags: ["trips"],
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
      
              {/* Hero Section */}
        <main>
          <section className="relative pt-[100px] lg:pt-[150px] pb-20 flex flex-col items-center justify-center" aria-labelledby="hero-title">
        <h2 className="text-orange bg-light px-4 py-2 rounded-full lg:text-base text-[10px] hidden lg:block mb-[20px]">
          {home.subtitle}
        </h2>
        <h2 className="lg:hidden text-center  text-orange bg-light px-3 py-1 lg:px-4 lg:py-2 rounded-full text-[12px]  lg:text-base">
          {home.subtitleMobile}
        </h2>
        <div id="hero-title" className="hidden lg:block mt-4 text-orange lg:text-[52px] text-2xl font-[600] font-unbounded text-center lg:text-start">
          <PortableText value={home.title} />
        </div>
        <div className="lg:hidden orangeStrong [&_p]:font-bold text-black text-2xl px-6  mt-4 text-center">
          <PortableText value={home.titleMobile} />
        </div>
        <div className="text-[52px] font-[600] font-unbounded hidden lg:block">
          <PortableText value={home.title2} />
        </div>
        <div className="px-4 lg:px-0 text-[#1D2026] text-opacity-70 mt-3 lg:mt-2 text-center font-[500] text-sm lg:text-xl noBr ">
          <PortableText value={home.description} />
        </div>
        <div className="flex-col lg:flex-row flex gap-4 mt-6 lg:mt-11 w-full lg:w-auto justify-center items-center">
          <PulsatingButton className="w-4/5 lg:w-auto">
            {ctaData.ctaButton}
          </PulsatingButton>
          <button className="w-3/5 lg:w-auto font-[700] text-orange border border-[#f6391a] rounded-xl px-4 py-2">
            {home.buttonDemo}
          </button>
        </div>
        <Trips blocks={home.blocks} />
        </section>
        
        {/* Features Section */}
        <section aria-labelledby="features-title">
          <Devices features={features} />
        </section>

        {/* Organization Section */}
        <section className="relative pb-28 flex flex-col items-center justify-center bg-[#4D9F79]">
        <Image
          src="/leftCloud.png"
          alt="Nuage décoratif gauche - Weplanify"
          width={200}
          height={200}
          className="hidden lg:block absolute left-0 top-0"
        />
        <Image
          src="/rightCloud.png"
          alt="Nuage décoratif droit - Weplanify"
          width={200}
          height={200}
          className="hidden lg:block absolute right-0 top-0"
        />
        <Image
          src="/leftCloudMobile.svg"
          alt="Nuage décoratif gauche mobile - Weplanify"
          width={150}
          height={150}
          className="lg:hidden absolute left-0 -top-[50px]"
        />
        <Image
          src="/rightCloudMobile.svg"
          alt="Nuage décoratif droit mobile - Weplanify"
          width={150}
          height={150}
          className="lg:hidden absolute right-0 -bottom-[50px]"
        />
        <div
          id="fonctionnement"
          className="pt-[50px] lg:pt-52 text-center [&_p]:text-white [&_strong]:text-white"
          role="region"
          aria-labelledby="fonctionnement-title"
        >
          <div id="fonctionnement-title" className="text-2xl lg:text-[40px] font-unbounded px-8 lg:px-0">
            <PortableText value={organization.title} />
          </div>
          <div className="mt-6 text-base lg:text-xl noBr px-6 lg:px-0">
            <PortableText value={organization.description} />
          </div>
        </div>
        <Org data={organization.featuresList} />
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
            <Link href={ctaData.ctaLink} className={"w-full"}>
              <PulsatingButtonWhite className="w-4/5 mx-auto lg:w-full text-nowrap">
                {ctaData.ctaButton}
              </PulsatingButtonWhite>
            </Link>
            <p className="text-white font-semibold underline  text-nowrap">
              {home.buttonDemo}
            </p>
          </div>
          <div className="mt-8 flex items-center flex-col">
            <Image
              className="w-[140px] lg:w-[280px]"
              src={organization.clientImage}
              alt="Logo client satisfait - Weplanify"
              width={280}
              height={62}
            />
            <div className="flex gap-2 items-center mt-2">
              <Image
                src="/fiveStars.svg"
                width={80}
                height={14}
                alt="5 étoiles - Évaluation client Weplanify"
                className="hidden lg:block"
              />
              <p className="text-sm text-white">{organization.clientText}</p>
            </div>
          </div>
        </div>
        </section>

        {/* IA Section */}
        <section className="relative mx-3 lg:mx-16 mt-20 flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-48" aria-labelledby="ia-title">
        <div className="flex flex-col">
          <p id="ia-title" className="leading-normal text-center lg:text-start font-unbounded text-xl lg:text-[40px] text-black lg:font-medium">
            {ia.title}
          </p>
          <div className="mb-6 lg:mb-24 mt-6 relative flex items-center bg-[#F8F7F8] rounded-full shadow-md border border-gray-200 overflow-hidden max-w-2xl pr-4">
            <input
              type="text"
              placeholder={ia.placeholder}
              className="flex-1 px-6 py-4 text-[#4C3F4A] h-[35px] lg:h-auto text-xs lg:text-lg bg-[#F8F7F8] outline-none placeholder-[#4C3F4A]"
            />

            {/* Submit Button */}
            <button type="submit" aria-label="Soumettre la recherche">
              <Image
                src="/input.svg"
                alt="Bouton de soumission - Weplanify"
                width={32}
                height={32}
                className="w-[23px] h-[23px] lg:w-[33px] lg:h-[33px]"
              />
            </button>
          </div>
          <Link href={ctaData.ctaLink} className="hidden lg:block">
            <PulsatingButton>{ctaData.ctaButton}</PulsatingButton>
          </Link>
        </div>
        <Image
          src={ia.image}
          alt="ia"
          width={540}
          height={640}
          className="object-cover"
        />
        </section>

                {/* Mobile CTA Section */}
        <section className="mt-12 lg:hidden flex flex-col justify-center items-center" aria-labelledby="mobile-cta-title">
          <h2 id="mobile-cta-title" className="sr-only">Actions mobiles</h2>
          <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
          <Link href={ctaData.ctaLink} className={"w-full"}>
            <PulsatingButton className="w-4/5 mx-auto lg:w-full text-nowrap">
              {ctaData.ctaButton}
            </PulsatingButton>
          </Link>
          <button className="w-3/5 lg:w-auto font-[700] text-orange border border-[#f6391a] rounded-xl px-4 py-2">
            {home.buttonDemo}
          </button>
        </div>
        <div className="mt-8 flex items-center flex-col">
          <Image
            className="w-[140px] lg:w-[280px]"
            src={organization.clientImage}
            alt="client"
            width={280}
            height={62}
          />
          <div className="flex gap-2 items-center mt-2">
            <Image
              src="/fiveStars.svg"
              width={80}
              height={14}
              alt="5 étoiles - Évaluation client Weplanify"
              className="hidden lg:block"
            />
            <p className="text-sm">{organization.clientText}</p>
          </div>
        </div>
        </section>

        {/* Avis Trips Section */}
        <section aria-labelledby="avis-trips-title">
          <AvisTrips trips={trips} />
        </section>

        {/* Logiciel Section */}
        <section className="relative mt-40 flex flex-col items-center justify-center" aria-labelledby="logiciel-title">
        <Image
          src="/linesRight.svg"
          alt="Lignes décoratives droites - Weplanify"
          width={100}
          height={400}
          className="hidden lg:block absolute top-1/2 right-0 z-0 transform -translate-y-1/2"
        />
        <Image
          src="/linesLeft.svg"
          alt="Lignes décoratives gauches - Weplanify"
          width={100}
          height={400}
          className="hidden lg:block absolute top-1/2 left-0 z-0 transform -translate-y-1/2"
        />
        <div id="logiciel-title" className="text-[20px] lg:text-[40px] font-unbounded [&_p]:text-black [&_strong]:text-[#F6391A] font-semibold text-center">
          <PortableText value={logiciel.title} />
        </div>
        <Safari
          className="z-10 mt-12 object-cover w-[375px] h-[250px] lg:max-w-[1300px] xl:w-[1280px] lg:h-[775px]"
          imageSrc={logiciel.image}
        />
        </section>
        
        {/* Avis Section */}
        <section id="avis" aria-labelledby="avis-title">
          <Avis data={avis} />
        </section>
        
        {/* FAQ Section */}
        <section aria-labelledby="faq-title">
          <FAQStructuredData faq={faq} />
          <FAQ faq={faq} />
        </section>

        {/* CTA Section */}
        <section className="overflow-hidden relative py-[100px] bg-[#F6391A] mt-32 rounded-[40px] lg:mx-[60px] text-center" aria-labelledby="cta-title">
        <Image
          src="/footer/top.png"
          alt="Élément décoratif supérieur - Weplanify"
          width={300}
          height={200}
          className="absolute -top-4 lg:top-0 -right-[70%] lg:right-0 rounded-tr-[40px]"
        />
        <Image
          src="/footer/left.png"
          alt="Élément décoratif gauche - Weplanify"
          width={250}
          height={150}
          className="absolute -left-[20%] -bottom-16 lg:left-0 lg:bottom-0 rounded-bl-[40px]"
        />
        <Image
          src="/footer/right.png"
          alt="Élément décoratif droit - Weplanify"
          width={250}
          height={150}
          className="absolute -bottom-16 -right-[20%] lg:-bottom-6 lg:right-0 rounded-b-[40px]"
        />
        <div id="cta-title" className="noBr px-4 lg:px-0 text-xl lg:text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white font-semibold leading-normal">
          <PortableText value={footer.title} />
        </div>
        <div className="px-4 lg:px-0 text-xl text-center [&_p]:text-white mt-3">
          <PortableText value={footer.subtitle} />
        </div>
        <p className="text-[#F6391A] bg-white w-fit mx-auto mt-[34px] rounded-xl px-6 py-2 font-semibold">
          {home.buttonDemo}
        </p>
        </section>
        
        {/* Footer */}
        <footer className="mt-[120px] md:mt-[180px] lg:mt-[230px] mx-4 md:mx-8 lg:mx-[60px] border-t border-b border-[#E5E5E5] py-6 md:py-8 lg:py-6">
        {/* Desktop Layout */}
        <div className="hidden lg:flex gap-[100px] justify-between">
          <div className="flex flex-col">
            <Image src="/logo.png" alt="Logo Weplanify" width={155} height={66} />
            <p className="text-sm text-black/75 mt-4">
              Planifiez, partagez, partez :
              <br />
              une seule appli pour tout gérer
            </p>
            <p className="mt-11 font-semibold text-black text-sm">
              Rejoignez nous
            </p>
            <div className="flex gap-3 mt-3">
              <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez Weplanify sur Instagram">
                <Image
                  src="/instagram.svg"
                  alt="Icône Instagram - Suivez Weplanify"
                  width={38}
                  height={38}
                  className="cursor-pointer"
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-black font-medium">Produit</p>
            <p className="text-black/75 text-sm mt-4">Accueil</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-black font-medium">Companie</p>
            <p className="text-black/75 text-sm mt-6">A propos</p>
            <p className="text-black/75 text-sm mt-4">Contact</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-black font-medium">Ressources</p>
            <p className="text-black/75 text-sm mt-6">Blog</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-black font-medium">Legal</p>
            <p className="text-black/75 text-sm mt-6">
              CGU
            </p>
          </div>
        </div>

        {/* Mobile/Tablet Layout */}
        <div className="lg:hidden">
          {/* Logo et description */}
          <div className="flex flex-col items-start mb-8 md:mb-10">
            <Image
              src="/logo.png"
              alt="Logo Weplanify"
              width={120}
              height={51}
              className="md:w-[140px] md:h-[60px]"
            />
            <p className="text-sm md:text-base text-black/75 mt-3 md:mt-4">
              Planifiez, partagez, partez :
              <br />
              une seule appli pour tout gérer
            </p>

            {/* Réseaux sociaux */}
            <div className="mt-6 md:mt-8">
              <p className="font-semibold text-black text-sm md:text-base mb-3 text-center md:text-left">
                Rejoignez nous
              </p>
              <div className="flex gap-3">
                <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez Weplanify sur Instagram">
                  <Image
                    src="/instagram.svg"
                    alt="Icône Instagram - Suivez Weplanify"
                    width={32}
                    height={32}
                    className="cursor-pointer md:w-[38px] md:h-[38px]"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Liens en grille responsive */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="flex flex-col">
              <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                Produit
              </p>
              <p className="text-black/75 text-sm md:text-base hover:text-black cursor-pointer transition-colors">
                Accueil
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                Companie
              </p>
              <p className="text-black/75 text-sm md:text-base hover:text-black cursor-pointer transition-colors mb-2 md:mb-3">
                A propos
              </p>
              <p className="text-black/75 text-sm md:text-base hover:text-black cursor-pointer transition-colors">
                Contact
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                Ressources
              </p>
              <p className="text-black/75 text-sm md:text-base hover:text-black cursor-pointer transition-colors">
                Blog
              </p>
            </div>

            <div className="flex flex-col">
              <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                Legal
              </p>
              <p className="text-black/75 text-sm md:text-base hover:text-black cursor-pointer transition-colors leading-tight">
                CGU
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center mx-[60px] mt-6 pb-2">
          <p className="text-sm text-black/75 font-medium">
            Réalisé par : La-landing
          </p>
        </div>
        </footer>
        </main>
      </>
    );
}
