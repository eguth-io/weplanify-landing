"use client";
import { NavType, Navigation } from "@/sanity/lib/type";
import Image from "next/image";
import Link from "next/link";
import { PulsatingButton } from "./magicui/pulsating-button";
import { useState } from "react";
import { usePathname } from "next/navigation";

const DEFAULT_NAV_DATA: NavType = {
  logo: "/logo.svg",
  logoMobile: "/logo.svg",
  ctaButton: "Get started",
  ctaLink: "/contact",
  connexionLink: "/login",
};

type Locale = "en" | "fr";
type Localized = { en: string; fr: string };
type DropdownItem = {
  label: Localized;
  description?: Localized;
  href: (locale: Locale) => string;
};
type DropdownColumn = {
  heading?: Localized;
  items: DropdownItem[];
};
type Dropdown = {
  id: string;
  label: Localized;
  // One column = simple list. Two columns = grouped layout with headings.
  columns: DropdownColumn[];
};

const DROPDOWNS: Dropdown[] = [
  {
    id: "features",
    label: { en: "Features", fr: "Fonctionnalités" },
    columns: [
      {
        heading: { en: "Plan & decide", fr: "Planifier & décider" },
        items: [
          {
            label: { en: "Planning (manual or AI)", fr: "Planification (manuelle ou IA)" },
            href: (l) => `/${l}/features/planning`,
          },
          {
            label: { en: "Group polls", fr: "Sondages" },
            href: (l) => `/${l}/features/polls`,
          },
          {
            label: { en: "Collaboration", fr: "Collaboration" },
            href: (l) => `/${l}/features/collaboration`,
          },
          {
            label: { en: "Discovery", fr: "Découverte" },
            href: (l) => `/${l}/features/explore`,
          },
        ],
      },
      {
        heading: { en: "Organize the trip", fr: "Organiser le voyage" },
        items: [
          {
            label: { en: "Itinerary", fr: "Itinéraire" },
            href: (l) => `/${l}/features/itinerary`,
          },
          {
            label: { en: "Shared budget", fr: "Budget partagé" },
            href: (l) => `/${l}/features/budget`,
          },
          {
            label: { en: "Packing lists", fr: "Listes de bagages" },
            href: (l) => `/${l}/features/packing` },
          {
            label: { en: "Transport", fr: "Transport" },
            href: (l) => `/${l}/features/transport`,
          },
          {
            label: { en: "Memories", fr: "Souvenirs" },
            href: (l) => `/${l}/features/memories`,
          },
        ],
      },
    ],
  },
  {
    id: "use-cases",
    label: { en: "Use cases", fr: "Cas d'usage" },
    columns: [
      {
        items: [
          { label: { en: "Trip with friends", fr: "Voyage entre amis" }, href: (l) => `/${l}/trip-with-friends` },
          { label: { en: "Bachelorette trip", fr: "EVJF" }, href: (l) => `/${l}/bachelorette-trip` },
          { label: { en: "Birthday trip", fr: "Voyage anniversaire" }, href: (l) => `/${l}/birthday-trip` },
          { label: { en: "Family trip", fr: "Voyage en famille" }, href: (l) => `/${l}/family-trip` },
          { label: { en: "Road trip", fr: "Road trip" }, href: (l) => `/${l}/road-trip` },
          { label: { en: "School trip", fr: "Voyage scolaire" }, href: (l) => `/${l}/school-trip` },
          { label: { en: "Team building", fr: "Team building" }, href: (l) => `/${l}/team-building` },
        ],
      },
    ],
  },
  {
    id: "compare",
    label: { en: "Compare", fr: "Comparer" },
    columns: [
      {
        items: [
          { label: { en: "Best apps 2026", fr: "Meilleures apps 2026" }, href: (l) => `/${l}/alternatives/best-group-trip-planner-apps` },
          { label: { en: "vs Wanderlog", fr: "vs Wanderlog" }, href: (l) => `/${l}/alternatives/wanderlog` },
          { label: { en: "vs TripIt", fr: "vs TripIt" }, href: (l) => `/${l}/alternatives/tripit` },
          { label: { en: "vs SquadTrip", fr: "vs SquadTrip" }, href: (l) => `/${l}/alternatives/squadtrip` },
          { label: { en: "vs Stippl", fr: "vs Stippl" }, href: (l) => `/${l}/alternatives/stippl` },
          { label: { en: "vs Cruzmi", fr: "vs Cruzmi" }, href: (l) => `/${l}/alternatives/cruzmi` },
        ],
      },
    ],
  },
  {
    id: "resources",
    label: { en: "Resources", fr: "Ressources" },
    columns: [
      {
        items: [
          { label: { en: "Blog", fr: "Blog" }, href: (l) => `/${l}/blog` },
          { label: { en: "Group trip guide", fr: "Guide voyage de groupe" }, href: (l) => `/${l}/guides/plan-group-trip` },
          { label: { en: "Destinations", fr: "Destinations" }, href: (l) => `/${l}/destinations` },
          { label: { en: "Travel guides", fr: "Guides voyage" }, href: (l) => `/${l}/travel-guides` },
          { label: { en: "2026 events", fr: "Événements 2026" }, href: (l) => `/${l}/events` },
          { label: { en: "FAQ", fr: "FAQ" }, href: (l) => `/${l}/faq` },
          { label: { en: "About", fr: "À propos" }, href: (l) => `/${l}/about` },
          { label: { en: "Partnership", fr: "Partenariat" }, href: (l) => `/${l}/partnership` },
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
  const pathname = usePathname();

  const locale: Locale = pathname?.startsWith("/fr") ? "fr" : "en";
  const nav = navData || DEFAULT_NAV_DATA;
  const loginUrl = `https://app.weplanify.com/${locale}/login`;
  const registerUrl = `https://app.weplanify.com/${locale}/register?utm_source=landing`;

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
      <div className="fixed w-full z-50 top-0 px-4 lg:px-8">
        <nav className="bg-white shadow-sm flex justify-between items-center px-[30px] lg:px-[70px] py-[10px] rounded-b-[16px] lg:rounded-b-[20px] max-w-[1536px] mx-auto">
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
                    {dropdown.label[locale]}
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
                        {col.heading && (
                          <div className="px-3 pt-1 pb-2 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                            {col.heading[locale]}
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
                              {item.label[locale]}
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
              {locale === "fr" ? "Connexion" : "Login"}
            </Link>
            <Link href={registerUrl} rel="nofollow">
              <PulsatingButton>{locale === "fr" ? "S'inscrire" : "Register"}</PulsatingButton>
            </Link>
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
                    {dropdown.label[locale]}
                    <Chevron className={open ? "rotate-180" : ""} />
                  </button>
                  {open && (
                    <div className="pb-3">
                      {dropdown.columns.map((col, ci) => (
                        <div key={ci} className="mb-2 last:mb-0">
                          {col.heading && (
                            <div className="px-4 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-black/40">
                              {col.heading[locale]}
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
                                {item.label[locale]}
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
              {locale === "fr" ? "Connexion" : "Login"}
            </Link>
            <Link href={registerUrl} onClick={closeMenu} className="block" rel="nofollow">
              <PulsatingButton className="w-full justify-center">
                {locale === "fr" ? "S'inscrire" : "Register"}
              </PulsatingButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
