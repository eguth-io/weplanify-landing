'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { TimelineCalendar } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// FAQ Data for SEO
const faqItems = [
  {
    question: "How do I create a day-by-day travel itinerary?",
    answer: "With Weplanify, simply add your stops (accommodations, activities, restaurants) and they automatically appear on the timeline. You can then reorganize with drag-and-drop while the app calculates travel times between each point."
  },
  {
    question: "Does the app calculate travel times?",
    answer: "Yes, Weplanify automatically calculates travel times between each stop on your itinerary, whether by car, public transit, or on foot. You can immediately see if your schedule is realistic."
  },
  {
    question: "Can I export the itinerary to PDF?",
    answer: "Absolutely! Export your complete itinerary to PDF to have it offline or print it out. The PDF includes all addresses, schedules, and booking information."
  },
  {
    question: "How do I reorganize activities in the itinerary?",
    answer: "Just use drag-and-drop! Move any activity to another day or change the order within the same day. The app automatically recalculates travel times."
  },
  {
    question: "Is the itinerary shared with the whole group?",
    answer: "Yes, all trip participants see the same itinerary in real time. Changes are synchronized instantly so everyone stays up to date."
  }
];

// Timeline item component
function TimelineItem({
  day,
  title,
  items,
  isActive = false,
  delay = 0
}: {
  day: number;
  title: string;
  items: { time: string; activity: string; icon: string }[];
  isActive?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="relative pl-8 lg:pl-12 pb-8"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-[#F6391A] via-[#61DBD5] to-[#EEF899]" />

      {/* Day marker */}
      <div className={`absolute left-0 top-0 -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
        isActive ? 'bg-[#F6391A] text-white' : 'bg-white border-2 border-[#F6391A] text-[#F6391A]'
      }`}>
        {day}
      </div>

      {/* Day content */}
      <div className={`bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow ${isActive ? 'ring-2 ring-[#F6391A]' : ''}`}>
        <h3 className="font-londrina-solid text-xl text-[#001E13] mb-4">{title}</h3>
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: delay + (i * 0.1) }}
              className="flex items-center gap-3"
            >
              <span className="text-xs text-[#001E13]/50 font-karla w-12">{item.time}</span>
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-karla text-[#001E13]">{item.activity}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Drag handle indicator
function DragHandle() {
  return (
    <div className="flex flex-col gap-1 opacity-40">
      <div className="w-6 h-0.5 bg-[#001E13] rounded" />
      <div className="w-6 h-0.5 bg-[#001E13] rounded" />
      <div className="w-6 h-0.5 bg-[#001E13] rounded" />
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <>
      <FeatureJsonLd
        featureName="Travel Itinerary - Day-by-Day Planning"
        featureDescription="Organize your trip day by day with our interactive timeline. Visualize, reorganize, and optimize your vacation schedule easily with automatic travel time calculations."
        featureUrl="https://weplanify.com/features/itinerary"
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-block px-4 py-1 bg-[#F6391A]/10 text-[#F6391A] rounded-full text-sm font-karla mb-4"
              >
                📅 Interactive Timeline
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
              >
                Travel planning
                <br />
                <span className="text-[#F6391A]">that actually works</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#001E13]/70 font-karla max-w-xl mx-auto"
              >
                The app calculates travel times and warns you if the 8pm restaurant is 2 hours from the 6pm museum.
                Zero surprises on the ground.
              </motion.p>
            </div>

            {/* Interactive Timeline Demo */}
            <div className="grid lg:grid-cols-5 gap-8">
              {/* Mini calendar */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-24">
                  <h4 className="font-londrina-solid text-lg text-[#001E13] mb-3">April 2024</h4>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <span key={i} className="text-[#001E13]/40 py-1">{d}</span>
                    ))}
                    {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => (
                      <span
                        key={d}
                        className={`py-1 rounded ${
                          d >= 15 && d <= 22
                            ? 'bg-[#F6391A] text-white'
                            : d === 14 || d === 23
                              ? 'bg-[#F6391A]/20 text-[#F6391A]'
                              : 'text-[#001E13]/60'
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Timeline */}
              <div className="lg:col-span-4">
                <TimelineItem
                  day={1}
                  title="Arrival in Tokyo"
                  isActive
                  items={[
                    { time: "14:00", icon: "✈️", activity: "Arrive at Narita Airport" },
                    { time: "16:00", icon: "🏨", activity: "Check-in Hotel Shinjuku" },
                    { time: "19:00", icon: "🍜", activity: "Dinner at Omoide Yokocho" },
                  ]}
                  delay={0.4}
                />
                <TimelineItem
                  day={2}
                  title="Tokyo - Historic District"
                  items={[
                    { time: "09:00", icon: "⛩️", activity: "Senso-ji Temple, Asakusa" },
                    { time: "12:00", icon: "🍣", activity: "Sushi at Tsukiji Market" },
                    { time: "15:00", icon: "🌸", activity: "Stroll through Ueno Park" },
                    { time: "20:00", icon: "🌃", activity: "Tokyo Skytree" },
                  ]}
                  delay={0.5}
                />
                <TimelineItem
                  day={3}
                  title="Tokyo - Modern City"
                  items={[
                    { time: "10:00", icon: "🛍️", activity: "Shopping in Shibuya" },
                    { time: "14:00", icon: "🎮", activity: "Akihabara" },
                    { time: "18:00", icon: "🌆", activity: "Sunset at Shibuya Sky" },
                  ]}
                  delay={0.6}
                />
              </div>
            </div>

            {/* Drag hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center justify-center gap-3 mt-8 text-[#001E13]/40"
            >
              <DragHandle />
              <span className="text-sm font-karla">Drag to reorganize</span>
            </motion.div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12 bg-[#001E13]">
          <div className="max-w-4xl mx-auto">
            <TimelineCalendar autoPlay />
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-12"
            >
              Organize like a pro
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "✋", title: "Drag & Drop", desc: "Reorganize by dragging" },
                { icon: "🚗", title: "Auto Travel Times", desc: "Calculated between stops" },
                { icon: "⚠️", title: "Alerts", desc: "Schedule conflicts detected" },
                { icon: "📤", title: "PDF Export", desc: "Share your schedule" },
              ].map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl block mb-3">{f.icon}</span>
                  <h3 className="font-londrina-solid text-lg text-[#001E13] mb-1">{f.title}</h3>
                  <p className="text-sm text-[#001E13]/60 font-karla">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor="#F6391A" />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#F6391A] to-[#F6391A]/80 rounded-[32px] p-8 lg:p-12 text-center"
            >
              <span className="text-5xl mb-4 block">📅</span>
              <h2 className="text-3xl font-londrina-solid text-white mb-4">
                Say goodbye to messy Excel spreadsheets
              </h2>
              <p className="text-white/80 font-karla mb-8 max-w-md mx-auto">
                Drag and drop, the app optimizes your routes
              </p>
              <Link href="/signup" className="inline-block">
                <button className="bg-white text-[#F6391A] font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  Create my optimized schedule
                </button>
              </Link>
              <p className="text-sm text-white/60 mt-3 font-karla">Free, no credit card required</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
