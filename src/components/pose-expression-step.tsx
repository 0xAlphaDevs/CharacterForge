"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, Camera, Loader2 } from "lucide-react";
import { useState } from "react";
import { CharacterData } from "@/lib/types";

interface PoseExpressionStepProps {
  data: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const poses = [
  "Standing",
  "Sitting",
  "Casting spell",
  "Holding weapon",
  "Petting creature",
  "Running",
  "Flying",
];

const expressions = [
  "Calm",
  "Angry",
  "Smiling",
  "Sad",
  "Determined",
  "Surprised",
  "Mysterious",
];

const backgrounds = [
  "Dark alley",
  "Forest",
  "Moonlight shrine",
  "Battlefield",
  "Floating city",
  "Sci-fi lab",
  "Cherry blossom garden",
];

export default function PoseExpressionStep({
  data,
  onUpdate,
  onNext,
  onPrev,
}: PoseExpressionStepProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const isValid = data.pose && data.facialExpression && data.background;

  const handleGenerate = async () => {
    if (!isValid) return;

    setIsGenerating(true);

    // Generate prompt from form data
    const prompt = `${
      data.artStyle
    } style anime character, ${data.characterType.toLowerCase()}, ${data.gender.toLowerCase()}, ${data.age.toLowerCase()}, ${
      data.hairStyle
    } hair, ${data.eyeColor} eyes, wearing ${
      data.clothingStyle
    }, ${data.pose.toLowerCase()}, ${data.facialExpression.toLowerCase()} expression, ${
      data.background
    } background`;

    // Simulate AI generation
    const response = await generateImage(prompt);

    onUpdate({
      generatedImage: response?.imageUrl || "",
      prompt: prompt,
      metadata: {
        name: data.name || "Unnamed Character",
        type: data.characterType,
        style: data.artStyle,
        createdAt: new Date().toISOString(),
      },
    });

    setIsGenerating(false);
    onNext();
  };

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

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Camera className="h-6 w-6 text-blue-400" />
          <CardTitle className="text-white">Pose & Expression</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Set the pose, expression, and background for your character
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white">Pose *</Label>
          <Select
            value={data.pose}
            onValueChange={(value) => onUpdate({ pose: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select pose" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {poses.map((pose) => (
                <SelectItem
                  key={pose}
                  value={pose}
                  className="text-white hover:bg-gray-700"
                >
                  {pose}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Facial Expression *</Label>
          <Select
            value={data.facialExpression}
            onValueChange={(value) => onUpdate({ facialExpression: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select expression" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {expressions.map((expression) => (
                <SelectItem
                  key={expression}
                  value={expression}
                  className="text-white hover:bg-gray-700"
                >
                  {expression}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Background *</Label>
          <Select
            value={data.background}
            onValueChange={(value) => onUpdate({ background: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select background" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {backgrounds.map((bg) => (
                <SelectItem
                  key={bg}
                  value={bg}
                  className="text-white hover:bg-gray-700"
                >
                  {bg}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Character Summary */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-white font-medium mb-3">Character Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-purple-400">Name:</span>{" "}
                {data.name || "Unnamed"}
              </p>
              <p className="text-gray-300">
                <span className="text-purple-400">Type:</span>{" "}
                {data.characterType}
              </p>
              <p className="text-gray-300">
                <span className="text-purple-400">Style:</span> {data.artStyle}
              </p>
              <p className="text-gray-300">
                <span className="text-purple-400">Hair:</span> {data.hairStyle}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-blue-400">Eyes:</span> {data.eyeColor}
              </p>
              <p className="text-gray-300">
                <span className="text-blue-400">Clothing:</span>{" "}
                {data.clothingStyle}
              </p>
              <p className="text-gray-300">
                <span className="text-blue-400">Pose:</span> {data.pose}
              </p>
              <p className="text-gray-300">
                <span className="text-blue-400">Expression:</span>{" "}
                {data.facialExpression}
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            onClick={onPrev}
            variant="outline"
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
            disabled={isGenerating}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!isValid || isGenerating}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Character...
              </>
            ) : (
              <>
                Generate Character
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
