-- Auto skills: the owner can pick which coding agent judges (NULL = any signed-in one).
-- Runtime twin: ensureProjectAutoSkillsSchema (ALTER TABLE ... IF NOT EXISTS).
ALTER TABLE project_auto_skills
  ADD COLUMN IF NOT EXISTS judge_agent TEXT;
