"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import CharacterInfoStep from "@/components/character-info-step";
import VisualDesignStep from "@/components/visual-design-step";
import PoseExpressionStep from "@/components/pose-expression-step";
import { CharacterData } from "@/lib/types";
import { ConnectButton } from "@tomo-inc/tomo-evm-kit";
import { useAccount } from "wagmi";
import Image from "next/image";
import IPRegistrationStep from "@/components/ip-registration-step";

const steps = [
  { id: 1, title: "Character Info", description: "Basic character details" },
  { id: 2, title: "Visual Design", description: "Appearance and style" },
  { id: 3, title: "Pose & Expression", description: "Pose and background" },
  { id: 4, title: "IP Registration", description: "Mint your character" },
];

export default function CharacterForge() {
  const { isConnected } = useAccount();
  const [currentStep, setCurrentStep] = useState(1);
  const [characterData, setCharacterData] = useState<CharacterData>({
    name: "",
    characterType: "",
    gender: "",
    age: "",
    artStyle: "",
    hairStyle: "",
    eyeColor: "",
    clothingStyle: "",
    pose: "",
    facialExpression: "",
    background: "",
  });

  const updateCharacterData = (data: Partial<CharacterData>) => {
    setCharacterData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = (currentStep / 4) * 100;

  // Test to log character data at the final step
  useEffect(() => {
    if (currentStep === 4) {
      console.log("Final Character Data (Step 4):", characterData);
    }
  }, [currentStep, characterData]);

  // Update the main app background
  return (
    <>
      {isConnected ? (
        <>
          <div className="min-h-screen bg-black px-4">
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-yellow-400" />
                  <h1 className="text-2xl font-bold text-white">
                    CharacterForge
                  </h1>
                </div>
                <div className="flex flex-row items-baseline gap-4">
                  <Badge variant="secondary" className="bg-white/20 text-white">
                    Step {currentStep} of 4
                  </Badge>
                  <ConnectButton />
                </div>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  {steps.map((step) => (
                    <div key={step.id} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step.id
                            ? "bg-purple-600 text-white"
                            : "bg-white/20 text-gray-400"
                        }`}
                      >
                        {step.id}
                      </div>
                      <div className="ml-2 hidden sm:block">
                        <p
                          className={`text-sm font-medium ${
                            currentStep >= step.id
                              ? "text-white"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <br />
                <Progress value={progress} className="h-2 " />
              </div>

              {/* Step Content */}
              <div className="max-w-2xl mx-auto">
                {currentStep === 1 && (
                  <CharacterInfoStep
                    data={characterData}
                    onUpdate={updateCharacterData}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {currentStep === 2 && (
                  <VisualDesignStep
                    data={characterData}
                    onUpdate={updateCharacterData}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}
                {currentStep === 3 && (
                  <PoseExpressionStep
                    data={characterData}
                    onUpdate={updateCharacterData}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}

                {currentStep === 4 && (
                  <IPRegistrationStep data={characterData} onPrev={prevStep} />
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="min-h-screen bg-black px-4">
          <div className="flex flex-col items-center justify-center h-full text-center pt-48">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={150}
              className="mb-4"
            />
            <p className="text-white pb-4">
              Connect your wallet to get started with{" "}
              <span className="text-purple-600 font-bold text-xl">
                Character Forge
              </span>
            </p>
            <ConnectButton />
          </div>
        </div>
      )}
    </>
  );
}
