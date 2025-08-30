/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,             // Check for changes every second
      aggregateTimeout: 300,  // Delay rebuild slightly
      ignored: /node_modules/ // Ignore noisy folders
    }
    return config
  },
}

module.exports = nextConfig
