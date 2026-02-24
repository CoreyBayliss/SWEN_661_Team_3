# CareConnect Style System Reference

This document provides a comprehensive overview of all styles, typography, sizing, colors, and design tokens used in the CareConnect healthcare application. This reference is designed to help with cross-platform implementations (e.g., Flutter/Dart conversions).

---

## Table of Contents
1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Sizing](#spacing--sizing)
4. [Border Radius](#border-radius)
5. [Component-Specific Styles](#component-specific-styles)
6. [Accessibility Features](#accessibility-features)
7. [Desktop Optimizations](#desktop-optimizations)

---

## Color Palette

### Light Mode Colors

#### Background & Surface Colors
```css
--background: #ffffff              /* Main app background */
--card: #ffffff                    /* Card backgrounds */
--popover: oklch(1 0 0)           /* Popover/dropdown backgrounds (white) */
--input-background: #f3f3f5        /* Input field backgrounds */
--sidebar: oklch(0.985 0 0)       /* Sidebar background (very light gray) */
```

#### Foreground/Text Colors
```css
--foreground: oklch(0.145 0 0)           /* Primary text color (very dark gray/black) */
--card-foreground: oklch(0.145 0 0)      /* Text on cards */
--popover-foreground: oklch(0.145 0 0)   /* Text in popovers */
--muted-foreground: #717182              /* Secondary/muted text */
--sidebar-foreground: oklch(0.145 0 0)   /* Sidebar text */
```

#### Brand & Action Colors
```css
--primary: #030213                       /* Primary brand color (very dark blue/black) - Used for primary buttons, headers */
--primary-foreground: oklch(1 0 0)       /* Text on primary color (white) */
--secondary: oklch(0.95 0.0058 264.53)   /* Secondary accent (light purple/blue) - Used for secondary buttons */
--secondary-foreground: #030213          /* Text on secondary color */
```

#### Semantic Colors
```css
--destructive: #d4183d               /* Error/danger/delete actions (red) */
--destructive-foreground: #ffffff    /* Text on destructive elements (white) */
--muted: #ececf0                     /* Muted backgrounds (light gray) */
--accent: #e9ebef                    /* Accent backgrounds (light gray-blue) */
--accent-foreground: #030213         /* Text on accent backgrounds */
```

#### Interactive Element Colors
```css
--border: rgba(0, 0, 0, 0.1)        /* Standard border color */
--input: transparent                 /* Input border (uses background) */
--switch-background: #cbced4         /* Toggle switch background (gray) */
--ring: oklch(0.708 0 0)            /* Focus ring color (medium gray) */
--sidebar-border: oklch(0.922 0 0)  /* Sidebar dividers */
--sidebar-ring: oklch(0.708 0 0)    /* Sidebar focus states */
```

#### Chart Colors (Data Visualization)
```css
--chart-1: oklch(0.646 0.222 41.116)  /* Orange - Primary data series */
--chart-2: oklch(0.6 0.118 184.704)   /* Cyan - Secondary data series */
--chart-3: oklch(0.398 0.07 227.392)  /* Dark blue - Tertiary data series */
--chart-4: oklch(0.828 0.189 84.429)  /* Yellow-green - Quaternary data series */
--chart-5: oklch(0.769 0.188 70.08)   /* Yellow - Quinary data series */
```

#### Application-Specific Colors (Used in Components)
```css
/* Quick Actions (TodayView component) */
bg-blue-600: #2563eb      /* "Add Medication" button */
bg-green-600: #16a34a     /* "Schedule" button */
bg-purple-600: #9333ea    /* "Quick Message" button */

/* Status Colors */
bg-green-600: #16a34a     /* "Taken" medication button */
bg-orange-50: #fff7ed     /* Low refill warning background */
text-orange-600: #ea580c  /* Low refill warning text */
text-green-700: #15803d   /* Success state text */

/* Grays (Used throughout for structure) */
bg-gray-50: #f9fafb       /* Page background */
bg-gray-100: #f3f4f6      /* Subtle dividers */
border-gray-200: #e5e7eb  /* Card borders */
text-gray-400: #9ca3af    /* Icons, secondary elements */
text-gray-500: #6b7280    /* Tertiary text */
text-gray-600: #4b5563    /* Secondary text */
text-gray-700: #374151    /* Strong secondary text */
text-gray-900: #111827    /* Primary headings */
```

---

### Dark Mode Colors

#### Background & Surface Colors
```css
--background: oklch(0.145 0 0)        /* Main app background (very dark) */
--card: oklch(0.145 0 0)              /* Card backgrounds */
--popover: oklch(0.145 0 0)           /* Popover backgrounds */
--sidebar: oklch(0.205 0 0)           /* Sidebar background (slightly lighter dark) */
```

#### Foreground/Text Colors
```css
--foreground: oklch(0.985 0 0)              /* Primary text (almost white) */
--card-foreground: oklch(0.985 0 0)         /* Text on cards */
--popover-foreground: oklch(0.985 0 0)      /* Text in popovers */
--muted-foreground: oklch(0.708 0 0)        /* Secondary/muted text (medium gray) */
--sidebar-foreground: oklch(0.985 0 0)      /* Sidebar text */
--sidebar-accent-foreground: oklch(0.985 0 0) /* Sidebar accent text */
```

#### Brand & Action Colors (Dark Mode)
```css
--primary: oklch(0.985 0 0)                     /* Primary brand (light) */
--primary-foreground: oklch(0.205 0 0)          /* Text on primary (dark) */
--secondary: oklch(0.269 0 0)                   /* Secondary background (dark gray) */
--secondary-foreground: oklch(0.985 0 0)        /* Text on secondary (light) */
--sidebar-primary: oklch(0.488 0.243 264.376)   /* Sidebar primary (purple-blue) */
--sidebar-primary-foreground: oklch(0.985 0 0)  /* Sidebar primary text */
```

#### Semantic Colors (Dark Mode)
```css
--destructive: oklch(0.396 0.141 25.723)         /* Destructive action background (dark red) */
--destructive-foreground: oklch(0.637 0.237 25.331) /* Destructive text (light red) */
--muted: oklch(0.269 0 0)                        /* Muted backgrounds */
--accent: oklch(0.269 0 0)                       /* Accent backgrounds */
--accent-foreground: oklch(0.985 0 0)            /* Text on accents */
--sidebar-accent: oklch(0.269 0 0)               /* Sidebar accent background */
```

#### Interactive Elements (Dark Mode)
```css
--border: oklch(0.269 0 0)          /* Borders (dark gray) */
--input: oklch(0.269 0 0)           /* Input borders */
--ring: oklch(0.439 0 0)            /* Focus rings (medium gray) */
--sidebar-border: oklch(0.269 0 0)  /* Sidebar dividers */
--sidebar-ring: oklch(0.439 0 0)    /* Sidebar focus states */
```

---

## Typography

### Font Configuration
```css
/* Base font size - scales all text */
--font-size: 16px                    /* Root font size for entire app */
```

### Font Weights
```css
--font-weight-normal: 400            /* Regular text, input fields */
--font-weight-medium: 500            /* Headings, labels, buttons */
```

### Text Size Scale (Tailwind default values referenced)
```css
/* Based on Tailwind's text size scale */
--text-xs: 0.75rem      /* 12px - Small labels, timestamps */
--text-sm: 0.875rem     /* 14px - Secondary text, descriptions */
--text-base: 1rem       /* 16px - Body text, inputs, buttons (default) */
--text-lg: 1.125rem     /* 18px - H3 headings */
--text-xl: 1.25rem      /* 20px - H2 headings */
--text-2xl: 1.5rem      /* 24px - H1 headings, page titles */
--text-3xl: 1.875rem    /* 30px - Large display text */
```

### Typography Element Styles

#### Headings
```css
h1 {
  font-size: var(--text-2xl);        /* 24px / 1.5rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: Page titles, main headers */
}

h2 {
  font-size: var(--text-xl);         /* 20px / 1.25rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: Section headings, card titles */
}

h3 {
  font-size: var(--text-lg);         /* 18px / 1.125rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: Sub-sections, item titles */
}

h4 {
  font-size: var(--text-base);       /* 16px / 1rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: Small headings, emphasized labels */
}
```

#### Form Elements
```css
label {
  font-size: var(--text-base);       /* 16px / 1rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: Form field labels, toggle labels */
}

button {
  font-size: var(--text-base);       /* 16px / 1rem */
  font-weight: var(--font-weight-medium);  /* 500 */
  line-height: 1.5;
  /* Usage: All interactive buttons */
}

input {
  font-size: var(--text-base);       /* 16px / 1rem */
  font-weight: var(--font-weight-normal);  /* 400 */
  line-height: 1.5;
  /* Usage: Text inputs, number inputs */
}
```

#### Landscape Mode Typography Adjustments
```css
/* When in landscape orientation with height < 500px */
h1.landscape {
  font-size: var(--text-2xl);        /* Stays at 24px but can be reduced with Tailwind class: landscape:text-2xl */
  /* In components: "text-3xl landscape:text-2xl" */
}

/* Common landscape adjustments in components */
landscape:text-sm    /* Reduce to 14px */
landscape:text-base  /* Keep at 16px */
landscape:text-xl    /* Reduce to 20px from 24px */
```

---

## Spacing & Sizing

### Touch Target Minimum Sizes (WCAG Compliance)
```css
/* Minimum interactive element size for accessibility */
min-width: 56px      /* 3.5rem / 56dp minimum touch target */
min-height: 56px     /* 3.5rem / 56dp minimum touch target */

/* Applied to: buttons, toggles, checkboxes, tap targets */
/* Classes used: min-w-[56px] min-h-[56px] or w-14 h-14 */
```

### Spacing Scale (Tailwind defaults)
```css
/* Base spacing unit: 0.25rem (4px) */
--spacing-1: 0.25rem      /* 4px - gap-1, p-1 */
--spacing-2: 0.5rem       /* 8px - gap-2, p-2 (minimum spacing between interactive elements) */
--spacing-3: 0.75rem      /* 12px - gap-3, p-3 */
--spacing-4: 1rem         /* 16px - gap-4, p-4 (standard card padding) */
--spacing-5: 1.25rem      /* 20px - gap-5, p-5 */
--spacing-6: 1.5rem       /* 24px - gap-6, p-6 (large card padding) */
--spacing-8: 2rem         /* 32px - gap-8, p-8 (section spacing) */
```

### Common Spacing Patterns

#### Card/Container Padding
```css
/* Standard card interior padding */
p-4                  /* 16px - Default card padding */
px-6 py-8           /* Header sections (24px horizontal, 32px vertical) */
px-6 landscape:px-4 /* Responsive padding that reduces in landscape */
py-6 landscape:py-4 /* Vertical padding that reduces in landscape */
```

#### Gap Spacing (Between elements)
```css
gap-2               /* 8px - Minimum spacing between interactive elements */
gap-3               /* 12px - Button groups, form fields */
gap-4               /* 16px - Card sections */
gap-6               /* 24px - Major section spacing */
space-y-6           /* 24px vertical spacing between stacked elements */
```

#### Landscape Spacing Adjustments
```css
/* Compact spacing for landscape mode */
landscape:py-3      /* 12px vertical padding (reduced from 16px) */
landscape:py-4      /* 16px vertical padding (reduced from 24px) */
landscape:gap-2     /* 8px gap (reduced from 12px) */
landscape:space-y-4 /* 16px vertical space (reduced from 24px) */
```

### Icon Sizing
```css
/* Standard icon sizes using Lucide React */
w-4 h-4             /* 16px - Small icons (inline with text) */
w-5 h-5             /* 20px - Default icons (buttons, list items) */
w-6 h-6             /* 24px - Medium icons (feature highlights) */
w-8 h-8             /* 32px - Large icons (empty states) */
w-12 h-12           /* 48px - Extra large icons (feature cards) */
w-16 h-16           /* 64px - Display icons (empty state illustrations) */

/* Landscape adjustments */
landscape:w-5 landscape:h-5  /* Reduce from 24px to 20px */
```

---

## Border Radius

### Radius System
```css
--radius: 0.625rem              /* 10px - Base radius */
--radius-sm: calc(var(--radius) - 4px)   /* 6px - Small elements */
--radius-md: calc(var(--radius) - 2px)   /* 8px - Medium elements */
--radius-lg: var(--radius)               /* 10px - Standard elements */
--radius-xl: calc(var(--radius) + 4px)   /* 14px - Large elements */
```

### Usage Examples
```css
/* Tailwind classes and their computed values */
rounded-md          /* 6px - Small buttons, inputs */
rounded-lg          /* 8px - Standard buttons */
rounded-xl          /* 12px - Cards, large buttons */
rounded-2xl         /* 16px - Major cards, sections */
rounded-full        /* 50% - Circular elements (avatars, badges) */

/* Landscape adjustments */
rounded-2xl landscape:rounded-xl  /* 16px -> 12px in landscape */
```

### Component-Specific Radii
```css
/* Buttons */
rounded-md          /* Default button radius: 6px */
rounded-xl          /* Large action buttons: 12px */

/* Cards */
rounded-2xl         /* Main cards: 16px */
rounded-xl          /* Nested cards/sections: 12px */

/* Input fields */
rounded-md          /* Standard inputs: 6px */
rounded-lg          /* Search bars: 8px */
rounded-xl          /* Large tap zones: 12px */

/* Pills/Badges */
rounded-full        /* Circular/pill shaped */
rounded-lg          /* Small rectangular badges: 8px */
```

---

## Component-Specific Styles

### Button Variants

#### Default/Primary Button
```css
/* Used for: Primary CTAs, "Save", "Submit", main actions */
background: var(--primary)              /* #030213 (dark) */
color: var(--primary-foreground)        /* white */
padding: 0.5rem 1rem                    /* py-2 px-4 */
height: 2.25rem                         /* h-9 (36px) */
border-radius: 0.375rem                 /* rounded-md (6px) */
font-weight: var(--font-weight-medium)  /* 500 */
font-size: var(--text-base)             /* 16px */

/* Hover state */
background: rgba(3, 2, 19, 0.9)         /* hover:bg-primary/90 */

/* Usage: "Add Medication", "Save Changes", "Confirm" */
```

#### Destructive Button
```css
/* Used for: Delete, Remove, Cancel critical actions */
background: var(--destructive)          /* #d4183d (red) */
color: white
padding: 0.5rem 1rem
height: 2.25rem
border-radius: 0.375rem
font-weight: var(--font-weight-medium)

/* Hover state */
background: rgba(212, 24, 61, 0.9)      /* hover:bg-destructive/90 */

/* Usage: "Delete Medication", "Cancel Appointment" */
```

#### Outline/Secondary Button
```css
/* Used for: Secondary actions, "Skip", cancel buttons */
background: white
color: var(--foreground)
border: 1px solid var(--border)
padding: 0.5rem 1rem
height: 2.25rem
border-radius: 0.375rem
font-weight: var(--font-weight-medium)

/* Hover state */
background: var(--accent)               /* hover:bg-accent */

/* Usage: "Skip" medication, "Cancel", back buttons */
```

#### Ghost Button
```css
/* Used for: Tertiary actions, less prominent options */
background: transparent
color: var(--foreground)
padding: 0.5rem 1rem
height: 2.25rem
border-radius: 0.375rem

/* Hover state */
background: var(--accent)               /* hover:bg-accent */

/* Usage: "View All", inline navigation */
```

#### Icon Button
```css
/* Used for: Icon-only actions, compact controls */
width: 2.25rem                          /* size-9 (36px) */
height: 2.25rem
border-radius: 0.375rem
padding: 0
/* Contains single icon, no text */

/* Usage: Menu toggles, star favorites, close buttons */
```

#### Button Size Variants
```css
/* Small (size="sm") */
height: 2rem                            /* h-8 (32px) */
padding: 0.75rem                        /* px-3 */
gap: 0.375rem                           /* gap-1.5 */
border-radius: 0.375rem                 /* rounded-md */

/* Default (size="default") */
height: 2.25rem                         /* h-9 (36px) */
padding: 1rem                           /* px-4 */
gap: 0.5rem                             /* gap-2 */

/* Large (size="lg") */
height: 2.5rem                          /* h-10 (40px) */
padding: 1.5rem                         /* px-6 */
border-radius: 0.375rem                 /* rounded-md */

/* Mobile Action Buttons (CareConnect-specific) */
min-height: 56px                        /* WCAG compliance */
padding: 0.75rem 1rem                   /* px-4 py-3 */
border-radius: 0.75rem                  /* rounded-xl (12px) */
font-weight: var(--font-weight-medium)
font-size: var(--text-base)
```

---

### Card Component Styles

#### Base Card
```css
/* Card container */
background: var(--card)                 /* white in light mode */
color: var(--card-foreground)           /* dark text */
border: 1px solid var(--border)
border-radius: 0.75rem                  /* rounded-xl (12px) */
display: flex
flex-direction: column
gap: 1.5rem                             /* gap-6 (24px) */

/* Usage: All content cards, list items, sections */
```

#### Card Header
```css
/* CardHeader component */
padding: 1.5rem 1.5rem 0 1.5rem        /* px-6 pt-6 */
display: grid
grid-template-rows: auto auto
gap: 0.375rem                           /* gap-1.5 */
align-items: start

/* Usage: Card titles and descriptions */
```

#### Card Title
```css
/* CardTitle - h4 element */
font-weight: var(--font-weight-medium)  /* 500 */
line-height: 1                          /* leading-none */
/* Inherits h4 font-size: 16px */

/* Usage: Card heading text */
```

#### Card Description
```css
/* CardDescription - p element */
color: var(--muted-foreground)          /* #717182 gray */
/* Inherits body font-size: 16px */

/* Usage: Subtitle or secondary info below card title */
```

#### Card Content
```css
/* CardContent component */
padding: 0 1.5rem                       /* px-6 */
padding-bottom: 1.5rem (if last child)  /* pb-6 */

/* Usage: Main card body content */
```

#### Card Footer
```css
/* CardFooter component */
display: flex
align-items: center
padding: 0 1.5rem 1.5rem               /* px-6 pb-6 */

/* Usage: Card action buttons, metadata */
```

#### Mobile Card Styles (CareConnect-specific)
```css
/* Medication/Appointment Cards */
background: white
border: 1px solid #e5e7eb              /* border-gray-200 */
border-radius: 1rem                     /* rounded-2xl (16px) */
padding: 1rem                           /* p-4 */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)  /* shadow-sm */

/* Hover state */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) /* hover:shadow-md */

/* Landscape adjustments */
border-radius: 0.75rem                  /* landscape:rounded-xl (12px) */
```

---

### Input Component Styles

#### Text Input
```css
/* Input field base */
background: var(--input-background)     /* #f3f3f5 light gray */
border: 1px solid var(--input)          /* transparent by default */
color: var(--foreground)
height: 2.25rem                         /* h-9 (36px) */
width: 100%
border-radius: 0.375rem                 /* rounded-md (6px) */
padding: 0.25rem 0.75rem               /* py-1 px-3 */
font-size: var(--text-base)             /* 16px */
font-weight: var(--font-weight-normal)  /* 400 */
outline: none

/* Focus state */
border-color: var(--ring)
box-shadow: 0 0 0 3px rgba(var(--ring), 0.5)  /* focus-visible:ring-[3px] */

/* Invalid/Error state */
border-color: var(--destructive)
box-shadow: 0 0 0 3px rgba(var(--destructive), 0.2)  /* aria-invalid:ring-destructive/20 */

/* Placeholder text */
color: var(--muted-foreground)          /* #717182 gray */

/* Usage: All text inputs, number inputs, email, etc. */
```

#### Textarea
```css
/* Same as Input but with different height */
min-height: 5rem                        /* min-h-20 (80px) */
padding: 0.5rem 0.75rem                /* py-2 px-3 */
resize: vertical                        /* Allow vertical resize only */

/* Usage: Message composition, notes fields */
```

#### Select Dropdown
```css
/* Select trigger button */
background: var(--input-background)
border: 1px solid var(--input)
height: 2.25rem
padding: 0.25rem 0.75rem
border-radius: 0.375rem
display: flex
align-items: center
justify-content: space-between

/* Usage: Frequency selectors, time pickers */
```

---

### Toggle/Switch Styles

#### Switch Component
```css
/* Switch track */
width: 2.75rem                          /* w-11 (44px) */
height: 1.5rem                          /* h-6 (24px) */
background: var(--switch-background)    /* #cbced4 gray when off */
border-radius: 9999px                   /* rounded-full */
position: relative
transition: background-color 0.2s

/* Switch track - active/on state */
background: var(--primary)              /* #030213 dark when on */

/* Switch thumb */
width: 1.25rem                          /* w-5 (20px) */
height: 1.25rem                         /* h-5 (20px) */
background: white
border-radius: 9999px                   /* rounded-full */
position: absolute
top: 0.125rem                           /* top-0.5 (2px) */
left: 0.125rem                          /* left-0.5 (2px) when off */
transition: transform 0.2s

/* Switch thumb - active/on state */
transform: translateX(1.25rem)          /* Moves 20px to the right */

/* Usage: Left-Hand Mode toggle, Biometric Auth toggle */
```

---

### Badge/Chip Styles

#### Status Badge
```css
/* Warning badge (low refills) */
background: #fff7ed                     /* bg-orange-50 */
color: #ea580c                          /* text-orange-600 */
padding: 0.5rem 0.75rem                /* px-3 py-2 */
border-radius: 0.5rem                   /* rounded-lg (8px) */
font-size: var(--text-sm)               /* 14px */
font-weight: var(--font-weight-medium)
display: inline-flex
align-items: center
gap: 0.5rem                             /* gap-2 */

/* Usage: "X refills remaining", medication warnings */
```

#### Action Chip (Quick Actions)
```css
/* Colored action buttons in header */
background: /* varies by action */
  /* Blue: #2563eb (Add Medication) */
  /* Green: #16a34a (Schedule) */
  /* Purple: #9333ea (Quick Message) */
color: white
padding: 1rem                           /* p-4 */
min-height: 80px                        /* min-h-[80px] */
border-radius: 1rem                     /* rounded-2xl (16px) */
display: flex
flex-direction: column
align-items: center
justify-content: center
gap: 0.5rem                             /* gap-2 */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)  /* shadow-md */

/* Landscape mode */
min-height: 60px                        /* landscape:min-h-[60px] */
padding: 0.75rem                        /* landscape:p-3 */
border-radius: 0.75rem                  /* landscape:rounded-xl (12px) */
gap: 0.25rem                            /* landscape:gap-1 */

/* Icon size */
w-6 h-6                                 /* Normal: 24px */
landscape:w-5 landscape:h-5             /* Landscape: 20px */

/* Text */
font-size: var(--text-xs)               /* 12px */
font-weight: var(--font-weight-medium)
text-align: center

/* Usage: Dashboard quick actions */
```

---

### Navigation & Tab Bar Styles

#### Bottom Tab Bar
```css
/* Tab bar container */
position: fixed
bottom: 0
left: 0
right: 0
background: white
border-top: 1px solid #e5e7eb           /* border-gray-200 */
padding: 0.5rem 0                       /* py-2 */
padding-bottom: env(safe-area-inset-bottom)  /* Safe area for notched devices */
display: flex
justify-content: space-around
z-index: 50

/* Tab item */
display: flex
flex-direction: column
align-items: center
justify-content: center
padding: 0.5rem 1rem                    /* py-2 px-4 */
min-width: 56px
min-height: 56px
gap: 0.25rem                            /* gap-1 */

/* Tab icon */
width: 1.5rem                           /* w-6 (24px) */
height: 1.5rem
color: #9ca3af                          /* text-gray-400 inactive */

/* Tab label */
font-size: var(--text-xs)               /* 12px */
color: #6b7280                          /* text-gray-600 inactive */

/* Active tab */
color: #2563eb                          /* text-blue-600 for icon and label */
font-weight: var(--font-weight-medium)

/* Usage: Main app navigation (Today, Medications, Calendar, etc.) */
```

#### Header Navigation
```css
/* Page header */
background: white
border-bottom: 1px solid #e5e7eb        /* border-gray-200 */
padding: 1rem 1.5rem                    /* px-6 py-4 */
position: sticky
top: 0
z-index: 10
padding-top: env(safe-area-inset-top)   /* Safe area for notched devices */

/* Landscape compact header */
padding: 0.75rem 1rem                   /* landscape:py-3 landscape:px-4 */

/* Header title */
font-size: var(--text-2xl)              /* 24px */
font-weight: bold                       /* 700 */
color: #111827                          /* text-gray-900 */

/* Landscape header title */
font-size: var(--text-xl)               /* landscape:text-xl (20px) */

/* Usage: Page headers like "Medications", "Settings", etc. */
```

#### Gradient Header (Dashboard)
```css
/* Dashboard header with gradient background */
background: linear-gradient(to bottom, #2563eb, #1d4ed8)  /* from-blue-600 to-blue-700 */
color: white
padding: 2rem 1.5rem 1.5rem            /* px-6 py-8 pb-6 */
padding-top: env(safe-area-inset-top)

/* Landscape mode */
padding: 1rem 1rem 1rem                /* landscape:py-4 landscape:pb-4 */

/* Usage: TodayView dashboard header */
```

---

## Accessibility Features

### Left-Hand Mode Styles

#### Button Reordering
```css
/* Primary action button (left-hand mode) */
order: 1                                /* Appears on left in flex container */

/* Secondary/Cancel button (left-hand mode) */
order: 2                                /* Appears on right in flex container */

/* Without left-hand mode (default) */
/* Primary: order-2, Secondary: order-1 */

/* CSS Classes Used */
leftHandMode ? 'order-1' : 'order-2'    /* For primary */
leftHandMode ? 'order-2' : 'order-1'    /* For secondary */

/* Usage: "Taken"/"Skip" buttons, "Save"/"Cancel" buttons */
```

#### Scrollbar Positioning
```css
/* Left-aligned scrollbar (left-hand mode) */
.scrollbar-left {
  direction: rtl                        /* Flips scrollbar to left */
  overflow-y: scroll
}

.scrollbar-left > * {
  direction: ltr                        /* Content stays left-to-right */
}

/* Custom scrollbar styling */
.scrollbar-left::-webkit-scrollbar {
  width: 14px
}

.scrollbar-left::-webkit-scrollbar-track {
  background: rgba(59, 130, 246, 0.1)   /* Light blue */
  border-radius: 0
}

.scrollbar-left::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.5)   /* Medium blue */
  border-radius: 7px
  border: 3px solid transparent
  background-clip: padding-box
}

/* Hover state */
.scrollbar-left::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.7)   /* Darker blue */
}

/* Active state */
.scrollbar-left::-webkit-scrollbar-thumb:active {
  background: rgba(59, 130, 246, 0.9)   /* Even darker blue */
}

/* Usage: Applied to scrollable content areas in left-hand mode */
```

---

### Focus States (Keyboard & Screen Reader Navigation)

#### Focus Ring
```css
/* Standard focus ring */
outline: none                           /* Remove default */
border-color: var(--ring)               /* oklch(0.708 0 0) gray */
box-shadow: 0 0 0 3px rgba(var(--ring), 0.5)  /* 3px ring with 50% opacity */

/* CSS Class */
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]

/* Usage: All focusable elements (buttons, inputs, links) */
```

#### Invalid/Error Focus
```css
/* Error state focus ring */
border-color: var(--destructive)        /* #d4183d red */
box-shadow: 0 0 0 3px rgba(var(--destructive), 0.2)  /* Red ring at 20% opacity */

/* Dark mode error focus */
box-shadow: 0 0 0 3px rgba(var(--destructive), 0.4)  /* 40% opacity in dark */

/* CSS Class */
aria-invalid:ring-destructive/20
dark:aria-invalid:ring-destructive/40
aria-invalid:border-destructive

/* Usage: Form fields with validation errors */
```

---

### Text Scaling Support (WCAG 2.1 Level AA)

#### Root Font Size Configuration
```css
/* Base font size - user can override */
html {
  font-size: var(--font-size)           /* 16px default */
  /* Scales to 200% (32px) for WCAG compliance */
}

/* Users can adjust --font-size CSS variable to scale entire app */
/* All sizes use rem units which scale relative to root font-size */

/* Example at 200% zoom (32px base) */
--text-base: 1rem → 32px
--text-xl: 1.25rem → 40px
--text-2xl: 1.5rem → 48px
```

#### Responsive Text Sizing
```css
/* Minimum text size for body content: 16px (1rem) */
/* Minimum text size for small labels: 12px (0.75rem) */

/* No text uses absolute px values - all use rem/em for scaling */
```

---

## Desktop Optimizations

### Safe Area Insets (Notched Devices)
```css
/* Utility classes for safe areas */
.safe-area-top {
  padding-top: max(env(safe-area-inset-top), 0.5rem)
}

.safe-area-bottom {
  padding-bottom: max(env(safe-area-inset-bottom), 0.5rem)
}

.safe-area-left {
  padding-left: max(env(safe-area-inset-left), 0.5rem)
}

.safe-area-right {
  padding-right: max(env(safe-area-inset-right), 0.5rem)
}

/* Usage: Applied to headers, tab bars, and fixed elements */
/* Ensures content doesn't get hidden by notches or rounded corners */
```

---

### Landscape Mode Optimizations

#### Compact Header
```css
/* Applied when orientation is landscape AND height < 500px */
@media (orientation: landscape) and (max-height: 500px) {
  .landscape-compact-header {
    padding-top: 0.75rem                /* py-3 instead of py-4 */
    padding-bottom: 0.75rem
  }
}

/* Usage: Page headers in landscape mode */
```

#### Compact Content
```css
@media (orientation: landscape) and (max-height: 500px) {
  .landscape-content {
    padding-top: 1rem                   /* py-4 instead of py-6 */
    padding-bottom: 1rem
  }
}

/* Usage: Main content areas in landscape mode */
```

#### Grid Layouts (Tablet Landscape)
```css
@media screen and (orientation: landscape) and (min-width: 768px) {
  .tablet-landscape-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr))  /* 2-column grid */
  }
  
  .tablet-landscape-sidebar {
    display: flex
    gap: 2rem                           /* gap-8 */
  }
  
  .tablet-landscape-sidebar > * {
    flex: 1                             /* Equal width columns */
  }
}

/* Usage: Multi-column layouts on tablets in landscape */
```

---

### Keyboard Handling (Virtual Keyboard)

#### Keyboard Visible State
```css
/* Add padding when virtual keyboard is shown */
.keyboard-visible {
  padding-bottom: 320px                 /* Portrait */
  transition: padding-bottom 0.3s ease-out
}

@media (orientation: landscape) {
  .keyboard-visible {
    padding-bottom: 280px               /* Landscape (smaller keyboard) */
  }
}

/* Usage: Applied to body/container when keyboard opens */
/* Prevents keyboard from hiding input fields */
```

#### Keyboard Animation
```css
@keyframes slide-up {
  from {
    transform: translateY(100%)
    opacity: 0
  }
  to {
    transform: translateY(0)
    opacity: 1
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out
}

/* Usage: Keyboard or input-related UI entering from bottom */
```

---

### Touch Interactions

#### Tap Highlight Removal
```css
/* Remove default mobile tap highlight */
html {
  -webkit-tap-highlight-color: transparent
}

button, a[role="button"] {
  -webkit-user-select: none
  user-select: none
  -webkit-tap-highlight-color: transparent
}

/* Usage: Prevents blue flash on tap, uses custom hover states instead */
```

#### Smooth Scrolling (iOS)
```css
* {
  -webkit-overflow-scrolling: touch
}

/* Usage: Enables momentum scrolling on iOS devices */
```

#### Font Smoothing
```css
body {
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
}

/* Usage: Improves text rendering on mobile devices */
```

#### Text Size Adjustment
```css
@media screen and (max-width: 768px) {
  html {
    -webkit-text-size-adjust: 100%      /* Prevents iOS font scaling */
  }
  
  body {
    touch-action: pan-y                 /* Allows vertical scroll only */
  }
}

/* Usage: Consistent text rendering across mobile browsers */
```

---

## Common Component Patterns

### List Items
```css
/* Clickable list item (medication, appointment) */
display: block
background: white
border: 1px solid #e5e7eb               /* border-gray-200 */
border-radius: 1rem                     /* rounded-2xl (16px) */
padding: 1rem                           /* p-4 */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)  /* shadow-sm */
transition: box-shadow 0.2s

/* Hover state */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)  /* hover:shadow-md */

/* Contains */
/* - Icon (48px circle with colored background) */
/* - Title (font-semibold, text-gray-900) */
/* - Subtitle (text-sm, text-gray-600) */
/* - Chevron icon (text-gray-400) */

/* Usage: Medication list, appointment list */
```

---

### Empty States
```css
/* Empty state container */
background: white
border: 1px solid #e5e7eb
border-radius: 1rem                     /* rounded-2xl */
padding: 2rem                           /* p-8 */
text-align: center

/* Icon container */
width: 4rem                             /* w-16 (64px) */
height: 4rem
background: /* Color varies by context */
  /* Blue: #dbeafe (bg-blue-100) */
  /* Green: #dcfce7 (bg-green-100) */
border-radius: 9999px                   /* rounded-full */
margin: 0 auto 1rem
display: flex
align-items: center
justify-content: center

/* Icon */
width: 2rem                             /* w-8 (32px) */
height: 2rem
color: /* Matches background */
  /* Blue: #2563eb (text-blue-600) */
  /* Green: #16a34a (text-green-600) */

/* Heading */
font-weight: 600                        /* font-semibold */
color: #111827                          /* text-gray-900 */
margin-bottom: 0.5rem                   /* mb-2 */

/* Description */
color: #4b5563                          /* text-gray-600 */
font-size: var(--text-sm)               /* 14px */

/* Usage: "No medications", "All caught up", etc. */
```

---

## Animation & Transitions

### Standard Transitions
```css
/* Default transition for most interactive elements */
transition-property: all
transition-duration: 150ms
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1)

/* Tailwind class: transition-all */

/* Usage: Buttons, cards, hover states */
```

### Specific Transitions
```css
/* Color transitions */
transition: color 150ms ease

/* Background transitions */
transition: background-color 150ms ease

/* Shadow transitions */
transition: box-shadow 150ms ease

/* Transform transitions */
transition: transform 150ms ease

/* Opacity transitions */
transition: opacity 150ms ease

/* Usage: Component-specific animations */
```

---

## Summary of Key Measurements

### Most Common Values
```
Touch Targets:        56px × 56px (min)
Button Height:        36px (default), 56px (mobile actions)
Card Padding:         16px (p-4)
Section Padding:      24px horizontal, 32px vertical
Icon Sizes:           20px (default), 24px (large)
Border Radius:        12px (cards), 16px (large cards)
Font Sizes:           16px (body), 20px (h2), 24px (h1)
Font Weights:         400 (normal), 500 (medium), 600 (semibold), 700 (bold)
Spacing Between:      8px minimum between interactive elements
Focus Ring:           3px with 50% opacity
```

---

## Notes for Cross-Platform Conversion

### Flutter/Dart Conversion Tips

1. **Color Format**: Convert `#rrggbb` hex and `oklch()` values to Flutter `Color` objects
2. **Spacing**: Use `EdgeInsets` for padding, `SizedBox` for gaps
3. **Typography**: Map to `TextStyle` with `fontSize`, `fontWeight`, `height` (line-height)
4. **Border Radius**: Use `BorderRadius.circular()` for rounded corners
5. **Shadows**: Convert `box-shadow` to `BoxShadow` with `blurRadius`, `offset`, `color`
6. **Touch Targets**: Use `SizedBox` or `Container` with minimum `width` and `height` of 56
7. **Safe Areas**: Use `SafeArea` widget for notched devices
8. **Responsive**: Use `MediaQuery` for screen size and orientation detection
9. **Theme**: Create a Flutter `ThemeData` with all color and text style definitions
10. **Animations**: Use `AnimatedContainer`, `AnimatedOpacity`, etc. for transitions

---

**Last Updated**: January 29, 2026  
**Version**: 1.0  
**Application**: CareConnect Desktop Healthcare Application