"use client";

import { Features } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import { Safari } from "@/components/magicui/safari";
import Iphone15Pro from "@/components/magicui/iphone-15-pro";

export default function Devices({ features }: { features: Features }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
    if (swiperInstance) {
      swiperInstance.slideTo(index);
    }
  };

  const currentFeature = features.featuresList[activeIndex];

  return (
    <div>
      <div className="relative flex justify-center px-4 md:px-6 lg:px-0">
        <img src="/deviceLeftCloud.png" className="absolute right-0 " alt="" />
        <img
          src="/deviceRightCloud.png"
          className="absolute left-0 -top-[5%] -z-10"
          alt=""
        />
        <Iphone15Pro
          className="hidden sm:block absolute right-[5%] md:right-[5%] top-[10%] md:top-[15%] w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] md:w-[250px] md:h-[500px] lg:w-[300px] lg:h-[600px]"
          src={currentFeature.imageMobile}
        />

        <Safari
          className="object-cover w-[375px] h-[250px] lg:max-w-[1300px] xl:w-[1200px] lg:h-[810px]"
          imageSrc={currentFeature.imageDesktop}
        />
      </div>

      <div className="py-8 md:py-12 lg:py-16">
        <div className="relative px-4 md:px-6 lg:px-8">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides={false}
            loop={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => setSwiperInstance(swiper)}
            onSlideChange={handleSlideChange}
            className="pb-4"
            breakpoints={{
              480: {
                slidesPerView: 1.2,
              },
              640: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2.5,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {features.featuresList.map((feature, index) => (
              <SwiperSlide key={index}>
                <div
                  className={`p-4 md:p-5 lg:p-6 relative rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer h-[200px] sm:h-[230px] lg:h-[270px] ${
                    activeIndex === index
                      ? "bg-[#006F8E]"
                      : "border border-[#FDD7D1] bg-white hover:scale-102"
                  }`}
                  onClick={() => handleFeatureClick(index)}
                >
                  <div className="h-full flex flex-col">
                    <h3
                      className={`text-lg md:text-2xl lg:text-3xl font-medium mb-2 md:mb-3 transition-colors ${
                        activeIndex === index ? "text-white" : "text-[#8E9093]"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    <div
                      className={`text-sm md:text-lg lg:text-xl flex-1 transition-colors leading-tight ${
                        activeIndex === index
                          ? "[&_p]:text-white"
                          : "[&_p]:text-[#8E9093]"
                      }`}
                    >
                      <PortableText value={feature.description} />
                    </div>

                    {/* Barre de progression - affichée seulement sur slide actif */}
                    {activeIndex === index && (
                      <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-4 md:left-5 lg:left-6 h-0.5 md:h-1 bg-white/30 rounded-2xl overflow-hidden w-1/2">
                        <div
                          className="h-full bg-white rounded-2xl"
                          style={{
                            width: "0%",
                            animation: "progressBar 5s linear infinite",
                          }}
                        />
                      </div>
                    )}

                    <Image
                      src={feature.icon}
                      alt={`${feature.title} icon`}
                      width={120}
                      height={100}
                      className="object-cover absolute bottom-0 right-0 w-[80px] h-[70px] sm:w-[120px] sm:h-[100px] lg:w-[150px] lg:h-[130px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center mt-4 md:mt-6 gap-1.5 md:gap-2">
          {features.featuresList.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-500 w-4 md:w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleFeatureClick(index)}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes progressBar {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
