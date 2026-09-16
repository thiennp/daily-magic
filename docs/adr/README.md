# Architecture decision records

ADRs capture **why** the system is shaped the way it is. They are indexed by feature knowledge (`npm run feature-knowledge:query -- "ADR …"`).

| ADR                                                     | Status   | Title                                        |
| ------------------------------------------------------- | -------- | -------------------------------------------- |
| [0001](0001-record-architecture-decisions.md)           | Accepted | Record architecture decisions                |
| [0002](0002-custom-server-for-agent-witch-websocket.md) | Accepted | Custom Node server for Agent Witch WebSocket |
| [0003](0003-feature-ui-with-server-lib.md)              | Accepted | Feature UI with server lib co-location       |
| [0004](0004-cursor-cloud-dispatch-origin.md)            | Accepted | Cursor Cloud dispatch origin policy          |
| [0005](0005-shared-mac-presence-and-dispatch-outbox.md) | Accepted | Shared Mac presence and dispatch outbox      |
| [0006](0006-production-hosting-and-neon.md)             | Accepted | Production hosting (Railway, custom server)  |

## Quick map (Agent Witch)

| Topic                                               | ADR                                            |
| --------------------------------------------------- | ---------------------------------------------- |
| Mac WebSocket + `server.ts`                         | 0002                                           |
| `live` vs `live_other_instance` vs writer dispatch  | 0005                                           |
| Railway / `www.agentwitch.com` / Neon               | 0006                                           |
| Repo name vs product (`daily-magic` vs Agent Witch) | `docs/product/repo-name-and-hosting.md` + 0001 |
| Open ops risks (DNS, multi-instance handoff)        | `src/features/agent-witch/KNOWN_ISSUES.md`     |

New ADRs: add the next numbered file and a row in this table, then `npm run feature-knowledge:index`.

Security scenarios and trust boundaries: [threat model](../security/threat-model.md).
