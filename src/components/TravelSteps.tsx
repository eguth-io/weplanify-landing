'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AiGlobeJourney, SwipeExplorer, LiveCollaboration } from "@/components/animations";

interface TravelStepsProps {
  data: {
    title: string;
    description: string;
    badge: string;
    card1: {
      title: string;
      description: string;
      durationValue: string;
      durationLabel: string;
    };
    card2: {
      image?: string;
      title?: string;
      description?: string;
      statValue?: string;
      statLabel?: string;
    };
    card3: {
      title: string;
      description: string;
      statValue: string;
      statLabel: string;
    };
  };
}

export default function TravelSteps({ data }: TravelStepsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  if (!data) {
    return null;
  }

  return (
    <div className="px-4 lg:px-8 pb-8 lg:pb-12">
      <div className="max-w-[1536px] mx-auto">
        <div
          ref={ref}
          className="bg-[#001E13] rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 xl:p-16"
        >
          {/* Titre et Badge */}
          <div className="mb-8 lg:mb-12">
            {data.badge && (
              <span className="text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-lg inline-block mb-4 lg:mb-6 font-nanum-pen">
                {data.badge}
              </span>
            )}
            {data.title && (
              <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl xl:text-[48px] font-londrina-solid leading-tight mb-4 lg:mb-6 whitespace-pre-line">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-[#FFFBF5] text-base lg:text-lg font-karla leading-relaxed max-w-3xl">
                {data.description}
              </p>
            )}
          </div>

          {/* 3 Cartes avec Animations */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr_1fr] gap-4 lg:gap-6">
            {/* Carte 1 - Invite Group */}
            {data.card1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col"
              >
                <div className="flex-1 min-h-[180px] lg:min-h-[220px]">
                  <LiveCollaboration autoPlay={isInView} />
                </div>
                <div className="p-5 lg:p-6 bg-white">
                  <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                    {data.card1.title}
                  </h3>
                  <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                    {data.card1.description}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl lg:text-4xl font-londrina-solid text-[#F6391A]">
                      {data.card1.durationValue}
                    </span>
                    <span className="text-xs text-[#001E13]/50 font-karla">
                      {data.card1.durationLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Carte 2 - Swipe Explorer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col"
            >
              <div className="flex-1 min-h-[180px] lg:min-h-[220px]">
                <SwipeExplorer autoPlay={isInView} />
              </div>
              <div className="p-5 lg:p-6 bg-white">
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                  {data.card2?.title || "Step 2 : Explore and discover"}
                </h3>
                <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                  {data.card2?.description || "Swipe through activities, restaurants, and hotels. Add your favorites to the itinerary."}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-londrina-solid text-[#61DBD5]">
                    {data.card2?.statValue || "500+"}
                  </span>
                  <span className="text-xs text-[#001E13]/50 font-karla">
                    {data.card2?.statLabel || "Places to discover"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Carte 3 - Decide & Finalize */}
            {data.card3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="bg-[#EEF899] rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col"
              >
                <div className="flex-1 min-h-[180px] lg:min-h-[220px]">
                  <AiGlobeJourney autoPlay={isInView} />
                </div>
                <div className="p-5 lg:p-6 bg-[#EEF899]">
                  <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                    {data.card3.title}
                  </h3>
                  <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                    {data.card3.description}
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13]">
                      {data.card3.statValue}
                    </span>
                    <span className="text-xs text-[#001E13]/50 font-karla">
                      {data.card3.statLabel}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
