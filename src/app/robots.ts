import { MetadataRoute } from "next";
import { SEO_SETTINGS } from "@/lib/site-content";

// AI / LLM crawlers we explicitly welcome so our content can be indexed and
// cited by generative search engines (GEO). Notably Google-Extended controls
// whether Google can use the content for AI Overviews / Gemini grounding.
//
// Two kinds live here and the distinction matters when adding one:
//  - Crawlers that CITE (OAI-SearchBot, Claude-SearchBot, PerplexityBot,
//    Google-Extended, YouBot, Applebot-Extended, meta-externalagent) fetch to
//    answer a live query and link back — those are the ones WP-137 is about.
//  - Crawlers that only TRAIN (GPTBot, ClaudeBot, CCBot) give no attribution.
//    Allowing them is a deliberate bet on being in the weights, not a traffic
//    play. Don't add one without that reason: cohere-ai and Bytespider were
//    dropped because they cost bandwidth and cite nothing back to us.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Claude-SearchBot",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Amazonbot",
  "YouBot",
];

/**
 * Génère le robots.txt à partir des réglages SEO locaux.
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
    const seoSettings = SEO_SETTINGS;

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
