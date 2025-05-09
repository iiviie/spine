'use client';

import { useState, useEffect } from 'react';
import { checkMetaMask, getMetaMaskProvider } from '../lib/metamask';

export const useMetaMask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMetaMaskInstalled(checkMetaMask());
  }, []);

  const connect = async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed');
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);
      const provider = getMetaMaskProvider();
      if (!provider) throw new Error('No provider found');
      
      await provider.request({ method: 'eth_requestAccounts' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  return {
    isMetaMaskInstalled,
    isConnecting,
    error,
    connect
  };
}; 