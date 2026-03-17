import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  describe('rendering', () => {
    it('should render button with text', () => {
      render(<Button>Click me</Button>);

      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('should apply primary variant by default', () => {
      render(<Button>Primary Button</Button>);

      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[var(--color-primary)]');
    });

    it('should render different variants', () => {
      const { rerender } = render(<Button variant="primary">Primary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-primary)]');

      rerender(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-secondary)]');

      rerender(<Button variant="outline">Outline</Button>);
      expect(screen.getByRole('button')).toHaveClass('border-2');

      rerender(<Button variant="ghost">Ghost</Button>);
      expect(screen.getByRole('button')).toHaveClass('text-[var(--color-primary)]');

      rerender(<Button variant="danger">Danger</Button>);
      expect(screen.getByRole('button')).toHaveClass('bg-[var(--color-error)]');
    });

    it('should render different sizes', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-3', 'py-1.5', 'text-sm');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-base');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('px-6', 'py-3', 'text-lg');

      rerender(<Button size="touch">Touch</Button>);
      expect(screen.getByRole('button')).toHaveClass('min-h-[56px]');
    });

    it('should render full width when specified', () => {
      render(<Button fullWidth>Full Width</Button>);

      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('should render with left icon', () => {
      const icon = <span data-testid="left-icon">←</span>;
      render(<Button leftIcon={icon}>Button with Icon</Button>);

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should render with right icon', () => {
      const icon = <span data-testid="right-icon">→</span>;
      render(<Button rightIcon={icon}>Button with Icon</Button>);

      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('should render with both icons', () => {
      const leftIcon = <span data-testid="left-icon">←</span>;
      const rightIcon = <span data-testid="right-icon">→</span>;
      render(
        <Button leftIcon={leftIcon} rightIcon={rightIcon}>
          Button with Icons
        </Button>
      );

      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should show loading spinner when loading', () => {
      render(<Button loading>Loading Button</Button>);

      const button = screen.getByRole('button');
      const spinner = button.querySelector('svg.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('should hide icons when loading', () => {
      const icon = <span data-testid="icon">Icon</span>;
      render(
        <Button loading leftIcon={icon} rightIcon={icon}>
          Loading
        </Button>
      );

      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
    });

    it('should be disabled when loading', () => {
      render(<Button loading>Loading Button</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled Button</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      render(<Button disabled>Disabled Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('disabled:opacity-50', 'disabled:cursor-not-allowed');
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button disabled onClick={handleClick}>
          Disabled Button
        </Button>
      );

      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should support keyboard interaction', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Keyboard Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });

    it('should pass through additional props', () => {
      render(
        <Button type="submit" data-testid="submit-button" aria-label="Submit form">
          Submit
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('data-testid', 'submit-button');
      expect(button).toHaveAttribute('aria-label', 'Submit form');
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Custom Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });
  });

  describe('accessibility', () => {
    it('should have focus-visible ring', () => {
      render(<Button>Accessible Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-offset-2');
    });

    it('should have minimum touch target for touch size', () => {
      render(<Button size="touch">Touch Button</Button>);

      expect(screen.getByRole('button')).toHaveClass('min-h-[56px]');
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Keyboard Button</Button>);

      const button = screen.getByRole('button');
      await user.tab();
      expect(button).toHaveFocus();

      await user.keyboard('{Space}');
      expect(handleClick).toHaveBeenCalled();
    });

    it('should support ARIA attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="description">
          Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('edge cases', () => {
    it('should handle empty children', () => {
      render(<Button>{''}</Button>);

      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Multi-click Button</Button>);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should handle rapid clicks when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      const { rerender } = render(
        <Button onClick={handleClick}>Click me</Button>
      );

      await user.click(screen.getByRole('button'));
      
      rerender(<Button loading onClick={handleClick}>Loading</Button>);
      
      await user.click(screen.getByRole('button'));

      // Should only register the first click
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should combine all classes correctly', () => {
      render(
        <Button
          variant="outline"
          size="lg"
          fullWidth
          className="custom-class"
        >
          Complex Button
        </Button>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveClass('border-2');
      expect(button).toHaveClass('px-6', 'py-3', 'text-lg');
      expect(button).toHaveClass('w-full');
      expect(button).toHaveClass('custom-class');
    });
  });
});
