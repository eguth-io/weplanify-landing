interface FAQItem {
  question: string;
  answer: string;
}

interface FeatureJsonLdProps {
  featureName: string;
  featureDescription: string;
  locale: string;
  slug: string;
  faqItems: FAQItem[];
}

const SITE_URL = "https://www.weplanify.com";

export default function FeatureJsonLd({
  featureName,
  featureDescription,
  locale,
  slug,
  faqItems,
}: FeatureJsonLdProps) {
  // Canonical, locale-aware URL — must match the page canonical for valid structured data
  const featureUrl = `${SITE_URL}/${locale}/features/${slug}`;
  const homeLabel = locale === "fr" ? "Accueil" : "Home";

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
      "name": "WePlanify",
      "url": SITE_URL
    },
    "about": {
      "@type": "SoftwareApplication",
      "name": "WePlanify",
      "applicationCategory": "TravelApplication",
      "operatingSystem": "Web, iOS, Android",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "EUR"
      }
    }
  };

  // BreadcrumbList Schema — Home > Feature (no /features index page exists)
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": homeLabel,
        "item": `${SITE_URL}/${locale}`
      },
      {
        "@type": "ListItem",
        "position": 2,
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
