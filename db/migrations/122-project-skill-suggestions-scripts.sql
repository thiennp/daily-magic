-- Skill scripts (auto-skill plan, phase 3): a question can carry the permission
-- list and replay result of the proposed scripts, or be an owner approval of one
-- installed script version. Runtime twin: ensureProjectAutoSkillsSchema.

ALTER TABLE project_skill_suggestions
  ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'skill',
  ADD COLUMN IF NOT EXISTS script_info JSONB;

-- Per project + computer snapshot of skill savings and miss stats (heartbeat).
-- Runtime twin: ensureProjectKnowledgeSchema.
CREATE TABLE IF NOT EXISTS project_skill_stats (
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  device_id TEXT NOT NULL REFERENCES agent_witch_devices(id) ON DELETE CASCADE,
  skills JSONB NOT NULL DEFAULT '[]'::jsonb,
  weekly JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, device_id)
);
