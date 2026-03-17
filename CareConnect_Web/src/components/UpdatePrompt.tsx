import { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';

export function UpdatePrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.addEventListener('updatefound', () => {
          const newWorker = reg.installing;
          if (!newWorker) return;

          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              setRegistration(reg);
              setShowPrompt(true);
            }
          });
        });
      });
    }
  }, []);

  const handleUpdate = () => {
    if (registration && registration.waiting) {
      // Tell the service worker to skip waiting
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      
      // Reload the page when the new service worker is activated
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          refreshing = true;
          window.location.reload();
        }
      });
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 z-40 max-w-md md:ml-auto">
      <div className="bg-blue-600 text-white rounded-lg shadow-2xl p-4 animate-slide-up">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Update Available</h3>
            <p className="text-sm text-blue-100 mb-3">
              A new version of CareConnect is available with improvements and bug fixes.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleDismiss}
                variant="secondary"
                size="sm"
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                Later
              </Button>
              <Button
                onClick={handleUpdate}
                variant="default"
                size="sm"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Update Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
