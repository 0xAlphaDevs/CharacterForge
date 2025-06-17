"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Shield, Copy, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { CharacterData } from "@/lib/types";
import { useWalletClient } from "wagmi";
import { StoryClient, StoryConfig } from "@story-protocol/core-sdk";
import { custom } from "viem";
import { IpMetadata } from "@story-protocol/core-sdk";
import { uploadJSONToIPFS } from "@/lib/uploadToIPFS";
import { createHash } from "crypto";

interface IPRegistrationStepProps {
  data: CharacterData;
  onPrev: () => void;
}

export default function IPRegistrationStep({
  data,
  onPrev,
}: IPRegistrationStepProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ipId, setIpId] = useState<`0x${string}` | undefined>();
  const { data: wallet } = useWalletClient();

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
    try {
      const client = await setupStoryClient();
      // 1. Set up your IP Metadata
      const ipMetadata: IpMetadata = client.ipAsset.generateIpMetadata({
        image: data.generatedImage,
      });

      // 2. Set up your NFT Metadata
      const nftMetadata = {
        name: data.name || "Unnamed Character",
        description:
          data.prompt ||
          "A unique character generated using AI, ready for registration.",
        image: data.generatedImage || "",
      };

      // 3. Upload your IP and NFT Metadata to IPFS
      const ipIpfsHash = await uploadJSONToIPFS(ipMetadata);
      if (!ipIpfsHash) throw new Error("Failed to upload IP metadata to IPFS");

      const ipHash = createHash("sha256")
        .update(JSON.stringify(ipMetadata))
        .digest("hex");

      const nftIpfsHash = await uploadJSONToIPFS(nftMetadata);
      if (!nftIpfsHash)
        throw new Error("Failed to upload NFT metadata to IPFS");

      const nftHash = createHash("sha256")
        .update(JSON.stringify(nftMetadata))
        .digest("hex");

      // 4. Register the NFT as an IP Asset (only if uploads succeeded)
      const response = await client.ipAsset.mintAndRegisterIp({
        spgNftContract: "0x19502E44bc8fA0fD310B2B94A7E8B0fF898e8494",
        ipMetadata: {
          ipMetadataURI: `https://ipfs.io/ipfs/${ipIpfsHash}`,
          ipMetadataHash: `0x${ipHash}`,
          nftMetadataURI: `https://ipfs.io/ipfs/${nftIpfsHash}`,
          nftMetadataHash: `0x${nftHash}`,
        },
      });

      console.log("Root IPA created:", {
        "Transaction Hash": response.txHash,
        "IPA ID": response.ipId,
      });
      console.log(
        `View on the explorer: https://aeneid.explorer.story.foundation/ipa/${response.ipId}`
      );
      setIpId(response.ipId);
    } catch (error: unknown) {
      setIsRegistering(false);
      alert("IP Registration failed. Please try again.");

      throw error;
    }
  }

  const handleRegister = async () => {
    setIsRegistering(true);
    // Simulate Story Protocol registration
    await registerIp();
    setIsRegistering(false);
    setIsRegistered(true);
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(data.prompt || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-green-400" />
            <CardTitle className="text-white">
              Your Character is Ready!
            </CardTitle>
          </div>
          <CardDescription className="text-gray-400">
            Review your generated character and register it as IP on Story
            Protocol
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Generated Image */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={
                  data.generatedImage == ""
                    ? "/logo.png"
                    : (data.generatedImage as string)
                }
                alt="Generated Character"
                width={400}
                height={400}
                className="rounded-lg border-2 border-purple-400/50"
              />
              <Badge className="absolute top-2 right-2 bg-green-500/90 text-white">
                Generated
              </Badge>
            </div>
          </div>

          {/* Character Details */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h4 className="text-white font-medium mb-3">Character Details</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-purple-400">Name:</span>{" "}
                  {data.name || "Unnamed Character"}
                </p>
                <p className="text-gray-300">
                  <span className="text-purple-400">Type:</span>{" "}
                  {data.characterType}
                </p>
                <p className="text-gray-300">
                  <span className="text-purple-400">Gender:</span> {data.gender}
                </p>
                <p className="text-gray-300">
                  <span className="text-purple-400">Age:</span> {data.age}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-blue-400">Art Style:</span>{" "}
                  {data.artStyle}
                </p>
                <p className="text-gray-300">
                  <span className="text-blue-400">Hair:</span> {data.hairStyle}
                </p>
                <p className="text-gray-300">
                  <span className="text-blue-400">Eyes:</span> {data.eyeColor}
                </p>
                <p className="text-gray-300">
                  <span className="text-blue-400">Clothing:</span>{" "}
                  {data.clothingStyle}
                </p>
              </div>
            </div>
          </div>

          {/* AI Prompt */}
          <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white font-medium">AI Generation Prompt</h4>
              <Button
                onClick={copyPrompt}
                size="sm"
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
            <p className="text-sm text-gray-300 font-mono bg-black/40 p-3 rounded border border-gray-700">
              {data.prompt}
            </p>
          </div>

          <Separator className="bg-gray-700" />

          {/* Action Buttons */}
          <div className="space-y-4">
            {!isRegistered ? (
              <Button
                onClick={handleRegister}
                disabled={isRegistering}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                size="lg"
              >
                {isRegistering ? (
                  <>
                    <Shield className="mr-2 h-5 w-5 animate-pulse" />
                    Registering on Story Protocol...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Register IP on Story Protocol
                  </>
                )}
              </Button>
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">
                      Successfully Registered!
                    </span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Your character is now protected as intellectual property on
                    Story Protocol
                  </p>
                  <p className="text-xs text-gray-400 mt-2">IP ID: {ipId}</p>
                  <a
                    target="_blank"
                    href={`https://aeneid.explorer.story.foundation/ipa/${ipId}`}
                    className="text-blue-400 hover:underline flex items-center justify-center gap-1 mt-2"
                  >
                    View on Story Explorer{" "}
                    <ArrowUpRight className="inline h-4 w-4 " />
                  </a>{" "}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              onClick={onPrev}
              variant="outline"
              className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Edit
            </Button>
            {/* <Button
              onClick={() => window.location.reload()}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Reset
            </Button> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
