# FSA refactoring plan

**Status:** Working plan (not an ADR).  
**Policy:** [ADR 0007](../adr/0007-fractal-slice-architecture.md) · **Playbooks:** [fsa-workflows.md](../conventions/fsa-workflows.md) · **Target detail:** [fractal-slice-architecture.md](fractal-slice-architecture.md) (draft).

## Goal

Move from **horizontal** layout (UI in `src/features/`, server in `src/lib/`, thin routes in `src/app/`) to **vertical fractal slices** (`public-api/` + `internal/` per slug), without breaking Next.js App Router or Agent Witch `server.ts`.

**Current FSA progress:** No slug has `public-api/` yet. Registry `migrationStatus: "migrated"` means **ADR 0003** feature-folder migration only.

---

## 0. Deployables (AWC, AWL, AWB, AWI)

Four apps share the repo; each gets its own `apps/<slug>/features/` tree over time (not one global `src/features/` for Mac code).

| Abbr    | Name                | Target folder   | Today (main paths)                                       |
| ------- | ------------------- | --------------- | -------------------------------------------------------- |
| **AWC** | Agent Witch Console | `apps/console/` | `src/app/`, `server.ts`, `src/features/`, `src/lib/`     |
| **AWL** | Agent Witch Live    | `apps/live/`    | `scripts/agentWitchLocalApp*` (`:43347`)                 |
| **AWB** | Agent Witch Bridge  | `apps/bridge/`  | `scripts/agent-witch-wake-server.ts` (`47892` / `47893`) |
| **AWI** | Agent Witch Install | `apps/install/` | `public/install/agent-witch/`, `scripts/agent-witch.ts`  |

Cross-app contracts: `packages/shared/`. Canonical doc: [agent-witch-deployables.md](../product/agent-witch-deployables.md) · registry: `apps/deployables.registry.json`.

**AWC** feature slugs in §1 remain the cloud product modules. **AWL / AWB / AWI** migrations are separate PR tracks after console FSA patterns exist.

**AWI track (started):** scaffold + boundary tests under `apps/install/` — see [awi-fsa-plan.md](awi-fsa-plan.md) and `apps/install/features.registry.json`. No big-bang move of `scripts/agent-witch.ts` or `src/lib/agentWitch/` yet.

---

## 1. Top-level features (inventory)

### 1a. Registry slugs (`features.registry.json`)

Canonical list — 22 entries. Grouped by product area.

| Slug                       | Title                    | `featurePath`                         | `libPath`                  | Primary surfaces                     |
| -------------------------- | ------------------------ | ------------------------------------- | -------------------------- | ------------------------------------ |
| **Platform & shell**       |
| `shell`                    | App shell                | `src/features/shell`                  | —                          | Layout chrome, nav, badges           |
| `auth`                     | Authentication           | `src/features/auth`                   | `src/lib/auth`             | `/login`, `/api/auth`                |
| `admin`                    | Admin                    | `src/features/admin`                  | `src/lib/admin`            | `/admin/*`, `/api/admin`             |
| **Mac & runs**             |
| `agent-witch`              | Agent Witch bridge       | `src/features/agent-witch`            | `src/lib/agentWitch`       | Install, WS, `/api/agent-witch`      |
| `mac-devices`              | Mac devices UI           | `src/features/agent-witch/macDevices` | —                          | Nested under agent-witch             |
| `agent`                    | Task composer            | `src/features/agent`                  | —                          | `/agent`, `/ws-test`, agent-runs API |
| `dispatch`                 | Dispatch & approvals     | `src/features/dispatch`               | `src/lib/dispatch`         | `/api/dispatch`, agent-runs          |
| `reports`                  | Reports                  | `src/features/reports`                | —                          | `/reports`, run history              |
| **Capabilities & content** |
| `capabilities`             | Capabilities & offerings | `src/features/capabilities`           | `src/lib/capabilities`     | `/api/capabilities`                  |
| `workflows`                | Workflow builder         | `src/features/workflows`              | `src/lib/workflows`        | Dynamic task fields                  |
| `library`                  | Library                  | `src/features/library`                | `src/lib/library`          | `/library`                           |
| `harness`                  | Harness catalog          | `src/features/harness`                | `src/lib/harness`          | `/api/harness`, catalog              |
| `marketplace`              | Marketplace              | `src/features/marketplace`            | `src/lib/harness` (shared) | `/marketplace`                       |
| **Feedback loop**          |
| `feedback`                 | Feedback                 | `src/features/feedback`               | `src/lib/feedback`         | Capability feedback APIs             |
| `improvements`             | Improvements             | `src/features/improvements`           | `src/lib/improvements`     | AI improvement suggestions           |
| **Growth & marketing**     |
| `home`                     | Home dashboard           | `src/features/home`                   | —                          | `/` (authenticated hub)              |
| `marketing`                | Marketing                | `src/features/marketing`              | —                          | Landing, public CTAs                 |
| `showcases`                | Showcases                | `src/features/showcases`              | —                          | `/showcases` (SEO articles)          |
| **Dev / design**           |
| `styleguide`               | Styleguide               | `src/features/styleguide`             | —                          | `/styleguide`                        |

