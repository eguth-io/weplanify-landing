import { defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Article de Blog",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Titre",
      type: "string",
      validation: (Rule) => Rule.required().max(100),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "excerpt",
      title: "Extrait",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.max(400),
    },
    {
      name: "readTime",
      title: "Temps de lecture",
      type: "string",
      initialValue: "5 min de lecture",
    },
    {
      name: "content",
      title: "Contenu HTML",
      type: "text",
      rows: 20,
      description: "Contenu de l'article en HTML. Utilisez les balises h2, h3, p, strong, etc.",
    },
    {
      name: "heroImage",
      title: "Image mise en avant",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texte alternatif",
        },
      ],
    },
    {
      name: "publishedAt",
      title: "Date de publication",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "author",
      title: "Auteur",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
          validation: (Rule) => Rule.max(60),
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
          validation: (Rule) => Rule.max(160),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "featuredImage",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { title, media, publishedAt } = selection;
      return {
        title: title,
        media: media,
        subtitle: publishedAt
          ? new Date(publishedAt).toLocaleDateString("fr-FR")
          : "Non publié",
      };
    },
  },
  orderings: [
    {
      title: "Date de publication (plus récent)",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Date de publication (plus ancien)",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
    {
      title: "Titre A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
});
