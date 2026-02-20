# CareConnect Electron - Quick Start Guide

## Installation

1. **Install Node.js** (if not already installed)
   - Download from https://nodejs.org/ (LTS version recommended)
   - Verify installation: `node --version`

2. **Navigate to the project folder**
   ```bash
   cd careconnect_electron
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```
   This may take a few minutes to download all required packages.

## Running the Application

### Development Mode
```bash
npm run dev
```
This will:
- Start the development server
- Open the Electron application
- Enable hot-reload (changes reflect immediately)

### Production Build
To create a distributable application:

```bash
# Build for Windows
npm run package:win

# Build for macOS
npm run package:mac

# Build for Linux
npm run package:linux
```

The built application will be in the `release` folder.

## First Time Setup

1. **Login Screen**
   - Enter any username and password (demo mode)
   - Click "Sign In"

2. **Onboarding**
   - Follow the welcome screens
   - Click "Get Started" or "Skip"

3. **Start Using CareConnect**
   - View medications and appointments
   - Add new medications
   - Customize settings for accessibility

## Troubleshooting

### "npm: command not found"
- Install Node.js from nodejs.org

### "Cannot find module"
- Delete `node_modules` folder
- Run `npm install` again

### Application won't start
- Check that no other instance is running
- Close all terminals and try again
- Run `npm run dev` from the project folder

### Port already in use
- Close other development servers
- Or change port in vite.config.ts

## Features to Try

1. **Add a Medication**
   - Click "Medications"
   - Click "+ Add"
   - Fill in the form

2. **View Today's Schedule**
   - Click "Today's Schedule" from home
   - Mark medications as taken/skipped

3. **Customize Accessibility**
   - Click Settings (gear icon)
   - Adjust text size slider
   - Toggle high contrast mode

4. **Request a Refill**
   - Open a medication with low refills
   - Click "Request Refill"

## Default Test Data

The app includes sample data:
- 2 medications (Lisinopril, Metformin)
- 2 appointments
- 3 healthcare contacts
- Message templates

## Getting Help

- Check README.md for detailed documentation
- Review the Flutter version for feature reference
- Contact the development team

---

**Developed by SWEN 661 Team 3**
