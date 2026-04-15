# Receipt Vault Shop Chain - Rewards & NFT System 🎁💎

## Overview

Complete blockchain-ready reward system with NFT minting based on shopping activity on Stellar blockchain.

---

## 🎮 How It Works

### User Flow

```
1. User adds item to shopping list
          ↓
   +1 reward point (automatic)
          ↓
   Show updated points & NFT count
          ↓
   Accumulate 10 points
          ↓
   Click "Claim NFT Reward" button
          ↓
   1 NFT minted (points -10)
          ↓
   NFT appears in gallery
   User appears on leaderboard
```

---

## 💰 Reward System Details

### Points System
- **1 point per item** added
- No other requirements
- Automatic tracking
- Stored in browser + blockchain ready

### NFT Conversion
- **Threshold**: 10 points = 1 NFT
- **Minting**: One-click claim
- **Metadata**: ID + timestamp + name
- **Limit**: Unlimited NFTs per user

### Example
```
5 items added = 5 points
10 points → Click button → 1 NFT minted
Remaining: 5 points (can claim 1 more after 5 more items)
```

---

## 📊 Leaderboard Features

### Two Ranking Views

#### View 1: Top Points 📊
- Sorted by total reward points
- Shows each user's points count
- Real-time updates

#### View 2: Top NFT Collectors 💎
- Sorted by NFTs minted
- Shows NFT count per user
- Achievement tracking

### Rank Badges
- **🥇 Gold**: #1 rank (most points/NFTs)
- **🥈 Silver**: #2 rank
- **🥉 Bronze**: #3 rank
- Regular: #4+ ranks

### Info Displayed
```
[Rank] User Name        [Points/NFTs]
└─ NFT Count • Total Points

Example:
[🥇] Alice.stellar      45 pts
└─ 4 NFTs • 45 Points
```

---

## 💎 NFT Gallery

### Display
- Grid layout (auto-fill)
- 60x80px cards
- NFT icon (💎)
- Unique ID
- Click to view details (future)

### Features
- Real-time updates
- Smooth animations
- Empty state message
- Responsive grid

---

## 🔗 Blockchain Integration

### Smart Contract Functions

```rust
// Add reward points (called when item added)
add_reward_points(user, points)

// Get user's current points
get_user_rewards(user) -> u64

// Convert points to NFT
mint_nft_reward(user) -> String

// Get user's NFTs
get_user_nfts(user) -> Vec<NFTReward>

// Get leaderboard
get_leaderboard() -> Vec<Reward>

// Get all NFTs globally
get_all_nfts() -> Vec<NFTReward>
```

### Data Storage
- **On-Chain**: Smart contract storage (Stellar)
- **Meta**: Points, NFT metadata, timestamps
- **Decentralized**: No centralized database

### Data Structures

```rust
struct Reward {
    user: Address,           // User wallet
    points: u64,            // Current points
    nfts_minted: u64,       // Total NFTs created
    timestamp: u64,         // First transaction time
}

struct NFTReward {
    id: u64,               // NFT unique ID
    user: Address,         // Owner
    points_used: u64,      // Points consumed (always 10)
    minted_at: u64,        // Creation timestamp
    name: String,          // NFT name
}
```

---

## 🔐 Security & Privacy

### Current (Local MVP)
- ✅ Data stored in browser LocalStorage
- ✅ No private key exposure
- ✅ Mock leaderboard for demo
- ✅ No real blockchain calls yet

### Production (Stellar Integration)
- ✅ Smart contract validation
- ✅ Immutable on-chain records
- ✅ User authentication via wallet
- ✅ Transparent leaderboard
- ✅ Proof of NFT ownership

---

## 🎯 Future Enhancements

### Phase 1 (Next)
- [ ] Real Stellar integration
- [ ] Wallet connection
- [ ] Testnet deployment
- [ ] Real NFT minting

### Phase 2 (Later)
- [ ] IPFS storage for NFT metadata
- [ ] NFT marketplace
- [ ] Trading between users
- [ ] NFT expiration/renewal

