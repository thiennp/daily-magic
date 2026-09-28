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

Install bundle version: bump `AGENT_WITCH_INSTALL_BUNDLE_VERSION` in `apps/install/features/bundle/public-api/types.ts` whenever the shipped Mac client changes, including Prompt SDLC in `agent-witch.js`. `src/lib/agentWitch/agentWitchInstallBundleVersion.ts` re-exports that constant. A source change that is not rebuilt into `public/install/agent-witch/` does not update AWL.

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

Prompt SDLC is the prompt optimizer in AWC at `/prompt-sdlc` (`src/features/prompt-sdlc`). The console page tells the person to run it on AWL and does not start the loop. The loop is an AWL feature at `apps/live/features/prompt-sdlc`. Routes: `/prompt-sdlc`, `/prompt-sdlc/guide`, and `/prompt-sdlc/agent` on `127.0.0.1:43347`. `GET /prompt-sdlc/agent` lists installed writers. `POST` JSON `{ goal, prompt, workingDirectory, judge?, improver?, passScore?, maxRounds? }` starts a cycle in that folder. `GET ?cycle=` returns the snapshot until `done` is true. One installed writer fills both roles when judge and improver are omitted. `manual` is rejected on this API; the human page still offers I'll score it and I'll rewrite it. Bots read the same contract from `buildPromptSdlcAgentGuide` on `/for-agents`, `llms.txt`, and `get_agent_guide`. The judge and improver run in `workingDirectory`, so they can read the harness and the code. That is the product difference from an optimizer that runs somewhere else. The guide page posts the sample goal and prompt to start a cycle. History titles are the first clause of the goal. Delete posts `intent=delete-history` and drops that cycle so a writer still finishing cannot save it back. Steps render as `ol.sdlc-tree`. Each step is a button. A click copies that step’s template into `#sdlc-node-dialog` (`score`, feedback, saved prompt). When the cycle is terminal, `#prompt-sdlc-best` shows the highest score (`selectPromptSdlcBestPrompt`; a tie keeps the later round). POST `intent=save-skill` writes `.cursor/skills/<slug>/SKILL.md` under the cycle folder. The pass score is a range input named `passScore` (default 90, whole numbers 1–100). The track is one gradient through the bad, weak, close, and pass colors, and a mark stays at 90. The posted value is stored on the cycle. While the cycle is not terminal, the form is a disabled fieldset filled from that cycle. Judge and improver are blank until posted. The option `manual` is I'll score it or I'll rewrite it. That step waits for a form post (`manual-judge` needs `score` and `reasons`; `manual-improve` needs the next prompt). The rewrite form shows the score and the reason. A writer improver is given the same score and reason in its prompt. The loop stops when `score` reaches `passScore`, the person posts `intent=stop`, `currentRound + 1` reaches `maxRounds`, or 3 judged scores in a row do not beat the best score (`PROMPT_SDLC_STALL_ROUNDS`). Finish posts `intent=stop`, saves status `stopped` with “Finished. The best prompt is the result.”, and SIGTERMs the writer. That run counts as complete: `useThisPrompt` is true for `passed` and `stopped`. Each writer reply stores its reported tokens (`judgement.tokens` for a score, `writerTokens` for a rewrite). The page and each finished score step show the sum through that round. The snapshot field is `totalTokens`. Codex is started with `--json` so its usage is on stdout. A writer that reports no usage adds nothing. The next rewrite always starts from the highest scoring prompt (`choosePromptSdlcImproverReference`; a tie keeps the later round). Reasons from lower scores become an avoid list (`reconcilePromptSdlcAvoidReasons`). Earlier prompt text is not sent. After 3 tries that do not beat the best (`PROMPT_SDLC_STALL_ROUNDS`), the run stops and `formatPromptSdlcStallStop` appends those reasons. A human rewrite form shows that best prompt and the avoid list. `maxRounds` defaults to 10 (`PROMPT_SDLC_MAX_ROUNDS`) and must be a whole number from 1 to 30. The form field is `maxRounds`. A score without a reason is rejected. A successful writer check is stored in `prompt-sdlc-writer-ready.json` and cleared when that writer’s reply fails.

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
4. On **`command.claude.run`**, `startAgentWitchClient.ts` may capture a **git worktree snapshot** before spawn and append a one-line **git verdict** to the Mac run report `details` after completion when the project folder is a git repo (`captureAgentWitchGitWorktreeSnapshot`, `formatAgentWitchGitWorktreeVerdict` under `apps/live/features/projects/internal/core/knowledge/`). See [Chapter 10](10-learning-memory-and-improvements.md).

