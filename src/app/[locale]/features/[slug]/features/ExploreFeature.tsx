'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useLocale } from "next-intl";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import { ExplorerCards } from "@/components/animations";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";
import FadeIn from "@/components/FadeIn";

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

const localCopy = {
  en: {
    hero: {
      title: "Browse, add, map.",
      titleHighlight: "Together.",
      subtitle:
        "One screen with hotels, restaurants, activities and transport — curated for your destination. Hit + to add to the trip, watch it land on the shared map.",
      cta: "Try Explorer free",
      ctaSubtext: "Free · no credit card · 30 seconds to start",
    },
    intro: {
      title: "The research-to-trip pipeline, broken.",
      paragraphs: [
        "Planning a group trip should be a conversation, not a spreadsheet. But here you are: 47 browser tabs open, three group chats with different lists, a Notion doc no one updates, and at 11pm the night before you're still arguing whether the rooftop bar is worth the trek across town. The 'what should we do' question — supposed to be the fun part — turns into the part that breaks groups.",
        "The problem isn't a lack of information. It's the opposite. Every city has 10,000 things to do, and the internet promises all of them are must-see. Sorting signal from noise — and getting four to fifteen people to agree on what made the cut — is where most trips quietly fall apart.",
        "Explorer is built for that exact moment. One screen. Four tabs: hotels, restaurants, activities, transport. A curated card grid for your destination. Hit + to add to the trip, see it land on the shared map. Your group does the same, the consensus places float up. Twenty minutes, one mapped shortlist.",
      ],
    },
    painPoints: {
      title: "Why discovery is broken",
      subtitle: "Most groups spend more time fighting the planning than enjoying the trip.",
      items: [
        {
          emoji: "🗂️",
          title: "The tab graveyard",
          description: "35+ open tabs, every one promising the best version of 'best things to do in [city]'. You'll close them tonight, open them again tomorrow. Nothing got decided.",
        },
        {
          emoji: "💬",
          title: "The group chat list nobody updates",
          description: "Sarah suggested 6 places, Marc added 3, Alex liked all of them, the bride-to-be hasn't seen any of it. You'll bring it up at brunch. Maybe.",
        },
        {
          emoji: "🤔",
          title: "Is this actually good or just touristy?",
          description: "Tripadvisor is full of paid reviews, Reddit threads are 4 years old, Instagram is #ad. You end up at the same overcrowded restaurant everyone else picked too.",
        },
        {
          emoji: "🕳️",
          title: "The 'I saved it somewhere' black hole",
          description: "14 Maps stars, 28 Instagram saves, 6 TikTok bookmarks, a screenshot in your camera roll. You'll never find any of them again the day you arrive.",
        },
      ],
    },
    howItWorks: {
      title: "How Explorer fixes it",
      subtitle: "One screen, four tabs, a real shared shortlist at the end.",
      items: [
        {
          emoji: "🎯",
          title: "Four tabs, not a firehose",
          description: "Switch between hotels, restaurants, activities, transport with a single click. The cards adapt to the tab — accommodation shows price-per-night, transport shows route + duration. No more comparing apples to plane tickets.",
        },
        {
          emoji: "➕",
          title: "Add with one tap",
          description: "Every card has a + button. Tap it, the place locks into your trip — green check, no double-confirmation. Your selections sync to the rest of the group in real-time.",
        },
        {
          emoji: "🗺️",
          title: "Map view, side-by-side",
          description: "Cards on the left, interactive map on the right (or below on mobile). Hover a card, the pin lights up on the map. Pick by proximity, not by tab order.",
        },
        {
          emoji: "🤝",
          title: "Group consensus surfaces",
          description: "Everyone sees the same Explorer. When multiple members add the same place, it gets a 'crowd favorite' marker. The places everyone secretly agreed on rise to the top — no debate needed.",
        },
      ],
    },
    animationShowcase: {
      title: "See it in action",
      subtitle: "The real Explorer interface — same tabs, same cards, same + button. Switch types, watch the grid update.",
      caption: "Auto-playing demo · this is what you'll use",
    },
    mapPreview: {
      title: "Everything you added, mapped",
      subtitle: "Every + tap drops a pin on the shared map. Open it the day you arrive, pick what's closest, walk to it.",
      caption: "Interactive map · synced with your trip",
    },
    useCases: {
      title: "When Explorer earns its keep",
      subtitle: "Built for the trips where 'just look it up' doesn't scale.",
      items: [
        {
          emoji: "🏙️",
          title: "City breaks (3–5 days)",
          description: "Long weekends in Lisbon, Berlin, NYC. You don't have time to research — you have time to do. Explorer narrows 500 ideas into 20 in fifteen minutes.",
        },
        {
          emoji: "👥",
          title: "Group trips (4–15 people)",
          description: "Bachelorette weekends, friend reunions, family trips. Everyone adds their picks from their phone, the consensus floats up. Bypass the group-chat democracy.",
        },
        {
          emoji: "🛣️",
          title: "Multi-city & road trips",
          description: "5 cities in 10 days = 5 explores. Save places per city, hit them when you arrive. Your itinerary builds itself around what the group actually wants.",
        },
      ],
    },
    categoriesTitle: "Explore by category",
  },
  fr: {
    hero: {
      title: "Parcourir, ajouter, cartographier.",
      titleHighlight: "Ensemble.",
      subtitle:
        "Un seul écran avec hôtels, restos, activités et transports — sélectionnés pour votre destination. Tapez + pour ajouter au voyage, ça apparaît sur la carte partagée.",
      cta: "Essayer Explorer",
      ctaSubtext: "Gratuit · sans carte bancaire · 30 secondes pour commencer",
    },
    intro: {
      title: "Le pipeline « recherche → voyage » est cassé.",
      paragraphs: [
        "Planifier un voyage de groupe devrait être une conversation, pas un tableur. Mais voilà : 47 onglets ouverts, trois conversations WhatsApp avec des listes différentes, un Notion que personne ne met à jour, et à 23h la veille on débat encore si le bar sur le toit vaut la traversée. La question « on fait quoi ? » — censée être la partie fun — devient celle qui casse les groupes.",
        "Le problème n'est pas le manque d'infos. C'est l'inverse. Chaque ville a 10 000 choses à faire, et Internet vous promet qu'elles sont toutes incontournables. Faire le tri entre le signal et le bruit — et faire en sorte que 4 à 15 personnes tombent d'accord — c'est là que la plupart des voyages s'effondrent.",
        "Explorer a été pensé pour ce moment précis. Un seul écran. Quatre onglets : hôtels, restos, activités, transports. Une grille de cartes triées pour votre destination. Vous tapez + pour ajouter au voyage, ça apparaît sur la carte partagée. Votre groupe fait pareil, le consensus remonte. Vingt minutes, une shortlist cartographiée.",
      ],
    },
    painPoints: {
      title: "Pourquoi la découverte est cassée",
      subtitle: "La plupart des groupes passent plus de temps à se battre pour planifier qu'à profiter du voyage.",
      items: [
        {
          emoji: "🗂️",
          title: "Le cimetière d'onglets",
          description: "35+ onglets ouverts, chacun promettant la meilleure liste des « top choses à faire à [ville] ». Vous les fermerez ce soir, les rouvrirez demain. Rien n'est décidé.",
        },
        {
          emoji: "💬",
          title: "La liste WhatsApp que personne ne met à jour",
          description: "Sarah a balancé 6 spots, Marc 3 de plus, Alex a tout liké, la future mariée n'a rien vu. Vous en reparlerez au brunch. Peut-être.",
        },
        {
          emoji: "🤔",
          title: "C'est vraiment bien ou juste touristique ?",
          description: "Tripadvisor regorge d'avis payés, les threads Reddit ont 4 ans, Instagram est full #ad. Vous atterrissez dans le même resto surchargé que tous les autres.",
        },
        {
          emoji: "🕳️",
          title: "Le trou noir des « j'ai sauvegardé quelque part »",
          description: "14 étoiles Maps, 28 saves Instagram, 6 favoris TikTok, un screenshot dans la pellicule. Vous ne retrouverez rien le jour où vous y serez vraiment.",
        },
      ],
    },
    howItWorks: {
      title: "Comment Explorer le règle",
      subtitle: "Un seul écran, quatre onglets, une vraie shortlist partagée à la fin.",
      items: [
        {
          emoji: "🎯",
          title: "Quatre onglets, pas un déluge",
          description: "Basculez entre hôtels, restos, activités et transports en un clic. Les cartes s'adaptent à l'onglet — l'hébergement affiche le prix par nuit, le transport l'itinéraire et la durée. Fini de comparer des choux et des billets d'avion.",
        },
        {
          emoji: "➕",
          title: "Ajout en un tap",
          description: "Chaque carte a un bouton +. Tapez, le lieu est verrouillé dans le voyage — coche verte, sans double-confirmation. Vos sélections se synchronisent au groupe en temps réel.",
        },
        {
          emoji: "🗺️",
          title: "Carte côte à côte",
          description: "Cartes à gauche, carte interactive à droite (ou en dessous sur mobile). Survolez une carte, l'épingle s'allume sur la map. Choisissez par proximité, pas par ordre d'onglet.",
        },
        {
          emoji: "🤝",
          title: "Le consensus du groupe remonte",
          description: "Tout le monde voit le même Explorer. Quand plusieurs membres ajoutent le même lieu, il reçoit un marqueur « favori du groupe ». Les lieux que tout le monde voulait secrètement remontent — sans débat.",
        },
      ],
    },
    animationShowcase: {
      title: "Vu de l'intérieur",
      subtitle: "L'interface réelle d'Explorer — mêmes onglets, mêmes cartes, même bouton +. Changez de type, la grille se met à jour.",
      caption: "Démo auto · c'est exactement ce que vous utiliserez",
    },
    mapPreview: {
      title: "Tout ce que vous avez ajouté, cartographié",
      subtitle: "Chaque tap sur + dépose une épingle sur la carte partagée. Ouvrez-la le jour J, choisissez ce qui est le plus proche, marchez-y.",
      caption: "Carte interactive · synchro avec votre voyage",
    },
    useCases: {
      title: "Quand Explorer change la donne",
      subtitle: "Pensé pour les voyages où « cherche sur Google » ne tient pas la charge.",
      items: [
        {
          emoji: "🏙️",
          title: "Citytrips (3–5 jours)",
          description: "Longs week-ends à Lisbonne, Berlin, NYC. Pas le temps de chercher, juste le temps de vivre. Explorer réduit 500 idées à 20 en quinze minutes.",
        },
        {
          emoji: "👥",
          title: "Voyages de groupe (4–15 personnes)",
          description: "EVJF, retrouvailles entre amis, voyages en famille. Chacun ajoute ses choix depuis son téléphone, le consensus remonte. Court-circuit de la démocratie WhatsApp.",
        },
        {
          emoji: "🛣️",
          title: "Multi-villes & road trips",
          description: "5 villes en 10 jours = 5 explores. Sauvez les lieux par ville, attrapez-les en arrivant. L'itinéraire se construit autour de ce que le groupe veut vraiment.",
        },
      ],
    },
    categoriesTitle: "Explorez par catégorie",
  },
};

