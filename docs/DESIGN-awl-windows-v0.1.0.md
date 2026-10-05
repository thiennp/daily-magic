# Design: awl-windows-v0.1.0 (box staging)

## Pattern (Linux)

- App: `apps/desktop` (Go tray, linux-only via `platform_linux.go`)
- Package: `scripts/linux/build-awl-linux-packages.sh` → `.deb` + AppImage under `dist/linux/`
- Non-Linux: `platform_stub.go` (`!linux`) exits: "this build only supports Linux"

## Windows stage (smallest match)

- Script: `scripts/windows/build-awl-windows-wsl.sh` → zip under `dist/windows/`
- Assets: `icon.ico` + README + WSL-RUNNER + release-notes stub
- Default: **no .exe** in the zip (do not ship today's stub)
- Optional probe only: `ALLOW_STUB_EXE=1` (still non-functional; not for release)

## Real .exe host (when backend lands)

1. Implement Windows/WSL `Platform` in `apps/desktop` (drive AWL via `wsl.exe` / systemd in WSL).
2. Build on **Windows amd64 + Go 1.24+** (preferred), or try `GOOS=windows GOARCH=amd64 CGO_ENABLED=0` if systray stays pure-Go.
3. Tag `awl-windows-v0.1.0` only after Arch SHIP + suite green + Lead/Thien GO.

## Box status (this staging)

- Cross-compile on box: **NOT RUN** (HEAVY HOLD / RAM Guard). Deferred to Mac.
- No push, no tag/release from this stage.
