import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { MedicationProvider, useMedication } from '@contexts/MedicationContext';
import { createMockMedication, createMockAppointment, createMockWellnessLog } from '@tests/helpers/data';

describe('MedicationContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('useMedication hook', () => {
    it('should throw error when used outside MedicationProvider', () => {
      const originalError = console.error;
      console.error = vi.fn();

      expect(() => {
        renderHook(() => useMedication());
      }).toThrow('useMedication must be used within MedicationProvider');

      console.error = originalError;
    });
  });

  describe('MedicationProvider', () => {
    it('should provide initial medications', () => {
      const { result } = renderHook(() => useMedication(), {
        wrapper: MedicationProvider,
      });

      expect(result.current.medications).toBeDefined();
      expect(Array.isArray(result.current.medications)).toBe(true);
      expect(result.current.medications.length).toBeGreaterThan(0);
    });

    it('should provide initial appointments', () => {
      const { result } = renderHook(() => useMedication(), {
        wrapper: MedicationProvider,
      });

      expect(result.current.appointments).toBeDefined();
      expect(Array.isArray(result.current.appointments)).toBe(true);
    });

    it('should provide initial wellness logs', () => {
      const { result } = renderHook(() => useMedication(), {
        wrapper: MedicationProvider,
      });

      expect(result.current.wellnessLogs).toBeDefined();
      expect(Array.isArray(result.current.wellnessLogs)).toBe(true);
    });

    describe('addMedication', () => {
      it('should add a new medication', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.medications.length;
        const newMed = createMockMedication({ name: 'Test Med' });

        act(() => {
          result.current.addMedication(newMed);
        });

        expect(result.current.medications).toHaveLength(initialCount + 1);
        expect(result.current.medications[initialCount].name).toBe('Test Med');
      });

      it('should assign unique ID to new medication', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const newMed = createMockMedication({ name: 'Test Med' });
        delete (newMed as any).id;

        act(() => {
          result.current.addMedication(newMed);
        });

        const addedMed = result.current.medications[result.current.medications.length - 1];
        expect(addedMed.id).toBeDefined();
        expect(typeof addedMed.id).toBe('string');
      });

      it('should persist medications to localStorage', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const newMed = createMockMedication({ name: 'Persisted Med' });

        act(() => {
          result.current.addMedication(newMed);
        });

        const saved = localStorage.getItem('medications');
        expect(saved).toBeTruthy();
        const parsed = JSON.parse(saved!);
        expect(parsed.some((m: any) => m.name === 'Persisted Med')).toBe(true);
      });
    });

    describe('updateMedication', () => {
      it('should update existing medication', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];

        act(() => {
          result.current.updateMedication(firstMed.id, {
            dosage: '999mg',
          });
        });

        const updated = result.current.medications.find(m => m.id === firstMed.id);
        expect(updated?.dosage).toBe('999mg');
      });

      it('should preserve other medication properties', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];
        const originalName = firstMed.name;

        act(() => {
          result.current.updateMedication(firstMed.id, {
            dosage: 'Updated dosage',
          });
        });

        const updated = result.current.medications.find(m => m.id === firstMed.id);
        expect(updated?.name).toBe(originalName);
      });

      it('should not affect other medications', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];
        const secondMed = result.current.medications[1];
        const secondOriginalDosage = secondMed.dosage;

        act(() => {
          result.current.updateMedication(firstMed.id, {
            dosage: 'New dosage',
          });
        });

        const unchangedMed = result.current.medications.find(m => m.id === secondMed.id);
        expect(unchangedMed?.dosage).toBe(secondOriginalDosage);
      });
    });

    describe('deleteMedication', () => {
      it('should delete medication by ID', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.medications.length;
        const firstMed = result.current.medications[0];

        act(() => {
          result.current.deleteMedication(firstMed.id);
        });

        expect(result.current.medications).toHaveLength(initialCount - 1);
        expect(result.current.medications.find(m => m.id === firstMed.id)).toBeUndefined();
      });

      it('should handle deletion of non-existent medication', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.medications.length;

        act(() => {
          result.current.deleteMedication('non-existent-id');
        });

        expect(result.current.medications).toHaveLength(initialCount);
      });
    });

    describe('markAsTaken', () => {
      it('should mark medication as taken', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];

        act(() => {
          result.current.markAsTaken(firstMed.id);
        });

        const updated = result.current.medications.find(m => m.id === firstMed.id);
        expect(updated?.lastTaken).toBeDefined();
      });

      it('should update lastTaken timestamp', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];
        const beforeTime = new Date();

        act(() => {
          result.current.markAsTaken(firstMed.id);
        });

        const afterTime = new Date();
        const updated = result.current.medications.find(m => m.id === firstMed.id);
        
        if (updated?.lastTaken) {
          const takenTime = new Date(updated.lastTaken);
          expect(takenTime.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
          expect(takenTime.getTime()).toBeLessThanOrEqual(afterTime.getTime());
        }
      });
    });

    describe('appointments', () => {
      it('should add appointment', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.appointments.length;
        const newAppt = createMockAppointment({ title: 'Test Appointment' });

        act(() => {
          result.current.addAppointment(newAppt);
        });

        expect(result.current.appointments).toHaveLength(initialCount + 1);
        expect(result.current.appointments[initialCount].title).toBe('Test Appointment');
      });

      it('should assign unique ID to appointment', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const newAppt = createMockAppointment({ title: 'Test' });
        delete (newAppt as any).id;

        act(() => {
          result.current.addAppointment(newAppt);
        });

        const added = result.current.appointments[result.current.appointments.length - 1];
        expect(added.id).toBeDefined();
      });
    });

    describe('wellness logs', () => {
      it('should add wellness log', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.wellnessLogs.length;
        const newLog = createMockWellnessLog({ type: 'mood', value: 5 });

        act(() => {
          result.current.addWellnessLog(newLog);
        });

        expect(result.current.wellnessLogs).toHaveLength(initialCount + 1);
        expect(result.current.wellnessLogs[initialCount].type).toBe('mood');
      });

      it('should handle different wellness log types', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        act(() => {
          result.current.addWellnessLog(createMockWellnessLog({ type: 'mood' }));
          result.current.addWellnessLog(createMockWellnessLog({ type: 'sleep' }));
          result.current.addWellnessLog(createMockWellnessLog({ type: 'pain' }));
          result.current.addWellnessLog(createMockWellnessLog({ type: 'energy' }));
        });

        const types = result.current.wellnessLogs.map(log => log.type);
        expect(types).toContain('mood');
        expect(types).toContain('sleep');
        expect(types).toContain('pain');
        expect(types).toContain('energy');
      });
    });

    describe('persistence', () => {
      it('should load medications from localStorage on mount', () => {
        const savedMeds = [
          createMockMedication({ name: 'Saved Med 1' }),
          createMockMedication({ name: 'Saved Med 2' }),
        ];

        localStorage.setItem('medications', JSON.stringify(savedMeds));

        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        expect(result.current.medications.some(m => m.name === 'Saved Med 1')).toBe(true);
        expect(result.current.medications.some(m => m.name === 'Saved Med 2')).toBe(true);
      });

      it('should use mock data if localStorage is empty', () => {
        localStorage.clear();

        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        // Should have default mock medications
        expect(result.current.medications.length).toBeGreaterThan(0);
      });

      it('should persist updates to localStorage', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];

        act(() => {
          result.current.updateMedication(firstMed.id, { dosage: '123mg' });
        });

        const saved = localStorage.getItem('medications');
        expect(saved).toBeTruthy();
        const parsed = JSON.parse(saved!);
        const savedMed = parsed.find((m: any) => m.id === firstMed.id);
        expect(savedMed.dosage).toBe('123mg');
      });
    });

    describe('edge cases', () => {
      it('should handle corrupted localStorage data', () => {
        localStorage.setItem('medications', 'invalid json');

        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        // Should fall back to mock data
        expect(result.current.medications).toBeDefined();
        expect(Array.isArray(result.current.medications)).toBe(true);
      });

      it('should handle rapid consecutive updates', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const firstMed = result.current.medications[0];

        act(() => {
          result.current.updateMedication(firstMed.id, { dosage: '10mg' });
          result.current.updateMedication(firstMed.id, { dosage: '20mg' });
          result.current.updateMedication(firstMed.id, { dosage: '30mg' });
        });

        const updated = result.current.medications.find(m => m.id === firstMed.id);
        expect(updated?.dosage).toBe('30mg');
      });

      it('should handle adding multiple items in sequence', () => {
        const { result } = renderHook(() => useMedication(), {
          wrapper: MedicationProvider,
        });

        const initialCount = result.current.medications.length;

        act(() => {
          result.current.addMedication(createMockMedication({ name: 'Med 1' }));
          result.current.addMedication(createMockMedication({ name: 'Med 2' }));
          result.current.addMedication(createMockMedication({ name: 'Med 3' }));
        });

        expect(result.current.medications).toHaveLength(initialCount + 3);
      });
    });
  });
});
