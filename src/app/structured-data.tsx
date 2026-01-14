export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WePlanify",
    "description": "WePlanify est l'application qui simplifie l'organisation de vos voyages. Planifiez, partagez et partez facilement avec une interface intuitive.",
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
      "Planification de voyage",
      "Organisation collaborative",
      "Partage d'itinéraires",
      "Gestion de groupe",
      "Interface intuitive"
    ],
    "screenshot": "https://weplanify.com/app-screenshot.png",
    "softwareVersion": "1.0.0",
    "releaseNotes": "Version initiale avec toutes les fonctionnalités de base"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
