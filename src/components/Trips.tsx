"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Block {
  image: string;
  tooltip: string;
  text: PortableTextBlock[];
  link: string;
}

interface CarouselProps {
  blocks: Block[];
}

export default function Trips({ blocks }: CarouselProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    const handleUserInteraction = () => {
      setIsPaused(true);
      setIsUserInteracting(true);
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to resume auto-scroll after 3 seconds
      timeoutRef.current = setTimeout(() => {
        setIsUserInteracting(false);
        setIsPaused(false);
      }, 3000);
    };

    const handleMouseEnter = () => {
      if (!isUserInteracting) {
        setIsPaused(true);
      }
    };

    const handleMouseLeave = () => {
      if (!isUserInteracting) {
        setIsPaused(false);
      }
    };

    // Touch events for mobile
    const handleTouchStart = () => handleUserInteraction();
    const handleWheel = () => handleUserInteraction();

    marquee.addEventListener('touchstart', handleTouchStart);
    marquee.addEventListener('wheel', handleWheel);
    marquee.addEventListener('mouseenter', handleMouseEnter);
    marquee.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      marquee.removeEventListener('touchstart', handleTouchStart);
      marquee.removeEventListener('wheel', handleWheel);
      marquee.removeEventListener('mouseenter', handleMouseEnter);
      marquee.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isUserInteracting]);

  return (
    <div className="w-full mt-16 lg:mt-24 relative">
      <Image
        src="/pass.svg"
        alt="Passeport décoratif - WePlanify"
        width={200}
        height={200}
        className="hidden lg:block -z-10 absolute bottom-[0] left-0 w-auto h-auto "
      />
      <Image
        src="/passMobile.svg"
        alt="Passeport décoratif mobile - WePlanify"
        width={150}
        height={150}
        className="lg:hidden -z-10 absolute bottom-0 left-0"
      />

      <div className="overflow-hidden mx-auto relative">
        {/* Gradient fade effects - reduced on mobile */}
        <div className="pointer-events-none absolute inset-y-0 -left-4 md:-left-8 h-full w-[50px] md:w-[100px] bg-gradient-to-r from-white via-white/40 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 -right-4 md:-right-8 h-full w-[50px] md:w-[100px] bg-gradient-to-l from-white via-white/40 to-transparent z-10"></div>
        
        {/* Marquee Container */}
        <div className="marquee-container pb-2 md:pb-4">
          <div 
            ref={marqueeRef}
            className="marquee-content"
            style={{
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            {/* Duplicate blocks for seamless loop */}
            {[...blocks, ...blocks].map((block: Block, index: number) => (
              <div key={index} className="marquee-item w-[264px] lg:w-[420px] flex-shrink-0">
                <div className="relative rounded-xl md:rounded-2xl w-[264px] h-[264px] lg:h-[420px] xl:h-[435px] md:w-auto">
                  <Image
                    src={block.image}
                    alt={block.tooltip}
                    fill
                    className="rounded-xl md:rounded-2xl object-cover"
                  />

                  {/* Overlay content */}
                  <div className="absolute top-3 md:top-6 lg:top-8 left-3 md:left-6 lg:left-8 bg-transparent">
                    <div className="flex items-center gap-2 md:gap-3">
                      <span className="bg-white w-2 h-2 md:w-3 md:h-3 rounded-full"></span>
                      <p className="text-xs md:text-sm font-[600] text-white">
                        {block.tooltip}
                      </p>
                    </div>

                    <div className="font-unbounded mt-2 md:mt-3 lg:mt-4 text-base md:text-2xl lg:text-3xl font-[400] [&_p]:text-white [&_p]:leading-tight">
                      <PortableText value={block.text} />
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={block.link}
                    className="absolute bottom-3 md:bottom-6 lg:bottom-8 right-3 md:right-6 lg:right-8 px-3 md:px-4 lg:px-[21px] py-1.5 md:py-2 lg:py-[7px] rounded-full text-white border border-white bg-[#ffffff33] text-xs md:text-sm font-[600] hover:bg-[#ffffff55] transition-colors pointer-events-auto"
                  >
                    Voir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .marquee-container {
            width: 100%;
            overflow: hidden;
          }
          
          .marquee-content {
            display: flex;
            gap: 16px;
            animation: marquee 80s linear infinite;
            width: fit-content;
            overflow-x: auto;
            scroll-behavior: smooth;
          }
          
          .marquee-content::-webkit-scrollbar {
            display: none;
          }
          
          .marquee-content {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          @media (min-width: 640px) {
            .marquee-content {
              gap: 12px;
            }
          }
          
          @media (min-width: 768px) {
            .marquee-content {
              gap: 20px;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
