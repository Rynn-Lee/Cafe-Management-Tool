/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 50000, //In seconds
  },
}

module.exports = nextConfig
