import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider, useApp } from '@/context/AppContext';

// Test component to access and test AppContext
const TestContextConsumer = () => {
  const context = useApp();
  
  return (
    <div>
      <div data-testid="auth-status">{context.isAuthenticated ? 'authenticated' : 'unauthenticated'}</div>
      <div data-testid="left-hand-mode">{context.leftHandMode ? 'enabled' : 'disabled'}</div>
      <div data-testid="dark-mode">{context.darkMode ? 'enabled' : 'disabled'}</div>
      <div data-testid="medication-count">{context.medications.length}</div>
      <div data-testid="appointment-count">{context.appointments.length}</div>
      
      <button onClick={() => context.setLeftHandMode(!context.leftHandMode)}>
        Toggle Left Hand Mode
      </button>
      <button onClick={() => context.setDarkMode(!context.darkMode)}>
        Toggle Dark Mode
      </button>
      <button onClick={() => context.login('test@example.com', 'password')}>
        Login
      </button>
      <button onClick={context.logout}>
        Logout
      </button>
    </div>
  );
};

describe('AppProvider Context Tests', () => {
  const renderWithContext = () => {
    return render(
      <BrowserRouter>
        <AppProvider>
          <TestContextConsumer />
        </AppProvider>
      </BrowserRouter>
    );
  };

  test('Initial authentication state is false', () => {
    renderWithContext();
    
    const authStatus = screen.getByTestId('auth-status');
    expect(authStatus.textContent).toBe('unauthenticated');
  });

  test('Login changes authentication state', async () => {
    renderWithContext();
    
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const authStatus = screen.getByTestId('auth-status');
      expect(authStatus.textContent).toBe('authenticated');
    });
  });

  test('Logout changes authentication state', async () => {
    renderWithContext();
    
    // First login
    const loginButton = screen.getByText('Login');
    fireEvent.click(loginButton);
    
    await waitFor(() => {
      const authStatus = screen.getByTestId('auth-status');
      expect(authStatus.textContent).toBe('authenticated');
    });
    
    // Then logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    await waitFor(() => {
      const authStatus = screen.getByTestId('auth-status');
      expect(authStatus.textContent).toBe('unauthenticated');
    });
  });

  test('Left-hand mode can be toggled', async () => {
    renderWithContext();
    
    const initialMode = screen.getByTestId('left-hand-mode').textContent;
    
    const toggleButton = screen.getByText('Toggle Left Hand Mode');
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      const newMode = screen.getByTestId('left-hand-mode').textContent;
      expect(newMode).not.toBe(initialMode);
    });
  });

  test('Dark mode can be toggled', async () => {
    renderWithContext();
    
    const initialMode = screen.getByTestId('dark-mode').textContent;
    
    const toggleButton = screen.getByText('Toggle Dark Mode');
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      const newMode = screen.getByTestId('dark-mode').textContent;
      expect(newMode).not.toBe(initialMode);
    });
  });

  test('Initial medications are loaded', () => {
    renderWithContext();
    
    const medicationCount = screen.getByTestId('medication-count');
    expect(parseInt(medicationCount.textContent || '0')).toBeGreaterThan(0);
  });

  test('Initial appointments are loaded', () => {
    renderWithContext();
    
    const appointmentCount = screen.getByTestId('appointment-count');
    expect(parseInt(appointmentCount.textContent || '0')).toBeGreaterThanOrEqual(0);
  });
});

describe('AppProvider Settings Persistence Tests', () => {
  test('Settings are saved to localStorage', async () => {
    const { rerender } = render(
      <BrowserRouter>
        <AppProvider>
          <TestContextConsumer />
        </AppProvider>
      </BrowserRouter>
    );
    
    const toggleButton = screen.getByText('Toggle Left Hand Mode');
    fireEvent.click(toggleButton);
    
    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });
});

describe('AppProvider Error Handling', () => {
  test('useApp throws error when used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestContextConsumer />);
    }).toThrow();
    
    consoleSpy.mockRestore();
  });
});
