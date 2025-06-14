export interface CharacterData {
  // Step 1: Character Info
  name: string;
  characterType: string;
  gender: string;
  age: string;

  // Step 2: Visual Design
  artStyle: string;
  hairStyle: string;
  eyeColor: string;
  clothingStyle: string;

  // Step 3: Pose & Expression
  pose: string;
  facialExpression: string;
  background: string;

  // Generated data
  generatedImage?: string;
  prompt?: string;
  metadata?: any;
}
