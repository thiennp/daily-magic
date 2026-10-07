-- Neon keep-newest-300 per chat (HARD after IndexedDB).
-- chat_key groups rows for prune; per-device computer acks; prune outcome reason.
-- Soft ensure mirrors additive ADD COLUMN / CREATE INDEX / unique swap only.

ALTER TABLE project_messages
  ADD COLUMN IF NOT EXISTS chat_key TEXT;

-- Backfill: whole when no single address; else bot/team/system/pair heuristics.
UPDATE project_messages
SET chat_key = CASE
  WHEN to_team_label IS NOT NULL AND length(to_team_label) > 0
    THEN 'team:' || to_team_label
  WHEN sender_membership_id IS NULL
       AND to_membership_id IS NULL
       AND to_user_id IS NULL
       AND (to_team_label IS NULL OR length(to_team_label) = 0)
    THEN 'whole'
  WHEN to_membership_id IS NOT NULL AND sender_membership_id IS NOT NULL
       AND to_membership_id <> sender_membership_id
    THEN 'pair:' || LEAST(sender_membership_id, to_membership_id)
         || ':' || GREATEST(sender_membership_id, to_membership_id)
  WHEN to_membership_id IS NOT NULL
    THEN to_membership_id
  WHEN sender_membership_id IS NOT NULL AND to_user_id IS NOT NULL
    THEN sender_membership_id
  WHEN sender_membership_id IS NULL AND to_membership_id IS NULL AND to_user_id IS NOT NULL
    THEN 'system:' || to_user_id
  ELSE 'whole'
END
WHERE chat_key IS NULL;

UPDATE project_messages SET chat_key = 'whole' WHERE chat_key IS NULL OR chat_key = '';

ALTER TABLE project_messages
  ALTER COLUMN chat_key SET DEFAULT 'whole';

ALTER TABLE project_messages
  ALTER COLUMN chat_key SET NOT NULL;

CREATE INDEX IF NOT EXISTS project_messages_chat_newest_idx
  ON project_messages (project_id, chat_key, created_at DESC, id DESC);

-- Per-device computer acks: drop project-wide unique, add (project, message, device).
ALTER TABLE project_message_computer_acks
  DROP CONSTRAINT IF EXISTS project_message_computer_acks_project_id_message_id_key;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'project_message_computer_acks_project_message_device_key'
  ) THEN
    ALTER TABLE project_message_computer_acks
      ADD CONSTRAINT project_message_computer_acks_project_message_device_key
      UNIQUE (project_id, message_id, device_id);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS project_message_computer_acks_message_device_idx
  ON project_message_computer_acks (project_id, message_id, device_id);
