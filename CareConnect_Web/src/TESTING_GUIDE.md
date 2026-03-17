# CareConnect Testing Guide

Complete guide for running and writing tests for CareConnect healthcare application.

## Table of Contents
- [Quick Start](#quick-start)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Coverage Reports](#coverage-reports)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)

---

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
# Unit and integration tests
npm test

# With coverage
npm run test:coverage

# E2E tests
npm run test:e2e
```

### Watch Mode (Development)
```bash
# Watch unit/integration tests
npm run test:watch

# Watch with coverage
npm run test:coverage:watch

# E2E UI mode
npm run test:e2e:ui
```

---

## Test Types

### Unit Tests (`/tests/unit/`)
Test individual functions, components, and utilities in isolation.

**Coverage Target**: ≥90%

**Examples**:
- Context providers (`AuthContext`, `MedicationContext`)
- Utility functions (`storage`, `serviceWorkerRegistration`)
- Custom hooks (`useKeyboardManager`)
- UI components (`Button`, `Input`, `Modal`)

### Integration Tests (`/tests/integration/`)
Test component interactions and data flow between multiple components.

**Coverage Target**: ≥85%

**Examples**:
- Page components with contexts
- Form submissions with validation
- Authentication flows
- Navigation and routing

### End-to-End Tests (`/tests/e2e/`)
Test complete user workflows across the entire application.

**Coverage Target**: Critical user paths

**Examples**:
- Onboarding → Login → Add Medication
- Daily medication management
- Refill request flow
- Offline functionality

---

## Running Tests

### Unit & Integration Tests (Vitest)

```bash
# Run all tests once
npm run test:run

# Watch mode (reruns on file changes)
npm run test:watch

# Run specific test file
npm test -- AuthContext.test.tsx

# Run tests matching pattern
npm test -- --grep "medication"

# Run with UI
npm run test:ui
```

### Coverage

```bash
# Generate coverage report
npm run test:coverage

# Watch mode with coverage
npm run test:coverage:watch

# Open HTML coverage report
open coverage/index.html
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
npm run test:e2e

# Run in UI mode (interactive)
npm run test:e2e:ui

# Run specific test file
npx playwright test medication-management.spec.ts

# Run in headed mode (see browser)
npx playwright test --headed

# Debug mode
npm run test:e2e:debug

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=webkit
npx playwright test --project="Mobile Chrome"
```

### Run All Tests

```bash
# Run unit, integration, and E2E tests
npm run test:all
```

---

## Writing Tests

### Test Structure

All tests follow the Arrange-Act-Assert pattern:

```typescript
test('should do something', async () => {
  // Arrange - Set up test data and dependencies
  const user = userEvent.setup();
  renderWithProviders(<MyComponent />);
  
  // Act - Perform the action
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Assert - Verify the result
  expect(screen.getByText(/success/i)).toBeInTheDocument();
});
```

### Unit Test Example

```typescript
// tests/unit/utils/storage.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { storage } from '@/utils/storage';

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save and retrieve data', () => {
    const data = { foo: 'bar' };
    
    storage.set('testKey', data);
    const result = storage.get('testKey', {});
    
    expect(result).toEqual(data);
  });
});
```

### Integration Test Example

```typescript
// tests/integration/pages/LoginPage.test.tsx
import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';
import { LoginPage } from '@pages/LoginPage';

describe('LoginPage', () => {
  it('should login successfully', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);

    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/password/i), 'password123');
    await user.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    });
  });
});
```

### E2E Test Example

```typescript
// tests/e2e/medication-flow.spec.ts
import { test, expect } from '@playwright/test';

test('should add medication', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel(/email/i).fill('test@careconnect.com');
  await page.getByLabel(/password/i).fill('password123');
  await page.getByRole('button', { name: /sign in/i }).click();
  
  await page.getByRole('button', { name: /add medication/i }).click();
  await page.getByLabel(/medication name/i).fill('Aspirin');
  await page.getByLabel(/dosage/i).fill('81mg');
  await page.getByRole('button', { name: /save/i }).click();
  
  await expect(page.getByText('Aspirin')).toBeVisible();
});
```

---

## Test Helpers

### Custom Render Functions

```typescript
import { renderWithProviders } from '@tests/helpers/render';

// Render with all providers (Auth, Medication, Accessibility)
renderWithProviders(<MyComponent />);

// Render with specific provider
renderWithAuth(<LoginForm />);
renderWithMedication(<MedicationList />);
renderWithAccessibility(<Settings />);
```

### Mock Data

```typescript
import { mockUser, mockMedications } from '@tests/helpers/data';

// Use in tests
const user = mockUser;
const medications = mockMedications;

// Create custom mock data
const customMedication = createMockMedication({
  name: 'Custom Med',
  dosage: '50mg',
});
```

### Mocks

```typescript
import { mockNavigate, mockLocalStorage } from '@tests/helpers/mocks';

// Mock router navigation
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Use in test
await user.click(submitButton);
expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
```

---

## Testing Best Practices

### 1. Query Priority

Use Testing Library queries in this order:

```typescript
// 1. Accessible queries (best)
screen.getByRole('button', { name: /submit/i });
screen.getByLabelText(/email/i);

