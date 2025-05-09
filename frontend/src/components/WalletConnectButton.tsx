'use client'

import { useWallet } from '@/features/wallet/useWallet'

export default function WalletConnectButton() {
  const { walletAddress, connectWallet, disconnectWallet } = useWallet()

  return (
    <div className="flex items-center justify-center gap-4 p-4">
      {walletAddress ? (
        <>
          <span className="text-green-600">Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
          <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={disconnectWallet}>Disconnect</button>
        </>
      ) : (
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  )
}
