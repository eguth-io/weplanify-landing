import { defineType } from "sanity";

export const ia = defineType({
  name: "ia",
  title: "IA",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "placeholder",
      title: "Placeholder",
      type: "text",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
});
