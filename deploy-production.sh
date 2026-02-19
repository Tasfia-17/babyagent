#!/bin/bash

echo "🎒 Agent Kindergarten - Production Deployment Script"
echo "===================================================="
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found!${NC}"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env and add your keys${NC}"
    exit 1
fi

# Check for required env variables
if ! grep -q "PRIVATE_KEY=.\+" .env; then
    echo -e "${RED}❌ PRIVATE_KEY not set in .env${NC}"
    exit 1
fi

if ! grep -q "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=.\+" .env; then
    echo -e "${RED}❌ NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID not set in .env${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables configured${NC}"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Compile contracts
echo "🔨 Compiling smart contracts..."
npm run compile
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to compile contracts${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Contracts compiled${NC}"
echo ""

# Deploy contracts
echo "🚀 Deploying contracts to BSC Testnet..."
npm run deploy:testnet
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to deploy contracts${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Contracts deployed${NC}"
echo ""

# Check if deployment file exists
if [ ! -f deployments/bscTestnet.json ]; then
    echo -e "${RED}❌ Deployment file not found${NC}"
    exit 1
fi

# Extract contract addresses
FACTORY=$(jq -r '.contracts.BabyAgentFactory' deployments/bscTestnet.json)
CURRICULUM=$(jq -r '.contracts.KindergartenCurriculum' deployments/bscTestnet.json)
EXAM=$(jq -r '.contracts.SkillExamVerifier' deployments/bscTestnet.json)
DIPLOMA=$(jq -r '.contracts.DiplomaNFT' deployments/bscTestnet.json)
JOBBOARD=$(jq -r '.contracts.JobMatchingBoard' deployments/bscTestnet.json)

echo "📝 Updating .env with contract addresses..."
sed -i.bak "s|NEXT_PUBLIC_BABY_AGENT_FACTORY=.*|NEXT_PUBLIC_BABY_AGENT_FACTORY=$FACTORY|" .env
sed -i.bak "s|NEXT_PUBLIC_CURRICULUM=.*|NEXT_PUBLIC_CURRICULUM=$CURRICULUM|" .env
sed -i.bak "s|NEXT_PUBLIC_EXAM_VERIFIER=.*|NEXT_PUBLIC_EXAM_VERIFIER=$EXAM|" .env
sed -i.bak "s|NEXT_PUBLIC_DIPLOMA_NFT=.*|NEXT_PUBLIC_DIPLOMA_NFT=$DIPLOMA|" .env
sed -i.bak "s|NEXT_PUBLIC_JOB_BOARD=.*|NEXT_PUBLIC_JOB_BOARD=$JOBBOARD|" .env
rm .env.bak
echo -e "${GREEN}✅ Contract addresses updated in .env${NC}"
echo ""

# Build frontend
echo "🏗️  Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to build frontend${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Frontend built${NC}"
echo ""

echo "🎉 Deployment Complete!"
echo ""
echo "📋 Contract Addresses:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "BabyAgentFactory:      $FACTORY"
echo "KindergartenCurriculum: $CURRICULUM"
echo "SkillExamVerifier:     $EXAM"
echo "DiplomaNFT:            $DIPLOMA"
echo "JobMatchingBoard:      $JOBBOARD"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🚀 Next Steps:"
echo "1. Test locally: npm run dev"
echo "2. Deploy to Vercel: vercel"
echo "3. Add contract addresses to Vercel environment variables"
echo ""
echo "📚 See PRODUCTION_DEPLOY.md for detailed instructions"
