import * as Sentry from '@sentry/nextjs';

// Server + edge runtime Sentry init (App Router). No-ops without a DSN so local
// dev and PR previews without the env var stay silent.
const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

export function register(): void {
  if (!SENTRY_DSN) {
    return;
  }

  const options = {
    dsn: SENTRY_DSN,
    environment: process.env.NEXT_PUBLIC_ENV ?? process.env.VERCEL_ENV,
    release: process.env.NEXT_PUBLIC_SENTRY_RELEASE,
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1,
  };

  if (process.env.NEXT_RUNTIME === 'nodejs' || process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init(options);
  }
}

export const onRequestError = Sentry.captureRequestError;
