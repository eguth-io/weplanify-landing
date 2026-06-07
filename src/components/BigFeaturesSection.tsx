"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRegisterHref } from "@/lib/attribution/use-register-href";
import { setImmersiveMode } from "@/lib/hooks/use-immersive-mode";

interface SlideData {
  title: string;
  description: string;
  /** Full-bleed background image, generated per feature. */
  image: string;
  /** Video shown in the laptop mockup. */
  videoDesktop: string;
  /** Video shown in the phone mockup. */
  videoMobile: string;
  ctaLabel: string;
  /** Per-feature CTA colors. */
  cta: { bg: string; color: string; ring: string };
  stats?: { value: string; label: string }[];
}

/** Localized slide text pulled from the message file (`t.raw("slides")`). */
interface SlideText {
  title: string;
  description: string;
  ctaLabel: string;
  stats?: { value: string; label: string }[];
}

// Per-feature media. Videos currently reuse the explorer pair everywhere — they
// will be swapped per feature once the other clips are produced.
const VIDEO_DESKTOP = "/features-video/explorer-video.mp4";
const VIDEO_MOBILE = "/features-video/explorer-video-mobile.mp4";
const MEDIA = {
  explorer: {
    image: "/features-bg/explorer.webp",
    videoDesktop: VIDEO_DESKTOP,
    videoMobile: VIDEO_MOBILE,
    // ring = bg, more transparent
    cta: { bg: "#D42D10", color: "#FEF6EF", ring: "rgba(212,45,16,0.35)" },
  },
  voting: {
    image: "/features-bg/voting.webp",
    videoDesktop: "/features-video/polls-video.mp4",
    videoMobile: "/features-video/polls-mobile.mp4",
    cta: { bg: "#EDF89A", color: "#001E13", ring: "#233E26" },
  },
  itinerary: {
    image: "/features-bg/itinerary.webp",
    videoDesktop: "/features-video/day-by-day-video.mp4",
    videoMobile: "/features-video/day-by-day-mobile.mp4",
    // ring = bg, more transparent
    cta: { bg: "#61DBD5", color: "#001E13", ring: "rgba(97,219,213,0.35)" },
  },
};

// Per-feature media in slide order. The localized text (title, description,
// ctaLabel, stats) is merged in from the message file at render time.
const SLIDE_MEDIA = [MEDIA.explorer, MEDIA.voting, MEDIA.itinerary];

const PADDING = 32;
// Much smaller shrink padding on mobile so the slide doesn't lose too much of
// the (already narrow) screen as it tucks into the slider.
const PADDING_MOBILE = 10;
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
  const t = useTranslations("bigFeaturesSection");
  const title = t("title");
  const slidesText = t.raw("slides") as SlideText[];
  // Merge localized text with the (non-localized) per-feature media, in order.
  const slides: SlideData[] = slidesText.map((text, i) => ({
    ...text,
    ...SLIDE_MEDIA[i],
  }));
  const lastIndex = slides.length - 1;

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Detect mobile (below the lg breakpoint) to use a smaller shrink padding.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // First slide shrinks from full-bleed into a rounded, padded card as we scroll.
  const slide1Padding = useTransform(
    scrollYProgress,
    [0.08, 0.2],
    [0, isMobile ? PADDING_MOBILE : PADDING]
  );
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
  // Only play the device videos while this slide is on screen.
  const sectionInView = useInView(slideRef, { once: false, amount: 0.1 });

  // The first slide starts full-bleed (square) — its rounding is animated by the
  // parent container as it shrinks. But once the strip begins sliding toward the
  // next slide, slide 0 must round its own corners too, otherwise its trailing
  // (right) edge shows square corners as it scrolls out. Animate its radius in
  // as soon as the slider leaves the first slide. Other slides are always round.
  const firstSlideRadius = useTransform(activeSlideFloat, [0, 0.15], [0, 24]);
  const borderRadius = index === 0 ? firstSlideRadius : 24;

  return (
    <motion.div
      ref={slideRef}
      className="relative h-full flex-shrink-0 overflow-hidden"
      style={{ width: "100%", borderRadius }}
    >
      {/* Generated feature image as full-bleed background */}
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        sizes="100vw"
        className="object-cover"
        priority={index === 0}
      />

      {/* Dark veil for text legibility — stronger in the center where the copy
          sits, lighter at the edges so the image stays visible. */}
      <div className="absolute inset-0 bg-black/45" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 42%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* Centered overlay content + device mockups below the CTA */}
      <SlideOverlay
        slide={slide}
        index={index}
        activeSlideFloat={activeSlideFloat}
        registerUrl={registerUrl}
        playing={sectionInView}
      />
    </motion.div>
  );
}

function SlideOverlay({
  slide,
  index,
  activeSlideFloat,
  registerUrl,
  playing,
}: {
  slide: SlideData;
  index: number;
  activeSlideFloat: MotionValue<number>;
  registerUrl: string;
  playing: boolean;
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
      className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 py-12 text-center lg:gap-8"
      style={{ opacity, y }}
    >
      {/* Copy + CTA */}
      <div className="flex flex-col items-center [text-shadow:0_2px_16px_rgba(0,0,0,0.55)]">
        <h3 className="max-w-4xl font-londrina-solid text-3xl leading-tight text-white md:text-5xl lg:text-6xl">
          {slide.title}
        </h3>
        <p className="mt-3 max-w-xl font-karla text-sm text-white/90 md:text-base lg:text-lg">
          {slide.description}
        </p>

        <Link href={registerUrl} rel="nofollow" className="mt-6">
          <button
            className="rounded-full px-8 py-3 font-karla text-sm font-bold transition-all hover:opacity-90 lg:text-base"
            style={{
              backgroundColor: slide.cta.bg,
              color: slide.cta.color,
              boxShadow: `0 0 0 4px ${slide.cta.ring}`,
            }}
          >
            {slide.ctaLabel}
          </button>
        </Link>
      </div>

      {/* Device mockups (laptop + phone) showing the feature videos */}
      <DeviceShowcase
        videoDesktop={slide.videoDesktop}
        videoMobile={slide.videoMobile}
        playing={playing}
      />
    </motion.div>
  );
}

