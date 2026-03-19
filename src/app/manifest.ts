import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

/**
 * Génère le manifest.json dynamiquement depuis Sanity pour PWA
 */
export default async function manifest(): Promise<MetadataRoute.Manifest> {
  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

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
