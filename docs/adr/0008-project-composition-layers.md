# ADR 0008: Project composition — catalog, binding, materialization layers

## Status

Proposed

## Context

UX v2 for Projects ([projects-view-wireframes-v2.md](../product/projects-view-wireframes-v2.md)) asks AWC to render a project's composition read-only — counts on the list, named items with versions on the detail page, while the owning Mac may be **offline** and the viewer may be on a **phone** — and asks AWL to be the only editor, with `Installed` / `+ Create new` / `Pull into repo` for each of Harness, Workflows, and Agents.

The current implementation cannot serve that contract, and the reasons are structural rather than incidental. An audit (full detail in [docs/architecture/project-composition.md](../architecture/project-composition.md)) found:

- **Composition lives only in the repo.** `<repo>/.agent-witch/project.json` holds `harnessSetSlugs: string[]`, written by `applyInstalledHarnessSetsToProjectCursor`. `user_projects` has no compositional column, and no project↔capability relation exists, so Workflows and Agents have nowhere to be installed at all. AWC cannot compute a count, offline or online.
- **The key is a per-owner slug.** Harness identity is `(owner_user_id, set_slug)` (`harness_set_sharing`, `harness_catalog_snapshots`), but the repo stores bare slugs, and `published_capabilities.harness_set_slug` / `capability_versions.harness_set_slug` are unconstrained text. The same string resolves to different bytes for different users, undetectably.
- **Materialization has no ledger.** The apply path copies files into `<repo>/.cursor/` and records only slugs, so `[ Remove ]` and `[ Update ]` have no implementation path, and hand-authored `.cursor` files are overwritten with no diff and no backup. Destination paths are derived by slugifying item titles after the `shared/items/<itemId>/` prefix is stripped, so items from different sets collide silently — last write wins.
- **There is no content identity.** Manifest items carry no hash and no version; each submit overwrites `shared/items/<itemId>/…` in place, so "update available" has nothing to compare and two sets sharing an item alias the same file.
- **Dispatch binds to a path string.** The payload carries `projectFolderPath`; `resolveRunProjectFolderPath` falls back to a default folder, and `ensureAgentWitchProjectFolder` calls `mkdirSync(..., { recursive: true })`, so a path from another Mac silently creates an empty directory and runs there.
- **`agent_runs` has no `project_id`** (only `agent_automations` does, migration 022), so no run is attributable to a project and knowledge cannot roll forward through the cloud.
- **Knowledge is keyed by folder path** (`<repo>/.agent-witch/rag`, `…/memory`), so `[ Change folder ]` orphans it; a folderless run falls back to the install-wide chunk file and reads another project's knowledge; and memory injection is recency-based regardless of run outcome.

## Decision

Model project composition as six layers, each with exactly one authority, with dependencies pointing in one direction only.

| Layer             | Authority                        | Owns                                                       |
| ----------------- | -------------------------------- | ---------------------------------------------------------- |
| 1 Catalog         | Cloud                            | Components and immutable versions; content-addressed items |
| 2 Installation    | Device profile (mirrored cloud)  | Which component versions a Mac holds                       |
| 3 Binding         | Cloud, written only by AWL       | What a project declares                                    |
| 4 Materialization | Disk, with a ledger              | What is actually written into a repo or a run overlay      |
| 5 Runtime         | Cloud snapshot, device execution | What a specific run used                                   |
| 6 Knowledge       | Device, promotion-gated          | What was learned and what graduates to the catalog         |

### Binding decisions

