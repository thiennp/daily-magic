-- A folder ref is visible to other project members only when shared (default on).
ALTER TABLE project_folder_refs
  ADD COLUMN IF NOT EXISTS shared BOOLEAN NOT NULL DEFAULT TRUE;
