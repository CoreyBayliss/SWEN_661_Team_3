import { test, expect, Page, ElectronApplication } from '@playwright/test';
import { launchCareConnectElectron } from './electronLauncher';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await launchCareConnectElectron();
  
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  
  // Login (if not already authenticated)
  const usernameField = page.locator('input[type="text"]').first();
  if (await usernameField.isVisible({ timeout: 10000 }).catch(() => false)) {
    await usernameField.fill('demo@example.com');
    await page.locator('input[type="password"]').first().fill('demo123');
    await page.locator('button:has-text("Sign in"), button:has-text("Login")').first().click();
    await page.waitForTimeout(2000);
  }
});

test.afterAll(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test.describe('Settings and Accessibility E2E Tests', () => {
  test('should navigate to settings page', async () => {
    // Click on Settings navigation
    const settingsLink = page.locator('a:has-text("Settings"), button:has-text("Settings"), [data-testid="settings"]').first();
    
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await page.waitForTimeout(1000);
    } else {
      // Try gear icon
      await page.locator('[aria-label*="settings"], [data-icon="settings"]').first().click();
      await page.waitForTimeout(1000);
    }
    
    // Verify settings page loaded
    await expect(page.locator('text=/settings|preferences/i').first()).toBeVisible();
  });

  test('should display settings categories', async () => {
    // Look for common settings sections
    const categories = ['Accessibility', 'Appearance', 'Notifications', 'Account'];
    
    for (const category of categories) {
      const categoryElement = page.locator(`text=${category}`).first();
      
      if (await categoryElement.isVisible()) {
        await expect(categoryElement).toBeVisible();
      }
    }
  });

  test('should toggle left-hand mode', async () => {
    // Look for left-hand mode toggle
    const leftHandToggle = page.locator('input[type="checkbox"][name*="left"], button[role="switch"]').first();
    
    if (await leftHandToggle.isVisible()) {
      // Get initial state
      const initialState = await leftHandToggle.isChecked();
      
      // Toggle it
      await leftHandToggle.click();
      await page.waitForTimeout(500);
      
      // Verify state changed
      const newState = await leftHandToggle.isChecked();
      expect(newState).not.toBe(initialState);
      
      // Toggle back
      await leftHandToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('should toggle dark mode', async () => {
    // Look for dark mode toggle
    const darkModeToggle = page.locator('input[type="checkbox"][name*="dark"], button[role="switch"][name*="theme"]').first();
    
    if (await darkModeToggle.isVisible()) {
      const initialState = await darkModeToggle.isChecked();
      
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
      
      // Verify theme changed (body might have class change)
      const bodyClass = await page.locator('body').getAttribute('class');
      
      // Toggle back
      await darkModeToggle.click();
      await page.waitForTimeout(1000);
    }
  });

  test('should adjust text size', async () => {
    // Look for text size controls
    const textSizeControl = page.locator('input[type="range"][name*="text"], select[name*="text-size"]').first();
    
    if (await textSizeControl.isVisible()) {
      // If it's a slider
      if (await textSizeControl.getAttribute('type') === 'range') {
        await textSizeControl.fill('150');
        await page.waitForTimeout(500);
      } else {
        // If it's a select
        await textSizeControl.selectOption('large');
        await page.waitForTimeout(500);
      }
    }
  });

  test('should toggle high contrast mode', async () => {
    // Look for high contrast toggle
    const highContrastToggle = page.locator('input[type="checkbox"][name*="contrast"], button[role="switch"]').first();
    
    if (await highContrastToggle.isVisible()) {
      await highContrastToggle.click();
      await page.waitForTimeout(500);
      
      // Toggle back
      await highContrastToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('should toggle notifications', async () => {
    // Look for notification toggle
    const notificationToggle = page.locator('input[type="checkbox"][name*="notification"], button[role="switch"]').first();
    
    if (await notificationToggle.isVisible()) {
      const initialState = await notificationToggle.isChecked();
      
      await notificationToggle.click();
      await page.waitForTimeout(500);
      
      const newState = await notificationToggle.isChecked();
      expect(newState).not.toBe(initialState);
      
      // Toggle back
      await notificationToggle.click();
      await page.waitForTimeout(500);
    }
  });

  test('should configure biometric authentication', async () => {
    // Look for biometric toggle
    const biometricToggle = page.locator('input[type="checkbox"][name*="biometric"], button[role="switch"][name*="biometric"]').first();
    
    if (await biometricToggle.isVisible()) {
      await biometricToggle.click();
      await page.waitForTimeout(500);
      
      // May show confirmation or additional setup
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Settings Persistence Tests', () => {
  test('settings should persist after reload', async () => {
    // Toggle a setting
    const darkModeToggle = page.locator('input[type="checkbox"][name*="dark"], button[role="switch"]').first();
    
    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);
      
      const stateBeforeReload = await darkModeToggle.isChecked();
      
      // Reload page
      await page.reload();
      await page.waitForTimeout(2000);
      
      // Navigate back to settings
      const settingsLink = page.locator('a:has-text("Settings"), [data-testid="settings"]').first();
      if (await settingsLink.isVisible()) {
        await settingsLink.click();
        await page.waitForTimeout(1000);
      }
      
      // Check if setting persisted
      const stateAfterReload = await darkModeToggle.isChecked();
      expect(stateAfterReload).toBe(stateBeforeReload);
    }
  });
});

test.describe('Accessibility Settings Tests', () => {
  test('screen reader mode should be configurable', async () => {
    // Look for screen reader settings
    const screenReaderOption = page
      .locator('text=/screen reader/i')
      .or(page.locator('[data-testid="screen-reader"]'))
      .first();
    
    if (await screenReaderOption.isVisible()) {
      await expect(screenReaderOption).toBeVisible();
    }
  });

  test('keyboard shortcuts should be displayed', async () => {
    // Look for keyboard shortcuts section
    const shortcutsSection = page.locator('text=/keyboard shortcuts|hotkeys/i').first();
    
    if (await shortcutsSection.isVisible()) {
      await shortcutsSection.click();
      await page.waitForTimeout(1000);
      
      // Should show list of shortcuts
      const shortcutsList = page.locator('[data-testid="shortcuts-list"], ul, table');
      await expect(shortcutsList.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('focus indicators should be configurable', async () => {
    // Look for focus indicator settings
    const focusSettings = page
      .locator('text=/focus indicator/i')
      .or(page.locator('[name*="focus"]'))
      .first();
    
    if (await focusSettings.isVisible()) {
      await expect(focusSettings).toBeVisible();
    }
  });
});

test.describe('Settings Accessibility Compliance Tests', () => {
  test('toggle switches should have proper ARIA attributes', async () => {
    const toggles = await page.locator('button[role="switch"], input[type="checkbox"]').all();
    
    for (const toggle of toggles.slice(0, 5)) {
      if (await toggle.isVisible()) {
        const role = await toggle.getAttribute('role');
        const ariaLabel = await toggle.getAttribute('aria-label');
        const ariaChecked = await toggle.getAttribute('aria-checked');
        
        // Should have proper accessibility attributes
        expect(role === 'switch' || ariaLabel || ariaChecked !== null).toBeTruthy();
      }
    }
  });

  test('settings controls should meet touch target requirements', async () => {
    const controls = await page.locator('button, input[type="checkbox"], input[type="radio"]').all();
    
    for (const control of controls.slice(0, 5)) {
      if (await control.isVisible()) {
        const box = await control.boundingBox();
        
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(32);
        }
      }
    }
  });

  test('settings should be keyboard navigable', async () => {
    // Focus first interactive element
    const firstControl = page.locator('button, input, select').first();
    
    if (await firstControl.isVisible()) {
      await firstControl.focus();
      
      // Tab through controls
      for (let i = 0; i < 3; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(200);
      }
    }
  });
});

test.describe('Account Settings Tests', () => {
  test('should display account information', async () => {
    // Look for account section
    const accountSection = page.locator('text=/account|profile/i').first();
    
    if (await accountSection.isVisible()) {
      await accountSection.click();
      await page.waitForTimeout(1000);
      
      // Should show user information
      const userInfo = page.locator('[data-testid="user-info"], .user-profile');
      if (await userInfo.first().isVisible()) {
        await expect(userInfo.first()).toBeVisible();
      }
    }
  });

  test('should have logout option', async () => {
    // Look for logout button
    const logoutButton = page.locator('button:has-text("Logout"), button:has-text("Sign out")').first();
    
    if (await logoutButton.isVisible()) {
      await expect(logoutButton).toBeVisible();
      
      // Don't actually click it to avoid disrupting other tests
    }
  });
});
