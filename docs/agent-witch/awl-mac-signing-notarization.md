# AWL Mac app: Developer ID signing + notarization

`scripts/mac/build-awl-mac-dmg.sh` builds `AgentWitchLocal.app` and `AgentWitchLocal.dmg`.
The signing steps live in `scripts/mac/signing/`. When Apple credentials are in the environment,
the script makes a Developer ID signed, notarized and stapled build. Without credentials it
falls back to today's ad-hoc build and logs a clear line saying so.

## Modes

| Command                                                                   | What happens                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `bash scripts/mac/build-awl-mac-dmg.sh` (`AWL_MAC_SIGNING=auto`, default) | If `DEVELOPER_ID_APPLICATION` and notary credentials are set: Developer ID. Otherwise: ad-hoc fallback, logged as `[awl-sign] Developer ID credentials absent … falling back to ad-hoc signing`.                                                                                                                   |
| `--adhoc` or `AWL_MAC_SIGNING=adhoc`                                      | Forces the legacy ad-hoc path (`codesign --force --deep --sign -`), byte-for-byte the same as before.                                                                                                                                                                                                              |
| `AWL_MAC_SIGNING=developer-id`                                            | Exits early with an error unless all credentials are present. Use this for releases.                                                                                                                                                                                                                               |
| `--dry-run`                                                               | Does a real build and an ad-hoc **hardened-runtime** sign (same inside-out order and entitlements as Developer ID), then runs the local verify steps. It only **prints** the keychain, Developer ID codesign, `notarytool` and `stapler` commands, with secrets masked. Dry-run artifacts must never be published. |

If `DEVELOPER_ID_APPLICATION` is set but no notary credentials are, the script exits instead of
shipping a build that is signed but not notarized.

## Developer ID pipeline (real run)

1. Optional `.p12` import into a **temporary keychain** under `$TMPDIR/awl-sign.*`. The login
   keychain is never touched, and the temporary keychain is deleted by an EXIT trap.
2. Inside-out `codesign --force --options runtime --timestamp --sign "$DEVELOPER_ID_APPLICATION"`:
   - nested dylibs, frameworks and bundles first (no entitlements)
   - then helpers, XPC services and nested apps (with entitlements)
   - then `AgentWitchLocal.app` itself (with entitlements)
   - Today the bundle has no nested code: one universal Mach-O plus resources.
3. `codesign --verify --deep --strict`. Then the app is zipped with `ditto`, sent through
   `xcrun notarytool submit --wait --output-format json`, and stapled with
   `xcrun stapler staple`. If the result is not `Accepted`, the script prints `notarytool log`
   and fails.
4. `spctl -a -vv -t exec` and `stapler validate` on the app must pass. The stapled app is then
   zipped as `dist/mac/AgentWitchLocal.zip` (with a `.sha256` file).
5. DMG: built from the stapled app, then `codesign --timestamp`, notarize, staple, and verify.
   Verification uses `spctl -a -t open --context context:primary-signature -vv` and
   `stapler validate`. The `.sha256` file is written after stapling.

## Credentials (env vars / keychain profile, read at runtime)

