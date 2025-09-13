"use client";

import { AvisType } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function Avis({ data }: { data: AvisType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const swiperRef = useRef<SwiperType>(null);

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.realIndex);
  };

  return (
    <div className="mt-20 md:mt-32 lg:mt-40 bg-gradient-to-br from-[#006F8E] to-[#005a73] relative overflow-hidden">
      <div className="w-3/4 mx-auto pt-8 md:pt-12 lg:pt-16 text-center text-xl md:text-3xl lg:text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white px-4 md:px-6 relative z-10">
        <div className="inline-block">
          <PortableText value={data.title} />
        </div>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={handleSlideChange}
          effect="slide"
          speed={500}
          touchRatio={1}
          touchAngle={45}
          threshold={10}
          longSwipes={true}
          longSwipesRatio={0.5}
          longSwipesMs={300}
          followFinger={true}
          allowTouchMove={true}
          resistanceRatio={0.85}
          className="testimonials-swiper"
        >
          {data.testimonials.map(
            (testimonial: AvisType["testimonials"][0], index: number) => (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col items-center justify-center py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 lg:p-10 border border-white/10 shadow-xl max-w-4xl lg:max-w-5xl">
                    <div className="text-center text-base md:text-xl lg:text-2xl font-medium md:font-semibold lg:font-semibold [&_p]:text-white leading-relaxed mb-6 md:mb-8">
                      <PortableText value={testimonial.description} />
                    </div>

                    <div className="flex flex-col items-center gap-3 md:gap-4">
                      <div className="relative">
                        <Image
                          src={testimonial.profileImage}
                          alt="profile"
                          width={60}
                          height={60}
                          className="rounded-full w-[50px] h-[50px] md:w-[60px] md:h-[60px] border-2 border-white/30"
                        />
                        <div className="absolute inset-0 rounded-full bg-white/10"></div>
                      </div>

                      <p className="text-white font-semibold md:font-bold text-lg md:text-xl">
                        {testimonial.name}
                      </p>

                      <div className="relative">
                        <Image
                          src="/stars.png"
                          alt="stars"
                          width={130}
                          height={26}
                          className="w-[80px] h-[16px] md:w-[100px] md:h-[20px] lg:w-[120px] lg:h-[24px] drop-shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>

      {data.testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden lg:block absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 z-10 hover:scale-110 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20"
          >
            <Image src="/arrowRed.svg" alt="Previous" width={47} height={47} />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:block absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-10 rotate-180 hover:scale-110 transition-all duration-300 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20"
          >
            <Image src="/arrowRed.svg" alt="Next" width={47} height={47} />
          </button>
        </>
      )}
      {data.testimonials.length > 1 && (
        <div
          id="faq"
          className="flex justify-center pb-6 md:pb-8 gap-1.5 md:gap-2 mt-2"
        >
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideToLoop(index);
              }}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white w-6 h-2 md:w-8 md:h-2.5 shadow-lg"
                  : "bg-white/50 hover:bg-white/70 w-2 h-2 md:w-3 md:h-3 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}

      <style jsx global>{`
        .testimonials-swiper {
          width: 100%;
          height: auto;
        }

        .testimonials-swiper .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </div>
  );
}
