# Refactoring safety tests (AWC / AWL / AWB / AWI)

Use this **before** folder moves, renames, and FSA slice extractions. Goal: catch broken contracts without running the entire suite on every edit.

**Manifest (source of truth):** [`test/refactoring-safety.manifest.json`](../../test/refactoring-safety.manifest.json)

## Tiers

| Command                      | Tier         | When                                                                                                                                |
| ---------------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:safety`        | **fast**     | After each small step (~1 min): manifest + deployables registry + harness + architecture rules                                      |
| `npm run test:refactor-gate` | **standard** | Before moving code between deployables: fast set + all Agent Witch / dispatch unit tests + `validate:changes` + staged architecture |
| `npm run test:safety:full`   | **full**     | Pre-merge on a refactor branch: `npm test`, `ci:architecture`, `typecheck`, `build` (CI parity)                                     |

List patterns:

```bash
npm run test:safety -- --list
```

Per deployable only:

```bash
npm run test:safety -- --deployable=AWL
```

## What each tier protects

| Area                                                        | fast | standard | full |
| ----------------------------------------------------------- | ---- | -------- | ---- |
| Deployables registry + manifest wiring                      | ✓    | ✓        | ✓    |
| AWI `features.registry.json` + deployable import boundaries | ✓    | ✓        | ✓    |
| Harness bootstrap routing                                   | ✓    | ✓        | ✓    |
| Architecture rule unit tests                                | ✓    | ✓        | ✓    |
| `src/lib/agentWitch` + dispatch                             | —    | ✓        | ✓    |
| `src/features/agent-witch` + Mac `scripts/` tests           | —    | ✓        | ✓    |
| Structure validation (git diff)                             | —    | ✓        | —    |
| Staged architecture check                                   | —    | ✓        | —    |
| Entire Vitest suite + build                                 | —    | —        | ✓    |

## Optional (local Mac / secrets)

Not run by default gates — use when you change install, wake, or self-delegate flows:

- `npm run test:e2e` (full local Playwright; CI runs this on `main` too)
- `npm run test:shipped-install-blackbox` (install bundle against built app)
- Playwright paths listed under `optionalLocal` in the manifest

## CI today

GitHub Actions runs `npm test`, architecture, typecheck, build, E2E (on `main`), and shipped-install blackbox (on `main`). Before `main`: architecture review SHIP plus the full local suite (`npm run ci`) on the exact tip. During refactors, the **standard** gate (`test:refactor-gate` / related) is the intentional **local** shortcut; still run full `npm run ci` before shipping `main`.

## Related

- [Quality gates](quality-gates.md)
- [FSA refactoring plan](../architecture/fsa-refactoring-plan.md) §5 verification
- [Deployables](../product/agent-witch-deployables.md)
