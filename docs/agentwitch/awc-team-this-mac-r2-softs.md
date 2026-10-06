# feat/awc-team-this-mac-r2 — softs (defer)

**Stacked on:** `e5656748` (This computer Team display) + Dispatch computer task route.

## Softs deferred (OK)

1. **S4 Team tab merge** (`feat/awc-project-page-layout-s4*`) — Access panel body /
   Members list also prefer `memberKind`. Expect conflicts when landing both;
   resolve at integrate time; do not block this tip.
2. **Messenger computer threads** — Activity/Messages assign picker includes
   assignable computers; messenger bot-thread list does not grow computer rows
   on this tip.
3. **Result → task.done/blocked** — Dispatch bridge follow soft (see
   `awc-computer-task-route-rebase.md`).

## Assign contract (this tip)

- Picker: `inboxDispatchPeerOptions` — bots via `isAgent`; computers via
  `memberKind === "computer"` + `assignable === true` (skip too_old).
- Membership id for computers = access `members[].id` (no `membershipId` key).
- Copy says **computer** only (never AWL / agent / device). Status chrome stays
  gray/black/white on Team computer rows (display tip).
