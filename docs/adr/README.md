# Architecture decision records

ADRs capture **why** the system is shaped the way it is. They are indexed by feature knowledge (`npm run feature-knowledge:query -- "ADR …"`).

| ADR                                                     | Title                                        |
| ------------------------------------------------------- | -------------------------------------------- |
| [0001](0001-record-architecture-decisions.md)           | Record architecture decisions                |
| [0002](0002-custom-server-for-agent-witch-websocket.md) | Custom Node server for Agent Witch WebSocket |
| [0003](0003-feature-ui-with-server-lib.md)              | Feature UI with server lib co-location       |
| [0004](0004-cursor-cloud-dispatch-origin.md)            | Cursor Cloud dispatch origin policy          |
| [0005](0005-shared-mac-presence-and-dispatch-outbox.md) | Shared Mac presence and dispatch outbox      |

New ADRs: add the next numbered file and a row in this table, then `npm run feature-knowledge:index`.

Security scenarios and trust boundaries: [threat model](../security/threat-model.md).
