import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
