import Link from "next/link";

interface RelatedFeaturesProps {
  currentSlug: string;
  locale: string;
}

const allFeatures = [
  { slug: "planning", icon: "🗓️", en: "Collaborative Itinerary", fr: "Itinéraire collaboratif" },
  { slug: "polls", icon: "🗳️", en: "Group Polls", fr: "Sondages de groupe" },
  { slug: "budget", icon: "💰", en: "Shared Budget", fr: "Budget partagé" },
  { slug: "packing", icon: "🎒", en: "Packing Lists", fr: "Listes de bagages" },
  { slug: "explore", icon: "🔍", en: "Activity Discovery", fr: "Découverte d'activités" },
  { slug: "collaboration", icon: "👥", en: "Real-time Collaboration", fr: "Collaboration temps réel" },
  { slug: "itinerary", icon: "📋", en: "Day-by-Day Itinerary", fr: "Itinéraire jour par jour" },
  { slug: "transport", icon: "✈️", en: "Transport", fr: "Transport" },
  { slug: "memories", icon: "📸", en: "Trip Memories", fr: "Souvenirs de voyage" },
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
  const relatedSlugs = relatedMap[currentSlug] || ["planning", "polls", "budget"];
  const related = relatedSlugs
    .map((slug) => allFeatures.find((f) => f.slug === slug))
    .filter(Boolean) as (typeof allFeatures)[number][];

  const title = locale === "fr" ? "Découvrez aussi" : "Explore more features";

  return (
    <section className="px-4 lg:px-8 py-12 bg-gray-50/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-londrina-solid text-[#001E13] text-center mb-8">
          {title}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {related.map((feature) => (
            <Link
              key={feature.slug}
              href={`/${locale}/features/${feature.slug}`}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-orange/30 hover:shadow-sm transition-all"
            >
              <span className="text-2xl">{feature.icon}</span>
              <span className="font-karla font-medium text-[#001E13]">
                {locale === "fr" ? feature.fr : feature.en}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
