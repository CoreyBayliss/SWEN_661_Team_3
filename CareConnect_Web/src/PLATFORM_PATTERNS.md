# Platform-Specific Patterns in CareConnect

## Overview

CareConnect is built as a **Progressive Web App (PWA)** that adopts native mobile design patterns from both iOS and Android platforms to create a familiar, intuitive experience regardless of the user's device. This document outlines every platform-specific pattern implemented and the reasoning behind each choice.

---

## Table of Contents

1. [Mobile-First Navigation Patterns](#1-mobile-first-navigation-patterns)
2. [iOS-Specific Patterns](#2-ios-specific-patterns)
3. [Android-Specific Patterns](#3-android-specific-patterns)
4. [Cross-Platform Mobile Patterns](#4-cross-platform-mobile-patterns)
5. [Touch & Gesture Patterns](#5-touch--gesture-patterns)
6. [Keyboard & Input Patterns](#6-keyboard--input-patterns)
7. [Visual & Layout Patterns](#7-visual--layout-patterns)
8. [Safe Area & Notch Handling](#8-safe-area--notch-handling)

---

## 1. Mobile-First Navigation Patterns

### 1.1 Bottom Tab Bar (iOS Standard, Android Common)

**Pattern:** Primary navigation anchored to bottom of screen with icon + label combination.

**Implementation:**
```tsx
// /components/Root.tsx
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
  <div className="flex items-center justify-around px-2 py-2">
    {navItems.map((item) => (
      <Link
        to={item.path}
        className={`flex flex-col items-center justify-center 
          min-w-[56px] min-h-[56px] px-3 py-2 rounded-xl
          ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600'}`}
      >
        <Icon className="w-6 h-6 mb-1" />
        <span className="text-xs font-medium">{item.label}</span>
      </Link>
    ))}
  </div>
</nav>
```

**Platform Origins:**
- **iOS:** Standard tab bar pattern (Settings, Messages, Phone apps)
- **Android:** Bottom navigation bar (Google Photos, YouTube, Gmail)

**Why This Pattern:**
- ✅ **Thumb-friendly:** Most reachable zone on mobile devices (especially 6"+ screens)
- ✅ **Persistent navigation:** Always visible, reducing cognitive load
- ✅ **5-tab limit:** Matches both iOS (max 5 tabs) and Android (3-5 items recommended) guidelines
- ✅ **Icon + Label:** Improves scannability for elderly users vs icon-only

---

### 1.2 Header Navigation (iOS/Android Standard)

**Pattern:** Page headers with back buttons and contextual actions.

**Implementation:**
```tsx
// /pages/AddMedication.tsx
<header className="sticky top-0 z-10 bg-white border-b border-gray-200">
  <div className="flex items-center justify-between px-6 py-4">
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-gray-700 min-h-[56px]"
    >
      <ArrowLeft className="w-6 h-6" />
      <span className="text-lg font-medium">Back</span>
    </button>
    <h1 className="text-2xl font-semibold">Add Medication</h1>
    <div className="w-[80px]"></div> {/* Spacer for centering */}
  </div>
</header>
```

**Platform Origins:**
- **iOS:** Navigation bar with back button, title, and optional trailing actions
- **Android:** Action bar with up button and title

**Adaptations:**
- **Back Button Position:** Left-aligned (iOS standard) but with text label (accessibility)
- **Sticky Header:** Remains visible on scroll (both platforms)
- **Border:** Subtle separator (iOS style) vs elevation shadow (Android style) - we chose border for cleaner aesthetic

---

### 1.3 Stack Navigation (React Router Implementation)

**Pattern:** Push/pop navigation stack with history management.

**Implementation:**
```tsx
// /routes.ts
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: TodayView },
      { path: "medications", Component: Medications },
      { path: "medications/add", Component: AddMedication },
      { path: "medications/:id", Component: MedicationDetails },
      // ... more routes
    ],
  },
  { path: "/login", Component: Login },
  { path: "/onboarding", Component: Onboarding },
]);
```

**Platform Behavior:**
- **Navigate Forward:** `navigate('/medications/add')` → Pushes new screen onto stack
- **Navigate Back:** `navigate(-1)` → Pops current screen off stack
- **Replace:** Used in authentication flow to prevent back navigation to login

**Why This Pattern:**
- Matches native iOS `UINavigationController` and Android `FragmentManager` behavior
- Browser back button works as expected (PWA requirement)
- Maintains navigation history for user context

---

## 2. iOS-Specific Patterns

### 2.1 Rounded Corners & Pill-Shaped Buttons

**Pattern:** Generous border radius on cards and buttons.

**Implementation:**
```tsx
// Cards
className="bg-white rounded-2xl shadow-sm" // 16px radius

