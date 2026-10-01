# Chapter 4 — Mac bridge (AWL, AWB, AWI)

**AWI** ships and runs the host runtime (Mac LaunchAgents, or an x86_64 Linux systemd user unit). **AWL** is the loopback Mac app. **AWB** exposes localhost HTTP for a browser tab on the **same Mac**. **AWC** holds the hub and pairing UI and works from a Linux browser. Do not answer “Linux cannot access Agent Witch” — split console, host, and Mac-only local app ([Q&A](../../qa/linux-browser-vs-linux-host.md)). User-facing connect/update flows: [user guide ch.4 — Mac connect and bridge](../user-guide/04-mac-connect-and-bridge.md).

Deep reference: [docs/agent-witch/local-bridge.md](../../agent-witch/local-bridge.md) · domain [agent-witch.md](../../domains/agent-witch.md).

---

## Ports and origins (memorize)

| Deployable  | Bind                 | Default port                                                           | Notes                                                                                                      |
| ----------- | -------------------- | ---------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| **AWC**     | `localhost` / public | **3000** (dev) · **8080** common on Railway                            | `npm run dev` → `http://localhost:3000`                                                                    |
| **AWL**     | `127.0.0.1` only     | **43347**                                                              | `http://127.0.0.1:43347` — no vanity hostname ([Q&A awl-loopback-origin](../../qa/awl-loopback-origin.md)) |
| **AWB**     | `127.0.0.1`          | **47892** (prod-origin install) · **47893** (localhost-origin install) | Wake server / identity / harness proxy                                                                     |
| **AWC WSS** | same host as AWC     | path **`/api/agent-witch/ws`**                                         | Production: `wss://www.agentwitch.com/api/agent-witch/ws`                                                  |

---

## Install and config paths

| Path                         | Contents                                                          |
| ---------------------------- | ----------------------------------------------------------------- |
| `~/.agent-witch/`            | Production-style install (LaunchAgents, config, harness)          |
| `~/.local-agent-witch/`      | Localhost-origin dev install variant                              |
| `~/.agent-witch/config.json` | Device identity, app origin — **not** production `wsUrl` override |
| `~/.agent-witch/harness/`    | Harness file drops from browser install API                       |

Install bundle version: bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in `apps/install/features/bundle/public-api/types.ts` whenever the shipped Mac client changes, including the prompt optimizer in `agent-witch.js`. `src/lib/agentWitch/agentWitchInstallBundleVersion.ts` re-exports that constant. A source change that is not rebuilt into `public/install/agent-witch/` does not update AWL. Current bundle: **203**. AWC’s primary nav brand (`AppShellNav`) renders that constant as `AWL {version}` under the product name so the Console chrome shows the latest compatible AWI/AWL bundle this deploy expects. That label is **not** per-device presence data—device rows still use each Mac’s reported install version.

`agent.register` includes `platform`: `linux` when `process.platform` is `linux`, otherwise `mac`. The hub stores it with `updateAgentWitchDevicePlatform` (`resolveAgentRegisterPlatform`). The install script already posted platform; the dev WebSocket client does too.

`AGENT_WITCH_SERVER_RELEASE_LABEL` (`src/lib/release/agentWitchServerReleaseLabel.constant.ts`) is surfaced on **`GET /api/health`** only. There is no in-app Live header badge (`AgentWitchServerReleaseBadge` / `useAgentWitchServerRelease` were removed).

### Commands

```bash
# Against local AWC
npm run agent-witch:install
npm run agent-witch

# Wake server only (debug AWB)
npm run agent-witch:wake-server

# Production curl install
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
```

Shipped bundle build: `npm run build:agent-witch` (runs in `npm run build`).

---

## Code map (today → target)

| Abbr                | Implementation today                                             | Target folder            |
| ------------------- | ---------------------------------------------------------------- | ------------------------ |
| AWI                 | `scripts/agent-witch.ts`, `public/install/agent-witch/`          | `apps/install/`          |
| AWL                 | `scripts/agentWitchAppEntry.ts`, `scripts/agentWitchLocalApp.ts` | `apps/live/`             |
| AWB                 | `scripts/agent-witch-wake-server.ts`                             | `apps/bridge/`           |
| AWC client protocol | `src/lib/agentWitch/*`, `packages/shared/`                       | `apps/console/` (future) |

Registry: [agent-witch-deployables.md](../../product/agent-witch-deployables.md).

