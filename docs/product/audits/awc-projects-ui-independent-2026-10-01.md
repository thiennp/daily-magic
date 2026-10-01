# Independent UI review — AWC `/projects` (production)

**Date:** 2026-10-01  
**Scope:** `https://www.agentwitch.com/projects` (signed-in), desktop ~1440px from user capture  
**Method:** Visual review of production screenshot + source layout (`AppShell`, nav, projects page). **Not** tied to Storybook wave QA, agent scores, or internal rubric files.

## Verdict

**Not acceptable as a signed-in application shell for a multi-page product.** The page reads as a marketing-width column with a floating nav card above the title, not as a workspace. This is a **layout architecture** problem, not polish on project cards alone.

## What the screenshot shows (observable)

1. **Primary navigation** appears as a **card panel** (~320px wide) in the upper-left of the content band, not a persistent left sidebar aligned to the viewport.
2. **Large empty margins** left and right of the whole block; usable content sits in a **narrow central column** (`max-w-4xl` class behavior).
3. **Page title “Projects”** begins **below** the nav card, so vertical scan path is: header bar → floating nav → title → panel — not: sidebar | title+content.
4. **Project grid** is readable once reached (cards, search, counts) but feels **disconnected** from global navigation spatially.
5. **Top app header** (theme, user menu) spans full width while **body** does not — visual “frame mismatch.”

## Root cause (code, factual)

| Layer                                           | Behavior                                                                                                                             |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `AppShell` without `sidebar`                    | Renders `AppShellNav` **inside** `<main>`, **above** `children`, not in a side column.                                               |
| `APP_SHELL_NARROW_CONTENT_CLASS` on `/projects` | Constrains main to `max-w-4xl`, amplifying side whitespace on wide screens.                                                          |
| `APP_SHELL_DESKTOP_NAV_CLASS`                   | Nav is a **surface card** (`hidden md:flex`), `max-w-[20rem]` wrapper — reinforces “floating box” not “app chrome.”                  |
| Mobile                                          | Bottom tab nav (`md:hidden` pattern elsewhere); desktop uses this stacked nav — **no desktop sidebar grid** for standard app routes. |

Home signed-in uses `renderPrimaryNav={false}` and custom layout; **projects does not** — it inherits the stacked pattern.

## Issues (severity — general product UI standards)

### P0 — Broken app layout model (desktop)

- **Expected (SaaS dashboard):** Persistent vertical nav (or collapsible rail) + scrollable main canvas using horizontal space for data-dense views (tables, grids).
- **Actual:** Nav and content share one narrow column; wasted ~40–50% viewport width on typical laptop/monitor.
- **Impact:** Fatigue, weak sense of place, projects list feels like a blog post with a widget above it.

### P1 — Information hierarchy

- Nav competes with page H1 for “what is this screen?” — both are top-of-column blocks.
- ACL/registry note + search + grid are **third** visual layer; eye must skip nav card first on every visit.

### P1 — Consistency risk across AWC

Same `AppShell` pattern likely affects **library, reports, automations, marketplace, prompt optimizer** (all use default `renderPrimaryNav={true}` without `sidebar`). User complaint on projects may apply **fleet-wide**, not one page.

### P2 — Density and scanning (projects-specific)

- 11 projects in 2-column grid inside narrow column — acceptable mobile, **under-using desktop**.
- Long filesystem paths in cards truncate; acceptable but secondary to shell issue.

### P2 — Copy / chrome noise (minor vs layout)

- Announcement/registry line above search adds vertical weight in an already tall above-the-fold stack.
- “AWL {version}” in nav header is dev-facing on a customer projects screen.

### P3 — Positive elements (fair)

- Card content (online/offline, harness counts) is legible.
- Search + project count alignment is clear.
- Active nav state (Projects highlighted) works within the card.

## Why prior “QA pass” is irrelevant to this review

Any process that scored Storybook PNGs **without** requiring “desktop app shell = sidebar + main” would **miss** this, because Storybook **replicates the same `AppShell` markup**. Passing screenshots only proves **fidelity to current code**, not fitness for production UX.

## mustFix

1. **P0 — Desktop signed-in shell:** Replace stacked nav card + narrow column with a persistent desktop layout (sidebar or collapsible rail + fluid main canvas). Implement in `AppShell` so library, reports, automations, marketplace, and projects share one model.
2. **P1 — Information hierarchy:** Page H1 and primary content must not sit below a floating nav card; nav belongs in lateral chrome, not above the title in the content column.
3. **P1 — `app-narrow` scope:** When narrow max-width is used, apply it to the main content column only—not nav and main together inside `max-w-4xl`.

## niceToHave

- **P2 — Projects density:** Use more horizontal space for the project grid on desktop (1280px+).
- **P2 — Chrome copy:** Reduce dev-facing noise (e.g. AWL version string) on customer-facing projects surfaces.
- **P3 — Registry line:** Revisit vertical weight of ACL/registry note above search when shell is fixed.

## Recommended direction (no commitment to wave QA process)

1. **Design decision:** Define one AWC signed-in shell for desktop (e.g. `lg:grid` with fixed nav width + fluid main, full `max-w-[1600px]` canvas).
2. **Implement in `AppShell`** (single place), not per-page hacks.
3. **Revisit `app-narrow`:** Use narrow **main column only**, not nav+main together inside `max-w-4xl`.
4. **Validate on production** at 1280px and 1440px with real data density (10+ projects).
5. **Only then** re-run any formal QA — optional and separate from this audit.

## Out of scope for this document

Storybook capture commands, agent JSON, score thresholds, `progress.json`.
