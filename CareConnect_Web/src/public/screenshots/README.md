# CareConnect Screenshots

## Required Screenshots

Screenshots are used in app stores and installation prompts to showcase CareConnect's features.

### Mobile Screenshots (narrow form factor)

**Dimensions**: 750×1334px (iPhone 8 size, safe for all devices)

1. `mobile-dashboard.png`
   - Today's view with medications due
   - Upcoming appointments visible
   - Quick action buttons
   - Shows left-hand accessibility

2. `mobile-medications.png`
   - Medication list view
   - Shows medication cards
   - Active/inactive status
   - Left-aligned CTAs

### Desktop Screenshots (wide form factor)

**Dimensions**: 1920×1080px (standard HD)

3. `desktop-dashboard.png`
   - Full dashboard with sidebar
   - Medications, appointments, wellness
   - Shows responsive 3-column layout
   - Navigation visible

---

## How to Create Screenshots

### Option 1: Manual Screenshots

1. **Navigate to the page** you want to capture
2. **Set window size** (DevTools → Device toolbar)
   - Mobile: 375×667 then scale up to 750×1334
   - Desktop: 1920×1080
3. **Fill with demo data** (use realistic mock data)
4. **Take screenshot** (browser dev tools or screenshot tool)
5. **Crop and optimize** (keep under 500KB each)

### Option 2: Automated Screenshots (Playwright)

```bash
npm install -D @playwright/test

# Create screenshot script
npx playwright codegen http://localhost:5173
```

Then capture screenshots programmatically:

```javascript
// screenshots.spec.js
const { test } = require('@playwright/test');

test('mobile dashboard screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 750, height: 1334 });
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ 
    path: 'public/screenshots/mobile-dashboard.png',
    fullPage: false 
  });
});

test('desktop dashboard screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/dashboard');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ 
    path: 'public/screenshots/desktop-dashboard.png',
    fullPage: false 
  });
});
```

### Option 3: Use Design Tool

1. **Figma/Sketch**: Design ideal screenshots
2. **Add demo content** that looks real
3. **Export as PNG** at exact dimensions
4. **Optimize file size** with TinyPNG

---

## Content Guidelines

### Do's ✅
- Use realistic demo data (fake names, dates)
- Show key features prominently
- Include branding (CareConnect logo/name)
- Show accessibility features
- Use high-quality images
- Optimize file size (< 500KB each)
- Use consistent color scheme

### Don'ts ❌
- Don't use real patient data (privacy!)
- Don't show error states
- Don't use placeholder text ("Lorem ipsum")
- Don't include browser chrome/UI
- Don't use low-quality images
- Don't exceed file size limits

---

## Demo Data for Screenshots

### Mobile Dashboard (`mobile-dashboard.png`)

**Today's Medications:**
- Lisinopril 10mg - Due at 9:00 AM
- Metformin 500mg - Due at 12:00 PM  
- Atorvastatin 20mg - Due at 8:00 PM

**Upcoming Appointment:**
- Dr. Sarah Johnson - Today at 2:30 PM
- Type: Follow-up Visit

**Quick Actions:**
- Log Wellness
- Refill Request
- View All Meds

### Mobile Medications (`mobile-medications.png`)

**Active Medications (4):**
1. Lisinopril 10mg - Once daily, Morning
2. Metformin 500mg - Twice daily, With meals
3. Atorvastatin 20mg - Once daily, Evening
4. Vitamin D 2000IU - Once daily, Morning

**Inactive (1):**
1. Ibuprofen 200mg - As needed (archived)

### Desktop Dashboard (`desktop-dashboard.png`)

Full layout with:
- **Left sidebar**: Navigation menu
- **Center**: Today's medications + appointments
- **Right**: Wellness log + upcoming refills
- **Top**: Welcome message, settings, profile

---

## Screenshot Labels

Each screenshot has a label in `manifest.json`:

1. **mobile-dashboard.png**
   - Label: "Dashboard view with today's medications and appointments"

2. **mobile-medications.png**
   - Label: "Medication list with left-hand accessibility"

3. **desktop-dashboard.png**
   - Label: "Desktop dashboard with comprehensive overview"

These labels appear in app store listings and help users understand each screenshot.

---

## Optimization

After creating screenshots, optimize them:

```bash
# Using ImageMagick
convert mobile-dashboard.png -quality 85 -strip mobile-dashboard.png

# Using pngquant
pngquant --quality=80-95 --ext .png --force mobile-*.png
pngquant --quality=80-95 --ext .png --force desktop-*.png
```

Or use online tools:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)

**Target size**: 200-400KB per image

---

## Testing Screenshots

1. Add screenshots to this directory
2. Open `manifest.json` - verify paths match
3. Use PWA testing tools:
   - [PWABuilder](https://www.pwabuilder.com/)
   - Chrome DevTools → Application → Manifest
4. Check screenshots appear in install dialog
5. Test on real device

---

## Temporary Placeholders

Until real screenshots are created, you can:

1. Use solid color placeholders
2. Add text overlay describing the view
3. Or skip screenshots (not required for PWA, just nice to have)

They're primarily used for:
- App store listings (if published)
- Enhanced install prompts
- Marketing materials

---

## Notes

- Screenshots are optional but highly recommended
- They improve install conversion rates
- Keep them updated when UI changes significantly
- Can add more screenshots (up to 8 recommended)
- Consider adding captions/annotations for clarity
