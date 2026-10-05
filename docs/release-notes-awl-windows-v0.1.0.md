# Agent Witch Local Windows / WSL v0.1.0 (draft)

**Tag (planned, not created):** `awl-windows-v0.1.0`

**Status:** packaging stage only. Do not publish this GitHub release until Arch SHIP + suite green + AW Lead / Thien GO for the desktop tag.

## What this release is for

Windows companion zip for Agent Witch Local, matching the Linux tray packaging pattern (`awl-linux-v0.1.0` AppImage + `.deb`). The Agent Witch install itself runs under **WSL2**; the Windows `.exe` (when ready) is a tray/control surface that drives that WSL install.

## Assets (planned)

| Asset                                             | Purpose                                                                       |
| ------------------------------------------------- | ----------------------------------------------------------------------------- |
| `AgentWitchLocal-windows-amd64-v0.1.0.zip`        | Zip containing the Windows `.exe` (when built), `icon.ico`, and install notes |
| `AgentWitchLocal-windows-amd64-v0.1.0.zip.sha256` | Checksum                                                                      |
| `icon.ico`                                        | Staged Windows icon from `apps/desktop/assets/icon.ico`                       |

## What this draft branch adds

- Windows/WSL tray backend: `platform_windows.go` + `internal/windows` (drives AWL via `wsl.exe`)
- Packaging script: `scripts/windows/build-awl-windows-wsl.sh`
- Icons: `apps/desktop/assets/icon.ico` (and PNG tray embeds)
- Unsupported OS builds still hit `platform_stub.go` (`!linux && !windows`)
- Website download rows / release flags stay unchanged (Windows download remains hidden)

## Build / ship gates

1. Cross-compile or build the Windows `.exe`; produce the zip via `scripts/windows/build-awl-windows-wsl.sh`.
2. Windows VM e2e (WSL2 detect/start/stop/open/autostart) — still required before tag.
3. Mac suite green under `/tmp/awl-ci.lock`; Arch SHIP; Lead GO for tag.
4. Signing / SmartScreen / installer are out of scope for this draft.
5. `gh release create awl-windows-v0.1.0` with the zip + sha256 (manual; no Actions workflow).

## Interim (no .exe)

Use WSL directly:

```bash
# Inside WSL
curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash
systemctl --user enable --now agent-witch.service
```

Or from PowerShell: `wsl.exe -e bash -lc 'systemctl --user status agent-witch.service'`.

## Unsigned

Like Linux/macOS desktop builds, the Windows binary will be unsigned; SmartScreen may warn on first run.
