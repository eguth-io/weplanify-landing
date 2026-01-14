"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSupportProps {
  data: {
    title: string;
    items: FAQItem[];
  };
}

export default function FAQSupport({ data }: FAQSupportProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="px-4 lg:px-8 pb-4 lg:pb-6 pt-2 lg:pt-3">
      <div className="max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {/* Left Side - FAQ */}
          <div className="bg-white rounded-[24px] lg:rounded-[32px] p-8 lg:p-12">
            <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid mb-6 lg:mb-8 whitespace-pre-line">
              {data.title}
            </h2>

            <div className="space-y-3">
              {data.items.map((item, index) => (
                <div
                  key={index}
                  className={`border-2 rounded-[16px] overflow-hidden transition-all duration-300 ${
                    openIndex === index
                      ? "border-[#F6391A] bg-[#F6391A]"
                      : "border-[#F6391A] bg-white"
                  }`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-3 lg:p-4 text-left"
                  >
                    <span
                      className={`font-karla font-semibold text-sm lg:text-base ${
                        openIndex === index ? "text-white" : "text-[#F6391A]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 lg:w-6 lg:h-6 transition-transform duration-300 flex-shrink-0 ml-2 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke={openIndex === index ? "#FFFFFF" : "#F6391A"}
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-3 lg:px-4 pb-3 lg:pb-4">
                      <p className="text-white text-sm lg:text-base font-karla leading-relaxed whitespace-pre-line">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - 24/7 Support */}
          <div className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] p-8 lg:p-12 flex flex-col">
            <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid mb-4 lg:mb-6">
              24/7 Support
            </h2>

            <div className="flex-grow">
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed mb-1">
                Une question sur une fonctionnalité ?
              </p>
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed mb-1">
                Besoin d&apos;inspiration pour un itinéraire ?
              </p>
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed mb-6">
                Notre équipe répond rapidement et vous guide pour tirer le meilleur de WePlanify.
              </p>
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed">
                Parce que votre réussite, c&apos;est notre priorité.
              </p>
            </div>

            <div className="mt-8 lg:mt-12">
              <button className="bg-[#001E13] text-white px-6 py-2 rounded-full font-karla font-bold text-sm lg:text-base hover:bg-[#001E13]/90 transition-colors ring-4 ring-[#001E13] ring-opacity-15">
                Contacter l&apos;équipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
