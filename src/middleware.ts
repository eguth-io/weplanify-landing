import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const HERO_VARIANT_COOKIE = 'hero_variant';
const VISITOR_ID_COOKIE = 'wp_vid';
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

  if (!request.cookies.get(VISITOR_ID_COOKIE)?.value) {
    response.cookies.set(VISITOR_ID_COOKIE, crypto.randomUUID(), HERO_COOKIE_OPTS);
  }
  return response;
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

export default function middleware(request: NextRequest) {
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
    return applyHeroExperiment(request, response);
  }

  return applyHeroExperiment(request, intlMiddleware(request));
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|it|zh|de|pt|pl)',
    '/(en|es|fr|it|zh|de|pt|pl)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
