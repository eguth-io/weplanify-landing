"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Footer as FooterType } from "@/sanity/lib/type";
import { useState } from "react";
import { trackEvent } from "@/lib/tracking";

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
          {footerData?.socialLinks && footerData.socialLinks.length > 0 && (
            <div className="flex gap-4 items-center order-2 md:order-1">
              {footerData.socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url || "#"}
                  className="hover:opacity-70 transition-opacity"
                  aria-label={social.ariaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/instagram.svg"
                    alt={social.platform}
                    width={24}
                    height={24}
                  />
                </a>
              ))}
            </div>
          )}

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
