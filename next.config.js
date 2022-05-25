/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.rawg.io', 'static-cdn.jtvnw.net/'],
  },
};

module.exports = nextConfig;
