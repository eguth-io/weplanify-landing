"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { motion, useInView } from "framer-motion";
import React, {
  forwardRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { OrganizationData } from "@/sanity/lib/type";
import { PortableText } from "next-sanity";
import Image from "next/image";

type AccordionItemProps = {
  children: React.ReactNode;
  className?: string;
} & Accordion.AccordionItemProps;

const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
      className={cn(
        "mt-px overflow-hidden focus-within:relative focus-within:z-10",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  ),
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = {
  children: React.ReactNode;
  className?: string;
};

const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={cn(
          "group flex flex-1 cursor-pointer items-center justify-between px-3 md:px-5 text-sm md:text-[15px] leading-none outline-none text-white text-lg md:text-xl lg:text-2xl",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);
AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = {
  children: ReactNode;
  className?: string;
} & Accordion.AccordionContentProps;

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
      className={cn(
        "overflow-hidden text-sm md:text-[15px] font-medium data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down text-white",
        className,
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="px-3 md:px-5 py-2 text-base md:text-lg lg:text-2xl">
        {children}
      </div>
    </Accordion.Content>
  ),
);
AccordionContent.displayName = "AccordionContent";

export type FeaturesDataProps = {
  title: string;
  subtitle: string;
  image2: string;
};

export type FeaturesProps = {
  collapseDelay?: number;
  ltr?: boolean;
  linePosition?: "left" | "right" | "top" | "bottom";
  data: OrganizationData[];
};

export default function Org({
  collapseDelay = 5000,
  ltr = false,
  linePosition = "left",
  data,
}: FeaturesProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  // Auto-scroll simple
  useEffect(() => {
    if (!isInView || !isAutoPlaying) {
      setProgress(0);
      return;
    }

    setProgress(0);
    const interval = 50; // Mise à jour toutes les 50ms
    const steps = collapseDelay / interval;
    let currentStep = 0;

    const progressTimer = setInterval(() => {
      currentStep++;
      const newProgress = (currentStep / steps) * 100;
      setProgress(newProgress);
    }, interval);

    const slideTimer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      setProgress(0);
    }, collapseDelay);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [isInView, collapseDelay, data.length, isAutoPlaying, currentIndex]);

  // Gestion du swipe mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsAutoPlaying(false);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      // Swipe gauche -> slide suivant
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    } else if (isRightSwipe) {
      // Swipe droite -> slide précédent
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    }

    // Reprendre l'auto-play après 3 secondes
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  // Gestion du clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    setIsAutoPlaying(false);
    
    if (e.key === 'ArrowLeft') {
      // Flèche gauche -> slide précédent
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? data.length - 1 : prevIndex - 1
      );
    } else if (e.key === 'ArrowRight') {
      // Flèche droite -> slide suivant
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }

    // Reprendre l'auto-play après 3 secondes
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 3000);
  };

  return (
    <section 
      ref={ref}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="focus:outline-none"
    >
      <div className="container px-5 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mx-auto lg:mb-20 mt-8 md:mt-12 lg:mt-16 h-full grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 items-center">
            {/* Accordion Desktop - Hidden sur mobile */}
            <div
              className={`hidden lg:flex order-1 lg:order-[0] ${
                ltr ? "lg:order-2 lg:justify-end" : "justify-start"
              }`}
            >
              <Accordion.Root
                className=""
                type="single"
                defaultValue={`item-${currentIndex}`}
                value={`item-${currentIndex}`}
                onValueChange={(value) =>
                  setCurrentIndex(Number(value.split("-")[1]))
                }
              >
                {data.map((item, index) => (
                  <AccordionItem
                    key={index}
                    className="relative mb-6 md:mb-8 last:mb-0"
                    value={`item-${index}`}
                  >
                    {linePosition === "left" || linePosition === "right" ? (
                      <div
                        className={`absolute bottom-0 top-0 h-full w-0.5 overflow-hidden rounded-lg bg-[#D4D4D480] ${
                          linePosition === "right"
                            ? "left-auto right-0"
                            : "left-0 right-auto"
                        }`}
                      >
                        <div
                          className={`absolute left-0 top-0 w-full ${
                            currentIndex === index ? "h-full" : "h-0"
                          } origin-top bg-[#ffffff] transition-all ease-linear`}
                          style={{
                            transitionDuration:
                              currentIndex === index
                                ? `${collapseDelay}ms`
                                : "0s",
                          }}
                        ></div>
                      </div>
                    ) : null}

                    {linePosition === "top" || linePosition === "bottom" ? (
                      <div
                        className={`absolute left-0 right-0 w-full h-0.5 overflow-hidden rounded-lg bg-[#6B8DFF ${
                          linePosition === "bottom" ? "bottom-0" : "top-0"
                        }`}
                      >
                        <div
                          className={`absolute left-0 ${
                            linePosition === "bottom" ? "bottom-0" : "top-0"
                          } h-full ${
                            currentIndex === index ? "w-full" : "w-0"
                          } origin-left bg-primary transition-all ease-linear dark:bg-white`}
                          style={{
                            transitionDuration:
                              currentIndex === index
                                ? `${collapseDelay}ms`
                                : "0s",
                          }}
                        ></div>
                      </div>
                    ) : null}

                    <div className="flex items-center relative">
                      <div className="item-box w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-full mx-3 md:mx-4 lg:mx-6 shrink-0 flex items-center justify-center">
                        <Image
                          src={item.icon}
                          alt={item.title}
                          width={40}
                          height={40}
                          className="md:w-12 md:h-12"
                        />
                      </div>

                      <div>
                        <AccordionTrigger className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 pl-0">
                          {item.title}
                        </AccordionTrigger>

                        <AccordionTrigger className="[&_p]:text-white justify-start text-left leading-4 text-sm md:text-[16px] pl-0">
                          <PortableText value={item.description} />
                        </AccordionTrigger>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion.Root>
            </div>

            {/* Image Section - Responsive */}
            <div
              className={`w-full h-[350px] sm:h-[300px] md:h-[350px] lg:w-[630px] lg:h-[440px] relative overflow-hidden rounded-2xl shadow-lg ${
                ltr && "lg:order-1"
              }`}
            >
              {data[currentIndex]?.image ? (
                <motion.img
                  key={currentIndex}
                  src={data[currentIndex].image}
                  alt={data[currentIndex].title || "feature"}
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-lg"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              ) : (
                <div className="absolute inset-0 w-full h-full rounded-lg md:rounded-xl border border-neutral-300/50 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Aucune image</span>
                </div>
              )}
            </div>

            {/* Mobile Carousel - Simple */}
            <div 
              className="lg:hidden px-4 -mt-2"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="h-[150px] flex items-center">
                {data[currentIndex] && (
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 transition-all duration-300 w-full">
                  {/* Barre de progression */}
                  <div className="mb-4 h-1 w-full bg-neutral-300/30 rounded overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-75" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Titre */}
                  <div className="mb-3">
                    <h2 className="text-lg font-bold text-white">
                      {data[currentIndex].title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div className="[&_p]:text-white text-sm">
                    <PortableText value={data[currentIndex].description} />
                  </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
