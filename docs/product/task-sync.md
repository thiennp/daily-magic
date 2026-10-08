# Task sync (Linear)

Two-way sync of project tasks and Linear issues (adapter: `taskSync/taskSync.types.ts`; Jira planned).

## What syncs

Title, status, priority, description (200 chars max on the AW side). Not synced: assignee, stage, dependencies, comments.

## Mapping

| AgentWitch  | Linear state type                              |     | Linear state type         | AgentWitch  |
| ----------- | ---------------------------------------------- | --- | ------------------------- | ----------- |
| queued      | unstarted                                      |     | triage, unstarted         | queued      |
| planned     | backlog                                        |     | backlog                   | planned     |
| in_progress | started                                        |     | started                   | in_progress |
| blocked     | started + label "Blocked" (created if missing) |     | started + "Blocked" label | blocked     |
| done        | completed                                      |     | completed, canceled       | done        |

States are resolved per team by **type**, never by name. Priority: p0=1 Urgent, p1=2 High,
p2=3 Medium, p3=4 Low, none=0 (and back).

## Direction and loop guard

- AW -> Linear: every local writer calls `afterProjectTaskWrite({task, origin})` (create/update);
  `origin: "linear"` (pull side) never pushes back. Best effort; failures land in `last_error`.
- New issues: the id is generated client-side (`IssueCreateInput.id`, UUID v4) and the link row
  is reserved BEFORE `issueCreate`, so a webhook always finds its link (no title heuristic). A
  failed create deletes the reservation; a reserved link ("pending") ignores webhooks.
- Linear -> AW: signed webhook (`Linear-Signature` HMAC-SHA256, 60 s freshness). Each link stores
  `last_synced_hash`; a payload whose fields hash equals it (our own push echoed) is ignored.
  Moves go through the status FSM; unreachable ones are skipped and recorded in `last_error`.
- Linear descriptions over 200 chars: the AW description is kept on pull; the link stores
  `clipped_description_hash` (AW text at that time). Push omits the description until the AW
  text differs from it (an AW-side edit), then sends it and clears the marker.
- New Linear issues in the chosen team become tasks only if `importNew` is on. Deleted or
  archived issues are just unlinked (the task stays).
- Disconnecting Linear deletes the webhook (before the token is revoked) and sets enabled=false,
  webhook id/secret cleared; links and team id stay so a reconnect resumes.

## Enable

1. Owner connects Linear in the project's Connections.
2. `GET /api/projects/:id/task-sync/linear` lists teams; owner `PUT`s `enabled` + `externalTeamId`
   (registers the webhook at `<public base URL>/api/projects/:id/connections/linear/webhook`).
3. `POST .../task-sync/linear/sync` pushes existing tasks in batches of 40 (repeat while
   `remaining` > 0), then on the last round PULLS team issues updated since `last_pulled_at`
   (3 pages x 100; watermark only advances when all pages were read) through the webhook's
   loop-guarded path. Returns `{ pushed, failed, unchanged, remaining, pulled }`. Works without a webhook.

## OAuth scopes and reconnect

Registering the webhook needs the Linear **`admin`** scope (linear.app/developers/webhooks); the
connection requests `read,write,admin`. Older `read,write` connections must **disconnect and
reconnect** (as a workspace admin) before enabling sync. Access tokens live 24 h; refresh on a 401. Rate limits (5,000 req/h) come back as HTTP 400 `RATELIMITED` -> `linear_rate_limited`.

## Limits

Public HTTPS base URL needed for the webhook (localhost: push and "Sync now" pull work, live
webhook does not). Max 500 tasks per project. Archived issues are not seen by the pull.
