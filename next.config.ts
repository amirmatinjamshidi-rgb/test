/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // This bypasses the proxy and private IP check entirely
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.rawg.io",
      },
    ],
  },
};

export default nextConfig;
