# Task sync (Linear)

Two-way sync between project tasks and Linear issues. Provider-neutral adapter
(`src/lib/projects/taskSync/taskSync.types.ts`); only Linear is implemented. Jira is planned.

## What syncs

Title, status, priority, description (200 chars max on the AW side). Not synced in v1:
assignee/owner, stage, dependencies, comments.

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

- AW -> Linear: after a task is created/changed, issue is created/updated (best effort, never
  blocks the task write; failures land in `last_error`). Token refreshed once on 401.
- Linear -> AW: signed webhook (`Linear-Signature` HMAC-SHA256, 60 s freshness). Each link stores
  `last_synced_hash` of the mapped fields; a webhook whose fields hash equals it (our own push
  echoed back) is ignored. Real changes go through the status FSM step by step; unreachable
  moves are skipped and recorded in `last_error`. Actor is shown as "Linear".
- New Linear issues in the chosen team become tasks only if `importNew` is on. Deleted or
  archived issues are just unlinked (the task stays).

## Enable

1. Owner connects Linear in the project's Connections.
2. `GET /api/projects/:id/task-sync/linear` lists teams; owner `PUT`s `enabled` + `externalTeamId`
   (registers the webhook at `<public base URL>/api/projects/:id/connections/linear/webhook`).
3. `POST .../task-sync/linear/sync` pushes existing tasks in batches of 40 (repeat while `remaining` > 0).

## Limits

Public HTTPS base URL needed for the webhook (localhost: push works, pull does not). Linear
descriptions longer than 200 chars are truncated when pulled. Max 500 tasks per project.
