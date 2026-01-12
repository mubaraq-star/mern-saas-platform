#!/bin/bash

# NestJS SaaS Platform - Development Setup Script

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                                                               ║"
echo "║   🚀 NestJS SaaS Platform - Development Setup               ║"
echo "║                                                               ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js >= 16.0.0${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"

# Check if MongoDB is running
if command -v mongosh &> /dev/null; then
    if mongosh --eval "db.version()" &> /dev/null; then
        echo -e "${GREEN}✅ MongoDB is running${NC}"
    else
        echo -e "${YELLOW}⚠️  MongoDB is not running. Please start MongoDB or update MONGODB_URI in .env${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  MongoDB CLI not found. Make sure MongoDB is accessible${NC}"
fi

echo ""
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencies installed successfully${NC}"
else
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo ""
# Check if .env exists
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}📝 Creating .env file from .env.example...${NC}"
    cp .env.example .env
    echo -e "${GREEN}✅ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your configuration before starting the server${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

echo ""
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                    Setup Complete! 🎉                         ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Next steps:"
echo ""
echo "1. Update your .env file with proper values:"
echo "   - MONGODB_URI"
echo "   - JWT_SECRET and JWT_REFRESH_SECRET"
echo "   - STRIPE_SECRET_KEY (if using Stripe)"
echo "   - Email configuration"
echo ""
echo "2. Start the development server:"
echo "   ${GREEN}npm run start:dev${NC}"
echo ""
echo "3. Access the application:"
echo "   - API: http://localhost:5000"
echo "   - Docs: http://localhost:5000/api/docs"
echo "   - Health: http://localhost:5000/api/health"
echo ""
echo "4. Read the documentation:"
echo "   - SETUP.md - Setup instructions"
echo "   - ARCHITECTURE.md - Architecture details"
echo ""
