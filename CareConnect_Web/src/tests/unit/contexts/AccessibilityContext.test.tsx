import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AccessibilityProvider, useAccessibility } from '@contexts/AccessibilityContext';

describe('AccessibilityContext', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    document.documentElement.removeAttribute('data-font-size');
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('useAccessibility hook', () => {
    it('should throw error when used outside AccessibilityProvider', () => {
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useAccessibility());
      }).toThrow('useAccessibility must be used within AccessibilityProvider');

      console.error = originalError;
    });
  });

  describe('AccessibilityProvider', () => {
    it('should provide initial default state', () => {
      const { result } = renderHook(() => useAccessibility(), {
        wrapper: AccessibilityProvider,
      });

      expect(result.current.leftHandMode).toBe(false);
      expect(result.current.fontSize).toBe('normal');
      expect(result.current.highContrast).toBe(false);
      expect(result.current.reducedMotion).toBe(false);
      expect(result.current.screenReaderEnabled).toBe(false);
    });

    it('should load leftHandMode from localStorage on mount', () => {
      localStorage.setItem('leftHandMode', 'true');

      const { result } = renderHook(() => useAccessibility(), {
        wrapper: AccessibilityProvider,
      });

      expect(result.current.leftHandMode).toBe(true);
    });

    it('should load fontSize from localStorage on mount', () => {
      localStorage.setItem('fontSize', 'large');

      const { result } = renderHook(() => useAccessibility(), {
        wrapper: AccessibilityProvider,
      });

      expect(result.current.fontSize).toBe('large');
    });

    it('should load highContrast from localStorage on mount', () => {
      localStorage.setItem('highContrast', 'true');

      const { result } = renderHook(() => useAccessibility(), {
        wrapper: AccessibilityProvider,
      });

      expect(result.current.highContrast).toBe(true);
    });

    describe('leftHandMode', () => {
      it('should toggle left hand mode', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setLeftHandMode(true);
        });

        expect(result.current.leftHandMode).toBe(true);
      });

      it('should save leftHandMode to localStorage', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setLeftHandMode(true);
        });

        expect(localStorage.getItem('leftHandMode')).toBe('true');
      });

      it('should add left-hand-mode class to documentElement', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setLeftHandMode(true);
        });

        expect(document.documentElement.classList.contains('left-hand-mode')).toBe(true);
      });

      it('should remove left-hand-mode class when disabled', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setLeftHandMode(true);
        });
        expect(document.documentElement.classList.contains('left-hand-mode')).toBe(true);

        act(() => {
          result.current.setLeftHandMode(false);
        });
        expect(document.documentElement.classList.contains('left-hand-mode')).toBe(false);
      });
    });

    describe('fontSize', () => {
      it('should change font size', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setFontSize('large');
        });

        expect(result.current.fontSize).toBe('large');
      });

      it('should save fontSize to localStorage', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setFontSize('extra-large');
        });

        expect(localStorage.getItem('fontSize')).toBe('extra-large');
      });

      it('should set data-font-size attribute on documentElement', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setFontSize('large');
        });

        expect(document.documentElement.getAttribute('data-font-size')).toBe('large');
      });

      it('should handle all font size options', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setFontSize('normal');
        });
        expect(result.current.fontSize).toBe('normal');

        act(() => {
          result.current.setFontSize('large');
        });
        expect(result.current.fontSize).toBe('large');

        act(() => {
          result.current.setFontSize('extra-large');
        });
        expect(result.current.fontSize).toBe('extra-large');
      });
    });

    describe('highContrast', () => {
      it('should toggle high contrast mode', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setHighContrast(true);
        });

        expect(result.current.highContrast).toBe(true);
      });

      it('should save highContrast to localStorage', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setHighContrast(true);
        });

        expect(localStorage.getItem('highContrast')).toBe('true');
      });

      it('should add high-contrast class to documentElement', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setHighContrast(true);
        });

        expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
      });

      it('should remove high-contrast class when disabled', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setHighContrast(true);
        });
        expect(document.documentElement.classList.contains('high-contrast')).toBe(true);

        act(() => {
          result.current.setHighContrast(false);
        });
        expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
      });
    });

    describe('reducedMotion', () => {
      it('should detect prefers-reduced-motion from media query', () => {
        // Mock matchMedia to return matches: true
        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn().mockImplementation(query => ({
            matches: query === '(prefers-reduced-motion: reduce)',
            media: query,
            onchange: null,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
          })),
        });

        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        expect(result.current.reducedMotion).toBe(true);
      });

      it('should update when media query changes', () => {
        let changeHandler: ((e: MediaQueryListEvent) => void) | null = null;

        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn().mockImplementation(() => ({
            matches: false,
            media: '',
            addEventListener: vi.fn((event, handler) => {
              if (event === 'change') {
                changeHandler = handler;
              }
            }),
            removeEventListener: vi.fn(),
          })),
        });

        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        expect(result.current.reducedMotion).toBe(false);

        // Simulate media query change
        act(() => {
          if (changeHandler) {
            changeHandler({ matches: true } as MediaQueryListEvent);
          }
        });

        expect(result.current.reducedMotion).toBe(true);
      });
    });

    describe('announceMessage', () => {
      it('should create announcement element', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.announceMessage('Test announcement');
        });

        const announcements = document.querySelectorAll('[role="status"]');
        expect(announcements.length).toBeGreaterThan(0);
        expect(announcements[0].textContent).toBe('Test announcement');
      });

      it('should set correct ARIA attributes', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.announceMessage('Test message');
        });

        const announcement = document.querySelector('[role="status"]');
        expect(announcement).toBeTruthy();
        expect(announcement?.getAttribute('role')).toBe('status');
        expect(announcement?.getAttribute('aria-live')).toBe('polite');
        expect(announcement?.classList.contains('sr-only')).toBe(true);
      });

      it('should remove announcement after timeout', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.announceMessage('Test message');
        });

        expect(document.querySelectorAll('[role="status"]').length).toBe(1);

        act(() => {
          vi.advanceTimersByTime(1000);
        });

        expect(document.querySelectorAll('[role="status"]').length).toBe(0);
      });

      it('should handle multiple announcements', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.announceMessage('First message');
          result.current.announceMessage('Second message');
          result.current.announceMessage('Third message');
        });

        expect(document.querySelectorAll('[role="status"]').length).toBe(3);
      });
    });

    describe('persistence', () => {
      it('should persist all settings across re-renders', () => {
        const { result, rerender } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setLeftHandMode(true);
          result.current.setFontSize('large');
          result.current.setHighContrast(true);
        });

        rerender();

        expect(result.current.leftHandMode).toBe(true);
        expect(result.current.fontSize).toBe('large');
        expect(result.current.highContrast).toBe(true);
      });
    });

    describe('edge cases', () => {
      it('should handle invalid localStorage values', () => {
        localStorage.setItem('leftHandMode', 'invalid');
        localStorage.setItem('fontSize', 'invalid');
        localStorage.setItem('highContrast', 'invalid');

        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        // Should fall back to defaults
        expect(typeof result.current.leftHandMode).toBe('boolean');
        expect(['normal', 'large', 'extra-large'].includes(result.current.fontSize)).toBe(true);
        expect(typeof result.current.highContrast).toBe('boolean');
      });

      it('should handle rapid setting changes', () => {
        const { result } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        act(() => {
          result.current.setFontSize('large');
          result.current.setFontSize('extra-large');
          result.current.setFontSize('normal');
        });

        expect(result.current.fontSize).toBe('normal');
      });

      it('should cleanup media query listener on unmount', () => {
        const removeEventListenerSpy = vi.fn();

        Object.defineProperty(window, 'matchMedia', {
          writable: true,
          value: vi.fn().mockImplementation(() => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: removeEventListenerSpy,
          })),
        });

        const { unmount } = renderHook(() => useAccessibility(), {
          wrapper: AccessibilityProvider,
        });

        unmount();

        expect(removeEventListenerSpy).toHaveBeenCalled();
      });
    });
  });
});
