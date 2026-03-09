import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AddMedication } from '@/components/AddMedication';
import { CommandPalette } from '@/components/CommandPalette';
import { Communications } from '@/components/Communications';
import { ContextMenu } from '@/components/ContextMenu';
import { DesktopNotification, NotificationContainer } from '@/components/DesktopNotification';
import { KeyboardShortcutsHelp } from '@/components/KeyboardShortcutsHelp';
import { KeyboardShortcutsModal } from '@/components/KeyboardShortcutsModal';
import { MedicationDetail } from '@/components/MedicationDetail';
import { MenuBar } from '@/components/MenuBar';
import { MobileKeyboard } from '@/components/MobileKeyboard';
import { RefillRequest } from '@/components/RefillRequest';
import { Settings } from '@/components/Settings';
import { SidePanel } from '@/components/SidePanel';
import { StatusBar } from '@/components/StatusBar';
import { TodayView } from '@/components/TodayView';
import { Toolbar } from '@/components/Toolbar';

const mockUseApp = jest.fn();

jest.mock('@/context/AppContext', () => ({
  useApp: () => mockUseApp(),
}));

jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
    error: jest.fn(),
  },
}));

describe('component smoke renders', () => {
  beforeEach(() => {
    mockUseApp.mockReturnValue({
      isAuthenticated: true,
      medications: [
        {
          id: '1',
          name: 'Lisinopril',
          dose: '10mg',
          frequency: 'Once daily',
          times: ['09:00'],
          refillsRemaining: 2,
          pharmacy: 'CVS',
          history: [],
        },
      ],
      addMedication: jest.fn(),
      takeMedication: jest.fn(),
      skipMedication: jest.fn(),
      undoLastAction: jest.fn(),
      appointments: [
        {
          id: '1',
          title: 'Checkup',
          date: '2026-03-10',
          time: '10:00',
          location: 'Clinic',
          provider: 'Dr. Smith',
        },
      ],
      addAppointment: jest.fn(),
      messageTemplates: [
        { id: '1', text: 'Running late', category: 'appointment' },
      ],
      contacts: [
        { id: '1', name: 'Dr. Smith', role: 'Primary Care', phone: '555-0001' },
      ],
      favorites: ['/today'],
      toggleFavorite: jest.fn(),
      login: jest.fn(),
      logout: jest.fn(),
      currentPath: '/today',
      navigate: jest.fn(),
      notificationsEnabled: true,
      setNotificationsEnabled: jest.fn(),
      leftHandMode: false,
      setLeftHandMode: jest.fn(),
    });

    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    Object.defineProperty(window, 'ResizeObserver', {
      writable: true,
      value: class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    });
  });

  it('renders major desktop components without crashing', () => {
    render(
      <MemoryRouter>
        <div>
          <TodayView />
          <MedicationDetail />
          <AddMedication />
          <RefillRequest />
          <Communications />
          <Settings />
          <Toolbar onToggleSidePanel={jest.fn()} sidePanelOpen={false} />
          <StatusBar currentUser="Patient" />
          <SidePanel isOpen={true} onClose={jest.fn()} />
          <MenuBar onToggleSidePanel={jest.fn()} sidePanelOpen={false} onOpenShortcuts={jest.fn()} />
          <CommandPalette isOpen={true} onClose={jest.fn()} onNavigate={jest.fn()} />
          <ContextMenu
            position={{ x: 10, y: 10 }}
            onClose={jest.fn()}
            items={[{ label: 'Edit', onClick: jest.fn() }, { label: 'Delete', onClick: jest.fn(), danger: true }]}
          />
          <DesktopNotification id="n1" title="Reminder" message="Take medication" type="info" onClose={jest.fn()} />
          <NotificationContainer
            notifications={[{ id: 'n2', title: 'Alert', message: 'Refill due', type: 'warning' }]}
            onRemove={jest.fn()}
          />
          <KeyboardShortcutsHelp isOpen={true} onClose={jest.fn()} />
          <KeyboardShortcutsModal isOpen={true} onClose={jest.fn()} />
          <MobileKeyboard isVisible={true} onClose={jest.fn()} onKeyPress={jest.fn()} />
        </div>
      </MemoryRouter>
    );

    expect(screen.getAllByText(/Lisinopril/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Settings/i).length).toBeGreaterThan(0);
  });
});
