import { Minus, Square, X, Circle } from 'lucide-react';

interface DesktopTitleBarProps {
  title?: string;
  showWindowControls?: boolean;
}

export const DesktopTitleBar = ({ 
  title = 'CareConnect', 
  showWindowControls = true 
}: DesktopTitleBarProps) => {
  
  return (
    <div className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-4 select-none">
      {/* Left: App Icon & Title */}
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-md flex items-center justify-center shadow-md">
          <span className="text-white text-xs font-bold">CC</span>
        </div>
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>

      {/* Center: Draggable Area */}
      <div className="flex-1 h-full" style={{ WebkitAppRegion: 'drag' } as any} />

      {/* Right: Window Controls */}
      {showWindowControls && (
        <div className="flex items-center gap-2">
          <button
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-200"
            title="Minimize"
            aria-label="Minimize window"
          >
            <Minus className="w-4 h-4" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-800 transition-colors text-gray-400 hover:text-gray-200"
            title="Maximize"
            aria-label="Maximize window"
          >
            <Square className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded hover:bg-red-600 transition-colors text-gray-400 hover:text-white"
            title="Close"
            aria-label="Close window"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
