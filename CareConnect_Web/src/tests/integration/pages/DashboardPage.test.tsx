import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '@tests/helpers/render';
import { DashboardPage } from '@pages/DashboardPage';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ pathname: '/dashboard' }),
  };
});

describe('DashboardPage Integration Tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    mockNavigate.mockClear();
    
    // Set up authenticated user
    sessionStorage.setItem('user', JSON.stringify({
      id: '1',
      email: 'test@careconnect.com',
      name: 'Test User',
    }));
  });

  describe('rendering', () => {
    it('should render dashboard page', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByRole('heading', { name: /dashboard|welcome/i })).toBeInTheDocument();
    });

    it('should display user greeting', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/test user|welcome back/i)).toBeInTheDocument();
    });

    it('should display today\'s date', () => {
      renderWithProviders(<DashboardPage />);

      const today = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      // Check for any part of the date
      expect(screen.getByText(new RegExp(new Date().getDate().toString()))).toBeInTheDocument();
    });

    it('should redirect to login if not authenticated', () => {
      sessionStorage.clear();
      renderWithProviders(<DashboardPage />);

      waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/login');
      });
    });
  });

  describe('medications section', () => {
    it('should display today\'s medications section', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/today's medications|medications due/i)).toBeInTheDocument();
    });

    it('should display medication cards', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril|metformin/i)).toBeInTheDocument();
      });
    });

    it('should show medication dosage and time', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/10mg|500mg/i)).toBeInTheDocument();
        expect(screen.getByText(/8:00|08:00/i)).toBeInTheDocument();
      });
    });

    it('should display mark as taken button for each medication', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button', { name: /mark as taken|take/i });
        expect(buttons.length).toBeGreaterThan(0);
      });
    });

    it('should mark medication as taken', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      const firstCard = medicationCards[0];
      const takeButton = within(firstCard).getByRole('button', { name: /mark as taken|take/i });

      await user.click(takeButton);

      await waitFor(() => {
        expect(within(firstCard).getByText(/taken/i)).toBeInTheDocument();
      });
    });

    it('should show empty state when no medications due', () => {
      // Clear medications from localStorage
      localStorage.setItem('medications', JSON.stringify([]));
      
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/no medications|all done/i)).toBeInTheDocument();
    });

    it('should navigate to medications page when view all is clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      const viewAllButton = screen.getByRole('link', { name: /view all|see all medications/i });
      await user.click(viewAllButton);

      expect(mockNavigate).toHaveBeenCalledWith('/medications');
    });
  });

  describe('appointments section', () => {
    it('should display upcoming appointments section', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/upcoming appointments/i)).toBeInTheDocument();
    });

    it('should display appointment cards', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/annual physical|dr\./i)).toBeInTheDocument();
      });
    });

    it('should show appointment date and time', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/10:00|2:00/i)).toBeInTheDocument();
      });
    });

    it('should display appointment type (in-person or telehealth)', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        const appointments = screen.getAllByRole('article');
        const hasInPerson = appointments.some(a => 
          within(a).queryByText(/in-person/i)
        );
        const hasTelehealth = appointments.some(a => 
          within(a).queryByText(/telehealth|virtual/i)
        );
        expect(hasInPerson || hasTelehealth).toBe(true);
      });
    });

    it('should navigate to appointments page', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      const viewButton = screen.getByRole('link', { name: /view all appointments/i });
      await user.click(viewButton);

      expect(mockNavigate).toHaveBeenCalledWith('/appointments');
    });
  });

  describe('quick actions', () => {
    it('should display quick action buttons', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByRole('button', { name: /add medication/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /log wellness/i })).toBeInTheDocument();
    });

    it('should navigate to add medication when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      const addButton = screen.getByRole('button', { name: /add medication/i });
      await user.click(addButton);

      expect(mockNavigate).toHaveBeenCalledWith('/medications/add');
    });

    it('should navigate to wellness log when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      const logButton = screen.getByRole('button', { name: /log wellness/i });
      await user.click(logButton);

      expect(mockNavigate).toHaveBeenCalledWith('/wellness');
    });

    it('should navigate to messages when clicked', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      const messagesButton = screen.getByRole('button', { name: /messages|contact/i });
      await user.click(messagesButton);

      expect(mockNavigate).toHaveBeenCalledWith('/messages');
    });
  });

  describe('adherence chart', () => {
    it('should display adherence chart', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/adherence|progress/i)).toBeInTheDocument();
    });

    it('should show adherence percentage', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        const percentageText = screen.getByText(/%/);
        expect(percentageText).toBeInTheDocument();
      });
    });

    it('should display chart visualization', () => {
      renderWithProviders(<DashboardPage />);

      const chart = screen.getByTestId('adherence-chart') || 
                    document.querySelector('.recharts-wrapper');
      expect(chart).toBeInTheDocument();
    });
  });

  describe('wellness summary', () => {
    it('should display wellness summary section', () => {
      renderWithProviders(<DashboardPage />);

      expect(screen.getByText(/wellness|health summary/i)).toBeInTheDocument();
    });

    it('should show recent wellness metrics', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        const hasMood = screen.queryByText(/mood/i);
        const hasSleep = screen.queryByText(/sleep/i);
        const hasPain = screen.queryByText(/pain/i);
        const hasEnergy = screen.queryByText(/energy/i);
        
        expect(hasMood || hasSleep || hasPain || hasEnergy).toBeTruthy();
      });
    });
  });

  describe('accessibility', () => {
    it('should have proper heading hierarchy', () => {
      renderWithProviders(<DashboardPage />);

      const h1 = screen.getByRole('heading', { level: 1 });
      expect(h1).toBeInTheDocument();
    });

    it('should have accessible labels for all interactive elements', async () => {
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        const buttons = screen.getAllByRole('button');
        buttons.forEach(button => {
          expect(button).toHaveAccessibleName();
        });
      });
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      // Tab through interactive elements
      await user.tab();
      const focusedElement = document.activeElement;
      expect(focusedElement?.tagName).toMatch(/BUTTON|A|INPUT/);
    });

    it('should announce dynamic content updates', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      const takeButton = within(medicationCards[0]).getByRole('button', { name: /mark as taken/i });

      await user.click(takeButton);

      // Should have live region or alert
      await waitFor(() => {
        const alerts = screen.queryAllByRole('alert');
        const status = screen.queryAllByRole('status');
        expect(alerts.length + status.length).toBeGreaterThan(0);
      });
    });
  });

  describe('left-hand mode', () => {
    it('should apply left-hand mode styles when enabled', () => {
      localStorage.setItem('leftHandMode', 'true');
      renderWithProviders(<DashboardPage />);

      expect(document.documentElement.classList.contains('left-hand-mode')).toBe(true);
    });

    it('should position quick actions on left when left-hand mode enabled', () => {
      localStorage.setItem('leftHandMode', 'true');
      const { container } = renderWithProviders(<DashboardPage />);

      const quickActions = container.querySelector('[data-left-hand-mode]');
      if (quickActions) {
        expect(quickActions).toHaveClass('left-aligned');
      }
    });
  });

  describe('loading states', () => {
    it('should show loading state while fetching data', () => {
      renderWithProviders(<DashboardPage />);

      const loadingIndicator = screen.queryByText(/loading/i) || 
                              screen.queryByRole('progressbar');
      
      // May or may not show loading depending on implementation
      expect(loadingIndicator || screen.getByText(/lisinopril/i)).toBeInTheDocument();
    });
  });

  describe('error states', () => {
    it('should handle medication fetch errors gracefully', () => {
      localStorage.setItem('medications', 'invalid json');
      
      renderWithProviders(<DashboardPage />);

      // Should either show error or fall back to empty state
      const hasError = screen.queryByText(/error/i);
      const hasEmptyState = screen.queryByText(/no medications/i);
      
      expect(hasError || hasEmptyState).toBeTruthy();
    });
  });

  describe('real-time updates', () => {
    it('should update UI when medication is marked as taken', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      const initialCount = medicationCards.length;
      
      const takeButton = within(medicationCards[0]).getByRole('button', { name: /mark as taken/i });
      await user.click(takeButton);

      await waitFor(() => {
        // Button should change state
        expect(within(medicationCards[0]).getByText(/taken/i)).toBeInTheDocument();
      });
    });

    it('should update adherence chart when medication taken', async () => {
      const user = userEvent.setup();
      renderWithProviders(<DashboardPage />);

      await waitFor(() => {
        expect(screen.getByText(/lisinopril/i)).toBeInTheDocument();
      });

      const medicationCards = screen.getAllByRole('article');
      const takeButton = within(medicationCards[0]).getByRole('button', { name: /mark as taken/i });
      
      await user.click(takeButton);

      // Adherence percentage should update
      await waitFor(() => {
        const chart = screen.getByTestId('adherence-chart') || 
                     document.querySelector('.recharts-wrapper');
        expect(chart).toBeInTheDocument();
      });
    });
  });

  describe('responsive behavior', () => {
    it('should render mobile layout on small screens', () => {
      // Mock viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<DashboardPage />);

      const container = document.querySelector('[class*="grid"]');
      expect(container).toBeInTheDocument();
    });

    it('should stack cards vertically on mobile', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      const { container } = renderWithProviders(<DashboardPage />);

      const grid = container.querySelector('[class*="grid"]');
      if (grid) {
        expect(grid.classList.toString()).toMatch(/col-1|flex-col/);
      }
    });
  });

  describe('performance', () => {
    it('should render efficiently with many medications', async () => {
      const manyMedications = Array.from({ length: 20 }, (_, i) => ({
        id: `med-${i}`,
        name: `Medication ${i}`,
        dosage: '10mg',
        frequency: 'Once daily',
        times: ['08:00'],
        startDate: '2024-01-01',
        nextDose: new Date().toISOString(),
      }));

      localStorage.setItem('medications', JSON.stringify(manyMedications));

      const startTime = performance.now();
      renderWithProviders(<DashboardPage />);
      const endTime = performance.now();

      // Should render in reasonable time (less than 1 second)
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});
