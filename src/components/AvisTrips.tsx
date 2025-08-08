"use client";

import { Trip, TripsType } from "@/sanity/lib/type";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AvisTrips({ trips }: { trips: TripsType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const swiperRef = useRef<SwiperType>(null);

  // Déterminer le nombre de slides visibles selon la taille d'écran
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // lg: 3 éléments
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2); // md: 2 éléments
      } else {
        setSlidesPerView(1); // sm: 1 élément
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const nextSlide = () => {
    swiperRef.current?.slideNext();
  };

  const prevSlide = () => {
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  };

  const maxIndex = Math.max(0, trips.tripsList.length - slidesPerView);

  return (
    <div className="relative mt-40 flex flex-col items-center justify-center">
      <div className="w-2/3 mx-auto lg:w-full text-center text-xl lg:text-[40px] font-unbounded [&_p]:text-black lg:[&_strong]:text-[#F6391A]">
        <PortableText value={trips.title} />
      </div>

      {/* Images de décoration */}
      <img
        src="/line1.svg"
        alt="pass"
        className="hidden lg:block -z-10 absolute top-0 left-0"
      />
      <img
        src="/line2.svg"
        alt="pass"
        className="hidden lg:block -z-10 absolute -right-0 top-28"
      />
      <img
        src="/line1Mobile.svg"
        alt="pass"
        className="lg:hidden -z-10 absolute top-0 left-0"
      />
      <img
        src="/line2Mobile.svg"
        alt="pass"
        className="lg:hidden absolute -right-0 bottom-40"
      />

      <div className="relative w-4/5 mt-16">
        {/* Navigation Arrows Mobile - En haut à droite */}
        {/*{trips.tripsList.length > slidesPerView && (*/}
        {/*  <div className="lg:hidden flex gap-2 justify-end mb-4 z-20 relative">*/}
        {/*    <button onClick={prevSlide} className="transition-all duration-200">*/}
        {/*      <Image src="/arrow.svg" alt="Previous" width={24} height={24} />*/}
        {/*    </button>*/}
        {/*    <button*/}
        {/*      onClick={nextSlide}*/}
        {/*      className="transition-all duration-200 rotate-180"*/}
        {/*    >*/}
        {/*      <Image src="/arrow.svg" alt="Next" width={24} height={24} />*/}
        {/*    </button>*/}
        {/*  </div>*/}
        {/*)}*/}

        {/* Swiper Container */}
        <div className="relative overflow-hidden rounded-lg">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={slidesPerView}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
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
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
              },
            }}
            className="trips-swiper"
          >
            {trips.tripsList.map((trip: Trip, index: number) => (
              <SwiperSlide key={index}>
                <div className="w-full flex flex-col">
                  <div className="relative rounded-lg">
                    <Image
                      src={trip.tripImage}
                      alt={`Trip ${trip.firstName}`}
                      width={338}
                      height={340}
                      style={{ borderRadius: "8px" }}
                      className="w-[350px] h-[370px] lg:w-full lg:h-[400px] object-cover rounded-2xl"
                    />

                    <div className="absolute top-4 left-4 flex items-center gap-3">
                      <Image
                        src={trip.profileImage}
                        alt="profile"
                        width={48}
                        height={48}
                      />
                      <div className="text-white font-semibold text-[13px] drop-shadow-lg">
                        {trip.firstName}
                      </div>
                    </div>
                  </div>

                  <div className="text-sm mt-6 [&_p]:text-black">
                    <PortableText value={trip.description} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Navigation Arrows Desktop */}
        {trips.tripsList.length > slidesPerView && (
          <>
            <button
              onClick={prevSlide}
              className="hidden lg:block absolute left-[-64px] top-1/2 transform -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
            >
              <Image src="/arrow.svg" alt="Previous" width={47} height={47} />
            </button>

            <button
              onClick={nextSlide}
              className="hidden lg:block absolute right-[-64px] top-1/2 transform -translate-y-1/2 z-10 rotate-180 hover:scale-110 transition-transform duration-200"
            >
              <Image src="/arrow.svg" alt="Next" width={47} height={47} />
            </button>
          </>
        )}

        {/* Indicateurs de progression */}
        {maxIndex > 0 && (
          <div className="flex justify-center mt-6 gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-[#F6391A] w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .trips-swiper {
          width: 100%;
          height: auto;
        }

        .trips-swiper .swiper-slide {
          height: auto;
          display: flex;
        }

        .trips-swiper .swiper-wrapper {
          align-items: stretch;
        }
      `}</style>
    </div>
  );
}
