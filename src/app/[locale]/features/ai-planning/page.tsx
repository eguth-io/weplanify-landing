'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { AiGlobeJourney } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// FAQ Data for SEO
const faqItems = [
  {
    question: "How does Weplanify's AI assistant work?",
    answer: "Weplanify's AI assistant uses artificial intelligence to understand your travel preferences in natural language. Simply describe what you want (destination, budget, travel style, interests) and the AI suggests personalized itineraries, suitable accommodations, and tailored activities."
  },
  {
    question: "Can the AI plan a complete trip?",
    answer: "Yes, the AI can create a complete day-by-day itinerary including transportation, accommodations, restaurants, and activities. It automatically optimizes routes and respects your budget. You can then refine suggestions based on your preferences."
  },
  {
    question: "Does the AI consider seasons and weather?",
    answer: "Absolutely. The AI analyzes your travel dates to recommend the best destinations, local events, and adapt activity suggestions based on expected weather conditions."
  },
  {
    question: "Can I modify the AI's suggestions?",
    answer: "Of course! AI suggestions are just a starting point. You can modify, add, or remove any element. The AI adapts to your feedback to refine its future recommendations."
  },
  {
    question: "What languages does the AI assistant support?",
    answer: "The AI assistant understands and responds in English, French, Spanish, German, and Italian. You can speak naturally in your preferred language."
  }
];

