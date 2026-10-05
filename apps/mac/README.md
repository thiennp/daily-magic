# Agent Witch Local — macOS menu bar app

SwiftUI `MenuBarExtra` companion for the existing AWI install (`~/.agent-witch`). Starts/stops the same LaunchAgent core; never rewrites the install bundle.

## First-run bootstrap

When core is **not** installed, the app runs a PKCE bootstrap against AWC:

`Checking → Signing in → Installing → Setting up → Connected`

(or `Error` with Retry + a copyable generic `curl … | bash` fallback). Callback URL scheme: `agentwitch-local://install`.

## Build

```bash
swift test --package-path apps/mac
bash scripts/mac/build-awl-mac-dmg.sh
```

Produces `dist/mac/AgentWitchLocal.dmg` + `.sha256` (macOS only). The DMG build registers `CFBundleURLTypes` for `agentwitch-local`.

## Note

This folder is **not** a separate deployable in `deployables.registry.json` (schema is fixed to AWC/AWL/AWB/AWI). It is a packaging surface for AWL/AWI.

## Icons

- App icon: `AppIcon.icns` (from `AppIcon.iconset/`, built with `iconutil`).
- Menu bar: `Sources/AgentWitchLocal/Resources/MenuBarIconTemplate{,@2x}.png` (black + alpha template).
- Regenerate all desktop icons: `bash scripts/agentWitchLocal/generateDesktopIcons.sh` then on macOS `iconutil -c icns -o apps/mac/AppIcon.icns apps/mac/AppIcon.iconset`.
