import { test, expect, Page, ElectronApplication } from '@playwright/test';
import { launchCareConnectElectron } from './electronLauncher';

let electronApp: ElectronApplication;
let page: Page;

test.beforeAll(async () => {
  electronApp = await launchCareConnectElectron();
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');

  const usernameField = page.locator('input[type="text"]').first();
  if (await usernameField.isVisible({ timeout: 5000 }).catch(() => false)) {
    await usernameField.fill('demo@example.com');
    await page.locator('input[type="password"]').first().fill('demo123');
    await page.locator('button:has-text("Sign in"), button:has-text("Login")').first().click();
    await page.waitForTimeout(1500);
  }
});

test.afterAll(async () => {
  if (electronApp) {
    await electronApp.close();
  }
});

test.describe('Screen reader E2E checks', () => {
  test('main screen exposes named headings and actions', async () => {
    await expect(page.getByRole('heading').first()).toBeVisible();
    await expect(page.getByRole('button', { name: /settings|messages|logout|profile/i }).first()).toBeVisible();
  });

  test('settings accessibility tab exposes screen reader options', async () => {
    const settingsLink = page.locator('a:has-text("Settings"), button:has-text("Settings"), [data-testid="settings"]').first();
    if (await settingsLink.isVisible().catch(() => false)) {
      await settingsLink.click();
      await page.waitForTimeout(1000);
    }

    const accessibilityTab = page.locator('[role="tab"]:has-text("Accessibility"), button:has-text("Accessibility")').first();
    if (await accessibilityTab.isVisible().catch(() => false)) {
      await accessibilityTab.click();
      await page.waitForTimeout(800);
    }

    await expect(page.getByText(/screen reader announcements/i).first()).toBeVisible();
    await expect(page.getByText(/verbose descriptions/i).first()).toBeVisible();
  });
});
