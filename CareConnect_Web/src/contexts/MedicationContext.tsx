import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: string;
  endDate?: string;
  instructions?: string;
  refillsRemaining?: number;
  prescribedBy?: string;
  condition?: string;
  lastTaken?: string;
  nextDose?: string;
}

export interface Appointment {
  id: string;
  title: string;
  doctor: string;
  date: string;
  time: string;
  location: string;
  type: 'in-person' | 'telehealth';
}

export interface WellnessLog {
  id: string;
  type: 'mood' | 'sleep' | 'pain' | 'energy';
  value: number | string;
  timestamp: string;
  notes?: string;
}

interface MedicationContextType {
  medications: Medication[];
  addMedication: (medication: Omit<Medication, 'id'>) => void;
  updateMedication: (id: string, medication: Partial<Medication>) => void;
  deleteMedication: (id: string) => void;
  markAsTaken: (id: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  wellnessLogs: WellnessLog[];
  addWellnessLog: (log: Omit<WellnessLog, 'id'>) => void;
}

const MedicationContext = createContext<MedicationContextType | undefined>(undefined);

const mockMedications: Medication[] = [
  {
    id: '1',
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    times: ['08:00'],
    startDate: '2024-01-01',
    instructions: 'Take with water in the morning',
    refillsRemaining: 2,
    prescribedBy: 'Dr. Sarah Johnson',
    condition: 'High Blood Pressure',
    nextDose: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
  },
  {
    id: '2',
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    times: ['08:00', '20:00'],
    startDate: '2024-01-01',
    instructions: 'Take with meals',
    refillsRemaining: 1,
    prescribedBy: 'Dr. Michael Chen',
    condition: 'Type 2 Diabetes',
    nextDose: new Date(new Date().setHours(8, 0, 0, 0)).toISOString(),
  },
  {
    id: '3',
    name: 'Atorvastatin',
    dosage: '20mg',
    frequency: 'Once daily',
    times: ['20:00'],
    startDate: '2024-01-15',
    instructions: 'Take in the evening',
    refillsRemaining: 3,
    prescribedBy: 'Dr. Sarah Johnson',
    condition: 'High Cholesterol',
    nextDose: new Date(new Date().setHours(20, 0, 0, 0)).toISOString(),
  },
];

const mockAppointments: Appointment[] = [
  {
    id: '1',
    title: 'Annual Physical',
    doctor: 'Dr. Sarah Johnson',
    date: '2026-03-25',
    time: '10:00 AM',
    location: 'CareConnect Medical Center',
    type: 'in-person',
  },
  {
    id: '2',
    title: 'Diabetes Follow-up',
    doctor: 'Dr. Michael Chen',
    date: '2026-03-28',
    time: '2:00 PM',
    location: 'Virtual',
    type: 'telehealth',
  },
];

export function MedicationProvider({ children }: { children: React.ReactNode }) {
  const [medications, setMedications] = useState<Medication[]>(() => {
    const saved = localStorage.getItem('medications');
    return saved ? JSON.parse(saved) : mockMedications;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });

  const [wellnessLogs, setWellnessLogs] = useState<WellnessLog[]>(() => {
    const saved = localStorage.getItem('wellnessLogs');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('wellnessLogs', JSON.stringify(wellnessLogs));
  }, [wellnessLogs]);

  const addMedication = (medication: Omit<Medication, 'id'>) => {
    const newMedication: Medication = {
      ...medication,
      id: Date.now().toString(),
    };
    setMedications(prev => [...prev, newMedication]);
  };

  const updateMedication = (id: string, updates: Partial<Medication>) => {
    setMedications(prev =>
      prev.map(med => (med.id === id ? { ...med, ...updates } : med))
    );
  };

  const deleteMedication = (id: string) => {
    setMedications(prev => prev.filter(med => med.id !== id));
  };

  const markAsTaken = (id: string) => {
    setMedications(prev =>
      prev.map(med =>
        med.id === id
          ? {
              ...med,
              lastTaken: new Date().toISOString(),
            }
          : med
      )
    );
  };

  const addAppointment = (appointment: Omit<Appointment, 'id'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: Date.now().toString(),
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const addWellnessLog = (log: Omit<WellnessLog, 'id'>) => {
    const newLog: WellnessLog = {
      ...log,
      id: Date.now().toString(),
    };
    setWellnessLogs(prev => [...prev, newLog]);
  };

  return (
    <MedicationContext.Provider
      value={{
        medications,
        addMedication,
        updateMedication,
        deleteMedication,
        markAsTaken,
        appointments,
        addAppointment,
        wellnessLogs,
        addWellnessLog,
      }}
    >
      {children}
    </MedicationContext.Provider>
  );
}

export function useMedication() {
  const context = useContext(MedicationContext);
  if (!context) {
    throw new Error('useMedication must be used within MedicationProvider');
  }
  return context;
}
