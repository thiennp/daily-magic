-- Owner decides what project members can do (publish / delete skills, auto
-- skills). Default and every existing project: members may do everything, so
-- the column is '{}' and only denied keys are stored, e.g. {"skill.delete": false}.
-- Owner-only actions are not configurable. Re-runnable.
ALTER TABLE user_projects
  ADD COLUMN IF NOT EXISTS member_permissions JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Access log: every real change is one row. CHECK is the UNION of every type
-- already on main (092 + 095 + 097 + 098) plus project.member_permissions_changed.
ALTER TABLE project_activity_events
  DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check,
  ADD CONSTRAINT project_activity_events_event_type_check CHECK (event_type IN (
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
    'project.runs_without_approval_disabled',
    'rule.dropped',
    'rule.restored',
    'messages.archived',
    'messages.restored',
    'project.member_permissions_changed'
  )) NOT VALID;
