import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** Security headers applied to every response. */
const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Only widely recognized features: unknown ones (e.g. browsing-topics) log console errors in some browsers
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Only takes effect over HTTPS (ignored on http://localhost)
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder (e.g. NEXT_DIST_DIR=.next-perf) so a production
  // build can run without clobbering a dev server that uses .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Serve modern formats (AVIF, then WebP) from next/image
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Static images/icons in /public change rarely: cache for a week, revalidate in the background
        source: '/:file(images/.*|icon-.*\\.png|favicon\\.ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      // Use memory cache during development to prevent OneDrive file-locking collisions
      config.cache = {
        type: 'memory',
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
