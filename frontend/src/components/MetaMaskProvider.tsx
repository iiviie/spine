'use client';

import React, { useEffect } from 'react';
import { useReown } from '@/providers/ReownProvider';
import { appKit } from '@/lib/reown';

interface MetaMaskProviderProps {
  children: React.ReactNode;
}

export const MetaMaskProvider: React.FC<MetaMaskProviderProps> = ({ children }) => {
  const { isConnected, address, openWalletModal, disconnect, checkConnection } = useReown();

  // Format address for display
  const formatAddress = (addr: string | null): string => {
    if (!addr || typeof addr !== 'string') return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Check connection status on component mount and periodically
  useEffect(() => {
    // Initial check
    checkConnection();

    // Set up periodic check every 5 seconds
    const intervalId = setInterval(() => {
      checkConnection();
    }, 5000);

    // Clean up on unmount
    return () => clearInterval(intervalId);
  }, [checkConnection]);

  // If not connected, show connect screen
  if (!isConnected || !address) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Connect Your Wallet</h2>
        <p className="mb-4">Please connect your wallet to use this application.</p>
        <button
          onClick={openWalletModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors mb-4"
        >
          Connect Wallet
        </button>
        <button
          onClick={checkConnection}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
        >
          Check Connection Status
        </button>
      </div>
    );
  }

  // If connected, show the main app with wallet info
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 right-4 flex items-center space-x-4 bg-white p-4 rounded-lg shadow-lg">
        <span className="text-sm font-mono">
          {formatAddress(address)}
        </span>
        <div className="flex space-x-2">
          <button
            onClick={checkConnection}
            className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={disconnect}
            className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Disconnect
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}; 