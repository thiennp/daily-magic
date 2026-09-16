# Overview — Agent Witch (daily-magic)

## What this repository is

|          |                                                                                                                  |
| -------- | ---------------------------------------------------------------------------------------------------------------- |
| Git name | `daily-magic` (historical)                                                                                       |
| Product  | **Agent Witch** — web control plane at [https://www.agentwitch.com](https://www.agentwitch.com)                  |
| Role     | Browser UI, APIs, dispatch, run history, harness/marketplace; **Mac-bound execution** via the Agent Witch bridge |

One codebase: the repo folder name is not a separate product from Agent Witch. Do not treat CHECK24 `daily-magic.*` hosts as production Agent Witch unless a human says so. See [product/repo-name-and-hosting.md](product/repo-name-and-hosting.md).

## What the system does (runtime)

1. **Users** sign in (NextAuth + Neon), connect a **Mac** (install script + WebSocket to the same origin), compose tasks, and watch live terminal output.
2. **`server.ts`** runs Next.js and upgrades **`/api/agent-witch/ws`** for the Mac bridge (not plain `next dev` in normal work).
3. **Dispatch** routes work to paired devices or **Cursor Cloud** (stored API keys); runs and events land in **Reports**.
4. **Capabilities, workflows, library, harness, and marketplace** share one dispatch/runtime — see the [product glossary](product/concepts.md).

## Where to read next

| Audience                | Start here                                                                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| Any task (minimal path) | [conventions/load-context.md](conventions/load-context.md)                                                   |
| One product area only   | [domains/README.md](domains/README.md)                                                                       |
| New human contributor   | [development/setup.md](development/setup.md) → one [domain entry](domains/README.md)                         |
| Changing behavior       | [conventions/docs-first.md](conventions/docs-first.md)                                                       |
| AI / coding agents      | [AGENTS.md](../AGENTS.md) → [load-context.md](conventions/load-context.md)                                   |
| Mac bridge / install    | [agent-witch/local-bridge.md](agent-witch/local-bridge.md)                                                   |
| Production deploy       | [development/deployment.md](development/deployment.md) + [adr/0006](adr/0006-production-hosting-and-neon.md) |

## Documentation map

The [docs README](README.md) is the L0 index; [domains](domains/README.md) are L1. Feature detail is L2 under `src/features/<slug>/`. Layers: [progressive-disclosure.md](conventions/progressive-disclosure.md).
