"use client";

import { motion } from "framer-motion";

const cards = [
  {
    emoji: "🗳️",
    title: "Group Poll",
    detail: "Barcelona 4 · Bali 2 · Lisbon 3",
    color: "bg-[#EEF899]",
    textColor: "text-[#001E13]",
    rotate: -6,
    x: 0,
    y: 0,
    delay: 0.2,
  },
  {
    emoji: "📅",
    title: "Day 1 — Arrival",
    detail: "Airport → Hotel → Beach walk",
    color: "bg-white",
    textColor: "text-[#001E13]",
    rotate: 4,
    x: 40,
    y: 100,
    delay: 0.5,
  },
  {
    emoji: "💰",
    title: "Shared Budget",
    detail: "€1,240 / 6 = €206.67 each",
    color: "bg-[#61DBD5]",
    textColor: "text-[#001E13]",
    rotate: -3,
    x: -20,
    y: 210,
    delay: 0.8,
  },
];

export default function FloatingCards() {
  return (
    <div className="relative w-full h-full min-h-[320px]" aria-hidden="true">
      {cards.map((card, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: card.rotate }}
          transition={{
            duration: 0.7,
            delay: card.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className={`absolute ${card.color} rounded-2xl p-4 shadow-xl border border-black/5 w-[220px] lg:w-[240px]`}
          style={{
            left: `${card.x}px`,
            top: `${card.y}px`,
          }}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">{card.emoji}</span>
              <span className={`font-karla font-bold text-sm ${card.textColor}`}>
                {card.title}
              </span>
            </div>
            <p className={`font-karla text-xs ${card.textColor} opacity-70`}>
              {card.detail}
            </p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
