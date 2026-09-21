# Library

Saved playbooks; fork and run from library.

## Registry

- **Slug:** `library`
- **Feature path:** `src/features/library`
- **Lib path:** `src/lib/library`
- **Migration:** migrated

## Product concepts

Saved playbooks—not a separate runtime: [docs/product/concepts.md](../../../docs/product/concepts.md).

## Routes

- `/library`

## Guest (unsigned) library

- Draft playbooks persist in `localStorage` (`agentwitch.library.guest-drafts.v1`).
- Starter templates use public `GET /api/capabilities/templates` (+ detail); save copies a draft locally.
- On sign-in, `syncGuestLibraryDraftsToCloud` reconciles with `/api/capabilities/mine` using **latest `updatedAt` wins** (cloud wins on tie).

## APIs

_None (guest sync uses existing capabilities routes)._

## Dependencies

- `workflows`
- `capabilities`
- `harness`

Query: `npm run feature-knowledge:query -- "..." --feature=library`
