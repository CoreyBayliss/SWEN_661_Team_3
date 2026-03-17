# 📸 CareConnect Screenshot Guide for Figma

Complete guide to capturing high-quality screenshots of CareConnect on different platforms and importing them into Figma.

---

## Quick Start: Screenshot Demo Page

I've created a dedicated screenshot demo page that shows all key screens in one place!

### **Access the Demo:**
1. Navigate to: `/screenshot-demo`
2. Use the dropdown to switch between screens:
   - Today View
   - Medications List
   - Add Medication Form
   - Calendar
   - Messages
   - Settings
   - Login
   - Onboarding

3. Toggle **Left-Hand Mode** on/off to capture both variants

4. The demo includes a simulated phone frame with status bar for realistic previews

---

## Method 1: Chrome DevTools Device Emulation (Recommended)

### **Best for:** Quick screenshots with accurate device dimensions

### **Steps:**

1. **Open DevTools**
   - Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
   - Or right-click → "Inspect"

2. **Enable Device Toolbar**
   - Click the device icon (📱) in DevTools toolbar
   - Or press `Cmd+Shift+M` (Mac) / `Ctrl+Shift+M` (Windows)

3. **Select Device**
   - Click the device dropdown (top-left)
   - Choose from presets:

   **iOS Devices:**
   - iPhone 14 Pro Max: 430×932
   - iPhone 14 Pro: 393×852
   - iPhone 14: 390×844
   - iPhone SE: 375×667
   - iPhone 13 Mini: 375×812
   - iPad Pro 12.9": 1024×1366
   - iPad Pro 11": 834×1194
   - iPad Air: 820×1180

   **Android Devices:**
   - Samsung Galaxy S20+: 384×854
   - Samsung Galaxy S20: 360×800
   - Pixel 7: 412×915
   - Pixel 5: 393×851

4. **Capture Screenshot**
   - Click the three-dot menu (⋮) in DevTools
   - Select **"Capture screenshot"** (visible area)
   - Or **"Capture full size screenshot"** (entire scrollable page)

5. **Rotate for Landscape**
   - Click the rotate icon (🔄) in device toolbar
   - Capture screenshot again

---

## Method 2: Command Menu Screenshots (Fastest)

### **Best for:** Quick captures without opening menus

### **Steps:**

1. **Open Command Menu**
   - Press `Cmd+Shift+P` (Mac) / `Ctrl+Shift+P` (Windows)
   - While DevTools is open

2. **Type "screenshot"**
   - You'll see 4 options:

   **a) Capture screenshot**
   - Captures visible viewport only
   - Keyboard shortcut available

   **b) Capture full size screenshot** ⭐ **RECOMMENDED**
   - Captures entire scrollable page
   - Perfect for long pages (Today View, Medications list)

   **c) Capture area screenshot**
   - Click and drag to select specific region
   - Great for capturing just a card or section

   **d) Capture node screenshot**
   - Right-click any element → "Capture node screenshot"
   - Captures specific DOM element with perfect bounds

3. **Screenshot Auto-Downloads**
   - Saved to your Downloads folder
   - Named with timestamp: `Screenshot 2026-01-27 at 3.14.25 PM.png`

---

## Method 3: Screenshot Demo Page (Custom)

### **Best for:** Consistent framing and quick comparison shots

### **Steps:**

1. **Navigate to Demo**
   - Go to `/screenshot-demo` in your browser

2. **Set Up Capture**
   - Select device in DevTools (iPhone 14 Pro recommended)
   - Choose screen from dropdown
   - Toggle Left-Hand Mode if needed

3. **Capture**
   - Use DevTools screenshot (Method 1 or 2)
   - All screens have consistent formatting
   - Includes simulated status bar and phone frame

4. **Batch Capture**
   - Keep DevTools open
   - Switch between screens using dropdown
   - Press `Cmd+Shift+P` → "Capture screenshot" for each
   - You'll have a full set in minutes!

---

## Method 4: Browser Extensions (Advanced)

### **GoFullPage (Chrome/Edge)**

