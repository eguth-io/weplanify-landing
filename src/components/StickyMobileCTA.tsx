"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PulsatingButton } from "@/components/magicui/pulsating-button";

interface StickyMobileCTAProps {
  text: string;
  href?: string;
}

export default function StickyMobileCTA({ text, href = "https://app.weplanify.com/register" }: StickyMobileCTAProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
        >
          <Link href={href} className="block">
            <PulsatingButton className="w-full justify-center font-karla font-bold text-base py-3">
              {text}
            </PulsatingButton>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
