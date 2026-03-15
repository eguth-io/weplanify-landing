'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { PackingSuitcase } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

interface FeaturePageData {
  slug: string;
  icon: string;
  accentColor: string;
  gradientFrom: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  socialProofText: string;
  heroCta: string;
  heroCtaSubtext: string;
  stats: { value: string; label: string }[];
  featuresTitle: string;
  features: { icon: string; title: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  seoTitle: string;
  seoDescription: string;
}

// Checklist item with animation
function ChecklistItem({
  item,
  checked: initialChecked,
  delay = 0
}: {
  item: string;
  checked: boolean;
  delay?: number;
}) {
  const [checked, setChecked] = useState(initialChecked);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      onClick={() => setChecked(!checked)}
      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
        checked ? 'bg-green-50' : 'bg-white hover:bg-gray-50'
      }`}
    >
      <motion.div
        animate={{ scale: checked ? [1, 1.2, 1] : 1 }}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          checked ? 'bg-green-500 border-green-500' : 'border-gray-300'
        }`}
      >
        {checked && (
          <motion.svg
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </motion.svg>
        )}
      </motion.div>
      <span className={`font-karla flex-1 ${checked ? 'line-through text-gray-400' : 'text-[#001E13]'}`}>
        {item}
      </span>
    </motion.div>
  );
}

// Category section
function CategorySection({
  icon,
  title,
  items,
  progress,
  delay = 0
}: {
  icon: string;
  title: string;
  items: { name: string; checked: boolean }[];
  progress: number;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{icon}</span>
          <h3 className="font-londrina-solid text-xl text-[#001E13]">{title}</h3>
        </div>
        <span className="text-sm font-karla text-[#001E13]/50">{progress}%</span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 0.5 }}
          className="h-full bg-gradient-to-r from-[#F6391A] to-[#61DBD5] rounded-full"
        />
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <ChecklistItem key={i} item={item.name} checked={item.checked} delay={delay + 0.1 + (i * 0.05)} />
        ))}
      </div>
    </motion.div>
  );
}

export default function PackingFeature({ data }: { data: FeaturePageData }) {
  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle}
        featureDescription={data.seoDescription}
        featureUrl={`https://weplanify.com/features/${data.slug}`}
        faqItems={data.faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FFFBF5] to-[#61DBD5]/10">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="inline-block mb-6"
              >
                <span className="text-7xl">{data.icon}</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
              >
                <span className="text-[#F6391A]">{data.heroTitleHighlight}</span> {data.heroTitle}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#001E13]/70 font-karla max-w-xl mx-auto mb-8"
              >
                {data.heroSubtitle}
              </motion.p>

              {/* Overall progress */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-lg"
              >
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#e5e7eb" strokeWidth="6" />
                    <motion.circle
                      cx="32" cy="32" r="28"
                      fill="none"
                      stroke="#F6391A"
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 176" }}
                      animate={{ strokeDasharray: "123 176" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center font-unbounded font-bold text-[#001E13]">
                    70%
                  </span>
                </div>
                <div className="text-left">
                  <p className="font-karla font-semibold text-[#001E13]">14 / 20 items</p>
                  <p className="text-sm text-[#001E13]/50">ready for the trip</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interactive checklist demo */}
        <section className="px-4 lg:px-8 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <CategorySection
                icon="👕"
                title="Clothing"
                progress={80}
                items={[
                  { name: "T-shirts (x5)", checked: true },
                  { name: "Pants (x3)", checked: true },
                  { name: "Light jacket", checked: true },
                  { name: "Swimsuit", checked: false },
                ]}
                delay={0.1}
              />
              <CategorySection
                icon="🔌"
                title="Electronics"
                progress={60}
                items={[
                  { name: "Phone charger", checked: true },
                  { name: "Power adapter", checked: true },
                  { name: "Power bank", checked: false },
                  { name: "Earbuds", checked: false },
                ]}
                delay={0.2}
              />
              <CategorySection
                icon="🧴"
                title="Toiletries"
                progress={100}
                items={[
                  { name: "Toothbrush", checked: true },
                  { name: "Sunscreen", checked: true },
                  { name: "Shampoo", checked: true },
                ]}
                delay={0.3}
              />
            </div>

            {/* Tip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 p-4 bg-[#61DBD5]/10 rounded-xl border border-[#61DBD5]/30 flex items-start gap-3"
            >
              <span className="text-2xl">💡</span>
              <div>
                <p className="font-karla font-semibold text-[#001E13]">Suggestion based on your trip</p>
                <p className="text-sm text-[#001E13]/60">
                  The average temperature in Lisbon in April is 28 degrees C. Remember to pack light clothing and sunscreen!
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12 bg-[#001E13]">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-londrina-solid text-[#FFFBF5] text-center mb-8"
            >
              Pack your bags with peace of mind
            </motion.h2>
            <PackingSuitcase autoPlay />
          </div>
        </section>

        {/* Shared packing */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
                Who brings what? Settle it once and for all
              </h2>
              <p className="text-[#001E13]/60 font-karla max-w-xl mx-auto">
                Avoid duplicates by assigning who brings what
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { avatar: "👩‍🎨", name: "Marie", items: ["Sunscreen", "Card game", "Travel guide"] },
                { avatar: "🧔", name: "Thomas", items: ["Power adapter", "Bluetooth speaker"] },
                { avatar: "👱‍♀️", name: "Emma", items: ["First aid kit", "Binoculars"] },
              ].map((person, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{person.avatar}</span>
                    <span className="font-londrina-solid text-xl text-[#001E13]">{person.name}</span>
                  </div>
                  <p className="text-sm text-[#001E13]/50 mb-3 font-karla">Bringing:</p>
                  <ul className="space-y-2">
                    {person.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm font-karla text-[#001E13]">
                        <span className="w-2 h-2 bg-[#61DBD5] rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 bg-[#F6391A]/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {data.features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-4xl block mb-3">{f.icon}</span>
                  <h3 className="font-londrina-solid text-lg text-[#001E13] mb-1">{f.title}</h3>
                  <p className="text-sm text-[#001E13]/60 font-karla">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={data.faqItems} accentColor={data.accentColor} />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-6xl mb-6 block">✅</span>
              <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
                {data.ctaTitle}
              </h2>
              <p className="text-[#001E13]/60 font-karla mb-8 max-w-md mx-auto">
                {data.ctaSubtitle}
              </p>
              <Link href="/signup" className="inline-block">
                <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                  {data.ctaButton}
                </PulsatingButton>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-3 font-karla">{data.heroCtaSubtext}</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