// Buttons
className="rounded-xl" // 12px radius

// Pills/Chips
className="rounded-full" // Fully rounded
```

**Platform Origin:**
- **iOS 7+:** Introduction of rounded design language
- **iOS 13+:** Card-based UI with generous corner radius

**Examples in App:**
- Medication cards: `rounded-2xl`
- Quick action buttons: `rounded-xl`
- Status badges: `rounded-full`

---

### 2.2 Modal Sheets (Bottom Sheet Pattern)

**Pattern:** Content slides up from bottom with rounded top corners and drag handle.

**Implementation:**
```tsx
// /pages/RefillRequest.tsx - Step screens act as modal sheets
<div className="min-h-screen bg-gray-100 flex flex-col">
  <div className="flex-1 bg-white rounded-t-3xl p-6 shadow-lg">
    {/* Content */}
  </div>
</div>

// Simulated drag handle (visual cue)
<div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
```

**Platform Origin:**
- **iOS 13+:** Sheet presentation style (Maps, Shortcuts, Shortcuts apps)
- **iOS 15+:** Detents (half-height, full-height sheets)

**Visual Cues:**
- Top corners rounded (`rounded-t-3xl` = 24px)
- Optional drag handle indicator
- Background dimming (modal context)

---

### 2.3 Large Title Headers

**Pattern:** Bold, prominent page titles with smooth collapse on scroll.

**Implementation:**
```tsx
// /pages/TodayView.tsx
<header className="bg-gradient-to-b from-blue-600 to-blue-700 text-white px-6 py-8">
  <h1 className="text-4xl font-bold mb-2">Today</h1>
  <p className="text-blue-100">Tuesday, January 27, 2026</p>
</header>
```

**Platform Origin:**
- **iOS 11+:** Large title navigation bars (Settings, Messages, Mail)

**Characteristics:**
- **Large text:** 4xl (36px) vs standard 2xl (24px)
- **Gradient background:** Adds depth (iOS aesthetic)
- **Contextual subtitle:** Date/time information below title

---

### 2.4 SF Symbols-Style Iconography

**Pattern:** Outlined, monoline icons with consistent stroke weight.

**Implementation:**
```tsx
import { Home, Pill, Calendar, MessageSquare, Settings } from 'lucide-react';

<Home className="w-6 h-6" strokeWidth={2} />
```

**Platform Origin:**
- **iOS SF Symbols:** Outlined icon set with variable stroke weights
- **lucide-react:** Open-source icon library matching SF Symbols aesthetic

**Icon Usage:**
- **Navigation:** 24×24px (w-6 h-6)
- **Buttons:** 20×20px (w-5 h-5)
- **Large actions:** 32×32px (w-8 h-8)
- **Consistent stroke:** 2px weight throughout

---

### 2.5 Swipe Gestures (Simulated)

**Pattern:** Horizontal swipe for navigation actions.

**Implementation:**
```tsx
// Implemented via React Router navigation
// Back gesture: Browser back button or header back button
// Forward: Tap on item to drill down