1. **One catalog for three kinds.** `components(kind IN ('harness','workflow','agent'))` with immutable `component_versions` and `component_version_items` addressed by `content_blobs.sha256`. `harness_set_slug` is deprecated in favor of version ids. Workflow fields and operator steps move into `component_versions.spec` so they version with content.
2. **Composition is a cloud row, not a repo file.** `project_components(project_id, component_id, pinned_version_id, channel, enabled, materialize_target)` is authoritative. AWL is the only writer; AWC reads it. `harnessSetSlugs` is removed from `project.json`, which retains identity only.
3. **Binding does not require a folder.** A project may declare composition before a folder exists; only materialization needs a path.
4. **Folder path is device truth.** It moves from `user_projects.folder_path` to `project_device_bindings(project_id, device_id, folder_path, folder_verified_at, is_primary)`; the cloud copy is an advisory mirror shown as unverified when stale. `user_projects.folder_path` becomes nullable and the `UNIQUE (owner_user_id, lower(name))` index is replaced by `UNIQUE (owner_user_id, device_id, lower(name))`.
5. **No write without a ledger entry.** `<repo>/.agent-witch/materialization.json` maps each destination path to `{ componentId, versionId, sha256, mode, writtenAt, backupPath? }`. Destinations are namespaced by component slug (`.cursor/rules/<componentSlug>/<stem>.mdc`). Pre-write hashing classifies existing files as unchanged, updatable, or user content; user content is backed up to `.agent-witch/backups/<timestamp>/` before being displaced.
6. **Pull into project and pull into task are different operations.** Pull into project creates a binding and writes ledgered files into the repo. Pull into task writes nothing to the repo and nothing to the composition: components are materialized to `~/.agent-witch/runs/<runId>/overlay/` and recorded in the run's snapshot with `scope: 'run'`. The AWC composer may only pull into task; AWL's `Pull into repo` is pull into project; automations may not use run-scoped components. A run report offers `[ Keep in project ]`, which binds the exact version the run used.
7. **Dispatch names a project, not a path.** The payload carries `projectId` (authoritative) plus `folderPathHint` (advisory). The Mac resolves the folder from its own registry; an unknown `projectId` fails the run instead of falling back to a default folder.
8. **Runs record their composition.** `agent_runs.project_id` and `agent_runs.composition_snapshot_id` are added; `project_composition_snapshots` stores the immutable resolved `(componentId, versionId, sha256)` set plus a digest.
9. **Knowledge is keyed by `projectId`** under `~/.agent-witch/projects/<projectId>/knowledge/`, not by folder path. The install-wide RAG fallback is removed. Capture is outcome-aware, distilled, and redacted; retrieval is bounded and compacted.
10. **Promotion is the only path from local knowledge to shared content.** `project_knowledge_items` holds candidates with `body = NULL` in the cloud until a user explicitly promotes, which publishes a new component version.

### Rollout

Eight independently revertible phases (detail and exit criteria in the architecture doc): P0 run identity · P1 materialization ledger · P2 content identity in the device store · P3 catalog unification · P4 binding table and AWC read-only detail · P5 snapshots and run-scoped pull · P6 knowledge re-keying and roll-forward · P7 removal of the old shape. P0 and P1 may run in parallel; P2 precedes P3; P4 depends on P3; P5 on P4; P6 on P0.

## Consequences

- AWC can render composition while the Mac is offline, which the previous shape made impossible; `Remove`, `Update`, and version labels become straightforward diffs.
- `published_capabilities` survives as a read view through P3–P6 rather than being renamed in one step; two names for one concept is accepted debt.
- The apply path gains a hashing and backup step, so materialization is slower and can report conflicts instead of silently succeeding.
- Existing repos keep files that predate the ledger. P1 adopts files whose content matches known harness bytes and reports the rest rather than deleting them.
- `project_device_bindings` allows several devices per project even though UX v2 exposes one primary; the extra row is cheaper than retrofitting multi-device later.
- Knowledge stops accumulating inside repos, which removes the current risk of committing embeddings and transcripts; a `.gitignore` is written for the transition period.

## References

- [docs/architecture/project-composition.md](../architecture/project-composition.md) — critique, ER model, cloud/disk split, phase plan, sign-off
- [docs/product/projects-view-wireframes-v2.md](../product/projects-view-wireframes-v2.md) — the UX contract this serves
- `apps/live/features/harness/internal/core/applyInstalledHarnessSetsToProjectCursor.ts`, `planHarnessInstallBundle.ts`, `resolveHarnessManifestItemCursorRelativePath.ts`
- `apps/live/features/projects/internal/core/ensureAgentWitchProjectFolder.ts`, `resolveAgentWitchProjectStorageLayout.ts`
- `apps/install/features/runtime-client/internal/core/resolveRunProjectFolderPath.ts`
- `db/migrations/021-user-projects.sql`, `db/migrations/022-agent-automations-project-id.sql`, `db/schema.sql`
- ADR 0005 (dispatch outbox), ADR 0007 (fractal slice architecture)
