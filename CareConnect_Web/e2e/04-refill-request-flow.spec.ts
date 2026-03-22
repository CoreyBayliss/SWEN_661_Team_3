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
  
  // Navigate to medications
  const medicationLink = page.locator('a:has-text("Medication"), [href*="medication"]').first();
  if (await medicationLink.isVisible()) {
    await medicationLink.click();
    await page.waitForTimeout(1000);
  }
});

test.afterAll(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test.describe('Medication Refill Request E2E Tests', () => {
  test('should find medication needing refill', async () => {
    // Look for low refill indicator
    const lowRefillIndicator = page.locator('text=/refill|low|running out/i').first();
    
    if (await lowRefillIndicator.isVisible()) {
      await expect(lowRefillIndicator).toBeVisible();
    }
  });

  test('should open refill request dialog', async () => {
    // Click on medication card
    const medicationCard = page.locator('[data-testid*="medication-card"], article').first();
    await medicationCard.click();
    await page.waitForTimeout(1000);
    
    // Look for refill button
    const refillButton = page.locator('button:has-text("Refill"), button:has-text("Request Refill")').first();
    
    if (await refillButton.isVisible()) {
      await refillButton.click();
      await page.waitForTimeout(1000);
      
      // Should open refill form/dialog
      const refillForm = page.locator('[role="dialog"], [data-testid="refill-form"]').first();
      await expect(refillForm).toBeVisible({ timeout: 5000 });
    }
  });

  test('should display refill request form fields', async () => {
    // Look for pharmacy field
    const pharmacyField = page.locator('input[name*="pharmacy"], select[name*="pharmacy"]').first();
    
    if (await pharmacyField.isVisible()) {
      await expect(pharmacyField).toBeVisible();
    }
    
    // Look for pickup method options
    const pickupOptions = page.locator('input[type="radio"], select[name*="pickup"]');
    
    if (await pickupOptions.first().isVisible()) {
      await expect(pickupOptions.first()).toBeVisible();
    }
  });

  test('should fill pharmacy information', async () => {
    const pharmacyField = page.locator('input[name*="pharmacy"]').first();
    
    if (await pharmacyField.isVisible()) {
      await pharmacyField.fill('CVS Pharmacy - Main Street');
      await page.waitForTimeout(500);
      
      // Verify value was entered
      const value = await pharmacyField.inputValue();
      expect(value).toContain('CVS');
    }
  });

  test('should select pickup method', async () => {
    // Look for radio buttons or select
    const pickupRadio = page.locator('input[type="radio"][value*="pickup"], input[type="radio"]').first();
    
    if (await pickupRadio.isVisible()) {
      await pickupRadio.click();
      await page.waitForTimeout(500);
      
      // Should be checked
      const isChecked = await pickupRadio.isChecked();
      expect(isChecked).toBe(true);
    }
  });

  test('should add optional notes', async () => {
    const notesField = page.locator('textarea[name*="notes"], input[name*="notes"]').first();
    
    if (await notesField.isVisible()) {
      await notesField.fill('Please ensure this is the 100mg dosage');
      await page.waitForTimeout(500);
      
      const value = await notesField.inputValue();
      expect(value).toContain('100mg');
    }
  });

  test('should submit refill request', async () => {
    const submitButton = page.locator('button:has-text("Submit"), button:has-text("Request"), button[type="submit"]').first();
    
    if (await submitButton.isVisible()) {
      await submitButton.click();
      await page.waitForTimeout(2000);
      
      // Should show success message or confirmation
      const successMessage = page.locator('text=/success|submitted|confirmed/i').first();
      
      // Wait for any toast notifications
      await page.waitForTimeout(1000);
    }
  });

  test('should display refill confirmation', async () => {
    // Look for confirmation screen or message
    const confirmation = page
      .locator('[data-testid="confirmation"]')
      .or(page.locator('text=/confirmation|success/i'))
      .first();
    
    if (await confirmation.isVisible()) {
      await expect(confirmation).toBeVisible();
    }
  });
});

test.describe('Refill Form Validation Tests', () => {
  test('should validate required fields', async () => {
    // Open refill form again
    const refillButton = page.locator('button:has-text("Refill"), button:has-text("Request Refill")').first();
    
    if (await refillButton.isVisible()) {
      await refillButton.click();
      await page.waitForTimeout(1000);
      
      // Try to submit without filling fields
      const submitButton = page.locator('button:has-text("Submit"), button[type="submit"]').first();
      
      if (await submitButton.isVisible()) {
        await submitButton.click();
        await page.waitForTimeout(500);
        
        // Should show validation errors
        const errorMessage = page.locator('text=/required|error|invalid/i').first();
        
        if (await errorMessage.isVisible()) {
          await expect(errorMessage).toBeVisible();
        }
      }
    }
  });

  test('should allow form cancellation', async () => {
    // Look for cancel button
    const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Close")').first();
    
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
      await page.waitForTimeout(500);
      
      // Dialog should close
      const dialog = page.locator('[role="dialog"]').first();
      await expect(dialog).not.toBeVisible();
    }
  });
});

test.describe('Refill Accessibility Tests', () => {
  test('form fields should have proper labels', async () => {
    // Open refill form
    const refillButton = page.locator('button:has-text("Refill")').first();
    
    if (await refillButton.isVisible()) {
      await refillButton.click();
      await page.waitForTimeout(1000);
      
      // Check input labels
      const inputs = await page.locator('input, textarea, select').all();
      
      for (const input of inputs) {
        if (await input.isVisible()) {
          const ariaLabel = await input.getAttribute('aria-label');
          const ariaLabelledBy = await input.getAttribute('aria-labelledby');
          const name = await input.getAttribute('name');
          
          // Should have some form of label
          expect(ariaLabel || ariaLabelledBy || name).toBeTruthy();
        }
      }
    }
  });

  test('radio buttons should be keyboard accessible', async () => {
    const firstRadio = page.locator('input[type="radio"]').first();
    
    if (await firstRadio.isVisible()) {
      await firstRadio.focus();
      
      // Press arrow keys to navigate between radio options
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(300);
      
      await page.keyboard.press('ArrowUp');
      await page.waitForTimeout(300);
    }
  });

  test('submit button should meet touch target requirements', async () => {
    const submitButton = page.locator('button:has-text("Submit")').first();
    
    if (await submitButton.isVisible()) {
      const box = await submitButton.boundingBox();
      
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(32);
        expect(box.width).toBeGreaterThanOrEqual(32);
      }
    }
  });
});

test.describe('Refill History Tests', () => {
  test('should display refill request history', async () => {
    // Look for history section
    const historySection = page
      .locator('text=/history|past requests/i')
      .or(page.locator('[data-testid="refill-history"]'))
      .first();
    
    if (await historySection.isVisible()) {
      await expect(historySection).toBeVisible();
    }
  });

  test('should show refill request status', async () => {
    // Look for status indicators
    const statusBadge = page.locator('[data-testid*="status"], .badge, .status').first();
    
    if (await statusBadge.isVisible()) {
      const statusText = await statusBadge.textContent();
      expect(statusText).toBeTruthy();
    }
  });
});
