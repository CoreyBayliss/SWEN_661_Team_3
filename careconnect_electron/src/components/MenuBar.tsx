import { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarCheckboxItem,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from './ui/menubar';
import {
  FileText,
  Download,
  Upload,
  Printer,
  Settings,
  LogOut,
  Undo,
  Redo,
  Copy,
  Clipboard,
  Search,
  Home,
  Pill,
  Calendar,
  MessageSquare,
  PanelRightOpen,
  PanelRightClose,
  Moon,
  Sun,
  Maximize2,
  Minimize2,
  RefreshCw,
  Plus,
  List,
  LayoutGrid,
  Keyboard,
  BookOpen,
  HelpCircle,
  Info,
  Bug,
  Github,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';

interface MenuBarProps {
  onToggleSidePanel: () => void;
  sidePanelOpen: boolean;
  onOpenShortcuts: () => void;
}

export const MenuBar = ({ 
  onToggleSidePanel, 
  sidePanelOpen,
  onOpenShortcuts 
}: MenuBarProps) => {
  const { 
    navigate, 
    logout, 
    leftHandMode, 
    setLeftHandMode,
    notificationsEnabled,
    setNotificationsEnabled,
    currentPath 
  } = useApp();

  const [darkMode, setDarkMode] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleExport = () => {
    toast.success('Export started', {
      description: 'Your data is being prepared for download',
    });
  };

  const handleImport = () => {
    toast.info('Import', {
      description: 'Import functionality will open file picker',
    });
  };

  const handlePrint = () => {
    window.print();
    toast.success('Print dialog opened');
  };

  const handleRefresh = () => {
    toast.success('Data refreshed');
  };

  const handleUndo = () => {
    toast.info('Undo', { description: 'Last action undone' });
  };

  const handleRedo = () => {
    toast.info('Redo', { description: 'Last action redone' });
  };

  const handleCopy = () => {
    toast.success('Copied to clipboard');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    toast.info(darkMode ? 'Light mode enabled' : 'Dark mode enabled');
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    toast.success(
      notificationsEnabled 
        ? 'Notifications disabled' 
        : 'Notifications enabled'
    );
  };

  const toggleLeftHandMode = () => {
    setLeftHandMode(!leftHandMode);
    toast.success(
      leftHandMode 
        ? 'Left-Hand Mode disabled' 
        : 'Left-Hand Mode enabled'
    );
  };

  return (
    <Menubar className="rounded-none border-b border-gray-200 bg-white px-2 py-0 h-10">
      {/* File Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <FileText className="w-4 h-4 mr-2" />
          File
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate('/medications/add')}>
            <Plus className="w-4 h-4 mr-2" />
            New Medication
            <MenubarShortcut>Ctrl+N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Data...
            <MenubarShortcut>Ctrl+E</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleImport}>
            <Upload className="w-4 h-4 mr-2" />
            Import Data...
            <MenubarShortcut>Ctrl+I</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handlePrint}>
            <Printer className="w-4 h-4 mr-2" />
            Print...
            <MenubarShortcut>Ctrl+P</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Edit Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={handleUndo}>
            <Undo className="w-4 h-4 mr-2" />
            Undo
            <MenubarShortcut>Ctrl+Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={handleRedo}>
            <Redo className="w-4 h-4 mr-2" />
            Redo
            <MenubarShortcut>Ctrl+Y</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            Copy
            <MenubarShortcut>Ctrl+C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <Clipboard className="w-4 h-4 mr-2" />
            Paste
            <MenubarShortcut>Ctrl+V</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Search className="w-4 h-4 mr-2" />
            Find
            <MenubarShortcut>Ctrl+F</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => navigate('/settings')}>
            <Settings className="w-4 h-4 mr-2" />
            Preferences
            <MenubarShortcut>Ctrl+,</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* View Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate('/today')}>
            <Home className="w-4 h-4 mr-2" />
            Dashboard
            <MenubarShortcut>Ctrl+1</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => navigate('/medications')}>
            <Pill className="w-4 h-4 mr-2" />
            Medications
            <MenubarShortcut>Ctrl+2</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => navigate('/calendar')}>
            <Calendar className="w-4 h-4 mr-2" />
            Calendar
            <MenubarShortcut>Ctrl+3</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => navigate('/communications')}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Messages
            <MenubarShortcut>Ctrl+4</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              {viewMode === 'grid' ? (
                <LayoutGrid className="w-4 h-4 mr-2" />
              ) : (
                <List className="w-4 h-4 mr-2" />
              )}
              View Mode
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarCheckboxItem
                checked={viewMode === 'grid'}
                onCheckedChange={() => setViewMode('grid')}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Grid View
              </MenubarCheckboxItem>
              <MenubarCheckboxItem
                checked={viewMode === 'list'}
                onCheckedChange={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-2" />
                List View
              </MenubarCheckboxItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarCheckboxItem
            checked={sidePanelOpen}
            onCheckedChange={onToggleSidePanel}
          >
            {sidePanelOpen ? (
              <PanelRightClose className="w-4 h-4 mr-2" />
            ) : (
              <PanelRightOpen className="w-4 h-4 mr-2" />
            )}
            Side Panel
            <MenubarShortcut>Ctrl+B</MenubarShortcut>
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
            <MenubarShortcut>Ctrl+R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Medication Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Pill className="w-4 h-4 mr-2" />
          Medication
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => navigate('/medications/add')}>
            <Plus className="w-4 h-4 mr-2" />
            Add New Medication
            <MenubarShortcut>Ctrl+N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => navigate('/medications')}>
            <List className="w-4 h-4 mr-2" />
            View All Medications
            <MenubarShortcut>Ctrl+2</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <RefreshCw className="w-4 h-4 mr-2" />
            Request Refill
          </MenubarItem>
          <MenubarItem>
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Reminder
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export Medication List
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Calendar Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Calendar className="w-4 h-4 mr-2" />
          Calendar
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <Plus className="w-4 h-4 mr-2" />
            New Appointment
          </MenubarItem>
          <MenubarItem onClick={() => navigate('/calendar')}>
            <Calendar className="w-4 h-4 mr-2" />
            View Schedule
            <MenubarShortcut>Ctrl+3</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Calendar className="w-4 h-4 mr-2" />
              View Options
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Day View</MenubarItem>
              <MenubarItem>Week View</MenubarItem>
              <MenubarItem>Month View</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Calendar
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Settings Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={notificationsEnabled}
            onCheckedChange={toggleNotifications}
          >
            Notifications
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={leftHandMode}
            onCheckedChange={toggleLeftHandMode}
          >
            Left-Hand Mode
            <MenubarShortcut>Ctrl+Shift+L</MenubarShortcut>
          </MenubarCheckboxItem>
          <MenubarCheckboxItem
            checked={darkMode}
            onCheckedChange={toggleDarkMode}
          >
            {darkMode ? (
              <Moon className="w-4 h-4 mr-2" />
            ) : (
              <Sun className="w-4 h-4 mr-2" />
            )}
            Dark Mode
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>
              <Settings className="w-4 h-4 mr-2" />
              Appearance
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Compact Mode</MenubarItem>
              <MenubarItem>Comfortable Mode</MenubarItem>
              <MenubarItem>Spacious Mode</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem onClick={() => navigate('/settings')}>
            <Settings className="w-4 h-4 mr-2" />
            All Settings
            <MenubarShortcut>Ctrl+5</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      {/* Help Menu */}
      <MenubarMenu>
        <MenubarTrigger className="cursor-pointer">Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={onOpenShortcuts}>
            <Keyboard className="w-4 h-4 mr-2" />
            Keyboard Shortcuts
            <MenubarShortcut>Ctrl+/</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            <BookOpen className="w-4 h-4 mr-2" />
            Documentation
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <HelpCircle className="w-4 h-4 mr-2" />
            Getting Started
          </MenubarItem>
          <MenubarItem>
            <BookOpen className="w-4 h-4 mr-2" />
            User Guide
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Bug className="w-4 h-4 mr-2" />
            Report Issue
          </MenubarItem>
          <MenubarItem>
            <Mail className="w-4 h-4 mr-2" />
            Contact Support
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            <Info className="w-4 h-4 mr-2" />
            About CareConnect
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
