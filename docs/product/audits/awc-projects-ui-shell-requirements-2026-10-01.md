# AWC signed-in shell — requirements from production visual (2026-10-01)

**Source:** `/opt/cursor/artifacts/awc-projects-production-1440.png` only. No code reference required to accept these requirements.

## P0 — Desktop app chrome (must ship)

1. **Brand anchor:** Product name/logo belongs in a **persistent global header** (top bar), left-aligned with the app, not only inside a floating nav card.
2. **Navigation model:** Primary nav is a **left sidebar** (fixed width, full viewport height below header), not a stacked card above page content inside a narrow column.
3. **Main canvas:** Page content (`/projects` title, panel, grid) occupies the **remaining width** beside the sidebar; use horizontal space on 1280–1600px viewports (no ~max-w-4xl wrapping nav + body together).
4. **Header alignment:** Top utility bar (theme, user) and body content share the same **horizontal content frame** (no full-width header over a narrow centered column).

## P1 — Hierarchy

5. Page H1 is the first heading in the **main column**, not below a nav card block.
6. Remove or relocate **AWL version** string from primary customer nav chrome (dev metadata not in sidebar brand area).

## Acceptance screenshots

- 1440×900 and 1280×800: sidebar visible, brand in header, projects grid uses ≥60% of viewport width for content area.
