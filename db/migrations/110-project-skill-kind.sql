-- Project playbooks (src/features/project-skill-share): a playbook is a project
-- skill with kind = 'playbook'. Same table, draft -> published -> revoked
-- lifecycle, ACL, 64KB body cap, contentHash and 20-version limit.
-- Additive only: existing rows read as 'skill'.
-- Runtime twin: ensureProjectSkillShareSchema (ADD COLUMN IF NOT EXISTS).
-- 109 = project task records on main.

ALTER TABLE project_skills
  ADD COLUMN IF NOT EXISTS kind TEXT NOT NULL DEFAULT 'skill'
  CHECK (kind IN ('skill', 'playbook'));

CREATE INDEX IF NOT EXISTS project_skills_project_kind_idx
  ON project_skills (project_id, kind);
