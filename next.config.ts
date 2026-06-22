import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './src/utils/cloudinaryLoader.ts',
  },
};

export default nextConfig;
