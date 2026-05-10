'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { LiveCollaboration } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

type Lang = "en" | "fr";

const COPY: Record<Lang, {
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  inviteMore: string;
  liveLabel: string;
  fakeTripTitle: string;
  fakeDays: string[];
  editingTag: string;
  feedTitle: string;
  feedSubtitle: string;
  recentActivity: string;
  activities: { avatar: string; name: string; action: string; time: string }[];
  freeNoCard: string;
}> = {
  fr: {
    heroTitle: "Planifiez un voyage à 10",
    heroTitleHighlight: "sans un seul message WhatsApp",
    heroSubtitle: "Modifications en temps réel, sondages intégrés, historique clair. Tout le monde sur la même page, littéralement.",
    inviteMore: "Inviter plus",
    liveLabel: "En direct",
    fakeTripTitle: "Road Trip Portugal",
    fakeDays: ["Jour 1 — Lisbonne", "Jour 2 — Sintra", "Jour 3 — Porto"],
    editingTag: "Marie modifie…",
    feedTitle: "Ne ratez plus rien",
    feedSubtitle: "Le fil d'activité montre tout ce qui se passe sur votre voyage. Qui a ajouté quoi, quand et où.",
    recentActivity: "Activité récente",
    activities: [
      { avatar: "👩‍🎨", name: "Marie", action: "a ajouté « Dîner à Alfama »", time: "il y a 2 min" },
      { avatar: "🧔", name: "Thomas", action: "a modifié l'hôtel à Porto", time: "il y a 5 min" },
      { avatar: "👱‍♀️", name: "Emma", action: "a voté pour le restaurant", time: "il y a 12 min" },
      { avatar: "🧑‍💻", name: "Lucas", action: "a rejoint le voyage", time: "il y a 1 h" },
    ],
    freeNoCard: "Inscription gratuite. Sans carte bancaire.",
  },
  en: {
    heroTitle: "Plan a trip with 10 friends",
    heroTitleHighlight: "without a single WhatsApp message",
    heroSubtitle: "Real-time edits, built-in polls, clear history. Everyone on the same page, literally.",
    inviteMore: "Invite more",
    liveLabel: "Live",
    fakeTripTitle: "Road Trip Portugal",
    fakeDays: ["Day 1 — Lisbon", "Day 2 — Sintra", "Day 3 — Porto"],
    editingTag: "Marie editing…",
    feedTitle: "Never miss a thing",
    feedSubtitle: "The activity feed shows everything happening on your trip. Who added what, when, and where.",
    recentActivity: "Recent activity",
    activities: [
      { avatar: "👩‍🎨", name: "Marie", action: "added \"Dinner in Alfama\"", time: "2 min ago" },
      { avatar: "🧔", name: "Thomas", action: "updated the hotel in Porto", time: "5 min ago" },
      { avatar: "👱‍♀️", name: "Emma", action: "voted for the restaurant", time: "12 min ago" },
      { avatar: "🧑‍💻", name: "Lucas", action: "joined the trip", time: "1 h ago" },
    ],
    freeNoCard: "Free signup. No credit card required.",
  },
};

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

