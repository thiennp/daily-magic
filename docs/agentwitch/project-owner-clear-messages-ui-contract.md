# Product UI contract — Owner project message log + Clear all

Locked for Access Messages (eng tip). Owner-only session REST. No MCP bot tool in v1.

## Endpoints

### 1) Full project message log (peer↔peer + Owner)

`GET /api/projects/:projectId/inbox?scope=project`

Optional query:

| Param    | Notes                                                |
| -------- | ---------------------------------------------------- |
| `limit`  | 1–100, default 50                                    |
| `since`  | ISO timestamptz — only rows with `createdAt > since` |
| `cursor` | prior page’s last `messageId` (reverse-chrono)       |

Auth: session cookie, **project owner only** → `403` otherwise (`errorMessage: "forbidden"`). Missing project → `404`.

Success:

```json
{
  "ok": true,
  "projectId": "<id>",
  "scope": "project",
  "messages": [
    {
      "messageId": "...",
      "kind": "task.assign",
      "summary": "...",
      "refs": {},
      "fromProjectDisplayName": "AliceBot" | "Owner" | null,
      "fromMembershipId": "..." | null,
      "toProjectDisplayName": "BobBot" | null,
      "toMembershipId": "..." | null,
      "toUserId": "..." | null,
      "toTeamLabel": "..." | null,
      "createdAt": "ISO",
      "ackedAt": "ISO" | null
    }
  ],
  "nextCursor": "<messageId>" | null
}
```

Notes:

- Default `GET …/inbox` (no `scope`) stays **actor-addressed** inbox (unchanged).
- Full log includes peer↔peer and Owner-addressed rows for this `projectId`.
- `ackedAt` is present when stored; delete-on-ack means many live rows have `ackedAt: null` until TTL purge.

### 2) Clear all → archive (never deletes)

Product LOCK: `docs/design/chat-retention/CLEAR-ALL-LOCK.md` (2026-10-06).

`POST /api/projects/:projectId/inbox/clear`

Body (required):

```json
{ "confirm": true }
```

- Missing / not-true `confirm` → `400` `{ "ok": false, "errorMessage": "confirm_required" }`
- Non-owner → `403` `forbidden`
- Missing project → `404` `not_found`

Success (idempotent — second call archives 0 and returns `archiveBatch: null`):

```json
{
  "ok": true,
  "archivedMessages": 12,
  "archiveBatch": "2026-10-06 11:48:12.123456+00"
}
```

Scope:

- Sets `archived_at` + `archived_by` on every not-yet-archived `project_messages` row for `projectId` (migration 098; index `(project_id, archived_at)`). **No DELETE, no CASCADE**; `project_message_deliveries`, memberships and webhook registrations are untouched. Row count is unchanged.
- Project-wide: archived rows leave the Inbox for everyone and stay readable under the **Archived** filter by anyone who could read them before (`GET …/inbox?scope=project&archived=1`). Both list responses carry `archivedCount` and `canRestore` (owner only).
- Assistants: archived rows are excluded from the actor inbox (unread/pending delivery). Already-delivered stays delivered; archive never re-sends.
- Unread cap (`AWC_PROJECT_MESSAGE_UNREAD_CAP`, default 300) counts **not-archived** rows, so Clear all frees unread slots. Hourly cap unchanged.
- Archived rows are never removed by the unacked TTL purge, delete-on-read, ack, or member revoke (revoked members' messages stay in Archived for the owner). No purge timer.
- Access log (`project_activity_events`): every Clear all writes `messages.archived` with `detail.count`.

### 3) Restore (owner only)

`POST /api/projects/:projectId/inbox/restore`

Body — exactly one of:

- `{ "messageId": "<id>" }` — one message
- `{ "archiveBatch": "<archiveBatch from clear>" }` — toast **Undo** (6s), restores that Clear all only
- `{ "all": true }` — Restore all

Success: `{ "ok": true, "restoredMessages": 3 }`. Clears `archived_at`/`archived_by`. Non-owner → `403 forbidden`; bad body → `400 invalid_target`. Every Restore writes `messages.restored` with `detail.count` to the Access log.

## Access Messages UI — Clear all / Archived

Copy keys and EN live in `awcProjectInboxCopy.constant.ts` (`clearAll.*`, `archived.*`, `activity.*`) and must match the LOCK table. Never say "delete", "wipe" or "permanently" in this flow.

- Clear all bar stays where it was (owner surface). Confirm: `Clear all messages?` / `They move to Archived. You can restore them any time.`
- Toast: `Cleared {n} messages. They're in Archived.` (`toastOne` for 1) with **Undo** for 6s.
- `Archived ({n})` toggle for every reader. Rows show **Restore**; header **Restore all** (confirm `Restore all archived messages?`). Non-owners see both disabled with `Only the project owner can restore messages.`

## Smoke

1. Owner: `GET …/inbox?scope=project` → peer↔peer + Owner rows, `archivedCount`, `canRestore: true`.
2. Owner: `POST …/inbox/clear` without confirm → `400 confirm_required`.
3. Owner: `POST` with `{ confirm: true }` → `archivedMessages` + `archiveBatch`; Inbox list empty; `?archived=1` lists the same rows; second clear → 0.
4. Undo within 6s → rows back in Inbox; Access log shows "You cleared N messages to Archived" and "You restored N messages".
5. Viewer/member: can open Archived; Restore disabled with the owner-only reason; `POST …/inbox/restore` → `403`.
