/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Remove the static export configuration
  experimental: {
    appDir: false,
  },
}

module.exports = nextConfig