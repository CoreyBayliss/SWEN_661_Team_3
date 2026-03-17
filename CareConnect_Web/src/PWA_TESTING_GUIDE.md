# CareConnect PWA Testing & Deployment Guide

## 🧪 Complete Testing Checklist

### Pre-Deployment Testing

Before deploying CareConnect as a PWA, test all features thoroughly across devices and browsers.

---

## 1. Local Development Testing

### Setup

```bash
# Install dependencies
npm install

# Build for production (service workers only work in production mode)
npm run build

# Serve production build locally
npx serve -s dist -l 3000
```

Or use a local HTTPS server (required for some PWA features):

```bash
# Using http-server with SSL
npx http-server dist -p 3000 -S -C cert.pem -K key.pem
```

### Generate Local SSL Certificate

```bash
# macOS/Linux
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem

# Windows (use Git Bash or WSL)
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

---

## 2. Manifest Testing

### Chrome DevTools

1. Open `chrome://inspect/#service-workers`
2. Navigate to your app at `https://localhost:3000`
3. Open DevTools → **Application** tab
4. Select **Manifest** in sidebar

**Verify:**
- ✅ Manifest loads without errors
- ✅ App name displays correctly
- ✅ Icons load (all sizes)
- ✅ Theme color matches design (#2563eb)
- ✅ Start URL is correct
- ✅ Display mode is "standalone"
- ✅ Shortcuts are configured (3 total)

### PWA Builder Validation

1. Visit [PWABuilder.com](https://www.pwabuilder.com/)
2. Enter your deployed URL
3. Review manifest validation results
4. Fix any warnings or errors
5. Download validation report

### Manual Manifest Check

```bash
# Verify manifest is accessible
curl https://localhost:3000/manifest.json

# Should return valid JSON with all fields
```

---

## 3. Service Worker Testing

### Registration Check

**Chrome DevTools:**
1. Application → Service Workers
2. Verify status: "Activated and running"
3. Check scope: "/" 
4. Update on reload: ✅ (during development)

**Firefox:**
1. about:debugging#/runtime/this-firefox
2. Check "Service Workers" section
3. Verify CareConnect worker is registered

### Cache Validation

**Check Cached Assets:**
1. Application → Cache Storage
2. Verify cache exists: `careconnect-v1.0.0`
3. Expand cache, check assets:
   - `/` (index.html)
   - `/manifest.json`
   - CSS files
   - JS bundles
   - Images (if visited)

**Test Cache Strategies:**

```javascript
// In browser console:

// 1. Test cache-first (static assets)
fetch('/styles/globals.css').then(r => console.log('CSS:', r));

// 2. Test network-first (API)
fetch('/api/medications').then(r => console.log('API:', r));

// 3. Check cache manually
caches.open('careconnect-v1.0.0').then(cache => {
  cache.keys().then(keys => console.log('Cached:', keys.length));
});
```

### Offline Testing

**Chrome DevTools Method:**
1. Application → Service Workers
2. Check ☑️ "Offline"
3. Navigate through app
4. Verify all routes load
5. Check for offline indicator

**Network Throttling:**
1. Network tab → Throttling dropdown
2. Select "Offline"
3. Test app functionality
4. Try "Slow 3G" for slow connection simulation

**Airplane Mode (Real Device):**
1. Enable airplane mode on phone/tablet
2. Open app (must be installed or cached)
3. Navigate all routes
4. Test creating medications
5. Test logging wellness
6. Verify queue for sync when online

### Update Testing

**Simulate Update:**

1. Change version in `service-worker.js`:
```javascript
const CACHE_VERSION = 'v1.0.1'; // Increment
```

2. Rebuild and refresh:
```bash
npm run build
npx serve -s dist
```

3. Hard refresh page (Ctrl+Shift+R)
4. Verify update prompt appears
5. Click "Update Now"
6. Verify new version loads
7. Check new cache created

---

## 4. Install Experience Testing

### Desktop (Chrome/Edge)

**Standard Install Flow:**
1. Visit app in Chrome
2. Wait 3 seconds for install prompt
3. Verify prompt appears (bottom-left)
4. Click "Install"
5. Verify install dialog from browser
6. Click "Install" in dialog
7. App opens in standalone window
8. Check omnibox shows app icon
9. Verify app in Applications folder (macOS) or Start Menu (Windows)

**Manual Install:**
1. Click ⚙️ in Chrome address bar
2. Select "Install CareConnect..."
3. Confirm installation
4. Verify standalone window opens

**Verify Installation:**
- App icon appears on desktop/applications
- Can pin to dock/taskbar
- Opens in standalone mode (no browser UI)
- Theme color applies to window
- Can uninstall from OS settings

### Mobile Android

**Install Flow:**
1. Visit app in Chrome mobile
2. Wait for install banner (3 seconds)
3. Tap "Install"
4. Android install dialog appears
5. Tap "Install" in dialog
6. App icon adds to home screen
7. Open from home screen
8. Verify standalone mode (no browser UI)
9. Check splash screen (icon + theme color)

**Manual Install:**
1. Tap ⋮ menu in Chrome
2. Select "Add to Home screen"
3. Edit name if needed
4. Tap "Add"
5. Icon appears on home screen

**Verify Installation:**
- App in app drawer
- Can long-press for app info
- Shows in recent apps
- Splash screen displays
- Status bar uses theme color
- Can uninstall like native app

### Mobile iOS (Safari)

**Custom Instructions:**
1. Visit app in Safari
2. Wait for iOS instructions modal
3. Follow 3-step guide:
   - Tap Share button
   - Scroll to "Add to Home Screen"
   - Tap "Add"
4. Icon appears on home screen
5. Open from home screen
6. Verify standalone mode
7. Check splash screen

**Verify Installation:**
- Icon on home screen
- Opens without Safari UI
- Status bar matches theme
- Can move/organize icon
- Shows in app library
- Can delete from home screen

---

## 5. Push Notification Testing

### Request Permission

**Test in Settings Page:**
1. Navigate to `/settings`
2. Find "Notifications" section
3. Click "Enable Notifications"
4. Browser asks for permission
5. Click "Allow"
6. Verify permission granted

**Check Permission:**
```javascript
// In console
console.log(Notification.permission); // "granted"
```

### Test Push (Development)

**Chrome DevTools:**
1. Application → Service Workers
2. Find your service worker
3. In "Push" field, enter JSON:
```json
{
  "title": "Medication Reminder",
  "body": "Time to take Lisinopril 10mg",
  "tag": "med-reminder",
  "medicationId": "123",
  "url": "/dashboard"
}
```
4. Click "Push" button
5. Notification should appear
6. Click notification
7. Verify opens to /dashboard

**Test Notification Actions:**
1. Send notification with actions
2. Click "Mark as Taken"
3. Check API call sent
4. Click "Snooze 15min"
5. Verify snooze logic

### Test Push (Production)

**Backend Integration Required:**

```javascript
// Server-side (Node.js example)
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:support@careconnect.app',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// Send to subscribed user
webpush.sendNotification(subscription, JSON.stringify({
  title: 'Medication Reminder',
  body: 'Time to take Lisinopril 10mg',
  icon: '/icons/icon-192x192.png',
  badge: '/icons/badge-72x72.png',
  tag: 'medication-123',
  medicationId: '123',
  url: '/dashboard',
  actions: [
    { action: 'taken', title: 'Mark as Taken' },
    { action: 'snooze', title: 'Snooze 15min' }
  ]
}));
```

---

## 6. Background Sync Testing

### Register Sync

```javascript
// In app (when offline action occurs)
if ('serviceWorker' in navigator && 'sync' in ServiceWorkerRegistration.prototype) {
  navigator.serviceWorker.ready.then(registration => {
    return registration.sync.register('sync-medications');
  });
}
```

### Test Sync Flow

1. Enable offline mode
2. Add/edit medication
3. Verify queued for sync
4. Disable offline mode
5. Check DevTools console for sync event
6. Verify data synced to server

**Chrome DevTools:**
1. Application → Service Workers
2. Check sync events in logs
3. Application → Background Services → Background Sync
4. View registered sync tags

---

## 7. Performance Testing

### Lighthouse Audit

**Run Audit:**
1. Open Chrome DevTools
2. Lighthouse tab
3. Select categories:
   - ✅ Performance
   - ✅ Progressive Web App
   - ✅ Accessibility
   - ✅ Best Practices
   - ✅ SEO
4. Device: Mobile & Desktop
5. Click "Generate report"

**Target Scores:**
- Performance: ≥ 90
- PWA: 100
- Accessibility: 100
- Best Practices: ≥ 95
- SEO: ≥ 90

**Key Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Speed Index: < 3.5s
- Total Blocking Time: < 200ms
- Cumulative Layout Shift: < 0.1

### Fix Common Issues

**Performance:**
- Minimize JS bundle size
- Lazy load routes
- Optimize images
- Enable compression
- Use CDN for assets

**PWA:**
- Valid manifest
- Service worker registered
- Works offline
- HTTPS enabled
- Installable

**Accessibility:**
- Left-hand framework implemented ✅
- Keyboard navigation ✅
- Screen reader support ✅
- Color contrast ✅
- Focus indicators ✅

---

## 8. Cross-Browser Testing

### Required Browsers

| Browser | Desktop | Mobile | Priority |
|---------|---------|--------|----------|
| Chrome | ✅ | ✅ | High |
| Safari | ✅ | ✅ | High |
| Firefox | ✅ | ✅ | Medium |
| Edge | ✅ | ✅ | Medium |
| Samsung Internet | - | ✅ | Low |

### Test Matrix

For each browser/device:
1. App loads correctly
2. Service worker registers
3. Can install (or iOS instructions)
4. Offline mode works
5. UI renders properly
6. Accessibility features work
7. Animations smooth
8. Touch/click interactions
9. Form inputs work
10. Navigation functions

### Browser-Specific Issues

**Safari/iOS:**
- No beforeinstallprompt event (use instructions)
- Limited push notification support
- Service worker restrictions
- viewport-fit=cover for notch

**Firefox:**
- Install requires manual "Add to Home Screen"
- Different dev tools layout
- Background sync limited support

**Samsung Internet:**
- Good PWA support
- Check ambient badge in menu
- Test Samsung DeX mode

---

## 9. Real Device Testing

### iOS Testing

**Required Tests:**
1. iPhone SE (small screen)
2. iPhone 14 Pro (notch)
3. iPad (tablet view)

**Check:**
- Safe area insets (notch/home bar)
- Touch targets (≥ 44×44pt)
- Left-hand accessibility
- Landscape orientation
- Dark mode (if supported)
- VoiceOver navigation
- Dynamic type scaling

### Android Testing

**Required Tests:**
1. Small phone (360×640)
2. Large phone (411×823)
3. Tablet (1024×768)

**Check:**
- Material You theming
- Edge-to-edge layout
- Back button behavior
- Share sheet integration
- TalkBack navigation
- Font scaling
- Split screen mode

### Accessibility Hardware

**Test with:**
- Screen readers (VoiceOver, TalkBack)
- Switch control
- Voice control
- High contrast mode
- Large text settings
- Reduced motion
- One-handed mode

---

## 10. Production Deployment

### Pre-Deploy Checklist

- [ ] All icons generated and optimized
- [ ] Screenshots created
- [ ] Manifest validated
- [ ] Service worker tested
- [ ] Lighthouse score ≥ 90 (all categories)
- [ ] Cross-browser tested
- [ ] Mobile device tested (iOS + Android)
- [ ] Offline mode verified
- [ ] Install flow tested
- [ ] Push notifications configured
- [ ] VAPID keys generated
- [ ] Analytics integrated
- [ ] Error logging set up
- [ ] HTTPS configured
- [ ] CDN configured (optional)
- [ ] Compression enabled

### Deployment Steps

1. **Build for Production**
```bash
npm run build
```

2. **Test Build Locally**
```bash
npx serve -s dist
```

3. **Deploy to Hosting**
   - Vercel
   - Netlify
   - Firebase Hosting
   - AWS S3 + CloudFront
   - Azure Static Web Apps

4. **Configure Server**
   - Enable HTTPS (required)
   - Set cache headers
   - Enable compression (gzip/brotli)
   - Configure SPA routing (fallback to index.html)
   - Set security headers

5. **Example: Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Create `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }],
  "headers": [
    {
      "source": "/service-worker.js",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=0, must-revalidate" }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

6. **Verify Deployment**
   - Visit production URL
   - Run Lighthouse audit
   - Test install flow
   - Check service worker registration
   - Test offline mode
   - Verify analytics tracking

---

## 11. Post-Deploy Monitoring

### Key Metrics to Track

**Installation:**
- Install rate (installs / visitors)
- Install abandonment
- Uninstall rate
- Installed user retention

**Engagement:**
- Standalone vs browser usage
- Session duration
- Pages per session
- Return visitor rate

**Performance:**
- Service worker hit rate
- Cache hit/miss ratio
- Average load time
- Offline usage %

**Errors:**
- Service worker errors
- Failed cache operations
- Push notification failures
- API errors while offline

### Analytics Setup

**Google Analytics 4:**

```javascript
// In App.tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track install
if (window.matchMedia('(display-mode: standalone)').matches) {
  ReactGA.event({ category: 'PWA', action: 'Installed' });
}

// Track service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.ready.then(() => {
    ReactGA.event({ category: 'PWA', action: 'Service Worker Ready' });
  });
}
```

**Custom Events:**
```javascript
// Track offline usage
window.addEventListener('offline', () => {
  ReactGA.event({ category: 'PWA', action: 'Went Offline' });
});

