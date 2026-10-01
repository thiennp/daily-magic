# AWC Projects - Interaction QA Report

**Date:** October 1, 2026, 1:21 PM UTC  
**Viewport:** 1440×900 Desktop → 390×844 Mobile  
**Story:** AWC → Pages → Projects Ready  
**URL:** localhost:6006/?path=/story/awc-pages--projects-ready

## Executive Summary

**STATUS: ❌ FAIL FOR SHIPPING**

Critical interaction issues found that block production readiness. The Storybook implementation is missing key interactive elements present in the production screenshot, indicating a significant parity gap between Storybook and actual production code.

### Pass/Fail Summary

- ✅ **Passed:** 8 tests
- ❌ **Failed:** 5 tests
- **Blockers:** 3 P0 issues

---

## Test Results Matrix

| ID  | Area                            | Result      | Priority | Notes                                                                                                                                                                                 | Screenshot                            |
| --- | ------------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 1   | Tab Navigation - Brand Link     | ✅ PASS     | P2       | Brand link "Agent Witch" receives focus, visible in nav                                                                                                                               | 02-tab-navigation-home-link-focus.png |
| 2   | Tab Navigation - Nav Links      | ✅ PASS     | P2       | Tab cycles through nav items (Home, Projects, etc.), focus rings visible                                                                                                              | 02-tab-navigation-home-link-focus.png |
| 3   | Dark Mode Toggle                | ✅ PASS     | P1       | Dark mode works, good contrast on nav/cards/search                                                                                                                                    | 03-dark-mode-enabled.png              |
| 4   | Search - Focus & Placeholder    | ✅ PASS     | P1       | Search field focuses correctly, cursor visible, placeholder "Search projects..." present                                                                                              | 04-search-filtering-working.png       |
| 5   | Search - Filter Functionality   | ✅ PASS     | P1       | Typing "test" filters projects, shows "0 of 1 projects", "No projects match 'test'" message                                                                                           | 04-search-filtering-working.png       |
| 6   | Search - Clear Button           | ✅ PASS     | P1       | Clear button (×) visible and functional, restores project list                                                                                                                        | 04-search-filtering-working.png       |
| 7   | Project Card - Hover            | ✅ PASS     | P2       | Card hover shows cursor pointer, no layout shift observed                                                                                                                             | N/A                                   |
| 8   | Project Card - Basic Display    | ✅ PASS     | P2       | Project "daily-magic" displays with path, status, harness/workflow/agent counts                                                                                                       | 05-FAIL-kebab-menu-missing.png        |
| 9   | **Kebab Menu (⋮) - Visibility** | ❌ **FAIL** | **P0**   | **CRITICAL: Kebab menu completely missing from project cards. Production screenshot shows ⋮ menu on right side of each card, but Storybook has none. Cannot test menu interactions.** | **05-FAIL-kebab-menu-missing.png**    |
| 10  | Kebab Menu - Open/Close         | ❌ **FAIL** | **P0**   | **Blocked by #9 - cannot test**                                                                                                                                                       | N/A                                   |
| 11  | Kebab Menu - Menu Items         | ❌ **FAIL** | **P0**   | **Blocked by #9 - cannot test Assign task, Open in AWL, Rename, Delete**                                                                                                              | N/A                                   |
| 12  | New Project Form - Focus        | ✅ PASS     | P2       | Name field focusable, form visible at bottom                                                                                                                                          | 06-mobile-view-no-bottom-nav.png      |
| 13  | **Mobile - Bottom Tab Nav**     | ❌ **FAIL** | **P0**   | **CRITICAL: Bottom tab navigation missing on mobile viewport (390px). AppShell code indicates it should be present but it's not rendered.**                                           | **06-mobile-view-no-bottom-nav.png**  |
| 14  | Mobile - Sidebar Hidden         | ✅ PASS     | P1       | Desktop sidebar correctly hidden on mobile                                                                                                                                            | 06-mobile-view-no-bottom-nav.png      |

---

## Detailed Findings

### P0 Issues (Merge Blockers)

#### P0-1: Kebab Menu Missing from Project Cards

**Severity:** CRITICAL  
**Impact:** Core functionality unavailable  
**Screenshot:** `05-FAIL-kebab-menu-missing.png`

