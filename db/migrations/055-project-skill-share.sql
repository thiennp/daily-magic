-- Project playbook/skill share (src/features/project-skill-share).
-- States: draft -> published -> revoked. AWC is always the store of record for
-- the published body (<= 64KB per version) + meta + content_hash, History ON or
-- OFF. History ON additionally mirrors published versions to AWL
-- project-data/<projectId>/skills/<skillId>/vNNNN.md (+ meta.json) via History
-- helpers; the mirror hash must equal content_hash.
-- content_hash = 'sha256:' + lowercase hex of the exact UTF-8 body bytes.
-- At most 20 versions per skill are kept (oldest dropped on publish overflow,
-- never the live published version). skill_id is a slug, never '_'-prefixed.

CREATE TABLE IF NOT EXISTS project_skills (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  project_id TEXT NOT NULL REFERENCES user_projects(id) ON DELETE CASCADE,
  skill_id TEXT NOT NULL CHECK (skill_id !~ '^_'),
  name TEXT NOT NULL,
  description TEXT,
  publisher_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  state TEXT NOT NULL CHECK (state IN ('draft', 'published', 'revoked')),
  published_version INTEGER,
  latest_version INTEGER NOT NULL DEFAULT 0,
  content_hash TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  revoked_at TIMESTAMPTZ,
  revoked_by_user_id TEXT,
  UNIQUE (project_id, skill_id)
);

CREATE TABLE IF NOT EXISTS project_skill_versions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  skill_row_id TEXT NOT NULL REFERENCES project_skills(id) ON DELETE CASCADE,
  version INTEGER NOT NULL CHECK (version > 0),
  body TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  byte_size INTEGER NOT NULL CHECK (byte_size <= 65536),
  is_draft BOOLEAN NOT NULL DEFAULT FALSE,
  created_by_user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (skill_row_id, version)
);

CREATE INDEX IF NOT EXISTS project_skills_project_state_idx
  ON project_skills (project_id, state);
