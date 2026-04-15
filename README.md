# 🛍️ Receipt Vault Shop Chain

> A decentralized shopping tracker and reward system built on the Stellar blockchain with gamification features and NFT incentives.

**Creator:** Revano Fabiansyah Priadi  
**Language:** English  
**Status:** Production-Ready MVP ✅
---
## ID Smart Contract: CBNQEH27OSPM26LDOSJWG7JUZEME2UMM67CV4SVJXZKCUI6JJDBXVAZZ

## 📋 Overview

Receipt Vault Shop Chain is a Web3 application that transforms everyday shopping into a gamified experience. Track your purchases, upload receipt photos, earn reward points, mint NFTs, and compete on a global leaderboard—all powered by the Stellar blockchain.

This project combines a responsive, modern frontend with a Rust-based smart contract on Soroban, designed for both demo use and real-world deployment on the Stellar testnet.

---
## Screenshoot Testnet
<img width="1918" height="1078" alt="Stellar Expert 1" src="https://github.com/user-attachments/assets/828715a1-d5d6-4629-a4c1-f6fa692667b7" />

## ✨ Features

### 🛒 Shopping Management
- **Create** shopping items with name, category, price, and quantity
- **Upload** receipt photos as Base64 images with lightbox preview
- **Track** purchase status with checkbox toggle
- **View** total spending and purchase statistics
- **Delete** or clear all items with one click

### 🎁 Reward System
- **Automatic points** - Earn 1 point per shopping item added
- **NFT minting** - Convert 10 points into digital collectible NFTs
- **Points tracking** - See your total points and remaining balance
- **Leaderboard** - Two ranking views (by Total Points, by NFT Count)
- **Badges** - Rank #1, #2, #3 get special gold/silver/bronze badges

### 📱 User Experience
- **Responsive design** - Works on desktop (3-col), tablet (2-col), mobile (1-col)
- **Live updates** - All changes reflect instantly
- **Data persistence** - Data saved to LocalStorage and blockchain-ready
- **Beautiful UI** - Modern gradient design with smooth animations
- **Seed data** - Demo data auto-loads on first visit

### 💻 Developer Tools
- **Smart contract** - 11 Rust functions ready for Soroban
- **Debug console** - 5 utility functions in browser console
- **Mock blockchain** - Test all features before mainnet
- **Well documented** - 7 comprehensive guides included

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Node.js 16+ (for blockchain integration - optional)
- Rust 1.70+ (for smart contract development - optional)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/Receipt-Vault-Shop-Chain.git
cd Receipt-Vault-Shop-Chain
```

2. **Open frontend in browser**
```bash
cd frontend
# Open in browser
open index.html           # macOS
start index.html          # Windows
firefox index.html        # Linux
```

3. **Build smart contract (optional)**
```bash
cd contracts/shopping
cargo build --release --target wasm32-unknown-unknown
```

---

## 📖 How to Use

### Adding Items
1. Fill in the form on the left:
   - **Name:** Product name (required)
   - **Category:** groceries, gadgets, clothes, home, or health
   - **Price:** Item cost
   - **Quantity:** How many items

2. Click **"Add Item"** button
3. Item appears in shopping list

### Uploading Receipt Photos
1. Click **"📸 Upload Receipt"** on any item card
2. Select an image (JPG, PNG, WebP, GIF)
3. Photo displays as thumbnail
4. Click thumbnail for fullscreen lightbox viewer

### Earning Rewards
1. **Points:** Automatically earn 1 point per item added
2. **View points:** Check reward section on right panel
3. **Claim NFT:** Click "Claim NFT" when you have 10+ points
4. **Conversion:** 10 points → 1 NFT instantly
5. **Gallery:** View minted NFTs in NFT Gallery section

### Viewing Leaderboard
1. Scroll to right panel
2. Click **"By Points"** or **"By NFTs"** tabs to switch
3. See rankings with badges:
   - 🥇 Gold: Rank #1
   - 🥈 Silver: Rank #2
   - 🥉 Bronze: Rank #3

### Debug Console Commands
Open **DevTools** (F12) and type in console:

```javascript
viewAppState()              // View current app state
exportData()                // Export all data as JSON
addMockData()               // Add 2 test items + 5 points
checkStorageUsage()         // Check storage usage
resetSeedData()             // Reset all seed data
```

---

## 🏗️ Project Structure

```
Receipt-Vault-Shop-Chain/
│
├── 📄 README.md                          (This file)
├── 📄 QUICK_DEPLOY.md                    (5-min deployment guide)
├── 📄 DEPLOY_TO_SOROBAN.md              (Full deployment guide)
├── 📄 REWARDS_SYSTEM.md                  (Rewards technical docs)
├── 📄 REWARDS_QUICK_START.md            (User rewards guide)
├── 📄 DEVELOPMENT.md                     (Developer guide)
├── 📄 SEED_DATA_GUIDE.md                (Seed data documentation)
│
├── 📁 frontend/
│   ├── index.html                        (HTML markup - 200+ lines)
│   ├── style.css                         (Styling - 700+ lines)
│   ├── script.js                         (Logic - 1000+ lines)
│   └── 📸 screenshot.png                (UI showcase)
│
├── 📁 contracts/
│   ├── Cargo.toml                       (Workspace config)
│   ├── Makefile                         (Build commands)
│   └── 📁 shopping/
│       ├── Cargo.toml                   (Package config)
│       ├── Makefile                     (Build rules)
│       └── 📁 src/
│           ├── lib.rs                   (Smart contract - 300+ lines)
│           └── test.rs                  (Unit tests)
│
├── 📁 target/                           (Build output)
├── .gitignore                           (Git ignore rules)
└── Cargo.toml                           (Root workspace config)

