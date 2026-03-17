import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithBiometric: () => Promise<void>;
  logout: () => void;
  sessionTimeout: number;
  setSessionTimeout: (minutes: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = sessionStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [sessionTimeout, setSessionTimeoutState] = useState<number>(() => {
    const saved = localStorage.getItem('sessionTimeout');
    return saved ? parseInt(saved) : 30;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('sessionTimeout', sessionTimeout.toString());
  }, [sessionTimeout]);

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
    };
    
    setUser(mockUser);
  };

  const loginWithBiometric = async (): Promise<void> => {
    try {
      // Check if Web Authentication API is available
      if (window.PublicKeyCredential) {
        // In a real app, you would use navigator.credentials.get()
        // For demo purposes, we'll simulate it
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockUser: User = {
          id: '1',
          email: 'user@careconnect.com',
          name: 'Demo User',
        };
        
        setUser(mockUser);
      } else {
        throw new Error('Biometric authentication not supported');
      }
    } catch (error) {
      console.error('Biometric login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const setSessionTimeout = (minutes: number) => {
    setSessionTimeoutState(minutes);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithBiometric,
        logout,
        sessionTimeout,
        setSessionTimeout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
