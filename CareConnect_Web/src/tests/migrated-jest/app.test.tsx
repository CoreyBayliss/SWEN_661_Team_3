import { render, screen } from '@testing-library/react';
import App from '@/App';

jest.mock('@/context/AppContext', () => ({
  AppProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-provider">{children}</div>
  ),
}));

jest.mock('@/components/Root', () => ({
  Root: () => <div data-testid="root-component">Mocked Root</div>,
}));

jest.mock('@/components/ErrorBoundary', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

jest.mock('@/components/ui/sonner', () => ({
  Toaster: () => <div data-testid="toaster" />, 
}));

describe('App', () => {
  it('renders app shell and core children', () => {
    const { container } = render(<App />);

    expect(container.querySelector('#careconnect-app')).toBeInTheDocument();
    expect(screen.getByTestId('app-provider')).toBeInTheDocument();
    expect(screen.getByTestId('root-component')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });
});
