export const checkMetaMask = (): boolean => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return true;
  }
  return false;
};

export const getMetaMaskProvider = () => {
  if (typeof window === 'undefined') return null;
  return window.ethereum;
};

export const METAMASK_DOWNLOAD_URL = 'https://metamask.io/download/';
