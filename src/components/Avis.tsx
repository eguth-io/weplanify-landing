"use client";

import { AvisType } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Avis({ data }: { data: AvisType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.testimonials.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.testimonials.length - 1 : prevIndex - 1,
    );
  };

  // Gestion du drag/touch pour mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap vers la carte la plus proche après le swipe
    if (containerRef.current) {
      const container = containerRef.current;
      const cardWidth = container.clientWidth;
      const scrollPosition = container.scrollLeft;
      const newIndex = Math.round(scrollPosition / cardWidth);

      setCurrentIndex(Math.min(newIndex, data.testimonials.length - 1));

      container.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mt-20 md:mt-32 lg:mt-40 bg-[#006F8E] relative">
      {/* Titre responsive */}
      <div className="pt-8 md:pt-12 lg:pt-16 text-center text-xl md:text-3xl lg:text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white px-4 md:px-6">
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

      {/* Desktop: Carousel classique avec flèches */}
      <div className="hidden lg:block relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {data.testimonials.map(
            (testimonial: AvisType["testimonials"][0], index: number) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center justify-center py-16 px-8"
              >
                <div className="text-center text-4xl font-semibold [&_p]:text-white max-w-4xl">
                  <PortableText value={testimonial.description} />
                </div>
                <Image
                  src={testimonial.profileImage}
                  alt="profile"
                  width={60}
                  height={60}
                  className="rounded-full mt-10"
                />
                <p className="mt-4 text-white font-semibold text-xl">
                  {testimonial.name}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Mobile/Tablet: Carousel avec swipe */}
      <div className="lg:hidden relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
          style={{
            scrollBehavior: "smooth",
            scrollSnapType: "x mandatory",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {data.testimonials.map(
            (testimonial: AvisType["testimonials"][0], index: number) => (
              <div
                key={index}
                className="w-full flex-shrink-0 flex flex-col items-center justify-center py-8 md:py-12 px-4 md:px-6"
                style={{ scrollSnapAlign: "start" }}
              >
                {/* Description responsive */}
                <div className="text-center text-lg md:text-2xl lg:text-4xl font-medium md:font-semibold [&_p]:text-white max-w-3xl leading-relaxed">
                  <PortableText value={testimonial.description} />
                </div>

                {/* Profile image responsive */}
                <Image
                  src={testimonial.profileImage}
                  alt="profile"
                  width={50}
                  height={50}
                  className="rounded-full mt-6 md:mt-8 lg:mt-10 w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
                />

                {/* Nom responsive */}
                <p className="mt-3 md:mt-4 text-white font-medium md:font-semibold text-lg md:text-xl">
                  {testimonial.name}
                </p>
              </div>
            ),
          )}
        </div>
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
                setCurrentIndex(index);
                // Sur mobile, scroll vers la bonne position
                if (window.innerWidth < 1024 && containerRef.current) {
                  const container = containerRef.current;
                  const cardWidth = container.clientWidth;
                  container.scrollTo({
                    left: index * cardWidth,
                    behavior: "smooth",
                  });
                }
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
    </div>
  );
}
