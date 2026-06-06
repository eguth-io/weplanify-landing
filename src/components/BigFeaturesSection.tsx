"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  AiGlobeJourney,
  LiveCollaboration,
  LiveVoting,
} from "@/components/animations";
import { useRegisterHref } from "@/lib/attribution/use-register-href";
import { setImmersiveMode } from "@/lib/hooks/use-immersive-mode";

type Lang = "en" | "fr";
type AnimationType = "ai-globe" | "live-collaboration" | "live-voting";

interface SlideData {
  title: string;
  description: string;
  animation: AnimationType;
  ctaLabel: string;
  stats?: { value: string; label: string }[];
}

interface BigFeaturesContent {
  title: string;
  slides: SlideData[];
}

const CONTENT: Record<Lang, BigFeaturesContent> = {
  fr: {
    title: "Des fonctionnalités pensées pour voyager ensemble",
    slides: [
      {
        title: "Explore et propose des idées au groupe",
        description:
          "Trouve activités, restaurants, hébergement et transport directement dans l'app. Ajoute-les à l'itinéraire ou soumets-les au vote du groupe.",
        animation: "ai-globe",
        ctaLabel: "Explorer les destinations",
        stats: [{ value: "+190", label: "destinations possibles" }],
      },
      {
        title: "Décidez ensemble grâce aux sondages",
        description:
          "Où dormir ? Que faire ? Quand partir ? Créez un sondage, chacun vote, la décision est prise. Le groupe avance, le voyage aussi.",
        animation: "live-voting",
        ctaLabel: "Lancer un sondage",
        stats: [{ value: "1000+", label: "sondages quotidiens" }],
      },
      {
        title: "Un itinéraire clair, jour après jour",
        description:
          "Chaque journée du voyage est structurée : que faire, où manger, où dormir, comment se déplacer. Tout est clair pour tout le monde.",
        animation: "live-collaboration",
        ctaLabel: "Construire l'itinéraire",
        stats: [{ value: "10+", label: "partenaires" }],
      },
    ],
  },
  en: {
    title: "Everything You Need to Plan a Group Trip",
    slides: [
      {
        title: "Explore and propose ideas to the group",
        description:
          "Find activities, restaurants, accommodation and transport directly in the app. Add them to the itinerary or propose them to the group to vote.",
        animation: "ai-globe",
        ctaLabel: "Explore destinations",
        stats: [{ value: "190+", label: "Possible destinations" }],
      },
      {
        title: "Decide together with polls",
        description:
          "Where to stay? What to do? When to leave? Create a poll, everyone votes, the decision is made. The group moves forward, the trip too.",
        animation: "live-voting",
        ctaLabel: "Start a poll",
        stats: [{ value: "1000+", label: "Daily polls" }],
      },
      {
        title: "A clear itinerary, day by day",
        description:
          "Each day of the trip is structured: what to do, where to eat, where to sleep, how to get there. Everything is clear for everyone.",
        animation: "live-collaboration",
        ctaLabel: "Build my itinerary",
        stats: [{ value: "10+", label: "Partners" }],
      },
    ],
  },
};

const PADDING = 32;
const RADIUS = 24;

interface BigFeaturesSectionProps {
  locale?: string;
}

