import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { PulsatingButtonWhite } from "@/components/magicui/pulsating-button-white";
import { CtaType, Organization } from "@/sanity/lib/type";
import Org from "@/components/Org";

interface OrganizationSectionProps {
  organization: Organization;
  ctaData: CtaType;
}

export default function OrganizationSection({ organization, ctaData }: OrganizationSectionProps) {
  return (
    <section id="fonctionnement" className="relative pb-28 flex flex-col items-center justify-center bg-[#4D9F79]">
      <Image
        src="/leftCloud.png"
        alt="Nuage décoratif gauche - WePlanify"
        width={200}
        height={200}
        className="hidden lg:block absolute left-0 top-0 z-0"
      />
      <Image
        src="/rightCloud.png"
        alt="Nuage décoratif droit - WePlanify"
        width={200}
        height={200}
        className="hidden lg:block absolute right-0 top-0 z-0"
      />
      <Image
        src="/leftCloudMobile.svg"
        alt="Nuage décoratif gauche mobile - WePlanify"
        width={150}
        height={150}
        className="lg:hidden absolute left-0 -top-[100px] z-0"
      />
      <Image
        src="/rightCloudMobile.svg"
        alt="Nuage décoratif droit mobile - WePlanify"
        width={150}
        height={150}
        className="lg:hidden absolute right-0 -bottom-[50px] z-20"
      />
      <div
        className="pt-[50px] lg:pt-52 text-center [&_p]:text-white [&_strong]:text-white relative z-10"
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
      <div className="flex flex-col items-center justify-center mt-10 lg:mt-4">
        <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
          <Link href={ctaData.ctaLink} className={"w-full"} rel="nofollow">
            <PulsatingButtonWhite className="w-4/5 mx-auto lg:w-full text-nowrap">
              {ctaData.ctaButton}
            </PulsatingButtonWhite>
          </Link>
        </div>
        <div className="mt-8 flex items-center flex-col">
          <Image
            className="w-[140px] lg:w-[280px]"
            src={organization.clientImage}
            alt="Logo client satisfait - WePlanify"
            width={280}
            height={62}
          />
          <div className="flex gap-2 items-center mt-2">
            <Image
              src="/fiveStars.svg"
              width={80}
              height={14}
              alt="5 étoiles - Évaluation client WePlanify"
              className="hidden lg:block"
            />
            <p className="text-sm text-white">{organization.clientText}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
