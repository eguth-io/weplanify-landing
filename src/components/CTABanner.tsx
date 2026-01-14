"use client";

import { PulsatingButton } from "@/components/magicui/pulsating-button";
import Image from "next/image";
import Link from "next/link";

interface CTABannerProps {
  data: {
    titlePart1?: string;
    titlePart2?: string;
    titlePart3?: string;
    titlePart4?: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage: string;
  };
}

export default function CTABanner({ data }: CTABannerProps) {
  if (!data) return null;

  return (
    <div className="px-4 lg:px-8 pb-2 lg:pb-3">
      <div className="max-w-[1536px] mx-auto">
        <section className="relative overflow-hidden rounded-[24px] lg:rounded-[40px] min-h-[600px] lg:min-h-[700px]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={data.backgroundImage || "/cta-image-banner-bg.webp"}
              alt="CTA Background"
              fill
              className="object-cover object-center"
              priority
              quality={100}
            />
            {/* Subtle Dark Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* Content - Aligned to bottom left and right */}
          <div className="relative z-10 w-full h-full min-h-[600px] lg:min-h-[700px] px-6 lg:px-12 xl:px-16 py-12 lg:py-16 flex flex-col justify-end">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8">
              {/* Left side - Title and Subtitle */}
              <div className="max-w-2xl">
                <h2 className="text-2xl lg:text-4xl xl:text-[48px] leading-tight mb-3 lg:mb-4">
                  {data.titlePart1 && (
                    <span className="font-londrina-solid text-[#FFFBF5]">{data.titlePart1} </span>
                  )}
                  {data.titlePart2 && (
                    <span className="font-londrina-solid text-[#61DBD5]">{data.titlePart2} </span>
                  )}
                  {data.titlePart3 && (
                    <span className="font-londrina-solid text-[#FFFBF5]">{data.titlePart3} </span>
                  )}
                  {data.titlePart4 && (
                    <span className="font-londrina-solid text-[#EEF899]">{data.titlePart4}</span>
                  )}
                </h2>
                <p className="text-[#FFFBF5] text-sm lg:text-base font-karla font-semibold leading-relaxed whitespace-pre-line">
                  {data.description}
                </p>
              </div>

              {/* Right side - CTA Button */}
              <div className="flex-shrink-0">
                <Link href={data.buttonUrl || "#"}>
                  <PulsatingButton className="font-karla font-bold">
                    {data.buttonText}
                  </PulsatingButton>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
