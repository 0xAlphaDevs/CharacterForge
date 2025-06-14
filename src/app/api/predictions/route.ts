import Replicate from "replicate";
// import { headers } from "next/headers";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(request: Request) {
  try {
    const {} = new URL(request.url);
    console.log("Received request for predictions", replicate);

    return NextResponse.json({ test: "this is a test" });
  } catch (error) {
    console.error("Error generating NEAR MPC transaction payload:", error);
    return NextResponse.json(
      { error: "Failed to generate NEAR MPC transaction payload" },
      { status: 500 }
    );
  }
}
