# CareConnect Desktop

> A comprehensive healthcare management application with professional desktop integration, full accessibility features, and VS Code-level keyboard navigation.

## ⚠️ Expected Workspace Warnings

You may see `404` errors for `@brightpath/*` packages during installation. **These are safe to ignore.**

These packages are Figma Make workspace-level dependencies that do not affect this application. Our code does not import or use any @brightpath packages.

👉 **See [BRIGHTPATH_EXPLANATION.md](/BRIGHTPATH_EXPLANATION.md) for detailed technical explanation.**

---

## 🚀 Features

### Healthcare Management
- **Medication Management** - Track medications with complex scheduling, dose tracking, and refill management
- **Appointment Scheduling** - Calendar view with appointment management and reminders
- **Communication Tools** - Quick message templates with healthcare provider contacts
- **Today View Dashboard** - Surfaces due medications, upcoming appointments, and quick actions
- **Wellness Logging** - Track health metrics with tap-only chip interactions

### Desktop Experience
- **Native Window Chrome** - Electron-style title bar with window controls (minimize, maximize, close)
- **Command Palette** - VS Code-style quick navigation (Ctrl+K)
- **Keyboard Shortcuts** - Comprehensive keyboard navigation throughout the app
- **Context Menus** - Right-click menus for quick actions
- **Status Bar** - Real-time status indicators at bottom of window
- **Desktop Notifications** - System-level notifications for medication reminders

### Accessibility Features
- **Left-Hand Mode** - Complete UI mirroring for left-handed users
- **Keyboard Navigation** - Full keyboard support with focus indicators
- **Screen Reader Support** - ARIA labels and semantic HTML
- **Focus Trapping** - Proper modal and dialog focus management
- **Form Shortcuts** - Tab navigation, Enter to submit, Escape to cancel
- **List Navigation** - Arrow keys, Home/End, Page Up/Down support

### Responsive Design
- **1024px (Tablet/Small Laptop)** - Optimized sidebar and compact layouts
- **1440px (Standard Desktop)** - Balanced spacing and comfortable reading
- **1920px+ (Large Desktop)** - Expanded layouts with multi-column grids
- **Adaptive Typography** - Text scaling across breakpoints
- **Grid System** - 1-2-3 column layouts based on screen size

## ⌨️ Keyboard Shortcuts

### Navigation
| Shortcut | Action |
|----------|--------|
| `Ctrl+1` | Go to Dashboard |
| `Ctrl+2` | Go to Medications |
| `Ctrl+3` | Go to Calendar |
| `Ctrl+4` | Go to Messages |
| `Ctrl+5` | Go to Settings |
| `Ctrl+K` | Open Command Palette |
| `Ctrl+/` | Show Keyboard Shortcuts Help |

### Actions
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Add New Medication/Appointment |
| `Ctrl+S` | Save Changes in Forms |
| `Ctrl+R` | Refresh Data |
| `Ctrl+F` | Search |
| `Ctrl+Shift+L` | Toggle Left-Hand Mode |

### List Navigation
| Shortcut | Action |
|----------|--------|
| `↑` `↓` | Navigate items up/down |
| `←` `→` | Navigate items left/right (grid view) |
| `Enter` | Select/Open item |
| `Space` | Toggle selection |
| `Home` | Go to first item |
| `End` | Go to last item |
| `Page Up` | Move up 10 items |
| `Page Down` | Move down 10 items |

### Forms
| Shortcut | Action |
|----------|--------|
| `Tab` | Next field |
| `Shift+Tab` | Previous field |
| `Enter` | Submit form |
| `Ctrl+Enter` | Submit from textarea |
| `Esc` | Cancel/Close |

### Dialogs & Modals
| Shortcut | Action |
|----------|--------|
| `Esc` | Close dialog |
| `Tab` | Cycle through buttons |
| `Enter` | Confirm action |

### Window Controls
| Shortcut | Action |
|----------|--------|
| `Ctrl+W` | Close window |
| `Ctrl+Q` | Quit application |

## 🎯 Accessibility Compliance

### WCAG 2.1 AA Compliance
- ✅ **Keyboard Navigation** - All functionality accessible via keyboard
- ✅ **Focus Indicators** - Clear visual focus states on all interactive elements
- ✅ **Screen Reader Support** - ARIA labels, roles, and live regions
- ✅ **Color Contrast** - Meets WCAG AA standards (4.5:1 for text)
- ✅ **Click Targets** - Minimum 44x44px targets for accessibility
- ✅ **Focus Trapping** - Proper modal focus management
- ✅ **Form Labels** - All inputs have associated labels
- ✅ **Error Messages** - Clear, accessible error feedback

### Keyboard Navigation Features
- **Focus Trapping** - Modals and dialogs trap focus and restore on close
- **List Navigation** - Arrow keys navigate through medication/appointment lists
- **Form Navigation** - Tab/Shift+Tab cycles through form fields
- **Auto-focus** - First input auto-focuses when forms open
- **Skip Links** - Keyboard users can skip navigation
- **Escape Handling** - Escape closes dialogs and cancels forms

