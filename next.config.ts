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
      // WP-92: legacy article Google still requests (GSC 404). Same
      // consolidation as WP-330. The bare (unprefixed) URL is the one Google
      // indexed; it was a French article, hence the /fr destination.
      {
        source: '/:locale(en|fr)/blog/pourquoi-weplanify-est-plus-efficace',
        destination: '/:locale/alternatives/best-group-trip-planner-apps',
        permanent: true,
      },
      {
        source: '/blog/pourquoi-weplanify-est-plus-efficace',
        destination: '/fr/alternatives/best-group-trip-planner-apps',
        permanent: true,
      },
      // WP-92: /features has no index page, so the middleware's locale
      // redirect was landing on a 404. Features are showcased on the home.
      {
        source: '/:locale(en|es|fr|it|zh|de|pt|pl)/features',
        destination: '/:locale',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/en',
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
};

export default withNextIntl(nextConfig);
