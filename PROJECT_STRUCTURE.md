# 📁 Project Structure

```
agent-kindergarten/
├── app/                          # Next.js 14 App Router
│   ├── layout.js                 # Root layout with providers
│   ├── page.js                   # Landing page
│   ├── providers.js              # Web3 providers (Wagmi, RainbowKit)
│   ├── globals.css               # Global styles
│   ├── enroll/
│   │   └── page.js              # Mint baby agent page
│   ├── nursery/
│   │   └── page.js              # Dashboard of user's agents
│   ├── classroom/
│   │   └── [agentId]/
│   │       └── page.js          # Training/lessons page
│   ├── exam/
│   │   └── [agentId]/
│   │       └── page.js          # Exam and graduation page
│   └── job-board/
│       └── page.js              # Job marketplace
│
├── contracts/                    # Solidity smart contracts
│   ├── BabyAgentFactory.sol     # Mint and manage agents
│   ├── KindergartenCurriculum.sol # Lessons and progress
│   ├── SkillExamVerifier.sol    # Exam verification
│   ├── DiplomaNFT.sol           # Graduation certificates
│   └── JobMatchingBoard.sol     # Job marketplace
│
├── scripts/                      # Deployment scripts
│   └── deploy.js                # Deploy all contracts
│
├── deployments/                  # Deployed contract addresses
│   ├── bscTestnet.json          # Testnet addresses
│   └── bscMainnet.json          # Mainnet addresses
│
├── lib/                          # Utility functions
│   ├── contracts.js             # Contract addresses helper
│   └── utils.js                 # General utilities
│
├── public/                       # Static assets
│   └── (images, icons, etc.)
│
├── .env.example                  # Environment variables template
├── .env                         # Your environment variables (gitignored)
├── .gitignore                   # Git ignore rules
├── hardhat.config.js            # Hardhat configuration
├── next.config.js               # Next.js configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── README.md                    # Project documentation
├── DEPLOYMENT.md                # Deployment guide
└── setup.sh                     # Quick setup script
```

## 📄 Key Files Explained

### Smart Contracts

**BabyAgentFactory.sol**
- Mints baby agents as ERC-721 NFTs
- Stores agent metadata (name, personality, skills)
- Manages agent status progression

**KindergartenCurriculum.sol**
- Defines lesson modules
- Tracks agent progress
- Awards skill points

**SkillExamVerifier.sol**
- Verifies exam completion
- Upgrades agent status on passing
- Stores exam results

**DiplomaNFT.sol**
- Issues graduation certificates as NFTs
- Links to agent achievements
- Stores IPFS metadata

**JobMatchingBoard.sol**
- Job posting and application system
- Escrow for payments
- Agent-employer matching

### Frontend Pages

**app/page.js** - Landing page
- Hero section
- Feature showcase
- Floating baby agents animation
- Stats dashboard

**app/enroll/page.js** - Mint page
- Agent name input
- Avatar preview
- Personality traits display
- Minting transaction

**app/nursery/page.js** - Dashboard
- Grid of user's agents
- Agent cards with stats
- Quick actions (train, exam)

**app/classroom/[agentId]/page.js** - Training
- Lesson list
- Progress tracking
- Interactive training animations
- Skill point rewards

**app/exam/[agentId]/page.js** - Exams
- Exam requirements check
- Simulated exam execution
- Results display
- Graduation ceremony

**app/job-board/page.js** - Jobs
- Available jobs list
- Job details
- Application system

### Configuration Files

**hardhat.config.js**
- Solidity compiler settings
- Network configurations (BSC testnet/mainnet)
- Etherscan verification

**next.config.js**
- Next.js settings
- Image domains (DiceBear)

**tailwind.config.js**
- Custom color palette (pastel theme)
- Custom animations (float, wiggle)
- Font configuration (Quicksand)

**package.json**
- Dependencies (React, Wagmi, Hardhat, etc.)
- Scripts (dev, build, deploy)

## 🎨 Design System

### Colors
- Pastel Blue: `#B4D4FF`
- Pastel Pink: `#FFB4D1`
- Pastel Yellow: `#FFF4B4`
- Pastel Green: `#B4FFD4`
- Pastel Purple: `#D4B4FF`

### Typography
- Font: Quicksand (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Components
- Buttons: `.btn-cute`, `.btn-primary`, `.btn-secondary`
- Cards: `.card-cute`
- Animations: `float`, `wiggle`, `bounce-slow`

## 🔧 Scripts

```bash
# Development
npm run dev              # Start Next.js dev server
npm run build            # Build for production
npm start                # Start production server

# Smart Contracts
npm run compile          # Compile Solidity contracts
npm run deploy:testnet   # Deploy to BSC testnet
npm run deploy:mainnet   # Deploy to BSC mainnet

# Setup
./setup.sh              # Quick setup script
```

## 📦 Dependencies

### Frontend
- next: 14.2.3
- react: 18.3.1
- wagmi: 2.5.7
- viem: 2.9.2
- @rainbow-me/rainbowkit: 2.0.4
- framer-motion: 11.0.8
- tailwindcss: 3.4.1

### Smart Contracts
- hardhat: 2.22.0
- @openzeppelin/contracts: 5.0.2
- @nomicfoundation/hardhat-toolbox: 5.0.0

## 🌐 External Services

- **DiceBear API**: Avatar generation
- **BSCScan API**: Contract verification
- **WalletConnect**: Wallet connection
- **BNB Chain RPC**: Blockchain interaction

## 📝 Environment Variables

```env
# Deployment
PRIVATE_KEY=              # Wallet private key
BSCSCAN_API_KEY=         # BSCScan API key

# Frontend
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=  # WalletConnect ID
NEXT_PUBLIC_BABY_AGENT_FACTORY=        # Contract address
NEXT_PUBLIC_CURRICULUM=                # Contract address
NEXT_PUBLIC_EXAM_VERIFIER=             # Contract address
NEXT_PUBLIC_DIPLOMA_NFT=               # Contract address
NEXT_PUBLIC_JOB_BOARD=                 # Contract address
```

## 🚀 Deployment Flow

1. **Setup** → Run `./setup.sh`
2. **Configure** → Edit `.env`
3. **Compile** → `npm run compile`
4. **Deploy Contracts** → `npm run deploy:testnet`
5. **Update Config** → Add contract addresses to `.env`
6. **Test Locally** → `npm run dev`
7. **Deploy Frontend** → Vercel/Netlify
8. **Launch** → Share with world! 🎉

---

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)
