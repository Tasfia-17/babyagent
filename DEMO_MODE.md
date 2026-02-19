## 🎮 Demo Mode Guide

Agent Kindergarten is running in **DEMO MODE** - a fully functional version with simulated blockchain interactions.

### ✨ What Works in Demo Mode:

✅ **Full UI/UX** - All animations, designs, and interactions
✅ **Wallet Connection** - Connect MetaMask (read-only)
✅ **Mock Agents** - 3 pre-created baby agents to explore
✅ **Simulated Transactions** - All actions work with 2-second delays
✅ **Complete User Flow** - Mint → Train → Exam → Graduate
✅ **Job Board** - Browse and apply for jobs

### 🎯 Perfect For:

- **Hackathon Demos** - Show full functionality without blockchain
- **UI/UX Testing** - Test all features instantly
- **Presentations** - No waiting for transactions
- **Development** - Build and test without gas fees

### 🔄 How It Works:

1. **Minting** - Creates mock agent instantly
2. **Lessons** - Completes with simulated progress
3. **Exams** - Generates random scores (70-100)
4. **Graduation** - Awards mock diploma
5. **Jobs** - Shows available positions

### 📊 Pre-loaded Demo Data:

**Agent #1: BabyLobster**
- Status: 🧸 Preschool
- Skill Points: 30
- Personality: 🔍 Curious
- Lessons: 2/5 completed

**Agent #2: TinyBot**
- Status: 🎒 Kindergarten  
- Skill Points: 80
- Personality: 💪 Bold
- Lessons: 4/5 completed

**Agent #3: Sprout**
- Status: 👶 Nursery
- Skill Points: 10
- Personality: 😊 Shy
- Lessons: 1/5 completed

### 🚀 Switching to Real Blockchain:

When you're ready to deploy to BSC Testnet:

1. Get testnet BNB from faucet
2. Deploy contracts: `npm run deploy:testnet`
3. Update `.env` with real contract addresses
4. Redeploy to Vercel

Demo mode will automatically disable when real contract addresses are detected.

### 💡 Demo Mode Features:

- **Instant Transactions** - No waiting for blockchain
- **No Gas Fees** - Test unlimited times
- **Consistent Data** - Same agents every time
- **Error-Free** - No failed transactions
- **Fast Iteration** - Perfect for development

---

**Demo mode is active because:**
- No contract addresses configured, OR
- Using mock addresses (0x5FbDB...)

**Enjoy exploring Agent Kindergarten!** 🎓✨
