import Replicate from "replicate";
import { NextRequest, NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN || "",
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const inputPrompt = searchParams.get("prompt");

    console.log("Received prompt:", inputPrompt);

    if (!inputPrompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }

    const output = await replicate.run(
      "bytedance/sdxl-lightning-4step:6f7a773af6fc3e8de9d5a3c00be77c17308914bf67772726aff83496ba1e3bbe",
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: inputPrompt,
          negative_prompt:
            "nsfw, lowres, text, watermark, blurry, jpeg artifacts, mutated fingers, missing limbs, bad proportions, poor lighting, distorted anatomy, cartoonish",
          scheduler: "K_EULER",
          num_outputs: 1,
          guidance_scale: 0,
          num_inference_steps: 4,
        },
      }
    );

    if (!Array.isArray(output) || !output[0]) {
      throw new Error("Invalid response from Replicate");
    }

    return NextResponse.json({ imageUrl: output[0].url() }, { status: 200 });
  } catch (error) {
    console.error("Replicate error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate image",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
