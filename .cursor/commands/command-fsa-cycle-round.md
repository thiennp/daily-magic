---
name: command-fsa-cycle-round
description: >-
  One bounded round of the FSA cycle burn-down: break exactly one runtime import cycle by moving shared declarations to a leaf file, with zero behavior change.
---

# FSA cycle burn-down — one round

Context: [fsa-loop-plan.md](../../docs/architecture/fsa-loop-plan.md) § Cycle debt. Barrels created ~48 runtime import cycles. A round breaks **one** cycle. No logic change, ever.

## 0. Preflight

Clean tree; `git fetch origin main && git reset --hard origin/main`; `BASE=$(git rev-parse HEAD)`; `npm run fsa:deps` passes.

## 1. Pick

`npm run fsa:cycle` → `{"kind":"cycle","key","files":[a,b,c…]}` (shortest first) or `{"kind":"done"}` (finish).

## 2. Find the edge to cut

Read each hop in the cycle. Choose the edge whose imported symbols are **declarations with no dependency back into the cycle**: types, interfaces, constants, enums, or pure functions. Prefer, in order:

1. A hop that goes through a `public-api` barrel only to reach one pure symbol → import that symbol from a lower, non-cyclic file (a leaf).
2. A declaration used by two cycle members → move it **verbatim** to a new leaf file next to its owner (`*.type.ts`, `*.constant.ts`, or a camelCase util), imports of the leaf must not reach the cycle. Leave the old location re-exporting it (`export { X } from "./leaf"`) so other importers keep working, or repoint importers if there are ≤ 3.
3. A type-only dependency that is runtime in disguise (value import used only as a type) → `import type`.

Never: change a function body, signature, default/named export kind, or runtime ordering; add a new event bus; touch `src/app/**/route.ts` beyond imports; move a React component or hook; create an `index.ts` barrel.

Limits: ≤ 6 files touched, ≤ 1 new file. If the cycle needs more, or needs a real behavior/design change → block it:
`npm run fsa:cycle -- block "<key>" "<one-line reason>"`, commit `.agents/fsa/cycles.json`, push, next round.

## 3. Verify (all must pass)

```bash
npx tsc --noEmit
npm run fsa:deps:baseline        # must SHRINK (cycle gone); never grow
npm run fsa:deps
npm run cursor:architecture -- --staged
npm run validate:staged
npm run test:related
npm run build                    # every cycle round: code moved
```

Edit with minimal diffs; do not run prettier over a whole file that is not already prettier-clean (it can grow it past the 100-line gate; the gate is a ratchet).

## 4. Commit, review, push

Commit `refactor(fsa): break cycle <short names>`. A **review subagent** confirms: moved declarations are byte-identical, no behavior or export-kind change, cycle really gone. It fixes small problems; otherwise the round fails. Then `git fetch origin main`; if `origin/main` is an ancestor of HEAD, `git push origin HEAD:main` (fast-forward only). If main moved: `git reset --hard origin/main` and redo the round. 3 tries, then block the cycle.

Fail: `git reset --hard origin/main`, block the cycle, push the state commit.

## 5. Next

Back to step 0, no questions. Stop when `done`, after 8 blocked in a row, or when preflight fails twice.
