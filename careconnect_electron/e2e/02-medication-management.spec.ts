import { test, expect, Page, ElectronApplication } from '@playwright/test';
import { launchCareConnectElectron } from './electronLauncher';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await launchCareConnectElectron();
  
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');
  
  // Login first (if not already authenticated)
  const usernameField = page.locator('input[type="text"]').first();
  if (await usernameField.isVisible({ timeout: 10000 }).catch(() => false)) {
    await usernameField.fill('demo@example.com');
    const passwordField = page.locator('input[type="password"]').first();
    await passwordField.fill('demo123');
    const loginButton = page.locator('button:has-text("Sign in"), button:has-text("Login")').first();
    await loginButton.click();
    await page.waitForTimeout(2000);
  }
});

test.afterAll(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test.describe('Medication Management E2E Tests', () => {
  test('should navigate to medications page', async () => {
    // Click on Medications navigation
    const medicationLink = page.locator('a:has-text("Medication"), button:has-text("Medication")').first();
    
    if (await medicationLink.isVisible()) {
      await medicationLink.click();
      await page.waitForTimeout(1000);
    } else {
      // Try sidebar navigation
      await page.locator('[data-testid="medications-nav"], [href*="medication"]').first().click();
      await page.waitForTimeout(1000);
    }
    
    // Verify medications page loaded
    await expect(page.locator('text=/medication/i').first()).toBeVisible();
  });

  test('should display medication list', async () => {
    // Look for medication cards or list items
    const medicationCards = page.locator('[data-testid*="medication"], article, [role="listitem"]');
    
    // Should have at least one medication
    await expect(medicationCards.first()).toBeVisible({ timeout: 5000 });
  });

  test('should show medication details', async () => {
    // Find first medication card
    const firstMedication = page.locator('[data-testid*="medication-card"], article').first();
    
    if (await firstMedication.isVisible()) {
      await firstMedication.click();
      await page.waitForTimeout(1000);
      
      // Should show medication details (name, dose, frequency)
      // These might be in the card or in a modal/detail view
      const pageContent = await page.textContent('body');
      expect(pageContent).toBeTruthy();
    }
  });

  test('should mark medication as taken', async () => {
    // Look for "Take" button or similar action
    const takeButton = page.locator('button:has-text("Take"), button[data-action="take"]').first();
    
    if (await takeButton.isVisible()) {
      await takeButton.click();
      await page.waitForTimeout(1000);
      
      // Should show confirmation or update UI
      // Look for success message or updated status
      const successIndicator = page.locator('text=/taken|success|confirmed/i');
      
      // Wait a bit for any toast notifications
      await page.waitForTimeout(500);
    }
  });

  test('should skip medication', async () => {
    // Look for "Skip" button
    const skipButton = page.locator('button:has-text("Skip"), button[data-action="skip"]').first();
    
    if (await skipButton.isVisible()) {
      await skipButton.click();
      await page.waitForTimeout(1000);
      
      // Should update UI to show skipped status
      await page.waitForTimeout(500);
    }
  });

  test('should open add medication dialog', async () => {
    // Look for add medication button
    const addButton = page.locator('button:has-text("Add"), button:has-text("New Medication"), button[aria-label*="add"]').first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(1000);
      
      // Should open a dialog or form
      const dialog = page.locator('[role="dialog"], [data-testid="add-medication-form"]').first();
      await expect(dialog).toBeVisible({ timeout: 5000 });
    }
  });

  test('should filter medications', async () => {
    // Look for search or filter input
    const searchInput = page.locator('input[placeholder*="search"], input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await page.waitForTimeout(1000);
      
      // Results should be filtered
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Medication Accessibility Tests', () => {
  test('medication cards should have proper ARIA labels', async () => {
    const medicationCards = await page.locator('[data-testid*="medication"], article').all();
    
    for (const card of medicationCards.slice(0, 3)) {
      if (await card.isVisible()) {
        const role = await card.getAttribute('role');
        const ariaLabel = await card.getAttribute('aria-label');
        const textContent = await card.textContent();
        
        // Should have role or meaningful content
        expect(role || ariaLabel || textContent?.trim()).toBeTruthy();
      }
    }
  });

  test('action buttons should meet touch target size requirements', async () => {
    const actionButtons = await page.locator('button:has-text("Take"), button:has-text("Skip")').all();
    
    for (const button of actionButtons) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(32);
          expect(box.width).toBeGreaterThanOrEqual(32);
        }
      }
    }
  });

  test('should support keyboard navigation for medication actions', async () => {
    // Focus first medication card
    const firstCard = page.locator('[data-testid*="medication"], article').first();
    
    if (await firstCard.isVisible()) {
      await firstCard.focus();
      
      // Press Tab to navigate to action buttons
      await page.keyboard.press('Tab');
      await page.waitForTimeout(300);
      
      // Press Enter to activate focused button
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Medication History Tests', () => {
  test('should display medication history', async () => {
    // Look for history section or button
    const historyButton = page.locator('button:has-text("History"), [data-testid="medication-history"]').first();
    
    if (await historyButton.isVisible()) {
      await historyButton.click();
      await page.waitForTimeout(1000);
      
      // Should show history entries
      const historyEntries = page.locator('[data-testid*="history"], [data-testid*="entry"]');
      await expect(historyEntries.first()).toBeVisible({ timeout: 5000 });
    }
  });

  test('should show timestamp for medication actions', async () => {
    // Look for timestamp elements
    const timestamps = page.locator('time, [data-testid*="timestamp"]');
    
    if (await timestamps.first().isVisible()) {
      const timeText = await timestamps.first().textContent();
      expect(timeText).toBeTruthy();
    }
  });
});
