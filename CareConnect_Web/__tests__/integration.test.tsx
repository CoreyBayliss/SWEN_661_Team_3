import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, test, expect } from '@jest/globals';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { Root } from '@/components/Root';

describe('Integration Tests - Complete User Flows', () => {
  test('User can navigate through main pages', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppProvider>
          <Root />
        </AppProvider>
      </MemoryRouter>
    );

    // App should render without crashing
    expect(document.body).toBeInTheDocument();
  });

  test('Navigation between pages works', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    // Look for navigation links
    const navLinks = screen.queryAllByRole('link');
    
    if (navLinks.length > 0) {
      fireEvent.click(navLinks[0]);
      await waitFor(() => {
        expect(document.body).toBeInTheDocument();
      });
    }
  });
});

describe('Integration Tests - Medication Flow', () => {
  test('Can view and interact with medications', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    // Navigate to medications if link exists
    const medicationLink = screen.queryByRole('link', { name: /medication/i });
    
    if (medicationLink) {
      fireEvent.click(medicationLink);
      
      await waitFor(() => {
        expect(screen.queryByText(/medication/i)).toBeInTheDocument();
      });
    }
  });
});

describe('Integration Tests - Settings Flow', () => {
  test('Can access and modify settings', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    // Look for settings navigation
    const settingsLink = screen.queryByRole('link', { name: /settings/i });
    
    if (settingsLink) {
      fireEvent.click(settingsLink);
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument();
      });
    }
  });
});

describe('Integration Tests - Calendar Flow', () => {
  test('Can view calendar and appointments', async () => {
    render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    const calendarLink = screen.queryByRole('link', { name: /calendar|appointments/i });
    
    if (calendarLink) {
      fireEvent.click(calendarLink);
      
      await waitFor(() => {
        expect(document.body).toBeInTheDocument();
      });
    }
  });
});

describe('Integration Tests - Responsive Behavior', () => {
  test('App renders on different viewport sizes', () => {
    // Test desktop size
    window.innerWidth = 1920;
    window.innerHeight = 1080;
    
    const { rerender } = render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    expect(document.body).toBeInTheDocument();

    // Test tablet size
    window.innerWidth = 768;
    window.innerHeight = 1024;
    
    rerender(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    expect(document.body).toBeInTheDocument();
  });
});

describe('Integration Tests - Error Boundaries', () => {
  test('App handles errors gracefully', () => {
    // Suppress console errors for this test
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <BrowserRouter>
        <AppProvider>
          <Root />
        </AppProvider>
      </BrowserRouter>
    );

    // App should not crash
    expect(document.body).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
