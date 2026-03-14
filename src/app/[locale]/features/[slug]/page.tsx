'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";
import {
  AiGlobeJourney,
  BudgetSplit,
  LiveCollaboration,
  SwipeExplorer,
  TimelineCalendar,
  PackingSuitcase,
  LiveVoting,
  TransportJourney,
} from "@/components/animations";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { featurePageQuery } from "@/sanity/lib/query";
import { FeaturePage } from "@/sanity/lib/type";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

// Map slug to animation component
const animationMap: Record<string, React.ComponentType<{ autoPlay?: boolean }>> = {
  "ai-planning": AiGlobeJourney,
  "budget": BudgetSplit,
  "collaboration": LiveCollaboration,
  "explore": SwipeExplorer,
  "itinerary": TimelineCalendar,
  "packing": PackingSuitcase,
  "polls": LiveVoting,
  "transport": TransportJourney,
};

export default function FeaturePageDynamic() {
  const params = useParams();
  const locale = params.locale as string;
  const slug = params.slug as string;

  const [data, setData] = useState<FeaturePage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.fetch<FeaturePage>(featurePageQuery, { locale, slug });
        if (!result) {
          notFound();
        }
        setData(result);
      } catch (error) {
        console.error("Error fetching feature page:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [locale, slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] flex items-center justify-center">
        <div className="animate-pulse text-[#001E13]/50">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return notFound();
  }

  const AnimationComponent = animationMap[slug];

  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle}
        featureDescription={data.seoDescription}
        featureUrl={`https://weplanify.com/${locale}/features/${slug}`}
        faqItems={data.faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#FFFBF5] via-white to-[#FFFBF5]">
        {/* Hero Section */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1 rounded-full mb-4"
              style={{ backgroundColor: `${data.accentColor}20` }}
            >
              <span className="text-lg">{data.icon}</span>
              <span className="font-karla text-sm" style={{ color: data.accentColor }}>
                {data.heroBadge}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
            >
              {data.heroTitle}
              {data.heroTitleHighlight && (
                <>
                  <br />
                  <span style={{ color: data.accentColor }}>{data.heroTitleHighlight}</span>
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-[#001E13]/70 font-karla mb-8 max-w-xl mx-auto"
            >
              {data.heroSubtitle}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link href="/signup" className="inline-block">
                <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                  {data.heroCta}
                </PulsatingButton>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-2 font-karla">{data.heroCtaSubtext}</p>
            </motion.div>

            {/* Stats */}
            {data.stats && data.stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mt-8 text-sm font-karla"
              >
                {data.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-semibold text-[#001E13]">{stat.value}</span>
                    <span className="text-[#001E13]/60">{stat.label}</span>
                    {index < data.stats.length - 1 && (
                      <div className="w-px h-4 bg-[#001E13]/20 ml-4 hidden sm:block" />
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Animation Section */}
        {AnimationComponent && (
          <section className="px-4 lg:px-8 py-12 bg-[#001E13]">
            <div className="max-w-5xl mx-auto">
              <div className="rounded-3xl overflow-hidden bg-[#001E13]/50 p-4 min-h-[300px] lg:min-h-[400px]">
                <AnimationComponent autoPlay />
              </div>
            </div>
          </section>
        )}

        {/* Features Grid */}
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] text-center mb-4"
            >
              {data.featuresTitle}
            </motion.h2>

            <div className={`grid grid-cols-1 ${data.features.length >= 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'} gap-6 mt-12`}>
              {data.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#001E13]/70 font-karla text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={data.faqItems} accentColor={data.accentColor} />

        {/* CTA Section */}
        <section className="px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="rounded-[32px] p-8 lg:p-12 text-center relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${data.accentColor}, ${data.gradientFrom || data.accentColor})`
              }}
            >
              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{data.icon}</span>
                <h2 className="text-3xl lg:text-4xl font-londrina-solid text-white mb-4">
                  {data.ctaTitle}
                </h2>
                <p className="text-white/80 font-karla mb-8 max-w-lg mx-auto">
                  {data.ctaSubtitle}
                </p>
                <Link href="/signup" className="inline-block">
                  <button className="bg-white text-[#001E13] font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                    {data.ctaButton}
                  </button>
                </Link>
                <p className="text-sm text-white/60 mt-3 font-karla">{data.heroCtaSubtext}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
