import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';
import { Mail, Lock } from 'lucide-react';

describe('Input Component', () => {
  describe('rendering', () => {
    it('should render input field', () => {
      render(<Input placeholder="Enter text" />);

      expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Input label="Email Address" />);

      expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    });

    it('should associate label with input using htmlFor', () => {
      render(<Input label="Username" id="username-input" />);

      const input = screen.getByLabelText(/username/i);
      expect(input).toHaveAttribute('id', 'username-input');
    });

    it('should generate unique ID if not provided', () => {
      const { container } = render(<Input label="Test" />);

      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id');
      expect(input?.id).toMatch(/^input-/);
    });

    it('should render with helper text', () => {
      render(<Input helperText="Enter a valid email address" />);

      expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<Input error="This field is required" />);

      expect(screen.getByRole('alert')).toHaveTextContent(/this field is required/i);
    });

    it('should render with left icon', () => {
      render(<Input leftIcon={<Mail data-testid="mail-icon" />} />);

      expect(screen.getByTestId('mail-icon')).toBeInTheDocument();
    });

    it('should render with right icon', () => {
      render(<Input rightIcon={<Lock data-testid="lock-icon" />} />);

      expect(screen.getByTestId('lock-icon')).toBeInTheDocument();
    });

    it('should render full width', () => {
      const { container } = render(<Input fullWidth />);

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass('w-full');
    });
  });

  describe('user interactions', () => {
    it('should handle text input', async () => {
      const user = userEvent.setup();
      render(<Input placeholder="Type here" />);

      const input = screen.getByPlaceholderText(/type here/i);
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });

    it('should call onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalledTimes(4); // Once per character
    });

    it('should call onFocus handler', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur handler', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab(); // Blur by tabbing away

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it('should clear input value', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Initial value" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('Initial value');

      await user.clear(input);
      expect(input).toHaveValue('');
    });

    it('should select text on triple click', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="Select this text" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.tripleClick(input);

      expect(input.selectionStart).toBe(0);
      expect(input.selectionEnd).toBe(16);
    });

    it('should handle paste', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.paste('Pasted content');

      expect(input).toHaveValue('Pasted content');
    });

    it('should handle keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <>
          <Input placeholder="First" />
          <Input placeholder="Second" />
        </>
      );

      await user.tab();
      expect(screen.getByPlaceholderText(/first/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText(/second/i)).toHaveFocus();
    });
  });

  describe('controlled component', () => {
    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const ControlledInput = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            data-testid="controlled-input"
          />
        );
      };

      render(<ControlledInput />);

      const input = screen.getByTestId('controlled-input');
      await user.type(input, 'controlled');

      expect(input).toHaveValue('controlled');
    });

    it('should update when controlled value changes', () => {
      const { rerender } = render(<Input value="initial" onChange={() => {}} />);

      expect(screen.getByRole('textbox')).toHaveValue('initial');

      rerender(<Input value="updated" onChange={() => {}} />);

      expect(screen.getByRole('textbox')).toHaveValue('updated');
    });
  });

  describe('validation states', () => {
    it('should display error state', () => {
      render(<Input error="Invalid input" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-[var(--color-error)]');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('should associate error message with input', () => {
      render(<Input id="test-input" error="Error message" />);

      const input = screen.getByRole('textbox');
      const errorId = input.getAttribute('aria-describedby');
      
      expect(errorId).toBe('test-input-error');
      expect(screen.getByText(/error message/i)).toHaveAttribute('id', errorId);
    });

    it('should associate helper text with input when no error', () => {
      render(<Input id="test-input" helperText="Helper text" />);

      const input = screen.getByRole('textbox');
      const helperId = input.getAttribute('aria-describedby');
      
      expect(helperId).toBe('test-input-helper');
    });

    it('should prioritize error over helper text', () => {
      render(
        <Input
          id="test-input"
          error="Error message"
          helperText="Helper text"
        />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(screen.getByRole('alert')).toHaveTextContent(/error message/i);
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      render(<Input disabled />);

      expect(screen.getByRole('textbox')).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('should not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(input).toHaveValue('');
    });

    it('should not call onChange when disabled', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('input types', () => {
    it('should render email input', () => {
      render(<Input type="email" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" />);

      const input = screen.getByLabelText(/password/i) || document.querySelector('input[type="password"]');
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should render number input', () => {
      render(<Input type="number" />);

      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    });

    it('should render tel input', () => {
      render(<Input type="tel" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'tel');
    });

    it('should render search input', () => {
      render(<Input type="search" />);

      expect(screen.getByRole('searchbox')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Input label="Email" required />);

      const input = screen.getByLabelText(/email/i);
      expect(input).toHaveAttribute('aria-invalid', 'false');
      expect(input).toBeRequired();
    });

    it('should announce errors to screen readers', () => {
      render(<Input label="Email" error="Invalid email address" />);

      const errorMessage = screen.getByRole('alert');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(/invalid email/i);
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Input label="Username" />
          <Input label="Password" type="password" />
          <button type="submit">Submit</button>
        </form>
      );

      // Tab to first input
      await user.tab();
      expect(screen.getByLabelText(/username/i)).toHaveFocus();

      // Type and tab to next input
      await user.keyboard('testuser');
      await user.tab();
      expect(screen.getByLabelText(/password/i)).toHaveFocus();

      // Type and submit with Enter
      await user.keyboard('password123{Enter}');
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should support autocomplete', () => {
      render(<Input autoComplete="email" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('autocomplete', 'email');
    });

    it('should support required attribute', () => {
      render(<Input label="Email" required />);

      expect(screen.getByLabelText(/email/i)).toBeRequired();
    });

    it('should support readonly attribute', () => {
      render(<Input readOnly value="Read only value" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readonly');
    });
  });

  describe('ref forwarding', () => {
    it('should forward ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it('should allow focus via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();
      expect(ref.current).toHaveFocus();
    });

    it('should allow value access via ref', async () => {
      const user = userEvent.setup();
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      await user.type(ref.current!, 'test value');
      expect(ref.current?.value).toBe('test value');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string value', () => {
      render(<Input value="" onChange={() => {}} />);

      expect(screen.getByRole('textbox')).toHaveValue('');
    });

    it('should handle maxLength attribute', async () => {
      const user = userEvent.setup();
      render(<Input maxLength={5} />);

      const input = screen.getByRole('textbox');
      await user.type(input, '1234567890');

      expect(input).toHaveValue('12345');
    });

    it('should handle pattern attribute', () => {
      render(<Input pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('pattern', '[0-9]{3}-[0-9]{3}-[0-9]{4}');
    });

    it('should handle min and max for number inputs', () => {
      render(<Input type="number" min={0} max={100} />);

      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('should handle special characters', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.type(input, '!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`');

      expect(input).toHaveValue('!@#$%^&*()_+-=[]{}|;:\'",.<>?/~`');
    });

    it('should handle rapid typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'rapid typing test', { delay: 1 });

      expect(input).toHaveValue('rapid typing test');
      expect(handleChange).toHaveBeenCalledTimes(17);
    });

    it('should apply custom className', () => {
      render(<Input className="custom-input-class" />);

      expect(screen.getByRole('textbox')).toHaveClass('custom-input-class');
    });
  });
});
