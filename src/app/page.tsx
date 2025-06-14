"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react"
import CharacterInfoStep from "@/components/character-info-step"
import VisualDesignStep from "@/components/visual-design-step"
import PoseExpressionStep from "@/components/pose-expression-step"

export interface CharacterData {
  // Step 1: Character Info
  name: string
  characterType: string
  gender: string
  age: string

  // Step 2: Visual Design
  artStyle: string
  hairStyle: string
  eyeColor: string
  clothingStyle: string

  // Step 3: Pose & Expression
  pose: string
  facialExpression: string
  background: string

  // Generated data
  generatedImage?: string
  prompt?: string
  metadata?: any
}

const steps = [
  { id: 1, title: "Character Info", description: "Basic character details" },
  { id: 2, title: "Visual Design", description: "Appearance and style" },
  { id: 3, title: "Pose & Expression", description: "Pose and background" },
  { id: 4, title: "IP Registration", description: "Mint your character" },
]

export default function CharacterForge() {
  const [currentStep, setCurrentStep] = useState(1)
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
  })

  const updateCharacterData = (data: Partial<CharacterData>) => {
    setCharacterData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const progress = (currentStep / 4) * 100

  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="h-10 w-10 text-purple-400" />
              <h1 className="text-5xl font-bold text-white">CharacterForge</h1>
            </div>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Create unique anime-style game characters with AI and secure them as IP on-chain
            </p>
          </div>

          {/* Main CTA Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">From Idea to IP in Minutes</h2>
              <p className="text-gray-400 mb-8 text-lg">
                No design skills needed. Just describe your character and we'll generate it for you.
              </p>

              <Button
                onClick={nextStep}
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-xl"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <p className="text-sm text-gray-500 mt-4">Free to try • No credit card required</p>
            </div>
          </div>

          {/* Simple Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <Zap className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">AI-Powered Generation</h3>
                <p className="text-gray-400 text-sm">
                  Describe your character in plain English and watch it come to life
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">Anime Style Focus</h3>
                <p className="text-gray-400 text-sm">Specialized in creating high-quality anime and game characters</p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
                <h3 className="text-white font-semibold mb-2">IP Protection</h3>
                <p className="text-gray-400 text-sm">Register your characters as intellectual property on-chain</p>
              </div>
            </div>
          </div>

          {/* Simple Process Steps */}
          <div className="max-w-3xl mx-auto mt-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">How it works</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-medium">Describe Your Character</h4>
                  <p className="text-gray-400 text-sm">Fill out basic info like type, style, and appearance</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-medium">AI Generates Your Character</h4>
                  <p className="text-gray-400 text-sm">Our AI creates a unique anime-style character image</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
                <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-medium">Register as IP</h4>
                  <p className="text-gray-400 text-sm">Secure ownership of your character on Story Protocol</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Update the main app background
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">CharacterForge</h1>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            Step {currentStep} of 4
          </Badge>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id ? "bg-purple-600 text-white" : "bg-white/20 text-gray-400"
                  }`}
                >
                  {step.id}
                </div>
                <div className="ml-2 hidden sm:block">
                  <p className={`text-sm font-medium ${currentStep >= step.id ? "text-white" : "text-gray-400"}`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Content */}
        <div className="max-w-2xl mx-auto">
          {currentStep === 2 && (
            <CharacterInfoStep
              data={characterData}
              onUpdate={updateCharacterData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
          {currentStep === 3 && (
            <VisualDesignStep data={characterData} onUpdate={updateCharacterData} onNext={nextStep} onPrev={prevStep} />
          )}
          {currentStep === 4 && (
            <PoseExpressionStep
              data={characterData}
              onUpdate={updateCharacterData}
              onNext={nextStep}
              onPrev={prevStep}
            />
          )}
        </div>
      </div>
    </div>
  )
}
