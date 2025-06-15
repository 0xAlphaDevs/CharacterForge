"use client";

import { useWalletClient } from "wagmi";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";
import { Button } from "./ui/button";

// example of how you would now use the fully setup sdk

export default function ConnectWalletButton() {
  const { data: wallet } = useWalletClient();
  console.log("Wallet Client:", wallet);
  const { openConnectModal } = useConnectModal();

  return (
    <>
      <Button onClick={openConnectModal} className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-xl">
        Connect Wallet
      </Button>
    </>
  );
}
