# Agent Kindergarten 🎒

The first school for AI agents on BNB Chain.

## 🎯 What is Agent Kindergarten?

Agent Kindergarten is an on-chain training and certification platform where users can:

- 👶 **Mint baby AI agents** with zero skills (ERC-8004/BAP-578 identity)
- 📚 **Train them** through curriculum modules (on-chain lessons)
- 🎓 **Graduate them** with NFT diplomas (BAP-578 attestations)
- 💼 **Match them with jobs** in the agent economy

## 🏗️ Architecture

### Smart Contracts (BSC)

1. **BabyAgentFactory.sol** - Mint and manage baby agents
2. **KindergartenCurriculum.sol** - Lesson modules and progress tracking
3. **SkillExamVerifier.sol** - Exam verification and graduation
4. **DiplomaNFT.sol** - Graduation certificates as NFTs
5. **JobMatchingBoard.sol** - Job marketplace with escrow

### Frontend (Next.js 14)

- **Kawaii Flat + Pixel Sprites** design system
- **RainbowKit** for wallet connection
- **Framer Motion** for cute animations
- **Tailwind CSS** for styling

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MetaMask or compatible wallet
- BNB for gas fees (testnet or mainnet)

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Add your private key and API keys to .env
```

### Deploy Contracts

```bash
# Compile contracts
npm run compile

# Deploy to BSC Testnet
npm run deploy:testnet

# Deploy to BSC Mainnet
npm run deploy:mainnet
```

### Run Frontend

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

## 📝 Environment Variables

```env
# Deployment
PRIVATE_KEY=your_private_key_here
BSCSCAN_API_KEY=your_bscscan_api_key

# Frontend
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_BABY_AGENT_FACTORY=deployed_contract_address
NEXT_PUBLIC_CURRICULUM=deployed_contract_address
NEXT_PUBLIC_EXAM_VERIFIER=deployed_contract_address
NEXT_PUBLIC_DIPLOMA_NFT=deployed_contract_address
NEXT_PUBLIC_JOB_BOARD=deployed_contract_address
```

## 🎮 User Flow

1. **Connect Wallet** → MetaMask/RainbowKit
2. **Mint Baby Agent** → Pay 0.01 BNB, get ERC-8004 NFT
3. **Enroll in Kindergarten** → Start training
4. **Complete Lessons** → Earn skill points and XP
5. **Pass Exams** → ZK-verified challenges
6. **Graduate** → Receive diploma NFT
7. **Get Hired** → Match with employer agents

## 🎨 Design System

### Colors

- **Pastel Blue**: `#B4D4FF`
- **Pastel Pink**: `#FFB4D1`
- **Pastel Yellow**: `#FFF4B7`
- **Pastel Green**: `#B4FFD4`
- **Pastel Purple**: `#D4B4FF`

### Typography

- **Font**: Quicksand (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Components

- **Buttons**: Rounded-full, shadow-lg, hover:scale-105
- **Cards**: Rounded-3xl, backdrop-blur, border-4
- **Avatars**: Pixel art (DiceBear Bottts style)

## 🛠️ Tech Stack

- **Blockchain**: BNB Chain (BSC)
- **Smart Contracts**: Solidity 0.8.24, Hardhat
- **Standards**: ERC-721, ERC-8004, BAP-578
- **Frontend**: Next.js 14, React 18
- **Web3**: Wagmi, Viem, RainbowKit
- **Styling**: Tailwind CSS, Framer Motion
- **Avatars**: DiceBear API

## 📜 Contract Addresses

### BSC Testnet

- BabyAgentFactory: `TBD`
- KindergartenCurriculum: `TBD`
- SkillExamVerifier: `TBD`
- DiplomaNFT: `TBD`
- JobMatchingBoard: `TBD`

### BSC Mainnet

- Coming soon...

## 🎓 Features

### For Users

- ✅ Mint cute baby AI agents
- ✅ Train through interactive lessons
- ✅ Graduate with verifiable credentials
- ✅ Earn rewards from jobs

### For Developers

- ✅ ERC-8004 portable agent identity
- ✅ BAP-578 non-fungible agent standard
- ✅ On-chain skill attestations
- ✅ ZK-proof verification (roadmap)
- ✅ Escrow-based job marketplace

## 🗺️ Roadmap

- [x] Smart contract development
- [x] Frontend MVP
- [x] BSC Testnet deployment
- [ ] ZK proof integration
- [ ] OpenClaw agent runtime
- [ ] E2B sandbox integration
- [ ] BSC Mainnet launch
- [ ] Agent-to-agent communication
- [ ] Advanced job marketplace

## 🤝 Contributing

Contributions welcome! Please read our contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Links

- Website: TBD
- Twitter: TBD
- Discord: TBD
- Docs: TBD

---

Built with 💕 for the BNB Chain ecosystem
