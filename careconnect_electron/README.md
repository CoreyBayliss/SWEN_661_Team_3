# CareConnect Electron

A desktop healthcare application built with Electron, React, and TypeScript. This is a desktop version of the CareConnect mobile app, providing comprehensive medication management and healthcare scheduling features.

## Features

- 💊 **Medication Management**: Track medications, doses, schedules, and refills
- 📅 **Appointment Scheduling**: View and manage healthcare appointments
- 📱 **Communications**: Quick message templates for healthcare providers
- ⚙️ **Accessibility**: Customizable text size, high contrast mode, and more
- 💾 **Local Storage**: All data stored securely on your device

## Prerequisites

- Node.js 18 or higher
- npm 9 or higher

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Run the application in development mode:

```bash
npm run dev
```

This will start both the Vite development server and the Electron app with hot reload enabled.

## Building

### Build for all platforms
```bash
npm run package
```

### Build for specific platforms
```bash
# Windows
npm run package:win

# macOS
npm run package:mac

# Linux
npm run package:linux
```

The built applications will be in the `release` folder.

## Project Structure

```
careconnect_electron/
├── electron/           # Electron main process files
│   ├── main.ts        # Main process entry point
│   └── preload.ts     # Preload script for IPC
├── src/
│   ├── models/        # TypeScript interfaces and types
│   ├── providers/     # React Context providers
│   ├── screens/       # Application screens/pages
│   ├── styles/        # CSS stylesheets
│   ├── App.tsx        # Main React component
│   └── main.tsx       # React entry point
├── public/            # Static assets
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application
- `npm run package` - Build and package for distribution
- `npm run lint` - Run ESLint
- `npm test` - Run tests (when configured)

## Technology Stack

- **Electron**: Desktop application framework
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Vite**: Build tool and dev server
- **React Router**: Navigation
- **Electron Store**: Persistent data storage

## Features Implementation

### Authentication
- Simple username/password login
- Session persistence

### Medication Management
- Add, view, edit, and delete medications
- Track medication history
- Low refill warnings
- Request refills

### Appointments
- View upcoming appointments
- Calendar view
- Appointment details

### Communications
- Predefined message templates
- Contact directory
- Quick messaging interface

### Settings
- Adjustable text size
- High contrast mode
- Voice assistance toggle
- Notification preferences

## Development Notes

### Main Process (electron/main.ts)
Handles window creation, IPC communication, and electron-store integration.

### Renderer Process (src/)
Contains all React components, screens, and UI logic.

### IPC Communication
The preload script exposes a safe API for renderer-main process communication via `window.electronAPI`.

### Data Persistence
Uses electron-store for persistent local storage of app data.

## Accessibility

The application includes several accessibility features:
- Adjustable text size
- High contrast mode option
- Keyboard navigation support
- Screen reader friendly markup

## License

MIT License - SWEN 661 Team 3

## Support

For issues or questions, please refer to the project documentation or contact the development team.
