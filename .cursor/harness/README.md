# `.cursor/harness/` — agent request routing

Lightweight **intent → agent → command** registry for Cursor. Not runtime code — agents read this at session start via **`rules-agent-request-routing.mdc`**.

| File                           | Role                                                            |
| ------------------------------ | --------------------------------------------------------------- |
| **`agent-request-routing.md`** | Authoritative routing table; update when agents/commands change |

**Flow:** User request → match signals → attach **`.cursor/agents/`** + **`.cursor/commands/`** → if no match, handle normally.

See **`.cursor/README.md`** for the full rules / agents / commands layout.