export default function ExploreFeature({ data }: { data: FeaturePageData }) {
  const locale = useLocale();
  const lang = locale === "fr" ? "fr" : "en";
  const copy = localCopy[lang];

  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle}
        featureDescription={data.seoDescription}
        locale={locale}
        slug={data.slug}
        faqItems={data.faqItems}
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
                  {data.heroBadge}
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
                {data.stats && data.stats.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0"
                  >
                    {data.stats.slice(0, 3).map((stat, i) => (
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
                  { x: "20%", y: "30%", label: lang === "fr" ? "Hôtel" : "Hotel", color: "#001E13" },
                  { x: "55%", y: "40%", label: lang === "fr" ? "Resto" : "Restaurant", color: "#F6391A" },
                  { x: "38%", y: "62%", label: lang === "fr" ? "Activité" : "Activity", color: "#EEF899" },
                  { x: "72%", y: "28%", label: lang === "fr" ? "Resto" : "Restaurant", color: "#F6391A" },
                  { x: "80%", y: "60%", label: lang === "fr" ? "Activité" : "Activity", color: "#EEF899" },
                  { x: "30%", y: "75%", label: lang === "fr" ? "Hôtel" : "Hotel", color: "#001E13" },
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
                {data.features.map((feature, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-5 py-3 bg-white border border-[#001E13]/10 hover:border-[#F6391A]/30 rounded-full flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="text-xl">{feature.icon}</span>
                    <span className="font-karla text-[#001E13]">{feature.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </section>
        </FadeIn>

        {/* FAQ */}
        <FeatureFAQ items={data.faqItems} accentColor={data.accentColor} />

        {/* Final CTA */}
        <section className="py-16 lg:py-24 px-4 lg:px-8 bg-[#FFFBF5]">
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#F6391A] rounded-3xl lg:rounded-[40px] p-8 lg:p-12 xl:p-16 text-center">
              <span className="text-5xl lg:text-6xl mb-4 lg:mb-6 block">{data.icon}</span>
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#FFFBF5] leading-tight mb-4">
                {data.ctaTitle}
              </h2>
              <p className="text-base lg:text-lg font-karla text-[#FFFBF5]/90 max-w-2xl mx-auto mb-8 leading-relaxed">
                {data.ctaSubtitle}
              </p>
              <div className="flex justify-center">
                <Link
                  href={`https://app.weplanify.com/${locale}/register?utm_source=landing&utm_medium=feature&utm_campaign=explorer`}
                  className="inline-block"
                >
                  <PulsatingButton className="font-karla font-bold text-lg px-8 py-3">
                    {data.ctaButton}
                  </PulsatingButton>
                </Link>
              </div>
              <p className="text-sm text-[#FFFBF5]/70 mt-4 font-karla">
                {lang === "fr"
                  ? "Gratuit · sans carte bancaire · 30 secondes pour commencer"
                  : "Free · no credit card · 30 seconds to start"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
