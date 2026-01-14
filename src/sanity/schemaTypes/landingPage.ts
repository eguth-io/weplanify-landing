import { defineType } from "sanity";

// Types pour les previews
interface PreviewPrepareParams {
  [key: string]: string | undefined;
}

interface PositionLabels {
  [key: string]: string;
}

// Objet réutilisable pour le SEO de chaque section
const seoField = {
  name: "seo",
  title: "SEO (optionnel)",
  type: "object",
  description: "Optimisations SEO spécifiques pour cette section",
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: "title",
      title: "Titre SEO",
      type: "string",
      description: "Titre optimisé pour les moteurs de recherche (50-60 caractères)",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.max(60),
    },
    {
      name: "description",
      title: "Description SEO",
      type: "text",
      rows: 3,
      description: "Description pour les moteurs de recherche (150-160 caractères)",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      validation: (Rule: any) => Rule.max(160),
    },
    {
      name: "keywords",
      title: "Mots-clés",
      type: "array",
      of: [{ type: "string" }],
      description: "Mots-clés pertinents pour cette section",
      options: {
        layout: "tags",
      },
    },
    {
      name: "ogImage",
      title: "Image Open Graph",
      type: "image",
      description: "Image pour le partage social de cette section (optionnel)",
      options: {
        hotspot: true,
      },
    },
  ],
};

