import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { featurePageQuery } from "@/sanity/lib/query";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { generateMetadataFromSanity } from "@/lib/metadata";

// Feature client components
import PollsFeature from "./features/PollsFeature";
import BudgetFeature from "./features/BudgetFeature";
import PlanningFeature from "./features/PlanningFeature";
import CollaborationFeature from "./features/CollaborationFeature";
import ExploreFeature from "./features/ExploreFeature";
import ItineraryFeature from "./features/ItineraryFeature";
import PackingFeature from "./features/PackingFeature";
import TransportFeature from "./features/TransportFeature";
import MemoriesFeature from "./features/MemoriesFeature";

// Types
interface FeaturePageData {
  slug: string;
  icon: string;
  accentColor: string;
  gradientFrom: string;
  heroBadge: string;
  heroTitle: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  socialProofText: string;
  heroCta: string;
  heroCtaSubtext: string;
  stats: { value: string; label: string }[];
  featuresTitle: string;
  features: { icon: string; title: string; description: string }[];
  faqItems: { question: string; answer: string }[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
  seoTitle: string;
  seoDescription: string;
}

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Valid slugs
const validSlugs = [
  "planning",
  "budget",
  "collaboration",
  "explore",
  "itinerary",
  "packing",
  "polls",
  "transport",
  "memories",
];

// Generate static params for all locale/slug combinations
export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const slug of validSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

// Generate metadata with hreflang for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  // Fetch SEO data from Sanity
  const data = await client.fetch<FeaturePageData | null>(featurePageQuery, {
    locale,
    slug,
  });

  if (!data) {
    return {
      title: "Feature Not Found",
    };
  }

  const metadata = await generateMetadataFromSanity(locale, `/features/${slug}`);

  return {
    ...metadata,
    title: data.seoTitle,
    description: data.seoDescription,
    openGraph: {
      ...metadata.openGraph,
      title: data.seoTitle,
      description: data.seoDescription,
    },
    twitter: {
      ...metadata.twitter,
      title: data.seoTitle,
      description: data.seoDescription,
    },
  };
}

// Map slug to feature component
const featureComponents: Record<string, React.ComponentType<{ data: FeaturePageData }>> = {
  "polls": PollsFeature,
  "budget": BudgetFeature,
  "planning": PlanningFeature,
  "collaboration": CollaborationFeature,
  "explore": ExploreFeature,
  "itinerary": ItineraryFeature,
  "packing": PackingFeature,
  "transport": TransportFeature,
  "memories": MemoriesFeature,
};

export default async function FeaturePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Validate slug
  if (!validSlugs.includes(slug)) {
    notFound();
  }

  // Fetch feature page data from Sanity
  const data = await client.fetch<FeaturePageData | null>(featurePageQuery, {
    locale,
    slug,
  });

  if (!data) {
    notFound();
  }

  // Get the appropriate feature component
  const FeatureComponent = featureComponents[slug];

  if (!FeatureComponent) {
    notFound();
  }

  return <FeatureComponent data={data} />;
}