// Could enhance with:
// - Touch event listeners for swipe-to-go-back
// - Swipe-to-delete on lists (iOS Mail pattern)
```

**Platform Origin:**
- **iOS:** Edge swipe to go back (system-wide gesture)
- **Android 10+:** Back gesture from edge

**Current State:** Using browser/button navigation (PWA limitation for gesture conflicts)

---

### 2.6 Haptic Feedback Hooks (Preparatory)

**Pattern:** Subtle vibration feedback for button presses and state changes.

**Implementation:**
```tsx
// Prepared for haptic API integration
const triggerHaptic = (type: 'light' | 'medium' | 'heavy') => {
  if ('vibrate' in navigator) {
    const patterns = {
      light: 10,
      medium: 20,
      heavy: 30,
    };
    navigator.vibrate(patterns[type]);
  }
};

// Usage on button press:
onClick={() => {
  triggerHaptic('light');
  handleAction();
}}
```

**Platform Origin:**
- **iOS:** Taptic Engine (iPhone 6S+)
- **Android:** Vibration feedback on UI interactions

---

## 3. Android-Specific Patterns

### 3.1 Material Design Elevation (Adapted)

**Pattern:** Subtle shadows to indicate hierarchy instead of harsh drop shadows.

**Implementation:**
```css
/* /styles/globals.css - Tailwind shadow utilities */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
}

