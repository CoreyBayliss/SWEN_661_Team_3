# CareConnect - Comprehensive Testing Plan

## Overview
This document outlines the complete testing strategy for CareConnect to achieve and maintain **85% code coverage** across all critical paths.

## Coverage Goals

### Target Coverage by Category
```
Overall Target: ≥85%
├── Contexts: ≥90% (critical business logic)
├── Components: ≥85% (UI components)
├── Pages: ≥80% (page components)
├── Utils: ≥95% (utility functions)
├── Hooks: ≥90% (custom hooks)
└── Routes: ≥75% (routing configuration)
```

### Coverage Metrics
- **Statement Coverage**: ≥85%
- **Branch Coverage**: ≥80%
- **Function Coverage**: ≥85%
- **Line Coverage**: ≥85%

---

## Test Pyramid Strategy

```
        ╱ ╲         E2E Tests (5%)
       ╱   ╲        - Critical user flows
      ╱     ╲       - 5-10 scenarios
     ╱ ╲   ╱ ╲
    ╱   ╲ ╱   ╲     Integration Tests (25%)
   ╱     ╲     ╲    - Component interactions
  ╱       ╲     ╲   - Context providers
 ╱ ╲     ╱ ╲   ╱ ╲  - API integrations
╱   ╲   ╱   ╲ ╱   ╲
╲───────────────────╲ Unit Tests (70%)
 ╲                   ╲ - Individual functions
  ╲                   ╲ - Components
   ╲___________________╲ - Hooks, utils
```

---

## Test Categories

### 1. Unit Tests (70%)

#### Contexts
- **AuthContext** (Priority: Critical)
  - [ ] Initial state loading from sessionStorage
  - [ ] Login with email/password
  - [ ] Biometric login flow
  - [ ] Logout functionality
  - [ ] Session timeout settings
  - [ ] User state persistence
  - [ ] Error handling for failed login
  - [ ] Hook usage outside provider throws error

- **MedicationContext** (Priority: Critical)
  - [ ] Initial medication data loading
  - [ ] Add new medication
  - [ ] Update existing medication
  - [ ] Delete medication
  - [ ] Mark medication as taken
  - [ ] Appointment management
  - [ ] Wellness log creation
  - [ ] Data persistence to localStorage
  - [ ] Hook usage outside provider throws error

- **AccessibilityContext** (Priority: High)
  - [ ] Left-hand mode toggle
  - [ ] Font size adjustments
  - [ ] High contrast mode
  - [ ] Reduce motion preference
  - [ ] Settings persistence
  - [ ] Default values loading
  - [ ] Hook usage outside provider throws error

- **AppContext** (Priority: Medium)
  - [ ] Initial state management
  - [ ] State updates
  - [ ] Persistence logic

#### Utilities
- **storage.ts** (Priority: Critical)
  - [ ] Get item with valid data
  - [ ] Get item with invalid JSON
  - [ ] Get item that doesn't exist (returns default)
  - [ ] Set item successfully
  - [ ] Set item with quota exceeded
  - [ ] Remove item successfully
  - [ ] Clear all CareConnect data
  - [ ] Debug function outputs correctly
  - [ ] Error handling for all operations

- **serviceWorkerRegistration.ts** (Priority: High)
  - [ ] Registration success
  - [ ] Registration failure
  - [ ] Update detection
  - [ ] Unregistration
  - [ ] Skip waiting on update
  - [ ] Browser support detection

#### Hooks
- **useKeyboardManager** (Priority: High)
  - [ ] Virtual keyboard visibility detection
  - [ ] Screen resize handling
  - [ ] Focus state management
  - [ ] Cleanup on unmount
  - [ ] Mobile vs desktop detection

#### UI Components
- **Button** (Priority: High)
  - [ ] Renders with different variants
  - [ ] Handles click events
  - [ ] Disabled state
  - [ ] Loading state
  - [ ] Accessibility attributes
  - [ ] Left-hand mode positioning

- **Input** (Priority: High)
  - [ ] Controlled value updates
  - [ ] onChange handler
  - [ ] Error state display
  - [ ] Label association
  - [ ] Required field validation
  - [ ] Accessibility attributes

- **Modal** (Priority: High)
  - [ ] Opens and closes
  - [ ] Focus trap
  - [ ] Escape key closes
  - [ ] Click outside closes
  - [ ] Accessibility (ARIA attributes)
  - [ ] Body scroll lock

- **Card** (Priority: Medium)
  - [ ] Renders children correctly
  - [ ] Different variants
  - [ ] Click handling
  - [ ] Accessibility

