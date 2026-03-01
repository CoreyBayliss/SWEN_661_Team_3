import { useEffect, RefObject } from 'react';

interface UseFormNavigationOptions {
  onSubmit?: () => void;
  onCancel?: () => void;
  enabled?: boolean;
}

/**
 * Custom hook for keyboard navigation in forms
 * Handles Enter to submit, Escape to cancel, and Tab navigation
 */
export const useFormNavigation = (
  formRef: RefObject<HTMLFormElement>,
  options: UseFormNavigationOptions = {}
) => {
  const { onSubmit, onCancel, enabled = true } = options;

  useEffect(() => {
    const form = formRef.current;
    if (!form || !enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTextarea = target.tagName === 'TEXTAREA';

      // Escape to cancel
      if (event.key === 'Escape') {
        event.preventDefault();
        if (onCancel) {
          onCancel();
        } else {
          // Blur the current element as a fallback
          (document.activeElement as HTMLElement)?.blur();
        }
        return;
      }

      // Enter to submit (except in textareas)
      if (event.key === 'Enter' && !isTextarea && !event.shiftKey) {
        const isButton = target.tagName === 'BUTTON';
        
        // Don't prevent default if it's already a button
        if (!isButton) {
          event.preventDefault();
          if (onSubmit) {
            onSubmit();
          } else {
            // Find and click the submit button
            const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
            submitButton?.click();
          }
        }
        return;
      }

      // Ctrl+Enter to submit from textarea
      if (event.key === 'Enter' && event.ctrlKey && isTextarea) {
        event.preventDefault();
        if (onSubmit) {
          onSubmit();
        } else {
          const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;
          submitButton?.click();
        }
      }
    };

    form.addEventListener('keydown', handleKeyDown);
    return () => form.removeEventListener('keydown', handleKeyDown);
  }, [formRef, onSubmit, onCancel, enabled]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (!enabled || !formRef.current) return;

    const firstInput = formRef.current.querySelector(
      'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])'
    ) as HTMLElement;

    if (firstInput) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => firstInput.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [formRef, enabled]);
};
