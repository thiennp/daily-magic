# Agent Witch Local — macOS menu bar app

SwiftUI `MenuBarExtra` companion for the existing AWI install (`~/.agent-witch`). Starts/stops the same LaunchAgent core; never rewrites the install bundle.

## First-run bootstrap

When core is **not** installed, the app runs a PKCE bootstrap against AWC:

`Checking → Signing in → Installing → Setting up → Connected`

(or `Error` with Retry + a copyable generic `curl … | bash` fallback). Callback URL scheme: `agentwitch-local://install`.

- **Install script PATH.** A Finder-launched app only has `/usr/bin:/bin:/usr/sbin:/sbin`. The script runs with `buildInstallScriptPath`: the login shell's `node` dir (`$SHELL -lc 'command -v node'`, 3 s cap), `/opt/homebrew/bin`, `/usr/local/bin`, `~/.local/bin`, then the inherited PATH.
- **Health identity.** `127.0.0.1:43347` is shared by every macOS user, so a 2xx from `/health` is not enough. AWL's `/health` reports `osUid` and `installRootName` (non-secret). The app counts it as Connected / Running only when `osUid == getuid()` and `installRootName` (if present) is `.agent-witch`. If another user's or install's AWL answers, Setting up fails fast with a clear error. An older AWL without `osUid` is **unverified** and never shown as Connected: Setting up fails fast with "Agent Witch Local needs an update…", and the menu shows that same actionable message (not Stopped) until the bundle self-updates or is reinstalled.

## Build

```bash
swift test --package-path apps/mac
bash scripts/mac/build-awl-mac-dmg.sh
```

Produces `dist/mac/AgentWitchLocal.dmg` + `.sha256` (macOS only). The DMG build registers `CFBundleURLTypes` for `agentwitch-local`.

Signing: with `DEVELOPER_ID_APPLICATION` + notary credentials in env the build is Developer ID signed (hardened runtime, `AgentWitchLocal.entitlements`), notarized and stapled (DMG + `AgentWitchLocal.zip`); without them it falls back to ad-hoc and logs it. `--dry-run` runs the real ad-hoc build + local verify and prints the Developer ID / notary commands with secrets masked. See [docs/agent-witch/awl-mac-signing-notarization.md](../../docs/agent-witch/awl-mac-signing-notarization.md) and [KNOWN_ISSUES.md](KNOWN_ISSUES.md).

## Release

Manual only (no GitHub Actions): build with `AWL_MAC_SIGNING=developer-id`, `gh release create awl-mac-vX.Y.Z`, then bump `AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG` on `main`. Steps: [docs/agent-witch/local-release-path.md](../../docs/agent-witch/local-release-path.md#awl-mac).

## Note

This folder is **not** a separate deployable in `deployables.registry.json` (schema is fixed to AWC/AWL/AWB/AWI). It is a packaging surface for AWL/AWI.

## Icons

- App icon: `AppIcon.icns` (from `AppIcon.iconset/`, built with `iconutil`).
- Menu bar: `Resources/MenuBarIconTemplate{,@2x}.png` (black + alpha). Copied into
  `Contents/Resources` by `scripts/mac/build-awl-mac-dmg.sh` and loaded via
  `Bundle.main` (not SPM `Bundle.module`).
- Regenerate all desktop icons: `bash scripts/agentWitchLocal/generateDesktopIcons.sh` then on macOS `iconutil -c icns -o apps/mac/AppIcon.icns apps/mac/AppIcon.iconset`.
