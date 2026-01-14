import Image from "next/image";
import Link from "next/link";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { CtaType, Organization } from "@/sanity/lib/type";

interface MobileCTASectionProps {
  ctaData: CtaType;
  organization: Organization;
}

export default function MobileCTASection({ ctaData, organization }: MobileCTASectionProps) {
  return (
    <section className="mt-12 lg:hidden flex flex-col justify-center items-center" aria-labelledby="mobile-cta-title">
      <h2 id="mobile-cta-title" className="sr-only">Actions mobiles</h2>
      <div className="flex gap-6 items-center flex-col lg:flex-row w-full">
        <Link href={ctaData.buttonUrl || '#'} className={"w-full"} rel="nofollow">
          <PulsatingButton className="w-4/5 mx-auto lg:w-full text-nowrap">
            {ctaData.buttonText}
          </PulsatingButton>
        </Link>
      </div>
      <div className="mt-8 flex items-center flex-col">
        {organization.logo && (
          <Image
            className="w-[140px] lg:w-[280px]"
            src={organization.logo}
            alt={organization.logoAlt || "client"}
            width={280}
            height={62}
          />
        )}
        <div className="flex gap-2 items-center mt-2">
          <Image
            src="/fiveStars.svg"
            width={80}
            height={14}
            alt="5 étoiles - Évaluation client WePlanify"
            className="hidden lg:block"
          />
          <p className="text-sm">{typeof organization.description === 'string' ? organization.description : (organization.clientText || '')}</p>
        </div>
      </div>
    </section>
  );
}