// Avatar component with cursor
function CollaboratorAvatar({
  name,
  color,
  position,
  delay = 0
}: {
  name: string;
  color: string;
  position: { x: string; y: string };
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className="absolute z-20"
      style={{ left: position.x, top: position.y }}
    >
      <motion.div
        animate={{
          x: [0, 10, -5, 8, 0],
          y: [0, -5, 10, -3, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, delay }}
      >
        {/* Cursor */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="drop-shadow-lg">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill={color} stroke="white" strokeWidth="2"/>
        </svg>
        {/* Name tag */}
        <span
          className="absolute left-6 top-0 px-2 py-0.5 rounded text-xs font-karla text-white whitespace-nowrap"
          style={{ backgroundColor: color }}
        >
          {name}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Live indicator dot
function LiveDot() {
  return (
    <span className="relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
    </span>
  );
}

// Activity feed item
function ActivityItem({
  avatar,
  name,
  action,
  time,
  delay = 0
}: {
  avatar: string;
  name: string;
  action: string;
  time: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex items-center gap-3 py-3 border-b border-[#001E13]/10 last:border-0"
    >
      <span className="text-2xl">{avatar}</span>
      <div className="flex-1">
        <p className="text-sm font-karla">
          <span className="font-semibold text-[#001E13]">{name}</span>
          <span className="text-[#001E13]/60"> {action}</span>
        </p>
      </div>
      <span className="text-xs text-[#001E13]/40 font-karla">{time}</span>
    </motion.div>
  );
}

export default function CollaborationFeature({ data }: { data: FeaturePageData }) {
  const locale = useLocale();
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const t = COPY[lang];

  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle}
        featureDescription={data.seoDescription}
        featureUrl={`https://weplanify.com/features/${data.slug}`}
        faqItems={data.faqItems}
      />

      <div className="min-h-screen bg-[#FFFBF5]">
        {/* Hero with live collaboration preview */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[180px] pb-16 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left - Text */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-4"
                >
                  <LiveDot />
                  <span className="text-sm font-karla text-green-600">{data.heroBadge}</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-6"
                >
                  {t.heroTitle}
                  <br />
                  <span className="text-[#F6391A]">{t.heroTitleHighlight}</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-[#001E13]/70 font-karla mb-4"
                >
                  {t.heroSubtitle}
                </motion.p>

                {/* Social proof */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-4 mb-8 text-sm font-karla"
                >
                  {data.stats.map((stat, index) => (
                    <span key={index} className="px-3 py-1 bg-[#61DBD5]/20 rounded-full text-[#001E13]">
                      {stat.value} {stat.label}
                    </span>
                  ))}
                </motion.div>

                {/* Collaborators avatars */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="flex -space-x-3">
                    {['😊', '🧑‍💻', '👩‍🎨', '🧔', '👱‍♀️'].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-white border-2 border-[#FFFBF5] flex items-center justify-center text-lg shadow-sm"
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <button className="w-10 h-10 rounded-full bg-[#F6391A] text-white flex items-center justify-center text-xl hover:scale-105 transition-transform">
                    +
                  </button>
                  <span className="text-sm text-[#001E13]/60 font-karla">{t.inviteMore}</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link href="https://app.weplanify.com/register?utm_source=landing" className="inline-block">
                    <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                      {data.heroCta}
                    </PulsatingButton>
                  </Link>
                </motion.div>
              </div>

              {/* Right - Interactive preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-2xl p-6 relative min-h-[400px]">
                  {/* Fake interface */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-londrina-solid text-xl text-[#001E13]">{t.fakeTripTitle}</h3>
                    <div className="flex items-center gap-2">
                      <LiveDot />
                      <span className="text-xs text-[#001E13]/50">{t.liveLabel}</span>
                    </div>
                  </div>

                  {/* Fake content being edited */}
                  <div className="space-y-3">
                    <motion.div
                      animate={{ backgroundColor: ['#FFF', '#61DBD520', '#FFF'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                      className="p-3 rounded-lg border border-[#61DBD5]"
                    >
                      <span className="text-sm font-karla text-[#001E13]">{t.fakeDays[0]}</span>
                    </motion.div>
                    <motion.div
                      animate={{ backgroundColor: ['#FFF', '#F6391A20', '#FFF'] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                      className="p-3 rounded-lg border border-[#F6391A]"
                    >
                      <span className="text-sm font-karla text-[#001E13]">{t.fakeDays[1]}</span>
                      <span className="ml-2 text-xs bg-[#F6391A]/10 text-[#F6391A] px-2 py-0.5 rounded">{t.editingTag}</span>
                    </motion.div>
                    <div className="p-3 rounded-lg border border-gray-200">
                      <span className="text-sm font-karla text-[#001E13]">{t.fakeDays[2]}</span>
                    </div>
                  </div>

                  {/* Floating cursors */}
                  <CollaboratorAvatar name="Marie" color="#F6391A" position={{ x: "60%", y: "45%" }} delay={0.5} />
                  <CollaboratorAvatar name="Thomas" color="#61DBD5" position={{ x: "30%", y: "70%" }} delay={0.8} />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Animation Section */}
        <section className="px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            <LiveCollaboration autoPlay locale={locale} />
          </div>
        </section>

        {/* Activity Feed Section */}
        <section className="px-4 lg:px-8 py-16 bg-[#001E13]">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5] mb-4"
                >
                  {t.feedTitle}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-[#FFFBF5]/70 font-karla mb-6"
                >
                  {t.feedSubtitle}
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6"
              >
                <h4 className="font-londrina-solid text-lg text-[#001E13] mb-4 flex items-center gap-2">
                  {t.recentActivity} <LiveDot />
                </h4>
                {t.activities.map((act, i) => (
                  <ActivityItem
                    key={i}
                    avatar={act.avatar}
                    name={act.name}
                    action={act.action}
                    time={act.time}
                    delay={0.2 + i * 0.1}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <span className="text-5xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">{feature.title}</h3>
                  <p className="text-[#001E13]/70 font-karla">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FeatureFAQ items={data.faqItems} accentColor={data.accentColor} />

        {/* CTA */}
        <section className="px-4 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-[#61DBD5] to-[#F6391A] rounded-[32px] p-8 lg:p-12"
            >
              <h2 className="text-3xl lg:text-4xl font-londrina-solid text-white mb-4">
                {data.ctaTitle}
              </h2>
              <p className="text-white/90 font-karla mb-8 max-w-lg mx-auto">
                {data.ctaSubtitle}
              </p>
              <Link href="https://app.weplanify.com/register?utm_source=landing" className="inline-block">
                <button className="bg-white text-[#001E13] font-karla font-bold text-lg px-8 py-3 rounded-full hover:scale-105 transition-transform shadow-lg">
                  {data.ctaButton}
                </button>
              </Link>
              <p className="text-sm text-white/60 mt-3 font-karla">{t.freeNoCard}</p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
