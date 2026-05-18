"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";
import { AiGlobeJourney, LiveCollaboration, LiveVoting } from "@/components/animations";

type Lang = "en" | "fr";
type AnimationType = "ai-globe" | "live-collaboration" | "live-voting";

const getRegisterUrl = (locale: string) =>
  `https://app.weplanify.com/${locale}/register?utm_source=landing`;

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

interface StackingCardsContent {
  title: string;
  cards: CardData[];
}

const CONTENT: Record<Lang, StackingCardsContent> = {
  fr: {
    title: "Des fonctionnalités pensées pour voyager ensemble",
    cards: [
      {
        imagePosition: "right",
        title: "Explore et propose des idées au groupe",
        description:
          "Trouve activités, restaurants, hébergement et transport directement dans l'app.\nAjoute-les à l'itinéraire ou soumets-les au vote du groupe.\n\nL'exploration devient collaborative.",
        animation: "ai-globe",
        backgroundColor: "#FFFFFF",
        ctaLabel: "Démarrer mon voyage",
                ctaTextColor: "#FFFFFF",
        ctaBackgroundColor: "#E83F28",
        stats: [{ value: "+190", label: "destinations possibles" }],
      },
      {
        imagePosition: "left",
        title: "Décidez ensemble grâce aux sondages",
        description:
          "Où dormir ?\nQue faire ?\nQuand partir ?\n\nCréez un sondage, chacun vote, la décision est prise.\nLe groupe avance. Le voyage aussi.",
        animation: "live-voting",
        backgroundColor: "#EEF899",
        ctaLabel: "Lancer un sondage",
                ctaTextColor: "#FFFBF5",
        ctaBackgroundColor: "#001E13",
        stats: [{ value: "1000+", label: "sondages quotidiens" }],
      },
      {
        imagePosition: "left",
        title: "Un itinéraire clair, jour après jour",
        description:
          "Chaque journée du voyage est structurée :\nque faire, où manger, où dormir, comment se déplacer.\n\nTout est clair pour tout le monde.",
        animation: "live-collaboration",
        backgroundColor: "#61DBD5",
        ctaLabel: "Explorer maintenant",
                ctaTextColor: "#FFFFFF",
        ctaBackgroundColor: "#001E13",
        stats: [{ value: "10+", label: "partenaires" }],
      },
    ],
  },
  en: {
    title: "Everything You Need to Plan a Group Trip",
    cards: [
      {
        imagePosition: "right",
        title: "Explore and propose ideas to the group",
        description:
          "Find activities, restaurants, accommodation and transport directly in the app.\nAdd them to the itinerary or propose them to the group to vote.\n\nExploration becomes collaborative.",
        animation: "ai-globe",
        backgroundColor: "#FFFFFF",
        ctaLabel: "Start my journey",
                ctaTextColor: "#FFFFFF",
        ctaBackgroundColor: "#E83F28",
        stats: [{ value: "190+", label: "Possible destinations" }],
      },
      {
        imagePosition: "left",
        title: "Decide together with polls",
        description:
          "Where to stay?\nWhat to do?\nWhen to leave?\n\nCreate a poll, everyone votes, the decision is made.\nThe group moves forward. The trip too.",
        animation: "live-voting",
        backgroundColor: "#EEF899",
        ctaLabel: "Start a poll",
                ctaTextColor: "#FFFBF5",
        ctaBackgroundColor: "#001E13",
        stats: [{ value: "1000+", label: "Daily polls" }],
      },
      {
        imagePosition: "left",
        title: "A clear itinerary, day by day",
        description:
          "Each day of the trip is structured:\nwhat to do, where to eat, where to sleep, how to get there.\n\nEverything is clear for everyone.",
        animation: "live-collaboration",
        backgroundColor: "#61DBD5",
        ctaLabel: "Explore now",
                ctaTextColor: "#FFFFFF",
        ctaBackgroundColor: "#001E13",
        stats: [{ value: "10+", label: "Partners" }],
      },
    ],
  },
};

interface StackingCardsProps {
  locale?: string;
}

function Card({ card, index, locale }: { card: CardData; index: number; locale: string }) {
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
                <p className="text-[#001E13] text-xs lg:text-sm font-nanum-pen">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}

        <Link href={getRegisterUrl(locale)} rel="nofollow">
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
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const { title, cards } = CONTENT[lang];
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="bg-[#FFFBF5]">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-6 lg:pb-10">
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
