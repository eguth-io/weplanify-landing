import { PortableText } from "@portabletext/react";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { CtaType, Home } from "@/sanity/lib/type";
import Trips from "@/components/Trips";
import Link from "next/link";

interface HeroSectionProps {
  home: Home;
  ctaData: CtaType;
}

export default function HeroSection({ home, ctaData }: HeroSectionProps) {
  return (
    <section className="relative pt-[40px] lg:pt-[100px] pb-20 flex flex-col items-center justify-center" aria-labelledby="hero-title">
      <h2 className="text-orange bg-light px-4 py-2 rounded-full lg:text-base text-[10px] hidden lg:block mb-[20px]">
        {home.subtitle}
      </h2>
      <h2 className="lg:hidden text-center text-orange bg-light px-3 py-1 lg:px-4 lg:py-2 rounded-full text-[12px] lg:text-base">
        {home.subtitleMobile}
      </h2>
      <div id="hero-title" className="hidden lg:block mt-4 text-orange lg:text-[52px] text-2xl font-[600] font-unbounded text-center lg:text-start">
        <PortableText value={home.title} />
      </div>
      <div className="lg:hidden orangeStrong [&_p]:font-bold text-black text-2xl px-6 mt-4 text-center">
        <PortableText value={home.titleMobile} />
      </div>
      <div className="text-[52px] font-[600] font-unbounded hidden lg:block">
        <PortableText value={home.title2} />
      </div>
      <div className="px-4 lg:px-0 text-[#1D2026] text-opacity-70 mt-3 lg:mt-2 text-center font-[500] text-sm lg:text-xl noBr">
        <PortableText value={home.description} />
      </div>
      <div className="flex-col lg:flex-row flex gap-4 mt-6 lg:mt-11 w-full lg:w-auto justify-center items-center">
        <Link href={ctaData.ctaLink}>
          <PulsatingButton className="w-4/5 lg:w-80">
            {ctaData.ctaButton}
          </PulsatingButton>
        </Link>
      </div>
      <Trips blocks={home.blocks} />
    </section>
  );
}
