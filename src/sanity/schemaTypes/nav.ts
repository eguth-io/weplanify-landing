import { defineType } from "sanity";

export const nav = defineType({
  name: "nav",
  title: "Nav",
  type: "document",
  fields: [
    {
      name: "logo",
      title: "logo",
      type: "image",
    },
    {
      name: "connexionLink",
      title: "Lien bouton connexion",
      type: "string",
    },
    {
      name: "ctaButton",
      title: "Bouton CTA",
      type: "string",
    },
    {
      name: "ctaLink",
      title: "Lien bouton CTA",
      type: "string",
    },
  ],
});
