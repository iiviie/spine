'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { appKit } from '@/lib/reown';

interface ReownContextType {
  openWalletModal: () => void;
  isConnected: boolean;
  address: string | null;
  disconnect: () => void;
  checkConnection: () => void;
}

const ReownContext = createContext<ReownContextType>({
  openWalletModal: () => {},
  isConnected: false,
  address: null,
  disconnect: () => {},
  checkConnection: () => {},
});

export const useReown = () => useContext(ReownContext);

interface ReownProviderProps {
  children: ReactNode;
}

// Use dynamic import with no SSR to avoid hydration issues
const ReownProviderComponent = ({ children }: ReownProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const openWalletModal = () => {
    if (appKit) {
      console.log('Opening wallet modal');
      appKit.open();
    } else {
      console.error('AppKit not initialized');
    }
  };

  const disconnect = () => {
    if (appKit) {
      console.log('Disconnecting wallet');
      appKit.disconnect();
      setIsConnected(false);
      setAddress(null);
    } else {
      console.error('AppKit not initialized');
    }
  };

  // Function to manually check connection state
  const checkConnection = async () => {
    if (!appKit) {
      console.error('AppKit not initialized');
      return;
    }

    try {
      // Get the current account
      const account = await appKit.getAccount();
      console.log('Current account:', account);
      
      // Update connection state
      setIsConnected(!!account);
      
      // Update address
      if (account && typeof account === 'string') {
        setAddress(account);
      } else if (account && typeof account === 'object' && account.address && typeof account.address === 'string') {
        setAddress(account.address);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.error('Error checking connection:', error);
      setIsConnected(false);
      setAddress(null);
    }
  };

  useEffect(() => {
    // Check if appKit is defined (client-side only)
    if (!appKit) {
      console.error('AppKit not initialized in useEffect');
      return;
    }

    console.log('Setting up account subscription');
    
    // Initial connection check
    checkConnection();

    // Subscribe to account changes
    try {
      const unsubscribe = appKit.subscribeAccount((account) => {
        console.log('Account changed:', account);
        
        // Update connection state
        const newIsConnected = !!account;
        setIsConnected(newIsConnected);
        console.log('Is connected:', newIsConnected);
        
        // Update address
        if (account && typeof account === 'string') {
          setAddress(account);
        } else if (account && typeof account === 'object' && account.address && typeof account.address === 'string') {
          setAddress(account.address);
        } else {
          setAddress(null);
        }
      });

      // Return cleanup function
      return () => {
        console.log('Cleaning up account subscription');
        // Check if unsubscribe is a function before calling it
        if (typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    } catch (error) {
      console.error('Error subscribing to account changes:', error);
      return undefined;
    }
  }, []);

  return (
    <ReownContext.Provider value={{ openWalletModal, isConnected, address, disconnect, checkConnection }}>
      {children}
    </ReownContext.Provider>
  );
};

// Export a dynamic component with no SSR to avoid hydration issues
export const ReownProvider = dynamic(
  () => Promise.resolve(ReownProviderComponent),
  { ssr: false }
); 