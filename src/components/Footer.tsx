"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routing } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Footer as FooterType } from "@/sanity/lib/type";
import { useState } from "react";
import { trackEvent } from "@/lib/tracking";
import { useRegisterHref } from "@/lib/attribution/use-register-href";
import LanguageModal from "./LanguageModal";

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

// Reusable social media links (Instagram, TikTok). Moved up into the CTA column
// for better visibility / conversion (WP-323), while still kept in the footer bottom bar.
function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <a
        href="https://www.instagram.com/weplanify"
        className="text-[#001E13] hover:text-[#F6391A] transition-colors"
        aria-label="Instagram"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon platform="instagram" />
      </a>
      <a
        href="https://www.tiktok.com/@weplanify"
        className="text-[#001E13] hover:text-[#F6391A] transition-colors"
        aria-label="TikTok"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SocialIcon platform="tiktok" />
      </a>
    </div>
  );
}

interface FooterProps {
  footerData?: FooterType | null;
}

export default function Footer({ footerData }: FooterProps) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const pathname = usePathname();
  const seg = pathname?.split("/")[1] ?? "";
  const locale = (routing.locales as readonly string[]).includes(seg) ? seg : "en";
  const registerFallback = useRegisterHref({ locale, medium: "footer" });
  const t = useTranslations("footer");

  const featuresColumn = {
    title: t("columns.features.title"),
    links: [
      {
        label: t("columns.features.planning"),
        url: `/${locale}/features/planning`,
      },
      {
        label: t("columns.features.polls"),
        url: `/${locale}/features/polls`,
      },
      {
        label: t("columns.features.collaboration"),
        url: `/${locale}/features/collaboration`,
      },
      {
        label: t("columns.features.discovery"),
        url: `/${locale}/features/explore`,
      },
      {
        label: t("columns.features.itinerary"),
        url: `/${locale}/features/itinerary`,
      },
      {
        label: t("columns.features.budget"),
        url: `/${locale}/features/budget`,
      },
      {
        label: t("columns.features.packing"),
        url: `/${locale}/features/packing`,
      },
      {
        label: t("columns.features.transport"),
        url: `/${locale}/features/transport`,
      },
      {
        label: t("columns.features.memories"),
        url: `/${locale}/features/memories`,
      },
    ],
  };

  const companyColumn = {
    title: t("columns.company.title"),
    links: [
      {
        label: t("columns.company.about"),
        url: `/${locale}/about`,
      },
      {
        label: "Contact",
        url: `/${locale}/contact`,
      },
      {
        label: "Blog",
        url: `/${locale}/blog`,
      },
      {
        label: t("columns.company.partnership"),
        url: `/${locale}/partnership`,
      },
      {
        label: "FAQ",
        url: `/${locale}/faq`,
      },
    ],
  };

  const useCasesColumn = {
    title: t("columns.useCases.title"),
    links: [
      {
        label: t("columns.useCases.friends"),
        url: `/${locale}/trip-with-friends`,
      },
      {
        label: t("columns.useCases.bachelorette"),
        url: `/${locale}/bachelorette-trip`,
      },
      {
        label: t("columns.useCases.birthday"),
        url: `/${locale}/birthday-trip`,
      },
      {
        label: t("columns.useCases.family"),
        url: `/${locale}/family-trip`,
      },
      {
        label: t("columns.useCases.roadTrip"),
        url: `/${locale}/road-trip`,
      },
      {
        label: t("columns.useCases.teamBuilding"),
        url: `/${locale}/team-building`,
      },
      {
        label: t("columns.useCases.school"),
        url: `/${locale}/school-trip`,
      },
    ],
  };

  const resourcesColumn = {
    title: t("columns.resources.title"),
    links: [
      {
        label: t("columns.resources.guidePlanTrip"),
        url: `/${locale}/guides/plan-group-trip`,
      },
      {
        label: t("columns.resources.destinations"),
        url: `/${locale}/destinations`,
      },
      {
        label: t("columns.resources.travelGuides"),
        url: `/${locale}/travel-guides`,
      },
      {
        label: t("columns.resources.appComparison"),
        url: `/${locale}/alternatives`,
      },
      {
        label: t("columns.resources.events2026"),
        url: `/${locale}/events`,
      },
    ],
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with newsletter service
    if (email) {
      trackEvent("newsletter_subscribe");
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    // Extra bottom padding on mobile so the fixed StickyCTA doesn't cover the
    // language switcher (the last row of the footer).
    <footer className="px-4 lg:px-8 pt-12 lg:pt-16 pb-32 lg:pb-16 bg-white">
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
            {[featuresColumn, companyColumn, useCasesColumn, resourcesColumn].map((column) => (
              <div key={column.title} className="flex flex-col">
                <h3 className="text-[#001E13] text-base font-karla font-bold mb-6">
                  {column.title}
                </h3>
                {column.links.map((link) => (
                  <Link
                    key={link.url}
                    href={link.url}
                    className="text-[#001E13] text-base font-karla mb-4 hover:text-[#F6391A] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
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
                <Link href={footerData.ctaSection.buttonUrl || registerFallback}>
                  <button className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-base hover:bg-[#F6391A]/90 transition-colors w-fit">
                    {footerData.ctaSection.buttonText}
                  </button>
                </Link>
              )}
              {/* Social links surfaced in the CTA column for visibility (WP-323) */}
              <div className="mt-8">
                <p className="text-[#001E13] text-sm font-karla font-bold mb-3">
                  {t("followUs")}
                </p>
                <SocialLinks />
              </div>
            </div>
          ) : (
            /* Default Newsletter Section when no CTA is configured */
            <div className="flex flex-col lg:border-l border-[#001E13]/10 pl-0 lg:pl-12">
              <h3 className="text-[#001E13] text-base font-karla font-bold mb-4">
                {t("newsletter.title")}
              </h3>
              <p className="text-[#001E13]/70 text-sm font-karla mb-4">
                {t("newsletter.description")}
              </p>
              {isSubscribed ? (
                <p className="text-[#005B37] text-sm font-karla font-semibold">
                  {t("newsletter.thanks")}
                </p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.emailPlaceholder")}
                    required
                    className="flex-1 px-4 py-2.5 rounded-full border border-[#001E13]/20 text-sm font-karla focus:outline-none focus:border-[#F6391A] transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-sm hover:bg-[#F6391A]/90 transition-colors whitespace-nowrap"
                  >
                    {t("newsletter.subscribe")}
                  </button>
                </form>
              )}
              {/* Social links surfaced in the CTA column for visibility (WP-323) */}
              <div className="mt-8">
                <p className="text-[#001E13] text-sm font-karla font-bold mb-3">
                  {t("followUs")}
                </p>
                <SocialLinks />
              </div>
            </div>
          )}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 lg:pt-10 border-t border-[#001E13]/10">
          {/* Product Hunt badge (social icons moved up to the CTA column — WP-323) */}
          <div className="flex flex-wrap gap-4 items-center order-2 md:order-1">
            <a
              href="https://www.producthunt.com/products/weplanify?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-weplanify"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1144224&theme=light&t=1778502038122"
                alt="WePlanify - Plan trips with friends without the WhatsApp chaos | Product Hunt"
                width={180}
                height={39}
              />
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

          {/* Language Switcher — opens the "Choose language" modal */}
          <button
            type="button"
            onClick={() => setLangModalOpen(true)}
            aria-label={t("chooseLanguage")}
            className="flex items-center gap-2 text-sm font-karla text-[#001E13]/60 transition-colors hover:text-[#001E13]"
          >
            <svg className="w-4 h-4 text-[#001E13]/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <Image src={`/langs/${locale}.svg`} alt={locale} width={18} height={18} className="rounded-full" />
            <span>{locale.toUpperCase()}</span>
          </button>
        </div>

        <LanguageModal
          open={langModalOpen}
          onClose={() => setLangModalOpen(false)}
          locale={locale}
          title={t("chooseLanguage")}
        />
      </div>
    </footer>
  );
}
