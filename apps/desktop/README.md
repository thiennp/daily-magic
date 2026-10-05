# Agent Witch Local — Linux desktop tray

Go system-tray companion for the existing Agent Witch install (`~/.agent-witch` + systemd user unit `agent-witch.service`). Starts/stops the same Linux install from the tray; never rewrites the install bundle.

Version: `0.1.0`.

## Build (local)

```bash
# Low-memory friendly; produces .deb + AppImage + sha256 under dist/linux/
GOFLAGS=-p=1 GOMAXPROCS=2 GOMEMLIMIT=700MiB bash scripts/linux/build-awl-linux-packages.sh
```

Or build the binary only:

```bash
cd apps/desktop
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags "-s -w" -o agent-witch-local ./cmd/agent-witch-local
```

## Tests

```bash
cd apps/desktop
GOFLAGS=-p=1 GOMAXPROCS=2 GOMEMLIMIT=700MiB go test ./...
```

## Releases

Releases are **manual only**. Cut a GitHub release with the owner’s explicit go via `gh release create` (tag `awl-linux-v0.1.0`, assets from `dist/linux/`). Do not add GitHub Actions workflows for this.

## Notes

- linux/amd64 only (matches the Linux installer).
- Tray uses DBus StatusNotifierItem (`fyne.io/systray`); stock GNOME needs the AppIndicator extension.
- Install Agent Witch via the terminal command first, then run this tray app.
- Start = `systemctl --user enable --now` (survives re-login). Stop = `systemctl --user disable --now` (does not return after re-login). No separate launch-at-login toggle.
- State machine: `internal/core/transition_table.go` (allowed edges) + `apply_state_transition.go` (the only state writer). Starting/Stopping time out to Error after 30s; Stopping completes on `systemctl --user is-active` = inactive. Poll results carry the generation they started at and are dropped if a newer transition happened.
- Tray autostart (`~/.config/autostart`) is not wired yet.
- This folder is **not** a separate deployable in `deployables.registry.json` (schema is fixed to AWC/AWL/AWB/AWI). It is a packaging surface for AWL/AWI.

## Icons

Tray glyph (`assets/icon.png`, also `tray-22/24.png`) is monochrome **white + alpha** from
`assets/icon-mark-mono.svg` (same plus+slash paths as `src/app/icon.svg`) so it reads on dark
GNOME/Ubuntu panels. Black variants (`tray-dark-glyph-{22,24,32}.png`) are kept for a future
light-theme switch but are not wired. Full-color `.desktop` / AppImage / `.deb` icons are
`assets/icon-{48,256}.png` from `src/app/apple-icon.svg`. Windows `.ico` is `assets/icon.ico`
(for a future `.exe`). Regenerate: `bash scripts/agentWitchLocal/generateDesktopIcons.sh`.
