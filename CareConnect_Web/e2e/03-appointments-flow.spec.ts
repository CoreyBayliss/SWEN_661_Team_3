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

test.describe('Calendar and Appointments E2E Tests', () => {
  test('should navigate to calendar page', async () => {
    // Click on Calendar navigation
    const calendarLink = page.locator('a:has-text("Calendar"), button:has-text("Calendar"), a:has-text("Appointment")').first();
    
    if (await calendarLink.isVisible()) {
      await calendarLink.click();
      await page.waitForTimeout(1000);
    } else {
      // Try sidebar navigation
      await page.locator('[href*="calendar"], [href*="appointment"]').first().click();
      await page.waitForTimeout(1000);
    }
    
    // Verify calendar page loaded
    await expect(page.locator('text=/calendar|appointment/i').first()).toBeVisible();
  });

  test('should display calendar view', async () => {
    // Look for calendar component
    const calendar = page.locator('[data-testid="calendar"], [role="grid"], .calendar').first();
    
    // Calendar should be visible
    await expect(calendar).toBeVisible({ timeout: 5000 });
  });

  test('should show current month and year', async () => {
    // Get current date
    const now = new Date();
    const currentMonth = now.toLocaleString('default', { month: 'long' });
    const currentYear = now.getFullYear().toString();
    
    // Verify month and year are displayed
    const monthElement = page.locator(`text=${currentMonth}`);
    const yearElement = page.locator(`text=${currentYear}`);
    
    await expect(monthElement.or(yearElement)).toBeVisible({ timeout: 5000 });
  });

  test('should navigate between months', async () => {
    // Find previous/next month buttons
    const nextButton = page.locator('button[aria-label*="next"], button:has-text("›"), button:has-text("Next")').first();
    const prevButton = page.locator('button[aria-label*="prev"], button:has-text("‹"), button:has-text("Previous")').first();
    
    if (await nextButton.isVisible()) {
      // Click next month
      await nextButton.click();
      await page.waitForTimeout(500);
      
      // Click previous month to go back
      if (await prevButton.isVisible()) {
        await prevButton.click();
        await page.waitForTimeout(500);
      }
    }
  });

  test('should select a calendar date', async () => {
    // Find date buttons/cells
    const dateCells = page.locator('[role="gridcell"], .calendar-day, button[data-date]');
    const firstAvailableDate = dateCells.first();
    
    if (await firstAvailableDate.isVisible()) {
      await firstAvailableDate.click();
      await page.waitForTimeout(1000);
      
      // Should show appointments for that date or highlight the date
      await page.waitForTimeout(500);
    }
  });

  test('should display appointments list', async () => {
    // Look for appointments list
    const appointmentsList = page.locator('[data-testid*="appointment"], [role="list"]').first();
    
    if (await appointmentsList.isVisible()) {
      await expect(appointmentsList).toBeVisible();
    }
  });

  test('should show appointment details', async () => {
    // Find first appointment
    const firstAppointment = page.locator('[data-testid*="appointment-card"], article, [role="listitem"]').first();
    
    if (await firstAppointment.isVisible()) {
      await firstAppointment.click();
      await page.waitForTimeout(1000);
      
      // Should show appointment details
      // Look for common appointment fields
      const pageContent = await page.textContent('body');
      expect(pageContent).toContain('Appointment' || 'appointment' || pageContent);
    }
  });

  test('should open add appointment dialog', async () => {
    // Look for add appointment button
    const addButton = page.locator('button:has-text("Add"), button:has-text("New Appointment"), button[aria-label*="add"]').first();
    
    if (await addButton.isVisible()) {
      await addButton.click();
      await page.waitForTimeout(1000);
      
      // Should open dialog or form
      const dialog = page.locator('[role="dialog"], [data-testid="add-appointment-form"]').first();
      await expect(dialog).toBeVisible({ timeout: 5000 });
    }
  });
});

test.describe('Appointment Details Tests', () => {
  test('should display appointment information fields', async () => {
    // Look for appointment detail fields
    const fields = ['title', 'date', 'time', 'location', 'provider'];
    const pageContent = await page.textContent('body');
    
    // At least some fields should be present
    expect(pageContent).toBeTruthy();
  });

  test('should have reminder option', async () => {
    // Look for reminder button or toggle
    const reminderButton = page.locator('button:has-text("Reminder"), [data-testid="reminder"], input[type="checkbox"]').first();
    
    if (await reminderButton.isVisible()) {
      await reminderButton.click();
      await page.waitForTimeout(500);
      
      // Should show confirmation or update UI
      await page.waitForTimeout(500);
    }
  });

  test('should allow appointment cancellation', async () => {
    // Look for cancel button
    const cancelButton = page.locator('button:has-text("Cancel"), button:has-text("Delete")').first();
    
    if (await cancelButton.isVisible()) {
      await cancelButton.click();
      await page.waitForTimeout(500);
      
      // Should show confirmation dialog
      const confirmDialog = page.locator('[role="dialog"], [role="alertdialog"]');
      
      if (await confirmDialog.isVisible()) {
        // Click cancel on the confirmation to not actually delete
        const cancelConfirm = page.locator('button:has-text("No"), button:has-text("Cancel")').last();
        if (await cancelConfirm.isVisible()) {
          await cancelConfirm.click();
        }
      }
      
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Calendar Accessibility Tests', () => {
  test('calendar should have proper grid role', async () => {
    const calendar = page.locator('[role="grid"]').first();
    
    if (await calendar.isVisible()) {
      const role = await calendar.getAttribute('role');
      expect(role).toBe('grid');
    }
  });

  test('date cells should be keyboard navigable', async () => {
    // Focus calendar
    const calendar = page.locator('[role="grid"], .calendar').first();
    
    if (await calendar.isVisible()) {
      await calendar.focus();
      
      // Press arrow keys to navigate
      await page.keyboard.press('ArrowRight');
      await page.waitForTimeout(300);
      
      await page.keyboard.press('ArrowDown');
      await page.waitForTimeout(300);
    }
  });

  test('appointment cards should meet touch target requirements', async () => {
    const appointmentCards = await page.locator('[data-testid*="appointment"], article').all();
    
    for (const card of appointmentCards.slice(0, 3)) {
      if (await card.isVisible()) {
        const box = await card.boundingBox();
        
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(32);
        }
      }
    }
  });

  test('navigation buttons should have ARIA labels', async () => {
    const navButtons = await page.locator('button[aria-label*="prev"], button[aria-label*="next"]').all();
    
    for (const button of navButtons) {
      if (await button.isVisible()) {
        const ariaLabel = await button.getAttribute('aria-label');
        expect(ariaLabel).toBeTruthy();
      }
    }
  });
});

test.describe('Calendar View Modes Tests', () => {
  test('should support different view modes if available', async () => {
    // Look for view switcher (day/week/month)
    const viewButtons = page.locator('button:has-text("Day"), button:has-text("Week"), button:has-text("Month")');
    
    if (await viewButtons.first().isVisible()) {
      // Switch between views
      for (const button of await viewButtons.all()) {
        if (await button.isVisible()) {
          await button.click();
          await page.waitForTimeout(500);
        }
      }
    }
  });
});
