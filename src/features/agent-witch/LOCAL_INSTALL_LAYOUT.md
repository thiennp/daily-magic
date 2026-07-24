# Agent Witch local install layout

Complete on-disk layout for the Mac Agent Witch install folder after bundle **v74** (profile-scoped storage, bundled client, no local `npm install`).

Paths below use production defaults (`~/.agent-witch`). Local development against `localhost` uses the same tree under `~/.local-agent-witch` with different LaunchAgent labels and wake port — see [Local vs production](#local-vs-production).

---

## Top-level tree (multi-profile, typical)

When installed with `--email user@example.com` (or `AGENT_WITCH_PROFILE` / `active-profile.json`), per-account data lives under `profiles/<email>/`. The install root holds shared app binaries and install-wide metadata.

```
~/.agent-witch/
├── active-profile.json              # Last active profile email (install-wide)
├── install-version.json             # Shipped bundle version + app origin
├── wake-port.json                   # Local wake HTTP server port (47892 prod / 47893 local)
├── link-code.txt                    # Optional pairing link code (local app UI)
├── watchdog-reinstall-state.json    # Cooldown state for watchdog reinstall attempts
│
├── app/                             # Shipped binaries (shared across profiles)
│   ├── agent-witch.js               # Bundled Mac client (Node entry; includes ws)
│   ├── deps/                        # Extracted on install/update from deps.tar.gz
│   │   └── node-pty/
│   │       ├── lib/                 # JS bindings + worker
│   │       ├── package.json
│   │       └── prebuilds/
│   │           ├── darwin-arm64/
│   │           │   ├── pty.node
│   │           │   └── spawn-helper
│   │           └── darwin-x64/
│   │               ├── pty.node
│   │               └── spawn-helper
│   └── command/                     # Shell wrappers (generated at install)
│       ├── run.sh                   # LaunchAgent entry; redirects stdout/stderr to profile logs
│       ├── wake.sh                  # `node app/agent-witch.js wake`
│       ├── watchdog.sh              # In-process watchdog tick
│       ├── self-update.sh           # `node app/agent-witch.js self-update`
│       ├── ensure-writer.sh         # Installs Claude / Cursor / Codex CLIs if missing
│       └── automation-scheduler.sh  # Stub (automations run in-process in main client)
│
├── rag/                             # Install-wide RAG fallback (when no project folder)
│   └── chunks.ndjson
│
└── profiles/
    └── user@example.com/            # Sanitized lowercase email
        ├── config.json              # wsUrl, pairingToken, device label, writer prefs, …
        ├── device-keypair.json      # Ed25519 device credentials (per profile)
        ├── connection-health.json   # Last hub ack / WS connection snapshot
        ├── automations.json         # Locally scheduled automations
        ├── pending-run-inputs.json  # Mid-run [[AWAITING_INPUT]] sessions
        ├── run-completion-outbox.json # Cloud completion retries when offline
        │
        ├── logs/
        │   ├── agent-witch.log          # Main client stdout (runtime redirect from run.sh)
        │   ├── agent-witch.error.log    # Main client stderr
        │   ├── local-ws-traffic.ndjson  # Local :43347 traffic log
        │   ├── watchdog-log.ndjson      # Watchdog events
        │   └── self-update-log.ndjson   # Self-update events
        │
        ├── reports/
        │   └── <report-key>.json        # Agent run report JSON (profile-scoped)
        │
        ├── runs/
        │   └── <run-id>.json            # Local agent run records
        │
        ├── projects/                    # Default Mac project folders
        │   └── default/                 # Slug of "Default" project name
        │       └── .agent-witch/        # Per-project metadata (inside project tree)
        │           ├── project.json
        │           ├── rag/
        │           │   └── chunks.ndjson
        │           ├── memory/
        │           │   └── runs.ndjson
        │           └── reports/         # Legacy per-project reports dir (superseded by profile reports/)
        │
        └── harness/                     # Cursor harness files synced from cloud
            ├── manifest.json            # Version 1 manifest (sets, items, host)
            ├── shared/
            │   └── items/               # Shared harness item files
            └── sets/
                └── <set-slug>/          # One folder per installed harness set
                    ├── rules/
                    ├── skills/
                    ├── commands/
                    ├── instructions/
                    ├── agents/
                    └── …                # Item files referenced from manifest.json
```

---

## Legacy single-profile layout (no `profiles/`)

If no profile email is configured, the same per-profile paths collapse to the install root:

```
~/.agent-witch/
├── config.json
├── device-keypair.json
├── connection-health.json
├── automations.json
├── pending-run-inputs.json
├── run-completion-outbox.json
├── logs/
│   └── …
├── reports/
│   └── …
├── runs/
│   └── …
├── projects/
│   └── …
├── harness/
│   └── …
└── app/
    └── …
```

New installs should use a profile email so accounts stay isolated.

---

## Install root files (detail)

| Path                            | Purpose                                                                                        |
| ------------------------------- | ---------------------------------------------------------------------------------------------- |
| `active-profile.json`           | `{ "email": "user@example.com" }` — default profile when env is unset                          |
| `install-version.json`          | `{ "bundleVersion", "appOrigin", "updatedAt" }` — compared to hub on heartbeat for auto-update |
| `wake-port.json`                | `{ "wakePort": 47892 }` — persisted wake server port                                           |
| `link-code.txt`                 | Short code shown in local app linking UI                                                       |
| `watchdog-reinstall-state.json` | `{ "lastAttemptAt" }` — rate-limits watchdog reinstall                                         |
| `rag/chunks.ndjson`             | Global RAG embeddings when runs are not tied to a project folder                               |

---

## `app/` (shared binaries)

| Path                 | Purpose                                                                                                              |
| -------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `app/agent-witch.js` | Single bundled client: WebSocket bridge, wake server, local UI, shell sessions, self-update, automations             |
| `app/deps/node-pty/` | Native PTY dependency (darwin prebuilds only); extracted from `deps.tar.gz` at install — archive is not kept on disk |
| `app/command/*.sh`   | Thin bash wrappers; LaunchAgents and terminal commands invoke these                                                  |

**Removed in v71+ (cleaned on install/update):** `package.json`, `package-lock.json`, `node_modules/`, install-root `command/`, install-root `agent-witch.js`.

---

## Profile files (detail)

| Path                         | Purpose                                                       |
| ---------------------------- | ------------------------------------------------------------- |
| `config.json`                | Hub `wsUrl`, `pairingToken`, optional writer/install metadata |
| `device-keypair.json`        | Ed25519 public/private keypair for device auth                |
| `connection-health.json`     | `{ lastAckAt, wsUrl, connectedAt }` for watchdog/revive       |
| `automations.json`           | `{ version: 1, automations: [...] }` local schedule store     |
| `pending-run-inputs.json`    | Map of run id → mid-run input checkpoint                      |
| `run-completion-outbox.json` | Queued cloud run completions when hub is unreachable          |

### `logs/`

| File                      | Purpose                                     |
| ------------------------- | ------------------------------------------- |
| `agent-witch.log`         | Main process stdout (via `run.sh` redirect) |
| `agent-witch.error.log`   | Main process stderr                         |
| `local-ws-traffic.ndjson` | NDJSON log of local HTTP/WS on `:43347`     |
| `watchdog-log.ndjson`     | Watchdog tick / revive events               |
| `self-update-log.ndjson`  | Bundle check / apply / failure events       |

### `reports/`

| Pattern             | Purpose                                                              |
| ------------------- | -------------------------------------------------------------------- |
| `<report-key>.json` | Pre-estimate and run report payloads (`buildAgentRunReportFilePath`) |

### `runs/`

| Pattern         | Purpose                          |
| --------------- | -------------------------------- |
| `<run-id>.json` | Local `AgentRunRecord` snapshots |

### `projects/<slug>/`

User-visible project working directories. Each project may contain:

```
projects/<slug>/
└── .agent-witch/
    ├── project.json       # { projectFolderPath, projectId?, name?, createdAt }
    ├── rag/chunks.ndjson  # Project-scoped RAG chunks
    └── memory/runs.ndjson # Project-scoped memory / prior turn context
```

Default project path: `~/.agent-witch/profiles/<email>/projects/default`.

### `harness/`

Installed from cloud harness bundles (`applyHarnessInstallBundle`):

| Path                        | Purpose                                                       |
| --------------------------- | ------------------------------------------------------------- |
| `manifest.json`             | Harness manifest v1: hostname, sets, item paths, active slugs |
| `sets/<slug>/rules/`        | Rule files for set `<slug>`                                   |
| `sets/<slug>/skills/`       | Skill files                                                   |
| `sets/<slug>/commands/`     | Command playbooks                                             |
| `sets/<slug>/instructions/` | Instruction files                                             |
| `sets/<slug>/agents/`       | Agent definitions                                             |
| `shared/items/`             | Cross-set shared item content                                 |

---

## macOS LaunchAgents (outside install dir)

Registered under `~/Library/LaunchAgents/`:

| Plist label                      | Runs                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `com.agent-witch.plist`          | `~/.agent-witch/app/command/run.sh` (main client; one agent per install home) |
| `com.agent-witch-wake.plist`     | Wake HTTP server (`wake.sh` → `agent-witch.js wake`)                          |
| `com.agent-witch-watchdog.plist` | Periodic watchdog (`watchdog.sh`)                                             |

Local dev uses `com.local-agent-witch*` and `~/.local-agent-witch/`.

Legacy per-email LaunchAgent labels (`com.agent-witch.<email>`) are retired; install removes auxiliary agents on update.

---

## Runtime file outside install dir

| Path                                         | Purpose                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------- |
| `/tmp/com.agent-witch.<hostname>.lease.json` | Machine lease — prevents duplicate clients on same Mac (`claimAgentWitchMachineLease`) |

---

## Local vs production

| Origin           | Install dir            | Wake port | LaunchAgent prefix      |
| ---------------- | ---------------------- | --------- | ----------------------- |
| `agentwitch.com` | `~/.agent-witch`       | `47892`   | `com.agent-witch`       |
| `localhost`      | `~/.local-agent-witch` | `47893`   | `com.local-agent-witch` |

Override install root with `AGENT_WITCH_HOME`. Override profile with `AGENT_WITCH_PROFILE` or `AGENT_WITCH_EMAIL`.

Local debug UI (not inside install dir): `http://127.0.0.1:43347` (`local.agentwitch.com` DNS → loopback).

---

## Migrations from older layouts

| Legacy path                                           | Current path                                                            |
| ----------------------------------------------------- | ----------------------------------------------------------------------- |
| `~/.agent-witch/device-keypair.json`                  | `profiles/<email>/device-keypair.json` (migrated on first profile load) |
| `~/.agent-witch/logs/agent-witch*.log`                | `profiles/<email>/logs/agent-witch*.log` (migrated on client startup)   |
| `{project}/.agent-witch/reports/*.json`               | `profiles/<email>/reports/*.json`                                       |
| `~/.agent-witch/command/`                             | `~/.agent-witch/app/command/`                                           |
| `~/.agent-witch/agent-witch.js` + loose `.ts` scripts | `~/.agent-witch/app/agent-witch.js` (single bundle)                     |
| `~/.agent-witch/package.json` + `node_modules/`       | Removed; `ws` bundled, `node-pty` in `app/deps/`                        |

---

## Source of truth in repo

| Concern                            | Module                                                   |
| ---------------------------------- | -------------------------------------------------------- |
| Path resolution                    | `scripts/resolveAgentWitchLocalLayout.ts`                |
| Install script layout              | `src/lib/agentWitch/buildAgentWitchInstallScript*.ts`    |
| Project meta under `.agent-witch/` | `scripts/resolveAgentWitchProjectStorageLayout.ts`       |
| Harness tree planning              | `src/lib/agentWitch/harness/planHarnessInstallBundle.ts` |
| Bundle version                     | `src/lib/agentWitch/agentWitchInstallBundleVersion.ts`   |
