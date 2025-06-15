import Avis from "@/components/Avis";
import AvisTrips from "@/components/AvisTrips";
import Devices from "@/components/Devices";
import FAQ from "@/components/FAQ";
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
  Organization,
  TripsType,
} from "@/sanity/lib/type";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const ctaData: CtaType = await sanityFetch({
    query: ctaQuery,
    tags: ["nav"],
  });

  const home: Home = await sanityFetch({
    query: homeQuery,
    tags: ["home"],
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
    <div>
      <Nav />
      <div className="relative pt-[150px] pb-20 flex flex-col items-center justify-center">
        <h2 className="text-orange bg-light px-4 py-2 rounded-full">
          {home.subtitle}
        </h2>
        <div className="mt-4 text-orange text-[52px] font-[600] font-unbounded">
          <PortableText value={home.title} />
        </div>
        <div className="text-[52px] font-[600] font-unbounded">
          <PortableText value={home.title2} />
        </div>
        <div className="mt-2 text-center font-[500] text-xl">
          <PortableText value={home.description} />
        </div>
        <div className="flex gap-4 mt-11">
          <PulsatingButton>{ctaData.ctaButton}</PulsatingButton>
          <button className="font-[700] text-orange border border-[#f6391a] rounded-xl px-4 py-2">
            {home.buttonDemo}
          </button>
        </div>
        <Trips blocks={home.blocks} />
      </div>
      <Devices features={features} />

      <div className="relative pb-28 flex flex-col items-center justify-center bg-[#4D9F79]">
        <img
          src="/leftCloud.png"
          alt="weplanify"
          className="absolute left-0 top-0"
        />
        <img
          src="/rightCloud.png"
          alt="weplanify"
          className="absolute right-0 top-0"
        />
        <div className="pt-52 text-center [&_p]:text-white [&_strong]:text-white">
          <div className="text-[40px] font-unbounded">
            <PortableText value={organization.title} />
          </div>
          <div className="mt-6 text-xl">
            <PortableText value={organization.description} />
          </div>
        </div>
        <Org data={organization.featuresList} />
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-6 items-center">
            <Link href={ctaData.ctaLink}>
              <PulsatingButtonWhite>{ctaData.ctaButton}</PulsatingButtonWhite>
            </Link>
            <p className="text-white font-semibold underline">
              {home.buttonDemo}
            </p>
          </div>
          <div className="mt-8 flex items-center flex-col">
            <Image
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
                alt="five stars"
              />
              <p className="text-sm text-black">{organization.clientText}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-16 mt-20 flex justify-center items-center gap-48">
        <Image
          src="/planes.png"
          width={785}
          height={191}
          alt="planes"
          className="absolute bottom-0"
        />
        <div className="flex flex-col">
          <p className="font-unbounded text-[40px] text-black font-medium">
            {ia.title}
          </p>
          <div className="mb-24 mt-6 relative flex items-center bg-[#F8F7F8] rounded-full shadow-lg border border-gray-200 overflow-hidden max-w-2xl pr-4">
            <input
              type="text"
              placeholder={ia.placeholder}
              className="flex-1 px-6 py-4 text-[#4C3F4A] text-lg bg-[#F8F7F8] outline-none placeholder-[#4C3F4A]"
            />

            {/* Submit Button */}
            <button type="submit">
              <Image src="/input.svg" alt="Submit" width={32} height={32} />
            </button>
          </div>
          <Link href={ctaData.ctaLink}>
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
      </div>

      <AvisTrips trips={trips} />

      <div className="relative mt-40 flex flex-col items-center justify-center">
        <img
          src="/linesRight.svg"
          alt="pass"
          className="absolute top-1/2 right-0 z-0 transform -translate-y-1/2"
        />
        <img
          src="/linesLeft.svg"
          alt="pass"
          className="absolute top-1/2 left-0 z-0 transform -translate-y-1/2"
        />
        <div className="text-[40px] font-unbounded [&_p]:text-black [&_strong]:text-[#F6391A] font-semibold text-center">
          <PortableText value={logiciel.title} />
        </div>
        <Image
          src={logiciel.image}
          alt="logiciel"
          width={1280}
          height={775}
          className="mt-16 object-cover z-10"
        />
      </div>

      <Avis data={avis} />
      <FAQ faq={faq} />

      <div className="relative py-[100px] bg-[#F6391A] mt-32 rounded-[40px] mx-[60px] text-center">
        <img
          src="/footer/top.png"
          alt="logo"
          className="absolute top-0 right-0 rounded-tr-[40px]"
        />
        <img
          src="/footer/left.png"
          alt="logo"
          className="absolute left-0 bottom-0 rounded-bl-[40px]"
        />
        <img
          src="/footer/right.png"
          alt="logo"
          className="absolute bottom-0 right-0 rounded-b-[40px]"
        />
        <div className="text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white font-semibold">
          <PortableText value={footer.title} />
        </div>
        <div className="text-xl text-center [&_p]:text-white mt-3">
          <PortableText value={footer.subtitle} />
        </div>
        <p className="text-[#F6391A] bg-white w-fit mx-auto mt-[34px] rounded-xl px-6 py-2 font-semibold">
          {home.buttonDemo}
        </p>
      </div>
      <footer className="mt-[230px] mx-[60px] border-t border-b border-[#E5E5E5] py-6 flex gap-[100px]">
        <div className="flex flex-col">
          <Image src="/logo.png" alt="logo" width={155} height={66} />
          <p className="text-sm text-black/75 mt-4">
            Planifiez, partagez, partez :
            <br />
            une seule appli pour tout gérer
          </p>
          <p className="mt-11 font-semibold text-black text-sm ">
            Rejoignez nous
          </p>
          <div className="flex gap-3 mt-3">
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={38}
              height={38}
              className="cursor-pointer"
            />
            <Image
              src="/instagram.svg"
              alt="instagram"
              width={38}
              height={38}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">Produit</p>
          <p className="text-black/75 text-sm mt-4">Acceuil</p>
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
          <p className="text-black/75 text-sm mt-6">Condition d'utilisation</p>
        </div>
      </footer>
      <div className="flex justify-between items-center mx-[60px] mt-6">
        <p className="text-sm text-black/75 font-medium">
          © 2025 Lightning Proxies
        </p>
        <p className="text-sm text-black/75 font-medium">
          Réaliser par : La-landing
        </p>
      </div>
    </div>
  );
}
