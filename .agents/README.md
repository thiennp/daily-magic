# `.agents/` — non-runtime tooling

Scripts and templates for AI-assisted development. Application code is in **`src/`**.

| Path         | Purpose                                                     |
| ------------ | ----------------------------------------------------------- |
| `scripts/`   | Architecture checks, structure validation wrapper, codemods |
| `diagrams/`  | Architecture notes (markdown)                               |
| `scaffold/`  | Scaffold docs                                               |
| `templates/` | File templates for generators                               |

## npm scripts

- `npm run cursor:architecture`
- `npm run cursor:verify`
- `npm run validate:staged`
- `npm run validate:all`

## Removed (EnergyCenter)

Jira, Bitbucket, Sentry, hybrid RAG, and MCP credential folders were removed. Use **GitHub** and **Linear** from your agent tooling instead.