Total: 17 files | ~200 KB | Production-ready
```

---

## 💡 Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling (Grid, Flexbox, animations)
- **Vanilla JavaScript** - No frameworks/dependencies
- **FileReader API** - Image upload & Base64 encoding
- **LocalStorage API** - Client-side persistence

### Blockchain
- **Stellar** - L1 blockchain network
- **Soroban** - Smart contract platform (v25)
- **Rust** - Smart contract language
- **WebAssembly (Wasm)** - Contract execution

### Tools
- **Cargo** - Rust package manager
- **Stellar CLI** - Contract deployment
- **Soroban Studio** - IDE & testing environment

### Run Smart Contract Tests
```bash
cd Receipt-Vault-Shop-Chain
cargo test --package shopping
```

### Test Frontend
1. Open `frontend/index.html` in browser
2. Try adding items, deleting, searching, filtering
3. Check localStorage persistence

## 📝 Development Notes

---

## 🧠 Smart Contract

### Network
- **Testnet:** Stellar Soroban Testnet
- **URL:** https://soroban-testnet.stellar.org/
- **Contract ID:** `[ADD AFTER DEPLOYMENT]`
- **Status:** Ready for deployment

### Functions (11 Total)

#### Shopping Management (6 functions)
```rust
fn create_item(name, category, price, quantity) -> Item
fn get_items() -> Vec<Item>
fn delete_item(id)
fn mark_purchased(id, purchased)
fn get_total_spending() -> u64
fn clear_all()
```

#### Reward System (5 functions)
```rust
fn add_reward_points(user, points)
fn get_user_rewards(user) -> Reward
fn mint_nft_reward(user) -> NFT
fn get_user_nfts(user) -> Vec<NFT>
fn get_leaderboard() -> Vec<User>
```

### Data Structures
```rust
struct ShoppingItem {
    id: u64,
    name: String,
    category: String,
    price: u64,
    quantity: u32,
    purchased: bool,
    timestamp: u64,
}

struct Reward {
    user: Address,
    points: u64,
    nfts_minted: u32,
    timestamp: u64,
}

struct NFTReward {
    id: u64,
    user: Address,
    points_used: u64,
    minted_at: u64,
    name: String,
}
```

### Build & Deploy

**Build Contract**
```bash
cd contracts/shopping
cargo build --release --target wasm32-unknown-unknown
```

**Deploy to Testnet**
```bash
# Using Soroban Studio (Recommended - Easiest)
https://soroban.stellar.org/

# Or using CLI
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/shopping.wasm \
  --network testnet
```

See [DEPLOY_TO_SOROBAN.md](./DEPLOY_TO_SOROBAN.md) for detailed instructions.

---

## 📸 Screenshots

### Desktop View (3-Column Layout)
```
[Left Panel]          [Center Panel]        [Right Panel]
├─ Add Item Form      ├─ Shopping List      ├─ Reward Stats
│  ├─ Name            │  ├─ Item 1 ✓        │  ├─ 45 Points
│  ├─ Category        │  ├─ Item 2          │  ├─ 3 NFTs
│  ├─ Price           │  ├─ Item 3 ✓        │  └─ Claim NFT
│  ├─ Qty             │  └─ Item 4...       │
│  └─ Add Btn         └─ [with images]      ├─ NFT Gallery
                                            │  ├─ NFT 1
                                            │  ├─ NFT 2
                                            │  └─ NFT 3
                                            │
                                            ├─ Leaderboard
                                            │  ├─ 🥇 alice 68pts
                                            │  ├─ 🥈 bob 52pts
                                            │  ├─ 🥉 diana 38pts
                                            │  ├─ You 45pts
                                            │  └─ charlie 28pts
```

**[Add Screenshots Here After Deployment]**
- Desktop full view
- Mobile responsive view
- Image upload modal
- NFT gallery display

---

## 🎮 Demo Data

Auto-loads on first visit:

### Shopping Items (9)
| Item | Category | Price | Qty | Status |
|------|----------|-------|-----|--------|
| Organic Apple Bunch | Groceries | $4.99 | 2 | ✓ |
| MacBook Pro 16" | Gadgets | $2,499 | 1 | ✓ |
| Winter Jacket | Clothes | $89.99 | 1 | ✓ |
| Standing Desk | Home | $399.99 | 1 | ✓ |
| Face Cream SPF 50 | Health | $29.99 | 1 | - |
| 4K Monitor | Gadgets | $399.99 | 1 | - |
| Yoga Mat | Health | $34.99 | 2 | - |
| Coffee Maker | Home | $149.99 | 1 | - |
| Running Shoes Nike | Clothes | $129.99 | 1 | - |

### Rewards
- **Total Points:** 45
- **NFTs Minted:** 3
- **Remaining Points:** 5

### Leaderboard  
```
🥇 alice.stellar     - 5 NFTs, 68 points
🥈 bob.stellar       - 4 NFTs, 52 points
🥉 diana.stellar     - 3 NFTs, 38 points
   Your Wallet       - 3 NFTs, 45 points
   charlie.stellar   - 2 NFTs, 28 points
