import Image from "next/image";
import Link from "next/link";
import { Footer as FooterType } from "@/sanity/lib/type";

interface FooterProps {
  variant?: 'home' | 'contact' | 'blog';
  footerData?: FooterType | null;
}

// Social media icon mapping
const SOCIAL_ICONS: Record<string, string> = {
  instagram: "/instagram.svg",
  tiktok: "/tiktok.svg",
  facebook: "/facebook.svg",
  twitter: "/twitter.svg",
  linkedin: "/linkedin.svg",
  youtube: "/youtube.svg"
};

export default function Footer({ variant = 'home', footerData }: FooterProps) {
  const config = {
    home: {
      marginTop: 'mt-[100px] md:mt-[180px] lg:mt-[100px]',
      borderTop: 'border-t',
      borderBottom: ''
    },
    contact: {
      marginTop: '',
      borderTop: '',
      borderBottom: ''
    },
    blog: {
      marginTop: 'mt-16',
      borderTop: 'border-t',
      borderBottom: ''
    }
  };

  const currentConfig = config[variant];

  return (
    <footer className={`${currentConfig.marginTop} mx-4 md:mx-8 lg:mx-[60px] ${currentConfig.borderTop} ${currentConfig.borderBottom} border-[#E5E5E5] py-6 md:py-8 lg:py-6`}>
      <div className="hidden lg:flex gap-[100px] justify-between">
        <div className="flex flex-col">
          <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Logo WePlanify" width={155} height={66} />
          </Link>
          <p className="text-sm text-black/75 mt-4">
            Planifiez, partagez, partez :
            <br />
            une seule appli pour tout gérer
          </p>
          <p className="mt-11 font-semibold text-black text-sm">
            Rejoignez nous
          </p>
          <div className="flex gap-3 mt-3">
            {footerData?.socialLinks && footerData.socialLinks.length > 0 ? (
              footerData.socialLinks.map((social, index) => {
                const iconSrc = SOCIAL_ICONS[social.platform.toLowerCase()] || "/instagram.svg";
                return (
                  <Link
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.ariaLabel || `Suivez-nous sur ${social.platform}`}
                  >
                    <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                      <Image
                        src={iconSrc}
                        alt={`Icône ${social.platform}`}
                        width={24}
                        height={24}
                        className="brightness-0 invert"
                      />
                    </div>
                  </Link>
                );
              })
            ) : (
              <>
                <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez WePlanify sur Instagram">
                  <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                    <Image
                      src="/instagram.svg"
                      alt="Icône Instagram"
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                </Link>
                <Link href={'https://www.tiktok.com/@weplanify'} target="_blank" aria-label="Suivez WePlanify sur TikTok">
                  <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                    <Image
                      src="/tiktok.svg"
                      alt="Icône TikTok"
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">Fonctionnalités</p>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Planificateur de voyage
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Gestion du budget
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Collaboration en équipe
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">À propos</p>
          <span className="text-gray-400 text-sm mt-6 cursor-not-allowed relative group">
            Notre mission
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            L&apos;équipe
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <Link href="/contact" className="text-black/75 text-sm mt-3 hover:text-orange transition-colors">
            Contact
          </Link>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">Support</p>
          <span className="text-gray-400 text-sm mt-6 cursor-not-allowed relative group">
            Guide d&apos;utilisation
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <Link href="/faq" className="text-black/75 text-sm mt-3 hover:text-orange transition-colors">
            FAQ
          </Link>
          <Link href="/blog" className="text-black/75 text-sm mt-3 hover:text-orange transition-colors">
            Blog
          </Link>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Témoignages
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">Legal</p>
          <span className="text-gray-400 text-sm mt-6 cursor-not-allowed relative group">
            CGU
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Politique de confidentialité
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
        </div>
      </div>

      <div className="lg:hidden">
          <div className="flex flex-col items-start mb-8 md:mb-10">
            <Link href="/" className="cursor-pointer hover:opacity-80 transition-opacity">
              <Image
                src="/logo.png"
                alt="Logo WePlanify"
                width={120}
                height={51}
                className="md:w-[140px] md:h-[60px]"
              />
            </Link>
          <p className="text-sm md:text-base text-black/75 mt-3 md:mt-4">
            Planifiez, partagez, partez :
            <br />
            une seule appli pour tout gérer
          </p>

          <div className="mt-6 md:mt-8">
            <p className="font-semibold text-black text-sm md:text-base mb-3 text-center md:text-left">
              Rejoignez nous
            </p>
            <div className="flex gap-3">
              {footerData?.socialLinks && footerData.socialLinks.length > 0 ? (
                footerData.socialLinks.map((social, index) => {
                  const iconSrc = SOCIAL_ICONS[social.platform.toLowerCase()] || "/instagram.svg";
                  return (
                    <Link
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.ariaLabel || `Suivez-nous sur ${social.platform}`}
                    >
                      <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                        <Image
                          src={iconSrc}
                          alt={`Icône ${social.platform}`}
                          width={20}
                          height={20}
                          className="brightness-0 invert md:w-6 md:h-6"
                        />
                      </div>
                    </Link>
                  );
                })
              ) : (
                <>
                  <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez WePlanify sur Instagram">
                    <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                      <Image
                        src="/instagram.svg"
                        alt="Icône Instagram"
                        width={20}
                        height={20}
                        className="brightness-0 invert md:w-6 md:h-6"
                      />
                    </div>
                  </Link>
                  <Link href={'https://www.tiktok.com/@weplanify'} target="_blank" aria-label="Suivez WePlanify sur TikTok">
                    <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                      <Image
                        src="/tiktok.svg"
                        alt="Icône TikTok"
                        width={20}
                        height={20}
                        className="brightness-0 invert md:w-6 md:h-6"
                      />
                    </div>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col">
                <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                  Fonctionnalités
                </p>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Planificateur
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Budget
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <span className="text-gray-400 text-sm md:text-base cursor-not-allowed relative group">
                  Collaboration
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                  À propos
                </p>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Notre mission
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Léquipe
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <Link href="/contact" className="text-black/75 text-sm md:text-base hover:text-orange transition-colors">
                  Contact
                </Link>
              </div>

              <div className="flex flex-col">
                <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                  Support
                </p>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Guide
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <Link href="/faq" className="text-black/75 text-sm md:text-base mb-2 md:mb-3 hover:text-orange transition-colors">
                  FAQ
                </Link>
                <Link href="/blog" className="text-black/75 text-sm md:text-base mb-2 md:mb-3 hover:text-orange transition-colors">
                  Blog
                </Link>
                <span className="text-gray-400 text-sm md:text-base cursor-not-allowed relative group">
                  Témoignages
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
              </div>

              <div className="flex flex-col">
                <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                  Legal
                </p>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  CGU
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <span className="text-gray-400 text-sm md:text-base cursor-not-allowed relative group">
                  Confidentialité
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
              </div>
        </div>
      </div>

      {/* Footer bottom section - Desktop */}
      <div className="hidden lg:flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
        {/* Social Links - Left */}
        <div className="flex gap-3">
          {footerData?.socialLinks && footerData.socialLinks.length > 0 ? (
            footerData.socialLinks.map((social, index) => {
              const iconSrc = SOCIAL_ICONS[social.platform.toLowerCase()] || "/instagram.svg";
              return (
                <Link
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel || `Suivez-nous sur ${social.platform}`}
                >
                  <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                    <Image
                      src={iconSrc}
                      alt={`Icône ${social.platform}`}
                      width={24}
                      height={24}
                      className="brightness-0 invert"
                    />
                  </div>
                </Link>
              );
            })
          ) : (
            <>
              <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez WePlanify sur Instagram">
                <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                  <Image
                    src="/instagram.svg"
                    alt="Icône Instagram"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </div>
              </Link>
              <Link href={'https://www.tiktok.com/@weplanify'} target="_blank" aria-label="Suivez WePlanify sur TikTok">
                <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                  <Image
                    src="/tiktok.svg"
                    alt="Icône TikTok"
                    width={24}
                    height={24}
                    className="brightness-0 invert"
                  />
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Legal Links - Center */}
        <div className="flex gap-6 items-center">
          {footerData?.legalLinks && footerData.legalLinks.length > 0 ? (
            footerData.legalLinks.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="text-sm text-black/75 hover:text-orange transition-colors"
              >
                {link.label}
              </Link>
            ))
          ) : (
            <>
              <span className="text-sm text-gray-400 cursor-not-allowed">CGU</span>
              <span className="text-sm text-gray-400 cursor-not-allowed">Politique de confidentialité</span>
            </>
          )}
        </div>

        {/* Copyright - Right */}
        <div className="text-sm text-black/75">
          {footerData?.copyrightText || footerData?.additionalLegalText || '© 2026 All Rights Reserved'}
        </div>
      </div>

      {/* Footer bottom section - Mobile */}
      <div className="lg:hidden mt-8 pt-6 border-t border-gray-200 text-center">
        <div className="flex flex-col gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center">
            {footerData?.legalLinks && footerData.legalLinks.length > 0 ? (
              footerData.legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  className="text-sm text-black/75 hover:text-orange transition-colors"
                >
                  {link.label}
                </Link>
              ))
            ) : (
              <>
                <span className="text-sm text-gray-400">CGU</span>
                <span className="text-sm text-gray-400">Politique de confidentialité</span>
              </>
            )}
          </div>
          {/* Copyright */}
          <p className="text-sm text-black/75">
            {footerData?.copyrightText || footerData?.additionalLegalText || '© 2026 All Rights Reserved'}
          </p>
        </div>
      </div>
    </footer>
  );
}
