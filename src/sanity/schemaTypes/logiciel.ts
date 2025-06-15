import { defineType } from "sanity";

export const logiciel = defineType({
  name: "logiciel",
  title: "Logiciel",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
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
