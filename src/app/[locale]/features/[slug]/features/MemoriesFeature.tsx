'use client';

import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { PulsatingButton } from "@/components/magicui/pulsating-button";
import FeatureFAQ from "@/components/FeatureFAQ";
import FeatureJsonLd from "@/components/FeatureJsonLd";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

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

// Translations (Memories page has special translations not in Sanity)
const translations = {
  fr: {
    badge: "Souvenirs",
    heroTitle1: "Vos voyages méritent",
    heroTitle2: "d'être immortalisés",
    heroDescription: "Album photo collaboratif et génération automatique de votre Travel Book personnalisé.",
    ctaButton: "Créer mon album gratuit",
    stats: {
      km: "km parcourus",
      photos: "photos",
      countries: "pays visités",
      days: "jours",
      contributors: "contributeurs"
    },
    travelBook: {
      badge: "Généré par IA",
      title: "Votre Travel Book personnel",
      subtitle: "L'IA compile vos meilleurs moments dans un magnifique livre de voyage",
      coverTitle: "Notre voyage au Japon",
      coverSubtitle: "Mars 2024",
      introText: "12 jours inoubliables à travers le pays du soleil levant...",
      introStats: "4 villes • 156 photos • 2847 km",
      day1: "Jour 1",
      day1Title: "Premier contact",
      day1Text: "Le choc culturel dès la sortie de l'aéroport. Les néons de Shinjuku, la foule ordonnée, et ce premier ramen à 2h du matin...",
      day2: "Jour 2",
      day2Title: "Temples et traditions",
      day2Text: "Réveil aux aurores pour le temple Senso-ji. L'encens, les prières du matin, puis direction Harajuku pour le contraste ultime...",
      day3: "Jour 3",
      day3Title: "Kyoto la majestueuse",
      day3Text: "Le Shinkansen file à 300km/h. Arrivée à Kyoto sous la pluie fine. Les bambous d'Arashiyama dans la brume, un moment suspendu...",
      caption1: "Arrivée à Tokyo",
      caption2: "Temple Senso-ji",
      caption5: "Bambous d'Arashiyama",
    },
    features: {
      title: "Bien plus qu'un album photo",
      subtitle: "Toute l'histoire de votre voyage, automatiquement organisée",
      items: [
        { title: "Album collaboratif", description: "Tout le groupe contribue, l'album se construit ensemble en temps réel" },
        { title: "Carte interactive", description: "Visualisez votre parcours avec les photos géolocalisées" },
        { title: "Travel Book IA", description: "Génération automatique d'un récap stylé de votre aventure" },
        { title: "Partage facile", description: "Privé, groupe ou public - vous choisissez qui voit vos souvenirs" }
      ]
    },
    cta: {
      title: "Prêt à immortaliser vos aventures ?",
      subtitle: "Rejoignez des milliers de voyageurs qui préservent leurs souvenirs avec WePlanify."
    },
    faq: [
      { question: "Comment ajouter des photos à mon voyage ?", answer: "Pendant ou après votre voyage, ajoutez simplement vos photos et vidéos à chaque jour ou lieu de votre itinéraire. L'app organise automatiquement vos médias par date et localisation GPS." },
      { question: "Puis-je créer un album partagé avec mon groupe ?", answer: "Oui ! Tous les participants du voyage peuvent contribuer leurs photos. L'album collaboratif se construit automatiquement et chacun peut voir les souvenirs des autres en temps réel." },
      { question: "Comment fonctionne le récapitulatif automatique ?", answer: "À la fin de votre voyage, l'IA génère un 'Travel Book' avec vos meilleures photos, une carte de votre parcours, des statistiques (km parcourus, pays visités) et les moments forts." },
      { question: "Puis-je partager mes souvenirs publiquement ?", answer: "Vous choisissez : gardez vos souvenirs privés, partagez-les uniquement avec votre groupe, ou publiez-les sur votre profil public pour inspirer d'autres voyageurs." },
      { question: "Les photos sont-elles stockées en haute qualité ?", answer: "Oui, nous conservons vos photos en qualité originale. Vous pouvez les télécharger à tout moment ou les exporter vers Google Photos, iCloud ou Dropbox." }
    ]
  },
  en: {
    badge: "Memories",
    heroTitle1: "Your travels deserve",
    heroTitle2: "to be immortalized",
    heroDescription: "Collaborative photo album and automatic generation of your personalized Travel Book.",
    ctaButton: "Create my free album",
    stats: {
      km: "km traveled",
      photos: "photos",
      countries: "countries visited",
      days: "days",
      contributors: "contributors"
    },
    travelBook: {
      badge: "AI Generated",
      title: "Your personal Travel Book",
      subtitle: "AI compiles your best moments into a beautiful travel book",
      coverTitle: "Our trip to Japan",
      coverSubtitle: "March 2024",
      introText: "12 unforgettable days through the land of the rising sun...",
      introStats: "4 cities • 156 photos • 2847 km",
      day1: "Day 1",
      day1Title: "First contact",
      day1Text: "Culture shock right from the airport exit. The neons of Shinjuku, the orderly crowd, and that first ramen at 2am...",
      day2: "Day 2",
      day2Title: "Temples and traditions",
      day2Text: "Early wake up for Senso-ji temple. The incense, the morning prayers, then off to Harajuku for the ultimate contrast...",
      day3: "Day 3",
      day3Title: "Majestic Kyoto",
      day3Text: "The Shinkansen speeds at 300km/h. Arrival in Kyoto under light rain. The bamboos of Arashiyama in the mist, a suspended moment...",
      caption1: "Arrival in Tokyo",
      caption2: "Senso-ji Temple",
      caption5: "Arashiyama bamboos",
    },
    features: {
      title: "More than a photo album",
      subtitle: "Your entire travel story, automatically organized",
      items: [
        { title: "Collaborative album", description: "The whole group contributes, the album builds together in real-time" },
        { title: "Interactive map", description: "Visualize your journey with geolocated photos" },
        { title: "AI Travel Book", description: "Automatic generation of a stylish recap of your adventure" },
        { title: "Easy sharing", description: "Private, group or public - you choose who sees your memories" }
      ]
    },
    cta: {
      title: "Ready to immortalize your adventures?",
      subtitle: "Join thousands of travelers who preserve their memories with WePlanify."
    },
    faq: [
      { question: "How do I add photos to my trip?", answer: "During or after your trip, simply add your photos and videos to each day or place in your itinerary. The app automatically organizes your media by date and GPS location." },
      { question: "Can I create a shared album with my group?", answer: "Yes! All trip participants can contribute their photos. The collaborative album builds automatically and everyone can see each other's memories in real-time." },
      { question: "How does the automatic recap work?", answer: "At the end of your trip, AI generates a 'Travel Book' with your best photos, a map of your journey, statistics (km traveled, countries visited) and highlights." },
      { question: "Can I share my memories publicly?", answer: "You choose: keep your memories private, share them only with your group, or publish them on your public profile to inspire other travelers." },
      { question: "Are photos stored in high quality?", answer: "Yes, we keep your photos in original quality. You can download them at any time or export them to Google Photos, iCloud or Dropbox." }
    ]
  }
};

