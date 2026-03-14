import { defineType } from "sanity";

export const featurePage = defineType({
  name: "featurePage",
  title: "Feature Pages",
  type: "document",
  fields: [
    // Language field for internationalization
    {
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true,
    },
    {
      name: "slug",
      title: "Slug",
      type: "string",
      description: "URL slug for the feature (e.g., 'polls', 'budget', 'ai-planning')",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Explore", value: "explore" },
          { title: "Polls", value: "polls" },
          { title: "Budget", value: "budget" },
          { title: "Packing", value: "packing" },
          { title: "Transport", value: "transport" },
          { title: "Itinerary", value: "itinerary" },
          { title: "AI Planning", value: "ai-planning" },
          { title: "Collaboration", value: "collaboration" },
        ],
      },
    },
    {
      name: "icon",
      title: "Icon Emoji",
      type: "string",
      description: "Emoji icon for the feature (e.g., '🗳️', '💰')",
    },
    {
      name: "accentColor",
      title: "Accent Color",
      type: "string",
      description: "Hex color for accents (e.g., '#8B5CF6')",
    },
    {
      name: "gradientFrom",
      title: "Gradient From Color",
      type: "string",
      description: "Starting gradient color (e.g., '#8B5CF6')",
    },
    // Hero Section
    {
      name: "heroBadge",
      title: "Hero Badge Text",
      type: "string",
      description: "Small badge text above the title (e.g., 'Live polls')",
    },
    {
      name: "heroTitle",
      title: "Hero Title - Line 1",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroTitleHighlight",
      title: "Hero Title - Highlighted Part",
      type: "string",
      description: "The colored/highlighted part of the title",
    },
    {
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
    },
    {
      name: "socialProofText",
      title: "Social Proof Text",
      type: "string",
      description: "e.g., '+50,000 decisions made this month'",
    },
    {
      name: "heroCta",
      title: "Hero CTA Text",
      type: "string",
    },
    {
      name: "heroCtaSubtext",
      title: "Hero CTA Subtext",
      type: "string",
      description: "Small text below CTA (e.g., 'Free - Ready in 30 seconds')",
    },
    // Social Proof Stats
    {
      name: "stats",
      title: "Social Proof Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    },
    // Features Section
    {
      name: "featuresTitle",
      title: "Features Section Title",
      type: "string",
    },
    {
      name: "features",
      title: "Features List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon Emoji", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "description", title: "Description", type: "text" },
          ],
        },
      ],
    },
    // FAQ Section
    {
      name: "faqItems",
      title: "FAQ Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "question", title: "Question", type: "string" },
            { name: "answer", title: "Answer", type: "text" },
          ],
        },
      ],
    },
    // Bottom CTA
    {
      name: "ctaTitle",
      title: "Bottom CTA Title",
      type: "string",
    },
    {
      name: "ctaSubtitle",
      title: "Bottom CTA Subtitle",
      type: "string",
    },
    {
      name: "ctaButton",
      title: "Bottom CTA Button Text",
      type: "string",
    },
    // SEO
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
    },
  ],
  preview: {
    select: {
      title: "heroTitle",
      slug: "slug",
      icon: "icon",
    },
    prepare({ title, slug, icon }) {
      return {
        title: `${icon || ""} ${title || slug}`,
        subtitle: `/features/${slug}`,
      };
    },
  },
});
