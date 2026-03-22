import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import { MedicationProvider } from '@contexts/MedicationContext';
import { AccessibilityProvider } from '@contexts/AccessibilityContext';

// All providers wrapper
function AllProviders({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AccessibilityProvider>
          <MedicationProvider>
            {children}
          </MedicationProvider>
        </AccessibilityProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

// Custom render with all providers
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Custom render with specific providers
export function renderWithAuth(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { 
    wrapper: ({ children }) => (
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    ),
    ...options 
  });
}

export function renderWithMedication(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { 
    wrapper: ({ children }) => (
      <BrowserRouter>
        <MedicationProvider>{children}</MedicationProvider>
      </BrowserRouter>
    ),
    ...options 
  });
}

export function renderWithAccessibility(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { 
    wrapper: ({ children }) => (
      <BrowserRouter>
        <AccessibilityProvider>{children}</AccessibilityProvider>
      </BrowserRouter>
    ),
    ...options 
  });
}

export function renderWithRouter(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { 
    wrapper: BrowserRouter,
    ...options 
  });
}

// Re-export everything from testing-library
export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