The prompt optimizer is in AWC at `/prompt-optimizer` (`src/features/prompt-optimizer`). The console page tells the person to run it on AWL and does not start the wizard. The wizard is an AWL feature at `apps/live/features/prompt-optimizer`. Routes: `/prompt-optimizer`, `/prompt-optimizer/guide`, and `/prompt-optimizer/agent` on `127.0.0.1:43347`. Compose **Run** (`intent=run`) always starts the four-step wizard; there is no classic / `run-classic` path. `POST /prompt-optimizer/agent` requires `goal` in the JSON body and starts the same wizard (pass `PROMPT_SDLC_WIZARD_PASS_SCORE` **70**, max rounds `PROMPT_SDLC_WIZARD_MAX_ROUNDS` **5**). Optional `passScore` / `maxRounds` on the agent body are ignored in favor of those wizard defaults. `GET /prompt-optimizer/agent` lists installed writers. One installed writer fills judge and improver when those fields are omitted. `manual` is rejected on this API; the human page still offers I'll score it and I'll rewrite it. The human page remembers the last folder, judge, improver, and wizard runner in `prompt-optimizer-preferences.json` beside the cycles file. A missing folder falls back to `~`. Optional judge, improver, and runner instructions are stored on the cycle. Wizard step 2 scores prompt text only; step 4 runs the module prompt (`buildPromptSdlcWizardModuleRunPrompt` / runner) then scores evidence. `revertPromptSdlcRunChanges` puts the folder back after a scored folder run. Each composer field has an info tip (`renderPromptSdlcFieldTip`). Bots read the same contract from `buildPromptSdlcAgentGuide` on `/for-agents`, `llms.txt`, and `get_agent_guide`. History titles are the first clause of the goal. Delete posts `intent=delete-history`. Steps render as `ol.sdlc-tree`. Wizard interrupt controls are **End wizard** (`wizard-stop-all`) and **Skip module** (`wizard-skip-module`). Legacy cycles stored without a `wizard` field still expose **Stop run** (`intent=stop`) so old in-progress rows can finish. History filters **All / Wizard**. A finished wizard can export Markdown (`?cycle=&export=wizard-markdown`). Writer readiness is stored in `prompt-optimizer-writer-ready.json`.

---

## AWB HTTP surface (same Mac as browser)

Local wake server (typical **`127.0.0.1:47892`**):

| Method | Path                                 | Purpose                                                                                                         |
| ------ | ------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| GET    | `/health`                            | Liveness                                                                                                        |
| GET    | `/identity`                          | “This computer” token for AWC pages ([Q&A awb-localhost-identity](../../qa/awb-localhost-identity-and-cors.md)) |
| GET    | `/watchdog/status`, `/watchdog/logs` | Watchdog diagnostics                                                                                            |
| POST   | `/watchdog/revive`                   | Kick stale client                                                                                               |
| GET    | `/update/status`, POST `/update/run` | Self-update                                                                                                     |
| POST   | `/harness/install`                   | Deterministic harness writes from browser                                                                       |

AWC proxies some routes when the tab is on the same Mac:

- `GET/POST /api/agent-witch/local-watchdog`
- `GET/POST /api/agent-witch/local-update`

Mac client cloud HTTP (legacy long-poll paths still documented in CLAUDE.md): heartbeat, commands poll, messages, events SSE — primary live path is **WebSocket** to AWC.

### AWL loopback pages (pillar 3 memory)

| Path         | Module                                                                                | Notes                                                                                                   |
| ------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `/knowledge` | `startAgentWitchLocalApp.ts` + `agentWitchLocalRag` / `agentWitchLocalKnowledgeUsage` | Project RAG chunks, retrieval counts (`usage-stats.json`), local tool/rule **hints** (not auto-publish) |
| `/errors`    | diagnostics                                                                           | Client stderr tail — not the same as `error-chunks.ndjson` RAG                                          |

Telemetry and dispatch wiring: [Chapter 10](10-learning-memory-and-improvements.md). Do not conflate with repo `.feature-knowledge/`.

---

## WebSocket client (AWI → AWC)

1. Mac opens **`wss://<app-origin>/api/agent-witch/ws`** with session/device identity after pairing.
2. `server.ts` upgrades and registers client in hub + **`agent_witch_connections`** (ADR 0005).
3. Writer/shell traffic flows hub ↔ Mac; browser subscribes over the same hub connection model.
4. On **`command.claude.run`**, the writer CLI working directory is the expanded project folder (`resolveWriterTaskCwd` in `scripts/resolveWriterTaskCwd.ts`). `config.workspace` is only the fallback when dispatch sends no project folder. `startAgentWitchClient.ts` may capture a **git worktree snapshot** before spawn and append a one-line **git verdict** to the Mac run report `details` after completion when the project folder is a git repo (`captureAgentWitchGitWorktreeSnapshot`, `formatAgentWitchGitWorktreeVerdict` under `apps/live/features/projects/internal/core/knowledge/`). See [Chapter 10](10-learning-memory-and-improvements.md).

**Requires** `npm run dev` or `npm run start` — not `npm run dev:next` alone.

Test from browser: **`/ws-test`** on AWC.

---

## Watchdog and self-update (macOS)

| LaunchAgent                | Manual check                      |
| -------------------------- | --------------------------------- |
| `com.agent-witch-watchdog` | `npm run agent-witch:watchdog`    |
| `com.agent-witch-updater`  | `npm run agent-witch:self-update` |

