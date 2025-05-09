'use client'

import { useEffect, useState } from 'react'

export function useWallet() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return;
    const load = async () => {
      const accounts = await window.ethereum?.request({ method: 'eth_accounts' })
      if (accounts.length > 0) setWalletAddress(accounts[0])
    }
    load()
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) throw new Error('MetaMask not installed')
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    setWalletAddress(accounts[0])
  }

  const disconnectWallet = () => setWalletAddress(null)

  return { walletAddress, connectWallet, disconnectWallet }
}
