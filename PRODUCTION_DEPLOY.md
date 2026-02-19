# 🚀 Production Deployment Guide

## Step 1: Get Required API Keys (5 minutes)

### 1.1 WalletConnect Project ID
1. Go to https://cloud.walletconnect.com
2. Sign up / Log in
3. Create new project: "Agent Kindergarten"
4. Copy the Project ID
5. Add to `.env`: `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id`

### 1.2 BSCScan API Key
1. Go to https://bscscan.com/apis
2. Sign up / Log in
3. Create API Key
4. Add to `.env`: `BSCSCAN_API_KEY=your_api_key`

### 1.3 Wallet Private Key
1. Open MetaMask
2. Click account → Account Details → Export Private Key
3. Add to `.env`: `PRIVATE_KEY=your_private_key`
4. ⚠️ **NEVER commit this file!**

## Step 2: Get Testnet BNB (2 minutes)

1. Go to https://testnet.bnbchain.org/faucet-smart
2. Enter your wallet address
3. Receive 0.5 BNB (enough for deployment + testing)

## Step 3: Deploy Smart Contracts (3 minutes)

```bash
# Install dependencies
npm install

# Compile contracts
npm run compile

# Deploy to BSC Testnet
npm run deploy:testnet
```

This will:
- Deploy all 5 contracts
- Save addresses to `deployments/bscTestnet.json`
- Print contract addresses

## Step 4: Update Frontend Config (1 minute)

Copy contract addresses from `deployments/bscTestnet.json` to `.env`:

```env
NEXT_PUBLIC_BABY_AGENT_FACTORY=0x...
NEXT_PUBLIC_CURRICULUM=0x...
NEXT_PUBLIC_EXAM_VERIFIER=0x...
NEXT_PUBLIC_DIPLOMA_NFT=0x...
NEXT_PUBLIC_JOB_BOARD=0x...
```

## Step 5: Test Locally (2 minutes)

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- ✅ Connect wallet
- ✅ Mint baby agent
- ✅ Complete lesson
- ✅ Take exam

## Step 6: Deploy to Vercel (3 minutes)

### Option A: Vercel CLI
```bash
npm install -g vercel
vercel
```

### Option B: GitHub Integration
1. Push code to GitHub (already done!)
2. Go to https://vercel.com
3. Import repository: `Tasfia-17/babyagent`
4. Add environment variables:
   - `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
   - `NEXT_PUBLIC_BABY_AGENT_FACTORY`
   - `NEXT_PUBLIC_CURRICULUM`
   - `NEXT_PUBLIC_EXAM_VERIFIER`
   - `NEXT_PUBLIC_DIPLOMA_NFT`
   - `NEXT_PUBLIC_JOB_BOARD`
5. Deploy!

## Step 7: Verify Contracts (Optional, 5 minutes)

```bash
npx hardhat verify --network bscTestnet <CONTRACT_ADDRESS>
```

Do this for all 5 contracts to get verified checkmark on BSCScan.

## Step 8: Final Testing (5 minutes)

On your deployed site:
1. Connect wallet (BSC Testnet)
2. Mint baby agent (0.01 BNB)
3. Go to classroom
4. Complete a lesson
5. Take exam
6. Graduate!

## 🎉 You're Live!

Your Agent Kindergarten is now:
- ✅ Deployed on BSC Testnet
- ✅ Frontend live on Vercel
- ✅ Fully functional
- ✅ Ready for hackathon demo

## 📊 Monitoring

- **Contracts**: https://testnet.bscscan.com
- **Frontend**: Your Vercel URL
- **Wallet**: MetaMask on BSC Testnet

## 🐛 Troubleshooting

### "Transaction failed"
- Check you have testnet BNB
- Verify contract addresses in .env
- Check network is BSC Testnet (Chain ID: 97)

### "Contract not found"
- Verify deployment succeeded
- Check addresses match in .env
- Restart dev server after .env changes

### "Wallet not connecting"
- Check WalletConnect Project ID is correct
- Try different browser
- Clear cache and reconnect

## 🚀 Going to Mainnet

When ready for mainnet:
1. Get real BNB (~0.5 BNB for deployment)
2. Deploy: `npm run deploy:mainnet`
3. Update .env with mainnet addresses
4. Update Vercel environment variables
5. Test with small amounts first!

## 📞 Support

- GitHub Issues: https://github.com/Tasfia-17/babyagent/issues
- BSC Docs: https://docs.bnbchain.org
- Vercel Docs: https://vercel.com/docs

---

**Total Time: ~20 minutes** ⏱️

Good luck! 🎓✨
