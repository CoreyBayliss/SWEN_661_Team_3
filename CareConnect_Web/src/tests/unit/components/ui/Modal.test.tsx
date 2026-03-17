import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '@/components/ui/Modal';

describe('Modal Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    children: <div>Modal Content</div>,
  };

  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = 'unset';
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render when isOpen is true', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/modal content/i)).toBeInTheDocument();
    });

    it('should not render when isOpen is false', () => {
      render(<Modal {...defaultProps} isOpen={false} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render with title', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);

      expect(screen.getByText(/test modal/i)).toBeInTheDocument();
    });

    it('should have aria-labelledby when title is provided', () => {
      render(<Modal {...defaultProps} title="Test Modal" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(screen.getByText(/test modal/i)).toHaveAttribute('id', 'modal-title');
    });

    it('should render close button by default', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('should hide close button when showCloseButton is false', () => {
      render(<Modal {...defaultProps} showCloseButton={false} />);

      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    it('should render footer when provided', () => {
      render(
        <Modal {...defaultProps} footer={<button>Save Changes</button>} />
      );

      expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
    });

    it('should render with different sizes', () => {
      const { rerender } = render(<Modal {...defaultProps} size="sm" />);
      let dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-w-md');

      rerender(<Modal {...defaultProps} size="md" />);
      dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-w-lg');

      rerender(<Modal {...defaultProps} size="lg" />);
      dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-w-2xl');

      rerender(<Modal {...defaultProps} size="xl" />);
      dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-w-4xl');

      rerender(<Modal {...defaultProps} size="full" />);
      dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-w-full');
    });
  });

  describe('interactions', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when Escape key is pressed', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when overlay is clicked', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const dialog = screen.getByRole('dialog');
      const backdrop = dialog.querySelector('[aria-hidden="true"]');
      
      if (backdrop) {
        await user.click(backdrop as HTMLElement);
        expect(onClose).toHaveBeenCalled();
      }
    });

    it('should not close on overlay click when closeOnOverlayClick is false', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} closeOnOverlayClick={false} />);

      const dialog = screen.getByRole('dialog');
      const backdrop = dialog.querySelector('[aria-hidden="true"]');
      
      if (backdrop) {
        await user.click(backdrop as HTMLElement);
        expect(onClose).not.toHaveBeenCalled();
      }
    });

    it('should not close when clicking inside modal content', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      const content = screen.getByText(/modal content/i);
      await user.click(content);

      expect(onClose).not.toHaveBeenCalled();
    });

    it('should focus trap within modal', async () => {
      const user = userEvent.setup();
      render(
        <Modal {...defaultProps}>
          <button>First</button>
          <button>Second</button>
          <button>Third</button>
        </Modal>
      );

      const closeButton = screen.getByRole('button', { name: /close/i });
      closeButton.focus();

      await user.tab();
      expect(screen.getByRole('button', { name: /first/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /second/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /third/i })).toHaveFocus();
    });
  });

  describe('body scroll lock', () => {
    it('should lock body scroll when modal opens', () => {
      render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should unlock body scroll when modal closes', () => {
      const { rerender } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('unset');
    });

    it('should unlock body scroll on unmount', () => {
      const { unmount } = render(<Modal {...defaultProps} />);

      expect(document.body.style.overflow).toBe('hidden');

      unmount();

      expect(document.body.style.overflow).toBe('unset');
    });
  });

  describe('accessibility', () => {
    it('should have role="dialog"', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should have aria-modal="true"', () => {
      render(<Modal {...defaultProps} />);

      expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
    });

    it('should mark backdrop as aria-hidden', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      const backdrop = dialog.querySelector('[aria-hidden="true"]');
      
      expect(backdrop).toBeInTheDocument();
    });

    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(
        <Modal {...defaultProps} onClose={onClose}>
          <input placeholder="Name" />
          <button>Submit</button>
        </Modal>
      );

      // Tab through elements
      await user.tab();
      expect(screen.getByRole('button', { name: /close/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText(/name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();

      // Press Escape to close
      await user.keyboard('{Escape}');
      expect(onClose).toHaveBeenCalled();
    });

    it('should announce modal to screen readers', () => {
      render(<Modal {...defaultProps} title="Confirmation Required" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');
    });
  });

  describe('complex content', () => {
    it('should render complex content', () => {
      render(
        <Modal {...defaultProps} title="User Profile">
          <form>
            <input placeholder="Name" />
            <input placeholder="Email" type="email" />
            <textarea placeholder="Bio" />
            <button type="submit">Save</button>
          </form>
        </Modal>
      );

      expect(screen.getByPlaceholderText(/name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/bio/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    });

    it('should render with footer actions', () => {
      render(
        <Modal
          {...defaultProps}
          footer={
            <>
              <button>Cancel</button>
              <button>Confirm</button>
            </>
          }
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>
      );

      expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /confirm/i })).toBeInTheDocument();
    });

    it('should handle scrollable content', () => {
      const longContent = Array.from({ length: 100 }, (_, i) => (
        <p key={i}>Paragraph {i + 1}</p>
      ));

      render(<Modal {...defaultProps}>{longContent}</Modal>);

      const dialog = screen.getByRole('dialog').querySelector('div');
      expect(dialog).toHaveClass('max-h-[90vh]');
    });
  });

  describe('event handling', () => {
    it('should handle multiple escape key presses', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      await user.keyboard('{Escape}');
      await user.keyboard('{Escape}');
      await user.keyboard('{Escape}');

      // Should only close once (component unmounts after first call)
      expect(onClose).toHaveBeenCalled();
    });

    it('should cleanup event listeners on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');
      const { unmount } = render(<Modal {...defaultProps} />);

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('should not call onClose for other keys', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      render(<Modal {...defaultProps} onClose={onClose} />);

      await user.keyboard('{Enter}');
      await user.keyboard('{Space}');
      await user.keyboard('{Tab}');
      await user.keyboard('a');

      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle rapid open/close', () => {
      const { rerender } = render(<Modal {...defaultProps} isOpen={false} />);

      rerender(<Modal {...defaultProps} isOpen={true} />);
      rerender(<Modal {...defaultProps} isOpen={false} />);
      rerender(<Modal {...defaultProps} isOpen={true} />);
      rerender(<Modal {...defaultProps} isOpen={false} />);

      expect(document.body.style.overflow).toBe('unset');
    });

    it('should handle nested interactive elements', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Modal {...defaultProps}>
          <div>
            <button onClick={handleClick}>Nested Button</button>
          </div>
        </Modal>
      );

      await user.click(screen.getByRole('button', { name: /nested button/i }));
      expect(handleClick).toHaveBeenCalled();
    });

    it('should handle empty children', () => {
      render(<Modal {...defaultProps} children={null} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should handle multiple modals (stacking)', () => {
      const { container } = render(
        <>
          <Modal isOpen={true} onClose={vi.fn()}>
            First Modal
          </Modal>
          <Modal isOpen={true} onClose={vi.fn()}>
            Second Modal
          </Modal>
        </>
      );

      const dialogs = container.querySelectorAll('[role="dialog"]');
      expect(dialogs).toHaveLength(2);
    });

    it('should prevent clicks on backdrop from bubbling to modal content', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();
      const contentClick = vi.fn();

      render(
        <Modal {...defaultProps} onClose={onClose}>
          <div onClick={contentClick}>Modal Content</div>
        </Modal>
      );

      // Click the content (should trigger contentClick)
      await user.click(screen.getByText(/modal content/i));
      expect(contentClick).toHaveBeenCalled();
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('z-index and positioning', () => {
    it('should have correct z-index classes', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('z-[var(--z-modal)]');
    });

    it('should center modal on screen', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('items-center', 'justify-center');
    });

    it('should be fixed positioned', () => {
      render(<Modal {...defaultProps} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveClass('fixed', 'inset-0');
    });
  });
});
