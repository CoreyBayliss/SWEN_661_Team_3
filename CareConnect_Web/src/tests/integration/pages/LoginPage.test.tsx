import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';
import { LoginPage } from '@pages/LoginPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: null, pathname: '/login' }),
  };
});

describe('LoginPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockNavigate.mockClear();
  });

  describe('rendering', () => {
    it('should render login form', () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByRole('heading', { name: /welcome back/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('should render biometric login option if supported', () => {
      Object.defineProperty(window, 'PublicKeyCredential', {
        writable: true,
        value: class PublicKeyCredential {},
      });

      renderWithProviders(<LoginPage />);

      expect(screen.getByRole('button', { name: /biometric/i })).toBeInTheDocument();
    });

    it('should render "Remember me" checkbox', () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByRole('checkbox', { name: /remember me/i })).toBeInTheDocument();
    });

    it('should render "Forgot password" link', () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
    });
  });

  describe('form validation', () => {
    it('should show error when email is empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when email is invalid', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'invalid-email');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/valid email/i)).toBeInTheDocument();
      });
    });

    it('should show error when password is empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.type(emailInput, 'test@example.com');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/password is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when password is too short', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, '123');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/at least 6 characters/i)).toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('should login with valid credentials', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should show loading state during login', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      // Check for loading state
      expect(screen.getByRole('button', { name: /signing in|loading/i })).toBeDisabled();
    });

    it('should clear form errors on successful login', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      // Wait for validation errors
      await waitFor(() => {
        expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      });

      // Fill in form
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      await user.click(submitButton);

      // Errors should be gone
      await waitFor(() => {
        expect(screen.queryByText(/email is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('biometric login', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'PublicKeyCredential', {
        writable: true,
        value: class PublicKeyCredential {},
      });
    });

    it('should login with biometric authentication', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const biometricButton = screen.getByRole('button', { name: /biometric/i });
      await user.click(biometricButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should handle biometric login failure', async () => {
      // Mock biometric failure
      Object.defineProperty(window, 'PublicKeyCredential', {
        writable: true,
        value: undefined,
      });

      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      // Without PublicKeyCredential, biometric button shouldn't appear
      expect(screen.queryByRole('button', { name: /biometric/i })).not.toBeInTheDocument();
    });
  });

  describe('remember me', () => {
    it('should save credentials when "Remember me" is checked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const rememberCheckbox = screen.getByRole('checkbox', { name: /remember me/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');
      await user.click(rememberCheckbox);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('rememberMe')).toBe('true');
      });
    });

    it('should not save credentials when "Remember me" is unchecked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(localStorage.getItem('rememberMe')).toBeNull();
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper form labels', () => {
      renderWithProviders(<LoginPage />);

      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      // Tab through form
      await user.tab();
      expect(screen.getByLabelText(/email/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/password/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('checkbox', { name: /remember me/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /sign in/i })).toHaveFocus();
    });

    it('should announce errors to screen readers', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        const errorMessage = screen.getByText(/email is required/i);
        expect(errorMessage).toHaveAttribute('role', 'alert');
      });
    });
  });

  describe('navigation', () => {
    it('should redirect to dashboard when already authenticated', async () => {
      // Pre-authenticate user
      sessionStorage.setItem('user', JSON.stringify({
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      }));

      renderWithProviders(<LoginPage />);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
      });
    });

    it('should navigate to forgot password page', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const forgotPasswordLink = screen.getByText(/forgot password/i);
      await user.click(forgotPasswordLink);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/forgot-password');
      });
    });

    it('should navigate to signup page', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const signupLink = screen.getByText(/sign up/i);
      await user.click(signupLink);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/signup');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle paste into email field', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      await user.click(emailInput);
      await user.paste('pasted@example.com');

      expect(emailInput).toHaveValue('pasted@example.com');
    });

    it('should trim whitespace from email', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);

      await user.type(emailInput, '  test@example.com  ');
      await user.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /sign in/i });
      await user.click(submitButton);

      await waitFor(() => {
        const savedUser = sessionStorage.getItem('user');
        expect(JSON.parse(savedUser!).email).toBe('test@example.com');
      });
    });

    it('should handle rapid form submissions', async () => {
      const user = userEvent.setup();
      renderWithProviders(<LoginPage />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /sign in/i });

      await user.type(emailInput, 'test@example.com');
      await user.type(passwordInput, 'password123');

      // Try to submit multiple times rapidly
      await user.click(submitButton);
      await user.click(submitButton);
      await user.click(submitButton);

      // Should only navigate once
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });
});
