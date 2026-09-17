---
name: command-fsa-migrate-feature
description: >-
  Migrate one existing feature slug to Fractal Slice Architecture without behavior change.
---

# FSA — migrate existing feature

**One slug per PR** unless the user explicitly batches. Policy: [ADR 0007](../../docs/adr/0007-fractal-slice-architecture.md). Steps: [fsa-workflows.md](../../docs/conventions/fsa-workflows.md).

## Before coding

1. `npm run harness:bootstrap -- --match="FSA migrate feature"`
2. Read `src/features/<slug>/README.md`, `KNOWN_ISSUES.md`
3. Registry entry: `libPath`, `routePaths`, `apiPaths`, `dependsOn`

## Phase 1 — Inventory

Run and paste summary in PR (not secrets):

```bash
rg "features/<slug>" src --glob '!**/*.test.*'
rg "from ['\"]@/features/<slug>" src
```

- [ ] External importers listed
- [ ] Deep imports into other features’ internals flagged for fix
- [ ] Server code locations (`libPath`, API routes) listed

## Phase 2 — Strangler migration

- [ ] Add `public-api/{types,presentation,infrastructure}.ts` (re-export legacy paths if needed)
- [ ] Create `internal/{presentation,core,infrastructure}` and move files (git mv when tracked)
- [ ] Update **all external** imports to `public-api/*` only
- [ ] Remove temporary re-exports when importers are clean
- [ ] Update feature `README.md` with FSA layout

## Phase 3 — Lib (optional)

- [ ] Move owned `src/lib/<area>/` into `internal/infrastructure/`
- [ ] Update `features.registry.json` `libPath`
- [ ] Route handlers still in `src/app/api/`; call infrastructure public API

## Phase 4 — Deletion test

- [ ] Removing `src/features/<slug>/` would not leave orphan logic in unrelated folders
- [ ] No new cross-feature `internal/` imports introduced

## Verify

```bash
npm run harness:bootstrap -- --workflow=pr
npm run build
```

For local iteration: `npm run cursor:architecture -- --staged` and `npm run validate:staged`.

### Framework checklist

- [ ] `src/app/**` route files still exist at App Router paths (only imports changed)
- [ ] No `route.ts` moved into `src/features/`
- [ ] Client bundles do not pull in `public-api/infrastructure` (check import graph / build)

## Forbidden in migration PRs

- Unrelated refactors or drive-by renames outside the slug
- New global event buses for domain coupling
- Mixing presentation and infrastructure in one public-api file
- Skipping registry/README updates when paths change

## Output for reviewer

- Slug migrated
- Before/after import graph (short)
- `libPath` change (if any)
- Behavior change: **none** (or list exceptions)