.shadow {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

**Platform Origin:**
- **Material Design:** Z-axis elevation system (0dp, 2dp, 4dp, 8dp, 16dp)

**Usage:**
- Cards: `shadow-sm` (subtle lift)
- Modals/sheets: `shadow-lg` (prominent elevation)
- Floating action buttons: `shadow-md` (medium elevation)

---

### 3.2 Floating Action Button (FAB) Pattern

**Pattern:** Circular button for primary action, positioned in bottom-right corner.

**Implementation:**
```tsx
// /pages/Medications.tsx
<Link
  to="/medications/add"
  className="fixed bottom-24 right-6 w-14 h-14 bg-blue-600 text-white 
    rounded-full shadow-lg flex items-center justify-center
    hover:bg-blue-700 active:scale-95 transition-all z-40"
>
  <Plus className="w-6 h-6" />
</Link>
```

**Platform Origin:**
- **Material Design:** Primary action button (Gmail compose, Google Calendar add event)

**Positioning:**
- **Bottom-right:** Standard Material Design position
- **Above nav bar:** `bottom-24` (96px) clears 56px nav + spacing
- **Z-index 40:** Floats above content, below modals

**Accessibility Adaptation:**
- Large touch target (56×56px)
- Could mirror to bottom-left in left-hand mode (future enhancement)

---

### 3.3 Snackbar Notifications (Pattern Reference)

**Pattern:** Brief notification at bottom of screen with optional action.

**Implementation:**
```tsx
// Using Sonner toast library (Material Design-inspired)
import { toast } from "sonner@2.0.3";

toast.success("Medication logged successfully", {
  duration: 3000,
  position: 'bottom-center',
});

toast.error("Failed to save medication", {
  action: {
    label: 'Retry',
    onClick: () => handleRetry(),
  },
});
```

**Platform Origin:**
- **Material Design:** Snackbar component (Android standard)

**Characteristics:**
- Bottom-center position (doesn't block content)
- Auto-dismiss after 3-4 seconds
- Optional action button (Undo, Retry, View)
- Single line of text (mobile constraint)

---

### 3.4 Material Ripple Effect (CSS Simulation)

**Pattern:** Radial animation emanating from touch point.

**Implementation:**
```tsx
// Active state scaling simulates ripple
className="active:scale-95 transition-transform duration-150"

// Background color transition
className="active:bg-blue-700 transition-colors"

// Combined for button press feedback
<button className="bg-blue-600 active:bg-blue-700 active:scale-95 
  transition-all duration-150">
  Save
</button>
```

**Platform Origin:**
- **Material Design:** Touch ripple effect (Android 5.0+)

**Why CSS vs JavaScript:**
- Performance: GPU-accelerated transforms
- Simplicity: No additional libraries needed
- Accessibility: Works with keyboard navigation (`:active` state)

---

### 3.5 Input Field Styles (Material Design Influenced)

**Pattern:** Outlined text fields with floating labels.

**Implementation:**
```tsx
// /pages/AddMedication.tsx
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700">
    Medication Name *
  </label>
  <input
    type="text"
    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 
      rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 
      focus:border-transparent"
    placeholder="e.g., Lisinopril"
  />
</div>
```

**Platform Origin:**
- **Material Design:** Outlined text field variant
- **iOS:** Rounded input fields (Settings app)

**Hybrid Approach:**
- Outline: Material Design (focus ring)
- Border radius: iOS (rounded-xl)
- Background fill: iOS (gray-50 background)
- Label above field: Accessibility best practice

---

## 4. Cross-Platform Mobile Patterns

### 4.1 Pull-to-Refresh (Scroll Behavior)

**Pattern:** Overscroll at top of list to refresh content.

**Implementation:**
```tsx
// Prepared with scroll container structure
<main className="flex-1 overflow-y-scroll" 
  style={{ WebkitOverflowScrolling: 'touch' }}>
  {/* Content */}
</main>

// Future enhancement: Add pull-to-refresh library
// - React-pull-to-refresh
// - Detect overscroll with scroll event listeners
```

**Platform Origin:**
- **iOS:** Twitter, Mail apps (originated pattern)
- **Android:** Gmail, Chrome browser

**Current State:** Scroll optimization ready, manual refresh via header button

---

### 4.2 Card-Based Layouts

**Pattern:** Content grouped in discrete, tappable cards with shadows.

**Implementation:**
```tsx
// /pages/TodayView.tsx - Medication cards
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-4">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-lg font-semibold text-gray-900">Lisinopril 10mg</h3>
      <p className="text-sm text-gray-600">1 tablet • With food</p>
    </div>
    <span className="px-3 py-1 bg-amber-100 text-amber-800 
      rounded-full text-sm font-medium">
      Due Soon
    </span>
  </div>
  {/* Actions */}
</div>
```

**Platform Origin:**
- **iOS:** Card-based UI (Apple Wallet, Apple TV)
- **Android:** Material Design cards (Google Now, Google Photos)

**Card Anatomy:**
- **Container:** White background, rounded corners, subtle shadow
- **Border:** Light gray (prevents cards from blending on white backgrounds)
- **Padding:** 24px (p-6) for comfortable content spacing
- **Spacing:** 16px (mb-4) between cards

---

### 4.3 List with Separators vs Cards

**Pattern:** Choose separator lines for dense lists, cards for scannable content.

**Implementation:**
```tsx
// Dense list (Settings)
<div className="divide-y divide-gray-200">
  {settings.map((item) => (
    <button className="w-full px-6 py-4 flex items-center justify-between">
      {/* Content */}
    </button>
  ))}
</div>

// Scannable cards (Medications)
<div className="space-y-4">
  {medications.map((med) => (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      {/* Content */}
    </div>
  ))}
</div>
```

**Platform Origin:**
- **iOS:** Settings app uses separator lines
- **Android:** Material lists use dividers

**Decision Logic:**
- **Separators:** When list items are similar, compact, and action-focused (Settings)
- **Cards:** When items have rich content, need visual separation (Medications, Calendar)

---

### 4.4 Empty States with Illustrations

**Pattern:** Friendly message + icon when no content exists.

**Implementation:**
```tsx
// /pages/TodayView.tsx - No medications
{medications.length === 0 && (
  <div className="bg-white rounded-2xl shadow-sm border p-12 text-center">
    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 
      flex items-center justify-center">
      <Pill className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">
      No medications yet
    </h3>
    <p className="text-sm text-gray-600 mb-6">
      Add your first medication to get started tracking your health.
    </p>
    <Link to="/medications/add" 
      className="inline-flex items-center gap-2 px-6 py-3 
        bg-blue-600 text-white rounded-xl">
      <Plus className="w-5 h-5" />
      Add Medication
    </Link>
  </div>
)}
```

**Platform Origin:**
- **iOS:** Apple Music, Photos (friendly empty states)
- **Android:** Google Drive, Gmail (instructional empty states)

**Components:**
- Icon in circle (visual anchor)
- Title (what's missing)
- Description (why it's empty / what to do)
- Call-to-action button (how to fix it)

---

### 4.5 Segmented Control (iOS) / Tabs (Android)

**Pattern:** Toggle between related views in same screen.

**Implementation:**
```tsx
// Could implement for Medications: "All" | "Active" | "Archived"
<div className="flex bg-gray-100 rounded-xl p-1">
  {segments.map((segment) => (
    <button
      onClick={() => setActiveSegment(segment.id)}
      className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all
        ${activeSegment === segment.id 
          ? 'bg-white text-blue-600 shadow-sm' 
          : 'text-gray-600'}`}
    >
      {segment.label}
    </button>
  ))}
