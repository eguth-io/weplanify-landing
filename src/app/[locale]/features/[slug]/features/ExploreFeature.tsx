'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ExplorerCards } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";
import FadeIn from "@/components/FadeIn";

// Non-text, non-translatable presentation values (migrated from Sanity).
const FEATURE_META = {
  slug: "explore",
  icon: "🗺️",
  accentColor: "#61DBD5",
  gradientFrom: "#61DBD5",
} as const;

// Per-category emoji icons, index-aligned with page.features in messages.
const CATEGORY_ICONS = ["🍽️", "🏛️", "🌳", "🌅"] as const;

// Stat values, index-aligned with page.stats labels in messages.
const STAT_VALUES = ["10,000+", "8", "100+"] as const;

type ExploreSection = {
  title: string;
  subtitle: string;
  items: { emoji: string; title: string; description: string }[];
};

type ExploreCopy = {
  hero: { title: string; titleHighlight: string; subtitle: string; cta: string; ctaSubtext: string };
  intro: { title: string; paragraphs: string[] };
  painPoints: ExploreSection;
  howItWorks: ExploreSection;
  animationShowcase: { title: string; subtitle: string; caption: string };
  mapPreview: { title: string; subtitle: string; caption: string };
  useCases: ExploreSection;
  categoriesTitle: string;
  mapPins: { hotel: string; restaurant: string; activity: string };
};