// 2. Semantic queries
screen.getByText(/welcome/i);
screen.getByPlaceholderText(/search/i);

// 3. Test IDs (last resort)
screen.getByTestId('custom-element');
```

### 2. User Events

Use `@testing-library/user-event` for realistic interactions:

```typescript
const user = userEvent.setup();

// Click
await user.click(button);

// Type
await user.type(input, 'text to type');

// Keyboard
await user.keyboard('{Enter}');
await user.tab();

// Clear and type
await user.clear(input);
await user.type(input, 'new text');
```

### 3. Async Testing

```typescript
// Wait for element to appear
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});

// Find (combines getBy + waitFor)
const element = await screen.findByText(/async content/i);

// Wait for element to disappear
await waitFor(() => {
  expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
});
```

### 4. Accessibility Testing

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('should have no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### 5. Mock External Dependencies

```typescript
// Mock API calls
vi.mock('@/utils/api', () => ({
  fetchMedications: vi.fn().mockResolvedValue([...]),
}));

// Mock date/time
vi.useFakeTimers();
vi.setSystemTime(new Date('2026-03-17'));
// ... run tests
vi.useRealTimers();
```

---

## Coverage Reports

### View Coverage

```bash
# Generate and view coverage
npm run test:coverage
open coverage/index.html
```

### Coverage Thresholds

Current thresholds (enforced in CI):
- Statements: ≥85%
- Branches: ≥80%
- Functions: ≥85%
- Lines: ≥85%

### Coverage by Category

```
Target Coverage:
├── Contexts: ≥90%
├── Utils: ≥95%
├── Hooks: ≥90%
├── Components: ≥85%
├── Pages: ≥80%
└── Routes: ≥75%
```

### Exclude from Coverage

Files excluded (see `vitest.config.ts`):
- Test files
- Config files
- Type definitions
- Demo/wireframe components
- Third-party code

---

## CI/CD Integration

### GitHub Actions

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
      - run: npm run test:e2e
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

### Pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
npm run test:run
npm run lint
```

### Fail on Coverage Drop

```bash
# In CI
npm run test:coverage -- --coverage.reporter=json-summary

# Check if coverage meets threshold
# Fail build if below 85%
```

---

## Troubleshooting

### Common Issues

#### Tests Timeout
```typescript
// Increase timeout for slow tests
test('slow test', async () => {
  // ...
}, { timeout: 10000 }); // 10 seconds
```

#### localStorage Not Available
```typescript
// Mock localStorage in test
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});
```

#### Async Errors
```typescript
// Use waitFor for async operations
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
}, { timeout: 5000 });
```

#### React Router Errors
```typescript
// Mock router hooks
vi.mock('react-router', () => ({
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: '/' }),
  useParams: () => ({}),
}));
```

#### Service Worker Errors
```typescript
// Mock service worker in setup.ts
Object.defineProperty(navigator, 'serviceWorker', {
  value: {
    register: vi.fn().mockResolvedValue({}),
  },
});
```

### Debug Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/.bin/vitest run

# Use debugger in test
test('debug test', () => {
  debugger; // Will pause here
  expect(true).toBe(true);
});
```

### Playwright Debug

```bash
# Debug E2E tests
npm run test:e2e:debug

# Run with headed browser
npx playwright test --headed --debug

# Slow down execution
npx playwright test --slow-mo=1000
```

### Check Test Output

```bash
# Verbose output
npm test -- --reporter=verbose

# Only show failed tests
npm test -- --reporter=verbose --only-failures

# Bail on first failure
npm test -- --bail=1
```

---

## Test Maintenance

### Weekly Checklist
- [ ] Review failed tests
- [ ] Update test data if needed
- [ ] Check for flaky tests
- [ ] Review coverage reports

### Monthly Checklist
- [ ] Audit coverage gaps
- [ ] Update test documentation
- [ ] Refactor slow tests
- [ ] Update mocks if APIs changed

### Adding New Tests

When adding features:
1. Write unit tests for new utilities/hooks
2. Write integration tests for new pages/flows
3. Update E2E tests for critical paths
4. Verify coverage meets thresholds
5. Update this documentation

---

## Resources

### Documentation
- [Vitest](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Playwright](https://playwright.dev/)
- [User Event](https://testing-library.com/docs/user-event/intro)

### Internal Docs
- [TESTING_PLAN.md](./TESTING_PLAN.md) - Complete test strategy
- [TEST_PLAN.md](./TEST_PLAN.md) - Original test plan
- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md) - Accessibility testing

---

## Getting Help

### Common Commands Reference

```bash
# Run tests
npm test                           # Run in watch mode
npm run test:run                   # Run once
npm run test:coverage              # With coverage
npm run test:e2e                   # E2E tests

# Debug
npm run test:ui                    # Vitest UI
npm run test:e2e:ui                # Playwright UI
npm run test:e2e:debug             # Debug E2E

# Coverage
open coverage/index.html           # View HTML report

# Specific tests
npm test -- MyComponent.test.tsx   # Run one file
npm test -- --grep "login"         # Match pattern
```

### Contact

For testing questions or issues:
- Check this guide first
- Review test examples in `/tests/`
- Check CI/CD logs for failures
- Consult team leads

---

*Last Updated: March 17, 2026*
*Maintained by: CareConnect Development Team*
