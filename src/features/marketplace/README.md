# Marketplace

Browse and borrow company-published agents.

## Registry

- **Slug:** `marketplace`
- **Feature path:** `src/features/marketplace`
- **Lib path:** `src/lib/harness`
- **Migration:** migrated

## Product concepts

Company-published listings on top of harness + capabilities: [docs/product/concepts.md](../../../docs/product/concepts.md).

## Routes

- `/marketplace`

## APIs

- `/api/harness/marketplace`

## Dependencies

- `harness`
- `library`
- `capabilities`

Query: `npm run feature-knowledge:query -- "..." --feature=marketplace`

## Public API

Other features import only from `public-api/types` (copy and class constants) and `public-api/presentation` (panel, home promo, section skeleton, preset install helper).
