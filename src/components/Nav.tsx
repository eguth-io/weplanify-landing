"use client";
import { NavType, Navigation } from "@/sanity/lib/type";
import Image from "next/image";
import Link from "next/link";
import { useRegisterHref } from "@/lib/attribution/use-register-href";
import { PulsatingButton } from "./magicui/pulsating-button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import LanguageModal from "./LanguageModal";
import { useImmersiveMode } from "@/lib/hooks/use-immersive-mode";

const DEFAULT_NAV_DATA: NavType = {
  logo: "/logo.svg",
  logoMobile: "/logo.svg",
  ctaButton: "Get started",
  ctaLink: "/contact",
  connexionLink: "/login",
};

type Locale = string;
type DropdownItem = {
  labelKey: string;
  href: (locale: Locale) => string;
};
type DropdownColumn = {
  headingKey?: string;
  items: DropdownItem[];
};
type Dropdown = {
  id: string;
  labelKey: string;
  // One column = simple list. Two columns = grouped layout with headings.
  columns: DropdownColumn[];
};

// Labels live in the `nav` message namespace under `menu.*`; only the URL logic
// stays in code so adding a language is just translating the messages.
const DROPDOWNS: Dropdown[] = [
  {
    id: "features",
    labelKey: "menu.features.label",
    columns: [
      {
        headingKey: "menu.features.headings.planDecide",
        items: [
          { labelKey: "menu.features.items.planning", href: (l) => `/${l}/features/planning` },
          { labelKey: "menu.features.items.polls", href: (l) => `/${l}/features/polls` },
          { labelKey: "menu.features.items.collaboration", href: (l) => `/${l}/features/collaboration` },
          { labelKey: "menu.features.items.discovery", href: (l) => `/${l}/features/explore` },
        ],
      },
      {
        headingKey: "menu.features.headings.organize",
        items: [
          { labelKey: "menu.features.items.itinerary", href: (l) => `/${l}/features/itinerary` },
          { labelKey: "menu.features.items.budget", href: (l) => `/${l}/features/budget` },
          { labelKey: "menu.features.items.packing", href: (l) => `/${l}/features/packing` },
          { labelKey: "menu.features.items.transport", href: (l) => `/${l}/features/transport` },
          { labelKey: "menu.features.items.memories", href: (l) => `/${l}/features/memories` },
        ],
      },
    ],
  },
  {
    id: "use-cases",
    labelKey: "menu.useCases.label",
    columns: [
      {
        items: [
          { labelKey: "menu.useCases.items.friends", href: (l) => `/${l}/trip-with-friends` },
          { labelKey: "menu.useCases.items.bachelorette", href: (l) => `/${l}/bachelorette-trip` },
          { labelKey: "menu.useCases.items.birthday", href: (l) => `/${l}/birthday-trip` },
          { labelKey: "menu.useCases.items.family", href: (l) => `/${l}/family-trip` },
          { labelKey: "menu.useCases.items.roadTrip", href: (l) => `/${l}/road-trip` },
          { labelKey: "menu.useCases.items.school", href: (l) => `/${l}/school-trip` },
          { labelKey: "menu.useCases.items.teamBuilding", href: (l) => `/${l}/team-building` },
        ],
      },
    ],
  },
  {
    id: "compare",
    labelKey: "menu.compare.label",
    columns: [
      {
        items: [
          { labelKey: "menu.compare.items.bestApps", href: (l) => `/${l}/alternatives/best-group-trip-planner-apps` },
          { labelKey: "menu.compare.items.wanderlog", href: (l) => `/${l}/alternatives/wanderlog` },
          { labelKey: "menu.compare.items.tripit", href: (l) => `/${l}/alternatives/tripit` },
          { labelKey: "menu.compare.items.squadtrip", href: (l) => `/${l}/alternatives/squadtrip` },
          { labelKey: "menu.compare.items.stippl", href: (l) => `/${l}/alternatives/stippl` },
          { labelKey: "menu.compare.items.cruzmi", href: (l) => `/${l}/alternatives/cruzmi` },
        ],
      },
    ],
  },
  {
    id: "resources",
    labelKey: "menu.resources.label",
    columns: [
      {
        items: [
          { labelKey: "menu.resources.items.blog", href: (l) => `/${l}/blog` },
          { labelKey: "menu.resources.items.guide", href: (l) => `/${l}/guides/plan-group-trip` },
          { labelKey: "menu.resources.items.destinations", href: (l) => `/${l}/destinations` },
          { labelKey: "menu.resources.items.travelGuides", href: (l) => `/${l}/travel-guides` },
          { labelKey: "menu.resources.items.events", href: (l) => `/${l}/events` },
          { labelKey: "menu.resources.items.faq", href: (l) => `/${l}/faq` },
          { labelKey: "menu.resources.items.about", href: (l) => `/${l}/about` },
          { labelKey: "menu.resources.items.partnership", href: (l) => `/${l}/partnership` },
        ],
      },
    ],
  },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`inline-block transition-transform duration-200 ${className}`}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isDropdownActive(dropdown: Dropdown, locale: Locale, pathname: string | null): boolean {
  if (!pathname) return false;
  return dropdown.columns.some((col) =>
    col.items.some((item) => {
      const href = item.href(locale);
      return pathname === href || pathname.startsWith(`${href}/`);
    })
  );
}

