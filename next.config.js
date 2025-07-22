/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/ModuleTemplate',
  assetPrefix: '/ModuleTemplate/',
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  }
};

export default nextConfig;
