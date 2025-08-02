"use client";

import { Features } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Iphone16Pro } from "./ui/iphone-16-pro";
import { MacbookPro } from "./ui/macbook-pro";

export default function Devices({ features }: { features: Features }) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [cardWidth, setCardWidth] = useState<number>(370);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Gestion responsive de la taille des cartes
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCardWidth(Math.floor(width * 0.9)); // Mobile très petit - 90% de la largeur
      } else if (width < 640) {
        setCardWidth(Math.floor(width * 0.85)); // Mobile - 85% de la largeur
      } else if (width < 768) {
        setCardWidth(Math.floor(width * 0.8)); // Mobile large - 80% de la largeur
      } else if (width < 1024) {
        setCardWidth(350); // Tablet
      } else {
        setCardWidth(370); // Desktop
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  // Initialisation après le premier rendu
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialized(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Auto progression des slides
  useEffect(() => {
    if (isDragging || !isInitialized) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.featuresList.length);
    }, 5000); // Change toutes les 5 secondes

    return () => clearInterval(interval);
  }, [features.featuresList.length, isDragging, isInitialized]);

  // Scroll vers l'élément actif
  useEffect(() => {
    if (itemRefs.current[activeIndex] && containerRef.current) {
      const activeElement = itemRefs.current[activeIndex];
      const container = containerRef.current;
      const elementLeft = activeElement.offsetLeft;
      const elementWidth = activeElement.offsetWidth;
      const containerWidth = container.offsetWidth;

      const scrollTo = elementLeft - containerWidth / 2 + elementWidth / 2;

      container.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);

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
    const walk = (x - startX) * 1.5; // Sensibilité réduite pour un scroll plus fluide
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
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
  };

  const currentFeature = features.featuresList[activeIndex];

  return (
    <div>
      <div className="relative flex justify-center px-4 md:px-6 lg:px-0">
        <Iphone16Pro
          className="hidden sm:block absolute right-[5%] md:right-[7%] top-[5%] md:top-[7%] w-[180px] h-[360px] sm:w-[220px] sm:h-[440px] md:w-[250px] md:h-[500px] lg:w-[300px] lg:h-[600px]"
          src={currentFeature.imageMobile}
        />

        <MacbookPro
          className="w-full max-w-[350px] sm:max-w-[500px] md:max-w-[800px] lg:max-w-[1000px] xl:w-[1250px] h-auto"
          src={currentFeature.imageDesktop}
        />
      </div>

      <div className="py-8 md:py-12 lg:py-16">
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-3 md:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4 cursor-grab active:cursor-grabbing select-none px-4 md:px-6 lg:px-8"
            style={{
              scrollBehavior: "auto",
              scrollSnapType: window.innerWidth < 768 ? "none" : "x mandatory",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {features.featuresList.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`p-4 md:p-5 lg:p-6 relative flex-shrink-0 rounded-xl md:rounded-2xl transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "bg-[#006F8E] scale-105"
                    : "border border-[#FDD7D1] bg-white"
                }`}
                style={{
                  minWidth: `${cardWidth}px`,
                  maxWidth: `${cardWidth}px`,
                  height:
                    cardWidth < 300
                      ? "200px"
                      : cardWidth < 350
                        ? "230px"
                        : "270px",
                  // Ajout de margin pour éviter le crop lors du scale
                  margin: activeIndex === index ? "5px md:10px" : "0px",
                  scrollSnapAlign: window.innerWidth >= 768 ? "start" : "none",
                }}
                onClick={() => handleFeatureClick(index)}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
                onTouchStart={(e: React.TouchEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <div className="h-full flex flex-col">
                  {/* Title - Responsive */}
                  <h3
                    className={`text-lg md:text-2xl lg:text-3xl font-medium mb-2 md:mb-3 transition-colors ${
                      activeIndex === index ? "text-white" : "text-[#8E9093]"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description - Responsive */}
                  <div
                    className={`text-sm md:text-lg lg:text-xl flex-1 transition-colors leading-tight ${
                      activeIndex === index
                        ? "[&_p]:text-white"
                        : "[&_p]:text-[#8E9093]"
                    }`}
                  >
                    <PortableText value={feature.description} />
                  </div>

                  {/* Barre de progression - Responsive */}
                  <div className="absolute bottom-3 md:bottom-4 lg:bottom-6 left-4 md:left-5 lg:left-6 h-0.5 md:h-1 bg-white/30 rounded-2xl overflow-hidden w-1/2">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{
                        width:
                          activeIndex === index && isInitialized
                            ? "100%"
                            : "0%",
                        transitionDuration:
                          activeIndex === index && isInitialized
                            ? "5000ms"
                            : "300ms",
                      }}
                    />
                  </div>

                  {/* Icon - Responsive */}
                  <Image
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    width={cardWidth < 300 ? 80 : cardWidth < 350 ? 120 : 150}
                    height={cardWidth < 300 ? 70 : cardWidth < 350 ? 100 : 130}
                    className="object-cover absolute bottom-0 right-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots - Responsive */}
        <div className="flex justify-center mt-4 md:mt-6 gap-1.5 md:gap-2">
          {features.featuresList.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-500 w-4 md:w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handleFeatureClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
