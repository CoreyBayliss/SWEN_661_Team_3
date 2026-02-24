import { Delete, CornerDownLeft } from 'lucide-react';
import { useEffect } from 'react';

type KeyboardType = 'text' | 'numeric' | 'decimal' | 'email';

interface MobileKeyboardProps {
  type: KeyboardType;
  onKeyPress: (key: string) => void;
  onClose: () => void;
  leftHandMode?: boolean;
}

export const MobileKeyboard = ({ 
  type, 
  onKeyPress, 
  onClose,
  leftHandMode = false 
}: MobileKeyboardProps) => {
  
  useEffect(() => {
    // Prevent body scroll when keyboard is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleKey = (key: string) => {
    if (key === 'backspace') {
      onKeyPress('Backspace');
    } else if (key === 'enter') {
      onKeyPress('Enter');
    } else if (key === 'space') {
      onKeyPress(' ');
    } else {
      onKeyPress(key);
    }
  };

  const numericKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace']
  ];

  const decimalKeys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['0', '.', 'backspace']
  ];

  const textKeysRow1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  const textKeysRow2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  const textKeysRow3 = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];

  const emailKeysRow1 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  const emailKeysRow2 = ['@', '#', '$', '_', '&', '-', '+', '(', ')', '/'];
  const emailKeysRow3 = ['.', ',', '?', '!', "'"];

  const renderNumericKeyboard = () => (
    <div className="grid grid-cols-3 gap-1.5 p-2">
      {numericKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`
                min-h-[56px] rounded-lg font-semibold text-lg
                ${key === 'backspace' 
                  ? 'bg-gray-300 hover:bg-gray-400 col-span-1' 
                  : 'bg-white hover:bg-gray-100'
                }
                border border-gray-300 active:bg-gray-200 transition-colors
                flex items-center justify-center
              `}
            >
              {key === 'backspace' ? <Delete className="w-5 h-5" /> : key}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={onClose}
        className="col-span-3 min-h-[56px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700 transition-colors"
      >
        Done
      </button>
    </div>
  );

  const renderDecimalKeyboard = () => (
    <div className="grid grid-cols-3 gap-1.5 p-2">
      {decimalKeys.map((row, rowIndex) => (
        <div key={rowIndex} className="contents">
          {row.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className={`
                min-h-[56px] rounded-lg font-semibold text-lg
                ${key === 'backspace' 
                  ? 'bg-gray-300 hover:bg-gray-400' 
                  : 'bg-white hover:bg-gray-100'
                }
                border border-gray-300 active:bg-gray-200 transition-colors
                flex items-center justify-center
              `}
            >
              {key === 'backspace' ? <Delete className="w-5 h-5" /> : key}
            </button>
          ))}
        </div>
      ))}
      <button
        onClick={onClose}
        className="col-span-3 min-h-[56px] bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium active:bg-blue-700 transition-colors"
      >
        Done
      </button>
    </div>
  );

  const renderTextKeyboard = () => (
    <div className="p-2 space-y-1.5">
      {/* Row 1 */}
      <div className="flex gap-1 justify-center">
        {textKeysRow1.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Row 2 */}
      <div className="flex gap-1 justify-center px-4">
        {textKeysRow2.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Row 3 */}
      <div className="flex gap-1 items-center">
        <button
          onClick={() => handleKey('backspace')}
          className="min-w-[60px] min-h-[48px] bg-gray-300 hover:bg-gray-400 border border-gray-300 rounded-lg active:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <Delete className="w-5 h-5" />
        </button>
        <div className="flex-1 flex gap-1 justify-center">
          {textKeysRow3.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleKey('enter')}
          className="min-w-[60px] min-h-[48px] bg-gray-300 hover:bg-gray-400 border border-gray-300 rounded-lg active:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <CornerDownLeft className="w-5 h-5" />
        </button>
      </div>
      
      {/* Space bar row */}
      <div className="flex gap-1">
        <button
          onClick={onClose}
          className="min-w-[60px] min-h-[48px] bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg font-medium text-sm active:bg-gray-400 transition-colors"
        >
          123
        </button>
        <button
          onClick={() => handleKey('space')}
          className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium active:bg-gray-200 transition-colors"
        >
          space
        </button>
        <button
          onClick={onClose}
          className="min-w-[60px] min-h-[48px] bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 rounded-lg font-medium active:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );

  const renderEmailKeyboard = () => (
    <div className="p-2 space-y-1.5">
      {/* Row 1 - Numbers */}
      <div className="flex gap-1">
        {emailKeysRow1.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Row 2 - Special chars */}
      <div className="flex gap-1">
        {emailKeysRow2.map((key) => (
          <button
            key={key}
            onClick={() => handleKey(key)}
            className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Row 3 - Punctuation */}
      <div className="flex gap-1">
        <button
          onClick={() => handleKey('backspace')}
          className="min-w-[80px] min-h-[48px] bg-gray-300 hover:bg-gray-400 border border-gray-300 rounded-lg active:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <Delete className="w-5 h-5" />
        </button>
        <div className="flex-1 flex gap-1 justify-center">
          {emailKeysRow3.map((key) => (
            <button
              key={key}
              onClick={() => handleKey(key)}
              className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium text-base active:bg-gray-200 transition-colors"
            >
              {key}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleKey('enter')}
          className="min-w-[80px] min-h-[48px] bg-gray-300 hover:bg-gray-400 border border-gray-300 rounded-lg active:bg-gray-500 transition-colors flex items-center justify-center"
        >
          <CornerDownLeft className="w-5 h-5" />
        </button>
      </div>
      
      {/* Bottom row */}
      <div className="flex gap-1">
        <button
          onClick={onClose}
          className="min-w-[60px] min-h-[48px] bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-lg font-medium text-sm active:bg-gray-400 transition-colors"
        >
          ABC
        </button>
        <button
          onClick={() => handleKey('@')}
          className="flex-none px-4 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium active:bg-gray-200 transition-colors"
        >
          @
        </button>
        <button
          onClick={() => handleKey('space')}
          className="flex-1 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium active:bg-gray-200 transition-colors"
        >
          space
        </button>
        <button
          onClick={() => handleKey('.')}
          className="flex-none px-4 min-h-[48px] bg-white hover:bg-gray-100 border border-gray-300 rounded-lg font-medium active:bg-gray-200 transition-colors"
        >
          .
        </button>
        <button
          onClick={onClose}
          className="min-w-[60px] min-h-[48px] bg-blue-500 hover:bg-blue-600 text-white border border-blue-500 rounded-lg font-medium active:bg-blue-700 transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div 
      className="mobile-keyboard fixed inset-x-0 bottom-0 z-50 animate-slide-up"
      style={{
        maxWidth: '100vw',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.15)'
      }}
    >
      {/* Keyboard backdrop */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none" 
        style={{ height: '20px', top: '-20px' }}
      />
      
      {/* Keyboard container */}
      <div className={`bg-gray-100 border-t border-gray-300 ${
        leftHandMode ? 'rounded-tl-2xl' : 'rounded-tr-2xl'
      }`}>
        {type === 'numeric' && renderNumericKeyboard()}
        {type === 'decimal' && renderDecimalKeyboard()}
        {type === 'text' && renderTextKeyboard()}
        {type === 'email' && renderEmailKeyboard()}
      </div>
    </div>
  );
};