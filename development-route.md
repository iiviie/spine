# Web3 Conspiracy Board - 24-Hour Hackathon Implementation Route

This guide focuses on the critical implementation steps to build a working MVP of your Web3 Conspiracy Board in a 24-hour hackathon. No setup instructions - just the core development route.

## Hour 0-1: Project Skeleton & Contract Development

### Smart Contracts (Solidity + Hardhat)
1. Create two smart contracts:
   - `ConspiracyTheoryNFT.sol`: ERC-721 contract for theory NFTs
   - `TheoryConnections.sol`: Contract for managing connections between theories

2. Key functionality in NFT contract:
   - `createTheory(string tokenURI)`: Mints NFT, stores IPFS URI
   - Owner tracking and timestamps

3. Key functionality in Connections contract:
   - `createConnection(uint256 fromId, uint256 toId, uint8 connectionType, string metadataURI)`
   - `validateConnection(uint256 connectionId, bool isValid)`
   - Functions to query connections

## Hour 1-3: IPFS Integration & Frontend Basics

### IPFS Utilities
1. Create helper functions:
   - `uploadToIPFS(content)`: Takes theory/connection data, uploads to IPFS
   - `getFromIPFS(cid)`: Retrieves content from IPFS
   - Use Pinata or Web3.Storage APIs

### Frontend Foundation (Next.js)
1. Create basic pages:
   - Home/Landing page
   - Theory creation page
   - Theory view page
   - Connection creation page

2. Implement Web3Modal connection:
   - Connect wallet button
   - Display connection status
   - Get user's ETH address

## Hour 3-6: Core Functionality Implementation

### Theory Creation Flow
1. Build theory creation form with:
   - Title input
   - Description textarea
   - Tags input
   - Submit button

2. Implement creation flow:
   - Capture form data
   - Upload to IPFS
   - Call smart contract to mint NFT
   - Show success/loading states

### Backend API Endpoints (FastAPI)
1. Create minimal API with endpoints:
   - `GET /theories`: List all theories with metadata
   - `GET /theory/:id`: Get specific theory details
   - `GET /connections`: Get all connections
   - Make these connect to your contracts

## Hour 6-10: Connection System & Frontend Integration

### Connection Creation Flow
1. Build connection interface:
   - Dropdowns to select two theories
   - Connection type selection
   - Description of connection
   - Submit button

2. Implement connection flow:
   - Capture connection data
   - Upload metadata to IPFS
   - Call smart contract to create connection
   - Show success message

### Theory Browsing Interface
1. Create theory card components:
   - Display theory title/description
   - Show creator info
   - List connected theories
   - Implement validation voting

## Hour 10-14: Visualization & Core UI Improvement

### Theory Web Visualization
1. Implement visualization using a library like vis.js:
   - Nodes represent theories
   - Edges represent connections
   - Click nodes to view details
   - Color-code by connection type

2. Data fetching for visualization:
   - Create endpoint that returns graph structure
   - Convert contract data to visualization format
   - Add filtering options

### UI Refinement
1. Improve the most critical interfaces:
   - Better theory cards
   - Cleaner forms
   - Loading states
   - Error handling

## Hour 14-18: Authentication & State Management

### Web3 Authentication
1. Finish wallet authentication:
   - Persist connection across pages
   - Add authentication checks
   - Show different UI for connected/disconnected

### State Management
1. Implement shared state:
   - Cache theory data
   - Track user's created/connected theories
   - Manage transaction states

## Hour 18-22: Integration & Testing

### End-to-End Flow Testing
1. Test core user flows:
   - Create theory flow
   - Connect theories flow
   - Browse and visualize flow
   - Fix critical bugs

2. Verify contract interactions:
   - Test with multiple accounts
   - Ensure proper ownership
   - Verify IPFS content loads correctly

### Fallbacks & Error Handling
1. Add fallbacks for failure points:
   - IPFS upload failures
   - Transaction rejections
   - Network issues

## Hour 22-24: Final Polish & Presentation Prep

### UI Final Touches
1. Focus on the demo experience:
   - Pre-create some interesting theories
   - Set up compelling connections
   - Make visualization visually impressive

### Presentation Materials
1. Prepare demo flow:
   - Script your demonstration
   - Highlight the technical achievements
   - Prepare explanation of architecture
   - Create simple slides if needed

## Critical Components Checklist

- [ ] Smart contracts compile and deploy
- [ ] IPFS upload and retrieval works
- [ ] Wallet connection functions
- [ ] Theory creation flow complete
- [ ] Connection creation flow complete
- [ ] Visualization displays properly
- [ ] Core UI is intuitive and functional

## Tips for 24-Hour Implementation Success

1. **Use Templates & Boilerplates**:
   - Start with hardhat-nextjs templates
   - Use UI component libraries (Chakra UI, etc.)

2. **Prioritize Ruthlessly**:
   - Focus on core functions over nice-to-haves
   - Perfect one flow before starting another

3. **Skip Complex Features**:
   - Start with basic connection types
   - Leave advanced filtering for later

4. **Prepare Fallbacks**:
   - Have mock data ready if blockchain is slow
   - Prepare screenshots if demo has issues

5. **Test on Testnets Early**:
   - Deploy contracts in first few hours
   - Test with real wallets early

6. **Divide Work Effectively**:
   - One person on contracts
   - One on frontend/UI
   - One on visualization
   - Coordinate integration points

7. **Document As You Go**:
   - Keep simple notes on architecture decisions
   - Document any complex logic for presentation

## Implementation Shortcuts (Time-Savers)

1. **Smart Contract Shortcuts**:
   - Use OpenZeppelin Wizard to generate base contracts
   - Skip advanced access control for MVP

2. **Frontend Shortcuts**:
   - Use pre-built Web3Modal components
   - Pre-generate mock data for UI development
   - Use pre-built graph visualization components

3. **Backend Shortcuts**:
   - Use minimal FastAPI routes
   - Cache blockchain data in memory
   - Skip database setup - use file storage if needed