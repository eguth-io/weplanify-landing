import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

function pickLocaleFromAcceptLanguage(header: string | null): 'fr' | 'en' {
  if (!header) return 'en';
  const tags = header
    .split(',')
    .map((t) => {
      const [lang, ...params] = t.trim().split(';');
      const q = params.find((p) => p.trim().startsWith('q='));
      return { lang: lang.toLowerCase(), q: q ? parseFloat(q.split('=')[1]) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of tags) {
    if (lang.startsWith('fr')) return 'fr';
    if (lang.startsWith('en')) return 'en';
  }
  return 'en';
}

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/') {
    const locale = pickLocaleFromAcceptLanguage(request.headers.get('accept-language'));
    const target = new URL(`/${locale}`, request.url);
    // Preserve the querystring (utm_source=… etc.) across the locale redirect so
    // first-touch attribution survives the `/` → `/{locale}` hop.
    target.search = request.nextUrl.search;
    const response = NextResponse.redirect(target, 302);
    // Vary on Accept-Language so /en and /fr each get a fair shot at being the
    // canonical for their locale instead of one being a permanent redirect target.
    response.headers.set('Vary', 'Accept-Language');
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/',
    '/(fr|en)',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
