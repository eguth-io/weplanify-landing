import Image from "next/image";
import Link from "next/link";
import { Footer as FooterType } from "@/sanity/lib/type";

interface FooterProps {
  variant?: 'home' | 'contact' | 'blog' | 'features';
  footerData?: FooterType | null;
}

export default function Footer({ variant = 'home', footerData }: FooterProps) {
  return (
    <footer className="px-4 lg:px-8 py-12 lg:py-16 bg-white">
      <div className="max-w-[1536px] mx-auto">
        {/* Footer Logo */}
        {footerData?.logo && (
          <div className="mb-8 lg:mb-10">
            <Link href="/">
              <Image
                src={footerData.logo}
                alt={footerData.tagline || "WePlanify"}
                width={155}
                height={66}
              />
            </Link>
          </div>
        )}

        {/* Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 lg:mb-20">
          {/* Footer Columns */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
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
          </div>

          {/* Footer CTA Section */}
          {footerData?.ctaSection?.showCta && (
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
                <Link href={footerData.ctaSection.buttonUrl || "#"}>
                  <button className="bg-[#F6391A] text-white px-6 py-2.5 rounded-full font-karla font-bold text-base hover:bg-[#F6391A]/90 transition-colors w-fit">
                    {footerData.ctaSection.buttonText}
                  </button>
                </Link>
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

        {/* Copyright */}
        {footerData?.copyrightText && (
          <div className="text-center mt-8">
            <p className="text-[#001E13]/60 text-sm font-karla">
              {footerData.copyrightText}
            </p>
          </div>
        )}
      </div>
    </footer>
  );
}
