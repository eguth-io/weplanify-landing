import { FAQType } from "@/sanity/lib/type";

interface FAQStructuredDataProps {
  faq: FAQType;
}

export default function FAQStructuredData({ faq }: FAQStructuredDataProps) {
  // Génération des données structurées JSON-LD pour la FAQ
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.questions.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
          .map((block: any) => 
            block.children?.map((child: any) => child.text).join('') || ''
          )
          .join(' ')
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqStructuredData)
      }}
    />
  );
}
