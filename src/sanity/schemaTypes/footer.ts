import { defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  icon: () => "🦶",
  groups: [
    {
      name: "branding",
      title: "Branding",
    },
    {
      name: "links",
      title: "Navigation Links",
    },
    {
      name: "social",
      title: "Social Media",
    },
    {
      name: "cta",
      title: "Call to Action",
    },
    {
      name: "legal",
      title: "Legal",
    },
  ],
  fields: [
    // ============================================
    // BRANDING
    // ============================================
    {
      name: "logo",
      title: "Footer Logo",
      type: "image",
      description: "Logo displayed in footer (can be different from header logo)",
      group: "branding",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Short description or slogan (e.g., 'Your AI travel companion')",
      group: "branding",
      validation: (Rule) => Rule.max(100),
    },
    {
      name: "companyDescription",
      title: "Company Description",
      type: "text",
      rows: 3,
      description: "Brief description about your company (for SEO)",
      group: "branding",
      validation: (Rule) => Rule.max(200),
    },

    // ============================================
    // NAVIGATION LINKS
    // ============================================
    {
      name: "footerColumns",
      title: "Footer Columns",
      type: "array",
      description: "Organize links into columns",
      group: "links",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Column Title",
              type: "string",
              description: "Heading for this column (e.g., 'Product', 'Company', 'Resources')",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "links",
              title: "Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      title: "Link Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "url",
                      title: "URL",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: "isExternal",
                      title: "External Link",
                      type: "boolean",
                      initialValue: false,
                    },
                  ],
                  preview: {
                    select: {
                      label: "label",
                      url: "url",
                    },
                    prepare({ label, url }) {
                      return {
                        title: label || "Untitled Link",
                        subtitle: url,
                      };
                    },
                  },
                },
              ],
              validation: (Rule) => Rule.min(1).max(10),
            },
          ],
          preview: {
            select: {
              title: "title",
              linksCount: "links.length",
            },
            prepare({ title, linksCount }) {
              return {
                title: title || "Untitled Column",
                subtitle: `${linksCount || 0} links`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(5),
    },

    // ============================================
    // SOCIAL MEDIA
    // ============================================
    {
      name: "socialLinks",
      title: "Social Media Links",
      type: "array",
      description: "Social media profiles",
      group: "social",
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
                  { title: "Pinterest", value: "pinterest" },
                  { title: "Discord", value: "discord" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "Profile URL",
              type: "url",
              validation: (Rule) => Rule.required().uri({ scheme: ["https", "http"] }),
            },
            {
              name: "ariaLabel",
              title: "Accessible Label",
              type: "string",
              description: "Accessible label for screen readers (e.g., 'Follow us on Facebook')",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              platform: "platform",
              url: "url",
            },
            prepare({ platform, url }) {
              return {
                title: platform || "Social Link",
                subtitle: url,
              };
            },
          },
        },
      ],
    },

    // ============================================
    // CALL TO ACTION
    // ============================================
    {
      name: "ctaSection",
      title: "CTA Section",
      type: "object",
      description: "Optional call-to-action section in footer",
      group: "cta",
      fields: [
        {
          name: "showCta",
          title: "Show CTA Section",
          type: "boolean",
          description: "Display a CTA section in the footer",
          initialValue: false,
        },
        {
          name: "title",
          title: "CTA Title",
          type: "string",
          validation: (Rule) =>
            Rule.custom((title, context) => {
              // @ts-ignore
              if (context.parent?.showCta && !title) {
                return "Title is required when CTA is enabled";
              }
              return true;
            }),
        },
        {
          name: "description",
          title: "CTA Description",
          type: "text",
          rows: 2,
        },
        {
          name: "buttonText",
          title: "Button Text",
          type: "string",
          validation: (Rule) =>
            Rule.custom((text, context) => {
              // @ts-ignore
              if (context.parent?.showCta && !text) {
                return "Button text is required when CTA is enabled";
              }
              return true;
            }),
        },
        {
          name: "buttonUrl",
          title: "Button URL",
          type: "string",
          validation: (Rule) =>
            Rule.custom((url, context) => {
              // @ts-ignore
              if (context.parent?.showCta && !url) {
                return "Button URL is required when CTA is enabled";
              }
              return true;
            }),
        },
      ],
    },

    // ============================================
    // LEGAL
    // ============================================
    {
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Copyright notice (e.g., '© 2025 WePlanify. All rights reserved.')",
      group: "legal",
      initialValue: `© ${new Date().getFullYear()} WePlanify. All rights reserved.`,
    },
    {
      name: "legalLinks",
      title: "Legal Links",
      type: "array",
      description: "Privacy policy, terms of service, etc.",
      group: "legal",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Link Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              label: "label",
              url: "url",
            },
            prepare({ label, url }) {
              return {
                title: label || "Untitled Link",
                subtitle: url,
              };
            },
          },
        },
      ],
    },
    {
      name: "additionalLegalText",
      title: "Additional Legal Text",
      type: "text",
      rows: 2,
      description: "Optional additional legal disclaimers or notices",
      group: "legal",
    },
  ],
  preview: {
    select: {
      logo: "logo",
      tagline: "tagline",
      columnsCount: "footerColumns.length",
    },
    prepare({ logo, tagline, columnsCount }) {
      return {
        title: "Footer",
        subtitle: `${tagline || ""} • ${columnsCount || 0} columns`,
        media: logo,
      };
    },
  },
});
