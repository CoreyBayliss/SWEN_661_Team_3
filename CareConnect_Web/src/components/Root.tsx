import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Home, Pill, Calendar, MessageSquare, Settings as SettingsIcon } from 'lucide-react';
import { TodayView } from './TodayView';
import { MedicationList } from './MedicationList';
import { MedicationDetail } from './MedicationDetail';
import { AddMedication } from './AddMedication';
import { RefillRequest } from './RefillRequest';
import { Calendar as CalendarView } from './Calendar';
import { Communications } from './Communications';
import { Settings } from './Settings';
import { Login } from './Login';

export const Root = () => {
  const { leftHandMode, isAuthenticated, currentPath, navigate } = useApp();
  const prevPathRef = useRef<string>(currentPath);

  useEffect(() => {
    if (currentPath !== prevPathRef.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      prevPathRef.current = currentPath;
    }
  }, [currentPath]);

  // Show login if not authenticated
  if (!isAuthenticated) {
    return <Login key="login" />;
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
    { path: '/today', label: 'Today', icon: Home },
    { path: '/medications', label: 'Meds', icon: Pill },
    { path: '/calendar', label: 'Calendar', icon: Calendar },
    { path: '/communications', label: 'Messages', icon: MessageSquare },
    { path: '/settings', label: 'Settings', icon: SettingsIcon },
  ];

  const mainPath = currentPath.split('/')[1] || 'today';
  const isActive = (path: string) => {
    const pathBase = path.split('/')[1] || 'today';
    return pathBase === mainPath;
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto pb-safe-bottom">
        {renderRoute()}
      </div>

      {/* Bottom Navigation */}
      <nav 
        className={`bg-white border-t border-gray-200 pb-safe-bottom flex-shrink-0 ${
          leftHandMode ? 'order-first border-t-0 border-b' : ''
        }`}
      >
        <div className="flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex-1 flex flex-col items-center justify-center py-3 landscape:py-2 min-h-[64px] landscape:min-h-[56px] transition-colors ${
                  active 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-6 h-6 landscape:w-5 landscape:h-5" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
};