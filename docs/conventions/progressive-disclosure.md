# Progressive disclosure (documentation layers)

Documentation is stacked so you **stop reading** once your task is oriented. Do not walk the full `docs/` tree for a narrow change.

## Four layers

| Layer                 | What it is                                          | Typical size | Where                                                                     |
| --------------------- | --------------------------------------------------- | ------------ | ------------------------------------------------------------------------- |
| **L0 — Index**        | Where am I? What domains exist?                     | 1 screen     | [docs/README.md](../README.md), [domains/README.md](../domains/README.md) |
| **L1 — Domain entry** | One product area: scope, key slugs, “read next if…” | 1–2 min read | [docs/domains/*.md](../domains/README.md)                                 |
| **L2 — Module brief** | One feature slug: routes, APIs, dependencies        | 1 min        | `src/features/<slug>/README.md`, `KNOWN_ISSUES.md`                        |
| **L3 — Deep dive**    | Runbooks, ADRs, threat model, long guides           | As needed    | `docs/development/*`, `docs/adr/*`, `docs/agent-witch/*`, etc.            |

**Code is L4** — open only after L0–L3 (or `feature-knowledge:query`) point you at the right folders.

**Observation (parallel, not a layer):** runnable scripts confirm what docs claim — [script-index.md](script-index.md). Run the smallest command that answers your question (health `curl`, `feature-knowledge:query`, focused `test`), without archiving logs in markdown.

## Rules

1. **Descend one layer at a time** — domain entry before ADRs; module brief before `src/lib/`.
2. **Prefer query over browse** — `npm run feature-knowledge:query -- "…" [--feature=<slug>]` jumps to relevant chunks (indexed L1–L3 markdown).
3. **Stable summaries live at L1/L2** — when behavior changes, update the **lowest layer that still tells the truth** (usually L2 for feature behavior, L1 for cross-cutting domain, L3/ADR for constraints).
4. **Entry files stay thin** — [AGENTS.md](../../AGENTS.md), [CLAUDE.md](../../CLAUDE.md), root [README.md](../../README.md) link here; they do not duplicate L1–L3 body text.

## Layer diagram

```text
L0  docs/README.md ──► docs/domains/README.md
         │
L1  docs/domains/<area>.md  ("read next if…")
         │
L2  src/features/<slug>/README.md (+ KNOWN_ISSUES)
         │
L3  docs/development/*, docs/adr/*, feature deep pages
         │
L4  src/app, src/lib, server.ts, scripts/
```

See [load-context.md](load-context.md) for **task-specific** minimal paths (bugfix, feature, refactor, deploy, architecture).
