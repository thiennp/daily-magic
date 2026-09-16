# Documentation — Agent Witch (daily-magic)

**[Overview](overview.md)** — what the product is and where to go next.

**[Load context](conventions/load-context.md)** — pick a minimal path (bugfix, feature, refactor, deploy, architecture). **Do not** read this entire tree for one task.

| Layer        | Doc                                                |
| ------------ | -------------------------------------------------- |
| L0 Index     | This file + [domains/README.md](domains/README.md) |
| L1 Domain    | [domains/*.md](domains/README.md) (~1 min each)    |
| L2 Module    | `src/features/<slug>/README.md`                    |
| L3 Deep dive | development/, adr/, agent-witch/, etc.             |

Model: [conventions/progressive-disclosure.md](conventions/progressive-disclosure.md). Markdown here and under `src/features/*/README.md` is indexed via `npm run feature-knowledge:query`.

## Architecture

- [Architecture index](architecture/README.md)
- [System map](architecture/system-map.md) — browser, `server.ts`, Mac bridge, Neon
- [Codebase map](architecture/codebase-map.md) — `src/` layers and feature registry
- [ADRs](adr/README.md) — recorded decisions (WebSocket, hosting, dispatch)

## Development

- [Local setup](development/setup.md)
- [Deploy to production + Neon](development/deployment.md)
- [Quality gates and CI](development/quality-gates.md)

## Domains (L1)

- [Domain map](domains/README.md) — one entry per product area, “read next if…” only

## Conventions

- [Load context — task paths](conventions/load-context.md)
- [Progressive disclosure](conventions/progressive-disclosure.md)
- [Docs-first maintenance](conventions/docs-first.md)
- [Script index — learn by running](conventions/script-index.md)
- [Agent context & harness map](conventions/agent-context.md)

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
