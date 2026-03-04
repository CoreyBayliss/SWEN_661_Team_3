import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  Calendar, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Filter, 
  Download,
  Upload,
  Settings,
  MoreVertical,
  ChevronDown,
  Star,
  Archive,
  Share2,
  Printer,
  SlidersHorizontal,
  Bell,
  PanelRightOpen,
  PanelRightClose
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from './ui/dropdown-menu';
import { Input } from './ui/input';

interface ToolbarProps {
  onToggleSidePanel: () => void;
  sidePanelOpen: boolean;
}

export const Toolbar = ({ onToggleSidePanel, sidePanelOpen }: ToolbarProps) => {
  const { currentPath, navigate, leftHandMode } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Get current view context
  const getCurrentView = () => {
    if (currentPath === '/' || currentPath === '/today') return 'dashboard';
    if (currentPath.startsWith('/medications')) return 'medications';
    if (currentPath.startsWith('/calendar')) return 'calendar';
    if (currentPath.startsWith('/communications')) return 'communications';
    if (currentPath.startsWith('/settings')) return 'settings';
    return 'dashboard';
  };

  const view = getCurrentView();

  // View-specific actions
  const getViewActions = () => {
    switch (view) {
      case 'dashboard':
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/medications/add')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Medication
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/calendar')}
              className="flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </Button>
          </>
        );
      case 'medications':
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/medications/add')}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add New
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </>
        );
      case 'calendar':
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Appointment
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Sync
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  View
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Day View</DropdownMenuItem>
                <DropdownMenuItem>Week View</DropdownMenuItem>
                <DropdownMenuItem>Month View</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        );
      case 'communications':
        return (
          <>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              New Message
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Archive className="w-4 h-4" />
              Archive
            </Button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-3 ${leftHandMode ? 'flex-row-reverse' : ''}`}>
      {/* Search Bar */}
      {view !== 'settings' && (
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="search"
              placeholder={`Search ${view}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 text-sm"
            />
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* View-specific Actions */}
      <div className={`flex items-center gap-2 ${leftHandMode ? 'flex-row-reverse' : ''}`}>
        {getViewActions()}

        {/* Global Actions */}
        <div className="h-6 w-px bg-gray-200 mx-1" />

        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
        >
          <Bell className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleSidePanel}
          className="flex items-center gap-2"
          title={sidePanelOpen ? 'Close Side Panel (Ctrl+B)' : 'Open Side Panel (Ctrl+B)'}
        >
          {sidePanelOpen ? (
            <PanelRightClose className="w-4 h-4" />
          ) : (
            <PanelRightOpen className="w-4 h-4" />
          )}
        </Button>

        {/* More Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Star className="w-4 h-4 mr-2" />
              Add to Favorites
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Upload className="w-4 h-4 mr-2" />
              Import Data
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
