# 🚀 Deploy Receipt Vault to Soroban Studio

Complete guide untuk deploy project ke Soroban Studio dan test di Stellar testnet.

---

## 📋 Prerequisites

Pastikan sudah install:
- ✅ Rust & Cargo
- ✅ Stellar CLI
- ✅ Soroban CLI
- ✅ Node.js (untuk frontend)

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Install Soroban CLI
cargo install soroban-cli

# Verify installations
rustc --version
cargo --version
soroban --version
```

---

## 🔹 Step 1: Prepare Project for Export

### Create ZIP File

**Windows (PowerShell):**
```powershell
cd "c:\Users\REVANO PC\Documents\Project Web3"
Compress-Archive -Path "Receipt-Vault-Shop-Chain" -DestinationPath "Receipt-Vault-Shop-Chain.zip"
```

**macOS/Linux:**
```bash
cd ~/Documents/Project\ Web3
zip -r Receipt-Vault-Shop-Chain.zip Receipt-Vault-Shop-Chain/
```

### Project Structure Check
```
Receipt-Vault-Shop-Chain.zip
├── contracts/
│   └── shopping/
│       ├── Cargo.toml
│       ├── Makefile
│       └── src/
│           ├── lib.rs          ← Smart contract
│           └── test.rs
├── frontend/
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── ... (other files)
├── Cargo.toml                   ← Workspace config
└── README.md
```

---

## 🔹 Step 2: Import to Soroban Studio

### Option A: Online (Easier)
1. Go to https://soroban.stellar.org/
2. Click **"Build"** or **"Studio"**
3. Sign in with GitHub
4. Click **"New Project"**
5. Choose **"Import from ZIP"**
6. Upload `Receipt-Vault-Shop-Chain.zip`
7. Wait for import...

### Option B: Local Soroban Setup
1. Open terminal in project root
2. Run:
```bash
cd Receipt-Vault-Shop-Chain
soroban contract build --package shopping
```

### Option C: VS Code + Soroban Extension
1. Install Soroban extension (if available)
2. Open project folder
3. Right-click → "Build Contract"
4. Wait for compilation

---

## 🔹 Step 3: Configure for Testnet

### Update Soroban Config

Create `.env` file in project root:
```bash
SOROBAN_NETWORK=testnet
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
SOROBAN_ACCOUNT=YOUR_PUBLIC_KEY
SOROBAN_SECRET_KEY=YOUR_SECRET_KEY
```

**Or use Soroban CLI:**
```bash
soroban config identity generate --name myaccount
soroban config network add testnet \
  --rpc-url https://soroban-testnet.stellar.org \
  --network-passphrase "Test SDF Network ; September 2015"
```

---

## 🔹 Step 4: Deploy Smart Contract

### Build for WASM
```bash
cd Receipt-Vault-Shop-Chain/contracts/shopping
cargo build --release --target wasm32-unknown-unknown
```

### Deploy to Testnet
```bash
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/shopping.wasm \
  --network testnet \
  --source myaccount
```

**Output:**
```
Contract ID: C...........................
Status: ✅ Deployed Successfully!
Network: Stellar Testnet
```

### Save Contract ID
```bash
# Save to .env
echo "CONTRACT_ID=C........................." >> .env
```

---

## 🔹 Step 5: Connect Frontend to Blockchain

### Update script.js

Replace LocalStorage calls with blockchain:

```javascript
// Before (LocalStorage):
const items = JSON.parse(localStorage.getItem('receiptvault_items'));

// After (Blockchain):
const items = await sorobanClient.invoke({
    contractId: CONTRACT_ID,
    method: 'get_items',
    args: [],
    signAndSend: true
});
```

### Add Stellar.js Integration

```bash
npm install stellar-sdk soroban-client
```

Create `blockchain-config.js`:
```javascript
import { SorobanRpc, Account, TransactionBuilder } from 'stellar-sdk';

const CONTRACT_ID = 'C...........';
const RPC_URL = 'https://soroban-testnet.stellar.org';

