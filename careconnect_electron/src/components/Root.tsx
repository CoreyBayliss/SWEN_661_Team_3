import { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Home, Pill, Calendar, MessageSquare, Settings as SettingsIcon, User, Bell } from 'lucide-react';
import { TodayView } from './TodayView';
import { MedicationList } from './MedicationList';
import { MedicationDetail } from './MedicationDetail';
import { AddMedication } from './AddMedication';
import { RefillRequest } from './RefillRequest';
import { Calendar as CalendarView } from './Calendar';
import { Communications } from './Communications';
import { Settings } from './Settings';
import { Login } from './Login';
import { DesktopTitleBar } from './DesktopTitleBar';
import { CommandPalette } from './CommandPalette';
import { StatusBar } from './StatusBar';
import { KeyboardShortcutsHelp } from './KeyboardShortcutsHelp';
import { useKeyboardShortcuts, SHORTCUTS } from '../hooks/useKeyboardShortcuts';
import { toast } from 'sonner@2.0.3';

export const Root = () => {
  const { isAuthenticated, currentPath, navigate, logout, leftHandMode, setLeftHandMode } = useApp();
  const prevPathRef = useRef<string>(currentPath);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isShortcutsHelpOpen, setIsShortcutsHelpOpen] = useState(false);

  const toggleLeftHandMode = () => {
    const newValue = !leftHandMode;
    setLeftHandMode(newValue);
    toast.success(
      newValue ? 'Left-Hand Mode enabled' : 'Left-Hand Mode disabled',
      {
        description: newValue 
          ? 'Layout mirrored for left-handed users' 
          : 'Layout restored to default',
        duration: 3000,
      }
    );
  };

  // Keyboard shortcuts for desktop navigation
  useKeyboardShortcuts([
    { ...SHORTCUTS.DASHBOARD, callback: () => navigate('/today') },
    { ...SHORTCUTS.MEDICATIONS, callback: () => navigate('/medications') },
    { ...SHORTCUTS.CALENDAR, callback: () => navigate('/calendar') },
    { ...SHORTCUTS.MESSAGES, callback: () => navigate('/communications') },
    { ...SHORTCUTS.SETTINGS, callback: () => navigate('/settings') },
    { key: 'k', ctrl: true, callback: () => setIsCommandPaletteOpen(true), description: 'Open Command Palette' },
    { key: '/', ctrl: true, callback: () => setIsShortcutsHelpOpen(true), description: 'Show keyboard shortcuts' },
    { ...SHORTCUTS.TOGGLE_LEFT_HAND, callback: toggleLeftHandMode },
  ]);

  useEffect(() => {
    if (currentPath !== prevPathRef.current) {
      const mainContent = document.querySelector('main');
      if (mainContent) {
        mainContent.scrollTo({ top: 0, behavior: 'smooth' });
      }
      prevPathRef.current = currentPath;
    }
  }, [currentPath]);

  // Show login if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <DesktopTitleBar title="CareConnect - Login" />
        <Login key="login" />
      </div>
    );
  }

  // Route rendering
  const renderRoute = () => {
    if (currentPath === '/' || currentPath === '/today') return <TodayView />;
    if (currentPath === '/medications') return <MedicationList />;
    if (currentPath === '/medications/add') return <AddMedication />;
    if (currentPath.startsWith('/medications/') && currentPath.endsWith('/refill')) return <RefillRequest />;
    if (currentPath.startsWith('/medications/')) return <MedicationDetail />;
    if (currentPath === '/calendar') return <CalendarView />;
    if (currentPath === '/communications') return <Communications />;
    if (currentPath === '/settings') return <Settings />;
    return <TodayView />;
  };

  const navItems = [
    { path: '/today', label: 'Dashboard', icon: Home, shortcut: 'Ctrl+1' },
    { path: '/medications', label: 'Medications', icon: Pill, shortcut: 'Ctrl+2' },
    { path: '/calendar', label: 'Calendar', icon: Calendar, shortcut: 'Ctrl+3' },
    { path: '/communications', label: 'Messages', icon: MessageSquare, shortcut: 'Ctrl+4' },
    { path: '/settings', label: 'Settings', icon: SettingsIcon, shortcut: 'Ctrl+5' },
  ];

  const mainPath = currentPath.split('/')[1] || 'today';
  const isActive = (path: string) => {
    const pathBase = path.split('/')[1] || 'today';
    return pathBase === mainPath;
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Desktop Title Bar */}
      <DesktopTitleBar />
      
      {/* Main App Layout */}
      <div className={`flex-1 flex overflow-hidden ${leftHandMode ? 'flex-row-reverse' : ''}`}>
      {/* Desktop Sidebar Navigation - Responsive widths */}
      <aside className={`lg:w-60 xl:w-64 2xl:w-72 bg-white flex flex-col ${leftHandMode ? 'border-l' : 'border-r'} border-gray-200`}>
        {/* Logo/Brand */}
        <div className="p-6 lg:p-5 xl:p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 2xl:w-14 2xl:h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white text-xl 2xl:text-2xl font-bold">CC</span>
            </div>
            <div>
              <h1 className="font-bold text-gray-900">CareConnect</h1>
              <p className="text-xs text-gray-500">Desktop</p>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4 lg:py-3 xl:py-4 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={`${item.label} (${item.shortcut})`}
                className={`w-full flex items-center justify-between gap-3 px-6 lg:px-4 xl:px-6 py-3 lg:py-2.5 xl:py-3 transition-all group ${
                  active 
                    ? `bg-blue-50 text-blue-600 ${leftHandMode ? 'border-l-4' : 'border-r-4'} border-blue-600` 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 2xl:w-5 2xl:h-5 flex-shrink-0" />
                  <span className="font-medium text-sm xl:text-base">{item.label}</span>
                </div>
                <span className={`text-xs 2xl:text-xs transition-opacity ${
                  active ? 'opacity-50' : 'opacity-0 group-hover:opacity-50'
                }`}>
                  {item.shortcut.replace('Ctrl+', '⌘')}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="p-4 lg:p-3 xl:p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 2xl:w-11 2xl:h-11 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 2xl:w-6 2xl:h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 text-sm truncate">Current User</p>
              <p className="text-xs text-gray-500 truncate">user@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        {renderRoute()}
      </main>
      </div>
      
      {/* Command Palette */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)}
        onNavigate={navigate}
      />
      
      {/* Keyboard Shortcuts Help */}
      <KeyboardShortcutsHelp 
        isOpen={isShortcutsHelpOpen} 
        onClose={() => setIsShortcutsHelpOpen(false)}
      />
      
      {/* Status Bar */}
      <StatusBar />
    </div>
  );
};