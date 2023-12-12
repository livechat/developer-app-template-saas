/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    config.devtool = 'source-map'

    return config
  },
}

module.exports = nextConfig
