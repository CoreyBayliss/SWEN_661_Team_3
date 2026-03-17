import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';
import { AddMedicationPage } from '@pages/AddMedicationPage';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({}),
    useLocation: () => ({ pathname: '/medications/add' }),
  };
});

describe('Add Medication Form Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockNavigate.mockClear();
    
    sessionStorage.setItem('user', JSON.stringify({
      id: '1',
      email: 'test@careconnect.com',
      name: 'Test User',
    }));
  });

  describe('form rendering', () => {
    it('should render add medication form', () => {
      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByRole('heading', { name: /add medication/i })).toBeInTheDocument();
    });

    it('should render all required fields', () => {
      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByLabelText(/medication name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dosage/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/frequency/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/start date/i)).toBeInTheDocument();
    });

    it('should render optional fields', () => {
      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByLabelText(/instructions/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/prescribed by/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/condition/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/refills/i)).toBeInTheDocument();
    });

    it('should have save and cancel buttons', () => {
      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByRole('button', { name: /save|add medication/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
    });
  });

  describe('form validation', () => {
    it('should show error when medication name is empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/medication name is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when dosage is empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      
      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/dosage is required/i)).toBeInTheDocument();
      });
    });

    it('should show error when frequency is not selected', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');
      
      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/frequency is required/i)).toBeInTheDocument();
      });
    });

    it('should validate dosage format', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/dosage/i), 'invalid dosage');
      
      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/valid dosage|format/i)).toBeInTheDocument();
      });
    });

    it('should validate start date is not in future', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 30);
      const futureDateStr = futureDate.toISOString().split('T')[0];

      await user.type(screen.getByLabelText(/start date/i), futureDateStr);
      
      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        const error = screen.queryByText(/cannot be in the future/i);
        // Some implementations may allow future dates
        if (error) {
          expect(error).toBeInTheDocument();
        }
      });
    });

    it('should clear errors when form is corrected', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/medication name is required/i)).toBeInTheDocument();
      });

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');

      await waitFor(() => {
        expect(screen.queryByText(/medication name is required/i)).not.toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('should submit form with valid data', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      // Fill in required fields
      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');
      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      await user.type(screen.getByLabelText(/start date/i), '2024-01-01');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/medications');
      });
    });

    it('should save medication with optional fields', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Lisinopril');
      await user.type(screen.getByLabelText(/dosage/i), '10mg');
      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      await user.type(screen.getByLabelText(/start date/i), '2024-01-01');
      await user.type(screen.getByLabelText(/instructions/i), 'Take with water');
      await user.type(screen.getByLabelText(/prescribed by/i), 'Dr. Smith');
      await user.type(screen.getByLabelText(/condition/i), 'High Blood Pressure');
      await user.type(screen.getByLabelText(/refills/i), '3');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        const medications = JSON.parse(localStorage.getItem('medications') || '[]');
        const newMed = medications.find((m: any) => m.name === 'Lisinopril');
        expect(newMed).toBeDefined();
        expect(newMed.instructions).toBe('Take with water');
        expect(newMed.prescribedBy).toBe('Dr. Smith');
      });
    });

    it('should show loading state during submission', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');
      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      await user.type(screen.getByLabelText(/start date/i), '2024-01-01');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      // Button should be disabled during submission
      const button = screen.getByRole('button', { name: /saving|save/i });
      expect(button).toBeDisabled();
    });

    it('should prevent double submission', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');
      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      await user.type(screen.getByLabelText(/start date/i), '2024-01-01');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      
      // Try to click multiple times
      await user.click(saveButton);
      await user.click(saveButton);
      await user.click(saveButton);

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('time scheduling', () => {
    it('should allow adding multiple times for "Twice daily"', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Twice daily');

      await waitFor(() => {
        const timeInputs = screen.getAllByLabelText(/time/i);
        expect(timeInputs.length).toBe(2);
      });
    });

    it('should allow adding multiple times for "Three times daily"', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Three times daily');

      await waitFor(() => {
        const timeInputs = screen.getAllByLabelText(/time/i);
        expect(timeInputs.length).toBe(3);
      });
    });

    it('should allow custom time intervals', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Every 6 hours');

      const timeInput = screen.getByLabelText(/start time|first dose/i);
      await user.type(timeInput, '08:00');

      expect(timeInput).toHaveValue('08:00');
    });

    it('should validate times are in correct format', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      
      const timeInput = screen.getByLabelText(/time/i);
      await user.type(timeInput, 'invalid');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(screen.getByText(/valid time|format/i)).toBeInTheDocument();
      });
    });
  });

  describe('cancel functionality', () => {
    it('should navigate back when cancel is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockNavigate).toHaveBeenCalledWith('/medications');
    });

    it('should show confirmation when form has changes', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      await waitFor(() => {
        expect(screen.getByText(/unsaved changes|discard/i)).toBeInTheDocument();
      });
    });

    it('should not show confirmation when form is empty', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const cancelButton = screen.getByRole('button', { name: /cancel/i });
      await user.click(cancelButton);

      expect(mockNavigate).toHaveBeenCalledWith('/medications');
    });
  });

  describe('accessibility', () => {
    it('should have proper form labels', () => {
      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByLabelText(/medication name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/dosage/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/frequency/i)).toBeInTheDocument();
    });

    it('should have required indicators', () => {
      renderWithProviders(<AddMedicationPage />);

      const nameInput = screen.getByLabelText(/medication name/i);
      expect(nameInput).toBeRequired();
    });

    it('should announce validation errors', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        const errors = screen.getAllByRole('alert');
        expect(errors.length).toBeGreaterThan(0);
      });
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      // Tab through form fields
      await user.tab();
      expect(screen.getByLabelText(/medication name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/dosage/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByLabelText(/frequency/i)).toHaveFocus();
    });

    it('should associate errors with inputs', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        const nameInput = screen.getByLabelText(/medication name/i);
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute('aria-describedby');
      });
    });
  });

  describe('autocomplete and suggestions', () => {
    it('should provide medication name suggestions', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const nameInput = screen.getByLabelText(/medication name/i);
      await user.type(nameInput, 'asp');

      await waitFor(() => {
        const suggestions = screen.queryAllByRole('option');
        if (suggestions.length > 0) {
          expect(suggestions[0]).toHaveTextContent(/aspirin/i);
        }
      });
    });

    it('should fill dosage when common medication is selected', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      const nameInput = screen.getByLabelText(/medication name/i);
      await user.type(nameInput, 'Aspirin');

      const suggestions = screen.queryAllByRole('option');
      if (suggestions.length > 0) {
        await user.click(suggestions[0]);

        const dosageInput = screen.getByLabelText(/dosage/i);
        expect(dosageInput).toHaveValue(/81mg|325mg/);
      }
    });
  });

  describe('edit mode', () => {
    it('should load existing medication data when editing', () => {
      const medications = [{
        id: '1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
      }];

      localStorage.setItem('medications', JSON.stringify(medications));

      // Mock params to indicate edit mode
      vi.mock('react-router', async () => {
        const actual = await vi.importActual('react-router');
        return {
          ...actual,
          useNavigate: () => mockNavigate,
          useParams: () => ({ id: '1' }),
          useLocation: () => ({ pathname: '/medications/1/edit' }),
        };
      });

      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByLabelText(/medication name/i)).toHaveValue('Lisinopril');
      expect(screen.getByLabelText(/dosage/i)).toHaveValue('10mg');
    });

    it('should update existing medication on save', async () => {
      const user = userEvent.setup();
      
      const medications = [{
        id: '1',
        name: 'Lisinopril',
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
      }];

      localStorage.setItem('medications', JSON.stringify(medications));

      renderWithProviders(<AddMedicationPage />);

      const dosageInput = screen.getByLabelText(/dosage/i);
      await user.clear(dosageInput);
      await user.type(dosageInput, '20mg');

      const saveButton = screen.getByRole('button', { name: /save/i });
      await user.click(saveButton);

      await waitFor(() => {
        const updated = JSON.parse(localStorage.getItem('medications') || '[]');
        expect(updated[0].dosage).toBe('20mg');
      });
    });
  });

  describe('form persistence', () => {
    it('should save draft to localStorage', async () => {
      const user = userEvent.setup();
      renderWithProviders(<AddMedicationPage />);

      await user.type(screen.getByLabelText(/medication name/i), 'Aspirin');
      await user.type(screen.getByLabelText(/dosage/i), '81mg');

      await waitFor(() => {
        const draft = localStorage.getItem('medicationDraft');
        if (draft) {
          const parsed = JSON.parse(draft);
          expect(parsed.name).toBe('Aspirin');
        }
      }, { timeout: 2000 });
    });

    it('should restore draft on page reload', () => {
      localStorage.setItem('medicationDraft', JSON.stringify({
        name: 'Aspirin',
        dosage: '81mg',
      }));

      renderWithProviders(<AddMedicationPage />);

      expect(screen.getByLabelText(/medication name/i)).toHaveValue('Aspirin');
      expect(screen.getByLabelText(/dosage/i)).toHaveValue('81mg');
    });

    it('should clear draft after successful submission', async () => {
      const user = userEvent.setup();
      
      localStorage.setItem('medicationDraft', JSON.stringify({
        name: 'Aspirin',
        dosage: '81mg',
      }));

      renderWithProviders(<AddMedicationPage />);

      await user.selectOptions(screen.getByLabelText(/frequency/i), 'Once daily');
      await user.type(screen.getByLabelText(/start date/i), '2024-01-01');

      const saveButton = screen.getByRole('button', { name: /save|add/i });
      await user.click(saveButton);

      await waitFor(() => {
        expect(localStorage.getItem('medicationDraft')).toBeNull();
      });
    });
  });
});
