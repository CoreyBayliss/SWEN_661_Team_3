import { fireEvent, render, screen } from '@testing-library/react';
import { ScreenshotDemo } from '@/pages/ScreenshotDemo';
import { TextScalingDemo } from '@/pages/TextScalingDemo';
import { WireframeGenerator } from '@/pages/WireframeGenerator';

describe('Pages', () => {
  describe('ScreenshotDemo', () => {
    it('switches between screens via selector', () => {
      render(<ScreenshotDemo />);

      expect(screen.getByText(/CareConnect Screenshot Demo/i)).toBeInTheDocument();
      expect(screen.getByText(/Current:/i)).toHaveTextContent('Today View');

      fireEvent.change(screen.getByRole('combobox'), { target: { value: 'login' } });

      expect(screen.getByText(/Current:/i)).toHaveTextContent('Login');
      expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });
  });

  describe('TextScalingDemo', () => {
    it('applies text size changes and reset', () => {
      render(<TextScalingDemo />);

      fireEvent.click(screen.getByRole('button', { name: /large/i }));
      expect(screen.getByText('20px (125%)')).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: /Reset All/i }));
      expect(screen.getByText('16px (100%)')).toBeInTheDocument();
    });

    it('toggles WCAG custom spacing', () => {
      render(<TextScalingDemo />);

      const spacingToggle = screen.getByRole('checkbox', { name: /apply custom spacing/i });
      fireEvent.click(spacingToggle);

      expect(spacingToggle).toBeChecked();
      expect(document.getElementById('scaling-viewport')).toHaveClass('custom-spacing');
    });
  });

  describe('WireframeGenerator', () => {
    it('updates selected screen and annotation summary', () => {
      render(<WireframeGenerator />);

      expect(screen.getByText(/CareConnect Wireframe Generator/i)).toBeInTheDocument();

      const [screenSelect] = screen.getAllByRole('combobox');
      fireEvent.change(screenSelect, { target: { value: 'login' } });
      expect(screen.getByRole('heading', { level: 2, name: /login/i })).toBeInTheDocument();

      const annotationsToggle = screen.getByRole('checkbox', { name: /show annotations/i });
      fireEvent.click(annotationsToggle);
      expect(screen.getByText(/Annotations:/i)).toHaveTextContent('Off');
    });

    it('exports current wireframe as svg', () => {
      const createObjectURLMock = jest.fn().mockReturnValue('blob:mock-wireframe');
      Object.defineProperty(global.URL, 'createObjectURL', {
        writable: true,
        value: createObjectURLMock,
      });

      render(<WireframeGenerator />);
      fireEvent.click(screen.getByRole('button', { name: /export svg/i }));

      expect(createObjectURLMock).toHaveBeenCalled();
    });
  });
});
