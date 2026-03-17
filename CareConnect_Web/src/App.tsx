import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AccessibilityProvider } from './contexts/AccessibilityContext';
import { AuthProvider } from './contexts/AuthContext';
import { MedicationProvider } from './contexts/MedicationContext';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { UpdatePrompt } from './components/UpdatePrompt';
import { OfflineIndicator } from './components/OfflineIndicator';

function App() {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        <MedicationProvider>
          <RouterProvider router={router} />
          <PWAInstallPrompt />
          <UpdatePrompt />
          <OfflineIndicator />
        </MedicationProvider>
      </AccessibilityProvider>
    </AuthProvider>
  );
}

export default App;