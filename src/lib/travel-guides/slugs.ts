/**
 * Slim localized-slug → API template-slug map for /travel-guides/[country].
 * Kept separate from data.ts so client components (StickyCTA) don't
 * pull in the ~6000-line country-guide payload.
 */
export type TravelGuideLocale = "en" | "fr";

export const travelGuideSlugIndex: Record<TravelGuideLocale, Record<string, string>> = {
  en: {
    japan: "japan",
    italy: "italy",
    spain: "spain",
    thailand: "thailand",
    portugal: "portugal",
    greece: "greece",
    morocco: "morocco",
    vietnam: "vietnam",
    mexico: "mexico",
    indonesia: "indonesia",
    croatia: "croatia",
    turkey: "turkey",
    iceland: "iceland",
    "costa-rica": "costa-rica",
    usa: "usa",
  },
  fr: {
    japon: "japan",
    italie: "italy",
    espagne: "spain",
    thailande: "thailand",
    portugal: "portugal",
    grece: "greece",
    maroc: "morocco",
    vietnam: "vietnam",
    mexique: "mexico",
    indonesie: "indonesia",
    croatie: "croatia",
    turquie: "turkey",
    islande: "iceland",
    "costa-rica": "costa-rica",
    "etats-unis": "usa",
  },
};
