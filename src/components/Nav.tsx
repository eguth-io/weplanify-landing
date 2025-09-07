"use client";
import { NavType } from "@/sanity/lib/type";
import Image from "next/image";
import Link from "next/link";
import { PulsatingButton } from "./magicui/pulsating-button";
import { useState } from "react";

export default function Nav({ navData }: { navData: NavType }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);

    // Handle scroll directly in the function
    if (newState) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  return (
    <>
      <nav className="bg-[#FFFCFB] flex justify-between items-center px-[30px] lg:px-[70px] py-[10px] sticky w-full z-50 fixed top-0">
        <Link href="/">
          <Image
            src={navData.logo}
            alt="logo"
            width={155}
            height={66}
            className="block w-[75px] h-[45px] lg:w-[155px] lg:h-[66px]"
          />
        </Link>

        {/* Burger Menu Button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden z-[60] relative"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-[40px] text-sm">
          <Link href="#fonctionnement">Fonctionnement</Link>
          <Link href="#faq">FAQ</Link>
          <Link href="#avis">Avis</Link>
          <Link href="/blog">Blog</Link>
        </div>

        <div className="lg:flex items-center gap-6 hidden">
          <Link href={navData.ctaLink} className="text-sm font-[500]">
            Connexion
          </Link>
          <Link href={navData.ctaLink}>
            <PulsatingButton>{navData.ctaButton}</PulsatingButton>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[55] lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      ></div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-[#FFFCFB] z-[60] lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header du menu */}
          <div className="flex justify-between items-center p-6 border-b">
            <Link href="/">
              <Image
                src={navData.logo}
                alt="logo"
                width={120}
                height={50}
                className="w-[120px] h-[50px]"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="w-8 h-8 flex items-center justify-center"
              aria-label="Close menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 5L5 15M5 5L15 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col px-6 py-8 space-y-6">
            <Link
              href="#fonctionnement"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
            >
              Fonctionnement
            </Link>
            <Link
              href="#faq"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
            >
              FAQ
            </Link>
            <Link
              href="#avis"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
            >
              Avis
            </Link>
            <Link
              href="/blog"
              onClick={closeMenu}
              className="text-lg font-medium hover:text-blue-600 transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="mt-auto px-6 py-8 border-t space-y-4">
            <Link
              href={navData.ctaLink}
              onClick={closeMenu}
              className="block text-center py-3 px-4 text-lg font-medium hover:bg-gray-50 transition-colors rounded-lg"
            >
              Connexion
            </Link>
            <Link href={navData.ctaLink} onClick={closeMenu} className="block">
              <PulsatingButton className="w-full justify-center">
                {navData.ctaButton}
              </PulsatingButton>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
