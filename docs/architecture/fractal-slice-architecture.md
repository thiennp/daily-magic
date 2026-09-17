# Fractal Slice Architecture — target description (draft)

> **Status:** Draft placeholder for **step 2** of the FSA initiative.  
> **Binding policy today:** [ADR 0007](../adr/0007-fractal-slice-architecture.md) and [FSA workflows](../conventions/fsa-workflows.md).  
> Do not treat this file as fully authoritative until promoted from draft and ADR 0007 is updated if needed.

## Purpose of this document (upcoming)

This page will contain the **detailed** architecture description:

- Full directory tree per deployable (**AWC**, **AWL**, **AWB**, **AWI**) — see [agent-witch-deployables.md](../product/agent-witch-deployables.md)
- Full directory tree for AWC (`entry`, `shared`, `features`, `hubs`)
- Mapping from every current registry slug to target `public-api` exports
- Hub catalog (commands, queries, ownership)
- Import boundary examples (`@/features/dispatch/public-api/presentation`)
- Bundle/server split rules for Next.js App Router
- Diagrams (system + feature slice)

## What is already decided (see ADR 0007)

- Vertical slices per `src/features/<slug>/` with `public-api/`, `internal/`, optional nested `features/`
- `src/app/` + `server.ts` as orchestrator; thin route handlers
- No cross-feature `internal/` imports; segregated public contracts
- Cross-feature effects via `src/hubs/` (CQRS-style), not opaque pub/sub
- Incremental migration per slug; playbooks in `.cursor/commands/command-fsa-*.md`

## Refactoring plan

Working migration order and top-level feature inventory: **[fsa-refactoring-plan.md](fsa-refactoring-plan.md)**.

## Next step (step 2)

When authoring the full description:

1. Inventory `features.registry.json` and `libPath` entries (see **fsa-refactoring-plan.md** §1).
2. Propose hub boundaries for dispatch, agent runs, and notifications.
3. Add mermaid diagrams to this file.
4. Mark sections Accepted in ADR 0007 or add ADR 0008 if hubs need a separate decision record.

Until then, agents implementing or refactoring features must use [fsa-workflows.md](../conventions/fsa-workflows.md) only.
