# CareConnect Electron - Test Suite

## Overview

This test suite is converted from the Flutter tests and adapted for the Electron/React application. It uses Jest and React Testing Library to ensure comprehensive coverage of functionality and accessibility.

## Test Files

### 1. **login.test.tsx**
- Tests login screen rendering
- Validates form fields (username, password)
- Tests password visibility toggle
- Validates biometric login options

### 2. **models.test.ts**
- Tests Medication model structure
- Tests MedicationAction model
- Tests Appointment model
- Tests Contact model
- Validates data integrity

### 3. **accessibility.test.tsx**
- Touch target size tests (WCAG 2.1 compliance)
- Keyboard navigation tests
- ARIA label validation
- Focus indicator tests
- Color contrast placeholders

### 4. **medications.test.tsx**
- Medication management functionality
- Taking/skipping medications
- Adding new medications
- Medication list display
- Interaction with medication cards

### 5. **context.test.tsx**
- AppProvider context functionality
- Authentication state management
- Settings persistence (dark mode, left-hand mode)
- Initial data loading
- Error handling

### 6. **calendar.test.tsx**
- Calendar page rendering
- Date navigation
- Appointment display
- Calendar interactions

### 7. **integration.test.tsx**
- Complete user flows
- Navigation between pages
- Responsive behavior tests
- Error boundary testing

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- login.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="accessibility"
```

## Coverage

Generate coverage report:
```bash
npm test -- --coverage --coverageDirectory=coverage
```

View coverage in browser:
```bash
# Open coverage/lcov-report/index.html
```

## Test Structure

Each test follows this pattern:
1. **Setup**: Render component with necessary providers (Router, AppProvider)
2. **Action**: Interact with elements or trigger events
3. **Assert**: Verify expected outcomes

## Mocking

### LocalStorage
Mocked in `jest.setup.ts` for settings persistence tests.

### Electron API
Window.electron object mocked for IPC communication tests.

### React Router
Uses `MemoryRouter` or `BrowserRouter` for navigation tests.

## Writing New Tests

### Component Test Template
```typescript
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import YourComponent from '@/pages/YourComponent';

describe('YourComponent Tests', () => {
  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <AppProvider>
          <YourComponent />
        </AppProvider>
      </BrowserRouter>
    );
  };

  test('renders correctly', () => {
    renderComponent();
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

### Context Test Template
```typescript
import { useApp } from '@/context/AppContext';

const TestComponent = () => {
  const context = useApp();
  return <div data-testid="test">{context.someValue}</div>;
};

test('context provides values', () => {
  render(
    <AppProvider>
      <TestComponent />
    </AppProvider>
  );
  
  expect(screen.getByTestId('test')).toHaveTextContent('expected');
});
```

## Accessibility Testing

Tests verify:
- ✅ Minimum touch target sizes (44x44px WCAG Level AAA)
- ✅ Keyboard navigation support
- ✅ ARIA labels and roles
- ✅ Focus indicators
- ✅ Screen reader compatibility

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Test user behavior**: Focus on what users do, not implementation details
3. **Async operations**: Use `waitFor` for state updates
4. **Cleanup**: Tests auto-cleanup, but add teardowns if needed
5. **Isolation**: Each test should be independent

## CI/CD Integration

Add to your CI pipeline:
```yaml
- name: Run tests
  run: npm test -- --ci --coverage --maxWorkers=2
  
- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
```

## Troubleshooting

### Tests timing out
Increase timeout in jest.config.js:
```javascript
testTimeout: 10000
```

### Module not found errors
Check `moduleNameMapper` in jest.config.js for path aliases.

### React Testing Library queries failing
Ensure components are wrapped with providers (Router, AppProvider).

## Dependencies

- **jest**: Test framework
- **ts-jest**: TypeScript support
- **@testing-library/react**: React component testing utilities
- **@testing-library/jest-dom**: Custom matchers
- **@testing-library/user-event**: User interaction simulation
- **jest-environment-jsdom**: DOM environment for tests

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
