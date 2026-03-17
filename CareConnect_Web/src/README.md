# CareConnect Healthcare Application

A comprehensive mobile healthcare application with left-hand accessibility framework, medication management, and PWA capabilities.

## 🚀 Quick Start

### Installation

**Option 1: Automated Clean Install (Recommended)**

```bash
# Mac/Linux
chmod +x clean-install.sh
./clean-install.sh

# Windows
clean-install.bat
```

**Option 2: Manual Installation**

```bash
# Remove old installations
rm -rf node_modules package-lock.json pnpm-lock.yaml yarn.lock
npm cache clean --force

# Install dependencies
npm install
```

### Running the Application

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🧪 Testing

### Run Tests

```bash
# Unit & integration tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage

# E2E tests
npm run test:e2e

# All tests
npm run test:all
```

### View Coverage

```bash
npm run test:coverage
open coverage/index.html
```

## 📚 Documentation

### Testing Documentation
- **[TESTING_SUMMARY.md](./TESTING_SUMMARY.md)** - Quick overview and getting started
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Complete testing guide
- **[REACT_TESTING_LIBRARY_GUIDE.md](./REACT_TESTING_LIBRARY_GUIDE.md)** - RTL best practices
- **[TESTING_PLAN.md](./TESTING_PLAN.md)** - Testing strategy and roadmap
- **[tests/README.md](./tests/README.md)** - Test directory guide

### Application Documentation
- **[PWA_SUMMARY.md](./PWA_SUMMARY.md)** - PWA features and capabilities
- **[WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md)** - Accessibility compliance
- **[PERFORMANCE_SEO_STRATEGY.md](./PERFORMANCE_SEO_STRATEGY.md)** - Performance optimization

### Installation Help
- **[INSTALLATION_FIX.md](./INSTALLATION_FIX.md)** - Troubleshooting installation issues

## 🏗️ Project Structure

```
careconnect/
├── components/          # React components
│   ├── ui/             # UI components (Button, Input, Modal, etc.)
│   ├── navigation/     # Navigation components
│   └── layouts/        # Layout components
├── contexts/           # React contexts (Auth, Medication, Accessibility)
├── pages/              # Page components
├── tests/              # Test files
│   ├── unit/          # Unit tests
│   ├── integration/   # Integration tests
│   ├── e2e/           # End-to-end tests
│   └── helpers/       # Test utilities
├── utils/              # Utility functions
├── styles/             # Global styles
└── public/             # Static assets
```

## ✨ Key Features

### Healthcare Features
- ✅ Medication management with scheduling
- ✅ Adherence tracking and reporting
- ✅ Refill request workflows (3-step wizard)
- ✅ Appointment management
- ✅ Wellness logging
- ✅ Secure messaging

### Accessibility Features
- ✅ **Left-Hand Accessibility Mode** - Repositions UI for left-hand use
- ✅ Text-to-speech support
- ✅ Speech-to-text input
- ✅ High contrast mode
- ✅ Font size adjustment
- ✅ Reduced motion support
- ✅ WCAG 2.1 Level AA compliant

### PWA Features
- ✅ Offline-first architecture
- ✅ Service worker caching
- ✅ Background sync
- ✅ Push notifications
- ✅ Install to home screen
- ✅ Update notifications

### Testing Infrastructure
- ✅ **React Testing Library** for component testing
- ✅ **Vitest** for unit and integration tests
- ✅ **Playwright** for E2E tests
- ✅ **85% code coverage** target
- ✅ Accessibility testing built-in

## 🛠️ Development

### Code Quality

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Format code
npm run format
```

### Testing Best Practices

1. **Write accessible tests** - Use `getByRole`, `getByLabelText`
2. **Test user behavior** - Not implementation details
3. **Use userEvent** - For realistic interactions
4. **Wait for async** - Use `waitFor`, `findBy` queries
5. **Keep tests isolated** - No shared state between tests

See [REACT_TESTING_LIBRARY_GUIDE.md](./REACT_TESTING_LIBRARY_GUIDE.md) for details.

## 🐛 Troubleshooting

### Installation Issues

If you encounter errors during `npm install`:

1. See [INSTALLATION_FIX.md](./INSTALLATION_FIX.md)
2. Run clean install script: `./clean-install.sh` or `clean-install.bat`
3. Check Node version: `node --version` (requires >=18.0.0)
4. Check npm version: `npm --version` (requires >=9.0.0)

### Test Issues

If tests fail:

1. Run `npm run test:run` to see detailed errors
2. Check [TESTING_GUIDE.md](./TESTING_GUIDE.md) troubleshooting section
3. Review test examples in `/tests/` directory
4. Use `screen.debug()` in tests to see rendered output

## 📊 Test Coverage

Current coverage targets:

```
Overall: ≥85%
├── Utils: ~95%
├── Contexts: ~90%
├── Components: ~90%
└── Pages: ~85%
```

View coverage: `npm run test:coverage && open coverage/index.html`

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy

The application can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

## 📝 Contributing

1. Write tests first (TDD)
2. Ensure tests pass: `npm test`
3. Check coverage: `npm run test:coverage`
4. Run linter: `npm run lint`
5. Format code: `npm run format`
6. Submit pull request

## 📄 License

Copyright © 2026 CareConnect

## 🆘 Support

- Check documentation in project root
- Review test examples in `/tests/`
- See troubleshooting guides
- Contact development team

## 🎯 Next Steps

1. **Install dependencies**: Run `./clean-install.sh` or `npm install`
2. **Run tests**: `npm run test:coverage`
3. **Read documentation**: Start with [TESTING_SUMMARY.md](./TESTING_SUMMARY.md)
4. **Start development**: `npm run dev`
5. **Write your first test**: See [REACT_TESTING_LIBRARY_GUIDE.md](./REACT_TESTING_LIBRARY_GUIDE.md)

---

**Built with React, TypeScript, Tailwind CSS, and ❤️**

*Last Updated: March 17, 2026*
