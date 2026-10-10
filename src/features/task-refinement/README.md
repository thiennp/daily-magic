# Task refinement

Splits a request into single-purpose child tasks, attaches the closest skill, picks the cheapest effort, and lets one agent at a time take a task with a lease. Built on the existing project tasks (`project_task_records`); the new state lives in a side table so the existing task writers are untouched.

## Registry

- **Slug:** `task-refinement`
- **Feature path:** `src/features/task-refinement` (FSA)
- **Lib path:** `src/lib/projects/tasks/refine` (schema ensure, queries, pure helpers; `src/lib` may not import features)
- **Shared logic:** `packages/shared/src/taskRefinement` (effort tiers, dedupe, parent status roll-up, caps; also used by AWL)
- **Migration:** `db/migrations/135-project-task-refinement.sql` (runtime `ensureProjectTaskRefinementSchema` mirrors it)
- **MCP tools:** `split_project_task`, `claim_project_task`, `release_project_task`, `list_project_task_blockers` (definitions in `src/lib/agentAccess/projectTaskRefineTools.constant.ts`, executed by `executeTaskRefinementTool`, injected by the three agent-access routes)

## Rules

| Rule              | Value                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Split             | ≤10 subtasks per call, ≤20 per parent, no nesting; repeats dropped (same skill + params, or same normalized title)                                                                                |
| Assignee          | every child goes to the parent's owner                                                                                                                                                            |
| Skill             | closest published skill by the same match bar as `list_project_skills`; none = `script` tier with no skill                                                                                        |
| Bot with no skill | child is blocked on `skill`; publishing a matching skill unblocks it (task.updated is sent)                                                                                                       |
| Claim             | atomic, 5 minute lease, fence goes up on every win; a late result with an old fence is `stale_claim`                                                                                              |
| Release           | `done` needs `resultSummary` and should carry `verifySignal` (else flagged unverified); `failed` climbs one tier, 3 failures hand to a person; `blocked` is counted, more than 3 hand to a person |
| Stale skill block | over 24h on a skill is handed to a person (`list_project_task_blockers`)                                                                                                                          |
| Parent status     | derived from its children, never set by hand                                                                                                                                                      |

## AWL side

`agent-witch task-intake remember|forget|status|suggest` (see `apps/live/features/token-saver`). The saved always-yes choice lives under `~/.agent-witch/profiles/<email>/`, never in a repo, and is ignored once the project's folder claim is gone.

## Removing old tasks

`npm run tasks:purge-old -- --before <date>` is a dry run that exports first; add `--confirm` to delete (done/cancelled only unless `--include-open`).
