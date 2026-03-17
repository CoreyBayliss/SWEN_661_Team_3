import { Medication, Appointment, WellnessLog } from '@contexts/MedicationContext';

export const mockUser = {
  id: '1',
  email: 'test@careconnect.com',
  name: 'Test User',
  avatar: 'https://example.com/avatar.jpg',
};

export const mockMedications: Medication[] = [
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

export const mockAppointments: Appointment[] = [
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
    title: 'Follow-up Consultation',
    doctor: 'Dr. Michael Chen',
    date: '2026-04-10',
    time: '2:00 PM',
    location: 'Virtual',
    type: 'telehealth',
  },
];

export const mockWellnessLogs: WellnessLog[] = [
  {
    id: '1',
    type: 'mood',
    value: 4,
    timestamp: new Date().toISOString(),
    notes: 'Feeling good today',
  },
  {
    id: '2',
    type: 'sleep',
    value: 7.5,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    notes: '7.5 hours of sleep',
  },
  {
    id: '3',
    type: 'pain',
    value: 2,
    timestamp: new Date().toISOString(),
    notes: 'Mild headache',
  },
];

export const createMockMedication = (overrides?: Partial<Medication>): Medication => ({
  id: Math.random().toString(36).substr(2, 9),
  name: 'Test Medication',
  dosage: '100mg',
  frequency: 'Once daily',
  times: ['08:00'],
  startDate: new Date().toISOString().split('T')[0],
  instructions: 'Take with water',
  refillsRemaining: 3,
  prescribedBy: 'Dr. Test',
  condition: 'Test Condition',
  nextDose: new Date().toISOString(),
  ...overrides,
});

export const createMockAppointment = (overrides?: Partial<Appointment>): Appointment => ({
  id: Math.random().toString(36).substr(2, 9),
  title: 'Test Appointment',
  doctor: 'Dr. Test',
  date: new Date().toISOString().split('T')[0],
  time: '10:00 AM',
  location: 'Test Location',
  type: 'in-person',
  ...overrides,
});

export const createMockWellnessLog = (overrides?: Partial<WellnessLog>): WellnessLog => ({
  id: Math.random().toString(36).substr(2, 9),
  type: 'mood',
  value: 5,
  timestamp: new Date().toISOString(),
  notes: 'Test note',
  ...overrides,
});
