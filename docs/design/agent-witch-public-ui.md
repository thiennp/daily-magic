# Agent Witch public UI (marketing + AWL)

**Version:** `MARKETING_DESIGN_SYSTEM_VERSION` in `src/features/marketing/marketingDesignSystem.constant.ts` (styleguide: `/styleguide` → Marketing brand).

## Intent

Enterprise SaaS landing and local Mac UI share one visual language:

- **Canvas:** `gray-50` page background, white border-first cards (`rounded-xl`, `border-gray-200`, light shadow).
- **Brand:** Tailwind `brand-*` ramp (`globals.css` `@theme`) for CTAs, links, eyebrows, metric dividers.
- **Contrast bands:** `gray-950` for security copy; `brand-600` for bottom CTA band.
- **Typography:** Outfit (marketing shell + AWL); display headings tight tracking; eyebrows `text-xs` uppercase `tracking-[0.14em]` `text-brand-700`.
- **Logo:** Unchanged `AgentWitchLogo` / diamond mark — do not swap for alternate lockups.

## AWC (Console)

| Surface | Token module |
| ------- | ------------- |
| Landing, login, legal | `marketingDesignSystem.constant.ts` + `marketingPalette.constant.ts` |
| Signed-in app panels | `src/components/surfaces/appSurfaceStyles.constant.ts` (brand primary buttons, brand eyebrows) |
| Signed-in shell nav | `src/features/shell/appShellNavClasses.constant.ts` + `AppShellBottomNav` (brand active) |
| TailAdmin `Button` | `src/components/ui/button/Button.tsx` primary/outline match marketing CTAs |

Marketing pages use `marketing-light-surface` so global `.dark` does not invert public chrome.

## AWL (Live Mac HTML)

Inline CSS: `apps/live/features/shell/internal/core/agentWitchLocalAppStyles.ts` — hex values from `@agent-witch/shared/ui` (`AGENT_WITCH_PUBLIC_UI_TOKENS`). Keep tokens in sync when `@theme` brand/gray changes.

## Reference layout (landing)

1. Navy **announcement bar** (`MarketingAnnouncementBar`).
2. Sticky white **header** with product nav + Sign in / Create account.
3. **Hero** — eyebrow, display title, primary + secondary CTAs, metric strip, product preview card.
4. Feature grid + **dark security band** + guides + **brand CTA band**.

## Query aliases

- styleguide marketing brand AWC AWL
- agent witch landing design tokens
