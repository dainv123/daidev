/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    forceSwcTransforms: true,
  },
  output: 'standalone',
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
  // Serve static files from public/assets
  async rewrites() {
    return [
      // Only proxy /api if no external API URL is set
      ...(process.env.NEXT_PUBLIC_API_URL ? [] : [{
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/v1/:path*',
      }]),
      // Serve static assets
      {
        source: '/assets/:path*',
        destination: '/public/assets/:path*',
      },
    ];
  },
  // Add headers for static files
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig; 