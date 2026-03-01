import { useState } from 'react';
import { X, Keyboard } from 'lucide-react';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ShortcutCategory {
  title: string;
  shortcuts: Array<{
    keys: string[];
    description: string;
  }>;
}

interface KeyboardShortcutsHelpProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardShortcutsHelp = ({ isOpen, onClose }: KeyboardShortcutsHelpProps) => {
  const containerRef = useFocusTrap({ enabled: isOpen });

  const categories: ShortcutCategory[] = [
    {
      title: 'Navigation',
      shortcuts: [
        { keys: ['Ctrl', '1'], description: 'Go to Dashboard' },
        { keys: ['Ctrl', '2'], description: 'Go to Medications' },
        { keys: ['Ctrl', '3'], description: 'Go to Calendar' },
        { keys: ['Ctrl', '4'], description: 'Go to Messages' },
        { keys: ['Ctrl', '5'], description: 'Go to Settings' },
        { keys: ['Ctrl', 'K'], description: 'Open Command Palette' },
      ],
    },
    {
      title: 'Actions',
      shortcuts: [
        { keys: ['Ctrl', 'N'], description: 'Add New Medication' },
        { keys: ['Ctrl', 'B'], description: 'Toggle Side Panel' },
        { keys: ['Ctrl', 'S'], description: 'Save Changes' },
        { keys: ['Ctrl', 'R'], description: 'Refresh Data' },
        { keys: ['Ctrl', 'F'], description: 'Search' },
        { keys: ['Ctrl', ','], description: 'Open Preferences' },
        { keys: ['Ctrl', 'E'], description: 'Export Data' },
        { keys: ['Ctrl', 'I'], description: 'Import Data' },
        { keys: ['Ctrl', 'P'], description: 'Print' },
        { keys: ['Ctrl', 'Shift', 'L'], description: 'Toggle Left-Hand Mode' },
      ],
    },
    {
      title: 'List Navigation',
      shortcuts: [
        { keys: ['↑', '↓'], description: 'Navigate items up/down' },
        { keys: ['←', '→'], description: 'Navigate items left/right (grid view)' },
        { keys: ['Enter'], description: 'Select/Open item' },
        { keys: ['Space'], description: 'Toggle selection' },
        { keys: ['Home'], description: 'Go to first item' },
        { keys: ['End'], description: 'Go to last item' },
        { keys: ['Page Up'], description: 'Move up 10 items' },
        { keys: ['Page Down'], description: 'Move down 10 items' },
      ],
    },
    {
      title: 'Forms',
      shortcuts: [
        { keys: ['Tab'], description: 'Next field' },
        { keys: ['Shift', 'Tab'], description: 'Previous field' },
        { keys: ['Enter'], description: 'Submit form' },
        { keys: ['Ctrl', 'Enter'], description: 'Submit from textarea' },
        { keys: ['Esc'], description: 'Cancel/Close' },
      ],
    },
    {
      title: 'Dialogs & Modals',
      shortcuts: [
        { keys: ['Esc'], description: 'Close dialog' },
        { keys: ['Tab'], description: 'Cycle through buttons' },
        { keys: ['Enter'], description: 'Confirm action' },
      ],
    },
    {
      title: 'General',
      shortcuts: [
        { keys: ['Ctrl', '/'], description: 'Show this help' },
        { keys: ['Ctrl', 'W'], description: 'Close window' },
        { keys: ['Ctrl', 'Q'], description: 'Quit application' },
      ],
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        ref={containerRef as any}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="shortcuts-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Keyboard className="w-5 h-5 text-blue-600" />
            </div>
            <h2 id="shortcuts-title" className="text-2xl font-bold text-gray-900">
              Keyboard Shortcuts
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Close shortcuts help"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category) => (
              <div key={category.title}>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  {category.title}
                </h3>
                <div className="space-y-3">
                  {category.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm text-gray-700">
                        {shortcut.description}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {shortcut.keys.map((key, keyIndex) => (
                          <span key={keyIndex}>
                            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-300 rounded shadow-sm">
                              {key}
                            </kbd>
                            {keyIndex < shortcut.keys.length - 1 && (
                              <span className="mx-1 text-gray-400">+</span>
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
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600">
            Press <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-white border border-gray-300 rounded">/</kbd> anytime to show this help
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};