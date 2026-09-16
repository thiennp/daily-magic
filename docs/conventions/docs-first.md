# Docs-first maintenance

Treat markdown under `docs/` and feature folders as the **canonical map**. Code should match docs; when behavior changes, update docs in the **same PR** as the code (or immediately before merge).

## Decision flow

1. **Is it a lasting architectural choice?** → Add or update an [ADR](../adr/README.md) and link from the feature or `docs/architecture/` doc.
2. **Is it product vocabulary or nav?** → [product/concepts.md](../product/concepts.md) or [product/ux-simplification.md](../product/ux-simplification.md).
3. **Is it how to run, test, or deploy?** → [development/](../development/).
4. **Is it feature behavior, APIs, or known bugs?** → That feature’s `README.md`, `KNOWN_ISSUES.md`, and optionally `AGENTS.md` under `src/features/<slug>/`.
5. **Is it a new product feature?** → `src/features/_registry/features.registry.json`, scaffold docs, then index.

## Checklist by change type

| Change                                     | Update                                                                                                                                                               |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| New or renamed route/API                   | Registry JSON + feature `README.md`; architecture map if user-facing route table changes                                                                             |
| Agent Witch bridge, WS, presence, dispatch | ADR or `KNOWN_ISSUES.md`; [agent-witch/local-bridge.md](../agent-witch/local-bridge.md) for install/runtime                                                          |
| Deploy / hosting / env                     | [development/deployment.md](../development/deployment.md), ADR 0006                                                                                                  |
| Security boundary                          | [security/threat-model.md](../security/threat-model.md)                                                                                                              |
| Bug fix with recurrence risk               | Row in feature `KNOWN_ISSUES.md` + regression test                                                                                                                   |
| New harness rule for agents                | `.cursor/rules/` or command under `.cursor/commands/` — only if automation needs it; summarize in [agent-context.md](agent-context.md) if it affects context loading |

## Index for agents and RAG

After any markdown change under `docs/` or `src/features/*/README.md` (and `AGENTS.md`, `KNOWN_ISSUES.md`):

```bash
npm run feature-knowledge:index
```

Commit `.feature-knowledge/index.json` with the branch (required by project rules).

## Keep root entrypoints thin

- **[README.md](../../README.md)** — product pitch + links into `docs/`.
- **[AGENTS.md](../../AGENTS.md)** / **[CLAUDE.md](../../CLAUDE.md)** — pointers and environment caveats; deep content stays in `docs/` and feature folders.

Do not duplicate long technical sections in README or AGENTS.md; link instead.
