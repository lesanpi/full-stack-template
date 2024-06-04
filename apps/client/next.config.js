/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@avila-tek/ui', '@avila-tek/models'],
  experimental: {
    instrumentationHook: true,
  },
};

module.exports = nextConfig;