const samplePhotos = [
  { id: 1, src: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&h=800&fit=crop", location: "Kyoto, Japon", date: "14 Mars", rotation: -6 },
  { id: 2, src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop", location: "Alpes Suisses", date: "18 Mars", rotation: 4 },
  { id: 3, src: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=800&fit=crop", location: "Santorin, Grèce", date: "22 Mars", rotation: -3 },
  { id: 4, src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=800&fit=crop", location: "Lac de Côme", date: "25 Mars", rotation: 7 },
  { id: 5, src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=800&fit=crop", location: "Paris, France", date: "10 Mars", rotation: -5 },
];

function Polaroid({
  photo,
  index,
  isActive,
  onClick
}: {
  photo: typeof samplePhotos[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0.8, rotate: photo.rotation, x: (index - 2) * 60 }}
      animate={{
        opacity: isActive ? 1 : 0.7,
        scale: isActive ? 1 : 0.85,
        rotate: isActive ? 0 : photo.rotation,
        x: isActive ? 0 : (index - 2) * 80,
        y: isActive ? -10 : (index % 2) * 20,
        zIndex: isActive ? 50 : 10 - Math.abs(index - 2),
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: isActive ? 1.05 : 0.9 }}
    >
      <div
        className="bg-white p-3 pb-14 rounded-sm shadow-2xl"
        style={{ boxShadow: isActive ? "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 40px rgba(246,57,26,0.2)" : "0 10px 30px -5px rgba(0,0,0,0.3)" }}
      >
        <div className="relative w-44 h-56 lg:w-52 lg:h-64 overflow-hidden">
          <img src={photo.src} alt={photo.location} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 mix-blend-overlay" />
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="font-nanum-pen text-lg text-gray-700">{photo.location}</p>
          <p className="font-nanum-pen text-sm text-gray-400">{photo.date}</p>
        </div>
      </div>
      {isActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/80 rotate-[-2deg] shadow-sm"
          style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)" }}
        />
      )}
    </motion.div>
  );
}

function TypewriterText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsTyping(false);
    const startTimeout = setTimeout(() => {
      setIsTyping(true);
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
}

function TravelBook({ t }: { t: typeof translations.fr }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    { left: { type: 'cover', title: t.travelBook.coverTitle, subtitle: t.travelBook.coverSubtitle, emoji: '🌸' }, right: { type: 'intro', text: t.travelBook.introText, stats: t.travelBook.introStats } },
    { left: { type: 'photo', src: samplePhotos[0].src, caption: t.travelBook.caption1 }, right: { type: 'text', day: t.travelBook.day1, title: t.travelBook.day1Title, text: t.travelBook.day1Text } },
    { left: { type: 'photo', src: samplePhotos[1].src, caption: t.travelBook.caption2 }, right: { type: 'text', day: t.travelBook.day2, title: t.travelBook.day2Title, text: t.travelBook.day2Text } },
    { left: { type: 'text', day: t.travelBook.day3, title: t.travelBook.day3Title, text: t.travelBook.day3Text }, right: { type: 'photo', src: samplePhotos[2].src, caption: t.travelBook.caption5 } },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % pages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [pages.length]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '16/10', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.5)' }}>
        <div className="absolute left-1/2 top-0 bottom-0 w-4 -translate-x-1/2 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 z-10 shadow-inner" />
        <AnimatePresence mode="wait">
          <motion.div key={currentPage} className="absolute inset-0 flex" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="w-1/2 p-6 lg:p-8 flex flex-col justify-center items-center border-r border-amber-200/50">
              {pages[currentPage].left.type === 'cover' && (
                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                  <motion.span className="text-6xl mb-4 block" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring", stiffness: 200 }}>{pages[currentPage].left.emoji}</motion.span>
                  <h3 className="font-londrina-solid text-2xl lg:text-3xl text-gray-800"><TypewriterText text={pages[currentPage].left.title || ""} delay={400} /></h3>
                  <motion.p className="font-nanum-pen text-xl text-gray-500 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>{pages[currentPage].left.subtitle}</motion.p>
                </motion.div>
              )}
              {pages[currentPage].left.type === 'photo' && (
                <motion.div className="w-full h-full p-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.4 }}>
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                    <img src={pages[currentPage].left.src} alt="" className="w-full h-full object-cover" />
                    <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
                      <p className="font-nanum-pen text-white text-lg">{pages[currentPage].left.caption}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              {pages[currentPage].left.type === 'text' && (
                <div className="text-left w-full">
                  <motion.span className="text-sm font-karla text-[#F6391A] uppercase tracking-wider block" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>{pages[currentPage].left.day}</motion.span>
                  <motion.h4 className="font-londrina-solid text-xl lg:text-2xl text-gray-800 mt-1 mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>{pages[currentPage].left.title}</motion.h4>
                  <p className="font-karla text-gray-600 text-sm lg:text-base leading-relaxed"><TypewriterText text={pages[currentPage].left.text || ""} delay={800} /></p>
                </div>
              )}
            </div>
            <div className="w-1/2 p-6 lg:p-8 flex flex-col justify-center">
              {pages[currentPage].right.type === 'intro' && (
                <motion.div className="text-center lg:text-left" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                  <p className="font-karla text-gray-600 text-lg italic mb-6"><TypewriterText text={pages[currentPage].right.text || ""} delay={600} /></p>
                  <motion.p className="font-karla text-sm text-[#F6391A]" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}>{pages[currentPage].right.stats}</motion.p>
                </motion.div>
              )}
              {pages[currentPage].right.type === 'text' && (
                <div>
                  <motion.span className="text-sm font-karla text-[#F6391A] uppercase tracking-wider block" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>{pages[currentPage].right.day}</motion.span>
                  <motion.h4 className="font-londrina-solid text-xl lg:text-2xl text-gray-800 mt-1 mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>{pages[currentPage].right.title}</motion.h4>
                  <p className="font-karla text-gray-600 text-sm lg:text-base leading-relaxed"><TypewriterText text={pages[currentPage].right.text || ""} delay={800} /></p>
                </div>
              )}
              {pages[currentPage].right.type === 'photo' && (
                <motion.div className="w-full h-full p-2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
                  <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
                    <img src={pages[currentPage].right.src} alt="" className="w-full h-full object-cover" />
                    <motion.div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.3 }}>
                      <p className="font-nanum-pen text-white text-lg">{pages[currentPage].right.caption}</p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function MemoriesFeature({ data }: { data: FeaturePageData }) {
  const [activePhoto, setActivePhoto] = useState(2);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] === 'en' ? 'en' : 'fr';
  const t = translations[locale];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((prev) => (prev + 1) % samplePhotos.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FeatureJsonLd
        featureName={data.seoTitle || (locale === 'en' ? "Memories - Travel Photo Album" : "Souvenirs - Album Photo de Voyage")}
        featureDescription={data.seoDescription || t.heroDescription}
        featureUrl="https://weplanify.com/features/memories"
        faqItems={t.faq}
      />

      <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#16213e] to-[#0f0f1a]">
        {/* Hero Section */}
        <section className="relative px-4 lg:px-8 pt-[128px] lg:pt-[160px] pb-20 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F6391A]/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#61DBD5]/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-full text-sm font-karla mb-6">
                <span className="text-lg">📸</span>
                {t.badge}
              </span>

              <h1 className="text-4xl lg:text-7xl font-londrina-solid text-white mb-6 leading-tight">
                {t.heroTitle1}
                <br />
                <span className="text-[#F6391A]">{t.heroTitle2}</span>
              </h1>

              <p className="text-lg lg:text-xl text-white/60 font-karla max-w-2xl mx-auto mb-10">
                {t.heroDescription}
              </p>

              <Link href="/signup" className="inline-block">
                <PulsatingButton className="font-karla font-bold text-lg px-8 py-4">
                  {t.ctaButton}
                </PulsatingButton>
              </Link>
            </motion.div>

            {/* Polaroid Stack */}
            <div className="relative h-[350px] lg:h-[420px] flex items-center justify-center mb-8">
              {samplePhotos.map((photo, index) => (
                <Polaroid key={photo.id} photo={photo} index={index} isActive={index === activePhoto} onClick={() => setActivePhoto(index)} />
              ))}
            </div>

            {/* Photo selector dots */}
            <div className="flex justify-center gap-3 mb-16">
              {samplePhotos.map((photo, index) => (
                <button key={index} onClick={() => setActivePhoto(index)} className="group relative">
                  <div className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${index === activePhoto ? 'border-[#F6391A] scale-110' : 'border-white/20 opacity-50 hover:opacity-80'}`}>
                    <img src={photo.src} alt="" className="w-full h-full object-cover" />
                  </div>
                </button>
              ))}
            </div>

            {/* Stats bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center justify-center gap-6 lg:gap-12 p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              {[
                { value: "2,847", label: t.stats.km, icon: "🚀" },
                { value: "156", label: t.stats.photos, icon: "📷" },
                { value: "4", label: t.stats.countries, icon: "🌍" },
                { value: "12", label: t.stats.days, icon: "📅" },
                { value: "8", label: t.stats.contributors, icon: "👥" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <span className="text-2xl font-londrina-solid text-white">{stat.value}</span>
                    <span className="text-sm text-white/50 font-karla ml-2">{stat.label}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Travel Book Section */}
        <section className="px-4 lg:px-8 py-16 lg:py-24 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <span className="inline-block px-4 py-1 bg-[#F6391A]/20 text-[#F6391A] rounded-full text-sm font-karla mb-4">✨ {t.travelBook.badge}</span>
              <h2 className="text-3xl lg:text-5xl font-londrina-solid text-white mb-4">{t.travelBook.title}</h2>
              <p className="text-white/60 font-karla max-w-xl mx-auto">{t.travelBook.subtitle}</p>
            </motion.div>
            <TravelBook t={t} />
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 lg:px-8 py-16 lg:py-24">
          <div className="max-w-6xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl lg:text-5xl font-londrina-solid text-white text-center mb-4">{t.features.title}</motion.h2>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-white/60 font-karla mb-12 max-w-2xl mx-auto">{t.features.subtitle}</motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: "📸", color: "from-pink-500/20 to-rose-500/20" },
                { icon: "🗺️", color: "from-blue-500/20 to-cyan-500/20" },
                { icon: "📖", color: "from-amber-500/20 to-orange-500/20" },
                { icon: "🔗", color: "from-emerald-500/20 to-teal-500/20" },
              ].map((feature, i) => (
                <div key={i} className={`relative overflow-hidden rounded-2xl p-6 border border-white/10 bg-gradient-to-br ${feature.color} backdrop-blur-sm`}>
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-londrina-solid text-white mb-2">{t.features.items[i].title}</h3>
                  <p className="text-white/60 font-karla text-sm">{t.features.items[i].description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <div className="bg-[#FFFBF5]">
          <FeatureFAQ items={t.faq} accentColor="#F6391A" />
        </div>

        {/* CTA Section */}
        <section className="px-4 lg:px-8 py-12 lg:py-16 bg-[#FFFBF5]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-6xl mb-6 block">📸</span>
            <h2 className="text-3xl lg:text-5xl font-londrina-solid text-[#001E13] mb-4">{t.cta.title}</h2>
            <p className="text-[#001E13]/70 font-karla mb-8 max-w-lg mx-auto text-lg">{t.cta.subtitle}</p>
            <Link href="/signup">
              <PulsatingButton className="font-karla font-bold text-lg px-10 py-4">{t.ctaButton}</PulsatingButton>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
