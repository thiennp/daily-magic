# `.cursor/` layout (daily-magic)

Agent-oriented configuration for this Next.js project. Runnable scripts live in **`.agents/scripts/`**. Application code lives in **`src/`**.

## Subdirectories

| Folder       | Purpose                                                 |
| ------------ | ------------------------------------------------------- |
| `rules/`     | Coding standards (`.mdc`, registered in `.cursor.json`) |
| `commands/`  | Slash-style workflows with checklists                   |
| `skills/`    | Reusable principles and patterns                        |
| `subagents/` | Narrow worker personas                                  |
| `harness/`   | Request routing table                                   |

## Trackers & hosting

- **GitHub** — git remote, issues, PRs (`gh` CLI)
- **Linear** — issue keys in branches when you use Linear
- No Bitbucket, Jira CLI, or Sentry harness in this repo

## Index

- Rules: `.cursor/rules/README.md`
- Commands: `.cursor/commands/command-README.md`
- Skills: `.cursor/skills/README.md`
- Subagents: `.cursor/subagents/README.md`
- Agent docs: `CLAUDE.md`, `AGENTS.md`
