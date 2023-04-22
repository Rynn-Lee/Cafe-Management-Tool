/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    minimumCacheTTL: 5000, //In seconds
  },
}

module.exports = nextConfig
