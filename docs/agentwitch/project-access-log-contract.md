# Access log: API contract for Human UI (Invite S1)

**Owner:** AW Invite (backend) · **Consumer:** Human UI (U1) · **Copy:** `docs/design/activity-restore/COPY.md` (Product EN lock)

The Access log is an owner-only list of changes to who can use a project and how each assistant gets messages. It lives in the **Team/Members rail**, owner-only. It is **not** the Activity tab, which stays the messenger. Invite ships no UI. Human UI owns every component.

## Client entry points

- Fetch helper: `src/features/projects/activityLog/fetchProjectAccessLog.ts` → `fetchProjectAccessLog({ projectId, cursor?, limit?, category?, since? }, { signal? })`
- Types: `src/features/projects/activityLog/projectAccessLog.type.ts` (re-exports the server DTO from `src/lib/projects/acl/activity/types/ProjectActivityLog.type.ts`)
- Result: `{ ok: true, data: ProjectActivityLogResponse }` or `{ ok: false, status, error }`, where `error` is `owner_only | not_found | invalid_cursor | invalid_query | unauthorized | network`.

## HTTP

`GET /api/projects/{projectId}/activity` (session cookie)

| Query | Meaning |
|---|---|
| `limit` | 1–100, default 50 (clamped) |
| `cursor` | the opaque `nextCursor` from the previous page ("Show older") |
| `category` | `access` (people and invites) or `wake` (how assistants get messages). Omit for All. |
| `since` | optional ISO lower bound (inclusive) |

| Status | Body |
|---|---|
| 200 | `ProjectActivityLogResponse` (below) |
| 401 | not signed in (`{ error: "Unauthorized" }` from the auth guard; the helper maps it to `unauthorized`) |
| 403 | `{ ok: false, error: "owner_only" }` for **any** signed-in non-owner, members included |
| 404 | `{ ok: false, error: "not_found" }` |
| 400 | `{ ok: false, error: "invalid_cursor" }` or `{ ok: false, error: "invalid_query" }` (bad `category` / `since`) |

```jsonc
{
  "ok": true,
  "projectId": "…",
  "events": [{
    "id": "…",
    "type": "member.delivery_mode_changed",
    "category": "wake",                     // access | wake (derived from type)
    "at": "2026-10-06T09:12:00.000Z",       // ISO UTC
    "actor": { "kind": "member", "userId": "…", "displayName": "Buni" },
    "target": { "membershipId": "…", "userId": "…", "displayName": "Buni" },  // or null
    "detail": { "membershipId": "…", "deliveryMode": "poll", "previousDeliveryMode": "webhook", "trigger": "member_switch" }
  }],
  "nextCursor": "…",                        // null on the last page
  "retention": { "maxEvents": 500, "maxAgeDays": 180 }
}
```

Rules:

- **Structured data only.** No English is stored or returned. Build every line from `type` + `actor` + `target` + `detail` with the COPY.md keys.
- **Names** are snapshots written at the time (they survive removal and renames), falling back to the live project display name. `actor.displayName` is always `null` for `owner` (render "You") and `system`.
- **Never an email.** Emails are never stored or returned, not even masked. Labels that look like an email are dropped on write and on read.
- **Unknown `type`:** skip the row (forward compatibility).
- **Paging** is keyset on `(at, id)`. It survives retention trims: if older rows were trimmed between pages, the list simply ends (`nextCursor: null`), with no error and no duplicates.
- **Retention** (trimmed on write): newest `maxEvents` per project, nothing older than `maxAgeDays`. Read the numbers from `retention`; never hard-code them.

## Event types

