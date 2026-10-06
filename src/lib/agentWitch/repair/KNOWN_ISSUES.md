# AWL update + repair — known issues

`/install/agent-witch-update.sh` (and the legacy alias `/install/agent-witch-repair.sh`) serve
`renderRepairAgentWitchScript`: stop AWL, back up config + identity, remove app files, run the
embedded update installer (`renderUpdateAgentWitchScript`), restore lost identity, verify the
version and `GET http://127.0.0.1:43347/health`. Tests use `AWLR-` IDs.

Linux e2e (throwaway HOME, no daemons):
`npx tsx scripts/agentWitchRepair/renderAgentWitchRepairE2eScripts.ts /tmp/awlr && REPAIR_SCRIPT=/tmp/awlr/agent-witch-update.sh BUNDLE_DIR=public/install/agent-witch/app bash scripts/agentWitchRepair/runAgentWitchRepairE2e.sh`

Test flags: `AWL_REPAIR_NO_START=1` (no stop/start; installer's launchctl/systemctl/brew/ollama/open
hit no-op shims), `AWL_REPAIR_FORCE=1` (reinstall even when healthy), `AWL_REPAIR_INSTALLER_FILE`
(run a local installer instead of the embedded one), `AWL_REPAIR_ORIGIN`, `AWL_REPAIR_HEALTH_URL`,
`AWL_REPAIR_HEALTH_TIMEOUT`.

---

## AWLR-OPEN-001 — No real macOS / Windows end-to-end yet

Covered: Linux e2e on a box (36 checks) and a macOS bash 3.2 simulation in a throwaway HOME with
a stub installer. Not covered: real launchd stop/start + `/health` on macOS (needs a VM or a
separate macOS user), and Windows + WSL2 (`wsl.exe -e bash -lc …`).

## AWLR-OPEN-002 — Re-run on a healthy, current install is a no-op

The update URL used to always reinstall. It now exits "already healthy" when the installed
bundle equals the latest and `/health` answers for this user. Force with `AWL_REPAIR_FORCE=1`.

## AWLR-OPEN-003 — WSL without systemd reports a health failure

The installer only prints "systemctl not found" when WSL has no systemd. The repair then fails
the health check with a hint (enable `[boot] systemd=true` in `/etc/wsl.conf`, or run
`app/command/run.sh`). Files and identity are fine; re-run after enabling systemd.

## AWLR-OPEN-004 — Changed (not missing) keypair after reinstall is kept, not reverted

If `device-keypair.json` exists but differs from the backup after reinstall, the repair keeps the
new file and warns (the old copy stays in `repair-backups/`). Only missing files and a lost
`pairingToken` are restored automatically.

## AWLR-OPEN-005 — Backups are not pruned

Each repair that removes files adds `INSTALL_DIR/repair-backups/<UTC>-<pid>/` (top-level config
files only, mode 700). No-op runs add none. Nothing deletes old backups yet.

## AWLR-FLOOR-001 — Connect floor is bundle 76 (lowest that self-updates reliably)

`AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION` is `"76"` (was `"35"`). Below 76 the server
answers Connect / restart / dispatch / `register-install` with the 409 `agent_witch_local_too_old`,
and the fix is the repair one-liner (`/install/agent-witch-update.sh`; Windows:
`AGENT_WITCH_REPAIR_WINDOWS_COMMAND`).

Why 76. A running AWL updates itself in-process (`runAgentWitchSelfUpdate`). It is triggered
over its WebSocket (heartbeat ACK, bundle 32+; `install.bundle.update` push, 38+). It downloads
the manifest's `app/agent-witch.js` and `app/deps.tar.gz`, unpacks the deps, and restarts. The
old `app/command/run.sh` then runs `node app/agent-witch.js`.

- 67–70 (`ab25ac7a`…): the ESM bundle needs the npm `node_modules`. Install root
  `package.json` is `"type": "module"`, so the new CommonJS bundle would load as ESM. Self-update
  writes downloads as UTF-8 text (breaks `deps.tar.gz`) and never unpacks it.
- 71–75 (`1bbbccf3`…`c87e1a5e`): the ESM bundle crashes on start with
  `Dynamic require of "events" is not supported`, from bundled `ws`. So the WebSocket never
  opens, and no update trigger arrives. Fixed in 76 (`8ce0fcb6`, CommonJS bundle + Node gate).
- Before 67: the multi-file `tsx` layout, run from `command/`, not `app/`.
- 76: verified on a box. Bundle 76 ran `self-update` against a local copy of 265. It updated
  76 → 265, unpacked deps and wrote `install-version.json` = 265. Started the way `run.sh` does,
  `/health` returned `ok:true, installBundleVersion:"265"`. A 75 bundle can only be updated by
  hand (`self-update.sh`), not automatically.

## AWLR-OPEN-006 — Resolved in bundle 266: AWL starts on Node 20+ without `node:sqlite`

Bundle 265 imported `node:sqlite` at load (`openPitfallDb`, since `8f827e3c`). On Node 20 and
22.12 it exited with `ERR_UNKNOWN_BUILTIN_MODULE`. Installs and repairs only required Node 20.

Bundle 266 loads it at first use (`loadNodeSqlite`: `process.getBuiltinModule("node:sqlite")`,
cached). Without it, only the pitfall cache is off: `check_context` (MCP tool, HTTP
`/api/local/check-context`, Claude hook) answers `none`. The AWL Projects pitfalls tab falls
back to cloud only (no local cache or hit counts). The local app logs one line at start:
`Pitfall cache (check_context) is off: Node vX has no node:sqlite (needs Node 22.13+)`.

Install / update / repair:

- Hard gate is unchanged: Node 20.
- The repair checks Node in preflight, before stopping or removing anything. If Node is missing
  or older than 20, it stops with one line ("needs Node.js 20 or newer … Nothing was changed").
- The installer prints one note when Node runs AWL but lacks `node:sqlite` (Node 22.13+ for
  every feature). It does not auto-upgrade Node on macOS (no Homebrew without a prompt).
- The Linux Node tarball URL now has the `v` prefix. `nodejs.org/dist/22.14.0/` was a 404, so
  Linux auto-provisioning never worked before.
