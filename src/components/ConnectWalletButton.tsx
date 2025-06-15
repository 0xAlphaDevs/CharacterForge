"use client";

import { useWalletClient } from "wagmi";
import { ConnectButton } from "@tomo-inc/tomo-evm-kit";

// example of how you would now use the fully setup sdk

export default function ConnectWalletButton() {
  const { data: wallet } = useWalletClient();
  console.log("Wallet Client:", wallet);

  return (
    <>
      <ConnectButton />
    </>
  );
}
