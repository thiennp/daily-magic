# FSA workflows — implementation and migration

Deterministic checklists for humans and agents. **Policy:** [ADR 0007](../adr/0007-fractal-slice-architecture.md). **Deep architecture (later):** [fractal-slice-architecture.md](../architecture/fractal-slice-architecture.md).

## When to use which path

| Situation                                         | Workflow                                                                                       |
| ------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| New product capability (new registry slug)        | [New feature implementation](#new-feature-implementation) + `command-fsa-implement-feature.md` |
| Restructure existing slug without behavior change | [Migrate existing feature](#migrate-existing-feature) + `command-fsa-migrate-feature.md`       |
| Touch only `src/app/api` wiring                   | Thin handler checklist below                                                                   |
| Cross-feature side effect                         | [Hub integration](#hub-integration-draft) (after hub exists)                                   |

Always load context first: `npm run feature-knowledge:query -- "FSA <slug>" --feature=<slug>`.

## Next.js guardrails (do not break the framework)

FSA is **folder discipline inside `src/features/`** plus thin `src/app/` wiring. It is not a replacement for the App Router.

- Keep all `page.tsx` / `layout.tsx` / `route.ts` under `src/app/`.
- Do not colocate Next route files under `src/features/<slug>/internal/`.
- Client UI (`'use client'`) must not import server/infrastructure public APIs.
- Keep `server.ts` at repo root for Agent Witch WebSocket (ADR 0002).
- Before committing FSA file moves: `npm run validate:staged` and `npm run build` (or `npm run harness:bootstrap -- --workflow=verify`).
- Parse/validate boundary payloads with **[guardz](https://www.npmjs.com/package/guardz)**; extend **[structure-validation](https://www.npmjs.com/package/structure-validation)** when adding roots or FSA file names — [guardz-and-structure-validation.md](guardz-and-structure-validation.md).

Full table: [ADR 0007 § 1b](../adr/0007-fractal-slice-architecture.md).

---

## New feature implementation

### Phase A — Intake (no code)

1. Confirm slug in `src/features/_registry/features.registry.json` (or add entry).
2. List capabilities: one primary slice; split into nested `features/<sub>/` only if deletion test requires it.
3. Draft `public-api` surface:
   - `types.ts` — DTOs and enums other slices may need
   - `presentation.ts` — page components, hooks for `src/app/` pages
   - `infrastructure.ts` — server functions route handlers call (if any)
4. Note `dependsOn` registry slugs; plan **hub** commands if a side effect spans slices.
5. Human or ticket confirmation before Phase B.

### Phase B — Scaffold

1. Create folder skeleton under `src/features/<slug>/` (see ADR 0007).
2. Add `README.md`, optional `AGENTS.md` via `npm run feature-knowledge:scaffold-docs` when appropriate.
3. Wire `src/app/` routes: import **only** from `public-api/presentation` or call `public-api/infrastructure` from `route.ts`.
4. Keep `src/lib/` empty for this slug unless the code is truly shared (3+ slices) — then `src/shared/` or documented `libPath`.

### Phase C — Verify

```bash
npm run harness:bootstrap -- --workflow=verify
npm run cursor:architecture -- --staged
npm run validate:staged
```

Update `docs/conventions/docs-first.md` checklist items (registry, README, ADR if architectural).

---

## Migrate existing feature

**Scope:** one registry slug per PR. Behavior unchanged unless explicitly in scope.

### Phase 0 — Preconditions

1. Read `src/features/<slug>/README.md`, `KNOWN_ISSUES.md`.
2. Read ADR 0003 + ADR 0007.
3. `git diff` scope: only `<slug>`, its `apiPaths`, `routePaths`, and `libPath` modules.

### Phase 1 — Inventory

| Question                                        | Action                                    |
| ----------------------------------------------- | ----------------------------------------- |
| What do other features import from this slug?   | `rg "features/<slug>" src` — list symbols |
| What does this slug import from other features? | Flag any `internal`-like deep imports     |
| Where is server logic?                          | `libPath` + `src/app/api/...`             |
| What must `public-api` export?                  | Minimal set for current importers         |

### Phase 2 — Introduce boundaries (strangler)

1. Add `public-api/types.ts`, `presentation.ts`, `infrastructure.ts` (can re-export from legacy paths initially).
2. Move files into `internal/{presentation,core,infrastructure}` **without** changing exports used outside the slice yet.
3. Update **external** importers to use `public-api/*` only.
4. Delete re-export shims once importers are migrated.
5. Update feature `README.md` with new layout.

### Phase 3 — Lib co-location (optional same PR or follow-up)

1. Move `src/lib/<area>/` modules owned by this slug into `internal/infrastructure/`.
2. Update `features.registry.json` `libPath` to point at new location or remove when empty.
3. Keep route files in `src/app/api/`; handlers call infrastructure public API.

### Phase 4 — Deletion test

Ask: “If we delete `src/features/<slug>/`, what breaks outside `src/app` wiring?”  
Remaining references must be registry, routes, or `public-api` consumers — fix or document.

### Phase 5 — Verify

Same as new feature Phase C. For refactors: `npm run harness:bootstrap -- --workflow=pr` before opening PR.

---

## Thin API route handler

Route files stay in `src/app/api/**/route.ts`.

1. Auth/session checks only in route (or shared auth helper from `src/lib/auth`).
2. Parse request → DTO validated in `internal/core` or route-local validator.
3. Call `import { … } from "@/features/<slug>/public-api/infrastructure"`.
4. Map result to `NextResponse` / status codes.
5. No business branching that belongs in `core/`.

---

## Hub integration (draft)

Use when a producer feature must notify or coordinate without importing a consumer.

1. Add or extend `src/hubs/<Name>/` (created in a future implementation task).
2. Producer: after successful transaction, call hub **command** only.
3. Consumer: register hub **listener** in `entry` wiring or feature bootstrap (documented in step 2 architecture doc).
4. Do not import consumer feature from producer feature.

---

## Agent discipline (avoid random output)

1. **Match harness:** `npm run harness:bootstrap -- --match="FSA migrate <slug>"` or `--match="FSA implement"`.
2. **Attach one command playbook** — do not invent folder names.
3. **Single slug per task** unless user explicitly batches.
4. **No new global `utils/`** for slice-specific logic — use `internal/core` or `internal/presentation`.
5. **Commit docs** with code: registry, README, `feature-knowledge:index` when markdown changed.

Command playbooks:

- `.cursor/commands/command-fsa-implement-feature.md`
- `.cursor/commands/command-fsa-migrate-feature.md`
