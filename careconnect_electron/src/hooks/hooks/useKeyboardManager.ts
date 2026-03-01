import { useState, useEffect, useCallback, RefObject } from 'react';

type KeyboardType = 'text' | 'numeric' | 'decimal' | 'email';

interface KeyboardState {
  isVisible: boolean;
  type: KeyboardType;
  targetElement: HTMLInputElement | HTMLTextAreaElement | null;
}

export const useKeyboardManager = (containerRef?: RefObject<HTMLElement>) => {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isVisible: false,
    type: 'text',
    targetElement: null,
  });

  const getKeyboardType = (element: HTMLInputElement | HTMLTextAreaElement): KeyboardType => {
    const inputMode = element.getAttribute('inputMode') || element.getAttribute('inputmode');
    
    if (inputMode === 'numeric') return 'numeric';
    if (inputMode === 'decimal') return 'decimal';
    if (inputMode === 'email') return 'email';
    if (inputMode === 'text') return 'text';
    
    // Fallback to type attribute
    const type = element.getAttribute('type');
    if (type === 'number') return 'numeric';
    if (type === 'email') return 'email';
    if (type === 'tel') return 'numeric';
    
    return 'text';
  };

  const handleFocus = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLElement;
    
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      const inputElement = target as HTMLInputElement | HTMLTextAreaElement;
      
      // Don't show keyboard for certain input types
      if (inputElement.type === 'checkbox' || 
          inputElement.type === 'radio' || 
          inputElement.type === 'submit' ||
          inputElement.type === 'button' ||
          inputElement.readOnly ||
          inputElement.disabled) {
        return;
      }

      const keyboardType = getKeyboardType(inputElement);
      
      setKeyboardState({
        isVisible: true,
        type: keyboardType,
        targetElement: inputElement,
      });

      // Scroll element into view with keyboard visible
      setTimeout(() => {
        inputElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }, 300);
    }
  }, []);

  const handleBlur = useCallback((event: FocusEvent) => {
    const target = event.target as HTMLElement;
    const relatedTarget = event.relatedTarget as HTMLElement;
    
    // Don't hide keyboard if focus moved to another input
    if (relatedTarget && (relatedTarget.tagName === 'INPUT' || relatedTarget.tagName === 'TEXTAREA')) {
      return;
    }
    
    // Don't hide if clicked on keyboard
    if (relatedTarget?.closest('.mobile-keyboard')) {
      return;
    }

    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      // Delay to allow keyboard button clicks to register
      setTimeout(() => {
        setKeyboardState({
          isVisible: false,
          type: 'text',
          targetElement: null,
        });
      }, 100);
    }
  }, []);

  useEffect(() => {
    const container = containerRef?.current || document;
    
    container.addEventListener('focusin', handleFocus as EventListener);
    container.addEventListener('focusout', handleBlur as EventListener);
    
    return () => {
      container.removeEventListener('focusin', handleFocus as EventListener);
      container.removeEventListener('focusout', handleBlur as EventListener);
    };
  }, [handleFocus, handleBlur, containerRef]);

  const handleKeyPress = useCallback((key: string) => {
    if (!keyboardState.targetElement) return;

    const element = keyboardState.targetElement;
    const start = element.selectionStart || 0;
    const end = element.selectionEnd || 0;
    const currentValue = element.value;

    if (key === 'Backspace') {
      if (start === end && start > 0) {
        // Delete character before cursor
        const newValue = currentValue.slice(0, start - 1) + currentValue.slice(end);
        element.value = newValue;
        element.setSelectionRange(start - 1, start - 1);
      } else if (start !== end) {
        // Delete selection
        const newValue = currentValue.slice(0, start) + currentValue.slice(end);
        element.value = newValue;
        element.setSelectionRange(start, start);
      }
    } else if (key === 'Enter') {
      // Trigger form submission or newline for textarea
      if (element.tagName === 'TEXTAREA') {
        const newValue = currentValue.slice(0, start) + '\n' + currentValue.slice(end);
        element.value = newValue;
        element.setSelectionRange(start + 1, start + 1);
      } else {
        element.form?.requestSubmit();
      }
    } else {
      // Insert character
      const newValue = currentValue.slice(0, start) + key + currentValue.slice(end);
      element.value = newValue;
      element.setSelectionRange(start + key.length, start + key.length);
    }

    // Trigger input event so React sees the change
    const inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
  }, [keyboardState.targetElement]);

  const closeKeyboard = useCallback(() => {
    if (keyboardState.targetElement) {
      keyboardState.targetElement.blur();
    }
    setKeyboardState({
      isVisible: false,
      type: 'text',
      targetElement: null,
    });
  }, [keyboardState.targetElement]);

  return {
    isKeyboardVisible: keyboardState.isVisible,
    keyboardType: keyboardState.type,
    handleKeyPress,
    closeKeyboard,
  };
};
