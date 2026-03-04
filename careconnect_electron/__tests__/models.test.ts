import { describe, test, expect, beforeEach } from '@jest/globals';
import { Medication, MedicationAction, Appointment, Contact } from '@/context/AppContext';

describe('Medication Model Tests', () => {
  test('Medication can be created with all properties', () => {
    const medication: Medication = {
      id: '1',
      name: 'Test Med',
      dose: '10mg',
      frequency: 'Once daily',
      times: ['09:00'],
      refillsRemaining: 3,
      pharmacy: 'Test Pharmacy',
      history: [],
    };

    expect(medication.id).toBe('1');
    expect(medication.name).toBe('Test Med');
    expect(medication.dose).toBe('10mg');
    expect(medication.frequency).toBe('Once daily');
    expect(medication.times).toEqual(['09:00']);
    expect(medication.refillsRemaining).toBe(3);
    expect(medication.pharmacy).toBe('Test Pharmacy');
    expect(medication.history).toEqual([]);
  });

  test('Medication with lastTaken action', () => {
    const now = new Date();
    const action: MedicationAction = {
      timestamp: now,
      user: 'Test User',
      action: 'taken',
    };

    const medication: Medication = {
      id: '1',
      name: 'Test Med',
      dose: '10mg',
      frequency: 'Once daily',
      times: ['09:00'],
      refillsRemaining: 3,
      pharmacy: 'Test Pharmacy',
      lastTaken: action,
      history: [action],
    };

    expect(medication.lastTaken).toBeDefined();
    expect(medication.lastTaken?.timestamp).toBe(now);
    expect(medication.lastTaken?.user).toBe('Test User');
    expect(medication.lastTaken?.action).toBe('taken');
  });

  test('Medication can have multiple history entries', () => {
    const action1: MedicationAction = {
      timestamp: new Date('2026-03-01'),
      user: 'User1',
      action: 'taken',
    };

    const action2: MedicationAction = {
      timestamp: new Date('2026-03-02'),
      user: 'User2',
      action: 'skipped',
    };

    const medication: Medication = {
      id: '1',
      name: 'Test Med',
      dose: '10mg',
      frequency: 'Twice daily',
      times: ['09:00', '21:00'],
      refillsRemaining: 5,
      pharmacy: 'Pharmacy',
      history: [action1, action2],
    };

    expect(medication.history).toHaveLength(2);
    expect(medication.history[0].action).toBe('taken');
    expect(medication.history[1].action).toBe('skipped');
  });
});

describe('MedicationAction Model Tests', () => {
  test('MedicationAction with default action', () => {
    const now = new Date();
    const action: MedicationAction = {
      timestamp: now,
      user: 'Test User',
    };

    expect(action.timestamp).toBe(now);
    expect(action.user).toBe('Test User');
    expect(action.action).toBeUndefined();
  });

  test('MedicationAction with custom action', () => {
    const now = new Date();
    const action: MedicationAction = {
      timestamp: now,
      user: 'Test User',
      action: 'skipped',
    };

    expect(action.action).toBe('skipped');
  });
});

describe('Appointment Model Tests', () => {
  test('Appointment can be created', () => {
    const date = new Date('2026-03-15');
    const appointment: Appointment = {
      id: '1',
      title: 'Doctor Visit',
      date: date,
      time: '14:00',
      location: 'Medical Center',
      provider: 'Dr. Smith',
    };

    expect(appointment.id).toBe('1');
    expect(appointment.title).toBe('Doctor Visit');
    expect(appointment.date).toBe(date);
    expect(appointment.time).toBe('14:00');
    expect(appointment.location).toBe('Medical Center');
    expect(appointment.provider).toBe('Dr. Smith');
  });

  test('Appointment with optional notes', () => {
    const appointment: Appointment = {
      id: '1',
      title: 'Checkup',
      date: new Date(),
      time: '10:00',
      location: 'Clinic',
      provider: 'Dr. Jones',
      notes: 'Bring insurance card',
    };

    expect(appointment.notes).toBe('Bring insurance card');
  });
});

describe('Contact Model Tests', () => {
  test('Contact can be created with phone', () => {
    const contact: Contact = {
      id: '1',
      name: 'Dr. Smith',
      phone: '555-1234',
      role: 'Primary Care',
    };

    expect(contact.id).toBe('1');
    expect(contact.name).toBe('Dr. Smith');
    expect(contact.phone).toBe('555-1234');
    expect(contact.role).toBe('Primary Care');
  });

  test('Contact with email', () => {
    const contact: Contact = {
      id: '1',
      name: 'Nurse Johnson',
      phone: '555-5678',
      email: 'nurse@clinic.com',
      role: 'Nurse',
    };

    expect(contact.email).toBe('nurse@clinic.com');
  });

  test('Contact with all optional fields', () => {
    const contact: Contact = {
      id: '1',
      name: 'Dr. Wilson',
      phone: '555-9999',
      email: 'dr.wilson@hospital.com',
      role: 'Specialist',
      specialty: 'Cardiology',
      location: 'City Hospital',
    };

    expect(contact.specialty).toBe('Cardiology');
    expect(contact.location).toBe('City Hospital');
  });
});