- **Alert** (Priority: Medium)
  - [ ] Different alert types (success, error, warning, info)
  - [ ] Dismissible alerts
  - [ ] Icon display
  - [ ] Accessibility

#### Compound Components
- **Navigation** (Priority: Critical)
  - [ ] Active route highlighting
  - [ ] Left-hand mode layout
  - [ ] Mobile responsive menu
  - [ ] Accessibility navigation
  - [ ] Route linking

- **PWAInstallPrompt** (Priority: Medium)
  - [ ] Detects installability
  - [ ] Shows/hides based on install state
  - [ ] Handles install click
  - [ ] Dismisses correctly
  - [ ] Platform-specific messaging

- **OfflineIndicator** (Priority: High)
  - [ ] Detects online/offline status
  - [ ] Shows indicator when offline
  - [ ] Hides when online
  - [ ] Accessibility announcements

- **UpdatePrompt** (Priority: Medium)
  - [ ] Detects service worker updates
  - [ ] Prompts user to update
  - [ ] Handles update acceptance
  - [ ] Handles update dismissal

### 2. Integration Tests (25%)

#### Page Components
- **LoginPage** (Priority: Critical)
  - [ ] Renders login form
  - [ ] Submits credentials
  - [ ] Shows validation errors
  - [ ] Redirects on successful login
  - [ ] Biometric login flow
  - [ ] "Remember me" functionality

- **DashboardPage** (Priority: Critical)
  - [ ] Displays today's medications
  - [ ] Shows upcoming appointments
  - [ ] Quick action buttons work
  - [ ] Medication adherence chart
  - [ ] Redirects if not authenticated

- **MedicationsPage** (Priority: High)
  - [ ] Lists all medications
  - [ ] Filters medications
  - [ ] Sorts medications
  - [ ] Navigate to medication detail
  - [ ] Add medication button
  - [ ] Empty state display

- **MedicationDetailPage** (Priority: High)
  - [ ] Loads medication data by ID
  - [ ] Displays medication information
  - [ ] Edit functionality
  - [ ] Delete confirmation
  - [ ] Refill request navigation
  - [ ] Handles invalid ID

- **AddMedicationPage** (Priority: Critical)
  - [ ] Renders empty form for new medication
  - [ ] Loads existing data for edit
  - [ ] Validates required fields
  - [ ] Saves medication successfully
  - [ ] Cancels and navigates back
  - [ ] Complex scheduling (times, frequency)

- **RefillRequestPage** (Priority: High)
  - [ ] 3-step wizard navigation
  - [ ] Form validation at each step
  - [ ] Submits refill request
  - [ ] Back/cancel buttons
  - [ ] Confirmation display

- **MessagesPage** (Priority: Medium)
  - [ ] Displays message threads
  - [ ] Send message functionality
  - [ ] Template selection
  - [ ] Speech-to-text integration (if enabled)
  - [ ] Message filtering

- **WellnessPage** (Priority: Medium)
  - [ ] Displays wellness chips
  - [ ] Logs mood/sleep/pain/energy
  - [ ] Shows historical data
  - [ ] Chart visualization
  - [ ] Tap-only interface

- **SettingsPage** (Priority: High)
  - [ ] Displays all settings sections
  - [ ] Updates accessibility preferences
  - [ ] Changes session timeout
  - [ ] Manages biometric auth
  - [ ] PWA management options
  - [ ] Saves settings to localStorage

- **ProfilePage** (Priority: Medium)
  - [ ] Displays user information
  - [ ] Edit profile functionality
  - [ ] Saves changes
  - [ ] Validation

#### Context Integration
- **Auth + Navigation** (Priority: Critical)
  - [ ] Protected routes require authentication
  - [ ] Redirects to login when not authenticated
  - [ ] Redirects to dashboard after login
  - [ ] Logout clears user and redirects

- **Medication + Dashboard** (Priority: High)
  - [ ] Dashboard shows medications from context
  - [ ] Updates reflect in real-time
  - [ ] Mark as taken updates context

- **Accessibility + UI Components** (Priority: High)
  - [ ] Left-hand mode affects all components
  - [ ] Font size changes apply globally
  - [ ] High contrast mode works
  - [ ] Reduce motion disables animations

### 3. End-to-End Tests (5%)

#### Critical User Flows
- **Onboarding to First Medication** (Priority: Critical)
  - [ ] Complete onboarding flow
  - [ ] Login/signup
  - [ ] Add first medication
  - [ ] See it on dashboard
  - [ ] Set reminder