</div>
```

**Platform Origin:**
- **iOS:** Segmented control (Settings, App Store)
- **Android:** Tabs (Material Design)

**Current State:** Not yet implemented, but pattern prepared for filtering views

---

## 5. Touch & Gesture Patterns

### 5.1 Touch Target Sizing

**Pattern:** Minimum 44×44pt (iOS) / 48×48dp (Android) touch targets.

**Implementation:**
```tsx
// Our standard: 56×56px (exceeds both platforms)
className="min-h-[56px] min-w-[56px]"

// Landscape optimization: 48×48px (meets minimum)
className="min-h-[56px] landscape:min-h-[48px]"

// Small buttons with padding to reach target
<button className="px-4 py-3"> {/* Creates >44px hit area */}
  <Icon className="w-5 h-5" />
</button>
```

**Platform Guidelines:**
- **iOS HIG:** 44×44 points minimum
- **Android Material:** 48×48 dp minimum
- **WCAG 2.5.5:** 44×44 CSS pixels (AAA level)

**Our Choice:** 56×56px (14mm at typical PPI) for users with motor impairments

---

### 5.2 Touch Feedback (Visual States)

**Pattern:** Immediate visual feedback on touch down.

**Implementation:**
```tsx
// Hover state (desktop/tablets with pointers)
className="hover:bg-blue-700"

// Active state (touch/click down)
className="active:bg-blue-800 active:scale-95"

// Combined for comprehensive feedback
<button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
  active:scale-95 transition-all duration-150">
  Save
</button>
```

**Platform Expectations:**
- **iOS:** Subtle dimming on touch (Alpha channel reduction)
- **Android:** Ripple effect spreading from touch point
- **Web/PWA:** Hybrid approach with scale + color change

---

### 5.3 Spacing for Thumb Zones

**Pattern:** Primary actions in bottom third of screen (thumb-reachable).

**Implementation:**
```tsx
// Bottom navigation (thumb zone)
<nav className="fixed bottom-0">

// Primary CTAs at bottom of forms
<div className="sticky bottom-0 bg-white border-t p-6">
  <button className="w-full min-h-[56px] bg-blue-600">
    Save Medication
  </button>
</div>

// Floating action button (right thumb zone)
<button className="fixed bottom-24 right-6">
```

**Thumb Heat Map:**
- **Easiest:** Bottom 30% of screen (navigation bar area)
- **Moderate:** Middle 40% of screen (main content)
- **Hardest:** Top 30% of screen (headers, status bar)

**Design Decisions:**
- Navigation: Bottom (easiest)
- Primary actions: Bottom or floating (easiest)
- Read-only content: Middle/top (acceptable)
- Secondary actions: Headers (acceptable, less frequent)

---

### 5.4 Scroll Momentum (iOS Inertial Scrolling)

**Pattern:** Smooth, physics-based scroll deceleration.

**Implementation:**
```tsx
<main 
  className="overflow-y-scroll"
  style={{ WebkitOverflowScrolling: 'touch' }}
>
  {/* Scrollable content */}