The watchdog and the in-process AWI timer probe **`http://127.0.0.1:43347/health`** (AWL) in addition to AWB wake `/health`. When Live is down but the install bundle exists, they **`launchctl kickstart`** the Agent Witch client LaunchAgents so AWL comes back (skipped while a writer task is in progress).

Install bundle version API: `GET /install/agent-witch/version` (same integer the Console nav shows as `AWL {n}`).

Self-update resolves the app origin from `config.json` `wsUrl`, then from `install-version.json` `appOrigin`. When both are missing, it uses `AGENT_WITCH_DEFAULT_ORIGIN` (`https://www.agentwitch.com`), the same default AWL uses for the update offer. A missing local bundle version still counts as older than the remote bundle.

---

## Connect this Mac placeholders (HOME-059)

`POST /api/agent-witch/install-token` reserves a pairing token before AWI checks in. That row is a placeholder: `recordLastSeen: false`, so `last_seen_at` stays null and the list must not say **seen recently**. `revokePendingInstallDevicesForUser` then revokes older placeholders for that user (no hostname, display name, bundle version, handshake, or device key), keeps the newest, and clears a false `last_seen_at` on that kept row. `GET /api/agent-witch/devices` runs the same cleanup so a reload drops extras from repeated clicks. A later heartbeat (`touchAgentWitchDeviceLastSeen`) or `registerAgentWitchInstallFromMac` is what marks the computer seen. `agent.heartbeat` every 30s keeps `last_seen_at` fresh for 180s (`AGENT_WITCH_ONLINE_THRESHOLD_MS`, 6× the interval) so a delayed packet does not flip the row to offline. Named devices are not placeholders.

Failed browser calls to `http://127.0.0.1:47892/identity` and `:47893/identity` mean AWB is down. They do not insert device rows.

The click does not signal a running AWL. The Mac keeps `~/.agent-witch` until the install command runs. That command writes the new token when the config email matches (`buildAgentWitchInstallScriptConfigUpdateExisting`), restarts the LaunchAgent (`launchctl kickstart -k`), and `registerAgentWitchInstallFromMac` stamps the hostname onto the new row and revokes other active rows with that label. A Console delete removes the `agent_witch_devices` row (`deleteAgentWitchDevice`) after cancelling in-flight runs and queued dispatch. The live socket, and the next `agent.register` when the row is gone, send `system.error` with `errorCode` `unknown_identity`. Bundle 148+ (`forgetAgentWitchLocalConnection`) then stops LaunchAgents and deletes connection files plus `app/`. Project, harness, report, run, rag, and Ollama paths stay. A revoked row that still exists is “not linked” and does not wipe. Update local (`updateExistingInstall`) keeps the on-disk token, so it does not create a new identity. **Connect this Mac** inserts a known row before the Mac connects.

---

## Common agent mistakes

| Mistake                                                    | Truth                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| AWL reachable from AWC server-side fetch                   | AWL is **loopback-only** on the user’s Mac                                                                          |
| AWB up ⇒ dispatch ready                                    | Writer needs **live WSS on AWC** ([Q&A awc-mac-reconnecting](../../qa/awc-mac-reconnecting-vs-local-live.md))       |
| Point `wsUrl` at CHECK24 daily-magic host                  | Production Mac uses **agentwitch.com** ([hosting doc](../../product/repo-name-and-hosting.md))                      |
| Folder picker in AWC for Mac paths                         | Use AWL/AWB `select-folder` ([Q&A awc-project-folder-path-picker](../../qa/awc-project-folder-path-picker.md))      |
| Stamp `last_seen_at` on install-token insert               | Each click looks like a live Mac (HOME-059). Leave `last_seen_at` null until check-in and revoke older placeholders |
| Set `revoked_at` and leave the Mac running                 | The identity stays known, so a later connect will not forget the local link (HOME-060)                              |
| Treat Offline **Your Mac** + **this Mac** as the live host | Cookie may match a dead claim while another row is `live` (HOME-061). Devices API must return `wakePort`.           |

Open issues: `src/features/agent-witch/KNOWN_ISSUES.md`.

---

## Related

| Topic               | Link                                                          |
| ------------------- | ------------------------------------------------------------- |
| User Mac connect    | [user guide ch.4](../user-guide/04-mac-connect-and-bridge.md) |
| Local dev           | [Chapter 1](01-local-dev-and-env.md)                          |
| Hub / ADR 0002      | [Chapter 3](03-architecture-map.md)                           |
| Dispatch & presence | [Chapter 5](05-dispatch-presence-and-runs.md)                 |

```bash
npm run feature-knowledge:query -- "AWB identity 47892" --feature=docs
npm run feature-knowledge:query -- "Mac WebSocket" --feature=agent-witch
```

---

## Query aliases

- AWL AWB AWI ports 43347 47892 agent-witch install harness
- Mac bridge wake server identity this computer
- npm run agent-witch install bundle LaunchAgent
- git worktree snapshot captureAgentWitchGitWorktreeSnapshot run report details
- cầu nối Mac Agent Witch, cài đặt AWI, cổng loopback
