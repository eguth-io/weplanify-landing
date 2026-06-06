"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { routing } from "@/i18n/routing";

/**
 * Autonyms (each language written in its own language) for the supported locales.
 * Only locales present in `routing.locales` are rendered, so adding a language is
 * just adding it to the routing config (+ its `messages/<locale>/` dir).
 */
const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  zh: "中文",
  de: "Deutsch",
  pt: "Português",
  ru: "Русский",
  pl: "Polski",
};

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
  /** Current active locale (for the highlighted state). */
  locale: string;
  /** Optional title; defaults to "Choose language" / "Choisir la langue". */
  title?: string;
}

export default function LanguageModal({ open, onClose, locale, title }: LanguageModalProps) {
  const pathname = usePathname();

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  // Swap the leading locale segment, keeping the user on the same page.
  const localeRe = new RegExp(`^/(${routing.locales.join("|")})`);
  const urlFor = (code: string) =>
    (pathname && localeRe.test(pathname) ? pathname.replace(localeRe, `/${code}`) : `/${code}`);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Choose language"}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl lg:p-12">
        <div className="mb-8 flex items-start justify-between">
          <h2 className="text-2xl font-bold text-[#001E13] lg:text-3xl">
            {title ?? "Choose language"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-[#001E13] transition-colors hover:bg-gray-50"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {routing.locales.map((code) => {
            const active = code === locale;
            return (
              <Link
                key={code}
                href={urlFor(code)}
                hrefLang={code}
                onClick={onClose}
                aria-current={active ? "true" : undefined}
                className={`flex items-center gap-4 rounded-2xl border px-4 py-3 transition-colors ${
                  active ? "border-[#001E13] bg-[#001E13]/[0.03]" : "border-transparent hover:bg-[#001E13]/[0.04]"
                }`}
              >
                <Image
                  src={`/langs/${code}.svg`}
                  alt={LOCALE_NAMES[code] ?? code}
                  width={32}
                  height={32}
                  className="shrink-0 rounded-full"
                />
                <span className="text-lg font-medium text-[#001E13]">
                  {LOCALE_NAMES[code] ?? code}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
