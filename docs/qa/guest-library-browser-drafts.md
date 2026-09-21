# Guest library drafts in the browser

## Query aliases

- guest library without login
- library không cần đăng nhập
- save workflow to browser localStorage
- sync guest library after sign in
- reconciliation latest wins library
- cursor agent hooks library guest

## Short answer

Unsigned users can open **AWC** `/library`, save starter templates or custom workflows to **browser `localStorage`** (`agentwitch.library.guest-drafts.v1`), and edit the list on that device only. After sign-in, a shell listener syncs drafts to the user’s cloud library via existing capabilities APIs; **newer `updatedAt` wins**, and the cloud copy wins on a tie.

**Running workflows:** guests cannot open a library workflow in the send-task composer (redirect to sign-in). Signed-in users need a **dispatch-ready Mac** or **Cursor Cloud API key** before Send is enabled; otherwise the composer shows `WorkflowTrialRunGatePanel` with connect / API-key CTAs.

## Details

| Layer        | Behavior                                                                                |
| ------------ | --------------------------------------------------------------------------------------- |
| Guest UI     | `GuestLibraryPanel`, “Save to this browser”, `submitGuestPlaybook`                      |
| Storage      | `src/lib/library/guest/guestLibraryDraftStorage.ts`                                     |
| Reconcile    | `planGuestLibraryReconciliation` → push (`POST`/`PATCH`) or drop local                  |
| Sync trigger | `GuestLibraryDraftSyncListener` in `AppShell` on session → signed-in                    |
| Run workflow | Guest → sign in; signed-in → Mac or Cursor Cloud (`resolveWorkflowTrialRunEligibility`) |

## Cursor agent hooks (not React hooks)

Guest library does **not** register custom entries in `.cursor/hooks.json`. Edits under `src/features/library/` and `src/lib/library/guest/` are still covered by the repo-wide agent hooks (`postToolUse` / `stop` → architecture + structure validation). See [docs/conventions/cursor-hooks.md](../conventions/cursor-hooks.md).

Prefer pure helpers in `src/lib/library/guest/` (e.g. reconcile, storage) over new React hooks when logic is not UI-bound.

## Related

- [docs/product/concepts.md](../product/concepts.md) — Library definition
- `src/features/library/README.md`
- HOME-006 pattern (local flag + API migrate); guest library uses capabilities APIs instead

## Last reviewed

2026-09-21
