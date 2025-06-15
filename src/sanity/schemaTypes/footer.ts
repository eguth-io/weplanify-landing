import { defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "subtitle",
      title: "Subtitle",
      type: "array",
      of: [{ type: "block" }],
    },
  ],
});
