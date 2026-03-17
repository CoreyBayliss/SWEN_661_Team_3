import { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Check if user has dismissed the prompt before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    const dismissedTime = dismissed ? parseInt(dismissed) : 0;
    const weekInMs = 7 * 24 * 60 * 60 * 1000;
    
    // Show prompt again after a week
    if (dismissed && Date.now() - dismissedTime < weekInMs) {
      return;
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      if (isIOS) {
        setShowIOSInstructions(true);
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's response
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  const handleIOSDismiss = () => {
    setShowIOSInstructions(false);
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show anything if already installed
  if (isInstalled) {
    return null;
  }

  // iOS Installation Instructions
  if (showIOSInstructions) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center p-4">
        <Card className="bg-white p-6 max-w-md w-full rounded-t-2xl md:rounded-2xl animate-slide-up">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Install CareConnect</h3>
                <p className="text-sm text-gray-600">Add to Home Screen</p>
              </div>
            </div>
            <button
              onClick={handleIOSDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              To install CareConnect on your iPhone or iPad:
            </p>
            
            <ol className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 shrink-0">1.</span>
                <span>
                  Tap the <strong>Share</strong> button in Safari{' '}
                  <span className="inline-block w-5 h-5 align-middle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                      <polyline points="16 6 12 2 8 6" />
                      <line x1="12" y1="2" x2="12" y2="15" />
                    </svg>
                  </span>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 shrink-0">2.</span>
                <span>
                  Scroll down and tap <strong>"Add to Home Screen"</strong>
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-blue-600 shrink-0">3.</span>
                <span>
                  Tap <strong>"Add"</strong> in the top right corner
                </span>
              </li>
            </ol>
          </div>

          <Button
            onClick={handleIOSDismiss}
            className="w-full"
            variant="secondary"
          >
            Got it
          </Button>
        </Card>
      </div>
    );
  }

  // Regular install prompt
  if (!showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 md:bottom-4 md:left-4 md:right-auto z-50 p-4 md:p-0">
      <Card className="bg-white shadow-2xl rounded-t-2xl md:rounded-2xl overflow-hidden max-w-md animate-slide-up">
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                <Download className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Install CareConnect</h3>
                <p className="text-sm text-gray-600">Access your health info faster</p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3 mb-6 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-green-600">✓</span>
              <span>Works offline - access meds anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-green-600">✓</span>
              <span>Faster loading and better performance</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-green-600">✓</span>
              <span>Home screen access like a native app</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 text-green-600">✓</span>
              <span>Push notifications for reminders</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={handleDismiss}
              variant="secondary"
              className="flex-1"
            >
              Not now
            </Button>
            <Button
              onClick={handleInstallClick}
              variant="default"
              className="flex-1"
            >
              Install
            </Button>
          </div>
        </div>

        {/* Bottom safe area for iOS */}
        <div className="h-[env(safe-area-inset-bottom)] bg-white md:hidden" />
      </Card>
    </div>
  );
}
