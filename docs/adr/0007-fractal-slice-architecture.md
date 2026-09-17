# ADR 0007: Fractal Slice Architecture (FSA) for feature modules

## Status

Proposed

## Context

Agent Witch already organizes product UI under `src/features/<slug>/` (see [ADR 0003](0003-feature-ui-with-server-lib.md) and [codebase map](../architecture/codebase-map.md)). In practice, many capabilities still slice **horizontally**: server logic in `src/lib/<area>/`, routes in `src/app/`, and cross-feature imports that reach deep into another feature’s `hooks/` or `utils/`. That layout passes the “feature folder exists” check but fails the **deletion test**: removing a product area still requires edits across `lib/`, `app/api/`, and unrelated features.

We want a **vertical, fractal** module shape inspired by Fractal Slice Architecture (FSA): each business capability owns its presentation, core logic, and infrastructure adapters behind **segregated public contracts**, with sub-capabilities nesting using the same rules. Cross-capability workflows must not use opaque pub/sub between features; they use **integration hubs** (CQRS-style command/query contracts) that features depend on but that never depend on features.

This ADR records the **target architecture and adoption policy**. A separate architecture doc (`docs/architecture/fractal-slice-architecture.md`) will describe the full target layout in step 2; until that doc is Accepted, treat this ADR plus `docs/conventions/fsa-workflows.md` as the agent/human workflow source.

## Decision

### 1. Target module shape (per registry slug)

Each product feature slug under `src/features/<slug>/` should converge toward:

```text
src/features/<slug>/
├── public-api/
│   ├── presentation.ts    # UI entrypoints, hooks/pages exported to app/ and other features
│   ├── infrastructure.ts  # Server-only exports (repositories, jobs) — never imported from client bundles
│   └── types.ts           # Shared domain types/DTOs safe for any consumer
├── internal/
│   ├── presentation/      # Components, hooks, route adapters private to the slice
│   ├── core/              # Pure business logic (no React, no Next route handlers)
│   └── infrastructure/    # DB, external APIs, lib code moved from src/lib when owned by this slice
└── features/              # Optional nested sub-slices (same structure, fractal)
```

**Orchestration (entry layer)** stays framework-native:

| FSA concept                    | Agent Witch location                                                                                                                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `entry/` (router, API gateway) | `src/app/` (pages, layouts, `src/app/api/**/route.ts`), `server.ts` for WebSocket upgrade                                                  |
| Domain-agnostic shared infra   | `src/lib/` (and `src/server/` where used) while migrating; any new top-level root requires `structure-validation.config.json` + ADR update |
| Shared design system UI        | `src/components/` (must not import feature `internal/`)                                                                                    |

Next.js requires API route files under `src/app/api/`. Route handlers remain thin: validate auth, call `public-api/infrastructure.ts` or `public-api/presentation.ts` facades, return responses. Do **not** move `route.ts` files into `internal/` without an ADR amendment.

### 1b. Next.js / App Router invariants (non-negotiable)

FSA reorganizes **feature code**; it does **not** replace Next.js routing conventions. Violating these breaks the build or runtime:

| Invariant                    | Requirement                                                                                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pages and layouts            | `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx` stay under `src/app/**` only                                                                                                   |
| Route handlers               | `route.ts` (and App Router HTTP verbs) stay under `src/app/api/**` (or other `src/app/**` segments Next documents). Never under `src/features/**`                                                    |
| Custom server                | Root `server.ts` + `npm start` / `npm run dev` (ADR 0002). Do not relocate WebSocket upgrade into a feature slice                                                                                    |
| Middleware                   | Keep `middleware.ts` at the project root / `src/` per Next.js discovery rules — not inside `internal/`                                                                                               |
| Client vs server             | Files with `'use client'` must not import `@/features/*/public-api/infrastructure` or `internal/infrastructure/**`. UI imports `public-api/presentation` and `public-api/types` only                 |
| Server modules               | DB drivers, Neon, Node-only APIs live in infrastructure layers or `src/lib/`; wire them from Server Components, `route.ts`, or `server.ts` — not from client bundles                                 |
| Shared code during migration | Use existing `src/lib/` for cross-cutting server utilities until a dedicated shared-root ADR exists. Do not introduce `src/shared/` without updating `structure-validation.config.json` and this ADR |
| Registry / validation        | New folders (`public-api/`, `internal/`, `src/hubs/`) must pass `npm run validate:staged` before commit                                                                                              |

