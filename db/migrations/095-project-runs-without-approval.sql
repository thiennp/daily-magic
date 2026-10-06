-- S0-2 (Local CLI safety fix, Lead GO 2026-10-06): per-project
-- "Allow runs without approval" for tasks assigned to a project computer.
-- Owner-only, default OFF. ON only skips the approval card for requesters who
-- are not the computer's owner; the workspace-write sandbox and the
-- turn/minute/budget limits in AgentWitch Local always apply.
-- Re-runnable: ADD COLUMN IF NOT EXISTS + DROP/ADD of the named CHECK.
-- (094 is composer sticky on main; pitfall-seeds is 099.)

ALTER TABLE user_projects
  ADD COLUMN IF NOT EXISTS allow_runs_without_approval BOOLEAN NOT NULL DEFAULT FALSE;

-- Access log (092): every change is one row. Extend the closed event list.
-- The list must equal PROJECT_ACTIVITY_EVENT_TYPES (projectActivityMigration095.test.ts).
ALTER TABLE project_activity_events
  DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check;

ALTER TABLE project_activity_events
  ADD CONSTRAINT project_activity_events_event_type_check
  CHECK (event_type IN (
    'invite.created',
    'invite.revoked',
    'invite.auto_approve_enabled',
    'invite.auto_approve_disabled',
    'member.auto_approved',
    'request.approved',
    'request.denied',
    'member.removed',
    'member.left',
    'human_invite.created',
    'human_invite.revoked',
    'human_invite.accepted',
    'member.delivery_mode_changed',
    'project.runs_without_approval_enabled',
    'project.runs_without_approval_disabled'
  ));
