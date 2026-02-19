# ⚡ Quick Start Guide

Get Agent Kindergarten running in **5 minutes**!

## 🎯 Prerequisites

- Node.js 18+ installed
- MetaMask wallet
- 5 minutes of your time

## 🚀 Steps

### 1. Clone & Setup (1 minute)

```bash
cd agent-kindergarten
./setup.sh
```

This installs all dependencies and creates your `.env` file.

### 2. Configure Environment (1 minute)

Edit `.env` and add:

```env
PRIVATE_KEY=your_wallet_private_key_here
BSCSCAN_API_KEY=your_bscscan_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_id
```

**Where to get these:**
- **Private Key**: MetaMask → Account Details → Export Private Key
- **BSCScan API**: https://bscscan.com/apis (free)
- **WalletConnect ID**: https://cloud.walletconnect.com (free)

### 3. Get Testnet BNB (1 minute)

Visit: https://testnet.bnbchain.org/faucet-smart

Enter your wallet address, get 0.5 BNB.

### 4. Deploy Contracts (1 minute)

```bash
npm run deploy:testnet
```

This deploys all 5 contracts and saves addresses to `deployments/bscTestnet.json`.

### 5. Update Frontend Config (30 seconds)

Copy contract addresses from `deployments/bscTestnet.json` to `.env`:

```env
NEXT_PUBLIC_BABY_AGENT_FACTORY=0x...
NEXT_PUBLIC_CURRICULUM=0x...
NEXT_PUBLIC_EXAM_VERIFIER=0x...
NEXT_PUBLIC_DIPLOMA_NFT=0x...
NEXT_PUBLIC_JOB_BOARD=0x...
```

### 6. Start Frontend (30 seconds)

```bash
npm run dev
```

Visit: http://localhost:3000

## 🎉 Done!

You should now see:
- Landing page with floating baby agents
- "Adopt Baby Agent" button
- Wallet connection working

## 🧪 Test the Flow

1. Click "Adopt Baby Agent"
2. Connect MetaMask (switch to BSC Testnet)
3. Enter name: "TestAgent"
4. Click "Adopt" (pay 0.01 BNB)
5. Wait for transaction
6. See your agent in Nursery!

## 🐛 Troubleshooting

### "Cannot find module"
```bash
npm install
```

### "Insufficient funds"
Get more testnet BNB from faucet.

### "Wrong network"
Switch MetaMask to BSC Testnet (Chain ID: 97).

### "Contract not deployed"
Check `.env` has correct contract addresses.

### Frontend not loading
```bash
# Clear cache and restart
rm -rf .next
npm run dev
```

## 📚 Next Steps

- Read [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Read [DEMO_SCRIPT.md](./DEMO_SCRIPT.md) for hackathon presentation
- Read [BUILD_SUMMARY.md](./BUILD_SUMMARY.md) for complete overview

## 🆘 Need Help?

Check these files:
- `README.md` - Project overview
- `PROJECT_STRUCTURE.md` - File organization
- `DEPLOYMENT.md` - Detailed deployment guide

## 🎓 You're Ready!

Your Agent Kindergarten is now running locally. Time to:
- Test all features
- Deploy to production
- Present at hackathon
- Win prizes! 🏆

Good luck! 🚀
