import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    // WP-330: consolidate the weak duplicate comparison article into the
    // stronger listicle (/alternatives/best-group-trip-planner-apps) to fix
    // the 'group trip planner' cannibalisation. Covers the served FR slug and
    // the EN canonical slug Google indexed.
    return [
      {
        source: '/:locale(en|fr)/blog/meilleures-applications-voyage-groupe',
        destination: '/:locale/alternatives/best-group-trip-planner-apps',
        permanent: true,
      },
      {
        source: '/:locale(en|fr)/blog/best-group-trip-planner-apps-comparison',
        destination: '/:locale/alternatives/best-group-trip-planner-apps',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // Cache agressif pour les pages (1 heure)
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=7200',
          },
        ],
      },
      // Cache encore plus agressif pour les assets statiques
      {
        source: '/(.*).(jpg|jpeg|png|gif|svg|webp|ico|woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // i18n.ts loads message JSON at runtime via fs.readdirSync(process.cwd()/messages/<locale>).
  // Next's static tracer can't follow that dynamic read, so the files were excluded from the
  // serverless bundles -> messages resolved to {} at runtime -> MISSING_MESSAGE -> 500 (only on
  // ISR/runtime renders, hence intermittent; build-time prerenders had the files on disk).
  // Force the message files into every route bundle so the runtime fs read finds them.
  outputFileTracingIncludes: {
    "/**": ["./messages/**/*.json"],
  },
};

export default withNextIntl(nextConfig);
