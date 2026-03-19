"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EMOJIS = ["🎉", "💍", "🥂", "✨", "💐", "🎀", "💖", "🫶"];

interface Particle {
  id: number;
  emoji: string;
  x: number;
  delay: number;
  duration: number;
  size: number;
  rotation: number;
}

export default function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const items: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
      size: 14 + Math.random() * 18,
      rotation: Math.random() * 360,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ y: -40, opacity: 0, rotate: 0 }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 1, 0.6, 0],
              rotate: p.rotation + 360,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: Math.random() * 3,
            }}
            className="absolute"
            style={{
              left: `${p.x}%`,
              fontSize: `${p.size}px`,
            }}
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