// Track install prompt
window.addEventListener('beforeinstallprompt', () => {
  ReactGA.event({ category: 'PWA', action: 'Install Prompt Shown' });
});

// Track actual install
window.addEventListener('appinstalled', () => {
  ReactGA.event({ category: 'PWA', action: 'App Installed' });
});
```

### Error Logging

**Sentry Setup:**

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Service worker errors
navigator.serviceWorker.addEventListener('error', (error) => {
  Sentry.captureException(error);
});
```

---

## 12. Troubleshooting Common Issues

### Issue: Service Worker Not Updating

**Symptoms:**
- Old version keeps loading
- Changes don't appear

**Solutions:**
1. Increment cache version in service-worker.js
2. Hard refresh (Ctrl+Shift+R)
3. Clear site data (DevTools → Application → Clear storage)
4. Unregister service worker manually
5. Check "Update on reload" in DevTools

### Issue: Install Prompt Not Showing

**Causes:**
- Already installed
- Not HTTPS
- Invalid manifest
- Browser doesn't support
- User dismissed recently

**Solutions:**
1. Test in incognito mode
2. Verify HTTPS enabled
3. Validate manifest in DevTools
4. Clear localStorage (7-day cooldown)
5. Try different browser

### Issue: Offline Mode Not Working

**Causes:**
- Service worker not registered
- Paths not cached
- Network-only routes