// Chat bubble component
function ChatBubble({
  message,
  isAi,
  delay = 0
}: {
  message: string;
  isAi: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      className={`flex ${isAi ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`max-w-[80%] lg:max-w-[60%] ${isAi ? 'order-2' : 'order-1'}`}>
        <div
          className={`px-5 py-3 rounded-2xl ${
            isAi
              ? 'bg-white text-[#001E13] rounded-tl-sm shadow-lg'
              : 'bg-[#F6391A] text-white rounded-tr-sm'
          }`}
        >
          <p className="font-karla text-base lg:text-lg leading-relaxed">{message}</p>
        </div>
        <p className={`text-xs mt-1 text-[#001E13]/50 ${isAi ? 'text-left' : 'text-right'}`}>
          {isAi ? 'Weplanify AI' : 'You'}
        </p>
      </div>
      {isAi && (
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#61DBD5] to-[#F6391A] flex items-center justify-center mr-3 flex-shrink-0 order-1">
          <span className="text-white text-lg">🤖</span>
        </div>
      )}
    </motion.div>
  );
}

// Floating suggestion chip
function SuggestionChip({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-[#61DBD5]/30 rounded-full text-sm font-karla text-[#001E13] shadow-sm hover:shadow-md hover:border-[#F6391A]/50 transition-all"
    >
      {text}
    </motion.button>
  );
}

export default function AiPlanningPage() {
  return (
    <>
      <FeatureJsonLd
        featureName="AI Planning - Smart Travel Assistant"
        featureDescription="Plan your trip with our AI assistant. Get personalized suggestions for destinations, activities, and itineraries using natural language."
        featureUrl="https://weplanify.com/features/ai-planning"
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FFFBF5] via-[#61DBD5]/5 to-[#FFFBF5]">
        {/* Hero - Chat Style */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-12">
          <div className="max-w-4xl mx-auto">
            {/* Floating AI orbs background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute top-20 left-10 w-32 h-32 bg-[#61DBD5]/20 rounded-full blur-3xl"
              />
              <motion.div
                animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-40 right-20 w-48 h-48 bg-[#F6391A]/10 rounded-full blur-3xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <span className="inline-block px-4 py-1 bg-[#61DBD5]/20 text-[#001E13] rounded-full text-sm font-karla mb-4">
                AI Assistant
              </span>
              <h1 className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-4">
                Your personalized itinerary
                <br />
                <span className="text-[#F6391A]">in 30 seconds</span>
              </h1>
              <p className="text-lg text-[#001E13]/70 font-karla max-w-xl mx-auto mb-6">
                Describe your dream trip in plain English. The AI creates a day-by-day plan with hotels, activities, and optimized routes.
              </p>
              <Link href="/signup" className="inline-block">
                <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                  Create my free itinerary
                </PulsatingButton>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-2 font-karla">No credit card required</p>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mt-8 text-sm font-karla">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#001E13]">12,000+</span>
                  <span className="text-[#001E13]/60">trips planned</span>
                </div>
                <div className="w-px h-4 bg-[#001E13]/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#001E13]">4.8/5</span>
                  <span className="text-[#001E13]/60">satisfaction</span>
                </div>
                <div className="w-px h-4 bg-[#001E13]/20 hidden sm:block" />
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#001E13]">30 sec</span>
                  <span className="text-[#001E13]/60">average time</span>
                </div>
              </div>
            </motion.div>

            {/* Chat conversation demo */}
            <div className="relative z-10 mb-8">
              <ChatBubble
                message="I want to spend 2 weeks in Japan in April with my girlfriend. We love nature, food, and temples. Medium budget."
                isAi={false}
                delay={0.2}
              />
              <ChatBubble
                message="Great choice! Japan in April is cherry blossom season 🌸 I suggest a Tokyo → Kyoto → Osaka route with stops in Nara and Hakone. Want me to show you accommodation options?"
                isAi={true}
                delay={0.6}
              />
              <ChatBubble
                message="Yes, preferably traditional ryokans if possible"
                isAi={false}
                delay={1}
              />
              <ChatBubble
                message="Excellent choice! I've selected 3 ryokans with private onsen in Hakone and 2 renovated machiya in Kyoto. I'm also calculating JR Pass routes to optimize your travel..."
                isAi={true}
                delay={1.4}
              />
            </div>

            {/* Suggestion chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap gap-3 justify-center mb-12"
            >
              <SuggestionChip text="🏔️ Add a hike" delay={1.9} />
              <SuggestionChip text="🍣 Sushi class" delay={2} />
              <SuggestionChip text="🚄 View JR Pass" delay={2.1} />
              <SuggestionChip text="💰 Adjust budget" delay={2.2} />
            </motion.div>
          </div>
        </section>

        {/* Animation Section */}
        <section className="px-4 lg:px-8 py-12 bg-[#001E13]">
          <div className="max-w-5xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5] text-center mb-8"
            >
              The AI visualizes your journey
            </motion.h2>
            <div className="rounded-3xl overflow-hidden bg-[#001E13]/50 p-4 min-h-[300px] lg:min-h-[400px]">
              <AiGlobeJourney autoPlay />
            </div>
          </div>
        </section>

        {/* Features Grid - AI Capabilities */}
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] text-center mb-4"
            >
              What the AI does for you
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-[#001E13]/60 font-karla mb-12 max-w-2xl mx-auto"
            >
              More than just an assistant - real travel expertise powered by artificial intelligence
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "🧠",
                  title: "Understands context",
                  description: "Season, budget, travel style... the AI analyzes everything for relevant suggestions.",
                  gradient: "from-[#61DBD5]/20 to-[#61DBD5]/5",
                },
                {
                  icon: "🗺️",
                  title: "Optimizes routes",
                  description: "Calculates the best itineraries to maximize your time on the ground.",
                  gradient: "from-[#F6391A]/20 to-[#F6391A]/5",
                },
                {
                  icon: "💡",
                  title: "Unexpected suggestions",
                  description: "Discover hidden gems that even guidebooks don't mention.",
                  gradient: "from-[#EEF899]/40 to-[#EEF899]/10",
                },
                {
                  icon: "🔄",
                  title: "Adapts in real-time",
                  description: "Change your preferences, the AI instantly adjusts its recommendations.",
                  gradient: "from-[#61DBD5]/20 to-[#F6391A]/10",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-gradient-to-br ${feature.gradient} rounded-3xl p-8 border border-white/50 hover:shadow-lg transition-shadow`}
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">{feature.title}</h3>
                  <p className="text-[#001E13]/70 font-karla">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor="#61DBD5" />

        {/* CTA Section */}
        <section className="px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#001E13] rounded-[32px] p-8 lg:p-12 text-center relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6391A]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#61DBD5]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <span className="text-4xl mb-4 block">💬</span>
                <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5] mb-4">
                  Hours of research saved
                </h2>
                <p className="text-[#FFFBF5]/70 font-karla mb-8 max-w-lg mx-auto">
                  Describe your dream trip, the AI organizes everything
                </p>
                <Link href="/signup" className="inline-block">
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    Describe my trip to the AI
                  </PulsatingButton>
                </Link>
                <p className="text-sm text-[#FFFBF5]/50 mt-3 font-karla">Free, no credit card required</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
