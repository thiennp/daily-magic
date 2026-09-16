# `.agents/` — non-runtime tooling

Scripts and templates for AI-assisted development. Application code is in **`src/`**.

**For agents:** canonical reveal order and task paths live in **`docs/conventions/`** ([agent-context.md](../docs/conventions/agent-context.md), [script-index.md](../docs/conventions/script-index.md)). Entry file: [AGENTS.md](../AGENTS.md).

| Path         | Purpose                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------- |
| `scripts/`   | Harness bootstrap, architecture checks, feature-knowledge, structure validation, codemods |
| `diagrams/`  | Architecture notes (markdown)                                                             |
| `scaffold/`  | Scaffold docs for new files                                                               |
| `templates/` | File templates for generators                                                             |

## `scripts/` → `npm run` (common)

| File / area                          | npm script                               |
| ------------------------------------ | ---------------------------------------- |
| `harnessBootstrap.ts`                | `harness:bootstrap`, `harness:sync`      |
| `architecture-check.ts`              | `cursor:architecture`, `ci:architecture` |
| `verify-rules.ts`                    | `cursor:verify`                          |
| `validate-structure-staged.sh`       | `validate:staged`                        |
| `feature-knowledge-index.ts`         | `feature-knowledge:index`                |
| `feature-knowledge-query.ts`         | `feature-knowledge:query`                |
| `feature-knowledge-scaffold-docs.ts` | `feature-knowledge:scaffold-docs`        |

Full product/runtime scripts (`dev`, `agent-witch`, `db:*`, `test`): [docs/conventions/script-index.md](../docs/conventions/script-index.md).

## Removed (EnergyCenter)

Jira, Bitbucket, Sentry, hybrid RAG, and MCP credential folders were removed. Use **GitHub** and **Linear** from your agent tooling instead.
