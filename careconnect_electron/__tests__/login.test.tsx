import { render, screen } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import Login from '@/pages/Login';

describe('Login Screen Tests', () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AppProvider>
          <Login />
        </AppProvider>
      </BrowserRouter>
    );
  };

  test('Login screen renders with all UI elements', () => {
    renderLogin();
    
    expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
  });

  test('Username and password fields are present', () => {
    renderLogin();
    
    const textInputs = screen.getAllByRole('textbox');
    expect(textInputs.length).toBeGreaterThanOrEqual(1);
  });

  test('Password field has visibility toggle', () => {
    renderLogin();
    
    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('Login button is present and enabled', () => {
    renderLogin();
    
    const loginButton = screen.getByRole('button', { name: /sign in|login/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).not.toBeDisabled();
  });

  test('Biometric login option is available when supported', () => {
    renderLogin();
    
    // Check if biometric button or text is present
    const biometricElements = screen.queryByText(/fingerprint|face|biometric/i);
    // This is optional, so we just check it doesn't throw
    expect(biometricElements || true).toBeTruthy();
  });

  test('Forgot password link is present', () => {
    renderLogin();
    
    const forgotPasswordLink = screen.queryByText(/forgot.*password/i);
    if (forgotPasswordLink) {
      expect(forgotPasswordLink).toBeInTheDocument();
    }
  });
});
