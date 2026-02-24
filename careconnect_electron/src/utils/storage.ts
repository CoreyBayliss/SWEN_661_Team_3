// Storage utility functions for CareConnect
// Provides safe localStorage access with error handling

export const storage = {
  /**
   * Get item from localStorage with error handling
   */
  get<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  },

  /**
   * Set item in localStorage with error handling
   */
  set<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  },

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
      return false;
    }
  },

  /**
   * Clear all CareConnect data from localStorage
   */
  clear(): boolean {
    try {
      const keys = [
        'isAuthenticated',
        'leftHandMode',
        'biometricEnabled',
        'onboardingComplete',
        'favorites'
      ];
      keys.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  /**
   * Debug: Print all CareConnect localStorage items
   */
  debug(): void {
    const keys = [
      'isAuthenticated',
      'leftHandMode',
      'biometricEnabled',
      'onboardingComplete',
      'favorites'
    ];
    
    console.group('CareConnect LocalStorage Debug');
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      console.log(`${key}:`, value);
    });
    console.groupEnd();
  }
};

// Make storage utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).careConnectStorage = storage;
}