export const landingPage = defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero Section" },
    { name: "testimonialStats", title: "Testimonial & Stats" },
    { name: "worldSection", title: "Section Monde" },
    { name: "banner", title: "Bannière défilante" },
    { name: "features", title: "Fonctionnalités" },
    { name: "steps", title: "Étapes de voyage" },
    { name: "testimonials", title: "Témoignages" },
    { name: "cta", title: "CTA Banners" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    // ============================================
    // HERO SECTION
    // ============================================
    {
      name: "hero",
      title: "Hero Section",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "affiliateTag",
          title: "Tag Programme d'affiliation",
          type: "string",
          initialValue: "Programme d'affiliation disponible.",
        },
        {
          name: "title",
          title: "Titre principal",
          type: "text",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "ctaText",
          title: "Texte du bouton CTA",
          type: "string",
          initialValue: "Commencer mon voyage",
        },
        {
          name: "ctaUrl",
          title: "URL du bouton CTA",
          type: "string",
          description: "Destination du bouton (ex: #features, /signup, https://app.weplanify.com)",
        },
        {
          name: "backgroundImage",
          title: "Image de fond Hero",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
              description: "Description de l'image pour l'accessibilité et le SEO",
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // TESTIMONIAL & STATS SECTION
    // ============================================
    {
      name: "testimonialStats",
      title: "Testimonial & Stats",
      type: "object",
      group: "testimonialStats",
      fields: [
        {
          name: "featuredTestimonials",
          title: "Témoignages mis en avant",
          type: "array",
          description: "Liste de témoignages affichés avec navigation",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "quote",
                  title: "Citation",
                  type: "text",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "author",
                  title: "Auteur",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                },
                {
                  name: "authorRole",
                  title: "Rôle de l'auteur",
                  type: "string",
                  description: "Ex: 'Voyageuse passionnée', 'Digital nomad'",
                },
              ],
              preview: {
                select: {
                  author: "author",
                  quote: "quote",
                },
                prepare({ author, quote }) {
                  return {
                    title: author || "Anonyme",
                    subtitle: quote?.substring(0, 60) || "",
                  };
                },
              },
            },
          ],
          validation: (Rule) => Rule.min(1).max(10),
        },
        {
          name: "statsTitle",
          title: "Titre de la section Stats",
          type: "string",
          initialValue: "Chaque voyage mérite de commencer sereinement",
        },
        {
          name: "stats",
          title: "Statistiques",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "value",
                  title: "Valeur",
                  type: "string",
                  description: "Ex: 120+ ou 4.8",
                },
                {
                  name: "label",
                  title: "Libellé",
                  type: "string",
                },
                {
                  name: "showStar",
                  title: "Afficher une étoile",
                  type: "boolean",
                  initialValue: false,
                },
              ],
              preview: {
                select: {
                  value: "value",
                  label: "label",
                },
                prepare({ value, label }) {
                  return {
                    title: value || "Stat",
                    subtitle: label,
                  };
                },
              },
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // WORLD SECTION
    // ============================================
    {
      name: "worldSection",
      title: "Section Monde",
      type: "object",
      group: "worldSection",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "text",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "ctaText",
          title: "Texte du CTA",
          type: "string",
          initialValue: "Commencer mon voyage",
        },
        {
          name: "ctaUrl",
          title: "URL du CTA",
          type: "string",
        },
        {
          name: "images",
          title: "Images de destinations",
          type: "array",
          of: [
            {
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                },
                {
                  name: "caption",
                  title: "Légende",
                  type: "string",
                  description: "Nom de la destination (ex: 'Paris, France')",
                },
              ],
            },
          ],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validation: (Rule: any) => Rule.max(4),
        },
        seoField,
      ],
    },

    // ============================================
    // SCROLLING BANNER
    // ============================================
    {
      name: "banner",
      title: "Bannière défilante",
      type: "object",
      group: "banner",
      fields: [
        {
          name: "items",
          title: "Éléments de la bannière",
          type: "array",
          of: [{ type: "string" }],
          initialValue: [
            "LE MONDE, BIEN PLANIFIÉ",
            "VOYAGEZ SANS STRESS",
            "VOTRE ITINÉRAIRE, VOTRE RYTHME",
            "LA LIBERTÉ DE VOYAGER",
          ],
        },
        {
          name: "backgroundColor",
          title: "Couleur de fond",
          type: "string",
          description: "Code couleur hex (optionnel)",
        },
        {
          name: "textColor",
          title: "Couleur du texte",
          type: "string",
          description: "Code couleur hex (optionnel)",
        },
      ],
    },

    // ============================================
    // FEATURES SECTION
    // ============================================
    {
      name: "features",
      title: "Fonctionnalités",
      type: "object",
      group: "features",
      fields: [
        {
          name: "stackingCardsTitle",
          title: "Titre pour les cartes empilées",
          type: "string",
        },
        {
          name: "stackingCards",
          title: "Cartes de fonctionnalités",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "imagePosition",
                  title: "Position de l'image",
                  type: "string",
                  description: "Choisir si l'image s'affiche à gauche ou à droite",
                  options: {
                    list: [
                      { title: "Gauche", value: "left" },
                      { title: "Droite", value: "right" },
                    ],
                    layout: "radio",
                  },
                  initialValue: "left",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "title",
                  title: "Titre",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                  description: "Format recommandé: 800x600px (ratio 4:3)",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: "alt",
                      title: "Texte alternatif",
                      type: "string",
                    },
                  ],
                },
                {
                  name: "backgroundColor",
                  title: "Couleur de fond",
                  type: "string",
                  description: "Code couleur hex (ex: #EEF899, #FFFBF5, #61DBD5)",
                },
                {
                  name: "ctaLabel",
                  title: "Label du bouton CTA",
                  type: "string",
                  description: "Texte du bouton d'appel à l'action (optionnel)",
                },
                {
                  name: "ctaUrl",
                  title: "URL du bouton CTA",
                  type: "string",
                  description: "Lien de redirection du bouton (ex: /contact, https://example.com)",
                },
                {
                  name: "ctaTextColor",
                  title: "Couleur du texte du CTA",
                  type: "string",
                  description: "Code couleur hex (ex: #FFFFFF pour blanc)",
                },
                {
                  name: "ctaBackgroundColor",
                  title: "Couleur de fond du CTA",
                  type: "string",
                  description: "Code couleur hex (ex: #F6391A pour rouge)",
                },
                {
                  name: "stats",
                  title: "Statistiques",
                  type: "array",
                  description: "Petites statistiques affichées sous la description",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "value",
                          title: "Valeur",
                          type: "string",
                          description: "Ex: 120+, 4.8, 1000+",
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          validation: (Rule: any) => Rule.required(),
                        },
                        {
                          name: "label",
                          title: "Label",
                          type: "string",
                          description: "Ex: Destination possible, Utilisateurs actifs",
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          validation: (Rule: any) => Rule.required(),
                        },
                      ],
                      preview: {
                        select: {
                          value: "value",
                          label: "label",
                        },
                        prepare({ value, label }: PreviewPrepareParams) {
                          return {
                            title: value || "Stat",
                            subtitle: label,
                          };
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "title",
                  description: "description",
                  image: "image",
                  imagePosition: "imagePosition",
                },
                prepare({ title, description, image, imagePosition }: PreviewPrepareParams & { image?: string }) {
                  const positionLabel = imagePosition === "left" ? "📷 ← Gauche" : "📷 → Droite";
                  return {
                    title: title || "Carte sans titre",
                    subtitle: `${positionLabel} | ${description?.substring(0, 50) || ""}...`,
                    media: image,
                  };
                },
              },
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // TRAVEL STEPS (3 Cards Section)
    // ============================================
    {
      name: "travelSteps",
      title: "Section 3 Cartes",
      type: "object",
      group: "steps",
      fields: [
        {
          name: "title",
          title: "Titre principal",
          type: "text",
          description: "Titre affiché au-dessus des 3 cartes",
        },
        {
          name: "description",
          title: "Description principale",
          type: "text",
          description: "Description affichée sous le titre principal",
        },
        {
          name: "badge",
          title: "Badge",
          type: "string",
          description: "Texte du badge rouge (ex: 'Planification')",
        },
        // Carte 1 - Gauche (Blanc avec durée)
        {
          name: "card1",
          title: "Carte 1 (Gauche - Blanc)",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Titre",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "durationValue",
              title: "Valeur de durée",
              type: "string",
              description: "Ex: '10 min'",
            },
            {
              name: "durationLabel",
              title: "Label de durée",
              type: "string",
              description: "Ex: 'Minutes chrono'",
            },
          ],
        },
        // Carte 2 - Milieu (Blanc avec image)
        {
          name: "card2",
          title: "Carte 2 (Milieu - Image)",
          type: "object",
          fields: [
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: "alt",
                  title: "Texte alternatif",
                  type: "string",
                },
              ],
            },
          ],
        },
        // Carte 3 - Droite (Jaune avec statistique)
        {
          name: "card3",
          title: "Carte 3 (Droite - Jaune)",
          type: "object",
          fields: [
            {
              name: "title",
              title: "Titre",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
            },
            {
              name: "statValue",
              title: "Valeur statistique",
              type: "string",
              description: "Ex: '100+'",
            },
            {
              name: "statLabel",
              title: "Label statistique",
              type: "string",
              description: "Ex: 'Itinéraires partagés'",
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // TESTIMONIALS
    // ============================================
    {
      name: "testimonials",
      title: "Témoignages",
      type: "object",
      group: "testimonials",
      fields: [
        {
          name: "list",
          title: "Liste des témoignages",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "quote",
                  title: "Citation",
                  type: "text",
                },
                {
                  name: "author",
                  title: "Nom de l'auteur",
                  type: "string",
                },
                {
                  name: "role",
                  title: "Rôle/Description",
                  type: "string",
                },
                {
                  name: "image",
                  title: "Photo",
                  type: "image",
                  options: {
                    hotspot: true,
                  },
                  fields: [
                    {
                      name: "alt",
                      title: "Texte alternatif",
                      type: "string",
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  author: "author",
                  quote: "quote",
                  image: "image",
                },
                prepare({ author, quote, image }) {
                  return {
                    title: author || "Anonyme",
                    subtitle: `${quote?.substring(0, 60) || ""}...`,
                    media: image,
                  };
                },
              },
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // FEATURE IMAGE SECTION
    // ============================================
    {
      name: "featureImageSection",
      title: "Section Image avec Titre",
      type: "object",
      group: "features",
      fields: [
        {
          name: "title",
          title: "Titre",
          type: "text",
          description: "Titre affiché au-dessus de l'image",
        },
        {
          name: "image",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            },
          ],
        },
        seoField,
      ],
    },

    // ============================================
    // CTA BANNER
    // ============================================
    {
      name: "ctaBanner",
      title: "CTA Banner",
      type: "object",
      group: "cta",
      fields: [
        {
          name: "titlePart1",
          title: "Titre - Partie 1 (Blanc)",
          type: "string",
          description: "Première partie du titre en blanc (#FFFBF5)",
        },
        {
          name: "titlePart2",
          title: "Titre - Partie 2 (Bleu)",
          type: "string",
          description: "Deuxième partie du titre en bleu (#61DBD5)",
        },
        {
          name: "titlePart3",
          title: "Titre - Partie 3 (Blanc)",
          type: "string",
          description: "Troisième partie du titre en blanc (#FFFBF5)",
        },
        {
          name: "titlePart4",
          title: "Titre - Partie 4 (Jaune)",
          type: "string",
          description: "Quatrième partie du titre en jaune (#EEF899)",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
        },
        {
          name: "buttonText",
          title: "Texte du bouton",
          type: "string",
        },
        {
          name: "buttonUrl",
          title: "URL du bouton",
          type: "string",
        },
        {
          name: "backgroundImage",
          title: "Image de fond",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: "alt",
              title: "Texte alternatif",
              type: "string",
            },
          ],
        },
      ],
    },

    // ============================================
    // READY BANNER
    // ============================================
    {
      name: "readyBanner",
      title: "Ready Banner",
      type: "object",
      group: "cta",
      fields: [
        {
          name: "title",
          title: "Titre du Ready Banner",
          type: "text",
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          description: "Description optionnelle sous le titre",
        },
        {
          name: "badges",
          title: "Badges flottants",
          type: "array",
          description: "Badges animés qui suivent le curseur (max 4 recommandé)",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "emoji",
                  title: "Emoji",
                  type: "string",
                  description: "Ex: 🆕, 🌍, ⭐, ✈️",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "text",
                  title: "Texte",
                  type: "string",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "backgroundColor",
                  title: "Couleur de fond",
                  type: "string",
                  description: "Code couleur hex (ex: #F6391A, #61DBD5, #005939)",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "textColor",
                  title: "Couleur du texte",
                  type: "string",
                  description: "Code couleur hex (ex: #FFFFFF pour blanc, #001E13 pour vert foncé)",
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
                {
                  name: "position",
                  title: "Position",
                  type: "string",
                  description: "Position du badge dans la section",
                  options: {
                    list: [
                      { title: "En haut à gauche", value: "top-left" },
                      { title: "En haut à droite", value: "top-right" },
                      { title: "En bas à gauche", value: "bottom-left" },
                      { title: "En bas à droite", value: "bottom-right" },
                    ],
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  validation: (Rule: any) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  emoji: "emoji",
                  text: "text",
                  position: "position",
                },
                prepare({ emoji, text, position }: PreviewPrepareParams) {
                  const positionLabels: PositionLabels = {
                    "top-left": "↖️ Haut gauche",
                    "top-right": "↗️ Haut droite",
                    "bottom-left": "↙️ Bas gauche",
                    "bottom-right": "↘️ Bas droite",
                  };
                  return {
                    title: `${emoji} ${text}`,
                    subtitle: position ? (positionLabels[position] || position) : "",
                  };
                },
              },
            },
          ],
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          validation: (Rule: any) => Rule.max(4),
        },
        {
          name: "buttonText",
          title: "Texte du bouton",
          type: "string",
        },
        {
          name: "buttonUrl",
          title: "URL du bouton",
          type: "string",
        },
      ],
    },

    // ============================================
    // FAQ SECTION
    // ============================================
    {
      name: "faq",
      title: "FAQ Support",
      type: "object",
      group: "faq",
      fields: [
        {
          name: "title",
          title: "Titre de la section FAQ",
          type: "string",
        },
        {
          name: "items",
          title: "Questions fréquentes",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "question",
                  title: "Question",
                  type: "string",
                },
                {
                  name: "answer",
                  title: "Réponse",
                  type: "text",
                },
              ],
              preview: {
                select: {
                  question: "question",
                  answer: "answer",
                },
                prepare({ question, answer }) {
                  return {
                    title: question || "Question sans titre",
                    subtitle: answer?.substring(0, 60) || "",
                  };
                },
              },
            },
          ],
        },
        seoField,
      ],
    },
  ],
  preview: {
    select: {
      heroTitle: "hero.title",
    },
    prepare({ heroTitle }) {
      return {
        title: "Landing Page",
        subtitle: heroTitle || "Configuration de la page d'accueil",
      };
    },
  },
});
