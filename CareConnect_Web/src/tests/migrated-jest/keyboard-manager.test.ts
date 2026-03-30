import { renderHook, act } from '@testing-library/react';
import { useKeyboardManager } from '@/hooks/useKeyboardManager';

describe('useKeyboardManager', () => {
  let mockInput: HTMLInputElement;
  let mockTextarea: HTMLTextAreaElement;

  beforeEach(() => {
    // Create mock input element
    mockInput = document.createElement('input');
    mockInput.type = 'text';
    document.body.appendChild(mockInput);

    // Create mock textarea element
    mockTextarea = document.createElement('textarea');
    document.body.appendChild(mockTextarea);
  });

  afterEach(() => {
    document.body.removeChild(mockInput);
    document.body.removeChild(mockTextarea);
  });

  it('should initialize with keyboard hidden', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    expect(result.current.isKeyboardVisible).toBe(false);
    expect(result.current.keyboardType).toBe('text');
  });

  it('should show keyboard when input is focused', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.isKeyboardVisible).toBe(true);
  });

  it('should detect numeric keyboard type from inputMode', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.setAttribute('inputMode', 'numeric');
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.keyboardType).toBe('numeric');
  });

  it('should detect email keyboard type', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.type = 'email';
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.keyboardType).toBe('email');
  });

  it('should not show keyboard for disabled inputs', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.disabled = true;
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });

  it('should not show keyboard for readonly inputs', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.readOnly = true;
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });

  it('should not show keyboard for checkbox inputs', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.type = 'checkbox';
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.isKeyboardVisible).toBe(false);
  });

  it('should handle key press to insert character', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.value = 'test';
    mockInput.setSelectionRange(4, 4);
    
    act(() => {
      mockInput.focus();
    });

    act(() => {
      result.current.handleKeyPress('!');
    });

    expect(mockInput.value).toBe('test!');
  });

  it('should handle backspace to delete character', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.value = 'test';
    mockInput.setSelectionRange(4, 4);
    
    act(() => {
      mockInput.focus();
    });

    act(() => {
      result.current.handleKeyPress('Backspace');
    });

    expect(mockInput.value).toBe('tes');
  });

  it('should handle backspace to delete selection', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.value = 'test';
    mockInput.setSelectionRange(1, 3); // Select 'es'
    
    act(() => {
      mockInput.focus();
    });

    act(() => {
      result.current.handleKeyPress('Backspace');
    });

    expect(mockInput.value).toBe('tt');
  });

  it('should handle Enter for textarea to insert newline', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockTextarea.value = 'line1';
    mockTextarea.setSelectionRange(5, 5);
    
    act(() => {
      mockTextarea.focus();
    });

    act(() => {
      result.current.handleKeyPress('Enter');
    });

    expect(mockTextarea.value).toBe('line1\n');
  });

  it('should handle keyboard state management', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    act(() => {
      mockInput.focus();
    });

    expect(result.current.isKeyboardVisible).toBe(true);
    // Keyboard manager tracks visibility based on focus events
  });

  it('should insert character at cursor position', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.value = 'test';
    mockInput.setSelectionRange(2, 2); // Cursor between 'e' and 's'
    
    act(() => {
      mockInput.focus();
    });

    act(() => {
      result.current.handleKeyPress('X');
    });

    expect(mockInput.value).toBe('teXst');
  });

  it('should replace selection with new character', () => {
    const { result } = renderHook(() => useKeyboardManager());
    
    mockInput.value = 'test';
    mockInput.setSelectionRange(1, 3); // Select 'es'
    
    act(() => {
      mockInput.focus();
    });

    act(() => {
      result.current.handleKeyPress('X');
    });

    expect(mockInput.value).toBe('tXt');
  });
});
