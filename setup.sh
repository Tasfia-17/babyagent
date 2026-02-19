#!/bin/bash

echo "🎒 Agent Kindergarten - Quick Setup"
echo "===================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm first."
    exit 1
fi

echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env and add your:"
    echo "   - PRIVATE_KEY"
    echo "   - BSCSCAN_API_KEY"
    echo "   - NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Create deployments directory
mkdir -p deployments

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Edit .env with your keys"
echo "2. Get testnet BNB: https://testnet.bnbchain.org/faucet-smart"
echo "3. Deploy contracts: npm run deploy:testnet"
echo "4. Start frontend: npm run dev"
echo ""
echo "For detailed instructions, see DEPLOYMENT.md"
