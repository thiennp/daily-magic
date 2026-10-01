# UI deep inspection (required for `ui` role)

Full-page PNGs alone are **not enough**. Obvious visual defects must not pass as “quick wins only.”

## When to apply

- Every **first-pass** `ui` review on a catalog page.
- **Final audit** (round `audit-1`) on every page that already has `ui` passed — see skill `final-audit` phase.

## Zoom checklist (every status × viewport PNG)

For each capture, **mentally crop and inspect** at least:

1. **Primary hero / above-the-fold** — CTAs, nav, announcement bar.
2. **Every card or bordered panel** — borders continuous, no stray horizontal rules through children.
3. **Code / pre / monospace blocks** — padding, overflow, no clipped text, no theme token bleed (`dark:` on light marketing shells).
4. **Forms and auth** — fields, buttons, error/empty states.
5. **Tables, menus, icon buttons** — alignment, hit targets, SVG/AppIcon rendering.
6. **Footer / repeated CTA bands** — spacing, wrap, contrast.

Record zoom targets in review JSON: `zoomedSections: string[]` (e.g. `"for-your-ai-pre-block-desktop-ready"`).

## Obvious visual defects (non-exhaustive)

Treat as **blocking for `ui` pass** unless fixed in the same round:

| Defect                | Examples                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------- |
| **Broken chrome**     | Border or divider cutting through a child block; double borders; card outline interrupted |
| **Overflow / clip**   | Text or URL clipped in `<pre>`; horizontal scroll unintentional; images cropped wrong     |
| **Theme mismatch**    | `dark:` utilities on marketing-light Storybook; inverted surfaces that look accidental    |
| **Misaligned stacks** | Buttons/links different heights without intent; uneven card heights in a row              |
| **Broken media**      | Missing/broken icons (common Storybook SVG issue)                                         |

If any blocking defect exists: set `obviousVisualDefects: "present"`, list in `mustFix[]`, **`passed: false`** (or fix + recapture then `obviousVisualDefects: "none"`).

If none after zoom: `obviousVisualDefects: "none"` and may pass at **≥97** with **≤3** total polish deductions (see `quality-bar.md`).

## Reference regression

**AWC home-marketing — For your AI:** dark `<pre>` on white card with stray horizontal line / tight padding — would be **`present`** under this checklist (see product issue filed from user screenshot).

## Compare production when in doubt

Storybook + **https://www.agentwitch.com** same route (or `#for-your-ai`) — note drift in review `topIssues`.
