# Agent Witch Local — macOS menu bar app

SwiftUI `MenuBarExtra` companion for the existing AWI install (`~/.agent-witch`). Starts/stops the same LaunchAgent core; never rewrites the install bundle.

## Build

```bash
swift test --package-path apps/mac
bash scripts/mac/build-awl-mac-dmg.sh
```

Produces `dist/mac/AgentWitchLocal.dmg` + `.sha256` (macOS only).

## Note

This folder is **not** a separate deployable in `deployables.registry.json` (schema is fixed to AWC/AWL/AWB/AWI). It is a packaging surface for AWL/AWI.
