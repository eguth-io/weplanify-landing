import { after } from 'next/server';

// A/B experiment instrumentation → eguth Vision. Mirrors the backend's
// EguthTrackerService contract: POST /api/events/ingest, `X-API-Key` auth, body
// `{ events: [{ name, properties, userId, timestamp }] }`. The landing's Vision
// key is scoped to the `weplanify-landing` app and is already provisioned for
// flag evaluation, so we reuse it for ingest unless an explicit tracker key is
// set. Server-only: the API key must never reach the browser.
const INGEST_URL =
  process.env.EGUTH_TRACKER_URL ?? 'https://vision.eguth.io/api/events/ingest';
const API_KEY =
  process.env.EGUTH_TRACKER_API_KEY ?? process.env.EGUTH_FLAGS_API_KEY ?? '';

const EXPERIMENT = 'home_hero';
const FLAG = 'hero-search';

/**
 * Record an A/B exposure for the home-hero experiment, keyed by the stable
 * `wp_vid` visitor id so the Vision experiments dashboard can compute
 * conversion per variant (dedup at query time on distinct userId).
 *
 * Fire-and-forget: the POST is scheduled with `after()` so it runs after the
 * response and never blocks SSR, and the call silently no-ops when Vision is
 * unconfigured (e.g. local dev without a key) or the visitor id is missing.
 */
export function trackExposure(visitorId: string, variant: 'ai' | 'search'): void {
  if (!API_KEY || !visitorId) return;

  after(async () => {
    try {
      await fetch(INGEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
        body: JSON.stringify({
          events: [
            {
              name: 'experiment.exposed',
              userId: visitorId,
              properties: { experiment: EXPERIMENT, flag: FLAG, variant },
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
    } catch {
      // Analytics must never break the page — swallow errors.
    }
  });
}
