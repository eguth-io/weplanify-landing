interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureJsonLdProps {
  featureName: string;
  featureDescription: string;
  featureUrl: string;
  faqItems: FAQItem[];
}

export default function FeatureJsonLd({
  featureName,
  featureDescription,
  featureUrl,
  faqItems,
}: FeatureJsonLdProps) {
  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // WebPage Schema with feature info
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": featureName,
    "description": featureDescription,
    "url": featureUrl,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Weplanify",
      "url": "https://weplanify.com"
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "Weplanify",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://weplanify.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Features",
        "item": "https://weplanify.com/features"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": featureName,
        "item": featureUrl
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
