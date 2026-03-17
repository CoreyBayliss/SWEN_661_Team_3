# CareConnect Tests

Complete test suite for CareConnect healthcare application using React Testing Library, Vitest, and Playwright.

## 🗂️ Directory Structure

```
tests/
├── README.md (this file)
├── setup.ts                          # Global test configuration
├── helpers/
│   ├── render.tsx                    # Custom render functions with providers
│   ├── mocks.ts                      # Mock utilities (navigation, storage, etc.)
│   └── data.ts                       # Test data generators and fixtures
├── unit/
│   ├── utils/
│   │   └── storage.test.ts           # Storage utility tests
│   ├── contexts/
│   │   ├── AuthContext.test.tsx      # Authentication context tests
│   │   ├── AccessibilityContext.test.tsx
│   │   └── MedicationContext.test.tsx
│   └── components/
│       └── ui/
│           ├── Button.test.tsx       # Button component tests
│           ├── Input.test.tsx        # Input component tests (RTL)
│           └── Modal.test.tsx        # Modal component tests (RTL)
├── integration/
│   ├── pages/
│   │   ├── LoginPage.test.tsx        # Login page integration tests
│   │   ├── DashboardPage.test.tsx    # Dashboard integration tests
│   │   └── MedicationsPage.test.tsx  # Medications list tests
│   └── forms/
│       └── AddMedicationForm.test.tsx # Complex form testing
└── e2e/
    └── medication-management.spec.ts  # End-to-end Playwright tests
```

## 🚀 Quick Start

### Run All Tests
```bash
npm test
```

### Run in Watch Mode
```bash
npm run test:watch
```

### Run with Coverage
```bash
npm run test:coverage
```

### Run E2E Tests
```bash
npm run test:e2e
```

## 📖 Test Types

### Unit Tests (`/unit`)
Test individual components, functions, and contexts in isolation.

**Example:**
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

test('handles click events', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();
  
  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole('button'));
  
  expect(handleClick).toHaveBeenCalled();
});
```

### Integration Tests (`/integration`)
Test component interactions and data flow between multiple components.

**Example:**
```typescript
import { renderWithProviders } from '@tests/helpers/render';
import { DashboardPage } from '@pages/DashboardPage';

test('marks medication as taken', async () => {
  const user = userEvent.setup();
  renderWithProviders(<DashboardPage />);
  
  const takeButton = screen.getByRole('button', { name: /take/i });
  await user.click(takeButton);
  
  expect(await screen.findByText(/taken/i)).toBeInTheDocument();
});
```

### E2E Tests (`/e2e`)
Test complete user workflows across the entire application.

**Example:**
```typescript
import { test, expect } from '@playwright/test';

test('user can add medication', async ({ page }) => {
  await page.goto('/medications');
  await page.getByRole('button', { name: /add/i }).click();
  await page.getByLabel(/name/i).fill('Aspirin');
  await page.getByRole('button', { name: /save/i }).click();
  
  await expect(page.getByText('Aspirin')).toBeVisible();
});
```

## 🛠️ Test Helpers

### Custom Render Functions

Located in `helpers/render.tsx`:

```typescript
import { renderWithProviders } from '@tests/helpers/render';

// Renders with all contexts (Auth, Medication, Accessibility)
renderWithProviders(<MyComponent />);

// Render with specific provider
renderWithAuth(<LoginForm />);
renderWithMedication(<MedicationList />);
renderWithAccessibility(<Settings />);
```

### Mock Data

Located in `helpers/data.ts`:

```typescript
import { mockUser, mockMedications } from '@tests/helpers/data';

// Use pre-defined mocks
const user = mockUser;
const medications = mockMedications;

// Create custom mocks
const customMed = createMockMedication({
  name: 'Aspirin',
  dosage: '81mg',
});
```

### Mock Utilities

Located in `helpers/mocks.ts`:

```typescript
import { mockNavigate, mockLocalStorage } from '@tests/helpers/mocks';

// Mock router
vi.mock('react-router', () => ({
  useNavigate: () => mockNavigate,
}));

// Mock localStorage
Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});
```

## 🎯 React Testing Library Queries

### Priority Order (Use in this order)

1. **getByRole** - Most accessible
```typescript
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });
```

2. **getByLabelText** - For forms
```typescript
screen.getByLabelText(/email address/i);
```

3. **getByPlaceholderText**
```typescript
screen.getByPlaceholderText(/search/i);
```

4. **getByText**
```typescript
screen.getByText(/welcome back/i);
```

5. **getByTestId** - Last resort
```typescript
screen.getByTestId('custom-element');
```

### Query Variants

```typescript
// getBy* - Throws if not found
screen.getByRole('button');

// queryBy* - Returns null if not found
screen.queryByRole('button'); // Good for asserting non-existence

