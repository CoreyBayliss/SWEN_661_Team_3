@echo off
REM CareConnect Clean Installation Script (Windows)
REM This script removes all lock files and performs a clean npm install

echo.
echo ===========================================
echo CareConnect - Clean Installation Script
echo ===========================================
echo.

REM Step 1: Remove lock files
echo Step 1: Removing lock files...
if exist package-lock.json del /f /q package-lock.json
if exist pnpm-lock.yaml del /f /q pnpm-lock.yaml
if exist yarn.lock del /f /q yarn.lock
echo Lock files removed
echo.

REM Step 2: Remove node_modules
echo Step 2: Removing node_modules...
if exist node_modules rmdir /s /q node_modules
echo node_modules removed
echo.

REM Step 3: Clear npm cache
echo Step 3: Clearing npm cache...
call npm cache clean --force
echo Cache cleared
echo.

REM Step 4: Install dependencies
echo Step 4: Installing dependencies...
call npm install
echo.

REM Step 5: Check if installation was successful
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo Installation successful!
    echo ========================================
    echo.
    echo You can now run:
    echo   npm run dev          - Start development server
    echo   npm test             - Run tests
    echo   npm run test:coverage - Run tests with coverage
    echo   npm run test:e2e     - Run E2E tests
    echo.
) else (
    echo.
    echo ========================================
    echo Installation failed!
    echo ========================================
    echo.
    echo Please check:
    echo 1. Node version ^(should be ^>=18.0.0^): node --version
    echo 2. npm version ^(should be ^>=9.0.0^): npm --version
    echo 3. Internet connection
    echo 4. npm registry access: npm config get registry
    echo.
    echo For more help, see INSTALLATION_FIX.md
    pause
    exit /b 1
)

pause
