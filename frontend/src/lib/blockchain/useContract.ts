import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import TheoryNFT from './contracts/TheoryNFT.json';
import './types';

// Local Hardhat network configuration
const HARDHAT_NETWORK = {
  chainId: '0x7A69', // 31337 in hex
  chainName: 'Hardhat Local',
  nativeCurrency: {
    name: 'Ethereum',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['http://127.0.0.1:8545'],
};

const CONTRACT_ADDRESS = "0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9";

// Hardhat provider configuration
const HARDHAT_RPC_URL = "http://127.0.0.1:8545";
const provider = new ethers.JsonRpcProvider(HARDHAT_RPC_URL);

// Declare supported networks
const SUPPORTED_NETWORKS = {
  '0x7A69': 'Hardhat Local', // 31337
  '0x1': 'Ethereum Mainnet',
  '0x5': 'Goerli Testnet',
  '0x89': 'Polygon Mainnet',
  '0x13881': 'Mumbai Testnet'
};

export interface Theory {
  id: number;
  title: string;
  content: string;
  image?: string;
  owner: string;
  createdAt: string;
}

export const useContract = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [theories, setTheories] = useState<Theory[]>([]);

  const ensureHardhatNetwork = useCallback(async () => {
    if (!window.ethereum) {
      throw new Error('Please install MetaMask!');
    }

    try {
      // Get current chain ID
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      
      // Check if current network is supported
      if (!SUPPORTED_NETWORKS[chainId as keyof typeof SUPPORTED_NETWORKS]) {
        throw new Error(`Network not supported. Please switch to one of: ${Object.values(SUPPORTED_NETWORKS).join(', ')}`);
      }

      // If not on Hardhat, try to switch
      if (chainId !== HARDHAT_NETWORK.chainId) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: HARDHAT_NETWORK.chainId }],
          });
        } catch (switchError: any) {
          // If network not added, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [HARDHAT_NETWORK],
            });
          } else {
            throw switchError;
          }
        }
      }
    } catch (error: any) {
      console.error('Network switch error:', error);
      throw new Error('Failed to switch to Hardhat network. Please add it manually in MetaMask.');
    }
  }, []);

  const getContract = useCallback(async () => {
    try {
      // Get the connected account
      if (!window.ethereum) {
        throw new Error('Please install MetaMask!');
      }

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = new ethers.BrowserProvider(window.ethereum).getSigner();

      // Verify contract exists at address
      const code = await provider.getCode(CONTRACT_ADDRESS);
      console.log("Contract code at address:", code);
      if (code === "0x") {
        throw new Error("No contract found at the specified address");
      }

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        TheoryNFT.abi,
        await signer
      );

      // Verify contract connection
      const tokenCount = await contract.tokenCounter();
      console.log("Current token count:", tokenCount.toString());

      // Verify contract owner
      const owner = await contract.owner();
      console.log("Contract owner:", owner);

      return contract;
    } catch (err) {
      console.error("Contract connection error:", err);
      throw err;
    }
  }, []);

  const mintNFT = useCallback(async (ipfsURI: string) => {
    try {
      setLoading(true);
      setError(null);

      console.log("Attempting to mint NFT with IPFS URI:", ipfsURI);
      const contract = await getContract();
      
      // Get current account
      const signer = new ethers.BrowserProvider(window.ethereum).getSigner();
      const address = await (await signer).getAddress();
      console.log("Minting for address:", address);

      // Verify we have enough balance
      const balance = await provider.getBalance(address);
      console.log("Account balance:", ethers.formatEther(balance), "ETH");

      const tx = await contract.mintTheory(address, ipfsURI);
      console.log("Mint transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Mint transaction confirmed:", receipt);

      // Verify the mint
      const tokenCount = await contract.tokenCounter();
      console.log("New token count:", tokenCount.toString());
      
      // Get the token URI of the newly minted token
      const newTokenId = tokenCount - 1;
      const tokenURI = await contract.tokenURI(newTokenId);
      console.log("New token URI:", tokenURI);

      // After minting, fetch all theories
      await fetchTheories();
      
      return tx;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error("Mint error:", errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [getContract]);

  const fetchTheories = useCallback(async () => {
    try {
      console.log("Fetching theories...");
      const contract = await getContract();
      const tokenCount = await contract.tokenCounter();
      console.log("Found", tokenCount.toString(), "theories");

      const theories: Theory[] = [];

      for (let i = 0; i < tokenCount; i++) {
        try {
          console.log(`Fetching theory ${i}...`);
          const tokenURI = await contract.tokenURI(i);
          console.log(`Theory ${i} URI:`, tokenURI);
          
          const owner = await contract.ownerOf(i);
          console.log(`Theory ${i} owner:`, owner);
          
          // Fetch metadata from IPFS
          const ipfsUrl = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
          console.log(`Fetching metadata from:`, ipfsUrl);
          
          const response = await fetch(ipfsUrl);
          const metadata = await response.json();
          console.log(`Theory ${i} metadata:`, metadata);

          theories.push({
            id: i,
            title: metadata.name,
            content: metadata.content,
            image: metadata.image,
            owner,
            createdAt: metadata.attributes?.find((attr: any) => attr.trait_type === "Creation Date")?.value || new Date().toISOString()
          });
        } catch (err) {
          console.error(`Error fetching theory ${i}:`, err);
        }
      }

      console.log("All theories fetched:", theories);
      setTheories(theories);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      console.error("Fetch error:", errorMessage);
      setError(errorMessage);
      throw err;
    }
  }, [getContract]);

  return {
    mintNFT,
    fetchTheories,
    theories,
    loading,
    error
  };
}; 