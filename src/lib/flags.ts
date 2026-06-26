import { EguthFlags } from '@theogu/eguth-feature-flags';
import { after } from 'next/server';

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
 * Scheduled with `after()` so the serverless function stays alive until the
 * POST completes — otherwise Vercel may freeze the function once the response
 * is sent and silently drop the request. Fully best-effort: any failure is
 * swallowed so analytics can never break a render.
 */
function recordExposure(flagKey: string, variant: string, userId?: string): void {
  // Vision attributes exposures by userId; skip anonymous evaluations.
  if (!EXPOSURE_API_KEY || !userId) return;

  try {
    after(async () => {
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
    });
  } catch {
    // `after` is only available inside a request scope; ignore otherwise.
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
    // Record which users enter which variant so Vision can build per-variant
    // analytics. The SDK de-dupes per (flag, user, variant), so this fires at
    // most once per visitor per variant.
    onExposure: (e) => recordExposure(e.flagKey, e.variant, e.userId),
  });

  return flags;
}
