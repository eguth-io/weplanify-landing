import { defineType } from "sanity";

export const home = defineType({
  name: "home",
  title: "Home",
  type: "document",
  fields: [
    {
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      initialValue: "Welcome to WePlanify",
    },
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "title2",
      title: "Title 2",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "buttonDemo",
      title: "Demo Button Text",
      type: "string",
      initialValue: "Try Demo",
    },
    {
      name: "blocks",
      title: "Content Blocks",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "tooltip",
              title: "Tooltip",
              type: "string",
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "text",
              title: "Text",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "link",
              title: "Link",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
});
