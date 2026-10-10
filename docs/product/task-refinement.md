# Task refinement

How a request becomes small tasks that agents (and scripts) can finish cheaply. Feature README: `src/features/task-refinement/README.md`.

```text
request ──► awb/agent-witch task-intake (hook or `status`) ──► ask / create task
        └─► split_project_task ──► child tasks (skill + params + effort tier)
                 │
                 ├─ skill matched ........ run its script, no agent (tier `script`)
                 ├─ no skill, owner CLI .. CLI makes + publishes the skill
                 ├─ no skill, owner bot .. child blocked on `skill` ─► CLI wakes,
                 │                         list_project_task_blockers ─► publish skill ─► unblocked
                 └─ not scriptable ....... cheapest agent tier (low ─► medium ─► high on verified failure)

claim_project_task (lease + fence) ─► work ─► release_project_task (done + verifySignal | failed | blocked | released)
parent status = roll-up of its children
```

## Worst case

If nothing in this path works, a ticket is just a ticket: refinement only adds children and metadata next to it, never replaces it, so a task can still be created, assigned, run and completed exactly as before.

## Cost

Scripts cost no tokens. A new skill is paid for once and reused. Agents start at the lowest tier; a tier is only climbed after a failed run, and every tier change is stored on the task.

## Reliability

Atomic lease claim with a fence, retry caps (3 failures, 3 blocks, 24h on a skill), a verify signal on done, and one chat line per block with a counter.

## Security

Skills are the existing signed bundles (content hash, per-script sha256, declared write/network permissions, local approvals). The saved always-yes choice stays outside repos, needs the user's own reply, and is dropped when the project's folder claim goes away.
