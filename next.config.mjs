/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // Temporarily disabled for development
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
