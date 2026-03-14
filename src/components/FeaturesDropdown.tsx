"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  slug: string;
}

const features: FeatureItem[] = [
  {
    icon: "🤖",
    title: "AI Planning",
    description: "AI assistant for planning",
    slug: "ai-planning",
  },
  {
    icon: "👥",
    title: "Collaboration",
    description: "Plan together in real-time",
    slug: "collaboration",
  },
  {
    icon: "📅",
    title: "Itinerary",
    description: "Organize day by day",
    slug: "itinerary",
  },
  {
    icon: "🗺️",
    title: "Explore",
    description: "Discover places",
    slug: "explore",
  },
  {
    icon: "💰",
    title: "Budget",
    description: "Split expenses",
    slug: "budget",
  },
  {
    icon: "🧳",
    title: "Packing",
    description: "Prepare your bags",
    slug: "packing",
  },
  {
    icon: "📊",
    title: "Polls",
    description: "Vote to decide",
    slug: "polls",
  },
  {
    icon: "✈️",
    title: "Transport",
    description: "Flights, trains, journeys",
    slug: "transport",
  },
];

interface FeaturesDropdownProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export default function FeaturesDropdown({ isMobile = false, onItemClick }: FeaturesDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const locale = pathname?.split('/')[1] || 'en';

  // Handle click outside to close dropdown (desktop)
  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (isMobile) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
    onItemClick?.();
  };

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={handleClick}
          className="flex items-center justify-between w-full text-lg font-medium hover:text-[#F6391A] transition-colors"
          aria-expanded={isOpen}
        >
          <span>Features</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="space-y-2 pl-2 border-l-2 border-[#F6391A]/20">
            {features.map((feature) => (
              <Link
                key={feature.slug}
                href={`/${locale}/features/${feature.slug}`}
                onClick={handleItemClick}
                className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-[#F6391A]/5 transition-colors"
              >
                <span className="text-xl">{feature.icon}</span>
                <div>
                  <div className="font-medium text-[#001E13]">{feature.title}</div>
                  <div className="text-sm text-gray-500">{feature.description}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={handleClick}
        className="flex items-center gap-1 text-sm hover:text-[#F6391A] transition-colors"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>Features</span>
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-200 ease-out ${
          isOpen
            ? "opacity-100 translate-y-0 visible"
            : "opacity-0 -translate-y-2 invisible pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-[400px] grid grid-cols-2 gap-2">
          {features.map((feature) => (
            <Link
              key={feature.slug}
              href={`/${locale}/features/${feature.slug}`}
              onClick={handleItemClick}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FFFBF5] transition-colors group"
            >
              <span className="text-xl">{feature.icon}</span>
              <div>
                <div className="font-medium text-[#001E13] group-hover:text-[#F6391A] transition-colors">
                  {feature.title}
                </div>
                <div className="text-xs text-gray-500 leading-tight">{feature.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
