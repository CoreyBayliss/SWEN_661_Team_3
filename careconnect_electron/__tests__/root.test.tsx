import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Root } from '@/components/Root';
import { AppProvider } from '@/context/AppContext';
import { MemoryRouter } from 'react-router-dom';

// Mock child components
jest.mock('@/components/TodayView', () => ({
  TodayView: () => <div data-testid="today-view">Today View</div>
}));
jest.mock('@/components/MedicationList', () => ({
  MedicationList: () => <div data-testid="medication-list">Medication List</div>
}));
jest.mock('@/components/MedicationDetail', () => ({
  MedicationDetail: () => <div data-testid="medication-detail">Medication Detail</div>
}));
jest.mock('@/components/AddMedication', () => ({
  AddMedication: () => <div data-testid="add-medication">Add Medication</div>
}));
jest.mock('@/components/RefillRequest', () => ({
  RefillRequest: () => <div data-testid="refill-request">Refill Request</div>
}));
jest.mock('@/components/Calendar', () => ({
  Calendar: () => <div data-testid="calendar">Calendar</div>
}));
jest.mock('@/components/Communications', () => ({
  Communications: () => <div data-testid="communications">Communications</div>
}));
jest.mock('@/components/Settings', () => ({
  Settings: () => <div data-testid="settings">Settings</div>
}));
jest.mock('@/components/Login', () => ({
  Login: () => <div data-testid="login">Login</div>
}));
jest.mock('@/components/DesktopTitleBar', () => ({
  DesktopTitleBar: () => <div data-testid="desktop-title-bar">Title Bar</div>
}));
jest.mock('@/components/MenuBar', () => ({
  MenuBar: ({ onToggleSidePanel }: any) => (
    <div data-testid="menu-bar">
      <button onClick={onToggleSidePanel}>Toggle Panel</button>
    </div>
  )
}));
jest.mock('@/components/Toolbar', () => ({
  Toolbar: ({ onToggleSidePanel }: any) => (
    <div data-testid="toolbar">
      <button onClick={onToggleSidePanel}>Toggle Panel</button>
    </div>
  )
}));
jest.mock('@/components/SidePanel', () => ({
  SidePanel: ({ isOpen, onClose }: any) => 
    isOpen ? <div data-testid="side-panel">Side Panel <button onClick={onClose}>Close</button></div> : null
}));
jest.mock('@/components/CommandPalette', () => ({
  CommandPalette: ({ isOpen, onClose }: any) => 
    isOpen ? <div data-testid="command-palette">Command Palette <button onClick={onClose}>Close</button></div> : null
}));
jest.mock('@/components/StatusBar', () => ({
  StatusBar: () => <div data-testid="status-bar">Status Bar</div>
}));
jest.mock('@/components/KeyboardShortcutsHelp', () => ({
  KeyboardShortcutsHelp: ({ isOpen, onClose }: any) => 
    isOpen ? <div data-testid="shortcuts-help">Shortcuts Help <button onClick={onClose}>Close</button></div> : null
}));
jest.mock('@/hooks/useKeyboardShortcuts', () => ({
  useKeyboardShortcuts: jest.fn(),
  SHORTCUTS: {
    DASHBOARD: { key: '1', ctrl: true },
    MEDICATIONS: { key: '2', ctrl: true },
    CALENDAR: { key: '3', ctrl: true },
    MESSAGES: { key: '4', ctrl: true },
    SETTINGS: { key: '5', ctrl: true },
    TOGGLE_LEFT_HAND: { key: 'l', ctrl: true, shift: true }
  }
}));

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  }
}));

describe('Root Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render login when not authenticated', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('should render login by default', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </MemoryRouter>
    );

    // By default, not authenticated, so should show login
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('should render Root component structure', () => {
    render(
      <MemoryRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </MemoryRouter>
    );

    // Root should always render something
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });
});
