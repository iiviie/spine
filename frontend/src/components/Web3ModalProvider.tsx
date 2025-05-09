'use client';

import { ReactNode, useEffect, useState } from 'react';
import { WagmiConfig } from 'wagmi';
import { config } from '@/lib/web3modal';

interface Web3ModalProviderProps {
  children: ReactNode;
}

export function Web3ModalProvider({ children }: Web3ModalProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiConfig config={config}>
      {mounted ? children : null}
    </WagmiConfig>
  );
} 