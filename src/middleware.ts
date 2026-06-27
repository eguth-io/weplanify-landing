import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { getFlags, recordExposure } from './lib/flags';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const HERO_VARIANT_COOKIE = 'hero_variant';
const VISITOR_ID_COOKIE = 'wp_vid';
// Sentinel marking that a `feature_flag.exposure` was already recorded in Vision
// for this visitor + variant. Persisted as a cookie so the de-dupe survives
// serverless cold starts (the SDK's in-memory de-dupe does not), giving a true
// "once per visitor per variant" exposure instead of once-per-lambda-instance.
const EXPOSURE_COOKIE = 'wp_exp';
const HERO_COOKIE_OPTS = { path: '/', maxAge: 60 * 60 * 24 * 180, sameSite: 'lax' as const };

/**
 * Prepare the home-hero A/B experiment for this request.
 *
 * - `?hero=ai|search` is an explicit override (QA / dark-launch) and is made
 *   sticky via a cookie so the chosen variant survives funnel navigation.
 * - Ensures a stable anonymous visitor id (`wp_vid`). The page resolves the
 *   variant deterministically from this id via the `hero-search` feature flag
 *   (Vision) — the on/off + rollout % are controlled remotely, nothing is
 *   decided here. The `/` → `/{locale}` redirect carries the new cookie so the
 *   landing request that renders the hero already sees it.
 */
function applyHeroExperiment(request: NextRequest, response: NextResponse): NextResponse {
  const override = request.nextUrl.searchParams.get('hero');
  if (override === 'ai' || override === 'search') {
    response.cookies.set(HERO_VARIANT_COOKIE, override, HERO_COOKIE_OPTS);
  }

  let visitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    response.cookies.set(VISITOR_ID_COOKIE, visitorId, HERO_COOKIE_OPTS);
  }
  return response;
}

/**
 * Record the home-hero `feature_flag.exposure` at most once per visitor per
 * variant, gated by the `wp_exp` cookie. Only fires when the variant is decided
 * by the flag itself — explicit `?hero=` / sticky `hero_variant` overrides
 * (QA / dark-launch) are not part of the experiment and must not pollute it.
 *
 * Best-effort and never throws: a flag-eval or ingest failure must not break the
 * page render or the redirect.
 */
async function recordHeroExposure(request: NextRequest, response: NextResponse): Promise<void> {
  const override = request.nextUrl.searchParams.get('hero');
  const sticky = request.cookies.get(HERO_VARIANT_COOKIE)?.value;
  if (override === 'ai' || override === 'search' || sticky === 'ai' || sticky === 'search') {
    return;
  }

  const visitorId = request.cookies.get(VISITOR_ID_COOKIE)?.value
    ?? response.cookies.get(VISITOR_ID_COOKIE)?.value;
  if (!visitorId) return;

  try {
    const flags = getFlags();
    await flags.prefetch();
    const variant = flags.isEnabled('hero-search', { userId: visitorId }) ? 'search' : 'ai';

    // Already recorded this exact (visitor, variant)? Nothing to do. A variant
    // flip (rollout % change) writes a new sentinel and records once more.
    if (request.cookies.get(EXPOSURE_COOKIE)?.value === variant) return;

    // Set the sentinel on this response and await the ingest before returning,
    // so the edge function isn't frozen mid-POST. Cookie + ingest are coupled:
    // we only mark "recorded" when we actually attempted the record.
    response.cookies.set(EXPOSURE_COOKIE, variant, HERO_COOKIE_OPTS);
    await recordExposure('hero-search', variant, visitorId);
  } catch {
    // Best-effort — flag eval / ingest failures never break the request.
  }
}

function pickLocaleFromAcceptLanguage(header: string | null): string {
  if (!header) return routing.defaultLocale;
  const tags = header
    .split(',')
    .map((t) => {
      const [lang, ...params] = t.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: lang.toLowerCase(), q: q ? parseFloat(q.split('=')[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of tags) {
    const match = routing.locales.find((l) => lang === l || lang.startsWith(`${l}-`));
    if (match) return match;
  }
  return routing.defaultLocale;
}

/** The hero (and its A/B experiment) is rendered only at the locale root, e.g. `/fr`, `/en`. */
function isHeroPath(pathname: string): boolean {
  return routing.locales.some((l) => pathname === `/${l}`);
}

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const locale = pickLocaleFromAcceptLanguage(request.headers.get('accept-language'));
    const target = new URL(`/${locale}`, request.url);
    // Preserve the querystring (utm_source=… etc.) across the locale redirect so
    // first-touch attribution survives the `/` → `/{locale}` hop.
    target.search = request.nextUrl.search;
    const response = NextResponse.redirect(target, 302);
    // Vary on Accept-Language so each locale gets a fair shot at being the
    // canonical for its language instead of one being a permanent redirect target.
    response.headers.set('Vary', 'Accept-Language');
    // The hero renders on the redirected `/{locale}` request, not here — defer
    // the exposure to that request so we don't double-record across the hop.
    return applyHeroExperiment(request, response);
  }

  const response = applyHeroExperiment(request, intlMiddleware(request));
  if (isHeroPath(request.nextUrl.pathname)) {
    await recordHeroExposure(request, response);
  }
  return response;
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|it|zh|de|pt|pl)',
    '/(en|es|fr|it|zh|de|pt|pl)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
