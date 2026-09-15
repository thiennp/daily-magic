# ADR 0003: Feature UI with server lib co-location

## Status

Accepted

## Context

Many features have React UI under `src/features/<slug>/` but server logic under `src/lib/<area>/` and API routes under `src/app/api/`. The registry previously used `migrationStatus: documented` vs `migrated`, which implied unfinished work.

## Decision

- **`migrated`** means the feature is **product-complete**: UI and feature docs live under `src/features/<slug>/`.
- Optional **`libPath`** points at shared server modules intentionally kept in `src/lib/` (database, dispatch, auth). API route handlers remain in `src/app/api/` per Next.js App Router conventions.
- There is no requirement to move `src/lib/dispatch` into `src/features/dispatch` if the feature README documents `apiPaths` and `libPath`.

## Consequences

- Registry `migrationStatus` is `migrated` for all shipped features; `libPath` documents server ownership.
- New features follow the same split unless the module is UI-only.
