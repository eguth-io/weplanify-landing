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
    scrollerRef.current?.scrollBy({ left: direction * 320, behavior: "smooth" });
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
              className="group relative shrink-0 snap-start w-[240px] lg:w-[280px] aspect-square rounded-[24px] overflow-hidden"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.imageUrl}
                alt={post.caption ? post.caption.slice(0, 120) : "WePlanify on Instagram"}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {post.caption ? (
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/55 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-sm font-karla leading-snug p-4 line-clamp-3">
                    {post.caption}
                  </p>
                </div>
              ) : null}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
