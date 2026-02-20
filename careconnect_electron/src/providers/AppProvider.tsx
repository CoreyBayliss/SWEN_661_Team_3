import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Medication,
  Appointment,
  Contact,
  MessageTemplate,
  AppSettings,
  MedicationAction,
} from '../models';

interface AppContextType {
  // Auth
  isAuthenticated: boolean;
  hasCompletedOnboarding: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  completeOnboarding: () => Promise<void>;

  // Settings
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => Promise<void>;

  // Medications
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id' | 'history'>) => void;
  updateMedication: (id: string, updates: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  getMedicationById: (id: string) => Medication | undefined;
  recordMedicationAction: (medicationId: string, action: 'taken' | 'skipped') => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  deleteAppointment: (id: string) => void;

  // Contacts
  contacts: Contact[];
  messageTemplates: MessageTemplate[];

  // Favorites
  favorites: Set<string>;
  toggleFavorite: (path: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [settings, setSettings] = useState<AppSettings>({
    textSize: 16,
    highContrast: false,
    voiceEnabled: false,
    notificationsEnabled: true,
  });
  const [medications, setMedications] = useState<Medication[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [contacts] = useState<Contact[]>([]);
  const [messageTemplates] = useState<MessageTemplate[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set(['/medications', '/calendar']));

  // Load data from electron-store on mount
  useEffect(() => {
    loadAppData();
  }, []);

  const loadAppData = async () => {
    try {
      const storedAuth = await window.electronAPI.store.get('isAuthenticated');
      const storedOnboarding = await window.electronAPI.store.get('hasCompletedOnboarding');
      const storedSettings = await window.electronAPI.store.get('settings');
      const storedMedications = await window.electronAPI.store.get('medications');
      const storedAppointments = await window.electronAPI.store.get('appointments');
      const storedFavorites = await window.electronAPI.store.get('favorites');

      if (storedAuth) setIsAuthenticated(storedAuth);
      if (storedOnboarding) setHasCompletedOnboarding(storedOnboarding);
      if (storedSettings) setSettings(storedSettings);
      if (storedFavorites) setFavorites(new Set(storedFavorites));

      // Initialize with mock data if empty
      if (storedMedications && storedMedications.length > 0) {
        setMedications(storedMedications);
      } else {
        const mockMedications: Medication[] = [
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
        ];
        setMedications(mockMedications);
        await window.electronAPI.store.set('medications', mockMedications);
      }

      if (storedAppointments && storedAppointments.length > 0) {
        setAppointments(storedAppointments);
      } else {
        const mockAppointments: Appointment[] = [
          {
            id: '1',
            title: 'Dr. Smith - Follow-up',
            date: new Date(2026, 0, 27),
            time: '14:00',
            location: 'City Medical Center',
            provider: 'Dr. Sarah Smith',
          },
          {
            id: '2',
            title: 'Physical Therapy',
            date: new Date(2026, 0, 28),
            time: '10:30',
            location: 'Rehab Center',
            provider: 'John Davis, PT',
          },
        ];
        setAppointments(mockAppointments);
        await window.electronAPI.store.set('appointments', mockAppointments);
      }
    } catch (error) {
      console.error('Error loading app data:', error);
    }
  };

  const login = async () => {
    setIsAuthenticated(true);
    await window.electronAPI.store.set('isAuthenticated', true);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    await window.electronAPI.store.set('isAuthenticated', false);
  };

  const completeOnboarding = async () => {
    setHasCompletedOnboarding(true);
    await window.electronAPI.store.set('hasCompletedOnboarding', true);
  };

  const updateSettings = async (newSettings: Partial<AppSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    await window.electronAPI.store.set('settings', updated);
  };

  const addMedication = (medication: Omit<Medication, 'id' | 'history'>) => {
    const newMed: Medication = {
      ...medication,
      id: Date.now().toString(),
      history: [],
    };
    const updated = [...medications, newMed];
    setMedications(updated);
    window.electronAPI.store.set('medications', updated);
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    const updated = medications.map((med) =>
      med.id === id ? { ...med, ...updates } : med
    );
    setMedications(updated);
    window.electronAPI.store.set('medications', updated);
  };

  const deleteMedication = (id: string) => {
    const updated = medications.filter((med) => med.id !== id);
    setMedications(updated);
    window.electronAPI.store.set('medications', updated);
  };

  const getMedicationById = (id: string) => {
    return medications.find((med) => med.id === id);
  };

  const recordMedicationAction = (medicationId: string, action: 'taken' | 'skipped') => {
    const medication = medications.find((med) => med.id === medicationId);
    if (!medication) return;

    const newAction: MedicationAction = {
      timestamp: new Date(),
      user: 'Current User',
      action,
    };

    const updated = medications.map((med) =>
      med.id === medicationId
        ? {
            ...med,
            lastTaken: newAction,
            history: [...med.history, newAction],
          }
        : med
    );

    setMedications(updated);
    window.electronAPI.store.set('medications', updated);
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppt: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    const updated = [...appointments, newAppt];
    setAppointments(updated);
    window.electronAPI.store.set('appointments', updated);
  };

  const updateAppointment = (id: string, updates: Partial<Appointment>) => {
    const updated = appointments.map((appt) =>
      appt.id === id ? { ...appt, ...updates } : appt
    );
    setAppointments(updated);
    window.electronAPI.store.set('appointments', updated);
  };

  const deleteAppointment = (id: string) => {
    const updated = appointments.filter((appt) => appt.id !== id);
    setAppointments(updated);
    window.electronAPI.store.set('appointments', updated);
  };

  const toggleFavorite = (path: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(path)) {
      newFavorites.delete(path);
    } else {
      newFavorites.add(path);
    }
    setFavorites(newFavorites);
    window.electronAPI.store.set('favorites', Array.from(newFavorites));
  };

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        hasCompletedOnboarding,
        login,
        logout,
        completeOnboarding,
        settings,
        updateSettings,
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        getMedicationById,
        recordMedicationAction,
        appointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,
        contacts,
        messageTemplates,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
