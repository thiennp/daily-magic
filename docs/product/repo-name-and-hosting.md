# Repository name, product brand, and hosting

## One codebase, one product (Agent Witch)

| What                         | Value                                                                                                                                                                         |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Git repository / folder name | `daily-magic` (historical internal name)                                                                                                                                      |
| Product brand                | **Agent Witch**                                                                                                                                                               |
| Production website           | `https://www.agentwitch.com` (canonical: `AGENT_WITCH_DEFAULT_ORIGIN` in code)                                                                                                |
| Mac WebSocket (production)   | `wss://www.agentwitch.com/api/agent-witch/ws` — **hardcoded** for `~/.agent-witch` (`AGENT_WITCH_PRODUCTION_WS_URL`); `config.json` `wsUrl` is ignored on production installs |
| Local dev app                | `http://localhost:3000` (`npm run dev` — custom `server.ts` for WebSocket upgrade)                                                                                            |

The repo name **daily-magic** is not a separate cloud product from **agentwitch.com**. This repository is the Agent Witch control plane (browser UI, APIs, hub, install bundle).

## Not part of this product (do not conflate)

- **`https://daily-magic.d.energie.check24.de`** — unrelated CHECK24 / internal host. It is **not** Agent Witch production, **not** the default Mac `wsUrl`, and **not** “AW Live” for end users unless a human explicitly says they deploy this repo there.
- Other EnergyCenter / nrg-core URLs, Jira, Bitbucket patterns — out of scope for this repo (see root `AGENTS.md`).

When debugging Mac online / dispatch / `ENOTFOUND` / deploy recovery, assume:

1. Browser origin = **agentwitch.com** (or **localhost** for dev).
2. Mac `config.json` `wsUrl` must target the **same** origin’s `/api/agent-witch/ws`.

Never suggest pointing a production Mac at `daily-magic.d.energie.check24.de` unless the user confirms that is their deliberate deployment.

## For AI agents

- Say **Agent Witch** / **agentwitch.com** in user-facing troubleshooting, not “daily-magic on CHECK24”.
- **Cursor Cloud / VM** caveats in `AGENTS.md` (injected `DATABASE_URL`, `.env.local`) apply only to that dev VM — not to production Agent Witch on Railway/Vercel + `www.agentwitch.com`.
