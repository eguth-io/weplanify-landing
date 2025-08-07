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
    setCurrentIndex(swiper.activeIndex);
  };

  return (
    <div className="mt-20 md:mt-32 lg:mt-40 bg-[#006F8E] relative">
      {/* Titre responsive */}
      <div className="w-3/4 mx-auto pt-8 md:pt-12 lg:pt-16 text-center text-xl md:text-3xl lg:text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white px-4 md:px-6">
        <PortableText value={data.title} />
      </div>

      {/* Étoiles responsive */}
      <Image
        src="/stars.png"
        alt="stars"
        width={130}
        height={26}
        className="mx-auto mt-6 md:mt-8 lg:mt-10 w-[100px] h-[20px] md:w-[115px] md:h-[23px] lg:w-[130px] lg:h-[26px]"
      />

      {/* Swiper Container */}
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
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
                <div className="w-full flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8">
                  {/* Description responsive */}
                  <div className="text-center text-lg md:text-2xl lg:text-4xl font-medium md:font-semibold lg:font-semibold [&_p]:text-white max-w-3xl lg:max-w-4xl leading-relaxed">
                    <PortableText value={testimonial.description} />
                  </div>

                  {/* Profile image responsive */}
                  <Image
                    src={testimonial.profileImage}
                    alt="profile"
                    width={60}
                    height={60}
                    className="rounded-full mt-6 md:mt-8 lg:mt-10 w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
                  />

                  {/* Nom responsive */}
                  <p className="mt-3 md:mt-4 text-white font-medium md:font-semibold text-lg md:text-xl">
                    {testimonial.name}
                  </p>
                </div>
              </SwiperSlide>
            ),
          )}
        </Swiper>
      </div>

      {/* Navigation Arrows - Desktop uniquement */}
      {data.testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden lg:block absolute left-4 xl:left-8 top-1/2 transform -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
          >
            <Image src="/arrowRed.svg" alt="Previous" width={47} height={47} />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:block absolute right-4 xl:right-8 top-1/2 transform -translate-y-1/2 z-10 rotate-180 hover:scale-110 transition-transform duration-200"
          >
            <Image src="/arrowRed.svg" alt="Next" width={47} height={47} />
          </button>
        </>
      )}

      {/* Indicateurs de progression - Responsive */}
      {data.testimonials.length > 1 && (
        <div className="flex justify-center pb-6 md:pb-8 gap-1.5 md:gap-2">
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideTo(index);
              }}
              className={`rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white w-4 h-1.5 md:w-6 md:h-2"
                  : "bg-white/50 hover:bg-white/70 w-1.5 h-1.5 md:w-2 md:h-2"
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
