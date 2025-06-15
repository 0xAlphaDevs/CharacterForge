import { Button } from "@/components/ui/button";

import { Sparkles, Zap, Shield, ArrowRight } from "lucide-react";

import { useRouter } from "next/navigation";

export default function CharacterForge() {
  const router = useRouter();

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
            Create unique anime-style game characters with AI and secure them as
            IP on-chain
          </p>
        </div>

        {/* Main CTA Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              From Idea to IP in Minutes
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              No design skills needed. Just describe your character and
              we&apos;ll generate it for you.
            </p>

            <Button
              onClick={() => {
                // Navigate to /generate
                router.push("/generate");
              }}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 text-lg rounded-xl"
            >
              Start Creating
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Simple Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <Zap className="h-8 w-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-gray-400 text-sm">
                Describe your character in plain English and watch it come to
                life
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">
                Anime Style Focus
              </h3>
              <p className="text-gray-400 text-sm">
                Specialized in creating high-quality anime and game characters
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <Shield className="h-8 w-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">IP Protection</h3>
              <p className="text-gray-400 text-sm">
                Register your characters as intellectual property on-chain
              </p>
            </div>
          </div>
        </div>

        {/* Simple Process Steps */}
        <div className="max-w-3xl mx-auto mt-16">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            How it works
          </h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                1
              </div>
              <div>
                <h4 className="text-white font-medium">
                  Describe Your Character
                </h4>
                <p className="text-gray-400 text-sm">
                  Fill out basic info like type, style, and appearance
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                2
              </div>
              <div>
                <h4 className="text-white font-medium">
                  AI Generates Your Character
                </h4>
                <p className="text-gray-400 text-sm">
                  Our AI creates a unique anime-style character image
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-900 rounded-lg p-4 border border-gray-800">
              <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                3
              </div>
              <div>
                <h4 className="text-white font-medium">Register as IP</h4>
                <p className="text-gray-400 text-sm">
                  Secure ownership of your character on Story Protocol
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
