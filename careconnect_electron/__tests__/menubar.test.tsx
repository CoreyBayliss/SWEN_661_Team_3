import { render, screen, fireEvent } from '@testing-library/react';
import { MenuBar } from '@/components/MenuBar';
import { AppProvider } from '@/context/AppContext';
import { MemoryRouter } from 'react-router-dom';

// Mock toast
jest.mock('sonner', () => ({
  toast: {
    success: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
  }
}));

describe('MenuBar Component', () => {
  const mockOnToggleSidePanel = jest.fn();
  const mockOnOpenShortcuts = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderMenuBar = (sidePanelOpen = true) => {
    return render(
      <MemoryRouter>
        <AppProvider>
          <MenuBar 
            onToggleSidePanel={mockOnToggleSidePanel}
            sidePanelOpen={sidePanelOpen}
            onOpenShortcuts={mockOnOpenShortcuts}
          />
        </AppProvider>
      </MemoryRouter>
    );
  };

  it('should render all menu triggers', () => {
    renderMenuBar();
    
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Navigate')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });

  it('should open File menu and show menu items', () => {
    renderMenuBar();
    
    const fileMenu = screen.getByText('File');
    fireEvent.click(fileMenu);
    
    expect(screen.getByText('New Medication')).toBeInTheDocument();
    expect(screen.getByText('Export Data...')).toBeInTheDocument();
    expect(screen.getByText('Import Data...')).toBeInTheDocument();
    expect(screen.getByText('Print...')).toBeInTheDocument();
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });

  it('should open Edit menu and show menu items', () => {
    renderMenuBar();
    
    const editMenu = screen.getByText('Edit');
    fireEvent.click(editMenu);
    
    expect(screen.getByText('Undo')).toBeInTheDocument();
    expect(screen.getByText('Redo')).toBeInTheDocument();
    expect(screen.getByText('Copy')).toBeInTheDocument();
    expect(screen.getByText('Paste')).toBeInTheDocument();
    expect(screen.getByText('Find')).toBeInTheDocument();
  });

  it('should open View menu and show menu items', () => {
    renderMenuBar();
    
    const viewMenu = screen.getByText('View');
    fireEvent.click(viewMenu);
    
    expect(screen.getByText('Refresh')).toBeInTheDocument();
    expect(screen.getByText('Full Screen')).toBeInTheDocument();
  });

  it('should open Navigate menu and show menu items', () => {
    renderMenuBar();
    
    const navigateMenu = screen.getByText('Navigate');
    fireEvent.click(navigateMenu);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Medications')).toBeInTheDocument();
    expect(screen.getByText('Calendar')).toBeInTheDocument();
    expect(screen.getByText('Messages')).toBeInTheDocument();
  });

  it('should open Help menu and show menu items', () => {
    renderMenuBar();
    
    const helpMenu = screen.getByText('Help');
    fireEvent.click(helpMenu);
    
    expect(screen.getByText('Documentation')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('should trigger print when Print menu item is clicked', () => {
    const originalPrint = window.print;
    window.print = jest.fn();
    
    renderMenuBar();
    
    const fileMenu = screen.getByText('File');
    fireEvent.click(fileMenu);
    
    const printItem = screen.getByText('Print...');
    fireEvent.click(printItem);
    
    expect(window.print).toHaveBeenCalled();
    
    window.print = originalPrint;
  });

  it('should show keyboard shortcuts in menu items', () => {
    renderMenuBar();
    
    const fileMenu = screen.getByText('File');
    fireEvent.click(fileMenu);
    
    // Check for shortcut text
    expect(screen.getByText('Ctrl+N')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+E')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+I')).toBeInTheDocument();
    expect(screen.getByText('Ctrl+P')).toBeInTheDocument();
  });

  it('should render menubar component', () => {
    const { container } = renderMenuBar();
    
    // Check that menubar renders with menu items
    const menubar = container.querySelector('[role="menubar"]');
    expect(menubar).toBeInTheDocument();
  });

  it('should show File menu trigger with icon', () => {
    renderMenuBar();
    
    const fileTrigger = screen.getByText('File').closest('button');
    expect(fileTrigger?.querySelector('svg')).toBeInTheDocument();
  });

  it('should handle menu interactions', () => {
    renderMenuBar();
    
    // All top-level menus should be present
    expect(screen.getByText('File')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('View')).toBeInTheDocument();
    expect(screen.getByText('Help')).toBeInTheDocument();
  });
});
