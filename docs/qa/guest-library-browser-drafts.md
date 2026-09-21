# Guest library drafts in the browser

## Query aliases

- guest library without login
- library không cần đăng nhập
- save workflow to browser localStorage
- sync guest library after sign in
- reconciliation latest wins library

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

## Related

- [docs/product/concepts.md](../product/concepts.md) — Library definition
- `src/features/library/README.md`
- HOME-006 pattern (local flag + API migrate); guest library uses capabilities APIs instead

## Last reviewed

2026-09-21
