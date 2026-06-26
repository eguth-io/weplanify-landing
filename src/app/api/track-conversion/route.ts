import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Landing-side conversion event for the home-hero A/B. The signup CTAs point to
// app.weplanify.com (a different origin), so we can't observe the actual
// account creation from here — but the click is the primary conversion the hero
// is meant to drive. We record it under the same Vision app + visitor id
// (`wp_vid`) as the `feature_flag.exposure` events, so the flag analytics can
// join exposure -> conversion per variant purely on userId.
//
// The visitor id never reaches the browser: the client beacons this same-origin
// route (cookies attached) and we read `wp_vid` server-side, mirroring the
// flags.ts ingest contract. The tracker key is the weplanify-landing Vision app
// key, reused from flag evaluation when no explicit tracker key is set.
const INGEST_URL =
  process.env.EGUTH_TRACKER_URL ?? 'https://vision.eguth.io/api/events/ingest';
const API_KEY =
  process.env.EGUTH_TRACKER_API_KEY ?? process.env.EGUTH_FLAGS_API_KEY ?? '';

const CONVERSION_EVENT = 'landing.signup_cta_click';

export async function POST() {
  if (!API_KEY) return new NextResponse(null, { status: 204 });

  const cookieStore = await cookies();
  const visitorId = cookieStore.get('wp_vid')?.value;
  if (!visitorId) return new NextResponse(null, { status: 204 });

  // Carry the assigned variant when known — not required for the userId-based
  // join, but handy for debugging in the raw event stream.
  const variant = cookieStore.get('hero_variant')?.value;

  try {
    await fetch(INGEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
      body: JSON.stringify({
        events: [
          {
            name: CONVERSION_EVENT,
            userId: visitorId,
            properties: { experiment: 'home_hero', ...(variant ? { variant } : {}) },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    });
  } catch {
    // Best-effort analytics — never surface ingest failures to the client.
  }

  return new NextResponse(null, { status: 204 });
}
