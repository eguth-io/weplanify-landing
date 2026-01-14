import { defineType } from "sanity";

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: () => "🧭",
  groups: [
    {
      name: "header",
      title: "Header",
    },
    {
      name: "cta",
      title: "Call to Action",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    // ============================================
    // HEADER
    // ============================================
    {
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Site logo (SVG, PNG, or WebP format)",
      group: "header",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Alternative text for accessibility and SEO",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "navigationLinks",
      title: "Navigation Links",
      type: "array",
      description: "Main navigation menu items",
      group: "header",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Link Label",
              type: "string",
              description: "Text displayed for this link",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "linkType",
              title: "Link Type",
              type: "string",
              description: "Type of link (page or anchor)",
              options: {
                list: [
                  { title: "Page Link", value: "page" },
                  { title: "Anchor Link", value: "anchor" },
                ],
              },
              initialValue: "page",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "url",
              title: "URL",
              type: "string",
              description: "Link destination (e.g., '/about', or full URL)",
              hidden: ({ parent }) => parent?.linkType === "anchor",
              validation: (Rule) =>
                Rule.custom((url, context) => {
                  const parent = context.parent as { linkType?: string } | undefined;
                  const linkType = parent?.linkType;
                  if (linkType === "page" && !url) {
                    return "URL is required for page links";
                  }
                  return true;
                }),
            },
            {
              name: "anchorId",
              title: "Section à cibler",
              type: "string",
              description: "Sélectionnez la section vers laquelle rediriger",
              hidden: ({ parent }) => parent?.linkType !== "anchor",
              options: {
                list: [
                  { title: "Hero (Section d'accueil)", value: "hero" },
                  { title: "Avis (Témoignages & Stats)", value: "avis" },
                  { title: "Fonctionnement (Fonctionnalités)", value: "fonctionnement" },
                  { title: "Étapes", value: "etapes" },
                  { title: "FAQ", value: "faq" },
                ],
              },
              validation: (Rule) =>
                Rule.custom((anchorId, context) => {
                  const parent = context.parent as { linkType?: string } | undefined;
                  const linkType = parent?.linkType;
                  if (linkType === "anchor" && !anchorId) {
                    return "Section anchor is required for anchor links";
                  }
                  return true;
                }),
            },
            {
              name: "isExternal",
              title: "External Link",
              type: "boolean",
              description: "Check if this links to an external site",
              hidden: ({ parent }) => parent?.linkType === "anchor",
              initialValue: false,
            },
            {
              name: "openInNewTab",
              title: "Open in New Tab",
              type: "boolean",
              description: "Open link in a new browser tab",
              hidden: ({ parent }) => parent?.linkType === "anchor",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              label: "label",
              url: "url",
              anchorId: "anchorId",
              linkType: "linkType",
              isExternal: "isExternal",
            },
            prepare({ label, url, anchorId, linkType, isExternal }) {
              const destination = linkType === "anchor" ? `#${anchorId}` : url;
              const type = linkType === "anchor" ? "anchor" : isExternal ? "external" : "page";
              return {
                title: label || "Untitled Link",
                subtitle: `${destination || "No destination"} (${type})`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1).max(8),
    },

    // ============================================
    // CALL TO ACTION
    // ============================================
    {
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      description: "Primary call-to-action button in header",
      group: "cta",
      fields: [
        {
          name: "text",
          title: "Button Text",
          type: "string",
          description: "Text displayed on the button",
          validation: (Rule) => Rule.required().max(30),
        },
        {
          name: "url",
          title: "Button URL",
          type: "string",
          description: "Link destination",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "style",
          title: "Button Style",
          type: "string",
          description: "Visual style of the button",
          options: {
            list: [
              { title: "Primary (Orange)", value: "primary" },
              { title: "Secondary (Outline)", value: "secondary" },
              { title: "Light", value: "light" },
            ],
          },
          initialValue: "primary",
        },
        {
          name: "icon",
          title: "Show Icon",
          type: "boolean",
          description: "Display an icon with the button",
          initialValue: false,
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "mobileMenuLabel",
      title: "Mobile Menu Label",
      type: "string",
      description: "Accessible label for mobile menu button (e.g., 'Menu', 'Navigation')",
      group: "header",
      initialValue: "Menu",
    },

    // ============================================
    // SEO
    // ============================================
    {
      name: "headerSchema",
      title: "Header Schema Markup",
      type: "object",
      description: "Structured data for navigation (optional, for advanced SEO)",
      group: "seo",
      fields: [
        {
          name: "enableSchema",
          title: "Enable Schema Markup",
          type: "boolean",
          description: "Add JSON-LD structured data for SiteNavigationElement",
          initialValue: false,
        },
      ],
    },
  ],
  preview: {
    select: {
      logo: "logo",
      linksCount: "navigationLinks.length",
    },
    prepare({ logo, linksCount }) {
      return {
        title: "Navigation",
        subtitle: `${linksCount || 0} menu items`,
        media: logo,
      };
    },
  },
});