- **Daily Medication Management** (Priority: Critical)
  - [ ] View today's medications
  - [ ] Mark medication as taken
  - [ ] Check adherence
  - [ ] View upcoming doses

- **Refill Request Flow** (Priority: High)
  - [ ] Navigate from medication
  - [ ] Complete 3-step refill
  - [ ] Receive confirmation
  - [ ] Return to medications list

- **Wellness Logging** (Priority: Medium)
  - [ ] Navigate to wellness
  - [ ] Log multiple wellness metrics
  - [ ] View wellness chart
  - [ ] Export data

- **Offline Functionality** (Priority: High)
  - [ ] Go offline
  - [ ] Use app features
  - [ ] Data persists
  - [ ] Syncs when online

---

## Test Implementation

### Testing Stack
```json
{
  "framework": "Vitest",
  "rendering": "@testing-library/react",
  "userEvents": "@testing-library/user-event",
  "hooks": "@testing-library/react-hooks",
  "e2e": "Playwright",
  "coverage": "c8 / vitest coverage",
  "mocking": "vitest/mock"
}
```

### Configuration

#### vitest.config.ts
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.ts',
        'dist/',
        'public/',
        'flutter/',
        '**/*.d.ts',
        '**/types.ts',
        '**/__tests__/**',
      ],
      statements: 85,
      branches: 80,
      functions: 85,
      lines: 85,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@components': path.resolve(__dirname, './components'),
      '@contexts': path.resolve(__dirname, './contexts'),
      '@utils': path.resolve(__dirname, './utils'),
      '@pages': path.resolve(__dirname, './pages'),
    },
  },
});
```

#### tests/setup.ts
```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock navigator.credentials for biometric tests
Object.defineProperty(window, 'PublicKeyCredential', {
  writable: true,
  value: class PublicKeyCredential {},
});

// Mock service worker
Object.defineProperty(navigator, 'serviceWorker', {
  writable: true,
  value: {
    register: vi.fn().mockResolvedValue({}),
    ready: Promise.resolve({
      unregister: vi.fn().mockResolvedValue(true),
    }),
  },
});
```

---

## Test Execution

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- AuthContext.test.tsx

# Run tests matching pattern
npm test -- --grep "medication"

# Update snapshots
npm test -- -u

# Run E2E tests
npm run test:e2e
```

### Coverage Reports

```bash
# Generate HTML coverage report
npm run test:coverage

# View coverage report
open coverage/index.html

# Check coverage thresholds
npm run test:coverage -- --coverage.reporter=json-summary
```

---

## Coverage Enforcement

### Pre-commit Hook
```bash
# .husky/pre-commit
#!/bin/sh
npm run test:coverage -- --run
```

### CI/CD Integration
```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      - name: Check coverage thresholds
        run: |
          npm run test:coverage -- --coverage.reporter=json-summary
          # Fail if coverage below 85%
```

---

## Testing Best Practices

### 1. Arrange-Act-Assert Pattern
```typescript
test('should add medication', () => {
  // Arrange
  const { result } = renderHook(() => useMedication(), {
    wrapper: MedicationProvider,
  });
  
  // Act
  act(() => {
    result.current.addMedication({
      name: 'Aspirin',
      dosage: '81mg',
      // ...
    });
  });
  
  // Assert
  expect(result.current.medications).toHaveLength(4);
});
```

### 2. Test Behavior, Not Implementation
```typescript
// ❌ Bad - tests implementation
test('sets state to true', () => {
  const { result } = renderHook(() => useLeftHandMode());
  result.current.setLeftHandMode(true);
  expect(result.current.leftHandMode).toBe(true);
});

// ✅ Good - tests behavior
test('positions buttons on left when left-hand mode enabled', () => {
  render(<Dashboard />);
  const user = userEvent.setup();
  
  await user.click(screen.getByRole('switch', { name: /left-hand mode/i }));
  
  const actionButton = screen.getByRole('button', { name: /add medication/i });
  expect(actionButton).toHaveClass('left-aligned');
});
```

### 3. Use Testing Library Queries
```typescript
// Priority order:
// 1. getByRole (accessible)
screen.getByRole('button', { name: /submit/i });

// 2. getByLabelText (forms)
screen.getByLabelText(/email/i);

// 3. getByPlaceholderText (if no label)
screen.getByPlaceholderText(/enter email/i);

// 4. getByText (content)
screen.getByText(/welcome back/i);

// 5. getByTestId (last resort)
screen.getByTestId('medication-card-1');
```

