import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from '../../contexts/AuthContext';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';
import { MedicationProvider } from '../../contexts/MedicationContext';

import { AddMedicationPage } from '../../pages/AddMedicationPage';
import { DashboardPage } from '../../pages/DashboardPage';
import { LoginPage } from '../../pages/LoginPage';
import { MedicationDetailPage } from '../../pages/MedicationDetailPage';
import { MedicationsPage } from '../../pages/MedicationsPage';
import { MessagesPage } from '../../pages/MessagesPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { OnboardingPage } from '../../pages/OnboardingPage';
import { ProfilePage } from '../../pages/ProfilePage';
import { RefillRequestPage } from '../../pages/RefillRequestPage';
import { SettingsPage } from '../../pages/SettingsPage';
import { WellnessPage } from '../../pages/WellnessPage';

function renderWithAppProviders(node: React.ReactElement, route = '/') {
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

describe('Coverage page smoke tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    sessionStorage.setItem(
      'user',
      JSON.stringify({ id: '1', email: 'test@careconnect.com', name: 'Test User' }),
    );

    if (!(globalThis as any).Notification) {
      (globalThis as any).Notification = { permission: 'default' };
    }
  });

  it('renders LoginPage', () => {
    renderWithAppProviders(<LoginPage />, '/login');
    expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
  });

  it('renders DashboardPage', () => {
    renderWithAppProviders(<DashboardPage />, '/dashboard');
    expect(screen.getByText(/good/i)).toBeInTheDocument();
  });

  it('renders MedicationsPage', () => {
    renderWithAppProviders(<MedicationsPage />, '/medications');
    expect(screen.getByRole('heading', { name: /medications/i })).toBeInTheDocument();
  });

  it('renders MedicationDetailPage with route params', () => {
    render(
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

    expect(screen.getByRole('heading', { name: /lisinopril/i })).toBeInTheDocument();
  });

  it('renders AddMedicationPage', () => {
    renderWithAppProviders(<AddMedicationPage />, '/medications/add');
    expect(screen.getByRole('heading', { name: /add medication/i })).toBeInTheDocument();
  });

  it('renders RefillRequestPage with route params', () => {
    render(
      <MemoryRouter initialEntries={['/refill/1']}>
        <AuthProvider>
          <AccessibilityProvider>
            <MedicationProvider>
              <Routes>
                <Route path="/refill/:id" element={<RefillRequestPage />} />
              </Routes>
            </MedicationProvider>
          </AccessibilityProvider>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText(/refill/i)).toBeInTheDocument();
  });

  it('renders MessagesPage', () => {
    renderWithAppProviders(<MessagesPage />, '/messages');
    expect(screen.getByRole('heading', { name: /messages/i })).toBeInTheDocument();
  });

  it('renders WellnessPage', () => {
    renderWithAppProviders(<WellnessPage />, '/wellness');
    expect(screen.getByRole('heading', { name: /wellness/i })).toBeInTheDocument();
  });

  it('renders SettingsPage', () => {
    renderWithAppProviders(<SettingsPage />, '/settings');
    expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument();
  });

  it('renders ProfilePage', () => {
    renderWithAppProviders(<ProfilePage />, '/profile');
    expect(screen.getByRole('heading', { name: /profile/i })).toBeInTheDocument();
  });

  it('renders OnboardingPage', () => {
    renderWithAppProviders(<OnboardingPage />, '/');
    expect(screen.getByRole('heading', { name: /manage your health with ease/i })).toBeInTheDocument();
  });

  it('renders NotFoundPage', () => {
    renderWithAppProviders(<NotFoundPage />, '/missing');
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
