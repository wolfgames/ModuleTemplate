/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  // Use the name of your repository as the basePath
  basePath: isProd ? '/ModuleTemplate' : '',
  // Also use the repository name for the assetPrefix
  assetPrefix: isProd ? '/ModuleTemplate/' : '',
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  }
};

export default nextConfig;
