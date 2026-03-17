# CareConnect Icon Assets

## Required Icons

This directory should contain all icon assets for the PWA. Icons need to be created with the CareConnect branding.

### Standard Icons (10 required)

Place these PNG files in this directory:

1. `icon-72x72.png` - 72×72px
2. `icon-96x96.png` - 96×96px
3. `icon-128x128.png` - 128×128px
4. `icon-144x144.png` - 144×144px
5. `icon-152x152.png` - 152×152px
6. `icon-192x192.png` - 192×192px (primary)
7. `icon-384x384.png` - 384×384px
8. `icon-512x512.png` - 512×512px (primary large)

### Maskable Icons (2 required for Android)

9. `icon-maskable-192x192.png` - 192×192px with safe zone
10. `icon-maskable-512x512.png` - 512×512px with safe zone

### Shortcut Icons (3 for home screen shortcuts)

11. `shortcut-add-med.png` - 96×96px (pill/plus icon)
12. `shortcut-today.png` - 96×96px (calendar/today icon)
13. `shortcut-messages.png` - 96×96px (message bubble icon)

### Notification Icons (3 for push notifications)

14. `badge-72x72.png` - 72×72px (monochrome badge)
15. `action-check.png` - 48×48px (checkmark icon)
16. `action-snooze.png` - 48×48px (clock/snooze icon)

---

## Design Guidelines

### Color Scheme
- **Primary**: #2563eb (Blue-600)
- **Background**: #ffffff (White) or transparent
- **Accent**: #3b82f6 (Blue-500)

### Logo Design
- Medical cross or heart + connectivity symbol
- Clean, modern, accessible
- High contrast for visibility
- Recognizable at small sizes

### Maskable Icon Requirements
- Logo must fit in center 80% (safe zone)
- Can bleed to edges with background
- Test with [Maskable.app](https://maskable.app/)

---

## Quick Generation

### Option 1: Use PWA Asset Generator
```bash
npx pwa-asset-generator logo.svg ./public/icons \
  --icon-only \
  --favicon \
  --type png \
  --padding "10%"
```

### Option 2: Use Figma Template
1. Download [PWA Icon Template](https://www.figma.com/community/file/948357761693881124)
2. Create your logo
3. Export all sizes as PNG

### Option 3: Use Online Tool
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- Upload 512×512 source image
- Configure settings
- Download all sizes

---

## Temporary Placeholder

Until custom icons are created, you can use a temporary blue square:

```bash
# Generate placeholder icons (requires ImageMagick)
for size in 72 96 128 144 152 192 384 512; do
  convert -size ${size}x${size} xc:"#2563eb" \
    -fill white -pointsize $((size/3)) -gravity center \
    -annotate +0+0 "C" \
    icon-${size}x${size}.png
done
```

This creates simple blue squares with "C" for CareConnect - functional but should be replaced with branded icons.

---

## Testing Icons

1. Add icons to this directory
2. Visit your app in browser
3. Open DevTools → Application → Manifest
4. Check "Icons" section shows all icons
5. Test install on real device
6. Verify icon appears correctly

---

## Notes

- All icons should be PNG format
- Optimize file size with tools like [TinyPNG](https://tinypng.com/)
- Test icons on light and dark backgrounds
- Ensure icons are accessible (sufficient contrast)
- Icons are referenced in `/public/manifest.json`
