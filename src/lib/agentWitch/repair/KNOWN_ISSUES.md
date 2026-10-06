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
