# 🎨 CareConnect Wireframe Creation Guide

Complete guide to creating professional wireframes from the CareConnect app for design documentation, presentations, and Figma.

---

## Table of Contents

1. [Quick Start: Wireframe Generator](#quick-start-wireframe-generator)
2. [Manual Wireframing Methods](#manual-wireframing-methods)
3. [Figma Wireframe Techniques](#figma-wireframe-techniques)
4. [Automated Wireframe Tools](#automated-wireframe-tools)
5. [Wireframe Styles & Best Practices](#wireframe-styles--best-practices)
6. [Exporting & Documentation](#exporting--documentation)

---

## Quick Start: Wireframe Generator

### **I've Built a Custom Wireframe Generator for You!**

**Access:** Navigate to `/wireframe` in your browser

### **Features:**

✅ **10 Pre-built Wireframes:**
- Today View
- Medications List
- Add Medication Form
- Medication Detail
- Refill Request (3-step flow)
- Calendar
- Messages
- Settings
- Login
- Onboarding

✅ **3 Wireframe Styles:**
- **Sketch Style** - Hand-drawn look with dashed borders
- **Minimal** - Clean, professional wireframes (default)
- **Detailed** - More refined with realistic spacing

✅ **Annotation System:**
- Toggle on/off annotations
- Shows interaction patterns ("56×56px button", "3-step process")
- Highlights accessibility features

✅ **Measurement Overlays:**
- Shows pixel dimensions
- Vertical and horizontal measurements
- Perfect for design specs

✅ **Export Options:**
- **SVG Export** - Vector format for Figma/Sketch
- **PNG Export** - Right-click → "Capture node screenshot"
- High-quality, scalable output

### **How to Use:**

1. **Navigate to `/wireframe`**
2. **Select screen** from dropdown
3. **Choose wireframe style** (Sketch, Minimal, Detailed)
4. **Toggle annotations** (on/off)
5. **Toggle measurements** (on/off)
6. **Export:**
   - Click "Export SVG" button
   - Or right-click wireframe → "Capture node screenshot"
7. **Import to Figma** (drag and drop)

### **Quick Export Workflow:**

```
1. Select "Today View" → Export SVG
2. Select "Medications List" → Export SVG
3. Select "Add Medication" → Export SVG
... (repeat for all screens)
4. Drag all SVGs into Figma
5. Arrange in presentation layout
6. Done! ✅
```

**Time needed:** ~5 minutes for complete wireframe set

---

## Manual Wireframing Methods

### **Method 1: Desaturate + Simplify (Chrome DevTools)**

Turn existing screenshots into wireframes using browser DevTools.

#### **Steps:**

1. **Capture Screenshot**
   - Navigate to CareConnect screen
   - `F12` → Device toolbar (`Cmd+Shift+M`)
   - `Cmd+Shift+P` → "Capture screenshot"

2. **Apply Grayscale Filter**
   - Open DevTools → Elements tab
   - Add CSS to `<body>`:
   ```css
   body {
     filter: grayscale(100%) brightness(1.2) contrast(0.8);
   }
   ```

3. **Simplify Colors (Optional)**
   - Replace gradients with solid grays:
   ```css
   .bg-gradient-to-b {
     background: #e5e7eb !important;
   }
   .bg-blue-600 {
     background: #9ca3af !important;
   }
   ```

4. **Add Wireframe Borders**
   ```css
   * {
     outline: 1px dashed #9ca3af;
   }
   button, input, a {
     outline: 2px solid #374151;
   }
   ```

5. **Capture Again**
   - Screenshot now looks like a wireframe
   - Remove filters when done

**Pros:**
- Uses actual app structure
- Accurate spacing and proportions
- Fast for existing screens

**Cons:**
- Requires CSS knowledge
- Not ideal for early-stage wireframes

---

### **Method 2: Browser Extension - Wireframify**

#### **Wireframe.cc Extension (Chrome)**

**Install:** Search Chrome Web Store for "wireframe css"

**Features:**
- One-click wireframe mode
- Converts colors to grayscale
- Simplifies complex UI
- Adds wireframe-style borders

**Usage:**
1. Install extension
2. Navigate to CareConnect page
3. Click extension icon
4. Enable "Wireframe Mode"
5. Capture screenshot
6. Disable when done

---

### **Method 3: Convert in Design Tools**

#### **Photoshop/GIMP:**

1. **Open Screenshot**
2. **Desaturate:** Image → Adjustments → Desaturate
3. **Posterize:** Image → Adjustments → Posterize (4-6 levels)
4. **Add Border Effect:**
   - Filter → Stylize → Find Edges
   - Reduce opacity to 30%
   - Overlay on grayscale image
5. **Export**

#### **Figma (Post-import):**

1. **Import screenshot**
2. **Add effects:**
   - Saturation: -100
   - Brightness: +20
   - Contrast: -10
3. **Overlay dashed borders:**
   - Create rectangle
   - Stroke: 2px dashed
   - Fill: none
   - Position over elements

---

## Figma Wireframe Techniques

### **Method 1: Wireframe Kit from Community**

#### **Recommended Kits:**

1. **"Wireframe Kit" by Anima**
   - Search Figma Community: "Wireframe Kit"
   - Includes all standard UI components
   - Mobile and desktop variants

2. **"Low-Fidelity Wireframe Kit"**
   - Sketch-style components
   - Hand-drawn aesthetic
   - Great for early-stage design

3. **"iOS Wireframe Kit"**
   - Apple Human Interface Guidelines
   - iPhone/iPad components
   - Native iOS patterns

#### **How to Use:**

1. **Open Figma Community**
   - File → Get Community File
   - Search "Wireframe Kit"

2. **Duplicate Kit**
   - Click "Duplicate" to add to your files

3. **Copy Components**
   - Select components you need
   - Copy to your CareConnect file

4. **Recreate Screens**
   - Use kit components to rebuild CareConnect screens
   - Match layout from screenshots
   - Maintain spacing and proportions

---

### **Method 2: Build Custom Wireframe Components**

Create reusable wireframe components for CareConnect.

#### **Component Library:**

```
CareConnect Wireframe Components
├─ Atoms
│  ├─ WF/Button/Primary (56×56px)
│  ├─ WF/Button/Secondary
│  ├─ WF/Input (text, number, email)
│  ├─ WF/Icon (placeholder)
│  └─ WF/Text (heading, body, caption)
│
├─ Molecules
│  ├─ WF/MedicationCard
│  ├─ WF/FormField
│  ├─ WF/NavItem
│  └─ WF/QuickAction
│
└─ Organisms
   ├─ WF/Header
   ├─ WF/BottomNav
   ├─ WF/MedicationList
   └─ WF/Form
```

#### **Creating Components:**

**1. Button Component:**
```
Size: 56×56px (to match AAA accessibility)
Fill: Light gray (#F3F4F6)
Stroke: 2px solid #D1D5DB
Border Radius: 12px
Text: "Button Label" (14px, medium)
```

**2. Input Component:**
```
Size: Full width × 48px
Fill: White
Stroke: 2px solid #D1D5DB
Border Radius: 12px
Placeholder: Gray text (#9CA3AF)
Label: 12px, above input
```

**3. Icon Placeholder:**
```
Size: 24×24px
Fill: Light gray (#E5E7EB)
Stroke: 1px solid #D1D5DB
Border Radius: 4px
```

**4. Text Placeholder:**
```
Heading: 2-3 horizontal lines (varying widths)
Body: 3-4 lines (70-100% width)
Color: #D1D5DB
Height: 8-12px per line
Spacing: 4px between lines
```

#### **Component Variants:**

**Button Variants:**
- Default (secondary)
- Primary (darker fill)
- Icon only (square)
- With icon + text

**Input Variants:**
- Text input
- Number input (keyboard icon)
- Select/dropdown (chevron icon)
- Textarea (taller)

---

### **Method 3: Trace Screenshots with Shapes**

#### **Steps:**

1. **Import Screenshot to Figma**
   - Drag PNG into Figma canvas

2. **Lock Screenshot Layer**
   - Select → Right-click → Lock

3. **Reduce Opacity**
   - Set screenshot opacity to 30-50%

4. **Trace with Rectangles**
   - Press `R` for rectangle tool
   - Draw rectangles over buttons, inputs, cards
   - Use consistent fill/stroke:
     - Fill: #F3F4F6
     - Stroke: 2px #D1D5DB

5. **Add Text Placeholders**
   - Press `T` for text tool
   - Type placeholder text or "———"
   - Color: #9CA3AF

6. **Delete Screenshot**
   - Unlock and delete original screenshot
   - You now have a clean wireframe!

#### **Auto Layout Setup:**

1. **Group related elements**
   - Select elements → `Cmd+Option+G`

2. **Add Auto Layout**
   - Select group → `Shift+A`
   - Set spacing (8px for spacing between elements)
   - Set padding (24px for containers)

3. **Make Components**
   - Select wireframe card → `Cmd+Option+K`
   - Name: "WF/MedicationCard"
   - Reuse across screens

---

## Automated Wireframe Tools

### **Tool 1: Balsamiq Wireframes**

**Best for:** Low-fidelity, sketch-style wireframes

#### **Features:**
- Hand-drawn aesthetic
- Pre-built UI components
- Rapid wireframing
- Export to PNG/PDF

#### **CareConnect Workflow:**

1. **Create New Project**
   - Choose mobile template (375×667)

2. **Add Components:**
   - Drag "Button Bar" for bottom nav
   - Drag "Card" for medication cards
   - Drag "Form" for input screens
   - Drag "Icon" for placeholders

3. **Recreate Screens:**
   - Today View
   - Medications List
   - Add Medication Form
   - (etc.)

4. **Export:**
   - File → Export → PNG
   - Or File → Export → PDF (all screens)

5. **Import to Figma:**
   - Drag PNGs into Figma
   - Arrange in presentation layout

---

### **Tool 2: Whimsical**

**Best for:** Quick, collaborative wireframes

#### **Features:**
- Real-time collaboration
- Web-based (no install)
- Simple drag-and-drop
- Comments and annotations

#### **CareConnect Workflow:**

1. **Create Wireframe**
   - New Document → Wireframe

2. **Add Screen Frame**
   - Select iPhone frame (375×667)

3. **Add Components:**
   - Header bar
   - Content cards
   - Bottom navigation
   - Buttons

4. **Export:**
   - File → Export → PNG or SVG
   - Import to Figma

---

### **Tool 3: Figma Plugins**

#### **1. Wireframe Plugin (by Mirko Santangelo)**

**Install:** Plugins → Browse → Search "Wireframe"

**Features:**
- Converts high-fidelity designs to wireframes
- One-click conversion
- Customizable style

**Usage:**
1. Select screenshot/design in Figma
2. Plugins → Wireframe
3. Click "Convert to Wireframe"
4. Adjust settings (color, border, etc.)
5. Apply

#### **2. Autoflow (for User Flows)**

**Install:** Plugins → Browse → Search "Autoflow"

**Features:**
- Automatic user flow diagrams
- Connects wireframe screens
- Shows navigation paths

**Usage:**
1. Arrange wireframes on canvas
2. Plugins → Autoflow
3. Draw arrows between screens
4. Plugin auto-formats flow diagram

#### **3. Chart (for Diagrams)**

**Install:** Plugins → Browse → Search "Chart"

**Features:**
- Flowcharts
- Sitemaps
- IA diagrams

**Usage:**
1. Create wireframe screens
2. Use Chart to create sitemap
3. Link wireframes to sitemap nodes

---

### **Tool 4: HTML/CSS → Wireframe Converter**

#### **Screenshotlayer API (Automated)**

Convert live CareConnect app to wireframes programmatically.

```javascript
// wireframe-converter.js
const puppeteer = require('puppeteer');

async function generateWireframes() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Inject wireframe CSS
  await page.addStyleTag({
    content: `
      * {
        filter: grayscale(100%);
      }
      
      .bg-blue-600, .bg-gradient-to-b {
        background: #e5e7eb !important;
      }
      
      button, input, a, .card {
        border: 2px dashed #9ca3af !important;
        background: #f3f4f6 !important;
      }
      
      img {
        opacity: 0.3;
        filter: grayscale(100%);
      }
    `
  });

  const screens = [
    { url: '/login', name: 'login' },
    { url: '/', name: 'today' },
    { url: '/medications', name: 'medications' },
    { url: '/medications/add', name: 'add-medication' },
    { url: '/settings', name: 'settings' },
  ];

  for (const screen of screens) {
    await page.goto(`http://localhost:5173${screen.url}`);
    await page.setViewport({ width: 393, height: 852 });
    await page.screenshot({ 
      path: `wireframes/${screen.name}-wireframe.png`,
      fullPage: true 
    });
  }

  await browser.close();
}

generateWireframes();
```

**Run:** `node wireframe-converter.js`

**Output:** Wireframe-style screenshots in `/wireframes` folder

---

## Wireframe Styles & Best Practices

### **Style 1: Sketch/Hand-Drawn**

**Characteristics:**
- Dashed borders
- Irregular lines
- Hand-drawn icons
- Rough text

**When to use:**
- Early-stage ideation
- Brainstorming sessions
- Low-commitment explorations
- Client presentations (shows it's still flexible)

**Tools:**
- Balsamiq
- Wireframe.cc
- Excalidraw

**CSS for Sketch Style:**
```css
* {
  font-family: 'Comic Sans MS', cursive; /* Or 'Kalam', 'Indie Flower' */
  border: 2px dashed #666;
  border-radius: 0;
}

button {
  transform: rotate(-0.5deg); /* Slight rotation for hand-drawn feel */
}
```

---

### **Style 2: Minimal/Clean**

**Characteristics:**
- Solid borders
- Grayscale colors
- Consistent spacing
- Professional appearance

**When to use:**
- Design documentation
- Developer handoff
- Stakeholder presentations
- Design systems

**Tools:**
- Figma (manual)
- Whimsical
- Custom wireframe generator

**CSS for Minimal Style:**
```css
* {
  font-family: 'Inter', -apple-system, sans-serif;
  border: 2px solid #d1d5db;
  border-radius: 8px;
}

button {
  background: #f3f4f6;
  border: 2px solid #9ca3af;
}
```

---

### **Style 3: Detailed/High-Fidelity**

**Characteristics:**
- Refined spacing
- Real content (or close to it)
- Subtle shadows
- Near-final appearance

**When to use:**
- Final design review
- Usability testing
- Development specifications
- Polished presentations

**Tools:**
- Figma
- Adobe XD
- Sketch

---

### **Best Practices:**

#### **1. Maintain Accurate Proportions**
- Use actual pixel dimensions from app
- Today header: 128px
- Medication card: 140px
- Bottom nav: 72px
- Buttons: 56×56px

#### **2. Show Hierarchy**
- Use grayscale to indicate importance:
  - Primary actions: Dark gray (#374151)
  - Secondary actions: Medium gray (#9CA3AF)
  - Disabled/inactive: Light gray (#E5E7EB)

#### **3. Label Interactive Elements**
- Buttons: Label with action ("Save", "Cancel")
- Inputs: Show label + placeholder
- Icons: Use simple shapes (don't draw detailed icons)

#### **4. Annotate Key Features**
- Accessibility: "56×56px touch target (AAA)"
- Interactions: "Tap to expand"
- States: "Active state", "Error state"
- Flows: "→ Goes to Medication Detail"

#### **5. Show States**
- Default state
- Hover state (desktop)
- Active/pressed state
- Disabled state
- Error state
- Empty state

#### **6. Document Spacing**
- Use measurement lines
- Show padding/margins
- Indicate spacing between elements
- Grid overlay (8px or 4px grid)

---

## Exporting & Documentation

### **Export Formats:**

#### **1. SVG (Vector)**

**Best for:**
- Figma import (maintains editability)
- Scaling to any size
- Print documentation

**How to export:**
- Wireframe Generator: Click "Export SVG"
- Figma: Select → Export → SVG
- Browser: Right-click → Save as SVG (if supported)

**Import to Figma:**
- Drag SVG file into Figma
- Remains editable (paths, shapes, text)

---

#### **2. PNG (Raster)**

**Best for:**
- Quick previews
- Email attachments
- Presentations (PowerPoint, Keynote)

**How to export:**
- Figma: Select → Export → PNG (2× for retina)
- Browser: Right-click → "Capture node screenshot"

**Recommended resolution:**
- 1× for web (393×852 for iPhone 14 Pro)
- 2× for print (786×1704)

---

#### **3. PDF (Multi-page)**

**Best for:**
- Complete documentation
- Client deliverables
- Printable specs

**How to create:**

**Figma:**
1. Arrange all wireframes on canvas
2. File → Export
3. Choose PDF
4. Select frames to include
5. Export

**PowerPoint/Keynote:**
1. Import PNG wireframes
2. One screen per slide
3. Add annotations
4. Export as PDF

---

### **Documentation Templates:**

#### **Wireframe Presentation Structure:**

```
CareConnect Wireframes
├─ Cover Page
│  └─ Title, Date, Version
│
├─ App Flow Overview
│  └─ Sitemap or user flow diagram
│
├─ Core Screens (Portrait)
│  ├─ Login
│  ├─ Onboarding
│  ├─ Today View
│  ├─ Medications List
│  ├─ Add Medication
│  ├─ Medication Detail
│  ├─ Refill Request (Steps 1-3)
│  ├─ Calendar
│  ├─ Messages
│  └─ Settings
│
├─ Key Interactions
│  ├─ Navigation flow
│  ├─ Form submission
│  ├─ Error states
│  └─ Success states
│
├─ Responsive Variants
│  ├─ Landscape orientation
│  ├─ Tablet (iPad)
│  └─ Large phones
│
├─ Accessibility Features
│  ├─ Left-hand mode wireframe
│  ├─ Touch target sizing
│  └─ Keyboard navigation
│
└─ Appendix
   ├─ Component library
   ├─ Design specs
   └─ Notes
```

---

#### **Annotation Best Practices:**

**Use Color-Coded Annotations:**
- 🔵 Blue = Navigation/Flow ("Tap to go to...")
- 🟢 Green = Success/Confirmation ("Shows success toast")
- 🔴 Red = Error/Warning ("Error state")
- 🟡 Yellow = Important note ("56×56px AAA compliant")
- ⚫ Gray = General note ("Optional field")

**Add Numbered Callouts:**
```
[1] Header with gradient background
[2] Due medication card (140px height)
[3] Primary CTA button (56×56px)
[4] Bottom navigation (5 items, 56×56px each)
```

**Include Interaction Notes:**
```
→ Tap "Take Now" → Logs medication → Shows success toast
→ Swipe left on card → Reveals delete option (future feature)
→ Long press card → Opens quick actions menu (future feature)
```

---

### **Figma Organization:**

#### **Page Structure:**

```
CareConnect Design File
├─ 📱 Wireframes
│  ├─ Frame: "iPhone 14 Pro Wireframes" (393×852)
│  │  ├─ Login
│  │  ├─ Today View
│  │  ├─ Medications List
│  │  └─ ...
│  │
│  ├─ Frame: "iPad Wireframes" (834×1194)
│  │  └─ ...
│  │
│  └─ Components (wireframe components)
│
├─ 🎨 High-Fidelity Designs
│  └─ ...
│
├─ 🔀 User Flows
│  └─ Flow diagrams connecting wireframes
│
├─ 📏 Specs
│  └─ Annotated wireframes with measurements
│
└─ 📖 Documentation
   └─ Notes, guidelines, accessibility docs
```

#### **Naming Convention:**

```
WF = Wireframe prefix
HF = High-fidelity prefix
COMP = Component prefix

Examples:
- WF/Today-View
- WF/Medications-List
- WF/Add-Med-Form
- COMP/WF/Button-Primary
- COMP/WF/Input-Field
```

---

## Complete Wireframing Workflow

### **Recommended Workflow for CareConnect:**

#### **Option A: Fast (Using Wireframe Generator)**

1. ✅ Navigate to `/wireframe`
2. ✅ Export all 10 screens as SVG (5 minutes)
3. ✅ Import SVGs to Figma
4. ✅ Arrange in presentation layout
5. ✅ Add annotations using text tool
6. ✅ Export as PDF for documentation
7. ✅ **Total time: 15 minutes**

---

#### **Option B: Custom (Manual in Figma)**

1. ✅ Screenshot all screens using `/screenshot-demo` (5 min)
2. ✅ Import to Figma
3. ✅ Trace screenshots with rectangles and text (30 min)
4. ✅ Create component library (20 min)
5. ✅ Build all screens using components (40 min)
6. ✅ Add annotations and measurements (20 min)
7. ✅ Create user flow diagram (15 min)
8. ✅ Export documentation (10 min)
9. ✅ **Total time: 2-3 hours**

**Pros:** Fully customizable, reusable components, professional
**Cons:** Time-consuming

---

#### **Option C: Hybrid (Best of Both)**

1. ✅ Use `/wireframe` generator for quick wireframes (5 min)
2. ✅ Import to Figma
3. ✅ Trace key components to create library (20 min)
4. ✅ Refine important screens manually (20 min)
5. ✅ Use generator wireframes for less critical screens
6. ✅ Add annotations and measurements (15 min)
7. ✅ Export documentation (10 min)
8. ✅ **Total time: 1 hour**

**Pros:** Fast + professional, best balance
**Cons:** None!

---

## Quick Reference

### **Keyboard Shortcuts (Figma):**

| Action | Shortcut |
|--------|----------|
| Rectangle tool | `R` |
| Text tool | `T` |
| Frame tool | `F` |
| Auto layout | `Shift+A` |
| Create component | `Cmd+Option+K` |
| Duplicate | `Cmd+D` |
| Group | `Cmd+G` |
| Export | `Cmd+Shift+E` |

### **Common Wireframe Dimensions (CareConnect):**

| Element | Dimensions |
|---------|------------|
| iPhone 14 Pro frame | 393×852px |
| iPad Pro 11" frame | 834×1194px |
| Header height | 128px |
| Medication card | Full width × 140px |
| Button (primary) | 56×56px |
| Bottom nav | Full width × 72px |
| Input field | Full width × 48px |
| Form padding | 24px |
| Element spacing | 8px |

### **Color Palette (Wireframes):**

| Element | Color |
|---------|-------|
| Background | #F9FAFB |
| Card fill | #F3F4F6 |
| Border (default) | #D1D5DB |
| Border (primary) | #9CA3AF |
| Text placeholder | #9CA3AF |
| Primary element | #374151 |

---

## Conclusion

You now have **multiple methods** to create wireframes from CareConnect:

1. ⚡ **Fastest:** Use `/wireframe` generator → Export SVG → Import to Figma (5 min)
2. 🎨 **Most Professional:** Manual Figma wireframes with custom components (2-3 hours)
3. ⚖️ **Best Balance:** Hybrid approach (1 hour)
4. 🤖 **Automated:** Puppeteer script for bulk wireframe generation

**My Recommendation:**

**For quick documentation:**
1. Use `/wireframe` generator
2. Export all screens as SVG
3. Import to Figma
4. Add minimal annotations
5. ✅ Done!

**For client presentations:**
1. Use `/wireframe` generator as base
2. Import to Figma
3. Create custom component library
4. Refine key screens
5. Add detailed annotations
6. Create user flow diagram
7. Export as PDF
8. ✅ Professional deliverable!

**Start now:** Navigate to `/wireframe` and export your first wireframe! 🎨✨
