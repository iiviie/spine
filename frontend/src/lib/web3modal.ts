'use client';

import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react';
import { mainnet, sepolia } from 'wagmi/chains';

// Replace with your project ID from WalletConnect Cloud
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '';

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID');
}

// Configure wagmi
const metadata = {
  name: 'Spine',
  description: 'Web3 Application',
  url: 'https://spine.app',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create wagmi config
export const config = defaultWagmiConfig({
  chains: [mainnet, sepolia] as const,
  projectId,
  metadata,
  ssr: true,
});

// Initialize web3modal on the client side only
if (typeof window !== 'undefined') {
  try {
    createWeb3Modal({
      wagmiConfig: config,
      projectId,
      themeMode: 'light',
      themeVariables: {
        '--w3m-accent': '#3b82f6', // blue-500
      },
    });
  } catch (error) {
    console.error('Failed to initialize Web3Modal:', error);
  }
} 