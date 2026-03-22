import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import { AppProvider, useApp } from '../../context/AppContext';
import { Root } from '../../components/Root';
import { Calendar } from '../../components/Calendar';

function renderWithAppProvider(node: React.ReactElement) {
  return render(<AppProvider>{node}</AppProvider>);
}

function AppContextHarness() {
  const app = useApp();

  return (
    <div>
      <div data-testid="auth-state">{app.isAuthenticated ? 'yes' : 'no'}</div>
      <div data-testid="path-state">{app.currentPath}</div>
      <div data-testid="med-count">{app.medications.length}</div>
      <div data-testid="apt-count">{app.appointments.length}</div>
      <button onClick={() => app.login()}>login</button>
      <button onClick={() => app.logout()}>logout</button>
      <button onClick={() => app.setLeftHandMode(true)}>left</button>
      <button onClick={() => app.setBiometricEnabled(false)}>bio-off</button>
      <button onClick={() => app.toggleFavorite('/messages')}>fav</button>
      <button onClick={() => app.navigate('/calendar')}>nav</button>
      <button
        onClick={() =>
          app.addMedication({
            name: 'Test Med',
            dose: '5mg',
            frequency: 'Daily',
            times: ['10:00'],
            refillsRemaining: 1,
            pharmacy: 'Test Pharmacy',
          })
        }
      >
        add-med
      </button>
      <button
        onClick={() =>
          app.addAppointment({
            title: 'Test Appointment',
            date: '2026-02-01',
            time: '11:00',
            location: 'Clinic',
            provider: 'Provider',
          })
        }
      >
        add-apt
      </button>
      <button onClick={() => app.takeMedication('1', 'Tester')}>take</button>
      <button onClick={() => app.skipMedication('1', 'Tester')}>skip</button>
      <button onClick={() => app.undoLastAction('1')}>undo</button>
    </div>
  );
}

describe('Legacy app smoke coverage tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    if (!globalThis.scrollTo) {
      Object.defineProperty(globalThis, 'scrollTo', {
        value: () => {},
        writable: true,
      });
    }
  });

  it('renders Root in onboarding flow when unauthenticated', () => {
    renderWithAppProvider(<Root />);
    expect(screen.getByRole('heading', { name: /welcome to careconnect/i })).toBeInTheDocument();
  });

  it('renders Root in authenticated mode and navigates to calendar', () => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('leftHandMode', 'false');

    renderWithAppProvider(<Root />);

    expect(screen.getByRole('heading', { name: /medications/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /calendar/i }));
    expect(screen.getByRole('heading', { name: /calendar & appointments/i })).toBeInTheDocument();
  });

  it('executes AppContext state operations', () => {
    renderWithAppProvider(<AppContextHarness />);

    fireEvent.click(screen.getByRole('button', { name: 'login' }));
    fireEvent.click(screen.getByRole('button', { name: 'left' }));
    fireEvent.click(screen.getByRole('button', { name: 'bio-off' }));
    fireEvent.click(screen.getByRole('button', { name: 'fav' }));
    fireEvent.click(screen.getByRole('button', { name: 'nav' }));
    fireEvent.click(screen.getByRole('button', { name: 'add-med' }));
    fireEvent.click(screen.getByRole('button', { name: 'add-apt' }));
    fireEvent.click(screen.getByRole('button', { name: 'take' }));
    fireEvent.click(screen.getByRole('button', { name: 'skip' }));
    fireEvent.click(screen.getByRole('button', { name: 'undo' }));
    fireEvent.click(screen.getByRole('button', { name: 'logout' }));

    expect(screen.getByTestId('auth-state')).toHaveTextContent('no');
    expect(screen.getByTestId('path-state')).toHaveTextContent('/medications');
    expect(Number(screen.getByTestId('med-count').textContent)).toBeGreaterThan(2);
    expect(Number(screen.getByTestId('apt-count').textContent)).toBeGreaterThan(2);
  });

  it('renders Calendar and exercises calendar interactions', () => {
    renderWithAppProvider(<Calendar />);

    expect(screen.getByRole('heading', { name: /calendar & appointments/i })).toBeInTheDocument();

    const monthNavButtons = screen.getAllByRole('button', { name: '' });
    expect(monthNavButtons.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(monthNavButtons[0]);
    fireEvent.click(monthNavButtons[1]);
    fireEvent.click(screen.getByRole('button', { name: '1' }));

    expect(screen.getByRole('heading', { name: /calendar & appointments/i })).toBeInTheDocument();
  });
});
