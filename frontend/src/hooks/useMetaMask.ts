'use client';

import { useState, useEffect } from 'react';
import { checkMetaMask, getMetaMaskProvider } from '../lib/metamask';
import { getNonce, verifyWallet } from '../lib/api';

export const useMetaMask = () => {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

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
      
      // Request account access
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      const userAddress = accounts[0];
      setAddress(userAddress);

      // Get nonce from backend
      const nonce = await getNonce();

      // Create message to sign
      const message = `Sign this message to verify your wallet ownership. Nonce: ${nonce}`;

      // Request signature
      const signature = await provider.request({
        method: 'personal_sign',
        params: [message, userAddress],
      });

      // Verify with backend
      const verification = await verifyWallet(userAddress, signature, nonce);
      setToken(verification.token);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to MetaMask');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setToken(null);
  };

  return {
    isMetaMaskInstalled,
    isConnecting,
    error,
    address,
    token,
    connect,
    disconnect
  };
}; 