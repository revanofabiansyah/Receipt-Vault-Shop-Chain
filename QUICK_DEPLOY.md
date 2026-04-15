# 🚀 Quick Deploy Guide - Receipt Vault to Soroban

## 5-Minute Setup

### 1️⃣ ZIP Project
```powershell
# Windows
cd "c:\Users\REVANO PC\Documents\Project Web3"
Compress-Archive -Path "Receipt-Vault-Shop-Chain" -DestinationPath "Receipt-Vault-Shop-Chain.zip"
```

### 2️⃣ Go to Soroban Studio
https://soroban.stellar.org/ → Click "Build" → "New Project"

### 3️⃣ Import ZIP
- Choose "Import from Archive"
- Upload `Receipt-Vault-Shop-Chain.zip`
- Wait ⏳

### 4️⃣ Build Contract
```bash
cd Receipt-Vault-Shop-Chain
soroban contract build --package shopping
```

### 5️⃣ Deploy to Testnet
```bash
# Get wallet
soroban config identity generate --name myaccount

# Fund from faucet (get testnet LUMENS)
curl "https://friendbot.stellar.org?addr=$(soroban config identity address myaccount)"

# Deploy
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/shopping.wasm \
  --network testnet \
  --source myaccount
```

✅ **You now have a Contract ID!**

---

## Testing Command

```bash
# Call get_items function
soroban contract invoke \
  --id YOUR_CONTRACT_ID \
  --network testnet \
  --source myaccount \
  -- \
  get_items
```

---

## Connect Frontend (Later)

When ready to integrate:
1. Install `stellar-sdk` + `soroban-client`
2. Replace LocalStorage with contract calls
3. Connect Freighter wallet
4. Deploy frontend to Vercel/Netlify

---

## Status

- ✅ Contract: Ready
- ✅ Seed data: Ready (9 sample items)
- ✅ Rewards system: Ready
- ⏳ Blockchain: Ready to deploy
- ⏳ Frontend integration: Next step

**See `DEPLOY_TO_SOROBAN.md` for detailed instructions**
