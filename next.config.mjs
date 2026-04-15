/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? `${process.env.LOCAL_API_HOST}/:path*`
          : `${process.env.API_HOST}/:path*`,
      },
    ];
  },
};

export default nextConfig;