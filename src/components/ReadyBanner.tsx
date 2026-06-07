"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import InlinePitch from "@/components/InlinePitch";

type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface Badge {
  emoji: string;
  text: string;
  backgroundColor: string;
  textColor: string;
  position: Position;
}

const POSITION_CLASSES: Record<Position, string> = {
  "top-left": "top-0 left-[10%] lg:left-[15%]",
  "top-right": "top-0 right-[10%] lg:right-[15%]",
  "bottom-left": "bottom-0 left-[5%] lg:left-[10%]",
  "bottom-right": "bottom-0 right-[5%] lg:right-[10%]",
};

const SPRING_CONFIGS = [
  { damping: 20, stiffness: 120 },
  { damping: 30, stiffness: 100 },
  { damping: 15, stiffness: 180 },
  { damping: 25, stiffness: 140 },
];

const MOVE_PARAMS = [
  { x: 15, y: 15 },
  { x: -22, y: 18 },
  { x: 10, y: -14 },
  { x: 20, y: 12 },
];

interface ReadyBannerProps {
  locale?: string;
}

export default function ReadyBanner({ locale = "en" }: ReadyBannerProps) {
  const t = useTranslations("readyBanner");
  const badges = t.raw("badges") as Badge[];
  const containerRef = useRef<HTMLDivElement>(null);

  const x0 = useMotionValue(0);
  const y0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const y3 = useMotionValue(0);

  const springX0 = useSpring(x0, SPRING_CONFIGS[0]);
  const springY0 = useSpring(y0, SPRING_CONFIGS[0]);
  const springX1 = useSpring(x1, SPRING_CONFIGS[1]);
  const springY1 = useSpring(y1, SPRING_CONFIGS[1]);
  const springX2 = useSpring(x2, SPRING_CONFIGS[2]);
  const springY2 = useSpring(y2, SPRING_CONFIGS[2]);
  const springX3 = useSpring(x3, SPRING_CONFIGS[3]);
  const springY3 = useSpring(y3, SPRING_CONFIGS[3]);

  const springs = useMemo(
    () => [
      { x: springX0, y: springY0 },
      { x: springX1, y: springY1 },
      { x: springX2, y: springY2 },
      { x: springX3, y: springY3 },
    ],
    [springX0, springY0, springX1, springY1, springX2, springY2, springX3, springY3]
  );

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
        const params = MOVE_PARAMS[index % MOVE_PARAMS.length];
        springs[index].x.set(deltaX * params.x);
        springs[index].y.set(deltaY * params.y);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [badges, springs]);

  return (
    <div className="pb-0">
      <div className="w-full">
        <div
          ref={containerRef}
          className="bg-[#001E13] rounded-bl-[24px] rounded-br-[24px] lg:rounded-bl-[40px] lg:rounded-br-[40px] p-8 lg:p-20 xl:p-24 relative overflow-hidden"
        >
          <div className="text-center relative z-10 py-12 lg:py-20 xl:py-24">
            {badges.map((badge, index) => (
              <motion.div
                key={index}
                className={`hidden lg:flex absolute px-4 py-2 rounded-full text-sm lg:text-base font-karla font-bold items-center gap-2 ${POSITION_CLASSES[badge.position]}`}
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
              {t("title")}
            </h2>

            <p className="text-[#FFFBF5] text-base lg:text-lg mb-6 lg:mb-8 max-w-2xl mx-auto">
              {t("description")}
            </p>

            <p className="text-[#61DBD5] text-sm lg:text-base font-karla mb-4">
              {t("socialProof")}
            </p>

            <div className="flex justify-center">
              <InlinePitch locale={locale} variant="light" location="ready_banner" />
            </div>

            <p className="text-[#FFFBF5]/60 text-xs lg:text-sm font-karla mt-3">
              {t("freeNote")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
