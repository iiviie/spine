'use client';

import React, { useEffect, useState } from 'react';
import { useReown } from '@/providers/ReownProvider';
import { appKit } from '@/lib/reown';

const WalletConnectComponent: React.FC = () => {
  const { isConnected, address, openWalletModal, disconnect, checkConnection } = useReown();
  const [isAppKitReady, setIsAppKitReady] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    // Check if appKit is available (client-side only)
    setIsAppKitReady(!!appKit);

    // Update debug info
    const updateDebugInfo = async () => {
      if (!appKit) return;

      try {
        const info: any = {
          isAppKitReady: !!appKit,
          isConnected,
          address,
        };

        // Try to get provider info
        try {
          const provider = appKit.getProvider?.();
          info.hasProvider = !!provider;
        } catch (e) {
          info.providerError = e instanceof Error ? e.message : String(e);
        }

        // Try to get account info
        try {
          const account = typeof appKit.getAccount === 'function' ? await appKit.getAccount() : undefined;
          info.rawAccount = account;
        } catch (e) {
          info.accountError = e instanceof Error ? e.message : String(e);
        }

        setDebugInfo(info);
      } catch (e) {
        console.error("Error getting debug info:", e);
        setDebugInfo({ error: e instanceof Error ? e.message : String(e) });
      }
    };

    updateDebugInfo();
    const interval = setInterval(updateDebugInfo, 3000);
    return () => clearInterval(interval);
  }, [isConnected, address]);

  if (!isAppKitReady) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Wallet Connection</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-yellow-700">Loading wallet connection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Wallet Connection</h2>
      
      {isConnected && address ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-green-700">Connected</p>
          <p className="text-sm text-gray-600 mt-1">
            Address: <span className="font-mono">{address}</span>
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={checkConnection}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Refresh Status
            </button>
            <button
              onClick={disconnect}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Disconnect
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold text-gray-700">Not Connected</p>
          <p className="text-sm text-gray-600 mt-1">
            Connect your wallet to interact with the application
          </p>
          <div className="flex space-x-2 mt-3">
            <button
              onClick={openWalletModal}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Connect Wallet
            </button>
            <button
              onClick={checkConnection}
              className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Check Status
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Features</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Multiple wallet support (MetaMask, Coinbase Wallet, WalletConnect, etc.)</li>
          <li>Email and social login options</li>
          <li>Multi-chain support</li>
          <li>Secure authentication</li>
          <li>Ownership verification</li>
        </ul>
      </div>

      {/* Debug Information */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Debug Information</h3>
        <pre className="text-xs overflow-auto bg-gray-800 text-white p-4 rounded">
          {JSON.stringify(debugInfo, null, 2)}
        </pre>
      </div>
    </div>
  );
};

// Use dynamic import with client-side only rendering
import dynamic from 'next/dynamic';

export const WalletConnect = dynamic(
  () => Promise.resolve(WalletConnectComponent),
  { ssr: false }
); 