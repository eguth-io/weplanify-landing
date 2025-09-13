import Image from "next/image";
import Link from "next/link";

interface FooterProps {
  variant?: 'home' | 'contact';
}

export default function Footer({ variant = 'home' }: FooterProps) {
  const config = {
    home: {
      marginTop: 'mt-[120px] md:mt-[180px] lg:mt-[230px]',
      borderTop: 'border-t',
      borderBottom: 'border-b'
    },
    contact: {
      marginTop: '',
      borderTop: '',
      borderBottom: 'border-b'
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
            <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez WePlanify sur Instagram">
              <div className="w-[30px] h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                <Image
                  src="/instagram.svg"
                  alt="Icône Instagram - Suivez WePlanify"
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
                  alt="Icône TikTok - Suivez WePlanify"
                  width={24}
                  height={24}
                  className="brightness-0 invert"
                />
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-black font-medium">Fonctionnalités</p>
          <Link href="/" className="text-black/75 text-sm mt-4 hover:text-orange transition-colors">
            Accueil
          </Link>
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
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            FAQ
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
          <span className="text-gray-400 text-sm mt-3 cursor-not-allowed relative group">
            Blog
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              À venir
            </span>
          </span>
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
              <Link href={'https://www.instagram.com/weplanify/'} target="_blank" aria-label="Suivez WePlanify sur Instagram">
                <div className="w-[28px] h-[28px] md:w-[30px] md:h-[30px] bg-orange rounded-[6px] flex items-center justify-center cursor-pointer hover:bg-[#e53415] transition-colors">
                  <Image
                    src="/instagram.svg"
                    alt="Icône Instagram - Suivez WePlanify"
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
                    alt="Icône TikTok - Suivez WePlanify"
                    width={20}
                    height={20}
                    className="brightness-0 invert md:w-6 md:h-6"
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="flex flex-col">
                <p className="text-sm md:text-base text-black font-medium mb-3 md:mb-4">
                  Fonctionnalités
                </p>
                <Link href="/" className="text-black/75 text-sm md:text-base hover:text-orange transition-colors mb-2 md:mb-3">
                  Accueil
                </Link>
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
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  FAQ
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
                <span className="text-gray-400 text-sm md:text-base mb-2 md:mb-3 cursor-not-allowed relative group">
                  Blog
                  <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    À venir
                  </span>
                </span>
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
      <div className="flex justify-end items-center mx-[60px] mt-6 pb-2">
        <p className="text-sm text-black/75 font-medium">
          Réalisé par : La-landing
        </p>
      </div>
    </footer>
  );
}
