"use client";

import { useState } from "react";

interface TestimonialCarouselProps {
  testimonials: Array<{
    quote: string;
    author: string;
    authorRole?: string;
  }>;
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="bg-white rounded-[24px] lg:rounded-[32px] p-8 lg:p-12 shadow-sm flex flex-col">
      <blockquote className="text-[#001E13] text-sm lg:text-[20px] leading-normal lg:leading-snug flex-1">
        &quot;{currentTestimonial.quote}&quot;
      </blockquote>
      <div className="mt-10 lg:mt-14 flex items-center justify-between">
        <div>
          <p className="text-[#001E13] font-londrina-solid text-xl lg:text-[24px]">
            {currentTestimonial.author}
          </p>
          {currentTestimonial.authorRole && (
            <p className="text-[#001E13]/60 text-sm font-karla">
              {currentTestimonial.authorRole}
            </p>
          )}
        </div>
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#FFFBF4] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Témoignage précédent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#005B37"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#FFFBF4] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Témoignage suivant"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#005B37"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
