"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Loader2, MapPin, RotateCcw, Sparkles } from "lucide-react";
import { trackEvent } from "@/lib/tracking";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.weplanify.com";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.weplanify.com";

type Lang = "en" | "fr";

type UnsplashPhoto = {
  urls: { thumb: string | null; small: string | null; regular: string | null; full?: string | null };
};

type TripPreview = {
  destination: string;
  country: string | null;
  tagline: string;
  cover: UnsplashPhoto | null;
  highlights?: { title: string; description: string }[];
};

type Variant = "light" | "dark";

interface Props {
  locale?: string;
  /** "light" = light card on dark bg (CTABanner-like). "dark" = white card on light bg (CTASection-like). */
  variant?: Variant;
  /** Where this teaser lives, sent as a tracking dimension. */
  location: string;
}

const COPY: Record<Lang, {
  placeholder: string;
  submit: string;
  submitting: string;
  cta: string;
  retry: string;
  errorGeneric: string;
  errorRateLimit: string;
  overline: string;
  caption: string;
}> = {
  en: {
    placeholder: "I want to chill on a Mexican beach with ruins nearby...",
    submit: "Plan it",
    submitting: "Crafting…",
    cta: "Plan this trip",
    retry: "Another pitch",
    errorGeneric: "Something went wrong. Please try again.",
    errorRateLimit: "Too many tries. Please wait a minute.",
    overline: "Tell us your dream trip",
    caption: "We'll generate a destination preview in seconds — free, no signup needed.",
  },
  fr: {
    placeholder: "Je veux chiller sur une plage mexicaine avec des ruines...",
    submit: "Imagine-le",
    submitting: "On prépare…",
    cta: "Planifier ce voyage",
    retry: "Un autre pitch",
    errorGeneric: "Une erreur est survenue. Réessaie.",
    errorRateLimit: "Trop de tentatives. Attends une minute.",
    overline: "Raconte ton voyage rêvé",
    caption: "On te génère une preview de destination en quelques secondes — gratuit, sans inscription.",
  },
};

export default function InlinePitch({ locale = "en", variant = "dark", location }: Props) {
  const lang: Lang = locale === "fr" ? "fr" : "en";
  const copy = COPY[lang];

  const [pitch, setPitch] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [preview, setPreview] = useState<TripPreview | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success" && preview) {
      trackEvent("inline_pitch_success", { location, destination: preview.destination });
    }
  }, [status, preview, location]);

  const submit = async () => {
    const trimmed = pitch.trim();
    if (trimmed.length < 3 || status === "loading") return;

    setStatus("loading");
    setError(null);
    trackEvent("inline_pitch_submit", { location, length: trimmed.length, locale: lang });

    try {
      const res = await fetch(`${API_URL}/api/public/trip-preview`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ pitch: trimmed, locale: lang, travel_month: null }),
      });
      if (res.status === 429) {
        setError(copy.errorRateLimit);
        setStatus("error");
        return;
      }
      if (!res.ok) {
        setError(copy.errorGeneric);
        setStatus("error");
        return;
      }
      const data = await res.json();
      // Inline pitch ignores clarification flow — too cramped to ask follow-ups here.
      // Treat clarification as a no-op success that bounces to the home flow instead.
      if (data?.needs_clarification) {
        window.location.href = `/?pitch=${encodeURIComponent(trimmed)}`;
        return;
      }
      setPreview(data.preview as TripPreview);
      setToken(data.token);
      setStatus("success");
    } catch {
      setError(copy.errorGeneric);
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setPreview(null);
    setToken(null);
    setError(null);
  };

  const isLight = variant === "light";
  const cardBg = isLight ? "bg-[#FFFBF5]/95" : "bg-white";
  const cardText = "text-[#001E13]";
  const subtleText = "text-[#001E13]/60";

  if (status === "success" && preview) {
    const signupUrl = token ? `${APP_URL}/register?pitch=${token}` : `${APP_URL}/register`;
    const coverUrl = preview.cover?.urls.regular || preview.cover?.urls.small;

    return (
      <div className={`${cardBg} ${cardText} w-full max-w-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col sm:flex-row`}>
        {coverUrl && (
          <div className="relative w-full sm:w-32 h-32 sm:h-auto flex-shrink-0">
            <Image src={coverUrl} alt={preview.destination} fill sizes="200px" className="object-cover" />
          </div>
        )}
        <div className="flex-1 p-4 flex flex-col justify-between gap-3 text-left">
          <div>
            <div className="font-nanum-pen text-orange text-base leading-none mb-1">{lang === "fr" ? "Et si tu allais à…" : "What about…"}</div>
            <div className="font-londrina-solid text-2xl leading-none mb-1">{preview.destination}</div>
            {preview.country && (
              <div className={`inline-flex items-center gap-1 ${subtleText} text-xs font-karla font-bold`}>
                <MapPin className="w-3 h-3" />
                {preview.country}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Link
              href={signupUrl}
              onClick={() => trackEvent("inline_pitch_cta_click", { location, destination: preview.destination })}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-orange hover:bg-orange/90 text-white font-karla font-bold text-sm transition-colors shadow-md shadow-orange/30"
              rel="nofollow"
            >
              {copy.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={reset}
              className={`inline-flex items-center gap-1 ${subtleText} hover:${cardText} font-karla font-semibold text-xs underline underline-offset-4`}
            >
              <RotateCcw className="w-3 h-3" />
              {copy.retry}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "loading") {
    return (
      <div className={`${cardBg} ${cardText} w-full max-w-xl rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)] px-5 py-4 flex items-center gap-3`}>
        <Loader2 className="w-5 h-5 animate-spin text-orange flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="font-londrina-solid text-base">{copy.submitting}</div>
          <div className={`${subtleText} text-xs font-karla italic truncate`}>&ldquo;{pitch}&rdquo;</div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="w-full max-w-xl"
    >
      <div className={`relative ${cardBg} ${cardText} rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]`}>
        <textarea
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          placeholder={copy.placeholder}
          maxLength={500}
          rows={2}
          className={`w-full resize-none rounded-2xl px-4 pt-3 pb-12 bg-transparent outline-none placeholder-gray-500 ${cardText} text-sm font-karla`}
        />
        <div className="absolute bottom-2 left-3 right-2 flex items-center justify-between gap-2">
          <span className={`${subtleText} text-[10px] font-karla`}>{pitch.length}/500</span>
          <button
            type="submit"
            disabled={pitch.trim().length < 3}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange hover:bg-orange/90 text-white font-karla font-bold text-xs transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-orange/30"
          >
            <Sparkles className="w-3 h-3" />
            {copy.submit}
          </button>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-red-100 bg-red-900/40 border border-red-400/30 rounded-lg px-3 py-1.5 font-karla" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
