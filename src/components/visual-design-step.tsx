"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, Palette } from "lucide-react"
import type { CharacterData } from "@/app/page"

interface VisualDesignStepProps {
  data: CharacterData
  onUpdate: (data: Partial<CharacterData>) => void
  onNext: () => void
  onPrev: () => void
}

const artStyles = ["Classic Anime", "Cyberpunk", "Fantasy", "Ghibli-like", "Shōnen", "Glitchcore", "Mecha"]

const clothingStyles = [
  "School uniform",
  "Tactical suit",
  "Kimono",
  "Armor",
  "Casual wear",
  "Royal attire",
  "Cyberpunk outfit",
]

export default function VisualDesignStep({ data, onUpdate, onNext, onPrev }: VisualDesignStepProps) {
  const isValid = data.artStyle && data.hairStyle && data.eyeColor && data.clothingStyle

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Palette className="h-6 w-6 text-blue-400" />
          <CardTitle className="text-white">Visual Design</CardTitle>
        </div>
        <CardDescription className="text-gray-400">
          Define the visual appearance and style of your character
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-white">Art Style *</Label>
          <Select value={data.artStyle} onValueChange={(value) => onUpdate({ artStyle: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select art style" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {artStyles.map((style) => (
                <SelectItem key={style} value={style} className="text-white hover:bg-gray-700">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="hairStyle" className="text-white">
              Hair Style *
            </Label>
            <Input
              id="hairStyle"
              placeholder="e.g., spiky white, long pink"
              value={data.hairStyle}
              onChange={(e) => onUpdate({ hairStyle: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="eyeColor" className="text-white">
              Eye Color *
            </Label>
            <Input
              id="eyeColor"
              placeholder="e.g., gold, red, violet"
              value={data.eyeColor}
              onChange={(e) => onUpdate({ eyeColor: e.target.value })}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-white">Clothing Style *</Label>
          <Select value={data.clothingStyle} onValueChange={(value) => onUpdate({ clothingStyle: value })}>
            <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
              <SelectValue placeholder="Select clothing style" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              {clothingStyles.map((style) => (
                <SelectItem key={style} value={style} className="text-white hover:bg-gray-700">
                  {style}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Preview Section */}
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <h4 className="text-white font-medium mb-2">Style Preview</h4>
          <div className="text-sm text-gray-300 space-y-1">
            <p>
              <span className="text-purple-400">Art Style:</span> {data.artStyle || "Not selected"}
            </p>
            <p>
              <span className="text-blue-400">Hair:</span> {data.hairStyle || "Not specified"}
            </p>
            <p>
              <span className="text-cyan-400">Eyes:</span> {data.eyeColor || "Not specified"}
            </p>
            <p>
              <span className="text-green-400">Clothing:</span> {data.clothingStyle || "Not selected"}
            </p>
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
          <Button onClick={onNext} disabled={!isValid} className="bg-purple-600 hover:bg-purple-700 text-white">
            Next: Pose & Expression
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