**Dependency hotspots (from `dependsOn`):** `auth` → `dispatch` → `agent` / `agent-witch` → `capabilities` / `workflows` → `library` / `harness` / `marketplace`; `shell` and `home` sit on top of many edges.

### 1b. Top-level folders under `src/features/` (filesystem)

| Folder                | In registry? | Notes                                                                               |
| --------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `_registry`           | meta         | `features.registry.json`, layout docs — not a product slice                         |
| `admin` … `workflows` | yes          | See table above                                                                     |
| `automations`         | **no**       | Webhook/automation UI — align with registry or merge into `harness` / new slug      |
| `empty-states`        | **no**       | Shared empty-state components — candidate for `src/components/` or owned by `shell` |
| `pages`               | **no**       | Shared page layouts (`ReportsPageLayout`, etc.) — split owners per route feature    |

### 1c. Shared server modules (`src/lib/`)

Not features, but **migration sources** for `internal/infrastructure/`:

`admin`, `agentWitch`, `auth`, `automations`, `capabilities`, `dispatch`, `feedback`, `harness`, `improvements`, `library`, `marketplace`, `workflows`, plus cross-cutting: `db`, `email`, `analytics`, `featureKnowledge`, `cursorCloud`, `onboarding`, `projects`, `release`, `shell`, `time`, `client`, `copy`, `app`, `e2e`.

Rule: move code into a slice only when **one slug owns** it; keep 3+ consumers in `src/lib/` until a shared-root ADR exists.

### 1d. Orchestration (unchanged by FSA)

| Layer                      | Path                         |
| -------------------------- | ---------------------------- |
| App Router                 | `src/app/`                   |
| WebSocket entry            | `server.ts`                  |
| Shared UI kit              | `src/components/`            |
| Global hooks/context       | `src/hooks/`, `src/context/` |
| Integration hubs (planned) | `src/hubs/`                  |

---

## 2. Refactoring principles (per slug)

One PR per slug by default (`command-fsa-migrate-feature.md`):

1. Add `public-api/{presentation,infrastructure,types}.ts` and `internal/{presentation,core,infrastructure}/`.
2. Move feature-owned code from flat `hooks/`, `utils/`, and matching `libPath` into `internal/`.
3. Re-export only through `public-api/*`; update `src/app/` imports.
4. Fix cross-feature imports to use **other** slugs’ `public-api` only.
5. `npm run build` + harness verify; update registry `libPath` / add `fsaStatus` when done.

Do **not** move `route.ts` / `page.tsx` out of `src/app/`.

---

## 3. Phased roadmap

### Phase 0 — Tooling & registry hygiene (1–2 PRs)

- [ ] Extend `features.registry.json` with `fsaStatus`: `legacy` \| `in-progress` \| `fsa` (separate from ADR 0003 `migrationStatus`).
- [ ] Register or relocate `automations`, `empty-states`, `pages` (decision table in §4).
- [ ] Allow `.cursor/` and `.agents/scripts/cursor-hooks/` in `structure-validation.config.json` (clean pre-commit on harness changes).
- [ ] Flesh out [fractal-slice-architecture.md](fractal-slice-architecture.md): export map template per slug.
- [ ] Add architecture rule IDs for `public-api` / cross-feature `internal/` imports.

### Phase 1 — Leaf slices (low coupling, good templates)

Migrate first; each becomes a **reference implementation** for the team/agents.

