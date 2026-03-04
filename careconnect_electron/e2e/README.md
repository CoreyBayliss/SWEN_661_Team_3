# CareConnect Electron - E2E Testing Guide

## Overview

End-to-end tests for the CareConnect Electron desktop application using Playwright. These tests cover critical user flows and accessibility compliance.

## Prerequisites

### System Requirements
- Windows 10/11, macOS, or Linux
- Node.js 18+ and npm
- Built Electron application (`npm run build`)

### Installation

```bash
# Install dependencies (including Playwright)
npm install

# Install Playwright browsers (if needed)
npx playwright install
```

## Test Structure

### Test Files

1. **01-login-flow.spec.ts**
   - User authentication
   - Form validation
   - Password visibility toggle
   - Keyboard navigation
   - Accessibility compliance

2. **02-medication-management.spec.ts**
   - Viewing medication list
   - Taking/skipping medications
   - Adding new medications
   - Medication history
   - Search and filtering

3. **03-appointments-flow.spec.ts**
   - Calendar navigation
   - Viewing appointments
   - Creating appointments
   - Setting reminders
   - Canceling appointments

4. **04-refill-request-flow.spec.ts**
   - Requesting medication refills
   - Form validation
   - Pharmacy selection
   - Pickup method configuration
   - Request confirmation

5. **05-settings-accessibility-flow.spec.ts**
   - Changing app preferences
   - Accessibility settings (left-hand mode, text size, high contrast)
   - Dark mode toggle
   - Notification settings
   - Settings persistence

## Running Tests

### Build Application First
```bash
# Build the Electron app
npm run build
```

### Run All Tests
```bash
# Run all E2E tests
npm run test:e2e

# Or use Playwright directly
npx playwright test
```

### Run Specific Test
```bash
# Run single test file
npx playwright test e2e/01-login-flow.spec.ts

# Run tests matching pattern
npx playwright test --grep "login"
```

### Debug Mode
```bash
# Run with UI mode for debugging
npx playwright test --ui

# Run with headed browser
npx playwright test --headed

# Debug specific test
npx playwright test --debug e2e/01-login-flow.spec.ts
```

### Generate Report
```bash
# Show HTML report
npx playwright show-report
```

## Test Configuration

### playwright.config.ts

Key settings:
- **Workers**: 1 (sequential execution for Electron)
- **Retries**: 2 in CI, 0 locally
- **Timeout**: 60 seconds per test
- **Screenshots**: On failure
- **Video**: Retained on failure
- **Trace**: On first retry

## Writing Tests

### Test Template

```typescript
import { test, expect, Page, ElectronApplication, _electron as electron } from '@playwright/test';
import * as path from 'path';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await electron.launch({
    args: [path.join(__dirname, '../dist/main.js')],
  });
  
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  await electronApp.close();
});

test('your test name', async () => {
  // Your test code
});
```

### Best Practices

1. **Wait for Elements**: Use `waitForSelector` with timeouts
2. **Verify Visibility**: Always check `isVisible()` before interacting
3. **Handle Async**: Use `await` for all Playwright operations
4. **Take Screenshots**: On failures for debugging
5. **Test Isolation**: Each test should be independent
6. **Accessibility**: Verify ARIA labels, keyboard navigation, touch targets

### Common Patterns

#### Login Helper
```typescript
async function login(page: Page) {
  await page.waitForSelector('text=Welcome');
  await page.locator('input[type="text"]').first().fill('demo@example.com');
  await page.locator('input[type="password"]').first().fill('demo123');
  await page.locator('button:has-text("Sign in")').first().click();
  await page.waitForTimeout(2000);
}
```

#### Navigation Helper
```typescript
async function navigateTo(page: Page, section: string) {
  const link = page.locator(`a:has-text("${section}")`).first();
  if (await link.isVisible()) {
    await link.click();
    await page.waitForTimeout(1000);
  }
}
```

## Accessibility Testing

### Touch Target Sizes
```typescript
const box = await button.boundingBox();
expect(box.height).toBeGreaterThanOrEqual(44); // WCAG 2.1 Level AAA
```

### ARIA Labels
```typescript
const ariaLabel = await element.getAttribute('aria-label');
expect(ariaLabel).toBeTruthy();
```

### Keyboard Navigation
```typescript
await element.focus();
await page.keyboard.press('Tab');
await page.keyboard.press('Enter');
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: windows-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build app
        run: npm run build
      
      - name: Run E2E tests
        run: npm run test:e2e
      
      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### App Not Launching
- Ensure `npm run build` completed successfully
- Check that `dist/main.js` exists
- Verify Electron is installed: `npm list electron`

### Tests Timing Out
- Increase timeout in `playwright.config.ts`
- Add more `waitForTimeout` calls in tests
- Check if app is blocking (modal dialogs, etc.)

### Elements Not Found
- Use Playwright Inspector: `npx playwright test --debug`
- Check selector specificity
- Verify element is actually rendered

### Screenshots Not Saving
- Check `playwright-report` directory
- Ensure write permissions
- Run with `--screenshot=on` flag

## Test Maintenance

### Updating Selectors
When UI changes, update selectors in tests:
1. Use Playwright Inspector to find new selectors
2. Prefer `role` and `text` selectors over `id`
3. Use `data-testid` attributes for stable selectors

### Adding New Tests
1. Create new `.spec.ts` file in `e2e/` directory
2. Follow naming convention: `##-feature-name.spec.ts`
3. Include accessibility tests
4. Add to this README

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Playwright Electron](https://playwright.dev/docs/api/class-electron)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)

## Test Coverage

Current coverage:
- ✅ Authentication & Login
- ✅ Medication Management
- ✅ Calendar & Appointments
- ✅ Refill Requests
- ✅ Settings & Preferences
- ✅ Accessibility Compliance
- ✅ Keyboard Navigation

### Coverage Goals
- User Flows: 100%
- Accessibility: WCAG 2.1 Level AA
- Critical Paths: 100%
- Edge Cases: 80%
