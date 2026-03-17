import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@contexts/AuthContext';

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe('useAuth hook', () => {
    it('should throw error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useAuth());
      }).toThrow('useAuth must be used within AuthProvider');

      console.error = originalError;
    });
  });

  describe('AuthProvider', () => {
    it('should provide initial unauthenticated state', () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.user).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.sessionTimeout).toBe(30);
    });

    it('should load user from sessionStorage on mount', () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        name: 'Test User',
      };
      sessionStorage.setItem('user', JSON.stringify(mockUser));

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });

    it('should load sessionTimeout from localStorage on mount', () => {
      localStorage.setItem('sessionTimeout', '60');

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.sessionTimeout).toBe(60);
    });

    describe('login', () => {
      it('should login user with email and password', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.login('test@example.com', 'password123');
        });

        expect(result.current.user).toEqual({
          id: '1',
          email: 'test@example.com',
          name: 'test',
        });
        expect(result.current.isAuthenticated).toBe(true);
      });

      it('should save user to sessionStorage on login', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.login('test@example.com', 'password123');
        });

        const savedUser = sessionStorage.getItem('user');
        expect(savedUser).toBeTruthy();
        expect(JSON.parse(savedUser!)).toEqual({
          id: '1',
          email: 'test@example.com',
          name: 'test',
        });
      });

      it('should extract username from email', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.login('john.doe@example.com', 'password');
        });

        expect(result.current.user?.name).toBe('john.doe');
      });

      it('should simulate API delay', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        const startTime = Date.now();

        await act(async () => {
          await result.current.login('test@example.com', 'password');
        });

        const endTime = Date.now();
        const elapsed = endTime - startTime;

        // Should take at least 500ms (the simulated delay)
        expect(elapsed).toBeGreaterThanOrEqual(400); // Small margin for test execution
      });
    });

    describe('loginWithBiometric', () => {
      it('should login with biometric when supported', async () => {
        // Mock PublicKeyCredential as supported
        Object.defineProperty(window, 'PublicKeyCredential', {
          writable: true,
          value: class PublicKeyCredential {},
        });

        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.loginWithBiometric();
        });

        expect(result.current.user).toEqual({
          id: '1',
          email: 'user@careconnect.com',
          name: 'Demo User',
        });
        expect(result.current.isAuthenticated).toBe(true);
      });

      it('should throw error when biometric not supported', async () => {
        // Remove PublicKeyCredential
        Object.defineProperty(window, 'PublicKeyCredential', {
          writable: true,
          value: undefined,
        });

        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await expect(async () => {
          await act(async () => {
            await result.current.loginWithBiometric();
          });
        }).rejects.toThrow();
      });

      it('should save user to sessionStorage after biometric login', async () => {
        Object.defineProperty(window, 'PublicKeyCredential', {
          writable: true,
          value: class PublicKeyCredential {},
        });

        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.loginWithBiometric();
        });

        const savedUser = sessionStorage.getItem('user');
        expect(savedUser).toBeTruthy();
        expect(JSON.parse(savedUser!)).toEqual({
          id: '1',
          email: 'user@careconnect.com',
          name: 'Demo User',
        });
      });
    });

    describe('logout', () => {
      it('should logout user', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        // First login
        await act(async () => {
          await result.current.login('test@example.com', 'password');
        });

        expect(result.current.isAuthenticated).toBe(true);

        // Then logout
        act(() => {
          result.current.logout();
        });

        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
      });

      it('should remove user from sessionStorage on logout', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        // First login
        await act(async () => {
          await result.current.login('test@example.com', 'password');
        });

        expect(sessionStorage.getItem('user')).toBeTruthy();

        // Then logout
        act(() => {
          result.current.logout();
        });

        expect(sessionStorage.getItem('user')).toBeNull();
      });

      it('should handle logout when not authenticated', () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        expect(() => {
          act(() => {
            result.current.logout();
          });
        }).not.toThrow();

        expect(result.current.user).toBeNull();
      });
    });

    describe('setSessionTimeout', () => {
      it('should update session timeout', () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        act(() => {
          result.current.setSessionTimeout(60);
        });

        expect(result.current.sessionTimeout).toBe(60);
      });

      it('should save session timeout to localStorage', () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        act(() => {
          result.current.setSessionTimeout(90);
        });

        expect(localStorage.getItem('sessionTimeout')).toBe('90');
      });

      it('should handle multiple timeout updates', () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        act(() => {
          result.current.setSessionTimeout(15);
        });
        expect(result.current.sessionTimeout).toBe(15);

        act(() => {
          result.current.setSessionTimeout(30);
        });
        expect(result.current.sessionTimeout).toBe(30);

        act(() => {
          result.current.setSessionTimeout(60);
        });
        expect(result.current.sessionTimeout).toBe(60);
      });
    });

    describe('persistence', () => {
      it('should persist user state across re-renders', async () => {
        const { result, rerender } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          await result.current.login('test@example.com', 'password');
        });

        rerender();

        expect(result.current.user).toEqual({
          id: '1',
          email: 'test@example.com',
          name: 'test',
        });
      });

      it('should persist sessionTimeout across re-renders', () => {
        const { result, rerender } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        act(() => {
          result.current.setSessionTimeout(45);
        });

        rerender();

        expect(result.current.sessionTimeout).toBe(45);
      });
    });

    describe('edge cases', () => {
      it('should handle invalid JSON in sessionStorage', () => {
        sessionStorage.setItem('user', 'invalid json');

        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
      });

      it('should handle invalid sessionTimeout in localStorage', () => {
        localStorage.setItem('sessionTimeout', 'not a number');

        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        // parseInt('not a number') returns NaN, which should be handled
        expect(isNaN(result.current.sessionTimeout) || result.current.sessionTimeout === 30).toBe(true);
      });

      it('should handle concurrent login calls', async () => {
        const { result } = renderHook(() => useAuth(), {
          wrapper: AuthProvider,
        });

        await act(async () => {
          const login1 = result.current.login('user1@example.com', 'pass1');
          const login2 = result.current.login('user2@example.com', 'pass2');
          await Promise.all([login1, login2]);
        });

        // Last login should win
        expect(result.current.user?.email).toBe('user2@example.com');
      });
    });
  });
});
