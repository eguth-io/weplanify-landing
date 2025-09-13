"use client";

import { Trip, TripsType } from "@/sanity/lib/type";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { PulsatingButton } from "./magicui/pulsating-button";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function AvisTrips({ trips }: { trips: TripsType }) {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [slidesPerView, setSlidesPerView] = useState(1);
  const swiperRef = useRef<SwiperType>(null);

  // Determine number of visible slides based on screen size
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // lg: 3 items
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2); // md: 2 items
      } else {
        setSlidesPerView(1); // sm: 1 item
      }
    };

    updateSlidesPerView();
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);


  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentIndex(swiper.activeIndex);
  };


  return (
    <div className="relative mt-8 md:mt-40 flex flex-col items-center justify-center">
      <div className="w-2/3 mx-auto lg:w-full text-center text-xl lg:text-[40px] font-unbounded [&_p]:text-black lg:[&_strong]:text-[#F6391A]">
        <PortableText value={trips.title} />
      </div>

      {/* Decorative gradient */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, transparent 40%, rgba(246, 57, 26, 0.15) 70%, rgba(246, 57, 26, 0.08) 100%)'
        }}
      />

      <div className="relative w-full mt-16 px-4 lg:px-0">
        <div className="relative overflow-hidden rounded-lg">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={16}
            slidesPerView={slidesPerView}
            initialSlide={1}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={handleSlideChange}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            onReachEnd={() => {
              // Revient au début quand on arrive à la fin
              setTimeout(() => {
                swiperRef.current?.slideTo(0, 800);
              }, 4000);
            }}
            loop={false}
            speed={800}
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
                slidesPerView: 1.5,
                spaceBetween: 16,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: true,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: true,
              },
              1536: {
                slidesPerView: 3,
                spaceBetween: 16,
                centeredSlides: true,
              },
            }}
            className="trips-swiper"
          >
            {trips.tripsList.map((trip: Trip, index: number) => (
              <SwiperSlide key={index}>
                <div 
                  className="w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 group cursor-pointer my-4"
                  onClick={() => {
                    swiperRef.current?.slideTo(index);
                  }}
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={trip.tripImage}
                      alt={`Trip ${trip.firstName}`}
                      width={338}
                      height={240}
                      className="w-full h-[200px] sm:h-[220px] md:h-[240px] lg:h-[260px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center gap-3">
                        <Image
                          src={trip.profileImage}
                          alt="profile"
                          width={40}
                          height={40}
                          className="rounded-full w-[40px] h-[40px] object-cover border-2 border-white shadow-lg"
                          style={{ borderRadius: '50% !important' }}
                        />
                        <div className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                          <div className="font-semibold text-sm text-gray-800">{trip.firstName}</div>
                        </div>
                      </div>
                    </div>

                    {/* Destination overlay - full width bottom */}
                    <div className="absolute bottom-0 left-0 right-0">
                      <div className="bg-black/60 backdrop-blur-sm p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="opacity-80">
                              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span className="text-xs text-white font-medium">Barcelone, Espagne</span>
                          </div>
                          <div className="text-xs text-white/80">5 jours</div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Content section - unified with image */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#F6391A] rounded-full"></div>
                      <span className="text-sm font-semibold text-gray-800">Expérience de voyage</span>
                    </div>
                    
                    <div className="text-sm text-gray-700 leading-relaxed [&_p]:text-gray-700 mb-4">
                      <PortableText value={trip.description} />
                    </div>
                    
                    {/* Action button */}
                    <div className="relative group">
                      <PulsatingButton className="w-full text-sm" disabled>
                        Voir ce voyage
                      </PulsatingButton>
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                        Bientôt disponible
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>


        {/* Indicateurs de progression - Enhanced design */}
        {trips.tripsList.length > 1 && (
          <div className="flex justify-center mt-6 gap-3">
            {trips.tripsList.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`relative rounded-full transition-all duration-300 hover:scale-110 ${
                  index === currentIndex
                    ? "bg-[#F6391A] w-6 h-2 shadow-lg pulse-glow"
                    : "bg-gray-300 hover:bg-gray-400 w-2 h-2"
                }`}
              >
                {/* Active indicator with glow effect */}
                {index === currentIndex && (
                  <div className="absolute inset-0 bg-[#F6391A] rounded-full animate-pulse opacity-60"></div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <style jsx global>{`
        .trips-swiper {
          width: 100%;
          height: auto;
          overflow: visible;
        }

        .trips-swiper .swiper-slide {
          height: auto;
          display: flex;
          opacity: 0.8;
          transform: scale(0.95);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .trips-swiper .swiper-slide-active {
          opacity: 1;
          transform: scale(1);
        }

        /* Ensure border-radius is preserved on hover */
        .trips-swiper .swiper-slide > div {
          border-radius: 1rem !important;
          overflow: hidden !important;
        }

        .trips-swiper .swiper-slide > div img {
          border-radius: 0 !important;
        }

        .trips-swiper .swiper-slide > div:hover {
          border-radius: 1rem !important;
          overflow: hidden !important;
        }


        .trips-swiper .swiper-wrapper {
          align-items: stretch;
        }

        /* Enhanced card animations */
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .trips-swiper .swiper-slide-active > div {
          animation: slideInUp 0.6s ease-out;
        }

        /* Glow effect for active indicators */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(246, 57, 26, 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px rgba(246, 57, 26, 0.1);
          }
        }

        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }

        /* Smooth transitions for all interactive elements */
        * {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
