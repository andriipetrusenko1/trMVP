/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // For Netlify deployment with static export
  // NOTE: With 'export' mode, API routes will not work.
  // The AIAssistant component has a client-side fallback for this case.
  output: 'export',
  // Disable server components for static export
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig