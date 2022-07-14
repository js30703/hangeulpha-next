/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    allowedHost: ["127.0.0.1:3000", "localhost:3000"],
  },
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }
    return config;
  },
};

module.exports = nextConfig;
