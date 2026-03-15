"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { AiGlobeJourney, SwipeExplorer, LiveCollaboration, LiveVoting } from "@/components/animations";

type AnimationType = "ai-globe" | "swipe-explorer" | "live-collaboration" | "live-voting";

interface Card {
  imagePosition: "left" | "right";
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  animation?: AnimationType;
  backgroundColor: string;
  ctaLabel?: string;
  ctaUrl?: string;
  ctaTextColor?: string;
  ctaBackgroundColor?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

interface StackingCardsProps {
  data: {
    stackingCardsTitle?: string;
    stackingCards: Card[];
  };
}

const defaultCards: Card[] = [
  {
    imagePosition: "left",
    title: "A clear itinerary, day by day",
    description:
      "Let AI create your perfect itinerary in seconds. Just describe your dream trip and get a detailed day-by-day plan with activities, restaurants, and hidden gems.",
    animation: "ai-globe",
    backgroundColor: "#FFFBF5",
    ctaLabel: "Plan my trip with AI",
    ctaUrl: "/features/ai-planning",
    ctaTextColor: "#FFFFFF",
    ctaBackgroundColor: "#F6391A",
    stats: [
      { value: "30s", label: "Average planning time" },
      { value: "12k+", label: "Trips planned" },
    ],
  },
  {
    imagePosition: "right",
    title: "Decide together with polls",
    description:
      "No more endless WhatsApp debates. Create instant polls for destinations, dates, restaurants - and let the group decide in minutes.",
    animation: "live-voting",
    backgroundColor: "#EEF899",
    ctaLabel: "Create a poll",
    ctaUrl: "/features/polls",
    ctaTextColor: "#FFFFFF",
    ctaBackgroundColor: "#8B5CF6",
    stats: [
      { value: "50k+", label: "Decisions made" },
      { value: "2min", label: "Average decision time" },
    ],
  },
  {
    imagePosition: "left",
    title: "Real-time collaboration",
    description:
      "Everyone edits the same trip simultaneously. See changes live, leave comments, and stay perfectly synced - no more version chaos.",
    animation: "live-collaboration",
    backgroundColor: "#61DBD5",
    ctaLabel: "Invite my friends",
    ctaUrl: "/features/collaboration",
    ctaTextColor: "#FFFFFF",
    ctaBackgroundColor: "#F6391A",
    stats: [
      { value: "45s", label: "To invite your group" },
      { value: "100%", label: "Real-time sync" },
    ],
  },
];

function Card({ card, index }: { card: Card; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(animationRef, { once: false, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Animation component based on type
  const AnimationComponent = () => {
    switch (card.animation) {
      case "ai-globe":
        return <AiGlobeJourney autoPlay={isInView} />;
      case "swipe-explorer":
        return <SwipeExplorer autoPlay={isInView} />;
      case "live-collaboration":
        return <LiveCollaboration autoPlay={isInView} />;
      case "live-voting":
        return <LiveVoting autoPlay={isInView} />;
      default:
        return null;
    }
  };

  // Image/Animation section
  const ImageSection = () => (
    <div ref={animationRef} className="relative h-full min-h-[300px] lg:min-h-[600px] overflow-hidden">
      {card.animation ? (
        <AnimationComponent />
      ) : card.image ? (
        <Image
          src={card.image}
          alt={card.imageAlt || card.title}
          fill
          className="object-cover"
          quality={100}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-karla text-center px-4">
          Recommended format: 800x600px (4:3 ratio)
        </div>
      )}
    </div>
  );

  // Content component - with CTA button (for first card or cards with ctaLabel)
  const ContentWithCTA = () => (
    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
      <div>
        <h3 className="text-[#001E13] text-3xl lg:text-4xl xl:text-5xl font-londrina-solid leading-tight mb-6 lg:mb-8">
          {card.title}
        </h3>
        <p className="text-[#001E13] text-sm lg:text-base font-karla leading-relaxed mb-8 lg:mb-10">
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

        {card.ctaLabel && (
          <Link href={card.ctaUrl || "#"}>
            <button
              className="px-8 py-3 rounded-full font-karla font-bold text-sm lg:text-base hover:opacity-90 transition-all ring-4"
              style={{
                backgroundColor: card.ctaBackgroundColor || "#F6391A",
                color: card.ctaTextColor || "#FFFFFF",
                boxShadow: `0 0 0 4px ${card.ctaBackgroundColor || "#F6391A"}40`,
              }}
            >
              {card.ctaLabel}
            </button>
          </Link>
        )}
      </div>
    </div>
  );

  // Content component - without CTA button
  const ContentWithoutCTA = () => (
    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
      <h3 className="text-[#001E13] text-3xl lg:text-4xl xl:text-5xl font-londrina-solid leading-tight mb-6 lg:mb-8">
        {card.title}
      </h3>
      <p className="text-[#001E13] text-sm lg:text-base font-karla leading-relaxed mb-8 lg:mb-10">
        {card.description}
      </p>
      {card.stats && card.stats.length > 0 && (
        <div className="flex gap-4">
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
    </div>
  );

  // Determine layout based on imagePosition
  const isImageLeft = card.imagePosition === "left";
  const hasCTA = !!card.ctaLabel;

  return (
    <div ref={containerRef} className="h-screen flex items-start justify-center px-4 lg:px-8" style={{
      position: 'sticky',
      top: `calc(120px + ${index * 25}px)`
    }}>
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
              {hasCTA ? <ContentWithCTA /> : <ContentWithoutCTA />}
            </>
          ) : (
            <>
              {hasCTA ? <ContentWithCTA /> : <ContentWithoutCTA />}
              <ImageSection />
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default function StackingCards({ data }: StackingCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Merge Sanity data with default animations - use animation from defaults if Sanity card doesn't have one
  const cards = (data?.stackingCards || defaultCards).map((card, index) => {
    // If card already has animation, use it
    if (card.animation) return card;

    // Otherwise, try to use animation from defaultCards at same index
    const defaultAnimation = defaultCards[index]?.animation;
    if (defaultAnimation) {
      return { ...card, animation: defaultAnimation };
    }

    return card;
  });

  return (
    <div ref={containerRef} className="bg-[#FFFBF5]">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-6 lg:pb-10">
        <h2 className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid text-center">
          {data?.stackingCardsTitle || "From idea to perfect trip in just a few clicks."}
        </h2>
      </div>
      <div className="relative h-[400vh]">
        {cards.map((card, index) => (
          <Card
            key={index}
            card={card}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