| Order | Slug           | Rationale                         |
| ----- | -------------- | --------------------------------- |
| 1     | `styleguide`   | Dev-only, few cross-imports       |
| 2     | `feedback`     | Narrow API + UI                   |
| 3     | `improvements` | Pairs with feedback               |
| 4     | `reports`      | Mostly UI + agent-runs read paths |

### Phase 2 — Platform shell

| Order | Slug                      | Rationale                                        |
| ----- | ------------------------- | ------------------------------------------------ |
| 5     | `shell`                   | Many dependents; stabilize nav/API surface early |
| 6     | `auth`                    | Gates most routes                                |
| 7     | `marketing` + `showcases` | Public bundle; keep client/server split strict   |
| 8     | `home`                    | Composes shell + agent + marketing               |

### Phase 3 — Core product loop

| Order | Slug                          | Rationale                                         |
| ----- | ----------------------------- | ------------------------------------------------- |
| 9     | `capabilities`                | Hub for offerings                                 |
| 10    | `workflows`                   | Tied to capabilities                              |
| 11    | `library`                     | Depends on workflows/capabilities                 |
| 12    | `harness` + `marketplace`     | Split shared `src/lib/harness` carefully          |
| 13    | `agent`                       | Composer UI                                       |
| 14    | `dispatch`                    | Queue + approvals                                 |
| 15    | `agent-witch` + `mac-devices` | Largest `libPath` (`agentWitch`); do last in loop |

### Phase 4 — Admin & automation

| Order | Slug                           | Rationale                            |
| ----- | ------------------------------ | ------------------------------------ |
| 16    | `admin`                        | Policy surfaces                      |
| 17    | `automations` (after registry) | Webhooks; may need hub with dispatch |

### Phase 5 — Hubs (cross-cutting commands/queries)

Introduce only when **two or more** slices need the same side effect with traceability:

| Hub (proposed)  | Concerns                   | Consumers                      |
| --------------- | -------------------------- | ------------------------------ |
| `AgentRuns`     | Run lifecycle, status, SSE | `agent`, `dispatch`, `reports` |
| `Dispatch`      | Approvals, targets         | `dispatch`, `admin`, `shell`   |
| `Notifications` | Toasts, inbox              | `shell`, `feedback`            |

Location: `src/hubs/<Name>/` (already in structure-validation). Hubs **never** import feature `internal/`.

---

## 4. Registry gaps (decisions needed)

| Folder         | Options                                           | Recommendation                                                                             |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `automations`  | New slug vs part of `harness`                     | **New slug** `automations` if webhooks are product-first; link `lib/automations`           |
| `empty-states` | `src/components/empty-states` vs `shell/internal` | **Shared components** if 3+ features use; else owner = `shell`                             |
| `pages`        | Split per feature vs `shell` layouts              | **Split**: move `ReportsPageLayout` → `reports/internal`, etc.; delete `pages/` when empty |

---

## 5. Verification per migration PR

**During refactor-only work (no behavior change):** prefer tiered gates — [refactoring-safety-tests.md](../development/refactoring-safety-tests.md).

```bash
npm run test:refactor-gate    # standard: Agent Witch unit scope + validate:changes + architecture
npm run test:safety:full      # before merge (CI parity)
```

**Default feature PR:**

```bash
npm run harness:bootstrap -- --workflow=verify
npm run validate:staged
npm run cursor:architecture -- --staged
npm run build
```

Cursor hooks already run architecture on write and structure on agent stop; Husky remains commit gate.

---

## 6. Success metrics

- Every registry slug has `fsaStatus: fsa` and documented `public-api` exports.
- Zero imports matching `@/features/*/internal/` from outside that slug (enforced in `architecture-check.ts`).
- `libPath` null or removed for slices that absorbed their server code.
- Hub catalog documented in [fractal-slice-architecture.md](fractal-slice-architecture.md).

---

## 7. Out of scope (this initiative)

- Rewriting TailAdmin in `src/components/`.
- Splitting `server.ts` beyond documented WS bridge (ADR 0002).
- CHECK24 / EnergyCenter patterns or new global `src/shared/` without ADR.
- Big-bang rename of `src/lib/agentWitch` → feature folder in one PR.

---

## Related commands

- New slice: `@.cursor/commands/command-fsa-implement-feature.md`
- Migrate one slug: `@.cursor/commands/command-fsa-migrate-feature.md`
- Query context: `npm run feature-knowledge:query -- "FSA <slug>" --feature=<slug>`
