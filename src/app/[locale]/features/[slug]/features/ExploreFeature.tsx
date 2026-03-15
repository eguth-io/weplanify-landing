'use client';

import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { SwipeExplorer } from "@/components/animations";
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

// Swipeable card component
function SwipeCard({
  place,
  onSwipe
}: {
  place: { name: string; image: string; rating: number; category: string; distance: string };
  onSwipe: (direction: 'left' | 'right') => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  return (
    <motion.div
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 100) onSwipe('right');
        else if (info.offset.x < -100) onSwipe('left');
      }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
    >
      <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Image placeholder */}
        <div
          className="h-2/3 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.7)), url(${place.image})`,
            backgroundColor: '#61DBD5'
          }}
        >
          {/* Like/Nope indicators */}
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-6 right-6 px-4 py-2 bg-green-500 text-white font-bold rounded-lg rotate-12 border-4 border-green-600"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-6 left-6 px-4 py-2 bg-red-500 text-white font-bold rounded-lg -rotate-12 border-4 border-red-600"
          >
            SKIP
          </motion.div>

          {/* Category badge */}
          <span className="absolute top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-karla">
            {place.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-londrina-solid text-2xl text-[#001E13]">{place.name}</h3>
            <div className="flex items-center gap-1 bg-[#EEF899] px-2 py-1 rounded-full">
              <span className="text-sm">*</span>
              <span className="text-sm font-bold text-[#001E13]">{place.rating}</span>
            </div>
          </div>
          <p className="text-[#001E13]/60 font-karla text-sm">{place.distance}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ExploreFeature({ data }: { data: FeaturePageData }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const places = [
    { name: "Cafe da Garagem", image: "/places/cafe.jpg", rating: 4.8, category: "Cafe", distance: "350m from center" },
    { name: "Miradouro da Senhora do Monte", image: "/places/viewpoint.jpg", rating: 4.9, category: "View", distance: "1.2km" },
    { name: "Time Out Market", image: "/places/market.jpg", rating: 4.6, category: "Food Hall", distance: "800m" },
  ];

  const handleSwipe = () => {
    setCurrentIndex((prev) => (prev + 1) % places.length);
  };

  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle}
        featureDescription={data.seoDescription}
        featureUrl={`https://weplanify.com/features/${data.slug}`}
        faqItems={data.faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#001E13] via-[#001E13] to-[#61DBD5]/20">
        {/* Hero with swipe demo */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div className="text-center lg:text-left">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block px-4 py-1 bg-[#61DBD5]/20 text-[#61DBD5] rounded-full text-sm font-karla mb-4"
                >
                  {data.heroBadge}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#FFFBF5] mb-6"
                >
                  {data.heroTitle}
                  <br />
                  <span className="text-[#61DBD5]">{data.heroTitleHighlight}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[#FFFBF5]/70 font-karla mb-8"
                >
                  {data.heroSubtitle}
                </motion.p>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center lg:justify-start gap-4 mb-8"
                >
                  <button className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl hover:bg-red-500/20 hover:border-red-500 transition-colors">
                    X
                  </button>
                  <button className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl hover:bg-yellow-500/20 hover:border-yellow-500 transition-colors">
                    *
                  </button>
                  <button className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-2xl hover:bg-green-500/20 hover:border-green-500 transition-colors">
                    +
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="/signup" className="inline-block">
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      {data.heroCta}
                    </PulsatingButton>
                  </Link>
                </motion.div>
              </div>

              {/* Right - Swipe cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative h-[500px] lg:h-[550px]"
              >
                {/* Background cards stack */}
                <div className="absolute inset-4 bg-white/5 rounded-3xl transform rotate-6" />
                <div className="absolute inset-4 bg-white/10 rounded-3xl transform -rotate-3" />

                {/* Active card */}
                <div className="absolute inset-0 p-4">
                  <SwipeCard
                    place={places[currentIndex]}
                    onSwipe={handleSwipe}
                  />
                </div>

                {/* Swipe hints */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-center gap-2">
                  {places.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#F6391A]' : 'bg-white/30'}`}
                    />
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Animation */}
        <section className="px-4 lg:px-8 py-12 bg-[#FFFBF5]">
          <div className="max-w-4xl mx-auto">
            <SwipeExplorer autoPlay />
          </div>
        </section>

        {/* Map preview section */}
        <section className="px-4 lg:px-8 py-16 bg-[#FFFBF5]">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#001E13] mb-4">
                Everything on the map
              </h2>
              <p className="text-[#001E13]/60 font-karla max-w-xl mx-auto">
                View all your saved places on an interactive map
              </p>
            </motion.div>

            {/* Fake map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative bg-[#61DBD5]/20 rounded-3xl h-[400px] overflow-hidden"
            >
              {/* Map pins */}
              {[
                { x: '25%', y: '30%', label: 'Cafe' },
                { x: '60%', y: '45%', label: 'Museum' },
                { x: '40%', y: '65%', label: 'Restaurant' },
                { x: '75%', y: '25%', label: 'Viewpoint' },
              ].map((pin, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.1), type: "spring" }}
                  className="absolute"
                  style={{ left: pin.x, top: pin.y }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-[#F6391A] rounded-full flex items-center justify-center text-white shadow-lg">
                      Pin
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-karla text-[#001E13] whitespace-nowrap bg-white px-2 py-0.5 rounded-full shadow">
                      {pin.label}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Fake map tiles hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#FFFBF5] via-transparent to-transparent" />
              <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-[#001E13]/40 font-karla">
                Interactive map with your favorites
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl font-londrina-solid text-[#FFFBF5] text-center mb-8"
            >
              Explore by category
            </motion.h2>

            <div className="flex flex-wrap justify-center gap-4">
              {data.features.map((feature, i) => (
                <motion.button
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-5 py-3 bg-white/10 hover:bg-white/20 rounded-full flex items-center gap-2 transition-colors"
                >
                  <span className="text-xl">{feature.icon}</span>
                  <span className="font-karla text-[#FFFBF5]">{feature.title}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={data.faqItems} accentColor={data.accentColor} />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-16 bg-[#FFFBF5]">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-6xl mb-6 block">{data.icon}</span>
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
              <p className="text-sm text-[#001E13]/50 mt-3 font-karla">Free, no credit card required</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
