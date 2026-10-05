# Design: awl-windows-v0.1.0 (box staging)

## Pattern (Linux)

- App: `apps/desktop` (Go tray, `platform_linux.go` + `internal/linux`)
- Package: `scripts/linux/build-awl-linux-packages.sh` → `.deb` + AppImage under `dist/linux/`
- Unsupported OS: `platform_stub.go` (`!linux && !windows`) exits with a clear error

## Windows / WSL backend (this draft)

- `platform_windows.go` (`//go:build windows`) → `internal/windows.Backend`
- Windows tray binary runs on the Windows host and drives AWL inside the user's
  **default WSL distro** via injectable `wsl.exe` commands (`host.Runner`)
- Health / status use the same localhost ports as Linux (`127.0.0.1:43347`);
  WSL2 forwards localhost
- Pure argv builders + `wsl -l -v` parsers are untagged so unit tests run on Linux
- Open URL/file: `cmd.exe /c start "" <target>`
- Notifications: PowerShell balloon tip (no extra Go deps)
- Tray autostart: per-user Run registry key via `reg.exe`
  (`HKCU\Software\Microsoft\Windows\CurrentVersion\Run` / `AgentWitchLocal`) —
  simplest documented option (no Startup-folder `.lnk`/COM)
- Start/Stop inside WSL: `systemctl --user enable|disable --now agent-witch.service`
- Clear user-facing error when WSL is missing or has no distros

## Windows stage packaging

- Script: `scripts/windows/build-awl-windows-wsl.sh` → zip under `dist/windows/`
- Assets: `icon.ico` + README + WSL-RUNNER + release-notes stub
- Prefer building the real `.exe` once this backend lands:
  `GOOS=windows GOARCH=amd64 CGO_ENABLED=0` (fyne.io/systray supports Windows)
- Optional probe: `ALLOW_STUB_EXE=1` (legacy; not for release)
- **Do not** unhide website download rows or flip release flags in this draft

## Real .exe host / ship gates

1. Cross-compile or build on Windows amd64 + Go 1.24+
2. Windows VM e2e (WSL2 + tray start/stop/open/autostart) still required
3. Signing / SmartScreen / installer are out of scope for v0.1.0 draft
4. Tag `awl-windows-v0.1.0` only after Arch SHIP + suite green + Lead/Thien GO

## Box status

- Go build/vet/test under RAM Guard caps (see agent notes)
- No tag/release from this stage; branch push via Mac bundle path only
