"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Card {
  imagePosition: "left" | "right";
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
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
    title: "Structure de votre voyage",
    description:
      "Planifiez votre voyage / événement en toute simplicité. Créez des itinéraires, partagez vos activités et partez l'esprit tranquille.",
    image: "/placeholder-card-1.jpg",
    backgroundColor: "#FFFBF5",
    ctaLabel: "Commencer mon voyage",
    ctaTextColor: "#FFFFFF",
    ctaBackgroundColor: "#F6391A",
    stats: [
      { value: "120+", label: "Destination possible" },
      { value: "120+", label: "Destination possible" },
    ],
  },
  {
    imagePosition: "right",
    title: "Collaborez en équipe",
    description:
      "Invitez vos amis et partagez vos idées. Organisez votre voyage ensemble et créez des souvenirs inoubliables.",
    image: "/placeholder-card-2.jpg",
    backgroundColor: "#EEF899",
    stats: [{ value: "120+", label: "Destination possible" }],
  },
  {
    imagePosition: "left",
    title: "Restez organisé",
    description:
      "Gardez tous vos documents et informations au même endroit. Accédez à tout, n'importe où, n'importe quand.",
    image: "/placeholder-card-3.jpg",
    backgroundColor: "#61DBD5",
    stats: [{ value: "120+", label: "Destination possible" }],
  },
];

function Card({ card, index }: { card: Card; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);

  // Image component
  const ImageSection = () => (
    <div className="relative min-h-[300px] lg:min-h-full bg-gray-300">
      {card.image ? (
        <Image
          src={card.image}
          alt={card.imageAlt || card.title}
          fill
          className="object-cover"
          quality={100}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500 font-karla text-center px-4">
          Format recommandé: 800x600px (ratio 4:3)
        </div>
      )}
    </div>
  );

  // Content component - with CTA button (for first card or cards with ctaLabel)
  const ContentWithCTA = () => (
    <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-between">
      <div>
        <h2 className="text-[#001E13] text-3xl lg:text-4xl xl:text-5xl font-londrina-solid leading-tight mb-6 lg:mb-8">
          {card.title}
        </h2>
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
      <h2 className="text-[#001E13] text-3xl lg:text-4xl xl:text-5xl font-londrina-solid leading-tight mb-6 lg:mb-8">
        {card.title}
      </h2>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px]">
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

  const cards = data?.stackingCards || defaultCards;

  return (
    <div ref={containerRef} className="bg-[#FFFBF5]">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 pt-12 lg:pt-20 pb-6 lg:pb-10">
        <h2 className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid text-center">
          {data?.stackingCardsTitle || "De l'idée au voyage parfait en quelques clics."}
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
