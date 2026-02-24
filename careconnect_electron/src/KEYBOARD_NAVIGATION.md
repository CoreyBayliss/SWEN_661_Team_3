# Keyboard Navigation Integration Guide

## Overview

CareConnect Desktop implements **VS Code/Slack-level keyboard integration**, allowing power users to navigate the entire application without touching the mouse. This document details all keyboard interactions and how to extend them.

## 🎯 Philosophy

**Every mouse action has a keyboard equivalent.**

- Forms: Tab/Enter/Escape navigation
- Lists: Arrow keys, Home/End, Page Up/Down
- Dialogs: Focus trapping, Escape to close
- Global: Navigation shortcuts, quick actions
- Accessibility: Full screen reader support

---

## 📋 Complete Keyboard Reference

### Global Navigation (Available Everywhere)

| Shortcut | Action | Implementation |
|----------|--------|----------------|
| `Ctrl+1` | Dashboard | `useKeyboardShortcuts` in Root.tsx |
| `Ctrl+2` | Medications | `useKeyboardShortcuts` in Root.tsx |
| `Ctrl+3` | Calendar | `useKeyboardShortcuts` in Root.tsx |
| `Ctrl+4` | Messages | `useKeyboardShortcuts` in Root.tsx |
| `Ctrl+5` | Settings | `useKeyboardShortcuts` in Root.tsx |
| `Ctrl+K` | Command Palette | Opens VS Code-style quick nav |
| `Ctrl+/` | Show Shortcuts Help | Opens keyboard reference modal |
| `Ctrl+Shift+L` | Toggle Left-Hand Mode | Mirrors entire UI |

### Page-Specific Actions

#### Medications Page
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Add new medication |
| `↑` `↓` | Navigate medication cards |
| `←` `→` | Navigate grid columns |
| `Enter` | Open selected medication |
| `Home` | First medication |
| `End` | Last medication |
| `Page Up` | Scroll up 10 items |
| `Page Down` | Scroll down 10 items |

#### Calendar Page
| Shortcut | Action |
|----------|--------|
| `Ctrl+N` | Add new appointment |
| `↑` `↓` | Navigate appointment list |
| `Enter` | View appointment details |

#### Forms (Add Medication, Add Appointment, etc.)
| Shortcut | Action |
|----------|--------|
| `Tab` | Next field |
| `Shift+Tab` | Previous field |
| `Enter` | Submit form |
| `Ctrl+Enter` | Submit from textarea |
| `Ctrl+S` | Quick save |
| `Esc` | Cancel and go back |

### Dialog & Modal Interactions

| Shortcut | Action | Notes |
|----------|--------|-------|
| `Esc` | Close dialog | Works on all modals |
| `Tab` | Next focusable element | Cycles within modal |
| `Shift+Tab` | Previous element | Trapped focus |
| `Enter` | Confirm/Submit | On focused button |

### Command Palette (Ctrl+K)

| Key | Action |
|-----|--------|
| `↑` | Previous command |
| `↓` | Next command |
| `Enter` | Execute command |
| `Esc` | Close palette |
| Type | Filter commands |

### Context Menus (Right-Click)

| Key | Action |
|-----|--------|
| `↑` | Previous item |
| `↓` | Next item |
| `Enter` | Execute action |
| `Esc` | Close menu |

---

## 🔧 Implementation Details

### 1. Global Shortcuts Hook

**File:** `/hooks/useKeyboardShortcuts.ts`

```typescript
interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  alt?: boolean;
  shift?: boolean;
  meta?: boolean;
  callback: () => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  // Listens to keydown events
  // Matches key combinations
  // Prevents default behavior
  // Executes callbacks
};
```

**Usage:**
```typescript
useKeyboardShortcuts([
  {
    key: 'n',
    ctrl: true,
    callback: () => navigate('/medications/add'),
    description: 'Add new medication',
  },
]);
```

### 2. Focus Trap Hook

**File:** `/hooks/useFocusTrap.ts`

