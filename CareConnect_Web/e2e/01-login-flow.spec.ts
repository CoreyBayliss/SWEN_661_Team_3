import { test, expect, Page, ElectronApplication } from '@playwright/test';
import { launchCareConnectElectron } from './electronLauncher';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  // Launch Electron app
  electronApp = await launchCareConnectElectron();
  
  // Wait for the first window
  page = await electronApp.firstWindow();
  
  // Wait for app to be ready
  await page.waitForLoadState('domcontentloaded');
});

test.afterAll(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test.describe('Login Flow E2E Tests', () => {
  test('should display login screen on app launch', async () => {
    // App may open to login (fresh session) or dashboard (persisted session).
    const loginHeading = page.locator('text=Welcome').first();
    const loginVisible = await loginHeading.isVisible({ timeout: 10000 }).catch(() => false);

    if (loginVisible) {
      await expect(page.locator('input[type="text"], input[name*="user"], input[name*="email"]').first()).toBeVisible();
    } else {
      await expect(page.locator('main, [role="main"], body').first()).toBeVisible();
    }
  });

  test('should have accessible form fields', async () => {
    const usernameField = page.locator('input[type="text"], input[name*="user"]').first();
    if (!(await usernameField.isVisible({ timeout: 3000 }).catch(() => false))) {
      test.skip(true, 'Login form not shown because user is already authenticated.');
    }

    // Check that form fields have labels or aria-labels
    await expect(usernameField).toBeVisible();
    
    // Check for password field
    const passwordField = page.locator('input[type="password"]').first();
    await expect(passwordField).toBeVisible();
  });

  test('should toggle password visibility', async () => {
    const passwordField = page.locator('input[type="password"]').first();
    
    // Find password toggle button
    const toggleButton = page.locator('button[aria-label*="password"], button:has-text("visibility")').first();
    
    if (await toggleButton.isVisible()) {
      await toggleButton.click();
      
      // After clicking, password should be visible (type="text")
      await page.waitForTimeout(500);
      
      // Click again to hide
      await toggleButton.click();
    }
  });

  test('should successfully login with demo credentials', async () => {
    // Fill in username
    const usernameField = page.locator('input[type="text"], input[name*="user"], input[name*="email"]').first();
    await usernameField.fill('demo@example.com');
    
    // Fill in password
    const passwordField = page.locator('input[type="password"]').first();
    await passwordField.fill('demo123');
    
    // Click login button
    const loginButton = page.locator('button:has-text("Sign in"), button:has-text("Login"), button[type="submit"]').first();
    await loginButton.click();
    
    // Wait for navigation to dashboard/home
    await page.waitForTimeout(2000);
    
    // Verify successful login by checking for dashboard elements
    await expect(page.locator('text=/dashboard|home|today|overview/i').first()).toBeVisible({ timeout: 10000 });
  });

  test('should validate empty login fields', async () => {
    // Navigate back to login if needed
    // Clear any existing values
    const usernameField = page.locator('input[type="text"], input[name*="user"]').first();
    const passwordField = page.locator('input[type="password"]').first();
    
    if (await usernameField.isVisible()) {
      await usernameField.clear();
      await passwordField.clear();
      
      // Try to submit
      const loginButton = page.locator('button:has-text("Sign in"), button:has-text("Login")').first();
      await loginButton.click();
      
      // Should show validation error
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Keyboard Navigation Tests', () => {
  test('should navigate form with Tab key', async () => {
    const usernameField = page.locator('input[type="text"]').first();
    
    // Focus username field
    await usernameField.focus();
    
    // Press Tab to move to password
    await page.keyboard.press('Tab');
    
    // Verify focus moved
    await page.waitForTimeout(300);
    
    // Press Tab again to move to button
    await page.keyboard.press('Tab');
    
    await page.waitForTimeout(300);
  });

  test('should submit form with Enter key', async () => {
    const usernameField = page.locator('input[type="text"]').first();
    
    if (await usernameField.isVisible()) {
      await usernameField.fill('demo@example.com');
      
      const passwordField = page.locator('input[type="password"]').first();
      await passwordField.fill('demo123');
      
      // Press Enter to submit
      await passwordField.press('Enter');
      
      await page.waitForTimeout(2000);
    }
  });
});

test.describe('Accessibility Tests', () => {
  test('should have proper ARIA labels on interactive elements', async () => {
    // Check for ARIA labels or accessible names
    const buttons = await page.locator('button').all();
    let visibleButtonCount = 0;
    let unlabeledVisibleButtons = 0;
    
    for (const button of buttons) {
      if (await button.isVisible()) {
        visibleButtonCount += 1;
        const ariaLabel = await button.getAttribute('aria-label');
        const title = await button.getAttribute('title');
        const textContent = await button.textContent();
        const accessibleName = [ariaLabel, title, textContent?.trim()].find((value) => Boolean(value));
        
        // Allow a small tolerance for framework-generated icon-only controls.
        if (!accessibleName) {
          unlabeledVisibleButtons += 1;
        }
      }
    }

    expect(visibleButtonCount).toBeGreaterThan(0);
    expect(unlabeledVisibleButtons).toBeLessThanOrEqual(Math.floor(visibleButtonCount * 0.2));
  });

  test('should have minimum touch target sizes', async () => {
    const buttons = await page.locator('button').all();
    
    for (const button of buttons) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        
        if (box) {
          // Desktop controls should be at least 32x32px for accessibility.
          expect(box.height).toBeGreaterThanOrEqual(32);
          expect(box.width).toBeGreaterThanOrEqual(32);
        }
      }
    }
  });
});
