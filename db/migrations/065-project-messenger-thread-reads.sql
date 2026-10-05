-- Project messenger (Activity chat) unread tracking: one row per viewing user,
-- project, and thread. thread_key = bot membership id or 'whole' (no FK: the
-- Whole project thread has no membership). Opening a thread moves
-- last_read_at to its newest message; it never stamps project_messages.read_at
-- and never acks (actionable messages still need the bot's explicit ack).
-- 064 is taken by feat/awc-human-invite-email-lock; 059–061 are History's.

CREATE TABLE IF NOT EXISTS project_messenger_thread_reads (
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  thread_key TEXT NOT NULL,
  last_read_message_id TEXT,
  last_read_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, project_id, thread_key)
);

CREATE INDEX IF NOT EXISTS project_messenger_thread_reads_project_idx
  ON project_messenger_thread_reads (project_id);