type DeviceKind = "laptop" | "phone";

/**
 * Reusable laptop + phone mockups side by side, each playing a (muted, looping)
 * feature video. Same chassis across all slides — only the video sources change.
 * Hovering a mockup blurs it slightly and reveals an "expand" affordance; click
 * opens that mockup full-screen in a clean animated overlay.
 */
function DeviceShowcase({
  videoDesktop,
  videoMobile,
  playing,
}: {
  videoDesktop: string;
  videoMobile: string;
  playing: boolean;
}) {
  const [expanded, setExpanded] = useState<DeviceKind | null>(null);

  return (
    <>
      <div className="flex items-end justify-center gap-4 lg:gap-8">
        <DeviceMockup
          kind="laptop"
          src={videoDesktop}
          playing={playing && expanded === null}
          onExpand={() => setExpanded("laptop")}
        />
        <DeviceMockup
          kind="phone"
          src={videoMobile}
          playing={playing && expanded === null}
          onExpand={() => setExpanded("phone")}
        />
      </div>

      <FullscreenMockup
        kind={expanded}
        src={expanded === "phone" ? videoMobile : videoDesktop}
        onClose={() => setExpanded(null)}
      />
    </>
  );
}

/** The laptop or phone chassis. `compact` is the in-slide thumbnail variant. */
function DeviceChassis({
  kind,
  children,
  className = "",
}: {
  kind: DeviceKind;
  children: React.ReactNode;
  className?: string;
}) {
  if (kind === "laptop") {
    return (
      <div className={className}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-xl border-[7px] border-b-0 border-neutral-800 bg-black shadow-2xl">
          {children}
        </div>
        {/* Base / hinge */}
        <div className="relative mx-auto h-3.5 w-[112%] -translate-x-[calc((112%-100%)/2)] rounded-b-xl rounded-t-sm bg-neutral-700 shadow-lg">
          <div className="absolute left-1/2 top-0 h-2 w-20 -translate-x-1/2 rounded-b-md bg-neutral-800" />
        </div>
      </div>
    );
  }
  return (
    <div className={className}>
      <div className="relative aspect-[9/19] overflow-hidden rounded-[1.8rem] border-[6px] border-neutral-800 bg-black shadow-2xl">
        <div className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-neutral-800" />
        {children}
      </div>
    </div>
  );
}

function DeviceMockup({
  kind,
  src,
  playing,
  onExpand,
}: {
  kind: DeviceKind;
  src: string;
  playing: boolean;
  onExpand: () => void;
}) {
  const widthCls =
    kind === "laptop"
      ? "w-[300px] sm:w-[440px] lg:w-[580px]"
      : "w-[104px] sm:w-[140px] lg:w-[184px]";

  return (
    <button
      type="button"
      onClick={onExpand}
      aria-label={kind === "laptop" ? "Expand laptop preview" : "Expand phone preview"}
      className={`group relative cursor-zoom-in ${widthCls}`}
    >
      <DeviceChassis kind={kind}>
        <FeatureVideo src={src} playing={playing} />
        {/* Hover affordance: subtle blur + zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 backdrop-blur-0 transition-all duration-300 group-hover:bg-black/10 group-hover:opacity-100 group-hover:backdrop-blur-[2px]">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#001E13] shadow-lg">
            <Maximize2 className="h-4 w-4" />
          </span>
        </div>
      </DeviceChassis>
    </button>
  );
}

/** Full-screen overlay showing the chosen mockup, enlarged, with sound + controls. */
function FullscreenMockup({
  kind,
  src,
  onClose,
}: {
  kind: DeviceKind | null;
  src: string;
  onClose: () => void;
}) {
  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!kind) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [kind, onClose]);

  // Render through a portal on <body> so the fixed overlay escapes the slider's
  // transformed / overflow-hidden ancestors (a `position: fixed` element is
  // positioned relative to a transformed ancestor, not the viewport, which would
  // otherwise trap the modal inside the slide).
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {kind && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Enlarged mockup */}
          <motion.div
            className="relative z-[1]"
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <DeviceChassis
              kind={kind}
              className={
                kind === "laptop"
                  ? "w-[min(92vw,1100px)]"
                  : "w-[min(80vw,360px)]"
              }
            >
              <FeatureVideo
                src={src}
                playing
                controls
                muted={false}
                key={src + kind}
              />
            </DeviceChassis>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function FeatureVideo({
  src,
  playing,
  controls = false,
  muted = true,
}: {
  src: string;
  playing: boolean;
  controls?: boolean;
  muted?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (playing) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [playing]);

  return (
    <video
      ref={ref}
      src={src}
      muted={muted}
      loop
      playsInline
      controls={controls}
      preload="metadata"
      className="h-full w-full object-cover"
    />
  );
}
