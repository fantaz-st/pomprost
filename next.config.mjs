/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cms.pfst.hr",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "pomprost-be.pfst.hr",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
