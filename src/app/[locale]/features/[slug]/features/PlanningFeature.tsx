'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { AiGlobeJourney } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";

type Lang = "en" | "fr";

const COPY: Record<Lang, {
  you: string;
  brand: string;
  chatBubbles: string[];
  chips: string[];
  modesTitle: string;
  modesSubtitle: string;
  manualTitle: string;
  manualSubtitle: string;
  manualSteps: { title: string; description: string }[];
  aiTitle: string;
  aiSubtitle: string;
  aiUserMsg: string;
  aiAssistantMsg: string;
  aiTags: string[];
  bestOfBoth: { strong: string; rest: string };
  visualTitle: string;
  capabilitiesSubtitle: string;
  freeNoCard: string;
}> = {
  fr: {
    you: "Toi",
    brand: "WePlanify IA",
    chatBubbles: [
      "Je veux passer 2 semaines au Japon en avril avec ma copine. On adore la nature, la cuisine et les temples. Budget moyen.",
      "Excellent choix ! Le Japon en avril, c'est la saison des cerisiers. Je suggère un itinéraire Tokyo — Kyoto — Osaka avec des étapes à Nara et Hakone. Tu veux voir les options d'hébergement ?",
      "Oui, plutôt des ryokans traditionnels si possible",
      "Parfait ! J'ai sélectionné 3 ryokans avec onsen privé à Hakone et 2 machiya rénovées à Kyoto. Je calcule aussi les trajets JR Pass pour optimiser tes déplacements...",
    ],
    chips: ["Ajouter une rando", "Cours de sushi", "Voir le JR Pass", "Ajuster le budget"],
    modesTitle: "Choisis ton style de planification",
    modesSubtitle: "Que tu préfères tout maîtriser ou laisser l'IA s'en charger, WePlanify s'adapte à toi.",
    manualTitle: "Planification manuelle",
    manualSubtitle: "Contrôle total sur chaque détail. Idéal pour les voyageurs qui aiment construire leur propre aventure.",
    manualSteps: [
      { title: "Crée ton voyage", description: "Choisis la destination, les dates et invite tes compagnons de voyage." },
      { title: "Ajoute des étapes", description: "Construis ton itinéraire étape par étape, avec plusieurs stops." },
      { title: "Remplis chaque journée", description: "Glissez-déposez activités, restaurants et hébergements." },
      { title: "Collabore", description: "Le groupe ajoute ses idées et vote sur les options." },
    ],
    aiTitle: "Planification par IA",
    aiSubtitle: "Décris ton voyage de rêve et laisse l'IA créer un itinéraire personnalisé en quelques secondes.",
    aiUserMsg: "2 semaines au Japon, saison des cerisiers, nature et temples",
    aiAssistantMsg: "Création de ton itinéraire Tokyo → Kyoto → Osaka avec ryokans et visites de temples...",
    aiTags: ["Itinéraire instantané", "Suggestions intelligentes", "Itinéraire optimisé"],
    bestOfBoth: {
      strong: "Le meilleur des deux mondes :",
      rest: " commence avec l'IA puis ajuste manuellement. Ou planifie à la main et demande à l'IA de combler les vides.",
    },
    visualTitle: "L'IA visualise ton voyage",
    capabilitiesSubtitle: "Plus qu'un simple assistant — une vraie expertise voyage propulsée par l'IA.",
    freeNoCard: "Inscription gratuite. Sans carte bancaire.",
  },
  en: {
    you: "You",
    brand: "WePlanify AI",
    chatBubbles: [
      "I want to spend 2 weeks in Japan in April with my girlfriend. We love nature, food, and temples. Medium budget.",
      "Great choice! Japan in April is cherry blossom season. I suggest a Tokyo — Kyoto — Osaka route with stops in Nara and Hakone. Want me to show you accommodation options?",
      "Yes, preferably traditional ryokans if possible",
      "Excellent choice! I've selected 3 ryokans with private onsen in Hakone and 2 renovated machiya in Kyoto. I'm also calculating JR Pass routes to optimize your travel...",
    ],
    chips: ["Add a hike", "Sushi class", "View JR Pass", "Adjust budget"],
    modesTitle: "Choose your planning style",
    modesSubtitle: "Whether you prefer hands-on control or AI-powered convenience, WePlanify adapts to you.",
    manualTitle: "Manual Planning",
    manualSubtitle: "Full control over every detail. Perfect for travelers who love crafting their own adventures.",
    manualSteps: [
      { title: "Create your trip", description: "Set destination, dates, and invite your travel companions." },
      { title: "Add destinations", description: "Build your itinerary step by step with multiple stops." },
      { title: "Fill each day", description: "Drag & drop activities, restaurants, and accommodations." },
      { title: "Collaborate", description: "Your group adds ideas and votes on options." },
    ],
    aiTitle: "AI-Powered Planning",
    aiSubtitle: "Describe your dream trip and let AI create a personalized itinerary in seconds.",
    aiUserMsg: "2 weeks in Japan, cherry blossom season, nature and temples",
    aiAssistantMsg: "Creating your Tokyo → Kyoto → Osaka itinerary with ryokans and temple visits...",
    aiTags: ["Instant itinerary", "Smart suggestions", "Route optimization"],
    bestOfBoth: {
      strong: "Best of both worlds:",
      rest: " start with AI suggestions, then fine-tune manually. Or plan manually and ask AI to fill gaps.",
    },
    visualTitle: "The AI visualizes your journey",
    capabilitiesSubtitle: "More than just an assistant — real travel expertise powered by AI.",
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

// Chat bubble component
function ChatBubble({
  message,
  isAi,
  delay = 0,
  aiLabel,
  userLabel,
}: {
  message: string;
  isAi: boolean;
  delay?: number;
  aiLabel: string;
  userLabel: string;
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
          {isAi ? aiLabel : userLabel}
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

// Manual planning step card
function ManualPlanningCard({
  step,
  title,
  description,
  delay = 0
}: {
  step: number;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex gap-4 items-start"
    >
      <div className="w-10 h-10 rounded-full bg-[#F6391A] text-white flex items-center justify-center font-bold flex-shrink-0">
        {step}
      </div>
      <div>
        <h4 className="font-londrina-solid text-lg text-[#001E13] mb-1">{title}</h4>
        <p className="text-[#001E13]/70 font-karla text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

export default function PlanningFeature({ data }: { data: FeaturePageData }) {
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
                {data.heroBadge}
              </span>
              <h1 className="text-4xl lg:text-6xl font-londrina-solid text-[#001E13] mb-4">
                {data.heroTitle}
                <br />
                <span className="text-[#F6391A]">{data.heroTitleHighlight}</span>
              </h1>
              <p className="text-lg text-[#001E13]/70 font-karla max-w-xl mx-auto mb-6">
                {data.heroSubtitle}
              </p>
              <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="inline-block">
                <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                  {data.heroCta}
                </PulsatingButton>
              </Link>
              <p className="text-sm text-[#001E13]/50 mt-2 font-karla">{data.heroCtaSubtext}</p>

              {/* Social proof */}
              <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-8 mt-8 text-sm font-karla">
                {data.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="font-semibold text-[#001E13]">{stat.value}</span>
                    <span className="text-[#001E13]/60">{stat.label}</span>
                    {index < data.stats.length - 1 && (
                      <div className="w-px h-4 bg-[#001E13]/20 hidden sm:block ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Chat conversation demo */}
            <div className="relative z-10 mb-8">
              <ChatBubble message={t.chatBubbles[0]} isAi={false} delay={0.2} aiLabel={t.brand} userLabel={t.you} />
              <ChatBubble message={t.chatBubbles[1]} isAi={true} delay={0.6} aiLabel={t.brand} userLabel={t.you} />
              <ChatBubble message={t.chatBubbles[2]} isAi={false} delay={1} aiLabel={t.brand} userLabel={t.you} />
              <ChatBubble message={t.chatBubbles[3]} isAi={true} delay={1.4} aiLabel={t.brand} userLabel={t.you} />
            </div>

            {/* Suggestion chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex flex-wrap gap-3 justify-center mb-12"
            >
              <SuggestionChip text={t.chips[0]} delay={1.9} />
              <SuggestionChip text={t.chips[1]} delay={2} />
              <SuggestionChip text={t.chips[2]} delay={2.1} />
              <SuggestionChip text={t.chips[3]} delay={2.2} />
            </motion.div>
          </div>
        </section>

        {/* Two Planning Modes Section */}
        <section className="px-4 lg:px-8 py-16 lg:py-24 bg-gradient-to-b from-white to-[#FFFBF5]">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] text-center mb-4"
            >
              {t.modesTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-[#001E13]/60 font-karla mb-12 max-w-2xl mx-auto"
            >
              {t.modesSubtitle}
            </motion.p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Manual Planning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-[#001E13]/10"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">✍️</span>
                  <h3 className="text-2xl font-londrina-solid text-[#001E13]">{t.manualTitle}</h3>
                </div>
                <p className="text-[#001E13]/70 font-karla mb-8">
                  {t.manualSubtitle}
                </p>
                <div className="space-y-6">
                  {t.manualSteps.map((step, i) => (
                    <ManualPlanningCard
                      key={i}
                      step={i + 1}
                      title={step.title}
                      description={step.description}
                      delay={(i + 1) * 0.1}
                    />
                  ))}
                </div>
              </motion.div>

              {/* AI Planning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-[#61DBD5]/20 to-[#F6391A]/10 rounded-3xl p-8 shadow-lg border border-[#61DBD5]/30"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">✨</span>
                  <h3 className="text-2xl font-londrina-solid text-[#001E13]">{t.aiTitle}</h3>
                </div>
                <p className="text-[#001E13]/70 font-karla mb-8">
                  {t.aiSubtitle}
                </p>
                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 mb-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#F6391A] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">{t.you}</span>
                    </div>
                    <div className="bg-[#F6391A]/10 rounded-2xl rounded-tl-sm px-4 py-2">
                      <p className="text-sm font-karla text-[#001E13]">&ldquo;{t.aiUserMsg}&rdquo;</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#61DBD5] to-[#F6391A] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🤖</span>
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm">
                      <p className="text-sm font-karla text-[#001E13]">{t.aiAssistantMsg}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {t.aiTags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-white/60 rounded-full text-xs font-karla text-[#001E13]">{tag}</span>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Mix both */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-8 text-center bg-[#EEF899]/30 rounded-2xl p-6 border border-[#EEF899]"
            >
              <span className="text-2xl mb-2 block">🔄</span>
              <p className="font-karla text-[#001E13]">
                <strong>{t.bestOfBoth.strong}</strong>{t.bestOfBoth.rest}
              </p>
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
              {t.visualTitle}
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
              {data.featuresTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center text-[#001E13]/60 font-karla mb-12 max-w-2xl mx-auto"
            >
              {t.capabilitiesSubtitle}
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.features.map((feature, index) => {
                const gradients = [
                  "from-[#61DBD5]/20 to-[#61DBD5]/5",
                  "from-[#F6391A]/20 to-[#F6391A]/5",
                  "from-[#EEF899]/40 to-[#EEF899]/10",
                  "from-[#61DBD5]/20 to-[#F6391A]/10",
                ];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-br ${gradients[index % gradients.length]} rounded-3xl p-8 border border-white/50 hover:shadow-lg transition-shadow`}
                  >
                    <span className="text-4xl mb-4 block">{feature.icon}</span>
                    <h3 className="text-xl font-londrina-solid text-[#001E13] mb-2">{feature.title}</h3>
                    <p className="text-[#001E13]/70 font-karla">{feature.description}</p>
                  </motion.div>
                );
              })}
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
              className="bg-[#001E13] rounded-[32px] p-8 lg:p-12 text-center relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6391A]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#61DBD5]/20 rounded-full blur-3xl" />

              <div className="relative z-10">
                <span className="text-4xl mb-4 block">{data.icon}</span>
                <h2 className="text-3xl lg:text-4xl font-londrina-solid text-[#FFFBF5] mb-4">
                  {data.ctaTitle}
                </h2>
                <p className="text-[#FFFBF5]/70 font-karla mb-8 max-w-lg mx-auto">
                  {data.ctaSubtitle}
                </p>
                <Link href={`https://app.weplanify.com/${locale}/register?utm_source=landing`} className="inline-block">
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    {data.ctaButton}
                  </PulsatingButton>
                </Link>
                <p className="text-sm text-[#FFFBF5]/50 mt-3 font-karla">{t.freeNoCard}</p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
