import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner@2.0.3';

interface Medication {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  times: string[];
  refillsRemaining: number;
  pharmacy: string;
  lastTaken?: {
    timestamp: string;
    user: string;
  };
  history: Array<{
    timestamp: string;
    action: 'taken' | 'skipped';
    user: string;
  }>;
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  provider: string;
}

interface MessageTemplate {
  id: string;
  text: string;
  category: string;
}

interface Contact {
  id: string;
  name: string;
  role: string;
  phone?: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  medications: Medication[];
  addMedication: (med: Omit<Medication, 'id' | 'history'>) => void;
  takeMedication: (id: string, user: string) => void;
  skipMedication: (id: string, user: string) => void;
  undoLastAction: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (apt: Omit<Appointment, 'id'>) => void;
  messageTemplates: MessageTemplate[];
  contacts: Contact[];
  favorites: string[];
  toggleFavorite: (path: string) => void;
  login: () => void;
  logout: () => void;
  // Navigation
  currentPath: string;
  navigate: (path: string) => void;
  // Desktop settings
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  leftHandMode: boolean;
  setLeftHandMode: (value: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    // During hot reload, context might be temporarily undefined
    // Return a safe default to prevent crashes
    console.error('useApp must be used within AppProvider');
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAuthenticated');
    return stored ? JSON.parse(stored) : false;
  });
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const stored = localStorage.getItem('notificationsEnabled');
    return stored ? JSON.parse(stored) : true;
  });
  const [leftHandMode, setLeftHandMode] = useState(() => {
    const stored = localStorage.getItem('leftHandMode');
    return stored ? JSON.parse(stored) : false;
  });
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dose: '10mg',
      frequency: 'Once daily',
      times: ['09:00'],
      refillsRemaining: 2,
      pharmacy: 'CVS Pharmacy - Main St',
      history: [],
    },
    {
      id: '2',
      name: 'Metformin',
      dose: '500mg',
      frequency: 'Twice daily',
      times: ['08:00', '20:00'],
      refillsRemaining: 1,
      pharmacy: 'CVS Pharmacy - Main St',
      history: [],
    },
  ]);
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: '1',
      title: 'Dr. Smith - Follow-up',
      date: '2026-02-27',
      time: '14:00',
      location: 'City Medical Center',
      provider: 'Dr. Sarah Smith',
    },
    {
      id: '2',
      title: 'Physical Therapy',
      date: '2026-02-28',
      time: '10:30',
      location: 'Rehab Center',
      provider: 'John Davis, PT',
    },
  ]);
  const [messageTemplates] = useState<MessageTemplate[]>([
    { id: '1', text: 'Running late, will be there in 15 minutes', category: 'appointment' },
    { id: '2', text: 'Medication taken as scheduled', category: 'update' },
    { id: '3', text: 'Need to reschedule appointment', category: 'appointment' },
    { id: '4', text: 'Feeling better today', category: 'wellness' },
  ]);
  const [contacts] = useState<Contact[]>([
    { id: '1', name: 'Dr. Sarah Smith', role: 'Primary Care', phone: '555-0100' },
    { id: '2', name: 'John Davis, PT', role: 'Physical Therapist', phone: '555-0200' },
    { id: '3', name: 'Care Coordinator', role: 'Support', phone: '555-0300' },
  ]);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : ['/medications', '/calendar'];
  });
  const [currentPath, setCurrentPath] = useState('/today');

  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('notificationsEnabled', JSON.stringify(notificationsEnabled));
  }, [notificationsEnabled]);

  useEffect(() => {
    localStorage.setItem('leftHandMode', JSON.stringify(leftHandMode));
  }, [leftHandMode]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addMedication = (med: Omit<Medication, 'id' | 'history'>) => {
    const newMed: Medication = {
      ...med,
      id: Date.now().toString(),
      history: [],
    };
    setMedications([...medications, newMed]);
  };

  const takeMedication = (id: string, user: string) => {
    setMedications(medications.map(med => {
      if (med.id === id) {
        return {
          ...med,
          lastTaken: { timestamp: new Date().toISOString(), user },
          history: [...med.history, { timestamp: new Date().toISOString(), action: 'taken' as const, user }],
        };
      }
      return med;
    }));
    toast.success('Medication taken successfully!');
  };

  const skipMedication = (id: string, user: string) => {
    setMedications(medications.map(med => {
      if (med.id === id) {
        return {
          ...med,
          history: [...med.history, { timestamp: new Date().toISOString(), action: 'skipped' as const, user }],
        };
      }
      return med;
    }));
    toast.warning('Medication skipped!');
  };

  const undoLastAction = (id: string) => {
    setMedications(medications.map(med => {
      if (med.id === id && med.history.length > 0) {
        const newHistory = [...med.history];
        newHistory.pop();
        return {
          ...med,
          history: newHistory,
          lastTaken: newHistory.length > 0 && newHistory[newHistory.length - 1].action === 'taken' 
            ? { timestamp: newHistory[newHistory.length - 1].timestamp, user: newHistory[newHistory.length - 1].user }
            : undefined,
        };
      }
      return med;
    }));
    toast.info('Last action undone!');
  };

  const addAppointment = (apt: Omit<Appointment, 'id'>) => {
    const newApt: Appointment = {
      ...apt,
      id: Date.now().toString(),
    };
    setAppointments([...appointments, newApt]);
  };

  const toggleFavorite = (path: string) => {
    setFavorites(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path)
        : [...prev, path]
    );
  };

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentPath('/medications'); // Reset to default path on logout
  };

  const navigate = (path: string) => {
    setCurrentPath(path);
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        medications,
        addMedication,
        takeMedication,
        skipMedication,
        undoLastAction,
        appointments,
        addAppointment,
        messageTemplates,
        contacts,
        favorites,
        toggleFavorite,
        login,
        logout,
        // Navigation
        currentPath,
        navigate,
        // Desktop settings
        notificationsEnabled,
        setNotificationsEnabled,
        leftHandMode,
        setLeftHandMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};