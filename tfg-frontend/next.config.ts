import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8080';
    return [
      {
        // Intercepta cualquier llamada del frontend que empiece por /api/
        source: '/api/:path*',
        // Y la redirige internamente a tu backend
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
