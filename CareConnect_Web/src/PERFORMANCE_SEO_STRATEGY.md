# CareConnect - Web Performance & SEO Strategy

## Table of Contents
- [Performance Budgets](#performance-budgets)
- [Image Optimization Strategy](#image-optimization-strategy)
- [Code Splitting Approach](#code-splitting-approach)
- [Lazy Loading Plan](#lazy-loading-plan)
- [SEO Meta Tags and OpenGraph](#seo-meta-tags-and-opengraph)
- [Sitemap Structure](#sitemap-structure)
- [Performance Monitoring](#performance-monitoring)
- [Healthcare-Specific Considerations](#healthcare-specific-considerations)

---

## Performance Budgets

### Target Performance Metrics

#### Mobile (3G Connection)
- **First Contentful Paint (FCP)**: < 1.8 seconds
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **Time to Interactive (TTI)**: < 3.8 seconds
- **First Input Delay (FID)**: < 100 ms
- **Cumulative Layout Shift (CLS)**: < 0.1
- **Total Blocking Time (TBT)**: < 300 ms

#### Desktop/Tablet (Fast Connection)
- **First Contentful Paint (FCP)**: < 1.0 second
- **Largest Contentful Paint (LCP)**: < 1.5 seconds
- **Time to Interactive (TTI)**: < 2.5 seconds
- **First Input Delay (FID)**: < 50 ms
- **Cumulative Layout Shift (CLS)**: < 0.05
- **Total Blocking Time (TBT)**: < 150 ms

### Bundle Size Budgets

#### JavaScript Bundles
```
Main Bundle (Critical Path):
- Initial JS: < 150 KB (gzipped)
- Total JS: < 500 KB (gzipped)
- Vendor Bundle: < 200 KB (gzipped)

Per-Route Chunks:
- Dashboard/Today View: < 50 KB (gzipped)
- Medications List: < 40 KB (gzipped)
- Medication Detail: < 35 KB (gzipped)
- Add/Edit Medication: < 45 KB (gzipped)
- Refill Request: < 30 KB (gzipped)
- Messages/Communications: < 40 KB (gzipped)
- Wellness Logging: < 35 KB (gzipped)
- Settings: < 40 KB (gzipped)
- Profile: < 30 KB (gzipped)
- Login/Auth: < 30 KB (gzipped)
- Onboarding: < 35 KB (gzipped)
```

#### CSS Bundles
```
Critical CSS (inline): < 14 KB
Main Stylesheet: < 50 KB (gzipped)
Component Styles: < 30 KB (gzipped)
Total CSS: < 100 KB (gzipped)
```

#### Assets
```
Fonts:
- Total Font Files: < 100 KB (WOFF2 format)
- Max 2 font families with 2-3 weights each

Images:
- Hero/Marketing Images: < 150 KB each (WebP)
- UI Icons (SVG): < 5 KB each
- Avatar/Profile Images: < 50 KB each (WebP)
- Total Images (first load): < 300 KB

Icons:
- Icon sprite/font: < 30 KB
- Individual SVG icons: < 2 KB each
```

#### Total Page Weight
```
Homepage/Onboarding: < 500 KB (initial load)
Dashboard: < 400 KB
Medication Pages: < 350 KB
Settings/Profile: < 300 KB
```

### Monitoring Thresholds

Set up alerts when:
- Any bundle exceeds 110% of budget
- LCP exceeds 2.5s for >5% of users
- CLS exceeds 0.1 for >5% of users
- FID exceeds 100ms for >5% of users

---

## Image Optimization Strategy

### Image Format Selection

```javascript
// Image Format Decision Tree
const getOptimalFormat = (useCase) => {
  switch(useCase) {
    case 'medication-photos':
      return 'WebP with JPEG fallback';
    case 'icons':
      return 'SVG (inline or sprite)';
    case 'avatars':
      return 'WebP with PNG fallback';
    case 'screenshots':
      return 'WebP with PNG fallback';
    case 'illustrations':
      return 'SVG preferred, WebP if complex';
    default:
      return 'WebP with appropriate fallback';
  }
};
```

### Responsive Images Implementation

```jsx
// Example: Medication Image with Responsive Sizes
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcSet="
      /images/medications/aspirin-large.webp 1x,
      /images/medications/aspirin-large@2x.webp 2x
    " 
    type="image/webp"
  />
  <source 
    media="(min-width: 768px)" 
    srcSet="
      /images/medications/aspirin-medium.webp 1x,
      /images/medications/aspirin-medium@2x.webp 2x
    " 
    type="image/webp"
  />
  <source 
    srcSet="
      /images/medications/aspirin-small.webp 1x,
      /images/medications/aspirin-small@2x.webp 2x
    " 
    type="image/webp"
  />
  <img 
    src="/images/medications/aspirin-medium.jpg" 
    alt="Aspirin 81mg tablet"
    loading="lazy"
    width="300"
    height="200"
  />
</picture>
```

### Image Compression Guidelines

#### Compression Targets
```
WebP Images:
- Quality: 80-85 for photos
- Quality: 90-95 for UI elements
- Use lossy compression for photos
- Use lossless for screenshots with text

JPEG Fallbacks:
- Quality: 75-80
- Progressive encoding enabled
- Chroma subsampling: 4:2:0

PNG (when necessary):
- Use pngquant or similar
- Target: 256 colors or fewer
- Remove metadata

SVG:
- Minify and optimize with SVGO
- Remove unnecessary attributes
- Inline small icons (< 2 KB)
- Use sprite sheets for icon sets
```

### Image Sizing Matrix

```
Mobile (320px-767px):
- Hero images: 750px width
- Card thumbnails: 300px width
- Full-width images: 750px width
- Profile avatars: 120px width

Tablet (768px-1023px):
- Hero images: 1024px width
- Card thumbnails: 400px width
- Full-width images: 1024px width
- Profile avatars: 150px width

Desktop (1024px+):
- Hero images: 1920px width
- Card thumbnails: 500px width
- Full-width images: 1440px width
- Profile avatars: 200px width

High-DPI (@2x):
- Provide 2x versions for all raster images
- Serve based on device pixel ratio
```

### Lazy Loading Strategy

```jsx
// Native lazy loading for images below fold
<img 
  src="/images/medication.webp" 
  alt="Description"
  loading="lazy"
  decoding="async"
  width="300"
  height="200"
/>

// Eager loading for above-fold critical images
<img 
  src="/images/hero-dashboard.webp" 
  alt="Dashboard"
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="800"
/>
```

### Preloading Critical Images

```html
<!-- In index.html for critical above-fold images -->
<link 
  rel="preload" 
  as="image" 
  href="/images/hero-dashboard.webp" 
  type="image/webp"
  fetchpriority="high"
/>
```

---

## Code Splitting Approach

### Route-Based Splitting

CareConnect uses React Router with automatic code splitting for each route:

```typescript
// routes.tsx - Current Implementation
import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";

// Core layout loaded immediately
import { RootLayout } from "./components/layouts/RootLayout";

// Route components are already split by the bundler
// Each page is a separate chunk
const routes = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: OnboardingPage },      // Chunk: onboarding
      { path: "login", Component: LoginPage },         // Chunk: login
      { path: "dashboard", Component: DashboardPage }, // Chunk: dashboard
      { path: "medications", Component: MedicationsPage }, // Chunk: medications
      // ... etc
    ]
  }
];
```

### Component-Level Splitting

Split large components that aren't always visible:

```typescript
// components/MedicationDetail.tsx
import { lazy, Suspense } from 'react';

// Split heavy chart component
const MedicationChart = lazy(() => import('./MedicationChart'));

// Split refill form (only shown when requested)
const RefillForm = lazy(() => import('./RefillForm'));

// Split medication history (below fold)
const MedicationHistory = lazy(() => import('./MedicationHistory'));

export function MedicationDetail() {
  return (
    <div>
      {/* Critical content loads immediately */}
      <MedicationHeader />
      <MedicationDosing />
      
      {/* Chart loads when needed */}
      <Suspense fallback={<ChartSkeleton />}>
        {showChart && <MedicationChart />}
      </Suspense>
      
      {/* History loads lazily */}
      <Suspense fallback={<HistorySkeleton />}>
        <MedicationHistory />
      </Suspense>
    </div>
  );
}
```

### Library Code Splitting

```typescript
// Split heavy libraries used in specific features

// TTS/Speech Recognition (Communications page only)
const SpeechRecognition = lazy(() => 
  import('./utils/speechRecognition')
);

// Chart library (Dashboard/Medication details only)
const ChartsLib = lazy(() => 
  import('recharts').then(module => ({ default: module }))
);

// Date picker (Medication scheduling only)
const DatePicker = lazy(() => 
  import('./components/ui/date-picker')
);

// Motion animations (Onboarding only)
const MotionComponents = lazy(() => 
  import('./components/MotionComponents')
);
```

### Vendor Bundle Strategy

```javascript
// vite.config.js optimization
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          'vendor-react': ['react', 'react-dom', 'react-router'],
          
          // UI library
          'vendor-ui': [
            'lucide-react',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-tabs'
          ],
          
          // Charts (only loaded on dashboard/details)
          'vendor-charts': ['recharts'],
          
          // Date/time utilities
          'vendor-date': ['date-fns'],
          
          // Forms and validation
          'vendor-forms': ['react-hook-form', 'zod']
        }
      }
    },
    
    // Enable tree shaking
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info']
      }
    }
  }
};
```

### Dynamic Imports for Features

```typescript
// Load features on-demand

// Biometric authentication (Settings only)
const loadBiometricAuth = () => 
  import('./features/biometric-auth');

// PWA install prompt (shown once)
const loadPWAPrompt = () => 
  import('./components/PWAInstallPrompt');

// Notification scheduler (Settings)
const loadNotificationScheduler = () => 
  import('./features/notification-scheduler');

// Export functionality (Medications page)
const loadExportFeature = () => 
  import('./features/export-medications');
```

### Preloading Strategy

```typescript
// Preload likely next routes on hover/focus
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const preloadRoutes = {
  '/login': () => import('./pages/DashboardPage'),
  '/dashboard': () => import('./pages/MedicationsPage'),
  '/medications': () => import('./pages/MedicationDetailPage'),
};

export function RoutePreloader() {
  const location = useLocation();
  
  useEffect(() => {
    const preload = preloadRoutes[location.pathname];
    if (preload) {
      // Preload after 2 seconds of idle time
      const timeout = setTimeout(preload, 2000);
      return () => clearTimeout(timeout);
    }
  }, [location]);
  
  return null;
}
```

---

## Lazy Loading Plan

### Priority Levels

```
P0 (Critical - Load Immediately):
- Root layout structure
- Navigation component
- Authentication context
- Current route component (above fold)
- Critical CSS
- Session management

P1 (Important - Load on Interaction/Scroll):
- Below-fold content
- Tab panels (not active)
- Modal dialogs (closed)
- Dropdown menus (collapsed)
- Charts and visualizations

P2 (Nice-to-have - Load on Idle):
- Analytics
- Non-critical third-party scripts
- Background sync
- Service worker updates
- Prefetch next likely routes

P3 (On-demand - Load when explicitly requested):
- Help documentation
- Export features
- Advanced settings
- Debug tools
```

### Component Lazy Loading Matrix

```typescript
// Dashboard Page Example
export function DashboardPage() {
  return (
    <>
      {/* P0: Critical above-fold content */}
      <DashboardHeader />
      <TodaysMedications />
      <UpcomingAppointments />
      
      {/* P1: Below fold - lazy load */}
      <Suspense fallback={<QuickActionsSkeleton />}>
        <LazyQuickActions />
      </Suspense>
      
      {/* P1: Chart - lazy load */}
      <Suspense fallback={<ChartSkeleton />}>
        <LazyAdherenceChart />
      </Suspense>
      
      {/* P2: Recent activity - load on idle */}
      <IdleSuspense fallback={<ActivitySkeleton />}>
        <LazyRecentActivity />
      </IdleSuspense>
      
      {/* P3: Export modal - load when opened */}
      {showExport && (
        <Suspense fallback={<ModalSkeleton />}>
          <LazyExportModal />
        </Suspense>
      )}
    </>
  );
}
```

### Idle Loading Hook

```typescript
// hooks/useIdleLoad.ts
import { useEffect, useState } from 'react';

export function useIdleLoad<T>(
  importFn: () => Promise<{ default: T }>,
  timeout: number = 2000
): T | null {
  const [component, setComponent] = useState<T | null>(null);
  
  useEffect(() => {
    // Wait for idle time or timeout
    const idleCallback = requestIdleCallback || setTimeout;
    
    const id = idleCallback(
      async () => {
        const module = await importFn();
        setComponent(module.default);
      },
      { timeout }
    );
    
    return () => {
      if (typeof cancelIdleCallback !== 'undefined') {
        cancelIdleCallback(id);
      } else {
        clearTimeout(id);
      }
    };
  }, []);
  
  return component;
}

// Usage
function DashboardPage() {
  const Analytics = useIdleLoad(() => import('./Analytics'));
  
  return (
    <div>
      {/* Critical content */}
      <MainContent />
      
      {/* Idle loaded */}
      {Analytics && <Analytics />}
    </div>
  );
}
```

### Image Lazy Loading Implementation

```typescript
// components/LazyImage.tsx
import { useState, useEffect, useRef } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  threshold?: number;
  className?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  placeholder = 'data:image/svg+xml,...',
  threshold = 0.1,
  className 
}: LazyImageProps) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageSrc(src);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => observer.disconnect();
  }, [src, threshold]);
  
  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      onLoad={() => setIsLoaded(true)}
      loading="lazy"
      decoding="async"
    />
  );
}
```

### Font Loading Strategy

```html
<!-- index.html -->
<head>
  <!-- Preload critical fonts -->
  <link 
    rel="preload" 
    href="/fonts/inter-var.woff2" 
    as="font" 
    type="font/woff2" 
    crossorigin
  />
  
  <!-- Font display swap for immediate text rendering -->
  <style>
    @font-face {
      font-family: 'Inter';
      src: url('/fonts/inter-var.woff2') format('woff2');
      font-weight: 100 900;
      font-display: swap; /* Show fallback immediately */
      font-style: normal;
    }
  </style>
</head>
```

### Third-Party Script Loading

```typescript
// utils/loadThirdParty.ts
export async function loadAnalytics() {
  // Only load on idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
      const script = document.createElement('script');
      script.src = 'https://analytics.example.com/script.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }, { timeout: 3000 });
  }
}

// Call after app initialization
setTimeout(loadAnalytics, 3000);
```

---

## SEO Meta Tags and OpenGraph

### Base HTML Template

```html
<!-- index.html - Enhanced SEO -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  
  <!-- Primary Meta Tags -->
  <title>CareConnect - Healthcare Management Made Simple | Medication Tracking & Wellness</title>
  <meta name="title" content="CareConnect - Healthcare Management Made Simple" />
  <meta name="description" content="Comprehensive healthcare management app with medication tracking, appointment reminders, and wellness logging. Features left-hand accessibility for one-handed use." />
  <meta name="keywords" content="healthcare app, medication tracker, medication reminder, wellness app, health management, accessibility, left-handed interface, PWA health app" />
  <meta name="author" content="CareConnect" />
  <meta name="robots" content="index, follow" />
  <meta name="language" content="English" />
  <meta name="revisit-after" content="7 days" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://careconnect.app/" />
  <meta property="og:title" content="CareConnect - Healthcare Management Made Simple" />
  <meta property="og:description" content="Comprehensive healthcare management app with medication tracking, appointment reminders, and wellness logging. Features left-hand accessibility for one-handed use." />
  <meta property="og:image" content="https://careconnect.app/images/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="CareConnect Dashboard showing medication tracking and wellness features" />
  <meta property="og:site_name" content="CareConnect" />
  <meta property="og:locale" content="en_US" />
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://careconnect.app/" />
  <meta name="twitter:title" content="CareConnect - Healthcare Management Made Simple" />
  <meta name="twitter:description" content="Track medications, manage appointments, and log wellness data with our accessible healthcare app." />
  <meta name="twitter:image" content="https://careconnect.app/images/twitter-card.png" />
  <meta name="twitter:image:alt" content="CareConnect app interface" />
  <meta name="twitter:creator" content="@careconnectapp" />
  
  <!-- Mobile Meta Tags -->
  <meta name="theme-color" content="#2563eb" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="CareConnect" />
  <meta name="mobile-web-app-capable" content="yes" />
  <meta name="application-name" content="CareConnect" />
  
  <!-- Microsoft -->
  <meta name="msapplication-TileColor" content="#2563eb" />
  <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
  <meta name="msapplication-config" content="/browserconfig.xml" />
  
  <!-- PWA Manifest -->
  <link rel="manifest" href="/manifest.json" />
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://careconnect.app/" />
  
  <!-- Alternate Languages (if applicable) -->
  <link rel="alternate" hreflang="en" href="https://careconnect.app/" />
  <link rel="alternate" hreflang="es" href="https://careconnect.app/es/" />
  
  <!-- DNS Prefetch -->
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="dns-prefetch" href="https://cdn.careconnect.app" />
  
  <!-- Preconnect -->
  <link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
  
  <!-- Icons -->
  <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
  
  <!-- Schema.org Markup -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CareConnect",
    "url": "https://careconnect.app",
    "description": "Comprehensive healthcare management app with medication tracking, appointment reminders, and wellness logging.",
    "applicationCategory": "HealthApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    },
    "author": {
      "@type": "Organization",
      "name": "CareConnect",
      "url": "https://careconnect.app"
    },
    "featureList": [
      "Medication tracking and reminders",
      "Appointment management",
      "Wellness logging",
      "Left-hand accessibility framework",
      "Offline-first PWA",
      "WCAG 2.1 AA compliant"
    ],
    "screenshot": "https://careconnect.app/screenshots/dashboard.png",
    "softwareVersion": "1.0.0",
    "releaseNotes": "Initial release with comprehensive medication management"
  }
  </script>
  
  <!-- Healthcare Organization Schema -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "CareConnect Healthcare Management",
    "description": "Digital health platform for medication management and wellness tracking",
    "specialty": "Digital Health",
    "about": {
      "@type": "MedicalCondition",
      "name": "Chronic Disease Management"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/main.tsx"></script>
</body>
</html>
```

### Dynamic Meta Tags Component

```typescript
// components/SEOHead.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  type?: string;
  noindex?: boolean;
}

export function SEOHead({ 
  title, 
  description, 
  image = '/images/og-default.png',
  type = 'website',
  noindex = false 
}: SEOProps) {
  const location = useLocation();
  const url = `https://careconnect.app${location.pathname}`;
  
  useEffect(() => {
    // Update title
    document.title = `${title} | CareConnect`;
    
    // Update meta tags
    updateMetaTag('name', 'description', description);
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', url);
    updateMetaTag('property', 'og:image', `https://careconnect.app${image}`);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', `https://careconnect.app${image}`);
    
    // Update canonical
    updateCanonical(url);
    
    // Handle noindex
    if (noindex) {
      updateMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag('name', 'robots', 'index, follow');
    }
  }, [title, description, image, type, url, noindex]);
  
  return null;
}

function updateMetaTag(attr: string, key: string, content: string) {
  let element = document.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateCanonical(url: string) {
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}
```

### Page-Specific SEO

```typescript
// pages/DashboardPage.tsx
export function DashboardPage() {
  return (
    <>
      <SEOHead
        title="Dashboard - Today's Medications & Appointments"
        description="View today's medication schedule, upcoming appointments, and quick health actions. Track your daily health routine."
        image="/images/og-dashboard.png"
      />
      <DashboardContent />
    </>
  );
}

// pages/MedicationsPage.tsx
export function MedicationsPage() {
  return (
    <>
      <SEOHead
        title="My Medications - Medication List & Tracking"
        description="Manage all your medications in one place. Track dosages, schedules, and refills with easy-to-use medication management."
        image="/images/og-medications.png"
      />
      <MedicationsContent />
    </>
  );
}

// pages/LoginPage.tsx
export function LoginPage() {
  return (
    <>
      <SEOHead
        title="Login - Access Your Healthcare Dashboard"
        description="Securely login to CareConnect to access your medications, appointments, and wellness data."
        noindex={true} // Don't index auth pages
      />
      <LoginContent />
    </>
  );
}
```

### Structured Data for Healthcare

```typescript
// utils/structuredData.ts
export const medicationSchema = (medication: Medication) => ({
  "@context": "https://schema.org",
  "@type": "Drug",
  "name": medication.name,
  "description": medication.description,
  "activeIngredient": medication.activeIngredient,
  "dosageForm": medication.form,
  "strength": medication.dosage
});

export const appointmentSchema = (appointment: Appointment) => ({
  "@context": "https://schema.org",
  "@type": "MedicalAppointment",
  "name": appointment.title,
  "description": appointment.notes,
  "startDate": appointment.dateTime,
  "location": {
    "@type": "Place",
    "name": appointment.location
  }
});

// Usage in component
export function MedicationDetail({ medication }) {
  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(medicationSchema(medication))}
      </script>
      <MedicationContent />
    </>
  );
}
```

---

## Sitemap Structure

### XML Sitemap

```xml
<!-- public/sitemap.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- Homepage -->
  <url>
    <loc>https://careconnect.app/</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <mobile:mobile/>
  </url>
  
  <!-- Onboarding -->
  <url>
    <loc>https://careconnect.app/onboarding</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <mobile:mobile/>
  </url>
  
  <!-- Public Pages -->
  <url>
    <loc>https://careconnect.app/about</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://careconnect.app/features</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>https://careconnect.app/accessibility</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>https://careconnect.app/privacy</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://careconnect.app/terms</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>https://careconnect.app/help</loc>
    <lastmod>2026-03-17</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <!-- Authentication Pages (noindex via robots meta) -->
  <!-- Not included in sitemap -->
  
  <!-- App Pages (require authentication - not indexed) -->
  <!-- Dashboard, Medications, Settings, etc. not in public sitemap -->
  
</urlset>
```

### Robots.txt

```txt
# public/robots.txt
User-agent: *

# Allow public pages
Allow: /
Allow: /onboarding
Allow: /about
Allow: /features
Allow: /accessibility
Allow: /privacy
Allow: /terms
Allow: /help

# Disallow authenticated pages
Disallow: /login
Disallow: /dashboard
Disallow: /medications
Disallow: /refill
Disallow: /messages
Disallow: /wellness
Disallow: /settings
Disallow: /profile

# Disallow admin/testing
Disallow: /admin
Disallow: /test
Disallow: /demo

# Allow assets
Allow: /icons/
Allow: /images/
Allow: /screenshots/

# Crawl delay (be nice to our servers)
Crawl-delay: 1

# Sitemap location
Sitemap: https://careconnect.app/sitemap.xml
```

### Dynamic Sitemap Generation

```typescript
// utils/generateSitemap.ts
interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  mobile?: boolean;
}

export function generateSitemap(urls: SitemapUrl[]): string {
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    ${url.mobile ? '<mobile:mobile/>' : ''}
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
  ${xmlUrls}
</urlset>`;
}

// Build time sitemap generation
const sitemapUrls: SitemapUrl[] = [
  {
    loc: 'https://careconnect.app/',
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'daily',
    priority: 1.0,
    mobile: true
  },
  {
    loc: 'https://careconnect.app/onboarding',
    changefreq: 'weekly',
    priority: 0.8,
    mobile: true
  },
  // ... more URLs
];

const sitemap = generateSitemap(sitemapUrls);
// Write to public/sitemap.xml during build
```

### HTML Sitemap (User-Facing)

```typescript
// pages/SitemapPage.tsx
export function SitemapPage() {
  return (
    <>
      <SEOHead
        title="Sitemap - All Pages"
        description="Complete sitemap of CareConnect healthcare management application."
      />
      
      <div className="container mx-auto px-4 py-8">
        <h1>Sitemap</h1>
        
        <section>
          <h2>Getting Started</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/onboarding">Onboarding</a></li>
            <li><a href="/features">Features</a></li>
          </ul>
        </section>
        
        <section>
          <h2>Application</h2>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/medications">Medications</a></li>
            <li><a href="/wellness">Wellness</a></li>
            <li><a href="/messages">Messages</a></li>
          </ul>
        </section>
        
        <section>
          <h2>Support</h2>
          <ul>
            <li><a href="/help">Help Center</a></li>
            <li><a href="/accessibility">Accessibility</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </section>
      </div>
    </>
  );
}
```

---

## Performance Monitoring

### Web Vitals Tracking

```typescript
// utils/webVitals.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

interface WebVitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

function sendToAnalytics(metric: WebVitalMetric) {
  // Send to your analytics service
  console.log('Web Vital:', metric);
  
  // Example: Send to Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Example: Send to custom endpoint
  fetch('/api/analytics/vitals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      metric: metric.name,
      value: metric.value,
      rating: metric.rating,
      page: window.location.pathname,
      timestamp: Date.now()
    })
  }).catch(() => {
    // Ignore errors
  });
}

export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}

// Call in main.tsx
// initWebVitals();
```

### Performance Observer

```typescript
// utils/performanceMonitor.ts
export class PerformanceMonitor {
  private observer: PerformanceObserver | null = null;
  
  init() {
    if (!('PerformanceObserver' in window)) {
      return;
    }
    
    // Monitor long tasks
    this.observeLongTasks();
    
    // Monitor layout shifts
    this.observeLayoutShifts();
    
    // Monitor resource timing
    this.observeResourceTiming();
  }
  
  private observeLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry);
            this.reportMetric({
              name: 'long-task',
              duration: entry.duration,
              startTime: entry.startTime
            });
          }
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Not supported
    }
  }
  
  private observeLayoutShifts() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if ((entry as any).hadRecentInput) {
            continue; // Ignore shifts with user input
          }
          
          const value = (entry as any).value;
          if (value > 0.1) {
            console.warn('Layout shift detected:', entry);
            this.reportMetric({
              name: 'layout-shift',
              value,
              sources: (entry as any).sources
            });
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      // Not supported
    }
  }
  
  private observeResourceTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const resource = entry as PerformanceResourceTiming;
          
          // Report slow resources
          if (resource.duration > 1000) {
            console.warn('Slow resource:', resource.name, resource.duration);
            this.reportMetric({
              name: 'slow-resource',
              resource: resource.name,
              duration: resource.duration,
              size: resource.transferSize
            });
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      // Not supported
    }
  }
  
  private reportMetric(data: any) {
    // Send to analytics
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {});
  }
  
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
```

### Bundle Analysis Script

```json
// package.json - Add scripts
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build && vite-bundle-visualizer",
    "lighthouse": "lighthouse https://careconnect.app --view --preset=desktop",
    "lighthouse:mobile": "lighthouse https://careconnect.app --view --preset=mobile",
    "size-limit": "size-limit",
    "perf:check": "npm run build && npm run size-limit"
  },
  "size-limit": [
    {
      "path": "dist/assets/*.js",
      "limit": "500 KB"
    },
    {
      "path": "dist/assets/vendor-*.js",
      "limit": "200 KB"
    }
  ]
}
```

---

## Healthcare-Specific Considerations

### HIPAA Compliance for SEO

```typescript
// Do NOT index or expose PII
const protectedRoutes = [
  '/dashboard',
  '/medications',
  '/medications/:id',
  '/refill/:id',
  '/messages',
  '/wellness',
  '/profile',
  '/settings'
];

// All protected routes should have:
<SEOHead
  title="Protected Page"
  description="Healthcare data"
  noindex={true} // Critical!
/>
```

### Schema.org for Healthcare

```typescript
// Appropriate healthcare schemas
const healthcareSchemas = {
  medicalWebPage: {
    "@type": "MedicalWebPage",
    "specialty": "Digital Health"
  },
  
  mobileApplication: {
    "@type": "MobileApplication",
    "applicationCategory": "HealthApplication",
    "offers": {
      "@type": "Offer",
      "price": "0"
    }
  },
  
  // For informational content only
  medicalGuideline: {
    "@type": "MedicalGuideline",
    "guidelineSubject": "Medication Management"
  }
};
```

### Performance for Healthcare Users

```typescript
// Accessibility performance considerations
const accessibilityPerformance = {
  // Reduced motion users
  prefersReducedMotion: {
    disableAnimations: true,
    skipTransitions: true,
    loadPriority: 'high'
  },
  
  // Screen reader users
  screenReaderOptimization: {
    preloadARIALabels: true,
    eagerLoadSemanticHTML: true,
    minimizeReflows: true
  },
  
  // Low vision users
  highContrast: {
    priorityLoad: true,
    separateStylesheet: false, // Inline critical
    fontSize: 'responsive'
  },
  
  // Motor impairment
  largeClickTargets: {
    minSize: '44px',
    extraPadding: true,
    leftHandMode: true
  }
};
```

### Medical Disclaimer

```html
<!-- Include on all healthcare content pages -->
<section aria-label="Medical Disclaimer">
  <p class="text-sm text-gray-600">
    <strong>Medical Disclaimer:</strong> CareConnect is a medication tracking tool 
    and does not provide medical advice, diagnosis, or treatment. Always consult 
    with a qualified healthcare provider for medical decisions.
  </p>
</section>
```

---

## Implementation Checklist

### Performance Optimization

- [ ] Set up performance budgets in CI/CD
- [ ] Configure image optimization pipeline
- [ ] Implement code splitting for all routes
- [ ] Add lazy loading for below-fold content
- [ ] Set up Web Vitals monitoring
- [ ] Configure bundle analysis in build process
- [ ] Implement font loading strategy
- [ ] Add resource hints (preload, prefetch, dns-prefetch)
- [ ] Enable compression (gzip/brotli) on server
- [ ] Set up CDN for static assets
- [ ] Configure HTTP/2 server push
- [ ] Implement service worker caching strategy
- [ ] Add performance monitoring dashboard

### SEO Implementation

- [ ] Update index.html with comprehensive meta tags
- [ ] Implement dynamic SEO component
- [ ] Add structured data to all pages
- [ ] Create and submit XML sitemap
- [ ] Configure robots.txt
- [ ] Add canonical URLs
- [ ] Implement Open Graph tags
- [ ] Add Twitter Card tags
- [ ] Create HTML sitemap page
- [ ] Set up Google Search Console
- [ ] Submit sitemap to search engines
- [ ] Configure social media preview images
- [ ] Add breadcrumb navigation with schema
- [ ] Implement pagination meta tags (if applicable)

### Testing & Monitoring

- [ ] Run Lighthouse audits (mobile & desktop)
- [ ] Test with PageSpeed Insights
- [ ] Verify Core Web Vitals
- [ ] Test on slow 3G connection
- [ ] Verify offline functionality
- [ ] Test social media sharing
- [ ] Validate structured data
- [ ] Check mobile responsiveness
- [ ] Test accessibility with screen readers
- [ ] Verify image lazy loading
- [ ] Test code splitting in production
- [ ] Monitor real user metrics
- [ ] Set up error tracking
- [ ] Configure uptime monitoring

---

## Tools & Resources

### Performance Testing Tools
- **Lighthouse**: Built into Chrome DevTools
- **WebPageTest**: https://www.webpagetest.org
- **PageSpeed Insights**: https://pagespeed.web.dev
- **Chrome UX Report**: https://developers.google.com/web/tools/chrome-user-experience-report
- **Bundle Phobia**: https://bundlephobia.com

### SEO Tools
- **Google Search Console**: https://search.google.com/search-console
- **Schema Markup Validator**: https://validator.schema.org
- **Rich Results Test**: https://search.google.com/test/rich-results
- **Mobile-Friendly Test**: https://search.google.com/test/mobile-friendly
- **Structured Data Testing Tool**: https://developers.google.com/search/docs/appearance/structured-data

### Monitoring Services
- **Google Analytics**: Web traffic and user behavior
- **Sentry**: Error tracking and performance monitoring
- **New Relic**: Application performance monitoring
- **Datadog**: Infrastructure and application monitoring
- **Cloudflare Analytics**: CDN and security analytics

---

## Maintenance Schedule

### Weekly
- Review Web Vitals dashboard
- Check for slow pages/resources
- Monitor bundle size changes
- Review error logs

### Monthly
- Run full Lighthouse audit suite
- Update sitemap if new content added
- Review and update meta descriptions
- Analyze search console data
- Check for broken links
- Review structured data

### Quarterly
- Comprehensive performance audit
- Update SEO strategy based on analytics
- Review and optimize images
- Analyze bundle composition
- Update performance budgets if needed
- Review accessibility compliance

### Annually
- Full SEO audit
- Comprehensive accessibility audit
- Review and update all documentation
- Evaluate new web performance features
- Update structured data schemas
- Review WCAG compliance

---

## Version History

- **v1.0** (2026-03-17): Initial performance and SEO strategy
- Updates: Track changes to budgets, strategies, and implementations here

---

*For questions or updates to this strategy, please contact the CareConnect development team.*
