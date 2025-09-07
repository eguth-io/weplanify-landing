"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

export default function CloudEffects() {
  useEffect(() => {
    // Trigger scroll after 3 seconds (desktop only)
    const handleAutoScroll = () => {
      if (window.innerWidth >= 1024) {
        // lg breakpoint
        const timer = setTimeout(() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }, 1500);
        return () => clearTimeout(timer);
      }
    };

    const cleanup = handleAutoScroll();
    return cleanup;
  }, []);

  return (
    <>
      {/* Desktop version with animations */}
      <motion.div
        className="hidden lg:flex relative h-[100vh] justify-center items-center gradient-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 left-0"
          animate={{
            x: [0, 10, -5, 0],
            y: [0, -8, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/CloudsEffects/topLeft.png"
            alt="Decorative cloud top left - WePlanify"
            width={200}
            height={200}
          />
        </motion.div>

        <motion.div
          className="absolute top-0 right-0"
          animate={{
            x: [0, -8, 12, 0],
            y: [0, 6, -4, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Image
            src="/CloudsEffects/topRight.png"
            alt="Decorative cloud top right - WePlanify"
            width={200}
            height={200}
          />
        </motion.div>

        <motion.p
          className="text-white font-bold text-[62px] text-center px-4"
          style={{ fontFamily: "Unbounded, sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Planifiez, partagez, partez !
        </motion.p>

        <motion.div
          className="absolute bottom-0 left-0"
          animate={{
            x: [0, 15, -8, 0],
            y: [0, -5, 8, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <Image
            src="/CloudsEffects/bottomLeft.png"
            alt="Decorative cloud bottom left - WePlanify"
            width={200}
            height={200}
          />
        </motion.div>

        <motion.div
          className="absolute bottom-0 right-0"
          animate={{
            x: [0, -12, 6, 0],
            y: [0, 4, -7, 0],
          }}
          transition={{
            duration: 3.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
                      <Image
              src="/CloudsEffects/bottomRight.png"
              alt="Decorative cloud bottom right - WePlanify"
              width={200}
              height={200}
            />
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
