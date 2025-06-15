import { defineType } from "sanity";

export const trips = defineType({
  name: "trips",
  title: "Trips",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "tripsList",
      title: "Trips List",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "firstName",
              title: "First Name",
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
            {
              name: "tripImage",
              title: "Trip Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
            {
              name: "description",
              title: "Description",
              type: "array",
              of: [{ type: "block" }],
            },
          ],
        },
      ],
    },
  ],
});
