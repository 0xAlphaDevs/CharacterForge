import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  transpilePackages: [
    "@tomo-inc/tomo-evm-kit",
    "@tomo-wallet/uikit-lite",
    "@tomo-inc/sharedtype",
  ],
};

export default nextConfig;
