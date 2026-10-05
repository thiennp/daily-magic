-- Delete-on-read: stamp read_at on inbox fetch; hard-delete later when
-- delivery is terminal or unwatched. Outcome rows keep wake result for the
-- owner after the message is gone (no FK to project_messages).
-- computer_acks is History's table (feature 551bf17d); cloud delete may wait
-- on a row here when that feature is ready or degraded.

ALTER TABLE project_messages
  ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS project_messages_read_delete_idx
  ON project_messages (read_at)
  WHERE read_at IS NOT NULL;

CREATE TABLE IF NOT EXISTS project_message_outcomes (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  message_id TEXT NOT NULL,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  recipient_user_id TEXT,
  recipient_membership_id TEXT,
  final_b2b_state TEXT,
  grok_wake_result TEXT,
  deleted_reason TEXT NOT NULL,
  message_created_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (message_id)
);

CREATE INDEX IF NOT EXISTS project_message_outcomes_project_idx
  ON project_message_outcomes (project_id, deleted_at DESC);

-- No FK to project_messages: ack and delete-on-read remove the message row.
CREATE TABLE IF NOT EXISTS project_message_computer_acks (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  message_id TEXT NOT NULL,
  acked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, message_id)
);

CREATE INDEX IF NOT EXISTS project_message_computer_acks_message_idx
  ON project_message_computer_acks (message_id);
