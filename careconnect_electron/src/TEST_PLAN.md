# CareConnect - Test Plan

## Pre-Flight Check

Before testing, ensure:
- [ ] Browser DevTools is open (F12)
- [ ] Console tab is visible to monitor errors
- [ ] Network tab is available if needed

---

## Test 1: Fresh Installation

**Objective**: Verify first-time user experience

**Steps**:
1. Open DevTools → Application → Local Storage
2. Delete all CareConnect entries (or use `localStorage.clear()`)
3. Refresh the page
4. **Expected**: Onboarding screen appears with hand preference selection
5. Select "Right Hand" or "Left Hand"
6. Click "Continue"
7. **Expected**: Login screen appears

**Pass Criteria**: ✅ Smooth transition from onboarding to login

---

## Test 2: Authentication (Username/Password)

**Objective**: Verify login functionality

**Steps**:
1. On login screen, enter:
   - Username: `demo`
   - Password: `demo123`
2. Click "Sign In"
3. **Expected**: Login successful, medications screen appears
4. Check DevTools → Local Storage → `isAuthenticated` should be `"true"`

**Pass Criteria**: 
- ✅ Login successful
- ✅ Shows medications screen
- ✅ localStorage has `isAuthenticated: "true"`

---

## Test 3: Authentication Persistence

**Objective**: Verify login persists across page reloads

**Steps**:
1. Ensure you're logged in (from Test 2)
2. Refresh the page (F5 or Ctrl+R)
3. **Expected**: Still logged in, shows medications screen (NOT login screen)
4. Hard refresh (Ctrl+Shift+R)
5. **Expected**: Still logged in

**Pass Criteria**: 
- ✅ No redirect to login screen
- ✅ `isAuthenticated` remains `"true"` in localStorage

**THIS IS THE MAIN FIX - If this fails, there's still an issue**

---

## Test 4: Alternative Login Methods

**Objective**: Verify biometric and passcode login

**Steps**:
1. Logout (Settings → Logout)
2. **Expected**: Login screen appears
3. Click "Sign in with Biometrics"
4. **Expected**: Login successful after 500ms delay
5. Logout again
6. Click "Use Passcode"
7. Enter any 4+ digit code
8. Click "Sign In"
9. **Expected**: Login successful

**Pass Criteria**: 
- ✅ Both methods work
- ✅ Both persist authentication

---

## Test 5: Navigation

**Objective**: Verify navigation works correctly

**Steps**:
1. Ensure logged in
2. Click each tab in bottom navigation:
   - Today
   - Meds
   - Calendar
   - Messages
   - Settings
3. **Expected**: Each screen loads correctly
4. Check URL doesn't change (single-page app)
5. Verify active tab is highlighted in blue

**Pass Criteria**: 
- ✅ All tabs work
- ✅ Active tab is highlighted
- ✅ No console errors

---

## Test 6: Left-Hand Mode

**Objective**: Verify accessibility feature persistence

**Steps**:
1. Go to Settings
2. Toggle "Left-Hand Mode" ON
3. **Expected**: Bottom navigation moves to top
4. Check localStorage → `leftHandMode` should be `"true"`
5. Refresh page
6. **Expected**: Left-hand mode still enabled
7. Toggle OFF
8. Refresh
9. **Expected**: Normal mode restored

**Pass Criteria**: 
- ✅ Toggle works
- ✅ Setting persists across refreshes
- ✅ Visual changes are correct

---

## Test 7: Logout

**Objective**: Verify logout clears authentication

**Steps**:
1. Go to Settings
2. Click "Logout"
3. **Expected**: Login screen appears
4. Check localStorage → `isAuthenticated` should be `"false"`
5. Refresh page
6. **Expected**: Still on login screen

**Pass Criteria**: 
- ✅ Logout successful
- ✅ Redirects to login
- ✅ Stays logged out after refresh

---

## Test 8: Error Handling

**Objective**: Verify error boundary works

**Steps**:
1. Open DevTools → Console
2. Make a code edit that intentionally causes an error (or wait for hot reload errors)
3. **Expected**: Either:
   - Error boundary shows friendly error screen, OR
   - App recovers gracefully

**Pass Criteria**: 
- ✅ No blank white screen
- ✅ User sees either content or friendly error message

---

## Test 9: Loading States

**Objective**: Verify loading indicators

**Steps**:
1. Logout
2. Hard refresh page (Ctrl+Shift+R)
3. Watch for loading state (CareConnect logo with "Loading..." text)
4. **Expected**: Brief loading screen, then login appears

**Pass Criteria**: 
- ✅ Loading screen appears (even if briefly)
- ✅ No blank white screen at any point

---

## Test 10: Data Persistence

**Objective**: Verify app data persists

**Steps**:
1. Login
2. Go to Medications → Add Medication
3. Add a test medication
4. Refresh page
5. **Expected**: ⚠️ New medication may NOT persist (localStorage only saves auth state, not medications)
6. Check that authentication and settings DO persist

**Pass Criteria**: 
- ✅ Authentication persists
- ✅ Left-hand mode setting persists
- ✅ Favorites persist

**Note**: Medications are in-memory only (by design). For full persistence, you'd need Supabase or similar backend.

---

## Known Issues to Ignore

### ✅ Expected (Safe to Ignore)

1. **Console Warning**: `@brightpath/activity-stream: Not Found - 404`
   - This is a Figma Make workspace dependency
   - Does NOT affect your application
   - Can be safely ignored

2. **Hot Module Reload Warnings**
   - During development, you might see HMR warnings
   - These are normal in development mode

### ❌ Report These Issues

1. **Authentication loop**: Login successful but immediately redirects back to login
2. **Blank screen**: White screen with no content
3. **Navigation broken**: Clicking tabs doesn't change content
4. **Settings not persisting**: Left-hand mode resets on refresh
5. **Cannot login**: Any login method fails completely

---

## Debug Commands

If you encounter issues, run these in the browser console:

```javascript
// Check authentication state
localStorage.getItem('isAuthenticated')

// Check all CareConnect data
['isAuthenticated', 'leftHandMode', 'biometricEnabled', 'onboardingComplete', 'favorites']
  .forEach(key => console.log(key, localStorage.getItem(key)))

// Force logout
localStorage.setItem('isAuthenticated', 'false')
location.reload()

// Force login
localStorage.setItem('isAuthenticated', 'true')
location.reload()

// Clear all data
localStorage.clear()
location.reload()
```

---

## Success Criteria

All tests should pass with these results:

- ✅ **Authentication works** and persists across reloads
- ✅ **No authentication loops** (main fix)
- ✅ **Navigation works** smoothly
- ✅ **Settings persist** across sessions
- ✅ **No blank screens** at any point
- ✅ **Errors are handled** gracefully

---

## Next Steps After Testing

Once all tests pass:
1. Document any failing tests
2. Check console for unexpected errors
3. Verify left-hand mode works correctly (your key accessibility feature)
4. Test on different browsers (Chrome, Firefox, Safari)
5. Test on mobile devices if available

---

## Contact

If you encounter persistent issues:
1. Note which test number failed
2. Check the console for error messages
3. Verify localStorage state
4. Refer to `/TROUBLESHOOTING.md` for additional help
