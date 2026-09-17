# Codebase map

## Top-level layout

| Path                         | Role                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------ |
| `src/app/`                   | Next.js App Router pages, layouts, **`src/app/api/`** route handlers                 |
| `src/features/`              | Product UI, hooks, and feature-local docs                                            |
| `src/lib/`                   | Server/domain modules shared across features (e.g. `agentWitch`, `dispatch`, `auth`) |
| `src/components/`            | Shared TailAdmin UI (must not import features or app routes)                         |
| `src/hooks/`, `src/context/` | Shared React utilities                                                               |
| `db/`                        | SQL schema and migrations                                                            |
| `scripts/`                   | Agent Witch install bundle, DB migrate, e2e helpers                                  |
| `server.ts`                  | Custom HTTP + WebSocket entry (see [system map](system-map.md))                      |
| `.cursor/`                   | Agent harness: rules, commands, skills, bootstrap manifest                           |
| `.agents/`                   | Verification scripts, diagrams, scaffold (non-runtime)                               |

Import boundaries are enforced by `npm run cursor:architecture` (see `.agents/scripts/lib/srcLayerImportRules.ts`).

## Feature registry

Canonical product modules: **`src/features/_registry/features.registry.json`**.

Each entry includes:

| Field         | Meaning                                            |
| ------------- | -------------------------------------------------- |
| `featurePath` | UI and feature docs under `src/features/`          |
| `libPath`     | Optional server code under `src/lib/`              |
| `routePaths`  | Pages under `src/app/`                             |
| `apiPaths`    | API prefixes under `src/app/api/`                  |
| `dependsOn`   | Other feature slugs (documentation / mental model) |

Loader: `src/features/_registry/features.registry.ts`. When adding a feature, update the JSON, run `npm run feature-knowledge:scaffold-docs`, then document in the feature folder.

## Intentional split (ADR 0003)

- **UI** lives in `src/features/<slug>/`.
- **HTTP wiring** stays in `src/app/` (Next.js convention).
- **Shared server logic** lives in `src/lib/<area>/` when `libPath` is set.

Do not move API handlers into `src/features/` without an explicit architectural change and ADR update.

## Target: Fractal Slice Architecture (ADR 0007, Proposed)

Incremental migration to `public-api/` + `internal/` per slug; cross-feature effects via `src/hubs/` when introduced. Policy and agent playbooks: [ADR 0007](../adr/0007-fractal-slice-architecture.md), [fsa-workflows.md](../conventions/fsa-workflows.md). Detailed tree: [fractal-slice-architecture.md](fractal-slice-architecture.md) (draft).

## Product features (slugs)

| Slug                        | Title                | Primary routes                       |
| --------------------------- | -------------------- | ------------------------------------ |
| `home`                      | Home dashboard       | `/`                                  |
| `agent`                     | Task composer        | `/agent`, `/ws-test`                 |
| `agent-witch`               | Mac bridge           | install, `/api/agent-witch`          |
| `dispatch`                  | Dispatch & approvals | `/api/dispatch`, `/api/agent-runs`   |
| `capabilities`              | Capabilities         | `/api/capabilities`                  |
| `workflows`                 | Workflow builder     | (via capabilities)                   |
| `library`                   | Library              | `/library`                           |
| `harness`                   | Harness catalog      | `/api/harness`, harness catalog APIs |
| `marketplace`               | Marketplace          | `/marketplace`                       |
| `reports`                   | Reports              | `/reports`                           |
| `feedback` / `improvements` | Feedback loop        | capability APIs                      |
| `admin`                     | Admin                | `/admin/*`                           |
| `auth`                      | Authentication       | `/login`, `/api/auth`                |
| `shell`                     | App shell            | (layout)                             |
| `marketing` / `showcases`   | Public content       | `/`, `/showcases`                    |
| `styleguide`                | TailAdmin catalog    | `/styleguide`                        |

Per-feature docs: `src/features/<slug>/README.md`. Query before large edits:

```bash
npm run feature-knowledge:query -- "your topic" --feature=<slug>
```

Full registry JSON is the source of truth for paths and APIs.
