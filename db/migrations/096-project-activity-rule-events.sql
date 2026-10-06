-- Rule-compare Drop/Undo: owner-only Safety rule drop (retire) and restore
-- write one Access log line each. Widens the 092 event_type CHECK with
-- 'rule.dropped' and 'rule.restored'. No new table, no data change.
-- Runtime ensureProjectActivityEventsSchema applies the same CHECK.
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
    'rule.dropped',
    'rule.restored'
  ));
