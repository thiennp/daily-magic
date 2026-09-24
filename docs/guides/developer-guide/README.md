# Agent Witch — developer guide

For humans and **coding agents** working in the **daily-magic** repo. Read [Chapter 0](00-philosophy-and-mismatch-traps.md) before touching `src/features/agent-witch/`, `src/lib/agentWitch/`, or `server.ts`.

---

## Table of contents

| Ch. | File                                                                             | What you learn                                                  |
| --- | -------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| 0   | [00-philosophy-and-mismatch-traps.md](00-philosophy-and-mismatch-traps.md)       | Product vs repo; deployables; docs-first; agent reading order   |
| 1   | [01-local-dev-and-env.md](01-local-dev-and-env.md)                               | `npm run dev`, Neon, Cursor Cloud VM `DATABASE_URL` caveats     |
| 2   | [02-auth-and-test-login.md](02-auth-and-test-login.md)                           | NextAuth, test auth bypass, super-admin seeds                   |
| 3   | [03-architecture-map.md](03-architecture-map.md)                                 | AWC server, WS upgrade, hubs, FSA slices                        |
| 4   | [04-mac-bridge-awl-awb-awi.md](04-mac-bridge-awl-awb-awi.md)                     | Install bundle, identity, heartbeat, wake ports                 |
| 5   | [05-dispatch-presence-and-runs.md](05-dispatch-presence-and-runs.md)             | Presence tiers, writer dispatch, multi-instance relay           |
| 6   | [06-workflows-orchestration.md](06-workflows-orchestration.md)                   | Official workflow runs, checkpoints, bounded sub-runs           |
| 7   | [07-capabilities-library-harness.md](07-capabilities-library-harness.md)         | Capabilities vs library vs harness vs marketplace               |
| 8   | [08-deploy-hosting-neon.md](08-deploy-hosting-neon.md)                           | Railway, Docker, Neon, `www.agentwitch.com`                     |
| 9   | [09-known-issues-and-regressions.md](09-known-issues-and-regressions.md)         | OPEN issues, regression tests, Q&A updates                      |
| 10  | [10-learning-memory-and-improvements.md](10-learning-memory-and-improvements.md) | Pillars 2–3: feedback, improvements, Mac run memory vs repo RAG |
| A   | [agent-mistakes-catalog.md](agent-mistakes-catalog.md)                           | **Recurring agent mistakes** and how to avoid them              |

## Before you edit

1. [User guide ch.0](../user-guide/00-philosophy-and-vocabulary.md) — user vocabulary
2. `npm run feature-knowledge:query -- "…" --feature=docs`
3. Feature `README.md` + `KNOWN_ISSUES.md` for the slug you touch
4. Matching chapter in this book (see [guide-maintenance.map.json](../guide-maintenance.map.json))

## Query aliases

- Agent Witch developer guide, coding agent daily-magic
- AWC AWL AWB AWI developer documentation
- agent mistakes dispatch WebSocket Neon
