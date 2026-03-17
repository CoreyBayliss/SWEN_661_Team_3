# CareConnect - Troubleshooting Guide

## Recent Fixes Applied

### ✅ Authentication Persistence Fixed
**Issue**: App was reloading to login screen after authentication.

**Root Cause**: 
- `isAuthenticated` state wasn't persisted in localStorage
- Page reloads caused state reset to `false`

**Solution**:
- Added `isAuthenticated` persistence to localStorage in `AppContext.tsx`
- Removed unnecessary page redirects from `Login.tsx`
- Authentication state now persists across browser sessions

### ✅ Error Handling Improvements
**Issue**: App could crash without user-friendly error messages during hot reload or runtime errors.

**Solution**:
- Added `ErrorBoundary` component to catch and display errors gracefully
- Added Suspense fallback for loading states
- Improved context error handling with better logging

### ✅ Blank Preview Protection
**Issue**: "Blank preview detected" errors during hot module reload.

**Solution**:
- Added wrapper div with explicit dimensions in App.tsx
- Added loading fallback with visible content
- Added key prop to Login component for proper React reconciliation

## Known Issues

### @brightpath Package Errors (Can be Ignored)
```
ERR_PNPM_FETCH_404  GET https://registry.npmjs.org/@brightpath%2Factivity-stream: Not Found - 404
```

**Status**: Safe to ignore

**Explanation**: 
- These packages are NOT referenced anywhere in the CareConnect codebase
- This is a Figma Make workspace-level dependency that doesn't affect your application
- The application runs correctly despite this error message
- No action needed from your side

## Testing the Fixes

### Clear Browser Storage (Recommended)
To test from a clean slate:

1. Open Browser DevTools (F12)
2. Go to "Application" tab (Chrome) or "Storage" tab (Firefox)
3. Navigate to "Local Storage"
4. Clear all entries or delete the entire storage
5. Refresh the page

### Test Authentication Flow

1. **Initial Load**: Should show onboarding screen for hand preference
2. **Onboarding**: Select left or right hand mode
3. **Login**: Use credentials `username: demo`, `password: demo123`
4. **Authenticated State**: Should see the medications screen
5. **Refresh Browser**: Should remain logged in
6. **Logout**: Settings → Logout → Should return to login screen
7. **Re-login**: Should work without issues

## Debugging Tips

### Check Console for Errors
Open DevTools Console (F12) and look for:
- ❌ Red errors (need attention)
- ⚠️ Yellow warnings (usually safe to ignore)
- Ignore any @brightpath 404 errors

### Verify LocalStorage
In DevTools → Application → Local Storage, you should see:
- `isAuthenticated`: "true" or "false"
- `leftHandMode`: "true" or "false"
- `biometricEnabled`: "true" or "false"
- `onboardingComplete`: "true" (after first login)
- `favorites`: array of favorite paths

### Force Re-render
If the app seems stuck:
1. Clear localStorage
2. Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
3. Close and reopen the browser tab

## Environment Information

**Platform**: Figma Make (Web Application Builder)
**Framework**: React 18 with TypeScript
**State Management**: React Context API
**Styling**: Tailwind CSS v4
**Persistence**: localStorage API

## Contact

If you encounter persistent issues not covered in this guide, please:
1. Check the browser console for specific error messages
2. Verify you're using a modern browser (Chrome 90+, Firefox 88+, Safari 14+)
3. Try the "Clear Browser Storage" steps above
4. Document the steps to reproduce the issue
