import React, { useRef } from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { Navigation } from '../../components/navigation/Navigation';
import { MobileKeyboard } from '../../components/MobileKeyboard';
import { useKeyboardManager } from '../../hooks/useKeyboardManager';
import { AuthProvider } from '../../contexts/AuthContext';
import { AccessibilityProvider } from '../../contexts/AccessibilityContext';

function renderNavigation(path = '/dashboard') {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AuthProvider>
        <AccessibilityProvider>
          <Navigation />
        </AccessibilityProvider>
      </AuthProvider>
    </MemoryRouter>,
  );
}

function KeyboardHookHarness() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isKeyboardVisible, keyboardType, handleKeyPress, closeKeyboard } = useKeyboardManager(containerRef);

  return (
    <div ref={containerRef}>
      <div data-testid="kb-visible">{isKeyboardVisible ? 'yes' : 'no'}</div>
      <div data-testid="kb-type">{keyboardType}</div>
      <form aria-label="kb-form">
        <input aria-label="email input" inputMode="email" defaultValue="a" />
        <textarea aria-label="notes" defaultValue="n" />
      </form>
      <button onClick={() => handleKeyPress('b')}>insert-b</button>
      <button onClick={() => handleKeyPress('Backspace')}>backspace</button>
      <button onClick={() => handleKeyPress('Enter')}>enter</button>
      <button onClick={() => closeKeyboard()}>close</button>
    </div>
  );
}

describe('Navigation and keyboard smoke tests', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();

    sessionStorage.setItem(
      'user',
      JSON.stringify({ id: '1', email: 'test@careconnect.com', name: 'Test User' }),
    );

    if (!globalThis.scrollTo) {
      Object.defineProperty(globalThis, 'scrollTo', {
        value: () => {},
        writable: true,
      });
    }
  });

  it('renders Navigation and toggles the mobile menu', () => {
    renderNavigation('/dashboard');

    expect(screen.getAllByRole('heading', { name: /careconnect/i }).length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getAllByRole('button', { name: /logout/i }).length).toBeGreaterThan(0);
  });

  it('renders MobileKeyboard numeric and text variants', () => {
    const onKeyPress = vi.fn();
    const onClose = vi.fn();

    const { rerender } = render(
      <MobileKeyboard type="numeric" onKeyPress={onKeyPress} onClose={onClose} />,
    );

    fireEvent.click(screen.getByRole('button', { name: '1' }));
    fireEvent.click(screen.getByRole('button', { name: /done/i }));
    expect(onKeyPress).toHaveBeenCalledWith('1');
    expect(onClose).toHaveBeenCalled();

    rerender(<MobileKeyboard type="text" onKeyPress={onKeyPress} onClose={onClose} leftHandMode />);
    fireEvent.click(screen.getByRole('button', { name: 'q' }));
    fireEvent.click(screen.getByRole('button', { name: /space/i }));

    rerender(<MobileKeyboard type="email" onKeyPress={onKeyPress} onClose={onClose} />);
    fireEvent.click(screen.getAllByRole('button', { name: '@' })[0]);

    expect(onKeyPress).toHaveBeenCalledWith('q');
    expect(onKeyPress).toHaveBeenCalledWith(' ');
    expect(onKeyPress).toHaveBeenCalledWith('@');
  });

  it('exercises useKeyboardManager focus and key handling', () => {
    render(<KeyboardHookHarness />);

    const emailInput = screen.getByLabelText(/email input/i);
    const notes = screen.getByLabelText<HTMLTextAreaElement>(/notes/i);

    fireEvent.focus(emailInput);
    expect(screen.getByTestId('kb-visible')).toHaveTextContent('yes');
    expect(screen.getByTestId('kb-type')).toHaveTextContent('email');

    fireEvent.click(screen.getByRole('button', { name: 'insert-b' }));
    expect((emailInput as HTMLInputElement).value).toContain('b');

    fireEvent.focus(notes);
    fireEvent.click(screen.getByRole('button', { name: 'enter' }));
    expect(notes.value).toContain('\n');

    fireEvent.click(screen.getByRole('button', { name: 'backspace' }));
    fireEvent.click(screen.getByRole('button', { name: 'close' }));
    expect(screen.getByTestId('kb-visible')).toHaveTextContent('no');
  });
});