### Phase 3 (Advanced)
- [ ] Seasonal rewards
- [ ] Achievement badges
- [ ] Multiplier events
- [ ] Reward burning/transfer
- [ ] Governance tokens

---

## 📱 UI Components

### Reward Section (Left Panel)
```
🎁 Rewards System
┌─────────────────────────┐
│ Reward Points: 15       │
│ (1 point per item)      │
├─────────────────────────┤
│ NFTs Collected: 1       │
│ (10 points = 1 NFT)     │
├─────────────────────────┤
│ [💎 Claim NFT Reward]   │ ← Button (if ≥10 points)
├─────────────────────────┤
│ 💎 NFT Gallery          │
│ ┌──┐ ┌──┐ ┌──┐         │
│ │💎│ │💎│ │💎│         │
│ │#1│ │#2│ │#3│         │
│ └──┘ └──┘ └──┘         │
└─────────────────────────┘
```

### Leaderboard Panel (Bottom)
```
🏆 Leaderboard
[Top Points 📊] [Top NFT Collectors 💎]

[🥇] Alice.stellar          45 pts
     └─ 4 NFTs • 45 Points

[🥈] Bob.stellar            38 pts
     └─ 3 NFTs • 38 Points

[🥉] You                     12 pts
     └─ 1 NFT • 12 Points

[  4] Charlie.stellar        8 pts
     └─ 0 NFTs • 8 Points
```

---

## 🧪 Testing

### Manual Testing

1. **Add Items**
   - Add 1-5 items
   - Watch points increase
   - Verify counter updates

2. **Claim NFT**
   - Add 10 items (10 points)
   - Click "Claim NFT" button
   - Check NFT appears in gallery
   - Verify points reset to 0

3. **Leaderboard**
   - Click "Top Points" tab
   - Click "Top NFT Collectors" tab
   - Verify sorting works
   - Check rank badges

4. **Persistence**
   - Add items & claim NFT
   - Refresh page
   - Data should persist

### Automated Testing
```bash
cd contracts/shopping
cargo test
```

---

## 🔄 Data Flow

### Adding Item
```
User Input
    ↓
Add to shopping list
    ↓
+1 reward point
    ↓
Save to LocalStorage
    ↓
Update UI (points, stats)
    ↓
Update leaderboard
```

### Minting NFT
```
Click "Claim NFT"
    ↓
Check: points >= 10?
    ↓
Create NFT metadata
    ↓
Reduce points by 10
    ↓
Add NFT to collection
    ↓
Update leaderboard
    ↓
Show toast notification
    ↓
Render NFT gallery
```

---

## 📊 Example Scenario

### Day 1
- User adds 15 items
- Earns 15 points
- Clicks "Claim NFT" once
- Mints 1 NFT
- Remaining: 5 points
- Appears #3 on leaderboard (45 points total after events)

### Day 2
- User adds 10 more items
- Total: 25 points earned
- Can mint 2 more NFTs (after claiming 1st)
- Total minted: 2 NFTs
- Rank: #2 on NFT leaderboard

---

## 🎓 Learning Outcomes

### Blockchain Concepts
- ✅ Smart contract design
- ✅ On-chain state management
- ✅ User reputation system
- ✅ Token/NFT minting
- ✅ Decentralized leaderboard

### Web3 Frontend
- ✅ Reward tracking UI
- ✅ Real-time updates
- ✅ Tab-based navigation
- ✅ Data persistence
- ✅ Responsive gamification UI

---

## 🚀 Deployment

### Current State (MVP)
- ✅ Frontend: Ready (HTML/CSS/JS)
- ✅ Smart contract: Written (Rust/Soroban)
- ❌ Blockchain integration: Not yet

### Next Steps
1. Write Stellar wallet connector
2. Deploy to stellar testnet
3. Connect frontend to contract
4. Test real minting
5. Deploy to mainnet

---

## 📞 Support

For questions about:
- **Rewards**: See reward section above
- **Smart contract**: Check `contracts/shopping/src/lib.rs`
- **Frontend**: Check `frontend/script.js`
- **Styling**: Check `frontend/style.css`

---

**Built with 💖 using Stellar Soroban | Receipt Vault Shop Chain**