**Requires** `npm run dev` or `npm run start` — not `npm run dev:next` alone.

Test from browser: **`/ws-test`** on AWC.

---

## Watchdog and self-update (macOS)

| LaunchAgent                | Manual check                      |
| -------------------------- | --------------------------------- |
| `com.agent-witch-watchdog` | `npm run agent-witch:watchdog`    |
| `com.agent-witch-updater`  | `npm run agent-witch:self-update` |

Install bundle version API: `GET /install/agent-witch/version`.

Self-update resolves the app origin from `config.json` `wsUrl`, then from `install-version.json` `appOrigin`. When both are missing, it uses `AGENT_WITCH_DEFAULT_ORIGIN` (`https://www.agentwitch.com`), the same default AWL uses for the update offer. A missing local bundle version still counts as older than the remote bundle.

---

## Connect this Mac placeholders (HOME-059)

`POST /api/agent-witch/install-token` reserves a pairing token before AWI checks in. That row is a placeholder: `recordLastSeen: false`, so `last_seen_at` stays null and the list must not say **seen recently**. `revokePendingInstallDevicesForUser` then revokes older placeholders for that user (no hostname, display name, bundle version, handshake, or device key), keeps the newest, and clears a false `last_seen_at` on that kept row. `GET /api/agent-witch/devices` runs the same cleanup so a reload drops extras from repeated clicks. A later heartbeat (`touchAgentWitchDeviceLastSeen`) or `registerAgentWitchInstallFromMac` is what marks the computer seen. Named devices are not placeholders.

Failed browser calls to `http://127.0.0.1:47892/identity` and `:47893/identity` mean AWB is down. They do not insert device rows.

The click does not signal a running AWL. The Mac keeps `~/.agent-witch` until the install command runs. That command writes the new token when the config email matches (`buildAgentWitchInstallScriptConfigUpdateExisting`), restarts the LaunchAgent (`launchctl kickstart -k`), and `registerAgentWitchInstallFromMac` stamps the hostname onto the new row and revokes other active rows with that label. A Console delete removes the `agent_witch_devices` row (`deleteAgentWitchDevice`) after cancelling in-flight runs and queued dispatch. The live socket, and the next `agent.register` when the row is gone, send `system.error` with `errorCode` `unknown_identity`. Bundle 148+ (`forgetAgentWitchLocalConnection`) then stops LaunchAgents and deletes connection files plus `app/`. Project, harness, report, run, rag, and Ollama paths stay. A revoked row that still exists is “not linked” and does not wipe. Update local (`updateExistingInstall`) keeps the on-disk token, so it does not create a new identity. **Connect this Mac** inserts a known row before the Mac connects.

---

## Common agent mistakes

| Mistake                                      | Truth                                                                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| AWL reachable from AWC server-side fetch     | AWL is **loopback-only** on the user’s Mac                                                                          |
| AWB up ⇒ dispatch ready                      | Writer needs **live WSS on AWC** ([Q&A awc-mac-reconnecting](../../qa/awc-mac-reconnecting-vs-local-live.md))       |
| Point `wsUrl` at CHECK24 daily-magic host    | Production Mac uses **agentwitch.com** ([hosting doc](../../product/repo-name-and-hosting.md))                      |
| Folder picker in AWC for Mac paths           | Use AWL/AWB `select-folder` ([Q&A awc-project-folder-path-picker](../../qa/awc-project-folder-path-picker.md))      |
| Stamp `last_seen_at` on install-token insert | Each click looks like a live Mac (HOME-059). Leave `last_seen_at` null until check-in and revoke older placeholders |
| Set `revoked_at` and leave the Mac running   | The identity stays known, so a later connect will not forget the local link (HOME-060)                              |

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
