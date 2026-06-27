import { EguthFlags } from '@theogu/eguth-feature-flags';

// Singleton feature-flag client (Vision-controlled). Server-side only — the API
// key must never reach the browser. The home-hero A/B is driven by the
// `hero-search` flag (PERCENTAGE): enabled bucket = search variant, else the AI
// control. Rollout % and on/off are flipped remotely in Vision, no redeploy.
let flags: EguthFlags | null = null;

// Feature-flag exposures are plain tracking events ingested into Vision, where
// the flag analytics aggregate them into per-variant exposure + conversion
// breakdowns. The tracker key is bound to the same Vision app as the flags key,
// so exposures land where the analytics read them.
const EXPOSURE_INGEST_URL =
  process.env.EGUTH_TRACKER_URL ?? 'https://vision.eguth.io/api/events/ingest';
const EXPOSURE_API_KEY = process.env.EGUTH_TRACKER_API_KEY ?? '';

/**
 * Record a feature-flag exposure in Vision (which user saw which variant).
 * Returns the in-flight POST so the caller can `await` it (the middleware does,
 * to keep the edge function alive until ingest completes — Vercel may freeze
 * the function once the response is sent and silently drop a fire-and-forget
 * request). Fully best-effort: any failure is swallowed so analytics can never
 * break a render.
 *
 * Deduplication is the CALLER's job (via the `wp_exp` cookie in middleware) —
 * NOT the SDK's `onExposure` de-dupe, which only lives in the client instance's
 * memory and resets on every Vercel cold start / new lambda instance, so the
 * same visitor re-fired an exposure on every page load served by a fresh
 * instance. The cookie sentinel makes "once per visitor per variant" durable.
 */
export async function recordExposure(flagKey: string, variant: string, userId?: string): Promise<void> {
  // Vision attributes exposures by userId; skip anonymous evaluations.
  if (!EXPOSURE_API_KEY || !userId) return;

  try {
    await fetch(EXPOSURE_INGEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': EXPOSURE_API_KEY },
      body: JSON.stringify({
        events: [
          {
            name: 'feature_flag.exposure',
            userId,
            properties: { flag: flagKey, variant },
          },
        ],
      }),
    });
  } catch {
    // Best-effort analytics — never surface ingest failures.
  }
}

export function getFlags(): EguthFlags {
  if (flags) return flags;

  flags = new EguthFlags({
    app: 'weplanify',
    endpoint: process.env.EGUTH_FLAGS_URL ?? 'https://vision.eguth.io/api/flags/evaluate',
    apiKey: process.env.EGUTH_FLAGS_API_KEY ?? '',
    // Keep SSR snappy: if Vision is slow/unreachable we fall back to defaults
    // (control) rather than blocking the render.
    timeout: 1500,
    defaults: { 'hero-search': false },
    // No `onExposure`: the SDK de-dupes exposures only in per-instance memory,
    // which resets on every serverless cold start and floods Vision with
    // duplicate `feature_flag.exposure` events. Exposures are recorded once per
    // visitor by the middleware via a persistent cookie sentinel instead
    // (see `recordExposure` above + `src/middleware.ts`).
  });

  return flags;
}
