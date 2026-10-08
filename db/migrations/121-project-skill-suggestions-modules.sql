-- Module-level auto skills: a question is about a repeated step (module)
-- that appeared in one or more prompts. Runtime twin: ensureProjectAutoSkillsSchema.

ALTER TABLE project_skill_suggestions
  ADD COLUMN IF NOT EXISTS module_label TEXT,
  ADD COLUMN IF NOT EXISTS distinct_prompts INTEGER;
