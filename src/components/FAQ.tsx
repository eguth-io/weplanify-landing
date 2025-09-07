"use client";

import { FAQType } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import { useState } from "react";

export default function FAQ({ faq }: { faq: FAQType }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
            .map((block: unknown) => {
              const blockWithChildren = block as { children?: Array<{ text?: string }> };
              return blockWithChildren?.children?.map((child: { text?: string }) => child.text || '').join('') || '';
            })
            .join(' ')
        }
    }))
  };

  return (
    <div className="mt-28">
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqStructuredData)
        }}
      />
      <div className="text-xl lg:text-[40px] font-unbounded [&_p]:text-black [&_strong]:text-[#F6391A] font-semibold text-center">
        <PortableText value={faq.title} />
      </div>
      <div className="px-[30px] flex flex-col items-center justify-center gap-4 lg:w-[700px] mx-auto mt-12 w-full">
        {faq.questions.map(
          (question: FAQType["questions"][0], index: number) => (
            <article
              key={index}
              className={`w-full border border-[#F6391A] rounded-xl transition-all duration-300 ${
                openIndex === index
                  ? "border-[#F6391A] bg-[#F6391A] [&_p]:text-white"
                  : "border-gray-200"
              }`}
              itemScope
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full flex items-center justify-between px-6 py-4 text-left transition-colors duration-300 ${
                  openIndex === index ? "text-[#F6391A]" : "text-black"
                }`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                id={`faq-question-${index}`}
              >
                <h3 
                  className={`text-base font-semibold pr-4 ${
                    openIndex === index ? "text-white" : "text-[#F6391A]"
                  }`}
                  itemProp="name"
                >
                  {question.question}
                </h3>
                <div
                  className={`transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-90" : "rotate-0"
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke={openIndex === index ? "#fff" : "#F6391A"}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
                itemScope
                itemType="https://schema.org/Answer"
                role="region"
                aria-labelledby={`faq-question-${index}`}
                aria-hidden={openIndex !== index}
              >
                <div className="px-6 pb-6 [&_p]:text-white" itemProp="text">
                  <PortableText value={question.answer} />
                </div>
              </div>
            </article>
          ),
        )}
      </div>
    </div>
  );
}