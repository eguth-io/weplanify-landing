"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { trackEvent } from "@/lib/tracking";
import { travelGuideSlugIndex, type TravelGuideLocale } from "@/lib/travel-guides/slugs";

interface StickyCTAProps {
  text: string;
  href?: string;
}

/**
 * Mobile bottom-fixed CTA that appears once the user scrolls past the hero.
 * Single-tap action: navigates straight to the register URL — no email form,
 * no beta gate.
 */
const PATH_TO_TEMPLATE: Record<string, { template: string; campaign: string }> = {
  "/world-cup-2026-trip-planner": { template: "world-cup-2026", campaign: "world-cup-2026" },
  "/champions-league-final-2026-psg-arsenal": { template: "ucl-final-2026", campaign: "ucl-final-2026" },
  "/hellfest-2026-trip-planner": { template: "hellfest-2026", campaign: "hellfest-2026" },
  "/tomorrowland-2026-trip-planner": { template: "tomorrowland-2026", campaign: "tomorrowland-2026" },
  "/solar-eclipse-2026-trip-planner": { template: "solar-eclipse-2026", campaign: "solar-eclipse-2026" },
  "/ultra-europe-2026-trip-planner": { template: "ultra-europe-2026", campaign: "ultra-europe-2026" },
};

export default function StickyCTA({ text, href }: StickyCTAProps) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] === "fr" ? "fr" : "en";
  const subpath = pathname ? "/" + pathname.split("/").slice(2).join("/") : "";
  const match = PATH_TO_TEMPLATE[subpath];
  const travelGuideMatch = subpath.match(/^\/travel-guides\/([^/]+)$/);
  const travelGuideTemplate = travelGuideMatch
    ? travelGuideSlugIndex[locale as TravelGuideLocale]?.[travelGuideMatch[1]]
    : undefined;
  const defaultHref = match
    ? `https://app.weplanify.com/${locale}/register?utm_source=landing&utm_campaign=${match.campaign}&template=${match.template}`
    : travelGuideTemplate
      ? `https://app.weplanify.com/${locale}/register?template=${travelGuideTemplate}&utm_source=landing&utm_medium=travel-guide&utm_campaign=${travelGuideTemplate}`
      : `https://app.weplanify.com/${locale}/register?utm_source=landing`;
  const targetHref = href ?? defaultHref;
  const [show, setShow] = useState(false);
  const [cookieBannerHeight, setCookieBannerHeight] = useState(0);

  useEffect(() => {
    const measure = () => {
      const banner = document.querySelector("[class*='z-[9999]']") as HTMLElement | null;
      setCookieBannerHeight(banner ? banner.offsetHeight : 0);
    };
    measure();
    const observer = new MutationObserver(measure);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hero = document.getElementById("hero");

    if (hero) {
      const observer = new IntersectionObserver(
        ([entry]) => setShow(!entry.isIntersecting),
        { threshold: 0 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    }

    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed left-0 right-0 z-40 p-4 flex justify-center pointer-events-none transition-[bottom] duration-300"
          style={{ bottom: cookieBannerHeight > 0 ? cookieBannerHeight : 0 }}
        >
          <div className="pointer-events-auto w-full max-w-sm lg:max-w-xs">
            <Link
              href={targetHref}
              rel="nofollow"
              onClick={() => trackEvent("cta_click", { location: "sticky_cta", label: text })}
              className="block"
            >
              <PulsatingButton className="w-full justify-center font-karla font-bold text-base py-3 shadow-lg rounded-full">
                {text}
              </PulsatingButton>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
