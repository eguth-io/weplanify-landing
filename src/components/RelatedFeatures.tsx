"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/tracking";

interface RelatedFeaturesProps {
  currentSlug: string;
  locale: string;
}

const allFeatures = [
  { slug: "planning", icon: "🗓️" },
  { slug: "polls", icon: "🗳️" },
  { slug: "budget", icon: "💰" },
  { slug: "packing", icon: "🎒" },
  { slug: "explore", icon: "🔍" },
  { slug: "collaboration", icon: "👥" },
  { slug: "itinerary", icon: "📋" },
  { slug: "transport", icon: "✈️" },
  { slug: "memories", icon: "📸" },
];

const relatedMap: Record<string, string[]> = {
  planning: ["polls", "collaboration", "itinerary"],
  polls: ["planning", "explore", "collaboration"],
  budget: ["planning", "packing", "collaboration"],
  packing: ["budget", "planning", "transport"],
  explore: ["planning", "polls", "itinerary"],
  collaboration: ["planning", "polls", "budget"],
  itinerary: ["planning", "explore", "transport"],
  transport: ["planning", "itinerary", "packing"],
  memories: ["planning", "explore", "collaboration"],
};

export default function RelatedFeatures({ currentSlug, locale }: RelatedFeaturesProps) {
  const t = useTranslations("relatedFeatures");
  const relatedSlugs = relatedMap[currentSlug] || ["planning", "polls", "budget"];
  const related = relatedSlugs
    .map((slug) => allFeatures.find((f) => f.slug === slug))
    .filter(Boolean) as (typeof allFeatures)[number][];

  return (
    <section className="px-4 lg:px-8 py-12 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-londrina-solid text-[#001E13] text-center mb-8">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((feature) => (
            <Link
              key={feature.slug}
              href={`/${locale}/features/${feature.slug}`}
              onClick={() => trackEvent("related_feature_click", { from: currentSlug, to: feature.slug })}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange/30 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="font-karla font-medium text-[#001E13]">
                {t(`features.${feature.slug}`)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
