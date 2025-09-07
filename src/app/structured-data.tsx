export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WePlanify",
    "description": "Application de planification de voyage qui simplifie l'organisation de vos séjours. Planifiez, partagez et partez en toute simplicité avec une interface intuitive et collaborative.",
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
      "ratingValue": "5",
      "ratingCount": "100",
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
    "screenshot": "https://weplanify.com/logo.png",
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
