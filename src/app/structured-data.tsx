export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WePlanify",
    "alternateName": ["WePlanify Group Trip Planner", "WePlanify — Voyages de Groupe"],
    "description": "WePlanify is a free collaborative group trip planner. Plan itineraries together, vote with group polls, track shared budgets, and organize every detail of your group travel in one bilingual (English/French) browser app.",
    "url": "https://www.weplanify.com",
    "applicationCategory": "TravelApplication",
    "applicationSubCategory": "GroupTripPlanner",
    "operatingSystem": "Web (any modern browser)",
    "inLanguage": ["en", "fr"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "category": "Free with optional premium tier"
    },
    "author": {
      "@type": "Organization",
      "name": "WePlanify",
      "url": "https://weplanify.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WePlanify",
      "url": "https://weplanify.com"
    },
    "audience": {
      "@type": "Audience",
      "audienceType": "Groups of friends, families, and teams planning trips together"
    },
    "featureList": [
      "Collaborative day-by-day itinerary builder",
      "Group polls with anonymous voting",
      "Shared budget tracker with split-aware settle-up",
      "Shared packing lists with per-traveller assignments",
      "AI assistant that drafts trips from natural-language prompts",
      "Activity, restaurant, and tour discovery per destination",
      "3D globe view of past and planned trips",
      "Real-time multi-user collaboration",
      "Fully bilingual English and French",
      "No app download required — works in any browser"
    ],
    "screenshot": "https://www.weplanify.com/app-screenshot.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2026-05-08",
    "browserRequirements": "Requires JavaScript; runs in any modern browser",
    "isAccessibleForFree": true
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
