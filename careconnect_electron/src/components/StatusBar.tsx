import { Wifi, WifiOff, Activity, Clock, Bell, Hand } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface StatusBarProps {
  isOnline?: boolean;
  lastSyncTime?: string;
  notificationCount?: number;
}

export const StatusBar = ({ 
  isOnline = true, 
  lastSyncTime = 'Just now',
  notificationCount = 0 
}: StatusBarProps) => {
  const { leftHandMode } = useApp();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="h-8 bg-gray-800 border-t border-gray-700 flex items-center justify-between px-4 text-xs text-gray-300 select-none">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {isOnline ? (
            <>
              <Wifi className="w-3.5 h-3.5 text-green-400" />
              <span>Connected</span>
            </>
          ) : (
            <>
              <WifiOff className="w-3.5 h-3.5 text-red-400" />
              <span>Offline</span>
            </>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-blue-400" />
          <span>Last sync: {lastSyncTime}</span>
        </div>

        {leftHandMode && (
          <div className="flex items-center gap-2">
            <Hand className="w-3.5 h-3.5 text-purple-400" />
            <span>Left-Hand Mode</span>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {notificationCount > 0 && (
          <div className="flex items-center gap-2">
            <Bell className="w-3.5 h-3.5 text-yellow-400" />
            <span>{notificationCount} notification{notificationCount !== 1 ? 's' : ''}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          <span>{currentTime}</span>
        </div>
      </div>
    </div>
  );
};