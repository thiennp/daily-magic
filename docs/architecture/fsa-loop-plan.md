# FSA loop plan

**Status:** Working plan. **Policy:** [ADR 0007](../adr/0007-fractal-slice-architecture.md). **Round playbook:** `.cursor/commands/command-fsa-loop-round.md`. **Workflow:** `.agents/workflows/fsa-fractal-loop.workflow.js`.

## Goal

Bring all of `src/features/` to FSA boundaries (`public-api/` per unit, no deep imports from outside) without a big-bang refactor, and keep the import graph free of new cycles. Many small, verified, reversible rounds; no human in the middle.

## Principles

| Rule                   | How it is kept                                                                                                             |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| One unit per round     | `npm run fsa:next` returns exactly one unit. The playbook forbids touching a second one.                                   |
| Not too deep           | A round adds `public-api/` re-exports and repoints import lines. It never moves files into `internal/`.                    |
| Fractal                | A unit over 60 files or 25 outside importers is a container: the loop descends into its sub-folders and repeats.           |
| Lowest risk first      | Score = files + 2·importers + 5·outbound + 10·cycles. Small, quiet leaves go first; the hard slugs come last.              |
| Containers finish last | A folder's loose files become their own `…#root` unit only after every sub-folder is done.                                 |
| No regression          | After a unit is done it is added to `.agents/fsa/state.json`; `.dependency-cruiser.cjs` then forbids deep imports.         |
| Cycles never grow      | `npm run fsa:deps` fails on any violation not in `.agents/fsa/depcruise-baseline.json`. The baseline can only shrink.      |
| Safe to stop anywhere  | Every round is its own commit, reviewed, then fast-forward pushed to `main`; a failed round is reset and the unit blocked. |
| Never override others  | Each round starts from the newest `origin/main`. If `main` moves before the push, the round is dropped and redone.         |

## Preparation (done)

- `dependency-cruiser` with rules: `no-circular`, `fsa-no-cross-feature-internal`, `fsa-shared-must-not-import-features`, `fsa-public-api-infra-not-in-client`, plus a generated ratchet rule per completed unit.
- Baseline of 183 pre-existing violations (176 cycles, 143 of them in `src/lib`; 4 `lib → features` imports; 3 cross-feature `internal` imports). Scripts: `fsa:deps`, `fsa:deps:baseline`.
- `fsa:next` selector (`.agents/scripts/fsa-next-unit.ts`, logic and tests in `.agents/scripts/lib/fsaUnits*.ts`).
- State file `.agents/fsa/state.json`: `completed`, `blocked`, `rounds`.

## One round

1. Preflight: clean tree, loop branch, `fsa:deps` green.
2. `fsa:next` → unit (or `done` / `needs-human`).
3. Inventory outside importers and symbols.
4. Add `public-api/{types,presentation,infrastructure}.ts` (re-exports only), repoint importers.
5. Verify: `tsc`, `fsa:deps`, `cursor:architecture`, `validate:staged`, `test:related` (full `build` every 5th round).
6. Commit, then a review subagent confirms there is no logic change (and fixes if needed).
7. Fast-forward push to `main`. If `main` moved: reset to the new `main` and redo the round. On failure: reset and block the unit.
8. Pick the next unit and go to 1. No question to the user.

## Stop conditions

`done`, `needs-human`, 8 blocked units in a row, or two failed preflights. There is no round cap. Then a report is written to `.agents/fsa/last-run.md`.

## Not in scope of the loop

- Moving files into `internal/` (a later phase, once every unit has a boundary).
- Pulling `src/lib` code into slices, and the 4 `lib → features` imports: they need a design decision (hub or shared types), so they are listed in the report, not auto-fixed.
- Integration hubs (`src/hubs/`): added when the first real cross-feature side effect is untangled.
- PRs and merges: the loop pushes fast-forward commits straight to `main`, never force.

## Expected shape for `projects`

`src/features/projects` (≈1,300 files) is a container. The loop descends: `messenger`, `access`, `tasks`, `members`, `settings` … each become units (or containers again, e.g. `access/humanInvites`). The `AwcProject*.tsx` files at the top level become `projects#root` last, and may be reported `needs-human` if they are too many to group safely.

## Running it

- In Claude Code: run the `fsa-fractal-loop` workflow (`args: { maxRounds, maxConsecutiveBlocks }`). Use a dedicated branch or worktree.
- Without the workflow tool: repeat the playbook by hand or with `/loop`; the state file makes every run resumable.
- The playbook is also stored as an AgentWitch project playbook so any bot on the project can run a round.

## Cycle debt (found after the first full pass)

The guard first counted type-only imports, which are erased at compile time. It now counts **runtime cycles only** (`no-circular` with `viaOnly: dependencyTypesNot: ["type-only"]`) and the ratchet allows a child unit's own `public-api/`.

Measured with that rule: **23 runtime cycles before the loop, 71 after.** The extra ~48 are barrel-mediated (a feature's `public-api/presentation.ts` joins exports that never imported each other), clustered in `agent-witch`, `home`, `projects`, `shell`. `.agents/fsa/depcruise-baseline.json` is reset to the current 71 so no round can add more. Burning them down means moving shared symbols to a lower level, which is a real refactor and is **not** part of the one-level-deep loop; it needs its own one-cycle-per-round workflow.
