# React Testing Library Best Practices for CareConnect

Complete guide for writing effective tests using React Testing Library (RTL) in the CareConnect healthcare application.

## Table of Contents
- [Why React Testing Library](#why-react-testing-library)
- [Core Principles](#core-principles)
- [Query Priority](#query-priority)
- [User Interactions](#user-interactions)
- [Async Testing](#async-testing)
- [Accessibility Testing](#accessibility-testing)
- [Common Patterns](#common-patterns)
- [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
- [Real Examples from CareConnect](#real-examples-from-careconnect)

---

## Why React Testing Library

React Testing Library encourages better testing practices by:

✅ **Testing behavior, not implementation**  
✅ **Focusing on accessibility**  
✅ **Writing tests that resemble how users interact**  
✅ **Avoiding testing implementation details**  
✅ **Encouraging maintainable tests**

---

## Core Principles

### 1. The Guiding Principle

> "The more your tests resemble the way your software is used, the more confidence they can give you."

### 2. Test User Behavior

```typescript
// ❌ Bad - Testing implementation
test('sets state to true when clicked', () => {
  const { result } = renderHook(() => useState(false));
  act(() => result.current[1](true));
  expect(result.current[0]).toBe(true);
});

// ✅ Good - Testing behavior
test('shows success message when form submitted', async () => {
  const user = userEvent.setup();
  render(<LoginForm />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.type(screen.getByLabelText(/password/i), 'password123');
  await user.click(screen.getByRole('button', { name: /sign in/i }));
  
  expect(await screen.findByText(/welcome back/i)).toBeInTheDocument();
});
```

### 3. Accessibility First

Always use accessible queries when possible:

```typescript
// ✅ Best - Role-based (accessible)
screen.getByRole('button', { name: /submit/i });
screen.getByRole('textbox', { name: /email/i });

// ✅ Good - Label-based
screen.getByLabelText(/email address/i);

// ⚠️ Acceptable - Text content
screen.getByText(/welcome back/i);

// ❌ Last resort - Test IDs
screen.getByTestId('submit-button');
```

---

## Query Priority

### Recommended Query Order

1. **`getByRole`** - Queries elements by ARIA role
2. **`getByLabelText`** - Queries form elements by label text
3. **`getByPlaceholderText`** - Queries by placeholder attribute
4. **`getByText`** - Queries by text content
5. **`getByDisplayValue`** - Queries form elements by current value
6. **`getByAltText`** - Queries images by alt text
7. **`getByTitle`** - Queries by title attribute
8. **`getByTestId`** - Queries by data-testid attribute (last resort)

### Query Variants

```typescript
// getBy* - Throws error if not found
const button = screen.getByRole('button');

// queryBy* - Returns null if not found (good for asserting non-existence)
const button = screen.queryByRole('button');
expect(button).not.toBeInTheDocument();

// findBy* - Returns promise, waits for element (good for async)
const button = await screen.findByRole('button');

// getAllBy* - Returns array of all matching elements
const buttons = screen.getAllByRole('button');
```

---

## User Interactions

### Using userEvent (Recommended)

```typescript
import userEvent from '@testing-library/user-event';

test('handles user interaction', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  // Click
  await user.click(screen.getByRole('button'));
  
  // Type
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  
  // Clear and type
  await user.clear(screen.getByLabelText(/search/i));
  await user.type(screen.getByLabelText(/search/i), 'new search');
  
  // Select option
  await user.selectOptions(screen.getByLabelText(/country/i), 'USA');
  
  // Upload file
  const file = new File(['content'], 'test.txt', { type: 'text/plain' });
  await user.upload(screen.getByLabelText(/upload/i), file);
  
  // Keyboard interactions
  await user.keyboard('{Enter}');
  await user.keyboard('{Escape}');
  await user.tab();
  await user.tab({ shift: true }); // Shift+Tab
  
  // Hover
  await user.hover(screen.getByRole('button'));
  
  // Paste
  await user.paste('pasted content');
});
```

### Keyboard Navigation

```typescript
test('is keyboard navigable', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  // Tab through form fields
  await user.tab();
  expect(screen.getByLabelText(/name/i)).toHaveFocus();
  
  await user.tab();
  expect(screen.getByLabelText(/email/i)).toHaveFocus();
  
  await user.tab();
  expect(screen.getByLabelText(/message/i)).toHaveFocus();
  
  // Submit with Enter key
  await user.keyboard('{Enter}');
  
  expect(await screen.findByText(/submitted/i)).toBeInTheDocument();
});
```

---

## Async Testing

### Using waitFor

```typescript
import { waitFor } from '@testing-library/react';

test('waits for async operation', async () => {
  const user = userEvent.setup();
  render(<AsyncComponent />);
  
  await user.click(screen.getByRole('button', { name: /load data/i }));
  
  // Wait for element to appear
  await waitFor(() => {
    expect(screen.getByText(/loaded successfully/i)).toBeInTheDocument();
  });
  
  // With timeout
  await waitFor(
    () => {
      expect(screen.getByText(/data/i)).toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});
```

### Using findBy Queries

```typescript
test('finds element asynchronously', async () => {
  const user = userEvent.setup();
  render(<AsyncComponent />);
  
  await user.click(screen.getByRole('button', { name: /load/i }));
  
  // findBy automatically waits (combines getBy + waitFor)
  const successMessage = await screen.findByText(/success/i);
  expect(successMessage).toBeInTheDocument();
  
  // With timeout
  const data = await screen.findByText(/data/i, {}, { timeout: 3000 });
  expect(data).toBeInTheDocument();
});
```

### Waiting for Disappearance

```typescript
test('waits for element to disappear', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  await user.click(screen.getByRole('button', { name: /delete/i }));
  
  // Wait for loading spinner to disappear
  await waitFor(() => {
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });
  
  // Or use waitForElementToBeRemoved
  const spinner = screen.getByRole('progressbar');
  await waitForElementToBeRemoved(spinner);
});
```

---

## Accessibility Testing

### ARIA Roles and Attributes

```typescript
test('has proper ARIA attributes', () => {
  render(<Modal isOpen={true} title="Confirm Action" />);
  
  const dialog = screen.getByRole('dialog');
  
  // Check ARIA attributes
  expect(dialog).toHaveAttribute('aria-modal', 'true');
  expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
  
  // Check role
  const closeButton = screen.getByRole('button', { name: /close/i });
  expect(closeButton).toBeInTheDocument();
});
```

### Screen Reader Announcements

```typescript
test('announces errors to screen readers', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Check for live region or alert
  const error = screen.getByRole('alert');
  expect(error).toHaveTextContent(/email is required/i);
  
  // Or check for aria-live
  const status = screen.getByRole('status');
  expect(status).toHaveTextContent(/saved/i);
});
```

### Form Labels and Descriptions

```typescript
test('has accessible form fields', () => {
  render(<Form />);
  
  const emailInput = screen.getByLabelText(/email address/i);
  
  // Should be required
  expect(emailInput).toBeRequired();
  
  // Should have description
  expect(emailInput).toHaveAttribute('aria-describedby');
  
  // Should have valid/invalid state
  expect(emailInput).toHaveAttribute('aria-invalid', 'false');
});
```

---

## Common Patterns

### Testing Forms

```typescript
test('submits form with valid data', async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();
  render(<ContactForm onSubmit={handleSubmit} />);
  
  // Fill out form
  await user.type(screen.getByLabelText(/name/i), 'John Doe');
  await user.type(screen.getByLabelText(/email/i), 'john@example.com');
  await user.type(screen.getByLabelText(/message/i), 'Hello world');
  
  // Submit
  await user.click(screen.getByRole('button', { name: /send/i }));
  
  // Verify submission
  expect(handleSubmit).toHaveBeenCalledWith({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello world',
  });
});
```

### Testing Lists

```typescript
test('displays list of items', () => {
  const items = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Item 3' },
  ];
  
  render(<ItemList items={items} />);
  
  // Get all list items
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3);
  
  // Verify each item
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
  expect(screen.getByText('Item 3')).toBeInTheDocument();
});
```

### Testing with within

```typescript
test('interacts with specific section', async () => {
  const user = userEvent.setup();
  render(<Dashboard />);
  
  // Get a specific section
  const medicationSection = screen.getByRole('region', { name: /medications/i });
  
  // Query within that section only
  const addButton = within(medicationSection).getByRole('button', { name: /add/i });
  await user.click(addButton);
  
  // Verify within section
  const newItem = await within(medicationSection).findByText(/new medication/i);
  expect(newItem).toBeInTheDocument();
});
```

### Testing Modals/Dialogs

```typescript
test('opens and closes modal', async () => {
  const user = userEvent.setup();
  render(<Page />);
  
  // Modal should not be visible initially
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  
  // Open modal
  await user.click(screen.getByRole('button', { name: /open/i }));
  
  // Modal should be visible
  const modal = screen.getByRole('dialog');
  expect(modal).toBeInTheDocument();
  
  // Close with button
  const closeButton = within(modal).getByRole('button', { name: /close/i });
  await user.click(closeButton);
  
  // Modal should be gone
  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
```

### Testing Error States

```typescript
test('displays error message on failed submission', async () => {
  const user = userEvent.setup();
  const mockSubmit = vi.fn().mockRejectedValue(new Error('Network error'));
  
  render(<Form onSubmit={mockSubmit} />);
  
  await user.type(screen.getByLabelText(/email/i), 'test@example.com');
  await user.click(screen.getByRole('button', { name: /submit/i }));
  
  // Wait for error message
  const error = await screen.findByRole('alert');
  expect(error).toHaveTextContent(/network error/i);
});
```

---

## Anti-Patterns to Avoid

### ❌ Don't Query by className

```typescript
// ❌ Bad
const button = container.querySelector('.submit-button');

// ✅ Good
const button = screen.getByRole('button', { name: /submit/i });
```

### ❌ Don't Test Implementation Details

```typescript
// ❌ Bad - Testing state
test('increments counter state', () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});

// ✅ Good - Testing visible output
test('displays incremented count', async () => {
  const user = userEvent.setup();
  render(<Counter />);
  
  await user.click(screen.getByRole('button', { name: /increment/i }));
  
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

### ❌ Don't Use container to Query

```typescript
// ❌ Bad
const { container } = render(<MyComponent />);
const button = container.querySelector('button');

// ✅ Good
render(<MyComponent />);
const button = screen.getByRole('button');
```

### ❌ Don't Add Unnecessary test-ids

```typescript
// ❌ Bad - Adding test-id just for testing
<button data-testid="submit-button">Submit</button>

// ✅ Good - Use semantic HTML and ARIA
<button type="submit">Submit</button>
// Then query: screen.getByRole('button', { name: /submit/i })
```

### ❌ Don't Forget to await

```typescript
// ❌ Bad - Missing await
test('submits form', () => {
  const user = userEvent.setup();
  render(<Form />);
  
  user.click(screen.getByRole('button')); // ❌ Missing await
  expect(screen.getByText(/success/i)).toBeInTheDocument(); // Will fail
});

// ✅ Good
test('submits form', async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  await user.click(screen.getByRole('button'));
  expect(await screen.findByText(/success/i)).toBeInTheDocument();
});
```

---

## Real Examples from CareConnect

### Example 1: Testing Input Component

```typescript
// From: tests/unit/components/ui/Input.test.tsx
test('should handle text input', async () => {
  const user = userEvent.setup();
  render(<Input placeholder="Type here" />);

  const input = screen.getByPlaceholderText(/type here/i);
  await user.type(input, 'Hello World');

  expect(input).toHaveValue('Hello World');
});

test('should display error state', () => {
  render(<Input error="Invalid input" />);

  const input = screen.getByRole('textbox');
  expect(input).toHaveClass('border-[var(--color-error)]');
  expect(input).toHaveAttribute('aria-invalid', 'true');
  
  const error = screen.getByRole('alert');
  expect(error).toHaveTextContent(/invalid input/i);
});
```

### Example 2: Testing Modal Component

```typescript
// From: tests/unit/components/ui/Modal.test.tsx
test('should call onClose when Escape key is pressed', async () => {
  const user = userEvent.setup();
  const onClose = vi.fn();
  render(<Modal isOpen={true} onClose={onClose} />);

  await user.keyboard('{Escape}');

  expect(onClose).toHaveBeenCalledTimes(1);
});

test('should have aria-modal="true"', () => {
  render(<Modal isOpen={true} onClose={vi.fn()} />);

  expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
});
```

### Example 3: Testing Dashboard Page

```typescript
// From: tests/integration/pages/DashboardPage.test.tsx
test('should mark medication as taken', async () => {
  const user = userEvent.setup();
  renderWithProviders(<DashboardPage />);

  await waitFor(() => {
    expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
  });

  const medicationCards = screen.getAllByRole('article');
  const firstCard = medicationCards[0];
  const takeButton = within(firstCard).getByRole('button', { 
    name: /mark as taken|take/i 
  });

  await user.click(takeButton);

  await waitFor(() => {
    expect(within(firstCard).getByText(/taken/i)).toBeInTheDocument();
  });
});
```

### Example 4: Testing Form Validation

```typescript
// From: tests/integration/forms/AddMedicationForm.test.tsx
test('should show error when medication name is empty', async () => {
  const user = userEvent.setup();
  renderWithProviders(<AddMedicationPage />);

  const saveButton = screen.getByRole('button', { name: /save|add/i });
  await user.click(saveButton);

  await waitFor(() => {
    expect(screen.getByText(/medication name is required/i)).toBeInTheDocument();
  });
});

test('should clear errors when form is corrected', async () => {
  const user = userEvent.setup();
  renderWithProviders(<AddMedicationPage />);

  const saveButton = screen.getByRole('button', { name: /save|add/i });
  await user.click(saveButton);

  await waitFor(() => {
    expect(screen.getByText(/medication name is required/i)).toBeInTheDocument();
  });

  await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');

  await waitFor(() => {
    expect(screen.queryByText(/medication name is required/i)).not.toBeInTheDocument();
  });
});
```

---

## Tips and Tricks

### Debug Your Tests

```typescript
import { screen } from '@testing-library/react';

test('debugging example', () => {
  render(<MyComponent />);
  
  // Print the DOM
  screen.debug();
  
  // Print a specific element
  screen.debug(screen.getByRole('button'));
  
  // Use logTestingPlaygroundURL
  screen.logTestingPlaygroundURL();
});
```

### Custom Queries

```typescript
// Create custom query for specific use case
const getByComplexRole = (container: HTMLElement, text: string) => {
  return screen.getByRole('button', { 
    name: new RegExp(text, 'i'),
    hidden: false 
  });
};
```

### Reusable Test Utilities

```typescript
// From: tests/helpers/render.tsx
export function renderWithProviders(ui: ReactElement) {
  return render(ui, { 
    wrapper: ({ children }) => (
      <BrowserRouter>
        <AuthProvider>
          <MedicationProvider>
            {children}
          </MedicationProvider>
        </AuthProvider>
      </BrowserRouter>
    )
  });
}
```

---

## Resources

### Official Documentation
- [React Testing Library](https://testing-library.com/react)
- [User Event](https://testing-library.com/docs/user-event/intro)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [Common Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

### CareConnect Documentation
- [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- [TESTING_PLAN.md](./TESTING_PLAN.md)
- [WCAG_COMPLIANCE.md](./WCAG_COMPLIANCE.md)

---

*Last Updated: March 17, 2026*  
*CareConnect Development Team*