export const sorobanRpc = new SorobanRpc.Server(RPC_URL);

export async function invokeContract(method, args) {
    // Implementation for contract calls
}
```

---

## 🔹 Step 6: Setup Wallet Connection

### Install Wallet Extension
- Stellar Demowallet: https://demo-wallet.stellar.org/
- Freighter: https://www.freighter.app/

### Connect in Frontend

```html
<button onclick="connectWallet()">Connect Stellar Wallet</button>

<script>
async function connectWallet() {
    if (window.stellar) {
        const publicKey = await window.stellar.getPublicKey();
        console.log('Connected:', publicKey);
        // Save and use for transactions
    }
}
</script>
```

---

## 🔹 Step 7: Test on Testnet

### Test Script
```bash
# Get funding from friendbot
curl "https://friendbot.stellar.org?addr=GXXXXXXXXXXXXXXXXX"

# Run tests
cargo test --package shopping

# Invoke contract function
soroban contract invoke \
  --id C................. \
  --network testnet \
  --source myaccount \
  -- \
  get_items
```

### Expected Output
```json
{
  "items": [
    {
      "id": 1,
      "name": "Apples",
      "category": "groceries",
      "price": 5000,
      "quantity": 2,
      "purchased": false,
      "timestamp": 1715787600
    }
  ]
}
```

---

## 🔹 Step 8: Frontend Environment Setup

### Create `.env.production`
```bash
REACT_APP_CONTRACT_ID=C.................
REACT_APP_NETWORK=testnet
REACT_APP_RPC_URL=https://soroban-testnet.stellar.org
```

### Build Frontend
```bash
cd frontend
npm install  # if needed
npm run build  # if using build tool
```

---

## ✅ Verification Checklist

- [ ] Project zipped
- [ ] Imported to Soroban Studio
- [ ] Contract builds without errors
- [ ] Deployed to testnet
- [ ] Have Contract ID
- [ ] Wallet connected in frontend
- [ ] Can invoke contract functions
- [ ] Data persists on-chain
- [ ] Leaderboard updates from blockchain
- [ ] Rewards system works

---

## 🔗 Useful Links

### Stellar Resources
- [Stellar Docs](https://developers.stellar.org/)
- [Soroban Docs](https://soroban.stellar.org/)
- [Soroban Studio](https://soroban.stellar.org/)
- [Stellar Testnet](https://testnet.stellar.expert/)

### Developer Tools
- [Stellar Expert](https://stellar.expert/) - Transaction explorer
- [Soroban CLI](https://soroban.stellar.org/docs/build-run-contract) - Local testing
- [Demo Wallet](https://demo-wallet.stellar.org/) - Web wallet

---

## 🛠️ Troubleshooting

### "Contract build failed"
```bash
# Update Soroban SDK
cargo update
# Rebuild
cargo build --release --target wasm32-unknown-unknown
```

### "Cannot connect to testnet"
```bash
# Check network connectivity
soroban config network ls
# Verify RPC URL is accessible
curl https://soroban-testnet.stellar.org
```

### "Wallet not detecting on page"
```javascript
// Add delay for Freighter injection
setTimeout(() => {
    if (window.stellar) console.log('Wallet ready');
}, 1000);
```

### "Contract invocation timeout"
```bash
# Increase timeout in Soroban config
soroban config set --timeout 60
```

---

## 📱 Next Steps

1. **Deploy to Mainnet** (after thorough testing)
2. **Add NFT Metadata** (IPFS integration)
3. **Launch Marketing** (get users)
4. **Monitor Performance** (telemetry)
5. **Gather Feedback** (iterate)

---

## 🎉 Success!

Once deployed:
- ✅ Users can connect Stellar wallets
- ✅ Shopping tracked on blockchain
- ✅ Rewards stored on-chain
- ✅ NFTs truly owned by users
- ✅ Leaderboard decentralized

---

**Happy deploying! 🚀**

Questions? Check:
- `README.md` for project overview
- `REWARDS_SYSTEM.md` for reward details  
- `DEVELOPMENT.md` for dev setup
