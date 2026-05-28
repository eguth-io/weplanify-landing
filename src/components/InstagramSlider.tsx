"use client";

import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { useRef } from "react";
import type { InstagramPost } from "@/lib/instagram";

type Lang = "en" | "fr";

const COPY: Record<Lang, { title: string; subtitle: string }> = {
  fr: {
    title: "Suis nos aventures",
    subtitle: "Inspiration voyage et coulisses, chaque semaine sur Instagram.",
  },
  en: {
    title: "Follow our adventures",
    subtitle: "Travel inspiration and behind-the-scenes, weekly on Instagram.",
  },
};

const PROFILE_URL = "https://www.instagram.com/weplanify/";

interface InstagramSliderProps {
  posts: InstagramPost[];
  locale?: string;
}

export default function InstagramSlider({ posts, locale = "en" }: InstagramSliderProps) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const copy = COPY[lang];
  const scrollerRef = useRef<HTMLDivElement>(null);

  if (!posts || posts.length === 0) {
    return null;
  }

  const scrollByCards = (direction: 1 | -1) => {
    scrollerRef.current?.scrollBy({ left: direction * 280, behavior: "smooth" });
  };

  return (
    <section className="px-4 lg:px-8 pt-8 lg:pt-12">
      <div className="max-w-[1536px] mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6 lg:mb-8">
          <div>
            <h2 className="text-[#001E13] text-3xl lg:text-5xl font-londrina-solid leading-tight">
              {copy.title}
            </h2>
            <p className="text-[#001E13] text-sm lg:text-base font-karla mt-2">{copy.subtitle}</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#001E13] text-white px-5 py-2 rounded-full font-karla font-bold text-sm lg:text-base hover:bg-[#001E13]/90 transition-colors"
            >
              <Instagram className="w-4 h-4" />
              @weplanify
            </a>
            <div className="hidden lg:flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByCards(-1)}
                aria-label="Previous posts"
                className="w-10 h-10 rounded-full border border-[#001E13]/15 flex items-center justify-center text-[#001E13] hover:bg-[#001E13] hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCards(1)}
                aria-label="Next posts"
                className="w-10 h-10 rounded-full border border-[#001E13]/15 flex items-center justify-center text-[#001E13] hover:bg-[#001E13] hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative shrink-0 snap-start w-[220px] lg:w-[260px] aspect-[9/16] rounded-[24px] overflow-hidden bg-[#001E13]/5"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.caption ? post.caption.slice(0, 120) : "WePlanify on Instagram"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent pt-14 pb-4 px-4">
                {post.caption ? (
                  <p className="text-white text-sm lg:text-base font-karla leading-snug line-clamp-2 drop-shadow-sm">
                    {post.caption}
                  </p>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