| Env var                                                          | What                                                                                                                              | Where to get it                                                                                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEVELOPER_ID_APPLICATION`                                       | Codesign identity name, e.g. `Developer ID Application: Thien Nguyen (ABCDE12345)`                                                | Name of the Developer ID Application certificate (Apple Developer, Certificates; created by the Account Holder)                                     |
| `APPLE_TEAM_ID`                                                  | 10-character Team ID                                                                                                              | developer.apple.com, Membership details. Only required for the Apple ID notary path.                                                                |
| `DEVELOPER_ID_P12_PATH`                                          | Path to the exported Developer ID Application cert **with private key** (.p12)                                                    | Keychain Access, then Export, on the Mac that created the CSR. Optional if the identity is already in a keychain on the build host.                 |
| `DEVELOPER_ID_P12_PASSWORD`                                      | Export password of the .p12                                                                                                       | Set when exporting                                                                                                                                  |
| `NOTARYTOOL_KEYCHAIN_PROFILE` (+ optional `NOTARYTOOL_KEYCHAIN`) | **Preferred.** Name of a profile created once with `xcrun notarytool store-credentials`                                           | Created on the build host from the ASC key or Apple ID below                                                                                        |
| `APPLE_ASC_KEY_ID`, `APPLE_ASC_ISSUER_ID`, `APPLE_ASC_KEY_PATH`  | **Preferred.** App Store Connect API key: Key ID, Issuer ID (UUID; leave empty for individual keys), path to `AuthKey_<KEYID>.p8` | App Store Connect, Users and Access, Integrations, App Store Connect API (Team key, Developer role or higher). The .p8 can be downloaded only once. |
| `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD` (+ `APPLE_TEAM_ID`)    | Fallback: Apple ID email and an app-specific password                                                                             | appleid.apple.com, Sign-In and Security, App-Specific Passwords                                                                                     |

Notary auth is chosen in this order: keychain profile, then ASC API key, then Apple ID.
Optional settings:

- `AWL_NOTARY_TIMEOUT` (default `30m`).
- `AWL_SIGN_ADD_TO_SEARCH_LIST=1`: temporarily prepends the temporary keychain to the user
  keychain search list, and restores the list on exit. Use it only if codesign cannot build the
  certificate chain from `--keychain` alone.

### Secret handling

- Values are never echoed. The script runs with xtrace off, and every logged command passes
  through `awl_mask_arg`, which replaces the values of the password, Apple ID and ASC key/issuer
  variables with `***`.
- File paths and identity names are logged; file contents never are.
- `security find-identity` output is reduced to "identity present / not found".
- Known limitation: `security import -P` and `notarytool --password` pass the secret on argv,
  where other processes on the host can see it. Prefer the keychain profile or the ASC API key,
  and run real signing on a dedicated VM or macOS user.

## Entitlements (`apps/mac/AgentWitchLocal.entitlements`)

The file is intentionally an **empty dict**: under the hardened runtime the app needs no
exceptions. The app is not sandboxed (it must start `~/.agent-witch` LaunchAgents and run the
install script), so it needs no sandbox entitlements either. Each capability the app uses was
checked:

| App behaviour (source)                                                                                                                                                | Needs entitlement?                                                                                                                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `URLSession` calls to AWC / `127.0.0.1:43347` (`EphemeralBootstrapHttpClient`, update check)                                                                          | No. Network entitlements apply only to sandboxed apps.                                                                                                                                        |
| `Process` running `/bin/launchctl`, `/bin/bash` (install script) and `$SHELL -lc` (`LaunchctlRunner`, `ProcessInstallScriptRunner`, `resolveLoginShellNodeDirectory`) | No. Child processes are separate images with their own signatures; the hardened runtime is not inherited.                                                                                     |
| `SMAppService.mainApp` register (launch at login)                                                                                                                     | No. It needs a validly signed app, not an entitlement.                                                                                                                                        |
| `NSWorkspace.open` for URLs and logs, and the `agentwitch-local://` URL scheme                                                                                        | No                                                                                                                                                                                            |
| JIT, unsigned executable memory, DYLD env vars, third-party dylibs, Apple Events, camera, mic                                                                         | Not used, so `cs.allow-jit`, `cs.allow-unsigned-executable-memory`, `cs.allow-dyld-environment-variables`, `cs.disable-library-validation` and `automation.apple-events` are **not** granted. |

If a future change adds one of these, add only that key and a row here.

## Release wiring

- Release flow (see `docs/development/quality-gates.md`): build locally with this script, then
  `gh release create awl-mac-vX.Y.Z dist/mac/AgentWitchLocal.dmg …` after owner go. Site CTAs
  pin the tag in `src/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl.ts`
  (`AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG`). The menu bar app's update notice compares
  `CFBundleShortVersionString` (root `package.json` version) against `awl-mac-v*` tags.
- The Mac app is **not** part of the AWI install bundle (`public/install/agent-witch`), so signing
  needs no install `bundleVersion` bump.
- To ship a signed build that existing users get offered: cut a new `awl-mac-v*` tag with a
  higher version than the installed `CFBundleShortVersionString`, and bump
  `AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG` (plus its tests) so the site links to it.
