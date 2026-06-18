import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const HERO_VARIANT_COOKIE = 'hero_variant';
const HERO_VARIANTS = ['ai', 'search'] as const;
const HERO_COOKIE_OPTS = { path: '/', maxAge: 60 * 60 * 24 * 180, sameSite: 'lax' as const };

// Off by default: the first deploy ships the search variant dark — everyone
// stays on the control (AI) and only `?hero=search` reaches it. Flip to "true"
// to start enrolling real visitors in the 50/50 experiment.
const HERO_AB_ENABLED = process.env.HERO_AB_ENABLED === 'true';

/**
 * Resolve the home-hero A/B variant for this request and persist it in a cookie.
 *
 * - `?hero=ai|search` is an explicit override (QA / dark-launch testing) and is
 *   made sticky so the chosen variant survives navigation across the funnel.
 * - Otherwise, only when the experiment is enabled do we enroll the visitor in a
 *   stable 50/50 bucket. While disabled, no cookie is set → the page defaults to
 *   the control.
 */
function assignHeroVariant(request: NextRequest, response: NextResponse): NextResponse {
  const override = request.nextUrl.searchParams.get('hero');
  if (override === 'ai' || override === 'search') {
    response.cookies.set(HERO_VARIANT_COOKIE, override, HERO_COOKIE_OPTS);
    return response;
  }

  if (!HERO_AB_ENABLED) {
    return response;
  }

  const current = request.cookies.get(HERO_VARIANT_COOKIE)?.value;
  if (!HERO_VARIANTS.includes(current as (typeof HERO_VARIANTS)[number])) {
    const assigned = Math.random() < 0.5 ? 'ai' : 'search';
    response.cookies.set(HERO_VARIANT_COOKIE, assigned, HERO_COOKIE_OPTS);
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
    return assignHeroVariant(request, response);
  }

  return assignHeroVariant(request, intlMiddleware(request));
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|it|zh|de|pt|pl)',
    '/(en|es|fr|it|zh|de|pt|pl)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
