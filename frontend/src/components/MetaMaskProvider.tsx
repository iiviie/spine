'use client';

import React from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { METAMASK_DOWNLOAD_URL } from '../lib/metamask';

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({ children }) => {
  const { isMetaMaskInstalled, error, connect, isConnecting, address, disconnect } = useMetaMask();

  if (!isMetaMaskInstalled) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">MetaMask Not Installed</h2>
        <p className="mb-4">Please install MetaMask to use this application.</p>
        <a
          href={METAMASK_DOWNLOAD_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Install MetaMask
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Error</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={connect}
          disabled={isConnecting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Try Again'}
        </button>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <button
          onClick={connect}
          disabled={isConnecting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <span className="text-sm font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          onClick={disconnect}
          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
      {children}
    </div>
  );
}; 