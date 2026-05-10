"use client";

import { useState } from "react";

type Lang = "en" | "fr";

type Testimonial = {
  quote: string;
  author: string;
  authorRole: string;
};

const TESTIMONIALS: Record<Lang, Testimonial[]> = {
  fr: [
    {
      quote:
        "J'utilise WePlanify depuis quelques semaines pour planifier un voyage entre potes. L'interface est simple et le partage des tâches super pratique.",
      author: "Eva",
      authorRole: "Voyageuse passionnée",
    },
    {
      quote:
        "Pratique pour caler des étapes au fil du voyage. Je peux ajuster mes plans sans tout refaire.",
      author: "Tom",
      authorRole: "Digital nomad",
    },
    {
      quote:
        "Avec les sondages, on s'est mis d'accord sur l'hôtel en 10 minutes.",
      author: "Lucas",
      authorRole: "Voyage entre amis",
    },
    {
      quote: "Enfin un itinéraire clair pour toute la famille.",
      author: "Isabelle",
      authorRole: "Voyage en famille",
    },
  ],
  en: [
    {
      quote:
        "I've been using WePlanify for a few weeks to plan a trip with friends. The interface is simple and sharing tasks is super handy.",
      author: "Eva",
      authorRole: "Passionate traveler",
    },
    {
      quote:
        "Great for tweaking stops as I travel. I can adjust my plans without redoing everything.",
      author: "Tom",
      authorRole: "Digital nomad",
    },
    {
      quote: "With polls, we agreed on the hotel in 10 minutes.",
      author: "Lucas",
      authorRole: "Friends trip",
    },
    {
      quote: "We finally have a clear itinerary for the whole family.",
      author: "Isabelle",
      authorRole: "Family trip",
    },
  ],
};

interface TestimonialCarouselProps {
  locale?: string;
}

export default function TestimonialCarousel({ locale = "en" }: TestimonialCarouselProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const testimonials = TESTIMONIALS[lang];
  const [currentIndex, setCurrentIndex] = useState(0);

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
          <p className="text-[#001E13]/60 text-sm font-karla">
            {currentTestimonial.authorRole}
          </p>
        </div>
        {testimonials.length > 1 && (
          <div className="flex gap-2">
            <button
              onClick={handlePrevious}
              className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-[#FFFBF4] flex items-center justify-center hover:opacity-80 transition-opacity"
              aria-label="Previous testimonial"
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
              aria-label="Next testimonial"
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
