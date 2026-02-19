# 🚀 Deployment Guide

## Prerequisites

1. **Node.js 18+** installed
2. **MetaMask** wallet with BNB
3. **BSCScan API Key** (get from https://bscscan.com/apis)
4. **WalletConnect Project ID** (get from https://cloud.walletconnect.com)

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

```bash
cp .env.example .env
```

Edit `.env` and add:

```env
# Your wallet private key (NEVER commit this!)
PRIVATE_KEY=your_private_key_here

# BSCScan API key for contract verification
BSCSCAN_API_KEY=your_bscscan_api_key

# WalletConnect project ID for RainbowKit
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
```

## Step 3: Get Testnet BNB

1. Go to https://testnet.bnbchain.org/faucet-smart
2. Enter your wallet address
3. Receive 0.5 BNB (enough for deployment)

## Step 4: Deploy Smart Contracts

### Compile Contracts

```bash
npm run compile
```

### Deploy to BSC Testnet

```bash
npm run deploy:testnet
```

This will:
- Deploy all 5 contracts
- Save addresses to `deployments/bscTestnet.json`
- Print contract addresses

### Verify Contracts (Optional)

```bash
npx hardhat verify --network bscTestnet <CONTRACT_ADDRESS>
```

## Step 5: Update Frontend Config

After deployment, copy contract addresses to `.env`:

```env
NEXT_PUBLIC_BABY_AGENT_FACTORY=0x...
NEXT_PUBLIC_CURRICULUM=0x...
NEXT_PUBLIC_EXAM_VERIFIER=0x...
NEXT_PUBLIC_DIPLOMA_NFT=0x...
NEXT_PUBLIC_JOB_BOARD=0x...
```

## Step 6: Run Frontend Locally

```bash
npm run dev
```

Visit http://localhost:3000

## Step 7: Deploy Frontend to Vercel

### Option A: Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B: GitHub Integration

1. Push code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add environment variables
5. Deploy

### Environment Variables for Vercel

Add these in Vercel dashboard:

```
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
NEXT_PUBLIC_BABY_AGENT_FACTORY
NEXT_PUBLIC_CURRICULUM
NEXT_PUBLIC_EXAM_VERIFIER
NEXT_PUBLIC_DIPLOMA_NFT
NEXT_PUBLIC_JOB_BOARD
```

## Step 8: Test the Application

1. **Connect Wallet** → Use MetaMask on BSC Testnet
2. **Mint Baby Agent** → Pay 0.01 BNB
3. **Complete Lesson** → Earn skill points
4. **Take Exam** → Graduate your agent
5. **Check Job Board** → Browse available jobs

## Mainnet Deployment

⚠️ **IMPORTANT**: Test thoroughly on testnet first!

```bash
npm run deploy:mainnet
```

## Troubleshooting

### "Insufficient funds"
- Get more testnet BNB from faucet
- Check you're on correct network

### "Contract not deployed"
- Verify deployment succeeded
- Check contract addresses in .env
- Ensure network matches (testnet vs mainnet)

### "Transaction failed"
- Increase gas limit in MetaMask
- Check contract has correct permissions
- Verify you own the agent NFT

### Frontend not loading contracts
- Clear browser cache
- Check .env variables are set
- Restart dev server after .env changes

## Production Checklist

- [ ] All contracts deployed and verified
- [ ] Frontend environment variables set
- [ ] Tested minting on testnet
- [ ] Tested lessons on testnet
- [ ] Tested exams on testnet
- [ ] Tested job board on testnet
- [ ] Security audit completed (for mainnet)
- [ ] Documentation updated
- [ ] Social media ready
- [ ] Support channels set up

## Support

- GitHub Issues: [Your Repo]
- Discord: [Your Discord]
- Twitter: [Your Twitter]

---

Good luck with your launch! 🎓
