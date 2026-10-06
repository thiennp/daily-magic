# AWL Mac app: Developer ID signing + notarization

`scripts/mac/build-awl-mac-dmg.sh` builds `AgentWitchLocal.app` and `AgentWitchLocal.dmg`.
The signing steps live in `scripts/mac/signing/`. When Apple credentials are available
(from the environment or `~/.agentwitch-signing/signing.env`), the script makes a
Developer ID signed, notarized and stapled build. Without credentials it falls back to
today's ad-hoc build and logs a clear line saying so. If `signing.env` is present but
incomplete, or `AWL_MAC_SIGNING=developer-id` is set without creds, it **fails loudly**
instead of silently falling back.

**First real signed + notarized run must happen on a VM or a new macOS user** — never on
Thien's primary macOS account (no `security import` of the .p12 into the login keychain,
no live `notarytool` / `stapler` there). See [First signed run](#first-signed-run-vm-or-new-user).

## Modes

| Command                                                                   | What happens                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bash scripts/mac/build-awl-mac-dmg.sh` (`AWL_MAC_SIGNING=auto`, default) | Loads `~/.agentwitch-signing/signing.env` when present (values never logged). If `DEVELOPER_ID_APPLICATION` + notary + `.p12` creds are set: Developer ID. If `signing.env` was loaded but incomplete: **fail**. Otherwise: ad-hoc fallback, logged as `[awl-sign] Developer ID credentials absent … falling back to ad-hoc signing`. |
| `--adhoc` or `AWL_MAC_SIGNING=adhoc`                                      | Forces the legacy ad-hoc path (`codesign --force --deep --sign -`) for local dev only.                                                                                                                                                                                                                                                |
| `AWL_MAC_SIGNING=developer-id`                                            | Exits early with an error unless all credentials are present. Use this for releases.                                                                                                                                                                                                                                                  |
| `--dry-run`                                                               | Does a real build and an ad-hoc **hardened-runtime** sign (same inside-out order and entitlements as Developer ID), then runs the local verify steps. It only **prints** the keychain, Developer ID codesign, `notarytool` and `stapler` commands, with secrets masked. Dry-run artifacts must never be published.                    |

If `DEVELOPER_ID_APPLICATION` is set but no notary credentials are, the script exits instead of
shipping a build that is signed but not notarized.

## Developer ID pipeline (real run)

1. Load credentials from the environment, or from `~/.agentwitch-signing/signing.env` when the
   identity is not already set (`AWL_SIGNING_ENV_FILE` overrides the path).
2. Create a **temporary keychain** under `$TMPDIR/awl-sign.*`, unlock it, import Apple's
   public roots and Developer ID intermediates from `scripts/mac/signing/certs/` (Apple Root CA,
   Apple Root CA - G2, Developer ID Certification Authority G1 + G2; each pinned by SHA-256) into
   the **temp keychain only**, import the `.p12`, set the key partition list
   (`apple-tool:,apple:,codesign:`), and set the user search list to **temp + existing user
   keychains + `/Library/Keychains/System.keychain`** (existing entries are never dropped). The
   login keychain is never imported into and never used for the identity. No trust settings are
   written to the login/system/admin domains. An EXIT trap restores the original search list and
   deletes the temp keychain. A preflight `security find-identity -v -p codesigning <tempkc>`
   fails loudly if 0 valid identities match before codesign/notarytool.
3. Inside-out `codesign --force --options runtime --timestamp --sign "$DEVELOPER_ID_APPLICATION"`
   with `--keychain` pointing at the temp keychain:
   - nested dylibs, frameworks and bundles first (no entitlements)
   - then helpers, XPC services and nested apps (with entitlements)
   - then `AgentWitchLocal.app` itself (with entitlements)
   - Today the bundle has no nested code: one universal Mach-O plus resources.
4. `codesign --verify --deep --strict`. Then the app is zipped with `ditto`, sent through
   `xcrun notarytool submit --wait --key --key-id --issuer --output-format json` (ASC API key
   path; keychain profile or Apple ID also supported), and stapled with `xcrun stapler staple`.
   If the result is not `Accepted`, the script prints `notarytool log` and fails.
5. `spctl -a -vv -t exec` and `stapler validate` on the app must pass. The stapled app is then
   zipped as `dist/mac/AgentWitchLocal.zip` (with a `.sha256` file).
6. DMG: built from the stapled app, then `codesign --timestamp`, notarize, staple, and verify.
   Verification uses `spctl -a -t open --context context:primary-signature -vv` and
   `stapler validate`. The `.sha256` file is written after stapling.

## Credentials (env vars / `signing.env` / keychain profile)

Preferred local layout (dir `700`, files `600`):

- `~/.agentwitch-signing/signing.env` — exports the env vars below (never committed).
- `~/.agentwitch-signing/devid.p12` (+ password) and `AuthKey_<KEYID>.p8`.

| Env var                                                          | What                                                                                                                | Where to get it                                                                                                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DEVELOPER_ID_APPLICATION`                                       | Codesign identity name, e.g. `Developer ID Application: Thien Nguyen (8RA9UZU3Y3)`                                  | Name of the Developer ID Application certificate (Apple Developer, Certificates; created by the Account Holder)                                     |
| `APPLE_TEAM_ID`                                                  | 10-character Team ID                                                                                                | developer.apple.com, Membership details. Only required for the Apple ID notary path.                                                                |
| `DEVELOPER_ID_P12_PATH`                                          | Path to the exported Developer ID Application cert **with private key** (.p12). **Required** for Developer ID mode. | Keychain Access, then Export, on the Mac that created the CSR.                                                                                      |
| `DEVELOPER_ID_P12_PASSWORD`                                      | Export password of the .p12                                                                                         | Set when exporting                                                                                                                                  |
| `NOTARYTOOL_KEYCHAIN_PROFILE` (+ optional `NOTARYTOOL_KEYCHAIN`) | Name of a profile created once with `xcrun notarytool store-credentials`                                            | Created on the build host from the ASC key or Apple ID below                                                                                        |
| `APPLE_ASC_KEY_ID`, `APPLE_ASC_ISSUER_ID`, `APPLE_ASC_KEY_PATH`  | **Preferred for notary.** App Store Connect API key: Key ID, Issuer ID (UUID), path to `AuthKey_<KEYID>.p8`         | App Store Connect, Users and Access, Integrations, App Store Connect API (Team key, Developer role or higher). The .p8 can be downloaded only once. |
| `APPLE_ID`, `APPLE_APP_SPECIFIC_PASSWORD` (+ `APPLE_TEAM_ID`)    | Fallback: Apple ID email and an app-specific password                                                               | appleid.apple.com, Sign-In and Security, App-Specific Passwords                                                                                     |

Notary auth is chosen in this order: keychain profile, then ASC API key, then Apple ID.
Optional settings:

- `AWL_NOTARY_TIMEOUT` (default `30m`).
- `AWL_SIGNING_ENV_FILE`: override path to the signing env file.

### Secret handling

- Values are never echoed. The script runs with xtrace off, and every logged command passes
  through `awl_mask_arg`, which replaces the values of the password, Apple ID and ASC key/issuer
  variables with `***`.
- File paths and identity names are logged; file contents never are.
- `security find-identity` output is reduced to "identity present / not found".
- Known limitation: `security import -P` and `notarytool --password` pass the secret on argv,
  where other processes on the host can see it. Prefer the ASC API key path, and run real
  signing on a dedicated VM or macOS user.

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

## First signed run (VM or new user)

Do **not** run a real Developer ID build on the primary interactive macOS account. That account
must not receive a `security import` of the release `.p12` into the login keychain, and must not
be the first host to submit to notarytool.

Options for a human:

1. **New standard macOS user** on this Mac: create a standard (non-admin is fine for codesign with
   a temp keychain) user, copy `~/.agentwitch-signing/` into that user's home with `700`/`600`
   modes (or grant read access to a shared copy), log in as that user, clone/worktree the repo,
   run `bash scripts/mac/build-awl-mac-dmg.sh` (or `AWL_MAC_SIGNING=developer-id`), then verify
   with `spctl` / open the app under that user.
2. **VM** (UTM, Parallels, VMware, Tart, …): install macOS, copy credentials the same way, build
   and notarize inside the VM, copy `dist/mac/*` out for `gh release create`.

After the first successful stapled artifacts exist, later release builds may reuse that same VM
or signing user. Still never import the `.p12` into the primary account's login keychain.

## Release wiring

- Release flow (see [local-release-path.md](local-release-path.md#awl-mac); no GitHub Actions): build locally with this script, then
  `gh release create awl-mac-vX.Y.Z dist/mac/AgentWitchLocal.dmg …` after owner go. Site CTAs
  pin the tag in `src/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl.ts`
  (`AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG`). The menu bar app's update notice compares
  `CFBundleShortVersionString` (root `package.json` version) against `awl-mac-v*` tags.
- The Mac app is **not** part of the AWI install bundle (`public/install/agent-witch`), so signing
  needs no install `bundleVersion` bump.
- To ship a signed build that existing users get offered: cut a new `awl-mac-v*` tag with a
  higher version than the installed `CFBundleShortVersionString`, and bump
  `AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG` (plus its tests) so the site links to it.

## Troubleshooting

### `unable to build chain to self-signed root` / `errSecInternalComponent`

codesign found the Developer ID identity but could not build a trust chain to an Apple root.
Typical when the user keychain search list is only the temp keychain (System roots / System.keychain
not visible) or the Apple Root / Developer ID intermediate is missing from the temp keychain.

What the pipeline does now:

1. Imports Apple Root CA, Apple Root CA - G2, and Developer ID CA (G1 + G2) from
   `scripts/mac/signing/certs/` into the **temp** keychain (SHA-256 pinned; no sudo, no
   login/system trust settings).
2. Sets the user search list to temp + your existing user keychains +
   `/Library/Keychains/System.keychain`, then restores the original list on EXIT.
3. Passes `--keychain <tempkc>` to codesign and preflights with
   `security find-identity -v -p codesigning <tempkc>` (fails if 0 valid identities).

Read-only checks (safe on the primary account; do not import the `.p12`):

```bash
security dump-trust-settings          # user overrides
security dump-trust-settings -d       # admin overrides
# If you have a PUBLIC leaf .cer (not the .p12):
security verify-cert -c ~/.agentwitch-signing/devid.cer -p codeSign \
  -k /Library/Keychains/System.keychain
```

If admin/user trust settings show an Apple Root or Developer ID cert with a deny / unspecified
override, that can break the chain independently of this script — remove that override in Keychain
Access (or ask IT) rather than adding new trust settings from the build.