**Purpose:** Trap focus within modals and dialogs for accessibility

**Features:**
- Stores previously focused element
- Gets all focusable elements in container
- Cycles focus with Tab/Shift+Tab
- Restores focus on unmount
- Meets WCAG 2.1 requirements

**Usage:**
```typescript
const containerRef = useFocusTrap({
  enabled: isOpen,
  returnFocus: true,
});

return (
  <div ref={containerRef} role="dialog" aria-modal="true">
    {/* Modal content */}
  </div>
);
```

### 3. List Navigation Hook

**File:** `/hooks/useListNavigation.ts`

**Purpose:** Arrow key navigation for lists and grids

**Features:**
- Vertical, horizontal, and grid orientations
- Arrow keys for navigation
- Home/End for first/last items
- Page Up/Down for bulk movement
- Enter/Space to select items

**Usage:**
```typescript
const { containerRef, focusedIndex } = useListNavigation({
  itemCount: medications.length,
  onSelect: (index) => navigate(`/medications/${medications[index].id}`),
  orientation: 'grid',
  gridColumns: 3,
});

return (
  <div ref={containerRef} role="list">
    {medications.map((med, index) => (
      <div 
        key={med.id}
        data-list-item
        tabIndex={0}
        className={focusedIndex === index ? 'focused' : ''}
      >
        {med.name}
      </div>
    ))}
  </div>
);
```

### 4. Form Navigation Hook

**File:** `/hooks/useFormNavigation.ts`

**Purpose:** Enhanced form keyboard interactions

**Features:**
- Auto-focus first input
- Enter to submit (except textareas)
- Ctrl+Enter to submit from textarea
- Escape to cancel
- Tab navigation (native)

**Usage:**
```typescript
const formRef = useRef<HTMLFormElement>(null);

useFormNavigation(formRef, {
  onSubmit: handleSubmit,
  onCancel: () => navigate(-1),
});

return (
  <form ref={formRef} onSubmit={handleSubmit}>
    {/* Form fields */}
  </form>
);
```

---

## 🎨 Accessibility Attributes

### Required ARIA Attributes

```tsx
// List containers
<div 
  role="list"
  aria-label="Medication list"
>
  {items.map(item => (
    <div 
      key={item.id}
      role="listitem"
      data-list-item
      tabIndex={0}
      aria-label={`${item.name} ${item.dose}`}
    />
  ))}
</div>

// Buttons
<button
  aria-label="Add new medication (Ctrl+N)"
  className="focus:ring-2 focus:ring-blue-500"
>
  Add
</button>

// Forms
<input
  type="text"
  id="name"
  name="name"
  required
  aria-required="true"
  aria-label="Medication name"
/>

// Modals
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirm Action</h2>
</div>
```

### Focus Indicators

All interactive elements must have visible focus states:

```css
.focus:outline-none 
.focus:ring-2 
.focus:ring-blue-500 
.focus:ring-offset-2
```

---

## 📱 Component Examples

### Medication List with Navigation

```typescript
export const MedicationList = () => {
  const { medications, navigate } = useApp();

  // List navigation
  const { containerRef, focusedIndex } = useListNavigation({
    itemCount: medications.length,
    onSelect: (index) => navigate(`/medications/${medications[index].id}`),
    orientation: 'grid',
    gridColumns: window.innerWidth >= 1536 ? 3 : 2,
  });

  // Quick actions
  useKeyboardShortcuts([
    { key: 'n', ctrl: true, callback: () => navigate('/medications/add') },
  ]);

  return (
    <div 
      ref={containerRef}
      role="list"
      aria-label="Medication list"
    >
      {medications.map((med, index) => (
        <Link
          key={med.id}
          to={`/medications/${med.id}`}
          data-list-item
          tabIndex={0}
          role="listitem"
          className={`
            focus:ring-2 focus:ring-blue-500
            ${focusedIndex === index ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          {/* Card content */}
        </Link>
      ))}
    </div>
  );
};
```

### Form with Keyboard Support

```typescript
export const AddMedication = () => {
  const { addMedication, navigate } = useApp();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({ ... });

  const handleSubmit = () => {
    addMedication(formData);
    navigate('/medications');
  };

  const handleCancel = () => {
    navigate('/medications');
  };

  // Form keyboard navigation
  useFormNavigation(formRef, {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  });

  // Quick save
  useKeyboardShortcuts([
    { key: 's', ctrl: true, callback: handleSubmit },
  ]);

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        required
        aria-required="true"
        className="focus:ring-2 focus:ring-blue-500"
      />
      {/* More fields */}
      <button type="submit">Save</button>
    </form>
  );
};
```

### Modal with Focus Trap

```typescript
export const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  const containerRef = useFocusTrap({ enabled: isOpen });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50">
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <h2 id="dialog-title">Confirm Action</h2>
        <button onClick={onConfirm}>Confirm</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};
