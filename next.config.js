/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['assets.nhle.com', 'a.espncdn.com'], // Add NFL/NFL related domains
  },
}

module.exports = nextConfig

