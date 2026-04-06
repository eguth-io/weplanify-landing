"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer as FooterType } from "@/sanity/lib/type";
import { useState } from "react";
import { trackEvent } from "@/lib/tracking";

function SocialIcon({ platform }: { platform: string }) {
  const name = platform.toLowerCase();
  const cls = "w-5 h-5";
  if (name.includes("instagram")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name.includes("tiktok")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M16.6 5.82A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.07 2.53 5.7 5.7 5.7 3.15 0 5.7-2.55 5.7-5.7V9.01a7.297 7.297 0 0 0 4.04 1.22V7.14s-1.84.09-3.4-1.32Z" />
      </svg>
    );
  }
  if (name.includes("x") || name.includes("twitter")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (name.includes("youtube")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (name.includes("linkedin")) {
    return (
      <svg className={cls} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  // Fallback
  return (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

interface FooterProps {
  footerData?: FooterType | null;
}

export default function Footer({ footerData }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const pathname = usePathname();
  const locale = pathname?.startsWith("/fr") ? "fr" : "en";

  const resourcesColumn = {
    title: locale === "fr" ? "Ressources" : "Resources",
    links: [
      {
        label: locale === "fr" ? "Guide : Organiser un voyage" : "Guide: Plan a Group Trip",
        url: `/${locale}/guides/plan-group-trip`,
      },
      {
        label: locale === "fr" ? "Voyage entre amis" : "Trip with Friends",
        url: `/${locale}/trip-with-friends`,
      },
      {
        label: locale === "fr" ? "EVJF / Bachelorette" : "Bachelorette / EVJF",
        url: `/${locale}/bachelorette-trip`,
      },
      {
        label: locale === "fr" ? "Comparatif apps" : "App Comparison",
        url: `/${locale}/alternatives`,
      },
      {
        label: locale === "fr" ? "Voyage en famille" : "Family Trip",
        url: `/${locale}/family-trip`,
      },
      {
        label: locale === "fr" ? "Road Trip" : "Road Trip",
        url: `/${locale}/road-trip`,
      },
      {
        label: locale === "fr" ? "Team Building" : "Team Building",
        url: `/${locale}/team-building`,
      },
    ],
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service
    if (email) {
      trackEvent("newsletter_subscribe", { email });
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="px-4 lg:px-8 py-12 lg:py-16 bg-white">
      <div className="max-w-[1536px] mx-auto">
        {/* Footer Logo */}
        {footerData?.logo && (
          <div className="mb-8 lg:mb-10">
            <Link href="/" aria-label="WePlanify - Home">
              <Image
                src={footerData.logo}
                alt={footerData.tagline || "WePlanify logo"}
                width={155}
                height={66}
              />
            </Link>
          </div>
        )}

        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 lg:mb-20">
          {/* Footer Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {footerData?.footerColumns?.map((column, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                  {column.title}
                </h3>
                {column.links?.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link.url || "#"}
                    className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                    target={link.isExternal ? "_blank" : undefined}
                    rel={link.isExternal ? "noopener noreferrer" : undefined}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
            {/* Resources column for SEO pages */}
            <div className="flex flex-col">
              <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                {resourcesColumn.title}
              </h3>
              {resourcesColumn.links.map((link, linkIndex) => (
                <Link
                  key={linkIndex}
                  href={link.url}
                  className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            {/* Company column — only if Sanity doesn't already provide one */}
            {!footerData?.footerColumns?.some(
              (col) => col.title?.toLowerCase() === "company" || col.title?.toLowerCase() === "entreprise"
            ) && (
              <div className="flex flex-col">
                <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                  {locale === "fr" ? "Entreprise" : "Company"}
                </h3>
                <Link
                  href={`/${locale}/about`}
                  className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                >
                  {locale === "fr" ? "À propos" : "About"}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                >
                  Contact
                </Link>
                <Link
                  href={`/${locale}/blog`}
                  className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                >
                  Blog
                </Link>
                <Link
                  href={`/${locale}/faq`}
                  className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                >
                  FAQ
                </Link>
              </div>
            )}
          </div>

          {/* Footer CTA Section */}
          {footerData?.ctaSection?.showCta ? (
            <div className="flex flex-col lg:border-l border-[#001E13]/10 pl-0 lg:pl-12">
              <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                {footerData.ctaSection.title}
              </h3>
              {footerData.ctaSection.description && (
                <p className="text-[#001E13] text-base font-karla mb-6 leading-relaxed">
                  {footerData.ctaSection.description}
                </p>
              )}
              {footerData.ctaSection.buttonText && (
                <Link href={footerData.ctaSection.buttonUrl || "https://app.weplanify.com/register"}>
                  <button className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-base hover:bg-[#F6391A]/90 transition-colors w-fit">
                    {footerData.ctaSection.buttonText}
                  </button>
                </Link>
              )}
            </div>
          ) : (
            /* Default Newsletter Section when no CTA is configured */
            <div className="flex flex-col lg:border-l border-[#001E13]/10 pl-0 lg:pl-12">
              <h3 className="text-[#001E13] text-base font-karla font-bold mb-4">
                {locale === "fr" ? "Inspiration voyage hebdomadaire" : "Get weekly travel inspiration"}
              </h3>
              <p className="text-[#001E13]/70 text-sm font-karla mb-4">
                {locale === "fr"
                  ? "Astuces, pépites cachées et bons plans voyage dans votre boîte mail."
                  : "Tips, hidden gems, and travel hacks delivered to your inbox."}
              </p>
              {isSubscribed ? (
                <p className="text-[#005B37] text-sm font-karla font-semibold">
                  {locale === "fr" ? "Merci pour votre inscription !" : "Thanks for subscribing!"}
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={locale === "fr" ? "Votre e-mail" : "Your email"}
                    required
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#001E13]/20 text-sm font-karla focus:outline-none focus:border-[#F6391A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-sm hover:bg-[#F6391A]/90 transition-colors whitespace-nowrap"
                  >
                    {locale === "fr" ? "S'inscrire" : "Subscribe"}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 lg:pt-10 border-t border-[#001E13]/10">
          {/* Social Links */}
          <div className="flex gap-4 items-center order-2 md:order-1">
            <a href="https://www.instagram.com/weplanify" className="text-[#001E13] hover:text-[#F6391A] transition-colors" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <SocialIcon platform="instagram" />
            </a>
            <a href="https://www.tiktok.com/@weplanify" className="text-[#001E13] hover:text-[#F6391A] transition-colors" aria-label="TikTok" target="_blank" rel="noopener noreferrer">
              <SocialIcon platform="tiktok" />
            </a>
          </div>

          {/* Legal Links */}
          {footerData?.legalLinks && footerData.legalLinks.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-end items-center gap-4 md:gap-8 order-1 md:order-2">
              {footerData.legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url || "#"}
                  className="text-[#001E13] text-sm font-karla hover:underline"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Copyright & Language Switcher */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
          {footerData?.copyrightText && (
            <p className="text-[#001E13]/60 text-sm font-karla">
              {footerData.copyrightText}
            </p>
          )}

          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#001E13]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <Link
              href={pathname?.replace(/^\/(en|fr)/, "/en") || "/en"}
              className={`text-sm font-karla transition-colors ${locale === "en" ? "text-[#F6391A] font-bold" : "text-[#001E13]/60 hover:text-[#001E13]"}`}
            >
              English
            </Link>
            <span className="text-[#001E13]/30">|</span>
            <Link
              href={pathname?.replace(/^\/(en|fr)/, "/fr") || "/fr"}
              className={`text-sm font-karla transition-colors ${locale === "fr" ? "text-[#F6391A] font-bold" : "text-[#001E13]/60 hover:text-[#001E13]"}`}
            >
              Français
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
