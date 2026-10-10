-- Auto skills: the owner's computer reports how many commits the project
-- folder's main branch has and how many the last scan read, so the app can
-- offer a deeper scan. Runtime twin: ensureProjectAutoSkillsSchema.

ALTER TABLE project_auto_skills
  ADD COLUMN IF NOT EXISTS git_commits INTEGER,
  ADD COLUMN IF NOT EXISTS git_scanned INTEGER;
