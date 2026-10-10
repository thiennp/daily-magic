# FSA loop last run

- Units committed this run: 5 (100 completed in total in state.json)
- Units blocked this run: 3 (5 blocked in total in state.json)
- Dependency-cruiser baseline: 183 entries in `depcruise-baseline.json`, before and after (baseline not regenerated, never raised)
- Stop reason: needs-human (fsa:next). The only pending unit is `src/features/agent/utils` (225 files, 117 importers; limits are 100 files and 100 importers; no sub-folders to split). No changes made for it.
- Next unit: `src/features/agent/utils`. Group its files into sub-folders first, then run a round on each.
- Build: `npm run build` passes on main (e55b34baa).
- `npm run fsa:deps`: FAILS on main (exit 69). 837 violations reported, 175 known ignored. 802 are `no-circular`, 13 `fsa-ratchet-src-features-dispatch`, 10 `fsa-ratchet-src-features-reports`, 6 `fsa-ratchet-src-features-projects-sync`, 4 `fsa-ratchet-src-features-admin`, 2 `fsa-shared-must-not-import-features`. Needs a human look: the circular count suggests cycles created by public-api barrels and not covered by the baseline.

## Blocked units (state.json)

- `src/features/projects/access/approvalCard`: outside test imports test helper AwcPendingApprovalCard.fixtures
- `src/features/projects/access/hooks`: outside importers need test helpers and vi.mock/source-read of private hook files
- `src/features/projects/hooks`: importer AwcProjectNameEditor.tsx over 100 lines, prettier rewrap fails ratchet
- `src/features/projects/tasks`: importer AwcProjectMessengerSection.tsx grows past 100-line ratchet on rewrap
- `src/features/home#root`: outside test importer needs test helper homeProjectsPanelRenderTestSetup (not exportable)

## Cycle burn-down

- Cycles fixed this run: 2 (`macDevicePresence <-> pickMacDeviceIdForPresence`, `resolveMacDeviceDisplayName <-> buildMacDeviceDisplayNameById`).
- Cycles blocked this run: 3, recorded in `.agents/fsa/cycles.json`. Reason: the change swapped a barrel import for direct imports but did not remove any cycle from the count (the importing files stay in cycles through `public-api/presentation.ts` barrels); a larger restructure is needed.
- Remaining: `npm run fsa:cycle -- count` reports total 69, open 66, blocked 3.
- `npm run fsa:deps` passes on origin/main (c15b27416): no new violations, 82 known violations ignored. An earlier preflight reported 2 `fsa-ratchet-src-features-agent-hooks` errors; they did not reproduce on this run.
- `npm run build` passes.
