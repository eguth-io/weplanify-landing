import { defineType } from "sanity";

export const avis = defineType({
  name: "avis",
  title: "Avis",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "testimonials",
      title: "Testimonials",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "name",
              title: "Name",
              type: "string",
            },
            {
              name: "profileImage",
              title: "Profile Image",
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
