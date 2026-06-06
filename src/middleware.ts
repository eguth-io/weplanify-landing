import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

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
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(en|es|fr|it|zh|de|pt|ru|pl)',
    '/(en|es|fr|it|zh|de|pt|ru|pl)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
