"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AiGlobeJourney, LiveCollaboration, LiveVoting } from "@/components/animations";
import { useRegisterHref } from "@/lib/attribution/use-register-href";

type AnimationType = "ai-globe" | "live-collaboration" | "live-voting";

interface CardData {
  imagePosition: "left" | "right";
  title: string;
  description: string;
  animation: AnimationType;
  backgroundColor: string;
  ctaLabel: string;
  ctaTextColor: string;
  ctaBackgroundColor: string;
  stats?: { value: string; label: string }[];
}

interface StackingCardsProps {
  locale?: string;
}

function Card({ card, index, locale }: { card: CardData; index: number; locale: string }) {
  const registerUrl = useRegisterHref({ locale, medium: "stacking-cards" });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  // amount: 0.1 fires once 10% of the animation panel is visible, which is
  // reliable with the sticky stacking-card scroll behaviour (the previous
  // `margin: '-100px'` threshold rarely fired automatically, so users had
  // to hover/click to kick the animation off).
  const isInView = useInView(animationRef, { once: false, amount: 0.1 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  const AnimationComponent = () => {
    switch (card.animation) {
      case "ai-globe":
        return <AiGlobeJourney autoPlay={isInView} locale={locale} />;
      case "live-collaboration":
        return <LiveCollaboration autoPlay={isInView} locale={locale} />;
      case "live-voting":
        return <LiveVoting autoPlay={isInView} locale={locale} />;
      default:
        return null;
    }
  };

  const ImageSection = () => (
    <div
      ref={animationRef}
      className="relative h-full min-h-[300px] lg:min-h-[600px] overflow-hidden"
    >
      <AnimationComponent />
    </div>
  );

  const ContentSection = () => (
    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
      <div>
        <h3 className="text-[#001E13] text-3xl lg:text-4xl xl:text-5xl font-londrina-solid leading-tight mb-6 lg:mb-8">
          {card.title}
        </h3>
        <p className="text-[#001E13] text-sm lg:text-base font-karla leading-relaxed mb-8 lg:mb-10 whitespace-pre-line">
          {card.description}
        </p>
      </div>

      <div>
        {card.stats && card.stats.length > 0 && (
          <div className="flex gap-8 lg:gap-12 mb-8 lg:mb-10">
            {card.stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col">
                <p className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid mb-2">
                  {stat.value}
                </p>
                <p className="text-[#001E13] text-base lg:text-lg font-nanum-pen">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link href={registerUrl} rel="nofollow">
          <button
            className="px-8 py-3 rounded-full font-karla font-bold text-sm lg:text-base hover:opacity-90 transition-all ring-4"
            style={{
              backgroundColor: card.ctaBackgroundColor,
              color: card.ctaTextColor,
              boxShadow: `0 0 0 4px ${card.ctaBackgroundColor}40`,
            }}
          >
            {card.ctaLabel}
          </button>
        </Link>
      </div>
    </div>
  );

  const isImageLeft = card.imagePosition === "left";

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex items-start justify-center px-4 lg:px-8"
      style={{
        position: "sticky",
        top: `calc(120px + ${index * 25}px)`,
      }}
    >
      <motion.div
        style={{
          scale,
          backgroundColor: card.backgroundColor,
        }}
        className="w-full max-w-[1536px] rounded-[24px] lg:rounded-[40px] shadow-2xl overflow-hidden origin-top"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] [&>*]:h-full">
          {isImageLeft ? (
            <>
              <ImageSection />
              <ContentSection />
            </>
          ) : (
            <>
              <ContentSection />
              <ImageSection />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards({ locale = "en" }: StackingCardsProps) {
  const t = useTranslations("stackingCards");
  const title = t("title");
  const cards = t.raw("cards") as CardData[];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-[#FFFBF5]">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 pt-8 lg:pt-12 pb-6 lg:pb-10">
        <h2 className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid text-center">
          {title}
        </h2>
      </div>
      <div className="relative" style={{ height: `${cards.length * 100}vh` }}>
        {cards.map((card, index) => (
          <Card key={index} card={card} index={index} locale={locale} />
        ))}
      </div>
    </div>
  );
}