**Docs-only ADR landing:** Current repo behavior is unchanged until a slug migration PR adds FSA folders. Each migration PR must pass `npm run build` (or `npm run harness:bootstrap -- --workflow=verify`).

### 2. Three rules of engagement (binding for new work and migrations)

1. **Segregated boundary contracts** — No single catch-all `index.ts` that mixes presentation and infrastructure. Consumers import only from `@/features/<slug>/public-api/presentation`, `…/infrastructure`, or `…/types` (exact paths may use project aliases). This prevents server drivers leaking into client bundles.

2. **Strict isolation** — Feature A must not import from `src/features/<other>/internal/**`. Cross-feature access goes only through the other feature’s `public-api/*`. Enforce incrementally via `npm run cursor:architecture` (future rule IDs) and code review.

3. **Deletion test** — Deprecating a capability should allow deleting `src/features/<slug>/` plus its `src/app` route wiring and registry entry, without hunting through global `utils/` or unrelated features. Shared code used by 3+ slices moves to `src/shared/` or `src/lib/` only with an explicit owner documented in the registry.

### 3. Relationship to ADR 0003

ADR 0003 remains **Accepted** for the transition:

- UI and feature docs stay under `src/features/<slug>/`.
- `libPath` in `features.registry.json` documents server ownership until code moves into `internal/infrastructure/`.
- API routes stay in `src/app/api/` per App Router.

FSA **narrows** ADR 0003: `libPath` is a migration pointer, not a permanent second home for feature-owned logic.

### 4. Cross-feature integration: hubs, not feature-to-feature events

When capability A must trigger side effects in B (e.g. dispatch → notifications):

- Define commands/events on an **integration hub** under `src/hubs/<HubName>/` (new top-level area).
- **Producers** import only the hub **command** API (dispatch/write).
- **Consumers** import only the hub **query/listener** API (read/subscribe).
- Hubs **must not** import from any feature `internal/` or feature-specific `public-api/infrastructure`.

Avoid domain-level global pub/sub (anonymous event buses) for coupling that should be traceable in code review.

Hub layout and first hub candidates are specified in step 2 architecture doc; do not add hubs without updating that doc and this ADR.

### 5. Incremental adoption (Boy Scout)

- **No big-bang rewrite.** One registry slug per PR unless explicitly approved.
- New features **must** scaffold `public-api/` + `internal/` (see `command-fsa-implement-feature.md`).
- Legacy features **may** keep flat `hooks/` / `utils/` until migrated via `command-fsa-migrate-feature.md`.
- Do not block product delivery to finish FSA everywhere first.

### 6. Agent workflow (token discipline)

For FSA-related tasks, agents **must** follow fixed playbooks (no improvised folder layouts):

| Intent             | Attach / run                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| New capability     | `@.cursor/commands/command-fsa-implement-feature.md`                   |
| Migrate one slug   | `@.cursor/commands/command-fsa-migrate-feature.md`                     |
| Structure only     | `npm run harness:bootstrap -- --workflow=structure`                    |
| Post-change verify | `@.cursor/commands/command-verify-post-change-lint-typecheck-tests.md` |

Canonical human-readable steps: [fsa-workflows.md](../conventions/fsa-workflows.md).

## Consequences

### Positive

- Features read as product capabilities in the tree; reviews map requirements to folders.
- Segregated `public-api` reduces accidental client/server boundary violations.
- Hubs make cross-feature dependencies explicit and extensible without editing producers.

### Negative / cost

- Short-term duplication while `src/lib` and `internal/infrastructure` coexist.
- More folders per feature; mitigated by fractal rules and playbooks.
- ESLint/architecture scripts need new rules (follow-up implementation task).

### Follow-up (not in this ADR’s first landing)

- Detailed target diagram: `docs/architecture/fractal-slice-architecture.md` (step 2).
- `structure-validation.config.json` and `srcLayerImportRules` updates for `internal/` and `public-api/`.
- First integration hub extraction (likely dispatch / agent-run lifecycle).

## References

- [FSA workflows](../conventions/fsa-workflows.md)
- [Codebase map](../architecture/codebase-map.md)
- [ADR 0003](0003-feature-ui-with-server-lib.md)
- Rule: `.cursor/rules/rules-fractal-slice-architecture.mdc`
