import { NextResponse, type NextRequest } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: `${process.env.PINATA_JWT}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_GATEWAY_URL}`,
});

export async function POST(request: NextRequest) {
  try {
    const jsonMetadata = await request.json();
    console.log("Received JSON Metadata:", jsonMetadata);
    const { cid } = await pinata.upload.public.json(jsonMetadata);

    console.log("IPFS Upload Response CID:", cid);

    return NextResponse.json({ ipfsHash: cid }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
