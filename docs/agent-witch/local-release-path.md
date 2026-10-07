# Local release path (no GitHub Actions)

All GitHub Actions workflows were removed in `ee10c375` (2026-10-05). Nothing runs on push, tag
or schedule any more. Every release below is done by hand from a local machine.

| Surface                      | What ships it                                                        | Gate                                                     |
| ---------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------- |
| AWC web app (`main`)         | Fast-forward push to `main`; Railway builds the `Dockerfile`         | Arch **SHIP** + full local `npm run ci` on the exact tip |
| Install bundle (AWI/AWL/AWB) | Same `main` push; existing installs update on a bundle version bump  | Same as AWC                                              |
| AWL desktop (Mac/Linux/Win)  | Local build script + `gh release create/upload` + pin bump on `main` | Arch SHIP + suite green + owner (Thien / AW Lead) GO     |

## What the deleted workflows did

| Workflow (last version: `git show ee10c375^:<path>`) | Trigger                                                        | Did                                                                                                                                             | Now                                                                       |
| ---------------------------------------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/ci.yml`                           | push (all branches), PR                                        | `verify`: `npm ci`, `npm test`, `ci:architecture`, `typecheck`, `build`. On `main` only: Playwright `test:e2e`, `test:shipped-install-blackbox` | `npm run ci` locally (see [AWC](#1-awc-web-app-main)); e2e/blackbox below |
| `.github/workflows/mac-app.yml`                      | push `main` / `feat/awl-mac-*`, PR, tag `awl-mac-v*`, dispatch | `swift test`, `build-awl-mac-dmg.sh` (unsigned), upload artifact; on a tag: `gh release create` + upload `AgentWitchLocal.dmg{,.sha256}`        | [AWL Mac](#awl-mac) by hand                                               |
| `.github/workflows/storybook-wave-qa-weekly.yml`     | cron Sat 02:00 UTC, dispatch                                   | `npm run storybook:wave:weekly`, upload captures                                                                                                | Run `npm run storybook:wave:weekly` locally when needed                   |
| `.github/workflows/sync-thiennp-github-io.yml`       | push `main` under `external/thiennp.github.io/**`, dispatch    | `bash .agents/scripts/pushThiennpGithubIo.sh` with `THIENNP_GITHUB_IO_DEPLOY_TOKEN`                                                             | Run the script by hand (`npm run portfolio:push-github-io`)               |

There never was a Linux or Windows release workflow; those were always manual.

## 1. AWC web app (`main`)

No PRs, no GitHub Actions.

1. **Arch SHIP** on the tip.
2. **Full local suite on the exact tip:** `npm run ci` (`npm test`, `ci:architecture`, `typecheck`
   incl. eslint, `build`), in a Mac worktree. Never reuse an older run. A clean `git range-diff`
   tip move (rebase, no content change) keeps Arch SHIP, but the suite reruns on the new tip.
3. **Push from a dedicated worktree**, never from the primary checkout (its husky `pre-push` runs
   `npm run ci` and rewrites generated files):
   - `git status --porcelain` is empty. Revert regenerated install churn first:
     `git checkout -- public/install/agent-witch/app/agent-witch.js public/install/agent-witch/app/deps.tar.gz`.
   - `git ls-remote origin refs/heads/main` equals the base you tested on. If `main` moved: rebase
     and rerun the suite.
   - `git push --no-verify origin <full sha>:refs/heads/main`. Fast-forward only, never force.
4. **Railway deploys `main`.** `railway.toml` builds the `Dockerfile` (which runs `npm run build`
   and `npm run test:shipped-install-blackbox`), runs `npm run db:migrate` as `preDeployCommand`,
   and health-checks `/api/health`. There is no GitHub check for Railway to wait on.
5. **Verify production** (`https://www.agentwitch.com`):
   - `GET /api/health`: `release.commitSha` equals the pushed SHA (from `RAILWAY_GIT_COMMIT_SHA`;
     see [deployment.md](../development/deployment.md)).
   - Smoke: `/`, `/install/agent-witch/version` (`bundleVersion` matches
     `AGENT_WITCH_INSTALL_BUNDLE_VERSION`), `/install/agent-witch.sh`,
     `/install/agent-witch-update.sh`, `/install/agent-witch/repair`.

The old main-only CI jobs are no longer run automatically. Run `npm run test:e2e` (after
`npm run test:e2e:install`) and `npm run test:shipped-install-blackbox` locally when you change
install, wake or browser flows ([refactoring-safety-tests.md](../development/refactoring-safety-tests.md)).
The shipped-install blackbox also runs inside the Railway Docker build.

## 2. Install bundle (AWI / AWL / AWB)

- The build (`npm run build` → `build:agent-witch`) regenerates
  `public/install/agent-witch/app/agent-witch.js` and `deps.tar.gz`, so each deploy serves the
  bundle built from that `main`. Do not commit that churn unless the commit is a bundle bump.
- Existing installs self-update only when `AGENT_WITCH_INSTALL_BUNDLE_VERSION`
  (`apps/install/features/bundle/public-api/types.ts`, currently `269`) increases.
  The built bundle stamps the deploy commit (`RAILWAY_GIT_COMMIT_SHA` / `VERCEL_GIT_COMMIT_SHA` /
  `GITHUB_SHA`, else `git rev-parse HEAD`) so local `GET /health` reports `commitSha`.
  - **Bump it** whenever anything shipped to the computer changes: install scripts, `agent-witch.js`
    (AWL/AWB code, prompt optimizer, …), or deps. A source change alone does not reach running
    installs.
  - **Do not bump it** for AWC-only (server/UI) changes or for desktop app releases (the Mac/Linux/
    Windows apps are not part of the bundle).
- Connect floor `AGENT_WITCH_LOCAL_MIN_CONNECT_BUNDLE_VERSION`
  (`src/lib/agentWitch/agentWitchLocalMinConnectBundleVersion.constant.ts`, currently `76`).
  Below it the server refuses Connect / dispatch with 409 `agent_witch_local_too_old`. **Raise it
  only** when bundles below the new floor can no longer work with the server or cannot self-update,
  never just because a new bundle shipped. See
  [awl-connect-version-contract.md](awl-connect-version-contract.md) and
  `src/lib/agentWitch/repair/KNOWN_ISSUES.md` AWLR-FLOOR-001.
- Task floor `AGENT_WITCH_LOCAL_MIN_TASK_BUNDLE_VERSION`
  (`src/lib/agentWitch/agentWitchLocalMinTaskBundleVersion.constant.ts`, currently `267`, the S0
  local CLI safety bundle). Below it a computer seat stays connected but is not assignable for
  project tasks (`computer_not_assignable`, cause `too_old`). Raise it only together with (or
  after) the bundle bump that ships the required AWL behaviour.

## 3. AWL desktop apps

Common rules:

- Tags are per family: `awl-mac-vX.Y.Z`, `awl-linux-vX.Y.Z`, `awl-windows-vX.Y.Z`. The apps read
  `https://api.github.com/repos/thiennp/daily-magic/releases` and never `/releases/latest` (shared
  across families), so the "Latest" badge does not matter.
- Asset names are fixed; site CTAs build `releases/download/<tag>/<asset>` URLs.
- Order: build + verify locally → owner GO → `gh release create <tag>` + upload assets
  (`gh release upload <tag> <files> --clobber` to replace) → then land the pin bump on `main` via
  [section 1](#1-awc-web-app-main) so the site never links to a missing asset.
- Never publish `--dry-run` or ad-hoc test builds as a signed release.
- Credentials are env var names only; never commit or print their values.

### AWL Mac

Host: macOS with Swift (universal arm64 + x86_64). **First Developer ID + notarize + staple run
must be on a VM or a new macOS user** (temp keychain only; never import the `.p12` into the
primary account login keychain). Details:
[awl-mac-signing-notarization.md](awl-mac-signing-notarization.md#first-signed-run-vm-or-new-user).

1. `swift test --package-path apps/mac`
2. `bash scripts/mac/build-awl-mac-dmg.sh` → `dist/mac/AgentWitchLocal.dmg` + `.sha256` (and
   `AgentWitchLocal.zip{,.sha256}` for Developer ID). Modes
   ([awl-mac-signing-notarization.md](awl-mac-signing-notarization.md)):
   - default `AWL_MAC_SIGNING=auto`: loads `~/.agentwitch-signing/signing.env` when present;
     Developer ID + notarize + staple when creds (identity, `.p12`, notary) are set; **fails** if
     `signing.env` loaded but incomplete; else logged ad-hoc fallback
   - `--adhoc` / `AWL_MAC_SIGNING=adhoc`: ad-hoc for local dev only
   - `--dry-run`: ad-hoc hardened-runtime build + local verify, prints masked signing commands
   - `AWL_MAC_SIGNING=developer-id`: fails unless identity, `DEVELOPER_ID_P12_PATH` /
     `DEVELOPER_ID_P12_PASSWORD`, and notary credentials (`NOTARYTOOL_KEYCHAIN_PROFILE`, or
     `APPLE_ASC_KEY_ID` / `APPLE_ASC_ISSUER_ID` / `APPLE_ASC_KEY_PATH`, or `APPLE_ID` /
     `APPLE_APP_SPECIFIC_PASSWORD` / `APPLE_TEAM_ID`) are set. Verifies with
     `codesign --verify --deep --strict`, `spctl -a -vv -t exec`, and `stapler validate`.
3. Version: `CFBundleShortVersionString` = root `package.json` `version` (now `0.2.0`). The tag
   must be higher than what users run, or the update notice will not offer it.
4. Publish: `gh release create awl-mac-vX.Y.Z dist/mac/AgentWitchLocal.dmg dist/mac/AgentWitchLocal.dmg.sha256`
   (and the zip pair for Developer ID builds).
5. Land on `main`: bump `package.json` `version` (if not already) and
   `AGENT_WITCH_LOCAL_MAC_APP_RELEASE_TAG` in `src/lib/agentWitch/buildAgentWitchLocalMacAppDownloadUrl.ts`
   (+ its test). No install bundle bump.

### AWL Linux

Host: Linux amd64 with Go and `dpkg-deb` (the script refuses other OSes).

1. `cd apps/desktop && go test ./...`
2. `bash scripts/linux/build-awl-linux-packages.sh` → `dist/linux/agent-witch-local_<ver>_amd64.deb`,
   `AgentWitchLocal-x86_64.AppImage`, each with `.sha256`. Unsigned.
3. Version is hard-coded: `VERSION` in the script and `Version` in
   `apps/desktop/internal/core/constants.go` (now `0.1.0`); keep them equal.
4. Publish: `gh release create awl-linux-vX.Y.Z dist/linux/*.deb dist/linux/*.AppImage dist/linux/*.sha256`.
5. Land on `main`: `AGENT_WITCH_LOCAL_LINUX_APP_RELEASE_TAG`, the `.deb` asset name
   `AGENT_WITCH_LOCAL_LINUX_APP_DEB_ASSET_NAME` (it contains the version), and
   `IS_AGENT_WITCH_LOCAL_LINUX_APP_RELEASED` in
   `src/lib/agentWitch/buildAgentWitchLocalLinuxAppDownloadUrl.ts` (+ tests).

### AWL Windows (not released yet)

- `bash scripts/windows/build-awl-windows-wsl.sh` stages
  `dist/windows/AgentWitchLocal-windows-amd64-v<ver>.zip` (+ `.sha256`); `ALLOW_STUB_EXE=1`
  cross-compiles the tray (not for release).
- Before tag `awl-windows-v0.1.0`: Windows VM e2e, Arch SHIP, suite green, owner GO
  ([release-notes-awl-windows-v0.1.0.md](../release-notes-awl-windows-v0.1.0.md),
  [DESIGN-awl-windows-v0.1.0.md](../DESIGN-awl-windows-v0.1.0.md)). The site has no Windows
  download pin yet.
- Open: the script only puts the tray `.exe` in the zip with `ALLOW_STUB_EXE=1`, which it labels
  "NOT for release". How the release `.exe` is built and added is not settled.

## Open questions

- Railway's auto-deploy branch and its "Wait for CI" setting live in the Railway dashboard, not
  the repo. Confirm auto-deploy from `main` is on and "Wait for CI" is off (with no checks it
  should not block, but this is unverified).
- `build-awl-mac-dmg.sh` sets `CFBundleVersion` from `GITHUB_RUN_NUMBER` (default `1`). Without
  Actions every local build is `1` unless that variable is exported. Decide whether a release
  needs a real build number.
- No release notes template for Mac/Linux; the deleted workflow used the tag as title and an
  "Unsigned; right-click > Open" note. Pick a standard.
- Should `test:e2e` / `test:shipped-install-blackbox` be required before some `main` pushes
  (they used to run on `main` in CI)? Today they are optional locally.
- Which machine is the canonical Linux release host (the box or a Linux VM) is not recorded.
