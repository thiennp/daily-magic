# Architecture

High-level shape of Agent Witch. **Why** choices are locked in lives in [ADRs](../adr/README.md); **open operational risks** for the bridge stay in `src/features/agent-witch/KNOWN_ISSUES.md`.

| Doc                                                            | Contents                                                                                              |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [System map](system-map.md)                                    | Browser, custom server, WebSocket hub, Mac client, database                                           |
| [Codebase map](codebase-map.md)                                | `src/` layers, feature registry, routes vs lib split                                                  |
| [Deployables (AWC–AWI)](../product/agent-witch-deployables.md) | Four apps, ports, migration map                                                                       |
| [Fractal Slice Architecture](fractal-slice-architecture.md)    | FSA target layout (draft; policy in ADR 0007)                                                         |
| [Project composition](project-composition.md)                  | Harness/Workflows/Agents storage, pull into repo vs task, dispatch, knowledge roll-forward (ADR 0008) |

Supplementary diagram (not indexed as `docs/`): [.agents/diagrams/application-architecture.md](../../.agents/diagrams/application-architecture.md).
