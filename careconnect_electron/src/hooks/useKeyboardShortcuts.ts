import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  callback: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? event.ctrlKey || event.metaKey : !event.ctrlKey && !event.metaKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && altMatch && shiftMatch && keyMatch) {
          event.preventDefault();
          shortcut.callback();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Common keyboard shortcuts for desktop apps
export const SHORTCUTS = {
  // Navigation
  DASHBOARD: { key: '1', ctrl: true, description: 'Go to Dashboard' },
  MEDICATIONS: { key: '2', ctrl: true, description: 'Go to Medications' },
  CALENDAR: { key: '3', ctrl: true, description: 'Go to Calendar' },
  MESSAGES: { key: '4', ctrl: true, description: 'Go to Messages' },
  SETTINGS: { key: '5', ctrl: true, description: 'Go to Settings' },
  
  // Actions
  NEW: { key: 'n', ctrl: true, description: 'New Item' },
  SEARCH: { key: 'f', ctrl: true, description: 'Search' },
  SAVE: { key: 's', ctrl: true, description: 'Save' },
  REFRESH: { key: 'r', ctrl: true, description: 'Refresh' },
  TOGGLE_LEFT_HAND: { key: 'l', ctrl: true, shift: true, description: 'Toggle Left-Hand Mode' },
  
  // Window
  CLOSE: { key: 'w', ctrl: true, description: 'Close' },
  QUIT: { key: 'q', ctrl: true, description: 'Quit' },
};