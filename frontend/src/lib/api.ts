const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface NonceResponse {
  nonce: string;
}

export interface VerificationResponse {
  token: string;
  address: string;
}

export const getNonce = async (): Promise<string> => {
  const response = await fetch(`${API_BASE_URL}/auth/nonce`);
  if (!response.ok) {
    throw new Error('Failed to get nonce');
  }
  const data: NonceResponse = await response.json();
  return data.nonce;
};

export const verifyWallet = async (
  address: string,
  signature: string,
  nonce: string
): Promise<VerificationResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      address,
      signature,
      nonce,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to verify wallet');
  }

  return response.json();
}; 