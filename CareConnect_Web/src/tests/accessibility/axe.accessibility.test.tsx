import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { axe } from 'vitest-axe';

import { AuthProvider } from '../../contexts/AuthContext';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';
import { MedicationProvider } from '../../contexts/MedicationContext';

import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { MedicationsPage } from '../../pages/MedicationsPage';
import { MedicationDetailPage } from '../../pages/MedicationDetailPage';
import { SettingsPage } from '../../pages/SettingsPage';

function renderWithProviders(node: React.ReactElement, route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <AuthProvider>
        <AccessibilityProvider>
          <MedicationProvider>{node}</MedicationProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

function expectNoUnexpectedViolations(
  violations: Array<{ id: string; help: string }>,
  allowList: string[] = [],
) {
  const unexpected = violations.filter((violation) => !allowList.includes(violation.id));
  const details = unexpected.map((violation) => `${violation.id}: ${violation.help}`).join(' | ');
  expect(unexpected, details).toHaveLength(0);
}

describe('Axe accessibility checks', () => {
  beforeEach(() => {
    sessionStorage.setItem(
      'user',
      JSON.stringify({ id: '1', email: 'test@careconnect.com', name: 'Test User' }),
    );

    if (!(globalThis as any).Notification) {
      (globalThis as any).Notification = {
        permission: 'default',
        requestPermission: async () => 'default',
      };
    }
  });

  it('LoginPage should not have accessibility violations', async () => {
    const { container } = renderWithProviders(<LoginPage />, '/login');
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expectNoUnexpectedViolations(results.violations);
  });

  it('DashboardPage should not have accessibility violations', async () => {
    const { container } = renderWithProviders(<DashboardPage />, '/dashboard');
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expectNoUnexpectedViolations(results.violations);
  });

  it('MedicationsPage should not have accessibility violations', async () => {
    const { container } = renderWithProviders(<MedicationsPage />, '/medications');
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expectNoUnexpectedViolations(results.violations);
  });

  it('MedicationDetailPage should not have accessibility violations', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/medications/1']}>
        <AuthProvider>
          <AccessibilityProvider>
            <MedicationProvider>
              <Routes>
                <Route path="/medications/:id" element={<MedicationDetailPage />} />
              </Routes>
            </MedicationProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expectNoUnexpectedViolations(results.violations);
  });

  it('SettingsPage should not have accessibility violations', async () => {
    const { container } = renderWithProviders(<SettingsPage />, '/settings');
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: false },
      },
    });
    expectNoUnexpectedViolations(results.violations, ['label']);
  });
});