| `type` | `actor.kind` | Written by | `detail` keys (all optional) |
|---|---|---|---|
| `invite.created` | owner | `createProjectInvite` (via `writeProjectAccessAudit` `invite.create`) | `inviteId`, `label` (F3), `autoApprove`, `maxUses`, `expiresAt`, `teamLabel` |
| `invite.revoked` | owner | `revokeProjectInvite` (`invite.revoke`) | `inviteId`, `label` (F3) |
| `invite.auto_approve_enabled` | owner | `createProjectInvite` (box ticked) / `updateProjectInviteAutoApprove`, linked to the 073 row | `inviteId`, `label` |
| `invite.auto_approve_disabled` | owner | `updateProjectInviteAutoApprove`, linked to the 073 row | `inviteId`, `label` |
| `member.auto_approved` | **system** | `tryAutoApproveInviteRedeem`, linked to the 073 row | `inviteId`, `label`, `membershipId`, `approvalSource: "invite_auto_approve"` |
| `request.approved` | owner | `finalizeApprovedMembership`, **only** when `approvalSource = "owner"` | `requestId`, `membershipId`, `approvalSource: "owner"` |
| `request.denied` | owner | `denyProjectAccessRequest` | `requestId`. `target.displayName` = the requester's account name snapshot (F2), else null → `.noName` |
| `member.removed` | owner | `revokeProjectMembership` (assistants/computers) and `removeHumanProjectMembership` (people) | `membershipId`, `memberKind` (F5: `bot` / `human` / `computer`), `role` (people only) |
| `member.left` | member | `applyLeaveProjectMembershipSideEffects` | `membershipId`, `memberKind` (F5) |
| `human_invite.created` | owner | `issueHumanProjectInvite` | `inviteId`, `label`, `role` (F1: `member` / `viewer`), `expiresAt` |
| `human_invite.revoked` | owner | `revokeHumanProjectInvite` (after Undo, F8) | `inviteId`, `label`, `role` (F1) |
| `human_invite.accepted` | member | `redeemHumanProjectInvite` | `inviteId`, `label`, `role`, `membershipId`, `memberKind: "human"` |
| `member.delivery_mode_changed` | owner / member / system | Wake S5 `changeProjectMembershipDeliveryMode` (`membership.delivery_mode`) | `membershipId`, `deliveryMode`, `previousDeliveryMode` (F7), `trigger`: `owner_switch` / `member_switch` / `wake_link_saved` (derived from `actor.kind` when not stored) |

Not logged on purpose: messages (`msg.*`, including "Delete all messages"), project keys, wake-link registration, tool calls, claim/check, join requests, invite redeems that stay pending, renames.

`wake_link_saved` (system) appears only once Wake adds that event (COPY F6). It is not written today.

### Product flags covered

- **F1:** `detail.role` is on `human_invite.created` and `human_invite.revoked`. The invited email is never stored.
- **F2:** `request.denied` snapshots the requester's account name in `target.displayName` (Product OK in COPY §7). It is null when there is none, or when the name looks like an email.
- **F3:** `detail.label` (the 8-character invite label) is on `invite.created` and `invite.revoked`.
- **F5:** `detail.memberKind` is on `member.removed` and `member.left` (`bot` = assistant).
- **F7:** `detail.previousDeliveryMode` is on delivery mode changes. There are only two modes, and S5 logs only on a real change.
- **F8:** human invite **Revoke** and human member **Remove** are logged only once the 10-second Undo window has committed. The client (`useDeferredDestructiveAction`) sends the revoke/remove API call only after the window ends, or on navigate-away. Undo cancels the call, so the server never sees it. The server writes the row only after its `UPDATE` succeeds. An undone action, or one that loses a race (already revoked/redeemed, no longer active), logs nothing.

## Agents (MCP)

`list_project_activity` returns the same body to the project owner's agent-access token. Any other caller, including a member bot using a project key, gets `{ ok: false, code: "owner_only" }`. It takes the same `cursor` / `limit` / `since` / `category` arguments.

## Backend notes (Invite)

- Table `project_activity_events`, migration `db/migrations/092-project-activity-events.sql`. Append-only. The only deletes are the retention trim and project delete (cascade).
- Writer `writeProjectActivityEvent` never throws. `writeProjectAccessAudit` keeps its name and maps allowed actions onto it, ignoring the rest.
- 073 (`project_invite_auto_approve_events`) is still written. Each 073 row is mirrored once (`source_ref = '073:<id>'`). Migration 092 backfills existing rows. After deploy, run `npx tsx scripts/db-backfill-project-activity-073.ts` once to close the migrate→deploy gap (idempotent).
