"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CloudEffects() {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Commencer l'animation de sortie après 2.5 secondes
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 2500);

    // Masquer complètement l'intro après 3 secondes
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Si l'intro n'est plus visible, ne pas afficher
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Version desktop avec animations */}
      <motion.div
        className="hidden lg:flex relative h-[100vh] justify-center items-center gradient-container fixed top-0 left-0 w-full z-50"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -100 : 0
        }}
        transition={{ duration: 0.5 }}
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
            alt="Nuage décoratif haut gauche - Weplanify"
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
            alt="Nuage décoratif haut droit - Weplanify"
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
            alt="Nuage décoratif bas gauche - Weplanify"
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
              alt="Nuage décoratif bas droit - Weplanify"
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

      {/* Version mobile avec animations */}
      <motion.div
        className="lg:hidden flex relative h-[100vh] justify-center items-center gradient-container fixed top-0 left-0 w-full z-50"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: isExiting ? 0 : 1,
          y: isExiting ? -100 : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          className="text-white font-bold text-[32px] text-center px-4"
          style={{ fontFamily: "Unbounded, sans-serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Planifiez, partagez, partez !
        </motion.p>

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