## 🏗️ Architecture

### Technology Stack
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Context** - State management
- **Local Storage** - Data persistence

### Component Structure
```
/components
  ├── Root.tsx                    # Main layout with desktop chrome
  ├── TodayView.tsx              # Dashboard with due items
  ├── MedicationList.tsx         # Grid view of medications
  ├── AddMedication.tsx          # Form with keyboard navigation
  ├── Calendar.tsx               # Calendar with appointments
  ├── Communications.tsx         # Message templates
  ├── Settings.tsx               # App configuration
  ├── DesktopTitleBar.tsx        # Native window chrome
  ├── CommandPalette.tsx         # Quick navigation
  ├── StatusBar.tsx              # Bottom status indicators
  ├── KeyboardShortcutsHelp.tsx  # Shortcuts reference modal
  └── ContextMenu.tsx            # Right-click menus

/hooks
  ├── useKeyboardShortcuts.ts    # Global shortcuts handler
  ├── useFocusTrap.ts            # Modal focus management
  ├── useListNavigation.ts       # Arrow key navigation
  └── useFormNavigation.ts       # Form keyboard handling

/context
  └── AppContext.tsx             # Global state management
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#2563EB` (blue-600) - Actions, links, focus states
- **Success Green**: `#10B981` (green-600) - Confirmations, wellness
- **Warning Orange**: `#F59E0B` (orange-600) - Refill alerts
- **Error Red**: `#EF4444` (red-600) - Critical actions
- **Gray Scale**: 50-900 for backgrounds, text, borders

### Typography
- **Headlines**: System font stack with bold weights
- **Body Text**: Base 14px with responsive scaling
- **Interactive Elements**: Minimum 44px click targets for accessibility

### Spacing
- **Desktop**: Comfortable spacing for mouse/keyboard usage
- **Responsive**: Scales smoothly across breakpoints (1024px, 1440px, 1920px)

## 🔧 Development

### Project Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Adding Keyboard Shortcuts
```typescript
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

// In your component
useKeyboardShortcuts([
  {
    key: 'n',
    ctrl: true,
    callback: () => handleNewItem(),
    description: 'Create new item',
  },
]);
```

### Adding List Navigation
```typescript
import { useListNavigation } from '../hooks/useListNavigation';

const { containerRef, focusedIndex } = useListNavigation({
  itemCount: items.length,
  onSelect: (index) => handleSelect(items[index]),
  orientation: 'vertical', // or 'horizontal', 'grid'
  gridColumns: 3, // for grid layout
});
```

### Adding Form Keyboard Support
```typescript
import { useFormNavigation } from '../hooks/useFormNavigation';

const formRef = useRef<HTMLFormElement>(null);

useFormNavigation(formRef, {
  onSubmit: handleSubmit,
  onCancel: handleCancel,
});
```

## 📚 Documentation

- **[DESIGN_PHILOSOPHY.md](/DESIGN_PHILOSOPHY.md)** - Core design principles and accessibility rationale
- **[DESKTOP_IMPLEMENTATION.md](/DESKTOP_IMPLEMENTATION.md)** - Desktop-specific features and patterns
- **[RESPONSIVE_DESIGN.md](/RESPONSIVE_DESIGN.md)** - Breakpoint strategy and adaptive layouts
- **[WCAG_COMPLIANCE.md](/WCAG_COMPLIANCE.md)** - Accessibility standards compliance
- **[KEYBOARD_NAVIGATION.md](/KEYBOARD_NAVIGATION.md)** - Comprehensive keyboard navigation guide

## 🎯 Testing Checklist

### Keyboard Navigation
- [ ] Can navigate to all pages using Ctrl+1-5
- [ ] Command palette opens with Ctrl+K
- [ ] Forms submit with Enter, cancel with Escape
- [ ] Lists navigate with arrow keys
- [ ] Modals trap focus and close with Escape
- [ ] All interactive elements focusable with Tab

### Accessibility
- [ ] Screen reader announces all content correctly
- [ ] Focus indicators visible on all elements
- [ ] Color contrast meets WCAG AA
- [ ] All images have alt text
- [ ] Forms have proper labels
- [ ] ARIA attributes used correctly

### Responsive Design
- [ ] Layout adapts at 1024px, 1440px, 1920px
- [ ] Text scales appropriately
- [ ] Grid columns adjust (1-2-3)
- [ ] Sidebar width responsive
- [ ] Touch targets adequate size

## 🤝 Contributing

This is a healthcare accessibility demonstration project showcasing best practices in:
- Desktop application UX patterns
- Comprehensive keyboard navigation
- WCAG accessibility compliance
- Responsive design across screen sizes
- Left-hand accessibility features

## 📄 License

Educational demonstration project - see individual component licenses for UI components.

## 🙏 Acknowledgments

- **Shadcn/ui** - Base UI component library
- **Tailwind CSS** - Styling framework
- **Lucide React** - Icon library
- **WCAG Guidelines** - Accessibility standards

---

**Built with accessibility, keyboard navigation, and user experience as top priorities.** 🎯⌨️♿