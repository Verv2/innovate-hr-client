import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost:3000/",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        pathname: "**",
      },
    ],
  },
  // images: {
  //   domains: ["localhost", "res.cloudinary.com", "i.pinimg.com"],
  // },
};

export default nextConfig;
