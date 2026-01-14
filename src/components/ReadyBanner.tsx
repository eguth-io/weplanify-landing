"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import Link from "next/link";

interface Badge {
  emoji: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

interface ReadyBannerProps {
  data: {
    title: string;
    description?: string;
    badges?: Badge[];
    buttonText: string;
    buttonUrl: string;
  };
}

export default function ReadyBanner({ data }: ReadyBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Configurations spring différentes pour chaque badge - mémorisées pour éviter re-render
  const springConfigs = useMemo(() => [
    { damping: 20, stiffness: 120 },
    { damping: 30, stiffness: 100 },
    { damping: 15, stiffness: 180 },
    { damping: 25, stiffness: 140 },
  ], []);

  // Paramètres de mouvement pour chaque badge - mémorisés pour éviter re-render
  const moveParams = useMemo(() => [
    { x: 15, y: 15 },
    { x: -22, y: 18 },
    { x: 10, y: -14 },
    { x: 20, y: 12 },
  ], []);

  // Initialiser les springs pour chaque badge (max 4 badges)
  const x0 = useMotionValue(0);
  const y0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const y3 = useMotionValue(0);

  const springX0 = useSpring(x0, springConfigs[0]);
  const springY0 = useSpring(y0, springConfigs[0]);
  const springX1 = useSpring(x1, springConfigs[1]);
  const springY1 = useSpring(y1, springConfigs[1]);
  const springX2 = useSpring(x2, springConfigs[2]);
  const springY2 = useSpring(y2, springConfigs[2]);
  const springX3 = useSpring(x3, springConfigs[3]);
  const springY3 = useSpring(y3, springConfigs[3]);

  // Mémoriser les springs pour éviter re-render
  const springs = useMemo(() => [
    { x: springX0, y: springY0 },
    { x: springX1, y: springY1 },
    { x: springX2, y: springY2 },
    { x: springX3, y: springY3 },
  ], [springX0, springY0, springX1, springY1, springX2, springY2, springX3, springY3]);

  // Mémoriser badges pour éviter re-render
  const badges = useMemo(() => data.badges || [], [data.badges]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      badges.forEach((_, index) => {
        if (index >= springs.length) return;
        const params = moveParams[index % moveParams.length];
        springs[index].x.set(deltaX * params.x);
        springs[index].y.set(deltaY * params.y);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [badges, springs, moveParams]);

  if (!data) return null;

  // Mapper les positions vers les classes CSS
  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return "top-0 left-[10%] lg:left-[15%]";
      case "top-right":
        return "top-0 right-[10%] lg:right-[15%]";
      case "bottom-left":
        return "bottom-0 left-[5%] lg:left-[10%]";
      case "bottom-right":
        return "bottom-0 right-[5%] lg:right-[10%]";
      default:
        return "top-0 left-[10%]";
    }
  };

  return (
    <div className="pb-0">
      <div className="w-full">
        <div ref={containerRef} className="bg-[#001E13] rounded-bl-[24px] rounded-br-[24px] lg:rounded-bl-[40px] lg:rounded-br-[40px] p-8 lg:p-20 xl:p-24 relative overflow-hidden">
          {/* Center Content */}
          <div className="text-center relative z-10 py-12 lg:py-20 xl:py-24">
            {/* Floating Badges - suivent le curseur avec un effet magnétique */}
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                className={`hidden lg:flex absolute px-4 py-2 rounded-full text-sm lg:text-base font-nanum-pen items-center gap-2 ${getPositionClasses(badge.position)}`}
                style={{
                  x: springs[index].x,
                  y: springs[index].y,
                  backgroundColor: badge.backgroundColor,
                  color: badge.textColor,
                }}
              >
                <span className="text-lg">{badge.emoji}</span>
                {badge.text}
              </motion.div>
            ))}

            <h2 className="text-[#FFFBF5] text-3xl lg:text-5xl xl:text-6xl font-londrina-solid leading-tight mb-6 lg:mb-8 whitespace-pre-line">
              {data.title}
            </h2>

            {data.description && (
              <p className="text-[#FFFBF5] text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto">
                {data.description}
              </p>
            )}

            <Link href={data.buttonUrl || "#"}>
              <button className="bg-[#EEF899] text-[#001E13] px-6 py-2 rounded-full font-karla font-bold text-sm lg:text-base hover:bg-[#EEF899]/90 transition-colors ring-4 ring-[#EEF899] ring-opacity-15">
                {data.buttonText}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