interface NavProps {
  navData: NavType | null;
  navigationData?: Navigation | null;
}

export default function Nav({ navData }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const [langModalOpen, setLangModalOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("nav");
  // While the immersive slider fills the screen, retract the nav up to a thin
  // "bookmark" strip so it doesn't sit over the animation. Keep it expanded if
  // the mobile menu is open (the user needs the full bar to navigate/close).
  const immersive = useImmersiveMode() && !isMenuOpen;

  const seg = pathname?.split("/")[1] ?? "";
  const locale: Locale = (routing.locales as readonly string[]).includes(seg) ? seg : "en";
  const nav = navData || DEFAULT_NAV_DATA;
  const loginUrl = `https://app.weplanify.com/${locale}/login`;
  const registerUrl = useRegisterHref({ locale, medium: "nav" });

  const toggleMenu = () => {
    setIsMenuOpen((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        setTimeout(() => {
          document.body.style.overflow = newState ? "hidden" : "unset";
        }, 0);
      }
      return newState;
    });
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenMobileGroup(null);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 0);
    }
  };

  return (
    <>
      <div
        className={`fixed w-full z-50 top-0 px-4 lg:px-8 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          immersive ? "-translate-y-[calc(100%-14px)]" : "translate-y-0"
        }`}
      >
        <nav
          className={`bg-white shadow-sm flex justify-between items-center px-[30px] lg:px-[70px] py-[10px] rounded-b-[16px] lg:rounded-b-[20px] max-w-[1536px] mx-auto transition-[opacity] duration-300 ${
            immersive ? "opacity-95" : "opacity-100"
          }`}
        >
          <Link href={`/${locale}`} aria-label="WePlanify - Home">
            <Image
              src={nav.logo}
              alt="WePlanify logo"
              width={155}
              height={66}
              className="block w-[110px] h-[46px] lg:w-[155px] lg:h-[66px]"
            />
          </Link>

          {/* Burger Menu Button */}
          <button onClick={toggleMenu} className="lg:hidden z-[60] relative" aria-label="Toggle menu">
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
              <span className={`block h-0.5 bg-black transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-[32px] text-sm items-center">
            {DROPDOWNS.map((dropdown) => {
              const active = isDropdownActive(dropdown, locale, pathname);
              const isMulticol = dropdown.columns.length > 1;
              return (
                <div key={dropdown.id} className="relative group">
                  <button
                    className={`flex items-center gap-1.5 py-2 transition-colors ${
                      active ? "text-orange font-medium" : "text-black/85 hover:text-black"
                    }`}
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    {t(dropdown.labelKey)}
                    <Chevron className="group-hover:rotate-180" />
                  </button>
                  <div className="absolute left-0 right-0 top-full h-2 invisible group-hover:visible" aria-hidden="true" />
                  <div
                    className={`absolute top-[calc(100%+8px)] bg-white shadow-xl rounded-xl border border-gray-100 py-3 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50 ${
                      isMulticol
                        ? "left-1/2 -translate-x-1/2 grid grid-cols-2 gap-x-4 min-w-[460px] px-3"
                        : "left-1/2 -translate-x-1/2 min-w-[260px]"
                    }`}
                    role="menu"
                  >
                    {dropdown.columns.map((col, ci) => (
                      <div key={ci} className={isMulticol ? "min-w-0" : ""}>
                        {col.headingKey && (
                          <div className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                            {t(col.headingKey)}
                          </div>
                        )}
                        {col.items.map((item, i) => {
                          const itemHref = item.href(locale);
                          const itemActive = pathname === itemHref || pathname?.startsWith(`${itemHref}/`);
                          return (
                            <Link
                              key={i}
                              href={itemHref}
                              className={`block px-3 py-2 text-sm rounded-md transition-colors ${
                                itemActive
                                  ? "text-orange bg-orange/5 font-medium"
                                  : "text-black/80 hover:bg-orange/5 hover:text-orange"
                              }`}
                              role="menuitem"
                            >
                              {t(item.labelKey)}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:flex items-center gap-6 hidden">
            <Link href={loginUrl} className="text-sm font-[500]" rel="nofollow">
              {t("login")}
            </Link>
            <Link href={registerUrl} rel="nofollow">
              <PulsatingButton>{t("register")}</PulsatingButton>
            </Link>

            {/* Language picker — opens the "Choose language" modal */}
            <button
              type="button"
              onClick={() => setLangModalOpen(true)}
              aria-label="Choose language"
              className="ml-2 lg:-mr-10 flex items-center gap-1.5 rounded-full bg-[#001E13]/[0.04] px-2.5 py-1 text-[11px] font-semibold font-karla text-[#001E13]/70 transition-colors hover:text-[#001E13]"
            >
              <Image src={`/langs/${locale}.svg`} alt={locale} width={16} height={16} className="rounded-full" />
              {locale.toUpperCase()}
              <Chevron />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden transition-opacity duration-300 ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white z-[60] lg:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b">
            <Link href={`/${locale}`} aria-label="WePlanify - Home" onClick={closeMenu}>
              <Image src={nav.logo} alt="WePlanify logo" width={120} height={50} className="w-[120px] h-[50px]" />
            </Link>
            <button onClick={closeMenu} className="w-8 h-8 flex items-center justify-center" aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-2 py-4">
            {DROPDOWNS.map((dropdown) => {
              const open = openMobileGroup === dropdown.id;
              const active = isDropdownActive(dropdown, locale, pathname);
              return (
                <div key={dropdown.id} className="border-b border-gray-100 last:border-b-0">
                  <button
                    onClick={() => setOpenMobileGroup(open ? null : dropdown.id)}
                    className={`w-full flex justify-between items-center px-4 py-4 text-base font-medium transition-colors ${
                      active ? "text-orange" : "text-black/85 hover:text-orange"
                    }`}
                    aria-expanded={open}
                  >
                    {t(dropdown.labelKey)}
                    <Chevron className={open ? "rotate-180" : ""} />
                  </button>
                  {open && (
                    <div className="pb-3">
                      {dropdown.columns.map((col, ci) => (
                        <div key={ci} className="mb-2 last:mb-0">
                          {col.headingKey && (
                            <div className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                              {t(col.headingKey)}
                            </div>
                          )}
                          {col.items.map((item, i) => {
                            const itemHref = item.href(locale);
                            const itemActive = pathname === itemHref || pathname?.startsWith(`${itemHref}/`);
                            return (
                              <Link
                                key={i}
                                href={itemHref}
                                onClick={closeMenu}
                                className={`block px-6 py-2 text-sm transition-colors rounded-md ${
                                  itemActive ? "text-orange font-medium" : "text-black/70 hover:text-orange"
                                }`}
                              >
                                {t(item.labelKey)}
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="px-6 py-6 border-t space-y-3">
            <Link href={loginUrl} onClick={closeMenu} className="block text-center py-3 px-4 text-base font-medium hover:bg-gray-50 transition-colors rounded-lg" rel="nofollow">
              {t("login")}
            </Link>
            <Link href={registerUrl} onClick={closeMenu} className="block" rel="nofollow">
              <PulsatingButton className="w-full justify-center">
                {t("register")}
              </PulsatingButton>
            </Link>

            {/* Language picker — opens the "Choose language" modal */}
            <div className="flex items-center justify-center pt-1">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  setLangModalOpen(true);
                }}
                aria-label="Choose language"
                className="flex items-center gap-2 rounded-full bg-[#001E13]/[0.06] px-4 py-1.5 text-sm font-bold font-karla text-[#001E13]/70 transition-colors hover:text-[#001E13]"
              >
                <Image src={`/langs/${locale}.svg`} alt={locale} width={18} height={18} className="rounded-full" />
                {locale.toUpperCase()}
                <Chevron />
              </button>
            </div>
          </div>
        </div>
      </div>

      <LanguageModal
        open={langModalOpen}
        onClose={() => setLangModalOpen(false)}
        locale={locale}
        title={t("chooseLanguage")}
      />
    </>
  );
}
