"use client";
import { custom, toHex } from "viem";
import { useWalletClient } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { useConnectModal } from "@tomo-inc/tomo-evm-kit";

// example of how you would now use the fully setup sdk
export default function Test() {
  const { data: wallet } = useWalletClient();
  const { openConnectModal } = useConnectModal();

  async function generateImage(
    prompt: string
  ): Promise<{ imageUrl: string } | null> {
    try {
      const response = await fetch(
        `/api/generate-image?prompt=${encodeURIComponent(prompt)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Image generation failed");
      }

      return data;
    } catch (error) {
      console.error("Frontend error:", error);
      alert("Failed to generate image. Try again later.");
      return null;
    }
  }

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
      <br />
      <button onClick={openConnectModal}>Connect Wallet</button>

      <br />
      <button onClick={registerIp}>Register IP</button>
      <br />
      <button
        onClick={async () => {
          const imageUrl = await generateImage(
            "1boy, fiery red hair, glowing eyes, katana on back, tattered cloak, flame particles, burned battlefield background, standing, upper body, intense expression, anime style, dramatic lighting, fire-themed character design"
          );
          if (imageUrl) {
            alert(`Image generated: ${imageUrl.imageUrl}`);
          }
        }}
      >
        Generate Image
      </button>
    </>
  );
}
