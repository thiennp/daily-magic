# Marketing

Landing sections, marketing shell, public CTAs. Design tokens:
`marketingDesignSystem.constant.ts` (v2026-09). Doc:
`docs/design/agent-witch-public-ui.md`. Live preview: `/styleguide` →
Marketing brand.

## Registry

- **Slug:** `marketing`
- **Feature path:** `src/features/marketing`
- **Migration:** migrated

## Routes

- `/`

## APIs

_None._

## Dependencies

_None._

Query: `npm run feature-knowledge:query -- "..." --feature=marketing`

Public API: `components/public-api/presentation.ts` exposes `MarketingTrustIcon`.

Unit public API: `public-api/presentation.ts` (shell, cards, CTAs, auth-modal context), `public-api/types.ts` (design-system class constants, copy, nav items, pure helpers), `public-api/infrastructure.ts` (`buildRobotsDisallowPaths`).