**Install:** [Chrome Web Store](https://chrome.google.com/webstore)

**Features:**
- One-click full-page screenshots
- Automatic scrolling
- High-resolution output
- PDF export option

**Usage:**
1. Install extension
2. Navigate to any CareConnect page
3. Click GoFullPage icon in toolbar
4. Wait for auto-scroll and capture
5. Download image

### **Awesome Screenshot (Multi-browser)**

**Features:**
- Annotate screenshots before saving
- Blur sensitive information
- Add arrows, text, shapes
- Screen recording

**Usage:**
1. Install from browser store
2. Click extension icon
3. Choose "Capture visible part" or "Capture entire page"
4. Annotate if needed
5. Download

---

## Method 5: Device Simulators (Most Realistic)

### **For iOS: Xcode Simulator (Mac Only)**

1. **Open Xcode**
   - Launch Xcode app on Mac
   - Window → Devices and Simulators

2. **Start Simulator**
   - Choose device (iPhone 14 Pro)
   - Click "Open" to launch simulator

3. **Open Safari**
   - Navigate to your CareConnect URL
   - Use real Safari browser in simulator

4. **Capture**
   - `Cmd+S` to save screenshot
   - Or File → Save Screen

**Pros:**
- True iOS Safari rendering
- Real notch/Dynamic Island
- Accurate safe areas

### **For Android: Android Studio Emulator**

1. **Open Android Studio**
   - Tools → Device Manager

2. **Create Virtual Device**
   - Choose Pixel 7 or Samsung Galaxy S20
   - Download system image if needed

3. **Launch Emulator**
   - Open Chrome browser in emulator
   - Navigate to CareConnect

4. **Capture**
   - Click camera icon in emulator toolbar
   - Or use DevTools within emulator

---

## Method 6: Third-Party Device Mockup Tools

### **Screely (screely.com) - Free**

**Best for:** Quick mockups with device frames

**Steps:**
1. Take screenshot using any method above
2. Visit screely.com
3. Upload screenshot
4. Choose device frame (iPhone, iPad, Android)
5. Choose background (gradient, color, image)
6. Download high-res mockup

### **Mockuphone (mockuphone.com) - Free**

**Features:**
- 1000+ device frames
- iPhone, iPad, Android, Mac, Watch
- Custom background colors
- Perspective and shadow options

**Steps:**
1. Upload screenshot
2. Select device model
3. Adjust position/orientation
4. Download PNG

### **Previewed (previewed.app) - Paid**

**Features:**
- Animated mockups
- Video export
- 3D perspectives
- Clay/glass effects

---

## Importing to Figma

### **Method A: Drag and Drop**

1. **Capture screenshots** using any method above
2. **Open Figma** design file
3. **Drag image files** directly into Figma canvas
4. **Position and resize** as needed

### **Method B: Paste from Clipboard**

1. **Take screenshot** (saves to clipboard)
2. **In Figma**, press `Cmd+V` (Mac) / `Ctrl+V` (Windows)
3. Screenshot appears on canvas
4. Resize to fit artboards

### **Method C: Place Image Tool**

1. **In Figma**, press `Cmd+Shift+K` or go to Place image
2. **Select screenshot file** from computer
3. **Click to place** on canvas
4. Drag to create frame

### **Method D: Fill Existing Frame**

1. **Create frame** in Figma (iPhone 14 Pro: 393×852)
2. **Select frame**
3. **Fill section** → Image → Choose file
4. **Adjust fill** (Crop, Fit, Fill, Tile)

---

## Device Frame Templates in Figma

### **Free Figma Plugins:**

**1. Mockup (by Aleksey Oleynikov)**
- Search plugins: "Mockup"
- Select frame with screenshot
- Run plugin → Choose device
- Instant device mockup

**2. Artboard Studio**
- 3D device mockups
- Animated mockups
- Export as image or video

**3. Devices by Facebook**
- Official Facebook device frames
- iPhone, iPad, Android, Desktop
- High-quality SVG frames

### **Community Files:**

Search Figma Community for:
- "iPhone 14 Pro Mockup"
- "Android Device Frames"
- "Mobile App Mockup Kit"
- "iOS UI Kit"

**Popular files:**
- iOS 17 UI Kit (Apple)
- Material Design 3 Kit (Google)
- Device Mockups (Various creators)

---

## Recommended Device Sizes for CareConnect

### **Primary (Must Have):**

| Device | Width | Height | Use Case |
|--------|-------|--------|----------|
| iPhone 14 Pro | 393px | 852px | Primary iOS testing |
| iPhone SE | 375px | 667px | Small screen testing |
| iPad Pro 11" | 834px | 1194px | Tablet portrait |
| Samsung Galaxy S20 | 360px | 800px | Android testing |

### **Secondary (Nice to Have):**

| Device | Width | Height | Use Case |
|--------|-------|--------|----------|
| iPhone 14 Pro Max | 430px | 932px | Large iOS screen |
| Pixel 7 | 412px | 915px | Google device |
| iPad Pro 12.9" | 1024px | 1366px | Large tablet |

### **Landscape Variants:**

| Device | Width | Height | Notes |
|--------|-------|--------|-------|
| iPhone 14 Pro | 852px | 393px | Landscape testing |
| iPad Pro 11" | 1194px | 834px | Common tablet orientation |

---

## Screenshot Checklist for Documentation

Use this checklist to ensure you capture everything needed for Figma:

### **Core Screens (Portrait):**
- [ ] Login screen
- [ ] Onboarding (hand selection)
- [ ] Today View (with due medications)
- [ ] Medications List
- [ ] Add Medication form
- [ ] Medication Detail
- [ ] Refill Request (all 3 steps)
- [ ] Calendar
- [ ] Communications (message templates)
- [ ] Settings

### **Left-Hand Mode Variants:**
- [ ] Today View (left-hand mode)
- [ ] Medications List (left-hand mode)
- [ ] Settings (showing toggle)
- [ ] Add Medication (left-hand mode)

### **Special States:**
- [ ] Empty state (no medications)
- [ ] Error state (form validation)
- [ ] Success toast notification
- [ ] Loading state
- [ ] Keyboard visible (form fields)

### **Landscape Orientation:**
- [ ] Today View (landscape)
- [ ] Medications List (landscape)
- [ ] Add Medication (landscape)

### **Tablet/iPad:**
- [ ] Today View (iPad)
- [ ] Settings (iPad)
- [ ] Two-column layouts (if applicable)

### **Accessibility Features:**
- [ ] Large text size (200% zoom)
- [ ] Touch target highlights
- [ ] Focus indicators (keyboard navigation)

---

## Tips for High-Quality Screenshots

### **1. Use Consistent Device**
- Stick to iPhone 14 Pro (393×852) for consistency
- All mobile shots should use same device
- Creates cohesive presentation in Figma

### **2. Clear Cache & Reload**
- Before capturing, clear browser cache
- Hard reload: `Cmd+Shift+R` (Mac) / `Ctrl+Shift+R` (Windows)
- Ensures latest styles load

### **3. Disable Browser Extensions**
- Extensions can inject UI elements
- Use Incognito/Private mode for clean shots
- Or temporarily disable extensions

### **4. Set Realistic Data**
- Use realistic medication names (not "Test123")
- Real dates and times
- Professional messaging content

### **5. Capture Interactions**
- Hover states (desktop)
- Pressed states (buttons)
- Focus states (keyboard navigation)
- Modal overlays

### **6. Perfect Timing**
- Wait for animations to complete
- Ensure all images/icons loaded
- Check for placeholder text

### **7. Optimal Resolution**
- DevTools captures at actual pixel dimensions
- For retina displays: 2× resolution (393px → 786px width)
- Figma auto-handles @2x imports

---

## Organizing Screenshots in Figma

### **Create Presentation Board:**

```
Figma Page: "CareConnect Screenshots"

├─ Frame: "iOS - Portrait"
│  ├─ iPhone 14 Pro - Login
│  ├─ iPhone 14 Pro - Today View
│  ├─ iPhone 14 Pro - Medications
│  └─ iPhone 14 Pro - Add Medication
│
├─ Frame: "iOS - Landscape"
│  ├─ iPhone 14 Pro - Today View
│  └─ iPhone 14 Pro - Medications
│
├─ Frame: "Left-Hand Mode"
│  ├─ iPhone 14 Pro - Today View (LH)
│  ├─ iPhone 14 Pro - Settings (LH)
│  └─ iPhone 14 Pro - Add Med (LH)
│
├─ Frame: "iPad"
│  ├─ iPad Pro 11" - Today View
│  └─ iPad Pro 11" - Settings
│
└─ Frame: "Android"
   ├─ Samsung Galaxy S20 - Today View
   └─ Samsung Galaxy S20 - Medications
```

### **Add Annotations:**

1. **Use Figma Text Tool** (T)
   - Add labels for key features
   - "56×56px touch targets"
   - "Left-hand optimized layout"
   - "Context-aware keyboard"

2. **Use Arrows/Lines**
   - Point to accessibility features
   - Highlight touch zones
   - Show spacing measurements

3. **Add Backgrounds**
   - Consistent background color for all screenshots
   - Or use gradient backgrounds for polish

---

## Automation (Advanced)

### **Playwright Screenshot Script**

If you need to capture many screens automatically:

```javascript
// screenshot.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 }, // iPhone 14 Pro
  });
  const page = await context.newPage();

  const screens = [
    { url: '/login', name: 'login' },
    { url: '/', name: 'today' },
    { url: '/medications', name: 'medications' },
    { url: '/medications/add', name: 'add-medication' },
    { url: '/settings', name: 'settings' },
  ];

  for (const screen of screens) {
    await page.goto(`http://localhost:5173${screen.url}`);
    await page.waitForTimeout(1000); // Wait for animations
    await page.screenshot({ 
      path: `screenshots/${screen.name}.png`,
      fullPage: true 
    });
  }

  await browser.close();
})();
```

**Run:** `node screenshot.js`

---

## Quick Reference Commands

| Action | Mac | Windows/Linux |
|--------|-----|---------------|
| Open DevTools | `Cmd+Option+I` | `Ctrl+Shift+I` |
| Device toolbar | `Cmd+Shift+M` | `Ctrl+Shift+M` |
| Command menu | `Cmd+Shift+P` | `Ctrl+Shift+P` |
| Hard reload | `Cmd+Shift+R` | `Ctrl+Shift+R` |
| Incognito | `Cmd+Shift+N` | `Ctrl+Shift+N` |

---

## Conclusion

You now have multiple methods to capture high-quality screenshots of CareConnect for use in Figma:

1. ⚡ **Fastest:** Chrome DevTools + Command Menu
2. 🎯 **Most Consistent:** Screenshot Demo Page
3. 📱 **Most Realistic:** iOS Simulator / Android Emulator
4. 🎨 **Best Presentation:** Mockup tools + Figma plugins

**Recommended Workflow:**
1. Use `/screenshot-demo` page to capture all screens quickly
2. Use DevTools device emulation for accurate dimensions
3. Import to Figma via drag-and-drop
4. Add device frames using Figma plugins
5. Annotate with labels and measurements

Happy screenshotting! 📸
