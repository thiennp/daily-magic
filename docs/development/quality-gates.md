# Quality gates

## Agent harness

- `.cursor/` — rules, commands, skills
- `.agents/scripts/` — architecture and structure validation
- `structure-validation.config.json` — folder layout rules ([structure-validation](https://www.npmjs.com/package/structure-validation)); `npm run validate:changes` for git diff scope
- **Cursor agent hooks** — `.cursor/hooks.json` ([conventions doc](../conventions/cursor-hooks.md))
- **guardz** — runtime DTO guards at boundaries ([conventions doc](../conventions/guardz-and-structure-validation.md))

## Commands

```bash
npm run validate:staged
npm run cursor:architecture -- --staged
npm run typecheck
npm run test
npm run test:refactor-gate   # before AWC/AWL/AWB/AWI folder moves (see refactoring-safety-tests.md)
npm run test:e2e:install   # once per machine
npm run test:e2e
```

**Refactor / FSA moves:** [refactoring-safety-tests.md](refactoring-safety-tests.md) (`test:safety`, `test:refactor-gate`, `test:safety:full`).

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on push to `main`, on `pull_request`, and via `workflow_dispatch`. The **verify** job runs unit tests, architecture checks, typecheck, and build (same commands as `npm run ci`). On `main`, **Playwright E2E** and **shipped install blackbox** also run.

## Gate before pushing `main`

Local suite plus green CI on the tip:

1. Architecture review **SHIP**
2. Full local suite on the **exact tip**: typecheck (incl. eslint), vitest, `ci:architecture`, build (`npm run ci`)
3. Fast-forward `main`, then confirm GitHub Actions is green on the commit (e2e + blackbox on `main`)
4. Confirm production health `commitSha == main` and a smoke test

Full step-by-step (web app push, install bundle bumps, AWL desktop releases): [local-release-path.md](../agent-witch/local-release-path.md).

Mac DMG releases are built locally (`scripts/mac/build-awl-mac-dmg.sh`; use `AWL_MAC_SIGNING=developer-id` for Developer ID + notarization, see [awl-mac-signing-notarization.md](../agent-witch/awl-mac-signing-notarization.md)) and published with `gh release create` after owner go (Linux/Windows: same pattern, see the release path doc). Portfolio site (`thiennp.github.io`) no longer auto-syncs — run `bash .agents/scripts/pushThiennpGithubIo.sh` manually with the token when the portfolio changes.

## Agent docs

Pointers: `CLAUDE.md`, `AGENTS.md`. Deep technical content: `docs/` (indexed for feature knowledge). Context loading and which npm script to run when: [conventions/agent-context.md](../conventions/agent-context.md).
