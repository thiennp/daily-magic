# Showcases

Public SEO articles.

## Registry

- **Slug:** `showcases`
- **Feature path:** `src/features/showcases`
- **Migration:** migrated

## Routes

- `/showcases`

## Onboarding screenshots

Real PNG captures: `public/showcases/onboarding/CAPTURE.md` (drop files beside SVG samples; articles pick up PNG automatically).

## E2E

Onboarding guide render checks: `npm run test:e2e:install` then `npm run test:e2e`.

Leadership lane: `e2e/showcases-leadership.spec.ts` (exec articles + index section).

## APIs

_None._

## Dependencies

- `marketing`

Query: `npm run feature-knowledge:query -- "..." --feature=showcases`

## Articles public API

`src/features/showcases/articles/public-api/types.ts` re-exports the article objects; import them from there outside `articles/`.
