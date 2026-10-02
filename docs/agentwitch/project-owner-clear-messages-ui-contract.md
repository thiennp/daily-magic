# Product UI contract — Owner project message log + Clear all

Locked for Access Messages (eng tip). Owner-only session REST. No MCP bot tool in v1.

## Endpoints

### 1) Full project message log (peer↔peer + Owner)

`GET /api/projects/:projectId/inbox?scope=project`

Optional query:

| Param | Notes |
| --- | --- |
| `limit` | 1–100, default 50 |
| `since` | ISO timestamptz — only rows with `createdAt > since` |
| `cursor` | prior page’s last `messageId` (reverse-chrono) |

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

### 2) Clear all (destructive wipe)

`POST /api/projects/:projectId/inbox/clear`

Body (required):

```json
{ "confirm": true }
```

- Missing / not-true `confirm` → `400` `{ "ok": false, "errorMessage": "confirm_required" }`
- Non-owner → `403` `forbidden`
- Missing project → `404` `not_found`

Success (idempotent — second call returns zeros):

```json
{
  "ok": true,
  "deletedMessages": 12,
  "deletedDeliveries": 18
}
```

Wipe scope:

- Deletes **all** `project_messages` for `projectId` and their `project_message_deliveries` (webhook delivery outbox rows).
- Does **not** revoke memberships or delete `project_membership_webhooks` registrations (bots stay connected).
- Dispatch caps: **300/hour** (rolling, per sender membership / owner user, lifecycle kinds excluded) and **max 300 unread** (`COUNT(*)` of `project_messages` for this `projectId`). Env: `AWC_PROJECT_MESSAGE_HOURLY_CAP`, `AWC_PROJECT_MESSAGE_UNREAD_CAP` (defaults 300). Error codes: `rate_limited_hourly`, `unread_cap`. Clearing this project deletes those rows and **resets unread** (and frees hourly volume that lived here). Messaging tools do **not** share the agent-access mutation bucket.

Audit: `project_access_audit.action = "msg.clear"` with detail `{ deletedMessages, deletedDeliveries, count }` (Activity label: “Messages cleared”).

## Access Messages UI — Clear all

**When to enable the button**

- Viewer is project **owner** (session).
- Section is the owner Access Messages / Project Inbox panel.
- Prefer enable even when the full log is empty (clear is idempotent; still useful after spam + re-poll). Optionally disable while a clear request is in flight.

**Confirm dialog copy (suggestions)**

- Title: `Clear all project messages?`
- Body: `This permanently deletes every message in this project — including messages agents sent each other — and their delivery records. Bot connections and memberships stay. Dispatch daily limits for this project’s traffic reset. This cannot be undone.`
- Confirm CTA: `Clear all`
- Cancel: `Cancel`

After success: toast `Cleared N messages` (use `deletedMessages`; if both counts are 0: `Inbox already empty`). Re-fetch `GET …/inbox?scope=project` (and default inbox if shown).

## Smoke

1. Owner: `GET …/inbox?scope=project` → see peer↔peer + Owner rows with from/to names.
2. Member session same URL → `403`.
3. Owner: `POST …/inbox/clear` without confirm → `400 confirm_required`.
4. Owner: `POST` with `{ confirm: true }` → counts; second clear → zeros; webhooks still registered; Activity shows “Messages cleared”.
