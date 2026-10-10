# Capabilities & offerings

Published agents/workflows, team directory, picker.

## Public API

Other features import only `public-api/types` (payload types, harness section copy) and `public-api/presentation` (components, hooks, client helpers).

## Registry

- **Slug:** `capabilities`
- **Feature path:** `src/features/capabilities`
- **Lib path:** `src/lib/capabilities`
- **Migration:** migrated

## Product concepts

Published agent offerings vs workflows and harness: [docs/product/concepts.md](../../../docs/product/concepts.md).

## Routes

_None wired in this feature folder._

## APIs

- `/api/capabilities`

## Dependencies

- `workflows`

Query: `npm run feature-knowledge:query -- "..." --feature=capabilities`
