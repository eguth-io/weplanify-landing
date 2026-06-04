import { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { seoSettingsQuery } from "@/sanity/lib/query";
import { SeoSettings } from "@/sanity/lib/type";

// AI / LLM crawlers we explicitly welcome so our content can be indexed and
// cited by generative search engines (GEO). Notably Google-Extended controls
// whether Google can use the content for AI Overviews / Gemini grounding.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
];

/**
 * Génère le robots.txt dynamiquement depuis Sanity.
 * En plus de la règle `*`, on autorise explicitement les crawlers IA/LLM (GEO).
 */
export default async function robots(): Promise<MetadataRoute.Robots> {
  const buildRules = (
    allowIndexing: boolean
  ): MetadataRoute.Robots["rules"] => {
    if (!allowIndexing) {
      // Staging / indexing disabled: block everyone, AI crawlers included.
      return { userAgent: "*", disallow: "/" };
    }
    return [
      { userAgent: "*", allow: "/", disallow: ["/studio"] },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/studio"],
      })),
    ];
  };

  try {
    const seoSettings: SeoSettings = await client.fetch(seoSettingsQuery);

    const allowIndexing = seoSettings?.robotsSettings?.allowIndexing ?? true;
    const siteUrl = seoSettings?.siteUrl || "https://www.weplanify.com";

    return {
      rules: buildRules(allowIndexing),
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  } catch (error) {
    console.error("Error generating robots.txt:", error);
    // Fallback robots.txt
    return {
      rules: buildRules(true),
      sitemap: "https://www.weplanify.com/sitemap.xml",
    };
  }
}
