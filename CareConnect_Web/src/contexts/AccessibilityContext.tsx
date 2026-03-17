import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccessibilityContextType {
  leftHandMode: boolean;
  setLeftHandMode: (enabled: boolean) => void;
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  highContrast: boolean;
  setHighContrast: (enabled: boolean) => void;
  reducedMotion: boolean;
  screenReaderEnabled: boolean;
  announceMessage: (message: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [leftHandMode, setLeftHandModeState] = useState<boolean>(() => {
    const saved = localStorage.getItem('leftHandMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'extra-large'>(() => {
    const saved = localStorage.getItem('fontSize');
    return (saved as 'normal' | 'large' | 'extra-large') || 'normal';
  });

  const [highContrast, setHighContrastState] = useState<boolean>(() => {
    const saved = localStorage.getItem('highContrast');
    return saved ? JSON.parse(saved) : false;
  });

  const [reducedMotion, setReducedMotion] = useState<boolean>(
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('leftHandMode', JSON.stringify(leftHandMode));
    document.documentElement.classList.toggle('left-hand-mode', leftHandMode);
  }, [leftHandMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
    document.documentElement.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setLeftHandMode = (enabled: boolean) => {
    setLeftHandModeState(enabled);
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
  };

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled);
  };

  const announceMessage = (message: string) => {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => document.body.removeChild(announcement), 1000);
  };

  return (
    <AccessibilityContext.Provider
      value={{
        leftHandMode,
        setLeftHandMode,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        screenReaderEnabled,
        announceMessage,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}
