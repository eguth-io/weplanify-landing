"use client";

import Image from "next/image";
import InlinePitch from "@/components/InlinePitch";

type Lang = "en" | "fr";

interface CTAContent {
  titlePart1: string;
  titlePart2: string;
  titlePart3: string;
  titlePart4: string;
  description: string;
  socialProof: string;
}

const CONTENT: Record<Lang, CTAContent> = {
  fr: {
    titlePart1: "Transformez ",
    titlePart2: "vos idées ",
    titlePart3: "en voyages inoubliables.",
    titlePart4: " Gratuitement.",
    description: "Planifiez autant de voyages que vous voulez. Tout au même endroit.",
    socialProof: "Plus de 50k voyages planifiés.",
  },
  en: {
    titlePart1: "Turn ",
    titlePart2: "your group travel ideas ",
    titlePart3: "into unforgettable trips.",
    titlePart4: " For free.",
    description: "Plan as many group trips as you want. Everything in one place.",
    socialProof: "50k+ trips planned.",
  },
};

const BACKGROUND_IMAGE =
  "https://cdn.sanity.io/images/pkczubdf/production/94d61b2dee776c88dcf45ecfc9101b536b0fe1e2-1389x747.png";

interface CTABannerProps {
  locale?: string;
}

export default function CTABanner({ locale = "en" }: CTABannerProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const content = CONTENT[lang];

  return (
    <div className="px-4 lg:px-8 pt-8 lg:pt-12">
      <div className="max-w-[1536px] mx-auto">
        <section className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] min-h-[600px] lg:min-h-[700px]">
          <div className="absolute inset-0 z-0">
            <Image
              src={BACKGROUND_IMAGE}
              alt="CTA Background"
              fill
              className="object-cover object-center"
              quality={100}
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          <div className="relative z-10 w-full h-full min-h-[600px] lg:min-h-[700px] px-6 lg:px-12 xl:px-16 py-12 lg:py-16 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl lg:text-5xl xl:text-[56px] leading-tight mb-4 lg:mb-6 max-w-4xl">
              <span className="font-londrina-solid text-[#FFFBF5]">{content.titlePart1}</span>
              <span className="font-londrina-solid text-[#61DBD5]">{content.titlePart2}</span>
              <span className="font-londrina-solid text-[#FFFBF5]">{content.titlePart3}</span>
              <span className="font-londrina-solid text-[#EEF899]">{content.titlePart4}</span>
            </h2>
            <p className="text-[#FFFBF5] text-base lg:text-lg font-karla font-semibold leading-relaxed mb-8 lg:mb-10 max-w-2xl whitespace-pre-line">
              {content.description}
            </p>
            <div className="w-full flex justify-center">
              <InlinePitch locale={locale} variant="light" location="cta_banner" />
            </div>
            <p className="text-[#FFFBF5]/80 text-xs lg:text-sm font-karla mt-4">
              {content.socialProof}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
