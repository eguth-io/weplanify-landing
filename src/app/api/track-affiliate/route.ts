import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Outbound affiliate clicks, recorded in Vision alongside the other landing
// events. The click leaves for a partner domain, so it's the last thing we can
// observe — the partner's own dashboard reports the conversion, and this event
// is what lets us join "which guide sent the click" to that revenue.
//
// Same contract as /api/track-conversion: the client beacons this same-origin
// route, we read `wp_vid` server-side so the visitor id never touches client
// JS, and we post to Vision with the landing app key.
const INGEST_URL =
  process.env.EGUTH_TRACKER_URL ?? 'https://vision.eguth.io/api/events/ingest';
const API_KEY =
  process.env.EGUTH_TRACKER_API_KEY ?? process.env.EGUTH_FLAGS_API_KEY ?? '';

const AFFILIATE_EVENT = 'landing.affiliate_click';

// The body comes from the browser, so nothing is trusted: values are clamped
// and the event name is fixed here rather than taken from the request.
const MAX_VALUE_LENGTH = 120;

const clean = (value: unknown): string | undefined => {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim().slice(0, MAX_VALUE_LENGTH);
  return trimmed.length > 0 ? trimmed : undefined;
};

export async function POST(request: Request) {
  if (!API_KEY) return new NextResponse(null, { status: 204 });

  const cookieStore = await cookies();
  const visitorId = cookieStore.get('wp_vid')?.value;
  if (!visitorId) return new NextResponse(null, { status: 204 });

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return new NextResponse(null, { status: 204 });
  }

  const partner = clean(body.partner);
  const placement = clean(body.placement);
  if (!partner || !placement) return new NextResponse(null, { status: 204 });

  const destination = clean(body.destination);
  const country = clean(body.country);

  try {
    await fetch(INGEST_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-API-Key': API_KEY },
      body: JSON.stringify({
        events: [
          {
            name: AFFILIATE_EVENT,
            userId: visitorId,
            properties: {
              partner,
              placement,
              ...(destination ? { destination } : {}),
              ...(country ? { country } : {}),
            },
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
