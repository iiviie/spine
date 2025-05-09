# Web3 Conspiracy Board

A decentralized platform for creating, connecting, and exploring conspiracy theories as NFTs.

## Project Overview

The Web3 Conspiracy Board allows users to mint conspiracy theories as NFTs and create on-chain connections between them, forming a web of interrelated theories. All content is stored on IPFS with only references stored on the blockchain.

## Architecture Overview

### 1. On the Blockchain (Ethereum + Solidity)

**Theory NFTs**
- Each conspiracy theory is minted as an NFT
- Owner information
- Reference to IPFS content (not the content itself)
- Creation timestamp

**Connection Smart Contract**
- Records how theories connect
- Stores which theories are connected
- Records connection types (supports, contradicts, etc.)
- Tracks validation votes

### 2. On IPFS (Decentralized Storage)

**Theory Content**
- The actual text and details
- Title, description, and evidence
- Images or supporting media
- Metadata like tags

**Connection Details**
- Information about connections
- Description of how theories relate
- Evidence supporting the connection

### 3. Frontend (Next.js)

**User Interface**
- Theory creation/viewing pages
- Connection creation interface
- Web3 wallet integration (Web3Modal)
- Visualization of the theory web

### 4. Backend API (FastAPI)

**Data Indexing**
- Makes blockchain data easier to access
- Caches on-chain data for faster retrieval
- Handles IPFS interactions
- Prepares data for visualization

## Tech Stack

- **Frontend**: Next.js
- **Smart Contracts**: Solidity + Hardhat
- **Authentication**: Web3Modal + Ethereum wallets
- **Storage**: IPFS + Pinata/Web3.Storage
- **Backend API**: FastAPI
- **Identity Verification**: ZKEmail (for optional verified posts)

## Implementation Roadmap

### Step 1: Set Up Development Environment
1. Create a Next.js project for the frontend
2. Set up Hardhat for Ethereum development
3. Initialize your FastAPI backend
4. Create a project in Pinata or Web3.Storage for IPFS

### Step 2: Smart Contract Development
1. Create the Theory NFT contract
   - Uses ERC-721 standard for NFTs
   - Stores IPFS hashes pointing to theory content
   
2. Create the Connection contract
   - Stores relationships between theories
   - Manages validation and voting

### Step 3: IPFS Integration
1. Create helper functions to:
   - Upload theory content to IPFS
   - Upload connection details to IPFS
   - Retrieve content from IPFS

### Step 4: Frontend Implementation
1. Create the wallet connection interface
2. Build the theory creation form
3. Build the theory browsing interface
4. Implement the connection creation interface
5. Create the visualization component

### Step 5: Backend API Development
1. Create endpoints to index blockchain data
2. Implement IPFS interaction helpers
3. Create endpoints for visualization data

## Getting Started

### Start with Smart Contracts
- Define your NFT contract first
- Then create the connection contract
- Test them thoroughly in Hardhat

### Set Up IPFS Storage
- Create an account on Pinata or Web3.Storage
- Test uploading and retrieving files

### Create Basic Frontend
- Implement wallet connection
- Build a simple form to create theories
- Test minting an NFT

## Key Concepts for Web3 Beginners

### Web3 Interactions
All blockchain interactions require:
- A connected wallet (like MetaMask)
- Gas fees for transactions
- Waiting for transaction confirmation

### NFT Basics
NFTs are unique tokens that:
- Have one owner at a time
- Can be transferred between users
- Contain metadata and references to content

### IPFS Understanding
- Content on IPFS is addressed by its hash
- Content is immutable once uploaded
- You need pinning services to keep content available

### Wallet Connection Flow
1. User clicks "Connect Wallet"
2. Web3Modal shows available wallets
3. User selects wallet and approves connection
4. Your app can now request signatures and send transactions

## Testing Strategy

### Start with isolated testing of each component
- Test smart contracts with Hardhat
- Test IPFS uploads manually
- Test frontend components in isolation

### Integrate components gradually
- Connect frontend to smart contracts
- Test the full creation flow
- Test the visualization with sample data

## Deployment Considerations

### Smart Contracts
- Deploy to Ethereum testnet first (like Goerli)
- Verify contracts on Etherscan
- Only move to mainnet after thorough testing

### Frontend
- Deploy to Vercel or Netlify
- Ensure environment variables are set correctly

### Backend
- Deploy to a service like Heroku or Railway
- Set up proper environment variables

## Workflow Diagram

```
User -> [Frontend (Next.js)] -> [Smart Contracts (Solidity)]
                             -> [IPFS Storage]
                             -> [Backend API (FastAPI)]

Data Flow:
1. User creates theory -> Frontend -> IPFS -> Smart Contract
2. User connects theories -> Frontend -> IPFS -> Smart Contract
3. User browses theories -> Frontend -> Backend API -> Smart Contract + IPFS
```

## Development Setup

1. Clone this repository
2. Install dependencies:
   - Frontend: `cd frontend && npm install`
   - Backend: `cd backend && pip install -r requirements.txt`
3. Configure environment variables (see `.env.example`)
4. Start development servers:
   - Frontend: `npm run dev`
   - Backend: `uvicorn main:app --reload`
   - Hardhat: `npx hardhat node`

## Resources

- [Hardhat Documentation](https://hardhat.org/getting-started/)
- [IPFS Documentation](https://docs.ipfs.io/)
- [OpenZeppelin ERC-721 Standard](https://docs.openzeppelin.com/contracts/4.x/erc721)
- [Web3Modal Documentation](https://github.com/Web3Modal/web3modal)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)