```

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Project overview (this file) |
| [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) | 5-minute deployment guide |
| [DEPLOY_TO_SOROBAN.md](./DEPLOY_TO_SOROBAN.md) | Complete deployment instructions |
| [REWARDS_SYSTEM.md](./REWARDS_SYSTEM.md) | Rewards system technical docs |
| [REWARDS_QUICK_START.md](./REWARDS_QUICK_START.md) | User-friendly rewards guide |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Developer workflow & troubleshooting |
| [SEED_DATA_GUIDE.md](./SEED_DATA_GUIDE.md) | Seed data reference |

---

## 🔌 Integration with Blockchain

### Current State (MVP)
- ✅ Smart contract built and tested
- ✅ Frontend fully functional with LocalStorage
- ✅ All features work in browser

### Next Steps (Production)
1. Deploy to Soroban Testnet → Get Contract ID
2. Install `stellar-sdk` npm package
3. Implement wallet connection (Freighter/Demowallet)
4. Replace LocalStorage with blockchain RPC calls
5. Test on Soroban Testnet
6. Deploy frontend (Vercel/Netlify)

Detailed guide: See [DEPLOY_TO_SOROBAN.md](./DEPLOY_TO_SOROBAN.md)

---

## 🐛 Troubleshooting

### Data Not Saving?
```javascript
// In console:
localStorage.clear()
location.reload()
```

### Images Not Uploading?
- Maximum file size: 100KB for browser storage
- Supported formats: JPG, PNG, WebP, GIF
- Solution: Use smaller images or deploy to IPFS

### Smart Contract Build Fails?
```bash
rustup update
rustc --version  # Should be 1.70+
```

### LocalStorage vs Blockchain Storage
- **Current:** LocalStorage (browser-based, MVP)
- **Production:** Smart contract storage (Stellar blockchain)
- **Transition:** Automatic when connected to testnet

---

## 👤 Author

**Revano Fabiansyah Priadi**

- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your Profile](https://linkedin.com)

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

### Code Style
- **Frontend:** Standard JavaScript (ES6+)
- **Backend:** Rust with `cargo fmt`
- **Commits:** Clear, descriptive messages

---

## 📝 License

Licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🔗 Useful Links

| Resource | Link |
|----------|------|
| Stellar Documentation | https://developers.stellar.org/ |
| Soroban Documentation | https://soroban.stellar.org/docs |
| Soroban Studio | https://soroban.stellar.org/ |
| Stellar CLI | https://github.com/stellar/stellar-cli |
| Freighter Wallet | https://www.freighter.app/ |
| Testnet Faucet | https://laboratory.stellar.org/#account-creator |
| Testnet Explorer | https://stellar.expert/explorer/testnet |

---

## ⭐ Support

If this project helped you, please consider giving it a ⭐ on GitHub!

### Get Help
- 📖 **Docs:** Check the documentation files
- 🐛 **Issues:** GitHub Issues
- 💬 **Discussions:** GitHub Discussions

---

## 🎯 Roadmap

| Phase | Status | Features |
|-------|--------|----------|
| **Phase 1** | ✅ Done | Shopping CRUD, Images, Rewards, NFT, Leaderboard, Seed Data |
| **Phase 2** | ⏳ Next | Stellar Testnet Deployment, Wallet Integration |
| **Phase 3** | 📋 Planned | Blockchain Integration, Real NFT Minting |
| **Phase 4** | 📋 Planned | IPFS Integration, Frontend Deployment |
| **Phase 5** | 📋 Planned | Stellar Mainnet, Mobile App, Social Features |

---

## 🙋 FAQ

**Q: Do I need a wallet to use this?**  
A: Not for the MVP demo. Wallet integration comes in Phase 2.

**Q: Can I use this on mainnet?**  
A: Currently testnet-ready. Mainnet support planned for Phase 5.

**Q: Is my data secure?**  
A: Currently LocalStorage (browser). Full blockchain storage coming soon.

**Q: How do I deploy this?**  
A: See [DEPLOY_TO_SOROBAN.md](./DEPLOY_TO_SOROBAN.md)

**Q: Can I modify this code?**  
A: Yes! MIT License allows modifications. See [Contributing](#-contributing).

---

**Made with ❤️ for the Stellar ecosystem**

Last updated: April 2026  
Version: 1.0.0 - MVP  
Status: Production-Ready ✅
