# Architecture

High-level shape of Agent Witch. **Why** choices are locked in lives in [ADRs](../adr/README.md); **open operational risks** for the bridge stay in `src/features/agent-witch/KNOWN_ISSUES.md`.

| Doc                                                         | Contents                                                    |
| ----------------------------------------------------------- | ----------------------------------------------------------- |
| [System map](system-map.md)                                 | Browser, custom server, WebSocket hub, Mac client, database |
| [Codebase map](codebase-map.md)                             | `src/` layers, feature registry, routes vs lib split        |
| [Fractal Slice Architecture](fractal-slice-architecture.md) | FSA target layout (draft; policy in ADR 0007)               |

Supplementary diagram (not indexed as `docs/`): [.agents/diagrams/application-architecture.md](../../.agents/diagrams/application-architecture.md).
