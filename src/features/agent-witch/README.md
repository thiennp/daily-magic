# Agent Witch bridge

Mac pairing, install script, mutual WebSocket bridge, local app (`:43347`), and paired-device API client.

## Scope

| Area           | Path                        |
| -------------- | --------------------------- |
| Feature client | `src/features/agent-witch/` |
| Server / hub   | `src/lib/agentWitch/`       |
| APIs           | `/api/agent-witch/*`        |
| Local Mac app  | `http://127.0.0.1:43347`    |

## Transport

| Direction        | Mechanism                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------- |
| Mac ↔ cloud      | Single mutually authenticated WebSocket (`/api/agent-witch/ws`) with Ed25519 device keys |
| Online           | Hub live WS = connected; fresh `last_seen_at` alone = seen recently (~90s)               |
| Commands → Mac   | Hub sends over the open WS (e.g. `writer.ensure`, `command.claude.run`)                  |
| Mac → server     | WS frames (`agent.register`, `writer.status`, results, shell, harness)                   |
| Server → browser | HTTPS APIs + optional SSE; dashboard may also use WS when authenticated                  |
| Local debug      | Traffic log + knowledge + status on `:43347`                                             |

Mac HTTP `heartbeat` / `commands/poll` / `messages` return **410 Gone** (retired).

## Local RAG

After agent turns, chunks are embedded with local Ollama (`nomic-embed-text` by default) into `~/.agent-witch/rag/`. Cloud-originated tasks query RAG first and inject hits into the writer prompt. Browse at `http://127.0.0.1:43347/knowledge`.

## Writer setup

Post-install AI picker: `/setup/writer` on agentwitch.com → WS `writer.ensure` / `writer.status`. Login check runs on every Mac reconnect.

## Key modules

- `online-wake/` — presence tiers, browser wake, cloud restart queue, wake modal UI
- `utils/pairedDevicesApi.ts` — fetch/revoke devices, dispatch policy
- `macDevices/` — device row, rename, menus

Browser presence uses `/api/agent-witch/devices` (WS hub). Local `:43347` is Mac-only UI; the site does not probe it.

## Local vs production Mac installs

| Origin         | Install dir            | Wake port | Local UI | LaunchAgent prefix      |
| -------------- | ---------------------- | --------- | -------- | ----------------------- |
| localhost      | `~/.local-agent-witch` | `47893`   | `43347`  | `com.local-agent-witch` |
| agentwitch.com | `~/.agent-witch`       | `47892`   | `43347`  | `com.agent-witch`       |

Install from each origin separately so local and prod stay independent.

Bundle version: bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` when install scripts change (currently **22**).