</main>
```

**Platform Origin:**
- **iOS:** Inertial scrolling with rubber-band bounce at edges
- **Android:** Overscroll glow effect

**CSS Property:**
- `-webkit-overflow-scrolling: touch` enables hardware-accelerated scrolling
- Provides native-like momentum scrolling in mobile browsers

---

## 6. Keyboard & Input Patterns

### 6.1 Context-Specific Keyboards (inputMode)

**Pattern:** Show appropriate keyboard based on expected input type.

**Implementation:**
```tsx
// Numeric keyboard (numbers only, no decimals)
<input type="number" inputMode="numeric" />
// Shows: [1][2][3][4][5][6][7][8][9][0]

// Decimal keyboard (numbers + decimal point)
<input type="text" inputMode="decimal" />
// Shows: [1][2][3][4][5][6][7][8][9][0][.]

// Email keyboard (includes @ and .)
<input type="email" inputMode="email" />
// Shows: QWERTY + [@][.com]

// Telephone keyboard
<input type="tel" inputMode="tel" />
// Shows: Dial pad layout

// URL keyboard
<input type="url" inputMode="url" />
// Shows: QWERTY + [.com][.org][/]
```

**Platform Support:**
- **iOS:** Full inputMode support
- **Android:** Full inputMode support
- **Desktop:** Gracefully ignored

**Real Examples in App:**
- Login username: `inputMode="email"`
- Medication dose: `inputMode="decimal"`
- Refill quantity: `inputMode="numeric"`
- Message text: `inputMode="text"` (default)

---

### 6.2 Keyboard Avoidance (Content Padding)

**Pattern:** Adjust viewport when keyboard appears to keep focused input visible.

**Implementation:**
```tsx
// Add padding when keyboard visible
<main className={`flex-1 overflow-y-scroll 
  ${isKeyboardVisible ? 'keyboard-visible' : ''}`}>
  {/* Content */}
</main>
```

```css
/* /styles/globals.css */
.keyboard-visible {
  padding-bottom: 320px; /* Portrait */
  transition: padding-bottom 0.3s ease-out;
}

@media (orientation: landscape) {
  .keyboard-visible {
    padding-bottom: 280px; /* Landscape */
  }
}
```

**Platform Behavior:**
- **iOS:** Viewport resizes when keyboard appears (auto-scroll to input)
- **Android:** Keyboard overlays viewport (app must handle scrolling)

**Our Solution:** Explicit padding ensures forms remain accessible regardless of platform

---

### 6.3 Return Key Types (iOS Specific)

**Pattern:** Change keyboard return key label based on context.

**Implementation:**
```tsx
// "Done" for single-field forms
<input enterKeyHint="done" />

// "Next" for multi-step forms
<input enterKeyHint="next" />

// "Search" for search inputs
<input enterKeyHint="search" />

// "Send" for message inputs
<input enterKeyHint="send" />

// "Go" for URL inputs
<input enterKeyHint="go" />
```

**Platform Support:**
- **iOS:** Changes return key label and color
- **Android:** May change action button in keyboard
- **Desktop:** No visual change, but semantic meaning for assistive tech

**Future Enhancement:** Add `enterKeyHint` to forms for better UX

---

### 6.4 Autocomplete & Autofill Hints

**Pattern:** Help browsers/OS autofill forms correctly.

**Implementation:**
```tsx
// Login form
<input 
  type="text" 
  inputMode="email"
  autoComplete="username"
  name="username"
/>

<input 
  type="password"
  autoComplete="current-password"
  name="password"
/>

// Medication form (custom data - disable autofill)
<input
  type="text"
  autoComplete="off"
  name="medicationName"