**Description:**  
The kebab menu (⋮) button visible in production (`www.agentwitch.com/projects`) is completely absent from the Storybook implementation. This button should appear on the right side of each project card and provide access to:

- Assign task
- Open in Agent Witch Local
- Rename
- Delete

**Root Cause:**  
Likely one of:

1. **Storybook mock data issue:** The project cards in Storybook may not be receiving the full component tree that includes the menu button
2. **Component conditional rendering:** Menu might be conditionally rendered based on props/state not set in Storybook
3. **Missing component in story:** `AwcProjectCard` or similar may have a menu prop/child that's not included in the story mock

**Evidence:**

- Production screenshot shows clear ⋮ button on each card
- Storybook shows project cards but no interactive menu button
- Hovering over the right side of cards shows no hidden/hover-revealed menu

**Recommendation:**  
Inspect `src/features/projects/AwcProjectsListBody.tsx` and related card components (`AwcProjectCard`, `AwcProjectCardContent`, etc.) to identify:

- Where kebab menu is rendered in production
- What props/conditions gate its appearance
- Whether Storybook story data includes necessary menu callbacks

---

#### P0-2: Bottom Navigation Missing on Mobile

**Severity:** CRITICAL  
**Impact:** Mobile navigation completely broken  
**Screenshot:** `06-mobile-view-no-bottom-nav.png`

**Description:**  
At 390px mobile viewport, no bottom tab navigation is rendered. According to `AppShell.tsx` line 56, `<AppShellBottomNav />` should render on mobile (`pb-16 md:pb-0` indicates bottom padding for mobile nav). User cannot navigate between pages on mobile.

**Root Cause:**  
Likely one of:

1. **Storybook shell variant mismatch:** Story may use `app-narrow` shell which might not include `AppShellBottomNav`
2. **Responsive breakpoint issue:** The `md:hidden` or similar class on `AppShellBottomNav` may not be working correctly in Storybook iframe
3. **Story configuration:** `renderPrimaryNav` prop or shell variant in Storybook may be suppressing bottom nav

**Evidence:**

- `AppShell.tsx` lines 36-56 clearly show `<AppShellBottomNav />` should always render
- Mobile viewport (390px) shows no bottom navigation bar
- Desktop sidebar correctly hidden on mobile, so responsive CSS is partially working

**Recommendation:**

1. Check `src/utils/storybook/stories/awlProjectsHarnessPageStories.shared.tsx` and `src/utils/storybook/awc/entries/awcProjectsAndHarnessPages.tsx`
2. Verify shell variant passed to `AwcStorybookChrome` includes bottom nav
3. Test actual `/projects` route on mobile (not just Storybook) to confirm production works

---

#### P0-3: Storybook-Production Parity Gap

**Severity:** CRITICAL  
**Impact:** Wave QA scores (96-97 UI/UX) are **invalid**  
**Screenshot:** All screenshots

**Description:**  
The Storybook implementation tested here is **not representative of production**. Two critical interactive elements (kebab menu, mobile bottom nav) are missing, which means:

- Previous wave QA scores of 96-97 UI/UX were based on **incomplete/incorrect** Storybook stories
- Agents reviewing Storybook cannot catch real production UX issues
- Storybook is not a reliable QA environment for this page

**Root Cause:**

1. **Story mock data incomplete:** Storybook stories don't fully replicate production component tree
2. **Component composition mismatch:** Production may compose components differently than Storybook
3. **Missing story variants:** Critical interaction states (menu open, mobile nav) not captured in stories

**Why Agents Missed This:**

- Agents likely reviewed only Storybook, not production
- No screenshots comparing Storybook vs production side-by-side
- Test criteria may not have included "verify all interactive elements present"
- Wave QA rubric may focus on visual design over functional completeness

**Recommendation:**

1. **Pause wave QA** until Storybook parity is fixed
2. Add Storybook-production comparison screenshots to every wave QA audit
3. Require checklist: "All buttons/menus present in production also in Storybook"
4. Consider E2E tests on actual `/projects` route, not just Storybook

---

### P1 Issues (Should Fix Before Shipping)

None found beyond the P0 blockers. Search, dark mode, and basic interactions work well.

---

### P2 Issues (Nice to Have)

None significant. Tab navigation, focus rings, and hover states all work correctly for the elements that are present.

