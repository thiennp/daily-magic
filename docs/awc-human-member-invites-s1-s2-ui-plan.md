# Human member invites — S1–S2 UI (implemented)

**Branch:** `feat/awc-human-member-invites-ui` (local only — **no push**)  
**Merged S0 tip:** `68761257e9de1f9a5af71c6f7e68147ecff9487f` (`feat/awc-human-member-invites-s0`)  
**Lead GO overrides:** viewers read-only messages; Remove/Revoke = one-click + 10s Undo; Bots & people tab; Copy link only on POST create.

## Shipped wiring

| Slice | What |
|-------|------|
| S1 accept | `/invite/h/[token]` + `POST /api/invite/h/{token}/accept` |
| S1 unlock | `authorizeProjectPageActor` → project page allows human member/viewer |
| S1 viewer | Inbox `canCompose={false}` — no composer / clear |
| S2 invite | People section Invite person → POST create → url banner once |
| S2 pending | GET human-invites; Revoke schedules DELETE + 10s Undo |
| S2 joined | Filter `memberKind=human` (fallback `!isAgent`); Remove + 10s Undo |

## Undo

`useDeferredDestructiveAction`: optimistic hide → 10s window → commit API unless Undo cancels. Not a confirm modal.

## memberKind

`MembershipView` now includes `memberKind` from S0 row map. Client filter still stubs `!isAgent` when field absent.
