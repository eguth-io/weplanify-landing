"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { trackEvent } from "@/lib/tracking";

interface StickyCTAProps {
  text: string;
  href?: string;
}

/**
 * Mobile bottom-fixed CTA that appears once the user scrolls past the hero.
 * Single-tap action: navigates straight to the register URL — no email form,
 * no beta gate.
 */
export default function StickyCTA({ text, href }: StickyCTAProps) {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] === "fr" ? "fr" : "en";
  const targetHref = href ?? `https://app.weplanify.com/${locale}/register?utm_source=landing`;
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