---

## Root Cause in Code

### Suspect Files:

1. **`src/utils/storybook/stories/awlProjectsHarnessPageStories.shared.tsx`**
   - Story configuration may not pass correct props for kebab menu

2. **`src/utils/storybook/awc/entries/awcProjectsAndHarnessPages.tsx`**
   - Entry definition may use incomplete mock data

3. **`src/features/projects/AwcProjectsListBody.tsx`** / **`AwcProjectCard*.tsx`**
   - Menu component may be conditionally rendered and Storybook doesn't meet condition

4. **`src/features/shell/AppShellBottomNav.tsx`**
   - May have a condition checking for non-Storybook environment

5. **`src/utils/storybook/AwcStorybookChrome.tsx`**
   - Shell variant logic may not include bottom nav for `app-narrow`

---

## Recommended Fix Direction

### Immediate (Before Resuming Wave QA):

1. **Add kebab menu to Storybook stories:**
   - Ensure project card mock data includes `onMenuOpen` callback or similar
   - Verify menu component is included in story component tree
   - Add interaction test for menu in Storybook

2. **Fix mobile bottom nav:**
   - Check if `AwcStorybookChrome` with `app-narrow` should render `AppShellBottomNav`
   - Verify responsive classes on `AppShellBottomNav` work in Storybook iframe
   - Test with actual `/projects` page in mobile viewport

3. **Add Storybook-Production parity check:**
   - Create comparison screenshots (Storybook vs production, same viewport)
   - Document all interactive elements that should be present
   - Add to wave QA checklist

### Architectural (If Needed):

If the issue is deeper than story configuration:

1. **Consider proper desktop sidebar+main grid layout** (per original audit task):
   - Current layout floats nav card top-left instead of true sidebar
   - Should use `lg:grid-cols-[240px_1fr]` pattern consistently
   - See `AppShell.tsx` lines 43-49 for reference, but check if Projects page uses `sidebar` prop

2. **Standardize shell patterns:**
   - Ensure `app` and `app-narrow` routes all get proper sidebar on desktop, bottom nav on mobile
   - Document which shell variant each route type should use

---

## Checklist for Re-Wave-QA After Fix

Before resuming wave QA, verify:

- [ ] Kebab menu (⋮) visible on project cards in Storybook
- [ ] Kebab menu opens/closes with click
- [ ] Menu items (Assign task, Open in AWL, Rename, Delete) all present
- [ ] Bottom tab navigation visible on mobile (390px)
- [ ] Bottom nav items clickable (Home, Projects, Reports, etc.)
- [ ] Side-by-side screenshot comparison (Storybook vs production) shows parity
- [ ] All interactive elements from production present in Storybook
- [ ] E2E test added for project card menu interaction
- [ ] E2E test added for mobile bottom nav interaction

---

## Top 5 Blockers

1. **Kebab menu completely missing** - Cannot access project actions (Assign, Rename, Delete, Open in AWL)
2. **Mobile bottom navigation missing** - Users cannot navigate between pages on mobile
3. **Storybook-production parity gap** - Previous QA scores invalid, cannot trust Storybook for future QA
4. **No menu interaction test coverage** - Missing tests mean regressions won't be caught
5. **Unclear shell pattern usage** - Inconsistent desktop sidebar vs mobile bottom nav implementation

---

## Additional Notes

### What Worked Well:

- Search functionality is excellent (filtering, clear button, count display)
- Dark mode has good contrast across all elements
- Tab navigation and focus rings are accessible
- Project card basic display is clean and readable

### Testing Limitations:

- Could not test kebab menu due to missing component
- Could not verify menu keyboard navigation (Enter, Escape)
- Could not test "click outside closes menu" behavior
- Mobile testing limited by missing bottom nav

### Recommended Next Steps:

1. Fix P0 issues (kebab menu, mobile nav)
2. Re-run this QA audit on fixed Storybook
3. Add E2E tests covering menu + mobile nav
4. Update wave QA rubric to require parity checks
5. Document correct shell pattern for app routes

---

**Report Generated:** Thursday, Oct 1, 2026, 1:21 PM UTC  
**Testing Agent:** Cloud Computer Use Agent (Autonomous)  
**Environment:** Storybook 10.6.1, Chrome DevTools Mobile Emulation
