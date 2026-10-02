-- Optional project git remote metadata (URLs + default branch). Metadata only — no clone contents.
ALTER TABLE user_projects
  ADD COLUMN IF NOT EXISTS repo_urls TEXT[] NOT NULL DEFAULT '{}'::TEXT[];

ALTER TABLE user_projects
  ADD COLUMN IF NOT EXISTS default_branch TEXT NULL;
