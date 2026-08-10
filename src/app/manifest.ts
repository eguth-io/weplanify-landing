import { MetadataRoute } from "next";
import { SEO_SETTINGS } from "@/lib/site-content";

/**
 * Génère le manifest.json PWA à partir des réglages SEO locaux
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  try {
    const seoSettings = SEO_SETTINGS;

    return {
      name: seoSettings?.siteName || "WePlanify",
      short_name: seoSettings?.siteName || "WePlanify",
      description: seoSettings?.defaultDescription || "Plan group trips together. Collaborative itinerary, shared budget & group polls.",
      start_url: "/",
      display: "standalone",
      background_color: seoSettings?.manifest?.backgroundColor || "#FFFBF5",
      theme_color: seoSettings?.manifest?.themeColor || "#f6391a",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon",
        },
        {
          src: "/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };
  } catch (error) {
    console.error("Error generating manifest:", error);
    // Fallback manifest
    return {
      name: "WePlanify",
      short_name: "WePlanify",
      description: "Plan group trips together. Collaborative itinerary, shared budget & group polls.",
      start_url: "/",
      display: "standalone",
      background_color: "#FFFBF5",
      theme_color: "#f6391a",
      icons: [
        {
          src: "/favicon.ico",
          sizes: "any",
          type: "image/x-icon",
        },
      ],
    };
  }
}
