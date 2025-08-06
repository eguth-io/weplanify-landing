"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

interface Block {
  image: string;
  tooltip: string;
  text: PortableTextBlock[];
  link: string;
}

interface CarouselProps {
  blocks: Block[];
}

export default function Trips({ blocks }: CarouselProps) {
  return (
    <div className="w-full mt-12 md:mt-16 lg:mt-24 relative">
      <img
        src="/pass.png"
        alt="pass"
        className="-z-10 absolute bottom-0 md:bottom-[200px] lg:bottom-[300px] left-0 w-auto h-auto max-w-[150px] md:max-w-none"
      />

      <div className="overflow-hidden mx-auto relative">
        {/* Gradient fade effects */}
        <div className="pointer-events-none absolute inset-y-0 -left-8 h-full w-[100px] bg-gradient-to-r from-white via-white/40 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 -right-8 h-full w-[100px] bg-gradient-to-l from-white via-white/40 to-transparent z-10"></div>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            waitForTransition: false,
            stopOnLastSlide: false,
          }}
          speed={10000} // Vitesse de transition fluide (3 secondes)
          className="pb-4"
          breakpoints={{
            640: {
              slidesPerView: 1.8,
            },
            768: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 2.8,
            },
            1280: {
              slidesPerView: 3.2,
            },
          }}
        >
          {blocks.map((block: Block, index: number) => (
            <SwiperSlide key={index}>
              <div className="relative rounded-xl md:rounded-2xl h-[350px] sm:h-[380px] md:h-[400px] lg:h-[420px] xl:h-[435px]">
                <Image
                  src={block.image}
                  alt={block.tooltip}
                  fill
                  className="rounded-xl md:rounded-2xl object-cover"
                />

                {/* Overlay content */}
                <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 bg-transparent">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="bg-white w-2 h-2 md:w-3 md:h-3 rounded-full"></span>
                    <p className="text-xs md:text-sm font-[600] text-white">
                      {block.tooltip}
                    </p>
                  </div>

                  <div className="font-unbounded mt-2 md:mt-3 lg:mt-4 text-lg md:text-2xl lg:text-3xl font-[400] [&_p]:text-white [&_p]:leading-tight">
                    <PortableText value={block.text} />
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={block.link}
                  className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 px-3 md:px-4 lg:px-[21px] py-1.5 md:py-2 lg:py-[7px] rounded-full text-white border border-white bg-[#ffffff33] text-xs md:text-sm font-[600] hover:bg-[#ffffff55] transition-colors pointer-events-auto"
                >
                  Voir plus
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
