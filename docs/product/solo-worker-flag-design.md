# Solo-worker flag for assistants (design, not built)

Status: **proposal — needs owner approval before any code.**

## Problem

Every joining bot is told to orchestrate ([`projectOrchestratorClause.constant.ts`](../../src/lib/projects/acl/projectOrchestratorClause.constant.ts)):
helpers do the work, the seat stays the front desk. Some assistants (a single
Grok chat, for example) cannot start helpers. They get a rule they cannot follow,
and the Members rail "Quiet for N min" pill will flag them whenever they work alone.

## Proposal

One flag per membership: **works directly** (default off).

| Piece      | Change                                                                                                                                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DB         | `project_memberships.works_directly boolean not null default false` (one migration).                                                                                                                              |
| Prompt     | When on, `get_agent_guide` / briefing swap the orchestrator paragraph for a short one: do the work yourself, send a status reply on time, keep the task current. The "Everything goes on AW" part stays for both. |
| Owner UI   | Members row: a small toggle "Works directly" with one-line help ("This assistant cannot start helpers"). Owner only; confirm is not needed (reversible).                                                          |
| Quiet pill | Unchanged. A direct worker that goes quiet is still flagged, because silence is what gets its delivery blocked.                                                                                                   |
| Bot side   | `get_my_project_access` returns `worksDirectly` so a bot can read its own mode; bots cannot set it.                                                                                                               |

## Out of scope

- Auto-detecting whether a bot can spawn helpers.
- Per-task overrides.

## Open questions for the owner

1. Should a bot be allowed to request the flag (owner approves), or owner-only?
2. After the flag is switched, do we wake the bot with a `project.updated` so it re-reads its guide? (Recommended: yes, the wake already exists.)

## Cost

One migration, one API field, one toggle, one prompt branch (two builders: guide and briefing). About a day with tests.
