# Agent Witch deployables (AWC, AWL, AWB, AWI)

Four **named deployables** share one git repo (`daily-magic`). Use the **abbreviations** in issues, PRs, and agent chat for speed.

| Abbr    | Name                | Folder (target) | Primary origin / port                                                        |
| ------- | ------------------- | --------------- | ---------------------------------------------------------------------------- |
| **AWC** | Agent Witch Console | `apps/console/` | `https://www.agentwitch.com` · local `http://localhost:3000`                 |
| **AWL** | Agent Witch Live    | `apps/live/`    | `http://local.agentwitch.com:43347` · `http://127.0.0.1:43347`               |
| **AWB** | Agent Witch Bridge  | `apps/bridge/`  | `http://127.0.0.1:47892` (prod install) · `47893` (localhost-origin install) |
| **AWI** | Agent Witch Install | `apps/install/` | Mac bundle (`curl \| bash`), `~/.agent-witch` / `~/.local-agent-witch`       |

Machine-readable registry: [`apps/deployables.registry.json`](../../apps/deployables.registry.json).

Shared types and protocol: **`@agent-witch/shared`** (`packages/shared/`) — deployables, network constants, WebSocket message types.

---

## Roles

### AWC — Console

Cloud **control plane**: signed-in browser UI, REST APIs, WebSocket hub (`/api/agent-witch/ws`), auth, dispatch, runs, playbooks, admin.

- **Today:** `src/app/`, `server.ts`, `src/features/*`, `src/lib/*`
- **Not:** Mac loopback HTTP; not `local.agentwitch.com`

### AWL — Live

**Mac-local web app** (first-class product surface): home, local tasks, projects/repos, playbook (harness) sync, memory/knowledge, writer settings, connection and install health.

- **Today:** `scripts/agentWitchLocalApp.ts` and `buildAgentWitchLocal*` pages; constant `AGENT_WITCH_LOCAL_APP_PORT` (`43347`)
- **Binds:** `127.0.0.1` only (see AGENT-021 — the public website does not fetch AWL)

### AWB — Bridge

**Loopback HTTP API** so a **browser tab on the same Mac** can call the machine safely: identity, watchdog, harness install proxy, self-update/restart, cloud-proxied “local watchdog/update” routes.

- **Today:** `scripts/agent-witch-wake-server.ts` (often co-located in the same process as AWI runtime)
- **Distinct from AWL:** AWB is an integration surface for AWC pages on that Mac; AWL is the dedicated Mac app UI

### AWI — Install

**Shipping and runtime** for Mac: install scripts, bundled `agent-witch.js`, LaunchAgents, deps tarball, device keys, WebSocket client, PTY/shell, self-update — hosts AWL + AWB in one process today.

- **Today:** `public/install/agent-witch/`, `scripts/agent-witch.ts`, install bundle version in `src/lib/agentWitch/agentWitchInstallBundleVersion.ts`

---

## Two entry points, one product

| User job                                                       | Typical entry |
| -------------------------------------------------------------- | ------------- |
| Team dispatch, history, org playbooks                          | **AWC**       |
| Work on this Mac (folders, local tasks, Mac playbooks, memory) | **AWL**       |

AWC may link to AWL (“Open on this Mac”). That is navigation, not a downgrade of AWL to “debug only.”

---

## Migration map (today → target)

| Abbr | Current main paths                                                                                |
| ---- | ------------------------------------------------------------------------------------------------- |
| AWC  | `src/app/`, `server.ts`, `src/features/`, `src/lib/` (cloud-owned)                                |
| AWL  | `scripts/agentWitchLocalApp*.ts`, `scripts/buildAgentWitchLocal*`                                 |
| AWB  | `scripts/agent-witch-wake-server.ts`, wake/restart/update helpers under `scripts/`                |
| AWI  | `scripts/agent-witch.ts`, `public/install/agent-witch/`, Mac `src/lib/agentWitch/` client/runtime |

Each app keeps its own **`features/`** tree under FSA (ADR 0007); cross-app contracts live in **`@agent-witch/shared`** ([README](../../packages/shared/README.md)).

---

## Related

- [Codebase map](../architecture/codebase-map.md) · [FSA refactoring plan](../architecture/fsa-refactoring-plan.md)
- [Repo name & hosting](repo-name-and-hosting.md) — production is **agentwitch.com**, not CHECK24 `daily-magic` URLs
- [UX simplification](ux-simplification.md) — user-facing names vs AWC/AWL
- [Local bridge](../agent-witch/local-bridge.md) — install and dev flows
