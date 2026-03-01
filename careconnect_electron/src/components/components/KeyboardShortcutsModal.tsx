import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  {
    category: 'Navigation',
    items: [
      { keys: ['Ctrl', '1'], description: 'Go to Dashboard' },
      { keys: ['Ctrl', '2'], description: 'Go to Medications' },
      { keys: ['Ctrl', '3'], description: 'Go to Calendar' },
      { keys: ['Ctrl', '4'], description: 'Go to Messages' },
      { keys: ['Ctrl', '5'], description: 'Go to Settings' },
    ],
  },
  {
    category: 'Actions',
    items: [
      { keys: ['Ctrl', 'K'], description: 'Open Command Palette' },
      { keys: ['Ctrl', 'N'], description: 'New Item' },
      { keys: ['Ctrl', 'F'], description: 'Search' },
      { keys: ['Ctrl', 'S'], description: 'Save' },
      { keys: ['Esc'], description: 'Close Dialog' },
    ],
  },
  {
    category: 'Accessibility',
    items: [
      { keys: ['Ctrl', 'Shift', 'L'], description: 'Toggle Left-Hand Mode' },
    ],
  },
  {
    category: 'General',
    items: [
      { keys: ['Tab'], description: 'Navigate Forward' },
      { keys: ['Shift', 'Tab'], description: 'Navigate Backward' },
      { keys: ['Enter'], description: 'Confirm/Select' },
      { keys: ['Space'], description: 'Toggle/Select' },
    ],
  },
];

export const KeyboardShortcutsModal = ({ isOpen, onClose }: KeyboardShortcutsModalProps) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-50 animate-slide-up">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Keyboard className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Keyboard Shortcuts</h2>
                <p className="text-sm text-gray-600">Quick reference guide</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {shortcuts.map((section) => (
                <div key={section.category}>
                  <h3 className="font-semibold text-gray-900 mb-4">{section.category}</h3>
                  <div className="space-y-3">
                    {section.items.map((shortcut, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{shortcut.description}</span>
                        <div className="flex items-center gap-1">
                          {shortcut.keys.map((key, keyIndex) => (
                            <span key={keyIndex} className="flex items-center gap-1">
                              <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono">
                                {key}
                              </kbd>
                              {keyIndex < shortcut.keys.length - 1 && (
                                <span className="text-gray-400 text-xs">+</span>
                              )}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Press <kbd className="px-2 py-1 bg-white border border-gray-300 rounded text-xs">Esc</kbd> to close
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      </div>
    </>
  );
};