```

---

## ✅ Testing Checklist

### Keyboard-Only Navigation Test

**No mouse allowed!**

- [ ] Navigate to all 5 main sections using Ctrl+1-5
- [ ] Open command palette with Ctrl+K
- [ ] Show keyboard shortcuts with Ctrl+/
- [ ] Tab through all navigation items
- [ ] Navigate medication list with arrow keys
- [ ] Select medication with Enter
- [ ] Open add medication form
- [ ] Tab through all form fields
- [ ] Submit form with Enter
- [ ] Cancel form with Escape
- [ ] Open calendar
- [ ] Navigate appointments with arrow keys
- [ ] All modals trap focus correctly
- [ ] Escape closes all dialogs
- [ ] Context menus navigable with arrows

### Screen Reader Test

- [ ] All interactive elements announced
- [ ] Form labels read correctly
- [ ] List items described accurately
- [ ] Button purposes clear
- [ ] Error messages spoken
- [ ] Focus changes announced

### Focus Indicator Test

- [ ] All focused elements have visible ring
- [ ] Focus ring color contrasts with background
- [ ] Focus never hidden or invisible
- [ ] Custom components maintain focus states

---

## 🚀 Extending Keyboard Support

### Adding a New Shortcut

1. **Define in SHORTCUTS constant:**
```typescript
// hooks/useKeyboardShortcuts.ts
export const SHORTCUTS = {
  // ... existing shortcuts
  MY_ACTION: { key: 'x', ctrl: true, description: 'My custom action' },
};
```

2. **Use in component:**
```typescript
useKeyboardShortcuts([
  { ...SHORTCUTS.MY_ACTION, callback: handleMyAction },
]);
```

3. **Add to KeyboardShortcutsHelp.tsx:**
```typescript
{
  title: 'Custom Actions',
  shortcuts: [
    { keys: ['Ctrl', 'X'], description: 'My custom action' },
  ],
}
```

### Adding List Navigation to New Component

1. **Import hook:**
```typescript
import { useListNavigation } from '../hooks/useListNavigation';
```

2. **Setup navigation:**
```typescript
const { containerRef, focusedIndex } = useListNavigation({
  itemCount: items.length,
  onSelect: handleSelect,
  orientation: 'vertical',
});
```

3. **Apply to container:**
```typescript
<div ref={containerRef} role="list">
  {items.map((item, index) => (
    <div
      key={item.id}
      data-list-item
      tabIndex={0}
      className={focusedIndex === index ? 'focused' : ''}
    >
      {item.content}
    </div>
  ))}
</div>
```

---

## 📚 Resources

- **WCAG 2.1 Keyboard Guidelines**: https://www.w3.org/WAI/WCAG21/Understanding/keyboard
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **VS Code Keyboard Shortcuts**: https://code.visualstudio.com/docs/getstarted/keybindings
- **Slack Keyboard Shortcuts**: https://slack.com/help/articles/201374536

---

**Result: Power users can navigate the entire app using only the keyboard, meeting WCAG 2.1 Level AA requirements and exceeding industry standards.** ⌨️✨
