'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AiGlobeJourney, SwipeExplorer, LiveCollaboration } from "@/components/animations";

type Lang = "en" | "fr";

interface CardContent {
  title: string;
  description: string;
  statValue: string;
  statLabel: string;
}

interface TravelStepsContent {
  badge: string;
  title: string;
  description: string;
  card1: CardContent;
  card2: CardContent;
  card3: CardContent;
}

const CONTENT: Record<Lang, TravelStepsContent> = {
  fr: {
    badge: "découvrir l'app",
    title: "Planifiez votre voyage en 3 étapes",
    description: "Simple, collaboratif et conçu pour les groupes.",
    card1: {
      title: "Étape 1 : Invitez votre groupe",
      description:
        "Renseignez les infos essentielles. Ajoutez vos amis ou votre famille en un clic. Tout le monde voit le même voyage.",
      statValue: "1 min",
      statLabel: "pour inviter le groupe",
    },
    card2: {
      title: "Étape 2 : Explorez et découvrez",
      description:
        "Swipez parmi les activités, restaurants et hôtels. Ajoutez vos coups de cœur à l'itinéraire.",
      statValue: "500+",
      statLabel: "lieux à découvrir",
    },
    card3: {
      title: "Étape 3 : Décidez et finalisez",
      description:
        "Lancez des sondages, gérez le budget et préparez le départ ensemble.",
      statValue: "100%",
      statLabel: "décidé ensemble",
    },
  },
  en: {
    badge: "discover the app",
    title: "Plan your group trip in 3 simple steps",
    description: "Simple, collaborative and built for groups.",
    card1: {
      title: "Step 1: Invite your group",
      description:
        "Fill in the essentials. Add your friends or family in one click. Everyone sees the same trip.",
      statValue: "1 min",
      statLabel: "to invite the group",
    },
    card2: {
      title: "Step 2: Explore and discover",
      description:
        "Swipe through activities, restaurants and hotels. Add your favorites to the itinerary.",
      statValue: "500+",
      statLabel: "places to discover",
    },
    card3: {
      title: "Step 3: Decide and finalize",
      description:
        "Create polls, manage the budget and prepare the departure together.",
      statValue: "100%",
      statLabel: "decided together",
    },
  },
};

interface TravelStepsProps {
  locale?: string;
}

export default function TravelSteps({ locale = "en" }: TravelStepsProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const content = CONTENT[lang];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <div className="px-4 lg:px-8 pb-8 lg:pb-12">
      <div className="max-w-[1536px] mx-auto">
        <div
          ref={ref}
          className="bg-[#001E13] rounded-[24px] lg:rounded-[40px] p-8 lg:p-12 xl:p-16"
        >
          <div className="mb-8 lg:mb-12">
            <span className="text-orange bg-[#FFFBF5] px-4 py-1 rounded-full text-sm lg:text-lg inline-block mb-4 lg:mb-6 font-nanum-pen">
              {content.badge}
            </span>
            <h2 className="text-[#FFFBF5] text-2xl lg:text-4xl xl:text-[48px] font-londrina-solid leading-tight mb-4 lg:mb-6 whitespace-pre-line">
              {content.title}
            </h2>
            <p className="text-[#FFFBF5] text-base lg:text-lg font-karla leading-relaxed max-w-3xl">
              {content.description}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.25fr_1fr] gap-4 lg:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col"
            >
              <div className="flex-1 min-h-[180px] lg:min-h-[220px]">
                <LiveCollaboration autoPlay={isInView} locale={locale} />
              </div>
              <div className="p-5 lg:p-6 bg-white">
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                  {content.card1.title}
                </h3>
                <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                  {content.card1.description}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-londrina-solid text-[#F6391A]">
                    {content.card1.statValue}
                  </span>
                  <span className="text-xs text-[#001E13]/50 font-karla">
                    {content.card1.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-[24px] lg:rounded-[32px] overflow-hidden min-h-[320px] lg:min-h-[380px] flex flex-col"
            >
              <div className="flex-1 min-h-[180px] lg:min-h-[220px]">
                <SwipeExplorer autoPlay={isInView} locale={locale} />
              </div>
              <div className="p-5 lg:p-6 bg-white">
                <h3 className="text-[#001E13] text-xl lg:text-2xl font-londrina-solid mb-2">
                  {content.card2.title}
                </h3>
                <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                  {content.card2.description}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-londrina-solid text-[#61DBD5]">
                    {content.card2.statValue}
                  </span>
                  <span className="text-xs text-[#001E13]/50 font-karla">
                    {content.card2.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>

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
                  {content.card3.title}
                </h3>
                <p className="text-[#001E13]/70 text-sm font-karla line-clamp-2">
                  {content.card3.description}
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13]">
                    {content.card3.statValue}
                  </span>
                  <span className="text-xs text-[#001E13]/50 font-karla">
                    {content.card3.statLabel}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