/>
```

**Platform Integration:**
- **iOS:** iCloud Keychain integration
- **Android:** Google Smart Lock integration
- **Browsers:** Built-in password managers

**Security Note:** Use `autoComplete="off"` for sensitive health data that shouldn't be saved

---

## 7. Visual & Layout Patterns

### 7.1 System Font Stack

**Pattern:** Use native system fonts for optimal readability and performance.

**Implementation:**
```css
/* /styles/globals.css */
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
    'Helvetica Neue', sans-serif;
}
```

**Platform Fonts:**
- **iOS/macOS:** San Francisco (`-apple-system`)
- **Android:** Roboto
- **Windows:** Segoe UI
- **Linux:** Oxygen, Ubuntu, Cantarell

**Benefits:**
- ✅ Native look & feel on each platform
- ✅ No font download (faster load times)
- ✅ Optimized rendering (system-tuned)
- ✅ Better accessibility (familiar to users)

---

### 7.2 Color System (Adaptive)

**Pattern:** Support both light and dark modes with semantic color tokens.

**Implementation:**
```css
/* /styles/globals.css */
:root {
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --primary: #030213;
  --destructive: #d4183d;
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  /* ... */
}
```

**Platform Dark Mode:**
- **iOS 13+:** System-wide dark mode
- **Android 10+:** Dark theme support
- **Web:** `prefers-color-scheme` media query

**Current State:** Light mode default, dark mode tokens prepared for toggle

---

### 7.3 Status Bar Styling (PWA Meta Tags)

**Pattern:** Control status bar appearance on mobile devices.

**Implementation:**
```html
<!-- Would add to index.html for PWA -->
<meta name="theme-color" content="#3B82F6" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
```

**Options:**
- **default:** Status bar with default OS styling
- **black:** Black status bar with white text
- **black-translucent:** Translucent status bar, content extends behind it

**Platform Behavior:**
- **iOS:** Safari (iOS 7+) and PWA home screen apps
- **Android:** Chrome, Samsung Internet

---

### 7.4 Gradient Backgrounds (Modern Mobile Pattern)

**Pattern:** Subtle gradients for depth and visual interest.

**Implementation:**
```tsx
// Header gradients (iOS pattern)
<header className="bg-gradient-to-b from-blue-600 to-blue-700">

// Button gradients (depth)
<button className="bg-gradient-to-r from-blue-500 to-blue-600">

// Card gradients (subtle highlights)
<div className="bg-gradient-to-br from-white to-gray-50">
```

**Platform Trend:**
- **iOS:** Heavy use of gradients in Apple Music, App Store
- **Android:** Material Design "surfaces" with subtle gradients

**Usage in App:**
- Page headers (Today, Medications)
- Quick action buttons
- Feature highlights

---

## 8. Safe Area & Notch Handling

### 8.1 Safe Area Insets (iOS Notch/Dynamic Island)

**Pattern:** Respect device-specific safe zones (notches, home indicators, rounded corners).

**Implementation:**
```css
/* /styles/globals.css */
.safe-area-bottom {
  padding-bottom: env(safe-area-inset-bottom, 0px);
}

.safe-area-top {
  padding-top: env(safe-area-inset-top, 0px);
}
```

```tsx
// Bottom navigation with safe area
<nav className="fixed bottom-0 left-0 right-0 safe-area-bottom">
```

**Device Variations:**
- **iPhone X+:** Notch at top, home indicator at bottom
- **iPhone 14 Pro+:** Dynamic Island at top
- **Android (some):** Hole-punch cameras, gesture bars

**env() Function:**
- `safe-area-inset-top`: Notch/status bar height
- `safe-area-inset-bottom`: Home indicator height
- `safe-area-inset-left/right`: Rounded corners in landscape

---

### 8.2 Viewport Meta Configuration

**Pattern:** Prevent zoom, set device width, optimize for mobile.

**Implementation:**
```html
<!-- Would add to index.html -->
<meta name="viewport" content="width=device-width, initial-scale=1.0, 
  maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
```

**Properties:**
- **width=device-width:** Use device's screen width
- **initial-scale=1.0:** No initial zoom
- **maximum-scale=1.0:** Prevent pinch zoom (accessibility trade-off for app-like experience)
- **user-scalable=no:** Disable zoom (app-like feel)
- **viewport-fit=cover:** Extend content into safe areas

**Accessibility Note:** Disabling zoom can hurt accessibility; consider keeping zoom enabled for text content

---

### 8.3 Landscape Orientation Handling

**Pattern:** Optimize layouts for reduced vertical space in landscape.

**Implementation:**
```tsx
// Compact headers in landscape
className="py-4 landscape:py-3"

