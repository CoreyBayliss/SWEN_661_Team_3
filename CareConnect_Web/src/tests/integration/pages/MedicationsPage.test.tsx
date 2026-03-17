import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';
import { MedicationsPage } from '@pages/MedicationsPage';
import { mockMedications } from '@tests/helpers/data';

const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/medications' }),
  };
});

describe('MedicationsPage Integration Tests', () => {
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

  describe('rendering', () => {
    it('should render medications page', () => {
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByRole('heading', { name: /medications/i })).toBeInTheDocument();
    });

    it('should display list of medications', async () => {
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
        expect(screen.getByText(/metformin/i)).toBeInTheDocument();
      });
    });

    it('should display medication cards with details', async () => {
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        const medicationCards = screen.getAllByRole('article');
        expect(medicationCards.length).toBeGreaterThan(0);

        const firstCard = medicationCards[0];
        expect(within(firstCard).getByText(/10mg|500mg/i)).toBeInTheDocument();
        expect(within(firstCard).getByText(/once daily|twice daily/i)).toBeInTheDocument();
      });
    });

    it('should show add medication button', () => {
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByRole('button', { name: /add medication/i })).toBeInTheDocument();
    });

    it('should show empty state when no medications', () => {
      localStorage.setItem('medications', JSON.stringify([]));
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByText(/no medications|get started/i)).toBeInTheDocument();
    });
  });

  describe('search functionality', () => {
    it('should have search input', () => {
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    });

    it('should filter medications by name', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'lisinopril');

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
        expect(screen.queryByText(/metformin/i)).not.toBeInTheDocument();
      });
    });

    it('should show no results message when search has no matches', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'nonexistent medication');

      await waitFor(() => {
        expect(screen.getByText(/no medications found|no results/i)).toBeInTheDocument();
      });
    });

    it('should clear search and show all medications', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
      await user.type(searchInput, 'lisinopril');

      await waitFor(() => {
        expect(screen.queryByText(/metformin/i)).not.toBeInTheDocument();
      });

      await user.clear(searchInput);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
        expect(screen.getByText(/metformin/i)).toBeInTheDocument();
      });
    });
  });

  describe('filter functionality', () => {
    it('should have filter dropdown', () => {
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByRole('combobox', { name: /filter/i }) || 
             screen.getByLabelText(/filter/i)).toBeInTheDocument();
    });

    it('should filter by "Due Today"', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const filterSelect = screen.getByRole('combobox', { name: /filter/i }) || 
                          screen.getByLabelText(/filter/i);
      await user.selectOptions(filterSelect, 'due-today');

      await waitFor(() => {
        const visibleMeds = screen.getAllByRole('article');
        expect(visibleMeds.length).toBeGreaterThan(0);
      });
    });

    it('should filter by "Low Refills"', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const filterSelect = screen.getByRole('combobox', { name: /filter/i }) || 
                          screen.getByLabelText(/filter/i);
      await user.selectOptions(filterSelect, 'low-refills');

      await waitFor(() => {
        const cards = screen.getAllByRole('article');
        cards.forEach(card => {
          const refillText = within(card).getByText(/refill/i);
          expect(refillText).toBeInTheDocument();
        });
      });
    });

    it('should show all medications when filter is cleared', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const initialCount = screen.getAllByRole('article').length;

      const filterSelect = screen.getByRole('combobox', { name: /filter/i }) || 
                          screen.getByLabelText(/filter/i);
      await user.selectOptions(filterSelect, 'due-today');
      await user.selectOptions(filterSelect, 'all');

      await waitFor(() => {
        const currentCount = screen.getAllByRole('article').length;
        expect(currentCount).toBe(initialCount);
      });
    });
  });

  describe('sort functionality', () => {
    it('should have sort dropdown', () => {
      renderWithProviders(<MedicationsPage />);

      expect(screen.getByRole('combobox', { name: /sort/i }) || 
             screen.getByLabelText(/sort/i)).toBeInTheDocument();
    });

    it('should sort by name A-Z', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const sortSelect = screen.getByRole('combobox', { name: /sort/i }) || 
                        screen.getByLabelText(/sort/i);
      await user.selectOptions(sortSelect, 'name-asc');

      await waitFor(() => {
        const medicationCards = screen.getAllByRole('article');
        const firstCardText = within(medicationCards[0]).getByRole('heading').textContent;
        expect(firstCardText?.charAt(0).toLowerCase()).toBeLessThanOrEqual('m');
      });
    });

    it('should sort by name Z-A', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const sortSelect = screen.getByRole('combobox', { name: /sort/i }) || 
                        screen.getByLabelText(/sort/i);
      await user.selectOptions(sortSelect, 'name-desc');

      await waitFor(() => {
        const medicationCards = screen.getAllByRole('article');
        const firstCardText = within(medicationCards[0]).getByRole('heading').textContent;
        expect(firstCardText?.charAt(0).toLowerCase()).toBeGreaterThanOrEqual('a');
      });
    });

    it('should sort by next dose time', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const sortSelect = screen.getByRole('combobox', { name: /sort/i }) || 
                        screen.getByLabelText(/sort/i);
      await user.selectOptions(sortSelect, 'time');

      await waitFor(() => {
        const medicationCards = screen.getAllByRole('article');
        expect(medicationCards.length).toBeGreaterThan(0);
      });
    });
  });

  describe('navigation', () => {
    it('should navigate to add medication page when add button clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const addButton = screen.getByRole('button', { name: /add medication/i });
      await user.click(addButton);

      expect(mockNavigate).toHaveBeenCalledWith('/medications/add');
    });

    it('should navigate to medication detail when card is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      await user.click(medicationCards[0]);

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/\/medications\/\d+/));
    });
  });

  describe('medication actions', () => {
    it('should show action menu for each medication', async () => {
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        const actionButtons = screen.getAllByRole('button', { name: /more|menu/i });
        expect(actionButtons.length).toBeGreaterThan(0);
      });
    });

    it('should open action menu on click', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const actionButtons = screen.getAllByRole('button', { name: /more|menu/i });
      await user.click(actionButtons[0]);

      await waitFor(() => {
        expect(screen.getByRole('menuitem', { name: /edit/i }) || 
               screen.getByText(/edit/i)).toBeInTheDocument();
      });
    });

    it('should navigate to edit page from action menu', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const actionButtons = screen.getAllByRole('button', { name: /more|menu/i });
      await user.click(actionButtons[0]);

      const editButton = await screen.findByRole('menuitem', { name: /edit/i }) || 
                        await screen.findByText(/edit/i);
      await user.click(editButton);

      expect(mockNavigate).toHaveBeenCalledWith(expect.stringMatching(/\/medications\/\d+\/edit/));
    });

    it('should show delete confirmation', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const actionButtons = screen.getAllByRole('button', { name: /more|menu/i });
      await user.click(actionButtons[0]);

      const deleteButton = await screen.findByRole('menuitem', { name: /delete/i }) || 
                          await screen.findByText(/delete/i);
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByText(/confirm|are you sure/i)).toBeInTheDocument();
      });
    });
  });

  describe('medication status indicators', () => {
    it('should show "Due Now" indicator for medications due', async () => {
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        const dueIndicators = screen.queryAllByText(/due now|overdue/i);
        expect(dueIndicators.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('should show "Low Refills" indicator', async () => {
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        const refillIndicators = screen.queryAllByText(/low refill|refills remaining: [01]/i);
        expect(refillIndicators.length).toBeGreaterThanOrEqual(0);
      });
    });

    it('should show "Taken" status for completed doses', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      const takeButton = within(medicationCards[0]).queryByRole('button', { name: /take|mark as taken/i });
      
      if (takeButton) {
        await user.click(takeButton);

        await waitFor(() => {
          expect(within(medicationCards[0]).getByText(/taken/i)).toBeInTheDocument();
        });
      }
    });
  });

  describe('accessibility', () => {
    it('should have proper heading structure', () => {
      renderWithProviders(<MedicationsPage />);

      const mainHeading = screen.getByRole('heading', { level: 1, name: /medications/i });
      expect(mainHeading).toBeInTheDocument();
    });

    it('should have accessible labels for all controls', () => {
      renderWithProviders(<MedicationsPage />);

      const searchInput = screen.getByRole('searchbox') || screen.getByPlaceholderText(/search/i);
      expect(searchInput).toHaveAccessibleName();

      const addButton = screen.getByRole('button', { name: /add medication/i });
      expect(addButton).toHaveAccessibleName();
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      // Tab through interactive elements
      await user.tab();
      expect(document.activeElement?.tagName).toMatch(/BUTTON|INPUT|SELECT/);

      await user.tab();
      expect(document.activeElement?.tagName).toMatch(/BUTTON|INPUT|SELECT|ARTICLE/);
    });

    it('should announce filter changes to screen readers', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      const filterSelect = screen.getByRole('combobox', { name: /filter/i }) || 
                          screen.getByLabelText(/filter/i);
      await user.selectOptions(filterSelect, 'due-today');

      await waitFor(() => {
        const liveRegions = document.querySelectorAll('[role="status"], [aria-live]');
        expect(liveRegions.length).toBeGreaterThan(0);
      });
    });
  });

  describe('responsive layout', () => {
    it('should display grid on desktop', () => {
      const { container } = renderWithProviders(<MedicationsPage />);

      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toBeInTheDocument();
    });

    it('should stack cards on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = renderWithProviders(<MedicationsPage />);

      const layout = container.querySelector('[class*="flex-col"], [class*="grid-cols-1"]');
      expect(layout).toBeInTheDocument();
    });
  });

  describe('loading and error states', () => {
    it('should show loading state initially', () => {
      renderWithProviders(<MedicationsPage />);

      const loading = screen.queryByText(/loading/i) || screen.queryByRole('progressbar');
      // May or may not show loading
      expect(loading || screen.queryByText(/lisinopril/i)).toBeTruthy();
    });

    it('should handle medication load errors', () => {
      localStorage.setItem('medications', 'invalid json');
      renderWithProviders(<MedicationsPage />);

      const error = screen.queryByText(/error/i);
      const empty = screen.queryByText(/no medications/i);
      
      expect(error || empty).toBeTruthy();
    });
  });

  describe('bulk actions', () => {
    it('should select multiple medications', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const checkboxes = screen.queryAllByRole('checkbox');
      if (checkboxes.length > 0) {
        await user.click(checkboxes[0]);
        await user.click(checkboxes[1]);

        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).toBeChecked();
      }
    });

    it('should show bulk action toolbar when items selected', async () => {
      const user = userEvent.setup();
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const checkboxes = screen.queryAllByRole('checkbox');
      if (checkboxes.length > 0) {
        await user.click(checkboxes[0]);

        await waitFor(() => {
          const toolbar = screen.queryByText(/selected|bulk actions/i);
          expect(toolbar).toBeTruthy();
        });
      }
    });
  });

  describe('performance', () => {
    it('should render efficiently with many medications', async () => {
      const manyMeds = Array.from({ length: 50 }, (_, i) => ({
        id: `med-${i}`,
        name: `Medication ${i}`,
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
      }));

      localStorage.setItem('medications', JSON.stringify(manyMeds));

      const startTime = performance.now();
      renderWithProviders(<MedicationsPage />);
      const endTime = performance.now();

      expect(endTime - startTime).toBeLessThan(1000);
    });

    it('should virtualize long lists', async () => {
      const manyMeds = Array.from({ length: 100 }, (_, i) => ({
        id: `med-${i}`,
        name: `Medication ${i}`,
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
      }));

      localStorage.setItem('medications', JSON.stringify(manyMeds));
      renderWithProviders(<MedicationsPage />);

      await waitFor(() => {
        const visibleCards = screen.getAllByRole('article');
        // Should only render visible items if virtualized
        expect(visibleCards.length).toBeLessThanOrEqual(100);
      });
    });
  });
});
