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
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleFeatureClick = (index: number) => {
    setActiveIndex(index);
  };

  const currentFeature = features.featuresList[activeIndex];

  return (
    <div>
      {/* Devices Section avec images dynamiques */}
      <div className="relative flex justify-center">
        <Iphone16Pro
          className="absolute right-[7%] top-[7%] w-[300px] h-[600px]"
          src={currentFeature.imageMobile}
        />
        <MacbookPro
          className="w-[1250px] h-full"
          src={currentFeature.imageDesktop}
        />
      </div>

      {/* Features Carousel Section */}
      <div className="py-16">
        {/* Carousel Container */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 cursor-grab active:cursor-grabbing select-none justify-center px-8"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            {features.featuresList.map((feature, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                className={`p-6 relative flex-shrink-0 snap-start rounded-2xl transition-all duration-300 cursor-pointer ${
                  activeIndex === index
                    ? "bg-[#006F8E] scale-105"
                    : "border border-[#FDD7D1] bg-white"
                }`}
                style={{
                  minWidth: "370px",
                  maxWidth: "370px",
                  height: "270px",
                  // Ajout de margin pour éviter le crop lors du scale
                  margin: activeIndex === index ? "10px" : "0px",
                }}
                onClick={() => handleFeatureClick(index)}
                onMouseDown={(e: React.MouseEvent<HTMLDivElement>) =>
                  e.stopPropagation()
                }
              >
                <div>
                  {/* Title */}
                  <h3
                    className={`text-3xl transition-colors ${
                      activeIndex === index
                        ? "text-white"
                        : "text-[#8E9093] text-2xl"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <div
                    className={`text-xl transition-colors ${
                      activeIndex === index
                        ? "[&_p]:text-white"
                        : "[&_p]:text-[#8E9093]"
                    }`}
                  >
                    <PortableText value={feature.description} />
                  </div>

                  {/* Barre de progression */}
                  <div className="absolute bottom-6 left-6 h-1 bg-white/30 rounded-2xl overflow-hidden w-1/2">
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
                  {/* Icon */}
                  <Image
                    src={feature.icon}
                    alt={`${feature.title} icon`}
                    width={150}
                    height={130}
                    className="object-cover absolute bottom-0 right-0"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation dots (optionnel) */}
        <div className="flex justify-center mt-6 gap-2">
          {features.featuresList.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "bg-blue-500 w-6"
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
