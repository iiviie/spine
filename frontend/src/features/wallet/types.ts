export interface EthereumProvider {
    isMetaMask?: boolean
    request: (args: { method: string; params?: unknown[] }) => Promise<any>
  }
  
  declare global {
    interface Window {
      ethereum?: EthereumProvider
    }
  }
  