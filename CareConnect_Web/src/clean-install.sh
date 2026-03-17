#!/bin/bash

# CareConnect Clean Installation Script
# This script removes all lock files and performs a clean npm install

echo "🧹 CareConnect - Clean Installation Script"
echo "=========================================="
echo ""

# Step 1: Remove lock files
echo "📦 Step 1: Removing lock files..."
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -f yarn.lock
echo "✅ Lock files removed"
echo ""

# Step 2: Remove node_modules
echo "📂 Step 2: Removing node_modules..."
rm -rf node_modules
echo "✅ node_modules removed"
echo ""

# Step 3: Clear npm cache
echo "🗑️  Step 3: Clearing npm cache..."
npm cache clean --force
echo "✅ Cache cleared"
echo ""

# Step 4: Install dependencies
echo "📥 Step 4: Installing dependencies..."
npm install
echo ""

# Step 5: Verify installation
if [ $? -eq 0 ]; then
    echo "✅ Installation successful!"
    echo ""
    echo "🎉 You can now run:"
    echo "   npm run dev          # Start development server"
    echo "   npm test             # Run tests"
    echo "   npm run test:coverage # Run tests with coverage"
    echo "   npm run test:e2e     # Run E2E tests"
else
    echo "❌ Installation failed!"
    echo ""
    echo "Please check:"
    echo "1. Node version (should be >=18.0.0): node --version"
    echo "2. npm version (should be >=9.0.0): npm --version"
    echo "3. Internet connection"
    echo "4. npm registry access: npm config get registry"
    echo ""
    echo "For more help, see INSTALLATION_FIX.md"
    exit 1
fi