// findBy* - Returns promise, waits for element
await screen.findByRole('button'); // Good for async

// getAllBy* - Returns array
screen.getAllByRole('button');
```

## 🔄 User Interactions

Always use `userEvent` for realistic interactions:

```typescript
import userEvent from '@testing-library/user-event';

const user = userEvent.setup();

// Click
await user.click(button);

// Type
await user.type(input, 'text to type');

// Clear and type
await user.clear(input);
await user.type(input, 'new text');

// Select option
await user.selectOptions(select, 'option-value');

// Keyboard
await user.keyboard('{Enter}');
await user.keyboard('{Escape}');
await user.tab();

// Hover
await user.hover(element);
```

## ⏱️ Async Testing

### Using waitFor

```typescript
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});
```

### Using findBy

```typescript
// Automatically waits (combines getBy + waitFor)
const element = await screen.findByText(/async content/i);
```

### Waiting for Disappearance

```typescript
await waitFor(() => {
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});
```

## ♿ Accessibility Testing

### Check ARIA Attributes

```typescript
const dialog = screen.getByRole('dialog');
expect(dialog).toHaveAttribute('aria-modal', 'true');
expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
```

### Check Labels

```typescript
const input = screen.getByLabelText(/email/i);
expect(input).toBeRequired();
expect(input).toHaveAccessibleName();
```

### Check Announcements

```typescript
const alert = screen.getByRole('alert');
expect(alert).toHaveTextContent(/error message/i);
```

## 📝 Writing New Tests

### 1. Create Test File

```bash
# Unit test
tests/unit/components/MyComponent.test.tsx

# Integration test
tests/integration/pages/MyPage.test.tsx

# E2E test
tests/e2e/my-feature.spec.ts
```

### 2. Use This Template

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';

describe('MyComponent', () => {
  beforeEach(() => {
    // Setup before each test
    localStorage.clear();
  });

  it('should render correctly', () => {
    renderWithProviders(<MyComponent />);
    
    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    renderWithProviders(<MyComponent />);
    
    await user.click(screen.getByRole('button', { name: /action/i }));
    
    expect(await screen.findByText(/result/i)).toBeInTheDocument();
  });
});
```

### 3. Run Your Test

```bash
npm test -- MyComponent.test.tsx
```

## 🐛 Debugging Tests

### Print the DOM

```typescript
import { screen } from '@testing-library/react';

// Print entire DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));

// Get testing playground URL
screen.logTestingPlaygroundURL();
```

### Use VS Code Debugger

```json
// .vscode/launch.json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test"],
  "console": "integratedTerminal"
}
```

## ✅ Best Practices

### ✅ DO

- Use accessible queries (getByRole, getByLabelText)
- Test user behavior, not implementation
- Use userEvent for interactions
- Wait for async operations (waitFor, findBy)
- Test accessibility (ARIA, keyboard navigation)
- Use descriptive test names
- Keep tests isolated and independent

### ❌ DON'T

- Don't use querySelector or className
- Don't test implementation details (state, props)
- Don't use container to query elements
- Don't add test-ids unless necessary
- Don't forget to await user interactions
- Don't share test data between tests

## 📊 Coverage

### View Coverage Report

```bash
npm run test:coverage
open coverage/index.html
```

### Coverage Thresholds

```
Statements: ≥85%
Branches: ≥80%
Functions: ≥85%
Lines: ≥85%
```

### Coverage by Category

```
Utils: ~95%
Contexts: ~90%
Components: ~90%
Pages: ~85%
```

## 🔗 Related Documentation

- **[TESTING_GUIDE.md](../TESTING_GUIDE.md)** - Complete testing guide
- **[REACT_TESTING_LIBRARY_GUIDE.md](../REACT_TESTING_LIBRARY_GUIDE.md)** - RTL best practices
- **[TESTING_PLAN.md](../TESTING_PLAN.md)** - Testing strategy
- **[TESTING_SUMMARY.md](../TESTING_SUMMARY.md)** - Quick overview

## 🆘 Getting Help

### Common Issues

**Tests timeout:**
```typescript
test('slow test', async () => {
  // Increase timeout
  // ...
}, { timeout: 10000 });
```

**Can't find element:**
```typescript
// Use screen.debug() to see what's rendered
screen.debug();

// Use testing-playground
screen.logTestingPlaygroundURL();
```

**Async errors:**
```typescript
// Always await user interactions
await user.click(button);

// Wait for async operations
await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument();
});
```

### Resources

- [React Testing Library Docs](https://testing-library.com/react)
- [User Event API](https://testing-library.com/docs/user-event/intro)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Testing Playground](https://testing-playground.com/)

---

**Happy Testing!** 🧪✨

*Last Updated: March 17, 2026*
