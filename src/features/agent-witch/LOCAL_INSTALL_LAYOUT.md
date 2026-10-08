# AgentWitch local install layout

Complete on-disk layout for the computer AgentWitch install folder after bundle **v74** (profile-scoped storage, bundled client, no local `npm install`).

Paths below use production defaults (`~/.agent-witch`). Local development against `localhost` uses the same tree under `~/.local-agent-witch` with different LaunchAgent labels and wake port — see [Local vs production](#local-vs-production).

---

## Top-level tree (multi-profile, typical)

When installed with `--email user@example.com` (or `AGENT_WITCH_PROFILE` / `active-profile.json`), per-account data lives under `profiles/<email>/`. The install root holds shared app binaries and install-wide metadata.

```
~/.agent-witch/
├── host-services.json               # AWL-ISO-1 B: enable per-account launchd services/units
├── host-services-migration.json     # AWL-ISO-4: last 20 migration attempts (migrated / rolled_back)
├── host-services-migration.lock     # AWL-ISO-4: held while one process migrates
├── backups/host-services-<ts>/      # AWL-ISO-4: pre-migration copies + manifest.json (rollback source)
├── active-profile.json              # Last active profile email (install-wide)
├── install-version.json             # Shipped bundle version + app origin
├── wake-port.json                   # Local wake HTTP server port (47892 prod / 47893 local)
├── link-code.txt                    # Optional pairing link code (local app UI)
├── watchdog-reinstall-state.json    # Cooldown state for watchdog reinstall attempts
├── local-app-accounts.json          # Host-written: one row per account {email, port, pid, startedAt}
├── local-folder-claims.json         # Folder claims per account + projectId (AWL-ISO-2 guard)
├── folder-write-locks/              # <sha256(folder)>.json while a CLI writer runs (AWL-ISO-2)
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
        ├── wake-port.json           # Account-specific wake HTTP port (AWL-ISO-1)
        ├── config.json              # wsUrl, pairingToken, device label, writerExecutionBackend (cli|api), …
        ├── writer-api-secrets.json  # Optional provider API keys (mode 600); not synced to cloud
        ├── device-keypair.json      # Ed25519 device credentials (per profile)
        ├── connection-health.json   # Last hub ack / WS connection snapshot
        ├── automations.json         # Locally scheduled automations
        ├── pending-run-inputs.json  # Mid-run [[AWAITING_INPUT]] sessions
        ├── run-completion-outbox.json # Cloud completion retries when offline
        ├── token-saver.db            # Local pitfall registry cache (SQLite; token-saver step 1)
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
        ├── project-data/                # Opt-in project computer history + skill mirrors (by projectId)
        │   └── <projectId>/
        │       ├── history/             # Durable project.message.history records
        │       └── skills/              # Published skill mirrors (vNNNN.md + meta.json)
        │           ├── _drafts/
        │           └── _tombstones/
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

## Per-account host services (AWL-ISO-1)

When `host-services.json` is present in the install root, the host launcher operates in "per-account" mode.

- **Labels & Units**: Each account gets a unique hash (first 12 chars of SHA-256 of the sanitized email) and its own service: `com.agent-witch.<hash>` (macOS) or `agent-witch-<hash>.service` (Linux).
- **Lease Files**: Each account gets its own lock lease in `os.tmpdir()`: `com.agent-witch.<hostname>.<hash>.lease.json`.
- **Wake Ports**: Each account gets a dedicated wake HTTP port, persisted in `profiles/<email>/wake-port.json`.
- **Process Isolation**: The host process uses `AGENT_WITCH_HOST_ACCOUNT` in its environment to ensure it only manages its own account's profiles and never kills sibling processes belonging to other accounts.
- **Launcher**: the legacy `com.agent-witch` LaunchAgent / `agent-witch.service` unit stays installed and runs the launcher: it starts every account service (never restarts a running one) and idles. Stopping it (old AWL "Stop", `systemctl --user stop agent-witch.service`) stops every account host too.

### Migration (AWL-ISO-4)

On the first host start of a bundle with this code, an install with two or more paired profiles (`profiles/<email>/config.json`) and no `host-services.json` is moved to per-account services. An install with one profile is left alone. Steps, under `host-services-migration.lock`:

1. Back up every file the migration may write (legacy + account plists or units, root `wake-port.json`, `local-app-accounts.json`, `host-services.json`, per-profile `wake-port.json` / `local-app-port.json`) to `backups/host-services-<ts>/` with a manifest. Pairing configs and device keys are never copied or changed.
2. Give each account its own wake port, write its LaunchAgent (macOS) or systemd user unit (Linux under systemd; otherwise setsid supervision), then `host-services.json`.
3. Start the account hosts and wait up to 45 s for each to answer `/health` with its own `profileEmail`. Account hosts keep the AWL ports recorded in `local-app-accounts.json`.
4. On success the migrating process becomes the launcher. On failure the account services are stopped and disabled, the backup is restored, the attempt is recorded as `rolled_back`, and the host continues as before. The migration is not retried until the next bundle.

Re-running is idempotent (noop). A profile added later is added to `host-services.json` the same way, and existing rows are not changed.

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

| Path                            | Purpose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host-services.json`            | `{ "version": 1, "mode": "per-account", "accounts": [...] }` — AWL-ISO-1 switch to spawn one host process per account.                                                                                                                                                                                                                                                                                                                                                                    |
| `active-profile.json`           | `{ "email": "user@example.com" }` — default profile when env is unset                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `install-version.json`          | `{ "bundleVersion", "appOrigin", "updatedAt" }` — compared to hub on heartbeat for auto-update                                                                                                                                                                                                                                                                                                                                                                                            |
| `wake-port.json`                | `{ "wakePort": 47892 }` — **source of truth** for the wake HTTP port. Resolution order: this file → `AGENT_WITCH_WAKE_PORT` (LaunchAgent / systemd) → 47892 / 47893. The installer writes the same value into both the file and every plist / unit; if the wake server has to move ports, it rewrites the file and the LaunchAgent plists together; on start the client also rewrites a drifted plist `AGENT_WITCH_WAKE_PORT` to the file value (that key only, via `plutil`, no reload). |
| `link-code.txt`                 | Short code shown in local app linking UI                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `watchdog-reinstall-state.json` | `{ "lastAttemptAt" }` — rate-limits watchdog reinstall                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `rag/chunks.ndjson`             | Global RAG embeddings when runs are not tied to a project folder                                                                                                                                                                                                                                                                                                                                                                                                                          |

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

### `project-data/<projectId>/`

Opt-in **project computer history** and published skill mirrors. Resolved from
`AGENT_WITCH_PROFILE_RELATIVE_PATHS.projectDataDir` as
`<installRoot>/profiles/<sanitizedEmail>/project-data/<projectId>/`
(or `<installRoot>/project-data/<projectId>/` when no profile email is set).

Do **not** use the deprecated local projects registry or `projectFolderPath`
for this tree. Dirs are `0700`, files `0600`, writes are atomic (temp + rename).

```
project-data/<projectId>/
├── history/                 # One file per project.message.history messageId
└── skills/
    ├── <skillId>/
    │   ├── vNNNN.md         # 4-digit zero-padded version body
    │   └── meta.json        # { skillId, version, contentHash, updatedAt }
    ├── _drafts/
    └── _tombstones/
        └── <skillId>.json   # { skillId, revokedAt, lastContentHash }
```

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

| Path                                         | Purpose                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `/tmp/com.agent-witch.<hostname>.lease.json` | Machine lease — prevents duplicate clients on same computer (`claimAgentWitchMachineLease`) |

---

## Local vs production

| Origin           | Install dir            | Wake port | LaunchAgent prefix      |
| ---------------- | ---------------------- | --------- | ----------------------- |
| `agentwitch.com` | `~/.agent-witch`       | `47892`   | `com.agent-witch`       |
| `localhost`      | `~/.local-agent-witch` | `47893`   | `com.local-agent-witch` |

Override install root with `AGENT_WITCH_HOME`. Override profile with `AGENT_WITCH_PROFILE` or `AGENT_WITCH_EMAIL`.

**AWL** (AgentWitch Local; not inside install dir): `http://127.0.0.1:43347`. See [agent-witch-deployables.md](../../../docs/product/agent-witch-deployables.md).

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
