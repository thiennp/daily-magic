# How to load context (humans and AI)

**Goal:** build enough mental model to work safely, using the **fewest** documents and **targeted** commands. Model: [progressive-disclosure.md](progressive-disclosure.md) (L0→L4). Scripts: [script-index.md](script-index.md) · harness map: [agent-context.md](agent-context.md).

## Learn by running (not read-only)

After picking a task path below, use the **script index** to confirm behavior: e.g. `npm run feature-knowledge:query`, `npm run harness:bootstrap -- --match="…"`, `npm run dev` + `curl` health URLs, or `npm run test` for the area you changed. See [script-index.md](script-index.md) § Learn by running — do not paste full logs into docs or PRs.

## Always (≈30 seconds)

1. [AGENTS.md](../../AGENTS.md) — product name, harness, Cloud VM database caveat.
2. Pick a **task path** below (or a [domain entry](../domains/README.md)).

Optional: `npm run harness:bootstrap -- --match="<short task description>"` for a matched command playbook.

## Task paths — minimal doc sets

### Bugfix (something broken in one area)

| Step | Read                                                                                                  |
| ---- | ----------------------------------------------------------------------------------------------------- |
| 1    | `npm run feature-knowledge:query -- "<symptom>" --feature=<slug>`                                     |
| 2    | `src/features/<slug>/KNOWN_ISSUES.md` then `README.md`                                                |
| 3    | Domain entry if slug unclear → [domains/README.md](../domains/README.md)                              |
| 4    | L3 only if constraint-related: matching [ADR](../adr/README.md) or `docs/agent-witch/local-bridge.md` |

**Then** code in `src/features/<slug>/`, `entry.libPath` from registry, and `src/app/api/…`.

**After fix:** row in `KNOWN_ISSUES.md`, regression test, `npm run feature-knowledge:index`.

---

### New or changed product feature

| Step | Read                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------- |
| 1    | [domains/README.md](../domains/README.md) → relevant **domain entry**                                         |
| 2    | [product/concepts.md](../product/concepts.md) if UI copy or nouns overlap                                     |
| 3    | `src/features/_registry/features.registry.json` + target `README.md`                                          |
| 4    | [codebase-map.md](../architecture/codebase-map.md) if adding routes/APIs/lib                                  |
| 5    | [ADR 0007](../adr/0007-fractal-slice-architecture.md) + [fsa-workflows.md](fsa-workflows.md) for slice layout |
| 6    | `@.cursor/commands/command-fsa-implement-feature.md` when scaffolding FSA                                     |
| 7    | [docs-first.md](docs-first.md) checklist before PR                                                            |

**Then** implement; run `npm run harness:bootstrap -- --workflow=verify`.

---

### Refactor (structure, imports, no intended behavior change)

| Step | Read                                                                                                                 |
| ---- | -------------------------------------------------------------------------------------------------------------------- |
| 1    | [codebase-map.md](../architecture/codebase-map.md) + [ADR 0003](../adr/0003-feature-ui-with-server-lib.md)           |
| 2    | [ADR 0007](../adr/0007-fractal-slice-architecture.md) + [fsa-workflows.md](fsa-workflows.md) if restructuring a slug |
| 3    | `@.cursor/commands/command-fsa-migrate-feature.md` for FSA migration                                                 |
| 4    | `.agents/diagrams/application-architecture.md` (import rules summary)                                                |
| 5    | Feature `README.md` only for touched slugs                                                                           |

**Then** code; `npm run cursor:architecture -- --staged`, `validate:staged`. Do **not** load product/UX docs unless behavior changes.

---

### Deploy / production / hosting

| Step | Read                                                                                                                        |
| ---- | --------------------------------------------------------------------------------------------------------------------------- |
| 1    | [domains/development.md](../domains/development.md)                                                                         |
| 2    | [development/deployment.md](../development/deployment.md)                                                                   |
| 3    | [ADR 0006](../adr/0006-production-hosting-and-neon.md) + [ADR 0002](../adr/0002-custom-server-for-agent-witch-websocket.md) |
| 4    | [product/repo-name-and-hosting.md](../product/repo-name-and-hosting.md)                                                     |

**Read next if…** Mac online/dispatch issues → [domains/agent-witch.md](../domains/agent-witch.md) + ADR 0005.

---

### Understand architecture (onboarding, design review)

| Step | Read                                                                                                   |
| ---- | ------------------------------------------------------------------------------------------------------ |
| 1    | [overview.md](../overview.md)                                                                          |
| 2    | [domains/architecture.md](../domains/architecture.md)                                                  |
| 3    | [system-map.md](../architecture/system-map.md) then [codebase-map.md](../architecture/codebase-map.md) |
| 4    | [adr/README.md](../adr/README.md) — scan table, open 1–2 ADRs as needed                                |

**Stop** unless you own a domain — then read that [domain entry](../domains/README.md) only.

---

## When to use feature-knowledge instead of browsing

| Situation                 | Command                                                            |
| ------------------------- | ------------------------------------------------------------------ |
| Know the feature slug     | `npm run feature-knowledge:query -- "question" --feature=dispatch` |
| Cross-cutting / docs only | `npm run feature-knowledge:query -- "question" --feature=docs`     |
| Unsure of slug            | Query without `--feature`, then open top `sourcePath` hits         |

## Maintaining the reveal layers

When you change behavior, update docs **at the layer agents read first**:

| Change                           | Update first                                                 |
| -------------------------------- | ------------------------------------------------------------ |
| Feature behavior, routes, APIs   | L2 `README.md` (+ `KNOWN_ISSUES` for bugs)                   |
| Whole area scope or dependencies | L1 matching `docs/domains/*.md`                              |
| Hosting, WS, dispatch policy     | L3 + ADR                                                     |
| New domain or feature slug       | L0 [domains/README.md](../domains/README.md) + registry JSON |

Full checklist: [docs-first.md](docs-first.md). Re-index: `npm run feature-knowledge:index`.
