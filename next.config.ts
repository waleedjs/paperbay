import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '192.168.18.169',
        port: '3000', // Specify the port if needed
      },
    ],
  },
};

export default nextConfig;
