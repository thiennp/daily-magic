# Accessibility audit (wave `a11y-audit-1`)

One **full-catalog wave** after `dx-audit-1`. One page at a time.

## Checklist (every applicable status)

- **Keyboard:** Tab order logical; Escape closes menus (`useDropdownMenuKeyboard` pattern); focus visible.
- **Names:** Buttons and links have accessible names (no icon-only without `aria-label`).
- **Forms:** Inputs tied to labels; errors associated with fields where present.
- **Contrast:** Body and CTA text meet readable contrast in light and dark captures.
- **Motion:** No seizure-inducing flash; respect reduced-motion if page animates.
- **Landmarks:** `nav`, `main`, headings hierarchy not skipped for decoration.

## AWC mobile

- Bottom tab `nav` with `aria-label="Mobile"`; active route `aria-current="page"`.

## Evidence

- `computerUse` or Playwright for keyboard paths on interactive pages (projects, library, automations, …).
- Reviews in `a11y-audit-1/*-reviewer-{a,b}.json` with `"auditType": "a11y"` until schema extended.

## Pass

- ≥ **97** both reviewers; empty `mustFix` for WCAG-blocking issues (keyboard trap, missing name, unusable contrast).
