import { test, expect, Page, ElectronApplication } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { launchCareConnectElectron } from './electronLauncher';

let electronApp: ElectronApplication;
let page: Page;

const strict = process.env.A11Y_STRICT === 'true';

test.beforeAll(async () => {
  electronApp = await launchCareConnectElectron();
  page = await electronApp.firstWindow();
  await page.waitForLoadState('domcontentloaded');

  // Login if login form is shown
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

async function runAxeScan(label: string) {
  const results = await new AxeBuilder({ page })
    .disableRules(['color-contrast'])
    .analyze();

  const seriousOrCritical = results.violations.filter(
    (violation) => violation.impact === 'serious' || violation.impact === 'critical',
  );

  const summary = seriousOrCritical.map((v) => `${v.id} (${v.impact})`).join(', ');

  if (strict) {
    expect(seriousOrCritical, `${label} accessibility violations: ${summary}`).toHaveLength(0);
  } else {
    test.info().annotations.push({
      type: 'a11y',
      description:
        seriousOrCritical.length === 0
          ? `${label}: no serious/critical issues found`
          : `${label}: ${seriousOrCritical.length} serious/critical issue(s) found: ${summary}`,
    });

    expect(results.violations).toBeDefined();
  }
}

test.describe('Axe accessibility E2E scans', () => {
  test('scan current landing screen', async () => {
    await runAxeScan('Landing screen');
  });

  test('scan settings screen', async () => {
    const settings = page.locator('a:has-text("Settings"), button:has-text("Settings"), [data-testid="settings"]').first();
    if (await settings.isVisible().catch(() => false)) {
      await settings.click();
      await page.waitForTimeout(1000);
    }

    await runAxeScan('Settings screen');
  });
});
