-- Composer recipient sticky (server): one row per (project, actor) while the
-- sticky chip is checked. mode=all → Whole project; mode=membership → that
-- active bot/computer seat. Unchecked / one-shot / leave → DELETE the row.
-- No FK on membership_id: seats are revoked, not deleted; leave hooks clear
-- rows that pointed at the left membership.

CREATE TABLE IF NOT EXISTS project_composer_recipient_sticky (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  actor_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  mode TEXT NOT NULL CHECK (mode IN ('all', 'membership')),
  membership_id TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, actor_user_id),
  CONSTRAINT project_composer_recipient_sticky_membership_mode_check
    CHECK (
      (mode = 'all' AND membership_id IS NULL)
      OR (mode = 'membership' AND membership_id IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS project_composer_recipient_sticky_membership_idx
  ON project_composer_recipient_sticky (membership_id)
  WHERE membership_id IS NOT NULL;
