# Documentation — Agent Witch (daily-magic)

**[Overview](overview.md)** — what the product is and where to go next.

This tree is the **primary map** of the system; `src/` is the implementation. Markdown here and under `src/features/*/README.md` is indexed for agents via `npm run feature-knowledge:query`.

## Architecture

- [Architecture index](architecture/README.md)
- [System map](architecture/system-map.md) — browser, `server.ts`, Mac bridge, Neon
- [Codebase map](architecture/codebase-map.md) — `src/` layers and feature registry
- [ADRs](adr/README.md) — recorded decisions (WebSocket, hosting, dispatch)

## Development

- [Local setup](development/setup.md)
- [Deploy to production + Neon](development/deployment.md)
- [Quality gates and CI](development/quality-gates.md)

## Conventions

- [Docs-first maintenance](conventions/docs-first.md) — what to update when code changes
- [Agent context & script map](conventions/agent-context.md) — how AI agents load context efficiently

## Agent Witch (Mac bridge)

- [Local bridge and install](agent-witch/local-bridge.md)

## Product

- [Repository name vs hosting](product/repo-name-and-hosting.md)
- [Concepts glossary](product/concepts.md)
- [UX simplification](product/ux-simplification.md)

## Security

- [Threat model](security/threat-model.md)

## Human vs agent entrypoints

| File                         | Role                                  |
| ---------------------------- | ------------------------------------- |
| [../README.md](../README.md) | Product-oriented repo landing         |
| [../AGENTS.md](../AGENTS.md) | Canonical agent entry + Cloud caveats |
| [../CLAUDE.md](../CLAUDE.md) | Stack, routes, verification pointers  |

## Indexing

```bash
npm run feature-knowledge:index
```

Sources: all `docs/**/*.md`; per feature `README.md`, `AGENTS.md`, `KNOWN_ISSUES.md`. Commit `.feature-knowledge/index.json` with doc changes.
