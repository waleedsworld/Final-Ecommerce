/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Faster, smaller production bundles.
  swcMinify: true,
  compress: true,
  // Don't advertise the framework in response headers.
  poweredByHeader: false,
  // Allow next/image to optimise Sanity-hosted product imagery.
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        // Long-lived, immutable caching for static image/font assets.
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif|woff|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Sensible security/perf defaults for every route.
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
