import { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { generateMetadataFromSanity } from "@/lib/metadata";
import RelatedFeatures from "@/components/RelatedFeatures";

// Feature client components (each is self-sufficient — reads its copy from messages)
import PollsFeature from "./features/PollsFeature";
import BudgetFeature from "./features/BudgetFeature";
import PlanningFeature from "./features/PlanningFeature";
import CollaborationFeature from "./features/CollaborationFeature";
import ExploreFeature from "./features/ExploreFeature";
import ItineraryFeature from "./features/ItineraryFeature";
import PackingFeature from "./features/PackingFeature";
import TransportFeature from "./features/TransportFeature";
import MemoriesFeature from "./features/MemoriesFeature";

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

// Memories is the only feature whose SEO copy isn't in a `<slug>Feature` page
// namespace (its component is fully hardcoded). en/fr authored here; new locales
// fall back to en.
const MEMORIES_SEO: Record<string, { title: string; description: string }> = {
  en: {
    title: "Collaborative Travel Photo Album & AI Travel Book",
    description:
      "Share group travel photos and create a personalized Travel Book with AI. Collaborative album, interactive map and organized memories.",
  },
  fr: {
    title: "Album Photo de Voyage Collaboratif & Travel Book IA",
    description:
      "Partagez vos photos de voyage en groupe et créez un Travel Book personnalisé grâce à l'IA. Album collaboratif, carte interactive et souvenirs organisés.",
  },
};

// Generate metadata with hreflang for SEO. Title/description come from the
// feature's message namespace (`<slug>Feature` → `page.seoTitle/seoDescription`).
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  const metadata = await generateMetadataFromSanity(locale, `/features/${slug}`);

  let title: string;
  let description: string;
  if (slug === "memories") {
    const seo = MEMORIES_SEO[locale] ?? MEMORIES_SEO.en;
    title = seo.title;
    description = seo.description;
  } else {
    const t = await getTranslations({ locale, namespace: `${slug}Feature` });
    title = t("page.seoTitle");
    description = t("page.seoDescription");
  }

  return {
    ...metadata,
    title,
    description,
    openGraph: { ...metadata.openGraph, title, description },
    twitter: { ...metadata.twitter, title, description },
  };
}

// Map slug to feature component
const featureComponents: Record<string, React.ComponentType> = {
  polls: PollsFeature,
  budget: BudgetFeature,
  planning: PlanningFeature,
  collaboration: CollaborationFeature,
  explore: ExploreFeature,
  itinerary: ItineraryFeature,
  packing: PackingFeature,
  transport: TransportFeature,
  memories: MemoriesFeature,
};

export default async function FeaturePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  const FeatureComponent = featureComponents[slug];
  if (!FeatureComponent) {
    notFound();
  }

  return (
    <>
      <FeatureComponent />
      <RelatedFeatures currentSlug={slug} locale={locale} />
    </>
  );
}
