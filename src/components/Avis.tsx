"use client";

import { AvisType } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useState } from "react";

export default function Avis({ data }: { data: AvisType }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="mt-40 bg-[#006F8E] relative">
      <div className="pt-16 text-center text-[40px] font-unbounded [&_p]:text-white [&_strong]:text-white">
        <PortableText value={data.title} />
      </div>
      <Image
        src="/stars.png"
        alt="pass"
        width={130}
        height={26}
        className="mx-auto mt-10"
      />

      <div className="relative overflow-hidden">
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
            )
          )}
        </div>
      </div>

      {/* Navigation Arrows */}
      {data.testimonials.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 hover:scale-110 transition-transform duration-200"
          >
            <Image src="/arrowRed.svg" alt="Previous" width={47} height={47} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 rotate-180 hover:scale-110 transition-transform duration-200"
          >
            <Image src="/arrowRed.svg" alt="Next" width={47} height={47} />
          </button>
        </>
      )}

      {/* Indicateurs de progression */}
      {data.testimonials.length > 1 && (
        <div className="flex justify-center pb-8 gap-2">
          {data.testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
