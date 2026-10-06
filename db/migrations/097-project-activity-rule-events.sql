-- Rule-compare Drop/Undo: owner-only Safety rule drop (retire) and restore
-- write one Access log line each. Widens the event_type CHECK with
-- 'rule.dropped' and 'rule.restored'. Numbered 097 because S0-7 owns 096
-- (stop_requested). CHECK list is the UNION of every type already on main
-- (092 + 095) plus rule.*; do not drop another's types. No new table, no
-- data change. Runtime ensureProjectActivityEventsSchema applies the same CHECK.
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
    'project.runs_without_approval_disabled',
    'rule.dropped',
    'rule.restored'
  ));
