import axios from "axios";

export async function uploadJSONToIPFS(jsonMetadata: object): Promise<string> {
  try {
    const response = await axios.post("/api/upload", jsonMetadata);
    console.log("IPFS Upload Response:", response);
    return response.data.ipfsHash;
  } catch (error) {
    console.error("Error uploading JSON to IPFS:", error);
    throw error;
  }
}
