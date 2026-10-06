-- Inbox "Clear all" → archive (Product LOCK 2026-10-06,
-- docs/design/chat-retention/CLEAR-ALL-LOCK.md). Clear all sets
-- archived_at/archived_by on project_messages; it never deletes rows and never
-- touches project_message_deliveries. Restore (owner only) clears both columns.
ALTER TABLE project_messages ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ;
ALTER TABLE project_messages ADD COLUMN IF NOT EXISTS archived_by TEXT;

CREATE INDEX IF NOT EXISTS project_messages_project_archived_idx
  ON project_messages (project_id, archived_at);

-- Access log: every Clear all and every Restore writes one row.
-- Single ALTER so the swap is atomic; NOT VALID skips re-checking old rows.
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
    'messages.archived',
    'messages.restored'
  )) NOT VALID;
