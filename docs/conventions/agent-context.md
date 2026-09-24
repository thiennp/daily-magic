# Agent context and script map

How coding agents (Cursor, Claude, Codex, etc.) should **reveal** system knowledge without loading the whole repo.

**Start here for task paths:** [load-context.md](load-context.md). **Layers L0–L4:** [progressive-disclosure.md](progressive-disclosure.md). **Domains:** [domains/README.md](../domains/README.md). **All npm scripts (observe system):** [script-index.md](script-index.md).

## Recommended reveal order (token-efficient)

Use the **smallest** source that answers the question; stop when you have enough to edit safely.

| Step | Layer   | Source                                                                                         | When                                                                                                         |
| ---- | ------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| 1    | —       | [AGENTS.md](../../AGENTS.md)                                                                   | Every task — product name, harness paths, Cloud VM DB caveats                                                |
| 2    | L0/L1   | [load-context.md](load-context.md) or one [domain entry](../domains/README.md)                 | Match task type; do not read all domains                                                                     |
| 3    | —       | `npm run harness:bootstrap -- --match="…"`                                                     | Matched command playbook / workflow (`verify`, `commit`, `pr`)                                               |
| 4    | L2      | `feature-knowledge:query` then `src/features/<slug>/README.md`, `KNOWN_ISSUES.md`              | Before substantive feature edits                                                                             |
| 4b   | Guides  | `docs/guides/` chapter from [guide-maintenance.map.json](../guides/guide-maintenance.map.json) | Before Agent Witch bridge, dispatch, workflows, harness edits                                                |
| 4c   | Product | [product/product-pillars.md](../product/product-pillars.md)                                    | Before user-visible product behavior, copy, or pillar features (`feedback`, `improvements`, memory, sharing) |
| 5    | L3      | Linked deep dive or ADR from domain “read next if…”                                            | Only when L1/L2 point here                                                                                   |
| 6    | L4      | Source under `src/app`, `src/lib`, `server.ts`                                                 | Implementation after orientation                                                                             |
| —    | Observe | One command from [script-index.md](script-index.md)                                            | Confirm docs; e.g. `feature-knowledge:query`, `dev` + health `curl`, `test`                                  |

**Slug** for cross-cutting docs in feature-knowledge is `docs` (all markdown under `docs/` is indexed). Example:

```bash
npm run feature-knowledge:query -- "Railway WebSocket production" --feature=docs
npm run feature-knowledge:query -- "dispatch approvals queue" --feature=dispatch
```

Path-scoped Cursor rules load from `.cursor.json` when you touch matching paths — no extra step.

## What gets indexed

| Location          | Files indexed                                                                                |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `docs/**/*.md`    | All markdown (chunked by heading → `.feature-knowledge/index.json`)                          |
| `docs/qa/*.md`    | **System Q&A** — answer “how it works” from here before code (see `rules-system-qa-rag.mdc`) |
| `src/features/*/` | `README.md`, `AGENTS.md`, `KNOWN_ISSUES.md` per feature folder                               |

Rebuild after edits: `npm run feature-knowledge:index`. Scaffold missing feature docs from registry: `npm run feature-knowledge:scaffold-docs`.

## npm scripts

Canonical grouped index (what each command reveals, observe-by-task table, macOS notes): **[script-index.md](script-index.md)**. Quick verify workflow: `npm run harness:bootstrap -- --workflow=verify`.

## Harness files (static context)

| Path                                            | Role                                                                                                         |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `.cursor/harness/agent-bootstrap.manifest.json` | Command + workflow routing                                                                                   |
| `.cursor/rules/*.mdc`                           | Always-on or path-scoped invariants                                                                          |
| `.cursor/commands/`                             | Step-by-step playbooks (verify, commit, PR)                                                                  |
| `.cursor/skills/`                               | Optional SOPs referenced by rules                                                                            |
| `.agents/scripts/`                              | Harness, verify, feature-knowledge, structure (see [.agents/README.md](../../.agents/README.md) → `npm run`) |
| `.agents/diagrams/`                             | Supplementary architecture notes                                                                             |
| [AGENTS.md](../../AGENTS.md)                    | Canonical entry; harness paths + context-loading summary                                                     |

## Anti-patterns

- Reading entire `src/features/` or `src/lib/` trees before querying feature knowledge.
- Duplicating ADR or `docs/` content into chat — link and query instead.
- Skipping `feature-knowledge:index` after doc edits on a PR branch.
- Using injected Cloud `DATABASE_URL` without sourcing `.env.local` — see AGENTS.md (VM only).
