/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 200, //In seconds
  },
}

module.exports = nextConfig
