---
name: command-fsa-loop-round
description: >-
  One bounded round of the FSA fractal loop: put a public-api boundary around exactly one unit, repoint its outside importers, verify, commit, then pick the next unit without asking.
---

# FSA loop — one round

Plan and rationale: [fsa-loop-plan.md](../../docs/architecture/fsa-loop-plan.md). Policy: [ADR 0007](../../docs/adr/0007-fractal-slice-architecture.md). The round steps below replace `command-fsa-migrate-feature.md` for loop runs; that playbook still applies to a single hand-picked slug.

**A round touches exactly one unit and goes exactly one level deep.** Do not move files into `internal/`, do not rename, do not fix unrelated code. Behavior change: none.

## 0. Preflight (stop the run if any fails)

- `git status --porcelain` is empty.
- `git fetch origin main`, then `git reset --hard origin/main` (the loop branch always mirrors the newest `main`; the tree is clean, so nothing of anyone's is lost).
- `git rev-parse HEAD` → remember as `BASE`.
- `npm run fsa:deps` passes (no violations beyond the baseline).

## 1. Pick the unit (no human input)

```bash
npm run fsa:next
```

- `{"kind":"unit"}` → work on `metrics.unit` (a directory under `src/features/…`; a `…#root` unit means only the loose files directly in that folder).
- `{"kind":"done"}` → the loop is finished, go to **Finish**.
- `{"kind":"needs-human"}` → record it in the run report and go to **Finish**; do not guess.

## 2. Inventory (read-only)

1. List files in the unit (for `#root`: only the loose files).
2. List every file **outside** the unit that imports it, with the exact symbols used (`rg "<unit path as @/ alias>" src apps`, plus relative imports from sibling folders).
3. Decide each symbol's file by what it is: types/DTOs/constants → `types.ts`; React components and client hooks → `presentation.ts`; server-only code (DB, Node APIs, `server-only`) → `infrastructure.ts`.

Skip a file kind that has no symbols; never create empty contract files.

## 3. Boundary (the only code change)

1. Create `<unit>/public-api/{types,presentation,infrastructure}.ts` as needed. They **re-export** from the unit's existing files. No logic, no mixed barrel, no `index.ts`.
2. Repoint each outside importer to `<unit>/public-api/<file>`. Edit **import lines only**.
3. If an outside importer needs something that is not a stable part of the unit (a test helper, a private util), do not export it. Mark the unit blocked (step 5) with that reason.
4. Add one short paragraph to the owning feature's `README.md` naming the unit's public API (create only if the feature has a README).

Hard limits for a round: the `limits` printed by `npm run fsa:next` (stored in `.agents/fsa/state.json`; currently ≤ 100 files in the unit, ≤ 80 outside importers) and ≤ 3 new files. Over a limit → block the unit.

## 4. Verify (all must pass)

```bash
npx tsc --noEmit
npm run fsa:deps                 # no new violations vs baseline
npm run cursor:architecture -- --staged
npm run validate:staged
npm run test:related
```

Every 5th round and on **Finish** also run `npm run build`.

If `npm run fsa:deps` reports fewer violations than the baseline, run `npm run fsa:deps:baseline` so the baseline only ever shrinks. Never regenerate it when the count went up.

## 5. Commit, review, push

**Pass:**

```bash
npm run fsa:next -- done <unit> $BASE
git add -A && git commit -m "refactor(fsa): <unit> public-api boundary"
```

Pre-commit hooks must pass. Never `--no-verify`.

**Review (separate subagent, read-only first):** it reads `git show HEAD` and answers one question: _is there any logic change?_ Only re-exports, import-path edits, the state file and a README line are allowed. It also checks the round limits. If it finds a problem it fixes it in a follow-up amend to the same commit and re-runs step 4; if it cannot fix it, treat the round as failed.

**Push to `main` right after the review passes:**

```bash
git fetch origin main
git merge-base --is-ancestor origin/main HEAD && git push origin HEAD:main
```

- Fast-forward only. Never `--force`, never `--no-verify`.
- If `origin/main` has moved (the ancestor check fails, or the push is rejected): **do not merge, rebase or override.** `git reset --hard origin/main` (this drops only your own round commit) and **redo the same round** on the new `main`. After 3 redo attempts for one unit, block it and move on.

**Fail (any check, any limit, review not fixable):** discard only this round's work, then park the unit:

```bash
git reset --hard origin/main && git clean -fd -- <unit paths and edited importer paths>
npm run fsa:next -- block <unit> "<one-line reason>"
git add .agents/fsa/state.json && git commit -m "chore(fsa): block <unit> — <reason>"
git fetch origin main && git merge-base --is-ancestor origin/main HEAD && git push origin HEAD:main
```

## 6. Decide the next round (automatic)

Go straight back to step 0. Do not ask the user. A blocked unit is skipped (the selector never returns it again); carry on with the next unit. Stop only when:

| Stop condition                   | Meaning                                       |
| -------------------------------- | --------------------------------------------- |
| `fsa:next` returns `done`        | every unit has a public-api                   |
| `fsa:next` returns `needs-human` | only units that cannot be split safely remain |
| 8 blocked units in a row         | something systemic is wrong                   |
| preflight fails twice in a row   | baseline or hooks are broken                  |

There is no round cap: run until done.

## Finish

1. `npm run build` and `npm run fsa:deps`.
2. Write the run report to `.agents/fsa/last-run.md`: rounds done, units blocked with reasons, baseline count before/after, next unit.
3. Update the AgentWitch task for this effort with a one-line `resultSummary` (counts only, no code).

## Forbidden

- More than one unit per round; moving files to `internal/`; renaming exports.
- Editing `src/app/**/route.ts` or `page.tsx` beyond import lines.
- New global event buses, new `utils/`, new top-level roots, opening PRs.
- Regenerating the baseline upward, `--no-verify`, force-push, merging or rebasing over someone else's commits, pushing anywhere except `origin main`.
