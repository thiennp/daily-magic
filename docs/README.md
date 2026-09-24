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
- [Refactoring safety tests](development/refactoring-safety-tests.md) (AWC / AWL / AWB / AWI moves)

## Domains (L1)

- [Domain map](domains/README.md) — one entry per product area, “read next if…” only

## System Q&A (RAG)

- [Q&A index](qa/README.md) — stable “how it works” answers (`npm run feature-knowledge:query -- "…" --feature=docs`); agents read **`rules-system-qa-rag.mdc`**

## Guides (books)

- [Guides index](guides/README.md) — **user guide** + **developer guide** (chaptered); maintenance map `guides/guide-maintenance.map.json`; rule **`rules-agent-witch-guides.mdc`**

## Conventions

- [Load context — task paths](conventions/load-context.md)
- [Progressive disclosure](conventions/progressive-disclosure.md)
- [Docs-first maintenance](conventions/docs-first.md)
- [FSA workflows](conventions/fsa-workflows.md) — implement / migrate feature slices (ADR 0007)
- [Script index — learn by running](conventions/script-index.md)
- [Agent context & harness map](conventions/agent-context.md)

## Agent Witch (Mac bridge)

- [Local bridge and install](agent-witch/local-bridge.md)

## Product

- [Deployables AWC / AWL / AWB / AWI](product/agent-witch-deployables.md)
- [Repository name vs hosting](product/repo-name-and-hosting.md)
- [Concepts glossary](product/concepts.md)
- [UX simplification](product/ux-simplification.md)
- [Projects view wireframes v2](product/projects-view-wireframes-v2.md) — AWC list/detail vs AWL editor UX review
- [Workflow builder: form inputs, steps, graph](product/workflow-builder-form-and-graph.md) — proposed create-workflow input types and linear graph

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
