/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export because API Routes are in use.
  // If you re-enable this, /api/* will break.
  // output: 'export',

  eslint: {
    ignoreDuringBuilds: true,
  },

  // Keep this if you want to avoid Next/Image optimization, otherwise remove.
  images: { unoptimized: true },
};

module.exports = nextConfig;
