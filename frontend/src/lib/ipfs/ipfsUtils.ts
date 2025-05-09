import axios from 'axios';

// Mock IPFS implementation for development
const MOCK_IPFS_URI = 'ipfs://QmMockHash123';

// Your Pinata JWT token
const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

export interface TheoryMetadata {
  name: string;
  description: string;
  content: string;
  image?: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
}

// Mock function to upload a file to IPFS
export const uploadFileToIPFS = async (file: File): Promise<string> => {
  console.log('Development mode: Mocking file upload to IPFS');
  return `${MOCK_IPFS_URI}/image`;
};

// Mock function to upload metadata to IPFS
export const uploadToIPFS = async (metadata: TheoryMetadata): Promise<string> => {
  try {
    if (!PINATA_JWT) {
      throw new Error('Pinata JWT not found. Please add NEXT_PUBLIC_PINATA_JWT to your .env file');
    }

    // Prepare the metadata for Pinata
    const data = JSON.stringify(metadata);

    // Upload to Pinata
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PINATA_JWT}`
        }
      }
    );

    // Get the IPFS hash from the response
    const ipfsHash = response.data.IpfsHash;
    console.log('Uploaded to IPFS:', ipfsHash);

    // Return the full IPFS URI
    return `ipfs://${ipfsHash}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
};

// Function to create and upload theory metadata
export const createAndUploadTheory = async (
  title: string,
  content: string,
  imageFile?: File
): Promise<string> => {
  try {
    let imageUrl: string | undefined;

    // If an image file is provided, upload it first
    if (imageFile) {
      imageUrl = await uploadFileToIPFS(imageFile);
    }

    // Create metadata object
    const metadata: TheoryMetadata = {
      name: title,
      description: `Theory: ${title}`,
      content: content,
      image: imageUrl,
      attributes: [
        {
          trait_type: "Category",
          value: "Theory"
        },
        {
          trait_type: "Creation Date",
          value: new Date().toISOString()
        }
      ]
    };

    // Upload metadata to IPFS
    return await uploadToIPFS(metadata);
  } catch (error) {
    console.error('Error creating theory:', error);
    throw new Error('Failed to create theory');
  }
};