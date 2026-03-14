import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Handle root path redirect
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  // Match:
  // - root path
  // - locale paths /fr, /en
  // - all other paths except api, _next, _vercel, studio, and static files
  matcher: [
    '/',
    '/(fr|en)',
    '/(fr|en)/:path*',
    '/((?!api|_next|_vercel|studio|.*\\..*).*)'
  ]
};
