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

## Gate before pushing `main`

There is **no GitHub Actions CI**. The only gate before pushing `main` is:

1. Architecture review **SHIP**
2. Full local suite on the **exact tip**: typecheck (incl. eslint), vitest, `ci:architecture`, build (`npm run ci`)
3. Fast-forward `main`, then confirm production health `commitSha == main` and a smoke test

Mac DMG releases are built locally (`scripts/mac/build-awl-mac-dmg.sh`; use `AWL_MAC_SIGNING=developer-id` for Developer ID + notarization, see [awl-mac-signing-notarization.md](../agent-witch/awl-mac-signing-notarization.md)) and published with `gh release create` after owner go. Portfolio site (`thiennp.github.io`) no longer auto-syncs — run `bash .agents/scripts/pushThiennpGithubIo.sh` manually with the token when the portfolio changes.

## Agent docs

Pointers: `CLAUDE.md`, `AGENTS.md`. Deep technical content: `docs/` (indexed for feature knowledge). Context loading and which npm script to run when: [conventions/agent-context.md](../conventions/agent-context.md).
