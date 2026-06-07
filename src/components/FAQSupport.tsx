"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/tracking";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSupport() {
  const t = useTranslations("faqSupport");
  const items = t.raw("items") as FAQItem[];
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : -1);
    if (isOpening) {
      trackEvent("faq_toggle", { question: items[index].question });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="px-4 lg:px-8 pt-8 lg:pt-12 pb-4 lg:pb-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-[1536px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          <div className="bg-white rounded-[24px] lg:rounded-[32px] p-8 lg:p-12">
            <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid mb-6 lg:mb-8 whitespace-pre-line">
              {t("title")}
            </h2>

            <div className="space-y-3">
              {items.map((item, index) => (
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
                    className={`grid transition-all duration-300 ${
                      openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-3 lg:px-4 pb-3 lg:pb-4">
                        <p className="text-white text-sm lg:text-base font-karla leading-relaxed whitespace-pre-line">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] p-8 lg:p-12 flex flex-col">
            <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid mb-4 lg:mb-6">
              {t("supportTitle")}
            </h2>

            <div className="flex-grow flex flex-col">
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed whitespace-pre-line">
                {t("supportDescription")}
              </p>

              <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:gap-4 flex-grow min-h-[260px] lg:min-h-[340px] mt-6 lg:mt-8">
                <div className="relative row-span-2 rounded-[16px] overflow-hidden">
                  <Image
                    src="/faq-img-1.webp"
                    alt={t("supportTitle")}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative rounded-[16px] overflow-hidden">
                  <Image
                    src="/faq-img-2.webp"
                    alt={t("supportTitle")}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className="relative rounded-[16px] overflow-hidden">
                  <Image
                    src="/faq-img-3.webp"
                    alt={t("supportTitle")}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-12">
              <a href={t("supportButtonUrl")}>
                <button className="bg-[#001E13] text-white px-6 py-2 rounded-full font-karla font-bold text-sm lg:text-base hover:bg-[#001E13]/90 transition-colors ring-4 ring-[#001E13] ring-opacity-15">
                  {t("supportButtonText")}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