// Horizontal layouts in landscape
className="flex-col landscape:flex-row"

// Reduced text size in landscape
className="text-2xl landscape:text-xl"

// Smaller spacing in landscape
className="space-y-6 landscape:space-y-4"

// Touch targets adjust proportionally
className="min-h-[56px] landscape:min-h-[48px]"
```

```css
/* Media query for extreme landscape (short screens) */
@media (orientation: landscape) and (max-height: 500px) {
  .landscape-compact-header {
    padding-top: 0.75rem !important;
    padding-bottom: 0.75rem !important;
  }
}
```

**Why This Matters:**
- Users prop phones on bedside tables during medication times
- Landscape = 30-40% less vertical space than portrait
- Headers/nav must compress without losing accessibility

---

## 9. Platform Pattern Decision Matrix

### When to Use iOS Patterns:
- ✅ Navigation (bottom tabs, back buttons)
- ✅ Visual aesthetics (rounded corners, gradients)
- ✅ Modals (bottom sheets)
- ✅ Icons (outlined style)

### When to Use Android Patterns:
- ✅ Floating action buttons (primary actions)
- ✅ Notifications (snackbars)
- ✅ Elevation/shadows (hierarchy)
- ✅ List separators (dividers)

### When to Create Hybrid Patterns:
- ✅ Input fields (outlined + rounded + filled)
- ✅ Touch feedback (ripple simulation with scale)
- ✅ Cards (iOS rounded + Android shadows)
- ✅ Typography (system fonts on both platforms)

---

## 10. Progressive Web App (PWA) Patterns

### 10.1 Add to Home Screen Behavior

**Pattern:** App installs to home screen like native app.

**Implementation:**
```json
// manifest.json
{
  "name": "CareConnect",
  "short_name": "CareConnect",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#3B82F6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Platform Support:**
- **iOS:** Add to Home Screen from Safari Share menu
- **Android:** Install prompt banner in Chrome

---

### 10.2 Offline Functionality (Preparatory)

**Pattern:** Service worker caches assets for offline use.

**Future Implementation:**
```javascript
// service-worker.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('careconnect-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/App.tsx',
        '/styles/globals.css',
        // ... other assets
      ]);
    })
  );
});
```

**Use Cases:**
- View medication schedule offline
- Log medications without internet
- Sync when connection restored

---

## Summary Table

| Pattern | iOS | Android | CareConnect |
|---------|-----|---------|-------------|
| **Bottom Navigation** | Standard | Common | ✅ Implemented |
| **Rounded Corners** | Signature | Optional | ✅ Generous (16-24px) |
| **FAB** | Rare | Standard | ✅ Add medication |
| **Modal Sheets** | iOS 13+ | Bottom sheets | ✅ Refill flow |
| **Haptics** | Taptic Engine | Vibration API | 🔧 Prepared |
| **Swipe Gestures** | System-wide | Android 10+ | 🔧 Future |
| **inputMode** | Full support | Full support | ✅ All forms |
| **Safe Areas** | Critical | Optional | ✅ Navigation |
| **System Fonts** | San Francisco | Roboto | ✅ Adaptive |
| **Dark Mode** | iOS 13+ | Android 10+ | 🔧 Tokens ready |

---

## Conclusion

CareConnect adopts a **hybrid platform approach**, borrowing the best patterns from iOS and Android while maintaining accessibility as the top priority. The app feels native on any platform while introducing unique patterns (left-hand framework, oversized touch targets) that serve its healthcare-focused user base.

### Key Principles:
1. **Familiarity First:** Use platform patterns users already know
2. **Accessibility Override:** When accessibility conflicts with platform norms, accessibility wins
3. **Progressive Enhancement:** Build core functionality that works everywhere, enhance for capable platforms
4. **Mobile-First, Always:** Every decision optimized for touch, thumb reach, and mobile contexts

This creates a **universally accessible** app that feels native everywhere while serving users with diverse needs.
