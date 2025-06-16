import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL("https://replicate.delivery/**")],
  },

  transpilePackages: [
    "@tomo-inc/tomo-evm-kit",
    "@tomo-wallet/uikit-lite",
    "@tomo-inc/sharedtype",
  ],
};

export default nextConfig;