function SlideIndicatorDot({
  index,
  activeIndex,
  fillIndex,
  isLast,
}: {
  index: number;
  /** Eased slide index — drives which dot is "active" (stretched). */
  activeIndex: MotionValue<number>;
  /** Linear slide index — drives the smooth lime fill of the active dot. */
  fillIndex: MotionValue<number>;
  isLast: boolean;
}) {
  // The active dot stretches into a long pill that acts as a progress track; a
  // lime inner bar fills 0→100% as the user scrolls from this slide to the next,
  // so it reads like a self-advancing timer driven by scroll.
  const isActive = (v: number) => Math.abs(v - index) < 0.5;

  // Bigger active pill so the fill is clearly readable as a progress bar.
  const width = useTransform(activeIndex, (v) => (isActive(v) ? 44 : 8));
  // Fill = LINEAR progress from this slide toward the next (0 at slide start, 1
  // just before it flips to the next). Clamped to [0,1]; 0 when this dot isn't
  // active. The last slide has no "next", so show it filled once active.
  const fillWidth = useTransform(fillIndex, (v) => {
    if (!isActive(v)) return "0%";
    if (isLast) return "100%";
    const frac = Math.min(1, Math.max(0, v - index));
    return `${frac * 100}%`;
  });

  return (
    <motion.div
      // Track: semi-transparent WHITE via color alpha (not container opacity) so
      // the lime fill inside stays fully saturated and visible.
      className="relative h-2 overflow-hidden rounded-full bg-white/30"
      style={{ width }}
    >
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full bg-[#EEF899] shadow-[0_0_8px_rgba(238,248,153,0.6)]"
        style={{ width: fillWidth }}
      />
    </motion.div>
  );
}

export default function BigFeaturesSection({
  locale = "en",
}: BigFeaturesSectionProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const { title, slides } = CONTENT[lang];
  const lastIndex = slides.length - 1;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // First slide shrinks from full-bleed into a rounded, padded card as we scroll.
  const slide1Padding = useTransform(scrollYProgress, [0.08, 0.2], [0, PADDING]);
  const slide1Radius = useTransform(scrollYProgress, [0.08, 0.2], [0, RADIUS]);

  // Map scroll progress to a (fractional) active slide index, eased per-step so
  // each slide settles before the next begins.
  const activeSlideFloat = useTransform(scrollYProgress, (v) => {
    if (v < 0.2) return 0;
    if (v > 0.8) return lastIndex;
    const raw = ((v - 0.2) / 0.6) * lastIndex;
    const slideIndex = Math.floor(raw);
    const fraction = raw - slideIndex;
    const eased =
      fraction < 0.5
        ? 4 * fraction * fraction * fraction
        : 1 - Math.pow(-2 * fraction + 2, 3) / 2;
    return slideIndex + eased;
  });

  // A LINEAR (un-eased) version of the slide index, used only to fill the active
  // indicator dot. The eased version above snaps quickly through the middle of
  // each step, which made the dot jump 0→100% almost instantly; a linear mapping
  // makes the lime fill grow smoothly and visibly as the user scrolls.
  const linearSlideFloat = useTransform(scrollYProgress, (v) => {
    if (v < 0.2) return 0;
    if (v > 0.8) return lastIndex;
    return ((v - 0.2) / 0.6) * lastIndex;
  });

  const indicatorY = useTransform(scrollYProgress, [0.06, 0.18], [100, 0]);
  const indicatorOpacity = useTransform(scrollYProgress, [0.06, 0.18], [0, 1]);

  // Track the rounded active slide index (for the prev/next arrows) without
  // re-rendering on every scroll frame.
  const activeRoundedRef = useRef(0);
  useEffect(() => {
    const unsubscribe = activeSlideFloat.on("change", (v) => {
      activeRoundedRef.current = Math.round(v);
    });
    return unsubscribe;
  }, [activeSlideFloat]);

  // Scroll the page to the position where a given slide is centered. The strip
  // maps scroll progress 0.2→0.8 onto slide 0→lastIndex, so slide `i` sits at
  // progress 0.2 + (i / lastIndex) * 0.6. Convert that back to an absolute
  // scroll offset within the (sticky) container's scrollable range.
  const scrollToSlide = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const target = Math.min(lastIndex, Math.max(0, i));
    const rect = el.getBoundingClientRect();
    const sectionTop = window.scrollY + rect.top;
    const scrollable = el.offsetHeight - window.innerHeight;
    const progress = lastIndex > 0 ? 0.2 + (target / lastIndex) * 0.6 : 0.5;
    window.scrollTo({ top: sectionTop + progress * scrollable, behavior: "smooth" });
  };

  // Horizontal swipe / drag (touch + mouse) to move one slide at a time. This
  // reuses scrollToSlide — the SAME mechanism as the arrows/dots — so the swipe
  // stays perfectly in sync with the scroll-driven logic instead of introducing
  // a parallel state. We only act on a clearly horizontal gesture so vertical
  // scrolling through the section keeps working untouched.
  const swipeStart = useRef<{ x: number; y: number; id: number } | null>(null);
  const SWIPE_THRESHOLD = 50; // px of horizontal travel to count as a swipe

  const onPointerDown = (e: React.PointerEvent) => {
    swipeStart.current = { x: e.clientX, y: e.clientY, id: e.pointerId };
  };
  const onPointerUp = (e: React.PointerEvent) => {
    const start = swipeStart.current;
    swipeStart.current = null;
    if (!start || start.id !== e.pointerId) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    // Must be mostly horizontal and past the threshold.
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) <= Math.abs(dy)) return;
    // Swipe left → next slide, swipe right → previous slide. One step at a time.
    const dir = dx < 0 ? 1 : -1;
    scrollToSlide(activeRoundedRef.current + dir);
  };

  // Trackpad horizontal gesture (two-finger swipe → wheel events with deltaX).
  // Same idea as the touch swipe: one horizontal flick = one slide, reusing
  // scrollToSlide so it stays in sync with the scroll logic. A trackpad emits a
  // burst of wheel events per gesture, so we lock until the gesture settles
  // (a short idle gap) before allowing the next step.
  const stickyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stickyRef.current;
    if (!el) return;
    let locked = false;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    const WHEEL_THRESHOLD = 30; // px of horizontal delta to trigger a step

    const onWheel = (e: WheelEvent) => {
      // Ignore vertical-dominant scrolling — that drives the slider itself.
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      // It's a horizontal gesture: stop the browser from doing back/forward nav.
      e.preventDefault();
      // Reset the "gesture finished" timer on every event of the burst.
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        locked = false;
      }, 200);
      if (locked || Math.abs(e.deltaX) < WHEEL_THRESHOLD) return;
      locked = true; // one step per gesture until the burst settles
      const dir = e.deltaX > 0 ? 1 : -1; // swipe-left content = positive deltaX
      scrollToSlide(activeRoundedRef.current + dir);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (idleTimer) clearTimeout(idleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Toggle the shared "immersive" flag exactly while the sticky panel fills the
  // screen (section top above the viewport AND its bottom below it). This makes
  // the nav retract and the floating CTA hide precisely during the slider, and
  // restores them the instant the user scrolls out either edge — no late catch-up.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const stuck = rect.top <= 0 && rect.bottom >= vh;
      setImmersiveMode(stuck);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
      setImmersiveMode(false);
    };
  }, []);

  return (
    <div className="bg-[#FFFBF5]">
      <div className="max-w-[1536px] mx-auto px-4 lg:px-8 pt-16 lg:pt-24 pb-6 lg:pb-10">
        <h2 className="text-[#001E13] text-4xl lg:text-5xl xl:text-6xl font-londrina-solid text-center">
          {title}
        </h2>
      </div>

      {/* Scroll track: tall section that drives the shrink + horizontal slide.
          ~133vh per slide gives each one enough scroll distance to read. */}
      <section
        ref={containerRef}
        className="relative"
        style={{ height: `${slides.length * 133 + 50}vh` }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-screen w-full select-none overflow-hidden [touch-action:pan-y]"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
        >
          <div className="absolute inset-0">
            <motion.div
              className="h-full w-full"
              style={{ padding: slide1Padding }}
            >
              <motion.div
                className="relative h-full w-full overflow-hidden"
                style={{ borderRadius: slide1Radius }}
              >
                <SlideStrip
                  slides={slides}
                  activeSlideFloat={activeSlideFloat}
                  locale={locale}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Wrapper handles horizontal centering (flex) so the motion `y` on the
              inner element doesn't fight the Tailwind -translate-x transform. */}
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center lg:bottom-16"
            style={{ opacity: indicatorOpacity }}
          >
            <motion.div
              className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-3 py-2 shadow-2xl backdrop-blur-2xl"
              style={{ y: indicatorY }}
            >
              <button
                type="button"
                aria-label="Previous slide"
                onClick={() => activeRoundedRef.current > 0 && scrollToSlide(activeRoundedRef.current - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => scrollToSlide(i)}
                    className="flex items-center py-1"
                  >
                    <SlideIndicatorDot
                      index={i}
                      activeIndex={activeSlideFloat}
                      fillIndex={linearSlideFloat}
                      isLast={i === lastIndex}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                aria-label="Next slide"
                onClick={() => activeRoundedRef.current < lastIndex && scrollToSlide(activeRoundedRef.current + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-white/60 transition-colors hover:bg-white/15 hover:text-white"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function SlideStrip({
  slides,
  activeSlideFloat,
  locale,
}: {
  slides: SlideData[];
  activeSlideFloat: MotionValue<number>;
  locale: string;
}) {
  const GAP = 32;
  const translateX = useTransform(
    activeSlideFloat,
    (v) => `calc(${-v * 100}% - ${v * GAP}px)`
  );

  return (
    <motion.div
      className="absolute inset-0 flex"
      style={{ x: translateX, gap: GAP }}
    >
      {slides.map((slide, i) => (
        <Slide
          key={i}
          slide={slide}
          index={i}
          activeSlideFloat={activeSlideFloat}
          locale={locale}
        />
      ))}
    </motion.div>
  );
}

function Slide({
  slide,
  index,
  activeSlideFloat,
  locale,
}: {
  slide: SlideData;
  index: number;
  activeSlideFloat: MotionValue<number>;
  locale: string;
}) {
  const registerUrl = useRegisterHref({ locale, medium: "big-features" });
  const slideRef = useRef<HTMLDivElement>(null);
  // useInView as a cheap "section is on screen at all" gate to autoplay anims.
  const sectionInView = useInView(slideRef, { once: false, amount: 0.1 });

  // The first slide starts full-bleed (square) — its rounding is animated by the
  // parent container as it shrinks. But once the strip begins sliding toward the
  // next slide, slide 0 must round its own corners too, otherwise its trailing
  // (right) edge shows square corners as it scrolls out. Animate its radius in
  // as soon as the slider leaves the first slide. Other slides are always round.
  const firstSlideRadius = useTransform(activeSlideFloat, [0, 0.15], [0, 24]);
  const borderRadius = index === 0 ? firstSlideRadius : 24;

  const AnimationComponent = () => {
    switch (slide.animation) {
      case "ai-globe":
        return <AiGlobeJourney autoPlay={sectionInView} locale={locale} />;
      case "live-collaboration":
        return <LiveCollaboration autoPlay={sectionInView} locale={locale} />;
      case "live-voting":
        return <LiveVoting autoPlay={sectionInView} locale={locale} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      ref={slideRef}
      className="relative h-full flex-shrink-0 overflow-hidden"
      style={{ width: "100%", borderRadius }}
    >
      {/* Animation as full-bleed background */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#FFFBF5]">
        <div className="h-full w-full">
          <AnimationComponent />
        </div>
      </div>

      {/* Dark veil for text legibility — stronger in the center where the copy
          sits, lighter at the edges so the animation stays visible. */}
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)",
        }}
      />

      {/* Centered overlay content */}
      <SlideOverlay
        slide={slide}
        index={index}
        activeSlideFloat={activeSlideFloat}
        registerUrl={registerUrl}
      />
    </motion.div>
  );
}

function SlideOverlay({
  slide,
  index,
  activeSlideFloat,
  registerUrl,
}: {
  slide: SlideData;
  index: number;
  activeSlideFloat: MotionValue<number>;
  registerUrl: string;
}) {
  // Fade/lift the text in as its slide becomes active.
  const opacity = useTransform(activeSlideFloat, (v) =>
    Math.abs(v - index) < 0.5 ? 1 : 0
  );
  const y = useTransform(activeSlideFloat, (v) =>
    Math.abs(v - index) < 0.5 ? 0 : 24
  );

  return (
    <motion.div
      className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]"
      style={{ opacity, y }}
    >
      <h3 className="font-londrina-solid text-4xl leading-tight text-white md:text-6xl lg:text-7xl max-w-4xl">
        {slide.title}
      </h3>
      <p className="mt-4 max-w-xl font-karla text-base text-white/90 md:text-lg lg:text-xl">
        {slide.description}
      </p>

      {slide.stats && slide.stats.length > 0 && (
        <div className="mt-8 flex gap-10 lg:gap-14">
          {slide.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <p className="font-londrina-solid text-4xl text-white lg:text-5xl">
                {stat.value}
              </p>
              <p className="font-nanum-pen text-base text-white/70 lg:text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      )}

      <Link href={registerUrl} rel="nofollow" className="mt-8">
        <button className="rounded-full bg-orange px-8 py-3 font-karla text-sm font-bold text-white ring-4 ring-orange/30 transition-all hover:opacity-90 lg:text-base">
          {slide.ctaLabel}
        </button>
      </Link>
    </motion.div>
  );
}
