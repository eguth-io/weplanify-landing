import { defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Auteur",
  type: "document",
  fields: [
    {
      name: "firstName",
      title: "Prénom",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: "lastName",
      title: "Nom",
      type: "string",
      validation: (Rule) => Rule.required().max(50),
    },
    {
      name: "avatar",
      title: "Avatar",
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
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "lastName",
      media: "avatar",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title: `${title} ${subtitle}`,
        media: media,
      };
    },
  },
});
