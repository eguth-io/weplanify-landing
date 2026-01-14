import { defineType } from "sanity";

export const seoSettings = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  icon: () => "🔍",
  groups: [
    {
      name: "general",
      title: "General SEO",
    },
    {
      name: "openGraph",
      title: "Open Graph / Social",
    },
    {
      name: "structuredData",
      title: "Structured Data",
    },
    {
      name: "technical",
      title: "Technical SEO",
    },
    {
      name: "analytics",
      title: "Analytics & Tracking",
    },
  ],
  fields: [
    // ============================================
    // GENERAL SEO
    // ============================================
    {
      name: "siteName",
      title: "Site Name",
      type: "string",
      description: "Your brand/site name (e.g., 'WePlanify')",
      group: "general",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "defaultTitle",
      title: "Default Page Title",
      type: "string",
      description: "Default title for pages without custom titles",
      group: "general",
      validation: (Rule) => Rule.required().max(60),
    },
    {
      name: "titleTemplate",
      title: "Title Template",
      type: "string",
      description: "Template for page titles. Use %s for page title (e.g., '%s | WePlanify')",
      group: "general",
      initialValue: "%s | WePlanify",
    },
    {
      name: "defaultDescription",
      title: "Default Meta Description",
      type: "text",
      rows: 3,
      description: "Default description for pages without custom descriptions (155-160 chars recommended)",
      group: "general",
      validation: (Rule) => Rule.required().min(120).max(160),
    },
    {
      name: "keywords",
      title: "Meta Keywords",
      type: "array",
      of: [{ type: "string" }],
      description: "General keywords for your site (e.g., 'travel planning', 'AI assistant')",
      group: "general",
      options: {
        layout: "tags",
      },
    },
    {
      name: "language",
      title: "Site Language",
      type: "string",
      description: "Primary language code (e.g., 'fr', 'en', 'es')",
      group: "general",
      initialValue: "fr",
      validation: (Rule) => Rule.required(),
    },

    // ============================================
    // OPEN GRAPH / SOCIAL
    // ============================================
    {
      name: "ogImage",
      title: "Default Open Graph Image",
      type: "image",
      description: "Default image for social sharing (1200x630px recommended)",
      group: "openGraph",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
        },
      ],
    },
    {
      name: "ogType",
      title: "Open Graph Type",
      type: "string",
      description: "Type of content",
      group: "openGraph",
      initialValue: "website",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Article", value: "article" },
          { title: "Product", value: "product" },
        ],
      },
    },
    {
      name: "twitterCard",
      title: "Twitter Card Type",
      type: "string",
      description: "Twitter card style",
      group: "openGraph",
      initialValue: "summary_large_image",
      options: {
        list: [
          { title: "Summary", value: "summary" },
          { title: "Summary with Large Image", value: "summary_large_image" },
          { title: "App", value: "app" },
        ],
      },
    },
    {
      name: "twitterHandle",
      title: "Twitter Handle",
      type: "string",
      description: "Your Twitter/X username (e.g., '@weplanify')",
      group: "openGraph",
      validation: (Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Rule.custom((value: any) => {
          if (!value) return true;
          if (typeof value === 'string' && !value.startsWith("@")) {
            return "Twitter handle must start with @";
          }
          return true;
        }),
    },
    {
      name: "facebookAppId",
      title: "Facebook App ID",
      type: "string",
      description: "Facebook App ID for Facebook Insights",
      group: "openGraph",
    },

    // ============================================
    // STRUCTURED DATA
    // ============================================
    {
      name: "organizationName",
      title: "Organization Name",
      type: "string",
      description: "Legal name of your organization",
      group: "structuredData",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "organizationLogo",
      title: "Organization Logo",
      type: "image",
      description: "Company logo for structured data (square format recommended)",
      group: "structuredData",
      options: {
        hotspot: true,
      },
    },
    {
      name: "organizationUrl",
      title: "Organization URL",
      type: "url",
      description: "Main website URL (e.g., 'https://weplanify.com')",
      group: "structuredData",
      validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
    },
    {
      name: "organizationSocialLinks",
      title: "Social Media Profiles",
      type: "array",
      description: "Official social media profile URLs for structured data",
      group: "structuredData",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Facebook", value: "facebook" },
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "TikTok", value: "tiktok" },
                ],
              },
            },
            {
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
            },
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform || "Social Profile",
                subtitle: url,
              };
            },
          },
        },
      ],
    },
    {
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "Public contact email for structured data",
      group: "structuredData",
      validation: (Rule) => Rule.email(),
    },
    {
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
      description: "Public contact phone number",
      group: "structuredData",
    },

    // ============================================
    // TECHNICAL SEO
    // ============================================
    {
      name: "siteUrl",
      title: "Site URL",
      type: "url",
      description: "Full canonical URL of your site (e.g., 'https://weplanify.com')",
      group: "technical",
      validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
    },
    {
      name: "robotsSettings",
      title: "Robots Settings",
      type: "object",
      group: "technical",
      fields: [
        {
          name: "allowIndexing",
          title: "Allow Search Engine Indexing",
          type: "boolean",
          description: "If disabled, adds 'noindex, nofollow' to all pages",
          initialValue: true,
        },
        {
          name: "customRobotsTxt",
          title: "Custom robots.txt Content",
          type: "text",
          rows: 5,
          description: "Custom rules for robots.txt file",
        },
      ],
    },
    {
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Site favicon (32x32px or 64x64px, .ico or .png)",
      group: "technical",
      options: {
        accept: "image/x-icon,image/png",
      },
    },
    {
      name: "appleTouchIcon",
      title: "Apple Touch Icon",
      type: "image",
      description: "Icon for iOS devices (180x180px recommended)",
      group: "technical",
    },
    {
      name: "manifest",
      title: "Web App Manifest",
      type: "object",
      group: "technical",
      description: "Settings for Progressive Web App",
      fields: [
        {
          name: "themeColor",
          title: "Theme Color",
          type: "string",
          description: "Browser theme color (hex code, e.g., '#f6391a')",
          initialValue: "#f6391a",
        },
        {
          name: "backgroundColor",
          title: "Background Color",
          type: "string",
          description: "Background color for splash screen",
          initialValue: "#FFFBF5",
        },
      ],
    },

    // ============================================
    // ANALYTICS & TRACKING
    // ============================================
    {
      name: "googleAnalyticsId",
      title: "Google Analytics ID",
      type: "string",
      description: "Google Analytics Measurement ID (e.g., 'G-XXXXXXXXXX')",
      group: "analytics",
      validation: (Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Rule.custom((value: any) => {
          if (!value) return true;
          if (typeof value === 'string' && !value.match(/^G-[A-Z0-9]+$/)) {
            return "Must be a valid GA4 Measurement ID (e.g., G-XXXXXXXXXX)";
          }
          return true;
        }),
    },
    {
      name: "googleTagManagerId",
      title: "Google Tag Manager ID",
      type: "string",
      description: "GTM Container ID (e.g., 'GTM-XXXXXXX')",
      group: "analytics",
      validation: (Rule) =>
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Rule.custom((value: any) => {
          if (!value) return true;
          if (typeof value === 'string' && !value.match(/^GTM-[A-Z0-9]+$/)) {
            return "Must be a valid GTM ID (e.g., GTM-XXXXXXX)";
          }
          return true;
        }),
    },
    {
      name: "facebookPixelId",
      title: "Facebook Pixel ID",
      type: "string",
      description: "Facebook Pixel ID for tracking",
      group: "analytics",
    },
    {
      name: "hotjarId",
      title: "Hotjar Site ID",
      type: "string",
      description: "Hotjar tracking ID",
      group: "analytics",
    },
    {
      name: "microsoftClarityId",
      title: "Microsoft Clarity ID",
      type: "string",
      description: "Microsoft Clarity project ID",
      group: "analytics",
    },
  ],
  preview: {
    prepare() {
      return {
        title: "SEO Settings",
        subtitle: "Global SEO configuration",
      };
    },
  },
});