### 4. Async Testing
```typescript
test('loads medications on mount', async () => {
  render(<MedicationsPage />);
  
  // Wait for async operations
  await waitFor(() => {
    expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
  });
  
  // Or wait for element to appear
  const medication = await screen.findByText(/lisinopril/i);
  expect(medication).toBeInTheDocument();
});
```

### 5. Mock External Dependencies
```typescript
// Mock API calls
vi.mock('@/utils/api', () => ({
  fetchMedications: vi.fn().mockResolvedValue([
    { id: '1', name: 'Aspirin', dosage: '81mg' }
  ]),
}));

// Mock router
vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  useParams: () => ({ id: '1' }),
  useLocation: () => ({ pathname: '/medications' }),
}));
```

### 6. Accessibility Testing
```typescript
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<LoginPage />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## Monitoring & Reporting

### Coverage Badges
Add to README.md:
```markdown
![Coverage](https://img.shields.io/badge/coverage-87%25-brightgreen)
```

### Coverage Trends
Track coverage over time:
- Set up Codecov or Coveralls
- Monitor coverage changes in PRs
- Block merges if coverage decreases

### Test Metrics Dashboard
Track:
- Total test count
- Pass/fail rate
- Test execution time
- Flaky tests
- Coverage by category

---

## Maintenance

### Weekly
- [ ] Review failed tests
- [ ] Update test data if needed
- [ ] Check for flaky tests
- [ ] Review coverage reports

### Monthly
- [ ] Audit test coverage gaps
- [ ] Update test documentation
- [ ] Review and refactor slow tests
- [ ] Update mocks if APIs changed

### Quarterly
- [ ] Full test suite audit
- [ ] Update testing dependencies
- [ ] Review testing strategy
- [ ] Performance optimization

---

## Test File Structure

```
tests/
├── unit/
│   ├── contexts/
│   │   ├── AuthContext.test.tsx
│   │   ├── MedicationContext.test.tsx
│   │   └── AccessibilityContext.test.tsx
│   ├── utils/
│   │   ├── storage.test.ts
│   │   └── serviceWorkerRegistration.test.ts
│   ├── hooks/
│   │   └── useKeyboardManager.test.ts
│   └── components/
│       ├── ui/
│       │   ├── Button.test.tsx
│       │   ├── Input.test.tsx
│       │   ├── Modal.test.tsx
│       │   ├── Card.test.tsx
│       │   └── Alert.test.tsx
│       ├── Navigation.test.tsx
│       ├── PWAInstallPrompt.test.tsx
│       ├── OfflineIndicator.test.tsx
│       └── UpdatePrompt.test.tsx
├── integration/
│   ├── pages/
│   │   ├── LoginPage.test.tsx
│   │   ├── DashboardPage.test.tsx
│   │   ├── MedicationsPage.test.tsx
│   │   ├── MedicationDetailPage.test.tsx
│   │   ├── AddMedicationPage.test.tsx
│   │   ├── RefillRequestPage.test.tsx
│   │   ├── MessagesPage.test.tsx
│   │   ├── WellnessPage.test.tsx
│   │   ├── SettingsPage.test.tsx
│   │   └── ProfilePage.test.tsx
│   └── flows/
│       ├── authentication.test.tsx
│       ├── medication-management.test.tsx
│       └── accessibility.test.tsx
├── e2e/
│   ├── onboarding.spec.ts
│   ├── daily-medication.spec.ts
│   ├── refill-request.spec.ts
│   ├── wellness-logging.spec.ts
│   └── offline-mode.spec.ts
├── setup.ts
└── helpers/
    ├── render.tsx
    ├── mocks.ts
    └── data.ts
```

---

## Next Steps

1. **Phase 1: Foundation** (Week 1)
   - [ ] Set up testing infrastructure
   - [ ] Configure Vitest
   - [ ] Create test helpers
   - [ ] Write tests for utils

2. **Phase 2: Core Contexts** (Week 2)
   - [ ] AuthContext tests
   - [ ] MedicationContext tests
   - [ ] AccessibilityContext tests

3. **Phase 3: UI Components** (Week 3)
   - [ ] Core UI component tests
   - [ ] Compound component tests
   - [ ] Navigation tests

4. **Phase 4: Pages** (Week 4)
   - [ ] Critical page tests
   - [ ] Integration tests
   - [ ] Flow tests

5. **Phase 5: E2E** (Week 5)
   - [ ] Critical user flows
   - [ ] Offline scenarios
   - [ ] Accessibility flows

6. **Phase 6: Optimization** (Week 6)
   - [ ] Achieve 85% coverage
   - [ ] Optimize slow tests
   - [ ] Set up CI/CD
   - [ ] Documentation

---

*Last Updated: March 17, 2026*
