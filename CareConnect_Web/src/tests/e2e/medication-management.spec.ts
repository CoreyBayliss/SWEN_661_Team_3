import { test, expect } from '@playwright/test';

test.describe('Medication Management E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to app
    await page.goto('http://localhost:5173');
    
    // Complete onboarding if needed
    const onboardingButton = page.getByRole('button', { name: /get started/i });
    if (await onboardingButton.isVisible()) {
      await onboardingButton.click();
    }
    
    // Login
    await page.goto('/login');
    await page.getByLabel(/email/i).fill('test@careconnect.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should add a new medication', async ({ page }) => {
    // Navigate to add medication
    await page.getByRole('button', { name: /add medication/i }).click();
    await expect(page).toHaveURL('/medications/add');

    // Fill in medication details
    await page.getByLabel(/medication name/i).fill('Aspirin');
    await page.getByLabel(/dosage/i).fill('81mg');
    await page.getByLabel(/frequency/i).selectOption('Once daily');
    
    // Select time
    await page.getByLabel(/time/i).fill('08:00');
    
    // Add instructions
    await page.getByLabel(/instructions/i).fill('Take with food');
    
    // Select doctor
    await page.getByLabel(/prescribed by/i).fill('Dr. Smith');
    
    // Fill condition
    await page.getByLabel(/condition/i).fill('Heart Health');
    
    // Set refills
    await page.getByLabel(/refills/i).fill('3');
    
    // Save medication
    await page.getByRole('button', { name: /save medication/i }).click();
    
    // Should redirect to medications list
    await expect(page).toHaveURL('/medications');
    
    // Should see new medication in list
    await expect(page.getByText('Aspirin')).toBeVisible();
    await expect(page.getByText('81mg')).toBeVisible();
  });

  test('should view medication details', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Click on first medication
    const firstMedication = page.getByRole('article').first();
    await firstMedication.click();
    
    // Should see medication details
    await expect(page.getByRole('heading', { name: /lisinopril/i })).toBeVisible();
    await expect(page.getByText(/10mg/i)).toBeVisible();
    await expect(page.getByText(/once daily/i)).toBeVisible();
    await expect(page.getByText(/high blood pressure/i)).toBeVisible();
  });

  test('should mark medication as taken', async ({ page }) => {
    // Go to dashboard
    await page.goto('/dashboard');
    
    // Find medication due today
    const medicationCard = page.getByRole('article', { name: /lisinopril/i }).first();
    
    // Mark as taken
    await medicationCard.getByRole('button', { name: /mark as taken/i }).click();
    
    // Should show confirmation
    await expect(page.getByText(/marked as taken/i)).toBeVisible();
    
    // Button should change to "Taken" state
    await expect(medicationCard.getByText(/taken/i)).toBeVisible();
  });

  test('should edit medication', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Click on medication
    await page.getByText('Lisinopril').click();
    
    // Click edit button
    await page.getByRole('button', { name: /edit/i }).click();
    
    // Should be on edit page
    await expect(page).toHaveURL(/\/medications\/\d+\/edit/);
    
    // Change dosage
    const dosageInput = page.getByLabel(/dosage/i);
    await dosageInput.clear();
    await dosageInput.fill('20mg');
    
    // Save changes
    await page.getByRole('button', { name: /save/i }).click();
    
    // Should redirect to detail page
    await expect(page).toHaveURL(/\/medications\/\d+$/);
    
    // Should see updated dosage
    await expect(page.getByText('20mg')).toBeVisible();
  });

  test('should delete medication', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Count initial medications
    const initialCount = await page.getByRole('article').count();
    
    // Click on medication
    await page.getByText('Atorvastatin').click();
    
    // Click delete button
    await page.getByRole('button', { name: /delete/i }).click();
    
    // Confirm deletion
    await page.getByRole('button', { name: /confirm/i }).click();
    
    // Should redirect to medications list
    await expect(page).toHaveURL('/medications');
    
    // Should have one less medication
    await expect(page.getByRole('article')).toHaveCount(initialCount - 1);
    
    // Deleted medication should not be visible
    await expect(page.getByText('Atorvastatin')).not.toBeVisible();
  });

  test('should start refill request', async ({ page }) => {
    // Go to medication detail
    await page.goto('/medications');
    await page.getByText('Metformin').click();
    
    // Click refill button
    await page.getByRole('button', { name: /request refill/i }).click();
    
    // Should be on refill request page
    await expect(page).toHaveURL(/\/refill\/\d+/);
    
    // Step 1: Confirm medication details
    await expect(page.getByText(/step 1/i)).toBeVisible();
    await expect(page.getByText('Metformin')).toBeVisible();
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 2: Select pharmacy
    await expect(page.getByText(/step 2/i)).toBeVisible();
    await page.getByLabel(/pharmacy/i).selectOption('CVS Pharmacy');
    await page.getByRole('button', { name: /next/i }).click();
    
    // Step 3: Review and submit
    await expect(page.getByText(/step 3/i)).toBeVisible();
    await expect(page.getByText('Metformin')).toBeVisible();
    await expect(page.getByText('CVS Pharmacy')).toBeVisible();
    
    // Submit refill request
    await page.getByRole('button', { name: /submit/i }).click();
    
    // Should show confirmation
    await expect(page.getByText(/refill request submitted/i)).toBeVisible();
  });

  test('should filter medications', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Initially should see all medications
    const allMedications = await page.getByRole('article').count();
    expect(allMedications).toBeGreaterThan(0);
    
    // Apply filter
    await page.getByLabel(/filter/i).selectOption('Due Today');
    
    // Should see filtered results
    await expect(page.getByText(/due today/i)).toBeVisible();
    
    // Clear filter
    await page.getByLabel(/filter/i).selectOption('All');
    
    // Should see all medications again
    await expect(page.getByRole('article')).toHaveCount(allMedications);
  });

  test('should sort medications', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Sort by name
    await page.getByLabel(/sort by/i).selectOption('Name A-Z');
    
    // Get first medication name
    const firstMed = await page.getByRole('article').first().textContent();
    
    // Sort reverse
    await page.getByLabel(/sort by/i).selectOption('Name Z-A');
    
    // First medication should be different
    const newFirstMed = await page.getByRole('article').first().textContent();
    expect(newFirstMed).not.toBe(firstMed);
  });

  test('should handle offline mode', async ({ page, context }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Go offline
    await context.setOffline(true);
    
    // Should show offline indicator
    await expect(page.getByText(/offline/i)).toBeVisible();
    
    // Should still be able to view medications (cached)
    await expect(page.getByText('Lisinopril')).toBeVisible();
    
    // Try to add medication (should queue)
    await page.getByRole('button', { name: /add medication/i }).click();
    await page.getByLabel(/medication name/i).fill('Offline Test Med');
    await page.getByLabel(/dosage/i).fill('10mg');
    await page.getByRole('button', { name: /save/i }).click();
    
    // Should show queued message
    await expect(page.getByText(/will sync when online/i)).toBeVisible();
    
    // Go back online
    await context.setOffline(false);
    
    // Offline indicator should disappear
    await expect(page.getByText(/offline/i)).not.toBeVisible();
    
    // Should sync changes
    await expect(page.getByText(/synced/i)).toBeVisible();
  });

  test('should be accessible with left-hand mode', async ({ page }) => {
    // Go to settings
    await page.goto('/settings');
    
    // Enable left-hand mode
    await page.getByRole('switch', { name: /left-hand mode/i }).click();
    
    // Go to medications
    await page.goto('/medications');
    
    // Action buttons should be on left
    const addButton = page.getByRole('button', { name: /add medication/i });
    const buttonBox = await addButton.boundingBox();
    const viewportSize = page.viewportSize();
    
    if (buttonBox && viewportSize) {
      // Button should be on left half of screen
      expect(buttonBox.x).toBeLessThan(viewportSize.width / 2);
    }
    
    // Navigation should be at bottom-left
    const nav = page.getByRole('navigation');
    const navBox = await nav.boundingBox();
    
    if (navBox && viewportSize) {
      expect(navBox.y).toBeGreaterThan(viewportSize.height / 2);
      expect(navBox.x).toBeLessThan(viewportSize.width / 2);
    }
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Go to medications page
    await page.goto('/medications');
    
    // Tab through medications
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // First medication should be focused
    const firstMed = page.getByRole('article').first();
    await expect(firstMed).toBeFocused();
    
    // Press Enter to view details
    await page.keyboard.press('Enter');
    
    // Should navigate to detail page
    await expect(page).toHaveURL(/\/medications\/\d+/);
    
    // Tab to edit button and activate
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    const editButton = page.getByRole('button', { name: /edit/i });
    await expect(editButton).toBeFocused();
    
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/edit/);
  });

  test('should show medication adherence chart', async ({ page }) => {
    // Go to dashboard
    await page.goto('/dashboard');
    
    // Should see adherence chart
    await expect(page.getByText(/adherence/i)).toBeVisible();
    
    // Chart should be rendered
    const chart = page.locator('[data-testid="adherence-chart"]');
    await expect(chart).toBeVisible();
    
    // Click on medication detail to see individual chart
    await page.getByText('Lisinopril').click();
    
    // Should see medication-specific chart
    await expect(page.locator('[data-testid="medication-chart"]')).toBeVisible();
  });
});

