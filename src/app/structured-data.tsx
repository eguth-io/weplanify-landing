export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WePlanify",
    "description": "WePlanify is a free collaborative group trip planner. Plan itineraries together, vote with group polls, track shared budgets, and organize every detail of your group travel in one app.",
    "url": "https://weplanify.com",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "WePlanify",
      "url": "https://weplanify.com"
    },
    "featureList": [
      "Collaborative group trip planning",
      "Day-by-day itinerary builder",
      "Group polls and voting system",
      "Shared budget tracker",
      "Activity and restaurant discovery",
      "Shared packing lists",
      "Real-time group collaboration"
    ],
    "screenshot": "https://weplanify.com/app-screenshot.png",
    "softwareVersion": "1.0.0"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
