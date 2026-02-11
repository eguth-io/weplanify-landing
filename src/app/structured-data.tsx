export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WePlanify",
    "description": "WePlanify is the app that simplifies trip planning. Plan, share, and go with an intuitive interface.",
    "url": "https://weplanify.com",
    "applicationCategory": "TravelApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "ratingCount": "47",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "WePlanify",
      "url": "https://weplanify.com"
    },
    "featureList": [
      "Trip planning",
      "Collaborative organization",
      "Itinerary sharing",
      "Group management",
      "Intuitive interface"
    ],
    "screenshot": "https://weplanify.com/app-screenshot.png",
    "softwareVersion": "1.0.0",
    "releaseNotes": "Initial release with all core features"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
