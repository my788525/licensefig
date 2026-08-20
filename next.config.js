/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
  // Export mode does not need serverless build-trace collection; disabling it
  // avoids the heavy "Collecting build traces" step that can exhaust the
  // sandbox memory cap on large static-export sites.
  outputFileTracing: false,
}

module.exports = nextConfig
