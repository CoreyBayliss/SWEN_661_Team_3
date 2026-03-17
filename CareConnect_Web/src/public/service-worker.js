// CareConnect Service Worker
// Offline-first strategy for healthcare app

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `careconnect-${CACHE_VERSION}`;

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/styles/globals.css',
];

// Routes that should work offline (app shell)
const APP_SHELL_ROUTES = [
  '/',
  '/dashboard',
  '/medications',
  '/medications/add',
  '/messages',
  '/wellness',
  '/profile',
  '/settings',
  '/login',
];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/api\/medications/,
  /\/api\/appointments/,
  /\/api\/wellness/,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('[ServiceWorker] Skip waiting');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name.startsWith('careconnect-') && name !== CACHE_NAME)
            .map((name) => {
              console.log('[ServiceWorker] Deleting old cache:', name);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('[ServiceWorker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event - implement offline strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome extension requests
  if (url.protocol === 'chrome-extension:') {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  // Strategy 1: Network First for API calls (with cache fallback)
  if (isAPIRequest(url)) {
    return networkFirstStrategy(request);
  }

  // Strategy 2: Cache First for static assets
  if (isStaticAsset(url)) {
    return cacheFirstStrategy(request);
  }

  // Strategy 3: Stale While Revalidate for app routes
  if (isAppRoute(url)) {
    return staleWhileRevalidateStrategy(request);
  }

  // Default: Network with cache fallback
  return networkFirstStrategy(request);
}

// Check if request is an API call
function isAPIRequest(url) {
  return url.pathname.startsWith('/api/') || 
         API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Check if request is a static asset
function isStaticAsset(url) {
  const staticExtensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.woff', '.woff2', '.ttf'];
  return staticExtensions.some(ext => url.pathname.endsWith(ext));
}

// Check if request is an app route
function isAppRoute(url) {
  return url.origin === self.location.origin &&
         !url.pathname.startsWith('/api/') &&
         !isStaticAsset(url);
}

// Network First Strategy (for API calls)
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[ServiceWorker] Network failed, trying cache:', request.url);
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for API requests
    return new Response(
      JSON.stringify({
        offline: true,
        error: 'Network unavailable',
        message: 'You are currently offline. Some features may be limited.',
      }),
      {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// Cache First Strategy (for static assets)
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[ServiceWorker] Failed to fetch:', request.url);
    throw error;
  }
}

// Stale While Revalidate Strategy (for app routes)
async function staleWhileRevalidateStrategy(request) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      const cache = caches.open(CACHE_NAME);
      cache.then(c => c.put(request, networkResponse.clone()));
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, but we might have a cache
    return cachedResponse;
  });
  
  // Return cached version immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
}

// Background Sync for medication reminders
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Background sync:', event.tag);
  
  if (event.tag === 'sync-medications') {
    event.waitUntil(syncMedications());
  }
  
  if (event.tag === 'sync-wellness') {
    event.waitUntil(syncWellness());
  }
});

async function syncMedications() {
  try {
    // Sync pending medication updates
    console.log('[ServiceWorker] Syncing medications...');
    // Implementation would sync with backend
    return Promise.resolve();
  } catch (error) {
    console.error('[ServiceWorker] Medication sync failed:', error);
    throw error;
  }
}

async function syncWellness() {
  try {
    // Sync pending wellness logs
    console.log('[ServiceWorker] Syncing wellness data...');
    // Implementation would sync with backend
    return Promise.resolve();
  } catch (error) {
    console.error('[ServiceWorker] Wellness sync failed:', error);
    throw error;
  }
}

// Push notifications for medication reminders
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push received');
  
  const data = event.data ? event.data.json() : {};
  
  const options = {
    body: data.body || 'Time to take your medication',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'medication-reminder',
    requireInteraction: true,
    actions: [
      {
        action: 'taken',
        title: 'Mark as Taken',
        icon: '/icons/action-check.png',
      },
      {
        action: 'snooze',
        title: 'Snooze 15min',
        icon: '/icons/action-snooze.png',
      },
    ],
    data: {
      url: data.url || '/dashboard',
      medicationId: data.medicationId,
    },
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title || 'Medication Reminder', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[ServiceWorker] Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'taken') {
    // Mark medication as taken
    event.waitUntil(
      fetch('/api/medications/mark-taken', {
        method: 'POST',
        body: JSON.stringify({
          medicationId: event.notification.data.medicationId,
          timestamp: new Date().toISOString(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  } else if (event.action === 'snooze') {
    // Snooze notification for 15 minutes
    console.log('[ServiceWorker] Snoozing medication reminder');
  }
  
  // Open the app
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/dashboard')
  );
});

// Message handler for client communication
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Message received:', event.data);
  
  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data.type === 'CACHE_URLS') {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(event.data.urls);
      })
    );
  }
  
  if (event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.delete(CACHE_NAME).then(() => {
        return caches.open(CACHE_NAME);
      })
    );
  }
});
