# `.cursor/` layout (daily-magic)

Agent-oriented configuration for this Next.js project. Runnable scripts live in **`.agents/scripts/`**. Application code lives in **`src/`**.

## Subdirectories

| Folder       | Purpose                                                    |
| ------------ | ---------------------------------------------------------- |
| `rules/`     | Coding standards (`.mdc`, registered in `.cursor.json`)    |
| `commands/`  | Slash-style workflows with checklists                      |
| `skills/`    | Reusable principles and patterns                           |
| `subagents/` | Narrow worker personas                                     |
| `harness/`   | Request routing + Husky manifest (not duplicated in rules) |

## Trackers & hosting

- **GitHub** — git remote, issues, PRs (`gh` CLI)
- **Linear** — issue keys in branches when you use Linear
- No Bitbucket, Jira CLI, or Sentry harness in this repo

## Harness layers

| Layer        | Location                                                    | When loaded                        |
| ------------ | ----------------------------------------------------------- | ---------------------------------- |
| Bootstrap    | `rules-harness-bootstrap.mdc` + `npm run harness:bootstrap` | Every agent turn (summary only)    |
| Manifest     | `harness/agent-bootstrap.manifest.json`                     | Routing, workflows, git-hook steps |
| Invariants   | `rules-bundle-core.mdc`                                     | Every agent turn                   |
| Scoped rules | Other `rules/*.mdc` via `.cursor.json` globs                | Matching paths                     |
| Commands     | `commands/*.md`                                             | Routing match or explicit `@`      |
| Git hooks    | `harness:sync` → `git-hooks.md`                             | Commit / PR workflows              |
| Cursor hooks | `.cursor/hooks.json`                                        | Agent write/stop mechanical checks |

## Index

- Rules: `.cursor/rules/README.md`
- Harness: `.cursor/harness/README.md`
- Commands: `.cursor/commands/command-README.md`
- Skills: `.cursor/skills/README.md`
- Subagents: `.cursor/subagents/README.md`
- Agent docs: `CLAUDE.md`, `AGENTS.md`
