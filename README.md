# Daily Magic

Daily Magic is a web control plane for **running AI coding agents on your Mac** (and optional **Cursor Cloud**), with team dispatch, run history, and shared agent capabilities.

## What you can do

- **Connect a Mac** with the Agent Witch client, then send tasks from the browser and watch live terminal output.
- **Compose and dispatch** work from Home and the task composer (`/agent`), including approvals and team policies.
- **Publish and share** capabilities, harness bundles (rules/skills), and marketplace offerings inside your company.
- **Review runs** in Reports, give feedback, and iterate on improvements.

Guests see a marketing landing page; signed-in users get the full app shell, onboarding, and device management.

## Who it is for

Teams and individuals who want a **single place** to trigger trusted agent runs on real hardware—not only inside the IDE—with audit trail, policies, and shared playbooks.

## Get started

Human contributors: see **[docs/README.md](docs/README.md)** for setup, deployment, architecture ADRs, and product concepts.

AI agents: query indexed docs before large edits:

```bash
npm run feature-knowledge:query -- "your question"
npm run feature-knowledge:query -- "topic" --feature=home
```

Rebuild the index after doc changes: `npm run feature-knowledge:index`.

## Main routes

| Path           | Purpose                                   |
| -------------- | ----------------------------------------- |
| `/`            | Home — connect Mac, dashboard, onboarding |
| `/agent`       | Task composer                             |
| `/reports`     | Run history and live output               |
| `/library`     | Saved playbooks                           |
| `/marketplace` | Company-published agents                  |
| `/login`       | Sign in                                   |

## Agent Witch on your Mac

Install the local bridge (production or your deployed origin):

```bash
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Local development uses the custom dev server (`npm run dev`) so WebSocket upgrades work. Details: [docs/agent-witch/local-bridge.md](docs/agent-witch/local-bridge.md).

## Repository map (product)

- `src/features/` — product UI and feature docs (`README.md`, `KNOWN_ISSUES.md`)
- `src/app/` — Next.js routes and API handlers
- `docs/` — technical guides and ADRs (indexed for RAG)
- `.cursor/` — agent harness (rules, commands, skills)

Agent entrypoints: `CLAUDE.md`, `AGENTS.md` (pointers only; deep technical content lives under `docs/`).
