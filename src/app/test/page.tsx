"use client";
import { custom, toHex } from "viem";
import { useWalletClient } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";

// example of how you would now use the fully setup sdk

export default function Test() {
  const { data: wallet } = useWalletClient();
  const { openConnectModal } = useConnectModal();

  async function setupStoryClient(): Promise<StoryClient> {
    const config: StoryConfig = {
      wallet: wallet,
      transport: custom(wallet!.transport),
      chainId: "aeneid",
    };
    const client = StoryClient.newClient(config);
    return client;
  }

  async function registerIp() {
    const client = await setupStoryClient();
    const response = await client.ipAsset.mintAndRegisterIp({
      // an NFT contract address created by the SPG
      spgNftContract: "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc",
      // https://docs.story.foundation/docs/ip-asset#adding-nft--ip-metadata-to-ip-asset
      ipMetadata: {
        ipMetadataURI: "test-uri",
        ipMetadataHash: toHex("test-metadata-hash", { size: 32 }),
        nftMetadataHash: toHex("test-nft-metadata-hash", { size: 32 }),
        nftMetadataURI: "test-nft-uri",
      },
    });
    console.log(
      `Root IPA created at tx hash ${response.txHash}, IPA ID: ${response.ipId}`
    );
  }

  return (
    <>
      test page
      <br />
      <button onClick={openConnectModal}>Connect Wallet</button>
      <br />
      <button onClick={registerIp}>Register IP</button>
    </>
  );
}