test.describe('Medication Management - Mobile', () => {
  test.use({
    viewport: { width: 375, height: 667 }, // iPhone SE
    isMobile: true,
  });

  test('should work on mobile device', async ({ page }) => {
    // Login
    await page.goto('http://localhost:5173/login');
    await page.getByLabel(/email/i).fill('test@careconnect.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Should see mobile layout
    await page.goto('/medications');
    
    // Mobile menu should be visible
    const mobileMenu = page.getByRole('button', { name: /menu/i });
    await expect(mobileMenu).toBeVisible();
    
    // Medications should be in single column
    const medications = page.getByRole('article');
    const firstBox = await medications.first().boundingBox();
    const secondBox = await medications.nth(1).boundingBox();
    
    if (firstBox && secondBox) {
      // Second med should be below first (not side-by-side)
      expect(secondBox.y).toBeGreaterThan(firstBox.y + firstBox.height);
    }
  });

  test('should have touch-optimized buttons', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
    await page.getByLabel(/email/i).fill('test@careconnect.com');
    await page.getByLabel(/password/i).fill('password123');
    await page.getByRole('button', { name: /sign in/i }).click();
    
    await page.goto('/medications');
    
    // Touch-sized buttons (minimum 44x44px)
    const addButton = page.getByRole('button', { name: /add medication/i });
    const buttonBox = await addButton.boundingBox();
    
    if (buttonBox) {
      expect(buttonBox.height).toBeGreaterThanOrEqual(44);
      expect(buttonBox.width).toBeGreaterThanOrEqual(44);
    }
  });
});
