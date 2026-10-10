-- An auto-skill question can be for a skill or a playbook: the AI tags its draft
-- and the answer publishes it with that kind (project_skills.kind, migration 110).
ALTER TABLE project_skill_suggestions
  ADD COLUMN IF NOT EXISTS library_kind TEXT NOT NULL DEFAULT 'skill'
  CHECK (library_kind IN ('skill', 'playbook'));
