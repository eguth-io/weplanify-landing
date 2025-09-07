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
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [cardWidth, setCardWidth] = useState<number>(350);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const carouselRef = useRef<HTMLUListElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  // Gestion responsive de la taille des cartes
  useEffect(() => {
    const updateCardWidth = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setCardWidth(Math.floor(width * 0.85)); // Very small mobile
      } else if (width < 640) {
        setCardWidth(Math.floor(width * 0.8)); // Mobile
      } else if (width < 768) {
        setCardWidth(Math.floor(width * 0.75)); // Mobile large
      } else {
        setCardWidth(350); // Tablet et plus
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isInView) {
        setCurrentIndex(0);
      } else {
        setCurrentIndex(-1);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isInView]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const card = carouselRef.current.querySelectorAll(".card")[index];
      if (card) {
        const cardRect = card.getBoundingClientRect();
        const carouselRect = carouselRef.current.getBoundingClientRect();
        const offset =
          cardRect.left -
          carouselRect.left -
          (carouselRect.width - cardRect.width) / 2;

        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollLeft + offset,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (isDragging) return; // Pause l'auto-scroll pendant le drag

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex !== undefined ? (prevIndex + 1) % data.length : 0,
      );
    }, collapseDelay);

    return () => clearInterval(timer);
  }, [collapseDelay, currentIndex, data.length, isDragging]);

  useEffect(() => {
    if (isDragging) return; // Pause l'auto-scroll pendant le drag

    const handleAutoScroll = () => {
      const nextIndex =
        (currentIndex !== undefined ? currentIndex + 1 : 0) % data.length;
      scrollToIndex(nextIndex);
    };

    const autoScrollTimer = setInterval(handleAutoScroll, collapseDelay);

    return () => clearInterval(autoScrollTimer);
  }, [collapseDelay, currentIndex, data.length, isDragging]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const handleScroll = () => {
        if (isDragging) return; // Évite les conflits pendant le drag

        const scrollLeft = carousel.scrollLeft;
        const cardWidth = carousel.querySelector(".card")?.clientWidth || 0;
        const newIndex = Math.min(
          Math.floor(scrollLeft / cardWidth),
          data.length - 1,
        );
        setCurrentIndex(newIndex);
      };

      carousel.addEventListener("scroll", handleScroll);
      return () => carousel.removeEventListener("scroll", handleScroll);
    }
  }, [data.length, isDragging]);

  // Gestion du drag/touch pour mobile
  const handleMouseDown = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLUListElement>) => {
    if (!isDragging || !carouselRef.current) return;

    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    if (!carouselRef.current) return;

    setIsDragging(true);
    setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    if (!isDragging || !carouselRef.current) return;

    const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <section ref={ref} id="features">
      <div className="container px-4 md:px-6 lg:px-8">
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
              className={`w-full h-[350px] sm:h-[300px] md:h-[350px] lg:w-[630px] lg:h-[440px] min-h-[200px] object-cover ${
                ltr && "lg:order-1"
              }`}
            >
              {data[currentIndex]?.image ? (
                <motion.img
                  key={currentIndex}
                  src={data[currentIndex].image}
                  alt="feature"
                  className="aspect-auto h-full w-full rounded-lg md:rounded-xl lg:object-cover object-left-top px-2 md:px-4 lg:px-none lg:p-1 shadow-lg"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              ) : (
                <div className="aspect-auto h-full w-full rounded-lg md:rounded-xl border border-neutral-300/50 bg-gray-200 p-1"></div>
              )}
            </div>

            {/* Mobile Carousel - Fluid with adjacent card preview */}
            <ul
              ref={carouselRef}
              className="flex h-full overflow-x-auto py-0 md:py-8 lg:py-10 lg:hidden scrollbar-hide cursor-grab active:cursor-grabbing select-none"
              style={{
                padding: "20px calc(10%)", // Permet de voir les cartes adjacentes
                scrollBehavior: "auto",
                scrollSnapType: "none", // Scroll fluide sans snap
                gap: "16px",
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {data.map((item, index) => (
                <li
                  key={index}
                  className="card relative flex-shrink-0 grid h-full items-start justify-center py-3 md:py-4 lg:bg-white/10 rounded-lg md:rounded-xl lg:backdrop-blur-sm lg:border border-white/20 transition-all duration-300"
                  onClick={() => setCurrentIndex(index)}
                  style={{
                    minWidth: `${cardWidth}px`,
                    maxWidth: `${cardWidth}px`,
                    marginRight: "12px",
                  }}
                >
                  {/* Barre de progression responsive */}
                  <div className="absolute bottom-0 left-0 right-auto top-0 h-0.5 md:h-1 w-full overflow-hidden rounded-lg bg-neutral-300/50 dark:bg-neutral-300/30">
                    <div
                      className={`absolute left-0 top-0 h-full ${
                        currentIndex === index ? "w-full" : "w-0"
                      } origin-left bg-[#fff] transition-all ease-linear`}
                      style={{
                        transitionDuration:
                          currentIndex === index ? `${collapseDelay}ms` : "0s",
                      }}
                    ></div>
                  </div>

                  {/* Responsive icon */}
                  <div className="flex items-center mb-3 md:mb-4">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="md:w-6 md:h-6"
                      />
                    </div>
                    <h2 className="text-base md:text-lg lg:text-xl font-bold text-white">
                      {item.title}
                    </h2>
                  </div>

                  {/* Description responsive */}
                  <div className="[&_p]:text-white w-full text-sm">
                    <PortableText value={item.description} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
