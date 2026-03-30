import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { AuthProvider } from '../../contexts/AuthContext';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';
import { MedicationProvider } from '../../contexts/MedicationContext';

import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';
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

describe('Screen reader accessibility tests', () => {
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

  it('Login page exposes labeled form controls and action names', () => {
    renderWithProviders(<LoginPage />, '/login');

    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show password|hide password/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('Dashboard page exposes named quick actions for assistive tech', () => {
    renderWithProviders(<DashboardPage />, '/dashboard');

    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add medication/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /message provider/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log wellness/i })).toBeInTheDocument();
  });

  it('Settings page exposes accessibility navigation for screen reader users', () => {
    renderWithProviders(<SettingsPage />, '/settings');

    const accessibilityTabs = screen.getAllByRole('tab', { name: /accessibility/i });
    expect(accessibilityTabs.length).toBeGreaterThan(0);

    accessibilityTabs.forEach((tab) => {
      fireEvent.click(tab);
      expect(tab).toHaveAttribute('aria-controls');
    });
  });
});
