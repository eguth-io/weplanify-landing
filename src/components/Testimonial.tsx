"use client";

import Image from "next/image";

interface TestimonialProps {
  data: {
    list: Array<{
      quote: string;
      author: string;
      role: string;
      image: string;
    }>;
  };
}

export default function Testimonial({ data }: TestimonialProps) {
  if (!data || !data.list || data.list.length === 0) {
    return null;
  }

  // Prendre le premier témoignage
  const testimonial = data.list[0];

  return (
    <div className="px-4 lg:px-8 py-2 lg:py-3">
      <div className="max-w-[1536px] mx-auto">
        <div className="bg-white rounded-[24px] lg:rounded-[32px] p-8 lg:p-12 shadow-sm">
          <blockquote className="text-[#001E13] text-[20px] leading-snug text-center mb-6 lg:mb-8 italic max-w-4xl mx-auto">
            {testimonial.quote}
          </blockquote>

          <div className="flex flex-col items-center">
            <p className="text-[#001E13] font-londrina-solid text-[36px]">
              {testimonial.author}
            </p>
            <p className="text-[#001E13]/60 text-[20px] font-karla">
              {testimonial.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
