import Image from "next/image";
import Link from "next/link";
import { CtaType } from "@/sanity/lib/type";
import { PulsatingButtonWhite } from "@/components/magicui/pulsating-button-white-black";

interface CTASectionProps {
  footer?: unknown; // Deprecated - kept for compatibility but not used
  ctaData: CtaType;
}

export default function CTASection({ ctaData }: CTASectionProps) {
  // Extract parts from ctaData
  const title = [
    ctaData.titlePart1,
    ctaData.titlePart2,
    ctaData.titlePart3,
    ctaData.titlePart4,
  ].filter(Boolean).join(' ');

  return (
    <section className="overflow-hidden relative pt-[100px] pb-[40px] bg-[#F6391A] rounded-[40px] mx-3 lg:mx-[60px] text-center" aria-labelledby="cta-title">
      <Image
        src="/footer/top.png"
        alt="Élément décoratif supérieur - WePlanify"
        width={300}
        height={200}
        loading="lazy"
        className="absolute -top-4 lg:top-0 -right-[70%] lg:right-0 rounded-tr-[40px]"
      />
      <Image
        src="/footer/left.png"
        alt="Élément décoratif gauche - WePlanify"
        width={250}
        height={150}
        loading="lazy"
        className="absolute -left-[20%] -bottom-16 lg:left-0 lg:bottom-0 rounded-bl-[40px]"
      />
      <Image
        src="/footer/right.png"
        alt="Élément décoratif droit - WePlanify"
        width={250}
        height={150}
        loading="lazy"
        className="absolute -bottom-16 -right-[20%] lg:-bottom-6 lg:right-0 rounded-b-[40px]"
      />
      <div className="relative z-10">
        <div id="cta-title" className="noBr px-4 lg:px-0 text-xl lg:text-[40px] font-unbounded text-white font-semibold leading-normal">
          {title}
        </div>
        <div className="px-4 lg:px-0 text-xl text-center text-white mt-3">
          {ctaData.description}
        </div>
        <div className="mt-[34px] flex justify-center">
          <Link href={ctaData.buttonUrl || '#'} rel="nofollow">
            <PulsatingButtonWhite>
              {ctaData.buttonText}
            </PulsatingButtonWhite>
          </Link>
        </div>
      </div>
    </section>
  );
}