**Solutions:**
1. Check service worker status (DevTools)
2. Verify cache includes needed files
3. Add missing routes to cache
4. Test in DevTools offline mode first
5. Check browser console for errors

### Issue: Push Notifications Failing

**Causes:**
- Permission denied
- No VAPID keys
- Subscription expired
- Browser doesn't support

**Solutions:**
1. Check permission status
2. Generate and configure VAPID keys
3. Resubscribe user
4. Test in supported browser
5. Check notification blocked in OS settings

---

## 13. Maintenance & Updates

### Regular Tasks

**Weekly:**
- Monitor error logs
- Check analytics for issues
- Review user feedback

**Monthly:**
- Update dependencies
- Run security audit
- Performance audit
- Test on latest browsers

**Quarterly:**
- Major version updates
- Design refresh if needed
- New features
- User testing session

### Updating Service Worker

1. Make changes to code
2. Increment CACHE_VERSION
3. Test locally
4. Deploy
5. Users see update prompt
6. Monitor adoption rate

### Deprecating Old Versions

```javascript
// service-worker.js - Force update for critical fixes
self.addEventListener('install', (event) => {
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  // Delete all caches, force fresh install
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(names.map(name => caches.delete(name)));
    })
  );
  return self.clients.claim();
});
```

---

## ✅ Final Checklist

Before launching CareConnect PWA:

- [ ] Manifest complete and validated
- [ ] All icons created (19 total)
- [ ] Screenshots created (3 required)
- [ ] Service worker tested thoroughly
- [ ] Offline functionality verified
- [ ] Install experience tested (all platforms)
- [ ] Push notifications configured
- [ ] Lighthouse score ≥ 90 across all categories
- [ ] Cross-browser testing complete
- [ ] Real device testing (iOS + Android)
- [ ] Accessibility tested with screen readers
- [ ] Performance optimized
- [ ] Analytics integrated
- [ ] Error logging configured
- [ ] HTTPS enabled
- [ ] Security headers set
- [ ] Backup/rollback plan in place
- [ ] Documentation updated
- [ ] Team trained on PWA features

---

**CareConnect is ready to launch as a production PWA!** 🚀

Users can now install it, use it offline, and enjoy a native app-like healthcare experience.
