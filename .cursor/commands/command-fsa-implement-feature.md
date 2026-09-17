---
name: command-fsa-implement-feature
description: >-
  Implement a new product feature using Fractal Slice Architecture (ADR 0007).
---

# FSA — implement new feature

Use for a **new registry slug** or a greenfield capability. Policy: [ADR 0007](../../docs/adr/0007-fractal-slice-architecture.md). Steps: [fsa-workflows.md](../../docs/conventions/fsa-workflows.md).

## Before coding

1. `npm run harness:bootstrap -- --match="FSA implement feature"`
2. `npm run feature-knowledge:query -- "<feature name>"` and read domain + target `README.md` if slug exists.
3. Confirm slug, routes, and `apiPaths` in `src/features/_registry/features.registry.json`.

## Checklist

### Intake

- [ ] Capabilities listed; nested `features/<sub>/` only if deletion test needs it
- [ ] `public-api` surface drafted (`types`, `presentation`, `infrastructure`)
- [ ] `dependsOn` slugs documented; hub command identified if cross-slice effect needed

### Scaffold (`src/features/<slug>/`)

- [ ] `public-api/types.ts`
- [ ] `public-api/presentation.ts` — exports for `src/app/` pages and other features’ UI
- [ ] `public-api/infrastructure.ts` — server-only exports for `route.ts` handlers
- [ ] `internal/presentation/` — components, hooks
- [ ] `internal/core/` — pure logic (no React, no Next routes)
- [ ] `internal/infrastructure/` — DB/API adapters owned by this slice
- [ ] `README.md` (+ `AGENTS.md` / `KNOWN_ISSUES.md` when appropriate)

### Entry wiring (`src/app/`)

- [ ] Pages import only from `@/features/<slug>/public-api/presentation` or `types`
- [ ] API `route.ts` handlers are thin; call `public-api/infrastructure`
- [ ] No business logic duplicated in route files

### Boundaries

- [ ] No import from other features’ `internal/`
- [ ] No slice-only utilities in global `src/hooks/` or `src/lib/` without registry/shared justification
- [ ] Segregated public-api files (no mixed presentation + infrastructure export file)

### Docs and index

- [ ] [docs-first.md](../../docs/conventions/docs-first.md) checklist
- [ ] `npm run feature-knowledge:index` if markdown changed

## Verify

```bash
npm run harness:bootstrap -- --workflow=verify
npm run cursor:architecture -- --staged
npm run validate:staged
npm run build
```

### Framework checklist

- [ ] No `route.ts` or `page.tsx` added under `src/features/`
- [ ] No `'use client'` file imports `public-api/infrastructure`
- [ ] `server.ts` unchanged unless the task explicitly covers WebSocket/hosting (ADR 0002)

## Output for reviewer

- Slug name and registry diff
- List of `public-api` exports
- Routes/API paths touched
- Hub command (if any) — or “none”
