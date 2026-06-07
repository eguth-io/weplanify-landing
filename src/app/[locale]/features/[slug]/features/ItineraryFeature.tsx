'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { TimelineCalendar } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

// Non-text feature config (not translatable)
const FEATURE = {
  slug: "itinerary",
  icon: "📅",
  accentColor: "#F6391A",
  gradientFrom: "#F6391A",
};

type Copy = {
  calendarMonth: string;
  weekdays: string[];
  dragHint: string;
  days: {
    title: string;
    items: { time: string; icon: string; activity: string }[];
  }[];
};

type Feature = { icon: string; title: string; description: string };
type FaqItem = { question: string; answer: string };

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

export default function ItineraryFeature() {
  const locale = useLocale();
  const t = useTranslations("itineraryFeature");
  const copy = t.raw("copy") as Copy;
  const features = t.raw("page.features") as Feature[];
  const faqItems = t.raw("page.faqItems") as FaqItem[];

  return (
    <>
      <FeatureJsonLd
        featureName={t("page.seoTitle")}
        featureDescription={t("page.seoDescription")}
        locale={locale}
        slug={FEATURE.slug}
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
                {FEATURE.icon} {t("page.heroBadge")}
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
              >
                {t("page.heroTitle")}
                <br />
                <span className="text-[#F6391A]">{t("page.heroTitleHighlight")}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-[#001E13]/70 font-karla max-w-xl mx-auto"
              >
                {t("page.heroSubtitle")}
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
                  <h4 className="font-londrina-solid text-lg text-[#001E13] mb-3">{copy.calendarMonth}</h4>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs">
                    {copy.weekdays.map((d, i) => (
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
                {copy.days.map((day, i) => (
                  <TimelineItem
                    key={i}
                    day={i + 1}
                    title={day.title}
                    isActive={i === 0}
                    items={day.items}
                    delay={0.4 + i * 0.1}
                  />
                ))}
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
              <span className="text-sm font-karla">{copy.dragHint}</span>
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
              {t("page.featuresTitle")}
            </motion.h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((f, i) => (
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
                  <p className="text-sm text-[#001E13]/60 font-karla">{f.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={faqItems} accentColor={FEATURE.accentColor} />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#F6391A] to-[#F6391A]/80 rounded-[32px] p-8 lg:p-12 text-center"
            >
              <span className="text-5xl mb-4 block">{FEATURE.icon}</span>
              <h2 className="text-3xl font-londrina-solid text-white mb-4">
                {t("page.ctaTitle")}
              </h2>
              <p className="text-white/80 font-karla mb-8 max-w-md mx-auto">
                {t("page.ctaSubtitle")}
              </p>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="inline-block">
                <button className="bg-white text-[#F6391A] font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  {t("page.ctaButton")}
                </button>
              </Link>
              <p className="text-sm text-white/60 mt-3 font-karla">{t("page.heroCtaSubtext")}</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
