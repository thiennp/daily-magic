# Daily Magic (Agent Witch)

This repository (`daily-magic`) is the codebase for **[Agent Witch](https://www.agentwitch.com)** — a web control plane for **running AI coding agents on your Mac** (and optional **Cursor Cloud**), with team dispatch, run history, and shared agent capabilities.

## What you can do

- **Connect a Mac** with the Agent Witch client, then send tasks from the browser and watch live terminal output.
- **Compose and dispatch** work from Home and the task composer (`/agent`), including approvals and team policies.
- **Publish and share** capabilities, harness bundles (rules/skills), and marketplace offerings inside your company.
- **Review runs** in Reports, give feedback, and iterate on improvements.

Guests see a marketing landing page; signed-in users get the full app shell, onboarding, and device management.

## Who it is for

Teams and individuals who want a **single place** to trigger trusted agent runs on real hardware—not only inside the IDE—with audit trail, policies, and shared playbooks.

## Get started

|                        |                                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| **New contributor**    | [docs/overview.md](docs/overview.md) → [docs/development/setup.md](docs/development/setup.md)   |
| **Full docs index**    | [docs/README.md](docs/README.md) (architecture, conventions, ADRs, product)                     |
| **AI / coding agents** | [AGENTS.md](AGENTS.md) → [docs/conventions/agent-context.md](docs/conventions/agent-context.md) |

Query indexed docs before large feature edits:

```bash
npm run feature-knowledge:query -- "your question"
npm run feature-knowledge:query -- "topic" --feature=home
npm run feature-knowledge:query -- "deployment" --feature=docs
```

Rebuild the index after doc changes: `npm run feature-knowledge:index` (commit `.feature-knowledge/index.json`).

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

- `docs/` — **system map** (overview, architecture, conventions, how-to, ADRs)
- `src/features/` — product UI + per-feature `README.md` / `KNOWN_ISSUES.md`
- `src/app/` — Next.js routes and API handlers
- `src/features/_registry/features.registry.json` — canonical feature list and API/route paths
- `.cursor/` + `.agents/` — agent harness and verification scripts

Deep technical content lives under **`docs/`** and feature folders; `CLAUDE.md` and `AGENTS.md` stay thin pointers.
