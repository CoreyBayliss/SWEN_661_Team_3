# Installation Fix for CareConnect

## Issue
The error mentions `@brightpath/common` and `@brightpath/activity-stream` packages that don't exist in our package.json. This is likely due to cached lock files.

## Solution

### Step 1: Clean All Lock Files and Cache

```bash
# Remove all lock files
rm -f package-lock.json
rm -f pnpm-lock.yaml
rm -f yarn.lock

# Remove node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force
```

### Step 2: Install Dependencies

```bash
# Install with npm (recommended)
npm install
```

### Step 3: Verify Installation

```bash
# Check if installation was successful
npm list

# Try running tests
npm test
```

## Alternative: If Using pnpm

If you prefer pnpm, make sure to use a clean install:

```bash
# Remove pnpm store
pnpm store prune

# Clean install
pnpm install --force
```

## Alternative: If Using Yarn

If you prefer yarn:

```bash
# Remove yarn cache
yarn cache clean

# Clean install
yarn install --force
```

## Verification

After successful installation, you should be able to run:

```bash
# Development server
npm run dev

# Tests
npm test

# Coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

## What Was Fixed

1. ✅ Fixed typo in `lucide-react` version (`0.index363.0` → `0.363.0`)
2. ✅ Removed any references to private `@brightpath` packages
3. ✅ Ensured all dependencies are from public npm registry

## If Problems Persist

1. **Check Node Version**:
   ```bash
   node --version  # Should be >=18.0.0
   npm --version   # Should be >=9.0.0
   ```

2. **Use Specific npm Version**:
   ```bash
   npm install -g npm@latest
   ```

3. **Manual Installation of Key Dependencies**:
   ```bash
   npm install react react-dom react-router
   npm install -D vitest @vitest/ui @vitest/coverage-v8
   npm install -D @playwright/test
   npm install -D @testing-library/react @testing-library/user-event
   ```

4. **Contact Support**:
   - Check if behind corporate proxy
   - Verify npm registry access: `npm config get registry`
   - Should be: `https://registry.npmjs.org/`

## Quick Start After Installation

```bash
# Start development
npm run dev

# Run all tests
npm run test:all

# View coverage
npm run test:coverage
open coverage/index.html
```

---

**Status**: Ready to use after clean install  
**Last Updated**: March 17, 2026
