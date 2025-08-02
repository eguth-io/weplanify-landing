"use client";

import { PortableText } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

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
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [cardWidth, setCardWidth] = useState<number>(420);
  const containerRef = useRef<HTMLDivElement>(null);

  // Gestion responsive de la taille des cartes
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 480) {
        // Mobile très petit - on montre ~85% de la largeur pour voir les autres cartes
        setCardWidth(Math.floor(width * 0.85));
      } else if (width < 640) {
        // Mobile - on montre ~80% de la largeur
        setCardWidth(Math.floor(width * 0.8));
      } else if (width < 768) {
        // Mobile large - on montre ~75% de la largeur
        setCardWidth(Math.floor(width * 0.75));
      } else if (width < 1024) {
        setCardWidth(380); // Tablet
      } else {
        setCardWidth(420); // Desktop
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Réduit la sensibilité pour un scroll plus fluide
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Gestion du touch pour mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;

    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Réduit la sensibilité pour un scroll plus fluide
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full mt-12 md:mt-16 lg:mt-24 relative">
      <img
        src="/pass.png"
        alt="pass"
        className="-z-10 absolute bottom-0 md:bottom-[200px] lg:bottom-[300px] left-0 w-auto h-auto max-w-[150px] md:max-w-none"
      />

      <div className="overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing select-none px-3 md:px-4 lg:px-6"
          style={{
            scrollBehavior: "auto", // Pas de snap pour un scroll fluide
            scrollSnapType: "none", // Désactive le snap sur mobile
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {blocks.map((block: Block, index: number) => (
            <div
              key={index}
              className="relative rounded-xl md:rounded-2xl flex-shrink-0"
              style={{
                minWidth: `${cardWidth}px`,
                height:
                  cardWidth < 300
                    ? "350px"
                    : cardWidth < 350
                      ? "380px"
                      : cardWidth < 380
                        ? "400px"
                        : "435px",
              }}
            >
              <Image
                src={block.image}
                alt={block.tooltip}
                width={cardWidth}
                height={cardWidth < 320 ? 350 : cardWidth < 380 ? 400 : 435}
                className="rounded-xl md:rounded-2xl w-full h-full object-cover"
              />

              {/* Overlay content */}
              <div className="absolute top-4 md:top-6 lg:top-8 left-4 md:left-6 lg:left-8 bg-transparent">
                <div className="flex items-center gap-2 md:gap-3">
                  <span className="bg-white w-2 h-2 md:w-3 md:h-3 rounded-full"></span>
                  <p className="text-xs md:text-sm font-[600] text-white">
                    {block.tooltip}
                  </p>
                </div>

                <div className="font-unbounded mt-2 md:mt-3 lg:mt-4 text-lg md:text-2xl lg:text-3xl font-[400] [&_p]:text-white [&_p]:leading-tight">
                  <PortableText value={block.text} />
                </div>
              </div>

              {/* CTA Button */}
              <Link
                href={block.link}
                className="absolute bottom-4 md:bottom-6 lg:bottom-8 left-4 md:left-6 lg:left-8 px-3 md:px-4 lg:px-[21px] py-1.5 md:py-2 lg:py-[7px] rounded-full text-white border border-white bg-[#ffffff33] text-xs md:text-sm font-[600] hover:bg-[#ffffff55] transition-colors pointer-events-auto"
                onMouseDown={(e: React.MouseEvent<HTMLAnchorElement>) =>
                  e.stopPropagation()
                }
                onTouchStart={(e: React.TouchEvent<HTMLAnchorElement>) =>
                  e.stopPropagation()
                }
              >
                Voir plus
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
