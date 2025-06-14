"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { CharacterData } from "@/lib/types";

interface CharacterInfoStepProps {
  data: CharacterData;
  onUpdate: (data: Partial<CharacterData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const characterTypes = [
  "Human",
  "Beastkin",
  "Mech",
  "Spirit",
  "Hybrid",
  "Other",
];
const genders = ["Male", "Female", "Do not specify"];
const ages = ["Child", "Teen", "Adult", "Elder"];

export default function CharacterInfoStep({
  data,
  onUpdate,
  onNext,
  onPrev,
}: CharacterInfoStepProps) {
  const isValid = data.characterType && data.gender && data.age;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-6 w-6 text-purple-400" />
          <CardTitle className="text-white">Character Information</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Let&apos;s start with the basic details of your character
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white">
            Character Name (Optional)
          </Label>
          <Input
            id="name"
            placeholder="Enter character name..."
            value={data.name}
            onChange={(e) => onUpdate({ name: e.target.value })}
            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-white">Character Type *</Label>
          <Select
            value={data.characterType}
            onValueChange={(value) => onUpdate({ characterType: value })}
          >
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select character type" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {characterTypes.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  className="text-white hover:bg-gray-700"
                >
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Gender *</Label>
            <Select
              value={data.gender}
              onValueChange={(value) => onUpdate({ gender: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {genders.map((gender) => (
                  <SelectItem
                    key={gender}
                    value={gender}
                    className="text-white hover:bg-gray-700"
                  >
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-white">Age Group *</Label>
            <Select
              value={data.age}
              onValueChange={(value) => onUpdate({ age: value })}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select age" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {ages.map((age) => (
                  <SelectItem
                    key={age}
                    value={age}
                    className="text-white hover:bg-gray-700"
                  >
                    {age}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button
            onClick={onPrev}
            variant="outline"
            className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={onNext}
            disabled={!isValid}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Next: Visual Design
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
