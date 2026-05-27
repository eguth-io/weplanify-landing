"use client";

import Image from "next/image";
import { useState } from "react";
import { trackEvent } from "@/lib/tracking";

type Lang = "en" | "fr";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  title: string;
  items: FAQItem[];
  supportTitle: string;
  supportDescription: string;
  supportButtonText: string;
  supportButtonUrl: string;
}

const CONTENT: Record<Lang, FAQContent> = {
  fr: {
    title: "Un voyage sans questions",
    supportTitle: "Support 24h/24 7j/7",
    supportDescription:
      "Tu as une question sur une fonctionnalité ?\nBesoin d'inspiration pour un itinéraire ?\nNotre équipe répond vite et te guide pour tirer le meilleur de WePlanify.\n\nParce que l'expérience utilisateur est notre priorité.",
    supportButtonText: "Contacter l'équipe",
    supportButtonUrl: "/contact",
    items: [
      {
        question: "WePlanify est-il gratuit ?",
        answer:
          "Oui, WePlanify est actuellement gratuit pour les bêta-testeurs. Nous prévoyons d'introduire des plans premium avec des fonctionnalités avancées, mais les fonctionnalités de base resteront toujours gratuites.",
      },
      {
        question: "Tout le monde peut-il participer à la planification ?",
        answer:
          "Absolument ! Chaque participant peut suggérer des idées, voter sur les activités, suivre le budget et consulter l'itinéraire en temps réel. Aucun compte requis pour les invités.",
      },
      {
        question: "Comment créer un compte ?",
        answer:
          "Clique simplement sur 'Commencer' et inscris-toi avec ton email ou ton compte Google. Il faut moins de 30 secondes pour créer ton premier voyage.",
      },
      {
        question: "Mes données sont-elles sécurisées ?",
        answer:
          "Oui, nous prenons la sécurité très au sérieux. Tes données sont chiffrées et stockées de manière sécurisée. Nous ne partageons jamais tes informations personnelles avec des tiers.",
      },
      {
        question: "Puis-je utiliser WePlanify sur mobile ?",
        answer:
          "Oui ! WePlanify fonctionne sur tous les appareils — ordinateur, tablette ou smartphone. Accède à tes voyages où que tu sois avec notre application web responsive.",
      },
      {
        question: "Comment contacter le support ?",
        answer:
          "Tu peux nous contacter via notre page contact ou par email à support@weplanify.com. Nous répondons généralement sous 24 heures.",
      },
      {
        question: "Comment inviter des amis à mon voyage ?",
        answer:
          "Partage ton lien de voyage unique avec tes amis par email, WhatsApp ou toute autre messagerie. Ils peuvent rejoindre instantanément sans créer de compte.",
      },
    ],
  },
  en: {
    title: "Frequently Asked\nQuestions",
    supportTitle: "Need Help With Your Trip Plan?",
    supportDescription:
      "Have a question about a feature?\nNeed ideas for your group itinerary?\nOur team responds quickly and helps you get the most out of WePlanify for your next group adventure.\n\nBecause user experience is our priority.",
    supportButtonText: "Contact Our Team",
    supportButtonUrl: "/contact",
    items: [
      {
        question: "Is WePlanify free?",
        answer:
          "Yes, WePlanify is currently free for beta testers. We plan to introduce premium plans with advanced features in the future, but the core functionality will always remain free.",
      },
      {
        question: "Can everyone participate in trip planning?",
        answer:
          "Absolutely! Every participant can suggest ideas, vote on activities, track the budget, and view the itinerary in real-time. No account required for guests.",
      },
      {
        question: "How do I create an account?",
        answer:
          "Simply click 'Get Started' and sign up with your email or Google account. It takes less than 30 seconds to create your first trip.",
      },
      {
        question: "Is my data secure?",
        answer:
          "Yes, we take security seriously. Your data is encrypted and stored securely. We never share your personal information with third parties.",
      },
      {
        question: "Can I use WePlanify on mobile?",
        answer:
          "Yes! WePlanify works on any device — desktop, tablet, or smartphone. Access your trips anywhere with our responsive web app.",
      },
      {
        question: "How can I contact support?",
        answer:
          "You can reach us via our contact page or email us at support@weplanify.com. We typically respond within 24 hours.",
      },
      {
        question: "How do I invite friends to my trip?",
        answer:
          "Share your unique trip link with friends via email, WhatsApp, or any messaging app. They can join instantly without creating an account.",
      },
    ],
  },
};

interface FAQSupportProps {
  locale?: string;
}

export default function FAQSupport({ locale = "en" }: FAQSupportProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const content = CONTENT[lang];
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : -1);
    if (isOpening) {
      trackEvent("faq_toggle", { question: content.items[index].question });
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.items.map((item) => ({
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
              {content.title}
            </h2>

            <div className="space-y-3">
              {content.items.map((item, index) => (
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
              {content.supportTitle}
            </h2>

            <div className="flex-grow">
              <p className="text-[#001E13] text-sm lg:text-base font-karla font-semibold leading-relaxed whitespace-pre-line">
                {content.supportDescription}
              </p>
              <Image
                src="/faq-support.webp"
                alt={
                  lang === "fr"
                    ? "Des amis planifient leur voyage de groupe autour d'un ordinateur et d'une carte"
                    : "Friends planning their group trip together around a laptop and a map"
                }
                width={760}
                height={950}
                className="mt-6 lg:mt-8 mx-auto w-full max-w-[300px] h-auto rounded-[20px] lg:rounded-[24px] object-cover"
              />
            </div>

            <div className="mt-8 lg:mt-12">
              <a href={content.supportButtonUrl}>
                <button className="bg-[#001E13] text-white px-6 py-2 rounded-full font-karla font-bold text-sm lg:text-base hover:bg-[#001E13]/90 transition-colors ring-4 ring-[#001E13] ring-opacity-15">
                  {content.supportButtonText}
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
