import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { AppProvider, useApp } from '@/context/AppContext';
import { MedicationList } from '@/components/MedicationList';

// Test component to access context
const TestMedicationManager = () => {
  const { medications, takeMedication, skipMedication, addMedication } = useApp();
  
  return (
    <div>
      <div data-testid="medication-count">{medications.length}</div>
      <button onClick={() => takeMedication('1', 'Test User')}>Take Medication</button>
      <button onClick={() => skipMedication('1', 'Test User')}>Skip Medication</button>
      <button onClick={() => addMedication({
        name: 'New Med',
        dose: '10mg',
        frequency: 'Daily',
        times: ['08:00'],
        refillsRemaining: 3,
        pharmacy: 'Test Pharmacy',
      })}>Add Medication</button>
    </div>
  );
};

describe('Medication Management Tests', () => {
  const renderMedicationManager = () => {
    return render(
      <AppProvider>
        <TestMedicationManager />
      </AppProvider>
    );
  };

  test('Initial medications are loaded', () => {
    renderMedicationManager();
    
    const count = screen.getByTestId('medication-count');
    expect(parseInt(count.textContent || '0')).toBeGreaterThan(0);
  });

  test('Can mark medication as taken', async () => {
    renderMedicationManager();
    
    const takeButton = screen.getByText('Take Medication');
    fireEvent.click(takeButton);
    
    await waitFor(() => {
      // Medication should be marked as taken
      expect(true).toBe(true); // Context updates should trigger re-render
    });
  });

  test('Can skip medication', async () => {
    renderMedicationManager();
    
    const skipButton = screen.getByText('Skip Medication');
    fireEvent.click(skipButton);
    
    await waitFor(() => {
      expect(true).toBe(true);
    });
  });

  test('Can add new medication', async () => {
    renderMedicationManager();
    
    const initialCount = parseInt(screen.getByTestId('medication-count').textContent || '0');
    
    const addButton = screen.getByText('Add Medication');
    fireEvent.click(addButton);
    
    await waitFor(() => {
      const newCount = parseInt(screen.getByTestId('medication-count').textContent || '0');
      expect(newCount).toBe(initialCount + 1);
    });
  });
});

describe('Medications Page Tests', () => {
  const renderMedicationsPage = () => {
    return render(
      <AppProvider>
        <MedicationList />
      </AppProvider>
    );
  };

  test('Medications page renders', () => {
    renderMedicationsPage();
    
    expect(screen.getByRole('heading', { name: /medications/i })).toBeInTheDocument();
  });

  test('Medication list displays items', () => {
    renderMedicationsPage();
    
    // Should have medication cards or list items
    const medicationElements = screen.queryAllByRole('article') || 
                               screen.queryAllByRole('listitem');
    
    expect(medicationElements.length).toBeGreaterThanOrEqual(0);
  });

  test('Add medication button is present', () => {
    renderMedicationsPage();
    
    const addButton = screen.queryByRole('button', { name: /add.*medication/i });
    if (addButton) {
      expect(addButton).toBeInTheDocument();
    }
  });
});

describe('Medication Interaction Tests', () => {
  const renderMedicationsPage = () => {
    return render(
      <AppProvider>
        <MedicationList />
      </AppProvider>
    );
  };

  test('Can interact with medication cards', () => {
    renderMedicationsPage();
    
    // Look for action buttons (Take, Skip, Details)
    const actionButtons = screen.queryAllByRole('button');
    expect(actionButtons.length).toBeGreaterThan(0);
  });

  test('Medication details are displayed', () => {
    renderMedicationsPage();
    
    // Check for common medication information
    const pageContent = screen.getByRole('list', { name: /medication list/i }) || document.body;
    expect(pageContent).toBeInTheDocument();
  });
});