export default function ExploreFeature() {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const t = useTranslations("exploreFeature");
  const copy = t.raw("copy") as ExploreCopy;

  const features = t.raw("page.features") as { title: string; description: string }[];
  const faqItems = t.raw("page.faqItems") as { question: string; answer: string }[];
  const statLabels = t.raw("page.stats") as { label: string }[];
  const stats = statLabels.map((s, i) => ({ value: STAT_VALUES[i] ?? "", label: s.label }));

  return (
    <>
      <FeatureJsonLd
        featureName={t("page.seoTitle")}
        featureDescription={t("page.seoDescription")}
        locale={locale}
        slug={FEATURE_META.slug}
        faqItems={faqItems}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#001E13] via-[#001E13] to-[#61DBD5]/20">
        {/* Hero */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16 lg:pb-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-10 lg:gap-12 items-center">
              {/* Left — copy */}
              <div className="text-center lg:text-left">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-block px-4 py-1 bg-[#61DBD5]/20 text-[#61DBD5] rounded-full text-sm font-karla mb-4"
                >
                  {t("page.heroBadge")}
                </motion.span>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#FFFBF5] mb-6 leading-tight"
                >
                  {copy.hero.title}
                  <br />
                  <span className="text-[#61DBD5]">{copy.hero.titleHighlight}</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg lg:text-xl text-[#FFFBF5]/70 font-karla mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                >
                  {copy.hero.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col items-center lg:items-start"
                >
                  <Link
                    href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=feature&utm_campaign=explorer`}
                    className="inline-block"
                  >
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      {copy.hero.cta}
                    </PulsatingButton>
                  </Link>
                  <p className="text-sm text-[#FFFBF5]/50 mt-3 font-karla">{copy.hero.ctaSubtext}</p>
                </motion.div>

                {/* Inline stat trio */}
                {stats && stats.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
                  >
                    {stats.slice(0, 3).map((stat, i) => (
                      <div key={i} className="text-center lg:text-left">
                        <div className="font-londrina-solid text-2xl lg:text-3xl text-[#61DBD5]">
                          {stat.value}
                        </div>
                        <div className="font-karla text-xs text-[#FFFBF5]/60 mt-1 leading-tight">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Right — ExplorerCards (the real-app preview) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                {/* Soft glow behind the panel */}
                <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#F6391A]/20 via-[#EEF899]/10 to-[#61DBD5]/20 blur-2xl" />
                <div className="relative rounded-3xl bg-white shadow-2xl ring-1 ring-white/20 overflow-hidden">
                  <div className="min-h-[420px] lg:min-h-[480px]">
                    <ExplorerCards autoPlay locale={lang} layout="list" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Intro narrative */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-8 leading-tight">
                {copy.intro.title}
              </h2>
              <div className="space-y-5">
                {copy.intro.paragraphs.map((p, i) => (
                  <p key={i} className="text-[#001E13]/80 text-base lg:text-lg font-karla leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Pain points */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                  {copy.painPoints.title}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                  {copy.painPoints.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {copy.painPoints.items.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-7"
                  >
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3">
                      {item.title}
                    </h3>
                    <p className="font-karla text-sm lg:text-base text-[#FFFBF5]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* How it works */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                  {copy.howItWorks.title}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {copy.howItWorks.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {copy.howItWorks.items.map((item, i) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl lg:rounded-3xl p-6 lg:p-8 border ${
                      i === 0
                        ? "bg-[#EEF899] border-[#EEF899]"
                        : i === 1
                          ? "bg-[#61DBD5]/15 border-[#61DBD5]/30"
                          : i === 2
                            ? "bg-[#F6391A]/10 border-[#F6391A]/30"
                            : "bg-white border-[#001E13]/10"
                    }`}
                  >
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#001E13] mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-karla text-sm lg:text-base text-[#001E13]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ExplorerCards animation showcase — the real Explorer interface, large */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-gradient-to-b from-[#FFFBF5] to-[#61DBD5]/10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-10 lg:mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                  {copy.animationShowcase.title}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {copy.animationShowcase.subtitle}
                </p>
              </div>

              <div className="relative">
                <div className="absolute -inset-3 lg:-inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#F6391A]/20 via-[#EEF899]/20 to-[#61DBD5]/20 blur-2xl" />
                <div className="relative bg-white rounded-3xl lg:rounded-[2rem] shadow-2xl overflow-hidden border border-[#001E13]/5">
                  <div className="min-h-[560px] lg:min-h-[680px]">
                    <ExplorerCards autoPlay locale={lang} />
                  </div>
                </div>
              </div>

              <p className="text-center text-xs lg:text-sm font-karla text-[#001E13]/50 mt-6 italic">
                {copy.animationShowcase.caption}
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Map preview */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 lg:mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] leading-tight mb-4">
                  {copy.mapPreview.title}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#001E13]/70 max-w-2xl mx-auto">
                  {copy.mapPreview.subtitle}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-[#61DBD5]/20 to-[#EEF899]/20 rounded-3xl h-[400px] lg:h-[480px] overflow-hidden border border-[#001E13]/10"
              >
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(0,30,19,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,30,19,.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />

                {[
                  { x: "20%", y: "30%", label: copy.mapPins.hotel, color: "#001E13" },
                  { x: "55%", y: "40%", label: copy.mapPins.restaurant, color: "#F6391A" },
                  { x: "38%", y: "62%", label: copy.mapPins.activity, color: "#EEF899" },
                  { x: "72%", y: "28%", label: copy.mapPins.restaurant, color: "#F6391A" },
                  { x: "80%", y: "60%", label: copy.mapPins.activity, color: "#EEF899" },
                  { x: "30%", y: "75%", label: copy.mapPins.hotel, color: "#001E13" },
                ].map((pin, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, y: -20 }}
                    whileInView={{ scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 200 }}
                    className="absolute"
                    style={{ left: pin.x, top: pin.y }}
                  >
                    <div className="relative">
                      <div
                        className="w-9 h-9 lg:w-11 lg:h-11 rounded-full flex items-center justify-center text-white shadow-lg ring-4 ring-white"
                        style={{ backgroundColor: pin.color }}
                      >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 lg:w-5 lg:h-5" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        </svg>
                      </div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-karla font-bold text-[#001E13] whitespace-nowrap bg-white px-2.5 py-0.5 rounded-full shadow-md">
                        {pin.label}
                      </span>
                    </div>
                  </motion.div>
                ))}

                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm font-karla text-[#001E13]/40 italic">
                  {copy.mapPreview.caption}
                </p>
              </motion.div>
            </div>
          </section>
        </FadeIn>

        {/* Use cases */}
        <FadeIn>
          <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#001E13]">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                  {copy.useCases.title}
                </h2>
                <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/70 max-w-2xl mx-auto">
                  {copy.useCases.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                {copy.useCases.items.map((item) => (
                  <div
                    key={item.title}
                    className="bg-[#FFFBF5]/5 backdrop-blur-sm border border-[#FFFBF5]/10 rounded-2xl lg:rounded-3xl p-6 lg:p-7 hover:bg-[#FFFBF5]/10 transition-colors"
                  >
                    <div className="text-4xl mb-4">{item.emoji}</div>
                    <h3 className="text-xl lg:text-2xl font-londrina-solid text-[#FFFBF5] mb-3 leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-karla text-sm lg:text-base text-[#FFFBF5]/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* Categories (kept from original Sanity data) */}
        <FadeIn>
          <section className="py-16 lg:py-20 px-4 lg:px-8 bg-[#FFFBF5]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl lg:text-4xl font-londrina-solid text-[#001E13] text-center mb-8">
                {copy.categoriesTitle}
              </h2>

              <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
                {features.map((feature, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-3 bg-white border border-[#001E13]/10 hover:border-[#F6391A]/30 rounded-full flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="text-xl">{CATEGORY_ICONS[i]}</span>
                    <span className="font-karla text-[#001E13]">{feature.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* FAQ */}
        <FeatureFAQ items={faqItems} accentColor={FEATURE_META.accentColor} />

        {/* Final CTA */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <span className="text-5xl lg:text-6xl mb-4 lg:mb-6 block">{FEATURE_META.icon}</span>
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {t("page.ctaTitle")}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {t("page.ctaSubtitle")}
              </p>
              <div className="flex justify-center">
                <Link
                  href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=feature&utm_campaign=explorer`}
                  className="inline-block"
                >
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    {t("page.ctaButton")}
                  </PulsatingButton>
                </Link>
              </div>
              <p className="text-sm text-[#FFFBF5]/70 mt-4 font-karla">
                {copy.hero.ctaSubtext}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
