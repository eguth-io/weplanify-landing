import { defineType } from "sanity";

export const features = defineType({
  name: "features",
  title: "Features",
  type: "document",
  fields: [
    {
      name: "featuresList",
      title: "Features List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Title",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "icon",
              title: "Icon",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "imageMobile",
              title: "Mobile Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "imageDesktop",
              title: "Desktop Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
});
