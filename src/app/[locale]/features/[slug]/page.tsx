import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { featurePageQuery } from "@/sanity/lib/query";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { generateMetadataFromSanity } from "@/lib/metadata";
import RelatedFeatures from "@/components/RelatedFeatures";

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

// SEO overrides — optimised titles & descriptions (take precedence over Sanity)
const seoOverrides: Record<string, Record<string, { title: string; description: string }>> = {
  planning: {
    en: {
      title: "Group Trip Planner — Build Itineraries with AI | WePlanify",
      description:
        "Create your group trip itinerary in minutes. Drag-and-drop planning, AI suggestions, and real-time sync with your travel crew.",
    },
    fr: {
      title: "Planifier un Voyage de Groupe — Itinéraire IA | WePlanify",
      description:
        "Construisez votre itinéraire de groupe pas à pas ou laissez l'IA s'en charger. Collaboration en temps réel avec vos amis, prêt en quelques secondes.",
    },
  },
  polls: {
    en: {
      title: "Group Trip Polls — Decide Together Instantly | WePlanify",
      description:
        "End the group chat chaos. Create polls to decide destinations, activities & restaurants together. Real-time voting, instant results.",
    },
    fr: {
      title: "Sondages Voyage de Groupe — Décidez à Plusieurs | WePlanify",
      description:
        "Fini les débats sans fin. Créez un sondage, votez, c'est décidé. Destinations, dates, activités — tout le groupe donne son avis.",
    },
  },
  collaboration: {
    en: {
      title: "Plan a Group Trip Together — Like Google Docs | WePlanify",
      description:
        "Everyone edits the same trip in real time. No more screenshots, no more \"did you see my message?\" — just smooth group trip planning.",
    },
    fr: {
      title: "Planifier un Voyage à Plusieurs — Comme Google Docs | WePlanify",
      description:
        "Tout le groupe modifie le même voyage en temps réel. Fini les screenshots et les \"t'as vu mon message ?\". Planifiez enfin ensemble.",
    },
  },
};

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

  // Use override if available, otherwise fall back to Sanity
  const override = seoOverrides[slug]?.[locale];
  const title = override?.title ?? data.seoTitle;
  const description = override?.description ?? data.seoDescription;

  return {
    ...metadata,
    title,
    description,
    openGraph: {
      ...metadata.openGraph,
      title,
      description,
    },
    twitter: {
      ...metadata.twitter,
      title,
      description,
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

  return (
    <>
      <FeatureComponent data={data} />
      <RelatedFeatures currentSlug={slug} locale={locale} />
    </>
  );
}
