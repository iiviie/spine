# Web3 Conspiracy Board

A decentralized Reddit-like platform for conspiracy discussions built on the Solana blockchain.

## Project Overview

This project creates a decentralized discussion platform where:
- Users authenticate with their Solana wallets
- Content is stored on IPFS (decentralized storage)
- Reputation, votes, and content verification happen on-chain
- The experience remains user-friendly and familiar

## Tech Stack (Free/Open Source)

- **Frontend**: Next.js
- **Backend**: FastAPI
- **Blockchain**: Solana + Anchor framework
- **Storage**: IPFS (with Pinata free tier)
- **Database**: PostgreSQL (for indexing and caching)

## Blockchain Integration Guide

### What Goes On The Blockchain:

1. **User Identity**
   - Wallet addresses serve as user IDs
   - Reputation/karma scores

2. **Content Verification**
   - Hashes of content stored in IPFS
   - Timestamps of posts/comments

3. **Platform Mechanics**
   - Upvotes/downvotes
   - Community governance votes
   - Moderation actions

### What Doesn't Go On The Blockchain:

1. **Actual Content**
   - Text of posts/comments (stored on IPFS)
   - Images and other media (stored on IPFS)

2. **Application Data**
   - UI preferences
   - Temporary states
   - Notification settings

## Component-by-Component Breakdown

### Frontend (Next.js)

**Blockchain Responsibilities:**
- Connect to user's Solana wallet (via Phantom)
- Display on-chain data (reputation, votes)
- Get transaction signatures from users
- Submit signed transactions to Solana

**Implementation:**
```javascript
// Example wallet connection
import { useWallet } from '@solana/wallet-adapter-react';

function LoginButton() {
  const { connect, connected } = useWallet();
  return !connected && (
    <button onClick={connect}>Connect Wallet</button>
  );
}
```

### Backend (FastAPI)

**Blockchain Responsibilities:**
- Prepare complex transactions
- Deploy and update Solana programs
- Index blockchain data for faster queries
- Manage IPFS content storage

**Implementation:**
```python
# Example transaction preparation
@app.post("/api/posts/create")
async def create_post(post_data: PostCreate):
    # Store content on IPFS
    ipfs_hash = await store_on_ipfs(post_data.content)
    
    # Prepare Solana transaction for frontend signing
    transaction = prepare_post_transaction(
        ipfs_hash=ipfs_hash,
        user_wallet=post_data.wallet_address
    )
    
    return {"transaction": transaction.to_json()}
```

### Solana Programs (Anchor Framework)

**Responsibilities:**
- Define on-chain data structures
- Implement platform rules and logic
- Process transactions

**Implementation:**
```rust
// Example Anchor program (simplified)
#[program]
pub mod conspiracy_board {
    use super::*;
    
    pub fn submit_post(ctx: Context<SubmitPost>, ipfs_hash: String) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.author = ctx.accounts.user.key();
        post.ipfs_hash = ipfs_hash;
        post.timestamp = Clock::get()?.unix_timestamp;
        post.upvotes = 0;
        post.downvotes = 0;
        Ok(())
    }

    pub fn upvote(ctx: Context<Vote>) -> Result<()> {
        let post = &mut ctx.accounts.post;
        post.upvotes += 1;
        // Update author's reputation
        let author = &mut ctx.accounts.author;
        author.reputation += 1;
        Ok(())
    }
}
```

## Development Workflow

1. **Setup Development Environment**
   - Install Solana CLI
   - Set up local Solana validator
   - Configure Anchor framework
   - Set up IPFS node or Pinata account

2. **Blockchain First Approach**
   - Develop and test basic Solana programs
   - Create post, upvote, user reputation mechanics

3. **Backend Development**
   - Create API endpoints to interact with Solana
   - Implement IPFS storage functionality
   - Build indexing system for on-chain data

4. **Frontend Implementation**
   - Integrate Solana wallet adapter
   - Build UI for creating/viewing posts
   - Implement transaction signing flow

## Key User Flows

### Posting Content
1. User writes content (Frontend)
2. Content stored on IPFS (Backend)
3. IPFS hash recorded on Solana (Frontend gets signature, Backend submits)
4. Post appears in feed (Frontend fetches from Backend)

### Voting on Content
1. User clicks upvote (Frontend)
2. Transaction prepared (Frontend/Backend)
3. User signs transaction (Frontend)
4. Vote recorded on-chain (Solana)
5. Post and user reputation update (Solana)

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install               # Frontend dependencies
   pip install -r requirements.txt  # Backend dependencies
   ```
3. Set up local Solana validator:
   ```
   solana-test-validator
   ```
4. Deploy Anchor programs:
   ```
   anchor deploy
   ```
5. Start the backend:
   ```
   uvicorn app.main:app --reload
   ```
6. Start the frontend:
   ```
   npm run dev
   ```

## Helpful Resources

- [Solana Documentation](https://docs.solana.com/)
- [Anchor Framework](https://www.anchor-lang.com/)
- [IPFS Documentation](https://docs.ipfs.io/)
- [Phantom Wallet Docs](https://docs.phantom.app/)
