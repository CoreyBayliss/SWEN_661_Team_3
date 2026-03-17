import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/globals.css'
import App from './App.tsx'
import { register } from './utils/serviceWorkerRegistration'

// Mount CareConnect application
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Register service worker for PWA functionality
register({
  onSuccess: () => {
    console.log('[CareConnect] App is ready for offline use');
  },
  onUpdate: (registration) => {
    console.log('[CareConnect] New version available');
    // The UpdatePrompt component will handle showing the update UI
  },
  onOffline: () => {
    console.log('[CareConnect] App is now offline');
  },
  onOnline: () => {
    console.log('[CareConnect] App is back online');
  },
});